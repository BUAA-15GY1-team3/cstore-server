package model

import (
    "fmt"
    "time"
    "strconv"
    "net/http"
    "io/ioutil"

    "github.com/BUAA-15GY1-team3/cstore-server/redis"
)

type File struct {
    Fid          string `json:"file-id"`
    FPath        string `json:"file-path"`
    FName        string `json:"file-name"`
    FSize        string `json:"file-size"`
    CreateTime   string `json:"createtime"`
}

func GetFile(fid string) File {
    var f File
    f.Fid = fid
    return f
}

func UploadFile(path, name string, req *http.Request) (File, error) {
    var (
        buf []byte
        emptyFile File
    )

    sizeStr := req.Header["Content-Length"][0]

    //Step 1: get new id
    id, err := redis.GetId()
    if err != nil {
        return emptyFile, err
    }
    f := GetFile(id)
    f.FPath = path
    f.FName = name
    f.FSize = sizeStr

    size, err := strconv.Atoi(sizeStr)
    if err != nil {
        return emptyFile, fmt.Errorf("get filesize failed, errmsg:", err)
    }

    //Step 2: upload
    if req.Body == nil {
        return emptyFile, fmt.Errorf("req body is nil")
    }
    defer req.Body.Close()

    body, err := ioutil.ReadAll(req.Body)
    if err != nil {
        return emptyFile, fmt.Errorf("read body failed, errmsg: ", err)
    }

    ind := 0
    off := 0
    for size > off {
        r := size - off //remain size
        s := BLOCK_SIZE
        if s > r {
            s = r
        }

        buf = body[off:off + s]
        redis.UploadFile(id, strconv.Itoa(ind), string(buf))

        off += s
        ind ++
    }

    //Step 3: set info to redis
    m := make(map[string]string)
    m["path"] = path
    m["name"] = name
    m["size"] = sizeStr
    m["ctime"] = time.Now().Format("2006 Jan 2 15:04:05")
    err = redis.SetFileInfo(id, m)
    if err != nil {
        return emptyFile, err
    }

    return f, nil
}

func (f *File) Download() (string, error) {
    ret := ""
    err := f.Init()
    if err != nil {
        return "", err
    }

    ind := 0
    size, err := strconv.Atoi(f.FSize)
    if err != nil {
        return "", err
    }

    for ind * BLOCK_SIZE <= size {
        part, err := redis.DownloadFile(f.Fid, strconv.Itoa(ind))
        if err != nil {
            return "", err
        }
        ret += part
        ind++
    }

    return ret, nil
}

func (f *File) Init() error {
    fInfo, err := redis.GetFileInfo(f.Fid)
    if err != nil {
        return err
    }

    f.FPath      = fInfo["path"]
    f.FName      = fInfo["name"]
    f.FSize      = fInfo["size"]
    f.CreateTime = fInfo["ctime"]
    return nil
}
