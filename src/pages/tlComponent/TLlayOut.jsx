import { useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  PlusCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import LogoutConfirmModal from "../../components/LogoutConfirmModal";

const TLLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const performLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successfully");
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const navItems = [
    {
      to: "/tl-dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    {
      to: "/my-team",
      icon: <LayoutDashboard size={20} />,
      label: "My Team",
    },
    {
      to: "/create-employee",
      icon: <Users size={20} />,
      label: "Create Employee",
    },
    {
      to: "/tasks",
      icon: <ClipboardList size={20} />,
      label: "Tasks",
    },
    {
      to: "/create-task",
      icon: <PlusCircle size={20} />,
      label: "Create Task",
    },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  const openLogoutConfirm = () => {
    closeSidebar();
    setShowLogoutConfirm(true);
  };

  return (
    <div className="min-h-screen flex bg-[#0F172A] overflow-x-hidden">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 max-w-[85vw] bg-[#131E32] border-r border-white/10 flex flex-col z-50
          transition-transform duration-300 ease-in-out
          md:translate-x-0
          max-md:-translate-x-full
          ${sidebarOpen ? "max-md:translate-x-0" : ""}
        `}
      >
        <div className="px-6 py-6 md:py-8 border-b border-white/10 flex items-center justify-between md:block">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Task<span className="text-[#8B5CF6]">Pro</span>
            </h1>
            <p className="text-gray-400 text-sm mt-2">Team Lead Panel</p>
          </div>
          <button
            type="button"
            aria-label="Close sidebar"
            className="md:hidden text-gray-400 hover:text-white p-1"
            onClick={closeSidebar}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `
                  flex items-center gap-3 px-4 py-3 md:py-4 rounded-xl mb-3 transition-all duration-300
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

          <button
            type="button"
            onClick={openLogoutConfirm}
            className="w-full flex items-center gap-3 px-4 py-3 md:py-4 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>

        <div className="p-4 md:p-5 border-t border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-[#7C3AED] flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div className="min-w-0">
              <h3 className="text-white font-medium truncate">{user?.name}</h3>
              <p className="text-gray-400 text-sm">Team Lead</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 w-full min-w-0 md:ml-64">
        <header className="sticky top-0 z-30 bg-[#131E32]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 md:px-8 py-4 md:py-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              aria-label="Open menu"
              className="md:hidden shrink-0 p-2 rounded-lg border border-white/10 text-white bg-[#1E293B] hover:bg-[#7C3AED] transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
              Team Lead Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              type="button"
              className="text-gray-400 hover:text-white transition-all duration-300"
            >
              🔔
            </button>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#7C3AED] flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <LogoutConfirmModal
        isOpen={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={performLogout}
      />
    </div>
  );
};

export default TLLayout;
