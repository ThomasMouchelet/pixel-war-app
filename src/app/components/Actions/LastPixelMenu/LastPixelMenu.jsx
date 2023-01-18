import { useEffect, useState } from "react";
import { getLastTwentyUser } from "../../../../setup/services/user.service";

const LastPixelMenu = ({ isMenuOpen }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getLastTwentyUser(setUsers);
  }, [])
  return (
    <div className={isMenuOpen ? "lastPixel menu-active" : "lastPixel"}>
      <div className="lastPixel__content">
        <h2 className="lastPixel__text">Dernières actions</h2>
        <ul className="user-list">
          {users
            ? users.map((user, index) => (
                <li key={index} className="user-card">
                  {user.user.username}
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default LastPixelMenu;
