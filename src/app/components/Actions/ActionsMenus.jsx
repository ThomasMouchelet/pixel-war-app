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
  const [isTwitchModalActive, setIsTwitchModalActive] = useState(true);

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
          {!isMenuOpen ? (
            <div
              className={`${!hide ? "action-menus__menu__item" : "hide"} ${
                tutorialStep === 3 ? "c-tutorial--active" : ""
              }`}
              onClick={() => handleActiveMenu()}
            >
              <img src={LastPixel} alt="" className="menu" />
            </div>
          ) : (
            <div
              className={!hide ? "action-menus__menu__item" : "hide"}
              style={{ zIndex: "100", position: "fixed" }}
              onClick={() => handleActiveMenu()}
            >
              <img src={CloseIcon} alt="" className="menu" />
            </div>
          )}

          <div
            className={!hide ? "action-menus__menu__item" : "hide"}
            onClick={() => handleActiveModal()}
          >
            <img src={Consigne} alt="" className="menu" />
          </div>

          <div
            className={!hide ? "" : "hide"}
            onClick={() => setIsTwitchModalActive(!isTwitchModalActive)}
          >
            <TwitchModalButton
              hide={hide}
              isTwitchModalActive={isTwitchModalActive}
              setIsTwitchModalActive={setIsTwitchModalActive}
              tutorialStep={tutorialStep}
            />
          </div>

          <div
            className={`action-menus__menu__item ${
              tutorialStep === 1 ? "c-tutorial--active" : ""
            }`}
            onClick={() => setHide(!hide)}
          >
            <img src={!hide ? OpenEye : CloseEye} alt="" className="menu" />
          </div>
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
