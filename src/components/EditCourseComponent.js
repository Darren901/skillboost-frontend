import { React, useEffect, useState } from "react";
import CourseService from "../services/course.service";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBTextArea,
  MDBFile,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";

const EditCourseComponent = (props) => {
  const {
    centredModal1,
    setCentredModal1,
    handleOpenEditView,
    editCourseData,
    fetchCourses,
  } = props;
  const [saveCourseData, setSaveCourseData] = useState({
    title: "",
    description: "",
    content: "",
    price: "",
    image: "images/react.jpg",
  });

  useEffect(() => {
    if (editCourseData) {
      setSaveCourseData({
        title: editCourseData?.title || "",
        description: editCourseData?.description || "",
        content: editCourseData?.content || "",
        price: editCourseData?.price || "",
        videoUrl: editCourseData?.videoUrl || "",
        image: editCourseData?.image || "images/react.jpg",
      });
    }
  }, [editCourseData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSaveCourseData((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
      file,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSaveCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveCourse = async () => {
    try {
      await CourseService.updateCourse(
        editCourseData._id,
        saveCourseData.title,
        saveCourseData.description,
        saveCourseData.price,
        saveCourseData.file,
        saveCourseData.content,
        saveCourseData.videoUrl
      );
      Swal.fire({
        icon: "success",
        title: "編輯成功",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      setCentredModal1(!centredModal1);
      fetchCourses();
    } catch (e) {
      const errorMessage = e.response?.data || "請稍後再試";
      Swal.fire({
        icon: "error",
        title: "編輯失敗",
        text: errorMessage,
      });
      setCentredModal1(!centredModal1);
    }
  };

  return (
    <div>
      <MDBModal
        tabIndex="-1"
        open={centredModal1}
        onClose={() => setCentredModal1(false)}
      >
        <MDBModalDialog centered style={{ maxWidth: "650px" }}>
          <MDBModalContent style={{ padding: "10px 30px" }}>
            <MDBModalHeader>
              <MDBModalTitle>編輯課程</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => handleOpenEditView(null)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div
                className="edit-img-conatiner mb-4"
                style={{
                  width: "200px",
                  height: "200px",
                  overflow: "hidden",
                  borderRadius: "20px",
                  margin: "auto",
                }}
              >
                <img
                  src={saveCourseData.image}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <form>
                <MDBFile
                  className="mb-4"
                  d="formFileMultiple"
                  onChange={handleImageChange}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  id="form6Example3"
                  label="課程名稱"
                  value={saveCourseData.title}
                  onChange={handleInputChange}
                  name="title"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  id="form6Example4"
                  label="課程簡介"
                  value={saveCourseData.description}
                  onChange={handleInputChange}
                  name="description"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  id="form6Example4"
                  label="播放清單網址"
                  value={saveCourseData.videoUrl}
                  onChange={handleInputChange}
                  name="videoUrl"
                />
                <MDBTextArea
                  wrapperClass="mb-4"
                  id="form6Example7"
                  rows={6}
                  label="課程描述"
                  value={saveCourseData.content}
                  style={{ resize: "none" }}
                  onChange={handleInputChange}
                  name="content"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  type="number"
                  id="form6Example5"
                  label="價格"
                  value={saveCourseData.price}
                  onChange={handleInputChange}
                  name="price"
                />
              </form>
            </MDBModalBody>
            <MDBModalFooter className="d-flex justify-content-center">
              <MDBBtn
                color="secondary"
                onClick={() => handleOpenEditView(null)}
              >
                關閉
              </MDBBtn>
              <MDBBtn onClick={handleSaveCourse}>儲存</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default EditCourseComponent;
