import "./Topbar.css";
import {
  Chat,
  Logout,
  Notifications,
  Person,
  Search,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import ContextProvider from "../../Context/Provider";
import { PF } from "../../axios";

const Topbar = () => {
  const [{ currentUser }, dispatch] = useContext(ContextProvider);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT_USER",
    });
    navigate("/login");
  };

  return (
    <>
      <div className="topbar">
        <div className="topStart">
          <div className="topLeft">
            <Link to="/">
              <div className="logo">Social</div>
            </Link>
          </div>
          <div className="topCenter">
            <div className="searchBar">
              <Search />
              <input placeholder="Search for friend, post or video" />
            </div>
          </div>
        </div>
        <div className="topEnd">
          <div className="topRight">
            <div className="topbarLinks">
              <Link to="/">
                <span>Homepage</span>
              </Link>
            </div>
            <div className="topbarIcons">
              <div className="topbarIconItem">
                <Person />
                <span>1</span>
              </div>
              <div className="topbarIconItem">
                <Chat />
                <span>1</span>
              </div>
              <div className="topbarIconItem">
                <Notifications />
                <span>1</span>
              </div>
            </div>
            <div className="userProfileLogout">
              <Link to={`/profile/${currentUser.username}`}>
                <img src={PF + currentUser?.profilePic + ".jpeg"} alt="" />
              </Link>
              <span onClick={handleLogout}>
                Logout <Logout />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
