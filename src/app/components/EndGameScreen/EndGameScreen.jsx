import { memo } from "react";
import { useState } from "react";
import logo from "../../assets/images/Logo_Big_Stroke.png";
import settingsLogo from '../../assets/images/Vector.png';
import RulesModal from "../Actions/RulesModal/RulesModal";

const EndGameScreen = ({time, dateNow, startedAt}) => {
  const [rulesIsOpen, setRulesIsOpen] = useState(false);

  return (
    <>
   {dateNow < startedAt ? <>
   {
    rulesIsOpen ?     <RulesModal
    isModalActive={rulesIsOpen}
    setIsModalActive={setRulesIsOpen}
  /> : null
   }
    <div className="container">
      <nav className="navbar">
        <div className="nav-container">
          <img src={logo} alt="" className="logo" />
          <div className="btn-container">
            <button className="settings-btn" onClick={() => setRulesIsOpen(!rulesIsOpen)}>
                <img src={settingsLogo} alt=""/>
            </button>
          </div>
        </div>
      </nav>
      <div className="timer-container">
        <p className="timer-sentence">La prochaine partie commence dans :</p>
        <div className="timer">
            <p>{time}</p>
        </div>
      </div>
    </div>
   </> : null}
    </>
  );
};

export default memo(EndGameScreen);
