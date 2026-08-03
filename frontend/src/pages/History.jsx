import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import LocationDisplay from "../components/LocationDisplay";
import api from "../services/api";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/sos/");
      setHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="text-white">

        <h1 className="text-4xl font-bold mb-8">
          📜 SOS History
        </h1>

        {history.length === 0 ? (

          <div className="bg-slate-800 p-8 rounded-xl text-center shadow-lg">

            <h2 className="text-2xl font-semibold">
              No SOS Alerts Found
            </h2>

            <p className="text-gray-400 mt-3">
              Your emergency history will appear here after an SOS is sent.
            </p>

          </div>

        ) : (

          <div className="grid gap-6">

            {history.map((item) => (

              <div
                key={item.id}
                className="bg-slate-800 rounded-xl p-6 shadow-lg hover:bg-slate-700 transition"
              >

                <div className="flex justify-between items-center mb-4">

                  <h2 className="text-2xl font-bold text-red-400">
                    🚨 Emergency Alert
                  </h2>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      item.status === "Completed"
                        ? "bg-green-600"
                        : item.status === "Cancelled"
                        ? "bg-gray-600"
                        : "bg-red-600"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

                <div className="space-y-5">

                  <LocationDisplay
                    latitude={item.latitude}
                    longitude={item.longitude}
                  />

                  <p>
                    <strong>💬 Message:</strong> {item.message}
                  </p>

                  <p>
                    <strong>🕒 Date:</strong>{" "}
                    {new Date(item.created_at).toLocaleString()}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </Layout>
  );
}

export default History;