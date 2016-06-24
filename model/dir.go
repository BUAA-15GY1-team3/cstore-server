package model

type Dir struct {
    Name string        `json:"name"`
    DirList  []*Dir    `json:"dirList"`
    FileList []*File   `json:"fileList"`
}

func CreateDir(name string) *Dir {
    var d Dir
    d.Name = name
    d.DirList  = make([]*Dir, 0)
    d.FileList = make([]*File, 0)
    return &d
}

func (d *Dir) AddFile(path []string, f *File) {
    find := false
    curr := d
    for _, p := range path {
        find = false
        if curr.DirList == nil {
            curr.DirList = make([]*Dir, 0)
        }
        for _, dir := range curr.DirList {
            if dir.Name == p {
                find = true
                curr = dir
                break
            }
        }
        if !find {
            newDir := CreateDir(p)
            curr.DirList = append(curr.DirList, newDir)
            curr = newDir
        }
    }

    if curr.FileList == nil {
        curr.FileList = make([]*File, 0)
    }
    curr.FileList = append(curr.FileList, f)
}
