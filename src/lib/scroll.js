import Lenis from "lenis";

/*
  One shared Lenis instance for the public site.
  - Skipped entirely for reduced motion (native scrolling stays) and on the admin screens.
  - Lenis scrolls the real window, so ordinary scroll listeners (navbar direction, parallax) keep working.
  - The site routes with #/hash links, so Lenis' own anchor handling stays off; route changes call scrollToTop().
*/
let lenis=null,raf=0;
const reduced=()=>matchMedia("(prefers-reduced-motion:reduce)").matches;

export function startSmoothScroll(){
  if(lenis||reduced())return;
  lenis=new Lenis({duration:1.05,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:true,syncTouch:false,anchors:false});
  const loop=t=>{lenis&&lenis.raf(t);raf=requestAnimationFrame(loop)};
  raf=requestAnimationFrame(loop);
}
export function stopSmoothScroll(){
  cancelAnimationFrame(raf);raf=0;
  if(lenis){lenis.destroy();lenis=null}
}
/* pause/resume while a modal owns the screen */
export const lockScroll=()=>lenis&&lenis.stop();
export const unlockScroll=()=>lenis&&lenis.start();
export function scrollToTop(){lenis?lenis.scrollTo(0,{immediate:true,force:true}):window.scrollTo(0,0)}
export function scrollToY(y){lenis?lenis.scrollTo(y,{duration:1.1}):window.scrollTo({top:y,behavior:reduced()?"auto":"smooth"})}
