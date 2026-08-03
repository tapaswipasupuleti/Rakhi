import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("access");

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  const handleLearnMore = () => {
    const features = document.getElementById("features");

    if (features) {
      features.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-black text-white">

        <div className="max-w-7xl mx-auto px-8 py-24">

          <div className="grid md:grid-cols-2 gap-16 items-center">

            <div>

              <h1 className="text-6xl font-bold leading-tight">
                Your Safety,
                <br />
                Always First.
              </h1>

              <p className="mt-8 text-xl text-gray-300 leading-8">
                Rakhi is an AI-powered women's safety platform with
                emergency SOS alerts, live location sharing,
                emergency contacts, and intelligent safety assistance.
              </p>

              <div className="mt-10 flex gap-5">

                <button
                  onClick={handleGetStarted}
                  className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl text-lg font-semibold"
                >
                  Get Started
                </button>

                <button
                  onClick={handleLearnMore}
                  className="border border-gray-500 hover:bg-gray-800 px-8 py-4 rounded-xl text-lg"
                >
                  Learn More
                </button>

              </div>

            </div>

            <div className="flex justify-center">

              <div className="w-80 h-80 rounded-full bg-red-600 flex items-center justify-center text-8xl shadow-2xl">
                🛡️
              </div>

            </div>

          </div>

          {/* Features Section */}

          <section id="features" className="mt-32">

            <h2 className="text-5xl font-bold text-center mb-16">
              Why Choose Rakhi?
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              <div className="bg-slate-800 p-8 rounded-2xl">
                <div className="text-5xl mb-4">🚨</div>
                <h3 className="text-2xl font-bold">Emergency SOS</h3>
                <p className="mt-3 text-gray-400">
                  Instantly alert your trusted contacts with your live location.
                </p>
              </div>

              <div className="bg-slate-800 p-8 rounded-2xl">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="text-2xl font-bold">Safe Walk</h3>
                <p className="mt-3 text-gray-400">
                  Automatically sends an SOS if you don't reach safely.
                </p>
              </div>

              <div className="bg-slate-800 p-8 rounded-2xl">
                <div className="text-5xl mb-4">📞</div>
                <h3 className="text-2xl font-bold">Fake Call</h3>
                <p className="mt-3 text-gray-400">
                  Escape uncomfortable situations with a realistic incoming call.
                </p>
              </div>

              <div className="bg-slate-800 p-8 rounded-2xl">
                <div className="text-5xl mb-4">🎙️</div>
                <h3 className="text-2xl font-bold">Record Evidence</h3>
                <p className="mt-3 text-gray-400">
                  Record emergency audio that can be used later if needed.
                </p>
              </div>

              <div className="bg-slate-800 p-8 rounded-2xl">
                <div className="text-5xl mb-4">📍</div>
                <h3 className="text-2xl font-bold">Live Location</h3>
                <p className="mt-3 text-gray-400">
                  Share your exact location with Google Maps support.
                </p>
              </div>

              <div className="bg-slate-800 p-8 rounded-2xl">
                <div className="text-5xl mb-4">👨‍👩‍👧</div>
                <h3 className="text-2xl font-bold">Emergency Contacts</h3>
                <p className="mt-3 text-gray-400">
                  Quickly notify your trusted family and friends.
                </p>
              </div>

            </div>

          </section>

        </div>

      </div>
    </>
  );
}

export default Home;