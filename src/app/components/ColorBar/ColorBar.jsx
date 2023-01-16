import { useEffect, useMemo, useRef, useState } from "react";
import useTimer from "../../../setup/context/timerContext";
import { readCookie } from "../../../setup/utils/cookies";
import arrowIcon from "../../assets/images/arrow.png";

const ColorBar = ({ currentColor, setCurrentColor, hide, gameTimer }) => {
  const [time, setTime] = useState(0);
  const [isRotated, setIsRotated] = useState(false);
  const { newPixelIsCreated, setNewPixelIsCreated } = useTimer();

  useEffect(() => {
    setTime(gameTimer);
  }, []);

  const colorList = [
    "#FFFFFF",
    "#FFEBEE",
    "#FCE4EC",
    "#F3E5F5",
    "#B39DDB",
    "#9FA8DA",
    "#90CAF9",
    "#81D4FA",
    "#80DEEA",
    "#4DB6AC",
    "#66BB6A",
    "#9CCC65",
    "#CDDC39",
    "#FFEB3B",
    "#FFC107",
    "#FF9800",
    "#FF5722",
    "#A1887F",
    "#E0E0E0",
    "#90A4AE",
    "#000000",
    "#A51515",
    "#AB6321",
    "#901475",
    "#BE8753",
    "#8B8611",
    "#7EA540",
    "#8DE98B",
    "#28521D",
    "#A1C5C5",
    "#185374",
    "#AAC2FF",
    "#9F7EB9",
    "#8B0546",
    "#FC6DFF",
    "#DADADA",
    "#000575757",
  ];

  const colorListRef = useRef(null);
  const arrowRef = useRef(null);
  const arrowRef2 = useRef(null);

  useEffect(() => {
    const timestampTimer = readCookie("Google Analytics");
    if (timestampTimer) {
      const currentTime = Math.floor(new Date().getTime() / 1000);
      if (currentTime < timestampTimer) {
        setNewPixelIsCreated(true);
        setTime(timestampTimer - currentTime);
      }
    }
  }, []);

  const handleColorListNavigationLeft = () => {
    arrowRef2.current.style.opacity = "1";
    if (!isRotated) {
      colorListRef.current.scrollBy(colorListRef.current.clientWidth / 10, 0);
      if (
        colorListRef.current.scrollLeft >
        colorListRef.current.clientWidth * 0.9
      ) {
        setIsRotated(true);
      }
      return;
    }
    if (isRotated == true) {
      colorListRef.current.scrollBy(colorListRef.current.clientWidth / 10, 0);
      if (
        colorListRef.current.scrollLeft <
        colorListRef.current.clientWidth * 0.1
      ) {
        setIsRotated(false);
      }
      return;
    }
  };

  const handleColorListNavigationRight = () => {
    if (!isRotated) {
      if (
        colorListRef.current.scrollLeft >
        colorListRef.current.clientWidth * 0.01
      ) {
        arrowRef.current.style.opacity = "1";
        colorListRef.current.scrollBy(
          colorListRef.current.clientWidth / -10,
          0
        );
        setIsRotated(true);
      }
      return;
    }
    if (isRotated == true) {
      colorListRef.current.scrollBy(colorListRef.current.clientWidth / -10, 0);
      arrowRef.current.style.opacity = "1";
      if (
        colorListRef.current.scrollLeft <
        colorListRef.current.clientWidth * 0.1
      ) {
        setIsRotated(false);
      }
      return;
    }
  };

  const handleChangeComplete = (event) => {
    for (let i = 1; i < colorListRef.current.childElementCount; i++) {
      colorListRef.current.children[i].innerHTML = ``;
    }
    event.target.innerHTML = `<i class="fa-solid fa-check"></i>`;
    setCurrentColor(event.target.style.backgroundColor);
  };

  let minutes = Math.floor((time % 3600) / 60);
  let seconds = Math.floor(time % 60);

  const renderTime = () => {
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return `${minutes} : ${seconds}`;
  };

  useMemo(() => {
    if (newPixelIsCreated === true) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
    if (time === 0) {
      setNewPixelIsCreated(false);
      setTime(gameTimer);
    }
  }, [newPixelIsCreated, time, setNewPixelIsCreated]);

  return (
    <div
      className={!hide ? "colorBar" : "hide"}
      id="colors"
      style={newPixelIsCreated ? { width: "16rem", height: "4rem" } : null}
    >
      <div className="color-list" ref={colorListRef}>
        {newPixelIsCreated === false ? (
          <>
            <img
              ref={arrowRef2}
              src={arrowIcon}
              className="arrow-icon arrow-icon-2"
              onClick={handleColorListNavigationRight}
            />
            {colorList.map((color, index) => (
              <div
                key={index}
                onClick={(event) => handleChangeComplete(event)}
                style={{ backgroundColor: color }}
                className="color-item"
              ></div>
            ))}
            <img
              ref={arrowRef}
              src={arrowIcon}
              className="arrow-icon"
              onClick={handleColorListNavigationLeft}
            />
          </>
        ) : (
          <p className="cooldown">{renderTime()}</p>
        )}
      </div>
    </div>
  );
};

export default ColorBar;
