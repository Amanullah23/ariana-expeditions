"use client";
import { useState } from "react";
import MfaEnrollment from "@/components/admin/MfaEnrollment";

export default function AdminSettings() {
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("info@arianaexpeditions.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifyInquiries, setNotifyInquiries] = useState(true);
  const [notifyNewsletter, setNotifyNewsletter] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  function handleProfileSubmit(e) {
    e.preventDefault();
    setSavingProfile(true);
    // NOTE: no backend yet — this will be wired to Supabase Auth (user metadata).
    console.log("Profile data (not yet persisted):", { name, email });
    setTimeout(() => setSavingProfile(false), 500);
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setSavingPassword(true);
    // NOTE: no backend yet — this will call Supabase Auth's updateUser().
    console.log("Password change requested (not yet persisted).");
    setTimeout(() => {
      setSavingPassword(false);
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 500);
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-dark mb-1">Settings</h1>
        <p className="text-charcoal text-sm">
          Manage your admin account and preferences.
        </p>
      </div>

      {/* Profile */}
      <form
        onSubmit={handleProfileSubmit}
        className="bg-white rounded-2xl shadow-sm p-6 space-y-5 mb-8"
      >
        <h2 className="font-heading text-lg text-dark">Profile</h2>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Display Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <p className="text-xs text-charcoal/60 mt-1">
            This is the email used to log into the admin dashboard.
          </p>
        </div>

        <button
          type="submit"
          disabled={savingProfile}
          className="bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold px-6 py-2.5 rounded disabled:opacity-60"
        >
          {savingProfile ? "Saving..." : "Save Profile"}
        </button>
      </form>

      {/* Password */}
      <form
        onSubmit={handlePasswordSubmit}
        className="bg-white rounded-2xl shadow-sm p-6 space-y-5 mb-8"
      >
        <h2 className="font-heading text-lg text-dark">Change Password</h2>

        {passwordError && (
          <p className="text-red-600 text-sm bg-red-50 rounded px-3 py-2">
            {passwordError}
          </p>
        )}
        {passwordSuccess && (
          <p className="text-gold text-sm bg-gold/10 rounded px-3 py-2">
            Password updated successfully.
          </p>
        )}

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Current Password
          </label>
          <input
            required
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              New Password
            </label>
            <input
              required
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Confirm New Password
            </label>
            <input
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={savingPassword}
          className="bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold px-6 py-2.5 rounded disabled:opacity-60"
        >
          {savingPassword ? "Updating..." : "Update Password"}
        </button>
      </form>

      <div className="mb-8">
        <MfaEnrollment />
      </div>
      {/* Notifications */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="font-heading text-lg text-dark mb-1">Notifications</h2>

        <label className="flex items-center justify-between py-2 cursor-pointer">
          <div>
            <p className="text-dark text-sm font-medium">
              New booking inquiries
            </p>
            <p className="text-charcoal/60 text-xs">
              Get notified when a visitor submits the contact form.
            </p>
          </div>
          <input
            type="checkbox"
            checked={notifyInquiries}
            onChange={(e) => setNotifyInquiries(e.target.checked)}
            className="w-5 h-5 accent-gold"
          />
        </label>

        <label className="flex items-center justify-between py-2 cursor-pointer border-t border-dark/10 pt-4">
          <div>
            <p className="text-dark text-sm font-medium">Newsletter signups</p>
            <p className="text-charcoal/60 text-xs">
              Get notified when someone subscribes to the newsletter.
            </p>
          </div>
          <input
            type="checkbox"
            checked={notifyNewsletter}
            onChange={(e) => setNotifyNewsletter(e.target.checked)}
            className="w-5 h-5 accent-gold"
          />
        </label>
      </div>
    </div>
  );
}
