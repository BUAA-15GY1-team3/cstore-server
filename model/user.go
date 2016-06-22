package model

import (
    "fmt"
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

func (u User) GetAllFile() ([]string, error) {
    return redis.GetUserFilelist(u.Uname)
}

func (u User) Login(pass string) error {
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

func (u User) SetPass(pass string) error {
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
