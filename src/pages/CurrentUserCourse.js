import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import CourseService from "../services/course.service";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import StarRatings from "react-star-ratings";
import UserCourses from "../components/UserCourses";
import Swal from "sweetalert2";
import EditCourseComponent from "../components/EditCourseComponent";

const CurrentUserCourse = (props) => {
  const { currentUser, handleLoading } = props;
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState([]);
  const [centredModal, setCentredModal] = useState(false);
  const [centredModal1, setCentredModal1] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [currentCourseId, setCurrentCourseId] = useState("");
  const [editCourseData, setEditCourseData] = useState(null);

  useEffect(() => {
    if (!currentUser?.foundUser) {
      navigate("/login");
      return;
    }
    fetchCourses();
  }, [currentUser, navigate]);

  const fetchCourses = async () => {
    if (!currentUser?.foundUser) return;

    const { role, _id } = currentUser.foundUser;
    try {
      handleLoading(true);
      let data;
      if (role === "instructor") {
        data = await CourseService.findByInstructorId(_id);
      } else if (role === "student") {
        data = await CourseService.findByStudentId(_id);
      }
      setCourseData(data.data);
    } catch (e) {
      setCourseData([]);
    } finally {
      handleLoading(false);
    }
  };

  const toggleOpen = () => setCentredModal(!centredModal);

  const handleOpenEditView = (courseId) => {
    const course = courseData.find((c) => c._id === courseId);
    setEditCourseData(course);
    setCentredModal1(!centredModal1);
  };

  const changeRating = (newRating) => {
    setUserRating(newRating);
  };

  const handleToCourse = () => {
    if (currentUser.foundUser.role === "student") {
      navigate("/courses");
    } else if (currentUser.foundUser.role === "instructor") {
      navigate("/AddNewCourse");
    }
  };

  const userRatingSubmit = () => {
    handleLoading(true);
    CourseService.addRatingToCourse(userRating, currentCourseId)
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "感謝您的評分~",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "發生錯誤",
        });
      })
      .finally(() => handleLoading(false));
    toggleOpen();
  };

  return (
    <div>
      {currentUser && currentUser.foundUser && (
        <div className="container">
          <div className="userCourseImage">
            {currentUser.foundUser.role === "instructor" && (
              <div className="userCourseContent">
                <h1>課程管理</h1>
                <h4>管理您的課程內容、進度和學生互動</h4>
                <MDBCard className="mdbCard">
                  <MDBCardBody>
                    <MDBCardTitle>與我們一起教學</MDBCardTitle>
                    <MDBCardText>
                      保持內容更新，讓學生獲得最新知識，提升學生的學習體驗．{" "}
                      <br />
                      開始編輯您的課程吧！
                    </MDBCardText>
                    <MDBBtn size="lg" onClick={handleToCourse}>
                      新增課程
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </div>
            )}
            {currentUser.foundUser.role === "student" && (
              <div className="userCourseContent">
                <h1>課程管理</h1>
                <h4>查看您的課程進度、學習資源，並與教師互動</h4>
                <MDBCard className="mdbCard">
                  <MDBCardBody>
                    <MDBCardTitle>與我們一起學習</MDBCardTitle>
                    <MDBCardText>
                      瀏覽您註冊的課程，查看學習資源，並進行作業提交或提問．{" "}
                      <br />
                      開始您的學習之旅吧！
                    </MDBCardText>
                    <MDBBtn onClick={handleToCourse} size="lg">
                      探索課程
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </div>
            )}
          </div>
          <br />
          <h2 className="userCourseTitle" style={{ marginLeft: "1rem" }}>
            您的課程
          </h2>
          <br />
          <hr />
          <div className="allUserCourses">
            {courseData &&
              courseData.map((data) => {
                return (
                  <UserCourses
                    data={data}
                    toggleOpen={toggleOpen}
                    currentUser={currentUser}
                    setCurrentCourseId={setCurrentCourseId}
                    handleOpenEditView={handleOpenEditView}
                    fetchCourses={fetchCourses}
                  />
                );
              })}
          </div>
        </div>
      )}
      <MDBModal
        tabIndex="-1"
        open={centredModal}
        onClose={() => setCentredModal(false)}
      >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>為您的課程評分</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <StarRatings
                rating={userRating} // 當前用戶的評分
                starRatedColor="#EAC100" // 星星顏色
                numberOfStars={5} // 星星數量
                name="userRating" // 評分名稱
                starSpacing="1px" // 星星間距
                starDimension="25px" // 星星大小
                changeRating={changeRating} // 設置點擊時的回調函數
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>
                關閉
              </MDBBtn>
              <MDBBtn onClick={userRatingSubmit}>送出評分</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <EditCourseComponent
        centredModal1={centredModal1}
        setCentredModal1={setCentredModal1}
        handleOpenEditView={handleOpenEditView}
        editCourseData={editCourseData}
        fetchCourses={fetchCourses}
      />
    </div>
  );
};

export default CurrentUserCourse;
