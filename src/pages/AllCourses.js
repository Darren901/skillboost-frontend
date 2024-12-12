import { React, useEffect, useState } from "react";
import Search from "../components/Search";
import Courses from "../components/Courses";
import CourseService from "../services/course.service";
import { Link, useNavigate } from "react-router-dom";

const AllCourses = (props) => {
  const navigate = useNavigate();

  let { currentUser, handleLoading } = props;
  const [courseData, setCourseData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    findAllCourses();
  }, []);

  const findAllCourses = () => {
    if (currentUser && currentUser.foundUser) {
      handleLoading(true);
      CourseService.findAllCourse()
        .then((data) => {
          setCourseData(data.data);
          setLoaded(true);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          handleLoading(false);
        });
    } else {
      navigate("/login");
    }
  };

  const handleSearch = () => {
    if (searchInput == "") return;
    handleLoading(true);
    CourseService.findByNameLike(searchInput)
      .then((data) => {
        setCourseData(data.data);
      })
      .catch((e) => {
        setCourseData([]);
      })
      .finally(() => {
        handleLoading(false);
      });
  };

  return (
    <div className="container">
      <div className={`all-courses ${loaded ? "loaded" : ""}`}>
        <Search
          handleSearch={handleSearch}
          setSearchInput={setSearchInput}
          findAllCourses={findAllCourses}
        />
        {currentUser && courseData && courseData.length !== 0 && (
          <div className="course-card">
            {courseData.map((data) => (
              <Link to="/Productinfo" state={{ courseData: data }}>
                <Courses data={data} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
