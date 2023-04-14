import { useEffect, useState } from "react";
import Feed from "../../Components/Feed/Feed";
import RightBar from "../../Components/RightBar/RightBar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import "./Profile.css";
import axios, { PF } from "../../axios";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState();
  const location = useLocation();
  const username = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/find?username=${username}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="coverImg"
                src={require("../../images/BackG.jpg")}
                alt=""
              />
              <img
                className="userImg"
                src={PF + user?.profilePic + ".jpeg"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4>{user?.username}</h4>
              <span>{user?.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
