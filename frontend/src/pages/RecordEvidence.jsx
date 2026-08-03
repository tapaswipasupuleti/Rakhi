import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

function RecordEvidence() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");

  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      mediaRecorder.current = new MediaRecorder(stream);

      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, {
          type: "audio/webm",
        });

        const url = URL.createObjectURL(audioBlob);

        setAudioURL(url);

        toast.success("Recording Saved");
      };

      mediaRecorder.current.start();

      setRecording(true);

      toast.success("Recording Started");
    } catch (error) {
      console.log(error);
      toast.error("Microphone Permission Denied");
    }
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();

    setRecording(false);

    toast.info("Recording Stopped");
  };

  return (
    <Layout>

      <div className="max-w-2xl mx-auto text-white">

        <h1 className="text-4xl font-bold mb-10">
          🎙 Record Evidence
        </h1>

        {!recording ? (

          <button
            onClick={startRecording}
            className="bg-red-600 hover:bg-red-700 px-10 py-5 rounded-xl text-2xl font-bold"
          >
            🎙 Start Recording
          </button>

        ) : (

          <button
            onClick={stopRecording}
            className="bg-gray-700 hover:bg-gray-800 px-10 py-5 rounded-xl text-2xl font-bold"
          >
            ⏹ Stop Recording
          </button>

        )}

        {audioURL && (

          <div className="mt-10 bg-slate-800 p-6 rounded-xl">

            <h2 className="text-2xl font-bold mb-4">
              Recording Preview
            </h2>

            <audio
              controls
              src={audioURL}
              className="w-full"
            />

            <a
              href={audioURL}
              download="EmergencyEvidence.webm"
              className="inline-block mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
            >
              Download Recording
            </a>

          </div>

        )}

      </div>

    </Layout>
  );
}

export default RecordEvidence;