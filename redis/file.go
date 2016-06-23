package redis

import (
    "fmt"

    utils "github.com/tjuqxy/go-utils"

    "github.com/BUAA-15GY1-team3/cstore-server/zk"
)

func SetFileInfo(id string, info map[string]string) error {
    addr := zk.GetRedisAddr()
    if addr == "" {
        return fmt.Errorf("Get redis addr from zk failed")
    }

    key := fmt.Sprintf(FILE_INFO_FORMAT, id)

    param := make([]interface{}, 2 * len(info) + 1)
    param[0] = key
    ind := 1
    for k, v := range info {
        param[ind] = k
        param[ind + 1] = v
        ind += 2
    }
    _, err := utils.ReqRedis(addr, "HMSET", param...)
    return err
}

func GetFileInfo(fid string) (map[string]string, error) {
    addr := zk.GetRedisAddr()
    if addr == "" {
        return nil, fmt.Errorf("Get redis addr from zk failed")
    }

    key := fmt.Sprintf(FILE_INFO_FORMAT, fid)

    ret, err := utils.ReqRedis(addr, "HGETALL", key)
    if err != nil {
        return nil, err
    }

    resList, err := utils.Strings(ret)
    if err != nil {
        return nil, err
    }

    if len(resList) % 2 != 0 {
        return nil, fmt.Errorf("HGETALL failed, result list is odd")
    }

    retMap := make(map[string]string)
    for ind := 0; ind < len(resList); ind += 2 {
        retMap[resList[ind]] = resList[ind + 1]
    }
    return retMap, nil
}

func UploadFile(id, ind, value string) error {
    addr := zk.GetSSDBAddr()
    if addr == "" {
        return fmt.Errorf("Get ssdb addr from zk failed")
    }

    key := fmt.Sprintf(FILE_PART_FORMAT, id, ind)

    _, err := utils.ReqRedis(addr, "SET", key, value)
    return err
}

func DownloadFile(id, ind string) (string, error) {
    addr := zk.GetSSDBAddr()
    if addr == "" {
        return "", fmt.Errorf("Get ssdb addr from zk failed")
    }

    key := fmt.Sprintf(FILE_PART_FORMAT, id, ind)

    ret, err := utils.ReqRedis(addr, "GET", key)
    if err != nil {
        return "", err
    }

    return utils.String(ret)
}
