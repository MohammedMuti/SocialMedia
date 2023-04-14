import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.css";
import { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import ContextProvider from "../../Context/Provider";
import { useLocation } from "react-router-dom";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const [{ currentUser }] = useContext(ContextProvider);

  const location = useLocation();

  useEffect(() => {
    const fetchFeedPosts = async () => {
      try {
        const res = username
          ? await axios.get(`/posts/profile/${username}`)
          : await axios.get(`/posts/timeline/${currentUser?._id}`);
        console.log(res.data);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFeedPosts();
  }, [username, currentUser]);

  console.log(posts);

  return (
    <>
      <div className="feed">
        <div className="feedWrapper">
          {username !== currentUser.username ? null : <Share />}
          {location.pathname === "/" ? <Share /> : null}

          {posts?.map((post) => {
            return <Post post={post} key={post._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Feed;
