package api

import (
    "fmt"
    "testing"

    utils "github.com/tjuqxy/go-utils"
)

func TestListAllFile(t *testing.T) {
    ret, err := utils.GET("http://127.0.0.1:3000/api/listAllFile?uname=tjuqxy")
    fmt.Println(string(ret), err)
}
