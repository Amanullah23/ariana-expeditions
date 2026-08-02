"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      },
    );

    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-heading text-2xl font-bold text-dark">
            Ariana <span className="text-gold">Expeditions</span>
          </span>
          <p className="text-charcoal text-sm mt-1">Reset Your Password</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          {sent ? (
            <div className="text-center">
              <p className="text-gold text-sm bg-gold/10 rounded px-3 py-3 mb-4">
                If an account exists for that email, a reset link has been sent.
                Check your inbox.
              </p>
              <Link
                href="/admin/login"
                className="text-dark text-sm font-medium hover:underline"
              >
                ← Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
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
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold hover:bg-dark hover:text-white transition-colors duration-300 text-dark font-semibold py-3 rounded disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <Link
                href="/admin/login"
                className="block text-center text-charcoal text-sm hover:text-dark"
              >
                ← Back to login
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
