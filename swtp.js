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
                display: flex;
                flex-direction: row;
                justify-content: center;
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
            
            .TRAVEL-APP-SPLASH .TRAVEL-APP-SPLASH-wrapper {
                background-color: #ffffff;
                border: 1px none;
                height: 892px;
                overflow: hidden;
                width: 414px;
                position: absolute;
                top: 0;
            }
            
            .TRAVEL-APP-SPLASH .overlap-group-wrapper {
                height: 895px;
                /* left: 0; */
                position: relative;
                /* bottom: 0; */
                width: 822px;
            }
            
            .TRAVEL-APP-SPLASH .overlap-group {
                height: 884px;
                /* left: 233px; */
                position: absolute;
                width: 414px;
                bottom: 0;
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
            .logo-window {
                position: absolute;
                display: flex;
                align-items:center;
                justify-content: center;
                top: 0;
                left: 50%;
                transform: translate(-50%, -90%);
            }

            .logo-arunika {
                width: 45%;
                left: 40%;
            }

            .logo-ukmp {
                width: 60%;
                left: 25%;
            }
            @media (prefers-color-scheme: dark) {
                .TRAVEL-APP-SPLASH .TRAVEL-APP-SPLASH-wrapper {
                    background-color: black;
                }
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
                                <div class="logo-window">
                                    <img class="logo-ukmp" src="/../../images/ukmp-logo-144x144.png" alt="Logo UKMP"/>
                                    <img class="logo-arunika" src="/../../images/arunika.png"alt="Logo Arunika"/>
                                </div>
                                <ukmp-text class="text-wrapper" text="Story Kegiatan UKMP">Story Kegiatan UKMP</ukmp-text>
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
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').setAttribute('dark-theme', '');
            document.body.style.backgroundColor = '#0d111';
            document.body.style.color = '#f4f4f4';

            // Ubah src image-component cloud menjadi path gambar tema gelap
            const cloudImageComponent = this.shadowRoot.querySelector('.cloud');
            if (cloudImageComponent) {
                cloudImageComponent.setAttribute('src', '/../../images/cloud.black.svg');
            }

            // Ubah src image-component air-plane menjadi path gambar tema gelap
            const airPlaneImageComponent = this.shadowRoot.querySelector('.air-plane');
            if (airPlaneImageComponent) {
                airPlaneImageComponent.setAttribute('src', '/../../images/AirPlane.black.svg');
            }
        }
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
  
          :host([show-sinematik]) #image {
            box-shadow: var(--image-shadow);
          }
  
        </style>
  
        <img id="image" src="[[src]]" alt="[[alt]]">
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
            },
            showSinematik: {
                type: Boolean,
                value: false,
                observer: '_showSinematikChanged'
            }
        };
    }

    _srcChanged(src) {
        if (src) {
            const imgElement = this.shadowRoot.querySelector('#image');

            const image = new Image();
            image.src = src;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);

                const imageData = context.getImageData(0, 0, image.width, image.height).data;
                const numPixels = image.width * image.height;
                let totalR = 0;
                let totalG = 0;
                let totalB = 0;

                for (let i = 0; i < numPixels * 4; i += 4) {
                    totalR += imageData[i];
                    totalG += imageData[i + 1];
                    totalB += imageData[i + 2];
                }

                const avgR = Math.round(totalR / numPixels);
                const avgG = Math.round(totalG / numPixels);
                const avgB = Math.round(totalB / numPixels);

                const avgColor = `rgb(${avgR}, ${avgG}, ${avgB})`;
                const boxShadowValue = `0 0 200px ${avgColor}`;

                imgElement.style.setProperty('--image-shadow', boxShadowValue);
                imgElement.style.setProperty('--image-glow-color', `${avgColor}77`);
            };
        }
    }

    _showSinematikChanged(showSinematik) {
        if (showSinematik) {
            this.setAttribute('show-sinematik', '');
        } else {
            this.removeAttribute('show-sinematik');
        }
    }
}

customElements.define('image-component', ImageComponent);


