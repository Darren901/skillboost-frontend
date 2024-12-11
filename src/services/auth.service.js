import axios from "axios";
const API_URL = `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/user`;

class AuthService {
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }

  login(email, password) {
    return axios.post(API_URL + "/login", {
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  logout() {
    localStorage.removeItem("user");
  }

  editUser(username, description, file) {
    let token = getToken();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("description", description);
    if (file) {
      formData.append("image", file);
    }
    return axios.put(API_URL + "/editProfile", formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

function getToken() {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user")).token;
  } else {
    return "";
  }
}

export default new AuthService();
