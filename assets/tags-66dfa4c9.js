import{g as x,o as s,j as C,b as i,t as _,aj as q,ak as F,u as N,a3 as A,m as E,h as I,B as z,ax as D,a0 as v,a8 as H,q as O,an as W,a2 as G,i as J,c as m,w as a,e as r,l as t,k as K,F as M,a as Q,ad as U,a6 as X}from"./app-4f30d306.js";import{_ as Z}from"./YunCard.vue_vue_type_script_setup_true_lang-517fa1c3.js";import{_ as tt}from"./YunPostCollapse.vue_vue_type_style_index_0_lang-17b12858.js";import{_ as et}from"./YunPageHeader.vue_vue_type_script_setup_true_lang-0705b34e.js";const st={"inline-flex":"",my:"2",p:"1",class:"post-tag cursor-pointer items-baseline leading-4"},nt={"inline-flex":""},ot={"inline-flex":"",text:"xs"},at=x({__name:"YunLayoutPostTag",props:{title:{},count:{}},setup(w){return(n,p)=>(s(),C("span",st,[i("span",nt,"#"+_(n.title),1),i("span",ot,"["+_(n.count)+"]",1)]))}}),rt={class:"yun-text-light",text:"center",p:"2"},it={class:"justify-center items-end",flex:"~ wrap",gap:"1"},pt=x({__name:"tags",setup(w){q([F({"@type":"CollectionPage"})]);const n=N(),p=A(),T=E(),{t:f}=I(),l=z(),{tags:g,getTagStyle:$}=D({primary:T.value.colors.primary}),o=v(()=>n.query.tag||""),k=H(),P=v(()=>k.postList.filter(e=>e.tags?typeof e.tags=="string"?e.tags===o.value:e.tags.includes(o.value):!1)),d=O(),{show:S}=W(d);function b(c){p.push({query:{tag:c}}),S()}const Y=G(l);return(c,e)=>{const y=et,B=at,L=J("RouterView"),V=tt,R=Z,j=U;return s(),m(j,null,{"main-header":a(()=>[r(y,{title:t(Y)||t(f)("menu.tags"),icon:t(l).icon||"i-ri-tag-line",color:t(l).color},null,8,["title","icon","color"])]),"main-content":a(()=>[i("div",rt,_(t(f)("counter.tags",Array.from(t(g)).length)),1),i("div",it,[(s(!0),C(M,null,K(Array.from(t(g)).sort(),([u,h])=>(s(),m(B,{key:u,title:u,count:h.count,style:X(t($)(h.count)),onClick:lt=>b(u.toString())},null,8,["title","count","style","onClick"]))),128))]),r(L)]),"main-nav-before":a(()=>[o.value?(s(),m(R,{key:0,ref_key:"collapse",ref:d,m:"t-4",w:"full"},{default:a(()=>[r(y,{title:o.value,icon:"i-ri-hashtag"},null,8,["title"]),r(V,{w:"full",m:"b-4",p:"x-20 lt-sm:x-5",posts:P.value},null,8,["posts"])]),_:1},512)):Q("v-if",!0)]),_:1})}}});export{pt as default};