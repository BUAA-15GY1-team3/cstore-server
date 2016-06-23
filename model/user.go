package model

import (
    "fmt"
    "net/http"
    "crypto/md5"

    "github.com/BUAA-15GY1-team3/cstore-server/redis"
)

type User struct {
    Uname string
}

func GetUser(uname string) User {
    var u User
    u.Uname = uname
    return u
}

func (u *User) GetAllFile() ([]File, error) {
    fList, err := redis.GetUserFilelist(u.Uname)
    if err != nil {
        return nil, err
    }

    fileList := make([]File, len(fList))
    for ind, fid := range fList {
        fileList[ind] = GetFile(fid)
        err := fileList[ind].Init()
        if err != nil {
            return nil, err
        }
    }

    return fileList, nil
}

func (u *User) Login(pass string) error {
    if len(pass) != 32 {
        pass = fmt.Sprintf("%x", md5.Sum([]byte(pass)))
    }

    p, err := redis.GetUserPass(u.Uname)
    if err != nil {
        return err
    }

    if p == "" {
        return fmt.Errorf("uname %s is not exist", u.Uname)
    }

    if len(p) != 32 {
        p = fmt.Sprintf("%x", md5.Sum([]byte(p)))
    }

    if p != pass {
        return fmt.Errorf("pass is incorrect")
    }
    return nil
}

func (u *User) SetPass(pass string) error {
    p, err := redis.GetUserPass(u.Uname)
    if err != nil {
        return err
    }

    if p != "" {
        return fmt.Errorf("uname %s is already exist", u.Uname)
    }

    if len(pass) != 32 {
        pass = fmt.Sprintf("%x", md5.Sum([]byte(pass)))
    }

    return redis.SetUserPass(u.Uname, pass)
}

func (u *User) UploadFile(path, name string, req *http.Request) error {
    f, err := UploadFile(path, name, req)
    if err != nil {
        return err
    }

    return redis.AddUserFileList(u.Uname, f.Fid)
}

func (u *User) DownloadFile(id string) (string, error) {
    fList, err := u.GetAllFile()
    if err != nil {
        return "", err
    }

    for _, file := range fList {
        if file.Fid == id {
            return file.Download()
        }
    }

    return "", fmt.Errorf("you don't have this file's permission")
}
