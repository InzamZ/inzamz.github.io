---
title: Telegram-Bot-Alice 开发日志
categories:
  - 开发日志
tags:
  - TelegramBot
  - Python3
date: 2021-11-16 16:41:51
updated: 2021-11-16 16:41:51
---

<!-- more -->

在折腾了一下Mirai后，尝试自己开发插件时有点困难，到后来有机会接触到hezu群，随后入手了美区Apple One，接下来注定是长期使用了，于是开始注意到telegram bot。后来一想，既然tx不愿意bot存在，为何要强求呢，而且telegram bot提供了详细的开发文档，开始尝试写一个bot。

扫了一眼也就python自己还有点基础，于是开始写代码了。适逢EDG夺得S赛冠军，立下十一月3k代码FLAG的我开始努力完成。记录一下开发的进程啥的，方便以后修bug。

---

## 前情提要

开始了小半个月了，所以把现在完成的大致说一下。其实就完成了一个插件，`Deadline`。

>   也是因为自己忘记了各种ddl才想起来弄一个bot通知自己。

-   基础的指令识别，可以修改，添加，删除每一项
-   使用本地储存的方式，将数据存放在 `Config.json` 中，每一次操作读取一次（bug:操作后id发生改变会导致错误操作）

## 2021-11

### Sleep

入手了 `autpsleep` 监测自己的睡眠，发现可以使用IOS的Shortcuts导出睡眠数据，于是开发插件用于播报睡眠消息。

使用IOS的自动化，实现数据的自动生成，并且上传到icloud_。

>   拼车AppleOne，手里有333G的icloud于是不用白不用。主要问题在于IOS的快捷指令并不支持Telegram发送文档和消息。原本打算使用pyicloud，使用icloud作为媒介传输数据，但刚才发现快捷指令中有一个SSH运行脚本的功能，这就简单了。直接把数据写入服务器即可。顺便在上传数据的时候运行bot对应脚本即可。

-   使用echo时要记得把`json`的双引号转义一下

### Icloud

Apple的快捷方式提供了很多有用的功能，并且入坑了AppleOne，所以总会用到icloud进行编程。就安全性而言，把密码以明文形式放在代码中显然不合适，于是使用命令行的icloud先进行登录并记住密码。



To Be Continued.

<!-- Q.E.D. -->