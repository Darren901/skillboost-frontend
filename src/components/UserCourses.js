import { React, useState } from "react";
import { MDBProgress, MDBProgressBar, MDBBtn } from "mdb-react-ui-kit";
import StarRatings from "react-star-ratings";
import { CiStar } from "react-icons/ci";
import CourseService from "../services/course.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UserCourses = (props) => {
  const navigate = useNavigate();
  const {
    data,
    currentUser,
    toggleOpen,
    setCurrentCourseId,
    handleOpenEditView,
    fetchCourses,
  } = props;

  const handleRatingClick = (e) => {
    e.stopPropagation();
    setCurrentCourseId(data._id);
    toggleOpen();
  };

  const handleDeleteCourse = (e) => {
    e.stopPropagation();
    Swal.fire({
      title: "確定刪除此課程嗎?",
      text: "此動作無法復原。",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "確定",
      cancelButtonText: "取消",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        CourseService.deleteCourse(data._id)
          .then((response) => {
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: response.data,
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            fetchCourses();
          })
          .catch((e) => {
            Swal.fire({
              icon: "error",
              title: "刪除失敗",
              text: e.message,
            });
          });
      }
    });
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    handleOpenEditView(data._id);
  };

  const handleCardClick = () => {
    navigate("/CourseDetail", { state: { courseData: data } });
  };

  return (
    <div onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <div className="row g-3">
        <div className="col-12">
          <div
            className="card"
            style={{ width: "17rem", maxHeight: "24rem", overflow: "hidden" }}
          >
            <div
              className="img-container"
              style={{ width: "100%", height: "200px", overflow: "hidden" }}
            >
              <img
                src={data.image ? data.image : "/images/react.jpg"}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>

            <div
              className="card-body"
              style={{ height: "calc(100% - 200px)", overflow: "hidden" }}
            >
              <h5
                className="card-title mb-1"
                style={{
                  height: "2rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {data.title}
              </h5>
              <p style={{ margin: "0", fontSize: "0.8rem" }} className="mb-1">
                導師名稱: {data.instructor.username}
              </p>
              <p style={{ margin: "0", fontSize: "0.8rem" }} className="mb-2">
                學生人數: {data.students.length}
              </p>

              {currentUser && currentUser.foundUser.role === "instructor" && (
                <div onClick={(e) => e.stopPropagation()}>
                  <div className="rating mb-3" style={{ fontSize: "0.6rem" }}>
                    <span style={{ fontWeight: "700", fontSize: "0.7rem" }}>
                      {data.averageRating.toFixed(1)} &thinsp;
                    </span>
                    <StarRatings
                      rating={data.averageRating}
                      starRatedColor="#EAC100"
                      numberOfStars={5}
                      name="rating"
                      starSpacing="1px"
                      starDimension="14px"
                    />
                    ({data.ratings.length})
                  </div>
                  <MDBBtn
                    className="me-1"
                    color="primary"
                    onClick={handleEditClick}
                  >
                    編輯課程
                  </MDBBtn>
                  <MDBBtn
                    className="me-1"
                    color="danger"
                    onClick={handleDeleteCourse}
                  >
                    刪除課程
                  </MDBBtn>
                </div>
              )}

              {currentUser && currentUser.foundUser.role === "student" && (
                <div onClick={(e) => e.stopPropagation()}>
                  <MDBProgress className="mb-3">
                    <MDBProgressBar
                      className="w-75"
                      valuenow={75}
                      valuemin={0}
                      valuemax={100}
                    />
                  </MDBProgress>
                  <MDBBtn
                    className="me-1"
                    color="success"
                    onClick={handleCardClick}
                  >
                    學習討論
                  </MDBBtn>
                  <MDBBtn
                    className="me-1"
                    color="warning"
                    onClick={handleRatingClick}
                  >
                    <CiStar
                      style={{
                        height: "15px",
                        width: "15px",
                        marginRight: "0.25rem",
                      }}
                    />
                    點擊評分
                  </MDBBtn>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCourses;
