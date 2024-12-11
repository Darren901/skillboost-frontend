import { React, useState, useEffect } from "react";
import CourseService from "../services/course.service";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const Search = (props) => {
  const { handleSearch, setSearchInput, findAllCourses } = props;
  const [searchInputLocal, setSearchInputLocal] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInputLocal === "") {
        setFilteredCourses([]);
      } else {
        CourseService.findByNameLike(searchInputLocal)
          .then((data) => {
            setFilteredCourses(data.data);
          })
          .catch(() => {
            setFilteredCourses([]);
          });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchInputLocal]);

  const handleInput = (e) => {
    if (e.target.value == "") {
      findAllCourses();
    }
    setSearchInputLocal(e.target.value);
    setSearchInput(e.target.value);
  };

  return (
    <div className="search">
      <div className="search-group">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="請輸入課程名稱..."
            onChange={handleInput}
          />
          <button class="btn btn-primary" type="submit" onClick={handleSearch}>
            <BiSearch style={{ height: "25px", width: "25px" }} />
          </button>
        </div>
        <div class="dropdown">
          <ul
            className="dropdown-menu"
            style={{
              display: setSearchInputLocal ? "block" : "none",
              width: "90%",
              marginTop: "0",
            }}
          >
            {filteredCourses.length > 0 &&
              filteredCourses.map((course) => (
                <li>
                  <Link
                    to="/Productinfo"
                    state={{ courseData: course }}
                    className="dropdown-item"
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
