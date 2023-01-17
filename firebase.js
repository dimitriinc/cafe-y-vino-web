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
const vinosCategories = document.querySelectorAll('.vino-category');
const blanket = document.querySelector('.blanket');
const exitBtn = document.querySelector('.exit-btn');

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

let screenFocused = false;



 function main() {

    // await firebaseLoaded;

    firebase.initializeApp(firebaseConfig); 
    const db = firebase.firestore();
    const storage = firebase.storage();
    const storageRef = storage.ref();

    renewCarousel('menu/01.platos/platos');

    menuCategoryElements.forEach(function(element) {
        element.addEventListener('click', function() {
            if (element.innerHTML == "Vinos") {
                return;
            }
            let collectionPath = convertCategoryToCollectionPath(element.innerHTML);
            renewCarousel(collectionPath);
        });
    });

    vinosCategories.forEach(function(element) {
        element.addEventListener('click', function() {
            let collectionPath = convertCategoryToCollectionPath(element.innerHTML);
            renewCarousel(collectionPath);
        });
    });

    // Takes the inner HTML of the clicked category and returns a path to the appropriate collection
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
            case 'Tintos':
                return 'menu/03.vinos/vinos/Vinos tintos/vinos';
            case 'Blancos':
                return 'menu/03.vinos/vinos/Vinos blancos/vinos';
            case 'Rosé':
                return 'menu/03.vinos/vinos/Vinos rose/vinos';
            case 'Postre':
                return 'menu/03.vinos/vinos/Vinos de postre/vinos';
            case 'Copas':
                return 'menu/03.vinos/vinos/Vinos por copa/vinos';
            default:
                return '';
        }
    }

    async function downloadImage(imgPath, menuItemImage) {
        let imageReference = storageRef.child(imgPath);
        await imageReference.getDownloadURL().then(function(url) {
            menuItemImage.src = url;
        });
    }

    async function loadMenuItems(collectionPath) {
        
        menuContainer.innerHTML = '';

        const collectionReference = db.collection(collectionPath);
        const query = collectionReference.where('isPresent', '==', true);
        let index = 0;

        await query.get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {

                // Create the parent item element
                let menuItemElement = document.createElement('div');
                menuItemElement.classList.add('carousel-item');
                if (index === 0) {
                    menuItemElement.classList.add('active');
                }
                index++;

                // Create a container div for the title
                let menuItemContainer = document.createElement('div');
                menuItemContainer.classList.add('carousel-item-container');

                // Create the title div to put it inside the container
                let menuItemTitle = document.createElement('div');
                menuItemTitle.classList.add('item-title');
                menuItemTitle.innerHTML = documentSnapshot.get('nombre');

                // Create the image element and load the image there
                let imagePath = documentSnapshot.get('image');
                if (imagePath === '' || imagePath == null) {
                    imagePath = 'lg.png'
                }
                let menuItemImage = document.createElement('img');
                menuItemImage.setAttribute('style', 'cursor:pointer;');
                menuItemImage.addEventListener('mousedown', (event) => {
                    menuItemImage.setAttribute('style', 'cursor:grabbing;')
                });
                menuItemImage.addEventListener('mouseup', (event) => {
                    menuItemImage.setAttribute('style', 'cursor:pointer;')
                });
                menuItemImage.alt = documentSnapshot.get('nombre');

                downloadImage(imagePath, menuItemImage);

                // Create the item's elements hierarchy and append it to the carousel container
                menuItemContainer.appendChild(menuItemTitle);
                menuItemElement.appendChild(menuItemContainer);
                menuItemElement.appendChild(menuItemImage);
                menuContainer.appendChild(menuItemElement);

                // Handle the onclick logic
                menuItemElement.addEventListener('click', event => {

                    if (!screenFocused) {
                        screenFocused = true;

                        blanket.classList.add('blanket-focused');
                        exitBtn.classList.add('exit-focused');
                        document.body.style.overflow = 'hidden';

                        exitBtn.addEventListener('click', event => {
                            blanket.classList.remove('blanket-focused');
                            exitBtn.classList.remove('exit-focused');
                            document.body.style.overflow = 'auto';
                            document.body.style.overflowX = 'hidden';

                            screenFocused = false;
                        });
                    }
                });
                
            });
        });
    }

    async function renewCarousel(collectionPath) {

        await loadMenuItems(collectionPath);

        let elems = document.querySelectorAll('.carousel');
        let instances = M.Carousel.init(elems);
             
    }
}

main();