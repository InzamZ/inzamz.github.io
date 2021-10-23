---
title: UESTC PreSummer Training
date: 2021-03-21 22:29:15
updated: 2021-03-22 23:22:25
tags:
	- 数据结构
categories:
	- ICPC 数据结构
---

> 这是去年的数据结构专题，拿来练练。

<!-- more -->

---

## A - 红魔族首屈一指の恶魔使

### 解题思路

括号匹配，本身就是一个栈问题。判断栈顶和接下来入栈的括号对比，如果可以匹配就让栈顶出栈；否则入栈。最后直接输出栈内元素即为答案。时间复杂度 *O(N)* , 空间复杂度 *O(N)* .

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 1e6 + 10;

char mstack[maxn];
int cnt;

int main()
{
    // ios::sync_with_stdio(false);
    int T, n;
    scanf("%d",&T);
    while (T--)
    {
        scanf("%d",&n);
        cnt = 0;
        for (int i = 0; i < n; i++)
        {
            char ch;
            scanf(" %c", &ch);
            if (cnt && mstack[cnt - 1] == '(' && ch == ')')
                cnt--;
            else
                mstack[cnt++] = ch;
        }
        printf("%d\n", cnt);
    }
    return 0;
}
```

## B - 雪菜的新家

> 别看白学家讨论起恋爱的内容都是那么熟练，通篇难懂的话，诸如OO小三，XX碧池，然而只需故意高声嚷到：“白学家，可曾有女朋友！”，他便涨红了脸，额上的青筋条条绽出，争辩道：“白学家的女友哪能叫女友，叫右姑娘……”
>
> 白色相簿什么的，已经无所谓了。因为已经不再有歌，值得去唱了。
>
> 传达不了的恋情，已经不需要了。因为已经不再有人，值得去爱了。

### 解题思路

首先 , 作为白学家 , 我坚定 `贱男春` 的观点 , 而且作为雪菜党 , 我觉得他不配 . 

其次 , 这是一道并查集,记得校内赛初赛有一道,我用 `set` 水过去 , 但好像有地方写错了 , 找不出 . 最近查了并查集 , 发现了原来直接用数组和路径压缩就好了 . 

### 重大BUG

遇到了一个很大的问题 , 其实就是一个细节 , 就是当 2 3 相互包含时 , 没必要在意先后顺序 , 因为得到其中一个 , 该集合里的其他罐子就都可以解了 . 以及如果 `2`  `3` 相互包含 , `2` 的祖先已经指向为 `3` 了 , 到 `3` 时要先判断 `2` 的祖先是不是 `3` 否则就会出现环 , 在 `find` 函数中死循环 . 

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int fa[1000010];
bool ap[1000010];

int ifind(int x)
{
    return fa[x] == x ? x : (fa[x] = ifind(fa[x]));
}

void imerge(int x, int y)
{
    fa[ifind(x)] = ifind(y);
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int n, ans = 0;
    cin >> n;
    for (int i = 1; i <= n; i++)
        fa[i] = i;
    for (int i = 1; i <= n; i++)
    {
        int a;
        cin >> a;
        if (ifind(a) != i) imerge(a, i);
    }
    for (int i = 1; i <= n; i++)
    {
        if (ap[ifind(i)] == false){
            ans++, ap[fa[i]] = 1;
        }
    }
    cout << ans << endl;
    return 0;
}
```

## C - 我，不是说了能力要平均值么

### 解题思路

这是一道数学题 , 需要推导 . 

- `x` : 表示平均值
- `S ` : 表示前 i 项之和    

$$
x\le k \\
S_r-S_{l-1} \le k*(r-l+1) \\
S_r-k*r \le S_{l-1} -k *(l-1)
$$

于是只需要找出 $S_i-k*i$ 的 逆序对即可 . 逆序对用归并排序统计交换次数即可 . 最后用辗转相除法约分 . 时间复杂度 *O(NlogN)* , 空间复杂度*O(N)* .

###  代码

```cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 2e5 + 10;
using ll = long long;

ll s[maxn], s2[maxn];

ll mergesort(ll l, ll r)
{
    if (l == r)
        return 0;
    ll cnt = 0, mid = (l + r) >> 1, i = l, j = mid + 1, k = l;
    cnt += mergesort(l, mid);
    cnt += mergesort(mid + 1, r);
    while (i <= mid && j <= r)
    {
        if (s[i] >= s[j])
        {
            cnt += (mid - i + 1);
            s2[k++] = s[j++];
        }
        else
            s2[k++] = s[i++];
    }
    while (i <= mid)
        s2[k++] = s[i++];
    while (j <= r)
        s2[k++] = s[j++];
    for (i = l; i <= r; i++)
        s[i] = s2[i];
    return cnt;
}
ll gcd(ll x, ll y)
{
    return y == 0 ? x : gcd(y, x % y);
}
int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    ll n, k, sum = 0, ans, gcdnum;
    cin >> n >> k;
    for (ll i = 1; i <= n; i++)
    {
        cin >> s[i];
        s[i] = s[i-1] +s[i] - k ;
    }
    ans = mergesort(0, n);
    gcdnum = gcd(ans, (n * (n + 1)) / 2ll);
    cout << ans / gcdnum << '/' << n * (n + 1) / 2ll / gcdnum << endl;
    return 0;
}
```



To Be Continued.

<!-- Q.E.D. -->