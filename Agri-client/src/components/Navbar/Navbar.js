import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/Logo3.png";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => setButton(window.innerWidth <= 960 ? false : true);

  const onMouseEnter = () =>
    setDropdown(window.innerWidth <= 960 ? false : true);

  const onMouseLeave = () => setDropdown(false);

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar-header">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Website Logo" width="60" height="60" />
            AgriDeal
          </Link>
          <div class="search">
            <input
              type="text"
              class="searchTerm"
              placeholder="Bạn muốn mua gì?"
            />
            <button type="submit" class="searchButton">
              <i class="fa fa-search" />
            </button>
          </div>
          <button className="button-account">
            <i class="fa fa-user" />
          </button>
          <button className="button-cart">
            <i class="fa fa-shopping-cart" />
          </button>
        </div>
      </nav>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li
              className="nav-item"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                SẢN PHẨM
                <i className="fas fa-caret-down down-arrow" />
              </Link>
              {dropdown && <Dropdown />}
            </li>
            <li className="nav-item">
              <Link to="/provider" className="nav-links" onClick={closeMobileMenu}>
                NHÀ CUNG CẤP
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/quotation" className="nav-links" onClick={closeMobileMenu}>
                BÁO GIÁ
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

const MenuItems = [
  {
    title: "Trái cây",
    path: "",
    cName: "dropdown-link",
  },
  {
    title: "Rau củ quả",
    path: "",
    cName: "dropdown-link",
  },
  {
    title: "Hoa tươi",
    path: "",
    cName: "dropdown-link",
  },
];

function Dropdown() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Navbar;
