import {useState,useEffect} from "react";

/*
  In-app navigation memory for hash routes.
  `stack` holds the internal paths visited in this tab. goBack() uses real browser history when the
  previous entry is another page of this site, otherwise it navigates to a safe fallback route, so a
  user who lands on a deep link (or refreshes) is never sent to an external site or a blank page.
*/
const cur=()=>location.hash.slice(1)||"/";
let stack=[cur()];
addEventListener("hashchange",()=>{const p=cur();if(stack.length>1&&stack[stack.length-2]===p)stack.pop();else if(stack[stack.length-1]!==p)stack.push(p)});

export const canGoBack=()=>stack.length>1;
export function goBack(fallback){
  if(canGoBack())history.back();
  else location.hash="#"+fallback;
}

/* Hide-on-scroll-down, show-on-scroll-up. One implementation shared by the public layout. */
export function useScrollDirection({threshold=8,topOffset=80}={}){
  const[hidden,setHidden]=useState(false);
  useEffect(()=>{
    let last=scrollY,tick=0;
    const run=()=>{tick=0;const y=Math.max(0,scrollY);
      if(y<topOffset){setHidden(false);last=y;return}
      const d=y-last;if(Math.abs(d)<threshold)return;
      setHidden(d>0);last=y};
    const on=()=>{tick||(tick=requestAnimationFrame(run))};
    addEventListener("scroll",on,{passive:true});
    return()=>{removeEventListener("scroll",on);cancelAnimationFrame(tick)}},[threshold,topOffset]);
  return[hidden,setHidden];
}
