import firestoreDb from "../config/firebase.config"
import { collection, getDocs, query, where, Timestamp, addDoc, setDoc, doc } from "firebase/firestore"
const paramCollection = collection(firestoreDb, "param-thomasm")

const gamesCollection = collection(firestoreDb, `game-${process.env.REACT_APP_GAME_KEY}`)


const getPixel = async () => {
    // const pixels = await getDocs(gamesCollection)
    // const pixelsData = pixels.docs.map(pixel => {
    //     return pixel.data()
    // })
    // return pixelsData
    const querySnapshot = await getDocs(collection(firestoreDb, "game-test-thomasm"));
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        // console.log(doc.data())
    });
}

const createPixelService = async ({x, y, color}) => {
    const newPixel = {
        x,
        y,
        color,
    }
    // await addDoc(collection(firestoreDb, `game-test-thomasm`), newPixel, { merge: true});
    // await setDoc(doc(firestoreDb, `game-${process.env.REACT_APP_GAME_KEY}`, `${newPixel.x}-${newPixel.y}`), newPixel)

    // const pixelRef = firestoreDb.collection(`game-test-thomasm`).doc(`${newPixel.x}-${newPixel.y}`)
    // pixelRef.set(newPixel, { merge: true })

    try {
        const docRef = await addDoc(collection(firestoreDb, "game-test-thomasm"), newPixel, { merge: true});
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export {
    getPixel,
    createPixelService
}