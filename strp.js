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
            .hidden {
                display: none;
            }
            .logo-arunika {
                width: 18%;
                position: fixed;
                top: 2%;
                left: 40%;
                transform: translateX(-50%); /* Menambahkan jarak dari kanan menggunakan nilai piksel */
            }
            .logo-ukmp {
                width: 20%;
                position: fixed;
                top: 2%;
                left: 25%;
                transform: translateX(-65%); /* Menambahkan jarak dari kanan menggunakan nilai piksel */
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
                        <div class="HEADING">
                            <h1 class="siapkan-diri-untu">
                                <img class="logo-arunika" src="/../../images/arunika.png"/>
                                <img class="logo-ukmp" src="/../../images/ukmp-logo-144x144.png"/>
                                <ukmp-text class="text-wrapper">Story Kegiatan UKMP</ukmp-text>
                                <span class="span"><br></span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <home-app id="homeApp" class$="{{homeAppClass}}"></home-app>
    `;
    }
    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("load", () => {
            setTimeout(() => {
                this.showHome();
            }, 5000);
        });
    }

    showHome() {
        this.homeAppClass = "";
        this.travelAppSplashClass = "hidden";
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
                    z-index: 1;
                    background: white;
                    border-radius: 100px;
                }

                #stma {
                    display: block;
                    position: fixed;
                    top: 5%;
                    left: 10px;
                    z-index: 1;
                    background: white;
                    border-radius: 100px;
                    width: 65px;
                }

                ukmp-text.text-wrapper-justity {
                    text-align: justify;
                }
                
                #app {
                    display: block;
                    position: fixed;
                    top: 5%;
                    right: 25%;
                    transform: translateX(55%); /* Menambahkan jarak dari kanan menggunakan nilai piksel */
                    z-index: 1;
                    background: white;
                    border-radius: 100px;
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
                    width: 85%;
                    border-radius: 20px;
                }

                .modal-content-map {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translate(-50%);
                    background-color: #fff;
                    padding: 10px;
                    width: 100%;
                    height: 60%;
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
                    z-index: 1;
                }
                
                .close-button:hover {
                    color: #555555;
                }

                .close-button-map {
                    position: absolute;
                    top: 10px;
                    right: 25px;
                    width: 24px;
                    height: 24px;
                    border: none;
                    background-color: #333;
                    color: #999999;
                    cursor: pointer;
                    font-size: 20px;
                    font-weight: bold;
                    border-radius: 100px;
                    z-index: 1;
                }
                
                .close-button-map:hover {
                    color: #555555;
                }
                
                /* Button CSS */
                .centered-button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 100px;
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
                .text-wrapper-justify {
                    font-weight: 700;
                    letter-spacing: 0;
                    margin-bottom: 50px;
                    text-align: justify;
                    color: black;
                }
                .image-component {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s ease-in-out;
                }
                .hidden {
                    display: none;
                }
                .profile-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #f1f1f1;
                    padding: 10px 0px 10px 0px;
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    border-radius: 20px 20px 0 0;
                }
                .profile-info {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .profile-picture img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
                .profile-details {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                .profile-details h3 {
                    margin: 0;
                }
                .profile-details p {
                    margin: 0;
                    color: #666666;
                }
                .share-button {
                    margin-left: auto;
                    position: fixed;
                    right: 0;
                }
                .share-button button {
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 14px;
                    border-radius: 4px;
                    cursor: pointer;
                    border-radius: 100px;
                }
                .site-header {
                    position: fixed;
                    top: calc(0px + 5%);
                    left: 0;
                    right: 0;
                    z-index: 9998;
        
                }
        
                .chips-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    max-width: 800px;
                    margin: 0 auto;
                }
        
                .chips-nav button {
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                }
        
                .chips-nav__prev {
                    color: #1c1c1c;
                }
        
                .chips-nav__next {
                    color: #1c1c1c;
                }
        
                .chips-wrapper {
                    display: flex;
                    overflow-x: auto;
                    scrollbar-width: none;
                    /* untuk menghilangkan scrollbar pada beberapa browser */
                    -ms-overflow-style: none;
                    /* untuk menghilangkan scrollbar pada beberapa browser */
                }
        
                .chips-wrapper::-webkit-scrollbar {
                    display: none;
                    /* untuk menghilangkan scrollbar pada beberapa browser */
                }
                .chip {
                    background-color: #f1f1f1;
                    color: #444;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    text-align: center;
                    margin-right: 10px;
                    padding: 10px;
                    border-radius: 20px;
                    text-decoration: none;
                    min-width: max-content;
                    margin-top: 5%;
                }
                ukmp-card {
                    background-color: #0d1117;
                    color: #fff;
                    overflow-x: hidden;
                } 
                .desp {
                    padding: 10px 0;
                }             
            </style>
            
            <div id="moni" class="modal" on-touchstart="handleTouchStartMon" on-touchmove="handleTouchMoveMon" on-touchend="handleTouchEndMon">
                <div class="modal-content">
                    <button class="close-button" on-click="closeModal">&#215;</button>
                    <div class="button-container">
                    <ukmp-text class="text-wrapper">Notifikasi Story</ukmp-text>
                        <div class="list-item">
                            <image-component src="/../../images/OBJECTS.png"></image-component>
                        </div>
                    </div>
                </div>
            </div>
            <div id="map" class="modal" on-touchstart="handleTouchStartMap" on-touchmove="handleTouchMoveMap" on-touchend="handleTouchEndMap">
                <div class="modal-content-map">
                    <button class="close-button-map" on-click="closeModal">&#215;</button>
                    <div class="button-container">
                    <ukmp-text class="text-wrapper">Map UKMP Upgrading</ukmp-text>
                        <div class="list-item">
                            <ukmp-map image-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.183750611734!2d110.3596553!3d-7.219870500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70876971740d6f%3A0xa55e620abe424a5f!2sVilla%2015!5e0!3m2!1sen!2sid!4v1688283130392!5m2!1sen!2sid"></ukmp-map>
                        </div>
                    </div>
                </div>
            </div>
            <div id="DesUp" class="modal" on-touchstart="handleTouchStartDesUp" on-touchmove="handleTouchMoveDesUp" on-touchend="handleTouchEndDesUp">
                <div class="modal-content">
                    <button class="close-button" on-click="closeModal">&#215;</button>
                    <div class="button-container">
                        <ukmp-text class="text-wrapper">Deskripsi</ukmp-text>
                        <div class="list-item">
                            <div class="site-header">
                                <div class="chips-nav">
                                    <button aria-labelledby="mundur" aria-label="mundur" title="mundur" class="chips-nav__prev"><i
                                            class="fas fa-chevron-left"></i></button>
                                    <button aria-labelledby="maju" aria-label="maju" title="maju" class="chips-nav__next"><i
                                            class="fas fa-chevron-right"></i></button>
                                </div>
                                <div class="chips-wrapper">
                                    <div class="chip">#HRD</div>
                                    <div class="chip">17-18 Juni 2023</div>
                                    <div class="chip">#Upgrading</div>
                                    <div class="chip">#NgopiIlmiah</div>
                                    <div class="chip">#StoryHRD</div>
                                </div>
                            </div>
                            <span>
                                <br>
                            </span>
                            <span>
                                <br>
                            </span>
                            <ukmp-text class="text-wrapper-justity">Kegiatan Upgrading adalah kegiatana peningkatan mutu, pengetahuan dan ilmu berorganisasi dalam suatu organisasi</ukmp-text>
                            <span>
                                <br>
                            </span>
                            <ukmp-text class="text-wrapper-justity">Tema Kegiatan Upgrading ini yaitu Melangkah Dalam Kolaborasi Untuk Meningkatkan Harmonisasi Fungsionaris UKM Penelitian UNNES</ukmp-text>
                        </div>
                        <ukmp-text class="text-wrapper">Day 1 sharing session</ukmp-text>
                        <image-component src="/../../images/day1/IMG_0052.JPG" alt="Gambar 1"></image-component>
                        <ukmp-text class="text-wrapper">Day 2 senam bersama</ukmp-text>
                        <image-component src="/../../images/day2/IMG_0217.JPG" alt="Gambar 1"></image-component>
                    </div>
                </div>
            </div>
            <div id="modal" class="modal" on-touchstart="handleTouchStartMod" on-touchmove="handleTouchMoveMod" on-touchend="handleTouchEndMod">
                <div class="modal-content">
                    <button class="close-button" on-click="closeModal">&#215;</button>
                    <div class="button-container">
                    <ukmp-text class="text-wrapper">Aplikasi UKMP</ukmp-text>
                        <div class="list-item">
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
            <ukmp-card class$="{{cardAppClass}}"></ukmp-card>
            <div class="image-component" id="image1">
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
                <div id="stma">
                    <button class="centered-button" on-click="openMap">
                        <image-component class="marker" alt="marker" src="/../../images/maps-and-flags.png" /></image-component>
                    </button>
                </div>
                <div class="profile-section">
                    <div class="profile-info">
                        <ukmp-departement-hrd nama-departemen="Departemen HRD" deskripsi-departemen="Human Resources Departement" image-src="/../../images/HRD.jpg"></ukmp-departement-hrd>
                        <div class="profile-details">
                            <h3>HRD Departement</h3>
                            <button class="desp centered-button"on-click="openDesUp">
                                <ukmp-text class="text-wrapper-justify">Kegiatan peningkatan mutu,...</ukmp-text>
                            </button>
                        </div>
                        <div class="share-button">
                            <button on-click="shareLink">Bagikan Laman</button>
                        </div>
                    </div>
                </div>
                <image-component src="/../../images/upgrading.png" alt="Gambar 1"></image-component>
            </div>
            <div class="image-component hidden" id="image2">
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
                <image-component src="/../../images/Group 32.png" alt="Gambar 2"></image-component>
            </div>
        `;
    }

    static get properties() {
        return {
            cardAppClass: {
                type: String,
                value: "hidden"
            }
        };
    }

    showHome() {
        this.cardAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.sidebarClass.classList.add("hidden");
    }

    hideHome() {
        this.cardAppClass.classList.add("hidden");
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.addEventListener("touchend", this.handleTouchEnd.bind(this));
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.DesUp = this.shadowRoot.getElementById("DesUp");
        this.map = this.shadowRoot.getElementById("map")
        this.addEventListener("button-clicked", this.handleButtonClick);
    }

    shareLink() {
        // Mengambil URL halaman saat ini
        const currentURL = window.location.href;

        // Melakukan tindakan berbagi link menggunakan API navigator.share
        if (navigator.share) {
            navigator.share({
                url: currentURL
            })
                .then(() => {
                    console.log('Berhasil membagikan link');
                })
                .catch((error) => {
                    console.error('Gagal membagikan link', error);
                });
        } else {
            console.log('API berbagi tidak didukung di browser ini');
        }
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
        this.modal.addEventListener("touchstart", this.handleTouchStartMod.bind(this));
        this.modal.addEventListener("touchmove", this.handleTouchMoveMod.bind(this));
        this.modal.addEventListener("touchend", this.handleTouchEndMod.bind(this));
    }

    openMap() {
        this.map = this.shadowRoot.getElementById("map");
        this.map.style.display = "block";
        this.mapStartPosition = 0;
        this.map.addEventListener("touchstart", this.handleTouchStartMap.bind(this));
        this.map.addEventListener("touchmove", this.handleTouchMoveMap.bind(this));
        this.map.addEventListener("touchend", this.handleTouchEndMap.bind(this));
    }

    openDesUp() {
        this.DesUp = this.shadowRoot.getElementById("DesUp");
        this.DesUp.style.display = "block";
        this.modalStartPosition = 0;
        this.DesUp.addEventListener("touchstart", this.handleTouchStartDesUp.bind(this));
        this.DesUp.addEventListener("touchmove", this.handleTouchMoveDesUp.bind(this));
        this.DesUp.addEventListener("touchend", this.handleTouchEndDesUp.bind(this));
    }

    openNotif() {
        this.moni = this.shadowRoot.getElementById("moni");
        this.moni.style.display = "block";
        this.moniStartPosition = 0;
        this.moni.addEventListener("touchstart", this.handleTouchStartMon.bind(this));
        this.moni.addEventListener("touchmove", this.handleTouchMoveMon.bind(this));
        this.moni.addEventListener("touchend", this.handleTouchEndMon.bind(this));
    }

    handleTouchStart(e) {
        this.startY = e.touches[0].pageY;
        this.currentImage = this.shadowRoot.querySelector(".image-component:not(.hidden)");
        this.nextImage = this.currentImage.nextElementSibling;
        this.prevImage = this.currentImage.previousElementSibling;
        this.currentImageStartPosition = 0;
        this.nextImageStartPosition = 0;
        this.prevImageStartPosition = 0;
    }

    handleTouchMove(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
        if (deltaY > 0 && this.prevImage) {
            this.moveImages(deltaY);
        } else if (deltaY < 0 && this.nextImage) {
            this.moveImages(deltaY);
        }
    }

    handleTouchEnd(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100 && this.prevImage) {
            this.showNextImage();
            this.hideHome();
        } else if (deltaY < -100 && this.nextImage) {
            this.showPrevImage();
        } else {
            this.resetImagesPosition();
        }
    }

    handleTouchStartMod(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
    }

    handleTouchMoveMod(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEndMod(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
        } else {
            this.resetModalPosition();
        }
    }

    handleTouchStartDesUp(e) {
        this.startY = e.touches[0].pageY;
        this.DesUpStartPosition = this.DesUp.getBoundingClientRect().top;
    }

    handleTouchMoveDesUp(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEndDesUp(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
        } else {
            this.resetModalPosition();
        }
    }

    handleTouchStartMap(e) {
        this.startY = e.touches[0].pageY;
        this.mapStartPosition = this.map.getBoundingClientRect().top;
    }

    handleTouchMoveMap(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEndMap(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeModal();
        } else {
            this.resetModalPosition();
        }
    }

    handleTouchStartMon(e) {
        this.startY = e.touches[0].pageY;
        this.modalStartPosition = this.modal.getBoundingClientRect().top;
        this.moniStartPosition = this.moni.getBoundingClientRect().top;
    }

    handleTouchMoveMon(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModal(deltaY);
    }

    handleTouchEndMon(e) {
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

    moveImages(deltaY) {
        this.currentImage.style.transform = `translateY(${this.currentImageStartPosition + deltaY}px)`;
        if (deltaY > 0) {
            this.nextImage.style.transform = `translateY(${this.nextImageStartPosition + deltaY}px)`;
        } else {
            this.prevImage.style.transform = `translateY(${this.prevImageStartPosition + deltaY}px)`;
        }
    }

    resetModalPosition() {
        this.modal.style.transform = "";
        this.moni.style.transform = "";
    }

    resetImagesPosition() {
        this.currentImage.style.transform = "";
        if (this.nextImage) {
            this.nextImage.style.transform = "";
        }
        if (this.prevImage) {
            this.prevImage.style.transform = "";
        }
    }

    showNextImage() {
        this.currentImage.classList.add("hidden");
        this.prevImage.classList.remove("hidden");
    }

    showPrevImage() {
        this.currentImage.classList.add("hidden");
        this.nextImage.classList.remove("hidden");
    }

    closeModal() {
        this.modal.style.display = "none";
        this.modal.removeEventListener("touchstart", this.handleTouchStartMod.bind(this));
        this.modal.removeEventListener("touchmove", this.handleTouchMoveMod.bind(this));
        this.modal.removeEventListener("touchend", this.handleTouchEndMod.bind(this));
        this.moni.style.display = "none";
        this.moni.removeEventListener("touchstart", this.handleTouchStartMon.bind(this));
        this.moni.removeEventListener("touchmove", this.handleTouchMoveMon.bind(this));
        this.moni.removeEventListener("touchend", this.handleTouchEndMon.bind(this));
        this.DesUp.style.display = "none";
        this.DesUp.removeEventListener("touchstart", this.handleTouchStartDesUp.bind(this));
        this.DesUp.removeEventListener("touchmove", this.handleTouchMoveDesUp.bind(this));
        this.DesUp.removeEventListener("touchend", this.handleTouchEndDesUp.bind(this));
        this.map.style.display = "none";
        this.map.removeEventListener("touchstart", this.handleTouchStartMap.bind(this));
        this.map.removeEventListener("touchmove", this.handleTouchMoveMap.bind(this));
        this.map.removeEventListener("touchend", this.handleTouchEndMap.bind(this));
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define("home-app", HomeApp);

class Card extends PolymerElement {
    static get template() {
        return html`
        <style>
        .card-container {
            display: flex;
            justify-content: space-between;
            background-color: #0d1117;
            color: #0d1117;
            overflow-x: hidden;
          }

          .modal-button {
            width: max-content;
            padding: 20px 0 0px 0;
            height: 185px;
            background-color: white;
            border-radius: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin: 0 5px;
          }
          
          .card-content {
            height: 200px;
          }
          
          iframe {
            width: 100%;
            height: 100%;
            border: none;
            overflow: hidden;
            margin-top: 10px
          }
          .text-wrapper {
            color: #545454;
            font-weight: 800;
            margin-bottom: 20px
          }         
        </style>
        <div class="card-container">
            <button class="modal-button" data-link="https://ukmpapps.web.app/apps/" on-click="navigateToLink">
                <ukmp-text class="text-wrapper">Beranda</ukmp-text>
                <iframe scrolling="no" src="https://ukmpapps.web.app/apps" frameborder="0"></iframe>
            </button>
            <button class="modal-button" data-link="https://ukmpapps.web.app/apps/story/" on-click="navigateToLink">
                <ukmp-text class="text-wrapper">Yang anda Kunjungi</ukmp-text>
                <iframe scrolling="no" src="https://ukmpapps.web.app/apps/story" frameborder="0"></iframe>
            </button>
        </div>
        `
    }

    navigateToLink(event) {
        const button = event.target;
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    }
}

customElements.define('ukmp-card', Card);

class DepartementCardHRD extends PolymerElement {
    static get template() {
        return html`
          <style>
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
                width: 85%;
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

            .headco {
                display: flex;
                align-items: center;
                gap: 5%;
            }

            .chilpar {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .prchilpar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .button-container{
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 20px;
            }

            .button-container h2 {
                margin: 0;
            }

            .button-container h2 {
                margin: 0;
                color: #666666;
            }

            .button-container .list-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .button-container .list-item image-component{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .modal-button {
                background-color: #0f0f0f;
                color: #fff;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
            }

            .modal-button-li {
                background-color: #fff;
                color: #0f0f0f;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0
            }
            
            .chil-button-prev {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0;
                width: 35px;
            }
            
            .chil-button-next {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                left: 0;
                width: 35px;
            }

            .text-wrapper {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            .centered-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
                background-image: url("/../../images/HRD.jpg");
                background-repeat: no-repeat;
                background-size: 50px;
                border: none;
            }
            .hidden {
                display: none;
            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text>[[deskripsiDepartemen]]</ukmp-text>
                            <button class="modal-button" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text>Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper">Anggota HRD</ukmp-text>
                            <button class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text>Lihat Selengkapnya</ukmp-text></button>
                        </div>    
                        <div class$="prchilpar {{travelAppSplashClass}}">
                            <image-component src="/../../images/Zikri Wildan Setiadi_HRD.JPG"></image-component>
                            <image-component src="/../../images/Nina Martian Ningsih _HRD.JPG"></image-component>
                            <button class="button chil-button-prev" on-click="showHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClass}}"">
                            <image-component src="/../../images/Abrar Rizq_HRD.jpg"></image-component>
                            <image-component src="/../../images/Puti Sekar Arginingrum_HRD.png"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                            <button class="button chil-button-prev" on-click="prevHome2">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClassRe}}"">
                            <image-component src="/../../images/BENI AJI SUBEKTI_HRD 2.jpeg"></image-component>
                            <image-component src="/../../images/Rikha Fitriani Umayatun_HRD.jpeg"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppClassRe: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            },
            namaDepartemen: {
                type: String,
                value: ''
            },
            deskripsiDepartemen: {
                type: String,
                value: ''
            },
            imageSrc: String,
        };
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.homeAppClassRe = "hidden";
    }

    prevHome() {
        this.homeAppClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClassRe = "hidden";
        this.travelAppSplashClass = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    prevHome2() {
        this.homeAppClassRe = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.prevHome();
        } else if (button1Clicked) {
            this.prevHome2();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
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
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define('ukmp-departement-hrd', DepartementCardHRD)

class DepartementCardDD extends PolymerElement {
    static get template() {
        return html`
          <style>
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
                width: 85%;
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

            .headco {
                display: flex;
                align-items: center;
                gap: 5%;
            }

            .chilpar {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .prchilpar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .button-container{
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 20px;
            }

            .button-container h2 {
                margin: 0;
            }

            .button-container h2 {
                margin: 0;
                color: #666666;
            }

            .button-container .list-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .button-container .list-item image-component{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .modal-button {
                background-color: #0f0f0f;
                color: #fff;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
            }

            .modal-button-li {
                background-color: #fff;
                color: #0f0f0f;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0
            }
            
            .chil-button-prev {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0;
                width: 35px;
            }
            
            .chil-button-next {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                left: 0;
                width: 35px;
            }

            .text-wrapper {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            .centered-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
                background-image: url("/../../images/dd/DD.jpg");
                background-repeat: no-repeat;
                background-size: 50px;
                border: none;
            }
            .hidden {
                display: none;
            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text>[[deskripsiDepartemen]]</ukmp-text>
                            <button class="modal-button" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text>Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper">Anggota DD</ukmp-text>
                            <button class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text>Lihat Selengkapnya</ukmp-text></button>
                        </div>    
                        <div class$="prchilpar {{travelAppSplashClass}}">
                            <image-component src="/../../images/dd/FAIZA GALUH MARTA_DD.HEIC"></image-component>
                            <image-component src="/../../images/dd/Fajar Wahyushi Fuedsi_DD.HEIC"></image-component>
                            <image-component src="/../../images/dd/Fatimah_DD.jpg"></image-component>
                            <button class="button chil-button-prev" on-click="showHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClass}}"">
                            <image-component src="/../../images/dd/Nur Fadiyah Choirunnissa_DD.HEIC"></image-component>
                            <image-component src="/../../images/dd/GALIH RIDHO UTOMO_DD.HEIC"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                            <button class="button chil-button-prev" on-click="prevHome2">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClassRe}}"">
                            <image-component src="/../../images/dd/IMG_20220601_165412_070723.jpg"></image-component>
                            <image-component src="/../../images/dd/Nining Hardiyanti_DD.HEIC"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppClassRe: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            },
            namaDepartemen: {
                type: String,
                value: ''
            },
            deskripsiDepartemen: {
                type: String,
                value: ''
            },
            imageSrc: String,
        };
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.homeAppClassRe = "hidden";
    }

    prevHome() {
        this.homeAppClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClassRe = "hidden";
        this.travelAppSplashClass = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    prevHome2() {
        this.homeAppClassRe = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.prevHome();
        } else if (button1Clicked) {
            this.prevHome2();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
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
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define('ukmp-departement-dd', DepartementCardDD)

class DepartementCardComdev extends PolymerElement {
    static get template() {
        return html`
          <style>
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
                width: 85%;
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

            .headco {
                display: flex;
                align-items: center;
                gap: 5%;
            }

            .chilpar {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .prchilpar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .button-container{
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 20px;
            }

            .button-container h2 {
                margin: 0;
            }

            .button-container h2 {
                margin: 0;
                color: #666666;
            }

            .button-container .list-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .button-container .list-item image-component{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .modal-button {
                background-color: #0f0f0f;
                color: #fff;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
            }

            .modal-button-li {
                background-color: #fff;
                color: #0f0f0f;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0
            }
            
            .chil-button-prev {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0;
                width: 35px;
            }
            
            .chil-button-next {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                left: 0;
                width: 35px;
            }

            .text-wrapper {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            .centered-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
                background-image: url("/../../images/dd/DD.jpg");
                background-repeat: no-repeat;
                background-size: 50px;
                border: none;
            }
            .hidden {
                display: none;
            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text>[[deskripsiDepartemen]]</ukmp-text>
                            <button class="modal-button" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text>Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper">Anggota Comdev</ukmp-text>
                            <button class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text>Lihat Selengkapnya</ukmp-text></button>
                        </div>    
                        <div class$="prchilpar {{travelAppSplashClass}}">
                            <image-component src="/../../images/comdev/Comdev_Ahmad Nurul Romadhon_Foto Formal.png"></image-component>
                            <image-component src="/../../images/comdev/Alvito Surya Nugraha_COMDEV..jpg"></image-component>
                            <button class="button chil-button-prev" on-click="showHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClass}}"">
                            <image-component src="/../../images/comdev/Dilla Andini_Comdev.jpg"></image-component>
                            <image-component src="/../../images/comdev/Medi Elfiani_COMDEV.jpg"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                            <button class="button chil-button-prev" on-click="prevHome2">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClassRe}}"">
                            <image-component src="/../../images/comdev/Izzuddin Muhammad_COMDEV.jpeg"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppClassRe: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            },
            namaDepartemen: {
                type: String,
                value: ''
            },
            deskripsiDepartemen: {
                type: String,
                value: ''
            },
            imageSrc: String,
        };
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.homeAppClassRe = "hidden";
    }

    prevHome() {
        this.homeAppClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClassRe = "hidden";
        this.travelAppSplashClass = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    prevHome2() {
        this.homeAppClassRe = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.prevHome();
        } else if (button1Clicked) {
            this.prevHome2();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
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
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define('ukmp-departement-comdev', DepartementCardComdev)

class DepartementCardKarya extends PolymerElement {
    static get template() {
        return html`
          <style>
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
                width: 85%;
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

            .headco {
                display: flex;
                align-items: center;
                gap: 5%;
            }

            .chilpar {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .prchilpar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .button-container{
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 20px;
            }

            .button-container h2 {
                margin: 0;
            }

            .button-container h2 {
                margin: 0;
                color: #666666;
            }

            .button-container .list-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .button-container .list-item image-component{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .modal-button {
                background-color: #0f0f0f;
                color: #fff;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
            }

            .modal-button-li {
                background-color: #fff;
                color: #0f0f0f;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0
            }
            
            .chil-button-prev {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0;
                width: 35px;
            }
            
            .chil-button-next {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                left: 0;
                width: 35px;
            }

            .text-wrapper {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            .centered-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
                background-image: url("/../../images/dd/DD.jpg");
                background-repeat: no-repeat;
                background-size: 50px;
                border: none;
            }
            .hidden {
                display: none;
            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text>[[deskripsiDepartemen]]</ukmp-text>
                            <button class="modal-button" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text>Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper">Anggota Karya</ukmp-text>
                            <button class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text>Lihat Selengkapnya</ukmp-text></button>
                        </div>    
                        <div class$="prchilpar {{travelAppSplashClass}}">
                            <image-component src="/../../images/karya/Christian Suan F.T_KARYA.JPG"></image-component>
                            <image-component src="/../../images/karya/Hamzah Naufal Zuhdi_Karya.JPG"></image-component>
                            <image-component src="/../../images/karya/Norita Agustina Subagyo_Karya.JPG"></image-component>
                            <button class="button chil-button-prev" on-click="showHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClass}}"">
                            <image-component src="/../../images/karya/Intan Nor Aini_Karya.JPG"></image-component>
                            <image-component src="/../../images/karya/Lamia Rozianna Putri_Karya.JPG"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                            <button class="button chil-button-prev" on-click="prevHome2">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClassRe}}"">
                            <image-component src="/../../images/karya/Livia Citra Atrianda_Karya_Formal.png"></image-component>
                            <image-component src="/../../images/karya/M ABDUL JABAR_KARYA.JPG"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppClassRe: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            },
            namaDepartemen: {
                type: String,
                value: ''
            },
            deskripsiDepartemen: {
                type: String,
                value: ''
            },
            imageSrc: String,
        };
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.homeAppClassRe = "hidden";
    }

    prevHome() {
        this.homeAppClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClassRe = "hidden";
        this.travelAppSplashClass = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    prevHome2() {
        this.homeAppClassRe = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.prevHome();
        } else if (button1Clicked) {
            this.prevHome2();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
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
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define('ukmp-departement-karya', DepartementCardKarya)

class DepartementCardPh extends PolymerElement {
    static get template() {
        return html`
          <style>
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
                width: 85%;
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

            .headco {
                display: flex;
                align-items: center;
                gap: 5%;
            }

            .chilpar {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .prchilpar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .button-container{
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 20px;
            }

            .button-container h2 {
                margin: 0;
            }

            .button-container h2 {
                margin: 0;
                color: #666666;
            }

            .button-container .list-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .button-container .list-item image-component{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .modal-button {
                background-color: #0f0f0f;
                color: #fff;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
            }

            .modal-button-li {
                background-color: #fff;
                color: #0f0f0f;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0
            }
            
            .chil-button-prev {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0;
                width: 35px;
            }
            
            .chil-button-next {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                left: 0;
                width: 35px;
            }

            .text-wrapper {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            .centered-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
                background-image: url("/../../images/dd/DD.jpg");
                background-repeat: no-repeat;
                background-size: 50px;
                border: none;
            }
            .hidden {
                display: none;
            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text>[[deskripsiDepartemen]]</ukmp-text>
                            <button class="modal-button" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text>Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper">Anggota PH</ukmp-text>
                            <button class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text>Lihat Selengkapnya</ukmp-text></button>
                        </div>    
                        <div class$="prchilpar {{travelAppSplashClass}}">
                            <image-component src="/../../images/ph/hasan_PH.JPG"></image-component>
                            <image-component src="/../../images/ph/Intan Nurfaizah PH.JPG"></image-component>
                            <button class="button chil-button-prev" on-click="showHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClass}}"">
                            <image-component src="/../../images/ph/PH_Evin Yulianto.JPG"></image-component>
                            <image-component src="/../../images/ph/Lisa Edliani_PH.JPG"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                            <button class="button chil-button-prev" on-click="prevHome2">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClassRe}}"">
                            <image-component src="/../../images/ph/Rouna Nastiti_PH.JPG"></image-component>
                            <image-component src="/../../images/ph/Thoyibah_PH.JPG"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppClassRe: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            },
            namaDepartemen: {
                type: String,
                value: ''
            },
            deskripsiDepartemen: {
                type: String,
                value: ''
            },
            imageSrc: String,
        };
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.homeAppClassRe = "hidden";
    }

    prevHome() {
        this.homeAppClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClassRe = "hidden";
        this.travelAppSplashClass = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    prevHome2() {
        this.homeAppClassRe = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.prevHome();
        } else if (button1Clicked) {
            this.prevHome2();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
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
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define('ukmp-departement-ph', DepartementCardPh)

class DepartementCardPRD extends PolymerElement {
    static get template() {
        return html`
          <style>
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
                width: 85%;
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

            .headco {
                display: flex;
                align-items: center;
                gap: 5%;
            }

            .chilpar {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .prchilpar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .button-container{
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 20px;
            }

            .button-container h2 {
                margin: 0;
            }

            .button-container h2 {
                margin: 0;
                color: #666666;
            }

            .button-container .list-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .button-container .list-item image-component{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .modal-button {
                background-color: #0f0f0f;
                color: #fff;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
            }

            .modal-button-li {
                background-color: #fff;
                color: #0f0f0f;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0
            }
            
            .chil-button-prev {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0;
                width: 35px;
            }
            
            .chil-button-next {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                left: 0;
                width: 35px;
            }

            .text-wrapper {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            .centered-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
                background-image: url("/../../images/dd/DD.jpg");
                background-repeat: no-repeat;
                background-size: 50px;
                border: none;
            }
            .hidden {
                display: none;
            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text>[[deskripsiDepartemen]]</ukmp-text>
                            <button class="modal-button" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text>Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper">Anggota PRD</ukmp-text>
                            <button class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text>Lihat Selengkapnya</ukmp-text></button>
                        </div>    
                        <div class$="prchilpar {{travelAppSplashClass}}">
                            <image-component src="/../../images/prd/Ade yuliana_PRD.HEIC"></image-component>
                            <image-component src="/../../images/prd/Ema Kartika_PRD.JPG"></image-component>
                            <button class="button chil-button-prev" on-click="showHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClass}}"">
                            <image-component src="/../../images/prd/Indah Permata N_PRD.HEIC"></image-component>
                            <image-component src="/../../images/prd/Muhammad Fuad Hasyim_PRD.JPG"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                            <button class="button chil-button-prev" on-click="prevHome2">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClassRe}}"">
                            <image-component src="/../../images/prd/Rizki Nurfauziah_PRD.HEIC"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppClassRe: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            },
            namaDepartemen: {
                type: String,
                value: ''
            },
            deskripsiDepartemen: {
                type: String,
                value: ''
            },
            imageSrc: String,
        };
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.homeAppClassRe = "hidden";
    }

    prevHome() {
        this.homeAppClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClassRe = "hidden";
        this.travelAppSplashClass = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    prevHome2() {
        this.homeAppClassRe = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.prevHome();
        } else if (button1Clicked) {
            this.prevHome2();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
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
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define('ukmp-departement-prd', DepartementCardPRD)

class DepartementCardRED extends PolymerElement {
    static get template() {
        return html`
          <style>
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
                width: 85%;
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

            .headco {
                display: flex;
                align-items: center;
                gap: 5%;
            }

            .chilpar {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .prchilpar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .button-container{
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 20px;
            }

            .button-container h2 {
                margin: 0;
            }

            .button-container h2 {
                margin: 0;
                color: #666666;
            }

            .button-container .list-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .button-container .list-item image-component{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .modal-button {
                background-color: #0f0f0f;
                color: #fff;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
            }

            .modal-button-li {
                background-color: #fff;
                color: #0f0f0f;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0
            }
            
            .chil-button-prev {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0;
                width: 35px;
            }
            
            .chil-button-next {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                left: 0;
                width: 35px;
            }

            .text-wrapper {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            .centered-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
                background-image: url("/../../images/dd/DD.jpg");
                background-repeat: no-repeat;
                background-size: 50px;
                border: none;
            }
            .hidden {
                display: none;
            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text>[[deskripsiDepartemen]]</ukmp-text>
                            <button class="modal-button" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text>Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper">Anggota RED</ukmp-text>
                            <button class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text>Lihat Selengkapnya</ukmp-text></button>
                        </div>    
                        <div class$="prchilpar {{travelAppSplashClass}}">
                            <image-component src="/../../images/red/Dini Sukmawati_RED_Formal.png"></image-component>
                            <image-component src="/../../images/red/Dita Alinda Restiani_RED.JPG"></image-component>
                            <button class="button chil-button-prev" on-click="showHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClass}}"">
                            <image-component src="/../../images/red/Hidayatul Munadhiroh _RED.png"></image-component>
                            <image-component src="/../../images/red/Putri Dinda Muliana_RED.jpg"></image-component>
                            <image-component src="/../../images/red/Siti Khotimah_RED_Formal.jpg"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                            <button class="button chil-button-prev" on-click="prevHome2">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClassRe}}"">
                            <image-component src="/../../images/red/RED_Widya Indri Hapsari.JPG"></image-component>
                            <image-component src="/../../images/red/Riska Vitasari _RED.jpg"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppClassRe: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            },
            namaDepartemen: {
                type: String,
                value: ''
            },
            deskripsiDepartemen: {
                type: String,
                value: ''
            },
            imageSrc: String,
        };
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.homeAppClassRe = "hidden";
    }

    prevHome() {
        this.homeAppClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClassRe = "hidden";
        this.travelAppSplashClass = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    prevHome2() {
        this.homeAppClassRe = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.prevHome();
        } else if (button1Clicked) {
            this.prevHome2();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
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
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define('ukmp-departement-red', DepartementCardRED)

class DepartementCardSTD extends PolymerElement {
    static get template() {
        return html`
          <style>
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
                width: 85%;
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

            .headco {
                display: flex;
                align-items: center;
                gap: 5%;
            }

            .chilpar {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .prchilpar {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .button-container{
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 20px;
            }

            .button-container h2 {
                margin: 0;
            }

            .button-container h2 {
                margin: 0;
                color: #666666;
            }

            .button-container .list-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin: 0;
            }

            .button-container .list-item image-component{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .modal-button {
                background-color: #0f0f0f;
                color: #fff;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
            }

            .modal-button-li {
                background-color: #fff;
                color: #0f0f0f;
                padding: 10px 0px;
                border: none;
                border-radius: 100px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0
            }
            
            .chil-button-prev {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                right: 0;
                width: 35px;
            }
            
            .chil-button-next {
                background-color: black;
                color: #f0f0f0;
                padding: 5px;
                border: none;
                border-radius: 45px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-right: 10px;
                position: absolute;
                left: 0;
                width: 35px;
            }

            .text-wrapper {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            .centered-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: transparent;
                background-image: url("/../../images/dd/DD.jpg");
                background-repeat: no-repeat;
                background-size: 50px;
                border: none;
            }
            .hidden {
                display: none;
            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text>[[deskripsiDepartemen]]</ukmp-text>
                            <button class="modal-button" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text>Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper">Anggota STD</ukmp-text>
                            <button class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text>Lihat Selengkapnya</ukmp-text></button>
                        </div>    
                        <div class$="prchilpar {{travelAppSplashClass}}">
                            <image-component src="/../../images/std/DWI CAHAYANING A_ STD..JPG"></image-component>
                            <image-component src="/../../images/std/FATIMATUZZAHRO_STD.JPG"></image-component>
                            <button class="button chil-button-prev" on-click="showHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClass}}"">
                            <image-component src="/../../images/std/HANINA HUMAIRA_STD.JPG"></image-component>
                            <image-component src="/../../images/std/Rismanda Asyifatul A_STD.jpg"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                            <button class="button chil-button-prev" on-click="prevHome2">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                        <div class$="prchilpar {{homeAppClassRe}}"">
                            <image-component src="/../../images/std/Wafda Nailal Izza_STD.png"></image-component>
                            <button class="button chil-button-next" on-click="prevHome">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            homeAppClass: {
                type: String,
                value: "hidden"
            },
            homeAppClassRe: {
                type: String,
                value: "hidden"
            },
            travelAppSplashClass: {
                type: String,
                value: ""
            },
            namaDepartemen: {
                type: String,
                value: ''
            },
            deskripsiDepartemen: {
                type: String,
                value: ''
            },
            imageSrc: String,
        };
    }

    showHome() {
        this.homeAppClass = ""; // Menghapus kelas "hidden" pada homeAppClass
        this.travelAppSplashClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.homeAppClassRe = "hidden";
    }

    prevHome() {
        this.homeAppClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClassRe = "hidden";
        this.travelAppSplashClass = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    prevHome2() {
        this.homeAppClassRe = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.travelAppSplashClass = "hidden"; // Menghapus kelas "hidden" pada homeAppClass
        this.homeAppClass = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.addEventListener("button-clicked", this.handleButtonClick);
        // Periksa apakah pengguna sudah mengklik Button 1 sebelumnya
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.prevHome();
        } else if (button1Clicked) {
            this.prevHome2();
        } else {
            // Jika pengguna belum mengklik Button 1 sebelumnya,
            // tampilkan travel-app-splash dan sembunyikan home-app
            this.showTravelAppSplash();
        }
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
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define('ukmp-departement-std', DepartementCardSTD)

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

        <iframe width="100%" height="100%" frameborder="0" src="[[imageSrc]]"></iframe>
    `;
    }
    static get properties() {
        return {
            imageSrc: String,
        };
    }
}

customElements.define('ukmp-map', Polymap);

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
                    <image-component src="/../../images/day1/IMG_0052.JPG" alt="Gambar 1"></image-component>
                </div>
                <div class="text">
                    <h1><ukmp-text>Day 1</ukmp-text></h1>
                    <p><ukmp-text>Upgrading 2023</ukmp-text></p>
                </div>
            </div>
        </div>
        <div class="carousel-item">            
            <div class="content">
                <div class="image">
                    <image-component src="/../../images/day2/IMG_0217.JPG" alt="Gambar 1"></image-component>
                </div>
                <div class="text">
                    <h1><ukmp-text>Day 2</ukmp-text></h1>
                    <p><ukmp-text>Upgrading 2023</ukmp-text></p>
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