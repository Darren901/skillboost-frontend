import React, { useEffect, useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import StarRatings from "react-star-ratings";
import OrderService from "../services/order.service";
import CourseService from "../services/course.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import EcpayService from "../services/ecpay.service";

const Cart = (props) => {
  const navigate = useNavigate();
  const { currentUser, handleLoading, setCartItemCount } = props;
  const [userCartData, setUserCartData] = useState(null);

  useEffect(() => {
    if (!currentUser || !currentUser.foundUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const fetchCartData = () => {
    handleLoading(true);
    OrderService.findCurrentUserCart()
      .then((response) => {
        setUserCartData(response.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => handleLoading(false));
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleDeleteCartDetail = (courseId) => {
    handleLoading(true);
    OrderService.deleteCartDetail(courseId)
      .then(() => {
        setCartItemCount((prev) => prev - 1);
        return fetchCartData();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => handleLoading(false));
  };

  const handleCheckout = () => {
    if (!userCartData?.courses || userCartData.courses.length === 0) return;

    Swal.fire({
      title: "確認訂單",
      text: "確定要購買這些課程嗎？",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "確認購買",
      cancelButtonText: "再想想",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLoading(true);
        Promise.all(
          userCartData.courses.map((course) =>
            CourseService.enroll(course.courseId._id)
          )
        )
          .then(() => OrderService.changeUserCartToOrder(userCartData._id))
          .then(() => {
            const orderData = {
              totalPrice: userCartData.totalPrice,
              itemsName: userCartData.courses
                .map((course) => course.courseId.title)
                .join("#"),
            };

            setUserCartData(null);
            setCartItemCount(0);

            EcpayService.payOrder(orderData);
          })
          .catch((e) => {
            console.log(e);
            Swal.fire({
              icon: "error",
              title: "購買失敗",
              text: "請稍後再試",
            });
          })
          .finally(() => handleLoading(false));
      }
    });
  };

  return (
    <div className="container">
      <div class="checkout-row">
        <div class="checkout-left">
          <h3 className="cart-title">您的購物車</h3>
          {currentUser && (!userCartData || !userCartData.courses?.length) ? (
            <div>
              <h2 className="text-center">目前還沒有加入商品至購物車</h2>
            </div>
          ) : (
            userCartData?.courses?.map((course) => {
              return (
                <div class="product-row" key={course.courseId._id}>
                  <div className="cart-img-container">
                    <img
                      class="cart-image"
                      src={
                        course.courseId.image
                          ? course.courseId.image
                          : "images/react.jpg"
                      }
                    />
                  </div>
                  <div class="cart-product-information">
                    <p class="cart-product-name">{course.courseId.title}</p>
                    <div class="cart-product-detail">
                      <div class="cart-detail-left">
                        <p className="cart-instructor-name">
                          {course.courseId.instructor.username}
                        </p>
                        <div class="cart-product-price">
                          <p class="cart-origin-price">NT${course.price}</p>
                        </div>
                        <div
                          className="product-rating"
                          style={{ marginTop: "1rem" }}
                        >
                          <p style={{ fontWeight: "700" }}>
                            {course.courseId.averageRating.toFixed(1)}&thinsp;
                          </p>
                          <span>
                            <StarRatings
                              rating={course.courseId.averageRating}
                              starRatedColor="#EAC100"
                              numberOfStars={5}
                              name="rating"
                              starSpacing="1px"
                              starDimension="20px"
                            />
                          </span>
                          <p className="comment-num">
                            ({course.courseId.ratings.length})
                          </p>
                        </div>
                      </div>
                      <div class="product-detail-right">
                        <MDBBtn
                          size="lg"
                          color="danger"
                          className="delete-from-cart"
                          onClick={() =>
                            handleDeleteCartDetail(course.courseId._id)
                          }
                        >
                          刪除
                        </MDBBtn>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div class="checkout-right">
          <h2 class="checkout-summary">訂單總結</h2>
          <p class="checkout-items">
            總共 {userCartData?.courses?.length} 個課程
          </p>
          <p class="items-price">
            <span>金額 : </span>
            <span>NT${userCartData?.totalPrice}</span>
          </p>
          <hr class="checkout-summary-hr" />
          <p class="cart-total-price">
            <span>總額 : </span>
            <span>NT${userCartData?.totalPrice}</span>
          </p>
          <div className="d-grid gap-2">
            <MDBBtn
              className="checkout-button"
              onClick={handleCheckout}
              disabled={userCartData?.courses?.length === 0 || !userCartData}
            >
              結帳
            </MDBBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
