import{S as e,i as t,s as n,j as s,k as a,m as r,n as o,o as i,f as c,x as l,u as f,v as p,d as m,_ as u,H as $,l as g,r as h,w as d,a3 as x,L as k,N as w,O as v,P as y}from"../../chunks/vendor-710b89fd.js";import{a as j,N as P}from"../../chunks/NavLink-60bffa06.js";import{P as T}from"../../chunks/firebaseInit-e8501708.js";import{T as b}from"../../chunks/TransitionWrapper-f2992250.js";import{n as S}from"../../chunks/store-9ec055ab.js";import"../../chunks/functions-be98bf29.js";function N(e,t,n){const s=e.slice();return s[7]=t[n],s[9]=n,s}function I(e){let t,n;return t=new P({props:{index:e[9],pageOption:e[7],fullyRounded:!0}}),{c(){s(t.$$.fragment)},l(e){r(t.$$.fragment,e)},m(e,s){i(t,e,s),n=!0},p:$,i(e){n||(l(t.$$.fragment,e),n=!0)},o(e){f(t.$$.fragment,e),n=!1},d(e){p(t,e)}}}function L(e){let t,n,s=e[2],a=[];for(let o=0;o<s.length;o+=1)a[o]=I(N(e,s,o));const r=e=>f(a[e],1,1,(()=>{a[e]=null}));return{c(){for(let e=0;e<a.length;e+=1)a[e].c();t=g()},l(e){for(let t=0;t<a.length;t+=1)a[t].l(e);t=g()},m(e,s){for(let t=0;t<a.length;t+=1)a[t].m(e,s);c(e,t,s),n=!0},p(e,n){if(4&n){let o;for(s=e[2],o=0;o<s.length;o+=1){const r=N(e,s,o);a[o]?(a[o].p(r,n),l(a[o],1)):(a[o]=I(r),a[o].c(),l(a[o],1),a[o].m(t.parentNode,t))}for(h(),o=s.length;o<a.length;o+=1)r(o);d()}},i(e){if(!n){for(let e=0;e<s.length;e+=1)l(a[e]);n=!0}},o(e){a=a.filter(Boolean);for(let t=0;t<a.length;t+=1)f(a[t]);n=!1},d(e){x(a,e),e&&m(t)}}}function z(e){let t;const n=e[4].default,s=k(n,e,e[5],null);return{c(){s&&s.c()},l(e){s&&s.l(e)},m(e,n){s&&s.m(e,n),t=!0},p(e,a){s&&s.p&&(!t||32&a)&&w(s,n,e,e[5],t?y(n,e[5],a,null):v(e[5]),null)},i(e){t||(l(s,e),t=!0)},o(e){f(s,e),t=!1},d(e){s&&s.d(e)}}}function M(e){let t,n,u,$;return t=new j({props:{minItemSize:e[3]+"ch",maxItemSize:"max-content",$$slots:{default:[L]},$$scope:{ctx:e}}}),u=new b({props:{refresh:e[0],customStyles:e[1]?"margin-top: 0.6rem;":"margin-top: 0;",$$slots:{default:[z]},$$scope:{ctx:e}}}),{c(){s(t.$$.fragment),n=a(),s(u.$$.fragment)},l(e){r(t.$$.fragment,e),n=o(e),r(u.$$.fragment,e)},m(e,s){i(t,e,s),c(e,n,s),i(u,e,s),$=!0},p(e,[n]){const s={};32&n&&(s.$$scope={dirty:n,ctx:e}),t.$set(s);const a={};1&n&&(a.refresh=e[0]),2&n&&(a.customStyles=e[1]?"margin-top: 0.6rem;":"margin-top: 0;"),32&n&&(a.$$scope={dirty:n,ctx:e}),u.$set(a)},i(e){$||(l(t.$$.fragment,e),l(u.$$.fragment,e),$=!0)},o(e){f(t.$$.fragment,e),f(u.$$.fragment,e),$=!1},d(e){p(t,e),e&&m(n),p(u,e)}}}var O=function(e,t,n,s){return new(n||(n=Promise))((function(a,r){function o(e){try{c(s.next(e))}catch(t){r(t)}}function i(e){try{c(s.throw(e))}catch(t){r(t)}}function c(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,i)}c((s=s.apply(e,t||[])).next())}))};const R=({page:e})=>O(void 0,void 0,void 0,(function*(){return{props:{refresh:e.path.split("/")[2]}}}));function B(e,t,n){let s;u(e,S,(e=>n(1,s=e)));let{$$slots:a={},$$scope:r}=t,{refresh:o}=t;const i=[new T({navigationText:"Make Picks",path:"/weekly/makePicks"}),new T({navigationText:"View League Picks",path:"/weekly/viewPicks"}),new T({navigationText:"Standings",path:"/weekly/standings"}),new T({navigationText:"Rules",path:"/weekly/rules"})],c=i.map((e=>e.navigationText.length)),l=Math.max(...c);return e.$$set=e=>{"refresh"in e&&n(0,o=e.refresh),"$$scope"in e&&n(5,r=e.$$scope)},[o,s,i,l,a,r]}export default class extends e{constructor(e){super(),t(this,e,B,M,n,{refresh:0})}}export{R as load};
