import { useState } from "react";

const LastPixelMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const [users, setUsers] = useState([]);
  return (
    <div className={isMenuOpen ? "lastPixel menu-active" : "lastPixel"}>
      <div className="lastPixel__content">
        <h2>Dernières actions</h2>
        <ul className="user-list">
        <li className="user-card">User1</li>
        </ul>
      </div>
    </div>
  );
};

export default LastPixelMenu;
