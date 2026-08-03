import { useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import api from "../services/api";
import useShakeDetection from "../hooks/useShakeDetection";

function SOS() {
  const [countdown, setCountdown] = useState(null);
  const [timerId, setTimerId] = useState(null);

  const startSOS = () => {
    if (countdown !== null) return;

    let count = 5;
    setCountdown(count);

    const id = setInterval(() => {
      count--;

      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(id);
        setCountdown(null);
        sendSOS();
      }
    }, 1000);

    setTimerId(id);
  };

  useShakeDetection(() => {
    startSOS();
  });

  const cancelSOS = () => {
    clearInterval(timerId);
    setCountdown(null);
    toast.info("SOS Cancelled");
  };

  const sendSOS = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = Number(position.coords.latitude.toFixed(6));
          const longitude = Number(position.coords.longitude.toFixed(6));

          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);

          await api.post("/sos/", {
            latitude,
            longitude,
            message: "Emergency! I need help.",
          });

          toast.success("🚨 SOS Sent Successfully");
        } catch (error) {
          console.log(error);

          toast.error(
            JSON.stringify(error.response?.data || "Unable to send SOS")
          );
        }
      },

      (error) => {
        console.log("Geolocation Error:", error);

        alert(
          `Error Code: ${error.code}\nError Message: ${error.message}`
        );

        if (error.code === 1) {
          toast.error("Permission Denied");
        } else if (error.code === 2) {
          toast.error("Location Unavailable");
        } else if (error.code === 3) {
          toast.error("Location Timeout");
        } else {
          toast.error(error.message);
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  return (
    <Layout>
      <div className="text-white flex flex-col justify-center items-center min-h-[80vh]">

        <h1 className="text-5xl font-bold mb-6">
          🚨 Emergency SOS
        </h1>

        <p className="text-xl text-gray-300 mb-10 text-center">
          Press the button or shake your phone to trigger an emergency alert.
        </p>

        {countdown === null ? (
          <button
            onClick={startSOS}
            className="bg-red-600 hover:bg-red-700 w-64 h-64 rounded-full text-4xl font-bold shadow-2xl transition-transform hover:scale-105"
          >
            🚨 SOS
          </button>
        ) : (
          <div className="flex flex-col items-center">

            <div className="text-8xl font-bold text-red-500 mb-8 animate-pulse">
              {countdown}
            </div>

            <p className="mb-6 text-lg">
              Sending SOS...
            </p>

            <button
              onClick={cancelSOS}
              className="bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-xl"
            >
              Cancel SOS
            </button>

          </div>
        )}

      </div>
    </Layout>
  );
}

export default SOS;