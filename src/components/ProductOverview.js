import { React } from "react";
import StarRatings from "react-star-ratings";
import { MDBBtn } from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import OrderService from "../services/order.service";

const ProductOverview = (props) => {
  const { courseData, currentUser, setCartItemCount, cartItemCount } = props;

  const handleAddToCart = () => {
    if (currentUser.foundUser.role == "instructor") {
      Swal.fire({
        icon: "warning",
        title: "新增失敗",
        text: "只有學生帳號可以購買課程",
      });
      return;
    }
    const alreadyPurchasedStudent = courseData.students.find((student) => {
      return currentUser.foundUser._id === student;
    });

    if (alreadyPurchasedStudent) {
      Swal.fire({
        icon: "warning",
        title: "新增失敗",
        text: "你已經購買過這個課程",
      });
      return;
    }

    OrderService.addCourseToCart(courseData._id)
      .then(() => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "已成功新增至購物車",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        setCartItemCount((prev) => prev + 1);
      })
      .catch((e) => {
        Swal.fire({
          icon: "warning",
          title: e.response.data,
        });
      });
  };

  return (
    <div>
      <div class="product-block">
        <div className="product-image-container">
          <img
            class="product-image"
            src={courseData.image ? courseData.image : "images/react.jpg"}
          />
        </div>
        <div class="product-information">
          <h1 class="product-name">{courseData.title}</h1>
          <p className="product-instructor-name">
            {courseData.instructor.username}
          </p>
          <p className="product-course-description">{courseData.description}</p>
          <div className="product-rating">
            <p style={{ fontWeight: "700" }}>
              {courseData.averageRating.toFixed(1)}&thinsp;
            </p>
            <span>
              <StarRatings
                rating={courseData.averageRating} // 傳遞評分值
                starRatedColor="#EAC100" // 星星顏色
                numberOfStars={5} // 星星數量
                name="rating" // 評分名稱
                starSpacing="1px"
                starDimension="20px"
              />
            </span>
            <p className="comment-num">({courseData.ratings.length})</p>
          </div>
          <div class="sell-information">
            <p class="product-discount">熱賣中</p>
            <p class="sell-num">已出售 {courseData.students.length}</p>
          </div>
          <div class="product-price">
            <p class="discount-price">NT${courseData.price}</p>
          </div>
          <MDBBtn size="lg" className="add-to-cart" onClick={handleAddToCart}>
            加入購物車
          </MDBBtn>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
