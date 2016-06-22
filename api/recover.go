package api

import (
    "fmt"
)

func recoverPanic(errno *int, content *[]byte) {
    if err := recover(); err != nil {
        *errno, *content = parseRet(444, fmt.Sprintf("Param invalid: %v", err), nil)
    }
}
