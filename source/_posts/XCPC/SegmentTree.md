---
title: 线段树
date: 2020-12-15 16:13:39
tags:
	- 线段树
categories:
	- ICPC 数据结构
---
其实昨天晚上写了一晚上 , 没有标记的线段树写好了 , 但是加上标记对储存的定义并不准确 , 导致最后没写完 . 然后最气的就是下午写了一个下午 , 死活找不到bug , 终于在折腾了4小时后 , 找到万恶之源 : define ! ! ! 对此我不由得感慨
> # define需谨慎 , 括号别吝啬

<!-- more -->

线段树只是其中一种叫法而已 , 也叫区间树范围树 . 顾名思义 , 线段树可以解决区间上的问题 , 例如区间最值和区间求和 , 最重要的是支持动态修改 . 你可以对某个区间的值加上某个值 .

# 基本学习

主要是最基础的 , 线段树的精髓不止于此 .

## 原理简述

线段树将一个区间的信息储存在一个节点上 , 而该节点的两个子节点储存左半部分与右半部分的信息 . 信息就是区间和或最值 . 这样我们得到了一个二叉树 , 它每个节点都代表一段线段(区间) , 最底层就是每一个数据了 .

<img src="https://cdn.jsdelivr.net/gh/InzamZ/inzamz.github.io@main/img/article/segment-tree-01.png" alt="segment-tree-01" style="zoom: 80%;" />

