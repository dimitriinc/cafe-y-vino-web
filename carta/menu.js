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
        this._wineContainer = docuemnt.querySelector('.vinos-container')
        this._spinner = document.querySelector('.exit-btn')
        this._overlay = document.querySelector('.blanket')
        this._btnExit = document.querySelector('.exit-btn')
    }

    _initFirebase() {
        firebase.initializeApp(firebaseConfig)
        this._db = firebase.firestore()
        const storage = firebase.storage()
        this._storageReference = storage.ref()
    }

    _addEventListeners() {

        this._categories.forEach(category => {
            category._addEventListeners('click', () => {

                if (category.classList.contains('active')) return

                if (!category.classList.contains('wine')) this._resetActive()
                else this._resetWinesActive()

                category.classList.add('active')

                if (category.innerHTML === 'Vinos') {
                    this._displayWine()
                    return
                }
                else this._hideWine()

                _updateCarousel(category.dataset.dbPath)
            })
        })

        this._btnExit.addEventListener('click', () => {
            if (!screenFocused) return
            this._focusExit()
        });
        
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                if (!screenFocused) return
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
        this._wineContainer.classList.remove('hidden');
        this._wineContainer.classList.add('visible');
        this._carouselContainer.classList.add('translated');
    }

    _hideWine() {
        this._wineContainer.classList.add('hidden');
        this._wineContainer.classList.remove('visible');
        this._carouselContainer.classList.remove('translated');
    }

    _updateCarousel(collectionPath) {
        this._displaySpinner()

    }

    _displaySpinner() {
        this._carousel.setAttribute('style', 'opacity:0;')
        this._spinner.setAttribute('style', 'opacity: 1;')
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