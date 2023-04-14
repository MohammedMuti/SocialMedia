import { useState } from "react";
import "./Login.css";
import axios from "../../axios";
import { useContext } from "react";
import ContextProvider from "../../Context/Provider";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ currentUser, isFetching }, dispatch] = useContext(ContextProvider);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
      isFetching: true,
    });
    console.log(email, password);
    try {
      const res = await axios.post("/auth/login", {
        email: email,
        password: password,
      });
      console.log(res.data);
      if (res.data === "USER_NOT_FOUND" || res.data === "WRONG_PASSWORD") {
        dispatch({
          type: "LOGIN_START",
          isFetching: false,
        });
        return setError("USER_NOT_FOUND");
      }
      setError("");
      dispatch({
        type: "SET_USER",
        currentUser: res.data,
        isFetching: false,
      });
      navigate("/");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleError = (error) => {
    switch (error) {
      case "USER_NOT_FOUND":
        return "Invalid Username or Password";

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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="Email"
                name=""
                id=""
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder="Password"
                name=""
                id=""
              />
              <button
                className="loginBtn"
                type="submit"
                onClick={handleLogin}
                style={{ color: "white" }}
                disabled={isFetching}
              >
                {isFetching ? <CircularProgress size={25} /> : "Login"}
              </button>
              {error && <p style={{ color: "red" }}>{handleError(error)}</p>}
              <span>Forgot Password</span>
              <button className="loginRegister" disabled={isFetching}>
                {isFetching ? (
                  <CircularProgress size={25} />
                ) : (
                  <Link to={`/register`}>Create a New Account</Link>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
