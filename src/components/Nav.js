import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { PiShoppingCartSimple } from "react-icons/pi";
import Swal from "sweetalert2";

const Nav = (props) => {
  let { currentUser, setCurrentUser, cartItemCount } = props;

  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "登出成功",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  };

  return (
    <header
      id="sticky-header"
      className={`p-3 bg-light ${shadow ? "shadow-lg" : ""}`}
      style={{
        position: "sticky",
        top: "0",
        zIndex: "500",
      }}
    >
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start ">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none me-4"
            style={{ fontSize: "1.5rem", fontWeight: "700" }}
          >
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 1024 1024"
              className="icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M832 384l8 1.6-1.6 8 1.6 3.2-4.8 3.2-44.8 161.6-16-4.8 40-147.2-260.8 144-158.4 284.8-11.2-6.4-6.4 6.4-176-176 11.2-11.2 163.2 163.2 147.2-265.6-294.4-297.6 11.2-11.2v-8h9.6l3.2-3.2 3.2 3.2L664 208l1.6 16-395.2 22.4 278.4 278.4 276.8-153.6 6.4 12.8z"
                fill="#050D42"
              />
              <path
                d="M896 384c0 35.2-28.8 64-64 64s-64-28.8-64-64 28.8-64 64-64 64 28.8 64 64z m-656-32c-62.4 0-112-49.6-112-112s49.6-112 112-112 112 49.6 112 112-49.6 112-112 112z m304 336c-80 0-144-64-144-144s64-144 144-144 144 64 144 144-64 144-144 144z m-224 144c0-35.2 28.8-64 64-64s64 28.8 64 64-28.8 64-64 64-64-28.8-64-64z m-144-176c0-17.6 14.4-32 32-32s32 14.4 32 32-14.4 32-32 32-32-14.4-32-32z m448-440c0-22.4 17.6-40 40-40s40 17.6 40 40-17.6 40-40 40-40-17.6-40-40zM736 560c0-27.2 20.8-48 48-48s48 20.8 48 48-20.8 48-48 48-48-20.8-48-48z"
                fill="#2F4BFF"
              />
            </svg>
            SKILL BOOST
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link
                to="/"
                className="nav-link px-2 me-3 navText"
                style={{ fontWeight: "500" }}
              >
                首頁
              </Link>
            </li>
            <li>
              <Link to="Courses" className="nav-link px-2 me-3 navText">
                課程總覽
              </Link>
            </li>
            {currentUser && currentUser.foundUser.role === "instructor" && (
              <li>
                <Link to="AddNewCourse" className="nav-link px-2 me-3 navText">
                  新增課程
                </Link>
              </li>
            )}
            {currentUser && currentUser.foundUser.role === "student" && (
              <li>
                <Link
                  to="CurrentUserCourse"
                  className="nav-link px-2 me-3 navText"
                >
                  我的學習
                </Link>
              </li>
            )}
          </ul>
          <Link
            to="Cart"
            className="nav-link px-2 me-4 navText position-relative"
          >
            <PiShoppingCartSimple style={{ width: "25px", height: "25px" }} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartItemCount}
              <span className="visually-hidden">unread messages</span>
            </span>
          </Link>
          {!currentUser && (
            <div className="text-end">
              <Link to="login" className="btn btn-outline-primary me-3">
                登入
              </Link>
              <Link to="register" className="btn btn-primary">
                註冊
              </Link>
            </div>
          )}

          {currentUser && (
            <div className="dropdown text-end">
              <Link
                to="#"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={
                    currentUser.foundUser.image &&
                    currentUser.foundUser.image !== ""
                      ? currentUser.foundUser.image
                      : "/images/profile.jpg"
                  }
                  alt="mdo"
                  width="32"
                  height="32"
                  className="rounded-circle"
                  style={{ objectFit: "cover" }}
                />
              </Link>
              <ul
                className="dropdown-menu text-small"
                aria-labelledby="dropdownUser1"
              >
                <li>
                  <Link className="dropdown-item navText" to="profile">
                    個人檔案
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item navText"
                    to="CurrentUserCourse"
                  >
                    我的課程
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item navText"
                    to="/"
                    onClick={handleLogout}
                  >
                    登出
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Nav;
