import { useEffect, useState, useRef } from "react";
import { getLastTwentyUser } from "../../../../setup/services/user.service";

const LastPixelMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const [users, setUsers] = useState([]);
  const [displayUserCard, setDisplayUserCard] = useState(true);

  useEffect(() => {
    getLastTwentyUser(setUsers);
    setTimeout(() => {
      setDisplayUserCard(false);
    }, 2000)
  }, [])
  return (
    <div className={isMenuOpen ? "lastPixel menu-active" : "lastPixel"}>
      <div className="lastPixel__content">
        <h2>Dernières actions</h2>
        <ul className="user-list">
          {users ? users.map(user => <li key={user.user.uuid} className="user-card">{user.user.username}</li>) : null}
        </ul>
      </div>
    </div>
  );
};

export default LastPixelMenu;
