import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdLabelImportant } from "react-icons/md";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBCard,
  MDBCardBody,
  MDBBadge,
} from "mdb-react-ui-kit";
import CommentBoard from "../components/CommentBoard";
import CourseVideo from "../components/CourseVideo";
import CourseService from "../services/course.service";

const CourseDetail = (props) => {
  const { currentUser, handleLoading } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (location.state?.courseData?._id) {
        handleLoading(true);
        try {
          const response = await CourseService.findByCourseId(
            location.state.courseData._id
          );
          setCourseData(response.data);
        } catch (e) {
          console.error(e);
          navigate("/courses");
        } finally {
          handleLoading(false);
        }
      } else {
        navigate("/courses");
      }
    };

    fetchCourse();
  }, []);

  const handleCourseUpdate = async (updatedCourse) => {
    try {
      handleLoading(true);
      const response = await CourseService.findByCourseId(updatedCourse._id);
      setCourseData(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      handleLoading(false);
    }
  };

  if (!courseData) return <div>Loading...</div>;

  return (
    <MDBContainer className="py-5">
      <MDBCard className="mb-4">
        <MDBCardBody className="d-flex align-items-center">
          <h4>
            <MDBBadge
              className="ms-2"
              color="success"
              style={{
                marginRight: "1rem",
              }}
            >
              專業認證
            </MDBBadge>
          </h4>
          <MDBTypography tag="h2" className="mb-1">
            {courseData?.title}
          </MDBTypography>
        </MDBCardBody>
      </MDBCard>

      <MDBRow>
        <MDBCol size="12" lg="8" className="mb-4">
          <CourseVideo playlistUrl={courseData.videoUrl} />
        </MDBCol>

        <MDBCol size="12" lg="4">
          <MDBCard className="shadow-4 mb-4">
            <MDBCardBody>
              <MDBTypography tag="h5" className="mb-3">
                <BsFillBookmarkCheckFill
                  style={{
                    height: "25px",
                    width: "25px",
                    marginRight: "0.25rem",
                    color: "#2894FF",
                  }}
                />
                課程資訊
              </MDBTypography>
              <div className="mb-2">
                <strong>講師：</strong> {courseData.instructor.username}
              </div>
              <div className="mb-2">
                <strong>電子郵件：</strong> {courseData.instructor.email}
              </div>
              <div className="mb-2">
                <strong>價格：</strong> ${courseData.price}
              </div>
              <div className="mb-2">
                <strong>評分：</strong> {courseData.averageRating.toFixed(1)} /
                5
              </div>
              <div className="mb-2">
                <strong>學生數：</strong> {courseData.students.length}
              </div>
            </MDBCardBody>
          </MDBCard>
          <MDBCard className="shadow-4 mb-4">
            <MDBCardBody>
              <MDBTypography tag="h4" className="mb-4">
                <MdLabelImportant
                  style={{
                    height: "25px",
                    width: "25px",
                    marginRight: "0.25rem",
                    color: "orangered",
                  }}
                />
                課程簡介
              </MDBTypography>
              <MDBTypography>{courseData.description}</MDBTypography>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <hr />
      <CommentBoard
        courseData={courseData}
        currentUser={currentUser}
        onCourseUpdate={handleCourseUpdate}
      />
    </MDBContainer>
  );
};

export default CourseDetail;
