---
title: 2021 UESTC ICPC Training for Data Structures
categories:
  - ICPC 数据结构
tags:
  - 线段树
  - 主席树
  - 链表
  - 单调栈/队列
  - 并查集
  - ST表
  - 树状数组
  - 树链剖分
  - 二叉平衡树
  - 莫队算法
  - 二分答案
  - K-D树
  - 扫描线
date: 2021-05-11 14:50:01
updated: 2021-05-21 10:59:01
---

> 板子题并没有给出详细的讲解 , 讲了大致思路 , 以及对于某些细节上的处理 . 代码也是把板子部分去了 , 留下需要改的部分 . 

<!-- more -->

## A - 大佬集中营

### 解题思路

区间问题，先想到的是主席树。但是挂题意了，有可能多个学渣选大佬，所以 k 并不是区间长度。区间长度的话就是另外一道题了，是主席树的板题 [[POI2014]KUR-Couriers](https://www.luogu.com.cn/problem/P3567) 。所以问题复杂了，但是顺着刚才的思路，我们发现众数数量不超过一半时，答案就是 `1` .那如果超过一半呢 , 我们考虑这样的分组 . 第一组众数数量$2*k+1$非众数$2*k$, 这是优解 , 很好利用了向上取整多出的一个数 . 如果还有一组数$2*l+1$和$2*l$的话 , 加一下$2*(k+l+1)$个众数以及$2*(k+l)$个非众数 . 我们发现是可合并的 , 所以分组最少就取最大的一组 , 让剩余的众数每一个作为一组就好了 . 

- `tot` : 区间长度
- `x` : 区间内众数个数
- `ans` : 最终分的组数

$$
Ans=x-[(tot-x)+1]+1=2*x-tot
$$

主席树维护一下区间内数字个数 , 叶子节点的最大值就是众数个数 . 而且子树的所有数字个数如果小于区间长度的一半 , 那就可以跳过该子树 , 用于剪枝 . 

### 复杂度分析

时间复杂度方面建树是$O(N)$, 主席树每次操作$O(logN)$ , N 个版本$O(NlogN)$ , 每次查询$O(logN)$, Q和N同阶 , 最终时间复杂度
$$
O=O(N)+O(NlogN)+O(NlogN)=O(NlogN)
$$

### 关键代码

```cpp
void query(int x, int y, int l, int r)
{
    if (l == r) {
        if (Tree[y].val - Tree[x].val > ans)
            ans = Tree[y].val - Tree[x].val;
        return ;
    }
    int mid = (l + r) >> 1;
    if (Tree[Tree[y].ls].val - Tree[Tree[x].ls].val > all / 2)
        query(Tree[x].ls, Tree[y].ls, l, mid );
    if (Tree[Tree[y].rs].val - Tree[Tree[x].rs].val > all / 2)
        query(Tree[x].rs, Tree[y].rs, mid + 1, r);
}
int update(int pre, int l, int r)
{
    int now = tot++;
    Tree[now].ls = Tree[pre].ls;
    Tree[now].rs = Tree[pre].rs;
    Tree[now].val = Tree[pre].val;
    if (l == r ) {
        ++Tree[now].val;
        return now;
    }
    int mid = (l + r) >> 1;
    if (mid >= kth)
        Tree[now].ls = update(Tree[now].ls, l, mid);
    else
        Tree[now].rs = update(Tree[now].rs, mid + 1, r);
    Tree[now].val = Tree[Tree[now].ls].val + Tree[Tree[now].rs].val;
    return now;
}
```

## B - 土豆的树

### 解题思路

这道题是在 L 之后写的 , 于是思路很清晰 , 很像树链剖分 , 用到了 dfs 序 . 颜色就是用状态压缩 , 使用 `longlong` 表示染色状态 , 位运算使用异或判断颜色是否相同 , 同或用于染色 . 子树在dfs序上是连续的 , 于是可以用线段树维护颜色树 . 注意土豆的"树"可能是森林 , 一切都是这么令人惬意 , 结果我挂了题意 . 在讲座前一晚问了 ljj 大佬思路 , 发现一模一样 , 让我检查一下染色部分 , 容易写炸 . 讲座后思考了取模方法 , 发现原来是颜色序号差不超过 50 , 一直当成颜色不超过 50 种 , 这连 `map` 都没必要了 , 直接取模 51 不就好了 . 是 51 ,因为 0 和 50 号颜色可以同时存在 . 但是还是一直挂 , 最后乱改了好久 , 把所有数组开 `longlong` 就过了 , 原来是 lazy 标记的颜色没有用 `longlong` . 交了 28 发 , 麻了 .

### 关键代码

```cpp
int cmpcol(ll a, ll b)
{
    int cnt = 0;
    a ^= b;
    while (a) {
        if (a & 1ll)    ++cnt;
        a >>= 1;
    }
    return cnt;
}
void pushdown(int root, int l, int r)
{
    sum[lson] = 1;
    sum[rson] = 1;
    color[lson] = mark[root];
    color[rson] = mark[root];
    mark[lson] = mark[root];
    mark[rson] = mark[root];
    mark[root] = 0;
    return ;
}
void update(int root, int l, int r, int astart, int aend, ll k)
{
    if (astart <= l && r <= aend) {
        mark[root] = k;
        sum[root] = 1;
        color[root] = k;
    }
    else {
        if (mark[root])
            pushdown(root, l, r);
        if (astart <= mid && k ^ color[lson])
            update(lson, l, mid, astart, aend, k);
        if (aend > mid && k ^ color[rson])
            update(rson, mid + 1, r, astart, aend, k);
        color[root] = color[lson] | color[rson];
        sum[root] = sum[rson] + cmpcol(color[root], color[rson]) ;
    }
}
inline int qsum(int root, int l, int r, int fl, int fr, ll &col)
{
    int ans = 0;
    if (fl <= l && r <= fr) {
        ans = cmpcol(col, color[root] | col);
        col = col | color[root];
        return ans;
    }
    else {
        if (mark[root])
            pushdown(root, l, r);
        if (fl <= mid && col ^ color[lson])
            ans += qsum(lson, l, mid, fl, fr, col);
        if (fr > mid && col ^ color[rson])
            ans += qsum(rson, mid + 1, r, fl, fr, col);
    }
    return ans;
}
void dfs1(int x, int f)
{
    id[x] = ++cur;
    for (int i = first[x]; i; i = inext[i]) {
        if (to[i] == f)
            continue;
        dfs1(to[i], x);
    }
    tails[id[x]] = cur;
}
```

## D - 三仙归洞

### 解题思路

一看就是要用链式结构来写 , 再看数据范围 , 就是要$O(N)$时间复杂度 . 一开始想用第 N 个链表节点表示第 N 个位置的碗 , 但是每次操作都要找到球 , 所以我们直接让第 N 个链表节点表示 N 个小球的信息 , 再加上头尾节点 , 用于输出 . 

对于操作四 , 我们用一个 `flag` 标记就好了 , 反向后左右边颠倒 . 还有一个点就是节点相邻执行操作三 , 注意一下细节 , 我懒得改就直接加了特判 . 

### 关键代码

```cpp
void move_to_l(int x, int y, bool flag)
{
    if (flag) {
        move_to_r(x, y, !flag);
        return ;
    }
    s[x].l->r = s[x].r;
    s[x].r->l = s[x].l;
    s[x].l = s[y].l;
    s[x].r = &s[y];
    s[y].l->r = &s[x];
    s[y].l = &s[x];
}
void swap_xy(int x, int y)
{
    node *xl = s[x].l, *xr = s[x].r;
    if (xr == &s[y]) {//交换相邻元素
        s[x].l->r=&s[y];
        s[y].r->l=&s[x];
        s[x].r = s[y].r;
        s[y].l = s[x].l;
        s[x].l = &s[y];
        s[y].r = &s[x];
        return ;
    }
    if (xl == &s[y]) {
        s[x].r->l=&s[y];
        s[y].l->r=&s[x];
        s[y].r = s[x].r;
        s[x].l = s[y].l;
        s[y].l = &s[x];
        s[x].r = &s[y];
        return ;
    }
    s[x].l->r = &s[y];
    s[x].r->l = &s[y];
    s[x].l = s[y].l;
    s[x].r = s[y].r;
    s[y].l->r = &s[x];
    s[y].r->l = &s[x];
    s[y].l = xl;
    s[y].r = xr;
}
```

---

## E - 众人拾柴火焰高

### 解题思路

二分答案法，每次我们枚举答案，然后验证是否成立。再使用差分记录火堆的影响。我是使用一个队列，队列里面放的是某个火焰失去效果的时间点，每次判断队列首与当前时间是否匹配，匹配就减去一个火堆的加成。从头开始，某个村庄温度过低就放一个火堆刚好边缘影响了当前村庄。

### 复杂度分析

二分答案需要$O(logN)$次验证，每次验证是$O(N)$，最终时间复杂度是$O(NlogN)$.

### 代码

```cpp
while (l + 1 < r)
{
    int mid = (l + r) >> 1;
    int cntm = m, cur = 1, delta = 0;
    bool flag = true;
    while (flag) {
        if (cur > n)    break;
        while (!q.empty() && q.front() == cur) {
            delta -= k;
            q.pop();
        }
        while (num[cur] + delta < mid) {
            if (cntm) {
                --cntm;	delta += k;
                q.push(cur + 2 * x + 1);
            }
            else {
                flag = false;break;
            }
        }
        ++cur;
    }
    if (flag)    l = mid;
    else    r = mid;
    while (!q.empty())    q.pop();
}
```

## F - 我，不是说了能力要平均值么 · 改三

### 解题思路

首先 , 因为取模与逆元 , 我们可以忽略约分操作 (对比改一) . [逆元的前置知识](https://www.inzamz.top/2020/InverseElement/)在这 , 简单来说除以 K mod M 换成乘$K^{M-2}$取 mod M .

### 代码

```cpp
for (int i = 1; i <= n; ++i)
{
    int len = 1;
    cin >> a;
    while (!mx.empty() && mx.top().val >= a) {
        len += mx.top().len;
        mxsum -= (mx.top().len * mx.top().val);
        mxsum = (mxsum + mod) % mod;
        mx.pop();
    }
    mx.push(node(len, a));
    mxsum += (len * a);
    mxsum = (mxsum + mod) % mod;
    len = 1;
    while (!mn.empty() && mn.top().val <= a) {
        len += mn.top().len;
        mnsum -= (mn.top().len * mn.top().val);
        mnsum = (mnsum + mod) % mod;
        mn.pop();
    }
    mn.push(node(len, a));
    mnsum += (len * a);
    mnsum = (mnsum + mod) % mod;
    ans = (ans + mxsum + mnsum) % mod;
}
```

## G - 魔空「小行星带」

### 解题思路

学了K-D树后 , 可以很轻松构造出一棵树来维护他 , 但是要维护什么数据呢 , 这是解题的关键 . 然后发呆了一个晚上GHI都是细节处理不了 , 躺在床上想通了 . 先储存初始状态的和 , 对于取模操作我们再维护一个最大值和最小值 , 每次询问先对时间取模 , 然后找到在范围内的子树时 . 

- 如果最大值加上时间不需要取模 , 说明不用取模 .
- 如果最小值加上时间还要取模 , 那么全部都要取模 , 减一下 .

什么 ? 会混在一起 , 那继续找 ? 于是 TLE 了 . 后来看一眼数据 , c 居然才10 , 那我直接每个节点开个数组就好了 , 这样记录所有子节点各个初始值的数量 . 当区间完全包含在查询区间里 , 直接循环一遍求和就好了 . 

### 关键代码

```cpp
int query(int x)
{
    int res = 0;
    if (!x || xr < L[x] || R[x] < xl || yr < D[x] || U[x] < yl)
        return 0;
    if (xl <= L[x] && R[x] <= xr && yl <= D[x] && U[x] <= yr ) {
        for (int i = 0; i <= c; ++i)    res += (cnt[x][i] * ((i + t) % c));
        return res;
    }
    if (xl <= s[x].x && s[x].x <= xr && yl <= s[x].y && s[x].y <= yr )
        res = res + (s[x].v + t) % c;
    return res + query(ls[x]) + query(rs[x]);
}
void maintain(int x)
{
    siz[x] = siz[ls[x]] + siz[rs[x]] + 1;
    sum[x] = sum[ls[x]] + sum[rs[x]] + s[x].v;
    for (int i = 0; i <= c; ++i)    cnt[x][i] = 0;
    cnt[x][s[x].v] = 1;
    L[x] = R[x] = s[x].x;
    U[x] = D[x] = s[x].y;
    if (ls[x]) {
        L[x] = min(L[x], L[ls[x]]);R[x] = max(R[x], R[ls[x]]);
        D[x] = min(D[x], D[ls[x]]);U[x] = max(U[x], U[ls[x]]);
        for (int i = 0; i <= c; ++i)    cnt[x][i] += cnt[ls[x]][i];
    }
    if (rs[x]) {
        L[x] = min(L[x], L[rs[x]]);R[x] = max(R[x], R[rs[x]]);
        D[x] = min(D[x], D[rs[x]]);U[x] = max(U[x], U[rs[x]]);
        for (int i = 0; i <= c; ++i)    cnt[x][i] += cnt[rs[x]][i];
    }
}
```

## I - 种田Ⅰ

### 解题思路

扫描线算法 , 每次统计覆盖长度,乘以到下一条线段的高度差 . 当然这道题要解决的是偶数次覆盖的问题 , 倒过来就是解决奇数次覆盖问题 . 使用了两个标记 , 一个是原本扫描线的标记 , 另一个是奇数次覆盖的的标记 , 这个标记只要每一次异或一下就好了 , 因为覆盖奇数次线段就没有了 , 偶数次覆盖就变成奇数次了 . 每次覆盖更新奇数段长度就好了 . 不知道题解说的反转一下是不是这个意思 . 

### 关键代码

```cpp
void do_odd(ll o, ll L, ll R)
{
    ll all = num[R + 1] - num[L];
    tree[o].sum2 = (all - tree[o].sum2);
}
void pushup(ll o, ll L, ll R)
{
    if (tree[o].lazy)
        tree[o].sum1 = num[R + 1] - num[L];
    else
        tree[o].sum1 = tree[lo].sum1 + tree[ro].sum1;
}
void pushdown(ll o, ll L, ll R)
{
    if (tree[o].lazy2) {
        ll mid = (L + R) >> 1;
        do_odd(lo, L, mid);
        do_odd(ro, mid + 1, R);
        tree[lo].lazy2 ^= 1;
        tree[ro].lazy2 ^= 1;
        tree[o].lazy2 = 0;
    }
}
void addval(ll o, ll L, ll R)
{
    if (num[R + 1] <= ql || num[L] >= qr)
        return ;
    if (ql <= num[L] && num[R + 1] <= qr) {
        tree[o].lazy += k;
        do_odd(o, L, R);
        tree[o].lazy2 ^= 1;
        pushup(o, L, R);
        return ;
    }
    pushdown(o, L, R);
    ll M = (L + R) / 2;
    addval(lo, L, M);
    addval(ro, M + 1, R);
    pushup(o, L, R);
    tree[o].sum2 = tree[lo].sum2 + tree[ro].sum2;
}
```

## J - 马老师的餐厅

### 解题思路

我们要想菜尽量多 , 就要让比较多的先使用 , 于是我们令每次取前三多的原材料做一道菜 . 注意做完后原材料不一定是前三多了 , 需要排序 . 原数组本就有序 , 于是用优先队列 . 重复上述过程 .

### 关键代码

```cpp
while (q.size() >= 3)
{
    int a1, a2, a3;
    ++ans;
    a1 = q.top();
    q.pop();
    a2 = q.top();
    q.pop();
    a3 = q.top();
    q.pop();
    if (a1 - 1)
        q.push(a1 - 1);
    if (a2 - 1)
        q.push(a2 - 1);
    if (a3 - 1)
        q.push(a3 - 1);
}
```

## K - Yousa的鸟蛋

### 解题思路

第一次拿到题我尝试着写了个矩形树，结果时间复杂度报表，后来才想到了树状数组。类似于一维树状数组的差分思想，我们分析和与元素之间的关系。
$$
    sum_{i,j}=sum_{i-1,j}+sum_{i,j-1}-sum_{i-1,j-1}+a{i,j}
    a_{i,j}=a_{i-1,j}+a_{i,j-1}-a_{i-1,j-1}+d{i,j}
$$
于是我们给出差分数组的公式
$$
d_{i,j}=a_{i,j}-a{i-1,j}-a_{i,j-1}+a_{i-1,j-1}
$$
接下来我们考虑的是区间和与差分数组的关系:
$$
\begin{aligned}
    sum_{x,y} &=\sum_{i=1}^{x}\sum_{j=1}^{y} a_{i,j} \\
    &=\sum_{i=1}^{x}\sum_{j=1}^{y}\sum_{k=1}^{i}\sum_{l=1}^{j}d_{k,l}\\
    &=\sum_{i=1}^{x}\sum_{j=1}^{y} (x+1)(y+1)d_{i,j}-(y+1)id_{i,j}-(x+1)jd_{i,j}+ijd_{i,j}
\end{aligned}
$$
于是我们维护四个数组，然后反过来按照公式求和就好了。

### 复杂度分析

时间复杂度每次查询和修改，每一个维度上树状数组操作都是$O(logN)$，于是二维树状数组就是$O(log^2N)$。空间复杂度$O(N^2)$。

### 关键代码

```cpp
void addval(int x,int y,int k)
{
    v[0]=k;v[1]=k*x;v[2]=k*y;v[3]=k*x*y;
    for (int i=x;i<=n;i+=lowbit(i))
        for(int j=y;j<=m;j+=lowbit(j))
        {
            tarray[i][j][0]+=v[0];
            tarray[i][j][1]+=v[1];
            tarray[i][j][2]+=v[2];
            tarray[i][j][3]+=v[3];
        }
}

void add(int x1,int y1,int x2,int y2,ll k)
{
    addval(x1,y1,k);
    addval(x2+1,y2+1,k);
    addval(x1,y2+1,-k);
    addval(x2+1,y1,-k);
}

ll sum(int x,int y)
{
    v[0]=v[1]=v[2]=v[3]=0;
    for(int i=x;i>0;i-=lowbit(i))
        for(int j=y;j>0;j-=lowbit(j))
        {
            v[0]+=tarray[i][j][0];
            v[1]+=tarray[i][j][1];
            v[2]+=tarray[i][j][2];
            v[3]+=tarray[i][j][3];
        }
    return (x+1)*(y+1)*v[0]-(y+1)*v[1]-(x+1)*v[2]+v[3];
}

ll getsum(int x1,int y1,int x2,int y2)
{
    return sum(x2,y2)-sum(x1-1,y2)-sum(x2,y1-1)+sum(x1-1,y1-1);
}
```

## L - 芜湖塔台请求起飞

### 解题思路

树链剖分板子题。树链剖分的的思想就是把某些树上的问题转化成链上的问题，使用线段树等结构来维护他，利用等就是dfs序。树上路径不需要遍历一整棵树，所以我们把树分成了若干条链~~（B是个阉割版的，有点像）~~。发现任意两个点总会汇集到一起某一个根结点，每次找路径的时候，所以每次我们不断从链尾跳到链头，根据节点深度决定哪个点跳，直到两个结点在同一条链上。
链的分法就不多赘述了，找子树大小大的方向使链延伸。

### 代码

```cpp
void dfs1(int x, int f, int d)
{
    fa[x] = f;
    siz[x] = 1;
    dep[x] = d;
    int maxson = -1;
    for (int i = first[x]; i; i = inext[i]) {
        if (to[i] == f)
            continue;
        dfs1(to[i], x, d + 1);
        siz[x] += siz[to[i]];
        if (siz[to[i]] > maxson)
            maxson = siz[to[i]], son[x] = to[i];
    }
}
void dfs2(int x, int topf)
{
    id[x] = ++cur;
    top[x] = topf;
    w2[cur] = w1[x];
    if (!son[x])
        return ;
    dfs2(son[x], topf);
    for (int i = first[x]; i; i = inext[i]) {
        if (to[i] != fa[x] && to[i] != son[x])
            dfs2(to[i], to[i]);
    }
}
int lss(int beg, int end)
{
    int ans = 0;
    while (top[beg] != top[end]) {
        if (dep[top[beg]] < dep[top[end]])
            swap(beg, end);
        ans +=sum(1, 1, n, id[top[beg]], id[beg]);
        beg = fa[top[beg]];
    }
    if (dep[beg] > dep[end])
        swap(beg, end);
    ans += sum(1, 1, n, id[beg], id[end]);
    return ans ;
}
int imax(int beg, int end)
{
    int ans = -inf;
    while (top[beg] != top[end]) {
        if (dep[top[beg]] < dep[top[end]])
            swap(beg, end);
        ans = max(ans, query(1, 1, n, id[top[beg]], id[beg]));
        beg = fa[top[beg]];
    }
    if (dep[beg] > dep[end])
        swap(beg, end);
    ans = max(ans, query(1, 1, n, id[beg], id[end]));
    return ans ;
}
```

## M - 采集物资

### 解题思路

解决区间第k小问题，可以使用平衡树。但是其中有一个问题，就是有多个区域，而且还要合并，这就涉及到了启发式合并了。~~说白了就是暴力，还以为多神奇~~.

题解说的是Splay，但是我的Splay真的写的稀烂，调了好久调不好，所以我直接掏出SBT。合并的时候找到小的一棵树，DFS一下整棵树，每个结点都插入要合并的树上。这里要注意，并查集的合并方向要和启发式合并相同。

### 关键代码

```cpp
void dfs(int &rt, int &_to)
{
    if (!rt) return ;
    f[id[rt]] = id[_to];
    insert(_to, datas[rt], id[rt]);
    if (son[rt][0])
        dfs(son[rt][0], _to);
    if (son[rt][1])
        dfs(son[rt][1], _to);
}
void Merge(int &a, int &b)
{
    if (siz[a] > siz[b])
        swap(a, b);
    dfs(a, b);
    a = b;
}
/*main
int &p = root[ifind(a)];
int &q = root[ifind(b)];
if (p != q)
    Merge(p, q);
*/
```

## N - 土豆的序列

### 解题思路

平衡树板子题。接上题，因为专题初就手打了一遍SBT，所以SBT很熟。二叉平衡树就是遵循左子树小于根结点小于右子树的一棵树，然而因为插入顺序未知，如果选定某个结点作为根固定，很容易使树退化，甚至变成链表，对复杂度影响很大。于是有各种方式来平衡它，通过旋转使树尽量不退化。

Splay遵循查找频率高的节点保持在离根近的地方，每次操作后都将结点旋转到根，而SBT(Size-Balanced-Tree)通过记录子树大小旋转实现平衡。

基本的左旋右旋操作就是在保证树的性质不变的情况下把结点变为根结点的操作。

### 关键代码

```cpp
void rotate(int &rt, int k)
{
    int nrt = son[rt][!k]; //new root
    son[rt][!k] = son[nrt][k];
    son[nrt][k] = rt;
    siz[nrt] = siz[rt];
    siz[rt] = siz[son[rt][0]] + siz[son[rt][1]] + 1;
    rt = nrt;
}

void maintain(int &rt, bool k)
{
    if (siz[son[son[rt][k]][k]] > siz[son[rt][!k]])
        rotate(son[rt][k], !k);
    else if (siz[son[son[rt][k]][!k]] > siz[son[rt][!k]])
        rotate(son[rt][k], k), rotate(rt, !k);
    else
        return ;
    maintain(son[rt][0], 0);
    maintain(son[rt][1], 1);
    maintain(rt, 0);
    maintain(rt, 1);
}

void insert(int &rt, int val)
{
    if (rt == 0) {
        rt = ++tails;
        datas[rt] = val;
        son[rt][0] = son[rt][1] = 0;
        siz[rt] = 1;
        return ;
    }
    ++siz[rt];
    if (val <= datas[rt])
        insert(son[rt][0], val);
    else
        insert(son[rt][1], val);
    maintain(rt, datas[rt] > val);
}

void del(int &rt, int val)
{
    if (datas[rt] != val) {
        del(son[rt][datas[rt] < val], val);
        siz[rt] = siz[son[rt][0]] + siz[son[rt][1]] + 1;
        return ;
    }
    --siz[rt];
    if (son[rt][0] == 0)
        rt = son[rt][1];
    else if (son[rt][1] == 0)
        rt = son[rt][0];
    else {
        int p = son[rt][1];
        while (son[p][0] != 0)
            p = son[p][0];
        datas[rt] = datas[p];
        del(son[rt][1], datas[p]);
    }
}

int pre (int val)
{
    int cur = sbt, ans = 0;
    while (cur != 0) {
        if (datas[cur] < val)
            ans = cur, cur = son[cur][1];
        else
            cur = son[cur][0];
    }
    return datas[ans];
}

int nxt (int val)
{
    int cur = sbt, ans = 0;
    while (cur != 0) {
        if (datas[cur] > val)
            ans = cur, cur = son[cur][0];
        else
            cur = son[cur][1];
    }
    return datas[ans];
}

int xth(int x)
{
    int cur = sbt;
    while (siz[son[cur][0]] + 1 != x) {
        if (siz[son[cur][0]] + 1 < x)
            x -= (siz[son[cur][0]] + 1), cur = son[cur][1];
        else
            cur = son[cur][0];
    }
    return datas[cur];
}

int ranks(int val)
{
    int cur = sbt, ans = 0;
    while (cur != 0) {
        if (datas[cur] < val)
            ans += (siz[son[cur][0]] + 1), cur = son[cur][1];
        else
            cur = son[cur][0];
    }
    return ans;
}
```

## O - 土豆的集合

### 解题思路

主席树板题，一开始我想试着用栈模拟回退操作，结果调了好久最后TLE。后来学了一下主席树后，发现把主席树用在并查集上就能解决问题。但是此时不能路径压缩，因为路径压缩丢失了信息，导致后面回溯操作会出问题。

集合合并时，我们不断递归到子结点，因为我们没走过的部分是没有任何改变的，所以直接重复利用，直将将沿途的链更新。
因为主席树结点需要不断更新，所以不满足$2*o$和$2*o+1$的性质，需要单独记录左右孩子编号。

### 关键代码

```cpp
inline int find(int root, int x)
{
    node now = Tree[root];
    if (now.l == now.r)
        return now.fa;
    int mid = (now.l + now.r) >> 1;
    if (x <= mid)
        return find(now.ls,x);
    else
        return find(now.rs,x);
}

inline int getfa(int root, int x)
{
    int fa = find(root, x);
    if (fa == x)
        return x;
    else
        return getfa(root, fa);
}

inline int update(const int pre, int loc, int val)
{
    int now = tot++;
    copy(now, pre);
    if (Tree[now].l == Tree[now].r ) {
        Tree[now].fa = val;
        return now;
    }
    int mid = (Tree[now].l + Tree[now].r) >> 1;
    if (loc <= mid)
        Tree[now].ls = update(Tree[now].ls,loc,val);
    else
        Tree[now].rs = update(Tree[now].rs,loc,val);
    return now;
}
```

## T - 羽毛球赛

### 解题思路

回滚莫队算法，因为完全没接触过，所以从头开始学。先学了普通莫队算法，感觉很神奇，居然排了个序就能这么舒服的暴力。我看的是SPOJ3267Query，题目问的是某个区间内出现的数字总数，就是左右指针跑来跑去移动一下找结果嘛。

然后就是回滚莫队了，问题就出在删除上，因为我们删除的时候已经丢失了上一次信息，所以要重新跑一遍获得？这样复杂度还不如直接暴力。回滚莫队思路是不删除，因为左端点同一块的询问，右端点都是递增的，于是我们处理右端点是不需要删除的，至于左端点部分，我们直接暴力解决就好了，因为分块过，保证每次左端点暴力不会超过$O(\sqrt{N})$并且N个左端点，总时间复杂度还是$O(NlogN)$。

回到T题，问题是如何保存数据能在$O(1)$内更新答案呢。我一开始保存的是每个数字目前最右的位置，但是这会导致右端点出现这个数时无法更新答案；改为最左边的又发现左端点暴力处理的时候也有问题，索性直接存了两个数，而且只存下一个块的位置，左端点所在的块信息只对每个左端点有效，不必保存。

### 关键代码

```cpp
for (int k = 0; k <= blockn; ++k)
{
    int l = ranger[k] + 1, r = ranger[k];
    memset(cnt, 0, sizeof(cnt));
    ll temp = 0, now = 0;
    for (; block[q[i].l] == k; ++i) {
        int ql = q[i].l, qr = q[i].r;
        if (block[q[i].l] == block[q[i].r]) {
            temp = 0;
            for (int j = ql; j <= qr; ++j)
                cnt2[id[j]] = 0;
            for (int j = ql; j <= qr; ++j) {
                if (!cnt2[id[j]])
                    cnt2[id[j]] = j;
                else
                    temp = max(temp, 1ll * abs(j - cnt2[id[j]]));
            }
            ans[q[i].id] = temp;
            continue;
        }
        while (r < qr) {
            if (!cnt[id[++r]][0])
                cnt[id[r]][1] = cnt[id[r]][0] = r;
            else {
                cnt[id[r]][1] = r;
                now = max(now, 1ll * abs(r - cnt[id[r]][0]));
            }
        }
        temp = now;
        while (ql < l) {
            if (!cnt[id[--l]][1])
                cnt[id[l]][1] = l;
            else
                temp = max(temp, 1ll * abs(l - cnt[id[l]][1]));
        }
        ans[q[i].id] = temp;
        while (l < ranger[k] + 1) {
            if (cnt[id[l]][1] < ranger[k] + 1)
                cnt[id[l]][1] = 0;
            ++l;
        }
    }
}
```

## V -  打怪兽

### 解题思路

离线RMQ , 直接上 ST 表 , 线段树也是可以的 , 但 ST 表还是香的 . [前置知识在这](https://www.inzamz.top/2020/SparseTable/) . 

### 代码

```cpp
void getst(int n)
{
    bin[0] = 1;
    lg[0] = -1;
    for (int i = 1; i <= 18; i++)
        bin[i] = 2 * bin[i - 1];
    for (int i = 1; i <= 1e5 + 10; i++)
        lg[i] = lg[i / 2] + 1;
    for (int j = 0; j <= 18; j++)
        for (int i = 0; i + bin[j] - 1 <= n; i++) {
            if (j == 0)
                st[i][j] = a[i];
            else {
                st[i][j] = max(st[i][j - 1], st[i + bin[j - 1]][j - 1]);
            }
        }
}

int stsearch(int l, int r)
{
    if (l == r)
        return a[l];
    int t = lg[r - l + 1];
    return max(st[l][t], st[r - bin[t] + 1][t]);
}
```

## Y - 孩子与玩具

### 解题思路

放出 tag 后 , 发现是并查集 ? 我是直接贪心写的 ...  其实本质跟并查集就是一样的 . 

我们要让孩子开心的尽可能多 , 就是尽量让孩子尽可能只拿到一个玩具 , 当然第一个小朋友是不可避免要拿两个的 , 那就让出现次数最多的玩具先拿掉 . 于是我们不断把还没拿的玩具中出现最多的放进队列 , 然后把想要这个玩具的孩子枚举一遍 , 选给他们另一个想要的玩具 .

### 关键代码

```cpp
q.push(imax);
while (!q.empty())
{
    int cur = q.front();
    q.pop();
    for (int i = 0; i < s[cur].size(); ++i) {
        if (!flag[s[cur][i].val] && !child[s[cur][i].ids]) {
            --ans;
            flag[s[cur][i].val] = child[s[cur][i].ids] = 1;
            q.push(s[cur][i].val);
        }
    }
}
cout << ans << endl;
```



To Be Continued.

<!-- Q.E.D. -->