class UkmpText extends HTMLElement {
    static get observedAttributes() {
        return ['text', 'href', 'link-text'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').setAttribute('dark-theme', '');
            document.body.style.backgroundColor = '#0d111';
            document.body.style.color = '#f4f4f4';
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const text = this.getAttribute('text');
        const href = this.getAttribute('href');
        const linkText = this.getAttribute('link-text');

        this.shadowRoot.innerHTML = `
        <style>
          .ukmp-text {
            font-size: 16px;
            line-height: 1.5;
          }
          @media (prefers-color-scheme: dark) {
            a {
                color: #f4f4f4 !important
            }
            .ukmp-text {
                color: #f4f4f4 !important;
            }
        </style>
        <span class="ukmp-text">${text}</span>
      `;

        if (href && linkText) {
            const link = document.createElement('a');
            link.href = href;
            link.style.color = 'black';
            link.style.textDecoration = 'none';
            link.ariaLabel = 'Selengkapnya';
            link.textContent = linkText;

            this.shadowRoot.appendChild(link);
        }
    }
}

customElements.define('ukmp-text', UkmpText);


class HomeApp extends PolymerElement {
    static get template() {
        return html`
            <style>
                #notif {
                    display: block;
                    position: absolute;
                    top: 7%;
                    z-index: 1;
                    background: white;
                    border-radius: 100px;
                    width: 65px;
                    right: 37.5%;
                    transform: translate(-50%, 0);
                }

                #stma {
                    display: block;
                    position: absolute;
                    top: 7%;
                    z-index: 1;
                    background: white;
                    border-radius: 100px;
                    width: 65px;
                    left: 41%;
                    transform: translate(-50%, 0);
                }

                ukmp-text.text-wrapper-justity {
                    text-align: justify;
                }
                
                #app {
                    display: block;
                    position: absolute;
                    top: 7%;
                    z-index: 1;
                    background: white;
                    border-radius: 100px;
                    width: 65px;
                    right: 41%;
                    transform: translate(-50%, 0);
                }
                .modal {
                    display: none;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 24.5%;
                    height: 100%;
                    z-index: 999;
                    transform: translate(-50%,-50%);
                }

                .modal-story {
                    display: none;
                    position: absolute;
                    bottom: 0px;
                    width: 620px;
                    height: 100%;
                    z-index: 999;
                }

                .slide-in {
                    animation-name: slideIn;
                    animation-duration: 0.5s;
                    animation-timing-function: ease-in-out;
                }

                .slide-out {
                    animation-name: slideOut;
                    animation-duration: 0.5s;
                    animation-timing-function: ease-in-out;
                }
                
                @keyframes slideIn {
                    from {
                        right: -620px; /* Mulai dari posisi di luar tampilan */
                    }
                    to {
                        right: 10px; /* Posisi akhir yang diinginkan */
                    }
                }

                @keyframes slideOut {
                    from {
                        right: 10px; /* Mulai dari posisi di luar tampilan */
                    }
                    to {
                        right: -620px; /* Posisi akhir yang diinginkan */
                    }
                }
                                
                .modal-content {
                    position: absolute;
                    bottom: 55px;
                    left: 50%;
                    transform: translate(-50%);
                    background-color: #fff;
                    padding: 10px;
                    width: 75%;
                    border-radius: 20px;
                }

                .modal-content-story {
                    position: absolute;
                    bottom: 55px;
                    right: 0px;
                    background-color: #fff;
                    padding: 10px;
                    width: 600px;
                    height: 88%;
                    border-radius: 20px;
                }

                .modal-content-heading {
                    display: flex;
                    align-items: center;
                    gap: 5%;
                    position: relative;
                    top: 1%
                }
    

                .modal-content-map {
                    position: absolute;
                    bottom: 55px;
                    left: 50%;
                    transform: translate(-50%);
                    background-color: #fff;
                    padding: 10px;
                    width: 84%;
                    height: 50%;
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

                .close-button-story {
                    position: absolute;
                    right: 0px;
                    width: max-content;
                    height: max-content;
                    border: none;
                    background-color: transparent;
                    color: #999999;
                    cursor: pointer;
                    font-size: 32px;
                    z-index: 1;
                }
                
                .close-button-story:hover {
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
                    width: 60px;
                    height: 60px;
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
                    bottom: 55px;
                    width: 21.5%;
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
                    position: absolute;
                    right: 0;
                }
                .share-button button {
                    background-color: #2B2B2B;
                    color: #F5F5F5;
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
                .logo-window {
                    position: absolute;
                    display: flex;
                    align-items:center;
                    justify-content: center;
                    top: 0;
                    left: 0;
                }
                .logo-arunika {
                    width: 13%;
                    left: 40%;
                    transform: translateX(-50%); /* Menambahkan jarak dari kanan menggunakan nilai piksel */
                }
                .logo-ukmp {
                    width: 20%;
                    left: 25%;
                    transform: translateX(-65%); /* Menambahkan jarak dari kanan menggunakan nilai piksel */
                }
                .text-wrapper {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .story-button-prev-start {
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
                    bottom: 5%
                }
                .story-button-prev-secound {
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
                    top: 13%
                }
                .story-button-prev-start-ukmp {
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
                    left: 60%;
                    width: 35px;
                    bottom: 50%
                }

                .story-button-prev-secound-ukmp {
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
                    right: 60%;
                    width: 35px;
                    bottom: 50%
                }
                @media (prefers-color-scheme: dark) {
                    .modal-content-story {
                        background: #161b22;
                        color: #f4f4f4;
                      }
                    }
                    ukmp-text {
                        color: #f4f4f4;
                    }
                    .profile-section {
                        background: #161b22;
                        color: #f4f4f4;
                    }
                    .text-wrapper-justify {
                        color: #f4f4f4;
                    }

                    .text-wrapper {
                        color: #f4f4f4;
                    }

                    .modal-content {
                        background: #161b22;
                        color: #f4f4f4;
                    }

                    .list-grid {
                        color: #f4f4f4;
                    }
                    .centered-button {
                        background-color: #161b22;
                    }
                    .share-button button {
                        background-color: #F5F5F5;
                        color: #2B2B2B;
                    }
                }                    
            </style>
            
            <div id="notif">
                <button class="centered-button"on-click="openNotif" aria-labelledby="notifikasi" title="notifikasi">
                    <image-component class="notification" alt="Notification" src="/../../images/notification.png" /></image-component>
                </button>
            </div>
            <div id="app">
                <button class="centered-button"on-click="openModal" aria-labelledby="Aplikasi" title="Aplikasi">
                    <svg width="24" height="24" class="all-app-dark" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 17a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zM5 17a2 2 0 110 4 2 2 0 010-4zm7-7a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zM5 10a2 2 0 110 4 2 2 0 010-4zm7-7a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zM5 3a2 2 0 110 4 2 2 0 010-4z">
                        </path>
                    </svg>
                    <svg width="24" height="24" class="all-app-light" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zM5 17a2 2 0 110 4 2 2 0 010-4zm7-7a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zM5 10a2 2 0 110 4 2 2 0 010-4zm7-7a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zM5 3a2 2 0 110 4 2 2 0 010-4z" fill="#FFFFFF"></path>
                    </svg>
                </button>
            </div>
            <div class="logo-window">
                <image-component class="logo-ukmp" src="/../../images/ukmp-logo-144x144.png" alt="Logo UKMP"></image-component>
                <image-component class="logo-arunika" src="/../../images/arunika.png" alt="Logo Arunika"/></image-component>
            </div>
            <div id="moni" class="modal" on-touchstart="handleTouchStartMon" on-touchmove="handleTouchMoveMon" on-touchend="handleTouchEndMon">
                <div class="modal-content">
                    <button class="close-button" on-click="closeModal">&#215;</button>
                    <div class="button-container">
                    <ukmp-text class="text-wrapper" text="Notifikasi Story">Notifikasi Story</ukmp-text>
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
                    <ukmp-text class="text-wrapper" text="Map UKMP Upgrading">Map UKMP Upgrading</ukmp-text>
                        <div class="list-item">
                            <ukmp-map image-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.183750611734!2d110.3596553!3d-7.219870500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70876971740d6f%3A0xa55e620abe424a5f!2sVilla%2015!5e0!3m2!1sen!2sid!4v1688283130392!5m2!1sen!2sid"></ukmp-map>
                        </div>
                    </div>
                </div>
            </div>
            <div id="story" class="modal-story" on-touchstart="handleTouchStartMap" on-touchmove="handleTouchMoveMap" on-touchend="handleTouchEndMap">
                <div class="modal-content-story">
                    <div class="modal-content-heading">
                        <button class="close-button-story" on-click="closeStory">&#215;</button>
                        <ukmp-text class="text-wrapper" text="Story UKMP">Story UKMP</ukmp-text>
                    </div>                        
                    <ukmp-content>
                        <div class$="{{storyStartApp}}">
                            <!-- Tambahkan konten utama pada elemen "ukmp-content" -->
                            <div slot="kartu-harbar">
                                <kartu-harbar></kartu-harbar>
                            </div>
                            <div slot="kartu-pab">
                                <kartu-pab></kartu-pab>
                            </div>
                            <div slot="kartu-da">
                                <kartu-da></kartu-da>
                            </div>
                            <!-- Tambahkan konten utama pada elemen "ukmp-content" -->
                            <button class="button story-button-prev-start" on-click="startStory">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff">
                                    <path d="M7,10l5,5l5-5H7z"></path>
                                    <path fill="none" d="M0,0h24v24H0V0z"></path>
                                </svg>                      
                            </button>
                        </div>
                        <div class$="{{storySecoundApp}}">
                            <button class="button story-button-prev-secound" on-click="secoundStory">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff">
                                    <path d="M7,14l5-5l5,5H7z"></path>
                                    <path fill="none" d="M0,0h24v24H0V0z"></path>
                                </svg>
                            </button>                      
                            <!-- Tambahkan konten utama pada elemen "ukmp-content" -->
                            <div slot="kartu-upgrading">
                                <kartu-upgrading></kartu-upgrading>
                            </div>
                            <div slot="kartu-hutf">
                                <kartu-hutf></kartu-hutf>
                            </div>
                            <div slot="kartu-prestasi">
                                <kartu-prestasi></kartu-prestasi>
                            </div>
                            <!-- Tambahkan konten utama pada elemen "ukmp-content" -->
                            <button class="button story-button-prev-start" on-click="startStory">
                                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff">
                                    <path d="M7,10l5,5l5-5H7z"></path>
                                    <path fill="none" d="M0,0h24v24H0V0z"></path>
                                </svg>                      
                            </button>
                        </div>
                    </ukmp-content>
                </div>        
            </div>
            <div id="DesUp" class="modal" on-touchstart="handleTouchStartDesUp" on-touchmove="handleTouchMoveDesUp" on-touchend="handleTouchEndDesUp">
                <div class="modal-content">
                    <button class="close-button" on-click="closeModal">&#215;</button>
                    <div class="button-container">
                        <ukmp-text class="text-wrapper" text="Deskripsi">Deskripsi</ukmp-text>
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
                            <ukmp-text class="text-wrapper-justity" text="Kegiatan Upgrading adalah kegiatana peningkatan mutu, pengetahuan dan ilmu berorganisasi dalam suatu organisasi">Kegiatan Upgrading adalah kegiatana peningkatan mutu, pengetahuan dan ilmu berorganisasi dalam suatu organisasi</ukmp-text>
                            <span>
                                <br>
                            </span>
                            <ukmp-text class="text-wrapper-justity" text="Tema Kegiatan Upgrading ini yaitu Melangkah Dalam Kolaborasi Untuk Meningkatkan Harmonisasi Fungsionaris UKM Penelitian UNNES">Tema Kegiatan Upgrading ini yaitu Melangkah Dalam Kolaborasi Untuk Meningkatkan Harmonisasi Fungsionaris UKM Penelitian UNNES</ukmp-text>
                        </div>
                        <ukmp-text class="text-wrapper" text="Day 1 sharing session">Day 1 sharing session</ukmp-text>
                        <image-component src="/../../images/day1/IMG_0052.JPG" alt="Gambar 1"></image-component>
                        <ukmp-text class="text-wrapper" text="Day 2 senam bersama">Day 2 senam bersama</ukmp-text>
                        <image-component src="/../../images/day2/IMG_0217.JPG" alt="Gambar 1"></image-component>
                    </div>
                </div>
            </div>
            <div id="modal" class="modal" on-touchstart="handleTouchStartMod" on-touchmove="handleTouchMoveMod" on-touchend="handleTouchEndMod">
                <div class="modal-content">
                    <button class="close-button" on-click="closeModal">&#215;</button>
                    <div class="button-container">
                    <ukmp-text class="text-wrapper" text="Aplikasi UKMP">Aplikasi UKMP</ukmp-text>
                        <div class="list-item">
                            <div class="grid">
                                <ukmp-grid class="list-grid">
                                    <div class="img-op" data-link="https://ukmpapps.web.app/download" on-click="navigateToLink" >
                                        <button class="centered-button" data-link="https://ukmpapps.web.app/download" on-click="navigateToLink" aria-labelledby="Download" title="Download">
                                            <image-component src="https://ukmpapps.web.app/apps/1.png" alt=""></image-component>
                                        </button>
                                    </div>
                                    Download
                                </ukmp-grid>
                                <ukmp-grid class="list-grid">
                                    <div class="img-op" data-link="https://ukmpapps.web.app/apps/story" on-click="navigateToLink" aria-labelledby="Story" title="Story">
                                        <button class="centered-button"on-click="openStory">
                                            <image-component src="https://ukmpapps.web.app/apps/2.png" alt=""></image-component>
                                        </button>
                                    </div>
                                    UKMP Story
                                </ukmp-grid>
                                </ukmp-grid>
                                <ukmp-grid class="list-grid">
                                    <div class="img-op" data-link="https://ukmpapps.web.app/medsos" on-click="navigateToLink" aria-labelledby="Media Sosial" title="Media Sosial">
                                        <button class="centered-button" data-link="https://ukmpapps.web.app/medsos" on-click="navigateToLink" >
                                            <image-component src="https://ukmpapps.web.app/apps/3.png" alt=""></image-component>
                                        </button>
                                    </div>
                                    Media Sosial
                                </ukmp-grid>
                                <ukmp-grid class="list-grid">
                                    <div class="img-op" data-link="https://ukmpapps.web.app/apps/karya/SecureJourney" on-click="navigateToLink" aria-labelledby="Aplikasi" title="Aplikasi">
                                        <button class="centered-button" data-link="https://ukmpapps.web.app/SecureJourney" on-click="navigateToLink" >
                                            <image-component src="https://ukmpapps.web.app/apps/4.png" alt=""></image-component>
                                        </button>
                                    </div>
                                    Karya UKMP
                                </ukmp-grid>
                                <ukmp-grid class="list-grid">
                                    <div class="img-op" data-link="https://ukmpapps.web.app/berita" on-click="navigateToLink" aria-labelledby="Berita" title="Berita">
                                        <button class="centered-button" data-link="https://ukmpapps.web.app/berita" on-click="navigateToLink" >
                                            <image-component src="https://ukmpapps.web.app/apps/5.png" alt=""></image-component>
                                        </button>
                                    </div>
                                    Berita
                                </ukmp-grid>
                                <ukmp-grid class="list-grid">
                                    <div class="img-op" data-link="https://ukmpapps.web.app/prestasi" on-click="navigateToLink" aria-labelledby="Prestasi" title="Prestasi">
                                        <button class="centered-button" data-link="https://ukmpapps.web.app/prestasi" on-click="navigateToLink" >
                                            <image-component src="https://ukmpapps.web.app/apps/6.png" alt=""></image-component>
                                        </button>
                                    </div>
                                    Prestasi
                                </ukmp-grid>
                                <ukmp-grid class="list-grid">
                                    <div class="img-op" data-link="https://ukmpapps.web.app/departement" on-click="navigateToLink" aria-labelledby="Profile Departement" title="Profile Departement">
                                        <button class="centered-button" data-link="https://ukmpapps.web.app/departement" on-click="navigateToLink" >
                                            <image-component src="https://ukmpapps.web.app/apps/7.png" alt=""></image-component>
                                        </button>
                                    </div>
                                    Departement
                                </ukmp-grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ukmp-card class$="{{cardAppClass}}"></ukmp-card>
            <div class$="{{storyUKMPStartApp}} image-component" id="image1">
                <div id="stma">
                    <button class="centered-button" on-click="openMap" aria-labelledby="Map" title="Map">
                        <image-component class="marker" alt="marker" src="/../../images/maps-and-flags.png" /></image-component>
                    </button>
                </div>
                <button class="button story-button-prev-start-ukmp" on-click="nextStory" aria-labelledby="Next Story" title="Next Story">
                    <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                </button>
                <div class="profile-section">
                    <div class="profile-info">
                        <ukmp-departement-hrd nama-departemen="Departemen HRD" text="Departemen HRD" deskripsi-departemen="Human Resources Departement" text="Human Resources Departement" image-src="/../../images/HRD.jpg"></ukmp-departement-hrd>
                        <div class="profile-details">
                            <h3>HRD Departement</h3>
                            <button class="desp centered-button"on-click="openDesUp">
                                <ukmp-text class="text-wrapper-justify" text="Kegiatan peningkatan mutu,...">Kegiatan peningkatan mutu,...</ukmp-text>
                            </button>
                        </div>
                        <div class="share-button">
                            <button on-click="shareLink" aria-labelledby="Share" title="Share">Bagikan Laman</button>
                        </div>
                    </div>
                </div>
                <image-component src="/../../images/upgrading.png" alt="Gambar 1" show-sinematik></image-component>
            </div>
            <div class$="{{storyUKMPSecoundApp}} image-component" id="image2">
                <deskripsi-story chip-1="Story DD" chip-2="Figma" nama-departement="DD" text="Departement DD"></deskripsi-story>
                <button class="button story-button-prev-secound-ukmp" on-click="prevStory" title="Selanjutnya" aria-labelledby="Selanjutnya">
                    <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
                </button>
                <div class="profile-section">
                    <div class="profile-info">
                        <ukmp-departement-dd nama-departemen="Departemen DD" text="Departemen DD" text="Digital Departement" deskripsi-departemen="Digital Departement" image-src="/../../images/dd/DD.jpg"></ukmp-departement-dd>
                        <div class="profile-details">
                            <h3>DD Departement</h3>
                            <button class="desp centered-button"on-click="openDesUp">
                                <ukmp-text class="text-wrapper-justify" text="Kegiatan peningkatan ski,...">Kegiatan peningkatan ski,...</ukmp-text>
                            </button>
                        </div>
                        <div class="share-button">
                            <button on-click="shareLink">Bagikan Laman</button>
                        </div>
                    </div>
                </div>
                <image-component src="/../../images/progja/248746829.png" alt="Gambar 2" show-sinematik></image-component>
            </div>
        `;
    }

