import React, { useEffect, useState } from "react";
import Axios from "axios";

function SideVideo() {
  const [SideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    Axios.post("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        setSideVideos(response.data.videos);
      } else {
        alert("Failed to get Videos");
      }
    });
  }, []);

  const renderSideVides = SideVideos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    let src =
      process.env.NODE_ENV === "development"
        ? `http://localhost:5000/${video.thumbnail}`
        : `https://react-happytube.herokuapp.com/${video.thumbnail}`;

    return (
      <div
        key={index}
        style={{ display: "flex", marginTop: "1rem", padding: "0 2rem" }}
      >
        <div style={{ width: "40%", marginRight: "1rem" }}>
          <a href>
            <img
              style={{ width: "100%", height: "100%" }}
              src={src}
              alt="thumbnail"
            />
          </a>
        </div>

        <div style={{ width: "50%" }}>
          <a href style={{ color: "gray" }}>
            <span style={{ fontSize: "1rem", color: "black" }}>
              {video.title}
            </span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views} views</span>
            <br />
            <span>
              {minutes} : {seconds}
            </span>
            <br />
          </a>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div style={{ marginTop: "3rem" }} />

      {renderSideVides}
    </React.Fragment>
  );
}

export default SideVideo;
