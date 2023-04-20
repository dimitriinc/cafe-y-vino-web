// DOM elements
const menuCategoryElements = document.querySelectorAll('.menu-category')
const menuContainer = document.querySelector('.carousel')
const vinosCategories = document.querySelectorAll('.vino-category')
const blanket = document.querySelector('.blanket')
const exitBtn = document.querySelector('.exit-btn')
const loader_anim = document.querySelector('.carta-load-anim')

// Firebase stuff
const firebaseConfig = {
    apiKey: "AIzaSyC8URyjiTFzhzOwuJYtftqN0sFaDGzj9rc",
    authDomain: "cafe-y-vino.firebaseapp.com",
    databaseURL: "https://cafe-y-vino-default-rtdb.firebaseio.com",
    projectId: "cafe-y-vino",
    storageBucket: "cafe-y-vino.appspot.com",
    messagingSenderId: "1096226926741",
    appId: "1:1096226926741:web:d5c23cb2bbba3fb4796b9c",
    measurementId: "G-D0VKYKE89E"
}
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const storage = firebase.storage()
const storageRef = storage.ref()

// Global variables
let screenFocused = false
let loadedImages = 0

// Event Listeners
menuCategoryElements.forEach(element => 
    element.addEventListener('click', () => {
        if (element.innerHTML == "Vinos") return
        const collectionPath = convertCategoryToCollectionPath(element.innerHTML);
        const table_name = convertCategoryToTableName(element.innerHTML);
        // updateCarousel(table_name);
        updateCarousel(collectionPath);
    })
);

vinosCategories.forEach(element =>
    element.addEventListener('click', function() {
        const collectionPath = convertCategoryToCollectionPath(element.innerHTML);
        const table_name = convertCategoryToTableName(element.innerHTML);
        // updateCarousel(table_name);
        updateCarousel(collectionPath);
    })
);

exitBtn.addEventListener('click', () => {
    if (!screenFocused) return
    focusExit()
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        if (!screenFocused) return
        focusExit()
    }
})

// Functions
async function updateCarousel(collectionPath) {

    menuContainer.setAttribute('style', 'opacity:0;')
    loader_anim.setAttribute('style', 'opacity: 1;')

    try {
        await loadMenuItems(collectionPath);

        const instances = M.Carousel.init(menuContainer);
    } catch (error) {
        console.log(`The Error!!! :: ${error.message}`)
    } 
}

