package zk

import (
    "os"
    "fmt"
    "time"
    "encoding/json"

    "github.com/golang/glog"
    utils "github.com/tjuqxy/go-utils"
    gozk "github.com/samuel/go-zookeeper/zk"
)

const (
    SSDB_ZK_PATH  = "/bh/cstore/ssdb"
    REDIS_ZK_PATH = "/bh/cstore/redis"
)

func requestZk(addr string) {
    zk, session, err := gozk.Connect([]string{addr}, 5 * time.Second)
    if err != nil {
        glog.Errorf("Connect zk failed, errmsg: %v", err)
        return
    }
    defer zk.Close()

    for {
        event := <-session
        if event.State == gozk.StateConnecting {
            glog.Infof("Zk connecting")
            continue
        } else if event.State == gozk.StateConnected {
            glog.Infof("Connect zk succeed!")
            break
        } else {
            glog.Errorf("Connect zk failed, zkState: %v", event.State)
            return
        }
    }

    getAddrList := func(path string) []string {
        addrList := make([]string, 0)
        var unmarshalResult interface{}

        children, _, err := zk.Children(path)
        if err != nil {
            glog.Errorf("Get children from zk path(%s) failed, errmsg: %v", path, err)
            return addrList
        }
        for _, child := range children {
            childPath := path + "/" + child

            info, _, err := zk.Get(childPath)
            if err != nil {
                glog.Errorf("Get child(%s) info failed, errmsg: %v", childPath, err)
                continue
            }

            err = json.Unmarshal([]byte(info), &unmarshalResult)
            if err != nil {
                glog.Errorf("Json unmarshal child(%s) info failed, errmsg: %v", childPath, err)
                continue
            }

            infoMap, err := utils.StringMap(unmarshalResult)
            if err != nil {
                glog.Errorf("Child(%s) info deal failed, errmsg: %v", childPath, err)
                continue
            }

            port, ok := infoMap["port"]
            if !ok {
                glog.Errorf("Child(%s) info don't have port, info: %v", childPath, infoMap)
            }
            addrList = append(addrList, child + ":" + port)
        }
        return addrList
    }

    tmpSSDBAddrList  := getAddrList(SSDB_ZK_PATH)
    if len(tmpSSDBAddrList) != 0 {
        glog.Infof("Update ssdbAddrList, new(%v)", tmpSSDBAddrList)
        ssdbAddrList = tmpSSDBAddrList
    }

    tmpRedisAddrList := getAddrList(REDIS_ZK_PATH)
    if len(tmpRedisAddrList) != 0 {
        glog.Infof("Update redisAddrList, new(%v)", tmpRedisAddrList)
        redisAddrList = tmpRedisAddrList
    }
}

func interactWithZk(addr string) {
    for {
        requestZk(addr)
        time.Sleep(30 * time.Second)
    }
}

func InitZk(addr string) {
    go interactWithZk(addr)

    retry := 10

    for {
        if retry == 0 {
            fmt.Println("Init addrList too many times, exit.")
            os.Exit(1)
        }

        if len(redisAddrList) != 0 && len(ssdbAddrList) != 0 {
            fmt.Println("Init addrList succeed")
            break
        } else {
            fmt.Println("Wait for init addrList")
        }
        time.Sleep(2 * time.Second)
        retry--
    }
}
