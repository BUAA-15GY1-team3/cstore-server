### 星盘

#### frontend  前端文件
#### output  前端文件输出
=======

﻿### 云存储服务系统设计文档

[TOC]

## 系统要求

1. 云端部署存储集群；
2. 服务器端整合云存储集群接口提供用户登录及文件存取接口；
3. 客户端调用服务器端的接口进行文件存取；


## 概要设计

完整的云存储服务系统需要一套存取数据的云存储系统、一个整合云存储集群接口实现文件读取并对外提供HTTP接口的webserver，以及各个端（web、pc、android、ios）的客户端。

### 云存储系统

#### 功能简介

云存储系统需要能够保存系统中用户信息、文件信息、文件内容等。
其中用户信息和文件信息访问比较多，需高性能，相对小容量的存储集群；
文件内容重要度很高但访问相对较少，需大容量高稳定性的存储集群；

#### 技术选型

1. 用户信息和文件信息等小容量内容可使用内存存储，本系统中使用[redis](https://github.com/antirez/redis)集群；
2. 文件内容必须使用磁盘存储，本系统中使用[SSDB](https://github.com/ideawu/ssdb)集群；

#### 运维管理

1. 为保证稳定性，redis和SSDB集群均需要至少2副本；
2. redis和SSDB集群的容量均可动态扩展，扩容时添加分片数即可；

**问题**
webserver中需要保存redis和SSDB的地址，在redis和SSDB集群扩大后不宜管理。

**解决方案**
1. redis和SSDB上均增加一层[twemproxy](https://github.com/twitter/twemproxy)，由twemproxy负责路由和分发；
2. proxy自动注册到zookeeper上，webserver只需知道[zookeeper](https://zookeeper.apache.org/)的目录即可动态获取可用的存储地址；

### webserver

#### 功能简介

webserver需要实现一个简要的网盘功能，对外提供HTTP接口。客户端通过HTTP接口可实现网盘系统的注册、登录、查看有权限文件列表、上传文件、下载文件等功能。

#### 需要实现的模块和功能

1. 用户注册；
2. 用户登录；
3. 获取用户有权限的文件列表；
4. 上传文件；
5. 下载文件；

#### 技术选型

webserver使用golang实现，其中webserver框架使用[martini](github.com/go-martini/martini)，redis和SSDB客户端使用[redigo](github.com/garyburd/redigo/redis)。

## 详细设计

### 云存储系统

#### redis部署

1. 准备至少3*n个机器或container，用于部署1主2从，n个分片的redis集群；
2. 部署redis集群时需保证每个分片的主从都不在同一个机器上，部署完成后设置从的master地址，启动redis服务；

#### SSDB部署

1. 准备至少3*n个机器或container，可与redis服务混部，用于部署1主2从，n个分片的SSDB集群；
2. 部署SSDB集群时需保证每个分片的主从都不在同一个机器上，然后设置从的master地址，启动SSDB服务；

#### zookeeper部署

1. 准备2*n+1个机器或container，可与redis、SSDB混部，用于部署zookeeper集群；
2. 修改各个zookeeper服务的配置，将它们添加到一个集群中；
3. 在zk中创建“/bh/cstore/redis”和“/bh/cstore/ssdb”路径；

#### twemproxy部署

1. 准备2*n个机器部署redis和ssdb的twemproxy代理服务；
2. 部署完成后把redis和SSDB主的地址配置到twemproxy的server中；
3. 启动twemproxy服务，并把twemproxy的地址注册到zookeeper对应的路径下；

### webserver

#### 代码路径

https://github.com/BUAA-15GY1-team3/cstore-server

#### 子模块设计

![图片](http://bos.nj.bpc.baidu.com/v1/agroup/c262c9f854a6730202f6ce351867ec4ab44b196b)

[脑图地址](http://naotu.baidu.com/file/fbf8381d9f6043028144e19a6ff921b4?token=e2492b1a0cc87fa9)

#### 对外HTTP api说明

##### 1. 注册

**接口说明**

|HTTP请求方式 | POST | 
|---|---|
|参数输入格式 | json | 
|示例参数 | {"name":"tjuqxy","pass":"32位md5串"} | 

**返回示例**

![图片](http://bos.nj.bpc.baidu.com/v1/agroup/08c05bf97ac21e17177a711d452a89f0aeb6f9b3)

##### 2. 登录

**接口说明**

|HTTP请求方式 | POST | 
|---|---|
|参数输入格式 | json | 
|示例参数 | {"name":"tjuqxy","pass":"32位md5串"} | 

**返回示例**

![图片](http://bos.nj.bpc.baidu.com/v1/agroup/c98f1963ee4d523c2b4ca528d2d06a568893bb1b)

##### 3. 获取文件列表

**接口说明**

|HTTP请求方式 | GET | 
|---|---|
|参数输入格式 | url | 
|示例请求 | http://{host}/api/listAllFile?uname=tjuqxy | 

**返回示例**

![图片](http://bos.nj.bpc.baidu.com/v1/agroup/98f7a5fc505f3851b015a5163245fccc71c89e2b)

##### 4. 上传文件

|HTTP请求方式 | POST | 
|---|---|
|参数输入格式 | url | 
|示例请求 | http://{host}/api/upload?uname=tjuqxy&file-path=./&file-name=test | 
|文件内容 | 通过post上传 |

##### 5. 下载文件

**接口说明**

|HTTP请求方式 | GET | 
|---|---|
|参数输入格式 | url | 
|示例请求 | http://{host}/api/download?uname=tjuqxy&file-id=7 | 

**返回示例**

![图片](http://bos.nj.bpc.baidu.com/v1/agroup/883de41081fb79a41c2f360b501a215348e38749)

其中data中的值为文件内容


## 总结
>>>>>>> 2977bd8efa46fcfabb641a851ddbbb1f8cb1f895