    static get properties() {
        return {
            cardAppClass: {
                type: String,
                value: "hidden"
            },
            storyStartApp: {
                type: String,
                value: ""
            },
            storySecoundApp: {
                type: String,
                value: "hidden"
            },
            storyUKMPStartApp: {
                type: String,
                value: ""
            },
            storyUKMPSecoundApp: {
                type: String,
                value: "hidden"
            }
        };
    }

    nextStory() {
        this.storyUKMPStartApp = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.storyUKMPSecoundApp = "";
    }

    prevStory() {
        this.storyUKMPSecoundApp = "hidden";
        this.storyUKMPStartApp = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    startStory() {
        this.storyStartApp = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.storySecoundApp = "";
    }

    secoundStory() {
        this.storySecoundApp = "hidden";
        this.storyStartApp = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
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
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').setAttribute('dark-theme', '');
            document.body.style.backgroundColor = '#0d111';
            document.body.style.color = '#f4f4f4';

            const markerComponent = this.shadowRoot.querySelector('.marker');
            if (markerComponent) {
                markerComponent.setAttribute('src', '/../../images/maps-and-flags-dark.png');
            }

            const notificationImageComponent = this.shadowRoot.querySelector('.notification');
            if (notificationImageComponent) {
                notificationImageComponent.setAttribute('src', '/../../images/notification.svg');
            }

            // Hapus elemen SVG yang tidak diperlukan saat tema gelap
            const allAppElement = this.shadowRoot.querySelector('.all-app-dark');
            if (allAppElement) {
                allAppElement.parentNode.removeChild(allAppElement);
            }
        } else {
            // Hapus elemen SVG yang tidak diperlukan saat tema terang
            const allAppElement = this.shadowRoot.querySelector('.all-app-light');
            if (allAppElement) {
                allAppElement.parentNode.removeChild(allAppElement);
            }
        }
        const button1Clicked = localStorage.getItem('button1Clicked');
        const buttonUKMPClicked = localStorage.getItem('buttonPKMClicked')

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.secoundStory();
        }

