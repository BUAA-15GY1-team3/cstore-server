package redis

import (
    "fmt"
    "testing"

    "github.com/BUAA-15GY1-team3/cstore-server/zk"
)

func TestGetId(t *testing.T) {
    zk.InitZk("127.0.0.1:2181")

    fmt.Println(GetId())
}
