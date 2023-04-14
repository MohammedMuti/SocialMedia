import "./RightBar.css";
import axios, { PF } from "../../axios";
import { useContext, useEffect } from "react";
import ContextProvider from "../../Context/Provider";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";

const RightBar = ({ user }) => {
  const [{ currentUser }, dispatch] = useContext(ContextProvider);
  const [friends, setFriends] = useState([]);
  const [currentFriends, setCurrentFriends] = useState([]);
  const [followed, setFollowed] = useState();
  const userId = user?._id;

  useEffect(() => {
    setFollowed(currentUser?.following.includes(userId));
  }, [userId, currentUser]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios(`/users/friends/${userId}`);
        setFriends(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFriends();
  }, [userId, currentUser]);

  useEffect(() => {
    const fetchCurrentFriends = async () => {
      try {
        const res = await axios(`/users/friends/${currentUser?._id}`);
        setCurrentFriends(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCurrentFriends();
  }, [userId, currentUser]);

  const handleFollow = async () => {
    setFollowed(true);
    try {
      const res = await axios.put(`/users/${userId}/follow`, {
        id: currentUser._id,
      });
      dispatch({
        type: "FOLLOW",
        id: userId,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async () => {
    setFollowed(false);
    try {
      const res = await axios.put(`/users/${userId}/unfollow`, {
        id: currentUser._id,
      });
      dispatch({
        type: "UNFOLLOW",
        id: userId,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRIghtbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={require("../../images/gift.png")} alt="" />
          <span>
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className="Ad" src={require("../../images/Ad.jpg")} alt="" />
        <h4>Online Friends</h4>
        <ul>
          {currentFriends?.length > 0 &&
            currentFriends?.map((friend) => {
              return (
                <>
                  <li key={friend?.id}>
                    <Link to={`/profile/${friend.username}`}>
                      <div className="rightBarProfileImgContainer">
                        <img src={PF + friend?.profilePic + ".jpeg"} alt="" />
                        <span></span>
                      </div>
                      <span className="onlineFriend">{friend?.username}</span>
                    </Link>
                  </li>
                </>
              );
            })}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username ? (
          followed ? (
            <button onClick={handleUnfollow}>
              Unfollow <Remove />
            </button>
          ) : (
            <button onClick={handleFollow}>
              Follow <Add />
            </button>
          )
        ) : null}
        <h4 className="rightbarUserInformation">User Information</h4>
        <div className="rightBarInfo">
          <div className="rightBarInfoItem">
            <span className="key">City:</span>
            <span className="value">{user?.city}</span>
          </div>
          <div className="rightBarInfoItem">
            <span className="key">From:</span>
            <span className="value">{user?.from}</span>
          </div>
          <div className="rightBarInfoItem">
            <span className="key">Relationship:</span>
            <span className="value">
              {user?.relationship === 0
                ? "Single"
                : user?.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarUserInformation">User friends</h4>
        <div className="rightBarFollowings">
          {friends?.length > 0 &&
            friends?.map((friend) => {
              return (
                <Link key={friend?._id} to={`/profile/${friend?.username}`}>
                  <div className="rightBarFollowing">
                    <img src={PF + friend.profilePic + ".jpeg"} alt="" />
                    <span>{friend?.username}</span>
                  </div>
                </Link>
              );
            })}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="rightBar">
        <div className="rightBarWrapper">
          {user ? <ProfileRightbar /> : <HomeRIghtbar />}
        </div>
      </div>
    </>
  );
};

export default RightBar;
