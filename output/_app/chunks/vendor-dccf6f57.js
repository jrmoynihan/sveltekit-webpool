function t(){}const e=t=>t;function n(t,e){for(const n in e)t[n]=e[n];return t}function r(t){return t()}function i(){return Object.create(null)}function s(t){t.forEach(r)}function o(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let c;function u(t,e){return c||(c=document.createElement("a")),c.href=e,t===c.href}function h(e,...n){if(null==e)return t;const r=e.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}function l(t){let e;return h(t,(t=>e=t))(),e}function d(t,e,n){t.$$.on_destroy.push(h(e,n))}function f(t,e,n,r){if(t){const i=p(t,e,n,r);return t[0](i)}}function p(t,e,r,i){return t[1]&&i?n(r.ctx.slice(),t[1](i(e))):r.ctx}function m(t,e,n,r,i,s,o){const a=function(t,e,n,r){if(t[2]&&r){const i=t[2](r(n));if(void 0===e.dirty)return i;if("object"==typeof i){const t=[],n=Math.max(e.dirty.length,i.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|i[r];return t}return e.dirty|i}return e.dirty}(e,r,i,s);if(a){const i=p(e,n,r,o);t.p(i,a)}}function g(t,e,n=e){return t.set(n),e}const y="undefined"!=typeof window;let v=y?()=>window.performance.now():()=>Date.now(),w=y?t=>requestAnimationFrame(t):t;const b=new Set;function I(t){b.forEach((e=>{e.c(t)||(b.delete(e),e.f())})),0!==b.size&&w(I)}function _(t){let e;return 0===b.size&&w(I),{promise:new Promise((n=>{b.add(e={c:t,f:n})})),abort(){b.delete(e)}}}let T=!1;function E(t,e,n,r){for(;t<e;){const i=t+(e-t>>1);n(i)<=r?t=i+1:e=i}return t}function S(t){return t?t.getRootNode?t.getRootNode():t.ownerDocument:document}function k(t){const e=D("style");return function(t,e){!function(t,e){t.appendChild(e)}(t.head||t,e)}(function(t){const e=S(t);return e.host,e}(t),e),e}function C(t,e){if(T){for(!function(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if("HEAD"===t.nodeName){const t=[];for(let n=0;n<e.length;n++){const r=e[n];void 0!==r.claim_order&&t.push(r)}e=t}const n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let i=0;for(let c=0;c<e.length;c++){const t=e[c].claim_order,s=(i>0&&e[n[i]].claim_order<=t?i+1:E(1,i,(t=>e[n[t]].claim_order),t))-1;r[c]=n[s]+1;const o=s+1;n[o]=c,i=Math.max(o,i)}const s=[],o=[];let a=e.length-1;for(let c=n[i]+1;0!=c;c=r[c-1]){for(s.push(e[c-1]);a>=c;a--)o.push(e[a]);a--}for(;a>=0;a--)o.push(e[a]);s.reverse(),o.sort(((t,e)=>t.claim_order-e.claim_order));for(let c=0,u=0;c<o.length;c++){for(;u<s.length&&o[c].claim_order>=s[u].claim_order;)u++;const e=u<s.length?s[u]:null;t.insertBefore(o[c],e)}}(t),(void 0===t.actual_end_child||null!==t.actual_end_child&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);null!==t.actual_end_child&&void 0===t.actual_end_child.claim_order;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?void 0===e.claim_order&&e.parentNode===t||t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else e.parentNode!==t&&t.appendChild(e)}function R(t,e,n){T&&!n?C(t,e):e.parentNode===t&&e.nextSibling==n||t.insertBefore(e,n||null)}function N(t){t.parentNode.removeChild(t)}function A(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function D(t){return document.createElement(t)}function x(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function O(t){return document.createTextNode(t)}function L(){return O(" ")}function P(){return O("")}function M(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function U(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function F(t){return function(e){e.target===this&&t.call(this,e)}}function V(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function q(t){return Array.from(t.childNodes)}function B(t,e,n,r,i=!1){!function(t){void 0===t.claim_info&&(t.claim_info={last_index:0,total_claimed:0})}(t);const s=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const s=t[r];if(e(s)){const e=n(s);return void 0===e?t.splice(r,1):t[r]=e,i||(t.claim_info.last_index=r),s}}for(let r=t.claim_info.last_index-1;r>=0;r--){const s=t[r];if(e(s)){const e=n(s);return void 0===e?t.splice(r,1):t[r]=e,i?void 0===e&&t.claim_info.last_index--:t.claim_info.last_index=r,s}}return r()})();return s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,s}function $(t,e,n,r){return B(t,(t=>t.nodeName===e),(t=>{const e=[];for(let r=0;r<t.attributes.length;r++){const i=t.attributes[r];n[i.name]||e.push(i.name)}e.forEach((e=>t.removeAttribute(e)))}),(()=>r?x(e):D(e)))}function j(t,e){return B(t,(t=>3===t.nodeType),(t=>{const n=""+e;if(t.data.startsWith(n)){if(t.data.length!==n.length)return t.splitText(n.length)}else t.data=n}),(()=>O(e)),!0)}function z(t){return j(t," ")}function K(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function H(t,e){t.value=null==e?"":e}function G(t,e,n,r){t.style.setProperty(e,n,r?"important":"")}function W(t,e,n){t.classList[n?"add":"remove"](e)}function Q(t,e,n=!1){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,!1,e),r}function X(t,e=document.body){return Array.from(e.querySelectorAll(t))}const Y=new Set;let J,Z=0;function tt(t,e,n,r,i,s,o,a=0){const c=16.666/r;let u="{\n";for(let g=0;g<=1;g+=c){const t=e+(n-e)*s(g);u+=100*g+`%{${o(t,1-t)}}\n`}const h=u+`100% {${o(n,1-n)}}\n}`,l=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(h)}_${a}`,d=S(t);Y.add(d);const f=d.__svelte_stylesheet||(d.__svelte_stylesheet=k(t).sheet),p=d.__svelte_rules||(d.__svelte_rules={});p[l]||(p[l]=!0,f.insertRule(`@keyframes ${l} ${h}`,f.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${l} ${r}ms linear ${i}ms 1 both`,Z+=1,l}function et(t,e){const n=(t.style.animation||"").split(", "),r=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),i=n.length-r.length;i&&(t.style.animation=r.join(", "),Z-=i,Z||w((()=>{Z||(Y.forEach((t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}})),Y.clear())})))}function nt(t){J=t}function rt(){if(!J)throw new Error("Function called outside component initialization");return J}function it(t){rt().$$.on_mount.push(t)}function st(t){rt().$$.after_update.push(t)}function ot(){const t=rt();return(e,n)=>{const r=t.$$.callbacks[e];if(r){const i=Q(e,n);r.slice().forEach((e=>{e.call(t,i)}))}}}function at(t,e){rt().$$.context.set(t,e)}function ct(t){return rt().$$.context.get(t)}const ut=[],ht=[],lt=[],dt=[],ft=Promise.resolve();let pt=!1;function mt(t){lt.push(t)}function gt(t){dt.push(t)}let yt=!1;const vt=new Set;function wt(){if(!yt){yt=!0;do{for(let t=0;t<ut.length;t+=1){const e=ut[t];nt(e),bt(e.$$)}for(nt(null),ut.length=0;ht.length;)ht.pop()();for(let t=0;t<lt.length;t+=1){const e=lt[t];vt.has(e)||(vt.add(e),e())}lt.length=0}while(ut.length);for(;dt.length;)dt.pop()();pt=!1,yt=!1,vt.clear()}}function bt(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(mt)}}let It;function _t(){return It||(It=Promise.resolve(),It.then((()=>{It=null}))),It}function Tt(t,e,n){t.dispatchEvent(Q(`${e?"intro":"outro"}${n}`))}const Et=new Set;let St;function kt(){St={r:0,c:[],p:St}}function Ct(){St.r||s(St.c),St=St.p}function Rt(t,e){t&&t.i&&(Et.delete(t),t.i(e))}function Nt(t,e,n,r){if(t&&t.o){if(Et.has(t))return;Et.add(t),St.c.push((()=>{Et.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}const At={duration:0};function Dt(n,r,i){let s,a,c=r(n,i),u=!1,h=0;function l(){s&&et(n,s)}function d(){const{delay:r=0,duration:i=300,easing:o=e,tick:d=t,css:f}=c||At;f&&(s=tt(n,0,1,i,r,o,f,h++)),d(0,1);const p=v()+r,m=p+i;a&&a.abort(),u=!0,mt((()=>Tt(n,!0,"start"))),a=_((t=>{if(u){if(t>=m)return d(1,0),Tt(n,!0,"end"),l(),u=!1;if(t>=p){const e=o((t-p)/i);d(e,1-e)}}return u}))}let f=!1;return{start(){f||(f=!0,et(n),o(c)?(c=c(),_t().then(d)):d())},invalidate(){f=!1},end(){u&&(l(),u=!1)}}}function xt(n,r,i){let a,c=r(n,i),u=!0;const h=St;function l(){const{delay:r=0,duration:i=300,easing:o=e,tick:l=t,css:d}=c||At;d&&(a=tt(n,1,0,i,r,o,d));const f=v()+r,p=f+i;mt((()=>Tt(n,!1,"start"))),_((t=>{if(u){if(t>=p)return l(0,1),Tt(n,!1,"end"),--h.r||s(h.c),!1;if(t>=f){const e=o((t-f)/i);l(1-e,e)}}return u}))}return h.r+=1,o(c)?_t().then((()=>{c=c(),l()})):l(),{end(t){t&&c.tick&&c.tick(1,0),u&&(a&&et(n,a),u=!1)}}}function Ot(n,r,i,a){let c=r(n,i),u=a?0:1,h=null,l=null,d=null;function f(){d&&et(n,d)}function p(t,e){const n=t.b-u;return e*=Math.abs(n),{a:u,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function m(r){const{delay:i=0,duration:o=300,easing:a=e,tick:m=t,css:g}=c||At,y={start:v()+i,b:r};r||(y.group=St,St.r+=1),h||l?l=y:(g&&(f(),d=tt(n,u,r,o,i,a,g)),r&&m(0,1),h=p(y,o),mt((()=>Tt(n,r,"start"))),_((t=>{if(l&&t>l.start&&(h=p(l,o),l=null,Tt(n,h.b,"start"),g&&(f(),d=tt(n,u,h.b,h.duration,0,a,c.css))),h)if(t>=h.end)m(u=h.b,1-u),Tt(n,h.b,"end"),l||(h.b?f():--h.group.r||s(h.group.c)),h=null;else if(t>=h.start){const e=t-h.start;u=h.a+h.d*a(e/h.duration),m(u,1-u)}return!(!h&&!l)})))}return{run(t){o(c)?_t().then((()=>{c=c(),m(t)})):m(t)},end(){f(),h=l=null}}}const Lt="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function Pt(t,e){const n={},r={},i={$$scope:1};let s=t.length;for(;s--;){const o=t[s],a=e[s];if(a){for(const t in o)t in a||(r[t]=1);for(const t in a)i[t]||(n[t]=a[t],i[t]=1);t[s]=a}else for(const t in o)i[t]=1}for(const o in r)o in n||(n[o]=void 0);return n}function Mt(t){return"object"==typeof t&&null!==t?t:{}}function Ut(t,e,n){const r=t.$$.props[e];void 0!==r&&(t.$$.bound[r]=n,n(t.$$.ctx[r]))}function Ft(t){t&&t.c()}function Vt(t,e){t&&t.l(e)}function qt(t,e,n,i){const{fragment:a,on_mount:c,on_destroy:u,after_update:h}=t.$$;a&&a.m(e,n),i||mt((()=>{const e=c.map(r).filter(o);u?u.push(...e):s(e),t.$$.on_mount=[]})),h.forEach(mt)}function Bt(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function $t(t,e){-1===t.$$.dirty[0]&&(ut.push(t),pt||(pt=!0,ft.then(wt)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function jt(e,n,r,o,a,c,u,h=[-1]){const l=J;nt(e);const d=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:a,bound:i(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(l?l.$$.context:n.context||[]),callbacks:i(),dirty:h,skip_bound:!1,root:n.target||l.$$.root};u&&u(d.root);let f=!1;if(d.ctx=r?r(e,n.props||{},((t,n,...r)=>{const i=r.length?r[0]:n;return d.ctx&&a(d.ctx[t],d.ctx[t]=i)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](i),f&&$t(e,t)),n})):[],d.update(),f=!0,s(d.before_update),d.fragment=!!o&&o(d.ctx),n.target){if(n.hydrate){T=!0;const t=q(n.target);d.fragment&&d.fragment.l(t),t.forEach(N)}else d.fragment&&d.fragment.c();n.intro&&Rt(e.$$.fragment),qt(e,n.target,n.anchor,n.customElement),T=!1,wt()}nt(l)}class zt{$destroy(){Bt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Kt=[];function Ht(e,n=t){let r;const i=new Set;function s(t){if(a(e,t)&&(e=t,r)){const t=!Kt.length;for(const n of i)n[1](),Kt.push(n,e);if(t){for(let t=0;t<Kt.length;t+=2)Kt[t][0](Kt[t+1]);Kt.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(o,a=t){const c=[o,a];return i.add(c),1===i.size&&(r=n(s)||t),o(e),()=>{i.delete(c),0===i.size&&(r(),r=null)}}}}
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
***************************************************************************** */var Gt=function(t,e){return(Gt=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};function Wt(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]])}return n}function Qt(t,e,n,r){return new(n||(n=Promise))((function(i,s){function o(t){try{c(r.next(t))}catch(e){s(e)}}function a(t){try{c(r.throw(t))}catch(e){s(e)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,a)}c((r=r.apply(t,e||[])).next())}))}function Xt(t,e){var n,r,i,s,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(i=2&s[0]?r.return:s[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,s[1])).done)return i;switch(r=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return o.label++,{value:s[1],done:!1};case 5:o.label++,r=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!(i=o.trys,(i=i.length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){o=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){o.label=s[1];break}if(6===s[0]&&o.label<i[1]){o.label=i[1],i=s;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(s);break}i[2]&&o.ops.pop(),o.trys.pop();continue}s=e.call(t,o)}catch(a){s=[6,a],r=0}finally{n=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}}function Yt(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Jt(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,i,s=n.call(t),o=[];try{for(;(void 0===e||e-- >0)&&!(r=s.next()).done;)o.push(r.value)}catch(a){i={error:a}}finally{try{r&&!r.done&&(n=s.return)&&n.call(s)}finally{if(i)throw i.error}}return o}function Zt(t,e,n){if(n||2===arguments.length)for(var r,i=0,s=e.length;i<s;i++)!r&&i in e||(r||(r=Array.prototype.slice.call(e,0,i)),r[i]=e[i]);return t.concat(r||e)}
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
 */var te={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray:function(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();for(var n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[],i=0;i<t.length;i+=3){var s=t[i],o=i+1<t.length,a=o?t[i+1]:0,c=i+2<t.length,u=c?t[i+2]:0,h=s>>2,l=(3&s)<<4|a>>4,d=(15&a)<<2|u>>6,f=63&u;c||(f=64,o||(d=64)),r.push(n[h],n[l],n[d],n[f])}return r.join("")},encodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(function(t){for(var e=[],n=0,r=0;r<t.length;r++){var i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=63&i|128):55296==(64512&i)&&r+1<t.length&&56320==(64512&t.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&t.charCodeAt(++r)),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=63&i|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=63&i|128)}return e}(t),e)},decodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):function(t){for(var e=[],n=0,r=0;n<t.length;){var i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){var s=t[n++];e[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){var o=((7&i)<<18|(63&(s=t[n++]))<<12|(63&(a=t[n++]))<<6|63&t[n++])-65536;e[r++]=String.fromCharCode(55296+(o>>10)),e[r++]=String.fromCharCode(56320+(1023&o))}else{s=t[n++];var a=t[n++];e[r++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&a)}}return e.join("")}(this.decodeStringToByteArray(t,e))},decodeStringToByteArray:function(t,e){this.init_();for(var n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[],i=0;i<t.length;){var s=n[t.charAt(i++)],o=i<t.length?n[t.charAt(i)]:0,a=++i<t.length?n[t.charAt(i)]:64,c=++i<t.length?n[t.charAt(i)]:64;if(++i,null==s||null==o||null==a||null==c)throw Error();var u=s<<2|o>>4;if(r.push(u),64!==a){var h=o<<4&240|a>>2;if(r.push(h),64!==c){var l=a<<6&192|c;r.push(l)}}}return r},init_:function(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(var t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},ee=function(){function t(){var t=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise((function(e,n){t.resolve=e,t.reject=n}))}return t.prototype.wrapCallback=function(t){var e=this;return function(n,r){n?e.reject(n):e.resolve(r),"function"==typeof t&&(e.promise.catch((function(){})),1===t.length?t(n):t(n,r))}},t}();
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
function ne(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function re(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ne())}function ie(){var t="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof t&&void 0!==t.id}function se(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function oe(){var t=ne();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}
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
var ae=function(t){function e(n,r,i){var s=t.call(this,r)||this;return s.code=n,s.customData=i,s.name="FirebaseError",Object.setPrototypeOf(s,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(s,ce.prototype.create),s}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}Gt(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e}(Error),ce=function(){function t(t,e,n){this.service=t,this.serviceName=e,this.errors=n}return t.prototype.create=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=e[0]||{},i=this.service+"/"+t,s=this.errors[t],o=s?ue(s,r):"Error",a=this.serviceName+": "+o+" ("+i+").",c=new ae(i,a,r);return c},t}();function ue(t,e){return t.replace(he,(function(t,n){var r=e[n];return null!=r?String(r):"<"+n+"?>"}))}var he=/\{\$([^}]+)}/g;
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
function le(t){for(var e=[],n=function(t,n){Array.isArray(n)?n.forEach((function(n){e.push(encodeURIComponent(t)+"="+encodeURIComponent(n))})):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n))},r=0,i=Object.entries(t);r<i.length;r++){var s=i[r];n(s[0],s[1])}return e.length?"&"+e.join("&"):""}var de=function(){function t(t,e){var n=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then((function(){t(n)})).catch((function(t){n.error(t)}))}return t.prototype.next=function(t){this.forEachObserver((function(e){e.next(t)}))},t.prototype.error=function(t){this.forEachObserver((function(e){e.error(t)})),this.close(t)},t.prototype.complete=function(){this.forEachObserver((function(t){t.complete()})),this.close()},t.prototype.subscribe=function(t,e,n){var r,i=this;if(void 0===t&&void 0===e&&void 0===n)throw new Error("Missing Observer.");void 0===(r=function(t,e){if("object"!=typeof t||null===t)return!1;for(var n=0,r=e;n<r.length;n++){var i=r[n];if(i in t&&"function"==typeof t[i])return!0}return!1}(t,["next","error","complete"])?t:{next:t,error:e,complete:n}).next&&(r.next=fe),void 0===r.error&&(r.error=fe),void 0===r.complete&&(r.complete=fe);var s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((function(){try{i.finalError?r.error(i.finalError):r.complete()}catch(t){}})),this.observers.push(r),s},t.prototype.unsubscribeOne=function(t){void 0!==this.observers&&void 0!==this.observers[t]&&(delete this.observers[t],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},t.prototype.forEachObserver=function(t){if(!this.finalized)for(var e=0;e<this.observers.length;e++)this.sendOne(e,t)},t.prototype.sendOne=function(t,e){var n=this;this.task.then((function(){if(void 0!==n.observers&&void 0!==n.observers[t])try{e(n.observers[t])}catch(r){"undefined"!=typeof console&&console.error&&console.error(r)}}))},t.prototype.close=function(t){var e=this;this.finalized||(this.finalized=!0,void 0!==t&&(this.finalError=t),this.task.then((function(){e.observers=void 0,e.onNoObservers=void 0})))},t}();function fe(){}
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
 */function pe(t){return t&&t._delegate?t._delegate:t}var me=function(){function t(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(t){return this.instantiationMode=t,this},t.prototype.setMultipleInstances=function(t){return this.multipleInstances=t,this},t.prototype.setServiceProps=function(t){return this.serviceProps=t,this},t.prototype.setInstanceCreatedCallback=function(t){return this.onInstanceCreated=t,this},t}(),ge=function(){function t(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.onInitCallbacks=new Map}return t.prototype.get=function(t){var e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){var n=new ee;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{var r=this.getOrInitializeService({instanceIdentifier:e});r&&n.resolve(r)}catch(i){}}return this.instancesDeferred.get(e).promise},t.prototype.getImmediate=function(t){var e,n=this.normalizeInstanceIdentifier(null==t?void 0:t.identifier),r=null!==(e=null==t?void 0:t.optional)&&void 0!==e&&e;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error("Service "+this.name+" is not available")}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}},t.prototype.getComponent=function(){return this.component},t.prototype.setComponent=function(t){var e,n;if(t.name!==this.name)throw Error("Mismatching Component "+t.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if(this.component=t,this.shouldAutoInitialize()){if(function(t){return"EAGER"===t.instantiationMode}
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
 */(t))try{this.getOrInitializeService({instanceIdentifier:"[DEFAULT]"})}catch(h){}try{for(var r=Yt(this.instancesDeferred.entries()),i=r.next();!i.done;i=r.next()){var s=Jt(i.value,2),o=s[0],a=s[1],c=this.normalizeInstanceIdentifier(o);try{var u=this.getOrInitializeService({instanceIdentifier:c});a.resolve(u)}catch(h){}}}catch(l){e={error:l}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(e)throw e.error}}}},t.prototype.clearInstance=function(t){void 0===t&&(t="[DEFAULT]"),this.instancesDeferred.delete(t),this.instances.delete(t)},t.prototype.delete=function(){return Qt(this,void 0,void 0,(function(){var t;return Xt(this,(function(e){switch(e.label){case 0:return t=Array.from(this.instances.values()),[4,Promise.all(Zt(Zt([],Jt(t.filter((function(t){return"INTERNAL"in t})).map((function(t){return t.INTERNAL.delete()})))),Jt(t.filter((function(t){return"_delete"in t})).map((function(t){return t._delete()})))))];case 1:return e.sent(),[2]}}))}))},t.prototype.isComponentSet=function(){return null!=this.component},t.prototype.isInitialized=function(t){return void 0===t&&(t="[DEFAULT]"),this.instances.has(t)},t.prototype.initialize=function(t){var e,n;void 0===t&&(t={});var r=t.options,i=void 0===r?{}:r,s=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(s))throw Error(this.name+"("+s+") has already been initialized");if(!this.isComponentSet())throw Error("Component "+this.name+" has not been registered yet");var o=this.getOrInitializeService({instanceIdentifier:s,options:i});try{for(var a=Yt(this.instancesDeferred.entries()),c=a.next();!c.done;c=a.next()){var u=Jt(c.value,2),h=u[0],l=u[1];s===this.normalizeInstanceIdentifier(h)&&l.resolve(o)}}catch(d){e={error:d}}finally{try{c&&!c.done&&(n=a.return)&&n.call(a)}finally{if(e)throw e.error}}return this.invokeOnInitCallbacks(o,s),o},t.prototype.onInit=function(t,e){var n,r=this.normalizeInstanceIdentifier(e),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(t),this.onInitCallbacks.set(r,i);var s=this.instances.get(r);return s&&t(s,r),function(){i.delete(t)}},t.prototype.invokeOnInitCallbacks=function(t,e){var n,r,i=this.onInitCallbacks.get(e);if(i)try{for(var s=Yt(i),o=s.next();!o.done;o=s.next()){var a=o.value;try{a(t,e)}catch(c){}}}catch(u){n={error:u}}finally{try{o&&!o.done&&(r=s.return)&&r.call(s)}finally{if(n)throw n.error}}},t.prototype.getOrInitializeService=function(t){var e,n=t.instanceIdentifier,r=t.options,i=void 0===r?{}:r,s=this.instances.get(n);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:(e=n,"[DEFAULT]"===e?void 0:e),options:i}),this.instances.set(n,s),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,n,s)}catch(o){}return s||null},t.prototype.normalizeInstanceIdentifier=function(t){return void 0===t&&(t="[DEFAULT]"),this.component?this.component.multipleInstances?t:"[DEFAULT]":t},t.prototype.shouldAutoInitialize=function(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode},t}();
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
 */var ye,ve,we,be=function(){function t(t){this.name=t,this.providers=new Map}return t.prototype.addComponent=function(t){var e=this.getProvider(t.name);if(e.isComponentSet())throw new Error("Component "+t.name+" has already been registered with "+this.name);e.setComponent(t)},t.prototype.addOrOverwriteComponent=function(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)},t.prototype.getProvider=function(t){if(this.providers.has(t))return this.providers.get(t);var e=new ge(t,this);return this.providers.set(t,e),e},t.prototype.getProviders=function(){return Array.from(this.providers.values())},t}();
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
***************************************************************************** */function Ie(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var r=Array(t),i=0;for(e=0;e<n;e++)for(var s=arguments[e],o=0,a=s.length;o<a;o++,i++)r[i]=s[o];return r}
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
 */(we=ve||(ve={}))[we.DEBUG=0]="DEBUG",we[we.VERBOSE=1]="VERBOSE",we[we.INFO=2]="INFO",we[we.WARN=3]="WARN",we[we.ERROR=4]="ERROR",we[we.SILENT=5]="SILENT";var _e={debug:ve.DEBUG,verbose:ve.VERBOSE,info:ve.INFO,warn:ve.WARN,error:ve.ERROR,silent:ve.SILENT},Te=ve.INFO,Ee=((ye={})[ve.DEBUG]="log",ye[ve.VERBOSE]="log",ye[ve.INFO]="info",ye[ve.WARN]="warn",ye[ve.ERROR]="error",ye),Se=function(t,e){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(e<t.logLevel)){var i=(new Date).toISOString(),s=Ee[e];if(!s)throw new Error("Attempted to log a message with an invalid logType (value: "+e+")");console[s].apply(console,Ie(["["+i+"]  "+t.name+":"],n))}},ke=function(){function t(t){this.name=t,this._logLevel=Te,this._logHandler=Se,this._userLogHandler=null}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(t){if(!(t in ve))throw new TypeError('Invalid value "'+t+'" assigned to `logLevel`');this._logLevel=t},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(t){this._logLevel="string"==typeof t?_e[t]:t},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(t){this._userLogHandler=t},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,Ie([this,ve.DEBUG],t)),this._logHandler.apply(this,Ie([this,ve.DEBUG],t))},t.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,Ie([this,ve.VERBOSE],t)),this._logHandler.apply(this,Ie([this,ve.VERBOSE],t))},t.prototype.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,Ie([this,ve.INFO],t)),this._logHandler.apply(this,Ie([this,ve.INFO],t))},t.prototype.warn=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,Ie([this,ve.WARN],t)),this._logHandler.apply(this,Ie([this,ve.WARN],t))},t.prototype.error=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,Ie([this,ve.ERROR],t)),this._logHandler.apply(this,Ie([this,ve.ERROR],t))},t}();
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
class Ce{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map((t=>{if(function(t){const e=t.getComponent();return"VERSION"===(null==e?void 0:e.type)}(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}return null})).filter((t=>t)).join(" ")}}const Re=new ke("@firebase/app"),Ne={"@firebase/app-exp":"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics-exp":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check-exp":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth-exp":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions-exp":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations-exp":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging-exp":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance-exp":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config-exp":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js","firebase-exp":"fire-js-all"},Ae=new Map,De=new Map;function xe(t,e){try{t.container.addComponent(e)}catch(n){Re.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Oe(t){const e=t.name;if(De.has(e))return Re.debug(`There were multiple attempts to register component ${e}.`),!1;De.set(e,t);for(const n of Ae.values())xe(n,t);return!0}function Le(t,e){return t.container.getProvider(e)}
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
 */const Pe=new ce("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function."});
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
class Me{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new me("app-exp",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Pe.create("app-deleted",{appName:this._name})}}
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
 */function Ue(t,e={}){if("object"!=typeof e){e={name:e}}const n=Object.assign({name:"[DEFAULT]",automaticDataCollectionEnabled:!1},e),r=n.name;if("string"!=typeof r||!r)throw Pe.create("bad-app-name",{appName:String(r)});if(Ae.has(r))throw Pe.create("duplicate-app",{appName:r});const i=new be(r);for(const o of De.values())i.addComponent(o);const s=new Me(t,n,i);return Ae.set(r,s),s}function Fe(t="[DEFAULT]"){const e=Ae.get(t);if(!e)throw Pe.create("no-app",{appName:t});return e}function Ve(t,e,n){var r;let i=null!==(r=Ne[t])&&void 0!==r?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const t=[`Unable to register library "${i}" with version "${e}":`];return s&&t.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&t.push("and"),o&&t.push(`version name "${e}" contains illegal characters (whitespace or "/")`),void Re.warn(t.join(" "))}Oe(new me(`${i}-version`,(()=>({library:i,version:e})),"VERSION"))}
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
 */var qe;Oe(new me("platform-logger",(t=>new Ce(t)),"PRIVATE")),Ve("@firebase/app-exp","0.0.900-exp.f43d0c698",qe),Ve("fire-js","");const Be=new ce("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),$e=new ke("@firebase/auth-exp");
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
 */function je(t,...e){$e.logLevel<=ve.ERROR&&$e.error(`Auth (9.0.0-beta.6): ${t}`,...e)}
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
 */function ze(t,...e){throw He(t,...e)}function Ke(t,...e){return He(t,...e)}function He(t,...e){if("string"!=typeof t){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Be.create(t,...e)}function Ge(t,e,...n){if(!t)throw He(e,...n)}function We(t){const e="INTERNAL ASSERTION FAILED: "+t;throw je(e),new Error(e)}function Qe(t,e){t||We(e)}
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
 */const Xe=new Map;function Ye(t){Qe(t instanceof Function,"Expected a class definition");let e=Xe.get(t);return e?(Qe(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Xe.set(t,e),e)}
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
function Je(){var t;return"undefined"!=typeof self&&(null===(t=self.location)||void 0===t?void 0:t.href)||""}function Ze(){var t;return"undefined"!=typeof self&&(null===(t=self.location)||void 0===t?void 0:t.protocol)||null}
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
 */function tn(){return"undefined"==typeof navigator||!navigator||!("onLine"in navigator)||"boolean"!=typeof navigator.onLine||"http:"!==Ze()&&"https:"!==Ze()&&!ie()&&!("connection"in navigator)||navigator.onLine}
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
class en{constructor(t,e){this.shortDelay=t,this.longDelay=e,Qe(e>t,"Short delay should be less than long delay!"),this.isMobile=re()||se()}get(){return tn()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
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
 */function nn(t,e){Qe(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}
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
 */class rn{static initialize(t,e,n){this.fetchImpl=t,e&&(this.headersImpl=e),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:void We("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:void We("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:void We("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
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
 */const sn={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded"},on=new en(3e4,6e4);
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
 */async function an(t,e,n,r,i={}){return cn(t,i,(()=>{let i={},s={};r&&("GET"===e?s=r:i={body:JSON.stringify(r)});const o=le(Object.assign({key:t.config.apiKey},s)).slice(1),a=new(rn.headers());return a.set("Content-Type","application/json"),a.set("X-Client-Version",t._getSdkClientVersion()),t.languageCode&&a.set("X-Firebase-Locale",t.languageCode),rn.fetch()(un(t,t.config.apiHost,n,o),Object.assign({method:e,headers:a,referrerPolicy:"no-referrer"},i))}))}async function cn(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},sn),e);try{const e=new hn(t),i=await Promise.race([n(),e.promise]);e.clearNetworkTimeout();const s=await i.json();if("needConfirmation"in s)throw ln(t,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{const e=(i.ok?s.errorMessage:s.error.message).split(" : ")[0];if("FEDERATED_USER_ID_ALREADY_LINKED"===e)throw ln(t,"credential-already-in-use",s);if("EMAIL_EXISTS"===e)throw ln(t,"email-already-in-use",s);ze(t,r[e]||e.toLowerCase().replace(/[_\s]+/g,"-"))}}catch(i){if(i instanceof ae)throw i;ze(t,"network-request-failed")}}function un(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?nn(t.config,i):`${t.config.apiScheme}://${i}`}class hn{constructor(t){this.auth=t,this.timer=null,this.promise=new Promise(((t,e)=>{this.timer=setTimeout((()=>e(Ke(this.auth,"timeout"))),on.get())}))}clearNetworkTimeout(){clearTimeout(this.timer)}}function ln(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=Ke(t,e,r);return i.customData._tokenResponse=n,i}
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
function dn(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch(e){}}function fn(t){return 1e3*Number(t)}function pn(t){const[e,n,r]=t.split(".");if(void 0===e||void 0===n||void 0===r)return je("JWT malformed, contained fewer than 3 sections"),null;try{const t=function(t){try{return te.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null}(n);return t?JSON.parse(t):(je("Failed to decode base64 JWT payload"),null)}catch(i){return je("Caught error parsing JWT payload as JSON",i),null}}
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
async function mn(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof ae&&function({code:t}){return"auth/user-disabled"===t||"auth/user-token-expired"===t}
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
 */(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}class gn{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(t){var e;if(t){const t=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),t}{this.errorBackoff=3e4;const t=(null!==(e=this.user.stsTokenManager.expirationTime)&&void 0!==e?e:0)-Date.now()-3e5;return Math.max(0,t)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout((async()=>{await this.iteration()}),e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){return void("auth/network-request-failed"===t.code&&this.schedule(!0))}this.schedule()}}
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
 */class yn{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=dn(this.lastLoginAt),this.creationTime=dn(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
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
 */async function vn(t){var e;const n=t.auth,r=await t.getIdToken(),i=await mn(t,async function(t,e){return an(t,"POST","/v1/accounts:lookup",e)}(n,{idToken:r}));Ge(null==i?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=(null===(e=s.providerUserInfo)||void 0===e?void 0:e.length)?s.providerUserInfo.map((t=>{var{providerId:e}=t,n=Wt(t,["providerId"]);return{providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})):[];const a=(c=t.providerData,u=o,[...c.filter((t=>!u.some((e=>e.providerId===t.providerId)))),...u]);var c,u;const h=t.isAnonymous,l=!(t.email&&s.passwordHash||(null==a?void 0:a.length)),d=!!h&&l,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new yn(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(t,f)}
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
class wn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){Ge(t.idToken,"internal-error"),Ge(void 0!==t.idToken,"internal-error"),Ge(void 0!==t.refreshToken,"internal-error");const e="expiresIn"in t&&void 0!==t.expiresIn?Number(t.expiresIn):function(t){const e=pn(t);return Ge(e,"internal-error"),Ge(void 0!==e.exp,"internal-error"),Ge(void 0!==e.iat,"internal-error"),Number(e.exp)-Number(e.iat)}(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}async getToken(t,e=!1){return Ge(!this.accessToken||this.refreshToken,t,"user-token-expired"),e||!this.accessToken||this.isExpired?this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:n,refreshToken:r,expiresIn:i}=await
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
async function(t,e){const n=await cn(t,{},(()=>{const n=le({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,s=un(t,r,"/v1/token",`key=${i}`);return rn.fetch()(s,{method:"POST",headers:{"X-Client-Version":t._getSdkClientVersion(),"Content-Type":"application/x-www-form-urlencoded"},body:n})}));return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(t,e);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(t,e,n){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(t,e){const{refreshToken:n,accessToken:r,expirationTime:i}=e,s=new wn;return n&&(Ge("string"==typeof n,"internal-error",{appName:t}),s.refreshToken=n),r&&(Ge("string"==typeof r,"internal-error",{appName:t}),s.accessToken=r),i&&(Ge("number"==typeof i,"internal-error",{appName:t}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new wn,this.toJSON())}_performRefresh(){return We("not implemented")}}
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
 */function bn(t,e){Ge("string"==typeof t||void 0===t,"internal-error",{appName:e})}class In{constructor(t){var{uid:e,auth:n,stsTokenManager:r}=t,i=Wt(t,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.emailVerified=!1,this.isAnonymous=!1,this.tenantId=null,this.providerData=[],this.proactiveRefresh=new gn(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.metadata=new yn(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(t){const e=await mn(this,this.stsTokenManager.getToken(this.auth,t));return Ge(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return async function(t,e=!1){const n=pe(t),r=await n.getIdToken(e),i=pn(r);Ge(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s="object"==typeof i.firebase?i.firebase:void 0,o=null==s?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:dn(fn(i.auth_time)),issuedAtTime:dn(fn(i.iat)),expirationTime:dn(fn(i.exp)),signInProvider:o||null,signInSecondFactor:(null==s?void 0:s.sign_in_second_factor)||null}}(this,t)}reload(){return async function(t){const e=pe(t);await vn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}(this)}_assign(t){this!==t&&(Ge(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map((t=>Object.assign({},t))),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){return new In(Object.assign(Object.assign({},this),{auth:t,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(t){Ge(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let n=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),n=!0),e&&await vn(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){const t=await this.getIdToken();return await mn(this,async function(t,e){return an(t,"POST","/v1/accounts:delete",e)}(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map((t=>Object.assign({},t))),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){var n,r,i,s,o,a,c,u;const h=null!==(n=e.displayName)&&void 0!==n?n:void 0,l=null!==(r=e.email)&&void 0!==r?r:void 0,d=null!==(i=e.phoneNumber)&&void 0!==i?i:void 0,f=null!==(s=e.photoURL)&&void 0!==s?s:void 0,p=null!==(o=e.tenantId)&&void 0!==o?o:void 0,m=null!==(a=e._redirectEventId)&&void 0!==a?a:void 0,g=null!==(c=e.createdAt)&&void 0!==c?c:void 0,y=null!==(u=e.lastLoginAt)&&void 0!==u?u:void 0,{uid:v,emailVerified:w,isAnonymous:b,providerData:I,stsTokenManager:_}=e;Ge(v&&_,t,"internal-error");const T=wn.fromJSON(this.name,_);Ge("string"==typeof v,t,"internal-error"),bn(h,t.name),bn(l,t.name),Ge("boolean"==typeof w,t,"internal-error"),Ge("boolean"==typeof b,t,"internal-error"),bn(d,t.name),bn(f,t.name),bn(p,t.name),bn(m,t.name),bn(g,t.name),bn(y,t.name);const E=new In({uid:v,auth:t,email:l,emailVerified:w,displayName:h,isAnonymous:b,photoURL:f,phoneNumber:d,tenantId:p,stsTokenManager:T,createdAt:g,lastLoginAt:y});return I&&Array.isArray(I)&&(E.providerData=I.map((t=>Object.assign({},t)))),m&&(E._redirectEventId=m),E}static async _fromIdTokenResponse(t,e,n=!1){const r=new wn;r.updateFromServerResponse(e);const i=new In({uid:e.localId,auth:t,stsTokenManager:r,isAnonymous:n});return await vn(i),i}}
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
 */class _n{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return void 0===e?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}_n.type="NONE";const Tn=_n;
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
 */function En(t,e,n){return`firebase:${t}:${e}:${n}`}class Sn{constructor(t,e,n){this.persistence=t,this.auth=e,this.userKey=n;const{config:r,name:i}=this.auth;this.fullUserKey=En(this.userKey,r.apiKey,i),this.fullPersistenceKey=En("persistence",r.apiKey,i),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);return t?In._fromJSON(this.auth,t):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=t,e?this.setCurrentUser(e):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,n="authUser"){if(!e.length)return new Sn(Ye(Tn),t,n);let r=Ye(Tn);for(const a of e)if(await a._isAvailable()){r=a;break}let i=null;const s=En(n,t.config.apiKey,t.name);for(const a of e)try{const e=await a._get(s);if(e){const n=In._fromJSON(t,e);a!==r&&(i=n);break}}catch(o){}return i&&await r._set(s,i.toJSON()),await Promise.all(e.map((async t=>{if(t!==r)try{await t._remove(s)}catch(o){}}))),new Sn(r,t,n)}}
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
 */function kn(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(An(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Cn(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(xn(e))return"Blackberry";if(On(e))return"Webos";if(Rn(e))return"Safari";if((e.includes("chrome/")||Nn(e))&&!e.includes("edge/"))return"Chrome";if(Dn(e))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=t.match(e);if(2===(null==n?void 0:n.length))return n[1]}return"Other"}function Cn(t=ne()){return/firefox\//i.test(t)}function Rn(t=ne()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Nn(t=ne()){return/crios\//i.test(t)}function An(t=ne()){return/iemobile/i.test(t)}function Dn(t=ne()){return/android/i.test(t)}function xn(t=ne()){return/blackberry/i.test(t)}function On(t=ne()){return/webos/i.test(t)}function Ln(t=ne()){return/iphone|ipad|ipod/i.test(t)}function Pn(t=ne()){return Ln(t)||Dn(t)||On(t)||xn(t)||/windows phone/i.test(t)||An(t)}
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
function Mn(t,e=[]){let n;switch(t){case"Browser":n=kn(ne());break;case"Worker":n=`${kn(ne())}-${t}`;break;default:n=t}return`${n}/JsCore/9.0.0-beta.6/${e.length?e.join(","):"FirebaseCore-web"}`}
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
 */class Un{constructor(t,e){this.app=t,this.config=e,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Vn(this),this.idTokenSubscription=new Vn(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.redirectInitializerError=null,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Be,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=e.sdkClientVersion}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=Ye(e)),this._initializationPromise=this.queue((async()=>{var n;this._deleted||(this.persistenceManager=await Sn.create(this,t),this._deleted||((null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)&&await this._popupRedirectResolver._initialize(this),await this.initializeCurrentUser(e),this._deleted||(this._isInitialized=!0)))})),this._initializationPromise.then((()=>{if(this.redirectInitializerError)throw this.redirectInitializerError}))}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();return this.currentUser||t?this.currentUser&&t&&this.currentUser.uid===t.uid?(this._currentUser._assign(t),void(await this.currentUser.getIdToken())):void(await this._updateCurrentUser(t)):void 0}async initializeCurrentUser(t){var e;let n=await this.assertedPersistence.getCurrentUser();if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=null===(e=this.redirectUser)||void 0===e?void 0:e._redirectEventId,i=null==n?void 0:n._redirectEventId,s=await this.tryRedirectSignIn(t);r&&r!==i||!(null==s?void 0:s.user)||(n=s.user)}return n?n._redirectEventId?(Ge(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)):this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch(n){this.redirectInitializerError=n,await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await vn(t)}catch(e){if("auth/network-request-failed"!==e.code)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(t){const e=t?pe(t):null;return e&&Ge(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t){if(!this._deleted)return t&&Ge(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),this.queue((async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()}))}async signOut(){return(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null)}setPersistence(t){return this.queue((async()=>{await this.assertedPersistence.setPersistence(Ye(t))}))}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(t){this._errorFactory=new ce("auth","Firebase",t())}onAuthStateChanged(t,e,n){return this.registerStateListener(this.authStateSubscription,t,e,n)}onIdTokenChanged(t,e,n){return this.registerStateListener(this.idTokenSubscription,t,e,n)}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(t=this._currentUser)||void 0===t?void 0:t.toJSON()}}async _setRedirectUser(t,e){const n=await this.getOrInitRedirectPersistenceManager(e);return null===t?n.removeCurrentUser():n.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&Ye(t)||this._popupRedirectResolver;Ge(e,this,"argument-error"),this.redirectPersistenceManager=await Sn.create(this,[Ye(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var e,n;return this._isInitialized&&await this.queue((async()=>{})),(null===(e=this._currentUser)||void 0===e?void 0:e._redirectEventId)===t?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue((async()=>this.directlySetCurrentUser(t)))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t,e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=null!==(e=null===(t=this.currentUser)||void 0===t?void 0:t.uid)&&void 0!==e?e:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,n,r){if(this._deleted)return()=>{};const i="function"==typeof e?e:e.next.bind(e),s=this._isInitialized?Promise.resolve():this._initializationPromise;return Ge(s,this,"internal-error"),s.then((()=>i(this.currentUser))),"function"==typeof e?t.addObserver(e,n,r):t.addObserver(e)}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&(this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh()),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return Ge(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){t&&!this.frameworks.includes(t)&&(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=Mn(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}_getSdkClientVersion(){return this.clientVersion}}function Fn(t){return pe(t)}class Vn{constructor(t){var e,n;this.auth=t,this.observer=null,this.addObserver=(n=new de((t=>this.observer=t),e)).subscribe.bind(n)}get next(){return Ge(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
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
 */class qn{constructor(t,e){this.providerId=t,this.signInMethod=e}toJSON(){return We("not implemented")}_getIdTokenResponse(t){return We("not implemented")}_linkToIdToken(t,e){return We("not implemented")}_getReauthenticationResolver(t){return We("not implemented")}}
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
 */async function Bn(t,e){return async function(t,e,n,r,i={}){const s=await an(t,e,n,r,i);return"mfaPendingCredential"in s&&ze(t,"multi-factor-auth-required",{serverResponse:s}),s}(t,"POST","/v1/accounts:signInWithIdp",function(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}(t,e))}
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
 */class $n extends qn{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const e=new $n(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(e.idToken=t.idToken),t.accessToken&&(e.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(e.nonce=t.nonce),t.pendingToken&&(e.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(e.accessToken=t.oauthToken,e.secret=t.oauthTokenSecret):ze("argument-error"),e}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const e="string"==typeof t?JSON.parse(t):t,{providerId:n,signInMethod:r}=e,i=Wt(e,["providerId","signInMethod"]);if(!n||!r)return null;const s=new $n(n,r);return Object.assign(s,i),s}_getIdTokenResponse(t){return Bn(t,this.buildRequest())}_linkToIdToken(t,e){const n=this.buildRequest();return n.idToken=e,Bn(t,n)}_getReauthenticationResolver(t){const e=this.buildRequest();return e.autoCreate=!1,Bn(t,e)}buildRequest(){const t={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const e={};this.idToken&&(e.id_token=this.idToken),this.accessToken&&(e.access_token=this.accessToken),this.secret&&(e.oauth_token_secret=this.secret),e.providerId=this.providerId,this.nonce&&!this.pendingToken&&(e.nonce=this.nonce),t.postBody=le(e)}return t}}
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
 */class jn{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}
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
 */class zn extends jn{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}
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
 */class Kn extends zn{constructor(){super("facebook.com")}static credential(t){return $n._fromParams({providerId:Kn.PROVIDER_ID,signInMethod:Kn.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Kn.credentialFromTaggedObject(t)}static credentialFromError(t){return Kn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t))return null;if(!t.oauthAccessToken)return null;try{return Kn.credential(t.oauthAccessToken)}catch(e){return null}}}Kn.FACEBOOK_SIGN_IN_METHOD="facebook.com",Kn.PROVIDER_ID="facebook.com";
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
class Hn extends zn{constructor(){super("google.com"),this.addScope("profile")}static credential(t,e){return $n._fromParams({providerId:Hn.PROVIDER_ID,signInMethod:Hn.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:e})}static credentialFromResult(t){return Hn.credentialFromTaggedObject(t)}static credentialFromError(t){return Hn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:e,oauthAccessToken:n}=t;if(!e&&!n)return null;try{return Hn.credential(e,n)}catch(r){return null}}}Hn.GOOGLE_SIGN_IN_METHOD="google.com",Hn.PROVIDER_ID="google.com";
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
class Gn extends zn{constructor(){super("github.com")}static credential(t){return $n._fromParams({providerId:Gn.PROVIDER_ID,signInMethod:Gn.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Gn.credentialFromTaggedObject(t)}static credentialFromError(t){return Gn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t))return null;if(!t.oauthAccessToken)return null;try{return Gn.credential(t.oauthAccessToken)}catch(e){return null}}}Gn.GITHUB_SIGN_IN_METHOD="github.com",Gn.PROVIDER_ID="github.com";
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
class Wn extends zn{constructor(){super("twitter.com")}static credential(t,e){return $n._fromParams({providerId:Wn.PROVIDER_ID,signInMethod:Wn.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:e})}static credentialFromResult(t){return Wn.credentialFromTaggedObject(t)}static credentialFromError(t){return Wn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:e,oauthTokenSecret:n}=t;if(!e||!n)return null;try{return Wn.credential(e,n)}catch(r){return null}}}Wn.TWITTER_SIGN_IN_METHOD="twitter.com",Wn.PROVIDER_ID="twitter.com";
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
class Qn{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,e,n,r=!1){const i=await In._fromIdTokenResponse(t,n,r),s=Xn(n);return new Qn({user:i,providerId:s,_tokenResponse:n,operationType:e})}static async _forOperation(t,e,n){await t._updateTokensIfNecessary(n,!0);const r=Xn(n);return new Qn({user:t,providerId:r,_tokenResponse:n,operationType:e})}}function Xn(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}
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
 */class Yn extends ae{constructor(t,e,n,r){var i;super(e.code,e.message),this.operationType=n,this.user=r,this.name="FirebaseError",Object.setPrototypeOf(this,Yn.prototype),this.appName=t.name,this.code=e.code,this.tenantId=null!==(i=t.tenantId)&&void 0!==i?i:void 0,this.serverResponse=e.customData.serverResponse}static _fromErrorAndOperation(t,e,n,r){return new Yn(t,e,n,r)}}function Jn(t,e,n,r){return("reauthenticate"===e?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch((n=>{if("auth/multi-factor-auth-required"===n.code)throw Yn._fromErrorAndOperation(t,n,e,r);throw n}))}
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
 */async function Zn(t,e,n){await vn(e);var r;const i=!1===t?"provider-already-linked":"no-such-provider";Ge((r=e.providerData,new Set(r.map((({providerId:t})=>t)).filter((t=>!!t)))).has(n)===t,e.auth,i)}
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
 */function tr(t){return pe(t).signOut()}
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
class er{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),(null===(t=this.auth.currentUser)||void 0===t?void 0:t.uid)||null}async getToken(t){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(t)}}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged((e=>{var n;t((null===(n=e)||void 0===n?void 0:n.stsTokenManager.accessToken)||null)}));this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){Ge(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
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
class nr{constructor(t,e){this.storage=t,this.type=e}_isAvailable(){try{return this.storage?(this.storage.setItem("__sak","1"),this.storage.removeItem("__sak"),Promise.resolve(!0)):Promise.resolve(!1)}catch(t){return Promise.resolve(!1)}}_set(t,e){return this.storage.setItem(t,JSON.stringify(e)),Promise.resolve()}_get(t){const e=this.storage.getItem(t);return Promise.resolve(e?JSON.parse(e):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}}
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
 */class rr extends nr{constructor(){super(window.localStorage,"LOCAL"),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=function(){const t=ne();return Rn(t)||Ln(t)}()&&function(){try{return!(!window||window===window.top)}catch(t){return!1}}(),this.fallbackToPolling=Pn(),this.boundEventHandler=this.onStorageEvent.bind(this)}forAllChangedKeys(t){for(const e of Object.keys(this.listeners)){const n=this.storage.getItem(e),r=this.localCache[e];n!==r&&t(e,r,n)}}onStorageEvent(t,e=!1){if(!t.key)return void this.forAllChangedKeys(((t,e,n)=>{this.notifyListeners(t,n)}));const n=t.key;if(e?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const r=this.storage.getItem(n);if(t.newValue!==r)null!==t.newValue?this.storage.setItem(n,t.newValue):this.storage.removeItem(n);else if(this.localCache[n]===t.newValue&&!e)return}const r=()=>{const t=this.storage.getItem(n);(e||this.localCache[n]!==t)&&this.notifyListeners(n,t)},i=this.storage.getItem(n);oe()&&10===document.documentMode&&i!==t.newValue&&t.newValue!==t.oldValue?setTimeout(r,10):r()}notifyListeners(t,e){this.localCache[t]=e;const n=this.listeners[t];if(n)for(const r of Array.from(n))r(e?JSON.parse(e):e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((()=>{this.forAllChangedKeys(((t,e,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:e,newValue:n}),!0)}))}),1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,e){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),0===this.listeners[t].size&&delete this.listeners[t]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(t,e){await super._set(t,e),this.localCache[t]=JSON.stringify(e)}async _get(t){const e=await super._get(t);return this.localCache[t]=JSON.stringify(e),e}async _remove(t){await super._remove(t),delete this.localCache[t]}}rr.type="LOCAL";const ir=rr;
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
class sr{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find((e=>e.isListeningto(t)));if(e)return e;const n=new sr(t);return this.receivers.push(n),n}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:n,eventType:r,data:i}=e.data,s=this.handlersMap[r];if(!(null==s?void 0:s.size))return;e.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(s).map((async t=>t(e.origin,i))),a=await function(t){return Promise.all(t.map((async t=>{try{return{fulfilled:!0,value:await t}}catch(e){return{fulfilled:!1,reason:e}}})))}(o);e.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(t,e){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),e&&0!==this.handlersMap[t].size||delete this.handlersMap[t],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}sr.receivers=[];class or{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,n=50){const r="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,s;return new Promise(((o,a)=>{const c=
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
function(t="",e=20){return`${t}${Math.floor(Math.random()*Math.pow(10,e))}`}();r.port1.start();const u=setTimeout((()=>{a(new Error("unsupported_event"))}),n);s={messageChannel:r,onMessage(t){const e=t;if(e.data.eventId===c)switch(e.data.status){case"ack":clearTimeout(u),i=setTimeout((()=>{a(new Error("timeout"))}),3e3);break;case"done":clearTimeout(i),o(e.data.response);break;default:clearTimeout(u),clearTimeout(i),a(new Error("invalid_response"))}}},this.handlers.add(s),r.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:t,eventId:c,data:e},[r.port2])})).finally((()=>{s&&this.removeMessageHandler(s)}))}}
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
 */function ar(){return window}
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
function cr(){return void 0!==ar().WorkerGlobalScope&&"function"==typeof ar().importScripts}
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
const ur="firebaseLocalStorageDb";class hr{constructor(t){this.request=t}toPromise(){return new Promise(((t,e)=>{this.request.addEventListener("success",(()=>{t(this.request.result)})),this.request.addEventListener("error",(()=>{e(this.request.error)}))}))}}function lr(t,e){return t.transaction(["firebaseLocalStorage"],e?"readwrite":"readonly").objectStore("firebaseLocalStorage")}function dr(){const t=indexedDB.open(ur,1);return new Promise(((e,n)=>{t.addEventListener("error",(()=>{n(t.error)})),t.addEventListener("upgradeneeded",(()=>{const e=t.result;try{e.createObjectStore("firebaseLocalStorage",{keyPath:"fbase_key"})}catch(r){n(r)}})),t.addEventListener("success",(async()=>{const n=t.result;n.objectStoreNames.contains("firebaseLocalStorage")?e(n):(n.close(),await function(){const t=indexedDB.deleteDatabase(ur);return new hr(t).toPromise()}(),e(await dr()))}))}))}async function fr(t,e,n){const r=lr(t,!0).put({fbase_key:e,value:n});return new hr(r).toPromise()}function pr(t,e){const n=lr(t,!0).delete(e);return new hr(n).toPromise()}class mr{constructor(){this.type="LOCAL",this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then((()=>{}),(()=>{}))}async _openDb(){return this.db||(this.db=await dr()),this.db}async _withRetries(t){let e=0;for(;;)try{const e=await this._openDb();return await t(e)}catch(n){if(e++>3)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return cr()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=sr._getInstance(cr()?self:null),this.receiver._subscribe("keyChanged",(async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)}))),this.receiver._subscribe("ping",(async(t,e)=>["keyChanged"]))}async initializeSender(){var t,e;if(this.activeServiceWorker=await async function(){if(!(null===navigator||void 0===navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(t){return null}}(),!this.activeServiceWorker)return;this.sender=new or(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null===(t=n[0])||void 0===t?void 0:t.fulfilled)&&(null===(e=n[0])||void 0===e?void 0:e.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){var e;if(this.sender&&this.activeServiceWorker&&((null===(e=null===navigator||void 0===navigator?void 0:navigator.serviceWorker)||void 0===e?void 0:e.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch(e){}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await dr();return await fr(t,"__sak","1"),await pr(t,"__sak"),!0}catch(t){}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite((async()=>(await this._withRetries((n=>fr(n,t,e))),this.localCache[t]=e,this.notifyServiceWorker(t))))}async _get(t){const e=await this._withRetries((e=>async function(t,e){const n=lr(t,!1).get(e),r=await new hr(n).toPromise();return void 0===r?null:r.value}(e,t)));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite((async()=>(await this._withRetries((e=>pr(e,t))),delete this.localCache[t],this.notifyServiceWorker(t))))}async _poll(){const t=await this._withRetries((t=>{const e=lr(t,!1).getAll();return new hr(e).toPromise()}));if(!t)return[];if(0!==this.pendingWrites)return[];const e=[],n=new Set;for(const{fbase_key:r,value:i}of t)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),e.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),e.push(r));return e}notifyListeners(t,e){this.localCache[t]=e;const n=this.listeners[t];if(n)for(const r of Array.from(n))r(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((async()=>this._poll()),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),0===this.listeners[t].size&&delete this.listeners[t]),0===Object.keys(this.listeners).length&&this.stopPolling()}}mr.type="LOCAL";const gr=mr;
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
 */class yr{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let e=!1;return this.consumers.forEach((n=>{this.isEventForConsumer(t,n)&&(e=!0,this.sendToConsumer(t,n),this.saveEventToCache(t))})),this.hasHandledPotentialRedirect||!function(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return wr(t);default:return!1}}
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
 */(t)||(this.hasHandledPotentialRedirect=!0,e||(this.queuedRedirectEvent=t,e=!0)),e}sendToConsumer(t,e){var n;if(t.error&&!wr(t)){const r=(null===(n=t.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";e.onError(Ke(this.auth,r))}else e.onAuthEvent(t)}isEventForConsumer(t,e){const n=null===e.eventId||!!t.eventId&&t.eventId===e.eventId;return e.filter.includes(t.type)&&n}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(vr(t))}saveEventToCache(t){this.cachedEventUids.add(vr(t)),this.lastProcessedEventTime=Date.now()}}function vr(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter((t=>t)).join("-")}function wr({type:t,error:e}){return"unknown"===t&&"auth/no-auth-event"===(null==e?void 0:e.code)}function br(t){return`${t||""}${Math.floor(1e9*Math.random())}`}
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
const Ir=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,_r=/^https?/;async function Tr(t){if(t.config.emulator)return;const{authorizedDomains:e}=await async function(t){return an(t,"GET","/v1/projects",{})}(t);for(const r of e)try{if(Er(r))return}catch(n){}ze(t,"unauthorized-domain")}function Er(t){const e=Je(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const i=new URL(t);return""===i.hostname&&""===r?"chrome-extension:"===n&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!_r.test(n))return!1;if(Ir.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}
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
 */function Sr(t){return new Promise(((e,n)=>{const r=document.createElement("script");var i,s;r.setAttribute("src",t),r.onload=e,r.onerror=n,r.type="text/javascript",r.charset="UTF-8",(null!==(s=null===(i=document.getElementsByTagName("head"))||void 0===i?void 0:i[0])&&void 0!==s?s:document).appendChild(r)}))}
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
const kr=new en(3e4,6e4);function Cr(){const t=ar().___jsl;if(null==t?void 0:t.H)for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}function Rr(t){return new Promise(((e,n)=>{var r,i,s;function o(){Cr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Cr(),n(Ke(t,"network-request-failed"))},timeout:kr.get()})}if(null===(i=null===(r=ar().gapi)||void 0===r?void 0:r.iframes)||void 0===i?void 0:i.Iframe)e(gapi.iframes.getContext());else{if(!(null===(s=ar().gapi)||void 0===s?void 0:s.load)){const e=`__${"iframefcb"}${Math.floor(1e6*Math.random())}`;return ar()[e]=()=>{gapi.load?o():n(Ke(t,"network-request-failed"))},Sr(`https://apis.google.com/js/api.js?onload=${e}`)}o()}})).catch((t=>{throw Nr=null,t}))}let Nr=null;
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
const Ar=new en(5e3,15e3),Dr={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"}},xr=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Or(t){const e=t.config;Ge(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?nn(e,"emulator/auth/iframe"):`https://${t.config.authDomain}/__/auth/iframe`,r={apiKey:e.apiKey,appName:t.name,v:"9.0.0-beta.6"},i=xr.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${le(r).slice(1)}`}async function Lr(t){const e=await function(t){return Nr=Nr||Rr(t),Nr}(t),n=ar().gapi;return Ge(n,t,"internal-error"),e.open({where:document.body,url:Or(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Dr,dontclear:!0},(e=>new Promise((async(n,r)=>{await e.restyle({setHideOnLeave:!1});const i=Ke(t,"network-request-failed"),s=ar().setTimeout((()=>{r(i)}),Ar.get());function o(){ar().clearTimeout(s),n(e)}e.ping(o).then(o,(()=>{r(i)}))}))))}
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
 */class Pr extends nr{constructor(){super(window.sessionStorage,"SESSION")}_addListener(t,e){}_removeListener(t,e){}}Pr.type="SESSION";const Mr=Pr,Ur={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};
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
 */class Fr{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(t){}}}function Vr(t,e,n,r=500,i=600){const s=Math.min((window.screen.availHeight-i)/2,0).toString(),o=Math.min((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},Ur),{width:r.toString(),height:i.toString(),top:s,left:o}),u=ne().toLowerCase();n&&(a=Nn(u)?"_blank":n),Cn(u)&&(e=e||"http://localhost",c.scrollbars="yes");const h=Object.entries(c).reduce(((t,[e,n])=>`${t}${e}=${n},`),"");if(function(t=ne()){var e;return Ln(t)&&!!(null===(e=window.navigator)||void 0===e?void 0:e.standalone)}(u)&&"_self"!==a)return function(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
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
 */(e||"",a),new Fr(null);const l=window.open(e||"",a,h);Ge(l,t,"popup-blocked");try{l.focus()}catch(d){}return new Fr(l)}function qr(t,e){return e?Ye(e):(Ge(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}
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
 */class Br extends qn{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return Bn(t,this._buildIdpRequest())}_linkToIdToken(t,e){return Bn(t,this._buildIdpRequest(e))}_getReauthenticationResolver(t){return Bn(t,this._buildIdpRequest())}_buildIdpRequest(t){const e={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(e.idToken=t),e}}function $r(t){
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
return async function(t,e,n=!1){const r="signIn",i=await Jn(t,r,e),s=await Qn._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}(t.auth,new Br(t),t.bypassAuthState)}function jr(t){const{auth:e,user:n}=t;return Ge(n,e,"internal-error"),async function(t,e,n=!1){const{auth:r}=t,i="reauthenticate";try{const s=await mn(t,Jn(r,i,e,t),n);Ge(s.idToken,r,"internal-error");const o=pn(s.idToken);Ge(o,r,"internal-error");const{sub:a}=o;return Ge(t.uid===a,r,"user-mismatch"),Qn._forOperation(t,i,s)}catch(s){throw"auth/user-not-found"===(null==s?void 0:s.code)&&ze(r,"user-mismatch"),s}}(n,new Br(t),t.bypassAuthState)}async function zr(t){const{auth:e,user:n}=t;return Ge(n,e,"internal-error"),async function(t,e,n=!1){const r=await mn(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Qn._forOperation(t,"link",r)}(n,new Br(t),t.bypassAuthState)}
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
 */class Kr{constructor(t,e,n,r,i=!1){this.auth=t,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(e)?e:[e]}execute(){return new Promise((async(t,e)=>{this.pendingPromise={resolve:t,reject:e};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}}))}async onAuthEvent(t){const{urlResponse:e,sessionId:n,postBody:r,tenantId:i,error:s,type:o}=t;if(s)return void this.reject(s);const a={auth:this.auth,requestUri:e,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(c){this.reject(c)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return $r;case"linkViaPopup":case"linkViaRedirect":return zr;case"reauthViaPopup":case"reauthViaRedirect":return jr;default:ze(this.auth,"internal-error")}}resolve(t){Qe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){Qe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
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
 */const Hr=new Map;class Gr extends Kr{constructor(t,e,n=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],e,void 0,n),this.eventId=null}async execute(){let t=Hr.get(this.auth._key());if(!t){try{const e=await async function(t,e){const n=Xr(e),r="true"===await Qr(t)._get(n);return await Qr(t)._remove(n),r}(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(e)}catch(e){t=()=>Promise.reject(e)}Hr.set(this.auth._key(),t)}return t()}async onAuthEvent(t){if("signInViaRedirect"===t.type)return super.onAuthEvent(t);if("unknown"!==t.type){if(t.eventId){const e=await this.auth._redirectUserForId(t.eventId);if(e)return this.user=e,super.onAuthEvent(t);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}async function Wr(t,e){return Qr(t)._set(Xr(e),"true")}function Qr(t){return Ye(t._redirectPersistence)}function Xr(t){return En("pendingRedirect",t.config.apiKey,t.name)}
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
 */function Yr(t,e,n){return async function(t,e,n){const r=Fn(t);Ge(e instanceof jn,t,"argument-error");const i=qr(r,n);return await Wr(i,r),i._openRedirect(r,e,"signInViaRedirect")}(t,e,n)}function Jr(t,e,n){return async function(t,e,n){const r=pe(t);Ge(e instanceof jn,r.auth,"argument-error");const i=qr(r.auth,n);await Zn(!1,r,e.providerId),await Wr(i,r.auth);const s=await async function(t){const e=br(`${t.uid}:::`);return t._redirectEventId=e,await t.auth._setRedirectUser(t),await t.auth._persistUserIfCurrent(t),e}
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
 */(r);return i._openRedirect(r.auth,e,"linkViaRedirect",s)}(t,e,n)}async function Zr(t,e,n=!1){const r=Fn(t),i=qr(r,e),s=new Gr(r,i,n),o=await s.execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}function ti(t,e,n,r,i,s){Ge(t.config.authDomain,t,"auth-domain-config-required"),Ge(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:"9.0.0-beta.6",eventId:i};if(e instanceof jn){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",function(t){for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[t,e]of Object.entries(s||{}))o[t]=e}if(e instanceof zn){const t=e.getScopes().filter((t=>""!==t));t.length>0&&(o.scopes=t.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const c of Object.keys(a))void 0===a[c]&&delete a[c];return`${function({config:t}){if(!t.emulator)return`https://${t.authDomain}/__/auth/handler`;return nn(t,"emulator/auth/handler")}
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
 */(t)}?${le(a).slice(1)}`}const ei=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Mr,this._completeRedirectFn=Zr}async _openPopup(t,e,n,r){var i;Qe(null===(i=this.eventManagers[t._key()])||void 0===i?void 0:i.manager,"_initialize() not called before _openPopup()");return Vr(t,ti(t,e,n,Je(),r),br())}async _openRedirect(t,e,n,r){var i;return await this._originValidation(t),i=ti(t,e,n,Je(),r),ar().location.href=i,new Promise((()=>{}))}_initialize(t){const e=t._key();if(this.eventManagers[e]){const{manager:t,promise:n}=this.eventManagers[e];return t?Promise.resolve(t):(Qe(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(t);return this.eventManagers[e]={promise:n},n}async initAndGetManager(t){const e=await Lr(t),n=new yr(t);return e.register("authEvent",(e=>{Ge(null==e?void 0:e.authEvent,t,"invalid-auth-event");return{status:n.onEvent(e.authEvent)?"ACK":"ERROR"}}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:n},this.iframes[t._key()]=e,n}_isIframeWebStorageSupported(t,e){this.iframes[t._key()].send("webStorageSupport",{type:"webStorageSupport"},(n=>{var r;const i=null===(r=null==n?void 0:n[0])||void 0===r?void 0:r.webStorageSupport;void 0!==i&&e(!!i),ze(t,"internal-error")}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=Tr(t)),this.originValidationPromises[e]}get _shouldInitProactively(){return Pn()||Rn()||Ln()}};new en(3e4,6e4);
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
const ni=new en(2e3,1e4);async function ri(t,e,n){const r=Fn(t);Ge(e instanceof jn,t,"argument-error");const i=qr(r,n);return new si(r,"signInViaPopup",e,i).executeNotNull()}async function ii(t,e,n){const r=pe(t);Ge(e instanceof jn,r.auth,"argument-error");const i=qr(r.auth,n);return new si(r.auth,"linkViaPopup",e,i,r).executeNotNull()}class si extends Kr{constructor(t,e,n,r,i){super(t,e,r,i),this.provider=n,this.authWindow=null,this.pollId=null,si.currentPopupAction&&si.currentPopupAction.cancel(),si.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return Ge(t,this.auth,"internal-error"),t}async onExecution(){Qe(1===this.filter.length,"Popup operations only handle one event");const t=br();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch((t=>{this.reject(t)})),this.resolver._isIframeWebStorageSupported(this.auth,(t=>{t||this.reject(Ke(this.auth,"web-storage-unsupported"))})),this.pollUserCancellation()}get eventId(){var t;return(null===(t=this.authWindow)||void 0===t?void 0:t.associatedEvent)||null}cancel(){this.reject(Ke(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,si.currentPopupAction=null}pollUserCancellation(){const t=()=>{var e,n;(null===(n=null===(e=this.authWindow)||void 0===e?void 0:e.window)||void 0===n?void 0:n.closed)?this.pollId=window.setTimeout((()=>{this.pollId=null,this.reject(Ke(this.auth,"popup-closed-by-user"))}),2e3):this.pollId=window.setTimeout(t,ni.get())};t()}}function oi(t=Fe()){const e=Le(t,"auth-exp");return e.isInitialized()?e.getImmediate():function(t,e){const n=Le(t,"auth-exp");n.isInitialized()&&ze(n.getImmediate(),"already-initialized");return n.initialize({options:e})}(t,{popupRedirectResolver:ei,persistence:[gr,ir]})}var ai,ci,ui;si.currentPopupAction=null,ai="Browser",Oe(new me("auth-exp",((t,{options:e})=>{const n=t.getProvider("app-exp").getImmediate(),{apiKey:r,authDomain:i}=n.options;return(t=>{Ge(r&&!r.includes(":"),"invalid-api-key",{appName:t.name}),Ge(!(null==i?void 0:i.includes(":")),"argument-error",{appName:t.name});const n={apiKey:r,authDomain:i,clientPlatform:ai,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Mn(ai)},s=new Un(t,n);return function(t,e){const n=(null==e?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Ye);(null==e?void 0:e.errorMap)&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,null==e?void 0:e.popupRedirectResolver)}(s,e),s})(n)}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((t,e,n)=>{t.getProvider("auth-internal").initialize()}))),Oe(new me("auth-internal",(t=>{const e=Fn(t.getProvider("auth-exp").getImmediate());return new er(e)}),"PRIVATE").setInstantiationMode("EXPLICIT")),Ve("@firebase/auth-exp","0.0.900-exp.f43d0c698",function(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}(ai)),(ui=ci||(ci={}))[ui.NO_ERROR=0]="NO_ERROR",ui[ui.NETWORK_ERROR=1]="NETWORK_ERROR",ui[ui.ABORT=2]="ABORT";class hi extends ae{constructor(t,e){super(li(t),`Firebase Storage: ${e} (${li(t)})`),this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,hi.prototype)}_codeEquals(t){return li(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}function li(t){return"storage/"+t}function di(t){return new hi("invalid-argument",t)}function fi(){return new hi("app-deleted","The Firebase app was deleted.")}function pi(t){throw new hi("internal-error","Internal error: "+t)}
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
 */class mi{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.errorCode_=ci.NO_ERROR,this.sendPromise_=new Promise((t=>{this.xhr_.addEventListener("abort",(()=>{this.errorCode_=ci.ABORT,t()})),this.xhr_.addEventListener("error",(()=>{this.errorCode_=ci.NETWORK_ERROR,t()})),this.xhr_.addEventListener("load",(()=>{t()}))}))}send(t,e,n,r){if(this.sent_)throw pi("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(e,t,!0),void 0!==r)for(const i in r)r.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,r[i].toString());return void 0!==n?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw pi("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw pi("cannot .getStatus() before sending");try{return this.xhr_.status}catch(t){return-1}}getResponseText(){if(!this.sent_)throw pi("cannot .getResponseText() before sending");return this.xhr_.responseText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",t)}}
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
class gi{createConnection(){return new mi}}
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
 */class yi{constructor(t,e){this.bucket=t,this.path_=e}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,e){let n;try{n=yi.makeFromUrl(t,e)}catch(r){return new yi(t,"")}if(""===n.path)return n;throw new hi("invalid-default-bucket","Invalid default bucket '"+t+"'.")}static makeFromUrl(t,e){let n=null;const r="([A-Za-z0-9.\\-_]+)";const i=new RegExp("^gs://"+r+"(/(.*))?$","i");function s(t){t.path_=decodeURIComponent(t.path)}const o=e.replace(/[.]/g,"\\."),a=[{regex:i,indices:{bucket:1,path:3},postModify:function(t){"/"===t.path.charAt(t.path.length-1)&&(t.path_=t.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${o}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:s},{regex:new RegExp(`^https?://${"firebasestorage.googleapis.com"===e?"(?:storage.googleapis.com|storage.cloud.google.com)":e}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:s}];for(let c=0;c<a.length;c++){const e=a[c],r=e.regex.exec(t);if(r){const t=r[e.indices.bucket];let i=r[e.indices.path];i||(i=""),n=new yi(t,i),e.postModify(n);break}}if(null==n)throw function(t){return new hi("invalid-url","Invalid URL '"+t+"'.")}(t);return n}}class vi{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}
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
 */function wi(t,e,n,r){if(r<e)throw di(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw di(`Invalid value for '${t}'. Expected ${n} or less.`)}
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
class bi{constructor(t,e,n,r,i,s,o,a,c,u,h){this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.url_=t,this.method_=e,this.headers_=n,this.body_=r,this.successCodes_=i.slice(),this.additionalRetryCodes_=s.slice(),this.callback_=o,this.errorCallback_=a,this.progressCallback_=u,this.timeout_=c,this.pool_=h,this.promise_=new Promise(((t,e)=>{this.resolve_=t,this.reject_=e,this.start_()}))}start_(){const t=this;function e(e,n){const r=t.resolve_,i=t.reject_,s=n.connection;if(n.wasSuccessCode)try{const e=t.callback_(s,s.getResponseText());void 0!==e?r(e):r()}catch(o){i(o)}else if(null!==s){const e=new hi("unknown","An unknown error occurred, please check the error payload for server response.");e.serverResponse=s.getResponseText(),t.errorCallback_?i(t.errorCallback_(s,e)):i(e)}else if(n.canceled){i(t.appDelete_?fi():new hi("canceled","User canceled the upload/download."))}else{i(new hi("retry-limit-exceeded","Max retry time for operation exceeded, please try again."))}}this.canceled_?e(0,new Ii(!1,null,!0)):this.backoffId_=function(t,e,n){let r=1,i=null,s=!1,o=0;function a(){return 2===o}let c=!1;function u(...t){c||(c=!0,e.apply(null,t))}function h(e){i=setTimeout((()=>{i=null,t(l,a())}),e)}function l(t,...e){if(c)return;if(t)return void u.call(null,t,...e);if(a()||s)return void u.call(null,t,...e);let n;r<64&&(r*=2),1===o?(o=2,n=0):n=1e3*(r+Math.random()),h(n)}let d=!1;function f(t){d||(d=!0,c||(null!==i?(t||(o=2),clearTimeout(i),h(0)):t||(o=1)))}return h(0),setTimeout((()=>{s=!0,f(!0)}),n),f}((function(e,n){if(n)return void e(!1,new Ii(!1,null,!0));const r=t.pool_.createConnection();function i(e){const n=e.loaded,r=e.lengthComputable?e.total:-1;null!==t.progressCallback_&&t.progressCallback_(n,r)}t.pendingConnection_=r,null!==t.progressCallback_&&r.addUploadProgressListener(i),r.send(t.url_,t.method_,t.body_,t.headers_).then((()=>{null!==t.progressCallback_&&r.removeUploadProgressListener(i),t.pendingConnection_=null;const n=r.getErrorCode()===ci.NO_ERROR,s=r.getStatus();if(!n||t.isRetryStatusCode_(s)){const t=r.getErrorCode()===ci.ABORT;return void e(!1,new Ii(!1,null,t))}const o=-1!==t.successCodes_.indexOf(s);e(!0,new Ii(o,r))}))}),e,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}isRetryStatusCode_(t){const e=t>=500&&t<600,n=-1!==[408,429].indexOf(t),r=-1!==this.additionalRetryCodes_.indexOf(t);return e||n||r}}class Ii{constructor(t,e,n){this.wasSuccessCode=t,this.connection=e,this.canceled=!!n}}function _i(t,e,n,r,i,s){const o=function(t){const e=encodeURIComponent;let n="?";for(const r in t)t.hasOwnProperty(r)&&(n=n+(e(r)+"=")+e(t[r])+"&");return n=n.slice(0,-1),n}(t.urlParams),a=t.url+o,c=Object.assign({},t.headers);return function(t,e){e&&(t["X-Firebase-GMPID"]=e)}(c,e),function(t,e){null!==e&&e.length>0&&(t.Authorization="Firebase "+e)}(c,n),function(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(null!=e?e:"AppManager")}(c,s),function(t,e){null!==e&&(t["X-Firebase-AppCheck"]=e)}(c,r),new bi(a,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,i)}
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
class Ti{constructor(t,e){this._service=t,this._location=e instanceof yi?e:yi.makeFromUrl(e,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,e){return new Ti(t,e)}get root(){const t=new yi(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return function(t){const e=t.lastIndexOf("/",t.length-2);return-1===e?t:t.slice(e+1)}(this._location.path)}get storage(){return this._service}get parent(){const t=function(t){if(0===t.length)return null;const e=t.lastIndexOf("/");return-1===e?"":t.slice(0,e)}(this._location.path);if(null===t)return null;const e=new yi(this._location.bucket,t);return new Ti(this._service,e)}_throwIfRoot(t){if(""===this._location.path)throw function(t){return new hi("invalid-root-operation","The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(t)}}function Ei(t,e){const n=null==e?void 0:e.storageBucket;return null==n?null:yi.makeFromBucketSpec(n,t)}class Si{constructor(t,e,n,r,i,s){this.app=t,this._authProvider=e,this._appCheckProvider=n,this._pool=r,this._url=i,this._firebaseVersion=s,this._bucket=null,this._host="firebasestorage.googleapis.com",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=i?yi.makeFromBucketSpec(i,this._host):Ei(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,null!=this._url?this._bucket=yi.makeFromBucketSpec(this._url,t):this._bucket=Ei(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){wi("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){wi("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){const t=this._authProvider.getImmediate({optional:!0});if(t){const e=await t.getToken();if(null!==e)return e.accessToken}return null}async _getAppCheckToken(){const t=this._appCheckProvider.getImmediate({optional:!0});if(t){return(await t.getToken()).token}return null}_delete(){return this._deleted=!0,this._requests.forEach((t=>t.cancel())),this._requests.clear(),Promise.resolve()}_makeStorageReference(t){return new Ti(this,t)}_makeRequest(t,e,n){if(this._deleted)return new vi(fi());{const r=_i(t,this._appId,e,n,this._pool,this._firebaseVersion);return this._requests.add(r),r.getPromise().then((()=>this._requests.delete(r)),(()=>this._requests.delete(r))),r}}async makeRequestWithTokens(t){const[e,n]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,e,n)}}function ki(t=Fe(),e){return Le(t=pe(t),"storage-exp").getImmediate({identifier:e})}function Ci(t,{instanceIdentifier:e}){const n=t.getProvider("app-exp").getImmediate(),r=t.getProvider("auth-internal"),i=t.getProvider("app-check-internal");return new Si(n,r,i,new gi,e,"9.0.0-beta.6")}Oe(new me("storage-exp",Ci,"PUBLIC").setMultipleInstances(!0)),Ve("@firebase/storage","0.0.900-exp.f43d0c698");
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
var Ri=function(t,e){return(Ri=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};function Ni(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}var Ai,Di="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},xi=xi||{},Oi=Di||self;function Li(){}function Pi(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function Mi(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}var Ui="closure_uid_"+(1e9*Math.random()>>>0),Fi=0;function Vi(t,e,n){return t.call.apply(t.bind,arguments)}function qi(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function Bi(t,e,n){return(Bi=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?Vi:qi).apply(null,arguments)}function $i(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function ji(){return Date.now()}function zi(t,e){function n(){}n.prototype=e.prototype,t.X=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Pb=function(t,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return e.prototype[n].apply(t,i)}}function Ki(){this.j=this.j,this.i=this.i}Ki.prototype.j=!1,Ki.prototype.ka=function(){var t;!this.j&&(this.j=!0,this.H(),0)&&(t=this,Object.prototype.hasOwnProperty.call(t,Ui)&&t[Ui]||(t[Ui]=++Fi))},Ki.prototype.H=function(){if(this.i)for(;this.i.length;)this.i.shift()()};var Hi=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if("string"==typeof t)return"string"!=typeof e||1!=e.length?-1:t.indexOf(e,0);for(var n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1},Gi=Array.prototype.forEach?function(t,e,n){Array.prototype.forEach.call(t,e,n)}:function(t,e,n){for(var r=t.length,i="string"==typeof t?t.split(""):t,s=0;s<r;s++)s in i&&e.call(n,i[s],s,t)};function Wi(t){return Array.prototype.concat.apply([],arguments)}function Qi(t){var e=t.length;if(0<e){for(var n=Array(e),r=0;r<e;r++)n[r]=t[r];return n}return[]}function Xi(t){return/^[\s\xa0]*$/.test(t)}var Yi,Ji=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function Zi(t,e){return-1!=t.indexOf(e)}function ts(t,e){return t<e?-1:t>e?1:0}t:{var es=Oi.navigator;if(es){var ns=es.userAgent;if(ns){Yi=ns;break t}}Yi=""}function rs(t,e,n){for(var r in t)e.call(n,t[r],r,t)}function is(t){var e={};for(var n in t)e[n]=t[n];return e}var ss="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function os(t,e){for(var n,r,i=1;i<arguments.length;i++){for(n in r=arguments[i])t[n]=r[n];for(var s=0;s<ss.length;s++)n=ss[s],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function as(t){return as[" "](t),t}as[" "]=Li;var cs,us,hs=Zi(Yi,"Opera"),ls=Zi(Yi,"Trident")||Zi(Yi,"MSIE"),ds=Zi(Yi,"Edge"),fs=ds||ls,ps=Zi(Yi,"Gecko")&&!(Zi(Yi.toLowerCase(),"webkit")&&!Zi(Yi,"Edge"))&&!(Zi(Yi,"Trident")||Zi(Yi,"MSIE"))&&!Zi(Yi,"Edge"),ms=Zi(Yi.toLowerCase(),"webkit")&&!Zi(Yi,"Edge");function gs(){var t=Oi.document;return t?t.documentMode:void 0}t:{var ys="",vs=(us=Yi,ps?/rv:([^\);]+)(\)|;)/.exec(us):ds?/Edge\/([\d\.]+)/.exec(us):ls?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(us):ms?/WebKit\/(\S+)/.exec(us):hs?/(?:Version)[ \/]?(\S+)/.exec(us):void 0);if(vs&&(ys=vs?vs[1]:""),ls){var ws=gs();if(null!=ws&&ws>parseFloat(ys)){cs=String(ws);break t}}cs=ys}var bs,Is={};function _s(t){return function(t,e){var n=Is;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}(t,(function(){for(var e=0,n=Ji(String(cs)).split("."),r=Ji(String(t)).split("."),i=Math.max(n.length,r.length),s=0;0==e&&s<i;s++){var o=n[s]||"",a=r[s]||"";do{if(o=/(\d*)(\D*)(.*)/.exec(o)||["","","",""],a=/(\d*)(\D*)(.*)/.exec(a)||["","","",""],0==o[0].length&&0==a[0].length)break;e=ts(0==o[1].length?0:parseInt(o[1],10),0==a[1].length?0:parseInt(a[1],10))||ts(0==o[2].length,0==a[2].length)||ts(o[2],a[2]),o=o[3],a=a[3]}while(0==e)}return 0<=e}))}if(Oi.document&&ls){var Ts=gs();bs=Ts||(parseInt(cs,10)||void 0)}else bs=void 0;var Es=bs,Ss=!ls||9<=Number(Es),ks=ls&&!_s("9"),Cs=function(){if(!Oi.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{Oi.addEventListener("test",Li,e),Oi.removeEventListener("test",Li,e)}catch(n){}return t}();function Rs(t,e){this.type=t,this.a=this.target=e,this.defaultPrevented=!1}function Ns(t,e){if(Rs.call(this,t?t.type:""),this.relatedTarget=this.a=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.pointerId=0,this.pointerType="",this.c=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.a=e,e=t.relatedTarget){if(ps){t:{try{as(e.nodeName);var i=!0;break t}catch(s){}i=!1}i||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:As[t.pointerType]||"",this.c=t,t.defaultPrevented&&this.b()}}Rs.prototype.b=function(){this.defaultPrevented=!0},zi(Ns,Rs);var As={2:"touch",3:"pen",4:"mouse"};Ns.prototype.b=function(){Ns.X.b.call(this);var t=this.c;if(t.preventDefault)t.preventDefault();else if(t.returnValue=!1,ks)try{(t.ctrlKey||112<=t.keyCode&&123>=t.keyCode)&&(t.keyCode=-1)}catch(e){}};var Ds="closure_listenable_"+(1e6*Math.random()|0),xs=0;function Os(t,e,n,r,i){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.da=i,this.key=++xs,this.Y=this.Z=!1}function Ls(t){t.Y=!0,t.listener=null,t.proxy=null,t.src=null,t.da=null}function Ps(t){this.src=t,this.a={},this.b=0}function Ms(t,e){var n=e.type;if(n in t.a){var r,i=t.a[n],s=Hi(i,e);(r=0<=s)&&Array.prototype.splice.call(i,s,1),r&&(Ls(e),0==t.a[n].length&&(delete t.a[n],t.b--))}}function Us(t,e,n,r){for(var i=0;i<t.length;++i){var s=t[i];if(!s.Y&&s.listener==e&&s.capture==!!n&&s.da==r)return i}return-1}Ps.prototype.add=function(t,e,n,r,i){var s=t.toString();(t=this.a[s])||(t=this.a[s]=[],this.b++);var o=Us(t,e,r,i);return-1<o?(e=t[o],n||(e.Z=!1)):((e=new Os(e,this.src,s,!!r,i)).Z=n,t.push(e)),e};var Fs="closure_lm_"+(1e6*Math.random()|0),Vs={};function qs(t,e,n,r,i){if(r&&r.once)return $s(t,e,n,r,i);if(Array.isArray(e)){for(var s=0;s<e.length;s++)qs(t,e[s],n,r,i);return null}return n=Xs(n),t&&t[Ds]?t.wa(e,n,Mi(r)?!!r.capture:!!r,i):Bs(t,e,n,!1,r,i)}function Bs(t,e,n,r,i,s){if(!e)throw Error("Invalid event type");var o=Mi(i)?!!i.capture:!!i;if(o&&!Ss)return null;var a=Ws(t);if(a||(t[Fs]=a=new Ps(t)),(n=a.add(e,n,r,o,s)).proxy)return n;if(r=function(){var t=Gs,e=Ss?function(n){return t.call(e.src,e.listener,n)}:function(n){if(!(n=t.call(e.src,e.listener,n)))return n};return e}(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)Cs||(i=o),void 0===i&&(i=!1),t.addEventListener(e.toString(),r,i);else if(t.attachEvent)t.attachEvent(Ks(e.toString()),r);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(r)}return n}function $s(t,e,n,r,i){if(Array.isArray(e)){for(var s=0;s<e.length;s++)$s(t,e[s],n,r,i);return null}return n=Xs(n),t&&t[Ds]?t.xa(e,n,Mi(r)?!!r.capture:!!r,i):Bs(t,e,n,!0,r,i)}function js(t,e,n,r,i){if(Array.isArray(e))for(var s=0;s<e.length;s++)js(t,e[s],n,r,i);else r=Mi(r)?!!r.capture:!!r,n=Xs(n),t&&t[Ds]?(t=t.c,(e=String(e).toString())in t.a&&(-1<(n=Us(s=t.a[e],n,r,i))&&(Ls(s[n]),Array.prototype.splice.call(s,n,1),0==s.length&&(delete t.a[e],t.b--)))):t&&(t=Ws(t))&&(e=t.a[e.toString()],t=-1,e&&(t=Us(e,n,r,i)),(n=-1<t?e[t]:null)&&zs(n))}function zs(t){if("number"!=typeof t&&t&&!t.Y){var e=t.src;if(e&&e[Ds])Ms(e.c,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(Ks(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=Ws(e))?(Ms(n,t),0==n.b&&(n.src=null,e[Fs]=null)):Ls(t)}}}function Ks(t){return t in Vs?Vs[t]:Vs[t]="on"+t}function Hs(t,e){var n=t.listener,r=t.da||t.src;return t.Z&&zs(t),n.call(r,e)}function Gs(t,e){if(t.Y)return!0;if(!Ss){if(!e)t:{e=["window","event"];for(var n=Oi,r=0;r<e.length;r++)if(null==(n=n[e[r]])){e=null;break t}e=n}return Hs(t,e=new Ns(e,this))}return Hs(t,new Ns(e,this))}function Ws(t){return(t=t[Fs])instanceof Ps?t:null}var Qs="__closure_events_fn_"+(1e9*Math.random()>>>0);function Xs(t){return"function"==typeof t?t:(t[Qs]||(t[Qs]=function(e){return t.handleEvent(e)}),t[Qs])}function Ys(){Ki.call(this),this.c=new Ps(this),this.J=this,this.D=null}function Js(t,e){var n,r=t.D;if(r)for(n=[];r;r=r.D)n.push(r);if(t=t.J,r=e.type||e,"string"==typeof e)e=new Rs(e,t);else if(e instanceof Rs)e.target=e.target||t;else{var i=e;os(e=new Rs(r,t),i)}if(i=!0,n)for(var s=n.length-1;0<=s;s--){var o=e.a=n[s];i=Zs(o,r,!0,e)&&i}if(i=Zs(o=e.a=t,r,!0,e)&&i,i=Zs(o,r,!1,e)&&i,n)for(s=0;s<n.length;s++)i=Zs(o=e.a=n[s],r,!1,e)&&i}function Zs(t,e,n,r){if(!(e=t.c.a[String(e)]))return!0;e=e.concat();for(var i=!0,s=0;s<e.length;++s){var o=e[s];if(o&&!o.Y&&o.capture==n){var a=o.listener,c=o.da||o.src;o.Z&&Ms(t.c,o),i=!1!==a.call(c,r)&&i}}return i&&!r.defaultPrevented}zi(Ys,Ki),Ys.prototype[Ds]=!0,(Ai=Ys.prototype).addEventListener=function(t,e,n,r){qs(this,t,e,n,r)},Ai.removeEventListener=function(t,e,n,r){js(this,t,e,n,r)},Ai.H=function(){if(Ys.X.H.call(this),this.c){var t,e=this.c;for(t in e.a){for(var n=e.a[t],r=0;r<n.length;r++)Ls(n[r]);delete e.a[t],e.b--}}this.D=null},Ai.wa=function(t,e,n,r){return this.c.add(String(t),e,!1,n,r)},Ai.xa=function(t,e,n,r){return this.c.add(String(t),e,!0,n,r)};var to=Oi.JSON.stringify;function eo(){this.b=this.a=null}var no,ro=new(function(){function t(t,e){this.c=t,this.f=e,this.b=0,this.a=null}return t.prototype.get=function(){var t;return 0<this.b?(this.b--,t=this.a,this.a=t.next,t.next=null):t=this.c(),t},t}())((function(){return new so}),(function(t){t.reset()}));function io(){var t=uo,e=null;return t.a&&(e=t.a,t.a=t.a.next,t.a||(t.b=null),e.next=null),e}function so(){this.next=this.b=this.a=null}function oo(t){Oi.setTimeout((function(){throw t}),0)}function ao(t,e){no||function(){var t=Oi.Promise.resolve(void 0);no=function(){t.then(ho)}}(),co||(no(),co=!0),uo.add(t,e)}eo.prototype.add=function(t,e){var n=ro.get();n.set(t,e),this.b?this.b.next=n:this.a=n,this.b=n},so.prototype.set=function(t,e){this.a=t,this.b=e,this.next=null},so.prototype.reset=function(){this.next=this.b=this.a=null};var co=!1,uo=new eo;function ho(){for(var t;t=io();){try{t.a.call(t.b)}catch(n){oo(n)}var e=ro;e.f(t),100>e.b&&(e.b++,t.next=e.a,e.a=t)}co=!1}function lo(t,e){Ys.call(this),this.b=t||1,this.a=e||Oi,this.f=Bi(this.eb,this),this.g=ji()}function fo(t){t.aa=!1,t.M&&(t.a.clearTimeout(t.M),t.M=null)}function po(t,e,n){if("function"==typeof t)n&&(t=Bi(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=Bi(t.handleEvent,t)}return 2147483647<Number(e)?-1:Oi.setTimeout(t,e||0)}function mo(t){t.a=po((function(){t.a=null,t.c&&(t.c=!1,mo(t))}),t.h);var e=t.b;t.b=null,t.g.apply(null,e)}zi(lo,Ys),(Ai=lo.prototype).aa=!1,Ai.M=null,Ai.eb=function(){if(this.aa){var t=ji()-this.g;0<t&&t<.8*this.b?this.M=this.a.setTimeout(this.f,this.b-t):(this.M&&(this.a.clearTimeout(this.M),this.M=null),Js(this,"tick"),this.aa&&(fo(this),this.start()))}},Ai.start=function(){this.aa=!0,this.M||(this.M=this.a.setTimeout(this.f,this.b),this.g=ji())},Ai.H=function(){lo.X.H.call(this),fo(this),delete this.a};var go=function(t){function e(e,n){var r=t.call(this)||this;return r.g=e,r.h=n,r.b=null,r.c=!1,r.a=null,r}return function(t,e){function n(){this.constructor=t}Ri(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e.prototype.f=function(t){this.b=arguments,this.a?this.c=!0:mo(this)},e.prototype.H=function(){t.prototype.H.call(this),this.a&&(Oi.clearTimeout(this.a),this.a=null,this.c=!1,this.b=null)},e}(Ki);function yo(t){Ki.call(this),this.b=t,this.a={}}zi(yo,Ki);var vo=[];function wo(t,e,n,r){Array.isArray(n)||(n&&(vo[0]=n.toString()),n=vo);for(var i=0;i<n.length;i++){var s=qs(e,n[i],r||t.handleEvent,!1,t.b||t);if(!s)break;t.a[s.key]=s}}function bo(t){rs(t.a,(function(t,e){this.a.hasOwnProperty(e)&&zs(t)}),t),t.a={}}function Io(){this.a=!0}function _o(t,e,n,r){t.info((function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.a)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(var o=1;o<i.length;o++)i[o]=""}}}return to(n)}catch(a){return e}}(t,n)+(r?" "+r:"")}))}yo.prototype.H=function(){yo.X.H.call(this),bo(this)},yo.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},Io.prototype.info=function(){};var To={},Eo=null;function So(){return Eo=Eo||new Ys}function ko(t){Rs.call(this,To.Ga,t)}function Co(t){var e=So();Js(e,new ko(e,t))}function Ro(t,e){Rs.call(this,To.STAT_EVENT,t),this.stat=e}function No(t){var e=So();Js(e,new Ro(e,t))}function Ao(t){Rs.call(this,To.Ha,t)}function Do(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return Oi.setTimeout((function(){t()}),e)}To.Ga="serverreachability",zi(ko,Rs),To.STAT_EVENT="statevent",zi(Ro,Rs),To.Ha="timingevent",zi(Ao,Rs);var xo={NO_ERROR:0,fb:1,sb:2,rb:3,mb:4,qb:5,tb:6,Ea:7,TIMEOUT:8,wb:9},Oo={kb:"complete",Gb:"success",Fa:"error",Ea:"abort",yb:"ready",zb:"readystatechange",TIMEOUT:"timeout",ub:"incrementaldata",xb:"progress",nb:"downloadprogress",Ob:"uploadprogress"};function Lo(){}function Po(t){return t.b||(t.b=t.c())}function Mo(){}Lo.prototype.b=null;var Uo,Fo={OPEN:"a",jb:"b",Fa:"c",vb:"d"};function Vo(){Rs.call(this,"d")}function qo(){Rs.call(this,"c")}function Bo(){}function $o(t,e,n,r){this.g=t,this.c=e,this.f=n,this.S=r||1,this.J=new yo(this),this.P=jo,t=fs?125:void 0,this.R=new lo(t),this.B=null,this.b=!1,this.j=this.l=this.i=this.G=this.u=this.T=this.o=null,this.s=[],this.a=null,this.D=0,this.h=this.m=null,this.N=-1,this.A=!1,this.O=0,this.F=null,this.V=this.C=this.U=this.I=!1}zi(Vo,Rs),zi(qo,Rs),zi(Bo,Lo),Bo.prototype.a=function(){return new XMLHttpRequest},Bo.prototype.c=function(){return{}},Uo=new Bo;var jo=45e3,zo={},Ko={};function Ho(t,e,n){t.G=1,t.i=pa(ca(e)),t.j=n,t.I=!0,Go(t,null)}function Go(t,e){t.u=ji(),Xo(t),t.l=ca(t.i);var n=t.l,r=t.S;Array.isArray(r)||(r=[String(r)]),Ca(n.b,"t",r),t.D=0,t.a=Ic(t.g,t.g.C?e:null),0<t.O&&(t.F=new go(Bi(t.Da,t,t.a),t.O)),wo(t.J,t.a,"readystatechange",t.bb),e=t.B?is(t.B):{},t.j?(t.m||(t.m="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.a.ba(t.l,t.m,t.j,e)):(t.m="GET",t.a.ba(t.l,t.m,null,e)),Co(1),function(t,e,n,r,i,s){t.info((function(){if(t.a)if(s)for(var o="",a=s.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var h=u[0];u=u[1];var l=h.split("_");o=2<=l.length&&"type"==l[1]?o+(h+"=")+u+"&":o+(h+"=redacted&")}}else o=null;else o=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+e+"\n"+n+"\n"+o}))}(t.c,t.m,t.l,t.f,t.S,t.j)}function Wo(t,e,n){for(var r=!0;!t.A&&t.D<n.length;){var i=Qo(t,n);if(i==Ko){4==e&&(t.h=4,No(14),r=!1),_o(t.c,t.f,null,"[Incomplete Response]");break}if(i==zo){t.h=4,No(15),_o(t.c,t.f,n,"[Invalid Chunk]"),r=!1;break}_o(t.c,t.f,i,null),ea(t,i)}4==e&&0==n.length&&(t.h=1,No(16),r=!1),t.b=t.b&&r,r?0<n.length&&!t.V&&(t.V=!0,(e=t.g).a==t&&e.U&&!e.F&&(e.c.info("Great, no buffering proxy detected. Bytes received: "+n.length),fc(e),e.F=!0,No(11))):(_o(t.c,t.f,n,"[Invalid Chunked Response]"),ta(t),Zo(t))}function Qo(t,e){var n=t.D,r=e.indexOf("\n",n);return-1==r?Ko:(n=Number(e.substring(n,r)),isNaN(n)?zo:(r+=1)+n>e.length?Ko:(e=e.substr(r,n),t.D=r+n,e))}function Xo(t){t.T=ji()+t.P,Yo(t,t.P)}function Yo(t,e){if(null!=t.o)throw Error("WatchDog timer not null");t.o=Do(Bi(t.$a,t),e)}function Jo(t){t.o&&(Oi.clearTimeout(t.o),t.o=null)}function Zo(t){0==t.g.v||t.A||gc(t.g,t)}function ta(t){Jo(t);var e=t.F;e&&"function"==typeof e.ka&&e.ka(),t.F=null,fo(t.R),bo(t.J),t.a&&(e=t.a,t.a=null,e.abort(),e.ka())}function ea(t,e){try{var n=t.g;if(0!=n.v&&(n.a==t||La(n.b,t)))if(n.I=t.N,!t.C&&La(n.b,t)&&3==n.v){try{var r=n.la.a.parse(e)}catch(g){r=null}if(Array.isArray(r)&&3==r.length){var i=r;if(0==i[0]){t:if(!n.j){if(n.a){if(!(n.a.u+3e3<t.u))break t;mc(n),ic(n)}dc(n),No(18)}}else n.pa=i[1],0<n.pa-n.P&&37500>i[2]&&n.G&&0==n.o&&!n.m&&(n.m=Do(Bi(n.Xa,n),6e3));if(1>=Oa(n.b)&&n.fa){try{n.fa()}catch(g){}n.fa=void 0}}else vc(n,11)}else if((t.C||n.a==t)&&mc(n),!Xi(e))for(e=r=n.la.a.parse(e),r=0;r<e.length;r++)if(i=e[r],n.P=i[0],i=i[1],2==n.v)if("c"==i[0]){n.J=i[1],n.ha=i[2];var s=i[3];null!=s&&(n.ia=s,n.c.info("VER="+n.ia));var o=i[4];null!=o&&(n.qa=o,n.c.info("SVER="+n.qa));var a=i[5];if(null!=a&&"number"==typeof a&&0<a){var c=1.5*a;n.D=c,n.c.info("backChannelRequestTimeoutMs_="+c)}c=n;var u=t.a;if(u){var h=u.a?u.a.getResponseHeader("X-Client-Wire-Protocol"):null;if(h){var l=c.b;!l.a&&(Zi(h,"spdy")||Zi(h,"quic")||Zi(h,"h2"))&&(l.f=l.g,l.a=new Set,l.b&&(Pa(l,l.b),l.b=null))}if(c.A){var d=u.a?u.a.getResponseHeader("X-HTTP-Session-Id"):null;d&&(c.oa=d,fa(c.B,c.A,d))}}n.v=3,n.f&&n.f.ua(),n.U&&(n.N=ji()-t.u,n.c.info("Handshake RTT: "+n.N+"ms"));var f=t;if((c=n).ma=bc(c,c.C?c.ha:null,c.ga),f.C){Ma(c.b,f);var p=f,m=c.D;m&&p.setTimeout(m),p.o&&(Jo(p),Xo(p)),c.a=f}else lc(c);0<n.g.length&&ac(n)}else"stop"!=i[0]&&"close"!=i[0]||vc(n,7);else 3==n.v&&("stop"==i[0]||"close"==i[0]?"stop"==i[0]?vc(n,7):rc(n):"noop"!=i[0]&&n.f&&n.f.ta(i),n.o=0);Co(4)}catch(g){}}function na(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(Pi(t)||"string"==typeof t)Gi(t,e,void 0);else{if(t.L&&"function"==typeof t.L)var n=t.L();else if(t.K&&"function"==typeof t.K)n=void 0;else if(Pi(t)||"string"==typeof t){n=[];for(var r=t.length,i=0;i<r;i++)n.push(i)}else for(i in n=[],r=0,t)n[r++]=i;i=(r=function(t){if(t.K&&"function"==typeof t.K)return t.K();if("string"==typeof t)return t.split("");if(Pi(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}for(r in e=[],n=0,t)e[n++]=t[r];return e}(t)).length;for(var s=0;s<i;s++)e.call(void 0,r[s],n&&n[s],t)}}function ra(t,e){this.b={},this.a=[],this.c=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var r=0;r<n;r+=2)this.set(arguments[r],arguments[r+1])}else if(t)if(t instanceof ra)for(n=t.L(),r=0;r<n.length;r++)this.set(n[r],t.get(n[r]));else for(r in t)this.set(r,t[r])}function ia(t){if(t.c!=t.a.length){for(var e=0,n=0;e<t.a.length;){var r=t.a[e];sa(t.b,r)&&(t.a[n++]=r),e++}t.a.length=n}if(t.c!=t.a.length){var i={};for(n=e=0;e<t.a.length;)sa(i,r=t.a[e])||(t.a[n++]=r,i[r]=1),e++;t.a.length=n}}function sa(t,e){return Object.prototype.hasOwnProperty.call(t,e)}(Ai=$o.prototype).setTimeout=function(t){this.P=t},Ai.bb=function(t){t=t.target;var e=this.F;e&&3==Za(t)?e.f():this.Da(t)},Ai.Da=function(t){try{if(t==this.a)t:{var e=Za(this.a),n=this.a.va(),r=this.a.W();if(!(3>e||3==e&&!fs&&!this.a.$())){this.A||4!=e||7==n||Co(8==n||0>=r?3:2),Jo(this);var i=this.a.W();this.N=i;var s=this.a.$();if(this.b=200==i,function(t,e,n,r,i,s,o){t.info((function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+e+"\n"+n+"\n"+s+" "+o}))}(this.c,this.m,this.l,this.f,this.S,e,i),this.b){if(this.U&&!this.C){e:{if(this.a){var o,a=this.a;if((o=a.a?a.a.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Xi(o)){var c=o;break e}}c=null}if(!c){this.b=!1,this.h=3,No(12),ta(this),Zo(this);break t}_o(this.c,this.f,c,"Initial handshake response via X-HTTP-Initial-Response"),this.C=!0,ea(this,c)}this.I?(Wo(this,e,s),fs&&this.b&&3==e&&(wo(this.J,this.R,"tick",this.ab),this.R.start())):(_o(this.c,this.f,s,null),ea(this,s)),4==e&&ta(this),this.b&&!this.A&&(4==e?gc(this.g,this):(this.b=!1,Xo(this)))}else 400==i&&0<s.indexOf("Unknown SID")?(this.h=3,No(12)):(this.h=0,No(13)),ta(this),Zo(this)}}}catch(u){}},Ai.ab=function(){if(this.a){var t=Za(this.a),e=this.a.$();this.D<e.length&&(Jo(this),Wo(this,t,e),this.b&&4!=t&&Xo(this))}},Ai.cancel=function(){this.A=!0,ta(this)},Ai.$a=function(){this.o=null;var t=ji();0<=t-this.T?(function(t,e){t.info((function(){return"TIMEOUT: "+e}))}(this.c,this.l),2!=this.G&&(Co(3),No(17)),ta(this),this.h=2,Zo(this)):Yo(this,this.T-t)},(Ai=ra.prototype).K=function(){ia(this);for(var t=[],e=0;e<this.a.length;e++)t.push(this.b[this.a[e]]);return t},Ai.L=function(){return ia(this),this.a.concat()},Ai.get=function(t,e){return sa(this.b,t)?this.b[t]:e},Ai.set=function(t,e){sa(this.b,t)||(this.c++,this.a.push(t)),this.b[t]=e},Ai.forEach=function(t,e){for(var n=this.L(),r=0;r<n.length;r++){var i=n[r],s=this.get(i);t.call(e,s,i,this)}};var oa=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function aa(t,e){if(this.c=this.j=this.f="",this.h=null,this.i=this.g="",this.a=!1,t instanceof aa){this.a=void 0!==e?e:t.a,ua(this,t.f),this.j=t.j,ha(this,t.c),la(this,t.h),this.g=t.g,e=t.b;var n=new Ta;n.c=e.c,e.a&&(n.a=new ra(e.a),n.b=e.b),da(this,n),this.i=t.i}else t&&(n=String(t).match(oa))?(this.a=!!e,ua(this,n[1]||"",!0),this.j=ma(n[2]||""),ha(this,n[3]||"",!0),la(this,n[4]),this.g=ma(n[5]||"",!0),da(this,n[6]||"",!0),this.i=ma(n[7]||"")):(this.a=!!e,this.b=new Ta(null,this.a))}function ca(t){return new aa(t)}function ua(t,e,n){t.f=n?ma(e,!0):e,t.f&&(t.f=t.f.replace(/:$/,""))}function ha(t,e,n){t.c=n?ma(e,!0):e}function la(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.h=e}else t.h=null}function da(t,e,n){e instanceof Ta?(t.b=e,function(t,e){e&&!t.f&&(Ea(t),t.c=null,t.a.forEach((function(t,e){var n=e.toLowerCase();e!=n&&(Sa(this,e),Ca(this,n,t))}),t)),t.f=e}(t.b,t.a)):(n||(e=ga(e,Ia)),t.b=new Ta(e,t.a))}function fa(t,e,n){t.b.set(e,n)}function pa(t){return fa(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^ji()).toString(36)),t}function ma(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function ga(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,ya),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function ya(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}aa.prototype.toString=function(){var t=[],e=this.f;e&&t.push(ga(e,va,!0),":");var n=this.c;return(n||"file"==e)&&(t.push("//"),(e=this.j)&&t.push(ga(e,va,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.h)&&t.push(":",String(n))),(n=this.g)&&(this.c&&"/"!=n.charAt(0)&&t.push("/"),t.push(ga(n,"/"==n.charAt(0)?ba:wa,!0))),(n=this.b.toString())&&t.push("?",n),(n=this.i)&&t.push("#",ga(n,_a)),t.join("")};var va=/[#\/\?@]/g,wa=/[#\?:]/g,ba=/[#\?]/g,Ia=/[#\?@]/g,_a=/#/g;function Ta(t,e){this.b=this.a=null,this.c=t||null,this.f=!!e}function Ea(t){t.a||(t.a=new ra,t.b=0,t.c&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),i=null;if(0<=r){var s=t[n].substring(0,r);i=t[n].substring(r+1)}else s=t[n];e(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(t.c,(function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)})))}function Sa(t,e){Ea(t),e=Ra(t,e),sa(t.a.b,e)&&(t.c=null,t.b-=t.a.get(e).length,sa((t=t.a).b,e)&&(delete t.b[e],t.c--,t.a.length>2*t.c&&ia(t)))}function ka(t,e){return Ea(t),e=Ra(t,e),sa(t.a.b,e)}function Ca(t,e,n){Sa(t,e),0<n.length&&(t.c=null,t.a.set(Ra(t,e),Qi(n)),t.b+=n.length)}function Ra(t,e){return e=String(e),t.f&&(e=e.toLowerCase()),e}(Ai=Ta.prototype).add=function(t,e){Ea(this),this.c=null,t=Ra(this,t);var n=this.a.get(t);return n||this.a.set(t,n=[]),n.push(e),this.b+=1,this},Ai.forEach=function(t,e){Ea(this),this.a.forEach((function(n,r){Gi(n,(function(n){t.call(e,n,r,this)}),this)}),this)},Ai.L=function(){Ea(this);for(var t=this.a.K(),e=this.a.L(),n=[],r=0;r<e.length;r++)for(var i=t[r],s=0;s<i.length;s++)n.push(e[r]);return n},Ai.K=function(t){Ea(this);var e=[];if("string"==typeof t)ka(this,t)&&(e=Wi(e,this.a.get(Ra(this,t))));else{t=this.a.K();for(var n=0;n<t.length;n++)e=Wi(e,t[n])}return e},Ai.set=function(t,e){return Ea(this),this.c=null,ka(this,t=Ra(this,t))&&(this.b-=this.a.get(t).length),this.a.set(t,[e]),this.b+=1,this},Ai.get=function(t,e){return t&&0<(t=this.K(t)).length?String(t[0]):e},Ai.toString=function(){if(this.c)return this.c;if(!this.a)return"";for(var t=[],e=this.a.L(),n=0;n<e.length;n++){var r=e[n],i=encodeURIComponent(String(r));r=this.K(r);for(var s=0;s<r.length;s++){var o=i;""!==r[s]&&(o+="="+encodeURIComponent(String(r[s]))),t.push(o)}}return this.c=t.join("&")};var Na=function(t,e){this.b=t,this.a=e};function Aa(t){this.g=t||Da,Oi.PerformanceNavigationTiming?t=0<(t=Oi.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(Oi.ja&&Oi.ja.za&&Oi.ja.za()&&Oi.ja.za().Qb),this.f=t?this.g:1,this.a=null,1<this.f&&(this.a=new Set),this.b=null,this.c=[]}var Da=10;function xa(t){return!!t.b||!!t.a&&t.a.size>=t.f}function Oa(t){return t.b?1:t.a?t.a.size:0}function La(t,e){return t.b?t.b==e:!!t.a&&t.a.has(e)}function Pa(t,e){t.a?t.a.add(e):t.b=e}function Ma(t,e){t.b&&t.b==e?t.b=null:t.a&&t.a.has(e)&&t.a.delete(e)}function Ua(t){var e,n;if(null!=t.b)return t.c.concat(t.b.s);if(null!=t.a&&0!==t.a.size){var r=t.c;try{for(var i=Ni(t.a.values()),s=i.next();!s.done;s=i.next()){var o=s.value;r=r.concat(o.s)}}catch(a){e={error:a}}finally{try{s&&!s.done&&(n=i.return)&&n.call(i)}finally{if(e)throw e.error}}return r}return Qi(t.c)}function Fa(){}function Va(){this.a=new Fa}function qa(t,e,n){var r=n||"";try{na(t,(function(t,n){var i=t;Mi(t)&&(i=to(t)),e.push(r+n+"="+encodeURIComponent(i))}))}catch(i){throw e.push(r+"type="+encodeURIComponent("_badmap")),i}}function Ba(t,e,n,r,i){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,i(r)}catch(s){}}Aa.prototype.cancel=function(){var t,e;if(this.c=Ua(this),this.b)this.b.cancel(),this.b=null;else if(this.a&&0!==this.a.size){try{for(var n=Ni(this.a.values()),r=n.next();!r.done;r=n.next()){r.value.cancel()}}catch(i){t={error:i}}finally{try{r&&!r.done&&(e=n.return)&&e.call(n)}finally{if(t)throw t.error}}this.a.clear()}},Fa.prototype.stringify=function(t){return Oi.JSON.stringify(t,void 0)},Fa.prototype.parse=function(t){return Oi.JSON.parse(t,void 0)};var $a=Oi.JSON.parse;function ja(t){Ys.call(this),this.headers=new ra,this.l=t||null,this.b=!1,this.u=this.a=null,this.C="",this.h=0,this.f="",this.g=this.B=this.m=this.A=!1,this.s=0,this.o=null,this.I=za,this.F=this.G=!1}zi(ja,Ys);var za="",Ka=/^https?$/i,Ha=["POST","PUT"];function Ga(t){return"content-type"==t.toLowerCase()}function Wa(t,e){t.b=!1,t.a&&(t.g=!0,t.a.abort(),t.g=!1),t.f=e,t.h=5,Qa(t),Ya(t)}function Qa(t){t.A||(t.A=!0,Js(t,"complete"),Js(t,"error"))}function Xa(t){if(t.b&&void 0!==xi&&(!t.u[1]||4!=Za(t)||2!=t.W()))if(t.m&&4==Za(t))po(t.Aa,0,t);else if(Js(t,"readystatechange"),4==Za(t)){t.b=!1;try{var e,n=t.W();t:switch(n){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var r=!0;break t;default:r=!1}if(!(e=r)){var i;if(i=0===n){var s=String(t.C).match(oa)[1]||null;if(!s&&Oi.self&&Oi.self.location){var o=Oi.self.location.protocol;s=o.substr(0,o.length-1)}i=!Ka.test(s?s.toLowerCase():"")}e=i}if(e)Js(t,"complete"),Js(t,"success");else{t.h=6;try{var a=2<Za(t)?t.a.statusText:""}catch(c){a=""}t.f=a+" ["+t.W()+"]",Qa(t)}}finally{Ya(t)}}}function Ya(t,e){if(t.a){Ja(t);var n=t.a,r=t.u[0]?Li:null;t.a=null,t.u=null,e||Js(t,"ready");try{n.onreadystatechange=r}catch(i){}}}function Ja(t){t.a&&t.F&&(t.a.ontimeout=null),t.o&&(Oi.clearTimeout(t.o),t.o=null)}function Za(t){return t.a?t.a.readyState:0}function tc(t,e,n){t:{for(r in n){var r=!1;break t}r=!0}r||(n=function(t){var e="";return rs(t,(function(t,n){e+=n,e+=":",e+=t,e+="\r\n"})),e}(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):fa(t,e,n))}function ec(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function nc(t){this.qa=0,this.g=[],this.c=new Io,this.ha=this.ma=this.B=this.ga=this.a=this.oa=this.A=this.V=this.i=this.O=this.l=null,this.Pa=this.R=0,this.Ma=ec("failFast",!1,t),this.G=this.m=this.j=this.h=this.f=null,this.S=!0,this.I=this.pa=this.P=-1,this.T=this.o=this.u=0,this.Ia=ec("baseRetryDelayMs",5e3,t),this.Sa=ec("retryDelaySeedMs",1e4,t),this.Na=ec("forwardChannelMaxRetries",2,t),this.na=ec("forwardChannelRequestTimeoutMs",2e4,t),this.Oa=t&&t.xmlHttpFactory||void 0,this.D=void 0,this.C=t&&t.supportsCrossDomainXhr||!1,this.J="",this.b=new Aa(t&&t.concurrentRequestLimit),this.la=new Va,this.ea=t&&t.fastHandshake||!1,this.Ja=t&&t.b||!1,t&&t.f&&(this.c.a=!1),t&&t.forceLongPolling&&(this.S=!1),this.U=!this.ea&&this.S&&t&&t.detectBufferingProxy||!1,this.fa=void 0,this.N=0,this.F=!1,this.s=null,(this.La=t&&t.c||!1)&&this.c.info("Opt-in to enable Chrome Origin Trials.")}function rc(t){if(sc(t),3==t.v){var e=t.R++,n=ca(t.B);fa(n,"SID",t.J),fa(n,"RID",e),fa(n,"TYPE","terminate"),uc(t,n),(e=new $o(t,t.c,e,void 0)).G=2,e.i=pa(ca(n)),n=!1,Oi.navigator&&Oi.navigator.sendBeacon&&(n=Oi.navigator.sendBeacon(e.i.toString(),"")),!n&&Oi.Image&&((new Image).src=e.i,n=!0),n||(e.a=Ic(e.g,null),e.a.ba(e.i)),e.u=ji(),Xo(e)}wc(t)}function ic(t){t.a&&(fc(t),t.a.cancel(),t.a=null)}function sc(t){ic(t),t.j&&(Oi.clearTimeout(t.j),t.j=null),mc(t),t.b.cancel(),t.h&&("number"==typeof t.h&&Oi.clearTimeout(t.h),t.h=null)}function oc(t,e){t.g.push(new Na(t.Pa++,e)),3==t.v&&ac(t)}function ac(t){xa(t.b)||t.h||(t.h=!0,ao(t.Ca,t),t.u=0)}function cc(t,e){var n;n=e?e.f:t.R++;var r=ca(t.B);fa(r,"SID",t.J),fa(r,"RID",n),fa(r,"AID",t.P),uc(t,r),t.i&&t.l&&tc(r,t.i,t.l),n=new $o(t,t.c,n,t.u+1),null===t.i&&(n.B=t.l),e&&(t.g=e.s.concat(t.g)),e=hc(t,n,1e3),n.setTimeout(Math.round(.5*t.na)+Math.round(.5*t.na*Math.random())),Pa(t.b,n),Ho(n,r,e)}function uc(t,e){t.f&&na({},(function(t,n){fa(e,n,t)}))}function hc(t,e,n){n=Math.min(t.g.length,n);var r=t.f?Bi(t.f.Ka,t.f,t):null;t:for(var i=t.g,s=-1;;){var o=["count="+n];-1==s?0<n?(s=i[0].b,o.push("ofs="+s)):s=0:o.push("ofs="+s);for(var a=!0,c=0;c<n;c++){var u=i[c].b,h=i[c].a;if(0>(u-=s))s=Math.max(0,i[c].b-100),a=!1;else try{qa(h,o,"req"+u+"_")}catch(l){r&&r(h)}}if(a){r=o.join("&");break t}}return t=t.g.splice(0,n),e.s=t,r}function lc(t){t.a||t.j||(t.T=1,ao(t.Ba,t),t.o=0)}function dc(t){return!(t.a||t.j||3<=t.o)&&(t.T++,t.j=Do(Bi(t.Ba,t),yc(t,t.o)),t.o++,!0)}function fc(t){null!=t.s&&(Oi.clearTimeout(t.s),t.s=null)}function pc(t){t.a=new $o(t,t.c,"rpc",t.T),null===t.i&&(t.a.B=t.l),t.a.O=0;var e=ca(t.ma);fa(e,"RID","rpc"),fa(e,"SID",t.J),fa(e,"CI",t.G?"0":"1"),fa(e,"AID",t.P),uc(t,e),fa(e,"TYPE","xmlhttp"),t.i&&t.l&&tc(e,t.i,t.l),t.D&&t.a.setTimeout(t.D);var n=t.a;t=t.ha,n.G=1,n.i=pa(ca(e)),n.j=null,n.I=!0,Go(n,t)}function mc(t){null!=t.m&&(Oi.clearTimeout(t.m),t.m=null)}function gc(t,e){var n=null;if(t.a==e){mc(t),fc(t),t.a=null;var r=2}else{if(!La(t.b,e))return;n=e.s,Ma(t.b,e),r=1}if(t.I=e.N,0!=t.v)if(e.b)if(1==r){n=e.j?e.j.length:0,e=ji()-e.u;var i=t.u;Js(r=So(),new Ao(r,n,e,i)),ac(t)}else lc(t);else if(3==(i=e.h)||0==i&&0<t.I||!(1==r&&function(t,e){return!(Oa(t.b)>=t.b.f-(t.h?1:0)||(t.h?(t.g=e.s.concat(t.g),0):1==t.v||2==t.v||t.u>=(t.Ma?0:t.Na)||(t.h=Do(Bi(t.Ca,t,e),yc(t,t.u)),t.u++,0)))}(t,e)||2==r&&dc(t)))switch(n&&0<n.length&&(e=t.b,e.c=e.c.concat(n)),i){case 1:vc(t,5);break;case 4:vc(t,10);break;case 3:vc(t,6);break;default:vc(t,2)}}function yc(t,e){var n=t.Ia+Math.floor(Math.random()*t.Sa);return t.f||(n*=2),n*e}function vc(t,e){if(t.c.info("Error code "+e),2==e){var n=null;t.f&&(n=null);var r=Bi(t.cb,t);n||(n=new aa("//www.google.com/images/cleardot.gif"),Oi.location&&"http"==Oi.location.protocol||ua(n,"https"),pa(n)),function(t,e){var n=new Io;if(Oi.Image){var r=new Image;r.onload=$i(Ba,n,r,"TestLoadImage: loaded",!0,e),r.onerror=$i(Ba,n,r,"TestLoadImage: error",!1,e),r.onabort=$i(Ba,n,r,"TestLoadImage: abort",!1,e),r.ontimeout=$i(Ba,n,r,"TestLoadImage: timeout",!1,e),Oi.setTimeout((function(){r.ontimeout&&r.ontimeout()}),1e4),r.src=t}else e(!1)}(n.toString(),r)}else No(2);t.v=0,t.f&&t.f.sa(e),wc(t),sc(t)}function wc(t){t.v=0,t.I=-1,t.f&&(0==Ua(t.b).length&&0==t.g.length||(t.b.c.length=0,Qi(t.g),t.g.length=0),t.f.ra())}function bc(t,e,n){var r=function(t){return t instanceof aa?ca(t):new aa(t,void 0)}(n);if(""!=r.c)e&&ha(r,e+"."+r.c),la(r,r.h);else{var i=Oi.location;r=function(t,e,n,r){var i=new aa(null,void 0);return t&&ua(i,t),e&&ha(i,e),n&&la(i,n),r&&(i.g=r),i}(i.protocol,e?e+"."+i.hostname:i.hostname,+i.port,n)}return t.V&&rs(t.V,(function(t,e){fa(r,e,t)})),e=t.A,n=t.oa,e&&n&&fa(r,e,n),fa(r,"VER",t.ia),uc(t,r),r}function Ic(t,e){if(e&&!t.C)throw Error("Can't create secondary domain capable XhrIo object.");return(e=new ja(t.Oa)).G=t.C,e}function _c(){}function Tc(){if(ls&&!(10<=Number(Es)))throw Error("Environmental error: no available transport.")}function Ec(t,e){Ys.call(this),this.a=new nc(e),this.g=t,this.b=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.a.l=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.a&&(t?t["X-WebChannel-Client-Profile"]=e.a:t={"X-WebChannel-Client-Profile":e.a}),this.a.O=t,(t=e&&e.httpHeadersOverwriteParam)&&!Xi(t)&&(this.a.i=t),this.o=e&&e.supportsCrossDomainXhr||!1,this.m=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!Xi(e)&&(this.a.A=e,null!==(t=this.b)&&e in t&&(e in(t=this.b)&&delete t[e])),this.f=new Cc(this)}function Sc(t){Vo.call(this);var e=t.__sm__;if(e){t:{for(var n in e){t=n;break t}t=void 0}(this.c=t)?(t=this.c,this.data=null!==e&&t in e?e[t]:void 0):this.data=e}else this.data=t}function kc(){qo.call(this),this.status=1}function Cc(t){this.a=t}function Rc(t){this.f=t}function Nc(t){Ys.call(this),this.u=t,this.h=void 0,this.readyState=Ac,this.status=0,this.responseType=this.responseText=this.statusText="",this.onreadystatechange=null,this.l=new Headers,this.b=null,this.s="GET",this.o="",this.a=!1,this.m=this.f=this.g=null}(Ai=ja.prototype).ba=function(t,e,n,r){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.C+"; newUri="+t);e=e?e.toUpperCase():"GET",this.C=t,this.f="",this.h=0,this.A=!1,this.b=!0,this.a=this.l?this.l.a():Uo.a(),this.u=this.l?Po(this.l):Po(Uo),this.a.onreadystatechange=Bi(this.Aa,this);try{this.B=!0,this.a.open(e,String(t),!0),this.B=!1}catch(s){return void Wa(this,s)}t=n||"";var i=new ra(this.headers);r&&na(r,(function(t,e){i.set(e,t)})),r=function(t){t:{for(var e=Ga,n=t.length,r="string"==typeof t?t.split(""):t,i=0;i<n;i++)if(i in r&&e.call(void 0,r[i],i,t)){e=i;break t}e=-1}return 0>e?null:"string"==typeof t?t.charAt(e):t[e]}(i.L()),n=Oi.FormData&&t instanceof Oi.FormData,!(0<=Hi(Ha,e))||r||n||i.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),i.forEach((function(t,e){this.a.setRequestHeader(e,t)}),this),this.I&&(this.a.responseType=this.I),"withCredentials"in this.a&&this.a.withCredentials!==this.G&&(this.a.withCredentials=this.G);try{Ja(this),0<this.s&&((this.F=function(t){return ls&&_s(9)&&"number"==typeof t.timeout&&void 0!==t.ontimeout}(this.a))?(this.a.timeout=this.s,this.a.ontimeout=Bi(this.ya,this)):this.o=po(this.ya,this.s,this)),this.m=!0,this.a.send(t),this.m=!1}catch(s){Wa(this,s)}},Ai.ya=function(){void 0!==xi&&this.a&&(this.f="Timed out after "+this.s+"ms, aborting",this.h=8,Js(this,"timeout"),this.abort(8))},Ai.abort=function(t){this.a&&this.b&&(this.b=!1,this.g=!0,this.a.abort(),this.g=!1,this.h=t||7,Js(this,"complete"),Js(this,"abort"),Ya(this))},Ai.H=function(){this.a&&(this.b&&(this.b=!1,this.g=!0,this.a.abort(),this.g=!1),Ya(this,!0)),ja.X.H.call(this)},Ai.Aa=function(){this.j||(this.B||this.m||this.g?Xa(this):this.Za())},Ai.Za=function(){Xa(this)},Ai.W=function(){try{return 2<Za(this)?this.a.status:-1}catch(us){return-1}},Ai.$=function(){try{return this.a?this.a.responseText:""}catch(us){return""}},Ai.Qa=function(t){if(this.a){var e=this.a.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),$a(e)}},Ai.va=function(){return this.h},Ai.Ra=function(){return"string"==typeof this.f?this.f:String(this.f)},(Ai=nc.prototype).ia=8,Ai.v=1,Ai.Ca=function(t){if(this.h)if(this.h=null,1==this.v){if(!t){this.R=Math.floor(1e5*Math.random()),t=this.R++;var e,n=new $o(this,this.c,t,void 0),r=this.l;if(this.O&&(r?os(r=is(r),this.O):r=this.O),null===this.i&&(n.B=r),this.ea)t:{for(var i=e=0;i<this.g.length;i++){var s=this.g[i];if(void 0===(s="__data__"in s.a&&"string"==typeof(s=s.a.__data__)?s.length:void 0))break;if(4096<(e+=s)){e=i;break t}if(4096===e||i===this.g.length-1){e=i+1;break t}}e=1e3}else e=1e3;e=hc(this,n,e),fa(i=ca(this.B),"RID",t),fa(i,"CVER",22),this.A&&fa(i,"X-HTTP-Session-Id",this.A),uc(this,i),this.i&&r&&tc(i,this.i,r),Pa(this.b,n),this.Ja&&fa(i,"TYPE","init"),this.ea?(fa(i,"$req",e),fa(i,"SID","null"),n.U=!0,Ho(n,i,null)):Ho(n,i,e),this.v=2}}else 3==this.v&&(t?cc(this,t):0==this.g.length||xa(this.b)||cc(this))},Ai.Ba=function(){if(this.j=null,pc(this),this.U&&!(this.F||null==this.a||0>=this.N)){var t=2*this.N;this.c.info("BP detection timer enabled: "+t),this.s=Do(Bi(this.Ya,this),t)}},Ai.Ya=function(){this.s&&(this.s=null,this.c.info("BP detection timeout reached."),this.c.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.F=!0,No(10),ic(this),pc(this))},Ai.Xa=function(){null!=this.m&&(this.m=null,ic(this),dc(this),No(19))},Ai.cb=function(t){t?(this.c.info("Successfully pinged google.com"),No(2)):(this.c.info("Failed to ping google.com"),No(1))},(Ai=_c.prototype).ua=function(){},Ai.ta=function(){},Ai.sa=function(){},Ai.ra=function(){},Ai.Ka=function(){},Tc.prototype.a=function(t,e){return new Ec(t,e)},zi(Ec,Ys),Ec.prototype.h=function(){this.a.f=this.f,this.o&&(this.a.C=!0);var t=this.a,e=this.g,n=this.b||void 0;No(0),t.ga=e,t.V=n||{},t.G=t.S,t.B=bc(t,null,t.ga),ac(t)},Ec.prototype.close=function(){rc(this.a)},Ec.prototype.l=function(t){if("string"==typeof t){var e={};e.__data__=t,oc(this.a,e)}else this.m?((e={}).__data__=to(t),oc(this.a,e)):oc(this.a,t)},Ec.prototype.H=function(){this.a.f=null,delete this.f,rc(this.a),delete this.a,Ec.X.H.call(this)},zi(Sc,Vo),zi(kc,qo),zi(Cc,_c),Cc.prototype.ua=function(){Js(this.a,"a")},Cc.prototype.ta=function(t){Js(this.a,new Sc(t))},Cc.prototype.sa=function(t){Js(this.a,new kc(t))},Cc.prototype.ra=function(){Js(this.a,"b")},zi(Rc,Lo),Rc.prototype.a=function(){return new Nc(this.f)},Rc.prototype.c=function(t){return function(){return t}}({}),zi(Nc,Ys);var Ac=0;function Dc(t){t.f.read().then(t.Ta.bind(t)).catch(t.ca.bind(t))}function xc(t){t.readyState=4,t.g=null,t.f=null,t.m=null,Oc(t)}function Oc(t){t.onreadystatechange&&t.onreadystatechange.call(t)}(Ai=Nc.prototype).open=function(t,e){if(this.readyState!=Ac)throw this.abort(),Error("Error reopening a connection");this.s=t,this.o=e,this.readyState=1,Oc(this)},Ai.send=function(t){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.a=!0;var e={headers:this.l,method:this.s,credentials:this.h,cache:void 0};t&&(e.body=t),this.u.fetch(new Request(this.o,e)).then(this.Wa.bind(this),this.ca.bind(this))},Ai.abort=function(){this.responseText="",this.l=new Headers,this.status=0,this.f&&this.f.cancel("Request was aborted."),1<=this.readyState&&this.a&&4!=this.readyState&&(this.a=!1,xc(this)),this.readyState=Ac},Ai.Wa=function(t){this.a&&(this.g=t,this.b||(this.status=this.g.status,this.statusText=this.g.statusText,this.b=t.headers,this.readyState=2,Oc(this)),this.a&&(this.readyState=3,Oc(this),this.a&&("arraybuffer"===this.responseType?t.arrayBuffer().then(this.Ua.bind(this),this.ca.bind(this)):void 0!==Oi.ReadableStream&&"body"in t?(this.responseText="",this.f=t.body.getReader(),this.m=new TextDecoder,Dc(this)):t.text().then(this.Va.bind(this),this.ca.bind(this)))))},Ai.Ta=function(t){if(this.a){var e=this.m.decode(t.value?t.value:new Uint8Array(0),{stream:!t.done});e&&(this.responseText+=e),t.done?xc(this):Oc(this),3==this.readyState&&Dc(this)}},Ai.Va=function(t){this.a&&(this.responseText=t,xc(this))},Ai.Ua=function(){this.a&&xc(this)},Ai.ca=function(){this.a&&xc(this)},Ai.setRequestHeader=function(t,e){this.l.append(t,e)},Ai.getResponseHeader=function(t){return this.b&&this.b.get(t.toLowerCase())||""},Ai.getAllResponseHeaders=function(){if(!this.b)return"";for(var t=[],e=this.b.entries(),n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join("\r\n")},Object.defineProperty(Nc.prototype,"withCredentials",{get:function(){return"include"===this.h},set:function(t){this.h=t?"include":"same-origin"}}),Tc.prototype.createWebChannel=Tc.prototype.a,Ec.prototype.send=Ec.prototype.l,Ec.prototype.open=Ec.prototype.h,Ec.prototype.close=Ec.prototype.close,xo.NO_ERROR=0,xo.TIMEOUT=8,xo.HTTP_ERROR=6,Oo.COMPLETE="complete",Mo.EventType=Fo,Fo.OPEN="a",Fo.CLOSE="b",Fo.ERROR="c",Fo.MESSAGE="d",Ys.prototype.listen=Ys.prototype.wa,ja.prototype.listenOnce=ja.prototype.xa,ja.prototype.getLastError=ja.prototype.Ra,ja.prototype.getLastErrorCode=ja.prototype.va,ja.prototype.getStatus=ja.prototype.W,ja.prototype.getResponseJson=ja.prototype.Qa,ja.prototype.getResponseText=ja.prototype.$,ja.prototype.send=ja.prototype.ba;var Lc=xo,Pc=Oo,Mc=To,Uc=10,Fc=11,Vc=Rc,qc=Mo,Bc=ja;
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
let $c="8.6.8";
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
 */class jc{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.t(t),this.i=t=>e.writeSequenceNumber(t))}t(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.i&&this.i(t),t}}jc.o=-1;
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
const zc={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Kc extends Error{constructor(t,e){super(e),this.code=t,this.message=e,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
 */const Hc=new ke("@firebase/firestore");function Gc(){return Hc.logLevel}function Wc(t,...e){if(Hc.logLevel<=ve.DEBUG){const n=e.map(Yc);Hc.debug(`Firestore (${$c}): ${t}`,...n)}}function Qc(t,...e){if(Hc.logLevel<=ve.ERROR){const n=e.map(Yc);Hc.error(`Firestore (${$c}): ${t}`,...n)}}function Xc(t,...e){if(Hc.logLevel<=ve.WARN){const n=e.map(Yc);Hc.warn(`Firestore (${$c}): ${t}`,...n)}}function Yc(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e)}catch(n){return t}var e}
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
 */function Jc(t="Unexpected state"){const e=`FIRESTORE (${$c}) INTERNAL ASSERTION FAILED: `+t;throw Qc(e),new Error(e)}function Zc(t,e){t||Jc()}function tu(t,e){return t}
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
 */function eu(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}
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
 */class nu{static u(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let n="";for(;n.length<20;){const r=eu(40);for(let i=0;i<r.length;++i)n.length<20&&r[i]<e&&(n+=t.charAt(r[i]%t.length))}return n}}function ru(t,e){return t<e?-1:t>e?1:0}function iu(t,e,n){return t.length===e.length&&t.every(((t,r)=>n(t,e[r])))}function su(t){return t+"\0"}
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
 */class ou{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new Kc(zc.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new Kc(zc.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new Kc(zc.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new Kc(zc.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return ou.fromMillis(Date.now())}static fromDate(t){return ou.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new ou(e,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?ru(this.nanoseconds,t.nanoseconds):ru(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
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
 */class au{constructor(t){this.timestamp=t}static fromTimestamp(t){return new au(t)}static min(){return new au(new ou(0,0))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
 */function cu(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function uu(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function hu(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
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
 */class lu{constructor(t,e,n){void 0===e?e=0:e>t.length&&Jc(),void 0===n?n=t.length-e:n>t.length-e&&Jc(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===lu.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof lu?t.forEach((t=>{e.push(t)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=t.get(r),i=e.get(r);if(n<i)return-1;if(n>i)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class du extends lu{construct(t,e,n){return new du(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new Kc(zc.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((t=>t.length>0)))}return new du(e)}static emptyPath(){return new du([])}}const fu=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class pu extends lu{construct(t,e,n){return new pu(t,e,n)}static isValidIdentifier(t){return fu.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),pu.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new pu(["__name__"])}static fromServerFormat(t){const e=[];let n="",r=0;const i=()=>{if(0===n.length)throw new Kc(zc.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let s=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new Kc(zc.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new Kc(zc.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(s=!s,r++):"."!==e||s?(n+=e,r++):(i(),r++)}if(i(),s)throw new Kc(zc.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new pu(e)}static emptyPath(){return new pu([])}}
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
 */class mu{constructor(t){this.fields=t,t.sort(pu.comparator)}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return iu(this.fields,t.fields,((t,e)=>t.isEqual(e)))}}
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
 */class gu{constructor(t){this.binaryString=t}static fromBase64String(t){const e=atob(t);return new gu(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new gu(e)}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return ru(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}gu.EMPTY_BYTE_STRING=new gu("");const yu=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function vu(t){if(Zc(!!t),"string"==typeof t){let e=0;const n=yu.exec(t);if(Zc(!!n),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:wu(t.seconds),nanos:wu(t.nanos)}}function wu(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function bu(t){return"string"==typeof t?gu.fromBase64String(t):gu.fromUint8Array(t)}
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
 */function Iu(t){var e,n;return"server_timestamp"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function _u(t){const e=t.mapValue.fields.__previous_value__;return Iu(e)?_u(e):e}function Tu(t){const e=vu(t.mapValue.fields.__local_write_time__.timestampValue);return new ou(e.seconds,e.nanos)}
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
 */function Eu(t){return null==t}function Su(t){return 0===t&&1/t==-1/0}
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
class ku{constructor(t){this.path=t}static fromPath(t){return new ku(du.fromString(t))}static fromName(t){return new ku(du.fromString(t).popFirst(5))}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}isEqual(t){return null!==t&&0===du.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return du.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new ku(new du(t.slice()))}}
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
 */function Cu(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Iu(t)?4:10:Jc()}function Ru(t,e){const n=Cu(t);if(n!==Cu(e))return!1;switch(n){case 0:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Tu(t).isEqual(Tu(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=vu(t.timestampValue),r=vu(e.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return r=e,bu(t.bytesValue).isEqual(bu(r.bytesValue));case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return wu(t.geoPointValue.latitude)===wu(e.geoPointValue.latitude)&&wu(t.geoPointValue.longitude)===wu(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return wu(t.integerValue)===wu(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=wu(t.doubleValue),r=wu(e.doubleValue);return n===r?Su(n)===Su(r):isNaN(n)&&isNaN(r)}return!1}(t,e);case 9:return iu(t.arrayValue.values||[],e.arrayValue.values||[],Ru);case 10:return function(t,e){const n=t.mapValue.fields||{},r=e.mapValue.fields||{};if(cu(n)!==cu(r))return!1;for(const i in n)if(n.hasOwnProperty(i)&&(void 0===r[i]||!Ru(n[i],r[i])))return!1;return!0}(t,e);default:return Jc()}var r}function Nu(t,e){return void 0!==(t.values||[]).find((t=>Ru(t,e)))}function Au(t,e){const n=Cu(t),r=Cu(e);if(n!==r)return ru(n,r);switch(n){case 0:return 0;case 1:return ru(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=wu(t.integerValue||t.doubleValue),r=wu(e.integerValue||e.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(t,e);case 3:return Du(t.timestampValue,e.timestampValue);case 4:return Du(Tu(t),Tu(e));case 5:return ru(t.stringValue,e.stringValue);case 6:return function(t,e){const n=bu(t),r=bu(e);return n.compareTo(r)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),r=e.split("/");for(let i=0;i<n.length&&i<r.length;i++){const t=ru(n[i],r[i]);if(0!==t)return t}return ru(n.length,r.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=ru(wu(t.latitude),wu(e.latitude));return 0!==n?n:ru(wu(t.longitude),wu(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const t=Au(n[i],r[i]);if(t)return t}return ru(n.length,r.length)}(t.arrayValue,e.arrayValue);case 10:return function(t,e){const n=t.fields||{},r=Object.keys(n),i=e.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let o=0;o<r.length&&o<s.length;++o){const t=ru(r[o],s[o]);if(0!==t)return t;const e=Au(n[r[o]],i[s[o]]);if(0!==e)return e}return ru(r.length,s.length)}(t.mapValue,e.mapValue);default:throw Jc()}}function Du(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return ru(t,e);const n=vu(t),r=vu(e),i=ru(n.seconds,r.seconds);return 0!==i?i:ru(n.nanos,r.nanos)}function xu(t){return Ou(t)}function Ou(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=vu(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?bu(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,ku.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(t){let e="[",n=!0;for(const r of t.values||[])n?n=!1:e+=",",e+=Ou(r);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",r=!0;for(const i of e)r?r=!1:n+=",",n+=`${i}:${Ou(t.fields[i])}`;return n+"}"}(t.mapValue):Jc();var e,n}function Lu(t){return!!t&&"integerValue"in t}function Pu(t){return!!t&&"arrayValue"in t}function Mu(t){return!!t&&"nullValue"in t}function Uu(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Fu(t){return!!t&&"mapValue"in t}function Vu(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue)return{timestampValue:Object.assign({},vu(t.timestampValue))};if(t.mapValue){const e={mapValue:{fields:{}}};return uu(t.mapValue.fields,((t,n)=>e.mapValue.fields[t]=Vu(n))),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Vu(t.arrayValue.values[n]);return e}return Object.assign({},t)}
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
 */class qu{constructor(t){this.value=t}static empty(){return new qu({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Fu(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Vu(e)}setAll(t){let e=pu.emptyPath(),n={},r=[];t.forEach(((t,i)=>{if(!e.isImmediateParentOf(i)){const t=this.getFieldsMap(e);this.applyChanges(t,n,r),n={},r=[],e=i.popLast()}t?n[i.lastSegment()]=Vu(t):r.push(i.lastSegment())}));const i=this.getFieldsMap(e);this.applyChanges(i,n,r)}delete(t){const e=this.field(t.popLast());Fu(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Ru(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let r=e.mapValue.fields[t.get(n)];Fu(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=r),e=r}return e.mapValue.fields}applyChanges(t,e,n){uu(e,((e,n)=>t[e]=n));for(const r of n)delete t[r]}clone(){return new qu(Vu(this.value))}}function Bu(t){const e=[];return uu(t.fields,((t,n)=>{const r=new pu([t]);if(Fu(n)){const t=Bu(n.mapValue).fields;if(0===t.length)e.push(r);else for(const n of t)e.push(r.child(n))}else e.push(r)})),new mu(e)
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
 */}class $u{constructor(t,e,n,r,i){this.key=t,this.documentType=e,this.version=n,this.data=r,this.documentState=i}static newInvalidDocument(t){return new $u(t,0,au.min(),qu.empty(),0)}static newFoundDocument(t,e,n){return new $u(t,1,e,n,0)}static newNoDocument(t,e){return new $u(t,2,e,qu.empty(),0)}static newUnknownDocument(t,e){return new $u(t,3,e,qu.empty(),2)}convertToFoundDocument(t,e){return this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=qu.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=qu.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof $u&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}clone(){return new $u(this.key,this.documentType,this.version,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
 */class ju{constructor(t,e=null,n=[],r=[],i=null,s=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=o,this.h=null}}function zu(t,e=null,n=[],r=[],i=null,s=null,o=null){return new ju(t,e,n,r,i,s,o)}function Ku(t){const e=tu(t);if(null===e.h){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((t=>function(t){return t.field.canonicalString()+t.op.toString()+xu(t.value)}(t))).join(","),t+="|ob:",t+=e.orderBy.map((t=>{return(e=t).field.canonicalString()+e.dir;var e})).join(","),Eu(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=ih(e.startAt)),e.endAt&&(t+="|ub:",t+=ih(e.endAt)),e.h=t}return e.h}function Hu(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let i=0;i<t.orderBy.length;i++)if(!oh(t.orderBy[i],e.orderBy[i]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let i=0;i<t.filters.length;i++)if(n=t.filters[i],r=e.filters[i],n.op!==r.op||!n.field.isEqual(r.field)||!Ru(n.value,r.value))return!1;var n,r;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!ch(t.startAt,e.startAt)&&ch(t.endAt,e.endAt)}function Gu(t){return ku.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}class Wu extends class{}{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.l(t,e,n):new Qu(t,e,n):"array-contains"===e?new Zu(t,n):"in"===e?new th(t,n):"not-in"===e?new eh(t,n):"array-contains-any"===e?new nh(t,n):new Wu(t,e,n)}static l(t,e,n){return"in"===e?new Xu(t,n):new Yu(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&this.m(Au(e,this.value)):null!==e&&Cu(this.value)===Cu(e)&&this.m(Au(e,this.value))}m(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return Jc()}}g(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class Qu extends Wu{constructor(t,e,n){super(t,e,n),this.key=ku.fromName(n.referenceValue)}matches(t){const e=ku.comparator(t.key,this.key);return this.m(e)}}class Xu extends Wu{constructor(t,e){super(t,"in",e),this.keys=Ju("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Yu extends Wu{constructor(t,e){super(t,"not-in",e),this.keys=Ju("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Ju(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map((t=>ku.fromName(t.referenceValue)))}class Zu extends Wu{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Pu(e)&&Nu(e.arrayValue,this.value)}}class th extends Wu{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&Nu(this.value.arrayValue,e)}}class eh extends Wu{constructor(t,e){super(t,"not-in",e)}matches(t){if(Nu(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&!Nu(this.value.arrayValue,e)}}class nh extends Wu{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Pu(e)||!e.arrayValue.values)&&e.arrayValue.values.some((t=>Nu(this.value.arrayValue,t)))}}class rh{constructor(t,e){this.position=t,this.before=e}}function ih(t){return`${t.before?"b":"a"}:${t.position.map((t=>xu(t))).join(",")}`}class sh{constructor(t,e="asc"){this.field=t,this.dir=e}}function oh(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}function ah(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],o=t.position[i];if(r=s.field.isKeyField()?ku.comparator(ku.fromName(o.referenceValue),n.key):Au(o,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return t.before?r<=0:r<0}function ch(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.before!==e.before||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Ru(t.position[n],e.position[n]))return!1;return!0}
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
 */class uh{constructor(t,e=null,n=[],r=[],i=null,s="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=o,this.endAt=a,this.p=null,this.T=null,this.startAt,this.endAt}}function hh(t){return new uh(t)}function lh(t){return!Eu(t.limit)&&"F"===t.limitType}function dh(t){return!Eu(t.limit)&&"L"===t.limitType}function fh(t){const e=tu(t);if(null===e.p){e.p=[];const t=function(t){for(const e of t.filters)if(e.g())return e.field;return null}(e),n=function(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}(e);if(null!==t&&null===n)t.isKeyField()||e.p.push(new sh(t)),e.p.push(new sh(pu.keyField(),"asc"));else{let t=!1;for(const n of e.explicitOrderBy)e.p.push(n),n.field.isKeyField()&&(t=!0);if(!t){const t=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.p.push(new sh(pu.keyField(),t))}}}return e.p}function ph(t){const e=tu(t);if(!e.T)if("F"===e.limitType)e.T=zu(e.path,e.collectionGroup,fh(e),e.filters,e.limit,e.startAt,e.endAt);else{const t=[];for(const i of fh(e)){const e="desc"===i.dir?"asc":"desc";t.push(new sh(i.field,e))}const n=e.endAt?new rh(e.endAt.position,!e.endAt.before):null,r=e.startAt?new rh(e.startAt.position,!e.startAt.before):null;e.T=zu(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}return e.T}function mh(t,e){return Hu(ph(t),ph(e))&&t.limitType===e.limitType}function gh(t){return`${Ku(ph(t))}|lt:${t.limitType}`}function yh(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map((t=>{return`${(e=t).field.canonicalString()} ${e.op} ${xu(e.value)}`;var e})).join(", ")}]`),Eu(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map((t=>{return`${(e=t).field.canonicalString()} (${e.dir})`;var e})).join(", ")}]`),t.startAt&&(e+=", startAt: "+ih(t.startAt)),t.endAt&&(e+=", endAt: "+ih(t.endAt)),`Target(${e})`}(ph(t))}; limitType=${t.limitType})`}function vh(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):ku.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of t.explicitOrderBy)if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&(r=e,!((n=t).startAt&&!ah(n.startAt,fh(n),r)||n.endAt&&ah(n.endAt,fh(n),r)));var n,r}function wh(t){return(e,n)=>{let r=!1;for(const i of fh(t)){const t=bh(i,e,n);if(0!==t)return t;r=r||i.field.isKeyField()}return 0}}function bh(t,e,n){const r=t.field.isKeyField()?ku.comparator(e.key,n.key):function(t,e,n){const r=e.data.field(t),i=n.data.field(t);return null!==r&&null!==i?Au(r,i):Jc()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return Jc()}}
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
 */function Ih(t,e){if(t.I){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Su(e)?"-0":e}}function _h(t){return{integerValue:""+t}}function Th(t,e){return function(t){return"number"==typeof t&&Number.isInteger(t)&&!Su(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}(e)?_h(e):Ih(t,e)}
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
 */class Eh{constructor(){this._=void 0}}function Sh(t,e,n){return t instanceof Rh?function(t,e){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&(n.fields.__previous_value__=e),{mapValue:n}}(n,e):t instanceof Nh?Ah(t,e):t instanceof Dh?xh(t,e):function(t,e){const n=Ch(t,e),r=Lh(n)+Lh(t.A);return Lu(n)&&Lu(t.A)?_h(r):Ih(t.R,r)}(t,e)}function kh(t,e,n){return t instanceof Nh?Ah(t,e):t instanceof Dh?xh(t,e):n}function Ch(t,e){return t instanceof Oh?Lu(r=e)||(n=r)&&"doubleValue"in n?e:{integerValue:0}:null;var n,r}class Rh extends Eh{}class Nh extends Eh{constructor(t){super(),this.elements=t}}function Ah(t,e){const n=Ph(e);for(const r of t.elements)n.some((t=>Ru(t,r)))||n.push(r);return{arrayValue:{values:n}}}class Dh extends Eh{constructor(t){super(),this.elements=t}}function xh(t,e){let n=Ph(e);for(const r of t.elements)n=n.filter((t=>!Ru(t,r)));return{arrayValue:{values:n}}}class Oh extends Eh{constructor(t,e){super(),this.R=t,this.A=e}}function Lh(t){return wu(t.integerValue||t.doubleValue)}function Ph(t){return Pu(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
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
 */class Mh{constructor(t,e){this.field=t,this.transform=e}}class Uh{constructor(t,e){this.version=t,this.transformResults=e}}class Fh{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Fh}static exists(t){return new Fh(void 0,t)}static updateTime(t){return new Fh(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Vh(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class qh{}function Bh(t,e,n){var r;t instanceof Hh?function(t,e,n){const r=t.value.clone(),i=Qh(t.fieldTransforms,e,n.transformResults);r.setAll(i),e.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(t,e,n):t instanceof Gh?function(t,e,n){if(!Vh(t.precondition,e))return void e.convertToUnknownDocument(n.version);const r=Qh(t.fieldTransforms,e,n.transformResults),i=e.data;i.setAll(Wh(t)),i.setAll(r),e.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(t,e,n):(r=n,e.convertToNoDocument(r.version).setHasCommittedMutations())}function $h(t,e,n){var r;t instanceof Hh?function(t,e,n){if(!Vh(t.precondition,e))return;const r=t.value.clone(),i=Xh(t.fieldTransforms,n,e);r.setAll(i),e.convertToFoundDocument(Kh(e),r).setHasLocalMutations()}(t,e,n):t instanceof Gh?function(t,e,n){if(!Vh(t.precondition,e))return;const r=Xh(t.fieldTransforms,n,e),i=e.data;i.setAll(Wh(t)),i.setAll(r),e.convertToFoundDocument(Kh(e),i).setHasLocalMutations()}(t,e,n):(r=e,Vh(t.precondition,r)&&r.convertToNoDocument(au.min()))}function jh(t,e){let n=null;for(const r of t.fieldTransforms){const t=e.data.field(r.field),i=Ch(r.transform,t||null);null!=i&&(null==n&&(n=qu.empty()),n.set(r.field,i))}return n||null}function zh(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&(n=t.fieldTransforms,r=e.fieldTransforms,!!(void 0===n&&void 0===r||n&&r&&iu(n,r,((t,e)=>function(t,e){return t.field.isEqual(e.field)&&(n=t.transform,r=e.transform,n instanceof Nh&&r instanceof Nh||n instanceof Dh&&r instanceof Dh?iu(n.elements,r.elements,Ru):n instanceof Oh&&r instanceof Oh?Ru(n.A,r.A):n instanceof Rh&&r instanceof Rh);var n,r}(t,e))))&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask)));var n,r}function Kh(t){return t.isFoundDocument()?t.version:au.min()}class Hh extends qh{constructor(t,e,n,r=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=r,this.type=0}}class Gh extends qh{constructor(t,e,n,r,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}}function Wh(t){const e=new Map;return t.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}})),e}function Qh(t,e,n){const r=new Map;Zc(t.length===n.length);for(let i=0;i<n.length;i++){const s=t[i],o=s.transform,a=e.data.field(s.field);r.set(s.field,kh(o,a,n[i]))}return r}function Xh(t,e,n){const r=new Map;for(const i of t){const t=i.transform,s=n.data.field(i.field);r.set(i.field,Sh(t,s,e))}return r}class Yh extends qh{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}}class Jh extends qh{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}}
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
 */class Zh{constructor(t){this.count=t}}
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
 */var tl,el;function nl(t){if(void 0===t)return Qc("GRPC error has no .code"),zc.UNKNOWN;switch(t){case tl.OK:return zc.OK;case tl.CANCELLED:return zc.CANCELLED;case tl.UNKNOWN:return zc.UNKNOWN;case tl.DEADLINE_EXCEEDED:return zc.DEADLINE_EXCEEDED;case tl.RESOURCE_EXHAUSTED:return zc.RESOURCE_EXHAUSTED;case tl.INTERNAL:return zc.INTERNAL;case tl.UNAVAILABLE:return zc.UNAVAILABLE;case tl.UNAUTHENTICATED:return zc.UNAUTHENTICATED;case tl.INVALID_ARGUMENT:return zc.INVALID_ARGUMENT;case tl.NOT_FOUND:return zc.NOT_FOUND;case tl.ALREADY_EXISTS:return zc.ALREADY_EXISTS;case tl.PERMISSION_DENIED:return zc.PERMISSION_DENIED;case tl.FAILED_PRECONDITION:return zc.FAILED_PRECONDITION;case tl.ABORTED:return zc.ABORTED;case tl.OUT_OF_RANGE:return zc.OUT_OF_RANGE;case tl.UNIMPLEMENTED:return zc.UNIMPLEMENTED;case tl.DATA_LOSS:return zc.DATA_LOSS;default:return Jc()}}(el=tl||(tl={}))[el.OK=0]="OK",el[el.CANCELLED=1]="CANCELLED",el[el.UNKNOWN=2]="UNKNOWN",el[el.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",el[el.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",el[el.NOT_FOUND=5]="NOT_FOUND",el[el.ALREADY_EXISTS=6]="ALREADY_EXISTS",el[el.PERMISSION_DENIED=7]="PERMISSION_DENIED",el[el.UNAUTHENTICATED=16]="UNAUTHENTICATED",el[el.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",el[el.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",el[el.ABORTED=10]="ABORTED",el[el.OUT_OF_RANGE=11]="OUT_OF_RANGE",el[el.UNIMPLEMENTED=12]="UNIMPLEMENTED",el[el.INTERNAL=13]="INTERNAL",el[el.UNAVAILABLE=14]="UNAVAILABLE",el[el.DATA_LOSS=15]="DATA_LOSS";
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
class rl{constructor(t,e){this.comparator=t,this.root=e||sl.EMPTY}insert(t,e){return new rl(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,sl.BLACK,null,null))}remove(t){return new rl(this.comparator,this.root.remove(t,this.comparator).copy(null,null,sl.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(0===r)return e+n.left.size;r<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new il(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new il(this.root,t,this.comparator,!1)}getReverseIterator(){return new il(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new il(this.root,t,this.comparator,!0)}}class il{constructor(t,e,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,r&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(0===i){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class sl{constructor(t,e,n,r,i){this.key=t,this.value=e,this.color=null!=n?n:sl.RED,this.left=null!=r?r:sl.EMPTY,this.right=null!=i?i:sl.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,r,i){return new sl(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let r=this;const i=n(t,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(t,e,n),null):0===i?r.copy(null,e,null,null,null):r.copy(null,null,null,null,r.right.insert(t,e,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return sl.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,r=this;if(e(t,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(t,e),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===e(t,r.key)){if(r.right.isEmpty())return sl.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(t,e))}return r.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,sl.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,sl.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Jc();if(this.right.isRed())throw Jc();const t=this.left.check();if(t!==this.right.check())throw Jc();return t+(this.isRed()?0:1)}}sl.EMPTY=null,sl.RED=!0,sl.BLACK=!1,sl.EMPTY=new class{constructor(){this.size=0}get key(){throw Jc()}get value(){throw Jc()}get color(){throw Jc()}get left(){throw Jc()}get right(){throw Jc()}copy(t,e,n,r,i){return this}insert(t,e,n){return new sl(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
class ol{constructor(t){this.comparator=t,this.data=new rl(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,n)=>(t(e),!1)))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,t[1])>=0)return;e(r.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new al(this.data.getIterator())}getIteratorFrom(t){return new al(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((t=>{e=e.add(t)})),e}isEqual(t){if(!(t instanceof ol))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(0!==this.comparator(t,r))return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new ol(this.comparator);return e.data=t,e}}class al{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
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
 */const cl=new rl(ku.comparator);function ul(){return cl}const hl=new rl(ku.comparator);function ll(){return hl}const dl=new rl(ku.comparator);const fl=new ol(ku.comparator);function pl(...t){let e=fl;for(const n of t)e=e.add(n);return e}const ml=new ol(ru);function gl(){return ml}
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
 */class yl{constructor(t,e,n,r,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e){const n=new Map;return n.set(t,vl.createSynthesizedTargetChangeForCurrentChange(t,e)),new yl(au.min(),n,gl(),ul(),pl())}}class vl{constructor(t,e,n,r,i){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e){return new vl(gu.EMPTY_BYTE_STRING,e,pl(),pl(),pl())}}
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
 */class wl{constructor(t,e,n,r){this.P=t,this.removedTargetIds=e,this.key=n,this.v=r}}class bl{constructor(t,e){this.targetId=t,this.V=e}}class Il{constructor(t,e,n=gu.EMPTY_BYTE_STRING,r=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=r}}class _l{constructor(){this.S=0,this.D=Sl(),this.C=gu.EMPTY_BYTE_STRING,this.N=!1,this.k=!0}get current(){return this.N}get resumeToken(){return this.C}get $(){return 0!==this.S}get O(){return this.k}F(t){t.approximateByteSize()>0&&(this.k=!0,this.C=t)}M(){let t=pl(),e=pl(),n=pl();return this.D.forEach(((r,i)=>{switch(i){case 0:t=t.add(r);break;case 2:e=e.add(r);break;case 1:n=n.add(r);break;default:Jc()}})),new vl(this.C,this.N,t,e,n)}L(){this.k=!1,this.D=Sl()}B(t,e){this.k=!0,this.D=this.D.insert(t,e)}U(t){this.k=!0,this.D=this.D.remove(t)}q(){this.S+=1}K(){this.S-=1}j(){this.k=!0,this.N=!0}}class Tl{constructor(t){this.W=t,this.G=new Map,this.H=ul(),this.J=El(),this.Y=new ol(ru)}X(t){for(const e of t.P)t.v&&t.v.isFoundDocument()?this.Z(e,t.v):this.tt(e,t.key,t.v);for(const e of t.removedTargetIds)this.tt(e,t.key,t.v)}et(t){this.forEachTarget(t,(e=>{const n=this.nt(e);switch(t.state){case 0:this.st(e)&&n.F(t.resumeToken);break;case 1:n.K(),n.$||n.L(),n.F(t.resumeToken);break;case 2:n.K(),n.$||this.removeTarget(e);break;case 3:this.st(e)&&(n.j(),n.F(t.resumeToken));break;case 4:this.st(e)&&(this.it(e),n.F(t.resumeToken));break;default:Jc()}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.G.forEach(((t,n)=>{this.st(n)&&e(n)}))}rt(t){const e=t.targetId,n=t.V.count,r=this.ot(e);if(r){const t=r.target;if(Gu(t))if(0===n){const n=new ku(t.path);this.tt(e,n,$u.newNoDocument(n,au.min()))}else Zc(1===n);else this.ct(e)!==n&&(this.it(e),this.Y=this.Y.add(e))}}ut(t){const e=new Map;this.G.forEach(((n,r)=>{const i=this.ot(r);if(i){if(n.current&&Gu(i.target)){const e=new ku(i.target.path);null!==this.H.get(e)||this.at(r,e)||this.tt(r,e,$u.newNoDocument(e,t))}n.O&&(e.set(r,n.M()),n.L())}}));let n=pl();this.J.forEach(((t,e)=>{let r=!0;e.forEachWhile((t=>{const e=this.ot(t);return!e||2===e.purpose||(r=!1,!1)})),r&&(n=n.add(t))}));const r=new yl(t,e,this.Y,this.H,n);return this.H=ul(),this.J=El(),this.Y=new ol(ru),r}Z(t,e){if(!this.st(t))return;const n=this.at(t,e.key)?2:0;this.nt(t).B(e.key,n),this.H=this.H.insert(e.key,e),this.J=this.J.insert(e.key,this.ht(e.key).add(t))}tt(t,e,n){if(!this.st(t))return;const r=this.nt(t);this.at(t,e)?r.B(e,1):r.U(e),this.J=this.J.insert(e,this.ht(e).delete(t)),n&&(this.H=this.H.insert(e,n))}removeTarget(t){this.G.delete(t)}ct(t){const e=this.nt(t).M();return this.W.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}q(t){this.nt(t).q()}nt(t){let e=this.G.get(t);return e||(e=new _l,this.G.set(t,e)),e}ht(t){let e=this.J.get(t);return e||(e=new ol(ru),this.J=this.J.insert(t,e)),e}st(t){const e=null!==this.ot(t);return e||Wc("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.G.get(t);return e&&e.$?null:this.W.lt(t)}it(t){this.G.set(t,new _l),this.W.getRemoteKeysForTarget(t).forEach((e=>{this.tt(t,e,null)}))}at(t,e){return this.W.getRemoteKeysForTarget(t).has(e)}}function El(){return new rl(ku.comparator)}function Sl(){return new rl(ku.comparator)}
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
 */const kl={asc:"ASCENDING",desc:"DESCENDING"},Cl={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};class Rl{constructor(t,e){this.databaseId=t,this.I=e}}function Nl(t,e){return t.I?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Al(t,e){return t.I?e.toBase64():e.toUint8Array()}function Dl(t,e){return Nl(t,e.toTimestamp())}function xl(t){return Zc(!!t),au.fromTimestamp(function(t){const e=vu(t);return new ou(e.seconds,e.nanos)}(t))}function Ol(t,e){return(n=t,new du(["projects",n.projectId,"databases",n.database])).child("documents").child(e).canonicalString();var n}function Ll(t){const e=du.fromString(t);return Zc(rd(e)),e}function Pl(t,e){return Ol(t.databaseId,e.path)}function Ml(t,e){const n=Ll(e);if(n.get(1)!==t.databaseId.projectId)throw new Kc(zc.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new Kc(zc.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new ku(ql(n))}function Ul(t,e){return Ol(t.databaseId,e)}function Fl(t){const e=Ll(t);return 4===e.length?du.emptyPath():ql(e)}function Vl(t){return new du(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function ql(t){return Zc(t.length>4&&"documents"===t.get(4)),t.popFirst(5)}function Bl(t,e,n){return{name:Pl(t,e),fields:n.value.mapValue.fields}}function $l(t,e){let n;if(e instanceof Hh)n={update:Bl(t,e.key,e.value)};else if(e instanceof Yh)n={delete:Pl(t,e.key)};else if(e instanceof Gh)n={update:Bl(t,e.key,e.data),updateMask:nd(e.fieldMask)};else{if(!(e instanceof Jh))return Jc();n={verify:Pl(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((t=>function(t,e){const n=e.transform;if(n instanceof Rh)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Nh)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Dh)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Oh)return{fieldPath:e.field.canonicalString(),increment:n.A};throw Jc()}(0,t)))),e.precondition.isNone||(n.currentDocument=(r=t,void 0!==(i=e.precondition).updateTime?{updateTime:Dl(r,i.updateTime)}:void 0!==i.exists?{exists:i.exists}:Jc())),n;var r,i}function jl(t,e){const n=e.currentDocument?void 0!==(i=e.currentDocument).updateTime?Fh.updateTime(xl(i.updateTime)):void 0!==i.exists?Fh.exists(i.exists):Fh.none():Fh.none(),r=e.updateTransforms?e.updateTransforms.map((e=>function(t,e){let n=null;if("setToServerValue"in e)Zc("REQUEST_TIME"===e.setToServerValue),n=new Rh;else if("appendMissingElements"in e){const t=e.appendMissingElements.values||[];n=new Nh(t)}else if("removeAllFromArray"in e){const t=e.removeAllFromArray.values||[];n=new Dh(t)}else"increment"in e?n=new Oh(t,e.increment):Jc();const r=pu.fromServerFormat(e.fieldPath);return new Mh(r,n)}(t,e))):[];var i;if(e.update){e.update.name;const i=Ml(t,e.update.name),s=new qu({mapValue:{fields:e.update.fields}});if(e.updateMask){const t=function(t){const e=t.fieldPaths||[];return new mu(e.map((t=>pu.fromServerFormat(t))))}(e.updateMask);return new Gh(i,s,t,n,r)}return new Hh(i,s,n,r)}if(e.delete){const r=Ml(t,e.delete);return new Yh(r,n)}if(e.verify){const r=Ml(t,e.verify);return new Jh(r,n)}return Jc()}function zl(t,e){return{documents:[Ul(t,e.path)]}}function Kl(t,e){const n={structuredQuery:{}},r=e.path;null!==e.collectionGroup?(n.parent=Ul(t,r),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=Ul(t,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const i=function(t){if(0===t.length)return;const e=t.map((t=>function(t){if("=="===t.op){if(Uu(t.value))return{unaryFilter:{field:Jl(t.field),op:"IS_NAN"}};if(Mu(t.value))return{unaryFilter:{field:Jl(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(Uu(t.value))return{unaryFilter:{field:Jl(t.field),op:"IS_NOT_NAN"}};if(Mu(t.value))return{unaryFilter:{field:Jl(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Jl(t.field),op:Yl(t.op),value:t.value}}}(t)));return 1===e.length?e[0]:{compositeFilter:{op:"AND",filters:e}}}(e.filters);i&&(n.structuredQuery.where=i);const s=function(t){if(0!==t.length)return t.map((t=>{return{field:Jl((e=t).field),direction:Xl(e.dir)};var e}))}(e.orderBy);s&&(n.structuredQuery.orderBy=s);const o=(a=t,c=e.limit,a.I||Eu(c)?c:{value:c});var a,c;return null!==o&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt=Wl(e.startAt)),e.endAt&&(n.structuredQuery.endAt=Wl(e.endAt)),n}function Hl(t){let e=Fl(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){Zc(1===r);const t=n.from[0];t.allDescendants?i=t.collectionId:e=e.child(t.collectionId)}let s=[];n.where&&(s=Gl(n.where));let o=[];n.orderBy&&(o=n.orderBy.map((t=>{return new sh(Zl((e=t).field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction));var e})));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,Eu(e)?null:e}(n.limit));let c=null;n.startAt&&(c=Ql(n.startAt));let u=null;return n.endAt&&(u=Ql(n.endAt)),function(t,e,n,r,i,s,o,a){return new uh(t,e,n,r,i,s,o,a)}(e,i,o,s,a,"F",c,u)}function Gl(t){return t?void 0!==t.unaryFilter?[ed(t)]:void 0!==t.fieldFilter?[td(t)]:void 0!==t.compositeFilter?t.compositeFilter.filters.map((t=>Gl(t))).reduce(((t,e)=>t.concat(e))):Jc():[]}function Wl(t){return{before:t.before,values:t.position}}function Ql(t){const e=!!t.before,n=t.values||[];return new rh(n,e)}function Xl(t){return kl[t]}function Yl(t){return Cl[t]}function Jl(t){return{fieldPath:t.canonicalString()}}function Zl(t){return pu.fromServerFormat(t.fieldPath)}function td(t){return Wu.create(Zl(t.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":default:return Jc()}}(t.fieldFilter.op),t.fieldFilter.value)}function ed(t){switch(t.unaryFilter.op){case"IS_NAN":const e=Zl(t.unaryFilter.field);return Wu.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=Zl(t.unaryFilter.field);return Wu.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Zl(t.unaryFilter.field);return Wu.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Zl(t.unaryFilter.field);return Wu.create(i,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":default:return Jc()}}function nd(t){const e=[];return t.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function rd(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
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
 */function id(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=od(e)),e=sd(t.get(n),e);return od(e)}function sd(t,e){let n=e;const r=t.length;for(let i=0;i<r;i++){const e=t.charAt(i);switch(e){case"\0":n+="";break;case"":n+="";break;default:n+=e}}return n}function od(t){return t+""}function ad(t){const e=t.length;if(Zc(e>=2),2===e)return Zc(""===t.charAt(0)&&""===t.charAt(1)),du.emptyPath();const n=e-2,r=[];let i="";for(let s=0;s<e;){const e=t.indexOf("",s);switch((e<0||e>n)&&Jc(),t.charAt(e+1)){case"":const n=t.substring(s,e);let o;0===i.length?o=n:(i+=n,o=i,i=""),r.push(o);break;case"":i+=t.substring(s,e),i+="\0";break;case"":i+=t.substring(s,e+1);break;default:Jc()}s=e+2}return new du(r)}
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
 */class cd{constructor(t,e){this.seconds=t,this.nanoseconds=e}}class ud{constructor(t,e,n){this.ownerId=t,this.allowTabSynchronization=e,this.leaseTimestampMs=n}}ud.store="owner",ud.key="owner";class hd{constructor(t,e,n){this.userId=t,this.lastAcknowledgedBatchId=e,this.lastStreamToken=n}}hd.store="mutationQueues",hd.keyPath="userId";class ld{constructor(t,e,n,r,i){this.userId=t,this.batchId=e,this.localWriteTimeMs=n,this.baseMutations=r,this.mutations=i}}ld.store="mutations",ld.keyPath="batchId",ld.userMutationsIndex="userMutationsIndex",ld.userMutationsKeyPath=["userId","batchId"];class dd{constructor(){}static prefixForUser(t){return[t]}static prefixForPath(t,e){return[t,id(e)]}static key(t,e,n){return[t,id(e),n]}}dd.store="documentMutations",dd.PLACEHOLDER=new dd;class fd{constructor(t,e){this.path=t,this.readTime=e}}class pd{constructor(t,e){this.path=t,this.version=e}}class md{constructor(t,e,n,r,i,s){this.unknownDocument=t,this.noDocument=e,this.document=n,this.hasCommittedMutations=r,this.readTime=i,this.parentPath=s}}md.store="remoteDocuments",md.readTimeIndex="readTimeIndex",md.readTimeIndexPath="readTime",md.collectionReadTimeIndex="collectionReadTimeIndex",md.collectionReadTimeIndexPath=["parentPath","readTime"];class gd{constructor(t){this.byteSize=t}}gd.store="remoteDocumentGlobal",gd.key="remoteDocumentGlobalKey";class yd{constructor(t,e,n,r,i,s,o){this.targetId=t,this.canonicalId=e,this.readTime=n,this.resumeToken=r,this.lastListenSequenceNumber=i,this.lastLimboFreeSnapshotVersion=s,this.query=o}}yd.store="targets",yd.keyPath="targetId",yd.queryTargetsIndexName="queryTargetsIndex",yd.queryTargetsKeyPath=["canonicalId","targetId"];class vd{constructor(t,e,n){this.targetId=t,this.path=e,this.sequenceNumber=n}}vd.store="targetDocuments",vd.keyPath=["targetId","path"],vd.documentTargetsIndex="documentTargetsIndex",vd.documentTargetsKeyPath=["path","targetId"];class wd{constructor(t,e,n,r){this.highestTargetId=t,this.highestListenSequenceNumber=e,this.lastRemoteSnapshotVersion=n,this.targetCount=r}}wd.key="targetGlobalKey",wd.store="targetGlobal";class bd{constructor(t,e){this.collectionId=t,this.parent=e}}bd.store="collectionParents",bd.keyPath=["collectionId","parent"];class Id{constructor(t,e,n,r){this.clientId=t,this.updateTimeMs=e,this.networkEnabled=n,this.inForeground=r}}Id.store="clientMetadata",Id.keyPath="clientId";class _d{constructor(t,e,n){this.bundleId=t,this.createTime=e,this.version=n}}_d.store="bundles",_d.keyPath="bundleId";class Td{constructor(t,e,n){this.name=t,this.readTime=e,this.bundledQuery=n}}Td.store="namedQueries",Td.keyPath="name";const Ed=[hd.store,ld.store,dd.store,md.store,yd.store,ud.store,wd.store,vd.store,Id.store,gd.store,bd.store,_d.store,Td.store],Sd="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class kd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}
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
 */class Cd{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}
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
 */class Rd{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&Jc(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new Rd(((n,r)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,r)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,r)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof Rd?e:Rd.resolve(e)}catch(e){return Rd.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):Rd.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):Rd.reject(e)}static resolve(t){return new Rd(((e,n)=>{e(t)}))}static reject(t){return new Rd(((e,n)=>{n(t)}))}static waitFor(t){return new Rd(((e,n)=>{let r=0,i=0,s=!1;t.forEach((t=>{++r,t.next((()=>{++i,s&&i===r&&e()}),(t=>n(t)))})),s=!0,i===r&&e()}))}static or(t){let e=Rd.resolve(!1);for(const n of t)e=e.next((t=>t?Rd.resolve(t):n()));return e}static forEach(t,e){const n=[];return t.forEach(((t,r)=>{n.push(e.call(this,t,r))})),this.waitFor(n)}}
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
 */class Nd{constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.ft=new Cd,this.transaction.oncomplete=()=>{this.ft.resolve()},this.transaction.onabort=()=>{e.error?this.ft.reject(new xd(t,e.error)):this.ft.resolve()},this.transaction.onerror=e=>{const n=Ud(e.target.error);this.ft.reject(new xd(t,n))}}static open(t,e,n,r){try{return new Nd(e,t.transaction(r,n))}catch(i){throw new xd(e,i)}}get dt(){return this.ft.promise}abort(t){t&&this.ft.reject(t),this.aborted||(Wc("SimpleDb","Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}store(t){const e=this.transaction.objectStore(t);return new Ld(e)}}class Ad{constructor(t,e,n){this.name=t,this.version=e,this.wt=n,12.2===Ad._t(ne())&&Qc("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(t){return Wc("SimpleDb","Removing database:",t),Pd(window.indexedDB.deleteDatabase(t)).toPromise()}static gt(){if("undefined"==typeof indexedDB)return!1;if(Ad.yt())return!0;const t=ne(),e=Ad._t(t),n=0<e&&e<10,r=Ad.Et(t),i=0<r&&r<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||i)}static yt(){var t;return"undefined"!=typeof process&&"YES"===(null===(t=process.env)||void 0===t?void 0:t.Tt)}static It(t,e){return t.store(e)}static _t(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}static Et(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}async At(t){return this.db||(Wc("SimpleDb","Opening database:",this.name),this.db=await new Promise(((e,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=t=>{const n=t.target.result;e(n)},r.onblocked=()=>{n(new xd(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=e=>{const r=e.target.error;"VersionError"===r.name?n(new Kc(zc.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):n(new xd(t,r))},r.onupgradeneeded=t=>{Wc("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',t.oldVersion);const e=t.target.result;this.wt.Rt(e,r.transaction,t.oldVersion,this.version).next((()=>{Wc("SimpleDb","Database upgrade to version "+this.version+" complete")}))}}))),this.Pt&&(this.db.onversionchange=t=>this.Pt(t)),this.db}bt(t){this.Pt=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,r){const i="readonly"===e;let s=0;for(;;){++s;try{this.db=await this.At(t);const e=Nd.open(this.db,t,i?"readonly":"readwrite",n),s=r(e).catch((t=>(e.abort(t),Rd.reject(t)))).toPromise();return s.catch((()=>{})),await e.dt,s}catch(o){const t="FirebaseError"!==o.name&&s<3;if(Wc("SimpleDb","Transaction failed with error:",o.message,"Retrying:",t),this.close(),!t)return Promise.reject(o)}}}close(){this.db&&this.db.close(),this.db=void 0}}class Dd{constructor(t){this.vt=t,this.Vt=!1,this.St=null}get isDone(){return this.Vt}get Dt(){return this.St}set cursor(t){this.vt=t}done(){this.Vt=!0}Ct(t){this.St=t}delete(){return Pd(this.vt.delete())}}class xd extends Kc{constructor(t,e){super(zc.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function Od(t){return"IndexedDbTransactionError"===t.name}class Ld{constructor(t){this.store=t}put(t,e){let n;return void 0!==e?(Wc("SimpleDb","PUT",this.store.name,t,e),n=this.store.put(e,t)):(Wc("SimpleDb","PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),Pd(n)}add(t){return Wc("SimpleDb","ADD",this.store.name,t,t),Pd(this.store.add(t))}get(t){return Pd(this.store.get(t)).next((e=>(void 0===e&&(e=null),Wc("SimpleDb","GET",this.store.name,t,e),e)))}delete(t){return Wc("SimpleDb","DELETE",this.store.name,t),Pd(this.store.delete(t))}count(){return Wc("SimpleDb","COUNT",this.store.name),Pd(this.store.count())}Nt(t,e){const n=this.cursor(this.options(t,e)),r=[];return this.xt(n,((t,e)=>{r.push(e)})).next((()=>r))}kt(t,e){Wc("SimpleDb","DELETE ALL",this.store.name);const n=this.options(t,e);n.$t=!1;const r=this.cursor(n);return this.xt(r,((t,e,n)=>n.delete()))}Ot(t,e){let n;e?n=t:(n={},e=t);const r=this.cursor(n);return this.xt(r,e)}Ft(t){const e=this.cursor({});return new Rd(((n,r)=>{e.onerror=t=>{const e=Ud(t.target.error);r(e)},e.onsuccess=e=>{const r=e.target.result;r?t(r.primaryKey,r.value).next((t=>{t?r.continue():n()})):n()}}))}xt(t,e){const n=[];return new Rd(((r,i)=>{t.onerror=t=>{i(t.target.error)},t.onsuccess=t=>{const i=t.target.result;if(!i)return void r();const s=new Dd(i),o=e(i.primaryKey,i.value,s);if(o instanceof Rd){const t=o.catch((t=>(s.done(),Rd.reject(t))));n.push(t)}s.isDone?r():null===s.Dt?i.continue():i.continue(s.Dt)}})).next((()=>Rd.waitFor(n)))}options(t,e){let n;return void 0!==t&&("string"==typeof t?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.$t?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function Pd(t){return new Rd(((e,n)=>{t.onsuccess=t=>{const n=t.target.result;e(n)},t.onerror=t=>{const e=Ud(t.target.error);n(e)}}))}let Md=!1;function Ud(t){const e=Ad._t(ne());if(e>=12.2&&e<13){const e="An internal error was encountered in the Indexed Database server";if(t.message.indexOf(e)>=0){const t=new Kc("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Md||(Md=!0,setTimeout((()=>{throw t}),0)),t}}return t}
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
 */class Fd extends kd{constructor(t,e){super(),this.Mt=t,this.currentSequenceNumber=e}}function Vd(t,e){const n=tu(t);return Ad.It(n.Mt,e)}
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
 */class qd{constructor(t,e,n,r){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let r=0;r<this.mutations.length;r++){const e=this.mutations[r];e.key.isEqual(t.key)&&Bh(e,t,n[r])}}applyToLocalView(t){for(const e of this.baseMutations)e.key.isEqual(t.key)&&$h(e,t,this.localWriteTime);for(const e of this.mutations)e.key.isEqual(t.key)&&$h(e,t,this.localWriteTime)}applyToLocalDocumentSet(t){this.mutations.forEach((e=>{const n=t.get(e.key),r=n;this.applyToLocalView(r),n.isValidDocument()||r.convertToNoDocument(au.min())}))}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),pl())}isEqual(t){return this.batchId===t.batchId&&iu(this.mutations,t.mutations,((t,e)=>zh(t,e)))&&iu(this.baseMutations,t.baseMutations,((t,e)=>zh(t,e)))}}class Bd{constructor(t,e,n,r){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=r}static from(t,e,n){Zc(t.mutations.length===n.length);let r=dl;const i=t.mutations;for(let s=0;s<i.length;s++)r=r.insert(i[s].key,n[s].version);return new Bd(t,e,n,r)}}
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
 */class $d{constructor(t,e,n,r,i=au.min(),s=au.min(),o=gu.EMPTY_BYTE_STRING){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=o}withSequenceNumber(t){return new $d(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(t,e){return new $d(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t)}withLastLimboFreeSnapshotVersion(t){return new $d(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken)}}
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
 */class jd{constructor(t){this.Lt=t}}function zd(t,e){if(e.document)return function(t,e,n){const r=Ml(t,e.name),i=xl(e.updateTime),s=new qu({mapValue:{fields:e.fields}}),o=$u.newFoundDocument(r,i,s);return n&&o.setHasCommittedMutations(),n?o.setHasCommittedMutations():o}(t.Lt,e.document,!!e.hasCommittedMutations);if(e.noDocument){const t=ku.fromSegments(e.noDocument.path),n=Wd(e.noDocument.readTime),r=$u.newNoDocument(t,n);return e.hasCommittedMutations?r.setHasCommittedMutations():r}if(e.unknownDocument){const t=ku.fromSegments(e.unknownDocument.path),n=Wd(e.unknownDocument.version);return $u.newUnknownDocument(t,n)}return Jc()}function Kd(t,e,n){const r=Hd(n),i=e.key.path.popLast().toArray();if(e.isFoundDocument()){const n={name:Pl(s=t.Lt,(o=e).key),fields:o.data.value.mapValue.fields,updateTime:Nl(s,o.version.toTimestamp())},a=e.hasCommittedMutations;return new md(null,null,n,a,r,i)}var s,o;if(e.isNoDocument()){const t=e.key.path.toArray(),n=Gd(e.version),s=e.hasCommittedMutations;return new md(null,new fd(t,n),null,s,r,i)}if(e.isUnknownDocument()){const t=e.key.path.toArray(),n=Gd(e.version);return new md(new pd(t,n),null,null,!0,r,i)}return Jc()}function Hd(t){const e=t.toTimestamp();return[e.seconds,e.nanoseconds]}function Gd(t){const e=t.toTimestamp();return new cd(e.seconds,e.nanoseconds)}function Wd(t){const e=new ou(t.seconds,t.nanoseconds);return au.fromTimestamp(e)}function Qd(t,e){const n=(e.baseMutations||[]).map((e=>jl(t.Lt,e)));for(let s=0;s<e.mutations.length-1;++s){const t=e.mutations[s];if(s+1<e.mutations.length&&void 0!==e.mutations[s+1].transform){const n=e.mutations[s+1];t.updateTransforms=n.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map((e=>jl(t.Lt,e))),i=ou.fromMillis(e.localWriteTimeMs);return new qd(e.batchId,i,n,r)}function Xd(t){const e=Wd(t.readTime),n=void 0!==t.lastLimboFreeSnapshotVersion?Wd(t.lastLimboFreeSnapshotVersion):au.min();let r;var i;return void 0!==t.query.documents?(Zc(1===(i=t.query).documents.length),r=ph(hh(Fl(i.documents[0])))):r=ph(Hl(t.query)),new $d(r,t.targetId,0,t.lastListenSequenceNumber,e,n,gu.fromBase64String(t.resumeToken))}function Yd(t,e){const n=Gd(e.snapshotVersion),r=Gd(e.lastLimboFreeSnapshotVersion);let i;i=Gu(e.target)?zl(t.Lt,e.target):Kl(t.Lt,e.target);const s=e.resumeToken.toBase64();return new yd(e.targetId,Ku(e.target),n,s,e.sequenceNumber,r,i)}function Jd(t){const e=Hl({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?function(t,e,n){return new uh(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}(e,e.limit,"L"):e}
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
 */class Zd{getBundleMetadata(t,e){return tf(t).get(e).next((t=>{if(t)return{id:(e=t).bundleId,createTime:Wd(e.createTime),version:e.version};var e}))}saveBundleMetadata(t,e){return tf(t).put({bundleId:(n=e).id,createTime:Gd(xl(n.createTime)),version:n.version});var n}getNamedQuery(t,e){return ef(t).get(e).next((t=>{if(t)return{name:(e=t).name,query:Jd(e.bundledQuery),readTime:Wd(e.readTime)};var e}))}saveNamedQuery(t,e){return ef(t).put({name:(n=e).name,readTime:Gd(xl(n.readTime)),bundledQuery:n.bundledQuery});var n}}function tf(t){return Vd(t,_d.store)}function ef(t){return Vd(t,Td.store)}
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
 */class nf{constructor(){this.Bt=new rf}addToCollectionParentIndex(t,e){return this.Bt.add(e),Rd.resolve()}getCollectionParents(t,e){return Rd.resolve(this.Bt.getEntries(e))}}class rf{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e]||new ol(du.comparator),i=!r.has(n);return this.index[e]=r.add(n),i}has(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e];return r&&r.has(n)}getEntries(t){return(this.index[t]||new ol(du.comparator)).toArray()}}
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
 */class sf{constructor(){this.Ut=new rf}addToCollectionParentIndex(t,e){if(!this.Ut.has(e)){const n=e.lastSegment(),r=e.popLast();t.addOnCommittedListener((()=>{this.Ut.add(e)}));const i={collectionId:n,parent:id(r)};return of(t).put(i)}return Rd.resolve()}getCollectionParents(t,e){const n=[],r=IDBKeyRange.bound([e,""],[su(e),""],!1,!0);return of(t).Nt(r).next((t=>{for(const r of t){if(r.collectionId!==e)break;n.push(ad(r.parent))}return n}))}}function of(t){return Vd(t,bd.store)}
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
 */const af={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class cf{constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}static withCacheSize(t){return new cf(t,cf.DEFAULT_COLLECTION_PERCENTILE,cf.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}
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
 */function uf(t,e,n){const r=t.store(ld.store),i=t.store(dd.store),s=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.Ot({range:o},((t,e,n)=>(a++,n.delete())));s.push(c.next((()=>{Zc(1===a)})));const u=[];for(const h of n.mutations){const t=dd.key(e,h.key.path,n.batchId);s.push(i.delete(t)),u.push(h.key)}return Rd.waitFor(s).next((()=>u))}function hf(t){if(!t)return 0;let e;if(t.document)e=t.document;else if(t.unknownDocument)e=t.unknownDocument;else{if(!t.noDocument)throw Jc();e=t.noDocument}return JSON.stringify(e).length}
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
 */cf.DEFAULT_COLLECTION_PERCENTILE=10,cf.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,cf.DEFAULT=new cf(41943040,cf.DEFAULT_COLLECTION_PERCENTILE,cf.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),cf.DISABLED=new cf(-1,0,0);class lf{constructor(t,e,n,r){this.userId=t,this.R=e,this.qt=n,this.referenceDelegate=r,this.Kt={}}static Qt(t,e,n,r){Zc(""!==t.uid);const i=t.isAuthenticated()?t.uid:"";return new lf(i,e,n,r)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return ff(t).Ot({index:ld.userMutationsIndex,range:n},((t,n,r)=>{e=!1,r.done()})).next((()=>e))}addMutationBatch(t,e,n,r){const i=pf(t),s=ff(t);return s.add({}).next((o=>{Zc("number"==typeof o);const a=new qd(o,e,n,r),c=function(t,e,n){const r=n.baseMutations.map((e=>$l(t.Lt,e))),i=n.mutations.map((e=>$l(t.Lt,e)));return new ld(e,n.batchId,n.localWriteTime.toMillis(),r,i)}(this.R,this.userId,a),u=[];let h=new ol(((t,e)=>ru(t.canonicalString(),e.canonicalString())));for(const t of r){const e=dd.key(this.userId,t.key.path,o);h=h.add(t.key.path.popLast()),u.push(s.put(c)),u.push(i.put(e,dd.PLACEHOLDER))}return h.forEach((e=>{u.push(this.qt.addToCollectionParentIndex(t,e))})),t.addOnCommittedListener((()=>{this.Kt[o]=a.keys()})),Rd.waitFor(u).next((()=>a))}))}lookupMutationBatch(t,e){return ff(t).get(e).next((t=>t?(Zc(t.userId===this.userId),Qd(this.R,t)):null))}jt(t,e){return this.Kt[e]?Rd.resolve(this.Kt[e]):this.lookupMutationBatch(t,e).next((t=>{if(t){const n=t.keys();return this.Kt[e]=n,n}return null}))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return ff(t).Ot({index:ld.userMutationsIndex,range:r},((t,e,r)=>{e.userId===this.userId&&(Zc(e.batchId>=n),i=Qd(this.R,e)),r.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return ff(t).Ot({index:ld.userMutationsIndex,range:e,reverse:!0},((t,e,r)=>{n=e.batchId,r.done()})).next((()=>n))}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return ff(t).Nt(ld.userMutationsIndex,e).next((t=>t.map((t=>Qd(this.R,t)))))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=dd.prefixForPath(this.userId,e.path),r=IDBKeyRange.lowerBound(n),i=[];return pf(t).Ot({range:r},((n,r,s)=>{const[o,a,c]=n,u=ad(a);if(o===this.userId&&e.path.isEqual(u))return ff(t).get(c).next((t=>{if(!t)throw Jc();Zc(t.userId===this.userId),i.push(Qd(this.R,t))}));s.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new ol(ru);const r=[];return e.forEach((e=>{const i=dd.prefixForPath(this.userId,e.path),s=IDBKeyRange.lowerBound(i),o=pf(t).Ot({range:s},((t,r,i)=>{const[s,o,a]=t,c=ad(o);s===this.userId&&e.path.isEqual(c)?n=n.add(a):i.done()}));r.push(o)})),Rd.waitFor(r).next((()=>this.Wt(t,n)))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1,i=dd.prefixForPath(this.userId,n),s=IDBKeyRange.lowerBound(i);let o=new ol(ru);return pf(t).Ot({range:s},((t,e,i)=>{const[s,a,c]=t,u=ad(a);s===this.userId&&n.isPrefixOf(u)?u.length===r&&(o=o.add(c)):i.done()})).next((()=>this.Wt(t,o)))}Wt(t,e){const n=[],r=[];return e.forEach((e=>{r.push(ff(t).get(e).next((t=>{if(null===t)throw Jc();Zc(t.userId===this.userId),n.push(Qd(this.R,t))})))})),Rd.waitFor(r).next((()=>n))}removeMutationBatch(t,e){return uf(t.Mt,this.userId,e).next((n=>(t.addOnCommittedListener((()=>{this.Gt(e.batchId)})),Rd.forEach(n,(e=>this.referenceDelegate.markPotentiallyOrphaned(t,e))))))}Gt(t){delete this.Kt[t]}performConsistencyCheck(t){return this.checkEmpty(t).next((e=>{if(!e)return Rd.resolve();const n=IDBKeyRange.lowerBound(dd.prefixForUser(this.userId)),r=[];return pf(t).Ot({range:n},((t,e,n)=>{if(t[0]===this.userId){const e=ad(t[1]);r.push(e)}else n.done()})).next((()=>{Zc(0===r.length)}))}))}containsKey(t,e){return df(t,this.userId,e)}zt(t){return mf(t).get(this.userId).next((t=>t||new hd(this.userId,-1,"")))}}function df(t,e,n){const r=dd.prefixForPath(e,n.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return pf(t).Ot({range:s,$t:!0},((t,n,r)=>{const[s,a,c]=t;s===e&&a===i&&(o=!0),r.done()})).next((()=>o))}function ff(t){return Vd(t,ld.store)}function pf(t){return Vd(t,dd.store)}function mf(t){return Vd(t,hd.store)}
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
 */class gf{constructor(t){this.Ht=t}next(){return this.Ht+=2,this.Ht}static Jt(){return new gf(0)}static Yt(){return new gf(-1)}}
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
 */class yf{constructor(t,e){this.referenceDelegate=t,this.R=e}allocateTargetId(t){return this.Xt(t).next((e=>{const n=new gf(e.highestTargetId);return e.highestTargetId=n.next(),this.Zt(t,e).next((()=>e.highestTargetId))}))}getLastRemoteSnapshotVersion(t){return this.Xt(t).next((t=>au.fromTimestamp(new ou(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(t){return this.Xt(t).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(t,e,n){return this.Xt(t).next((r=>(r.highestListenSequenceNumber=e,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),e>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=e),this.Zt(t,r))))}addTargetData(t,e){return this.te(t,e).next((()=>this.Xt(t).next((n=>(n.targetCount+=1,this.ee(e,n),this.Zt(t,n))))))}updateTargetData(t,e){return this.te(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next((()=>vf(t).delete(e.targetId))).next((()=>this.Xt(t))).next((e=>(Zc(e.targetCount>0),e.targetCount-=1,this.Zt(t,e))))}removeTargets(t,e,n){let r=0;const i=[];return vf(t).Ot(((s,o)=>{const a=Xd(o);a.sequenceNumber<=e&&null===n.get(a.targetId)&&(r++,i.push(this.removeTargetData(t,a)))})).next((()=>Rd.waitFor(i))).next((()=>r))}forEachTarget(t,e){return vf(t).Ot(((t,n)=>{const r=Xd(n);e(r)}))}Xt(t){return wf(t).get(wd.key).next((t=>(Zc(null!==t),t)))}Zt(t,e){return wf(t).put(wd.key,e)}te(t,e){return vf(t).put(Yd(this.R,e))}ee(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.Xt(t).next((t=>t.targetCount))}getTargetData(t,e){const n=Ku(e),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return vf(t).Ot({range:r,index:yd.queryTargetsIndexName},((t,n,r)=>{const s=Xd(n);Hu(e,s.target)&&(i=s,r.done())})).next((()=>i))}addMatchingKeys(t,e,n){const r=[],i=bf(t);return e.forEach((e=>{const s=id(e.path);r.push(i.put(new vd(n,s))),r.push(this.referenceDelegate.addReference(t,n,e))})),Rd.waitFor(r)}removeMatchingKeys(t,e,n){const r=bf(t);return Rd.forEach(e,(e=>{const i=id(e.path);return Rd.waitFor([r.delete([n,i]),this.referenceDelegate.removeReference(t,n,e)])}))}removeMatchingKeysForTargetId(t,e){const n=bf(t),r=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),r=bf(t);let i=pl();return r.Ot({range:n,$t:!0},((t,e,n)=>{const r=ad(t[1]),s=new ku(r);i=i.add(s)})).next((()=>i))}containsKey(t,e){const n=id(e.path),r=IDBKeyRange.bound([n],[su(n)],!1,!0);let i=0;return bf(t).Ot({index:vd.documentTargetsIndex,$t:!0,range:r},(([t,e],n,r)=>{0!==t&&(i++,r.done())})).next((()=>i>0))}lt(t,e){return vf(t).get(e).next((t=>t?Xd(t):null))}}function vf(t){return Vd(t,yd.store)}function wf(t){return Vd(t,wd.store)}function bf(t){return Vd(t,vd.store)}
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
 */async function If(t){if(t.code!==zc.FAILED_PRECONDITION||t.message!==Sd)throw t;Wc("LocalStore","Unexpectedly lost primary lease")}
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
 */function _f([t,e],[n,r]){const i=ru(t,n);return 0===i?ru(e,r):i}class Tf{constructor(t){this.ne=t,this.buffer=new ol(_f),this.se=0}ie(){return++this.se}re(t){const e=[t,this.ie()];if(this.buffer.size<this.ne)this.buffer=this.buffer.add(e);else{const t=this.buffer.last();_f(e,t)<0&&(this.buffer=this.buffer.delete(t).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Ef{constructor(t,e){this.garbageCollector=t,this.asyncQueue=e,this.oe=!1,this.ce=null}start(t){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.ue(t)}stop(){this.ce&&(this.ce.cancel(),this.ce=null)}get started(){return null!==this.ce}ue(t){const e=this.oe?3e5:6e4;Wc("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.ce=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.ce=null,this.oe=!0;try{await t.collectGarbage(this.garbageCollector)}catch(e){Od(e)?Wc("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",e):await If(e)}await this.ue(t)}))}}class Sf{constructor(t,e){this.ae=t,this.params=e}calculateTargetCount(t,e){return this.ae.he(t).next((t=>Math.floor(e/100*t)))}nthSequenceNumber(t,e){if(0===e)return Rd.resolve(jc.o);const n=new Tf(e);return this.ae.forEachTarget(t,(t=>n.re(t.sequenceNumber))).next((()=>this.ae.le(t,(t=>n.re(t))))).next((()=>n.maxValue))}removeTargets(t,e,n){return this.ae.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.ae.removeOrphanedDocuments(t,e)}collect(t,e){return-1===this.params.cacheSizeCollectionThreshold?(Wc("LruGarbageCollector","Garbage collection skipped; disabled"),Rd.resolve(af)):this.getCacheSize(t).next((n=>n<this.params.cacheSizeCollectionThreshold?(Wc("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),af):this.fe(t,e)))}getCacheSize(t){return this.ae.getCacheSize(t)}fe(t,e){let n,r,i,s,o,a,c;const u=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((e=>(e>this.params.maximumSequenceNumbersToCollect?(Wc("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`),r=this.params.maximumSequenceNumbersToCollect):r=e,s=Date.now(),this.nthSequenceNumber(t,r)))).next((r=>(n=r,o=Date.now(),this.removeTargets(t,n,e)))).next((e=>(i=e,a=Date.now(),this.removeOrphanedDocuments(t,n)))).next((t=>(c=Date.now(),Gc()<=ve.DEBUG&&Wc("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${s-u}ms\n\tDetermined least recently used ${r} in `+(o-s)+`ms\n\tRemoved ${i} targets in `+(a-o)+`ms\n\tRemoved ${t} documents in `+(c-a)+`ms\nTotal Duration: ${c-u}ms`),Rd.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:t}))))}}
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
 */class kf{constructor(t,e){this.db=t,this.garbageCollector=new Sf(this,e)}he(t){const e=this.de(t);return this.db.getTargetCache().getTargetCount(t).next((t=>e.next((e=>t+e))))}de(t){let e=0;return this.le(t,(t=>{e++})).next((()=>e))}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}le(t,e){return this.we(t,((t,n)=>e(n)))}addReference(t,e,n){return Cf(t,n)}removeReference(t,e,n){return Cf(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return Cf(t,e)}_e(t,e){return function(t,e){let n=!1;return mf(t).Ft((r=>df(t,r,e).next((t=>(t&&(n=!0),Rd.resolve(!t)))))).next((()=>n))}(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let i=0;return this.we(t,((s,o)=>{if(o<=e){const e=this._e(t,s).next((e=>{if(!e)return i++,n.getEntry(t,s).next((()=>(n.removeEntry(s),bf(t).delete([0,id(s.path)]))))}));r.push(e)}})).next((()=>Rd.waitFor(r))).next((()=>n.apply(t))).next((()=>i))}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return Cf(t,e)}we(t,e){const n=bf(t);let r,i=jc.o;return n.Ot({index:vd.documentTargetsIndex},(([t,n],{path:s,sequenceNumber:o})=>{0===t?(i!==jc.o&&e(new ku(ad(r)),i),i=o,r=s):i=jc.o})).next((()=>{i!==jc.o&&e(new ku(ad(r)),i)}))}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function Cf(t,e){return bf(t).put((n=e,r=t.currentSequenceNumber,new vd(0,id(n.path),r)));var n,r}
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
 */class Rf{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={}}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[r,i]of n)if(this.equalsFn(r,t))return i}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),r=this.inner[n];if(void 0!==r){for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],t))return void(r[n]=[t,e]);r.push([t,e])}else this.inner[n]=[[t,e]]}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],t))return 1===n.length?delete this.inner[e]:n.splice(r,1),!0;return!1}forEach(t){uu(this.inner,((e,n)=>{for(const[r,i]of n)t(r,i)}))}isEmpty(){return hu(this.inner)}}
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
 */class Nf{constructor(){this.changes=new Rf((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}getReadTime(t){const e=this.changes.get(t);return e?e.readTime:au.min()}addEntry(t,e){this.assertNotApplied(),this.changes.set(t.key,{document:t,readTime:e})}removeEntry(t,e=null){this.assertNotApplied(),this.changes.set(t,{document:$u.newInvalidDocument(t),readTime:e})}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?Rd.resolve(n.document):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
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
 */class Af{constructor(t,e){this.R=t,this.qt=e}addEntry(t,e,n){return Of(t).put(Lf(e),n)}removeEntry(t,e){const n=Of(t),r=Lf(e);return n.delete(r)}updateMetadata(t,e){return this.getMetadata(t).next((n=>(n.byteSize+=e,this.me(t,n))))}getEntry(t,e){return Of(t).get(Lf(e)).next((t=>this.ge(e,t)))}ye(t,e){return Of(t).get(Lf(e)).next((t=>({document:this.ge(e,t),size:hf(t)})))}getEntries(t,e){let n=ul();return this.pe(t,e,((t,e)=>{const r=this.ge(t,e);n=n.insert(t,r)})).next((()=>n))}Ee(t,e){let n=ul(),r=new rl(ku.comparator);return this.pe(t,e,((t,e)=>{const i=this.ge(t,e);n=n.insert(t,i),r=r.insert(t,hf(e))})).next((()=>({documents:n,Te:r})))}pe(t,e,n){if(e.isEmpty())return Rd.resolve();const r=IDBKeyRange.bound(e.first().path.toArray(),e.last().path.toArray()),i=e.getIterator();let s=i.getNext();return Of(t).Ot({range:r},((t,e,r)=>{const o=ku.fromSegments(t);for(;s&&ku.comparator(s,o)<0;)n(s,null),s=i.getNext();s&&s.isEqual(o)&&(n(s,e),s=i.hasNext()?i.getNext():null),s?r.Ct(s.path.toArray()):r.done()})).next((()=>{for(;s;)n(s,null),s=i.hasNext()?i.getNext():null}))}getDocumentsMatchingQuery(t,e,n){let r=ul();const i=e.path.length+1,s={};if(n.isEqual(au.min())){const t=e.path.toArray();s.range=IDBKeyRange.lowerBound(t)}else{const t=e.path.toArray(),r=Hd(n);s.range=IDBKeyRange.lowerBound([t,r],!0),s.index=md.collectionReadTimeIndex}return Of(t).Ot(s,((t,n,s)=>{if(t.length!==i)return;const o=zd(this.R,n);e.path.isPrefixOf(o.key.path)?vh(e,o)&&(r=r.insert(o.key,o)):s.done()})).next((()=>r))}newChangeBuffer(t){return new Df(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next((t=>t.byteSize))}getMetadata(t){return xf(t).get(gd.key).next((t=>(Zc(!!t),t)))}me(t,e){return xf(t).put(gd.key,e)}ge(t,e){if(e){const t=zd(this.R,e);if(!t.isNoDocument()||!t.version.isEqual(au.min()))return t}return $u.newInvalidDocument(t)}}class Df extends Nf{constructor(t,e){super(),this.Ie=t,this.trackRemovals=e,this.Ae=new Rf((t=>t.toString()),((t,e)=>t.isEqual(e)))}applyChanges(t){const e=[];let n=0,r=new ol(((t,e)=>ru(t.canonicalString(),e.canonicalString())));return this.changes.forEach(((i,s)=>{const o=this.Ae.get(i);if(s.document.isValidDocument()){const a=Kd(this.Ie.R,s.document,this.getReadTime(i));r=r.add(i.path.popLast());const c=hf(a);n+=c-o,e.push(this.Ie.addEntry(t,i,a))}else if(n-=o,this.trackRemovals){const n=Kd(this.Ie.R,$u.newNoDocument(i,au.min()),this.getReadTime(i));e.push(this.Ie.addEntry(t,i,n))}else e.push(this.Ie.removeEntry(t,i))})),r.forEach((n=>{e.push(this.Ie.qt.addToCollectionParentIndex(t,n))})),e.push(this.Ie.updateMetadata(t,n)),Rd.waitFor(e)}getFromCache(t,e){return this.Ie.ye(t,e).next((t=>(this.Ae.set(e,t.size),t.document)))}getAllFromCache(t,e){return this.Ie.Ee(t,e).next((({documents:t,Te:e})=>(e.forEach(((t,e)=>{this.Ae.set(t,e)})),t)))}}function xf(t){return Vd(t,gd.store)}function Of(t){return Vd(t,md.store)}function Lf(t){return t.path.toArray()}
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
 */class Pf{constructor(t){this.R=t}Rt(t,e,n,r){Zc(n<r&&n>=0&&r<=11);const i=new Nd("createOrUpgrade",e);n<1&&r>=1&&(t.createObjectStore(ud.store),function(t){t.createObjectStore(hd.store,{keyPath:hd.keyPath}),t.createObjectStore(ld.store,{keyPath:ld.keyPath,autoIncrement:!0}).createIndex(ld.userMutationsIndex,ld.userMutationsKeyPath,{unique:!0}),t.createObjectStore(dd.store)}(t),Mf(t),function(t){t.createObjectStore(md.store)}(t));let s=Rd.resolve();return n<3&&r>=3&&(0!==n&&(function(t){t.deleteObjectStore(vd.store),t.deleteObjectStore(yd.store),t.deleteObjectStore(wd.store)}(t),Mf(t)),s=s.next((()=>function(t){const e=t.store(wd.store),n=new wd(0,0,au.min().toTimestamp(),0);return e.put(wd.key,n)}(i)))),n<4&&r>=4&&(0!==n&&(s=s.next((()=>function(t,e){return e.store(ld.store).Nt().next((n=>{t.deleteObjectStore(ld.store),t.createObjectStore(ld.store,{keyPath:ld.keyPath,autoIncrement:!0}).createIndex(ld.userMutationsIndex,ld.userMutationsKeyPath,{unique:!0});const r=e.store(ld.store),i=n.map((t=>r.put(t)));return Rd.waitFor(i)}))}(t,i)))),s=s.next((()=>{!function(t){t.createObjectStore(Id.store,{keyPath:Id.keyPath})}(t)}))),n<5&&r>=5&&(s=s.next((()=>this.Re(i)))),n<6&&r>=6&&(s=s.next((()=>(function(t){t.createObjectStore(gd.store)}(t),this.Pe(i))))),n<7&&r>=7&&(s=s.next((()=>this.be(i)))),n<8&&r>=8&&(s=s.next((()=>this.ve(t,i)))),n<9&&r>=9&&(s=s.next((()=>{!function(t){t.objectStoreNames.contains("remoteDocumentChanges")&&t.deleteObjectStore("remoteDocumentChanges")}(t),function(t){const e=t.objectStore(md.store);e.createIndex(md.readTimeIndex,md.readTimeIndexPath,{unique:!1}),e.createIndex(md.collectionReadTimeIndex,md.collectionReadTimeIndexPath,{unique:!1})}(e)}))),n<10&&r>=10&&(s=s.next((()=>this.Ve(i)))),n<11&&r>=11&&(s=s.next((()=>{!function(t){t.createObjectStore(_d.store,{keyPath:_d.keyPath})}(t),function(t){t.createObjectStore(Td.store,{keyPath:Td.keyPath})}(t)}))),s}Pe(t){let e=0;return t.store(md.store).Ot(((t,n)=>{e+=hf(n)})).next((()=>{const n=new gd(e);return t.store(gd.store).put(gd.key,n)}))}Re(t){const e=t.store(hd.store),n=t.store(ld.store);return e.Nt().next((e=>Rd.forEach(e,(e=>{const r=IDBKeyRange.bound([e.userId,-1],[e.userId,e.lastAcknowledgedBatchId]);return n.Nt(ld.userMutationsIndex,r).next((n=>Rd.forEach(n,(n=>{Zc(n.userId===e.userId);const r=Qd(this.R,n);return uf(t,e.userId,r).next((()=>{}))}))))}))))}be(t){const e=t.store(vd.store),n=t.store(md.store);return t.store(wd.store).get(wd.key).next((t=>{const r=[];return n.Ot(((n,i)=>{const s=new du(n),o=[0,id(s)];r.push(e.get(o).next((n=>{return n?Rd.resolve():(r=s,e.put(new vd(0,id(r),t.highestListenSequenceNumber)));var r})))})).next((()=>Rd.waitFor(r)))}))}ve(t,e){t.createObjectStore(bd.store,{keyPath:bd.keyPath});const n=e.store(bd.store),r=new rf,i=t=>{if(r.add(t)){const e=t.lastSegment(),r=t.popLast();return n.put({collectionId:e,parent:id(r)})}};return e.store(md.store).Ot({$t:!0},((t,e)=>{const n=new du(t);return i(n.popLast())})).next((()=>e.store(dd.store).Ot({$t:!0},(([t,e,n],r)=>{const s=ad(e);return i(s.popLast())}))))}Ve(t){const e=t.store(yd.store);return e.Ot(((t,n)=>{const r=Xd(n),i=Yd(this.R,r);return e.put(i)}))}}function Mf(t){t.createObjectStore(vd.store,{keyPath:vd.keyPath}).createIndex(vd.documentTargetsIndex,vd.documentTargetsKeyPath,{unique:!0}),t.createObjectStore(yd.store,{keyPath:yd.keyPath}).createIndex(yd.queryTargetsIndexName,yd.queryTargetsKeyPath,{unique:!0}),t.createObjectStore(wd.store)}const Uf="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class Ff{constructor(t,e,n,r,i,s,o,a,c,u){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.Se=i,this.window=s,this.document=o,this.De=c,this.Ce=u,this.Ne=null,this.xe=!1,this.isPrimary=!1,this.networkEnabled=!0,this.ke=null,this.inForeground=!1,this.$e=null,this.Oe=null,this.Fe=Number.NEGATIVE_INFINITY,this.Me=t=>Promise.resolve(),!Ff.gt())throw new Kc(zc.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");var h,l;this.referenceDelegate=new kf(this,r),this.Le=e+"main",this.R=new jd(a),this.Be=new Ad(this.Le,11,new Pf(this.R)),this.Ue=new yf(this.referenceDelegate,this.R),this.qt=new sf,this.qe=(h=this.R,l=this.qt,new Af(h,l)),this.Ke=new Zd,this.window&&this.window.localStorage?this.Qe=this.window.localStorage:(this.Qe=null,!1===u&&Qc("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.je().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new Kc(zc.FAILED_PRECONDITION,Uf);return this.We(),this.Ge(),this.ze(),this.runTransaction("getHighestListenSequenceNumber","readonly",(t=>this.Ue.getHighestSequenceNumber(t)))})).then((t=>{this.Ne=new jc(t,this.De)})).then((()=>{this.xe=!0})).catch((t=>(this.Be&&this.Be.close(),Promise.reject(t))))}He(t){return this.Me=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.Be.bt((async e=>{null===e.newVersion&&await t()}))}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.Se.enqueueAndForget((async()=>{this.started&&await this.je()})))}je(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(t=>qf(t).put(new Id(this.clientId,Date.now(),this.networkEnabled,this.inForeground)).next((()=>{if(this.isPrimary)return this.Je(t).next((t=>{t||(this.isPrimary=!1,this.Se.enqueueRetryable((()=>this.Me(!1))))}))})).next((()=>this.Ye(t))).next((e=>this.isPrimary&&!e?this.Xe(t).next((()=>!1)):!!e&&this.Ze(t).next((()=>!0)))))).catch((t=>{if(Od(t))return Wc("IndexedDbPersistence","Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return Wc("IndexedDbPersistence","Releasing owner lease after error during lease refresh",t),!1})).then((t=>{this.isPrimary!==t&&this.Se.enqueueRetryable((()=>this.Me(t))),this.isPrimary=t}))}Je(t){return Vf(t).get(ud.key).next((t=>Rd.resolve(this.tn(t))))}en(t){return qf(t).delete(this.clientId)}async nn(){if(this.isPrimary&&!this.sn(this.Fe,18e5)){this.Fe=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const e=Vd(t,Id.store);return e.Nt().next((t=>{const n=this.rn(t,18e5),r=t.filter((t=>-1===n.indexOf(t)));return Rd.forEach(r,(t=>e.delete(t.clientId))).next((()=>r))}))})).catch((()=>[]));if(this.Qe)for(const e of t)this.Qe.removeItem(this.on(e.clientId))}}ze(){this.Oe=this.Se.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.je().then((()=>this.nn())).then((()=>this.ze()))))}tn(t){return!!t&&t.ownerId===this.clientId}Ye(t){return this.Ce?Rd.resolve(!0):Vf(t).get(ud.key).next((e=>{if(null!==e&&this.sn(e.leaseTimestampMs,5e3)&&!this.cn(e.ownerId)){if(this.tn(e)&&this.networkEnabled)return!0;if(!this.tn(e)){if(!e.allowTabSynchronization)throw new Kc(zc.FAILED_PRECONDITION,Uf);return!1}}return!(!this.networkEnabled||!this.inForeground)||qf(t).Nt().next((t=>void 0===this.rn(t,5e3).find((t=>{if(this.clientId!==t.clientId){const e=!this.networkEnabled&&t.networkEnabled,n=!this.inForeground&&t.inForeground,r=this.networkEnabled===t.networkEnabled;if(e||n&&r)return!0}return!1}))))})).next((t=>(this.isPrimary!==t&&Wc("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.xe=!1,this.un(),this.Oe&&(this.Oe.cancel(),this.Oe=null),this.an(),this.hn(),await this.Be.runTransaction("shutdown","readwrite",[ud.store,Id.store],(t=>{const e=new Fd(t,jc.o);return this.Xe(e).next((()=>this.en(e)))})),this.Be.close(),this.ln()}rn(t,e){return t.filter((t=>this.sn(t.updateTimeMs,e)&&!this.cn(t.clientId)))}fn(){return this.runTransaction("getActiveClients","readonly",(t=>qf(t).Nt().next((t=>this.rn(t,18e5).map((t=>t.clientId))))))}get started(){return this.xe}getMutationQueue(t){return lf.Qt(t,this.R,this.qt,this.referenceDelegate)}getTargetCache(){return this.Ue}getRemoteDocumentCache(){return this.qe}getIndexManager(){return this.qt}getBundleCache(){return this.Ke}runTransaction(t,e,n){Wc("IndexedDbPersistence","Starting transaction:",t);const r="readonly"===e?"readonly":"readwrite";let i;return this.Be.runTransaction(t,r,Ed,(r=>(i=new Fd(r,this.Ne?this.Ne.next():jc.o),"readwrite-primary"===e?this.Je(i).next((t=>!!t||this.Ye(i))).next((e=>{if(!e)throw Qc(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.Se.enqueueRetryable((()=>this.Me(!1))),new Kc(zc.FAILED_PRECONDITION,Sd);return n(i)})).next((t=>this.Ze(i).next((()=>t)))):this.dn(i).next((()=>n(i)))))).then((t=>(i.raiseOnCommittedEvent(),t)))}dn(t){return Vf(t).get(ud.key).next((t=>{if(null!==t&&this.sn(t.leaseTimestampMs,5e3)&&!this.cn(t.ownerId)&&!this.tn(t)&&!(this.Ce||this.allowTabSynchronization&&t.allowTabSynchronization))throw new Kc(zc.FAILED_PRECONDITION,Uf)}))}Ze(t){const e=new ud(this.clientId,this.allowTabSynchronization,Date.now());return Vf(t).put(ud.key,e)}static gt(){return Ad.gt()}Xe(t){const e=Vf(t);return e.get(ud.key).next((t=>this.tn(t)?(Wc("IndexedDbPersistence","Releasing primary lease."),e.delete(ud.key)):Rd.resolve()))}sn(t,e){const n=Date.now();return!(t<n-e||t>n&&(Qc(`Detected an update time that is in the future: ${t} > ${n}`),1))}We(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.$e=()=>{this.Se.enqueueAndForget((()=>(this.inForeground="visible"===this.document.visibilityState,this.je())))},this.document.addEventListener("visibilitychange",this.$e),this.inForeground="visible"===this.document.visibilityState)}an(){this.$e&&(this.document.removeEventListener("visibilitychange",this.$e),this.$e=null)}Ge(){var t;"function"==typeof(null===(t=this.window)||void 0===t?void 0:t.addEventListener)&&(this.ke=()=>{this.un(),this.Se.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.ke))}hn(){this.ke&&(this.window.removeEventListener("pagehide",this.ke),this.ke=null)}cn(t){var e;try{const n=null!==(null===(e=this.Qe)||void 0===e?void 0:e.getItem(this.on(t)));return Wc("IndexedDbPersistence",`Client '${t}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return Qc("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}un(){if(this.Qe)try{this.Qe.setItem(this.on(this.clientId),String(Date.now()))}catch(t){Qc("Failed to set zombie client id.",t)}}ln(){if(this.Qe)try{this.Qe.removeItem(this.on(this.clientId))}catch(t){}}on(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function Vf(t){return Vd(t,ud.store)}function qf(t){return Vd(t,Id.store)}
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
class Bf{constructor(t,e,n){this.qe=t,this._n=e,this.qt=n}mn(t,e){return this._n.getAllMutationBatchesAffectingDocumentKey(t,e).next((n=>this.gn(t,e,n)))}gn(t,e,n){return this.qe.getEntry(t,e).next((t=>{for(const e of n)e.applyToLocalView(t);return t}))}yn(t,e){t.forEach(((t,n)=>{for(const r of e)r.applyToLocalView(n)}))}pn(t,e){return this.qe.getEntries(t,e).next((e=>this.En(t,e).next((()=>e))))}En(t,e){return this._n.getAllMutationBatchesAffectingDocumentKeys(t,e).next((t=>this.yn(e,t)))}getDocumentsMatchingQuery(t,e,n){return r=e,ku.isDocumentKey(r.path)&&null===r.collectionGroup&&0===r.filters.length?this.Tn(t,e.path):function(t){return null!==t.collectionGroup}(e)?this.In(t,e,n):this.An(t,e,n);var r}Tn(t,e){return this.mn(t,new ku(e)).next((t=>{let e=ll();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e}))}In(t,e,n){const r=e.collectionGroup;let i=ll();return this.qt.getCollectionParents(t,r).next((s=>Rd.forEach(s,(s=>{const o=(a=e,c=s.child(r),new uh(c,null,a.explicitOrderBy.slice(),a.filters.slice(),a.limit,a.limitType,a.startAt,a.endAt));var a,c;return this.An(t,o,n).next((t=>{t.forEach(((t,e)=>{i=i.insert(t,e)}))}))})).next((()=>i))))}An(t,e,n){let r,i;return this.qe.getDocumentsMatchingQuery(t,e,n).next((n=>(r=n,this._n.getAllMutationBatchesAffectingQuery(t,e)))).next((e=>(i=e,this.Rn(t,i,r).next((t=>{r=t;for(const e of i)for(const t of e.mutations){const n=t.key;let i=r.get(n);null==i&&(i=$u.newInvalidDocument(n),r=r.insert(n,i)),$h(t,i,e.localWriteTime),i.isFoundDocument()||(r=r.remove(n))}}))))).next((()=>(r.forEach(((t,n)=>{vh(e,n)||(r=r.remove(t))})),r)))}Rn(t,e,n){let r=pl();for(const s of e)for(const t of s.mutations)t instanceof Gh&&null===n.get(t.key)&&(r=r.add(t.key));let i=n;return this.qe.getEntries(t,r).next((t=>(t.forEach(((t,e)=>{e.isFoundDocument()&&(i=i.insert(t,e))})),i)))}}
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
 */class $f{constructor(t,e,n,r){this.targetId=t,this.fromCache=e,this.Pn=n,this.bn=r}static vn(t,e){let n=pl(),r=pl();for(const i of e.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new $f(t,e.fromCache,n,r)}}
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
 */class jf{Vn(t){this.Sn=t}getDocumentsMatchingQuery(t,e,n,r){return 0===(i=e).filters.length&&null===i.limit&&null==i.startAt&&null==i.endAt&&(0===i.explicitOrderBy.length||1===i.explicitOrderBy.length&&i.explicitOrderBy[0].field.isKeyField())||n.isEqual(au.min())?this.Dn(t,e):this.Sn.pn(t,r).next((i=>{const s=this.Cn(e,i);return(lh(e)||dh(e))&&this.Nn(e.limitType,s,r,n)?this.Dn(t,e):(Gc()<=ve.DEBUG&&Wc("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),yh(e)),this.Sn.getDocumentsMatchingQuery(t,e,n).next((t=>(s.forEach((e=>{t=t.insert(e.key,e)})),t))))}));var i}Cn(t,e){let n=new ol(wh(t));return e.forEach(((e,r)=>{vh(t,r)&&(n=n.add(r))})),n}Nn(t,e,n,r){if(n.size!==e.size)return!0;const i="F"===t?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Dn(t,e){return Gc()<=ve.DEBUG&&Wc("QueryEngine","Using full collection scan to execute query:",yh(e)),this.Sn.getDocumentsMatchingQuery(t,e,au.min())}}
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
 */class zf{constructor(t,e,n,r){this.persistence=t,this.xn=e,this.R=r,this.kn=new rl(ru),this.$n=new Rf((t=>Ku(t)),Hu),this.On=au.min(),this._n=t.getMutationQueue(n),this.Fn=t.getRemoteDocumentCache(),this.Ue=t.getTargetCache(),this.Mn=new Bf(this.Fn,this._n,this.persistence.getIndexManager()),this.Ke=t.getBundleCache(),this.xn.Vn(this.Mn)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.kn)))}}function Kf(t,e,n,r){return new zf(t,e,n,r)}async function Hf(t,e){const n=tu(t);let r=n._n,i=n.Mn;const s=await n.persistence.runTransaction("Handle user change","readonly",(t=>{let s;return n._n.getAllMutationBatches(t).next((o=>(s=o,r=n.persistence.getMutationQueue(e),i=new Bf(n.Fn,r,n.persistence.getIndexManager()),r.getAllMutationBatches(t)))).next((e=>{const n=[],r=[];let o=pl();for(const t of s){n.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}for(const t of e){r.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}return i.pn(t,o).next((t=>({Ln:t,removedBatchIds:n,addedBatchIds:r})))}))}));return n._n=r,n.Mn=i,n.xn.Vn(n.Mn),s}function Gf(t){const e=tu(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Ue.getLastRemoteSnapshotVersion(t)))}function Wf(t,e){const n=tu(t),r=e.snapshotVersion;let i=n.kn;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(t=>{const s=n.Fn.newChangeBuffer({trackRemovals:!0});i=n.kn;const o=[];e.targetChanges.forEach(((e,s)=>{const a=i.get(s);if(!a)return;o.push(n.Ue.removeMatchingKeys(t,e.removedDocuments,s).next((()=>n.Ue.addMatchingKeys(t,e.addedDocuments,s))));const c=e.resumeToken;if(c.approximateByteSize()>0){const d=a.withResumeToken(c,r).withSequenceNumber(t.currentSequenceNumber);i=i.insert(s,d),u=a,l=e,Zc((h=d).resumeToken.approximateByteSize()>0),(0===u.resumeToken.approximateByteSize()||h.snapshotVersion.toMicroseconds()-u.snapshotVersion.toMicroseconds()>=3e8||l.addedDocuments.size+l.modifiedDocuments.size+l.removedDocuments.size>0)&&o.push(n.Ue.updateTargetData(t,d))}var u,h,l}));let a=ul();if(e.documentUpdates.forEach(((r,i)=>{e.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,r))})),o.push(function(t,e,n,r,i){let s=pl();return n.forEach((t=>s=s.add(t))),e.getEntries(t,s).next((t=>{let s=ul();return n.forEach(((n,o)=>{const a=t.get(n),c=(null==i?void 0:i.get(n))||r;o.isNoDocument()&&o.version.isEqual(au.min())?(e.removeEntry(n,c),s=s.insert(n,o)):!a.isValidDocument()||o.version.compareTo(a.version)>0||0===o.version.compareTo(a.version)&&a.hasPendingWrites?(e.addEntry(o,c),s=s.insert(n,o)):Wc("LocalStore","Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",o.version)})),s}))}(t,s,e.documentUpdates,r,void 0).next((t=>{a=t}))),!r.isEqual(au.min())){const e=n.Ue.getLastRemoteSnapshotVersion(t).next((e=>n.Ue.setTargetsMetadata(t,t.currentSequenceNumber,r)));o.push(e)}return Rd.waitFor(o).next((()=>s.apply(t))).next((()=>n.Mn.En(t,a))).next((()=>a))})).then((t=>(n.kn=i,t)))}function Qf(t,e){const n=tu(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(t=>(void 0===e&&(e=-1),n._n.getNextMutationBatchAfterBatchId(t,e))))}async function Xf(t,e,n){const r=tu(t),i=r.kn.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,(t=>r.persistence.referenceDelegate.removeTarget(t,i)))}catch(o){if(!Od(o))throw o;Wc("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.kn=r.kn.remove(e),r.$n.delete(i.target)}function Yf(t,e,n){const r=tu(t);let i=au.min(),s=pl();return r.persistence.runTransaction("Execute query","readonly",(t=>function(t,e,n){const r=tu(t),i=r.$n.get(n);return void 0!==i?Rd.resolve(r.kn.get(i)):r.Ue.getTargetData(e,n)}(r,t,ph(e)).next((e=>{if(e)return i=e.lastLimboFreeSnapshotVersion,r.Ue.getMatchingKeysForTargetId(t,e.targetId).next((t=>{s=t}))})).next((()=>r.xn.getDocumentsMatchingQuery(t,e,n?i:au.min(),n?s:pl()))).next((t=>({documents:t,Bn:s})))))}async function Jf(t){const e=tu(t);return e.persistence.runTransaction("Synchronize last document change read time","readonly",(t=>function(t){const e=Of(t);let n=au.min();return e.Ot({index:md.readTimeIndex,reverse:!0},((t,e,r)=>{e.readTime&&(n=function(t){const e=new ou(t[0],t[1]);return au.fromTimestamp(e)}(e.readTime)),r.done()})).next((()=>n))}(t))).then((t=>{e.On=t}))}
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
 */class Zf{constructor(t){this.R=t,this.Qn=new Map,this.jn=new Map}getBundleMetadata(t,e){return Rd.resolve(this.Qn.get(e))}saveBundleMetadata(t,e){var n;return this.Qn.set(e.id,{id:(n=e).id,version:n.version,createTime:xl(n.createTime)}),Rd.resolve()}getNamedQuery(t,e){return Rd.resolve(this.jn.get(e))}saveNamedQuery(t,e){return this.jn.set(e.name,{name:(n=e).name,query:Jd(n.bundledQuery),readTime:xl(n.readTime)}),Rd.resolve();var n}}
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
 */class tp{constructor(){this.Wn=new ol(ep.Gn),this.zn=new ol(ep.Hn)}isEmpty(){return this.Wn.isEmpty()}addReference(t,e){const n=new ep(t,e);this.Wn=this.Wn.add(n),this.zn=this.zn.add(n)}Jn(t,e){t.forEach((t=>this.addReference(t,e)))}removeReference(t,e){this.Yn(new ep(t,e))}Xn(t,e){t.forEach((t=>this.removeReference(t,e)))}Zn(t){const e=new ku(new du([])),n=new ep(e,t),r=new ep(e,t+1),i=[];return this.zn.forEachInRange([n,r],(t=>{this.Yn(t),i.push(t.key)})),i}ts(){this.Wn.forEach((t=>this.Yn(t)))}Yn(t){this.Wn=this.Wn.delete(t),this.zn=this.zn.delete(t)}es(t){const e=new ku(new du([])),n=new ep(e,t),r=new ep(e,t+1);let i=pl();return this.zn.forEachInRange([n,r],(t=>{i=i.add(t.key)})),i}containsKey(t){const e=new ep(t,0),n=this.Wn.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class ep{constructor(t,e){this.key=t,this.ns=e}static Gn(t,e){return ku.comparator(t.key,e.key)||ru(t.ns,e.ns)}static Hn(t,e){return ru(t.ns,e.ns)||ku.comparator(t.key,e.key)}}
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
 */class np{constructor(t,e){this.qt=t,this.referenceDelegate=e,this._n=[],this.ss=1,this.rs=new ol(ep.Gn)}checkEmpty(t){return Rd.resolve(0===this._n.length)}addMutationBatch(t,e,n,r){const i=this.ss;this.ss++,this._n.length>0&&this._n[this._n.length-1];const s=new qd(i,e,n,r);this._n.push(s);for(const o of r)this.rs=this.rs.add(new ep(o.key,i)),this.qt.addToCollectionParentIndex(t,o.key.path.popLast());return Rd.resolve(s)}lookupMutationBatch(t,e){return Rd.resolve(this.os(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=this.cs(n),i=r<0?0:r;return Rd.resolve(this._n.length>i?this._n[i]:null)}getHighestUnacknowledgedBatchId(){return Rd.resolve(0===this._n.length?-1:this.ss-1)}getAllMutationBatches(t){return Rd.resolve(this._n.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new ep(e,0),r=new ep(e,Number.POSITIVE_INFINITY),i=[];return this.rs.forEachInRange([n,r],(t=>{const e=this.os(t.ns);i.push(e)})),Rd.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new ol(ru);return e.forEach((t=>{const e=new ep(t,0),r=new ep(t,Number.POSITIVE_INFINITY);this.rs.forEachInRange([e,r],(t=>{n=n.add(t.ns)}))})),Rd.resolve(this.us(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1;let i=n;ku.isDocumentKey(i)||(i=i.child(""));const s=new ep(new ku(i),0);let o=new ol(ru);return this.rs.forEachWhile((t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===r&&(o=o.add(t.ns)),!0)}),s),Rd.resolve(this.us(o))}us(t){const e=[];return t.forEach((t=>{const n=this.os(t);null!==n&&e.push(n)})),e}removeMutationBatch(t,e){Zc(0===this.hs(e.batchId,"removed")),this._n.shift();let n=this.rs;return Rd.forEach(e.mutations,(r=>{const i=new ep(r.key,e.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,r.key)})).next((()=>{this.rs=n}))}Gt(t){}containsKey(t,e){const n=new ep(e,0),r=this.rs.firstAfterOrEqual(n);return Rd.resolve(e.isEqual(r&&r.key))}performConsistencyCheck(t){return this._n.length,Rd.resolve()}hs(t,e){return this.cs(t)}cs(t){return 0===this._n.length?0:t-this._n[0].batchId}os(t){const e=this.cs(t);return e<0||e>=this._n.length?null:this._n[e]}}
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
 */class rp{constructor(t,e){this.qt=t,this.ls=e,this.docs=new rl(ku.comparator),this.size=0}addEntry(t,e,n){const r=e.key,i=this.docs.get(r),s=i?i.size:0,o=this.ls(e);return this.docs=this.docs.insert(r,{document:e.clone(),size:o,readTime:n}),this.size+=o-s,this.qt.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return Rd.resolve(n?n.document.clone():$u.newInvalidDocument(e))}getEntries(t,e){let n=ul();return e.forEach((t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.clone():$u.newInvalidDocument(t))})),Rd.resolve(n)}getDocumentsMatchingQuery(t,e,n){let r=ul();const i=new ku(e.path.child("")),s=this.docs.getIteratorFrom(i);for(;s.hasNext();){const{key:t,value:{document:i,readTime:o}}=s.getNext();if(!e.path.isPrefixOf(t.path))break;o.compareTo(n)<=0||vh(e,i)&&(r=r.insert(i.key,i.clone()))}return Rd.resolve(r)}fs(t,e){return Rd.forEach(this.docs,(t=>e(t)))}newChangeBuffer(t){return new ip(this)}getSize(t){return Rd.resolve(this.size)}}class ip extends Nf{constructor(t){super(),this.Ie=t}applyChanges(t){const e=[];return this.changes.forEach(((n,r)=>{r.document.isValidDocument()?e.push(this.Ie.addEntry(t,r.document,this.getReadTime(n))):this.Ie.removeEntry(n)})),Rd.waitFor(e)}getFromCache(t,e){return this.Ie.getEntry(t,e)}getAllFromCache(t,e){return this.Ie.getEntries(t,e)}}
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
 */class sp{constructor(t){this.persistence=t,this.ds=new Rf((t=>Ku(t)),Hu),this.lastRemoteSnapshotVersion=au.min(),this.highestTargetId=0,this.ws=0,this._s=new tp,this.targetCount=0,this.gs=gf.Jt()}forEachTarget(t,e){return this.ds.forEach(((t,n)=>e(n))),Rd.resolve()}getLastRemoteSnapshotVersion(t){return Rd.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return Rd.resolve(this.ws)}allocateTargetId(t){return this.highestTargetId=this.gs.next(),Rd.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ws&&(this.ws=e),Rd.resolve()}te(t){this.ds.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.gs=new gf(e),this.highestTargetId=e),t.sequenceNumber>this.ws&&(this.ws=t.sequenceNumber)}addTargetData(t,e){return this.te(e),this.targetCount+=1,Rd.resolve()}updateTargetData(t,e){return this.te(e),Rd.resolve()}removeTargetData(t,e){return this.ds.delete(e.target),this._s.Zn(e.targetId),this.targetCount-=1,Rd.resolve()}removeTargets(t,e,n){let r=0;const i=[];return this.ds.forEach(((s,o)=>{o.sequenceNumber<=e&&null===n.get(o.targetId)&&(this.ds.delete(s),i.push(this.removeMatchingKeysForTargetId(t,o.targetId)),r++)})),Rd.waitFor(i).next((()=>r))}getTargetCount(t){return Rd.resolve(this.targetCount)}getTargetData(t,e){const n=this.ds.get(e)||null;return Rd.resolve(n)}addMatchingKeys(t,e,n){return this._s.Jn(e,n),Rd.resolve()}removeMatchingKeys(t,e,n){this._s.Xn(e,n);const r=this.persistence.referenceDelegate,i=[];return r&&e.forEach((e=>{i.push(r.markPotentiallyOrphaned(t,e))})),Rd.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this._s.Zn(e),Rd.resolve()}getMatchingKeysForTargetId(t,e){const n=this._s.es(e);return Rd.resolve(n)}containsKey(t,e){return Rd.resolve(this._s.containsKey(e))}}
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
 */class op{constructor(t,e){var n;this.ys={},this.Ne=new jc(0),this.xe=!1,this.xe=!0,this.referenceDelegate=t(this),this.Ue=new sp(this),this.qt=new nf,this.qe=(n=this.qt,new rp(n,(t=>this.referenceDelegate.ps(t)))),this.R=new jd(e),this.Ke=new Zf(this.R)}start(){return Promise.resolve()}shutdown(){return this.xe=!1,Promise.resolve()}get started(){return this.xe}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(){return this.qt}getMutationQueue(t){let e=this.ys[t.toKey()];return e||(e=new np(this.qt,this.referenceDelegate),this.ys[t.toKey()]=e),e}getTargetCache(){return this.Ue}getRemoteDocumentCache(){return this.qe}getBundleCache(){return this.Ke}runTransaction(t,e,n){Wc("MemoryPersistence","Starting transaction:",t);const r=new ap(this.Ne.next());return this.referenceDelegate.Es(),n(r).next((t=>this.referenceDelegate.Ts(r).next((()=>t)))).toPromise().then((t=>(r.raiseOnCommittedEvent(),t)))}Is(t,e){return Rd.or(Object.values(this.ys).map((n=>()=>n.containsKey(t,e))))}}class ap extends kd{constructor(t){super(),this.currentSequenceNumber=t}}class cp{constructor(t){this.persistence=t,this.As=new tp,this.Rs=null}static Ps(t){return new cp(t)}get bs(){if(this.Rs)return this.Rs;throw Jc()}addReference(t,e,n){return this.As.addReference(n,e),this.bs.delete(n.toString()),Rd.resolve()}removeReference(t,e,n){return this.As.removeReference(n,e),this.bs.add(n.toString()),Rd.resolve()}markPotentiallyOrphaned(t,e){return this.bs.add(e.toString()),Rd.resolve()}removeTarget(t,e){this.As.Zn(e.targetId).forEach((t=>this.bs.add(t.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((t=>{t.forEach((t=>this.bs.add(t.toString())))})).next((()=>n.removeTargetData(t,e)))}Es(){this.Rs=new Set}Ts(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Rd.forEach(this.bs,(n=>{const r=ku.fromPath(n);return this.vs(t,r).next((t=>{t||e.removeEntry(r)}))})).next((()=>(this.Rs=null,e.apply(t))))}updateLimboDocument(t,e){return this.vs(t,e).next((t=>{t?this.bs.delete(e.toString()):this.bs.add(e.toString())}))}ps(t){return 0}vs(t,e){return Rd.or([()=>Rd.resolve(this.As.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Is(t,e)])}}
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
 */class up{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}up.UNAUTHENTICATED=new up(null),up.GOOGLE_CREDENTIALS=new up("google-credentials-uid"),up.FIRST_PARTY=new up("first-party-uid");class hp{constructor(){this.activeTargetIds=gl()}Ds(t){this.activeTargetIds=this.activeTargetIds.add(t)}Cs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ss(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class lp{constructor(){this.li=new hp,this.fi={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t){return this.li.Ds(t),this.fi[t]||"not-current"}updateQueryState(t,e,n){this.fi[t]=e}removeLocalQueryTarget(t){this.li.Cs(t)}isLocalQueryTarget(t){return this.li.activeTargetIds.has(t)}clearQueryState(t){delete this.fi[t]}getAllActiveQueryTargets(){return this.li.activeTargetIds}isActiveQueryTarget(t){return this.li.activeTargetIds.has(t)}start(){return this.li=new hp,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(){}}
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
 */class dp{di(t){}shutdown(){}}
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
 */class fp{constructor(){this.wi=()=>this._i(),this.mi=()=>this.gi(),this.yi=[],this.pi()}di(t){this.yi.push(t)}shutdown(){window.removeEventListener("online",this.wi),window.removeEventListener("offline",this.mi)}pi(){window.addEventListener("online",this.wi),window.addEventListener("offline",this.mi)}_i(){Wc("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.yi)t(0)}gi(){Wc("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.yi)t(1)}static gt(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
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
 */const pp={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};
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
 */class mp{constructor(t){this.Ei=t.Ei,this.Ti=t.Ti}Ii(t){this.Ai=t}Ri(t){this.Pi=t}onMessage(t){this.bi=t}close(){this.Ti()}send(t){this.Ei(t)}vi(){this.Ai()}Vi(t){this.Pi(t)}Si(t){this.bi(t)}}
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
 */class gp extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http";this.Di=e+"://"+t.host,this.Ci="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}Ni(t,e,n,r){const i=this.xi(t,e);Wc("RestConnection","Sending: ",i,n);const s={};return this.ki(s,r),this.$i(t,i,s,n).then((t=>(Wc("RestConnection","Received: ",t),t)),(e=>{throw Xc("RestConnection",`${t} failed with error: `,e,"url: ",i,"request:",n),e}))}Oi(t,e,n,r){return this.Ni(t,e,n,r)}ki(t,e){if(t["X-Goog-Api-Client"]="gl-js/ fire/"+$c,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e)for(const n in e.authHeaders)e.authHeaders.hasOwnProperty(n)&&(t[n]=e.authHeaders[n])}xi(t,e){const n=pp[t];return`${this.Di}/v1/${e}:${n}`}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams}$i(t,e,n,r){return new Promise(((i,s)=>{const o=new Bc;o.listenOnce(Pc.COMPLETE,(()=>{try{switch(o.getLastErrorCode()){case Lc.NO_ERROR:const e=o.getResponseJson();Wc("Connection","XHR received:",JSON.stringify(e)),i(e);break;case Lc.TIMEOUT:Wc("Connection",'RPC "'+t+'" timed out'),s(new Kc(zc.DEADLINE_EXCEEDED,"Request time out"));break;case Lc.HTTP_ERROR:const n=o.getStatus();if(Wc("Connection",'RPC "'+t+'" failed with status:',n,"response text:",o.getResponseText()),n>0){const t=o.getResponseJson().error;if(t&&t.status&&t.message){const e=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(zc).indexOf(e)>=0?e:zc.UNKNOWN}(t.status);s(new Kc(e,t.message))}else s(new Kc(zc.UNKNOWN,"Server responded with status "+o.getStatus()))}else s(new Kc(zc.UNAVAILABLE,"Connection failed."));break;default:Jc()}}finally{Wc("Connection",'RPC "'+t+'" completed.')}}));const a=JSON.stringify(r);o.send(e,"POST",a,n,15)}))}Fi(t,e){const n=[this.Di,"/","google.firestore.v1.Firestore","/",t,"/channel"],r=new Tc,i=So(),s={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(s.xmlHttpFactory=new Vc({})),this.ki(s.initMessageHeaders,e),re()||se()||ne().indexOf("Electron/")>=0||oe()||ne().indexOf("MSAppHost/")>=0||ie()||(s.httpHeadersOverwriteParam="$httpHeaders");const o=n.join("");Wc("Connection","Creating WebChannel: "+o,s);const a=r.createWebChannel(o,s);let c=!1,u=!1;const h=new mp({Ei:t=>{u?Wc("Connection","Not sending because WebChannel is closed:",t):(c||(Wc("Connection","Opening WebChannel transport."),a.open(),c=!0),Wc("Connection","WebChannel sending:",t),a.send(t))},Ti:()=>a.close()}),l=(t,e,n)=>{t.listen(e,(t=>{try{n(t)}catch(e){setTimeout((()=>{throw e}),0)}}))};return l(a,qc.EventType.OPEN,(()=>{u||Wc("Connection","WebChannel transport opened.")})),l(a,qc.EventType.CLOSE,(()=>{u||(u=!0,Wc("Connection","WebChannel transport closed"),h.Vi())})),l(a,qc.EventType.ERROR,(t=>{u||(u=!0,Xc("Connection","WebChannel transport errored:",t),h.Vi(new Kc(zc.UNAVAILABLE,"The operation could not be completed")))})),l(a,qc.EventType.MESSAGE,(t=>{var e;if(!u){const n=t.data[0];Zc(!!n);const r=n,i=r.error||(null===(e=r[0])||void 0===e?void 0:e.error);if(i){Wc("Connection","WebChannel received error:",i);const t=i.status;let e=function(t){const e=tl[t];if(void 0!==e)return nl(e)}(t),n=i.message;void 0===e&&(e=zc.INTERNAL,n="Unknown error status: "+t+" with message "+i.message),u=!0,h.Vi(new Kc(e,n)),a.close()}else Wc("Connection","WebChannel received:",n),h.Si(n)}})),l(i,Mc.STAT_EVENT,(t=>{t.stat===Uc?Wc("Connection","Detected buffering proxy"):t.stat===Fc&&Wc("Connection","Detected no buffering proxy")})),setTimeout((()=>{h.vi()}),0),h}}
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
 */function yp(){return"undefined"!=typeof document?document:null}
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
 */function vp(t){return new Rl(t,!0)}class wp{constructor(t,e,n=1e3,r=1.5,i=6e4){this.Se=t,this.timerId=e,this.Mi=n,this.Li=r,this.Bi=i,this.Ui=0,this.qi=null,this.Ki=Date.now(),this.reset()}reset(){this.Ui=0}Qi(){this.Ui=this.Bi}ji(t){this.cancel();const e=Math.floor(this.Ui+this.Wi()),n=Math.max(0,Date.now()-this.Ki),r=Math.max(0,e-n);r>0&&Wc("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Ui} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.qi=this.Se.enqueueAfterDelay(this.timerId,r,(()=>(this.Ki=Date.now(),t()))),this.Ui*=this.Li,this.Ui<this.Mi&&(this.Ui=this.Mi),this.Ui>this.Bi&&(this.Ui=this.Bi)}Gi(){null!==this.qi&&(this.qi.skipDelay(),this.qi=null)}cancel(){null!==this.qi&&(this.qi.cancel(),this.qi=null)}Wi(){return(Math.random()-.5)*this.Ui}}
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
 */class bp{constructor(t,e,n,r,i,s){this.Se=t,this.zi=n,this.Hi=r,this.Ji=i,this.listener=s,this.state=0,this.Yi=0,this.Xi=null,this.stream=null,this.Zi=new wp(t,e)}tr(){return 1===this.state||2===this.state||4===this.state}er(){return 2===this.state}start(){3!==this.state?this.auth():this.nr()}async stop(){this.tr()&&await this.close(0)}sr(){this.state=0,this.Zi.reset()}ir(){this.er()&&null===this.Xi&&(this.Xi=this.Se.enqueueAfterDelay(this.zi,6e4,(()=>this.rr())))}cr(t){this.ur(),this.stream.send(t)}async rr(){if(this.er())return this.close(0)}ur(){this.Xi&&(this.Xi.cancel(),this.Xi=null)}async close(t,e){this.ur(),this.Zi.cancel(),this.Yi++,3!==t?this.Zi.reset():e&&e.code===zc.RESOURCE_EXHAUSTED?(Qc(e.toString()),Qc("Using maximum backoff delay to prevent overloading the backend."),this.Zi.Qi()):e&&e.code===zc.UNAUTHENTICATED&&this.Ji.invalidateToken(),null!==this.stream&&(this.ar(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Ri(e)}ar(){}auth(){this.state=1;const t=this.hr(this.Yi),e=this.Yi;this.Ji.getToken().then((t=>{this.Yi===e&&this.lr(t)}),(e=>{t((()=>{const t=new Kc(zc.UNKNOWN,"Fetching auth token failed: "+e.message);return this.dr(t)}))}))}lr(t){const e=this.hr(this.Yi);this.stream=this.wr(t),this.stream.Ii((()=>{e((()=>(this.state=2,this.listener.Ii())))})),this.stream.Ri((t=>{e((()=>this.dr(t)))})),this.stream.onMessage((t=>{e((()=>this.onMessage(t)))}))}nr(){this.state=4,this.Zi.ji((async()=>{this.state=0,this.start()}))}dr(t){return Wc("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(3,t)}hr(t){return e=>{this.Se.enqueueAndForget((()=>this.Yi===t?e():(Wc("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Ip extends bp{constructor(t,e,n,r,i){super(t,"listen_stream_connection_backoff","listen_stream_idle",e,n,i),this.R=r}wr(t){return this.Hi.Fi("Listen",t)}onMessage(t){this.Zi.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const i="NO_CHANGE"===(r=e.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:Jc(),s=e.targetChange.targetIds||[],o=function(t,e){return t.I?(Zc(void 0===e||"string"==typeof e),gu.fromBase64String(e||"")):(Zc(void 0===e||e instanceof Uint8Array),gu.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(t){const e=void 0===t.code?zc.UNKNOWN:nl(t.code);return new Kc(e,t.message||"")}(a);n=new Il(i,s,o,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Ml(t,r.document.name),s=xl(r.document.updateTime),o=new qu({mapValue:{fields:r.document.fields}}),a=$u.newFoundDocument(i,s,o),c=r.targetIds||[],u=r.removedTargetIds||[];n=new wl(c,u,a.key,a)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Ml(t,r.document),s=r.readTime?xl(r.readTime):au.min(),o=$u.newNoDocument(i,s),a=r.removedTargetIds||[];n=new wl([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Ml(t,r.document),s=r.removedTargetIds||[];n=new wl([],s,i,null)}else{if(!("filter"in e))return Jc();{e.filter;const t=e.filter;t.targetId;const r=t.count||0,i=new Zh(r),s=t.targetId;n=new bl(s,i)}}var r;return n}(this.R,t),n=function(t){if(!("targetChange"in t))return au.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?au.min():e.readTime?xl(e.readTime):au.min()}(t);return this.listener._r(e,n)}mr(t){const e={};e.database=Vl(this.R),e.addTarget=function(t,e){let n;const r=e.target;return n=Gu(r)?{documents:zl(t,r)}:{query:Kl(t,r)},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0?n.resumeToken=Al(t,e.resumeToken):e.snapshotVersion.compareTo(au.min())>0&&(n.readTime=Nl(t,e.snapshotVersion.toTimestamp())),n}(this.R,t);const n=function(t,e){const n=function(t,e){switch(e){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return Jc()}}(0,e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.R,t);n&&(e.labels=n),this.cr(e)}gr(t){const e={};e.database=Vl(this.R),e.removeTarget=t,this.cr(e)}}class _p extends bp{constructor(t,e,n,r,i){super(t,"write_stream_connection_backoff","write_stream_idle",e,n,i),this.R=r,this.yr=!1}get pr(){return this.yr}start(){this.yr=!1,this.lastStreamToken=void 0,super.start()}ar(){this.yr&&this.Er([])}wr(t){return this.Hi.Fi("Write",t)}onMessage(t){if(Zc(!!t.streamToken),this.lastStreamToken=t.streamToken,this.yr){this.Zi.reset();const e=function(t,e){return t&&t.length>0?(Zc(void 0!==e),t.map((t=>function(t,e){let n=t.updateTime?xl(t.updateTime):xl(e);return n.isEqual(au.min())&&(n=xl(e)),new Uh(n,t.transformResults||[])}(t,e)))):[]}(t.writeResults,t.commitTime),n=xl(t.commitTime);return this.listener.Tr(n,e)}return Zc(!t.writeResults||0===t.writeResults.length),this.yr=!0,this.listener.Ir()}Ar(){const t={};t.database=Vl(this.R),this.cr(t)}Er(t){const e={streamToken:this.lastStreamToken,writes:t.map((t=>$l(this.R,t)))};this.cr(e)}}
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
 */class Tp extends class{}{constructor(t,e,n){super(),this.credentials=t,this.Hi=e,this.R=n,this.Rr=!1}Pr(){if(this.Rr)throw new Kc(zc.FAILED_PRECONDITION,"The client has already been terminated.")}Ni(t,e,n){return this.Pr(),this.credentials.getToken().then((r=>this.Hi.Ni(t,e,n,r))).catch((t=>{throw"FirebaseError"===t.name?(t.code===zc.UNAUTHENTICATED&&this.credentials.invalidateToken(),t):new Kc(zc.UNKNOWN,t.toString())}))}Oi(t,e,n){return this.Pr(),this.credentials.getToken().then((r=>this.Hi.Oi(t,e,n,r))).catch((t=>{throw"FirebaseError"===t.name?(t.code===zc.UNAUTHENTICATED&&this.credentials.invalidateToken(),t):new Kc(zc.UNKNOWN,t.toString())}))}terminate(){this.Rr=!0}}class Ep{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.br=0,this.vr=null,this.Vr=!0}Sr(){0===this.br&&(this.Dr("Unknown"),this.vr=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.vr=null,this.Cr("Backend didn't respond within 10 seconds."),this.Dr("Offline"),Promise.resolve()))))}Nr(t){"Online"===this.state?this.Dr("Unknown"):(this.br++,this.br>=1&&(this.kr(),this.Cr(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.Dr("Offline")))}set(t){this.kr(),this.br=0,"Online"===t&&(this.Vr=!1),this.Dr(t)}Dr(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}Cr(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Vr?(Qc(e),this.Vr=!1):Wc("OnlineStateTracker",e)}kr(){null!==this.vr&&(this.vr.cancel(),this.vr=null)}}
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
 */class Sp{constructor(t,e,n,r,i){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.$r=[],this.Or=new Map,this.Fr=new Set,this.Mr=[],this.Lr=i,this.Lr.di((t=>{n.enqueueAndForget((async()=>{Lp(this)&&(Wc("RemoteStore","Restarting streams for network reachability change."),await async function(t){const e=tu(t);e.Fr.add(4),await Cp(e),e.Br.set("Unknown"),e.Fr.delete(4),await kp(e)}(this))}))})),this.Br=new Ep(n,r)}}async function kp(t){if(Lp(t))for(const e of t.Mr)await e(!0)}async function Cp(t){for(const e of t.Mr)await e(!1)}function Rp(t,e){const n=tu(t);n.Or.has(e.targetId)||(n.Or.set(e.targetId,e),Op(n)?xp(n):Xp(n).er()&&Ap(n,e))}function Np(t,e){const n=tu(t),r=Xp(n);n.Or.delete(e),r.er()&&Dp(n,e),0===n.Or.size&&(r.er()?r.ir():Lp(n)&&n.Br.set("Unknown"))}function Ap(t,e){t.Ur.q(e.targetId),Xp(t).mr(e)}function Dp(t,e){t.Ur.q(e),Xp(t).gr(e)}function xp(t){t.Ur=new Tl({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>t.Or.get(e)||null}),Xp(t).start(),t.Br.Sr()}function Op(t){return Lp(t)&&!Xp(t).tr()&&t.Or.size>0}function Lp(t){return 0===tu(t).Fr.size}function Pp(t){t.Ur=void 0}async function Mp(t){t.Or.forEach(((e,n)=>{Ap(t,e)}))}async function Up(t,e){Pp(t),Op(t)?(t.Br.Nr(e),xp(t)):t.Br.set("Unknown")}async function Fp(t,e,n){if(t.Br.set("Online"),e instanceof Il&&2===e.state&&e.cause)try{await async function(t,e){const n=e.cause;for(const r of e.targetIds)t.Or.has(r)&&(await t.remoteSyncer.rejectListen(r,n),t.Or.delete(r),t.Ur.removeTarget(r))}(t,e)}catch(r){Wc("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Vp(t,r)}else if(e instanceof wl?t.Ur.X(e):e instanceof bl?t.Ur.rt(e):t.Ur.et(e),!n.isEqual(au.min()))try{const e=await Gf(t.localStore);n.compareTo(e)>=0&&await function(t,e){const n=t.Ur.ut(e);return n.targetChanges.forEach(((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const i=t.Or.get(r);i&&t.Or.set(r,i.withResumeToken(n.resumeToken,e))}})),n.targetMismatches.forEach((e=>{const n=t.Or.get(e);if(!n)return;t.Or.set(e,n.withResumeToken(gu.EMPTY_BYTE_STRING,n.snapshotVersion)),Dp(t,e);const r=new $d(n.target,e,1,n.sequenceNumber);Ap(t,r)})),t.remoteSyncer.applyRemoteEvent(n)}(t,n)}catch(i){Wc("RemoteStore","Failed to raise snapshot:",i),await Vp(t,i)}}async function Vp(t,e,n){if(!Od(e))throw e;t.Fr.add(1),await Cp(t),t.Br.set("Offline"),n||(n=()=>Gf(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{Wc("RemoteStore","Retrying IndexedDB access"),await n(),t.Fr.delete(1),await kp(t)}))}function qp(t,e){return e().catch((n=>Vp(t,n,e)))}async function Bp(t){const e=tu(t),n=Yp(e);let r=e.$r.length>0?e.$r[e.$r.length-1].batchId:-1;for(;$p(e);)try{const t=await Qf(e.localStore,r);if(null===t){0===e.$r.length&&n.ir();break}r=t.batchId,jp(e,t)}catch(i){await Vp(e,i)}zp(e)&&Kp(e)}function $p(t){return Lp(t)&&t.$r.length<10}function jp(t,e){t.$r.push(e);const n=Yp(t);n.er()&&n.pr&&n.Er(e.mutations)}function zp(t){return Lp(t)&&!Yp(t).tr()&&t.$r.length>0}function Kp(t){Yp(t).start()}async function Hp(t){Yp(t).Ar()}async function Gp(t){const e=Yp(t);for(const n of t.$r)e.Er(n.mutations)}async function Wp(t,e,n){const r=t.$r.shift(),i=Bd.from(r,e,n);await qp(t,(()=>t.remoteSyncer.applySuccessfulWrite(i))),await Bp(t)}async function Qp(t,e){e&&Yp(t).pr&&await async function(t,e){if(function(t){switch(t){case zc.OK:return Jc();case zc.CANCELLED:case zc.UNKNOWN:case zc.DEADLINE_EXCEEDED:case zc.RESOURCE_EXHAUSTED:case zc.INTERNAL:case zc.UNAVAILABLE:case zc.UNAUTHENTICATED:return!1;case zc.INVALID_ARGUMENT:case zc.NOT_FOUND:case zc.ALREADY_EXISTS:case zc.PERMISSION_DENIED:case zc.FAILED_PRECONDITION:case zc.ABORTED:case zc.OUT_OF_RANGE:case zc.UNIMPLEMENTED:case zc.DATA_LOSS:return!0;default:return Jc()}}(n=e.code)&&n!==zc.ABORTED){const n=t.$r.shift();Yp(t).sr(),await qp(t,(()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e))),await Bp(t)}var n}(t,e),zp(t)&&Kp(t)}function Xp(t){return t.qr||(t.qr=function(t,e,n){const r=tu(t);return r.Pr(),new Ip(e,r.Hi,r.credentials,r.R,n)}(t.datastore,t.asyncQueue,{Ii:Mp.bind(null,t),Ri:Up.bind(null,t),_r:Fp.bind(null,t)}),t.Mr.push((async e=>{e?(t.qr.sr(),Op(t)?xp(t):t.Br.set("Unknown")):(await t.qr.stop(),Pp(t))}))),t.qr}function Yp(t){return t.Kr||(t.Kr=function(t,e,n){const r=tu(t);return r.Pr(),new _p(e,r.Hi,r.credentials,r.R,n)}(t.datastore,t.asyncQueue,{Ii:Hp.bind(null,t),Ri:Qp.bind(null,t),Ir:Gp.bind(null,t),Tr:Wp.bind(null,t)}),t.Mr.push((async e=>{e?(t.Kr.sr(),await Bp(t)):(await t.Kr.stop(),t.$r.length>0&&(Wc("RemoteStore",`Stopping write stream with ${t.$r.length} pending writes`),t.$r=[]))}))),t.Kr
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
 */}class Jp{constructor(t,e,n,r,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new Cd,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((t=>{}))}static createAndSchedule(t,e,n,r,i){const s=Date.now()+n,o=new Jp(t,e,s,r,i);return o.start(n),o}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new Kc(zc.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Zp(t,e){if(Qc("AsyncQueue",`${e}: ${t}`),Od(t))return new Kc(zc.UNAVAILABLE,`${e}: ${t}`);throw t}
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
 */class tm{constructor(t){this.comparator=t?(e,n)=>t(e,n)||ku.comparator(e.key,n.key):(t,e)=>ku.comparator(t.key,e.key),this.keyedMap=ll(),this.sortedSet=new rl(this.comparator)}static emptySet(t){return new tm(t.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,n)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof tm))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(!t.isEqual(r))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new tm;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
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
 */class em{constructor(){this.Qr=new rl(ku.comparator)}track(t){const e=t.doc.key,n=this.Qr.get(e);n?0!==t.type&&3===n.type?this.Qr=this.Qr.insert(e,t):3===t.type&&1!==n.type?this.Qr=this.Qr.insert(e,{type:n.type,doc:t.doc}):2===t.type&&2===n.type?this.Qr=this.Qr.insert(e,{type:2,doc:t.doc}):2===t.type&&0===n.type?this.Qr=this.Qr.insert(e,{type:0,doc:t.doc}):1===t.type&&0===n.type?this.Qr=this.Qr.remove(e):1===t.type&&2===n.type?this.Qr=this.Qr.insert(e,{type:1,doc:n.doc}):0===t.type&&1===n.type?this.Qr=this.Qr.insert(e,{type:2,doc:t.doc}):Jc():this.Qr=this.Qr.insert(e,t)}jr(){const t=[];return this.Qr.inorderTraversal(((e,n)=>{t.push(n)})),t}}class nm{constructor(t,e,n,r,i,s,o,a){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=o,this.excludesMetadataChanges=a}static fromInitialDocuments(t,e,n,r){const i=[];return e.forEach((t=>{i.push({type:0,doc:t})})),new nm(t,e,tm.emptySet(e),i,n,r,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&mh(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let r=0;r<e.length;r++)if(e[r].type!==n[r].type||!e[r].doc.isEqual(n[r].doc))return!1;return!0}}
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
 */class rm{constructor(){this.Wr=void 0,this.listeners=[]}}class im{constructor(){this.queries=new Rf((t=>gh(t)),mh),this.onlineState="Unknown",this.Gr=new Set}}async function sm(t,e){const n=tu(t),r=e.query;let i=!1,s=n.queries.get(r);if(s||(i=!0,s=new rm),i)try{s.Wr=await n.onListen(r)}catch(o){const t=Zp(o,`Initialization of query '${yh(e.query)}' failed`);return void e.onError(t)}n.queries.set(r,s),s.listeners.push(e),e.zr(n.onlineState),s.Wr&&e.Hr(s.Wr)&&um(n)}async function om(t,e){const n=tu(t),r=e.query;let i=!1;const s=n.queries.get(r);if(s){const t=s.listeners.indexOf(e);t>=0&&(s.listeners.splice(t,1),i=0===s.listeners.length)}if(i)return n.queries.delete(r),n.onUnlisten(r)}function am(t,e){const n=tu(t);let r=!1;for(const i of e){const t=i.query,e=n.queries.get(t);if(e){for(const t of e.listeners)t.Hr(i)&&(r=!0);e.Wr=i}}r&&um(n)}function cm(t,e,n){const r=tu(t),i=r.queries.get(e);if(i)for(const s of i.listeners)s.onError(n);r.queries.delete(e)}function um(t){t.Gr.forEach((t=>{t.next()}))}class hm{constructor(t,e,n){this.query=t,this.Jr=e,this.Yr=!1,this.Xr=null,this.onlineState="Unknown",this.options=n||{}}Hr(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new nm(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0)}let e=!1;return this.Yr?this.Zr(t)&&(this.Jr.next(t),e=!0):this.eo(t,this.onlineState)&&(this.no(t),e=!0),this.Xr=t,e}onError(t){this.Jr.error(t)}zr(t){this.onlineState=t;let e=!1;return this.Xr&&!this.Yr&&this.eo(this.Xr,t)&&(this.no(this.Xr),e=!0),e}eo(t,e){if(!t.fromCache)return!0;const n="Offline"!==e;return!(this.options.so&&n||t.docs.isEmpty()&&"Offline"!==e)}Zr(t){if(t.docChanges.length>0)return!0;const e=this.Xr&&this.Xr.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}no(t){t=nm.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache),this.Yr=!0,this.Jr.next(t)}}
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
 */class lm{constructor(t){this.key=t}}class dm{constructor(t){this.key=t}}class fm{constructor(t,e){this.query=t,this.uo=e,this.ao=null,this.current=!1,this.ho=pl(),this.mutatedKeys=pl(),this.lo=wh(t),this.fo=new tm(this.lo)}get wo(){return this.uo}_o(t,e){const n=e?e.mo:new em,r=e?e.fo:this.fo;let i=e?e.mutatedKeys:this.mutatedKeys,s=r,o=!1;const a=lh(this.query)&&r.size===this.query.limit?r.last():null,c=dh(this.query)&&r.size===this.query.limit?r.first():null;if(t.inorderTraversal(((t,e)=>{const u=r.get(t),h=vh(this.query,e)?e:null,l=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations);let f=!1;u&&h?u.data.isEqual(h.data)?l!==d&&(n.track({type:3,doc:h}),f=!0):this.yo(u,h)||(n.track({type:2,doc:h}),f=!0,(a&&this.lo(h,a)>0||c&&this.lo(h,c)<0)&&(o=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(h?(s=s.add(h),i=d?i.add(t):i.delete(t)):(s=s.delete(t),i=i.delete(t)))})),lh(this.query)||dh(this.query))for(;s.size>this.query.limit;){const t=lh(this.query)?s.last():s.first();s=s.delete(t.key),i=i.delete(t.key),n.track({type:1,doc:t})}return{fo:s,mo:n,Nn:o,mutatedKeys:i}}yo(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n){const r=this.fo;this.fo=t.fo,this.mutatedKeys=t.mutatedKeys;const i=t.mo.jr();i.sort(((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Jc()}};return n(t)-n(e)}(t.type,e.type)||this.lo(t.doc,e.doc))),this.po(n);const s=e?this.Eo():[],o=0===this.ho.size&&this.current?1:0,a=o!==this.ao;return this.ao=o,0!==i.length||a?{snapshot:new nm(this.query,t.fo,r,i,t.mutatedKeys,0===o,a,!1),To:s}:{To:s}}zr(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({fo:this.fo,mo:new em,mutatedKeys:this.mutatedKeys,Nn:!1},!1)):{To:[]}}Io(t){return!this.uo.has(t)&&!!this.fo.has(t)&&!this.fo.get(t).hasLocalMutations}po(t){t&&(t.addedDocuments.forEach((t=>this.uo=this.uo.add(t))),t.modifiedDocuments.forEach((t=>{})),t.removedDocuments.forEach((t=>this.uo=this.uo.delete(t))),this.current=t.current)}Eo(){if(!this.current)return[];const t=this.ho;this.ho=pl(),this.fo.forEach((t=>{this.Io(t.key)&&(this.ho=this.ho.add(t.key))}));const e=[];return t.forEach((t=>{this.ho.has(t)||e.push(new dm(t))})),this.ho.forEach((n=>{t.has(n)||e.push(new lm(n))})),e}Ao(t){this.uo=t.Bn,this.ho=pl();const e=this._o(t.documents);return this.applyChanges(e,!0)}Ro(){return nm.fromInitialDocuments(this.query,this.fo,this.mutatedKeys,0===this.ao)}}class pm{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class mm{constructor(t){this.key=t,this.Po=!1}}class gm{constructor(t,e,n,r,i,s){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.bo={},this.vo=new Rf((t=>gh(t)),mh),this.Vo=new Map,this.So=new Set,this.Do=new rl(ku.comparator),this.Co=new Map,this.No=new tp,this.xo={},this.ko=new Map,this.$o=gf.Yt(),this.onlineState="Unknown",this.Oo=void 0}get isPrimaryClient(){return!0===this.Oo}}async function ym(t,e){const n=function(t){const e=tu(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=wm.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Om.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Im.bind(null,e),e.bo._r=am.bind(null,e.eventManager),e.bo.Mo=cm.bind(null,e.eventManager),e}(t);let r,i;const s=n.vo.get(e);if(s)r=s.targetId,n.sharedClientState.addLocalQueryTarget(r),i=s.view.Ro();else{const t=await function(t,e){const n=tu(t);return n.persistence.runTransaction("Allocate target","readwrite",(t=>{let r;return n.Ue.getTargetData(t,e).next((i=>i?(r=i,Rd.resolve(r)):n.Ue.allocateTargetId(t).next((i=>(r=new $d(e,i,0,t.currentSequenceNumber),n.Ue.addTargetData(t,r).next((()=>r)))))))})).then((t=>{const r=n.kn.get(t.targetId);return(null===r||t.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.kn=n.kn.insert(t.targetId,t),n.$n.set(e,t.targetId)),t}))}(n.localStore,ph(e)),s=n.sharedClientState.addLocalQueryTarget(t.targetId);r=t.targetId,i=await async function(t,e,n,r){t.Fo=(e,n,r)=>async function(t,e,n,r){let i=e.view._o(n);i.Nn&&(i=await Yf(t.localStore,e.query,!1).then((({documents:t})=>e.view._o(t,i))));const s=r&&r.targetChanges.get(e.targetId),o=e.view.applyChanges(i,t.isPrimaryClient,s);return Rm(t,e.targetId,o.To),o.snapshot}(t,e,n,r);const i=await Yf(t.localStore,e,!0),s=new fm(e,i.Bn),o=s._o(i.documents),a=vl.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==t.onlineState),c=s.applyChanges(o,t.isPrimaryClient,a);Rm(t,n,c.To);const u=new pm(e,n,s);return t.vo.set(e,u),t.Vo.has(n)?t.Vo.get(n).push(e):t.Vo.set(n,[e]),c.snapshot}(n,e,r,"current"===s),n.isPrimaryClient&&Rp(n.remoteStore,t)}return i}async function vm(t,e){const n=tu(t),r=n.vo.get(e),i=n.Vo.get(r.targetId);if(i.length>1)return n.Vo.set(r.targetId,i.filter((t=>!mh(t,e)))),void n.vo.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await Xf(n.localStore,r.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(r.targetId),Np(n.remoteStore,r.targetId),km(n,r.targetId)})).catch(If)):(km(n,r.targetId),await Xf(n.localStore,r.targetId,!0))}async function wm(t,e){const n=tu(t);try{const t=await Wf(n.localStore,e);e.targetChanges.forEach(((t,e)=>{const r=n.Co.get(e);r&&(Zc(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1),t.addedDocuments.size>0?r.Po=!0:t.modifiedDocuments.size>0?Zc(r.Po):t.removedDocuments.size>0&&(Zc(r.Po),r.Po=!1))})),await Dm(n,t,e)}catch(r){await If(r)}}function bm(t,e,n){const r=tu(t);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const t=[];r.vo.forEach(((n,r)=>{const i=r.view.zr(e);i.snapshot&&t.push(i.snapshot)})),function(t,e){const n=tu(t);n.onlineState=e;let r=!1;n.queries.forEach(((t,n)=>{for(const i of n.listeners)i.zr(e)&&(r=!0)})),r&&um(n)}(r.eventManager,e),t.length&&r.bo._r(t),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Im(t,e,n){const r=tu(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Co.get(e),s=i&&i.key;if(s){let t=new rl(ku.comparator);t=t.insert(s,$u.newNoDocument(s,au.min()));const n=pl().add(s),i=new yl(au.min(),new Map,new ol(ru),t,n);await wm(r,i),r.Do=r.Do.remove(s),r.Co.delete(e),Am(r)}else await Xf(r.localStore,e,!1).then((()=>km(r,e,n))).catch(If)}async function _m(t,e){const n=tu(t),r=e.batch.batchId;try{const t=await function(t,e){const n=tu(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(t=>{const r=e.batch.keys(),i=n.Fn.newChangeBuffer({trackRemovals:!0});return function(t,e,n,r){const i=n.batch,s=i.keys();let o=Rd.resolve();return s.forEach((t=>{o=o.next((()=>r.getEntry(e,t))).next((e=>{const s=n.docVersions.get(t);Zc(null!==s),e.version.compareTo(s)<0&&(i.applyToRemoteDocument(e,n),e.isValidDocument()&&r.addEntry(e,n.commitVersion))}))})),o.next((()=>t._n.removeMutationBatch(e,i)))}(n,t,e,i).next((()=>i.apply(t))).next((()=>n._n.performConsistencyCheck(t))).next((()=>n.Mn.pn(t,r)))}))}(n.localStore,e);Sm(n,r,null),Em(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Dm(n,t)}catch(i){await If(i)}}async function Tm(t,e,n){const r=tu(t);try{const t=await function(t,e){const n=tu(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",(t=>{let r;return n._n.lookupMutationBatch(t,e).next((e=>(Zc(null!==e),r=e.keys(),n._n.removeMutationBatch(t,e)))).next((()=>n._n.performConsistencyCheck(t))).next((()=>n.Mn.pn(t,r)))}))}(r.localStore,e);Sm(r,e,n),Em(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Dm(r,t)}catch(i){await If(i)}}function Em(t,e){(t.ko.get(e)||[]).forEach((t=>{t.resolve()})),t.ko.delete(e)}function Sm(t,e,n){const r=tu(t);let i=r.xo[r.currentUser.toKey()];if(i){const t=i.get(e);t&&(n?t.reject(n):t.resolve(),i=i.remove(e)),r.xo[r.currentUser.toKey()]=i}}function km(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Vo.get(e))t.vo.delete(r),n&&t.bo.Mo(r,n);t.Vo.delete(e),t.isPrimaryClient&&t.No.Zn(e).forEach((e=>{t.No.containsKey(e)||Cm(t,e)}))}function Cm(t,e){t.So.delete(e.path.canonicalString());const n=t.Do.get(e);null!==n&&(Np(t.remoteStore,n),t.Do=t.Do.remove(e),t.Co.delete(n),Am(t))}function Rm(t,e,n){for(const r of n)r instanceof lm?(t.No.addReference(r.key,e),Nm(t,r)):r instanceof dm?(Wc("SyncEngine","Document no longer in limbo: "+r.key),t.No.removeReference(r.key,e),t.No.containsKey(r.key)||Cm(t,r.key)):Jc()}function Nm(t,e){const n=e.key,r=n.path.canonicalString();t.Do.get(n)||t.So.has(r)||(Wc("SyncEngine","New document in limbo: "+n),t.So.add(r),Am(t))}function Am(t){for(;t.So.size>0&&t.Do.size<t.maxConcurrentLimboResolutions;){const e=t.So.values().next().value;t.So.delete(e);const n=new ku(du.fromString(e)),r=t.$o.next();t.Co.set(r,new mm(n)),t.Do=t.Do.insert(n,r),Rp(t.remoteStore,new $d(ph(hh(n.path)),r,2,jc.o))}}async function Dm(t,e,n){const r=tu(t),i=[],s=[],o=[];r.vo.isEmpty()||(r.vo.forEach(((t,a)=>{o.push(r.Fo(a,e,n).then((t=>{if(t){r.isPrimaryClient&&r.sharedClientState.updateQueryState(a.targetId,t.fromCache?"not-current":"current"),i.push(t);const e=$f.vn(a.targetId,t);s.push(e)}})))})),await Promise.all(o),r.bo._r(i),await async function(t,e){const n=tu(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(t=>Rd.forEach(e,(e=>Rd.forEach(e.Pn,(r=>n.persistence.referenceDelegate.addReference(t,e.targetId,r))).next((()=>Rd.forEach(e.bn,(r=>n.persistence.referenceDelegate.removeReference(t,e.targetId,r)))))))))}catch(r){if(!Od(r))throw r;Wc("LocalStore","Failed to update sequence numbers: "+r)}for(const i of e){const t=i.targetId;if(!i.fromCache){const e=n.kn.get(t),r=e.snapshotVersion,i=e.withLastLimboFreeSnapshotVersion(r);n.kn=n.kn.insert(t,i)}}}(r.localStore,s))}async function xm(t,e){const n=tu(t);if(!n.currentUser.isEqual(e)){Wc("SyncEngine","User change. New user:",e.toKey());const t=await Hf(n.localStore,e);n.currentUser=e,(r=n).ko.forEach((t=>{t.forEach((t=>{t.reject(new Kc(zc.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))}))})),r.ko.clear(),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await Dm(n,t.Ln)}var r}function Om(t,e){const n=tu(t),r=n.Co.get(e);if(r&&r.Po)return pl().add(r.key);{let t=pl();const r=n.Vo.get(e);if(!r)return t;for(const e of r){const r=n.vo.get(e);t=t.unionWith(r.view.wo)}return t}}function Lm(t){const e=tu(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=_m.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Tm.bind(null,e),e}class Pm{constructor(){this.synchronizeTabs=!1}async initialize(t){this.R=vp(t.databaseInfo.databaseId),this.sharedClientState=this.Bo(t),this.persistence=this.Uo(t),await this.persistence.start(),this.gcScheduler=this.qo(t),this.localStore=this.Ko(t)}qo(t){return null}Ko(t){return Kf(this.persistence,new jf,t.initialUser,this.R)}Uo(t){return new op(cp.Ps,this.R)}Bo(t){return new lp}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class Mm extends Pm{constructor(t,e,n){super(),this.Qo=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await Jf(this.localStore),await this.Qo.initialize(this,t),await Lm(this.Qo.syncEngine),await Bp(this.Qo.remoteStore)}Ko(t){return Kf(this.persistence,new jf,t.initialUser,this.R)}qo(t){const e=this.persistence.referenceDelegate.garbageCollector;return new Ef(e,t.asyncQueue)}Uo(t){const e=function(t,e){let n=t.projectId;return t.isDefaultDatabase||(n+="."+t.database),"firestore/"+e+"/"+n+"/"}(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?cf.withCacheSize(this.cacheSizeBytes):cf.DEFAULT;return new Ff(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,"undefined"!=typeof window?window:null,yp(),this.R,this.sharedClientState,!!this.forceOwnership)}Bo(t){return new lp}}class Um{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>bm(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=xm.bind(null,this.syncEngine),await async function(t,e){const n=tu(t);e?(n.Fr.delete(2),await kp(n)):e||(n.Fr.add(2),await Cp(n),n.Br.set("Unknown"))}(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new im}createDatastore(t){const e=vp(t.databaseInfo.databaseId),n=(r=t.databaseInfo,new gp(r));var r,i;return i=t.credentials,new Tp(i,n,e)}createRemoteStore(t){return e=this.localStore,n=this.datastore,r=t.asyncQueue,i=t=>bm(this.syncEngine,t,0),s=fp.gt()?new fp:new dp,new Sp(e,n,r,i,s);var e,n,r,i,s}createSyncEngine(t,e){return function(t,e,n,r,i,s,o){const a=new gm(t,e,n,r,i,s);return o&&(a.Oo=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}terminate(){return async function(t){const e=tu(t);Wc("RemoteStore","RemoteStore shutting down."),e.Fr.add(5),await Cp(e),e.Lr.shutdown(),e.Br.set("Unknown")}(this.remoteStore)}}
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
 */class Fm{constructor(t){this.observer=t,this.muted=!1}next(t){this.observer.next&&this.jo(this.observer.next,t)}error(t){this.observer.error?this.jo(this.observer.error,t):console.error("Uncaught Error in snapshot listener:",t)}Wo(){this.muted=!0}jo(t,e){this.muted||setTimeout((()=>{this.muted||t(e)}),0)}}
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
 */class Vm{constructor(t,e,n){this.credentials=t,this.asyncQueue=e,this.databaseInfo=n,this.user=up.UNAUTHENTICATED,this.clientId=nu.u(),this.credentialListener=()=>Promise.resolve(),this.credentials.setChangeListener(e,(async t=>{Wc("FirestoreClient","Received user=",t.uid),await this.credentialListener(t),this.user=t}))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,credentials:this.credentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.credentialListener=t}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new Kc(zc.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Cd;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.credentials.removeChangeListener(),t.resolve()}catch(e){const n=Zp(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function qm(t,e){t.asyncQueue.verifyOperationInProgress(),Wc("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener((async t=>{r.isEqual(t)||(await Hf(e.localStore,t),r=t)})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t.offlineComponents=e}async function Bm(t,e){t.asyncQueue.verifyOperationInProgress();const n=await async function(t){return t.offlineComponents||(Wc("FirestoreClient","Using default OfflineComponentProvider"),await qm(t,new Pm)),t.offlineComponents}(t);Wc("FirestoreClient","Initializing OnlineComponentProvider");const r=await t.getConfiguration();await e.initialize(n,r),t.setCredentialChangeListener((t=>async function(t,e){const n=tu(t);n.asyncQueue.verifyOperationInProgress(),Wc("RemoteStore","RemoteStore received new credentials");const r=Lp(n);n.Fr.add(3),await Cp(n),r&&n.Br.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Fr.delete(3),await kp(n)}(e.remoteStore,t))),t.onlineComponents=e}async function $m(t){return t.onlineComponents||(Wc("FirestoreClient","Using default OnlineComponentProvider"),await Bm(t,new Um)),t.onlineComponents}async function jm(t){const e=await $m(t),n=e.eventManager;return n.onListen=ym.bind(null,e.syncEngine),n.onUnlisten=vm.bind(null,e.syncEngine),n}class zm{constructor(t,e,n,r,i,s,o,a){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=o,this.useFetchStreams=a}}class Km{constructor(t,e){this.projectId=t,this.database=e||"(default)"}get isDefaultDatabase(){return"(default)"===this.database}isEqual(t){return t instanceof Km&&t.projectId===this.projectId&&t.database===this.database}}
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
 */const Hm=new Map;
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
 */class Gm{constructor(t,e){this.user=e,this.type="OAuth",this.authHeaders={},this.authHeaders.Authorization=`Bearer ${t}`}}class Wm{constructor(){this.changeListener=null}getToken(){return Promise.resolve(null)}invalidateToken(){}setChangeListener(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(up.UNAUTHENTICATED)))}removeChangeListener(){this.changeListener=null}}class Qm{constructor(t){this.currentUser=up.UNAUTHENTICATED,this.oc=new Cd,this.cc=0,this.forceRefresh=!1,this.auth=null,this.asyncQueue=null,this.uc=()=>{this.cc++,this.currentUser=this.ac(),this.oc.resolve(),this.changeListener&&this.asyncQueue.enqueueRetryable((()=>this.changeListener(this.currentUser)))};const e=t=>{Wc("FirebaseCredentialsProvider","Auth detected"),this.auth=t,this.auth.addAuthTokenListener(this.uc)};t.onInit((t=>e(t))),setTimeout((()=>{if(!this.auth){const n=t.getImmediate({optional:!0});n?e(n):(Wc("FirebaseCredentialsProvider","Auth not yet detected"),this.oc.resolve())}}),0)}getToken(){const t=this.cc,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((e=>this.cc!==t?(Wc("FirebaseCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(Zc("string"==typeof e.accessToken),new Gm(e.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}setChangeListener(t,e){this.asyncQueue=t,this.asyncQueue.enqueueRetryable((async()=>{await this.oc.promise,await e(this.currentUser),this.changeListener=e}))}removeChangeListener(){this.auth&&this.auth.removeAuthTokenListener(this.uc),this.changeListener=()=>Promise.resolve()}ac(){const t=this.auth&&this.auth.getUid();return Zc(null===t||"string"==typeof t),new up(t)}}class Xm{constructor(t,e,n){this.hc=t,this.lc=e,this.fc=n,this.type="FirstParty",this.user=up.FIRST_PARTY}get authHeaders(){const t={"X-Goog-AuthUser":this.lc},e=this.hc.auth.getAuthHeaderValueForFirstParty([]);return e&&(t.Authorization=e),this.fc&&(t["X-Goog-Iam-Authorization-Token"]=this.fc),t}}class Ym{constructor(t,e,n){this.hc=t,this.lc=e,this.fc=n}getToken(){return Promise.resolve(new Xm(this.hc,this.lc,this.fc))}setChangeListener(t,e){t.enqueueRetryable((()=>e(up.FIRST_PARTY)))}removeChangeListener(){}invalidateToken(){}}
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
 */function Jm(t,e,n){if(!n)throw new Kc(zc.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function Zm(t){if(!ku.isDocumentKey(t))throw new Kc(zc.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function tg(t){if(ku.isDocumentKey(t))throw new Kc(zc.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function eg(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const e=function(t){if(t.constructor){const e=/function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());if(e&&e.length>1)return e[1]}return null}(t);return e?`a custom ${e} object`:"an object"}}return"function"==typeof t?"a function":Jc()}function ng(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Kc(zc.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=eg(t);throw new Kc(zc.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}
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
 */class rg{constructor(t){var e;if(void 0===t.host){if(void 0!==t.ssl)throw new Kc(zc.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=null===(e=t.ssl)||void 0===e||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,void 0===t.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new Kc(zc.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.useFetchStreams=!!t.useFetchStreams,function(t,e,n,r){if(!0===e&&!0===r)throw new Kc(zc.INVALID_ARGUMENT,"experimentalForceLongPolling and experimentalAutoDetectLongPolling cannot be used together.")}(0,t.experimentalForceLongPolling,0,t.experimentalAutoDetectLongPolling)}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}
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
 */class ig{constructor(t,e){this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new rg({}),this._settingsFrozen=!1,t instanceof Km?(this._databaseId=t,this._credentials=new Wm):(this._app=t,this._databaseId=function(t){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new Kc(zc.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Km(t.options.projectId)}(t),this._credentials=new Qm(e))}get app(){if(!this._app)throw new Kc(zc.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new Kc(zc.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new rg(t),void 0!==t.credentials&&(this._credentials=function(t){if(!t)return new Wm;switch(t.type){case"gapi":const e=t.client;return Zc(!("object"!=typeof e||null===e||!e.auth||!e.auth.getAuthHeaderValueForFirstParty)),new Ym(e,t.sessionIndex||"0",t.iamToken||null);case"provider":return t.client;default:throw new Kc(zc.INVALID_ARGUMENT,"makeCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=Hm.get(t);e&&(Wc("ComponentProvider","Removing Datastore"),Hm.delete(t),e.terminate())}(this),Promise.resolve()}}
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
 */class sg{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ag(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new sg(this.firestore,t,this._key)}}class og{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new og(this.firestore,t,this._query)}}class ag extends og{constructor(t,e,n){super(t,e,hh(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new sg(this.firestore,null,new ku(t))}withConverter(t){return new ag(this.firestore,t,this._path)}}function cg(t,e,...n){if(t=pe(t),Jm("collection","path",e),t instanceof ig){const r=du.fromString(e,...n);return tg(r),new ag(t,null,r)}{if(!(t instanceof sg||t instanceof ag))throw new Kc(zc.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=du.fromString(t.path,...n).child(du.fromString(e));return tg(r),new ag(t.firestore,null,r)}}function ug(t,e,...n){if(t=pe(t),1===arguments.length&&(e=nu.u()),Jm("doc","path",e),t instanceof ig){const r=du.fromString(e,...n);return Zm(r),new sg(t,null,new ku(r))}{if(!(t instanceof sg||t instanceof ag))throw new Kc(zc.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(du.fromString(e,...n));return Zm(r),new sg(t.firestore,t instanceof ag?t.converter:null,new ku(r))}}
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
 */class hg{constructor(){this.dc=Promise.resolve(),this.wc=[],this._c=!1,this.mc=[],this.gc=null,this.yc=!1,this.Ec=[],this.Zi=new wp(this,"async_queue_retry"),this.Tc=()=>{const t=yp();t&&Wc("AsyncQueue","Visibility state changed to "+t.visibilityState),this.Zi.Gi()};const t=yp();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.Tc)}get isShuttingDown(){return this._c}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Ic(),this.Ac(t)}enterRestrictedMode(){if(!this._c){this._c=!0;const t=yp();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Tc)}}enqueue(t){return this.Ic(),this._c?new Promise((t=>{})):this.Ac(t)}enqueueRetryable(t){this.enqueueAndForget((()=>(this.wc.push(t),this.Rc())))}async Rc(){if(0!==this.wc.length){try{await this.wc[0](),this.wc.shift(),this.Zi.reset()}catch(t){if(!Od(t))throw t;Wc("AsyncQueue","Operation failed with retryable error: "+t)}this.wc.length>0&&this.Zi.ji((()=>this.Rc()))}}Ac(t){const e=this.dc.then((()=>(this.yc=!0,t().catch((t=>{throw this.gc=t,this.yc=!1,Qc("INTERNAL UNHANDLED ERROR: ",function(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}(t)),t})).then((t=>(this.yc=!1,t))))));return this.dc=e,e}enqueueAfterDelay(t,e,n){this.Ic(),this.Ec.indexOf(t)>-1&&(e=0);const r=Jp.createAndSchedule(this,t,e,n,(t=>this.Pc(t)));return this.mc.push(r),r}Ic(){this.gc&&Jc()}verifyOperationInProgress(){}async bc(){let t;do{t=this.dc,await t}while(t!==this.dc)}vc(t){for(const e of this.mc)if(e.timerId===t)return!0;return!1}Vc(t){return this.bc().then((()=>{this.mc.sort(((t,e)=>t.targetTimeMs-e.targetTimeMs));for(const e of this.mc)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.bc()}))}Sc(t){this.Ec.push(t)}Pc(t){const e=this.mc.indexOf(t);this.mc.splice(e,1)}}function lg(t){return function(t,e){if("object"!=typeof t||null===t)return!1;const n=t;for(const r of["next","error","complete"])if(r in n&&"function"==typeof n[r])return!0;return!1}(t)}class dg extends ig{constructor(t,e){super(t,e),this.type="firestore",this._queue=new hg,this._persistenceKey="name"in t?t.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||mg(this),this._firestoreClient.terminate()}}function fg(t=Fe()){return Le(t,"firestore-exp").getImmediate()}function pg(t){return t._firestoreClient||mg(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function mg(t){var e;const n=t._freezeSettings(),r=(i=t._databaseId,s=(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",o=t._persistenceKey,new zm(i,s,o,(a=n).host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams));var i,s,o,a;t._firestoreClient=new Vm(t._credentials,t._queue,r)}function gg(t,e){!function(t){if(t._initialized||t._terminated)throw new Kc(zc.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")}
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
 */(t=ng(t,dg));const n=pg(t),r=t._freezeSettings(),i=new Um;return function(t,e,n){const r=new Cd;return t.asyncQueue.enqueue((async()=>{try{await qm(t,n),await Bm(t,e),r.resolve()}catch(s){if(!("FirebaseError"===(i=s).name?i.code===zc.FAILED_PRECONDITION||i.code===zc.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&i instanceof DOMException)||22===i.code||20===i.code||11===i.code))throw s;console.warn("Error enabling offline persistence. Falling back to persistence disabled: "+s),r.reject(s)}var i})).then((()=>r.promise))}(n,i,new Mm(i,r.cacheSizeBytes,null==e?void 0:e.forceOwnership))}class yg{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new Kc(zc.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new pu(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
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
 */class vg{constructor(t){this._byteString=t}static fromBase64String(t){try{return new vg(gu.fromBase64String(t))}catch(e){throw new Kc(zc.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new vg(gu.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
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
 */class wg{constructor(t){this._methodName=t}}
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
 */class bg{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new Kc(zc.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new Kc(zc.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return ru(this._lat,t._lat)||ru(this._long,t._long)}}
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
 */const Ig=/^__.*__$/;class _g{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new Gh(t,this.data,this.fieldMask,e,this.fieldTransforms):new Hh(t,this.data,e,this.fieldTransforms)}}function Tg(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Jc()}}class Eg{constructor(t,e,n,r,i,s){this.settings=t,this.databaseId=e,this.R=n,this.ignoreUndefinedProperties=r,void 0===i&&this.Dc(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get Cc(){return this.settings.Cc}Nc(t){return new Eg(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.R,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}xc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.Nc({path:n,kc:!1});return r.$c(t),r}Oc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.Nc({path:n,kc:!1});return r.Dc(),r}Fc(t){return this.Nc({path:void 0,kc:!0})}Mc(t){return Pg(t,this.settings.methodName,this.settings.Lc||!1,this.path,this.settings.Bc)}contains(t){return void 0!==this.fieldMask.find((e=>t.isPrefixOf(e)))||void 0!==this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))}Dc(){if(this.path)for(let t=0;t<this.path.length;t++)this.$c(this.path.get(t))}$c(t){if(0===t.length)throw this.Mc("Document fields must not be empty");if(Tg(this.Cc)&&Ig.test(t))throw this.Mc('Document fields cannot begin and end with "__"')}}class Sg{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.R=n||vp(t)}Uc(t,e,n,r=!1){return new Eg({Cc:t,methodName:e,Bc:n,path:pu.emptyPath(),kc:!1,Lc:r},this.databaseId,this.R,this.ignoreUndefinedProperties)}}function kg(t){const e=t._freezeSettings(),n=vp(t._databaseId);return new Sg(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Cg(t,e,n,r,i,s={}){const o=t.Uc(s.merge||s.mergeFields?2:0,e,n,i);Dg("Data must be an object, but it was:",o,r);const a=Ng(r,o);let c,u;if(s.merge)c=new mu(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){const t=[];for(const r of s.mergeFields){const i=xg(e,r,n);if(!o.contains(i))throw new Kc(zc.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);Mg(t,i)||t.push(i)}c=new mu(t),u=o.fieldTransforms.filter((t=>c.covers(t.field)))}else c=null,u=o.fieldTransforms;return new _g(new qu(a),c,u)}function Rg(t,e){if(Ag(t=pe(t)))return Dg("Unsupported field value:",e,t),Ng(t,e);if(t instanceof wg)return function(t,e){if(!Tg(e.Cc))throw e.Mc(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.Mc(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.kc&&4!==e.Cc)throw e.Mc("Nested arrays are not supported");return function(t,e){const n=[];let r=0;for(const i of t){let t=Rg(i,e.Fc(r));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),r++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=pe(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return Th(e.R,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=ou.fromDate(t);return{timestampValue:Nl(e.R,n)}}if(t instanceof ou){const n=new ou(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:Nl(e.R,n)}}if(t instanceof bg)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof vg)return{bytesValue:Al(e.R,t._byteString)};if(t instanceof sg){const n=e.databaseId,r=t.firestore._databaseId;if(!r.isEqual(n))throw e.Mc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Ol(t.firestore._databaseId||e.databaseId,t._key.path)}}throw e.Mc(`Unsupported field value: ${eg(t)}`)}(t,e)}function Ng(t,e){const n={};return hu(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):uu(t,((t,r)=>{const i=Rg(r,e.xc(t));null!=i&&(n[t]=i)})),{mapValue:{fields:n}}}function Ag(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof ou||t instanceof bg||t instanceof vg||t instanceof sg||t instanceof wg)}function Dg(t,e,n){if(!Ag(n)||("object"!=typeof(r=n)||null===r||Object.getPrototypeOf(r)!==Object.prototype&&null!==Object.getPrototypeOf(r))){const r=eg(n);throw"an object"===r?e.Mc(t+" a custom object"):e.Mc(t+" "+r)}var r}function xg(t,e,n){if((e=pe(e))instanceof yg)return e._internalPath;if("string"==typeof e)return Lg(t,e);throw Pg("Field path arguments must be of type string or FieldPath.",t,!1,void 0,n)}const Og=new RegExp("[~\\*/\\[\\]]");function Lg(t,e,n){if(e.search(Og)>=0)throw Pg(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new yg(...e.split("."))._internalPath}catch(r){throw Pg(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Pg(t,e,n,r,i){const s=r&&!r.isEmpty(),o=void 0!==i;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new Kc(zc.INVALID_ARGUMENT,a+t+c)}function Mg(t,e){return t.some((t=>t.isEqual(e)))}
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
 */class Ug{constructor(t,e,n,r,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new sg(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new Fg(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Vg("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class Fg extends Ug{data(){return super.data()}}function Vg(t,e){return"string"==typeof e?Lg(t,e):e instanceof yg?e._internalPath:e._delegate._internalPath}
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
 */class qg{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Bg extends Ug{constructor(t,e,n,r,i,s){super(t,e,n,r,s),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new $g(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Vg("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class $g extends Bg{data(t={}){return super.data(t)}}class jg{constructor(t,e,n,r){this._firestore=t,this._userDataWriter=e,this._snapshot=r,this.metadata=new qg(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(t,e){this._snapshot.docs.forEach((n=>{t.call(e,new $g(this._firestore,this._userDataWriter,n.key,n,new qg(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new Kc(zc.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(t,e){if(t._snapshot.oldDocs.isEmpty()){let e=0;return t._snapshot.docChanges.map((n=>({type:"added",doc:new $g(t._firestore,t._userDataWriter,n.doc.key,n.doc,new qg(t._snapshot.mutatedKeys.has(n.doc.key),t._snapshot.fromCache),t.query.converter),oldIndex:-1,newIndex:e++})))}{let n=t._snapshot.oldDocs;return t._snapshot.docChanges.filter((t=>e||3!==t.type)).map((e=>{const r=new $g(t._firestore,t._userDataWriter,e.doc.key,e.doc,new qg(t._snapshot.mutatedKeys.has(e.doc.key),t._snapshot.fromCache),t.query.converter);let i=-1,s=-1;return 0!==e.type&&(i=n.indexOf(e.doc.key),n=n.delete(e.doc.key)),1!==e.type&&(n=n.add(e.doc),s=n.indexOf(e.doc.key)),{type:zg(e.type),doc:r,oldIndex:i,newIndex:s}}))}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function zg(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Jc()}}
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
function Kg(t){t=ng(t,sg);const e=ng(t.firestore,dg);return function(t,e,n={}){const r=new Cd;return t.asyncQueue.enqueueAndForget((async()=>function(t,e,n,r,i){const s=new Fm({next:s=>{e.enqueueAndForget((()=>om(t,o)));const a=s.docs.has(n);!a&&s.fromCache?i.reject(new Kc(zc.UNAVAILABLE,"Failed to get document because the client is offline.")):a&&s.fromCache&&r&&"server"===r.source?i.reject(new Kc(zc.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(s)},error:t=>i.reject(t)}),o=new hm(hh(n.path),s,{includeMetadataChanges:!0,so:!0});return sm(t,o)}(await jm(t),t.asyncQueue,e,n,r))),r.promise}(pg(e),t._key).then((n=>Qg(e,t,n)))}class Hg extends
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
class{convertValue(t,e="none"){switch(Cu(t)){case 0:return null;case 1:return t.booleanValue;case 2:return wu(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(bu(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 10:return this.convertObject(t.mapValue,e);default:throw Jc()}}convertObject(t,e){const n={};return uu(t.fields,((t,r)=>{n[t]=this.convertValue(r,e)})),n}convertGeoPoint(t){return new bg(wu(t.latitude),wu(t.longitude))}convertArray(t,e){return(t.values||[]).map((t=>this.convertValue(t,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=_u(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(Tu(t));default:return null}}convertTimestamp(t){const e=vu(t);return new ou(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=du.fromString(t);Zc(rd(n));const r=new Km(n.get(1),n.get(3)),i=new ku(n.popFirst(5));return r.isEqual(e)||Qc(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}
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
 */{constructor(t){super(),this.firestore=t}convertBytes(t){return new vg(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new sg(this.firestore,null,e)}}function Gg(t,e,n){t=ng(t,sg);const r=ng(t.firestore,dg),i=function(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}(t.converter,e,n);return function(t,e){return function(t,e){const n=new Cd;return t.asyncQueue.enqueueAndForget((async()=>async function(e,n,r){const i=Lm(e);try{const t=await function(t,e){const n=tu(t),r=ou.now(),i=e.reduce(((t,e)=>t.add(e.key)),pl());let s;return n.persistence.runTransaction("Locally write mutations","readwrite",(t=>n.Mn.pn(t,i).next((i=>{s=i;const o=[];for(const t of e){const e=jh(t,s.get(t.key));null!=e&&o.push(new Gh(t.key,e,Bu(e.value.mapValue),Fh.exists(!0)))}return n._n.addMutationBatch(t,r,o,e)})))).then((t=>(t.applyToLocalDocumentSet(s),{batchId:t.batchId,changes:s})))}(i.localStore,n);i.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let r=t.xo[t.currentUser.toKey()];r||(r=new rl(ru)),r=r.insert(e,n),t.xo[t.currentUser.toKey()]=r}(i,t.batchId,r),await Dm(i,t.changes),await Bp(i.remoteStore)}catch(t){const n=Zp(t,"Failed to persist write");r.reject(n)}}(await function(t){return $m(t).then((t=>t.syncEngine))}(t),e,n))),n.promise}(pg(t),e)}(r,[Cg(kg(r),"setDoc",t._key,i,null!==t.converter,n).toMutation(t._key,Fh.none())])}function Wg(t,...e){var n,r,i;t=pe(t);let s={includeMetadataChanges:!1},o=0;"object"!=typeof e[o]||lg(e[o])||(s=e[o],o++);const a={includeMetadataChanges:s.includeMetadataChanges};if(lg(e[o])){const t=e[o];e[o]=null===(n=t.next)||void 0===n?void 0:n.bind(t),e[o+1]=null===(r=t.error)||void 0===r?void 0:r.bind(t),e[o+2]=null===(i=t.complete)||void 0===i?void 0:i.bind(t)}let c,u,h;if(t instanceof sg)u=ng(t.firestore,dg),h=hh(t._key.path),c={next:n=>{e[o]&&e[o](Qg(u,t,n))},error:e[o+1],complete:e[o+2]};else{const n=ng(t,og);u=ng(n.firestore,dg),h=n._query;const r=new Hg(u);c={next:t=>{e[o]&&e[o](new jg(u,r,n,t))},error:e[o+1],complete:e[o+2]},function(t){if(dh(t)&&0===t.explicitOrderBy.length)throw new Kc(zc.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}(t._query)}return function(t,e,n,r){const i=new Fm(r),s=new hm(e,i,n);return t.asyncQueue.enqueueAndForget((async()=>sm(await jm(t),s))),()=>{i.Wo(),t.asyncQueue.enqueueAndForget((async()=>om(await jm(t),s)))}}(pg(u),h,a,c)}function Qg(t,e,n){const r=n.docs.get(e._key),i=new Hg(t);return new Bg(t,i,e._key,r,new qg(n.hasPendingWrites,n.fromCache),e.converter)}function Xg(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}function Yg(t){const e=t-1;return e*e*e+1}function Jg(t,{delay:n=0,duration:r=400,easing:i=e}={}){const s=+getComputedStyle(t).opacity;return{delay:n,duration:r,easing:i,css:t=>"opacity: "+t*s}}function Zg(t,{delay:e=0,duration:n=400,easing:r=Yg,x:i=0,y:s=0,opacity:o=0}={}){const a=getComputedStyle(t),c=+a.opacity,u="none"===a.transform?"":a.transform,h=c*(1-o);return{delay:e,duration:n,easing:r,css:(t,e)=>`\n\t\t\ttransform: ${u} translate(${(1-t)*i}px, ${(1-t)*s}px);\n\t\t\topacity: ${c-h*e}`}}function ty(t,{delay:e=0,speed:n,duration:r,easing:i=Xg}={}){const s=t.getTotalLength();return void 0===r?r=void 0===n?800:s/n:"function"==typeof r&&(r=r(s)),{delay:e,duration:r,easing:i,css:(t,e)=>`stroke-dasharray: ${t*s} ${e*s}`}}
/*!
 * Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */$c="9.0.0-beta.6",Oe(new me("firestore-exp",((t,{options:e})=>{const n=t.getProvider("app-exp").getImmediate(),r=new dg(n,t.getProvider("auth-internal"));return e=Object.assign({useFetchStreams:!1},e),r._setSettings(e),r}),"PUBLIC")),Ve("@firebase/firestore","0.0.900-exp.f43d0c698",undefined);var ey={prefix:"fas",iconName:"bars",icon:[448,512,[],"f0c9","M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"]},ny={prefix:"fas",iconName:"cog",icon:[512,512,[],"f013","M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"]},ry={prefix:"fas",iconName:"football-ball",icon:[496,512,[],"f44e","M481.5 60.3c-4.8-18.2-19.1-32.5-37.3-37.4C420.3 16.5 383 8.9 339.4 8L496 164.8c-.8-43.5-8.2-80.6-14.5-104.5zm-467 391.4c4.8 18.2 19.1 32.5 37.3 37.4 23.9 6.4 61.2 14 104.8 14.9L0 347.2c.8 43.5 8.2 80.6 14.5 104.5zM4.2 283.4L220.4 500c132.5-19.4 248.8-118.7 271.5-271.4L275.6 12C143.1 31.4 26.8 130.7 4.2 283.4zm317.3-123.6c3.1-3.1 8.2-3.1 11.3 0l11.3 11.3c3.1 3.1 3.1 8.2 0 11.3l-28.3 28.3 28.3 28.3c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0l-28.3-28.3-22.6 22.7 28.3 28.3c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0L248 278.6l-22.6 22.6 28.3 28.3c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0l-28.3-28.3-28.3 28.3c-3.1 3.1-8.2 3.1-11.3 0l-11.3-11.3c-3.1-3.1-3.1-8.2 0-11.3l28.3-28.3-28.3-28.2c-3.1-3.1-3.1-8.2 0-11.3l11.3-11.3c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3 22.6-22.6-28.3-28.3c-3.1-3.1-3.1-8.2 0-11.3l11.3-11.3c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3 22.6-22.6-28.3-28.3c-3.1-3.1-3.1-8.2 0-11.3l11.3-11.3c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3 28.3-28.5z"]},iy={prefix:"fas",iconName:"user-circle",icon:[496,512,[],"f2bd","M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"]};function sy(t){let e,n,r,i;function s(t,e){return"string"==typeof t[8][4]?ay:oy}let o=s(t),a=o(t);return{c(){e=x("svg"),n=x("g"),r=x("g"),a.c(),this.h()},l(t){e=$(t,"svg",{id:!0,class:!0,style:!0,viewBox:!0,"aria-hidden":!0,role:!0,xmlns:!0},1);var i=q(e);n=$(i,"g",{transform:!0},1);var s=q(n);r=$(s,"g",{transform:!0},1);var o=q(r);a.l(o),o.forEach(N),s.forEach(N),i.forEach(N),this.h()},h(){V(r,"transform",t[10]),V(n,"transform","translate(256 256)"),V(e,"id",t[1]),V(e,"class",t[0]),V(e,"style",t[9]),V(e,"viewBox",i=`0 0 ${t[8][0]} ${t[8][1]}`),V(e,"aria-hidden","true"),V(e,"role","img"),V(e,"xmlns","http://www.w3.org/2000/svg")},m(t,i){R(t,e,i),C(e,n),C(n,r),a.m(r,null)},p(t,n){o===(o=s(t))&&a?a.p(t,n):(a.d(1),a=o(t),a&&(a.c(),a.m(r,null))),1024&n&&V(r,"transform",t[10]),2&n&&V(e,"id",t[1]),1&n&&V(e,"class",t[0]),512&n&&V(e,"style",t[9]),256&n&&i!==(i=`0 0 ${t[8][0]} ${t[8][1]}`)&&V(e,"viewBox",i)},d(t){t&&N(e),a.d()}}}function oy(t){let e,n,r,i,s,o,a,c;return{c(){e=x("path"),s=x("path"),this.h()},l(t){e=$(t,"path",{d:!0,fill:!0,"fill-opacity":!0,transform:!0},1),q(e).forEach(N),s=$(t,"path",{d:!0,fill:!0,"fill-opacity":!0,transform:!0},1),q(s).forEach(N),this.h()},h(){V(e,"d",n=t[8][4][0]),V(e,"fill",r=t[4]||t[2]||"currentColor"),V(e,"fill-opacity",i=0!=t[7]?t[5]:t[6]),V(e,"transform","translate(-256 -256)"),V(s,"d",o=t[8][4][1]),V(s,"fill",a=t[3]||t[2]||"currentColor"),V(s,"fill-opacity",c=0!=t[7]?t[6]:t[5]),V(s,"transform","translate(-256 -256)")},m(t,n){R(t,e,n),R(t,s,n)},p(t,u){256&u&&n!==(n=t[8][4][0])&&V(e,"d",n),20&u&&r!==(r=t[4]||t[2]||"currentColor")&&V(e,"fill",r),224&u&&i!==(i=0!=t[7]?t[5]:t[6])&&V(e,"fill-opacity",i),256&u&&o!==(o=t[8][4][1])&&V(s,"d",o),12&u&&a!==(a=t[3]||t[2]||"currentColor")&&V(s,"fill",a),224&u&&c!==(c=0!=t[7]?t[6]:t[5])&&V(s,"fill-opacity",c)},d(t){t&&N(e),t&&N(s)}}}function ay(t){let e,n,r;return{c(){e=x("path"),this.h()},l(t){e=$(t,"path",{d:!0,fill:!0,transform:!0},1),q(e).forEach(N),this.h()},h(){V(e,"d",n=t[8][4]),V(e,"fill",r=t[2]||t[3]||"currentColor"),V(e,"transform","translate(-256 -256)")},m(t,n){R(t,e,n)},p(t,i){256&i&&n!==(n=t[8][4])&&V(e,"d",n),12&i&&r!==(r=t[2]||t[3]||"currentColor")&&V(e,"fill",r)},d(t){t&&N(e)}}}function cy(e){let n,r=e[8][4]&&sy(e);return{c(){r&&r.c(),n=P()},l(t){r&&r.l(t),n=P()},m(t,e){r&&r.m(t,e),R(t,n,e)},p(t,[e]){t[8][4]?r?r.p(t,e):(r=sy(t),r.c(),r.m(n.parentNode,n)):r&&(r.d(1),r=null)},i:t,o:t,d(t){r&&r.d(t),t&&N(n)}}}function uy(t,e,n){let r,i,s,{class:o=""}=e,{id:a=""}=e,{style:c=""}=e,{icon:u}=e,{fw:h=!1}=e,{flip:l=!1}=e,{pull:d=""}=e,{rotate:f=""}=e,{size:p=""}=e,{color:m=""}=e,{primaryColor:g=""}=e,{secondaryColor:y=""}=e,{primaryOpacity:v=1}=e,{secondaryOpacity:w=.4}=e,{swapOpacity:b=!1}=e;return t.$$set=t=>{"class"in t&&n(0,o=t.class),"id"in t&&n(1,a=t.id),"style"in t&&n(11,c=t.style),"icon"in t&&n(12,u=t.icon),"fw"in t&&n(13,h=t.fw),"flip"in t&&n(14,l=t.flip),"pull"in t&&n(15,d=t.pull),"rotate"in t&&n(16,f=t.rotate),"size"in t&&n(17,p=t.size),"color"in t&&n(2,m=t.color),"primaryColor"in t&&n(3,g=t.primaryColor),"secondaryColor"in t&&n(4,y=t.secondaryColor),"primaryOpacity"in t&&n(5,v=t.primaryOpacity),"secondaryOpacity"in t&&n(6,w=t.secondaryOpacity),"swapOpacity"in t&&n(7,b=t.swapOpacity)},t.$$.update=()=>{if(4096&t.$$.dirty&&n(8,r=u&&u.icon||[0,0,"",[],""]),174080&t.$$.dirty){let t,e;const r="1em";let s,o,a,u="-.125em";const l="visible";h&&(a="center",e="1.25em"),d&&(t=d),p&&("lg"==p?(o="1.33333em",s=".75em",u="-.225em"):o="xs"==p?".75em":"sm"==p?".875em":p.replace("x","em"));const f={float:t,width:e,height:r,"line-height":s,"font-size":o,"text-align":a,"vertical-align":u,overflow:l};let m="";for(const n in f)f[n]&&(m+=`${n}:${f[n]};`);n(9,i=m+c)}if(81920&t.$$.dirty){let t="";if(l){let e=1,n=1;"horizontal"==l?e=-1:"vertical"==l?n=-1:e=n=-1,t+=` scale(${e} ${n})`}f&&(t+=` rotate(${f} 0 0)`),n(10,s=t)}},[o,a,m,g,y,v,w,b,r,i,s,c,u,h,l,d,f,p]}class hy extends zt{constructor(t){super(),jt(this,t,uy,cy,a,{class:0,id:1,style:11,icon:12,fw:13,flip:14,pull:15,rotate:16,size:17,color:2,primaryColor:3,secondaryColor:4,primaryOpacity:5,secondaryOpacity:6,swapOpacity:7})}}let ly=(t=21)=>{let e="",n=crypto.getRandomValues(new Uint8Array(t));for(;t--;){let r=63&n[t];e+=r<36?r.toString(36):r<62?(r-26).toString(36).toUpperCase():r<63?"_":"-"}return e};
/*!
 * Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */var dy={prefix:"fab",iconName:"facebook",icon:[512,512,[],"f09a","M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"]};export{gt as $,it as A,n as B,Ht as C,C as D,G as E,M as F,U as G,t as H,s as I,ly as J,ot as K,f as L,F as M,m as N,x as O,mt as P,Ot as Q,ty as R,zt as S,hy as T,dy as U,d as V,Jg as W,iy as X,u as Y,ht as Z,Ut as _,q as a,g as a0,A as a1,H as a2,ey as a3,Lt as a4,ny as a5,ug as a6,Wg as a7,Jr as a8,ii as a9,l as aa,Kg as ab,Gg as ac,Hn as ad,Kn as ae,Yr as af,ri as ag,tr as ah,Ue as ai,fg as aj,oi as ak,ki as al,gg as am,cg as an,Dt as ao,xt as ap,Zg as aq,ct as ar,ry as as,W as at,X as au,V as b,$ as c,N as d,D as e,R as f,j as g,K as h,jt as i,Ft as j,L as k,P as l,Vt as m,z as n,qt as o,Pt as p,Mt as q,kt as r,a as s,O as t,Nt as u,Bt as v,Ct as w,Rt as x,at as y,st as z};
