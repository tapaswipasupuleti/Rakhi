import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/login/", {
        username,
        password,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      toast.success("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900">
      <form
        onSubmit={handleLogin}
        className="bg-slate-800 p-10 rounded-xl w-96 shadow-xl"
      >
        <h1 className="text-3xl text-white font-bold mb-8 text-center">
          Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 rounded mb-5"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded mb-5"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;