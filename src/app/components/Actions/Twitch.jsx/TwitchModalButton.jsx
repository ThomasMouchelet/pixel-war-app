import TwitchIcon from "../../../assets/images/dark-twitch-icon.svg";
import CloseIcon from "../../../assets/images/close_icon.png";

const TwitchModalButton = ({ hide, isTwitchModalActive }) => {
  return (
    <>
      {!isTwitchModalActive ? (
        <div
          className="action-menus__menu__item"
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
