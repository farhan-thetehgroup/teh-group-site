export const Badge = ({ icon, text, color }) => {
  const colorClasses = {
    emerald: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    blue: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    red: "bg-red-500/10 border-red-500/30 text-red-400",
    yellow: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 ${colorClasses[color]} border rounded-full mb-4`}>
      {icon}
      <span className="font-semibold uppercase tracking-wider text-md">
        {text}
      </span>
    </div>
  );
};
