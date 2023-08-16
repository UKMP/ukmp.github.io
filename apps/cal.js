import { PolymerElement, html } from "../node_modules/@polymer/polymer/polymer-element.js";

// Import Google font - Poppins
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';
document.head.appendChild(fontLink);

// Buat fungsi untuk mendapatkan nama bulan
function getMonthName(month) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month];
}

class KalenderKu extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background-color: var(--background-color, white);
        }

        arunika-calender-panel(.fixed) {
          position: fixed;
          top: 2%;
        }
        
        /* Kode CSS Anda di sini */
        body {
          display: flex;
          align-items: center;
          padding: 0 10px;
          justify-content: center;
          min-height: 100vh;
          background: #9B59B6;
        }

        arunika-app-now {
          width: 100%;
          height: 100%;
          position: fixed;
        }

        arunika-app-now arunika-header {
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
        arunika-app-now arunika-header .right-menu {
            position: absolute;
            right: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        arunika-app-now arunika-header .right-menu button {
          background-color: transparent;
          border: none;
        }
        arunika-app-now arunika-header .right-menu button img {
            width: 40px;
        }

        .site-header {
          position: fixed;
          top: 61px;
          left: 0;
          right: 0;
          z-index: 1;

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
        }

        .wrapper {
          position: fixed;
          height: 100%;
          top: 100px;
          width: 100%;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.12);
          background-color: rgb(248 248 248 / 50%);
          transition: transform 0.3s ease-in-out;
          backdrop-filter: blur(10px);
        }

        .wrapper header {
          display: flex;
          align-items: center;
          padding: 0px 0px 10px;
          justify-content: space-between;
          background-color: transparent;
        }

        header .icons {
          display: flex;
          background-color: var(--background-color, #9B59B6);
          border-radius: 25px;
        }

        header .icons span {
          height: 38px;
          width: 38px;
          margin: 0 1px;
          cursor: pointer;
          color: #878787;
          text-align: center;
          line-height: 38px;
          font-size: 1.9rem;
          user-select: none;
          border-radius: 50%;
        }

        header .icons span:hover {
          background: #f2f2f2;
        }

        header .current-date {
          font-size: 1.05rem;
          font-weight: 500;
          color: black;
        }

        .waktus {
          font-size: 1.45rem;
          font-weight: 500;
          position: relative;
          top: 25px;
          background-color: white;
        }

        .calendar {
          padding: 0px 0 15px;
        }

        .calendar ul {
          display: flex;
          flex-wrap: wrap;
          list-style: none;
          text-align: center;
          align-items: center;
          padding: 5px 0 10px;
          justify-content: space-between;
        }

        .calendar ul.weeks {
          padding: 0!important;
        }

        .calendar .days {
          margin-bottom: 20px;
        }

        .calendar li {
          color: #333;
          width: calc(100% / 7);
          font-size: 1.07rem;
        }

        .calendar .weeks li {
          font-weight: 500;
          cursor: default;
        }

        .calendar .days li {
          z-index: 1;
          cursor: pointer;
          position: relative;
          margin-top: 30px;
        }

        .days li.inactive {
          color: #aaa;
        }

        .days li.active {
          color: #fff;
        }

        .days li.today {
          color: #9B59B6;
        }

        .days li::before {
          position: absolute;
          content: "";
          left: 50%;
          top: 50%;
          height: 40px;
          width: 40px;
          z-index: -1;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        .days li.active::before {
          background-color: var(--background-color, #9B59B6);
        }

        .days li.today::before {
          background: #fff;
          border: 1px solid #9B59B6;
        }

        .days li:not(.active):hover::before {
          background: #f2f2f2;
        }

        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 9999;
        }

        .modal-content {
          position: absolute;
          bottom: 0px;
          background-color: #fff;
          padding: 10px 0  10px 0;
          width: 100%;
          border-radius: 25px;
        }

        .whtd {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .wheatdes {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .whatde {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          
        }

        .tempr {
          font-size: 1.55rem;
          font-weight: 500;
          margin: 0;
        }

        .lok {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .lok svg {
          width: 30px;
        }

        .fipr {
          font-size: 1.05rem;
          font-weight: 500;
        }

        .despr {
          font-size: 1.05rem;
          font-weight: 500;
          margin: 0
        }

        .filpr {
          font-size: 1.05rem;
          font-weight: 500;
        }

        .close {
            color: #aaaaaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            position: fixed;
            right: 20px
        }

        .close:hover,
        .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
        arunika-calender-panel {
            width: 100%;
            height: 515px;
            position: absolute;
            top: 75%;
            left: 0;
            margin-top: 60px;
            background-color: #ffffff;
            color: black;
            z-index: 2;
            border-radius: 25px 25px 0 0;
        }

        arunika-calender-panel arunika-story-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 25px;
        }

        arunika-departement {
            display: grid;
            grid-template-columns: repeat(3, 1fr); /* Membuat 3 kolom dengan lebar yang sama */
            grid-template-rows: repeat(2, 1fr); /* Membuat 2 baris dengan tinggi yang sama */
            gap: 10px; /* Jarak antara elemen-elemen di dalam grid */
            position: absolute;
            top:40%;
        }
          
          /* Contoh penggunaan untuk elemen di dalam grid */
        departement-slot {
            display: flex;
            align-item: center;
            justify-content: center;
        }

        departement-slot img {
            width: 50px;
            position: absolute;
            left: 0
        }

        departement-slot indetitas-departement {
            display: flex;
            flex-direction: column;
            justify-content: center;
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
          

        arunika-calender-panel arunika-story-header ukmp-text.headsto {
            right: 0;
        }
        /* CSS untuk list waktu */
        #timeList {
          list-style-type: none;
          padding: 20px 0px 0px 0px;
        }

        #timeList li {
          padding: 5px 0;
          border-bottom: 1px solid #ddd;
          padding: 5px 0 10px;
        }
        #conte {
          overflow-y: hidden;  /* ini akan mencegah pengguna menggulir jika tidak mencapai 6% */
          height: 100%;  /* ini akan memastikan bahwa elemen mengisi seluruh tinggi arunika-calender-panel */
          background-color: white;
        }
        arunika-calender-panel(.scrollable) #conte {
          overflow-y: scroll!important;
        }
        .current-time {
          background-color: var(--background-color, red);
        }

        .meet{
          position:absolute;
          width:60px;
          height:60px;
          bottom:0px;
          right:10px;
          background-color:var(--background-color, red);
          color:#FFF;
          border-radius:50px;
          text-align:center;
          box-shadow: 2px 2px 3px #999;
          justify-content: center;
          align-items: center;
          display: flex;
          font-size: 45px;
          font-weight: 500;
        }

        @media (prefers-color-scheme: dark) {
          arunika-calender-panel {
            background-color: #191835;
          }
          .waktus {
            background-color: #191835;
            color: #ffff;
          }
          #conte {
            background-color: #191835;
            color: #ffff;
          }
          .modal-content {
            position: absolute;
            bottom: 0px;
            background-color: #14142d;
            padding: 10px 0  10px 0;
            width: 100%;
            border-radius: 25px;
          }  
        }
      </style>
      <arunika-app-now>
          <arunika-header>
              <div class="logo">
                  <img src="https://ukmpapps.web.app/apps/logo/arunika.png" alt="Logo">
                  <h2>Account</h2>
              </div>
              <div class="right-menu">
                  <button class="profile"on-click="openAccount">
                      <img src="https://ukmpapps.web.app/apps/user.png" alt="Profile">
                  </div>
              </div>
          </arunika-header>
      </arunika-app-now>
      <div class="site-header">
          <div class="chips-nav">
              <button aria-labelledby="mundur" aria-label="mundur" title="mundur" class="chips-nav__prev"><i
                      class="fas fa-chevron-left"></i></button>
              <button aria-labelledby="maju" aria-label="maju" title="maju" class="chips-nav__next"><i
                      class="fas fa-chevron-right"></i></button>
          </div>
          <div class="chips-wrapper">
              <div class="chip active" on-click="showAll">Semua</div>
              <div class="chip" on-click="showUKMPStory">Event terkini</div>
              <div class="chip" on-click="showDocument">Acara Departement [[department]]</div>
          </div>
      </div>
      <div id="myModal" class="modal">
          <div class="modal-content">
              <span class="close" on-click="closeModal">&times;</span>
              <p id="modalText"></p>
          </div>
      </div>
      <div class="wrapper">
      <header>
        <div class="icons">
          <span on-click="prevMonth">&lt;</span>
          <span on-click="nextMonth">&gt;</span>
        </div>
        <p class="current-date">{{ currentDate }}</p>
      </header>
      <div class="calendar">
        <ul class="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul class="days" id="daysList"></ul>
      </div>
    </div>
    <arunika-calender-panel>
        <div class="slide-top"></div>
        <div class="waktus">Today</div>
        <div id="conte">
          <ul id="timeList"></ul>
        </div>
        <a href="#" class="meet">+</a>
    </arunika-calender-panel>
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
      currentDate: {
        type: String,
        value: ''
      },
      '--background-color': {
        type: String,
        reflectToAttribute: true
      },
      currentFullDate: {
        type: Object,
        value: new Date()
      },
      weatherIcon: {
        type: String,
        value: ''
      },
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    this.setupCalendar(this.currentFullDate);
    this.setRandomBackgroundColor();
    this.modal = this.shadowRoot.getElementById("myModal");
    this.modal.addEventListener("click", this.handleOutsideClick.bind(this));
    this.intervalId = setInterval(() => this.setRandomBackgroundColor(), 24 * 60 * 60 * 1000);  // Setiap 24 jam
    this._boundScrollListener = this._scrollListener.bind(this);
    await this.getCurrentLocation();
    window.addEventListener('scroll', this._boundScrollListener);
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

  async getCurrentLocation() {
    if (navigator.geolocation) {
      await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          this.getCurrentWeather(latitude, longitude).then(resolve).catch(reject);
        }, reject);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  async getCurrentWeather(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=921e83b9da8a40a760ad74d5cedd6bbd`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          this.weatherData = {
            icon: data.weather[0].icon,
            description: data.weather[0].description,
            temperature: data.main.temp,
            feelslike: data.main.feels_like,
            sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(), // Konversi dari UNIX timestamp ke waktu lokal
            sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(), // Konversi dari UNIX timestamp ke waktu lokal
            country: data.sys.country,
          };
          // Memastikan kita mendapatkan respon yang valid
          this.weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          this.setupCalendar(this.currentFullDate);  // Panggil ulang setupCalendar setelah ikon cuaca di-update
        } else {
          console.error('Error:', data.message);
          throw new Error(data.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  }

  setRandomBackgroundColor() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    this.updateStyles({ '--background-color': randomColor });
    document.documentElement.style.setProperty('--background-color', randomColor);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.intervalId);  // Pastikan kita membersihkan interval ketika elemen dilepaskan
    window.removeEventListener('scroll', this._boundScrollListener);
  }

  _scrollListener() {
    let scrollHeight = window.scrollY;
    const timeList = this.shadowRoot.querySelector("#conte");
    if (scrollHeight > this.offsetHeight * 0.02) {
      this.classList.add('fixed');
      this.classList.add('scrollable');
      timeList.style.overflowY = "scroll";  // mengubah overflowY menjadi scroll
    } else {
      this.classList.remove('fixed');
      this.classList.remove('scrollable');
      timeList.style.overflowY = "hidden";  // mengubah overflowY menjadi scroll
    }
  }

  // Fungsi untuk mengatur kalender
  setupCalendar(date) {
    this.currentDate = `${getMonthName(date.getMonth())} ${date.getFullYear()}`;

    const daysList = this.shadowRoot.querySelector("#daysList");
    daysList.innerHTML = "";

    const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const lastDayCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    const prevMonthDays = [];
    const currentMonthDays = [];
    const nextMonthDays = [];

    for (let i = firstDayIndex - 1; i >= 0; i--) {
      prevMonthDays.push(lastDayPrevMonth - i);
    }

    for (let i = 1; i <= lastDayCurrentMonth; i++) {
      currentMonthDays.push(i);
    }

    for (let i = 1; i < 7 - lastDayIndex; i++) {
      nextMonthDays.push(i);
    }

    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    const today = new Date();

    allDays.forEach((day, index) => {
      const li = document.createElement("li");
      li.textContent = day;
      li.addEventListener("click", () => this.openModal(day));  // Menambahkan event listener click


      // Tambahkan cek tambahan untuk pastikan tanggal 'hari ini' hanya ditandai jika berada di bulan dan tahun yang sama
      if (day === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear() && index >= firstDayIndex && index < (firstDayIndex + currentMonthDays.length)) {
        li.classList.add("today");
        if (this.weatherIcon) { // Tambahkan kondisi ini
          const img = document.createElement('img');
          img.src = this.weatherIcon;
          img.alt = `Cuaca Hari ini ${this.weatherData.temperature}° di ${this.weatherData.country}`
          img.style.width = '25px';  // Anda bisa mengatur ukuran ikon di sini
          img.style.position = 'absolute';
          img.style.top = '-20px';
          img.style.right = '0';
          img.style.backgroundColor = "white";
          img.style.borderRadius = "25px";
          img.style.border = "1px solid #9B59B6";
          li.appendChild(img);
        }
      }

      if (currentMonthDays.includes(day) && index >= firstDayIndex && index < (firstDayIndex + currentMonthDays.length)) {
        li.classList.add("active");
        li.classList.remove("inactive");
      } else {
        li.classList.add("inactive");
        li.classList.remove("active");
      }
      daysList.appendChild(li);
    });

    const timeList = this.shadowRoot.querySelector("#timeList");
    timeList.innerHTML = '';
    const currentHour = new Date().getHours();

    for (let i = 0; i <= 24; i++) {
      const li = document.createElement("li");
      li.textContent = `${String(i).padStart(2, '0')}.00`;
      timeList.appendChild(li);
      if (i === currentHour) {
        li.classList.add('current-time');
      }
    }

  }

  handleOutsideClick(event) {
    if (event.target === this.modal) {
      this.closeModal();
    }
  }


  openModal(day) {
    const modal = this.shadowRoot.querySelector("#myModal");
    const modalContent = this.shadowRoot.querySelector(".modal-content");
    const modalText = this.shadowRoot.querySelector("#modalText");
    modal.style.display = "block";
    if (this.weatherData && day === new Date().getDate()) {
      modalText.innerHTML = `
        <div class="whtd">
          <p>Cuaca tanggal ${day}</p>
          <div class="lok">
            <svg id="saplacesvg" class="siz16" enable-background="new 0 0 16 16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h16v16h-16z" fill="none"></path><path class="gray50_fill" d="m8 .001c-3.313 0-6 2.686-6 5.999 0 .001.035.348.035.348.033.226.077.45.131.671.161.664.413 1.303.75 1.899.189.361.409.725.633 1.088s.463.724.709 1.08c.228.33.456.644.683.952.069.092.135.182.203.272.223.295.444.585.659.853l.454.567c.382.463.8.94 1.134 1.314l.24.267c.045.05.101.088.16.116.008.004.017.006.026.009.049.019.101.03.155.033.017.001.033.001.05 0 .074-.006.147-.023.211-.06-.064.037-.137.054-.211.06.072-.005.143-.019.209-.058.051-.025.097-.059.136-.1l.176-.2c.342-.382.789-.89 1.2-1.386.6-.722 1.3-1.637 1.976-2.609.499-.705.954-1.44 1.365-2.2.525-.889.838-1.886.916-2.916 0-3.313-2.687-5.999-6-5.999zm1.414 7.413c-.362.362-.862.586-1.414.586s-1.052-.224-1.414-.586-.586-.862-.586-1.414.224-1.052.586-1.414.862-.586 1.414-.586 1.052.224 1.414.586.586.862.586 1.414-.224 1.052-.586 1.414zm-1.414-3.435c-1.105 0-2 .895-2 2 0-1.105.895-2 2-2s2 .895 2 2c0-1.105-.895-2-2-2z" fill="#00809d"></path></svg>
            <p>Country: ${this.weatherData.country}</p>
          </div>
        </div>
        <div class="chips-wrapper">
          <p class="chip">Sunrise: ${this.weatherData.sunrise}</p>
          <p class="chip">Sunset: ${this.weatherData.sunset}</p>
        </div>
        <div class="weather-info">
          <div class="wheatdes">
            <div class="whatde">
              <p class="tempr">${this.weatherData.temperature}°</p>
              <p class="fipr">Feels Like: ${this.weatherData.feelslike}°</p>
            </div>
            <div class="whatde">
              <img alt="Cuaca" src="https://openweathermap.org/img/wn/${this.weatherData.icon}@2x.png">
              <p class="despr">Description: ${this.weatherData.description}</p>
            </div>
          </div>
        </div>
      `;
    } else {
      modalText.textContent = `Anda memilih tanggal ${day}`;
    }

    let touchStartY;
    modalContent.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, false);

    modalContent.addEventListener('touchmove', (e) => {
      let touchCurrentY = e.touches[0].clientY;
      this.moveModal(touchCurrentY - touchStartY);
    }, false);

    modalContent.addEventListener('touchend', (e) => {
      this.closeModal()
      this.resetModalPosition();
    }, false);
    document.documentElement.style.overflowY = "hidden"; // Menambahkan gaya overflow-y: hidden pada tag <html>
  }

  moveModal(deltaY) {
    const modalContent = this.shadowRoot.querySelector(".modal-content");
    modalContent.style.transform = `translateY(${deltaY}px)`;
  }

  resetModalPosition() {
    const modalContent = this.shadowRoot.querySelector(".modal-content");
    modalContent.style.transform = "";
  }
  closeModal() {
    const modal = this.shadowRoot.querySelector("#myModal");
    modal.style.display = "none";
    document.documentElement.style.overflowY = ""; // Menambahkan gaya overflow-y: hidden pada tag <html>
  }


  // Fungsi untuk beralih ke bulan sebelumnya
  prevMonth() {
    this.currentFullDate.setMonth(this.currentFullDate.getMonth() - 1);
    this.setupCalendar(this.currentFullDate);
    this.setRandomBackgroundColor();
  }

  // Fungsi untuk beralih ke bulan berikutnya
  nextMonth() {
    this.currentFullDate.setMonth(this.currentFullDate.getMonth() + 1);
    this.setupCalendar(this.currentFullDate);
    this.setRandomBackgroundColor();
  }

}

customElements.define('kalender-ukmp', KalenderKu);