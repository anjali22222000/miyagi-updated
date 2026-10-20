import React,{useState,useEffect,useRef,createElement as h} from "react";
import {Logo} from "../components/Brand.jsx";
import {A} from "../components/ui.jsx";
import {Foot} from "../components/Footer.jsx";
import {useScrollDirection} from "../lib/nav.js";

export const NAV=[["/","Home"],["/about","About"],["/team","Team"],["/programs","Programs"],["/corporate","Corporate"],["/events","Events"],["/blog","Blog"],["/contact","Contact"]];
/* the booking flow belongs to Events, so that item stays highlighted there */
const isOn=(t,path)=>t==="/"?path==="/":path.startsWith(t)||(t==="/events"&&path.startsWith("/register"));

export function Public({path,children}){
 const[o,so]=useState(false),[hidden]=useScrollDirection(),ref=useRef();
 useEffect(()=>so(false),[path]);
 useEffect(()=>{if(!o)return;const k=e=>e.key==="Escape"&&so(false);addEventListener("keydown",k);return()=>removeEventListener("keydown",k)},[o]);
 /* never hide the bar while the mobile menu is open or a control inside it has keyboard focus */
 const hide=hidden&&!o&&!(ref.current&&ref.current.contains(document.activeElement));
 return h("div",null,
  h("nav",{ref,className:"top"+(hide?" away":""),"aria-label":"Main"},h("div",{className:"wrap"},
   A("/",{className:"logo","aria-label":"Miyagi home"},h(Logo,{height:46})),
   h("button",{type:"button",className:"burger","aria-expanded":o,"aria-controls":"nav-links",onClick:()=>so(!o)},o?"Close":"Menu"),
   h("div",{id:"nav-links",className:"links"+(o?" open":"")},
    NAV.map(([t,l])=>A(t,{key:t,className:isOn(t,path)?"on":"","aria-current":isOn(t,path)?"page":undefined},l)),
    A("/events",{className:"btn sm"},"Book a Seat")))),
  h("main",{className:"page",key:path},children),
  h(Foot))}
