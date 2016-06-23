package redis

import (
    "fmt"

    utils "github.com/tjuqxy/go-utils"

    "github.com/BUAA-15GY1-team3/cstore-server/zk"
)

func GetId() (string, error) {
    addr := zk.GetRedisAddr()
    if addr == "" {
        return "", fmt.Errorf("Get redis addr from zk failed")
    }

    ret, err := utils.ReqRedis(addr, "INCR", ID_key)
    if err != nil {
        return "", err
    }

    return utils.String(ret)
}
