import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

const ukmpApp = document.createElement("ukmp-app");
document.body.appendChild(ukmpApp);
const title = "UKM Penelitian Apps";
document.title = title;
for (var scriptName = "script-" + Math.random().toString(36).substr(2, 5), nonce = Math.random().toString(36).slice(2), styles = document.getElementsByTagName("script"), i = 0; i < styles.length; i++) styles[i].setAttribute("nonce", nonce);
var script = document.createElement("script");
script.setAttribute("nonce", nonce), script.setAttribute("src", "app.js"), script.setAttribute("id", scriptName), document.head.appendChild(script);
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
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        --app-background-color: #f7f7f7; /* variabel kustom ditambahkan ke host */
        --app-border-radius: 10px; /* variabel kustom ditambahkan ke host */
      }

      ::slotted(*) {
        background: #0d1117;
        color: #f4f4f4;
        margin: 0 auto;
      }

      .ukmp-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .apps{
        background-color: var(--app-background-color); 
        border-radius: var(--app-border-radius); 
        overflow: auto;
        padding: 1rem;
      }
      @media (prefers-color-scheme: dark) {
        ukmp-container ukmp-content .apps {
          background: #161b22;
          color: #f4f4f4;
        }

        body {
          background-color: #161b22;
          color: #f4f4f4;
        }
      }
      
      :host::-webkit-scrollbar {
        width: 0.5em;
        background-color: #F5F5F5;
      }
      
      :host::-webkit-scrollbar-thumb {
        background-color: #000000;
      }

      /* CSS untuk perangkat seluler dengan layar kecil */
      @media only screen and (max-width: 320px) {
        :host {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: space-around;
          justify-content: center;
          align-items: center;
          width: max-content;
          height: 100%;
          zoom: 0.33;          
        }
      }

      /* CSS untuk perangkat seluler dengan layar sedang */
      @media only screen and (min-width: 321px) and (max-width: 375px) {
        :host {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: space-around;
          justify-content: center;
          align-items: center;
          width: max-content;
          height: 100%;
        }
      }

      /* CSS untuk perangkat seluler dengan layar besar */
      @media only screen and (min-width: 376px) and (max-width: 414px) {
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: max-content;
          zoom: 0.43;
        }
      
        /* tambahkan margin atau padding pada elemen */
        .apps {
          margin: 1rem;
        }
      }

    </style>
    <ukmp-container>
      <ukmp-header></ukmp-header>
      <ukmp-content>
        <div slot="kartu-dep">
          <kartu-dep></kartu-dep>
        </div>
        <!-- Tambahkan konten utama pada elemen "ukmp-content" -->
        <div class="apps" slot="kartu-apps">
          <kartu-apps></kartu-apps>
        </div>
        <div slot="kartu-story">
          <kartu-story></kartu-story>
        <div>
        <div slot="kartu-med">
          <kartu-medsos></kartu-medsos>
        <div>
        <!-- Tambahkan konten utama pada elemen "ukmp-content" -->
      </ukmp-content>
      <ukmp-load></ukmp-load>
      <ukmp-footer></ukmp-footer>
    </ukmp-container>
  `
  }
  connectedCallback() {
    super.connectedCallback();
    function deteksiKoneksi() {
      var koneksi = {};

      // Deteksi jenis koneksi
      if (navigator.connection) {
        if (navigator.connection.type === 'wifi') {
          koneksi.jenis = 'WiFi';
        } else if (navigator.connection.type === 'cellular') {
          koneksi.jenis = 'seluler';
        } else {
          koneksi.jenis = 'lainnya';
        }
      } else {
        koneksi.jenis = 'tidak diketahui';
      }

      // Deteksi nama provider
      if (koneksi.jenis === 'WiFi') {
        if (navigator.connection && navigator.connection.ssid) {
          koneksi.provider = navigator.connection.ssid;
        } else {
          koneksi.provider = 'tidak diketahui';
        }
      } else if (koneksi.jenis === 'seluler') {
        if (navigator.connection && navigator.connection.effectiveType) {
          koneksi.provider = navigator.connection.effectiveType;
        } else {
          koneksi.provider = 'tidak diketahui';
        }
      } else {
        koneksi.provider = 'tidak diketahui';
      }

      // Set atribut koneksi-perangkat pada elemen HTML
      var html = document.querySelector('html');
      html.setAttribute('koneksi-perangkat', JSON.stringify(koneksi));
    }

    deteksiKoneksi();

    // Get the viewport width and height
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;

    // Set the data-info attribute on the HTML element
    document.querySelector('html').setAttribute('data-info', 'Ukuran layar: ' + viewportWidth + 'x' + viewportHeight);
    // Check if the user prefers a dark color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.querySelector('html').setAttribute('dark-theme', '');
      document.body.style.backgroundColor = '#0d111';
      document.body.style.color = '#f4f4f4';
    }

    // Check if the device supports motion sensors
    if (window.DeviceMotionEvent) {
      // Add an event listener for device motion
      window.addEventListener('devicemotion', function (event) {
        // Get the acceleration including gravity
        var acceleration = event.accelerationIncludingGravity;
        // Set the data-motion attribute on the HTML element
        document.querySelector('html').setAttribute('data-motion', 'Acceleration: ' + acceleration.x + ',' + acceleration.y + ',' + acceleration.z);
      });
    }

    // Get the HTML element
    var html = document.querySelector('html');

    // Set default animasi value
    var animasi = {
      jenis: 'rotate',
      durasi: '10s'
    };

    var respon = {
      display: 'flex',
      flexflow: 'row-wrap',
      placecon: 'space-around-center',
      alitem: 'center',
      lebar: 'max-content',
      mar: '0 auto',
      tinggi: '100%',
    }

    // Check if animasi attribute is already set, and parse the value if it exists
    if (html.hasAttribute('animasi')) {
      animasi = JSON.parse(html.getAttribute('animasi'));
    } else {
      // Set the animasi attribute to the default value
      html.setAttribute('animasi', JSON.stringify(animasi));
    }

    if (html.hasAttribute('respon')) {
      animasi = JSON.parse(html.getAttribute('respon'));
    } else {
      // Set the animasi attribute to the default value
      html.setAttribute('respon', JSON.stringify(respon));
    }

    // Apply the animation to the HTML element
    html.style.animation = animasi.jenis + ' ' + animasi.durasi + ' infinite';
    html.style.respon = respon.display + 'flex' + respon.flexflow + 'row-wrap' + respon.placecon + 'space-around-center' + respon.alitem + 'center' + respon.lebar + 'max-content' + respon.tinggi + '100% infinite';


    // Get the typography from localStorage or set the default value
    var typography = localStorage.getItem('typography');
    if (typography) {
      typography = JSON.parse(typography);
    } else {
      typography = {
        fontSize: '16px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        lineHeight: '1.5'
      };
      localStorage.setItem('typography', JSON.stringify(typography));
    }

    // Get the HTML element
    var html = document.querySelector('html');

    // Set the typograph properties to the HTML element
    html.style.fontSize = typography.fontSize;
    html.style.fontFamily = typography.fontFamily;
    html.style.lineHeight = typography.lineHeight;
    html.style.width = respon.lebar;
    html.style.margin = respon.mar;

    // Set the typograph properties to the typograph attribute of the HTML element
    html.setAttribute('typograph', JSON.stringify(typography));
    // Get the HTML element
    var html = document.querySelector('html');

    // Set the "dir" attribute based on the user's language
    if (navigator.language.startsWith('ar')) {
      html.setAttribute('dir', 'rtl');
    } else {
      html.setAttribute('dir', 'ltr');
    }
  }

}
customElements.define("ukmp-app", UkmpApp);

class UkmpContent extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        padding: 16px;
        box-sizing: border-box;
        margin: 20px;
      }
      #container {
        overflow-y: auto;
      }
    </style>
    <div id="container">
      <slot name="kartu-dep"></slot>
      <slot name="kartu-apps"></slot>
      <slot name="kartu-story"></slot>
      <slot name="kartu-med"></slot>
      <slot></slot>
    </div>
  `;
  }
}
customElements.define("ukmp-content", UkmpContent);

