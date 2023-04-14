import {
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
  MoreVert,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import "./Post.css";
import axios, { PF } from "../../axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import ContextProvider from "../../Context/Provider";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [{ currentUser }] = useContext(ContextProvider);
  const [user, setUser] = useState();

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post._id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/find?userId=${post.userId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [post.userId]);

  const handleLike = async () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    try {
      const res = await axios.put(`/posts/${post?._id}/like`, {
        userId: currentUser._id,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user?.username}`}>
                <img src={PF + user?.profilePic + ".jpeg"} alt="" />
              </Link>
              <span className="postUsername">{user?.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
          </div>
          <div className="postCenter">
            <span>{post?.desc}</span>
            <img src={post?.image} alt="" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              {isLiked ? (
                <>
                  <ThumbUp onClick={handleLike} className="thumbsUp" />
                  <Favorite onClick={handleLike} className="like" />
                </>
              ) : (
                <>
                  <ThumbUpOutlined onClick={handleLike} className="thumbsUp" />
                  <FavoriteBorder onClick={handleLike} className="like" />
                </>
              )}
              <span>{like} people like it</span>
            </div>
            <div className="postBottomRight">
              <span>{post.comment} comments</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
