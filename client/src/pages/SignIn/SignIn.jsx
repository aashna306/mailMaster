import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/userSlice";
import { toast } from "react-hot-toast";
import "./sign.scss";
import { Link } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginToastId = toast.loading("Logging in...");

    dispatch(loginUser({ username, password }))
      .unwrap()
      .then(() => {
        toast.success("Login successful!", { id: loginToastId });
        navigate("/edit");
        setUsername("");
        setPassword("");
      })
      .catch(() => {
        toast.error("Login failed. Please try again.", { id: loginToastId });
      });
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-box">
        <h2 className="sign-in-title">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <span className="spinner"></span> : "Log in"}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <a href="/forgot-password" className="forgot-password">
          Forgot password
        </a>
        <div className="divider"></div>
        <button className="signup-button"><Link to="/signup">Sign up</Link></button>
      </div>
    </div>
  );
};

export default SignIn;
