import LastPixel from "../../assets/images/dark-players-icon.svg";
import OpenEye from "../../assets/images/dark-opened-eye-icon.svg";
import CloseEye from "../../assets/images/white-closed-eye-icon.svg";
import Help from "../../assets/images/dark-help-icon.svg";
import CloseIcon from "../../assets/images/close_icon.png";
import PixelWarLogo from '../../assets/images/pixel-war-logo.svg'
import LogOutButton from "./LogOut/LogOutButton";
import RulesModal from "./RulesModal/RulesModal";
import { useState } from "react";
import LastPixelMenu from "./LastPixelMenu/LastPixelMenu";
import TwitchModalButton from "./Twitch.jsx/TwitchModalButton";
import pause_icon from "../../assets/images/pause_icon.svg";

const ActionMenus = ({ setHide, hide, tutorialStep, pause }) => {
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
      <div className={!hide ? "action-menus" : "action-menus action-menu-transparent"}>
        <div className="action-menus__menu">
        <div
            className={!hide ? "pixel-war-logo" : "hide"}
          >
           <img src={PixelWarLogo} alt=""/>
          </div>
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
              onClick={() => handleActiveMenu()}
            >
              <img src={CloseIcon} alt="" className="menu" />
            </div>
          )}
          

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
          <div
              className={!hide ? "action-menus__menu__item" : "hide"}
            >
              <img src={Help} alt="" className="menu" />
            </div>
          
          <LogOutButton hide={hide} />
        {pause ? (
          <div className="pause-war">
            <img src={pause_icon} alt="" />
          </div>
        ) : null}
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
