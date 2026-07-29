"use client";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-cream">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />
      <div
        className={`transition-all duration-300 ${collapsed ? "md:ml-20" : "md:ml-72"}`}
      >
        <AdminTopbar onMenuClick={() => setMobileOpen(true)} />
        <main className="px-4 md:px-8 py-8 max-w-6xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
