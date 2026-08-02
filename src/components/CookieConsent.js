"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import GoogleAnalytics from "./GoogleAnalytics";

const CONSENT_KEY = "ariana_cookie_consent";
const CONSENT_VALID_MONTHS = 6;

function readStoredConsent() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    const ageMs = Date.now() - data.timestamp;
    const maxAgeMs = CONSENT_VALID_MONTHS * 30 * 24 * 60 * 60 * 1000;
    if (ageMs > maxAgeMs) return null; // expired — re-prompt
    return data.status; // "accepted" | "rejected"
  } catch {
    return null;
  }
}

function storeConsent(status) {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ status, timestamp: Date.now() })
  );
}

export default function CookieConsent({ gaId }) {
  const [status, setStatus] = useState(null); // null = not yet decided
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = readStoredConsent();
    if (existing) {
      setStatus(existing);
    } else {
      setVisible(true);
    }

    function handleReopen() {
      setVisible(true);
    }
    window.addEventListener("open-cookie-settings", handleReopen);
    return () => window.removeEventListener("open-cookie-settings", handleReopen);
  }, []);

  function handleAccept() {
    storeConsent("accepted");
    setStatus("accepted");
    setVisible(false);
  }

  function handleReject() {
    storeConsent("rejected");
    setStatus("rejected");
    setVisible(false);
  }

  return (
    <>
      {status === "accepted" && <GoogleAnalytics gaId={gaId} />}

      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-[999] bg-dark border-t border-gold/30 px-6 py-5 shadow-2xl">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm mb-1">
                We use cookies
              </h3>
              <p className="text-white/70 text-xs leading-relaxed">
                We use analytics cookies to understand how visitors use our site and improve your experience. These are only set with your permission. Read our{" "}
                <Link href="/privacy" className="text-gold hover:underline">
                  Privacy Policy
                </Link>{" "}
                for details.
              </p>
            </div>

            <div className="flex gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={handleReject}
                className="flex-1 md:flex-none border border-white/30 text-white hover:bg-white/10 transition-colors duration-200 font-semibold text-sm px-6 py-2.5 rounded"
              >
                Reject
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none bg-gold hover:bg-white transition-colors duration-200 text-dark font-semibold text-sm px-6 py-2.5 rounded"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}