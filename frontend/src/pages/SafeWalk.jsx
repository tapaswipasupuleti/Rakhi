import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import api from "../services/api";

function SafeWalk() {
  const [minutes, setMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(0);
  const [walking, setWalking] = useState(false);

  useEffect(() => {
    if (!walking || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [walking, timeLeft]);

  useEffect(() => {
    if (walking && timeLeft === 0) {
      sendSOS();
    }
  }, [timeLeft]);

  const startWalk = () => {
    setTimeLeft(minutes * 60);
    setWalking(true);
    toast.success("Safe Walk Started");
  };

  const stopWalk = () => {
    setWalking(false);
    setTimeLeft(0);
    toast.success("Glad you're safe ❤️");
  };

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const sendSOS = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = Number(position.coords.latitude.toFixed(6));
          const longitude = Number(position.coords.longitude.toFixed(6));

          await api.post("/sos/", {
            latitude,
            longitude,
            message: "Safe Walk timer expired. Emergency assistance required.",
          });

          toast.error("⚠ Safe Walk Expired. SOS Sent!");

          setWalking(false);

        } catch (error) {
          toast.error("Unable to send SOS");
        }
      },
      () => {
        toast.error("Location Permission Denied");
      }
    );
  };

  return (
    <Layout>

      <div className="max-w-xl mx-auto text-white">

        <h1 className="text-4xl font-bold mb-8">
          🛡 Safe Walk
        </h1>

        {!walking ? (
          <>

            <label className="block mb-3 text-lg">
              Select Duration
            </label>

            <select
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="w-full p-3 rounded text-black mb-8"
            >
              <option value={5}>5 Minutes</option>
              <option value={10}>10 Minutes</option>
              <option value={20}>20 Minutes</option>
              <option value={30}>30 Minutes</option>
            </select>

            <button
              onClick={startWalk}
              className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-xl text-xl font-bold"
            >
              Start Safe Walk
            </button>

          </>
        ) : (
          <div className="text-center">

            <h2 className="text-7xl font-bold text-green-400 mb-8">
              {formatTime()}
            </h2>

            <p className="mb-8 text-lg">
              Tap the button when you reach safely.
            </p>

            <button
              onClick={stopWalk}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-xl"
            >
              I'm Safe
            </button>

          </div>
        )}

      </div>

    </Layout>
  );
}

export default SafeWalk;