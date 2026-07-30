import { getUnreadCount } from "@/app/admin/(protected)/notifications/actions";

export default async function NotificationBadge() {
  const count = await getUnreadCount();
  if (count === 0) return null;

  return (
    <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
      {count > 9 ? "9+" : count}
    </span>
  );
}
