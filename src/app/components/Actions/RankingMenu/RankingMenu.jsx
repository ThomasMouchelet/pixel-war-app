import { useEffect, useState } from "react";
import { listenTopUser } from "../../../../setup/services/user.service";
const RankingMenu = ({ isRankingModalActive }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    listenTopUser(setUsers);
  }, []);
  return (
    <div
      className={
        isRankingModalActive
          ? "ranking-menu ranking-menu-active"
          : "ranking-menu"
      }
    >
      <div className="ranking-menu__content">
        <h2>Classement</h2>
        <ul className="user-rank-list">
          {users
            ? users.map((user, index) => (
                <li
                  key={user.uid + Math.floor(Math.random() * 10) + 1}
                  className="user-rank-card"
                >
                  <span className="user-rank">{index + 1}</span>
                  {/* <p>{user.username}</p>
                  {"-"}
                  <p>{user.totalScore}px</p> */}
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default RankingMenu;
