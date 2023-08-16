import { PolymerElement, html } from "/../../node_modules/@polymer/polymer/polymer-element.js";

const ukmpApp = document.createElement("ukmp-app");
document.body.appendChild(ukmpApp);
const title = "UKM Penelitian Apps";
document.title = title;
for (var scriptName = "script-" + Math.random().toString(36).substr(2, 5), nonce = Math.random().toString(36).slice(2), styles = document.getElementsByTagName("script"), i = 0; i < styles.length; i++) styles[i].setAttribute("nonce", nonce);
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

class VideoComponent extends PolymerElement {
    static get template() {
        return html`
        <style>
          :host {
            display: block;
          }
  
          #video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
  
          #video.shadow-overlay {
            box-shadow: var(--video-shadow);
            transition: background-color 0.5s ease;
          }
  
          :host([show-sinematik]) #video.shadow-overlay {
            background-color: var(--video-glow-color);
          }
        </style>
  
        <video id="video" class="shadow-overlay" src="[[src]]" alt="[[alt]]" autoplay$="[[autoplay]]" controls></video>
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
            },
            autoplay: {
                type: Boolean,
                value: false
            }
        };
    }

    _srcChanged(src) {
        if (src) {
            const videoElement = this.shadowRoot.querySelector('#video');

            videoElement.addEventListener('loadedmetadata', () => {
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                const context = canvas.getContext('2d');

                setInterval(() => {
                    context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
                    const imageData = context.getImageData(0, 0, videoElement.videoWidth, videoElement.videoHeight).data;
                    const numPixels = videoElement.videoWidth * videoElement.videoHeight;
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

                    videoElement.style.setProperty('--video-shadow', boxShadowValue);
                    videoElement.style.setProperty('--video-glow-color', `${avgColor}77`);
                }, 1000 / 30); // Mengambil sampel warna setiap 30 frame per detik (30 FPS)
            });
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

customElements.define('video-component', VideoComponent);

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
    static get template() {
        return html`
        <style>
        .splash-screen {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: #ffffff;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .splash-screen img {
            max-width: 100%;
            max-height: 100%;
        }

        .splash-screen img:first-child {
            margin-right: 20px;
            /* Atur jarak antara logo 1 dan logo 2 */
        }

        .splash-screen img:nth-child(1) {
            /* Styling untuk Logo 1 */
            /* Styling untuk Logo 1 */
            width: 200px;
            /* Contoh ukuran */
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

        }

        .splash-screen img:nth-child(2) {
            /* Styling untuk Logo 2 */
            width: 100px;
            /* Contoh ukuran */
            position: absolute;
            bottom: 2%;
            left: 50%;
            transform: translateX(-50%);

        }
        .hidden {
            display: none;
        }

        @media (prefers-color-scheme: dark) {
            .splash-screen {
                background-color: black;
            }
        }

        </style>
        <div class$="{{splashApp}} splash-screen">
            <img src="/../../logo/arunika.png" alt="Logo 1">
            <img class="ukmp-logo" src="/../../logo/ukmp-logo-144x144.png" alt="Logo 2">
        </div> 
        <arunika-app id="homeApp" class$="{{ukmpAppClass}}"></arunika-app>
    `;
    }
    static get properties() {
        return {
            ukmpAppClass: {
                type: String,
                value: "hidden"
            },
            splashApp: {
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
            const cloudImageComponent = this.shadowRoot.querySelector('.ukmp-logo');
            if (cloudImageComponent) {
                cloudImageComponent.setAttribute('src', '/../../logo/ukmp-logo-512x512-white.png');
            }

        }
    }

    showHome() {
        this.ukmpAppClass = "";
        this.splashApp = "hidden";
    }
}

customElements.define("ukmp-app", UkmpApp);

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

// Define the registration page element
class RegistrationPage extends PolymerElement {
    static get template() {
        return html`
        <style>
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          .input {
            margin-bottom: 16px;
          }
          .button {
            margin-top: 16px;
          }
          .link {
            margin-top: 8px;
            text-align: center;
          }
        </style>
        <div class="container">
          <h2>Sign Up</h2>
          <div class="input">
            <label>Full Name:</label>
            <input id="fullNameInput" type="text">
          </div>
          <div class="input">
            <label>Username:</label>
            <input id="usernameInput" type="text">
          </div>
          <div class="input">
            <label>Password:</label>
            <input id="passwordInput" type="password">
          </div>
          <div class="input">
            <label>Department:</label>
            <input id="departmentInput" type="text">
          </div>
          <div class="input">
            <label>Position:</label>
            <input id="positionInput" type="text">
          </div>
          <button class="button" on-click="signup">Sign Up</button>
          <div class="link">
            <a href="/login.html">Already have an account? Log in</a>
          </div>
        </div>
      `;
    }

    signup() {
        const fullName = this.$.fullNameInput.value;
        const username = this.$.usernameInput.value;
        const password = this.$.passwordInput.value;
        const department = this.$.departmentInput.value;
        const position = this.$.positionInput.value;

        // Perform validation (e.g., check if username is already taken)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(u => u.username === username);

        if (existingUser) {
            alert('Username already exists');
        } else {
            // Store user information in Web Storage
            const newUser = {
                fullName: fullName,
                username: username,
                password: password,
                department: department,
                position: position
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            alert('Registration successful. Please log in.');

            // Redirect to login page
            window.location.href = '/login.html';
        }
    }
}

// Register the registration page element
customElements.define('registration-page', RegistrationPage);

// Define the login page element
class LoginPage extends PolymerElement {
    static get template() {
        return html`
        <style>
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          .input {
            margin-bottom: 16px;
          }
          .button {
            margin-top: 16px;
          }
          .link {
            margin-top: 8px;
            text-align: center;
          }
        </style>
        <div class="container">
          <h2>Login</h2>
          <div class="input">
            <label>Username:</label>
            <input id="usernameInput" type="text">
          </div>
          <div class="input">
            <label>Password:</label>
            <input id="passwordInput" type="password">
          </div>
          <button class="button" on-click="login">Login</button>
          <div class="link">
            <a href="/reg.html">Sign up</a>
          </div>
        </div>
      `;
    }

    login() {
        const username = this.$.usernameInput.value;
        const password = this.$.passwordInput.value;

        // Authenticate user (replace with your own authentication logic)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Store user information in Web Storage
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', username);

            // Redirect to main page
            window.location.href = '/index.html';
        } else {
            alert('Invalid username or password');
        }
    }
}

// Register the login page element
customElements.define('login-page', LoginPage);

// Define the main page element
class MainPage extends PolymerElement {
    static get template() {
        return html`
        <style>
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: black;
          }
          .button {
            margin-top: 16px;
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
            background-color: #444;
            color: #f1f1f1;
          }
          @media (prefers-color-scheme: dark) {
            .button {
                background-color: #f1f1f1;
                color: #444;
            }
            .container {
                color: #ccc;
            }
          }
        </style>
        <div class="container">
          <h2>Welcome, [[username]]!</h2>
          <p>Department: [[department]]</p>
          <button class="button" on-click="logout">Logout</button>
        </div>
      `;
    }

    static get properties() {
        return {
            username: {
                type: String,
                value: ''
            },
            department: {
                type: String,
                value: ''
            },
        };
    }

    connectedCallback() {
        super.connectedCallback();

        // Check if user is logged in
        const loggedIn = localStorage.getItem('loggedIn');
        const username = localStorage.getItem('username');

        if (!loggedIn || !username) {
            // Redirect to login page if not logged in
            window.location.href = '/login.html';
        } else {
            this.username = username;

            // Retrieve user data from Web Storage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === username);

            if (user) {
                this.department = user.department;
            }
        }
    }

    logout() {
        // Clear user information from Web Storage
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');

        // Redirect to login page
        window.location.href = '/login.html';
    }
}

// Register the main page element
customElements.define('main-page', MainPage);

class HomeApp extends PolymerElement {
    static get template() {
        return html`
          <style>
          [hidden] {
              display: none;
          }
          </style>
          <arunika-app-history hidden></arunika-app-history>
          <arunika-app-departement-ph><arunika-app-departement-ph>
      `;
    }

}


customElements.define("arunika-app", HomeApp);

class de extends PolymerElement {
    static get template() {
        return html`
            <arunika-header-profile></arunika-header-profile>
            <arunika-profile-ph></arunika-profile-ph>
            <arunika-deskripsi-ph></arunika-deskripsi-ph>
            <arunika-narahubung-ph></arunika-narahubung-ph>
            <arunika-fungsio-ph></arunika-fungsio-ph>
            <arunika-detail-ph></arunika-detail-ph>
            <arunika-berita-ph></arunika-berita-ph>
            <arunika-prestasi-ph></arunika-prestasi-ph>
        `
    }
}

customElements.define("arunika-app-departement-ph", de)

class HeadProfilePh extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: space-between; /* Mengatur jarak antara elemen-elemen */
            gap: 10%;
        }
    
        .header-profile {
            display: flex;
            align-items: center;
        }

        .header-profile image-component {
            display: flex;
            align-items: center;
        }

        .profile {
            display: flex;
            align-items: center;
        }
    
        .profile img {
            width: 40px;
        }
    
        .deskripsi {
            flex-grow: 1;
        }
    
        h2 {
            color: black;
            font-size: 16px;
        }
    
        .buttons-container {
            display: flex;
            align-items: center;
        }
        
        .buttons-container image-component {
            width: 40px;
        }
    
        .back-button,
        .three-dots-button {
            padding: 8px;
            font-size: 16px;
            cursor: pointer;
            color: #007bff; /* Warna biru untuk tautan */
            display: flex; /* Tambahkan agar ikon SVG dapat diposisikan bersama teks */
            align-items: center; /* Posisikan ikon SVG secara vertikal di tengah tombol */
        }
    
        .back-button svg {
            width: 16px; /* Sesuaikan ukuran ikon SVG sesuai kebutuhan */
            height: 16px;
            margin-right: 4px; /* Ruang antara ikon dan teks */
        }
    
        .three-dots-button {
            margin-left: 8px; /* Memberikan ruang antara tombol-tombol */
        }

        @media (prefers-color-scheme: dark) {
            :host {
                background-color: black;
            }
    
            h2 {
                color: white;
                font-size: 16px;
            }
    
            .back-button,
            .three-dots-button {
                color: #cce5ff; /* Warna biru terang untuk tautan pada mode gelap */
            }
        }
    </style>
    <div class="header-profile">
        <div class="buttons-container">
            <div class="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </div>
            <image-component src="./PH.jpg" alt="Gambar 1" show-sinematik></image-component>
            <h2>Departement PH</h2>
        </div>
    </div>
    <div class="profile">
        <img src="https://ukmpapps.web.app/apps/user.png" alt="Profile">
    </div>       
        `
    }
}

