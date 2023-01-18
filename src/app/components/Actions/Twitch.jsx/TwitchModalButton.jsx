import TwitchIcon from "../../../assets/images/dark-twitch-icon.svg";
import CloseIcon from "../../../assets/images/close_icon.png";
import { useEffect } from "react";

const TwitchModalButton = ({
  hide,
  isTwitchModalActive,
  setIsTwitchModalActive,
  tutorialStep,
}) => {
  useEffect(() => {
    if (tutorialStep <= 6) {
      setIsTwitchModalActive(false);
    } else {
      setIsTwitchModalActive(true);
    }
  }, [tutorialStep]);
  return (
    <>
      {!isTwitchModalActive ? (
        <div
          className={`action-menus__menu__item ${
            tutorialStep === 2 ? "c-tutorial--active" : ""
          }`}
          style={{
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
          }}
        >
          <img src={TwitchIcon} alt="" />
        </div>
      ) : (
        <div
          className="action-menus__menu__item action-menus__menu__item__opened"
        >
          <img
            src={CloseIcon}
            alt=""
            className="menu action-menus_menu_item_cross"
          />
        </div>
      )}

      {isTwitchModalActive && (
        <div className="modal">
          <iframe
            src="https://www.twitch.tv/embed/pixelwaresd/chat?parent=app.pixel-war-esd.fr"
            height="100%"
            width="100%"
            style={{
              opacity: ".9",
              border: "none",
              zIndex: "99",
            }}
            title="twitch-chat"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default TwitchModalButton;
