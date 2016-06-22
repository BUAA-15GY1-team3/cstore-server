package api

import (
    "fmt"
    "net/http"

    utils "github.com/tjuqxy/go-utils"
    "github.com/BUAA-15GY1-team3/cstore-server/model"
)

func Login(req *http.Request) (errno int, content []byte) {
    recoverPanic(&errno, &content)

    param := getPOSTParam(req)
    uname, ok := param["uname"]
    if !ok {
        return parseRet(403, "param uname not parsed", nil)
    }
    unameStr, _ := utils.String(uname)

    pass, ok := param["pass"]
    if !ok {
        return parseRet(403, "param pass not parsed", nil)
    }
    passStr, _ := utils.String(pass)

    err := model.GetUser(unameStr).Login(passStr)
    if err != nil {
        errmsg := fmt.Sprintf("%v", err)
        return parseRet(504, errmsg, nil)
    }

    return parseRet(0, "OK", nil)
}

func Register(req *http.Request) (errno int, content []byte) {
    recoverPanic(&errno, &content)

    param := getPOSTParam(req)
    uname, ok := param["uname"]
    if !ok {
        return parseRet(403, "param uname not parsed", nil)
    }
    unameStr, _ := utils.String(uname)

    pass, ok := param["pass"]
    if !ok {
        return parseRet(403, "param pass not parsed", nil)
    }
    passStr, _ := utils.String(pass)

    err := model.GetUser(unameStr).SetPass(passStr)
    if err != nil {
        errmsg := fmt.Sprintf("%v", err)
        return parseRet(504, errmsg, nil)
    }

    return parseRet(0, "OK", nil)
}
