import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import { useContext, useEffect } from "react";
import ContextProvider from "./Context/Provider";

const App = () => {
  const [{ currentUser }] = useContext(ContextProvider);

  useEffect(() => {
    localStorage.setItem("SocialUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/login"
            exact
            element={!currentUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            exact
            element={!currentUser ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:username"
            exact
            element={currentUser ? <Profile /> : <Navigate to="/login" />}
          />
          {/* <Register /> */}
          <Route
            path="/"
            exact
            element={currentUser ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
