import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users/register/", formData);

      toast.success("Registration Successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.log(error.response?.data);

      alert(JSON.stringify(error.response?.data, null, 2));

      toast.error("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900 p-6">

      <form
        onSubmit={handleRegister}
        className="bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-lg"
      >

        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Create Account
        </h1>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            className="p-3 rounded"
            required
          />

          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            className="p-3 rounded"
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="p-3 rounded md:col-span-2"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded md:col-span-2"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="p-3 rounded md:col-span-2"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 rounded md:col-span-2"
            required
          />

        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg mt-6 font-semibold"
        >
          Register
        </button>

        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;