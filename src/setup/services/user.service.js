const { onSnapshot, collection } = require("firebase/firestore")
const { firestoreDb } = require("../config/firebase.config")

const gamesCollection = collection(firestoreDb, `game-${process.env.REACT_APP_GAME_KEY}`)

const getLastTwentyUser = (setLastUsers) => {
    onSnapshot(gamesCollection, (snapshot) => {
        snapshot.docChanges().forEach(
            async (change) => {
                const doc = await change.doc.data();
                setLastUsers((lastUsers) => {
                    lastUsers = lastUsers.sort((a, b) => {
                        return b.createdAt - a.createdAt
                    }).slice(0, 19)
                    return [doc, ...lastUsers]
                })
                
            }
        )
    })
}

export {
    getLastTwentyUser,
}