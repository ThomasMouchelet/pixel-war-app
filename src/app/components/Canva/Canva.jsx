import { useEffect, useRef, useState } from "react";

import ColorBar from "../ColorBar/ColorBar";
import HudInfo from "../HudInfos/HudInfos";
import ActionMenus from "../Actions/ActionsMenus";
import EndGameScreen from "../EndGameScreen/EndGameScreen";
import ProgressBar from "../ProgressBar/ProgressBar";
import HoverInfo from "../HoverInfo/HoverInfo";
import LogOutButton from "../Actions/LogOut/LogOutButton";
import ScaleButton from "../Actions/ScaleButton/ScaleButton";

import {
  updateGameParams,
  getTimer,
  getUserScore,
  pausingGame,
  checkUserIsAdmin,
  closingGame,
  disableKeyboardKeys,
  getImage,
  // addImage,
} from "../../../setup/services/game.service";
import useTimer from "../../../setup/context/timerContext";
import { createCookie, readCookie } from "../../../setup/utils/cookies";
import {
  createPixelService,
  getPixel,
  updatePixelsGrid,
} from "../../../setup/services/pixel.service";

import pause_icon from "../../assets/images/pause_icon.svg";
import Draggable from "react-draggable";
import { getUidFromLocalstorage } from "../../../setup/utils/uid";
import Tutorial from "../Tutorial/Tutorial";
import {
  getLastTwentyUser,
  listenAllUsers,
} from "../../../setup/services/user.service";

