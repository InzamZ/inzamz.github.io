---
title: 动态规划合集
date: 2021-03-20 10:14:30
updated: 2021-04-27 23:07:58
tags:
  - 动态规划
categories:
  - XCPC
  - 学习笔记
---

> 在高中只学过简单的背包问题，会写简单的状态转移方程。就自以为差不多（实际上就是在逃避现实），而最近刷了 ABC190 后，写了一道状压DP，才发现是时候练一下了。选择题目很杂 , 有些是学校的题目 , 没有题面 . 毕竟也没有人会看的吧 . 
>
> - `UPST2020` : UESTC PreSummer Training 2020

<!-- more -->

---

## 未分类

### UPST2020 F - 我是音乐小天才

#### 解题思路

最简单的回文串构造 , 就是反着写一次 . 要增加最少的字符 , 最好的方法就是利用好原字符里的回文字串 . 所以我们统计字符串和镜像字符串相同的字符 , 将相同的部分 (不必连续) 重叠 , 剩下的就是需要补充的字符了 . 时间复杂度$O(N^2)$, 空间复杂度$O(N^2)$.

- dp<sub>i , j</sub> 表示字符串到第 i 个字符 , 镜像字符串到第 j 个字符时的最长公共字串 . 原字符串 `s1` , 镜像 `s2` 
- $dp_{i , j} = dp_{i-1 , j-1}+1 \ \ s1[i]==s2[j]$
- $dp_{i , j} = max(dp_{i, j-1},dp_{i-1,j}) \ \ s1[i]!=s2[j]$

#### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 5050;
using ll = long long;

char s1[maxn], s2[maxn];
int dp[maxn][maxn];

int main()
{
    // ios::sync_with_stdio(false);
    // cin.tie(0)
    int n;
    scanf("%d", &n);
    scanf("%s", s1 + 1);
    for (int i = 1; i <= n; i++)
        s2[n - i + 1] = s1[i];
    for (int i = 1; i <= n; i++)
    {
        for (int j = 1; j <= n; j++)
        {
            if (s1[i] == s2[j])
                dp[i][j] = dp[i - 1][j - 1] + 1;
            else
                dp[i][j] = max(dp[i][j - 1], dp[i - 1][j]);
        }
    }
    printf("%d",n-dp[n][n]);
    return 0;
}
```

## 背包DP

> 背包问题是在给定有限空间下求物品最大价值的DP , DP通过占用 `i` 空间中前 `j` 件物品获得的最大值进行转移 . 大致有 01 背包以及多重背包问题 , 涉及 `二进制算法`  优化 . 本质区别是物品有多个还是一个 .

### UPST2020 G - 君の名前は？唱：“达拉崩吧斑得贝迪卜多比鲁翁”

#### 解题思路

这是一个多重背包问题 , 多重背包在 01背包 基础上加上一个 k 变量 , 循环一下 , 使用滚动数组 . 对于神奇物品就是循环枚举给予的空间 , 更新 dp 值 . 给他数据范围较水 , 所以直接可以过了 . **当然这道题最坑的是对于神奇物品 , 当分配空间为0 , 即不放入时 , 它的价值不为0 , 所以真TM神奇 . **时间复杂度$O(nC\sum^n_{i=1}k_i)$, 空间复杂度$O(C+n+m)$.

本题有加强版 , 就是下面的 R 题 .

#### 代码

```cpp
#include<cstdio>
#include<iostream>
using namespace std;

typedef long long ll;

#define MAXC 1010

ll M[6][3],N[MAXC][3];
ll dp[MAXC];

ll GetMVal(ll node,ll v)
{
	return M[node][0]*v*v+M[node][1]*v+M[node][2];
}

