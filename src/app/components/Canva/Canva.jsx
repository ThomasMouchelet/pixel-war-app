import { useEffect, useRef, useState } from "react";
import ColorBar from "../ColorBar/ColorBar";
import HudInfo from "../HudInfos/HudInfos";
import ActionMenus from "../Actions/ActionsMenus";
import ghost from "../../assets/images/ghost.png";
import pause_icon from "../../assets/images/pause_icon.svg";
import EndGameScreen from "../EndGameScreen/EndGameScreen";
import {
  createPixelService,
  getPixel,
  updateGameParams,
  getTimer,
  getUserScore,
  updatePixelsGrid,
  pausingGame,
  checkUserIsAdmin,
  closingGame,
} from "../../../setup/services/game.service";

import useTimer from "../../../setup/context/timerContext";
import ProgressBar from "../ProgressBar/ProgressBar";
import { createCookie, readCookie } from "../../../setup/utils/cookies";
import LogOutButton from "../Actions/LogOut/LogOutButton";

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
  const [isClosing, setIsClosing] = useState(false)

  const [gameParams, setGameParams] = useState({})
  const gameRef = useRef(null);
  const addPixelAnimRef = useRef(null);
  const cursorRef = useRef(null);
  const [time, setTime] = useState(0);
  const [isAdminUser, setIsAdminUser] = useState(false);


  let currentColorChoice = currentColor;
  const gridCellSize = 10;

  const startDateEvent = new Date("2023-01-12T12:00:00");
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

  const handleAddPixel = () => {
    console.log("handleAddPixel gameParams : ", gameParams);
    if( gameParams.isPlaying === false) {
      setPause(true);
      return;
    }
    addPixelIntoGame();
    setPause(false);
    if(!newPixelIsCreated){
      setProgress(progress + 1);
      const test = setInterval(() => {
        setCursorColor(getRandomColor());
      }, 10); 
  
      setTimeout(() => {
        clearInterval(test);
        setCursorColor("black");
      }, 600);
    }
  };

  const handleFollowMouse = (event) => {
    const game = gameRef.current;
    const cursorLeft = event.clientX - cursorRef.current.offsetWidth / 2;
    const cursorTop = event.clientY - cursorRef.current.offsetHeight / 2;
    const x = cursorRef.current.offsetLeft;
    const y = cursorRef.current.offsetTop - game.offsetTop;
    setXPosition(x / 10);
    setYPosition(y / 10);
    cursorRef.current.style.left =
      Math.floor(cursorLeft / gridCellSize) * gridCellSize + "px";
    cursorRef.current.style.top =
      Math.floor(cursorTop / gridCellSize) * gridCellSize + "px";
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function createPixel(ctx, x, y, color, init = false) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridCellSize, gridCellSize);
    if (!init) {
      console.log("createPixel gameParams : ", gameParams);
      const timestampTimer = Math.floor((new Date().getTime() + gameParams.gameTimer) / 1000);
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
    const pixels = await getPixel();
    pixels.forEach((pixel) => {
      createPixel(ctx, pixel.x, pixel.y, pixel.color, true);
    });
  }

  function drawGrids(ctx, width, height, cellWidth, cellHeight) {
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
  }

  useEffect(() => {
    getTimer(setTime)
    getUserScore(setProgress);
    const game = gameRef.current;
    game.width = document.body.clientWidth;
    game.height = document.body.clientHeight;
    const gridCtx = game.getContext("2d");
    drawGrids(gridCtx, game.width, game.height, gridCellSize, gridCellSize);
    drawPixelOnInit();
    updatePixelsGrid(game, createPixel);
    updateGameParams(setGameParams)
    pausingGame(setPause)
    checkIsAdmin()
  }, []);

  const checkIsAdmin = async () => {
    const isAdmin = await checkUserIsAdmin();
    console.log("isAdmin : ", isAdmin);
    setIsAdminUser(isAdmin);
  }

  useEffect(() => {
    // handleDefineTimer();
    closingGame(setIsClosing)
  }, []);

  // useEffect(() => {
  //   handleDefineTimer();
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     return setTime(time - 1);
  //   }, 1000);
  // }, [time]);

  return (
    <>
    {
      isClosing
      ? <EndGameScreen time={renderTime()} dateNow={dateNow.getTime()} startedAt={startDateEvent.getTime()} style={time < 0 ? {display: 'block'} : {display: 'none'}} />
      : null
    }
      <div className="c-canvas">
        <div
          id="cursor"
          className="c-canvas__cursor"
          ref={cursorRef}
          style={{ borderColor: cursorColor }}
          onClick={handleAddPixel}
        ></div>
        <canvas
          id="game"
          ref={gameRef}
          onClick={() => handleAddPixel()}
          onMouseMove={(e) => handleFollowMouse(e)}
          className="c-canvas__game"
        ></canvas>
        <div ref={addPixelAnimRef} className="pixelAdd">
          +1
        </div>
        {time && 
          <HudInfo hide={hide} totalTimeInSec={time} x={xPosition} y={yPosition} />
        }
        {gameParams.gameTimer && (
          
        <ColorBar
            hide={hide}
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            gameTimer={gameParams.gameTimer}
          />
        )}
        <ActionMenus setHide={setHide} hide={hide} />
        <ProgressBar
          hide={hide}
          progress={progress}
          setProgress={setProgress}
        />
        <LogOutButton hide={hide} />
        {pause ? 
          <div className="pause-war">
            <img src={pause_icon} alt="" />
          </div>
         : null}
      </div>
    </>
  );
};

export default Canva;