        if (buttonUKMPClicked) {
            this.nextStory();
        } else if (buttonUKMPClicked) {
            this.prevStory();
        }
        this.modal = this.shadowRoot.getElementById("modal");
        this.moni = this.shadowRoot.getElementById("moni");
        this.DesUp = this.shadowRoot.getElementById("DesUp");
        this.map = this.shadowRoot.getElementById("map");
        this.story = this.shadowRoot.getElementById("story");
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

    openStory() {
        this.story = this.shadowRoot.getElementById("story");
        this.storyStartPosition = 0;
        // Mengatur posisi awal elemen sebelum animasi dimulai

        // Memulai animasi dengan menambahkan kelas CSS
        this.story.classList.add("slide-in");

        // Mengatur listener untuk menghapus kelas CSS setelah animasi selesai
        this.story.addEventListener("animationend", () => {
            this.story.classList.remove("slide-in");
            this.story.style.display = "block";
        });
        this.story.style.display = "block";
        this.story.style.right = "0";
        this.story.addEventListener("touchstart", this.handleTouchStartMap.bind(this));
        this.story.addEventListener("touchmove", this.handleTouchMoveMap.bind(this));
        this.story.addEventListener("touchend", this.handleTouchEndMap.bind(this));
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

    closeStory() {
        this.story.classList.add("slide-out");
        // Mengatur listener untuk menghapus kelas CSS setelah animasi selesai
        this.story.addEventListener("animationend", () => {
            this.story.classList.remove("slide-out");
            this.story.style.display = "none";
        });
    }

    handleButtonClick(e) {
        const button = e.target;
        console.log("Button clicked:", button.textContent);
    }
}

customElements.define("home-app", HomeApp);

class DeksripsiStory extends PolymerElement {
    static get template() {
        return html`
          <style>
            .modal {
                display: none;
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 100%;
                height: max-content;
                z-index: 999;
                transform: translate(-50%);
            }
            
            .modal-content {
                position: absolute;
                bottom: 0px;
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
                z-index: 1;
            }
            
            .close-button:hover {
                color: #555555;
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
            @media (prefers-color-scheme: dark) {
                .modal-content {
                    background: #161b22;
                    color: #f4f4f4;
                }
                .modal-button-li {
                    background-color: #161b22;
                    color: #0f0f0f;
                }

            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper" text="[[namaDepartemen]]">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="list-item">
                        <div class="site-header">
                            <div class="chips-nav">
                                <button aria-labelledby="mundur" aria-label="mundur" title="mundur" class="chips-nav__prev"><i
                                        class="fas fa-chevron-left"></i></button>
                                <button aria-labelledby="maju" aria-label="maju" title="maju" class="chips-nav__next"><i
                                        class="fas fa-chevron-right"></i></button>
                            </div>
                            <div class="chips-wrapper">
                                ${this.generateChips()} <!-- Generate chips based on attributes -->
                            </div>
                        </div>
                        <span>
                            <br>
                        </span>
                        <span>
                            <br>
                        </span>
                        <ukmp-text class="text-wrapper-justity" text="Kegiatan Upgrading adalah kegiatana peningkatan mutu, pengetahuan dan ilmu berorganisasi dalam suatu organisasi">Kegiatan Upgrading adalah kegiatana peningkatan mutu, pengetahuan dan ilmu berorganisasi dalam suatu organisasi</ukmp-text>
                        <span>
                            <br>
                        </span>
                        <ukmp-text class="text-wrapper-justity" text="Tema Kegiatan Upgrading ini yaitu Melangkah Dalam Kolaborasi Untuk Meningkatkan Harmonisasi Fungsionaris UKM Penelitian UNNES">Tema Kegiatan Upgrading ini yaitu Melangkah Dalam Kolaborasi Untuk Meningkatkan Harmonisasi Fungsionaris UKM Penelitian UNNES</ukmp-text>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper" text="Anggota HRD">Anggota HRD</ukmp-text>
                            <button class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text text="Lihat Selengkapnya">Lihat Selengkapnya</ukmp-text></button>
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

    static generateChips() {
        let chipsHTML = '';
        let i = 1;
        let chipAttribute = `chip-${i}`;

        while (this.hasAttribute(chipAttribute)) {
            const chipValue = this.getAttribute(chipAttribute);
            chipsHTML += `<div class="chip">${chipValue}</div>`;

            i++;
            chipAttribute = `chip-${i}`;
        }

        return chipsHTML;
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
                value: '',
                reflectToAttribute: true,  // added for attribute-property binding
                observer: '_namaDepartemenChanged'  // added observer
            },
            deskripsiDepartemen: {
                type: String,
                value: '',
                reflectToAttribute: true,  // added for attribute-property binding
                observer: '_deskripsiDepartemenChanged'  // added observer
            },
            imageSrc: String,
        };
    }

    // observer function for namaDepartemen property
    _namaDepartemenChanged(newVal) {
        // code to handle the updated value of namaDepartemen
        const ukmpTextElement = this.shadowRoot.querySelector('ukmp-text');
        if (ukmpTextElement) {
            ukmpTextElement.setAttribute('text', newVal);
        }
    }

    _deskripsiDepartemenChanged(hallo) {
        // code to handle the updated value of namaDepartemen
        const Hal = this.shadowRoot.querySelector('ukmp-text #deskripsi');
        if (Hal) {
            Hal.setAttribute('text', hallo);
        }
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
        this.namaDepartemen = this.getAttribute("nama-departemen");
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').setAttribute('dark-theme', '');
            document.body.style.backgroundColor = '#0d111';
            document.body.style.color = '#f4f4f4';
        }
        this.deksripsiDepartemen = this.getAttribute("deskripsi-departemen");
        this._namaDepartemenChanged(this.namaDepartemen);  // initial call to the observer function
        this._deskripsiDepartemenChanged(this.deksripsiDepartemen);  // initial call to the observer function
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
customElements.define("deskripsi-story", DeksripsiStory);

class UkmpContent extends PolymerElement {
    static get template() {
        return html`
    <style>
      :host {
        display: block;
        box-sizing: border-box;
      }
      #container {
        overflow-y: auto;
      }
      @media only screen and (max-width: 600px) {
        :host {
          display: flex;
          flex-direction: column;
        }
        #container {
          padding: 8px;
          margin-bottom: 16px;
        }
      }
      @media only screen and (max-width: 400px) {
        #container {
          max-width: 100%;
        }
        ::slotted(*) {
          font-size: 16px;
        }
      }
    </style>
    <div id="container">
      <slot name="kartu-harbar"></slot>
      <slot name="kartu-upgrading"></slot>
      <slot name="kartu-pab"></slot>
      <slot name="kartu-hutf"></slot>
      <slot name="kartu-da"></slot>
      <slot name="kartu-prestasi"></slot>
      <slot></slot>
    </div>
  `;
    }
}
customElements.define("ukmp-content", UkmpContent);

class UKMPKartu extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
        .card {
          background: #ffffff;
          color: #000000;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2),
               0px 6px 10px rgba(0, 0, 0, 0.1);
        }
  
        @media (prefers-color-scheme: dark) {
          .card {
            background: #161b22;
            color: #f4f4f4;
          }
        }
  
        .card:hover {
          transform: translateY(-5px);
        }
  
        .card-header {
          font-size: 28px;
          font-weight: bold;
          margin-top: 0;
          margin-bottom: 10px;
        }
        .card-body {
          font-size: 16px;
          margin-top: 0;
        }
        .card-link {
          color: #BFBFBF;
          font-weight: bold;
          text-decoration: none;
        }
  
        .card-link:hover {
          animation: shake 0.5s;
        }
       
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
       
      </style>
      <div class="card">
        <h3 class="card-header">[[title]]</h3>
        <p class="card-body">[[description]]</p>
        <a href="[[url]]" class="card-link">Lihat Selengkapnya</a>
      </div>
    `
    }
    static get properties() {
        return {
            title: String,
            description: String,
            url: String
        }
    }
}
customElements.define("ukmp-kartu", UKMPKartu);

