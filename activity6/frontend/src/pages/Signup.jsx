import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({name: '', email: '', password: ''});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async e => {
    e.preventDefault();

    try {
    // sending data to the back end api 
      const response = await fetch("https://activity6.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
        // send user to login after successful signup 
        setTimeout(() => {
          navigate("/login");
        }, 1500); 
      } else {
        setMessage(data.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("An error occurred.");
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{textAlign:"center"}}>Sign Up</h2>
      {/* show the error or success message  */}
      {message && <div className="alert alert-info mt-3">{message}</div>}
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} placeholder='Your Name'required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} placeholder='Your Email Address' required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} placeholder='Your Password' required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
