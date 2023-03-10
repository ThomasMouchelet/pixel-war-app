import LastPixel from "../../assets/images/dark-players-icon.svg";
import OpenEye from "../../assets/images/dark-opened-eye-icon.svg";
import CloseEye from "../../assets/images/white-closed-eye-icon.svg";
import Help from "../../assets/images/dark-help-icon.svg";
import OpenedPeople from "../../assets/images/white-players-icon.svg";
import CloseIcon from "../../assets/images/close_icon.png";
import PixelWarLogo from "../../assets/images/pixel-war-logo.svg";
import LogOutButton from "./LogOut/LogOutButton";
import RulesModal from "./RulesModal/RulesModal";
import { useState, useRef } from "react";
import Ranking from "../../assets/images/ranking.png";
import WhiteRanking from "../../assets/images/white-ranking-icon.svg";
import LastPixelMenu from "./LastPixelMenu/LastPixelMenu";
import TwitchModalButton from "./Twitch.jsx/TwitchModalButton";
import pause_icon from "../../assets/images/pause_icon.svg";
import RankingMenu from "./RankingMenu/RankingMenu";
import UserProfile from "./UserProfile/UserProfile";
import ArrowIcon from "../../assets/images/arrow.png";

const ActionMenus = ({
  setHide,
  hide,
  tutorialStep,
  pause,
  progress,
  setTutorialStep,
}) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTwitchModalActive, setIsTwitchModalActive] = useState(true);
  const [isMenuActive, setIsMenuActive] = useState(true);

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const menuRef = useRef(null);
  const closeIconRef = useRef(null);
  const [isRankingModalActive, setIsRankingModalActive] = useState(false);

  const handleReturnTuto = () => {
    localStorage.removeItem("tutorial");
    setTutorialStep(1);
  };

  const handleActiveMenu = () => {
    setIsTwitchModalActive(false);
    setIsMenuOpen(!isMenuOpen);
    if (isModalActive) {
      setIsModalActive(false);
    }
  };

  const handleClose = () => {
    if (!isMenuOpen && !isTwitchModalActive) {
      if (isMenuActive) {
        menuRef.current.style.animation =
          "center-to-right-1000 1000ms forwards";
        setIsMenuActive(false);
      } else {
        menuRef.current.style.animation = "";
        menuRef.current.style.animation =
          "right-to-center-1000 ease-in 1000ms forwards";
        setIsMenuActive(true);
      }
    }
    setIsMenuOpen(false);
    setIsTwitchModalActive(false);
    setIsRankingModalActive(false);
  };

  const handleHideBG = () => {
    if (!hide) {
      menuRef.current.style.background = "transparent"
      closeIconRef.current.style.display = "none"
    }
    else {
      menuRef.current.style.background = "#E27D41"
      closeIconRef.current.style.display = "block"
    }
  }


  return (
    <>
      {isMenuActive ? (
        <img
          src={CloseIcon}
          className="close-icon"
          onClick={handleClose}
          alt=""
          ref={closeIconRef}
        />
      ) : (
        <img
          src={ArrowIcon}
          className="action-menus__arrow-icon"
          onClick={handleClose}
          alt=""
        />
      )}
      <div
        className={!hide ? "action-menus" : "action-menus action-menus-hidden"}
        ref={menuRef}
      >
        <div className="action-menus__menu">
          <div className={!hide ? "pixel-war-logo" : "hide"}>
            <img src={PixelWarLogo} className="header-logo" alt="" />
          </div>
          <UserProfile progress={progress} hide={hide} />
          {!isMenuOpen ? (
            <div
              className={`${!hide ? "action-menus__menu__item" : "hide"} ${
                tutorialStep === 3 ? "c-tutorial--active" : ""
              }`}
              onClick={() => {
                handleActiveMenu();
                setIsRankingModalActive(false);
                setIsTwitchModalActive(false);
                setIsModalActive(false);
              }}
            >
              <img src={LastPixel} alt="" className="menu" />
            </div>
          ) : (
            <div
              className={!hide ? "action-menus__menu__item" : "hide"}
              onClick={() => {
                handleActiveMenu();
              }}
            >
              <img src={OpenedPeople} alt="" className={!isSafari ? "menu" : "menu safari-menu"} />
            </div>
          )}

          <div
            className={!hide ? "action-menus__menu__item" : "hide"}
            onClick={() => {
              setIsRankingModalActive(!isRankingModalActive);
              setIsTwitchModalActive(false);
              setIsMenuActive(false);
            }}
          >
            {isRankingModalActive ? (
              <img src={WhiteRanking} alt="" className={!isSafari ? "menu" : "menu safari-menu"} />
            ) : (
              <img
                onClick={() => {
                  setIsTwitchModalActive(false);
                  setIsMenuOpen(false);
                }}
                src={Ranking}
                alt=""
                className={hide ? "hide" : !isSafari ? "menu" : "menu safari-menu"}
              />
            )}
          </div>

          <div
            className={!hide ? "" : "hide"}
            onClick={() => {
              setIsTwitchModalActive(!isTwitchModalActive);
              setIsRankingModalActive(false);
              setIsModalActive(false);
              setIsMenuOpen(false);
            }}
          >
            <TwitchModalButton
              hide={hide}
              isTwitchModalActive={isTwitchModalActive}
              setIsTwitchModalActive={setIsTwitchModalActive}
              tutorialStep={tutorialStep}
              onClick={() => {
                setIsRankingModalActive(false);
                setIsModalActive(false);
              }}
            />
          </div>

          <div
            className={`action-menus__menu__item ${
              tutorialStep === 1 ? "c-tutorial--active" : ""
            }`}
            onClick={() => {
              setHide(!hide);
              handleHideBG()
            }}
          >
            <img src={!hide ? OpenEye : CloseEye} alt="" className={!isSafari ? "menu" : "menu safari-menu"} />
          </div>
          <div
            className={!hide ? "action-menus__menu__item" : "hide"}
            onClick={() => {
              handleReturnTuto();
              setIsTwitchModalActive(false);
              setIsModalActive(false);
            }}
          >
            <img src={Help} alt="" className={!isSafari ? "menu" : "menu safari-menu"} />
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
      <RankingMenu
        isRankingModalActive={isRankingModalActive}
        setIsRankingModalActive={setIsRankingModalActive}
        hide={hide}
      />
      <LastPixelMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};

export default ActionMenus;
