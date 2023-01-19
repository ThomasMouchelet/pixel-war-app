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
    if (userInfo.username) {
      return (
        <div className="c-hoverInfo">
          <div className="c-hoverInfo__container">
            <p>{userInfo.username}</p>
          </div>
          <div className="c-hoverInfo__bottom"></div>
        </div>
      );
    } else {
      return null;
    }
  };

  return renderUserInfo();
};

export default HoverInfo;
