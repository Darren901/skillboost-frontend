import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heroes from "../components/Heroes";
import Top5Courses from "../components/Top5Courses";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

const Home = (props) => {
  const { currentUser } = props;
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleRegisterLink = () => {
    navigate("/register");
  };

  const handleStartLink = () => {
    navigate("/Courses");
  };

  return (
    <div className="homePage ">
      <MDBCarousel
        showIndicators
        className={`homeCarousel ${loaded ? "loaded" : ""}`}
      >
        <MDBCarouselItem itemId={1}>
          <img
            src="images/Teacher2.png"
            className="d-block w-100 carousel-img"
            alt="..."
          />
          <div className="carousel-caption">
            <h1>SKILL BOOST</h1>
            <h4>高效學習，快速提升你的技能！</h4>
            {!currentUser && (
              <button
                className="btn btn-primary mt-3"
                onClick={handleRegisterLink}
              >
                立即註冊
              </button>
            )}
            {currentUser && (
              <button
                className="btn btn-primary mt-3"
                onClick={handleStartLink}
              >
                開始探索
              </button>
            )}
          </div>
        </MDBCarouselItem>
        <MDBCarouselItem itemId={2}>
          <img
            src="images/Teacher.png"
            className="d-block w-100 carousel-img"
            alt="..."
          />
          <div className="carousel-caption">
            <h1>ACHIEVE SUCCESS</h1>
            <h4>成就每位學員，實現你的學習夢想！</h4>
            {!currentUser && (
              <button
                className="btn btn-primary mt-3"
                onClick={handleRegisterLink}
              >
                立即註冊
              </button>
            )}
            {currentUser && (
              <button
                className="btn btn-primary mt-3"
                onClick={handleStartLink}
              >
                開始探索
              </button>
            )}
          </div>
        </MDBCarouselItem>
      </MDBCarousel>
      <Top5Courses currentUser={currentUser} />
      <Heroes />
    </div>
  );
};

export default Home;
