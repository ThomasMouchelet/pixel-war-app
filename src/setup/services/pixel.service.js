import { collection, doc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { firestoreDb } from "../config/firebase.config";
import { updateScore } from "./game.service";

const gamesCollection = collection(firestoreDb, `game-${process.env.REACT_APP_GAME_KEY}`)

const getPixel = async () => {
    const pixels = await getDocs(gamesCollection);
    const pixelsData = pixels.docs.map((pixel) => {
      return pixel.data();
    });
    return pixelsData;
};

const updatePixelsGrid = async (game, createPixel) => {
    onSnapshot(gamesCollection, (snapshot) => {
        snapshot.docChanges().forEach(
            async (change) => {
            const doc = change.doc.data();
            const ctx = game.getContext("2d");
            createPixel(ctx, doc.x, doc.y, doc.color, true);
        }

      );
    });
};

const createPixelService = async ({ x, y, color, userId }) => {
    const user = await updateScore(userId)
    const newPixel = {
      x,
      y,
      color,
      user,
      createdAt: new Date(),
    };
    await setDoc(
      doc(
        firestoreDb,
        `game-${process.env.REACT_APP_GAME_KEY}`,
        `${newPixel.x}-${newPixel.y}`
      ),
      newPixel
    );
  };

export {
    getPixel,
    updatePixelsGrid,
    createPixelService,
}