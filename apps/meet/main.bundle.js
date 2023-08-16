(() => {
    "use strict";
    let t = (t, n, o) => {
        let i = t.attachShadow({
            mode: "open"
        }),
            s = document.createElement("template");
        s.innerHTML = '<style>@import "/apps/meet/styles.css";' + o + "</style>" + e(n, t);
        let a = s.content;
        i.appendChild(a.cloneNode(!0))
    },
        e = (t, e) => {
            let n = (Window.lastComponentId ? Window.lastComponentId : 0) + 1;
            Window.lastComponentId = n;
            let o = "component" + n;
            return Window[o] = e, t.replaceAll("this.", "Window." + o + ".")
        };

    function n(t, e) {
        if (!Object.prototype.hasOwnProperty.call(t, e)) throw TypeError("attempted to use private field on non-instance");
        return t
    }
    var o = 0;

    function i(t) {
        return "__private_" + o++ + "_" + t
    }
    var s = i("instance"),
        a = i("myDataChannel"),
        d = i("callbackOnMessage");
    class r {
        constructor() {
            if (Object.defineProperty(this, a, {
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, d, {
                writable: !0,
                value: void 0
            }), n(r, s)[s]) return n(r, s)[s];
            n(r, s)[s] = this
        }
        getNewMessages(t) {
            n(this, d)[d] = t
        }
        setupDataChannel(t) {
            t.ondatachannel = t => {
                t.channel.onmessage = t => {
                    n(this, d)[d] && n(this, d)[d](t.data)
                }
            }, n(this, a)[a] = t.createDataChannel("myDataChannel")
        }
        sendChatMessage(t) {
            n(this, a)[a].send(t)
        }
    }

    function l(t, e) {
        if (!Object.prototype.hasOwnProperty.call(t, e)) throw TypeError("attempted to use private field on non-instance");
        return t
    }
    Object.defineProperty(r, s, {
        writable: !0,
        value: void 0
    });
    var c = 0;

    function h(t) {
        return "__private_" + c++ + "_" + t
    }
    let u = Object.freeze({
        Room: "room",
        ICE: "ice"
    });
    var p = h("instance"),
        m = h("firestore");
    class g {
        constructor() {
            if (Object.defineProperty(this, m, {
                writable: !0,
                value: void 0
            }), l(g, p)[p]) return l(g, p)[p];
            l(g, p)[p] = this, l(this, m)[m] = firebase.firestore()
        }
        async newRoom() {
            return (await l(this, m)[m].collection(u.Room).add({
                open: !0,
                hostOffer: null,
                guestAnswer: null
            })).id
        }
        async roomExist(t) {
            return (await l(this, m)[m].collection(u.Room).doc(t).get()).exists
        }
        async saveOffer(t, e) {
            await l(this, m)[m].collection(u.Room).doc(t).update({
                hostOffer: {
                    type: e.type,
                    sdp: e.sdp
                }
            })
        }
        async saveAnswer(t, e) {
            await l(this, m)[m].collection(u.Room).doc(t).update({
                guestAnswer: {
                    type: e.type,
                    sdp: e.sdp
                }
            })
        }
        async saveIce(t, e, n) {
            await l(this, m)[m].collection(u.Room).doc(t).collection(u.ICE).add({
                ice: e,
                fromHost: n
            })
        }
        getRoomUpdates(t, e) {
            l(this, m)[m].collection(u.Room).doc(t).onSnapshot((t => {
                e(t.data())
            }))
        }
        getRoomIceUpdates(t, e, n) {
            l(this, m)[m].collection(u.Room).doc(t).collection(u.ICE).where("fromHost", "==", e).onSnapshot((t => {
                t.docChanges().forEach((t => {
                    "added" === t.type && n(t.doc.data().ice)
                }))
            }))
        }
    }

    function v(t, e) {
        if (!Object.prototype.hasOwnProperty.call(t, e)) throw TypeError("attempted to use private field on non-instance");
        return t
    }
    Object.defineProperty(g, p, {
        writable: !0,
        value: void 0
    });
    var b = 0;

    function w(t) {
        return "__private_" + b++ + "_" + t
    }
    var y = w("instance"),
        f = w("firebaseService"),
        k = w("dataChannelService"),
        x = w("myRtcConnection"),
        E = w("roomID"),
        R = w("isHost"),
        C = w("connected"),
        M = w("haveAnswered"),
        I = w("addHostOffer"),
        j = w("addGuestAnswer");
    class O {
        constructor() {
            if (Object.defineProperty(this, j, {
                value: T
            }), Object.defineProperty(this, I, {
                value: P
            }), Object.defineProperty(this, f, {
                writable: !0,
                value: new g
            }), Object.defineProperty(this, k, {
                writable: !0,
                value: new r
            }), Object.defineProperty(this, x, {
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, E, {
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, R, {
                writable: !0,
                value: null
            }), Object.defineProperty(this, C, {
                writable: !0,
                value: !1
            }), Object.defineProperty(this, M, {
                writable: !0,
                value: !1
            }), v(O, y)[y]) return v(O, y)[y];
            v(O, y)[y] = this
        }
        getIsHost() {
            return v(this, R)[R]
        }
        getRoomId() {
            return v(this, E)[E]
        }
        async newRoom() {
            v(this, E)[E] = await v(this, f)[f].newRoom(), v(this, R)[R] = !0
        }
        async joinRoom(t) {
            let e = await v(this, f)[f].roomExist(t);
            return e && (v(this, R)[R] = !1, v(this, E)[E] = t), e
        }
        setupPeerConnection(t, e) {
            v(this, x)[x] = new RTCPeerConnection({
                iceServers: [{
                    urls: "stun:stun2.1.google.com:19302"
                }]
            }), t.getTracks().forEach((t => {
                v(this, x)[x].addTrack(t, new MediaStream)
            })), v(this, x)[x].ontrack = t => {
                e(t.streams[0]), v(this, C)[C] = !0
            }, v(this, x)[x].onicecandidate = t => {
                t.candidate && v(this, f)[f].saveIce(v(this, E)[E], t.candidate.toJSON(), v(this, R)[R])
            }, v(this, k)[k].setupDataChannel(v(this, x)[x])
        }
        async createAndSaveOffer() {
            let t = await v(this, x)[x].createOffer();
            await v(this, x)[x].setLocalDescription(t), v(this, f)[f].saveOffer(v(this, E)[E], t)
        }
        async connectToOtherPerson() {
            v(this, f)[f].getRoomUpdates(v(this, E)[E], (t => {
                t.guestAnswer && v(this, R)[R] && v(this, j)[j](t.guestAnswer), !t.hostOffer || v(this, M)[M] || v(this, R)[R] || v(this, I)[I](t.hostOffer)
            })), v(this, f)[f].getRoomIceUpdates(v(this, E)[E], !v(this, R)[R], (async t => {
                await v(this, x)[x].addIceCandidate(new RTCIceCandidate(t))
            })), v(this, R)[R] && await this.createAndSaveOffer()
        }
    }
    Object.defineProperty(O, y, {
        writable: !0,
        value: void 0
    });
    var P = async function (t) {
        v(this, M)[M] = !0, await v(this, x)[x].setRemoteDescription(t);
        let e = await v(this, x)[x].createAnswer();
        await v(this, x)[x].setLocalDescription(e), await v(this, f)[f].saveAnswer(v(this, E)[E], e)
    }, T = async function (t) {
        await v(this, x)[x].setRemoteDescription(t)
    };
    let L = Object.freeze({
        Home: {
            path: "/apps/meet/index.html",
            component: "ukmp-home",
            title: "Home"
        },
        Room: {
            path: "/apps/meet/index.html",
            component: "ukmp-room",
            title: "Room"
        },
        About: {
            path: "/about",
            component: "ukmp-about",
            title: "About"
        }
    });

    function B(t, e) {
        if (!Object.prototype.hasOwnProperty.call(t, e)) throw TypeError("attempted to use private field on non-instance");
        return t
    }
    var S = 0;

    function _(t) {
        return "__private_" + S++ + "_" + t
    }
    var D = _("WebRTCService"),
        H = _("bc"),
        A = _("gotoRoomPage");
    class V extends HTMLElement {
        constructor() {
            super(), Object.defineProperty(this, A, {
                value: Y
            }), Object.defineProperty(this, D, {
                writable: !0,
                value: new O
            }), Object.defineProperty(this, H, {
                writable: !0,
                value: void 0
            }), t(this, '\n<div id="skeleton" class="skeleton" hidden>\n<div id="main-content-sk">\n<h1 class="sk-h"></h1>\n<div class="sk-w"></div>\n<h1 class="sk-h"></h1>\n<div style="display: flex; flex-direction: column;">\n<div class="input-s"></div>\n<div class="sk-w"></div>\n</div>\n<h1 class="sk-h"></h1>\n<div class="sk-w"></div>\n</div>\n</div>\n<div id="main-content" style="display: none;">\n<h1>Mulai Rapat</h1>\n<button class="button" onclick="this.newRoom()">New Room</button>\n<h1>Join Room</h1>\n<div style="display: flex; flex-direction: column;">\n<input\nis="text-input"\nid="roomIdInput"\nclass="input"\ntype="text"\nplaceholder="Room ID"\nautofocus\n/>\n<button class="button" onclick="this.joinRoom()">Join Room</button>\n</div>\n<h1>About</h1>\n<button class="button" onclick="this.gotoAboutPage()">About</button>\n</div>\n<div id="modal" style="display:none;">\n<div id="swipe-indicator"></div>\n<div id="modal-content">\nRoom not found\n</div>\n<button class="close"onclick="this.closeModal()">Paham</button>\n</div>\n<div id="overlay" style="display:none;"></div>\n', "\n\n:host {\ndisplay: flex;\njustify-content: center;\nalign-items: center;\nflex-direction: column;\nwidth: 100%;\nheight: 100%;\n}\n\nh1 {\ntext-align: center;\n}\n\n#roomIdInput {\nmin-width: 300px;\nbackground-color: #0d1117;\ncolor: white;\n}\n\n.skeleton {\nposition: relative;\nbackground: #eee;\noverflow: hidden;\nwidth: 100%;\nheight: 100%;\n}\n\n#main-content-sk {\ndisplay: flex;\nflex-direction: column;\nalign-items: center;\nposition: relative;\ntop: 50%;\ntransform: translateY(-50%);\n}\n\n.sk-h {\nwidth: 300px;\nheight: 36.8px;\nbackground-color: grey;\n}\n\n.input-s {\nwidth: 300px;\nheight: 39.19px;\nbackground-color: grey;\nborder: 1px solid white;\n}\n\n.sk-w {\nwidth: 300px;\nheight: 36px;\nbackground-color: grey;\n}\n\n.skeleton::after {\ndisplay: block;\ncontent: '';\nposition: absolute;\ntop: 0;\nleft: 0;\nwidth: 100%;\nheight: 100%;\n}\n\n#overlay {\nposition: fixed;\ntop: 0;\nleft: 0;\nwidth: 100%;\nheight: 100%;\nbackground: rgba(0,0,0,0.5);\n}\n\n[hidden] {\ndisplay: none!important;\n}\n\n[show] {\ndisplay: flex!important;\nflex-direction: column;\n}\n\n.close {\nbackground-color: black;\nborder: none;\nborder-radius: 25px;\nwidth: 100%;\nheight: 35px;\ncolor: white\n}\n\n.slide-in {\nanimation-name: slideIn;\nanimation-duration: 0.5s;\nanimation-timing-function: ease-in-out;\n}\n\n@keyframes slideIn {\nfrom {\nbottom: 0px; /* Mulai dari posisi di luar tampilan */\n}\nto {\nbottom: 90px; /* Posisi akhir yang diinginkan */\n}\n}\n\n#modal {\nposition: fixed;\nbottom: 90px;\nbackground: white;\ncolor: black;\npadding: 1em;\nz-index: 1000;\nwidth: 80%;\nborder-radius: 25px\n}\n\n#modal-content {\nmin-height: 100px;\ndisplay: flex;\nalign-items: center;\njustify-content: center;\n}\n\n#swipe-indicator {\nwidth: 50px;\nheight: 5px;\nbackground-color: #ccc;\nborder-radius: 2.5px;\nmargin: 10px auto;\n}\n\n@media (prefers-color-scheme: dark) {\nh1 {\nbackground-color: var(--dark-secondary);\ncolor: var(--front-color);\n}\n:host {\nbackground: var(--dark-background);;\n}\n.skeleton {\nposition: relative;\nbackground: #121212;\n}\n#modal {\nbackground: #0d1117;\ncolor: white;\n}\nbutton {\nbackground-color: var(--button-background);\ncolor: var(--front-color);\n}\ninput {\nbackground-color: var(--input-background);\ncolor: var(--front-color);\n}\n}\n\n")
        }
        connectedCallback() {
            B(this, H)[H] = new BroadcastChannel("room-auto-join"), B(this, H)[H].onmessage = t => {
                this.shadowRoot.getElementById("roomIdInput").value = t.data, this.joinRoom()
            }, this.modal = this.shadowRoot.getElementById("modal"), this.modal.addEventListener("click", this.handleOutsideClick.bind(this)), this.shadowRoot.getElementById("skeleton").style.display = "block", this.shadowRoot.getElementById("main-content").style.display = "none", this.shadowRoot.getElementById("main-content").setAttribute("show", ""), this.shadowRoot.getElementById("skeleton").setAttribute("hidden", ""), window.addEventListener("load", (() => {
                this.shadowRoot.getElementById("skeleton").setAttribute("hidden", ""), this.shadowRoot.getElementById("main-content").style.display = "flex", this.shadowRoot.getElementById("main-content").style.flexDirection = "column"
            }), 0)
        }
        disconnectedCallback() {
            B(this, H)[H].close()
        }
        async newRoom() {
            await B(this, D)[D].newRoom(), B(this, A)[A]()
        }
        async joinRoom() {
            let t = this.shadowRoot.getElementById("roomIdInput").value;
            t ? await B(this, D)[D].joinRoom(t) ? B(this, A)[A]() : this.showModal(" Room not found") : this.showModal("No Room")
        }
        gotoAboutPage() {
            let t = new CustomEvent("ChangePage", {
                detail: L.About
            });
            this.dispatchEvent(t)
        }
        handleOutsideClick(t) {
            this.modal.contains(t.target) || this.closeModal()
        }
        showModal(t) {
            this.modal = this.shadowRoot.getElementById("modal"), this.overlay = this.shadowRoot.getElementById("overlay"), this.modal.classList.add("slide-in"), this.modal.addEventListener("animationend", (() => {
                this.modal.classList.remove("slide-in"), this.modal.style.display = "block", this.modal.style.bottom = "90px"
            })), this.modal.style.display = "block", this.overlay.style.display = "block", this.modal.style.transform = "", this.overlay.addEventListener("click", this.closeModal.bind(this)), this.modal.querySelector("#modal-content").textContent = t, this.closeButton = this.modal.querySelector(".close"), this.closeButton.addEventListener("click", this.closeModal.bind(this)), this.modal.addEventListener("touchstart", this.handleTouchStart.bind(this)), this.modal.addEventListener("touchmove", this.handleTouchMove.bind(this)), this.modal.addEventListener("touchend", this.handleTouchEnd.bind(this)), document.documentElement.style.overflowY = "hidden"
        }
        handleTouchStart(t) {
            this.startY = t.touches[0].pageY, this.modalStartPosition = this.modal.getBoundingClientRect().top
        }
        handleTouchMove(t) {
            let e = t.touches[0].pageY - this.startY;
            this.moveModal(e)
        }
        handleTouchEnd(t) {
            t.changedTouches[0].pageY - this.startY > 100 && this.closeModal(), this.resetModalPosition()
        }
        moveModal(t) {
            this.modal.style.transform = `translateY(${t}px)`
        }
        resetModalPosition() {
            this.modal.style.transform = ""
        }
        closeModal() {
            this.modal.style.display = "none", this.overlay.style.display = "none", this.modal.removeEventListener("touchstart", this.handleTouchStart.bind(this)), this.modal.removeEventListener("touchmove", this.handleTouchMove.bind(this)), this.modal.removeEventListener("touchend", this.handleTouchEnd.bind(this)), this.closeButton.removeEventListener("click", this.closeModal.bind(this)), this.overlay.removeEventListener("click", this.closeModal.bind(this)), document.documentElement.style.overflowY = ""
        }
    }
    var Y = function () {
        let t = new CustomEvent("ChangePage", {
            detail: L.Room
        });
        this.dispatchEvent(t)
    };

    function U(t, e) {
        if (!Object.prototype.hasOwnProperty.call(t, e)) throw TypeError("attempted to use private field on non-instance");
        return t
    }
    var z = 0;

    function $(t) {
        return "__private_" + z++ + "_" + t
    }
    var W = $("currentPage"),
        X = $("defaultPage"),
        N = $("renderCorrectPage"),
        q = $("gotoNewPage"),
        J = $("addCurrentPageToHistory"),
        G = $("getCurrentPageFromUrl");
    class K extends HTMLElement {
        constructor() {
            super(), Object.defineProperty(this, G, {
                value: tt
            }), Object.defineProperty(this, J, {
                value: Z
            }), Object.defineProperty(this, q, {
                value: F
            }), Object.defineProperty(this, N, {
                value: Q
            }), Object.defineProperty(this, W, {
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, X, {
                writable: !0,
                value: L.Home
            }), t(this, "", ":host {\ndisplay: block;\nwidth: 100%;\nheight: 100%;\n}\n")
        }
        connectedCallback() {
            U(this, W)[W] = U(this, G)[G](), U(this, N)[N](), window.addEventListener("popstate", (t => {
                t.state ? U(this, W)[W] = t.state : U(this, W)[W] = U(this, X)[X], U(this, N)[N]()
            }))
        }
    }
    var Q = function () {
        let t = "CurrentPage",
            e = this.shadowRoot.getElementById(t);
        e && this.shadowRoot.removeChild(e);
        let n = document.createElement(U(this, W)[W].component);
        n.id = t, n.addEventListener("ChangePage", (t => U(this, q)[q](t.detail))), this.shadowRoot.appendChild(n);
        let o = U(this, W)[W].title;
        document.title = o
    },
        F = function (t) {
            U(this, W)[W] = t, U(this, J)[J](), U(this, N)[N]()
        },
        Z = function () {
            history.pushState(U(this, W)[W], U(this, W)[W].title, window.location.origin + U(this, W)[W].path)
        },
        tt = function () {
            for (let t in L)
                if (L[t].path === window.location.pathname) return L[t];
            return U(this, X)[X]
        };

    function et(t, e) {
        if (!Object.prototype.hasOwnProperty.call(t, e)) throw TypeError("attempted to use private field on non-instance");
        return t
    }
    var nt = 0;

    function ot(t) {
        return "__private_" + nt++ + "_" + t
    }
    var it = ot("localVideoStream"),
        st = ot("webRTCService"),
        at = ot("roomID"),
        dt = ot("connected"),
        rt = ot("returnToHome"),
        lt = ot("getDesiredCameraId");
    class ct extends HTMLElement {
        constructor() {
            super(), Object.defineProperty(this, lt, {
                value: ut
            }), Object.defineProperty(this, rt, {
                value: ht
            }), Object.defineProperty(this, it, {
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, st, {
                writable: !0,
                value: new O
            }), Object.defineProperty(this, at, {
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, dt, {
                writable: !0,
                value: !1
            }), t(this, '\n<ukmp-room-video id="video"></ukmp-room-video>\n<div class="toolbar">\n<button id="share" class="share">\n<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n<path d="M12.01 2.25c.74 0 1.47.1 2.18.25.32.07.55.33.59.65l.17 1.53a1.38 1.38 0 001.92 1.11l1.4-.61c.3-.13.64-.06.85.17a9.8 9.8 0 012.2 3.8c.1.3 0 .63-.26.82l-1.24.92a1.38 1.38 0 000 2.22l1.24.92c.26.19.36.52.27.82a9.8 9.8 0 01-2.2 3.8.75.75 0 01-.85.17l-1.4-.62a1.38 1.38 0 00-1.93 1.12l-.17 1.52a.75.75 0 01-.58.65 9.52 9.52 0 01-4.4 0 .75.75 0 01-.57-.65l-.17-1.52a1.38 1.38 0 00-1.93-1.11l-1.4.62a.75.75 0 01-.85-.18 9.8 9.8 0 01-2.2-3.8c-.1-.3 0-.63.27-.82l1.24-.92a1.38 1.38 0 000-2.22l-1.24-.92a.75.75 0 01-.28-.82 9.8 9.8 0 012.2-3.8c.23-.23.57-.3.86-.17l1.4.62c.4.17.86.15 1.25-.08.38-.22.63-.6.68-1.04l.17-1.53a.75.75 0 01.58-.65c.72-.16 1.45-.24 2.2-.25zm0 1.5c-.45 0-.9.04-1.35.12l-.11.97a2.89 2.89 0 01-4.02 2.33l-.9-.4A8.3 8.3 0 004.28 9.1l.8.59a2.88 2.88 0 010 4.64l-.8.59a8.3 8.3 0 001.35 2.32l.9-.4a2.88 2.88 0 014.02 2.32l.1.99c.9.15 1.8.15 2.7 0l.1-.99a2.88 2.88 0 014.02-2.32l.9.4a8.3 8.3 0 001.36-2.32l-.8-.59a2.88 2.88 0 010-4.64l.8-.59a8.3 8.3 0 00-1.35-2.32l-.9.4a2.88 2.88 0 01-4.02-2.32l-.11-.98c-.45-.08-.9-.11-1.34-.12zM12 8.25a3.75 3.75 0 110 7.5 3.75 3.75 0 010-7.5zm0 1.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>\n</svg>\n</button>\n<button id="hangupButton" class="button">Hang Up</button>\n<button id="chatButton" class="button">\n<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n<path d="M4 4h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2h-4l-4 4-4-4H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>\n<line x1="6" y1="8" x2="12" y2="8" stroke="currentColor" stroke-width="2"></line>\n<line x1="18" y1="11" x2="12" y2="11" stroke="currentColor" stroke-width="2"></line>\n<line x1="6" y1="14" x2="12" y2="14" stroke="currentColor" stroke-width="2"></line>\n</svg>\n</button>\n</div>\n<div id="shareModal" class="modsh">\n<div class="modal-share">\n<div class="swipe-indicator"></div>\n<div class="head">\n<h1>Undangan Rapat</h1>\n<span class="closeMod">&times;</span>\n</div>\n<h2>Rapat telah siap!"</h2>\n<div class="cont-ra">\n<div class="cotra">\n<h3>\n<span id="alam">https://ukmpapps.web.app/apps/meet/</span>\n</h3>\n<h3>\n<span id="roomID"></span>\n</h3>\n</div>\n<button id="copy">\n<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>\n<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>\n</svg>\n</button>\n</div>\n</div>\n</div>\n<div id="chatModal" class="modal">\n<div class="modal-content">\n<div class="swipe-indicator"></div>\n<div class="head">\n<h1>Panel Chat</h1>\n<span class="close">&times;</span>\n</div>\n<ukmp-room-chat id="chat"></ukmp-room-chat>\n</div>\n</div>\n', "\n.swipe-indicator {\nposition: absolute;\ntop: 5px;\nleft: 50%;\ntransform: translateX(-50%);\nwidth: 50px;\nheight: 8px;\nbackground-color: #cccccc;\nborder-radius: 40px;\n}\n.modsh {\nposition: fixed;\ndisplay: block;\nz-index: 1;\npadding-top: 100px; \nleft: 0;\ntop: 0;\nwidth: 100%; \nheight: 100%; \noverflow: auto; \nbackground-color: rgb(0,0,0); \nbackground-color: rgba(0,0,0,0.4);\n}\n.modal-share {\nposition: absolute;\nbottom: 90px;\nleft: 0;\nbackground-color: #fefefe;\nmargin: auto;\npadding: 20px;\nborder: 1px solid #888;\nwidth: 70%;\nborder-radius: 45px;\n}\n.toolbar {\nposition: fixed;\nbottom: 0;\nleft: 50%;\ntransform: translateX(-50%);\nbackground-color: grey;\nwidth: 100%;\ndisplay: flex;\njustify-content: space-around;\n}\n.head {\nwidth: 100%;\ndisplay: flex;\njustify-content: space-between;\nalign-items: center;\n}\n.cont-ra {\ndisplay: flex;\nalign-items: center;\njustify-content: space-around;\n}\n.cotra {\ndisplay: flex;\nflex-direction: column;\nalign-items: flex-start;\njustify-content: flex-start;\n}\n.modal {\ndisplay: none; \nposition: fixed; \nz-index: 1; \npadding-top: 100px; \nleft: 0;\ntop: 0;\nwidth: 100%; \nheight: 100%; \noverflow: auto; \nbackground-color: rgb(0,0,0); \nbackground-color: rgba(0,0,0,0.4);\n}\n#copy {\nborder; none;\nbacground-color: transparent;\n}\n.modal-content {\nposition: absolute;\nbottom: 90px;\nbackground-color: #fefefe;\nmargin: auto;\npadding: 20px;\nborder: 1px solid #888;\nwidth: 80%;\nborder-radius: 45px;\nleft: 50%;\ntransform: translateX(-50%);\n}\n.close {\ncolor: #aaaaaa;\nfloat: right;\nfont-size: 50px;\nfont-weight: bold;\n}\n.close:hover,\n.close:focus {\ncolor: #000;\ntext-decoration: none;\ncursor: pointer;\n}\n.closeMod {\ncolor: #aaaaaa;\nfloat: right;\nfont-size: 50px;\nfont-weight: bold;\n}\n.closeMod:hover,\n.closeMod:focus {\ncolor: #000;\ntext-decoration: none;\ncursor: pointer;\n}\n@media (prefers-color-scheme: dark) {\n.modal-content {\nbackground-color: #12121e;\n}\n.modal-share {\nbackground-color: #12121e;\n}\n#copy {\nborder; none;\nbacground-color: #12121e;\n}\n.toolbar {\nbackground-color: #0d0c14;\n}\n")
        }
        connectedCallback() {
            if (!et(this, st)[st].getRoomId()) return et(this, rt)[rt](), !1;
            et(this, at)[at] = et(this, st)[st].getRoomId(), this.shadowRoot.getElementById("roomID").innerText = et(this, at)[at], et(this, st)[st].getIsHost() && (this.addRoomIdToClipboard(), this.sendBcMessageWithRoomId()), this.setupVideo(), this.shadowRoot.getElementById("hangupButton").addEventListener("click", this.hangupCall.bind(this)), this.shadowRoot.getElementById("copy").addEventListener("click", (() => {
                this.copyToClipboard()
            })), this.shadowRoot.getElementById("share").addEventListener("click", (() => {
                this.shadowRoot.getElementById("shareModal").style.display = "block"
            })), this.shadowRoot.getElementById("chatButton").addEventListener("click", (() => {
                this.shadowRoot.getElementById("chatModal").style.display = "block"
            })), this.shadowRoot.querySelector(".closeMod").addEventListener("click", (() => {
                this.shadowRoot.getElementById("shareModal").style.display = "none"
            })), this.shadowRoot.querySelector(".close").addEventListener("click", (() => {
                this.shadowRoot.getElementById("chatModal").style.display = "none"
            })), [this.shadowRoot.getElementById("shareModal"), this.shadowRoot.getElementById("chatModal")].forEach((t => {
                let e = 0,
                    n = 0;
                t.addEventListener("click", (e => {
                    e.target === t && (t.style.display = "none")
                })), t.addEventListener("touchstart", (o => {
                    n = e = o.touches[0].clientY, t.style.transform = "", document.documentElement.style.overflowY = "hidden"
                })), t.addEventListener("touchmove", (o => {
                    n = o.touches[0].clientY;
                    let i = n - e;
                    i > 0 && (t.style.transform = `translateY(${i}px)`)
                })), t.addEventListener("touchend", (n => {
                    n.changedTouches[0].clientY - e > 50 ? (t.style.display = "none", t.style.transform = "", document.documentElement.style.overflowY = "") : t.style.transform = ""
                }))
            }))
        }
        hangupCall() {
            this.peerConnection && (this.peerConnection.getTracks().forEach((t => t.stop())), this.peerConnection.close(), this.peerConnection = null), this.shadowRoot.getElementById("video").setRemoteVideo(null), alert("Call ended.")
        }
        copyToClipboard() {
            let t = new Date,
                e = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][t.getDay()],
                n = `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`,
                o = this.shadowRoot.getElementById("roomID").innerText,
                i = `\nSaya mengundang anda untuk bergabung pada rapat yang diselenggarakan\nhari: ${e}\njam: ${n}\nwebsite: ${this.shadowRoot.getElementById("alam").innerText}\nRoom ID: ${o}\n`;
            navigator.clipboard.writeText(i).then((() => {
                console.log("Text copied to clipboard")
            })).catch((t => {
                console.error("Could not copy text: ", t)
            }))
        }
        async addRoomIdToClipboard() {
            await navigator.clipboard.writeText(et(this, at)[at])
        }
        sendBcMessageWithRoomId() {
            let t = new BroadcastChannel("room-auto-join");
            t.postMessage(et(this, at)[at]), t.close()
        }
        async setupVideo() {
            let t = await navigator.mediaDevices.enumerateDevices(),
                e = {
                    width: {
                        ideal: 720
                    },
                    height: {
                        ideal: 480
                    },
                    frameRate: {
                        ideal: 30
                    }
                },
                n = et(this, lt)[lt](t);
            n && (e = {
                ...e,
                deviceId: n.deviceId
            });
            let o = {
                video: e,
                audio: !0
            };
            navigator.mediaDevices.getUserMedia(o).then((t => this.onUserAllowVideo(t)), (t => {
                console.warn(t), alert("Can't get camera 😞")
            }))
        }
        onRemoteVideo(t) {
            this.shadowRoot.getElementById("video").setRemoteVideo(t), et(this, dt)[dt] = !0, this.showChat()
        }
        onUserAllowVideo(t) {
            et(this, it)[it] = t, et(this, st)[st].setupPeerConnection(et(this, it)[it], this.onRemoteVideo.bind(this)), this.shadowRoot.getElementById("video").setLocalVideo(et(this, it)[it]), et(this, st)[st].connectToOtherPerson()
        }
        showChat() {
            let t = document.createElement("ukmp-chat");
            this.shadowRoot.appendChild(t)
        }
    }
    var ht = function () {
        let t = new CustomEvent("ChangePage", {
            detail: L.Home
        });
        this.dispatchEvent(t)
    },
        ut = function (t) {
            let e = t.find((t => "Logi Capture" === t.label));
            return et(this, st)[st].getIsHost() ? e : t.find((t => "Microsoft® LifeCam Studio(TM) (045e:0772)" === t.label)) || e
        };

    function pt(t, e) {
        if (!Object.prototype.hasOwnProperty.call(t, e)) throw TypeError("attempted to use private field on non-instance");
        return t
    }
    var mt = 0;

    function gt(t) {
        return "__private_" + mt++ + "_" + t
    }
    var vt = gt("localVideoStream"),
        bt = gt("remoteVideoStream");
    class wt extends HTMLElement {
        constructor() {
            super(), this.isDragging = !1,
                Object.defineProperty(this, vt, {
                    writable: !0,
                    value: void 0
                }),
                Object.defineProperty(this, bt, {
                    writable: !0,
                    value: void 0
                }), t(this, '<div class="videos-container">\n<video id="localVideo" class="drag-me" autoplay></video>\n<video id="remoteVideo" autoplay></video>\n</div>\n<script src="https://g4lihru.me/ai/ukmp/ukmp-call/ukmplocal.js"><\/script>\n<style>\n:host {\ndisplay: flex;\njustify-content: center;\nalign-items: center;\nflex-direction: column;\nwidth: 100%;\nheight: 100%;\n}\n\n.videos-container {\ndisplay: flex;\njustify-content: center;\nalign-items: center;\nposition: absolute;\ntop: 0;\nwidth: 100%;\nheight: 100%;\n}\n\n#remoteVideo {\nwidth: 100%;\nheight: 100%;\nobject-fit: cover;\nborder-radius: 15px;\n}\n#localVideo {\nbottom: 90px;\nright: 0;\nwidth: 200px;\nheight: 250px;\ncursor: move;\nobject-fit: cover;\nposition: absolute;\nborder-radius: 30px;\nz-index:1;\n}\n</style>', "")
        }
        setLocalVideo(t) {
            pt(this, vt)[vt] = t, this.shadowRoot.getElementById("localVideo").srcObject = pt(this, vt)[vt]
        }
        setRemoteVideo(t) {
            pt(this, bt)[bt] = t, this.shadowRoot.getElementById("remoteVideo").srcObject = pt(this, bt)[bt]
        }
        connectedCallback() {
            let t = this.shadowRoot.getElementById("localVideo");
            t.addEventListener("mousedown", this.handleMouseDown.bind(this), !1), t.addEventListener("touchstart", this.handleTouchStart.bind(this), !1), window.addEventListener("mousemove", this.handleMouseMove.bind(this), !1), window.addEventListener("touchmove", this.handleTouchMove.bind(this), !1), window.addEventListener("mouseup", this.handleMouseUp.bind(this), !1), window.addEventListener("touchend", this.handleMouseUp.bind(this), !1)
        }
        handleTouchStart(t) {
            t.preventDefault(), this.handleMouseDown(t.touches[0])
        }
        handleMouseDown(t) {
            this.isDragging = !0, this.offset = [this.shadowRoot.getElementById("localVideo").offsetLeft - t.clientX, this.shadowRoot.getElementById("localVideo").offsetTop - t.clientY]
        }
        handleTouchMove(t) {
            this.handleMouseMove(t.touches[0])
        }
        handleMouseMove(t) {
            if (this.isDragging) {
                let e = this.shadowRoot.getElementById("localVideo");
                e.style.left = t.clientX + this.offset[0] + "px", e.style.top = t.clientY + this.offset[1] + "px"
            }
        }
        handleMouseUp(t) {
            this.isDragging = !1
        }
    }

    function yt(t, e) {
        if (!Object.prototype.hasOwnProperty.call(t, e)) throw TypeError("attempted to use private field on non-instance");
        return t
    }
    var ft = 0;

    function kt(t) {
        return "__private_" + ft++ + "_" + t
    }
    var xt = kt("webRTCService"),
        Et = kt("DataChannelService"),
        Rt = kt("chatMessageText");
    class Ct extends HTMLElement {
        constructor() {
            super(), Object.defineProperty(this, xt, {
                writable: !0,
                value: new O
            }), Object.defineProperty(this, Et, {
                writable: !0,
                value: new r
            }), Object.defineProperty(this, Rt, {
                writable: !0,
                value: ""
            }), t(this, '\n<h1>Chat!</h1>\n<div class="chat-container">\n<div id="chatList"></div>\n<div class="inputs-container">\n<input\nid="chatMessage"\nclass="input"\ntype="text"\nplaceholder="Room ID"\nonchange="this.chatMessageChange(this)"\nautofocus\n/>\n<button class="button chatk" onclick="this.sendChatMessage()">Send message</button>\n<button id="locationButton" class="button chatk">Send location</button>\n</div>\n</div>\n', "\n:host {\ndisplay: flex;\nflex-direction: column;\njustify-content: center;\nwidth: 100%;\nalign-items: center;\n}\n\n.inputs-container {\ndisplay: flex;\nwidth: 100%;\njustify-content: center;\nalign-items: center;\n}\n\n.input {\nwidth: 90%;\nmargin-right: 5px;\n}\n\n.chat-container {\ndisplay: flex;\nflex-direction: column;\njustify-content: center;\ngap: 10px;\nwidth: 100%;\nalign-items: center;\n}\n\n#chatList {\nwidth: 100%;\nheight: 200px;\nmargin-right: 5px;\nborder: 1px solid #ffffff;\npadding: 5px;\noverflow-y: scroll;\ndisplay: flex;\nalign-items: center;\njustify-content: center;\nflex-direction: column;\n}\n.chatk {\nbackground-color: white;\ncolor: black;\nborder-radius: 25px;\nborder: none;\n}\n\n.my-message,\n.other-message {\nborder-radius: 18px;\npadding: 8px 12px;\nmargin: 5px 2px;\ndisplay: inline-block;\n}\n\n.my-message {\nbackground-color: rgb(0, 132, 255);\ntext-align: right;\n\nmargin-left: auto;\n}\n\n.other-message {\nbackground-color: rgb(62, 64, 66);\nmargin-right: auto;\n}\n.message-status {\nfont-size: 0.8em;\ntext-align: right;\ncolor: #aaa;\n}\n.toolbar {\nwidth: 100%;\ndisplay: flex;\njustify-content: flex-end;\ngap: 10px;\n}\n\n@media (prefers-color-scheme: dark) {\n.input {\nbackground-color: #12121e;\ncolor: white;\n}\n.chatk {\nbackground-color: black;\ncolor: white;\n}\n\n")
        }
        connectedCallback() {
            yt(this, Et)[Et].getNewMessages((t => {
                this.addMessageToChat(t, !1)
            })), this.shadowRoot.getElementById("locationButton").addEventListener("click", (() => this.sendLocation()))
        }
        chatMessageChange(t) {
            yt(this, Rt)[Rt] = t.value
        }
        sendChatMessage() {
            yt(this, Et)[Et].sendChatMessage(yt(this, Rt)[Rt]), this.addMessageToChat(yt(this, Rt)[Rt], !0), yt(this, Rt)[Rt] = "", this.shadowRoot.getElementById("chatMessage").value = yt(this, Rt)[Rt]
        }
        sendLocation() {
            navigator.geolocation ? navigator.geolocation.getCurrentPosition((t => {
                let e = `Lokasi saya di lat: ${t.coords.latitude}, lon: ${t.coords.longitude}`;
                yt(this, Et)[Et].sendChatMessage(e), this.addMessageToChat(e, !0)
            }), (() => {
                console.log("Unable to retrieve your location")
            })) : console.log("Geolocation is not supported by your browser")
        }
        addMessageToChat(t, e, n) {
            let o = this.shadowRoot.getElementById("chatList"),
                i = `<div class="${e ? "my-message" : "other-message"}">\n<b>${e ? "You: " : "Guest: "}</b>${t}\n<div class="toolbar">\n<div class="message-time">${(new Date).toLocaleTimeString()}</div>\n<div class="message-status">${"read" === n ? "✔✔" : "✔"}</div>\n</div>\n</div>`;
            o.innerHTML = o.innerHTML + i
        }
    }
    var Mt = 0,
        It = "__private_" + Mt++ + "_goHomeEvent";
    class jt extends HTMLElement {
        constructor() {
            super(), Object.defineProperty(this, It, {
                writable: !0,
                value: new CustomEvent("ChangePage", {
                    detail: L.Home
                })
            }), t(this, '\n<div id="content" class="slide-in">\n<h1>WebRTC UKMP!</h1>\n<img src="../logo/arunika.webp"" class="img">\n<button style="width: 100%;" class="button" onclick="this.back()">Back</button>\n</div>\n', "\n:host {\ndisplay: flex;\njustify-content: center;\nalign-items: center;\nflex-direction: column;\nwidth: 100%;\nheight: 100%;\n}\n\nh1 {\ntext-align: center;\n}\n\n.input {\nmin-width: 300px;\n}\n\n.img {\nwidth: 100%;\nmargin-bottom: 20px;\n}\n\n.slide-in {\nanimation: slide-in 0.5s forwards;\n}\n\n.slide-out {\nanimation: slide-out 0.5s forwards;\n}\n\n@keyframes slide-in {\nfrom {\ntransform: translateX(-100%);\n}\n\nto {\ntransform: translateX(0);\n}\n}\n\n@keyframes slide-out {\nfrom {\ntransform: translateX(0);\n}\n\nto {\ntransform: translateX(-100%);\n}\n}\n")
        }
        back() {
            let t = this.shadowRoot.getElementById("content");
            t.classList.remove("slide-in"), t.classList.add("slide-out"), setTimeout((() => {
                this.dispatchEvent(function (t, e) {
                    if (!Object.prototype.hasOwnProperty.call(t, e)) throw TypeError("attempted to use private field on non-instance");
                    return t
                }(this, It)[It]), this.dispatchEvent(new CustomEvent("goBack", {
                    bubbles: !0,
                    composed: !0
                }))
            }), 500)
        }
        connectedCallback() {
            this.addEventListener("goBack", (() => {
                this.shadowRoot.getElementById("skeleton").setAttribute("hidden", "")
            }))
        }
    }
    class Ot extends HTMLInputElement {
        constructor() {
            super()
        }
        connectedCallback() {
            this.validate(), this.addEventListener("keyup", this.validate.bind(this))
        }
        disconnectedCallback() {
            this.removeEventListener("keyup", this.validate.bind(this))
        }
        validate() {
            this.value ? this.style.border = "" : this.style.border = "2px solid red"
        }
    }
    firebase.initializeApp({
        apiKey: "AIzaSyCgTQkGRQBqmvCY4u6wuJ1MTVQ7YPViUig",
        authDomain: "web-components-webrtc.firebaseapp.com",
        databaseURL: "https://web-components-webrtc.firebaseio.com",
        projectId: "web-components-webrtc",
        storageBucket: "web-components-webrtc.appspot.com",
        messagingSenderId: "57628399273",
        appId: "1:57628399273:web:c01bfb9b6cf5d164007bb8"
    }), customElements.define("ukmp-router", K), customElements.define("ukmp-home", V), customElements.define("ukmp-about", jt), customElements.define("ukmp-room", ct), customElements.define("ukmp-room-video", wt), customElements.define("ukmp-room-chat", Ct), customElements.define("text-input", Ot, {
        extends: "input"
    })
})();