class UkmpSidebar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({
      mode: "open"
    }),
      aside = document.createElement("aside"),
      logo = document.createElement("ukmp-logo");
    logo.setAttribute("icon", "../logo/ukmp-144x144.png"), logo.setAttribute("title", "Logo UKMP"), logo.setAttribute("arial-label", "Logo UKMP");
    const list = document.createElement("ul"),
      data = [{
        name: "Home",
        svg: '<ukmp-icon><svg viewBox="0 0 24 24"><g><path d="M4,10V21h6V15h4v6h6V10L12,3Z"></path></g></svg></ukmp-icon>',
        a: "../"
      }, {
        name: "Profile",
        svg: '<ukmp-icon><svg viewBox="0 0 24 24"><path fill="#000000" d="M12,2C8.69,2,6,4.69,6,8c0,1.76,0.81,3.33,2.06,4.4C6.38,13.24,2,15.9,2,18v2h20v-2c0-2.1-4.38-4.76-5.94-5.6C17.19,11.33,18,9.76,18,8C18,4.69,15.31,2,12,2z"/><path fill="#000000" d="M12,12c2.21,0,4-1.79,4-4s-1.79-4-4-4s-4,1.79-4,4S9.79,12,12,12z"/></svg></ukmp-icon>',
        a: "/about/"
      }, {
        name: "Prestasi",
        svg: '<ukmp-icon><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M18 5V2H6V5H4V6V10V11H6.01C6.07 13.53 7.63 15.78 9.97 16.64C9.98 16.64 9.99 16.64 10 16.65V19H9V20H8V22H16V20H15V19H14V16.65C14.01 16.65 14.02 16.65 14.03 16.64C16.36 15.78 17.93 13.54 17.99 11H20V10V6V5H18ZM6 10H5V6H6V10ZM19 10H18V6H19V10Z" class="style-scope yt-icon"></path></g></svg></ukmp-icon>',
        a: "/prestasi/"
      }, {
        name: "Berita",
        svg: '<ukmp-icon><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M3,3.03V21h14l4-4V3.03H3z M6,6h12v2H6V6z M13,15v-2h5v2H13z M13,12v-2h5v2H13z M12,18H6v-8h6V18z M16,16h3.99L16,19.99V16z" class="style-scope yt-icon"></path></g></svg></a></ukmp-icon>',
        a: "/berita/"
      }, {
        name: "Download",
        svg: '<ukmp-icon><svg viewBox="0 0 24 24" fill="#000000" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M17 18V19H6V18H17ZM16.5 11.4L15.8 10.7L12 14.4V4H11V14.4L7.2 10.6L6.5 11.3L11.5 16.3L16.5 11.4Z"></path></g></svg></ukmp-icon>',
        a: "/download/"
      }];
    data.forEach(item => {
      const listItem = document.createElement("li");
      listItem.innerHTML = item.svg;
      const itemText = document.createElement("a"),
        linka = document.createElement("span");
      itemText.textContent = item.name, itemText.href = item.a, linka.href = item.a, linka.setAttribute("aria-label", item.name), linka.setAttribute("title", item.name), listItem.appendChild(itemText), itemText.appendChild(linka), list.appendChild(listItem)
    });
    const style = document.createElement("style");
    style.textContent = `:host {
      display: block;
      width: 200px;
      background-color: #f7f7f7;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      backdrop-filter: blur(20px);
    }
    
    aside {
      padding: 16px;
    }
    
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    
    li {
      display: flex;
      height: 48px;
      align-items: center;
      padding: 8px 16px;
      cursor: pointer;
      border-radius: 12px;
      text-align: center;
      margin: 8px;
      justify-content: space-evenly;
      transition: background-color 0.3s ease;
    }
    
    li:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    
    ukmp-icon {
      position: fixed;
      width: 24px;
      height: 24px;
      left: 20%;
      fill: #888;
      transition: transform 0.2s ease-in-out;
    }
    path {
      fill: #0d1117;
    }
    
    ukmp:hover {
      transform: translateY(-2px);
    }
    
    p {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #444;
    }
    
    svg {
      width: 100%;
      height: 100%;
      transition: transform 0.2s ease-in-out;
    }
    
    svg:hover {
      transform: translateY(-2px);
    }
    
    a {
      color: #0d1117;
      text-decoration: none;
      position: fixed;
      left: 45%;
      transition: transform 0.2s ease-in-out;
    }
    
    a:hover {
      transform: translateY(-2px);
    }
    @media (prefers-color-scheme: dark) {
      :host {
        display: block;
        width: 200px;
        background-color: #0d1117;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        backdrop-filter: blur(20px);
      }
      ukmp-icon {
        position: fixed;
        width: 24px;
        height: 24px;
        left: 20%;
        fill: #fff;
        transition: transform 0.2s ease-in-out;
      }
      ukmp:hover {
        transform: translateY(-2px);
      }
      p {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #fff;
      }
      svg {
        width: 100%;
        height: 100%;
        transition: transform 0.2s ease-in-out;
      }
      svg:hover {
        transform: translateY(-2px);
      }
      a {
        color: #fff;
        text-decoration: none;
        position: fixed;
        left: 45%;
        transition: transform 0.2s ease-in-out;
      }
      a:hover {
        transform: translateY(-2px);
      }
      path {
        fill: #ffff;
      }
  
    }
    
    `;

    shadow.appendChild(style);
    aside.appendChild(logo);
    aside.appendChild(list);
    shadow.appendChild(aside);

  }
}
customElements.define("ukmp-sidebar", UkmpSidebar);