customElements.define("arunika-header-profile", HeadProfilePh);


class ProfilePh extends PolymerElement {
    static get template() {
        return html`
            <style>
            :host {
                background-color: white;
                padding: 16px;
                display: flex;
                align-items: center;
                gap: 16px;
                position: relative;
            }
        
            image-component {
                width: 50px;
            }
        
            .deskripsi {
                display: flex;
                flex-direction: column;
                justify-content: center;
                flex-grow: 1;
                width: 100%
            }
        
            h2, h3 {
                margin: 5px;
            }
        
            h2 {
                color: black;
                font-size: 16px;
            }
        
            h3 {
                font-size: 14px;
                color: gray;
            }

            @media (prefers-color-scheme: dark) {
                :host {
                    background-color: black;
                }
                h2 {
                    color: white;
                    font-size: 16px;
                }
            
                h3 {
                    font-size: 14px;
                    color: #acafb3;
                }

            }
            </style>

            <image-component src="./PH.jpg" alt="Gambar 1" show-sinematik></image-component>
            <div class="deskripsi">
                <h2>PH</h2>
                <h3>Pengurus Harian</h3>
            </div>
        `
    }
}

customElements.define("arunika-profile-ph", ProfilePh);

class DeskripsiPh extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
            background-color: white;
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 16px;
        }
    
        .anggota {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-direction: column;
            border-right: 2px solid black;
            width: 100%;
        }
    
        .anggota-icon {
            width: 46px;
            height: 40px;
        }

        .jumlah {
            font-size: 14px;
            color: gray;
        }
    
        .download {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-direction: column;
            width: 100%;
        }
    
        .download-icon {
            width: 40px;
            height: 40px;
        }
        @media (prefers-color-scheme: dark) {
            :host {
                background-color: black;
            }
            .jumlah {
                color: white;
            }
        
            .anggota-icon {
                fill: white;
            }

            .download-icon {
                fill: white;
            }

        }
    </style>
    
    <div class="anggota">
        <svg class="anggota-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><g><path d="M58.1847878,89.8407669c-1.1162415,0-2.0212746-0.9050369-2.0212746-2.0212784   c0-13.6806259-11.1298523-24.810482-24.8109741-24.810482c-13.6801338,0-24.8099842,11.1298561-24.8099842,24.810482   c0,1.1162415-0.9050345,2.0212784-2.021277,2.0212784S2.500001,88.93573,2.500001,87.8194885   c0-15.9096603,12.9428816-28.853035,28.8525391-28.853035s28.8535271,12.9433746,28.8535271,28.853035   C60.2060661,88.93573,59.3010292,89.8407669,58.1847878,89.8407669z"/></g><g><path d="M31.3525391,56.9343224c-8.7907753,0-15.9432135-7.1524391-15.9432135-15.9437103   s7.1524382-15.9432125,15.9432135-15.9432125s15.9432144,7.1519451,15.9432144,15.9432125   S40.1433144,56.9343224,31.3525391,56.9343224z M31.3525391,29.0899525c-6.5622406,0-11.9006596,5.338419-11.9006596,11.9006596   s5.338419,11.9011574,11.9006596,11.9011574s11.9006615-5.3389168,11.9006615-11.9011574   S37.9147797,29.0899525,31.3525391,29.0899525z"/></g><g><path d="M95.4787216,74.9525986c-1.1162415,0-2.0212784-0.9050293-2.0212784-2.0212784   c0-13.6806259-11.1298523-24.8104744-24.8099823-24.8104744c-5.7124748,0-11.0805054,1.8865547-15.5247459,5.4558678   c-0.869503,0.6982651-2.1416855,0.5596008-2.8414345-0.3103981c-0.698761-0.870491-0.5596008-2.1426697,0.3108902-2.8419266   c5.0956306-4.0923958,11.5078545-6.346096,18.0552902-6.346096C84.5571213,44.0782928,97.5,57.0216675,97.5,72.9313202   C97.5,74.0475693,96.5949631,74.9525986,95.4787216,74.9525986z"/></g><g><path d="M68.6474609,42.0456657c-8.7907753,0-15.9432144-7.1519432-15.9432144-15.9432144   s7.1524391-15.9432144,15.9432144-15.9432144s15.9432144,7.1519432,15.9432144,15.9432144   S77.4382401,42.0456657,68.6474609,42.0456657z M68.6474609,14.2017899c-6.5622406,0-11.9006615,5.3384209-11.9006615,11.9006615   s5.3384209,11.9006615,11.9006615,11.9006615s11.9006577-5.3384209,11.9006577-11.9006615   S75.2097015,14.2017899,68.6474609,14.2017899z"/></g></svg>
        <span class="jumlah">6 orang</span>
    </div>
    
    <div class="download">
        <svg class="download-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><g><path d="M58.1847878,89.8407669c-1.1162415,0-2.0212746-0.9050369-2.0212746-2.0212784   c0-13.6806259-11.1298523-24.810482-24.8109741-24.810482c-13.6801338,0-24.8099842,11.1298561-24.8099842,24.810482   c0,1.1162415-0.9050345,2.0212784-2.021277,2.0212784S2.500001,88.93573,2.500001,87.8194885   c0-15.9096603,12.9428816-28.853035,28.8525391-28.853035s28.8535271,12.9433746,28.8535271,28.853035   C60.2060661,88.93573,59.3010292,89.8407669,58.1847878,89.8407669z"/></g><g><path d="M31.3525391,56.9343224c-8.7907753,0-15.9432135-7.1524391-15.9432135-15.9437103   s7.1524382-15.9432125,15.9432135-15.9432125s15.9432144,7.1519451,15.9432144,15.9432125   S40.1433144,56.9343224,31.3525391,56.9343224z M31.3525391,29.0899525c-6.5622406,0-11.9006596,5.338419-11.9006596,11.9006596   s5.338419,11.9011574,11.9006596,11.9011574s11.9006615-5.3389168,11.9006615-11.9011574   S37.9147797,29.0899525,31.3525391,29.0899525z"/></g><g><path d="M95.4787216,74.9525986c-1.1162415,0-2.0212784-0.9050293-2.0212784-2.0212784   c0-13.6806259-11.1298523-24.8104744-24.8099823-24.8104744c-5.7124748,0-11.0805054,1.8865547-15.5247459,5.4558678   c-0.869503,0.6982651-2.1416855,0.5596008-2.8414345-0.3103981c-0.698761-0.870491-0.5596008-2.1426697,0.3108902-2.8419266   c5.0956306-4.0923958,11.5078545-6.346096,18.0552902-6.346096C84.5571213,44.0782928,97.5,57.0216675,97.5,72.9313202   C97.5,74.0475693,96.5949631,74.9525986,95.4787216,74.9525986z"/></g><g><path d="M68.6474609,42.0456657c-8.7907753,0-15.9432144-7.1519432-15.9432144-15.9432144   s7.1524391-15.9432144,15.9432144-15.9432144s15.9432144,7.1519432,15.9432144,15.9432144   S77.4382401,42.0456657,68.6474609,42.0456657z M68.6474609,14.2017899c-6.5622406,0-11.9006615,5.3384209-11.9006615,11.9006615   s5.3384209,11.9006615,11.9006615,11.9006615s11.9006577-5.3384209,11.9006577-11.9006615   S75.2097015,14.2017899,68.6474609,14.2017899z"/></g></svg>
        <span class="jumlah">8 Progam Kerja</span>
    </div>
    
        `
    }
}

customElements.define("arunika-deskripsi-ph", DeskripsiPh);

class narahubungPh extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
            background-color: white;
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 16px;
        }
    
        .narahubung {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
            background-color: black;
            border-radius: 100px;
            height: 40px;
        }
    
        .narahubung-text {
            font-size: 20px;
            color: white;
            width: 90%;
            text-align: center;
            border-right: 1px solid black;
            background-color: transparent;
            border: none;
        }

        .narahubung-icon {
            font-size: 14px;
            width: 10%;
            background-color: transparent;
            border: none;
        }

        .narahubung-icon svg {
            width: 20px;
            position: relative;
            left: 50%;
            transform : translateX(-50%);
        }
    
        .download {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-direction: column;
            width: 100%;
        }
    
        .download-icon {
            width: 40px;
            height: 40px;
        }

        .modal-apps {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }
        
          .modal-content-apps {
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translate(-50%);
            background-color: #fff;
            padding: 10px;
            width: 340px;
            border-radius: 30px;
          }
          .close-button-apps {
            width: 24px;
            background-color: transparent;
            font-size: 18px;
            color: #999999;
            cursor: pointer;
            font-size: 28px;
            border: none;
          }
          
          .close-button-apps:hover {
            color: #555555;
          }

          .button-container {
            text-align: center;
            margin-top: 20px;
        }

        .button-container .list-item {
            margin: 10px;
        }

        .headco-app {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-top: 12px;
            position: relative;
            gap: 28%
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
            display: flex;
            flex-direction: row;
            align-content: center;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            color: #212121;
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

        .img-op button {
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
            background-color: transparent;
        }
        @media (prefers-color-scheme: dark) {
            :host {
                background-color: black;
            }
            .narahubung {
                background-color: #1A202C;
            }
        
            .narahubung-text {
                color: white;
            }
            .modal-content-apps {
                background-color: #2d3847;
            }
            .list-grid {
                color: #f9f4f4;
            }
        }
    </style>
    <div id="Apps" class="modal-apps" on-touchstart="handleTouchStartApp" on-touchmove="handleTouchMoveApp" on-touchend="handleTouchEndApp">
                <div class="modal-content-apps" id="Content">
                    <div class="swipe-indicator"></div>
                    <div class="headco-app">
                        <button class="close-button-apps" on-click="closeApp">&#215;</button>
                        <ukmp-text class="text-apps" text="Aplikasi UKMP">Aplikasi UKMP</ukmp-text>
                    </div>
                    <div class="button-container">
                        <div class="list-item">
                            <div class="grid">
                                <ukmp-grid class="list-grid">
                                    <div class="img-op" data-link="https://ukmpapps.web.app/download" on-click="navigateToLink" >
                                        <button class="centered-button" data-link="https://ukmpapps.web.app/download" on-click="navigateToLink" aria-labelledby="Download" title="Download">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39"><path fill="#00E676" d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"></path><path fill="#FFF" d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"></path></svg>
                                        </button>
                                    </div>
                                    WhatsApp
                                </ukmp-grid>
                                <ukmp-grid class="list-grid">
                                    <div class="img-op" data-link="https://ukmpapps.web.app/apps/story" on-click="navigateToLink" aria-labelledby="Story" title="Story">
                                        <button class="centered-button"on-click="openStory">
                                            <image-component src="/../../images/ph/ig.png" alt=""></image-component>
                                        </button>
                                    </div>
                                    Instagram
                                </ukmp-grid>
                                </ukmp-grid>
                                <ukmp-grid class="list-grid">
                                    <div class="img-op" data-link="https://ukmpapps.web.app/medsos" on-click="navigateToLink" aria-labelledby="Media Sosial" title="Media Sosial">
                                        <button class="centered-button" data-link="https://ukmpapps.web.app/medsos" on-click="navigateToLink" >
                                            <image-component src="../../logo/arunika.webp"" alt=""></image-component>
                                        </button>
                                    </div>
                                    LinkTree
                                </ukmp-grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    <div class="narahubung">
        <button class="narahubung-text" data-link="https://linktr.ee/UKMPenelitianUNNES" on-click="navigateToLink" >Ketahui Lebih Lanjut</button>
        <button class="narahubung-icon" on-click="openApp">
            <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff">
                <path d="M7,10l5,5l5-5H7z"></path>
                <path fill="none" d="M0,0h24v24H0V0z"></path>
            </svg>
        </button>
    </div>    
        `
    }

    connectedCallback() {
        super.connectedCallback();
        this.showComponentsWithDelay();
        this.app = this.shadowRoot.getElementById("Apps");
        this.app.addEventListener("click", this.handleOutsideClickApp.bind(this));
        document.documentElement.style.overflowY = "hidden"; // Menambahkan gaya overflow-y: hidden pada tag <html>
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector('html').setAttribute('dark-theme', '');
            document.body.style.backgroundColor = '#0d111';
            document.body.style.color = '#f4f4f4';

            // Ubah src image-component cloud menjadi path gambar tema gelap
            const cloudImageComponent = this.shadowRoot.querySelector('.ukmp-logo');
            if (cloudImageComponent) {
                cloudImageComponent.setAttribute('src', '/../../logo/ukmp-logo-512x512-white.png');
            }

        }
    }

    navigateToLink(event) {
        const button = event.target;
        const link = button.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    }

    openApp() {
        this.app = this.shadowRoot.getElementById("Apps");
        this.content = this.shadowRoot.getElementById("Content");
        this.content.classList.add("slide-in");

        // Mengatur listener untuk menghapus kelas CSS setelah animasi selesai
        this.content.addEventListener("animationend", () => {
            this.content.classList.remove("slide-in");
            this.content.style.display = "block";
            this.content.style.bottom = "70px";
        });
        this.app.style.display = "block";
        this.appStartPosition = 0;
        this.app.addEventListener("touchstart", this.handleTouchStartApp.bind(this));
        this.app.addEventListener("touchmove", this.handleTouchMoveApp.bind(this));
        this.app.addEventListener("touchend", this.handleTouchEndApp.bind(this));
        document.documentElement.style.overflowY = "hidden"; // Menambahkan gaya overflow-y: hidden pada tag <html>
    }


    handleOutsideClickApp(event) {
        if (event.target === this.app) {
            this.closeApp();
        }
    }

    closeApp() {
        this.app.style.display = "none";
        this.app.removeEventListener("touchstart", this.handleTouchStartApp.bind(this));
        this.app.removeEventListener("touchmove", this.handleTouchMoveApp.bind(this));
        this.app.removeEventListener("touchend", this.handleTouchEndApp.bind(this));
        document.documentElement.style.overflowY = ""; // Menghapus gaya overflow-y: hidden dari tag <html>
    }

    handleTouchStartApp(e) {
        this.startY = e.touches[0].pageY;
        this.appStartPosition = this.app.getBoundingClientRect().top;
    }

    handleTouchMoveApp(e) {
        const deltaY = e.touches[0].pageY - this.startY;
        this.moveModalApp(deltaY);
    }

    handleTouchEndApp(e) {
        const deltaY = e.changedTouches[0].pageY - this.startY;
        if (deltaY > 100) {
            this.closeApp();
            this.resetModalPositionApp();
        } else {
            this.resetModalPositionApp();
        }
    }

    moveModalApp(deltaY) {
        this.app.style.transform = `translateY(${deltaY}px)`;
    }

    resetModalPositionApp() {
        this.app.style.transform = "";
    }

}

