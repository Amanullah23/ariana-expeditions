"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function trackAction(actionName) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventType: "action",
      actionName,
      path: window.location.pathname,
    }),
  }).catch(() => {});
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "pageview",
        path: pathname,
        referrer: isFirstRender.current
          ? document.referrer || "direct"
          : "internal",
      }),
    }).catch(() => {});
    isFirstRender.current = false;
  }, [pathname]);

  return null;
}
