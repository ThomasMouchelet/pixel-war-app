import LastPixel from "../../assets/images/last-pixel.png";
import OpenEye from "../../assets/images/open-eye.png";
import CloseEye from "../../assets/images/close-eye.png";
import Consigne from "../../assets/images/icon_consigne.png";
import CloseIcon from "../../assets/images/close_icon.png";
import RulesModal from "./RulesModal/RulesModal";
import { useState } from "react";
import LastPixelMenu from "./LastPixelMenu/LastPixelMenu";
import TwitchModalButton from "./Twitch.jsx/TwitchModalButton";

const ActionMenus = ({ setHide, hide, tutorialStep }) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleActiveModal = () => {
    setIsModalActive(!isModalActive);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleActiveMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isModalActive) {
      setIsModalActive(false);
    }
  };
  return (
    <>
      <div className="action-menus">
        <div className="action-menus__menu">
          {/* <div
            className={`${!hide ? "action-menus__menu__item" : "hide"} ${
            tutorialStep === 3 ? "c-tutorial--active" : ""
          }`}
            onClick={() => handleActiveMenu()}
            id="people"
          >
            <img src={LastPixel} alt="" className="menu" />
          </div> */}

          <div
            className={!hide ? "action-menus__menu__item" : "hide"}
            onClick={() => handleActiveModal()}
          >
            <img src={Consigne} alt="" className="menu" />
          </div>

          <div>
            <TwitchModalButton hide={hide} tutorialStep={tutorialStep} />
          </div>

          {!isMenuOpen ? (
            <div
              className={`action-menus__menu__item ${
                tutorialStep === 1 ? "c-tutorial--active" : ""
              }`}
              onClick={() => setHide(!hide)}
              id="eye"
            >
              <img src={!hide ? OpenEye : CloseEye} alt="" className="menu" />
            </div>
          ) : (
            <div
              className="action-menus__menu__item"
              style={isMenuOpen ? { zIndex: 12 } : null}
              onClick={() => setIsMenuOpen(false)}
            >
              <img src={CloseIcon} alt="" className="menu" />
            </div>
          )}
        </div>
      </div>

      <RulesModal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
      />
      <LastPixelMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};

export default ActionMenus;
