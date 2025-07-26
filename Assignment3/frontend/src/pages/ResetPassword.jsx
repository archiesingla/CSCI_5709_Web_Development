import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/styles/main.css";

function ResetPassword() {
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        token: resetToken,
        new_password: newPassword,
      });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || "Failed to reset password"));
    }
  };

  return (
    <div className="home-container d-flex justify-content-center align-items-center vh-100">
      <div className="glass-card p-5">
        <h2 className="text-center mb-4 text-gradient">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Reset Token"
            value={resetToken}
            onChange={(e) => setResetToken(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-4"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button className="btn btn-outline-light w-100 login-btn" type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
