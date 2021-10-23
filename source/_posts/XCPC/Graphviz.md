---
title: Graphviz 的使用
date: 2020-11-02 22:50:29
categories:
	- 各种好用的工具
tags:
	- 绘图
---
这是一款不同于其他框图软件的绘图工具, 他能把你想的东西画成图像,支持多种图像格式. 功能强大, 但对第一次使用并不友好. 于是写一下, 方便自己查找.
<!-- more -->
# Graphviz
本文参考 [Tacey Wong](https://home.cnblogs.com/u/taceywong/) 的 [博文](https://www.cnblogs.com/taceywong/p/5439574.html) .

## 安装方式

​	windows 没试过, 登陆 [官网](www.graphviz.org/) 找一下吧. Linux 中, 我的 Ubuntu 20.04 LTS 已经预装过了.

## 使用方式

#### 生成命令

​	编写 dot 文件, 是一种描述图的文件, 然后在终端用命令

```bash
dot -Tpng sample.dot -o sample.png
```

 dot 表示 dot 布局,  -Tpng 表示 png 图片格式, sample.dot 是脚本文件名, -o sample.png 表示生成的图片名称. 

#### 布局引擎

-   dot ： 默认布局方式，主要用于有向图
-   neato ： 主要用于无向图
-   twopi ： 主要用于径向布局
-   circo ： 圆环布局
-   fdp ： 主要用于无向图
-   sfdp ： 主要绘制较大的无向图
-   patchwork ： 主要用于树哈希图（tree map）

#### 图片格式

-   pdf ：
-   gif
-   png ：
-   jpeg ： 一种有损压缩图片格式
-   bmp ： 一种位图格式
-   svg ： 矢量图，一般用与Web，，可以用浏览器打开
-   ps ： 矢量线图，多用于打印
    更多的输出格式可以浏览[Graphviz输出格式](http://www.graphviz.org/content/output-formats)进行查看。

#### 元素属性

-   color : 边框线条颜色
-   shape :形状
-   fillcolor : 填充颜色
-   fontcolor : 填充节点或集群的背景颜色

#### 二叉树的画法

​	其实画挺麻烦的, 于是在网上 copy 了一下. ~~没有强迫症也是可以的,就是左右子树有点歪.~~ 方法是设置三个 node 中间的隐藏就好了.

```Graphviz Dot
graph bin_tree {
    node [shape=circle];
 
    1 -- 2, 3;
    2 -- 4;
    // 隐藏中间节点的连线
    2 -- m2 [weight=10 style="invis"];
    2 -- 5;
 
//    3 -- 6;
    // 隐藏中间节点的连线
    3 -- m3 [weight=10 style="invis"];
//    3 -- 7;
//    4 -- 8;
    4 -- m4 [weight=10 style="invis"]
		
		// 隐藏中间节点
	1 [label="5"]
	2 [label="6"]
	3 [label="4"]
	4 [label="8"]
	5 [label="2"]
    m2, m3 ,m4[label="" style="invis"]
}
```

To Be Continued.

<!-- Q.E.D. -->