async function loadMenuItems(collectionPath) {
// async function loadMenuItems(table_name) {
    
    menuContainer.innerHTML = ''
    imagesLoaded = 0

    const collectionReference = db.collection(collectionPath)
    const query = collectionReference.where('isPresent', '==', true).orderBy('nombre')
    let grabStartX, grabStartY
    
    // fetch(`https://21df-190-238-135-197.sa.ngrok.io/get-collection?table-name=${table_name}`, {
    //     method: 'POST',
    //     mode: 'cors'
    // })
    // .then(response => response.json())
    // .then(data => {

    //     let loadedImages = 0

    //     data.forEach(product => {

    //         // Create the parent item element
    //         let menuItemElement = document.createElement('div');
    //         menuItemElement.classList.add('carousel-item');
    //         if (index === 0) {
    //             menuItemElement.classList.add('active');
    //         }
    //         index++;

    //         // Create a container div for the title
    //         let itemTitleContainer = document.createElement('div');
    //         menuItemContainer.classList.add('carousel-item-container');

    //         // Create the title div to put it inside the container
    //         let menuItemTitle = document.createElement('div');
    //         menuItemTitle.classList.add('item-title');
    //         menuItemTitle.innerHTML = product.nombre;

    //         // Create the image element and load the image there
            
    //         let menuItemImage = document.createElement('img');
    //         menuItemImage.setAttribute('style', 'cursor:pointer;');
    //         menuItemImage.addEventListener('mousedown', (event) => {
    //             menuItemImage.setAttribute('style', 'cursor:grabbing;')
    //         });
    //         menuItemImage.addEventListener('mouseup', (event) => {
    //             menuItemImage.setAttribute('style', 'cursor:pointer;')
    //         });
    //         menuItemImage.alt = product.nombre;
    //         menuItemImage.src = product.imagen;

    //         // Check if on load image we are ready to display the whole category
    //         menuItemImage.addEventListener('load', () => {
    //             loadedImages++
    //             if (loadedImages === data.length) {
    //                 menuContainer.setAttribute('style', 'opacity:1;')
    //                 loader_anim.setAttribute('style', 'opacity: 0;')
    //             }
    //         })

    //         // Create the item's elements hierarchy and append it to the carousel container
    //         menuItemContainer.appendChild(menuItemTitle);
    //         menuItemElement.appendChild(menuItemContainer);
    //         menuItemElement.appendChild(menuItemImage);
    //         menuContainer.appendChild(menuItemElement);

    //         // Handle the onclick logic
    //         let isGrabbing = false;
    //         let grabStartX, grabStartY;

    //         menuItemElement.addEventListener('mousedown', event => {
    //             isGrabbing = true;
    //             grabStartX = event.clientX;
    //             grabStartY = event.clientY;
    //         });
    //         menuItemElement.addEventListener('mousemove', event => {
    //             if (isGrabbing) {
    //                 let xDiff = event.clientX - grabStartX;
    //                 let yDiff = event.clientY - grabStartY;
    //                 let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    //                 if (distance > 10) {
    //                     menuItemElement.style.cursor = 'grabbing';
    //                 }
    //             }
    //         })
    //         menuItemElement.addEventListener('mouseup', event => {
    //             isGrabbing = false;
    //             menuItemElement.style.cursor = 'pointer';
    //             let xDiff = event.clientX - grabStartX;
    //             let yDiff = event.clientY - grabStartY;
    //             let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    //             if (distance < 10) {
    //                 if (!screenFocused) {
    //                     screenFocused = true;

    //                     blanket.classList.add('blanket-focused');
    //                     exitBtn.classList.add('exit-focused');
    //                     document.body.style.overflow = 'hidden';

    //                     let itemFocus = menuItemElement.cloneNode(true);
    //                     itemFocus.classList.add('item-focus');
    //                     itemFocus.setAttribute('style', 'visibility:visible;')

    //                     let description = document.createElement('div');
    //                     description.classList.add('description-focus');                        
    //                     description.innerHTML = product.descripcion;
    //                     description.innerHTML += '<br><br>';
    //                     description.innerHTML += '<em>S/. ' + product.precio + '</em>';

                    
    //                     blanket.appendChild(itemFocus);
    //                     blanket.appendChild(description);
    //                     setTimeout(() => {
    //                         itemFocus.classList.add('item-in-focus');
    //                         description.classList.add('description-in-focus');
    //                     }, 1);


    //                     exitBtn.addEventListener('click', () => {
    //                         blanket.classList.remove('blanket-focused');
    //                         exitBtn.classList.remove('exit-focused');
    //                         document.body.style.overflow = 'auto';
    //                         document.body.style.overflowX = 'hidden';
    //                         blanket.removeChild(itemFocus);  
    //                         blanket.removeChild(description);  
    //                         screenFocused = false;
    //                     });
    //                 }
    //             }
    //         });
    //     })
    // })
    // .catch(error => {
        
    //     console.log(`there was an error:: ${error}`)
    // })

    const querySnapshot = await query.get()

    if (querySnapshot.size === 0) throw new Error('The request came back empty')

    // querySnapshot.forEach(async function(documentSnapshot, index) {
    for (let index = 0; index < querySnapshot.size; index++) {

        const documentSnapshot = querySnapshot.docs[index]
        const carouselItem = await createItemElement(documentSnapshot, index)

        console.dir(`the Index is:: ${index}`)
        console.dir(`Name:: ${documentSnapshot.get('nombre')}\nPrice:: ${documentSnapshot.get('precio')}`)

        // Parent element for a carousel item
        // const menuItemElement = document.createElement('div');
        // menuItemElement.classList.add('carousel-item');
        // if (index === 0) {
        //     // The first product (alphabetically) starts at the center of the carousel
        //     menuItemElement.classList.add('active');
        // }
        // index++;

        // // Relation element for the title, 0 hight, allows the Y translation of the title
        // const itemTitleContainer = document.createElement('div');
        // itemTitleContainer.classList.add('item-title-container');

        // // The title of the product
        // const menuItemTitle = document.createElement('div');
        // menuItemTitle.classList.add('item-title');
        // menuItemTitle.innerHTML = documentSnapshot.get('nombre');

        // // Image element, get the img path and load it to the img
        // const menuItemImage = document.createElement('img');
        // menuItemImage.alt = documentSnapshot.get('nombre');

        // const imagePath = documentSnapshot.get('image') ? documentSnapshot.get('image') : 'lg.png'

        // downloadImage(imagePath, menuItemImage)

        // menuItemImage.addEventListener('load', () => {
        //     imagesLoaded++
            
        //     // When the last img is loaded, display the whole carousel
        //     if (imagesLoaded === querySnapshot.size) {
        //         menuContainer.setAttribute('style', 'opacity:1;')
        //         loader_anim.setAttribute('style', 'opacity: 0;')
        //     }
        // })

        // // Create the item's elements hierarchy and append it to the carousel container
        // itemTitleContainer.appendChild(menuItemTitle);
        // menuItemElement.appendChild(itemTitleContainer);
        // menuItemElement.appendChild(menuItemImage);
        menuContainer.appendChild(carouselItem);

        // When the last img is loaded, display the whole carousel
        if (imagesLoaded === querySnapshot.size) {
            menuContainer.setAttribute('style', 'opacity:1;')
            loader_anim.setAttribute('style', 'opacity: 0;')
        }

        // Handle the onclick logic
        let isGrabbing = false
        carouselItem.addEventListener('mousedown', event => {
            isGrabbing = true;
            grabStartX = event.clientX;
            grabStartY = event.clientY;
        });
        carouselItem.addEventListener('mousemove', event => {
            if (isGrabbing) {
                const xDiff = event.clientX - grabStartX;
                const yDiff = event.clientY - grabStartY;
                const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
                if (distance > 10) {
                    carouselItem.setAttribute('style', 'cursor:grabbing;')
                }
            }
        })
        carouselItem.addEventListener('mouseup', event => {
            isGrabbing = false;
            carouselItem.setAttribute('style', 'cursor:pointer;')
            let xDiff = event.clientX - grabStartX;
            let yDiff = event.clientY - grabStartY;
            let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
            if (distance < 10) {
                if (screenFocused) return

                screenFocused = true;

                blanket.classList.add('blanket-focused');
                exitBtn.classList.add('exit-focused');
                document.body.style.overflow = 'hidden';

                let itemFocus = carouselItem.cloneNode(true);    
                itemFocus.classList.add('item-focus');
                itemFocus.setAttribute('style', 'visibility:visible;')

                let description = document.createElement('div');
                description.classList.add('description-focus');
                let descText = documentSnapshot.get('descripcion');
                if (!descText) descText = 'Lo sentimos, por el momento la descripción para este producto no está disponible.'
                description.innerHTML = `${descText}<br><br><em>S/. ${documentSnapshot.get('precio')}</em>`
            
                blanket.appendChild(itemFocus);
                blanket.appendChild(description);
                setTimeout(() => {
                    itemFocus.classList.add('item-in-focus');
                    description.classList.add('description-in-focus');
                }, 100);
            }
        });
    }; 
}

