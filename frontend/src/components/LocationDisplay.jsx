import { useEffect, useState } from "react";

function LocationDisplay({ latitude, longitude }) {
  const [address, setAddress] = useState("Loading location...");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const data = await response.json();

        if (data.address) {
          const a = data.address;

          const shortAddress = [
            a.road,
            a.suburb,
            a.city || a.town || a.village,
            a.state,
          ]
            .filter(Boolean)
            .join(", ");

          setAddress(shortAddress);
        } else {
          setAddress("Unknown Location");
        }
      } catch (error) {
        console.log(error);
        setAddress("Unable to fetch location");
      }
    };

    fetchAddress();
  }, [latitude, longitude]);

  return (
    <div className="space-y-4">

      <div>
        <p className="font-semibold text-lg">
          📍 Location
        </p>

        <p className="text-gray-300 mt-2">
          {address}
        </p>
      </div>

      <a
        href={`https://www.google.com/maps?q=${latitude},${longitude}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold transition"
      >
        🗺 Navigate with Google Maps
      </a>

    </div>
  );
}

export default LocationDisplay;