const menuCategoryElements = document.querySelectorAll('.menu-category');
const menuContainer = document.querySelector('.carousel');
const vinosCategories = document.querySelectorAll('.vino-category');
const blanket = document.querySelector('.blanket');
const exitBtn = document.querySelector('.exit-btn');
const loader_anim = document.querySelector('.carta-load-anim')

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

firebase.initializeApp(firebaseConfig); 
const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();

let screenFocused = false;

 function main() {

    renewCarousel('menu/01.platos/platos');
    // renewCarousel('platos');

    menuCategoryElements.forEach(function(element) {
        element.addEventListener('click', function() {
            if (element.innerHTML == "Vinos") {
                return;
            }
            let collectionPath = convertCategoryToCollectionPath(element.innerHTML);
            let table_name = convertCategoryToTableName(element.innerHTML);
            // renewCarousel(table_name);
            renewCarousel(collectionPath);
        });
    });

    vinosCategories.forEach(function(element) {
        element.addEventListener('click', function() {
            let collectionPath = convertCategoryToCollectionPath(element.innerHTML);
            let table_name = convertCategoryToTableName(element.innerHTML);
            // renewCarousel(table_name);
            renewCarousel(collectionPath);
        });
    });
}

async function renewCarousel(collectionPath) {

    menuContainer.setAttribute('style', 'opacity:0;')
    loader_anim.setAttribute('style', 'opacity: 1;')

    try {
        await loadMenuItems(collectionPath);

    let elems = document.querySelectorAll('.carousel');
    let instances = M.Carousel.init(elems);
    } catch (error) {
        console.log(`caugth an error: ${error}`)
        renewCarousel(collectionPath);
    } 
}

async function loadMenuItems(collectionPath) {
    // async function loadMenuItems(table_name) {
        
        menuContainer.innerHTML = '';

        const collectionReference = db.collection(collectionPath);
        const query = collectionReference.where('isPresent', '==', true).orderBy('nombre');
        let index = 0;


        // fetch(`https://21df-190-238-135-197.sa.ngrok.io/get-collection?table-name=${table_name}`, {
        //     method: 'POST',
        //     mode: 'cors'
        // })
        // .then(response => response.json())
        // .then(data => {

        //     data.forEach(product => {

        //         // Create the parent item element
        //         let menuItemElement = document.createElement('div');
        //         menuItemElement.classList.add('carousel-item');
        //         if (index === 0) {
        //             menuItemElement.classList.add('active');
        //         }
        //         index++;

        //         // Create a container div for the title
        //         let menuItemContainer = document.createElement('div');
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

        await query.get().then(querySnapshot => {

            const promises = [];

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

                promises.push(downloadImage(imagePath, menuItemImage));

                // Create the item's elements hierarchy and append it to the carousel container
                menuItemContainer.appendChild(menuItemTitle);
                menuItemElement.appendChild(menuItemContainer);
                menuItemElement.appendChild(menuItemImage);
                menuContainer.appendChild(menuItemElement);

                // Handle the onclick logic
                let isGrabbing = false;
                let grabStartX, grabStartY;

                menuItemElement.addEventListener('mousedown', event => {
                    isGrabbing = true;
                    grabStartX = event.clientX;
                    grabStartY = event.clientY;
                });
                menuItemElement.addEventListener('mousemove', event => {
                    if (isGrabbing) {
                        let xDiff = event.clientX - grabStartX;
                        let yDiff = event.clientY - grabStartY;
                        let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
                        if (distance > 10) {
                            menuItemElement.style.cursor = 'grabbing';
                        }
                    }
                })
                menuItemElement.addEventListener('mouseup', event => {
                    isGrabbing = false;
                    menuItemElement.style.cursor = 'pointer';
                    let xDiff = event.clientX - grabStartX;
                    let yDiff = event.clientY - grabStartY;
                    let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
                    if (distance < 10) {
                        if (!screenFocused) {
                            screenFocused = true;
    
                            blanket.classList.add('blanket-focused');
                            exitBtn.classList.add('exit-focused');
                            document.body.style.overflow = 'hidden';

                            let itemFocus = menuItemElement.cloneNode(true);
                            itemFocus.classList.add('item-focus');
                            itemFocus.setAttribute('style', 'visibility:visible;')

                            let description = document.createElement('div');
                            description.classList.add('description-focus');
                            let descText = documentSnapshot.get('descripcion');
                            if (descText === '' || descText === undefined || descText === null) {
                                descText = 'Lo sentimos, por el momento la descripción para este producto no está disponible.'
                            }
                            description.innerHTML = descText;
                            description.innerHTML += '<br><br>';
                            description.innerHTML += '<em>S/. ' + documentSnapshot.get('precio') + '</em>';

                        
                            blanket.appendChild(itemFocus);
                            blanket.appendChild(description);
                            setTimeout(() => {
                                itemFocus.classList.add('item-in-focus');
                                description.classList.add('description-in-focus');
                            }, 0);

    
                            exitBtn.addEventListener('click', event => {
                                blanket.classList.remove('blanket-focused');
                                exitBtn.classList.remove('exit-focused');
                                document.body.style.overflow = 'auto';
                                document.body.style.overflowX = 'hidden';
                                blanket.removeChild(itemFocus);  
                                blanket.removeChild(description);  
                                screenFocused = false;
                            });
                        }
                    }
                });
            });

            Promise.all(promises).then(() => {
                menuContainer.setAttribute('style', 'opacity:1;')
                loader_anim.setAttribute('style', 'opacity: 0;')
            })
            
        });
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

async function downloadImage(imgPath, menuItemImage) {
    let imageReference = storageRef.child(imgPath);
    await imageReference.getDownloadURL().then(function(url) {
        menuItemImage.src = url;
    });
}

main()