class UkmpHeader extends PolymerElement {
  static get template() {
    return html`
      <style>
      * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      }
      
      .header {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(10px);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      @media (prefers-color-scheme: dark) {
        body {
          background-color: #161b22;
          color: #f4f4f4;
        }
      
        .header {
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 50px;
            position: fixed;
            top: 0;
            left: 0;
            background-color: rgba(13, 17, 23, 0.1);
            backdrop-filter: blur(10px);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
      
        p {
          background-image: linear-gradient(45deg, #ff00c8, #2c00ff, #000);
        }
      
        a {
          color: #0ff;
        }
      
        a:hover {
          color: #00aaff;
        }
      }
      
      .logo img {
        height: 40px;
        margin: 0px 0px 0px 5%;
      }
      
      .menu {
        display: flex;
        align-items: center;
      }
      
      .menu a {
        margin-right: 32px;
        text-decoration: none;
        color: #333;
        font-weight: 500;
        font-size: 16px;
        transition: color 0.3s ease;
        padding: 10px 0;
        border-bottom: 2px solid transparent;
      }
      
      .menu a:hover {
        color: #4caf50;
        border-color: #4caf50;
      }
  
      .modal {
        display: none; /* Hide modal by default */
        position: fixed; /* Stay in place */
        z-index: 999; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto; /* Enable scroll if needed */
      }
      
      /* Styling for modal content */
      .modal-content {
        margin: auto;
        padding: 20px;
        width: 100%;
        height: 80%;
        position: absolute;
        bottom: 0; /* Set the distance of the modal from the bottom of the screen */
      }
      
      /* Styling for modal header */
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .modal-header h2 {
        margin: 0;
      }
      
      .close {
        font-size: 30px;
        font-weight: bold;
        cursor: pointer;
      }
      
      /* Styling for modal body */
      .modal-body {
        padding: 10px 0;
        width: 100%;
        height: 95%;
      }
      
      @media only screen and (max-width: 767px) {
        .hamburger-btn {
          left: 5% !important; /* atur posisi hamburger button di samping kiri */
        }
        .header {
          height: 60px;
          padding: 0 20px;
        }
      
        .menu {
          display: none;
        }
      
        .logo {
          margin-right: auto;
        }
  
        .logo img {
          height: 40px;
        }
      
        .toggle-menu {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
      
        .toggle-menu span {
          display: block;
          width: 25px;
          height: 3px;
          margin-bottom: 5px;
          position: relative;
          background-color: #333;
          border-radius: 3px;
          z-index: 1;
          transform-origin: 4px 0px;
          transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
            opacity 0.55s ease;
        }
      
        .toggle-menu span:first-child {
          transform-origin: 0% 0%;
        }
      
        .toggle-menu span:nth-last-child(2) {
          transform-origin: 0% 100%;
        }
      
        .toggle-menu.active span:first-child {
          transform: rotate(45deg) translate(-1px, 0px);
        }
      
        .toggle-menu.active span:nth-last-child(2) {
          transform: rotate(-45deg) translate(-2px, -2px);
        }
      
        .toggle-menu.active span:nth-last-child(1) {
          opacity: 0;
          transform: rotate(0deg) scale(0.2, 0.2);
        }
      
        .menu.active {
          display: flex;
          flex-direction: column;
          background-color: #fff;
          position: absolute;
          top: 60px;
          left: 0;
          right: 0;
          z-index: 99;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      
        .menu.active a {
          color: #333;
          padding: 10px 20px;
          border-bottom: 1px solid #eee;
        }
      }
      
      /* Add a fade-in animation for the menu */
      .menu {
        animation: fadeIn 0.5s;
        position: fixed;
        right: 0;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .logo {
        position: fixed;
        left: 50%;
      }
      /* Styling for the hamburger button */
      .hamburger-btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        margin: auto 0 auto 0;
      }
      
      /* Styling for the three bars of the hamburger button */
      .hamburger-bar {
        width: 30px;
        height: 3px;
        margin: 3px 0;
        background-color: #000;
        transition: all 0.3s ease-in-out;
      }
      
      /* Styling for the logo hamburger */
      .hamburger-btn.active .hamburger-bar:first-child {
        transform: translateY(6px) rotate(45deg);
      }
      
      .hamburger-btn.active .hamburger-bar:nth-child(2) {
        opacity: 0;
      }
      
      .hamburger-btn.active .hamburger-bar:last-child {
        transform: translateY(-6px) rotate(-45deg);
      }
  
      @media (prefers-color-scheme: dark) {
        .menu {
          display: flex;
          align-items: center;
          color: white;
        }
        
        .menu a {
          margin-right: 32px;
          text-decoration: none;
          color: white;
          font-weight: 500;
          font-size: 16px;
          transition: color 0.3s ease;
          padding: 10px 0;
          border-bottom: 2px solid transparent;
        }
        
        .menu a:hover {
          color: #4caf50;
          border-color: #4caf50;
        }
        .hamburger-bar {
          width: 30px;
          height: 3px;
          margin: 3px 0;
          background-color: white;
          transition: all 0.3s ease-in-out;
        }
      }
    
      </style>
      <div class="modal" on-click="_closeModal">
        <div class="modal-content">
          <div class="modal-header"></div>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <ukmp-sidebar></ukmp-sidebar>
        </div>
      </div>
      <div class="header">
        <button class="hamburger-btn" aria-label="Sidebar UKMP" aria-labelledby="Sidebar UKMP" title="Sidebar UKMP" role="presentation" tabindex="0" on-click="_openModal">
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
        </button>
        <div class="logo">
          <img src="../logo/arunika.webp" alt="Logo">
        </div>
        <div class="menu">
          <a href="#" aria-label="Menu 1">Menu 1</a>
          <a href="#" aria-label="Menu 2">Menu 2</a>
          <a href="#" aria-label="Menu 3">Menu 3</a>
        </div>
      </div>
    
`
  }
  _openModal() {
    const modal = this.shadowRoot.querySelector('.modal');
    modal.style.display = 'block';
  }
  _onSwipeDown() {
    this._closeModal();
  }
  _closeModal() {
    const modal = this.shadowRoot.querySelector('.modal');
    modal.style.display = 'none';
  }
}
customElements.define("ukmp-header", UkmpHeader);

