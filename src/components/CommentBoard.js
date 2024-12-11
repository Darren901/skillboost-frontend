import React, { useState } from "react";
import CourseService from "../services/course.service";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBTextArea,
  MDBBtn,
  MDBTypography,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBSpinner,
  MDBBadge,
} from "mdb-react-ui-kit";
import { FiSend } from "react-icons/fi";
import { FaRegComments } from "react-icons/fa";
import Swal from "sweetalert2";

const CommentBoard = ({ courseData, onCourseUpdate, currentUser }) => {
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const isInstructor = (userId) => {
    return courseData.instructor._id === userId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true);
    try {
      const response = await CourseService.addComment(
        courseData._id,
        newComment
      );
      if (response.data) {
        await onCourseUpdate(response.data);
        setNewComment("");
      }
    } catch (e) {
      console.error("Error adding comment:", e);
      setErrorMsg("新增留言失敗");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMsg = (commentId) => {
    Swal.fire({
      title: "確定要刪除留言嗎？",
      text: "刪除後的內容將不會被保存",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "確定",
      cancelButtonText: "返回訊息頁面",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response = await CourseService.deleteMessage(
            courseData._id,
            commentId
          );
          await onCourseUpdate(response.data);
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "刪除成功！",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        } catch (e) {
          console.log(e);
          Swal.fire({
            icon: "error",
            title: "刪除失敗",
            text: "請稍後再試",
          });
        }
      }
    });
  };

  return (
    <MDBContainer className="py-4">
      <MDBCard className="shadow-5">
        <MDBCardHeader className="bg-primary text-white">
          <MDBTypography tag="h5" className="mb-0">
            <FaRegComments
              style={{ marginRight: "0.5rem", height: "25px", width: "25px" }}
            />
            {courseData?.title || "課程"} - 討論區
          </MDBTypography>
        </MDBCardHeader>

        <MDBCardBody>
          <form onSubmit={handleSubmit}>
            <MDBTextArea
              label="寫下你的想法..."
              rows={5}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-3"
              style={{ resize: "none" }}
            />
            <MDBBtn
              type="submit"
              disabled={isLoading || !newComment.trim()}
              className="mb-4"
            >
              {isLoading ? (
                <>
                  <MDBSpinner size="sm" className="me-2" />
                  發送中...
                </>
              ) : (
                <>
                  <FiSend
                    style={{
                      height: "15px",
                      width: "15px",
                      marginRight: "0.5rem",
                    }}
                  />
                  發送留言
                </>
              )}
            </MDBBtn>
          </form>

          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}

          <div className="comments-section">
            {courseData.comments?.length === 0 ? (
              <div className="text-center text-muted my-4">
                <p>目前還沒有留言，來當第一個留言的人吧！</p>
              </div>
            ) : (
              courseData.comments?.map((comment, index) => (
                <MDBCard key={comment._id} className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol size="12" md="2" className="text-center">
                        <img
                          src={
                            comment.userId?.image
                              ? comment.userId?.image
                              : "/images/profile.jpg"
                          }
                          className="rounded-circle img-fluid"
                          alt="user avatar"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            transform: "none",
                          }}
                        />
                      </MDBCol>
                      <MDBCol size="12" md="10" className="mt-sm-0 mt-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center">
                            <h6 className="fw-bold mb-0">
                              {comment.userId.username || "使用者"}
                            </h6>
                            {isInstructor(comment.userId._id) && (
                              <MDBBadge color="success" pill className="ms-2">
                                導師
                              </MDBBadge>
                            )}
                          </div>
                          <small className="text-muted">
                            {new Date(
                              comment.createdAt || comment.date
                            ).toLocaleDateString("zh-TW")}
                          </small>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <p className="text-muted">{comment.commentText}</p>
                          {currentUser.foundUser._id === comment.userId._id && (
                            <MDBBtn
                              color="danger"
                              onClick={() => handleDeleteMsg(comment._id)}
                            >
                              刪除
                            </MDBBtn>
                          )}
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              ))
            )}
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default CommentBoard;
