import { firestoreDb } from "../config/firebase.config";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
  query,
} from "firebase/firestore";
const paramCollection = collection(firestoreDb, "param");

const gamesCollection = collection(
  firestoreDb,
  `game-${process.env.REACT_APP_GAME_KEY}`
);

const userCollection = collection(
    firestoreDb,
    'users'
)

const getPixel = async () => {
  const pixels = await getDocs(gamesCollection);
  const pixelsData = pixels.docs.map((pixel) => {
    return pixel.data();
  });
  return pixelsData;
};

const getUser = async (userId) => {
    const user = await getDoc(doc(userCollection, userId))
    // console.log("getUser user => ", user.data());
    return user.data()
}

const checkUserIsAdmin = async () => {
  const userId = localStorage.getItem('uid')
  // console.log("checkUserIsAdmin userId => ", userId);
  const user = await getUser(userId)
  // console.log("checkUserIsAdmin user => ", user);
  return user.isAdmin
}

const updateScore = async (userId) => {
    try {
        const user = await getUser(userId)
        // console.log("user score => ", user.totalScore);
        await updateDoc(doc(userCollection, userId), {
            totalScore: user.totalScore + 1
        })
        const updatedUser = {
            ...user,
            totalScore: user.totalScore + 1
        }
        return updatedUser
    } catch (error) {
        // console.log(error.message);
    }
}

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

const updatePixelsGrid = async (game, createPixel) => {
  onSnapshot(gamesCollection, (snapshot) => {
      snapshot.docChanges().forEach(
        async (change) => {
        const doc = change.doc.data();
        const ctx = game.getContext("2d");
        createPixel(ctx, doc.x, doc.y, doc.color, true);
      },
      (error) => {
        // console.log("error => ", error);
      }
    );
  });
};

const getUserScore = async (setProgress) => {
    const userId = localStorage.getItem('uid')
    const user = await getDoc(doc(firestoreDb, 'users', userId))
    setProgress(user.data().totalScore)
}

const getTimer = async (setTime) => {
    const game = await getDoc(doc(firestoreDb, 'param', `game-${process.env.REACT_APP_GAME_KEY}`))
    // console.log("game => ", game.data());
    const now = Date.now() / 1000
    const timeLeft = game.data().finishAt.seconds - now
    // console.log("timeLeft => ", parseInt(timeLeft));
    setTime(parseInt(timeLeft))
}

const updateGameParams = async (setGameParams) => {
  onSnapshot(paramCollection, (snapshot) => {
      snapshot.docChanges().forEach(
        async (change) => {
          if(change.doc.data().gameNumber === parseInt(process.env.REACT_APP_GAME_KEY)) {
            setGameParams(change.doc.data())
          }
      },
      (error) => {
        // console.log("error => ", error);
      }
    );
  });
};

const pausingGame = async (setPause) => {
  onSnapshot(paramCollection, (snapshot) => {
      snapshot.docChanges().forEach(
        async (change) => {
          if(change.doc.data().isPlaying === false) {
            setPause(true)
          }else if(change.doc.data().isPlaying === true){
            setPause(false)
          }
        }
      )
  })
}

const closingGame = async (setIsClose) => {
  onSnapshot(paramCollection, (snapshot) => {
      snapshot.docChanges().forEach(
        async (change) => {
          if(change.doc.data().isClosing === true ){
            setIsClose(true)
          }else if(change.doc.data().isClosing === false){
            setIsClose(false)
          }
        }
      )
  })
}

export { 
  getPixel,
  createPixelService,
  updatePixelsGrid,
  getUserScore,
  getTimer,
  updateGameParams,
  pausingGame,
  closingGame,
  checkUserIsAdmin
};
