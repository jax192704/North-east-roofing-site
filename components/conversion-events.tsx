"use client";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
export function ConversionEvents(){useEffect(()=>{const onClick=(event:MouseEvent)=>{const link=event.target instanceof Element?event.target.closest("a"):null;if(!link)return;const href=link.getAttribute("href")||"";if(href.startsWith("tel:"))trackEvent("phone_click");else if(href.startsWith("mailto:"))trackEvent("email_click");else if(href.startsWith("https://wa.me/"))trackEvent("whatsapp_click");else if(href.startsWith("/request-a-quote"))trackEvent("quote_request_click");};document.addEventListener("click",onClick);return()=>document.removeEventListener("click",onClick);},[]);return null;}
