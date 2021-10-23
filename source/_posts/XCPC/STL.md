---
title: STL的学习笔记
date: 2020-12-21 17:11:56
updated: 2021-01-26 16:50:26
tags:
	- STL
categories:
	- ICPC 算法基础
---

STL是什么东西 , 我自己手打一个不行吗 ?

<img src="https://img.inzamz.top/expression/zhen-xiang.gif" alt="zhen-xiang" div align=center/> 

手打模板是什么东西 , STL真香 , yyds . 

参考自百度百科.

<!-- more -->

## 数据结构

### STL set

因为 set 会保证容器内元素有序 , 有的题目数据水是可以卡过去的 . 但是 set 只支持单一值 , 即相同值集合只会出现一次 . 但是我们可以使用 multiset (可重集) 解决问题 .

```cpp
#include <set>
using namespace std;
set<int>s;
s.count();//某个值元素个数
s.find();//返回查找指定值的迭代器,不存在返回 end() 
s.insert();//插入元素
s.erase (val);//删除值为val的元素,返回值为成功删除的元素个数
s.erase (pos);//删除迭代器pos指向的元素,返回迭代器指向的是set容器中删除元素之后的第一个元素
s.erase (fir,las);//删除[fir,las)区间内的所有元素
s.empty();//集合为空返回true
```

### STL vector

向量 , 以前高中没学到线性代数 , 不知道为什么叫向量来着 . 主要是这个结构 ~~能屈能伸 能大能小 来去自如~~ 

<img src="https://img.inzamz.top/expression/i-am-lsp-too.jpg" alt="i-am-lsp-too" style="zoom:25%;" />

其实还能用 sort 排序 . vector 支持直接下标访问 . 

```cpp
#include <vector>
using namespace std;
vector<int>s;//构造一个空的向量
vector<int>s(n);//构造一个长度为n的向量,初始值均为0
vector<int>s(s1);//复制已有向量s1构造一个向量
s.count();//某个值元素个数
s.find();//返回查找指定值的迭代器,不存在返回 end() 
s.push_back();//在尾部插入元素
s.erase (pos);//删除迭代器pos指向的元素,返回迭代器指向的是vector容器中删除元素之后的第一个元素
s.erase (fir,las);//删除[fir,las)区间内的所有元素
s.empty();//集合为空返回true
s.pop_back();//删除最后一个数据
s.size();//返回元素个数
```

### STL map

map就是一个映射，能够帮你建立特殊关系，由一个值映射到另一个值。

```cpp
#include <map>
using namespace std;
map<int,string>name;
//插入数据，数组形式会覆盖，insert形式会返回false，无法覆盖
name[1]="keyvalue";//数组形式
name.insert(pair<int,string>(1,"value"));//使用insert 插入 pair
name.insert(map<int,string>::value_type(1,"value"));//使用insert 插入 value_type

name.size();//获取map插入数据的数量

//删除条目
iterator erase（iterator it);//通过一个条目对象删除
iterator erase（iterator first，iterator last）//删除一个范围
size_type erase(const Key&key);//通过关键字删除
```



## 好用的函数

### lower_bound & upper_bound

> 函数原型

```cpp
ForwardIterator lower_bound (ForwardIterator first,ForwardIterator last,const T& val);
ForwardIterator lower_bound (ForwardIterator first,ForwardIterator last,const T& val,Compare comp);

ForwardIterator upper_bound (ForwardIterator first,ForwardIterator last,const T& val)
ForwardIterator upper_bound (ForwardIterator first,ForwardIterator last,const T& val,Compare comp);
```

两个函数很像的 , 前提要求数组有序 . lower_bound 就是返回在迭代器 first 与 last 之间第一个大于等于 val 的值的迭代器 . 支持 STL 中的数据结构 , 第一个原型使用底层的 < 运算符 , 第二个支持自定义 cmp 函数 . 

而 upper_bound 唯一的区别是要求严格大于 , 仅此而已 . 

### sort

这里我只是想说记得第二个参数是结束位置的下一个指针 (或迭代器) . cmp定义的是小于符号 . 

---

To Be Continued.

<!-- Q.E.D. -->