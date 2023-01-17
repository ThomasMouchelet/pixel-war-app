import { useEffect, useState } from "react";
import { listenTopUser } from "../../../../setup/services/user.service";
const RankingMenu = ({ isRankingModalActive }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    listenTopUser(setUsers);
    // setTimeout(() => {
    //   setDisplayUserCard(false);
    // }, 2000);
  }, []);
  return (
    <div
      className={
        isRankingModalActive
          ? "ranking-menu ranking-menu-active"
          : "ranking-menu"
      }
    >
      <div className="lastPixel__content">
        <h2>Classement</h2>
        <ul className="user-list">
          {users
            ? users.map((user) => (
                <li
                  key={user.uid + Math.floor(Math.random() * 10) + 1}
                  className="user-card"
                >
                  <p>{user.username}</p>
                  {"-"}
                  <p>{user.totalScore}px</p>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default RankingMenu;
