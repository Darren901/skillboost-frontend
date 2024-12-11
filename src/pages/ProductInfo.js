import { React, useEffect, useState } from "react";
import ProductOverview from "../components/ProductOverview";
import ProductContent from "../components/ProductContent";
import { useLocation, useNavigate } from "react-router-dom";

const ProductInfo = ({ currentUser, setCartItemCount, cartItemCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const { courseData = null } = location.state || {};

  useEffect(() => {
    if (!currentUser?.foundUser) {
      navigate("/login");
      return;
    }
    setIsLoading(false);
  }, [currentUser, courseData, navigate]);

  if (isLoading) {
    return (
      <div className="container">
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return null;
  }

  return (
    <div className="container">
      <div className="product-info">
        <ProductOverview
          currentUser={currentUser}
          courseData={courseData}
          setCartItemCount={setCartItemCount}
          cartItemCount={cartItemCount}
        />
        <ProductContent courseData={courseData} />
      </div>
    </div>
  );
};

export default ProductInfo;
