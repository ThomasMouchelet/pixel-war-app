import { useEffect, useState } from "react";
import { listenTopUser } from "../../../../setup/services/user.service";
const RankingMenu = ({ isRankingModalActive }) => {
  const [users, setUsers] = useState(null);
  const [selfRank, setSelfRank] = useState(null);

  useEffect(() => {
    listenTopUser({setTopUsers: setUsers, setUserPosition: setSelfRank});
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
            ? users.map((user, index) => {
                let image;
                const score = Math.floor(user.totalScore / 100);
                if (score > 19) {
                  image = `./grades/grade-19.jpg`;
                } else {
                  image = `./grades/grade-${score}.jpg`;
                }
                return (
                  <li
                    key={user.uid + Math.floor(Math.random() * 10) + 1}
                    className="user-rank-card"
                  >
                    <span className="user-rank">{index + 1}</span>
                    <div className="user-infos-container">
                      <div className="user-card__img-container">
                        <img src={image} alt="" />
                      </div>
                      <span className="username">{user.username}</span>
                      <span className="user-score">{user.totalScore} px</span>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>

        <div className="self-rank">
          <h2>Votre position</h2>
          <ul className="user-rank-list">
          {selfRank
            ? selfRank.map((user, index) => {
                let image;
                const score = Math.floor(user.totalScore / 100);
                if (score > 19) {
                  image = `./grades/grade-19.jpg`;
                } else {
                  image = `./grades/grade-${score}.jpg`;
                }
                return (
                  <li
                    key={user.i + Math.floor(Math.random() * 10) + 1}
                    className="user-rank-card"
                  >
                    <span className="user-rank">{index + 1}</span>
                    <div className="user-infos-container">
                      <div className="user-card__img-container">
                        <img src={image} alt="" />
                      </div>
                      <span className="username">{user.username}</span>
                      <span className="user-score">{user.totalScore} px</span>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default RankingMenu;
