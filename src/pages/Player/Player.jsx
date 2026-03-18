import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({});
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2VlOGIxYzdmNjljYjAwMGJkMGZiMWZiNGEwMzAxYSIsIm5iZiI6MTc3MjI3MjY5My41MDQ5OTk5LCJzdWIiOiI2OWEyYmMzNWVjZWUyMzMzMmNjMTZmOGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Mu7-n80c45dLfgFB6sFSP60D1Y6KRR9CR1NbXdDsgMk",
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt=""
        onClick={() => {
          navigate(-2);
        }}
      />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}?autoplay=1&mute=1&playsinline=1`}
        title="trailer"
        frameBorder="0"
        allow="autoplay"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <div className="player-info-box">
          <h2>{apiData.name}</h2>
          <div className="player-info-grid">
            <div className="info-item">
              <span className="info-label">Published</span>
              <span className="info-value">
                {apiData.published_at ? apiData.published_at.slice(0, 10) : "—"}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Type</span>
              <span className="info-value">{apiData.type || "—"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Site</span>
              <span className="info-value">{apiData.site || "—"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Quality</span>
              <span className="info-value">
                {apiData.size ? `${apiData.size}p` : "—"}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Language</span>
              <span className="info-value">{apiData.iso_639_1 || "—"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Region</span>
              <span className="info-value">{apiData.iso_3166_1 || "—"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Official</span>
              <span className="info-value">
                {apiData.official !== undefined
                  ? apiData.official
                    ? "✅ Yes"
                    : "❌ No"
                  : "—"}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Video ID</span>
              <span className="info-value">{apiData.id || "—"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
