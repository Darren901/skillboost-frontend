import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = (props) => {
  const navigate = useNavigate();
  let { setCurrentUser, handleLoading } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      handleLoading(true);
      let response = await AuthService.login(email, password);
      if (response?.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setCurrentUser(AuthService.getCurrentUser());
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "您已成功登入",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        navigate("/");
      }

      navigate("/");
    } catch (e) {
      setMessage(e.response?.data);
      Swal.fire({
        icon: "error",
        title: "登入失敗",
        text: e.response?.data || "請檢查您的帳號密碼是否正確",
      });
    } finally {
      handleLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h3>登入會員</h3>
        <hr />
        <form onSubmit={handleLogin}>
          <div>
            {message && <div className="alert alert-danger">{message}</div>}
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleEmail}
              type="email"
              className="form-control"
              id="floatingInput"
              name="email"
              placeholder=""
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handlPassword}
              type="password"
              className="form-control"
              id="floatingPassword"
              name="password"
              placeholder=""
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="toLoginOrRegister">
            <p>
              還沒有帳號？<Link to="/register">點擊註冊</Link>
            </p>
          </div>
          <hr />
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              登入
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
