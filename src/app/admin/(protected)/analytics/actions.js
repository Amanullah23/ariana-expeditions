"use server";
import { createClient } from "@/lib/supabase/server";

export async function getAnalyticsSummary() {
  const supabase = await createClient();

  const now = new Date();
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();
  const fourteenDaysAgo = new Date(
    now - 14 * 24 * 60 * 60 * 1000,
  ).toISOString();

  const { data: allEvents, error } = await supabase
    .from("analytics_events")
    .select("*")
    .gte("created_at", thirtyDaysAgo)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  const pageviews = allEvents.filter((e) => e.event_type === "pageview");
  const actions = allEvents.filter((e) => e.event_type === "action");

  // Total views
  const totalViews = pageviews.length;

  // Unique visitors (by distinct hash, over the 30-day window)
  const uniqueVisitors = new Set(pageviews.map((e) => e.visitor_hash)).size;

  // Last 7 / 30 days
  const last7Days = pageviews.filter(
    (e) => e.created_at >= sevenDaysAgo,
  ).length;
  const last30Days = totalViews;

  // New vs returning: a hash is "returning" if it appears on more than one distinct day
  const hashDays = {};
  pageviews.forEach((e) => {
    const day = e.created_at.slice(0, 10);
    if (!hashDays[e.visitor_hash]) hashDays[e.visitor_hash] = new Set();
    hashDays[e.visitor_hash].add(day);
  });
  let newVisitors = 0;
  let returningVisitors = 0;
  Object.values(hashDays).forEach((days) => {
    if (days.size > 1) returningVisitors++;
    else newVisitors++;
  });

  // 14-day daily view counts
  const dailyCounts = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now - i * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    dailyCounts[d] = 0;
  }
  pageviews
    .filter((e) => e.created_at >= fourteenDaysAgo)
    .forEach((e) => {
      const day = e.created_at.slice(0, 10);
      if (dailyCounts[day] !== undefined) dailyCounts[day]++;
    });
  const dailySeries = Object.entries(dailyCounts).map(([date, count]) => ({
    date,
    count,
  }));

  // Top pages
  const pageCounts = {};
  pageviews.forEach((e) => {
    const p = e.path || "/";
    pageCounts[p] = (pageCounts[p] || 0) + 1;
  });
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([path, count]) => ({ label: path, count }));

  // Top referrers
  const refCounts = {};
  pageviews.forEach((e) => {
    const r = e.referrer && e.referrer !== "internal" ? e.referrer : "direct";
    refCounts[r] = (refCounts[r] || 0) + 1;
  });
  const topReferrers = Object.entries(refCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, count]) => ({ label, count }));

  // Top countries
  const countryCounts = {};
  pageviews.forEach((e) => {
    const c = e.country || "Unknown";
    countryCounts[c] = (countryCounts[c] || 0) + 1;
  });
  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([label, count]) => ({ label, count }));

  // Devices
  const deviceCounts = {};
  pageviews.forEach((e) => {
    const d = e.device || "Desktop";
    deviceCounts[d] = (deviceCounts[d] || 0) + 1;
  });
  const devices = Object.entries(deviceCounts).map(([label, count]) => ({
    label,
    count,
  }));

  // Key actions
  const actionCounts = {};
  actions.forEach((e) => {
    const name = e.action_name || "Unknown action";
    actionCounts[name] = (actionCounts[name] || 0) + 1;
  });
  const keyActions = Object.entries(actionCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count }));

  return {
    totalViews,
    uniqueVisitors,
    last7Days,
    last30Days,
    newVisitors,
    returningVisitors,
    dailySeries,
    topPages,
    topReferrers,
    topCountries,
    devices,
    keyActions,
  };
}
