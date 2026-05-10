import "./Auth.css";

import { useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

function Register() {

    const token = localStorage.getItem("token");

if (token) {

  window.location.href = "/dashboard";
}

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      alert("Registration Failed");
    }
  };

  return (

    <div className="auth-container">

      <form className="auth-form" onSubmit={handleSubmit}>

        <h1>Register</h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          Register
        </button>

        <Link to="/">
          Go To Login
        </Link>

      </form>

    </div>

  );
}

export default Register;