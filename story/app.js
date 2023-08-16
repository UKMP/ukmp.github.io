import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";

const ukmpApp = document.createElement("ukmp-app");
document.body.appendChild(ukmpApp);
const title = "Visual Story | UKM Penelitian Apps";
document.title = title;
for (var scriptName = "script-" + Math.random().toString(36).substr(2, 5), nonce = Math.random().toString(36).slice(2), styles = document.getElementsByTagName("script"), i = 0; i < styles.length; i++) styles[i].setAttribute("nonce", nonce);
var script = document.createElement("script");
script.setAttribute("nonce", nonce), script.setAttribute("src", "app.js"), script.setAttribute("id", scriptName), document.head.appendChild(script);
for (var scripts = document.getElementsByTagName("script"), i = 0; i < scripts.length; i++) scripts[i].setAttribute("nonce", nonce);
var newScript = document.createElement("script");
newScript.setAttribute("type", "text/javascript"), newScript.setAttribute("nonce", nonce), newScript.setAttribute("id", scriptName);
var scriptContent = "// Tambahkan security policy untuk mencegah XSS\n";
scriptContent += "document.querySelector('html').setAttribute('content-security-policy', \"default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self' 'unsafe-inline';\");", newScript.textContent = scriptContent, document.body.appendChild(newScript);
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
            width: 100%;
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

        /* Tambahkan mode gelap ke semua element dalam slot */
        :host([dark]) ::slotted(*) {
          color: var(--text-color-dark);
        }
      </style>
      <slot></slot>
    `;

    // Mendeteksi tema yang digunakan pada sistem
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = prefersDarkScheme.matches ? "dark" : "light";
    this.setAttribute("theme", currentTheme);

    // Menambahkan variabel untuk mengatur warna latar belakang dan teks sesuai dengan tema yang dipilih
    const bgColor = currentTheme === "dark" ? "#0d1117" : "#fff";
    const textColor = currentTheme === "dark" ? "#fff" : "#0d1117";
    const bgColorDark = currentTheme === "dark" ? "#222" : "#f5f5f5";
    const textColorDark = currentTheme === "dark" ? "#fff" : "#0d1117";

    this.style.setProperty("--bg-color", bgColor);
    this.style.setProperty("--text-color", textColor);
    this.style.setProperty("--bg-color-dark", bgColorDark);
    this.style.setProperty("--text-color-dark", textColorDark);
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
        position: relative;
        --app-background-color: #f7f7f7; /* variabel kustom ditambahkan ke host */
        --app-border-radius: 10px; /* variabel kustom ditambahkan ke host */
      }
      .apps{
        background-color: var(--app-background-color); 
        border-radius: var(--app-border-radius); 
        overflow: auto;
      }
      @media (prefers-color-scheme: dark) {
        .apps {
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
    </style>
    <ukmp-container>
      <ukmp-content>
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
        </ukmp-content>
        <ukmp-load></ukmp-load>
        <ukmp-footer></ukmp-footer>
        <ukmp-header></ukmp-header>
        </ukmp-container>
        `
  }
  connectedCallback() {
    super.connectedCallback();
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.querySelector('html').setAttribute('dark-theme', '');
      document.body.style.backgroundColor = '#0d111';
      document.body.style.color = '#f4f4f4';
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
      <slot name="kartu-pab"></slot>
      <slot name="kartu-da"></slot>
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
        a: "./"
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
      fill: #ffff;
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
      color: #ffff;
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
      fill: #fff;
      color: #fff;
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
          background-color: rgba(13, 17, 23, 0.1);
          backdrop-filter: blur(10px);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
          position: fixed;
          left: 15%;
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
    </style>
    <ukmp-header-card-story-harbar class="header"></ukmp-header-card-story-harbar>
    <div class="card-grid">
      <ukmp-story title="2023" description="Hari Besar 2023" url="./hariraya" color-H="black" color-A="black" color-P="black" background-Image="../logo/ukmp-haribesar-01.jpg" image-alt="Hari Raya"></ukmp-story>
      <ukmp-story title="2022" description="Hari Besar 2022" url="#" color-H="white" color-A="white" color-P="white" background-Image="../logo/arunika.webp"></ukmp-story>
      <ukmp-story title="2021" description="Hari Besar 2021" url="#" color-H="white" color-A="white" color-P="white" background-Image="../logo/arunika.webp" ></ukmp-story>
    </div>
  `
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
          <ukmp-text class="right-header" href="./su" link-text="Lihat Selengkapnya"></ukmp-text>
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
          <ukmp-text class="right-header" href="./ms" link-text="Lihat Selengkapnya"></ukmp-text>
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
          <ukmp-text class="right-header" href="./ms" link-text="Lihat Selengkapnya"></ukmp-text>
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
          <ukmp-text class="right-header" href="./ms" link-text="Lihat Selengkapnya"></ukmp-text>
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

class UkmpText extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({
      mode: "open"
    }),
      style = document.createElement("style");
    style.textContent = "\n      .ukmp-text {\n        font-size: 16px;\n        line-height: 1.5;\n      }\n    ";
    const text = document.createElement("span");
    text.classList.add("ukmp-text"), text.textContent = this.getAttribute("text");
    const link = document.createElement("a");
    link.href = this.getAttribute("href"), link.style.color = "white", link.style.textDecoration = "none", link.ariaLabel = "Selengkapnya", link.textContent = this.getAttribute("link-text"), shadow.appendChild(style), shadow.appendChild(text), shadow.appendChild(link)
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
        }
      }         
      </style>
      <slot></slot>
    `
  }
}
customElements.define("ukmp-load", UkmpLoad);