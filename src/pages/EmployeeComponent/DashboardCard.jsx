const DashboardCard = ({ title, value, icon: Icon, color }) => {
  // Card Colors
  const colors = {
    primary: "from-[#7C3AED] to-[#6366F1]",

    warning: "from-yellow-500 to-orange-500",

    secondary: "from-cyan-500 to-blue-500",

    success: "from-green-500 to-emerald-600",
  };

  return (
    <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-4 sm:p-6 hover:scale-[1.02] transition-all duration-300 min-w-0">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        {/* Left */}
        <div>
          <p className="text-gray-400 text-sm">{title}</p>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2 sm:mt-3">{value}</h1>
        </div>

        {/* Icon */}
        <div
          className={`

            w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl flex items-center justify-center

            bg-gradient-to-r ${colors[color]}

          `}
        >
          <Icon className="text-white" size={28} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
