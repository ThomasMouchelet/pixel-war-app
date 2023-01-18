import TwitchIcon from "../../../assets/images/dark-twitch-icon.svg";
import CloseIcon from "../../../assets/images/white-twitch-icon.svg";

const TwitchModalButton = ({ hide, isTwitchModalActive }) => {

  return (
    <>
      {!isTwitchModalActive ? (
        <div
          className="action-menus__menu__item"
        >
          <img src={TwitchIcon} className="menu" alt="" />
        </div>
      ) : (
        <div
          className="action-menus__menu__item"
        >
          <img
            src={CloseIcon}
            alt=""
            className="menu"
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
            className="iFrameOpened"
            title="twitch-chat"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default TwitchModalButton;
