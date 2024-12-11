import axios from "axios";
const API_URL = `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/order`;

class OrderService {
  changeUserCartToOrder(_id) {
    let token = getToken();
    return axios.put(
      `${API_URL}/${_id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  addCourseToCart(courseId) {
    let token = getToken();
    return axios.post(
      `${API_URL}/add-to-cart`,
      { courseId },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  findCurrentUserCart() {
    let token = getToken();
    return axios.get(`${API_URL}/cart`, {
      headers: {
        Authorization: token,
      },
    });
  }

  deleteCartDetail(courseId) {
    let token = getToken();
    return axios.delete(`${API_URL}/cart/${courseId}`, {
      headers: {
        Authorization: token,
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

export default new OrderService();
