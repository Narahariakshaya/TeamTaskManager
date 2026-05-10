import "./Auth.css";

import { useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem("token", response.data.token);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert("Login Failed");
    }
  };

  return (

    <div className="auth-container">

      <form className="auth-form" onSubmit={handleSubmit}>

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