int main()
{
	ll n,m,C;
	scanf ("%lld %lld %lld",&n,&m,&C);
	for (ll i=1;i<=n;i++) scanf("%lld %lld %lld",&N[i][0],&N[i][1],&N[i][2]);
	for (ll i=1;i<=m;i++) scanf("%lld %lld %lld",&M[i][0],&M[i][1],&M[i][2]);
	for (ll i=1;i<=n;i++)
		for (ll j=C;j>=N[i][0];j--)
			for (ll k=1;k<=N[i][2];k++)
			{
				if (j-k*N[i][0]>=0) dp[j]=max(dp[j],dp[j-k*N[i][0]]+k*N[i][1]);
			}
	for (int i=0;i<=C;i++)
	printf("%lld\n",dp[i]);
	for (ll i=1;i<=m;i++) 
		for (ll j=C;j>=0;j--)
		{
			for (ll k=0;k<=j;k++)
			{
				dp[j]=max(dp[j],dp[j-k]+GetMVal(i,k));
			}
		}
	printf("%lld\n",dp[C]);
	return 0;
}
```

### UPST2020 R -君の名前は？唱：“达拉崩吧斑得贝迪卜多比鲁翁” II

#### 解题思路

跟 G 题一样 , 但是这时候就需要优化速度了 . 原解法精确时间复杂度应该是$nC \sum^{n}_{i=1}k_i$, nC 是背包问题的基础解 , 无法再次优化 . 于是我们考虑$\sum^{n}_{i=1}k_i$. 我们不断考虑 k 的取值 , 其实是有重复的 . 我们只是想让 k 能取到所有值 , 找到最优解 , 那么能不能把它分成若干个小的值 , 让它们随意组合得到 k  , 这样的最优解就是答案了呢 .

> 这部分我也是看了一段时间才想通的 , 讲的可能不好 . 

换句话说 , 我们不去考虑多重背包问题了 , 把它转化成 01背包 . 原理就是把 k 个相同物品分成若干个物品 , 使得任取一个 k 都能用这若干个物品 (取或者不取) 来表示. 很自然 , 分成若干个 , 不就是二进制算法吗 ? 于是把 k 个物品分成 1 2 4 8 ... 2<sup>n</sup> 个该物品捆绑而成的新物品 , 如果无法刚好分完 , 剩下部分单独捆绑作为一个新物品. 于是转化为 01背包问题 . 时间复杂度$O(nC\sum^n_{i=1}log_2 k_i)$, 空间复杂度$O(C+n+m)$ .

#### 代码

```cpp
#include<cstdio>
#include<iostream>
using namespace std;

typedef long long ll;

#define MAXC 10010

ll M[6][3],N[MAXC*8][3];
ll dp[MAXC];

inline ll GetMVal(ll node,ll v)
{
	return M[node][0]*v*v+M[node][1]*v+M[node][2];
}

