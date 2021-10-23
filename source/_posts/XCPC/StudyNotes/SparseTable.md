---
title: ST表
date: 2020-11-30 9:33:52
update: 2021-01-24 11:54:22
categories:
	- XCPC
    - 学习笔记
tags:
	- ST表
---
ST(SparseTable)表是解决多次询问区间最值的算法 ,支持静态查询区间最值 , 预处理只需要$O(NlogN)$ , 可以实现$$O(1)$$查找. 但是它不支持在线修改 . ST 表还能解决其他具有类似性质的问题 .

<!-- more -->

## 预处理

事实上 s \[i][j] 表示 从i开始 2<sup>j</sup> 个元素的最小(大)值 .那么很显然 , 有递推公式 
$$
s[i][j]=min(s[i][j-1],s[i+2^{j-1}][j-1])\\
若j=1时 , s[i][0]=num[i]
$$

## 查询

首先先说明一个定理:
$$
2^{Log(a)}>a/2 \\
Log(a)=\lfloor log_2(a) \rfloor
$$
例如 : Log(4)=2 , Log(5)=2 , Log(6)=2 , Log(7)=2 , Log(8)=3 (定理证明略)

所以一个长度为 len 的区间 [x,y] 必定会被 两个区间长度为 2<sup>Log(a)</sup> 的区间包含 , 而这两个区间都是经过预处理的 .

## 例题[HDU3183](http://acm.hdu.edu.cn/showproblem.php?pid=3183) 

### 题目大意

就是给一个数 , 问你去掉m位数后的最小值 .

### 解题思路

我一开始是想着能不能试着去掉最大数 , 然后有个问题一直无法解决就是前导零 .所以我们换个思路 , 要最小不就是找比较小的数放在前面吗 ? 注意选过的数之前的就不能选了, 因为我们按数位从前往后选的 . 我们还有个选择区间 , 不然最后数字不够就不行了. 区间最小值的下标就可以用 ST 表 , 但本题直接用循环也是能过的.

```cpp
#include <cstdio>
#include <cstring>
#include <iostream>
using namespace std;
int len,m;
char s[1010];
int bin[20],Log[1010];
int ST[1010][20];

int Min(int a,int b)
{
	return s[a]<=s[b]?a:b;
}

void getST()
{
	len=strlen(s);
	memset(ST,0,sizeof(ST));
	for (int j=0;j<=11;j++){
		for (int i=0;i+bin[j]-1<len;i++){
			if (j==0) ST[i][j]=i;
			else ST[i][j]=Min(ST[i][j-1],ST[i+bin[j-1]][j-1]);
		}
	}
}

int STsearch(int x,int y)
{
	if (x==y) return x;
	int t=Log[y-x+1];
	return Min(ST[x][t],ST[y-bin[t]+1][t]);
}

int main()
{
	Log[0]=-1;
	for (int i=1,cnt=0;cnt<=12;cnt++,i<<=1) bin[cnt]=i;
	for (int i=1;i<1010;i++) Log[i]=Log[i/2]+1;
	while (scanf("%s %d",s,&m)!=EOF)
	{
		bool flag=true;
		int l=0,r=m;
		getST();
		if (m>=len) {
			putchar('0');
			putchar('\n');
			continue;
		}
		for (int i=1;i<=len-m;i++){
			l=STsearch(l,r);
			if (flag && s[l]!='0') flag=false;
			if (!flag) putchar(s[l]);
			r++;
			l++;
		}
		if (flag) putchar('0');
		putchar(10);
		memset(s,0,sizeof(s));//debug 1 hours
	}
	return 0;
}
```

### 例题AtcoderABC189_C

维护区间最小值，但是需要注意一点，就是此题区间是双闭区间。

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
const int inf=1e9+7;
const int maxn=1e5+10;
//#define debug 0
int st[maxn][30];
int a[maxn],bin[35],lg[maxn]; 

void getst(int n)
{
	bin[0]=1;lg[0]=-1;
	for (int i=1;i<=16;i++) 
		bin[i]=2*bin[i-1];
	for (int i=1;i<=1e5;i++) 
		lg[i]=lg[i/2]+1;
	for (int j=0;j<=16;j++)
		for (int i=0;i+bin[j]-1<n;i++)
		{
			if (j==0) st[i][j]=a[i];
			else 
			{
				st[i][j]=min(st[i][j-1],st[i+bin[j-1]][j-1]); 
				#ifdef debug
				printf("%d %d: %d %d final %d\n",i,j,st[i][j-1],st[i+bin[j-1]][j-1],st[i][j]);
				#endif 
			}
		}
}

int stsearch(int l,int r)
{
	if (l==r) return a[l];
	int t=lg[r-l+1];
	return min(st[l][t],st[r-bin[t]+1][t]);
}

int main(){
	int n,ans=0;
	scanf("%d",&n);
	for (int i=0;i<n;i++) scanf("%d",&a[i]);
	getst(n);
	for (int i=0;i<n;i++)
	{
		for (int j=i;j<n;j++)
		{
			ans=max(ans,(j-i+1)*stsearch(i,j));
		}
	}
	printf("%d\n",ans);
	return 0;
}
```

