import { useEffect, useState } from "react";

const HudInfo = ({ totalTimeInSec, hide, tutorialStep }) => {
  const [time, setTime] = useState(totalTimeInSec);
  const [isOrange, setIsOrange] = useState(false);

  const hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = Math.floor(time % 60);

  const renderTime = () => {
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return hours + ":" + minutes + ":" + seconds;
  };

  const handleLastFiveMinutes = () => {
    setIsOrange(!isOrange);
  };

  useEffect(() => {
    setTimeout(() => {
      if (time <= 300) {
        handleLastFiveMinutes();
      }
      setTime(time - 1);
    }, 1000);
  }, [time]);

  return (
    <div
      className={`${!hide ? "c-hud-info" : "hide"} ${
        tutorialStep === 4 ? "c-tutorial--active--absolute" : ""
      }`}
      id="time"
    >
      <div
        className={
          !isOrange
            ? "c-hud-info__container"
            : "c-hud-info__container orange-timer"
        }
      >
        <div className="c-hud-info__left"></div>
        <p>Temps: {renderTime()}</p>
        <div className="c-hud-info__right"></div>
      </div>
    </div>
  );
};

export default HudInfo;
