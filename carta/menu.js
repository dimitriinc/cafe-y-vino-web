class Menu {

    _categories
    _wineCategories
    _carousel
    _carouselContainer
    _wineContainer
    _spinner
    _btnExit
    _overlay
    _storageReference

    _screenFocused = false
    _grabStartX
    _grabStartY

    _db
    _storageReference
    _firebaseConfig = {
        apiKey: "AIzaSyC8URyjiTFzhzOwuJYtftqN0sFaDGzj9rc",
        authDomain: "cafe-y-vino.firebaseapp.com",
        databaseURL: "https://cafe-y-vino-default-rtdb.firebaseio.com",
        projectId: "cafe-y-vino",
        storageBucket: "cafe-y-vino.appspot.com",
        messagingSenderId: "1096226926741",
        appId: "1:1096226926741:web:d5c23cb2bbba3fb4796b9c",
        measurementId: "G-D0VKYKE89E"
    }

    constructor() {
        this._initElements()
        this._initFirebase()
        this._addEventListeners()
    }

    _initElements() {
        this._categories = document.querySelectorAll('.category')
        this._wineCategories = document.querySelectorAll('.wine')
        this._carousel = document.querySelector('.carousel')
        this._carouselContainer = document.querySelector('.carousel-container')
        this._wineContainer = document.querySelector('.vinos-container')
        this._spinner = document.querySelector('.carta-load-anim')
        this._overlay = document.querySelector('.blanket')
        this._btnExit = document.querySelector('.exit-btn')
    }

    _initFirebase() {
        firebase.initializeApp(this._firebaseConfig)
        this._db = firebase.firestore()
        const storage = firebase.storage()
        this._storageReference = storage.ref()
    }

    _addEventListeners() {

        this._categories.forEach(category => {
            category.addEventListener('click', () => {

                if (category.classList.contains('active')) return

                if (!category.classList.contains('wine')) this._resetActive()
                else this._resetWinesActive()

                category.classList.add('active')

                if (category.innerHTML === 'Vinos') {
                    this._displayWine()
                    return
                }
                else if (category.classList.contains('wine')) {}
                else this._hideWine()

                this.updateCarousel(category.dataset.dbPath)
            })
        })

        this._btnExit.addEventListener('click', () => {
            if (!this._screenFocused) return
            this._focusExit()
        });
        
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                if (!this._screenFocused) return
                this._focusExit()
            }
        })
    }

    _resetActive() {
        this._categories.forEach(category => category.classList.remove('active'))
    }

    _resetWinesActive() {
        this._wineCategories.forEach(wine => wine.classList.remove('active'))
    }

    _displayWine() {
        this._wineContainer.classList.remove('hidden')
        this._wineContainer.classList.add('visible')
        this._carouselContainer.classList.add('translated')
    }

    _hideWine() {
        this._wineContainer.classList.add('hidden')
        this._wineContainer.classList.remove('visible')
        this._carouselContainer.classList.remove('translated')
    }

    async updateCarousel(collectionPath) {
        this._displaySpinner()
        try {
            await this._loadItemsFromFirestore(collectionPath)
            M.Carousel.init(this._carousel)
        } catch(error) {
            this._displayError(error.message)
        }
    }

    async _loadItemsFromFirestore(collectionPath) {
        let loadPromises = []

        const querySnapshot = await this._getQuerySnapshot(collectionPath)
        const downloadUrls = await this._getDownloadUrls(querySnapshot)

        this._carousel.innerHTML = ''

        querySnapshot.docs.forEach((doc, index) => {
            const carouselItem = this._createItemElementFirestore(doc, index)

            const imgElement = carouselItem.querySelector('img')
            const loadPromise = this._getLoadPromise(imgElement, downloadUrls[index])
            loadPromises.push(loadPromise)

            this._carousel.appendChild(carouselItem);

            this._addEventListenersToItem(carouselItem, doc)
        })

        try {
            await Promise.all(loadPromises)
            this._displayCarousel()
        } catch(err) {
            throw new Error("Failed to load all the images.")
        }
    }

    async _getQuerySnapshot(collectionPath) {
        try {
            const collectionReference = this._db.collection(collectionPath)
            const query = collectionReference.where('isPresent', '==', true).orderBy('nombre')
            const querySnapshot = await query.get()
            return querySnapshot
        } catch(error) {
            throw new Error('Failed to get a query snapshot.')
        }
    }

    async _getDownloadUrls(querySnapshot) {
        try {
            const downloadUrlPromises = querySnapshot.docs.map(async doc => {
                const imgPath = doc.data().image || 'lg.png'
                const imageReference = this._storageReference.child(imgPath);
                return await imageReference.getDownloadURL()
            })
            const downloadUrls =  await Promise.all(downloadUrlPromises)
            return downloadUrls
        } catch(error) {
            throw new Error('Failed to get download URLs.')
        }
    }

    _createItemElementFirestore(documentSnapshot, index) {
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

    _getLoadPromise(imgElement, downloadUrl) {
        return new Promise(resolve => {
            imgElement.src = downloadUrl
            imgElement.addEventListener('load', resolve)
        })
    }

    _addEventListenersToItem(carouselItem, documentSnapshot) {

        carouselItem.addEventListener('mousedown', event => {
            this._grabStartX = event.clientX;
            this._grabStartY = event.clientY;
        })

        carouselItem.addEventListener('mouseup', event => {
            const xDiff = event.clientX - this._grabStartX;
            const yDiff = event.clientY - this._grabStartY;
            const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
            if (distance < 10) {
                if (this._screenFocused) return

                this._screenFocused = true;

                this._overlay.classList.add('blanket-focused');
                this._btnExit.classList.add('exit-focused');
                document.body.style.overflow = 'hidden';

                const itemFocus = carouselItem.cloneNode(true);    // include child nodes
                itemFocus.classList.add('item-focus');
                itemFocus.setAttribute('style', 'visibility:visible;')

                const description = document.createElement('div');
                description.classList.add('description-focus');
                const descText = documentSnapshot.data().descripcion ? documentSnapshot.data().descripcion : 'Lo sentimos, por el momento la descripción para este producto no está disponible.'
                description.innerHTML = `${descText}<br><br><em>S/. ${documentSnapshot.data().precio}</em>`
            
                this._overlay.appendChild(itemFocus);
                this._overlay.appendChild(description);
                setTimeout(() => {
                    itemFocus.classList.add('item-in-focus');
                    description.classList.add('description-in-focus');
                }, 100);
            }
        })
    }

    _displaySpinner() {
        this._carousel.innerHTML = ''
        this._carousel.setAttribute('style', 'opacity:0;')
        this._spinner.setAttribute('style', 'opacity: 1;')
    }

    _displayCarousel() {
        this._carousel.setAttribute('style', 'opacity:1;')
        this._spinner.setAttribute('style', 'opacity: 0;')
    }

    _displayError(message) {
        this._carousel.innerHTML = ''
        const html = `
            <div class="carousel-error centered">
                <img src="/images/broken_glass.png" alt="broken connection" class="carousel-broken-img">
                <p class="carousel-error-msg centered">${message}</p>
            </div>
        `
        this._carousel.insertAdjacentHTML('afterbegin', html)
        this._displayCarousel()
    }

    _focusExit() {
        this._overlay.classList.remove('blanket-focused');
        this._btnExit.classList.remove('exit-focused');
        document.body.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden';
        this._overlay.innerHTML = ''
        this._screenFocused = false;
    }
}

const menu = new Menu()
menu.updateCarousel('menu/01.platos/platosS')