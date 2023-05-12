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

    const collectionReference = db.collection(collectionPath)
    const query = collectionReference.where('isPresent', '==', true).orderBy('nombre')

    let grabStartX, grabStartY
    let loadPromises = []






    
    // const response = await fetch(`https://3067-190-238-135-197.ngrok-free.app/get-collection?table-name=${table_name}`, {
    //     method: 'POST',
    //     mode: 'cors'
    // })
    // const responseData = await response.json()

    // console.log('data received from the server');
    // menuContainer.innerHTML = ''

    // responseData.forEach((product, index) => {

    //     // Create the parent item element
    //     const carouselItem = createItemElementSql(product, index)

    //     const itemImg = carouselItem.querySelector('img')
    //     const loadPromise = getLoadPromise(itemImg, product.imagen)
    //     loadPromises.push(loadPromise)

    //     menuContainer.appendChild(carouselItem);
        

    //     // Handle the onclick logic
    //     let grabStartX, grabStartY;

    //     carouselItem.addEventListener('mousedown', event => {
    //         grabStartX = event.clientX;
    //         grabStartY = event.clientY;
    //     });

    //     carouselItem.addEventListener('mouseup', event => {
        
    //         const xDiff = event.clientX - grabStartX;
    //         const yDiff = event.clientY - grabStartY;
    //         const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    //         if (distance < 10) {
    //             if (!screenFocused) {
    //                 screenFocused = true;

    //                 blanket.classList.add('blanket-focused');
    //                 exitBtn.classList.add('exit-focused');
    //                 document.body.style.overflow = 'hidden';

    //                 const itemFocus = carouselItem.cloneNode(true);
    //                 itemFocus.classList.add('item-focus');
    //                 itemFocus.setAttribute('style', 'visibility:visible;')

    //                 const description = document.createElement('div');
    //                 description.classList.add('description-focus');                        
    //                 description.innerHTML = product.descripcion;
    //                 description.innerHTML += '<br><br>';
    //                 description.innerHTML += '<em>S/. ' + product.precio + '</em>';

                
    //                 blanket.appendChild(itemFocus);
    //                 blanket.appendChild(description);
    //                 setTimeout(() => {
    //                     itemFocus.classList.add('item-in-focus');
    //                     description.classList.add('description-in-focus');
    //                 }, 100);
    //             }
    //         }
    //     });
    // })









 
    const querySnapshot = await query.get()

    const downloadUrlPromises = querySnapshot.docs.map(async doc => {
        const imgPath = doc.data().image || 'lg.png'
        const imageReference = storageRef.child(imgPath);
        return await imageReference.getDownloadURL()
    })
    const downloadUrls =  await Promise.all(downloadUrlPromises)

    menuContainer.innerHTML = ''

    querySnapshot.docs.forEach(async (doc, index) => {

        const carouselItem = createItemElement(doc, index)

        const itemImg = carouselItem.querySelector('img')
        const loadPromise = getLoadPromise(itemImg, downloadUrls[index])
        loadPromises.push(loadPromise)

        menuContainer.appendChild(carouselItem);

        carouselItem.addEventListener('mousedown', event => {
            grabStartX = event.clientX;
            grabStartY = event.clientY;
        });

        carouselItem.addEventListener('mouseup', event => {
           
            const xDiff = event.clientX - grabStartX;
            const yDiff = event.clientY - grabStartY;
            const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
            if (distance < 10) {
                if (screenFocused) return

                screenFocused = true;

                blanket.classList.add('blanket-focused');
                exitBtn.classList.add('exit-focused');
                document.body.style.overflow = 'hidden';

                const itemFocus = carouselItem.cloneNode(true);    
                itemFocus.classList.add('item-focus');
                itemFocus.setAttribute('style', 'visibility:visible;')

                const description = document.createElement('div');
                description.classList.add('description-focus');
                const descText = doc.data().descripcion ? doc.data().descripcion : 'Lo sentimos, por el momento la descripción para este producto no está disponible.'
                description.innerHTML = `${descText}<br><br><em>S/. ${doc.data().precio}</em>`
            
                blanket.appendChild(itemFocus);
                blanket.appendChild(description);
                setTimeout(() => {
                    itemFocus.classList.add('item-in-focus');
                    description.classList.add('description-in-focus');
                }, 100);
            }
        });

    
    })

    try {
        await Promise.all(loadPromises)
        menuContainer.setAttribute('style', 'opacity:1;')
        loader_anim.setAttribute('style', 'opacity: 0;')
    } catch(err) {
        throw new Error("Failed to load all the images")
    }
}




function createItemElementSql(doc, index) {
    const html = `
        <div class="item-title-container">
            <div class="item-title">${doc.nombre}</div>
        </div>
        <img alt="${doc.nombre}" src="${doc.imagen}">
    `
    const menuItemElement = document.createElement('div')
    menuItemElement.classList.add('carousel-item')
    if (index === 0) menuItemElement.classList.add('active')
    menuItemElement.insertAdjacentHTML('afterbegin', html)

    return menuItemElement
}

function createItemElement(documentSnapshot, index) {

    const html = `
        <div class="item-title-container">
            <div class="item-title">${documentSnapshot.data().nombre}</div>
        </div>
        <img alt="${documentSnapshot.data().nombre}">
    `
    const menuItemElement = document.createElement('div')
    menuItemElement.classList.add('carousel-item')
    if (index === 0) menuItemElement.classList.add('active')
    menuItemElement.insertAdjacentHTML('afterbegin', html)

    return menuItemElement
}

function getLoadPromise(imgElement, downloadUrl) {
    return new Promise(resolve => {
        imgElement.src = downloadUrl
        imgElement.addEventListener('load', resolve)
    })
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