"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const IDLE_LIMIT = 30 * 60 * 1000; // 30 minutes
const WARNING_BEFORE = 60 * 1000; // show warning 1 minute before logout

export default function IdleTimeout() {
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  const warningTimer = useRef(null);
  const logoutTimer = useRef(null);
  const countdownInterval = useRef(null);

  async function doLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  function clearAllTimers() {
    clearTimeout(warningTimer.current);
    clearTimeout(logoutTimer.current);
    clearInterval(countdownInterval.current);
  }

  function startTimers() {
    clearAllTimers();
    setShowWarning(false);

    warningTimer.current = setTimeout(() => {
      setSecondsLeft(60);
      setShowWarning(true);
      countdownInterval.current = setInterval(() => {
        setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
      }, 1000);
    }, IDLE_LIMIT - WARNING_BEFORE);

    logoutTimer.current = setTimeout(() => {
      doLogout();
    }, IDLE_LIMIT);
  }

  function handleActivity() {
    // Don't reset the timer while the warning is showing — only
    // an explicit "Stay Signed In" click should dismiss it.
    if (showWarning) return;
    startTimers();
  }

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
    ];
    events.forEach((e) => window.addEventListener(e, handleActivity));
    startTimers();

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleActivity));
      clearAllTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showWarning]);

  function handleStaySignedIn() {
    startTimers();
  }

  if (!showWarning) return null;

  return (
    <div className="modal-backdrop fixed inset-0 z-[200] bg-black/60 flex items-center justify-center px-4">
      <div className="modal-panel bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/15 text-dark mb-4">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2"
            />
            <circle
              cx="12"
              cy="12"
              r="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="font-heading text-lg text-dark mb-2">Still there?</h3>
        <p className="text-charcoal text-sm mb-5">
          You&apos;ll be signed out in <strong>{secondsLeft}s</strong> due to
          inactivity.
        </p>
        <button
          onClick={handleStaySignedIn}
          className="w-full bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold py-3 rounded"
        >
          Stay Signed In
        </button>
      </div>
    </div>
  );
}
