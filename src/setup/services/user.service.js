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

const getTopUser = async (setTopUsers) => {
    const NUMBER_USER = 10
    try {
        const users = await getDocs(userCollection)
        const topUsers = users.docs.map(user => {
            if(user.data().email === 'admin@admin.com') {
                return user.totalScore = 0
            }
            return user.data()
        }).sort((a, b) => b.totalScore - a.totalScore).splice(0, NUMBER_USER)
        setTopUsers(topUsers);
    } catch (error) {
        throw new Error(error)
    }
}

const listenTopUser = async (setTopUsers) => {
    onSnapshot(userCollection, (snapshot) => {
        snapshot.docChanges().forEach(
          async (change) => {
            getTopUser(setTopUsers)
          },
          (error) => {
            throw new Error(error)
          }
        )
    })
}

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

export { getLastTwentyUser, getUserByPixelPositions, listenAllUsers, getTopUser, listenTopUser };
