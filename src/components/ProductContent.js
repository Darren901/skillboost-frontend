import React from "react";

const ProductContent = (props) => {
  const { courseData } = props;
  return (
    <div>
      <div class="description-block">
        <p class="description-p">課程內容</p>
        <p class="product-description">{courseData.content}</p>
      </div>
    </div>
  );
};

export default ProductContent;
