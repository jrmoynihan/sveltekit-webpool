function e(){return window.innerWidth}const t=(e,t)=>{try{let n=e;n+="w*";return new RegExp(n).test(t)}catch(n){console.error("An error occurred in functions:{matchPath}")}},n=async e=>{const t=document.getElementById(`modal-${e}`);let n=!0;window.HTMLDialogElement||(document.body.classList.add("no-dialog"),n=!1),n?t.close():t.removeAttribute("open")};export{e as g,n as h,t as m};