---
title: Chtholly Tree
date: 2020-11-18 11:31:22
updated: 2021-10-23 17:47:00
categories:
	- XCPC
    - 学习笔记
tags:
	- 区间赋值
	- 暴力
---

## 珂教兴国
>有一天我想着去看看[中国珂学院](https://wiki.sukasuka.cn/)，然后百度后，发现珂朵莉树这种有趣的数据结构..。
>
>心想着有一天一定要好好学学

<!-- more -->

## 珂学名字的由来 - [CF896C](https://codeforces.com/contest/896/problem/C) 
Willem, Chtholly and Seniorious 想必珂学家们不需要解释了。就是一位用户提交完正解后，给出了另一份代码（暴力解法）。就是珂朵莉树，因为用户ID叫 Old Driver，又叫老司机树。身为一名资深珂学家，这等好事岂能错过。
## 复杂度分析
在数据随机的情况下，珂朵莉树据说可以吊打线断树，很快嗷。主要是因为区间赋值，在珂朵莉树中只用了一个节点表示，大大降低了 set 的大小。珂朵莉树节点最后会趋于一个稳定值 log n 。当然要求随机，也即有 1/4 概率区间赋值。<div class='heimu'>其实就是欺负数据弱，用来骗分的。</div>
## 构造珂朵莉树
### 定义节点

```cpp
struct Node
{
	int l,r;
	mutable ll value;//
	Node(int a,int b,long long c):l(a),r(b),value(c){}
	Node(int a):l(a),r(0),value(0){}
	bool operator < (const Node& o) const{
    	return l<o.l;
	}
}
```
## 核心操作和维护
### split：分裂操作
最核心的就是分裂，珂朵莉树之后操作都以分裂为前提，因为区间赋值操作我们把一段线段变成一个点，需要操作线段的某一段，就把它分裂出来。

```cpp
set<Node>::iterator split(int pos)
{
    set<Node>::iterator it=s.lower_bound(Node(pos));
    if (it->l==pos && it!=s.end()) return it;//(1) 
    --it;
    if (pos > it->r) return s.end();//(2)
    int L=it->l,R=it->r;
    ll V=it->value;
    s.erase(it);
    s.insert(Node(L,pos-1,V));//(3)
    return s.insert(Node(pos,R,V)).first;
}
```
**(1) STL中，～.end()函数返回的是尾部元素的_下一个_迭代器，关于sort下面再说**
(2) 满足这条是判断 pos = n+1，在操作区间右边界等于整个区间的右边界（即n）时，我们要获取 n 元素之后下一个迭代器，就是 s.end()。
(3) 我看有一篇博客写的是 Node(L,pos,V) Node(pos+1,R,V)，这是错误写法。返回的是以 pos 为首的线段的迭代器，但是为什么他好像没错？也许这 oj 不懂规矩。

### 区间赋值
我们把这个区间分离出来，在 set 中是连续的几个元素，于是我们利用 split() 获取迭代器。将这段元素全部删除然后新插入一个区间，他们的值相等。

```cpp
void assign(int l,int r,int v)
{
    split(l);
    set<Node>::iterator R=split(r+1);
    set<Node>::iterator L=split(l);
    s.erase(L,R);//iterator erase(const_iterator first,const_iterator last)
    s.insert(Node(l,r,v));
}
```
set在删除元素时，迭代器可能会发生变动，所以可能出现野指针。
于是开头的 split(l) 就是先处理完分裂操作，后面执行第二次 split(l) 时就不会改变迭代器 R 的值，同理 R 和 L 的定义是不可调换的。
### 区间加法
同上，先获取首尾迭代器，对每个元素的 value 执行加法即可。

```cpp
void add(int l,int r,int v)
{
    split(l);
    auto R=split(r+1),L=split(l);
    for (;L!=R;++L){
	   L->value += v;
}
```
## 求值操作
暴力求解，因为数据水，暴力起来效率不成问题。
### 求区间第 k 大的数
```cpp
ll kth(int l,int r, int k)
{
    split(l);
	   vector< pair<ll,int> >q;
	   q.clear();
	   set<Node>::iterator R=split(r+1);
	   set<Node>::iterator L=split(l);
	   for (set<Node>::iterator it=L;it!=R;++it){
	   	q.push_back({ it->value , it->r - it->l + 1});
	   }
	   sort(q.begin(),q.end());//
	   for (auto i:q)
	   {
	   	k-=i.second;
	   	if (k<=0) return i.first; 
	   }
	   return -1;
}
```
### 区间幂次和

```cpp
ll qpow(ll a,ll x,ll y)
{
	   ll ans=1,res=a%y;
	   while(x!=0)
	   {
		  if ( x & 1 ) {
		      ans*=res;
		      ans=ans%y;
		  }
		  res=res*res%y;
		  x>>=1;
    }
    return ans%y;
}

ll sum(int l,int r,int x,int y)
{
	   split(l);
	   ll ans=0;
	   set<Node>::iterator R=split(r+1);
	   set<Node>::iterator L=split(l);
	   for (set<Node>::iterator it=L;it!=R;++it){
	   	ans+=( (ll)( it->r - it->l + 1 ) * qpow(it->value,x,y));
	   	ans=ans%y;
	   }
	   return ans;
}
```
## 例题：ABC188 - D 

题目解析见 [D - Snuke Prime](https://www.inzamz.top/2021/01/25/ABC188/#%E7%8F%82%E6%9C%B5%E8%8E%89%E6%A0%91) 

## 总结

骗分大法，写起来简单，但是毕竟很容易被卡，但是，毕竟是珂朵莉树，珂学家不可能不学的。

> 我永远喜欢珂朵莉。



