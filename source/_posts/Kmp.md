---
title: KMP Algorithm
date: 2020-11-26 7:35:26
categories:
	- ICPC 字符串
tags:
	- KMP
	- BM
	- Sunday
---
第一次使用英文写，语病估计一堆，随便看看吧。
<!-- more -->
# Matching Principle

​		To solve the string matching problem , you can use it.It's principle is for the matched parts of the string ,you don't need to match it again.

​		The core of KMP is the array named 'next'.It's tell when the string do not match ,which character the string should match rather than match from the beginning. 

- If string is not matched at s2[k] currently and j≠-1 ,let the template string move (**matched characters** - **next[k]**) ( the same as j=next[k] ) , then continue matching .
- If j==-1 just let i++ . 
- Else i++ , j++ .

For example :

<center> string1: abaabab </center>
<center> string2: abab </center>
<center> next[]={-1,0,0,1} </center>



<center>i=0 , j=0 s1[i]=='a' , s2[j]=='a' <b>matched</b> i++ , j++ </center>
<center>i=1 , j=1 s1[i]=='b' , s2[j]=='b' <b>matched</b> i++ , j++ </center>
<center>i=2 , j=2 s1[i]=='a' , s2[j]=='a' <b>matched</b> i++ , j++ </center>
<center>i=3 , j=3 s1[i]=='a' , s2[j]=='b' <b>unmatched</b> j=next[j]=1 </center>
<center>i=3 , j=1 s1[i]=='a' , s2[j]=='b' <b>unmatched</b> j=next[j]=0 </center>
<center>i=3 , j=0 s1[i]=='a' , s2[j]=='a' <b>matched</b> i++ , j++ </center>
<center>i=4 , j=1 s1[i]=='b' , s2[j]=='b' <b>matched</b> i++ , j++ </center>
<center>i=5 , j=2 s1[i]=='a' , s2[j]=='a' <b>matched</b> i++ , j++ </center>
<center>i=6 , j=3 s1[i]=='b' , s2[j]=='b' <b>matched</b> i++ , j++ </center>

## Code

```cpp
void kmp()
{
	int len1=strlen(str1);
	int len2=strlen(str2);
	int i=0,j=0;
	getnextarr(str2);
	while (i<len1)
	{
		if (str1[i]==str2[j]){
		    if (j!=len2-1) i++,j++;
			else {
				ans[cnt++]=i-j+1;
				j=nexts[j];
			}
		}
		else if (nexts[j]==-1) i++;
		else j=nexts[j];
	}
    //print the answer
	for (int t=0;t<cnt;t++) printf("%d\n",ans[t]);
	for (int t=0;t<len2;t++) {
		 printf("%d ",nexts[t+1]);
	}
	return ;
}
```



# Get Next Array

## Principle

​		Consider if next[k] is known , how to get next[k+1] .It is the same as let the s1==s2 , and use KMP Algorithm.

​		Because next[k] means which characters should match if s1[k] isn't matched . 

- If s2[next[k]]==s2[k] , you will find **s2[next[k]-k] ~ s2[next[k]]** and **s2[0] ~ s2[k]** is the same strings .So when s2[k+1] isn't matched , just match s2[next[k]+1] .
- If s2[next[k]] != s2[k] , we should find a shorter next[k] , just like s2[next[k]] isn't matched , you should match s2[ next[ next[ k ] ] ] till matched successfully or '-1' appears . 

## Code

```cpp
void getnextarr(char* str)
{
	/*An example help code and understande
		a  b  b  a  a  b  a  b
       -1  0  0  0  1  1  2  1
	*/
	int len=strlen(str);
	nexts[0]=-1,nexts[1]=0;
	for (int i=2;i<=len;i++)
	{
		int k=i-1;
		while (1){
			if (nexts[k]==-1 || str[i-1]==str[nexts[k]]) 
			{
				nexts[i]=nexts[k]+1;
				break;
			}
			else k=nexts[k];
		}
	}
	return ;
}
```

# More Efficient Algorithm

## BM (Boyer-Moore) Algorithm

### Principle

​		At most *O( N )* .It has two laws . It matches from the back .

- Bad character

    We called the unmatched character *Bad character* . When the string is unmatched , the template string should move x position 
    $$
    x1=pos_{badchar}-lastpos_{badchar}
    $$
    If badchar doesn't appear before , lastpos=-1 .  

- Good suffix

    We called the matching suffix *Good suffix* (e.g. *MPLE* matched , "*MPLE , PLE , LE , E*" is *Good suffix* ) . When the string is unmatched , the template string should move x position 
    $$
    x2=pos_{goodsuf}-lastpos_{goodsuf}
    $$
     Choose x=max(x1,x2)  between he above laws . 

    ### Example

    ![](https://p.130014.xyz/2020/11/27/BM001.png)
    $$
    x=max(6-0,0)=6
    $$
    ![](https://p.130014.xyz/2020/11/27/BM002.png)

$$
x=max(6-4,0)=2
$$

![](https://p.130014.xyz/2020/11/27/BM003.png)

Above all , x2 is always 0 . 

![](https://p.130014.xyz/2020/11/27/BM004.png)

![](https://p.130014.xyz/2020/11/27/BM005.png)
$$
x=max(2-(-1),6-0)=6
$$
![](https://p.130014.xyz/2020/11/27/BM007.png)
$$
x=max(6-4,0)=2
$$
![](https://p.130014.xyz/2020/11/27/BM008.png)
Matching !

## Sunday Algorithm.

<!-- Q.E.D. -->