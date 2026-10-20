import React,{createElement as h} from "react";
import {Head} from "../components/ui.jsx";
import {BackLink} from "../components/BackLink.jsx";

/* Plain-language policies that describe what this site actually does today (front-end only, data kept in the visitor's browser).
   Replace with counsel-reviewed text and real company details before a live launch. */
const UPDATED="21 October 2026";
const PRIVACY=[
["Who we are","Miyagi — The Communication Champ is a speaker and events brand based in Gurugram, Haryana. Questions about this policy: hello@miyagi.demo."],
["What we collect","Only what you type into our forms: name, email address, phone number, the number of tickets, and any message you write in an enquiry, contact or newsletter form. We do not ask for card or bank details."],
["Where it is stored","In this version of the website, registrations, enquiries and your booking draft are kept in your own browser (local and session storage) on your device. They are not sent to a server or sold to anyone. Clearing your browser data removes them."],
["Payments","Checkout on this website is a demonstration. No real payment is taken and no payment details are collected. When live payments are introduced, they will be handled by a certified payment provider and this policy will be updated first."],
["How we use it","To confirm your booking, reply to your enquiry and run the event you registered for. We will only send marketing email if you subscribe to the newsletter, and you can ask to be removed at any time."],
["Third parties","Page fonts load from Google Fonts, which receives your IP address when the page loads. Links to Instagram, LinkedIn and YouTube take you to those services, which have their own policies. We do not run advertising trackers on this site."],
["Cookies and similar storage","We use browser storage to remember your booking draft and the admin sign-in on the demo admin page. We do not use advertising or analytics cookies."],
["Your choices","You can ask to see, correct or delete the information we hold about you, or withdraw consent to be contacted, by emailing hello@miyagi.demo. Where a law such as India’s Digital Personal Data Protection Act applies, you have the rights it provides."],
["Children","Some events are for students aged 14 and over. Younger visitors should use the forms only with a parent or teacher."],
["Changes","If we change this policy we will update the date above."]];
const SECURITY=[
["Our approach","We collect as little as possible and keep it only as long as it is needed. Less data held means less data that can be lost."],
["Connection","The website should be served over HTTPS so that information moving between your device and the site is encrypted."],
["Your data on this site","Form data in this version stays in your browser and is not transmitted to a server. Keep your device up to date and lock it when you step away, especially on shared computers."],
["Payments","No real card or bank details are requested on this demo. Live payments will use a PCI-DSS compliant provider, so card numbers never pass through or get stored on our own pages."],
["Admin area","The admin area is a demonstration with a sample login and is not secure authentication. It must be replaced with real server-side sign-in, strong passwords and access control before the site holds real customer data."],
["Third-party content","We load only fonts and embed no advertising scripts. Links that leave the site open the other service in a new tab."],
["Reporting a vulnerability","If you find a security problem, please email hello@miyagi.demo with the details and give us reasonable time to fix it before sharing it publicly. We will acknowledge your report and keep you informed."],
["If something goes wrong","If personal data is ever lost or exposed we will tell the people affected and the relevant authorities as the law requires."]];
const Doc=({eye,t,lead,items})=>h("div",null,h(Head,{eye,t},lead),h(BackLink,{to:"/"}),
 h("div",{className:"wrap legal"},h("p",{className:"mut legal-d"},"Last updated "+UPDATED),
  h("ol",{className:"legal-l"},items.map(([k,v],i)=>h("section",{key:k},h("h2",null,h("b",null,String(i+1).padStart(2,"0")),k),h("p",null,v))))));
export const Privacy=()=>h(Doc,{eye:"Legal",t:"Privacy Policy",lead:"What we collect, why, and the choices you have.",items:PRIVACY});
export const Security=()=>h(Doc,{eye:"Legal",t:"Security Policy",lead:"How we protect your information and how to report a problem.",items:SECURITY});
