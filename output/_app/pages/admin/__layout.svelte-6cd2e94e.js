import{S as t,i as e,s as n,j as s,k as r,m as a,n as o,o as f,f as i,x as c,u as l,v as m,d as $,H as p,l as u,r as h,w as g,a3 as d,L as x,N as v,O as w,P as y}from"../../chunks/vendor-710b89fd.js";import{a as k,N as j}from"../../chunks/NavLink-60bffa06.js";import{P as T}from"../../chunks/firebaseInit-e8501708.js";import{T as b}from"../../chunks/TransitionWrapper-f2992250.js";import"../../chunks/store-9ec055ab.js";import"../../chunks/functions-be98bf29.js";function S(t,e,n){const s=t.slice();return s[6]=e[n],s[8]=n,s}function N(t){let e,n;return e=new j({props:{index:t[8],pageOption:t[6],fullyRounded:!0}}),{c(){s(e.$$.fragment)},l(t){a(e.$$.fragment,t)},m(t,s){f(e,t,s),n=!0},p:p,i(t){n||(c(e.$$.fragment,t),n=!0)},o(t){l(e.$$.fragment,t),n=!1},d(t){m(e,t)}}}function I(t){let e,n,s=t[1],r=[];for(let o=0;o<s.length;o+=1)r[o]=N(S(t,s,o));const a=t=>l(r[t],1,1,(()=>{r[t]=null}));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=u()},l(t){for(let e=0;e<r.length;e+=1)r[e].l(t);e=u()},m(t,s){for(let e=0;e<r.length;e+=1)r[e].m(t,s);i(t,e,s),n=!0},p(t,n){if(2&n){let o;for(s=t[1],o=0;o<s.length;o+=1){const a=S(t,s,o);r[o]?(r[o].p(a,n),c(r[o],1)):(r[o]=N(a),r[o].c(),c(r[o],1),r[o].m(e.parentNode,e))}for(h(),o=s.length;o<r.length;o+=1)a(o);g()}},i(t){if(!n){for(let t=0;t<s.length;t+=1)c(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let e=0;e<r.length;e+=1)l(r[e]);n=!1},d(t){d(r,t),t&&$(e)}}}function P(t){let e;const n=t[3].default,s=x(n,t,t[4],null);return{c(){s&&s.c()},l(t){s&&s.l(t)},m(t,n){s&&s.m(t,n),e=!0},p(t,r){s&&s.p&&(!e||16&r)&&v(s,n,t,t[4],e?y(n,t[4],r,null):w(t[4]),null)},i(t){e||(c(s,t),e=!0)},o(t){l(s,t),e=!1},d(t){s&&s.d(t)}}}function z(t){let e,n,p,u;return e=new k({props:{minItemSize:t[2]+"ch",maxItemSize:"max-content",customStyles:"top:3.5em;",$$slots:{default:[I]},$$scope:{ctx:t}}}),p=new b({props:{refresh:t[0],customStyles:"display:grid;",$$slots:{default:[P]},$$scope:{ctx:t}}}),{c(){s(e.$$.fragment),n=r(),s(p.$$.fragment)},l(t){a(e.$$.fragment,t),n=o(t),a(p.$$.fragment,t)},m(t,s){f(e,t,s),i(t,n,s),f(p,t,s),u=!0},p(t,[n]){const s={};16&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s);const r={};1&n&&(r.refresh=t[0]),16&n&&(r.$$scope={dirty:n,ctx:t}),p.$set(r)},i(t){u||(c(e.$$.fragment,t),c(p.$$.fragment,t),u=!0)},o(t){l(e.$$.fragment,t),l(p.$$.fragment,t),u=!1},d(t){m(e,t),t&&$(n),m(p,t)}}}var H=function(t,e,n,s){return new(n||(n=Promise))((function(r,a){function o(t){try{i(s.next(t))}catch(e){a(e)}}function f(t){try{i(s.throw(t))}catch(e){a(e)}}function i(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,f)}i((s=s.apply(t,e||[])).next())}))};const L=({page:t})=>H(void 0,void 0,void 0,(function*(){return{props:{refresh:t.path.split("/")[2]}}}));function M(t,e,n){let{$$slots:s={},$$scope:r}=e,{refresh:a}=e;const o=[new T({navigationText:"Admin Home",path:"/admin"}),new T({navigationText:"Manage Teams",path:"/admin/manageTeams"})],f=o.map((t=>t.navigationText.length)),i=Math.max(...f);return t.$$set=t=>{"refresh"in t&&n(0,a=t.refresh),"$$scope"in t&&n(4,r=t.$$scope)},[a,o,i,s,r]}export default class extends t{constructor(t){super(),e(this,t,M,z,n,{refresh:0})}}export{L as load};
