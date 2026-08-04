"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef(null);
  const isFirstRender = useRef(true);

  // Detect clicks on internal links and start the bar immediately,
  // before Next.js has actually finished navigating.
  useEffect(() => {
    function handleClick(e) {
      const link = e.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("#") ||
        link.target === "_blank"
      )
        return;

      startLoading();
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  function startLoading() {
    clearInterval(intervalRef.current);
    setVisible(true);
    setProgress(20);

    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return p;
        return p + (90 - p) * 0.1;
      });
    }, 150);
  }

  function finishLoading() {
    clearInterval(intervalRef.current);
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 300);
  }

  // Fires whenever the actual page has finished changing
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    finishLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent">
      <div
        className="h-full bg-gold transition-all duration-200 ease-out shadow-[0_0_8px_rgba(224,168,59,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
