function t(){}const e=t=>t;function n(t,e){for(const n in e)t[n]=e[n];return t}function r(t){return t()}function i(){return Object.create(null)}function s(t){t.forEach(r)}function o(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let c;function u(t,e){return c||(c=document.createElement("a")),c.href=e,t===c.href}function h(e,...n){if(null==e)return t;const r=e.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}function l(t){let e;return h(t,(t=>e=t))(),e}function d(t,e,n){t.$$.on_destroy.push(h(e,n))}function f(t,e,n,r){if(t){const i=p(t,e,n,r);return t[0](i)}}function p(t,e,r,i){return t[1]&&i?n(r.ctx.slice(),t[1](i(e))):r.ctx}function g(t,e,n,r){if(t[2]&&r){const i=t[2](r(n));if(void 0===e.dirty)return i;if("object"==typeof i){const t=[],n=Math.max(e.dirty.length,i.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|i[r];return t}return e.dirty|i}return e.dirty}function m(t,e,n,r,i,s){if(i){const o=p(e,n,r,s);t.p(o,i)}}function y(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}function v(t,e,n){return t.set(n),e}const w="undefined"!=typeof window;let b=w?()=>window.performance.now():()=>Date.now(),I=w?t=>requestAnimationFrame(t):t;const _=new Set;function T(t){_.forEach((e=>{e.c(t)||(_.delete(e),e.f())})),0!==_.size&&I(T)}function E(t){let e;return 0===_.size&&I(T),{promise:new Promise((n=>{_.add(e={c:t,f:n})})),abort(){_.delete(e)}}}let S=!1;function k(t,e,n,r){for(;t<e;){const i=t+(e-t>>1);n(i)<=r?t=i+1:e=i}return t}function C(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e.host?e:document}function A(t){const e=O("style");return function(t,e){!function(t,e){t.appendChild(e)}(t.head||t,e)}(C(t),e),e}function R(t,e){if(S){for(!function(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if("HEAD"===t.nodeName){const t=[];for(let n=0;n<e.length;n++){const r=e[n];void 0!==r.claim_order&&t.push(r)}e=t}const n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let i=0;for(let c=0;c<e.length;c++){const t=e[c].claim_order,s=(i>0&&e[n[i]].claim_order<=t?i+1:k(1,i,(t=>e[n[t]].claim_order),t))-1;r[c]=n[s]+1;const o=s+1;n[o]=c,i=Math.max(o,i)}const s=[],o=[];let a=e.length-1;for(let c=n[i]+1;0!=c;c=r[c-1]){for(s.push(e[c-1]);a>=c;a--)o.push(e[a]);a--}for(;a>=0;a--)o.push(e[a]);s.reverse(),o.sort(((t,e)=>t.claim_order-e.claim_order));for(let c=0,u=0;c<o.length;c++){for(;u<s.length&&o[c].claim_order>=s[u].claim_order;)u++;const e=u<s.length?s[u]:null;t.insertBefore(o[c],e)}}(t),(void 0===t.actual_end_child||null!==t.actual_end_child&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);null!==t.actual_end_child&&void 0===t.actual_end_child.claim_order;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?void 0===e.claim_order&&e.parentNode===t||t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else e.parentNode!==t&&t.appendChild(e)}function N(t,e,n){S&&!n?R(t,e):e.parentNode===t&&e.nextSibling==n||t.insertBefore(e,n||null)}function D(t){t.parentNode.removeChild(t)}function x(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function O(t){return document.createElement(t)}function L(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function P(t){return document.createTextNode(t)}function M(){return P(" ")}function U(){return P("")}function F(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function V(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function j(t){return function(e){e.target===this&&t.call(this,e)}}function q(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function B(t){return""===t?null:+t}function $(t){return Array.from(t.childNodes)}function z(t,e,n,r,i=!1){!function(t){void 0===t.claim_info&&(t.claim_info={last_index:0,total_claimed:0})}(t);const s=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const s=t[r];if(e(s)){const e=n(s);return void 0===e?t.splice(r,1):t[r]=e,i||(t.claim_info.last_index=r),s}}for(let r=t.claim_info.last_index-1;r>=0;r--){const s=t[r];if(e(s)){const e=n(s);return void 0===e?t.splice(r,1):t[r]=e,i?void 0===e&&t.claim_info.last_index--:t.claim_info.last_index=r,s}}return r()})();return s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,s}function K(t,e,n,r){return z(t,(t=>t.nodeName===e),(t=>{const e=[];for(let r=0;r<t.attributes.length;r++){const i=t.attributes[r];n[i.name]||e.push(i.name)}e.forEach((e=>t.removeAttribute(e)))}),(()=>r?L(e):O(e)))}function H(t,e){return z(t,(t=>3===t.nodeType),(t=>{const n=""+e;if(t.data.startsWith(n)){if(t.data.length!==n.length)return t.splitText(n.length)}else t.data=n}),(()=>P(e)),!0)}function G(t){return H(t," ")}function W(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Q(t,e){t.value=null==e?"":e}function X(t,e,n,r){t.style.setProperty(e,n,r?"important":"")}function Y(t,e){for(let n=0;n<t.options.length;n+=1){const r=t.options[n];if(r.__value===e)return void(r.selected=!0)}}function J(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}function Z(t,e,n){t.classList[n?"add":"remove"](e)}function tt(t,e,n=!1){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,!1,e),r}function et(t,e=document.body){return Array.from(e.querySelectorAll(t))}const nt=new Set;let rt,it=0;function st(t,e,n,r,i,s,o,a=0){const c=16.666/r;let u="{\n";for(let m=0;m<=1;m+=c){const t=e+(n-e)*s(m);u+=100*m+`%{${o(t,1-t)}}\n`}const h=u+`100% {${o(n,1-n)}}\n}`,l=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(h)}_${a}`,d=C(t);nt.add(d);const f=d.__svelte_stylesheet||(d.__svelte_stylesheet=A(t).sheet),p=d.__svelte_rules||(d.__svelte_rules={});p[l]||(p[l]=!0,f.insertRule(`@keyframes ${l} ${h}`,f.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${l} ${r}ms linear ${i}ms 1 both`,it+=1,l}function ot(t,e){const n=(t.style.animation||"").split(", "),r=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),i=n.length-r.length;i&&(t.style.animation=r.join(", "),it-=i,it||I((()=>{it||(nt.forEach((t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}})),nt.clear())})))}function at(t){rt=t}function ct(){if(!rt)throw new Error("Function called outside component initialization");return rt}function ut(t){ct().$$.on_mount.push(t)}function ht(t){ct().$$.after_update.push(t)}function lt(){const t=ct();return(e,n)=>{const r=t.$$.callbacks[e];if(r){const i=tt(e,n);r.slice().forEach((e=>{e.call(t,i)}))}}}function dt(t,e){ct().$$.context.set(t,e)}function ft(t){return ct().$$.context.get(t)}const pt=[],gt=[],mt=[],yt=[],vt=Promise.resolve();let wt=!1;function bt(t){mt.push(t)}function It(t){yt.push(t)}let _t=!1;const Tt=new Set;function Et(){if(!_t){_t=!0;do{for(let t=0;t<pt.length;t+=1){const e=pt[t];at(e),St(e.$$)}for(at(null),pt.length=0;gt.length;)gt.pop()();for(let t=0;t<mt.length;t+=1){const e=mt[t];Tt.has(e)||(Tt.add(e),e())}mt.length=0}while(pt.length);for(;yt.length;)yt.pop()();wt=!1,_t=!1,Tt.clear()}}function St(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(bt)}}let kt;function Ct(){return kt||(kt=Promise.resolve(),kt.then((()=>{kt=null}))),kt}function At(t,e,n){t.dispatchEvent(tt(`${e?"intro":"outro"}${n}`))}const Rt=new Set;let Nt;function Dt(){Nt={r:0,c:[],p:Nt}}function xt(){Nt.r||s(Nt.c),Nt=Nt.p}function Ot(t,e){t&&t.i&&(Rt.delete(t),t.i(e))}function Lt(t,e,n,r){if(t&&t.o){if(Rt.has(t))return;Rt.add(t),Nt.c.push((()=>{Rt.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}const Pt={duration:0};function Mt(n,r,i){let s,a,c=r(n,i),u=!1,h=0;function l(){s&&ot(n,s)}function d(){const{delay:r=0,duration:i=300,easing:o=e,tick:d=t,css:f}=c||Pt;f&&(s=st(n,0,1,i,r,o,f,h++)),d(0,1);const p=b()+r,g=p+i;a&&a.abort(),u=!0,bt((()=>At(n,!0,"start"))),a=E((t=>{if(u){if(t>=g)return d(1,0),At(n,!0,"end"),l(),u=!1;if(t>=p){const e=o((t-p)/i);d(e,1-e)}}return u}))}let f=!1;return{start(){f||(f=!0,ot(n),o(c)?(c=c(),Ct().then(d)):d())},invalidate(){f=!1},end(){u&&(l(),u=!1)}}}function Ut(n,r,i){let a,c=r(n,i),u=!0;const h=Nt;function l(){const{delay:r=0,duration:i=300,easing:o=e,tick:l=t,css:d}=c||Pt;d&&(a=st(n,1,0,i,r,o,d));const f=b()+r,p=f+i;bt((()=>At(n,!1,"start"))),E((t=>{if(u){if(t>=p)return l(0,1),At(n,!1,"end"),--h.r||s(h.c),!1;if(t>=f){const e=o((t-f)/i);l(1-e,e)}}return u}))}return h.r+=1,o(c)?Ct().then((()=>{c=c(),l()})):l(),{end(t){t&&c.tick&&c.tick(1,0),u&&(a&&ot(n,a),u=!1)}}}function Ft(n,r,i,a){let c=r(n,i),u=a?0:1,h=null,l=null,d=null;function f(){d&&ot(n,d)}function p(t,e){const n=t.b-u;return e*=Math.abs(n),{a:u,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function g(r){const{delay:i=0,duration:o=300,easing:a=e,tick:g=t,css:m}=c||Pt,y={start:b()+i,b:r};r||(y.group=Nt,Nt.r+=1),h||l?l=y:(m&&(f(),d=st(n,u,r,o,i,a,m)),r&&g(0,1),h=p(y,o),bt((()=>At(n,r,"start"))),E((t=>{if(l&&t>l.start&&(h=p(l,o),l=null,At(n,h.b,"start"),m&&(f(),d=st(n,u,h.b,h.duration,0,a,c.css))),h)if(t>=h.end)g(u=h.b,1-u),At(n,h.b,"end"),l||(h.b?f():--h.group.r||s(h.group.c)),h=null;else if(t>=h.start){const e=t-h.start;u=h.a+h.d*a(e/h.duration),g(u,1-u)}return!(!h&&!l)})))}return{run(t){o(c)?Ct().then((()=>{c=c(),g(t)})):g(t)},end(){f(),h=l=null}}}const Vt="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function jt(t,e){t.d(1),e.delete(t.key)}function qt(t,e,n,r,i,s,o,a,c,u,h,l){let d=t.length,f=s.length,p=d;const g={};for(;p--;)g[t[p].key]=p;const m=[],y=new Map,v=new Map;for(p=f;p--;){const t=l(i,s,p),a=n(t);let c=o.get(a);c?r&&c.p(t,e):(c=u(a,t),c.c()),y.set(a,m[p]=c),a in g&&v.set(a,Math.abs(p-g[a]))}const w=new Set,b=new Set;function I(t){Ot(t,1),t.m(a,h),o.set(t.key,t),h=t.first,f--}for(;d&&f;){const e=m[f-1],n=t[d-1],r=e.key,i=n.key;e===n?(h=e.first,d--,f--):y.has(i)?!o.has(r)||w.has(r)?I(e):b.has(i)?d--:v.get(r)>v.get(i)?(b.add(r),I(e)):(w.add(i),d--):(c(n,o),d--)}for(;d--;){const e=t[d];y.has(e.key)||c(e,o)}for(;f;)I(m[f-1]);return m}function Bt(t,e){const n={},r={},i={$$scope:1};let s=t.length;for(;s--;){const o=t[s],a=e[s];if(a){for(const t in o)t in a||(r[t]=1);for(const t in a)i[t]||(n[t]=a[t],i[t]=1);t[s]=a}else for(const t in o)i[t]=1}for(const o in r)o in n||(n[o]=void 0);return n}function $t(t){return"object"==typeof t&&null!==t?t:{}}function zt(t,e,n){const r=t.$$.props[e];void 0!==r&&(t.$$.bound[r]=n,n(t.$$.ctx[r]))}function Kt(t){t&&t.c()}function Ht(t,e){t&&t.l(e)}function Gt(t,e,n,i){const{fragment:a,on_mount:c,on_destroy:u,after_update:h}=t.$$;a&&a.m(e,n),i||bt((()=>{const e=c.map(r).filter(o);u?u.push(...e):s(e),t.$$.on_mount=[]})),h.forEach(bt)}function Wt(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Qt(t,e){-1===t.$$.dirty[0]&&(pt.push(t),wt||(wt=!0,vt.then(Et)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Xt(e,n,r,o,a,c,u,h=[-1]){const l=rt;at(e);const d=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:a,bound:i(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(l?l.$$.context:n.context||[]),callbacks:i(),dirty:h,skip_bound:!1,root:n.target||l.$$.root};u&&u(d.root);let f=!1;if(d.ctx=r?r(e,n.props||{},((t,n,...r)=>{const i=r.length?r[0]:n;return d.ctx&&a(d.ctx[t],d.ctx[t]=i)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](i),f&&Qt(e,t)),n})):[],d.update(),f=!0,s(d.before_update),d.fragment=!!o&&o(d.ctx),n.target){if(n.hydrate){S=!0;const t=$(n.target);d.fragment&&d.fragment.l(t),t.forEach(D)}else d.fragment&&d.fragment.c();n.intro&&Ot(e.$$.fragment),Gt(e,n.target,n.anchor,n.customElement),S=!1,Et()}at(l)}class Yt{$destroy(){Wt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Jt=[];function Zt(e,n=t){let r;const i=new Set;function s(t){if(a(e,t)&&(e=t,r)){const t=!Jt.length;for(const n of i)n[1](),Jt.push(n,e);if(t){for(let t=0;t<Jt.length;t+=2)Jt[t][0](Jt[t+1]);Jt.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(o,a=t){const c=[o,a];return i.add(c),1===i.size&&(r=n(s)||t),o(e),()=>{i.delete(c),0===i.size&&(r(),r=null)}}}}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var te=function(t,e){return(te=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};function ee(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]])}return n}function ne(t,e,n,r){return new(n||(n=Promise))((function(i,s){function o(t){try{c(r.next(t))}catch(e){s(e)}}function a(t){try{c(r.throw(t))}catch(e){s(e)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,a)}c((r=r.apply(t,e||[])).next())}))}function re(t,e){var n,r,i,s,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(i=2&s[0]?r.return:s[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,s[1])).done)return i;switch(r=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return o.label++,{value:s[1],done:!1};case 5:o.label++,r=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!(i=o.trys,(i=i.length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){o=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){o.label=s[1];break}if(6===s[0]&&o.label<i[1]){o.label=i[1],i=s;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(s);break}i[2]&&o.ops.pop(),o.trys.pop();continue}s=e.call(t,o)}catch(a){s=[6,a],r=0}finally{n=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}}function ie(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function se(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,i,s=n.call(t),o=[];try{for(;(void 0===e||e-- >0)&&!(r=s.next()).done;)o.push(r.value)}catch(a){i={error:a}}finally{try{r&&!r.done&&(n=s.return)&&n.call(s)}finally{if(i)throw i.error}}return o}function oe(t,e,n){if(n||2===arguments.length)for(var r,i=0,s=e.length;i<s;i++)!r&&i in e||(r||(r=Array.prototype.slice.call(e,0,i)),r[i]=e[i]);return t.concat(r||e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ae={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray:function(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();for(var n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[],i=0;i<t.length;i+=3){var s=t[i],o=i+1<t.length,a=o?t[i+1]:0,c=i+2<t.length,u=c?t[i+2]:0,h=s>>2,l=(3&s)<<4|a>>4,d=(15&a)<<2|u>>6,f=63&u;c||(f=64,o||(d=64)),r.push(n[h],n[l],n[d],n[f])}return r.join("")},encodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(function(t){for(var e=[],n=0,r=0;r<t.length;r++){var i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=63&i|128):55296==(64512&i)&&r+1<t.length&&56320==(64512&t.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&t.charCodeAt(++r)),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=63&i|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=63&i|128)}return e}(t),e)},decodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):function(t){for(var e=[],n=0,r=0;n<t.length;){var i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){var s=t[n++];e[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){var o=((7&i)<<18|(63&(s=t[n++]))<<12|(63&(a=t[n++]))<<6|63&t[n++])-65536;e[r++]=String.fromCharCode(55296+(o>>10)),e[r++]=String.fromCharCode(56320+(1023&o))}else{s=t[n++];var a=t[n++];e[r++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&a)}}return e.join("")}(this.decodeStringToByteArray(t,e))},decodeStringToByteArray:function(t,e){this.init_();for(var n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[],i=0;i<t.length;){var s=n[t.charAt(i++)],o=i<t.length?n[t.charAt(i)]:0,a=++i<t.length?n[t.charAt(i)]:64,c=++i<t.length?n[t.charAt(i)]:64;if(++i,null==s||null==o||null==a||null==c)throw Error();var u=s<<2|o>>4;if(r.push(u),64!==a){var h=o<<4&240|a>>2;if(r.push(h),64!==c){var l=a<<6&192|c;r.push(l)}}}return r},init_:function(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(var t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},ce=function(){function t(){var t=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise((function(e,n){t.resolve=e,t.reject=n}))}return t.prototype.wrapCallback=function(t){var e=this;return function(n,r){n?e.reject(n):e.resolve(r),"function"==typeof t&&(e.promise.catch((function(){})),1===t.length?t(n):t(n,r))}},t}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ue(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function he(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ue())}function le(){var t="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof t&&void 0!==t.id}function de(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function fe(){var t=ue();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function pe(){return!function(){try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(t){return!1}}()&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ge=function(t){function e(n,r,i){var s=t.call(this,r)||this;return s.code=n,s.customData=i,s.name="FirebaseError",Object.setPrototypeOf(s,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(s,me.prototype.create),s}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}te(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e}(Error),me=function(){function t(t,e,n){this.service=t,this.serviceName=e,this.errors=n}return t.prototype.create=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=e[0]||{},i=this.service+"/"+t,s=this.errors[t],o=s?ye(s,r):"Error",a=this.serviceName+": "+o+" ("+i+").",c=new ge(i,a,r);return c},t}();function ye(t,e){return t.replace(ve,(function(t,n){var r=e[n];return null!=r?String(r):"<"+n+"?>"}))}var ve=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function we(t){for(var e=[],n=function(t,n){Array.isArray(n)?n.forEach((function(n){e.push(encodeURIComponent(t)+"="+encodeURIComponent(n))})):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n))},r=0,i=Object.entries(t);r<i.length;r++){var s=i[r];n(s[0],s[1])}return e.length?"&"+e.join("&"):""}var be=function(){function t(t,e){var n=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then((function(){t(n)})).catch((function(t){n.error(t)}))}return t.prototype.next=function(t){this.forEachObserver((function(e){e.next(t)}))},t.prototype.error=function(t){this.forEachObserver((function(e){e.error(t)})),this.close(t)},t.prototype.complete=function(){this.forEachObserver((function(t){t.complete()})),this.close()},t.prototype.subscribe=function(t,e,n){var r,i=this;if(void 0===t&&void 0===e&&void 0===n)throw new Error("Missing Observer.");void 0===(r=function(t,e){if("object"!=typeof t||null===t)return!1;for(var n=0,r=e;n<r.length;n++){var i=r[n];if(i in t&&"function"==typeof t[i])return!0}return!1}(t,["next","error","complete"])?t:{next:t,error:e,complete:n}).next&&(r.next=Ie),void 0===r.error&&(r.error=Ie),void 0===r.complete&&(r.complete=Ie);var s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((function(){try{i.finalError?r.error(i.finalError):r.complete()}catch(t){}})),this.observers.push(r),s},t.prototype.unsubscribeOne=function(t){void 0!==this.observers&&void 0!==this.observers[t]&&(delete this.observers[t],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},t.prototype.forEachObserver=function(t){if(!this.finalized)for(var e=0;e<this.observers.length;e++)this.sendOne(e,t)},t.prototype.sendOne=function(t,e){var n=this;this.task.then((function(){if(void 0!==n.observers&&void 0!==n.observers[t])try{e(n.observers[t])}catch(r){"undefined"!=typeof console&&console.error&&console.error(r)}}))},t.prototype.close=function(t){var e=this;this.finalized||(this.finalized=!0,void 0!==t&&(this.finalError=t),this.task.then((function(){e.observers=void 0,e.onNoObservers=void 0})))},t}();function Ie(){}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _e(t){return t&&t._delegate?t._delegate:t}var Te=function(){function t(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(t){return this.instantiationMode=t,this},t.prototype.setMultipleInstances=function(t){return this.multipleInstances=t,this},t.prototype.setServiceProps=function(t){return this.serviceProps=t,this},t.prototype.setInstanceCreatedCallback=function(t){return this.onInstanceCreated=t,this},t}(),Ee=function(){function t(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.onInitCallbacks=new Map}return t.prototype.get=function(t){var e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){var n=new ce;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{var r=this.getOrInitializeService({instanceIdentifier:e});r&&n.resolve(r)}catch(i){}}return this.instancesDeferred.get(e).promise},t.prototype.getImmediate=function(t){var e,n=this.normalizeInstanceIdentifier(null==t?void 0:t.identifier),r=null!==(e=null==t?void 0:t.optional)&&void 0!==e&&e;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error("Service "+this.name+" is not available")}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}},t.prototype.getComponent=function(){return this.component},t.prototype.setComponent=function(t){var e,n;if(t.name!==this.name)throw Error("Mismatching Component "+t.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if(this.component=t,this.shouldAutoInitialize()){if(function(t){return"EAGER"===t.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t))try{this.getOrInitializeService({instanceIdentifier:"[DEFAULT]"})}catch(h){}try{for(var r=ie(this.instancesDeferred.entries()),i=r.next();!i.done;i=r.next()){var s=se(i.value,2),o=s[0],a=s[1],c=this.normalizeInstanceIdentifier(o);try{var u=this.getOrInitializeService({instanceIdentifier:c});a.resolve(u)}catch(h){}}}catch(l){e={error:l}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(e)throw e.error}}}},t.prototype.clearInstance=function(t){void 0===t&&(t="[DEFAULT]"),this.instancesDeferred.delete(t),this.instances.delete(t)},t.prototype.delete=function(){return ne(this,void 0,void 0,(function(){var t;return re(this,(function(e){switch(e.label){case 0:return t=Array.from(this.instances.values()),[4,Promise.all(oe(oe([],se(t.filter((function(t){return"INTERNAL"in t})).map((function(t){return t.INTERNAL.delete()})))),se(t.filter((function(t){return"_delete"in t})).map((function(t){return t._delete()})))))];case 1:return e.sent(),[2]}}))}))},t.prototype.isComponentSet=function(){return null!=this.component},t.prototype.isInitialized=function(t){return void 0===t&&(t="[DEFAULT]"),this.instances.has(t)},t.prototype.initialize=function(t){var e,n;void 0===t&&(t={});var r=t.options,i=void 0===r?{}:r,s=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(s))throw Error(this.name+"("+s+") has already been initialized");if(!this.isComponentSet())throw Error("Component "+this.name+" has not been registered yet");var o=this.getOrInitializeService({instanceIdentifier:s,options:i});try{for(var a=ie(this.instancesDeferred.entries()),c=a.next();!c.done;c=a.next()){var u=se(c.value,2),h=u[0],l=u[1];s===this.normalizeInstanceIdentifier(h)&&l.resolve(o)}}catch(d){e={error:d}}finally{try{c&&!c.done&&(n=a.return)&&n.call(a)}finally{if(e)throw e.error}}return o},t.prototype.onInit=function(t,e){var n,r=this.normalizeInstanceIdentifier(e),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(t),this.onInitCallbacks.set(r,i);var s=this.instances.get(r);return s&&t(s,r),function(){i.delete(t)}},t.prototype.invokeOnInitCallbacks=function(t,e){var n,r,i=this.onInitCallbacks.get(e);if(i)try{for(var s=ie(i),o=s.next();!o.done;o=s.next()){var a=o.value;try{a(t,e)}catch(c){}}}catch(u){n={error:u}}finally{try{o&&!o.done&&(r=s.return)&&r.call(s)}finally{if(n)throw n.error}}},t.prototype.getOrInitializeService=function(t){var e,n=t.instanceIdentifier,r=t.options,i=void 0===r?{}:r,s=this.instances.get(n);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:(e=n,"[DEFAULT]"===e?void 0:e),options:i}),this.instances.set(n,s),this.invokeOnInitCallbacks(s,n),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,n,s)}catch(o){}return s||null},t.prototype.normalizeInstanceIdentifier=function(t){return void 0===t&&(t="[DEFAULT]"),this.component?this.component.multipleInstances?t:"[DEFAULT]":t},t.prototype.shouldAutoInitialize=function(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode},t}();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Se,ke,Ce,Ae=function(){function t(t){this.name=t,this.providers=new Map}return t.prototype.addComponent=function(t){var e=this.getProvider(t.name);if(e.isComponentSet())throw new Error("Component "+t.name+" has already been registered with "+this.name);e.setComponent(t)},t.prototype.addOrOverwriteComponent=function(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)},t.prototype.getProvider=function(t){if(this.providers.has(t))return this.providers.get(t);var e=new Ee(t,this);return this.providers.set(t,e),e},t.prototype.getProviders=function(){return Array.from(this.providers.values())},t}();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */function Re(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var r=Array(t),i=0;for(e=0;e<n;e++)for(var s=arguments[e],o=0,a=s.length;o<a;o++,i++)r[i]=s[o];return r}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(Ce=ke||(ke={}))[Ce.DEBUG=0]="DEBUG",Ce[Ce.VERBOSE=1]="VERBOSE",Ce[Ce.INFO=2]="INFO",Ce[Ce.WARN=3]="WARN",Ce[Ce.ERROR=4]="ERROR",Ce[Ce.SILENT=5]="SILENT";var Ne={debug:ke.DEBUG,verbose:ke.VERBOSE,info:ke.INFO,warn:ke.WARN,error:ke.ERROR,silent:ke.SILENT},De=ke.INFO,xe=((Se={})[ke.DEBUG]="log",Se[ke.VERBOSE]="log",Se[ke.INFO]="info",Se[ke.WARN]="warn",Se[ke.ERROR]="error",Se),Oe=function(t,e){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(e<t.logLevel)){var i=(new Date).toISOString(),s=xe[e];if(!s)throw new Error("Attempted to log a message with an invalid logType (value: "+e+")");console[s].apply(console,Re(["["+i+"]  "+t.name+":"],n))}},Le=function(){function t(t){this.name=t,this._logLevel=De,this._logHandler=Oe,this._userLogHandler=null}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(t){if(!(t in ke))throw new TypeError('Invalid value "'+t+'" assigned to `logLevel`');this._logLevel=t},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(t){this._logLevel="string"==typeof t?Ne[t]:t},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(t){this._userLogHandler=t},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,Re([this,ke.DEBUG],t)),this._logHandler.apply(this,Re([this,ke.DEBUG],t))},t.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,Re([this,ke.VERBOSE],t)),this._logHandler.apply(this,Re([this,ke.VERBOSE],t))},t.prototype.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,Re([this,ke.INFO],t)),this._logHandler.apply(this,Re([this,ke.INFO],t))},t.prototype.warn=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,Re([this,ke.WARN],t)),this._logHandler.apply(this,Re([this,ke.WARN],t))},t.prototype.error=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,Re([this,ke.ERROR],t)),this._logHandler.apply(this,Re([this,ke.ERROR],t))},t}();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pe{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map((t=>{if(function(t){const e=t.getComponent();return"VERSION"===(null==e?void 0:e.type)}(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}return null})).filter((t=>t)).join(" ")}}const Me=new Le("@firebase/app"),Ue={"@firebase/app-exp":"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics-exp":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check-exp":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth-exp":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions-exp":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations-exp":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging-exp":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance-exp":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config-exp":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js","firebase-exp":"fire-js-all"},Fe=new Map,Ve=new Map;function je(t,e){try{t.container.addComponent(e)}catch(n){Me.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function qe(t){const e=t.name;if(Ve.has(e))return Me.debug(`There were multiple attempts to register component ${e}.`),!1;Ve.set(e,t);for(const n of Fe.values())je(n,t);return!0}function Be(t,e){return t.container.getProvider(e)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $e=new me("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ze{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Te("app-exp",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw $e.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(t,e={}){if("object"!=typeof e){e={name:e}}const n=Object.assign({name:"[DEFAULT]",automaticDataCollectionEnabled:!1},e),r=n.name;if("string"!=typeof r||!r)throw $e.create("bad-app-name",{appName:String(r)});if(Fe.has(r))throw $e.create("duplicate-app",{appName:r});const i=new Ae(r);for(const o of Ve.values())i.addComponent(o);const s=new ze(t,n,i);return Fe.set(r,s),s}function He(t="[DEFAULT]"){const e=Fe.get(t);if(!e)throw $e.create("no-app",{appName:t});return e}function Ge(){return Array.from(Fe.values())}function We(t,e,n){var r;let i=null!==(r=Ue[t])&&void 0!==r?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const t=[`Unable to register library "${i}" with version "${e}":`];return s&&t.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&t.push("and"),o&&t.push(`version name "${e}" contains illegal characters (whitespace or "/")`),void Me.warn(t.join(" "))}qe(new Te(`${i}-version`,(()=>({library:i,version:e})),"VERSION"))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Qe;qe(new Te("platform-logger",(t=>new Pe(t)),"PRIVATE")),We("@firebase/app-exp","0.0.900-exp.6ef484a04",Qe),We("fire-js","");const Xe=new me("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),Ye=new Le("@firebase/auth-exp");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(t,...e){Ye.logLevel<=ke.ERROR&&Ye.error(`Auth (9.0.0-beta.7): ${t}`,...e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(t,...e){throw en(t,...e)}function tn(t,...e){return en(t,...e)}function en(t,...e){if("string"!=typeof t){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Xe.create(t,...e)}function nn(t,e,...n){if(!t)throw en(e,...n)}function rn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Je(e),new Error(e)}function sn(t,e){t||rn(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const on=new Map;function an(t){sn(t instanceof Function,"Expected a class definition");let e=on.get(t);return e?(sn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,on.set(t,e),e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function cn(){var t;return"undefined"!=typeof self&&(null===(t=self.location)||void 0===t?void 0:t.href)||""}function un(){var t;return"undefined"!=typeof self&&(null===(t=self.location)||void 0===t?void 0:t.protocol)||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hn(){return"undefined"==typeof navigator||!navigator||!("onLine"in navigator)||"boolean"!=typeof navigator.onLine||"http:"!==un()&&"https:"!==un()&&!le()&&!("connection"in navigator)||navigator.onLine}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ln{constructor(t,e){this.shortDelay=t,this.longDelay=e,sn(e>t,"Short delay should be less than long delay!"),this.isMobile=he()||de()}get(){return hn()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(t,e){sn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{static initialize(t,e,n){this.fetchImpl=t,e&&(this.headersImpl=e),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:void rn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:void rn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:void rn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pn={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded"},gn=new ln(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mn(t,e,n,r,i={}){return yn(t,i,(()=>{let i={},s={};r&&("GET"===e?s=r:i={body:JSON.stringify(r)});const o=we(Object.assign({key:t.config.apiKey},s)).slice(1),a=new(fn.headers());return a.set("Content-Type","application/json"),a.set("X-Client-Version",t._getSdkClientVersion()),t.languageCode&&a.set("X-Firebase-Locale",t.languageCode),fn.fetch()(vn(t,t.config.apiHost,n,o),Object.assign({method:e,headers:a,referrerPolicy:"no-referrer"},i))}))}async function yn(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},pn),e);try{const e=new wn(t),i=await Promise.race([n(),e.promise]);e.clearNetworkTimeout();const s=await i.json();if("needConfirmation"in s)throw bn(t,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{const e=(i.ok?s.errorMessage:s.error.message).split(" : ")[0];if("FEDERATED_USER_ID_ALREADY_LINKED"===e)throw bn(t,"credential-already-in-use",s);if("EMAIL_EXISTS"===e)throw bn(t,"email-already-in-use",s);Ze(t,r[e]||e.toLowerCase().replace(/[_\s]+/g,"-"))}}catch(i){if(i instanceof ge)throw i;Ze(t,"network-request-failed")}}function vn(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?dn(t.config,i):`${t.config.apiScheme}://${i}`}class wn{constructor(t){this.auth=t,this.timer=null,this.promise=new Promise(((t,e)=>{this.timer=setTimeout((()=>e(tn(this.auth,"timeout"))),gn.get())}))}clearNetworkTimeout(){clearTimeout(this.timer)}}function bn(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=tn(t,e,r);return i.customData._tokenResponse=n,i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function In(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch(e){}}function _n(t){return 1e3*Number(t)}function Tn(t){const[e,n,r]=t.split(".");if(void 0===e||void 0===n||void 0===r)return Je("JWT malformed, contained fewer than 3 sections"),null;try{const t=function(t){try{return ae.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null}(n);return t?JSON.parse(t):(Je("Failed to decode base64 JWT payload"),null)}catch(i){return Je("Caught error parsing JWT payload as JSON",i),null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function En(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof ge&&function({code:t}){return"auth/user-disabled"===t||"auth/user-token-expired"===t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}class Sn{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(t){var e;if(t){const t=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),t}{this.errorBackoff=3e4;const t=(null!==(e=this.user.stsTokenManager.expirationTime)&&void 0!==e?e:0)-Date.now()-3e5;return Math.max(0,t)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout((async()=>{await this.iteration()}),e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){return void("auth/network-request-failed"===t.code&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=In(this.lastLoginAt),this.creationTime=In(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cn(t){var e;const n=t.auth,r=await t.getIdToken(),i=await En(t,async function(t,e){return mn(t,"POST","/v1/accounts:lookup",e)}(n,{idToken:r}));nn(null==i?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=(null===(e=s.providerUserInfo)||void 0===e?void 0:e.length)?s.providerUserInfo.map((t=>{var{providerId:e}=t,n=ee(t,["providerId"]);return{providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})):[];const a=(c=t.providerData,u=o,[...c.filter((t=>!u.some((e=>e.providerId===t.providerId)))),...u]);var c,u;const h=t.isAnonymous,l=!(t.email&&s.passwordHash||(null==a?void 0:a.length)),d=!!h&&l,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new kn(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(t,f)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class An{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){nn(t.idToken,"internal-error"),nn(void 0!==t.idToken,"internal-error"),nn(void 0!==t.refreshToken,"internal-error");const e="expiresIn"in t&&void 0!==t.expiresIn?Number(t.expiresIn):function(t){const e=Tn(t);return nn(e,"internal-error"),nn(void 0!==e.exp,"internal-error"),nn(void 0!==e.iat,"internal-error"),Number(e.exp)-Number(e.iat)}(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}async getToken(t,e=!1){return nn(!this.accessToken||this.refreshToken,t,"user-token-expired"),e||!this.accessToken||this.isExpired?this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:n,refreshToken:r,expiresIn:i}=await
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(t,e){const n=await yn(t,{},(()=>{const n=we({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,s=vn(t,r,"/v1/token",`key=${i}`);return fn.fetch()(s,{method:"POST",headers:{"X-Client-Version":t._getSdkClientVersion(),"Content-Type":"application/x-www-form-urlencoded"},body:n})}));return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(t,e);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(t,e,n){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(t,e){const{refreshToken:n,accessToken:r,expirationTime:i}=e,s=new An;return n&&(nn("string"==typeof n,"internal-error",{appName:t}),s.refreshToken=n),r&&(nn("string"==typeof r,"internal-error",{appName:t}),s.accessToken=r),i&&(nn("number"==typeof i,"internal-error",{appName:t}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new An,this.toJSON())}_performRefresh(){return rn("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rn(t,e){nn("string"==typeof t||void 0===t,"internal-error",{appName:e})}class Nn{constructor(t){var{uid:e,auth:n,stsTokenManager:r}=t,i=ee(t,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.emailVerified=!1,this.isAnonymous=!1,this.tenantId=null,this.providerData=[],this.proactiveRefresh=new Sn(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.metadata=new kn(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(t){const e=await En(this,this.stsTokenManager.getToken(this.auth,t));return nn(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return async function(t,e=!1){const n=_e(t),r=await n.getIdToken(e),i=Tn(r);nn(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s="object"==typeof i.firebase?i.firebase:void 0,o=null==s?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:In(_n(i.auth_time)),issuedAtTime:In(_n(i.iat)),expirationTime:In(_n(i.exp)),signInProvider:o||null,signInSecondFactor:(null==s?void 0:s.sign_in_second_factor)||null}}(this,t)}reload(){return async function(t){const e=_e(t);await Cn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}(this)}_assign(t){this!==t&&(nn(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map((t=>Object.assign({},t))),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){return new Nn(Object.assign(Object.assign({},this),{auth:t,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(t){nn(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let n=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),n=!0),e&&await Cn(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){const t=await this.getIdToken();return await En(this,async function(t,e){return mn(t,"POST","/v1/accounts:delete",e)}(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map((t=>Object.assign({},t))),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){var n,r,i,s,o,a,c,u;const h=null!==(n=e.displayName)&&void 0!==n?n:void 0,l=null!==(r=e.email)&&void 0!==r?r:void 0,d=null!==(i=e.phoneNumber)&&void 0!==i?i:void 0,f=null!==(s=e.photoURL)&&void 0!==s?s:void 0,p=null!==(o=e.tenantId)&&void 0!==o?o:void 0,g=null!==(a=e._redirectEventId)&&void 0!==a?a:void 0,m=null!==(c=e.createdAt)&&void 0!==c?c:void 0,y=null!==(u=e.lastLoginAt)&&void 0!==u?u:void 0,{uid:v,emailVerified:w,isAnonymous:b,providerData:I,stsTokenManager:_}=e;nn(v&&_,t,"internal-error");const T=An.fromJSON(this.name,_);nn("string"==typeof v,t,"internal-error"),Rn(h,t.name),Rn(l,t.name),nn("boolean"==typeof w,t,"internal-error"),nn("boolean"==typeof b,t,"internal-error"),Rn(d,t.name),Rn(f,t.name),Rn(p,t.name),Rn(g,t.name),Rn(m,t.name),Rn(y,t.name);const E=new Nn({uid:v,auth:t,email:l,emailVerified:w,displayName:h,isAnonymous:b,photoURL:f,phoneNumber:d,tenantId:p,stsTokenManager:T,createdAt:m,lastLoginAt:y});return I&&Array.isArray(I)&&(E.providerData=I.map((t=>Object.assign({},t)))),g&&(E._redirectEventId=g),E}static async _fromIdTokenResponse(t,e,n=!1){const r=new An;r.updateFromServerResponse(e);const i=new Nn({uid:e.localId,auth:t,stsTokenManager:r,isAnonymous:n});return await Cn(i),i}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return void 0===e?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}Dn.type="NONE";const xn=Dn;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function On(t,e,n){return`firebase:${t}:${e}:${n}`}class Ln{constructor(t,e,n){this.persistence=t,this.auth=e,this.userKey=n;const{config:r,name:i}=this.auth;this.fullUserKey=On(this.userKey,r.apiKey,i),this.fullPersistenceKey=On("persistence",r.apiKey,i),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);return t?Nn._fromJSON(this.auth,t):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=t,e?this.setCurrentUser(e):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,n="authUser"){if(!e.length)return new Ln(an(xn),t,n);let r=an(xn);for(const a of e)if(await a._isAvailable()){r=a;break}let i=null;const s=On(n,t.config.apiKey,t.name);for(const a of e)try{const e=await a._get(s);if(e){const n=Nn._fromJSON(t,e);a!==r&&(i=n);break}}catch(o){}return i&&await r._set(s,i.toJSON()),await Promise.all(e.map((async t=>{if(t!==r)try{await t._remove(s)}catch(o){}}))),new Ln(r,t,n)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pn(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Vn(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Mn(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(qn(e))return"Blackberry";if(Bn(e))return"Webos";if(Un(e))return"Safari";if((e.includes("chrome/")||Fn(e))&&!e.includes("edge/"))return"Chrome";if(jn(e))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=t.match(e);if(2===(null==n?void 0:n.length))return n[1]}return"Other"}function Mn(t=ue()){return/firefox\//i.test(t)}function Un(t=ue()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Fn(t=ue()){return/crios\//i.test(t)}function Vn(t=ue()){return/iemobile/i.test(t)}function jn(t=ue()){return/android/i.test(t)}function qn(t=ue()){return/blackberry/i.test(t)}function Bn(t=ue()){return/webos/i.test(t)}function $n(t=ue()){return/iphone|ipad|ipod/i.test(t)}function zn(t=ue()){return $n(t)||jn(t)||Bn(t)||qn(t)||/windows phone/i.test(t)||Vn(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Kn(t,e=[]){let n;switch(t){case"Browser":n=Pn(ue());break;case"Worker":n=`${Pn(ue())}-${t}`;break;default:n=t}return`${n}/JsCore/9.0.0-beta.7/${e.length?e.join(","):"FirebaseCore-web"}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(t,e){this.app=t,this.config=e,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Wn(this),this.idTokenSubscription=new Wn(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.redirectInitializerError=null,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Xe,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=e.sdkClientVersion}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=an(e)),this._initializationPromise=this.queue((async()=>{var n;this._deleted||(this.persistenceManager=await Ln.create(this,t),this._deleted||((null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)&&await this._popupRedirectResolver._initialize(this),await this.initializeCurrentUser(e),this._deleted||(this._isInitialized=!0)))})),this._initializationPromise.then((()=>{if(this.redirectInitializerError)throw this.redirectInitializerError}))}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();return this.currentUser||t?this.currentUser&&t&&this.currentUser.uid===t.uid?(this._currentUser._assign(t),void(await this.currentUser.getIdToken())):void(await this._updateCurrentUser(t)):void 0}async initializeCurrentUser(t){var e;let n=await this.assertedPersistence.getCurrentUser();if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=null===(e=this.redirectUser)||void 0===e?void 0:e._redirectEventId,i=null==n?void 0:n._redirectEventId,s=await this.tryRedirectSignIn(t);r&&r!==i||!(null==s?void 0:s.user)||(n=s.user)}return n?n._redirectEventId?(nn(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)):this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch(n){this.redirectInitializerError=n,await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await Cn(t)}catch(e){if("auth/network-request-failed"!==e.code)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(t){const e=t?_e(t):null;return e&&nn(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t){if(!this._deleted)return t&&nn(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),this.queue((async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()}))}async signOut(){return(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null)}setPersistence(t){return this.queue((async()=>{await this.assertedPersistence.setPersistence(an(t))}))}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(t){this._errorFactory=new me("auth","Firebase",t())}onAuthStateChanged(t,e,n){return this.registerStateListener(this.authStateSubscription,t,e,n)}onIdTokenChanged(t,e,n){return this.registerStateListener(this.idTokenSubscription,t,e,n)}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(t=this._currentUser)||void 0===t?void 0:t.toJSON()}}async _setRedirectUser(t,e){const n=await this.getOrInitRedirectPersistenceManager(e);return null===t?n.removeCurrentUser():n.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&an(t)||this._popupRedirectResolver;nn(e,this,"argument-error"),this.redirectPersistenceManager=await Ln.create(this,[an(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var e,n;return this._isInitialized&&await this.queue((async()=>{})),(null===(e=this._currentUser)||void 0===e?void 0:e._redirectEventId)===t?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue((async()=>this.directlySetCurrentUser(t)))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t,e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=null!==(e=null===(t=this.currentUser)||void 0===t?void 0:t.uid)&&void 0!==e?e:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,n,r){if(this._deleted)return()=>{};const i="function"==typeof e?e:e.next.bind(e),s=this._isInitialized?Promise.resolve():this._initializationPromise;return nn(s,this,"internal-error"),s.then((()=>i(this.currentUser))),"function"==typeof e?t.addObserver(e,n,r):t.addObserver(e)}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&(this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh()),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return nn(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){t&&!this.frameworks.includes(t)&&(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=Kn(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}_getSdkClientVersion(){return this.clientVersion}}function Gn(t){return _e(t)}class Wn{constructor(t){var e,n;this.auth=t,this.observer=null,this.addObserver=(n=new be((t=>this.observer=t),e)).subscribe.bind(n)}get next(){return nn(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(t,e){this.providerId=t,this.signInMethod=e}toJSON(){return rn("not implemented")}_getIdTokenResponse(t){return rn("not implemented")}_linkToIdToken(t,e){return rn("not implemented")}_getReauthenticationResolver(t){return rn("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xn(t,e){return async function(t,e,n,r,i={}){const s=await mn(t,e,n,r,i);return"mfaPendingCredential"in s&&Ze(t,"multi-factor-auth-required",{serverResponse:s}),s}(t,"POST","/v1/accounts:signInWithIdp",function(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}(t,e))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn extends Qn{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const e=new Yn(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(e.idToken=t.idToken),t.accessToken&&(e.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(e.nonce=t.nonce),t.pendingToken&&(e.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(e.accessToken=t.oauthToken,e.secret=t.oauthTokenSecret):Ze("argument-error"),e}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const e="string"==typeof t?JSON.parse(t):t,{providerId:n,signInMethod:r}=e,i=ee(e,["providerId","signInMethod"]);if(!n||!r)return null;const s=new Yn(n,r);return Object.assign(s,i),s}_getIdTokenResponse(t){return Xn(t,this.buildRequest())}_linkToIdToken(t,e){const n=this.buildRequest();return n.idToken=e,Xn(t,n)}_getReauthenticationResolver(t){const e=this.buildRequest();return e.autoCreate=!1,Xn(t,e)}buildRequest(){const t={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const e={};this.idToken&&(e.id_token=this.idToken),this.accessToken&&(e.access_token=this.accessToken),this.secret&&(e.oauth_token_secret=this.secret),e.providerId=this.providerId,this.nonce&&!this.pendingToken&&(e.nonce=this.nonce),t.postBody=we(e)}return t}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn extends Jn{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr extends Zn{constructor(){super("facebook.com")}static credential(t){return Yn._fromParams({providerId:tr.PROVIDER_ID,signInMethod:tr.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return tr.credentialFromTaggedObject(t)}static credentialFromError(t){return tr.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t))return null;if(!t.oauthAccessToken)return null;try{return tr.credential(t.oauthAccessToken)}catch(e){return null}}}tr.FACEBOOK_SIGN_IN_METHOD="facebook.com",tr.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class er extends Zn{constructor(){super("google.com"),this.addScope("profile")}static credential(t,e){return Yn._fromParams({providerId:er.PROVIDER_ID,signInMethod:er.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:e})}static credentialFromResult(t){return er.credentialFromTaggedObject(t)}static credentialFromError(t){return er.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:e,oauthAccessToken:n}=t;if(!e&&!n)return null;try{return er.credential(e,n)}catch(r){return null}}}er.GOOGLE_SIGN_IN_METHOD="google.com",er.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class nr extends Zn{constructor(){super("github.com")}static credential(t){return Yn._fromParams({providerId:nr.PROVIDER_ID,signInMethod:nr.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return nr.credentialFromTaggedObject(t)}static credentialFromError(t){return nr.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t))return null;if(!t.oauthAccessToken)return null;try{return nr.credential(t.oauthAccessToken)}catch(e){return null}}}nr.GITHUB_SIGN_IN_METHOD="github.com",nr.PROVIDER_ID="github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class rr extends Zn{constructor(){super("twitter.com")}static credential(t,e){return Yn._fromParams({providerId:rr.PROVIDER_ID,signInMethod:rr.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:e})}static credentialFromResult(t){return rr.credentialFromTaggedObject(t)}static credentialFromError(t){return rr.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:e,oauthTokenSecret:n}=t;if(!e||!n)return null;try{return rr.credential(e,n)}catch(r){return null}}}rr.TWITTER_SIGN_IN_METHOD="twitter.com",rr.PROVIDER_ID="twitter.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ir{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,e,n,r=!1){const i=await Nn._fromIdTokenResponse(t,n,r),s=sr(n);return new ir({user:i,providerId:s,_tokenResponse:n,operationType:e})}static async _forOperation(t,e,n){await t._updateTokensIfNecessary(n,!0);const r=sr(n);return new ir({user:t,providerId:r,_tokenResponse:n,operationType:e})}}function sr(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or extends ge{constructor(t,e,n,r){var i;super(e.code,e.message),this.operationType=n,this.user=r,this.name="FirebaseError",Object.setPrototypeOf(this,or.prototype),this.appName=t.name,this.code=e.code,this.tenantId=null!==(i=t.tenantId)&&void 0!==i?i:void 0,this.serverResponse=e.customData.serverResponse}static _fromErrorAndOperation(t,e,n,r){return new or(t,e,n,r)}}function ar(t,e,n,r){return("reauthenticate"===e?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch((n=>{if("auth/multi-factor-auth-required"===n.code)throw or._fromErrorAndOperation(t,n,e,r);throw n}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cr(t,e,n){await Cn(e);var r;const i=!1===t?"provider-already-linked":"no-such-provider";nn((r=e.providerData,new Set(r.map((({providerId:t})=>t)).filter((t=>!!t)))).has(n)===t,e.auth,i)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ur(t){return _e(t).signOut()}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class hr{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),(null===(t=this.auth.currentUser)||void 0===t?void 0:t.uid)||null}async getToken(t){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(t)}}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged((e=>{var n;t((null===(n=e)||void 0===n?void 0:n.stsTokenManager.accessToken)||null)}));this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){nn(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class lr{constructor(t,e){this.storage=t,this.type=e}_isAvailable(){try{return this.storage?(this.storage.setItem("__sak","1"),this.storage.removeItem("__sak"),Promise.resolve(!0)):Promise.resolve(!1)}catch(t){return Promise.resolve(!1)}}_set(t,e){return this.storage.setItem(t,JSON.stringify(e)),Promise.resolve()}_get(t){const e=this.storage.getItem(t);return Promise.resolve(e?JSON.parse(e):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr extends lr{constructor(){super(window.localStorage,"LOCAL"),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=function(){const t=ue();return Un(t)||$n(t)}()&&function(){try{return!(!window||window===window.top)}catch(t){return!1}}(),this.fallbackToPolling=zn(),this.boundEventHandler=this.onStorageEvent.bind(this)}forAllChangedKeys(t){for(const e of Object.keys(this.listeners)){const n=this.storage.getItem(e),r=this.localCache[e];n!==r&&t(e,r,n)}}onStorageEvent(t,e=!1){if(!t.key)return void this.forAllChangedKeys(((t,e,n)=>{this.notifyListeners(t,n)}));const n=t.key;if(e?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const r=this.storage.getItem(n);if(t.newValue!==r)null!==t.newValue?this.storage.setItem(n,t.newValue):this.storage.removeItem(n);else if(this.localCache[n]===t.newValue&&!e)return}const r=()=>{const t=this.storage.getItem(n);(e||this.localCache[n]!==t)&&this.notifyListeners(n,t)},i=this.storage.getItem(n);fe()&&10===document.documentMode&&i!==t.newValue&&t.newValue!==t.oldValue?setTimeout(r,10):r()}notifyListeners(t,e){this.localCache[t]=e;const n=this.listeners[t];if(n)for(const r of Array.from(n))r(e?JSON.parse(e):e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((()=>{this.forAllChangedKeys(((t,e,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:e,newValue:n}),!0)}))}),1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,e){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),0===this.listeners[t].size&&delete this.listeners[t]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(t,e){await super._set(t,e),this.localCache[t]=JSON.stringify(e)}async _get(t){const e=await super._get(t);return this.localCache[t]=JSON.stringify(e),e}async _remove(t){await super._remove(t),delete this.localCache[t]}}dr.type="LOCAL";const fr=dr;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class pr{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find((e=>e.isListeningto(t)));if(e)return e;const n=new pr(t);return this.receivers.push(n),n}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:n,eventType:r,data:i}=e.data,s=this.handlersMap[r];if(!(null==s?void 0:s.size))return;e.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(s).map((async t=>t(e.origin,i))),a=await function(t){return Promise.all(t.map((async t=>{try{return{fulfilled:!0,value:await t}}catch(e){return{fulfilled:!1,reason:e}}})))}(o);e.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(t,e){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),e&&0!==this.handlersMap[t].size||delete this.handlersMap[t],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function gr(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(10*Math.random());return t+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */pr.receivers=[];class mr{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,n=50){const r="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,s;return new Promise(((o,a)=>{const c=gr("",20);r.port1.start();const u=setTimeout((()=>{a(new Error("unsupported_event"))}),n);s={messageChannel:r,onMessage(t){const e=t;if(e.data.eventId===c)switch(e.data.status){case"ack":clearTimeout(u),i=setTimeout((()=>{a(new Error("timeout"))}),3e3);break;case"done":clearTimeout(i),o(e.data.response);break;default:clearTimeout(u),clearTimeout(i),a(new Error("invalid_response"))}}},this.handlers.add(s),r.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:t,eventId:c,data:e},[r.port2])})).finally((()=>{s&&this.removeMessageHandler(s)}))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yr(){return window}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function vr(){return void 0!==yr().WorkerGlobalScope&&"function"==typeof yr().importScripts}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const wr="firebaseLocalStorageDb";class br{constructor(t){this.request=t}toPromise(){return new Promise(((t,e)=>{this.request.addEventListener("success",(()=>{t(this.request.result)})),this.request.addEventListener("error",(()=>{e(this.request.error)}))}))}}function Ir(t,e){return t.transaction(["firebaseLocalStorage"],e?"readwrite":"readonly").objectStore("firebaseLocalStorage")}function _r(){const t=indexedDB.open(wr,1);return new Promise(((e,n)=>{t.addEventListener("error",(()=>{n(t.error)})),t.addEventListener("upgradeneeded",(()=>{const e=t.result;try{e.createObjectStore("firebaseLocalStorage",{keyPath:"fbase_key"})}catch(r){n(r)}})),t.addEventListener("success",(async()=>{const n=t.result;n.objectStoreNames.contains("firebaseLocalStorage")?e(n):(n.close(),await function(){const t=indexedDB.deleteDatabase(wr);return new br(t).toPromise()}(),e(await _r()))}))}))}async function Tr(t,e,n){const r=Ir(t,!0).put({fbase_key:e,value:n});return new br(r).toPromise()}function Er(t,e){const n=Ir(t,!0).delete(e);return new br(n).toPromise()}class Sr{constructor(){this.type="LOCAL",this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then((()=>{}),(()=>{}))}async _openDb(){return this.db||(this.db=await _r()),this.db}async _withRetries(t){let e=0;for(;;)try{const e=await this._openDb();return await t(e)}catch(n){if(e++>3)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return vr()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=pr._getInstance(vr()?self:null),this.receiver._subscribe("keyChanged",(async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)}))),this.receiver._subscribe("ping",(async(t,e)=>["keyChanged"]))}async initializeSender(){var t,e;if(this.activeServiceWorker=await async function(){if(!(null===navigator||void 0===navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(t){return null}}(),!this.activeServiceWorker)return;this.sender=new mr(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null===(t=n[0])||void 0===t?void 0:t.fulfilled)&&(null===(e=n[0])||void 0===e?void 0:e.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){var e;if(this.sender&&this.activeServiceWorker&&((null===(e=null===navigator||void 0===navigator?void 0:navigator.serviceWorker)||void 0===e?void 0:e.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch(e){}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await _r();return await Tr(t,"__sak","1"),await Er(t,"__sak"),!0}catch(t){}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite((async()=>(await this._withRetries((n=>Tr(n,t,e))),this.localCache[t]=e,this.notifyServiceWorker(t))))}async _get(t){const e=await this._withRetries((e=>async function(t,e){const n=Ir(t,!1).get(e),r=await new br(n).toPromise();return void 0===r?null:r.value}(e,t)));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite((async()=>(await this._withRetries((e=>Er(e,t))),delete this.localCache[t],this.notifyServiceWorker(t))))}async _poll(){const t=await this._withRetries((t=>{const e=Ir(t,!1).getAll();return new br(e).toPromise()}));if(!t)return[];if(0!==this.pendingWrites)return[];const e=[],n=new Set;for(const{fbase_key:r,value:i}of t)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),e.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),e.push(r));return e}notifyListeners(t,e){this.localCache[t]=e;const n=this.listeners[t];if(n)for(const r of Array.from(n))r(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((async()=>this._poll()),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),0===this.listeners[t].size&&delete this.listeners[t]),0===Object.keys(this.listeners).length&&this.stopPolling()}}Sr.type="LOCAL";const kr=Sr;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let e=!1;return this.consumers.forEach((n=>{this.isEventForConsumer(t,n)&&(e=!0,this.sendToConsumer(t,n),this.saveEventToCache(t))})),this.hasHandledPotentialRedirect||!function(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Rr(t);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)||(this.hasHandledPotentialRedirect=!0,e||(this.queuedRedirectEvent=t,e=!0)),e}sendToConsumer(t,e){var n;if(t.error&&!Rr(t)){const r=(null===(n=t.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";e.onError(tn(this.auth,r))}else e.onAuthEvent(t)}isEventForConsumer(t,e){const n=null===e.eventId||!!t.eventId&&t.eventId===e.eventId;return e.filter.includes(t.type)&&n}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ar(t))}saveEventToCache(t){this.cachedEventUids.add(Ar(t)),this.lastProcessedEventTime=Date.now()}}function Ar(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter((t=>t)).join("-")}function Rr({type:t,error:e}){return"unknown"===t&&"auth/no-auth-event"===(null==e?void 0:e.code)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Nr=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Dr=/^https?/;async function xr(t){if(t.config.emulator)return;const{authorizedDomains:e}=await async function(t,e={}){return mn(t,"GET","/v1/projects",e)}(t);for(const r of e)try{if(Or(r))return}catch(n){}Ze(t,"unauthorized-domain")}function Or(t){const e=cn(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const i=new URL(t);return""===i.hostname&&""===r?"chrome-extension:"===n&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!Dr.test(n))return!1;if(Nr.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lr(t){return new Promise(((e,n)=>{const r=document.createElement("script");var i,s;r.setAttribute("src",t),r.onload=e,r.onerror=t=>{const e=tn("internal-error");e.customData=t,n(e)},r.type="text/javascript",r.charset="UTF-8",(null!==(s=null===(i=document.getElementsByTagName("head"))||void 0===i?void 0:i[0])&&void 0!==s?s:document).appendChild(r)}))}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Pr=new ln(3e4,6e4);function Mr(){const t=yr().___jsl;if(null==t?void 0:t.H)for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}function Ur(t){return new Promise(((e,n)=>{var r,i,s;function o(){Mr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Mr(),n(tn(t,"network-request-failed"))},timeout:Pr.get()})}if(null===(i=null===(r=yr().gapi)||void 0===r?void 0:r.iframes)||void 0===i?void 0:i.Iframe)e(gapi.iframes.getContext());else{if(!(null===(s=yr().gapi)||void 0===s?void 0:s.load)){const e=`__${"iframefcb"}${Math.floor(1e6*Math.random())}`;return yr()[e]=()=>{gapi.load?o():n(tn(t,"network-request-failed"))},Lr(`https://apis.google.com/js/api.js?onload=${e}`)}o()}})).catch((t=>{throw Fr=null,t}))}let Fr=null;
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Vr=new ln(5e3,15e3),jr={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"}},qr=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Br(t){const e=t.config;nn(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?dn(e,"emulator/auth/iframe"):`https://${t.config.authDomain}/__/auth/iframe`,r={apiKey:e.apiKey,appName:t.name,v:"9.0.0-beta.7"},i=qr.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${we(r).slice(1)}`}async function $r(t){const e=await function(t){return Fr=Fr||Ur(t),Fr}(t),n=yr().gapi;return nn(n,t,"internal-error"),e.open({where:document.body,url:Br(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:jr,dontclear:!0},(e=>new Promise((async(n,r)=>{await e.restyle({setHideOnLeave:!1});const i=tn(t,"network-request-failed"),s=yr().setTimeout((()=>{r(i)}),Vr.get());function o(){yr().clearTimeout(s),n(e)}e.ping(o).then(o,(()=>{r(i)}))}))))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr extends lr{constructor(){super(window.sessionStorage,"SESSION")}_addListener(t,e){}_removeListener(t,e){}}zr.type="SESSION";const Kr=zr,Hr={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(t){}}}function Wr(t,e,n,r=500,i=600){const s=Math.min((window.screen.availHeight-i)/2,0).toString(),o=Math.min((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},Hr),{width:r.toString(),height:i.toString(),top:s,left:o}),u=ue().toLowerCase();n&&(a=Fn(u)?"_blank":n),Mn(u)&&(e=e||"http://localhost",c.scrollbars="yes");const h=Object.entries(c).reduce(((t,[e,n])=>`${t}${e}=${n},`),"");if(function(t=ue()){var e;return $n(t)&&!!(null===(e=window.navigator)||void 0===e?void 0:e.standalone)}(u)&&"_self"!==a)return function(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e||"",a),new Gr(null);const l=window.open(e||"",a,h);nn(l,t,"popup-blocked");try{l.focus()}catch(d){}return new Gr(l)}function Qr(t,e){return e?an(e):(nn(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr extends Qn{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return Xn(t,this._buildIdpRequest())}_linkToIdToken(t,e){return Xn(t,this._buildIdpRequest(e))}_getReauthenticationResolver(t){return Xn(t,this._buildIdpRequest())}_buildIdpRequest(t){const e={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(e.idToken=t),e}}function Yr(t){
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return async function(t,e,n=!1){const r="signIn",i=await ar(t,r,e),s=await ir._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}(t.auth,new Xr(t),t.bypassAuthState)}function Jr(t){const{auth:e,user:n}=t;return nn(n,e,"internal-error"),async function(t,e,n=!1){const{auth:r}=t,i="reauthenticate";try{const s=await En(t,ar(r,i,e,t),n);nn(s.idToken,r,"internal-error");const o=Tn(s.idToken);nn(o,r,"internal-error");const{sub:a}=o;return nn(t.uid===a,r,"user-mismatch"),ir._forOperation(t,i,s)}catch(s){throw"auth/user-not-found"===(null==s?void 0:s.code)&&Ze(r,"user-mismatch"),s}}(n,new Xr(t),t.bypassAuthState)}async function Zr(t){const{auth:e,user:n}=t;return nn(n,e,"internal-error"),async function(t,e,n=!1){const r=await En(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ir._forOperation(t,"link",r)}(n,new Xr(t),t.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti{constructor(t,e,n,r,i=!1){this.auth=t,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(e)?e:[e]}execute(){return new Promise((async(t,e)=>{this.pendingPromise={resolve:t,reject:e};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}}))}async onAuthEvent(t){const{urlResponse:e,sessionId:n,postBody:r,tenantId:i,error:s,type:o}=t;if(s)return void this.reject(s);const a={auth:this.auth,requestUri:e,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(c){this.reject(c)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return Yr;case"linkViaPopup":case"linkViaRedirect":return Zr;case"reauthViaPopup":case"reauthViaRedirect":return Jr;default:Ze(this.auth,"internal-error")}}resolve(t){sn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){sn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ei=new Map;class ni extends ti{constructor(t,e,n=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],e,void 0,n),this.eventId=null}async execute(){let t=ei.get(this.auth._key());if(!t){try{const e=await async function(t,e){const n=si(e),r="true"===await ii(t)._get(n);return await ii(t)._remove(n),r}(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(e)}catch(e){t=()=>Promise.reject(e)}ei.set(this.auth._key(),t)}return t()}async onAuthEvent(t){if("signInViaRedirect"===t.type)return super.onAuthEvent(t);if("unknown"!==t.type){if(t.eventId){const e=await this.auth._redirectUserForId(t.eventId);if(e)return this.user=e,super.onAuthEvent(t);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}async function ri(t,e){return ii(t)._set(si(e),"true")}function ii(t){return an(t._redirectPersistence)}function si(t){return On("pendingRedirect",t.config.apiKey,t.name)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oi(t,e,n){return async function(t,e,n){const r=Gn(t);nn(e instanceof Jn,t,"argument-error");const i=Qr(r,n);return await ri(i,r),i._openRedirect(r,e,"signInViaRedirect")}(t,e,n)}function ai(t,e,n){return async function(t,e,n){const r=_e(t);nn(e instanceof Jn,r.auth,"argument-error");const i=Qr(r.auth,n);await cr(!1,r,e.providerId),await ri(i,r.auth);const s=await async function(t){const e=gr(`${t.uid}:::`);return t._redirectEventId=e,await t.auth._setRedirectUser(t),await t.auth._persistUserIfCurrent(t),e}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r);return i._openRedirect(r.auth,e,"linkViaRedirect",s)}(t,e,n)}async function ci(t,e,n=!1){const r=Gn(t),i=Qr(r,e),s=new ni(r,i,n),o=await s.execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}function ui(t,e,n,r,i,s){nn(t.config.authDomain,t,"auth-domain-config-required"),nn(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:"9.0.0-beta.7",eventId:i};if(e instanceof Jn){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",function(t){for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[t,e]of Object.entries(s||{}))o[t]=e}if(e instanceof Zn){const t=e.getScopes().filter((t=>""!==t));t.length>0&&(o.scopes=t.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const c of Object.keys(a))void 0===a[c]&&delete a[c];return`${function({config:t}){if(!t.emulator)return`https://${t.authDomain}/__/auth/handler`;return dn(t,"emulator/auth/handler")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)}?${we(a).slice(1)}`}const hi=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Kr,this._completeRedirectFn=ci}async _openPopup(t,e,n,r){var i;sn(null===(i=this.eventManagers[t._key()])||void 0===i?void 0:i.manager,"_initialize() not called before _openPopup()");return Wr(t,ui(t,e,n,cn(),r),gr())}async _openRedirect(t,e,n,r){var i;return await this._originValidation(t),i=ui(t,e,n,cn(),r),yr().location.href=i,new Promise((()=>{}))}_initialize(t){const e=t._key();if(this.eventManagers[e]){const{manager:t,promise:n}=this.eventManagers[e];return t?Promise.resolve(t):(sn(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(t);return this.eventManagers[e]={promise:n},n}async initAndGetManager(t){const e=await $r(t),n=new Cr(t);return e.register("authEvent",(e=>{nn(null==e?void 0:e.authEvent,t,"invalid-auth-event");return{status:n.onEvent(e.authEvent)?"ACK":"ERROR"}}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:n},this.iframes[t._key()]=e,n}_isIframeWebStorageSupported(t,e){this.iframes[t._key()].send("webStorageSupport",{type:"webStorageSupport"},(n=>{var r;const i=null===(r=null==n?void 0:n[0])||void 0===r?void 0:r.webStorageSupport;void 0!==i&&e(!!i),Ze(t,"internal-error")}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=xr(t)),this.originValidationPromises[e]}get _shouldInitProactively(){return zn()||Un()||$n()}};new ln(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const li=new ln(2e3,1e4);async function di(t,e,n){const r=Gn(t);nn(e instanceof Jn,t,"argument-error");const i=Qr(r,n);return new pi(r,"signInViaPopup",e,i).executeNotNull()}async function fi(t,e,n){const r=_e(t);nn(e instanceof Jn,r.auth,"argument-error");const i=Qr(r.auth,n);return new pi(r.auth,"linkViaPopup",e,i,r).executeNotNull()}class pi extends ti{constructor(t,e,n,r,i){super(t,e,r,i),this.provider=n,this.authWindow=null,this.pollId=null,pi.currentPopupAction&&pi.currentPopupAction.cancel(),pi.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return nn(t,this.auth,"internal-error"),t}async onExecution(){sn(1===this.filter.length,"Popup operations only handle one event");const t=gr();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch((t=>{this.reject(t)})),this.resolver._isIframeWebStorageSupported(this.auth,(t=>{t||this.reject(tn(this.auth,"web-storage-unsupported"))})),this.pollUserCancellation()}get eventId(){var t;return(null===(t=this.authWindow)||void 0===t?void 0:t.associatedEvent)||null}cancel(){this.reject(tn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,pi.currentPopupAction=null}pollUserCancellation(){const t=()=>{var e,n;(null===(n=null===(e=this.authWindow)||void 0===e?void 0:e.window)||void 0===n?void 0:n.closed)?this.pollId=window.setTimeout((()=>{this.pollId=null,this.reject(tn(this.auth,"popup-closed-by-user"))}),2e3):this.pollId=window.setTimeout(t,li.get())};t()}}function gi(t=He()){const e=Be(t,"auth-exp");return e.isInitialized()?e.getImmediate():function(t,e){const n=Be(t,"auth-exp");n.isInitialized()&&Ze(n.getImmediate(),"already-initialized");return n.initialize({options:e})}(t,{popupRedirectResolver:hi,persistence:[kr,fr]})}var mi,yi,vi;pi.currentPopupAction=null,mi="Browser",qe(new Te("auth-exp",((t,{options:e})=>{const n=t.getProvider("app-exp").getImmediate(),{apiKey:r,authDomain:i}=n.options;return(t=>{nn(r&&!r.includes(":"),"invalid-api-key",{appName:t.name}),nn(!(null==i?void 0:i.includes(":")),"argument-error",{appName:t.name});const n={apiKey:r,authDomain:i,clientPlatform:mi,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Kn(mi)},s=new Hn(t,n);return function(t,e){const n=(null==e?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(an);(null==e?void 0:e.errorMap)&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,null==e?void 0:e.popupRedirectResolver)}(s,e),s})(n)}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((t,e,n)=>{t.getProvider("auth-internal").initialize()}))),qe(new Te("auth-internal",(t=>{const e=Gn(t.getProvider("auth-exp").getImmediate());return new hr(e)}),"PRIVATE").setInstantiationMode("EXPLICIT")),We("@firebase/auth-exp","0.0.900-exp.6ef484a04",function(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}(mi)),(vi=yi||(yi={}))[vi.NO_ERROR=0]="NO_ERROR",vi[vi.NETWORK_ERROR=1]="NETWORK_ERROR",vi[vi.ABORT=2]="ABORT";class wi extends ge{constructor(t,e){super(bi(t),`Firebase Storage: ${e} (${bi(t)})`),this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,wi.prototype)}_codeEquals(t){return bi(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}function bi(t){return"storage/"+t}function Ii(t){return new wi("invalid-argument",t)}function _i(){return new wi("app-deleted","The Firebase app was deleted.")}function Ti(t){throw new wi("internal-error","Internal error: "+t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.errorCode_=yi.NO_ERROR,this.sendPromise_=new Promise((t=>{this.xhr_.addEventListener("abort",(()=>{this.errorCode_=yi.ABORT,t()})),this.xhr_.addEventListener("error",(()=>{this.errorCode_=yi.NETWORK_ERROR,t()})),this.xhr_.addEventListener("load",(()=>{t()}))}))}send(t,e,n,r){if(this.sent_)throw Ti("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(e,t,!0),void 0!==r)for(const i in r)r.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,r[i].toString());return void 0!==n?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Ti("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Ti("cannot .getStatus() before sending");try{return this.xhr_.status}catch(t){return-1}}getResponseText(){if(!this.sent_)throw Ti("cannot .getResponseText() before sending");return this.xhr_.responseText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Si{createConnection(){return new Ei}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(t,e){this.bucket=t,this.path_=e}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,e){let n;try{n=ki.makeFromUrl(t,e)}catch(r){return new ki(t,"")}if(""===n.path)return n;throw new wi("invalid-default-bucket","Invalid default bucket '"+t+"'.")}static makeFromUrl(t,e){let n=null;const r="([A-Za-z0-9.\\-_]+)";const i=new RegExp("^gs://"+r+"(/(.*))?$","i");function s(t){t.path_=decodeURIComponent(t.path)}const o=e.replace(/[.]/g,"\\."),a=[{regex:i,indices:{bucket:1,path:3},postModify:function(t){"/"===t.path.charAt(t.path.length-1)&&(t.path_=t.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${o}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:s},{regex:new RegExp(`^https?://${"firebasestorage.googleapis.com"===e?"(?:storage.googleapis.com|storage.cloud.google.com)":e}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:s}];for(let c=0;c<a.length;c++){const e=a[c],r=e.regex.exec(t);if(r){const t=r[e.indices.bucket];let i=r[e.indices.path];i||(i=""),n=new ki(t,i),e.postModify(n);break}}if(null==n)throw function(t){return new wi("invalid-url","Invalid URL '"+t+"'.")}(t);return n}}class Ci{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ai(t,e,n,r){if(r<e)throw Ii(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw Ii(`Invalid value for '${t}'. Expected ${n} or less.`)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ri{constructor(t,e,n,r,i,s,o,a,c,u,h){this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.url_=t,this.method_=e,this.headers_=n,this.body_=r,this.successCodes_=i.slice(),this.additionalRetryCodes_=s.slice(),this.callback_=o,this.errorCallback_=a,this.progressCallback_=u,this.timeout_=c,this.pool_=h,this.promise_=new Promise(((t,e)=>{this.resolve_=t,this.reject_=e,this.start_()}))}start_(){const t=this;function e(e,n){const r=t.resolve_,i=t.reject_,s=n.connection;if(n.wasSuccessCode)try{const e=t.callback_(s,s.getResponseText());void 0!==e?r(e):r()}catch(o){i(o)}else if(null!==s){const e=new wi("unknown","An unknown error occurred, please check the error payload for server response.");e.serverResponse=s.getResponseText(),t.errorCallback_?i(t.errorCallback_(s,e)):i(e)}else if(n.canceled){i(t.appDelete_?_i():new wi("canceled","User canceled the upload/download."))}else{i(new wi("retry-limit-exceeded","Max retry time for operation exceeded, please try again."))}}this.canceled_?e(0,new Ni(!1,null,!0)):this.backoffId_=function(t,e,n){let r=1,i=null,s=!1,o=0;function a(){return 2===o}let c=!1;function u(...t){c||(c=!0,e.apply(null,t))}function h(e){i=setTimeout((()=>{i=null,t(l,a())}),e)}function l(t,...e){if(c)return;if(t)return void u.call(null,t,...e);if(a()||s)return void u.call(null,t,...e);let n;r<64&&(r*=2),1===o?(o=2,n=0):n=1e3*(r+Math.random()),h(n)}let d=!1;function f(t){d||(d=!0,c||(null!==i?(t||(o=2),clearTimeout(i),h(0)):t||(o=1)))}return h(0),setTimeout((()=>{s=!0,f(!0)}),n),f}((function(e,n){if(n)return void e(!1,new Ni(!1,null,!0));const r=t.pool_.createConnection();function i(e){const n=e.loaded,r=e.lengthComputable?e.total:-1;null!==t.progressCallback_&&t.progressCallback_(n,r)}t.pendingConnection_=r,null!==t.progressCallback_&&r.addUploadProgressListener(i),r.send(t.url_,t.method_,t.body_,t.headers_).then((()=>{null!==t.progressCallback_&&r.removeUploadProgressListener(i),t.pendingConnection_=null;const n=r.getErrorCode()===yi.NO_ERROR,s=r.getStatus();if(!n||t.isRetryStatusCode_(s)){const t=r.getErrorCode()===yi.ABORT;return void e(!1,new Ni(!1,null,t))}const o=-1!==t.successCodes_.indexOf(s);e(!0,new Ni(o,r))}))}),e,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}isRetryStatusCode_(t){const e=t>=500&&t<600,n=-1!==[408,429].indexOf(t),r=-1!==this.additionalRetryCodes_.indexOf(t);return e||n||r}}class Ni{constructor(t,e,n){this.wasSuccessCode=t,this.connection=e,this.canceled=!!n}}function Di(t,e,n,r,i,s){const o=function(t){const e=encodeURIComponent;let n="?";for(const r in t)t.hasOwnProperty(r)&&(n=n+(e(r)+"=")+e(t[r])+"&");return n=n.slice(0,-1),n}(t.urlParams),a=t.url+o,c=Object.assign({},t.headers);return function(t,e){e&&(t["X-Firebase-GMPID"]=e)}(c,e),function(t,e){null!==e&&e.length>0&&(t.Authorization="Firebase "+e)}(c,n),function(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(null!=e?e:"AppManager")}(c,s),function(t,e){null!==e&&(t["X-Firebase-AppCheck"]=e)}(c,r),new Ri(a,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class xi{constructor(t,e){this._service=t,this._location=e instanceof ki?e:ki.makeFromUrl(e,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,e){return new xi(t,e)}get root(){const t=new ki(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return function(t){const e=t.lastIndexOf("/",t.length-2);return-1===e?t:t.slice(e+1)}(this._location.path)}get storage(){return this._service}get parent(){const t=function(t){if(0===t.length)return null;const e=t.lastIndexOf("/");return-1===e?"":t.slice(0,e)}(this._location.path);if(null===t)return null;const e=new ki(this._location.bucket,t);return new xi(this._service,e)}_throwIfRoot(t){if(""===this._location.path)throw function(t){return new wi("invalid-root-operation","The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(t)}}function Oi(t,e){const n=null==e?void 0:e.storageBucket;return null==n?null:ki.makeFromBucketSpec(n,t)}class Li{constructor(t,e,n,r,i,s){this.app=t,this._authProvider=e,this._appCheckProvider=n,this._pool=r,this._url=i,this._firebaseVersion=s,this._bucket=null,this._host="firebasestorage.googleapis.com",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=i?ki.makeFromBucketSpec(i,this._host):Oi(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,null!=this._url?this._bucket=ki.makeFromBucketSpec(this._url,t):this._bucket=Oi(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){Ai("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){Ai("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){const t=this._authProvider.getImmediate({optional:!0});if(t){const e=await t.getToken();if(null!==e)return e.accessToken}return null}async _getAppCheckToken(){const t=this._appCheckProvider.getImmediate({optional:!0});if(t){return(await t.getToken()).token}return null}_delete(){return this._deleted=!0,this._requests.forEach((t=>t.cancel())),this._requests.clear(),Promise.resolve()}_makeStorageReference(t){return new xi(this,t)}_makeRequest(t,e,n){if(this._deleted)return new Ci(_i());{const r=Di(t,this._appId,e,n,this._pool,this._firebaseVersion);return this._requests.add(r),r.getPromise().then((()=>this._requests.delete(r)),(()=>this._requests.delete(r))),r}}async makeRequestWithTokens(t){const[e,n]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,e,n)}}function Pi(t=He(),e){return Be(t=_e(t),"storage-exp").getImmediate({identifier:e})}function Mi(t,{instanceIdentifier:e}){const n=t.getProvider("app-exp").getImmediate(),r=t.getProvider("auth-internal"),i=t.getProvider("app-check-internal");return new Li(n,r,i,new Si,e,"9.0.0-beta.7")}qe(new Te("storage-exp",Mi,"PUBLIC").setMultipleInstances(!0)),We("@firebase/storage","0.0.900-exp.6ef484a04");
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Ui=function(t,e){return(Ui=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};function Fi(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}var Vi,ji="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},qi=qi||{},Bi=ji||self;function $i(){}function zi(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function Ki(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}var Hi="closure_uid_"+(1e9*Math.random()>>>0),Gi=0;function Wi(t,e,n){return t.call.apply(t.bind,arguments)}function Qi(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function Xi(t,e,n){return(Xi=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?Wi:Qi).apply(null,arguments)}function Yi(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function Ji(t,e){function n(){}n.prototype=e.prototype,t.Z=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Vb=function(t,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return e.prototype[n].apply(t,i)}}function Zi(){this.s=this.s,this.o=this.o}var ts={};Zi.prototype.s=!1,Zi.prototype.na=function(){if(!this.s&&(this.s=!0,this.M(),0)){var t=function(t){return Object.prototype.hasOwnProperty.call(t,Hi)&&t[Hi]||(t[Hi]=++Gi)}(this);delete ts[t]}},Zi.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};var es=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if("string"==typeof t)return"string"!=typeof e||1!=e.length?-1:t.indexOf(e,0);for(var n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1},ns=Array.prototype.forEach?function(t,e,n){Array.prototype.forEach.call(t,e,n)}:function(t,e,n){for(var r=t.length,i="string"==typeof t?t.split(""):t,s=0;s<r;s++)s in i&&e.call(n,i[s],s,t)};function rs(t){return Array.prototype.concat.apply([],arguments)}function is(t){var e=t.length;if(0<e){for(var n=Array(e),r=0;r<e;r++)n[r]=t[r];return n}return[]}function ss(t){return/^[\s\xa0]*$/.test(t)}var os,as=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function cs(t,e){return-1!=t.indexOf(e)}function us(t,e){return t<e?-1:t>e?1:0}t:{var hs=Bi.navigator;if(hs){var ls=hs.userAgent;if(ls){os=ls;break t}}os=""}function ds(t,e,n){for(var r in t)e.call(n,t[r],r,t)}function fs(t){var e={};for(var n in t)e[n]=t[n];return e}var ps="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function gs(t,e){for(var n,r,i=1;i<arguments.length;i++){for(n in r=arguments[i])t[n]=r[n];for(var s=0;s<ps.length;s++)n=ps[s],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function ms(t){return ms[" "](t),t}ms[" "]=$i;var ys,vs,ws=cs(os,"Opera"),bs=cs(os,"Trident")||cs(os,"MSIE"),Is=cs(os,"Edge"),_s=Is||bs,Ts=cs(os,"Gecko")&&!(cs(os.toLowerCase(),"webkit")&&!cs(os,"Edge"))&&!(cs(os,"Trident")||cs(os,"MSIE"))&&!cs(os,"Edge"),Es=cs(os.toLowerCase(),"webkit")&&!cs(os,"Edge");function Ss(){var t=Bi.document;return t?t.documentMode:void 0}t:{var ks="",Cs=(vs=os,Ts?/rv:([^\);]+)(\)|;)/.exec(vs):Is?/Edge\/([\d\.]+)/.exec(vs):bs?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(vs):Es?/WebKit\/(\S+)/.exec(vs):ws?/(?:Version)[ \/]?(\S+)/.exec(vs):void 0);if(Cs&&(ks=Cs?Cs[1]:""),bs){var As=Ss();if(null!=As&&As>parseFloat(ks)){ys=String(As);break t}}ys=ks}var Rs,Ns={};function Ds(){return function(t){var e=Ns;return Object.prototype.hasOwnProperty.call(e,9)?e[9]:e[9]=t(9)}((function(){for(var t=0,e=as(String(ys)).split("."),n=as("9").split("."),r=Math.max(e.length,n.length),i=0;0==t&&i<r;i++){var s=e[i]||"",o=n[i]||"";do{if(s=/(\d*)(\D*)(.*)/.exec(s)||["","","",""],o=/(\d*)(\D*)(.*)/.exec(o)||["","","",""],0==s[0].length&&0==o[0].length)break;t=us(0==s[1].length?0:parseInt(s[1],10),0==o[1].length?0:parseInt(o[1],10))||us(0==s[2].length,0==o[2].length)||us(s[2],o[2]),s=s[3],o=o[3]}while(0==t)}return 0<=t}))}if(Bi.document&&bs){var xs=Ss();Rs=xs||(parseInt(ys,10)||void 0)}else Rs=void 0;var Os=Rs,Ls=function(){if(!Bi.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{Bi.addEventListener("test",$i,e),Bi.removeEventListener("test",$i,e)}catch(n){}return t}();function Ps(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}function Ms(t,e){if(Ps.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(Ts){t:{try{ms(e.nodeName);var i=!0;break t}catch(s){}i=!1}i||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:Us[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&Ms.Z.h.call(this)}}Ps.prototype.h=function(){this.defaultPrevented=!0},Ji(Ms,Ps);var Us={2:"touch",3:"pen",4:"mouse"};Ms.prototype.h=function(){Ms.Z.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var Fs="closure_listenable_"+(1e6*Math.random()|0),Vs=0;function js(t,e,n,r,i){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.ia=i,this.key=++Vs,this.ca=this.fa=!1}function qs(t){t.ca=!0,t.listener=null,t.proxy=null,t.src=null,t.ia=null}function Bs(t){this.src=t,this.g={},this.h=0}function $s(t,e){var n=e.type;if(n in t.g){var r,i=t.g[n],s=es(i,e);(r=0<=s)&&Array.prototype.splice.call(i,s,1),r&&(qs(e),0==t.g[n].length&&(delete t.g[n],t.h--))}}function zs(t,e,n,r){for(var i=0;i<t.length;++i){var s=t[i];if(!s.ca&&s.listener==e&&s.capture==!!n&&s.ia==r)return i}return-1}Bs.prototype.add=function(t,e,n,r,i){var s=t.toString();(t=this.g[s])||(t=this.g[s]=[],this.h++);var o=zs(t,e,r,i);return-1<o?(e=t[o],n||(e.fa=!1)):((e=new js(e,this.src,s,!!r,i)).fa=n,t.push(e)),e};var Ks="closure_lm_"+(1e6*Math.random()|0),Hs={};function Gs(t,e,n,r,i){if(r&&r.once)return Qs(t,e,n,r,i);if(Array.isArray(e)){for(var s=0;s<e.length;s++)Gs(t,e[s],n,r,i);return null}return n=no(n),t&&t[Fs]?t.N(e,n,Ki(r)?!!r.capture:!!r,i):Ws(t,e,n,!1,r,i)}function Ws(t,e,n,r,i,s){if(!e)throw Error("Invalid event type");var o=Ki(i)?!!i.capture:!!i,a=to(t);if(a||(t[Ks]=a=new Bs(t)),(n=a.add(e,n,r,o,s)).proxy)return n;if(r=function(){function t(n){return e.call(t.src,t.listener,n)}var e=Zs;return t}(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)Ls||(i=o),void 0===i&&(i=!1),t.addEventListener(e.toString(),r,i);else if(t.attachEvent)t.attachEvent(Js(e.toString()),r);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(r)}return n}function Qs(t,e,n,r,i){if(Array.isArray(e)){for(var s=0;s<e.length;s++)Qs(t,e[s],n,r,i);return null}return n=no(n),t&&t[Fs]?t.O(e,n,Ki(r)?!!r.capture:!!r,i):Ws(t,e,n,!0,r,i)}function Xs(t,e,n,r,i){if(Array.isArray(e))for(var s=0;s<e.length;s++)Xs(t,e[s],n,r,i);else r=Ki(r)?!!r.capture:!!r,n=no(n),t&&t[Fs]?(t=t.i,(e=String(e).toString())in t.g&&(-1<(n=zs(s=t.g[e],n,r,i))&&(qs(s[n]),Array.prototype.splice.call(s,n,1),0==s.length&&(delete t.g[e],t.h--)))):t&&(t=to(t))&&(e=t.g[e.toString()],t=-1,e&&(t=zs(e,n,r,i)),(n=-1<t?e[t]:null)&&Ys(n))}function Ys(t){if("number"!=typeof t&&t&&!t.ca){var e=t.src;if(e&&e[Fs])$s(e.i,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(Js(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=to(e))?($s(n,t),0==n.h&&(n.src=null,e[Ks]=null)):qs(t)}}}function Js(t){return t in Hs?Hs[t]:Hs[t]="on"+t}function Zs(t,e){if(t.ca)t=!0;else{e=new Ms(e,this);var n=t.listener,r=t.ia||t.src;t.fa&&Ys(t),t=n.call(r,e)}return t}function to(t){return(t=t[Ks])instanceof Bs?t:null}var eo="__closure_events_fn_"+(1e9*Math.random()>>>0);function no(t){return"function"==typeof t?t:(t[eo]||(t[eo]=function(e){return t.handleEvent(e)}),t[eo])}function ro(){Zi.call(this),this.i=new Bs(this),this.P=this,this.I=null}function io(t,e){var n,r=t.I;if(r)for(n=[];r;r=r.I)n.push(r);if(t=t.P,r=e.type||e,"string"==typeof e)e=new Ps(e,t);else if(e instanceof Ps)e.target=e.target||t;else{var i=e;gs(e=new Ps(r,t),i)}if(i=!0,n)for(var s=n.length-1;0<=s;s--){var o=e.g=n[s];i=so(o,r,!0,e)&&i}if(i=so(o=e.g=t,r,!0,e)&&i,i=so(o,r,!1,e)&&i,n)for(s=0;s<n.length;s++)i=so(o=e.g=n[s],r,!1,e)&&i}function so(t,e,n,r){if(!(e=t.i.g[String(e)]))return!0;e=e.concat();for(var i=!0,s=0;s<e.length;++s){var o=e[s];if(o&&!o.ca&&o.capture==n){var a=o.listener,c=o.ia||o.src;o.fa&&$s(t.i,o),i=!1!==a.call(c,r)&&i}}return i&&!r.defaultPrevented}Ji(ro,Zi),ro.prototype[Fs]=!0,ro.prototype.removeEventListener=function(t,e,n,r){Xs(this,t,e,n,r)},ro.prototype.M=function(){if(ro.Z.M.call(this),this.i){var t,e=this.i;for(t in e.g){for(var n=e.g[t],r=0;r<n.length;r++)qs(n[r]);delete e.g[t],e.h--}}this.I=null},ro.prototype.N=function(t,e,n,r){return this.i.add(String(t),e,!1,n,r)},ro.prototype.O=function(t,e,n,r){return this.i.add(String(t),e,!0,n,r)};var oo=Bi.JSON.stringify;function ao(){var t=mo,e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}var co,uo=function(){function t(){this.h=this.g=null}return t.prototype.add=function(t,e){var n=ho.get();n.set(t,e),this.h?this.h.next=n:this.g=n,this.h=n},t}(),ho=new(function(){function t(t,e){this.i=t,this.j=e,this.h=0,this.g=null}return t.prototype.get=function(){var t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t},t}())((function(){return new lo}),(function(t){return t.reset()})),lo=function(){function t(){this.next=this.g=this.h=null}return t.prototype.set=function(t,e){this.h=t,this.g=e,this.next=null},t.prototype.reset=function(){this.next=this.g=this.h=null},t}();function fo(t){Bi.setTimeout((function(){throw t}),0)}function po(t,e){co||function(){var t=Bi.Promise.resolve(void 0);co=function(){t.then(yo)}}(),go||(co(),go=!0),mo.add(t,e)}var go=!1,mo=new uo;function yo(){for(var t;t=ao();){try{t.h.call(t.g)}catch(n){fo(n)}var e=ho;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}go=!1}function vo(t,e){ro.call(this),this.h=t||1,this.g=e||Bi,this.j=Xi(this.kb,this),this.l=Date.now()}function wo(t){t.da=!1,t.S&&(t.g.clearTimeout(t.S),t.S=null)}function bo(t,e,n){if("function"==typeof t)n&&(t=Xi(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=Xi(t.handleEvent,t)}return 2147483647<Number(e)?-1:Bi.setTimeout(t,e||0)}function Io(t){t.g=bo((function(){t.g=null,t.i&&(t.i=!1,Io(t))}),t.j);var e=t.h;t.h=null,t.m.apply(null,e)}Ji(vo,ro),(Vi=vo.prototype).da=!1,Vi.S=null,Vi.kb=function(){if(this.da){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.S=this.g.setTimeout(this.j,this.h-t):(this.S&&(this.g.clearTimeout(this.S),this.S=null),io(this,"tick"),this.da&&(wo(this),this.start()))}},Vi.start=function(){this.da=!0,this.S||(this.S=this.g.setTimeout(this.j,this.h),this.l=Date.now())},Vi.M=function(){vo.Z.M.call(this),wo(this),delete this.g};var _o=function(t){function e(e,n){var r=t.call(this)||this;return r.m=e,r.j=n,r.h=null,r.i=!1,r.g=null,r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}Ui(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e.prototype.l=function(t){this.h=arguments,this.g?this.i=!0:Io(this)},e.prototype.M=function(){t.prototype.M.call(this),this.g&&(Bi.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)},e}(Zi);function To(t){Zi.call(this),this.h=t,this.g={}}Ji(To,Zi);var Eo=[];function So(t,e,n,r){Array.isArray(n)||(n&&(Eo[0]=n.toString()),n=Eo);for(var i=0;i<n.length;i++){var s=Gs(e,n[i],r||t.handleEvent,!1,t.h||t);if(!s)break;t.g[s.key]=s}}function ko(t){ds(t.g,(function(t,e){this.g.hasOwnProperty(e)&&Ys(t)}),t),t.g={}}function Co(){this.g=!0}function Ao(t,e,n,r){t.info((function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(var o=1;o<i.length;o++)i[o]=""}}}return oo(n)}catch(a){return e}}(t,n)+(r?" "+r:"")}))}To.prototype.M=function(){To.Z.M.call(this),ko(this)},To.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},Co.prototype.Aa=function(){this.g=!1},Co.prototype.info=function(){};var Ro={},No=null;function Do(){return No=No||new ro}function xo(t){Ps.call(this,Ro.Ma,t)}function Oo(t){var e=Do();io(e,new xo(e,t))}function Lo(t,e){Ps.call(this,Ro.STAT_EVENT,t),this.stat=e}function Po(t){var e=Do();io(e,new Lo(e,t))}function Mo(t,e){Ps.call(this,Ro.Na,t),this.size=e}function Uo(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return Bi.setTimeout((function(){t()}),e)}Ro.Ma="serverreachability",Ji(xo,Ps),Ro.STAT_EVENT="statevent",Ji(Lo,Ps),Ro.Na="timingevent",Ji(Mo,Ps);var Fo={NO_ERROR:0,lb:1,yb:2,xb:3,sb:4,wb:5,zb:6,Ja:7,TIMEOUT:8,Cb:9},Vo={qb:"complete",Mb:"success",Ka:"error",Ja:"abort",Eb:"ready",Fb:"readystatechange",TIMEOUT:"timeout",Ab:"incrementaldata",Db:"progress",tb:"downloadprogress",Ub:"uploadprogress"};function jo(){}function qo(t){return t.h||(t.h=t.i())}function Bo(){}jo.prototype.h=null;var $o,zo={OPEN:"a",pb:"b",Ka:"c",Bb:"d"};function Ko(){Ps.call(this,"d")}function Ho(){Ps.call(this,"c")}function Go(){}function Wo(t,e,n,r){this.l=t,this.j=e,this.m=n,this.X=r||1,this.V=new To(this),this.P=Xo,t=_s?125:void 0,this.W=new vo(t),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.Y=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.N=-1,this.I=!1,this.O=0,this.L=null,this.aa=this.J=this.$=this.U=!1,this.h=new Qo}function Qo(){this.i=null,this.g="",this.h=!1}Ji(Ko,Ps),Ji(Ho,Ps),Ji(Go,jo),Go.prototype.g=function(){return new XMLHttpRequest},Go.prototype.i=function(){return{}},$o=new Go;var Xo=45e3,Yo={},Jo={};function Zo(t,e,n){t.K=1,t.v=_a(ma(e)),t.s=n,t.U=!0,ta(t,null)}function ta(t,e){t.F=Date.now(),ia(t),t.A=ma(t.v);var n=t.A,r=t.X;Array.isArray(r)||(r=[String(r)]),Pa(n.h,"t",r),t.C=0,n=t.l.H,t.h=new Qo,t.g=Mc(t.l,n?e:null,!t.s),0<t.O&&(t.L=new _o(Xi(t.Ia,t,t.g),t.O)),So(t.V,t.g,"readystatechange",t.gb),e=t.H?fs(t.H):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.s,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),Oo(1),function(t,e,n,r,i,s){t.info((function(){if(t.g)if(s)for(var o="",a=s.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var h=u[0];u=u[1];var l=h.split("_");o=2<=l.length&&"type"==l[1]?o+(h+"=")+u+"&":o+(h+"=redacted&")}}else o=null;else o=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+e+"\n"+n+"\n"+o}))}(t.j,t.u,t.A,t.m,t.X,t.s)}function ea(t){return!!t.g&&("GET"==t.u&&2!=t.K&&t.l.Ba)}function na(t,e,n){for(var r,i=!0;!t.I&&t.C<n.length;){if((r=ra(t,n))==Jo){4==e&&(t.o=4,Po(14),i=!1),Ao(t.j,t.m,null,"[Incomplete Response]");break}if(r==Yo){t.o=4,Po(15),Ao(t.j,t.m,n,"[Invalid Chunk]"),i=!1;break}Ao(t.j,t.m,r,null),ua(t,r)}ea(t)&&r!=Jo&&r!=Yo&&(t.h.g="",t.C=0),4!=e||0!=n.length||t.h.h||(t.o=1,Po(16),i=!1),t.i=t.i&&i,i?0<n.length&&!t.aa&&(t.aa=!0,(e=t.l).g==t&&e.$&&!e.L&&(e.h.info("Great, no buffering proxy detected. Bytes received: "+n.length),Ac(e),e.L=!0,Po(11))):(Ao(t.j,t.m,n,"[Invalid Chunked Response]"),ca(t),aa(t))}function ra(t,e){var n=t.C,r=e.indexOf("\n",n);return-1==r?Jo:(n=Number(e.substring(n,r)),isNaN(n)?Yo:(r+=1)+n>e.length?Jo:(e=e.substr(r,n),t.C=r+n,e))}function ia(t){t.Y=Date.now()+t.P,sa(t,t.P)}function sa(t,e){if(null!=t.B)throw Error("WatchDog timer not null");t.B=Uo(Xi(t.eb,t),e)}function oa(t){t.B&&(Bi.clearTimeout(t.B),t.B=null)}function aa(t){0==t.l.G||t.I||Dc(t.l,t)}function ca(t){oa(t);var e=t.L;e&&"function"==typeof e.na&&e.na(),t.L=null,wo(t.W),ko(t.V),t.g&&(e=t.g,t.g=null,e.abort(),e.na())}function ua(t,e){try{var n=t.l;if(0!=n.G&&(n.g==t||Ba(n.i,t)))if(n.I=t.N,!t.J&&Ba(n.i,t)&&3==n.G){try{var r=n.Ca.g.parse(e)}catch(m){r=null}if(Array.isArray(r)&&3==r.length){var i=r;if(0==i[0]){t:if(!n.u){if(n.g){if(!(n.g.F+3e3<t.F))break t;Nc(n),wc(n)}Cc(n),Po(18)}}else n.ta=i[1],0<n.ta-n.U&&37500>i[2]&&n.N&&0==n.A&&!n.v&&(n.v=Uo(Xi(n.ab,n),6e3));if(1>=qa(n.i)&&n.ka){try{n.ka()}catch(m){}n.ka=void 0}}else Oc(n,11)}else if((t.J||n.g==t)&&Nc(n),!ss(e))for(i=n.Ca.g.parse(e),e=0;e<i.length;e++){var s=i[e];if(n.U=s[0],s=s[1],2==n.G)if("c"==s[0]){n.J=s[1],n.la=s[2];var o=s[3];null!=o&&(n.ma=o,n.h.info("VER="+n.ma));var a=s[4];null!=a&&(n.za=a,n.h.info("SVER="+n.za));var c=s[5];null!=c&&"number"==typeof c&&0<c&&(r=1.5*c,n.K=r,n.h.info("backChannelRequestTimeoutMs_="+r)),r=n;var u=t.g;if(u){var h=u.g?u.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(h){var l=r.i;!l.g&&(cs(h,"spdy")||cs(h,"quic")||cs(h,"h2"))&&(l.j=l.l,l.g=new Set,l.h&&($a(l,l.h),l.h=null))}if(r.D){var d=u.g?u.g.getResponseHeader("X-HTTP-Session-Id"):null;d&&(r.sa=d,Ia(r.F,r.D,d))}}n.G=3,n.j&&n.j.xa(),n.$&&(n.O=Date.now()-t.F,n.h.info("Handshake RTT: "+n.O+"ms"));var f=t;if((r=n).oa=Pc(r,r.H?r.la:null,r.W),f.J){za(r.i,f);var p=f,g=r.K;g&&p.setTimeout(g),p.B&&(oa(p),ia(p)),r.g=f}else kc(r);0<n.l.length&&_c(n)}else"stop"!=s[0]&&"close"!=s[0]||Oc(n,7);else 3==n.G&&("stop"==s[0]||"close"==s[0]?"stop"==s[0]?Oc(n,7):vc(n):"noop"!=s[0]&&n.j&&n.j.wa(s),n.A=0)}Oo(4)}catch(m){}}function ha(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(zi(t)||"string"==typeof t)ns(t,e,void 0);else{if(t.T&&"function"==typeof t.T)var n=t.T();else if(t.R&&"function"==typeof t.R)n=void 0;else if(zi(t)||"string"==typeof t){n=[];for(var r=t.length,i=0;i<r;i++)n.push(i)}else for(i in n=[],r=0,t)n[r++]=i;i=(r=function(t){if(t.R&&"function"==typeof t.R)return t.R();if("string"==typeof t)return t.split("");if(zi(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}for(r in e=[],n=0,t)e[n++]=t[r];return e}(t)).length;for(var s=0;s<i;s++)e.call(void 0,r[s],n&&n[s],t)}}function la(t,e){this.h={},this.g=[],this.i=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var r=0;r<n;r+=2)this.set(arguments[r],arguments[r+1])}else if(t)if(t instanceof la)for(n=t.T(),r=0;r<n.length;r++)this.set(n[r],t.get(n[r]));else for(r in t)this.set(r,t[r])}function da(t){if(t.i!=t.g.length){for(var e=0,n=0;e<t.g.length;){var r=t.g[e];fa(t.h,r)&&(t.g[n++]=r),e++}t.g.length=n}if(t.i!=t.g.length){var i={};for(n=e=0;e<t.g.length;)fa(i,r=t.g[e])||(t.g[n++]=r,i[r]=1),e++;t.g.length=n}}function fa(t,e){return Object.prototype.hasOwnProperty.call(t,e)}(Vi=Wo.prototype).setTimeout=function(t){this.P=t},Vi.gb=function(t){t=t.target;var e=this.L;e&&3==fc(t)?e.l():this.Ia(t)},Vi.Ia=function(t){try{if(t==this.g)t:{var e=fc(this.g),n=this.g.Da(),r=this.g.ba();if(!(3>e)&&(3!=e||_s||this.g&&(this.h.h||this.g.ga()||pc(this.g)))){this.I||4!=e||7==n||Oo(8==n||0>=r?3:2),oa(this);var i=this.g.ba();this.N=i;e:if(ea(this)){var s=pc(this.g);t="";var o=s.length,a=4==fc(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){ca(this),aa(this);var c="";break e}this.h.i=new Bi.TextDecoder}for(n=0;n<o;n++)this.h.h=!0,t+=this.h.i.decode(s[n],{stream:a&&n==o-1});s.splice(0,o),this.h.g+=t,this.C=0,c=this.h.g}else c=this.g.ga();if(this.i=200==i,function(t,e,n,r,i,s,o){t.info((function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+e+"\n"+n+"\n"+s+" "+o}))}(this.j,this.u,this.A,this.m,this.X,e,i),this.i){if(this.$&&!this.J){e:{if(this.g){var u,h=this.g;if((u=h.g?h.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!ss(u)){var l=u;break e}}l=null}if(!(i=l)){this.i=!1,this.o=3,Po(12),ca(this),aa(this);break t}Ao(this.j,this.m,i,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,ua(this,i)}this.U?(na(this,e,c),_s&&this.i&&3==e&&(So(this.V,this.W,"tick",this.fb),this.W.start())):(Ao(this.j,this.m,c,null),ua(this,c)),4==e&&ca(this),this.i&&!this.I&&(4==e?Dc(this.l,this):(this.i=!1,ia(this)))}else 400==i&&0<c.indexOf("Unknown SID")?(this.o=3,Po(12)):(this.o=0,Po(13)),ca(this),aa(this)}}}catch(d){}},Vi.fb=function(){if(this.g){var t=fc(this.g),e=this.g.ga();this.C<e.length&&(oa(this),na(this,t,e),this.i&&4!=t&&ia(this))}},Vi.cancel=function(){this.I=!0,ca(this)},Vi.eb=function(){this.B=null;var t=Date.now();0<=t-this.Y?(function(t,e){t.info((function(){return"TIMEOUT: "+e}))}(this.j,this.A),2!=this.K&&(Oo(3),Po(17)),ca(this),this.o=2,aa(this)):sa(this,this.Y-t)},(Vi=la.prototype).R=function(){da(this);for(var t=[],e=0;e<this.g.length;e++)t.push(this.h[this.g[e]]);return t},Vi.T=function(){return da(this),this.g.concat()},Vi.get=function(t,e){return fa(this.h,t)?this.h[t]:e},Vi.set=function(t,e){fa(this.h,t)||(this.i++,this.g.push(t)),this.h[t]=e},Vi.forEach=function(t,e){for(var n=this.T(),r=0;r<n.length;r++){var i=n[r],s=this.get(i);t.call(e,s,i,this)}};var pa=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function ga(t,e){if(this.i=this.s=this.j="",this.m=null,this.o=this.l="",this.g=!1,t instanceof ga){this.g=void 0!==e?e:t.g,ya(this,t.j),this.s=t.s,va(this,t.i),wa(this,t.m),this.l=t.l,e=t.h;var n=new Da;n.i=e.i,e.g&&(n.g=new la(e.g),n.h=e.h),ba(this,n),this.o=t.o}else t&&(n=String(t).match(pa))?(this.g=!!e,ya(this,n[1]||"",!0),this.s=Ta(n[2]||""),va(this,n[3]||"",!0),wa(this,n[4]),this.l=Ta(n[5]||"",!0),ba(this,n[6]||"",!0),this.o=Ta(n[7]||"")):(this.g=!!e,this.h=new Da(null,this.g))}function ma(t){return new ga(t)}function ya(t,e,n){t.j=n?Ta(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function va(t,e,n){t.i=n?Ta(e,!0):e}function wa(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function ba(t,e,n){e instanceof Da?(t.h=e,function(t,e){e&&!t.j&&(xa(t),t.i=null,t.g.forEach((function(t,e){var n=e.toLowerCase();e!=n&&(Oa(this,e),Pa(this,n,t))}),t)),t.j=e}(t.h,t.g)):(n||(e=Ea(e,Ra)),t.h=new Da(e,t.g))}function Ia(t,e,n){t.h.set(e,n)}function _a(t){return Ia(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function Ta(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function Ea(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,Sa),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function Sa(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}ga.prototype.toString=function(){var t=[],e=this.j;e&&t.push(Ea(e,ka,!0),":");var n=this.i;return(n||"file"==e)&&(t.push("//"),(e=this.s)&&t.push(Ea(e,ka,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.m)&&t.push(":",String(n))),(n=this.l)&&(this.i&&"/"!=n.charAt(0)&&t.push("/"),t.push(Ea(n,"/"==n.charAt(0)?Aa:Ca,!0))),(n=this.h.toString())&&t.push("?",n),(n=this.o)&&t.push("#",Ea(n,Na)),t.join("")};var ka=/[#\/\?@]/g,Ca=/[#\?:]/g,Aa=/[#\?]/g,Ra=/[#\?@]/g,Na=/#/g;function Da(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function xa(t){t.g||(t.g=new la,t.h=0,t.i&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),i=null;if(0<=r){var s=t[n].substring(0,r);i=t[n].substring(r+1)}else s=t[n];e(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(t.i,(function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)})))}function Oa(t,e){xa(t),e=Ma(t,e),fa(t.g.h,e)&&(t.i=null,t.h-=t.g.get(e).length,fa((t=t.g).h,e)&&(delete t.h[e],t.i--,t.g.length>2*t.i&&da(t)))}function La(t,e){return xa(t),e=Ma(t,e),fa(t.g.h,e)}function Pa(t,e,n){Oa(t,e),0<n.length&&(t.i=null,t.g.set(Ma(t,e),is(n)),t.h+=n.length)}function Ma(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}(Vi=Da.prototype).add=function(t,e){xa(this),this.i=null,t=Ma(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this},Vi.forEach=function(t,e){xa(this),this.g.forEach((function(n,r){ns(n,(function(n){t.call(e,n,r,this)}),this)}),this)},Vi.T=function(){xa(this);for(var t=this.g.R(),e=this.g.T(),n=[],r=0;r<e.length;r++)for(var i=t[r],s=0;s<i.length;s++)n.push(e[r]);return n},Vi.R=function(t){xa(this);var e=[];if("string"==typeof t)La(this,t)&&(e=rs(e,this.g.get(Ma(this,t))));else{t=this.g.R();for(var n=0;n<t.length;n++)e=rs(e,t[n])}return e},Vi.set=function(t,e){return xa(this),this.i=null,La(this,t=Ma(this,t))&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this},Vi.get=function(t,e){return t&&0<(t=this.R(t)).length?String(t[0]):e},Vi.toString=function(){if(this.i)return this.i;if(!this.g)return"";for(var t=[],e=this.g.T(),n=0;n<e.length;n++){var r=e[n],i=encodeURIComponent(String(r));r=this.R(r);for(var s=0;s<r.length;s++){var o=i;""!==r[s]&&(o+="="+encodeURIComponent(String(r[s]))),t.push(o)}}return this.i=t.join("&")};var Ua=function(t,e){this.h=t,this.g=e};function Fa(t){this.l=t||Va,Bi.PerformanceNavigationTiming?t=0<(t=Bi.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(Bi.g&&Bi.g.Ea&&Bi.g.Ea()&&Bi.g.Ea().Zb),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Va=10;function ja(t){return!!t.h||!!t.g&&t.g.size>=t.j}function qa(t){return t.h?1:t.g?t.g.size:0}function Ba(t,e){return t.h?t.h==e:!!t.g&&t.g.has(e)}function $a(t,e){t.g?t.g.add(e):t.h=e}function za(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}function Ka(t){var e,n;if(null!=t.h)return t.i.concat(t.h.D);if(null!=t.g&&0!==t.g.size){var r=t.i;try{for(var i=Fi(t.g.values()),s=i.next();!s.done;s=i.next()){var o=s.value;r=r.concat(o.D)}}catch(a){e={error:a}}finally{try{s&&!s.done&&(n=i.return)&&n.call(i)}finally{if(e)throw e.error}}return r}return is(t.i)}function Ha(){}function Ga(){this.g=new Ha}function Wa(t,e,n){var r=n||"";try{ha(t,(function(t,n){var i=t;Ki(t)&&(i=oo(t)),e.push(r+n+"="+encodeURIComponent(i))}))}catch(i){throw e.push(r+"type="+encodeURIComponent("_badmap")),i}}function Qa(t,e,n,r,i){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,i(r)}catch(s){}}function Xa(t){this.l=t.$b||null,this.j=t.ib||!1}function Ya(t,e){ro.call(this),this.D=t,this.u=e,this.m=void 0,this.readyState=Ja,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}Fa.prototype.cancel=function(){var t,e;if(this.i=Ka(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){try{for(var n=Fi(this.g.values()),r=n.next();!r.done;r=n.next()){r.value.cancel()}}catch(i){t={error:i}}finally{try{r&&!r.done&&(e=n.return)&&e.call(n)}finally{if(t)throw t.error}}this.g.clear()}},Ha.prototype.stringify=function(t){return Bi.JSON.stringify(t,void 0)},Ha.prototype.parse=function(t){return Bi.JSON.parse(t,void 0)},Ji(Xa,jo),Xa.prototype.g=function(){return new Ya(this.l,this.j)},Xa.prototype.i=function(t){return function(){return t}}({}),Ji(Ya,ro);var Ja=0;function Za(t){t.j.read().then(t.Sa.bind(t)).catch(t.ha.bind(t))}function tc(t){t.readyState=4,t.l=null,t.j=null,t.A=null,ec(t)}function ec(t){t.onreadystatechange&&t.onreadystatechange.call(t)}(Vi=Ya.prototype).open=function(t,e){if(this.readyState!=Ja)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,ec(this)},Vi.send=function(t){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;var e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||Bi).fetch(new Request(this.B,e)).then(this.Va.bind(this),this.ha.bind(this))},Vi.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted."),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,tc(this)),this.readyState=Ja},Vi.Va=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,ec(this)),this.g&&(this.readyState=3,ec(this),this.g)))if("arraybuffer"===this.responseType)t.arrayBuffer().then(this.Ta.bind(this),this.ha.bind(this));else if(void 0!==Bi.ReadableStream&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;Za(this)}else t.text().then(this.Ua.bind(this),this.ha.bind(this))},Vi.Sa=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?tc(this):ec(this),3==this.readyState&&Za(this)}},Vi.Ua=function(t){this.g&&(this.response=this.responseText=t,tc(this))},Vi.Ta=function(t){this.g&&(this.response=t,tc(this))},Vi.ha=function(){this.g&&tc(this)},Vi.setRequestHeader=function(t,e){this.v.append(t,e)},Vi.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},Vi.getAllResponseHeaders=function(){if(!this.h)return"";for(var t=[],e=this.h.entries(),n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join("\r\n")},Object.defineProperty(Ya.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(t){this.m=t?"include":"same-origin"}});var nc=Bi.JSON.parse;function rc(t){ro.call(this),this.headers=new la,this.u=t||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=ic,this.K=this.L=!1}Ji(rc,ro);var ic="",sc=/^https?$/i,oc=["POST","PUT"];function ac(t){return"content-type"==t.toLowerCase()}function cc(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,uc(t),lc(t)}function uc(t){t.D||(t.D=!0,io(t,"complete"),io(t,"error"))}function hc(t){if(t.h&&void 0!==qi&&(!t.C[1]||4!=fc(t)||2!=t.ba()))if(t.v&&4==fc(t))bo(t.Fa,0,t);else if(io(t,"readystatechange"),4==fc(t)){t.h=!1;try{var e,n=t.ba();t:switch(n){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var r=!0;break t;default:r=!1}if(!(e=r)){var i;if(i=0===n){var s=String(t.H).match(pa)[1]||null;if(!s&&Bi.self&&Bi.self.location){var o=Bi.self.location.protocol;s=o.substr(0,o.length-1)}i=!sc.test(s?s.toLowerCase():"")}e=i}if(e)io(t,"complete"),io(t,"success");else{t.m=6;try{var a=2<fc(t)?t.g.statusText:""}catch(c){a=""}t.j=a+" ["+t.ba()+"]",uc(t)}}finally{lc(t)}}}function lc(t,e){if(t.g){dc(t);var n=t.g,r=t.C[0]?$i:null;t.g=null,t.C=null,e||io(t,"ready");try{n.onreadystatechange=r}catch(i){}}}function dc(t){t.g&&t.K&&(t.g.ontimeout=null),t.A&&(Bi.clearTimeout(t.A),t.A=null)}function fc(t){return t.g?t.g.readyState:0}function pc(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.J){case ic:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch(e){return null}}function gc(t,e,n){t:{for(r in n){var r=!1;break t}r=!0}r||(n=function(t){var e="";return ds(t,(function(t,n){e+=n,e+=":",e+=t,e+="\r\n"})),e}(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):Ia(t,e,n))}function mc(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function yc(t){this.za=0,this.l=[],this.h=new Co,this.la=this.oa=this.F=this.W=this.g=this.sa=this.D=this.aa=this.o=this.P=this.s=null,this.Za=this.V=0,this.Xa=mc("failFast",!1,t),this.N=this.v=this.u=this.m=this.j=null,this.X=!0,this.I=this.ta=this.U=-1,this.Y=this.A=this.C=0,this.Pa=mc("baseRetryDelayMs",5e3,t),this.$a=mc("retryDelaySeedMs",1e4,t),this.Ya=mc("forwardChannelMaxRetries",2,t),this.ra=mc("forwardChannelRequestTimeoutMs",2e4,t),this.qa=t&&t.xmlHttpFactory||void 0,this.Ba=t&&t.Yb||!1,this.K=void 0,this.H=t&&t.supportsCrossDomainXhr||!1,this.J="",this.i=new Fa(t&&t.concurrentRequestLimit),this.Ca=new Ga,this.ja=t&&t.fastHandshake||!1,this.Ra=t&&t.Wb||!1,t&&t.Aa&&this.h.Aa(),t&&t.forceLongPolling&&(this.X=!1),this.$=!this.ja&&this.X&&t&&t.detectBufferingProxy||!1,this.ka=void 0,this.O=0,this.L=!1,this.B=null,this.Wa=!t||!1!==t.Xb}function vc(t){if(bc(t),3==t.G){var e=t.V++,n=ma(t.F);Ia(n,"SID",t.J),Ia(n,"RID",e),Ia(n,"TYPE","terminate"),Ec(t,n),(e=new Wo(t,t.h,e,void 0)).K=2,e.v=_a(ma(n)),n=!1,Bi.navigator&&Bi.navigator.sendBeacon&&(n=Bi.navigator.sendBeacon(e.v.toString(),"")),!n&&Bi.Image&&((new Image).src=e.v,n=!0),n||(e.g=Mc(e.l,null),e.g.ea(e.v)),e.F=Date.now(),ia(e)}Lc(t)}function wc(t){t.g&&(Ac(t),t.g.cancel(),t.g=null)}function bc(t){wc(t),t.u&&(Bi.clearTimeout(t.u),t.u=null),Nc(t),t.i.cancel(),t.m&&("number"==typeof t.m&&Bi.clearTimeout(t.m),t.m=null)}function Ic(t,e){t.l.push(new Ua(t.Za++,e)),3==t.G&&_c(t)}function _c(t){ja(t.i)||t.m||(t.m=!0,po(t.Ha,t),t.C=0)}function Tc(t,e){var n;n=e?e.m:t.V++;var r=ma(t.F);Ia(r,"SID",t.J),Ia(r,"RID",n),Ia(r,"AID",t.U),Ec(t,r),t.o&&t.s&&gc(r,t.o,t.s),n=new Wo(t,t.h,n,t.C+1),null===t.o&&(n.H=t.s),e&&(t.l=e.D.concat(t.l)),e=Sc(t,n,1e3),n.setTimeout(Math.round(.5*t.ra)+Math.round(.5*t.ra*Math.random())),$a(t.i,n),Zo(n,r,e)}function Ec(t,e){t.j&&ha({},(function(t,n){Ia(e,n,t)}))}function Sc(t,e,n){n=Math.min(t.l.length,n);var r=t.j?Xi(t.j.Oa,t.j,t):null;t:for(var i=t.l,s=-1;;){var o=["count="+n];-1==s?0<n?(s=i[0].h,o.push("ofs="+s)):s=0:o.push("ofs="+s);for(var a=!0,c=0;c<n;c++){var u=i[c].h,h=i[c].g;if(0>(u-=s))s=Math.max(0,i[c].h-100),a=!1;else try{Wa(h,o,"req"+u+"_")}catch(l){r&&r(h)}}if(a){r=o.join("&");break t}}return t=t.l.splice(0,n),e.D=t,r}function kc(t){t.g||t.u||(t.Y=1,po(t.Ga,t),t.A=0)}function Cc(t){return!(t.g||t.u||3<=t.A)&&(t.Y++,t.u=Uo(Xi(t.Ga,t),xc(t,t.A)),t.A++,!0)}function Ac(t){null!=t.B&&(Bi.clearTimeout(t.B),t.B=null)}function Rc(t){t.g=new Wo(t,t.h,"rpc",t.Y),null===t.o&&(t.g.H=t.s),t.g.O=0;var e=ma(t.oa);Ia(e,"RID","rpc"),Ia(e,"SID",t.J),Ia(e,"CI",t.N?"0":"1"),Ia(e,"AID",t.U),Ec(t,e),Ia(e,"TYPE","xmlhttp"),t.o&&t.s&&gc(e,t.o,t.s),t.K&&t.g.setTimeout(t.K);var n=t.g;t=t.la,n.K=1,n.v=_a(ma(e)),n.s=null,n.U=!0,ta(n,t)}function Nc(t){null!=t.v&&(Bi.clearTimeout(t.v),t.v=null)}function Dc(t,e){var n=null;if(t.g==e){Nc(t),Ac(t),t.g=null;var r=2}else{if(!Ba(t.i,e))return;n=e.D,za(t.i,e),r=1}if(t.I=e.N,0!=t.G)if(e.i)if(1==r){n=e.s?e.s.length:0,e=Date.now()-e.F;var i=t.C;io(r=Do(),new Mo(r,n,e,i)),_c(t)}else kc(t);else if(3==(i=e.o)||0==i&&0<t.I||!(1==r&&function(t,e){return!(qa(t.i)>=t.i.j-(t.m?1:0)||(t.m?(t.l=e.D.concat(t.l),0):1==t.G||2==t.G||t.C>=(t.Xa?0:t.Ya)||(t.m=Uo(Xi(t.Ha,t,e),xc(t,t.C)),t.C++,0)))}(t,e)||2==r&&Cc(t)))switch(n&&0<n.length&&(e=t.i,e.i=e.i.concat(n)),i){case 1:Oc(t,5);break;case 4:Oc(t,10);break;case 3:Oc(t,6);break;default:Oc(t,2)}}function xc(t,e){var n=t.Pa+Math.floor(Math.random()*t.$a);return t.j||(n*=2),n*e}function Oc(t,e){if(t.h.info("Error code "+e),2==e){var n=null;t.j&&(n=null);var r=Xi(t.jb,t);n||(n=new ga("//www.google.com/images/cleardot.gif"),Bi.location&&"http"==Bi.location.protocol||ya(n,"https"),_a(n)),function(t,e){var n=new Co;if(Bi.Image){var r=new Image;r.onload=Yi(Qa,n,r,"TestLoadImage: loaded",!0,e),r.onerror=Yi(Qa,n,r,"TestLoadImage: error",!1,e),r.onabort=Yi(Qa,n,r,"TestLoadImage: abort",!1,e),r.ontimeout=Yi(Qa,n,r,"TestLoadImage: timeout",!1,e),Bi.setTimeout((function(){r.ontimeout&&r.ontimeout()}),1e4),r.src=t}else e(!1)}(n.toString(),r)}else Po(2);t.G=0,t.j&&t.j.va(e),Lc(t),bc(t)}function Lc(t){t.G=0,t.I=-1,t.j&&(0==Ka(t.i).length&&0==t.l.length||(t.i.i.length=0,is(t.l),t.l.length=0),t.j.ua())}function Pc(t,e,n){var r=function(t){return t instanceof ga?ma(t):new ga(t,void 0)}(n);if(""!=r.i)e&&va(r,e+"."+r.i),wa(r,r.m);else{var i=Bi.location;r=function(t,e,n,r){var i=new ga(null,void 0);return t&&ya(i,t),e&&va(i,e),n&&wa(i,n),r&&(i.l=r),i}(i.protocol,e?e+"."+i.hostname:i.hostname,+i.port,n)}return t.aa&&ds(t.aa,(function(t,e){Ia(r,e,t)})),e=t.D,n=t.sa,e&&n&&Ia(r,e,n),Ia(r,"VER",t.ma),Ec(t,r),r}function Mc(t,e,n){if(e&&!t.H)throw Error("Can't create secondary domain capable XhrIo object.");return(e=n&&t.Ba&&!t.qa?new rc(new Xa({ib:!0})):new rc(t.qa)).L=t.H,e}function Uc(){}function Fc(){if(bs&&!(10<=Number(Os)))throw Error("Environmental error: no available transport.")}function Vc(t,e){ro.call(this),this.g=new yc(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.ya&&(t?t["X-WebChannel-Client-Profile"]=e.ya:t={"X-WebChannel-Client-Profile":e.ya}),this.g.P=t,(t=e&&e.httpHeadersOverwriteParam)&&!ss(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!ss(e)&&(this.g.D=e,null!==(t=this.h)&&e in t&&(e in(t=this.h)&&delete t[e])),this.j=new Bc(this)}function jc(t){Ko.call(this);var e=t.__sm__;if(e){t:{for(var n in e){t=n;break t}t=void 0}(this.i=t)&&(t=this.i,e=null!==e&&t in e?e[t]:void 0),this.data=e}else this.data=t}function qc(){Ho.call(this),this.status=1}function Bc(t){this.g=t}(Vi=rc.prototype).ea=function(t,e,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+t);e=e?e.toUpperCase():"GET",this.H=t,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():$o.g(),this.C=this.u?qo(this.u):qo($o),this.g.onreadystatechange=Xi(this.Fa,this);try{this.F=!0,this.g.open(e,String(t),!0),this.F=!1}catch(s){return void cc(this,s)}t=n||"";var i=new la(this.headers);r&&ha(r,(function(t,e){i.set(e,t)})),r=function(t){t:{for(var e=ac,n=t.length,r="string"==typeof t?t.split(""):t,i=0;i<n;i++)if(i in r&&e.call(void 0,r[i],i,t)){e=i;break t}e=-1}return 0>e?null:"string"==typeof t?t.charAt(e):t[e]}(i.T()),n=Bi.FormData&&t instanceof Bi.FormData,!(0<=es(oc,e))||r||n||i.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),i.forEach((function(t,e){this.g.setRequestHeader(e,t)}),this),this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{dc(this),0<this.B&&((this.K=function(t){return bs&&Ds()&&"number"==typeof t.timeout&&void 0!==t.ontimeout}(this.g))?(this.g.timeout=this.B,this.g.ontimeout=Xi(this.pa,this)):this.A=bo(this.pa,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(s){cc(this,s)}},Vi.pa=function(){void 0!==qi&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,io(this,"timeout"),this.abort(8))},Vi.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,io(this,"complete"),io(this,"abort"),lc(this))},Vi.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),lc(this,!0)),rc.Z.M.call(this)},Vi.Fa=function(){this.s||(this.F||this.v||this.l?hc(this):this.cb())},Vi.cb=function(){hc(this)},Vi.ba=function(){try{return 2<fc(this)?this.g.status:-1}catch(vs){return-1}},Vi.ga=function(){try{return this.g?this.g.responseText:""}catch(vs){return""}},Vi.Qa=function(t){if(this.g){var e=this.g.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),nc(e)}},Vi.Da=function(){return this.m},Vi.La=function(){return"string"==typeof this.j?this.j:String(this.j)},(Vi=yc.prototype).ma=8,Vi.G=1,Vi.hb=function(t){try{this.h.info("Origin Trials invoked: "+t)}catch(e){}},Vi.Ha=function(t){if(this.m)if(this.m=null,1==this.G){if(!t){this.V=Math.floor(1e5*Math.random()),t=this.V++;var e=new Wo(this,this.h,t,void 0),n=this.s;if(this.P&&(n?gs(n=fs(n),this.P):n=this.P),null===this.o&&(e.H=n),this.ja)t:{for(var r=0,i=0;i<this.l.length;i++){var s=this.l[i];if(void 0===(s="__data__"in s.g&&"string"==typeof(s=s.g.__data__)?s.length:void 0))break;if(4096<(r+=s)){r=i;break t}if(4096===r||i===this.l.length-1){r=i+1;break t}}r=1e3}else r=1e3;r=Sc(this,e,r),Ia(i=ma(this.F),"RID",t),Ia(i,"CVER",22),this.D&&Ia(i,"X-HTTP-Session-Id",this.D),Ec(this,i),this.o&&n&&gc(i,this.o,n),$a(this.i,e),this.Ra&&Ia(i,"TYPE","init"),this.ja?(Ia(i,"$req",r),Ia(i,"SID","null"),e.$=!0,Zo(e,i,null)):Zo(e,i,r),this.G=2}}else 3==this.G&&(t?Tc(this,t):0==this.l.length||ja(this.i)||Tc(this))},Vi.Ga=function(){if(this.u=null,Rc(this),this.$&&!(this.L||null==this.g||0>=this.O)){var t=2*this.O;this.h.info("BP detection timer enabled: "+t),this.B=Uo(Xi(this.bb,this),t)}},Vi.bb=function(){this.B&&(this.B=null,this.h.info("BP detection timeout reached."),this.h.info("Buffering proxy detected and switch to long-polling!"),this.N=!1,this.L=!0,Po(10),wc(this),Rc(this))},Vi.ab=function(){null!=this.v&&(this.v=null,wc(this),Cc(this),Po(19))},Vi.jb=function(t){t?(this.h.info("Successfully pinged google.com"),Po(2)):(this.h.info("Failed to ping google.com"),Po(1))},(Vi=Uc.prototype).xa=function(){},Vi.wa=function(){},Vi.va=function(){},Vi.ua=function(){},Vi.Oa=function(){},Fc.prototype.g=function(t,e){return new Vc(t,e)},Ji(Vc,ro),Vc.prototype.m=function(){this.g.j=this.j,this.A&&(this.g.H=!0);var t=this.g,e=this.l,n=this.h||void 0;t.Wa&&(t.h.info("Origin Trials enabled."),po(Xi(t.hb,t,e))),Po(0),t.W=e,t.aa=n||{},t.N=t.X,t.F=Pc(t,null,t.W),_c(t)},Vc.prototype.close=function(){vc(this.g)},Vc.prototype.u=function(t){if("string"==typeof t){var e={};e.__data__=t,Ic(this.g,e)}else this.v?((e={}).__data__=oo(t),Ic(this.g,e)):Ic(this.g,t)},Vc.prototype.M=function(){this.g.j=null,delete this.j,vc(this.g),delete this.g,Vc.Z.M.call(this)},Ji(jc,Ko),Ji(qc,Ho),Ji(Bc,Uc),Bc.prototype.xa=function(){io(this.g,"a")},Bc.prototype.wa=function(t){io(this.g,new jc(t))},Bc.prototype.va=function(t){io(this.g,new qc(t))},Bc.prototype.ua=function(){io(this.g,"b")},Fc.prototype.createWebChannel=Fc.prototype.g,Vc.prototype.send=Vc.prototype.u,Vc.prototype.open=Vc.prototype.m,Vc.prototype.close=Vc.prototype.close,Fo.NO_ERROR=0,Fo.TIMEOUT=8,Fo.HTTP_ERROR=6,Vo.COMPLETE="complete",Bo.EventType=zo,zo.OPEN="a",zo.CLOSE="b",zo.ERROR="c",zo.MESSAGE="d",ro.prototype.listen=ro.prototype.N,rc.prototype.listenOnce=rc.prototype.O,rc.prototype.getLastError=rc.prototype.La,rc.prototype.getLastErrorCode=rc.prototype.Da,rc.prototype.getStatus=rc.prototype.ba,rc.prototype.getResponseJson=rc.prototype.Qa,rc.prototype.getResponseText=rc.prototype.ga,rc.prototype.send=rc.prototype.ea;var $c=Fo,zc=Vo,Kc=Ro,Hc=10,Gc=11,Wc=Xa,Qc=Bo,Xc=rc;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Yc="8.7.1";
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.t(t),this.i=t=>e.writeSequenceNumber(t))}t(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.i&&this.i(t),t}}Jc.o=-1;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Zc={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class tu extends Error{constructor(t,e){super(e),this.code=t,this.message=e,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eu=new Le("@firebase/firestore");function nu(){return eu.logLevel}function ru(t,...e){if(eu.logLevel<=ke.DEBUG){const n=e.map(ou);eu.debug(`Firestore (${Yc}): ${t}`,...n)}}function iu(t,...e){if(eu.logLevel<=ke.ERROR){const n=e.map(ou);eu.error(`Firestore (${Yc}): ${t}`,...n)}}function su(t,...e){if(eu.logLevel<=ke.WARN){const n=e.map(ou);eu.warn(`Firestore (${Yc}): ${t}`,...n)}}function ou(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e)}catch(n){return t}var e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function au(t="Unexpected state"){const e=`FIRESTORE (${Yc}) INTERNAL ASSERTION FAILED: `+t;throw iu(e),new Error(e)}function cu(t,e){t||au()}function uu(t,e){return t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hu(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lu{static u(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let n="";for(;n.length<20;){const r=hu(40);for(let i=0;i<r.length;++i)n.length<20&&r[i]<e&&(n+=t.charAt(r[i]%t.length))}return n}}function du(t,e){return t<e?-1:t>e?1:0}function fu(t,e,n){return t.length===e.length&&t.every(((t,r)=>n(t,e[r])))}function pu(t){return t+"\0"}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gu{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new tu(Zc.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new tu(Zc.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new tu(Zc.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new tu(Zc.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return gu.fromMillis(Date.now())}static fromDate(t){return gu.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new gu(e,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?du(this.nanoseconds,t.nanoseconds):du(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(t){this.timestamp=t}static fromTimestamp(t){return new mu(t)}static min(){return new mu(new gu(0,0))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yu(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function vu(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function wu(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu{constructor(t,e,n){void 0===e?e=0:e>t.length&&au(),void 0===n?n=t.length-e:n>t.length-e&&au(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===bu.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof bu?t.forEach((t=>{e.push(t)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=t.get(r),i=e.get(r);if(n<i)return-1;if(n>i)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Iu extends bu{construct(t,e,n){return new Iu(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new tu(Zc.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((t=>t.length>0)))}return new Iu(e)}static emptyPath(){return new Iu([])}}const _u=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Tu extends bu{construct(t,e,n){return new Tu(t,e,n)}static isValidIdentifier(t){return _u.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Tu.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new Tu(["__name__"])}static fromServerFormat(t){const e=[];let n="",r=0;const i=()=>{if(0===n.length)throw new tu(Zc.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let s=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new tu(Zc.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new tu(Zc.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(s=!s,r++):"."!==e||s?(n+=e,r++):(i(),r++)}if(i(),s)throw new tu(Zc.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Tu(e)}static emptyPath(){return new Tu([])}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{constructor(t){this.fields=t,t.sort(Tu.comparator)}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return fu(this.fields,t.fields,((t,e)=>t.isEqual(e)))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{constructor(t){this.binaryString=t}static fromBase64String(t){const e=atob(t);return new Su(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new Su(e)}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return du(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Su.EMPTY_BYTE_STRING=new Su("");const ku=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Cu(t){if(cu(!!t),"string"==typeof t){let e=0;const n=ku.exec(t);if(cu(!!n),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Au(t.seconds),nanos:Au(t.nanos)}}function Au(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function Ru(t){return"string"==typeof t?Su.fromBase64String(t):Su.fromUint8Array(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nu(t){var e,n;return"server_timestamp"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function Du(t){const e=t.mapValue.fields.__previous_value__;return Nu(e)?Du(e):e}function xu(t){const e=Cu(t.mapValue.fields.__local_write_time__.timestampValue);return new gu(e.seconds,e.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ou(t){return null==t}function Lu(t){return 0===t&&1/t==-1/0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pu{constructor(t){this.path=t}static fromPath(t){return new Pu(Iu.fromString(t))}static fromName(t){return new Pu(Iu.fromString(t).popFirst(5))}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}isEqual(t){return null!==t&&0===Iu.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return Iu.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new Pu(new Iu(t.slice()))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mu(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Nu(t)?4:10:au()}function Uu(t,e){const n=Mu(t);if(n!==Mu(e))return!1;switch(n){case 0:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return xu(t).isEqual(xu(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=Cu(t.timestampValue),r=Cu(e.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return r=e,Ru(t.bytesValue).isEqual(Ru(r.bytesValue));case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return Au(t.geoPointValue.latitude)===Au(e.geoPointValue.latitude)&&Au(t.geoPointValue.longitude)===Au(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return Au(t.integerValue)===Au(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=Au(t.doubleValue),r=Au(e.doubleValue);return n===r?Lu(n)===Lu(r):isNaN(n)&&isNaN(r)}return!1}(t,e);case 9:return fu(t.arrayValue.values||[],e.arrayValue.values||[],Uu);case 10:return function(t,e){const n=t.mapValue.fields||{},r=e.mapValue.fields||{};if(yu(n)!==yu(r))return!1;for(const i in n)if(n.hasOwnProperty(i)&&(void 0===r[i]||!Uu(n[i],r[i])))return!1;return!0}(t,e);default:return au()}var r}function Fu(t,e){return void 0!==(t.values||[]).find((t=>Uu(t,e)))}function Vu(t,e){const n=Mu(t),r=Mu(e);if(n!==r)return du(n,r);switch(n){case 0:return 0;case 1:return du(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=Au(t.integerValue||t.doubleValue),r=Au(e.integerValue||e.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(t,e);case 3:return ju(t.timestampValue,e.timestampValue);case 4:return ju(xu(t),xu(e));case 5:return du(t.stringValue,e.stringValue);case 6:return function(t,e){const n=Ru(t),r=Ru(e);return n.compareTo(r)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),r=e.split("/");for(let i=0;i<n.length&&i<r.length;i++){const t=du(n[i],r[i]);if(0!==t)return t}return du(n.length,r.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=du(Au(t.latitude),Au(e.latitude));return 0!==n?n:du(Au(t.longitude),Au(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const t=Vu(n[i],r[i]);if(t)return t}return du(n.length,r.length)}(t.arrayValue,e.arrayValue);case 10:return function(t,e){const n=t.fields||{},r=Object.keys(n),i=e.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let o=0;o<r.length&&o<s.length;++o){const t=du(r[o],s[o]);if(0!==t)return t;const e=Vu(n[r[o]],i[s[o]]);if(0!==e)return e}return du(r.length,s.length)}(t.mapValue,e.mapValue);default:throw au()}}function ju(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return du(t,e);const n=Cu(t),r=Cu(e),i=du(n.seconds,r.seconds);return 0!==i?i:du(n.nanos,r.nanos)}function qu(t){return Bu(t)}function Bu(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=Cu(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?Ru(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,Pu.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(t){let e="[",n=!0;for(const r of t.values||[])n?n=!1:e+=",",e+=Bu(r);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",r=!0;for(const i of e)r?r=!1:n+=",",n+=`${i}:${Bu(t.fields[i])}`;return n+"}"}(t.mapValue):au();var e,n}function $u(t){return!!t&&"integerValue"in t}function zu(t){return!!t&&"arrayValue"in t}function Ku(t){return!!t&&"nullValue"in t}function Hu(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Gu(t){return!!t&&"mapValue"in t}function Wu(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&"object"==typeof t.timestampValue)return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return vu(t.mapValue.fields,((t,n)=>e.mapValue.fields[t]=Wu(n))),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Wu(t.arrayValue.values[n]);return e}return Object.assign({},t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(t){this.value=t}static empty(){return new Qu({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Gu(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Wu(e)}setAll(t){let e=Tu.emptyPath(),n={},r=[];t.forEach(((t,i)=>{if(!e.isImmediateParentOf(i)){const t=this.getFieldsMap(e);this.applyChanges(t,n,r),n={},r=[],e=i.popLast()}t?n[i.lastSegment()]=Wu(t):r.push(i.lastSegment())}));const i=this.getFieldsMap(e);this.applyChanges(i,n,r)}delete(t){const e=this.field(t.popLast());Gu(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Uu(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let r=e.mapValue.fields[t.get(n)];Gu(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=r),e=r}return e.mapValue.fields}applyChanges(t,e,n){vu(e,((e,n)=>t[e]=n));for(const r of n)delete t[r]}clone(){return new Qu(Wu(this.value))}}function Xu(t){const e=[];return vu(t.fields,((t,n)=>{const r=new Tu([t]);if(Gu(n)){const t=Xu(n.mapValue).fields;if(0===t.length)e.push(r);else for(const n of t)e.push(r.child(n))}else e.push(r)})),new Eu(e)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class Yu{constructor(t,e,n,r,i){this.key=t,this.documentType=e,this.version=n,this.data=r,this.documentState=i}static newInvalidDocument(t){return new Yu(t,0,mu.min(),Qu.empty(),0)}static newFoundDocument(t,e,n){return new Yu(t,1,e,n,0)}static newNoDocument(t,e){return new Yu(t,2,e,Qu.empty(),0)}static newUnknownDocument(t,e){return new Yu(t,3,e,Qu.empty(),2)}convertToFoundDocument(t,e){return this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Qu.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Qu.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof Yu&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}clone(){return new Yu(this.key,this.documentType,this.version,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ju{constructor(t,e=null,n=[],r=[],i=null,s=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=o,this.h=null}}function Zu(t,e=null,n=[],r=[],i=null,s=null,o=null){return new Ju(t,e,n,r,i,s,o)}function th(t){const e=uu(t);if(null===e.h){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((t=>function(t){return t.field.canonicalString()+t.op.toString()+qu(t.value)}(t))).join(","),t+="|ob:",t+=e.orderBy.map((t=>{return(e=t).field.canonicalString()+e.dir;var e})).join(","),Ou(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=fh(e.startAt)),e.endAt&&(t+="|ub:",t+=fh(e.endAt)),e.h=t}return e.h}function eh(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let i=0;i<t.orderBy.length;i++)if(!gh(t.orderBy[i],e.orderBy[i]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let i=0;i<t.filters.length;i++)if(n=t.filters[i],r=e.filters[i],n.op!==r.op||!n.field.isEqual(r.field)||!Uu(n.value,r.value))return!1;var n,r;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!yh(t.startAt,e.startAt)&&yh(t.endAt,e.endAt)}function nh(t){return Pu.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}class rh extends class{}{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.l(t,e,n):new ih(t,e,n):"array-contains"===e?new ch(t,n):"in"===e?new uh(t,n):"not-in"===e?new hh(t,n):"array-contains-any"===e?new lh(t,n):new rh(t,e,n)}static l(t,e,n){return"in"===e?new sh(t,n):new oh(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&this.m(Vu(e,this.value)):null!==e&&Mu(this.value)===Mu(e)&&this.m(Vu(e,this.value))}m(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return au()}}g(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class ih extends rh{constructor(t,e,n){super(t,e,n),this.key=Pu.fromName(n.referenceValue)}matches(t){const e=Pu.comparator(t.key,this.key);return this.m(e)}}class sh extends rh{constructor(t,e){super(t,"in",e),this.keys=ah("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class oh extends rh{constructor(t,e){super(t,"not-in",e),this.keys=ah("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function ah(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map((t=>Pu.fromName(t.referenceValue)))}class ch extends rh{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return zu(e)&&Fu(e.arrayValue,this.value)}}class uh extends rh{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&Fu(this.value.arrayValue,e)}}class hh extends rh{constructor(t,e){super(t,"not-in",e)}matches(t){if(Fu(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&!Fu(this.value.arrayValue,e)}}class lh extends rh{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!zu(e)||!e.arrayValue.values)&&e.arrayValue.values.some((t=>Fu(this.value.arrayValue,t)))}}class dh{constructor(t,e){this.position=t,this.before=e}}function fh(t){return`${t.before?"b":"a"}:${t.position.map((t=>qu(t))).join(",")}`}class ph{constructor(t,e="asc"){this.field=t,this.dir=e}}function gh(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}function mh(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],o=t.position[i];if(r=s.field.isKeyField()?Pu.comparator(Pu.fromName(o.referenceValue),n.key):Vu(o,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return t.before?r<=0:r<0}function yh(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.before!==e.before||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Uu(t.position[n],e.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh{constructor(t,e=null,n=[],r=[],i=null,s="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=o,this.endAt=a,this.p=null,this.T=null,this.startAt,this.endAt}}function wh(t){return new vh(t)}function bh(t){return!Ou(t.limit)&&"F"===t.limitType}function Ih(t){return!Ou(t.limit)&&"L"===t.limitType}function _h(t){const e=uu(t);if(null===e.p){e.p=[];const t=function(t){for(const e of t.filters)if(e.g())return e.field;return null}(e),n=function(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}(e);if(null!==t&&null===n)t.isKeyField()||e.p.push(new ph(t)),e.p.push(new ph(Tu.keyField(),"asc"));else{let t=!1;for(const n of e.explicitOrderBy)e.p.push(n),n.field.isKeyField()&&(t=!0);if(!t){const t=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.p.push(new ph(Tu.keyField(),t))}}}return e.p}function Th(t){const e=uu(t);if(!e.T)if("F"===e.limitType)e.T=Zu(e.path,e.collectionGroup,_h(e),e.filters,e.limit,e.startAt,e.endAt);else{const t=[];for(const i of _h(e)){const e="desc"===i.dir?"asc":"desc";t.push(new ph(i.field,e))}const n=e.endAt?new dh(e.endAt.position,!e.endAt.before):null,r=e.startAt?new dh(e.startAt.position,!e.startAt.before):null;e.T=Zu(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}return e.T}function Eh(t,e){return eh(Th(t),Th(e))&&t.limitType===e.limitType}function Sh(t){return`${th(Th(t))}|lt:${t.limitType}`}function kh(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map((t=>{return`${(e=t).field.canonicalString()} ${e.op} ${qu(e.value)}`;var e})).join(", ")}]`),Ou(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map((t=>{return`${(e=t).field.canonicalString()} (${e.dir})`;var e})).join(", ")}]`),t.startAt&&(e+=", startAt: "+fh(t.startAt)),t.endAt&&(e+=", endAt: "+fh(t.endAt)),`Target(${e})`}(Th(t))}; limitType=${t.limitType})`}function Ch(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):Pu.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of t.explicitOrderBy)if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&(r=e,!((n=t).startAt&&!mh(n.startAt,_h(n),r)||n.endAt&&mh(n.endAt,_h(n),r)));var n,r}function Ah(t){return(e,n)=>{let r=!1;for(const i of _h(t)){const t=Rh(i,e,n);if(0!==t)return t;r=r||i.field.isKeyField()}return 0}}function Rh(t,e,n){const r=t.field.isKeyField()?Pu.comparator(e.key,n.key):function(t,e,n){const r=e.data.field(t),i=n.data.field(t);return null!==r&&null!==i?Vu(r,i):au()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return au()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nh(t,e){if(t.I){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Lu(e)?"-0":e}}function Dh(t){return{integerValue:""+t}}function xh(t,e){return function(t){return"number"==typeof t&&Number.isInteger(t)&&!Lu(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}(e)?Dh(e):Nh(t,e)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oh{constructor(){this._=void 0}}function Lh(t,e,n){return t instanceof Uh?function(t,e){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&(n.fields.__previous_value__=e),{mapValue:n}}(n,e):t instanceof Fh?Vh(t,e):t instanceof jh?qh(t,e):function(t,e){const n=Mh(t,e),r=$h(n)+$h(t.A);return $u(n)&&$u(t.A)?Dh(r):Nh(t.R,r)}(t,e)}function Ph(t,e,n){return t instanceof Fh?Vh(t,e):t instanceof jh?qh(t,e):n}function Mh(t,e){return t instanceof Bh?$u(r=e)||(n=r)&&"doubleValue"in n?e:{integerValue:0}:null;var n,r}class Uh extends Oh{}class Fh extends Oh{constructor(t){super(),this.elements=t}}function Vh(t,e){const n=zh(e);for(const r of t.elements)n.some((t=>Uu(t,r)))||n.push(r);return{arrayValue:{values:n}}}class jh extends Oh{constructor(t){super(),this.elements=t}}function qh(t,e){let n=zh(e);for(const r of t.elements)n=n.filter((t=>!Uu(t,r)));return{arrayValue:{values:n}}}class Bh extends Oh{constructor(t,e){super(),this.R=t,this.A=e}}function $h(t){return Au(t.integerValue||t.doubleValue)}function zh(t){return zu(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{constructor(t,e){this.field=t,this.transform=e}}class Hh{constructor(t,e){this.version=t,this.transformResults=e}}class Gh{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Gh}static exists(t){return new Gh(void 0,t)}static updateTime(t){return new Gh(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Wh(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class Qh{}function Xh(t,e,n){var r;t instanceof el?function(t,e,n){const r=t.value.clone(),i=il(t.fieldTransforms,e,n.transformResults);r.setAll(i),e.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(t,e,n):t instanceof nl?function(t,e,n){if(!Wh(t.precondition,e))return void e.convertToUnknownDocument(n.version);const r=il(t.fieldTransforms,e,n.transformResults),i=e.data;i.setAll(rl(t)),i.setAll(r),e.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(t,e,n):(r=n,e.convertToNoDocument(r.version).setHasCommittedMutations())}function Yh(t,e,n){var r;t instanceof el?function(t,e,n){if(!Wh(t.precondition,e))return;const r=t.value.clone(),i=sl(t.fieldTransforms,n,e);r.setAll(i),e.convertToFoundDocument(tl(e),r).setHasLocalMutations()}(t,e,n):t instanceof nl?function(t,e,n){if(!Wh(t.precondition,e))return;const r=sl(t.fieldTransforms,n,e),i=e.data;i.setAll(rl(t)),i.setAll(r),e.convertToFoundDocument(tl(e),i).setHasLocalMutations()}(t,e,n):(r=e,Wh(t.precondition,r)&&r.convertToNoDocument(mu.min()))}function Jh(t,e){let n=null;for(const r of t.fieldTransforms){const t=e.data.field(r.field),i=Mh(r.transform,t||null);null!=i&&(null==n&&(n=Qu.empty()),n.set(r.field,i))}return n||null}function Zh(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&(n=t.fieldTransforms,r=e.fieldTransforms,!!(void 0===n&&void 0===r||n&&r&&fu(n,r,((t,e)=>function(t,e){return t.field.isEqual(e.field)&&(n=t.transform,r=e.transform,n instanceof Fh&&r instanceof Fh||n instanceof jh&&r instanceof jh?fu(n.elements,r.elements,Uu):n instanceof Bh&&r instanceof Bh?Uu(n.A,r.A):n instanceof Uh&&r instanceof Uh);var n,r}(t,e))))&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask)));var n,r}function tl(t){return t.isFoundDocument()?t.version:mu.min()}class el extends Qh{constructor(t,e,n,r=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=r,this.type=0}}class nl extends Qh{constructor(t,e,n,r,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}}function rl(t){const e=new Map;return t.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}})),e}function il(t,e,n){const r=new Map;cu(t.length===n.length);for(let i=0;i<n.length;i++){const s=t[i],o=s.transform,a=e.data.field(s.field);r.set(s.field,Ph(o,a,n[i]))}return r}function sl(t,e,n){const r=new Map;for(const i of t){const t=i.transform,s=n.data.field(i.field);r.set(i.field,Lh(t,s,e))}return r}class ol extends Qh{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}}class al extends Qh{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl{constructor(t){this.count=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ul,hl;function ll(t){if(void 0===t)return iu("GRPC error has no .code"),Zc.UNKNOWN;switch(t){case ul.OK:return Zc.OK;case ul.CANCELLED:return Zc.CANCELLED;case ul.UNKNOWN:return Zc.UNKNOWN;case ul.DEADLINE_EXCEEDED:return Zc.DEADLINE_EXCEEDED;case ul.RESOURCE_EXHAUSTED:return Zc.RESOURCE_EXHAUSTED;case ul.INTERNAL:return Zc.INTERNAL;case ul.UNAVAILABLE:return Zc.UNAVAILABLE;case ul.UNAUTHENTICATED:return Zc.UNAUTHENTICATED;case ul.INVALID_ARGUMENT:return Zc.INVALID_ARGUMENT;case ul.NOT_FOUND:return Zc.NOT_FOUND;case ul.ALREADY_EXISTS:return Zc.ALREADY_EXISTS;case ul.PERMISSION_DENIED:return Zc.PERMISSION_DENIED;case ul.FAILED_PRECONDITION:return Zc.FAILED_PRECONDITION;case ul.ABORTED:return Zc.ABORTED;case ul.OUT_OF_RANGE:return Zc.OUT_OF_RANGE;case ul.UNIMPLEMENTED:return Zc.UNIMPLEMENTED;case ul.DATA_LOSS:return Zc.DATA_LOSS;default:return au()}}(hl=ul||(ul={}))[hl.OK=0]="OK",hl[hl.CANCELLED=1]="CANCELLED",hl[hl.UNKNOWN=2]="UNKNOWN",hl[hl.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",hl[hl.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",hl[hl.NOT_FOUND=5]="NOT_FOUND",hl[hl.ALREADY_EXISTS=6]="ALREADY_EXISTS",hl[hl.PERMISSION_DENIED=7]="PERMISSION_DENIED",hl[hl.UNAUTHENTICATED=16]="UNAUTHENTICATED",hl[hl.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",hl[hl.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",hl[hl.ABORTED=10]="ABORTED",hl[hl.OUT_OF_RANGE=11]="OUT_OF_RANGE",hl[hl.UNIMPLEMENTED=12]="UNIMPLEMENTED",hl[hl.INTERNAL=13]="INTERNAL",hl[hl.UNAVAILABLE=14]="UNAVAILABLE",hl[hl.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class dl{constructor(t,e){this.comparator=t,this.root=e||pl.EMPTY}insert(t,e){return new dl(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,pl.BLACK,null,null))}remove(t){return new dl(this.comparator,this.root.remove(t,this.comparator).copy(null,null,pl.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(0===r)return e+n.left.size;r<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new fl(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new fl(this.root,t,this.comparator,!1)}getReverseIterator(){return new fl(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new fl(this.root,t,this.comparator,!0)}}class fl{constructor(t,e,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,r&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(0===i){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class pl{constructor(t,e,n,r,i){this.key=t,this.value=e,this.color=null!=n?n:pl.RED,this.left=null!=r?r:pl.EMPTY,this.right=null!=i?i:pl.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,r,i){return new pl(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let r=this;const i=n(t,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(t,e,n),null):0===i?r.copy(null,e,null,null,null):r.copy(null,null,null,null,r.right.insert(t,e,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return pl.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,r=this;if(e(t,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(t,e),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===e(t,r.key)){if(r.right.isEmpty())return pl.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(t,e))}return r.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,pl.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,pl.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw au();if(this.right.isRed())throw au();const t=this.left.check();if(t!==this.right.check())throw au();return t+(this.isRed()?0:1)}}pl.EMPTY=null,pl.RED=!0,pl.BLACK=!1,pl.EMPTY=new class{constructor(){this.size=0}get key(){throw au()}get value(){throw au()}get color(){throw au()}get left(){throw au()}get right(){throw au()}copy(t,e,n,r,i){return this}insert(t,e,n){return new pl(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gl{constructor(t){this.comparator=t,this.data=new dl(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,n)=>(t(e),!1)))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,t[1])>=0)return;e(r.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new ml(this.data.getIterator())}getIteratorFrom(t){return new ml(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((t=>{e=e.add(t)})),e}isEqual(t){if(!(t instanceof gl))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(0!==this.comparator(t,r))return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new gl(this.comparator);return e.data=t,e}}class ml{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yl=new dl(Pu.comparator);function vl(){return yl}const wl=new dl(Pu.comparator);function bl(){return wl}const Il=new dl(Pu.comparator);const _l=new gl(Pu.comparator);function Tl(...t){let e=_l;for(const n of t)e=e.add(n);return e}const El=new gl(du);function Sl(){return El}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kl{constructor(t,e,n,r,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e){const n=new Map;return n.set(t,Cl.createSynthesizedTargetChangeForCurrentChange(t,e)),new kl(mu.min(),n,Sl(),vl(),Tl())}}class Cl{constructor(t,e,n,r,i){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e){return new Cl(Su.EMPTY_BYTE_STRING,e,Tl(),Tl(),Tl())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Al{constructor(t,e,n,r){this.P=t,this.removedTargetIds=e,this.key=n,this.v=r}}class Rl{constructor(t,e){this.targetId=t,this.V=e}}class Nl{constructor(t,e,n=Su.EMPTY_BYTE_STRING,r=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=r}}class Dl{constructor(){this.S=0,this.D=Ll(),this.C=Su.EMPTY_BYTE_STRING,this.N=!1,this.k=!0}get current(){return this.N}get resumeToken(){return this.C}get $(){return 0!==this.S}get O(){return this.k}F(t){t.approximateByteSize()>0&&(this.k=!0,this.C=t)}M(){let t=Tl(),e=Tl(),n=Tl();return this.D.forEach(((r,i)=>{switch(i){case 0:t=t.add(r);break;case 2:e=e.add(r);break;case 1:n=n.add(r);break;default:au()}})),new Cl(this.C,this.N,t,e,n)}L(){this.k=!1,this.D=Ll()}B(t,e){this.k=!0,this.D=this.D.insert(t,e)}U(t){this.k=!0,this.D=this.D.remove(t)}q(){this.S+=1}K(){this.S-=1}j(){this.k=!0,this.N=!0}}class xl{constructor(t){this.W=t,this.G=new Map,this.H=vl(),this.J=Ol(),this.Y=new gl(du)}X(t){for(const e of t.P)t.v&&t.v.isFoundDocument()?this.Z(e,t.v):this.tt(e,t.key,t.v);for(const e of t.removedTargetIds)this.tt(e,t.key,t.v)}et(t){this.forEachTarget(t,(e=>{const n=this.nt(e);switch(t.state){case 0:this.st(e)&&n.F(t.resumeToken);break;case 1:n.K(),n.$||n.L(),n.F(t.resumeToken);break;case 2:n.K(),n.$||this.removeTarget(e);break;case 3:this.st(e)&&(n.j(),n.F(t.resumeToken));break;case 4:this.st(e)&&(this.it(e),n.F(t.resumeToken));break;default:au()}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.G.forEach(((t,n)=>{this.st(n)&&e(n)}))}rt(t){const e=t.targetId,n=t.V.count,r=this.ot(e);if(r){const t=r.target;if(nh(t))if(0===n){const n=new Pu(t.path);this.tt(e,n,Yu.newNoDocument(n,mu.min()))}else cu(1===n);else this.ct(e)!==n&&(this.it(e),this.Y=this.Y.add(e))}}ut(t){const e=new Map;this.G.forEach(((n,r)=>{const i=this.ot(r);if(i){if(n.current&&nh(i.target)){const e=new Pu(i.target.path);null!==this.H.get(e)||this.at(r,e)||this.tt(r,e,Yu.newNoDocument(e,t))}n.O&&(e.set(r,n.M()),n.L())}}));let n=Tl();this.J.forEach(((t,e)=>{let r=!0;e.forEachWhile((t=>{const e=this.ot(t);return!e||2===e.purpose||(r=!1,!1)})),r&&(n=n.add(t))}));const r=new kl(t,e,this.Y,this.H,n);return this.H=vl(),this.J=Ol(),this.Y=new gl(du),r}Z(t,e){if(!this.st(t))return;const n=this.at(t,e.key)?2:0;this.nt(t).B(e.key,n),this.H=this.H.insert(e.key,e),this.J=this.J.insert(e.key,this.ht(e.key).add(t))}tt(t,e,n){if(!this.st(t))return;const r=this.nt(t);this.at(t,e)?r.B(e,1):r.U(e),this.J=this.J.insert(e,this.ht(e).delete(t)),n&&(this.H=this.H.insert(e,n))}removeTarget(t){this.G.delete(t)}ct(t){const e=this.nt(t).M();return this.W.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}q(t){this.nt(t).q()}nt(t){let e=this.G.get(t);return e||(e=new Dl,this.G.set(t,e)),e}ht(t){let e=this.J.get(t);return e||(e=new gl(du),this.J=this.J.insert(t,e)),e}st(t){const e=null!==this.ot(t);return e||ru("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.G.get(t);return e&&e.$?null:this.W.lt(t)}it(t){this.G.set(t,new Dl),this.W.getRemoteKeysForTarget(t).forEach((e=>{this.tt(t,e,null)}))}at(t,e){return this.W.getRemoteKeysForTarget(t).has(e)}}function Ol(){return new dl(Pu.comparator)}function Ll(){return new dl(Pu.comparator)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pl={asc:"ASCENDING",desc:"DESCENDING"},Ml={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};class Ul{constructor(t,e){this.databaseId=t,this.I=e}}function Fl(t,e){return t.I?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Vl(t,e){return t.I?e.toBase64():e.toUint8Array()}function jl(t,e){return Fl(t,e.toTimestamp())}function ql(t){return cu(!!t),mu.fromTimestamp(function(t){const e=Cu(t);return new gu(e.seconds,e.nanos)}(t))}function Bl(t,e){return(n=t,new Iu(["projects",n.projectId,"databases",n.database])).child("documents").child(e).canonicalString();var n}function $l(t){const e=Iu.fromString(t);return cu(dd(e)),e}function zl(t,e){return Bl(t.databaseId,e.path)}function Kl(t,e){const n=$l(e);if(n.get(1)!==t.databaseId.projectId)throw new tu(Zc.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new tu(Zc.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Pu(Ql(n))}function Hl(t,e){return Bl(t.databaseId,e)}function Gl(t){const e=$l(t);return 4===e.length?Iu.emptyPath():Ql(e)}function Wl(t){return new Iu(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Ql(t){return cu(t.length>4&&"documents"===t.get(4)),t.popFirst(5)}function Xl(t,e,n){return{name:zl(t,e),fields:n.value.mapValue.fields}}function Yl(t,e){let n;if(e instanceof el)n={update:Xl(t,e.key,e.value)};else if(e instanceof ol)n={delete:zl(t,e.key)};else if(e instanceof nl)n={update:Xl(t,e.key,e.data),updateMask:ld(e.fieldMask)};else{if(!(e instanceof al))return au();n={verify:zl(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((t=>function(t,e){const n=e.transform;if(n instanceof Uh)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Fh)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof jh)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Bh)return{fieldPath:e.field.canonicalString(),increment:n.A};throw au()}(0,t)))),e.precondition.isNone||(n.currentDocument=(r=t,void 0!==(i=e.precondition).updateTime?{updateTime:jl(r,i.updateTime)}:void 0!==i.exists?{exists:i.exists}:au())),n;var r,i}function Jl(t,e){const n=e.currentDocument?void 0!==(i=e.currentDocument).updateTime?Gh.updateTime(ql(i.updateTime)):void 0!==i.exists?Gh.exists(i.exists):Gh.none():Gh.none(),r=e.updateTransforms?e.updateTransforms.map((e=>function(t,e){let n=null;if("setToServerValue"in e)cu("REQUEST_TIME"===e.setToServerValue),n=new Uh;else if("appendMissingElements"in e){const t=e.appendMissingElements.values||[];n=new Fh(t)}else if("removeAllFromArray"in e){const t=e.removeAllFromArray.values||[];n=new jh(t)}else"increment"in e?n=new Bh(t,e.increment):au();const r=Tu.fromServerFormat(e.fieldPath);return new Kh(r,n)}(t,e))):[];var i;if(e.update){e.update.name;const i=Kl(t,e.update.name),s=new Qu({mapValue:{fields:e.update.fields}});if(e.updateMask){const t=function(t){const e=t.fieldPaths||[];return new Eu(e.map((t=>Tu.fromServerFormat(t))))}(e.updateMask);return new nl(i,s,t,n,r)}return new el(i,s,n,r)}if(e.delete){const r=Kl(t,e.delete);return new ol(r,n)}if(e.verify){const r=Kl(t,e.verify);return new al(r,n)}return au()}function Zl(t,e){return{documents:[Hl(t,e.path)]}}function td(t,e){const n={structuredQuery:{}},r=e.path;null!==e.collectionGroup?(n.parent=Hl(t,r),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=Hl(t,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const i=function(t){if(0===t.length)return;const e=t.map((t=>function(t){if("=="===t.op){if(Hu(t.value))return{unaryFilter:{field:ad(t.field),op:"IS_NAN"}};if(Ku(t.value))return{unaryFilter:{field:ad(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(Hu(t.value))return{unaryFilter:{field:ad(t.field),op:"IS_NOT_NAN"}};if(Ku(t.value))return{unaryFilter:{field:ad(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ad(t.field),op:od(t.op),value:t.value}}}(t)));return 1===e.length?e[0]:{compositeFilter:{op:"AND",filters:e}}}(e.filters);i&&(n.structuredQuery.where=i);const s=function(t){if(0!==t.length)return t.map((t=>{return{field:ad((e=t).field),direction:sd(e.dir)};var e}))}(e.orderBy);s&&(n.structuredQuery.orderBy=s);const o=(a=t,c=e.limit,a.I||Ou(c)?c:{value:c});var a,c;return null!==o&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt=rd(e.startAt)),e.endAt&&(n.structuredQuery.endAt=rd(e.endAt)),n}function ed(t){let e=Gl(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){cu(1===r);const t=n.from[0];t.allDescendants?i=t.collectionId:e=e.child(t.collectionId)}let s=[];n.where&&(s=nd(n.where));let o=[];n.orderBy&&(o=n.orderBy.map((t=>{return new ph(cd((e=t).field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction));var e})));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,Ou(e)?null:e}(n.limit));let c=null;n.startAt&&(c=id(n.startAt));let u=null;return n.endAt&&(u=id(n.endAt)),function(t,e,n,r,i,s,o,a){return new vh(t,e,n,r,i,s,o,a)}(e,i,o,s,a,"F",c,u)}function nd(t){return t?void 0!==t.unaryFilter?[hd(t)]:void 0!==t.fieldFilter?[ud(t)]:void 0!==t.compositeFilter?t.compositeFilter.filters.map((t=>nd(t))).reduce(((t,e)=>t.concat(e))):au():[]}function rd(t){return{before:t.before,values:t.position}}function id(t){const e=!!t.before,n=t.values||[];return new dh(n,e)}function sd(t){return Pl[t]}function od(t){return Ml[t]}function ad(t){return{fieldPath:t.canonicalString()}}function cd(t){return Tu.fromServerFormat(t.fieldPath)}function ud(t){return rh.create(cd(t.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":default:return au()}}(t.fieldFilter.op),t.fieldFilter.value)}function hd(t){switch(t.unaryFilter.op){case"IS_NAN":const e=cd(t.unaryFilter.field);return rh.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=cd(t.unaryFilter.field);return rh.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=cd(t.unaryFilter.field);return rh.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=cd(t.unaryFilter.field);return rh.create(i,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":default:return au()}}function ld(t){const e=[];return t.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function dd(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fd(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=gd(e)),e=pd(t.get(n),e);return gd(e)}function pd(t,e){let n=e;const r=t.length;for(let i=0;i<r;i++){const e=t.charAt(i);switch(e){case"\0":n+="";break;case"":n+="";break;default:n+=e}}return n}function gd(t){return t+""}function md(t){const e=t.length;if(cu(e>=2),2===e)return cu(""===t.charAt(0)&&""===t.charAt(1)),Iu.emptyPath();const n=e-2,r=[];let i="";for(let s=0;s<e;){const e=t.indexOf("",s);switch((e<0||e>n)&&au(),t.charAt(e+1)){case"":const n=t.substring(s,e);let o;0===i.length?o=n:(i+=n,o=i,i=""),r.push(o);break;case"":i+=t.substring(s,e),i+="\0";break;case"":i+=t.substring(s,e+1);break;default:au()}s=e+2}return new Iu(r)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd{constructor(t,e){this.seconds=t,this.nanoseconds=e}}class vd{constructor(t,e,n){this.ownerId=t,this.allowTabSynchronization=e,this.leaseTimestampMs=n}}vd.store="owner",vd.key="owner";class wd{constructor(t,e,n){this.userId=t,this.lastAcknowledgedBatchId=e,this.lastStreamToken=n}}wd.store="mutationQueues",wd.keyPath="userId";class bd{constructor(t,e,n,r,i){this.userId=t,this.batchId=e,this.localWriteTimeMs=n,this.baseMutations=r,this.mutations=i}}bd.store="mutations",bd.keyPath="batchId",bd.userMutationsIndex="userMutationsIndex",bd.userMutationsKeyPath=["userId","batchId"];class Id{constructor(){}static prefixForUser(t){return[t]}static prefixForPath(t,e){return[t,fd(e)]}static key(t,e,n){return[t,fd(e),n]}}Id.store="documentMutations",Id.PLACEHOLDER=new Id;class _d{constructor(t,e){this.path=t,this.readTime=e}}class Td{constructor(t,e){this.path=t,this.version=e}}class Ed{constructor(t,e,n,r,i,s){this.unknownDocument=t,this.noDocument=e,this.document=n,this.hasCommittedMutations=r,this.readTime=i,this.parentPath=s}}Ed.store="remoteDocuments",Ed.readTimeIndex="readTimeIndex",Ed.readTimeIndexPath="readTime",Ed.collectionReadTimeIndex="collectionReadTimeIndex",Ed.collectionReadTimeIndexPath=["parentPath","readTime"];class Sd{constructor(t){this.byteSize=t}}Sd.store="remoteDocumentGlobal",Sd.key="remoteDocumentGlobalKey";class kd{constructor(t,e,n,r,i,s,o){this.targetId=t,this.canonicalId=e,this.readTime=n,this.resumeToken=r,this.lastListenSequenceNumber=i,this.lastLimboFreeSnapshotVersion=s,this.query=o}}kd.store="targets",kd.keyPath="targetId",kd.queryTargetsIndexName="queryTargetsIndex",kd.queryTargetsKeyPath=["canonicalId","targetId"];class Cd{constructor(t,e,n){this.targetId=t,this.path=e,this.sequenceNumber=n}}Cd.store="targetDocuments",Cd.keyPath=["targetId","path"],Cd.documentTargetsIndex="documentTargetsIndex",Cd.documentTargetsKeyPath=["path","targetId"];class Ad{constructor(t,e,n,r){this.highestTargetId=t,this.highestListenSequenceNumber=e,this.lastRemoteSnapshotVersion=n,this.targetCount=r}}Ad.key="targetGlobalKey",Ad.store="targetGlobal";class Rd{constructor(t,e){this.collectionId=t,this.parent=e}}Rd.store="collectionParents",Rd.keyPath=["collectionId","parent"];class Nd{constructor(t,e,n,r){this.clientId=t,this.updateTimeMs=e,this.networkEnabled=n,this.inForeground=r}}Nd.store="clientMetadata",Nd.keyPath="clientId";class Dd{constructor(t,e,n){this.bundleId=t,this.createTime=e,this.version=n}}Dd.store="bundles",Dd.keyPath="bundleId";class xd{constructor(t,e,n){this.name=t,this.readTime=e,this.bundledQuery=n}}xd.store="namedQueries",xd.keyPath="name";const Od=[wd.store,bd.store,Id.store,Ed.store,kd.store,vd.store,Ad.store,Cd.store,Nd.store,Sd.store,Rd.store,Dd.store,xd.store],Ld="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Pd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Md{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&au(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new Ud(((n,r)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,r)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,r)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof Ud?e:Ud.resolve(e)}catch(e){return Ud.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):Ud.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):Ud.reject(e)}static resolve(t){return new Ud(((e,n)=>{e(t)}))}static reject(t){return new Ud(((e,n)=>{n(t)}))}static waitFor(t){return new Ud(((e,n)=>{let r=0,i=0,s=!1;t.forEach((t=>{++r,t.next((()=>{++i,s&&i===r&&e()}),(t=>n(t)))})),s=!0,i===r&&e()}))}static or(t){let e=Ud.resolve(!1);for(const n of t)e=e.next((t=>t?Ud.resolve(t):n()));return e}static forEach(t,e){const n=[];return t.forEach(((t,r)=>{n.push(e.call(this,t,r))})),this.waitFor(n)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.ft=new Md,this.transaction.oncomplete=()=>{this.ft.resolve()},this.transaction.onabort=()=>{e.error?this.ft.reject(new qd(t,e.error)):this.ft.resolve()},this.transaction.onerror=e=>{const n=Hd(e.target.error);this.ft.reject(new qd(t,n))}}static open(t,e,n,r){try{return new Fd(e,t.transaction(r,n))}catch(i){throw new qd(e,i)}}get dt(){return this.ft.promise}abort(t){t&&this.ft.reject(t),this.aborted||(ru("SimpleDb","Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}store(t){const e=this.transaction.objectStore(t);return new $d(e)}}class Vd{constructor(t,e,n){this.name=t,this.version=e,this.wt=n,12.2===Vd._t(ue())&&iu("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(t){return ru("SimpleDb","Removing database:",t),zd(window.indexedDB.deleteDatabase(t)).toPromise()}static gt(){if("undefined"==typeof indexedDB)return!1;if(Vd.yt())return!0;const t=ue(),e=Vd._t(t),n=0<e&&e<10,r=Vd.Et(t),i=0<r&&r<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||i)}static yt(){var t;return"undefined"!=typeof process&&"YES"===(null===(t=process.env)||void 0===t?void 0:t.Tt)}static It(t,e){return t.store(e)}static _t(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}static Et(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}async At(t){return this.db||(ru("SimpleDb","Opening database:",this.name),this.db=await new Promise(((e,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=t=>{const n=t.target.result;e(n)},r.onblocked=()=>{n(new qd(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=e=>{const r=e.target.error;"VersionError"===r.name?n(new tu(Zc.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):n(new qd(t,r))},r.onupgradeneeded=t=>{ru("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',t.oldVersion);const e=t.target.result;this.wt.Rt(e,r.transaction,t.oldVersion,this.version).next((()=>{ru("SimpleDb","Database upgrade to version "+this.version+" complete")}))}}))),this.Pt&&(this.db.onversionchange=t=>this.Pt(t)),this.db}bt(t){this.Pt=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,r){const i="readonly"===e;let s=0;for(;;){++s;try{this.db=await this.At(t);const e=Fd.open(this.db,t,i?"readonly":"readwrite",n),s=r(e).catch((t=>(e.abort(t),Ud.reject(t)))).toPromise();return s.catch((()=>{})),await e.dt,s}catch(o){const t="FirebaseError"!==o.name&&s<3;if(ru("SimpleDb","Transaction failed with error:",o.message,"Retrying:",t),this.close(),!t)return Promise.reject(o)}}}close(){this.db&&this.db.close(),this.db=void 0}}class jd{constructor(t){this.vt=t,this.Vt=!1,this.St=null}get isDone(){return this.Vt}get Dt(){return this.St}set cursor(t){this.vt=t}done(){this.Vt=!0}Ct(t){this.St=t}delete(){return zd(this.vt.delete())}}class qd extends tu{constructor(t,e){super(Zc.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function Bd(t){return"IndexedDbTransactionError"===t.name}class $d{constructor(t){this.store=t}put(t,e){let n;return void 0!==e?(ru("SimpleDb","PUT",this.store.name,t,e),n=this.store.put(e,t)):(ru("SimpleDb","PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),zd(n)}add(t){return ru("SimpleDb","ADD",this.store.name,t,t),zd(this.store.add(t))}get(t){return zd(this.store.get(t)).next((e=>(void 0===e&&(e=null),ru("SimpleDb","GET",this.store.name,t,e),e)))}delete(t){return ru("SimpleDb","DELETE",this.store.name,t),zd(this.store.delete(t))}count(){return ru("SimpleDb","COUNT",this.store.name),zd(this.store.count())}Nt(t,e){const n=this.cursor(this.options(t,e)),r=[];return this.xt(n,((t,e)=>{r.push(e)})).next((()=>r))}kt(t,e){ru("SimpleDb","DELETE ALL",this.store.name);const n=this.options(t,e);n.$t=!1;const r=this.cursor(n);return this.xt(r,((t,e,n)=>n.delete()))}Ot(t,e){let n;e?n=t:(n={},e=t);const r=this.cursor(n);return this.xt(r,e)}Ft(t){const e=this.cursor({});return new Ud(((n,r)=>{e.onerror=t=>{const e=Hd(t.target.error);r(e)},e.onsuccess=e=>{const r=e.target.result;r?t(r.primaryKey,r.value).next((t=>{t?r.continue():n()})):n()}}))}xt(t,e){const n=[];return new Ud(((r,i)=>{t.onerror=t=>{i(t.target.error)},t.onsuccess=t=>{const i=t.target.result;if(!i)return void r();const s=new jd(i),o=e(i.primaryKey,i.value,s);if(o instanceof Ud){const t=o.catch((t=>(s.done(),Ud.reject(t))));n.push(t)}s.isDone?r():null===s.Dt?i.continue():i.continue(s.Dt)}})).next((()=>Ud.waitFor(n)))}options(t,e){let n;return void 0!==t&&("string"==typeof t?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.$t?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function zd(t){return new Ud(((e,n)=>{t.onsuccess=t=>{const n=t.target.result;e(n)},t.onerror=t=>{const e=Hd(t.target.error);n(e)}}))}let Kd=!1;function Hd(t){const e=Vd._t(ue());if(e>=12.2&&e<13){const e="An internal error was encountered in the Indexed Database server";if(t.message.indexOf(e)>=0){const t=new tu("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Kd||(Kd=!0,setTimeout((()=>{throw t}),0)),t}}return t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gd extends Pd{constructor(t,e){super(),this.Mt=t,this.currentSequenceNumber=e}}function Wd(t,e){const n=uu(t);return Vd.It(n.Mt,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{constructor(t,e,n,r){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let r=0;r<this.mutations.length;r++){const e=this.mutations[r];e.key.isEqual(t.key)&&Xh(e,t,n[r])}}applyToLocalView(t){for(const e of this.baseMutations)e.key.isEqual(t.key)&&Yh(e,t,this.localWriteTime);for(const e of this.mutations)e.key.isEqual(t.key)&&Yh(e,t,this.localWriteTime)}applyToLocalDocumentSet(t){this.mutations.forEach((e=>{const n=t.get(e.key),r=n;this.applyToLocalView(r),n.isValidDocument()||r.convertToNoDocument(mu.min())}))}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),Tl())}isEqual(t){return this.batchId===t.batchId&&fu(this.mutations,t.mutations,((t,e)=>Zh(t,e)))&&fu(this.baseMutations,t.baseMutations,((t,e)=>Zh(t,e)))}}class Xd{constructor(t,e,n,r){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=r}static from(t,e,n){cu(t.mutations.length===n.length);let r=Il;const i=t.mutations;for(let s=0;s<i.length;s++)r=r.insert(i[s].key,n[s].version);return new Xd(t,e,n,r)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yd{constructor(t,e,n,r,i=mu.min(),s=mu.min(),o=Su.EMPTY_BYTE_STRING){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=o}withSequenceNumber(t){return new Yd(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(t,e){return new Yd(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t)}withLastLimboFreeSnapshotVersion(t){return new Yd(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd{constructor(t){this.Lt=t}}function Zd(t,e){if(e.document)return function(t,e,n){const r=Kl(t,e.name),i=ql(e.updateTime),s=new Qu({mapValue:{fields:e.fields}}),o=Yu.newFoundDocument(r,i,s);return n&&o.setHasCommittedMutations(),n?o.setHasCommittedMutations():o}(t.Lt,e.document,!!e.hasCommittedMutations);if(e.noDocument){const t=Pu.fromSegments(e.noDocument.path),n=rf(e.noDocument.readTime),r=Yu.newNoDocument(t,n);return e.hasCommittedMutations?r.setHasCommittedMutations():r}if(e.unknownDocument){const t=Pu.fromSegments(e.unknownDocument.path),n=rf(e.unknownDocument.version);return Yu.newUnknownDocument(t,n)}return au()}function tf(t,e,n){const r=ef(n),i=e.key.path.popLast().toArray();if(e.isFoundDocument()){const n={name:zl(s=t.Lt,(o=e).key),fields:o.data.value.mapValue.fields,updateTime:Fl(s,o.version.toTimestamp())},a=e.hasCommittedMutations;return new Ed(null,null,n,a,r,i)}var s,o;if(e.isNoDocument()){const t=e.key.path.toArray(),n=nf(e.version),s=e.hasCommittedMutations;return new Ed(null,new _d(t,n),null,s,r,i)}if(e.isUnknownDocument()){const t=e.key.path.toArray(),n=nf(e.version);return new Ed(new Td(t,n),null,null,!0,r,i)}return au()}function ef(t){const e=t.toTimestamp();return[e.seconds,e.nanoseconds]}function nf(t){const e=t.toTimestamp();return new yd(e.seconds,e.nanoseconds)}function rf(t){const e=new gu(t.seconds,t.nanoseconds);return mu.fromTimestamp(e)}function sf(t,e){const n=(e.baseMutations||[]).map((e=>Jl(t.Lt,e)));for(let s=0;s<e.mutations.length-1;++s){const t=e.mutations[s];if(s+1<e.mutations.length&&void 0!==e.mutations[s+1].transform){const n=e.mutations[s+1];t.updateTransforms=n.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map((e=>Jl(t.Lt,e))),i=gu.fromMillis(e.localWriteTimeMs);return new Qd(e.batchId,i,n,r)}function of(t){const e=rf(t.readTime),n=void 0!==t.lastLimboFreeSnapshotVersion?rf(t.lastLimboFreeSnapshotVersion):mu.min();let r;var i;return void 0!==t.query.documents?(cu(1===(i=t.query).documents.length),r=Th(wh(Gl(i.documents[0])))):r=Th(ed(t.query)),new Yd(r,t.targetId,0,t.lastListenSequenceNumber,e,n,Su.fromBase64String(t.resumeToken))}function af(t,e){const n=nf(e.snapshotVersion),r=nf(e.lastLimboFreeSnapshotVersion);let i;i=nh(e.target)?Zl(t.Lt,e.target):td(t.Lt,e.target);const s=e.resumeToken.toBase64();return new kd(e.targetId,th(e.target),n,s,e.sequenceNumber,r,i)}function cf(t){const e=ed({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?function(t,e,n){return new vh(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}(e,e.limit,"L"):e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uf{getBundleMetadata(t,e){return hf(t).get(e).next((t=>{if(t)return{id:(e=t).bundleId,createTime:rf(e.createTime),version:e.version};var e}))}saveBundleMetadata(t,e){return hf(t).put({bundleId:(n=e).id,createTime:nf(ql(n.createTime)),version:n.version});var n}getNamedQuery(t,e){return lf(t).get(e).next((t=>{if(t)return{name:(e=t).name,query:cf(e.bundledQuery),readTime:rf(e.readTime)};var e}))}saveNamedQuery(t,e){return lf(t).put({name:(n=e).name,readTime:nf(ql(n.readTime)),bundledQuery:n.bundledQuery});var n}}function hf(t){return Wd(t,Dd.store)}function lf(t){return Wd(t,xd.store)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class df{constructor(){this.Bt=new ff}addToCollectionParentIndex(t,e){return this.Bt.add(e),Ud.resolve()}getCollectionParents(t,e){return Ud.resolve(this.Bt.getEntries(e))}}class ff{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e]||new gl(Iu.comparator),i=!r.has(n);return this.index[e]=r.add(n),i}has(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e];return r&&r.has(n)}getEntries(t){return(this.index[t]||new gl(Iu.comparator)).toArray()}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pf{constructor(){this.Ut=new ff}addToCollectionParentIndex(t,e){if(!this.Ut.has(e)){const n=e.lastSegment(),r=e.popLast();t.addOnCommittedListener((()=>{this.Ut.add(e)}));const i={collectionId:n,parent:fd(r)};return gf(t).put(i)}return Ud.resolve()}getCollectionParents(t,e){const n=[],r=IDBKeyRange.bound([e,""],[pu(e),""],!1,!0);return gf(t).Nt(r).next((t=>{for(const r of t){if(r.collectionId!==e)break;n.push(md(r.parent))}return n}))}}function gf(t){return Wd(t,Rd.store)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class yf{constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}static withCacheSize(t){return new yf(t,yf.DEFAULT_COLLECTION_PERCENTILE,yf.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vf(t,e,n){const r=t.store(bd.store),i=t.store(Id.store),s=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.Ot({range:o},((t,e,n)=>(a++,n.delete())));s.push(c.next((()=>{cu(1===a)})));const u=[];for(const h of n.mutations){const t=Id.key(e,h.key.path,n.batchId);s.push(i.delete(t)),u.push(h.key)}return Ud.waitFor(s).next((()=>u))}function wf(t){if(!t)return 0;let e;if(t.document)e=t.document;else if(t.unknownDocument)e=t.unknownDocument;else{if(!t.noDocument)throw au();e=t.noDocument}return JSON.stringify(e).length}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */yf.DEFAULT_COLLECTION_PERCENTILE=10,yf.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,yf.DEFAULT=new yf(41943040,yf.DEFAULT_COLLECTION_PERCENTILE,yf.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),yf.DISABLED=new yf(-1,0,0);class bf{constructor(t,e,n,r){this.userId=t,this.R=e,this.qt=n,this.referenceDelegate=r,this.Kt={}}static jt(t,e,n,r){cu(""!==t.uid);const i=t.isAuthenticated()?t.uid:"";return new bf(i,e,n,r)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return _f(t).Ot({index:bd.userMutationsIndex,range:n},((t,n,r)=>{e=!1,r.done()})).next((()=>e))}addMutationBatch(t,e,n,r){const i=Tf(t),s=_f(t);return s.add({}).next((o=>{cu("number"==typeof o);const a=new Qd(o,e,n,r),c=function(t,e,n){const r=n.baseMutations.map((e=>Yl(t.Lt,e))),i=n.mutations.map((e=>Yl(t.Lt,e)));return new bd(e,n.batchId,n.localWriteTime.toMillis(),r,i)}(this.R,this.userId,a),u=[];let h=new gl(((t,e)=>du(t.canonicalString(),e.canonicalString())));for(const t of r){const e=Id.key(this.userId,t.key.path,o);h=h.add(t.key.path.popLast()),u.push(s.put(c)),u.push(i.put(e,Id.PLACEHOLDER))}return h.forEach((e=>{u.push(this.qt.addToCollectionParentIndex(t,e))})),t.addOnCommittedListener((()=>{this.Kt[o]=a.keys()})),Ud.waitFor(u).next((()=>a))}))}lookupMutationBatch(t,e){return _f(t).get(e).next((t=>t?(cu(t.userId===this.userId),sf(this.R,t)):null))}Qt(t,e){return this.Kt[e]?Ud.resolve(this.Kt[e]):this.lookupMutationBatch(t,e).next((t=>{if(t){const n=t.keys();return this.Kt[e]=n,n}return null}))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return _f(t).Ot({index:bd.userMutationsIndex,range:r},((t,e,r)=>{e.userId===this.userId&&(cu(e.batchId>=n),i=sf(this.R,e)),r.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return _f(t).Ot({index:bd.userMutationsIndex,range:e,reverse:!0},((t,e,r)=>{n=e.batchId,r.done()})).next((()=>n))}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return _f(t).Nt(bd.userMutationsIndex,e).next((t=>t.map((t=>sf(this.R,t)))))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=Id.prefixForPath(this.userId,e.path),r=IDBKeyRange.lowerBound(n),i=[];return Tf(t).Ot({range:r},((n,r,s)=>{const[o,a,c]=n,u=md(a);if(o===this.userId&&e.path.isEqual(u))return _f(t).get(c).next((t=>{if(!t)throw au();cu(t.userId===this.userId),i.push(sf(this.R,t))}));s.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new gl(du);const r=[];return e.forEach((e=>{const i=Id.prefixForPath(this.userId,e.path),s=IDBKeyRange.lowerBound(i),o=Tf(t).Ot({range:s},((t,r,i)=>{const[s,o,a]=t,c=md(o);s===this.userId&&e.path.isEqual(c)?n=n.add(a):i.done()}));r.push(o)})),Ud.waitFor(r).next((()=>this.Wt(t,n)))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1,i=Id.prefixForPath(this.userId,n),s=IDBKeyRange.lowerBound(i);let o=new gl(du);return Tf(t).Ot({range:s},((t,e,i)=>{const[s,a,c]=t,u=md(a);s===this.userId&&n.isPrefixOf(u)?u.length===r&&(o=o.add(c)):i.done()})).next((()=>this.Wt(t,o)))}Wt(t,e){const n=[],r=[];return e.forEach((e=>{r.push(_f(t).get(e).next((t=>{if(null===t)throw au();cu(t.userId===this.userId),n.push(sf(this.R,t))})))})),Ud.waitFor(r).next((()=>n))}removeMutationBatch(t,e){return vf(t.Mt,this.userId,e).next((n=>(t.addOnCommittedListener((()=>{this.Gt(e.batchId)})),Ud.forEach(n,(e=>this.referenceDelegate.markPotentiallyOrphaned(t,e))))))}Gt(t){delete this.Kt[t]}performConsistencyCheck(t){return this.checkEmpty(t).next((e=>{if(!e)return Ud.resolve();const n=IDBKeyRange.lowerBound(Id.prefixForUser(this.userId)),r=[];return Tf(t).Ot({range:n},((t,e,n)=>{if(t[0]===this.userId){const e=md(t[1]);r.push(e)}else n.done()})).next((()=>{cu(0===r.length)}))}))}containsKey(t,e){return If(t,this.userId,e)}zt(t){return Ef(t).get(this.userId).next((t=>t||new wd(this.userId,-1,"")))}}function If(t,e,n){const r=Id.prefixForPath(e,n.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return Tf(t).Ot({range:s,$t:!0},((t,n,r)=>{const[s,a,c]=t;s===e&&a===i&&(o=!0),r.done()})).next((()=>o))}function _f(t){return Wd(t,bd.store)}function Tf(t){return Wd(t,Id.store)}function Ef(t){return Wd(t,wd.store)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sf{constructor(t){this.Ht=t}next(){return this.Ht+=2,this.Ht}static Jt(){return new Sf(0)}static Yt(){return new Sf(-1)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{constructor(t,e){this.referenceDelegate=t,this.R=e}allocateTargetId(t){return this.Xt(t).next((e=>{const n=new Sf(e.highestTargetId);return e.highestTargetId=n.next(),this.Zt(t,e).next((()=>e.highestTargetId))}))}getLastRemoteSnapshotVersion(t){return this.Xt(t).next((t=>mu.fromTimestamp(new gu(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(t){return this.Xt(t).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(t,e,n){return this.Xt(t).next((r=>(r.highestListenSequenceNumber=e,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),e>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=e),this.Zt(t,r))))}addTargetData(t,e){return this.te(t,e).next((()=>this.Xt(t).next((n=>(n.targetCount+=1,this.ee(e,n),this.Zt(t,n))))))}updateTargetData(t,e){return this.te(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next((()=>Cf(t).delete(e.targetId))).next((()=>this.Xt(t))).next((e=>(cu(e.targetCount>0),e.targetCount-=1,this.Zt(t,e))))}removeTargets(t,e,n){let r=0;const i=[];return Cf(t).Ot(((s,o)=>{const a=of(o);a.sequenceNumber<=e&&null===n.get(a.targetId)&&(r++,i.push(this.removeTargetData(t,a)))})).next((()=>Ud.waitFor(i))).next((()=>r))}forEachTarget(t,e){return Cf(t).Ot(((t,n)=>{const r=of(n);e(r)}))}Xt(t){return Af(t).get(Ad.key).next((t=>(cu(null!==t),t)))}Zt(t,e){return Af(t).put(Ad.key,e)}te(t,e){return Cf(t).put(af(this.R,e))}ee(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.Xt(t).next((t=>t.targetCount))}getTargetData(t,e){const n=th(e),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return Cf(t).Ot({range:r,index:kd.queryTargetsIndexName},((t,n,r)=>{const s=of(n);eh(e,s.target)&&(i=s,r.done())})).next((()=>i))}addMatchingKeys(t,e,n){const r=[],i=Rf(t);return e.forEach((e=>{const s=fd(e.path);r.push(i.put(new Cd(n,s))),r.push(this.referenceDelegate.addReference(t,n,e))})),Ud.waitFor(r)}removeMatchingKeys(t,e,n){const r=Rf(t);return Ud.forEach(e,(e=>{const i=fd(e.path);return Ud.waitFor([r.delete([n,i]),this.referenceDelegate.removeReference(t,n,e)])}))}removeMatchingKeysForTargetId(t,e){const n=Rf(t),r=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),r=Rf(t);let i=Tl();return r.Ot({range:n,$t:!0},((t,e,n)=>{const r=md(t[1]),s=new Pu(r);i=i.add(s)})).next((()=>i))}containsKey(t,e){const n=fd(e.path),r=IDBKeyRange.bound([n],[pu(n)],!1,!0);let i=0;return Rf(t).Ot({index:Cd.documentTargetsIndex,$t:!0,range:r},(([t,e],n,r)=>{0!==t&&(i++,r.done())})).next((()=>i>0))}lt(t,e){return Cf(t).get(e).next((t=>t?of(t):null))}}function Cf(t){return Wd(t,kd.store)}function Af(t){return Wd(t,Ad.store)}function Rf(t){return Wd(t,Cd.store)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nf(t){if(t.code!==Zc.FAILED_PRECONDITION||t.message!==Ld)throw t;ru("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Df([t,e],[n,r]){const i=du(t,n);return 0===i?du(e,r):i}class xf{constructor(t){this.ne=t,this.buffer=new gl(Df),this.se=0}ie(){return++this.se}re(t){const e=[t,this.ie()];if(this.buffer.size<this.ne)this.buffer=this.buffer.add(e);else{const t=this.buffer.last();Df(e,t)<0&&(this.buffer=this.buffer.delete(t).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Of{constructor(t,e){this.garbageCollector=t,this.asyncQueue=e,this.oe=!1,this.ce=null}start(t){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.ue(t)}stop(){this.ce&&(this.ce.cancel(),this.ce=null)}get started(){return null!==this.ce}ue(t){const e=this.oe?3e5:6e4;ru("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.ce=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.ce=null,this.oe=!0;try{await t.collectGarbage(this.garbageCollector)}catch(e){Bd(e)?ru("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",e):await Nf(e)}await this.ue(t)}))}}class Lf{constructor(t,e){this.ae=t,this.params=e}calculateTargetCount(t,e){return this.ae.he(t).next((t=>Math.floor(e/100*t)))}nthSequenceNumber(t,e){if(0===e)return Ud.resolve(Jc.o);const n=new xf(e);return this.ae.forEachTarget(t,(t=>n.re(t.sequenceNumber))).next((()=>this.ae.le(t,(t=>n.re(t))))).next((()=>n.maxValue))}removeTargets(t,e,n){return this.ae.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.ae.removeOrphanedDocuments(t,e)}collect(t,e){return-1===this.params.cacheSizeCollectionThreshold?(ru("LruGarbageCollector","Garbage collection skipped; disabled"),Ud.resolve(mf)):this.getCacheSize(t).next((n=>n<this.params.cacheSizeCollectionThreshold?(ru("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),mf):this.fe(t,e)))}getCacheSize(t){return this.ae.getCacheSize(t)}fe(t,e){let n,r,i,s,o,a,c;const u=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((e=>(e>this.params.maximumSequenceNumbersToCollect?(ru("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`),r=this.params.maximumSequenceNumbersToCollect):r=e,s=Date.now(),this.nthSequenceNumber(t,r)))).next((r=>(n=r,o=Date.now(),this.removeTargets(t,n,e)))).next((e=>(i=e,a=Date.now(),this.removeOrphanedDocuments(t,n)))).next((t=>(c=Date.now(),nu()<=ke.DEBUG&&ru("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${s-u}ms\n\tDetermined least recently used ${r} in `+(o-s)+`ms\n\tRemoved ${i} targets in `+(a-o)+`ms\n\tRemoved ${t} documents in `+(c-a)+`ms\nTotal Duration: ${c-u}ms`),Ud.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:t}))))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pf{constructor(t,e){this.db=t,this.garbageCollector=new Lf(this,e)}he(t){const e=this.de(t);return this.db.getTargetCache().getTargetCount(t).next((t=>e.next((e=>t+e))))}de(t){let e=0;return this.le(t,(t=>{e++})).next((()=>e))}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}le(t,e){return this.we(t,((t,n)=>e(n)))}addReference(t,e,n){return Mf(t,n)}removeReference(t,e,n){return Mf(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return Mf(t,e)}_e(t,e){return function(t,e){let n=!1;return Ef(t).Ft((r=>If(t,r,e).next((t=>(t&&(n=!0),Ud.resolve(!t)))))).next((()=>n))}(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let i=0;return this.we(t,((s,o)=>{if(o<=e){const e=this._e(t,s).next((e=>{if(!e)return i++,n.getEntry(t,s).next((()=>(n.removeEntry(s),Rf(t).delete([0,fd(s.path)]))))}));r.push(e)}})).next((()=>Ud.waitFor(r))).next((()=>n.apply(t))).next((()=>i))}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return Mf(t,e)}we(t,e){const n=Rf(t);let r,i=Jc.o;return n.Ot({index:Cd.documentTargetsIndex},(([t,n],{path:s,sequenceNumber:o})=>{0===t?(i!==Jc.o&&e(new Pu(md(r)),i),i=o,r=s):i=Jc.o})).next((()=>{i!==Jc.o&&e(new Pu(md(r)),i)}))}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function Mf(t,e){return Rf(t).put((n=e,r=t.currentSequenceNumber,new Cd(0,fd(n.path),r)));var n,r}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uf{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={}}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[r,i]of n)if(this.equalsFn(r,t))return i}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),r=this.inner[n];if(void 0!==r){for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],t))return void(r[n]=[t,e]);r.push([t,e])}else this.inner[n]=[[t,e]]}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],t))return 1===n.length?delete this.inner[e]:n.splice(r,1),!0;return!1}forEach(t){vu(this.inner,((e,n)=>{for(const[r,i]of n)t(r,i)}))}isEmpty(){return wu(this.inner)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ff{constructor(){this.changes=new Uf((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}getReadTime(t){const e=this.changes.get(t);return e?e.readTime:mu.min()}addEntry(t,e){this.assertNotApplied(),this.changes.set(t.key,{document:t,readTime:e})}removeEntry(t,e=null){this.assertNotApplied(),this.changes.set(t,{document:Yu.newInvalidDocument(t),readTime:e})}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?Ud.resolve(n.document):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vf{constructor(t,e){this.R=t,this.qt=e}addEntry(t,e,n){return Bf(t).put($f(e),n)}removeEntry(t,e){const n=Bf(t),r=$f(e);return n.delete(r)}updateMetadata(t,e){return this.getMetadata(t).next((n=>(n.byteSize+=e,this.me(t,n))))}getEntry(t,e){return Bf(t).get($f(e)).next((t=>this.ge(e,t)))}ye(t,e){return Bf(t).get($f(e)).next((t=>({document:this.ge(e,t),size:wf(t)})))}getEntries(t,e){let n=vl();return this.pe(t,e,((t,e)=>{const r=this.ge(t,e);n=n.insert(t,r)})).next((()=>n))}Ee(t,e){let n=vl(),r=new dl(Pu.comparator);return this.pe(t,e,((t,e)=>{const i=this.ge(t,e);n=n.insert(t,i),r=r.insert(t,wf(e))})).next((()=>({documents:n,Te:r})))}pe(t,e,n){if(e.isEmpty())return Ud.resolve();const r=IDBKeyRange.bound(e.first().path.toArray(),e.last().path.toArray()),i=e.getIterator();let s=i.getNext();return Bf(t).Ot({range:r},((t,e,r)=>{const o=Pu.fromSegments(t);for(;s&&Pu.comparator(s,o)<0;)n(s,null),s=i.getNext();s&&s.isEqual(o)&&(n(s,e),s=i.hasNext()?i.getNext():null),s?r.Ct(s.path.toArray()):r.done()})).next((()=>{for(;s;)n(s,null),s=i.hasNext()?i.getNext():null}))}getDocumentsMatchingQuery(t,e,n){let r=vl();const i=e.path.length+1,s={};if(n.isEqual(mu.min())){const t=e.path.toArray();s.range=IDBKeyRange.lowerBound(t)}else{const t=e.path.toArray(),r=ef(n);s.range=IDBKeyRange.lowerBound([t,r],!0),s.index=Ed.collectionReadTimeIndex}return Bf(t).Ot(s,((t,n,s)=>{if(t.length!==i)return;const o=Zd(this.R,n);e.path.isPrefixOf(o.key.path)?Ch(e,o)&&(r=r.insert(o.key,o)):s.done()})).next((()=>r))}newChangeBuffer(t){return new jf(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next((t=>t.byteSize))}getMetadata(t){return qf(t).get(Sd.key).next((t=>(cu(!!t),t)))}me(t,e){return qf(t).put(Sd.key,e)}ge(t,e){if(e){const t=Zd(this.R,e);if(!t.isNoDocument()||!t.version.isEqual(mu.min()))return t}return Yu.newInvalidDocument(t)}}class jf extends Ff{constructor(t,e){super(),this.Ie=t,this.trackRemovals=e,this.Ae=new Uf((t=>t.toString()),((t,e)=>t.isEqual(e)))}applyChanges(t){const e=[];let n=0,r=new gl(((t,e)=>du(t.canonicalString(),e.canonicalString())));return this.changes.forEach(((i,s)=>{const o=this.Ae.get(i);if(s.document.isValidDocument()){const a=tf(this.Ie.R,s.document,this.getReadTime(i));r=r.add(i.path.popLast());const c=wf(a);n+=c-o,e.push(this.Ie.addEntry(t,i,a))}else if(n-=o,this.trackRemovals){const n=tf(this.Ie.R,Yu.newNoDocument(i,mu.min()),this.getReadTime(i));e.push(this.Ie.addEntry(t,i,n))}else e.push(this.Ie.removeEntry(t,i))})),r.forEach((n=>{e.push(this.Ie.qt.addToCollectionParentIndex(t,n))})),e.push(this.Ie.updateMetadata(t,n)),Ud.waitFor(e)}getFromCache(t,e){return this.Ie.ye(t,e).next((t=>(this.Ae.set(e,t.size),t.document)))}getAllFromCache(t,e){return this.Ie.Ee(t,e).next((({documents:t,Te:e})=>(e.forEach(((t,e)=>{this.Ae.set(t,e)})),t)))}}function qf(t){return Wd(t,Sd.store)}function Bf(t){return Wd(t,Ed.store)}function $f(t){return t.path.toArray()}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{constructor(t){this.R=t}Rt(t,e,n,r){cu(n<r&&n>=0&&r<=11);const i=new Fd("createOrUpgrade",e);n<1&&r>=1&&(t.createObjectStore(vd.store),function(t){t.createObjectStore(wd.store,{keyPath:wd.keyPath}),t.createObjectStore(bd.store,{keyPath:bd.keyPath,autoIncrement:!0}).createIndex(bd.userMutationsIndex,bd.userMutationsKeyPath,{unique:!0}),t.createObjectStore(Id.store)}(t),Kf(t),function(t){t.createObjectStore(Ed.store)}(t));let s=Ud.resolve();return n<3&&r>=3&&(0!==n&&(function(t){t.deleteObjectStore(Cd.store),t.deleteObjectStore(kd.store),t.deleteObjectStore(Ad.store)}(t),Kf(t)),s=s.next((()=>function(t){const e=t.store(Ad.store),n=new Ad(0,0,mu.min().toTimestamp(),0);return e.put(Ad.key,n)}(i)))),n<4&&r>=4&&(0!==n&&(s=s.next((()=>function(t,e){return e.store(bd.store).Nt().next((n=>{t.deleteObjectStore(bd.store),t.createObjectStore(bd.store,{keyPath:bd.keyPath,autoIncrement:!0}).createIndex(bd.userMutationsIndex,bd.userMutationsKeyPath,{unique:!0});const r=e.store(bd.store),i=n.map((t=>r.put(t)));return Ud.waitFor(i)}))}(t,i)))),s=s.next((()=>{!function(t){t.createObjectStore(Nd.store,{keyPath:Nd.keyPath})}(t)}))),n<5&&r>=5&&(s=s.next((()=>this.Re(i)))),n<6&&r>=6&&(s=s.next((()=>(function(t){t.createObjectStore(Sd.store)}(t),this.Pe(i))))),n<7&&r>=7&&(s=s.next((()=>this.be(i)))),n<8&&r>=8&&(s=s.next((()=>this.ve(t,i)))),n<9&&r>=9&&(s=s.next((()=>{!function(t){t.objectStoreNames.contains("remoteDocumentChanges")&&t.deleteObjectStore("remoteDocumentChanges")}(t),function(t){const e=t.objectStore(Ed.store);e.createIndex(Ed.readTimeIndex,Ed.readTimeIndexPath,{unique:!1}),e.createIndex(Ed.collectionReadTimeIndex,Ed.collectionReadTimeIndexPath,{unique:!1})}(e)}))),n<10&&r>=10&&(s=s.next((()=>this.Ve(i)))),n<11&&r>=11&&(s=s.next((()=>{!function(t){t.createObjectStore(Dd.store,{keyPath:Dd.keyPath})}(t),function(t){t.createObjectStore(xd.store,{keyPath:xd.keyPath})}(t)}))),s}Pe(t){let e=0;return t.store(Ed.store).Ot(((t,n)=>{e+=wf(n)})).next((()=>{const n=new Sd(e);return t.store(Sd.store).put(Sd.key,n)}))}Re(t){const e=t.store(wd.store),n=t.store(bd.store);return e.Nt().next((e=>Ud.forEach(e,(e=>{const r=IDBKeyRange.bound([e.userId,-1],[e.userId,e.lastAcknowledgedBatchId]);return n.Nt(bd.userMutationsIndex,r).next((n=>Ud.forEach(n,(n=>{cu(n.userId===e.userId);const r=sf(this.R,n);return vf(t,e.userId,r).next((()=>{}))}))))}))))}be(t){const e=t.store(Cd.store),n=t.store(Ed.store);return t.store(Ad.store).get(Ad.key).next((t=>{const r=[];return n.Ot(((n,i)=>{const s=new Iu(n),o=[0,fd(s)];r.push(e.get(o).next((n=>{return n?Ud.resolve():(r=s,e.put(new Cd(0,fd(r),t.highestListenSequenceNumber)));var r})))})).next((()=>Ud.waitFor(r)))}))}ve(t,e){t.createObjectStore(Rd.store,{keyPath:Rd.keyPath});const n=e.store(Rd.store),r=new ff,i=t=>{if(r.add(t)){const e=t.lastSegment(),r=t.popLast();return n.put({collectionId:e,parent:fd(r)})}};return e.store(Ed.store).Ot({$t:!0},((t,e)=>{const n=new Iu(t);return i(n.popLast())})).next((()=>e.store(Id.store).Ot({$t:!0},(([t,e,n],r)=>{const s=md(e);return i(s.popLast())}))))}Ve(t){const e=t.store(kd.store);return e.Ot(((t,n)=>{const r=of(n),i=af(this.R,r);return e.put(i)}))}}function Kf(t){t.createObjectStore(Cd.store,{keyPath:Cd.keyPath}).createIndex(Cd.documentTargetsIndex,Cd.documentTargetsKeyPath,{unique:!0}),t.createObjectStore(kd.store,{keyPath:kd.keyPath}).createIndex(kd.queryTargetsIndexName,kd.queryTargetsKeyPath,{unique:!0}),t.createObjectStore(Ad.store)}const Hf="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class Gf{constructor(t,e,n,r,i,s,o,a,c,u){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.Se=i,this.window=s,this.document=o,this.De=c,this.Ce=u,this.Ne=null,this.xe=!1,this.isPrimary=!1,this.networkEnabled=!0,this.ke=null,this.inForeground=!1,this.$e=null,this.Oe=null,this.Fe=Number.NEGATIVE_INFINITY,this.Me=t=>Promise.resolve(),!Gf.gt())throw new tu(Zc.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");var h,l;this.referenceDelegate=new Pf(this,r),this.Le=e+"main",this.R=new Jd(a),this.Be=new Vd(this.Le,11,new zf(this.R)),this.Ue=new kf(this.referenceDelegate,this.R),this.qt=new pf,this.qe=(h=this.R,l=this.qt,new Vf(h,l)),this.Ke=new uf,this.window&&this.window.localStorage?this.je=this.window.localStorage:(this.je=null,!1===u&&iu("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Qe().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new tu(Zc.FAILED_PRECONDITION,Hf);return this.We(),this.Ge(),this.ze(),this.runTransaction("getHighestListenSequenceNumber","readonly",(t=>this.Ue.getHighestSequenceNumber(t)))})).then((t=>{this.Ne=new Jc(t,this.De)})).then((()=>{this.xe=!0})).catch((t=>(this.Be&&this.Be.close(),Promise.reject(t))))}He(t){return this.Me=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.Be.bt((async e=>{null===e.newVersion&&await t()}))}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.Se.enqueueAndForget((async()=>{this.started&&await this.Qe()})))}Qe(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(t=>Qf(t).put(new Nd(this.clientId,Date.now(),this.networkEnabled,this.inForeground)).next((()=>{if(this.isPrimary)return this.Je(t).next((t=>{t||(this.isPrimary=!1,this.Se.enqueueRetryable((()=>this.Me(!1))))}))})).next((()=>this.Ye(t))).next((e=>this.isPrimary&&!e?this.Xe(t).next((()=>!1)):!!e&&this.Ze(t).next((()=>!0)))))).catch((t=>{if(Bd(t))return ru("IndexedDbPersistence","Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return ru("IndexedDbPersistence","Releasing owner lease after error during lease refresh",t),!1})).then((t=>{this.isPrimary!==t&&this.Se.enqueueRetryable((()=>this.Me(t))),this.isPrimary=t}))}Je(t){return Wf(t).get(vd.key).next((t=>Ud.resolve(this.tn(t))))}en(t){return Qf(t).delete(this.clientId)}async nn(){if(this.isPrimary&&!this.sn(this.Fe,18e5)){this.Fe=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const e=Wd(t,Nd.store);return e.Nt().next((t=>{const n=this.rn(t,18e5),r=t.filter((t=>-1===n.indexOf(t)));return Ud.forEach(r,(t=>e.delete(t.clientId))).next((()=>r))}))})).catch((()=>[]));if(this.je)for(const e of t)this.je.removeItem(this.on(e.clientId))}}ze(){this.Oe=this.Se.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.Qe().then((()=>this.nn())).then((()=>this.ze()))))}tn(t){return!!t&&t.ownerId===this.clientId}Ye(t){return this.Ce?Ud.resolve(!0):Wf(t).get(vd.key).next((e=>{if(null!==e&&this.sn(e.leaseTimestampMs,5e3)&&!this.cn(e.ownerId)){if(this.tn(e)&&this.networkEnabled)return!0;if(!this.tn(e)){if(!e.allowTabSynchronization)throw new tu(Zc.FAILED_PRECONDITION,Hf);return!1}}return!(!this.networkEnabled||!this.inForeground)||Qf(t).Nt().next((t=>void 0===this.rn(t,5e3).find((t=>{if(this.clientId!==t.clientId){const e=!this.networkEnabled&&t.networkEnabled,n=!this.inForeground&&t.inForeground,r=this.networkEnabled===t.networkEnabled;if(e||n&&r)return!0}return!1}))))})).next((t=>(this.isPrimary!==t&&ru("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.xe=!1,this.un(),this.Oe&&(this.Oe.cancel(),this.Oe=null),this.an(),this.hn(),await this.Be.runTransaction("shutdown","readwrite",[vd.store,Nd.store],(t=>{const e=new Gd(t,Jc.o);return this.Xe(e).next((()=>this.en(e)))})),this.Be.close(),this.ln()}rn(t,e){return t.filter((t=>this.sn(t.updateTimeMs,e)&&!this.cn(t.clientId)))}fn(){return this.runTransaction("getActiveClients","readonly",(t=>Qf(t).Nt().next((t=>this.rn(t,18e5).map((t=>t.clientId))))))}get started(){return this.xe}getMutationQueue(t){return bf.jt(t,this.R,this.qt,this.referenceDelegate)}getTargetCache(){return this.Ue}getRemoteDocumentCache(){return this.qe}getIndexManager(){return this.qt}getBundleCache(){return this.Ke}runTransaction(t,e,n){ru("IndexedDbPersistence","Starting transaction:",t);const r="readonly"===e?"readonly":"readwrite";let i;return this.Be.runTransaction(t,r,Od,(r=>(i=new Gd(r,this.Ne?this.Ne.next():Jc.o),"readwrite-primary"===e?this.Je(i).next((t=>!!t||this.Ye(i))).next((e=>{if(!e)throw iu(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.Se.enqueueRetryable((()=>this.Me(!1))),new tu(Zc.FAILED_PRECONDITION,Ld);return n(i)})).next((t=>this.Ze(i).next((()=>t)))):this.dn(i).next((()=>n(i)))))).then((t=>(i.raiseOnCommittedEvent(),t)))}dn(t){return Wf(t).get(vd.key).next((t=>{if(null!==t&&this.sn(t.leaseTimestampMs,5e3)&&!this.cn(t.ownerId)&&!this.tn(t)&&!(this.Ce||this.allowTabSynchronization&&t.allowTabSynchronization))throw new tu(Zc.FAILED_PRECONDITION,Hf)}))}Ze(t){const e=new vd(this.clientId,this.allowTabSynchronization,Date.now());return Wf(t).put(vd.key,e)}static gt(){return Vd.gt()}Xe(t){const e=Wf(t);return e.get(vd.key).next((t=>this.tn(t)?(ru("IndexedDbPersistence","Releasing primary lease."),e.delete(vd.key)):Ud.resolve()))}sn(t,e){const n=Date.now();return!(t<n-e||t>n&&(iu(`Detected an update time that is in the future: ${t} > ${n}`),1))}We(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.$e=()=>{this.Se.enqueueAndForget((()=>(this.inForeground="visible"===this.document.visibilityState,this.Qe())))},this.document.addEventListener("visibilitychange",this.$e),this.inForeground="visible"===this.document.visibilityState)}an(){this.$e&&(this.document.removeEventListener("visibilitychange",this.$e),this.$e=null)}Ge(){var t;"function"==typeof(null===(t=this.window)||void 0===t?void 0:t.addEventListener)&&(this.ke=()=>{this.un(),pe()&&navigator.appVersion.match("Version/14")&&this.Se.enterRestrictedMode(!0),this.Se.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.ke))}hn(){this.ke&&(this.window.removeEventListener("pagehide",this.ke),this.ke=null)}cn(t){var e;try{const n=null!==(null===(e=this.je)||void 0===e?void 0:e.getItem(this.on(t)));return ru("IndexedDbPersistence",`Client '${t}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return iu("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}un(){if(this.je)try{this.je.setItem(this.on(this.clientId),String(Date.now()))}catch(t){iu("Failed to set zombie client id.",t)}}ln(){if(this.je)try{this.je.removeItem(this.on(this.clientId))}catch(t){}}on(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function Wf(t){return Wd(t,vd.store)}function Qf(t){return Wd(t,Nd.store)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Xf{constructor(t,e,n){this.qe=t,this._n=e,this.qt=n}mn(t,e){return this._n.getAllMutationBatchesAffectingDocumentKey(t,e).next((n=>this.gn(t,e,n)))}gn(t,e,n){return this.qe.getEntry(t,e).next((t=>{for(const e of n)e.applyToLocalView(t);return t}))}yn(t,e){t.forEach(((t,n)=>{for(const r of e)r.applyToLocalView(n)}))}pn(t,e){return this.qe.getEntries(t,e).next((e=>this.En(t,e).next((()=>e))))}En(t,e){return this._n.getAllMutationBatchesAffectingDocumentKeys(t,e).next((t=>this.yn(e,t)))}getDocumentsMatchingQuery(t,e,n){return r=e,Pu.isDocumentKey(r.path)&&null===r.collectionGroup&&0===r.filters.length?this.Tn(t,e.path):function(t){return null!==t.collectionGroup}(e)?this.In(t,e,n):this.An(t,e,n);var r}Tn(t,e){return this.mn(t,new Pu(e)).next((t=>{let e=bl();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e}))}In(t,e,n){const r=e.collectionGroup;let i=bl();return this.qt.getCollectionParents(t,r).next((s=>Ud.forEach(s,(s=>{const o=(a=e,c=s.child(r),new vh(c,null,a.explicitOrderBy.slice(),a.filters.slice(),a.limit,a.limitType,a.startAt,a.endAt));var a,c;return this.An(t,o,n).next((t=>{t.forEach(((t,e)=>{i=i.insert(t,e)}))}))})).next((()=>i))))}An(t,e,n){let r,i;return this.qe.getDocumentsMatchingQuery(t,e,n).next((n=>(r=n,this._n.getAllMutationBatchesAffectingQuery(t,e)))).next((e=>(i=e,this.Rn(t,i,r).next((t=>{r=t;for(const e of i)for(const t of e.mutations){const n=t.key;let i=r.get(n);null==i&&(i=Yu.newInvalidDocument(n),r=r.insert(n,i)),Yh(t,i,e.localWriteTime),i.isFoundDocument()||(r=r.remove(n))}}))))).next((()=>(r.forEach(((t,n)=>{Ch(e,n)||(r=r.remove(t))})),r)))}Rn(t,e,n){let r=Tl();for(const s of e)for(const t of s.mutations)t instanceof nl&&null===n.get(t.key)&&(r=r.add(t.key));let i=n;return this.qe.getEntries(t,r).next((t=>(t.forEach(((t,e)=>{e.isFoundDocument()&&(i=i.insert(t,e))})),i)))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yf{constructor(t,e,n,r){this.targetId=t,this.fromCache=e,this.Pn=n,this.bn=r}static vn(t,e){let n=Tl(),r=Tl();for(const i of e.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Yf(t,e.fromCache,n,r)}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{Vn(t){this.Sn=t}getDocumentsMatchingQuery(t,e,n,r){return 0===(i=e).filters.length&&null===i.limit&&null==i.startAt&&null==i.endAt&&(0===i.explicitOrderBy.length||1===i.explicitOrderBy.length&&i.explicitOrderBy[0].field.isKeyField())||n.isEqual(mu.min())?this.Dn(t,e):this.Sn.pn(t,r).next((i=>{const s=this.Cn(e,i);return(bh(e)||Ih(e))&&this.Nn(e.limitType,s,r,n)?this.Dn(t,e):(nu()<=ke.DEBUG&&ru("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),kh(e)),this.Sn.getDocumentsMatchingQuery(t,e,n).next((t=>(s.forEach((e=>{t=t.insert(e.key,e)})),t))))}));var i}Cn(t,e){let n=new gl(Ah(t));return e.forEach(((e,r)=>{Ch(t,r)&&(n=n.add(r))})),n}Nn(t,e,n,r){if(n.size!==e.size)return!0;const i="F"===t?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Dn(t,e){return nu()<=ke.DEBUG&&ru("QueryEngine","Using full collection scan to execute query:",kh(e)),this.Sn.getDocumentsMatchingQuery(t,e,mu.min())}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zf{constructor(t,e,n,r){this.persistence=t,this.xn=e,this.R=r,this.kn=new dl(du),this.$n=new Uf((t=>th(t)),eh),this.On=mu.min(),this._n=t.getMutationQueue(n),this.Fn=t.getRemoteDocumentCache(),this.Ue=t.getTargetCache(),this.Mn=new Xf(this.Fn,this._n,this.persistence.getIndexManager()),this.Ke=t.getBundleCache(),this.xn.Vn(this.Mn)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.kn)))}}function tp(t,e,n,r){return new Zf(t,e,n,r)}async function ep(t,e){const n=uu(t);let r=n._n,i=n.Mn;const s=await n.persistence.runTransaction("Handle user change","readonly",(t=>{let s;return n._n.getAllMutationBatches(t).next((o=>(s=o,r=n.persistence.getMutationQueue(e),i=new Xf(n.Fn,r,n.persistence.getIndexManager()),r.getAllMutationBatches(t)))).next((e=>{const n=[],r=[];let o=Tl();for(const t of s){n.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}for(const t of e){r.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}return i.pn(t,o).next((t=>({Ln:t,removedBatchIds:n,addedBatchIds:r})))}))}));return n._n=r,n.Mn=i,n.xn.Vn(n.Mn),s}function np(t){const e=uu(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Ue.getLastRemoteSnapshotVersion(t)))}function rp(t,e){const n=uu(t),r=e.snapshotVersion;let i=n.kn;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(t=>{const s=n.Fn.newChangeBuffer({trackRemovals:!0});i=n.kn;const o=[];e.targetChanges.forEach(((e,s)=>{const a=i.get(s);if(!a)return;o.push(n.Ue.removeMatchingKeys(t,e.removedDocuments,s).next((()=>n.Ue.addMatchingKeys(t,e.addedDocuments,s))));const c=e.resumeToken;if(c.approximateByteSize()>0){const d=a.withResumeToken(c,r).withSequenceNumber(t.currentSequenceNumber);i=i.insert(s,d),u=a,l=e,cu((h=d).resumeToken.approximateByteSize()>0),(0===u.resumeToken.approximateByteSize()||h.snapshotVersion.toMicroseconds()-u.snapshotVersion.toMicroseconds()>=3e8||l.addedDocuments.size+l.modifiedDocuments.size+l.removedDocuments.size>0)&&o.push(n.Ue.updateTargetData(t,d))}var u,h,l}));let a=vl();if(e.documentUpdates.forEach(((r,i)=>{e.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,r))})),o.push(function(t,e,n,r,i){let s=Tl();return n.forEach((t=>s=s.add(t))),e.getEntries(t,s).next((t=>{let s=vl();return n.forEach(((n,o)=>{const a=t.get(n),c=(null==i?void 0:i.get(n))||r;o.isNoDocument()&&o.version.isEqual(mu.min())?(e.removeEntry(n,c),s=s.insert(n,o)):!a.isValidDocument()||o.version.compareTo(a.version)>0||0===o.version.compareTo(a.version)&&a.hasPendingWrites?(e.addEntry(o,c),s=s.insert(n,o)):ru("LocalStore","Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",o.version)})),s}))}(t,s,e.documentUpdates,r,void 0).next((t=>{a=t}))),!r.isEqual(mu.min())){const e=n.Ue.getLastRemoteSnapshotVersion(t).next((e=>n.Ue.setTargetsMetadata(t,t.currentSequenceNumber,r)));o.push(e)}return Ud.waitFor(o).next((()=>s.apply(t))).next((()=>n.Mn.En(t,a))).next((()=>a))})).then((t=>(n.kn=i,t)))}function ip(t,e){const n=uu(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(t=>(void 0===e&&(e=-1),n._n.getNextMutationBatchAfterBatchId(t,e))))}async function sp(t,e,n){const r=uu(t),i=r.kn.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,(t=>r.persistence.referenceDelegate.removeTarget(t,i)))}catch(o){if(!Bd(o))throw o;ru("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.kn=r.kn.remove(e),r.$n.delete(i.target)}function op(t,e,n){const r=uu(t);let i=mu.min(),s=Tl();return r.persistence.runTransaction("Execute query","readonly",(t=>function(t,e,n){const r=uu(t),i=r.$n.get(n);return void 0!==i?Ud.resolve(r.kn.get(i)):r.Ue.getTargetData(e,n)}(r,t,Th(e)).next((e=>{if(e)return i=e.lastLimboFreeSnapshotVersion,r.Ue.getMatchingKeysForTargetId(t,e.targetId).next((t=>{s=t}))})).next((()=>r.xn.getDocumentsMatchingQuery(t,e,n?i:mu.min(),n?s:Tl()))).next((t=>({documents:t,Bn:s})))))}async function ap(t){const e=uu(t);return e.persistence.runTransaction("Synchronize last document change read time","readonly",(t=>function(t){const e=Bf(t);let n=mu.min();return e.Ot({index:Ed.readTimeIndex,reverse:!0},((t,e,r)=>{e.readTime&&(n=function(t){const e=new gu(t[0],t[1]);return mu.fromTimestamp(e)}(e.readTime)),r.done()})).next((()=>n))}(t))).then((t=>{e.On=t}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cp{constructor(t){this.R=t,this.jn=new Map,this.Qn=new Map}getBundleMetadata(t,e){return Ud.resolve(this.jn.get(e))}saveBundleMetadata(t,e){var n;return this.jn.set(e.id,{id:(n=e).id,version:n.version,createTime:ql(n.createTime)}),Ud.resolve()}getNamedQuery(t,e){return Ud.resolve(this.Qn.get(e))}saveNamedQuery(t,e){return this.Qn.set(e.name,{name:(n=e).name,query:cf(n.bundledQuery),readTime:ql(n.readTime)}),Ud.resolve();var n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(){this.Wn=new gl(hp.Gn),this.zn=new gl(hp.Hn)}isEmpty(){return this.Wn.isEmpty()}addReference(t,e){const n=new hp(t,e);this.Wn=this.Wn.add(n),this.zn=this.zn.add(n)}Jn(t,e){t.forEach((t=>this.addReference(t,e)))}removeReference(t,e){this.Yn(new hp(t,e))}Xn(t,e){t.forEach((t=>this.removeReference(t,e)))}Zn(t){const e=new Pu(new Iu([])),n=new hp(e,t),r=new hp(e,t+1),i=[];return this.zn.forEachInRange([n,r],(t=>{this.Yn(t),i.push(t.key)})),i}ts(){this.Wn.forEach((t=>this.Yn(t)))}Yn(t){this.Wn=this.Wn.delete(t),this.zn=this.zn.delete(t)}es(t){const e=new Pu(new Iu([])),n=new hp(e,t),r=new hp(e,t+1);let i=Tl();return this.zn.forEachInRange([n,r],(t=>{i=i.add(t.key)})),i}containsKey(t){const e=new hp(t,0),n=this.Wn.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class hp{constructor(t,e){this.key=t,this.ns=e}static Gn(t,e){return Pu.comparator(t.key,e.key)||du(t.ns,e.ns)}static Hn(t,e){return du(t.ns,e.ns)||Pu.comparator(t.key,e.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lp{constructor(t,e){this.qt=t,this.referenceDelegate=e,this._n=[],this.ss=1,this.rs=new gl(hp.Gn)}checkEmpty(t){return Ud.resolve(0===this._n.length)}addMutationBatch(t,e,n,r){const i=this.ss;this.ss++,this._n.length>0&&this._n[this._n.length-1];const s=new Qd(i,e,n,r);this._n.push(s);for(const o of r)this.rs=this.rs.add(new hp(o.key,i)),this.qt.addToCollectionParentIndex(t,o.key.path.popLast());return Ud.resolve(s)}lookupMutationBatch(t,e){return Ud.resolve(this.os(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=this.cs(n),i=r<0?0:r;return Ud.resolve(this._n.length>i?this._n[i]:null)}getHighestUnacknowledgedBatchId(){return Ud.resolve(0===this._n.length?-1:this.ss-1)}getAllMutationBatches(t){return Ud.resolve(this._n.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new hp(e,0),r=new hp(e,Number.POSITIVE_INFINITY),i=[];return this.rs.forEachInRange([n,r],(t=>{const e=this.os(t.ns);i.push(e)})),Ud.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new gl(du);return e.forEach((t=>{const e=new hp(t,0),r=new hp(t,Number.POSITIVE_INFINITY);this.rs.forEachInRange([e,r],(t=>{n=n.add(t.ns)}))})),Ud.resolve(this.us(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1;let i=n;Pu.isDocumentKey(i)||(i=i.child(""));const s=new hp(new Pu(i),0);let o=new gl(du);return this.rs.forEachWhile((t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===r&&(o=o.add(t.ns)),!0)}),s),Ud.resolve(this.us(o))}us(t){const e=[];return t.forEach((t=>{const n=this.os(t);null!==n&&e.push(n)})),e}removeMutationBatch(t,e){cu(0===this.hs(e.batchId,"removed")),this._n.shift();let n=this.rs;return Ud.forEach(e.mutations,(r=>{const i=new hp(r.key,e.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,r.key)})).next((()=>{this.rs=n}))}Gt(t){}containsKey(t,e){const n=new hp(e,0),r=this.rs.firstAfterOrEqual(n);return Ud.resolve(e.isEqual(r&&r.key))}performConsistencyCheck(t){return this._n.length,Ud.resolve()}hs(t,e){return this.cs(t)}cs(t){return 0===this._n.length?0:t-this._n[0].batchId}os(t){const e=this.cs(t);return e<0||e>=this._n.length?null:this._n[e]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dp{constructor(t,e){this.qt=t,this.ls=e,this.docs=new dl(Pu.comparator),this.size=0}addEntry(t,e,n){const r=e.key,i=this.docs.get(r),s=i?i.size:0,o=this.ls(e);return this.docs=this.docs.insert(r,{document:e.clone(),size:o,readTime:n}),this.size+=o-s,this.qt.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return Ud.resolve(n?n.document.clone():Yu.newInvalidDocument(e))}getEntries(t,e){let n=vl();return e.forEach((t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.clone():Yu.newInvalidDocument(t))})),Ud.resolve(n)}getDocumentsMatchingQuery(t,e,n){let r=vl();const i=new Pu(e.path.child("")),s=this.docs.getIteratorFrom(i);for(;s.hasNext();){const{key:t,value:{document:i,readTime:o}}=s.getNext();if(!e.path.isPrefixOf(t.path))break;o.compareTo(n)<=0||Ch(e,i)&&(r=r.insert(i.key,i.clone()))}return Ud.resolve(r)}fs(t,e){return Ud.forEach(this.docs,(t=>e(t)))}newChangeBuffer(t){return new fp(this)}getSize(t){return Ud.resolve(this.size)}}class fp extends Ff{constructor(t){super(),this.Ie=t}applyChanges(t){const e=[];return this.changes.forEach(((n,r)=>{r.document.isValidDocument()?e.push(this.Ie.addEntry(t,r.document,this.getReadTime(n))):this.Ie.removeEntry(n)})),Ud.waitFor(e)}getFromCache(t,e){return this.Ie.getEntry(t,e)}getAllFromCache(t,e){return this.Ie.getEntries(t,e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pp{constructor(t){this.persistence=t,this.ds=new Uf((t=>th(t)),eh),this.lastRemoteSnapshotVersion=mu.min(),this.highestTargetId=0,this.ws=0,this._s=new up,this.targetCount=0,this.gs=Sf.Jt()}forEachTarget(t,e){return this.ds.forEach(((t,n)=>e(n))),Ud.resolve()}getLastRemoteSnapshotVersion(t){return Ud.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return Ud.resolve(this.ws)}allocateTargetId(t){return this.highestTargetId=this.gs.next(),Ud.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ws&&(this.ws=e),Ud.resolve()}te(t){this.ds.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.gs=new Sf(e),this.highestTargetId=e),t.sequenceNumber>this.ws&&(this.ws=t.sequenceNumber)}addTargetData(t,e){return this.te(e),this.targetCount+=1,Ud.resolve()}updateTargetData(t,e){return this.te(e),Ud.resolve()}removeTargetData(t,e){return this.ds.delete(e.target),this._s.Zn(e.targetId),this.targetCount-=1,Ud.resolve()}removeTargets(t,e,n){let r=0;const i=[];return this.ds.forEach(((s,o)=>{o.sequenceNumber<=e&&null===n.get(o.targetId)&&(this.ds.delete(s),i.push(this.removeMatchingKeysForTargetId(t,o.targetId)),r++)})),Ud.waitFor(i).next((()=>r))}getTargetCount(t){return Ud.resolve(this.targetCount)}getTargetData(t,e){const n=this.ds.get(e)||null;return Ud.resolve(n)}addMatchingKeys(t,e,n){return this._s.Jn(e,n),Ud.resolve()}removeMatchingKeys(t,e,n){this._s.Xn(e,n);const r=this.persistence.referenceDelegate,i=[];return r&&e.forEach((e=>{i.push(r.markPotentiallyOrphaned(t,e))})),Ud.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this._s.Zn(e),Ud.resolve()}getMatchingKeysForTargetId(t,e){const n=this._s.es(e);return Ud.resolve(n)}containsKey(t,e){return Ud.resolve(this._s.containsKey(e))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gp{constructor(t,e){var n;this.ys={},this.Ne=new Jc(0),this.xe=!1,this.xe=!0,this.referenceDelegate=t(this),this.Ue=new pp(this),this.qt=new df,this.qe=(n=this.qt,new dp(n,(t=>this.referenceDelegate.ps(t)))),this.R=new Jd(e),this.Ke=new cp(this.R)}start(){return Promise.resolve()}shutdown(){return this.xe=!1,Promise.resolve()}get started(){return this.xe}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(){return this.qt}getMutationQueue(t){let e=this.ys[t.toKey()];return e||(e=new lp(this.qt,this.referenceDelegate),this.ys[t.toKey()]=e),e}getTargetCache(){return this.Ue}getRemoteDocumentCache(){return this.qe}getBundleCache(){return this.Ke}runTransaction(t,e,n){ru("MemoryPersistence","Starting transaction:",t);const r=new mp(this.Ne.next());return this.referenceDelegate.Es(),n(r).next((t=>this.referenceDelegate.Ts(r).next((()=>t)))).toPromise().then((t=>(r.raiseOnCommittedEvent(),t)))}Is(t,e){return Ud.or(Object.values(this.ys).map((n=>()=>n.containsKey(t,e))))}}class mp extends Pd{constructor(t){super(),this.currentSequenceNumber=t}}class yp{constructor(t){this.persistence=t,this.As=new up,this.Rs=null}static Ps(t){return new yp(t)}get bs(){if(this.Rs)return this.Rs;throw au()}addReference(t,e,n){return this.As.addReference(n,e),this.bs.delete(n.toString()),Ud.resolve()}removeReference(t,e,n){return this.As.removeReference(n,e),this.bs.add(n.toString()),Ud.resolve()}markPotentiallyOrphaned(t,e){return this.bs.add(e.toString()),Ud.resolve()}removeTarget(t,e){this.As.Zn(e.targetId).forEach((t=>this.bs.add(t.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((t=>{t.forEach((t=>this.bs.add(t.toString())))})).next((()=>n.removeTargetData(t,e)))}Es(){this.Rs=new Set}Ts(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Ud.forEach(this.bs,(n=>{const r=Pu.fromPath(n);return this.vs(t,r).next((t=>{t||e.removeEntry(r)}))})).next((()=>(this.Rs=null,e.apply(t))))}updateLimboDocument(t,e){return this.vs(t,e).next((t=>{t?this.bs.delete(e.toString()):this.bs.add(e.toString())}))}ps(t){return 0}vs(t,e){return Ud.or([()=>Ud.resolve(this.As.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Is(t,e)])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}vp.UNAUTHENTICATED=new vp(null),vp.GOOGLE_CREDENTIALS=new vp("google-credentials-uid"),vp.FIRST_PARTY=new vp("first-party-uid");class wp{constructor(){this.activeTargetIds=Sl()}Ds(t){this.activeTargetIds=this.activeTargetIds.add(t)}Cs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ss(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class bp{constructor(){this.li=new wp,this.fi={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t){return this.li.Ds(t),this.fi[t]||"not-current"}updateQueryState(t,e,n){this.fi[t]=e}removeLocalQueryTarget(t){this.li.Cs(t)}isLocalQueryTarget(t){return this.li.activeTargetIds.has(t)}clearQueryState(t){delete this.fi[t]}getAllActiveQueryTargets(){return this.li.activeTargetIds}isActiveQueryTarget(t){return this.li.activeTargetIds.has(t)}start(){return this.li=new wp,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ip{di(t){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _p{constructor(){this.wi=()=>this._i(),this.mi=()=>this.gi(),this.yi=[],this.pi()}di(t){this.yi.push(t)}shutdown(){window.removeEventListener("online",this.wi),window.removeEventListener("offline",this.mi)}pi(){window.addEventListener("online",this.wi),window.addEventListener("offline",this.mi)}_i(){ru("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.yi)t(0)}gi(){ru("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.yi)t(1)}static gt(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tp={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{constructor(t){this.Ei=t.Ei,this.Ti=t.Ti}Ii(t){this.Ai=t}Ri(t){this.Pi=t}onMessage(t){this.bi=t}close(){this.Ti()}send(t){this.Ei(t)}vi(){this.Ai()}Vi(t){this.Pi(t)}Si(t){this.bi(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http";this.Di=e+"://"+t.host,this.Ci="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}Ni(t,e,n,r){const i=this.xi(t,e);ru("RestConnection","Sending: ",i,n);const s={};return this.ki(s,r),this.$i(t,i,s,n).then((t=>(ru("RestConnection","Received: ",t),t)),(e=>{throw su("RestConnection",`${t} failed with error: `,e,"url: ",i,"request:",n),e}))}Oi(t,e,n,r){return this.Ni(t,e,n,r)}ki(t,e){if(t["X-Goog-Api-Client"]="gl-js/ fire/"+Yc,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e)for(const n in e.authHeaders)e.authHeaders.hasOwnProperty(n)&&(t[n]=e.authHeaders[n])}xi(t,e){const n=Tp[t];return`${this.Di}/v1/${e}:${n}`}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams}$i(t,e,n,r){return new Promise(((i,s)=>{const o=new Xc;o.listenOnce(zc.COMPLETE,(()=>{try{switch(o.getLastErrorCode()){case $c.NO_ERROR:const e=o.getResponseJson();ru("Connection","XHR received:",JSON.stringify(e)),i(e);break;case $c.TIMEOUT:ru("Connection",'RPC "'+t+'" timed out'),s(new tu(Zc.DEADLINE_EXCEEDED,"Request time out"));break;case $c.HTTP_ERROR:const n=o.getStatus();if(ru("Connection",'RPC "'+t+'" failed with status:',n,"response text:",o.getResponseText()),n>0){const t=o.getResponseJson().error;if(t&&t.status&&t.message){const e=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(Zc).indexOf(e)>=0?e:Zc.UNKNOWN}(t.status);s(new tu(e,t.message))}else s(new tu(Zc.UNKNOWN,"Server responded with status "+o.getStatus()))}else s(new tu(Zc.UNAVAILABLE,"Connection failed."));break;default:au()}}finally{ru("Connection",'RPC "'+t+'" completed.')}}));const a=JSON.stringify(r);o.send(e,"POST",a,n,15)}))}Fi(t,e){const n=[this.Di,"/","google.firestore.v1.Firestore","/",t,"/channel"],r=new Fc,i=Do(),s={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(s.xmlHttpFactory=new Wc({})),this.ki(s.initMessageHeaders,e),he()||de()||ue().indexOf("Electron/")>=0||fe()||ue().indexOf("MSAppHost/")>=0||le()||(s.httpHeadersOverwriteParam="$httpHeaders");const o=n.join("");ru("Connection","Creating WebChannel: "+o,s);const a=r.createWebChannel(o,s);let c=!1,u=!1;const h=new Ep({Ei:t=>{u?ru("Connection","Not sending because WebChannel is closed:",t):(c||(ru("Connection","Opening WebChannel transport."),a.open(),c=!0),ru("Connection","WebChannel sending:",t),a.send(t))},Ti:()=>a.close()}),l=(t,e,n)=>{t.listen(e,(t=>{try{n(t)}catch(e){setTimeout((()=>{throw e}),0)}}))};return l(a,Qc.EventType.OPEN,(()=>{u||ru("Connection","WebChannel transport opened.")})),l(a,Qc.EventType.CLOSE,(()=>{u||(u=!0,ru("Connection","WebChannel transport closed"),h.Vi())})),l(a,Qc.EventType.ERROR,(t=>{u||(u=!0,su("Connection","WebChannel transport errored:",t),h.Vi(new tu(Zc.UNAVAILABLE,"The operation could not be completed")))})),l(a,Qc.EventType.MESSAGE,(t=>{var e;if(!u){const n=t.data[0];cu(!!n);const r=n,i=r.error||(null===(e=r[0])||void 0===e?void 0:e.error);if(i){ru("Connection","WebChannel received error:",i);const t=i.status;let e=function(t){const e=ul[t];if(void 0!==e)return ll(e)}(t),n=i.message;void 0===e&&(e=Zc.INTERNAL,n="Unknown error status: "+t+" with message "+i.message),u=!0,h.Vi(new tu(e,n)),a.close()}else ru("Connection","WebChannel received:",n),h.Si(n)}})),l(i,Kc.STAT_EVENT,(t=>{t.stat===Hc?ru("Connection","Detected buffering proxy"):t.stat===Gc&&ru("Connection","Detected no buffering proxy")})),setTimeout((()=>{h.vi()}),0),h}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kp(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cp(t){return new Ul(t,!0)}class Ap{constructor(t,e,n=1e3,r=1.5,i=6e4){this.Se=t,this.timerId=e,this.Mi=n,this.Li=r,this.Bi=i,this.Ui=0,this.qi=null,this.Ki=Date.now(),this.reset()}reset(){this.Ui=0}ji(){this.Ui=this.Bi}Qi(t){this.cancel();const e=Math.floor(this.Ui+this.Wi()),n=Math.max(0,Date.now()-this.Ki),r=Math.max(0,e-n);r>0&&ru("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Ui} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.qi=this.Se.enqueueAfterDelay(this.timerId,r,(()=>(this.Ki=Date.now(),t()))),this.Ui*=this.Li,this.Ui<this.Mi&&(this.Ui=this.Mi),this.Ui>this.Bi&&(this.Ui=this.Bi)}Gi(){null!==this.qi&&(this.qi.skipDelay(),this.qi=null)}cancel(){null!==this.qi&&(this.qi.cancel(),this.qi=null)}Wi(){return(Math.random()-.5)*this.Ui}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp{constructor(t,e,n,r,i,s){this.Se=t,this.zi=n,this.Hi=r,this.Ji=i,this.listener=s,this.state=0,this.Yi=0,this.Xi=null,this.stream=null,this.Zi=new Ap(t,e)}tr(){return 1===this.state||2===this.state||4===this.state}er(){return 2===this.state}start(){3!==this.state?this.auth():this.nr()}async stop(){this.tr()&&await this.close(0)}sr(){this.state=0,this.Zi.reset()}ir(){this.er()&&null===this.Xi&&(this.Xi=this.Se.enqueueAfterDelay(this.zi,6e4,(()=>this.rr())))}cr(t){this.ur(),this.stream.send(t)}async rr(){if(this.er())return this.close(0)}ur(){this.Xi&&(this.Xi.cancel(),this.Xi=null)}async close(t,e){this.ur(),this.Zi.cancel(),this.Yi++,3!==t?this.Zi.reset():e&&e.code===Zc.RESOURCE_EXHAUSTED?(iu(e.toString()),iu("Using maximum backoff delay to prevent overloading the backend."),this.Zi.ji()):e&&e.code===Zc.UNAUTHENTICATED&&this.Ji.invalidateToken(),null!==this.stream&&(this.ar(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Ri(e)}ar(){}auth(){this.state=1;const t=this.hr(this.Yi),e=this.Yi;this.Ji.getToken().then((t=>{this.Yi===e&&this.lr(t)}),(e=>{t((()=>{const t=new tu(Zc.UNKNOWN,"Fetching auth token failed: "+e.message);return this.dr(t)}))}))}lr(t){const e=this.hr(this.Yi);this.stream=this.wr(t),this.stream.Ii((()=>{e((()=>(this.state=2,this.listener.Ii())))})),this.stream.Ri((t=>{e((()=>this.dr(t)))})),this.stream.onMessage((t=>{e((()=>this.onMessage(t)))}))}nr(){this.state=4,this.Zi.Qi((async()=>{this.state=0,this.start()}))}dr(t){return ru("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(3,t)}hr(t){return e=>{this.Se.enqueueAndForget((()=>this.Yi===t?e():(ru("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Np extends Rp{constructor(t,e,n,r,i){super(t,"listen_stream_connection_backoff","listen_stream_idle",e,n,i),this.R=r}wr(t){return this.Hi.Fi("Listen",t)}onMessage(t){this.Zi.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const i="NO_CHANGE"===(r=e.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:au(),s=e.targetChange.targetIds||[],o=function(t,e){return t.I?(cu(void 0===e||"string"==typeof e),Su.fromBase64String(e||"")):(cu(void 0===e||e instanceof Uint8Array),Su.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(t){const e=void 0===t.code?Zc.UNKNOWN:ll(t.code);return new tu(e,t.message||"")}(a);n=new Nl(i,s,o,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Kl(t,r.document.name),s=ql(r.document.updateTime),o=new Qu({mapValue:{fields:r.document.fields}}),a=Yu.newFoundDocument(i,s,o),c=r.targetIds||[],u=r.removedTargetIds||[];n=new Al(c,u,a.key,a)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Kl(t,r.document),s=r.readTime?ql(r.readTime):mu.min(),o=Yu.newNoDocument(i,s),a=r.removedTargetIds||[];n=new Al([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Kl(t,r.document),s=r.removedTargetIds||[];n=new Al([],s,i,null)}else{if(!("filter"in e))return au();{e.filter;const t=e.filter;t.targetId;const r=t.count||0,i=new cl(r),s=t.targetId;n=new Rl(s,i)}}var r;return n}(this.R,t),n=function(t){if(!("targetChange"in t))return mu.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?mu.min():e.readTime?ql(e.readTime):mu.min()}(t);return this.listener._r(e,n)}mr(t){const e={};e.database=Wl(this.R),e.addTarget=function(t,e){let n;const r=e.target;return n=nh(r)?{documents:Zl(t,r)}:{query:td(t,r)},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0?n.resumeToken=Vl(t,e.resumeToken):e.snapshotVersion.compareTo(mu.min())>0&&(n.readTime=Fl(t,e.snapshotVersion.toTimestamp())),n}(this.R,t);const n=function(t,e){const n=function(t,e){switch(e){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return au()}}(0,e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.R,t);n&&(e.labels=n),this.cr(e)}gr(t){const e={};e.database=Wl(this.R),e.removeTarget=t,this.cr(e)}}class Dp extends Rp{constructor(t,e,n,r,i){super(t,"write_stream_connection_backoff","write_stream_idle",e,n,i),this.R=r,this.yr=!1}get pr(){return this.yr}start(){this.yr=!1,this.lastStreamToken=void 0,super.start()}ar(){this.yr&&this.Er([])}wr(t){return this.Hi.Fi("Write",t)}onMessage(t){if(cu(!!t.streamToken),this.lastStreamToken=t.streamToken,this.yr){this.Zi.reset();const e=function(t,e){return t&&t.length>0?(cu(void 0!==e),t.map((t=>function(t,e){let n=t.updateTime?ql(t.updateTime):ql(e);return n.isEqual(mu.min())&&(n=ql(e)),new Hh(n,t.transformResults||[])}(t,e)))):[]}(t.writeResults,t.commitTime),n=ql(t.commitTime);return this.listener.Tr(n,e)}return cu(!t.writeResults||0===t.writeResults.length),this.yr=!0,this.listener.Ir()}Ar(){const t={};t.database=Wl(this.R),this.cr(t)}Er(t){const e={streamToken:this.lastStreamToken,writes:t.map((t=>Yl(this.R,t)))};this.cr(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp extends class{}{constructor(t,e,n){super(),this.credentials=t,this.Hi=e,this.R=n,this.Rr=!1}Pr(){if(this.Rr)throw new tu(Zc.FAILED_PRECONDITION,"The client has already been terminated.")}Ni(t,e,n){return this.Pr(),this.credentials.getToken().then((r=>this.Hi.Ni(t,e,n,r))).catch((t=>{throw"FirebaseError"===t.name?(t.code===Zc.UNAUTHENTICATED&&this.credentials.invalidateToken(),t):new tu(Zc.UNKNOWN,t.toString())}))}Oi(t,e,n){return this.Pr(),this.credentials.getToken().then((r=>this.Hi.Oi(t,e,n,r))).catch((t=>{throw"FirebaseError"===t.name?(t.code===Zc.UNAUTHENTICATED&&this.credentials.invalidateToken(),t):new tu(Zc.UNKNOWN,t.toString())}))}terminate(){this.Rr=!0}}class Op{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.br=0,this.vr=null,this.Vr=!0}Sr(){0===this.br&&(this.Dr("Unknown"),this.vr=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.vr=null,this.Cr("Backend didn't respond within 10 seconds."),this.Dr("Offline"),Promise.resolve()))))}Nr(t){"Online"===this.state?this.Dr("Unknown"):(this.br++,this.br>=1&&(this.kr(),this.Cr(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.Dr("Offline")))}set(t){this.kr(),this.br=0,"Online"===t&&(this.Vr=!1),this.Dr(t)}Dr(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}Cr(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Vr?(iu(e),this.Vr=!1):ru("OnlineStateTracker",e)}kr(){null!==this.vr&&(this.vr.cancel(),this.vr=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{constructor(t,e,n,r,i){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.$r=[],this.Or=new Map,this.Fr=new Set,this.Mr=[],this.Lr=i,this.Lr.di((t=>{n.enqueueAndForget((async()=>{$p(this)&&(ru("RemoteStore","Restarting streams for network reachability change."),await async function(t){const e=uu(t);e.Fr.add(4),await Mp(e),e.Br.set("Unknown"),e.Fr.delete(4),await Pp(e)}(this))}))})),this.Br=new Op(n,r)}}async function Pp(t){if($p(t))for(const e of t.Mr)await e(!0)}async function Mp(t){for(const e of t.Mr)await e(!1)}function Up(t,e){const n=uu(t);n.Or.has(e.targetId)||(n.Or.set(e.targetId,e),Bp(n)?qp(n):sg(n).er()&&Vp(n,e))}function Fp(t,e){const n=uu(t),r=sg(n);n.Or.delete(e),r.er()&&jp(n,e),0===n.Or.size&&(r.er()?r.ir():$p(n)&&n.Br.set("Unknown"))}function Vp(t,e){t.Ur.q(e.targetId),sg(t).mr(e)}function jp(t,e){t.Ur.q(e),sg(t).gr(e)}function qp(t){t.Ur=new xl({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>t.Or.get(e)||null}),sg(t).start(),t.Br.Sr()}function Bp(t){return $p(t)&&!sg(t).tr()&&t.Or.size>0}function $p(t){return 0===uu(t).Fr.size}function zp(t){t.Ur=void 0}async function Kp(t){t.Or.forEach(((e,n)=>{Vp(t,e)}))}async function Hp(t,e){zp(t),Bp(t)?(t.Br.Nr(e),qp(t)):t.Br.set("Unknown")}async function Gp(t,e,n){if(t.Br.set("Online"),e instanceof Nl&&2===e.state&&e.cause)try{await async function(t,e){const n=e.cause;for(const r of e.targetIds)t.Or.has(r)&&(await t.remoteSyncer.rejectListen(r,n),t.Or.delete(r),t.Ur.removeTarget(r))}(t,e)}catch(r){ru("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Wp(t,r)}else if(e instanceof Al?t.Ur.X(e):e instanceof Rl?t.Ur.rt(e):t.Ur.et(e),!n.isEqual(mu.min()))try{const e=await np(t.localStore);n.compareTo(e)>=0&&await function(t,e){const n=t.Ur.ut(e);return n.targetChanges.forEach(((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const i=t.Or.get(r);i&&t.Or.set(r,i.withResumeToken(n.resumeToken,e))}})),n.targetMismatches.forEach((e=>{const n=t.Or.get(e);if(!n)return;t.Or.set(e,n.withResumeToken(Su.EMPTY_BYTE_STRING,n.snapshotVersion)),jp(t,e);const r=new Yd(n.target,e,1,n.sequenceNumber);Vp(t,r)})),t.remoteSyncer.applyRemoteEvent(n)}(t,n)}catch(i){ru("RemoteStore","Failed to raise snapshot:",i),await Wp(t,i)}}async function Wp(t,e,n){if(!Bd(e))throw e;t.Fr.add(1),await Mp(t),t.Br.set("Offline"),n||(n=()=>np(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{ru("RemoteStore","Retrying IndexedDB access"),await n(),t.Fr.delete(1),await Pp(t)}))}function Qp(t,e){return e().catch((n=>Wp(t,n,e)))}async function Xp(t){const e=uu(t),n=og(e);let r=e.$r.length>0?e.$r[e.$r.length-1].batchId:-1;for(;Yp(e);)try{const t=await ip(e.localStore,r);if(null===t){0===e.$r.length&&n.ir();break}r=t.batchId,Jp(e,t)}catch(i){await Wp(e,i)}Zp(e)&&tg(e)}function Yp(t){return $p(t)&&t.$r.length<10}function Jp(t,e){t.$r.push(e);const n=og(t);n.er()&&n.pr&&n.Er(e.mutations)}function Zp(t){return $p(t)&&!og(t).tr()&&t.$r.length>0}function tg(t){og(t).start()}async function eg(t){og(t).Ar()}async function ng(t){const e=og(t);for(const n of t.$r)e.Er(n.mutations)}async function rg(t,e,n){const r=t.$r.shift(),i=Xd.from(r,e,n);await Qp(t,(()=>t.remoteSyncer.applySuccessfulWrite(i))),await Xp(t)}async function ig(t,e){e&&og(t).pr&&await async function(t,e){if(function(t){switch(t){case Zc.OK:return au();case Zc.CANCELLED:case Zc.UNKNOWN:case Zc.DEADLINE_EXCEEDED:case Zc.RESOURCE_EXHAUSTED:case Zc.INTERNAL:case Zc.UNAVAILABLE:case Zc.UNAUTHENTICATED:return!1;case Zc.INVALID_ARGUMENT:case Zc.NOT_FOUND:case Zc.ALREADY_EXISTS:case Zc.PERMISSION_DENIED:case Zc.FAILED_PRECONDITION:case Zc.ABORTED:case Zc.OUT_OF_RANGE:case Zc.UNIMPLEMENTED:case Zc.DATA_LOSS:return!0;default:return au()}}(n=e.code)&&n!==Zc.ABORTED){const n=t.$r.shift();og(t).sr(),await Qp(t,(()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e))),await Xp(t)}var n}(t,e),Zp(t)&&tg(t)}function sg(t){return t.qr||(t.qr=function(t,e,n){const r=uu(t);return r.Pr(),new Np(e,r.Hi,r.credentials,r.R,n)}(t.datastore,t.asyncQueue,{Ii:Kp.bind(null,t),Ri:Hp.bind(null,t),_r:Gp.bind(null,t)}),t.Mr.push((async e=>{e?(t.qr.sr(),Bp(t)?qp(t):t.Br.set("Unknown")):(await t.qr.stop(),zp(t))}))),t.qr}function og(t){return t.Kr||(t.Kr=function(t,e,n){const r=uu(t);return r.Pr(),new Dp(e,r.Hi,r.credentials,r.R,n)}(t.datastore,t.asyncQueue,{Ii:eg.bind(null,t),Ri:ig.bind(null,t),Ir:ng.bind(null,t),Tr:rg.bind(null,t)}),t.Mr.push((async e=>{e?(t.Kr.sr(),await Xp(t)):(await t.Kr.stop(),t.$r.length>0&&(ru("RemoteStore",`Stopping write stream with ${t.$r.length} pending writes`),t.$r=[]))}))),t.Kr
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class ag{constructor(t,e,n,r,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new Md,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((t=>{}))}static createAndSchedule(t,e,n,r,i){const s=Date.now()+n,o=new ag(t,e,s,r,i);return o.start(n),o}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new tu(Zc.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function cg(t,e){if(iu("AsyncQueue",`${e}: ${t}`),Bd(t))return new tu(Zc.UNAVAILABLE,`${e}: ${t}`);throw t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{constructor(t){this.comparator=t?(e,n)=>t(e,n)||Pu.comparator(e.key,n.key):(t,e)=>Pu.comparator(t.key,e.key),this.keyedMap=bl(),this.sortedSet=new dl(this.comparator)}static emptySet(t){return new ug(t.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,n)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof ug))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(!t.isEqual(r))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new ug;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hg{constructor(){this.jr=new dl(Pu.comparator)}track(t){const e=t.doc.key,n=this.jr.get(e);n?0!==t.type&&3===n.type?this.jr=this.jr.insert(e,t):3===t.type&&1!==n.type?this.jr=this.jr.insert(e,{type:n.type,doc:t.doc}):2===t.type&&2===n.type?this.jr=this.jr.insert(e,{type:2,doc:t.doc}):2===t.type&&0===n.type?this.jr=this.jr.insert(e,{type:0,doc:t.doc}):1===t.type&&0===n.type?this.jr=this.jr.remove(e):1===t.type&&2===n.type?this.jr=this.jr.insert(e,{type:1,doc:n.doc}):0===t.type&&1===n.type?this.jr=this.jr.insert(e,{type:2,doc:t.doc}):au():this.jr=this.jr.insert(e,t)}Qr(){const t=[];return this.jr.inorderTraversal(((e,n)=>{t.push(n)})),t}}class lg{constructor(t,e,n,r,i,s,o,a){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=o,this.excludesMetadataChanges=a}static fromInitialDocuments(t,e,n,r){const i=[];return e.forEach((t=>{i.push({type:0,doc:t})})),new lg(t,e,ug.emptySet(e),i,n,r,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Eh(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let r=0;r<e.length;r++)if(e[r].type!==n[r].type||!e[r].doc.isEqual(n[r].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dg{constructor(){this.Wr=void 0,this.listeners=[]}}class fg{constructor(){this.queries=new Uf((t=>Sh(t)),Eh),this.onlineState="Unknown",this.Gr=new Set}}async function pg(t,e){const n=uu(t),r=e.query;let i=!1,s=n.queries.get(r);if(s||(i=!0,s=new dg),i)try{s.Wr=await n.onListen(r)}catch(o){const t=cg(o,`Initialization of query '${kh(e.query)}' failed`);return void e.onError(t)}n.queries.set(r,s),s.listeners.push(e),e.zr(n.onlineState),s.Wr&&e.Hr(s.Wr)&&vg(n)}async function gg(t,e){const n=uu(t),r=e.query;let i=!1;const s=n.queries.get(r);if(s){const t=s.listeners.indexOf(e);t>=0&&(s.listeners.splice(t,1),i=0===s.listeners.length)}if(i)return n.queries.delete(r),n.onUnlisten(r)}function mg(t,e){const n=uu(t);let r=!1;for(const i of e){const t=i.query,e=n.queries.get(t);if(e){for(const t of e.listeners)t.Hr(i)&&(r=!0);e.Wr=i}}r&&vg(n)}function yg(t,e,n){const r=uu(t),i=r.queries.get(e);if(i)for(const s of i.listeners)s.onError(n);r.queries.delete(e)}function vg(t){t.Gr.forEach((t=>{t.next()}))}class wg{constructor(t,e,n){this.query=t,this.Jr=e,this.Yr=!1,this.Xr=null,this.onlineState="Unknown",this.options=n||{}}Hr(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new lg(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0)}let e=!1;return this.Yr?this.Zr(t)&&(this.Jr.next(t),e=!0):this.eo(t,this.onlineState)&&(this.no(t),e=!0),this.Xr=t,e}onError(t){this.Jr.error(t)}zr(t){this.onlineState=t;let e=!1;return this.Xr&&!this.Yr&&this.eo(this.Xr,t)&&(this.no(this.Xr),e=!0),e}eo(t,e){if(!t.fromCache)return!0;const n="Offline"!==e;return!(this.options.so&&n||t.docs.isEmpty()&&"Offline"!==e)}Zr(t){if(t.docChanges.length>0)return!0;const e=this.Xr&&this.Xr.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}no(t){t=lg.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache),this.Yr=!0,this.Jr.next(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bg{constructor(t){this.key=t}}class Ig{constructor(t){this.key=t}}class _g{constructor(t,e){this.query=t,this.uo=e,this.ao=null,this.current=!1,this.ho=Tl(),this.mutatedKeys=Tl(),this.lo=Ah(t),this.fo=new ug(this.lo)}get wo(){return this.uo}_o(t,e){const n=e?e.mo:new hg,r=e?e.fo:this.fo;let i=e?e.mutatedKeys:this.mutatedKeys,s=r,o=!1;const a=bh(this.query)&&r.size===this.query.limit?r.last():null,c=Ih(this.query)&&r.size===this.query.limit?r.first():null;if(t.inorderTraversal(((t,e)=>{const u=r.get(t),h=Ch(this.query,e)?e:null,l=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations);let f=!1;u&&h?u.data.isEqual(h.data)?l!==d&&(n.track({type:3,doc:h}),f=!0):this.yo(u,h)||(n.track({type:2,doc:h}),f=!0,(a&&this.lo(h,a)>0||c&&this.lo(h,c)<0)&&(o=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(h?(s=s.add(h),i=d?i.add(t):i.delete(t)):(s=s.delete(t),i=i.delete(t)))})),bh(this.query)||Ih(this.query))for(;s.size>this.query.limit;){const t=bh(this.query)?s.last():s.first();s=s.delete(t.key),i=i.delete(t.key),n.track({type:1,doc:t})}return{fo:s,mo:n,Nn:o,mutatedKeys:i}}yo(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n){const r=this.fo;this.fo=t.fo,this.mutatedKeys=t.mutatedKeys;const i=t.mo.Qr();i.sort(((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return au()}};return n(t)-n(e)}(t.type,e.type)||this.lo(t.doc,e.doc))),this.po(n);const s=e?this.Eo():[],o=0===this.ho.size&&this.current?1:0,a=o!==this.ao;return this.ao=o,0!==i.length||a?{snapshot:new lg(this.query,t.fo,r,i,t.mutatedKeys,0===o,a,!1),To:s}:{To:s}}zr(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({fo:this.fo,mo:new hg,mutatedKeys:this.mutatedKeys,Nn:!1},!1)):{To:[]}}Io(t){return!this.uo.has(t)&&!!this.fo.has(t)&&!this.fo.get(t).hasLocalMutations}po(t){t&&(t.addedDocuments.forEach((t=>this.uo=this.uo.add(t))),t.modifiedDocuments.forEach((t=>{})),t.removedDocuments.forEach((t=>this.uo=this.uo.delete(t))),this.current=t.current)}Eo(){if(!this.current)return[];const t=this.ho;this.ho=Tl(),this.fo.forEach((t=>{this.Io(t.key)&&(this.ho=this.ho.add(t.key))}));const e=[];return t.forEach((t=>{this.ho.has(t)||e.push(new Ig(t))})),this.ho.forEach((n=>{t.has(n)||e.push(new bg(n))})),e}Ao(t){this.uo=t.Bn,this.ho=Tl();const e=this._o(t.documents);return this.applyChanges(e,!0)}Ro(){return lg.fromInitialDocuments(this.query,this.fo,this.mutatedKeys,0===this.ao)}}class Tg{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class Eg{constructor(t){this.key=t,this.Po=!1}}class Sg{constructor(t,e,n,r,i,s){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.bo={},this.vo=new Uf((t=>Sh(t)),Eh),this.Vo=new Map,this.So=new Set,this.Do=new dl(Pu.comparator),this.Co=new Map,this.No=new up,this.xo={},this.ko=new Map,this.$o=Sf.Yt(),this.onlineState="Unknown",this.Oo=void 0}get isPrimaryClient(){return!0===this.Oo}}async function kg(t,e){const n=function(t){const e=uu(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Ag.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Bg.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Ng.bind(null,e),e.bo._r=mg.bind(null,e.eventManager),e.bo.Mo=yg.bind(null,e.eventManager),e}(t);let r,i;const s=n.vo.get(e);if(s)r=s.targetId,n.sharedClientState.addLocalQueryTarget(r),i=s.view.Ro();else{const t=await function(t,e){const n=uu(t);return n.persistence.runTransaction("Allocate target","readwrite",(t=>{let r;return n.Ue.getTargetData(t,e).next((i=>i?(r=i,Ud.resolve(r)):n.Ue.allocateTargetId(t).next((i=>(r=new Yd(e,i,0,t.currentSequenceNumber),n.Ue.addTargetData(t,r).next((()=>r)))))))})).then((t=>{const r=n.kn.get(t.targetId);return(null===r||t.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.kn=n.kn.insert(t.targetId,t),n.$n.set(e,t.targetId)),t}))}(n.localStore,Th(e)),s=n.sharedClientState.addLocalQueryTarget(t.targetId);r=t.targetId,i=await async function(t,e,n,r){t.Fo=(e,n,r)=>async function(t,e,n,r){let i=e.view._o(n);i.Nn&&(i=await op(t.localStore,e.query,!1).then((({documents:t})=>e.view._o(t,i))));const s=r&&r.targetChanges.get(e.targetId),o=e.view.applyChanges(i,t.isPrimaryClient,s);return Ug(t,e.targetId,o.To),o.snapshot}(t,e,n,r);const i=await op(t.localStore,e,!0),s=new _g(e,i.Bn),o=s._o(i.documents),a=Cl.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==t.onlineState),c=s.applyChanges(o,t.isPrimaryClient,a);Ug(t,n,c.To);const u=new Tg(e,n,s);return t.vo.set(e,u),t.Vo.has(n)?t.Vo.get(n).push(e):t.Vo.set(n,[e]),c.snapshot}(n,e,r,"current"===s),n.isPrimaryClient&&Up(n.remoteStore,t)}return i}async function Cg(t,e){const n=uu(t),r=n.vo.get(e),i=n.Vo.get(r.targetId);if(i.length>1)return n.Vo.set(r.targetId,i.filter((t=>!Eh(t,e)))),void n.vo.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await sp(n.localStore,r.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(r.targetId),Fp(n.remoteStore,r.targetId),Pg(n,r.targetId)})).catch(Nf)):(Pg(n,r.targetId),await sp(n.localStore,r.targetId,!0))}async function Ag(t,e){const n=uu(t);try{const t=await rp(n.localStore,e);e.targetChanges.forEach(((t,e)=>{const r=n.Co.get(e);r&&(cu(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1),t.addedDocuments.size>0?r.Po=!0:t.modifiedDocuments.size>0?cu(r.Po):t.removedDocuments.size>0&&(cu(r.Po),r.Po=!1))})),await jg(n,t,e)}catch(r){await Nf(r)}}function Rg(t,e,n){const r=uu(t);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const t=[];r.vo.forEach(((n,r)=>{const i=r.view.zr(e);i.snapshot&&t.push(i.snapshot)})),function(t,e){const n=uu(t);n.onlineState=e;let r=!1;n.queries.forEach(((t,n)=>{for(const i of n.listeners)i.zr(e)&&(r=!0)})),r&&vg(n)}(r.eventManager,e),t.length&&r.bo._r(t),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Ng(t,e,n){const r=uu(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Co.get(e),s=i&&i.key;if(s){let t=new dl(Pu.comparator);t=t.insert(s,Yu.newNoDocument(s,mu.min()));const n=Tl().add(s),i=new kl(mu.min(),new Map,new gl(du),t,n);await Ag(r,i),r.Do=r.Do.remove(s),r.Co.delete(e),Vg(r)}else await sp(r.localStore,e,!1).then((()=>Pg(r,e,n))).catch(Nf)}async function Dg(t,e){const n=uu(t),r=e.batch.batchId;try{const t=await function(t,e){const n=uu(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(t=>{const r=e.batch.keys(),i=n.Fn.newChangeBuffer({trackRemovals:!0});return function(t,e,n,r){const i=n.batch,s=i.keys();let o=Ud.resolve();return s.forEach((t=>{o=o.next((()=>r.getEntry(e,t))).next((e=>{const s=n.docVersions.get(t);cu(null!==s),e.version.compareTo(s)<0&&(i.applyToRemoteDocument(e,n),e.isValidDocument()&&r.addEntry(e,n.commitVersion))}))})),o.next((()=>t._n.removeMutationBatch(e,i)))}(n,t,e,i).next((()=>i.apply(t))).next((()=>n._n.performConsistencyCheck(t))).next((()=>n.Mn.pn(t,r)))}))}(n.localStore,e);Lg(n,r,null),Og(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await jg(n,t)}catch(i){await Nf(i)}}async function xg(t,e,n){const r=uu(t);try{const t=await function(t,e){const n=uu(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",(t=>{let r;return n._n.lookupMutationBatch(t,e).next((e=>(cu(null!==e),r=e.keys(),n._n.removeMutationBatch(t,e)))).next((()=>n._n.performConsistencyCheck(t))).next((()=>n.Mn.pn(t,r)))}))}(r.localStore,e);Lg(r,e,n),Og(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await jg(r,t)}catch(i){await Nf(i)}}function Og(t,e){(t.ko.get(e)||[]).forEach((t=>{t.resolve()})),t.ko.delete(e)}function Lg(t,e,n){const r=uu(t);let i=r.xo[r.currentUser.toKey()];if(i){const t=i.get(e);t&&(n?t.reject(n):t.resolve(),i=i.remove(e)),r.xo[r.currentUser.toKey()]=i}}function Pg(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Vo.get(e))t.vo.delete(r),n&&t.bo.Mo(r,n);t.Vo.delete(e),t.isPrimaryClient&&t.No.Zn(e).forEach((e=>{t.No.containsKey(e)||Mg(t,e)}))}function Mg(t,e){t.So.delete(e.path.canonicalString());const n=t.Do.get(e);null!==n&&(Fp(t.remoteStore,n),t.Do=t.Do.remove(e),t.Co.delete(n),Vg(t))}function Ug(t,e,n){for(const r of n)r instanceof bg?(t.No.addReference(r.key,e),Fg(t,r)):r instanceof Ig?(ru("SyncEngine","Document no longer in limbo: "+r.key),t.No.removeReference(r.key,e),t.No.containsKey(r.key)||Mg(t,r.key)):au()}function Fg(t,e){const n=e.key,r=n.path.canonicalString();t.Do.get(n)||t.So.has(r)||(ru("SyncEngine","New document in limbo: "+n),t.So.add(r),Vg(t))}function Vg(t){for(;t.So.size>0&&t.Do.size<t.maxConcurrentLimboResolutions;){const e=t.So.values().next().value;t.So.delete(e);const n=new Pu(Iu.fromString(e)),r=t.$o.next();t.Co.set(r,new Eg(n)),t.Do=t.Do.insert(n,r),Up(t.remoteStore,new Yd(Th(wh(n.path)),r,2,Jc.o))}}async function jg(t,e,n){const r=uu(t),i=[],s=[],o=[];r.vo.isEmpty()||(r.vo.forEach(((t,a)=>{o.push(r.Fo(a,e,n).then((t=>{if(t){r.isPrimaryClient&&r.sharedClientState.updateQueryState(a.targetId,t.fromCache?"not-current":"current"),i.push(t);const e=Yf.vn(a.targetId,t);s.push(e)}})))})),await Promise.all(o),r.bo._r(i),await async function(t,e){const n=uu(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(t=>Ud.forEach(e,(e=>Ud.forEach(e.Pn,(r=>n.persistence.referenceDelegate.addReference(t,e.targetId,r))).next((()=>Ud.forEach(e.bn,(r=>n.persistence.referenceDelegate.removeReference(t,e.targetId,r)))))))))}catch(r){if(!Bd(r))throw r;ru("LocalStore","Failed to update sequence numbers: "+r)}for(const i of e){const t=i.targetId;if(!i.fromCache){const e=n.kn.get(t),r=e.snapshotVersion,i=e.withLastLimboFreeSnapshotVersion(r);n.kn=n.kn.insert(t,i)}}}(r.localStore,s))}async function qg(t,e){const n=uu(t);if(!n.currentUser.isEqual(e)){ru("SyncEngine","User change. New user:",e.toKey());const t=await ep(n.localStore,e);n.currentUser=e,(r=n).ko.forEach((t=>{t.forEach((t=>{t.reject(new tu(Zc.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))}))})),r.ko.clear(),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await jg(n,t.Ln)}var r}function Bg(t,e){const n=uu(t),r=n.Co.get(e);if(r&&r.Po)return Tl().add(r.key);{let t=Tl();const r=n.Vo.get(e);if(!r)return t;for(const e of r){const r=n.vo.get(e);t=t.unionWith(r.view.wo)}return t}}function $g(t){const e=uu(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Dg.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=xg.bind(null,e),e}class zg{constructor(){this.synchronizeTabs=!1}async initialize(t){this.R=Cp(t.databaseInfo.databaseId),this.sharedClientState=this.Bo(t),this.persistence=this.Uo(t),await this.persistence.start(),this.gcScheduler=this.qo(t),this.localStore=this.Ko(t)}qo(t){return null}Ko(t){return tp(this.persistence,new Jf,t.initialUser,this.R)}Uo(t){return new gp(yp.Ps,this.R)}Bo(t){return new bp}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class Kg extends zg{constructor(t,e,n){super(),this.jo=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await ap(this.localStore),await this.jo.initialize(this,t),await $g(this.jo.syncEngine),await Xp(this.jo.remoteStore)}Ko(t){return tp(this.persistence,new Jf,t.initialUser,this.R)}qo(t){const e=this.persistence.referenceDelegate.garbageCollector;return new Of(e,t.asyncQueue)}Uo(t){const e=function(t,e){let n=t.projectId;return t.isDefaultDatabase||(n+="."+t.database),"firestore/"+e+"/"+n+"/"}(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?yf.withCacheSize(this.cacheSizeBytes):yf.DEFAULT;return new Gf(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,"undefined"!=typeof window?window:null,kp(),this.R,this.sharedClientState,!!this.forceOwnership)}Bo(t){return new bp}}class Hg{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>Rg(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=qg.bind(null,this.syncEngine),await async function(t,e){const n=uu(t);e?(n.Fr.delete(2),await Pp(n)):e||(n.Fr.add(2),await Mp(n),n.Br.set("Unknown"))}(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new fg}createDatastore(t){const e=Cp(t.databaseInfo.databaseId),n=(r=t.databaseInfo,new Sp(r));var r,i;return i=t.credentials,new xp(i,n,e)}createRemoteStore(t){return e=this.localStore,n=this.datastore,r=t.asyncQueue,i=t=>Rg(this.syncEngine,t,0),s=_p.gt()?new _p:new Ip,new Lp(e,n,r,i,s);var e,n,r,i,s}createSyncEngine(t,e){return function(t,e,n,r,i,s,o){const a=new Sg(t,e,n,r,i,s);return o&&(a.Oo=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}terminate(){return async function(t){const e=uu(t);ru("RemoteStore","RemoteStore shutting down."),e.Fr.add(5),await Mp(e),e.Lr.shutdown(),e.Br.set("Unknown")}(this.remoteStore)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gg{constructor(t){this.observer=t,this.muted=!1}next(t){this.observer.next&&this.Qo(this.observer.next,t)}error(t){this.observer.error?this.Qo(this.observer.error,t):console.error("Uncaught Error in snapshot listener:",t)}Wo(){this.muted=!0}Qo(t,e){this.muted||setTimeout((()=>{this.muted||t(e)}),0)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wg{constructor(t,e,n){this.credentials=t,this.asyncQueue=e,this.databaseInfo=n,this.user=vp.UNAUTHENTICATED,this.clientId=lu.u(),this.credentialListener=()=>Promise.resolve(),this.credentials.setChangeListener(e,(async t=>{ru("FirestoreClient","Received user=",t.uid),await this.credentialListener(t),this.user=t}))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,credentials:this.credentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.credentialListener=t}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new tu(Zc.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Md;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.credentials.removeChangeListener(),t.resolve()}catch(e){const n=cg(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function Qg(t,e){t.asyncQueue.verifyOperationInProgress(),ru("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener((async t=>{r.isEqual(t)||(await ep(e.localStore,t),r=t)})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t.offlineComponents=e}async function Xg(t,e){t.asyncQueue.verifyOperationInProgress();const n=await async function(t){return t.offlineComponents||(ru("FirestoreClient","Using default OfflineComponentProvider"),await Qg(t,new zg)),t.offlineComponents}(t);ru("FirestoreClient","Initializing OnlineComponentProvider");const r=await t.getConfiguration();await e.initialize(n,r),t.setCredentialChangeListener((t=>async function(t,e){const n=uu(t);n.asyncQueue.verifyOperationInProgress(),ru("RemoteStore","RemoteStore received new credentials");const r=$p(n);n.Fr.add(3),await Mp(n),r&&n.Br.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Fr.delete(3),await Pp(n)}(e.remoteStore,t))),t.onlineComponents=e}async function Yg(t){return t.onlineComponents||(ru("FirestoreClient","Using default OnlineComponentProvider"),await Xg(t,new Hg)),t.onlineComponents}async function Jg(t){const e=await Yg(t),n=e.eventManager;return n.onListen=kg.bind(null,e.syncEngine),n.onUnlisten=Cg.bind(null,e.syncEngine),n}class Zg{constructor(t,e,n,r,i,s,o,a){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=o,this.useFetchStreams=a}}class tm{constructor(t,e){this.projectId=t,this.database=e||"(default)"}get isDefaultDatabase(){return"(default)"===this.database}isEqual(t){return t instanceof tm&&t.projectId===this.projectId&&t.database===this.database}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const em=new Map;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(t,e){this.user=e,this.type="OAuth",this.authHeaders={},this.authHeaders.Authorization=`Bearer ${t}`}}class rm{constructor(){this.changeListener=null}getToken(){return Promise.resolve(null)}invalidateToken(){}setChangeListener(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(vp.UNAUTHENTICATED)))}removeChangeListener(){this.changeListener=null}}class im{constructor(t){this.currentUser=vp.UNAUTHENTICATED,this.oc=new Md,this.cc=0,this.forceRefresh=!1,this.auth=null,this.asyncQueue=null,this.uc=()=>{this.cc++,this.currentUser=this.ac(),this.oc.resolve(),this.changeListener&&this.asyncQueue.enqueueRetryable((()=>this.changeListener(this.currentUser)))};const e=t=>{ru("FirebaseCredentialsProvider","Auth detected"),this.auth=t,this.auth.addAuthTokenListener(this.uc)};t.onInit((t=>e(t))),setTimeout((()=>{if(!this.auth){const n=t.getImmediate({optional:!0});n?e(n):(ru("FirebaseCredentialsProvider","Auth not yet detected"),this.oc.resolve())}}),0)}getToken(){const t=this.cc,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((e=>this.cc!==t?(ru("FirebaseCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(cu("string"==typeof e.accessToken),new nm(e.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}setChangeListener(t,e){this.asyncQueue=t,this.asyncQueue.enqueueRetryable((async()=>{await this.oc.promise,await e(this.currentUser),this.changeListener=e}))}removeChangeListener(){this.auth&&this.auth.removeAuthTokenListener(this.uc),this.changeListener=()=>Promise.resolve()}ac(){const t=this.auth&&this.auth.getUid();return cu(null===t||"string"==typeof t),new vp(t)}}class sm{constructor(t,e,n){this.hc=t,this.lc=e,this.fc=n,this.type="FirstParty",this.user=vp.FIRST_PARTY}get authHeaders(){const t={"X-Goog-AuthUser":this.lc},e=this.hc.auth.getAuthHeaderValueForFirstParty([]);return e&&(t.Authorization=e),this.fc&&(t["X-Goog-Iam-Authorization-Token"]=this.fc),t}}class om{constructor(t,e,n){this.hc=t,this.lc=e,this.fc=n}getToken(){return Promise.resolve(new sm(this.hc,this.lc,this.fc))}setChangeListener(t,e){t.enqueueRetryable((()=>e(vp.FIRST_PARTY)))}removeChangeListener(){}invalidateToken(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function am(t,e,n){if(!n)throw new tu(Zc.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function cm(t){if(!Pu.isDocumentKey(t))throw new tu(Zc.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function um(t){if(Pu.isDocumentKey(t))throw new tu(Zc.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function hm(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const e=function(t){if(t.constructor){const e=/function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());if(e&&e.length>1)return e[1]}return null}(t);return e?`a custom ${e} object`:"an object"}}return"function"==typeof t?"a function":au()}function lm(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new tu(Zc.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=hm(t);throw new tu(Zc.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{constructor(t){var e;if(void 0===t.host){if(void 0!==t.ssl)throw new tu(Zc.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=null===(e=t.ssl)||void 0===e||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,void 0===t.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new tu(Zc.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.useFetchStreams=!!t.useFetchStreams,function(t,e,n,r){if(!0===e&&!0===r)throw new tu(Zc.INVALID_ARGUMENT,"experimentalForceLongPolling and experimentalAutoDetectLongPolling cannot be used together.")}(0,t.experimentalForceLongPolling,0,t.experimentalAutoDetectLongPolling)}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fm{constructor(t,e){this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new dm({}),this._settingsFrozen=!1,t instanceof tm?(this._databaseId=t,this._credentials=new rm):(this._app=t,this._databaseId=function(t){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new tu(Zc.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new tm(t.options.projectId)}(t),this._credentials=new im(e))}get app(){if(!this._app)throw new tu(Zc.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new tu(Zc.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new dm(t),void 0!==t.credentials&&(this._credentials=function(t){if(!t)return new rm;switch(t.type){case"gapi":const e=t.client;return cu(!("object"!=typeof e||null===e||!e.auth||!e.auth.getAuthHeaderValueForFirstParty)),new om(e,t.sessionIndex||"0",t.iamToken||null);case"provider":return t.client;default:throw new tu(Zc.INVALID_ARGUMENT,"makeCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=em.get(t);e&&(ru("ComponentProvider","Removing Datastore"),em.delete(t),e.terminate())}(this),Promise.resolve()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pm{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new mm(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new pm(this.firestore,t,this._key)}}class gm{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new gm(this.firestore,t,this._query)}}class mm extends gm{constructor(t,e,n){super(t,e,wh(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new pm(this.firestore,null,new Pu(t))}withConverter(t){return new mm(this.firestore,t,this._path)}}function ym(t,e,...n){if(t=_e(t),am("collection","path",e),t instanceof fm){const r=Iu.fromString(e,...n);return um(r),new mm(t,null,r)}{if(!(t instanceof pm||t instanceof mm))throw new tu(Zc.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=Iu.fromString(t.path,...n).child(Iu.fromString(e));return um(r),new mm(t.firestore,null,r)}}function vm(t,e,...n){if(t=_e(t),1===arguments.length&&(e=lu.u()),am("doc","path",e),t instanceof fm){const r=Iu.fromString(e,...n);return cm(r),new pm(t,null,new Pu(r))}{if(!(t instanceof pm||t instanceof mm))throw new tu(Zc.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Iu.fromString(e,...n));return cm(r),new pm(t.firestore,t instanceof mm?t.converter:null,new Pu(r))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wm{constructor(){this.dc=Promise.resolve(),this.wc=[],this._c=!1,this.mc=[],this.gc=null,this.yc=!1,this.Ec=!1,this.Tc=[],this.Zi=new Ap(this,"async_queue_retry"),this.Ic=()=>{const t=kp();t&&ru("AsyncQueue","Visibility state changed to "+t.visibilityState),this.Zi.Gi()};const t=kp();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.Ic)}get isShuttingDown(){return this._c}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Ac(),this.Rc(t)}enterRestrictedMode(t){if(!this._c){this._c=!0,this.Ec=t||!1;const e=kp();e&&"function"==typeof e.removeEventListener&&e.removeEventListener("visibilitychange",this.Ic)}}enqueue(t){if(this.Ac(),this._c)return new Promise((()=>{}));const e=new Md;return this.Rc((()=>this._c&&this.Ec?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.wc.push(t),this.Pc())))}async Pc(){if(0!==this.wc.length){try{await this.wc[0](),this.wc.shift(),this.Zi.reset()}catch(t){if(!Bd(t))throw t;ru("AsyncQueue","Operation failed with retryable error: "+t)}this.wc.length>0&&this.Zi.Qi((()=>this.Pc()))}}Rc(t){const e=this.dc.then((()=>(this.yc=!0,t().catch((t=>{throw this.gc=t,this.yc=!1,iu("INTERNAL UNHANDLED ERROR: ",function(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}(t)),t})).then((t=>(this.yc=!1,t))))));return this.dc=e,e}enqueueAfterDelay(t,e,n){this.Ac(),this.Tc.indexOf(t)>-1&&(e=0);const r=ag.createAndSchedule(this,t,e,n,(t=>this.bc(t)));return this.mc.push(r),r}Ac(){this.gc&&au()}verifyOperationInProgress(){}async vc(){let t;do{t=this.dc,await t}while(t!==this.dc)}Vc(t){for(const e of this.mc)if(e.timerId===t)return!0;return!1}Sc(t){return this.vc().then((()=>{this.mc.sort(((t,e)=>t.targetTimeMs-e.targetTimeMs));for(const e of this.mc)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.vc()}))}Dc(t){this.Tc.push(t)}bc(t){const e=this.mc.indexOf(t);this.mc.splice(e,1)}}function bm(t){return function(t,e){if("object"!=typeof t||null===t)return!1;const n=t;for(const r of["next","error","complete"])if(r in n&&"function"==typeof n[r])return!0;return!1}(t)}class Im extends fm{constructor(t,e){super(t,e),this.type="firestore",this._queue=new wm,this._persistenceKey="name"in t?t.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||Em(this),this._firestoreClient.terminate()}}function _m(t=He()){return Be(t,"firestore-exp").getImmediate()}function Tm(t){return t._firestoreClient||Em(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function Em(t){var e;const n=t._freezeSettings(),r=(i=t._databaseId,s=(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",o=t._persistenceKey,new Zg(i,s,o,(a=n).host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams));var i,s,o,a;t._firestoreClient=new Wg(t._credentials,t._queue,r)}function Sm(t,e){!function(t){if(t._initialized||t._terminated)throw new tu(Zc.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t=lm(t,Im));const n=Tm(t),r=t._freezeSettings(),i=new Hg;return function(t,e,n){const r=new Md;return t.asyncQueue.enqueue((async()=>{try{await Qg(t,n),await Xg(t,e),r.resolve()}catch(s){if(!("FirebaseError"===(i=s).name?i.code===Zc.FAILED_PRECONDITION||i.code===Zc.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&i instanceof DOMException)||22===i.code||20===i.code||11===i.code))throw s;console.warn("Error enabling offline persistence. Falling back to persistence disabled: "+s),r.reject(s)}var i})).then((()=>r.promise))}(n,i,new Kg(i,r.cacheSizeBytes,null==e?void 0:e.forceOwnership))}class km{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new tu(Zc.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Tu(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cm{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Cm(Su.fromBase64String(t))}catch(e){throw new tu(Zc.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Cm(Su.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Am{constructor(t){this._methodName=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rm{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new tu(Zc.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new tu(Zc.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return du(this._lat,t._lat)||du(this._long,t._long)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nm=/^__.*__$/;class Dm{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new nl(t,this.data,this.fieldMask,e,this.fieldTransforms):new el(t,this.data,e,this.fieldTransforms)}}function xm(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw au()}}class Om{constructor(t,e,n,r,i,s){this.settings=t,this.databaseId=e,this.R=n,this.ignoreUndefinedProperties=r,void 0===i&&this.Cc(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get Nc(){return this.settings.Nc}xc(t){return new Om(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.R,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}kc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.xc({path:n,$c:!1});return r.Oc(t),r}Fc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.xc({path:n,$c:!1});return r.Cc(),r}Mc(t){return this.xc({path:void 0,$c:!0})}Lc(t){return zm(t,this.settings.methodName,this.settings.Bc||!1,this.path,this.settings.Uc)}contains(t){return void 0!==this.fieldMask.find((e=>t.isPrefixOf(e)))||void 0!==this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))}Cc(){if(this.path)for(let t=0;t<this.path.length;t++)this.Oc(this.path.get(t))}Oc(t){if(0===t.length)throw this.Lc("Document fields must not be empty");if(xm(this.Nc)&&Nm.test(t))throw this.Lc('Document fields cannot begin and end with "__"')}}class Lm{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.R=n||Cp(t)}qc(t,e,n,r=!1){return new Om({Nc:t,methodName:e,Uc:n,path:Tu.emptyPath(),$c:!1,Bc:r},this.databaseId,this.R,this.ignoreUndefinedProperties)}}function Pm(t){const e=t._freezeSettings(),n=Cp(t._databaseId);return new Lm(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Mm(t,e,n,r,i,s={}){const o=t.qc(s.merge||s.mergeFields?2:0,e,n,i);jm("Data must be an object, but it was:",o,r);const a=Fm(r,o);let c,u;if(s.merge)c=new Eu(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){const t=[];for(const r of s.mergeFields){const i=qm(e,r,n);if(!o.contains(i))throw new tu(Zc.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);Km(t,i)||t.push(i)}c=new Eu(t),u=o.fieldTransforms.filter((t=>c.covers(t.field)))}else c=null,u=o.fieldTransforms;return new Dm(new Qu(a),c,u)}function Um(t,e){if(Vm(t=_e(t)))return jm("Unsupported field value:",e,t),Fm(t,e);if(t instanceof Am)return function(t,e){if(!xm(e.Nc))throw e.Lc(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.Lc(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.$c&&4!==e.Nc)throw e.Lc("Nested arrays are not supported");return function(t,e){const n=[];let r=0;for(const i of t){let t=Um(i,e.Mc(r));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),r++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=_e(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return xh(e.R,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=gu.fromDate(t);return{timestampValue:Fl(e.R,n)}}if(t instanceof gu){const n=new gu(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:Fl(e.R,n)}}if(t instanceof Rm)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof Cm)return{bytesValue:Vl(e.R,t._byteString)};if(t instanceof pm){const n=e.databaseId,r=t.firestore._databaseId;if(!r.isEqual(n))throw e.Lc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Bl(t.firestore._databaseId||e.databaseId,t._key.path)}}throw e.Lc(`Unsupported field value: ${hm(t)}`)}(t,e)}function Fm(t,e){const n={};return wu(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):vu(t,((t,r)=>{const i=Um(r,e.kc(t));null!=i&&(n[t]=i)})),{mapValue:{fields:n}}}function Vm(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof gu||t instanceof Rm||t instanceof Cm||t instanceof pm||t instanceof Am)}function jm(t,e,n){if(!Vm(n)||("object"!=typeof(r=n)||null===r||Object.getPrototypeOf(r)!==Object.prototype&&null!==Object.getPrototypeOf(r))){const r=hm(n);throw"an object"===r?e.Lc(t+" a custom object"):e.Lc(t+" "+r)}var r}function qm(t,e,n){if((e=_e(e))instanceof km)return e._internalPath;if("string"==typeof e)return $m(t,e);throw zm("Field path arguments must be of type string or FieldPath.",t,!1,void 0,n)}const Bm=new RegExp("[~\\*/\\[\\]]");function $m(t,e,n){if(e.search(Bm)>=0)throw zm(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new km(...e.split("."))._internalPath}catch(r){throw zm(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function zm(t,e,n,r,i){const s=r&&!r.isEmpty(),o=void 0!==i;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new tu(Zc.INVALID_ARGUMENT,a+t+c)}function Km(t,e){return t.some((t=>t.isEqual(e)))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hm{constructor(t,e,n,r,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new pm(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new Gm(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Wm("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class Gm extends Hm{data(){return super.data()}}function Wm(t,e){return"string"==typeof e?$m(t,e):e instanceof km?e._internalPath:e._delegate._internalPath}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qm{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Xm extends Hm{constructor(t,e,n,r,i,s){super(t,e,n,r,s),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Ym(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Wm("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class Ym extends Xm{data(t={}){return super.data(t)}}class Jm{constructor(t,e,n,r){this._firestore=t,this._userDataWriter=e,this._snapshot=r,this.metadata=new Qm(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(t,e){this._snapshot.docs.forEach((n=>{t.call(e,new Ym(this._firestore,this._userDataWriter,n.key,n,new Qm(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new tu(Zc.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(t,e){if(t._snapshot.oldDocs.isEmpty()){let e=0;return t._snapshot.docChanges.map((n=>({type:"added",doc:new Ym(t._firestore,t._userDataWriter,n.doc.key,n.doc,new Qm(t._snapshot.mutatedKeys.has(n.doc.key),t._snapshot.fromCache),t.query.converter),oldIndex:-1,newIndex:e++})))}{let n=t._snapshot.oldDocs;return t._snapshot.docChanges.filter((t=>e||3!==t.type)).map((e=>{const r=new Ym(t._firestore,t._userDataWriter,e.doc.key,e.doc,new Qm(t._snapshot.mutatedKeys.has(e.doc.key),t._snapshot.fromCache),t.query.converter);let i=-1,s=-1;return 0!==e.type&&(i=n.indexOf(e.doc.key),n=n.delete(e.doc.key)),1!==e.type&&(n=n.add(e.doc),s=n.indexOf(e.doc.key)),{type:Zm(e.type),doc:r,oldIndex:i,newIndex:s}}))}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function Zm(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return au()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ty(t){t=lm(t,pm);const e=lm(t.firestore,Im);return function(t,e,n={}){const r=new Md;return t.asyncQueue.enqueueAndForget((async()=>function(t,e,n,r,i){const s=new Gg({next:s=>{e.enqueueAndForget((()=>gg(t,o)));const a=s.docs.has(n);!a&&s.fromCache?i.reject(new tu(Zc.UNAVAILABLE,"Failed to get document because the client is offline.")):a&&s.fromCache&&r&&"server"===r.source?i.reject(new tu(Zc.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(s)},error:t=>i.reject(t)}),o=new wg(wh(n.path),s,{includeMetadataChanges:!0,so:!0});return pg(t,o)}(await Jg(t),t.asyncQueue,e,n,r))),r.promise}(Tm(e),t._key).then((n=>iy(e,t,n)))}class ey extends
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class{convertValue(t,e="none"){switch(Mu(t)){case 0:return null;case 1:return t.booleanValue;case 2:return Au(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Ru(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 10:return this.convertObject(t.mapValue,e);default:throw au()}}convertObject(t,e){const n={};return vu(t.fields,((t,r)=>{n[t]=this.convertValue(r,e)})),n}convertGeoPoint(t){return new Rm(Au(t.latitude),Au(t.longitude))}convertArray(t,e){return(t.values||[]).map((t=>this.convertValue(t,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=Du(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(xu(t));default:return null}}convertTimestamp(t){const e=Cu(t);return new gu(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Iu.fromString(t);cu(dd(n));const r=new tm(n.get(1),n.get(3)),i=new Pu(n.popFirst(5));return r.isEqual(e)||iu(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */{constructor(t){super(),this.firestore=t}convertBytes(t){return new Cm(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new pm(this.firestore,null,e)}}function ny(t,e,n){t=lm(t,pm);const r=lm(t.firestore,Im),i=function(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}(t.converter,e,n);return function(t,e){return function(t,e){const n=new Md;return t.asyncQueue.enqueueAndForget((async()=>async function(e,n,r){const i=$g(e);try{const t=await function(t,e){const n=uu(t),r=gu.now(),i=e.reduce(((t,e)=>t.add(e.key)),Tl());let s;return n.persistence.runTransaction("Locally write mutations","readwrite",(t=>n.Mn.pn(t,i).next((i=>{s=i;const o=[];for(const t of e){const e=Jh(t,s.get(t.key));null!=e&&o.push(new nl(t.key,e,Xu(e.value.mapValue),Gh.exists(!0)))}return n._n.addMutationBatch(t,r,o,e)})))).then((t=>(t.applyToLocalDocumentSet(s),{batchId:t.batchId,changes:s})))}(i.localStore,n);i.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let r=t.xo[t.currentUser.toKey()];r||(r=new dl(du)),r=r.insert(e,n),t.xo[t.currentUser.toKey()]=r}(i,t.batchId,r),await jg(i,t.changes),await Xp(i.remoteStore)}catch(t){const n=cg(t,"Failed to persist write");r.reject(n)}}(await function(t){return Yg(t).then((t=>t.syncEngine))}(t),e,n))),n.promise}(Tm(t),e)}(r,[Mm(Pm(r),"setDoc",t._key,i,null!==t.converter,n).toMutation(t._key,Gh.none())])}function ry(t,...e){var n,r,i;t=_e(t);let s={includeMetadataChanges:!1},o=0;"object"!=typeof e[o]||bm(e[o])||(s=e[o],o++);const a={includeMetadataChanges:s.includeMetadataChanges};if(bm(e[o])){const t=e[o];e[o]=null===(n=t.next)||void 0===n?void 0:n.bind(t),e[o+1]=null===(r=t.error)||void 0===r?void 0:r.bind(t),e[o+2]=null===(i=t.complete)||void 0===i?void 0:i.bind(t)}let c,u,h;if(t instanceof pm)u=lm(t.firestore,Im),h=wh(t._key.path),c={next:n=>{e[o]&&e[o](iy(u,t,n))},error:e[o+1],complete:e[o+2]};else{const n=lm(t,gm);u=lm(n.firestore,Im),h=n._query;const r=new ey(u);c={next:t=>{e[o]&&e[o](new Jm(u,r,n,t))},error:e[o+1],complete:e[o+2]},function(t){if(Ih(t)&&0===t.explicitOrderBy.length)throw new tu(Zc.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}(t._query)}return function(t,e,n,r){const i=new Gg(r),s=new wg(e,i,n);return t.asyncQueue.enqueueAndForget((async()=>pg(await Jg(t),s))),()=>{i.Wo(),t.asyncQueue.enqueueAndForget((async()=>gg(await Jg(t),s)))}}(Tm(u),h,a,c)}function iy(t,e,n){const r=n.docs.get(e._key),i=new ey(t);return new Xm(t,i,e._key,r,new Qm(n.hasPendingWrites,n.fromCache),e.converter)}function sy(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}function oy(t){const e=t-1;return e*e*e+1}function ay(t,{delay:n=0,duration:r=400,easing:i=e}={}){const s=+getComputedStyle(t).opacity;return{delay:n,duration:r,easing:i,css:t=>"opacity: "+t*s}}function cy(t,{delay:e=0,duration:n=400,easing:r=oy,x:i=0,y:s=0,opacity:o=0}={}){const a=getComputedStyle(t),c=+a.opacity,u="none"===a.transform?"":a.transform,h=c*(1-o);return{delay:e,duration:n,easing:r,css:(t,e)=>`\n\t\t\ttransform: ${u} translate(${(1-t)*i}px, ${(1-t)*s}px);\n\t\t\topacity: ${c-h*e}`}}function uy(t,{delay:e=0,speed:n,duration:r,easing:i=sy}={}){const s=t.getTotalLength();return void 0===r?r=void 0===n?800:s/n:"function"==typeof r&&(r=r(s)),{delay:e,duration:r,easing:i,css:(t,e)=>`stroke-dasharray: ${t*s} ${e*s}`}}
/*!
 * Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */Yc="9.0.0-beta.7",qe(new Te("firestore-exp",((t,{options:e})=>{const n=t.getProvider("app-exp").getImmediate(),r=new Im(n,t.getProvider("auth-internal"));return e=Object.assign({useFetchStreams:!1},e),r._setSettings(e),r}),"PUBLIC")),We("@firebase/firestore","0.0.900-exp.6ef484a04",undefined);var hy={prefix:"fas",iconName:"bars",icon:[448,512,[],"f0c9","M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"]},ly={prefix:"fas",iconName:"cog",icon:[512,512,[],"f013","M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"]},dy={prefix:"fas",iconName:"football-ball",icon:[496,512,[],"f44e","M481.5 60.3c-4.8-18.2-19.1-32.5-37.3-37.4C420.3 16.5 383 8.9 339.4 8L496 164.8c-.8-43.5-8.2-80.6-14.5-104.5zm-467 391.4c4.8 18.2 19.1 32.5 37.3 37.4 23.9 6.4 61.2 14 104.8 14.9L0 347.2c.8 43.5 8.2 80.6 14.5 104.5zM4.2 283.4L220.4 500c132.5-19.4 248.8-118.7 271.5-271.4L275.6 12C143.1 31.4 26.8 130.7 4.2 283.4zm317.3-123.6c3.1-3.1 8.2-3.1 11.3 0l11.3 11.3c3.1 3.1 3.1 8.2 0 11.3l-28.3 28.3 28.3 28.3c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0l-28.3-28.3-22.6 22.7 28.3 28.3c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0L248 278.6l-22.6 22.6 28.3 28.3c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0l-28.3-28.3-28.3 28.3c-3.1 3.1-8.2 3.1-11.3 0l-11.3-11.3c-3.1-3.1-3.1-8.2 0-11.3l28.3-28.3-28.3-28.2c-3.1-3.1-3.1-8.2 0-11.3l11.3-11.3c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3 22.6-22.6-28.3-28.3c-3.1-3.1-3.1-8.2 0-11.3l11.3-11.3c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3 22.6-22.6-28.3-28.3c-3.1-3.1-3.1-8.2 0-11.3l11.3-11.3c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3 28.3-28.5z"]},fy={prefix:"fas",iconName:"user-circle",icon:[496,512,[],"f2bd","M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"]};function py(t){let e,n,r,i;function s(t,e){return"string"==typeof t[8][4]?my:gy}let o=s(t),a=o(t);return{c(){e=L("svg"),n=L("g"),r=L("g"),a.c(),this.h()},l(t){e=K(t,"svg",{id:!0,class:!0,style:!0,viewBox:!0,"aria-hidden":!0,role:!0,xmlns:!0},1);var i=$(e);n=K(i,"g",{transform:!0},1);var s=$(n);r=K(s,"g",{transform:!0},1);var o=$(r);a.l(o),o.forEach(D),s.forEach(D),i.forEach(D),this.h()},h(){q(r,"transform",t[10]),q(n,"transform","translate(256 256)"),q(e,"id",t[1]),q(e,"class",t[0]),q(e,"style",t[9]),q(e,"viewBox",i=`0 0 ${t[8][0]} ${t[8][1]}`),q(e,"aria-hidden","true"),q(e,"role","img"),q(e,"xmlns","http://www.w3.org/2000/svg")},m(t,i){N(t,e,i),R(e,n),R(n,r),a.m(r,null)},p(t,n){o===(o=s(t))&&a?a.p(t,n):(a.d(1),a=o(t),a&&(a.c(),a.m(r,null))),1024&n&&q(r,"transform",t[10]),2&n&&q(e,"id",t[1]),1&n&&q(e,"class",t[0]),512&n&&q(e,"style",t[9]),256&n&&i!==(i=`0 0 ${t[8][0]} ${t[8][1]}`)&&q(e,"viewBox",i)},d(t){t&&D(e),a.d()}}}function gy(t){let e,n,r,i,s,o,a,c;return{c(){e=L("path"),s=L("path"),this.h()},l(t){e=K(t,"path",{d:!0,fill:!0,"fill-opacity":!0,transform:!0},1),$(e).forEach(D),s=K(t,"path",{d:!0,fill:!0,"fill-opacity":!0,transform:!0},1),$(s).forEach(D),this.h()},h(){q(e,"d",n=t[8][4][0]),q(e,"fill",r=t[4]||t[2]||"currentColor"),q(e,"fill-opacity",i=0!=t[7]?t[5]:t[6]),q(e,"transform","translate(-256 -256)"),q(s,"d",o=t[8][4][1]),q(s,"fill",a=t[3]||t[2]||"currentColor"),q(s,"fill-opacity",c=0!=t[7]?t[6]:t[5]),q(s,"transform","translate(-256 -256)")},m(t,n){N(t,e,n),N(t,s,n)},p(t,u){256&u&&n!==(n=t[8][4][0])&&q(e,"d",n),20&u&&r!==(r=t[4]||t[2]||"currentColor")&&q(e,"fill",r),224&u&&i!==(i=0!=t[7]?t[5]:t[6])&&q(e,"fill-opacity",i),256&u&&o!==(o=t[8][4][1])&&q(s,"d",o),12&u&&a!==(a=t[3]||t[2]||"currentColor")&&q(s,"fill",a),224&u&&c!==(c=0!=t[7]?t[6]:t[5])&&q(s,"fill-opacity",c)},d(t){t&&D(e),t&&D(s)}}}function my(t){let e,n,r;return{c(){e=L("path"),this.h()},l(t){e=K(t,"path",{d:!0,fill:!0,transform:!0},1),$(e).forEach(D),this.h()},h(){q(e,"d",n=t[8][4]),q(e,"fill",r=t[2]||t[3]||"currentColor"),q(e,"transform","translate(-256 -256)")},m(t,n){N(t,e,n)},p(t,i){256&i&&n!==(n=t[8][4])&&q(e,"d",n),12&i&&r!==(r=t[2]||t[3]||"currentColor")&&q(e,"fill",r)},d(t){t&&D(e)}}}function yy(e){let n,r=e[8][4]&&py(e);return{c(){r&&r.c(),n=U()},l(t){r&&r.l(t),n=U()},m(t,e){r&&r.m(t,e),N(t,n,e)},p(t,[e]){t[8][4]?r?r.p(t,e):(r=py(t),r.c(),r.m(n.parentNode,n)):r&&(r.d(1),r=null)},i:t,o:t,d(t){r&&r.d(t),t&&D(n)}}}function vy(t,e,n){let r,i,s,{class:o=""}=e,{id:a=""}=e,{style:c=""}=e,{icon:u}=e,{fw:h=!1}=e,{flip:l=!1}=e,{pull:d=""}=e,{rotate:f=""}=e,{size:p=""}=e,{color:g=""}=e,{primaryColor:m=""}=e,{secondaryColor:y=""}=e,{primaryOpacity:v=1}=e,{secondaryOpacity:w=.4}=e,{swapOpacity:b=!1}=e;return t.$$set=t=>{"class"in t&&n(0,o=t.class),"id"in t&&n(1,a=t.id),"style"in t&&n(11,c=t.style),"icon"in t&&n(12,u=t.icon),"fw"in t&&n(13,h=t.fw),"flip"in t&&n(14,l=t.flip),"pull"in t&&n(15,d=t.pull),"rotate"in t&&n(16,f=t.rotate),"size"in t&&n(17,p=t.size),"color"in t&&n(2,g=t.color),"primaryColor"in t&&n(3,m=t.primaryColor),"secondaryColor"in t&&n(4,y=t.secondaryColor),"primaryOpacity"in t&&n(5,v=t.primaryOpacity),"secondaryOpacity"in t&&n(6,w=t.secondaryOpacity),"swapOpacity"in t&&n(7,b=t.swapOpacity)},t.$$.update=()=>{if(4096&t.$$.dirty&&n(8,r=u&&u.icon||[0,0,"",[],""]),174080&t.$$.dirty){let t,e;const r="1em";let s,o,a,u="-.125em";const l="visible";h&&(a="center",e="1.25em"),d&&(t=d),p&&("lg"==p?(o="1.33333em",s=".75em",u="-.225em"):o="xs"==p?".75em":"sm"==p?".875em":p.replace("x","em"));const f={float:t,width:e,height:r,"line-height":s,"font-size":o,"text-align":a,"vertical-align":u,overflow:l};let g="";for(const n in f)f[n]&&(g+=`${n}:${f[n]};`);n(9,i=g+c)}if(81920&t.$$.dirty){let t="";if(l){let e=1,n=1;"horizontal"==l?e=-1:"vertical"==l?n=-1:e=n=-1,t+=` scale(${e} ${n})`}f&&(t+=` rotate(${f} 0 0)`),n(10,s=t)}},[o,a,g,m,y,v,w,b,r,i,s,c,u,h,l,d,f,p]}class wy extends Yt{constructor(t){super(),Xt(this,t,vy,yy,a,{class:0,id:1,style:11,icon:12,fw:13,flip:14,pull:15,rotate:16,size:17,color:2,primaryColor:3,secondaryColor:4,primaryOpacity:5,secondaryOpacity:6,swapOpacity:7})}}let by=(t=21)=>{let e="",n=crypto.getRandomValues(new Uint8Array(t));for(;t--;){let r=63&n[t];e+=r<36?r.toString(36):r<62?(r-26).toString(36).toUpperCase():r<63?"_":"-"}return e};
/*!
 * Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */var Iy={prefix:"fab",iconName:"facebook",icon:[512,512,[],"f09a","M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"]};export{ay as $,ut as A,n as B,Zt as C,R as D,X as E,F,V as G,t as H,s as I,by as J,lt as K,f as L,j as M,m as N,y as O,g as P,L as Q,bt as R,Yt as S,Ft as T,uy as U,wy as V,Iy as W,gt as X,zt as Y,It as Z,d as _,$ as a,fy as a0,u as a1,v as a2,x as a3,Q as a4,hy as a5,Vt as a6,ly as a7,vm as a8,ry as a9,B as aA,Y as aB,jt as aC,J as aD,ai as aa,fi as ab,l as ac,ty as ad,ny as ae,er as af,tr as ag,oi as ah,di as ai,ur as aj,ym as ak,Mt as al,Ut as am,cy as an,ft as ao,dy as ap,Z as aq,Ge as ar,Ke as as,He as at,_m as au,gi as av,Pi as aw,Sm as ax,et as ay,qt as az,q as b,K as c,D as d,O as e,N as f,H as g,W as h,Xt as i,Kt as j,M as k,U as l,Ht as m,G as n,Gt as o,Bt as p,$t as q,Dt as r,a as s,P as t,Lt as u,Wt as v,xt as w,Ot as x,dt as y,ht as z};
