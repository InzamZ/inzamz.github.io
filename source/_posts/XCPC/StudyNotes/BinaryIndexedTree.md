---
title: 树状数组
date: 2020-11-30 9:33:52
update: 2021-01-24 11:54:22
categories:
	- XCPC
    - 学习笔记
tags:
	- 树状数组
---
树状数组是二进制的巧妙利用，可以完成区间求和的基本操作。他虽然功能不及线段树，但是易于编写。

<!-- more -->

## 区间求和问题

给定一组数据 , 可以进行两种操作 , 修改值和区间求和 . 最开始想法就是前缀和 , 这样的话求和复杂度是  O( 1 ) , 但是区间维护操作是 O(N) , 所以有没有更优秀的数据结构呢 . 

### 原理

树状数组就是在数组上模拟树 , 对节点进行求和 . 树状数组利用了二进制的思想 , 使求和和维护的复杂度都在 O ( N*logN) .

<img src="https://p.130014.xyz/2020/11/30/treearray001.png" style="zoom:80%;" />

A数组就是原来的数 , 而C数组就是树状数组 . 

### Lowbit 函数

树状数组的核心就是lowbit函数 , 如果不明所以 , 可以很快写出代码的 , 但我还是想折腾一下 . 首先lowbit求的就是要加几个数 , 而这个数一定是 2 的 k 次方 . 问题转化为k了 . 我们举几个例子:

- Sum6 , 6的二进制码为 110 . Sum6=C6+C4 .
- Sum7 , 7的二进制码为 111 . Sum7=C7+C6+C4

其实不难看出 , 每一个C , 存的都是某个1代表的和 . 而每一次求和就是求每一个1代表数的和 . 

<center>Sum5=C4+C5 5 : 101</center>

<center>Sum6=C4+C6 6 : 110</center>

然后接下来就是找 k , 其实慢慢移动就太慢了 , 和位运算有关 , 那么就可以考滤位运算 . 

#### 方法一  

<center>lowbit(i)=x & (x^(x-1))</center>

考虑二进制 x-1 会导致最低位(即第k位) 1 以及之后的位数全部和之前相反 , 这样异或一下 , 就会使最低位 ( k 位) 以及比 k 低的位数全为 1 , 因为比 k 位高的位数全是 0 , 所以与操作后必为 0 , 加上第k位 , 是最低位 1 , 再低的位数就没有 1 了 , 所以除了 k 位以外全为 0 , 这个数就是 2<sup>k</sup> .

#### 方法二  

<center>lowbit(x)=x&(-x)</center>

这个方法是最常用的 , 它利用了储存负数的机制 , 就是补码 . 补码就是反码加一 , 反码的每一位都和原来不同 . 而末尾的 0 就会变成 1 , 加上1 , 反码末尾的 1 变成 0 , 还把反码末尾第一个 0 变成 1 .这样第 k 位前仍然互为反码 , 第 k 位后 -x 全为零 , 第 k 位全为 1 .​
### 求和

先讲求和对后面的建立数组的理解很有帮助。因为树状数组储存的是最后一位 1 代表的数字。加上所有 1 代表的数字就是答案了。
$$
Sum_i=C_i+C_{i-2^{k1}}+C_{i-2^{k1}-2^{k2}}+……
$$
​    代码如下 : 

``` cpp
int getsum(int i)
{
    int res=0;
    while(i>0){
        res+=c[i];
        i-=lowbit(i);
    }
    return res;
}
```
### 维护和构建树状数组
根据求和规则，我们发现在 i 处的数包含于最低位1及之后的1上。例如：
* 6(110)，那么就是6(110)，8(100)，16(1000)…
* 9(1001)，9(1001)，10(1010)，12(1100)，16(1000)，32(10000)…
这里我引用一下百度百科的图，会更好理解。

<img src="https://p.130014.xyz/2020/12/01/F99344C7-C642-4AE8-B42E-02F2DDBBBD94.png" style="zoom:80%;" />

代码如下 :

```cpp
void update(int i,int val)
{
    while (i<=n){
        c[i]+=val;
        i+=lowbit(i);
    }
}
```

### 例题:[HDU1166](http://acm.hdu.edu.cn/showproblem.php?pid=1166)

