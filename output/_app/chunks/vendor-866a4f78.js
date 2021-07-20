function t(){}const e=t=>t;function n(t,e){for(const n in e)t[n]=e[n];return t}function r(t){return t()}function s(){return Object.create(null)}function i(t){t.forEach(r)}function o(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(e,...n){if(null==e)return t;const r=e.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}function u(t){let e;return c(t,(t=>e=t))(),e}function h(t,e,n){t.$$.on_destroy.push(c(e,n))}function l(t,e,n,r){if(t){const s=d(t,e,n,r);return t[0](s)}}function d(t,e,r,s){return t[1]&&s?n(r.ctx.slice(),t[1](s(e))):r.ctx}function f(t,e,n,r,s,i,o){const a=function(t,e,n,r){if(t[2]&&r){const s=t[2](r(n));if(void 0===e.dirty)return s;if("object"==typeof s){const t=[],n=Math.max(e.dirty.length,s.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|s[r];return t}return e.dirty|s}return e.dirty}(e,r,s,i);if(a){const s=d(e,n,r,o);t.p(s,a)}}function p(t,e,n=e){return t.set(n),e}const m="undefined"!=typeof window;let g=m?()=>window.performance.now():()=>Date.now(),y=m?t=>requestAnimationFrame(t):t;const v=new Set;function w(t){v.forEach((e=>{e.c(t)||(v.delete(e),e.f())})),0!==v.size&&y(w)}function b(t){let e;return 0===v.size&&y(w),{promise:new Promise((n=>{v.add(e={c:t,f:n})})),abort(){v.delete(e)}}}let I=!1;function _(t,e,n,r){for(;t<e;){const s=t+(e-t>>1);n(s)<=r?t=s+1:e=s}return t}function T(t,e){I?(!function(t){if(t.hydrate_init)return;t.hydrate_init=!0;const e=t.childNodes,n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let s=0;for(let c=0;c<e.length;c++){const t=_(1,s+1,(t=>e[n[t]].claim_order),e[c].claim_order)-1;r[c]=n[t]+1;const i=t+1;n[i]=c,s=Math.max(i,s)}const i=[],o=[];let a=e.length-1;for(let c=n[s]+1;0!=c;c=r[c-1]){for(i.push(e[c-1]);a>=c;a--)o.push(e[a]);a--}for(;a>=0;a--)o.push(e[a]);i.reverse(),o.sort(((t,e)=>t.claim_order-e.claim_order));for(let c=0,u=0;c<o.length;c++){for(;u<i.length&&o[c].claim_order>=i[u].claim_order;)u++;const e=u<i.length?i[u]:null;t.insertBefore(o[c],e)}}(t),(void 0===t.actual_end_child||null!==t.actual_end_child&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild),e!==t.actual_end_child?t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling):e.parentNode!==t&&t.appendChild(e)}function E(t,e,n){I&&!n?T(t,e):(e.parentNode!==t||n&&e.nextSibling!==n)&&t.insertBefore(e,n||null)}function S(t){t.parentNode.removeChild(t)}function k(t){return document.createElement(t)}function C(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function R(t){return document.createTextNode(t)}function A(){return R(" ")}function N(){return R("")}function D(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function x(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function O(t){return function(e){e.target===this&&t.call(this,e)}}function L(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function P(t){return Array.from(t.childNodes)}function M(t,e,n,r,s=!1){void 0===t.claim_info&&(t.claim_info={last_index:0,total_claimed:0});const i=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const i=t[r];if(e(i))return n(i),t.splice(r,1),s||(t.claim_info.last_index=r),i}for(let r=t.claim_info.last_index-1;r>=0;r--){const i=t[r];if(e(i))return n(i),t.splice(r,1),s?t.claim_info.last_index--:t.claim_info.last_index=r,i}return r()})();return i.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,i}function U(t,e,n,r){return M(t,(t=>t.nodeName===e),(t=>{const e=[];for(let r=0;r<t.attributes.length;r++){const s=t.attributes[r];n[s.name]||e.push(s.name)}e.forEach((e=>t.removeAttribute(e)))}),(()=>r?C(e):k(e)))}function F(t,e){return M(t,(t=>3===t.nodeType),(t=>{t.data=""+e}),(()=>R(e)),!0)}function V(t){return F(t," ")}function q(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function B(t,e,n,r){t.style.setProperty(e,n,r?"important":"")}function $(t,e,n){t.classList[n?"add":"remove"](e)}function j(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}function z(t,e=document.body){return Array.from(e.querySelectorAll(t))}const K=new Set;let H,G=0;function W(t,e,n,r,s,i,o,a=0){const c=16.666/r;let u="{\n";for(let g=0;g<=1;g+=c){const t=e+(n-e)*i(g);u+=100*g+`%{${o(t,1-t)}}\n`}const h=u+`100% {${o(n,1-n)}}\n}`,l=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(h)}_${a}`,d=t.ownerDocument;K.add(d);const f=d.__svelte_stylesheet||(d.__svelte_stylesheet=d.head.appendChild(k("style")).sheet),p=d.__svelte_rules||(d.__svelte_rules={});p[l]||(p[l]=!0,f.insertRule(`@keyframes ${l} ${h}`,f.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${l} ${r}ms linear ${s}ms 1 both`,G+=1,l}function Q(t,e){const n=(t.style.animation||"").split(", "),r=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),s=n.length-r.length;s&&(t.style.animation=r.join(", "),G-=s,G||y((()=>{G||(K.forEach((t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}})),K.clear())})))}function X(t){H=t}function Y(){if(!H)throw new Error("Function called outside component initialization");return H}function J(t){Y().$$.on_mount.push(t)}function Z(t){Y().$$.after_update.push(t)}function tt(){const t=Y();return(e,n)=>{const r=t.$$.callbacks[e];if(r){const s=j(e,n);r.slice().forEach((e=>{e.call(t,s)}))}}}function et(t,e){Y().$$.context.set(t,e)}function nt(t){return Y().$$.context.get(t)}const rt=[],st=[],it=[],ot=[],at=Promise.resolve();let ct=!1;function ut(t){it.push(t)}function ht(t){ot.push(t)}let lt=!1;const dt=new Set;function ft(){if(!lt){lt=!0;do{for(let t=0;t<rt.length;t+=1){const e=rt[t];X(e),pt(e.$$)}for(X(null),rt.length=0;st.length;)st.pop()();for(let t=0;t<it.length;t+=1){const e=it[t];dt.has(e)||(dt.add(e),e())}it.length=0}while(rt.length);for(;ot.length;)ot.pop()();ct=!1,lt=!1,dt.clear()}}function pt(t){if(null!==t.fragment){t.update(),i(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(ut)}}let mt;function gt(t,e,n){t.dispatchEvent(j(`${e?"intro":"outro"}${n}`))}const yt=new Set;let vt;function wt(){vt={r:0,c:[],p:vt}}function bt(){vt.r||i(vt.c),vt=vt.p}function It(t,e){t&&t.i&&(yt.delete(t),t.i(e))}function _t(t,e,n,r){if(t&&t.o){if(yt.has(t))return;yt.add(t),vt.c.push((()=>{yt.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}const Tt={duration:0};function Et(n,r,s,a){let c=r(n,s),u=a?0:1,h=null,l=null,d=null;function f(){d&&Q(n,d)}function p(t,e){const n=t.b-u;return e*=Math.abs(n),{a:u,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function m(r){const{delay:s=0,duration:o=300,easing:a=e,tick:m=t,css:y}=c||Tt,v={start:g()+s,b:r};r||(v.group=vt,vt.r+=1),h||l?l=v:(y&&(f(),d=W(n,u,r,o,s,a,y)),r&&m(0,1),h=p(v,o),ut((()=>gt(n,r,"start"))),b((t=>{if(l&&t>l.start&&(h=p(l,o),l=null,gt(n,h.b,"start"),y&&(f(),d=W(n,u,h.b,h.duration,0,a,c.css))),h)if(t>=h.end)m(u=h.b,1-u),gt(n,h.b,"end"),l||(h.b?f():--h.group.r||i(h.group.c)),h=null;else if(t>=h.start){const e=t-h.start;u=h.a+h.d*a(e/h.duration),m(u,1-u)}return!(!h&&!l)})))}return{run(t){o(c)?(mt||(mt=Promise.resolve(),mt.then((()=>{mt=null}))),mt).then((()=>{c=c(),m(t)})):m(t)},end(){f(),h=l=null}}}function St(t,e){const n={},r={},s={$$scope:1};let i=t.length;for(;i--;){const o=t[i],a=e[i];if(a){for(const t in o)t in a||(r[t]=1);for(const t in a)s[t]||(n[t]=a[t],s[t]=1);t[i]=a}else for(const t in o)s[t]=1}for(const o in r)o in n||(n[o]=void 0);return n}function kt(t){return"object"==typeof t&&null!==t?t:{}}function Ct(t,e,n){const r=t.$$.props[e];void 0!==r&&(t.$$.bound[r]=n,n(t.$$.ctx[r]))}function Rt(t){t&&t.c()}function At(t,e){t&&t.l(e)}function Nt(t,e,n,s){const{fragment:a,on_mount:c,on_destroy:u,after_update:h}=t.$$;a&&a.m(e,n),s||ut((()=>{const e=c.map(r).filter(o);u?u.push(...e):i(e),t.$$.on_mount=[]})),h.forEach(ut)}function Dt(t,e){const n=t.$$;null!==n.fragment&&(i(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function xt(t,e){-1===t.$$.dirty[0]&&(rt.push(t),ct||(ct=!0,at.then(ft)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Ot(e,n,r,o,a,c,u=[-1]){const h=H;X(e);const l=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:a,bound:s(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(h?h.$$.context:n.context||[]),callbacks:s(),dirty:u,skip_bound:!1};let d=!1;if(l.ctx=r?r(e,n.props||{},((t,n,...r)=>{const s=r.length?r[0]:n;return l.ctx&&a(l.ctx[t],l.ctx[t]=s)&&(!l.skip_bound&&l.bound[t]&&l.bound[t](s),d&&xt(e,t)),n})):[],l.update(),d=!0,i(l.before_update),l.fragment=!!o&&o(l.ctx),n.target){if(n.hydrate){I=!0;const t=P(n.target);l.fragment&&l.fragment.l(t),t.forEach(S)}else l.fragment&&l.fragment.c();n.intro&&It(e.$$.fragment),Nt(e,n.target,n.anchor,n.customElement),I=!1,ft()}X(h)}class Lt{$destroy(){Dt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Pt=[];function Mt(e,n=t){let r;const s=[];function i(t){if(a(e,t)&&(e=t,r)){const t=!Pt.length;for(let n=0;n<s.length;n+=1){const t=s[n];t[1](),Pt.push(t,e)}if(t){for(let t=0;t<Pt.length;t+=2)Pt[t][0](Pt[t+1]);Pt.length=0}}}return{set:i,update:function(t){i(t(e))},subscribe:function(o,a=t){const c=[o,a];return s.push(c),1===s.length&&(r=n(i)||t),o(e),()=>{const t=s.indexOf(c);-1!==t&&s.splice(t,1),0===s.length&&(r(),r=null)}}}}
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
***************************************************************************** */var Ut=function(t,e){return(Ut=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};function Ft(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]])}return n}function Vt(t,e,n,r){return new(n||(n=Promise))((function(s,i){function o(t){try{c(r.next(t))}catch(e){i(e)}}function a(t){try{c(r.throw(t))}catch(e){i(e)}}function c(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,a)}c((r=r.apply(t,e||[])).next())}))}function qt(t,e){var n,r,s,i,o={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(s=2&i[0]?r.return:i[0]?r.throw||((s=r.return)&&s.call(r),0):r.next)&&!(s=s.call(r,i[1])).done)return s;switch(r=0,s&&(i=[2&i[0],s.value]),i[0]){case 0:case 1:s=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,r=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(s=o.trys,(s=s.length>0&&s[s.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!s||i[1]>s[0]&&i[1]<s[3])){o.label=i[1];break}if(6===i[0]&&o.label<s[1]){o.label=s[1],s=i;break}if(s&&o.label<s[2]){o.label=s[2],o.ops.push(i);break}s[2]&&o.ops.pop(),o.trys.pop();continue}i=e.call(t,o)}catch(a){i=[6,a],r=0}finally{n=s=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}function Bt(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function $t(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,s,i=n.call(t),o=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)o.push(r.value)}catch(a){s={error:a}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(s)throw s.error}}return o}function jt(t,e,n){if(n||2===arguments.length)for(var r,s=0,i=e.length;s<i;s++)!r&&s in e||(r||(r=Array.prototype.slice.call(e,0,s)),r[s]=e[s]);return t.concat(r||e)}
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
 */var zt={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray:function(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();for(var n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[],s=0;s<t.length;s+=3){var i=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,u=c?t[s+2]:0,h=i>>2,l=(3&i)<<4|a>>4,d=(15&a)<<2|u>>6,f=63&u;c||(f=64,o||(d=64)),r.push(n[h],n[l],n[d],n[f])}return r.join("")},encodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(function(t){for(var e=[],n=0,r=0;r<t.length;r++){var s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=63&s|128):55296==(64512&s)&&r+1<t.length&&56320==(64512&t.charCodeAt(r+1))?(s=65536+((1023&s)<<10)+(1023&t.charCodeAt(++r)),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=63&s|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=63&s|128)}return e}(t),e)},decodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):function(t){for(var e=[],n=0,r=0;n<t.length;){var s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){var i=t[n++];e[r++]=String.fromCharCode((31&s)<<6|63&i)}else if(s>239&&s<365){var o=((7&s)<<18|(63&(i=t[n++]))<<12|(63&(a=t[n++]))<<6|63&t[n++])-65536;e[r++]=String.fromCharCode(55296+(o>>10)),e[r++]=String.fromCharCode(56320+(1023&o))}else{i=t[n++];var a=t[n++];e[r++]=String.fromCharCode((15&s)<<12|(63&i)<<6|63&a)}}return e.join("")}(this.decodeStringToByteArray(t,e))},decodeStringToByteArray:function(t,e){this.init_();for(var n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[],s=0;s<t.length;){var i=n[t.charAt(s++)],o=s<t.length?n[t.charAt(s)]:0,a=++s<t.length?n[t.charAt(s)]:64,c=++s<t.length?n[t.charAt(s)]:64;if(++s,null==i||null==o||null==a||null==c)throw Error();var u=i<<2|o>>4;if(r.push(u),64!==a){var h=o<<4&240|a>>2;if(r.push(h),64!==c){var l=a<<6&192|c;r.push(l)}}}return r},init_:function(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(var t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},Kt=function(){function t(){var t=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise((function(e,n){t.resolve=e,t.reject=n}))}return t.prototype.wrapCallback=function(t){var e=this;return function(n,r){n?e.reject(n):e.resolve(r),"function"==typeof t&&(e.promise.catch((function(){})),1===t.length?t(n):t(n,r))}},t}();
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
function Ht(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function Gt(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ht())}function Wt(){var t="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof t&&void 0!==t.id}function Qt(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function Xt(){var t=Ht();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}
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
var Yt=function(t){function e(n,r,s){var i=t.call(this,r)||this;return i.code=n,i.customData=s,i.name="FirebaseError",Object.setPrototypeOf(i,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(i,Jt.prototype.create),i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}Ut(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e}(Error),Jt=function(){function t(t,e,n){this.service=t,this.serviceName=e,this.errors=n}return t.prototype.create=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=e[0]||{},s=this.service+"/"+t,i=this.errors[t],o=i?Zt(i,r):"Error",a=this.serviceName+": "+o+" ("+s+").",c=new Yt(s,a,r);return c},t}();function Zt(t,e){return t.replace(te,(function(t,n){var r=e[n];return null!=r?String(r):"<"+n+"?>"}))}var te=/\{\$([^}]+)}/g;
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
function ee(t){for(var e=[],n=function(t,n){Array.isArray(n)?n.forEach((function(n){e.push(encodeURIComponent(t)+"="+encodeURIComponent(n))})):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n))},r=0,s=Object.entries(t);r<s.length;r++){var i=s[r];n(i[0],i[1])}return e.length?"&"+e.join("&"):""}var ne=function(){function t(t,e){var n=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then((function(){t(n)})).catch((function(t){n.error(t)}))}return t.prototype.next=function(t){this.forEachObserver((function(e){e.next(t)}))},t.prototype.error=function(t){this.forEachObserver((function(e){e.error(t)})),this.close(t)},t.prototype.complete=function(){this.forEachObserver((function(t){t.complete()})),this.close()},t.prototype.subscribe=function(t,e,n){var r,s=this;if(void 0===t&&void 0===e&&void 0===n)throw new Error("Missing Observer.");void 0===(r=function(t,e){if("object"!=typeof t||null===t)return!1;for(var n=0,r=e;n<r.length;n++){var s=r[n];if(s in t&&"function"==typeof t[s])return!0}return!1}(t,["next","error","complete"])?t:{next:t,error:e,complete:n}).next&&(r.next=re),void 0===r.error&&(r.error=re),void 0===r.complete&&(r.complete=re);var i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((function(){try{s.finalError?r.error(s.finalError):r.complete()}catch(t){}})),this.observers.push(r),i},t.prototype.unsubscribeOne=function(t){void 0!==this.observers&&void 0!==this.observers[t]&&(delete this.observers[t],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},t.prototype.forEachObserver=function(t){if(!this.finalized)for(var e=0;e<this.observers.length;e++)this.sendOne(e,t)},t.prototype.sendOne=function(t,e){var n=this;this.task.then((function(){if(void 0!==n.observers&&void 0!==n.observers[t])try{e(n.observers[t])}catch(r){"undefined"!=typeof console&&console.error&&console.error(r)}}))},t.prototype.close=function(t){var e=this;this.finalized||(this.finalized=!0,void 0!==t&&(this.finalError=t),this.task.then((function(){e.observers=void 0,e.onNoObservers=void 0})))},t}();function re(){}
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
 */function se(t){return t&&t._delegate?t._delegate:t}var ie=function(){function t(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(t){return this.instantiationMode=t,this},t.prototype.setMultipleInstances=function(t){return this.multipleInstances=t,this},t.prototype.setServiceProps=function(t){return this.serviceProps=t,this},t.prototype.setInstanceCreatedCallback=function(t){return this.onInstanceCreated=t,this},t}(),oe=function(){function t(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.onInitCallbacks=new Map}return t.prototype.get=function(t){var e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){var n=new Kt;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{var r=this.getOrInitializeService({instanceIdentifier:e});r&&n.resolve(r)}catch(s){}}return this.instancesDeferred.get(e).promise},t.prototype.getImmediate=function(t){var e,n=this.normalizeInstanceIdentifier(null==t?void 0:t.identifier),r=null!==(e=null==t?void 0:t.optional)&&void 0!==e&&e;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error("Service "+this.name+" is not available")}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(r)return null;throw s}},t.prototype.getComponent=function(){return this.component},t.prototype.setComponent=function(t){var e,n;if(t.name!==this.name)throw Error("Mismatching Component "+t.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if(this.component=t,this.shouldAutoInitialize()){if(function(t){return"EAGER"===t.instantiationMode}
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
 */(t))try{this.getOrInitializeService({instanceIdentifier:"[DEFAULT]"})}catch(h){}try{for(var r=Bt(this.instancesDeferred.entries()),s=r.next();!s.done;s=r.next()){var i=$t(s.value,2),o=i[0],a=i[1],c=this.normalizeInstanceIdentifier(o);try{var u=this.getOrInitializeService({instanceIdentifier:c});a.resolve(u)}catch(h){}}}catch(l){e={error:l}}finally{try{s&&!s.done&&(n=r.return)&&n.call(r)}finally{if(e)throw e.error}}}},t.prototype.clearInstance=function(t){void 0===t&&(t="[DEFAULT]"),this.instancesDeferred.delete(t),this.instances.delete(t)},t.prototype.delete=function(){return Vt(this,void 0,void 0,(function(){var t;return qt(this,(function(e){switch(e.label){case 0:return t=Array.from(this.instances.values()),[4,Promise.all(jt(jt([],$t(t.filter((function(t){return"INTERNAL"in t})).map((function(t){return t.INTERNAL.delete()})))),$t(t.filter((function(t){return"_delete"in t})).map((function(t){return t._delete()})))))];case 1:return e.sent(),[2]}}))}))},t.prototype.isComponentSet=function(){return null!=this.component},t.prototype.isInitialized=function(t){return void 0===t&&(t="[DEFAULT]"),this.instances.has(t)},t.prototype.initialize=function(t){var e,n;void 0===t&&(t={});var r=t.options,s=void 0===r?{}:r,i=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(i))throw Error(this.name+"("+i+") has already been initialized");if(!this.isComponentSet())throw Error("Component "+this.name+" has not been registered yet");var o=this.getOrInitializeService({instanceIdentifier:i,options:s});try{for(var a=Bt(this.instancesDeferred.entries()),c=a.next();!c.done;c=a.next()){var u=$t(c.value,2),h=u[0],l=u[1];i===this.normalizeInstanceIdentifier(h)&&l.resolve(o)}}catch(d){e={error:d}}finally{try{c&&!c.done&&(n=a.return)&&n.call(a)}finally{if(e)throw e.error}}return this.invokeOnInitCallbacks(o,i),o},t.prototype.onInit=function(t,e){var n,r=this.normalizeInstanceIdentifier(e),s=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;s.add(t),this.onInitCallbacks.set(r,s);var i=this.instances.get(r);return i&&t(i,r),function(){s.delete(t)}},t.prototype.invokeOnInitCallbacks=function(t,e){var n,r,s=this.onInitCallbacks.get(e);if(s)try{for(var i=Bt(s),o=i.next();!o.done;o=i.next()){var a=o.value;try{a(t,e)}catch(c){}}}catch(u){n={error:u}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}},t.prototype.getOrInitializeService=function(t){var e,n=t.instanceIdentifier,r=t.options,s=void 0===r?{}:r,i=this.instances.get(n);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:(e=n,"[DEFAULT]"===e?void 0:e),options:s}),this.instances.set(n,i),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,n,i)}catch(o){}return i||null},t.prototype.normalizeInstanceIdentifier=function(t){return void 0===t&&(t="[DEFAULT]"),this.component?this.component.multipleInstances?t:"[DEFAULT]":t},t.prototype.shouldAutoInitialize=function(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode},t}();
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
 */var ae,ce,ue,he=function(){function t(t){this.name=t,this.providers=new Map}return t.prototype.addComponent=function(t){var e=this.getProvider(t.name);if(e.isComponentSet())throw new Error("Component "+t.name+" has already been registered with "+this.name);e.setComponent(t)},t.prototype.addOrOverwriteComponent=function(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)},t.prototype.getProvider=function(t){if(this.providers.has(t))return this.providers.get(t);var e=new oe(t,this);return this.providers.set(t,e),e},t.prototype.getProviders=function(){return Array.from(this.providers.values())},t}();
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
***************************************************************************** */function le(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var r=Array(t),s=0;for(e=0;e<n;e++)for(var i=arguments[e],o=0,a=i.length;o<a;o++,s++)r[s]=i[o];return r}
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
 */(ue=ce||(ce={}))[ue.DEBUG=0]="DEBUG",ue[ue.VERBOSE=1]="VERBOSE",ue[ue.INFO=2]="INFO",ue[ue.WARN=3]="WARN",ue[ue.ERROR=4]="ERROR",ue[ue.SILENT=5]="SILENT";var de={debug:ce.DEBUG,verbose:ce.VERBOSE,info:ce.INFO,warn:ce.WARN,error:ce.ERROR,silent:ce.SILENT},fe=ce.INFO,pe=((ae={})[ce.DEBUG]="log",ae[ce.VERBOSE]="log",ae[ce.INFO]="info",ae[ce.WARN]="warn",ae[ce.ERROR]="error",ae),me=function(t,e){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(e<t.logLevel)){var s=(new Date).toISOString(),i=pe[e];if(!i)throw new Error("Attempted to log a message with an invalid logType (value: "+e+")");console[i].apply(console,le(["["+s+"]  "+t.name+":"],n))}},ge=function(){function t(t){this.name=t,this._logLevel=fe,this._logHandler=me,this._userLogHandler=null}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(t){if(!(t in ce))throw new TypeError('Invalid value "'+t+'" assigned to `logLevel`');this._logLevel=t},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(t){this._logLevel="string"==typeof t?de[t]:t},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(t){this._userLogHandler=t},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,le([this,ce.DEBUG],t)),this._logHandler.apply(this,le([this,ce.DEBUG],t))},t.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,le([this,ce.VERBOSE],t)),this._logHandler.apply(this,le([this,ce.VERBOSE],t))},t.prototype.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,le([this,ce.INFO],t)),this._logHandler.apply(this,le([this,ce.INFO],t))},t.prototype.warn=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,le([this,ce.WARN],t)),this._logHandler.apply(this,le([this,ce.WARN],t))},t.prototype.error=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,le([this,ce.ERROR],t)),this._logHandler.apply(this,le([this,ce.ERROR],t))},t}();
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
class ye{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map((t=>{if(function(t){const e=t.getComponent();return"VERSION"===(null==e?void 0:e.type)}(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}return null})).filter((t=>t)).join(" ")}}const ve=new ge("@firebase/app"),we={"@firebase/app-exp":"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics-exp":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check-exp":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth-exp":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions-exp":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations-exp":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging-exp":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance-exp":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config-exp":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js","firebase-exp":"fire-js-all"},be=new Map,Ie=new Map;function _e(t,e){try{t.container.addComponent(e)}catch(n){ve.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Te(t){const e=t.name;if(Ie.has(e))return ve.debug(`There were multiple attempts to register component ${e}.`),!1;Ie.set(e,t);for(const n of be.values())_e(n,t);return!0}function Ee(t,e){return t.container.getProvider(e)}
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
 */const Se=new Jt("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function."});
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
class ke{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new ie("app-exp",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Se.create("app-deleted",{appName:this._name})}}
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
 */function Ce(t,e={}){if("object"!=typeof e){e={name:e}}const n=Object.assign({name:"[DEFAULT]",automaticDataCollectionEnabled:!1},e),r=n.name;if("string"!=typeof r||!r)throw Se.create("bad-app-name",{appName:String(r)});if(be.has(r))throw Se.create("duplicate-app",{appName:r});const s=new he(r);for(const o of Ie.values())s.addComponent(o);const i=new ke(t,n,s);return be.set(r,i),i}function Re(t="[DEFAULT]"){const e=be.get(t);if(!e)throw Se.create("no-app",{appName:t});return e}function Ae(t,e,n){var r;let s=null!==(r=we[t])&&void 0!==r?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const t=[`Unable to register library "${s}" with version "${e}":`];return i&&t.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&t.push("and"),o&&t.push(`version name "${e}" contains illegal characters (whitespace or "/")`),void ve.warn(t.join(" "))}Te(new ie(`${s}-version`,(()=>({library:s,version:e})),"VERSION"))}
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
 */var Ne;Te(new ie("platform-logger",(t=>new ye(t)),"PRIVATE")),Ae("@firebase/app-exp","0.0.900-exp.f43d0c698",Ne),Ae("fire-js","");const De=new Jt("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),xe=new ge("@firebase/auth-exp");
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
 */function Oe(t,...e){xe.logLevel<=ce.ERROR&&xe.error(`Auth (9.0.0-beta.6): ${t}`,...e)}
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
 */function Le(t,...e){throw Me(t,...e)}function Pe(t,...e){return Me(t,...e)}function Me(t,...e){if("string"!=typeof t){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return De.create(t,...e)}function Ue(t,e,...n){if(!t)throw Me(e,...n)}function Fe(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Oe(e),new Error(e)}function Ve(t,e){t||Fe(e)}
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
 */const qe=new Map;function Be(t){Ve(t instanceof Function,"Expected a class definition");let e=qe.get(t);return e?(Ve(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,qe.set(t,e),e)}
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
function $e(){var t;return"undefined"!=typeof self&&(null===(t=self.location)||void 0===t?void 0:t.href)||""}function je(){var t;return"undefined"!=typeof self&&(null===(t=self.location)||void 0===t?void 0:t.protocol)||null}
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
 */function ze(){return"undefined"==typeof navigator||!navigator||!("onLine"in navigator)||"boolean"!=typeof navigator.onLine||"http:"!==je()&&"https:"!==je()&&!Wt()&&!("connection"in navigator)||navigator.onLine}
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
class Ke{constructor(t,e){this.shortDelay=t,this.longDelay=e,Ve(e>t,"Short delay should be less than long delay!"),this.isMobile=Gt()||Qt()}get(){return ze()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
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
 */function He(t,e){Ve(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}
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
 */class Ge{static initialize(t,e,n){this.fetchImpl=t,e&&(this.headersImpl=e),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:void Fe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:void Fe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:void Fe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
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
 */const We={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded"},Qe=new Ke(3e4,6e4);
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
 */async function Xe(t,e,n,r,s={}){return Ye(t,s,(()=>{let s={},i={};r&&("GET"===e?i=r:s={body:JSON.stringify(r)});const o=ee(Object.assign({key:t.config.apiKey},i)).slice(1),a=new(Ge.headers());return a.set("Content-Type","application/json"),a.set("X-Client-Version",t._getSdkClientVersion()),t.languageCode&&a.set("X-Firebase-Locale",t.languageCode),Ge.fetch()(Je(t,t.config.apiHost,n,o),Object.assign({method:e,headers:a,referrerPolicy:"no-referrer"},s))}))}async function Ye(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},We),e);try{const e=new Ze(t),s=await Promise.race([n(),e.promise]);e.clearNetworkTimeout();const i=await s.json();if("needConfirmation"in i)throw tn(t,"account-exists-with-different-credential",i);if(s.ok&&!("errorMessage"in i))return i;{const e=(s.ok?i.errorMessage:i.error.message).split(" : ")[0];if("FEDERATED_USER_ID_ALREADY_LINKED"===e)throw tn(t,"credential-already-in-use",i);if("EMAIL_EXISTS"===e)throw tn(t,"email-already-in-use",i);Le(t,r[e]||e.toLowerCase().replace(/[_\s]+/g,"-"))}}catch(s){if(s instanceof Yt)throw s;Le(t,"network-request-failed")}}function Je(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?He(t.config,s):`${t.config.apiScheme}://${s}`}class Ze{constructor(t){this.auth=t,this.timer=null,this.promise=new Promise(((t,e)=>{this.timer=setTimeout((()=>e(Pe(this.auth,"timeout"))),Qe.get())}))}clearNetworkTimeout(){clearTimeout(this.timer)}}function tn(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Pe(t,e,r);return s.customData._tokenResponse=n,s}
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
function en(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch(e){}}function nn(t){return 1e3*Number(t)}function rn(t){const[e,n,r]=t.split(".");if(void 0===e||void 0===n||void 0===r)return Oe("JWT malformed, contained fewer than 3 sections"),null;try{const t=function(t){try{return zt.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null}(n);return t?JSON.parse(t):(Oe("Failed to decode base64 JWT payload"),null)}catch(s){return Oe("Caught error parsing JWT payload as JSON",s),null}}
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
async function sn(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Yt&&function({code:t}){return"auth/user-disabled"===t||"auth/user-token-expired"===t}
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
 */(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}class on{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(t){var e;if(t){const t=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),t}{this.errorBackoff=3e4;const t=(null!==(e=this.user.stsTokenManager.expirationTime)&&void 0!==e?e:0)-Date.now()-3e5;return Math.max(0,t)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout((async()=>{await this.iteration()}),e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){return void("auth/network-request-failed"===t.code&&this.schedule(!0))}this.schedule()}}
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
 */class an{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=en(this.lastLoginAt),this.creationTime=en(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
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
 */async function cn(t){var e;const n=t.auth,r=await t.getIdToken(),s=await sn(t,async function(t,e){return Xe(t,"POST","/v1/accounts:lookup",e)}(n,{idToken:r}));Ue(null==s?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=(null===(e=i.providerUserInfo)||void 0===e?void 0:e.length)?i.providerUserInfo.map((t=>{var{providerId:e}=t,n=Ft(t,["providerId"]);return{providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})):[];const a=(c=t.providerData,u=o,[...c.filter((t=>!u.some((e=>e.providerId===t.providerId)))),...u]);var c,u;const h=t.isAnonymous,l=!(t.email&&i.passwordHash||(null==a?void 0:a.length)),d=!!h&&l,f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new an(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(t,f)}
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
class un{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){Ue(t.idToken,"internal-error"),Ue(void 0!==t.idToken,"internal-error"),Ue(void 0!==t.refreshToken,"internal-error");const e="expiresIn"in t&&void 0!==t.expiresIn?Number(t.expiresIn):function(t){const e=rn(t);return Ue(e,"internal-error"),Ue(void 0!==e.exp,"internal-error"),Ue(void 0!==e.iat,"internal-error"),Number(e.exp)-Number(e.iat)}(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}async getToken(t,e=!1){return Ue(!this.accessToken||this.refreshToken,t,"user-token-expired"),e||!this.accessToken||this.isExpired?this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:n,refreshToken:r,expiresIn:s}=await
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
async function(t,e){const n=await Ye(t,{},(()=>{const n=ee({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:s}=t.config,i=Je(t,r,"/v1/token",`key=${s}`);return Ge.fetch()(i,{method:"POST",headers:{"X-Client-Version":t._getSdkClientVersion(),"Content-Type":"application/x-www-form-urlencoded"},body:n})}));return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(t,e);this.updateTokensAndExpiration(n,r,Number(s))}updateTokensAndExpiration(t,e,n){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(t,e){const{refreshToken:n,accessToken:r,expirationTime:s}=e,i=new un;return n&&(Ue("string"==typeof n,"internal-error",{appName:t}),i.refreshToken=n),r&&(Ue("string"==typeof r,"internal-error",{appName:t}),i.accessToken=r),s&&(Ue("number"==typeof s,"internal-error",{appName:t}),i.expirationTime=s),i}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new un,this.toJSON())}_performRefresh(){return Fe("not implemented")}}
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
 */function hn(t,e){Ue("string"==typeof t||void 0===t,"internal-error",{appName:e})}class ln{constructor(t){var{uid:e,auth:n,stsTokenManager:r}=t,s=Ft(t,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.emailVerified=!1,this.isAnonymous=!1,this.tenantId=null,this.providerData=[],this.proactiveRefresh=new on(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.metadata=new an(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(t){const e=await sn(this,this.stsTokenManager.getToken(this.auth,t));return Ue(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return async function(t,e=!1){const n=se(t),r=await n.getIdToken(e),s=rn(r);Ue(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i="object"==typeof s.firebase?s.firebase:void 0,o=null==i?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:en(nn(s.auth_time)),issuedAtTime:en(nn(s.iat)),expirationTime:en(nn(s.exp)),signInProvider:o||null,signInSecondFactor:(null==i?void 0:i.sign_in_second_factor)||null}}(this,t)}reload(){return async function(t){const e=se(t);await cn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}(this)}_assign(t){this!==t&&(Ue(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map((t=>Object.assign({},t))),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){return new ln(Object.assign(Object.assign({},this),{auth:t,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(t){Ue(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let n=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),n=!0),e&&await cn(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){const t=await this.getIdToken();return await sn(this,async function(t,e){return Xe(t,"POST","/v1/accounts:delete",e)}(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map((t=>Object.assign({},t))),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){var n,r,s,i,o,a,c,u;const h=null!==(n=e.displayName)&&void 0!==n?n:void 0,l=null!==(r=e.email)&&void 0!==r?r:void 0,d=null!==(s=e.phoneNumber)&&void 0!==s?s:void 0,f=null!==(i=e.photoURL)&&void 0!==i?i:void 0,p=null!==(o=e.tenantId)&&void 0!==o?o:void 0,m=null!==(a=e._redirectEventId)&&void 0!==a?a:void 0,g=null!==(c=e.createdAt)&&void 0!==c?c:void 0,y=null!==(u=e.lastLoginAt)&&void 0!==u?u:void 0,{uid:v,emailVerified:w,isAnonymous:b,providerData:I,stsTokenManager:_}=e;Ue(v&&_,t,"internal-error");const T=un.fromJSON(this.name,_);Ue("string"==typeof v,t,"internal-error"),hn(h,t.name),hn(l,t.name),Ue("boolean"==typeof w,t,"internal-error"),Ue("boolean"==typeof b,t,"internal-error"),hn(d,t.name),hn(f,t.name),hn(p,t.name),hn(m,t.name),hn(g,t.name),hn(y,t.name);const E=new ln({uid:v,auth:t,email:l,emailVerified:w,displayName:h,isAnonymous:b,photoURL:f,phoneNumber:d,tenantId:p,stsTokenManager:T,createdAt:g,lastLoginAt:y});return I&&Array.isArray(I)&&(E.providerData=I.map((t=>Object.assign({},t)))),m&&(E._redirectEventId=m),E}static async _fromIdTokenResponse(t,e,n=!1){const r=new un;r.updateFromServerResponse(e);const s=new ln({uid:e.localId,auth:t,stsTokenManager:r,isAnonymous:n});return await cn(s),s}}
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
 */class dn{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return void 0===e?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}dn.type="NONE";const fn=dn;
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
 */function pn(t,e,n){return`firebase:${t}:${e}:${n}`}class mn{constructor(t,e,n){this.persistence=t,this.auth=e,this.userKey=n;const{config:r,name:s}=this.auth;this.fullUserKey=pn(this.userKey,r.apiKey,s),this.fullPersistenceKey=pn("persistence",r.apiKey,s),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);return t?ln._fromJSON(this.auth,t):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=t,e?this.setCurrentUser(e):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,n="authUser"){if(!e.length)return new mn(Be(fn),t,n);let r=Be(fn);for(const a of e)if(await a._isAvailable()){r=a;break}let s=null;const i=pn(n,t.config.apiKey,t.name);for(const a of e)try{const e=await a._get(i);if(e){const n=ln._fromJSON(t,e);a!==r&&(s=n);break}}catch(o){}return s&&await r._set(i,s.toJSON()),await Promise.all(e.map((async t=>{if(t!==r)try{await t._remove(i)}catch(o){}}))),new mn(r,t,n)}}
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
 */function gn(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(bn(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(yn(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(_n(e))return"Blackberry";if(Tn(e))return"Webos";if(vn(e))return"Safari";if((e.includes("chrome/")||wn(e))&&!e.includes("edge/"))return"Chrome";if(In(e))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=t.match(e);if(2===(null==n?void 0:n.length))return n[1]}return"Other"}function yn(t=Ht()){return/firefox\//i.test(t)}function vn(t=Ht()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function wn(t=Ht()){return/crios\//i.test(t)}function bn(t=Ht()){return/iemobile/i.test(t)}function In(t=Ht()){return/android/i.test(t)}function _n(t=Ht()){return/blackberry/i.test(t)}function Tn(t=Ht()){return/webos/i.test(t)}function En(t=Ht()){return/iphone|ipad|ipod/i.test(t)}function Sn(t=Ht()){return En(t)||In(t)||Tn(t)||_n(t)||/windows phone/i.test(t)||bn(t)}
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
function kn(t,e=[]){let n;switch(t){case"Browser":n=gn(Ht());break;case"Worker":n=`${gn(Ht())}-${t}`;break;default:n=t}return`${n}/JsCore/9.0.0-beta.6/${e.length?e.join(","):"FirebaseCore-web"}`}
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
 */class Cn{constructor(t,e){this.app=t,this.config=e,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new An(this),this.idTokenSubscription=new An(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.redirectInitializerError=null,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=De,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=e.sdkClientVersion}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=Be(e)),this._initializationPromise=this.queue((async()=>{var n;this._deleted||(this.persistenceManager=await mn.create(this,t),this._deleted||((null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)&&await this._popupRedirectResolver._initialize(this),await this.initializeCurrentUser(e),this._deleted||(this._isInitialized=!0)))})),this._initializationPromise.then((()=>{if(this.redirectInitializerError)throw this.redirectInitializerError}))}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();return this.currentUser||t?this.currentUser&&t&&this.currentUser.uid===t.uid?(this._currentUser._assign(t),void(await this.currentUser.getIdToken())):void(await this._updateCurrentUser(t)):void 0}async initializeCurrentUser(t){var e;let n=await this.assertedPersistence.getCurrentUser();if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=null===(e=this.redirectUser)||void 0===e?void 0:e._redirectEventId,s=null==n?void 0:n._redirectEventId,i=await this.tryRedirectSignIn(t);r&&r!==s||!(null==i?void 0:i.user)||(n=i.user)}return n?n._redirectEventId?(Ue(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)):this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch(n){this.redirectInitializerError=n,await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await cn(t)}catch(e){if("auth/network-request-failed"!==e.code)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(t){const e=t?se(t):null;return e&&Ue(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t){if(!this._deleted)return t&&Ue(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),this.queue((async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()}))}async signOut(){return(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null)}setPersistence(t){return this.queue((async()=>{await this.assertedPersistence.setPersistence(Be(t))}))}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(t){this._errorFactory=new Jt("auth","Firebase",t())}onAuthStateChanged(t,e,n){return this.registerStateListener(this.authStateSubscription,t,e,n)}onIdTokenChanged(t,e,n){return this.registerStateListener(this.idTokenSubscription,t,e,n)}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(t=this._currentUser)||void 0===t?void 0:t.toJSON()}}async _setRedirectUser(t,e){const n=await this.getOrInitRedirectPersistenceManager(e);return null===t?n.removeCurrentUser():n.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&Be(t)||this._popupRedirectResolver;Ue(e,this,"argument-error"),this.redirectPersistenceManager=await mn.create(this,[Be(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var e,n;return this._isInitialized&&await this.queue((async()=>{})),(null===(e=this._currentUser)||void 0===e?void 0:e._redirectEventId)===t?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue((async()=>this.directlySetCurrentUser(t)))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t,e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=null!==(e=null===(t=this.currentUser)||void 0===t?void 0:t.uid)&&void 0!==e?e:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,n,r){if(this._deleted)return()=>{};const s="function"==typeof e?e:e.next.bind(e),i=this._isInitialized?Promise.resolve():this._initializationPromise;return Ue(i,this,"internal-error"),i.then((()=>s(this.currentUser))),"function"==typeof e?t.addObserver(e,n,r):t.addObserver(e)}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&(this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh()),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return Ue(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){t&&!this.frameworks.includes(t)&&(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=kn(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}_getSdkClientVersion(){return this.clientVersion}}function Rn(t){return se(t)}class An{constructor(t){var e,n;this.auth=t,this.observer=null,this.addObserver=(n=new ne((t=>this.observer=t),e)).subscribe.bind(n)}get next(){return Ue(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
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
 */class Nn{constructor(t,e){this.providerId=t,this.signInMethod=e}toJSON(){return Fe("not implemented")}_getIdTokenResponse(t){return Fe("not implemented")}_linkToIdToken(t,e){return Fe("not implemented")}_getReauthenticationResolver(t){return Fe("not implemented")}}
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
 */async function Dn(t,e){return async function(t,e,n,r,s={}){const i=await Xe(t,e,n,r,s);return"mfaPendingCredential"in i&&Le(t,"multi-factor-auth-required",{serverResponse:i}),i}(t,"POST","/v1/accounts:signInWithIdp",function(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}(t,e))}
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
 */class xn extends Nn{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const e=new xn(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(e.idToken=t.idToken),t.accessToken&&(e.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(e.nonce=t.nonce),t.pendingToken&&(e.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(e.accessToken=t.oauthToken,e.secret=t.oauthTokenSecret):Le("argument-error"),e}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const e="string"==typeof t?JSON.parse(t):t,{providerId:n,signInMethod:r}=e,s=Ft(e,["providerId","signInMethod"]);if(!n||!r)return null;const i=new xn(n,r);return Object.assign(i,s),i}_getIdTokenResponse(t){return Dn(t,this.buildRequest())}_linkToIdToken(t,e){const n=this.buildRequest();return n.idToken=e,Dn(t,n)}_getReauthenticationResolver(t){const e=this.buildRequest();return e.autoCreate=!1,Dn(t,e)}buildRequest(){const t={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const e={};this.idToken&&(e.id_token=this.idToken),this.accessToken&&(e.access_token=this.accessToken),this.secret&&(e.oauth_token_secret=this.secret),e.providerId=this.providerId,this.nonce&&!this.pendingToken&&(e.nonce=this.nonce),t.postBody=ee(e)}return t}}
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
 */class On{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}
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
 */class Ln extends On{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}
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
 */class Pn extends Ln{constructor(){super("facebook.com")}static credential(t){return xn._fromParams({providerId:Pn.PROVIDER_ID,signInMethod:Pn.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Pn.credentialFromTaggedObject(t)}static credentialFromError(t){return Pn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t))return null;if(!t.oauthAccessToken)return null;try{return Pn.credential(t.oauthAccessToken)}catch(e){return null}}}Pn.FACEBOOK_SIGN_IN_METHOD="facebook.com",Pn.PROVIDER_ID="facebook.com";
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
class Mn extends Ln{constructor(){super("google.com"),this.addScope("profile")}static credential(t,e){return xn._fromParams({providerId:Mn.PROVIDER_ID,signInMethod:Mn.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:e})}static credentialFromResult(t){return Mn.credentialFromTaggedObject(t)}static credentialFromError(t){return Mn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:e,oauthAccessToken:n}=t;if(!e&&!n)return null;try{return Mn.credential(e,n)}catch(r){return null}}}Mn.GOOGLE_SIGN_IN_METHOD="google.com",Mn.PROVIDER_ID="google.com";
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
class Un extends Ln{constructor(){super("github.com")}static credential(t){return xn._fromParams({providerId:Un.PROVIDER_ID,signInMethod:Un.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Un.credentialFromTaggedObject(t)}static credentialFromError(t){return Un.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t))return null;if(!t.oauthAccessToken)return null;try{return Un.credential(t.oauthAccessToken)}catch(e){return null}}}Un.GITHUB_SIGN_IN_METHOD="github.com",Un.PROVIDER_ID="github.com";
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
class Fn extends Ln{constructor(){super("twitter.com")}static credential(t,e){return xn._fromParams({providerId:Fn.PROVIDER_ID,signInMethod:Fn.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:e})}static credentialFromResult(t){return Fn.credentialFromTaggedObject(t)}static credentialFromError(t){return Fn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:e,oauthTokenSecret:n}=t;if(!e||!n)return null;try{return Fn.credential(e,n)}catch(r){return null}}}Fn.TWITTER_SIGN_IN_METHOD="twitter.com",Fn.PROVIDER_ID="twitter.com";
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
class Vn{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,e,n,r=!1){const s=await ln._fromIdTokenResponse(t,n,r),i=qn(n);return new Vn({user:s,providerId:i,_tokenResponse:n,operationType:e})}static async _forOperation(t,e,n){await t._updateTokensIfNecessary(n,!0);const r=qn(n);return new Vn({user:t,providerId:r,_tokenResponse:n,operationType:e})}}function qn(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}
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
 */class Bn extends Yt{constructor(t,e,n,r){var s;super(e.code,e.message),this.operationType=n,this.user=r,this.name="FirebaseError",Object.setPrototypeOf(this,Bn.prototype),this.appName=t.name,this.code=e.code,this.tenantId=null!==(s=t.tenantId)&&void 0!==s?s:void 0,this.serverResponse=e.customData.serverResponse}static _fromErrorAndOperation(t,e,n,r){return new Bn(t,e,n,r)}}function $n(t,e,n,r){return("reauthenticate"===e?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch((n=>{if("auth/multi-factor-auth-required"===n.code)throw Bn._fromErrorAndOperation(t,n,e,r);throw n}))}
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
 */async function jn(t,e,n){await cn(e);var r;const s=!1===t?"provider-already-linked":"no-such-provider";Ue((r=e.providerData,new Set(r.map((({providerId:t})=>t)).filter((t=>!!t)))).has(n)===t,e.auth,s)}
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
 */function zn(t){return se(t).signOut()}
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
class Kn{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),(null===(t=this.auth.currentUser)||void 0===t?void 0:t.uid)||null}async getToken(t){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(t)}}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged((e=>{var n;t((null===(n=e)||void 0===n?void 0:n.stsTokenManager.accessToken)||null)}));this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){Ue(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
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
class Hn{constructor(t,e){this.storage=t,this.type=e}_isAvailable(){try{return this.storage?(this.storage.setItem("__sak","1"),this.storage.removeItem("__sak"),Promise.resolve(!0)):Promise.resolve(!1)}catch(t){return Promise.resolve(!1)}}_set(t,e){return this.storage.setItem(t,JSON.stringify(e)),Promise.resolve()}_get(t){const e=this.storage.getItem(t);return Promise.resolve(e?JSON.parse(e):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}}
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
 */class Gn extends Hn{constructor(){super(window.localStorage,"LOCAL"),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=function(){const t=Ht();return vn(t)||En(t)}()&&function(){try{return!(!window||window===window.top)}catch(t){return!1}}(),this.fallbackToPolling=Sn(),this.boundEventHandler=this.onStorageEvent.bind(this)}forAllChangedKeys(t){for(const e of Object.keys(this.listeners)){const n=this.storage.getItem(e),r=this.localCache[e];n!==r&&t(e,r,n)}}onStorageEvent(t,e=!1){if(!t.key)return void this.forAllChangedKeys(((t,e,n)=>{this.notifyListeners(t,n)}));const n=t.key;if(e?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const r=this.storage.getItem(n);if(t.newValue!==r)null!==t.newValue?this.storage.setItem(n,t.newValue):this.storage.removeItem(n);else if(this.localCache[n]===t.newValue&&!e)return}const r=()=>{const t=this.storage.getItem(n);(e||this.localCache[n]!==t)&&this.notifyListeners(n,t)},s=this.storage.getItem(n);Xt()&&10===document.documentMode&&s!==t.newValue&&t.newValue!==t.oldValue?setTimeout(r,10):r()}notifyListeners(t,e){this.localCache[t]=e;const n=this.listeners[t];if(n)for(const r of Array.from(n))r(e?JSON.parse(e):e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((()=>{this.forAllChangedKeys(((t,e,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:e,newValue:n}),!0)}))}),1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,e){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),0===this.listeners[t].size&&delete this.listeners[t]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(t,e){await super._set(t,e),this.localCache[t]=JSON.stringify(e)}async _get(t){const e=await super._get(t);return this.localCache[t]=JSON.stringify(e),e}async _remove(t){await super._remove(t),delete this.localCache[t]}}Gn.type="LOCAL";const Wn=Gn;
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
class Qn{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find((e=>e.isListeningto(t)));if(e)return e;const n=new Qn(t);return this.receivers.push(n),n}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:n,eventType:r,data:s}=e.data,i=this.handlersMap[r];if(!(null==i?void 0:i.size))return;e.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(i).map((async t=>t(e.origin,s))),a=await function(t){return Promise.all(t.map((async t=>{try{return{fulfilled:!0,value:await t}}catch(e){return{fulfilled:!1,reason:e}}})))}(o);e.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(t,e){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),e&&0!==this.handlersMap[t].size||delete this.handlersMap[t],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Qn.receivers=[];class Xn{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,n=50){const r="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let s,i;return new Promise(((o,a)=>{const c=
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
function(t="",e=20){return`${t}${Math.floor(Math.random()*Math.pow(10,e))}`}();r.port1.start();const u=setTimeout((()=>{a(new Error("unsupported_event"))}),n);i={messageChannel:r,onMessage(t){const e=t;if(e.data.eventId===c)switch(e.data.status){case"ack":clearTimeout(u),s=setTimeout((()=>{a(new Error("timeout"))}),3e3);break;case"done":clearTimeout(s),o(e.data.response);break;default:clearTimeout(u),clearTimeout(s),a(new Error("invalid_response"))}}},this.handlers.add(i),r.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:t,eventId:c,data:e},[r.port2])})).finally((()=>{i&&this.removeMessageHandler(i)}))}}
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
 */function Yn(){return window}
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
function Jn(){return void 0!==Yn().WorkerGlobalScope&&"function"==typeof Yn().importScripts}
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
const Zn="firebaseLocalStorageDb";class tr{constructor(t){this.request=t}toPromise(){return new Promise(((t,e)=>{this.request.addEventListener("success",(()=>{t(this.request.result)})),this.request.addEventListener("error",(()=>{e(this.request.error)}))}))}}function er(t,e){return t.transaction(["firebaseLocalStorage"],e?"readwrite":"readonly").objectStore("firebaseLocalStorage")}function nr(){const t=indexedDB.open(Zn,1);return new Promise(((e,n)=>{t.addEventListener("error",(()=>{n(t.error)})),t.addEventListener("upgradeneeded",(()=>{const e=t.result;try{e.createObjectStore("firebaseLocalStorage",{keyPath:"fbase_key"})}catch(r){n(r)}})),t.addEventListener("success",(async()=>{const n=t.result;n.objectStoreNames.contains("firebaseLocalStorage")?e(n):(n.close(),await function(){const t=indexedDB.deleteDatabase(Zn);return new tr(t).toPromise()}(),e(await nr()))}))}))}async function rr(t,e,n){const r=er(t,!0).put({fbase_key:e,value:n});return new tr(r).toPromise()}function sr(t,e){const n=er(t,!0).delete(e);return new tr(n).toPromise()}class ir{constructor(){this.type="LOCAL",this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then((()=>{}),(()=>{}))}async _openDb(){return this.db||(this.db=await nr()),this.db}async _withRetries(t){let e=0;for(;;)try{const e=await this._openDb();return await t(e)}catch(n){if(e++>3)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Jn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Qn._getInstance(Jn()?self:null),this.receiver._subscribe("keyChanged",(async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)}))),this.receiver._subscribe("ping",(async(t,e)=>["keyChanged"]))}async initializeSender(){var t,e;if(this.activeServiceWorker=await async function(){if(!(null===navigator||void 0===navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(t){return null}}(),!this.activeServiceWorker)return;this.sender=new Xn(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null===(t=n[0])||void 0===t?void 0:t.fulfilled)&&(null===(e=n[0])||void 0===e?void 0:e.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){var e;if(this.sender&&this.activeServiceWorker&&((null===(e=null===navigator||void 0===navigator?void 0:navigator.serviceWorker)||void 0===e?void 0:e.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch(e){}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await nr();return await rr(t,"__sak","1"),await sr(t,"__sak"),!0}catch(t){}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite((async()=>(await this._withRetries((n=>rr(n,t,e))),this.localCache[t]=e,this.notifyServiceWorker(t))))}async _get(t){const e=await this._withRetries((e=>async function(t,e){const n=er(t,!1).get(e),r=await new tr(n).toPromise();return void 0===r?null:r.value}(e,t)));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite((async()=>(await this._withRetries((e=>sr(e,t))),delete this.localCache[t],this.notifyServiceWorker(t))))}async _poll(){const t=await this._withRetries((t=>{const e=er(t,!1).getAll();return new tr(e).toPromise()}));if(!t)return[];if(0!==this.pendingWrites)return[];const e=[],n=new Set;for(const{fbase_key:r,value:s}of t)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(s)&&(this.notifyListeners(r,s),e.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),e.push(r));return e}notifyListeners(t,e){this.localCache[t]=e;const n=this.listeners[t];if(n)for(const r of Array.from(n))r(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((async()=>this._poll()),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),0===this.listeners[t].size&&delete this.listeners[t]),0===Object.keys(this.listeners).length&&this.stopPolling()}}ir.type="LOCAL";const or=ir;
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
 */class ar{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let e=!1;return this.consumers.forEach((n=>{this.isEventForConsumer(t,n)&&(e=!0,this.sendToConsumer(t,n),this.saveEventToCache(t))})),this.hasHandledPotentialRedirect||!function(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ur(t);default:return!1}}
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
 */(t)||(this.hasHandledPotentialRedirect=!0,e||(this.queuedRedirectEvent=t,e=!0)),e}sendToConsumer(t,e){var n;if(t.error&&!ur(t)){const r=(null===(n=t.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";e.onError(Pe(this.auth,r))}else e.onAuthEvent(t)}isEventForConsumer(t,e){const n=null===e.eventId||!!t.eventId&&t.eventId===e.eventId;return e.filter.includes(t.type)&&n}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(cr(t))}saveEventToCache(t){this.cachedEventUids.add(cr(t)),this.lastProcessedEventTime=Date.now()}}function cr(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter((t=>t)).join("-")}function ur({type:t,error:e}){return"unknown"===t&&"auth/no-auth-event"===(null==e?void 0:e.code)}function hr(t){return`${t||""}${Math.floor(1e9*Math.random())}`}
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
const lr=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,dr=/^https?/;async function fr(t){if(t.config.emulator)return;const{authorizedDomains:e}=await async function(t){return Xe(t,"GET","/v1/projects",{})}(t);for(const r of e)try{if(pr(r))return}catch(n){}Le(t,"unauthorized-domain")}function pr(t){const e=$e(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const s=new URL(t);return""===s.hostname&&""===r?"chrome-extension:"===n&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):"chrome-extension:"===n&&s.hostname===r}if(!dr.test(n))return!1;if(lr.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}
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
 */function mr(t){return new Promise(((e,n)=>{const r=document.createElement("script");var s,i;r.setAttribute("src",t),r.onload=e,r.onerror=n,r.type="text/javascript",r.charset="UTF-8",(null!==(i=null===(s=document.getElementsByTagName("head"))||void 0===s?void 0:s[0])&&void 0!==i?i:document).appendChild(r)}))}
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
const gr=new Ke(3e4,6e4);function yr(){const t=Yn().___jsl;if(null==t?void 0:t.H)for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}function vr(t){return new Promise(((e,n)=>{var r,s,i;function o(){yr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{yr(),n(Pe(t,"network-request-failed"))},timeout:gr.get()})}if(null===(s=null===(r=Yn().gapi)||void 0===r?void 0:r.iframes)||void 0===s?void 0:s.Iframe)e(gapi.iframes.getContext());else{if(!(null===(i=Yn().gapi)||void 0===i?void 0:i.load)){const e=`__${"iframefcb"}${Math.floor(1e6*Math.random())}`;return Yn()[e]=()=>{gapi.load?o():n(Pe(t,"network-request-failed"))},mr(`https://apis.google.com/js/api.js?onload=${e}`)}o()}})).catch((t=>{throw wr=null,t}))}let wr=null;
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
const br=new Ke(5e3,15e3),Ir={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"}},_r=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Tr(t){const e=t.config;Ue(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?He(e,"emulator/auth/iframe"):`https://${t.config.authDomain}/__/auth/iframe`,r={apiKey:e.apiKey,appName:t.name,v:"9.0.0-beta.6"},s=_r.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${ee(r).slice(1)}`}async function Er(t){const e=await function(t){return wr=wr||vr(t),wr}(t),n=Yn().gapi;return Ue(n,t,"internal-error"),e.open({where:document.body,url:Tr(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Ir,dontclear:!0},(e=>new Promise((async(n,r)=>{await e.restyle({setHideOnLeave:!1});const s=Pe(t,"network-request-failed"),i=Yn().setTimeout((()=>{r(s)}),br.get());function o(){Yn().clearTimeout(i),n(e)}e.ping(o).then(o,(()=>{r(s)}))}))))}
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
 */class Sr extends Hn{constructor(){super(window.sessionStorage,"SESSION")}_addListener(t,e){}_removeListener(t,e){}}Sr.type="SESSION";const kr=Sr,Cr={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};
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
 */class Rr{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(t){}}}function Ar(t,e,n,r=500,s=600){const i=Math.min((window.screen.availHeight-s)/2,0).toString(),o=Math.min((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},Cr),{width:r.toString(),height:s.toString(),top:i,left:o}),u=Ht().toLowerCase();n&&(a=wn(u)?"_blank":n),yn(u)&&(e=e||"http://localhost",c.scrollbars="yes");const h=Object.entries(c).reduce(((t,[e,n])=>`${t}${e}=${n},`),"");if(function(t=Ht()){var e;return En(t)&&!!(null===(e=window.navigator)||void 0===e?void 0:e.standalone)}(u)&&"_self"!==a)return function(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
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
 */(e||"",a),new Rr(null);const l=window.open(e||"",a,h);Ue(l,t,"popup-blocked");try{l.focus()}catch(d){}return new Rr(l)}function Nr(t,e){return e?Be(e):(Ue(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}
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
 */class Dr extends Nn{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return Dn(t,this._buildIdpRequest())}_linkToIdToken(t,e){return Dn(t,this._buildIdpRequest(e))}_getReauthenticationResolver(t){return Dn(t,this._buildIdpRequest())}_buildIdpRequest(t){const e={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(e.idToken=t),e}}function xr(t){
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
return async function(t,e,n=!1){const r="signIn",s=await $n(t,r,e),i=await Vn._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}(t.auth,new Dr(t),t.bypassAuthState)}function Or(t){const{auth:e,user:n}=t;return Ue(n,e,"internal-error"),async function(t,e,n=!1){const{auth:r}=t,s="reauthenticate";try{const i=await sn(t,$n(r,s,e,t),n);Ue(i.idToken,r,"internal-error");const o=rn(i.idToken);Ue(o,r,"internal-error");const{sub:a}=o;return Ue(t.uid===a,r,"user-mismatch"),Vn._forOperation(t,s,i)}catch(i){throw"auth/user-not-found"===(null==i?void 0:i.code)&&Le(r,"user-mismatch"),i}}(n,new Dr(t),t.bypassAuthState)}async function Lr(t){const{auth:e,user:n}=t;return Ue(n,e,"internal-error"),async function(t,e,n=!1){const r=await sn(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Vn._forOperation(t,"link",r)}(n,new Dr(t),t.bypassAuthState)}
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
 */class Pr{constructor(t,e,n,r,s=!1){this.auth=t,this.resolver=n,this.user=r,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(e)?e:[e]}execute(){return new Promise((async(t,e)=>{this.pendingPromise={resolve:t,reject:e};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}}))}async onAuthEvent(t){const{urlResponse:e,sessionId:n,postBody:r,tenantId:s,error:i,type:o}=t;if(i)return void this.reject(i);const a={auth:this.auth,requestUri:e,sessionId:n,tenantId:s||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(c){this.reject(c)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return xr;case"linkViaPopup":case"linkViaRedirect":return Lr;case"reauthViaPopup":case"reauthViaRedirect":return Or;default:Le(this.auth,"internal-error")}}resolve(t){Ve(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){Ve(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
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
 */const Mr=new Map;class Ur extends Pr{constructor(t,e,n=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],e,void 0,n),this.eventId=null}async execute(){let t=Mr.get(this.auth._key());if(!t){try{const e=await async function(t,e){const n=qr(e),r="true"===await Vr(t)._get(n);return await Vr(t)._remove(n),r}(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(e)}catch(e){t=()=>Promise.reject(e)}Mr.set(this.auth._key(),t)}return t()}async onAuthEvent(t){if("signInViaRedirect"===t.type)return super.onAuthEvent(t);if("unknown"!==t.type){if(t.eventId){const e=await this.auth._redirectUserForId(t.eventId);if(e)return this.user=e,super.onAuthEvent(t);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}async function Fr(t,e){return Vr(t)._set(qr(e),"true")}function Vr(t){return Be(t._redirectPersistence)}function qr(t){return pn("pendingRedirect",t.config.apiKey,t.name)}
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
 */function Br(t,e,n){return async function(t,e,n){const r=Rn(t);Ue(e instanceof On,t,"argument-error");const s=Nr(r,n);return await Fr(s,r),s._openRedirect(r,e,"signInViaRedirect")}(t,e,n)}function $r(t,e,n){return async function(t,e,n){const r=se(t);Ue(e instanceof On,r.auth,"argument-error");const s=Nr(r.auth,n);await jn(!1,r,e.providerId),await Fr(s,r.auth);const i=await async function(t){const e=hr(`${t.uid}:::`);return t._redirectEventId=e,await t.auth._setRedirectUser(t),await t.auth._persistUserIfCurrent(t),e}
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
 */(r);return s._openRedirect(r.auth,e,"linkViaRedirect",i)}(t,e,n)}async function jr(t,e,n=!1){const r=Rn(t),s=Nr(r,e),i=new Ur(r,s,n),o=await i.execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}function zr(t,e,n,r,s,i){Ue(t.config.authDomain,t,"auth-domain-config-required"),Ue(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:"9.0.0-beta.6",eventId:s};if(e instanceof On){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",function(t){for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[t,e]of Object.entries(i||{}))o[t]=e}if(e instanceof Ln){const t=e.getScopes().filter((t=>""!==t));t.length>0&&(o.scopes=t.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const c of Object.keys(a))void 0===a[c]&&delete a[c];return`${function({config:t}){if(!t.emulator)return`https://${t.authDomain}/__/auth/handler`;return He(t,"emulator/auth/handler")}
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
 */(t)}?${ee(a).slice(1)}`}const Kr=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=kr,this._completeRedirectFn=jr}async _openPopup(t,e,n,r){var s;Ve(null===(s=this.eventManagers[t._key()])||void 0===s?void 0:s.manager,"_initialize() not called before _openPopup()");return Ar(t,zr(t,e,n,$e(),r),hr())}async _openRedirect(t,e,n,r){var s;return await this._originValidation(t),s=zr(t,e,n,$e(),r),Yn().location.href=s,new Promise((()=>{}))}_initialize(t){const e=t._key();if(this.eventManagers[e]){const{manager:t,promise:n}=this.eventManagers[e];return t?Promise.resolve(t):(Ve(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(t);return this.eventManagers[e]={promise:n},n}async initAndGetManager(t){const e=await Er(t),n=new ar(t);return e.register("authEvent",(e=>{Ue(null==e?void 0:e.authEvent,t,"invalid-auth-event");return{status:n.onEvent(e.authEvent)?"ACK":"ERROR"}}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:n},this.iframes[t._key()]=e,n}_isIframeWebStorageSupported(t,e){this.iframes[t._key()].send("webStorageSupport",{type:"webStorageSupport"},(n=>{var r;const s=null===(r=null==n?void 0:n[0])||void 0===r?void 0:r.webStorageSupport;void 0!==s&&e(!!s),Le(t,"internal-error")}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=fr(t)),this.originValidationPromises[e]}get _shouldInitProactively(){return Sn()||vn()||En()}};new Ke(3e4,6e4);
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
const Hr=new Ke(2e3,1e4);async function Gr(t,e,n){const r=Rn(t);Ue(e instanceof On,t,"argument-error");const s=Nr(r,n);return new Qr(r,"signInViaPopup",e,s).executeNotNull()}async function Wr(t,e,n){const r=se(t);Ue(e instanceof On,r.auth,"argument-error");const s=Nr(r.auth,n);return new Qr(r.auth,"linkViaPopup",e,s,r).executeNotNull()}class Qr extends Pr{constructor(t,e,n,r,s){super(t,e,r,s),this.provider=n,this.authWindow=null,this.pollId=null,Qr.currentPopupAction&&Qr.currentPopupAction.cancel(),Qr.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return Ue(t,this.auth,"internal-error"),t}async onExecution(){Ve(1===this.filter.length,"Popup operations only handle one event");const t=hr();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch((t=>{this.reject(t)})),this.resolver._isIframeWebStorageSupported(this.auth,(t=>{t||this.reject(Pe(this.auth,"web-storage-unsupported"))})),this.pollUserCancellation()}get eventId(){var t;return(null===(t=this.authWindow)||void 0===t?void 0:t.associatedEvent)||null}cancel(){this.reject(Pe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Qr.currentPopupAction=null}pollUserCancellation(){const t=()=>{var e,n;(null===(n=null===(e=this.authWindow)||void 0===e?void 0:e.window)||void 0===n?void 0:n.closed)?this.pollId=window.setTimeout((()=>{this.pollId=null,this.reject(Pe(this.auth,"popup-closed-by-user"))}),2e3):this.pollId=window.setTimeout(t,Hr.get())};t()}}function Xr(t=Re()){const e=Ee(t,"auth-exp");return e.isInitialized()?e.getImmediate():function(t,e){const n=Ee(t,"auth-exp");n.isInitialized()&&Le(n.getImmediate(),"already-initialized");return n.initialize({options:e})}(t,{popupRedirectResolver:Kr,persistence:[or,Wn]})}var Yr,Jr,Zr;Qr.currentPopupAction=null,Yr="Browser",Te(new ie("auth-exp",((t,{options:e})=>{const n=t.getProvider("app-exp").getImmediate(),{apiKey:r,authDomain:s}=n.options;return(t=>{Ue(r&&!r.includes(":"),"invalid-api-key",{appName:t.name}),Ue(!(null==s?void 0:s.includes(":")),"argument-error",{appName:t.name});const n={apiKey:r,authDomain:s,clientPlatform:Yr,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:kn(Yr)},i=new Cn(t,n);return function(t,e){const n=(null==e?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Be);(null==e?void 0:e.errorMap)&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,null==e?void 0:e.popupRedirectResolver)}(i,e),i})(n)}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((t,e,n)=>{t.getProvider("auth-internal").initialize()}))),Te(new ie("auth-internal",(t=>{const e=Rn(t.getProvider("auth-exp").getImmediate());return new Kn(e)}),"PRIVATE").setInstantiationMode("EXPLICIT")),Ae("@firebase/auth-exp","0.0.900-exp.f43d0c698",function(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}(Yr)),(Zr=Jr||(Jr={}))[Zr.NO_ERROR=0]="NO_ERROR",Zr[Zr.NETWORK_ERROR=1]="NETWORK_ERROR",Zr[Zr.ABORT=2]="ABORT";class ts extends Yt{constructor(t,e){super(es(t),`Firebase Storage: ${e} (${es(t)})`),this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,ts.prototype)}_codeEquals(t){return es(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}function es(t){return"storage/"+t}function ns(t){return new ts("invalid-argument",t)}function rs(){return new ts("app-deleted","The Firebase app was deleted.")}function ss(t){throw new ts("internal-error","Internal error: "+t)}
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
 */class is{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.errorCode_=Jr.NO_ERROR,this.sendPromise_=new Promise((t=>{this.xhr_.addEventListener("abort",(()=>{this.errorCode_=Jr.ABORT,t()})),this.xhr_.addEventListener("error",(()=>{this.errorCode_=Jr.NETWORK_ERROR,t()})),this.xhr_.addEventListener("load",(()=>{t()}))}))}send(t,e,n,r){if(this.sent_)throw ss("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(e,t,!0),void 0!==r)for(const s in r)r.hasOwnProperty(s)&&this.xhr_.setRequestHeader(s,r[s].toString());return void 0!==n?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ss("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ss("cannot .getStatus() before sending");try{return this.xhr_.status}catch(t){return-1}}getResponseText(){if(!this.sent_)throw ss("cannot .getResponseText() before sending");return this.xhr_.responseText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",t)}}
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
class os{createConnection(){return new is}}
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
 */class as{constructor(t,e){this.bucket=t,this.path_=e}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,e){let n;try{n=as.makeFromUrl(t,e)}catch(r){return new as(t,"")}if(""===n.path)return n;throw new ts("invalid-default-bucket","Invalid default bucket '"+t+"'.")}static makeFromUrl(t,e){let n=null;const r="([A-Za-z0-9.\\-_]+)";const s=new RegExp("^gs://"+r+"(/(.*))?$","i");function i(t){t.path_=decodeURIComponent(t.path)}const o=e.replace(/[.]/g,"\\."),a=[{regex:s,indices:{bucket:1,path:3},postModify:function(t){"/"===t.path.charAt(t.path.length-1)&&(t.path_=t.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${o}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:i},{regex:new RegExp(`^https?://${"firebasestorage.googleapis.com"===e?"(?:storage.googleapis.com|storage.cloud.google.com)":e}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:i}];for(let c=0;c<a.length;c++){const e=a[c],r=e.regex.exec(t);if(r){const t=r[e.indices.bucket];let s=r[e.indices.path];s||(s=""),n=new as(t,s),e.postModify(n);break}}if(null==n)throw function(t){return new ts("invalid-url","Invalid URL '"+t+"'.")}(t);return n}}class cs{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}
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
 */function us(t,e,n,r){if(r<e)throw ns(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw ns(`Invalid value for '${t}'. Expected ${n} or less.`)}
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
class hs{constructor(t,e,n,r,s,i,o,a,c,u,h){this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.url_=t,this.method_=e,this.headers_=n,this.body_=r,this.successCodes_=s.slice(),this.additionalRetryCodes_=i.slice(),this.callback_=o,this.errorCallback_=a,this.progressCallback_=u,this.timeout_=c,this.pool_=h,this.promise_=new Promise(((t,e)=>{this.resolve_=t,this.reject_=e,this.start_()}))}start_(){const t=this;function e(e,n){const r=t.resolve_,s=t.reject_,i=n.connection;if(n.wasSuccessCode)try{const e=t.callback_(i,i.getResponseText());void 0!==e?r(e):r()}catch(o){s(o)}else if(null!==i){const e=new ts("unknown","An unknown error occurred, please check the error payload for server response.");e.serverResponse=i.getResponseText(),t.errorCallback_?s(t.errorCallback_(i,e)):s(e)}else if(n.canceled){s(t.appDelete_?rs():new ts("canceled","User canceled the upload/download."))}else{s(new ts("retry-limit-exceeded","Max retry time for operation exceeded, please try again."))}}this.canceled_?e(0,new ls(!1,null,!0)):this.backoffId_=function(t,e,n){let r=1,s=null,i=!1,o=0;function a(){return 2===o}let c=!1;function u(...t){c||(c=!0,e.apply(null,t))}function h(e){s=setTimeout((()=>{s=null,t(l,a())}),e)}function l(t,...e){if(c)return;if(t)return void u.call(null,t,...e);if(a()||i)return void u.call(null,t,...e);let n;r<64&&(r*=2),1===o?(o=2,n=0):n=1e3*(r+Math.random()),h(n)}let d=!1;function f(t){d||(d=!0,c||(null!==s?(t||(o=2),clearTimeout(s),h(0)):t||(o=1)))}return h(0),setTimeout((()=>{i=!0,f(!0)}),n),f}((function(e,n){if(n)return void e(!1,new ls(!1,null,!0));const r=t.pool_.createConnection();function s(e){const n=e.loaded,r=e.lengthComputable?e.total:-1;null!==t.progressCallback_&&t.progressCallback_(n,r)}t.pendingConnection_=r,null!==t.progressCallback_&&r.addUploadProgressListener(s),r.send(t.url_,t.method_,t.body_,t.headers_).then((()=>{null!==t.progressCallback_&&r.removeUploadProgressListener(s),t.pendingConnection_=null;const n=r.getErrorCode()===Jr.NO_ERROR,i=r.getStatus();if(!n||t.isRetryStatusCode_(i)){const t=r.getErrorCode()===Jr.ABORT;return void e(!1,new ls(!1,null,t))}const o=-1!==t.successCodes_.indexOf(i);e(!0,new ls(o,r))}))}),e,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}isRetryStatusCode_(t){const e=t>=500&&t<600,n=-1!==[408,429].indexOf(t),r=-1!==this.additionalRetryCodes_.indexOf(t);return e||n||r}}class ls{constructor(t,e,n){this.wasSuccessCode=t,this.connection=e,this.canceled=!!n}}function ds(t,e,n,r,s,i){const o=function(t){const e=encodeURIComponent;let n="?";for(const r in t)t.hasOwnProperty(r)&&(n=n+(e(r)+"=")+e(t[r])+"&");return n=n.slice(0,-1),n}(t.urlParams),a=t.url+o,c=Object.assign({},t.headers);return function(t,e){e&&(t["X-Firebase-GMPID"]=e)}(c,e),function(t,e){null!==e&&e.length>0&&(t.Authorization="Firebase "+e)}(c,n),function(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(null!=e?e:"AppManager")}(c,i),function(t,e){null!==e&&(t["X-Firebase-AppCheck"]=e)}(c,r),new hs(a,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s)}
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
class fs{constructor(t,e){this._service=t,this._location=e instanceof as?e:as.makeFromUrl(e,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,e){return new fs(t,e)}get root(){const t=new as(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return function(t){const e=t.lastIndexOf("/",t.length-2);return-1===e?t:t.slice(e+1)}(this._location.path)}get storage(){return this._service}get parent(){const t=function(t){if(0===t.length)return null;const e=t.lastIndexOf("/");return-1===e?"":t.slice(0,e)}(this._location.path);if(null===t)return null;const e=new as(this._location.bucket,t);return new fs(this._service,e)}_throwIfRoot(t){if(""===this._location.path)throw function(t){return new ts("invalid-root-operation","The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(t)}}function ps(t,e){const n=null==e?void 0:e.storageBucket;return null==n?null:as.makeFromBucketSpec(n,t)}class ms{constructor(t,e,n,r,s,i){this.app=t,this._authProvider=e,this._appCheckProvider=n,this._pool=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host="firebasestorage.googleapis.com",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=s?as.makeFromBucketSpec(s,this._host):ps(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,null!=this._url?this._bucket=as.makeFromBucketSpec(this._url,t):this._bucket=ps(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){us("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){us("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){const t=this._authProvider.getImmediate({optional:!0});if(t){const e=await t.getToken();if(null!==e)return e.accessToken}return null}async _getAppCheckToken(){const t=this._appCheckProvider.getImmediate({optional:!0});if(t){return(await t.getToken()).token}return null}_delete(){return this._deleted=!0,this._requests.forEach((t=>t.cancel())),this._requests.clear(),Promise.resolve()}_makeStorageReference(t){return new fs(this,t)}_makeRequest(t,e,n){if(this._deleted)return new cs(rs());{const r=ds(t,this._appId,e,n,this._pool,this._firebaseVersion);return this._requests.add(r),r.getPromise().then((()=>this._requests.delete(r)),(()=>this._requests.delete(r))),r}}async makeRequestWithTokens(t){const[e,n]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,e,n)}}function gs(t=Re(),e){return Ee(t=se(t),"storage-exp").getImmediate({identifier:e})}function ys(t,{instanceIdentifier:e}){const n=t.getProvider("app-exp").getImmediate(),r=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new ms(n,r,s,new os,e,"9.0.0-beta.6")}Te(new ie("storage-exp",ys,"PUBLIC").setMultipleInstances(!0)),Ae("@firebase/storage","0.0.900-exp.f43d0c698");
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
var vs=function(t,e){return(vs=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};function ws(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}var bs,Is="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},_s=_s||{},Ts=Is||self;function Es(){}function Ss(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function ks(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}var Cs="closure_uid_"+(1e9*Math.random()>>>0),Rs=0;function As(t,e,n){return t.call.apply(t.bind,arguments)}function Ns(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function Ds(t,e,n){return(Ds=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?As:Ns).apply(null,arguments)}function xs(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function Os(){return Date.now()}function Ls(t,e){function n(){}n.prototype=e.prototype,t.X=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Pb=function(t,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return e.prototype[n].apply(t,s)}}function Ps(){this.j=this.j,this.i=this.i}Ps.prototype.j=!1,Ps.prototype.ka=function(){var t;!this.j&&(this.j=!0,this.H(),0)&&(t=this,Object.prototype.hasOwnProperty.call(t,Cs)&&t[Cs]||(t[Cs]=++Rs))},Ps.prototype.H=function(){if(this.i)for(;this.i.length;)this.i.shift()()};var Ms=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if("string"==typeof t)return"string"!=typeof e||1!=e.length?-1:t.indexOf(e,0);for(var n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1},Us=Array.prototype.forEach?function(t,e,n){Array.prototype.forEach.call(t,e,n)}:function(t,e,n){for(var r=t.length,s="string"==typeof t?t.split(""):t,i=0;i<r;i++)i in s&&e.call(n,s[i],i,t)};function Fs(t){return Array.prototype.concat.apply([],arguments)}function Vs(t){var e=t.length;if(0<e){for(var n=Array(e),r=0;r<e;r++)n[r]=t[r];return n}return[]}function qs(t){return/^[\s\xa0]*$/.test(t)}var Bs,$s=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function js(t,e){return-1!=t.indexOf(e)}function zs(t,e){return t<e?-1:t>e?1:0}t:{var Ks=Ts.navigator;if(Ks){var Hs=Ks.userAgent;if(Hs){Bs=Hs;break t}}Bs=""}function Gs(t,e,n){for(var r in t)e.call(n,t[r],r,t)}function Ws(t){var e={};for(var n in t)e[n]=t[n];return e}var Qs="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Xs(t,e){for(var n,r,s=1;s<arguments.length;s++){for(n in r=arguments[s])t[n]=r[n];for(var i=0;i<Qs.length;i++)n=Qs[i],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function Ys(t){return Ys[" "](t),t}Ys[" "]=Es;var Js,Zs,ti=js(Bs,"Opera"),ei=js(Bs,"Trident")||js(Bs,"MSIE"),ni=js(Bs,"Edge"),ri=ni||ei,si=js(Bs,"Gecko")&&!(js(Bs.toLowerCase(),"webkit")&&!js(Bs,"Edge"))&&!(js(Bs,"Trident")||js(Bs,"MSIE"))&&!js(Bs,"Edge"),ii=js(Bs.toLowerCase(),"webkit")&&!js(Bs,"Edge");function oi(){var t=Ts.document;return t?t.documentMode:void 0}t:{var ai="",ci=(Zs=Bs,si?/rv:([^\);]+)(\)|;)/.exec(Zs):ni?/Edge\/([\d\.]+)/.exec(Zs):ei?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(Zs):ii?/WebKit\/(\S+)/.exec(Zs):ti?/(?:Version)[ \/]?(\S+)/.exec(Zs):void 0);if(ci&&(ai=ci?ci[1]:""),ei){var ui=oi();if(null!=ui&&ui>parseFloat(ai)){Js=String(ui);break t}}Js=ai}var hi,li={};function di(t){return function(t,e){var n=li;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}(t,(function(){for(var e=0,n=$s(String(Js)).split("."),r=$s(String(t)).split("."),s=Math.max(n.length,r.length),i=0;0==e&&i<s;i++){var o=n[i]||"",a=r[i]||"";do{if(o=/(\d*)(\D*)(.*)/.exec(o)||["","","",""],a=/(\d*)(\D*)(.*)/.exec(a)||["","","",""],0==o[0].length&&0==a[0].length)break;e=zs(0==o[1].length?0:parseInt(o[1],10),0==a[1].length?0:parseInt(a[1],10))||zs(0==o[2].length,0==a[2].length)||zs(o[2],a[2]),o=o[3],a=a[3]}while(0==e)}return 0<=e}))}if(Ts.document&&ei){var fi=oi();hi=fi||(parseInt(Js,10)||void 0)}else hi=void 0;var pi=hi,mi=!ei||9<=Number(pi),gi=ei&&!di("9"),yi=function(){if(!Ts.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{Ts.addEventListener("test",Es,e),Ts.removeEventListener("test",Es,e)}catch(n){}return t}();function vi(t,e){this.type=t,this.a=this.target=e,this.defaultPrevented=!1}function wi(t,e){if(vi.call(this,t?t.type:""),this.relatedTarget=this.a=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.pointerId=0,this.pointerType="",this.c=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.a=e,e=t.relatedTarget){if(si){t:{try{Ys(e.nodeName);var s=!0;break t}catch(i){}s=!1}s||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:bi[t.pointerType]||"",this.c=t,t.defaultPrevented&&this.b()}}vi.prototype.b=function(){this.defaultPrevented=!0},Ls(wi,vi);var bi={2:"touch",3:"pen",4:"mouse"};wi.prototype.b=function(){wi.X.b.call(this);var t=this.c;if(t.preventDefault)t.preventDefault();else if(t.returnValue=!1,gi)try{(t.ctrlKey||112<=t.keyCode&&123>=t.keyCode)&&(t.keyCode=-1)}catch(e){}};var Ii="closure_listenable_"+(1e6*Math.random()|0),_i=0;function Ti(t,e,n,r,s){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.da=s,this.key=++_i,this.Y=this.Z=!1}function Ei(t){t.Y=!0,t.listener=null,t.proxy=null,t.src=null,t.da=null}function Si(t){this.src=t,this.a={},this.b=0}function ki(t,e){var n=e.type;if(n in t.a){var r,s=t.a[n],i=Ms(s,e);(r=0<=i)&&Array.prototype.splice.call(s,i,1),r&&(Ei(e),0==t.a[n].length&&(delete t.a[n],t.b--))}}function Ci(t,e,n,r){for(var s=0;s<t.length;++s){var i=t[s];if(!i.Y&&i.listener==e&&i.capture==!!n&&i.da==r)return s}return-1}Si.prototype.add=function(t,e,n,r,s){var i=t.toString();(t=this.a[i])||(t=this.a[i]=[],this.b++);var o=Ci(t,e,r,s);return-1<o?(e=t[o],n||(e.Z=!1)):((e=new Ti(e,this.src,i,!!r,s)).Z=n,t.push(e)),e};var Ri="closure_lm_"+(1e6*Math.random()|0),Ai={};function Ni(t,e,n,r,s){if(r&&r.once)return xi(t,e,n,r,s);if(Array.isArray(e)){for(var i=0;i<e.length;i++)Ni(t,e[i],n,r,s);return null}return n=qi(n),t&&t[Ii]?t.wa(e,n,ks(r)?!!r.capture:!!r,s):Di(t,e,n,!1,r,s)}function Di(t,e,n,r,s,i){if(!e)throw Error("Invalid event type");var o=ks(s)?!!s.capture:!!s;if(o&&!mi)return null;var a=Fi(t);if(a||(t[Ri]=a=new Si(t)),(n=a.add(e,n,r,o,i)).proxy)return n;if(r=function(){var t=Ui,e=mi?function(n){return t.call(e.src,e.listener,n)}:function(n){if(!(n=t.call(e.src,e.listener,n)))return n};return e}(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)yi||(s=o),void 0===s&&(s=!1),t.addEventListener(e.toString(),r,s);else if(t.attachEvent)t.attachEvent(Pi(e.toString()),r);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(r)}return n}function xi(t,e,n,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)xi(t,e[i],n,r,s);return null}return n=qi(n),t&&t[Ii]?t.xa(e,n,ks(r)?!!r.capture:!!r,s):Di(t,e,n,!0,r,s)}function Oi(t,e,n,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)Oi(t,e[i],n,r,s);else r=ks(r)?!!r.capture:!!r,n=qi(n),t&&t[Ii]?(t=t.c,(e=String(e).toString())in t.a&&(-1<(n=Ci(i=t.a[e],n,r,s))&&(Ei(i[n]),Array.prototype.splice.call(i,n,1),0==i.length&&(delete t.a[e],t.b--)))):t&&(t=Fi(t))&&(e=t.a[e.toString()],t=-1,e&&(t=Ci(e,n,r,s)),(n=-1<t?e[t]:null)&&Li(n))}function Li(t){if("number"!=typeof t&&t&&!t.Y){var e=t.src;if(e&&e[Ii])ki(e.c,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(Pi(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=Fi(e))?(ki(n,t),0==n.b&&(n.src=null,e[Ri]=null)):Ei(t)}}}function Pi(t){return t in Ai?Ai[t]:Ai[t]="on"+t}function Mi(t,e){var n=t.listener,r=t.da||t.src;return t.Z&&Li(t),n.call(r,e)}function Ui(t,e){if(t.Y)return!0;if(!mi){if(!e)t:{e=["window","event"];for(var n=Ts,r=0;r<e.length;r++)if(null==(n=n[e[r]])){e=null;break t}e=n}return Mi(t,e=new wi(e,this))}return Mi(t,new wi(e,this))}function Fi(t){return(t=t[Ri])instanceof Si?t:null}var Vi="__closure_events_fn_"+(1e9*Math.random()>>>0);function qi(t){return"function"==typeof t?t:(t[Vi]||(t[Vi]=function(e){return t.handleEvent(e)}),t[Vi])}function Bi(){Ps.call(this),this.c=new Si(this),this.J=this,this.D=null}function $i(t,e){var n,r=t.D;if(r)for(n=[];r;r=r.D)n.push(r);if(t=t.J,r=e.type||e,"string"==typeof e)e=new vi(e,t);else if(e instanceof vi)e.target=e.target||t;else{var s=e;Xs(e=new vi(r,t),s)}if(s=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.a=n[i];s=ji(o,r,!0,e)&&s}if(s=ji(o=e.a=t,r,!0,e)&&s,s=ji(o,r,!1,e)&&s,n)for(i=0;i<n.length;i++)s=ji(o=e.a=n[i],r,!1,e)&&s}function ji(t,e,n,r){if(!(e=t.c.a[String(e)]))return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.Y&&o.capture==n){var a=o.listener,c=o.da||o.src;o.Z&&ki(t.c,o),s=!1!==a.call(c,r)&&s}}return s&&!r.defaultPrevented}Ls(Bi,Ps),Bi.prototype[Ii]=!0,(bs=Bi.prototype).addEventListener=function(t,e,n,r){Ni(this,t,e,n,r)},bs.removeEventListener=function(t,e,n,r){Oi(this,t,e,n,r)},bs.H=function(){if(Bi.X.H.call(this),this.c){var t,e=this.c;for(t in e.a){for(var n=e.a[t],r=0;r<n.length;r++)Ei(n[r]);delete e.a[t],e.b--}}this.D=null},bs.wa=function(t,e,n,r){return this.c.add(String(t),e,!1,n,r)},bs.xa=function(t,e,n,r){return this.c.add(String(t),e,!0,n,r)};var zi=Ts.JSON.stringify;function Ki(){this.b=this.a=null}var Hi,Gi=new(function(){function t(t,e){this.c=t,this.f=e,this.b=0,this.a=null}return t.prototype.get=function(){var t;return 0<this.b?(this.b--,t=this.a,this.a=t.next,t.next=null):t=this.c(),t},t}())((function(){return new Qi}),(function(t){t.reset()}));function Wi(){var t=Zi,e=null;return t.a&&(e=t.a,t.a=t.a.next,t.a||(t.b=null),e.next=null),e}function Qi(){this.next=this.b=this.a=null}function Xi(t){Ts.setTimeout((function(){throw t}),0)}function Yi(t,e){Hi||function(){var t=Ts.Promise.resolve(void 0);Hi=function(){t.then(to)}}(),Ji||(Hi(),Ji=!0),Zi.add(t,e)}Ki.prototype.add=function(t,e){var n=Gi.get();n.set(t,e),this.b?this.b.next=n:this.a=n,this.b=n},Qi.prototype.set=function(t,e){this.a=t,this.b=e,this.next=null},Qi.prototype.reset=function(){this.next=this.b=this.a=null};var Ji=!1,Zi=new Ki;function to(){for(var t;t=Wi();){try{t.a.call(t.b)}catch(n){Xi(n)}var e=Gi;e.f(t),100>e.b&&(e.b++,t.next=e.a,e.a=t)}Ji=!1}function eo(t,e){Bi.call(this),this.b=t||1,this.a=e||Ts,this.f=Ds(this.eb,this),this.g=Os()}function no(t){t.aa=!1,t.M&&(t.a.clearTimeout(t.M),t.M=null)}function ro(t,e,n){if("function"==typeof t)n&&(t=Ds(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=Ds(t.handleEvent,t)}return 2147483647<Number(e)?-1:Ts.setTimeout(t,e||0)}function so(t){t.a=ro((function(){t.a=null,t.c&&(t.c=!1,so(t))}),t.h);var e=t.b;t.b=null,t.g.apply(null,e)}Ls(eo,Bi),(bs=eo.prototype).aa=!1,bs.M=null,bs.eb=function(){if(this.aa){var t=Os()-this.g;0<t&&t<.8*this.b?this.M=this.a.setTimeout(this.f,this.b-t):(this.M&&(this.a.clearTimeout(this.M),this.M=null),$i(this,"tick"),this.aa&&(no(this),this.start()))}},bs.start=function(){this.aa=!0,this.M||(this.M=this.a.setTimeout(this.f,this.b),this.g=Os())},bs.H=function(){eo.X.H.call(this),no(this),delete this.a};var io=function(t){function e(e,n){var r=t.call(this)||this;return r.g=e,r.h=n,r.b=null,r.c=!1,r.a=null,r}return function(t,e){function n(){this.constructor=t}vs(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e.prototype.f=function(t){this.b=arguments,this.a?this.c=!0:so(this)},e.prototype.H=function(){t.prototype.H.call(this),this.a&&(Ts.clearTimeout(this.a),this.a=null,this.c=!1,this.b=null)},e}(Ps);function oo(t){Ps.call(this),this.b=t,this.a={}}Ls(oo,Ps);var ao=[];function co(t,e,n,r){Array.isArray(n)||(n&&(ao[0]=n.toString()),n=ao);for(var s=0;s<n.length;s++){var i=Ni(e,n[s],r||t.handleEvent,!1,t.b||t);if(!i)break;t.a[i.key]=i}}function uo(t){Gs(t.a,(function(t,e){this.a.hasOwnProperty(e)&&Li(t)}),t),t.a={}}function ho(){this.a=!0}function lo(t,e,n,r){t.info((function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.a)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(var o=1;o<s.length;o++)s[o]=""}}}return zi(n)}catch(a){return e}}(t,n)+(r?" "+r:"")}))}oo.prototype.H=function(){oo.X.H.call(this),uo(this)},oo.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},ho.prototype.info=function(){};var fo={},po=null;function mo(){return po=po||new Bi}function go(t){vi.call(this,fo.Ga,t)}function yo(t){var e=mo();$i(e,new go(e,t))}function vo(t,e){vi.call(this,fo.STAT_EVENT,t),this.stat=e}function wo(t){var e=mo();$i(e,new vo(e,t))}function bo(t){vi.call(this,fo.Ha,t)}function Io(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return Ts.setTimeout((function(){t()}),e)}fo.Ga="serverreachability",Ls(go,vi),fo.STAT_EVENT="statevent",Ls(vo,vi),fo.Ha="timingevent",Ls(bo,vi);var _o={NO_ERROR:0,fb:1,sb:2,rb:3,mb:4,qb:5,tb:6,Ea:7,TIMEOUT:8,wb:9},To={kb:"complete",Gb:"success",Fa:"error",Ea:"abort",yb:"ready",zb:"readystatechange",TIMEOUT:"timeout",ub:"incrementaldata",xb:"progress",nb:"downloadprogress",Ob:"uploadprogress"};function Eo(){}function So(t){return t.b||(t.b=t.c())}function ko(){}Eo.prototype.b=null;var Co,Ro={OPEN:"a",jb:"b",Fa:"c",vb:"d"};function Ao(){vi.call(this,"d")}function No(){vi.call(this,"c")}function Do(){}function xo(t,e,n,r){this.g=t,this.c=e,this.f=n,this.S=r||1,this.J=new oo(this),this.P=Oo,t=ri?125:void 0,this.R=new eo(t),this.B=null,this.b=!1,this.j=this.l=this.i=this.G=this.u=this.T=this.o=null,this.s=[],this.a=null,this.D=0,this.h=this.m=null,this.N=-1,this.A=!1,this.O=0,this.F=null,this.V=this.C=this.U=this.I=!1}Ls(Ao,vi),Ls(No,vi),Ls(Do,Eo),Do.prototype.a=function(){return new XMLHttpRequest},Do.prototype.c=function(){return{}},Co=new Do;var Oo=45e3,Lo={},Po={};function Mo(t,e,n){t.G=1,t.i=sa(Jo(e)),t.j=n,t.I=!0,Uo(t,null)}function Uo(t,e){t.u=Os(),qo(t),t.l=Jo(t.i);var n=t.l,r=t.S;Array.isArray(r)||(r=[String(r)]),ya(n.b,"t",r),t.D=0,t.a=lc(t.g,t.g.C?e:null),0<t.O&&(t.F=new io(Ds(t.Da,t,t.a),t.O)),co(t.J,t.a,"readystatechange",t.bb),e=t.B?Ws(t.B):{},t.j?(t.m||(t.m="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.a.ba(t.l,t.m,t.j,e)):(t.m="GET",t.a.ba(t.l,t.m,null,e)),yo(1),function(t,e,n,r,s,i){t.info((function(){if(t.a)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var h=u[0];u=u[1];var l=h.split("_");o=2<=l.length&&"type"==l[1]?o+(h+"=")+u+"&":o+(h+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+"\n"+n+"\n"+o}))}(t.c,t.m,t.l,t.f,t.S,t.j)}function Fo(t,e,n){for(var r=!0;!t.A&&t.D<n.length;){var s=Vo(t,n);if(s==Po){4==e&&(t.h=4,wo(14),r=!1),lo(t.c,t.f,null,"[Incomplete Response]");break}if(s==Lo){t.h=4,wo(15),lo(t.c,t.f,n,"[Invalid Chunk]"),r=!1;break}lo(t.c,t.f,s,null),Ko(t,s)}4==e&&0==n.length&&(t.h=1,wo(16),r=!1),t.b=t.b&&r,r?0<n.length&&!t.V&&(t.V=!0,(e=t.g).a==t&&e.U&&!e.F&&(e.c.info("Great, no buffering proxy detected. Bytes received: "+n.length),rc(e),e.F=!0,wo(11))):(lo(t.c,t.f,n,"[Invalid Chunked Response]"),zo(t),jo(t))}function Vo(t,e){var n=t.D,r=e.indexOf("\n",n);return-1==r?Po:(n=Number(e.substring(n,r)),isNaN(n)?Lo:(r+=1)+n>e.length?Po:(e=e.substr(r,n),t.D=r+n,e))}function qo(t){t.T=Os()+t.P,Bo(t,t.P)}function Bo(t,e){if(null!=t.o)throw Error("WatchDog timer not null");t.o=Io(Ds(t.$a,t),e)}function $o(t){t.o&&(Ts.clearTimeout(t.o),t.o=null)}function jo(t){0==t.g.v||t.A||oc(t.g,t)}function zo(t){$o(t);var e=t.F;e&&"function"==typeof e.ka&&e.ka(),t.F=null,no(t.R),uo(t.J),t.a&&(e=t.a,t.a=null,e.abort(),e.ka())}function Ko(t,e){try{var n=t.g;if(0!=n.v&&(n.a==t||Ea(n.b,t)))if(n.I=t.N,!t.C&&Ea(n.b,t)&&3==n.v){try{var r=n.la.a.parse(e)}catch(g){r=null}if(Array.isArray(r)&&3==r.length){var s=r;if(0==s[0]){t:if(!n.j){if(n.a){if(!(n.a.u+3e3<t.u))break t;ic(n),Wa(n)}nc(n),wo(18)}}else n.pa=s[1],0<n.pa-n.P&&37500>s[2]&&n.G&&0==n.o&&!n.m&&(n.m=Io(Ds(n.Xa,n),6e3));if(1>=Ta(n.b)&&n.fa){try{n.fa()}catch(g){}n.fa=void 0}}else cc(n,11)}else if((t.C||n.a==t)&&ic(n),!qs(e))for(e=r=n.la.a.parse(e),r=0;r<e.length;r++)if(s=e[r],n.P=s[0],s=s[1],2==n.v)if("c"==s[0]){n.J=s[1],n.ha=s[2];var i=s[3];null!=i&&(n.ia=i,n.c.info("VER="+n.ia));var o=s[4];null!=o&&(n.qa=o,n.c.info("SVER="+n.qa));var a=s[5];if(null!=a&&"number"==typeof a&&0<a){var c=1.5*a;n.D=c,n.c.info("backChannelRequestTimeoutMs_="+c)}c=n;var u=t.a;if(u){var h=u.a?u.a.getResponseHeader("X-Client-Wire-Protocol"):null;if(h){var l=c.b;!l.a&&(js(h,"spdy")||js(h,"quic")||js(h,"h2"))&&(l.f=l.g,l.a=new Set,l.b&&(Sa(l,l.b),l.b=null))}if(c.A){var d=u.a?u.a.getResponseHeader("X-HTTP-Session-Id"):null;d&&(c.oa=d,ra(c.B,c.A,d))}}n.v=3,n.f&&n.f.ua(),n.U&&(n.N=Os()-t.u,n.c.info("Handshake RTT: "+n.N+"ms"));var f=t;if((c=n).ma=hc(c,c.C?c.ha:null,c.ga),f.C){ka(c.b,f);var p=f,m=c.D;m&&p.setTimeout(m),p.o&&($o(p),qo(p)),c.a=f}else ec(c);0<n.g.length&&Ya(n)}else"stop"!=s[0]&&"close"!=s[0]||cc(n,7);else 3==n.v&&("stop"==s[0]||"close"==s[0]?"stop"==s[0]?cc(n,7):Ga(n):"noop"!=s[0]&&n.f&&n.f.ta(s),n.o=0);yo(4)}catch(g){}}function Ho(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(Ss(t)||"string"==typeof t)Us(t,e,void 0);else{if(t.L&&"function"==typeof t.L)var n=t.L();else if(t.K&&"function"==typeof t.K)n=void 0;else if(Ss(t)||"string"==typeof t){n=[];for(var r=t.length,s=0;s<r;s++)n.push(s)}else for(s in n=[],r=0,t)n[r++]=s;s=(r=function(t){if(t.K&&"function"==typeof t.K)return t.K();if("string"==typeof t)return t.split("");if(Ss(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}for(r in e=[],n=0,t)e[n++]=t[r];return e}(t)).length;for(var i=0;i<s;i++)e.call(void 0,r[i],n&&n[i],t)}}function Go(t,e){this.b={},this.a=[],this.c=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var r=0;r<n;r+=2)this.set(arguments[r],arguments[r+1])}else if(t)if(t instanceof Go)for(n=t.L(),r=0;r<n.length;r++)this.set(n[r],t.get(n[r]));else for(r in t)this.set(r,t[r])}function Wo(t){if(t.c!=t.a.length){for(var e=0,n=0;e<t.a.length;){var r=t.a[e];Qo(t.b,r)&&(t.a[n++]=r),e++}t.a.length=n}if(t.c!=t.a.length){var s={};for(n=e=0;e<t.a.length;)Qo(s,r=t.a[e])||(t.a[n++]=r,s[r]=1),e++;t.a.length=n}}function Qo(t,e){return Object.prototype.hasOwnProperty.call(t,e)}(bs=xo.prototype).setTimeout=function(t){this.P=t},bs.bb=function(t){t=t.target;var e=this.F;e&&3==ja(t)?e.f():this.Da(t)},bs.Da=function(t){try{if(t==this.a)t:{var e=ja(this.a),n=this.a.va(),r=this.a.W();if(!(3>e||3==e&&!ri&&!this.a.$())){this.A||4!=e||7==n||yo(8==n||0>=r?3:2),$o(this);var s=this.a.W();this.N=s;var i=this.a.$();if(this.b=200==s,function(t,e,n,r,s,i,o){t.info((function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+"\n"+n+"\n"+i+" "+o}))}(this.c,this.m,this.l,this.f,this.S,e,s),this.b){if(this.U&&!this.C){e:{if(this.a){var o,a=this.a;if((o=a.a?a.a.getResponseHeader("X-HTTP-Initial-Response"):null)&&!qs(o)){var c=o;break e}}c=null}if(!c){this.b=!1,this.h=3,wo(12),zo(this),jo(this);break t}lo(this.c,this.f,c,"Initial handshake response via X-HTTP-Initial-Response"),this.C=!0,Ko(this,c)}this.I?(Fo(this,e,i),ri&&this.b&&3==e&&(co(this.J,this.R,"tick",this.ab),this.R.start())):(lo(this.c,this.f,i,null),Ko(this,i)),4==e&&zo(this),this.b&&!this.A&&(4==e?oc(this.g,this):(this.b=!1,qo(this)))}else 400==s&&0<i.indexOf("Unknown SID")?(this.h=3,wo(12)):(this.h=0,wo(13)),zo(this),jo(this)}}}catch(u){}},bs.ab=function(){if(this.a){var t=ja(this.a),e=this.a.$();this.D<e.length&&($o(this),Fo(this,t,e),this.b&&4!=t&&qo(this))}},bs.cancel=function(){this.A=!0,zo(this)},bs.$a=function(){this.o=null;var t=Os();0<=t-this.T?(function(t,e){t.info((function(){return"TIMEOUT: "+e}))}(this.c,this.l),2!=this.G&&(yo(3),wo(17)),zo(this),this.h=2,jo(this)):Bo(this,this.T-t)},(bs=Go.prototype).K=function(){Wo(this);for(var t=[],e=0;e<this.a.length;e++)t.push(this.b[this.a[e]]);return t},bs.L=function(){return Wo(this),this.a.concat()},bs.get=function(t,e){return Qo(this.b,t)?this.b[t]:e},bs.set=function(t,e){Qo(this.b,t)||(this.c++,this.a.push(t)),this.b[t]=e},bs.forEach=function(t,e){for(var n=this.L(),r=0;r<n.length;r++){var s=n[r],i=this.get(s);t.call(e,i,s,this)}};var Xo=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function Yo(t,e){if(this.c=this.j=this.f="",this.h=null,this.i=this.g="",this.a=!1,t instanceof Yo){this.a=void 0!==e?e:t.a,Zo(this,t.f),this.j=t.j,ta(this,t.c),ea(this,t.h),this.g=t.g,e=t.b;var n=new fa;n.c=e.c,e.a&&(n.a=new Go(e.a),n.b=e.b),na(this,n),this.i=t.i}else t&&(n=String(t).match(Xo))?(this.a=!!e,Zo(this,n[1]||"",!0),this.j=ia(n[2]||""),ta(this,n[3]||"",!0),ea(this,n[4]),this.g=ia(n[5]||"",!0),na(this,n[6]||"",!0),this.i=ia(n[7]||"")):(this.a=!!e,this.b=new fa(null,this.a))}function Jo(t){return new Yo(t)}function Zo(t,e,n){t.f=n?ia(e,!0):e,t.f&&(t.f=t.f.replace(/:$/,""))}function ta(t,e,n){t.c=n?ia(e,!0):e}function ea(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.h=e}else t.h=null}function na(t,e,n){e instanceof fa?(t.b=e,function(t,e){e&&!t.f&&(pa(t),t.c=null,t.a.forEach((function(t,e){var n=e.toLowerCase();e!=n&&(ma(this,e),ya(this,n,t))}),t)),t.f=e}(t.b,t.a)):(n||(e=oa(e,la)),t.b=new fa(e,t.a))}function ra(t,e,n){t.b.set(e,n)}function sa(t){return ra(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Os()).toString(36)),t}function ia(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function oa(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,aa),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function aa(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}Yo.prototype.toString=function(){var t=[],e=this.f;e&&t.push(oa(e,ca,!0),":");var n=this.c;return(n||"file"==e)&&(t.push("//"),(e=this.j)&&t.push(oa(e,ca,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.h)&&t.push(":",String(n))),(n=this.g)&&(this.c&&"/"!=n.charAt(0)&&t.push("/"),t.push(oa(n,"/"==n.charAt(0)?ha:ua,!0))),(n=this.b.toString())&&t.push("?",n),(n=this.i)&&t.push("#",oa(n,da)),t.join("")};var ca=/[#\/\?@]/g,ua=/[#\?:]/g,ha=/[#\?]/g,la=/[#\?@]/g,da=/#/g;function fa(t,e){this.b=this.a=null,this.c=t||null,this.f=!!e}function pa(t){t.a||(t.a=new Go,t.b=0,t.c&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),s=null;if(0<=r){var i=t[n].substring(0,r);s=t[n].substring(r+1)}else i=t[n];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}(t.c,(function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)})))}function ma(t,e){pa(t),e=va(t,e),Qo(t.a.b,e)&&(t.c=null,t.b-=t.a.get(e).length,Qo((t=t.a).b,e)&&(delete t.b[e],t.c--,t.a.length>2*t.c&&Wo(t)))}function ga(t,e){return pa(t),e=va(t,e),Qo(t.a.b,e)}function ya(t,e,n){ma(t,e),0<n.length&&(t.c=null,t.a.set(va(t,e),Vs(n)),t.b+=n.length)}function va(t,e){return e=String(e),t.f&&(e=e.toLowerCase()),e}(bs=fa.prototype).add=function(t,e){pa(this),this.c=null,t=va(this,t);var n=this.a.get(t);return n||this.a.set(t,n=[]),n.push(e),this.b+=1,this},bs.forEach=function(t,e){pa(this),this.a.forEach((function(n,r){Us(n,(function(n){t.call(e,n,r,this)}),this)}),this)},bs.L=function(){pa(this);for(var t=this.a.K(),e=this.a.L(),n=[],r=0;r<e.length;r++)for(var s=t[r],i=0;i<s.length;i++)n.push(e[r]);return n},bs.K=function(t){pa(this);var e=[];if("string"==typeof t)ga(this,t)&&(e=Fs(e,this.a.get(va(this,t))));else{t=this.a.K();for(var n=0;n<t.length;n++)e=Fs(e,t[n])}return e},bs.set=function(t,e){return pa(this),this.c=null,ga(this,t=va(this,t))&&(this.b-=this.a.get(t).length),this.a.set(t,[e]),this.b+=1,this},bs.get=function(t,e){return t&&0<(t=this.K(t)).length?String(t[0]):e},bs.toString=function(){if(this.c)return this.c;if(!this.a)return"";for(var t=[],e=this.a.L(),n=0;n<e.length;n++){var r=e[n],s=encodeURIComponent(String(r));r=this.K(r);for(var i=0;i<r.length;i++){var o=s;""!==r[i]&&(o+="="+encodeURIComponent(String(r[i]))),t.push(o)}}return this.c=t.join("&")};var wa=function(t,e){this.b=t,this.a=e};function ba(t){this.g=t||Ia,Ts.PerformanceNavigationTiming?t=0<(t=Ts.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(Ts.ja&&Ts.ja.za&&Ts.ja.za()&&Ts.ja.za().Qb),this.f=t?this.g:1,this.a=null,1<this.f&&(this.a=new Set),this.b=null,this.c=[]}var Ia=10;function _a(t){return!!t.b||!!t.a&&t.a.size>=t.f}function Ta(t){return t.b?1:t.a?t.a.size:0}function Ea(t,e){return t.b?t.b==e:!!t.a&&t.a.has(e)}function Sa(t,e){t.a?t.a.add(e):t.b=e}function ka(t,e){t.b&&t.b==e?t.b=null:t.a&&t.a.has(e)&&t.a.delete(e)}function Ca(t){var e,n;if(null!=t.b)return t.c.concat(t.b.s);if(null!=t.a&&0!==t.a.size){var r=t.c;try{for(var s=ws(t.a.values()),i=s.next();!i.done;i=s.next()){var o=i.value;r=r.concat(o.s)}}catch(a){e={error:a}}finally{try{i&&!i.done&&(n=s.return)&&n.call(s)}finally{if(e)throw e.error}}return r}return Vs(t.c)}function Ra(){}function Aa(){this.a=new Ra}function Na(t,e,n){var r=n||"";try{Ho(t,(function(t,n){var s=t;ks(t)&&(s=zi(t)),e.push(r+n+"="+encodeURIComponent(s))}))}catch(s){throw e.push(r+"type="+encodeURIComponent("_badmap")),s}}function Da(t,e,n,r,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(r)}catch(i){}}ba.prototype.cancel=function(){var t,e;if(this.c=Ca(this),this.b)this.b.cancel(),this.b=null;else if(this.a&&0!==this.a.size){try{for(var n=ws(this.a.values()),r=n.next();!r.done;r=n.next()){r.value.cancel()}}catch(s){t={error:s}}finally{try{r&&!r.done&&(e=n.return)&&e.call(n)}finally{if(t)throw t.error}}this.a.clear()}},Ra.prototype.stringify=function(t){return Ts.JSON.stringify(t,void 0)},Ra.prototype.parse=function(t){return Ts.JSON.parse(t,void 0)};var xa=Ts.JSON.parse;function Oa(t){Bi.call(this),this.headers=new Go,this.l=t||null,this.b=!1,this.u=this.a=null,this.C="",this.h=0,this.f="",this.g=this.B=this.m=this.A=!1,this.s=0,this.o=null,this.I=La,this.F=this.G=!1}Ls(Oa,Bi);var La="",Pa=/^https?$/i,Ma=["POST","PUT"];function Ua(t){return"content-type"==t.toLowerCase()}function Fa(t,e){t.b=!1,t.a&&(t.g=!0,t.a.abort(),t.g=!1),t.f=e,t.h=5,Va(t),Ba(t)}function Va(t){t.A||(t.A=!0,$i(t,"complete"),$i(t,"error"))}function qa(t){if(t.b&&void 0!==_s&&(!t.u[1]||4!=ja(t)||2!=t.W()))if(t.m&&4==ja(t))ro(t.Aa,0,t);else if($i(t,"readystatechange"),4==ja(t)){t.b=!1;try{var e,n=t.W();t:switch(n){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var r=!0;break t;default:r=!1}if(!(e=r)){var s;if(s=0===n){var i=String(t.C).match(Xo)[1]||null;if(!i&&Ts.self&&Ts.self.location){var o=Ts.self.location.protocol;i=o.substr(0,o.length-1)}s=!Pa.test(i?i.toLowerCase():"")}e=s}if(e)$i(t,"complete"),$i(t,"success");else{t.h=6;try{var a=2<ja(t)?t.a.statusText:""}catch(c){a=""}t.f=a+" ["+t.W()+"]",Va(t)}}finally{Ba(t)}}}function Ba(t,e){if(t.a){$a(t);var n=t.a,r=t.u[0]?Es:null;t.a=null,t.u=null,e||$i(t,"ready");try{n.onreadystatechange=r}catch(s){}}}function $a(t){t.a&&t.F&&(t.a.ontimeout=null),t.o&&(Ts.clearTimeout(t.o),t.o=null)}function ja(t){return t.a?t.a.readyState:0}function za(t,e,n){t:{for(r in n){var r=!1;break t}r=!0}r||(n=function(t){var e="";return Gs(t,(function(t,n){e+=n,e+=":",e+=t,e+="\r\n"})),e}(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):ra(t,e,n))}function Ka(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function Ha(t){this.qa=0,this.g=[],this.c=new ho,this.ha=this.ma=this.B=this.ga=this.a=this.oa=this.A=this.V=this.i=this.O=this.l=null,this.Pa=this.R=0,this.Ma=Ka("failFast",!1,t),this.G=this.m=this.j=this.h=this.f=null,this.S=!0,this.I=this.pa=this.P=-1,this.T=this.o=this.u=0,this.Ia=Ka("baseRetryDelayMs",5e3,t),this.Sa=Ka("retryDelaySeedMs",1e4,t),this.Na=Ka("forwardChannelMaxRetries",2,t),this.na=Ka("forwardChannelRequestTimeoutMs",2e4,t),this.Oa=t&&t.xmlHttpFactory||void 0,this.D=void 0,this.C=t&&t.supportsCrossDomainXhr||!1,this.J="",this.b=new ba(t&&t.concurrentRequestLimit),this.la=new Aa,this.ea=t&&t.fastHandshake||!1,this.Ja=t&&t.b||!1,t&&t.f&&(this.c.a=!1),t&&t.forceLongPolling&&(this.S=!1),this.U=!this.ea&&this.S&&t&&t.detectBufferingProxy||!1,this.fa=void 0,this.N=0,this.F=!1,this.s=null,(this.La=t&&t.c||!1)&&this.c.info("Opt-in to enable Chrome Origin Trials.")}function Ga(t){if(Qa(t),3==t.v){var e=t.R++,n=Jo(t.B);ra(n,"SID",t.J),ra(n,"RID",e),ra(n,"TYPE","terminate"),Za(t,n),(e=new xo(t,t.c,e,void 0)).G=2,e.i=sa(Jo(n)),n=!1,Ts.navigator&&Ts.navigator.sendBeacon&&(n=Ts.navigator.sendBeacon(e.i.toString(),"")),!n&&Ts.Image&&((new Image).src=e.i,n=!0),n||(e.a=lc(e.g,null),e.a.ba(e.i)),e.u=Os(),qo(e)}uc(t)}function Wa(t){t.a&&(rc(t),t.a.cancel(),t.a=null)}function Qa(t){Wa(t),t.j&&(Ts.clearTimeout(t.j),t.j=null),ic(t),t.b.cancel(),t.h&&("number"==typeof t.h&&Ts.clearTimeout(t.h),t.h=null)}function Xa(t,e){t.g.push(new wa(t.Pa++,e)),3==t.v&&Ya(t)}function Ya(t){_a(t.b)||t.h||(t.h=!0,Yi(t.Ca,t),t.u=0)}function Ja(t,e){var n;n=e?e.f:t.R++;var r=Jo(t.B);ra(r,"SID",t.J),ra(r,"RID",n),ra(r,"AID",t.P),Za(t,r),t.i&&t.l&&za(r,t.i,t.l),n=new xo(t,t.c,n,t.u+1),null===t.i&&(n.B=t.l),e&&(t.g=e.s.concat(t.g)),e=tc(t,n,1e3),n.setTimeout(Math.round(.5*t.na)+Math.round(.5*t.na*Math.random())),Sa(t.b,n),Mo(n,r,e)}function Za(t,e){t.f&&Ho({},(function(t,n){ra(e,n,t)}))}function tc(t,e,n){n=Math.min(t.g.length,n);var r=t.f?Ds(t.f.Ka,t.f,t):null;t:for(var s=t.g,i=-1;;){var o=["count="+n];-1==i?0<n?(i=s[0].b,o.push("ofs="+i)):i=0:o.push("ofs="+i);for(var a=!0,c=0;c<n;c++){var u=s[c].b,h=s[c].a;if(0>(u-=i))i=Math.max(0,s[c].b-100),a=!1;else try{Na(h,o,"req"+u+"_")}catch(l){r&&r(h)}}if(a){r=o.join("&");break t}}return t=t.g.splice(0,n),e.s=t,r}function ec(t){t.a||t.j||(t.T=1,Yi(t.Ba,t),t.o=0)}function nc(t){return!(t.a||t.j||3<=t.o)&&(t.T++,t.j=Io(Ds(t.Ba,t),ac(t,t.o)),t.o++,!0)}function rc(t){null!=t.s&&(Ts.clearTimeout(t.s),t.s=null)}function sc(t){t.a=new xo(t,t.c,"rpc",t.T),null===t.i&&(t.a.B=t.l),t.a.O=0;var e=Jo(t.ma);ra(e,"RID","rpc"),ra(e,"SID",t.J),ra(e,"CI",t.G?"0":"1"),ra(e,"AID",t.P),Za(t,e),ra(e,"TYPE","xmlhttp"),t.i&&t.l&&za(e,t.i,t.l),t.D&&t.a.setTimeout(t.D);var n=t.a;t=t.ha,n.G=1,n.i=sa(Jo(e)),n.j=null,n.I=!0,Uo(n,t)}function ic(t){null!=t.m&&(Ts.clearTimeout(t.m),t.m=null)}function oc(t,e){var n=null;if(t.a==e){ic(t),rc(t),t.a=null;var r=2}else{if(!Ea(t.b,e))return;n=e.s,ka(t.b,e),r=1}if(t.I=e.N,0!=t.v)if(e.b)if(1==r){n=e.j?e.j.length:0,e=Os()-e.u;var s=t.u;$i(r=mo(),new bo(r,n,e,s)),Ya(t)}else ec(t);else if(3==(s=e.h)||0==s&&0<t.I||!(1==r&&function(t,e){return!(Ta(t.b)>=t.b.f-(t.h?1:0)||(t.h?(t.g=e.s.concat(t.g),0):1==t.v||2==t.v||t.u>=(t.Ma?0:t.Na)||(t.h=Io(Ds(t.Ca,t,e),ac(t,t.u)),t.u++,0)))}(t,e)||2==r&&nc(t)))switch(n&&0<n.length&&(e=t.b,e.c=e.c.concat(n)),s){case 1:cc(t,5);break;case 4:cc(t,10);break;case 3:cc(t,6);break;default:cc(t,2)}}function ac(t,e){var n=t.Ia+Math.floor(Math.random()*t.Sa);return t.f||(n*=2),n*e}function cc(t,e){if(t.c.info("Error code "+e),2==e){var n=null;t.f&&(n=null);var r=Ds(t.cb,t);n||(n=new Yo("//www.google.com/images/cleardot.gif"),Ts.location&&"http"==Ts.location.protocol||Zo(n,"https"),sa(n)),function(t,e){var n=new ho;if(Ts.Image){var r=new Image;r.onload=xs(Da,n,r,"TestLoadImage: loaded",!0,e),r.onerror=xs(Da,n,r,"TestLoadImage: error",!1,e),r.onabort=xs(Da,n,r,"TestLoadImage: abort",!1,e),r.ontimeout=xs(Da,n,r,"TestLoadImage: timeout",!1,e),Ts.setTimeout((function(){r.ontimeout&&r.ontimeout()}),1e4),r.src=t}else e(!1)}(n.toString(),r)}else wo(2);t.v=0,t.f&&t.f.sa(e),uc(t),Qa(t)}function uc(t){t.v=0,t.I=-1,t.f&&(0==Ca(t.b).length&&0==t.g.length||(t.b.c.length=0,Vs(t.g),t.g.length=0),t.f.ra())}function hc(t,e,n){var r=function(t){return t instanceof Yo?Jo(t):new Yo(t,void 0)}(n);if(""!=r.c)e&&ta(r,e+"."+r.c),ea(r,r.h);else{var s=Ts.location;r=function(t,e,n,r){var s=new Yo(null,void 0);return t&&Zo(s,t),e&&ta(s,e),n&&ea(s,n),r&&(s.g=r),s}(s.protocol,e?e+"."+s.hostname:s.hostname,+s.port,n)}return t.V&&Gs(t.V,(function(t,e){ra(r,e,t)})),e=t.A,n=t.oa,e&&n&&ra(r,e,n),ra(r,"VER",t.ia),Za(t,r),r}function lc(t,e){if(e&&!t.C)throw Error("Can't create secondary domain capable XhrIo object.");return(e=new Oa(t.Oa)).G=t.C,e}function dc(){}function fc(){if(ei&&!(10<=Number(pi)))throw Error("Environmental error: no available transport.")}function pc(t,e){Bi.call(this),this.a=new Ha(e),this.g=t,this.b=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.a.l=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.a&&(t?t["X-WebChannel-Client-Profile"]=e.a:t={"X-WebChannel-Client-Profile":e.a}),this.a.O=t,(t=e&&e.httpHeadersOverwriteParam)&&!qs(t)&&(this.a.i=t),this.o=e&&e.supportsCrossDomainXhr||!1,this.m=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!qs(e)&&(this.a.A=e,null!==(t=this.b)&&e in t&&(e in(t=this.b)&&delete t[e])),this.f=new yc(this)}function mc(t){Ao.call(this);var e=t.__sm__;if(e){t:{for(var n in e){t=n;break t}t=void 0}(this.c=t)?(t=this.c,this.data=null!==e&&t in e?e[t]:void 0):this.data=e}else this.data=t}function gc(){No.call(this),this.status=1}function yc(t){this.a=t}function vc(t){this.f=t}function wc(t){Bi.call(this),this.u=t,this.h=void 0,this.readyState=bc,this.status=0,this.responseType=this.responseText=this.statusText="",this.onreadystatechange=null,this.l=new Headers,this.b=null,this.s="GET",this.o="",this.a=!1,this.m=this.f=this.g=null}(bs=Oa.prototype).ba=function(t,e,n,r){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.C+"; newUri="+t);e=e?e.toUpperCase():"GET",this.C=t,this.f="",this.h=0,this.A=!1,this.b=!0,this.a=this.l?this.l.a():Co.a(),this.u=this.l?So(this.l):So(Co),this.a.onreadystatechange=Ds(this.Aa,this);try{this.B=!0,this.a.open(e,String(t),!0),this.B=!1}catch(i){return void Fa(this,i)}t=n||"";var s=new Go(this.headers);r&&Ho(r,(function(t,e){s.set(e,t)})),r=function(t){t:{for(var e=Ua,n=t.length,r="string"==typeof t?t.split(""):t,s=0;s<n;s++)if(s in r&&e.call(void 0,r[s],s,t)){e=s;break t}e=-1}return 0>e?null:"string"==typeof t?t.charAt(e):t[e]}(s.L()),n=Ts.FormData&&t instanceof Ts.FormData,!(0<=Ms(Ma,e))||r||n||s.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),s.forEach((function(t,e){this.a.setRequestHeader(e,t)}),this),this.I&&(this.a.responseType=this.I),"withCredentials"in this.a&&this.a.withCredentials!==this.G&&(this.a.withCredentials=this.G);try{$a(this),0<this.s&&((this.F=function(t){return ei&&di(9)&&"number"==typeof t.timeout&&void 0!==t.ontimeout}(this.a))?(this.a.timeout=this.s,this.a.ontimeout=Ds(this.ya,this)):this.o=ro(this.ya,this.s,this)),this.m=!0,this.a.send(t),this.m=!1}catch(i){Fa(this,i)}},bs.ya=function(){void 0!==_s&&this.a&&(this.f="Timed out after "+this.s+"ms, aborting",this.h=8,$i(this,"timeout"),this.abort(8))},bs.abort=function(t){this.a&&this.b&&(this.b=!1,this.g=!0,this.a.abort(),this.g=!1,this.h=t||7,$i(this,"complete"),$i(this,"abort"),Ba(this))},bs.H=function(){this.a&&(this.b&&(this.b=!1,this.g=!0,this.a.abort(),this.g=!1),Ba(this,!0)),Oa.X.H.call(this)},bs.Aa=function(){this.j||(this.B||this.m||this.g?qa(this):this.Za())},bs.Za=function(){qa(this)},bs.W=function(){try{return 2<ja(this)?this.a.status:-1}catch(Zs){return-1}},bs.$=function(){try{return this.a?this.a.responseText:""}catch(Zs){return""}},bs.Qa=function(t){if(this.a){var e=this.a.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),xa(e)}},bs.va=function(){return this.h},bs.Ra=function(){return"string"==typeof this.f?this.f:String(this.f)},(bs=Ha.prototype).ia=8,bs.v=1,bs.Ca=function(t){if(this.h)if(this.h=null,1==this.v){if(!t){this.R=Math.floor(1e5*Math.random()),t=this.R++;var e,n=new xo(this,this.c,t,void 0),r=this.l;if(this.O&&(r?Xs(r=Ws(r),this.O):r=this.O),null===this.i&&(n.B=r),this.ea)t:{for(var s=e=0;s<this.g.length;s++){var i=this.g[s];if(void 0===(i="__data__"in i.a&&"string"==typeof(i=i.a.__data__)?i.length:void 0))break;if(4096<(e+=i)){e=s;break t}if(4096===e||s===this.g.length-1){e=s+1;break t}}e=1e3}else e=1e3;e=tc(this,n,e),ra(s=Jo(this.B),"RID",t),ra(s,"CVER",22),this.A&&ra(s,"X-HTTP-Session-Id",this.A),Za(this,s),this.i&&r&&za(s,this.i,r),Sa(this.b,n),this.Ja&&ra(s,"TYPE","init"),this.ea?(ra(s,"$req",e),ra(s,"SID","null"),n.U=!0,Mo(n,s,null)):Mo(n,s,e),this.v=2}}else 3==this.v&&(t?Ja(this,t):0==this.g.length||_a(this.b)||Ja(this))},bs.Ba=function(){if(this.j=null,sc(this),this.U&&!(this.F||null==this.a||0>=this.N)){var t=2*this.N;this.c.info("BP detection timer enabled: "+t),this.s=Io(Ds(this.Ya,this),t)}},bs.Ya=function(){this.s&&(this.s=null,this.c.info("BP detection timeout reached."),this.c.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.F=!0,wo(10),Wa(this),sc(this))},bs.Xa=function(){null!=this.m&&(this.m=null,Wa(this),nc(this),wo(19))},bs.cb=function(t){t?(this.c.info("Successfully pinged google.com"),wo(2)):(this.c.info("Failed to ping google.com"),wo(1))},(bs=dc.prototype).ua=function(){},bs.ta=function(){},bs.sa=function(){},bs.ra=function(){},bs.Ka=function(){},fc.prototype.a=function(t,e){return new pc(t,e)},Ls(pc,Bi),pc.prototype.h=function(){this.a.f=this.f,this.o&&(this.a.C=!0);var t=this.a,e=this.g,n=this.b||void 0;wo(0),t.ga=e,t.V=n||{},t.G=t.S,t.B=hc(t,null,t.ga),Ya(t)},pc.prototype.close=function(){Ga(this.a)},pc.prototype.l=function(t){if("string"==typeof t){var e={};e.__data__=t,Xa(this.a,e)}else this.m?((e={}).__data__=zi(t),Xa(this.a,e)):Xa(this.a,t)},pc.prototype.H=function(){this.a.f=null,delete this.f,Ga(this.a),delete this.a,pc.X.H.call(this)},Ls(mc,Ao),Ls(gc,No),Ls(yc,dc),yc.prototype.ua=function(){$i(this.a,"a")},yc.prototype.ta=function(t){$i(this.a,new mc(t))},yc.prototype.sa=function(t){$i(this.a,new gc(t))},yc.prototype.ra=function(){$i(this.a,"b")},Ls(vc,Eo),vc.prototype.a=function(){return new wc(this.f)},vc.prototype.c=function(t){return function(){return t}}({}),Ls(wc,Bi);var bc=0;function Ic(t){t.f.read().then(t.Ta.bind(t)).catch(t.ca.bind(t))}function _c(t){t.readyState=4,t.g=null,t.f=null,t.m=null,Tc(t)}function Tc(t){t.onreadystatechange&&t.onreadystatechange.call(t)}(bs=wc.prototype).open=function(t,e){if(this.readyState!=bc)throw this.abort(),Error("Error reopening a connection");this.s=t,this.o=e,this.readyState=1,Tc(this)},bs.send=function(t){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.a=!0;var e={headers:this.l,method:this.s,credentials:this.h,cache:void 0};t&&(e.body=t),this.u.fetch(new Request(this.o,e)).then(this.Wa.bind(this),this.ca.bind(this))},bs.abort=function(){this.responseText="",this.l=new Headers,this.status=0,this.f&&this.f.cancel("Request was aborted."),1<=this.readyState&&this.a&&4!=this.readyState&&(this.a=!1,_c(this)),this.readyState=bc},bs.Wa=function(t){this.a&&(this.g=t,this.b||(this.status=this.g.status,this.statusText=this.g.statusText,this.b=t.headers,this.readyState=2,Tc(this)),this.a&&(this.readyState=3,Tc(this),this.a&&("arraybuffer"===this.responseType?t.arrayBuffer().then(this.Ua.bind(this),this.ca.bind(this)):void 0!==Ts.ReadableStream&&"body"in t?(this.responseText="",this.f=t.body.getReader(),this.m=new TextDecoder,Ic(this)):t.text().then(this.Va.bind(this),this.ca.bind(this)))))},bs.Ta=function(t){if(this.a){var e=this.m.decode(t.value?t.value:new Uint8Array(0),{stream:!t.done});e&&(this.responseText+=e),t.done?_c(this):Tc(this),3==this.readyState&&Ic(this)}},bs.Va=function(t){this.a&&(this.responseText=t,_c(this))},bs.Ua=function(){this.a&&_c(this)},bs.ca=function(){this.a&&_c(this)},bs.setRequestHeader=function(t,e){this.l.append(t,e)},bs.getResponseHeader=function(t){return this.b&&this.b.get(t.toLowerCase())||""},bs.getAllResponseHeaders=function(){if(!this.b)return"";for(var t=[],e=this.b.entries(),n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join("\r\n")},Object.defineProperty(wc.prototype,"withCredentials",{get:function(){return"include"===this.h},set:function(t){this.h=t?"include":"same-origin"}}),fc.prototype.createWebChannel=fc.prototype.a,pc.prototype.send=pc.prototype.l,pc.prototype.open=pc.prototype.h,pc.prototype.close=pc.prototype.close,_o.NO_ERROR=0,_o.TIMEOUT=8,_o.HTTP_ERROR=6,To.COMPLETE="complete",ko.EventType=Ro,Ro.OPEN="a",Ro.CLOSE="b",Ro.ERROR="c",Ro.MESSAGE="d",Bi.prototype.listen=Bi.prototype.wa,Oa.prototype.listenOnce=Oa.prototype.xa,Oa.prototype.getLastError=Oa.prototype.Ra,Oa.prototype.getLastErrorCode=Oa.prototype.va,Oa.prototype.getStatus=Oa.prototype.W,Oa.prototype.getResponseJson=Oa.prototype.Qa,Oa.prototype.getResponseText=Oa.prototype.$,Oa.prototype.send=Oa.prototype.ba;var Ec=_o,Sc=To,kc=fo,Cc=10,Rc=11,Ac=vc,Nc=ko,Dc=Oa;
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
let xc="8.6.8";
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
 */class Oc{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.t(t),this.i=t=>e.writeSequenceNumber(t))}t(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.i&&this.i(t),t}}Oc.o=-1;
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
const Lc={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Pc extends Error{constructor(t,e){super(e),this.code=t,this.message=e,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
 */const Mc=new ge("@firebase/firestore");function Uc(){return Mc.logLevel}function Fc(t,...e){if(Mc.logLevel<=ce.DEBUG){const n=e.map(Bc);Mc.debug(`Firestore (${xc}): ${t}`,...n)}}function Vc(t,...e){if(Mc.logLevel<=ce.ERROR){const n=e.map(Bc);Mc.error(`Firestore (${xc}): ${t}`,...n)}}function qc(t,...e){if(Mc.logLevel<=ce.WARN){const n=e.map(Bc);Mc.warn(`Firestore (${xc}): ${t}`,...n)}}function Bc(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e)}catch(n){return t}var e}
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
 */function $c(t="Unexpected state"){const e=`FIRESTORE (${xc}) INTERNAL ASSERTION FAILED: `+t;throw Vc(e),new Error(e)}function jc(t,e){t||$c()}function zc(t,e){return t}
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
 */function Kc(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}
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
 */class Hc{static u(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let n="";for(;n.length<20;){const r=Kc(40);for(let s=0;s<r.length;++s)n.length<20&&r[s]<e&&(n+=t.charAt(r[s]%t.length))}return n}}function Gc(t,e){return t<e?-1:t>e?1:0}function Wc(t,e,n){return t.length===e.length&&t.every(((t,r)=>n(t,e[r])))}function Qc(t){return t+"\0"}
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
 */class Xc{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new Pc(Lc.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new Pc(Lc.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new Pc(Lc.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new Pc(Lc.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return Xc.fromMillis(Date.now())}static fromDate(t){return Xc.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new Xc(e,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?Gc(this.nanoseconds,t.nanoseconds):Gc(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
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
 */class Yc{constructor(t){this.timestamp=t}static fromTimestamp(t){return new Yc(t)}static min(){return new Yc(new Xc(0,0))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
 */function Jc(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Zc(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function tu(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
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
 */class eu{constructor(t,e,n){void 0===e?e=0:e>t.length&&$c(),void 0===n?n=t.length-e:n>t.length-e&&$c(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===eu.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof eu?t.forEach((t=>{e.push(t)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=t.get(r),s=e.get(r);if(n<s)return-1;if(n>s)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class nu extends eu{construct(t,e,n){return new nu(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new Pc(Lc.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((t=>t.length>0)))}return new nu(e)}static emptyPath(){return new nu([])}}const ru=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class su extends eu{construct(t,e,n){return new su(t,e,n)}static isValidIdentifier(t){return ru.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),su.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new su(["__name__"])}static fromServerFormat(t){const e=[];let n="",r=0;const s=()=>{if(0===n.length)throw new Pc(Lc.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let i=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new Pc(Lc.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new Pc(Lc.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(i=!i,r++):"."!==e||i?(n+=e,r++):(s(),r++)}if(s(),i)throw new Pc(Lc.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new su(e)}static emptyPath(){return new su([])}}
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
 */class iu{constructor(t){this.fields=t,t.sort(su.comparator)}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Wc(this.fields,t.fields,((t,e)=>t.isEqual(e)))}}
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
 */class ou{constructor(t){this.binaryString=t}static fromBase64String(t){const e=atob(t);return new ou(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new ou(e)}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return Gc(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ou.EMPTY_BYTE_STRING=new ou("");const au=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function cu(t){if(jc(!!t),"string"==typeof t){let e=0;const n=au.exec(t);if(jc(!!n),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:uu(t.seconds),nanos:uu(t.nanos)}}function uu(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function hu(t){return"string"==typeof t?ou.fromBase64String(t):ou.fromUint8Array(t)}
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
 */function lu(t){var e,n;return"server_timestamp"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function du(t){const e=t.mapValue.fields.__previous_value__;return lu(e)?du(e):e}function fu(t){const e=cu(t.mapValue.fields.__local_write_time__.timestampValue);return new Xc(e.seconds,e.nanos)}
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
 */function pu(t){return null==t}function mu(t){return 0===t&&1/t==-1/0}
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
class gu{constructor(t){this.path=t}static fromPath(t){return new gu(nu.fromString(t))}static fromName(t){return new gu(nu.fromString(t).popFirst(5))}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}isEqual(t){return null!==t&&0===nu.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return nu.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new gu(new nu(t.slice()))}}
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
 */function yu(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?lu(t)?4:10:$c()}function vu(t,e){const n=yu(t);if(n!==yu(e))return!1;switch(n){case 0:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return fu(t).isEqual(fu(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=cu(t.timestampValue),r=cu(e.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return r=e,hu(t.bytesValue).isEqual(hu(r.bytesValue));case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return uu(t.geoPointValue.latitude)===uu(e.geoPointValue.latitude)&&uu(t.geoPointValue.longitude)===uu(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return uu(t.integerValue)===uu(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=uu(t.doubleValue),r=uu(e.doubleValue);return n===r?mu(n)===mu(r):isNaN(n)&&isNaN(r)}return!1}(t,e);case 9:return Wc(t.arrayValue.values||[],e.arrayValue.values||[],vu);case 10:return function(t,e){const n=t.mapValue.fields||{},r=e.mapValue.fields||{};if(Jc(n)!==Jc(r))return!1;for(const s in n)if(n.hasOwnProperty(s)&&(void 0===r[s]||!vu(n[s],r[s])))return!1;return!0}(t,e);default:return $c()}var r}function wu(t,e){return void 0!==(t.values||[]).find((t=>vu(t,e)))}function bu(t,e){const n=yu(t),r=yu(e);if(n!==r)return Gc(n,r);switch(n){case 0:return 0;case 1:return Gc(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=uu(t.integerValue||t.doubleValue),r=uu(e.integerValue||e.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(t,e);case 3:return Iu(t.timestampValue,e.timestampValue);case 4:return Iu(fu(t),fu(e));case 5:return Gc(t.stringValue,e.stringValue);case 6:return function(t,e){const n=hu(t),r=hu(e);return n.compareTo(r)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),r=e.split("/");for(let s=0;s<n.length&&s<r.length;s++){const t=Gc(n[s],r[s]);if(0!==t)return t}return Gc(n.length,r.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=Gc(uu(t.latitude),uu(e.latitude));return 0!==n?n:Gc(uu(t.longitude),uu(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const t=bu(n[s],r[s]);if(t)return t}return Gc(n.length,r.length)}(t.arrayValue,e.arrayValue);case 10:return function(t,e){const n=t.fields||{},r=Object.keys(n),s=e.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let o=0;o<r.length&&o<i.length;++o){const t=Gc(r[o],i[o]);if(0!==t)return t;const e=bu(n[r[o]],s[i[o]]);if(0!==e)return e}return Gc(r.length,i.length)}(t.mapValue,e.mapValue);default:throw $c()}}function Iu(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return Gc(t,e);const n=cu(t),r=cu(e),s=Gc(n.seconds,r.seconds);return 0!==s?s:Gc(n.nanos,r.nanos)}function _u(t){return Tu(t)}function Tu(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=cu(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?hu(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,gu.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(t){let e="[",n=!0;for(const r of t.values||[])n?n=!1:e+=",",e+=Tu(r);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",r=!0;for(const s of e)r?r=!1:n+=",",n+=`${s}:${Tu(t.fields[s])}`;return n+"}"}(t.mapValue):$c();var e,n}function Eu(t){return!!t&&"integerValue"in t}function Su(t){return!!t&&"arrayValue"in t}function ku(t){return!!t&&"nullValue"in t}function Cu(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Ru(t){return!!t&&"mapValue"in t}function Au(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue)return{timestampValue:Object.assign({},cu(t.timestampValue))};if(t.mapValue){const e={mapValue:{fields:{}}};return Zc(t.mapValue.fields,((t,n)=>e.mapValue.fields[t]=Au(n))),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Au(t.arrayValue.values[n]);return e}return Object.assign({},t)}
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
 */class Nu{constructor(t){this.value=t}static empty(){return new Nu({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Ru(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Au(e)}setAll(t){let e=su.emptyPath(),n={},r=[];t.forEach(((t,s)=>{if(!e.isImmediateParentOf(s)){const t=this.getFieldsMap(e);this.applyChanges(t,n,r),n={},r=[],e=s.popLast()}t?n[s.lastSegment()]=Au(t):r.push(s.lastSegment())}));const s=this.getFieldsMap(e);this.applyChanges(s,n,r)}delete(t){const e=this.field(t.popLast());Ru(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return vu(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let r=e.mapValue.fields[t.get(n)];Ru(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=r),e=r}return e.mapValue.fields}applyChanges(t,e,n){Zc(e,((e,n)=>t[e]=n));for(const r of n)delete t[r]}clone(){return new Nu(Au(this.value))}}function Du(t){const e=[];return Zc(t.fields,((t,n)=>{const r=new su([t]);if(Ru(n)){const t=Du(n.mapValue).fields;if(0===t.length)e.push(r);else for(const n of t)e.push(r.child(n))}else e.push(r)})),new iu(e)
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
 */}class xu{constructor(t,e,n,r,s){this.key=t,this.documentType=e,this.version=n,this.data=r,this.documentState=s}static newInvalidDocument(t){return new xu(t,0,Yc.min(),Nu.empty(),0)}static newFoundDocument(t,e,n){return new xu(t,1,e,n,0)}static newNoDocument(t,e){return new xu(t,2,e,Nu.empty(),0)}static newUnknownDocument(t,e){return new xu(t,3,e,Nu.empty(),2)}convertToFoundDocument(t,e){return this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Nu.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Nu.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof xu&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}clone(){return new xu(this.key,this.documentType,this.version,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
 */class Ou{constructor(t,e=null,n=[],r=[],s=null,i=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=o,this.h=null}}function Lu(t,e=null,n=[],r=[],s=null,i=null,o=null){return new Ou(t,e,n,r,s,i,o)}function Pu(t){const e=zc(t);if(null===e.h){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((t=>function(t){return t.field.canonicalString()+t.op.toString()+_u(t.value)}(t))).join(","),t+="|ob:",t+=e.orderBy.map((t=>{return(e=t).field.canonicalString()+e.dir;var e})).join(","),pu(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=Wu(e.startAt)),e.endAt&&(t+="|ub:",t+=Wu(e.endAt)),e.h=t}return e.h}function Mu(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let s=0;s<t.orderBy.length;s++)if(!Xu(t.orderBy[s],e.orderBy[s]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let s=0;s<t.filters.length;s++)if(n=t.filters[s],r=e.filters[s],n.op!==r.op||!n.field.isEqual(r.field)||!vu(n.value,r.value))return!1;var n,r;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Ju(t.startAt,e.startAt)&&Ju(t.endAt,e.endAt)}function Uu(t){return gu.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}class Fu extends class{}{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.l(t,e,n):new Vu(t,e,n):"array-contains"===e?new ju(t,n):"in"===e?new zu(t,n):"not-in"===e?new Ku(t,n):"array-contains-any"===e?new Hu(t,n):new Fu(t,e,n)}static l(t,e,n){return"in"===e?new qu(t,n):new Bu(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&this.m(bu(e,this.value)):null!==e&&yu(this.value)===yu(e)&&this.m(bu(e,this.value))}m(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return $c()}}g(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class Vu extends Fu{constructor(t,e,n){super(t,e,n),this.key=gu.fromName(n.referenceValue)}matches(t){const e=gu.comparator(t.key,this.key);return this.m(e)}}class qu extends Fu{constructor(t,e){super(t,"in",e),this.keys=$u("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Bu extends Fu{constructor(t,e){super(t,"not-in",e),this.keys=$u("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function $u(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map((t=>gu.fromName(t.referenceValue)))}class ju extends Fu{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Su(e)&&wu(e.arrayValue,this.value)}}class zu extends Fu{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&wu(this.value.arrayValue,e)}}class Ku extends Fu{constructor(t,e){super(t,"not-in",e)}matches(t){if(wu(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&!wu(this.value.arrayValue,e)}}class Hu extends Fu{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Su(e)||!e.arrayValue.values)&&e.arrayValue.values.some((t=>wu(this.value.arrayValue,t)))}}class Gu{constructor(t,e){this.position=t,this.before=e}}function Wu(t){return`${t.before?"b":"a"}:${t.position.map((t=>_u(t))).join(",")}`}class Qu{constructor(t,e="asc"){this.field=t,this.dir=e}}function Xu(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}function Yu(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(r=i.field.isKeyField()?gu.comparator(gu.fromName(o.referenceValue),n.key):bu(o,n.data.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return t.before?r<=0:r<0}function Ju(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.before!==e.before||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!vu(t.position[n],e.position[n]))return!1;return!0}
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
 */class Zu{constructor(t,e=null,n=[],r=[],s=null,i="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=o,this.endAt=a,this.p=null,this.T=null,this.startAt,this.endAt}}function th(t){return new Zu(t)}function eh(t){return!pu(t.limit)&&"F"===t.limitType}function nh(t){return!pu(t.limit)&&"L"===t.limitType}function rh(t){const e=zc(t);if(null===e.p){e.p=[];const t=function(t){for(const e of t.filters)if(e.g())return e.field;return null}(e),n=function(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}(e);if(null!==t&&null===n)t.isKeyField()||e.p.push(new Qu(t)),e.p.push(new Qu(su.keyField(),"asc"));else{let t=!1;for(const n of e.explicitOrderBy)e.p.push(n),n.field.isKeyField()&&(t=!0);if(!t){const t=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.p.push(new Qu(su.keyField(),t))}}}return e.p}function sh(t){const e=zc(t);if(!e.T)if("F"===e.limitType)e.T=Lu(e.path,e.collectionGroup,rh(e),e.filters,e.limit,e.startAt,e.endAt);else{const t=[];for(const s of rh(e)){const e="desc"===s.dir?"asc":"desc";t.push(new Qu(s.field,e))}const n=e.endAt?new Gu(e.endAt.position,!e.endAt.before):null,r=e.startAt?new Gu(e.startAt.position,!e.startAt.before):null;e.T=Lu(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}return e.T}function ih(t,e){return Mu(sh(t),sh(e))&&t.limitType===e.limitType}function oh(t){return`${Pu(sh(t))}|lt:${t.limitType}`}function ah(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map((t=>{return`${(e=t).field.canonicalString()} ${e.op} ${_u(e.value)}`;var e})).join(", ")}]`),pu(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map((t=>{return`${(e=t).field.canonicalString()} (${e.dir})`;var e})).join(", ")}]`),t.startAt&&(e+=", startAt: "+Wu(t.startAt)),t.endAt&&(e+=", endAt: "+Wu(t.endAt)),`Target(${e})`}(sh(t))}; limitType=${t.limitType})`}function ch(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):gu.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of t.explicitOrderBy)if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&(r=e,!((n=t).startAt&&!Yu(n.startAt,rh(n),r)||n.endAt&&Yu(n.endAt,rh(n),r)));var n,r}function uh(t){return(e,n)=>{let r=!1;for(const s of rh(t)){const t=hh(s,e,n);if(0!==t)return t;r=r||s.field.isKeyField()}return 0}}function hh(t,e,n){const r=t.field.isKeyField()?gu.comparator(e.key,n.key):function(t,e,n){const r=e.data.field(t),s=n.data.field(t);return null!==r&&null!==s?bu(r,s):$c()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return $c()}}
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
 */function lh(t,e){if(t.I){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:mu(e)?"-0":e}}function dh(t){return{integerValue:""+t}}function fh(t,e){return function(t){return"number"==typeof t&&Number.isInteger(t)&&!mu(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}(e)?dh(e):lh(t,e)}
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
 */class ph{constructor(){this._=void 0}}function mh(t,e,n){return t instanceof vh?function(t,e){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&(n.fields.__previous_value__=e),{mapValue:n}}(n,e):t instanceof wh?bh(t,e):t instanceof Ih?_h(t,e):function(t,e){const n=yh(t,e),r=Eh(n)+Eh(t.A);return Eu(n)&&Eu(t.A)?dh(r):lh(t.R,r)}(t,e)}function gh(t,e,n){return t instanceof wh?bh(t,e):t instanceof Ih?_h(t,e):n}function yh(t,e){return t instanceof Th?Eu(r=e)||(n=r)&&"doubleValue"in n?e:{integerValue:0}:null;var n,r}class vh extends ph{}class wh extends ph{constructor(t){super(),this.elements=t}}function bh(t,e){const n=Sh(e);for(const r of t.elements)n.some((t=>vu(t,r)))||n.push(r);return{arrayValue:{values:n}}}class Ih extends ph{constructor(t){super(),this.elements=t}}function _h(t,e){let n=Sh(e);for(const r of t.elements)n=n.filter((t=>!vu(t,r)));return{arrayValue:{values:n}}}class Th extends ph{constructor(t,e){super(),this.R=t,this.A=e}}function Eh(t){return uu(t.integerValue||t.doubleValue)}function Sh(t){return Su(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
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
 */class kh{constructor(t,e){this.field=t,this.transform=e}}class Ch{constructor(t,e){this.version=t,this.transformResults=e}}class Rh{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Rh}static exists(t){return new Rh(void 0,t)}static updateTime(t){return new Rh(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Ah(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class Nh{}function Dh(t,e,n){var r;t instanceof Mh?function(t,e,n){const r=t.value.clone(),s=Vh(t.fieldTransforms,e,n.transformResults);r.setAll(s),e.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(t,e,n):t instanceof Uh?function(t,e,n){if(!Ah(t.precondition,e))return void e.convertToUnknownDocument(n.version);const r=Vh(t.fieldTransforms,e,n.transformResults),s=e.data;s.setAll(Fh(t)),s.setAll(r),e.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(t,e,n):(r=n,e.convertToNoDocument(r.version).setHasCommittedMutations())}function xh(t,e,n){var r;t instanceof Mh?function(t,e,n){if(!Ah(t.precondition,e))return;const r=t.value.clone(),s=qh(t.fieldTransforms,n,e);r.setAll(s),e.convertToFoundDocument(Ph(e),r).setHasLocalMutations()}(t,e,n):t instanceof Uh?function(t,e,n){if(!Ah(t.precondition,e))return;const r=qh(t.fieldTransforms,n,e),s=e.data;s.setAll(Fh(t)),s.setAll(r),e.convertToFoundDocument(Ph(e),s).setHasLocalMutations()}(t,e,n):(r=e,Ah(t.precondition,r)&&r.convertToNoDocument(Yc.min()))}function Oh(t,e){let n=null;for(const r of t.fieldTransforms){const t=e.data.field(r.field),s=yh(r.transform,t||null);null!=s&&(null==n&&(n=Nu.empty()),n.set(r.field,s))}return n||null}function Lh(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&(n=t.fieldTransforms,r=e.fieldTransforms,!!(void 0===n&&void 0===r||n&&r&&Wc(n,r,((t,e)=>function(t,e){return t.field.isEqual(e.field)&&(n=t.transform,r=e.transform,n instanceof wh&&r instanceof wh||n instanceof Ih&&r instanceof Ih?Wc(n.elements,r.elements,vu):n instanceof Th&&r instanceof Th?vu(n.A,r.A):n instanceof vh&&r instanceof vh);var n,r}(t,e))))&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask)));var n,r}function Ph(t){return t.isFoundDocument()?t.version:Yc.min()}class Mh extends Nh{constructor(t,e,n,r=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=r,this.type=0}}class Uh extends Nh{constructor(t,e,n,r,s=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}}function Fh(t){const e=new Map;return t.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}})),e}function Vh(t,e,n){const r=new Map;jc(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,gh(o,a,n[s]))}return r}function qh(t,e,n){const r=new Map;for(const s of t){const t=s.transform,i=n.data.field(s.field);r.set(s.field,mh(t,i,e))}return r}class Bh extends Nh{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}}class $h extends Nh{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}}
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
 */class jh{constructor(t){this.count=t}}
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
 */var zh,Kh;function Hh(t){if(void 0===t)return Vc("GRPC error has no .code"),Lc.UNKNOWN;switch(t){case zh.OK:return Lc.OK;case zh.CANCELLED:return Lc.CANCELLED;case zh.UNKNOWN:return Lc.UNKNOWN;case zh.DEADLINE_EXCEEDED:return Lc.DEADLINE_EXCEEDED;case zh.RESOURCE_EXHAUSTED:return Lc.RESOURCE_EXHAUSTED;case zh.INTERNAL:return Lc.INTERNAL;case zh.UNAVAILABLE:return Lc.UNAVAILABLE;case zh.UNAUTHENTICATED:return Lc.UNAUTHENTICATED;case zh.INVALID_ARGUMENT:return Lc.INVALID_ARGUMENT;case zh.NOT_FOUND:return Lc.NOT_FOUND;case zh.ALREADY_EXISTS:return Lc.ALREADY_EXISTS;case zh.PERMISSION_DENIED:return Lc.PERMISSION_DENIED;case zh.FAILED_PRECONDITION:return Lc.FAILED_PRECONDITION;case zh.ABORTED:return Lc.ABORTED;case zh.OUT_OF_RANGE:return Lc.OUT_OF_RANGE;case zh.UNIMPLEMENTED:return Lc.UNIMPLEMENTED;case zh.DATA_LOSS:return Lc.DATA_LOSS;default:return $c()}}(Kh=zh||(zh={}))[Kh.OK=0]="OK",Kh[Kh.CANCELLED=1]="CANCELLED",Kh[Kh.UNKNOWN=2]="UNKNOWN",Kh[Kh.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Kh[Kh.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Kh[Kh.NOT_FOUND=5]="NOT_FOUND",Kh[Kh.ALREADY_EXISTS=6]="ALREADY_EXISTS",Kh[Kh.PERMISSION_DENIED=7]="PERMISSION_DENIED",Kh[Kh.UNAUTHENTICATED=16]="UNAUTHENTICATED",Kh[Kh.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Kh[Kh.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Kh[Kh.ABORTED=10]="ABORTED",Kh[Kh.OUT_OF_RANGE=11]="OUT_OF_RANGE",Kh[Kh.UNIMPLEMENTED=12]="UNIMPLEMENTED",Kh[Kh.INTERNAL=13]="INTERNAL",Kh[Kh.UNAVAILABLE=14]="UNAVAILABLE",Kh[Kh.DATA_LOSS=15]="DATA_LOSS";
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
class Gh{constructor(t,e){this.comparator=t,this.root=e||Qh.EMPTY}insert(t,e){return new Gh(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Qh.BLACK,null,null))}remove(t){return new Gh(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Qh.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(0===r)return e+n.left.size;r<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Wh(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Wh(this.root,t,this.comparator,!1)}getReverseIterator(){return new Wh(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Wh(this.root,t,this.comparator,!0)}}class Wh{constructor(t,e,n,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!t.isEmpty();)if(s=e?n(t.key,e):1,r&&(s*=-1),s<0)t=this.isReverse?t.left:t.right;else{if(0===s){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Qh{constructor(t,e,n,r,s){this.key=t,this.value=e,this.color=null!=n?n:Qh.RED,this.left=null!=r?r:Qh.EMPTY,this.right=null!=s?s:Qh.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,r,s){return new Qh(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let r=this;const s=n(t,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(t,e,n),null):0===s?r.copy(null,e,null,null,null):r.copy(null,null,null,null,r.right.insert(t,e,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Qh.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,r=this;if(e(t,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(t,e),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===e(t,r.key)){if(r.right.isEmpty())return Qh.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(t,e))}return r.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Qh.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Qh.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw $c();if(this.right.isRed())throw $c();const t=this.left.check();if(t!==this.right.check())throw $c();return t+(this.isRed()?0:1)}}Qh.EMPTY=null,Qh.RED=!0,Qh.BLACK=!1,Qh.EMPTY=new class{constructor(){this.size=0}get key(){throw $c()}get value(){throw $c()}get color(){throw $c()}get left(){throw $c()}get right(){throw $c()}copy(t,e,n,r,s){return this}insert(t,e,n){return new Qh(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
class Xh{constructor(t){this.comparator=t,this.data=new Gh(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,n)=>(t(e),!1)))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,t[1])>=0)return;e(r.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Yh(this.data.getIterator())}getIteratorFrom(t){return new Yh(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((t=>{e=e.add(t)})),e}isEqual(t){if(!(t instanceof Xh))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(0!==this.comparator(t,r))return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new Xh(this.comparator);return e.data=t,e}}class Yh{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
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
 */const Jh=new Gh(gu.comparator);function Zh(){return Jh}const tl=new Gh(gu.comparator);function el(){return tl}const nl=new Gh(gu.comparator);const rl=new Xh(gu.comparator);function sl(...t){let e=rl;for(const n of t)e=e.add(n);return e}const il=new Xh(Gc);function ol(){return il}
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
 */class al{constructor(t,e,n,r,s){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(t,e){const n=new Map;return n.set(t,cl.createSynthesizedTargetChangeForCurrentChange(t,e)),new al(Yc.min(),n,ol(),Zh(),sl())}}class cl{constructor(t,e,n,r,s){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(t,e){return new cl(ou.EMPTY_BYTE_STRING,e,sl(),sl(),sl())}}
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
 */class ul{constructor(t,e,n,r){this.P=t,this.removedTargetIds=e,this.key=n,this.v=r}}class hl{constructor(t,e){this.targetId=t,this.V=e}}class ll{constructor(t,e,n=ou.EMPTY_BYTE_STRING,r=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=r}}class dl{constructor(){this.S=0,this.D=ml(),this.C=ou.EMPTY_BYTE_STRING,this.N=!1,this.k=!0}get current(){return this.N}get resumeToken(){return this.C}get $(){return 0!==this.S}get O(){return this.k}F(t){t.approximateByteSize()>0&&(this.k=!0,this.C=t)}M(){let t=sl(),e=sl(),n=sl();return this.D.forEach(((r,s)=>{switch(s){case 0:t=t.add(r);break;case 2:e=e.add(r);break;case 1:n=n.add(r);break;default:$c()}})),new cl(this.C,this.N,t,e,n)}L(){this.k=!1,this.D=ml()}B(t,e){this.k=!0,this.D=this.D.insert(t,e)}U(t){this.k=!0,this.D=this.D.remove(t)}q(){this.S+=1}K(){this.S-=1}j(){this.k=!0,this.N=!0}}class fl{constructor(t){this.W=t,this.G=new Map,this.H=Zh(),this.J=pl(),this.Y=new Xh(Gc)}X(t){for(const e of t.P)t.v&&t.v.isFoundDocument()?this.Z(e,t.v):this.tt(e,t.key,t.v);for(const e of t.removedTargetIds)this.tt(e,t.key,t.v)}et(t){this.forEachTarget(t,(e=>{const n=this.nt(e);switch(t.state){case 0:this.st(e)&&n.F(t.resumeToken);break;case 1:n.K(),n.$||n.L(),n.F(t.resumeToken);break;case 2:n.K(),n.$||this.removeTarget(e);break;case 3:this.st(e)&&(n.j(),n.F(t.resumeToken));break;case 4:this.st(e)&&(this.it(e),n.F(t.resumeToken));break;default:$c()}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.G.forEach(((t,n)=>{this.st(n)&&e(n)}))}rt(t){const e=t.targetId,n=t.V.count,r=this.ot(e);if(r){const t=r.target;if(Uu(t))if(0===n){const n=new gu(t.path);this.tt(e,n,xu.newNoDocument(n,Yc.min()))}else jc(1===n);else this.ct(e)!==n&&(this.it(e),this.Y=this.Y.add(e))}}ut(t){const e=new Map;this.G.forEach(((n,r)=>{const s=this.ot(r);if(s){if(n.current&&Uu(s.target)){const e=new gu(s.target.path);null!==this.H.get(e)||this.at(r,e)||this.tt(r,e,xu.newNoDocument(e,t))}n.O&&(e.set(r,n.M()),n.L())}}));let n=sl();this.J.forEach(((t,e)=>{let r=!0;e.forEachWhile((t=>{const e=this.ot(t);return!e||2===e.purpose||(r=!1,!1)})),r&&(n=n.add(t))}));const r=new al(t,e,this.Y,this.H,n);return this.H=Zh(),this.J=pl(),this.Y=new Xh(Gc),r}Z(t,e){if(!this.st(t))return;const n=this.at(t,e.key)?2:0;this.nt(t).B(e.key,n),this.H=this.H.insert(e.key,e),this.J=this.J.insert(e.key,this.ht(e.key).add(t))}tt(t,e,n){if(!this.st(t))return;const r=this.nt(t);this.at(t,e)?r.B(e,1):r.U(e),this.J=this.J.insert(e,this.ht(e).delete(t)),n&&(this.H=this.H.insert(e,n))}removeTarget(t){this.G.delete(t)}ct(t){const e=this.nt(t).M();return this.W.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}q(t){this.nt(t).q()}nt(t){let e=this.G.get(t);return e||(e=new dl,this.G.set(t,e)),e}ht(t){let e=this.J.get(t);return e||(e=new Xh(Gc),this.J=this.J.insert(t,e)),e}st(t){const e=null!==this.ot(t);return e||Fc("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.G.get(t);return e&&e.$?null:this.W.lt(t)}it(t){this.G.set(t,new dl),this.W.getRemoteKeysForTarget(t).forEach((e=>{this.tt(t,e,null)}))}at(t,e){return this.W.getRemoteKeysForTarget(t).has(e)}}function pl(){return new Gh(gu.comparator)}function ml(){return new Gh(gu.comparator)}
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
 */const gl={asc:"ASCENDING",desc:"DESCENDING"},yl={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};class vl{constructor(t,e){this.databaseId=t,this.I=e}}function wl(t,e){return t.I?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function bl(t,e){return t.I?e.toBase64():e.toUint8Array()}function Il(t,e){return wl(t,e.toTimestamp())}function _l(t){return jc(!!t),Yc.fromTimestamp(function(t){const e=cu(t);return new Xc(e.seconds,e.nanos)}(t))}function Tl(t,e){return(n=t,new nu(["projects",n.projectId,"databases",n.database])).child("documents").child(e).canonicalString();var n}function El(t){const e=nu.fromString(t);return jc(Gl(e)),e}function Sl(t,e){return Tl(t.databaseId,e.path)}function kl(t,e){const n=El(e);if(n.get(1)!==t.databaseId.projectId)throw new Pc(Lc.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new Pc(Lc.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new gu(Nl(n))}function Cl(t,e){return Tl(t.databaseId,e)}function Rl(t){const e=El(t);return 4===e.length?nu.emptyPath():Nl(e)}function Al(t){return new nu(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Nl(t){return jc(t.length>4&&"documents"===t.get(4)),t.popFirst(5)}function Dl(t,e,n){return{name:Sl(t,e),fields:n.value.mapValue.fields}}function xl(t,e){let n;if(e instanceof Mh)n={update:Dl(t,e.key,e.value)};else if(e instanceof Bh)n={delete:Sl(t,e.key)};else if(e instanceof Uh)n={update:Dl(t,e.key,e.data),updateMask:Hl(e.fieldMask)};else{if(!(e instanceof $h))return $c();n={verify:Sl(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((t=>function(t,e){const n=e.transform;if(n instanceof vh)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof wh)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Ih)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Th)return{fieldPath:e.field.canonicalString(),increment:n.A};throw $c()}(0,t)))),e.precondition.isNone||(n.currentDocument=(r=t,void 0!==(s=e.precondition).updateTime?{updateTime:Il(r,s.updateTime)}:void 0!==s.exists?{exists:s.exists}:$c())),n;var r,s}function Ol(t,e){const n=e.currentDocument?void 0!==(s=e.currentDocument).updateTime?Rh.updateTime(_l(s.updateTime)):void 0!==s.exists?Rh.exists(s.exists):Rh.none():Rh.none(),r=e.updateTransforms?e.updateTransforms.map((e=>function(t,e){let n=null;if("setToServerValue"in e)jc("REQUEST_TIME"===e.setToServerValue),n=new vh;else if("appendMissingElements"in e){const t=e.appendMissingElements.values||[];n=new wh(t)}else if("removeAllFromArray"in e){const t=e.removeAllFromArray.values||[];n=new Ih(t)}else"increment"in e?n=new Th(t,e.increment):$c();const r=su.fromServerFormat(e.fieldPath);return new kh(r,n)}(t,e))):[];var s;if(e.update){e.update.name;const s=kl(t,e.update.name),i=new Nu({mapValue:{fields:e.update.fields}});if(e.updateMask){const t=function(t){const e=t.fieldPaths||[];return new iu(e.map((t=>su.fromServerFormat(t))))}(e.updateMask);return new Uh(s,i,t,n,r)}return new Mh(s,i,n,r)}if(e.delete){const r=kl(t,e.delete);return new Bh(r,n)}if(e.verify){const r=kl(t,e.verify);return new $h(r,n)}return $c()}function Ll(t,e){return{documents:[Cl(t,e.path)]}}function Pl(t,e){const n={structuredQuery:{}},r=e.path;null!==e.collectionGroup?(n.parent=Cl(t,r),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=Cl(t,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const s=function(t){if(0===t.length)return;const e=t.map((t=>function(t){if("=="===t.op){if(Cu(t.value))return{unaryFilter:{field:$l(t.field),op:"IS_NAN"}};if(ku(t.value))return{unaryFilter:{field:$l(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(Cu(t.value))return{unaryFilter:{field:$l(t.field),op:"IS_NOT_NAN"}};if(ku(t.value))return{unaryFilter:{field:$l(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:$l(t.field),op:Bl(t.op),value:t.value}}}(t)));return 1===e.length?e[0]:{compositeFilter:{op:"AND",filters:e}}}(e.filters);s&&(n.structuredQuery.where=s);const i=function(t){if(0!==t.length)return t.map((t=>{return{field:$l((e=t).field),direction:ql(e.dir)};var e}))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=(a=t,c=e.limit,a.I||pu(c)?c:{value:c});var a,c;return null!==o&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt=Fl(e.startAt)),e.endAt&&(n.structuredQuery.endAt=Fl(e.endAt)),n}function Ml(t){let e=Rl(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){jc(1===r);const t=n.from[0];t.allDescendants?s=t.collectionId:e=e.child(t.collectionId)}let i=[];n.where&&(i=Ul(n.where));let o=[];n.orderBy&&(o=n.orderBy.map((t=>{return new Qu(jl((e=t).field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction));var e})));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,pu(e)?null:e}(n.limit));let c=null;n.startAt&&(c=Vl(n.startAt));let u=null;return n.endAt&&(u=Vl(n.endAt)),function(t,e,n,r,s,i,o,a){return new Zu(t,e,n,r,s,i,o,a)}(e,s,o,i,a,"F",c,u)}function Ul(t){return t?void 0!==t.unaryFilter?[Kl(t)]:void 0!==t.fieldFilter?[zl(t)]:void 0!==t.compositeFilter?t.compositeFilter.filters.map((t=>Ul(t))).reduce(((t,e)=>t.concat(e))):$c():[]}function Fl(t){return{before:t.before,values:t.position}}function Vl(t){const e=!!t.before,n=t.values||[];return new Gu(n,e)}function ql(t){return gl[t]}function Bl(t){return yl[t]}function $l(t){return{fieldPath:t.canonicalString()}}function jl(t){return su.fromServerFormat(t.fieldPath)}function zl(t){return Fu.create(jl(t.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":default:return $c()}}(t.fieldFilter.op),t.fieldFilter.value)}function Kl(t){switch(t.unaryFilter.op){case"IS_NAN":const e=jl(t.unaryFilter.field);return Fu.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=jl(t.unaryFilter.field);return Fu.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=jl(t.unaryFilter.field);return Fu.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=jl(t.unaryFilter.field);return Fu.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":default:return $c()}}function Hl(t){const e=[];return t.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Gl(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
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
 */function Wl(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Xl(e)),e=Ql(t.get(n),e);return Xl(e)}function Ql(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const e=t.charAt(s);switch(e){case"\0":n+="";break;case"":n+="";break;default:n+=e}}return n}function Xl(t){return t+""}function Yl(t){const e=t.length;if(jc(e>=2),2===e)return jc(""===t.charAt(0)&&""===t.charAt(1)),nu.emptyPath();const n=e-2,r=[];let s="";for(let i=0;i<e;){const e=t.indexOf("",i);switch((e<0||e>n)&&$c(),t.charAt(e+1)){case"":const n=t.substring(i,e);let o;0===s.length?o=n:(s+=n,o=s,s=""),r.push(o);break;case"":s+=t.substring(i,e),s+="\0";break;case"":s+=t.substring(i,e+1);break;default:$c()}i=e+2}return new nu(r)}
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
 */class Jl{constructor(t,e){this.seconds=t,this.nanoseconds=e}}class Zl{constructor(t,e,n){this.ownerId=t,this.allowTabSynchronization=e,this.leaseTimestampMs=n}}Zl.store="owner",Zl.key="owner";class td{constructor(t,e,n){this.userId=t,this.lastAcknowledgedBatchId=e,this.lastStreamToken=n}}td.store="mutationQueues",td.keyPath="userId";class ed{constructor(t,e,n,r,s){this.userId=t,this.batchId=e,this.localWriteTimeMs=n,this.baseMutations=r,this.mutations=s}}ed.store="mutations",ed.keyPath="batchId",ed.userMutationsIndex="userMutationsIndex",ed.userMutationsKeyPath=["userId","batchId"];class nd{constructor(){}static prefixForUser(t){return[t]}static prefixForPath(t,e){return[t,Wl(e)]}static key(t,e,n){return[t,Wl(e),n]}}nd.store="documentMutations",nd.PLACEHOLDER=new nd;class rd{constructor(t,e){this.path=t,this.readTime=e}}class sd{constructor(t,e){this.path=t,this.version=e}}class id{constructor(t,e,n,r,s,i){this.unknownDocument=t,this.noDocument=e,this.document=n,this.hasCommittedMutations=r,this.readTime=s,this.parentPath=i}}id.store="remoteDocuments",id.readTimeIndex="readTimeIndex",id.readTimeIndexPath="readTime",id.collectionReadTimeIndex="collectionReadTimeIndex",id.collectionReadTimeIndexPath=["parentPath","readTime"];class od{constructor(t){this.byteSize=t}}od.store="remoteDocumentGlobal",od.key="remoteDocumentGlobalKey";class ad{constructor(t,e,n,r,s,i,o){this.targetId=t,this.canonicalId=e,this.readTime=n,this.resumeToken=r,this.lastListenSequenceNumber=s,this.lastLimboFreeSnapshotVersion=i,this.query=o}}ad.store="targets",ad.keyPath="targetId",ad.queryTargetsIndexName="queryTargetsIndex",ad.queryTargetsKeyPath=["canonicalId","targetId"];class cd{constructor(t,e,n){this.targetId=t,this.path=e,this.sequenceNumber=n}}cd.store="targetDocuments",cd.keyPath=["targetId","path"],cd.documentTargetsIndex="documentTargetsIndex",cd.documentTargetsKeyPath=["path","targetId"];class ud{constructor(t,e,n,r){this.highestTargetId=t,this.highestListenSequenceNumber=e,this.lastRemoteSnapshotVersion=n,this.targetCount=r}}ud.key="targetGlobalKey",ud.store="targetGlobal";class hd{constructor(t,e){this.collectionId=t,this.parent=e}}hd.store="collectionParents",hd.keyPath=["collectionId","parent"];class ld{constructor(t,e,n,r){this.clientId=t,this.updateTimeMs=e,this.networkEnabled=n,this.inForeground=r}}ld.store="clientMetadata",ld.keyPath="clientId";class dd{constructor(t,e,n){this.bundleId=t,this.createTime=e,this.version=n}}dd.store="bundles",dd.keyPath="bundleId";class fd{constructor(t,e,n){this.name=t,this.readTime=e,this.bundledQuery=n}}fd.store="namedQueries",fd.keyPath="name";const pd=[td.store,ed.store,nd.store,id.store,ad.store,Zl.store,ud.store,cd.store,ld.store,od.store,hd.store,dd.store,fd.store],md="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class gd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}
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
 */class yd{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}
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
 */class vd{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&$c(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new vd(((n,r)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,r)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,r)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof vd?e:vd.resolve(e)}catch(e){return vd.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):vd.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):vd.reject(e)}static resolve(t){return new vd(((e,n)=>{e(t)}))}static reject(t){return new vd(((e,n)=>{n(t)}))}static waitFor(t){return new vd(((e,n)=>{let r=0,s=0,i=!1;t.forEach((t=>{++r,t.next((()=>{++s,i&&s===r&&e()}),(t=>n(t)))})),i=!0,s===r&&e()}))}static or(t){let e=vd.resolve(!1);for(const n of t)e=e.next((t=>t?vd.resolve(t):n()));return e}static forEach(t,e){const n=[];return t.forEach(((t,r)=>{n.push(e.call(this,t,r))})),this.waitFor(n)}}
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
 */class wd{constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.ft=new yd,this.transaction.oncomplete=()=>{this.ft.resolve()},this.transaction.onabort=()=>{e.error?this.ft.reject(new _d(t,e.error)):this.ft.resolve()},this.transaction.onerror=e=>{const n=Cd(e.target.error);this.ft.reject(new _d(t,n))}}static open(t,e,n,r){try{return new wd(e,t.transaction(r,n))}catch(s){throw new _d(e,s)}}get dt(){return this.ft.promise}abort(t){t&&this.ft.reject(t),this.aborted||(Fc("SimpleDb","Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}store(t){const e=this.transaction.objectStore(t);return new Ed(e)}}class bd{constructor(t,e,n){this.name=t,this.version=e,this.wt=n,12.2===bd._t(Ht())&&Vc("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(t){return Fc("SimpleDb","Removing database:",t),Sd(window.indexedDB.deleteDatabase(t)).toPromise()}static gt(){if("undefined"==typeof indexedDB)return!1;if(bd.yt())return!0;const t=Ht(),e=bd._t(t),n=0<e&&e<10,r=bd.Et(t),s=0<r&&r<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||s)}static yt(){var t;return"undefined"!=typeof process&&"YES"===(null===(t=process.env)||void 0===t?void 0:t.Tt)}static It(t,e){return t.store(e)}static _t(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}static Et(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}async At(t){return this.db||(Fc("SimpleDb","Opening database:",this.name),this.db=await new Promise(((e,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=t=>{const n=t.target.result;e(n)},r.onblocked=()=>{n(new _d(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=e=>{const r=e.target.error;"VersionError"===r.name?n(new Pc(Lc.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):n(new _d(t,r))},r.onupgradeneeded=t=>{Fc("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',t.oldVersion);const e=t.target.result;this.wt.Rt(e,r.transaction,t.oldVersion,this.version).next((()=>{Fc("SimpleDb","Database upgrade to version "+this.version+" complete")}))}}))),this.Pt&&(this.db.onversionchange=t=>this.Pt(t)),this.db}bt(t){this.Pt=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,r){const s="readonly"===e;let i=0;for(;;){++i;try{this.db=await this.At(t);const e=wd.open(this.db,t,s?"readonly":"readwrite",n),i=r(e).catch((t=>(e.abort(t),vd.reject(t)))).toPromise();return i.catch((()=>{})),await e.dt,i}catch(o){const t="FirebaseError"!==o.name&&i<3;if(Fc("SimpleDb","Transaction failed with error:",o.message,"Retrying:",t),this.close(),!t)return Promise.reject(o)}}}close(){this.db&&this.db.close(),this.db=void 0}}class Id{constructor(t){this.vt=t,this.Vt=!1,this.St=null}get isDone(){return this.Vt}get Dt(){return this.St}set cursor(t){this.vt=t}done(){this.Vt=!0}Ct(t){this.St=t}delete(){return Sd(this.vt.delete())}}class _d extends Pc{constructor(t,e){super(Lc.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function Td(t){return"IndexedDbTransactionError"===t.name}class Ed{constructor(t){this.store=t}put(t,e){let n;return void 0!==e?(Fc("SimpleDb","PUT",this.store.name,t,e),n=this.store.put(e,t)):(Fc("SimpleDb","PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),Sd(n)}add(t){return Fc("SimpleDb","ADD",this.store.name,t,t),Sd(this.store.add(t))}get(t){return Sd(this.store.get(t)).next((e=>(void 0===e&&(e=null),Fc("SimpleDb","GET",this.store.name,t,e),e)))}delete(t){return Fc("SimpleDb","DELETE",this.store.name,t),Sd(this.store.delete(t))}count(){return Fc("SimpleDb","COUNT",this.store.name),Sd(this.store.count())}Nt(t,e){const n=this.cursor(this.options(t,e)),r=[];return this.xt(n,((t,e)=>{r.push(e)})).next((()=>r))}kt(t,e){Fc("SimpleDb","DELETE ALL",this.store.name);const n=this.options(t,e);n.$t=!1;const r=this.cursor(n);return this.xt(r,((t,e,n)=>n.delete()))}Ot(t,e){let n;e?n=t:(n={},e=t);const r=this.cursor(n);return this.xt(r,e)}Ft(t){const e=this.cursor({});return new vd(((n,r)=>{e.onerror=t=>{const e=Cd(t.target.error);r(e)},e.onsuccess=e=>{const r=e.target.result;r?t(r.primaryKey,r.value).next((t=>{t?r.continue():n()})):n()}}))}xt(t,e){const n=[];return new vd(((r,s)=>{t.onerror=t=>{s(t.target.error)},t.onsuccess=t=>{const s=t.target.result;if(!s)return void r();const i=new Id(s),o=e(s.primaryKey,s.value,i);if(o instanceof vd){const t=o.catch((t=>(i.done(),vd.reject(t))));n.push(t)}i.isDone?r():null===i.Dt?s.continue():s.continue(i.Dt)}})).next((()=>vd.waitFor(n)))}options(t,e){let n;return void 0!==t&&("string"==typeof t?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.$t?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function Sd(t){return new vd(((e,n)=>{t.onsuccess=t=>{const n=t.target.result;e(n)},t.onerror=t=>{const e=Cd(t.target.error);n(e)}}))}let kd=!1;function Cd(t){const e=bd._t(Ht());if(e>=12.2&&e<13){const e="An internal error was encountered in the Indexed Database server";if(t.message.indexOf(e)>=0){const t=new Pc("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return kd||(kd=!0,setTimeout((()=>{throw t}),0)),t}}return t}
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
 */class Rd extends gd{constructor(t,e){super(),this.Mt=t,this.currentSequenceNumber=e}}function Ad(t,e){const n=zc(t);return bd.It(n.Mt,e)}
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
 */class Nd{constructor(t,e,n,r){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let r=0;r<this.mutations.length;r++){const e=this.mutations[r];e.key.isEqual(t.key)&&Dh(e,t,n[r])}}applyToLocalView(t){for(const e of this.baseMutations)e.key.isEqual(t.key)&&xh(e,t,this.localWriteTime);for(const e of this.mutations)e.key.isEqual(t.key)&&xh(e,t,this.localWriteTime)}applyToLocalDocumentSet(t){this.mutations.forEach((e=>{const n=t.get(e.key),r=n;this.applyToLocalView(r),n.isValidDocument()||r.convertToNoDocument(Yc.min())}))}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),sl())}isEqual(t){return this.batchId===t.batchId&&Wc(this.mutations,t.mutations,((t,e)=>Lh(t,e)))&&Wc(this.baseMutations,t.baseMutations,((t,e)=>Lh(t,e)))}}class Dd{constructor(t,e,n,r){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=r}static from(t,e,n){jc(t.mutations.length===n.length);let r=nl;const s=t.mutations;for(let i=0;i<s.length;i++)r=r.insert(s[i].key,n[i].version);return new Dd(t,e,n,r)}}
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
 */class xd{constructor(t,e,n,r,s=Yc.min(),i=Yc.min(),o=ou.EMPTY_BYTE_STRING){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o}withSequenceNumber(t){return new xd(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(t,e){return new xd(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t)}withLastLimboFreeSnapshotVersion(t){return new xd(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken)}}
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
 */class Od{constructor(t){this.Lt=t}}function Ld(t,e){if(e.document)return function(t,e,n){const r=kl(t,e.name),s=_l(e.updateTime),i=new Nu({mapValue:{fields:e.fields}}),o=xu.newFoundDocument(r,s,i);return n&&o.setHasCommittedMutations(),n?o.setHasCommittedMutations():o}(t.Lt,e.document,!!e.hasCommittedMutations);if(e.noDocument){const t=gu.fromSegments(e.noDocument.path),n=Fd(e.noDocument.readTime),r=xu.newNoDocument(t,n);return e.hasCommittedMutations?r.setHasCommittedMutations():r}if(e.unknownDocument){const t=gu.fromSegments(e.unknownDocument.path),n=Fd(e.unknownDocument.version);return xu.newUnknownDocument(t,n)}return $c()}function Pd(t,e,n){const r=Md(n),s=e.key.path.popLast().toArray();if(e.isFoundDocument()){const n={name:Sl(i=t.Lt,(o=e).key),fields:o.data.value.mapValue.fields,updateTime:wl(i,o.version.toTimestamp())},a=e.hasCommittedMutations;return new id(null,null,n,a,r,s)}var i,o;if(e.isNoDocument()){const t=e.key.path.toArray(),n=Ud(e.version),i=e.hasCommittedMutations;return new id(null,new rd(t,n),null,i,r,s)}if(e.isUnknownDocument()){const t=e.key.path.toArray(),n=Ud(e.version);return new id(new sd(t,n),null,null,!0,r,s)}return $c()}function Md(t){const e=t.toTimestamp();return[e.seconds,e.nanoseconds]}function Ud(t){const e=t.toTimestamp();return new Jl(e.seconds,e.nanoseconds)}function Fd(t){const e=new Xc(t.seconds,t.nanoseconds);return Yc.fromTimestamp(e)}function Vd(t,e){const n=(e.baseMutations||[]).map((e=>Ol(t.Lt,e)));for(let i=0;i<e.mutations.length-1;++i){const t=e.mutations[i];if(i+1<e.mutations.length&&void 0!==e.mutations[i+1].transform){const n=e.mutations[i+1];t.updateTransforms=n.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map((e=>Ol(t.Lt,e))),s=Xc.fromMillis(e.localWriteTimeMs);return new Nd(e.batchId,s,n,r)}function qd(t){const e=Fd(t.readTime),n=void 0!==t.lastLimboFreeSnapshotVersion?Fd(t.lastLimboFreeSnapshotVersion):Yc.min();let r;var s;return void 0!==t.query.documents?(jc(1===(s=t.query).documents.length),r=sh(th(Rl(s.documents[0])))):r=sh(Ml(t.query)),new xd(r,t.targetId,0,t.lastListenSequenceNumber,e,n,ou.fromBase64String(t.resumeToken))}function Bd(t,e){const n=Ud(e.snapshotVersion),r=Ud(e.lastLimboFreeSnapshotVersion);let s;s=Uu(e.target)?Ll(t.Lt,e.target):Pl(t.Lt,e.target);const i=e.resumeToken.toBase64();return new ad(e.targetId,Pu(e.target),n,i,e.sequenceNumber,r,s)}function $d(t){const e=Ml({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?function(t,e,n){return new Zu(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}(e,e.limit,"L"):e}
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
 */class jd{getBundleMetadata(t,e){return zd(t).get(e).next((t=>{if(t)return{id:(e=t).bundleId,createTime:Fd(e.createTime),version:e.version};var e}))}saveBundleMetadata(t,e){return zd(t).put({bundleId:(n=e).id,createTime:Ud(_l(n.createTime)),version:n.version});var n}getNamedQuery(t,e){return Kd(t).get(e).next((t=>{if(t)return{name:(e=t).name,query:$d(e.bundledQuery),readTime:Fd(e.readTime)};var e}))}saveNamedQuery(t,e){return Kd(t).put({name:(n=e).name,readTime:Ud(_l(n.readTime)),bundledQuery:n.bundledQuery});var n}}function zd(t){return Ad(t,dd.store)}function Kd(t){return Ad(t,fd.store)}
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
 */class Hd{constructor(){this.Bt=new Gd}addToCollectionParentIndex(t,e){return this.Bt.add(e),vd.resolve()}getCollectionParents(t,e){return vd.resolve(this.Bt.getEntries(e))}}class Gd{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e]||new Xh(nu.comparator),s=!r.has(n);return this.index[e]=r.add(n),s}has(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e];return r&&r.has(n)}getEntries(t){return(this.index[t]||new Xh(nu.comparator)).toArray()}}
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
 */class Wd{constructor(){this.Ut=new Gd}addToCollectionParentIndex(t,e){if(!this.Ut.has(e)){const n=e.lastSegment(),r=e.popLast();t.addOnCommittedListener((()=>{this.Ut.add(e)}));const s={collectionId:n,parent:Wl(r)};return Qd(t).put(s)}return vd.resolve()}getCollectionParents(t,e){const n=[],r=IDBKeyRange.bound([e,""],[Qc(e),""],!1,!0);return Qd(t).Nt(r).next((t=>{for(const r of t){if(r.collectionId!==e)break;n.push(Yl(r.parent))}return n}))}}function Qd(t){return Ad(t,hd.store)}
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
 */const Xd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class Yd{constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}static withCacheSize(t){return new Yd(t,Yd.DEFAULT_COLLECTION_PERCENTILE,Yd.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}
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
 */function Jd(t,e,n){const r=t.store(ed.store),s=t.store(nd.store),i=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.Ot({range:o},((t,e,n)=>(a++,n.delete())));i.push(c.next((()=>{jc(1===a)})));const u=[];for(const h of n.mutations){const t=nd.key(e,h.key.path,n.batchId);i.push(s.delete(t)),u.push(h.key)}return vd.waitFor(i).next((()=>u))}function Zd(t){if(!t)return 0;let e;if(t.document)e=t.document;else if(t.unknownDocument)e=t.unknownDocument;else{if(!t.noDocument)throw $c();e=t.noDocument}return JSON.stringify(e).length}
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
 */Yd.DEFAULT_COLLECTION_PERCENTILE=10,Yd.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Yd.DEFAULT=new Yd(41943040,Yd.DEFAULT_COLLECTION_PERCENTILE,Yd.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Yd.DISABLED=new Yd(-1,0,0);class tf{constructor(t,e,n,r){this.userId=t,this.R=e,this.qt=n,this.referenceDelegate=r,this.Kt={}}static Qt(t,e,n,r){jc(""!==t.uid);const s=t.isAuthenticated()?t.uid:"";return new tf(s,e,n,r)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return nf(t).Ot({index:ed.userMutationsIndex,range:n},((t,n,r)=>{e=!1,r.done()})).next((()=>e))}addMutationBatch(t,e,n,r){const s=rf(t),i=nf(t);return i.add({}).next((o=>{jc("number"==typeof o);const a=new Nd(o,e,n,r),c=function(t,e,n){const r=n.baseMutations.map((e=>xl(t.Lt,e))),s=n.mutations.map((e=>xl(t.Lt,e)));return new ed(e,n.batchId,n.localWriteTime.toMillis(),r,s)}(this.R,this.userId,a),u=[];let h=new Xh(((t,e)=>Gc(t.canonicalString(),e.canonicalString())));for(const t of r){const e=nd.key(this.userId,t.key.path,o);h=h.add(t.key.path.popLast()),u.push(i.put(c)),u.push(s.put(e,nd.PLACEHOLDER))}return h.forEach((e=>{u.push(this.qt.addToCollectionParentIndex(t,e))})),t.addOnCommittedListener((()=>{this.Kt[o]=a.keys()})),vd.waitFor(u).next((()=>a))}))}lookupMutationBatch(t,e){return nf(t).get(e).next((t=>t?(jc(t.userId===this.userId),Vd(this.R,t)):null))}jt(t,e){return this.Kt[e]?vd.resolve(this.Kt[e]):this.lookupMutationBatch(t,e).next((t=>{if(t){const n=t.keys();return this.Kt[e]=n,n}return null}))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return nf(t).Ot({index:ed.userMutationsIndex,range:r},((t,e,r)=>{e.userId===this.userId&&(jc(e.batchId>=n),s=Vd(this.R,e)),r.done()})).next((()=>s))}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return nf(t).Ot({index:ed.userMutationsIndex,range:e,reverse:!0},((t,e,r)=>{n=e.batchId,r.done()})).next((()=>n))}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return nf(t).Nt(ed.userMutationsIndex,e).next((t=>t.map((t=>Vd(this.R,t)))))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=nd.prefixForPath(this.userId,e.path),r=IDBKeyRange.lowerBound(n),s=[];return rf(t).Ot({range:r},((n,r,i)=>{const[o,a,c]=n,u=Yl(a);if(o===this.userId&&e.path.isEqual(u))return nf(t).get(c).next((t=>{if(!t)throw $c();jc(t.userId===this.userId),s.push(Vd(this.R,t))}));i.done()})).next((()=>s))}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new Xh(Gc);const r=[];return e.forEach((e=>{const s=nd.prefixForPath(this.userId,e.path),i=IDBKeyRange.lowerBound(s),o=rf(t).Ot({range:i},((t,r,s)=>{const[i,o,a]=t,c=Yl(o);i===this.userId&&e.path.isEqual(c)?n=n.add(a):s.done()}));r.push(o)})),vd.waitFor(r).next((()=>this.Wt(t,n)))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1,s=nd.prefixForPath(this.userId,n),i=IDBKeyRange.lowerBound(s);let o=new Xh(Gc);return rf(t).Ot({range:i},((t,e,s)=>{const[i,a,c]=t,u=Yl(a);i===this.userId&&n.isPrefixOf(u)?u.length===r&&(o=o.add(c)):s.done()})).next((()=>this.Wt(t,o)))}Wt(t,e){const n=[],r=[];return e.forEach((e=>{r.push(nf(t).get(e).next((t=>{if(null===t)throw $c();jc(t.userId===this.userId),n.push(Vd(this.R,t))})))})),vd.waitFor(r).next((()=>n))}removeMutationBatch(t,e){return Jd(t.Mt,this.userId,e).next((n=>(t.addOnCommittedListener((()=>{this.Gt(e.batchId)})),vd.forEach(n,(e=>this.referenceDelegate.markPotentiallyOrphaned(t,e))))))}Gt(t){delete this.Kt[t]}performConsistencyCheck(t){return this.checkEmpty(t).next((e=>{if(!e)return vd.resolve();const n=IDBKeyRange.lowerBound(nd.prefixForUser(this.userId)),r=[];return rf(t).Ot({range:n},((t,e,n)=>{if(t[0]===this.userId){const e=Yl(t[1]);r.push(e)}else n.done()})).next((()=>{jc(0===r.length)}))}))}containsKey(t,e){return ef(t,this.userId,e)}zt(t){return sf(t).get(this.userId).next((t=>t||new td(this.userId,-1,"")))}}function ef(t,e,n){const r=nd.prefixForPath(e,n.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return rf(t).Ot({range:i,$t:!0},((t,n,r)=>{const[i,a,c]=t;i===e&&a===s&&(o=!0),r.done()})).next((()=>o))}function nf(t){return Ad(t,ed.store)}function rf(t){return Ad(t,nd.store)}function sf(t){return Ad(t,td.store)}
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
 */class of{constructor(t){this.Ht=t}next(){return this.Ht+=2,this.Ht}static Jt(){return new of(0)}static Yt(){return new of(-1)}}
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
 */class af{constructor(t,e){this.referenceDelegate=t,this.R=e}allocateTargetId(t){return this.Xt(t).next((e=>{const n=new of(e.highestTargetId);return e.highestTargetId=n.next(),this.Zt(t,e).next((()=>e.highestTargetId))}))}getLastRemoteSnapshotVersion(t){return this.Xt(t).next((t=>Yc.fromTimestamp(new Xc(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(t){return this.Xt(t).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(t,e,n){return this.Xt(t).next((r=>(r.highestListenSequenceNumber=e,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),e>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=e),this.Zt(t,r))))}addTargetData(t,e){return this.te(t,e).next((()=>this.Xt(t).next((n=>(n.targetCount+=1,this.ee(e,n),this.Zt(t,n))))))}updateTargetData(t,e){return this.te(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next((()=>cf(t).delete(e.targetId))).next((()=>this.Xt(t))).next((e=>(jc(e.targetCount>0),e.targetCount-=1,this.Zt(t,e))))}removeTargets(t,e,n){let r=0;const s=[];return cf(t).Ot(((i,o)=>{const a=qd(o);a.sequenceNumber<=e&&null===n.get(a.targetId)&&(r++,s.push(this.removeTargetData(t,a)))})).next((()=>vd.waitFor(s))).next((()=>r))}forEachTarget(t,e){return cf(t).Ot(((t,n)=>{const r=qd(n);e(r)}))}Xt(t){return uf(t).get(ud.key).next((t=>(jc(null!==t),t)))}Zt(t,e){return uf(t).put(ud.key,e)}te(t,e){return cf(t).put(Bd(this.R,e))}ee(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.Xt(t).next((t=>t.targetCount))}getTargetData(t,e){const n=Pu(e),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return cf(t).Ot({range:r,index:ad.queryTargetsIndexName},((t,n,r)=>{const i=qd(n);Mu(e,i.target)&&(s=i,r.done())})).next((()=>s))}addMatchingKeys(t,e,n){const r=[],s=hf(t);return e.forEach((e=>{const i=Wl(e.path);r.push(s.put(new cd(n,i))),r.push(this.referenceDelegate.addReference(t,n,e))})),vd.waitFor(r)}removeMatchingKeys(t,e,n){const r=hf(t);return vd.forEach(e,(e=>{const s=Wl(e.path);return vd.waitFor([r.delete([n,s]),this.referenceDelegate.removeReference(t,n,e)])}))}removeMatchingKeysForTargetId(t,e){const n=hf(t),r=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),r=hf(t);let s=sl();return r.Ot({range:n,$t:!0},((t,e,n)=>{const r=Yl(t[1]),i=new gu(r);s=s.add(i)})).next((()=>s))}containsKey(t,e){const n=Wl(e.path),r=IDBKeyRange.bound([n],[Qc(n)],!1,!0);let s=0;return hf(t).Ot({index:cd.documentTargetsIndex,$t:!0,range:r},(([t,e],n,r)=>{0!==t&&(s++,r.done())})).next((()=>s>0))}lt(t,e){return cf(t).get(e).next((t=>t?qd(t):null))}}function cf(t){return Ad(t,ad.store)}function uf(t){return Ad(t,ud.store)}function hf(t){return Ad(t,cd.store)}
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
 */async function lf(t){if(t.code!==Lc.FAILED_PRECONDITION||t.message!==md)throw t;Fc("LocalStore","Unexpectedly lost primary lease")}
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
 */function df([t,e],[n,r]){const s=Gc(t,n);return 0===s?Gc(e,r):s}class ff{constructor(t){this.ne=t,this.buffer=new Xh(df),this.se=0}ie(){return++this.se}re(t){const e=[t,this.ie()];if(this.buffer.size<this.ne)this.buffer=this.buffer.add(e);else{const t=this.buffer.last();df(e,t)<0&&(this.buffer=this.buffer.delete(t).add(e))}}get maxValue(){return this.buffer.last()[0]}}class pf{constructor(t,e){this.garbageCollector=t,this.asyncQueue=e,this.oe=!1,this.ce=null}start(t){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.ue(t)}stop(){this.ce&&(this.ce.cancel(),this.ce=null)}get started(){return null!==this.ce}ue(t){const e=this.oe?3e5:6e4;Fc("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.ce=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.ce=null,this.oe=!0;try{await t.collectGarbage(this.garbageCollector)}catch(e){Td(e)?Fc("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",e):await lf(e)}await this.ue(t)}))}}class mf{constructor(t,e){this.ae=t,this.params=e}calculateTargetCount(t,e){return this.ae.he(t).next((t=>Math.floor(e/100*t)))}nthSequenceNumber(t,e){if(0===e)return vd.resolve(Oc.o);const n=new ff(e);return this.ae.forEachTarget(t,(t=>n.re(t.sequenceNumber))).next((()=>this.ae.le(t,(t=>n.re(t))))).next((()=>n.maxValue))}removeTargets(t,e,n){return this.ae.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.ae.removeOrphanedDocuments(t,e)}collect(t,e){return-1===this.params.cacheSizeCollectionThreshold?(Fc("LruGarbageCollector","Garbage collection skipped; disabled"),vd.resolve(Xd)):this.getCacheSize(t).next((n=>n<this.params.cacheSizeCollectionThreshold?(Fc("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Xd):this.fe(t,e)))}getCacheSize(t){return this.ae.getCacheSize(t)}fe(t,e){let n,r,s,i,o,a,c;const u=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((e=>(e>this.params.maximumSequenceNumbersToCollect?(Fc("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`),r=this.params.maximumSequenceNumbersToCollect):r=e,i=Date.now(),this.nthSequenceNumber(t,r)))).next((r=>(n=r,o=Date.now(),this.removeTargets(t,n,e)))).next((e=>(s=e,a=Date.now(),this.removeOrphanedDocuments(t,n)))).next((t=>(c=Date.now(),Uc()<=ce.DEBUG&&Fc("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-u}ms\n\tDetermined least recently used ${r} in `+(o-i)+`ms\n\tRemoved ${s} targets in `+(a-o)+`ms\n\tRemoved ${t} documents in `+(c-a)+`ms\nTotal Duration: ${c-u}ms`),vd.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:t}))))}}
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
 */class gf{constructor(t,e){this.db=t,this.garbageCollector=new mf(this,e)}he(t){const e=this.de(t);return this.db.getTargetCache().getTargetCount(t).next((t=>e.next((e=>t+e))))}de(t){let e=0;return this.le(t,(t=>{e++})).next((()=>e))}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}le(t,e){return this.we(t,((t,n)=>e(n)))}addReference(t,e,n){return yf(t,n)}removeReference(t,e,n){return yf(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return yf(t,e)}_e(t,e){return function(t,e){let n=!1;return sf(t).Ft((r=>ef(t,r,e).next((t=>(t&&(n=!0),vd.resolve(!t)))))).next((()=>n))}(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let s=0;return this.we(t,((i,o)=>{if(o<=e){const e=this._e(t,i).next((e=>{if(!e)return s++,n.getEntry(t,i).next((()=>(n.removeEntry(i),hf(t).delete([0,Wl(i.path)]))))}));r.push(e)}})).next((()=>vd.waitFor(r))).next((()=>n.apply(t))).next((()=>s))}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return yf(t,e)}we(t,e){const n=hf(t);let r,s=Oc.o;return n.Ot({index:cd.documentTargetsIndex},(([t,n],{path:i,sequenceNumber:o})=>{0===t?(s!==Oc.o&&e(new gu(Yl(r)),s),s=o,r=i):s=Oc.o})).next((()=>{s!==Oc.o&&e(new gu(Yl(r)),s)}))}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function yf(t,e){return hf(t).put((n=e,r=t.currentSequenceNumber,new cd(0,Wl(n.path),r)));var n,r}
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
 */class vf{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={}}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[r,s]of n)if(this.equalsFn(r,t))return s}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),r=this.inner[n];if(void 0!==r){for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],t))return void(r[n]=[t,e]);r.push([t,e])}else this.inner[n]=[[t,e]]}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],t))return 1===n.length?delete this.inner[e]:n.splice(r,1),!0;return!1}forEach(t){Zc(this.inner,((e,n)=>{for(const[r,s]of n)t(r,s)}))}isEmpty(){return tu(this.inner)}}
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
 */class wf{constructor(){this.changes=new vf((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}getReadTime(t){const e=this.changes.get(t);return e?e.readTime:Yc.min()}addEntry(t,e){this.assertNotApplied(),this.changes.set(t.key,{document:t,readTime:e})}removeEntry(t,e=null){this.assertNotApplied(),this.changes.set(t,{document:xu.newInvalidDocument(t),readTime:e})}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?vd.resolve(n.document):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
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
 */class bf{constructor(t,e){this.R=t,this.qt=e}addEntry(t,e,n){return Tf(t).put(Ef(e),n)}removeEntry(t,e){const n=Tf(t),r=Ef(e);return n.delete(r)}updateMetadata(t,e){return this.getMetadata(t).next((n=>(n.byteSize+=e,this.me(t,n))))}getEntry(t,e){return Tf(t).get(Ef(e)).next((t=>this.ge(e,t)))}ye(t,e){return Tf(t).get(Ef(e)).next((t=>({document:this.ge(e,t),size:Zd(t)})))}getEntries(t,e){let n=Zh();return this.pe(t,e,((t,e)=>{const r=this.ge(t,e);n=n.insert(t,r)})).next((()=>n))}Ee(t,e){let n=Zh(),r=new Gh(gu.comparator);return this.pe(t,e,((t,e)=>{const s=this.ge(t,e);n=n.insert(t,s),r=r.insert(t,Zd(e))})).next((()=>({documents:n,Te:r})))}pe(t,e,n){if(e.isEmpty())return vd.resolve();const r=IDBKeyRange.bound(e.first().path.toArray(),e.last().path.toArray()),s=e.getIterator();let i=s.getNext();return Tf(t).Ot({range:r},((t,e,r)=>{const o=gu.fromSegments(t);for(;i&&gu.comparator(i,o)<0;)n(i,null),i=s.getNext();i&&i.isEqual(o)&&(n(i,e),i=s.hasNext()?s.getNext():null),i?r.Ct(i.path.toArray()):r.done()})).next((()=>{for(;i;)n(i,null),i=s.hasNext()?s.getNext():null}))}getDocumentsMatchingQuery(t,e,n){let r=Zh();const s=e.path.length+1,i={};if(n.isEqual(Yc.min())){const t=e.path.toArray();i.range=IDBKeyRange.lowerBound(t)}else{const t=e.path.toArray(),r=Md(n);i.range=IDBKeyRange.lowerBound([t,r],!0),i.index=id.collectionReadTimeIndex}return Tf(t).Ot(i,((t,n,i)=>{if(t.length!==s)return;const o=Ld(this.R,n);e.path.isPrefixOf(o.key.path)?ch(e,o)&&(r=r.insert(o.key,o)):i.done()})).next((()=>r))}newChangeBuffer(t){return new If(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next((t=>t.byteSize))}getMetadata(t){return _f(t).get(od.key).next((t=>(jc(!!t),t)))}me(t,e){return _f(t).put(od.key,e)}ge(t,e){if(e){const t=Ld(this.R,e);if(!t.isNoDocument()||!t.version.isEqual(Yc.min()))return t}return xu.newInvalidDocument(t)}}class If extends wf{constructor(t,e){super(),this.Ie=t,this.trackRemovals=e,this.Ae=new vf((t=>t.toString()),((t,e)=>t.isEqual(e)))}applyChanges(t){const e=[];let n=0,r=new Xh(((t,e)=>Gc(t.canonicalString(),e.canonicalString())));return this.changes.forEach(((s,i)=>{const o=this.Ae.get(s);if(i.document.isValidDocument()){const a=Pd(this.Ie.R,i.document,this.getReadTime(s));r=r.add(s.path.popLast());const c=Zd(a);n+=c-o,e.push(this.Ie.addEntry(t,s,a))}else if(n-=o,this.trackRemovals){const n=Pd(this.Ie.R,xu.newNoDocument(s,Yc.min()),this.getReadTime(s));e.push(this.Ie.addEntry(t,s,n))}else e.push(this.Ie.removeEntry(t,s))})),r.forEach((n=>{e.push(this.Ie.qt.addToCollectionParentIndex(t,n))})),e.push(this.Ie.updateMetadata(t,n)),vd.waitFor(e)}getFromCache(t,e){return this.Ie.ye(t,e).next((t=>(this.Ae.set(e,t.size),t.document)))}getAllFromCache(t,e){return this.Ie.Ee(t,e).next((({documents:t,Te:e})=>(e.forEach(((t,e)=>{this.Ae.set(t,e)})),t)))}}function _f(t){return Ad(t,od.store)}function Tf(t){return Ad(t,id.store)}function Ef(t){return t.path.toArray()}
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
 */class Sf{constructor(t){this.R=t}Rt(t,e,n,r){jc(n<r&&n>=0&&r<=11);const s=new wd("createOrUpgrade",e);n<1&&r>=1&&(t.createObjectStore(Zl.store),function(t){t.createObjectStore(td.store,{keyPath:td.keyPath}),t.createObjectStore(ed.store,{keyPath:ed.keyPath,autoIncrement:!0}).createIndex(ed.userMutationsIndex,ed.userMutationsKeyPath,{unique:!0}),t.createObjectStore(nd.store)}(t),kf(t),function(t){t.createObjectStore(id.store)}(t));let i=vd.resolve();return n<3&&r>=3&&(0!==n&&(function(t){t.deleteObjectStore(cd.store),t.deleteObjectStore(ad.store),t.deleteObjectStore(ud.store)}(t),kf(t)),i=i.next((()=>function(t){const e=t.store(ud.store),n=new ud(0,0,Yc.min().toTimestamp(),0);return e.put(ud.key,n)}(s)))),n<4&&r>=4&&(0!==n&&(i=i.next((()=>function(t,e){return e.store(ed.store).Nt().next((n=>{t.deleteObjectStore(ed.store),t.createObjectStore(ed.store,{keyPath:ed.keyPath,autoIncrement:!0}).createIndex(ed.userMutationsIndex,ed.userMutationsKeyPath,{unique:!0});const r=e.store(ed.store),s=n.map((t=>r.put(t)));return vd.waitFor(s)}))}(t,s)))),i=i.next((()=>{!function(t){t.createObjectStore(ld.store,{keyPath:ld.keyPath})}(t)}))),n<5&&r>=5&&(i=i.next((()=>this.Re(s)))),n<6&&r>=6&&(i=i.next((()=>(function(t){t.createObjectStore(od.store)}(t),this.Pe(s))))),n<7&&r>=7&&(i=i.next((()=>this.be(s)))),n<8&&r>=8&&(i=i.next((()=>this.ve(t,s)))),n<9&&r>=9&&(i=i.next((()=>{!function(t){t.objectStoreNames.contains("remoteDocumentChanges")&&t.deleteObjectStore("remoteDocumentChanges")}(t),function(t){const e=t.objectStore(id.store);e.createIndex(id.readTimeIndex,id.readTimeIndexPath,{unique:!1}),e.createIndex(id.collectionReadTimeIndex,id.collectionReadTimeIndexPath,{unique:!1})}(e)}))),n<10&&r>=10&&(i=i.next((()=>this.Ve(s)))),n<11&&r>=11&&(i=i.next((()=>{!function(t){t.createObjectStore(dd.store,{keyPath:dd.keyPath})}(t),function(t){t.createObjectStore(fd.store,{keyPath:fd.keyPath})}(t)}))),i}Pe(t){let e=0;return t.store(id.store).Ot(((t,n)=>{e+=Zd(n)})).next((()=>{const n=new od(e);return t.store(od.store).put(od.key,n)}))}Re(t){const e=t.store(td.store),n=t.store(ed.store);return e.Nt().next((e=>vd.forEach(e,(e=>{const r=IDBKeyRange.bound([e.userId,-1],[e.userId,e.lastAcknowledgedBatchId]);return n.Nt(ed.userMutationsIndex,r).next((n=>vd.forEach(n,(n=>{jc(n.userId===e.userId);const r=Vd(this.R,n);return Jd(t,e.userId,r).next((()=>{}))}))))}))))}be(t){const e=t.store(cd.store),n=t.store(id.store);return t.store(ud.store).get(ud.key).next((t=>{const r=[];return n.Ot(((n,s)=>{const i=new nu(n),o=[0,Wl(i)];r.push(e.get(o).next((n=>{return n?vd.resolve():(r=i,e.put(new cd(0,Wl(r),t.highestListenSequenceNumber)));var r})))})).next((()=>vd.waitFor(r)))}))}ve(t,e){t.createObjectStore(hd.store,{keyPath:hd.keyPath});const n=e.store(hd.store),r=new Gd,s=t=>{if(r.add(t)){const e=t.lastSegment(),r=t.popLast();return n.put({collectionId:e,parent:Wl(r)})}};return e.store(id.store).Ot({$t:!0},((t,e)=>{const n=new nu(t);return s(n.popLast())})).next((()=>e.store(nd.store).Ot({$t:!0},(([t,e,n],r)=>{const i=Yl(e);return s(i.popLast())}))))}Ve(t){const e=t.store(ad.store);return e.Ot(((t,n)=>{const r=qd(n),s=Bd(this.R,r);return e.put(s)}))}}function kf(t){t.createObjectStore(cd.store,{keyPath:cd.keyPath}).createIndex(cd.documentTargetsIndex,cd.documentTargetsKeyPath,{unique:!0}),t.createObjectStore(ad.store,{keyPath:ad.keyPath}).createIndex(ad.queryTargetsIndexName,ad.queryTargetsKeyPath,{unique:!0}),t.createObjectStore(ud.store)}const Cf="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class Rf{constructor(t,e,n,r,s,i,o,a,c,u){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.Se=s,this.window=i,this.document=o,this.De=c,this.Ce=u,this.Ne=null,this.xe=!1,this.isPrimary=!1,this.networkEnabled=!0,this.ke=null,this.inForeground=!1,this.$e=null,this.Oe=null,this.Fe=Number.NEGATIVE_INFINITY,this.Me=t=>Promise.resolve(),!Rf.gt())throw new Pc(Lc.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");var h,l;this.referenceDelegate=new gf(this,r),this.Le=e+"main",this.R=new Od(a),this.Be=new bd(this.Le,11,new Sf(this.R)),this.Ue=new af(this.referenceDelegate,this.R),this.qt=new Wd,this.qe=(h=this.R,l=this.qt,new bf(h,l)),this.Ke=new jd,this.window&&this.window.localStorage?this.Qe=this.window.localStorage:(this.Qe=null,!1===u&&Vc("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.je().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new Pc(Lc.FAILED_PRECONDITION,Cf);return this.We(),this.Ge(),this.ze(),this.runTransaction("getHighestListenSequenceNumber","readonly",(t=>this.Ue.getHighestSequenceNumber(t)))})).then((t=>{this.Ne=new Oc(t,this.De)})).then((()=>{this.xe=!0})).catch((t=>(this.Be&&this.Be.close(),Promise.reject(t))))}He(t){return this.Me=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.Be.bt((async e=>{null===e.newVersion&&await t()}))}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.Se.enqueueAndForget((async()=>{this.started&&await this.je()})))}je(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(t=>Nf(t).put(new ld(this.clientId,Date.now(),this.networkEnabled,this.inForeground)).next((()=>{if(this.isPrimary)return this.Je(t).next((t=>{t||(this.isPrimary=!1,this.Se.enqueueRetryable((()=>this.Me(!1))))}))})).next((()=>this.Ye(t))).next((e=>this.isPrimary&&!e?this.Xe(t).next((()=>!1)):!!e&&this.Ze(t).next((()=>!0)))))).catch((t=>{if(Td(t))return Fc("IndexedDbPersistence","Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return Fc("IndexedDbPersistence","Releasing owner lease after error during lease refresh",t),!1})).then((t=>{this.isPrimary!==t&&this.Se.enqueueRetryable((()=>this.Me(t))),this.isPrimary=t}))}Je(t){return Af(t).get(Zl.key).next((t=>vd.resolve(this.tn(t))))}en(t){return Nf(t).delete(this.clientId)}async nn(){if(this.isPrimary&&!this.sn(this.Fe,18e5)){this.Fe=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const e=Ad(t,ld.store);return e.Nt().next((t=>{const n=this.rn(t,18e5),r=t.filter((t=>-1===n.indexOf(t)));return vd.forEach(r,(t=>e.delete(t.clientId))).next((()=>r))}))})).catch((()=>[]));if(this.Qe)for(const e of t)this.Qe.removeItem(this.on(e.clientId))}}ze(){this.Oe=this.Se.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.je().then((()=>this.nn())).then((()=>this.ze()))))}tn(t){return!!t&&t.ownerId===this.clientId}Ye(t){return this.Ce?vd.resolve(!0):Af(t).get(Zl.key).next((e=>{if(null!==e&&this.sn(e.leaseTimestampMs,5e3)&&!this.cn(e.ownerId)){if(this.tn(e)&&this.networkEnabled)return!0;if(!this.tn(e)){if(!e.allowTabSynchronization)throw new Pc(Lc.FAILED_PRECONDITION,Cf);return!1}}return!(!this.networkEnabled||!this.inForeground)||Nf(t).Nt().next((t=>void 0===this.rn(t,5e3).find((t=>{if(this.clientId!==t.clientId){const e=!this.networkEnabled&&t.networkEnabled,n=!this.inForeground&&t.inForeground,r=this.networkEnabled===t.networkEnabled;if(e||n&&r)return!0}return!1}))))})).next((t=>(this.isPrimary!==t&&Fc("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.xe=!1,this.un(),this.Oe&&(this.Oe.cancel(),this.Oe=null),this.an(),this.hn(),await this.Be.runTransaction("shutdown","readwrite",[Zl.store,ld.store],(t=>{const e=new Rd(t,Oc.o);return this.Xe(e).next((()=>this.en(e)))})),this.Be.close(),this.ln()}rn(t,e){return t.filter((t=>this.sn(t.updateTimeMs,e)&&!this.cn(t.clientId)))}fn(){return this.runTransaction("getActiveClients","readonly",(t=>Nf(t).Nt().next((t=>this.rn(t,18e5).map((t=>t.clientId))))))}get started(){return this.xe}getMutationQueue(t){return tf.Qt(t,this.R,this.qt,this.referenceDelegate)}getTargetCache(){return this.Ue}getRemoteDocumentCache(){return this.qe}getIndexManager(){return this.qt}getBundleCache(){return this.Ke}runTransaction(t,e,n){Fc("IndexedDbPersistence","Starting transaction:",t);const r="readonly"===e?"readonly":"readwrite";let s;return this.Be.runTransaction(t,r,pd,(r=>(s=new Rd(r,this.Ne?this.Ne.next():Oc.o),"readwrite-primary"===e?this.Je(s).next((t=>!!t||this.Ye(s))).next((e=>{if(!e)throw Vc(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.Se.enqueueRetryable((()=>this.Me(!1))),new Pc(Lc.FAILED_PRECONDITION,md);return n(s)})).next((t=>this.Ze(s).next((()=>t)))):this.dn(s).next((()=>n(s)))))).then((t=>(s.raiseOnCommittedEvent(),t)))}dn(t){return Af(t).get(Zl.key).next((t=>{if(null!==t&&this.sn(t.leaseTimestampMs,5e3)&&!this.cn(t.ownerId)&&!this.tn(t)&&!(this.Ce||this.allowTabSynchronization&&t.allowTabSynchronization))throw new Pc(Lc.FAILED_PRECONDITION,Cf)}))}Ze(t){const e=new Zl(this.clientId,this.allowTabSynchronization,Date.now());return Af(t).put(Zl.key,e)}static gt(){return bd.gt()}Xe(t){const e=Af(t);return e.get(Zl.key).next((t=>this.tn(t)?(Fc("IndexedDbPersistence","Releasing primary lease."),e.delete(Zl.key)):vd.resolve()))}sn(t,e){const n=Date.now();return!(t<n-e||t>n&&(Vc(`Detected an update time that is in the future: ${t} > ${n}`),1))}We(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.$e=()=>{this.Se.enqueueAndForget((()=>(this.inForeground="visible"===this.document.visibilityState,this.je())))},this.document.addEventListener("visibilitychange",this.$e),this.inForeground="visible"===this.document.visibilityState)}an(){this.$e&&(this.document.removeEventListener("visibilitychange",this.$e),this.$e=null)}Ge(){var t;"function"==typeof(null===(t=this.window)||void 0===t?void 0:t.addEventListener)&&(this.ke=()=>{this.un(),this.Se.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.ke))}hn(){this.ke&&(this.window.removeEventListener("pagehide",this.ke),this.ke=null)}cn(t){var e;try{const n=null!==(null===(e=this.Qe)||void 0===e?void 0:e.getItem(this.on(t)));return Fc("IndexedDbPersistence",`Client '${t}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return Vc("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}un(){if(this.Qe)try{this.Qe.setItem(this.on(this.clientId),String(Date.now()))}catch(t){Vc("Failed to set zombie client id.",t)}}ln(){if(this.Qe)try{this.Qe.removeItem(this.on(this.clientId))}catch(t){}}on(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function Af(t){return Ad(t,Zl.store)}function Nf(t){return Ad(t,ld.store)}
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
class Df{constructor(t,e,n){this.qe=t,this._n=e,this.qt=n}mn(t,e){return this._n.getAllMutationBatchesAffectingDocumentKey(t,e).next((n=>this.gn(t,e,n)))}gn(t,e,n){return this.qe.getEntry(t,e).next((t=>{for(const e of n)e.applyToLocalView(t);return t}))}yn(t,e){t.forEach(((t,n)=>{for(const r of e)r.applyToLocalView(n)}))}pn(t,e){return this.qe.getEntries(t,e).next((e=>this.En(t,e).next((()=>e))))}En(t,e){return this._n.getAllMutationBatchesAffectingDocumentKeys(t,e).next((t=>this.yn(e,t)))}getDocumentsMatchingQuery(t,e,n){return r=e,gu.isDocumentKey(r.path)&&null===r.collectionGroup&&0===r.filters.length?this.Tn(t,e.path):function(t){return null!==t.collectionGroup}(e)?this.In(t,e,n):this.An(t,e,n);var r}Tn(t,e){return this.mn(t,new gu(e)).next((t=>{let e=el();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e}))}In(t,e,n){const r=e.collectionGroup;let s=el();return this.qt.getCollectionParents(t,r).next((i=>vd.forEach(i,(i=>{const o=(a=e,c=i.child(r),new Zu(c,null,a.explicitOrderBy.slice(),a.filters.slice(),a.limit,a.limitType,a.startAt,a.endAt));var a,c;return this.An(t,o,n).next((t=>{t.forEach(((t,e)=>{s=s.insert(t,e)}))}))})).next((()=>s))))}An(t,e,n){let r,s;return this.qe.getDocumentsMatchingQuery(t,e,n).next((n=>(r=n,this._n.getAllMutationBatchesAffectingQuery(t,e)))).next((e=>(s=e,this.Rn(t,s,r).next((t=>{r=t;for(const e of s)for(const t of e.mutations){const n=t.key;let s=r.get(n);null==s&&(s=xu.newInvalidDocument(n),r=r.insert(n,s)),xh(t,s,e.localWriteTime),s.isFoundDocument()||(r=r.remove(n))}}))))).next((()=>(r.forEach(((t,n)=>{ch(e,n)||(r=r.remove(t))})),r)))}Rn(t,e,n){let r=sl();for(const i of e)for(const t of i.mutations)t instanceof Uh&&null===n.get(t.key)&&(r=r.add(t.key));let s=n;return this.qe.getEntries(t,r).next((t=>(t.forEach(((t,e)=>{e.isFoundDocument()&&(s=s.insert(t,e))})),s)))}}
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
 */class xf{constructor(t,e,n,r){this.targetId=t,this.fromCache=e,this.Pn=n,this.bn=r}static vn(t,e){let n=sl(),r=sl();for(const s of e.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:r=r.add(s.doc.key)}return new xf(t,e.fromCache,n,r)}}
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
 */class Of{Vn(t){this.Sn=t}getDocumentsMatchingQuery(t,e,n,r){return 0===(s=e).filters.length&&null===s.limit&&null==s.startAt&&null==s.endAt&&(0===s.explicitOrderBy.length||1===s.explicitOrderBy.length&&s.explicitOrderBy[0].field.isKeyField())||n.isEqual(Yc.min())?this.Dn(t,e):this.Sn.pn(t,r).next((s=>{const i=this.Cn(e,s);return(eh(e)||nh(e))&&this.Nn(e.limitType,i,r,n)?this.Dn(t,e):(Uc()<=ce.DEBUG&&Fc("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),ah(e)),this.Sn.getDocumentsMatchingQuery(t,e,n).next((t=>(i.forEach((e=>{t=t.insert(e.key,e)})),t))))}));var s}Cn(t,e){let n=new Xh(uh(t));return e.forEach(((e,r)=>{ch(t,r)&&(n=n.add(r))})),n}Nn(t,e,n,r){if(n.size!==e.size)return!0;const s="F"===t?e.last():e.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}Dn(t,e){return Uc()<=ce.DEBUG&&Fc("QueryEngine","Using full collection scan to execute query:",ah(e)),this.Sn.getDocumentsMatchingQuery(t,e,Yc.min())}}
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
 */class Lf{constructor(t,e,n,r){this.persistence=t,this.xn=e,this.R=r,this.kn=new Gh(Gc),this.$n=new vf((t=>Pu(t)),Mu),this.On=Yc.min(),this._n=t.getMutationQueue(n),this.Fn=t.getRemoteDocumentCache(),this.Ue=t.getTargetCache(),this.Mn=new Df(this.Fn,this._n,this.persistence.getIndexManager()),this.Ke=t.getBundleCache(),this.xn.Vn(this.Mn)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.kn)))}}function Pf(t,e,n,r){return new Lf(t,e,n,r)}async function Mf(t,e){const n=zc(t);let r=n._n,s=n.Mn;const i=await n.persistence.runTransaction("Handle user change","readonly",(t=>{let i;return n._n.getAllMutationBatches(t).next((o=>(i=o,r=n.persistence.getMutationQueue(e),s=new Df(n.Fn,r,n.persistence.getIndexManager()),r.getAllMutationBatches(t)))).next((e=>{const n=[],r=[];let o=sl();for(const t of i){n.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}for(const t of e){r.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}return s.pn(t,o).next((t=>({Ln:t,removedBatchIds:n,addedBatchIds:r})))}))}));return n._n=r,n.Mn=s,n.xn.Vn(n.Mn),i}function Uf(t){const e=zc(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Ue.getLastRemoteSnapshotVersion(t)))}function Ff(t,e){const n=zc(t),r=e.snapshotVersion;let s=n.kn;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(t=>{const i=n.Fn.newChangeBuffer({trackRemovals:!0});s=n.kn;const o=[];e.targetChanges.forEach(((e,i)=>{const a=s.get(i);if(!a)return;o.push(n.Ue.removeMatchingKeys(t,e.removedDocuments,i).next((()=>n.Ue.addMatchingKeys(t,e.addedDocuments,i))));const c=e.resumeToken;if(c.approximateByteSize()>0){const d=a.withResumeToken(c,r).withSequenceNumber(t.currentSequenceNumber);s=s.insert(i,d),u=a,l=e,jc((h=d).resumeToken.approximateByteSize()>0),(0===u.resumeToken.approximateByteSize()||h.snapshotVersion.toMicroseconds()-u.snapshotVersion.toMicroseconds()>=3e8||l.addedDocuments.size+l.modifiedDocuments.size+l.removedDocuments.size>0)&&o.push(n.Ue.updateTargetData(t,d))}var u,h,l}));let a=Zh();if(e.documentUpdates.forEach(((r,s)=>{e.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,r))})),o.push(function(t,e,n,r,s){let i=sl();return n.forEach((t=>i=i.add(t))),e.getEntries(t,i).next((t=>{let i=Zh();return n.forEach(((n,o)=>{const a=t.get(n),c=(null==s?void 0:s.get(n))||r;o.isNoDocument()&&o.version.isEqual(Yc.min())?(e.removeEntry(n,c),i=i.insert(n,o)):!a.isValidDocument()||o.version.compareTo(a.version)>0||0===o.version.compareTo(a.version)&&a.hasPendingWrites?(e.addEntry(o,c),i=i.insert(n,o)):Fc("LocalStore","Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",o.version)})),i}))}(t,i,e.documentUpdates,r,void 0).next((t=>{a=t}))),!r.isEqual(Yc.min())){const e=n.Ue.getLastRemoteSnapshotVersion(t).next((e=>n.Ue.setTargetsMetadata(t,t.currentSequenceNumber,r)));o.push(e)}return vd.waitFor(o).next((()=>i.apply(t))).next((()=>n.Mn.En(t,a))).next((()=>a))})).then((t=>(n.kn=s,t)))}function Vf(t,e){const n=zc(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(t=>(void 0===e&&(e=-1),n._n.getNextMutationBatchAfterBatchId(t,e))))}async function qf(t,e,n){const r=zc(t),s=r.kn.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,(t=>r.persistence.referenceDelegate.removeTarget(t,s)))}catch(o){if(!Td(o))throw o;Fc("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.kn=r.kn.remove(e),r.$n.delete(s.target)}function Bf(t,e,n){const r=zc(t);let s=Yc.min(),i=sl();return r.persistence.runTransaction("Execute query","readonly",(t=>function(t,e,n){const r=zc(t),s=r.$n.get(n);return void 0!==s?vd.resolve(r.kn.get(s)):r.Ue.getTargetData(e,n)}(r,t,sh(e)).next((e=>{if(e)return s=e.lastLimboFreeSnapshotVersion,r.Ue.getMatchingKeysForTargetId(t,e.targetId).next((t=>{i=t}))})).next((()=>r.xn.getDocumentsMatchingQuery(t,e,n?s:Yc.min(),n?i:sl()))).next((t=>({documents:t,Bn:i})))))}async function $f(t){const e=zc(t);return e.persistence.runTransaction("Synchronize last document change read time","readonly",(t=>function(t){const e=Tf(t);let n=Yc.min();return e.Ot({index:id.readTimeIndex,reverse:!0},((t,e,r)=>{e.readTime&&(n=function(t){const e=new Xc(t[0],t[1]);return Yc.fromTimestamp(e)}(e.readTime)),r.done()})).next((()=>n))}(t))).then((t=>{e.On=t}))}
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
 */class jf{constructor(t){this.R=t,this.Qn=new Map,this.jn=new Map}getBundleMetadata(t,e){return vd.resolve(this.Qn.get(e))}saveBundleMetadata(t,e){var n;return this.Qn.set(e.id,{id:(n=e).id,version:n.version,createTime:_l(n.createTime)}),vd.resolve()}getNamedQuery(t,e){return vd.resolve(this.jn.get(e))}saveNamedQuery(t,e){return this.jn.set(e.name,{name:(n=e).name,query:$d(n.bundledQuery),readTime:_l(n.readTime)}),vd.resolve();var n}}
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
 */class zf{constructor(){this.Wn=new Xh(Kf.Gn),this.zn=new Xh(Kf.Hn)}isEmpty(){return this.Wn.isEmpty()}addReference(t,e){const n=new Kf(t,e);this.Wn=this.Wn.add(n),this.zn=this.zn.add(n)}Jn(t,e){t.forEach((t=>this.addReference(t,e)))}removeReference(t,e){this.Yn(new Kf(t,e))}Xn(t,e){t.forEach((t=>this.removeReference(t,e)))}Zn(t){const e=new gu(new nu([])),n=new Kf(e,t),r=new Kf(e,t+1),s=[];return this.zn.forEachInRange([n,r],(t=>{this.Yn(t),s.push(t.key)})),s}ts(){this.Wn.forEach((t=>this.Yn(t)))}Yn(t){this.Wn=this.Wn.delete(t),this.zn=this.zn.delete(t)}es(t){const e=new gu(new nu([])),n=new Kf(e,t),r=new Kf(e,t+1);let s=sl();return this.zn.forEachInRange([n,r],(t=>{s=s.add(t.key)})),s}containsKey(t){const e=new Kf(t,0),n=this.Wn.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class Kf{constructor(t,e){this.key=t,this.ns=e}static Gn(t,e){return gu.comparator(t.key,e.key)||Gc(t.ns,e.ns)}static Hn(t,e){return Gc(t.ns,e.ns)||gu.comparator(t.key,e.key)}}
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
 */class Hf{constructor(t,e){this.qt=t,this.referenceDelegate=e,this._n=[],this.ss=1,this.rs=new Xh(Kf.Gn)}checkEmpty(t){return vd.resolve(0===this._n.length)}addMutationBatch(t,e,n,r){const s=this.ss;this.ss++,this._n.length>0&&this._n[this._n.length-1];const i=new Nd(s,e,n,r);this._n.push(i);for(const o of r)this.rs=this.rs.add(new Kf(o.key,s)),this.qt.addToCollectionParentIndex(t,o.key.path.popLast());return vd.resolve(i)}lookupMutationBatch(t,e){return vd.resolve(this.os(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=this.cs(n),s=r<0?0:r;return vd.resolve(this._n.length>s?this._n[s]:null)}getHighestUnacknowledgedBatchId(){return vd.resolve(0===this._n.length?-1:this.ss-1)}getAllMutationBatches(t){return vd.resolve(this._n.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new Kf(e,0),r=new Kf(e,Number.POSITIVE_INFINITY),s=[];return this.rs.forEachInRange([n,r],(t=>{const e=this.os(t.ns);s.push(e)})),vd.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new Xh(Gc);return e.forEach((t=>{const e=new Kf(t,0),r=new Kf(t,Number.POSITIVE_INFINITY);this.rs.forEachInRange([e,r],(t=>{n=n.add(t.ns)}))})),vd.resolve(this.us(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1;let s=n;gu.isDocumentKey(s)||(s=s.child(""));const i=new Kf(new gu(s),0);let o=new Xh(Gc);return this.rs.forEachWhile((t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===r&&(o=o.add(t.ns)),!0)}),i),vd.resolve(this.us(o))}us(t){const e=[];return t.forEach((t=>{const n=this.os(t);null!==n&&e.push(n)})),e}removeMutationBatch(t,e){jc(0===this.hs(e.batchId,"removed")),this._n.shift();let n=this.rs;return vd.forEach(e.mutations,(r=>{const s=new Kf(r.key,e.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(t,r.key)})).next((()=>{this.rs=n}))}Gt(t){}containsKey(t,e){const n=new Kf(e,0),r=this.rs.firstAfterOrEqual(n);return vd.resolve(e.isEqual(r&&r.key))}performConsistencyCheck(t){return this._n.length,vd.resolve()}hs(t,e){return this.cs(t)}cs(t){return 0===this._n.length?0:t-this._n[0].batchId}os(t){const e=this.cs(t);return e<0||e>=this._n.length?null:this._n[e]}}
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
 */class Gf{constructor(t,e){this.qt=t,this.ls=e,this.docs=new Gh(gu.comparator),this.size=0}addEntry(t,e,n){const r=e.key,s=this.docs.get(r),i=s?s.size:0,o=this.ls(e);return this.docs=this.docs.insert(r,{document:e.clone(),size:o,readTime:n}),this.size+=o-i,this.qt.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return vd.resolve(n?n.document.clone():xu.newInvalidDocument(e))}getEntries(t,e){let n=Zh();return e.forEach((t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.clone():xu.newInvalidDocument(t))})),vd.resolve(n)}getDocumentsMatchingQuery(t,e,n){let r=Zh();const s=new gu(e.path.child("")),i=this.docs.getIteratorFrom(s);for(;i.hasNext();){const{key:t,value:{document:s,readTime:o}}=i.getNext();if(!e.path.isPrefixOf(t.path))break;o.compareTo(n)<=0||ch(e,s)&&(r=r.insert(s.key,s.clone()))}return vd.resolve(r)}fs(t,e){return vd.forEach(this.docs,(t=>e(t)))}newChangeBuffer(t){return new Wf(this)}getSize(t){return vd.resolve(this.size)}}class Wf extends wf{constructor(t){super(),this.Ie=t}applyChanges(t){const e=[];return this.changes.forEach(((n,r)=>{r.document.isValidDocument()?e.push(this.Ie.addEntry(t,r.document,this.getReadTime(n))):this.Ie.removeEntry(n)})),vd.waitFor(e)}getFromCache(t,e){return this.Ie.getEntry(t,e)}getAllFromCache(t,e){return this.Ie.getEntries(t,e)}}
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
 */class Qf{constructor(t){this.persistence=t,this.ds=new vf((t=>Pu(t)),Mu),this.lastRemoteSnapshotVersion=Yc.min(),this.highestTargetId=0,this.ws=0,this._s=new zf,this.targetCount=0,this.gs=of.Jt()}forEachTarget(t,e){return this.ds.forEach(((t,n)=>e(n))),vd.resolve()}getLastRemoteSnapshotVersion(t){return vd.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return vd.resolve(this.ws)}allocateTargetId(t){return this.highestTargetId=this.gs.next(),vd.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ws&&(this.ws=e),vd.resolve()}te(t){this.ds.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.gs=new of(e),this.highestTargetId=e),t.sequenceNumber>this.ws&&(this.ws=t.sequenceNumber)}addTargetData(t,e){return this.te(e),this.targetCount+=1,vd.resolve()}updateTargetData(t,e){return this.te(e),vd.resolve()}removeTargetData(t,e){return this.ds.delete(e.target),this._s.Zn(e.targetId),this.targetCount-=1,vd.resolve()}removeTargets(t,e,n){let r=0;const s=[];return this.ds.forEach(((i,o)=>{o.sequenceNumber<=e&&null===n.get(o.targetId)&&(this.ds.delete(i),s.push(this.removeMatchingKeysForTargetId(t,o.targetId)),r++)})),vd.waitFor(s).next((()=>r))}getTargetCount(t){return vd.resolve(this.targetCount)}getTargetData(t,e){const n=this.ds.get(e)||null;return vd.resolve(n)}addMatchingKeys(t,e,n){return this._s.Jn(e,n),vd.resolve()}removeMatchingKeys(t,e,n){this._s.Xn(e,n);const r=this.persistence.referenceDelegate,s=[];return r&&e.forEach((e=>{s.push(r.markPotentiallyOrphaned(t,e))})),vd.waitFor(s)}removeMatchingKeysForTargetId(t,e){return this._s.Zn(e),vd.resolve()}getMatchingKeysForTargetId(t,e){const n=this._s.es(e);return vd.resolve(n)}containsKey(t,e){return vd.resolve(this._s.containsKey(e))}}
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
 */class Xf{constructor(t,e){var n;this.ys={},this.Ne=new Oc(0),this.xe=!1,this.xe=!0,this.referenceDelegate=t(this),this.Ue=new Qf(this),this.qt=new Hd,this.qe=(n=this.qt,new Gf(n,(t=>this.referenceDelegate.ps(t)))),this.R=new Od(e),this.Ke=new jf(this.R)}start(){return Promise.resolve()}shutdown(){return this.xe=!1,Promise.resolve()}get started(){return this.xe}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(){return this.qt}getMutationQueue(t){let e=this.ys[t.toKey()];return e||(e=new Hf(this.qt,this.referenceDelegate),this.ys[t.toKey()]=e),e}getTargetCache(){return this.Ue}getRemoteDocumentCache(){return this.qe}getBundleCache(){return this.Ke}runTransaction(t,e,n){Fc("MemoryPersistence","Starting transaction:",t);const r=new Yf(this.Ne.next());return this.referenceDelegate.Es(),n(r).next((t=>this.referenceDelegate.Ts(r).next((()=>t)))).toPromise().then((t=>(r.raiseOnCommittedEvent(),t)))}Is(t,e){return vd.or(Object.values(this.ys).map((n=>()=>n.containsKey(t,e))))}}class Yf extends gd{constructor(t){super(),this.currentSequenceNumber=t}}class Jf{constructor(t){this.persistence=t,this.As=new zf,this.Rs=null}static Ps(t){return new Jf(t)}get bs(){if(this.Rs)return this.Rs;throw $c()}addReference(t,e,n){return this.As.addReference(n,e),this.bs.delete(n.toString()),vd.resolve()}removeReference(t,e,n){return this.As.removeReference(n,e),this.bs.add(n.toString()),vd.resolve()}markPotentiallyOrphaned(t,e){return this.bs.add(e.toString()),vd.resolve()}removeTarget(t,e){this.As.Zn(e.targetId).forEach((t=>this.bs.add(t.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((t=>{t.forEach((t=>this.bs.add(t.toString())))})).next((()=>n.removeTargetData(t,e)))}Es(){this.Rs=new Set}Ts(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return vd.forEach(this.bs,(n=>{const r=gu.fromPath(n);return this.vs(t,r).next((t=>{t||e.removeEntry(r)}))})).next((()=>(this.Rs=null,e.apply(t))))}updateLimboDocument(t,e){return this.vs(t,e).next((t=>{t?this.bs.delete(e.toString()):this.bs.add(e.toString())}))}ps(t){return 0}vs(t,e){return vd.or([()=>vd.resolve(this.As.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Is(t,e)])}}
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
 */class Zf{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Zf.UNAUTHENTICATED=new Zf(null),Zf.GOOGLE_CREDENTIALS=new Zf("google-credentials-uid"),Zf.FIRST_PARTY=new Zf("first-party-uid");class tp{constructor(){this.activeTargetIds=ol()}Ds(t){this.activeTargetIds=this.activeTargetIds.add(t)}Cs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ss(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class ep{constructor(){this.li=new tp,this.fi={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t){return this.li.Ds(t),this.fi[t]||"not-current"}updateQueryState(t,e,n){this.fi[t]=e}removeLocalQueryTarget(t){this.li.Cs(t)}isLocalQueryTarget(t){return this.li.activeTargetIds.has(t)}clearQueryState(t){delete this.fi[t]}getAllActiveQueryTargets(){return this.li.activeTargetIds}isActiveQueryTarget(t){return this.li.activeTargetIds.has(t)}start(){return this.li=new tp,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(){}}
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
 */class np{di(t){}shutdown(){}}
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
 */class rp{constructor(){this.wi=()=>this._i(),this.mi=()=>this.gi(),this.yi=[],this.pi()}di(t){this.yi.push(t)}shutdown(){window.removeEventListener("online",this.wi),window.removeEventListener("offline",this.mi)}pi(){window.addEventListener("online",this.wi),window.addEventListener("offline",this.mi)}_i(){Fc("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.yi)t(0)}gi(){Fc("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.yi)t(1)}static gt(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
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
 */const sp={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};
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
 */class ip{constructor(t){this.Ei=t.Ei,this.Ti=t.Ti}Ii(t){this.Ai=t}Ri(t){this.Pi=t}onMessage(t){this.bi=t}close(){this.Ti()}send(t){this.Ei(t)}vi(){this.Ai()}Vi(t){this.Pi(t)}Si(t){this.bi(t)}}
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
 */class op extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http";this.Di=e+"://"+t.host,this.Ci="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}Ni(t,e,n,r){const s=this.xi(t,e);Fc("RestConnection","Sending: ",s,n);const i={};return this.ki(i,r),this.$i(t,s,i,n).then((t=>(Fc("RestConnection","Received: ",t),t)),(e=>{throw qc("RestConnection",`${t} failed with error: `,e,"url: ",s,"request:",n),e}))}Oi(t,e,n,r){return this.Ni(t,e,n,r)}ki(t,e){if(t["X-Goog-Api-Client"]="gl-js/ fire/"+xc,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e)for(const n in e.authHeaders)e.authHeaders.hasOwnProperty(n)&&(t[n]=e.authHeaders[n])}xi(t,e){const n=sp[t];return`${this.Di}/v1/${e}:${n}`}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams}$i(t,e,n,r){return new Promise(((s,i)=>{const o=new Dc;o.listenOnce(Sc.COMPLETE,(()=>{try{switch(o.getLastErrorCode()){case Ec.NO_ERROR:const e=o.getResponseJson();Fc("Connection","XHR received:",JSON.stringify(e)),s(e);break;case Ec.TIMEOUT:Fc("Connection",'RPC "'+t+'" timed out'),i(new Pc(Lc.DEADLINE_EXCEEDED,"Request time out"));break;case Ec.HTTP_ERROR:const n=o.getStatus();if(Fc("Connection",'RPC "'+t+'" failed with status:',n,"response text:",o.getResponseText()),n>0){const t=o.getResponseJson().error;if(t&&t.status&&t.message){const e=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(Lc).indexOf(e)>=0?e:Lc.UNKNOWN}(t.status);i(new Pc(e,t.message))}else i(new Pc(Lc.UNKNOWN,"Server responded with status "+o.getStatus()))}else i(new Pc(Lc.UNAVAILABLE,"Connection failed."));break;default:$c()}}finally{Fc("Connection",'RPC "'+t+'" completed.')}}));const a=JSON.stringify(r);o.send(e,"POST",a,n,15)}))}Fi(t,e){const n=[this.Di,"/","google.firestore.v1.Firestore","/",t,"/channel"],r=new fc,s=mo(),i={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(i.xmlHttpFactory=new Ac({})),this.ki(i.initMessageHeaders,e),Gt()||Qt()||Ht().indexOf("Electron/")>=0||Xt()||Ht().indexOf("MSAppHost/")>=0||Wt()||(i.httpHeadersOverwriteParam="$httpHeaders");const o=n.join("");Fc("Connection","Creating WebChannel: "+o,i);const a=r.createWebChannel(o,i);let c=!1,u=!1;const h=new ip({Ei:t=>{u?Fc("Connection","Not sending because WebChannel is closed:",t):(c||(Fc("Connection","Opening WebChannel transport."),a.open(),c=!0),Fc("Connection","WebChannel sending:",t),a.send(t))},Ti:()=>a.close()}),l=(t,e,n)=>{t.listen(e,(t=>{try{n(t)}catch(e){setTimeout((()=>{throw e}),0)}}))};return l(a,Nc.EventType.OPEN,(()=>{u||Fc("Connection","WebChannel transport opened.")})),l(a,Nc.EventType.CLOSE,(()=>{u||(u=!0,Fc("Connection","WebChannel transport closed"),h.Vi())})),l(a,Nc.EventType.ERROR,(t=>{u||(u=!0,qc("Connection","WebChannel transport errored:",t),h.Vi(new Pc(Lc.UNAVAILABLE,"The operation could not be completed")))})),l(a,Nc.EventType.MESSAGE,(t=>{var e;if(!u){const n=t.data[0];jc(!!n);const r=n,s=r.error||(null===(e=r[0])||void 0===e?void 0:e.error);if(s){Fc("Connection","WebChannel received error:",s);const t=s.status;let e=function(t){const e=zh[t];if(void 0!==e)return Hh(e)}(t),n=s.message;void 0===e&&(e=Lc.INTERNAL,n="Unknown error status: "+t+" with message "+s.message),u=!0,h.Vi(new Pc(e,n)),a.close()}else Fc("Connection","WebChannel received:",n),h.Si(n)}})),l(s,kc.STAT_EVENT,(t=>{t.stat===Cc?Fc("Connection","Detected buffering proxy"):t.stat===Rc&&Fc("Connection","Detected no buffering proxy")})),setTimeout((()=>{h.vi()}),0),h}}
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
 */function ap(){return"undefined"!=typeof document?document:null}
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
 */function cp(t){return new vl(t,!0)}class up{constructor(t,e,n=1e3,r=1.5,s=6e4){this.Se=t,this.timerId=e,this.Mi=n,this.Li=r,this.Bi=s,this.Ui=0,this.qi=null,this.Ki=Date.now(),this.reset()}reset(){this.Ui=0}Qi(){this.Ui=this.Bi}ji(t){this.cancel();const e=Math.floor(this.Ui+this.Wi()),n=Math.max(0,Date.now()-this.Ki),r=Math.max(0,e-n);r>0&&Fc("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Ui} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.qi=this.Se.enqueueAfterDelay(this.timerId,r,(()=>(this.Ki=Date.now(),t()))),this.Ui*=this.Li,this.Ui<this.Mi&&(this.Ui=this.Mi),this.Ui>this.Bi&&(this.Ui=this.Bi)}Gi(){null!==this.qi&&(this.qi.skipDelay(),this.qi=null)}cancel(){null!==this.qi&&(this.qi.cancel(),this.qi=null)}Wi(){return(Math.random()-.5)*this.Ui}}
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
 */class hp{constructor(t,e,n,r,s,i){this.Se=t,this.zi=n,this.Hi=r,this.Ji=s,this.listener=i,this.state=0,this.Yi=0,this.Xi=null,this.stream=null,this.Zi=new up(t,e)}tr(){return 1===this.state||2===this.state||4===this.state}er(){return 2===this.state}start(){3!==this.state?this.auth():this.nr()}async stop(){this.tr()&&await this.close(0)}sr(){this.state=0,this.Zi.reset()}ir(){this.er()&&null===this.Xi&&(this.Xi=this.Se.enqueueAfterDelay(this.zi,6e4,(()=>this.rr())))}cr(t){this.ur(),this.stream.send(t)}async rr(){if(this.er())return this.close(0)}ur(){this.Xi&&(this.Xi.cancel(),this.Xi=null)}async close(t,e){this.ur(),this.Zi.cancel(),this.Yi++,3!==t?this.Zi.reset():e&&e.code===Lc.RESOURCE_EXHAUSTED?(Vc(e.toString()),Vc("Using maximum backoff delay to prevent overloading the backend."),this.Zi.Qi()):e&&e.code===Lc.UNAUTHENTICATED&&this.Ji.invalidateToken(),null!==this.stream&&(this.ar(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Ri(e)}ar(){}auth(){this.state=1;const t=this.hr(this.Yi),e=this.Yi;this.Ji.getToken().then((t=>{this.Yi===e&&this.lr(t)}),(e=>{t((()=>{const t=new Pc(Lc.UNKNOWN,"Fetching auth token failed: "+e.message);return this.dr(t)}))}))}lr(t){const e=this.hr(this.Yi);this.stream=this.wr(t),this.stream.Ii((()=>{e((()=>(this.state=2,this.listener.Ii())))})),this.stream.Ri((t=>{e((()=>this.dr(t)))})),this.stream.onMessage((t=>{e((()=>this.onMessage(t)))}))}nr(){this.state=4,this.Zi.ji((async()=>{this.state=0,this.start()}))}dr(t){return Fc("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(3,t)}hr(t){return e=>{this.Se.enqueueAndForget((()=>this.Yi===t?e():(Fc("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class lp extends hp{constructor(t,e,n,r,s){super(t,"listen_stream_connection_backoff","listen_stream_idle",e,n,s),this.R=r}wr(t){return this.Hi.Fi("Listen",t)}onMessage(t){this.Zi.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const s="NO_CHANGE"===(r=e.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:$c(),i=e.targetChange.targetIds||[],o=function(t,e){return t.I?(jc(void 0===e||"string"==typeof e),ou.fromBase64String(e||"")):(jc(void 0===e||e instanceof Uint8Array),ou.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(t){const e=void 0===t.code?Lc.UNKNOWN:Hh(t.code);return new Pc(e,t.message||"")}(a);n=new ll(s,i,o,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=kl(t,r.document.name),i=_l(r.document.updateTime),o=new Nu({mapValue:{fields:r.document.fields}}),a=xu.newFoundDocument(s,i,o),c=r.targetIds||[],u=r.removedTargetIds||[];n=new ul(c,u,a.key,a)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=kl(t,r.document),i=r.readTime?_l(r.readTime):Yc.min(),o=xu.newNoDocument(s,i),a=r.removedTargetIds||[];n=new ul([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=kl(t,r.document),i=r.removedTargetIds||[];n=new ul([],i,s,null)}else{if(!("filter"in e))return $c();{e.filter;const t=e.filter;t.targetId;const r=t.count||0,s=new jh(r),i=t.targetId;n=new hl(i,s)}}var r;return n}(this.R,t),n=function(t){if(!("targetChange"in t))return Yc.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?Yc.min():e.readTime?_l(e.readTime):Yc.min()}(t);return this.listener._r(e,n)}mr(t){const e={};e.database=Al(this.R),e.addTarget=function(t,e){let n;const r=e.target;return n=Uu(r)?{documents:Ll(t,r)}:{query:Pl(t,r)},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0?n.resumeToken=bl(t,e.resumeToken):e.snapshotVersion.compareTo(Yc.min())>0&&(n.readTime=wl(t,e.snapshotVersion.toTimestamp())),n}(this.R,t);const n=function(t,e){const n=function(t,e){switch(e){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return $c()}}(0,e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.R,t);n&&(e.labels=n),this.cr(e)}gr(t){const e={};e.database=Al(this.R),e.removeTarget=t,this.cr(e)}}class dp extends hp{constructor(t,e,n,r,s){super(t,"write_stream_connection_backoff","write_stream_idle",e,n,s),this.R=r,this.yr=!1}get pr(){return this.yr}start(){this.yr=!1,this.lastStreamToken=void 0,super.start()}ar(){this.yr&&this.Er([])}wr(t){return this.Hi.Fi("Write",t)}onMessage(t){if(jc(!!t.streamToken),this.lastStreamToken=t.streamToken,this.yr){this.Zi.reset();const e=function(t,e){return t&&t.length>0?(jc(void 0!==e),t.map((t=>function(t,e){let n=t.updateTime?_l(t.updateTime):_l(e);return n.isEqual(Yc.min())&&(n=_l(e)),new Ch(n,t.transformResults||[])}(t,e)))):[]}(t.writeResults,t.commitTime),n=_l(t.commitTime);return this.listener.Tr(n,e)}return jc(!t.writeResults||0===t.writeResults.length),this.yr=!0,this.listener.Ir()}Ar(){const t={};t.database=Al(this.R),this.cr(t)}Er(t){const e={streamToken:this.lastStreamToken,writes:t.map((t=>xl(this.R,t)))};this.cr(e)}}
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
 */class fp extends class{}{constructor(t,e,n){super(),this.credentials=t,this.Hi=e,this.R=n,this.Rr=!1}Pr(){if(this.Rr)throw new Pc(Lc.FAILED_PRECONDITION,"The client has already been terminated.")}Ni(t,e,n){return this.Pr(),this.credentials.getToken().then((r=>this.Hi.Ni(t,e,n,r))).catch((t=>{throw"FirebaseError"===t.name?(t.code===Lc.UNAUTHENTICATED&&this.credentials.invalidateToken(),t):new Pc(Lc.UNKNOWN,t.toString())}))}Oi(t,e,n){return this.Pr(),this.credentials.getToken().then((r=>this.Hi.Oi(t,e,n,r))).catch((t=>{throw"FirebaseError"===t.name?(t.code===Lc.UNAUTHENTICATED&&this.credentials.invalidateToken(),t):new Pc(Lc.UNKNOWN,t.toString())}))}terminate(){this.Rr=!0}}class pp{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.br=0,this.vr=null,this.Vr=!0}Sr(){0===this.br&&(this.Dr("Unknown"),this.vr=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.vr=null,this.Cr("Backend didn't respond within 10 seconds."),this.Dr("Offline"),Promise.resolve()))))}Nr(t){"Online"===this.state?this.Dr("Unknown"):(this.br++,this.br>=1&&(this.kr(),this.Cr(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.Dr("Offline")))}set(t){this.kr(),this.br=0,"Online"===t&&(this.Vr=!1),this.Dr(t)}Dr(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}Cr(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Vr?(Vc(e),this.Vr=!1):Fc("OnlineStateTracker",e)}kr(){null!==this.vr&&(this.vr.cancel(),this.vr=null)}}
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
 */class mp{constructor(t,e,n,r,s){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.$r=[],this.Or=new Map,this.Fr=new Set,this.Mr=[],this.Lr=s,this.Lr.di((t=>{n.enqueueAndForget((async()=>{Ep(this)&&(Fc("RemoteStore","Restarting streams for network reachability change."),await async function(t){const e=zc(t);e.Fr.add(4),await yp(e),e.Br.set("Unknown"),e.Fr.delete(4),await gp(e)}(this))}))})),this.Br=new pp(n,r)}}async function gp(t){if(Ep(t))for(const e of t.Mr)await e(!0)}async function yp(t){for(const e of t.Mr)await e(!1)}function vp(t,e){const n=zc(t);n.Or.has(e.targetId)||(n.Or.set(e.targetId,e),Tp(n)?_p(n):qp(n).er()&&bp(n,e))}function wp(t,e){const n=zc(t),r=qp(n);n.Or.delete(e),r.er()&&Ip(n,e),0===n.Or.size&&(r.er()?r.ir():Ep(n)&&n.Br.set("Unknown"))}function bp(t,e){t.Ur.q(e.targetId),qp(t).mr(e)}function Ip(t,e){t.Ur.q(e),qp(t).gr(e)}function _p(t){t.Ur=new fl({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>t.Or.get(e)||null}),qp(t).start(),t.Br.Sr()}function Tp(t){return Ep(t)&&!qp(t).tr()&&t.Or.size>0}function Ep(t){return 0===zc(t).Fr.size}function Sp(t){t.Ur=void 0}async function kp(t){t.Or.forEach(((e,n)=>{bp(t,e)}))}async function Cp(t,e){Sp(t),Tp(t)?(t.Br.Nr(e),_p(t)):t.Br.set("Unknown")}async function Rp(t,e,n){if(t.Br.set("Online"),e instanceof ll&&2===e.state&&e.cause)try{await async function(t,e){const n=e.cause;for(const r of e.targetIds)t.Or.has(r)&&(await t.remoteSyncer.rejectListen(r,n),t.Or.delete(r),t.Ur.removeTarget(r))}(t,e)}catch(r){Fc("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ap(t,r)}else if(e instanceof ul?t.Ur.X(e):e instanceof hl?t.Ur.rt(e):t.Ur.et(e),!n.isEqual(Yc.min()))try{const e=await Uf(t.localStore);n.compareTo(e)>=0&&await function(t,e){const n=t.Ur.ut(e);return n.targetChanges.forEach(((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=t.Or.get(r);s&&t.Or.set(r,s.withResumeToken(n.resumeToken,e))}})),n.targetMismatches.forEach((e=>{const n=t.Or.get(e);if(!n)return;t.Or.set(e,n.withResumeToken(ou.EMPTY_BYTE_STRING,n.snapshotVersion)),Ip(t,e);const r=new xd(n.target,e,1,n.sequenceNumber);bp(t,r)})),t.remoteSyncer.applyRemoteEvent(n)}(t,n)}catch(s){Fc("RemoteStore","Failed to raise snapshot:",s),await Ap(t,s)}}async function Ap(t,e,n){if(!Td(e))throw e;t.Fr.add(1),await yp(t),t.Br.set("Offline"),n||(n=()=>Uf(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{Fc("RemoteStore","Retrying IndexedDB access"),await n(),t.Fr.delete(1),await gp(t)}))}function Np(t,e){return e().catch((n=>Ap(t,n,e)))}async function Dp(t){const e=zc(t),n=Bp(e);let r=e.$r.length>0?e.$r[e.$r.length-1].batchId:-1;for(;xp(e);)try{const t=await Vf(e.localStore,r);if(null===t){0===e.$r.length&&n.ir();break}r=t.batchId,Op(e,t)}catch(s){await Ap(e,s)}Lp(e)&&Pp(e)}function xp(t){return Ep(t)&&t.$r.length<10}function Op(t,e){t.$r.push(e);const n=Bp(t);n.er()&&n.pr&&n.Er(e.mutations)}function Lp(t){return Ep(t)&&!Bp(t).tr()&&t.$r.length>0}function Pp(t){Bp(t).start()}async function Mp(t){Bp(t).Ar()}async function Up(t){const e=Bp(t);for(const n of t.$r)e.Er(n.mutations)}async function Fp(t,e,n){const r=t.$r.shift(),s=Dd.from(r,e,n);await Np(t,(()=>t.remoteSyncer.applySuccessfulWrite(s))),await Dp(t)}async function Vp(t,e){e&&Bp(t).pr&&await async function(t,e){if(function(t){switch(t){case Lc.OK:return $c();case Lc.CANCELLED:case Lc.UNKNOWN:case Lc.DEADLINE_EXCEEDED:case Lc.RESOURCE_EXHAUSTED:case Lc.INTERNAL:case Lc.UNAVAILABLE:case Lc.UNAUTHENTICATED:return!1;case Lc.INVALID_ARGUMENT:case Lc.NOT_FOUND:case Lc.ALREADY_EXISTS:case Lc.PERMISSION_DENIED:case Lc.FAILED_PRECONDITION:case Lc.ABORTED:case Lc.OUT_OF_RANGE:case Lc.UNIMPLEMENTED:case Lc.DATA_LOSS:return!0;default:return $c()}}(n=e.code)&&n!==Lc.ABORTED){const n=t.$r.shift();Bp(t).sr(),await Np(t,(()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e))),await Dp(t)}var n}(t,e),Lp(t)&&Pp(t)}function qp(t){return t.qr||(t.qr=function(t,e,n){const r=zc(t);return r.Pr(),new lp(e,r.Hi,r.credentials,r.R,n)}(t.datastore,t.asyncQueue,{Ii:kp.bind(null,t),Ri:Cp.bind(null,t),_r:Rp.bind(null,t)}),t.Mr.push((async e=>{e?(t.qr.sr(),Tp(t)?_p(t):t.Br.set("Unknown")):(await t.qr.stop(),Sp(t))}))),t.qr}function Bp(t){return t.Kr||(t.Kr=function(t,e,n){const r=zc(t);return r.Pr(),new dp(e,r.Hi,r.credentials,r.R,n)}(t.datastore,t.asyncQueue,{Ii:Mp.bind(null,t),Ri:Vp.bind(null,t),Ir:Up.bind(null,t),Tr:Fp.bind(null,t)}),t.Mr.push((async e=>{e?(t.Kr.sr(),await Dp(t)):(await t.Kr.stop(),t.$r.length>0&&(Fc("RemoteStore",`Stopping write stream with ${t.$r.length} pending writes`),t.$r=[]))}))),t.Kr
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
 */}class $p{constructor(t,e,n,r,s){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new yd,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((t=>{}))}static createAndSchedule(t,e,n,r,s){const i=Date.now()+n,o=new $p(t,e,i,r,s);return o.start(n),o}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new Pc(Lc.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function jp(t,e){if(Vc("AsyncQueue",`${e}: ${t}`),Td(t))return new Pc(Lc.UNAVAILABLE,`${e}: ${t}`);throw t}
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
 */class zp{constructor(t){this.comparator=t?(e,n)=>t(e,n)||gu.comparator(e.key,n.key):(t,e)=>gu.comparator(t.key,e.key),this.keyedMap=el(),this.sortedSet=new Gh(this.comparator)}static emptySet(t){return new zp(t.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,n)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof zp))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(!t.isEqual(r))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new zp;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
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
 */class Kp{constructor(){this.Qr=new Gh(gu.comparator)}track(t){const e=t.doc.key,n=this.Qr.get(e);n?0!==t.type&&3===n.type?this.Qr=this.Qr.insert(e,t):3===t.type&&1!==n.type?this.Qr=this.Qr.insert(e,{type:n.type,doc:t.doc}):2===t.type&&2===n.type?this.Qr=this.Qr.insert(e,{type:2,doc:t.doc}):2===t.type&&0===n.type?this.Qr=this.Qr.insert(e,{type:0,doc:t.doc}):1===t.type&&0===n.type?this.Qr=this.Qr.remove(e):1===t.type&&2===n.type?this.Qr=this.Qr.insert(e,{type:1,doc:n.doc}):0===t.type&&1===n.type?this.Qr=this.Qr.insert(e,{type:2,doc:t.doc}):$c():this.Qr=this.Qr.insert(e,t)}jr(){const t=[];return this.Qr.inorderTraversal(((e,n)=>{t.push(n)})),t}}class Hp{constructor(t,e,n,r,s,i,o,a){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a}static fromInitialDocuments(t,e,n,r){const s=[];return e.forEach((t=>{s.push({type:0,doc:t})})),new Hp(t,e,zp.emptySet(e),s,n,r,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&ih(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let r=0;r<e.length;r++)if(e[r].type!==n[r].type||!e[r].doc.isEqual(n[r].doc))return!1;return!0}}
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
 */class Gp{constructor(){this.Wr=void 0,this.listeners=[]}}class Wp{constructor(){this.queries=new vf((t=>oh(t)),ih),this.onlineState="Unknown",this.Gr=new Set}}async function Qp(t,e){const n=zc(t),r=e.query;let s=!1,i=n.queries.get(r);if(i||(s=!0,i=new Gp),s)try{i.Wr=await n.onListen(r)}catch(o){const t=jp(o,`Initialization of query '${ah(e.query)}' failed`);return void e.onError(t)}n.queries.set(r,i),i.listeners.push(e),e.zr(n.onlineState),i.Wr&&e.Hr(i.Wr)&&Zp(n)}async function Xp(t,e){const n=zc(t),r=e.query;let s=!1;const i=n.queries.get(r);if(i){const t=i.listeners.indexOf(e);t>=0&&(i.listeners.splice(t,1),s=0===i.listeners.length)}if(s)return n.queries.delete(r),n.onUnlisten(r)}function Yp(t,e){const n=zc(t);let r=!1;for(const s of e){const t=s.query,e=n.queries.get(t);if(e){for(const t of e.listeners)t.Hr(s)&&(r=!0);e.Wr=s}}r&&Zp(n)}function Jp(t,e,n){const r=zc(t),s=r.queries.get(e);if(s)for(const i of s.listeners)i.onError(n);r.queries.delete(e)}function Zp(t){t.Gr.forEach((t=>{t.next()}))}class tm{constructor(t,e,n){this.query=t,this.Jr=e,this.Yr=!1,this.Xr=null,this.onlineState="Unknown",this.options=n||{}}Hr(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new Hp(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0)}let e=!1;return this.Yr?this.Zr(t)&&(this.Jr.next(t),e=!0):this.eo(t,this.onlineState)&&(this.no(t),e=!0),this.Xr=t,e}onError(t){this.Jr.error(t)}zr(t){this.onlineState=t;let e=!1;return this.Xr&&!this.Yr&&this.eo(this.Xr,t)&&(this.no(this.Xr),e=!0),e}eo(t,e){if(!t.fromCache)return!0;const n="Offline"!==e;return!(this.options.so&&n||t.docs.isEmpty()&&"Offline"!==e)}Zr(t){if(t.docChanges.length>0)return!0;const e=this.Xr&&this.Xr.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}no(t){t=Hp.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache),this.Yr=!0,this.Jr.next(t)}}
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
 */class em{constructor(t){this.key=t}}class nm{constructor(t){this.key=t}}class rm{constructor(t,e){this.query=t,this.uo=e,this.ao=null,this.current=!1,this.ho=sl(),this.mutatedKeys=sl(),this.lo=uh(t),this.fo=new zp(this.lo)}get wo(){return this.uo}_o(t,e){const n=e?e.mo:new Kp,r=e?e.fo:this.fo;let s=e?e.mutatedKeys:this.mutatedKeys,i=r,o=!1;const a=eh(this.query)&&r.size===this.query.limit?r.last():null,c=nh(this.query)&&r.size===this.query.limit?r.first():null;if(t.inorderTraversal(((t,e)=>{const u=r.get(t),h=ch(this.query,e)?e:null,l=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations);let f=!1;u&&h?u.data.isEqual(h.data)?l!==d&&(n.track({type:3,doc:h}),f=!0):this.yo(u,h)||(n.track({type:2,doc:h}),f=!0,(a&&this.lo(h,a)>0||c&&this.lo(h,c)<0)&&(o=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(h?(i=i.add(h),s=d?s.add(t):s.delete(t)):(i=i.delete(t),s=s.delete(t)))})),eh(this.query)||nh(this.query))for(;i.size>this.query.limit;){const t=eh(this.query)?i.last():i.first();i=i.delete(t.key),s=s.delete(t.key),n.track({type:1,doc:t})}return{fo:i,mo:n,Nn:o,mutatedKeys:s}}yo(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n){const r=this.fo;this.fo=t.fo,this.mutatedKeys=t.mutatedKeys;const s=t.mo.jr();s.sort(((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return $c()}};return n(t)-n(e)}(t.type,e.type)||this.lo(t.doc,e.doc))),this.po(n);const i=e?this.Eo():[],o=0===this.ho.size&&this.current?1:0,a=o!==this.ao;return this.ao=o,0!==s.length||a?{snapshot:new Hp(this.query,t.fo,r,s,t.mutatedKeys,0===o,a,!1),To:i}:{To:i}}zr(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({fo:this.fo,mo:new Kp,mutatedKeys:this.mutatedKeys,Nn:!1},!1)):{To:[]}}Io(t){return!this.uo.has(t)&&!!this.fo.has(t)&&!this.fo.get(t).hasLocalMutations}po(t){t&&(t.addedDocuments.forEach((t=>this.uo=this.uo.add(t))),t.modifiedDocuments.forEach((t=>{})),t.removedDocuments.forEach((t=>this.uo=this.uo.delete(t))),this.current=t.current)}Eo(){if(!this.current)return[];const t=this.ho;this.ho=sl(),this.fo.forEach((t=>{this.Io(t.key)&&(this.ho=this.ho.add(t.key))}));const e=[];return t.forEach((t=>{this.ho.has(t)||e.push(new nm(t))})),this.ho.forEach((n=>{t.has(n)||e.push(new em(n))})),e}Ao(t){this.uo=t.Bn,this.ho=sl();const e=this._o(t.documents);return this.applyChanges(e,!0)}Ro(){return Hp.fromInitialDocuments(this.query,this.fo,this.mutatedKeys,0===this.ao)}}class sm{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class im{constructor(t){this.key=t,this.Po=!1}}class om{constructor(t,e,n,r,s,i){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.bo={},this.vo=new vf((t=>oh(t)),ih),this.Vo=new Map,this.So=new Set,this.Do=new Gh(gu.comparator),this.Co=new Map,this.No=new zf,this.xo={},this.ko=new Map,this.$o=of.Yt(),this.onlineState="Unknown",this.Oo=void 0}get isPrimaryClient(){return!0===this.Oo}}async function am(t,e){const n=function(t){const e=zc(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=um.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Tm.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=lm.bind(null,e),e.bo._r=Yp.bind(null,e.eventManager),e.bo.Mo=Jp.bind(null,e.eventManager),e}(t);let r,s;const i=n.vo.get(e);if(i)r=i.targetId,n.sharedClientState.addLocalQueryTarget(r),s=i.view.Ro();else{const t=await function(t,e){const n=zc(t);return n.persistence.runTransaction("Allocate target","readwrite",(t=>{let r;return n.Ue.getTargetData(t,e).next((s=>s?(r=s,vd.resolve(r)):n.Ue.allocateTargetId(t).next((s=>(r=new xd(e,s,0,t.currentSequenceNumber),n.Ue.addTargetData(t,r).next((()=>r)))))))})).then((t=>{const r=n.kn.get(t.targetId);return(null===r||t.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.kn=n.kn.insert(t.targetId,t),n.$n.set(e,t.targetId)),t}))}(n.localStore,sh(e)),i=n.sharedClientState.addLocalQueryTarget(t.targetId);r=t.targetId,s=await async function(t,e,n,r){t.Fo=(e,n,r)=>async function(t,e,n,r){let s=e.view._o(n);s.Nn&&(s=await Bf(t.localStore,e.query,!1).then((({documents:t})=>e.view._o(t,s))));const i=r&&r.targetChanges.get(e.targetId),o=e.view.applyChanges(s,t.isPrimaryClient,i);return vm(t,e.targetId,o.To),o.snapshot}(t,e,n,r);const s=await Bf(t.localStore,e,!0),i=new rm(e,s.Bn),o=i._o(s.documents),a=cl.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==t.onlineState),c=i.applyChanges(o,t.isPrimaryClient,a);vm(t,n,c.To);const u=new sm(e,n,i);return t.vo.set(e,u),t.Vo.has(n)?t.Vo.get(n).push(e):t.Vo.set(n,[e]),c.snapshot}(n,e,r,"current"===i),n.isPrimaryClient&&vp(n.remoteStore,t)}return s}async function cm(t,e){const n=zc(t),r=n.vo.get(e),s=n.Vo.get(r.targetId);if(s.length>1)return n.Vo.set(r.targetId,s.filter((t=>!ih(t,e)))),void n.vo.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await qf(n.localStore,r.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(r.targetId),wp(n.remoteStore,r.targetId),gm(n,r.targetId)})).catch(lf)):(gm(n,r.targetId),await qf(n.localStore,r.targetId,!0))}async function um(t,e){const n=zc(t);try{const t=await Ff(n.localStore,e);e.targetChanges.forEach(((t,e)=>{const r=n.Co.get(e);r&&(jc(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1),t.addedDocuments.size>0?r.Po=!0:t.modifiedDocuments.size>0?jc(r.Po):t.removedDocuments.size>0&&(jc(r.Po),r.Po=!1))})),await Im(n,t,e)}catch(r){await lf(r)}}function hm(t,e,n){const r=zc(t);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const t=[];r.vo.forEach(((n,r)=>{const s=r.view.zr(e);s.snapshot&&t.push(s.snapshot)})),function(t,e){const n=zc(t);n.onlineState=e;let r=!1;n.queries.forEach(((t,n)=>{for(const s of n.listeners)s.zr(e)&&(r=!0)})),r&&Zp(n)}(r.eventManager,e),t.length&&r.bo._r(t),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function lm(t,e,n){const r=zc(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Co.get(e),i=s&&s.key;if(i){let t=new Gh(gu.comparator);t=t.insert(i,xu.newNoDocument(i,Yc.min()));const n=sl().add(i),s=new al(Yc.min(),new Map,new Xh(Gc),t,n);await um(r,s),r.Do=r.Do.remove(i),r.Co.delete(e),bm(r)}else await qf(r.localStore,e,!1).then((()=>gm(r,e,n))).catch(lf)}async function dm(t,e){const n=zc(t),r=e.batch.batchId;try{const t=await function(t,e){const n=zc(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(t=>{const r=e.batch.keys(),s=n.Fn.newChangeBuffer({trackRemovals:!0});return function(t,e,n,r){const s=n.batch,i=s.keys();let o=vd.resolve();return i.forEach((t=>{o=o.next((()=>r.getEntry(e,t))).next((e=>{const i=n.docVersions.get(t);jc(null!==i),e.version.compareTo(i)<0&&(s.applyToRemoteDocument(e,n),e.isValidDocument()&&r.addEntry(e,n.commitVersion))}))})),o.next((()=>t._n.removeMutationBatch(e,s)))}(n,t,e,s).next((()=>s.apply(t))).next((()=>n._n.performConsistencyCheck(t))).next((()=>n.Mn.pn(t,r)))}))}(n.localStore,e);mm(n,r,null),pm(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Im(n,t)}catch(s){await lf(s)}}async function fm(t,e,n){const r=zc(t);try{const t=await function(t,e){const n=zc(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",(t=>{let r;return n._n.lookupMutationBatch(t,e).next((e=>(jc(null!==e),r=e.keys(),n._n.removeMutationBatch(t,e)))).next((()=>n._n.performConsistencyCheck(t))).next((()=>n.Mn.pn(t,r)))}))}(r.localStore,e);mm(r,e,n),pm(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Im(r,t)}catch(s){await lf(s)}}function pm(t,e){(t.ko.get(e)||[]).forEach((t=>{t.resolve()})),t.ko.delete(e)}function mm(t,e,n){const r=zc(t);let s=r.xo[r.currentUser.toKey()];if(s){const t=s.get(e);t&&(n?t.reject(n):t.resolve(),s=s.remove(e)),r.xo[r.currentUser.toKey()]=s}}function gm(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Vo.get(e))t.vo.delete(r),n&&t.bo.Mo(r,n);t.Vo.delete(e),t.isPrimaryClient&&t.No.Zn(e).forEach((e=>{t.No.containsKey(e)||ym(t,e)}))}function ym(t,e){t.So.delete(e.path.canonicalString());const n=t.Do.get(e);null!==n&&(wp(t.remoteStore,n),t.Do=t.Do.remove(e),t.Co.delete(n),bm(t))}function vm(t,e,n){for(const r of n)r instanceof em?(t.No.addReference(r.key,e),wm(t,r)):r instanceof nm?(Fc("SyncEngine","Document no longer in limbo: "+r.key),t.No.removeReference(r.key,e),t.No.containsKey(r.key)||ym(t,r.key)):$c()}function wm(t,e){const n=e.key,r=n.path.canonicalString();t.Do.get(n)||t.So.has(r)||(Fc("SyncEngine","New document in limbo: "+n),t.So.add(r),bm(t))}function bm(t){for(;t.So.size>0&&t.Do.size<t.maxConcurrentLimboResolutions;){const e=t.So.values().next().value;t.So.delete(e);const n=new gu(nu.fromString(e)),r=t.$o.next();t.Co.set(r,new im(n)),t.Do=t.Do.insert(n,r),vp(t.remoteStore,new xd(sh(th(n.path)),r,2,Oc.o))}}async function Im(t,e,n){const r=zc(t),s=[],i=[],o=[];r.vo.isEmpty()||(r.vo.forEach(((t,a)=>{o.push(r.Fo(a,e,n).then((t=>{if(t){r.isPrimaryClient&&r.sharedClientState.updateQueryState(a.targetId,t.fromCache?"not-current":"current"),s.push(t);const e=xf.vn(a.targetId,t);i.push(e)}})))})),await Promise.all(o),r.bo._r(s),await async function(t,e){const n=zc(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(t=>vd.forEach(e,(e=>vd.forEach(e.Pn,(r=>n.persistence.referenceDelegate.addReference(t,e.targetId,r))).next((()=>vd.forEach(e.bn,(r=>n.persistence.referenceDelegate.removeReference(t,e.targetId,r)))))))))}catch(r){if(!Td(r))throw r;Fc("LocalStore","Failed to update sequence numbers: "+r)}for(const s of e){const t=s.targetId;if(!s.fromCache){const e=n.kn.get(t),r=e.snapshotVersion,s=e.withLastLimboFreeSnapshotVersion(r);n.kn=n.kn.insert(t,s)}}}(r.localStore,i))}async function _m(t,e){const n=zc(t);if(!n.currentUser.isEqual(e)){Fc("SyncEngine","User change. New user:",e.toKey());const t=await Mf(n.localStore,e);n.currentUser=e,(r=n).ko.forEach((t=>{t.forEach((t=>{t.reject(new Pc(Lc.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))}))})),r.ko.clear(),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await Im(n,t.Ln)}var r}function Tm(t,e){const n=zc(t),r=n.Co.get(e);if(r&&r.Po)return sl().add(r.key);{let t=sl();const r=n.Vo.get(e);if(!r)return t;for(const e of r){const r=n.vo.get(e);t=t.unionWith(r.view.wo)}return t}}function Em(t){const e=zc(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=dm.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=fm.bind(null,e),e}class Sm{constructor(){this.synchronizeTabs=!1}async initialize(t){this.R=cp(t.databaseInfo.databaseId),this.sharedClientState=this.Bo(t),this.persistence=this.Uo(t),await this.persistence.start(),this.gcScheduler=this.qo(t),this.localStore=this.Ko(t)}qo(t){return null}Ko(t){return Pf(this.persistence,new Of,t.initialUser,this.R)}Uo(t){return new Xf(Jf.Ps,this.R)}Bo(t){return new ep}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class km extends Sm{constructor(t,e,n){super(),this.Qo=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await $f(this.localStore),await this.Qo.initialize(this,t),await Em(this.Qo.syncEngine),await Dp(this.Qo.remoteStore)}Ko(t){return Pf(this.persistence,new Of,t.initialUser,this.R)}qo(t){const e=this.persistence.referenceDelegate.garbageCollector;return new pf(e,t.asyncQueue)}Uo(t){const e=function(t,e){let n=t.projectId;return t.isDefaultDatabase||(n+="."+t.database),"firestore/"+e+"/"+n+"/"}(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?Yd.withCacheSize(this.cacheSizeBytes):Yd.DEFAULT;return new Rf(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,"undefined"!=typeof window?window:null,ap(),this.R,this.sharedClientState,!!this.forceOwnership)}Bo(t){return new ep}}class Cm{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>hm(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=_m.bind(null,this.syncEngine),await async function(t,e){const n=zc(t);e?(n.Fr.delete(2),await gp(n)):e||(n.Fr.add(2),await yp(n),n.Br.set("Unknown"))}(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new Wp}createDatastore(t){const e=cp(t.databaseInfo.databaseId),n=(r=t.databaseInfo,new op(r));var r,s;return s=t.credentials,new fp(s,n,e)}createRemoteStore(t){return e=this.localStore,n=this.datastore,r=t.asyncQueue,s=t=>hm(this.syncEngine,t,0),i=rp.gt()?new rp:new np,new mp(e,n,r,s,i);var e,n,r,s,i}createSyncEngine(t,e){return function(t,e,n,r,s,i,o){const a=new om(t,e,n,r,s,i);return o&&(a.Oo=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}terminate(){return async function(t){const e=zc(t);Fc("RemoteStore","RemoteStore shutting down."),e.Fr.add(5),await yp(e),e.Lr.shutdown(),e.Br.set("Unknown")}(this.remoteStore)}}
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
 */class Rm{constructor(t){this.observer=t,this.muted=!1}next(t){this.observer.next&&this.jo(this.observer.next,t)}error(t){this.observer.error?this.jo(this.observer.error,t):console.error("Uncaught Error in snapshot listener:",t)}Wo(){this.muted=!0}jo(t,e){this.muted||setTimeout((()=>{this.muted||t(e)}),0)}}
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
 */class Am{constructor(t,e,n){this.credentials=t,this.asyncQueue=e,this.databaseInfo=n,this.user=Zf.UNAUTHENTICATED,this.clientId=Hc.u(),this.credentialListener=()=>Promise.resolve(),this.credentials.setChangeListener(e,(async t=>{Fc("FirestoreClient","Received user=",t.uid),await this.credentialListener(t),this.user=t}))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,credentials:this.credentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.credentialListener=t}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new Pc(Lc.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new yd;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.credentials.removeChangeListener(),t.resolve()}catch(e){const n=jp(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function Nm(t,e){t.asyncQueue.verifyOperationInProgress(),Fc("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener((async t=>{r.isEqual(t)||(await Mf(e.localStore,t),r=t)})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t.offlineComponents=e}async function Dm(t,e){t.asyncQueue.verifyOperationInProgress();const n=await async function(t){return t.offlineComponents||(Fc("FirestoreClient","Using default OfflineComponentProvider"),await Nm(t,new Sm)),t.offlineComponents}(t);Fc("FirestoreClient","Initializing OnlineComponentProvider");const r=await t.getConfiguration();await e.initialize(n,r),t.setCredentialChangeListener((t=>async function(t,e){const n=zc(t);n.asyncQueue.verifyOperationInProgress(),Fc("RemoteStore","RemoteStore received new credentials");const r=Ep(n);n.Fr.add(3),await yp(n),r&&n.Br.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Fr.delete(3),await gp(n)}(e.remoteStore,t))),t.onlineComponents=e}async function xm(t){return t.onlineComponents||(Fc("FirestoreClient","Using default OnlineComponentProvider"),await Dm(t,new Cm)),t.onlineComponents}async function Om(t){const e=await xm(t),n=e.eventManager;return n.onListen=am.bind(null,e.syncEngine),n.onUnlisten=cm.bind(null,e.syncEngine),n}class Lm{constructor(t,e,n,r,s,i,o,a){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=r,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.useFetchStreams=a}}class Pm{constructor(t,e){this.projectId=t,this.database=e||"(default)"}get isDefaultDatabase(){return"(default)"===this.database}isEqual(t){return t instanceof Pm&&t.projectId===this.projectId&&t.database===this.database}}
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
 */const Mm=new Map;
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
 */class Um{constructor(t,e){this.user=e,this.type="OAuth",this.authHeaders={},this.authHeaders.Authorization=`Bearer ${t}`}}class Fm{constructor(){this.changeListener=null}getToken(){return Promise.resolve(null)}invalidateToken(){}setChangeListener(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(Zf.UNAUTHENTICATED)))}removeChangeListener(){this.changeListener=null}}class Vm{constructor(t){this.currentUser=Zf.UNAUTHENTICATED,this.oc=new yd,this.cc=0,this.forceRefresh=!1,this.auth=null,this.asyncQueue=null,this.uc=()=>{this.cc++,this.currentUser=this.ac(),this.oc.resolve(),this.changeListener&&this.asyncQueue.enqueueRetryable((()=>this.changeListener(this.currentUser)))};const e=t=>{Fc("FirebaseCredentialsProvider","Auth detected"),this.auth=t,this.auth.addAuthTokenListener(this.uc)};t.onInit((t=>e(t))),setTimeout((()=>{if(!this.auth){const n=t.getImmediate({optional:!0});n?e(n):(Fc("FirebaseCredentialsProvider","Auth not yet detected"),this.oc.resolve())}}),0)}getToken(){const t=this.cc,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((e=>this.cc!==t?(Fc("FirebaseCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(jc("string"==typeof e.accessToken),new Um(e.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}setChangeListener(t,e){this.asyncQueue=t,this.asyncQueue.enqueueRetryable((async()=>{await this.oc.promise,await e(this.currentUser),this.changeListener=e}))}removeChangeListener(){this.auth&&this.auth.removeAuthTokenListener(this.uc),this.changeListener=()=>Promise.resolve()}ac(){const t=this.auth&&this.auth.getUid();return jc(null===t||"string"==typeof t),new Zf(t)}}class qm{constructor(t,e,n){this.hc=t,this.lc=e,this.fc=n,this.type="FirstParty",this.user=Zf.FIRST_PARTY}get authHeaders(){const t={"X-Goog-AuthUser":this.lc},e=this.hc.auth.getAuthHeaderValueForFirstParty([]);return e&&(t.Authorization=e),this.fc&&(t["X-Goog-Iam-Authorization-Token"]=this.fc),t}}class Bm{constructor(t,e,n){this.hc=t,this.lc=e,this.fc=n}getToken(){return Promise.resolve(new qm(this.hc,this.lc,this.fc))}setChangeListener(t,e){t.enqueueRetryable((()=>e(Zf.FIRST_PARTY)))}removeChangeListener(){}invalidateToken(){}}
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
 */function $m(t,e,n){if(!n)throw new Pc(Lc.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function jm(t){if(!gu.isDocumentKey(t))throw new Pc(Lc.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function zm(t){if(gu.isDocumentKey(t))throw new Pc(Lc.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Km(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const e=function(t){if(t.constructor){const e=/function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());if(e&&e.length>1)return e[1]}return null}(t);return e?`a custom ${e} object`:"an object"}}return"function"==typeof t?"a function":$c()}function Hm(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Pc(Lc.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Km(t);throw new Pc(Lc.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}
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
 */class Gm{constructor(t){var e;if(void 0===t.host){if(void 0!==t.ssl)throw new Pc(Lc.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=null===(e=t.ssl)||void 0===e||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,void 0===t.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new Pc(Lc.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.useFetchStreams=!!t.useFetchStreams,function(t,e,n,r){if(!0===e&&!0===r)throw new Pc(Lc.INVALID_ARGUMENT,"experimentalForceLongPolling and experimentalAutoDetectLongPolling cannot be used together.")}(0,t.experimentalForceLongPolling,0,t.experimentalAutoDetectLongPolling)}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}
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
 */class Wm{constructor(t,e){this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Gm({}),this._settingsFrozen=!1,t instanceof Pm?(this._databaseId=t,this._credentials=new Fm):(this._app=t,this._databaseId=function(t){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new Pc(Lc.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Pm(t.options.projectId)}(t),this._credentials=new Vm(e))}get app(){if(!this._app)throw new Pc(Lc.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new Pc(Lc.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Gm(t),void 0!==t.credentials&&(this._credentials=function(t){if(!t)return new Fm;switch(t.type){case"gapi":const e=t.client;return jc(!("object"!=typeof e||null===e||!e.auth||!e.auth.getAuthHeaderValueForFirstParty)),new Bm(e,t.sessionIndex||"0",t.iamToken||null);case"provider":return t.client;default:throw new Pc(Lc.INVALID_ARGUMENT,"makeCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=Mm.get(t);e&&(Fc("ComponentProvider","Removing Datastore"),Mm.delete(t),e.terminate())}(this),Promise.resolve()}}
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
 */class Qm{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ym(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Qm(this.firestore,t,this._key)}}class Xm{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Xm(this.firestore,t,this._query)}}class Ym extends Xm{constructor(t,e,n){super(t,e,th(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Qm(this.firestore,null,new gu(t))}withConverter(t){return new Ym(this.firestore,t,this._path)}}function Jm(t,e,...n){if(t=se(t),$m("collection","path",e),t instanceof Wm){const r=nu.fromString(e,...n);return zm(r),new Ym(t,null,r)}{if(!(t instanceof Qm||t instanceof Ym))throw new Pc(Lc.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=nu.fromString(t.path,...n).child(nu.fromString(e));return zm(r),new Ym(t.firestore,null,r)}}function Zm(t,e,...n){if(t=se(t),1===arguments.length&&(e=Hc.u()),$m("doc","path",e),t instanceof Wm){const r=nu.fromString(e,...n);return jm(r),new Qm(t,null,new gu(r))}{if(!(t instanceof Qm||t instanceof Ym))throw new Pc(Lc.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(nu.fromString(e,...n));return jm(r),new Qm(t.firestore,t instanceof Ym?t.converter:null,new gu(r))}}
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
 */class tg{constructor(){this.dc=Promise.resolve(),this.wc=[],this._c=!1,this.mc=[],this.gc=null,this.yc=!1,this.Ec=[],this.Zi=new up(this,"async_queue_retry"),this.Tc=()=>{const t=ap();t&&Fc("AsyncQueue","Visibility state changed to "+t.visibilityState),this.Zi.Gi()};const t=ap();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.Tc)}get isShuttingDown(){return this._c}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Ic(),this.Ac(t)}enterRestrictedMode(){if(!this._c){this._c=!0;const t=ap();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Tc)}}enqueue(t){return this.Ic(),this._c?new Promise((t=>{})):this.Ac(t)}enqueueRetryable(t){this.enqueueAndForget((()=>(this.wc.push(t),this.Rc())))}async Rc(){if(0!==this.wc.length){try{await this.wc[0](),this.wc.shift(),this.Zi.reset()}catch(t){if(!Td(t))throw t;Fc("AsyncQueue","Operation failed with retryable error: "+t)}this.wc.length>0&&this.Zi.ji((()=>this.Rc()))}}Ac(t){const e=this.dc.then((()=>(this.yc=!0,t().catch((t=>{throw this.gc=t,this.yc=!1,Vc("INTERNAL UNHANDLED ERROR: ",function(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}(t)),t})).then((t=>(this.yc=!1,t))))));return this.dc=e,e}enqueueAfterDelay(t,e,n){this.Ic(),this.Ec.indexOf(t)>-1&&(e=0);const r=$p.createAndSchedule(this,t,e,n,(t=>this.Pc(t)));return this.mc.push(r),r}Ic(){this.gc&&$c()}verifyOperationInProgress(){}async bc(){let t;do{t=this.dc,await t}while(t!==this.dc)}vc(t){for(const e of this.mc)if(e.timerId===t)return!0;return!1}Vc(t){return this.bc().then((()=>{this.mc.sort(((t,e)=>t.targetTimeMs-e.targetTimeMs));for(const e of this.mc)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.bc()}))}Sc(t){this.Ec.push(t)}Pc(t){const e=this.mc.indexOf(t);this.mc.splice(e,1)}}function eg(t){return function(t,e){if("object"!=typeof t||null===t)return!1;const n=t;for(const r of["next","error","complete"])if(r in n&&"function"==typeof n[r])return!0;return!1}(t)}class ng extends Wm{constructor(t,e){super(t,e),this.type="firestore",this._queue=new tg,this._persistenceKey="name"in t?t.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||ig(this),this._firestoreClient.terminate()}}function rg(t=Re()){return Ee(t,"firestore-exp").getImmediate()}function sg(t){return t._firestoreClient||ig(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function ig(t){var e;const n=t._freezeSettings(),r=(s=t._databaseId,i=(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",o=t._persistenceKey,new Lm(s,i,o,(a=n).host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams));var s,i,o,a;t._firestoreClient=new Am(t._credentials,t._queue,r)}function og(t,e){!function(t){if(t._initialized||t._terminated)throw new Pc(Lc.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")}
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
 */(t=Hm(t,ng));const n=sg(t),r=t._freezeSettings(),s=new Cm;return function(t,e,n){const r=new yd;return t.asyncQueue.enqueue((async()=>{try{await Nm(t,n),await Dm(t,e),r.resolve()}catch(i){if(!("FirebaseError"===(s=i).name?s.code===Lc.FAILED_PRECONDITION||s.code===Lc.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&s instanceof DOMException)||22===s.code||20===s.code||11===s.code))throw i;console.warn("Error enabling offline persistence. Falling back to persistence disabled: "+i),r.reject(i)}var s})).then((()=>r.promise))}(n,s,new km(s,r.cacheSizeBytes,null==e?void 0:e.forceOwnership))}class ag{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new Pc(Lc.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new su(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
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
 */class cg{constructor(t){this._byteString=t}static fromBase64String(t){try{return new cg(ou.fromBase64String(t))}catch(e){throw new Pc(Lc.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new cg(ou.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
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
 */class ug{constructor(t){this._methodName=t}}
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
 */class hg{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new Pc(Lc.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new Pc(Lc.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return Gc(this._lat,t._lat)||Gc(this._long,t._long)}}
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
 */const lg=/^__.*__$/;class dg{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new Uh(t,this.data,this.fieldMask,e,this.fieldTransforms):new Mh(t,this.data,e,this.fieldTransforms)}}function fg(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw $c()}}class pg{constructor(t,e,n,r,s,i){this.settings=t,this.databaseId=e,this.R=n,this.ignoreUndefinedProperties=r,void 0===s&&this.Dc(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get Cc(){return this.settings.Cc}Nc(t){return new pg(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.R,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}xc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.Nc({path:n,kc:!1});return r.$c(t),r}Oc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.Nc({path:n,kc:!1});return r.Dc(),r}Fc(t){return this.Nc({path:void 0,kc:!0})}Mc(t){return Sg(t,this.settings.methodName,this.settings.Lc||!1,this.path,this.settings.Bc)}contains(t){return void 0!==this.fieldMask.find((e=>t.isPrefixOf(e)))||void 0!==this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))}Dc(){if(this.path)for(let t=0;t<this.path.length;t++)this.$c(this.path.get(t))}$c(t){if(0===t.length)throw this.Mc("Document fields must not be empty");if(fg(this.Cc)&&lg.test(t))throw this.Mc('Document fields cannot begin and end with "__"')}}class mg{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.R=n||cp(t)}Uc(t,e,n,r=!1){return new pg({Cc:t,methodName:e,Bc:n,path:su.emptyPath(),kc:!1,Lc:r},this.databaseId,this.R,this.ignoreUndefinedProperties)}}function gg(t){const e=t._freezeSettings(),n=cp(t._databaseId);return new mg(t._databaseId,!!e.ignoreUndefinedProperties,n)}function yg(t,e,n,r,s,i={}){const o=t.Uc(i.merge||i.mergeFields?2:0,e,n,s);Ig("Data must be an object, but it was:",o,r);const a=wg(r,o);let c,u;if(i.merge)c=new iu(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const t=[];for(const r of i.mergeFields){const s=_g(e,r,n);if(!o.contains(s))throw new Pc(Lc.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);kg(t,s)||t.push(s)}c=new iu(t),u=o.fieldTransforms.filter((t=>c.covers(t.field)))}else c=null,u=o.fieldTransforms;return new dg(new Nu(a),c,u)}function vg(t,e){if(bg(t=se(t)))return Ig("Unsupported field value:",e,t),wg(t,e);if(t instanceof ug)return function(t,e){if(!fg(e.Cc))throw e.Mc(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.Mc(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.kc&&4!==e.Cc)throw e.Mc("Nested arrays are not supported");return function(t,e){const n=[];let r=0;for(const s of t){let t=vg(s,e.Fc(r));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),r++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=se(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return fh(e.R,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=Xc.fromDate(t);return{timestampValue:wl(e.R,n)}}if(t instanceof Xc){const n=new Xc(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:wl(e.R,n)}}if(t instanceof hg)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof cg)return{bytesValue:bl(e.R,t._byteString)};if(t instanceof Qm){const n=e.databaseId,r=t.firestore._databaseId;if(!r.isEqual(n))throw e.Mc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Tl(t.firestore._databaseId||e.databaseId,t._key.path)}}throw e.Mc(`Unsupported field value: ${Km(t)}`)}(t,e)}function wg(t,e){const n={};return tu(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Zc(t,((t,r)=>{const s=vg(r,e.xc(t));null!=s&&(n[t]=s)})),{mapValue:{fields:n}}}function bg(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof Xc||t instanceof hg||t instanceof cg||t instanceof Qm||t instanceof ug)}function Ig(t,e,n){if(!bg(n)||("object"!=typeof(r=n)||null===r||Object.getPrototypeOf(r)!==Object.prototype&&null!==Object.getPrototypeOf(r))){const r=Km(n);throw"an object"===r?e.Mc(t+" a custom object"):e.Mc(t+" "+r)}var r}function _g(t,e,n){if((e=se(e))instanceof ag)return e._internalPath;if("string"==typeof e)return Eg(t,e);throw Sg("Field path arguments must be of type string or FieldPath.",t,!1,void 0,n)}const Tg=new RegExp("[~\\*/\\[\\]]");function Eg(t,e,n){if(e.search(Tg)>=0)throw Sg(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new ag(...e.split("."))._internalPath}catch(r){throw Sg(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Sg(t,e,n,r,s){const i=r&&!r.isEmpty(),o=void 0!==s;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new Pc(Lc.INVALID_ARGUMENT,a+t+c)}function kg(t,e){return t.some((t=>t.isEqual(e)))}
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
 */class Cg{constructor(t,e,n,r,s){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Qm(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new Rg(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Ag("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class Rg extends Cg{data(){return super.data()}}function Ag(t,e){return"string"==typeof e?Eg(t,e):e instanceof ag?e._internalPath:e._delegate._internalPath}
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
 */class Ng{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Dg extends Cg{constructor(t,e,n,r,s,i){super(t,e,n,r,i),this._firestore=t,this._firestoreImpl=t,this.metadata=s}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new xg(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Ag("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class xg extends Dg{data(t={}){return super.data(t)}}class Og{constructor(t,e,n,r){this._firestore=t,this._userDataWriter=e,this._snapshot=r,this.metadata=new Ng(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(t,e){this._snapshot.docs.forEach((n=>{t.call(e,new xg(this._firestore,this._userDataWriter,n.key,n,new Ng(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new Pc(Lc.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(t,e){if(t._snapshot.oldDocs.isEmpty()){let e=0;return t._snapshot.docChanges.map((n=>({type:"added",doc:new xg(t._firestore,t._userDataWriter,n.doc.key,n.doc,new Ng(t._snapshot.mutatedKeys.has(n.doc.key),t._snapshot.fromCache),t.query.converter),oldIndex:-1,newIndex:e++})))}{let n=t._snapshot.oldDocs;return t._snapshot.docChanges.filter((t=>e||3!==t.type)).map((e=>{const r=new xg(t._firestore,t._userDataWriter,e.doc.key,e.doc,new Ng(t._snapshot.mutatedKeys.has(e.doc.key),t._snapshot.fromCache),t.query.converter);let s=-1,i=-1;return 0!==e.type&&(s=n.indexOf(e.doc.key),n=n.delete(e.doc.key)),1!==e.type&&(n=n.add(e.doc),i=n.indexOf(e.doc.key)),{type:Lg(e.type),doc:r,oldIndex:s,newIndex:i}}))}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function Lg(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return $c()}}
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
function Pg(t){t=Hm(t,Qm);const e=Hm(t.firestore,ng);return function(t,e,n={}){const r=new yd;return t.asyncQueue.enqueueAndForget((async()=>function(t,e,n,r,s){const i=new Rm({next:i=>{e.enqueueAndForget((()=>Xp(t,o)));const a=i.docs.has(n);!a&&i.fromCache?s.reject(new Pc(Lc.UNAVAILABLE,"Failed to get document because the client is offline.")):a&&i.fromCache&&r&&"server"===r.source?s.reject(new Pc(Lc.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(i)},error:t=>s.reject(t)}),o=new tm(th(n.path),i,{includeMetadataChanges:!0,so:!0});return Qp(t,o)}(await Om(t),t.asyncQueue,e,n,r))),r.promise}(sg(e),t._key).then((n=>Vg(e,t,n)))}class Mg extends
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
class{convertValue(t,e="none"){switch(yu(t)){case 0:return null;case 1:return t.booleanValue;case 2:return uu(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(hu(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 10:return this.convertObject(t.mapValue,e);default:throw $c()}}convertObject(t,e){const n={};return Zc(t.fields,((t,r)=>{n[t]=this.convertValue(r,e)})),n}convertGeoPoint(t){return new hg(uu(t.latitude),uu(t.longitude))}convertArray(t,e){return(t.values||[]).map((t=>this.convertValue(t,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=du(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(fu(t));default:return null}}convertTimestamp(t){const e=cu(t);return new Xc(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=nu.fromString(t);jc(Gl(n));const r=new Pm(n.get(1),n.get(3)),s=new gu(n.popFirst(5));return r.isEqual(e)||Vc(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),s}}
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
 */{constructor(t){super(),this.firestore=t}convertBytes(t){return new cg(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Qm(this.firestore,null,e)}}function Ug(t,e,n){t=Hm(t,Qm);const r=Hm(t.firestore,ng),s=function(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}(t.converter,e,n);return function(t,e){return function(t,e){const n=new yd;return t.asyncQueue.enqueueAndForget((async()=>async function(e,n,r){const s=Em(e);try{const t=await function(t,e){const n=zc(t),r=Xc.now(),s=e.reduce(((t,e)=>t.add(e.key)),sl());let i;return n.persistence.runTransaction("Locally write mutations","readwrite",(t=>n.Mn.pn(t,s).next((s=>{i=s;const o=[];for(const t of e){const e=Oh(t,i.get(t.key));null!=e&&o.push(new Uh(t.key,e,Du(e.value.mapValue),Rh.exists(!0)))}return n._n.addMutationBatch(t,r,o,e)})))).then((t=>(t.applyToLocalDocumentSet(i),{batchId:t.batchId,changes:i})))}(s.localStore,n);s.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let r=t.xo[t.currentUser.toKey()];r||(r=new Gh(Gc)),r=r.insert(e,n),t.xo[t.currentUser.toKey()]=r}(s,t.batchId,r),await Im(s,t.changes),await Dp(s.remoteStore)}catch(t){const n=jp(t,"Failed to persist write");r.reject(n)}}(await function(t){return xm(t).then((t=>t.syncEngine))}(t),e,n))),n.promise}(sg(t),e)}(r,[yg(gg(r),"setDoc",t._key,s,null!==t.converter,n).toMutation(t._key,Rh.none())])}function Fg(t,...e){var n,r,s;t=se(t);let i={includeMetadataChanges:!1},o=0;"object"!=typeof e[o]||eg(e[o])||(i=e[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(eg(e[o])){const t=e[o];e[o]=null===(n=t.next)||void 0===n?void 0:n.bind(t),e[o+1]=null===(r=t.error)||void 0===r?void 0:r.bind(t),e[o+2]=null===(s=t.complete)||void 0===s?void 0:s.bind(t)}let c,u,h;if(t instanceof Qm)u=Hm(t.firestore,ng),h=th(t._key.path),c={next:n=>{e[o]&&e[o](Vg(u,t,n))},error:e[o+1],complete:e[o+2]};else{const n=Hm(t,Xm);u=Hm(n.firestore,ng),h=n._query;const r=new Mg(u);c={next:t=>{e[o]&&e[o](new Og(u,r,n,t))},error:e[o+1],complete:e[o+2]},function(t){if(nh(t)&&0===t.explicitOrderBy.length)throw new Pc(Lc.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}(t._query)}return function(t,e,n,r){const s=new Rm(r),i=new tm(e,s,n);return t.asyncQueue.enqueueAndForget((async()=>Qp(await Om(t),i))),()=>{s.Wo(),t.asyncQueue.enqueueAndForget((async()=>Xp(await Om(t),i)))}}(sg(u),h,a,c)}function Vg(t,e,n){const r=n.docs.get(e._key),s=new Mg(t);return new Dg(t,s,e._key,r,new Ng(n.hasPendingWrites,n.fromCache),e.converter)}function qg(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}function Bg(t){return"[object Date]"===Object.prototype.toString.call(t)}function $g(t,e,n,r){if("number"==typeof n||Bg(n)){const s=r-n,i=(n-e)/(t.dt||1/60),o=(i+(t.opts.stiffness*s-t.opts.damping*i)*t.inv_mass)*t.dt;return Math.abs(o)<t.opts.precision&&Math.abs(s)<t.opts.precision?r:(t.settled=!1,Bg(n)?new Date(n.getTime()+o):n+o)}if(Array.isArray(n))return n.map(((s,i)=>$g(t,e[i],n[i],r[i])));if("object"==typeof n){const s={};for(const i in n)s[i]=$g(t,e[i],n[i],r[i]);return s}throw new Error(`Cannot spring ${typeof n} values`)}function jg(t,e={}){const n=Mt(t),{stiffness:r=.15,damping:s=.8,precision:i=.01}=e;let o,a,c,u=t,h=t,l=1,d=0,f=!1;function p(e,r={}){h=e;const s=c={};if(null==t||r.hard||m.stiffness>=1&&m.damping>=1)return f=!0,o=g(),u=e,n.set(t=h),Promise.resolve();if(r.soft){const t=!0===r.soft?.5:+r.soft;d=1/(60*t),l=0}return a||(o=g(),f=!1,a=b((e=>{if(f)return f=!1,a=null,!1;l=Math.min(l+d,1);const r={inv_mass:l,opts:m,settled:!0,dt:60*(e-o)/1e3},s=$g(r,u,t,h);return o=e,u=t,n.set(t=s),r.settled&&(a=null),!r.settled}))),new Promise((t=>{a.promise.then((()=>{s===c&&t()}))}))}const m={set:p,update:(e,n)=>p(e(h,t),n),subscribe:n.subscribe,stiffness:r,damping:s,precision:i};return m}function zg(t){let e,n,r,s;function i(t,e){return"string"==typeof t[8][4]?Hg:Kg}let o=i(t),a=o(t);return{c(){e=C("svg"),n=C("g"),r=C("g"),a.c(),this.h()},l(t){e=U(t,"svg",{id:!0,class:!0,style:!0,viewBox:!0,"aria-hidden":!0,role:!0,xmlns:!0},1);var s=P(e);n=U(s,"g",{transform:!0},1);var i=P(n);r=U(i,"g",{transform:!0},1);var o=P(r);a.l(o),o.forEach(S),i.forEach(S),s.forEach(S),this.h()},h(){L(r,"transform",t[10]),L(n,"transform","translate(256 256)"),L(e,"id",t[1]),L(e,"class",t[0]),L(e,"style",t[9]),L(e,"viewBox",s=`0 0 ${t[8][0]} ${t[8][1]}`),L(e,"aria-hidden","true"),L(e,"role","img"),L(e,"xmlns","http://www.w3.org/2000/svg")},m(t,s){E(t,e,s),T(e,n),T(n,r),a.m(r,null)},p(t,n){o===(o=i(t))&&a?a.p(t,n):(a.d(1),a=o(t),a&&(a.c(),a.m(r,null))),1024&n&&L(r,"transform",t[10]),2&n&&L(e,"id",t[1]),1&n&&L(e,"class",t[0]),512&n&&L(e,"style",t[9]),256&n&&s!==(s=`0 0 ${t[8][0]} ${t[8][1]}`)&&L(e,"viewBox",s)},d(t){t&&S(e),a.d()}}}function Kg(t){let e,n,r,s,i,o,a,c;return{c(){e=C("path"),i=C("path"),this.h()},l(t){e=U(t,"path",{d:!0,fill:!0,"fill-opacity":!0,transform:!0},1),P(e).forEach(S),i=U(t,"path",{d:!0,fill:!0,"fill-opacity":!0,transform:!0},1),P(i).forEach(S),this.h()},h(){L(e,"d",n=t[8][4][0]),L(e,"fill",r=t[4]||t[2]||"currentColor"),L(e,"fill-opacity",s=0!=t[7]?t[5]:t[6]),L(e,"transform","translate(-256 -256)"),L(i,"d",o=t[8][4][1]),L(i,"fill",a=t[3]||t[2]||"currentColor"),L(i,"fill-opacity",c=0!=t[7]?t[6]:t[5]),L(i,"transform","translate(-256 -256)")},m(t,n){E(t,e,n),E(t,i,n)},p(t,u){256&u&&n!==(n=t[8][4][0])&&L(e,"d",n),20&u&&r!==(r=t[4]||t[2]||"currentColor")&&L(e,"fill",r),224&u&&s!==(s=0!=t[7]?t[5]:t[6])&&L(e,"fill-opacity",s),256&u&&o!==(o=t[8][4][1])&&L(i,"d",o),12&u&&a!==(a=t[3]||t[2]||"currentColor")&&L(i,"fill",a),224&u&&c!==(c=0!=t[7]?t[6]:t[5])&&L(i,"fill-opacity",c)},d(t){t&&S(e),t&&S(i)}}}function Hg(t){let e,n,r;return{c(){e=C("path"),this.h()},l(t){e=U(t,"path",{d:!0,fill:!0,transform:!0},1),P(e).forEach(S),this.h()},h(){L(e,"d",n=t[8][4]),L(e,"fill",r=t[2]||t[3]||"currentColor"),L(e,"transform","translate(-256 -256)")},m(t,n){E(t,e,n)},p(t,s){256&s&&n!==(n=t[8][4])&&L(e,"d",n),12&s&&r!==(r=t[2]||t[3]||"currentColor")&&L(e,"fill",r)},d(t){t&&S(e)}}}function Gg(e){let n,r=e[8][4]&&zg(e);return{c(){r&&r.c(),n=N()},l(t){r&&r.l(t),n=N()},m(t,e){r&&r.m(t,e),E(t,n,e)},p(t,[e]){t[8][4]?r?r.p(t,e):(r=zg(t),r.c(),r.m(n.parentNode,n)):r&&(r.d(1),r=null)},i:t,o:t,d(t){r&&r.d(t),t&&S(n)}}}function Wg(t,e,n){let r,s,i,{class:o=""}=e,{id:a=""}=e,{style:c=""}=e,{icon:u}=e,{fw:h=!1}=e,{flip:l=!1}=e,{pull:d=""}=e,{rotate:f=""}=e,{size:p=""}=e,{color:m=""}=e,{primaryColor:g=""}=e,{secondaryColor:y=""}=e,{primaryOpacity:v=1}=e,{secondaryOpacity:w=.4}=e,{swapOpacity:b=!1}=e;return t.$$set=t=>{"class"in t&&n(0,o=t.class),"id"in t&&n(1,a=t.id),"style"in t&&n(11,c=t.style),"icon"in t&&n(12,u=t.icon),"fw"in t&&n(13,h=t.fw),"flip"in t&&n(14,l=t.flip),"pull"in t&&n(15,d=t.pull),"rotate"in t&&n(16,f=t.rotate),"size"in t&&n(17,p=t.size),"color"in t&&n(2,m=t.color),"primaryColor"in t&&n(3,g=t.primaryColor),"secondaryColor"in t&&n(4,y=t.secondaryColor),"primaryOpacity"in t&&n(5,v=t.primaryOpacity),"secondaryOpacity"in t&&n(6,w=t.secondaryOpacity),"swapOpacity"in t&&n(7,b=t.swapOpacity)},t.$$.update=()=>{if(4096&t.$$.dirty&&n(8,r=u&&u.icon||[0,0,"",[],""]),174080&t.$$.dirty){let t,e;const r="1em";let i,o,a,u="-.125em";const l="visible";h&&(a="center",e="1.25em"),d&&(t=d),p&&("lg"==p?(o="1.33333em",i=".75em",u="-.225em"):o="xs"==p?".75em":"sm"==p?".875em":p.replace("x","em"));const f={float:t,width:e,height:r,"line-height":i,"font-size":o,"text-align":a,"vertical-align":u,overflow:l};let m="";for(const n in f)f[n]&&(m+=`${n}:${f[n]};`);n(9,s=m+c)}if(81920&t.$$.dirty){let t="";if(l){let e=1,n=1;"horizontal"==l?e=-1:"vertical"==l?n=-1:e=n=-1,t+=` scale(${e} ${n})`}f&&(t+=` rotate(${f} 0 0)`),n(10,i=t)}},[o,a,m,g,y,v,w,b,r,s,i,c,u,h,l,d,f,p]}xc="9.0.0-beta.6",Te(new ie("firestore-exp",((t,{options:e})=>{const n=t.getProvider("app-exp").getImmediate(),r=new ng(n,t.getProvider("auth-internal"));return e=Object.assign({useFetchStreams:!1},e),r._setSettings(e),r}),"PUBLIC")),Ae("@firebase/firestore","0.0.900-exp.f43d0c698",undefined);class Qg extends Lt{constructor(t){super(),Ot(this,t,Wg,Gg,a,{class:0,id:1,style:11,icon:12,fw:13,flip:14,pull:15,rotate:16,size:17,color:2,primaryColor:3,secondaryColor:4,primaryOpacity:5,secondaryOpacity:6,swapOpacity:7})}}
/*!
 * Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */var Xg={prefix:"fas",iconName:"user-circle",icon:[496,512,[],"f2bd","M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"]};let Yg=(t=21)=>{let e="",n=crypto.getRandomValues(new Uint8Array(t));for(;t--;){let r=63&n[t];e+=r<36?r.toString(36):r<62?(r-26).toString(36).toUpperCase():r<63?"_":"-"}return e};function Jg(t,{delay:e=0,speed:n,duration:r,easing:s=qg}={}){const i=t.getTotalLength();return void 0===r?r=void 0===n?800:i/n:"function"==typeof r&&(r=r(i)),{delay:e,duration:r,easing:s,css:(t,e)=>`stroke-dasharray: ${t*i} ${e*i}`}}
/*!
 * Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */var Zg={prefix:"fab",iconName:"facebook",icon:[512,512,[],"f09a","M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"]};export{Pn as $,J as A,n as B,Mt as C,nt as D,$ as E,T as F,C as G,t as H,h as I,l as J,f as K,Fg as L,p as M,Ce as N,rg as O,Xr as P,gs as Q,og as R,Lt as S,Zm as T,Jm as U,$r as V,Wr as W,u as X,Pg as Y,Ug as Z,Mn as _,P as a,Br as a0,Gr as a1,zn as a2,B as a3,D as a4,i as a5,jg as a6,z as a7,x as a8,Yg as a9,tt as aa,O as ab,ut as ac,Et as ad,Jg as ae,Qg as af,Zg as ag,ht as ah,st as ai,Ct as aj,Xg as ak,L as b,U as c,S as d,k as e,E as f,F as g,q as h,Ot as i,Rt as j,A as k,N as l,At as m,V as n,Nt as o,St as p,kt as q,wt as r,a as s,R as t,_t as u,Dt as v,bt as w,It as x,et as y,Z as z};
