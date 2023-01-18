import LastPixel from "../../assets/images/dark-players-icon.svg";
import OpenEye from "../../assets/images/dark-opened-eye-icon.svg";
import CloseEye from "../../assets/images/white-closed-eye-icon.svg";
import Help from "../../assets/images/dark-help-icon.svg";
import OpenedPeople from "../../assets/images/white-players-icon.svg";
import CloseIcon from "../../assets/images/close_icon.png";
import PixelWarLogo from '../../assets/images/pixel-war-logo.svg'
import LogOutButton from "./LogOut/LogOutButton";
import RulesModal from "./RulesModal/RulesModal";
import { useState, useRef } from "react";
import LastPixelMenu from "./LastPixelMenu/LastPixelMenu";
import TwitchModalButton from "./Twitch.jsx/TwitchModalButton";
import pause_icon from "../../assets/images/pause_icon.svg";

const ActionMenus = ({ setHide, hide, pause }) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTwitchModalActive, setIsTwitchModalActive] = useState(true);
  const [isMenuActive, setIsMenuActive] = useState(true);

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const menuRef = useRef(null)

  const handleActiveModal = () => {
    setIsModalActive(!isModalActive);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleActiveMenu = () => {
    setIsTwitchModalActive(false)
    setIsMenuOpen(!isMenuOpen);
    if (isModalActive) {
      setIsModalActive(false);
    }
  };

  const handleClose = () => {
    if (!isMenuOpen && !isTwitchModalActive) {
      if (isMenuActive) {
        menuRef.current.style.animation = "center-to-right-1000 1000ms forwards"
        setIsMenuActive(false)
      }
      else {
        menuRef.current.style.animation = ""
        menuRef.current.style.animation = "right-to-center-1000 ease-in 1000ms forwards"
        setIsMenuActive(true)
      }
    }
    setIsMenuOpen(false)
    setIsTwitchModalActive(false)
  }
  return (
    <>
    <div>{isMobile ?  <img
    src={CloseIcon}
         className="close-icon"
         onClick={handleClose} /> : null }</div>
        
      <div className={!hide ? "action-menus" : "action-menus action-menus-hidden"} ref={menuRef}>
        <div className="action-menus__menu">
        <div
            className={!hide ? "pixel-war-logo" : "hide"}
          >
           <img src={PixelWarLogo} alt=""/>
          </div>
          {!isMenuOpen ? (

            
            <div
              className={!hide ? "action-menus__menu__item" : "hide"}
              onClick={() => handleActiveMenu()}
            >
              <img src={LastPixel} alt="" className="menu" />
            </div>
          ) : (
            
            <div
              className={!hide ? "action-menus__menu__item" : "hide"}
              onClick={() => handleActiveMenu()}
            >
              <img src={OpenedPeople} alt="" className="menu" />
            </div>
          )}
          

          <div
            className={!hide ? "" : "hide"}
            onClick={() => {setIsTwitchModalActive(!isTwitchModalActive); setIsMenuOpen(false)}}
          >
            <TwitchModalButton
              hide={hide}
              isTwitchModalActive={isTwitchModalActive}
            />
          </div>

          <div
            className="action-menus__menu__item"
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
