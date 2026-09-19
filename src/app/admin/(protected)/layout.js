import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";
import NotificationBadge from "@/components/admin/NotificationBadge";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Admin Dashboard | Ariana Expeditions",
};

export default async function AdminLayout({ children }) {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell notificationBadge={<NotificationBadge />}>
      {children}
    </AdminShell>
  );
}
