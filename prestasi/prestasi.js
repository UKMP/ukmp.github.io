import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';

// buat elemen paper-button baru
var paperButton = document.createElement('paper-button');
// set atribut pada elemen
paperButton.setAttribute('raised', true);
paperButton.setAttribute('class', 'red');
paperButton.innerHTML = 'Click me';

// tambahkan elemen ke dalam head
var head = document.getElementsByTagName('head')[0];
head.appendChild(paperButton);

// membuat elemen ukmp-app baru
const ukmpApp = document.createElement('ukmp-app');

// menambahkan elemen ukmp-app ke dalam body
document.body.appendChild(ukmpApp);

const title = 'UKM Penelitian Apps';
document.title = title;

// generate random script name
var scriptName = 'script-' + Math.random().toString(36).substr(2, 5);

// Generate random nonce
var nonce = Math.random().toString(36).slice(2);

// Create new script element
var script = document.createElement('script');

// Add nonce attribute to script element
script.setAttribute('nonce', nonce);

// Set source of script element
script.setAttribute('src', 'app.js');
script.setAttribute('id', scriptName)

// Add script element to HTML document
document.head.appendChild(script);

// get all script elements
var scripts = document.getElementsByTagName('script');

// loop through all script elements and add nonce attribute
for (var i = 0; i < scripts.length; i++) {
    scripts[i].setAttribute('nonce', nonce);
}

// get all script elements
var styles = document.getElementsByTagName('script');

// loop through all script elements and add nonce attribute
for (var i = 0; i < styles.length; i++) {
    styles[i].setAttribute('nonce', nonce);
}


// create new script element
var newScript = document.createElement('script');
newScript.setAttribute('type', 'text/javascript');
newScript.setAttribute('nonce', nonce);
newScript.setAttribute('id', scriptName);

// add script content
var scriptContent = "// Tambahkan security policy untuk mencegah XSS\n";
scriptContent += "document.querySelector('html').setAttribute('content-security-policy', \"default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self' 'unsafe-inline';\");";
newScript.textContent = scriptContent;

// append new script element to the page
document.body.appendChild(newScript);


