import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import { MDBBtn } from "mdb-react-ui-kit";

const Profile = (props) => {
  const { currentUser, setCurrentUser, handleLoading } = props;
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(() => ({
    username: currentUser?.foundUser?.username || "",
    description: currentUser?.foundUser?.description || "",
    image: currentUser?.foundUser?.image || "/images/profile.jpg",
  }));

  useEffect(() => {
    if (!currentUser?.foundUser) {
      navigate("/login");
      return;
    }
  }, [currentUser, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileData((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
      file,
    }));
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath === "") {
      return "/images/profile.jpg";
    }

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return imagePath;
  };

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    Swal.fire({
      title: "確定要取消編輯嗎？",
      text: "已修改的內容將不會被保存",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "確定",
      cancelButtonText: "返回編輯",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsEditing(false);
        setProfileData({
          username: currentUser.foundUser.username,
          description: currentUser.foundUser.description,
          image: currentUser.foundUser.image || "/images/profile.jpg",
        });
      }
    });
  };

  const handleSaveClick = async () => {
    try {
      handleLoading(true);
      const response = await AuthService.editUser(
        profileData.username,
        profileData.description,
        profileData.file
      );
      const updatedImageUrl = response.data.userWithoutPassword.image;

      setProfileData((prev) => ({
        ...prev,
        image: updatedImageUrl,
      }));

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "編輯成功",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      const updateUser = {
        ...currentUser,
        foundUser: {
          ...currentUser.foundUser,
          username: profileData.username,
          description: profileData.description,
          image: updatedImageUrl,
        },
      };
      localStorage.setItem("user", JSON.stringify(updateUser));
      setCurrentUser(AuthService.getCurrentUser());
      setIsEditing(false);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "編輯失敗",
        text: e.response.data || "請稍後再試",
      });
    } finally {
      handleLoading(false);
    }
  };

  if (!currentUser?.foundUser) {
    return null;
  }

  return (
    <section style={{ backgroundColor: "#f4f5f7", height: "80vh" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div
              className="card mb-3"
              style={{
                borderRadius: ".5rem",
                transform: "scale(1.3)",
                cursor: "pointer",
              }}
            >
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                    background: "#007bff",
                    background:
                      "linear-gradient(to right bottom, rgba(0, 123, 255, 1), rgba(0, 75, 135, 1))",
                    WebkitBackground:
                      "linear-gradient(to right bottom, rgba(0, 123, 255, 1), rgba(0, 75, 135, 1))",

                    padding: "2rem",
                  }}
                >
                  <div
                    className="profile-img-container img-fluid my-5"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      margin: "auto",
                    }}
                  >
                    <img
                      src={getImageUrl(
                        isEditing
                          ? profileData.image
                          : currentUser.foundUser.image
                      )}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>
                  {isEditing ? (
                    <div className="d-flex justify-content-center mb-2">
                      <div className="col-12 col-md-6 d-flex justify-content-center">
                        <MDBBtn
                          onClick={() =>
                            document.getElementById("file-input").click()
                          }
                          style={{ padding: "0.2rem 0.5rem", fontSize: "8px" }}
                        >
                          變更圖片
                        </MDBBtn>
                        <input
                          id="file-input"
                          type="file"
                          onChange={handleImageChange}
                          style={{ display: "none" }}
                          className="mb-2 form-control"
                        />
                      </div>
                    </div>
                  ) : (
                    <input type="hidden" />
                  )}
                  <h5>{profileData.username}</h5>

                  {isEditing ? (
                    <MDBBtn
                      color="success"
                      size="sm"
                      onClick={handleSaveClick}
                      style={{ marginRight: "0.5rem" }}
                    >
                      儲存
                    </MDBBtn>
                  ) : (
                    <FaRegEdit
                      style={{ marginTop: "2rem", fontSize: "1.25rem" }}
                      onClick={handleEditClick}
                    />
                  )}

                  {isEditing && (
                    <MDBBtn
                      color="danger"
                      size="sm"
                      onClick={handleCancelClick}
                    >
                      取消
                    </MDBBtn>
                  )}
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>個人檔案</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="mb-3">
                        <h6>電子郵件</h6>
                        <p className="text-muted">
                          {currentUser.foundUser.email}
                        </p>
                      </div>
                      <div className="mb-3">
                        <h6>使用者身分</h6>
                        <p className="text-muted">
                          {currentUser.foundUser.role}
                        </p>
                      </div>
                      <div className="mb-3">
                        <h6>使用者名稱</h6>
                        {isEditing ? (
                          <div className="col-6 ">
                            <input
                              type="text"
                              name="username"
                              className="form-control"
                              value={profileData.username}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          <p className="text-muted">{profileData.username}</p>
                        )}
                      </div>
                      <div className="mb-3">
                        <h6>關於我</h6>
                        {isEditing ? (
                          <input
                            type="text"
                            class="form-control"
                            name="description"
                            value={profileData.description}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <p className="text-muted">
                            {profileData.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
