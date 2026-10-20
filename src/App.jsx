import React,{useState,useEffect,useMemo,createElement as h} from "react";
import {MusicPlayer} from "./components/MusicPlayer.jsx";
import {Home} from "./pages/Home.jsx";
import {About,Team,Programs,Program,Corporate,Events,EventPage,Register,Blog,Post,Contact,NF} from "./pages/PublicPages.jsx";
import {Public} from "./layouts/PublicLayout.jsx";
import {Privacy,Security} from "./pages/Legal.jsx";
import {Admin} from "./pages/Admin.jsx";
import {setToast} from "./data/store.js";
import {startSmoothScroll,stopSmoothScroll,scrollToTop} from "./lib/scroll.js";

export function App(){const[path,sp]=useState(location.hash.slice(1)||"/"),[t,st]=useState(null);
useEffect(()=>{const f=()=>{sp(location.hash.slice(1)||"/");scrollToTop()};addEventListener("hashchange",f);setToast(m=>{st(m);setTimeout(()=>st(null),2600)});return()=>removeEventListener("hashchange",f)},[]);
useEffect(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&(e.target.classList.add("in"),io.unobserve(e.target))),{threshold:.1});document.querySelectorAll(".rv,.img-rv").forEach(n=>io.observe(n));return()=>io.disconnect()},[path]);
const[,a,b,c]=path.split("/"),admin=path.startsWith("/admin");
/* smooth scrolling on the public site only; admin keeps native scrolling */
useEffect(()=>{if(admin)return;startSmoothScroll();return stopSmoothScroll},[admin]);let pg;
if(path.startsWith("/admin"))pg=h(Admin,{path});else{const m={"":h(Home),about:h(About),team:h(Team),programs:b?h(Program,{s:b}):h(Programs),corporate:h(Corporate),events:b?h(EventPage,{id:b}):h(Events),register:h(Register,{id:b,sub:c,key:b}),blog:b?h(Post,{id:b}):h(Blog),contact:h(Contact),privacy:h(Privacy),security:h(Security)};pg=h(Public,{path},m[a]||h(NF))}
return h("div",null,pg,!path.startsWith("/admin")&&h(MusicPlayer),t&&h("div",{className:"toast",role:"status"},t))}
