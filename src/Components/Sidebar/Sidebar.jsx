import {
  Bookmark,
  Event,
  Group,
  HelpOutline,
  Message,
  PlayCircleFilledOutlined,
  RssFeed,
  School,
  WorkOutline,
} from "@mui/icons-material";
import "./Sidebar.css";
import axios, { PF } from "../../axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("/users");
        setUsers(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <ul>
            <li>
              <RssFeed />
              Feed
            </li>
            <li>
              <Message />
              Chats
            </li>
            <li>
              <PlayCircleFilledOutlined />
              Videos
            </li>
            <li>
              <Group />
              Groups
            </li>
            <li>
              <Bookmark />
              Bookmarks
            </li>
            <li>
              <HelpOutline />
              Questions
            </li>
            <li>
              <WorkOutline />
              Jobs
            </li>
            <li>
              <Event />
              Events
            </li>
            <li>
              <School />
              Courses
            </li>
          </ul>
          <button>Show More</button>
          <hr />
          <div className="friendList">
            <ul>
              {users?.map((user) => {
                return (
                  <>
                    <Link to={`/profile/${user.username}`}>
                      <li>
                        <img src={PF + user.profilePic + ".jpeg"} alt="" />
                        <span>{user.username}</span>
                      </li>
                    </Link>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
