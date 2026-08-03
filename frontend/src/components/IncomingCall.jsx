import { useEffect, useRef } from "react";
import { Phone, PhoneOff } from "lucide-react";
import ringtone from "../assets/ringtone.mp3";

function IncomingCall({
  caller,
  onAccept,
  onDecline,
}) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(ringtone);

    audioRef.current.loop = true;
    audioRef.current.volume = 1;

    audioRef.current
      .play()
      .catch((err) => console.log(err));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleAccept = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    onAccept();
  };

  const handleDecline = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    onDecline();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900 to-black flex justify-center items-center z-50">

      <div className="text-center text-white">

        <div className="w-36 h-36 rounded-full bg-gray-700 flex items-center justify-center text-6xl mx-auto mb-8">
          👤
        </div>

        <h1 className="text-5xl font-bold">
          {caller}
        </h1>

        <p className="text-2xl text-gray-300 mt-4">
          Incoming Call...
        </p>

        <p className="mt-3 text-green-400 animate-pulse">
          🔊 Ringing...
        </p>

        <div className="flex justify-center gap-20 mt-16">

          <button
            onClick={handleAccept}
            className="bg-green-600 hover:bg-green-700 w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition hover:scale-110"
          >
            <Phone size={40} />
          </button>

          <button
            onClick={handleDecline}
            className="bg-red-600 hover:bg-red-700 w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition hover:scale-110"
          >
            <PhoneOff size={40} />
          </button>

        </div>

        <div className="flex justify-center gap-24 mt-4 text-lg">

          <span>Accept</span>

          <span>Decline</span>

        </div>

      </div>

    </div>
  );
}

export default IncomingCall;