async function createItemElement(documentSnapshot, index) {
    return new Promise(resolve => {

        const menuItemElement = document.createElement('div')
        menuItemElement.classList.add('carousel-item')
        // The first product (alphabetically) starts at the center of the carousel
        if (index === 0) menuItemElement.classList.add('active')

        // Relation element for the title, 0 hight, allows the Y translation of the title
        const itemTitleContainer = document.createElement('div')
        itemTitleContainer.classList.add('item-title-container')
        // The title of the product
        const menuItemTitle = document.createElement('div')
        menuItemTitle.classList.add('item-title')
        menuItemTitle.innerHTML = documentSnapshot.get('nombre')

        // Image element, get the img path and load it to the img
        const menuItemImage = document.createElement('img')
        menuItemImage.alt = documentSnapshot.get('nombre')
        const imagePath = documentSnapshot.get('image') ? documentSnapshot.get('image') : 'lg.png'

        downloadImage(imagePath, menuItemImage)

        itemTitleContainer.appendChild(menuItemTitle)
        menuItemElement.appendChild(itemTitleContainer)
        menuItemElement.appendChild(menuItemImage)

        menuItemImage.addEventListener('load', () => {
            imagesLoaded++
            resolve(menuItemElement)
        })
    })
}

async function downloadImage(imgPath, menuItemImage) {
    const imageReference = storageRef.child(imgPath);
    const url = await imageReference.getDownloadURL()
    menuItemImage.src = url;
}

const focusExit = function() {
    blanket.classList.remove('blanket-focused');
    exitBtn.classList.remove('exit-focused');
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
    blanket.innerHTML = ''
    screenFocused = false;
}

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

function convertCategoryToTableName(category) {
    switch(category) {
        case 'Platos': 
            return 'platos';
        case 'Piqueos':
            return 'piqueos';
        case 'Cocteles':
            return 'cocteles';
        case 'Cervezas':
            return 'cervezas';
        case 'Bebidas calientes':
            return 'bebidas_calientes';
        case 'Postres':
            return 'postres';
        case 'Ofertas':
            return 'ofertas';
        case 'Tintos':
            return 'vinos_tintos';
        case 'Blancos':
            return 'vinos_blancos';
        case 'Rosé':
            return 'vinos_rose';
        case 'Postre':
            return 'vinos_postre';
        case 'Copas':
            return 'vinos_copa';
        default:
            return '';
    }
}

// Function calls
updateCarousel('menu/01.platos/platos');
// updateCarousel('platos');