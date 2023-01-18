import { useState, useEffect, useMemo } from "react";
import { getSingleUser } from "../../../../setup/services/user.service";

const UserProfile = ({ progress }) => {
  const [user, setUser] = useState(null);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    getSingleUser(uid, setUser);
  }, []);

  const renderGrade = useMemo(() => {
    let image;
    const score = Math.floor(progress / 100);
    if (score > 19) {
      image = `./grades/grade-19.jpg`;
    } else {
      image = `./grades/grade-${score}.jpg`;
    }
    return (
      <div className="c-user-profile__img-container">
        <img src={image} alt="" />
      </div>
    );
  }, [progress]);

  return (
    <div className="c-user-profile">
      {renderGrade}
      {user && <p>{user.username}</p>}
    </div>
  );
};

export default UserProfile;
