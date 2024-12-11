import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handlPassword = (e) => {
    setPassword(e.target.value);
  };

  const handlRole = (e) => {
    setRole(e.target.value);
  };

  const handleRegister = () => {
    AuthService.register(userName, email, password, role)
      .then(() => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "註冊成功。即將跳轉至登入頁面",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        navigate("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h3>註冊成為會員</h3>
        <hr />
        <div>
          {message && <div className="alert alert-danger">{message}</div>}
        </div>
        <div class="form-floating mb-3">
          <input
            onChange={handleEmail}
            type="email"
            class="form-control"
            id="floatingInput"
            name="email"
            placeholder=""
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input
            onChange={handleUserName}
            type="text"
            class="form-control"
            id="floatingInput"
            name="username"
            placeholder=""
          />
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating mb-3">
          <input
            onChange={handlPassword}
            type="password"
            class="form-control"
            id="floatingPassword"
            name="password"
            placeholder=""
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating mb-3">
          <select
            onChange={handlRole}
            name="role"
            class="form-select"
            id="floatingSelect"
            aria-label="身分選擇"
          >
            <option selected>請選擇您的身分</option>
            <option value="instructor">講師</option>
            <option value="student">學員</option>
          </select>
          <label for="floatingSelect">身分選擇</label>
        </div>
        <div class="toLoginOrRegister">
          <p>
            已經有帳號了？<Link to="/login">點擊登入</Link>
          </p>
        </div>
        <hr />
        <div class="d-grid gap-2">
          <button
            onClick={handleRegister}
            class="btn btn-primary"
            type="button"
          >
            註冊
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
