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
        const user = lastUsers.splice(0, 19);
        return [doc, ...user];
      });
    });
  });
};

const getTopUser = async ({ setTopUsers, setUserPosition }) => {
  const NUMBER_USER = 3;
  try {
    const users = await getDocs(userCollection);
    const topUsers = users.docs
      .map((user) => {
        if (user.data().email === "admin@admin.com") {
          return (user.totalScore = 0);
        }
        return user.data();
      })
      .sort((a, b) => b.totalScore - a.totalScore);
    const userId = localStorage.getItem("uid");
    let userPosition = [];
    topUsers.find((user, index) => {
      if (user.uid === userId) {
        if(index === 0) {
          userPosition = [
            {
              position: index,
              user: user,
            },
            {
              position: index + 1,
              user: topUsers[index + 1],
            },
            {
              position: index + 2,
              user: topUsers[index + 2],
            },
          ];
          return true;
        }else{
          userPosition = [
            {
              position: index - 1,
              user: topUsers[index - 1],
            },
            {
              position: index,
              user: user,
            },
            {
              position: index + 1,
              user: topUsers[index + 1],
            },
          ];
          return true;
        }
      }
    });
    const topThreeUsers = topUsers.slice(0, NUMBER_USER);
    setUserPosition(userPosition);
    setTopUsers(topThreeUsers);
  } catch (error) {
    throw new Error(error);
  }
};

const listenTopUser = async (setTopUsers) => {
  onSnapshot(userCollection, (snapshot) => {
    snapshot.docChanges().forEach(
      async (change) => {
        getTopUser(setTopUsers);
      },
      (error) => {
        throw new Error(error);
      }
    );
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

const getSingleUser = async (userId, setUser) => {
  try {
    const user = await getDoc(doc(userCollection, userId));
    setUser(user.data());
  } catch (error) {
    throw new Error(error);
  }
};

// const listenSingleUser = (uid, setUser) => {
//   const q = query(gamesCollection, where("uid", "==", uid));
//   getSingleUser(uid, setUser);
//   onSnapshot(q, (snapshot) => {
//     snapshot.docChanges().forEach(
//       async (change) => {
//         getSingleUser(uid, setUser);
//       },
//       (error) => {
//         console.log(error);
//         throw new Error(error);
//       }
//     );
//   });
// };

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

export {
  getLastTwentyUser,
  getUserByPixelPositions,
  listenAllUsers,
  getTopUser,
  listenTopUser,
  getSingleUser,
};
