import "./Share.css";
import { EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material";
import { useContext, useState } from "react";
import ContextProvider from "../../Context/Provider";
import axios, { PF } from "../../axios";

const Share = () => {
  const [{ currentUser }] = useContext(ContextProvider);
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/posts", {
        userId: currentUser._id,
        desc,
      });
      console.log(res.data);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img src={PF + currentUser?.profilePic + ".jpeg"} alt="" />
            <input
              placeholder={`What's on your mind ${currentUser?.username}?`}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              name="desc"
              id="desc"
            />
          </div>
          <hr />
          <form className="shareBottom" onSubmit={handleSubmit}>
            <div className="shareOptions">
              <div className="shareOption">
                <PermMedia className="tomato" />
                <span>Photo or Video</span>
              </div>
              <div className="shareOption">
                <Label className="blue" />
                <span>Tag</span>
              </div>
              <div className="shareOption">
                <Room className="green" />
                <span>Location</span>
              </div>
              <div className="shareOption">
                <EmojiEmotions className="gold" />
                <span>Feelings</span>
              </div>
            </div>
            <button type="submit">Share</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Share;
