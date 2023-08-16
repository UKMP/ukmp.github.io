// Import dependencies
import { PolymerElement, html } from "/../../../node_modules/@polymer/polymer/polymer-element.js";

const ukmpApp = document.createElement("registration-page");
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

// Define the registration page element
class RegistrationPage extends PolymerElement {
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
          font-size: 25px;
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
        
        arunika-video {
          position: fixed;
          left: 0;
          top: 60px;
        }

        .input.required input:invalid {
          border: 2px solid red;
          animation: shake 0.5s ease-in-out;
        }

        .headpw {
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: space-between;
        }

        .headpw#generateButton {
          background-color: transparent;
          border: 1px solid black;
          height: 35px;
          border-radius: 100px;
          color: black;
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-10px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(10px);
          }
        }

        #passwordStrengthIndicator {
          height: 5px;
          margin-top: 8px;
        }
        
        #passwordStrengthText {
          margin-top: 4px;
          font-size: 12px;
          font-weight: bold;
          color: black;
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

        .headca {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-top: 12px;
          position: relative;
          gap: 10%;
          margin-bottom: 30px;
          flex-direction: row-reverse;
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
            float: left;
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
          
          #passwordStrengthText {
            color: white;
          }

          .headpw {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }

          #generateButton {
            background-color: transparent;
            border: 1px solid white;
            height: 35px;
            border-radius: 100px;
            color: white;
          }

          .password-toggle {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translate(-10%, -100%);
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
              <ukmp-text text="Gagal Membuat Akun"></ukmp-text>
            </div>
          </div>
          <span id="errorMessage"></span>
        </div>
      </div>

      <div id="successModal" class="modal" on-touchstart="handleTouchStart" on-touchmove="handleTouchMove" on-touchend="handleTouchEnd">
        <div class="modal-content">
          <div class="slide-top-modal"></div>
          <div class="headca">
            <span class="close">&times;</span>
            <div class="profile-ac">
              <image-component src="../logo/ukmp-logo-144x144.png"/></image-component>
              <ukmp-text text="Berhasil Membuat Akun" style="font-size: 24px;"></ukmp-text>
            </div>
          </div>
          <span>Registration successful. Please log in.</span>
        </div>
      </div>

      <arunika-app-now>
        <arunika-header>
          <div class="logo">
            <img src="https://ukmpapps.web.app/apps/logo/arunika.png" alt="Logo">
            <ukmp-text class="login" text="Sign Up">Sign Up</ukmp-text>
          </div>
        </arunika-header>
        <arunika-content>
          <arunika-video src="/../../about/LAUNCHING LOGO.mp4" alt="Gambar 1" show-sinematik></arunika-video sinematik>
          <arunika-story-panel>
            <div class="slide-top"></div>
            <div class="container">
            <ukmp-text text="Sign Up">Sign Up</ukmp-text>
            <div id="input-name" class="input skeleton required">
              <label for="Full Name">Full Name:</label>
              <input id="fullNameInput" type="text" aria-label="Full Name" placeholder="Full Name" required>
            </div>
            <div id="input-use" class="input skeleton required">
              <label for="Username">Username:</label>
              <input id="usernameInput" type="text" aria-label="Username" placeholder="Username" required>
            </div>
            <div id="input-pw" class="input skeleton required">
              <div class="headpw">
                <label for="Pasword">Password:</label>
                <button id="generateButton">Generate Password</button>
              </div>
              <div class="password-container">
                <input id="passwordInput" type="password" aria-label="Password" placeholder="Password" required>
                <span class="password-toggle" id="togglePassword">
                  <span class="open-eye">&#x1F441;</span>
                  <span class="closed-eye">&#x1F576;</span>
                </span>
              </div>
              <div id="passwordStrengthIndicator"></div>
              <span id="passwordStrengthText"></span>
            </div>
            <div id="input-dep" class="input skeleton required">
              <label for="Departement">Department:</label>
              <input id="departmentInput" type="text" aria-label="Departement" placeholder="Departement" required>
            </div>
            <div id="input-pos" class="input skeleton required">
              <label for="Posisi">Position:</label>
              <input id="positionInput" type="text" aria-label="Posisi" placeholder="Posisi" required>
            </div>
            <button class="button skeleton" on-click="signup">Sign Up</button>
            <div class="link skeleton">
              <a href="/apps/login/login.html">Already have an account? Log in</a>
            </div>
          </div>
          </arunika-story-panel>
        </arunika-content>
      </arunika-app-now>

    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const errorModalCloseButton = this.shadowRoot.querySelector('#errorModal .close');
    errorModalCloseButton.addEventListener('click', () => {
      this.closeModal('errorModal');
    });

    // Close success modal when close button is clicked
    const successModalCloseButton = this.shadowRoot.querySelector('#successModal .close');
    successModalCloseButton.addEventListener('click', () => {
      this.closeModal('successModal');
    });

    // Add touch event listeners for swipe-to-close
    this.modal = this.shadowRoot.getElementById('errorModal');
    this.modal.addEventListener("touchstart", this.handleTouchStart.bind(this));
    this.modal.addEventListener("touchmove", this.handleTouchMove.bind(this));
    this.modal.addEventListener("touchend", this.handleTouchEnd.bind(this));

    this.succesModal = this.shadowRoot.getElementById('successModal');
    this.succesModal.addEventListener("touchstart", this.handleTouchStartS.bind(this));
    this.succesModal.addEventListener("touchmove", this.handleTouchMoveS.bind(this));
    this.succesModal.addEventListener("touchend", this.handleTouchEndS.bind(this));
    const generateButton = this.shadowRoot.querySelector('#generateButton');
    generateButton.addEventListener('click', this.generatePassword.bind(this));
    this.$.passwordInput.addEventListener('input', this.checkPasswordStrength.bind(this));
    const togglePassword = this.shadowRoot.querySelector('#togglePassword');
    togglePassword.addEventListener('click', this.togglePasswordVisibility.bind(this));
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

    } const skeletonElements = this.shadowRoot.querySelectorAll('.skeleton');
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

  generatePassword() {
    const password = this.generateRandomPassword();
    this.$.passwordInput.value = password;
    this.checkPasswordStrength();
  }

  generateRandomPassword() {
    // Logika untuk menghasilkan password acak
    // Di sini, sebagai contoh, kita menggunakan kombinasi karakter alphanumeric

    const length = 10;
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars.charAt(randomIndex);
    }

    return password;
  }

  checkPasswordStrength() {
    const password = this.$.passwordInput.value;
    const strengthText = this.shadowRoot.querySelector('#passwordStrengthText');
    const strengthIndicator = this.shadowRoot.querySelector('#passwordStrengthIndicator');

    // Periksa kekuatan sandi menggunakan logika yang sesuai (misalnya, menggunakan pola atau pustaka validasi)
    // Di sini, sebagai contoh, kita hanya memeriksa panjang sandi minimal
    if (password.length < 8) {
      strengthText.textContent = 'Password Strength: Weak';
      strengthIndicator.style.backgroundColor = 'red';
    } else {
      strengthText.textContent = 'Password Strength: Strong';
      strengthIndicator.style.backgroundColor = 'green';
    }
  }

  showSkeleton() {
    // Menghilangkan atribut 'disabled' pada elemen-elemen yang memiliki Skeleton CSS
    this.shadowRoot.getElementById('usernameInput').removeAttribute('disabled');
    this.shadowRoot.getElementById('passwordInput').removeAttribute('disabled');
    this.shadowRoot.getElementById('passwordInput').removeAttribute('disabled');
    this.shadowRoot.getElementById('fullNameInput').removeAttribute('disabled');
    this.shadowRoot.getElementById('departmentInput').removeAttribute('disabled');
    this.shadowRoot.getElementById('positionInput').removeAttribute('disabled');
    this.shadowRoot.querySelector('.button').removeAttribute('disabled');

    // Menghilangkan kelas 'skeleton' pada elemen-elemen yang memiliki Skeleton CSS
    const skeletonElements = this.shadowRoot.querySelectorAll('.skeleton');
    skeletonElements.forEach(element => {
      element.classList.remove('skeleton');
    });
  }

  hideSkeleton() {
    // Menambahkan atribut 'disabled' pada elemen-elemen yang memiliki Skeleton CSS
    this.shadowRoot.getElementById('usernameInput').removeAttribute('true');
    this.shadowRoot.getElementById('passwordInput').removeAttribute('true');
    this.shadowRoot.getElementById('passwordInput').removeAttribute('true');
    this.shadowRoot.getElementById('fullNameInput').removeAttribute('true');
    this.shadowRoot.getElementById('departmentInput').removeAttribute('true');
    this.shadowRoot.getElementById('positionInput').removeAttribute('true');
    this.shadowRoot.querySelector('.button').setAttribute('disabled', 'true');

    // Menambahkan kelas 'skeleton' pada elemen-elemen yang memiliki Skeleton CSS
    const skeletonElements = this.shadowRoot.querySelectorAll('.input');
    skeletonElements.forEach(element => {
      element.classList.add('skeleton');
    });
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

    // Periksa apakah semua field yang diperlukan telah diisi
    if (!fullName || !username || !password || !department || !position) {
      const errorModal = this.shadowRoot.getElementById('errorModal');
      const errorMessage = this.shadowRoot.getElementById('errorMessage');
      errorMessage.textContent = 'Please fill in all required fields';
      errorModal.style.display = 'block';
      document.documentElement.style.overflowY = 'hidden';
      return; // Berhenti menjalankan fungsi jika ada field yang kosong
    }

    if (existingUser) {
      const errorModal = this.shadowRoot.getElementById('errorModal');
      const errorMessage = this.shadowRoot.getElementById('errorMessage');
      errorMessage.textContent = 'Username already exists';
      errorModal.style.display = 'block';
      document.documentElement.style.overflowY = 'hidden';
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

      const successModal = this.shadowRoot.getElementById('successModal');
      successModal.style.display = 'block';

      // Redirect to login page
      setTimeout(() => {
        window.location.href = '/apps/login/login.html';
      }, 2000);
    }
  }


  handleTouchStartS(e) {
    this.startY = e.touches[0].pageY;
    this.modalStartPosition = this.modal.getBoundingClientRect().top;
  }

  handleTouchMoveS(e) {
    const deltaY = e.touches[0].pageY - this.startY;
    this.moveModal(deltaY);
  }

  handleTouchEndS(e) {
    const deltaY = e.changedTouches[0].pageY - this.startY;
    if (deltaY > 100) {
      this.closeModalS();
      this.resetModalPositionS();
    } else {
      this.resetModalPosition();
    }
  }

  moveModalS(deltaY) {
    this.succesModal.style.transform = `translateY(${deltaY}px)`;
  }

  resetModalPositions() {
    this.succesModal.style.transform = "";
  }

  closeModal() {
    const succesModal = this.shadowRoot.getElementById("successModal");
    succesModal.style.display = 'none';
    this.succesModal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
    this.succesModal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
    this.succesModal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
    document.documentElement.style.overflowY = "";
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
    const modal = this.shadowRoot.getElementById("errorModal");
    modal.style.display = 'none';
    this.modal.removeEventListener("touchstart", this.handleTouchStart.bind(this));
    this.modal.removeEventListener("touchmove", this.handleTouchMove.bind(this));
    this.modal.removeEventListener("touchend", this.handleTouchEnd.bind(this));
    document.documentElement.style.overflowY = "";
  }

}