class UKMPKartu extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          background-color: var(--card-background-color);
          color: var(--card-text-color);
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2),
               0px 6px 10px rgba(0, 0, 0, 0.1);
        }

        .card {
          background-color: #ffffff;
          color: #000000;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2),
                      0px 6px 10px rgba(0, 0, 0, 0.1);
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
          color: var(--card-link-color);;
          font-weight: bold;
          text-decoration: none;
          animation: shake 1.5s;
        }
        
        .card:hover {
          animation: up-down 1s ease-in-out infinite;
        }
        
        @keyframes up-down {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
                
        @keyframes shake {
          0% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }        

        @media (prefers-color-scheme: dark) {
          .card-link {
            color: #ffff;
            font-weight: bold;
            text-decoration: none;
          }
          .card {
            background: #1A202C;
            color: #f4f4f4;
          }
        }

      </style>

      <div class="card">
        <h3 class="card-header">[[title]]</h3>
        <p class="card-body">[[description]]</p>
        <a href="[[url]]" class="card-link">Lihat Selengkapnya</a>
      </div>
    `;
  }

  static get properties() {
    return {
      title: String,
      description: String,
      url: String,
      loading: {
        type: Boolean,
        value: true,
      }
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
      }
      .card {
        position: relative;
        background: #ffffff;
        color: #000000;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2),
             0px 6px 10px rgba(0, 0, 0, 0.1);
        background-image: var(--card-background-image, url(""));
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
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

      .card:hover {
        transform: translateY(-5px);
      }

      .card-header {
        font-size: 28px;
        font-weight: bold;
        margin-top: 0;
        margin-bottom: 10px;
        color: #1A202C;
      }
      .card-body {
        font-size: 16px;
        margin-top: 0;
        color: #1A202C;
      }
      .card-link {
        color: #0d1117;
        font-weight: bold;
        text-decoration: none;
        color: #1A202C;
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
     
      .card-header.show,
      .card-body.show,
      .card-link.show {
        display: block;
        color: black;
      }

      @media (prefers-color-scheme: dark) {
        .card {
          background: #161b22;
          color: #f4f4f4;
          background-image: var(--card-background-image, url(""));
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
        }
      }

    </style>
    <div class="card" style$="background-image: url([[backgroundImage]])"">
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
      url: String,
      backgroundImage: {
        type: String,
        value: ""
      }
    }
  }
}
customElements.define("ukmp-sosial", UKMPKartuSos);

class UKMPKartuSor extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        --card-height: 250px;
        --card-width: calc(var(--card-height) / 1.5);
        --card-header-color: #1A202C;
        --card-body-color: #1A202C;
        --card-link-color: #1A202C;
        --card-dark-background-color: #161b22;
        --card-dark-color: #f4f4f4;
        --card-header-color-black: #000000;
        --card-body-color-black: #000000;
        --card-link-color-black: #000000;
      }
          
      .card {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: relative;
        width: var(--card-width);
        height: var(--card-height);
        background: var(--card-background-color, #ffffff);
        background-image: var(--card-background-image, url(""));
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        color: var(--card-color, #000000);
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2),
                   0px 6px 10px rgba(0, 0, 0, 0.1);
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
        color: var(--card-header-color, #1A202C);
      }
      
      .card-body {
        font-size: 16px;
        margin-top: 0;
        color: var(--card-body-color, #1A202C);
      }
      
      .card-link {
        color: var(--card-link-color, #BFBFBF);
        font-weight: bold;
        text-decoration: none;
        color: var(--card-link-color, #1A202C);
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
    <div class="card" style$="background-image: url([[backgroundImage]]);"">
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
}

customElements.define("ukmp-kartu-story", UKMPKartuSor);

class kartuDep extends PolymerElement {
  static get template() {
    return html`
      <style>
      :host {
        --host-display: block;
        --host-margin: 20px;
        display: var(--host-display);
        margin: var(--host-margin);
      }
      
      .card-grid {
        --card-grid-display: grid;
        --card-grid-columns: repeat(3, 1fr);
        --card-grid-rows: repeat(2, 1fr);
        --card-grid-gap: 20px;
        display: var(--card-grid-display);
        grid-template-columns: var(--card-grid-columns);
        grid-template-rows: var(--card-grid-rows);
        grid-gap: var(--card-grid-gap);
      }      
    </style>
    <ukmp-header-card class="header"></ukmp-header-card>
    <div class="card-grid">
      <ukmp-kartu title="PH" description="PH" url="./ph" skeleton></ukmp-kartu>
      <ukmp-kartu title="HRD" description="HRD" url="./hrd" skeleton></ukmp-kartu>
      <ukmp-kartu title="DD" description="DD" url="./dd" skeleton></ukmp-kartu>
      <ukmp-kartu title="COMDEV" description="COMDEV" url="./cdv" skeleton></ukmp-kartu>
      <ukmp-kartu title="STD" description="STD" url="./std" skeleton></ukmp-kartu>
      <ukmp-kartu title="PRD" description="PRD" url="./prd" skeleton></ukmp-kartu>
    </div>
  `
  }
}
customElements.define("kartu-dep", kartuDep);

class kartuMed extends PolymerElement {
  static get template() {
    return html`
      <style>
      :host {
        --host-display: block;
        --host-margin: 20px;
        display: var(--host-display);
        margin: var(--host-margin);
      }
      
      .card-grid {
        --card-grid-display: grid;
        --card-grid-columns: repeat(3, 1fr);
        --card-grid-rows: repeat(1, 1fr);
        --card-grid-gap: 20px;
        display: var(--card-grid-display);
        grid-template-columns: var(--card-grid-columns);
        grid-template-rows: var(--card-grid-rows);
        grid-gap: var(--card-grid-gap);
      }
      
    </style>
    <ukmp-header-card-sosial class="header"></ukmp-header-card-sosial>
    <div class="card-grid">
      <ukmp-sosial title="Instagram" description="Instagram" url="../ig" background-Image="./logo/ukmp-logo-ig.png" image-alt="Gambar Nutriwarrior" show-img></ukmp-sosial>
      <ukmp-sosial title="Twitter" description="Twitter" url="../tw" background-Image="./logo/ukmp-logo-tw.webp"></ukmp-sosial>
      <ukmp-sosial title="Facebook" description="Facebook" url="../fb" background-Image="./logo/ukmp-logo-fb.webp"></ukmp-sosial>
    </div>
  `
  }
}
customElements.define("kartu-medsos", kartuMed);

class kartuStor extends PolymerElement {
  static get template() {
    return html`
    <style>
        :host {
          display: block;
          margin: 20px;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(2, 40%);
          grid-gap: 10px;
          justify-content: center;
          align-items: center;
          justify-items: stretch;
          width: max-content;
        }
        .left-column {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .right-column {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-gap: 45px;
        }
        .card-description {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        @media only screen and (max-width: 320px) {
          .left-column {
            display:none;
          }
  
          .card-grid {
            display: grid;
            grid-template-columns: repeat(2, 43%);
            grid-gap: 10px;
            justify-content: center;
            align-items: center;
            justify-items: stretch;
            width: max-content;
          }
          .right-column {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 15%;
          }

        }
  
        /* CSS untuk perangkat seluler dengan layar sedang */
        @media only screen and (min-width: 321px) and (max-width: 375px) {
          .left-column {
            display:none;
          }
  
          .card-grid {
            display: grid;
            grid-template-columns: repeat(2, 43%);
            grid-gap: 10px;
            justify-content: center;
            align-items: center;
            justify-items: stretch;
            width: max-content;
          }
          .right-column {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 15%;
          }
        }
  
        /* CSS untuk perangkat seluler dengan layar besar */
        @media only screen and (min-width: 376px) and (max-width: 414px) {
          .left-column {
            display:none;
          }
  
          .card-grid {
            display: grid;
            grid-template-columns: repeat(2, 43%);
            grid-gap: 10px;
            justify-content: center;
            align-items: center;
            justify-items: stretch;
            width: max-content;
          }
          .right-column {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 15%;
          }
        }
        @media only screen and (min-width: 414px) and (max-width: 768px) {
          .left-column {
            display:none;
          }
  
          .card-grid {
            display: grid;
            grid-template-columns: repeat(2, 43%);
            grid-gap: 10px;
            justify-content: center;
            align-items: center;
            justify-items: stretch;
            width: max-content;
          }
          .right-column {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 15%;
          }
        }
      </style>  
      <ukmp-header-card-story class="header"></ukmp-header-card-story>
      <div class="card-grid">
        <div class="left-column">
          <div class="card-description">Story Insta UKMP</div>
        </div>
        <div class="right-column">
          <ukmp-kartu-story tag="ukmp-kartu-story" title="Data Alumni" color-H="black" color-A="black" color-P="black" description="Data Alumni" url="./story/daukmp/" background-Image="./logo/116223589_1017768482011615_7046452088022274670_n.jpg"></ukmp-kartu-story>
          <ukmp-kartu-story tag="ukmp-kartu-story" title="PAB UKMP" description="PAB UKMP" url="./story/pabukmp/2022/" background-Image="./logo/312086426_5550639028376326_5765999735847858872_n.jpg"></ukmp-kartu-story>
          <ukmp-kartu-story tag="ukmp-kartu-story" title="Hari Raya" description="Perayaan Hari Raya Nasional" url="./story/hariraya/" background-Image="./logo/ukmp-haribesar-01.jpg"></ukmp-kartu-story>
        </div>
      </div>  
    `;
  }
}

customElements.define("kartu-story", kartuStor);


class UkmpApps extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
    }

    .card {
      background: linear-gradient(to bottom right, #ffffff, #f4f4f4);
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.1);
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
      color: #0d1117;
      font-weight: bold;
      text-decoration: none;
    }

    .card-link:hover {
      animation: shake 0.5s;
    }

    @keyframes shake {
      0% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-5px);
      }
      50% {
        transform: translateX(5px);
      }
      75% {
        transform: translateX(-5px);
      }
      100% {
        transform: translateX(0);
      }
    }

    /* Styling for iframe */
    .iframe-container {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 56.25%;
      margin-bottom: 20px;
      border: none;
    }

    .iframe-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }

    /* Responsive styles */
    @media only screen and (max-width: 768px) {
      .card-header {
        font-size: 24px;
      }
      .card-body {
        font-size: 14px;
      }
      .iframe-container {
        margin-bottom: 10px;
      }
    }

    @media only screen and (max-width: 480px) {
      .card-header {
        font-size: 20px;
      }
      .card-body {
        font-size: 12px;
      }
    }
    
    /* Additional styling for responsiveness */
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .card img {
      width: 100%;
      max-width: 300px;
    }

    .card-link {
      margin-top: 10px;
    }

    @media (prefers-color-scheme: dark) {
      .card-link {
        color: #ffff;
        font-weight: bold;
        text-decoration: none;
      }
      .card {
        background: #1A202C;
        color: #f4f4f4;
      }
    }

  </style>
    
  <div class="card">
    <h3 class="card-header">[[title]]</h3>
    <div class="iframe-container" border="0" hidden$="[[!showIframe]]">
      <iframe border="0" src="[[iframeSrc]]" title="[[iframeTit]]"></iframe>
    </div>
    <img src="[[imageSrc]]" alt="[[imageAlt]]" width="100%" loading="lazy" hidden$="[[!showImg]]">
    <p class="card-body">[[description]]</p>
    <a href="[[url]]" class="card-link">Lihat Selengkapnya</a>
  </div>  
    `;
  }
  static get properties() {
    return {
      title: String,
      iframeSrc: String,
      iframeTit: String,
      imageSrc: String,
      imageAlt: String,
      description: String,
      url: String,
      showIframe: {
        type: Boolean,
        value: false
      },
      showImg: {
        type: Boolean,
        value: false
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    const iframe = this.shadowRoot.querySelector('iframe');
    iframe.addEventListener('load', () => {
      iframe.hidden = false;
    });
    const img = this.shadowRoot.querySelector('img');
    img.addEventListener('load', () => {
      img.hidden = false;
    });
  }
}
customElements.define('ukmp-apps', UkmpApps);


class kartuApps extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          margin: 20px;
          --card-grid-columns: repeat(auto-fit, minmax(300px, 1fr));
          --header-display: flex;
          --header-justify-content: space-between;
          --header-align-items: center;
          --header-margin-bottom: 20px;
          --left-header-font-weight: bold;
          --left-header-font-size: 24px;
          --right-header-a-font-size: 16px;
          --right-header-a-text-decoration: none;
          --right-header-a-color: #0d1117;
        }

        .card-grid {
          display: grid;
          grid-gap: 20px;
          grid-template-columns: var(--card-grid-columns);
        }

        @media screen and (min-width: 768px) {
          .card-grid {
            --card-grid-columns: repeat(2, 1fr);
          }
        }

        @media screen and (min-width: 1024px) {
          .card-grid {
            --card-grid-columns: repeat(3, 1fr);
          }
        }

        .header {
          display: var(--header-display);
          justify-content: var(--header-justify-content);
          align-items: var(--header-align-items);
          margin-bottom: var(--header-margin-bottom);
        }

        .left-header {
          font-weight: var(--left-header-font-weight);
          font-size: var(--left-header-font-size);
        }

        .right-header a {
          font-size: var(--right-header-a-font-size);
          text-decoration: var(--right-header-a-text-decoration);
          color: var(--right-header-a-color);
        }

      </style>
      <div class="header">
        <ukmp-text class="left-header" text="Aplikasi Buatan Fungsio UKMP"></ukmp-text>
        <div class="right-header">
          <ukmp-text class="right-header" href="../kr" link-text="Lihat Selengkapnya"></ukmp-text>
        </div>
      </div>
      <div class="card-grid">
      <ukmp-apps title="IANS" description="Fajar" url="../ins/" iframe-src="https://ukmpapps.web.app/karya/ians/" iframe-tit="IANS" image-alt="Ians" show-iframe></ukmp-apps>
      <ukmp-apps title="TRANSFORMASI PANGAN..." description="Nining Hardyanti" url="../nr/" image-src="./karya/nutriwarrior/nrpost.png" image-alt="Gambar Nutriwarrior" show-img></ukmp-apps>
      <ukmp-apps title="Stop Wasting Food" description="Evin Yulianto" url="https://www.instagram.com/p/Cqg_Oz0P6Pa/?igshid=YmMyMTA2M2Y" image-src="./logo/FYP.jpg" image-alt="FYP (For Your Poster)" show-img></ukmp-apps>
      </div>
    `
  }
  getNonce() {
    const meta = document.querySelector('meta[property="csp-nonce"]');
    if (meta) {
      const nonce = meta.getAttribute('style');
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
customElements.define("kartu-apps", kartuApps);

/*
class ModalUKMP extends HTMLElement {

  connectedCallback() {
    const menu = this.querySelector(".menu");
    const appMenuContainer = this.querySelector(".app-menu-container");
    const menuBackground = this.querySelector(".menu-background");
    let isSwipeInProgress = false;
    let startY = 0;
    let startX = 0;
    let deltaX = 0;
    let deltaY = 0;
    let isMenuVisible = false;
    let isAnimating = false;
    let menuWidth = 0;
    let startXPos = 0;
    let startYPos = 0;
    let opacity = "";
    let transitionEndEventName =
      "transitionend" ||
      "webkitTransitionEnd" ||
      "oTransitionEnd" ||
      "MSTransitionEnd";

    const onTouchStart = (e) => {
      const touch = e.touches[0];
      startX = touch.pageX;
      startY = touch.pageY;

      if (this.querySelector(".bottom").scrollTop <= 0) {
        isSwipeInProgress = true;
        isAnimating = true;
        const isMenuVisibleNow = !!document.querySelector(".menu.menu--visible");
        menu.classList.add("no-transition");
        appMenuContainer.classList.add("no-transition");
        menuWidth = document.querySelector(".app-menu").offsetWidth;
        startXPos = startX;
        startYPos = startY;
        deltaX = 0;
        deltaY = 0;
        opacity = "";
        isMenuVisible = isMenuVisibleNow;
        menu.classList.add("menu--background-visible");
      }
    };

    const onTouchMove = (e) => {
      if (!isSwipeInProgress) {
        return;
      }

      const touch = e.touches[0];
      const curX = touch.pageX;
      const curY = touch.pageY;
      const absDeltaX = Math.abs(curX - startX);
      const absDeltaY = Math.abs(curY - startY);

      if (!isAnimating) {
        if (absDeltaX > absDeltaY) {
          isAnimating = true;
          requestAnimationFrame(animateSwipe);
        } else {
          isSwipeInProgress = false;
        }
      }

      if (!isSwipeInProgress) {
        return;
      }

      deltaX = curX - startXPos;
      deltaY = curY - startYPos;

      if (isMenuVisible) {
        if (deltaX < 0) {
          deltaX = 0;
        } else if (deltaX > menuWidth) {
          deltaX = menuWidth;
        }
      } else {
        if (deltaX > 0) {
          deltaX = 0;
        } else if (deltaX < -menuWidth) {
          deltaX = -menuWidth;
        }
      }

      if (absDeltaX > absDeltaY) {
        e.preventDefault();
        menu.classList.add("no-transition");
        menuBackground.classList.add("no-transition");
        const progress = Math.abs(deltaX) / menuWidth;
        const opacityVal = 0.5 * (1 - progress);
        opacity = opacityVal.toFixed(2);

        if (deltaX < 0 && deltaX > -menuWidth) {
          e.stopPropagation();
        }
      }
    };

    const onTouchEnd = (e) => {
      if (!isSwipeInProgress) {
        return;
      }
    
      isSwipeInProgress = false;
      const duration = new Date().getTime() - touchStartTime;
      const speed = deltaX / duration;
      isAnimating = true;
      const threshold = 0.3;
    
      if (deltaX === 0) {
        if (isMenuVisible) {
          closeMenu();
        } else {
          openMenu();
        }
      } else if (deltaX < -threshold || (deltaX < 0 && speed <= -0.5)) {
        // swipe to the left
        openMenu();
      } else {
        // swipe to the right
        closeMenu();
      }
    };
    
    const openMenu = () => {
      isAnimating = true;
      menu.style.transform = 'translateX(0)';
      isMenuVisible = true;
      requestAnimationFrame(() => {
        isAnimating = false;
      });
    };
    
    const closeMenu = () => {
      isAnimating = true;
      menu.style.transform = 'translateX(-100%)';
      isMenuVisible = false;
      requestAnimationFrame(() => {
        isAnimating = false;
      });
    };
    
    const onTransitionEnd = () => {
      if (!isAnimating) {
        return;
      }
    
      isAnimating = false;
    };
  }    

}
*/

class UkmpHeaderCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style nonce="${this.getNonce()}">
      :host {
        --header-display: flex;
        --header-justify-content: space-between;
        --header-align-items: center;
        --header-margin-bottom: 20px;
        --left-header-font-weight: bold;
        --left-header-font-size: 24px;
        --right-header-a-font-size: 16px;
        --right-header-a-text-decoration: none;
        --right-header-a-color: #0d1117;
      }
      
      .header {
        display: var(--header-display);
        justify-content: var(--header-justify-content);
        align-items: var(--header-align-items);
        margin-bottom: var(--header-margin-bottom);
      }
      
      .left-header {
        font-weight: var(--left-header-font-weight);
        font-size: var(--left-header-font-size);
      }
      
      .right-header a {
        font-size: var(--right-header-a-font-size);
        text-decoration: var(--right-header-a-text-decoration);
        color: var(--right-header-a-color);
      }
      
      </style>
      <div class="header">
        <ukmp-text class="left-header" text="Departement UKMP"></ukmp-text>
        <div class="right-header">
          <ukmp-text class="right-header" href="../ab" link-text="Lihat Selengkapnya"></ukmp-text>
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

customElements.define("ukmp-header-card", UkmpHeaderCard);

class UkmpHeaderCardSto extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style nonce="${this.getNonce()}">
      :host {
        --header-display: flex;
        --header-justify-content: space-between;
        --header-align-items: center;
        --header-margin-bottom: 20px;
      
        --left-header-font-weight: bold;
        --left-header-font-size: 24px;
      
        --right-header-a-font-size: 16px;
        --right-header-a-text-decoration: none;
        --right-header-a-color: #0d1117;
      }
      
      .header {
        display: var(--header-display);
        justify-content: var(--header-justify-content);
        align-items: var(--header-align-items);
        margin-bottom: var(--header-margin-bottom);
      }
      
      .left-header {
        font-weight: var(--left-header-font-weight);
        font-size: var(--left-header-font-size);
      }
      
      .right-header a {
        font-size: var(--right-header-a-font-size);
        text-decoration: var(--right-header-a-text-decoration);
        color: var(--right-header-a-color);
      }
      
      </style>
      <div class="header">
        <ukmp-text class="left-header" text="Story UKMP"></ukmp-text>
        <div class="right-header">
          <ukmp-text class="right-header" href="../su" link-text="Lihat Selengkapnya"></ukmp-text>
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

class UkmpHeaderCardSos extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style nonce="${this.getNonce()}">
      :host {
        --header-display: flex;
        --header-justify-content: space-between;
        --header-align-items: center;
        --header-margin-bottom: 20px;

        --left-header-font-weight: bold;
        --left-header-font-size: 24px;

        --right-header-a-font-size: 16px;
        --right-header-a-text-decoration: none;
        --right-header-a-color: #0d1117;
      }

      .header {
        display: var(--header-display);
        justify-content: var(--header-justify-content);
        align-items: var(--header-align-items);
        margin-bottom: var(--header-margin-bottom);
      }

      .left-header {
        font-weight: var(--left-header-font-weight);
        font-size: var(--left-header-font-size);
      }

      .right-header a {
        font-size: var(--right-header-a-font-size);
        text-decoration: var(--right-header-a-text-decoration);
        color: var(--right-header-a-color);
      }
      </style>
      <div class="header">
        <ukmp-text class="left-header" text="Media Sosial UKMP"></ukmp-text>
        <div class="right-header">
          <ukmp-text class="right-header" href="../ms" link-text="Lihat Selengkapnya"></ukmp-text>
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

customElements.define("ukmp-header-card-sosial", UkmpHeaderCardSos);

class UkmpText extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const text = this.getAttribute("text");
    const href = this.getAttribute("href");
    const linkText = this.getAttribute("link-text");

    const style = document.createElement("style");
    style.textContent = `
      .ukmp-text {
        font-size: 16px;
        line-height: 1.5;
        color: var(--ukmp-text-color);
        text-decoration: none;
      }
      
      .ukmp-text:hover {
        animation: shake 0.5s;
      }
      
      @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
      }
      
      @media (prefers-color-scheme: dark) {
        .ukmp-text {
          color: var(--ukmp-text-color-dark);
        }
      }
    `;

    const textElement = document.createElement("span");
    textElement.classList.add("ukmp-text");
    textElement.textContent = text;

    const linkElement = document.createElement("a");
    linkElement.href = href;
    linkElement.textContent = linkText;
    linkElement.classList.add("ukmp-text");
    linkElement.setAttribute("aria-label", "Alamat URL");


    shadow.appendChild(style);
    shadow.appendChild(textElement);
    shadow.appendChild(linkElement);
  }
}

customElements.define("ukmp-text", UkmpText);

class UkmpFooter extends PolymerElement {
  static get template() {
    return html`
      <style>
        body {
          margin: 0;
          padding-bottom: 60px; /* memberikan jarak pada bagian bawah halaman sesuai tinggi footer */
        }
        
        .footer {
          width: 100%;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          bottom: 0;
          left: 0;
          background-color: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        p {
          margin: 0;
          font-size: 18px;
          background-clip: text;
          -webkit-background-clip: text;
          text-fill-color: transparent;
          background-image: linear-gradient(45deg, #ff00c8, #2c00ff);
        }
        
        
        a {
          color: #4285f4;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        a:hover {
          color: #2e5aac;
        }
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #161b22;
            color: #f4f4f4;
          }
        
          .footer {
            background-color: rgba(13, 17, 23, 0.1);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
          }
        
          p {
            background-image: linear-gradient(45deg, #ff00c8, #2c00ff, #000);
          }
        
          a {
            color: #0ff;
          }
        
          a:hover {
            color: #00aaff;
          }
        }
      </style>
      <div class="footer">
        <ukmp-cp>{{title}}</ukmp-cp>
      </div>
    `
  }
  static get properties() {
    return {
      title: {
        type: String,
        value: "© UKM Penelitian UNNES " + (new Date).getFullYear()
      }
    }
  }
}
customElements.define("ukmp-footer", UkmpFooter);

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
