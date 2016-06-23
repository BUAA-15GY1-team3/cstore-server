package redis

import (
    "fmt"

    utils "github.com/tjuqxy/go-utils"

    "github.com/BUAA-15GY1-team3/cstore-server/zk"
)

func GetUserPass(uname string) (string, error) {
    addr := zk.GetRedisAddr()
    if addr == "" {
        return "", fmt.Errorf("Get redis addr from zk failed")
    }

    key := fmt.Sprintf(USER_PASS_FORMAT, uname)

    ret, err := utils.ReqRedis(addr, "GET", key)
    if err != nil {
        return "", err
    }

    if ret == nil {
        ret = ""
    }

    return utils.String(ret)
}

func SetUserPass(uname, pass string) error {
    addr := zk.GetRedisAddr()
    if addr == "" {
        return fmt.Errorf("Get redis addr from zk failed")
    }

    key := fmt.Sprintf(USER_PASS_FORMAT, uname)

    _, err := utils.ReqRedis(addr, "SET", key, pass)
    return err
}

func GetUserFilelist(uname string) ([]string, error) {
    addr := zk.GetRedisAddr()
    if addr == "" {
        return nil, fmt.Errorf("Get redis addr from zk failed")
    }

    key := fmt.Sprintf(USER_FILE_LIST_FORMAT, uname)

    ret, err := utils.ReqRedis(addr, "LRANGE", key, "0", "-1")
    if err != nil {
        return nil, err
    }

    return utils.Strings(ret)
}

func AddUserFileList(uname, fid string) error {
    addr := zk.GetRedisAddr()
    if addr == "" {
        return fmt.Errorf("Get redis addr from zk failed")
    }

    key := fmt.Sprintf(USER_FILE_LIST_FORMAT, uname)

    _, err := utils.ReqRedis(addr, "LPUSH", key, fid)
    return err
}
