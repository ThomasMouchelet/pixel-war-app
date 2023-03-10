import { firestoreDb } from "../config/firebase.config";
import { collection, doc, onSnapshot, getDoc, updateDoc, setDoc } from "firebase/firestore";

const paramCollection = collection(firestoreDb, "param");
const userCollection = collection(firestoreDb, "users");

const getUser = async (userId) => {
  try {
    const user = await getDoc(doc(userCollection, userId));
    return user.data();
  } catch (error) {
    throw new Error(error);
  }
};

const checkUserIsAdmin = async () => {
  const userId = localStorage.getItem("uid");
  const user = await getUser(userId);
  return user.isAdmin;
};

const updateScore = async (userId) => {
  try {
    const user = await getUser(userId);
    await updateDoc(doc(userCollection, userId), {
      totalScore: user.totalScore + 1,
    });
    const updatedUser = {
      ...user,
      totalScore: user.totalScore + 1,
    };
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserScore = async (setProgress) => {
  const userId = localStorage.getItem("uid");
  try {
    const user = await getDoc(doc(firestoreDb, "users", userId));
    setProgress(user.data().totalScore);
  } catch (error) {
    throw new Error(error);
  }
};

const getTimer = async (setTime) => {
  const now = Date.now() / 1000;
  try {
    const game = await getDoc(
      doc(firestoreDb, "param", `game-${process.env.REACT_APP_GAME_KEY}`)
    );
    const timeLeft = game.data().finishAt.seconds - now;
    setTime(parseInt(timeLeft));
  } catch (error) {
    throw new Error(error);
  }
};

const updateGameParams = async (setGameParams) => {
  onSnapshot(paramCollection, (snapshot) => {
    snapshot.docChanges().forEach(
      async (change) => {
        if (
          change.doc.data().gameNumber ===
          parseInt(process.env.REACT_APP_GAME_KEY)
        ) {
          setGameParams(change.doc.data());
        }
      },
      (error) => {
        throw new Error(error);
      }
    );
  });
};

const pausingGame = async (setPause) => {
  onSnapshot(paramCollection, (snapshot) => {
    snapshot.docChanges().forEach(
      async (change) => {
        if (change.doc.data().isPlaying === false) {
          setPause(true);
        } else if (change.doc.data().isPlaying === true) {
          setPause(false);
        }
      },
      (error) => {
        throw new Error(error);
      }
    );
  });
};

const closingGame = async (setIsClose) => {
  onSnapshot(paramCollection, (snapshot) => {
    snapshot.docChanges().forEach(
      async (change) => {
        if (change.doc.data().isClosing === true) {
          setIsClose(true);
        } else if (change.doc.data().isClosing === false) {
          setIsClose(false);
        }
      },
      (error) => {
        throw new Error(error);
      }
    );
  });
};

const disableKeyboardKeys = () => {
  window.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.metaKey && e.keyCode === 82) {
      e.preventDefault();
    } else if (e.metaKey && e.keyCode === 82) {
      e.preventDefault();
    } else if (e.keyCode === 116) {
      e.preventDefault();
    } else if (e.ctrlKey && e.keyCode === 82) {
      e.preventDefault();
    }
  });
};

// const getImage = async () => {
//   const image = await getDoc(doc(firestoreDb, 'screenshot', `game-${process.env.REACT_APP_GAME_KEY}`))
//   localStorage.setItem('urlImg', image.data().urlImg)
//   let img = image.data().urlImg
//   img = img.replace('"', '')
//   return img
// }
// const addImage = async (urlImg) => {
//   await setDoc(doc(firestoreDb, 'screenshot', `game-${process.env.REACT_APP_GAME_KEY}`), {
//     urlImg: urlImg
//   })
// }
// const listenImage = async (setImages) => {
//   onSnapshot(doc(firestoreDb, 'screenshot', `game-${process.env.REACT_APP_GAME_KEY}`), (snapshot) => {
//     setImages(snapshot.data().urlImg)
//   })
// }

export { 
  getUser,
  getUserScore,
  getTimer,
  updateGameParams,
  pausingGame,
  closingGame,
  checkUserIsAdmin,
  updateScore,
  disableKeyboardKeys,
  // getImage,
  // addImage,
  // listenImage
};
