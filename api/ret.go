package api

import (
    "encoding/json"
)

func parseRet(errno int, errmsg string, ret interface{}) (int, []byte) {
    retMap := make(map[string]interface{})
    retMap["errno"]  = errno
    retMap["errmsg"] = errmsg
    if ret != nil {
        retMap["data"] = ret
    } else {
        retMap["data"] = make([]string, 0)
    }

    retCode := 200
    if errno != 0 {
        retCode = 503
    }

    retByte, err := json.Marshal(retMap)
    if err != nil {
        retCode = 503
        retByte = []byte(`{"errno":-1,"errmsg":"json encode failed","data":[]}`)
    }
    return retCode, retByte
}
