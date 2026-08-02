"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 2FA challenge state
  const [needsMfa, setNeedsMfa] = useState(false);
  const [availableFactors, setAvailableFactors] = useState([]);
  const [mfaCode, setMfaCode] = useState("");

  const supabase = createClient();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setLoading(false);
      setError(signInError.message);
      return;
    }

    // Check if this account has any active 2FA factors
    const { data: factorsData } = await supabase.auth.mfa.listFactors();
    const verifiedFactors =
      factorsData?.totp?.filter((f) => f.status === "verified") || [];

    if (verifiedFactors.length === 0) {
      // No 2FA enrolled at all — log straight in
      setLoading(false);
      router.push("/admin");
      router.refresh();
      return;
    }

    setLoading(false);
    setAvailableFactors(verifiedFactors);
    setNeedsMfa(true);
  }

  async function handleVerifyMfa(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Try the entered code against each enrolled device in turn.
    // TOTP codes are independent per device, so we don't know in advance
    // which device the person is using — we just try each until one works.
    for (const factor of availableFactors) {
      const { data: challengeData, error: challengeError } =
        await supabase.auth.mfa.challenge({ factorId: factor.id });

      if (challengeError) continue;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: factor.id,
        challengeId: challengeData.id,
        code: mfaCode,
      });

      if (!verifyError) {
        setLoading(false);
        router.push("/admin");
        router.refresh();
        return;
      }
    }

    setLoading(false);
    setError("Invalid code — please try again.");
    setMfaCode("");
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — branded panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-dark overflow-hidden items-center justify-center px-16">
        <div
          className="hero-dots absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(255,255,255,0.18) 1.5px, transparent 1.5px),
              radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px),
              radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px, 83px 71px, 37px 97px",
            backgroundPosition: "0 0, 20px 35px, 45px 10px",
          }}
        />

        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-10 bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Admin Access
            </span>
          </div>

          <h1 className="font-heading text-4xl font-bold text-white leading-tight mb-6">
            Ariana <span className="italic text-gold">Expeditions</span>
          </h1>

          <p className="text-white/70 leading-relaxed">
            Manage trips, destinations, testimonials, and traveler inquiries —
            everything that keeps the journey running, in one place.
          </p>
        </div>
      </div>

      {/* Right — login form */}
      <div className="flex-1 flex items-center justify-center bg-cream px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="lg:hidden text-center mb-8">
            <span className="font-heading text-2xl font-bold text-dark">
              Ariana <span className="text-gold">Expeditions</span>
            </span>
            <p className="text-charcoal text-sm mt-1">Admin Dashboard</p>
          </div>

          {!needsMfa ? (
            <>
              <div className="hidden lg:block mb-8">
                <h2 className="font-heading text-2xl text-dark mb-1">
                  Welcome back
                </h2>
                <p className="text-charcoal text-sm">
                  Sign in to manage your website.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-8 space-y-5"
              >
                {error && (
                  <p className="text-red-600 text-sm bg-red-50 rounded px-3 py-2">
                    {error}
                  </p>
                )}

                <div>
                  <label className="block text-sm font-medium text-dark mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@arianaexpeditions.com"
                    className="w-full border border-dark/20 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border border-dark/20 rounded px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal hover:text-dark"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.6}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.6}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <Link
                    href="/admin/forgot-password"
                    className="text-xs text-gold hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold cursor-pointer hover:bg-dark hover:text-white transition-colors duration-300 text-dark font-semibold py-3 rounded disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="hidden lg:block mb-8">
                <h2 className="font-heading text-2xl text-dark mb-1">
                  Verification Required
                </h2>
                <p className="text-charcoal text-sm">
                  Enter the 6-digit code from your authenticator app.
                </p>
              </div>

              <form
                onSubmit={handleVerifyMfa}
                className="bg-white rounded-2xl shadow-sm p-8 space-y-5"
              >
                <div className="lg:hidden text-center mb-2">
                  <p className="text-dark font-medium">Verification Required</p>
                  <p className="text-charcoal text-sm">
                    Enter the 6-digit code from your authenticator app.
                  </p>
                </div>

                {error && (
                  <p className="text-red-600 text-sm bg-red-50 rounded px-3 py-2">
                    {error}
                  </p>
                )}

                <div>
                  <label className="block text-sm font-medium text-dark mb-1">
                    Authentication Code
                  </label>
                  <input
                    autoFocus
                    value={mfaCode}
                    onChange={(e) =>
                      setMfaCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="123456"
                    className="w-full border border-dark/20 rounded px-4 py-3 text-center text-xl tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || mfaCode.length !== 6}
                  className="w-full bg-gold hover:bg-dark hover:text-white transition-colors duration-300 text-dark font-semibold py-3 rounded disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify & Sign In"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setNeedsMfa(false);
                    setMfaCode("");
                    setError("");
                  }}
                  className="w-full text-charcoal text-sm hover:text-dark"
                >
                  Back to login
                </button>
              </form>
            </>
          )}

          <p className="text-center text-charcoal/50 text-xs mt-6">
            Authorized access only — Ariana Expeditions internal system.
          </p>
        </div>
      </div>
    </div>
  );
}