customElements.define("arunika-narahubung-ph", narahubungPh);

class ArunikaFungsioPh extends PolymerElement {
    static get template() {
        return html`
      <style>
      :host {
        background-color: white;
    }
      .carousel {
        display: flex;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        width: 100%;
      }
      
      .card {
        flex: 0 0 auto;
        width: max-content;
        margin-right: 10px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }

      .card-title {
        margin-bottom: 20px;
      }

      .video-component {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }

      .dokument-head {
        display: flex;
        align-items: center;
        gap: 5%;
      }

      .dokument img {
            width: 35px;
      }

      .dokument-head image-component {
            width: 35px;
      }

      ukmp-text {
        text-align: justify;
      }
      @media (prefers-color-scheme: dark) {
        .card {
            background-color: black;
            color: white;
        }
        :host {
            background-color: black;
        }
        .dokument-head {
            background-color: black;
        }
        .carousel {
            background-color: black;
        }
      }
      </style>

      <div class="dokument-head">
            <div class="card-title">Kenalan Yuk sama Departement ini</div>
      </div>
      <div class="carousel">
      <div class="card">
        <ukmp-detail-fungsio-ph title="Evin Yulianto" description="Ketua UKMP" url="./evin" color-H="white" color-A="white" color-P="white" background-Image="../../img/Evin.jpeg" image-alt="Ketua UKMP" modal nama-orang="Evin Yulianto" jenis-jabatan="Ketua UKMP 2023" tahun-fungsio="2022"></ukmp-detail-fungsio-ph>
      </div>
      <div class="card">
        <ukmp-detail-fungsio-ph title="M. Hasan Mustofa" description="Wakil Ketua UKMP" url="./hasan" color-H="white" color-A="white" color-P="white" background-Image="../../img/hasan.JPG" image-alt="Wakil UKMP" modal nama-orang="M. Hasan Mustofa" jenis-jabatan="Wakil Ketua UKMP" tahun-fungsio="2022"></ukmp-detail-fungsio-ph>
      </div>
      <div class="card">
          <ukmp-detail-fungsio-ph title="Sekretaris UKMP" description="Lisa Edliani" url="./lisa" color-H="white" color-A="white" color-P="white" background-Image="../../img/Lisa.JPG" image-alt="Sekretaris UKMP" modal nama-orang="Lisa Edliani" jenis-jabatan="Sekretaris 1" tahun-fungsio="2022"></ukmp-detail-fungsio-ph>
      </div>
      <div class="card">
        <ukmp-detail-fungsio-ph title="Sekretaris UKMP" description="Intan Nurfaizah" url="./intan" color-H="white" color-A="white" color-P="white" background-Image="../../img/Intan.JPG" image-alt="Sekretaris UKMP" modal nama-orang="Intan Nurfaizah" jenis-jabatan="Sekretaris 2" tahun-prestasi="2022"></ukmp-detail-fungsio-ph>
      </div>
      <div class="card">
          <ukmp-detail-fungsio-ph title="Bendahara UKMP" description="Rouna Nastiti" url="./rouna" color-H="white" color-A="white" color-P="white" background-Image="../../img/Rouna.JPG" image-alt="Bendahara UKMP" modal nama-orang="Rouna Nastiti" jenis-jabatan="Bendahara 1" tahun-prestasi="2022"></ukmp-detail-fungsio-ph>
      </div>
      <div class="card">
        <ukmp-detail-fungsio-ph title="Bendahara UKMP" description="Thoyibah" url="./thoyibah" color-H="white" color-A="white" color-P="white" background-Image="../../img/Thoyibah.JPG" image-alt="Bendahara UKMP" modal nama-orang="Thoyibah" jenis-jabatan="Bendahara 2" tahun-prestasi="2023"></ukmp-detail-fungsio-ph>
      </div>
    </div>
    `;
    }

