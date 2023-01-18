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
            ? users.map((user, index) => {
                let image;
                const score = Math.floor(user.totalScore / 100) - 1;
                if (score > 19) {
                  image = `./grades/grade-19.jpg`;
                } else {
                  image = `./grades/grade-${score}.jpg`;
                }
                return (
                  <li
                    key={index}
                    className="user-card"
                  >
                    <div className="user-card__img-container">
                      <img src={image} alt="" />
                    </div>
                    <p>{user.username}</p>
                    {"-"}
                    <p>{user.totalScore}px</p>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
};

export default RankingMenu;
