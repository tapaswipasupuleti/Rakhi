import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import api from "../services/api";

function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const token = localStorage.getItem("access");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchProfile = async () => {
    try {
      const response = await api.get("/users/profile/", config);
      setProfile(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load profile");
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(
        "/users/profile/",
        profile,
        config
      );

      setProfile(response.data.data);

      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Unable to update profile");
    }
  };

  return (
    <Layout>
      <div className="text-white">

        <h1 className="text-4xl font-bold mb-8">
          👤 My Profile
        </h1>

        <form
          onSubmit={updateProfile}
          className="bg-slate-800 p-8 rounded-xl shadow-lg max-w-3xl"
        >

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-semibold">
                Username
              </label>

              <input
                className="w-full p-3 rounded bg-gray-300 text-black"
                value={profile.username}
                readOnly
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Email
              </label>

              <input
                type="email"
                className="w-full p-3 rounded text-black"
                value={profile.email}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                First Name
              </label>

              <input
                className="w-full p-3 rounded text-black"
                value={profile.first_name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    first_name: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Last Name
              </label>

              <input
                className="w-full p-3 rounded text-black"
                value={profile.last_name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    last_name: e.target.value,
                  })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">
                Phone Number
              </label>

              <input
                className="w-full p-3 rounded text-black"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    phone: e.target.value,
                  })
                }
              />
            </div>

          </div>

          <button
            type="submit"
            className="mt-8 bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold"
          >
            Update Profile
          </button>

        </form>

      </div>
    </Layout>
  );
}

export default Profile;