class UKMPKartuSos extends PolymerElement {
    constructor() {
        super();
        this.addEventListener("mouseenter", this.handleMouseEnter.bind(this));
        this.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
    }

    connectedCallback() {
        super.connectedCallback();
        this._addShadowBox();
    }

    handleMouseEnter() {
        const h3 = this.shadowRoot.querySelector(".card-header");
        const p = this.shadowRoot.querySelector(".card-body");
        const a = this.shadowRoot.querySelector(".card-link");
        h3.classList.add("show");
        p.classList.add("show");
        a.classList.add("show");
    }

    handleMouseLeave() {
        const h3 = this.shadowRoot.querySelector(".card-header");
        const p = this.shadowRoot.querySelector(".card-body");
        const a = this.shadowRoot.querySelector(".card-link");
        h3.classList.remove("show");
        p.classList.remove("show");
        a.classList.remove("show");
    }

    static get template() {
        return html`
        <style>
          :host {
            display: block;
            --card-height: 170px;
            --card-width: calc(var(--card-height) / 1.5);
            --card-header-color: #1A202C;
            --card-body-color: #1A202C;
            --card-link-color: #1A202C;
            --card-dark-background-color: #161b22;
            --card-dark-color: #f4f4f4;
            --card-header-color-black: #000000;
            --card-body-color-black: #000000;
            --card-link-color-black: #000000;
            --card-skeleton-color: #f4f4f4; /* Warna skeleton */
            --card-skeleton-color-alt: #e0e0e0; /* Warna skeleton alternatif */
          }
            
          .card {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            position: relative;
            width: var(--card-width);
            height: var(--card-height);
            background-color: var(--card-skeleton-color, #f4f4f4); /* Tambahkan background-color skeleton */
            box-shadow: var(--card-box-shadow, none);
            background-image: var(--card-background-image, url(""));
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            color: var(--card-color, #000000);
            border-radius: 10px;
            padding: 20px;
            animation: skeleton-animation 1.5s infinite linear; /* Tambahkan animasi skeleton */
          }
          
          @keyframes skeleton-animation {
            0% {
              background-color: var(--card-skeleton-color, #f4f4f4);
            }
            50% {
              background-color: var(--card-skeleton-color-alt, #e0e0e0); /* Tambahkan warna skeleton alternatif */
            }
            100% {
              background-color: var(--card-skeleton-color, #f4f4f4);
            }
          }
  
          .card:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: inherit;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            filter: blur(10px);
            z-index: -1;
          }
  
          @media (prefers-color-scheme: dark) {
            .card {
              --card-color: var(--card-dark-color, #f4f4f4);
              --card-background-color: var(--card-dark-background-color, #161b22);
              --card-background-image: var(--card-dark-background-image, url("") 0.1);
              box-shadow: var(--card-box-shadow, none);
            }
          }
  
          .card:hover {
            transform: translateY(-5px);
          }
          
          .card-header {
            font-size: 18px;
            font-weight: bold;
            margin-top: 0;
            margin-bottom: 10px;
            color: var(--card-header-color, #1A202C);
          }
          
          .card-body {
            font-size: 12px;
            margin-top: 0;
            color: var(--card-body-color, #1A202C);
          }
          
          .card-link {
            color: var(--card-link-color, #BFBFBF);
            font-weight: bold;
            text-decoration: none;
            color: var(--card-link-color, #1A202C);
            font-size: 13px;
          }
          
          .card-link:hover {
            animation: shake 0.5s;
          }
          
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }
        </style>
        <div class="card" style$="background-image: url([[backgroundImage]]);"> <!-- Hapus tanda kutip ganda ekstra di sini -->
          <h3 class="card-header" style$="color: [[colorH]];">[[title]]</h3>
          <p class="card-body" style$="color: [[colorP]];">[[description]]</p>
          <a href="[[url]]" class="card-link" style$="color: [[colorA]];">Lihat Selengkapnya</a>
        </div>
      `;
    }

    static get properties() {
        return {
            title: String,
            description: String,
            url: String,
            backgroundImage: {
                type: String,
                value: ""
            },
            colorH: {
                type: String,
                value: "default"
            },
            colorA: {
                type: String,
                value: "default"
            },
            colorP: {
                type: String,
                value: "default"
            }
        }
    }

