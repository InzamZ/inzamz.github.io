---
title: 自定义域名邮箱
date: 2020-12-13 21:01:21
updated: 2020-12-13 21:01:21
tags:
	- 域名邮箱
	- Github Pages
categories:
	- 各种好用的工具
---
以前用的最多的就是qq邮箱了 , 但是毕竟不是很正式 ~~没有逼格~~ , 正好因为搭建博客购买了一个域名 , 就干脆申请一个 . 就写一点自己遇到的问题吧.
<!-- more -->

## 注册域名
我是在万网注册的 , cn , xyz 或者top域名都挺便宜的 .因为我使用的是top域名 , 以下均以domain.top为例 , 自己修改成对应域名就好了 .

## CNAME记录与MX记录冲突
因为我是把Apex域 (就是domain.top这种裸域名) 作为博客域名 , 所以会发生冲突 .如果你只有把 www.domain.top 作为博客域名(在你购买域名的网站 , 点击控制台 , 检查是否有主机名称为@的CNAME记录 , 有就是有把Apex域作为博客域名) , 直接跳到[注册部分](https://www.inzamz.top/2020/12/13/exmail/#%E6%B3%A8%E5%86%8C%E5%9F%9F%E5%90%8D%E9%82%AE%E7%AE%B1).
我参考了云游君的做法 [使用 CDN 加速你的 GitHub Pages 网站](https://www.yunyoujun.cn/note/use-cdn-speed-up-site/#CNAME-%E4%B8%8E-MX-%E8%AE%B0%E5%BD%95%E5%86%B2%E7%AA%81%E5%AF%BC%E8%87%B4%E9%82%AE%E4%BB%B6%E4%B8%A2%E5%A4%B1) ,把 domain.top 重定向到 www.domain.top .

进入设置https://github.com/user/user.github.io/settingsGitHub 在GitHub Pages中将Custom domain设置为 www.domain.top 或者 blog.domain.top .打开域名控制台(在你购买域名的网站) , 删除主机名称 @ 的CNAME记录 , 添加与前面对应的主机记录. 

还要记得将本地source文件夹的CNAME文件更改为对应域名 , 部署 .

我们还想访问 domain.top 时自动跳转到 www.domain.top 因此需要设置 A 记录 , [官方教程](https://docs.github.com/cn/free-pro-team@latest/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site) .

打开域名控制台 , 加入四条A记录 , 主机记录 @ , 记录值填写下面四项 .

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

## 注册域名邮箱

我使用的是腾讯企业邮 , 直接登陆 [官网](https://exmail.qq.com/) 右上角开通基础版 , 一路按流程注册就好 . 结束后是腾讯提供的试用域名 , 我是在网页上方有提示更改域名 , 你也可以点击我的企业 -> 域名管理 中添加域名. 需要在域名控制台中添加两条MX记录 , 按照教程操作就好了 . 

## 结尾

个人域名就是可以给人印象深刻,记起来简单 , 主要是逼格高 . 

---



<!-- Q.E.D. -->