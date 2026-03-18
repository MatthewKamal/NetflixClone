import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navRef = useRef(null);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img
          src={logo}
          alt="Netflix"
          onClick={() => {
            navigate("/");
            setMenuOpen(false);
          }}
          style={{ cursor: "pointer" }}
        />

        <ul className="desktop-nav">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/tvshows">TV Shows</NavLink>
          </li>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
          <li>
            <NavLink to="/new">New & Popular</NavLink>
          </li>
          <li>
            <NavLink to="/mylist">My List</NavLink>
          </li>
          <li>
            <NavLink to="/browse">Browse by languages</NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <img src={search_icon} alt="Search" className="icons" />
        <input type="text" placeholder="Search..." />
        <img src={bell_icon} alt="Notifications" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="Profile" className="profile" />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            <p>Sign Out of Netflix</p>
          </div>
        </div>

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <ul>
          <li>
            <NavLink to="/" onClick={handleNavClick}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/tvshows" onClick={handleNavClick}>
              TV Shows
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" onClick={handleNavClick}>
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/new" onClick={handleNavClick}>
              New & Popular
            </NavLink>
          </li>
          <li>
            <NavLink to="/mylist" onClick={handleNavClick}>
              My List
            </NavLink>
          </li>
          <li>
            <NavLink to="/browse" onClick={handleNavClick}>
              Browse by Languages
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