// Register the registration page element
customElements.define('registration-page', RegistrationPage);

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
          height: 100vh;
        }
        .button {
          margin-top: 16px;
        }
        .file-actions {
          margin-top: 16px;
        }
        .pdf-viewer {
          width: 100%;
          height: 500px;
          border: 1px solid #ccc;
          margin-top: 16px;
        }
      </style>
      <div class="container">
        <h2>Welcome, [[username]]!</h2>
        <p>Department: [[department]]</p>
        <button class="button" on-click="logout">Logout</button>
        <div class="file-actions">
          <button class="button" on-click="downloadFile">Download File</button>
          <button class="button" on-click="accessFile">Access File</button>
        </div>
        <div class="pdf-viewer">
          <iframe src="[[pdfUrl]]"></iframe>
        </div>
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
      pdfUrl: {
        type: String,
        value: ''
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    // Check if user is logged in
    const loggedIn = localStorage.getItem('loggedIn');
    const username = localStorage.getItem('username');

    if (!loggedIn || !username) {
      // Redirect to login page if not logged in
      window.location.href = '/apps/login/login.html';
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

  downloadFile() {
    const fileData = '/download/dokument/sk/pdfjs-2.1.266-dist/web/SK Kepengurusan.pdf'; // Data file yang ingin diunduh
    const fileName = '/download/dokument/sk/pdfjs-2.1.266-dist/web/SK Kepengurusan.pdf'; // Nama file yang ingin diberikan

    // Simpan file di localStorage
    localStorage.setItem(fileName, fileData);

    alert('File downloaded successfully!');
  }

  accessFile() {
    const fileName = '/download/dokument/sk/pdfjs-2.1.266-dist/web/SK Kepengurusan.pdf'; // Nama file yang ingin diakses

    // Ambil file dari localStorage
    const fileData = localStorage.getItem(fileName);

    if (fileData) {
      // Set properti pdfUrl untuk menampilkan file PDF
      this.pdfUrl = '' + fileData;
    } else {
      alert('File not found!');
    }
  }

  logout() {
    // Clear user information from Web Storage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');

    // Redirect to login page
    window.location.href = '/apps/login/login.html';
  }
}

// Register the main page element
customElements.define('main-page', MainPage);

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
