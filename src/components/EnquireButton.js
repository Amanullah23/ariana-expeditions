"use client";
import Link from "next/link";
import { trackAction } from "./AnalyticsTracker";

export default function EnquireButton({ href, children, className }) {
  return (
    <Link
      href={href}
      onClick={() => trackAction("Trip inquiry started")}
      className={className}
    >
      {children}
    </Link>
  );
}