    static get is() {
        return 'arunika-fungsio-ph';
    }
}

customElements.define(ArunikaFungsioPh.is, ArunikaFungsioPh);

class ArunikaBeritaoPh extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
          background-color: white;
        }
        
        .carousel {
          display: flex;
          overflow-x: scroll;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          width: 100%;
        }
        
        .card {
          flex: 0 0 auto;
          width: 100%;
          margin-right: 10px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #e1e1e1;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          gap: 5%
        }
        
        .card img {
          width: 40%;
          border-radius: 5px;
        }

        .desk {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
        }
        
        .card-text {
          font-size: 14px;
          margin-top: 10px;
          color: black;
        }
        
        .card-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
          color: black;
        }
        
        .update-text {
          color: #01bf9d;
          font-size: 14px;
          margin-bottom: 5px;
        }
        
        .explore-button {
          background-color: #ff5722;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .explore-button:hover {
          background-color: #f44336;
        }
        
        .dokument-head {
          display: flex;
          align-items: center;
          gap: 5%;
        }
        
        .dokument img {
          width: 35px;
        }
        
        .dokument-head image-component {
          width: 35px;
        }
        
        ukmp-text {
          text-align: justify;
        }
        
        @media (prefers-color-scheme: dark) {
          .card {
            background-color: #1a202c;
            color: white;
          }
          :host {
            background-color: black;
          }
          .dokument-head {
            background-color: black;
          }
          .carousel {
            background-color: black;
          }
          .explore-button {
            background-color: #38496b;
          }
        }
      </style>
      
      <div class="dokument-head">
        <div class="card-title">Acara dan Berita</div>
      </div>
      <div class="carousel">
        <div class="card">
          <img src="/../../images/prestasi/354436069_6435225773224205_7802162265042735503_n.jpeg" alt="Image">
          <div class="desk">
            <div class="update-text">Lolos Perdanaan PKM 2023</div>
            <div class="card-text">
                Selamat dan sukses kepada Evin Yulianto atas didanainya proposal PKM-PM 2023
            </div>
            <button class="explore-button">Lihat Selengkapnya</button>
          </div>
        </div>
        <div class="card">
          <img src="/../../images/prestasi/353880985_1258843091438694_2786285672251724551_n.jpeg" alt="Image">
          <div class="desk">
            <div class="update-text">Lolos Perdanaan PKM 2023</div>
            <div class="card-text">
                Selamat dan sukses kepada M. Hasan Mustofa atas didanainya proposal PKM-PM 2023
            </div>
            <button class="explore-button">Lihat Selengkapnya</button>
          </div>
        </div>
        <div class="card">
          <img src="/../../images/prestasi/354508328_802993194507779_8681963008183073113_n.jpeg" alt="Image">
          <div class="desk">
            <div class="update-text">Lolos Perdanaan PKM 2023</div>
            <div class="card-text">
                Selamat dan sukses kepada Intan Nor Aini atas didanainya proposal PKM-PM 2023
            </div>
            <button class="explore-button">Lihat Selengkapnya</button>
          </div>
        </div>
      </div>      
    `;
    }

    static get is() {
        return 'arunika-berita-ph';
    }
}

customElements.define(ArunikaBeritaoPh.is, ArunikaBeritaoPh);

class ArunikaPresPh extends PolymerElement {
    static get template() {
        return html`
        <style>
      :host {
        background-color: white;
        padding: 16px 0 16px 0;
    }
      .carousel {
        display: flex;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        width: 100%;
      }
      
      .card {
        flex: 0 0 auto;
        width: max-content;
        margin-right: 10px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }

      .card-title {
        font-size: 18px;
        font-weight: bold;
        margin: 10px 0 10px 0;
        color: black;
      }

      .video-component {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }

      .dokument-head {
        display: flex;
        align-items: center;
        gap: 5%;
        color: black;
      }

      .dokument img {
            width: 35px;
      }

      .dokument-head image-component {
            width: 35px;
      }

      ukmp-text {
        text-align: justify;
      }
      @media (prefers-color-scheme: dark) {
        .card {
            background-color: black;
            color: white;
        }
        :host {
            background-color: black;
        }
        .dokument-head {
            background-color: black;
        }
        .carousel {
            background-color: black;
        }
      }
      </style>

      <div class="dokument-head">
            <div class="card-title">Prestasi</div>
      </div>
      <div class="carousel">
      <div class="card">
      <ukmp-story-prestasi title="2023" description="Lolos Perdanaan PKM" url="./story" color-H="white" color-A="white" color-P="white" background-Image="/../../images/prestasi/354436069_6435225773224205_7802162265042735503_n.jpeg" image-alt="Lolos Perdanaan PKM" modal nama-orang="Evin" jenis-prestasi="Lolos Perdanaan PKM" tahun-prestasi="2023" juara-prestasi="Lolos Perdanaan PKM"></ukmp-story-prestasi>
      </div>
      <div class="card">
        <ukmp-story-prestasi title="2023" description="Lolos Perdanaan PKM" url="./story" color-H="white" color-A="white" color-P="white" background-Image="/../../images/prestasi/353880985_1258843091438694_2786285672251724551_n.jpeg" image-alt="Lolos Perdanaan PKM" modal nama-orang="Hasan" jenis-prestasi="Lolos Perdanaan PKM" tahun-prestasi="2023" juara-prestasi="Lolos Perdanaan PKM"></ukmp-story-prestasi>
      </div>
      <div class="card">
        <ukmp-story-prestasi title="2023" description="Lolos Perdanaan PKM" url="./story" color-H="white" color-A="white" color-P="white" background-Image="/../../images/prestasi/354508328_802993194507779_8681963008183073113_n.jpeg" image-alt="Lolos Perdanaan PKM" modal nama-orang="Intan" jenis-prestasi="Lolos Perdanaan PKM" tahun-prestasi="2023" juara-prestasi="Lolos Perdanaan PKM"></ukmp-story-prestasi>      
      </div>
    </div>    
    `;
    }

    static get is() {
        return 'arunika-prestasi-ph';
    }
}

customElements.define(ArunikaPresPh.is, ArunikaPresPh);

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

class ArunikaPrestasi extends PolymerElement {
    static get template() {
        return html`
      <style>
      .carousel {
        display: flex;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        width: 100%;
      }
      
      .card {
        flex: 0 0 auto;
        width: 210px;
        margin-right: 10px;
        background-color: lightgray;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
      }
      
      .card-title {
        font-size: 24px;
        margin-bottom: 10px;
      }
      
      .card-body {
        width: 100%;
        height: 100%;
        border: none;
      }
      
      .card-footer {
        margin-top: 10px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .card-footer image-component {
        width: 60px;
      }
      .card-footer-deskripsi {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .share-button {
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
  
      .share-button:hover {
        background-color: #0056b3;
      }

      .dokument-head {
        display: flex;
        align-items: center;
        gap: 5%;
      }

      .dokument img {
            width: 35px;
      }

      .dokument-head image-component {
            width: 35px;
      }

      ukmp-text {
        text-align: justify;
      }
      @media (prefers-color-scheme: dark) {
        .card {
            background-color: black;
            color: white;
        }
        .share-button {
            background-color: #161b22;
            color: #f4f4f4;
        }
      }
      </style>

      <div slot="kartu-prestasi">
        <kartu-prestasi></kartu-prestasi>
      </div>
    `;
    }

    static get is() {
        return 'arunika-prestasi';
    }
}

customElements.define(ArunikaPrestasi.is, ArunikaPrestasi);

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
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(1, 1fr);
            grid-gap: 20px;
            justify-items: center;
            justify-content: space-around;
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
            bottom: 48%;
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
            bottom: 48%;
            z-index: 1;
        }
      </style>
      <ukmp-header-card-story-prestasi class="header"></ukmp-header-card-story-prestasi>
      <div class$="{{storyStartApp}} card-grid">
        <ukmp-detail-fungsio-ph title="2023" description="Lolos Perdanaan PKM" url="./story" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/353822697_1290665238496493_6227867768103515191_n.jpeg" image-alt="Lolos Perdanaan PKM" modal nama-orang="Jabar" jenis-jabatan="Lolos Perdanaan PKM" tahun-prestasi="2023" juara-prestasi="Lolos Perdanaan PKM"></ukmp-detail-fungsio-ph>
        <ukmp-detail-fungsio-ph title="2023" description="Lolos Perdanaan PKM" url="./story" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/353861515_640079521512682_3370790497817475094_n.jpeg" image-alt="Lolos Perdanaan PKM" modal nama-orang="Fajar" jenis-jabatan="Lolos Perdanaan PKM" tahun-prestasi="2023" juara-prestasi="Lolos Perdanaan PKM"></ukmp-detail-fungsio-ph>
        <button class="button story-button-prev-start" on-click="startStory">
            <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
        </button>
      </div>
      <div class$="{{storySecoundApp}} card-grid">
            <button class="button story-button-prev-secound" on-click="secoundStory">
                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
            </button>
            <ukmp-detail-fungsio-ph title="2023" description="Lolos Perdanaan PKM" url="./story" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/353880985_1258843091438694_2786285672251724551_n.jpeg" image-alt="Lolos Perdanaan PKM" modal nama-orang="Hasan" jenis-jabatan="Lolos Perdanaan PKM" tahun-prestasi="2023" juara-prestasi="Lolos Perdanaan PKM"></ukmp-detail-fungsio-ph>
            <ukmp-detail-fungsio-ph title="2023" description="Lolos Perdanaan PKM" url="./story" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/354013433_626073636154699_356598338880584908_n.jpeg" image-alt="Lolos Perdanaan PKM" modal nama-orang="Hanina" jenis-jabatan="Lolos Perdanaan PKM" tahun-prestasi="2023" juara-prestasi="Lolos Perdanaan PKM"></ukmp-detail-fungsio-ph>
            <button class="button story-button-prev-start" on-click="secoundStorynex">
                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
            </button>
      </div>
      <div class$="{{storyTreeApp}} card-grid">
        <button class="button story-button-prev-secound" on-click="treeStory">
            <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff"><path d="M15.41,7.41L10.83,12L15.41,16.59L14,18l-6,-6l6,-6L15.41,7.41z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>
        </button>
        <ukmp-detail-fungsio-ph title="2023" description="Lolos Perdanaan PKM" url="./story" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/354436069_6435225773224205_7802162265042735503_n.jpeg" image-alt="Lolos Perdanaan PKM" modal nama-orang="Evin" jenis-jabatan="Lolos Perdanaan PKM" tahun-prestasi="2023" juara-prestasi="Lolos Perdanaan PKM"></ukmp-detail-fungsio-ph>
        <ukmp-detail-fungsio-ph title="2023" description="Lolos Perdanaan PKM" url="./story" color-H="white" color-A="white" color-P="white" background-Image="../images/prestasi/354508328_802993194507779_8681963008183073113_n.jpeg" image-alt="Lolos Perdanaan PKM" modal nama-orang="Intan" jenis-jabatan="Lolos Perdanaan PKM" tahun-prestasi="2023" juara-prestasi="Lolos Perdanaan PKM"></ukmp-detail-fungsio-ph>
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
            },
            storyTreeApp: {
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

    secoundStorynex() {
        this.storySecoundApp = "hidden";
        this.storyTreeApp = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
    }

    treeStory() {
        this.storyTreeApp = "hidden";
        this.storySecoundApp = ""; // Menambahkan kelas "hidden" pada travelAppSplashClass
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

class desPhdet extends PolymerElement {
    static get template() {
        return html`
            <style>
            :host {
                display: flex;
                justify-content: space-around;
                align-items: flex-start;
                padding: 16px 0 16px 0;
                background-color: white;
                flex-direction: column;
                gap: 15px;
            }

            .detail {
                display: flex;
                align-items: center;
                font-size: 18px;
                color: black;
                border: none;
                height: 40px;
            }

            .detail-btn-container {
                display: flex;
                flex-direction: row;
                align-content: center;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: center;
                background-color: #efefef;
                width: 100%;
            }

            .app-switcher-button-icon {
                position: relative;
                width: 20px;
                height: 20px;
                fill: black;
                top:50%
                transform: translateY(0%);
            }

            .detail-text {
                font-size: 14px;
                color: #212121;
                padding: 15px;
                border-radius: 15px;
                line-height: 20px;
                background-color: #efefef;
            }

            @media (prefers-color-scheme: dark) {
                :host {
                background-color: black;
                }
                .detail {
                color: white;
                background-color: #323e55;
                }
                .detail-btn-container {
                    background-color: #323e55;
                }
                .app-switcher-button-icon {
                fill: white;
                }
                .detail-text {
                color: #bbb;
                background-color: #2e3b57;
                }
            }
            </style>

            <div class="detail-btn-container">
                <button class="detail">Tentang Departemen ini</button>
                <svg class="app-switcher-button-icon" version="1.1" id="Layer_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff">
                    <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path>
                    <path fill="none" d="M0,0h24v24H0V0z"></path>
                </svg>
            </div>
            <div class="detail-text">PH merupakan departemen yang bertanggungjawab mengkoordinasikan seluruh departemen di UKMP</div>
        `
    }
}

customElements.define("arunika-detail-ph", desPhdet)

class UKMPKartuSosFu extends PolymerElement {
    constructor() {
        super();
        this.addEventListener("mouseenter", this.handleMouseEnter.bind(this));
        this.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
        this.addEventListener('click', this.showPrestasiDetail)
        this.addEventListener('dbclick', this.cancelPrestasiDetail)
    }

    connectedCallback() {
        super.connectedCallback();
        this._addShadowBox();
        this.modal = this.shadowRoot.getElementById("Prestasi");
        this.modal.addEventListener("click", this.handleOutsideClick.bind(this));
    }

    showPrestasiDetail() {
        const modal = this.shadowRoot.querySelector("#Prestasi");
        modal.classList.add("modal");
        document.documentElement.style.overflowY = "hidden"; // Menambahkan gaya overflow-y: hidden pada tag <html>
    }

    cancelPrestasiDetail() {
        const modal = this.shadowRoot.querySelector("#Prestasi");
        modal.classList.remove("modal");
        document.documentElement.style.overflowY = ""; // Menambahkan gaya overflow-y: hidden pada tag <html>
        this.closeModal();
    }
    handleOutsideClick(event) {
        if (event.target === this.modal) {
            this.closeModal();
            this.cancelPrestasiDetail();
        }
    }

    handleMouseEnter() {
        const modal = this.shadowRoot.querySelector("#Prestasi");
        const h3 = this.shadowRoot.querySelector(".card-header");
        const p = this.shadowRoot.querySelector(".card-body");
        const a = this.shadowRoot.querySelector(".card-link");
        modal.classList.add("modal")
        h3.classList.add("show");
        p.classList.add("show");
        a.classList.add("show");
        document.documentElement.style.overflowY = "hidden"; // Menambahkan gaya overflow-y: hidden pada tag <html>
    }

    handleMouseLeave() {
        const modal = this.shadowRoot.querySelector("#Prestasi");
        const h3 = this.shadowRoot.querySelector(".card-header");
        const p = this.shadowRoot.querySelector(".card-body");
        const a = this.shadowRoot.querySelector(".card-link");
        h3.classList.remove("show");
        modal.classList.remove("modal")
        p.classList.remove("show");
        a.classList.remove("show");
        document.documentElement.style.overflowY = ""; // Menambahkan gaya overflow-y: hidden pada tag <html>
        this.closeModal();
    }

    static get template() {
        return html`
        <style>
          :host([modal]:not([nama-orang]):not([jenis-jabatan]):not([tahun-prestasi]):not([juara-prestasi])) #Prestasi {
            display: none;
          }

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

          #Prestasi {
            display: none;
          }

          #Prestasi.modal {
            display: block;
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
            bottom: 70px;
            left: 50%;
            transform: translate(-50%);
            background-color: #fff;
            padding: 10px;
            width: 85%;
            border-radius: 30px;
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

        .header-prestasi {
            display: flex;
            align-items: center;
            margin-top: 12px;
            position: relative;
            justify-content: space-between;
            height: 60px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
          }
        
          th, td {
            padding: 10px;
            text-align: left;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            color: white;
          }

          tr {
            background-color: #08487b;
          }
        
          th {
            text-align: center;
            background-color: #0056b3;
          }

        image-component {
            width: 50px;
            height: 50px;
            background-size: cover;
        }

        .tahun {
            color: black;
        }

        .body-prestasi {
            display: block;
        }
  
          @media (prefers-color-scheme: dark) {
            .card {
              --card-color: var(--card-dark-color, #f4f4f4);
              --card-background-color: var(--card-dark-background-color, #161b22);
              --card-background-image: var(--card-dark-background-image, url("") 0.1);
              box-shadow: var(--card-box-shadow, none);
            }

            .tahun {
                color: white;
            }

            .modal-content {
                background-color: #161b22;
            }

            th, td {
                color: white;
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
        <div id="Prestasi" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
            <div class="modal-content">
                <div class="swipe-indicator"></div>
                <div class="header-prestasi">
                <image-component style$="background-image: url([[backgroundImage]]);"></image-component>
                </div>
                <div class="body-prestasi">
                <table>
                    <tr>
                    <th>Nama</th>
                    <th>Jenis Jabatan</th>
                    <th>Tahun Fungsio</th>
                    </tr>
                    <tr>
                    <td>[[namaOrang]]</td>
                    <td>[[jenisJabatan]]</td>
                    <td>[[tahunFungsio]]</td>
                    </tr>
                </table>
                </div>
            </div>
        </div>
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
            },
            modal: {
                type: Boolean,
                value: false,
                observer: '_modalChanged',
            },
            namaOrang: {
                type: String,
                value: '',
            },
            jenisJabatan: {
                type: String,
                value: '',
            },
            tahunFungsio: {
                type: String,
                value: '',
            },
        }
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
            this.resetModalPosition();
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
        const modal = this.shadowRoot.querySelector("#Prestasi");
        modal.classList.remove("modal");
        modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
        document.documentElement.style.overflowY = ""; // Menghapus gaya overflow-y: hidden dari tag <html>
    }

    _modalChanged(modal) {
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
customElements.define("ukmp-detail-fungsio-ph", UKMPKartuSosFu);

class UKMPKartuSosPres extends PolymerElement {
    constructor() {
        super();
        this.addEventListener("mouseenter", this.handleMouseEnter.bind(this));
        this.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
        this.addEventListener('click', this.showPrestasiDetail)
        this.addEventListener('dbclick', this.cancelPrestasiDetail)
    }

    connectedCallback() {
        super.connectedCallback();
        this._addShadowBox();
        this.modal = this.shadowRoot.getElementById("Prestasi");
        this.modal.addEventListener("click", this.handleOutsideClick.bind(this));
    }

    showPrestasiDetail() {
        const modal = this.shadowRoot.querySelector("#Prestasi");
        modal.classList.add("modal");
        document.documentElement.style.overflowY = "hidden"; // Menambahkan gaya overflow-y: hidden pada tag <html>
    }

    cancelPrestasiDetail() {
        const modal = this.shadowRoot.querySelector("#Prestasi");
        modal.classList.remove("modal");
        document.documentElement.style.overflowY = ""; // Menambahkan gaya overflow-y: hidden pada tag <html>
        this.closeModal();
    }
    handleOutsideClick(event) {
        if (event.target === this.modal) {
            this.closeModal();
            this.cancelPrestasiDetail();
        }
    }

    handleMouseEnter() {
        const modal = this.shadowRoot.querySelector("#Prestasi");
        const h3 = this.shadowRoot.querySelector(".card-header");
        const p = this.shadowRoot.querySelector(".card-body");
        const a = this.shadowRoot.querySelector(".card-link");
        modal.classList.add("modal")
        h3.classList.add("show");
        p.classList.add("show");
        a.classList.add("show");
        document.documentElement.style.overflowY = "hidden"; // Menambahkan gaya overflow-y: hidden pada tag <html>
    }

    handleMouseLeave() {
        const modal = this.shadowRoot.querySelector("#Prestasi");
        const h3 = this.shadowRoot.querySelector(".card-header");
        const p = this.shadowRoot.querySelector(".card-body");
        const a = this.shadowRoot.querySelector(".card-link");
        h3.classList.remove("show");
        modal.classList.remove("modal")
        p.classList.remove("show");
        a.classList.remove("show");
        document.documentElement.style.overflowY = ""; // Menambahkan gaya overflow-y: hidden pada tag <html>
        this.closeModal();
    }

    static get template() {
        return html`
        <style>
          :host([modal]:not([nama-orang]):not([jenis-prestasi]):not([tahun-prestasi]):not([juara-prestasi])) #Prestasi {
            display: none;
          }

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

          #Prestasi {
            display: none;
          }

          #Prestasi.modal {
            display: block;
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
            bottom: 70px;
            left: 50%;
            transform: translate(-50%);
            background-color: #fff;
            padding: 10px;
            width: 340px;
            border-radius: 30px;
        }

        .indentitas-prestasi {
            display: flex;
            align-items: center;
            width: max-content;
            position: relative;
            left: -50%;
            transform: translateX(50%);
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

        .header-prestasi {
            display: flex;
            align-items: center;
            margin-top: 12px;
            position: relative;
            justify-content: space-between;
            height: 60px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
          }
        
          th, td {
            padding: 10px;
            text-align: left;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            color: white;
          }

          tr {
            background-color: #08487b;
          }
        
          th {
            text-align: center;
            background-color: #0056b3;
          }

        image-component {
            width: 50px;
            height: 50px;
            background-size: cover;
        }

        .tahun {
            color: black;
        }

        .body-prestasi {
            display: block;
        }
  
          @media (prefers-color-scheme: dark) {
            .card {
              --card-color: var(--card-dark-color, #f4f4f4);
              --card-background-color: var(--card-dark-background-color, #161b22);
              --card-background-image: var(--card-dark-background-image, url("") 0.1);
              box-shadow: var(--card-box-shadow, none);
            }

            .tahun {
                color: white;
            }

            .modal-content {
                background-color: #161b22;
            }

            th, td {
                color: white;
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
        <div id="Prestasi" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
            <div class="modal-content">
                <div class="swipe-indicator"></div>
                <div class="header-prestasi">
                <image-component style$="background-image: url([[backgroundImage]]);"></image-component>
                <div class="indentitas-prestasi">
                    <image-component src="https://ukmpapps.web.app/apps/6.png" alt=""></image-component>
                    <ukmp-text class="tahun" text$="Prestasi [[tahunPrestasi]]">[[title]]</ukmp-text>
                </div>
                </div>
                <div class="body-prestasi">
                <table>
                    <tr>
                    <th>Nama</th>
                    <th>Jenis Prestasi</th>
                    <th>Tahun Prestasi</th>
                    <th>Juara Prestasi</th>
                    </tr>
                    <tr>
                    <td>[[namaOrang]]</td>
                    <td>[[jenisPrestasi]]</td>
                    <td>[[tahunPrestasi]]</td>
                    <td>[[juaraPrestasi]]</td>
                    </tr>
                </table>
                </div>
            </div>
        </div>
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
            },
            modal: {
                type: Boolean,
                value: false,
                observer: '_modalChanged',
            },
            namaOrang: {
                type: String,
                value: '',
            },
            jenisPrestasi: {
                type: String,
                value: '',
            },
            tahunPrestasi: {
                type: String,
                value: '',
            },
            juaraPrestasi: {
                type: String,
                value: '',
            },
        }
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
            this.resetModalPosition();
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
        const modal = this.shadowRoot.querySelector("#Prestasi");
        modal.classList.remove("modal");
        modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
        document.documentElement.style.overflowY = ""; // Menghapus gaya overflow-y: hidden dari tag <html>
    }

    _modalChanged(modal) {
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
customElements.define("ukmp-story-prestasi", UKMPKartuSosPres);

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