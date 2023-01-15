// let firebaseLoaded = new Promise(resolve => {
//     let firebaseInterval = setInterval(() => {
//         if (typeof firebase !== 'undefined') {
//             clearInterval(firebaseInterval);
//             resolve();
//         }
//     }, 50);
// });

const menuCategoryElements = document.querySelectorAll('.menu-category');
const menuContainer = document.querySelector('.carousel');

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

function renewCarousel() {
    let elems = document.querySelectorAll('.carousel');
    let instances = M.Carousel.init(elems, { 
    });
    console.log('carousel is renewed!')
}

function main() {

    // await firebaseLoaded;

    firebase.initializeApp(firebaseConfig); 
    const db = firebase.firestore();
    const storage = firebase.storage();
    const storageRef = storage.ref();

    console.log(storageRef);

    menuCategoryElements.forEach(function(element) {
        const category = element.innerHTML;
        element.addEventListener('click', function() {
            if (category == "Vinos") {
                return;
            }
            let collectionPath = convertCategoryToCollectionPath(category);
            console.log(collectionPath);
            loadMenuItems(collectionPath);
            // renewCarousel();
        });
    });

    function convertCategoryToCollectionPath(category) {
        switch(category) {
            case 'Platos': 
                return 'menu/01.platos/platos';
            case 'Piqueos':
                return 'menu/02.piqueos/piqueos';
            case 'Vinos':
                return 'menu/03.vinos/vinos';
            case 'Cocteles':
                return 'menu/04.cocteles/cocteles';
            case 'Cervezas':
                return 'menu/05.cervezas/cervezas';
            case 'Bebidas calientes':
                return 'menu/06.bebidas calientes/bebidas calientes';
            case 'Postres':
                return 'menu/061.postres/postres';
            case 'Ofertas':
                return 'menu/07.ofertas/ofertas';
            default:
                return '';
        }
    }

    function loadMenuItems(collectionPath) {
        
        menuContainer.innerHTML = '';

        const collectionReference = db.collection(collectionPath);
        let index = 0;

        collectionReference.get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {

                let menuItemElement = document.createElement('div');
                menuItemElement.classList.add('carousel-item');
                if (index === 0) {
                    menuItemElement.classList.add('active');
                }
                index++;

                let menuItemContainer = document.createElement('div');
                menuItemContainer.classList.add('carousel-item-container');

                let menuItemTitle = document.createElement('div');
                menuItemTitle.classList.add('item-title');
                menuItemTitle.innerHTML = documentSnapshot.get('nombre');

                let imagePath = documentSnapshot.get('image');

                console.log(imagePath);

                let menuItemImage = document.createElement('img');
                menuItemImage.alt = documentSnapshot.get('nombre');
                let imageRef = storageRef.child(imagePath);

                imageRef.getDownloadURL().then(function(url) {
                    menuItemImage.src = url;
                }).catch(function(error) {
                    console.log('There was an error loading the image: ' + error);
                })

                menuItemContainer.appendChild(menuItemTitle);
                menuItemElement.appendChild(menuItemContainer);
                menuItemElement.appendChild(menuItemImage);
                menuContainer.appendChild(menuItemElement);
                
            });
        });
    }
}

main();
renewCarousel();
