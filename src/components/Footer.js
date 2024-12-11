import React from "react";
import footerBg from "../images/footerBgImg.png";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section
        className="d-flex justify-content-center justify-content-lg-between p-4 border-top"
        style={{ backgroundImage: `url(${footerBg})` }}
      >
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon
                  color="secondary"
                  icon="graduation-cap"
                  className="me-3"
                />
                SKILL BOOST
              </h6>
              <p>
                歡迎來到SKILL BOOST線上學習平台！
                我們致力於打造優質的線上教育環境， 讓學習變得更加便利與有效率。
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">平台功能</h6>
              <p>
                <a href="#!" className="text-reset">
                  課程瀏覽
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  導師專區
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  學習紀錄
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  互動討論
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">快速連結</h6>
              <p>
                <a href="#!" className="text-reset">
                  所有課程
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  我的學習
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  常見問題
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  聯絡我們
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">聯絡資訊</h6>
              <p>
                <MDBIcon color="secondary" icon="home" className="me-2" />
                台灣
              </p>
              <p>
                <MDBIcon color="secondary" icon="envelope" className="me-3" />
                skillboost@example.com
              </p>
              <p>
                <MDBIcon color="secondary" icon="phone" className="me-3" />
                (02) 1234-5678
              </p>
            </MDBCol>
            <MDBCol
              md="5"
              lg="3"
              xl="1"
              className="mx-auto mb-md-0 mb-4"
            ></MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: "#eaecef" }}>
        © 2024 SKILL BOOST | 本網站為MERN
        Stack練習專案，僅供學習使用，無商業用途
      </div>
    </MDBFooter>
  );
};

export default Footer;
