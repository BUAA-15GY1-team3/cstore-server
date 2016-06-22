package api

import (
    "fmt"
    "testing"
    "encoding/json"

    utils "github.com/tjuqxy/go-utils"
)

type loginData struct {
    Uname string `json:"uname"`
    Upass string `json:"pass"`
}

func TestRegister(t *testing.T) {
    data := loginData {
        Uname: "tjuqxy",
        Upass: "tjuqxy",
    }

    dataStr, err := json.Marshal(data)
    if err != nil {
        fmt.Println("Marshal json failed, errmsg:", err)
        return
    }

    ret, err := utils.POST("http://127.0.0.1:3000/api/register", string(dataStr))
    fmt.Println(string(ret), err)
}

func TestLogin(t *testing.T) {
    data := loginData {
        Uname: "tjuqxy",
        Upass: "tjuqxy",
    }

    dataStr, err := json.Marshal(data)
    if err != nil {
        fmt.Println("Marshal json failed, errmsg:", err)
        return
    }

    ret, err := utils.POST("http://127.0.0.1:3000/api/login", string(dataStr))
    fmt.Println(string(ret), err)
}
