import { useEffect, useState } from "react";
import { getLastTwentyUser } from "../../../../setup/services/user.service";

const LastPixelMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getLastTwentyUser(setUsers)
  }, [])
  useEffect(() => {
    console.log("users => ", users);
  }, [users]);
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
