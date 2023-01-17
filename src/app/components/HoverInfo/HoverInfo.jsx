import { useEffect, useState } from "react";
import { getUserByPixelPositions } from "../../../setup/services/user.service";

const HoverInfo = ({ x, y }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserByPixelPositions(x, y).then((res) => {
      if (res) {
        setUserInfo(res);
      } else {
        setUserInfo({});
      }
    });
  }, [x, y]);

  const renderUserInfo = () => {
    if (userInfo.username || userInfo.totalScore) {
      return (
        <div className="c-hoverInfo">
          <p>{userInfo.username}</p>
          <p>Score: {userInfo.totalScore}</p>
        </div>
      );
    } else {
      return null;
    }
  };

  return renderUserInfo();
};

export default HoverInfo;