const Canva = ({
  currentColor,
  setCurrentColor,
  pixelColor,
  setPixelColor,
}) => {
  const { setNewPixelIsCreated, newPixelIsCreated } = useTimer();
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [cursorColor, setCursorColor] = useState("");
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);
  const [pause, setPause] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(1);
  const [isClosing, setIsClosing] = useState(false);
  const [isScaled, setIsScaled] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const gameContainerRef = useRef(null);
  const [gameParams, setGameParams] = useState({});
  const gameRef = useRef(null);
  const addPixelAnimRef = useRef(null);
  const cursorRef = useRef(null);
  const [time, setTime] = useState(0);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [scale, setScale] = useState(1);
  const [image, setImage] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  let currentColorChoice = currentColor;
  const gridCellSize = 10;

  const startDateEvent = new Date("2023-01-13T13:00:00");
  const dateNow = new Date();

  // const handleDefineTimer = () => {
  //   const difference = startDateEvent.getTime() - dateNow.getTime();
  //   setTimeEnd(difference);
  // };

  const hours = Math.floor(time / 1000 / 3600);
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

  const handleFollowMouse = (event, scale) => {
    const cursorWidthScale = cursorRef.current.offsetWidth * scale;
    const cursorHeightScale = cursorRef.current.offsetHeight * scale;
    const gridCellSizeScale = gridCellSize * scale;
    const cursorLeft = event.clientX + cursorWidthScale / 2;
    const cursorTop = event.clientY + cursorHeightScale / 2;
    cursorRef.current.style.left =
      Math.floor(cursorLeft / gridCellSizeScale) * gridCellSizeScale + "px";
    cursorRef.current.style.top =
      Math.floor(cursorTop / gridCellSizeScale) * gridCellSizeScale + "px";

    let oldx;
    let oldy;

    if (window.matchMedia("(max-width: 768px)").matches) {
      var rect = gameRef.current.getBoundingClientRect();
      oldx = (rect.x - event.changedTouches[0].clientX) * -1;
      oldy = (rect.y - event.changedTouches[0].clientY) * -1;
    } else {
      oldx = event.nativeEvent.offsetX;
      oldy = event.nativeEvent.offsetY;
    }

    setXPosition(Math.round(oldx / 10) * 10);
    setYPosition(Math.round(oldy / 10) * 10);
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  async function createPixel(ctx, x, y, color, init = false) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridCellSize, gridCellSize);
    if (!init) {
      const timestampTimer = Math.floor(
        (new Date().getTime() + gameParams.gameTimer * 1000) / 1000
      );
      createCookie("Google Analytics", timestampTimer, 1);
      setNewPixelIsCreated(true);
    }
    setPixelColor([x, y]);
    addPixelAnimRef.current.style.top = y + "px";
    addPixelAnimRef.current.style.left = x + "px";
    addPixelAnimRef.current.style.animation =
      "pixelAddAnim ease-in-out 1s forwards";
    addPixelAnimRef.current.addEventListener("animationend", () => {
      addPixelAnimRef.current.style.animation = "";
    });
    let dataURL = localStorage.getItem(gameRef.current);
    // await addImage(dataURL)
  }

  function addPixelIntoGame() {
    const timestampTimer = readCookie("Google Analytics");
    const game = gameRef.current;
    const ctx = game.getContext("2d");
    const x = cursorRef.current.offsetLeft;
    const y = cursorRef.current.offsetTop - game.offsetTop;
    const userId = localStorage.getItem("uid");
    const payload = {
      x: x,
      y: y,
      color: currentColor,
      userId: userId,
    };
    const currentTime = Math.floor(new Date().getTime() / 1000);
    if (timestampTimer > currentTime && isAdminUser !== true) {
      return;
    }
    if (newPixelIsCreated && isAdminUser !== true) {
      return;
    }
    createPixelService(payload);
    createPixel(ctx, x, y, currentColorChoice);
  }

  async function drawPixelOnInit() {
    const game = gameRef.current;
    const ctx = game.getContext("2d");
    // const imgDatabase = await getImage();
    // const img = new Image();
    // img.src = imgDatabase;
    // img.onload = () => {
    //   ctx.drawImage(img, 0, 0);
    // }
  }

  function handleMouseDown() {
    if (window.matchMedia("(max-width: 768px)").matches) {
      document.addEventListener("touchmove", () => {
        setIsMoving(true);
      }, { passive: false });
    } else {
      document.addEventListener("mousemove", () => {
        setIsMoving(true);
      });
    }
    setIsMoving(false);
  }

  function handleMouseUp(e) {
    if (isMoving === false) {
      const timestampTimer = readCookie("Google Analytics");
      let oldx;
      let oldy;

      if (window.matchMedia("(max-width: 768px)").matches) {
        var rect = gameRef.current.getBoundingClientRect()
        oldx = (rect.x - e.changedTouches[0].pageX) * -1
        oldy = (rect.y - e.changedTouches[0].pageY) * -1
      } else {
        oldx = e.offsetX;
        oldy = e.offsetY;
      }

      const game = gameRef.current;
      const ctx = game.getContext("2d");
      ctx.save();

      let x = Math.round(oldx / 10) * 10;
      console.log(x, "newX");
      let y = Math.round(oldy / 10) * 10;
      console.log(y, "newY");

      if (!isScaled) {
        const currentTime = Math.floor(new Date().getTime() / 1000);
        if (timestampTimer > currentTime && isAdminUser !== true) {
          return;
        }
        if (newPixelIsCreated && isAdminUser !== true) {
          return;
        }
        const userId = localStorage.getItem("uid");
        let dataURL = localStorage.getItem(gameRef.current);
        let img = new Image();
        img.src = dataURL;
        createPixel(ctx, x, y, currentColorChoice);
        createPixelService({
          x: x,
          y: y,
          color: currentColorChoice,
          userId: userId,
          urlImg: img.src
        });

        if (gameParams.isPlaying === false) {
          setPause(true);
          return;
        }
        // addPixelIntoGame();
        setPause(false);
        if (!newPixelIsCreated) {
          setProgress(progress + 1);
          const cursorInterval = setInterval(() => {
            setCursorColor(getRandomColor());
          }, 10);

          setTimeout(() => {
            clearInterval(cursorInterval);
            setCursorColor("black");
          }, 600);
        }
      }
      localStorage.setItem(gameRef.current, gameRef.current.toDataURL("image/bmp"));
    }

    let transform = gameRef.current.style.transform;
    var translateX = transform
      .substring(transform.indexOf("(") + 1, transform.indexOf(","))
      .trim()
      .replace("px", "");
    let translateY = transform
      .substring(transform.indexOf(",") + 1, transform.indexOf(")"))
      .trim()
      .replace("px", "");
    let newTranslateX = Math.round(translateX / 10) * 10;
    let newTranslateY = Math.round(translateY / 10) * 10;

    gameRef.current.style.transform =
      "translate( " + newTranslateX + "px, " + newTranslateY + "px)";

    setIsMoving(false);
  }

  async function drawGrids(ctx, width, height, cellWidth, cellHeight) {
    ctx.beginPath();
    ctx.strokeStyle = "#ccc";

    for (let i = 0; i < width; i++) {
      ctx.moveTo(i * cellWidth, 0);
      ctx.lineTo(i * cellWidth, height);
    }

    for (let i = 0; i < height; i++) {
      ctx.moveTo(0, i * cellHeight);
      ctx.lineTo(width, i * cellHeight);
    }
    ctx.stroke();
    const game = gameRef.current;
    const gridCtx = game.getContext("2d");
    // var dataURL = await getImage()
    // var img = new Image();
    // img.src = dataURL;
    // img.onload = () => {
    //   gridCtx.drawImage(img, 0, 0);
    // }
  }

  const handleScale = () => {
    if (!isScaled) {
      gameContainerRef.current.style.transform = "scale(0.7)";
      cursorRef.current.style.display = "none";
      gameRef.current.style.cursor = "grab";
      setIsScaled(true);
      return;
    }
    if (isScaled === true) {
      gameContainerRef.current.style.transform = "scale(1)";
      cursorRef.current.style.display = "block";
      gameRef.current.style.cursor = "none";
      setIsScaled(false);
      return;
    }
  };

  useEffect(() => {
    // getImage()
    getTimer(setTime);
    getUserScore(setProgress);
    const game = gameRef.current;
    game.width = 2000;
    game.height = 1000;
    const gridCtx = game.getContext("2d");
    drawGrids(gridCtx, game.width, game.height, gridCellSize, gridCellSize);
    drawPixelOnInit();
    updatePixelsGrid(game, createPixel);
    updateGameParams(setGameParams);
    pausingGame(setPause);
    checkIsAdmin();
    closingGame(setIsClosing);
    disableKeyboardKeys();
    getLastTwentyUser();
    listenAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    console.log(allUsers);
  }, [allUsers]);

  const checkIsAdmin = async () => {
    const isAdmin = await checkUserIsAdmin();
    setIsAdminUser(isAdmin);
  };

  // useEffect(() => {
  //   handleDefineTimer();
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     return setTimeEnd(time - 1);
  //   }, 1000);
  // }, [time]);

  return (
    <>
      {isClosing ? (
        <EndGameScreen
          time={renderTime()}
          dateNow={dateNow.getTime()}
          startedAt={startDateEvent.getTime()}
          style={time < 0 ? { display: "block" } : { display: "none" }}
        />
      ) : null}
      <div className="c-canvas">
        <div
          id="cursor"
          className="c-canvas__cursor"
          ref={cursorRef}
          style={{ borderColor: cursorColor }}
          onMouseUp={(e) => handleMouseUp(e)}
        >
          <HoverInfo x={xPosition} y={yPosition} />
        </div>
        <div className="canva-container" ref={gameContainerRef} id="container">
          <Draggable
            onStart={() => handleMouseDown()}
            onStop={(e) => handleMouseUp(e)}
          >
            <canvas
              id="game"
              ref={gameRef}
              onMouseMove={(e) => handleFollowMouse(e, scale)}
              onTouchStart={(e) => handleMouseDown(e)}
              onTouchEnd={(e) => handleMouseUp(e)}
              className="c-canvas__game"
            ></canvas>
          </Draggable>
        </div>
        <div ref={addPixelAnimRef} className="pixelAdd">
          +1
        </div>
        {time && (
          <HudInfo
            hide={hide}
            totalTimeInSec={time}
            tutorialStep={tutorialStep}
          />
        )}
        {gameParams.gameTimer && (
          <ColorBar
            hide={hide}
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            gameTimer={gameParams.gameTimer}
            tutorialStep={tutorialStep}
          />
        )}
        <ActionMenus setHide={setHide} hide={hide} tutorialStep={tutorialStep} pause={pause} setTutorialStep={setTutorialStep} />
        <ProgressBar
          hide={hide}
          progress={progress}
          setProgress={setProgress}
          tutorialStep={tutorialStep}
        />
        <ScaleButton
          handleScale={handleScale}
          isScaled={isScaled}
          hide={hide}
        />
        <LogOutButton hide={hide} />
        <Tutorial step={tutorialStep} setStep={setTutorialStep} />
        {pause ? (
          <div className="pause-war">
            <img src={pause_icon} alt="" />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Canva;
