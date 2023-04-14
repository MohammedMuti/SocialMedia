import { useState } from "react";
import "./Register.css";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(email, username, password, passwordAgain);
    if (password !== passwordAgain) {
      return setError("PASWORD_MISMATCH");
    } else {
      setError("");
    }
    try {
      const res = await axios.post("/auth/register", {
        email,
        username,
        password,
      });
      if (res.data === "USEREXISTS") {
        return setError("USEREXISTS");
      }
      setError("");
      navigate("/login");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleError = (error) => {
    switch (error) {
      case "USEREXISTS":
        return "Username or Email is already Registered";

      case "PASWORD_MISMATCH":
        return "The passwords does not Match";

      default:
        return null;
    }
  };

  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3>Socail Media</h3>
            <span>
              Connect with friends and the world around you on Socail Media.
            </span>
          </div>
          <div className="loginRight">
            <div className="loginBox">
              <input
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                type="email"
                placeholder="Email"
                name=""
                id=""
              />
              <input
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                type="text"
                placeholder="Username"
                name=""
                id=""
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                type="password"
                placeholder="Password"
                name=""
                id=""
              />
              <input
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.currentTarget.value)}
                type="password"
                placeholder="Password Again"
                name=""
                id=""
              />
              <button
                className="loginBtn"
                type="submit"
                onClick={handleRegister}
              >
                Sign Up
              </button>
              {error && <p style={{ color: "red" }}>{handleError(error)}</p>}
              <button className="loginRegister">
                <Link to={`/login`}>Log into Account</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
