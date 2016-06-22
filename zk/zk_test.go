package zk

import (
    "fmt"
    "testing"
)

func TestInitZk(t *testing.T) {
    InitZk("127.0.0.1:2181")

    fmt.Println(ssdbAddrList)
    fmt.Println(redisAddrList)

    fmt.Println("Redis addr:", GetRedisAddr())
    fmt.Println("Redis addr:", GetRedisAddr())
    fmt.Println("Redis addr:", GetRedisAddr())
    fmt.Println("Redis addr:", GetRedisAddr())

    fmt.Println("SSDB addr: ", GetSSDBAddr())
    fmt.Println("SSDB addr: ", GetSSDBAddr())
    fmt.Println("SSDB addr: ", GetSSDBAddr())
    fmt.Println("SSDB addr: ", GetSSDBAddr())
}
