import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900">

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="md:ml-72">

        <Navbar
          setIsOpen={setIsOpen}
        />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;