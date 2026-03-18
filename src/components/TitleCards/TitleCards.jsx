import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link, useNavigate } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2VlOGIxYzdmNjljYjAwMGJkMGZiMWZiNGEwMzAxYSIsIm5iZiI6MTc3MjI3MjY5My41MDQ5OTk5LCJzdWIiOiI2OWEyYmMzNWVjZWUyMzMzMmNjMTZmOGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Mu7-n80c45dLfgFB6sFSP60D1Y6KRR9CR1NbXdDsgMk",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`,
      options,
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);
  return (
    <div className="titlecards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((cards, index) => {
          return (
            <Link to={`/player/${cards.id}`} className="card" key={index}>
              <img
                src={"https://image.tmdb.org/t/p/w500" + cards.backdrop_path}
                alt=""
              />
              <p>{cards.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
