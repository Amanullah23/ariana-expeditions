import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";
import NotificationBadge from "@/components/admin/NotificationBadge";

export const dynamic = "force-dynamic";
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

  const { data: aalData } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (aalData?.nextLevel === "aal2" && aalData?.currentLevel !== "aal2") {
    redirect("/admin/login");
  }

  return (
    <AdminShell notificationBadge={<NotificationBadge />}>
      {children}
    </AdminShell>
  );
}
