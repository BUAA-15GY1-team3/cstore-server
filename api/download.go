package api

import (
    "fmt"
    "net/http"

    "github.com/BUAA-15GY1-team3/cstore-server/model"
)

func Download(req *http.Request) (errno int, content []byte) {
    recoverPanic(&errno, &content)

    param := getGETParam(req)
    uname, ok := param["uname"]
    if !ok {
        return parseRet(401, "param uname not parsed", nil)
    }

    fid, ok := param["file-id"]
    if !ok {
        return parseRet(401, "param fid not parsed", nil)
    }

    user := model.GetUser(uname)
    ret, err := user.DownloadFile(fid)
    if err != nil {
        errmsg := fmt.Sprintf("%v", err)
        return parseRet(503, errmsg, nil)
    }

    return parseRet(200, "OK", ret)
}
