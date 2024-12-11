import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Heroes = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-up");
          } else {
            entry.target.classList.remove("fade-up");
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentElement = textRef.current;

    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);
  return (
    <div style={{ backgroundColor: "#fff", marginTop: "2rem" }} id="about">
      <div class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src="images/myCourseVideo.png"
              class="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div class="col-lg-6 heroesText" ref={textRef}>
            <h1 class="display-5 fw-bold lh-1 mb-3">
              專業課程，一站式學習體驗
            </h1>
            <p class="lead">
              我們的平台匯集了來自各領域的專業導師，提供精心設計的影音教學資源，滿足您多元化的學習需求。不論是想掌握程式設計的基礎技能，還是深入研究最新的科技趨勢，我們都有適合的課程供您選擇。
              除了完整的學習內容，我們還搭載互動留言板系統，讓您能與導師及其他學員隨時交流，共同解決問題，分享心得，建立強大的學習社群。
              無論您是學生、職場新鮮人，還是正在尋求職涯突破的專業人士，這裡都將是您提升自我、實現夢想的最佳起點！
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link
                to="CurrentUserCourse"
                class="btn btn-primary btn-lg px-4 me-md-2"
              >
                開始學習
              </Link>
              <Link
                to="AddNewCourse"
                class="btn btn-outline-secondary btn-lg px-4"
              >
                成為導師
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heroes;
