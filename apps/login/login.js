// Import dependencies
import { PolymerElement, html } from "../../../node_modules/@polymer/polymer/polymer-element.js";

const ukmpApp = document.createElement("login-page");
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

// Define the login page element
class LoginPage extends PolymerElement {
  static get template() {
    return html`
      <style>
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }
        
        .skeleton {
          animation: skeleton-loading 1s infinite ease-in-out;
          background: linear-gradient(-90deg, #000000 0%, #f2f2f2 50%, #000000 100%);
          background-size: 200% 100%;
          animation-direction: alternate;
        }
        
        @keyframes skeleton-loading {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          margin-top: 35px;
          background-color: #f2f2f2;
        }
        
        ukmp-text.login {
          font-size: 30px;
          color: black;
        }
        
        .input {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
          width: 100%;
          font-size: 30px;
        }
        
        label {
          margin-bottom: 8px;
          color: black;
        }
        
        input[type="text"],
        input[type="password"] {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #dddddd;
          outline: none;
          width: 100%;
          height: 45px;
        }
        
        .button {
          padding: 8px 16px;
          border: none;
          border-radius: 100px;
          color: #ffffff;
          background-color: black;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          width: 100%;
          height: 60px;
          font-size: 35px;
        }
        
        .button:hover {
          color: black;
          background-color: #3b3b3b;
        }
        
        .link {
          margin-top: 8px;
          text-align: center;
          width: 100%;
          height: 60px;
          font-size: 35px;
        }
        
        .link a {
          color: black;
          text-decoration: none;
        }
        
        .link a:hover {
          text-decoration: underline;
        }
        
        arunika-app-now {
          width: 100%;
          height: 100%;
        }
        
        arunika-app-now arunika-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          height: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: #212121fa;
          background-color: rgb(248 248 248 / 50%);
          color: black;
          transition: transform 0.3s ease-in-out;
          backdrop-filter: blur(10px);
        }
        
        arunika-app-now arunika-header .logo {
          position: absolute;
          left: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        arunika-app-now arunika-header .logo img {
          width: 50px;
        }
        
        .hidden {
          display: none;
        }
        
        arunika-story-panel {
          width: 100%;
          height: max-content;
          position: absolute;
          top: 22%;
          left: 0;
          background-color: #f2f2f2;
          color: black;
          z-index: 2;
          border-radius: 25px 25px 0 0;
        }
        
        .slide-top {
          width: 80px;
          height: 10px;
          border-radius: 100px;
          left: 50%;
          transform: translate(-50%);
          background-color: #bfbfbf;
          position: absolute;
          margin-top: 10px;
        }

        .slide-top-modal {
          width: 80px;
          height: 10px;
          border-radius: 100px;
          left: 50%;
          transform: translate(-50%);
          background-color: #bfbfbf;
          position: absolute;
          margin-top: 0;
        }
        
        arunika-video {
          position: fixed;
          left: 0;
          top: 60px;
        }

        .password-toggle {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translate(-10%, -100%);
          color: black;
          cursor: pointer;
        }
        
        .password-toggle .open-eye {
          display: none;
        }
        
        .password-toggle.visible .closed-eye {
          display: none;
        }
        
        .password-toggle.visible .open-eye {
          display: inline-block;
        }

        .modal {
          display: none;
          position: fixed;
          z-index: 9999;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.4);
        }
      
        .modal-content {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background-color: #fefefe;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 90%;
          height: max-content;
          text-align: center;
          border-radius: 25px;
          color: black;
        }
      
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
        }
      
        .close:hover,
        .close:focus {
          color: #000;
          text-decoration: none;
          cursor: pointer;
        }  
        
        .headca {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-top: 12px;
          position: relative;
          gap: 35%
        }

        .profile-ac image-component {
          width: 50px;
          position: relative;
        }

        .profile-ac {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          left: 0;
          position: relative;
          transform: translateX(-25%);
        }
        
        @media (prefers-color-scheme: dark) {
          arunika-story-panel {
            background-color: #0d1117;
          }
          .container {
            background-color: #0d1117;
          }
        
          ukmp-text {
            color: white;
          }
          label {
            color: white;
          }
          .link a {
            color: white;
          }
        
          .button {
            color: black;
            background-color: #ffffff;
          }
        
          .button:hover {
            color: #ffffff;
            background-color: black;
          }
        
          ukmp-text.login {
            font-size: 30px;
            color: white;
          }
        
          .skeleton {
            animation: skeleton-loading 1s infinite ease-in-out;
            background: linear-gradient(-90deg, #ffffff 0%, #3b3b3b 50%, #ffffff 100%);
            background-size: 200% 100%;
            animation-direction: alternate;
          }

          .password-toggle {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translate(-10%, 50%);
            color: white;
            cursor: pointer;
          }
          
          .password-toggle .open-eye {
            display: none;
          }
          
          .password-toggle.visible .closed-eye {
            display: none;
          }
          
          .password-toggle.visible .open-eye {
            display: inline-block;
          }
          .modal {
            display: none;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
          }
        
          .modal-content {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);  
            background-color: #1a202c;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 90%;
            height: max-content;
            text-align: center;
            border-radius: 25px;
            color: white;
          }
        
          .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
          }
        
          .close:hover,
          .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
          }
        }
        
        /* Tampilan umum untuk semua perangkat Android */
        @media only screen and (max-width: 480px) {
          arunika-story-panel {
            --top-percentage: 22%;
            top: var(--top-percentage);
          }
        }
        
        /* Tampilan Samsung */
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 360px) and (device-height: 640px) {
          arunika-story-panel {
            --top-percentage: 35%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 414px) and (device-height: 896px) {
          arunika-story-panel {
            --top-percentage: 30%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 540px) and (device-height: 960px) {
          arunika-story-panel {
            --top-percentage: 35%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 720px) and (device-height: 1280px) {
          arunika-story-panel {
            --top-percentage: 35%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 1080px) and (device-height: 1920px) {
          arunika-story-panel {
            --top-percentage: 35%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        
        /* Tampilan iPhone */
        
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 375px) and (device-height: 667px) {
          arunika-story-panel {
            --top-percentage: 35%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 414px) and (device-height: 736px) {
          arunika-story-panel {
            --top-percentage: 35%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 375px) and (device-height: 812px) {
          arunika-story-panel {
            --top-percentage: 30%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 414px) and (device-height: 896px) {
          arunika-story-panel {
            --top-percentage: 30%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 390px) and (device-height: 844px) {
          arunika-story-panel {
            --top-percentage: 30%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        
        /* Tampilan Xiaomi */
        
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 360px) and (device-height: 640px) {
          arunika-story-panel {
            --top-percentage: 35%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 393px) and (device-height: 851px) {
          arunika-story-panel {
            --top-percentage: 30%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 412px) and (device-height: 846px) {
          arunika-story-panel {
            --top-percentage: 32%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 1080px) and (device-height: 2340px) {
          arunika-story-panel {
            --top-percentage: 35%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        
        /* Tampilan Realme */
        
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 360px) and (device-height: 720px) {
          arunika-story-panel {
            --top-percentage: 32%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 412px) and (device-height: 869px) {
          arunika-story-panel {
            --top-percentage: 35%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 1080px) and (device-height: 2400px) {
          arunika-story-panel {
            --top-percentage: 35%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        
        /* Tampilan Oppo */
        
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 360px) and (device-height: 720px) {
          arunika-story-panel {
            --top-percentage: 32%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 393px) and (device-height: 851px) {
          arunika-story-panel {
            --top-percentage: 30%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 412px) and (device-height: 870px) {
          arunika-story-panel {
            --top-percentage: 30%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 1080px) and (device-height: 2340px) {
          arunika-story-panel {
            --top-percentage: 35%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        
        /* Tampilan Vivo */
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 360px) and (device-height: 720px) {
          arunika-story-panel {
            --top-percentage: 32%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 393px) and (device-height: 853px) {
          arunika-story-panel {
            --top-percentage: 30%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 412px) and (device-height: 869px) {
          arunika-story-panel {
            --top-percentage: 30%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 1080px) and (device-height: 2340px) {
          arunika-story-panel {
            --top-percentage: 35%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        
        /* Tampilan Lenovo */
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 360px) and (device-height: 640px) {
          arunika-story-panel {
            --top-percentage: 35%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 410px) and (device-height: 721px) {
          arunika-story-panel {
            --top-percentage: 35%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
        @media only screen and (-webkit-device-pixel-ratio: 2),
          only screen and (device-width: 1080px) and (device-height: 2340px) {
          arunika-story-panel {
            --top-percentage: 35%; /* Ubah persentasenya sesuai kebutuhan */
            top: var(--top-percentage);
          }
        }
      </style>
      <div id="errorModal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
        <div class="modal-content">
          <div class="slide-top-modal"></div>
          <div class="headca">
            <span class="close">&times;</span>
            <div class="profile-ac">
              <image-component src="../logo/ukmp-logo-144x144.png"/></image-component>
              <ukmp-text text="Gagal Login"></ukmp-text>
            </div>
          </div>
          <p id="errorMessage"></p>
        </div>
      </div>
      <arunika-app-now>
        <arunika-header>
            <div class="logo">
              <img src="https://ukmpapps.web.app/apps/logo/arunika.png" alt="Logo">
              <ukmp-text class="login" text="Login">Login</ukmp-text>
            </div>
        </arunika-header>
        <arunika-content>
            <arunika-video src="/../../about/LAUNCHING LOGO.mp4" alt="Gambar 1" show-sinematik></arunika-video sinematik>
            <arunika-story-panel>
              <div class="slide-top"></div>
              <div class="container">
                <ukmp-text text="Login" style="font-size:40px;">Login</ukmp-text>
                <div id="input-use" class="input skeleton">
                  <label class="skeleton" for="Username" >Username:</label>
                  <input class="skeleton" id="usernameInput" type="text" aria-label="Username" placeholder="Username">
                </div>
                <div id="input-pw" class="input skeleton">
                  <label class="skeleton" for="Pasword">Password:</label>
                  <div class="password-container skeleton">
                    <input class="skeleton" id="passwordInput" type="password" aria-label="Password" placeholder="Password" required>
                    <span class="password-toggle" id="togglePassword">
                      <span class="open-eye">&#x1F441;</span>
                      <span class="closed-eye">&#x1F576;</span>
                    </span>
                  </div>
                </div>
                <button class="button skeleton" on-click="login">Login</button>
                <div class="link">
                  <a class="skeleton" href="/apps/reg/reg.html">Sign up</a>
                </div>
              </div>
            </arunika-story-panel>
        </arunika-content>
      </arunika-app-now>
  
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
      window.location.href = '/apps/';
    } else {
      // Show error modal
      const modal = this.shadowRoot.getElementById('errorModal');
      const errorMessage = this.shadowRoot.getElementById('errorMessage');
      errorMessage.textContent = 'Invalid username or password';
      modal.style.display = 'block';
    }

    // Fill username and password fields with the registered values
    const registeredUsername = localStorage.getItem('registeredUsername');
    const registeredPassword = localStorage.getItem('registeredPassword');
    if (registeredUsername && registeredPassword) {
      this.$.usernameInput.value = registeredUsername;
      this.$.passwordInput.value = registeredPassword;
    }
  }

  handleTouchStart(e) {
    this.startY = e.touches[0].pageY;
    this.modalStartPosition = this.modal.getBoundingClientRect().top;
  }

  handleTouchMove(e) {
    const deltaY = e.touches[0].pageY - this.startY;
    this.moveModal(deltaY);

    // Prevent vertical scrolling while swiping
    e.preventDefault();
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
    this.modal.style.transform = '';
  }

  handleOutsideClick(event) {
    if (event.target === this.modal) {
      this.closeModal();
    }
  }

  closeModal() {
    const modal = this.shadowRoot.getElementById('errorModal');
    const closeButton = modal.querySelector('.close');

    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    this.modal = this.shadowRoot.getElementById('errorModal');
    this.modal.style.display = 'none';

    // Menghapus event listener touchstart, touchmove, dan touchend
    modal.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    modal.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    modal.removeEventListener('touchend', this.handleTouchEnd.bind(this));

    // Menghapus gaya overflow-y: hidden dari tag <html>
    document.documentElement.style.overflowY = '';
  }

  connectedCallback() {
    super.connectedCallback();

    const togglePassword = this.shadowRoot.querySelector('#togglePassword');
    togglePassword.addEventListener('click', this.togglePasswordVisibility.bind(this));
    this.modal = this.shadowRoot.getElementById('errorModal');
    this.modal.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.modal.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.modal.addEventListener('touchend', this.handleTouchEnd.bind(this));
    const closeButton = this.shadowRoot.querySelector('.close');
    closeButton.addEventListener('click', this.closeModal.bind(this));
    // Check if user is logged in
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      // Get stored username
      const storedUsername = localStorage.getItem('username');
      // Set the stored username in the input field
      this.$.usernameInput.value = storedUsername;
      // Get stored password (if applicable)
      const storedPassword = localStorage.getItem('password');
      // Set the stored password in the input field (if applicable)
      if (storedPassword) {
        this.$.passwordInput.value = storedPassword;
      }
    }
    // Menampilkan Skeleton CSS saat halaman dimuat
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.querySelector('html').setAttribute('dark-theme', '');
      document.body.style.backgroundColor = '#0d111';
      document.body.style.color = '#f4f4f4';

      // Ubah src image-component cloud menjadi path gambar tema gelap
      const cloudImageComponent = this.shadowRoot.querySelector('.ukmp-logo');
      if (cloudImageComponent) {
        cloudImageComponent.setAttribute('src', '/../../logo/ukmp-logo-512x512-white.png');
      }

    }// Menampilkan Skeleton CSS saat halaman dimuat
    const skeletonElements = this.shadowRoot.querySelectorAll('.skeleton');
    skeletonElements.forEach(element => {
      element.classList.add('skeleton-loading');
    });

    // Menghentikan Skeleton CSS setelah konten selesai dimuat
    window.addEventListener('load', () => {
      skeletonElements.forEach(element => {
        element.classList.remove('skeleton');
      });
    });
  }

  togglePasswordVisibility() {
    const passwordInput = this.$.passwordInput;
    const togglePassword = this.shadowRoot.querySelector('#togglePassword');

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePassword.classList.add('visible');
    } else {
      passwordInput.type = 'password';
      togglePassword.classList.remove('visible');
    }
  }

  showSkeleton() {
    // Menghilangkan atribut 'disabled' pada elemen-elemen yang memiliki Skeleton CSS
    this.shadowRoot.getElementById('usernameInput').removeAttribute('disabled');
    this.shadowRoot.getElementById('passwordInput').removeAttribute('disabled');
    this.shadowRoot.querySelector('.button').removeAttribute('disabled');

    // Menghilangkan kelas 'skeleton' pada elemen-elemen yang memiliki Skeleton CSS
    const skeletonElements = this.shadowRoot.querySelectorAll('.skeleton');
    skeletonElements.forEach(element => {
      element.classList.remove('skeleton');
    });
  }

  hideSkeleton() {
    // Menambahkan atribut 'disabled' pada elemen-elemen yang memiliki Skeleton CSS
    this.shadowRoot.getElementById('usernameInput').setAttribute('disabled', 'true');
    this.shadowRoot.getElementById('passwordInput').setAttribute('disabled', 'true');
    this.shadowRoot.querySelector('.button').setAttribute('disabled', 'true');

    // Menambahkan kelas 'skeleton' pada elemen-elemen yang memiliki Skeleton CSS
    const skeletonElements = this.shadowRoot.querySelectorAll('.input');
    skeletonElements.forEach(element => {
      element.classList.add('skeleton');
    });
  }
}

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
          font-size: 25px;
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
  
        <video id="video" class="shadow-overlay" src="[[src]]" alt="[[alt]]" controls></video>
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

customElements.define('arunika-video', VideoComponent);

// Register the login page element
customElements.define('login-page', LoginPage);