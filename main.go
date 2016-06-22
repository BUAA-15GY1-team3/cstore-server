package main

import (
    "os"
    "flag"

    "github.com/golang/glog"
    "github.com/go-martini/martini"
    "github.com/martini-contrib/cors"
    utils "github.com/tjuqxy/go-utils"

    "github.com/BUAA-15GY1-team3/cstore-server/zk"
    "github.com/BUAA-15GY1-team3/cstore-server/api"
)

const (
    DEFAULT_CONF_FILE = "./conf/server.yml"
)

var (
    zkAddr  string
)

func init() {
    var (
        err error
        confFile string
        confMap map[string]interface{}
    )

    flag.StringVar(&confFile, "c", DEFAULT_CONF_FILE, "conf file")
    // parse flags
    flag.Parse()

    if confFile == "" {
        glog.Errorf("Conf file is empty\n")
        os.Exit(1)
    }
    confMap, err = utils.LoadConf(confFile)
    if err != nil {
        glog.Errorf("Load conf(%s) failed, errmsg: %v\n", confFile, err)
        os.Exit(1)
    }

    if _, ok := confMap["zk"]; !ok {
        glog.Errorf("Zk is not configured, conf content: %v\n", confMap)
        os.Exit(1)
    }

    switch zkConf := confMap["zk"].(type) {
    case map[interface{}]interface{}:
        if addr, ok := zkConf["addr"]; ok {
            zkAddr, err = utils.String(addr)
            if err != nil {
                glog.Errorf("Zk addr is not a string, zkConf content: %v\n", zkConf)
                os.Exit(1)
            }
        } else {
            glog.Errorf("Zk addr is not configure, zkConf content: %v\n", zkConf)
            os.Exit(1)
        }
    default:
        glog.Errorf("Zk conf is not map[string]string, get type: %T\n", zkConf)
        os.Exit(1)
    }

    zk.InitZk(zkAddr)
}

func main() {
    m := martini.Classic()

    m.Use(cors.Allow(&cors.Options {
        AllowOrigins: []string{"*"},
        AllowMethods: []string{"POST", "GET"},
    }))

    m.Post("/api/login", api.Login)
    m.Post("/api/register", api.Register)

    m.Get("/api/listAllFile", api.ListAllFile)

    m.Run()
}
