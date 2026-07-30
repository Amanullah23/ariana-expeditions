"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import MfaEnrollment from "@/components/admin/MfaEnrollment";

export default function AdminSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifyInquiries, setNotifyInquiries] = useState(true);
  const [notifyNewsletter, setNotifyNewsletter] = useState(false);

  const [loadingUser, setLoadingUser] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");

  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [savingNotifs, setSavingNotifs] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    setLoadingUser(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setEmail(user.email || "");
      setName(user.user_metadata?.display_name || "");
      setNotifyInquiries(user.user_metadata?.notify_inquiries ?? true);
      setNotifyNewsletter(user.user_metadata?.notify_newsletter ?? false);
    }
    setLoadingUser(false);
  }

  async function handleProfileSubmit(e) {
    e.preventDefault();
    setProfileError("");
    setProfileMessage("");
    setSavingProfile(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const emailChanged = email !== user.email;

    const { error } = await supabase.auth.updateUser({
      email,
      data: { display_name: name },
    });

    setSavingProfile(false);

    if (error) {
      setProfileError(error.message);
      return;
    }

    if (emailChanged) {
      setProfileMessage(
        "Profile updated. Since you changed your email, check your NEW email inbox for a confirmation link — the change won't take effect until you click it.",
      );
    } else {
      setProfileMessage("Profile updated successfully.");
    }
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (!currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setSavingPassword(true);

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    setSavingPassword(false);

    if (error) {
      setPasswordError(error.message);
      return;
    }

    setPasswordSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  async function handleNotifChange(field, value) {
    if (field === "inquiries") setNotifyInquiries(value);
    if (field === "newsletter") setNotifyNewsletter(value);

    setSavingNotifs(true);
    await supabase.auth.updateUser({
      data: {
        notify_inquiries: field === "inquiries" ? value : notifyInquiries,
        notify_newsletter: field === "newsletter" ? value : notifyNewsletter,
      },
    });
    setSavingNotifs(false);
  }

  if (loadingUser) {
    return <p className="text-charcoal text-sm">Loading settings...</p>;
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

        {profileError && (
          <p className="text-red-600 text-sm bg-red-50 rounded px-3 py-2">
            {profileError}
          </p>
        )}
        {profileMessage && (
          <p className="text-gold text-sm bg-gold/10 rounded px-3 py-2">
            {profileMessage}
          </p>
        )}

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
            This is the email used to log into the admin dashboard. Changing it
            requires confirming via a link sent to the new address.
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

      {/* 2FA */}
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
            onChange={(e) => handleNotifChange("inquiries", e.target.checked)}
            disabled={savingNotifs}
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
            onChange={(e) => handleNotifChange("newsletter", e.target.checked)}
            disabled={savingNotifs}
            className="w-5 h-5 accent-gold"
          />
        </label>
      </div>
    </div>
  );
}
