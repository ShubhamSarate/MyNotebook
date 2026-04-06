import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords do not match", "danger");
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
      console.log("Backend response:", json);

      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        props.showAlert("Account Created Successfully", "success");
        history.push("/");  // Redirect to home page
      } else {
        props.showAlert("Invalid Details", "danger");
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
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" onChange={onChange} required minLength={3} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" onChange={onChange} required />
          <div className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" onChange={onChange} required minLength={5} />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" onChange={onChange} required minLength={5} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Signup;