import { useEffect, useRef, useState } from "react";
import ColorBar from "../ColorBar/ColorBar";
import HudInfo from "../HudInfos/HudInfos";
import ActionMenus from "../ActionsMenus/ActionsMenus";
import ghost from "../../assets/images/ghost.png";
import {
  createPixelService,
  getPixel,
  updateGameParams,
  getTimer,
  getUserScore,
  updatePixelsGrid,
} from "../../../setup/services/game.service";

import useTimer from "../../../setup/context/timerContext";
import ProgressBar from "../ProgressBar/ProgressBar";
import { createCookie, readCookie } from "../../../setup/utils/cookies";

const Canva = ({
  currentColor,
  setCurrentColor,
  pixelColor,
  setPixelColor,
}) => {
  const { setNewPixelIsCreated, newPixelIsCreated } = useTimer();
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [stillTest, setStillTest] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);

  const [gameParams, setGameParams] = useState({})
  const gameRef = useRef(null);
  const addPixelAnimRef = useRef(null);
  const cursorRef = useRef(null);
  const [time, setTime] = useState(0);
  //   "#FFEBEE",
  //   "#FCE4EC",
  //   "#F3E5F5",
  //   "#B39DDB",
  //   "#9FA8DA",
  //   "#90CAF9",
  //   "#81D4FA",
  //   "#80DEEA",
  //   "#4DB6AC",
  //   "#66BB6A",
  //   "#9CCC65",
  //   "#CDDC39",
  //   "#FFEB3B",
  //   "#FFC107",
  //   "#FF9800",
  //   "#FF5722",
  //   "#A1887F",
  //   "#E0E0E0",
  //   "#90A4AE",
  //   "#000",
  // ];

  let currentColorChoice = currentColor;
  const gridCellSize = 10;

  const handleAddPixel = () => {
    console.log("handleAddPixel gameParams : ", gameParams);
    if( gameParams.isOpen === false) return;
    addPixelIntoGame();
    if(!newPixelIsCreated){
      setProgress(progress + 1);
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

  function createPixel(ctx, x, y, color, init = false) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridCellSize, gridCellSize);
    if (!init) {
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
    if (timestampTimer > currentTime) {
      return;
    }
    if (newPixelIsCreated) {
      return;
    }
    createPixelService(payload);
    // socket emit payload as "pixel"
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

    setTimeout(() => {
      setStillTest(false);
    }, 5000);
  }, []);

  return (
    <div className="c-canvas">
      <div
        id="cursor"
        className="c-canvas__cursor"
        ref={cursorRef}
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
      <ProgressBar hide={hide} progress={progress} setProgress={setProgress} />
      {stillTest && (
        <div className="test-war">
          <img src={ghost} alt="" />
          <p>
            Cette war est un test ! Pas d’authentification donc pas de
            comptabilisation de points{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default Canva;
