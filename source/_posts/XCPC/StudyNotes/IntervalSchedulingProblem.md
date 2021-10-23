---
title: 区间调度问题
date: 2020-11-03 21:08:04
updated: 2021-06-26 23:24:04
categories:
	- XCPC
    - 学习笔记
tags:
	- 贪心
	- 区间调度
---
关于区间调度的问题，因为上次一道简单的贪心不会，就打算学一下。
<!-- more -->
本文参考 https://blog.csdn.net/kiritow/article/details/52208488 

## 最多区间调度

​		给若干区间, 问你在不相交情况下, 最多能安排几个区间?

​		这种题目在小学数学中见过, 但是毕竟是很少项, 推一下就知道答案了. 而这个问题是贪心算法秒杀的. 就是我们按区间结束大小排序, 优先选择先结束的区间. 

### 算法证明

- 数学归纳法

    记贪心算法选择的区间序号是 i<sub>k</sub> , 最优解的选择的区间序号是 j<sub>k</sub> , R ( x ) 表示序号为 x 区间的右边界

    我们的算法选的是最先结束的, 于是有以下结论: 

    1. 当 k = 1 时 ,

        <center> R ( i<sub>k</sub> ) <= R ( j<sub>k</sub> ) </center> 

    2. 当 k >1 时 , 假设 R ( i<sub>k-1</sub> ) <= R ( j<sub>k-1</sub> ) 

        <center> R ( j<sub>k-1</sub> ) <= R ( j<sub>k</sub> ) 且 R ( i<sub>k-1</sub> ) <= R ( j<sub>k-1</sub> ) </center>

        所以 

        <center> R ( i<sub>k-1</sub> ) <= R ( j<sub>k-1</sub> ) <= R ( j<sub>k</sub> ) </center>

        意味着最优解选的区间贪心算法必定可以选到 , 而且一定满足

        <center>  R ( i<sub>k</sub> ) <= R ( j<sub>k</sub> ) </center>

    3. 综上, 对任意 k 有  R ( i<sub>k</sub> ) <= R ( j<sub>k</sub> ) .

- 反证法

    假设贪心算法不是最优解, 贪心算法解为k, 必定存在 j<sub>k+1</sub> 在 R ( j<sub>k</sub> ) 后开始, 所以 R ( i<sub>k</sub> ) <= R ( j<sub>k</sub> ) <= R ( j<sub>k+1</sub> ) , 然而这样 j<sub>k+1</sub> 就可以成为贪心算法第 k+1 个区间, 矛盾.

### Code

```cpp
int findans()
{
		for (int i=0;i<n;i++)
        {
                scanf ("%d %d",&s[i].second,&s[i].first);
            	//因为pair先比较first,所以反着读入
        }
        sort(s,s+n);
        int R=-1,ans=0;
        for (int i=0;i<n;i++)
        {
                if(s[i].second>=R) R=s[i].first,ans++;
        }
        return ans;
}
```

## 最长区间调度

​		一个简单的 DP 问题, f(x)表示时间为x时的最常区间, 状态转移方程

<center> f ( End ) = max( ( f ( End - Length ) + ( Length ) ) , f ( End - 1) )</center>

### Code
```cpp
//该代码没有实际背景,所以随便写了一个,也没有调试...简单dp就那样咯
pair <int,int>s[maxn];
ans[maxt];
void findans()
{
        int i,n,top=0;
        scanf ("%d",&n);
        for(int i=0;i<n;i++)
        {
                scanf ("%d %d",&s[i].second,&s[i].first);
        }
        sort(s,s+n);
        for (i=1;top<n;i++)
        {
                ans[i]=ans[i-1];
                while (s[top].first==i)
                {
                        int length=s[i].first-s[i].second);
                        ans[i]=max(ans[i],ans[i-length]+length;
                        top++;
                }
        }
        return ans[i-1];
}
```

## 加权区间调度
本质还是一个 dp 过程，就是算值时多加了一个权重。代码变化不大。

### Code
```cpp
pair <int,int>s[maxn];
ans[maxt];
void findans()
{
        int i,n,top=0;
        scanf ("%d",&n);
        for(int i=0;i<n;i++)
        {
                scanf ("%d %d",&s[i].second,&s[i].first);
                scanf ("%d %d",&weight[i]);
        }
        sort(s,s+n-1);
        for (i=1;top<n;i++)
        {
                ans[i]=ans[i-1];
                while (s[top].first==i)
                {
                        int length=s[i].first-s[i].second);
                        ans[i]=max(ans[i],ans[i-length]+length*weight[i];
                        top++;
                }
        }
        return ans[i-1];
}
```
## 最少区间调度
我们要使用尽量少的区间覆盖指定的区间，可以按开始时间排序，从指定区间左端点开始，遍历所有包含这个左端点的区间，找到最大的右端点作为下一个左端点，这样就能解决问题了。
### Code    
```cpp
const int maxn=1e5+10
pair <int,int>s[maxn];

int main()
{
	int n,beg,end,cnt=0,N;
	scanf ("%d %d",&beg,&N);//指定覆盖区间
	scanf ("%d",&n);//n个待选区间
	F(i,0,n) scanf ("%d %d",&s[i].first,&s[i].second);
	sort(s,s+n-1);
	while(beg<N)
	{
		for (int i=0;i<n;i++)
		{
			if (s[i].first>beg) break;
			if (s[i].second<beg) continue;
			end=maxn(end,s[i].second);
		}
		if (beg==end) return -1;//无法覆盖，无解
		beg=end;
		cnt++;
	}
	printf("%d\n",cnt);
	return 0;
}
```
## 最大区间重叠

## 机器调度



To Be Continued.

<!-- Q.E.D. -->