import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://teamtaskmanager-production-607b.up.railway.app/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert(error.response.data.message);
    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>

      </form>

      <br />

      <Link to="/register">
        Go To Register
      </Link>

    </div>
  );
}

export default Login;