package zk

import (
    "time"
    "math/rand"
)

var (
    r *rand.Rand
    ssdbAddrList  []string
    redisAddrList []string
)

func init() {
    ssdbAddrList  = make([]string, 0)
    redisAddrList = make([]string, 0)

    r = rand.New(rand.NewSource(time.Now().UnixNano()))
}

func GetRedisAddr() string {
    l := len(redisAddrList)
    if l == 0 {
        return ""
    }

    return redisAddrList[r.Intn(l)]
}

func GetSSDBAddr() string {
    l := len(ssdbAddrList)
    if l == 0 {
        return ""
    }

    return ssdbAddrList[r.Intn(l)]
}
