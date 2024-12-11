import React from "react";
import StarRatings from "react-star-ratings";
import { MdLocalFireDepartment } from "react-icons/md";

const Courses = (props) => {
  const { data } = props;

  return (
    <div className="courseComponent">
      <div class="card">
        <div className="img-container">
          <img
            src={data.image ? data.image : "/images/react.jpg"}
            class="card-img-top"
            alt={data.title}
          />
        </div>
        <div class="card-body">
          <h6 class="card-title">{data.title}</h6>
          <p class="teacherName">{data.instructor.username}</p>
          <div className="rating">
            <span style={{ fontWeight: "700", fontSize: "0.7rem" }}>
              {data.averageRating.toFixed(1)} &thinsp;
            </span>
            <StarRatings
              rating={data.averageRating} // 傳遞評分值
              starRatedColor="#EAC100" // 星星顏色
              numberOfStars={5} // 星星數量
              name="rating" // 評分名稱
              starSpacing="1px"
              starDimension="14px"
            />
            ({data.ratings.length})
          </div>
          <p class="enrollPrice">NT$ {data.price}</p>
          <p>
            <MdLocalFireDepartment style={{ color: "red" }} />{" "}
            {data.students.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Courses;
