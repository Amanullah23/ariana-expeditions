import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin Dashboard | Ariana Expeditions",
};

export default async function AdminLayout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Check the session's actual authenticator assurance level.
  // If this account has 2FA enrolled, the session MUST have reached AAL2
  // (password + verified MFA) — not just AAL1 (password only).
  const { data: aalData } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (aalData?.nextLevel === "aal2" && aalData?.currentLevel !== "aal2") {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
