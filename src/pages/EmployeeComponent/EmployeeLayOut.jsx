import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { LayoutDashboard, ListTodo, LogOut } from "lucide-react";
import { toast } from "react-toastify";

const EmployeeLayout = () => {
  const navigate = useNavigate();



  const Logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    toast.success("Logout Successfully")

    navigate("/login");
  };


  const user = JSON.parse(localStorage.getItem("user"));

 

  const navItems = [
    {
      to: "/employee-dashboard",

      icon: <LayoutDashboard size={20} />,

      label: "Dashboard",
    },

    {
      to: "/my-tasks",

      icon: <ListTodo size={20} />,

      label: "My Tasks",
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#0F172A]">
      {/* ================= SIDEBAR ================= */}

      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#131E32] border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-8 border-b border-white/10">
          <h1 className="text-3xl font-bold text-white">
            Task<span className="text-[#8B5CF6]">Pro</span>
          </h1>

          <p className="text-gray-400 text-sm mt-2">Employee Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `

                    flex items-center gap-3 px-4 py-4 rounded-xl mb-3 transition-all duration-300

                    ${
                      isActive
                        ? "bg-[#7C3AED] text-white"
                        : "text-gray-400 hover:bg-[#1E293B] hover:text-white"
                    }

                  `
              }
            >
              {item.icon}

              {item.label}
            </NavLink>
          ))}

          {/* Logout */}
          <button
            onClick={Logout}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>

        {/* Bottom User */}
        <div className="p-5 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#7C3AED] flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)}
            </div>

            <div>
              <h3 className="text-white font-medium">{user?.name}</h3>

              <p className="text-gray-400 text-sm">Employee</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= RIGHT SIDE ================= */}

      <div className="flex-1 ml-64">
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-[#131E32]/90 backdrop-blur-xl border-b border-white/10 px-8 py-5">
          <h1 className="text-2xl font-bold text-white">Employee Dashboard</h1>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