    _addShadowBox() {
        const cardElement = this.shadowRoot.querySelector(".card");
        const imgElement = new Image();
        imgElement.src = this.backgroundImage;
        imgElement.addEventListener("load", () => {
            const canvas = document.createElement("canvas");
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
            const context = canvas.getContext("2d");
            context.drawImage(imgElement, 0, 0);

            const imageData = context.getImageData(0, 0, imgElement.width, imgElement.height).data;
            const numPixels = imgElement.width * imgElement.height;
            let totalR = 0;
            let totalG = 0;
            let totalB = 0;

            for (let i = 0; i < numPixels * 4; i += 4) {
                totalR += imageData[i];
                totalG += imageData[i + 1];
                totalB += imageData[i + 2];
            }

            const avgR = Math.round(totalR / numPixels);
            const avgG = Math.round(totalG / numPixels);
            const avgB = Math.round(totalB / numPixels);

            const avgColor = `rgb(${avgR}, ${avgG}, ${avgB})`;
            const boxShadowValue = `0 0 50px ${avgColor}`;

            cardElement.style.setProperty("--card-box-shadow", boxShadowValue);
            cardElement.style.removeProperty("background-color"); // Hapus background-color skeleton setelah gambar dimuat
        });
    }
}
customElements.define("ukmp-story", UKMPKartuSos);


class kartuMed extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
          display: block;
          margin: 20px;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(1, 1fr);
          grid-gap: 20px;
        }
        .hidden {
            display: none;
        }
        .story-button-prev-start {
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
            top: 25%;
        }
        .story-button-prev-secound {
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
            top: 25%;
            z-index: 1;
        }
      </style>
      <ukmp-header-card-story-harbar class="header"></ukmp-header-card-story-harbar>
      <div class$="{{storyStartApp}} card-grid">
        <ukmp-story title="2023" description="Hari Besar 2023" url="./hariraya" color-H="black" color-A="black" color-P="black" background-Image="../images/harbas/kurban.jpg" image-alt="Hari Raya"></ukmp-story>
        <ukmp-story title="2023" description="Hari Besar 2023" url="./hariraya" color-H="black" color-A="black" color-P="black" background-Image="../images/harbas/eid.jpg" image-alt="Hari Raya"></ukmp-story>
        <ukmp-story title="2023" description="Hari Besar 2023" url="./hariraya" color-H="black" color-A="black" color-P="black" background-Image="../images/harbas/nyepi.jpg" image-alt="Hari Raya"></ukmp-story>
        <button class="button story-button-prev-start" on-click="startStory">
            <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
        </button>
      </div>
      <div class$="{{storySecoundApp}} card-grid">
            <button class="button story-button-prev-secound" on-click="secoundStory">
                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
            </button>
            <ukmp-story title="2023" description="Hari Besar 2023" url="./hariraya" color-H="black" color-A="black" color-P="black" background-Image="../images/harbas/kartini.jpg" image-alt="Hari Raya"></ukmp-story>
            <ukmp-story title="2022" description="Hari Besar 2022" url="#" color-H="black" color-A="black" color-P="black" background-Image="../images/harbas/pennas.jpg"></ukmp-story>
            <ukmp-story title="2021" description="Hari Besar 2021" url="#" color-H="black" color-A="black" color-P="black" background-Image="../images/harbas/ukmp-haribesar-01.jpg" ></ukmp-story>
      </div>
    `;
    }
    static get properties() {
        return {
            storyStartApp: {
                type: String,
                value: ""
            },
            storySecoundApp: {
                type: String,
                value: "hidden"
            }
        };
    }

    startStory() {
        this.storyStartApp = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.storySecoundApp = "";
    }

    secoundStory() {
        this.storySecoundApp = "hidden";
        this.storyStartApp = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.secoundStory();
        }
        this.addEventListener("button-clicked", this.handleButtonClick);
    }
}
customElements.define("kartu-harbar", kartuMed);

class kartuPab extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
          display: block;
          margin: 20px;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(1, 1fr);
          grid-gap: 20px;
        }
      </style>
      <ukmp-header-card-story-pab class="header"></ukmp-header-card-story-pab>
      <div class="card-grid">
          <ukmp-story title="2022" description="PAB 2022" url="./pabukmp/2022" color-H="black" color-A="white" color-P="white" background-Image="../logo/312086426_5550639028376326_5765999735847858872_n.jpg" image-alt="Hari Raya"></ukmp-story>
          <ukmp-story title="2021" description="PAB 2021" url="./pabukmp/2021" color-H="white" color-A="black" color-P="white" background-Image="../logo/244521759_589536129145018_7560806369087012558_n.jpg"></ukmp-story>
          <ukmp-story title="2020" description="PAB 2019" url="#" color-H="white" color-A="white" color-P="white" background-Image="../logo/arunika.webp"></ukmp-story>
      </div>
    `
    }
}
customElements.define("kartu-pab", kartuPab);

class kartuda extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
          display: block;
          margin: 20px;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(1, 1fr);
          grid-gap: 20px;
        }
      </style>
      <ukmp-header-card-story-da class="header"></ukmp-header-card-story-da>
      <div class="card-grid">
          <ukmp-story title="2021" description="Daftar Alumni 2021" url="./daukmp/" color-H="black" color-A="black" color-P="black" background-Image="../logo/116223589_1017768482011615_7046452088022274670_n.jpg" image-alt="Hari Raya"></ukmp-story>
          <ukmp-story title="2020" description="Daftar Alumni 2020" url="./daukmp/" color-H="black" color-A="black" color-P="black" background-Image="../logo/116223589_1017768482011615_7046452088022274670_n.jpg"></ukmp-story>
          <ukmp-story title="2019" description="Daftar Alumni 2019" url="./daukmp/" color-H="black" color-A="black" color-P="black" background-Image="../logo/116223589_1017768482011615_7046452088022274670_n.jpg"></ukmp-story>
      </div>
    `
    }
}
customElements.define("kartu-da", kartuda);

class kartuUpgra extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
          display: block;
          margin: 20px;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(1, 1fr);
          grid-gap: 20px;
        }
      </style>
      <ukmp-header-card-story-upgrading class="header"></ukmp-header-card-story-upgrading>
      <div class="card-grid">
        <ukmp-story title="2023" description="Upgrading 2023" url="#" color-H="black" color-A="black" color-P="black" background-Image="/../../images/upgrading.png" image-alt="Upgrading"></ukmp-story>
      </div>
    `
    }
}
customElements.define("kartu-upgrading", kartuUpgra);

