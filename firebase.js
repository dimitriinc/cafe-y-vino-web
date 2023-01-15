let firebaseLoaded = new Promise(resolve => {
    let firebaseInterval = setInterval(() => {
        if (typeof firebase !== 'undefined') {
            clearInterval(firebaseInterval);
            resolve();
        }
        console.log('waiting for the firebase sdk to load...')
    }, 50);
});

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

async function main() {

    await firebaseLoaded;

    firebase.initializeApp(firebaseConfig); 
    const db = firebase.firestore();

    const platosCollection = db.collection('menu/01.platos/platos');
    platosCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            console.log(doc.get('nombre'))
        });
    });
}

main();
