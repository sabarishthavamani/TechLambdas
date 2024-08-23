import React, { useState } from "react";
import "./Login.css";
import loginImage from "../../images/Side-img.png"; 
import logo from "../../images/Logo.png"; 
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill in the login details");
    } else {
      nav('/Purchaseview')
    }
  };

  return (
    <div className="login-container">
      <div className="login-details">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-text">
            <h2>Welcome Back!</h2>
            <h2 style={{ color: "blue" }}>Sign in to</h2>
            <h3>Loren Ipsum is Simple</h3>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={handleTogglePassword}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
      <div className="login-image">
        <img src={loginImage} alt="Login" />
        <img src={logo} alt="logo" />
        <div className="welcome-text">
          <h2>
            <span className="second-part">Welcome to </span>
            <span className="first-part">TechLambdas</span>
          </h2>
          <h2>
            <span className="first-part">PVT ltd</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