class kartuHutf extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
          display: block;
          margin: 20px;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(1, 1fr);
          grid-gap: 20px;
        }
      </style>
      <ukmp-header-card-story-hutf class="header"></ukmp-header-card-story-hutf>
      <div class="card-grid">
          <ukmp-story title="2022" description="PAB 2022" url="./pabukmp/2022" color-H="black" color-A="white" color-P="white" background-Image="../logo/312086426_5550639028376326_5765999735847858872_n.jpg" image-alt="Hari Raya"></ukmp-story>
          <ukmp-story title="2021" description="PAB 2021" url="./pabukmp/2021" color-H="white" color-A="black" color-P="white" background-Image="../logo/244521759_589536129145018_7560806369087012558_n.jpg"></ukmp-story>
          <ukmp-story title="2020" description="PAB 2019" url="#" color-H="white" color-A="white" color-P="white" background-Image="../logo/arunika.webp"></ukmp-story>
      </div>
    `
    }
}
customElements.define("kartu-hutf", kartuHutf);

class kartuPres extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
          display: block;
          margin: 20px;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(1, 1fr);
          grid-gap: 20px;
        }
        .hidden {
            display: none;
        }
        .story-button-prev-start {
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
            bottom: 15%;
        }
        .story-button-prev-secound {
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
            bottom: 15%;
            z-index: 1;
        }
      </style>
      <ukmp-header-card-story-prestasi class="header"></ukmp-header-card-story-prestasi>
      <div class$="{{storyStartApp}} card-grid">
        <ukmp-story title="2023" description="Lolos Perdanaan PKM" url="./hariraya" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/353822697_1290665238496493_6227867768103515191_n.jpeg" image-alt="Hari Raya"></ukmp-story>
        <ukmp-story title="2023" description="Lolos Perdanaan PKM" url="./hariraya" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/353861515_640079521512682_3370790497817475094_n.jpeg" image-alt="Hari Raya"></ukmp-story>
        <ukmp-story title="2023" description="Lolos Perdanaan PKM" url="./hariraya" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/353880985_1258843091438694_2786285672251724551_n.jpeg" image-alt="Hari Raya"></ukmp-story>
        <button class="button story-button-prev-start" on-click="startStory">
            <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
        </button>
      </div>
      <div class$="{{storySecoundApp}} card-grid">
            <button class="button story-button-prev-secound" on-click="secoundStory">
                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
            </button>
            <ukmp-story title="2023" description="Lolos Perdanaan PKM" url="./hariraya" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/354013433_626073636154699_356598338880584908_n.jpeg" image-alt="Hari Raya"></ukmp-story>
            <ukmp-story title="2023" description="Lolos Perdanaan PKM" url="#" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/354436069_6435225773224205_7802162265042735503_n.jpeg"></ukmp-story>
            <ukmp-story title="2023" description="Lolos Perdanaan PKM" url="#" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/354508328_802993194507779_8681963008183073113_n.jpeg" ></ukmp-story>
      </div>
    `;
    }
    static get properties() {
        return {
            storyStartApp: {
                type: String,
                value: ""
            },
            storySecoundApp: {
                type: String,
                value: "hidden"
            }
        };
    }

    startStory() {
        this.storyStartApp = "hidden"; // Menambahkan kelas "hidden" pada travelAppSplashClass
        this.storySecoundApp = "";
    }

    secoundStory() {
        this.storySecoundApp = "hidden";
        this.storyStartApp = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    connectedCallback() {
        super.connectedCallback();
        const button1Clicked = localStorage.getItem('button1Clicked');

        if (button1Clicked) {
            // Jika pengguna telah mengklik Button 1 sebelumnya,
            // langsung tampilkan halaman home-app dan sembunyikan travel-app-splash
            this.showHome();
        } else if (button1Clicked) {
            this.secoundStory();
        }
        this.addEventListener("button-clicked", this.handleButtonClick);
    }
}
customElements.define("kartu-prestasi", kartuPres);

class UkmpHeaderCardSto extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style nonce="${this.getNonce()}">
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .left-header {
            font-weight: bold;
            font-size: 24px;
          }
          .right-header a {
            font-size: 16px;
            text-decoration: none;
            color: #BFBFBF;
          }
        </style>
        <div class="header">
          <ukmp-text class="left-header" text="Story UKMP"></ukmp-text>
          <div class="right-header">
            <ukmp-text class="right-header" href="https://ukmpapps.web.app/su" link-text="Lihat Selengkapnya"></ukmp-text>
          </div>
        </div>
      `;
    }

    getNonce() {
        const meta = document.querySelector('meta[property="csp-nonce"]');
        if (meta) {
            const nonce = meta.getAttribute('content');
            if (nonce) {
                return nonce;
            }
        }

        // generate random nonce
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const randomString = array.join('');
        return `nonce-${randomString}`;
    }
}

customElements.define("ukmp-header-card-story", UkmpHeaderCardSto);

class UkmpHeaderCardSosPab extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style nonce="${this.getNonce()}">
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .left-header {
            font-weight: bold;
            font-size: 24px;
          }
          .right-header a {
            font-size: 16px;
            text-decoration: none;
            color: #BFBFBF;
          }
        </style>
        <div class="header">
          <ukmp-text class="left-header" text="Penerimaan Anggota Baru"></ukmp-text>
          <div class="right-header">
            <ukmp-text class="right-header" text="" href="https://ukmpapps.web.app/ms" link-text="Lihat Selengkapnya"></ukmp-text>
          </div>
        </div>
      `;
    }

    getNonce() {
        const meta = document.querySelector('meta[property="csp-nonce"]');
        if (meta) {
            const nonce = meta.getAttribute('content');
            if (nonce) {
                return nonce;
            }
        }

        // generate random nonce
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const randomString = array.join('');
        return `nonce-${randomString}`;
    }
}

customElements.define("ukmp-header-card-story-pab", UkmpHeaderCardSosPab);

class UkmpHeaderCardSosHarbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style nonce="${this.getNonce()}">
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .left-header {
            font-weight: bold;
            font-size: 24px;
          }
          .right-header a {
            font-size: 16px;
            text-decoration: none;
            color: #BFBFBF;
          }
        </style>
        <div class="header">
          <ukmp-text class="left-header" text="Hari Besar"></ukmp-text>
          <div class="right-header">
            <ukmp-text class="right-header" text="" href="https://ukmpapps.web.app/ms" link-text="Lihat Selengkapnya"></ukmp-text>
          </div>
        </div>
      `;
    }

    getNonce() {
        const meta = document.querySelector('meta[property="csp-nonce"]');
        if (meta) {
            const nonce = meta.getAttribute('content');
            if (nonce) {
                return nonce;
            }
        }

        // generate random nonce
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const randomString = array.join('');
        return `nonce-${randomString}`;
    }
}

customElements.define("ukmp-header-card-story-harbar", UkmpHeaderCardSosHarbar);

class UkmpHeaderCardSosDa extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style nonce="${this.getNonce()}">
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .left-header {
            font-weight: bold;
            font-size: 24px;
          }
          .right-header a {
            font-size: 16px;
            text-decoration: none;
            color: #BFBFBF;
          }
        </style>
        <div class="header">
          <ukmp-text class="left-header" text="Daftar Alumni"></ukmp-text>
          <div class="right-header">
            <ukmp-text class="right-header" text="" href="https://ukmpapps.web.app/ms" link-text="Lihat Selengkapnya"></ukmp-text>
          </div>
        </div>
      `;
    }

    getNonce() {
        const meta = document.querySelector('meta[property="csp-nonce"]');
        if (meta) {
            const nonce = meta.getAttribute('content');
            if (nonce) {
                return nonce;
            }
        }

        // generate random nonce
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const randomString = array.join('');
        return `nonce-${randomString}`;
    }
}

customElements.define("ukmp-header-card-story-da", UkmpHeaderCardSosDa);

class UkmpHeaderCardSosPres extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style nonce="${this.getNonce()}">
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .left-header {
            font-weight: bold;
            font-size: 24px;
          }
          .right-header a {
            font-size: 16px;
            text-decoration: none;
            color: #BFBFBF;
          }
        </style>
        <div class="header">
          <ukmp-text class="left-header" text="Prestasi UKMP"></ukmp-text>
          <div class="right-header">
            <ukmp-text class="right-header" text="" href="https://ukmpapps.web.app/ms" link-text="Lihat Selengkapnya"></ukmp-text>
          </div>
        </div>
      `;
    }

    getNonce() {
        const meta = document.querySelector('meta[property="csp-nonce"]');
        if (meta) {
            const nonce = meta.getAttribute('content');
            if (nonce) {
                return nonce;
            }
        }

        // generate random nonce
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const randomString = array.join('');
        return `nonce-${randomString}`;
    }
}

customElements.define("ukmp-header-card-story-prestasi", UkmpHeaderCardSosPres);

class UkmpHeaderCardSosUpgradingr extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style nonce="${this.getNonce()}">
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .left-header {
            font-weight: bold;
            font-size: 24px;
          }
          .right-header a {
            font-size: 16px;
            text-decoration: none;
            color: #BFBFBF;
          }
        </style>
        <div class="header">
          <ukmp-text class="left-header" text="Upgrading"></ukmp-text>
          <div class="right-header">
            <ukmp-text class="right-header" text="" href="https://ukmpapps.web.app/ms" link-text="Lihat Selengkapnya"></ukmp-text>
          </div>
        </div>
      `;
    }

    getNonce() {
        const meta = document.querySelector('meta[property="csp-nonce"]');
        if (meta) {
            const nonce = meta.getAttribute('content');
            if (nonce) {
                return nonce;
            }
        }

        // generate random nonce
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const randomString = array.join('');
        return `nonce-${randomString}`;
    }
}

