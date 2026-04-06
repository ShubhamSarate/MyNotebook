import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // useHistory for v5

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const history = useHistory(); // v5 navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success && json.authtoken) {
        localStorage.setItem("token", json.authtoken);
        props.showAlert("Logged in Successfully", "success");
        history.push("/"); // v5 navigation
      } else {
        props.showAlert("Invalid Details", "danger");
      }
    } catch (error) {
      console.error("Login error:", error);
      props.showAlert("Server Error", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h2>Login to your account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;