```cpp
#include <cstdio>
#include <cstring>
#include <iostream>
using namespace std;
int a[50010],n;

int lowbit(int x){	return x&(-x);}

void update(int i,int val)
{
	while(i<=n){
		a[i]+=val;
		i+=lowbit(i);
	}
}

int getsum(int i)
{
	int res=0;
	while(i>0){
		res+=a[i];
		i-=lowbit(i);
	}
	return res;
}

int main()
{
	int num,x,y,T;
	char op[10];
	scanf ("%d ",&T);
	for (int i=1;i<=T;i++){
		printf("Case %d:\n",i);
		scanf("%d ",&n);
		memset(a,0,sizeof(int)*(n+1));
		for (int i=1;i<=n;i++){
			scanf ("%d ",&num);
			update(i,num);
		}
		while(1)
		{
			memset(op,0,sizeof(op));
			scanf ("%s",&op);
			if (!strcmp("End",op)) break;
			else if (strcmp("Add",op)==0) {
				scanf("%d %d ",&x,&y);
				update(x,y);
			}
			else if (!strcmp("Sub",op)) {
				scanf("%d %d ",&x,&y);
				update(x,-y);
			}
			else if (!strcmp("Query",op)){
				scanf("%d %d ",&x,&y);
				printf("%d\n",getsum(y)-getsum(x-1));
			}
		}
	}
	return 0;
}
```



## 区间修改&单点查询

一组数据，要能够完成区间值加减和单点询问。
### 思路
因为只是单点查询，可以利用差分思想，记录与前一个数的差即可。区间修改不改变区间内差值，只需修改区间两边的值即可。树状数组即可解决。

### 例题:[LUOGU3368](https://www.luogu.com.cn/problem/P3368)

```cpp
#include <bits/stdcpp.h>
using namespace std;
int a[500010],n;
int lowbit(int x)	{	return x&(-x);}
void update(int i,int val)
{
	while(i<=n){
		a[i]+=val;
		i+=lowbit(i);
	}
}
int getsum(int i)
{
	int res=0;
	while(i>0){
		res+=a[i];
		i-=lowbit(i);
	}
	return res;
}
int main()
{
	int m,k,num1=0,num2=0,op,x,y;
	scanf ("%d%d",&n,&m);
	for (int i=1;i<=n;i++){
		scanf ("%d",&num1);
		update(i,num1-num2);
		num2=num1;
	}
	for (int i=1;i<=m;i++){
		scanf ("%d",&op);
		if (op==1) {
			scanf("%d %d %d",&x,&y,&k);
			update(x,k);update(y+1,-k);
		}
		else if (op==2) {
			scanf("%d",&x);
			printf("%d\n",getsum(x));
		}
	}
	return 0;
}
```



## 区间修改&区间查询

一组数据 , 要求能够区间修改和区间询问 . 

### 思路

同时要完成两种操作 , 这样就只要维护两个树状数组就好了 . 一个差分数组 , 另一个是对差分数组进行求和的数组 . 
$$
\begin{aligned}
Sum(n)=\sum_{i=1}^n a_i&=a_n+a_{n-1}+...+a_1\\&=(d_n+...+d_1)+(d_{n-1}+...+d_1)+...+d_1\\&=(n-(n-1))*d_n+(n-(n-2))*d_{n-1}+...+(n-0)*d_1\\&=n*\sum_{i=1}^n d_i-\sum_{i=1}^n d_i*(i-1)
\end{aligned}
$$

### 例题:[POJ3468](http://poj.org/problem?id=3468)

```cpp
#include <iostream>
#include <cstdio>
using namespace std;

typedef long long ll;
ll a[100010],b[100010],N;

ll lowbit(ll x){	return x&(-x);}

void update(ll i,ll val)
{
	ll x=i;
	while(i<=N){
		a[i]+=val;
		b[i]+=(val*(x-1));
		i+=lowbit(i);
	}
}

ll getsum(ll i)
{
	ll res=0,x=i;
	while(i>0){
		res+=(a[i]*x-b[i]);
		i-=lowbit(i);
	}
	return res;
}

int main()
{
	ll Q,num1,num2=0;
	scanf ("%lld %lld",&N,&Q);
	for (int i=1;i<=N;i++){
		scanf ("%lld",&num1);
		update(i,num1-num2);
		num2=num1;
	}e
	for (int i=1;i<=Q;i++)
	{
		char op=getchar();
		ll x,y,k;
		if (op=='C') {
			scanf ("%lld %lld %lld",&x,&y,&k);
			update(x,k);
			update(y+1,-k);
		}
		else if (op=='Q') {
			scanf("%lld %lld",&x,&y);
			printf("%lld\n",getsum(y)-getsum(x-1));
		}
		else i--;
	}
	return 0;
}
```
