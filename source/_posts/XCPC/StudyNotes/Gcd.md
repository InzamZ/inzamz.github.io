---
title: 最大公约数
date: 2020-12-19 22:12:28
tags:
  - GCD
updated: 2021-10-23 17:47:00
categories:
  - XCPC
  - 学习笔记
---
最大公约数问题不只是简单的抄模版，主要是灵活利用其中的思想。
<!-- more -->

---

## 基本知识

其实就是小学二年级学过的辗转相除法 , 就是说 gcd (a,b) = gcd(a,b-a) .

> 假设 z 是 x y 的最大公因数 ，z 也是 y-x 的因子 . 

所以代码也很简单

```cpp
int gcd(int x,int y)
{
    return y==0?x:gcd(y,x%y);
}
```

## 二进制算法

使用二进制不断除去因子 2 ,在某些数据中速度快点 . 

```cpp
inline int gcd(int x,int y)
{
    if (x==0) return y;
    if (y==0) return x;
    int i,j;
    for(i=0;0==(x&1);++i) x>>=1;
    for(j=0;0==(y&1);++j) y>>=1;
    if (i>j) i=j;
    while (1)
    {
        if (x<y) x^=y,y^=x,x^=y;//交换x y（逗号）
        if ((x-=y)==0) return y<<i;//这里就是一个gcd
        while (0==(x&1)) x>>=1;
    }
 }
```

## 思想应用

最重要的是对这个思想的应用 .

### CF1459C Row GCD

#### 题目大意

给一组数 , 还有另外一个数 , 问你这组数每个数都加上另外给出的数后的最大公因数 . 

#### 解题思路

首先一组数的gcd , 其实就是先找两个数求 gcd , 然后求最大公因数和下一个数的 gcd , 最后的所有数都求一遍就是了 . 

然后呢 , 就是用好 gcd(x,x-y) 的妙用 . 加的数是一样的 , 所以
$$
gcd(a_0+b,a_1+b,...,a_n+b)=gcd(a_0+b,a_1-a_0,...,a_n-a_0)
$$
 所以先预处理 $ gcd(a_0+b,a_1-a_0,...,a_n-a_0) $ , 之后就是 gcd 一次就好了 .

```cpp
#include<cstdio>
#include <algorithm>
using namespace std;
typedef long long ll;
ll a[200010];
inline ll gcd(ll x,ll y){
    return y>0?gcd(y,x%y):x;
}
int main() 
{
	int n,m;
	scanf("%d %d",&n,&m);
	for (int i=0;i<n;i++) scanf("%lld",&a[i]);
	sort(a,a+n);
	ll ans=a[1]-a[0];
	for (int j=2;j<n;j++)
	{
		ans=gcd(ans,a[j]-a[0]);
	}
	for (int i=1;i<=m;i++)
	{
		ll bn;
		scanf("%lld",&bn);
		printf("%lld ",gcd(ans,bn+a[0]));
	}
	return 0;
}
```

To Be Continued.

<!-- Q.E.D. -->