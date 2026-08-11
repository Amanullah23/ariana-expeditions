"use client";
import { useState, useEffect } from "react";
import { getAnalyticsSummary } from "./actions";

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <p className="text-charcoal text-xs mb-1">{label}</p>
      <p className="font-heading text-3xl text-dark">{value}</p>
    </div>
  );
}

function BarList({ title, items, total }) {
  const max = Math.max(...items.map((i) => i.count), 1);
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="font-heading text-lg text-dark mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="text-charcoal/50 text-sm">No data yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-dark truncate pr-2">{item.label}</span>
                <span className="text-charcoal/60 shrink-0">{item.count}</span>
              </div>
              <div className="h-1.5 bg-cream rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full"
                  style={{ width: `${(item.count / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LineChart({ data }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const width = 700;
  const height = 200;
  const padding = 30;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - (d.count / max) * (height - padding * 2);
    return { x, y, ...d };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height + 20}`}
        className="w-full min-w-[600px]"
        style={{ height: 220 }}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={padding}
            x2={width - padding}
            y1={height - padding - f * (height - padding * 2)}
            y2={height - padding - f * (height - padding * 2)}
            stroke="#14 2E2B"
            strokeOpacity={0.08}
            strokeDasharray="4 4"
          />
        ))}
        <path d={pathD} fill="none" stroke="#9C7A1E" strokeWidth={2.5} />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill="#9C7A1E" />
        ))}
        {points.map((p, i) =>
          i % 2 === 0 ? (
            <text
              key={i}
              x={p.x}
              y={height + 15}
              fontSize="10"
              fill="#5B6460"
              textAnchor="middle"
            >
              {p.date.slice(5)}
            </text>
          ) : null,
        )}
      </svg>
    </div>
  );
}

export default function AdminAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      const summary = await getAnalyticsSummary();
      setData(summary);
    } catch (err) {
      console.error("Failed to load analytics:", err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load on mount, safe
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <p className="text-charcoal text-sm text-center py-12">
        Loading analytics...
      </p>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl md:text-3xl text-dark mb-1">
          Analytics
        </h1>
        <p className="text-charcoal text-sm">
          Anonymous visitor stats — no personal data is collected, ever.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-5">
        <StatCard label="Total Views (30d)" value={data.totalViews} />
        <StatCard label="Unique Visitors" value={data.uniqueVisitors} />
        <StatCard label="Last 7 Days" value={data.last7Days} />
        <StatCard label="Last 30 Days" value={data.last30Days} />
      </div>

      <div className="grid grid-cols-2 gap-5 mb-8">
        <StatCard label="New Visitors" value={data.newVisitors} />
        <StatCard label="Returning Visitors" value={data.returningVisitors} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="font-heading text-lg text-dark mb-4">
          Views — Last 14 Days
        </h2>
        <LineChart data={data.dailySeries} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <BarList title="Top Pages" items={data.topPages} />
        <BarList title="Top Referrers" items={data.topReferrers} />
        <BarList title="Top Countries" items={data.topCountries} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <BarList title="Devices" items={data.devices} />
        <BarList title="Key Actions" items={data.keyActions} />
      </div>
    </div>
  );
}
