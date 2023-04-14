import Topbar from "../../Components/Topbar/Topbar";
import "./Home.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Feed from "../../Components/Feed/Feed";
import RightBar from "../../Components/RightBar/RightBar";

const Home = () => {
  return (
    <>
      <div className="home">
        <Topbar />
        <div className="homeContainer">
          <Sidebar />
          <Feed />
          <RightBar />
        </div>
      </div>
    </>
  );
};

export default Home;