customElements.define("ukmp-header-card-story-upgrading", UkmpHeaderCardSosUpgradingr);

class UkmpHeaderCardSosHutf extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <style nonce="${this.getNonce()}">
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .left-header {
            font-weight: bold;
            font-size: 24px;
          }
          .right-header a {
            font-size: 16px;
            text-decoration: none;
            color: #BFBFBF;
          }
        </style>
        <div class="header">
          <ukmp-text class="left-header" text="Hari Ulang Tahun"></ukmp-text>
          <div class="right-header">
            <ukmp-text class="right-header" text="" href="https://ukmpapps.web.app/ms" link-text="Lihat Selengkapnya"></ukmp-text>
          </div>
        </div>
      `;
    }

    getNonce() {
        const meta = document.querySelector('meta[property="csp-nonce"]');
        if (meta) {
            const nonce = meta.getAttribute('content');
            if (nonce) {
                return nonce;
            }
        }

        // generate random nonce
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        const randomString = array.join('');
        return `nonce-${randomString}`;
    }
}

customElements.define("ukmp-header-card-story-hutf", UkmpHeaderCardSosHutf);

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
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 100%;
                height: max-content;
                z-index: 999;
                transform: translate(-50%);
            }
            
            .modal-content {
                position: absolute;
                bottom: 0px;
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
                z-index: 1;
            }
            
            .close-button:hover {
                color: #555555;
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
            @media (prefers-color-scheme: dark) {
                .modal-content {
                    background: #161b22;
                    color: #f4f4f4;
                }
                .modal-button-li {
                    background-color: #161b22;
                    color: #0f0f0f;
                }

            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper" text="[[namaDepartemen]]">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text class="text-wrapper" id="deskripsi" text$="[[deskripsiDepartemen]]">[[deskripsiDepartemen]]</ukmp-text>
                            <button class="modal-button" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text text="Ketahui Lebih lanjut">Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper" text="Anggota HRD">Anggota HRD</ukmp-text>
                            <button class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text text="Lihat Selengkapnya">Lihat Selengkapnya</ukmp-text></button>
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
                value: '',
                reflectToAttribute: true,  // added for attribute-property binding
                observer: '_namaDepartemenChanged'  // added observer
            },
            deskripsiDepartemen: {
                type: String,
                value: '',
                reflectToAttribute: true,  // added for attribute-property binding
                observer: '_deskripsiDepartemenChanged'  // added observer
            },
            imageSrc: String,
        };
    }

    // observer function for namaDepartemen property
    _namaDepartemenChanged(newVal) {
        // code to handle the updated value of namaDepartemen
        const ukmpTextElement = this.shadowRoot.querySelector('ukmp-text');
        if (ukmpTextElement) {
            ukmpTextElement.setAttribute('text', newVal);
        }
    }

    _deskripsiDepartemenChanged(hallo) {
        // code to handle the updated value of namaDepartemen
        const Hal = this.shadowRoot.querySelector('ukmp-text #deskripsi');
        if (Hal) {
            Hal.setAttribute('text', hallo);
        }
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
        this.namaDepartemen = this.getAttribute("nama-departemen");
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').setAttribute('dark-theme', '');
            document.body.style.backgroundColor = '#0d111';
            document.body.style.color = '#f4f4f4';
        }
        this.deksripsiDepartemen = this.getAttribute("deskripsi-departemen");
        this._namaDepartemenChanged(this.namaDepartemen);  // initial call to the observer function
        this._deskripsiDepartemenChanged(this.deksripsiDepartemen);  // initial call to the observer function
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
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 100%;
                height: max-content;
                z-index: 999;
                transform: translate(-50%);
            }
            
            .modal-content {
                position: absolute;
                bottom: 0px;
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
                z-index: 1;
            }
            
            .close-button:hover {
                color: #555555;
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
            @media (prefers-color-scheme: dark) {
                .modal-content {
                    background: #161b22;
                    color: #f4f4f4;
                }
                .modal-button-li {
                    background-color: #161b22;
                    color: #0f0f0f;
                }

            }
          </style>

            <div class="profile-picture">
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
            </div>
      
            <div id="modal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
                <div class="modal-content">
                    <div class="headco">
                        <button class="close-button" on-click="closeModal">&#215;</button>
                        <ukmp-text class="text-wrapper" text="[[namaDepartement]]">[[namaDepartemen]]</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <image-component src="[[imageSrc]]"></image-component>
                        </div>
                        <div class="list-item">
                            <ukmp-text id="deskripsi" text$="[[deskripsiDepartemen]]">[[deskripsiDepartemen]]</ukmp-text>
                            <button class="modal-button" data-link="https://ukmpapps.web.app/hrd" on-click="navigateToLink"><ukmp-text text="Ketahui Lebih lanjut">Ketahui Lebih lanjut</ukmp-text></button>
                        </div>
                    </div>
                    <div class="chilpar">
                        <div class="headco">
                            <ukmp-text class="text-wrapper" text="Anggota DD">Anggota DD</ukmp-text>
                            <button class="modal-button-li" data-link="https://www.instagram.com/p/Cq1_5bUJbOh/" on-click="navigateToLink"><ukmp-text text="Lihat Selengkapnya">Lihat Selengkapnya</ukmp-text></button>
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
                value: '',
                reflectToAttribute: true,  // added for attribute-property binding
                observer: '_namaDepartemenChanged'  // added observer
            },
            deskripsiDepartemen: {
                type: String,
                value: '',
                reflectToAttribute: true,  // added for attribute-property binding
                observer: '_deskripsiDepartemenChanged'  // added observer
            },
            imageSrc: String,
        };
    }

    // observer function for namaDepartemen property
    _namaDepartemenChanged(newVal) {
        // code to handle the updated value of namaDepartemen
        const ukmpTextElement = this.shadowRoot.querySelector('ukmp-text');
        if (ukmpTextElement) {
            ukmpTextElement.setAttribute('text', newVal);
        }
    }

    _deskripsiDepartemenChanged(hallo) {
        // code to handle the updated value of namaDepartemen
        const Hal = this.shadowRoot.querySelector('ukmp-text #deskripsi');
        if (Hal) {
            Hal.setAttribute('text', hallo);
        }
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
        this.namaDepartemen = this.getAttribute("nama-departemen");
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').setAttribute('dark-theme', '');
            document.body.style.backgroundColor = '#0d111';
            document.body.style.color = '#f4f4f4';
        }
        this.deksripsiDepartemen = this.getAttribute("deskripsi-departemen");
        this._namaDepartemenChanged(this.namaDepartemen);  // initial call to the observer function
        this._deskripsiDepartemenChanged(this.deksripsiDepartemen);  // initial call to the observer function
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
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
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
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
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
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
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
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
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
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
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
                <button class="centered-button" on-click="openModal" aria-labelledby="Profile Departement" title="Profile Departement"></button>
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