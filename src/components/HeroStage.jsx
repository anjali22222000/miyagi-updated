import React,{useRef,useEffect,useState,createElement as h} from "react";
import {asset} from "./Brand.jsx";

/*
  Hero and page-header background (same video): the supplied Miyagi speaker video (public/assets/miyagi-hero.*, re-encoded from the
  client's file: muted, ~0.6 MB, WebM + MP4). The poster frame is always painted first, so the hero never
  shows an empty box. The video is only mounted when motion is allowed and data-saver is off, starts
  muted/inline (required for autoplay), pauses when scrolled out of view and quietly stays on the poster
  if the browser refuses to play or the file fails to load.
*/
export function HeroVideo({cls=""}){
 const box=useRef(),vid=useRef(),[on,setOn]=useState(false),[ready,setReady]=useState(false);
 useEffect(()=>{
  const mq=matchMedia("(prefers-reduced-motion:no-preference)"),sd=navigator.connection&&navigator.connection.saveData;
  const f=()=>setOn(mq.matches&&!sd);f();mq.addEventListener("change",f);return()=>mq.removeEventListener("change",f)},[]);
 useEffect(()=>{const v=vid.current,el=box.current;if(!on||!v||!el)return;
  const play=()=>{const p=v.play();p&&p.catch(()=>setReady(false))};
  const io=new IntersectionObserver(([e])=>{if(e.isIntersecting)play();else v.pause()},{threshold:.15});io.observe(el);
  return()=>io.disconnect()},[on]);
 return h("div",{ref:box,className:"hx-video "+cls,"aria-hidden":true,style:{backgroundImage:"url("+asset("miyagi-hero-poster.jpg")+")"}},
  on&&h("video",{ref:vid,className:ready?"ready":"",muted:true,defaultMuted:true,loop:true,autoPlay:true,playsInline:true,preload:"metadata",poster:asset("miyagi-hero-poster.jpg"),tabIndex:-1,
   onPlaying:()=>setReady(true),onError:()=>setReady(false),disablePictureInPicture:true,disableRemotePlayback:true},
   h("source",{src:asset("miyagi-hero.webm"),type:"video/webm"}),h("source",{src:asset("miyagi-hero.mp4"),type:"video/mp4"})))}

/*
  Inner-page header background: the client's supplied animated loop (public/assets/miyagi-background-loop.html),
  used unmodified in a non-interactive iframe. Its own URL options pick one floating logo and a light dim so
  header text stays readable. The file honours prefers-reduced-motion itself.
*/
export function LoopBackground(){
 const u=asset("miyagi-background-loop.html"),p={tabIndex:-1,"aria-hidden":true,title:"",loading:"lazy",className:"phead-loop"};
 /* the single-file preview build supplies assets as data: URIs, which are loaded through srcdoc instead */
 if(u.startsWith("data:")){let d="";try{d=decodeURIComponent(escape(atob(u.split(",")[1])))}catch{}return h("iframe",{...p,srcDoc:d.replace("location.search",'"logo=br&dim=0.15"')})}
 return h("iframe",{...p,src:u+"?logo=br&dim=0.15"})}