int main()
{
	ll n,m,C,cur;
	scanf ("%lld %lld %lld",&n,&m,&C);
	cur=n;
	for (ll i=1;i<=n;i++) {
		scanf("%lld %lld %lld",&N[i][0],&N[i][1],&N[i][2]);
	}
	for (int i=1;i<=n;i++)
	{
		int cnt=1;
		while(N[i][2]-cnt>0)
		{
			N[++cur][0]=N[i][0]*cnt;
			N[cur][1]=N[i][1]*cnt;
			N[i][2]-=cnt;
			cnt*=2;
		}
		N[i][0]*=N[i][2];
		N[i][1]*=N[i][2];
	}
	for (ll i=1;i<=m;i++) scanf("%lld %lld %lld",&M[i][0],&M[i][1],&M[i][2]);
	for (ll i=1;i<=cur;i++)
		for (ll j=C;j>=N[i][0];j--)
				dp[j]=max(dp[j],dp[j-N[i][0]]+N[i][1]);
	for (ll i=1;i<=m;i++) 
		for (ll j=C;j>=0;j--)
		{
			for (ll k=0;k<=j;k++)
			{
				dp[j]=max(dp[j],dp[j-k]+GetMVal(i,k));
			}
		}
	printf("%lld\n",dp[C]);
	return 0;
}
```

#### 小插曲

一定记得二进制优化时 , 把原本的记录数量的值减掉 . 我因为这个 `RE` , 因为是`long long`太大`MLE` , 最后把`long long`  改成 `int` , DEBUG了一下午.

## 区间DP

> 区间DP最主要特征就是问题解与区间范围有关 , 小区间可以合成大区间 , 通过枚举区间分割点得到大区间的解 .

### NOI 1995 石子合并

#### 解题思路

我们定义 $f_{(i,j)}$ 是第 i 个到第 j 个石子合并所能得到的最大值 , 那么状态转移方程 : 
$$
f_{(i,j)}=\max_{k=i}^{j-1}(f_{(i,k)}+f_{(k+1,j)}+W_{(i,j)})
$$
其中$W_{(i,j)}$表示第 i 个石子到第 j 个石子的总重量 , 使用前缀和计算 . 需要最大最小 , 只需两个 f 数组和两句判断语句就好了 .

我们需要解决环的问题 . 石子围成环状 , 如果我们枚举起点 , 整个时间复杂度达到了$O(N^4)$, 这是不能接受的 . 于是我们将整条链延长一倍 , 这样的链包含了所有环上的序列 , 也就是数量级降了一级 , 时间复杂度$O(N^3)$.

#### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

const int maxn = 220;
const int IINF = 1e9;

using ll = long long;

int sum[maxn * 2], dpmax[maxn][maxn], dpmin[maxn][maxn];

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n, ans;
    cin >> n;
    for (int i = 1; i <= 2 * n; ++i) {
        if (i <= n) {
            cin >> sum[i];
            sum[i + n] = sum[i];
        }
        sum[i] += sum[i - 1];
    }
    for (int len = 1; len <= n; ++len) {
        for (int i = 1; i <  2 * n; ++i) {
            int j = i + len - 1;
            if (len == 1) {
                dpmax[i][j] = dpmin[i][j] = 0;
                continue;
            }
            dpmax[i][j] = 0;
            dpmin[i][j] = IINF;
            for (int k = i; k < j && k <= 2 * n - 1; ++k) {
                dpmax[i][j] = max(dpmax[i][j], dpmax[i][k] + dpmax[k + 1][j] + sum[j] - sum[i - 1]);
                dpmin[i][j] = min(dpmin[i][j], dpmin[i][k] + dpmin[k + 1][j] + sum[j] - sum[i - 1]);
            }
        }
    }
    ans = dpmin[n][2 * n - 1];
    for (int i = 1; i < n; ++i)
        ans = min(ans, dpmin[i][i + n - 1]);
    cout << ans << endl;
    ans = dpmax[n][2 * n - 1];
    for (int i = 1; i < n; ++i)
        ans = max(ans, dpmax[i][i + n - 1]);
    cout << ans << endl;
    return 0;
}
```

### NOIP2007 矩阵取数游戏

#### 解题思路

每一行都是相对独立的 , 那么只需要逐行计算即可 . 而且区间转移方面不需要枚举 k , 以为转移状态只有在队头取和队尾 . 记$f_{(i,j)}$为区间 `[i,j]` 时取的的最高得分 . 状态转移方程:
$$
f_{(i,j)}=\max(f_{(i-1,j)}+n_{i-1}*2^k,f_{(i,j+1)}+n_{j+1}*2^k)
$$

#### 高精度

本题可以使用 128位int 解决问题 , 不需要高精度 . 但是 C/C++ 没有办法读取 `__int128` 需要自行编写快读 . `__int128` 真的是个好东西 . 

#### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 110;
using ll = __int128;

ll num[maxn][maxn], ans = 0;
ll dp[maxn][maxn], base[maxn];

inline void print(__int128 x)
{
    if (x < 0) {
        putchar('-');
        x = -x;
    }
    if (x > 9)
        print(x / 10);
    putchar(x % 10 + '0');
}

inline __int128 read()
{
    __int128 x = 0, f = 1;
    char ch = getchar();
    while (ch < '0' || ch > '9') {
        if (ch == '-')
            f = -1;
        ch = getchar();
    }
    while (ch >= '0' && ch <= '9') {
        x = x * 10 + ch - '0';
        ch = getchar();
    }
    return x * f;
}

