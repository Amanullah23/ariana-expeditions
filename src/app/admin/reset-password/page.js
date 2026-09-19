import Link from "next/link";

export const metadata = {
  title: "Reset Password | Ariana Expeditions Admin",
};

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-heading text-2xl font-bold text-dark">
            Ariana <span className="text-gold">Expeditions</span>
          </span>
          <p className="text-charcoal text-sm mt-1">Reset Your Password</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <p className="text-charcoal text-sm mb-6">
            Self-service password reset isn&apos;t available yet. Please contact
            the site administrator directly to have your password reset.
          </p>
          <Link
            href="/admin/login"
            className="text-dark text-sm font-medium hover:underline"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
