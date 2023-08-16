import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";

const ukmpApp = document.createElement("ukmp-app");
document.body.appendChild(ukmpApp);
const title = "UKM Penelitian Apps";
document.title = title;
for (var scriptName = "script-" + Math.random().toString(36).substr(2, 5), nonce = Math.random().toString(36).slice(2), styles = document.getElementsByTagName("script"), i = 0; i < styles.length; i++) styles[i].setAttribute("nonce", nonce);
var script = document.createElement("script");
script.setAttribute("nonce", nonce), script.setAttribute("src", "about.min.js"), script.setAttribute("id", scriptName), document.head.appendChild(script);
for (var scripts = document.getElementsByTagName("script"), i = 0; i < scripts.length; i++) scripts[i].setAttribute("nonce", nonce);
var newScript = document.createElement("script");
newScript.setAttribute("type", "text/javascript"), newScript.setAttribute("nonce", nonce), newScript.setAttribute("id", scriptName);
var scriptContent = "// Tambahkan security policy untuk mencegah XSS\n";
scriptContent += "document.querySelector('html').setAttribute('content-security-policy', \"default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self' 'unsafe-inline';\");", newScript.textContent = scriptContent, document.body.appendChild(newScript);
// Get the viewport width and height
var viewportWidth = window.innerWidth;
var viewportHeight = window.innerHeight;

// Log the viewport width and height to the console
console.log('Viewport width: ' + viewportWidth);
console.log('Viewport height: ' + viewportHeight);

// Deteksi browser yang digunakan pengguna
const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
const isFirefox = typeof InstallTrigger !== 'undefined';
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isEdge = navigator.userAgent.indexOf("Edge") > -1;
// Ambil elemen HTML
const htmlElem = document.querySelector('html');

// Ambil semua atribut pada elemen HTML
const attrs = htmlElem.getAttributeNames();

// Loop melalui setiap atribut
attrs.forEach(attr => {
    // Periksa apakah atribut dimulai dengan "data-permit:"
    if (attr.startsWith('data-permit:')) {
        // Ambil nama izin dan status izin dari atribut
        const [permitName, permitStatus] = attr.split(':').slice(1);

        // Set atribut baru sesuai dengan deteksi browser pengguna
        if (isChrome) {
            htmlElem.setAttribute('lang', 'en');
        }
        if (isFirefox) {
            htmlElem.setAttribute('lang', 'id');
        }

        // Tambahkan atribut "ukmp-permit" dengan nilai yang baru dibuat
        const permitValue = `${permitName}:${permitStatus}`;
        htmlElem.setAttribute('ukmp-permit', permitValue);
    }
});

// Deteksi perangkat pengguna
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTablet = /iPad|Android|Tablet|KFAPWI/i.test(navigator.userAgent);

// Set atribut baru sesuai dengan deteksi perangkat pengguna
if (isMobile) {
    htmlElem.setAttribute('device-user', 'mobile');
} else if (isTablet) {
    htmlElem.setAttribute('device-user', 'tablet');
} else {
    htmlElem.setAttribute('device-user', 'desktop');
}

// Set atribut baru sesuai dengan deteksi browser pengguna
if (isChrome) {
    htmlElem.setAttribute('browser-user', 'chrome');
} else if (isFirefox) {
    htmlElem.setAttribute('browser-user', 'firefox');
} else if (isSafari) {
    htmlElem.setAttribute('browser-user', 'safari');
} else if (isEdge) {
    htmlElem.setAttribute('browser-user', 'edge');
} else {
    htmlElem.setAttribute('browser-user', 'other');
}

class UkmpContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
      <style>
        /* Tambahkan mode gelap */
        :host([dark]) {
          background-color: var(--bg-color-dark);
          color: var(--text-color-dark);
        }
        :host {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: var(--bg-color);
          color: var(--text-color);
          overflow-x: hidden;
        }
        
        /* Tambahkan media query untuk membuat container responsif */
        @media screen and (min-width: 320px) {
          :host {
            width: fit-content;
          }
        }
        
        @media screen and (min-width: 768px) {
          :host {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: max-content;
            height: 100%;
            background-color: var(--bg-color);
            color: var(--text-color);
            padding: 20px;
          }
        }
        
        @media screen and (min-width: 1024px) {
          :host {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: var(--bg-color);
            color: var(--text-color);  
          }
        }

        @media (prefers-color-scheme: dark) {
          :host {
            background: #0d1117;
            color: #f4f4f4;
          }
          ::slotted(*) {
            background: #0d1117;
            color: #f4f4f4;
            margin: 0 auto;
          }
          
      </style>
      <slot></slot>
    `;

        // Mendeteksi tema yang digunakan pada sistem
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        const currentTheme = prefersDarkScheme.matches ? "dark" : "light";
        this.setAttribute("theme", currentTheme);

    }
}

customElements.define("ukmp-container", UkmpContainer);

class UkmpApp extends PolymerElement {
    constructor() {
        super(), window.addEventListener("load", () => {
            const loadElement = this.shadowRoot.querySelector("ukmp-load");
            loadElement.parentNode.removeChild(loadElement);
            this.style.overflow = "hidden"; // tambahkan baris ini
        })
    }
    static get template() {
        return html`
        <style>
            .TRAVEL-APP-SPLASH {
                background-color: #ffffff;
                display: flex;
                flex-direction: row;
                justify-content: center;
                width: 100%;
            }
            
            .TRAVEL-APP-SPLASH .TRAVEL-APP-SPLASH-wrapper {
                background-color: #ffffff;
                border: 1px none;
                height: 896px;
                overflow: hidden;
                width: 414px;
            }
            
            .TRAVEL-APP-SPLASH .overlap-group-wrapper {
                height: 925px;
                left: -233px;
                position: relative;
                top: 15px;
                width: 822px;
            }
            
            .TRAVEL-APP-SPLASH .overlap-group {
                height: 881px;
                left: 233px;
                position: relative;
                width: 414px;
            }
            
            .TRAVEL-APP-SPLASH .cloud {
                height: 407px;
                left: 0;
                position: absolute;
                top: 4px;
                width: 414px;
            }
            
            .TRAVEL-APP-SPLASH .air-plane {
                height: 49px;
                left: 323px;
                position: absolute;
                top: 0;
                width: 60px;
            }
            
            .TRAVEL-APP-SPLASH .BUILDING {
                height: 599px;
                left: 0;
                position: absolute;
                top: 282px;
                width: 414px;
            }
            
            .TRAVEL-APP-SPLASH .GRASS {
                height: 564px;
                left: 0;
                position: absolute;
                top: 317px;
                width: 414px;
            }
            
            .TRAVEL-APP-SPLASH .GIRL {
                height: 432px;
                left: 0;
                position: absolute;
                top: 449px;
                width: 414px;
            }
            
            .TRAVEL-APP-SPLASH .PAGINATION {
                height: 8px;
                left: 185px;
                position: absolute;
                top: 186px;
                width: 44px;
            }
            
            .TRAVEL-APP-SPLASH .ellipse {
                background: linear-gradient(180deg, rgb(211.44, 211.44, 211.44) 0%, rgba(228.44, 228.44, 228.44, 0.03) 100%);
                border-radius: 4px;
                height: 8px;
                left: 0;
                position: absolute;
                top: 0;
                width: 8px;
            }
            
            .TRAVEL-APP-SPLASH .div {
                background: linear-gradient(180deg, rgb(211.44, 211.44, 211.44) 0%, rgba(228.44, 228.44, 228.44, 0.03) 100%);
                border-radius: 4px;
                height: 8px;
                left: 36px;
                position: absolute;
                top: 0;
                width: 8px;
            }
            
            .TRAVEL-APP-SPLASH .ellipse-2 {
                background-color: #fec242;
                border-radius: 4px;
                height: 8px;
                left: 18px;
                position: absolute;
                top: 0;
                width: 8px;
            }
            
            .TRAVEL-APP-SPLASH .DESCRIPTION {
                height: 19px;
                left: 44px;
                position: absolute;
                top: 152px;
                width: 319px;
            }
            
            .TRAVEL-APP-SPLASH .thefox-comes-with-to {
                color: #828282;
                font-family: "GT Walsheim Pro-CondensedLight Oblique", Helvetica;
                font-size: 14px;
                font-weight: 300;
                left: 0;
                letter-spacing: 0;
                line-height: 19px;
                position: absolute;
                top: 0;
                white-space: nowrap;
            }
            
            .TRAVEL-APP-SPLASH .HEADING {
                height: 72px;
                left: 26px;
                position: absolute;
                top: 65px;
                width: 365px;
            }
            
            .TRAVEL-APP-SPLASH .siapkan-diri-untu {
                color: transparent;
                font-family: "GT Walsheim Pro-Light", Helvetica;
                font-size: 30px;
                font-weight: 400;
                left: 0;
                letter-spacing: 0;
                line-height: 36px;
                position: absolute;
                text-align: center;
                top: 0;
                width: 363px;
            }
            
            .TRAVEL-APP-SPLASH .text-wrapper {
                color: #545454;
                font-weight: 300;
            }
            
            .TRAVEL-APP-SPLASH .span {
                color: #2e2a72;
                font-family: "GT Walsheim Pro-Bold", Helvetica;
                font-weight: 700;
            }
            
            .TRAVEL-APP-SPLASH .text-wrapper-2 {
                color: #545454;
                font-family: "GT Walsheim Pro-Bold", Helvetica;
                font-weight: 700;
            } 
            .button-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 20px;
              }
            
              .centered-button {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -150%);
                padding: 12px 24px;
                font-size: 16px;
                border-radius: 4px;
                background-color: #007bff;
                color: #fff;
                border: none;
                cursor: pointer;
              }
              .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 999;
              }
            
              .modal-content {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translate(-50%);
                background-color: #fff;
                padding: 10px;
                width: 340px;
                border-radius: 4px;
              }
              .close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 24px;
                height: 24px;
                border: none;
                background-color: transparent;
                font-size: 18px;
                color: #999999;
                cursor: pointer;
                font-size: 28px;
              }
              
              .close-button:hover {
                color: #555555;
              }
              
              /* Button CSS */
              .centered-button {
                background-color: #007bff;
                color: #ffffff;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
              }
              
              .centered-button:hover {
                background-color: #0056b3;
              }
              
              .button-container {
                text-align: center;
                margin-top: 20px;
              }
              
              .modal-button {
                background-color: #f0f0f0;
                color: #333333;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
              }
              
              .modal-button:hover {
                background-color: #dcdcdc;
              }
              .swipe-indicator {
                position: absolute;
                top: 5px;
                left: 50%;
                transform: translateX(-50%);
                width: 50px;
                height: 8px;
                background-color: #cccccc;
                border-radius: 40px;
              }
              .hidden {
                display: none;
              }
        </style>
      
        <div id="travelAppSplash" class$="{{travelAppSplashClass}} TRAVEL-APP-SPLASH">
            <div class="TRAVEL-APP-SPLASH-wrapper">
                <div class="overlap-group-wrapper">
                    <div class="overlap-group">
                        <image-component class="cloud" alt="Cloud" src="/../../images/cloud.svg"></image-component>
                        <image-component class="air-plane" alt="Air plane" src="/../../images/AirPlane.svg"></image-component>
                        <image-component class="BUILDING" alt="Building" src="/../../images/BUILDING.png"></image-component>
                        <image-component class="GRASS" alt="Grass" src="/../../images/GRASS.png"></image-component>
                        <image-component class="GIRL" alt="Girl" src="/../../images/GIRL.png"></image-component>
                        <!-- Other code -->
                        <div class="DESCRIPTION">
                            <ukmp-text class="thefox-comes-with-to">Mulailah Perjalanan dengan Aman dan Nyaman</ukmp-text>
                        </div>
                        <div class="button-wrapper">
                            <button class="centered-button"on-click="openModal">
                                <ukmp-text>Selanjutnya</ukmp-text>
                            </button>
                        </div>
                        <div class="HEADING">
                            <h1 class="siapkan-diri-untu">
                                <ukmp-text class="text-wrapper">Siapkan Diri untu</ukmp-text>
                                <span class="span"><br></span>
                                <ukmp-text class="text-wrapper-2">Pertualangan Baru</ukmp-text>
                            </h1>
                        </div>
                    </div>
                </div>
                <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                    <div class="modal-content">
                        <div class="swipe-indicator"></div>
                        <button class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper">Silakan pilih menu berikut untuk bergabung</ukmp-text>
                        <div class="button-container">
                            <button class="button modal-button" on-click="showHome">Pengendara</button>
                            <button class="button modal-button" on-click="showHomeBela">Pembela</button>
                        </div>
                    </div>
              </div>
            </div>
        </div>
        <home-app id="homeApp" class$="{{homeAppClass}}"></home-app>
        <home-app-pembela id="homeAppBela" class$="{{homeAppBelaClass}}"></home-app-bela>
    `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppBelaClass: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            }
        };
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    showHomeBela() {
        this.homeAppBelaClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    showTravelAppSplash() {
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada homeAppClass
        this.homeAppBelaClass = "hidden";
        this.travelAppSplashClass = ""; // Menghapus kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.modal = this.shadowRoot.getElementById("modal");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("button-clicked", this.handleButtonClick);
    }


    openModal() {
        this.modal = this.shadowRoot.getElementById("modal");
        this.modal.style.display = "block";
        this.modalStartPosition = 0;
        this.modal.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
        } else {
            this.resetModalPosition();
        }
    }

    moveModal(deltaY) {
        this.modal.style.transform = `translateY(${deltaY}px)`;
    }

    resetModalPosition() {
        this.modal.style.transform = "";
    }

    closeModal() {
        this.modal.style.display = "none";
        this.modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleButtonClick(e) {
        const button = e.target;
        const { detail } = event;
        if (detail.buttonId === "button1") {
            this.showHome();
        } if (detail.buttonId === "button2") {
            this.showHomeBela();
        }
        // Handle button click event
        console.log("Button clicked:", button.textContent);
    }
    handleButton1Click() {
        // Tambahkan logika Anda di sini untuk menangani klik Button 1

        // Contoh logika untuk mengubah tampilan halaman
        this.showHome();
        this.showHomeBela();

        // Simpan status klik Button 1 ke localStorage
        localStorage.setItem('button1Clicked', 'true');
    }

}

customElements.define("ukmp-app", UkmpApp);

class ImageComponent extends PolymerElement {
    static get template() {
        return html`
        <style>
          :host {
            display: block;
          }
  
          #image {
            width: 100%;
            height: 100%;
          }
        </style>
        
        <div id="image"></div>
      `;
    }

    static get properties() {
        return {
            src: {
                type: String,
                observer: '_srcChanged'
            },
            alt: {
                type: String,
                value: ''
            }
        };
    }

    _srcChanged(src) {
        if (src) {
            const extension = src.substring(src.lastIndexOf('.') + 1).toLowerCase();
            if (extension === 'svg') {
                this.shadowRoot.querySelector('#image').innerHTML = `<object type="image/svg+xml" data="${src}" width="100%" height="100%"></object>`;
            } else {
                this.shadowRoot.querySelector('#image').innerHTML = `<img src="${src}" alt="${this.alt}" width="100%" height="100%">`;
            }
        }
    }
}

customElements.define("image-component", ImageComponent);

class UkmpText extends HTMLElement {
    static get template() {
        return html`
          <style>
            :host {
              display: inline;
            }
          </style>
          
          <slot></slot>
        `;
    }
}

customElements.define("ukmp-text", UkmpText);

class HomeApp extends PolymerElement {
    static get template() {
        return html`
        <style>
        #notif {
            display: block;
            position: fixed;
            top: 5%;
            right: 15%;
            transform: translateX(80%); /* Menambahkan jarak dari kanan menggunakan nilai piksel */
          }
        
          #app {
            display: block;
            position: fixed;
            top: 5%;
            right: 25%;
            transform: translateX(55%); /* Menambahkan jarak dari kanan menggunakan nilai piksel */
          }
          .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }
        
          .modal-content {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%);
            background-color: #fff;
            padding: 10px;
            width: 340px;
            border-radius: 20px;
          }
          .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 24px;
            height: 24px;
            border: none;
            background-color: transparent;
            font-size: 18px;
            color: #999999;
            cursor: pointer;
            font-size: 28px;
          }
          
          .close-button:hover {
            color: #555555;
          }
          
          /* Button CSS */
          .centered-button {
            background-color: #007bff;
            color: #ffffff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          
          .centered-button:hover {
            background-color: #0056b3;
          }
          
          .button-container {
            text-align: center;
            margin-top: 20px;
          }

          .button-container .list-item {
            margin: 35px 0;
        }
          
          .modal-button {
            background-color: #f0f0f0;
            color: #333333;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-right: 10px;
          }
          
          .modal-button:hover {
            background-color: #dcdcdc;
          }
          .swipe-indicator {
            position: absolute;
            top: 5px;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 8px;
            background-color: #cccccc;
            border-radius: 40px;
          }
          .centered-button {
            background-color: transparent;
          }
          .grid {
            display: grid;
            gap: 5px;
            grid-template-columns: repeat(3, 1fr);
        }

        ukmp-grid>ukmp-grid {
            padding: 10px;
            background-color: #ccc;
        }

        ukmp-grid img {
            position: relative;
            width: 50%;
            left: 50%;
            transform: translate(-50%, 0);
        }

        .list-grid {
            display: grid;
            color: #212121;
            align-content: center;
            align-items: center;
            align-self: center;
            text-align: center;
        }

        .img-op {
            width: 90px;
            height: 90px;
            border-radius: 25px;
            align-items: center;
            align-self: center;
            align-content: center;
            left: 50%;
            transform: translate(-50%, 0);
            display: flex;
            position: relative;
        }
        .text-wrapper {
            font-weight: 700;
            letter-spacing: 0;
            margin-bottom: 50px;
        }
        </style>
        <ukmp-map id="map"></ukmp-map>
        <carousel-component></carousel-component>
        <div id="notif">
            <button class="centered-button"on-click="openNotif">
                <image-component class="notification" alt="Notification" src="/../../images/notification.png" /></image-component>
            </button>
        </div>
        <div id="app">
            <button class="centered-button"on-click="openModal">
                <svg width="24" height="24" class="all-app" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 17a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zM5 17a2 2 0 110 4 2 2 0 010-4zm7-7a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zM5 10a2 2 0 110 4 2 2 0 010-4zm7-7a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zM5 3a2 2 0 110 4 2 2 0 010-4z">
                    </path>
                </svg>
            </button>
        </div>
        <div id="moni" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
            <div class="modal-content">
                <div class="swipe-indicator"></div>
                <button class="close-button" on-click="closeModal">&#215;</button>
                <div class="button-container">
                <ukmp-text class="text-wrapper">Notifikasi Perjalanan</ukmp-text>
                    <div class="list-item">
                        <image-component src="/../../images/OBJECTS.png"></image-component>
                    </div>
                </div>
            </div>
        </div>
        <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
            <div class="modal-content">
                <div class="swipe-indicator"></div>
                <button class="close-button" on-click="closeModal">&#215;</button>
                <div class="button-container">
                    <div class="list-item">
                    <ukmp-text class="text-wrapper">Aplikasi UKMP</ukmp-text>
                        <div class="grid">
                            <ukmp-grid class="list-grid">
                                <div class="img-op" data-link="https://ukmpapps.web.app/download" on-click="navigateToLink" >
                                    <image-component src="https://ukmpapps.web.app/apps/1.png" alt=""></image-component>
                                </div>
                                Download
                            </ukmp-grid>
                            <ukmp-grid class="list-grid">
                                <div class="img-op" data-link="https://ukmpapps.web.app/apps/story" on-click="navigateToLink">
                                    <image-component src="https://ukmpapps.web.app/apps/2.png" alt=""></image-component>
                                </div>
                                UKMP Story
                            </ukmp-grid>
                            </ukmp-grid>
                            <ukmp-grid class="list-grid">
                                <div class="img-op" data-link="https://ukmpapps.web.app/medsos" on-click="navigateToLink">
                                    <image-component src="https://ukmpapps.web.app/apps/3.png" alt=""></image-component>
                                </div>
                                Media Sosial
                            </ukmp-grid>
                            <ukmp-grid class="list-grid">
                                <div class="img-op" data-link="https://ukmpapps.web.app/apps/karya/SecureJourney" on-click="navigateToLink">
                                    <image-component src="https://ukmpapps.web.app/apps/4.png" alt=""></image-component>
                                </div>
                                Karya UKMP
                            </ukmp-grid>
                            <ukmp-grid class="list-grid">
                                <div class="img-op" data-link="https://ukmpapps.web.app/berita" on-click="navigateToLink">
                                    <image-component src="https://ukmpapps.web.app/apps/5.png" alt=""></image-component>
                                </div>
                                Berita
                            </ukmp-grid>
                            <ukmp-grid class="list-grid">
                                <div class="img-op" data-link="https://ukmpapps.web.app/prestasi" on-click="navigateToLink">
                                    <image-component src="https://ukmpapps.web.app/apps/6.png" alt=""></image-component>

                                </div>
                                Prestasi
                            </ukmp-grid>
                            <ukmp-grid class="list-grid">
                                <div class="img-op" data-link="https://ukmpapps.web.app/departement" on-click="navigateToLink">
                                    <image-component src="https://ukmpapps.web.app/apps/7.png" alt=""></image-component>
                                </div>
                                Departement
                            </ukmp-grid>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        `;
    }
    connectedCallback() {
        super.connectedCallback();
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
    }

    navigateToLink(event) {
        const button = event.target;
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("button-clicked", this.handleButtonClick);
    }

    openModal() {
        this.modal = this.shadowRoot.getElementById("modal");
        this.modal.style.display = "block";
        this.modalStartPosition = 0;
        this.modal.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    openNotif() {
        this.moni = this.shadowRoot.getElementById("moni");
        this.moni.style.display = "block";
        this.moniStartPosition = 0;
        this.moni.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.moni.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.moni.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
        this.moniStartPosition = this.moni.getBoundingClientRect().top;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
        } else {
            this.resetModalPosition();
        }
    }

    moveModal(deltaY) {
        this.modal.style.transform = `translateY(${deltaY}px)`;
        this.moni.style.transform = `translateY(${deltaY}px)`
    }

    resetModalPosition() {
        this.modal.style.transform = "";
        this.moni.style.transform = "";
    }

    closeModal() {
        this.modal.style.display = "none";
        this.modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
        this.moni.style.display = "none";
        this.moni.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        this.moni.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        this.moni.removeEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }

}
customElements.define("home-app", HomeApp);

class Carousel extends PolymerElement {
    static get template() {
        return html`
      <style>
      :host {
        display: block;
        position: relative;
        width: 100%;
        bottom: 0;
        overflow: hidden;
      }

      #carousel {
        display: flex;
        width: 100%;
        transform: translateX(-0%);
        transition: transform 0.3s ease;
        position: fixed;
        bottom: 5%;
      }

      .carousel-item {
        flex: 0 0 32.2%;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f1f1f1;
        color: #333;
        font-size: 24px;
        margin-right: 10px; /* Menambahkan jarak antara slide */
        border-radius: 10px; /* Menambahkan border-radius */
      }

      .carousel-item:last-child {
        margin-left: 6px; /* Menghapus margin-right pada slide terakhir */
      }
      .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
      }
      
      .image {
        flex: 1;
        text-align: right;
        margin-right: 20px;
      }
      
      .image img {
        max-width: 100%;
        height: auto;
      }
      
      .text {
        flex: 1;
        text-align: left;
      }
      
      .text h1 {
        font-size: 24px;
        margin-bottom: 10px;
      }
      
      .text p {
        font-size: 16px;
        margin-bottom: 20px;
      }
      
      .text button {
        padding: 10px 20px;
        font-size: 16px;
      }

      .modal-button {
        background-color: black;
        color: #f0f0f0;
        padding: 10px 20px;
        border: none;
        border-radius: 45px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-right: 10px;
      }
      
      .modal-button:hover {
        background-color: #ede3e3;
        color: black;
      }
      </style>

      <div id="carousel" class="carousel">
        <div class="carousel-item">
            <div class="content">
                <div class="image">
                    <image-component src="/../../images/Group 29.png" alt="Gambar 1"></image-component>
                </div>
                <div class="text">
                    <h1><ukmp-text>Fajar Wahyu Fuedsi</ukmp-text></h1>
                    <p><ukmp-text>Mahasiswa Pendidikan Geografi</ukmp-text></p>
                    <button class="modal-button" data-link="https://www.instagram.com/fajarfuedsi/" on-click="navigateToLink"><ukmp-text>Hubungi Sekarang</ukmp-text></button>
                </div>
            </div>
        </div>
        <div class="carousel-item">            
            <div class="content">
                <div class="image">
                    <image-component src="/../../images/Group 32.png" alt="Gambar 1"></image-component>
                </div>
                <div class="text">
                    <h1><ukmp-text>Galih Ridho Utomo</ukmp-text></h1>
                    <p><ukmp-text>Mahasiswa Fisika</ukmp-text></p>
                    <button class="modal-button" data-link="https://www.instagram.com/galih_ridho_utomo/" on-click="navigateToLink"><ukmp-text>Hubungi Sekarang</ukmp-text></button>
                </div>
            </div>
        </div>
        <div class="carousel-item">
            <div class="content">
                <div class="image">
                    <image-component src="/../../images/Group 29.png" alt="Gambar 1"></image-component>
                </div>
                <div class="text">
                    <h1><ukmp-text>Martin Reyhan Putra</ukmp-text></h1>
                    <p><ukmp-text>Mahasiswa Biologi</ukmp-text></p>
                    <button class="modal-button" data-link="#" on-click="navigateToLink"><ukmp-text>Hubungi Sekarang</ukmp-text></button>
                </div>
            </div>
        </div>
      </div>
    `;
    }

    static get is() {
        return 'carousel-component';
    }

    connectedCallback() {
        super.connectedCallback();
        this.initializeCarousel();
    }
    navigateToLink(event) {
        const button = event.target;
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    }

    initializeCarousel() {
        const carousel = this.shadowRoot.getElementById('carousel');
        const carouselItems = carousel.getElementsByClassName('carousel-item');
        const numItems = carouselItems.length;
        const itemWidthPercentage = 100 / numItems;

        carousel.style.width = `${numItems * 100}%`;

        Array.from(carouselItems).forEach((item) => {
            item.style.width = `${itemWidthPercentage}%`;
        });

        let currentItem = 0;

        setInterval(() => {
            currentItem = (currentItem + 1) % numItems;
            const translateX = `-${currentItem * itemWidthPercentage}%`;
            carousel.style.transform = `translateX(${translateX})`;
        }, 3000);
    }
}

customElements.define(Carousel.is, Carousel);

class Polymap extends PolymerElement {
    static get template() {
        return html`
      <style>
        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 0;
        }
      </style>

      <iframe width="100%" height="100%" frameborder="0" src="https://ukmpapps.web.app/apps/karya/SecureJourney/map"></iframe>
    `;
    }
}

customElements.define('ukmp-map', Polymap);

class HomeAppBela extends PolymerElement {
    static get template() {
        return html`
        <style>
        .box {
            background-color: transparent;
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 100%;
        }
        
        .box .home-wrapper {
            border: 0px none;
            height: 919px;
            position: relative;
            width: 525px;
        }
        
        .box .home {
            height: 919px;
            left: 0;
            position: fixed;
            top: 0;
            width: 525px;
        }
        
        .box .overlap {
            background-color: #f5f4ef66;
            border-radius: 0px 0px 30px 30px;
            height: 334px;
            left: 14px;
            position: absolute;
            top: 0;
            width: 414px;
        }
        
        .box .overlap-group {
            height: 216px;
            left: 0;
            position: absolute;
            top: 7px;
            width: 386px;
        }
        
        .box .div {
            height: 216px;
            left: 0;
            position: absolute;
            top: 0;
            width: 386px;
        }
        
        .box .bird {
            height: 6px;
            left: 131px;
            position: absolute;
            top: 13px;
            width: 17px;
        }
        
        .box .img {
            height: 13px;
            left: 103px;
            position: absolute;
            top: 111px;
            width: 35px;
        }
        
        .box .hand {
            height: 185px;
            left: 0;
            position: absolute;
            top: 0;
            width: 159px;
        }
        
        .box .welcome-heading {
            height: 102px;
            left: 30px;
            position: absolute;
            top: 114px;
            width: 356px;
        }
        
        .box .welcome-charlie {
            color: #545454;
            font-family: "GT Walsheim Pro-Bold", Helvetica;
            font-size: 40px;
            font-weight: 400;
            left: 0;
            line-height: 50px;
            position: absolute;
            top: 0;
            width: 354px;
        }
        
        .box .text-wrapper {
            font-weight: 700;
            letter-spacing: 0;
        }
        
        .box .span {
            font-family: "GT Walsheim Pro-Medium", Helvetica;
            font-size: 35px;
            font-weight: 500;
            letter-spacing: 1.4px;
        }
        
        .box .notification {
            height: 24px;
            left: 305px;
            position: absolute;
            top: 53px;
            width: 23px;
        }
        
        .box .menu {
            height: 25px;
            left: 358px;
            position: absolute;
            top: 52px;
            width: 25px;
        }
        
        .box .ellipse {
            background-color: #545454;
            border-radius: 5.7px;
            height: 11px;
            left: 0;
            position: absolute;
            top: 0;
            width: 11px;
        }
        
        .box .rectangle {
            background-color: #545454;
            border-radius: 1.88px 0px 1.88px 1.88px;
            height: 9px;
            left: 2px;
            position: absolute;
            top: 14px;
            width: 9px;
        }
        
        .box .rectangle-2 {
            background-color: #545454;
            border-radius: 1.88px 0px 1.88px 1.88px;
            height: 9px;
            left: 14px;
            position: absolute;
            top: 2px;
            transform: rotate(180deg);
            width: 9px;
        }
        
        .box .rectangle-3 {
            background-color: #545454;
            border-radius: 1.88px 0px 1.88px 1.88px;
            height: 11px;
            left: 14px;
            position: absolute;
            top: 14px;
            transform: rotate(180deg);
            width: 11px;
        }
        
        .box .search-bar {
            height: 41px;
            left: 30px;
            position: absolute;
            top: 253px;
            width: 356px;
        }
        
        .box .overlap-group-2 {
            border: 1px solid;
            border-color: #545454;
            border-radius: 10px;
            height: 43px;
            left: -1px;
            position: relative;
            top: -1px;
        }
        
        .box .icon-outlined-action {
            height: 18px;
            left: 20px;
            position: absolute;
            top: 12px;
            width: 18px;
        }
        
        .box .text-wrapper-2 {
            color: #545454;
            font-family: "GT Walsheim Pro-CondensedLight Oblique", Helvetica;
            font-size: 16px;
            font-weight: 300;
            left: 48px;
            letter-spacing: 0.64px;
            line-height: normal;
            position: absolute;
            top: 12px;
            white-space: nowrap;
        }
        
        .box .saved-places {
            height: 287px;
            left: 44px;
            position: absolute;
            top: 374px;
            width: 356px;
        }
        
        .box .text-wrapper-3 {
            color: #545454;
            font-family: "GT Walsheim Pro-CondensedMedium Oblique", Helvetica;
            font-size: 20px;
            font-weight: 500;
            left: 0;
            letter-spacing: 0.8px;
            line-height: normal;
            position: absolute;
            top: 0;
            white-space: nowrap;
        }
        
        .box .BARCELONA {
            height: 112px;
            left: 187px;
            position: absolute;
            top: 43px;
            width: 167px;
        }
        
        .box .JAPAN {
            height: 112px;
            left: 0;
            position: absolute;
            top: 43px;
            width: 169px;
        }
        
        .box .div-wrapper {
            background-image: url(./image.png);
            background-size: 100% 100%;
            height: 112px;
            position: relative;
            width: 167px;
        }
        
        .box .text-wrapper-4 {
            color: #f6ede3;
            font-family: "GT Walsheim Pro-CondensedMedium Oblique", Helvetica;
            font-size: 16px;
            font-weight: 500;
            left: 10px;
            letter-spacing: 0;
            line-height: normal;
            position: absolute;
            top: 31px;
            white-space: nowrap;
        }
        
        .box .rome {
            height: 112px;
            left: 187px;
            position: absolute;
            top: 175px;
            width: 169px;
        }
        
        .box .overlap-2 {
            background-image: url(./mask-group-2.png);
            background-size: 100% 100%;
            height: 112px;
            position: relative;
            width: 167px;
        }
        
        .box .text-wrapper-5 {
            color: #ffffff;
            font-family: "GT Walsheim Pro-CondensedMedium Oblique", Helvetica;
            font-size: 16px;
            font-weight: 500;
            left: 10px;
            letter-spacing: 0;
            line-height: normal;
            position: absolute;
            top: 31px;
            white-space: nowrap;
        }
        
        .box .GREECE {
            height: 112px;
            left: 0;
            position: absolute;
            top: 175px;
            width: 167px;
        }
        
        .box .travel-buddies {
            height: 228px;
            left: 44px;
            position: absolute;
            top: 691px;
            width: 483px;
        }
        
        .box .overlap-3 {
            height: 228px;
            left: 0;
            position: absolute;
            top: 0;
            width: 292px;
        }
        
        .box .ashok {
            height: 209px;
            left: 120px;
            position: absolute;
            top: 19px;
            width: 172px;
        }
        
        .box .group {
            height: 209px;
            width: 184px;
        }
        
        .box .overlap-group-3 {
            height: 209px;
            position: relative;
            width: 172px;
        }
        
        .box .rectangle-4 {
            background-color: #00664f;
            border-radius: 10px 100px 10px 10px;
            height: 185px;
            left: 0;
            position: absolute;
            top: 24px;
            width: 139px;
        }
        
        .box .text-wrapper-6 {
            color: #ffffff;
            font-family: "GT Walsheim Pro-CondensedLight Oblique", Helvetica;
            font-size: 14px;
            font-weight: 300;
            left: 10px;
            letter-spacing: 0.56px;
            line-height: normal;
            position: absolute;
            top: 43px;
            white-space: nowrap;
        }
        
        .box .text-wrapper-7 {
            color: #ffffff;
            font-family: "GT Walsheim Pro-CondensedLight Oblique", Helvetica;
            font-size: 14px;
            font-weight: 300;
            left: 10px;
            letter-spacing: 0.56px;
            line-height: normal;
            position: absolute;
            top: 92px;
            white-space: nowrap;
        }
        
        .box .text-wrapper-8 {
            color: #ffffff;
            font-family: "GT Walsheim Pro-CondensedLight Oblique", Helvetica;
            font-size: 14px;
            font-weight: 300;
            left: 10px;
            letter-spacing: 0.56px;
            line-height: normal;
            position: absolute;
            top: 141px;
            white-space: nowrap;
        }
        
        .box .text-wrapper-9 {
            color: #ffffff;
            font-family: "GT Walsheim Pro-CondensedBold Oblique", Helvetica;
            font-size: 16px;
            font-weight: 700;
            left: 10px;
            letter-spacing: 0.64px;
            line-height: normal;
            position: absolute;
            top: 64px;
            white-space: nowrap;
        }
        
        .box .text-wrapper-10 {
            color: #ffffff;
            font-family: "GT Walsheim Pro-CondensedBold Oblique", Helvetica;
            font-size: 16px;
            font-weight: 700;
            left: 10px;
            letter-spacing: 0.64px;
            line-height: normal;
            position: absolute;
            top: 113px;
            white-space: nowrap;
        }
        
        .box .text-wrapper-11 {
            color: #ffffff;
            font-family: "GT Walsheim Pro-CondensedBold Oblique", Helvetica;
            font-size: 16px;
            font-weight: 700;
            left: 10px;
            letter-spacing: 0.64px;
            line-height: normal;
            position: absolute;
            top: 162px;
            white-space: nowrap;
        }
        
        .box .mask-group {
            height: 186px;
            left: 48px;
            position: absolute;
            top: 0;
            width: 124px;
        }
        
        .box .add {
            height: 100px;
            left: 0;
            position: absolute;
            top: 43px;
            width: 100px;
        }
        
        .box .icon-outlined-wrapper {
            border: 1px solid;
            border-color: #828282;
            border-radius: 10px;
            height: 102px;
            left: -1px;
            position: relative;
            top: -1px;
            width: 102px;
        }
        
        .box .icon-outlined {
            height: 24px;
            left: 38px;
            position: absolute;
            top: 38px;
            width: 24px;
        }
        
        .box .jack {
            height: 209px;
            left: 312px;
            position: absolute;
            top: 19px;
            width: 181px;
        }
        
        .box .overlap-4 {
            height: 209px;
            position: relative;
            width: 139px;
        }
        
        .box .rectangle-5 {
            background-color: #9ba1ff;
            border-radius: 10px 100px 10px 10px;
            height: 185px;
            left: 0;
            position: absolute;
            top: 24px;
            width: 139px;
        }
        
        .box .text-wrapper-12 {
            color: #ffffff;
            font-family: "GT Walsheim Pro-CondensedLight Oblique", Helvetica;
            font-size: 14px;
            font-weight: 300;
            left: 10px;
            letter-spacing: 0.56px;
            line-height: normal;
            position: absolute;
            top: 44px;
            white-space: nowrap;
        }
        
        .box .text-wrapper-13 {
            color: #ffffff;
            font-family: "GT Walsheim Pro-CondensedLight Oblique", Helvetica;
            font-size: 14px;
            font-weight: 300;
            left: 10px;
            letter-spacing: 0.56px;
            line-height: normal;
            position: absolute;
            top: 93px;
            white-space: nowrap;
        }
        
        .box .text-wrapper-14 {
            color: #ffffff;
            font-family: "GT Walsheim Pro-CondensedLight Oblique", Helvetica;
            font-size: 14px;
            font-weight: 300;
            left: 10px;
            letter-spacing: 0.56px;
            line-height: normal;
            position: absolute;
            top: 142px;
            white-space: nowrap;
        }
        
        .box .text-wrapper-15 {
            color: #ffffff;
            font-family: "GT Walsheim Pro-CondensedBold Oblique", Helvetica;
            font-size: 16px;
            font-weight: 700;
            left: 10px;
            letter-spacing: 0.64px;
            line-height: normal;
            position: absolute;
            top: 65px;
            white-space: nowrap;
        }
        
        .box .text-wrapper-16 {
            color: #ffffff;
            font-family: "GT Walsheim Pro-CondensedBold Oblique", Helvetica;
            font-size: 16px;
            font-weight: 700;
            left: 10px;
            letter-spacing: 0.64px;
            line-height: normal;
            position: absolute;
            top: 114px;
            white-space: nowrap;
        }
        
        .box .text-wrapper-17 {
            color: #ffffff;
            font-family: "GT Walsheim Pro-CondensedBold Oblique", Helvetica;
            font-size: 16px;
            font-weight: 700;
            left: 10px;
            letter-spacing: 0.64px;
            line-height: normal;
            position: absolute;
            top: 163px;
            white-space: nowrap;
        }
        
        .box .mask-group-2 {
            height: 186px;
            left: 51px;
            position: absolute;
            top: 0;
            width: 21px;
        }
        
        </style>
        
        <div class="box">
            <div class="home-wrapper">
                <div class="home">
                    <div class="overlap">
                        <div class="overlap-group">
                            <div class="div">
                                <img class="bird" alt="Bird" src="/../../images/bird.svg" />
                                <img class="img" alt="Bird" src="/../../images/image.svg" />
                                <img class="hand" alt="Hand" src="/../../images/hand.svg" />
                                <div class="welcome-heading">
                                    <h1 class="welcome-charlie">
                                        <span class="text-wrapper">
                                            Welcome,
                                            <br />
                                        </span>
                                        <span class="span">Charlie</span>
                                    </h1>
                                </div>
                            </div>
                            <button class="centered-button"on-click="openModal">
                                <img class="notification" alt="Notification" src="/../../images/notification.png" />
                            </button>
                            <div class="menu">
                                <div class="ellipse" />
                                <div class="rectangle" />
                                <div class="rectangle-2" />
                                <div class="rectangle-3" />
                            </div>
                        </div>
                        <div class="search-bar">
                            <div class="overlap-group-2">
                                <img class="icon-outlined-action" alt="Icon outlined action" src="/../../images/search.svg" />
                                <div class="text-wrapper-2">Search</div>
                            </div>
                        </div>
                    </div>
                    <div class="saved-places">
                        <div class="text-wrapper-3">Saved Places</div>
                        <img class="BARCELONA" alt="Barcelona" src="/../../images/BARCELONA.png" />
                        <div class="JAPAN">
                            <div class="div-wrapper">
                                <div class="text-wrapper-4">JAPAN</div>
                            </div>
                        </div>
                        <div class="rome">
                            <div class="overlap-2">
                                <div class="text-wrapper-5">ROME</div>
                            </div>
                        </div>
                        <img class="GREECE" alt="Greece" src="/../../images/GREECE.png" />
                    </div>
                    <div class="travel-buddies">
                        <div class="overlap-3">
                            <div class="overlap-3">
                                <div class="text-wrapper-3">Travel Buddies</div>
                                <div class="ashok">
                                    <div class="group">
                                        <div class="overlap-group-3">
                                            <div class="rectangle-4" />
                                            <div class="text-wrapper-6">Name</div>
                                            <div class="text-wrapper-7">Age</div>
                                            <div class="text-wrapper-8">Status</div>
                                            <div class="text-wrapper-9">Ashok</div>
                                            <div class="text-wrapper-10">28</div>
                                            <div class="text-wrapper-11">Friend</div>
                                            <img class="mask-group" alt="Mask group" src="/../../images/mask-group.png" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="add">
                                <div class="icon-outlined-wrapper">
                                    <img class="icon-outlined" alt="Icon outlined" src="/../../images/image-2.svg" />
                                </div>
                            </div>
                        </div>
                        <div class="jack">
                            <div class="overlap-4">
                                <div class="rectangle-5" />
                                <div class="text-wrapper-12">Name</div>
                                <div class="text-wrapper-13">Age</div>
                                <div class="text-wrapper-14">Status</div>
                                <div class="text-wrapper-15">Jack</div>
                                <div class="text-wrapper-16">20</div>
                                <div class="text-wrapper-17">Friend</div>
                                <img class="mask-group-2" alt="Mask group" src="/../../images/mask-group-3.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
        <div class="modal-content">
            <div class="swipe-indicator"></div>
                <button class="close-button" on-click="closeModal">&#215;</button>
                <ukmp-text class="text-wrapper">Silakan pilih menu berikut untuk bergabung</ukmp-text>
                <div class="button-container">
                    <button class="button modal-button" on-click="showHome">Pengendara</button>
                    <button class="button modal-button" on-click="showHomeBela">Pembela</button>
                </div>
            </div>
        </div>

      `;
    }
    connectedCallback() {
        super.connectedCallback();

        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        }
    }

    handleButton1Click() {
        // Tambahkan logika Anda di sini untuk menangani klik Button 1

        // Contoh logika untuk mengubah tampilan halaman
        this.showHome();

        // Simpan status klik Button 1 ke localStorage
        localStorage.setItem('button1Clicked', 'true');
    }

    showHome() {
        // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "";

        // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden";
    }

    showTravelAppSplash() {
        // Menambahkan kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden";

        // Menghapus kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "";
    }
    connectedCallback() {
        super.connectedCallback();
        this.modal = this.shadowRoot.getElementById("modal");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("button-clicked", this.handleButtonClick);
    }


    openModal() {
        this.modal = this.shadowRoot.getElementById("modal");
        this.modal.style.display = "block";
        this.modalStartPosition = 0;
        this.modal.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
        } else {
            this.resetModalPosition();
        }
    }

    moveModal(deltaY) {
        this.modal.style.transform = `translateY(${deltaY}px)`;
    }

    resetModalPosition() {
        this.modal.style.transform = "";
    }

    closeModal() {
        this.modal.style.display = "none";
        this.modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        this.modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        this.modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleButtonClick(e) {
        const button = e.target;
        const { detail } = event;
        if (detail.buttonId === "button1") {
            this.showHome();
        } if (detail.buttonId === "button2") {
            this.showHomeBela();
        }
        // Handle button click event
        console.log("Button clicked:", button.textContent);
    }
    handleButton1Click() {
        // Tambahkan logika Anda di sini untuk menangani klik Button 1

        // Contoh logika untuk mengubah tampilan halaman
        this.showHome();
        this.showHomeBela();

        // Simpan status klik Button 1 ke localStorage
        localStorage.setItem('button1Clicked', 'true');
    }
}
customElements.define("home-app-pembela", HomeAppBela);

class UkmpLoad extends PolymerElement {
    static get template() {
        return html`
      <style>
      html, body {
        overflow: hidden;
      }
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: url('../logo/ukmp-logo-512x512.png');
        background-repeat: no-repeat;
        background-position: center;
        background-color: #fff;
        z-index: 9999;
        overflow: hidden;
      }
      @media (prefers-color-scheme: dark) {
        :host {
          background-color: #161b22;
          background-image: url('../logo/ukmp-logo-512x512-white.png');
          color: #f4f4f4;
          overflow: hidden;
        }
      }         
      </style>
      <slot></slot>
    `
    }
}
customElements.define("ukmp-load", UkmpLoad);