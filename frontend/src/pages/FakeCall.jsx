import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import IncomingCall from "../components/IncomingCall";
import CallScreen from "../components/CallScreen";

function FakeCall() {
  const [caller, setCaller] = useState("Mom");
  const [delay, setDelay] = useState(5);

  const [waiting, setWaiting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const [incoming, setIncoming] = useState(false);

  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (!waiting) return;

    if (secondsLeft <= 0) {
      setWaiting(false);
      setIncoming(true);
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [waiting, secondsLeft]);

  const startFakeCall = () => {
    setWaiting(true);
    setAccepted(false);
    setIncoming(false);
    setSecondsLeft(delay);

    toast.success("Fake Call Scheduled");
  };

  const acceptCall = () => {
    setIncoming(false);
    setAccepted(true);
  };

  const declineCall = () => {
    setIncoming(false);
    toast.info("Call Declined");
  };

  return (
    <Layout>

      {incoming && (
        <IncomingCall
          caller={caller}
          onAccept={acceptCall}
          onDecline={declineCall}
        />
      )}

      <div className="max-w-xl mx-auto text-white">

        <h1 className="text-4xl font-bold mb-8">
          📞 Fake Call
        </h1>

        {!waiting && !accepted && (
          <>
            <label className="block mb-2">
              Caller
            </label>

            <select
              value={caller}
              onChange={(e) => setCaller(e.target.value)}
              className="w-full p-3 rounded text-black mb-6"
            >
              <option>Mom</option>
              <option>Dad</option>
              <option>Friend</option>
              <option>Police</option>
            </select>

            <label className="block mb-2">
              Call After
            </label>

            <select
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
              className="w-full p-3 rounded text-black mb-8"
            >
              <option value={5}>5 Seconds</option>
              <option value={10}>10 Seconds</option>
              <option value={30}>30 Seconds</option>
            </select>

            <button
              onClick={startFakeCall}
              className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-xl text-xl font-bold"
            >
              Start Fake Call
            </button>
          </>
        )}

        {waiting && (
          <div className="text-center">

            <h2 className="text-7xl font-bold text-yellow-400">
              {secondsLeft}
            </h2>

            <p className="mt-6 text-xl">
              Fake call starting...
            </p>

          </div>
        )}

        {accepted && (
          <CallScreen
            caller={caller}
            onEnd={() => setAccepted(false)}
          />
        )}

      </div>

    </Layout>
  );
}

export default FakeCall;