// Elemen web "ukmp-container"
class UkmpContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      </style>
      <slot></slot>
    `;
    }
}
customElements.define('ukmp-container', UkmpContainer);

// Elemen web "ukmp-app"
class UkmpApp extends PolymerElement {
    constructor() {
        super();
        window.addEventListener('load', () => {
            const loadElement = this.shadowRoot.querySelector('ukmp-load');
            loadElement.parentNode.removeChild(loadElement);
            const hamburgerButton = this.shadowRoot.querySelector('.hamburger-menu');
            const sidebarMenu = this.shadowRoot.querySelector('.sidebar-menu');

            hamburgerButton.addEventListener('click', function () {
                sidebarMenu.classList.toggle('active');
            });
        });
        window.addEventListener('scroll', () => {
            const header = this.shadowRoot.querySelector('ukmp-header');
            const scrollPos = window.scrollY + window.innerHeight;
            if (scrollPos >= header.offsetTop && !header.classList.contains('scroll')) {
                header.classList.add('scroll');
            } else if (scrollPos < header.offsetTop && header.classList.contains('scroll')) {
                header.classList.remove('scroll');
            }
        });
    }

    static get template() {
        return html`
      <style>
      @media only screen and (max-width: 600px) {
        .hamburger-menu {
          display: block;
        }
    
        .sidebar-menu {
          display: none;
        }
      }
      </style>
      <ukmp-container>
        <ukmp-header>
        <button class="hamburger-menu"> Hallo
    <span></span>
    <span></span>
    <span></span>
  </button>
        </ukmp-header>
        <ukmp-sidebar class="sidebar-menu"></ukmp-sidebar>
        <ukmp-load></ukmp-load>
        <ukmp-footer></ukmp-footer>
      </ukmp-container>
    `;
    }

}

customElements.define('ukmp-app', UkmpApp);


class UkmpSidebar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const aside = document.createElement('aside');
        const logo = document.createElement('ukmp-logo');
        logo.setAttribute('icon', 'https://ukmpapps.web.app/logo/ukmp-logo-144x144.png');
        logo.setAttribute('title', 'Logo UKMP');
        logo.setAttribute('arial-label', 'Logo UKMP');
        const list = document.createElement('ul');

        const data = [
            { name: 'Home', svg: '<ukmp-icon><a href="/" aria-label="Home"><svg viewBox="0 0 24 24"><g><path d="M4,10V21h6V15h4v6h6V10L12,3Z"></path></g></svg></a></ukmp-icon>', a: "/index.html" },//link: 'https://example.com/profile' },
            { name: 'Profile', svg: '<ukmp-icon><a href="/about/" aria-label="Profile"><svg viewBox="0 0 24 24"><path fill="#000000" d="M12,2C8.69,2,6,4.69,6,8c0,1.76,0.81,3.33,2.06,4.4C6.38,13.24,2,15.9,2,18v2h20v-2c0-2.1-4.38-4.76-5.94-5.6C17.19,11.33,18,9.76,18,8C18,4.69,15.31,2,12,2z"/><path fill="#000000" d="M12,12c2.21,0,4-1.79,4-4s-1.79-4-4-4s-4,1.79-4,4S9.79,12,12,12z"/></svg></a></ukmp-icon>', a: '/about/' },
            { name: 'Prestasi', svg: '<ukmp-icon><a href="/prestasi/" aria-label="Prestasi"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M18 5V2H6V5H4V6V10V11H6.01C6.07 13.53 7.63 15.78 9.97 16.64C9.98 16.64 9.99 16.64 10 16.65V19H9V20H8V22H16V20H15V19H14V16.65C14.01 16.65 14.02 16.65 14.03 16.64C16.36 15.78 17.93 13.54 17.99 11H20V10V6V5H18ZM6 10H5V6H6V10ZM19 10H18V6H19V10Z" class="style-scope yt-icon"></path></g></svg></a></ukmp-icon>', a: '/prestasi/' },
            { name: 'Berita', svg: '<ukmp-icon><a href="/berita/"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M3,3.03V21h14l4-4V3.03H3z M6,6h12v2H6V6z M13,15v-2h5v2H13z M13,12v-2h5v2H13z M12,18H6v-8h6V18z M16,16h3.99L16,19.99V16z" class="style-scope yt-icon"></path></g></svg></a></ukmp-icon>', a: '/berita/' }];

        /*
        data.forEach(item => {
          const listItem = document.createElement('li');
          // tambahkan atribut data-link dengan nilai tautan untuk setiap elemen li
          listItem.setAttribute('data-link', item.link);
          listItem.innerHTML = item.svg;
          const itemText = document.createElement('span');
          itemText.textContent = item.name;
          listItem.appendChild(itemText);
          list.appendChild(listItem);
        
          // tambahkan event listener untuk menavigasi ke tautan yang sesuai ketika elemen li diklik
          listItem.addEventListener('click', () => {
            const link = listItem.getAttribute('data-link');
            window.location.href = link;
          });
        });
        */
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = item.svg;
            const itemText = document.createElement('span');
            const linka = document.createElement('a');
            itemText.textContent = item.name;
            linka.href = item.a;
            linka.setAttribute("aria-label", item.name);
            linka.setAttribute("title", item.name);
            listItem.appendChild(itemText);
            itemText.appendChild(linka);
            list.appendChild(listItem);
        });

        const style = document.createElement('style');
        style.textContent = `
      :host {
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
        width: 24px;
        height: 24px;
        margin-right: 8px;
        fill: #888;
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
      }
    `;

        shadow.appendChild(style);
        aside.appendChild(logo);
        aside.appendChild(list);
        shadow.appendChild(aside);
    }
}

class UkmpLogo extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const icon = document.createElement('img');
        icon.src = this.getAttribute('icon');
        icon.alt = 'Logo UKMP';
        shadow.appendChild(icon);
    }
}

customElements.define('ukmp-sidebar', UkmpSidebar);
customElements.define('ukmp-logo', UkmpLogo);


// Elemen web "ukmp-header"
class UkmpHeader extends PolymerElement {

    static get template() {
        return html`
      <style>
      :host {
        --primary-color: #ffffff;
      }
      * {
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
      }
      
      .header {
        width: 100%;
        height: 80px;
        background-color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      #header {
        background-color: var(--primary-color);
      }
      
      .card-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 32px;
        padding: 0 50px;
        margin-top: 32px;
      }
      
      .card {
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        overflow: hidden;
        position: relative;
        transition: transform 0.3s ease;
      }
      
      .card:hover {
        transform: translateY(-5px);
      }
      
      .card-header {
        background-color: #4caf50;
        color: #ffffff;
        font-size: 18px;
        font-weight: 600;
        padding: 24px;
        text-align: center;
      }
      
      .card-image {
        height: 180px;
        overflow: hidden;
        position: relative;
      }
      
      .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .card-content {
        padding: 16px 24px;
      }
      
      .card-actions {
        background-color: #f2f2f2;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
      
      .action-btn {
        background-color: #4caf50;
        border: none;
        border-radius: 4px;
        color: #ffffff;
        cursor: pointer;
        font-size: 14px;
        padding: 8px 16px;
        transition: background-color 0.3s ease;
        margin-right: 8px;
      }
      
      .action-btn:last-of-type {
        margin-right: 0;
      }
      
      .action-btn:hover {
        background-color: #388e3c;
      }        
      
      .logo img {
        height: 40px;
      }
      
      .menu a {
        margin-right: 32px;
        text-decoration: none;
        color: #333;
        font-weight: 500;
        font-size: 16px;
        transition: color 0.3s ease;
      }
      
      .menu a:hover {
        color: #4caf50;
      }
      @media (max-width: 767px) {
        .card-grid {
          grid-template-columns: repeat(1, 1fr);
          padding: 0 16px;
        }
        
        .card-header {
          font-size: 14px;
          padding: 16px;
        }
        
        .card-image {
          height: 150px;
        }
        
        .card-content {
          padding: 8px 16px;
        }
        
        .card-actions {
          padding: 8px;
        }
        
        .action-btn {
          padding: 8px 12px;
          font-size: 12px;
        }
      }
      @media only screen and (max-width: 768px) {
        .header {
          padding: 0 16px;
        }
        
        .menu a {
          margin-right: 16px;
          font-size: 14px;
        }
        
        .logo img {
          height: 30px;
        }
      } 
      </style>
      <div class="header">
        <div class="logo">
          <img src="../logo/arunika.png" alt="Logo">
        </div>
        <div class="menu">
          <a href="#" aria-label="Menu 1">Menu 1</a>
          <a href="#" aria-label="Menu 1">Menu 2</a>
          <a href="#" aria-label="Menu 1">Menu 3</a>
        </div>
      </div>
      <div class="card-grid">
        <div class="card">
          <div class="card-header" >HRD</div>
          <div class="card-image">
            <img src="https://ukmpapps.web.app/logo/HRD.jpg" alt="Card Image">
          </div>
          <div class="card-content">
            <p>Card content goes here.</p>
          </div>
          <div class="card-actions">
            <button class="action-btn" >Action 1</button>
            <button class="action-btn" on-click="_openModal">Action 2</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header" >DD</div>
          <div class="card-image">
            <img src="https://ukmpapps.web.app/logo/DD.jpg" alt="Card Image">
          </div>
          <div class="card-content">
            <p>Card content goes here.</p>
          </div>
          <div class="card-actions">
            <button class="action-btn">Action 1</button>
            <button class="action-btn">Action 2</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">STD</div>
          <div class="card-image">
            <img src="https://picsum.photos/200" alt="Card Image">
          </div>
          <div class="card-content">
            <p>Card content goes here.</p>
          </div>
          <div class="card-actions">
            <button class="action-btn">Action 1</button>
            <button class="action-btn">Action 2</button>
          </div>
        </div>
        <div class="card">
        <div class="card-header">PRD</div>
        <div class="card-image">
          <img src="https://ukmpapps.web.app/logo/PRD.jpg" alt="PRD Image">
        </div>
        <div class="card-content">
          <p>Card content goes here.</p>
        </div>
        <div class="card-actions">
          <button class="action-btn">Action 1</button>
          <button class="action-btn">Action 2</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header">PH</div>
        <div class="card-image">
          <img src="https://ukmpapps.web.app/logo/PH.jpg" alt="Card Image">
        </div>
        <div class="card-content">
          <p>Card content goes here.</p>
        </div>
        <div class="card-actions">
          <button class="action-btn">Action 1</button>
          <button class="action-btn">Action 2</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header">RED</div>
        <div class="card-image">
          <img src="https://ukmpapps.web.app/logo/RED.jpg" alt="Card Image">
        </div>
        <div class="card-content">
          <p>Card content goes here.</p>
        </div>
        <div class="card-actions">
          <button class="action-btn">Action 1</button>
          <button class="action-btn">Action 2</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header">COMDEV</div>
        <div class="card-image">
          <img src="https://ukmpapps.web.app/logo/COMDEV.png" alt="Card Image">
        </div>
        <div class="card-content">
          <p>Card content goes here.</p>
        </div>
        <div class="card-actions">
          <button class="action-btn">Action 1</button>
          <button class="action-btn">Action 2</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header">KARYA</div>
        <div class="card-image">
          <img src="https://picsum.photos/200" alt="Card Image">
        </div>
        <div class="card-content">
          <p>Card content goes here.</p>
        </div>
        <div class="card-actions">
          <button class="action-btn">Action 1</button>
          <button class="action-btn">Action 2</button>
        </div>
      </div>
    `;
    }
    connectedCallback() {
        super.connectedCallback();
        this.setCardBackgroundColors();
        const header = this.shadowRoot.querySelector('#header');
        const video = this.shadowRoot.querySelector('video');
        video.addEventListener('play', () => {
            setInterval(() => {
                header.style.backgroundColor = this.getDominantColor();
            }, 1000);
        });
    }
    getDominantColor() {
        const video = this.shadowRoot.querySelector('#video');

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let red = 0;
        let green = 0;
        let blue = 0;

        for (let i = 0; i < imageData.length; i += 4) {
            red += imageData[i];
            green += imageData[i + 1];
            blue += imageData[i + 2];
        }

        const pixelCount = imageData.length / 4;
        const avgRed = red / pixelCount;
        const avgGreen = green / pixelCount;
        const avgBlue = blue / pixelCount;

        const dominantColor = `rgb(${avgRed}, ${avgGreen}, ${avgBlue})`;
        this.shadowRoot.querySelector('.header').style.backgroundColor = dominantColor;
    }
    ready() {
        super.ready();
        const cardHeaders = this.shadowRoot.querySelectorAll('.card-header');
        cardHeaders.forEach(cardHeader => {
            const img = new Image();
            img.src = cardHeader.nextElementSibling.querySelector('img').src;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                const colorCount = {};
                for (let i = 0; i < imageData.length; i += 4) {
                    const r = imageData[i];
                    const g = imageData[i + 1];
                    const b = imageData[i + 2];
                    const color = `rgb(${r},${g},${b})`;
                    if (colorCount[color]) {
                        colorCount[color]++;
                    } else {
                        colorCount[color] = 1;
                    }
                }
                const dominantColor = Object.keys(colorCount).reduce((a, b) => colorCount[a] > colorCount[b] ? a : b);
                cardHeader.style.backgroundColor = dominantColor;
            }
        });
    }
    setCardBackgroundColors() {
        const cardActions = this.shadowRoot.querySelectorAll('button');

        cardActions.forEach((cardAction) => {
            const img = new Image();
            img.crossOrigin = "anonymous"; // allow cross-origin resource sharing
            img.src = cardAction.nextElementSibling.querySelectorAll('img').src;
            img.addEventListener('load', () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                const colorCount = {};
                for (let i = 0; i < imageData.length; i += 4) {
                    const r = imageData[i];
                    const g = imageData[i + 1];
                    const b = imageData[i + 2];
                    const color = `rgb(${r},${g},${b})`;
                    if (colorCount[color]) {
                        colorCount[color]++;
                    } else {
                        colorCount[color] = 1;
                    }
                }
                const dominantColor = Object.keys(colorCount).reduce((a, b) => colorCount[a] > colorCount[b] ? a : b);
                cardAction.style.backgroundColor = dominantColor;
            });
        });
    }
}
customElements.define('ukmp-header', UkmpHeader);

// Elemen web "ukmp-footer"
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
        </style>
        <div class="footer">
          <ukmp-cp>{{title}}</ukmp-c>
        </div>
      `;
    }
    static get properties() {
        return {
            title: {
                type: String,
                value: '© UKM Penelitian UNNES ' + new Date().getFullYear()
            }
        };
    }


}
customElements.define('ukmp-footer', UkmpFooter);

class UkmpLoad extends PolymerElement {
    static get template() {
        return html`
        <style>
          :host {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-image: url('logo/ukmp-logo-512x512.png');
            background-repeat: no-repeat;
            background-position: center;
            background-color: #fff;
            z-index: 9999;
          }
        </style>
        <slot></slot>
      `;
    }
}
customElements.define('ukmp-load', UkmpLoad);
