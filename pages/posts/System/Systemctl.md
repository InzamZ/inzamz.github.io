---
title: systemctl服务
categories:
    - Linux系统
tags:
    - systemctl
date: 2021-11-07 21:30:24
updated: 2021-11-07 21:30:24
draft: true
end: false
---

<!-- more -->

使用`system`服务可以实现开机自启动，以及在后台运行程序。这些在图形化界面或许非常简单，但是在只有终端的服务器上是非常好用的，例如你要一个网络代理，或者需要web服务器开机自启动等等。

---

## 可用的终端命令

```bash
systemctl start (SERVICENAME)
systemctl restart (SERVICENAME)
systemctl stop (SERVICENAME)
systemctl enable (SERVICENAME)
systemctl k (SERVICENAME)
```



To Be Continued.

<!-- Q.E.D. -->