import axios from "axios";
const API_URL = `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/course`;

class CourseService {
  findAllCourse() {
    let token = getToken();
    return axios.get(API_URL, {
      headers: {
        Authorization: token,
      },
    });
  }

  findByCourseId(_id) {
    let token = getToken();
    return axios.get(`${API_URL}/${_id}`, {
      headers: { Authorization: token },
    });
  }

  findTop5Courses() {
    let token = getToken();
    return axios.get(API_URL + "/top5", {
      headers: {
        Authorization: token,
      },
    });
  }

  findByNameLike(name) {
    let token = getToken();
    return axios.get(API_URL + "/findByName/" + name, {
      headers: {
        Authorization: token,
      },
    });
  }

  findByInstructorId(_id) {
    let token = getToken();
    return axios.get(API_URL + "/instructor/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  findByStudentId(_id) {
    let token = getToken();
    return axios.get(API_URL + "/student/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  enroll(_id) {
    let token = getToken();
    return axios.post(
      API_URL + "/enroll/" + _id,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  addNewCourse(title, description, price, imageFile, content, videoUrl) {
    let token = getToken();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("content", content);
    formData.append("videoUrl", videoUrl);

    return axios.post(API_URL, formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateCourse(_id, title, description, price, imageFile, content, videoUrl) {
    let token = getToken();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("content", content);
    formData.append("videoUrl", videoUrl);

    return axios.patch(`${API_URL}/${_id}`, formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  addRatingToCourse(rating, _id) {
    let token = getToken();
    return axios.put(
      `${API_URL}/${_id}/rating`,
      { rating },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  addComment(_id, commentText) {
    let token = getToken();
    return axios.put(
      `${API_URL}/messages/${_id}`,
      { commentText },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  deleteCourse(_id) {
    let token = getToken();
    return axios.delete(`${API_URL}/${_id}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  deleteMessage(course_id, message_id) {
    let token = getToken();
    return axios.delete(`${API_URL}/messages/${course_id}/${message_id}`, {
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

export default new CourseService();
