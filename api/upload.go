package api

import (
    "fmt"
    "net/http"

    "github.com/BUAA-15GY1-team3/cstore-server/model"
)

func Upload(req *http.Request) (errno int, content []byte) {
    recoverPanic(&errno, &content)

    param := getGETParam(req)

    uname, ok := param["uname"]
    if !ok {
        return parseRet(403, "param uname not parsed", nil)
    }

    path, ok := param["file-path"]
    if !ok {
        return parseRet(403, "param file-path not parsed", nil)
    }

    fname, ok := param["file-name"]
    if !ok {
        return parseRet(403, "param file-name not parsed", nil)
    }

    user := model.GetUser(uname)
    err := user.UploadFile(path, fname, req)
    if err != nil {
        errmsg := fmt.Sprintf("%v", err)
        return parseRet(504, errmsg, nil)
    }

    return parseRet(0, "OK", nil)
}
