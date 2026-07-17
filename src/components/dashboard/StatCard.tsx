interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  accent?: string;
}

export function StatCard({ label, value, icon, accent = 'bg-brand-50 text-brand-700' }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl ${accent}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
        <p className="mt-0.5 text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
