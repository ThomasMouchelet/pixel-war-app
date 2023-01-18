import { useState, useEffect, useMemo } from "react";
import { getSingleUser } from "../../../../setup/services/user.service";
import GradeImage from "../../GradeImage/GradeImage";
import closeIcon from "../../../assets/images/close_icon.png";

const UserProfile = ({ progress, hide }) => {
  const [user, setUser] = useState(null);
  const [popupOpened, setPopupOpened] = useState(false);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    getSingleUser(uid, setUser);
  }, []);

  useEffect(() => {
    if (
      progress === 25 ||
      progress === 50 ||
      progress === 100 ||
      progress === 300 ||
      progress === 500 ||
      progress === 750 ||
      progress === 1000 ||
      progress === 1500 ||
      progress === 2000 ||
      progress === 3000 ||
      progress === 4000 ||
      progress === 5000 ||
      progress === 6000 ||
      progress === 8000
    ) {
      setPopupOpened(true);
    } else {
      setPopupOpened(false);
    }
  }, [progress]);

  if (!hide) {
    return (
      <div className="c-user-profile">
        <div className="c-user-profile__img-container">
          <GradeImage progress={progress} />
        </div>
        {user && <p className="c-user-profile__username">{user.username}</p>}
        {popupOpened && (
          <div className="c-user-profile__popup">
            <div className="c-user-profile__container">
              <button onClick={() => setPopupOpened(false)}>
                <img src={closeIcon} alt="" />
              </button>
              <p className="c-user-profile__popup__title">Bien joué !</p>
              <p className="c-user-profile__popup__subtitle">
                Voici ton superbe nouvel avatar !
              </p>
              <div className="c-user-profile__img-container__popup">
                <GradeImage progress={progress} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return "";
  }
};

export default UserProfile;
