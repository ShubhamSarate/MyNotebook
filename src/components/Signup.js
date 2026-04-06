import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password confirmation check
    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords don't match", "danger");
      return;
    }

    const { name, email, password } = credentials;

    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const json = await response.json();
      // console.log("Backend response:", json);

      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        props.showAlert("Account Created Successfully", "success");
        history.push("/"); // Redirect to home page
      } else if (json.error) {
        props.showAlert(json.error, "danger"); // Show backend error like "user already exists"
      } else {
        props.showAlert("Invalid Details", "danger"); // Fallback error
      }

    } catch (error) {
      console.error("Error creating user:", error);
      props.showAlert("Something went wrong", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='container mt-3'>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>

        {/* Name Input */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            required
            minLength={3}
          />
        </div>

        {/* Email Input */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>

        {/* Confirm Password Input */}
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>

      </form>
    </div>
  );
}

export default Signup;