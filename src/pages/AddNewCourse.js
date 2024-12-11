import { React } from "react";
import { useState, useEffect } from "react";
import CourseService from "../services/course.service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddNewCourse = (props) => {
  const navigate = useNavigate();
  const { currentUser, handleLoading } = props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [imageFile, setImageFile] = useState(null);
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [preView, setPreView] = useState("");

  useEffect(() => {
    if (!currentUser || !currentUser.foundUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    return () => {
      if (preView) {
        URL.revokeObjectURL(preView);
      }
    };
  }, [preView]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    setPreView(URL.createObjectURL(file));
    setImageFile(file);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleVideoUrl = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleAddCourse = () => {
    handleLoading(true);
    CourseService.addNewCourse(
      title,
      description,
      price,
      imageFile,
      content,
      videoUrl
    )
      .then(() => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "課程創建成功！",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        setPreView("");
        navigate("/CurrentUserCourse");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "發生錯誤",
          text: error.response.data,
        });
      })
      .finally(() => handleLoading(false));
  };
  return (
    <div className="addNewCourse">
      {currentUser && currentUser.foundUser.role !== "instructor" && (
        <div>
          <h2>只有講師可以發布新課程。</h2>
        </div>
      )}
      {currentUser && currentUser.foundUser.role == "instructor" && (
        <div className="newCourseBox">
          <div className="addNewCourseImage"></div>
          <div className="newCourseForm">
            <h2>創建新課程</h2>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                課程名稱
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="請輸入課程名稱..."
                name="title"
                onChange={handleTitle}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                課程簡介
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="請簡要描述課程內容(30字以內)"
                name="description"
                onChange={handleDescription}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                播放清單網址
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="請貼上您為學員準備好的Youtube播放清單"
                name="description"
                onChange={handleVideoUrl}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                課程描述
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="請介紹你的課程內容..."
                name="content"
                onChange={handleContent}
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                價格
              </label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="請輸入課程價格..."
                name="price"
                onChange={handlePrice}
              />
            </div>
            {preView && (
              <div className="d-flex justify-content-center align-items-center mb-3">
                <img
                  src={preView}
                  alt="預覽圖片"
                  style={{
                    height: "300px",
                    width: "300px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            <div class="mb-4">
              <label for="formFile" class="form-label">
                課程圖片
              </label>
              <input
                class="form-control"
                type="file"
                id="formFile"
                onChange={handleImageFile}
              />
            </div>
            <div class="d-grid gap-2">
              <button
                class="btn btn-primary"
                type="button"
                onClick={handleAddCourse}
              >
                新增課程
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewCourse;
