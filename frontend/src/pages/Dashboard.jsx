import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";

function Dashboard() {
  const [contacts, setContacts] = useState(0);
  const [sos, setSOS] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const contactResponse = await api.get("/contacts/");
      const sosResponse = await api.get("/sos/");

      setContacts(contactResponse.data.length);
      setSOS(sosResponse.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="text-white">

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            👋 Welcome Back
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Stay Safe. Help is always one tap away.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="bg-slate-800 rounded-2xl p-8 shadow-lg hover:scale-105 transition">

            <div className="text-5xl mb-4">👨‍👩‍👧</div>

            <h2 className="text-2xl font-bold">
              Emergency Contacts
            </h2>

            <p className="text-5xl font-bold text-green-400 mt-6">
              {contacts}
            </p>

          </div>

          <div className="bg-slate-800 rounded-2xl p-8 shadow-lg hover:scale-105 transition">

            <div className="text-5xl mb-4">🚨</div>

            <h2 className="text-2xl font-bold">
              SOS Alerts
            </h2>

            <p className="text-5xl font-bold text-red-500 mt-6">
              {sos}
            </p>

          </div>

          <div className="bg-slate-800 rounded-2xl p-8 shadow-lg hover:scale-105 transition">

            <div className="text-5xl mb-4">🛡️</div>

            <h2 className="text-2xl font-bold">
              Current Status
            </h2>

            <p className="text-4xl font-bold text-green-400 mt-6">
              SAFE
            </p>

          </div>

        </div>

        <div className="flex justify-center mt-14 mb-16">

          <Link to="/sos">

            <button className="bg-red-600 hover:bg-red-700 px-20 py-7 rounded-full text-3xl font-bold shadow-2xl animate-pulse hover:animate-none">

              🚨 EMERGENCY SOS

            </button>

          </Link>

        </div>

      <h2 className="text-3xl font-bold mb-8">
  Quick Actions
</h2>

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

  <Link
    to="/contacts"
    className="bg-slate-800 rounded-2xl p-8 shadow-lg hover:bg-slate-700 hover:scale-105 transition"
  >
    <div className="text-5xl mb-5">👨‍👩‍👧</div>
    <h3 className="text-2xl font-bold">Emergency Contacts</h3>
    <p className="text-gray-400 mt-3">
      Manage trusted emergency contacts.
    </p>
  </Link>

  <Link
    to="/safewalk"
    className="bg-slate-800 rounded-2xl p-8 shadow-lg hover:bg-slate-700 hover:scale-105 transition"
  >
    <div className="text-5xl mb-5">🛡️</div>
    <h3 className="text-2xl font-bold">Safe Walk</h3>
    <p className="text-gray-400 mt-3">
      Start a safety timer while travelling.
    </p>
  </Link>

  <Link
    to="/fakecall"
    className="bg-slate-800 rounded-2xl p-8 shadow-lg hover:bg-slate-700 hover:scale-105 transition"
  >
    <div className="text-5xl mb-5">📞</div>
    <h3 className="text-2xl font-bold">Fake Call</h3>
    <p className="text-gray-400 mt-3">
      Simulate an incoming call during unsafe situations.
    </p>
  </Link>

  <Link
    to="/recordevidence"
    className="bg-slate-800 rounded-2xl p-8 shadow-lg hover:bg-slate-700 hover:scale-105 transition"
  >
    <div className="text-5xl mb-5">🎙️</div>
    <h3 className="text-2xl font-bold">Record Evidence</h3>
    <p className="text-gray-400 mt-3">
      Record emergency audio evidence.
    </p>
  </Link>

  <Link
    to="/history"
    className="bg-slate-800 rounded-2xl p-8 shadow-lg hover:bg-slate-700 hover:scale-105 transition"
  >
    <div className="text-5xl mb-5">📜</div>
    <h3 className="text-2xl font-bold">SOS History</h3>
    <p className="text-gray-400 mt-3">
      View all previous emergency alerts.
    </p>
  </Link>

  <Link
    to="/profile"
    className="bg-slate-800 rounded-2xl p-8 shadow-lg hover:bg-slate-700 hover:scale-105 transition"
  >
    <div className="text-5xl mb-5">👤</div>
    <h3 className="text-2xl font-bold">My Profile</h3>
    <p className="text-gray-400 mt-3">
      Update your personal information.
    </p>
  </Link>

</div>

<div className="mt-16 bg-slate-800 rounded-2xl p-8 shadow-lg">

  <h2 className="text-3xl font-bold mb-6">
    🛡 Safety Tips
  </h2>

  <ul className="space-y-4 text-lg text-gray-300 list-disc list-inside">

    <li>Stay in well-lit and crowded areas whenever possible.</li>

    <li>Keep your phone charged before travelling.</li>

    <li>Share your live location with trusted contacts.</li>

    <li>Use the Emergency SOS button immediately if you feel unsafe.</li>

    <li>Keep your emergency contacts updated regularly.</li>

  </ul>

      </div>
      </div>
    </Layout>
  );
}

export default Dashboard;