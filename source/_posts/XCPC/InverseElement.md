---
title: 费马小定理与逆元
date: 2020-12-19 23:33:25
updated: 2021-01-29 21:59:52
tags:
	- 逆元
categories:
	- ICPC 数学与计算几何
---
数论大数据经常会出现取模运算 , 但是除法很难没法同余 , 所以这里要使用费马小定理 . 
<!-- more -->

## 逆元

就是如果$(a*x) \equiv 1 \pmod{p}$，则称$x$为 a 的逆元。 

## 费马小定理

证明先挖坑 , 以后证 . 之前费马提出时要求 a 是质数 , 其实不需要 .
$$
a^p \equiv a\pmod{p} \\
a^{p-1} \equiv 1 \pmod{p}\\
$$
两种形式 , 下面是要求 a 不是 p 的倍数 . 

## 求逆元

所以可以使用费马小定理求逆元 . 
$$
a^{p-2}*a \equiv 1 \pmod{p}
$$
所以$a^{p-2}$是逆元 . 这样可以试试对组合数取余了 . 
$$
(a \div b) \% p \equiv (a*inv(b)) \% p \equiv (a\%p*inv(b)\%p)\%p
$$


## CF1462E2 Close Tuples

其实就是一个组合数问题 , 问题是如何使用组合数 . 

### 组合数模板 & 题解

```cpp
#include <cstdio>
#include <algorithm>
#include <cstring>
using namespace std;

typedef long long ll;
const ll mod=1e9+7;
const int maxn=200010;
ll t,m,n,k,fac[maxn],inv[maxn],cnt[maxn],num[maxn];
ll qpow(ll x,ll y)
{
    ll res=1;
    while (y)
    {
        if (y & 1ll) res=res*x%mod;
        y>>=1;
        x=x*x%mod;
    }
    return res;
}

ll C(ll m,ll n)
{
    if ( n>m || n<0) return 0;
    return (fac[m]*inv[n]%mod)*inv[m-n]%mod;
}

int main()
{
    fac[0]=inv[0]=1;
    for (ll i=1;i<maxn;i++) fac[i]=fac[i-1]*i%mod;
    for (ll i=1;i<maxn;i++) inv[i]=qpow(fac[i],mod-2);
    scanf("%lld",&t);
    while (t--)
    {
        scanf("%lld%lld%lld",&n,&m,&k);
        memset(cnt,0,sizeof(ll)*(n+1));
        for(int i=1;i<=n;i++) {
            scanf("%lld",&num[i]);
            cnt[num[i]]++;
        }
        sort(num+1,num+1+n);
        for(int i=1;i<=n;i++) cnt[i]+=cnt[i-1];
        ll ans=0;
        for (int i=n;i>0;i--)
        {
            if (num[i]>k) ans+=C(i-cnt[num[i]-k-1]-1,m-1),ans%=mod;
            else ans+=C(i-1,m-1),ans%=mod;
        }
        printf("%lld\n",ans);
    }
    return 0;
}
```



---

To Be Continued.

<!-- Q.E.D. -->