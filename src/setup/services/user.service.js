import { getUser } from "./game.service";
const {
  onSnapshot,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} = require("firebase/firestore");
const { firestoreDb } = require("../config/firebase.config");

const gamesCollection = collection(
  firestoreDb,
  `game-${process.env.REACT_APP_GAME_KEY}`
);
const userCollection = collection(firestoreDb, "users");

const getLastTwentyUser = (setLastUsers) => {
  onSnapshot(gamesCollection, (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      const doc = await change.doc.data();
      setLastUsers((lastUsers) => {
        lastUsers = lastUsers
          .sort((a, b) => {
            return b.createdAt - a.createdAt;
          })
          .slice(0, 19);
        return [doc, ...lastUsers];
      });
    });
  });
};

const getAllUsers = async (setUsers) => {
  const usersData = await getDocs(userCollection);
  const usersDataArray = usersData.docs.map((doc) => doc.data());
  setUsers(usersDataArray);
};

const listenAllUsers = (setUsers) => {
  onSnapshot(userCollection, (snapshot) => {
    snapshot.docChanges().forEach(
      async (change) => {
        getAllUsers(setUsers);
      },
      (error) => {
        throw new Error(error);
      }
    );
  });
};

const getUserByPixelPositions = async (x, y) => {
  const q = await query(
    gamesCollection,
    where("x", "==", x),
    where("y", "==", y)
  );
  const data = await getDocs(q);
  const userData = data.docs.map((doc) => doc.data().user);
  if (userData.length === 0) {
    return null;
  }
  const uid = userData[0].uid;
  const user = await getUser(uid);
  return { username: user.username, totalScore: user.totalScore };
};

export { getLastTwentyUser, getUserByPixelPositions, listenAllUsers };
