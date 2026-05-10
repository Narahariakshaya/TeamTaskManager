import "./Auth.css";

import { useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

function Login() {
    const token = localStorage.getItem("token");

if (token) {

  window.location.href = "/dashboard";
}

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "https://teamtaskmanager-production-607b.up.railway.app/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", response.data.token);

    alert("Login Successful");

    navigate("/dashboard");
  } catch (error) {
    console.log(error);

    alert("Login Failed");
  }
};

  return (

    <div className="auth-container">

     <form className="auth-form" onSubmit={handleLogin}>
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>

        <Link to="/register">
          Go To Register
        </Link>

      </form>

    </div>

  );
}

export default Login;