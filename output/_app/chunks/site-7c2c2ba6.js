import{C as a,a8 as e,a9 as s,aa as t,ab as n,a6 as i,ac as r,ad as o,ae as c,af as l,ag as u,ah as f}from"./vendor-dccf6f57.js";import{f as w,a as d,T as y,P as p}from"./store-0b6884e5.js";import{r as g}from"./singletons-bb9012b7.js";const v=async function(a,e){return g.goto(a,e,[])};const m=a(w.currentUser),b=a();let h;const x=async a=>{try{return await l(w,a)}catch(e){alert(e)}},k=async a=>{try{return await u(w,a)}catch(e){alert(e)}},T=async(a,r)=>{const l=await(async a=>{let e;switch(a){case"Google":e=new o;break;case"Facebook":e=new c;break;default:e=new o}return e})(a);w.currentUser&&(r?await e(w.currentUser,l):await s(w.currentUser,l));const u=await(async(a,e)=>e?await x(a):await k(a))(l,r);if(u){m.set(u.user);const a=t(m);h=await n(i(d,a.uid)),h.exists()?console.info("User "+(h.exists()?"already exists":"does not exist!")):U()}},U=async()=>{const a=t(m),e=i(d,a.uid);await r(e,{name:a.displayName,email:a.email,admin:!1,college:!1,pick6:!1,playoffs:!1,survivor:!1,weekly:!1}),console.info(`New user doc for ${a.displayName} (${a.uid}) added!`)},q=async()=>{b.set(void 0),f(w),v("/")};w.onAuthStateChanged((()=>{m.set(w.currentUser)}));const P=[new p({navigationText:"Home",path:"/"}),new p({navigationText:"Weekly",path:"/weekly",requiresWeekly:!0}),new p({navigationText:"Survivor",path:"/survivor",requiresSurvivor:!0}),new p({navigationText:"Pick6",path:"/pick6",requiresPick6:!0}),new p({navigationText:"Playoffs",path:"/playoffs",requiresPlayoffs:!0}),new p({navigationText:"College",path:"/college",requiresCollege:!0}),new p({navigationText:"Admin",path:"/admin",requiresAdmin:!0})],C=[new y("Bills","BUF","Buffalo","AFC","East","/_app/assets/buffalo-bills-football-logo.c3fce251.webp")];export{P,q as a,C as b,m as c,T as s,b as u};
