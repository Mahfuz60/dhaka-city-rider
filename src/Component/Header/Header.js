import React from "react";
import { Link } from "react-router-dom";
import '../../Images/Bg.png'

const Header = () => {
  return (
    <div style={{ backgroundImage: ` url(${Bg})` }} >
      <div>
        <h2>City Travels</h2>
      </div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/destination">Destination</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/blog"> Blog</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>

      <div></div>
    </div>
  );
};

export default Header;
