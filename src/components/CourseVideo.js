import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBTypography,
} from "mdb-react-ui-kit";

const CourseVideo = ({ playlistUrl }) => {
  // 從 URL 中提取播放清單 ID
  const getPlaylistId = (url) => {
    if (!url) return null; // 如果沒有 URL，返回 null

    const regex = /[&?]list=([^&]+)/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const playlistId = getPlaylistId(playlistUrl);

  if (!playlistId) {
    return (
      <MDBCard className="shadow-5 mb-3">
        <MDBCardHeader className="bg-primary text-white">
          <MDBTypography tag="h5" className="mb-0">
            課程內容
          </MDBTypography>
        </MDBCardHeader>
        <MDBCardBody className="text-center p-5">
          <p>尚未提供播放清單或影片網址</p>
        </MDBCardBody>
      </MDBCard>
    );
  }

  return (
    <MDBCard className="shadow-5 mb-3">
      <MDBCardHeader className="bg-primary text-white">
        <MDBTypography tag="h5" className="mb-0">
          課程內容
        </MDBTypography>
      </MDBCardHeader>
      <MDBCardBody className="p-0">
        <div className="ratio ratio-16x9">
          <iframe
            src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default CourseVideo;
