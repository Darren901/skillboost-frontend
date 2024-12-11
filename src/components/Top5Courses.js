import React, { useEffect, useState, useRef } from "react";
import { MdLocalFireDepartment } from "react-icons/md";
import Courses from "../components/Courses";
import CourseService from "../services/course.service";
import { Link } from "react-router-dom";

const Top5Courses = (props) => {
  const { currentUser } = props;
  const [courseData, setCourseData] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    CourseService.findTop5Courses()
      .then((data) => {
        setCourseData(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-up");
          }
        });
      },
      { threshold: 0.5 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [courseData]);

  return (
    <div className="top5-courses">
      <div className="top5-courses-subtitle">
        <h4>TOP5</h4>
        <span className="fire">
          <MdLocalFireDepartment
            style={{ color: "orangered", height: "50px", width: "50px" }}
          />
        </span>
      </div>
      <div className="top5-courses-title">
        <p className="h4">學生評價最高的五門熱門課程，馬上了解！</p>
      </div>
      <div className="top5-courses-card">
        {!currentUser ? (
          <div className="login-prompt">
            <Link
              to="/login"
              className="btn btn-primary"
              style={{ padding: "1rem 3rem", fontSize: "1.1rem" }}
            >
              立即登入
            </Link>
          </div>
        ) : (
          courseData.map((data, index) => (
            <Link
              key={index}
              to="/Productinfo"
              state={{ courseData: data }}
              ref={(el) => (cardRefs.current[index] = el)}
              className="course-card"
            >
              <Courses data={data} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Top5Courses;
