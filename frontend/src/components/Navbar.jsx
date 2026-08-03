import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar({ setIsOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <header className="bg-slate-950 shadow-md h-16 flex items-center justify-between px-6">

      <div className="flex items-center gap-4">

        <button
          className="md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={30} className="text-white" />
        </button>

        <h1 className="text-2xl font-bold text-red-500">
          🛡️ Rakhi
        </h1>

      </div>

      <div className="flex items-center gap-5">

        <span className="text-white text-lg">
          Welcome 👋
        </span>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;