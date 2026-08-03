import { useEffect, useState } from "react";
import { PhoneOff } from "lucide-react";

function CallScreen({ caller, onEnd }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <div className="fixed inset-0 bg-black flex flex-col justify-center items-center text-white z-50">

      <div className="w-40 h-40 rounded-full bg-slate-700 flex items-center justify-center text-7xl shadow-xl">
        👤
      </div>

      <h1 className="text-5xl font-bold mt-8">
        {caller}
      </h1>

      <p className="text-green-400 text-2xl mt-4">
        📞 Call Connected
      </p>

      <h2 className="text-6xl font-mono mt-10">
        {minutes}:{secs}
      </h2>

      <div className="bg-slate-900 rounded-xl p-6 mt-10 text-center max-w-md">

        <p className="text-xl">
          Hello...
        </p>

        <p className="mt-4">
          I'm outside.
        </p>

        <p className="mt-2">
          Please come quickly.
        </p>

      </div>

      <button
        onClick={onEnd}
        className="mt-12 w-24 h-24 rounded-full bg-red-600 hover:bg-red-700 flex justify-center items-center transition hover:scale-110"
      >
        <PhoneOff size={40} />
      </button>

      <p className="mt-4 text-lg">
        End Call
      </p>

    </div>
  );
}

export default CallScreen;