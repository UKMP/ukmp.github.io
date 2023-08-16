document.addEventListener("DOMContentLoaded", (function () {
    document.getElementById("bottom");
    var e, t, n, s = document.querySelector(".menu"),
        i = document.querySelector(".app-menu-container"),
        a = document.querySelector(".menu-background"),
        o = document.querySelector(".butappa"),
        r = !1,
        c = 0,
        u = 0,
        l = 0,
        m = 0,
        d = !1,
        v = !1,
        b = 0,
        L = 0,
        f = 0,
        y = "",
        p = function () {
            e.addEventListener("touchstart", g, !1), e.addEventListener("touchmove", h, !1), e.addEventListener("touchend", k, !1), a.addEventListener("click", T, !1), o.addEventListener("click", w, !1)
        };

    function g(e) {
        t = (new Date).getTime(), c = e.touches[0].pageY, u = e.touches[0].pageX, document.querySelector(".bottom").scrollTop <= 0 && (r = !0, function (e, t) {
            d = null !== document.querySelector(".menu.menu--visible");
            s.classList.add("no-transition"), i.classList.add("no-transition"), v = !0, b = document.querySelector(".app-menu").offsetWidth, L = e, t, f = d ? 0 : -b;
            y = "", s.classList.add("menu--background-visible")
        }(c, u))
    }

    function h(e) {
        if (!r) return;
        l = e.touches[0].pageY, m = e.touches[0].pageX;
        ! function (e, t, n, s, i) {
            y || (y = Math.abs(s) >= Math.abs(i) ? "vertical" : "horizontal", requestAnimationFrame(q));
            if ("horizontal" === y) L = t, n;
            else {
                f + (t - L) > 0 && f + (t - L) > -b && e.cancelable ? (f += t - L, e.preventDefault()) : f + (t - L) < 0 && f + (t - L) > -b && e.stopPropagation(), L = t, n, a.classList.add("no-transition");
                var o = .5 * (100 - 100 * Math.abs(f) / b) / 100;
                a.style.opacity !== o.toFixed(2) && o.toFixed(1) % 1 != 0 && (a.style.opacity = o.toFixed(2))
            }
        }(e, l, m, l - c, m - u)
    }

    function k(e) {
        if (!r) return;
        r = !1;
        const n = l - c,
            o = (new Date).getTime() - t;
        ! function (e, t, n, o, r) {
            v = !1;
            var c = .3;
            0 === e && 0 === t ? d ? (i.classList.remove("no-transition"), s.classList.remove("no-transition")) : (s.classList.remove("menu--background-visible"), s.classList.remove("no-transition")) : d ? n < -b / 2 || Math.abs(n) / r > c ? (E(n), d = !1) : (S(), d = !0) : n > b / 2 || Math.abs(n) / r > c ? (S(), d = !0) : (E(n), d = !1);
            s.classList.remove("no-transition"), i.classList.remove("no-transition"), a.classList.remove("no-transition"), s.classList.add("menu--animatable")
        }(l, m, n, 0, o)
    }

    function q() {
        if (v) {
            var e = document.querySelector(".app-menu-container");
            e.style.transform = "translateY(" + f + "px)", e.style.webkitTransform = "translateY(" + f + "px)", requestAnimationFrame(q)
        }
    }

    function E(e) {
        (e > 0 || !d) && (i.style.transform = "", i.style.webkitTransform = "", s.classList.remove("menu--background-visible"), s.classList.remove("menu--visible"), s.addEventListener("transitionend", (function e() {
            a.style.opacity = "", a.style.display = "", s.classList.remove("menu--background-visible"), s.classList.remove("menu--animatable"), s.removeEventListener("transitionend", e, !1)
        }), !1))
    }

    function S() {
        i.style.transform = "", i.style.webkitTransform = "", s.classList.add("menu--visible"), s.classList.add("menu--background-visible"), a.style.opacity = ""
    }

    function T() {
        s.addEventListener("transitionend", (function e() {
            s.classList.remove("menu--background-visible"), s.classList.remove("menu--animatable"), a.style.display = "", s.removeEventListener("transitionend", e)
        }), !1), s.classList.remove("menu--visible")
    }

    function w() {
        s.classList.add("menu--background-visible"), requestAnimationFrame((function () {
            setTimeout((function () {
                s.classList.add("menu--visible"), s.classList.add("menu--animatable")
            }), 1)
        }))
    }
    n = document.querySelector(".app-menu-container"), e = n, t = (new Date).getTime(), p()
}));