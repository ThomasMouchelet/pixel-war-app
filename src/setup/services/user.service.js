const { onSnapshot, collection } = require("firebase/firestore")
const { firestoreDb } = require("../config/firebase.config")

const gamesCollection = collection(firestoreDb, `game-${process.env.REACT_APP_GAME_KEY}`)

const getLastTwentyUser = (setLastUsers, lastUsers) => {
    onSnapshot(gamesCollection, (snapshot) => {
        snapshot.docChanges().forEach(
            async (change) => {
                await setLastUsers([change.doc.data(), ...lastUsers])
            }
        )
    })
}

export {
    getLastTwentyUser,
}