这样我们询问的时候 , 遇到大的区间便不用访问子结点 , 直接读取便可以了 . 大大减少时间 , 而对区间的操作也是可以直接在区间上作标记 , 从而暂时不用修改子结点的值 . ( 因为有的区间修改后对后面的查询操作根本没有影响 , 没必要更新子结点的值 ). 下面以 [LuoguP3372](https://www.luogu.com.cn/problem/P3372) 为例 .

## 建树 : Build

怎么建立线段树呢 ? 我是用数组 , 其实你可以使用结构体 , 有时更直观 . 根据题目 , 这是求和题目 , 因此递归建树 , 在递归边界(叶子节点)直接赋值 , 回溯的时候更新父节点的值 .

```cpp
#define lo o*2//左儿子
#define ro o*2+1//右儿子
void build(ll o,ll L,ll R)
{
	add[o]=0;
	if (L==R) {	sum[o]=num[L];	return ;}
	ll M=(L+R)/2;
	build(lo,L,M);
	build(ro,M+1,R);
	sum[o]=sum[lo]+sum[ro];//相应改成max,min操作即可
}
```

## 维护 : Update (未优化)

> 对区间 ql , qr 上的数都加上 k .

就是加上一个数 . 我们递归查找 , 如果区间完全在需要修改的区间中 , 我们就对它的整棵子树进行修改 .否则 , 递归找到符合条件的所有子区间 . 递归结束更新父节点值 . 

```cpp
void addval(int o,int L,int R)
{
	if (L==R) {
		sum[o]+=k;
		return ;
	}
	else if (ql<=L && R<=qr) {
		addval(o*2,L,M);
		addval(o*2+1,M+1,R);
		sum[o]=sum[o*2]+sum[o*2+1];
		return ;
	}
	if (M >= ql) {
		addval(o*2,L,M);
	}
	if (M < qr) {
		addval(o*2+1,M+1,R);
	}
	sum[o]=sum[o*2]+sum[o*2+1];
}
```

## 查询 : Query

> 询问区间 ql qr 间数的和 

同理 , 判断区间是不是完全在询问区间中 , 否则递归在子区间中寻找 .

```cpp
ll getsum(int o,int L,int R)
{
	ll ans=0;
	if ( ql<=L && R<=qr ) return sum[o];
	if ( M >= ql ) ans+=getsum(o*2,L,M);
	if ( M < qr ) ans+=getsum(o*2+1,M+1,R);
	return ans;
}
```

## 优化 : Pushdown()

于是你觉得你会了 , 说这有什么难得 ,交上去后 :

![TLE](https://cdn.jsdelivr.net/gh/InzamZ/inzamz.github.io@main/img/expression/TLE.gif)

线段树的精髓一个在携带信息 , 另一个就是延迟标记 . 因为区间操作后不一定需要立刻递归更新子结点 . 因此我们用一个延迟标记 , 记录我的子树要加上这么多 , 但是我暂时不加 , 我只更新我这个区间的值 . 如果你需要整个区间 , 那直接使用就好了 , 只有当需要用到我的子结点时才把延迟标记更新到子节点 , 也就是接下来的 pushdown 操作.

> 如果是使用整个区间 , 那么没必要更新子结点的值 , 直接读取该区间的值就好了
>
> 如果要使用这个区间的一部分 , 那就要求保证子结点的sum是准确的 , 在父节点记录的加法应该更新了 .

因此sum记录的值不再是真实的值了 , 而是执行了自身和它的子树的延迟标记后的sum . 但是他没有执行父节点的延迟标记.

pushdown操作就是把父亲的延迟标记传给儿子 , 并且更新儿子节点的值 . 传过以后自然就可以归零了 . 当你要递归到子区间就要用 .

```cpp
void pushdown(ll o,ll L,ll R)
{
	ll M=(L+R)/2;
        add[lo]+=add[o];
        add[ro]+=add[o];
        sum[lo]+=len(L,M)*add[o];
        sum[ro]+=len(M+1,R)*add[o];
        add[o]=0;
}
```

现在更新值也不用遍历整棵树了 , 做好标记即可 . 

```cpp
void addval(ll o,ll L,ll R)
{
	if (ql<=L && R<=qr) {
		sum[o]+=k*len(L,R);
		add[o]+=k;
		return ;
	}
	pushdown(o,L,R);//你要递归子树,就要把pushdown父节点的值
	ll M=(L+R)/2;
	if( M >= ql ) addval(lo,L,M);
	if ( qr > M ) addval(ro,M+1,R);
	sum[o]=sum[lo]+sum[ro];//结尾更新新的节点值
}
```

求和也是进入子区间记得pushdown

```cpp
ll getsum(ll o,ll L,ll R)
{
	ll res=0;
	if (ql<=L && R<=qr) {
		return sum[o];
	}
	pushdown(o,L,R);
	ll M=(L+R)/2;
	if ( M >= ql) res+=getsum(lo,L,M);
	if ( M < qr ) res+=getsum(ro,M+1,R);
	return res;
}
```

## 完整代码

```cpp
#include<cstdio>
#include<iostream>
using namespace std;

typedef long long ll;
ll sum[400000],add[400000],num[100010],k,ans;
ll n,m,qr,ql;

#define lo 2*o
#define ro 2*o+1
#define len(a,b) ((b)-(a)+1)

void build(ll o,ll L,ll R)
{
	add[o]=0;
	if (L==R) {	sum[o]=num[L];	return ;}
	ll M=(L+R)/2;
	build(lo,L,M);
	build(ro,M+1,R);
	sum[o]=sum[lo]+sum[ro];
}

void pushdown(ll o,ll L,ll R)
{
	ll M=(L+R)/2;
    add[lo]+=add[o];
    add[ro]+=add[o];
    sum[lo]+=len(L,M)*add[o];
    sum[ro]+=len(M+1,R)*add[o];
    add[o]=0;
}

ll getsum(ll o,ll L,ll R)
{
	ll res=0;
	if (ql<=L && R<=qr) {
		return sum[o];
	}
	pushdown(o,L,R);
	ll M=(L+R)/2;
	if ( M >= ql) res+=getsum(lo,L,M);
	if ( M < qr ) res+=getsum(ro,M+1,R);
	return res;
}

void addval(ll o,ll L,ll R)
{
	if (ql<=L && R<=qr) {
		sum[o]+=k*len(L,R);
		add[o]+=k;
		return ;
	}
	pushdown(o,L,R);
	ll M=(L+R)/2;
	if( M >= ql ) addval(lo,L,M);
	if ( qr > M ) addval(ro,M+1,R);
	sum[o]=sum[lo]+sum[ro];
}

int main()
{
	scanf ("%lld %lld",&n,&m);
	for (int i=1;i<=n;i++){
		scanf ("%lld",&num[i]);
	}
	build(1,1,n);
	for (int i=1;i<=m;i++){
		ll op;
		scanf ("%lld %lld %lld",&op,&ql,&qr);
		if (ql>qr) swap(ql,qr);
        
		if (op==2){
			ans=getsum(1,1,n);
			printf("%lld\n",ans);
		}
        
		if (op==1) {
			scanf ("%lld",&k);
			addval(1,1,n);
		}
	}
	return 0;
}
```

## 题外话 : Define引发的血案

其实正解我是想到了的 , 但是由于我打算放弃改没有延迟标记的代码 , 直接重写 , 想着偷懒就来了点宏定义 , 然后就出问题了 . 

```cpp
#define M (L+R)/2
#define len(a,b) (b-a+1)
```

上面已经错了 . 考虑 $ len( M+1 , R ) $
$$
\begin{aligned}
len(M+1,R)&=R-M+1+1=R-M+2 \\&\not=R-(M+1)+1=R-M
\end{aligned}
$$
原因就是define只是单纯的文字替换 , 所以会有问题 . 解决方案就是多加括号 . 

![look-at-me](https://cdn.jsdelivr.net/gh/InzamZ/inzamz.github.io@main/img/expression/look-at-me.jpg)

# 其他应用

线段树的精髓是你给节点的附加信息 , 你可以给更复杂的信息 , 这样用处会更广泛 , ~~延迟标记也更难处理~~ . 这个挖个坑 , 以后再补 .

## [LuoguP3373](https://www.luogu.com.cn/problem/P3373)

### 解题思路

因为多了乘法操作，延迟标记应该不太够，所以用两个。但是有个pushdown时运算的优先问题，是先乘后加，还是先加后乘。

> 对于一个节点，我们同时储存了乘和加，但不知道乘法和加法的先后，所以每一次pushdown我们要保证按照我们规定的顺序最后得到的是正确的。
>
> - 先乘后加：我们要保证结果正确，当有一个数在加法延迟标记中，说明在乘法前有加上一个数，那我们只需要让加上的数乘以现在要乘的数就好了。
> - 先加后乘：同理我们要加上一个数，发现之前乘过一个数了，你直接加到加法延迟标记上，后面会乘以一个数，就会导致结果错误。所以你要把加的数除以现在乘法延迟标记的数。出现除法会很难受，会有小数，所以是不好的。

```cpp
#include <cstdio>
#include<iostream>
using namespace std;

#define M ((l+r)/2)
#define lo (o*2)
#define ro (o*2+1)
#define len(a,b) ((b)-(a)+1)

typedef long long ll;
ll m,n,p,x,y,k,op;
ll sum[400010],lazy1[400010],lazy2[400010],num[100010];

void build(int o,int l,int r)
{
	lazy1[o]=1;
	if (l==r) {	sum[o]=num[l]%p;	return ;}
	build(lo,l,M);
	build(ro,M+1,r);
	sum[o]=(sum[lo]+sum[ro])%p;
}

void pushdown(int o,int l,int r)
{
	lazy1[lo]*=lazy1[o];	lazy1[lo]%=p;
	lazy1[ro]*=lazy1[o];	lazy1[ro]%=p;
	lazy2[lo]=lazy2[lo]*lazy1[o]+lazy2[o];	lazy2[lo]%=p;
	lazy2[ro]=lazy2[ro]*lazy1[o]+lazy2[o];	lazy2[ro]%=p;
	sum[lo]=((sum[lo]*lazy1[o])+lazy2[o]*len(l,M))%p;
	sum[ro]=((sum[ro]*lazy1[o])+lazy2[o]*len(M+1,r))%p;
	lazy1[o]=1;
	lazy2[o]=0;
}

ll getsum(int o,int l,int r)
{
	ll res=0;
	if (x<=l && r<=y) return sum[o]%p;
	pushdown(o,l,r);
	if ( M >= x) {
		res+=getsum(lo,l,M);
		res%=p;
	}
	if ( M < y) {
		res+=getsum(ro,M+1,r);
		res%=p;
	}
	return res%p;
}

void addval(int o,int l,int r)
{
	if (x<=l && r<=y) {
		sum[o]=(sum[o]+k*len(l,r))%p;
		lazy2[o]+=k;	lazy2[o]%=p;
		return ;
	}
	pushdown(o,l,r);
	if ( M >= x ) addval(lo,l,M);
	if ( M < y ) addval(ro,M+1,r);
	sum[o]=sum[lo]+sum[ro];
	sum[o]%=p;
}

void multival(int o,int l,int r)
{
	if (x<=l && r<=y) {
		sum[o]=(sum[o]*k)%p;
		lazy1[o]*=k;lazy1[o]%=p;
		lazy2[o]*=k;lazy2[o]%=p;
		return ;
	}
	pushdown(o,l,r);
	if ( M >= x) multival(lo,l,M);
	if ( M < y) multival(ro,M+1,r);
	sum[o]=sum[lo]+sum[ro];
	sum[o]%=p;
}

int main()
{
	scanf ("%lld%lld%lld",&n,&m,&p);
	for(int i=1;i<=n;i++) scanf ("%lld",&num[i]);
	build(1,1,n);
	while (m--)
	{
		scanf ("%lld%lld%lld",&op,&x,&y);
		if (x>y) swap(x,y);
		if (op==1 || op==2) {
			scanf ("%lld",&k);
			if (op==1) multival(1,1,n);
			else addval(1,1,n);
		}
		if (op==3) printf("%lld\n",getsum(1,1,n));
	}
	return 0;
}
```

### 题外话：我又在什么地方犯傻

> 这次是输入m，n搞反了，请求数和元素数量反了。所以只有m和n相等的数据过了。

To Be Continued.

<!-- Q.E.D. -->

