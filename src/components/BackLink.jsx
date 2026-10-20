import React,{createElement as h} from "react";
import {goBack} from "../lib/nav.js";

/*
  "← Back" control for nested pages. Renders a real link to the fallback route (so it works without JS,
  opens in a new tab, and is crawlable); a plain click goes back in history when the previous entry is
  inside the site. `strict` always goes to `to` (used on the booking confirmation, where history.back()
  would land on the finished payment step).
*/
export function BackLink({to,label="Back",strict=false,className=""}){
  const onClick=e=>{if(strict||e.metaKey||e.ctrlKey||e.shiftKey||e.button!==0)return;e.preventDefault();goBack(to)};
  return h("div",{className:"wrap backbar "+className},h("a",{href:"#"+to,className:"back-btn",onClick},h("span",{"aria-hidden":true},"←"),h("span",null,label)));
}
