"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import ConfirmDialog from "./ConfirmDialog";
import useConfirm from "@/hooks/useConfirm";

export default function MfaEnrollment() {
  const [factors, setFactors] = useState([]);
  const [enrolling, setEnrolling] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [secret, setSecret] = useState(null);
  const [factorId, setFactorId] = useState(null);
  const [friendlyName, setFriendlyName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { confirm, dialogProps } = useConfirm();

  const supabase = createClient();

  async function loadFactors() {
    const { data, error } = await supabase.auth.mfa.listFactors();
    if (!error && data) {
      setFactors(data.totp || []);
    }
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load on mount, safe
    loadFactors();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally run once on mount only
  }, []);

  async function startEnrollment() {
    if (!friendlyName.trim()) {
      setError('Give this device a name first (e.g. "Jalal\'s Phone").');
      return;
    }
    setError("");
    setEnrolling(true);
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: friendlyName.trim(),
    });

    if (error) {
      setError(error.message);
      setEnrolling(false);
      return;
    }

    setQrCode(data.totp.qr_code);
    setSecret(data.totp.secret);
    setFactorId(data.id);
  }

  async function verifyAndEnable() {
    setError("");
    setLoading(true);

    const { data: challengeData, error: challengeError } =
      await supabase.auth.mfa.challenge({ factorId });

    if (challengeError) {
      setError(challengeError.message);
      setLoading(false);
      return;
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challengeData.id,
      code,
    });

    setLoading(false);

    if (verifyError) {
      setError(
        "Invalid code — please check your authenticator app and try again.",
      );
      return;
    }

    setSuccess(true);
    setEnrolling(false);
    setQrCode(null);
    setCode("");
    setFriendlyName("");
    loadFactors();
  }

  async function removeFactor(id, name) {
    const ok = await confirm({
      title: "Remove this device?",
      message: `"${name}" will no longer be able to sign in with this account. This cannot be undone.`,
      confirmLabel: "Remove Device",
    });
    if (ok) {
      await supabase.auth.mfa.unenroll({ factorId: id });
      loadFactors();
    }
  }

  const verifiedFactors = factors.filter((f) => f.status === "verified");

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
      <div>
        <h2 className="font-heading text-lg text-dark mb-1">
          Two-Factor Authentication
        </h2>
        <p className="text-charcoal text-sm">
          Each person who logs into this account can add their own authenticator
          device below — everyone uses the same email and password, but each has
          their own independent 6-digit code.
        </p>
      </div>

      {verifiedFactors.length > 0 && (
        <div className="space-y-2">
          {verifiedFactors.map((f) => (
            <div
              key={f.id}
              className="flex items-center justify-between bg-gold/10 rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gold shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 4.556-3.02 8.373-7.163 9.616a1.5 1.5 0 01-.674 0C8.02 20.373 5 16.556 5 12V6.545c0-.564.34-1.07.86-1.293l6-2.572a1.5 1.5 0 011.28 0l6 2.572c.52.223.86.729.86 1.293V12z"
                  />
                </svg>
                <span className="text-dark text-sm font-medium">
                  {f.friendly_name || "Unnamed device"}
                </span>
              </div>
              <button
                onClick={() =>
                  removeFactor(f.id, f.friendly_name || "this device")
                }
                className="text-red-600 text-sm font-medium hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {!enrolling && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Add a new device
            </label>
            <input
              value={friendlyName}
              onChange={(e) => setFriendlyName(e.target.value)}
              placeholder="e.g. Jalal's Phone, Rik's Phone"
              className="w-full border border-dark/20 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <button
            onClick={startEnrollment}
            className="bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold px-6 py-2.5 rounded"
          >
            Add Authenticator Device
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm bg-red-50 rounded px-3 py-2">
          {error}
        </p>
      )}

      {success && (
        <p className="text-gold text-sm bg-gold/10 rounded px-3 py-2">
          Device added successfully — it can now be used to sign in.
        </p>
      )}

      {enrolling && qrCode && (
        <div className="border border-dark/10 rounded-lg p-5 space-y-4">
          <div>
            <p className="text-dark text-sm font-medium mb-2">
              1. Scan this QR code with the authenticator app on{" "}
              <strong>{friendlyName}</strong>
            </p>
            <div
              className="w-48 h-48 mx-auto bg-white p-2 border border-dark/10 rounded"
              dangerouslySetInnerHTML={{ __html: qrCode }}
            />
          </div>

          <div>
            <p className="text-charcoal text-xs mb-1">
              Can&apos;t scan? Enter this code manually:
            </p>
            <code className="block bg-cream rounded px-3 py-2 text-xs text-dark break-all">
              {secret}
            </code>
          </div>

          <div>
            <p className="text-dark text-sm font-medium mb-2">
              2. Enter the 6-digit code from that app
            </p>
            <div className="flex gap-3">
              <input
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="123456"
                className="flex-1 border border-dark/20 rounded px-4 py-2 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button
                onClick={verifyAndEnable}
                disabled={loading || code.length !== 6}
                className="bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold px-6 py-2 rounded disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setEnrolling(false);
              setQrCode(null);
              setCode("");
              setError("");
            }}
            className="text-charcoal text-xs hover:text-dark"
          >
            Cancel
          </button>
        </div>
      )}
      <ConfirmDialog {...dialogProps} />
    </div>
  );
}
