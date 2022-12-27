import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyC8URyjiTFzhzOwuJYtftqN0sFaDGzj9rc",
    authDomain: "cafe-y-vino.firebaseapp.com",
    databaseURL: "https://cafe-y-vino-default-rtdb.firebaseio.com",
    projectId: "cafe-y-vino",
    storageBucket: "cafe-y-vino.appspot.com",
    messagingSenderId: "1096226926741",
    appId: "1:1096226926741:web:d5c23cb2bbba3fb4796b9c",
    measurementId: "G-D0VKYKE89E"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getPlatos(db) {
    const platosCollection = collection(db, 'menu/01.platos/platos'); // reference 
    const platosSnapshot = await getDocs(platosCollection); // query snapshot
    platosSnapshot.forEach(plato => console.log(plato.get('nombre')));
    const platosList = platosSnapshot.docs.map(doc => doc.data());
    return platosList;
}

const platos = getPlatos(db);