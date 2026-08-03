import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    toast.success("Logged out successfully");

    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: "🏠",
      path: "/dashboard",
    },
    {
      name: "Contacts",
      icon: "👨‍👩‍👧",
      path: "/contacts",
    },
    {
      name: "Emergency SOS",
      icon: "🚨",
      path: "/sos",
    },
    {
      name: "Safe Walk",
      icon: "🛡️",
      path: "/safewalk",
    },
    {
      name: "Fake Call",
      icon: "📞",
      path: "/fakecall",
    },
    {
      name: "SOS History",
      icon: "📜",
      path: "/history",
    },
    {
      name: "Profile",
      icon: "👤",
      path: "/profile",
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-72
          bg-slate-950 text-white
          shadow-2xl z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-6 border-b border-slate-800">

          <h1 className="text-3xl font-bold text-red-500">
            🛡️ Rakhi
          </h1>

          <p className="text-gray-400 mt-2">
            Women's Safety Platform
          </p>

        </div>

        <nav className="mt-6">

          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 px-6 py-4 text-lg transition ${
                location.pathname === item.path
                  ? "bg-red-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <span className="text-2xl">
                {item.icon}
              </span>

              {item.name}
            </Link>
          ))}

          <button
            onClick={logout}
            className="w-full flex items-center gap-4 px-6 py-4 text-lg hover:bg-red-700 mt-8"
          >
            <span className="text-2xl">
              🚪
            </span>

            Logout
          </button>

        </nav>

      </aside>
    </>
  );
}

export default Sidebar;