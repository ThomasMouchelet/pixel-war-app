import { useState } from "react";
import Canva from "../components/Canva/Canva";
import Tutorial from "../components/Tutorial/Tutorial";

const HomePage = () => {
  const [currentColor, setCurrentColor] = useState("#4287f5");
  const [pixelColor, setPixelColor] = useState([]);

  return (
    <Canva
      currentColor={currentColor}
      setCurrentColor={setCurrentColor}
      pixelColor={pixelColor}
      setPixelColor={setPixelColor}
    />
  );
};

export default HomePage;