int main()
{
    base[0] = 1L;
    for (int i = 1; i <= 100; ++i)
        base[i] = base[i - 1] * 2;
    ll n, m;
    n = read();
    m = read();
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            num[i][j] = read();
    for (int k = 1; k <= n; ++k) {
        for (int i = 1; i <= m; ++i) {//beg & end
            for (int j = m; j >= i; --j)
                dp[i][j] = max(dp[i - 1][j] + base[m - j + i - 1] * num[k][i - 1], dp[i][j + 1] + base[m - j + i - 1] * num[k][j + 1]);
        }
        ll rans = 0;
        for (int i = 1; i <= m; ++i)
            rans = max(rans, dp[i][i] + num[k][i] * base[m]);
        ans += rans;
    }
    print(ans);
    return 0;
}
```

### IOI 2000 邮局

#### 解题思路

- $f_{(i,j)}$: 在前 `i` 个村庄中放置 `j` 个邮局所求值的最小值

- $W_{(i,j)}$: 第 `i` 个村庄与第 `j` 个村庄间放一个邮局的所求值最小值

状态转移方程 : 
$$
f_{(i,j)} = f_{(k,j-1)}+W_{(k+1,i)}
$$

其实 W 是可以预处理的 , 根据数学知识 , 如果有奇数个村庄 , 邮局要在中位数处 , 偶数要在最中间两个村庄间的任意位置 , 其实统一一下就是首尾序号除以 2 向下取整 . 时间复杂度下降到$O(PV^2)$.

这样的复杂度只能过60% , 至于100% , 需要四边形不等式优化 .

#### 四边形优化

> 参考资料:
>
> - [OI Wiki](https://oi-wiki.org/dp/opt/quadrangle/) : https://oi-wiki.org/dp/opt/quadrangle/
> -  [mlystdcall](https://www.cnblogs.com/mlystdcall/) : https://www.cnblogs.com/mlystdcall/p/6525962.html

第二篇文章中有说过一种躲开证明的方法 , 也可以自己动手证明 . 总之四边形不等式给出了一种方法 , 使得 k 的范围大大缩小了 , 于是又使时间复杂度下降了一个级别 , 变成$O(PV^2)$.

具体有时间再补 , 主要是要自己搞懂不等式 . 

#### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

#define F(a,b,c) for(int (a)=(b);(a)<=(c);++(a))
#define f(a,b,c) for(int (a)=(b);(a)>=(c);--(a))
#define INF 0x3f3f3f3f

const int maxv = 3010;
const int maxp = 310;
using ll = long long;

int x[maxv], dp[maxv][maxp], d[maxv][maxp], w[maxv][maxv];

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int V, P;
    cin >> V >> P;
    memset(dp, 0x3f, sizeof(dp));
    F(i, 1, V)    cin >> x[i];
    sort(x + 1, x + 1 + V);
    F(l, 1, V) {
        w[l][l] = 0;
        F(r, l + 1, V) {
            w[l][r] = w[l][r - 1] + x[r] - x[(l + r) >> 1];
        }
    }
    dp[0][0] = 0;
    F(j, 1, P) {
        d[V + 1][j] = V;
        f(i, V, 1) {
            int mind, mindp = INF;
            F(k, d[i][j - 1], d[i + 1][j]) {
                if (dp[k][j - 1] + w[k + 1][i] < mindp) {
                    mindp = dp[k][j - 1] + w[k + 1][i];
                    mind = k;
                }
            }
            dp[i][j] = mindp;
            d[i][j] = mind;
        }
    }
    cout << dp[V][P] << endl;
    return 0;
}
```

###  UPST2020 P  近战法师暴击好累

#### 解题思路

显然 , 可以合并 , 判断为区间DP . 但是合并后会出现新的单位 , 是处理的难点 . 我们使用一个数组表示如果能合并 , 这个区间的新值 . 然后就是简单的区间 DP 了 .

#### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 505;
using ll = long long;

int dp[maxn][maxn], a[maxn][maxn];

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n;
    cin >> n;
    for (int i = 1; i <= n; ++i)
        cin >> a[i][i];
    memset(dp, 0x3f, sizeof(dp));
    for (int len = 1; len <= n; ++len) {
        for (int i = 1, j = i + len - 1; j <= n; ++i, ++j) {
            dp[i][i] = 1;
            for (int k = i; k < j; ++k) {
                if (dp[i][k] == 1 && dp[k + 1][j] == 1 && a[i][k] == a[k + 1][j]) {
                    a[i][j] = a[i][k] + 1;
                    dp[i][j] = 1;
                }
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k + 1][j]);
            }
        }
    }
    cout << dp[1][n] << endl;
    return 0;
}
```

## 数位DP

### 

解题思路

To Be Continued.

<!-- Q.E.D. -->