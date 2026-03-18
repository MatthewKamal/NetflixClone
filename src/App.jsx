import React from "react";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import Movies from "./pages/Movies/Movies";
import TvShows from "./pages/TvShows/TvShows";
import NewAndPopular from "./pages/NewAndPopular/NewAndPopular";
import MyList from "./pages/MyList/MyList";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvshows" element={<TvShows />} />
        <Route path="/new" element={<NewAndPopular />} />
        <Route path="/mylist" element={<MyList />} />
      </Routes>
    </div>
  );
};

export default App;
