
(function(Y, O) {
    "object" === typeof module && module.exports ? (O["default"] = O, module.exports = Y.document ? O(Y) : O) : "function" === typeof define && define.amd ? define("highcharts/highmaps", function() {
        return O(Y)
    }) : (Y.Highcharts && Y.Highcharts.error(16, !0), Y.Highcharts = O(Y))
})("undefined" !== typeof window ? window : this, function(Y) {
    function O(c, f, G, q) {
        c.hasOwnProperty(f) || (c[f] = q.apply(null, G))
    }
    var u = {};
    O(u, "parts/Globals.js", [], function() {
        var c = "undefined" !== typeof Y ? Y : "undefined" !== typeof window ? window : {},
            f = c.document,
            G = c.navigator && c.navigator.userAgent || "",
            q = f && f.createElementNS && !!f.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            A = /(edge|msie|trident)/i.test(G) && !c.opera,
            t = -1 !== G.indexOf("Firefox"),
            M = -1 !== G.indexOf("Chrome"),
            C = t && 4 > parseInt(G.split("Firefox/")[1], 10);
        return {
            product: "Highcharts",
            version: "8.0.2",
            deg2rad: 2 * Math.PI / 360,
            doc: f,
            hasBidiBug: C,
            hasTouch: !!c.TouchEvent,
            isMS: A,
            isWebKit: -1 !== G.indexOf("AppleWebKit"),
            isFirefox: t,
            isChrome: M,
            isSafari: !M && -1 !== G.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(G),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: q,
            win: c,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {},
            charts: [],
            dateFormats: {}
        }
    });
    O(u, "parts/Utilities.js", [u["parts/Globals.js"]], function(c) {
        function f() {
            var a, b = arguments,
                d = {},
                n = function(a, b) {
                    "object" !== typeof a && (a = {});
                    aa(b, function(d, e) {
                        !z(d, !0) || p(d) || w(d) ? a[e] = b[e] : a[e] = n(a[e] || {}, d)
                    });
                    return a
                };
            !0 === b[0] && (d = b[1], b = Array.prototype.slice.call(b, 2));
            var e = b.length;
            for (a = 0; a <
                e; a++) d = n(d, b[a]);
            return d
        }

        function G(b, d, n) {
            var e;
            m(d) ? a(n) ? b.setAttribute(d, n) : b && b.getAttribute && ((e = b.getAttribute(d)) || "class" !== d || (e = b.getAttribute(d + "Name"))) : aa(d, function(a, d) {
                b.setAttribute(d, a)
            });
            return e
        }

        function q() {
            for (var a = arguments, b = a.length, d = 0; d < b; d++) {
                var n = a[d];
                if ("undefined" !== typeof n && null !== n) return n
            }
        }

        function A(a, b) {
            if (!a) return b;
            var d = a.split(".").reverse();
            if (1 === d.length) return b[a];
            for (a = d.pop();
                "undefined" !== typeof a && "undefined" !== typeof b && null !== b;) b = b[a], a = d.pop();
            return b
        }
        c.timers = [];
        var t = c.charts,
            M = c.doc,
            C = c.win,
            F = c.error = function(a, b, d, n) {
                var e = K(a),
                    E = e ? "Highcharts error #" + a + ": www.highcharts.com/errors/" + a + "/" : a.toString(),
                    g = function() {
                        if (b) throw Error(E);
                        C.console && console.log(E)
                    };
                if ("undefined" !== typeof n) {
                    var l = "";
                    e && (E += "?");
                    c.objectEach(n, function(a, b) {
                        l += "\n" + b + ": " + a;
                        e && (E += encodeURI(b) + "=" + encodeURI(a))
                    });
                    E += l
                }
                d ? c.fireEvent(d, "displayError", {
                    code: a,
                    message: E,
                    params: n
                }, g) : g()
            },
            D = function() {
                function a(a, b, d) {
                    this.options = b;
                    this.elem = a;
                    this.prop =
                        d
                }
                a.prototype.dSetter = function() {
                    var a = this.paths[0],
                        b = this.paths[1],
                        d = [],
                        n = this.now,
                        e = a.length;
                    if (1 === n) d = this.toD;
                    else if (e === b.length && 1 > n)
                        for (; e--;) {
                            var E = parseFloat(a[e]);
                            d[e] = isNaN(E) || "A" === b[e - 4] || "A" === b[e - 5] ? b[e] : n * parseFloat("" + (b[e] - E)) + E
                        } else d = b;
                    this.elem.attr("d", d, null, !0)
                };
                a.prototype.update = function() {
                    var a = this.elem,
                        b = this.prop,
                        d = this.now,
                        n = this.options.step;
                    if (this[b + "Setter"]) this[b + "Setter"]();
                    else a.attr ? a.element && a.attr(b, d, null, !0) : a.style[b] = d + this.unit;
                    n && n.call(a, d, this)
                };
                a.prototype.run = function(a, b, d) {
                    var n = this,
                        e = n.options,
                        E = function(a) {
                            return E.stopped ? !1 : n.step(a)
                        },
                        g = C.requestAnimationFrame || function(a) {
                            setTimeout(a, 13)
                        },
                        l = function() {
                            for (var a = 0; a < c.timers.length; a++) c.timers[a]() || c.timers.splice(a--, 1);
                            c.timers.length && g(l)
                        };
                    a !== b || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = a, this.end = b, this.unit = d, this.now = this.start, this.pos = 0, E.elem = this.elem, E.prop = this.prop, E() && 1 === c.timers.push(E) && g(l)) : (delete e.curAnim[this.prop], e.complete &&
                        0 === Object.keys(e.curAnim).length && e.complete.call(this.elem))
                };
                a.prototype.step = function(a) {
                    var b = +new Date,
                        d = this.options,
                        n = this.elem,
                        e = d.complete,
                        E = d.duration,
                        g = d.curAnim;
                    if (n.attr && !n.element) a = !1;
                    else if (a || b >= E + this.startTime) {
                        this.now = this.end;
                        this.pos = 1;
                        this.update();
                        var l = g[this.prop] = !0;
                        aa(g, function(a) {
                            !0 !== a && (l = !1)
                        });
                        l && e && e.call(n);
                        a = !1
                    } else this.pos = d.easing((b - this.startTime) / E), this.now = this.start + (this.end - this.start) * this.pos, this.update(), a = !0;
                    return a
                };
                a.prototype.initPath = function(a,
                    b, d) {
                    function n(a) {
                        for (H = a.length; H--;) {
                            var b = "M" === a[H] || "L" === a[H];
                            var d = /[a-zA-Z]/.test(a[H + 3]);
                            b && d && a.splice(H + 1, 0, a[H + 1], a[H + 2], a[H + 1], a[H + 2])
                        }
                    }

                    function e(a, b) {
                        for (; a.length < r;) {
                            a[0] = b[r - a.length];
                            var d = a.slice(0, B);
                            [].splice.apply(a, [0, 0].concat(d));
                            P && (d = a.slice(a.length - B), [].splice.apply(a, [a.length, 0].concat(d)), H--)
                        }
                        a[0] = "M"
                    }

                    function E(a, b) {
                        for (var d = (r - a.length) / B; 0 < d && d--;) J = a.slice().splice(a.length / y - B, B * y), J[0] = b[r - B - d * B], h && (J[B - 6] = J[B - 2], J[B - 5] = J[B - 1]), [].splice.apply(a, [a.length /
                            y, 0
                        ].concat(J)), P && d--
                    }
                    b = b || "";
                    var g = a.startX,
                        l = a.endX,
                        h = -1 < b.indexOf("C"),
                        B = h ? 7 : 3,
                        J, H;
                    b = b.split(" ");
                    d = d.slice();
                    var P = a.isArea,
                        y = P ? 2 : 1;
                    h && (n(b), n(d));
                    if (g && l) {
                        for (H = 0; H < g.length; H++)
                            if (g[H] === l[0]) {
                                var T = H;
                                break
                            } else if (g[0] === l[l.length - g.length + H]) {
                            T = H;
                            var v = !0;
                            break
                        } else if (g[g.length - 1] === l[l.length - g.length + H]) {
                            T = g.length - H;
                            break
                        }
                        "undefined" === typeof T && (b = [])
                    }
                    if (b.length && K(T)) {
                        var r = d.length + T * y * B;
                        v ? (e(b, d), E(d, b)) : (e(d, b), E(b, d))
                    }
                    return [b, d]
                };
                a.prototype.fillSetter = function() {
                    c.Fx.prototype.strokeSetter.apply(this,
                        arguments)
                };
                a.prototype.strokeSetter = function() {
                    this.elem.attr(this.prop, c.color(this.start).tweenTo(c.color(this.end), this.pos), null, !0)
                };
                return a
            }();
        c.Fx = D;
        c.merge = f;
        var k = c.pInt = function(a, b) {
                return parseInt(a, b || 10)
            },
            m = c.isString = function(a) {
                return "string" === typeof a
            },
            x = c.isArray = function(a) {
                a = Object.prototype.toString.call(a);
                return "[object Array]" === a || "[object Array Iterator]" === a
            },
            z = c.isObject = function(a, b) {
                return !!a && "object" === typeof a && (!b || !x(a))
            },
            w = c.isDOMElement = function(a) {
                return z(a) &&
                    "number" === typeof a.nodeType
            },
            p = c.isClass = function(a) {
                var b = a && a.constructor;
                return !(!z(a, !0) || w(a) || !b || !b.name || "Object" === b.name)
            },
            K = c.isNumber = function(a) {
                return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
            },
            e = c.erase = function(a, b) {
                for (var d = a.length; d--;)
                    if (a[d] === b) {
                        a.splice(d, 1);
                        break
                    }
            },
            a = c.defined = function(a) {
                return "undefined" !== typeof a && null !== a
            };
        c.attr = G;
        var g = c.splat = function(a) {
                return x(a) ? a : [a]
            },
            h = c.syncTimeout = function(a, b, d) {
                if (0 < b) return setTimeout(a, b, d);
                a.call(0, d);
                return -1
            },
            d = c.clearTimeout = function(b) {
                a(b) && clearTimeout(b)
            },
            b = c.extend = function(a, b) {
                var d;
                a || (a = {});
                for (d in b) a[d] = b[d];
                return a
            };
        c.pick = q;
        var l = c.css = function(a, d) {
                c.isMS && !c.svg && d && "undefined" !== typeof d.opacity && (d.filter = "alpha(opacity=" + 100 * d.opacity + ")");
                b(a.style, d)
            },
            y = c.createElement = function(a, d, n, e, E) {
                a = M.createElement(a);
                d && b(a, d);
                E && l(a, {
                    padding: "0",
                    border: "none",
                    margin: "0"
                });
                n && l(a, n);
                e && e.appendChild(a);
                return a
            },
            r = c.extendClass = function(a, d) {
                var n = function() {};
                n.prototype = new a;
                b(n.prototype,
                    d);
                return n
            },
            v = c.pad = function(a, b, d) {
                return Array((b || 2) + 1 - String(a).replace("-", "").length).join(d || "0") + a
            },
            I = c.relativeLength = function(a, b, d) {
                return /%$/.test(a) ? b * parseFloat(a) / 100 + (d || 0) : parseFloat(a)
            },
            L = c.wrap = function(a, b, d) {
                var n = a[b];
                a[b] = function() {
                    var a = Array.prototype.slice.call(arguments),
                        b = arguments,
                        e = this;
                    e.proceed = function() {
                        n.apply(e, arguments.length ? arguments : b)
                    };
                    a.unshift(n);
                    a = d.apply(this, a);
                    e.proceed = null;
                    return a
                }
            },
            Q = c.format = function(a, b, d) {
                var n = "{",
                    e = !1,
                    E = [],
                    g = /f$/,
                    l = /\.([0-9])/,
                    h = c.defaultOptions.lang,
                    B = d && d.time || c.time;
                for (d = d && d.numberFormatter || T; a;) {
                    var J = a.indexOf(n);
                    if (-1 === J) break;
                    var H = a.slice(0, J);
                    if (e) {
                        H = H.split(":");
                        n = A(H.shift() || "", b);
                        if (H.length && "number" === typeof n)
                            if (H = H.join(":"), g.test(H)) {
                                var y = parseInt((H.match(l) || ["", "-1"])[1], 10);
                                null !== n && (n = d(n, y, h.decimalPoint, -1 < H.indexOf(",") ? h.thousandsSep : ""))
                            } else n = B.dateFormat(H, n);
                        E.push(n)
                    } else E.push(H);
                    a = a.slice(J + 1);
                    n = (e = !e) ? "}" : "{"
                }
                E.push(a);
                return E.join("")
            },
            N = c.getMagnitude = function(a) {
                return Math.pow(10,
                    Math.floor(Math.log(a) / Math.LN10))
            },
            R = c.normalizeTickInterval = function(a, b, d, n, e) {
                var E = a;
                d = q(d, 1);
                var g = a / d;
                b || (b = e ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === n && (1 === d ? b = b.filter(function(a) {
                    return 0 === a % 1
                }) : .1 >= d && (b = [1 / d])));
                for (n = 0; n < b.length && !(E = b[n], e && E * d >= a || !e && g <= (b[n] + (b[n + 1] || b[n])) / 2); n++);
                return E = S(E * d, -Math.round(Math.log(.001) / Math.LN10))
            },
            B = c.stableSort = function(a, b) {
                var d = a.length,
                    n, e;
                for (e = 0; e < d; e++) a[e].safeI = e;
                a.sort(function(a, d) {
                    n = b(a, d);
                    return 0 === n ? a.safeI - d.safeI :
                        n
                });
                for (e = 0; e < d; e++) delete a[e].safeI
            },
            n = c.arrayMin = function(a) {
                for (var b = a.length, d = a[0]; b--;) a[b] < d && (d = a[b]);
                return d
            },
            H = c.arrayMax = function(a) {
                for (var b = a.length, d = a[0]; b--;) a[b] > d && (d = a[b]);
                return d
            },
            J = c.destroyObjectProperties = function(a, b) {
                aa(a, function(d, n) {
                    d && d !== b && d.destroy && d.destroy();
                    delete a[n]
                })
            },
            V = c.discardElement = function(a) {
                var b = c.garbageBin;
                b || (b = y("div"));
                a && b.appendChild(a);
                b.innerHTML = ""
            },
            S = c.correctFloat = function(a, b) {
                return parseFloat(a.toPrecision(b || 14))
            },
            W = c.setAnimation =
            function(a, b) {
                b.renderer.globalAnimation = q(a, b.options.chart.animation, !0)
            },
            U = c.animObject = function(a) {
                return z(a) ? f(a) : {
                    duration: a ? 500 : 0
                }
            },
            E = c.timeUnits = {
                millisecond: 1,
                second: 1E3,
                minute: 6E4,
                hour: 36E5,
                day: 864E5,
                week: 6048E5,
                month: 24192E5,
                year: 314496E5
            },
            T = c.numberFormat = function(a, b, d, n) {
                a = +a || 0;
                b = +b;
                var e = c.defaultOptions.lang,
                    E = (a.toString().split(".")[1] || "").split("e")[0].length,
                    g = a.toString().split("e");
                if (-1 === b) b = Math.min(E, 20);
                else if (!K(b)) b = 2;
                else if (b && g[1] && 0 > g[1]) {
                    var l = b + +g[1];
                    0 <= l ? (g[0] =
                        (+g[0]).toExponential(l).split("e")[0], b = l) : (g[0] = g[0].split(".")[0] || 0, a = 20 > b ? (g[0] * Math.pow(10, g[1])).toFixed(b) : 0, g[1] = 0)
                }
                var h = (Math.abs(g[1] ? g[0] : a) + Math.pow(10, -Math.max(b, E) - 1)).toFixed(b);
                E = String(k(h));
                l = 3 < E.length ? E.length % 3 : 0;
                d = q(d, e.decimalPoint);
                n = q(n, e.thousandsSep);
                a = (0 > a ? "-" : "") + (l ? E.substr(0, l) + n : "");
                a += E.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + n);
                b && (a += d + h.slice(-b));
                g[1] && 0 !== +a && (a += "e" + g[1]);
                return a
            };
        Math.easeInOutSine = function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        var Z = c.getStyle =
            function(a, b, d) {
                if ("width" === b) return b = Math.min(a.offsetWidth, a.scrollWidth), d = a.getBoundingClientRect && a.getBoundingClientRect().width, d < b && d >= b - 1 && (b = Math.floor(d)), Math.max(0, b - c.getStyle(a, "padding-left") - c.getStyle(a, "padding-right"));
                if ("height" === b) return Math.max(0, Math.min(a.offsetHeight, a.scrollHeight) - c.getStyle(a, "padding-top") - c.getStyle(a, "padding-bottom"));
                C.getComputedStyle || F(27, !0);
                if (a = C.getComputedStyle(a, void 0)) a = a.getPropertyValue(b), q(d, "opacity" !== b) && (a = k(a));
                return a
            },
            X = c.inArray = function(a, b, d) {
                return b.indexOf(a, d)
            },
            P = c.find = Array.prototype.find ? function(a, b) {
                return a.find(b)
            } : function(a, b) {
                var d, n = a.length;
                for (d = 0; d < n; d++)
                    if (b(a[d], d)) return a[d]
            };
        c.keys = Object.keys;
        var ba = c.offset = function(a) {
                var b = M.documentElement;
                a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
                return {
                    top: a.top + (C.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                    left: a.left + (C.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
                }
            },
            ca = c.stop = function(a, b) {
                for (var d = c.timers.length; d--;) c.timers[d].elem !==
                    a || b && b !== c.timers[d].prop || (c.timers[d].stopped = !0)
            },
            aa = c.objectEach = function(a, b, d) {
                for (var n in a) Object.hasOwnProperty.call(a, n) && b.call(d || a[n], a[n], n, a)
            };
        aa({
            map: "map",
            each: "forEach",
            grep: "filter",
            reduce: "reduce",
            some: "some"
        }, function(a, b) {
            c[b] = function(b) {
                return Array.prototype[a].apply(b, [].slice.call(arguments, 1))
            }
        });
        var fa = c.addEvent = function(a, b, d, n) {
                void 0 === n && (n = {});
                var e = a.addEventListener || c.addEventListenerPolyfill;
                var E = "function" === typeof a && a.prototype ? a.prototype.protoEvents =
                    a.prototype.protoEvents || {} : a.hcEvents = a.hcEvents || {};
                c.Point && a instanceof c.Point && a.series && a.series.chart && (a.series.chart.runTrackerClick = !0);
                e && e.call(a, b, d, !1);
                E[b] || (E[b] = []);
                E[b].push({
                    fn: d,
                    order: "number" === typeof n.order ? n.order : Infinity
                });
                E[b].sort(function(a, b) {
                    return a.order - b.order
                });
                return function() {
                    da(a, b, d)
                }
            },
            da = c.removeEvent = function(a, b, d) {
                function n(b, d) {
                    var n = a.removeEventListener || c.removeEventListenerPolyfill;
                    n && n.call(a, b, d, !1)
                }

                function e(d) {
                    var e;
                    if (a.nodeName) {
                        if (b) {
                            var E = {};
                            E[b] = !0
                        } else E = d;
                        aa(E, function(a, b) {
                            if (d[b])
                                for (e = d[b].length; e--;) n(b, d[b][e].fn)
                        })
                    }
                }
                var E;
                ["protoEvents", "hcEvents"].forEach(function(g, l) {
                    var h = (l = l ? a : a.prototype) && l[g];
                    h && (b ? (E = h[b] || [], d ? (h[b] = E.filter(function(a) {
                        return d !== a.fn
                    }), n(b, d)) : (e(h), h[b] = [])) : (e(h), l[g] = {}))
                })
            },
            ha = c.fireEvent = function(a, d, n, e) {
                var E;
                n = n || {};
                if (M.createEvent && (a.dispatchEvent || a.fireEvent)) {
                    var g = M.createEvent("Events");
                    g.initEvent(d, !0, !0);
                    b(g, n);
                    a.dispatchEvent ? a.dispatchEvent(g) : a.fireEvent(d, g)
                } else n.target ||
                    b(n, {
                        preventDefault: function() {
                            n.defaultPrevented = !0
                        },
                        target: a,
                        type: d
                    }),
                    function(b, d) {
                        void 0 === b && (b = []);
                        void 0 === d && (d = []);
                        var e = 0,
                            g = 0,
                            l = b.length + d.length;
                        for (E = 0; E < l; E++) !1 === (b[e] ? d[g] ? b[e].order <= d[g].order ? b[e++] : d[g++] : b[e++] : d[g++]).fn.call(a, n) && n.preventDefault()
                    }(a.protoEvents && a.protoEvents[d], a.hcEvents && a.hcEvents[d]);
                e && !n.defaultPrevented && e.call(a, n)
            },
            ia = c.animate = function(a, b, d) {
                var n, e = "",
                    E, g;
                if (!z(d)) {
                    var l = arguments;
                    d = {
                        duration: l[2],
                        easing: l[3],
                        complete: l[4]
                    }
                }
                K(d.duration) || (d.duration =
                    400);
                d.easing = "function" === typeof d.easing ? d.easing : Math[d.easing] || Math.easeInOutSine;
                d.curAnim = f(b);
                aa(b, function(l, h) {
                    ca(a, h);
                    g = new D(a, d, h);
                    E = null;
                    "d" === h ? (g.paths = g.initPath(a, a.d, b.d), g.toD = b.d, n = 0, E = 1) : a.attr ? n = a.attr(h) : (n = parseFloat(Z(a, h)) || 0, "opacity" !== h && (e = "px"));
                    E || (E = l);
                    E && E.match && E.match("px") && (E = E.replace(/px/g, ""));
                    g.run(n, E, e)
                })
            },
            u = c.seriesType = function(a, b, d, n, e) {
                var E = c.getOptions(),
                    g = c.seriesTypes;
                E.plotOptions[a] = f(E.plotOptions[b], d);
                g[a] = r(g[b] || function() {}, n);
                g[a].prototype.type =
                    a;
                e && (g[a].prototype.pointClass = r(c.Point, e));
                return g[a]
            },
            ea = c.uniqueKey = function() {
                var a = Math.random().toString(36).substring(2, 9),
                    b = 0;
                return function() {
                    return "highcharts-" + a + "-" + b++
                }
            }(),
            ja = c.isFunction = function(a) {
                return "function" === typeof a
            };
        C.jQuery && (C.jQuery.fn.highcharts = function() {
            var a = [].slice.call(arguments);
            if (this[0]) return a[0] ? (new(c[m(a[0]) ? a.shift() : "Chart"])(this[0], a[0], a[1]), this) : t[G(this[0], "data-highcharts-chart")]
        });
        return {
            Fx: D,
            addEvent: fa,
            animate: ia,
            animObject: U,
            arrayMax: H,
            arrayMin: n,
            attr: G,
            clamp: function(a, b, d) {
                return a > b ? a < d ? a : d : b
            },
            clearTimeout: d,
            correctFloat: S,
            createElement: y,
            css: l,
            defined: a,
            destroyObjectProperties: J,
            discardElement: V,
            erase: e,
            error: F,
            extend: b,
            extendClass: r,
            find: P,
            fireEvent: ha,
            format: Q,
            getMagnitude: N,
            getNestedProperty: A,
            getStyle: Z,
            inArray: X,
            isArray: x,
            isClass: p,
            isDOMElement: w,
            isFunction: ja,
            isNumber: K,
            isObject: z,
            isString: m,
            merge: f,
            normalizeTickInterval: R,
            numberFormat: T,
            objectEach: aa,
            offset: ba,
            pad: v,
            pick: q,
            pInt: k,
            relativeLength: I,
            removeEvent: da,
            seriesType: u,
            setAnimation: W,
            splat: g,
            stableSort: B,
            stop: ca,
            syncTimeout: h,
            timeUnits: E,
            uniqueKey: ea,
            wrap: L
        }
    });
    O(u, "parts/Color.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        var G = f.isNumber,
            q = f.merge,
            A = f.pInt;
        f = function() {
            function c(c) {
                this.parsers = [{
                    regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                    parse: function(c) {
                        return [A(c[1]), A(c[2]), A(c[3]), parseFloat(c[4], 10)]
                    }
                }, {
                    regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                    parse: function(c) {
                        return [A(c[1]),
                            A(c[2]), A(c[3]), 1
                        ]
                    }
                }];
                this.rgba = [];
                this.init(c)
            }
            c.parse = function(f) {
                return new c(f)
            };
            c.prototype.init = function(f) {
                var q, t;
                if ((this.input = f = c.names[f && f.toLowerCase ? f.toLowerCase() : ""] || f) && f.stops) this.stops = f.stops.map(function(k) {
                    return new c(k[1])
                });
                else {
                    if (f && f.charAt && "#" === f.charAt()) {
                        var D = f.length;
                        f = parseInt(f.substr(1), 16);
                        7 === D ? q = [(f & 16711680) >> 16, (f & 65280) >> 8, f & 255, 1] : 4 === D && (q = [(f & 3840) >> 4 | (f & 3840) >> 8, (f & 240) >> 4 | f & 240, (f & 15) << 4 | f & 15, 1])
                    }
                    if (!q)
                        for (t = this.parsers.length; t-- && !q;) {
                            var k =
                                this.parsers[t];
                            (D = k.regex.exec(f)) && (q = k.parse(D))
                        }
                }
                this.rgba = q || []
            };
            c.prototype.get = function(c) {
                var f = this.input,
                    t = this.rgba;
                if ("undefined" !== typeof this.stops) {
                    var D = q(f);
                    D.stops = [].concat(D.stops);
                    this.stops.forEach(function(k, m) {
                        D.stops[m] = [D.stops[m][0], k.get(c)]
                    })
                } else D = t && G(t[0]) ? "rgb" === c || !c && 1 === t[3] ? "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")" : "a" === c ? t[3] : "rgba(" + t.join(",") + ")" : f;
                return D
            };
            c.prototype.brighten = function(c) {
                var f, q = this.rgba;
                if (this.stops) this.stops.forEach(function(f) {
                    f.brighten(c)
                });
                else if (G(c) && 0 !== c)
                    for (f = 0; 3 > f; f++) q[f] += A(255 * c), 0 > q[f] && (q[f] = 0), 255 < q[f] && (q[f] = 255);
                return this
            };
            c.prototype.setOpacity = function(c) {
                this.rgba[3] = c;
                return this
            };
            c.prototype.tweenTo = function(c, f) {
                var q = this.rgba,
                    t = c.rgba;
                t.length && q && q.length ? (c = 1 !== t[3] || 1 !== q[3], f = (c ? "rgba(" : "rgb(") + Math.round(t[0] + (q[0] - t[0]) * (1 - f)) + "," + Math.round(t[1] + (q[1] - t[1]) * (1 - f)) + "," + Math.round(t[2] + (q[2] - t[2]) * (1 - f)) + (c ? "," + (t[3] + (q[3] - t[3]) * (1 - f)) : "") + ")") : f = c.input || "none";
                return f
            };
            c.names = {
                white: "#ffffff",
                black: "#000000"
            };
            return c
        }();
        c.Color = f;
        c.color = f.parse;
        return c.Color
    });
    O(u, "parts/SvgRenderer.js", [u["parts/Globals.js"], u["parts/Color.js"], u["parts/Utilities.js"]], function(c, f, G) {
        var q = f.parse,
            A = G.addEvent,
            t = G.animate,
            M = G.animObject,
            C = G.attr,
            F = G.createElement,
            D = G.css,
            k = G.defined,
            m = G.destroyObjectProperties,
            x = G.erase,
            z = G.extend,
            w = G.inArray,
            p = G.isArray,
            K = G.isNumber,
            e = G.isObject,
            a = G.isString,
            g = G.merge,
            h = G.objectEach,
            d = G.pick,
            b = G.pInt,
            l = G.removeEvent,
            y = G.splat,
            r = G.stop,
            v = G.uniqueKey,
            I = c.charts,
            L = c.deg2rad,
            Q = c.doc,
            N = c.hasTouch,
            R = c.isFirefox,
            B = c.isMS,
            n = c.isWebKit,
            H = c.noop,
            J = c.svg,
            V = c.SVG_NS,
            S = c.symbolSizes,
            W = c.win;
        var U = c.SVGElement = function() {
            return this
        };
        z(U.prototype, {
            opacity: 1,
            SVG_NS: V,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
            init: function(a, b) {
                this.element = "span" === b ? F(b) : Q.createElementNS(this.SVG_NS, b);
                this.renderer = a;
                c.fireEvent(this, "afterInit")
            },
            animate: function(a, b, n) {
                var e = M(d(b, this.renderer.globalAnimation, !0));
                d(Q.hidden, Q.msHidden, Q.webkitHidden, !1) && (e.duration = 0);
                0 !== e.duration ? (n && (e.complete = n), t(this, a, e)) : (this.attr(a, void 0, n), h(a, function(a, b) {
                    e.step && e.step.call(this, a, {
                        prop: b,
                        pos: 1
                    })
                }, this));
                return this
            },
            complexColor: function(a, b, d) {
                var n = this.renderer,
                    e, E, l, B, J, H, y, T, r, w, I, m = [],
                    S;
                c.fireEvent(this.renderer, "complexColor", {
                    args: arguments
                }, function() {
                    a.radialGradient ? E = "radialGradient" : a.linearGradient && (E = "linearGradient");
                    E && (l = a[E], J = n.gradients, y = a.stops, w = d.radialReference, p(l) && (a[E] =
                        l = {
                            x1: l[0],
                            y1: l[1],
                            x2: l[2],
                            y2: l[3],
                            gradientUnits: "userSpaceOnUse"
                        }), "radialGradient" === E && w && !k(l.gradientUnits) && (B = l, l = g(l, n.getRadialAttr(w, B), {
                        gradientUnits: "userSpaceOnUse"
                    })), h(l, function(a, b) {
                        "id" !== b && m.push(b, a)
                    }), h(y, function(a) {
                        m.push(a)
                    }), m = m.join(","), J[m] ? I = J[m].attr("id") : (l.id = I = v(), J[m] = H = n.createElement(E).attr(l).add(n.defs), H.radAttr = B, H.stops = [], y.forEach(function(a) {
                        0 === a[1].indexOf("rgba") ? (e = q(a[1]), T = e.get("rgb"), r = e.get("a")) : (T = a[1], r = 1);
                        a = n.createElement("stop").attr({
                            offset: a[0],
                            "stop-color": T,
                            "stop-opacity": r
                        }).add(H);
                        H.stops.push(a)
                    })), S = "url(" + n.url + "#" + I + ")", d.setAttribute(b, S), d.gradient = m, a.toString = function() {
                        return S
                    })
                })
            },
            applyTextOutline: function(a) {
                var b = this.element,
                    d; - 1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g, this.renderer.getContrast(b.style.fill)));
                a = a.split(" ");
                var n = a[a.length - 1];
                if ((d = a[0]) && "none" !== d && c.svg) {
                    this.fakeTS = !0;
                    a = [].slice.call(b.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    d = d.replace(/(^[\d\.]+)(.*?)$/g, function(a, b,
                        d) {
                        return 2 * b + d
                    });
                    this.removeTextOutline(a);
                    var e = b.textContent ? /^[\u0591-\u065F\u066A-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(b.textContent) : !1;
                    var g = b.firstChild;
                    a.forEach(function(a, E) {
                        0 === E && (a.setAttribute("x", b.getAttribute("x")), E = b.getAttribute("y"), a.setAttribute("y", E || 0), null === E && b.setAttribute("y", 0));
                        E = a.cloneNode(!0);
                        C(e && !R ? a : E, {
                            "class": "highcharts-text-outline",
                            fill: n,
                            stroke: n,
                            "stroke-width": d,
                            "stroke-linejoin": "round"
                        });
                        b.insertBefore(E, g)
                    });
                    e && R && a[0] && (a = a[0].cloneNode(!0), a.textContent =
                        " ", b.insertBefore(a, g))
                }
            },
            removeTextOutline: function(a) {
                for (var b = a.length, d; b--;) d = a[b], "highcharts-text-outline" === d.getAttribute("class") && x(a, this.element.removeChild(d))
            },
            symbolCustomAttribs: "x y width height r start end innerR anchorX anchorY rounded".split(" "),
            attr: function(a, b, d, n) {
                var e = this.element,
                    g, E = this,
                    l, B, J = this.symbolCustomAttribs;
                if ("string" === typeof a && "undefined" !== typeof b) {
                    var H = a;
                    a = {};
                    a[H] = b
                }
                "string" === typeof a ? E = (this[a + "Getter"] || this._defaultGetter).call(this, a, e) : (h(a,
                    function(b, d) {
                        l = !1;
                        n || r(this, d);
                        this.symbolName && -1 !== w(d, J) && (g || (this.symbolAttr(a), g = !0), l = !0);
                        !this.rotation || "x" !== d && "y" !== d || (this.doTransform = !0);
                        l || (B = this[d + "Setter"] || this._defaultSetter, B.call(this, b, d, e), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(d) && this.updateShadows(d, b, B))
                    }, this), this.afterSetters());
                d && d.call(this);
                return E
            },
            afterSetters: function() {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function(a,
                b, d) {
                for (var n = this.shadows, e = n.length; e--;) d.call(n[e], "height" === a ? Math.max(b - (n[e].cutHeight || 0), 0) : "d" === a ? this.d : b, a, n[e])
            },
            addClass: function(a, b) {
                var d = b ? "" : this.attr("class") || "";
                a = (a || "").split(/ /g).reduce(function(a, b) {
                    -1 === d.indexOf(b) && a.push(b);
                    return a
                }, d ? [d] : []).join(" ");
                a !== d && this.attr("class", a);
                return this
            },
            hasClass: function(a) {
                return -1 !== (this.attr("class") || "").split(" ").indexOf(a)
            },
            removeClass: function(b) {
                return this.attr("class", (this.attr("class") || "").replace(a(b) ? new RegExp(" ?" +
                    b + " ?") : b, ""))
            },
            symbolAttr: function(a) {
                var b = this;
                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(n) {
                    b[n] = d(a[n], b[n])
                });
                b.attr({
                    d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
                })
            },
            clip: function(a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function(a, b) {
                b = b || a.strokeWidth || 0;
                var d = Math.round(b) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + d;
                a.y = Math.floor(a.y || this.y || 0) + d;
                a.width = Math.floor((a.width || this.width ||
                    0) - 2 * d);
                a.height = Math.floor((a.height || this.height || 0) - 2 * d);
                k(a.strokeWidth) && (a.strokeWidth = b);
                return a
            },
            css: function(a) {
                var d = this.styles,
                    n = {},
                    e = this.element,
                    g = "",
                    E = !d,
                    l = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                d && h(a, function(a, b) {
                    a !== d[b] && (n[b] = a, E = !0)
                });
                if (E) {
                    d && (a = z(d, n));
                    if (a)
                        if (null === a.width || "auto" === a.width) delete this.textWidth;
                        else if ("text" === e.nodeName.toLowerCase() && a.width) var B = this.textWidth = b(a.width);
                    this.styles = a;
                    B && !J && this.renderer.forExport && delete a.width;
                    if (e.namespaceURI === this.SVG_NS) {
                        var H = function(a, b) {
                            return "-" + b.toLowerCase()
                        };
                        h(a, function(a, b) {
                            -1 === l.indexOf(b) && (g += b.replace(/([A-Z])/g, H) + ":" + a + ";")
                        });
                        g && C(e, "style", g)
                    } else D(e, a);
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline))
                }
                return this
            },
            getStyle: function(a) {
                return W.getComputedStyle(this.element || this, "").getPropertyValue(a)
            },
            strokeWidth: function() {
                if (!this.renderer.styledMode) return this["stroke-width"] ||
                    0;
                var a = this.getStyle("stroke-width"),
                    d = 0;
                if (a.indexOf("px") === a.length - 2) d = b(a);
                else if ("" !== a) {
                    var n = Q.createElementNS(V, "rect");
                    C(n, {
                        width: a,
                        "stroke-width": 0
                    });
                    this.element.parentNode.appendChild(n);
                    d = n.getBBox().width;
                    n.parentNode.removeChild(n)
                }
                return d
            },
            on: function(a, b) {
                var d = this,
                    n = d.element;
                N && "click" === a ? (n.ontouchstart = function(a) {
                    d.touchEventFired = Date.now();
                    a.preventDefault();
                    b.call(n, a)
                }, n.onclick = function(a) {
                    (-1 === W.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (d.touchEventFired ||
                        0)) && b.call(n, a)
                }) : n["on" + a] = b;
                return this
            },
            setRadialReference: function(a) {
                var b = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr));
                return this
            },
            translate: function(a, b) {
                return this.attr({
                    translateX: a,
                    translateY: b
                })
            },
            invert: function(a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function() {
                var a = this.translateX || 0,
                    b = this.translateY || 0,
                    n = this.scaleX,
                    e = this.scaleY,
                    g = this.inverted,
                    l = this.rotation,
                    h = this.matrix,
                    B = this.element;
                g && (a += this.width, b += this.height);
                a = ["translate(" + a + "," + b + ")"];
                k(h) && a.push("matrix(" + h.join(",") + ")");
                g ? a.push("rotate(90) scale(-1,1)") : l && a.push("rotate(" + l + " " + d(this.rotationOriginX, B.getAttribute("x"), 0) + " " + d(this.rotationOriginY, B.getAttribute("y") || 0) + ")");
                (k(n) || k(e)) && a.push("scale(" + d(n, 1) + " " + d(e, 1) + ")");
                a.length && B.setAttribute("transform", a.join(" "))
            },
            toFront: function() {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function(b, n, e) {
                var g,
                    l = {};
                var E = this.renderer;
                var h = E.alignedObjects;
                var B, J;
                if (b) {
                    if (this.alignOptions = b, this.alignByTranslate = n, !e || a(e)) this.alignTo = g = e || "renderer", x(h, this), h.push(this), e = null
                } else b = this.alignOptions, n = this.alignByTranslate, g = this.alignTo;
                e = d(e, E[g], E);
                g = b.align;
                E = b.verticalAlign;
                h = (e.x || 0) + (b.x || 0);
                var H = (e.y || 0) + (b.y || 0);
                "right" === g ? B = 1 : "center" === g && (B = 2);
                B && (h += (e.width - (b.width || 0)) / B);
                l[n ? "translateX" : "x"] = Math.round(h);
                "bottom" === E ? J = 1 : "middle" === E && (J = 2);
                J && (H += (e.height - (b.height || 0)) /
                    J);
                l[n ? "translateY" : "y"] = Math.round(H);
                this[this.placed ? "animate" : "attr"](l);
                this.placed = !0;
                this.alignAttr = l;
                return this
            },
            getBBox: function(a, b) {
                var n, e = this.renderer,
                    g = this.element,
                    l = this.styles,
                    h = this.textStr,
                    E, B = e.cache,
                    J = e.cacheKeys,
                    H = g.namespaceURI === this.SVG_NS;
                b = d(b, this.rotation, 0);
                var y = e.styledMode ? g && U.prototype.getStyle.call(g, "font-size") : l && l.fontSize;
                if (k(h)) {
                    var v = h.toString(); - 1 === v.indexOf("<") && (v = v.replace(/[0-9]/g, "0"));
                    v += ["", b, y, this.textWidth, l && l.textOverflow].join()
                }
                v && !a &&
                    (n = B[v]);
                if (!n) {
                    if (H || e.forExport) {
                        try {
                            (E = this.fakeTS && function(a) {
                                [].forEach.call(g.querySelectorAll(".highcharts-text-outline"), function(b) {
                                    b.style.display = a
                                })
                            }) && E("none"), n = g.getBBox ? z({}, g.getBBox()) : {
                                width: g.offsetWidth,
                                height: g.offsetHeight
                            }, E && E("")
                        } catch (ea) {
                            ""
                        }
                        if (!n || 0 > n.width) n = {
                            width: 0,
                            height: 0
                        }
                    } else n = this.htmlGetBBox();
                    e.isSVG && (a = n.width, e = n.height, H && (n.height = e = {
                        "11px,17": 14,
                        "13px,20": 16
                    }[l && l.fontSize + "," + Math.round(e)] || e), b && (l = b * L, n.width = Math.abs(e * Math.sin(l)) + Math.abs(a * Math.cos(l)),
                        n.height = Math.abs(e * Math.cos(l)) + Math.abs(a * Math.sin(l))));
                    if (v && 0 < n.height) {
                        for (; 250 < J.length;) delete B[J.shift()];
                        B[v] || J.push(v);
                        B[v] = n
                    }
                }
                return n
            },
            show: function(a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function(a) {
                a ? this.attr({
                    y: -9999
                }) : this.attr({
                    visibility: "hidden"
                });
                return this
            },
            fadeOut: function(a) {
                var b = this;
                b.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function() {
                        b.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function(a) {
                var b = this.renderer,
                    d = this.element;
                a && (this.parentGroup = a);
                this.parentInverted =
                    a && a.inverted;
                "undefined" !== typeof this.textStr && b.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) var n = this.zIndexSetter();
                n || (a ? a.element : b.box).appendChild(d);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function(a) {
                var b = a.parentNode;
                b && b.removeChild(a)
            },
            destroy: function() {
                var a = this,
                    b = a.element || {},
                    d = a.renderer,
                    n = d.isSVG && "SPAN" === b.nodeName && a.parentGroup,
                    e = b.ownerSVGElement,
                    g = a.clipPath;
                b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null;
                r(a);
                g && e && ([].forEach.call(e.querySelectorAll("[clip-path],[CLIP-PATH]"),
                    function(a) {
                        -1 < a.getAttribute("clip-path").indexOf(g.element.id) && a.removeAttribute("clip-path")
                    }), a.clipPath = g.destroy());
                if (a.stops) {
                    for (e = 0; e < a.stops.length; e++) a.stops[e] = a.stops[e].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(b);
                for (d.styledMode || a.destroyShadows(); n && n.div && 0 === n.div.childNodes.length;) b = n.parentGroup, a.safeRemoveChild(n.div), delete n.div, n = b;
                a.alignTo && x(d.alignedObjects, a);
                h(a, function(b, d) {
                    a[d] && a[d].parentGroup === a && a[d].destroy && a[d].destroy();
                    delete a[d]
                })
            },
            shadow: function(a,
                b, n) {
                var e = [],
                    g, l = this.element;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    var h = d(a.width, 3);
                    var B = (a.opacity || .15) / h;
                    var E = this.parentInverted ? "(-1,-1)" : "(" + d(a.offsetX, 1) + ", " + d(a.offsetY, 1) + ")";
                    for (g = 1; g <= h; g++) {
                        var J = l.cloneNode(0);
                        var H = 2 * h + 1 - 2 * g;
                        C(J, {
                            stroke: a.color || "#000000",
                            "stroke-opacity": B * g,
                            "stroke-width": H,
                            transform: "translate" + E,
                            fill: "none"
                        });
                        J.setAttribute("class", (J.getAttribute("class") || "") + " highcharts-shadow");
                        n && (C(J, "height", Math.max(C(J, "height") - H, 0)), J.cutHeight = H);
                        b ? b.element.appendChild(J) : l.parentNode && l.parentNode.insertBefore(J, l);
                        e.push(J)
                    }
                    this.shadows = e
                }
                return this
            },
            destroyShadows: function() {
                (this.shadows || []).forEach(function(a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function(a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function(a) {
                a = d(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function(a, b, d) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[b] !== a && (d.setAttribute(b, a), this[b] = a)
            },
            dashstyleSetter: function(a) {
                var d, n = this["stroke-width"];
                "inherit" === n && (n = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (d = a.length; d--;) a[d] = b(a[d]) *
                        n;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function(a) {
                var b = {
                    left: "start",
                    center: "middle",
                    right: "end"
                };
                b[a] && (this.alignValue = a, this.element.setAttribute("text-anchor", b[a]))
            },
            opacitySetter: function(a, b, d) {
                this[b] = a;
                d.setAttribute(b, a)
            },
            titleSetter: function(a) {
                var b = this.element.getElementsByTagName("title")[0];
                b || (b = Q.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
                b.firstChild && b.removeChild(b.firstChild);
                b.appendChild(Q.createTextNode(String(d(a,
                    "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
            },
            textSetter: function(a) {
                a !== this.textStr && (delete this.bBox, delete this.textPxLength, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            setTextPath: function(a, b) {
                var d = this.element,
                    n = {
                        textAnchor: "text-anchor"
                    },
                    e = !1,
                    l = this.textPathWrapper,
                    B = !l;
                b = g(!0, {
                    enabled: !0,
                    attributes: {
                        dy: -5,
                        startOffset: "50%",
                        textAnchor: "middle"
                    }
                }, b);
                var J = b.attributes;
                if (a && b && b.enabled) {
                    l && null === l.element.parentNode ? (B = !0, l = l.destroy()) : l && this.removeTextOutline.call(l.parentGroup, [].slice.call(d.getElementsByTagName("tspan")));
                    this.options && this.options.padding && (J.dx = -this.options.padding);
                    l || (this.textPathWrapper = l = this.renderer.createElement("textPath"), e = !0);
                    var E = l.element;
                    (b = a.element.getAttribute("id")) || a.element.setAttribute("id", b = v());
                    if (B)
                        for (a = d.getElementsByTagName("tspan"); a.length;) a[0].setAttribute("y", 0), K(J.dx) && a[0].setAttribute("x", -J.dx), E.appendChild(a[0]);
                    e && l.add({
                        element: this.text ? this.text.element : d
                    });
                    E.setAttributeNS("http://www.w3.org/1999/xlink",
                        "href", this.renderer.url + "#" + b);
                    k(J.dy) && (E.parentNode.setAttribute("dy", J.dy), delete J.dy);
                    k(J.dx) && (E.parentNode.setAttribute("dx", J.dx), delete J.dx);
                    h(J, function(a, b) {
                        E.setAttribute(n[b] || b, a)
                    });
                    d.removeAttribute("transform");
                    this.removeTextOutline.call(l, [].slice.call(d.getElementsByTagName("tspan")));
                    this.text && !this.renderer.styledMode && this.attr({
                        fill: "none",
                        "stroke-width": 0
                    });
                    this.applyTextOutline = this.updateTransform = H
                } else l && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(d,
                    a), this.updateTransform(), this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
                return this
            },
            destroyTextPath: function(a, b) {
                var d = a.getElementsByTagName("text")[0];
                if (d) {
                    if (d.removeAttribute("dx"), d.removeAttribute("dy"), b.element.setAttribute("id", ""), d.getElementsByTagName("textPath").length) {
                        for (a = this.textPathWrapper.element.childNodes; a.length;) d.appendChild(a[0]);
                        d.removeChild(this.textPathWrapper.element)
                    }
                } else if (a.getAttribute("dx") || a.getAttribute("dy")) a.removeAttribute("dx"),
                    a.removeAttribute("dy");
                this.textPathWrapper = this.textPathWrapper.destroy()
            },
            fillSetter: function(a, b, d) {
                "string" === typeof a ? d.setAttribute(b, a) : a && this.complexColor(a, b, d)
            },
            visibilitySetter: function(a, b, d) {
                "inherit" === a ? d.removeAttribute(b) : this[b] !== a && d.setAttribute(b, a);
                this[b] = a
            },
            zIndexSetter: function(a, d) {
                var n = this.renderer,
                    e = this.parentGroup,
                    g = (e || n).element || n.box,
                    l = this.element,
                    h = !1;
                n = g === n.box;
                var B = this.added;
                var J;
                k(a) ? (l.setAttribute("data-z-index", a), a = +a, this[d] === a && (B = !1)) : k(this[d]) &&
                    l.removeAttribute("data-z-index");
                this[d] = a;
                if (B) {
                    (a = this.zIndex) && e && (e.handleZ = !0);
                    d = g.childNodes;
                    for (J = d.length - 1; 0 <= J && !h; J--) {
                        e = d[J];
                        B = e.getAttribute("data-z-index");
                        var H = !k(B);
                        if (e !== l)
                            if (0 > a && H && !n && !J) g.insertBefore(l, d[J]), h = !0;
                            else if (b(B) <= a || H && (!k(a) || 0 <= a)) g.insertBefore(l, d[J + 1] || null), h = !0
                    }
                    h || (g.insertBefore(l, d[n ? 3 : 0] || null), h = !0)
                }
                return h
            },
            _defaultSetter: function(a, b, d) {
                d.setAttribute(b, a)
            }
        });
        U.prototype.yGetter = U.prototype.xGetter;
        U.prototype.translateXSetter = U.prototype.translateYSetter =
            U.prototype.rotationSetter = U.prototype.verticalAlignSetter = U.prototype.rotationOriginXSetter = U.prototype.rotationOriginYSetter = U.prototype.scaleXSetter = U.prototype.scaleYSetter = U.prototype.matrixSetter = function(a, b) {
                this[b] = a;
                this.doTransform = !0
            };
        U.prototype["stroke-widthSetter"] = U.prototype.strokeSetter = function(a, b, d) {
            this[b] = a;
            this.stroke && this["stroke-width"] ? (U.prototype.fillSetter.call(this, this.stroke, "stroke", d), d.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" ===
                b && 0 === a && this.hasStroke ? (d.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (d.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0)
        };
        f = c.SVGRenderer = function() {
            this.init.apply(this, arguments)
        };
        z(f.prototype, {
            Element: U,
            SVG_NS: V,
            init: function(a, b, d, e, g, l, h) {
                var B = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                });
                h || B.css(this.getStyle(e));
                e = B.element;
                a.appendChild(e);
                C(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") &&
                    C(e, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = e;
                this.boxWrapper = B;
                this.alignedObjects = [];
                this.url = (R || n) && Q.getElementsByTagName("base").length ? W.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(Q.createTextNode("Created with Highcharts 8.0.2"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = l;
                this.forExport = g;
                this.styledMode = h;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount =
                    0;
                this.setSize(b, d, !1);
                var J;
                R && a.getBoundingClientRect && (b = function() {
                    D(a, {
                        left: 0,
                        top: 0
                    });
                    J = a.getBoundingClientRect();
                    D(a, {
                        left: Math.ceil(J.left) - J.left + "px",
                        top: Math.ceil(J.top) - J.top + "px"
                    })
                }, b(), this.unSubPixelFix = A(W, "resize", b))
            },
            definition: function(a) {
                function b(a, n) {
                    var e;
                    y(a).forEach(function(a) {
                        var g = d.createElement(a.tagName),
                            l = {};
                        h(a, function(a, b) {
                            "tagName" !== b && "children" !== b && "textContent" !== b && (l[b] = a)
                        });
                        g.attr(l);
                        g.add(n || d.defs);
                        a.textContent && g.element.appendChild(Q.createTextNode(a.textContent));
                        b(a.children || [], g);
                        e = g
                    });
                    return e
                }
                var d = this;
                return b(a)
            },
            getStyle: function(a) {
                return this.style = z({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function(a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                m(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix &&
                    this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function(a) {
                var b = new this.Element;
                b.init(this, a);
                return b
            },
            draw: H,
            getRadialAttr: function(a, b) {
                return {
                    cx: a[0] - a[2] / 2 + b.cx * a[2],
                    cy: a[1] - a[2] / 2 + b.cy * a[2],
                    r: b.r * a[2]
                }
            },
            truncate: function(a, b, d, n, e, g, l) {
                var h = this,
                    J = a.rotation,
                    B, H = n ? 1 : 0,
                    y = (d || n).length,
                    v = y,
                    r = [],
                    E = function(a) {
                        b.firstChild && b.removeChild(b.firstChild);
                        a && b.appendChild(Q.createTextNode(a))
                    },
                    P = function(g, B) {
                        B = B || g;
                        if ("undefined" === typeof r[B])
                            if (b.getSubStringLength) try {
                                r[B] =
                                    e + b.getSubStringLength(0, n ? B + 1 : B)
                            } catch (ka) {
                                ""
                            } else h.getSpanWidth && (E(l(d || n, g)), r[B] = e + h.getSpanWidth(a, b));
                        return r[B]
                    },
                    p;
                a.rotation = 0;
                var c = P(b.textContent.length);
                if (p = e + c > g) {
                    for (; H <= y;) v = Math.ceil((H + y) / 2), n && (B = l(n, v)), c = P(v, B && B.length - 1), H === y ? H = y + 1 : c > g ? y = v - 1 : H = v;
                    0 === y ? E("") : d && y === d.length - 1 || E(B || l(d || n, v))
                }
                n && n.splice(0, v);
                a.actualWidth = c;
                a.rotation = J;
                return p
            },
            escapes: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;"
            },
            buildText: function(a) {
                var n = a.element,
                    e = this,
                    g = e.forExport,
                    l = d(a.textStr, "").toString(),
                    B = -1 !== l.indexOf("<"),
                    H = n.childNodes,
                    y, v = C(n, "x"),
                    r = a.styles,
                    E = a.textWidth,
                    p = r && r.lineHeight,
                    c = r && r.textOutline,
                    w = r && "ellipsis" === r.textOverflow,
                    k = r && "nowrap" === r.whiteSpace,
                    m = r && r.fontSize,
                    I, S = H.length;
                r = E && !a.added && this.box;
                var K = function(a) {
                        var d;
                        e.styledMode || (d = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : m || e.style.fontSize || 12);
                        return p ? b(p) : e.fontMetrics(d, a.getAttribute("style") ? a : n).h
                    },
                    x = function(a, b) {
                        h(e.escapes, function(d, n) {
                            b && -1 !== b.indexOf(d) ||
                                (a = a.toString().replace(new RegExp(d, "g"), n))
                        });
                        return a
                    },
                    L = function(a, b) {
                        var d = a.indexOf("<");
                        a = a.substring(d, a.indexOf(">") - d);
                        d = a.indexOf(b + "=");
                        if (-1 !== d && (d = d + b.length + 1, b = a.charAt(d), '"' === b || "'" === b)) return a = a.substring(d + 1), a.substring(0, a.indexOf(b))
                    },
                    f = /<br.*?>/g;
                var z = [l, w, k, p, c, m, E].join();
                if (z !== a.textCache) {
                    for (a.textCache = z; S--;) n.removeChild(H[S]);
                    B || c || w || E || -1 !== l.indexOf(" ") && (!k || f.test(l)) ? (r && r.appendChild(n), B ? (l = e.styledMode ? l.replace(/<(b|strong)>/g, '<span class="highcharts-strong">').replace(/<(i|em)>/g,
                            '<span class="highcharts-emphasized">') : l.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">'), l = l.replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(f)) : l = [l], l = l.filter(function(a) {
                            return "" !== a
                        }), l.forEach(function(b, d) {
                            var l = 0,
                                h = 0;
                            b = b.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                            var B = b.split("|||");
                            B.forEach(function(b) {
                                if ("" !== b || 1 === B.length) {
                                    var H = {},
                                        r = Q.createElementNS(e.SVG_NS,
                                            "tspan"),
                                        P, p;
                                    (P = L(b, "class")) && C(r, "class", P);
                                    if (P = L(b, "style")) P = P.replace(/(;| |^)color([ :])/, "$1fill$2"), C(r, "style", P);
                                    (p = L(b, "href")) && !g && (C(r, "onclick", 'location.href="' + p + '"'), C(r, "class", "highcharts-anchor"), e.styledMode || D(r, {
                                        cursor: "pointer"
                                    }));
                                    b = x(b.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                    if (" " !== b) {
                                        r.appendChild(Q.createTextNode(b));
                                        l ? H.dx = 0 : d && null !== v && (H.x = v);
                                        C(r, H);
                                        n.appendChild(r);
                                        !l && I && (!J && g && D(r, {
                                            display: "block"
                                        }), C(r, "dy", K(r)));
                                        if (E) {
                                            var c = b.replace(/([^\^])-/g, "$1- ").split(" ");
                                            H = !k && (1 < B.length || d || 1 < c.length);
                                            p = 0;
                                            var S = K(r);
                                            if (w) y = e.truncate(a, r, b, void 0, 0, Math.max(0, E - parseInt(m || 12, 10)), function(a, b) {
                                                return a.substring(0, b) + "\u2026"
                                            });
                                            else if (H)
                                                for (; c.length;) c.length && !k && 0 < p && (r = Q.createElementNS(V, "tspan"), C(r, {
                                                    dy: S,
                                                    x: v
                                                }), P && C(r, "style", P), r.appendChild(Q.createTextNode(c.join(" ").replace(/- /g, "-"))), n.appendChild(r)), e.truncate(a, r, null, c, 0 === p ? h : 0, E, function(a, b) {
                                                    return c.slice(0, b).join(" ").replace(/- /g, "-")
                                                }), h = a.actualWidth, p++
                                        }
                                        l++
                                    }
                                }
                            });
                            I = I || n.childNodes.length
                        }),
                        w && y && a.attr("title", x(a.textStr, ["&lt;", "&gt;"])), r && r.removeChild(n), c && a.applyTextOutline && a.applyTextOutline(c)) : n.appendChild(Q.createTextNode(x(l)))
                }
            },
            getContrast: function(a) {
                a = q(a).rgba;
                a[0] *= 1;
                a[1] *= 1.2;
                a[2] *= .5;
                return 459 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function(a, b, d, n, e, l, h, J, H, y) {
                var r = this.label(a, b, d, H, null, null, y, null, "button"),
                    v = 0,
                    E = this.styledMode;
                r.attr(g({
                    padding: 8,
                    r: 2
                }, e));
                if (!E) {
                    e = g({
                        fill: "#f7f7f7",
                        stroke: "#cccccc",
                        "stroke-width": 1,
                        style: {
                            color: "#333333",
                            cursor: "pointer",
                            fontWeight: "normal"
                        }
                    }, e);
                    var p = e.style;
                    delete e.style;
                    l = g(e, {
                        fill: "#e6e6e6"
                    }, l);
                    var c = l.style;
                    delete l.style;
                    h = g(e, {
                        fill: "#e6ebf5",
                        style: {
                            color: "#000000",
                            fontWeight: "bold"
                        }
                    }, h);
                    var P = h.style;
                    delete h.style;
                    J = g(e, {
                        style: {
                            color: "#cccccc"
                        }
                    }, J);
                    var w = J.style;
                    delete J.style
                }
                A(r.element, B ? "mouseover" : "mouseenter", function() {
                    3 !== v && r.setState(1)
                });
                A(r.element, B ? "mouseout" : "mouseleave", function() {
                    3 !== v && r.setState(v)
                });
                r.setState = function(a) {
                    1 !== a && (r.state = v = a);
                    r.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    E || r.attr([e, l, h, J][a || 0]).css([p, c, P, w][a || 0])
                };
                E || r.attr(e).css(z({
                    cursor: "default"
                }, p));
                return r.on("click", function(a) {
                    3 !== v && n.call(r, a)
                })
            },
            crispLine: function(a, b) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2);
                return a
            },
            path: function(a) {
                var b = this.styledMode ? {} : {
                    fill: "none"
                };
                p(a) ? b.d = a : e(a) && z(b, a);
                return this.createElement("path").attr(b)
            },
            circle: function(a, b, d) {
                a = e(a) ? a : "undefined" === typeof a ? {} : {
                    x: a,
                    y: b,
                    r: d
                };
                b = this.createElement("circle");
                b.xSetter = b.ySetter = function(a, b, d) {
                    d.setAttribute("c" + b, a)
                };
                return b.attr(a)
            },
            arc: function(a, b, d, n, g, l) {
                e(a) ? (n = a, b = n.y, d = n.r, a = n.x) : n = {
                    innerR: n,
                    start: g,
                    end: l
                };
                a = this.symbol("arc", a, b, d, d, n);
                a.r = d;
                return a
            },
            rect: function(a, b, d, n, g, l) {
                g = e(a) ? a.r : g;
                var h = this.createElement("rect");
                a = e(a) ? a : "undefined" === typeof a ? {} : {
                    x: a,
                    y: b,
                    width: Math.max(d, 0),
                    height: Math.max(n, 0)
                };
                this.styledMode || ("undefined" !== typeof l && (a.strokeWidth = l, a = h.crisp(a)), a.fill = "none");
                g &&
                    (a.r = g);
                h.rSetter = function(a, b, d) {
                    h.r = a;
                    C(d, {
                        rx: a,
                        ry: a
                    })
                };
                h.rGetter = function() {
                    return h.r
                };
                return h.attr(a)
            },
            setSize: function(a, b, n) {
                var e = this.alignedObjects,
                    g = e.length;
                this.width = a;
                this.height = b;
                for (this.boxWrapper.animate({
                        width: a,
                        height: b
                    }, {
                        step: function() {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: d(n, !0) ? void 0 : 0
                    }); g--;) e[g].align()
            },
            g: function(a) {
                var b = this.createElement("g");
                return a ? b.attr({
                    "class": "highcharts-" + a
                }) : b
            },
            image: function(a, b, d, n, e, g) {
                var l = {
                        preserveAspectRatio: "none"
                    },
                    h = function(a, b) {
                        a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", b) : a.setAttribute("hc-svg-href", b)
                    },
                    B = function(b) {
                        h(J.element, a);
                        g.call(J, b)
                    };
                1 < arguments.length && z(l, {
                    x: b,
                    y: d,
                    width: n,
                    height: e
                });
                var J = this.createElement("image").attr(l);
                g ? (h(J.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), l = new W.Image, A(l, "load", B), l.src = a, l.complete && B({})) : h(J.element, a);
                return J
            },
            symbol: function(a, b, n, e, g, l) {
                var h = this,
                    B = /^url\((.*?)\)$/,
                    J = B.test(a),
                    H = !J && (this.symbols[a] ? a : "circle"),
                    y = H && this.symbols[H],
                    r = k(b) && y && y.call(this.symbols, Math.round(b), Math.round(n), e, g, l);
                if (y) {
                    var v = this.path(r);
                    h.styledMode || v.attr("fill", "none");
                    z(v, {
                        symbolName: H,
                        x: b,
                        y: n,
                        width: e,
                        height: g
                    });
                    l && z(v, l)
                } else if (J) {
                    var p = a.match(B)[1];
                    v = this.image(p);
                    v.imgwidth = d(S[p] && S[p].width, l && l.width);
                    v.imgheight = d(S[p] && S[p].height, l && l.height);
                    var c = function() {
                        v.attr({
                            width: v.width,
                            height: v.height
                        })
                    };
                    ["width", "height"].forEach(function(a) {
                        v[a +
                            "Setter"] = function(a, b) {
                            var d = {},
                                n = this["img" + b],
                                e = "width" === b ? "translateX" : "translateY";
                            this[b] = a;
                            k(n) && (l && "within" === l.backgroundSize && this.width && this.height && (n = Math.round(n * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(b, n), this.alignByTranslate || (d[e] = ((this[b] || 0) - n) / 2, this.attr(d)))
                        }
                    });
                    k(b) && v.attr({
                        x: b,
                        y: n
                    });
                    v.isImg = !0;
                    k(v.imgwidth) && k(v.imgheight) ? c() : (v.attr({
                        width: 0,
                        height: 0
                    }), F("img", {
                        onload: function() {
                            var a = I[h.chartIndex];
                            0 ===
                                this.width && (D(this, {
                                    position: "absolute",
                                    top: "-999em"
                                }), Q.body.appendChild(this));
                            S[p] = {
                                width: this.width,
                                height: this.height
                            };
                            v.imgwidth = this.width;
                            v.imgheight = this.height;
                            v.element && c();
                            this.parentNode && this.parentNode.removeChild(this);
                            h.imgCount--;
                            if (!h.imgCount && a && !a.hasLoaded) a.onload()
                        },
                        src: p
                    }), this.imgCount++)
                }
                return v
            },
            symbols: {
                circle: function(a, b, d, n) {
                    return this.arc(a + d / 2, b + n / 2, d / 2, n / 2, {
                        start: .5 * Math.PI,
                        end: 2.5 * Math.PI,
                        open: !1
                    })
                },
                square: function(a, b, d, n) {
                    return ["M", a, b, "L", a + d, b, a + d, b + n,
                        a, b + n, "Z"
                    ]
                },
                triangle: function(a, b, d, n) {
                    return ["M", a + d / 2, b, "L", a + d, b + n, a, b + n, "Z"]
                },
                "triangle-down": function(a, b, d, n) {
                    return ["M", a, b, "L", a + d, b, a + d / 2, b + n, "Z"]
                },
                diamond: function(a, b, d, n) {
                    return ["M", a + d / 2, b, "L", a + d, b + n / 2, a + d / 2, b + n, a, b + n / 2, "Z"]
                },
                arc: function(a, b, n, e, g) {
                    var l = g.start,
                        h = g.r || n,
                        B = g.r || e || n,
                        J = g.end - .001;
                    n = g.innerR;
                    e = d(g.open, .001 > Math.abs(g.end - g.start - 2 * Math.PI));
                    var H = Math.cos(l),
                        y = Math.sin(l),
                        v = Math.cos(J);
                    J = Math.sin(J);
                    l = d(g.longArc, .001 > g.end - l - Math.PI ? 0 : 1);
                    h = ["M", a + h * H, b + B * y, "A", h, B,
                        0, l, d(g.clockwise, 1), a + h * v, b + B * J
                    ];
                    k(n) && h.push(e ? "M" : "L", a + n * v, b + n * J, "A", n, n, 0, l, k(g.clockwise) ? 1 - g.clockwise : 0, a + n * H, b + n * y);
                    h.push(e ? "" : "Z");
                    return h
                },
                callout: function(a, b, d, n, e) {
                    var g = Math.min(e && e.r || 0, d, n),
                        l = g + 6,
                        h = e && e.anchorX;
                    e = e && e.anchorY;
                    var B = ["M", a + g, b, "L", a + d - g, b, "C", a + d, b, a + d, b, a + d, b + g, "L", a + d, b + n - g, "C", a + d, b + n, a + d, b + n, a + d - g, b + n, "L", a + g, b + n, "C", a, b + n, a, b + n, a, b + n - g, "L", a, b + g, "C", a, b, a, b, a + g, b];
                    h && h > d ? e > b + l && e < b + n - l ? B.splice(13, 3, "L", a + d, e - 6, a + d + 6, e, a + d, e + 6, a + d, b + n - g) : B.splice(13, 3, "L",
                        a + d, n / 2, h, e, a + d, n / 2, a + d, b + n - g) : h && 0 > h ? e > b + l && e < b + n - l ? B.splice(33, 3, "L", a, e + 6, a - 6, e, a, e - 6, a, b + g) : B.splice(33, 3, "L", a, n / 2, h, e, a, n / 2, a, b + g) : e && e > n && h > a + l && h < a + d - l ? B.splice(23, 3, "L", h + 6, b + n, h, b + n + 6, h - 6, b + n, a + g, b + n) : e && 0 > e && h > a + l && h < a + d - l && B.splice(3, 3, "L", h - 6, b, h, b - 6, h + 6, b, d - g, b);
                    return B
                }
            },
            clipRect: function(a, b, d, n) {
                var e = v() + "-",
                    g = this.createElement("clipPath").attr({
                        id: e
                    }).add(this.defs);
                a = this.rect(a, b, d, n, 0).add(g);
                a.id = e;
                a.clipPath = g;
                a.count = 0;
                return a
            },
            text: function(a, b, d, n) {
                var e = {};
                if (n && (this.allowHTML ||
                        !this.forExport)) return this.html(a, b, d);
                e.x = Math.round(b || 0);
                d && (e.y = Math.round(d));
                k(a) && (e.text = a);
                a = this.createElement("text").attr(e);
                n || (a.xSetter = function(a, b, d) {
                    var n = d.getElementsByTagName("tspan"),
                        e = d.getAttribute(b),
                        g;
                    for (g = 0; g < n.length; g++) {
                        var l = n[g];
                        l.getAttribute(b) === e && l.setAttribute(b, a)
                    }
                    d.setAttribute(b, a)
                });
                return a
            },
            fontMetrics: function(a, d) {
                a = !this.styledMode && /px/.test(a) || !W.getComputedStyle ? a || d && d.style && d.style.fontSize || this.style && this.style.fontSize : d && U.prototype.getStyle.call(d,
                    "font-size");
                a = /px/.test(a) ? b(a) : 12;
                d = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: d,
                    b: Math.round(.8 * d),
                    f: a
                }
            },
            rotCorr: function(a, b, d) {
                var n = a;
                b && d && (n = Math.max(n * Math.cos(b * L), 4));
                return {
                    x: -a / 3 * Math.sin(b * L),
                    y: n
                }
            },
            label: function(a, b, d, n, e, h, B, J, H) {
                var y = this,
                    v = y.styledMode,
                    r = y.g("button" !== H && "label"),
                    p = r.text = y.text("", 0, 0, B).attr({
                        zIndex: 1
                    }),
                    c, w, m = 0,
                    I = 3,
                    P = 0,
                    S, V, x, E, L, f = {},
                    W, ba, N = /^url\((.*?)\)$/.test(n),
                    Q = v || N,
                    R = function() {
                        return v ? c.strokeWidth() % 2 / 2 : (W ? parseInt(W, 10) : 0) % 2 / 2
                    };
                H && r.addClass("highcharts-" +
                    H);
                var q = function() {
                    var a = p.element.style,
                        b = {};
                    w = ("undefined" === typeof S || "undefined" === typeof V || L) && k(p.textStr) && p.getBBox();
                    r.width = (S || w.width || 0) + 2 * I + P;
                    r.height = (V || w.height || 0) + 2 * I;
                    ba = I + Math.min(y.fontMetrics(a && a.fontSize, p).b, w ? w.height : Infinity);
                    Q && (c || (r.box = c = y.symbols[n] || N ? y.symbol(n) : y.rect(), c.addClass(("button" === H ? "" : "highcharts-label-box") + (H ? " highcharts-" + H + "-box" : "")), c.add(r), a = R(), b.x = a, b.y = (J ? -ba : 0) + a), b.width = Math.round(r.width), b.height = Math.round(r.height), c.attr(z(b, f)),
                        f = {})
                };
                var t = function() {
                    var a = P + I;
                    var b = J ? 0 : ba;
                    k(S) && w && ("center" === L || "right" === L) && (a += {
                        center: .5,
                        right: 1
                    }[L] * (S - w.width));
                    if (a !== p.x || b !== p.y) p.attr("x", a), p.hasBoxWidthChanged && (w = p.getBBox(!0), q()), "undefined" !== typeof b && p.attr("y", b);
                    p.x = a;
                    p.y = b
                };
                var T = function(a, b) {
                    c ? c.attr(a, b) : f[a] = b
                };
                r.onAdd = function() {
                    p.add(r);
                    r.attr({
                        text: a || 0 === a ? a : "",
                        x: b,
                        y: d
                    });
                    c && k(e) && r.attr({
                        anchorX: e,
                        anchorY: h
                    })
                };
                r.widthSetter = function(a) {
                    S = K(a) ? a : null
                };
                r.heightSetter = function(a) {
                    V = a
                };
                r["text-alignSetter"] = function(a) {
                    L =
                        a
                };
                r.paddingSetter = function(a) {
                    k(a) && a !== I && (I = r.padding = a, t())
                };
                r.paddingLeftSetter = function(a) {
                    k(a) && a !== P && (P = a, t())
                };
                r.alignSetter = function(a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a];
                    a !== m && (m = a, w && r.attr({
                        x: x
                    }))
                };
                r.textSetter = function(a) {
                    "undefined" !== typeof a && p.attr({
                        text: a
                    });
                    q();
                    t()
                };
                r["stroke-widthSetter"] = function(a, b) {
                    a && (Q = !0);
                    W = this["stroke-width"] = a;
                    T(b, a)
                };
                v ? r.rSetter = function(a, b) {
                    T(b, a)
                } : r.strokeSetter = r.fillSetter = r.rSetter = function(a, b) {
                    "r" !== b && ("fill" === b && a && (Q = !0), r[b] = a);
                    T(b, a)
                };
                r.anchorXSetter =
                    function(a, b) {
                        e = r.anchorX = a;
                        T(b, Math.round(a) - R() - x)
                    };
                r.anchorYSetter = function(a, b) {
                    h = r.anchorY = a;
                    T(b, a - E)
                };
                r.xSetter = function(a) {
                    r.x = a;
                    m && (a -= m * ((S || w.width) + 2 * I), r["forceAnimate:x"] = !0);
                    x = Math.round(a);
                    r.attr("translateX", x)
                };
                r.ySetter = function(a) {
                    E = r.y = Math.round(a);
                    r.attr("translateY", E)
                };
                var D = r.css;
                B = {
                    css: function(a) {
                        if (a) {
                            var b = {};
                            a = g(a);
                            r.textProps.forEach(function(d) {
                                "undefined" !== typeof a[d] && (b[d] = a[d], delete a[d])
                            });
                            p.css(b);
                            "width" in b && q();
                            "fontSize" in b && (q(), t())
                        }
                        return D.call(r, a)
                    },
                    getBBox: function() {
                        return {
                            width: w.width + 2 * I,
                            height: w.height + 2 * I,
                            x: w.x - I,
                            y: w.y - I
                        }
                    },
                    destroy: function() {
                        l(r.element, "mouseenter");
                        l(r.element, "mouseleave");
                        p && (p = p.destroy());
                        c && (c = c.destroy());
                        U.prototype.destroy.call(r);
                        r = y = q = t = T = null
                    }
                };
                v || (B.shadow = function(a) {
                    a && (q(), c && c.shadow(a));
                    return r
                });
                return z(r, B)
            }
        });
        c.Renderer = f
    });
    O(u, "parts/Html.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        var G = f.attr,
            q = f.createElement,
            A = f.css,
            t = f.defined,
            M = f.extend,
            C = f.pick,
            F = f.pInt,
            D = c.isFirefox,
            k = c.isMS,
            m = c.isWebKit,
            x = c.SVGElement;
        f = c.SVGRenderer;
        var z = c.win;
        M(x.prototype, {
            htmlCss: function(c) {
                var p = "SPAN" === this.element.tagName && c && "width" in c,
                    w = C(p && c.width, void 0);
                if (p) {
                    delete c.width;
                    this.textWidth = w;
                    var e = !0
                }
                c && "ellipsis" === c.textOverflow && (c.whiteSpace = "nowrap", c.overflow = "hidden");
                this.styles = M(this.styles, c);
                A(this.element, c);
                e && this.htmlUpdateTransform();
                return this
            },
            htmlGetBBox: function() {
                var c = this.element;
                return {
                    x: c.offsetLeft,
                    y: c.offsetTop,
                    width: c.offsetWidth,
                    height: c.offsetHeight
                }
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var c = this.renderer,
                        p = this.element,
                        k = this.translateX || 0,
                        e = this.translateY || 0,
                        a = this.x || 0,
                        g = this.y || 0,
                        h = this.textAlign || "left",
                        d = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[h],
                        b = this.styles,
                        l = b && b.whiteSpace;
                    A(p, {
                        marginLeft: k,
                        marginTop: e
                    });
                    !c.styledMode && this.shadows && this.shadows.forEach(function(a) {
                        A(a, {
                            marginLeft: k + 1,
                            marginTop: e + 1
                        })
                    });
                    this.inverted && [].forEach.call(p.childNodes, function(a) {
                        c.invertChild(a, p)
                    });
                    if ("SPAN" === p.tagName) {
                        b = this.rotation;
                        var y = this.textWidth &&
                            F(this.textWidth),
                            r = [b, h, p.innerHTML, this.textWidth, this.textAlign].join(),
                            v;
                        (v = y !== this.oldTextWidth) && !(v = y > this.oldTextWidth) && ((v = this.textPxLength) || (A(p, {
                            width: "",
                            whiteSpace: l || "nowrap"
                        }), v = p.offsetWidth), v = v > y);
                        v && (/[ \-]/.test(p.textContent || p.innerText) || "ellipsis" === p.style.textOverflow) ? (A(p, {
                            width: y + "px",
                            display: "block",
                            whiteSpace: l || "normal"
                        }), this.oldTextWidth = y, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                        r !== this.cTT && (l = c.fontMetrics(p.style.fontSize, p).b, !t(b) || b === (this.oldRotation ||
                            0) && h === this.oldAlign || this.setSpanRotation(b, d, l), this.getSpanCorrection(!t(b) && this.textPxLength || p.offsetWidth, l, d, b, h));
                        A(p, {
                            left: a + (this.xCorr || 0) + "px",
                            top: g + (this.yCorr || 0) + "px"
                        });
                        this.cTT = r;
                        this.oldRotation = b;
                        this.oldAlign = h
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(c, p, k) {
                var e = {},
                    a = this.renderer.getTransformKey();
                e[a] = e.transform = "rotate(" + c + "deg)";
                e[a + (D ? "Origin" : "-origin")] = e.transformOrigin = 100 * p + "% " + k + "px";
                A(this.element, e)
            },
            getSpanCorrection: function(c, p, k) {
                this.xCorr = -c * k;
                this.yCorr = -p
            }
        });
        M(f.prototype, {
            getTransformKey: function() {
                return k && !/Edge/.test(z.navigator.userAgent) ? "-ms-transform" : m ? "-webkit-transform" : D ? "MozTransform" : z.opera ? "-o-transform" : ""
            },
            html: function(c, p, k) {
                var e = this.createElement("span"),
                    a = e.element,
                    g = e.renderer,
                    h = g.isSVG,
                    d = function(a, d) {
                        ["opacity", "visibility"].forEach(function(b) {
                            a[b + "Setter"] = function(e, g, l) {
                                var h = a.div ? a.div.style : d;
                                x.prototype[b + "Setter"].call(this, e, g, l);
                                h && (h[g] = e)
                            }
                        });
                        a.addedSetters = !0
                    };
                e.textSetter = function(b) {
                    b !== a.innerHTML &&
                        (delete this.bBox, delete this.oldTextWidth);
                    this.textStr = b;
                    a.innerHTML = C(b, "");
                    e.doTransform = !0
                };
                h && d(e, e.element.style);
                e.xSetter = e.ySetter = e.alignSetter = e.rotationSetter = function(a, d) {
                    "align" === d && (d = "textAlign");
                    e[d] = a;
                    e.doTransform = !0
                };
                e.afterSetters = function() {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                e.attr({
                    text: c,
                    x: Math.round(p),
                    y: Math.round(k)
                }).css({
                    position: "absolute"
                });
                g.styledMode || e.css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                });
                a.style.whiteSpace =
                    "nowrap";
                e.css = e.htmlCss;
                h && (e.add = function(b) {
                    var l = g.box.parentNode,
                        h = [];
                    if (this.parentGroup = b) {
                        var r = b.div;
                        if (!r) {
                            for (; b;) h.push(b), b = b.parentGroup;
                            h.reverse().forEach(function(a) {
                                function b(b, d) {
                                    a[d] = b;
                                    "translateX" === d ? y.left = b + "px" : y.top = b + "px";
                                    a.doTransform = !0
                                }
                                var g = G(a.element, "class");
                                r = a.div = a.div || q("div", g ? {
                                        className: g
                                    } : void 0, {
                                        position: "absolute",
                                        left: (a.translateX || 0) + "px",
                                        top: (a.translateY || 0) + "px",
                                        display: a.display,
                                        opacity: a.opacity,
                                        pointerEvents: a.styles && a.styles.pointerEvents
                                    }, r ||
                                    l);
                                var y = r.style;
                                M(a, {
                                    classSetter: function(a) {
                                        return function(b) {
                                            this.element.setAttribute("class", b);
                                            a.className = b
                                        }
                                    }(r),
                                    on: function() {
                                        h[0].div && e.on.apply({
                                            element: h[0].div
                                        }, arguments);
                                        return a
                                    },
                                    translateXSetter: b,
                                    translateYSetter: b
                                });
                                a.addedSetters || d(a)
                            })
                        }
                    } else r = l;
                    r.appendChild(a);
                    e.added = !0;
                    e.alignOnAdd && e.htmlUpdateTransform();
                    return e
                });
                return e
            }
        })
    });
    O(u, "parts/Tick.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        var G = f.clamp,
            q = f.correctFloat,
            A = f.defined,
            t = f.destroyObjectProperties,
            M = f.extend,
            C = f.isNumber,
            F = f.merge,
            D = f.objectEach,
            k = f.pick,
            m = c.fireEvent,
            x = c.deg2rad;
        f = function() {
            function f(c, p, k, e, a) {
                this.isNewLabel = this.isNew = !0;
                this.axis = c;
                this.pos = p;
                this.type = k || "";
                this.parameters = a || {};
                this.tickmarkOffset = this.parameters.tickmarkOffset;
                this.options = this.parameters.options;
                k || e || this.addLabel()
            }
            f.prototype.addLabel = function() {
                var c = this,
                    p = c.axis,
                    m = p.options,
                    e = p.chart,
                    a = p.categories,
                    g = p.names,
                    h = c.pos,
                    d = k(c.options && c.options.labels, m.labels),
                    b = p.tickPositions,
                    l = h === b[0],
                    y = h ===
                    b[b.length - 1];
                g = this.parameters.category || (a ? k(a[h], g[h], h) : h);
                var r = c.label;
                a = (!d.step || 1 === d.step) && 1 === p.tickInterval;
                b = b.info;
                var v, I;
                if (p.isDatetimeAxis && b) {
                    var x = e.time.resolveDTLFormat(m.dateTimeLabelFormats[!m.grid && b.higherRanks[h] || b.unitName]);
                    var f = x.main
                }
                c.isFirst = l;
                c.isLast = y;
                c.formatCtx = {
                    axis: p,
                    chart: e,
                    isFirst: l,
                    isLast: y,
                    dateTimeLabelFormat: f,
                    tickPositionInfo: b,
                    value: p.isLog ? q(p.lin2log(g)) : g,
                    pos: h
                };
                m = p.labelFormatter.call(c.formatCtx, this.formatCtx);
                if (I = x && x.list) c.shortenLabel = function() {
                    for (v =
                        0; v < I.length; v++)
                        if (r.attr({
                                text: p.labelFormatter.call(M(c.formatCtx, {
                                    dateTimeLabelFormat: I[v]
                                }))
                            }), r.getBBox().width < p.getSlotWidth(c) - 2 * k(d.padding, 5)) return;
                    r.attr({
                        text: ""
                    })
                };
                a && p._addedPlotLB && p.isXAxis && c.moveLabel(m, d);
                A(r) || c.movedLabel ? r && r.textStr !== m && !a && (!r.textWidth || d.style && d.style.width || r.styles.width || r.css({
                    width: null
                }), r.attr({
                    text: m
                }), r.textPxLength = r.getBBox().width) : (c.label = r = c.createLabel({
                    x: 0,
                    y: 0
                }, m, d), c.rotation = 0)
            };
            f.prototype.createLabel = function(c, p, k) {
                var e = this.axis,
                    a = e.chart;
                if (c = A(p) && k.enabled ? a.renderer.text(p, c.x, c.y, k.useHTML).add(e.labelGroup) : null) a.styledMode || c.css(F(k.style)), c.textPxLength = c.getBBox().width;
                return c
            };
            f.prototype.destroy = function() {
                t(this, this.axis)
            };
            f.prototype.getPosition = function(c, p, k, e) {
                var a = this.axis,
                    g = a.chart,
                    h = e && g.oldChartHeight || g.chartHeight;
                c = {
                    x: c ? q(a.translate(p + k, null, null, e) + a.transB) : a.left + a.offset + (a.opposite ? (e && g.oldChartWidth || g.chartWidth) - a.right - a.left : 0),
                    y: c ? h - a.bottom + a.offset - (a.opposite ? a.height : 0) : q(h -
                        a.translate(p + k, null, null, e) - a.transB)
                };
                c.y = G(c.y, -1E5, 1E5);
                m(this, "afterGetPosition", {
                    pos: c
                });
                return c
            };
            f.prototype.getLabelPosition = function(c, p, k, e, a, g, h, d) {
                var b = this.axis,
                    l = b.transA,
                    y = b.isLinked && b.linkedParent ? b.linkedParent.reversed : b.reversed,
                    r = b.staggerLines,
                    v = b.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    I = a.y,
                    w = e || b.reserveSpaceDefault ? 0 : -b.labelOffset * ("center" === b.labelAlign ? .5 : 1),
                    f = {};
                A(I) || (I = 0 === b.side ? k.rotation ? -8 : -k.getBBox().height : 2 === b.side ? v.y + 8 : Math.cos(k.rotation * x) * (v.y - k.getBBox(!1, 0).height /
                    2));
                c = c + a.x + w + v.x - (g && e ? g * l * (y ? -1 : 1) : 0);
                p = p + I - (g && !e ? g * l * (y ? 1 : -1) : 0);
                r && (k = h / (d || 1) % r, b.opposite && (k = r - k - 1), p += b.labelOffset / r * k);
                f.x = c;
                f.y = Math.round(p);
                m(this, "afterGetLabelPosition", {
                    pos: f,
                    tickmarkOffset: g,
                    index: h
                });
                return f
            };
            f.prototype.getLabelSize = function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            };
            f.prototype.getMarkPath = function(c, p, k, e, a, g) {
                return g.crispLine(["M", c, p, "L", c + (a ? 0 : -k), p + (a ? k : 0)], e)
            };
            f.prototype.handleOverflow = function(c) {
                var p = this.axis,
                    m =
                    p.options.labels,
                    e = c.x,
                    a = p.chart.chartWidth,
                    g = p.chart.spacing,
                    h = k(p.labelLeft, Math.min(p.pos, g[3]));
                g = k(p.labelRight, Math.max(p.isRadial ? 0 : p.pos + p.len, a - g[1]));
                var d = this.label,
                    b = this.rotation,
                    l = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[p.labelAlign || d.attr("align")],
                    y = d.getBBox().width,
                    r = p.getSlotWidth(this),
                    v = r,
                    I = 1,
                    w, f = {};
                if (b || "justify" !== k(m.overflow, "justify")) 0 > b && e - l * y < h ? w = Math.round(e / Math.cos(b * x) - h) : 0 < b && e + l * y > g && (w = Math.round((a - e) / Math.cos(b * x)));
                else if (a = e + (1 - l) * y, e - l * y < h ? v = c.x + v * (1 - l) - h : a > g && (v = g -
                        c.x + v * l, I = -1), v = Math.min(r, v), v < r && "center" === p.labelAlign && (c.x += I * (r - v - l * (r - Math.min(y, v)))), y > v || p.autoRotation && (d.styles || {}).width) w = v;
                w && (this.shortenLabel ? this.shortenLabel() : (f.width = Math.floor(w), (m.style || {}).textOverflow || (f.textOverflow = "ellipsis"), d.css(f)))
            };
            f.prototype.moveLabel = function(c, p) {
                var k = this,
                    e = k.label,
                    a = !1,
                    g = k.axis,
                    h = g.reversed,
                    d = g.chart.inverted;
                e && e.textStr === c ? (k.movedLabel = e, a = !0, delete k.label) : D(g.ticks, function(b) {
                    a || b.isNew || b === k || !b.label || b.label.textStr !== c ||
                        (k.movedLabel = b.label, a = !0, b.labelPos = k.movedLabel.xy, delete b.label)
                });
                if (!a && (k.labelPos || e)) {
                    var b = k.labelPos || e.xy;
                    e = d ? b.x : h ? 0 : g.width + g.left;
                    g = d ? h ? g.width + g.left : 0 : b.y;
                    k.movedLabel = k.createLabel({
                        x: e,
                        y: g
                    }, c, p);
                    k.movedLabel && k.movedLabel.attr({
                        opacity: 0
                    })
                }
            };
            f.prototype.render = function(m, p, x) {
                var e = this.axis,
                    a = e.horiz,
                    g = this.pos,
                    h = k(this.tickmarkOffset, e.tickmarkOffset);
                g = this.getPosition(a, g, h, p);
                h = g.x;
                var d = g.y;
                e = a && h === e.pos + e.len || !a && d === e.pos ? -1 : 1;
                x = k(x, 1);
                this.isActive = !0;
                this.renderGridLine(p,
                    x, e);
                this.renderMark(g, x, e);
                this.renderLabel(g, p, x, m);
                this.isNew = !1;
                c.fireEvent(this, "afterRender")
            };
            f.prototype.renderGridLine = function(c, p, m) {
                var e = this.axis,
                    a = e.options,
                    g = this.gridLine,
                    h = {},
                    d = this.pos,
                    b = this.type,
                    l = k(this.tickmarkOffset, e.tickmarkOffset),
                    y = e.chart.renderer,
                    r = b ? b + "Grid" : "grid",
                    v = a[r + "LineWidth"],
                    I = a[r + "LineColor"];
                a = a[r + "LineDashStyle"];
                g || (e.chart.styledMode || (h.stroke = I, h["stroke-width"] = v, a && (h.dashstyle = a)), b || (h.zIndex = 1), c && (p = 0), this.gridLine = g = y.path().attr(h).addClass("highcharts-" +
                    (b ? b + "-" : "") + "grid-line").add(e.gridGroup));
                if (g && (m = e.getPlotLinePath({
                        value: d + l,
                        lineWidth: g.strokeWidth() * m,
                        force: "pass",
                        old: c
                    }))) g[c || this.isNew ? "attr" : "animate"]({
                    d: m,
                    opacity: p
                })
            };
            f.prototype.renderMark = function(c, p, m) {
                var e = this.axis,
                    a = e.options,
                    g = e.chart.renderer,
                    h = this.type,
                    d = h ? h + "Tick" : "tick",
                    b = e.tickSize(d),
                    l = this.mark,
                    y = !l,
                    r = c.x;
                c = c.y;
                var v = k(a[d + "Width"], !h && e.isXAxis ? 1 : 0);
                a = a[d + "Color"];
                b && (e.opposite && (b[0] = -b[0]), y && (this.mark = l = g.path().addClass("highcharts-" + (h ? h + "-" : "") + "tick").add(e.axisGroup),
                    e.chart.styledMode || l.attr({
                        stroke: a,
                        "stroke-width": v
                    })), l[y ? "attr" : "animate"]({
                    d: this.getMarkPath(r, c, b[0], l.strokeWidth() * m, e.horiz, g),
                    opacity: p
                }))
            };
            f.prototype.renderLabel = function(c, p, m, e) {
                var a = this.axis,
                    g = a.horiz,
                    h = a.options,
                    d = this.label,
                    b = h.labels,
                    l = b.step;
                a = k(this.tickmarkOffset, a.tickmarkOffset);
                var y = !0,
                    r = c.x;
                c = c.y;
                d && C(r) && (d.xy = c = this.getLabelPosition(r, c, d, g, b, a, e, l), this.isFirst && !this.isLast && !k(h.showFirstLabel, 1) || this.isLast && !this.isFirst && !k(h.showLastLabel, 1) ? y = !1 : !g || b.step ||
                    b.rotation || p || 0 === m || this.handleOverflow(c), l && e % l && (y = !1), y && C(c.y) ? (c.opacity = m, d[this.isNewLabel ? "attr" : "animate"](c), this.isNewLabel = !1) : (d.attr("y", -9999), this.isNewLabel = !0))
            };
            f.prototype.replaceMovedLabel = function() {
                var c = this.label,
                    p = this.axis,
                    k = p.reversed,
                    e = this.axis.chart.inverted;
                if (c && !this.isNew) {
                    var a = e ? c.xy.x : k ? p.left : p.width + p.left;
                    k = e ? k ? p.width + p.top : p.top : c.xy.y;
                    c.animate({
                        x: a,
                        y: k,
                        opacity: 0
                    }, void 0, c.destroy);
                    delete this.label
                }
                p.isDirty = !0;
                this.label = this.movedLabel;
                delete this.movedLabel
            };
            return f
        }();
        c.Tick = f;
        return c.Tick
    });
    O(u, "parts/Time.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        var G = f.defined,
            q = f.error,
            A = f.extend,
            t = f.isObject,
            M = f.merge,
            C = f.objectEach,
            F = f.pad,
            D = f.pick,
            k = f.splat,
            m = f.timeUnits,
            x = c.win;
        f = function() {
            function f(c) {
                this.options = {};
                this.variableTimezone = this.useUTC = !1;
                this.Date = x.Date;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.update(c)
            }
            f.prototype.get = function(c, p) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var k = p.getTime(),
                        e = k - this.getTimezoneOffset(p);
                    p.setTime(e);
                    c = p["getUTC" + c]();
                    p.setTime(k);
                    return c
                }
                return this.useUTC ? p["getUTC" + c]() : p["get" + c]()
            };
            f.prototype.set = function(c, p, k) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if ("Milliseconds" === c || "Seconds" === c || "Minutes" === c) return p["setUTC" + c](k);
                    var e = this.getTimezoneOffset(p);
                    e = p.getTime() - e;
                    p.setTime(e);
                    p["setUTC" + c](k);
                    c = this.getTimezoneOffset(p);
                    e = p.getTime() + c;
                    return p.setTime(e)
                }
                return this.useUTC ? p["setUTC" + c](k) : p["set" + c](k)
            };
            f.prototype.update = function(c) {
                var p =
                    D(c && c.useUTC, !0);
                this.options = c = M(!0, this.options || {}, c);
                this.Date = c.Date || x.Date || Date;
                this.timezoneOffset = (this.useUTC = p) && c.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.variableTimezone = !(p && !c.getTimezoneOffset && !c.timezone)
            };
            f.prototype.makeTime = function(k, p, m, e, a, g) {
                if (this.useUTC) {
                    var h = this.Date.UTC.apply(0, arguments);
                    var d = this.getTimezoneOffset(h);
                    h += d;
                    var b = this.getTimezoneOffset(h);
                    d !== b ? h += b - d : d - 36E5 !== this.getTimezoneOffset(h - 36E5) || c.isSafari || (h -= 36E5)
                } else h =
                    (new this.Date(k, p, D(m, 1), D(e, 0), D(a, 0), D(g, 0))).getTime();
                return h
            };
            f.prototype.timezoneOffsetFunction = function() {
                var c = this,
                    p = this.options,
                    k = x.moment;
                if (!this.useUTC) return function(e) {
                    return 6E4 * (new Date(e.toString())).getTimezoneOffset()
                };
                if (p.timezone) {
                    if (k) return function(e) {
                        return 6E4 * -k.tz(e, p.timezone).utcOffset()
                    };
                    q(25)
                }
                return this.useUTC && p.getTimezoneOffset ? function(e) {
                    return 6E4 * p.getTimezoneOffset(e)
                } : function() {
                    return 6E4 * (c.timezoneOffset || 0)
                }
            };
            f.prototype.dateFormat = function(k, p,
                m) {
                var e;
                if (!G(p) || isNaN(p)) return (null === (e = c.defaultOptions.lang) || void 0 === e ? void 0 : e.invalidDate) || "";
                k = D(k, "%Y-%m-%d %H:%M:%S");
                var a = this;
                e = new this.Date(p);
                var g = this.get("Hours", e),
                    h = this.get("Day", e),
                    d = this.get("Date", e),
                    b = this.get("Month", e),
                    l = this.get("FullYear", e),
                    y = c.defaultOptions.lang,
                    r = null === y || void 0 === y ? void 0 : y.weekdays,
                    v = null === y || void 0 === y ? void 0 : y.shortWeekdays;
                e = A({
                    a: v ? v[h] : r[h].substr(0, 3),
                    A: r[h],
                    d: F(d),
                    e: F(d, 2, " "),
                    w: h,
                    b: y.shortMonths[b],
                    B: y.months[b],
                    m: F(b + 1),
                    o: b + 1,
                    y: l.toString().substr(2,
                        2),
                    Y: l,
                    H: F(g),
                    k: g,
                    I: F(g % 12 || 12),
                    l: g % 12 || 12,
                    M: F(this.get("Minutes", e)),
                    p: 12 > g ? "AM" : "PM",
                    P: 12 > g ? "am" : "pm",
                    S: F(e.getSeconds()),
                    L: F(Math.floor(p % 1E3), 3)
                }, c.dateFormats);
                C(e, function(b, d) {
                    for (; - 1 !== k.indexOf("%" + d);) k = k.replace("%" + d, "function" === typeof b ? b.call(a, p) : b)
                });
                return m ? k.substr(0, 1).toUpperCase() + k.substr(1) : k
            };
            f.prototype.resolveDTLFormat = function(c) {
                return t(c, !0) ? c : (c = k(c), {
                    main: c[0],
                    from: c[1],
                    to: c[2]
                })
            };
            f.prototype.getTimeTicks = function(c, p, k, e) {
                var a = this,
                    g = [],
                    h = {};
                var d = new a.Date(p);
                var b = c.unitRange,
                    l = c.count || 1,
                    y;
                e = D(e, 1);
                if (G(p)) {
                    a.set("Milliseconds", d, b >= m.second ? 0 : l * Math.floor(a.get("Milliseconds", d) / l));
                    b >= m.second && a.set("Seconds", d, b >= m.minute ? 0 : l * Math.floor(a.get("Seconds", d) / l));
                    b >= m.minute && a.set("Minutes", d, b >= m.hour ? 0 : l * Math.floor(a.get("Minutes", d) / l));
                    b >= m.hour && a.set("Hours", d, b >= m.day ? 0 : l * Math.floor(a.get("Hours", d) / l));
                    b >= m.day && a.set("Date", d, b >= m.month ? 1 : Math.max(1, l * Math.floor(a.get("Date", d) / l)));
                    if (b >= m.month) {
                        a.set("Month", d, b >= m.year ? 0 : l * Math.floor(a.get("Month",
                            d) / l));
                        var r = a.get("FullYear", d)
                    }
                    b >= m.year && a.set("FullYear", d, r - r % l);
                    b === m.week && (r = a.get("Day", d), a.set("Date", d, a.get("Date", d) - r + e + (r < e ? -7 : 0)));
                    r = a.get("FullYear", d);
                    e = a.get("Month", d);
                    var v = a.get("Date", d),
                        I = a.get("Hours", d);
                    p = d.getTime();
                    a.variableTimezone && (y = k - p > 4 * m.month || a.getTimezoneOffset(p) !== a.getTimezoneOffset(k));
                    p = d.getTime();
                    for (d = 1; p < k;) g.push(p), p = b === m.year ? a.makeTime(r + d * l, 0) : b === m.month ? a.makeTime(r, e + d * l) : !y || b !== m.day && b !== m.week ? y && b === m.hour && 1 < l ? a.makeTime(r, e, v, I + d * l) :
                        p + b * l : a.makeTime(r, e, v + d * l * (b === m.day ? 1 : 7)), d++;
                    g.push(p);
                    b <= m.hour && 1E4 > g.length && g.forEach(function(b) {
                        0 === b % 18E5 && "000000000" === a.dateFormat("%H%M%S%L", b) && (h[b] = "day")
                    })
                }
                g.info = A(c, {
                    higherRanks: h,
                    totalRange: b * l
                });
                return g
            };
            f.defaultOptions = {
                Date: void 0,
                getTimezoneOffset: void 0,
                timezone: void 0,
                timezoneOffset: 0,
                useUTC: !0
            };
            return f
        }();
        c.Time = f;
        return c.Time
    });
    O(u, "parts/Options.js", [u["parts/Globals.js"], u["parts/Time.js"], u["parts/Color.js"], u["parts/Utilities.js"]], function(c, f, G, q) {
        G = G.parse;
        var A = q.merge;
        c.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: f.defaultOptions,
            chart: {
                styledMode: !1,
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 6
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            caption: {
                margin: 15,
                text: "",
                align: "left",
                verticalAlign: "bottom"
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: c.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: c.isTouchDevice ? 25 : 10,
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                backgroundColor: G("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "https://www.highcharts.com?credits",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        c.setOptions = function(f) {
            c.defaultOptions = A(!0, c.defaultOptions, f);
            (f.time || f.global) && c.time.update(A(c.defaultOptions.global, c.defaultOptions.time, f.global, f.time));
            return c.defaultOptions
        };
        c.getOptions = function() {
            return c.defaultOptions
        };
        c.defaultPlotOptions = c.defaultOptions.plotOptions;
        c.time = new f(A(c.defaultOptions.global, c.defaultOptions.time));
        c.dateFormat =
            function(f, q, A) {
                return c.time.dateFormat(f, q, A)
            };
        ""
    });
    O(u, "parts/Axis.js", [u["parts/Globals.js"], u["parts/Color.js"], u["parts/Tick.js"], u["parts/Utilities.js"]], function(c, f, G, q) {
        var A = f.parse,
            t = q.addEvent,
            M = q.animObject,
            C = q.arrayMax,
            F = q.arrayMin,
            D = q.clamp,
            k = q.correctFloat,
            m = q.defined,
            x = q.destroyObjectProperties,
            z = q.error,
            w = q.extend,
            p = q.fireEvent,
            K = q.format,
            e = q.getMagnitude,
            a = q.isArray,
            g = q.isFunction,
            h = q.isNumber,
            d = q.isString,
            b = q.merge,
            l = q.normalizeTickInterval,
            y = q.objectEach,
            r = q.pick,
            v = q.relativeLength,
            I = q.removeEvent,
            L = q.splat,
            Q = q.syncTimeout,
            N = c.defaultOptions,
            R = c.deg2rad;
        f = function() {
            this.init.apply(this, arguments)
        };
        w(f.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: {
                        main: "%H:%M:%S.%L",
                        range: !1
                    },
                    second: {
                        main: "%H:%M:%S",
                        range: !1
                    },
                    minute: {
                        main: "%H:%M",
                        range: !1
                    },
                    hour: {
                        main: "%H:%M",
                        range: !1
                    },
                    day: {
                        main: "%e. %b"
                    },
                    week: {
                        main: "%e. %b"
                    },
                    month: {
                        main: "%b '%y"
                    },
                    year: {
                        main: "%Y"
                    }
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    indentation: 10,
                    x: 0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    }
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                showEmpty: !0,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    crop: !0,
                    overflow: "justify",
                    formatter: function() {
                        var a = this.axis.chart.numberFormatter;
                        return a(this.total, -1)
                    },
                    style: {
                        color: "#000000",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            },
            init: function(a, b) {
                var d = b.isX,
                    n = this;
                n.chart = a;
                n.horiz = a.inverted && !n.isZAxis ? !d : d;
                n.isXAxis = d;
                n.coll = n.coll || (d ? "xAxis" : "yAxis");
                p(this, "init", {
                    userOptions: b
                });
                n.opposite = b.opposite;
                n.side = b.side || (n.horiz ? n.opposite ? 0 : 2 : n.opposite ? 1 : 3);
                n.setOptions(b);
                var e = this.options,
                    l = e.type;
                n.labelFormatter = e.labels.formatter || n.defaultLabelFormatter;
                n.userOptions = b;
                n.minPixelPadding = 0;
                n.reversed =
                    e.reversed;
                n.visible = !1 !== e.visible;
                n.zoomEnabled = !1 !== e.zoomEnabled;
                n.hasNames = "category" === l || !0 === e.categories;
                n.categories = e.categories || n.hasNames;
                n.names || (n.names = [], n.names.keys = {});
                n.plotLinesAndBandsGroups = {};
                n.isLog = "logarithmic" === l;
                n.isDatetimeAxis = "datetime" === l;
                n.positiveValuesOnly = n.isLog && !n.allowNegativeLog;
                n.isLinked = m(e.linkedTo);
                n.ticks = {};
                n.labelEdge = [];
                n.minorTicks = {};
                n.plotLinesAndBands = [];
                n.alternateBands = {};
                n.len = 0;
                n.minRange = n.userMinRange = e.minRange || e.maxZoom;
                n.range =
                    e.range;
                n.offset = e.offset || 0;
                n.stacks = {};
                n.oldStacks = {};
                n.stacksTouched = 0;
                n.max = null;
                n.min = null;
                n.crosshair = r(e.crosshair, L(a.options.tooltip.crosshairs)[d ? 0 : 1], !1);
                b = n.options.events; - 1 === a.axes.indexOf(n) && (d ? a.axes.splice(a.xAxis.length, 0, n) : a.axes.push(n), a[n.coll].push(n));
                n.series = n.series || [];
                a.inverted && !n.isZAxis && d && "undefined" === typeof n.reversed && (n.reversed = !0);
                y(b, function(a, b) {
                    g(a) && t(n, b, a)
                });
                n.lin2log = e.linearToLogConverter || n.lin2log;
                n.isLog && (n.val2lin = n.log2lin, n.lin2val = n.lin2log);
                p(this, "afterInit")
            },
            setOptions: function(a) {
                this.options = b(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], b(N[this.coll], a));
                p(this, "afterSetOptions", {
                    userOptions: a
                })
            },
            defaultLabelFormatter: function() {
                var a = this.axis,
                    b = this.value,
                    d = a.chart.time,
                    e = a.categories,
                    g = this.dateTimeLabelFormat,
                    l = N.lang,
                    h = l.numericSymbols;
                l = l.numericSymbolMagnitude || 1E3;
                var c = h &&
                    h.length,
                    r = a.options.labels.format;
                a = a.isLog ? Math.abs(b) : a.tickInterval;
                var y = this.chart,
                    v = y.numberFormatter;
                if (r) var p = K(r, this, y);
                else if (e) p = b;
                else if (g) p = d.dateFormat(g, b);
                else if (c && 1E3 <= a)
                    for (; c-- && "undefined" === typeof p;) d = Math.pow(l, c + 1), a >= d && 0 === 10 * b % d && null !== h[c] && 0 !== b && (p = v(b / d, -1) + h[c]);
                "undefined" === typeof p && (p = 1E4 <= Math.abs(b) ? v(b, -1) : v(b, -1, void 0, ""));
                return p
            },
            getSeriesExtremes: function() {
                var a = this,
                    b = a.chart,
                    d;
                p(this, "getSeriesExtremes", null, function() {
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.buildStacks && a.buildStacks();
                    a.series.forEach(function(n) {
                        if (n.visible || !b.options.chart.ignoreHiddenSeries) {
                            var e = n.options,
                                g = e.threshold;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= g && (g = null);
                            if (a.isXAxis) {
                                if (e = n.xData, e.length) {
                                    d = n.getXExtremes(e);
                                    var l = d.min;
                                    var B = d.max;
                                    h(l) || l instanceof Date || (e = e.filter(h), d = n.getXExtremes(e), l = d.min, B = d.max);
                                    e.length && (a.dataMin = Math.min(r(a.dataMin, l), l), a.dataMax = Math.max(r(a.dataMax,
                                        B), B))
                                }
                            } else if (n.getExtremes(), B = n.dataMax, l = n.dataMin, m(l) && m(B) && (a.dataMin = Math.min(r(a.dataMin, l), l), a.dataMax = Math.max(r(a.dataMax, B), B)), m(g) && (a.threshold = g), !e.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                        }
                    })
                });
                p(this, "afterGetSeriesExtremes")
            },
            translate: function(a, b, d, e, g, l) {
                var n = this.linkedParent || this,
                    B = 1,
                    c = 0,
                    H = e ? n.oldTransA : n.transA;
                e = e ? n.oldMin : n.min;
                var r = n.minPixelPadding;
                g = (n.isOrdinal || n.isBroken || n.isLog && g) && n.lin2val;
                H || (H = n.transA);
                d && (B *= -1, c = n.len);
                n.reversed && (B *=
                    -1, c -= B * (n.sector || n.len));
                b ? (a = (a * B + c - r) / H + e, g && (a = n.lin2val(a))) : (g && (a = n.val2lin(a)), a = h(e) ? B * (a - e) * H + c + B * r + (h(l) ? H * l : 0) : void 0);
                return a
            },
            toPixels: function(a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function(a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function(a) {
                var b = this,
                    d = b.chart,
                    e = b.left,
                    g = b.top,
                    l = a.old,
                    c = a.value,
                    B = a.translatedValue,
                    y = a.lineWidth,
                    v = a.force,
                    k, m, P, I, f = l && d.oldChartHeight || d.chartHeight,
                    x = l && d.oldChartWidth ||
                    d.chartWidth,
                    L, w = b.transB,
                    z = function(a, b, d) {
                        if ("pass" !== v && a < b || a > d) v ? a = D(a, b, d) : L = !0;
                        return a
                    };
                a = {
                    value: c,
                    lineWidth: y,
                    old: l,
                    force: v,
                    acrossPanes: a.acrossPanes,
                    translatedValue: B
                };
                p(this, "getPlotLinePath", a, function(a) {
                    B = r(B, b.translate(c, null, null, l));
                    B = D(B, -1E5, 1E5);
                    k = P = Math.round(B + w);
                    m = I = Math.round(f - B - w);
                    h(B) ? b.horiz ? (m = g, I = f - b.bottom, k = P = z(k, e, e + b.width)) : (k = e, P = x - b.right, m = I = z(m, g, g + b.height)) : (L = !0, v = !1);
                    a.path = L && !v ? null : d.renderer.crispLine(["M", k, m, "L", P, I], y || 1)
                });
                return a.path
            },
            getLinearTickPositions: function(a,
                b, d) {
                var n = k(Math.floor(b / a) * a);
                d = k(Math.ceil(d / a) * a);
                var e = [],
                    g;
                k(n + a) === n && (g = 20);
                if (this.single) return [b];
                for (b = n; b <= d;) {
                    e.push(b);
                    b = k(b + a, g);
                    if (b === l) break;
                    var l = b
                }
                return e
            },
            getMinorTickInterval: function() {
                var a = this.options;
                return !0 === a.minorTicks ? r(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            },
            getMinorTickPositions: function() {
                var a = this,
                    b = a.options,
                    d = a.tickPositions,
                    e = a.minorTickInterval,
                    g = [],
                    l = a.pointRangePadding || 0,
                    h = a.min - l;
                l = a.max + l;
                var c = l - h;
                if (c && c / e < a.len / 3)
                    if (a.isLog) this.paddedTicks.forEach(function(b,
                        d, n) {
                        d && g.push.apply(g, a.getLogTickPositions(e, n[d - 1], n[d], !0))
                    });
                    else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) g = g.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e), h, l, b.startOfWeek));
                else
                    for (b = h + (d[0] - h) % e; b <= l && b !== g[0]; b += e) g.push(b);
                0 !== g.length && a.trimTicks(g);
                return g
            },
            adjustForMinRange: function() {
                var a = this.options,
                    b = this.min,
                    d = this.max,
                    e, g, l, h, c;
                this.isXAxis && "undefined" === typeof this.minRange && !this.isLog && (m(a.min) || m(a.max) ? this.minRange = null : (this.series.forEach(function(a) {
                    h =
                        a.xData;
                    for (g = c = a.xIncrement ? 1 : h.length - 1; 0 < g; g--)
                        if (l = h[g] - h[g - 1], "undefined" === typeof e || l < e) e = l
                }), this.minRange = Math.min(5 * e, this.dataMax - this.dataMin)));
                if (d - b < this.minRange) {
                    var y = this.dataMax - this.dataMin >= this.minRange;
                    var v = this.minRange;
                    var p = (v - d + b) / 2;
                    p = [b - p, r(a.min, b - p)];
                    y && (p[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin);
                    b = C(p);
                    d = [b + v, r(a.max, b + v)];
                    y && (d[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax);
                    d = F(d);
                    d - b < v && (p[0] = d - v, p[1] = r(a.min, d - v), b = C(p))
                }
                this.min = b;
                this.max =
                    d
            },
            getClosest: function() {
                var a;
                this.categories ? a = 1 : this.series.forEach(function(b) {
                    var d = b.closestPointRange,
                        n = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
                    !b.noSharedTooltip && m(d) && n && (a = m(a) ? Math.min(a, d) : d)
                });
                return a
            },
            nameToX: function(b) {
                var d = a(this.categories),
                    e = d ? this.categories : this.names,
                    g = b.options.x;
                b.series.requireSorting = !1;
                m(g) || (g = !1 === this.options.uniqueNames ? b.series.autoIncrement() : d ? e.indexOf(b.name) : r(e.keys[b.name], -1));
                if (-1 === g) {
                    if (!d) var l = e.length
                } else l = g;
                "undefined" !==
                typeof l && (this.names[l] = b.name, this.names.keys[b.name] = l);
                return l
            },
            updateNames: function() {
                var a = this,
                    b = this.names;
                0 < b.length && (Object.keys(b.keys).forEach(function(a) {
                    delete b.keys[a]
                }), b.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function(b) {
                    b.xIncrement = null;
                    if (!b.points || b.isDirtyData) a.max = Math.max(a.max, b.xData.length - 1), b.processData(), b.generatePoints();
                    b.data.forEach(function(d, n) {
                        if (d && d.options && "undefined" !== typeof d.name) {
                            var e = a.nameToX(d);
                            "undefined" !== typeof e &&
                                e !== d.x && (d.x = e, b.xData[n] = e)
                        }
                    })
                }))
            },
            setAxisTranslation: function(a) {
                var b = this,
                    e = b.max - b.min,
                    g = b.axisPointRange || 0,
                    l = 0,
                    h = 0,
                    c = b.linkedParent,
                    B = !!b.categories,
                    y = b.transA,
                    v = b.isXAxis;
                if (v || B || g) {
                    var k = b.getClosest();
                    c ? (l = c.minPointOffset, h = c.pointRangePadding) : b.series.forEach(function(a) {
                        var n = B ? 1 : v ? r(a.options.pointRange, k, 0) : b.axisPointRange || 0,
                            e = a.options.pointPlacement;
                        g = Math.max(g, n);
                        if (!b.single || B) a = a.is("xrange") ? !v : v, l = Math.max(l, a && d(e) ? 0 : n / 2), h = Math.max(h, a && "on" === e ? 0 : n)
                    });
                    c = b.ordinalSlope &&
                        k ? b.ordinalSlope / k : 1;
                    b.minPointOffset = l *= c;
                    b.pointRangePadding = h *= c;
                    b.pointRange = Math.min(g, b.single && B ? 1 : e);
                    v && (b.closestPointRange = k)
                }
                a && (b.oldTransA = y);
                b.translationSlope = b.transA = y = b.staticScale || b.len / (e + h || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = y * l;
                p(this, "afterSetAxisTranslation")
            },
            minFromRange: function() {
                return this.max - this.range
            },
            setTickInterval: function(a) {
                var b = this,
                    d = b.chart,
                    g = b.options,
                    c = b.isLog,
                    y = b.isDatetimeAxis,
                    B = b.isXAxis,
                    v = b.isLinked,
                    I = g.maxPadding,
                    f = g.minPadding,
                    x = g.tickInterval,
                    L = g.tickPixelInterval,
                    P = b.categories,
                    w = h(b.threshold) ? b.threshold : null,
                    N = b.softThreshold;
                y || P || v || this.getTickAmount();
                var q = r(b.userMin, g.min);
                var R = r(b.userMax, g.max);
                if (v) {
                    b.linkedParent = d[b.coll][g.linkedTo];
                    var Q = b.linkedParent.getExtremes();
                    b.min = r(Q.min, Q.dataMin);
                    b.max = r(Q.max, Q.dataMax);
                    g.type !== b.linkedParent.options.type && z(11, 1, d)
                } else {
                    if (!N && m(w))
                        if (b.dataMin >= w) Q = w, f = 0;
                        else if (b.dataMax <= w) {
                        var K = w;
                        I = 0
                    }
                    b.min = r(q, Q, b.dataMin);
                    b.max = r(R, K, b.dataMax)
                }
                c && (b.positiveValuesOnly &&
                    !a && 0 >= Math.min(b.min, r(b.dataMin, b.min)) && z(10, 1, d), b.min = k(b.log2lin(b.min), 16), b.max = k(b.log2lin(b.max), 16));
                b.range && m(b.max) && (b.userMin = b.min = q = Math.max(b.dataMin, b.minFromRange()), b.userMax = R = b.max, b.range = null);
                p(b, "foundExtremes");
                b.beforePadding && b.beforePadding();
                b.adjustForMinRange();
                !(P || b.axisPointRange || b.usePercentage || v) && m(b.min) && m(b.max) && (d = b.max - b.min) && (!m(q) && f && (b.min -= d * f), !m(R) && I && (b.max += d * I));
                h(b.userMin) || (h(g.softMin) && g.softMin < b.min && (b.min = q = g.softMin), h(g.floor) &&
                    (b.min = Math.max(b.min, g.floor)));
                h(b.userMax) || (h(g.softMax) && g.softMax > b.max && (b.max = R = g.softMax), h(g.ceiling) && (b.max = Math.min(b.max, g.ceiling)));
                N && m(b.dataMin) && (w = w || 0, !m(q) && b.min < w && b.dataMin >= w ? b.min = b.options.minRange ? Math.min(w, b.max - b.minRange) : w : !m(R) && b.max > w && b.dataMax <= w && (b.max = b.options.minRange ? Math.max(w, b.min + b.minRange) : w));
                b.tickInterval = b.min === b.max || "undefined" === typeof b.min || "undefined" === typeof b.max ? 1 : v && !x && L === b.linkedParent.options.tickPixelInterval ? x = b.linkedParent.tickInterval :
                    r(x, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, P ? 1 : (b.max - b.min) * L / Math.max(b.len, L));
                B && !a && b.series.forEach(function(a) {
                    a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
                });
                b.setAxisTranslation(!0);
                b.beforeSetTickPositions && b.beforeSetTickPositions();
                b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
                b.pointRange && !x && (b.tickInterval = Math.max(b.pointRange, b.tickInterval));
                a = r(g.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
                !x && b.tickInterval <
                    a && (b.tickInterval = a);
                y || c || x || (b.tickInterval = l(b.tickInterval, null, e(b.tickInterval), r(g.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount));
                this.tickAmount || (b.tickInterval = b.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function() {
                var a = this.options,
                    b = a.tickPositions;
                var d = this.getMinorTickInterval();
                var e = a.tickPositioner,
                    g = a.startOnTick,
                    l = a.endOnTick;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ?
                    .5 : 0;
                this.minorTickInterval = "auto" === d && this.tickInterval ? this.tickInterval / 5 : d;
                this.single = this.min === this.max && m(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = d = b && b.slice();
                !d && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (d = [this.min, this.max], z(19, !1, this.chart)) : d = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek,
                    this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), d.length > this.len && (d = [d[0], d.pop()], d[0] === d[1] && (d.length = 1)), this.tickPositions = d, e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = d = e);
                this.paddedTicks = d.slice(0);
                this.trimTicks(d, g, l);
                this.isLinked || (this.single && 2 > d.length && !this.categories && !this.series.some(function(a) {
                    return a.is("heatmap") &&
                        "between" === a.options.pointPlacement
                }) && (this.min -= .5, this.max += .5), b || e || this.adjustTickAmount());
                p(this, "afterSetTickPositions")
            },
            trimTicks: function(a, b, d) {
                var e = a[0],
                    n = a[a.length - 1],
                    g = !this.isOrdinal && this.minPointOffset || 0;
                p(this, "trimTicks");
                if (!this.isLinked) {
                    if (b && -Infinity !== e) this.min = e;
                    else
                        for (; this.min - g > a[0];) a.shift();
                    if (d) this.max = n;
                    else
                        for (; this.max + g < a[a.length - 1];) a.pop();
                    0 === a.length && m(e) && !this.options.tickPositions && a.push((n + e) / 2)
                }
            },
            alignToOthers: function() {
                var a = {},
                    b, d = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === d.alignTicks || !1 === d.startOnTick || !1 === d.endOnTick || this.isLog || this.chart[this.coll].forEach(function(d) {
                    var e = d.options;
                    e = [d.horiz ? e.left : e.top, e.width, e.height, e.pane].join();
                    d.series.length && (a[e] ? b = !0 : a[e] = 1)
                });
                return b
            },
            getTickAmount: function() {
                var a = this.options,
                    b = a.tickAmount,
                    d = a.tickPixelInterval;
                !m(a.tickInterval) && this.len < d && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / d) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function() {
                var a = this.options,
                    b = this.tickInterval,
                    d = this.tickPositions,
                    e = this.tickAmount,
                    g = this.finalTickAmt,
                    l = d && d.length,
                    h = r(this.threshold, this.softThreshold ? 0 : null),
                    c;
                if (this.hasData()) {
                    if (l < e) {
                        for (c = this.min; d.length < e;) d.length % 2 || c === h ? d.push(k(d[d.length - 1] + b)) : d.unshift(k(d[0] - b));
                        this.transA *= (l - 1) / (e - 1);
                        this.min = a.startOnTick ? d[0] : Math.min(this.min, d[0]);
                        this.max = a.endOnTick ? d[d.length - 1] : Math.max(this.max, d[d.length - 1])
                    } else l >
                        e && (this.tickInterval *= 2, this.setTickPositions());
                    if (m(g)) {
                        for (b = a = d.length; b--;)(3 === g && 1 === b % 2 || 2 >= g && 0 < b && b < a - 1) && d.splice(b, 1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function() {
                var a = this.series.some(function(a) {
                        return a.isDirtyData || a.isDirty || a.xAxis && a.xAxis.isDirty
                    }),
                    b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                (b = this.len !== this.oldAxisLength) || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ?
                    (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
                p(this, "afterSetScale")
            },
            setExtremes: function(a, b, d, e, g) {
                var n = this,
                    l = n.chart;
                d = r(d, !0);
                n.series.forEach(function(a) {
                    delete a.kdTree
                });
                g = w(g, {
                    min: a,
                    max: b
                });
                p(n, "setExtremes", g, function() {
                    n.userMin = a;
                    n.userMax = b;
                    n.eventArgs =
                        g;
                    d && l.redraw(e)
                })
            },
            zoom: function(a, b) {
                var d = this.dataMin,
                    e = this.dataMax,
                    g = this.options,
                    n = Math.min(d, r(g.min, d)),
                    l = Math.max(e, r(g.max, e));
                a = {
                    newMin: a,
                    newMax: b
                };
                p(this, "zoom", a, function(a) {
                    var b = a.newMin,
                        g = a.newMax;
                    if (b !== this.min || g !== this.max) this.allowZoomOutside || (m(d) && (b < n && (b = n), b > l && (b = l)), m(e) && (g < n && (g = n), g > l && (g = l))), this.displayBtn = "undefined" !== typeof b || "undefined" !== typeof g, this.setExtremes(b, g, !1, void 0, {
                        trigger: "zoom"
                    });
                    a.zoomed = !0
                });
                return a.zoomed
            },
            setAxisSize: function() {
                var a =
                    this.chart,
                    b = this.options,
                    d = b.offsets || [0, 0, 0, 0],
                    e = this.horiz,
                    g = this.width = Math.round(v(r(b.width, a.plotWidth - d[3] + d[1]), a.plotWidth)),
                    l = this.height = Math.round(v(r(b.height, a.plotHeight - d[0] + d[2]), a.plotHeight)),
                    h = this.top = Math.round(v(r(b.top, a.plotTop + d[0]), a.plotHeight, a.plotTop));
                b = this.left = Math.round(v(r(b.left, a.plotLeft + d[3]), a.plotWidth, a.plotLeft));
                this.bottom = a.chartHeight - l - h;
                this.right = a.chartWidth - g - b;
                this.len = Math.max(e ? g : l, 0);
                this.pos = e ? b : h
            },
            getExtremes: function() {
                var a = this.isLog;
                return {
                    min: a ? k(this.lin2log(this.min)) : this.min,
                    max: a ? k(this.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function(a) {
                var b = this.isLog,
                    d = b ? this.lin2log(this.min) : this.min;
                b = b ? this.lin2log(this.max) : this.max;
                null === a || -Infinity === a ? a = d : Infinity === a ? a = b : d > a ? a = d : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function(a) {
                var b = (r(a, 0) - 90 * this.side + 720) % 360;
                a = {
                    align: "center"
                };
                p(this, "autoLabelAlign", a, function(a) {
                    15 <
                        b && 165 > b ? a.align = "right" : 195 < b && 345 > b && (a.align = "left")
                });
                return a.align
            },
            tickSize: function(a) {
                var b = this.options,
                    d = b[a + "Length"],
                    e = r(b[a + "Width"], "tick" === a && this.isXAxis && !this.categories ? 1 : 0);
                if (e && d) {
                    "inside" === b[a + "Position"] && (d = -d);
                    var g = [d, e]
                }
                a = {
                    tickSize: g
                };
                p(this, "afterTickSize", a);
                return a.tickSize
            },
            labelMetrics: function() {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] &&
                    this.ticks[a].label)
            },
            unsquish: function() {
                var a = this.options.labels,
                    b = this.horiz,
                    d = this.tickInterval,
                    e = d,
                    g = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / d),
                    l, h = a.rotation,
                    c = this.labelMetrics(),
                    y, v = Number.MAX_VALUE,
                    p, I = this.max - this.min,
                    P = function(a) {
                        var b = a / (g || 1);
                        b = 1 < b ? Math.ceil(b) : 1;
                        b * d > I && Infinity !== a && Infinity !== g && I && (b = Math.ceil(I / d));
                        return k(b * d)
                    };
                b ? (p = !a.staggerLines && !a.step && (m(h) ? [h] : g < r(a.autoRotationLimit, 80) && a.autoRotation)) && p.forEach(function(a) {
                    if (a === h || a && -90 <= a && 90 >= a) {
                        y =
                            P(Math.abs(c.h / Math.sin(R * a)));
                        var b = y + Math.abs(a / 360);
                        b < v && (v = b, l = a, e = y)
                    }
                }) : a.step || (e = P(c.h));
                this.autoRotation = p;
                this.labelRotation = r(l, h);
                return e
            },
            getSlotWidth: function(a) {
                var b = this.chart,
                    d = this.horiz,
                    e = this.options.labels,
                    g = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    l = b.margin[3];
                return a && a.slotWidth || d && 2 > (e.step || 0) && !e.rotation && (this.staggerLines || 1) * this.len / g || !d && (e.style && parseInt(e.style.width, 10) || l && l - b.spacing[3] || .33 * b.chartWidth)
            },
            renderUnsquish: function() {
                var a =
                    this.chart,
                    b = a.renderer,
                    e = this.tickPositions,
                    g = this.ticks,
                    l = this.options.labels,
                    h = l && l.style || {},
                    c = this.horiz,
                    r = this.getSlotWidth(),
                    y = Math.max(1, Math.round(r - 2 * (l.padding || 5))),
                    v = {},
                    p = this.labelMetrics(),
                    k = l.style && l.style.textOverflow,
                    m = 0;
                d(l.rotation) || (v.rotation = l.rotation || 0);
                e.forEach(function(a) {
                    a = g[a];
                    a.movedLabel && a.replaceMovedLabel();
                    a && a.label && a.label.textPxLength > m && (m = a.label.textPxLength)
                });
                this.maxLabelLength = m;
                if (this.autoRotation) m > y && m > p.h ? v.rotation = this.labelRotation : this.labelRotation =
                    0;
                else if (r) {
                    var I = y;
                    if (!k) {
                        var f = "clip";
                        for (y = e.length; !c && y--;) {
                            var x = e[y];
                            if (x = g[x].label) x.styles && "ellipsis" === x.styles.textOverflow ? x.css({
                                textOverflow: "clip"
                            }) : x.textPxLength > r && x.css({
                                width: r + "px"
                            }), x.getBBox().height > this.len / e.length - (p.h - p.f) && (x.specificTextOverflow = "ellipsis")
                        }
                    }
                }
                v.rotation && (I = m > .5 * a.chartHeight ? .33 * a.chartHeight : m, k || (f = "ellipsis"));
                if (this.labelAlign = l.align || this.autoLabelAlign(this.labelRotation)) v.align = this.labelAlign;
                e.forEach(function(a) {
                    var b = (a = g[a]) && a.label,
                        d = h.width,
                        e = {};
                    b && (b.attr(v), a.shortenLabel ? a.shortenLabel() : I && !d && "nowrap" !== h.whiteSpace && (I < b.textPxLength || "SPAN" === b.element.tagName) ? (e.width = I, k || (e.textOverflow = b.specificTextOverflow || f), b.css(e)) : b.styles && b.styles.width && !e.width && !d && b.css({
                        width: null
                    }), delete b.specificTextOverflow, a.rotation = v.rotation)
                }, this);
                this.tickRotCorr = b.rotCorr(p.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function() {
                return this.series.some(function(a) {
                        return a.hasData()
                    }) || this.options.showEmpty && m(this.min) &&
                    m(this.max)
            },
            addTitle: function(a) {
                var d = this.chart.renderer,
                    e = this.horiz,
                    g = this.opposite,
                    l = this.options.title,
                    h, c = this.chart.styledMode;
                this.axisTitle || ((h = l.textAlign) || (h = (e ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: g ? "right" : "left",
                    middle: "center",
                    high: g ? "left" : "right"
                })[l.align]), this.axisTitle = d.text(l.text, 0, 0, l.useHTML).attr({
                    zIndex: 7,
                    rotation: l.rotation || 0,
                    align: h
                }).addClass("highcharts-axis-title"), c || this.axisTitle.css(b(l.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0);
                c || l.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len
                });
                this.axisTitle[a ? "show" : "hide"](a)
            },
            generateTick: function(a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() : b[a] = new G(this, a)
            },
            getOffset: function() {
                var a = this,
                    b = a.chart,
                    d = b.renderer,
                    e = a.options,
                    g = a.tickPositions,
                    l = a.ticks,
                    h = a.horiz,
                    c = a.side,
                    v = b.inverted && !a.isZAxis ? [1, 0, 3, 2][c] : c,
                    k, I = 0,
                    f = 0,
                    P = e.title,
                    x = e.labels,
                    L = 0,
                    w = b.axisOffset;
                b = b.clipOffset;
                var z = [-1, 1, 1, -1][c],
                    N = e.className,
                    q = a.axisParent;
                var R = a.hasData();
                a.showAxis = k = R || r(e.showEmpty, !0);
                a.staggerLines = a.horiz && x.staggerLines;
                a.axisGroup || (a.gridGroup = d.g("grid").attr({
                    zIndex: e.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (N || "")).add(q), a.axisGroup = d.g("axis").attr({
                    zIndex: e.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (N || "")).add(q), a.labelGroup = d.g("axis-labels").attr({
                    zIndex: x.zIndex || 7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (N || "")).add(q));
                R || a.isLinked ? (g.forEach(function(b, d) {
                        a.generateTick(b, d)
                    }), a.renderUnsquish(),
                    a.reserveSpaceDefault = 0 === c || 2 === c || {
                        1: "left",
                        3: "right"
                    }[c] === a.labelAlign, r(x.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && g.forEach(function(a) {
                        L = Math.max(l[a].getLabelSize(), L)
                    }), a.staggerLines && (L *= a.staggerLines), a.labelOffset = L * (a.opposite ? -1 : 1)) : y(l, function(a, b) {
                    a.destroy();
                    delete l[b]
                });
                if (P && P.text && !1 !== P.enabled && (a.addTitle(k), k && !1 !== P.reserveSpace)) {
                    a.titleOffset = I = a.axisTitle.getBBox()[h ? "height" : "width"];
                    var Q = P.offset;
                    f = m(Q) ? 0 : r(P.margin, h ? 5 : 10)
                }
                a.renderLine();
                a.offset = z * r(e.offset, w[c] ? w[c] + (e.margin || 0) : 0);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                d = 0 === c ? -a.labelMetrics().h : 2 === c ? a.tickRotCorr.y : 0;
                f = Math.abs(L) + f;
                L && (f = f - d + z * (h ? r(x.y, a.tickRotCorr.y + 8 * z) : x.x));
                a.axisTitleMargin = r(Q, f);
                a.getMaxLabelDimensions && (a.maxLabelDimensions = a.getMaxLabelDimensions(l, g));
                h = this.tickSize("tick");
                w[c] = Math.max(w[c], a.axisTitleMargin + I + z * a.offset, f, g && g.length && h ? h[0] + z * a.offset : 0);
                e = e.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[v] = Math.max(b[v], e);
                p(this, "afterGetOffset")
            },
            getLinePath: function(a) {
                var b = this.chart,
                    d = this.opposite,
                    e = this.offset,
                    g = this.horiz,
                    l = this.left + (d ? this.width : 0) + e;
                e = b.chartHeight - this.bottom - (d ? this.height : 0) + e;
                d && (a *= -1);
                return b.renderer.crispLine(["M", g ? this.left : l, g ? e : this.top, "L", g ? b.chartWidth - this.right : l, g ? e : b.chartHeight - this.bottom], a)
            },
            renderLine: function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function() {
                var a = this.horiz,
                    b = this.left,
                    d = this.top,
                    e = this.len,
                    g = this.options.title,
                    l = a ? b : d,
                    h = this.opposite,
                    c = this.offset,
                    r = g.x || 0,
                    y = g.y || 0,
                    v = this.axisTitle,
                    k = this.chart.renderer.fontMetrics(g.style && g.style.fontSize, v);
                v = Math.max(v.getBBox(null, 0).height - k.h - 1, 0);
                e = {
                    low: l + (a ? 0 : e),
                    middle: l + e / 2,
                    high: l + (a ? e : 0)
                }[g.align];
                b = (a ? d + this.height : b) + (a ? 1 : -1) * (h ? -1 : 1) * this.axisTitleMargin + [-v, v, k.f, -v][this.side];
                a = {
                    x: a ? e + r : b + (h ? this.width : 0) +
                        c + r,
                    y: a ? b + y - (h ? this.height : 0) + c : e + y
                };
                p(this, "afterGetTitlePosition", {
                    titlePosition: a
                });
                return a
            },
            renderMinorTick: function(a) {
                var b = this.chart.hasRendered && h(this.oldMin),
                    d = this.minorTicks;
                d[a] || (d[a] = new G(this, a, "minor"));
                b && d[a].isNew && d[a].render(null, !0);
                d[a].render(null, !1, 1)
            },
            renderTick: function(a, b) {
                var d = this.isLinked,
                    e = this.ticks,
                    g = this.chart.hasRendered && h(this.oldMin);
                if (!d || a >= this.min && a <= this.max) e[a] || (e[a] = new G(this, a)), g && e[a].isNew && e[a].render(b, !0, -1), e[a].render(b)
            },
            render: function() {
                var a =
                    this,
                    b = a.chart,
                    d = a.options,
                    e = a.isLog,
                    g = a.isLinked,
                    l = a.tickPositions,
                    r = a.axisTitle,
                    v = a.ticks,
                    k = a.minorTicks,
                    m = a.alternateBands,
                    I = d.stackLabels,
                    f = d.alternateGridColor,
                    x = a.tickmarkOffset,
                    L = a.axisLine,
                    w = a.showAxis,
                    z = M(b.renderer.globalAnimation),
                    N, q;
                a.labelEdge.length = 0;
                a.overlap = !1;
                [v, k, m].forEach(function(a) {
                    y(a, function(a) {
                        a.isActive = !1
                    })
                });
                if (a.hasData() || g) a.minorTickInterval && !a.categories && a.getMinorTickPositions().forEach(function(b) {
                    a.renderMinorTick(b)
                }), l.length && (l.forEach(function(b, d) {
                    a.renderTick(b,
                        d)
                }), x && (0 === a.min || a.single) && (v[-1] || (v[-1] = new G(a, -1, null, !0)), v[-1].render(-1))), f && l.forEach(function(d, g) {
                    q = "undefined" !== typeof l[g + 1] ? l[g + 1] + x : a.max - x;
                    0 === g % 2 && d < a.max && q <= a.max + (b.polar ? -x : x) && (m[d] || (m[d] = new c.PlotLineOrBand(a)), N = d + x, m[d].options = {
                        from: e ? a.lin2log(N) : N,
                        to: e ? a.lin2log(q) : q,
                        color: f
                    }, m[d].render(), m[d].isActive = !0)
                }), a._addedPlotLB || ((d.plotLines || []).concat(d.plotBands || []).forEach(function(b) {
                    a.addPlotBandOrLine(b)
                }), a._addedPlotLB = !0);
                [v, k, m].forEach(function(a) {
                    var d,
                        e = [],
                        g = z.duration;
                    y(a, function(a, b) {
                        a.isActive || (a.render(b, !1, 0), a.isActive = !1, e.push(b))
                    });
                    Q(function() {
                        for (d = e.length; d--;) a[e[d]] && !a[e[d]].isActive && (a[e[d]].destroy(), delete a[e[d]])
                    }, a !== m && b.hasRendered && g ? g : 0)
                });
                L && (L[L.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(L.strokeWidth())
                }), L.isPlaced = !0, L[w ? "show" : "hide"](w));
                r && w && (d = a.getTitlePosition(), h(d.y) ? (r[r.isNew ? "attr" : "animate"](d), r.isNew = !1) : (r.attr("y", -9999), r.isNew = !0));
                I && I.enabled && a.renderStackTotals();
                a.isDirty = !1;
                p(this,
                    "afterRender")
            },
            redraw: function() {
                this.visible && (this.render(), this.plotLinesAndBands.forEach(function(a) {
                    a.render()
                }));
                this.series.forEach(function(a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function(a) {
                var b = this,
                    d = b.stacks,
                    e = b.plotLinesAndBands,
                    g;
                p(this, "destroy", {
                    keepEvents: a
                });
                a || I(b);
                y(d, function(a, b) {
                    x(a);
                    d[b] = null
                });
                [b.ticks, b.minorTicks, b.alternateBands].forEach(function(a) {
                    x(a)
                });
                if (e)
                    for (a = e.length; a--;) e[a].destroy();
                "stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(a) {
                    b[a] &&
                        (b[a] = b[a].destroy())
                });
                for (g in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[g] = b.plotLinesAndBandsGroups[g].destroy();
                y(b, function(a, d) {
                    -1 === b.keepProps.indexOf(d) && delete b[d]
                })
            },
            drawCrosshair: function(a, b) {
                var d = this.crosshair,
                    e = r(d.snap, !0),
                    g, l = this.cross,
                    n = this.chart;
                p(this, "drawCrosshair", {
                    e: a,
                    point: b
                });
                a || (a = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (m(b) || !e)) {
                    e ? m(b) && (g = r("colorAxis" !== this.coll ? b.crosshairPos : null, this.isXAxis ? b.plotX : this.len - b.plotY)) : g = a && (this.horiz ?
                        a.chartX - this.pos : this.len - a.chartY + this.pos);
                    if (m(g)) {
                        var h = {
                            value: b && (this.isXAxis ? b.x : r(b.stackY, b.y)),
                            translatedValue: g
                        };
                        n.polar && w(h, {
                            isCrosshair: !0,
                            chartX: a && a.chartX,
                            chartY: a && a.chartY,
                            point: b
                        });
                        h = this.getPlotLinePath(h) || null
                    }
                    if (!m(h)) {
                        this.hideCrosshair();
                        return
                    }
                    e = this.categories && !this.isRadial;
                    l || (this.cross = l = n.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (e ? "category " : "thin ") + d.className).attr({
                        zIndex: r(d.zIndex, 2)
                    }).add(), n.styledMode || (l.attr({
                        stroke: d.color ||
                            (e ? A("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": r(d.width, 1)
                    }).css({
                        "pointer-events": "none"
                    }), d.dashStyle && l.attr({
                        dashstyle: d.dashStyle
                    })));
                    l.show().attr({
                        d: h
                    });
                    e && !d.width && l.attr({
                        "stroke-width": this.transA
                    });
                    this.cross.e = a
                } else this.hideCrosshair();
                p(this, "afterDrawCrosshair", {
                    e: a,
                    point: b
                })
            },
            hideCrosshair: function() {
                this.cross && this.cross.hide();
                p(this, "afterHideCrosshair")
            }
        });
        return c.Axis = f
    });
    O(u, "parts/DateTimeAxis.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c,
        f) {
        var G = f.getMagnitude,
            q = f.normalizeTickInterval,
            A = f.timeUnits;
        c = c.Axis;
        c.prototype.getTimeTicks = function() {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
        };
        c.prototype.normalizeTimeTickInterval = function(c, f) {
            var t = f || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null]
            ];
            f = t[t.length - 1];
            var F = A[f[0]],
                D = f[1],
                k;
            for (k = 0; k < t.length && !(f = t[k],
                    F = A[f[0]], D = f[1], t[k + 1] && c <= (F * D[D.length - 1] + A[t[k + 1][0]]) / 2); k++);
            F === A.year && c < 5 * F && (D = [1, 2, 5]);
            c = q(c / F, D, "year" === f[0] ? Math.max(G(c / F), 1) : 1);
            return {
                unitRange: F,
                count: c,
                unitName: f[0]
            }
        }
    });
    O(u, "parts/LogarithmicAxis.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        var G = f.getMagnitude,
            q = f.normalizeTickInterval,
            A = f.pick;
        c = c.Axis;
        c.prototype.getLogTickPositions = function(c, f, C, F) {
            var t = this.options,
                k = this.len,
                m = [];
            F || (this._minorAutoInterval = null);
            if (.5 <= c) c = Math.round(c), m = this.getLinearTickPositions(c,
                f, C);
            else if (.08 <= c) {
                k = Math.floor(f);
                var x, z;
                for (t = .3 < c ? [1, 2, 4] : .15 < c ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; k < C + 1 && !z; k++) {
                    var w = t.length;
                    for (x = 0; x < w && !z; x++) {
                        var p = this.log2lin(this.lin2log(k) * t[x]);
                        p > f && (!F || K <= C) && "undefined" !== typeof K && m.push(K);
                        K > C && (z = !0);
                        var K = p
                    }
                }
            } else f = this.lin2log(f), C = this.lin2log(C), c = F ? this.getMinorTickInterval() : t.tickInterval, c = A("auto" === c ? null : c, this._minorAutoInterval, t.tickPixelInterval / (F ? 5 : 1) * (C - f) / ((F ? k / this.tickPositions.length : k) || 1)), c = q(c, null, G(c)), m = this.getLinearTickPositions(c,
                f, C).map(this.log2lin), F || (this._minorAutoInterval = c / 5);
            F || (this.tickInterval = c);
            return m
        };
        c.prototype.log2lin = function(c) {
            return Math.log(c) / Math.LN10
        };
        c.prototype.lin2log = function(c) {
            return Math.pow(10, c)
        }
    });
    O(u, "parts/PlotLineOrBand.js", [u["parts/Globals.js"], u["parts/Axis.js"], u["parts/Utilities.js"]], function(c, f, G) {
        var q = G.arrayMax,
            A = G.arrayMin,
            t = G.defined,
            M = G.destroyObjectProperties,
            C = G.erase,
            F = G.extend,
            D = G.merge,
            k = G.objectEach,
            m = G.pick;
        c.PlotLineOrBand = function(c, k) {
            this.axis = c;
            k && (this.options =
                k, this.id = k.id)
        };
        c.PlotLineOrBand.prototype = {
            render: function() {
                c.fireEvent(this, "render");
                var f = this,
                    z = f.axis,
                    w = z.horiz,
                    p = f.options,
                    q = p.label,
                    e = f.label,
                    a = p.to,
                    g = p.from,
                    h = p.value,
                    d = t(g) && t(a),
                    b = t(h),
                    l = f.svgElem,
                    y = !l,
                    r = [],
                    v = p.color,
                    I = m(p.zIndex, 0),
                    L = p.events;
                r = {
                    "class": "highcharts-plot-" + (d ? "band " : "line ") + (p.className || "")
                };
                var Q = {},
                    N = z.chart.renderer,
                    R = d ? "bands" : "lines";
                z.isLog && (g = z.log2lin(g), a = z.log2lin(a), h = z.log2lin(h));
                z.chart.styledMode || (b ? (r.stroke = v || "#999999", r["stroke-width"] = m(p.width,
                    1), p.dashStyle && (r.dashstyle = p.dashStyle)) : d && (r.fill = v || "#e6ebf5", p.borderWidth && (r.stroke = p.borderColor, r["stroke-width"] = p.borderWidth)));
                Q.zIndex = I;
                R += "-" + I;
                (v = z.plotLinesAndBandsGroups[R]) || (z.plotLinesAndBandsGroups[R] = v = N.g("plot-" + R).attr(Q).add());
                y && (f.svgElem = l = N.path().attr(r).add(v));
                if (b) r = z.getPlotLinePath({
                    value: h,
                    lineWidth: l.strokeWidth(),
                    acrossPanes: p.acrossPanes
                });
                else if (d) r = z.getPlotBandPath(g, a, p);
                else return;
                (y || !l.d) && r && r.length ? (l.attr({
                    d: r
                }), L && k(L, function(a, b) {
                    l.on(b,
                        function(a) {
                            L[b].apply(f, [a])
                        })
                })) : l && (r ? (l.show(!0), l.animate({
                    d: r
                })) : l.d && (l.hide(), e && (f.label = e = e.destroy())));
                q && (t(q.text) || t(q.formatter)) && r && r.length && 0 < z.width && 0 < z.height && !r.isFlat ? (q = D({
                    align: w && d && "center",
                    x: w ? !d && 4 : 10,
                    verticalAlign: !w && d && "middle",
                    y: w ? d ? 16 : 10 : d ? 6 : -4,
                    rotation: w && !d && 90
                }, q), this.renderLabel(q, r, d, I)) : e && e.hide();
                return f
            },
            renderLabel: function(c, k, m, p) {
                var f = this.label,
                    e = this.axis.chart.renderer;
                f || (f = {
                    align: c.textAlign || c.align,
                    rotation: c.rotation,
                    "class": "highcharts-plot-" +
                        (m ? "band" : "line") + "-label " + (c.className || "")
                }, f.zIndex = p, p = this.getLabelText(c), this.label = f = e.text(p, 0, 0, c.useHTML).attr(f).add(), this.axis.chart.styledMode || f.css(c.style));
                e = k.xBounds || [k[1], k[4], m ? k[6] : k[1]];
                k = k.yBounds || [k[2], k[5], m ? k[7] : k[2]];
                m = A(e);
                p = A(k);
                f.align(c, !1, {
                    x: m,
                    y: p,
                    width: q(e) - m,
                    height: q(k) - p
                });
                f.show(!0)
            },
            getLabelText: function(c) {
                return t(c.formatter) ? c.formatter.call(this) : c.text
            },
            destroy: function() {
                C(this.axis.plotLinesAndBands, this);
                delete this.axis;
                M(this)
            }
        };
        F(f.prototype, {
            getPlotBandPath: function(c, k) {
                var m = this.getPlotLinePath({
                        value: k,
                        force: !0,
                        acrossPanes: this.options.acrossPanes
                    }),
                    p = this.getPlotLinePath({
                        value: c,
                        force: !0,
                        acrossPanes: this.options.acrossPanes
                    }),
                    f = [],
                    e = this.horiz,
                    a = 1;
                c = c < this.min && k < this.min || c > this.max && k > this.max;
                if (p && m) {
                    if (c) {
                        var g = p.toString() === m.toString();
                        a = 0
                    }
                    for (c = 0; c < p.length; c += 6) e && m[c + 1] === p[c + 1] ? (m[c + 1] += a, m[c + 4] += a) : e || m[c + 2] !== p[c + 2] || (m[c + 2] += a, m[c + 5] += a), f.push("M", p[c + 1], p[c + 2], "L", p[c + 4], p[c + 5], m[c + 4], m[c + 5], m[c + 1], m[c + 2], "z"),
                        f.isFlat = g
                }
                return f
            },
            addPlotBand: function(c) {
                return this.addPlotBandOrLine(c, "plotBands")
            },
            addPlotLine: function(c) {
                return this.addPlotBandOrLine(c, "plotLines")
            },
            addPlotBandOrLine: function(k, m) {
                var f = (new c.PlotLineOrBand(this, k)).render(),
                    p = this.userOptions;
                if (f) {
                    if (m) {
                        var x = p[m] || [];
                        x.push(k);
                        p[m] = x
                    }
                    this.plotLinesAndBands.push(f)
                }
                return f
            },
            removePlotBandOrLine: function(c) {
                for (var k = this.plotLinesAndBands, m = this.options, p = this.userOptions, f = k.length; f--;) k[f].id === c && k[f].destroy();
                [m.plotLines || [], p.plotLines || [], m.plotBands || [], p.plotBands || []].forEach(function(e) {
                    for (f = e.length; f--;) e[f].id === c && C(e, e[f])
                })
            },
            removePlotBand: function(c) {
                this.removePlotBandOrLine(c)
            },
            removePlotLine: function(c) {
                this.removePlotBandOrLine(c)
            }
        })
    });
    O(u, "parts/Tooltip.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        var G = f.clamp,
            q = f.css,
            A = f.defined,
            t = f.discardElement,
            M = f.extend,
            C = f.format,
            F = f.isNumber,
            D = f.isString,
            k = f.merge,
            m = f.pick,
            x = f.splat,
            z = f.syncTimeout,
            w = f.timeUnits;
        "";
        var p = c.doc,
            K = function() {
                function e(a,
                    e) {
                    this.chart = void 0;
                    this.crosshairs = [];
                    this.distance = 0;
                    this.isHidden = !0;
                    this.isSticky = !1;
                    this.now = {};
                    this.options = {};
                    this.outside = !1;
                    this.init(a, e)
                }
                e.prototype.applyFilter = function() {
                    var a = this.chart;
                    a.renderer.definition({
                        tagName: "filter",
                        id: "drop-shadow-" + a.index,
                        opacity: .5,
                        children: [{
                            tagName: "feGaussianBlur",
                            "in": "SourceAlpha",
                            stdDeviation: 1
                        }, {
                            tagName: "feOffset",
                            dx: 1,
                            dy: 1
                        }, {
                            tagName: "feComponentTransfer",
                            children: [{
                                tagName: "feFuncA",
                                type: "linear",
                                slope: .3
                            }]
                        }, {
                            tagName: "feMerge",
                            children: [{
                                tagName: "feMergeNode"
                            }, {
                                tagName: "feMergeNode",
                                "in": "SourceGraphic"
                            }]
                        }]
                    });
                    a.renderer.definition({
                        tagName: "style",
                        textContent: ".highcharts-tooltip-" + a.index + "{filter:url(#drop-shadow-" + a.index + ")}"
                    })
                };
                e.prototype.bodyFormatter = function(a) {
                    return a.map(function(a) {
                        var e = a.series.tooltipOptions;
                        return (e[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, e[(a.point.formatPrefix || "point") + "Format"] || "")
                    })
                };
                e.prototype.cleanSplit = function(a) {
                    this.chart.series.forEach(function(e) {
                        var g = e && e.tt;
                        g && (!g.isActive || a ? e.tt = g.destroy() : g.isActive = !1)
                    })
                };
                e.prototype.defaultFormatter = function(a) {
                    var e = this.points || x(this);
                    var h = [a.tooltipFooterHeaderFormatter(e[0])];
                    h = h.concat(a.bodyFormatter(e));
                    h.push(a.tooltipFooterHeaderFormatter(e[0], !0));
                    return h
                };
                e.prototype.destroy = function() {
                    this.label && (this.label = this.label.destroy());
                    this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                    this.renderer && (this.renderer = this.renderer.destroy(), t(this.container));
                    f.clearTimeout(this.hideTimer);
                    f.clearTimeout(this.tooltipTimeout)
                };
                e.prototype.getAnchor = function(a, e) {
                    var g = this.chart,
                        d = g.pointer,
                        b = g.inverted,
                        l = g.plotTop,
                        c = g.plotLeft,
                        r = 0,
                        v = 0,
                        k, p;
                    a = x(a);
                    this.followPointer && e ? ("undefined" === typeof e.chartX && (e = d.normalize(e)), a = [e.chartX - g.plotLeft, e.chartY - l]) : a[0].tooltipPos ? a = a[0].tooltipPos : (a.forEach(function(a) {
                        k = a.series.yAxis;
                        p = a.series.xAxis;
                        r += a.plotX + (!b && p ? p.left - c : 0);
                        v += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!b && k ? k.top - l : 0)
                    }), r /= a.length, v /= a.length, a = [b ? g.plotWidth - v : r,
                        this.shared && !b && 1 < a.length && e ? e.chartY - l : b ? g.plotHeight - r : v
                    ]);
                    return a.map(Math.round)
                };
                e.prototype.getDateFormat = function(a, e, h, d) {
                    var b = this.chart.time,
                        g = b.dateFormat("%m-%d %H:%M:%S.%L", e),
                        c = {
                            millisecond: 15,
                            second: 12,
                            minute: 9,
                            hour: 6,
                            day: 3
                        },
                        r = "millisecond";
                    for (v in w) {
                        if (a === w.week && +b.dateFormat("%w", e) === h && "00:00:00.000" === g.substr(6)) {
                            var v = "week";
                            break
                        }
                        if (w[v] > a) {
                            v = r;
                            break
                        }
                        if (c[v] && g.substr(c[v]) !== "01-01 00:00:00.000".substr(c[v])) break;
                        "week" !== v && (r = v)
                    }
                    if (v) var k = b.resolveDTLFormat(d[v]).main;
                    return k
                };
                e.prototype.getLabel = function() {
                    var a, e = this,
                        h = this.chart.renderer,
                        d = this.chart.styledMode,
                        b = this.options,
                        l = "tooltip" + (A(b.className) ? " " + b.className : ""),
                        y;
                    if (!this.label) {
                        this.outside && (this.container = y = c.doc.createElement("div"), y.className = "highcharts-tooltip-container", q(y, {
                            position: "absolute",
                            top: "1px",
                            pointerEvents: b.style && b.style.pointerEvents,
                            zIndex: 3
                        }), c.doc.body.appendChild(y), this.renderer = h = new c.Renderer(y, 0, 0, {}, void 0, void 0, h.styledMode));
                        this.split ? this.label = h.g(l) : (this.label =
                            h.label("", 0, 0, b.shape || "callout", null, null, b.useHTML, null, l).attr({
                                padding: b.padding,
                                r: b.borderRadius
                            }), d || this.label.attr({
                                fill: b.backgroundColor,
                                "stroke-width": b.borderWidth
                            }).css(b.style).shadow(b.shadow));
                        d && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index));
                        if (e.outside && !e.split) {
                            var r = {
                                x: this.label.xSetter,
                                y: this.label.ySetter
                            };
                            this.label.xSetter = function(a, b) {
                                r[b].call(this.label, e.distance);
                                y.style.left = a + "px"
                            };
                            this.label.ySetter = function(a, b) {
                                r[b].call(this.label,
                                    e.distance);
                                y.style.top = a + "px"
                            }
                        }
                        this.label.attr({
                            zIndex: 8,
                            pointerEvents: (null === (a = b.style) || void 0 === a ? 0 : a.pointerEvents) || b.stickOnHover ? "auto" : "none"
                        }).add()
                    }
                    return this.label
                };
                e.prototype.getPosition = function(a, e, h) {
                    var d = this.chart,
                        b = this.distance,
                        g = {},
                        c = d.inverted && h.h || 0,
                        r, v = this.outside,
                        k = v ? p.documentElement.clientWidth - 2 * b : d.chartWidth,
                        f = v ? Math.max(p.body.scrollHeight, p.documentElement.scrollHeight, p.body.offsetHeight, p.documentElement.offsetHeight, p.documentElement.clientHeight) : d.chartHeight,
                        x = d.pointer.getChartPosition(),
                        q = d.containerScaling,
                        w = function(a) {
                            return q ? a * q.scaleX : a
                        },
                        B = function(a) {
                            return q ? a * q.scaleY : a
                        },
                        n = function(g) {
                            var l = "x" === g;
                            return [g, l ? k : f, l ? a : e].concat(v ? [l ? w(a) : B(e), l ? x.left - b + w(h.plotX + d.plotLeft) : x.top - b + B(h.plotY + d.plotTop), 0, l ? k : f] : [l ? a : e, l ? h.plotX + d.plotLeft : h.plotY + d.plotTop, l ? d.plotLeft : d.plotTop, l ? d.plotLeft + d.plotWidth : d.plotTop + d.plotHeight])
                        },
                        H = n("y"),
                        J = n("x"),
                        z = !this.followPointer && m(h.ttBelow, !d.inverted === !!h.negative),
                        S = function(a, d, e, l, n, h, r) {
                            var v =
                                "y" === a ? B(b) : w(b),
                                y = (e - l) / 2,
                                k = l < n - b,
                                p = n + b + l < d,
                                m = n - v - e + y;
                            n = n + v - y;
                            if (z && p) g[a] = n;
                            else if (!z && k) g[a] = m;
                            else if (k) g[a] = Math.min(r - l, 0 > m - c ? m : m - c);
                            else if (p) g[a] = Math.max(h, n + c + e > d ? n : n + c);
                            else return !1
                        },
                        K = function(a, d, e, l, n) {
                            var h;
                            n < b || n > d - b ? h = !1 : g[a] = n < e / 2 ? 1 : n > d - l / 2 ? d - l - 2 : n - e / 2;
                            return h
                        },
                        t = function(a) {
                            var b = H;
                            H = J;
                            J = b;
                            r = a
                        },
                        E = function() {
                            !1 !== S.apply(0, H) ? !1 !== K.apply(0, J) || r || (t(!0), E()) : r ? g.x = g.y = 0 : (t(!0), E())
                        };
                    (d.inverted || 1 < this.len) && t();
                    E();
                    return g
                };
                e.prototype.getXDateFormat = function(a, e, h) {
                    e = e.dateTimeLabelFormats;
                    var d = h && h.closestPointRange;
                    return (d ? this.getDateFormat(d, a.x, h.options.startOfWeek, e) : e.day) || e.year
                };
                e.prototype.hide = function(a) {
                    var e = this;
                    f.clearTimeout(this.hideTimer);
                    a = m(a, this.options.hideDelay, 500);
                    this.isHidden || (this.hideTimer = z(function() {
                        e.getLabel()[a ? "fadeOut" : "hide"]();
                        e.isHidden = !0
                    }, a))
                };
                e.prototype.init = function(a, e) {
                    this.chart = a;
                    this.options = e;
                    this.crosshairs = [];
                    this.now = {
                        x: 0,
                        y: 0
                    };
                    this.isHidden = !0;
                    this.split = e.split && !a.inverted && !a.polar;
                    this.shared = e.shared || this.split;
                    this.outside =
                        m(e.outside, !(!a.scrollablePixelsX && !a.scrollablePixelsY))
                };
                e.prototype.move = function(a, e, h, d) {
                    var b = this,
                        g = b.now,
                        c = !1 !== b.options.animation && !b.isHidden && (1 < Math.abs(a - g.x) || 1 < Math.abs(e - g.y)),
                        r = b.followPointer || 1 < b.len;
                    M(g, {
                        x: c ? (2 * g.x + a) / 3 : a,
                        y: c ? (g.y + e) / 2 : e,
                        anchorX: r ? void 0 : c ? (2 * g.anchorX + h) / 3 : h,
                        anchorY: r ? void 0 : c ? (g.anchorY + d) / 2 : d
                    });
                    b.getLabel().attr(g);
                    c && (f.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                        b && b.move(a, e, h, d)
                    }, 32))
                };
                e.prototype.refresh = function(a, e) {
                    var g =
                        this.chart,
                        d = this.options,
                        b = a,
                        l = {},
                        y = [],
                        r = d.formatter || this.defaultFormatter;
                    l = this.shared;
                    var v = g.styledMode;
                    if (d.enabled) {
                        f.clearTimeout(this.hideTimer);
                        this.followPointer = x(b)[0].series.tooltipOptions.followPointer;
                        var k = this.getAnchor(b, e);
                        e = k[0];
                        var p = k[1];
                        !l || b.series && b.series.noSharedTooltip ? l = b.getLabelConfig() : (g.pointer.applyInactiveState(b), b.forEach(function(a) {
                            a.setState("hover");
                            y.push(a.getLabelConfig())
                        }), l = {
                            x: b[0].category,
                            y: b[0].y
                        }, l.points = y, b = b[0]);
                        this.len = y.length;
                        g = r.call(l,
                            this);
                        r = b.series;
                        this.distance = m(r.tooltipOptions.distance, 16);
                        !1 === g ? this.hide() : (this.split ? this.renderSplit(g, x(a)) : (a = this.getLabel(), d.style.width && !v || a.css({
                                width: this.chart.spacingBox.width
                            }), a.attr({
                                text: g && g.join ? g.join("") : g
                            }), a.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + m(b.colorIndex, r.colorIndex)), v || a.attr({
                                stroke: d.borderColor || b.color || r.color || "#666666"
                            }), this.updatePosition({
                                plotX: e,
                                plotY: p,
                                negative: b.negative,
                                ttBelow: b.ttBelow,
                                h: k[2] || 0
                            })), this.isHidden &&
                            this.label && this.label.attr({
                                opacity: 1
                            }).show(), this.isHidden = !1);
                        c.fireEvent(this, "refresh")
                    }
                };
                e.prototype.renderSplit = function(a, e) {
                    function g(a, b, d, e, g) {
                        void 0 === g && (g = !0);
                        d ? (b = K ? 0 : F, a = G(a - e / 2, z.left, z.right - e)) : (b -= E, a = g ? a - e - H : a + H, a = G(a, g ? a : z.left, z.right));
                        return {
                            x: a,
                            y: b
                        }
                    }
                    var d = this,
                        b = d.chart,
                        l = d.chart,
                        y = l.plotHeight,
                        r = l.plotLeft,
                        v = l.plotTop,
                        k = l.pointer,
                        p = l.renderer,
                        f = l.scrollablePixelsY,
                        x = void 0 === f ? 0 : f;
                    f = l.scrollingContainer;
                    f = void 0 === f ? {
                        scrollLeft: 0,
                        scrollTop: 0
                    } : f;
                    var q = f.scrollLeft,
                        B = f.scrollTop,
                        n = l.styledMode,
                        H = d.distance,
                        J = d.options,
                        w = d.options.positioner,
                        z = {
                            left: q,
                            right: q + l.chartWidth,
                            top: B,
                            bottom: B + l.chartHeight
                        },
                        t = d.getLabel(),
                        K = !(!b.xAxis[0] || !b.xAxis[0].opposite),
                        E = v + B,
                        A = 0,
                        F = y - x;
                    D(a) && (a = [!1, a]);
                    a = a.slice(0, e.length + 1).reduce(function(a, b, l) {
                        if (!1 !== b && "" !== b) {
                            l = e[l - 1] || {
                                isHeader: !0,
                                plotX: e[0].plotX,
                                plotY: y,
                                series: {}
                            };
                            var h = l.isHeader,
                                c = h ? d : l.series,
                                k = c.tt,
                                f = l.isHeader;
                            var I = l.series;
                            var P = "highcharts-color-" + m(l.colorIndex, I.colorIndex, "none");
                            k || (k = {
                                    padding: J.padding,
                                    r: J.borderRadius
                                },
                                n || (k.fill = J.backgroundColor, k["stroke-width"] = J.borderWidth), k = p.label("", 0, 0, J[f ? "headerShape" : "shape"] || "callout", void 0, void 0, J.useHTML).addClass((f ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + P).attr(k).add(t));
                            k.isActive = !0;
                            k.attr({
                                text: b
                            });
                            n || k.css(J.style).shadow(J.shadow).attr({
                                stroke: J.borderColor || l.color || I.color || "#333333"
                            });
                            b = c.tt = k;
                            f = b.getBBox();
                            c = f.width + b.strokeWidth();
                            h && (A = f.height, F += A, K && (E -= A));
                            I = l.plotX;
                            I = void 0 === I ? 0 : I;
                            P = l.plotY;
                            P = void 0 === P ? 0 : P;
                            var L = l.series;
                            if (l.isHeader) {
                                I = r + I;
                                var q = v + y / 2
                            } else k = L.xAxis, L = L.yAxis, I = k.pos + G(I, -H, k.len + H), L.pos + P >= B + v && L.pos + P <= B + v + y - x && (q = L.pos + P);
                            I = G(I, z.left - H, z.right + H);
                            "number" === typeof q ? (f = f.height + 1, P = w ? w.call(d, c, f, l) : g(I, q, h, c), a.push({
                                align: w ? 0 : void 0,
                                anchorX: I,
                                anchorY: q,
                                boxWidth: c,
                                point: l,
                                rank: m(P.rank, h ? 1 : 0),
                                size: f,
                                target: P.y,
                                tt: b,
                                x: P.x
                            })) : b.isActive = !1
                        }
                        return a
                    }, []);
                    !w && a.some(function(a) {
                        return a.x < z.left
                    }) && (a = a.map(function(a) {
                        var b = g(a.anchorX, a.anchorY, a.point.isHeader, a.boxWidth, !1);
                        return M(a, {
                            target: b.y,
                            x: b.x
                        })
                    }));
                    d.cleanSplit();
                    c.distribute(a, F);
                    a.forEach(function(a) {
                        var b = a.pos;
                        a.tt.attr({
                            visibility: "undefined" === typeof b ? "hidden" : "inherit",
                            x: a.x,
                            y: b + E,
                            anchorX: a.anchorX,
                            anchorY: a.anchorY
                        })
                    });
                    a = d.container;
                    b = d.renderer;
                    d.outside && a && b && (l = t.getBBox(), b.setSize(l.width + l.x, l.height + l.y, !1), k = k.getChartPosition(), a.style.left = k.left + "px", a.style.top = k.top + "px")
                };
                e.prototype.styledModeFormat = function(a) {
                    return a.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g,
                        'class="highcharts-color-{$1.colorIndex}"')
                };
                e.prototype.tooltipFooterHeaderFormatter = function(a, e) {
                    var g = e ? "footer" : "header",
                        d = a.series,
                        b = d.tooltipOptions,
                        l = b.xDateFormat,
                        y = d.xAxis,
                        r = y && "datetime" === y.options.type && F(a.key),
                        v = b[g + "Format"];
                    e = {
                        isFooter: e,
                        labelConfig: a
                    };
                    c.fireEvent(this, "headerFormatter", e, function(e) {
                        r && !l && (l = this.getXDateFormat(a, b, y));
                        r && l && (a.point && a.point.tooltipDateKeys || ["key"]).forEach(function(a) {
                            v = v.replace("{point." + a + "}", "{point." + a + ":" + l + "}")
                        });
                        d.chart.styledMode && (v =
                            this.styledModeFormat(v));
                        e.text = C(v, {
                            point: a,
                            series: d
                        }, this.chart)
                    });
                    return e.text
                };
                e.prototype.update = function(a) {
                    this.destroy();
                    k(!0, this.chart.options.tooltip.userOptions, a);
                    this.init(this.chart, k(!0, this.options, a))
                };
                e.prototype.updatePosition = function(a) {
                    var e = this.chart,
                        c = e.pointer,
                        d = this.getLabel(),
                        b = a.plotX + e.plotLeft,
                        l = a.plotY + e.plotTop;
                    c = c.getChartPosition();
                    a = (this.options.positioner || this.getPosition).call(this, d.width, d.height, a);
                    if (this.outside) {
                        var y = (this.options.borderWidth || 0) +
                            2 * this.distance;
                        this.renderer.setSize(d.width + y, d.height + y, !1);
                        if (e = e.containerScaling) q(this.container, {
                            transform: "scale(" + e.scaleX + ", " + e.scaleY + ")"
                        }), b *= e.scaleX, l *= e.scaleY;
                        b += c.left - a.x;
                        l += c.top - a.y
                    }
                    this.move(Math.round(a.x), Math.round(a.y || 0), b, l)
                };
                return e
            }();
        c.Tooltip = K;
        return c.Tooltip
    });
    O(u, "parts/Pointer.js", [u["parts/Globals.js"], u["parts/Utilities.js"], u["parts/Tooltip.js"], u["parts/Color.js"]], function(c, f, G, q) {
        var A = f.addEvent,
            t = f.attr,
            M = f.css,
            C = f.defined,
            F = f.extend,
            D = f.find,
            k = f.fireEvent,
            m = f.isNumber,
            x = f.isObject,
            z = f.objectEach,
            w = f.offset,
            p = f.pick,
            K = f.splat,
            e = q.parse,
            a = c.charts,
            g = c.noop;
        f = function() {
            function h(a, b) {
                this.lastValidTouch = {};
                this.pinchDown = [];
                this.runChartClick = !1;
                this.chart = a;
                this.hasDragged = !1;
                this.options = b;
                this.unbindContainerMouseLeave = function() {};
                this.init(a, b)
            }
            h.prototype.applyInactiveState = function(a) {
                var b = [],
                    d;
                (a || []).forEach(function(a) {
                    d = a.series;
                    b.push(d);
                    d.linkedParent && b.push(d.linkedParent);
                    d.linkedSeries && (b = b.concat(d.linkedSeries));
                    d.navigatorSeries &&
                        b.push(d.navigatorSeries)
                });
                this.chart.series.forEach(function(a) {
                    -1 === b.indexOf(a) ? a.setState("inactive", !0) : a.options.inactiveOtherPoints && a.setAllPointsToState("inactive")
                })
            };
            h.prototype.destroy = function() {
                var a = this;
                "undefined" !== typeof a.unDocMouseMove && a.unDocMouseMove();
                this.unbindContainerMouseLeave();
                c.chartCount || (c.unbindDocumentMouseUp && (c.unbindDocumentMouseUp = c.unbindDocumentMouseUp()), c.unbindDocumentTouchEnd && (c.unbindDocumentTouchEnd = c.unbindDocumentTouchEnd()));
                clearInterval(a.tooltipTimeout);
                z(a, function(b, d) {
                    a[d] = null
                })
            };
            h.prototype.drag = function(a) {
                var b = this.chart,
                    d = b.options.chart,
                    g = a.chartX,
                    c = a.chartY,
                    h = this.zoomHor,
                    k = this.zoomVert,
                    p = b.plotLeft,
                    m = b.plotTop,
                    f = b.plotWidth,
                    q = b.plotHeight,
                    B = this.selectionMarker,
                    n = this.mouseDownX || 0,
                    H = this.mouseDownY || 0,
                    J = x(d.panning) ? d.panning && d.panning.enabled : d.panning,
                    w = d.panKey && a[d.panKey + "Key"];
                if (!B || !B.touch)
                    if (g < p ? g = p : g > p + f && (g = p + f), c < m ? c = m : c > m + q && (c = m + q), this.hasDragged = Math.sqrt(Math.pow(n - g, 2) + Math.pow(H - c, 2)), 10 < this.hasDragged) {
                        var z =
                            b.isInsidePlot(n - p, H - m);
                        b.hasCartesianSeries && (this.zoomX || this.zoomY) && z && !w && !B && (this.selectionMarker = B = b.renderer.rect(p, m, h ? 1 : f, k ? 1 : q, 0).attr({
                            "class": "highcharts-selection-marker",
                            zIndex: 7
                        }).add(), b.styledMode || B.attr({
                            fill: d.selectionMarkerFill || e("#335cad").setOpacity(.25).get()
                        }));
                        B && h && (g -= n, B.attr({
                            width: Math.abs(g),
                            x: (0 < g ? 0 : g) + n
                        }));
                        B && k && (g = c - H, B.attr({
                            height: Math.abs(g),
                            y: (0 < g ? 0 : g) + H
                        }));
                        z && !B && J && b.pan(a, d.panning)
                    }
            };
            h.prototype.dragStart = function(a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            };
            h.prototype.drop = function(a) {
                var b = this,
                    d = this.chart,
                    e = this.hasPinched;
                if (this.selectionMarker) {
                    var g = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        c = this.selectionMarker,
                        h = c.attr ? c.attr("x") : c.x,
                        p = c.attr ? c.attr("y") : c.y,
                        f = c.attr ? c.attr("width") : c.width,
                        x = c.attr ? c.attr("height") : c.height,
                        q;
                    if (this.hasDragged || e) d.axes.forEach(function(d) {
                        if (d.zoomEnabled && C(d.min) && (e || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            }[d.coll]])) {
                            var l =
                                d.horiz,
                                c = "touchend" === a.type ? d.minPixelPadding : 0,
                                r = d.toValue((l ? h : p) + c);
                            l = d.toValue((l ? h + f : p + x) - c);
                            g[d.coll].push({
                                axis: d,
                                min: Math.min(r, l),
                                max: Math.max(r, l)
                            });
                            q = !0
                        }
                    }), q && k(d, "selection", g, function(a) {
                        d.zoom(F(a, e ? {
                            animation: !1
                        } : null))
                    });
                    m(d.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    e && this.scaleGroups()
                }
                d && m(d.index) && (M(d.container, {
                    cursor: d._cursor
                }), d.cancelClick = 10 < this.hasDragged, d.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            };
            h.prototype.findNearestKDPoint =
                function(a, b, e) {
                    var d;
                    if (this.isStickyTooltip(e)) return this.chart.hoverPoint;
                    a.forEach(function(a) {
                        var g = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
                        a = a.searchPoint(e, g);
                        if ((g = x(a, !0)) && !(g = !x(d, !0))) {
                            g = d.distX - a.distX;
                            var l = d.dist - a.dist,
                                c = (a.series.group && a.series.group.zIndex) - (d.series.group && d.series.group.zIndex);
                            g = 0 < (0 !== g && b ? g : 0 !== l ? l : 0 !== c ? c : d.series.index > a.series.index ? -1 : 1)
                        }
                        g && (d = a)
                    });
                    return d
                };
            h.prototype.getChartCoordinatesFromPoint = function(a, b) {
                var d = a.series,
                    e = d.xAxis;
                d = d.yAxis;
                var g = p(a.clientX, a.plotX),
                    c = a.shapeArgs;
                if (e && d) return b ? {
                    chartX: e.len + e.pos - g,
                    chartY: d.len + d.pos - a.plotY
                } : {
                    chartX: g + e.pos,
                    chartY: a.plotY + d.pos
                };
                if (c && c.x && c.y) return {
                    chartX: c.x,
                    chartY: c.y
                }
            };
            h.prototype.getChartPosition = function() {
                return this.chartPosition || (this.chartPosition = w(this.chart.container))
            };
            h.prototype.getCoordinates = function(a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                this.chart.axes.forEach(function(d) {
                    b[d.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: d,
                        value: d.toValue(a[d.horiz ? "chartX" :
                            "chartY"])
                    })
                });
                return b
            };
            h.prototype.getHoverData = function(a, b, e, g, c, h) {
                var d, l = [];
                g = !(!g || !a);
                var r = b && !b.stickyTracking,
                    v = {
                        chartX: h ? h.chartX : void 0,
                        chartY: h ? h.chartY : void 0,
                        shared: c
                    };
                k(this, "beforeGetHoverData", v);
                r = r ? [b] : e.filter(function(a) {
                    return v.filter ? v.filter(a) : a.visible && !(!c && a.directTouch) && p(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                b = (d = g || !h ? a : this.findNearestKDPoint(r, c, h)) && d.series;
                d && (c && !b.noSharedTooltip ? (r = e.filter(function(a) {
                    return v.filter ? v.filter(a) : a.visible &&
                        !(!c && a.directTouch) && p(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }), r.forEach(function(a) {
                    var b = D(a.points, function(a) {
                        return a.x === d.x && !a.isNull
                    });
                    x(b) && (a.chart.isBoosting && (b = a.getPoint(b)), l.push(b))
                })) : l.push(d));
                v = {
                    hoverPoint: d
                };
                k(this, "afterGetHoverData", v);
                return {
                    hoverPoint: v.hoverPoint,
                    hoverSeries: b,
                    hoverPoints: l
                }
            };
            h.prototype.getPointFromEvent = function(a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            };
            h.prototype.onTrackerMouseOut = function(a) {
                var b = this.chart.hoverSeries,
                    d = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !d || b.stickyTracking || this.isStickyTooltip(a) || this.inClass(d, "highcharts-tooltip") || this.inClass(d, "highcharts-series-" + b.index) && this.inClass(d, "highcharts-tracker"))) b.onMouseOut()
            };
            h.prototype.inClass = function(a, b) {
                for (var d; a;) {
                    if (d = t(a, "class")) {
                        if (-1 !== d.indexOf(b)) return !0;
                        if (-1 !== d.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            };
            h.prototype.init = function(a, b) {
                this.options = b;
                this.chart = a;
                this.runChartClick = b.chart.events &&
                    !!b.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                G && (a.tooltip = new G(a, b.tooltip), this.followTouchMove = p(b.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            };
            h.prototype.isStickyTooltip = function(a) {
                var b = this.chart,
                    d = this.chartPosition,
                    e = b.hoverPoint,
                    g = b.tooltip;
                b = a.chartX;
                a = a.chartY;
                var h = !1;
                if (d && e && e.graphic && g && !g.isHidden && g.options.stickOnHover && g.label) {
                    h = g.label.getBBox();
                    var k = c.offset(g.label.element);
                    g = e.graphic.getBBox();
                    e = c.offset(e.graphic.element);
                    h.x = k.left - d.left;
                    h.y =
                        k.top - d.top;
                    g.x = e.left - d.left;
                    g.y = e.top - d.top;
                    d = Math.min(g.y, h.y);
                    e = Math.max(g.x + g.width, h.x + h.width);
                    k = Math.max(g.y + g.height, h.y + h.height);
                    h = b >= Math.min(g.x, h.x) && b <= e && a >= d && a <= k
                }
                return h
            };
            h.prototype.normalize = function(a, b) {
                var d = a.touches,
                    e = d ? d.length ? d.item(0) : d.changedTouches[0] : a;
                b || (b = this.getChartPosition());
                d = e.pageX - b.left;
                b = e.pageY - b.top;
                if (e = this.chart.containerScaling) d /= e.scaleX, b /= e.scaleY;
                return F(a, {
                    chartX: Math.round(d),
                    chartY: Math.round(b)
                })
            };
            h.prototype.onContainerClick = function(a) {
                var b =
                    this.chart,
                    d = b.hoverPoint,
                    e = b.plotLeft,
                    g = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (d && this.inClass(a.target, "highcharts-tracker") ? (k(d.series, "click", F(a, {
                    point: d
                })), b.hoverPoint && d.firePointEvent("click", a)) : (F(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - e, a.chartY - g) && k(b, "click", a)))
            };
            h.prototype.onContainerMouseDown = function(a) {
                a = this.normalize(a);
                2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            };
            h.prototype.onContainerMouseLeave = function(d) {
                var b =
                    a[c.hoverChartIndex];
                b && (d.relatedTarget || d.toElement) && (b.pointer.reset(), b.pointer.chartPosition = void 0)
            };
            h.prototype.onContainerMouseMove = function(d) {
                var b = this.chart;
                C(c.hoverChartIndex) && a[c.hoverChartIndex] && a[c.hoverChartIndex].mouseIsDown || (c.hoverChartIndex = b.index);
                d = this.normalize(d);
                d.preventDefault || (d.returnValue = !1);
                "mousedown" === b.mouseIsDown && this.drag(d);
                b.openMenu || this.isStickyTooltip(d) || !this.inClass(d.target, "highcharts-tracker") && !b.isInsidePlot(d.chartX - b.plotLeft, d.chartY -
                    b.plotTop) || this.runPointActions(d)
            };
            h.prototype.onDocumentTouchEnd = function(d) {
                a[c.hoverChartIndex] && a[c.hoverChartIndex].pointer.drop(d)
            };
            h.prototype.onContainerTouchMove = function(a) {
                this.touch(a)
            };
            h.prototype.onContainerTouchStart = function(a) {
                this.zoomOption(a);
                this.touch(a, !0)
            };
            h.prototype.onDocumentMouseMove = function(a) {
                var b = this.chart,
                    d = this.chartPosition;
                a = this.normalize(a, d);
                !d || this.isStickyTooltip(a) || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY -
                    b.plotTop) || this.reset()
            };
            h.prototype.onDocumentMouseUp = function(d) {
                a[c.hoverChartIndex] && a[c.hoverChartIndex].pointer.drop(d)
            };
            h.prototype.pinch = function(a) {
                var b = this,
                    d = b.chart,
                    e = b.pinchDown,
                    c = a.touches || [],
                    h = c.length,
                    k = b.lastValidTouch,
                    m = b.hasZoom,
                    f = b.selectionMarker,
                    x = {},
                    q = 1 === h && (b.inClass(a.target, "highcharts-tracker") && d.runTrackerClick || b.runChartClick),
                    B = {};
                1 < h && (b.initiated = !0);
                m && b.initiated && !q && a.preventDefault();
                [].map.call(c, function(a) {
                    return b.normalize(a)
                });
                "touchstart" === a.type ?
                    ([].forEach.call(c, function(a, b) {
                        e[b] = {
                            chartX: a.chartX,
                            chartY: a.chartY
                        }
                    }), k.x = [e[0].chartX, e[1] && e[1].chartX], k.y = [e[0].chartY, e[1] && e[1].chartY], d.axes.forEach(function(a) {
                        if (a.zoomEnabled) {
                            var b = d.bounds[a.horiz ? "h" : "v"],
                                e = a.minPixelPadding,
                                g = a.toPixels(Math.min(p(a.options.min, a.dataMin), a.dataMin)),
                                l = a.toPixels(Math.max(p(a.options.max, a.dataMax), a.dataMax)),
                                n = Math.max(g, l);
                            b.min = Math.min(a.pos, Math.min(g, l) - e);
                            b.max = Math.max(a.pos + a.len, n + e)
                        }
                    }), b.res = !0) : b.followTouchMove && 1 === h ? this.runPointActions(b.normalize(a)) :
                    e.length && (f || (b.selectionMarker = f = F({
                        destroy: g,
                        touch: !0
                    }, d.plotBox)), b.pinchTranslate(e, c, x, f, B, k), b.hasPinched = m, b.scaleGroups(x, B), b.res && (b.res = !1, this.reset(!1, 0)))
            };
            h.prototype.pinchTranslate = function(a, b, e, g, c, h) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, b, e, g, c, h);
                this.zoomVert && this.pinchTranslateDirection(!1, a, b, e, g, c, h)
            };
            h.prototype.pinchTranslateDirection = function(a, b, e, g, c, h, k, p) {
                var d = this.chart,
                    l = a ? "x" : "y",
                    r = a ? "X" : "Y",
                    v = "chart" + r,
                    n = a ? "width" : "height",
                    y = d["plot" + (a ? "Left" : "Top")],
                    m, f, I = p || 1,
                    x = d.inverted,
                    q = d.bounds[a ? "h" : "v"],
                    L = 1 === b.length,
                    w = b[0][v],
                    z = e[0][v],
                    t = !L && b[1][v],
                    P = !L && e[1][v];
                e = function() {
                    "number" === typeof P && 20 < Math.abs(w - t) && (I = p || Math.abs(z - P) / Math.abs(w - t));
                    f = (y - z) / I + w;
                    m = d["plot" + (a ? "Width" : "Height")] / I
                };
                e();
                b = f;
                if (b < q.min) {
                    b = q.min;
                    var K = !0
                } else b + m > q.max && (b = q.max - m, K = !0);
                K ? (z -= .8 * (z - k[l][0]), "number" === typeof P && (P -= .8 * (P - k[l][1])), e()) : k[l] = [z, P];
                x || (h[l] = f - y, h[n] = m);
                h = x ? 1 / I : I;
                c[n] = m;
                c[l] = b;
                g[x ? a ? "scaleY" : "scaleX" : "scale" + r] = I;
                g["translate" + r] = h * y + (z - h * w)
            };
            h.prototype.reset = function(a, b) {
                var d = this.chart,
                    e = d.hoverSeries,
                    g = d.hoverPoint,
                    c = d.hoverPoints,
                    h = d.tooltip,
                    k = h && h.shared ? c : g;
                a && k && K(k).forEach(function(b) {
                    b.series.isCartesian && "undefined" === typeof b.plotX && (a = !1)
                });
                if (a) h && k && K(k).length && (h.refresh(k), h.shared && c ? c.forEach(function(a) {
                    a.setState(a.state, !0);
                    a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a))
                }) : g && (g.setState(g.state, !0), d.axes.forEach(function(a) {
                    a.crosshair &&
                        g.series[a.coll] === a && a.drawCrosshair(null, g)
                })));
                else {
                    if (g) g.onMouseOut();
                    c && c.forEach(function(a) {
                        a.setState()
                    });
                    if (e) e.onMouseOut();
                    h && h.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    d.axes.forEach(function(a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = d.hoverPoints = d.hoverPoint = null
                }
            };
            h.prototype.runPointActions = function(d, b) {
                var e = this.chart,
                    g = e.tooltip && e.tooltip.options.enabled ? e.tooltip : void 0,
                    h = g ? g.shared : !1,
                    k = b || e.hoverPoint,
                    m = k && k.series || e.hoverSeries;
                m = this.getHoverData(k,
                    m, e.series, (!d || "touchmove" !== d.type) && (!!b || m && m.directTouch && this.isDirectTouch), h, d);
                k = m.hoverPoint;
                var f = m.hoverPoints;
                b = (m = m.hoverSeries) && m.tooltipOptions.followPointer;
                h = h && m && !m.noSharedTooltip;
                if (k && (k !== e.hoverPoint || g && g.isHidden)) {
                    (e.hoverPoints || []).forEach(function(a) {
                        -1 === f.indexOf(a) && a.setState()
                    });
                    if (e.hoverSeries !== m) m.onMouseOver();
                    this.applyInactiveState(f);
                    (f || []).forEach(function(a) {
                        a.setState("hover")
                    });
                    e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut");
                    if (!k.series) return;
                    k.firePointEvent("mouseOver");
                    e.hoverPoints = f;
                    e.hoverPoint = k;
                    g && g.refresh(h ? f : k, d)
                } else b && g && !g.isHidden && (k = g.getAnchor([{}], d), g.updatePosition({
                    plotX: k[0],
                    plotY: k[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = A(e.container.ownerDocument, "mousemove", function(b) {
                    var d = a[c.hoverChartIndex];
                    if (d) d.pointer.onDocumentMouseMove(b)
                }));
                e.axes.forEach(function(a) {
                    var b = p(a.crosshair.snap, !0),
                        e = b ? D(f, function(b) {
                            return b.series[a.coll] === a
                        }) : void 0;
                    e || !b ? a.drawCrosshair(d, e) : a.hideCrosshair()
                })
            };
            h.prototype.scaleGroups =
                function(a, b) {
                    var d = this.chart,
                        e;
                    d.series.forEach(function(g) {
                        e = a || g.getPlotBox();
                        g.xAxis && g.xAxis.zoomEnabled && g.group && (g.group.attr(e), g.markerGroup && (g.markerGroup.attr(e), g.markerGroup.clip(b ? d.clipRect : null)), g.dataLabelsGroup && g.dataLabelsGroup.attr(e))
                    });
                    d.clipRect.attr(b || d.clipBox)
                };
            h.prototype.setDOMEvents = function() {
                var a = this,
                    b = a.chart.container,
                    e = b.ownerDocument;
                b.onmousedown = function(b) {
                    a.onContainerMouseDown(b)
                };
                b.onmousemove = function(b) {
                    a.onContainerMouseMove(b)
                };
                b.onclick = function(b) {
                    a.onContainerClick(b)
                };
                this.unbindContainerMouseLeave = A(b, "mouseleave", a.onContainerMouseLeave);
                c.unbindDocumentMouseUp || (c.unbindDocumentMouseUp = A(e, "mouseup", a.onDocumentMouseUp));
                c.hasTouch && (A(b, "touchstart", function(b) {
                    a.onContainerTouchStart(b)
                }), A(b, "touchmove", function(b) {
                    a.onContainerTouchMove(b)
                }), c.unbindDocumentTouchEnd || (c.unbindDocumentTouchEnd = A(e, "touchend", a.onDocumentTouchEnd)))
            };
            h.prototype.touch = function(a, b) {
                var d = this.chart,
                    e;
                if (d.index !== c.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                c.hoverChartIndex = d.index;
                if (1 === a.touches.length)
                    if (a = this.normalize(a), (e = d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop)) && !d.openMenu) {
                        b && this.runPointActions(a);
                        if ("touchmove" === a.type) {
                            b = this.pinchDown;
                            var g = b[0] ? 4 <= Math.sqrt(Math.pow(b[0].chartX - a.chartX, 2) + Math.pow(b[0].chartY - a.chartY, 2)) : !1
                        }
                        p(g, !0) && this.pinch(a)
                    } else b && this.reset();
                else 2 === a.touches.length && this.pinch(a)
            };
            h.prototype.zoomOption = function(a) {
                var b = this.chart,
                    d = b.options.chart,
                    e = d.zoomType || "";
                b = b.inverted;
                /touch/.test(a.type) &&
                    (e = p(d.pinchType, e));
                this.zoomX = a = /x/.test(e);
                this.zoomY = e = /y/.test(e);
                this.zoomHor = a && !b || e && b;
                this.zoomVert = e && !b || a && b;
                this.hasZoom = a || e
            };
            return h
        }();
        c.Pointer = f;
        return c.Pointer
    });
    O(u, "parts/MSPointer.js", [u["parts/Globals.js"], u["parts/Pointer.js"], u["parts/Utilities.js"]], function(c, f, G) {
        function q() {
            var c = [];
            c.item = function(c) {
                return this[c]
            };
            F(z, function(k) {
                c.push({
                    pageX: k.pageX,
                    pageY: k.pageY,
                    target: k.target
                })
            });
            return c
        }

        function A(p, m, e, a) {
            "touch" !== p.pointerType && p.pointerType !== p.MSPOINTER_TYPE_TOUCH ||
                !k[c.hoverChartIndex] || (a(p), a = k[c.hoverChartIndex].pointer, a[m]({
                    type: e,
                    target: p.currentTarget,
                    preventDefault: x,
                    touches: q()
                }))
        }
        var t = this && this.__extends || function() {
                var c = function(k, e) {
                    c = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(a, e) {
                        a.__proto__ = e
                    } || function(a, e) {
                        for (var g in e) e.hasOwnProperty(g) && (a[g] = e[g])
                    };
                    return c(k, e)
                };
                return function(k, e) {
                    function a() {
                        this.constructor = k
                    }
                    c(k, e);
                    k.prototype = null === e ? Object.create(e) : (a.prototype = e.prototype, new a)
                }
            }(),
            M = G.addEvent,
            C =
            G.css,
            F = G.objectEach,
            D = G.removeEvent,
            k = c.charts,
            m = c.doc,
            x = c.noop,
            z = {},
            w = !!c.win.PointerEvent;
        return function(c) {
            function k() {
                return null !== c && c.apply(this, arguments) || this
            }
            t(k, c);
            k.prototype.batchMSEvents = function(e) {
                e(this.chart.container, w ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                e(this.chart.container, w ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                e(m, w ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
            };
            k.prototype.destroy = function() {
                this.batchMSEvents(D);
                c.prototype.destroy.call(this)
            };
            k.prototype.init = function(e, a) {
                c.prototype.init.call(this, e, a);
                this.hasZoom && C(e.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            };
            k.prototype.onContainerPointerDown = function(e) {
                A(e, "onContainerTouchStart", "touchstart", function(a) {
                    z[a.pointerId] = {
                        pageX: a.pageX,
                        pageY: a.pageY,
                        target: a.currentTarget
                    }
                })
            };
            k.prototype.onContainerPointerMove = function(e) {
                A(e, "onContainerTouchMove", "touchmove", function(a) {
                    z[a.pointerId] = {
                        pageX: a.pageX,
                        pageY: a.pageY
                    };
                    z[a.pointerId].target || (z[a.pointerId].target =
                        a.currentTarget)
                })
            };
            k.prototype.onDocumentPointerUp = function(e) {
                A(e, "onDocumentTouchEnd", "touchend", function(a) {
                    delete z[a.pointerId]
                })
            };
            k.prototype.setDOMEvents = function() {
                c.prototype.setDOMEvents.call(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(M)
            };
            return k
        }(f)
    });
    O(u, "parts/Legend.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        var G = f.addEvent,
            q = f.css,
            A = f.defined,
            t = f.discardElement,
            M = f.find,
            C = f.fireEvent,
            F = f.format,
            D = f.isNumber,
            k = f.merge,
            m = f.pick,
            x = f.relativeLength,
            z = f.setAnimation,
            w = f.stableSort,
            p = f.syncTimeout;
        f = f.wrap;
        var K = c.isFirefox,
            e = c.marginNames,
            a = c.win,
            g = function() {
                function a(a, b) {
                    this.allItems = [];
                    this.contentGroup = this.box = void 0;
                    this.display = !1;
                    this.group = void 0;
                    this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
                    this.options = {};
                    this.padding = 0;
                    this.pages = [];
                    this.proximate = !1;
                    this.scrollGroup =
                        void 0;
                    this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
                    this.chart = a;
                    this.init(a, b)
                }
                a.prototype.init = function(a, b) {
                    this.chart = a;
                    this.setOptions(b);
                    b.enabled && (this.render(), G(this.chart, "endResize", function() {
                        this.legend.positionCheckboxes()
                    }), this.proximate ? this.unchartrender = G(this.chart, "render", function() {
                        this.legend.proximatePositions();
                        this.legend.positionItems()
                    }) : this.unchartrender && this.unchartrender())
                };
                a.prototype.setOptions = function(a) {
                    var b = m(a.padding,
                        8);
                    this.options = a;
                    this.chart.styledMode || (this.itemStyle = a.itemStyle, this.itemHiddenStyle = k(this.itemStyle, a.itemHiddenStyle));
                    this.itemMarginTop = a.itemMarginTop || 0;
                    this.itemMarginBottom = a.itemMarginBottom || 0;
                    this.padding = b;
                    this.initialItemY = b - 5;
                    this.symbolWidth = m(a.symbolWidth, 16);
                    this.pages = [];
                    this.proximate = "proximate" === a.layout && !this.chart.inverted;
                    this.baseline = void 0
                };
                a.prototype.update = function(a, b) {
                    var d = this.chart;
                    this.setOptions(k(!0, this.options, a));
                    this.destroy();
                    d.isDirtyLegend = d.isDirtyBox = !0;
                    m(b, !0) && d.redraw();
                    C(this, "afterUpdate")
                };
                a.prototype.colorizeItem = function(a, b) {
                    a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                    if (!this.chart.styledMode) {
                        var d = this.options,
                            e = a.legendItem,
                            g = a.legendLine,
                            c = a.legendSymbol,
                            h = this.itemHiddenStyle.color;
                        d = b ? d.itemStyle.color : h;
                        var k = b ? a.color || h : h,
                            p = a.options && a.options.marker,
                            m = {
                                fill: k
                            };
                        e && e.css({
                            fill: d,
                            color: d
                        });
                        g && g.attr({
                            stroke: k
                        });
                        c && (p && c.isMarker && (m = a.pointAttribs(), b || (m.stroke = m.fill = h)), c.attr(m))
                    }
                    C(this, "afterColorizeItem", {
                        item: a,
                        visible: b
                    })
                };
                a.prototype.positionItems = function() {
                    this.allItems.forEach(this.positionItem, this);
                    this.chart.isResizing || this.positionCheckboxes()
                };
                a.prototype.positionItem = function(a) {
                    var b = this.options,
                        d = b.symbolPadding;
                    b = !b.rtl;
                    var e = a._legendItemPos,
                        g = e[0];
                    e = e[1];
                    var c = a.checkbox;
                    if ((a = a.legendGroup) && a.element) a[A(a.translateY) ? "animate" : "attr"]({
                        translateX: b ? g : this.legendWidth - g - 2 * d - 4,
                        translateY: e
                    });
                    c && (c.x = g, c.y = e)
                };
                a.prototype.destroyItem = function(a) {
                    var b = a.checkbox;
                    ["legendItem", "legendLine",
                        "legendSymbol", "legendGroup"
                    ].forEach(function(b) {
                        a[b] && (a[b] = a[b].destroy())
                    });
                    b && t(a.checkbox)
                };
                a.prototype.destroy = function() {
                    function a(a) {
                        this[a] && (this[a] = this[a].destroy())
                    }
                    this.getAllItems().forEach(function(b) {
                        ["legendItem", "legendGroup"].forEach(a, b)
                    });
                    "clipRect up down pager nav box title group".split(" ").forEach(a, this);
                    this.display = null
                };
                a.prototype.positionCheckboxes = function() {
                    var a = this.group && this.group.alignAttr,
                        b = this.clipHeight || this.legendHeight,
                        e = this.titleHeight;
                    if (a) {
                        var g =
                            a.translateY;
                        this.allItems.forEach(function(d) {
                            var c = d.checkbox;
                            if (c) {
                                var h = g + e + c.y + (this.scrollOffset || 0) + 3;
                                q(c, {
                                    left: a.translateX + d.checkboxOffset + c.x - 20 + "px",
                                    top: h + "px",
                                    display: this.proximate || h > g - 6 && h < g + b - 6 ? "" : "none"
                                })
                            }
                        }, this)
                    }
                };
                a.prototype.renderTitle = function() {
                    var a = this.options,
                        b = this.padding,
                        e = a.title,
                        g = 0;
                    e.text && (this.title || (this.title = this.chart.renderer.label(e.text, b - 3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                            zIndex: 1
                        }), this.chart.styledMode || this.title.css(e.style), this.title.add(this.group)),
                        e.width || this.title.css({
                            width: this.maxLegendWidth + "px"
                        }), a = this.title.getBBox(), g = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                            translateY: g
                        }));
                    this.titleHeight = g
                };
                a.prototype.setText = function(a) {
                    var b = this.options;
                    a.legendItem.attr({
                        text: b.labelFormat ? F(b.labelFormat, a, this.chart) : b.labelFormatter.call(a)
                    })
                };
                a.prototype.renderItem = function(a) {
                    var b = this.chart,
                        d = b.renderer,
                        e = this.options,
                        g = this.symbolWidth,
                        c = e.symbolPadding,
                        h = this.itemStyle,
                        p = this.itemHiddenStyle,
                        f = "horizontal" === e.layout ?
                        m(e.itemDistance, 20) : 0,
                        x = !e.rtl,
                        q = a.legendItem,
                        B = !a.series,
                        n = !B && a.series.drawLegendSymbol ? a.series : a,
                        H = n.options;
                    H = this.createCheckboxForItem && H && H.showCheckbox;
                    f = g + c + f + (H ? 20 : 0);
                    var J = e.useHTML,
                        w = a.options.className;
                    q || (a.legendGroup = d.g("legend-item").addClass("highcharts-" + n.type + "-series highcharts-color-" + a.colorIndex + (w ? " " + w : "") + (B ? " highcharts-series-" + a.index : "")).attr({
                        zIndex: 1
                    }).add(this.scrollGroup), a.legendItem = q = d.text("", x ? g + c : -c, this.baseline || 0, J), b.styledMode || q.css(k(a.visible ?
                        h : p)), q.attr({
                        align: x ? "left" : "right",
                        zIndex: 2
                    }).add(a.legendGroup), this.baseline || (this.fontMetrics = d.fontMetrics(b.styledMode ? 12 : h.fontSize, q), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, q.attr("y", this.baseline)), this.symbolHeight = e.symbolHeight || this.fontMetrics.f, n.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, q, J));
                    H && !a.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(a);
                    this.colorizeItem(a, a.visible);
                    !b.styledMode && h.width || q.css({
                        width: (e.itemWidth ||
                            this.widthOption || b.spacingBox.width) - f
                    });
                    this.setText(a);
                    b = q.getBBox();
                    a.itemWidth = a.checkboxOffset = e.itemWidth || a.legendItemWidth || b.width + f;
                    this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                    this.totalItemWidth += a.itemWidth;
                    this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || b.height || this.symbolHeight)
                };
                a.prototype.layoutItem = function(a) {
                    var b = this.options,
                        d = this.padding,
                        e = "horizontal" === b.layout,
                        g = a.itemHeight,
                        c = this.itemMarginBottom,
                        h = this.itemMarginTop,
                        k = e ? m(b.itemDistance, 20) :
                        0,
                        p = this.maxLegendWidth;
                    b = b.alignColumns && this.totalItemWidth > p ? this.maxItemWidth : a.itemWidth;
                    e && this.itemX - d + b > p && (this.itemX = d, this.lastLineHeight && (this.itemY += h + this.lastLineHeight + c), this.lastLineHeight = 0);
                    this.lastItemY = h + this.itemY + c;
                    this.lastLineHeight = Math.max(g, this.lastLineHeight);
                    a._legendItemPos = [this.itemX, this.itemY];
                    e ? this.itemX += b : (this.itemY += h + g + c, this.lastLineHeight = g);
                    this.offsetWidth = this.widthOption || Math.max((e ? this.itemX - d - (a.checkbox ? 0 : k) : b) + d, this.offsetWidth)
                };
                a.prototype.getAllItems =
                    function() {
                        var a = [];
                        this.chart.series.forEach(function(b) {
                            var d = b && b.options;
                            b && m(d.showInLegend, A(d.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === d.legendType ? b.data : b)))
                        });
                        C(this, "afterGetAllItems", {
                            allItems: a
                        });
                        return a
                    };
                a.prototype.getAlignment = function() {
                    var a = this.options;
                    return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
                };
                a.prototype.adjustMargins = function(a, b) {
                    var d = this.chart,
                        g = this.options,
                        c = this.getAlignment();
                    c && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function(h, l) {
                        h.test(c) && !A(a[l]) && (d[e[l]] = Math.max(d[e[l]], d.legend[(l + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][l] * g[l % 2 ? "x" : "y"] + m(g.margin, 12) + b[l] + (d.titleOffset[l] || 0)))
                    })
                };
                a.prototype.proximatePositions = function() {
                    var a = this.chart,
                        b = [],
                        e = "left" === this.options.align;
                    this.allItems.forEach(function(d) {
                        var g = e;
                        if (d.yAxis && d.points) {
                            d.xAxis.options.reversed && (g = !g);
                            var c = M(g ? d.points : d.points.slice(0).reverse(), function(a) {
                                return D(a.plotY)
                            });
                            g = this.itemMarginTop + d.legendItem.getBBox().height + this.itemMarginBottom;
                            var h = d.yAxis.top - a.plotTop;
                            d.visible ? (c = c ? c.plotY : d.yAxis.height, c += h - .3 * g) : c = h + d.yAxis.height;
                            b.push({
                                target: c,
                                size: g,
                                item: d
                            })
                        }
                    }, this);
                    c.distribute(b, a.plotHeight);
                    b.forEach(function(b) {
                        b.item._legendItemPos[1] = a.plotTop - a.spacing[0] + b.pos
                    })
                };
                a.prototype.render = function() {
                    var a = this.chart,
                        b = a.renderer,
                        e = this.group,
                        g, c = this.box,
                        h = this.options,
                        p = this.padding;
                    this.itemX = p;
                    this.itemY = this.initialItemY;
                    this.lastItemY = this.offsetWidth =
                        0;
                    this.widthOption = x(h.width, a.spacingBox.width - p);
                    var m = a.spacingBox.width - 2 * p - h.x; - 1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (m /= 2);
                    this.maxLegendWidth = this.widthOption || m;
                    e || (this.group = e = b.g("legend").attr({
                        zIndex: 7
                    }).add(), this.contentGroup = b.g().attr({
                        zIndex: 1
                    }).add(e), this.scrollGroup = b.g().add(this.contentGroup));
                    this.renderTitle();
                    m = this.getAllItems();
                    w(m, function(a, b) {
                        return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                    });
                    h.reversed && m.reverse();
                    this.allItems = m;
                    this.display = g = !!m.length;
                    this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                    m.forEach(this.renderItem, this);
                    m.forEach(this.layoutItem, this);
                    m = (this.widthOption || this.offsetWidth) + p;
                    var f = this.lastItemY + this.lastLineHeight + this.titleHeight;
                    f = this.handleOverflow(f);
                    f += p;
                    c || (this.box = c = b.rect().addClass("highcharts-legend-box").attr({
                        r: h.borderRadius
                    }).add(e), c.isNew = !0);
                    a.styledMode || c.attr({
                        stroke: h.borderColor,
                        "stroke-width": h.borderWidth || 0,
                        fill: h.backgroundColor ||
                            "none"
                    }).shadow(h.shadow);
                    0 < m && 0 < f && (c[c.isNew ? "attr" : "animate"](c.crisp.call({}, {
                        x: 0,
                        y: 0,
                        width: m,
                        height: f
                    }, c.strokeWidth())), c.isNew = !1);
                    c[g ? "show" : "hide"]();
                    a.styledMode && "none" === e.getStyle("display") && (m = f = 0);
                    this.legendWidth = m;
                    this.legendHeight = f;
                    g && (b = a.spacingBox, c = b.y, /(lth|ct|rth)/.test(this.getAlignment()) && 0 < a.titleOffset[0] ? c += a.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < a.titleOffset[2] && (c -= a.titleOffset[2]), c !== b.y && (b = k(b, {
                        y: c
                    })), e.align(k(h, {
                        width: m,
                        height: f,
                        verticalAlign: this.proximate ?
                            "top" : h.verticalAlign
                    }), !0, b));
                    this.proximate || this.positionItems();
                    C(this, "afterRender")
                };
                a.prototype.handleOverflow = function(a) {
                    var b = this,
                        d = this.chart,
                        e = d.renderer,
                        g = this.options,
                        c = g.y,
                        h = this.padding;
                    c = d.spacingBox.height + ("top" === g.verticalAlign ? -c : c) - h;
                    var k = g.maxHeight,
                        p, f = this.clipRect,
                        x = g.navigation,
                        q = m(x.animation, !0),
                        n = x.arrowSize || 12,
                        H = this.nav,
                        J = this.pages,
                        w, z = this.allItems,
                        t = function(a) {
                            "number" === typeof a ? f.attr({
                                height: a
                            }) : f && (b.clipRect = f.destroy(), b.contentGroup.clip());
                            b.contentGroup.div &&
                                (b.contentGroup.div.style.clip = a ? "rect(" + h + "px,9999px," + (h + a) + "px,0)" : "auto")
                        },
                        K = function(a) {
                            b[a] = e.circle(0, 0, 1.3 * n).translate(n / 2, n / 2).add(H);
                            d.styledMode || b[a].attr("fill", "rgba(0,0,0,0.0001)");
                            return b[a]
                        };
                    "horizontal" !== g.layout || "middle" === g.verticalAlign || g.floating || (c /= 2);
                    k && (c = Math.min(c, k));
                    J.length = 0;
                    a > c && !1 !== x.enabled ? (this.clipHeight = p = Math.max(c - 20 - this.titleHeight - h, 0), this.currentPage = m(this.currentPage, 1), this.fullHeight = a, z.forEach(function(a, b) {
                        var d = a._legendItemPos[1],
                            e = Math.round(a.legendItem.getBBox().height),
                            g = J.length;
                        if (!g || d - J[g - 1] > p && (w || d) !== J[g - 1]) J.push(w || d), g++;
                        a.pageIx = g - 1;
                        w && (z[b - 1].pageIx = g - 1);
                        b === z.length - 1 && d + e - J[g - 1] > p && d !== w && (J.push(d), a.pageIx = g);
                        d !== w && (w = d)
                    }), f || (f = b.clipRect = e.clipRect(0, h, 9999, 0), b.contentGroup.clip(f)), t(p), H || (this.nav = H = e.g().attr({
                            zIndex: 1
                        }).add(this.group), this.up = e.symbol("triangle", 0, 0, n, n).add(H), K("upTracker").on("click", function() {
                            b.scroll(-1, q)
                        }), this.pager = e.text("", 15, 10).addClass("highcharts-legend-navigation"), d.styledMode || this.pager.css(x.style),
                        this.pager.add(H), this.down = e.symbol("triangle-down", 0, 0, n, n).add(H), K("downTracker").on("click", function() {
                            b.scroll(1, q)
                        })), b.scroll(0), a = c) : H && (t(), this.nav = H.destroy(), this.scrollGroup.attr({
                        translateY: 1
                    }), this.clipHeight = 0);
                    return a
                };
                a.prototype.scroll = function(a, b) {
                    var d = this,
                        e = this.chart,
                        g = this.pages,
                        h = g.length,
                        k = this.currentPage + a;
                    a = this.clipHeight;
                    var f = this.options.navigation,
                        x = this.pager,
                        q = this.padding;
                    k > h && (k = h);
                    0 < k && ("undefined" !== typeof b && z(b, e), this.nav.attr({
                        translateX: q,
                        translateY: a +
                            this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), [this.up, this.upTracker].forEach(function(a) {
                        a.attr({
                            "class": 1 === k ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                        })
                    }), x.attr({
                        text: k + "/" + h
                    }), [this.down, this.downTracker].forEach(function(a) {
                        a.attr({
                            x: 18 + this.pager.getBBox().width,
                            "class": k === h ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                        })
                    }, this), e.styledMode || (this.up.attr({
                        fill: 1 === k ? f.inactiveColor : f.activeColor
                    }), this.upTracker.css({
                        cursor: 1 === k ? "default" : "pointer"
                    }), this.down.attr({
                        fill: k === h ? f.inactiveColor : f.activeColor
                    }), this.downTracker.css({
                        cursor: k === h ? "default" : "pointer"
                    })), this.scrollOffset = -g[k - 1] + this.initialItemY, this.scrollGroup.animate({
                        translateY: this.scrollOffset
                    }), this.currentPage = k, this.positionCheckboxes(), b = c.animObject(m(b, e.renderer.globalAnimation, !0)), p(function() {
                        C(d, "afterScroll", {
                            currentPage: k
                        })
                    }, b.duration || 0))
                };
                return a
            }();
        (/Trident\/7\.0/.test(a.navigator && a.navigator.userAgent) || K) && f(g.prototype, "positionItem", function(a,
            d) {
            var b = this,
                e = function() {
                    d._legendItemPos && a.call(b, d)
                };
            e();
            b.bubbleLegend || setTimeout(e)
        });
        c.Legend = g;
        return c.Legend
    });
    O(u, "parts/Chart.js", [u["parts/Globals.js"], u["parts/Legend.js"], u["parts/MSPointer.js"], u["parts/Pointer.js"], u["parts/Time.js"], u["parts/Utilities.js"]], function(c, f, G, q, A, t) {
        var M = t.addEvent,
            C = t.animate,
            F = t.animObject,
            D = t.attr,
            k = t.createElement,
            m = t.css,
            x = t.defined,
            z = t.discardElement,
            w = t.erase,
            p = t.error,
            K = t.extend,
            e = t.find,
            a = t.fireEvent,
            g = t.getStyle,
            h = t.isArray,
            d = t.isFunction,
            b = t.isNumber,
            l = t.isObject,
            y = t.isString,
            r = t.merge,
            v = t.numberFormat,
            I = t.objectEach,
            L = t.pick,
            Q = t.pInt,
            N = t.relativeLength,
            R = t.removeEvent,
            B = t.setAnimation,
            n = t.splat,
            H = t.syncTimeout,
            J = t.uniqueKey,
            V = c.doc,
            S = c.Axis,
            W = c.defaultOptions,
            u = c.charts,
            E = c.marginNames,
            T = c.seriesTypes,
            Z = c.win,
            X = c.Chart = function() {
                this.getArgs.apply(this, arguments)
            };
        c.chart = function(a, b, d) {
            return new X(a, b, d)
        };
        K(X.prototype, {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                if (y(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function(b, e) {
                var g, n = b.series,
                    h = b.plotOptions || {};
                a(this, "init", {
                    args: arguments
                }, function() {
                    b.series = null;
                    g = r(W, b);
                    I(g.plotOptions, function(a, b) {
                        l(a) && (a.tooltip = h[b] && r(h[b].tooltip) || void 0)
                    });
                    g.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                    g.series = b.series = n;
                    this.userOptions = b;
                    var k = g.chart,
                        p = k.events;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {
                        h: {},
                        v: {}
                    };
                    this.labelCollectors = [];
                    this.callback = e;
                    this.isResizing = 0;
                    this.options = g;
                    this.axes = [];
                    this.series = [];
                    this.time = b.time && Object.keys(b.time).length ? new A(b.time) : c.time;
                    this.numberFormatter = k.numberFormatter || v;
                    this.styledMode = k.styledMode;
                    this.hasCartesianSeries = k.showAxes;
                    var m = this;
                    m.index = u.length;
                    u.push(m);
                    c.chartCount++;
                    p && I(p, function(a, b) {
                        d(a) && M(m, b, a)
                    });
                    m.xAxis = [];
                    m.yAxis = [];
                    m.pointCount = m.colorCounter = m.symbolCounter = 0;
                    a(m, "afterInit");
                    m.firstRender()
                })
            },
            initSeries: function(a) {
                var b = this.options.chart;
                b = a.type || b.type || b.defaultSeriesType;
                var d = T[b];
                d || p(17, !0, this, {
                    missingModuleFor: b
                });
                b = new d;
                b.init(this, a);
                return b
            },
            setSeriesData: function() {
                this.getSeriesOrderByLinks().forEach(function(a) {
                    a.points || a.data || !a.enabledDataSorting || a.setData(a.options.data, !1)
                })
            },
            getSeriesOrderByLinks: function() {
                return this.series.concat().sort(function(a, b) {
                    return a.linkedSeries.length || b.linkedSeries.length ? b.linkedSeries.length - a.linkedSeries.length : 0
                })
            },
            orderSeries: function(a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName())
            },
            isInsidePlot: function(b, d,
                e) {
                var g = e ? d : b;
                b = e ? b : d;
                g = {
                    x: g,
                    y: b,
                    isInsidePlot: 0 <= g && g <= this.plotWidth && 0 <= b && b <= this.plotHeight
                };
                a(this, "afterIsInsidePlot", g);
                return g.isInsidePlot
            },
            redraw: function(b) {
                a(this, "beforeRedraw");
                var d = this.axes,
                    e = this.series,
                    g = this.pointer,
                    c = this.legend,
                    n = this.userOptions.legend,
                    h = this.isDirtyLegend,
                    l = this.hasCartesianSeries,
                    k = this.isDirtyBox,
                    p = this.renderer,
                    m = p.isHidden(),
                    f = [];
                this.setResponsive && this.setResponsive(!1);
                B(this.hasRendered ? b : !1, this);
                m && this.temporaryDisplay();
                this.layOutTitles();
                for (b =
                    e.length; b--;) {
                    var r = e[b];
                    if (r.options.stacking) {
                        var v = !0;
                        if (r.isDirty) {
                            var J = !0;
                            break
                        }
                    }
                }
                if (J)
                    for (b = e.length; b--;) r = e[b], r.options.stacking && (r.isDirty = !0);
                e.forEach(function(b) {
                    b.isDirty && ("point" === b.options.legendType ? (b.updateTotals && b.updateTotals(), h = !0) : n && (n.labelFormatter || n.labelFormat) && (h = !0));
                    b.isDirtyData && a(b, "updatedData")
                });
                h && c && c.options.enabled && (c.render(), this.isDirtyLegend = !1);
                v && this.getStacks();
                l && d.forEach(function(a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                l && (d.forEach(function(a) {
                    a.isDirty &&
                        (k = !0)
                }), d.forEach(function(b) {
                    var d = b.min + "," + b.max;
                    b.extKey !== d && (b.extKey = d, f.push(function() {
                        a(b, "afterSetExtremes", K(b.eventArgs, b.getExtremes()));
                        delete b.eventArgs
                    }));
                    (k || v) && b.redraw()
                }));
                k && this.drawChartBox();
                a(this, "predraw");
                e.forEach(function(a) {
                    (k || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                g && g.reset(!0);
                p.draw();
                a(this, "redraw");
                a(this, "render");
                m && this.temporaryDisplay(!0);
                f.forEach(function(a) {
                    a.call()
                })
            },
            get: function(a) {
                function b(b) {
                    return b.id === a || b.options && b.options.id ===
                        a
                }
                var d = this.series,
                    g;
                var c = e(this.axes, b) || e(this.series, b);
                for (g = 0; !c && g < d.length; g++) c = e(d[g].points || [], b);
                return c
            },
            getAxes: function() {
                var b = this,
                    d = this.options,
                    e = d.xAxis = n(d.xAxis || {});
                d = d.yAxis = n(d.yAxis || {});
                a(this, "getAxes");
                e.forEach(function(a, b) {
                    a.index = b;
                    a.isX = !0
                });
                d.forEach(function(a, b) {
                    a.index = b
                });
                e.concat(d).forEach(function(a) {
                    new S(b, a)
                });
                a(this, "afterGetAxes")
            },
            getSelectedPoints: function() {
                var a = [];
                this.series.forEach(function(b) {
                    a = a.concat(b.getPointsCollection().filter(function(a) {
                        return L(a.selectedStaging,
                            a.selected)
                    }))
                });
                return a
            },
            getSelectedSeries: function() {
                return this.series.filter(function(a) {
                    return a.selected
                })
            },
            setTitle: function(a, b, d) {
                this.applyDescription("title", a);
                this.applyDescription("subtitle", b);
                this.applyDescription("caption", void 0);
                this.layOutTitles(d)
            },
            applyDescription: function(a, b) {
                var d = this,
                    e = "title" === a ? {
                        color: "#333333",
                        fontSize: this.options.isStock ? "16px" : "18px"
                    } : {
                        color: "#666666"
                    };
                e = this.options[a] = r(!this.styledMode && {
                    style: e
                }, this.options[a], b);
                var g = this[a];
                g && b && (this[a] =
                    g = g.destroy());
                e && !g && (g = this.renderer.text(e.text, 0, 0, e.useHTML).attr({
                    align: e.align,
                    "class": "highcharts-" + a,
                    zIndex: e.zIndex || 4
                }).add(), g.update = function(b) {
                    d[{
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    }[a]](b)
                }, this.styledMode || g.css(e.style), this[a] = g)
            },
            layOutTitles: function(b) {
                var d = [0, 0, 0],
                    e = this.renderer,
                    g = this.spacingBox;
                ["title", "subtitle", "caption"].forEach(function(a) {
                    var b = this[a],
                        c = this.options[a],
                        n = c.verticalAlign || "top";
                    a = "title" === a ? -3 : "top" === n ? d[0] + 2 : 0;
                    if (b) {
                        if (!this.styledMode) var h =
                            c.style.fontSize;
                        h = e.fontMetrics(h, b).b;
                        b.css({
                            width: (c.width || g.width + (c.widthAdjust || 0)) + "px"
                        });
                        var l = Math.round(b.getBBox(c.useHTML).height);
                        b.align(K({
                            y: "bottom" === n ? h : a + h,
                            height: l
                        }, c), !1, "spacingBox");
                        c.floating || ("top" === n ? d[0] = Math.ceil(d[0] + l) : "bottom" === n && (d[2] = Math.ceil(d[2] + l)))
                    }
                }, this);
                d[0] && "top" === (this.options.title.verticalAlign || "top") && (d[0] += this.options.title.margin);
                d[2] && "bottom" === this.options.caption.verticalAlign && (d[2] += this.options.caption.margin);
                var c = !this.titleOffset ||
                    this.titleOffset.join(",") !== d.join(",");
                this.titleOffset = d;
                a(this, "afterLayOutTitles");
                !this.isDirtyBox && c && (this.isDirtyBox = this.isDirtyLegend = c, this.hasRendered && L(b, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var a = this.options.chart,
                    b = a.width;
                a = a.height;
                var d = this.renderTo;
                x(b) || (this.containerWidth = g(d, "width"));
                x(a) || (this.containerHeight = g(d, "height"));
                this.chartWidth = Math.max(0, b || this.containerWidth || 600);
                this.chartHeight = Math.max(0, N(a, this.chartWidth) || (1 < this.containerHeight ?
                    this.containerHeight : 400))
            },
            temporaryDisplay: function(a) {
                var b = this.renderTo;
                if (a)
                    for (; b && b.style;) b.hcOrigStyle && (m(b, b.hcOrigStyle), delete b.hcOrigStyle), b.hcOrigDetached && (V.body.removeChild(b), b.hcOrigDetached = !1), b = b.parentNode;
                else
                    for (; b && b.style;) {
                        V.body.contains(b) || b.parentNode || (b.hcOrigDetached = !0, V.body.appendChild(b));
                        if ("none" === g(b, "display", !1) || b.hcOricDetached) b.hcOrigStyle = {
                                display: b.style.display,
                                height: b.style.height,
                                overflow: b.style.overflow
                            }, a = {
                                display: "block",
                                overflow: "hidden"
                            },
                            b !== this.renderTo && (a.height = 0), m(b, a), b.offsetWidth || b.style.setProperty("display", "block", "important");
                        b = b.parentNode;
                        if (b === V.body) break
                    }
            },
            setClassName: function(a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function() {
                var d = this.options,
                    e = d.chart;
                var g = this.renderTo;
                var n = J(),
                    h, l;
                g || (this.renderTo = g = e.renderTo);
                y(g) && (this.renderTo = g = V.getElementById(g));
                g || p(13, !0, this);
                var f = Q(D(g, "data-highcharts-chart"));
                b(f) && u[f] && u[f].hasRendered && u[f].destroy();
                D(g, "data-highcharts-chart",
                    this.index);
                g.innerHTML = "";
                e.skipClone || g.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                f = this.chartWidth;
                var r = this.chartHeight;
                m(g, {
                    overflow: "hidden"
                });
                this.styledMode || (h = K({
                    position: "relative",
                    overflow: "hidden",
                    width: f + "px",
                    height: r + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, e.style));
                this.container = g = k("div", {
                    id: n
                }, h, g);
                this._cursor = g.style.cursor;
                this.renderer = new(c[e.renderer] || c.Renderer)(g, f, r, null, e.forExport, d.exporting &&
                    d.exporting.allowHTML, this.styledMode);
                B(void 0, this);
                this.setClassName(e.className);
                if (this.styledMode)
                    for (l in d.defs) this.renderer.definition(d.defs[l]);
                else this.renderer.setStyle(e.style);
                this.renderer.chartIndex = this.index;
                a(this, "afterGetContainer")
            },
            getMargins: function(b) {
                var d = this.spacing,
                    e = this.margin,
                    g = this.titleOffset;
                this.resetMargins();
                g[0] && !x(e[0]) && (this.plotTop = Math.max(this.plotTop, g[0] + d[0]));
                g[2] && !x(e[2]) && (this.marginBottom = Math.max(this.marginBottom, g[2] + d[2]));
                this.legend &&
                    this.legend.display && this.legend.adjustMargins(e, d);
                a(this, "getMargins");
                b || this.getAxisMargins()
            },
            getAxisMargins: function() {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    d = a.colorAxis,
                    e = a.margin,
                    g = function(a) {
                        a.forEach(function(a) {
                            a.visible && a.getOffset()
                        })
                    };
                a.hasCartesianSeries ? g(a.axes) : d && d.length && g(d);
                E.forEach(function(d, g) {
                    x(e[g]) || (a[d] += b[g])
                });
                a.setChartSize()
            },
            reflow: function(a) {
                var b = this,
                    d = b.options.chart,
                    e = b.renderTo,
                    c = x(d.width) && x(d.height),
                    n = d.width || g(e, "width");
                d = d.height || g(e, "height");
                e = a ? a.target : Z;
                if (!c && !b.isPrinting && n && d && (e === Z || e === V)) {
                    if (n !== b.containerWidth || d !== b.containerHeight) t.clearTimeout(b.reflowTimeout), b.reflowTimeout = H(function() {
                        b.container && b.setSize(void 0, void 0, !1)
                    }, a ? 100 : 0);
                    b.containerWidth = n;
                    b.containerHeight = d
                }
            },
            setReflow: function(a) {
                var b = this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = M(Z, "resize", function(a) {
                    b.options && b.reflow(a)
                }), M(this, "destroy", this.unbindReflow))
            },
            setSize: function(b,
                d, e) {
                var g = this,
                    c = g.renderer;
                g.isResizing += 1;
                B(e, g);
                g.oldChartHeight = g.chartHeight;
                g.oldChartWidth = g.chartWidth;
                "undefined" !== typeof b && (g.options.chart.width = b);
                "undefined" !== typeof d && (g.options.chart.height = d);
                g.getChartSize();
                if (!g.styledMode) {
                    var n = c.globalAnimation;
                    (n ? C : m)(g.container, {
                        width: g.chartWidth + "px",
                        height: g.chartHeight + "px"
                    }, n)
                }
                g.setChartSize(!0);
                c.setSize(g.chartWidth, g.chartHeight, e);
                g.axes.forEach(function(a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                g.isDirtyLegend = !0;
                g.isDirtyBox = !0;
                g.layOutTitles();
                g.getMargins();
                g.redraw(e);
                g.oldChartHeight = null;
                a(g, "resize");
                H(function() {
                    g && a(g, "endResize", null, function() {
                        --g.isResizing
                    })
                }, F(n).duration || 0)
            },
            setChartSize: function(b) {
                var d = this.inverted,
                    e = this.renderer,
                    g = this.chartWidth,
                    c = this.chartHeight,
                    n = this.options.chart,
                    h = this.spacing,
                    l = this.clipOffset,
                    k, p, m, f;
                this.plotLeft = k = Math.round(this.plotLeft);
                this.plotTop = p = Math.round(this.plotTop);
                this.plotWidth = m = Math.max(0, Math.round(g - k - this.marginRight));
                this.plotHeight = f = Math.max(0, Math.round(c - p - this.marginBottom));
                this.plotSizeX = d ? f : m;
                this.plotSizeY = d ? m : f;
                this.plotBorderWidth = n.plotBorderWidth || 0;
                this.spacingBox = e.spacingBox = {
                    x: h[3],
                    y: h[0],
                    width: g - h[3] - h[1],
                    height: c - h[0] - h[2]
                };
                this.plotBox = e.plotBox = {
                    x: k,
                    y: p,
                    width: m,
                    height: f
                };
                g = 2 * Math.floor(this.plotBorderWidth / 2);
                d = Math.ceil(Math.max(g, l[3]) / 2);
                e = Math.ceil(Math.max(g, l[0]) / 2);
                this.clipBox = {
                    x: d,
                    y: e,
                    width: Math.floor(this.plotSizeX - Math.max(g, l[1]) / 2 - d),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(g, l[2]) / 2 - e))
                };
                b || this.axes.forEach(function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                });
                a(this, "afterSetChartSize", {
                    skipAxes: b
                })
            },
            resetMargins: function() {
                a(this, "resetMargins");
                var b = this,
                    d = b.options.chart;
                ["margin", "spacing"].forEach(function(a) {
                    var e = d[a],
                        g = l(e) ? e : [e, e, e, e];
                    ["Top", "Right", "Bottom", "Left"].forEach(function(e, c) {
                        b[a][c] = L(d[a + e], g[c])
                    })
                });
                E.forEach(function(a, d) {
                    b[a] = L(b.margin[d], b.spacing[d])
                });
                b.axisOffset = [0, 0, 0, 0];
                b.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var b = this.options.chart,
                    d = this.renderer,
                    e = this.chartWidth,
                    g = this.chartHeight,
                    c = this.chartBackground,
                    n = this.plotBackground,
                    h = this.plotBorder,
                    l = this.styledMode,
                    k = this.plotBGImage,
                    p = b.backgroundColor,
                    m = b.plotBackgroundColor,
                    f = b.plotBackgroundImage,
                    r, v = this.plotLeft,
                    J = this.plotTop,
                    y = this.plotWidth,
                    H = this.plotHeight,
                    x = this.plotBox,
                    q = this.clipRect,
                    B = this.clipBox,
                    w = "animate";
                c || (this.chartBackground = c = d.rect().addClass("highcharts-background").add(), w = "attr");
                if (l) var I = r = c.strokeWidth();
                else {
                    I = b.borderWidth || 0;
                    r = I + (b.shadow ? 8 : 0);
                    p = {
                        fill: p || "none"
                    };
                    if (I || c["stroke-width"]) p.stroke =
                        b.borderColor, p["stroke-width"] = I;
                    c.attr(p).shadow(b.shadow)
                }
                c[w]({
                    x: r / 2,
                    y: r / 2,
                    width: e - r - I % 2,
                    height: g - r - I % 2,
                    r: b.borderRadius
                });
                w = "animate";
                n || (w = "attr", this.plotBackground = n = d.rect().addClass("highcharts-plot-background").add());
                n[w](x);
                l || (n.attr({
                    fill: m || "none"
                }).shadow(b.plotShadow), f && (k ? (f !== k.attr("href") && k.attr("href", f), k.animate(x)) : this.plotBGImage = d.image(f, v, J, y, H).add()));
                q ? q.animate({
                    width: B.width,
                    height: B.height
                }) : this.clipRect = d.clipRect(B);
                w = "animate";
                h || (w = "attr", this.plotBorder =
                    h = d.rect().addClass("highcharts-plot-border").attr({
                        zIndex: 1
                    }).add());
                l || h.attr({
                    stroke: b.plotBorderColor,
                    "stroke-width": b.plotBorderWidth || 0,
                    fill: "none"
                });
                h[w](h.crisp({
                    x: v,
                    y: J,
                    width: y,
                    height: H
                }, -h.strokeWidth()));
                this.isDirtyBox = !1;
                a(this, "afterDrawChartBox")
            },
            propFromSeries: function() {
                var a = this,
                    b = a.options.chart,
                    d, e = a.options.series,
                    g, c;
                ["inverted", "angular", "polar"].forEach(function(n) {
                    d = T[b.type || b.defaultSeriesType];
                    c = b[n] || d && d.prototype[n];
                    for (g = e && e.length; !c && g--;)(d = T[e[g].type]) && d.prototype[n] &&
                        (c = !0);
                    a[n] = c
                })
            },
            linkSeries: function() {
                var b = this,
                    d = b.series;
                d.forEach(function(a) {
                    a.linkedSeries.length = 0
                });
                d.forEach(function(a) {
                    var d = a.options.linkedTo;
                    y(d) && (d = ":previous" === d ? b.series[a.index - 1] : b.get(d)) && d.linkedParent !== a && (d.linkedSeries.push(a), a.linkedParent = d, d.enabledDataSorting && a.setDataSortingOptions(), a.visible = L(a.options.visible, d.options.visible, a.visible))
                });
                a(this, "afterLinkSeries")
            },
            renderSeries: function() {
                this.series.forEach(function(a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function() {
                var a =
                    this,
                    b = a.options.labels;
                b.items && b.items.forEach(function(d) {
                    var e = K(b.style, d.style),
                        g = Q(e.left) + a.plotLeft,
                        c = Q(e.top) + a.plotTop + 12;
                    delete e.left;
                    delete e.top;
                    a.renderer.text(d.html, g, c).attr({
                        zIndex: 2
                    }).css(e).add()
                })
            },
            render: function() {
                var a = this.axes,
                    b = this.colorAxis,
                    d = this.renderer,
                    e = this.options,
                    g = 0,
                    c = function(a) {
                        a.forEach(function(a) {
                            a.visible && a.render()
                        })
                    };
                this.setTitle();
                this.legend = new f(this, e.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                e = this.plotWidth;
                a.some(function(a) {
                    if (a.horiz && a.visible && a.options.labels.enabled && a.series.length) return g = 21, !0
                });
                var n = this.plotHeight = Math.max(this.plotHeight - g, 0);
                a.forEach(function(a) {
                    a.setScale()
                });
                this.getAxisMargins();
                var h = 1.1 < e / this.plotWidth;
                var l = 1.05 < n / this.plotHeight;
                if (h || l) a.forEach(function(a) {
                    (a.horiz && h || !a.horiz && l) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries ? c(a) : b && b.length && c(b);
                this.seriesGroup || (this.seriesGroup = d.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.updateContainerScaling();
                this.hasRendered = !0
            },
            addCredits: function(a) {
                var b = this;
                a = r(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                        a.href && (Z.location.href = a.href)
                    }).attr({
                        align: a.position.align,
                        zIndex: 8
                    }), b.styledMode || this.credits.css(a.style), this.credits.add().align(a.position),
                    this.credits.update = function(a) {
                        b.credits = b.credits.destroy();
                        b.addCredits(a)
                    })
            },
            updateContainerScaling: function() {
                var a = this.container;
                if (a.offsetWidth && a.offsetHeight && a.getBoundingClientRect) {
                    var b = a.getBoundingClientRect(),
                        d = b.width / a.offsetWidth;
                    a = b.height / a.offsetHeight;
                    1 !== d || 1 !== a ? this.containerScaling = {
                        scaleX: d,
                        scaleY: a
                    } : delete this.containerScaling
                }
            },
            destroy: function() {
                var b = this,
                    d = b.axes,
                    e = b.series,
                    g = b.container,
                    n, h = g && g.parentNode;
                a(b, "destroy");
                b.renderer.forExport ? w(u, b) : u[b.index] =
                    void 0;
                c.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                R(b);
                for (n = d.length; n--;) d[n] = d[n].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (n = e.length; n--;) e[n] = e[n].destroy();
                "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(a) {
                    var d = b[a];
                    d && d.destroy && (b[a] = d.destroy())
                });
                g && (g.innerHTML = "", R(g), h && z(g));
                I(b, function(a,
                    d) {
                    delete b[d]
                })
            },
            firstRender: function() {
                var b = this,
                    d = b.options;
                if (!b.isReadyToRender || b.isReadyToRender()) {
                    b.getContainer();
                    b.resetMargins();
                    b.setChartSize();
                    b.propFromSeries();
                    b.getAxes();
                    (h(d.series) ? d.series : []).forEach(function(a) {
                        b.initSeries(a)
                    });
                    b.linkSeries();
                    b.setSeriesData();
                    a(b, "beforeRender");
                    q && (b.pointer = c.hasTouch || !Z.PointerEvent && !Z.MSPointerEvent ? new q(b, d) : new G(b, d));
                    b.render();
                    if (!b.renderer.imgCount && !b.hasLoaded) b.onload();
                    b.temporaryDisplay(!0)
                }
            },
            onload: function() {
                this.callbacks.concat([this.callback]).forEach(function(a) {
                    a &&
                        "undefined" !== typeof this.index && a.apply(this, [this])
                }, this);
                a(this, "load");
                a(this, "render");
                x(this.index) && this.setReflow(this.options.chart.reflow);
                this.hasLoaded = !0
            }
        })
    });
    O(u, "parts/ScrollablePlotArea.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        var u = f.addEvent,
            q = f.createElement,
            A = f.pick,
            t = f.stop;
        f = c.Chart;
        "";
        u(f, "afterSetChartSize", function(f) {
            var q = this.options.chart.scrollablePlotArea,
                t = q && q.minWidth;
            q = q && q.minHeight;
            if (!this.renderer.forExport) {
                if (t) {
                    if (this.scrollablePixelsX =
                        t = Math.max(0, t - this.chartWidth)) {
                        this.plotWidth += t;
                        this.inverted ? (this.clipBox.height += t, this.plotBox.height += t) : (this.clipBox.width += t, this.plotBox.width += t);
                        var D = {
                            1: {
                                name: "right",
                                value: t
                            }
                        }
                    }
                } else q && (this.scrollablePixelsY = t = Math.max(0, q - this.chartHeight)) && (this.plotHeight += t, this.inverted ? (this.clipBox.width += t, this.plotBox.width += t) : (this.clipBox.height += t, this.plotBox.height += t), D = {
                    2: {
                        name: "bottom",
                        value: t
                    }
                });
                D && !f.skipAxes && this.axes.forEach(function(k) {
                    D[k.side] ? k.getPlotLinePath = function() {
                        var m =
                            D[k.side].name,
                            f = this[m];
                        this[m] = f - D[k.side].value;
                        var q = c.Axis.prototype.getPlotLinePath.apply(this, arguments);
                        this[m] = f;
                        return q
                    } : (k.setAxisSize(), k.setAxisTranslation())
                })
            }
        });
        u(f, "render", function() {
            this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        f.prototype.setUpScrolling = function() {
            var c = this,
                f = {
                    WebkitOverflowScrolling: "touch",
                    overflowX: "hidden",
                    overflowY: "hidden"
                };
            this.scrollablePixelsX && (f.overflowX =
                "auto");
            this.scrollablePixelsY && (f.overflowY = "auto");
            this.scrollingContainer = q("div", {
                className: "highcharts-scrolling"
            }, f, this.renderTo);
            u(this.scrollingContainer, "scroll", function() {
                c.pointer && delete c.pointer.chartPosition
            });
            this.innerContainer = q("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        f.prototype.moveFixedElements = function() {
            var c = this.container,
                f = this.fixedRenderer,
                q = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),
                t;
            this.scrollablePixelsX && !this.inverted ? t = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? t = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? t = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (t = ".highcharts-yaxis");
            q.push(t, t + "-labels");
            q.forEach(function(k) {
                [].forEach.call(c.querySelectorAll(k), function(c) {
                    (c.namespaceURI === f.SVG_NS ? f.box : f.box.parentNode).appendChild(c);
                    c.style.pointerEvents = "auto"
                })
            })
        };
        f.prototype.applyFixed = function() {
            var f, C = !this.fixedDiv,
                F = this.options.chart.scrollablePlotArea;
            C ? (this.fixedDiv = q("div", {
                    className: "highcharts-fixed"
                }, {
                    position: "absolute",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 2
                }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.renderTo.style.overflow = "visible", this.fixedRenderer = f = new c.Renderer(this.fixedDiv, this.chartWidth, this.chartHeight), this.scrollableMask = f.path().attr({
                    fill: this.options.chart.backgroundColor || "#fff",
                    "fill-opacity": A(F.opacity, .85),
                    zIndex: -1
                }).addClass("highcharts-scrollable-mask").add(), this.moveFixedElements(),
                u(this, "afterShowResetZoom", this.moveFixedElements), u(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            f = this.chartWidth + (this.scrollablePixelsX || 0);
            var D = this.chartHeight + (this.scrollablePixelsY || 0);
            t(this.container);
            this.container.style.width = f + "px";
            this.container.style.height = D + "px";
            this.renderer.boxWrapper.attr({
                width: f,
                height: D,
                viewBox: [0, 0, f, D].join(" ")
            });
            this.chartBackground.attr({
                width: f,
                height: D
            });
            this.scrollablePixelsY && (this.scrollingContainer.style.height =
                this.chartHeight + "px");
            C && (F.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * F.scrollPositionX), F.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * F.scrollPositionY));
            D = this.axisOffset;
            C = this.plotTop - D[0] - 1;
            F = this.plotLeft - D[3] - 1;
            f = this.plotTop + this.plotHeight + D[2] + 1;
            D = this.plotLeft + this.plotWidth + D[1] + 1;
            var k = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
                m = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
            C = this.scrollablePixelsX ? ["M", 0, C, "L", this.plotLeft - 1, C, "L", this.plotLeft - 1, f, "L", 0, f, "Z", "M", k, C, "L", this.chartWidth, C, "L", this.chartWidth, f, "L", k, f, "Z"] : this.scrollablePixelsY ? ["M", F, 0, "L", F, this.plotTop - 1, "L", D, this.plotTop - 1, "L", D, 0, "Z", "M", F, m, "L", F, this.chartHeight, "L", D, this.chartHeight, "L", D, m, "Z"] : ["M", 0, 0];
            "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({
                d: C
            })
        }
    });
    O(u, "mixins/legend-symbol.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        var u = f.merge,
            q = f.pick;
        c.LegendSymbolMixin = {
            drawRectangle: function(c,
                f) {
                var t = c.symbolHeight,
                    A = c.options.squareSymbol;
                f.legendSymbol = this.chart.renderer.rect(A ? (c.symbolWidth - t) / 2 : 0, c.baseline - t + 1, A ? t : c.symbolWidth, t, q(c.options.symbolRadius, t / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(f.legendGroup)
            },
            drawLineMarker: function(c) {
                var f = this.options,
                    A = f.marker,
                    C = c.symbolWidth,
                    F = c.symbolHeight,
                    D = F / 2,
                    k = this.chart.renderer,
                    m = this.legendGroup;
                c = c.baseline - Math.round(.3 * c.fontMetrics.b);
                var x = {};
                this.chart.styledMode || (x = {
                        "stroke-width": f.lineWidth || 0
                    }, f.dashStyle &&
                    (x.dashstyle = f.dashStyle));
                this.legendLine = k.path(["M", 0, c, "L", C, c]).addClass("highcharts-graph").attr(x).add(m);
                A && !1 !== A.enabled && C && (f = Math.min(q(A.radius, D), D), 0 === this.symbol.indexOf("url") && (A = u(A, {
                    width: F,
                    height: F
                }), f = 0), this.legendSymbol = A = k.symbol(this.symbol, C / 2 - f, c - f, 2 * f, 2 * f, A).addClass("highcharts-point").add(m), A.isMarker = !0)
            }
        };
        return c.LegendSymbolMixin
    });
    O(u, "parts/Point.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        "";
        var u = f.animObject,
            q = f.defined,
            A = f.erase,
            t =
            f.extend,
            M = f.format,
            C = f.getNestedProperty,
            F = f.isArray,
            D = f.isNumber,
            k = f.isObject,
            m = f.syncTimeout,
            x = f.pick,
            z = f.removeEvent,
            w = f.uniqueKey,
            p = c.fireEvent;
        f = function() {
            function c() {
                this.colorIndex = this.category = void 0;
                this.formatPrefix = "point";
                this.id = void 0;
                this.isNull = !1;
                this.percentage = this.options = this.name = void 0;
                this.selected = !1;
                this.total = this.series = void 0;
                this.visible = !0;
                this.x = void 0
            }
            c.prototype.animateBeforeDestroy = function() {
                var e = this,
                    a = {
                        x: e.startXPos,
                        opacity: 0
                    },
                    g, c = e.getGraphicalProps();
                c.singular.forEach(function(d) {
                    g =
                        "dataLabel" === d;
                    e[d] = e[d].animate(g ? {
                        x: e[d].startXPos,
                        y: e[d].startYPos,
                        opacity: 0
                    } : a)
                });
                c.plural.forEach(function(a) {
                    e[a].forEach(function(a) {
                        a.element && a.animate(t({
                            x: e.startXPos
                        }, a.startYPos ? {
                            x: a.startXPos,
                            y: a.startYPos
                        } : {}))
                    })
                })
            };
            c.prototype.applyOptions = function(e, a) {
                var g = this.series,
                    h = g.options.pointValKey || g.pointValKey;
                e = c.prototype.optionsToObject.call(this, e);
                t(this, e);
                this.options = this.options ? t(this.options, e) : e;
                e.group && delete this.group;
                e.dataLabels && delete this.dataLabels;
                h && (this.y =
                    c.prototype.getNestedProperty.call(this, h));
                this.formatPrefix = (this.isNull = x(this.isValid && !this.isValid(), null === this.x || !D(this.y))) ? "null" : "point";
                this.selected && (this.state = "select");
                "name" in this && "undefined" === typeof a && g.xAxis && g.xAxis.hasNames && (this.x = g.xAxis.nameToX(this));
                "undefined" === typeof this.x && g && (this.x = "undefined" === typeof a ? g.autoIncrement(this) : a);
                return this
            };
            c.prototype.destroy = function() {
                function e() {
                    if (a.graphic || a.dataLabel || a.dataLabels) z(a), a.destroyElements();
                    for (l in a) a[l] =
                        null
                }
                var a = this,
                    g = a.series,
                    c = g.chart;
                g = g.options.dataSorting;
                var d = c.hoverPoints,
                    b = u(a.series.chart.renderer.globalAnimation),
                    l;
                a.legendItem && c.legend.destroyItem(a);
                d && (a.setState(), A(d, a), d.length || (c.hoverPoints = null));
                if (a === c.hoverPoint) a.onMouseOut();
                g && g.enabled ? (this.animateBeforeDestroy(), m(e, b.duration)) : e();
                c.pointCount--
            };
            c.prototype.destroyElements = function(e) {
                var a = this;
                e = a.getGraphicalProps(e);
                e.singular.forEach(function(e) {
                    a[e] = a[e].destroy()
                });
                e.plural.forEach(function(e) {
                    a[e].forEach(function(a) {
                        a.element &&
                            a.destroy()
                    });
                    delete a[e]
                })
            };
            c.prototype.firePointEvent = function(e, a, g) {
                var c = this,
                    d = this.series.options;
                (d.point.events[e] || c.options && c.options.events && c.options.events[e]) && c.importEvents();
                "click" === e && d.allowPointSelect && (g = function(a) {
                    c.select && c.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                p(c, e, a, g)
            };
            c.prototype.getClassName = function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") +
                    ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            };
            c.prototype.getGraphicalProps = function(e) {
                var a = this,
                    g = [],
                    c, d = {
                        singular: [],
                        plural: []
                    };
                e = e || {
                    graphic: 1,
                    dataLabel: 1
                };
                e.graphic && g.push("graphic", "shadowGroup");
                e.dataLabel && g.push("dataLabel", "dataLabelUpper", "connector");
                for (c = g.length; c--;) {
                    var b = g[c];
                    a[b] && d.singular.push(b)
                }["dataLabel",
                    "connector"
                ].forEach(function(b) {
                    var g = b + "s";
                    e[b] && a[g] && d.plural.push(g)
                });
                return d
            };
            c.prototype.getLabelConfig = function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            };
            c.prototype.getNestedProperty = function(e) {
                if (e) return 0 === e.indexOf("custom.") ? C(e, this.options) : this[e]
            };
            c.prototype.getZone = function() {
                var e = this.series,
                    a = e.zones;
                e = e.zoneAxis ||
                    "y";
                var g = 0,
                    c;
                for (c = a[g]; this[e] >= c.value;) c = a[++g];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = c && c.color && !this.options.color ? c.color : this.nonZonedColor;
                return c
            };
            c.prototype.hasNewShapeType = function() {
                return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType
            };
            c.prototype.init = function(e, a, g) {
                this.series = e;
                this.applyOptions(a, g);
                this.id = q(this.id) ? this.id : w();
                this.resolveColor();
                e.chart.pointCount++;
                p(this, "afterInit");
                return this
            };
            c.prototype.optionsToObject =
                function(e) {
                    var a = {},
                        g = this.series,
                        h = g.options.keys,
                        d = h || g.pointArrayMap || ["y"],
                        b = d.length,
                        l = 0,
                        k = 0;
                    if (D(e) || null === e) a[d[0]] = e;
                    else if (F(e))
                        for (!h && e.length > b && (g = typeof e[0], "string" === g ? a.name = e[0] : "number" === g && (a.x = e[0]), l++); k < b;) h && "undefined" === typeof e[l] || (0 < d[k].indexOf(".") ? c.prototype.setNestedProperty(a, e[l], d[k]) : a[d[k]] = e[l]), l++, k++;
                    else "object" === typeof e && (a = e, e.dataLabels && (g._hasPointLabels = !0), e.marker && (g._hasPointMarkers = !0));
                    return a
                };
            c.prototype.resolveColor = function() {
                var e =
                    this.series;
                var a = e.chart.options.chart.colorCount;
                var g = e.chart.styledMode;
                g || this.options.color || (this.color = e.color);
                e.options.colorByPoint ? (g || (a = e.options.colors || e.chart.options.colors, this.color = this.color || a[e.colorCounter], a = a.length), g = e.colorCounter, e.colorCounter++, e.colorCounter === a && (e.colorCounter = 0)) : g = e.colorIndex;
                this.colorIndex = x(this.colorIndex, g)
            };
            c.prototype.setNestedProperty = function(e, a, g) {
                g.split(".").reduce(function(e, d, b, g) {
                        e[d] = g.length - 1 === b ? a : k(e[d], !0) ? e[d] : {};
                        return e[d]
                    },
                    e);
                return e
            };
            c.prototype.tooltipFormatter = function(e) {
                var a = this.series,
                    g = a.tooltipOptions,
                    c = x(g.valueDecimals, ""),
                    d = g.valuePrefix || "",
                    b = g.valueSuffix || "";
                a.chart.styledMode && (e = a.chart.tooltip.styledModeFormat(e));
                (a.pointArrayMap || ["y"]).forEach(function(a) {
                    a = "{point." + a;
                    if (d || b) e = e.replace(RegExp(a + "}", "g"), d + a + "}" + b);
                    e = e.replace(RegExp(a + "}", "g"), a + ":,." + c + "f}")
                });
                return M(e, {
                    point: this,
                    series: this.series
                }, a.chart)
            };
            return c
        }();
        c.Point = f;
        return c.Point
    });
    O(u, "parts/Series.js", [u["parts/Globals.js"],
        u["mixins/legend-symbol.js"], u["parts/Point.js"], u["parts/Utilities.js"]
    ], function(c, f, u, q) {
        "";
        var A = q.addEvent,
            t = q.animObject,
            G = q.arrayMax,
            C = q.arrayMin,
            F = q.clamp,
            D = q.correctFloat,
            k = q.defined,
            m = q.erase,
            x = q.error,
            z = q.extend,
            w = q.find,
            p = q.fireEvent,
            K = q.getNestedProperty,
            e = q.isArray,
            a = q.isFunction,
            g = q.isNumber,
            h = q.isString,
            d = q.merge,
            b = q.objectEach,
            l = q.pick,
            y = q.removeEvent,
            r = q.seriesType,
            v = q.splat,
            I = q.syncTimeout,
            L = c.defaultOptions,
            Q = c.defaultPlotOptions,
            N = c.seriesTypes,
            R = c.SVGElement,
            B = c.win;
        c.Series =
            r("line", null, {
                lineWidth: 2,
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {
                    duration: 1E3
                },
                events: {},
                marker: {
                    enabledThreshold: 2,
                    lineColor: "#ffffff",
                    lineWidth: 0,
                    radius: 4,
                    states: {
                        normal: {
                            animation: !0
                        },
                        hover: {
                            animation: {
                                duration: 50
                            },
                            enabled: !0,
                            radiusPlus: 2,
                            lineWidthPlus: 1
                        },
                        select: {
                            fillColor: "#cccccc",
                            lineColor: "#000000",
                            lineWidth: 2
                        }
                    }
                },
                point: {
                    events: {}
                },
                dataLabels: {
                    align: "center",
                    formatter: function() {
                        var a = this.series.chart.numberFormatter;
                        return "number" !== typeof this.y ? "" : a(this.y, -1)
                    },
                    padding: 5,
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "contrast",
                        textOutline: "1px contrast"
                    },
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0
                },
                cropThreshold: 300,
                opacity: 1,
                pointRange: 0,
                softThreshold: !0,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        lineWidthPlus: 1,
                        marker: {},
                        halo: {
                            size: 10,
                            opacity: .25
                        }
                    },
                    select: {
                        animation: {
                            duration: 0
                        }
                    },
                    inactive: {
                        animation: {
                            duration: 50
                        },
                        opacity: .2
                    }
                },
                stickyTracking: !0,
                turboThreshold: 1E3,
                findNearestPointBy: "x"
            }, {
                axisTypes: ["xAxis", "yAxis"],
                coll: "series",
                colorCounter: 0,
                cropShoulder: 1,
                directTouch: !1,
                eventsToUnbind: [],
                isCartesian: !0,
                parallelArrays: ["x", "y"],
                pointClass: u,
                requireSorting: !0,
                sorted: !0,
                init: function(d, e) {
                    p(this, "init", {
                        options: e
                    });
                    var g = this,
                        c = d.series,
                        n;
                    this.eventOptions = this.eventOptions || {};
                    g.chart = d;
                    g.options = e = g.setOptions(e);
                    g.linkedSeries = [];
                    g.bindAxes();
                    z(g, {
                        name: e.name,
                        state: "",
                        visible: !1 !== e.visible,
                        selected: !0 === e.selected
                    });
                    var h = e.events;
                    b(h, function(b, d) {
                        a(b) && g.eventOptions[d] !== b && (a(g.eventOptions[d]) && y(g, d, g.eventOptions[d]), g.eventOptions[d] = b, A(g, d, b))
                    });
                    if (h && h.click || e.point &&
                        e.point.events && e.point.events.click || e.allowPointSelect) d.runTrackerClick = !0;
                    g.getColor();
                    g.getSymbol();
                    g.parallelArrays.forEach(function(a) {
                        g[a + "Data"] || (g[a + "Data"] = [])
                    });
                    g.isCartesian && (d.hasCartesianSeries = !0);
                    c.length && (n = c[c.length - 1]);
                    g._i = l(n && n._i, -1) + 1;
                    d.orderSeries(this.insert(c));
                    e.dataSorting && e.dataSorting.enabled ? g.setDataSortingOptions() : g.points || g.data || g.setData(e.data, !1);
                    p(this, "afterInit")
                },
                is: function(a) {
                    return N[a] && this instanceof N[a]
                },
                insert: function(a) {
                    var b = this.options.index,
                        d;
                    if (g(b)) {
                        for (d = a.length; d--;)
                            if (b >= l(a[d].options.index, a[d]._i)) {
                                a.splice(d + 1, 0, this);
                                break
                            } - 1 === d && a.unshift(this);
                        d += 1
                    } else a.push(this);
                    return l(d, a.length - 1)
                },
                bindAxes: function() {
                    var a = this,
                        b = a.options,
                        d = a.chart,
                        e;
                    p(this, "bindAxes", null, function() {
                        (a.axisTypes || []).forEach(function(g) {
                            d[g].forEach(function(d) {
                                e = d.options;
                                if (b[g] === e.index || "undefined" !== typeof b[g] && b[g] === e.id || "undefined" === typeof b[g] && 0 === e.index) a.insert(d.series), a[g] = d, d.isDirty = !0
                            });
                            a[g] || a.optionalAxis === g || x(18, !0,
                                d)
                        })
                    });
                    p(this, "afterBindAxes")
                },
                updateParallelArrays: function(a, b) {
                    var d = a.series,
                        e = arguments,
                        c = g(b) ? function(e) {
                            var g = "y" === e && d.toYData ? d.toYData(a) : a[e];
                            d[e + "Data"][b] = g
                        } : function(a) {
                            Array.prototype[b].apply(d[a + "Data"], Array.prototype.slice.call(e, 2))
                        };
                    d.parallelArrays.forEach(c)
                },
                hasData: function() {
                    return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length
                },
                autoIncrement: function() {
                    var a = this.options,
                        b = this.xIncrement,
                        d, e = a.pointIntervalUnit,
                        g = this.chart.time;
                    b = l(b, a.pointStart, 0);
                    this.pointInterval = d = l(this.pointInterval, a.pointInterval, 1);
                    e && (a = new g.Date(b), "day" === e ? g.set("Date", a, g.get("Date", a) + d) : "month" === e ? g.set("Month", a, g.get("Month", a) + d) : "year" === e && g.set("FullYear", a, g.get("FullYear", a) + d), d = a.getTime() - b);
                    this.xIncrement = b + d;
                    return b
                },
                setDataSortingOptions: function() {
                    var a = this.options;
                    z(this, {
                        requireSorting: !1,
                        sorted: !1,
                        enabledDataSorting: !0,
                        allowDG: !1
                    });
                    k(a.pointRange) || (a.pointRange = 1)
                },
                setOptions: function(a) {
                    var b =
                        this.chart,
                        e = b.options,
                        g = e.plotOptions,
                        c = b.userOptions || {};
                    a = d(a);
                    b = b.styledMode;
                    var n = {
                        plotOptions: g,
                        userOptions: a
                    };
                    p(this, "setOptions", n);
                    var h = n.plotOptions[this.type],
                        f = c.plotOptions || {};
                    this.userOptions = n.userOptions;
                    c = d(h, g.series, c.plotOptions && c.plotOptions[this.type], a);
                    this.tooltipOptions = d(L.tooltip, L.plotOptions.series && L.plotOptions.series.tooltip, L.plotOptions[this.type].tooltip, e.tooltip.userOptions, g.series && g.series.tooltip, g[this.type].tooltip, a.tooltip);
                    this.stickyTracking = l(a.stickyTracking,
                        f[this.type] && f[this.type].stickyTracking, f.series && f.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : c.stickyTracking);
                    null === h.marker && delete c.marker;
                    this.zoneAxis = c.zoneAxis;
                    e = this.zones = (c.zones || []).slice();
                    !c.negativeColor && !c.negativeFillColor || c.zones || (g = {
                        value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
                        className: "highcharts-negative"
                    }, b || (g.color = c.negativeColor, g.fillColor = c.negativeFillColor), e.push(g));
                    e.length && k(e[e.length - 1].value) && e.push(b ? {} : {
                        color: this.color,
                        fillColor: this.fillColor
                    });
                    p(this, "afterSetOptions", {
                        options: c
                    });
                    return c
                },
                getName: function() {
                    return l(this.options.name, "Series " + (this.index + 1))
                },
                getCyclic: function(a, b, d) {
                    var e = this.chart,
                        g = this.userOptions,
                        c = a + "Index",
                        h = a + "Counter",
                        n = d ? d.length : l(e.options.chart[a + "Count"], e[a + "Count"]);
                    if (!b) {
                        var f = l(g[c], g["_" + c]);
                        k(f) || (e.series.length || (e[h] = 0), g["_" + c] = f = e[h] % n, e[h] += 1);
                        d && (b = d[f])
                    }
                    "undefined" !== typeof f && (this[c] = f);
                    this[a] = b
                },
                getColor: function() {
                    this.chart.styledMode ? this.getCyclic("color") :
                        this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || Q[this.type].color, this.chart.options.colors)
                },
                getPointsCollection: function() {
                    return (this.hasGroupedData ? this.points : this.data) || []
                },
                getSymbol: function() {
                    this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
                },
                findPointIndex: function(a, b) {
                    var d = a.id,
                        e = a.x,
                        c = this.points,
                        h, n = this.options.dataSorting;
                    if (d) var l = this.chart.get(d);
                    else if (this.linkedParent || this.enabledDataSorting) {
                        var k =
                            n && n.matchByName ? "name" : "index";
                        l = w(c, function(b) {
                            return !b.touched && b[k] === a[k]
                        });
                        if (!l) return
                    }
                    if (l) {
                        var f = l && l.index;
                        "undefined" !== typeof f && (h = !0)
                    }
                    "undefined" === typeof f && g(e) && (f = this.xData.indexOf(e, b)); - 1 !== f && "undefined" !== typeof f && this.cropped && (f = f >= this.cropStart ? f - this.cropStart : f);
                    !h && c[f] && c[f].touched && (f = void 0);
                    return f
                },
                drawLegendSymbol: f.drawLineMarker,
                updateData: function(a, b) {
                    var d = this.options,
                        e = d.dataSorting,
                        c = this.points,
                        h = [],
                        n, l, f, p = this.requireSorting,
                        m = a.length === c.length,
                        r = !0;
                    this.xIncrement = null;
                    a.forEach(function(a, b) {
                        var l = k(a) && this.pointClass.prototype.optionsToObject.call({
                            series: this
                        }, a) || {};
                        var r = l.x;
                        if (l.id || g(r)) {
                            if (r = this.findPointIndex(l, f), -1 === r || "undefined" === typeof r ? h.push(a) : c[r] && a !== d.data[r] ? (c[r].update(a, !1, null, !1), c[r].touched = !0, p && (f = r + 1)) : c[r] && (c[r].touched = !0), !m || b !== r || e && e.enabled || this.hasDerivedData) n = !0
                        } else h.push(a)
                    }, this);
                    if (n)
                        for (a = c.length; a--;)(l = c[a]) && !l.touched && l.remove && l.remove(!1, b);
                    else !m || e && e.enabled ? r = !1 : (a.forEach(function(a,
                        b) {
                        c[b].update && a !== c[b].y && c[b].update(a, !1, null, !1)
                    }), h.length = 0);
                    c.forEach(function(a) {
                        a && (a.touched = !1)
                    });
                    if (!r) return !1;
                    h.forEach(function(a) {
                        this.addPoint(a, !1, null, null, !1)
                    }, this);
                    null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = G(this.xData), this.autoIncrement());
                    return !0
                },
                setData: function(a, b, d, c) {
                    var n = this,
                        k = n.points,
                        f = k && k.length || 0,
                        p, m = n.options,
                        r = n.chart,
                        v = m.dataSorting,
                        y = null,
                        H = n.xAxis;
                    y = m.turboThreshold;
                    var q = this.xData,
                        J = this.yData,
                        B = (p = n.pointArrayMap) && p.length,
                        w = m.keys,
                        I = 0,
                        z = 1,
                        L;
                    a = a || [];
                    p = a.length;
                    b = l(b, !0);
                    v && v.enabled && (a = this.sortData(a));
                    !1 !== c && p && f && !n.cropped && !n.hasGroupedData && n.visible && !n.isSeriesBoosting && (L = this.updateData(a, d));
                    if (!L) {
                        n.xIncrement = null;
                        n.colorCounter = 0;
                        this.parallelArrays.forEach(function(a) {
                            n[a + "Data"].length = 0
                        });
                        if (y && p > y)
                            if (y = n.getFirstValidPoint(a), g(y))
                                for (d = 0; d < p; d++) q[d] = this.autoIncrement(), J[d] = a[d];
                            else if (e(y))
                            if (B)
                                for (d = 0; d < p; d++) c = a[d], q[d] = c[0], J[d] = c.slice(1, B + 1);
                            else
                                for (w && (I = w.indexOf("x"), z = w.indexOf("y"),
                                        I = 0 <= I ? I : 0, z = 0 <= z ? z : 1), d = 0; d < p; d++) c = a[d], q[d] = c[I], J[d] = c[z];
                        else x(12, !1, r);
                        else
                            for (d = 0; d < p; d++) "undefined" !== typeof a[d] && (c = {
                                series: n
                            }, n.pointClass.prototype.applyOptions.apply(c, [a[d]]), n.updateParallelArrays(c, d));
                        J && h(J[0]) && x(14, !0, r);
                        n.data = [];
                        n.options.data = n.userOptions.data = a;
                        for (d = f; d--;) k[d] && k[d].destroy && k[d].destroy();
                        H && (H.minRange = H.userMinRange);
                        n.isDirty = r.isDirtyBox = !0;
                        n.isDirtyData = !!k;
                        d = !1
                    }
                    "point" === m.legendType && (this.processData(), this.generatePoints());
                    b && r.redraw(d)
                },
                sortData: function(a) {
                    var b = this,
                        d = b.options.dataSorting.sortKey || "y",
                        e = function(a, b) {
                            return k(b) && a.pointClass.prototype.optionsToObject.call({
                                series: a
                            }, b) || {}
                        };
                    a.forEach(function(d, g) {
                        a[g] = e(b, d);
                        a[g].index = g
                    }, this);
                    a.concat().sort(function(a, b) {
                        a = K(d, a);
                        b = K(d, b);
                        return b < a ? -1 : b > a ? 1 : 0
                    }).forEach(function(a, b) {
                        a.x = b
                    }, this);
                    b.linkedSeries && b.linkedSeries.forEach(function(b) {
                        var d = b.options,
                            g = d.data;
                        d.dataSorting && d.dataSorting.enabled || !g || (g.forEach(function(d, c) {
                            g[c] = e(b, d);
                            a[c] && (g[c].x = a[c].x, g[c].index =
                                c)
                        }), b.setData(g, !1))
                    });
                    return a
                },
                processData: function(a) {
                    var b = this.xData,
                        d = this.yData,
                        e = b.length;
                    var g = 0;
                    var c = this.xAxis,
                        h = this.options;
                    var n = h.cropThreshold;
                    var l = this.getExtremesFromAll || h.getExtremesFromAll,
                        k = this.isCartesian;
                    h = c && c.val2lin;
                    var f = c && c.isLog,
                        p = this.requireSorting;
                    if (k && !this.isDirty && !c.isDirty && !this.yAxis.isDirty && !a) return !1;
                    if (c) {
                        a = c.getExtremes();
                        var m = a.min;
                        var r = a.max
                    }
                    if (k && this.sorted && !l && (!n || e > n || this.forceCrop))
                        if (b[e - 1] < m || b[0] > r) b = [], d = [];
                        else if (this.yData && (b[0] <
                            m || b[e - 1] > r)) {
                        g = this.cropData(this.xData, this.yData, m, r);
                        b = g.xData;
                        d = g.yData;
                        g = g.start;
                        var v = !0
                    }
                    for (n = b.length || 1; --n;)
                        if (e = f ? h(b[n]) - h(b[n - 1]) : b[n] - b[n - 1], 0 < e && ("undefined" === typeof y || e < y)) var y = e;
                        else 0 > e && p && (x(15, !1, this.chart), p = !1);
                    this.cropped = v;
                    this.cropStart = g;
                    this.processedXData = b;
                    this.processedYData = d;
                    this.closestPointRange = this.basePointRange = y
                },
                cropData: function(a, b, d, e, g) {
                    var c = a.length,
                        h = 0,
                        n = c,
                        k;
                    g = l(g, this.cropShoulder);
                    for (k = 0; k < c; k++)
                        if (a[k] >= d) {
                            h = Math.max(0, k - g);
                            break
                        }
                    for (d = k; d <
                        c; d++)
                        if (a[d] > e) {
                            n = d + g;
                            break
                        }
                    return {
                        xData: a.slice(h, n),
                        yData: b.slice(h, n),
                        start: h,
                        end: n
                    }
                },
                generatePoints: function() {
                    var a = this.options,
                        b = a.data,
                        d = this.data,
                        e, g = this.processedXData,
                        c = this.processedYData,
                        h = this.pointClass,
                        l = g.length,
                        k = this.cropStart || 0,
                        f = this.hasGroupedData;
                    a = a.keys;
                    var m = [],
                        r;
                    d || f || (d = [], d.length = b.length, d = this.data = d);
                    a && f && (this.options.keys = !1);
                    for (r = 0; r < l; r++) {
                        var y = k + r;
                        if (f) {
                            var q = (new h).init(this, [g[r]].concat(v(c[r])));
                            q.dataGroup = this.groupMap[r];
                            q.dataGroup.options && (q.options =
                                q.dataGroup.options, z(q, q.dataGroup.options), delete q.dataLabels)
                        } else(q = d[y]) || "undefined" === typeof b[y] || (d[y] = q = (new h).init(this, b[y], g[r]));
                        q && (q.index = y, m[r] = q)
                    }
                    this.options.keys = a;
                    if (d && (l !== (e = d.length) || f))
                        for (r = 0; r < e; r++) r !== k || f || (r += l), d[r] && (d[r].destroyElements(), d[r].plotX = void 0);
                    this.data = d;
                    this.points = m;
                    p(this, "afterGeneratePoints")
                },
                getXExtremes: function(a) {
                    return {
                        min: C(a),
                        max: G(a)
                    }
                },
                getExtremes: function(a) {
                    var b = this.xAxis,
                        d = this.yAxis,
                        c = this.processedXData || this.xData,
                        h = [],
                        n =
                        0,
                        l = 0;
                    var k = 0;
                    var f = this.requireSorting ? this.cropShoulder : 0,
                        m = d ? d.positiveValuesOnly : !1,
                        r;
                    a = a || this.stackedYData || this.processedYData || [];
                    d = a.length;
                    b && (k = b.getExtremes(), l = k.min, k = k.max);
                    for (r = 0; r < d; r++) {
                        var v = c[r];
                        var y = a[r];
                        var q = (g(y) || e(y)) && (y.length || 0 < y || !m);
                        v = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !b || (c[r + f] || v) >= l && (c[r - f] || v) <= k;
                        if (q && v)
                            if (q = y.length)
                                for (; q--;) g(y[q]) && (h[n++] = y[q]);
                            else h[n++] = y
                    }
                    this.dataMin = C(h);
                    this.dataMax = G(h);
                    p(this, "afterGetExtremes")
                },
                getFirstValidPoint: function(a) {
                    for (var b = null, d = a.length, e = 0; null === b && e < d;) b = a[e], e++;
                    return b
                },
                translate: function() {
                    this.processedXData || this.processData();
                    this.generatePoints();
                    var a = this.options,
                        b = a.stacking,
                        d = this.xAxis,
                        c = d.categories,
                        h = this.enabledDataSorting,
                        f = this.yAxis,
                        m = this.points,
                        r = m.length,
                        v = !!this.modifyValue,
                        y, q = this.pointPlacementToXValue(),
                        x = !!q,
                        w = a.threshold,
                        B = a.startFromThreshold ? w : 0,
                        I, z = this.zoneAxis || "y",
                        L = Number.MAX_VALUE;
                    for (y = 0; y < r; y++) {
                        var t = m[y],
                            N = t.x;
                        var R = t.y;
                        var K = t.low,
                            A = b && f.stacks[(this.negStacks && R < (B ? 0 : w) ? "-" : "") + this.stackKey];
                        f.positiveValuesOnly && null !== R && 0 >= R && (t.isNull = !0);
                        t.plotX = I = D(F(d.translate(N, 0, 0, 0, 1, q, "flags" === this.type), -1E5, 1E5));
                        if (b && this.visible && A && A[N]) {
                            var Q = this.getStackIndicator(Q, N, this.index);
                            if (!t.isNull) {
                                var u = A[N];
                                var C = u.points[Q.key]
                            }
                        }
                        e(C) && (K = C[0], R = C[1], K === B && Q.key === A[N].base && (K = l(g(w) && w, f.min)), f.positiveValuesOnly && 0 >= K && (K = null), t.total = t.stackTotal = u.total, t.percentage = u.total && t.y / u.total * 100, t.stackY = R, this.irregularWidths ||
                            u.setOffset(this.pointXOffset || 0, this.barW || 0));
                        t.yBottom = k(K) ? F(f.translate(K, 0, 1, 0, 1), -1E5, 1E5) : null;
                        v && (R = this.modifyValue(R, t));
                        t.plotY = R = "number" === typeof R && Infinity !== R ? F(f.translate(R, 0, 1, 0, 1), -1E5, 1E5) : void 0;
                        t.isInside = "undefined" !== typeof R && 0 <= R && R <= f.len && 0 <= I && I <= d.len;
                        t.clientX = x ? D(d.translate(N, 0, 0, 0, 1, q)) : I;
                        t.negative = t[z] < (a[z + "Threshold"] || w || 0);
                        t.category = c && "undefined" !== typeof c[t.x] ? c[t.x] : t.x;
                        if (!t.isNull && !1 !== t.visible) {
                            "undefined" !== typeof G && (L = Math.min(L, Math.abs(I - G)));
                            var G = I
                        }
                        t.zone = this.zones.length && t.getZone();
                        !t.graphic && this.group && h && (t.isNew = !0)
                    }
                    this.closestPointRangePx = L;
                    p(this, "afterTranslate")
                },
                getValidPoints: function(a, b, d) {
                    var e = this.chart;
                    return (a || this.points || []).filter(function(a) {
                        return b && !e.isInsidePlot(a.plotX, a.plotY, e.inverted) ? !1 : !1 !== a.visible && (d || !a.isNull)
                    })
                },
                getClipBox: function(a, b) {
                    var d = this.options,
                        e = this.chart,
                        g = e.inverted,
                        c = this.xAxis,
                        h = c && this.yAxis;
                    a && !1 === d.clip && h ? a = g ? {
                        y: -e.chartWidth + h.len + h.pos,
                        height: e.chartWidth,
                        width: e.chartHeight,
                        x: -e.chartHeight + c.len + c.pos
                    } : {
                        y: -h.pos,
                        height: e.chartHeight,
                        width: e.chartWidth,
                        x: -c.pos
                    } : (a = this.clipBox || e.clipBox, b && (a.width = e.plotSizeX, a.x = 0));
                    return b ? {
                        width: a.width,
                        x: a.x
                    } : a
                },
                setClip: function(a) {
                    var b = this.chart,
                        d = this.options,
                        e = b.renderer,
                        g = b.inverted,
                        c = this.clipBox,
                        h = this.getClipBox(a),
                        l = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, h.height, d.xAxis, d.yAxis].join(),
                        n = b[l],
                        k = b[l + "m"];
                    n || (a && (h.width = 0, g && (h.x = b.plotSizeX + (!1 !== d.clip ? 0 : b.plotTop)), b[l + "m"] = k = e.clipRect(g ? b.plotSizeX +
                        99 : -99, g ? -b.plotLeft : -b.plotTop, 99, g ? b.chartWidth : b.chartHeight)), b[l] = n = e.clipRect(h), n.count = {
                        length: 0
                    });
                    a && !n.count[this.index] && (n.count[this.index] = !0, n.count.length += 1);
                    if (!1 !== d.clip || a) this.group.clip(a || c ? n : b.clipRect), this.markerGroup.clip(k), this.sharedClipKey = l;
                    a || (n.count[this.index] && (delete n.count[this.index], --n.count.length), 0 === n.count.length && l && b[l] && (c || (b[l] = b[l].destroy()), b[l + "m"] && (b[l + "m"] = b[l + "m"].destroy())))
                },
                animate: function(a) {
                    var b = this.chart,
                        d = t(this.options.animation);
                    if (a) this.setClip(d);
                    else {
                        var e = this.sharedClipKey;
                        a = b[e];
                        var g = this.getClipBox(d, !0);
                        a && a.animate(g, d);
                        b[e + "m"] && b[e + "m"].animate({
                            width: g.width + 99,
                            x: g.x - (b.inverted ? 0 : 99)
                        }, d);
                        this.animate = null
                    }
                },
                afterAnimate: function() {
                    this.setClip();
                    p(this, "afterAnimate");
                    this.finishedAnimating = !0
                },
                drawPoints: function() {
                    var a = this.points,
                        b = this.chart,
                        d, e, g = this.options.marker,
                        c = this[this.specialGroup] || this.markerGroup,
                        h = this.xAxis,
                        k = l(g.enabled, !h || h.isRadial ? !0 : null, this.closestPointRangePx >= g.enabledThreshold *
                            g.radius);
                    if (!1 !== g.enabled || this._hasPointMarkers)
                        for (d = 0; d < a.length; d++) {
                            var f = a[d];
                            var p = (e = f.graphic) ? "animate" : "attr";
                            var m = f.marker || {};
                            var r = !!f.marker;
                            if ((k && "undefined" === typeof m.enabled || m.enabled) && !f.isNull && !1 !== f.visible) {
                                var v = l(m.symbol, this.symbol);
                                var y = this.markerAttribs(f, f.selected && "select");
                                this.enabledDataSorting && (f.startXPos = h.reversed ? -y.width : h.width);
                                var q = !1 !== f.isInside;
                                e ? e[q ? "show" : "hide"](q).animate(y) : q && (0 < y.width || f.hasImage) && (f.graphic = e = b.renderer.symbol(v,
                                    y.x, y.y, y.width, y.height, r ? m : g).add(c), this.enabledDataSorting && b.hasRendered && (e.attr({
                                    x: f.startXPos
                                }), p = "animate"));
                                e && "animate" === p && e[q ? "show" : "hide"](q).animate(y);
                                if (e && !b.styledMode) e[p](this.pointAttribs(f, f.selected && "select"));
                                e && e.addClass(f.getClassName(), !0)
                            } else e && (f.graphic = e.destroy())
                        }
                },
                markerAttribs: function(a, b) {
                    var d = this.options.marker,
                        e = a.marker || {},
                        g = e.symbol || d.symbol,
                        c = l(e.radius, d.radius);
                    b && (d = d.states[b], b = e.states && e.states[b], c = l(b && b.radius, d && d.radius, c + (d && d.radiusPlus ||
                        0)));
                    a.hasImage = g && 0 === g.indexOf("url");
                    a.hasImage && (c = 0);
                    a = {
                        x: Math.floor(a.plotX) - c,
                        y: a.plotY - c
                    };
                    c && (a.width = a.height = 2 * c);
                    return a
                },
                pointAttribs: function(a, b) {
                    var d = this.options.marker,
                        e = a && a.options,
                        g = e && e.marker || {},
                        c = this.color,
                        h = e && e.color,
                        n = a && a.color;
                    e = l(g.lineWidth, d.lineWidth);
                    var k = a && a.zone && a.zone.color;
                    a = 1;
                    c = h || k || n || c;
                    h = g.fillColor || d.fillColor || c;
                    c = g.lineColor || d.lineColor || c;
                    b = b || "normal";
                    d = d.states[b];
                    b = g.states && g.states[b] || {};
                    e = l(b.lineWidth, d.lineWidth, e + l(b.lineWidthPlus, d.lineWidthPlus,
                        0));
                    h = b.fillColor || d.fillColor || h;
                    c = b.lineColor || d.lineColor || c;
                    a = l(b.opacity, d.opacity, a);
                    return {
                        stroke: c,
                        "stroke-width": e,
                        fill: h,
                        opacity: a
                    }
                },
                destroy: function(a) {
                    var d = this,
                        e = d.chart,
                        g = /AppleWebKit\/533/.test(B.navigator.userAgent),
                        c, h, l = d.data || [],
                        n, k;
                    p(d, "destroy");
                    this.removeEvents(a);
                    (d.axisTypes || []).forEach(function(a) {
                        (k = d[a]) && k.series && (m(k.series, d), k.isDirty = k.forceRedraw = !0)
                    });
                    d.legendItem && d.chart.legend.destroyItem(d);
                    for (h = l.length; h--;)(n = l[h]) && n.destroy && n.destroy();
                    d.points = null;
                    q.clearTimeout(d.animationTimeout);
                    b(d, function(a, b) {
                        a instanceof R && !a.survive && (c = g && "group" === b ? "hide" : "destroy", a[c]())
                    });
                    e.hoverSeries === d && (e.hoverSeries = null);
                    m(e.series, d);
                    e.orderSeries();
                    b(d, function(b, e) {
                        a && "hcEvents" === e || delete d[e]
                    })
                },
                getGraphPath: function(a, b, d) {
                    var e = this,
                        g = e.options,
                        c = g.step,
                        h, l = [],
                        n = [],
                        f;
                    a = a || e.points;
                    (h = a.reversed) && a.reverse();
                    (c = {
                        right: 1,
                        center: 2
                    }[c] || c && 3) && h && (c = 4 - c);
                    a = this.getValidPoints(a, !1, !(g.connectNulls && !b && !d));
                    a.forEach(function(h, p) {
                        var m = h.plotX,
                            r = h.plotY,
                            v = a[p - 1];
                        (h.leftCliff || v && v.rightCliff) && !d && (f = !0);
                        h.isNull && !k(b) && 0 < p ? f = !g.connectNulls : h.isNull && !b ? f = !0 : (0 === p || f ? p = ["M", h.plotX, h.plotY] : e.getPointSpline ? p = e.getPointSpline(a, h, p) : c ? (p = 1 === c ? ["L", v.plotX, r] : 2 === c ? ["L", (v.plotX + m) / 2, v.plotY, "L", (v.plotX + m) / 2, r] : ["L", m, v.plotY], p.push("L", m, r)) : p = ["L", m, r], n.push(h.x), c && (n.push(h.x), 2 === c && n.push(h.x)), l.push.apply(l, p), f = !1)
                    });
                    l.xMap = n;
                    return e.graphPath = l
                },
                drawGraph: function() {
                    var a = this,
                        b = this.options,
                        d = (this.gappedPath || this.getGraphPath).call(this),
                        e = this.chart.styledMode,
                        g = [
                            ["graph", "highcharts-graph"]
                        ];
                    e || g[0].push(b.lineColor || this.color || "#cccccc", b.dashStyle);
                    g = a.getZonesGraphs(g);
                    g.forEach(function(g, c) {
                        var h = g[0],
                            l = a[h],
                            n = l ? "animate" : "attr";
                        l ? (l.endX = a.preventGraphAnimation ? null : d.xMap, l.animate({
                            d: d
                        })) : d.length && (a[h] = l = a.chart.renderer.path(d).addClass(g[1]).attr({
                            zIndex: 1
                        }).add(a.group));
                        l && !e && (h = {
                            stroke: g[2],
                            "stroke-width": b.lineWidth,
                            fill: a.fillGraph && a.color || "none"
                        }, g[3] ? h.dashstyle = g[3] : "square" !== b.linecap && (h["stroke-linecap"] =
                            h["stroke-linejoin"] = "round"), l[n](h).shadow(2 > c && b.shadow));
                        l && (l.startX = d.xMap, l.isArea = d.isArea)
                    })
                },
                getZonesGraphs: function(a) {
                    this.zones.forEach(function(b, d) {
                        d = ["zone-graph-" + d, "highcharts-graph highcharts-zone-graph-" + d + " " + (b.className || "")];
                        this.chart.styledMode || d.push(b.color || this.color, b.dashStyle || this.options.dashStyle);
                        a.push(d)
                    }, this);
                    return a
                },
                applyZones: function() {
                    var a = this,
                        b = this.chart,
                        d = b.renderer,
                        e = this.zones,
                        g, c, h = this.clips || [],
                        k, f = this.graph,
                        p = this.area,
                        m = Math.max(b.chartWidth,
                            b.chartHeight),
                        r = this[(this.zoneAxis || "y") + "Axis"],
                        v = b.inverted,
                        y, q, x, w = !1;
                    if (e.length && (f || p) && r && "undefined" !== typeof r.min) {
                        var B = r.reversed;
                        var I = r.horiz;
                        f && !this.showLine && f.hide();
                        p && p.hide();
                        var z = r.getExtremes();
                        e.forEach(function(e, n) {
                            g = B ? I ? b.plotWidth : 0 : I ? 0 : r.toPixels(z.min) || 0;
                            g = F(l(c, g), 0, m);
                            c = F(Math.round(r.toPixels(l(e.value, z.max), !0) || 0), 0, m);
                            w && (g = c = r.toPixels(z.max));
                            y = Math.abs(g - c);
                            q = Math.min(g, c);
                            x = Math.max(g, c);
                            r.isXAxis ? (k = {
                                x: v ? x : q,
                                y: 0,
                                width: y,
                                height: m
                            }, I || (k.x = b.plotHeight -
                                k.x)) : (k = {
                                x: 0,
                                y: v ? x : q,
                                width: m,
                                height: y
                            }, I && (k.y = b.plotWidth - k.y));
                            v && d.isVML && (k = r.isXAxis ? {
                                x: 0,
                                y: B ? q : x,
                                height: k.width,
                                width: b.chartWidth
                            } : {
                                x: k.y - b.plotLeft - b.spacingBox.x,
                                y: 0,
                                width: k.height,
                                height: b.chartHeight
                            });
                            h[n] ? h[n].animate(k) : h[n] = d.clipRect(k);
                            f && a["zone-graph-" + n].clip(h[n]);
                            p && a["zone-area-" + n].clip(h[n]);
                            w = e.value > z.max;
                            a.resetZones && 0 === c && (c = void 0)
                        });
                        this.clips = h
                    } else a.visible && (f && f.show(!0), p && p.show(!0))
                },
                invertGroups: function(a) {
                    function b() {
                        ["group", "markerGroup"].forEach(function(b) {
                            d[b] &&
                                (e.renderer.isVML && d[b].attr({
                                    width: d.yAxis.len,
                                    height: d.xAxis.len
                                }), d[b].width = d.yAxis.len, d[b].height = d.xAxis.len, d[b].invert(d.isRadialSeries ? !1 : a))
                        })
                    }
                    var d = this,
                        e = d.chart;
                    d.xAxis && (d.eventsToUnbind.push(A(e, "resize", b)), b(), d.invertGroups = b)
                },
                plotGroup: function(a, b, d, e, g) {
                    var c = this[a],
                        h = !c;
                    h && (this[a] = c = this.chart.renderer.g().attr({
                        zIndex: e || .1
                    }).add(g));
                    c.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (k(this.colorIndex) ? "highcharts-color-" + this.colorIndex +
                        " " : "") + (this.options.className || "") + (c.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                    c.attr({
                        visibility: d
                    })[h ? "attr" : "animate"](this.getPlotBox());
                    return c
                },
                getPlotBox: function() {
                    var a = this.chart,
                        b = this.xAxis,
                        d = this.yAxis;
                    a.inverted && (b = d, d = this.xAxis);
                    return {
                        translateX: b ? b.left : a.plotLeft,
                        translateY: d ? d.top : a.plotTop,
                        scaleX: 1,
                        scaleY: 1
                    }
                },
                removeEvents: function(a) {
                    a ? this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function(a) {
                        a()
                    }), this.eventsToUnbind.length = 0) : y(this)
                },
                render: function() {
                    var a =
                        this,
                        b = a.chart,
                        d = a.options,
                        e = !!a.animate && b.renderer.isSVG && t(d.animation).duration,
                        g = a.visible ? "inherit" : "hidden",
                        c = d.zIndex,
                        h = a.hasRendered,
                        l = b.seriesGroup,
                        k = b.inverted;
                    p(this, "render");
                    var f = a.plotGroup("group", "series", g, c, l);
                    a.markerGroup = a.plotGroup("markerGroup", "markers", g, c, l);
                    e && a.animate(!0);
                    f.inverted = a.isCartesian || a.invertable ? k : !1;
                    a.drawGraph && (a.drawGraph(), a.applyZones());
                    a.visible && a.drawPoints();
                    a.drawDataLabels && a.drawDataLabels();
                    a.redrawPoints && a.redrawPoints();
                    a.drawTracker &&
                        !1 !== a.options.enableMouseTracking && a.drawTracker();
                    a.invertGroups(k);
                    !1 === d.clip || a.sharedClipKey || h || f.clip(b.clipRect);
                    e && a.animate();
                    h || (a.animationTimeout = I(function() {
                        a.afterAnimate()
                    }, e || 0));
                    a.isDirty = !1;
                    a.hasRendered = !0;
                    p(a, "afterRender")
                },
                redraw: function() {
                    var a = this.chart,
                        b = this.isDirty || this.isDirtyData,
                        d = this.group,
                        e = this.xAxis,
                        g = this.yAxis;
                    d && (a.inverted && d.attr({
                        width: a.plotWidth,
                        height: a.plotHeight
                    }), d.animate({
                        translateX: l(e && e.left, a.plotLeft),
                        translateY: l(g && g.top, a.plotTop)
                    }));
                    this.translate();
                    this.render();
                    b && delete this.kdTree
                },
                kdAxisArray: ["clientX", "plotY"],
                searchPoint: function(a, b) {
                    var d = this.xAxis,
                        e = this.yAxis,
                        g = this.chart.inverted;
                    return this.searchKDTree({
                        clientX: g ? d.len - a.chartY + d.pos : a.chartX - d.pos,
                        plotY: g ? e.len - a.chartX + e.pos : a.chartY - e.pos
                    }, b, a)
                },
                buildKDTree: function(a) {
                    function b(a, e, g) {
                        var c;
                        if (c = a && a.length) {
                            var h = d.kdAxisArray[e % g];
                            a.sort(function(a, b) {
                                return a[h] - b[h]
                            });
                            c = Math.floor(c / 2);
                            return {
                                point: a[c],
                                left: b(a.slice(0, c), e + 1, g),
                                right: b(a.slice(c + 1),
                                    e + 1, g)
                            }
                        }
                    }
                    this.buildingKdTree = !0;
                    var d = this,
                        e = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    delete d.kdTree;
                    I(function() {
                        d.kdTree = b(d.getValidPoints(null, !d.directTouch), e, e);
                        d.buildingKdTree = !1
                    }, d.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
                },
                searchKDTree: function(a, b, d) {
                    function e(a, b, d, n) {
                        var f = b.point,
                            p = g.kdAxisArray[d % n],
                            m = f;
                        var r = k(a[c]) && k(f[c]) ? Math.pow(a[c] - f[c], 2) : null;
                        var v = k(a[h]) && k(f[h]) ? Math.pow(a[h] - f[h], 2) : null;
                        v = (r || 0) + (v || 0);
                        f.dist = k(v) ? Math.sqrt(v) : Number.MAX_VALUE;
                        f.distX = k(r) ?
                            Math.sqrt(r) : Number.MAX_VALUE;
                        p = a[p] - f[p];
                        v = 0 > p ? "left" : "right";
                        r = 0 > p ? "right" : "left";
                        b[v] && (v = e(a, b[v], d + 1, n), m = v[l] < m[l] ? v : f);
                        b[r] && Math.sqrt(p * p) < m[l] && (a = e(a, b[r], d + 1, n), m = a[l] < m[l] ? a : m);
                        return m
                    }
                    var g = this,
                        c = this.kdAxisArray[0],
                        h = this.kdAxisArray[1],
                        l = b ? "distX" : "dist";
                    b = -1 < g.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    this.kdTree || this.buildingKdTree || this.buildKDTree(d);
                    if (this.kdTree) return e(a, this.kdTree, b, b)
                },
                pointPlacementToXValue: function() {
                    var a = this.options,
                        b = a.pointRange,
                        d = this.xAxis;
                    a = a.pointPlacement;
                    "between" === a && (a = d.reversed ? -.5 : .5);
                    return g(a) ? a * l(b, d.pointRange) : 0
                }
            });
        ""
    });
    O(u, "parts/Stacking.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        var u = f.correctFloat,
            q = f.defined,
            A = f.destroyObjectProperties,
            t = f.format,
            M = f.objectEach,
            C = f.pick;
        f = c.Axis;
        var F = c.Chart,
            D = c.Series;
        c.StackItem = function(c, f, q, z, w) {
            var k = c.chart.inverted;
            this.axis = c;
            this.isNegative = q;
            this.options = f = f || {};
            this.x = z;
            this.total = null;
            this.points = {};
            this.stack = w;
            this.rightCliff = this.leftCliff =
                0;
            this.alignOptions = {
                align: f.align || (k ? q ? "left" : "right" : "center"),
                verticalAlign: f.verticalAlign || (k ? "middle" : q ? "bottom" : "top"),
                y: f.y,
                x: f.x
            };
            this.textAlign = f.textAlign || (k ? q ? "right" : "left" : "center")
        };
        c.StackItem.prototype = {
            destroy: function() {
                A(this, this.axis)
            },
            render: function(c) {
                var k = this.axis.chart,
                    f = this.options,
                    q = f.format;
                q = q ? t(q, this, k) : f.formatter.call(this);
                this.label ? this.label.attr({
                    text: q,
                    visibility: "hidden"
                }) : (this.label = k.renderer.label(q, null, null, f.shape, null, null, f.useHTML, !1, "stack-labels"),
                    q = {
                        text: q,
                        rotation: f.rotation,
                        padding: C(f.padding, 5),
                        visibility: "hidden"
                    }, this.label.attr(q), k.styledMode || this.label.css(f.style), this.label.added || this.label.add(c));
                this.label.labelrank = k.plotHeight
            },
            setOffset: function(c, f, x, z, w) {
                var k = this.axis,
                    m = k.chart;
                z = k.translate(k.usePercentage ? 100 : z ? z : this.total, 0, 0, 0, 1);
                x = k.translate(x ? x : 0);
                x = q(z) && Math.abs(z - x);
                c = C(w, m.xAxis[0].translate(this.x)) + c;
                k = q(z) && this.getStackBox(m, this, c, z, f, x, k);
                f = this.label;
                x = this.isNegative;
                c = "justify" === C(this.options.overflow,
                    "justify");
                var e = this.textAlign;
                f && k && (w = f.getBBox(), z = f.padding, e = "left" === e ? m.inverted ? -z : z : "right" === e ? w.width : m.inverted && "center" === e ? w.width / 2 : m.inverted ? x ? w.width + z : -z : w.width / 2, x = m.inverted ? w.height / 2 : x ? -z : w.height, this.alignOptions.x = C(this.options.x, 0), this.alignOptions.y = C(this.options.y, 0), k.x -= e, k.y -= x, f.align(this.alignOptions, null, k), m.isInsidePlot(f.alignAttr.x + e - this.alignOptions.x, f.alignAttr.y + x - this.alignOptions.y) ? f.show() : (f.alignAttr.y = -9999, c = !1), c && D.prototype.justifyDataLabel.call(this.axis,
                    f, this.alignOptions, f.alignAttr, w, k), f.attr({
                    x: f.alignAttr.x,
                    y: f.alignAttr.y
                }), C(!c && this.options.crop, !0) && ((m = m.isInsidePlot(f.x - z + f.width, f.y) && m.isInsidePlot(f.x + z, f.y)) || f.hide()))
            },
            getStackBox: function(c, f, q, z, w, p, t) {
                var e = f.axis.reversed,
                    a = c.inverted;
                c = t.height + t.pos - (a ? c.plotLeft : c.plotTop);
                f = f.isNegative && !e || !f.isNegative && e;
                return {
                    x: a ? f ? z : z - p : q,
                    y: a ? c - q - w : f ? c - z - p : c - z,
                    width: a ? p : w,
                    height: a ? w : p
                }
            }
        };
        F.prototype.getStacks = function() {
            var c = this,
                f = c.inverted;
            c.yAxis.forEach(function(c) {
                c.stacks &&
                    c.hasVisibleSeries && (c.oldStacks = c.stacks)
            });
            c.series.forEach(function(k) {
                var m = k.xAxis && k.xAxis.options || {};
                !k.options.stacking || !0 !== k.visible && !1 !== c.options.chart.ignoreHiddenSeries || (k.stackKey = [k.type, C(k.options.stack, ""), f ? m.top : m.left, f ? m.height : m.width].join())
            })
        };
        f.prototype.buildStacks = function() {
            var k = this.series,
                f = C(this.options.reversedStacks, !0),
                q = k.length,
                z;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (z = q; z--;) {
                    var w = k[f ? z : q - z - 1];
                    w.setStackedPoints()
                }
                for (z = 0; z < q; z++) k[z].modifyStacks();
                c.fireEvent(this, "afterBuildStacks")
            }
        };
        f.prototype.renderStackTotals = function() {
            var c = this.chart,
                f = c.renderer,
                q = this.stacks,
                z = this.stackTotalGroup;
            z || (this.stackTotalGroup = z = f.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add());
            z.translate(c.plotLeft, c.plotTop);
            M(q, function(c) {
                M(c, function(c) {
                    c.render(z)
                })
            })
        };
        f.prototype.resetStacks = function() {
            var c = this,
                f = c.stacks;
            c.isXAxis || M(f, function(k) {
                M(k, function(f, m) {
                    f.touched < c.stacksTouched ? (f.destroy(), delete k[m]) : (f.total = null, f.cumulative =
                        null)
                })
            })
        };
        f.prototype.cleanStacks = function() {
            if (!this.isXAxis) {
                if (this.oldStacks) var c = this.stacks = this.oldStacks;
                M(c, function(c) {
                    M(c, function(c) {
                        c.cumulative = c.total
                    })
                })
            }
        };
        D.prototype.setStackedPoints = function() {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var k = this.processedXData,
                    f = this.processedYData,
                    x = [],
                    t = f.length,
                    w = this.options,
                    p = w.threshold,
                    A = C(w.startFromThreshold && p, 0),
                    e = w.stack;
                w = w.stacking;
                var a = this.stackKey,
                    g = "-" + a,
                    h = this.negStacks,
                    d = this.yAxis,
                    b = d.stacks,
                    l = d.oldStacks,
                    y, r;
                d.stacksTouched += 1;
                for (r = 0; r < t; r++) {
                    var v = k[r];
                    var I = f[r];
                    var L = this.getStackIndicator(L, v, this.index);
                    var D = L.key;
                    var N = (y = h && I < (A ? 0 : p)) ? g : a;
                    b[N] || (b[N] = {});
                    b[N][v] || (l[N] && l[N][v] ? (b[N][v] = l[N][v], b[N][v].total = null) : b[N][v] = new c.StackItem(d, d.options.stackLabels, y, v, e));
                    N = b[N][v];
                    null !== I ? (N.points[D] = N.points[this.index] = [C(N.cumulative, A)], q(N.cumulative) || (N.base = D), N.touched = d.stacksTouched, 0 < L.index && !1 === this.singleStacks && (N.points[D][0] = N.points[this.index +
                        "," + v + ",0"][0])) : N.points[D] = N.points[this.index] = null;
                    "percent" === w ? (y = y ? a : g, h && b[y] && b[y][v] ? (y = b[y][v], N.total = y.total = Math.max(y.total, N.total) + Math.abs(I) || 0) : N.total = u(N.total + (Math.abs(I) || 0))) : N.total = u(N.total + (I || 0));
                    N.cumulative = C(N.cumulative, A) + (I || 0);
                    null !== I && (N.points[D].push(N.cumulative), x[r] = N.cumulative)
                }
                "percent" === w && (d.usePercentage = !0);
                this.stackedYData = x;
                d.oldStacks = {}
            }
        };
        D.prototype.modifyStacks = function() {
            var c = this,
                f = c.stackKey,
                q = c.yAxis.stacks,
                t = c.processedXData,
                w, p = c.options.stacking;
            c[p + "Stacker"] && [f, "-" + f].forEach(function(f) {
                for (var e = t.length, a, g; e--;)
                    if (a = t[e], w = c.getStackIndicator(w, a, c.index, f), g = (a = q[f] && q[f][a]) && a.points[w.key]) c[p + "Stacker"](g, a, e)
            })
        };
        D.prototype.percentStacker = function(c, f, q) {
            f = f.total ? 100 / f.total : 0;
            c[0] = u(c[0] * f);
            c[1] = u(c[1] * f);
            this.stackedYData[q] = c[1]
        };
        D.prototype.getStackIndicator = function(c, f, x, t) {
            !q(c) || c.x !== f || t && c.key !== t ? c = {
                x: f,
                index: 0,
                key: t
            } : c.index++;
            c.key = [x, f, c.index].join();
            return c
        }
    });
    O(u, "parts/Dynamics.js", [u["parts/Globals.js"],
        u["parts/Point.js"], u["parts/Time.js"], u["parts/Utilities.js"]
    ], function(c, f, u, q) {
        var A = q.addEvent,
            t = q.animate,
            G = q.createElement,
            C = q.css,
            F = q.defined,
            D = q.erase,
            k = q.error,
            m = q.extend,
            x = q.fireEvent,
            z = q.isArray,
            w = q.isNumber,
            p = q.isObject,
            K = q.isString,
            e = q.merge,
            a = q.objectEach,
            g = q.pick,
            h = q.relativeLength,
            d = q.setAnimation,
            b = q.splat,
            l = c.Axis;
        q = c.Chart;
        var y = c.Series,
            r = c.seriesTypes;
        c.cleanRecursively = function(b, d) {
            var e = {};
            a(b, function(a, g) {
                if (p(b[g], !0) && !b.nodeType && d[g]) a = c.cleanRecursively(b[g], d[g]), Object.keys(a).length &&
                    (e[g] = a);
                else if (p(b[g]) || b[g] !== d[g]) e[g] = b[g]
            });
            return e
        };
        m(q.prototype, {
            addSeries: function(a, b, d) {
                var e, c = this;
                a && (b = g(b, !0), x(c, "addSeries", {
                    options: a
                }, function() {
                    e = c.initSeries(a);
                    c.isDirtyLegend = !0;
                    c.linkSeries();
                    e.enabledDataSorting && e.setData(a.data, !1);
                    x(c, "afterAddSeries", {
                        series: e
                    });
                    b && c.redraw(d)
                }));
                return e
            },
            addAxis: function(a, b, d, e) {
                return this.createAxis(b ? "xAxis" : "yAxis", {
                    axis: a,
                    redraw: d,
                    animation: e
                })
            },
            addColorAxis: function(a, b, d) {
                return this.createAxis("colorAxis", {
                    axis: a,
                    redraw: b,
                    animation: d
                })
            },
            createAxis: function(a, d) {
                var h = this.options,
                    f = "colorAxis" === a,
                    k = d.redraw,
                    r = d.animation;
                d = e(d.axis, {
                    index: this[a].length,
                    isX: "xAxis" === a
                });
                var p = f ? new c.ColorAxis(this, d) : new l(this, d);
                h[a] = b(h[a] || {});
                h[a].push(d);
                f && (this.isDirtyLegend = !0, this.axes.forEach(function(a) {
                    a.series = []
                }), this.series.forEach(function(a) {
                    a.bindAxes();
                    a.isDirtyData = !0
                }));
                g(k, !0) && this.redraw(r);
                return p
            },
            showLoading: function(a) {
                var b = this,
                    d = b.options,
                    e = b.loadingDiv,
                    c = d.loading,
                    h = function() {
                        e && C(e, {
                            left: b.plotLeft +
                                "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                e || (b.loadingDiv = e = G("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = G("span", {
                    className: "highcharts-loading-inner"
                }, null, e), A(b, "redraw", h));
                e.className = "highcharts-loading";
                b.loadingSpan.innerHTML = g(a, d.lang.loading, "");
                b.styledMode || (C(e, m(c.style, {
                    zIndex: 10
                })), C(b.loadingSpan, c.labelStyle), b.loadingShown || (C(e, {
                    opacity: 0,
                    display: ""
                }), t(e, {
                    opacity: c.style.opacity || .5
                }, {
                    duration: c.showDuration ||
                        0
                })));
                b.loadingShown = !0;
                h()
            },
            hideLoading: function() {
                var a = this.options,
                    b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || t(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function() {
                        C(b, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            collectionsWithUpdate: ["xAxis", "yAxis", "zAxis", "series"],
            update: function(d, l, f, k) {
                var r = this,
                    p = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    },
                    m, n, v, y = d.isResponsiveOptions,
                    q = [];
                x(r, "update", {
                    options: d
                });
                y || r.setResponsive(!1, !0);
                d = c.cleanRecursively(d, r.options);
                e(!0, r.userOptions, d);
                if (m = d.chart) {
                    e(!0, r.options.chart, m);
                    "className" in
                    m && r.setClassName(m.className);
                    "reflow" in m && r.setReflow(m.reflow);
                    if ("inverted" in m || "polar" in m || "type" in m) {
                        r.propFromSeries();
                        var t = !0
                    }
                    "alignTicks" in m && (t = !0);
                    a(m, function(a, b) {
                        -1 !== r.propsRequireUpdateSeries.indexOf("chart." + b) && (n = !0); - 1 !== r.propsRequireDirtyBox.indexOf(b) && (r.isDirtyBox = !0);
                        y || -1 === r.propsRequireReflow.indexOf(b) || (v = !0)
                    });
                    !r.styledMode && "style" in m && r.renderer.setStyle(m.style)
                }!r.styledMode && d.colors && (this.options.colors = d.colors);
                d.plotOptions && e(!0, this.options.plotOptions,
                    d.plotOptions);
                d.time && this.time === c.time && (this.time = new u(d.time));
                a(d, function(a, b) {
                    if (r[b] && "function" === typeof r[b].update) r[b].update(a, !1);
                    else if ("function" === typeof r[p[b]]) r[p[b]](a);
                    "chart" !== b && -1 !== r.propsRequireUpdateSeries.indexOf(b) && (n = !0)
                });
                this.collectionsWithUpdate.forEach(function(a) {
                    if (d[a]) {
                        if ("series" === a) {
                            var e = [];
                            r[a].forEach(function(a, b) {
                                a.options.isInternal || e.push(g(a.options.index, b))
                            })
                        }
                        b(d[a]).forEach(function(b, d) {
                            (d = F(b.id) && r.get(b.id) || r[a][e ? e[d] : d]) && d.coll ===
                                a && (d.update(b, !1), f && (d.touched = !0));
                            !d && f && r.collectionsWithInit[a] && (r.collectionsWithInit[a][0].apply(r, [b].concat(r.collectionsWithInit[a][1] || []).concat([!1])).touched = !0)
                        });
                        f && r[a].forEach(function(a) {
                            a.touched || a.options.isInternal ? delete a.touched : q.push(a)
                        })
                    }
                });
                q.forEach(function(a) {
                    a.remove && a.remove(!1)
                });
                t && r.axes.forEach(function(a) {
                    a.update({}, !1)
                });
                n && r.getSeriesOrderByLinks().forEach(function(a) {
                    a.chart && a.update({}, !1)
                }, this);
                d.loading && e(!0, r.options.loading, d.loading);
                t = m && m.width;
                m = m && m.height;
                K(m) && (m = h(m, t || r.chartWidth));
                v || w(t) && t !== r.chartWidth || w(m) && m !== r.chartHeight ? r.setSize(t, m, k) : g(l, !0) && r.redraw(k);
                x(r, "afterUpdate", {
                    options: d,
                    redraw: l,
                    animation: k
                })
            },
            setSubtitle: function(a, b) {
                this.applyDescription("subtitle", a);
                this.layOutTitles(b)
            },
            setCaption: function(a, b) {
                this.applyDescription("caption", a);
                this.layOutTitles(b)
            }
        });
        q.prototype.collectionsWithInit = {
            xAxis: [q.prototype.addAxis, [!0]],
            yAxis: [q.prototype.addAxis, [!1]],
            series: [q.prototype.addSeries]
        };
        m(f.prototype, {
            update: function(a,
                b, d, e) {
                function c() {
                    h.applyOptions(a);
                    var e = f && h.hasDummyGraphic;
                    e = null === h.y ? !e : e;
                    f && e && (h.graphic = f.destroy(), delete h.hasDummyGraphic);
                    p(a, !0) && (f && f.element && a && a.marker && "undefined" !== typeof a.marker.symbol && (h.graphic = f.destroy()), a && a.dataLabels && h.dataLabel && (h.dataLabel = h.dataLabel.destroy()), h.connector && (h.connector = h.connector.destroy()));
                    k = h.index;
                    l.updateParallelArrays(h, k);
                    m.data[k] = p(m.data[k], !0) || p(a, !0) ? h.options : g(a, m.data[k]);
                    l.isDirty = l.isDirtyData = !0;
                    !l.fixedBox && l.hasCartesianSeries &&
                        (r.isDirtyBox = !0);
                    "point" === m.legendType && (r.isDirtyLegend = !0);
                    b && r.redraw(d)
                }
                var h = this,
                    l = h.series,
                    f = h.graphic,
                    k, r = l.chart,
                    m = l.options;
                b = g(b, !0);
                !1 === e ? c() : h.firePointEvent("update", {
                    options: a
                }, c)
            },
            remove: function(a, b) {
                this.series.removePoint(this.series.data.indexOf(this), a, b)
            }
        });
        m(y.prototype, {
            addPoint: function(a, b, d, e, c) {
                var h = this.options,
                    l = this.data,
                    f = this.chart,
                    k = this.xAxis;
                k = k && k.hasNames && k.names;
                var r = h.data,
                    p = this.xData,
                    m;
                b = g(b, !0);
                var v = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(v, [a]);
                var y = v.x;
                var q = p.length;
                if (this.requireSorting && y < p[q - 1])
                    for (m = !0; q && p[q - 1] > y;) q--;
                this.updateParallelArrays(v, "splice", q, 0, 0);
                this.updateParallelArrays(v, q);
                k && v.name && (k[y] = v.name);
                r.splice(q, 0, a);
                m && (this.data.splice(q, 0, null), this.processData());
                "point" === h.legendType && this.generatePoints();
                d && (l[0] && l[0].remove ? l[0].remove(!1) : (l.shift(), this.updateParallelArrays(v, "shift"), r.shift()));
                !1 !== c && x(this, "addPoint", {
                    point: v
                });
                this.isDirtyData = this.isDirty = !0;
                b && f.redraw(e)
            },
            removePoint: function(a,
                b, e) {
                var c = this,
                    h = c.data,
                    l = h[a],
                    f = c.points,
                    k = c.chart,
                    r = function() {
                        f && f.length === h.length && f.splice(a, 1);
                        h.splice(a, 1);
                        c.options.data.splice(a, 1);
                        c.updateParallelArrays(l || {
                            series: c
                        }, "splice", a, 1);
                        l && l.destroy();
                        c.isDirty = !0;
                        c.isDirtyData = !0;
                        b && k.redraw()
                    };
                d(e, k);
                b = g(b, !0);
                l ? l.firePointEvent("remove", null, r) : r()
            },
            remove: function(a, b, d, e) {
                function c() {
                    h.destroy(e);
                    h.remove = null;
                    l.isDirtyLegend = l.isDirtyBox = !0;
                    l.linkSeries();
                    g(a, !0) && l.redraw(b)
                }
                var h = this,
                    l = h.chart;
                !1 !== d ? x(h, "remove", null, c) : c()
            },
            update: function(a, b) {
                a = c.cleanRecursively(a, this.userOptions);
                x(this, "update", {
                    options: a
                });
                var d = this,
                    h = d.chart,
                    l = d.userOptions,
                    f = d.initialType || d.type,
                    p = a.type || l.type || h.options.chart.type,
                    n = !(this.hasDerivedData || a.dataGrouping || p && p !== this.type || "undefined" !== typeof a.pointStart || a.pointInterval || a.pointIntervalUnit || a.keys),
                    y = r[f].prototype,
                    v, q = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"],
                    w = ["eventOptions", "navigatorSeries", "baseSeries"],
                    t = d.finishedAnimating && {
                        animation: !1
                    },
                    z = {};
                n && (w.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "_hasPointMarkers", "_hasPointLabels", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== a.visible && w.push("area", "graph"), d.parallelArrays.forEach(function(a) {
                    w.push(a + "Data")
                }), a.data && (a.dataSorting && m(d.options.dataSorting, a.dataSorting), this.setData(a.data, !1)));
                a = e(l, t, {
                    index: "undefined" === typeof l.index ? d.index : l.index,
                    pointStart: g(l.pointStart, d.xData[0])
                }, !n && {
                    data: d.options.data
                }, a);
                n && a.data && (a.data =
                    d.options.data);
                w = q.concat(w);
                w.forEach(function(a) {
                    w[a] = d[a];
                    delete d[a]
                });
                d.remove(!1, null, !1, !0);
                for (v in y) d[v] = void 0;
                r[p || f] ? m(d, r[p || f].prototype) : k(17, !0, h, {
                    missingModuleFor: p || f
                });
                w.forEach(function(a) {
                    d[a] = w[a]
                });
                d.init(h, a);
                if (n && this.points) {
                    var I = d.options;
                    !1 === I.visible ? (z.graphic = 1, z.dataLabel = 1) : d._hasPointLabels || (p = I.marker, y = I.dataLabels, p && (!1 === p.enabled || "symbol" in p) && (z.graphic = 1), y && !1 === y.enabled && (z.dataLabel = 1));
                    this.points.forEach(function(a) {
                        a && a.series && (a.resolveColor(),
                            Object.keys(z).length && a.destroyElements(z), !1 === I.showInLegend && a.legendItem && h.legend.destroyItem(a))
                    }, this)
                }
                a.zIndex !== l.zIndex && q.forEach(function(b) {
                    d[b] && d[b].attr({
                        zIndex: a.zIndex
                    })
                });
                d.initialType = f;
                h.linkSeries();
                x(this, "afterUpdate");
                g(b, !0) && h.redraw(n ? void 0 : !1)
            },
            setName: function(a) {
                this.name = this.options.name = this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            }
        });
        m(l.prototype, {
            update: function(b, d) {
                var c = this.chart,
                    h = b && b.events || {};
                b = e(this.userOptions, b);
                c.options[this.coll].indexOf &&
                    (c.options[this.coll][c.options[this.coll].indexOf(this.userOptions)] = b);
                a(c.options[this.coll].events, function(a, b) {
                    "undefined" === typeof h[b] && (h[b] = void 0)
                });
                this.destroy(!0);
                this.init(c, m(b, {
                    events: h
                }));
                c.isDirtyBox = !0;
                g(d, !0) && c.redraw()
            },
            remove: function(a) {
                for (var b = this.chart, d = this.coll, e = this.series, c = e.length; c--;) e[c] && e[c].remove(!1);
                D(b.axes, this);
                D(b[d], this);
                z(b.options[d]) ? b.options[d].splice(this.options.index, 1) : delete b.options[d];
                b[d].forEach(function(a, b) {
                    a.options.index = a.userOptions.index =
                        b
                });
                this.destroy();
                b.isDirtyBox = !0;
                g(a, !0) && b.redraw()
            },
            setTitle: function(a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function(a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    });
    O(u, "parts/AreaSeries.js", [u["parts/Globals.js"], u["parts/Color.js"], u["mixins/legend-symbol.js"], u["parts/Utilities.js"]], function(c, f, u, q) {
        var A = f.parse,
            t = q.objectEach,
            G = q.pick;
        f = q.seriesType;
        var C = c.Series;
        f("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function(c) {
                var f = [],
                    k = [],
                    m = this.xAxis,
                    q = this.yAxis,
                    z = q.stacks[this.stackKey],
                    w = {},
                    p = this.index,
                    A = q.series,
                    e = A.length,
                    a = G(q.options.reversedStacks, !0) ? 1 : -1,
                    g;
                c = c || this.points;
                if (this.options.stacking) {
                    for (g = 0; g < c.length; g++) c[g].leftNull = c[g].rightNull = void 0, w[c[g].x] = c[g];
                    t(z, function(a, b) {
                        null !== a.total && k.push(b)
                    });
                    k.sort(function(a, b) {
                        return a - b
                    });
                    var h = A.map(function(a) {
                        return a.visible
                    });
                    k.forEach(function(d, b) {
                        var c = 0,
                            y, r;
                        if (w[d] && !w[d].isNull) f.push(w[d]), [-1, 1].forEach(function(c) {
                            var l = 1 === c ? "rightNull" : "leftNull",
                                f = 0,
                                m = z[k[b + c]];
                            if (m)
                                for (g =
                                    p; 0 <= g && g < e;) y = m.points[g], y || (g === p ? w[d][l] = !0 : h[g] && (r = z[d].points[g]) && (f -= r[1] - r[0])), g += a;
                            w[d][1 === c ? "rightCliff" : "leftCliff"] = f
                        });
                        else {
                            for (g = p; 0 <= g && g < e;) {
                                if (y = z[d].points[g]) {
                                    c = y[1];
                                    break
                                }
                                g += a
                            }
                            c = q.translate(c, 0, 1, 0, 1);
                            f.push({
                                isNull: !0,
                                plotX: m.translate(d, 0, 0, 0, 1),
                                x: d,
                                plotY: c,
                                yBottom: c
                            })
                        }
                    })
                }
                return f
            },
            getGraphPath: function(c) {
                var f = C.prototype.getGraphPath,
                    k = this.options,
                    m = k.stacking,
                    q = this.yAxis,
                    t, w = [],
                    p = [],
                    A = this.index,
                    e = q.stacks[this.stackKey],
                    a = k.threshold,
                    g = Math.round(q.getThreshold(k.threshold));
                k = G(k.connectNulls, "percent" === m);
                var h = function(d, h, l) {
                    var f = c[d];
                    d = m && e[f.x].points[A];
                    var k = f[l + "Null"] || 0;
                    l = f[l + "Cliff"] || 0;
                    f = !0;
                    if (l || k) {
                        var r = (k ? d[0] : d[1]) + l;
                        var y = d[0] + l;
                        f = !!k
                    } else !m && c[h] && c[h].isNull && (r = y = a);
                    "undefined" !== typeof r && (p.push({
                        plotX: b,
                        plotY: null === r ? g : q.getThreshold(r),
                        isNull: f,
                        isCliff: !0
                    }), w.push({
                        plotX: b,
                        plotY: null === y ? g : q.getThreshold(y),
                        doCurve: !1
                    }))
                };
                c = c || this.points;
                m && (c = this.getStackPoints(c));
                for (t = 0; t < c.length; t++) {
                    m || (c[t].leftCliff = c[t].rightCliff = c[t].leftNull =
                        c[t].rightNull = void 0);
                    var d = c[t].isNull;
                    var b = G(c[t].rectPlotX, c[t].plotX);
                    var l = G(c[t].yBottom, g);
                    if (!d || k) k || h(t, t - 1, "left"), d && !m && k || (p.push(c[t]), w.push({
                        x: t,
                        plotX: b,
                        plotY: l
                    })), k || h(t, t + 1, "right")
                }
                t = f.call(this, p, !0, !0);
                w.reversed = !0;
                d = f.call(this, w, !0, !0);
                d.length && (d[0] = "L");
                d = t.concat(d);
                f = f.call(this, p, !1, k);
                d.xMap = t.xMap;
                this.areaPath = d;
                return f
            },
            drawGraph: function() {
                this.areaPath = [];
                C.prototype.drawGraph.apply(this);
                var c = this,
                    f = this.areaPath,
                    k = this.options,
                    m = [
                        ["area", "highcharts-area",
                            this.color, k.fillColor
                        ]
                    ];
                this.zones.forEach(function(f, q) {
                    m.push(["zone-area-" + q, "highcharts-area highcharts-zone-area-" + q + " " + f.className, f.color || c.color, f.fillColor || k.fillColor])
                });
                m.forEach(function(m) {
                    var q = m[0],
                        w = c[q],
                        p = w ? "animate" : "attr",
                        t = {};
                    w ? (w.endX = c.preventGraphAnimation ? null : f.xMap, w.animate({
                        d: f
                    })) : (t.zIndex = 0, w = c[q] = c.chart.renderer.path(f).addClass(m[1]).add(c.group), w.isArea = !0);
                    c.chart.styledMode || (t.fill = G(m[3], A(m[2]).setOpacity(G(k.fillOpacity, .75)).get()));
                    w[p](t);
                    w.startX =
                        f.xMap;
                    w.shiftUnit = k.step ? 2 : 1
                })
            },
            drawLegendSymbol: u.drawRectangle
        });
        ""
    });
    O(u, "parts/SplineSeries.js", [u["parts/Utilities.js"]], function(c) {
        var f = c.pick;
        c = c.seriesType;
        c("spline", "line", {}, {
            getPointSpline: function(c, q, A) {
                var t = q.plotX,
                    u = q.plotY,
                    C = c[A - 1];
                A = c[A + 1];
                if (C && !C.isNull && !1 !== C.doCurve && !q.isCliff && A && !A.isNull && !1 !== A.doCurve && !q.isCliff) {
                    c = C.plotY;
                    var G = A.plotX;
                    A = A.plotY;
                    var D = 0;
                    var k = (1.5 * t + C.plotX) / 2.5;
                    var m = (1.5 * u + c) / 2.5;
                    G = (1.5 * t + G) / 2.5;
                    var x = (1.5 * u + A) / 2.5;
                    G !== k && (D = (x - m) * (G - t) / (G - k) +
                        u - x);
                    m += D;
                    x += D;
                    m > c && m > u ? (m = Math.max(c, u), x = 2 * u - m) : m < c && m < u && (m = Math.min(c, u), x = 2 * u - m);
                    x > A && x > u ? (x = Math.max(A, u), m = 2 * u - x) : x < A && x < u && (x = Math.min(A, u), m = 2 * u - x);
                    q.rightContX = G;
                    q.rightContY = x
                }
                q = ["C", f(C.rightContX, C.plotX), f(C.rightContY, C.plotY), f(k, t), f(m, u), t, u];
                C.rightContX = C.rightContY = null;
                return q
            }
        });
        ""
    });
    O(u, "parts/AreaSplineSeries.js", [u["parts/Globals.js"], u["mixins/legend-symbol.js"], u["parts/Utilities.js"]], function(c, f, u) {
        u = u.seriesType;
        var q = c.seriesTypes.area.prototype;
        u("areaspline", "spline",
            c.defaultPlotOptions.area, {
                getStackPoints: q.getStackPoints,
                getGraphPath: q.getGraphPath,
                drawGraph: q.drawGraph,
                drawLegendSymbol: f.drawRectangle
            });
        ""
    });
    O(u, "parts/ColumnSeries.js", [u["parts/Globals.js"], u["parts/Color.js"], u["mixins/legend-symbol.js"], u["parts/Utilities.js"]], function(c, f, u, q) {
        var A = f.parse,
            t = q.animObject,
            G = q.clamp,
            C = q.defined,
            F = q.extend,
            D = q.isNumber,
            k = q.merge,
            m = q.pick;
        f = q.seriesType;
        var x = c.Series,
            z = c.svg;
        f("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000"
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function() {
                x.prototype.init.apply(this, arguments);
                var c = this,
                    f = c.chart;
                f.hasRendered && f.series.forEach(function(f) {
                    f.type ===
                        c.type && (f.isDirty = !0)
                })
            },
            getColumnMetrics: function() {
                var c = this,
                    f = c.options,
                    k = c.xAxis,
                    e = c.yAxis,
                    a = k.options.reversedStacks;
                a = k.reversed && !a || !k.reversed && a;
                var g, h = {},
                    d = 0;
                !1 === f.grouping ? d = 1 : c.chart.series.forEach(function(a) {
                    var b = a.yAxis,
                        l = a.options;
                    if (a.type === c.type && (a.visible || !c.chart.options.chart.ignoreHiddenSeries) && e.len === b.len && e.pos === b.pos) {
                        if (l.stacking) {
                            g = a.stackKey;
                            "undefined" === typeof h[g] && (h[g] = d++);
                            var f = h[g]
                        } else !1 !== l.grouping && (f = d++);
                        a.columnIndex = f
                    }
                });
                var b = Math.min(Math.abs(k.transA) *
                        (k.ordinalSlope || f.pointRange || k.closestPointRange || k.tickInterval || 1), k.len),
                    l = b * f.groupPadding,
                    y = (b - 2 * l) / (d || 1);
                f = Math.min(f.maxPointWidth || k.len, m(f.pointWidth, y * (1 - 2 * f.pointPadding)));
                c.columnMetrics = {
                    width: f,
                    offset: (y - f) / 2 + (l + ((c.columnIndex || 0) + (a ? 1 : 0)) * y - b / 2) * (a ? -1 : 1)
                };
                return c.columnMetrics
            },
            crispCol: function(c, f, k, e) {
                var a = this.chart,
                    g = this.borderWidth,
                    h = -(g % 2 ? .5 : 0);
                g = g % 2 ? .5 : 1;
                a.inverted && a.renderer.isVML && (g += 1);
                this.options.crisp && (k = Math.round(c + k) + h, c = Math.round(c) + h, k -= c);
                e = Math.round(f +
                    e) + g;
                h = .5 >= Math.abs(f) && .5 < e;
                f = Math.round(f) + g;
                e -= f;
                h && e && (--f, e += 1);
                return {
                    x: c,
                    y: f,
                    width: k,
                    height: e
                }
            },
            translate: function() {
                var c = this,
                    f = c.chart,
                    k = c.options,
                    e = c.dense = 2 > c.closestPointRange * c.xAxis.transA;
                e = c.borderWidth = m(k.borderWidth, e ? 0 : 1);
                var a = c.xAxis,
                    g = c.yAxis,
                    h = k.threshold,
                    d = c.translatedThreshold = g.getThreshold(h),
                    b = m(k.minPointLength, 5),
                    l = c.getColumnMetrics(),
                    y = l.width,
                    r = c.barW = Math.max(y, 1 + 2 * e),
                    q = c.pointXOffset = l.offset,
                    t = c.dataMin,
                    z = c.dataMax;
                f.inverted && (d -= .5);
                k.pointPadding && (r = Math.ceil(r));
                x.prototype.translate.apply(c);
                c.points.forEach(function(e) {
                    var l = m(e.yBottom, d),
                        k = 999 + Math.abs(l),
                        p = y,
                        n = e.plotX;
                    k = G(e.plotY, -k, g.len + k);
                    var v = e.plotX + q,
                        w = r,
                        x = Math.min(k, l),
                        I = Math.max(k, l) - x;
                    if (b && Math.abs(I) < b) {
                        I = b;
                        var u = !g.reversed && !e.negative || g.reversed && e.negative;
                        e.y === h && c.dataMax <= h && g.min < h && t !== z && (u = !u);
                        x = Math.abs(x - d) > b ? l - b : d - (u ? b : 0)
                    }
                    C(e.options.pointWidth) && (p = w = Math.ceil(e.options.pointWidth), v -= Math.round((p - y) / 2));
                    e.barX = v;
                    e.pointWidth = p;
                    e.tooltipPos = f.inverted ? [g.len + g.pos - f.plotLeft -
                        k, a.len + a.pos - f.plotTop - (n || 0) - q - w / 2, I
                    ] : [v + w / 2, k + g.pos - f.plotTop, I];
                    e.shapeType = c.pointClass.prototype.shapeType || "rect";
                    e.shapeArgs = c.crispCol.apply(c, e.isNull ? [v, d, w, 0] : [v, x, w, I])
                })
            },
            getSymbol: c.noop,
            drawLegendSymbol: u.drawRectangle,
            drawGraph: function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function(c, f) {
                var p = this.options,
                    e = this.pointAttrToOptions || {};
                var a = e.stroke || "borderColor";
                var g = e["stroke-width"] || "borderWidth",
                    h = c && c.color || this.color,
                    d =
                    c && c[a] || p[a] || this.color || h,
                    b = c && c[g] || p[g] || this[g] || 0;
                e = c && c.options.dashStyle || p.dashStyle;
                var l = m(c && c.opacity, p.opacity, 1);
                if (c && this.zones.length) {
                    var y = c.getZone();
                    h = c.options.color || y && (y.color || c.nonZonedColor) || this.color;
                    y && (d = y.borderColor || d, e = y.dashStyle || e, b = y.borderWidth || b)
                }
                f && c && (c = k(p.states[f], c.options.states && c.options.states[f] || {}), f = c.brightness, h = c.color || "undefined" !== typeof f && A(h).brighten(c.brightness).get() || h, d = c[a] || d, b = c[g] || b, e = c.dashStyle || e, l = m(c.opacity, l));
                a = {
                    fill: h,
                    stroke: d,
                    "stroke-width": b,
                    opacity: l
                };
                e && (a.dashstyle = e);
                return a
            },
            drawPoints: function() {
                var c = this,
                    f = this.chart,
                    m = c.options,
                    e = f.renderer,
                    a = m.animationLimit || 250,
                    g;
                c.points.forEach(function(h) {
                    var d = h.graphic,
                        b = !!d,
                        l = d && f.pointCount < a ? "animate" : "attr";
                    if (D(h.plotY) && null !== h.y) {
                        g = h.shapeArgs;
                        d && h.hasNewShapeType() && (d = d.destroy());
                        c.enabledDataSorting && (h.startXPos = c.xAxis.reversed ? -(g ? g.width : 0) : c.xAxis.width);
                        d || (h.graphic = d = e[h.shapeType](g).add(h.group || c.group)) && c.enabledDataSorting &&
                            f.hasRendered && f.pointCount < a && (d.attr({
                                x: h.startXPos
                            }), b = !0, l = "animate");
                        if (d && b) d[l](k(g));
                        if (m.borderRadius) d[l]({
                            r: m.borderRadius
                        });
                        f.styledMode || d[l](c.pointAttribs(h, h.selected && "select")).shadow(!1 !== h.allowShadow && m.shadow, null, m.stacking && !m.borderRadius);
                        d.addClass(h.getClassName(), !0)
                    } else d && (h.graphic = d.destroy())
                })
            },
            animate: function(c) {
                var f = this,
                    k = this.yAxis,
                    e = f.options,
                    a = this.chart.inverted,
                    g = {},
                    h = a ? "translateX" : "translateY";
                if (z)
                    if (c) g.scaleY = .001, c = G(k.toPixels(e.threshold), k.pos,
                        k.pos + k.len), a ? g.translateX = c - k.len : g.translateY = c, f.clipBox && f.setClip(), f.group.attr(g);
                    else {
                        var d = f.group.attr(h);
                        f.group.animate({
                            scaleY: 1
                        }, F(t(f.options.animation), {
                            step: function(a, e) {
                                g[h] = d + e.pos * (k.pos - d);
                                f.group.attr(g)
                            }
                        }));
                        f.animate = null
                    }
            },
            remove: function() {
                var c = this,
                    f = c.chart;
                f.hasRendered && f.series.forEach(function(f) {
                    f.type === c.type && (f.isDirty = !0)
                });
                x.prototype.remove.apply(c, arguments)
            }
        });
        ""
    });
    O(u, "parts/BarSeries.js", [u["parts/Utilities.js"]], function(c) {
        c = c.seriesType;
        c("bar", "column",
            null, {
                inverted: !0
            });
        ""
    });
    O(u, "parts/ScatterSeries.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        var u = f.addEvent;
        f = f.seriesType;
        var q = c.Series;
        f("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            jitter: {
                x: 0,
                y: 0
            },
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group",
                "markerGroup", "dataLabelsGroup"
            ],
            takeOrdinalPosition: !1,
            drawGraph: function() {
                this.options.lineWidth && q.prototype.drawGraph.call(this)
            },
            applyJitter: function() {
                var c = this,
                    f = this.options.jitter,
                    q = this.points.length;
                f && this.points.forEach(function(t, u) {
                    ["x", "y"].forEach(function(A, k) {
                        var m = "plot" + A.toUpperCase();
                        if (f[A] && !t.isNull) {
                            var x = c[A + "Axis"];
                            var z = f[A] * x.transA;
                            if (x && !x.isLog) {
                                var w = Math.max(0, t[m] - z);
                                x = Math.min(x.len, t[m] + z);
                                k = 1E4 * Math.sin(u + k * q);
                                t[m] = w + (x - w) * (k - Math.floor(k));
                                "x" === A && (t.clientX =
                                    t.plotX)
                            }
                        }
                    })
                })
            }
        });
        u(q, "afterTranslate", function() {
            this.applyJitter && this.applyJitter()
        });
        ""
    });
    O(u, "mixins/centered-series.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        var u = f.isNumber,
            q = f.pick,
            A = f.relativeLength,
            t = c.deg2rad;
        c.CenteredSeriesMixin = {
            getCenter: function() {
                var c = this.options,
                    f = this.chart,
                    t = 2 * (c.slicedOffset || 0),
                    u = f.plotWidth - 2 * t,
                    k = f.plotHeight - 2 * t,
                    m = c.center,
                    x = Math.min(u, k),
                    z = c.size,
                    w = c.innerSize || 0;
                "string" === typeof z && (z = parseFloat(z));
                "string" === typeof w && (w = parseFloat(w));
                c = [q(m[0], "50%"), q(m[1], "50%"), q(z && 0 > z ? void 0 : c.size, "100%"), q(w && 0 > w ? void 0 : c.innerSize || 0, "0%")];
                f.angular && (c[3] = 0);
                for (m = 0; 4 > m; ++m) z = c[m], f = 2 > m || 2 === m && /%$/.test(z), c[m] = A(z, [u, k, x, c[2]][m]) + (f ? t : 0);
                c[3] > c[2] && (c[3] = c[2]);
                return c
            },
            getStartAndEndRadians: function(c, f) {
                c = u(c) ? c : 0;
                f = u(f) && f > c && 360 > f - c ? f : c + 360;
                return {
                    start: t * (c + -90),
                    end: t * (f + -90)
                }
            }
        }
    });
    O(u, "parts/PieSeries.js", [u["parts/Globals.js"], u["mixins/legend-symbol.js"], u["parts/Point.js"], u["parts/Utilities.js"]], function(c, f, u, q) {
        var A =
            q.addEvent,
            t = q.clamp,
            G = q.defined,
            C = q.fireEvent,
            F = q.isNumber,
            D = q.merge,
            k = q.pick,
            m = q.relativeLength,
            x = q.seriesType,
            z = q.setAnimation;
        q = c.CenteredSeriesMixin;
        var w = q.getStartAndEndRadians,
            p = c.noop,
            K = c.Series;
        x("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                allowOverlap: !0,
                connectorPadding: 5,
                connectorShape: "fixedOffset",
                crookDistance: "70%",
                distance: 30,
                enabled: !0,
                formatter: function() {
                    return this.point.isNull ? void 0 : this.point.name
                },
                softConnector: !0,
                x: 0
            },
            fillColor: void 0,
            ignoreHiddenPoint: !0,
            inactiveOtherPoints: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            lineWidth: void 0,
            states: {
                hover: {
                    brightness: .1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: c.seriesTypes.column.prototype.pointAttribs,
            animate: function(e) {
                var a = this,
                    c = a.points,
                    h = a.startAngleRad;
                e || (c.forEach(function(d) {
                    var b = d.graphic,
                        e = d.shapeArgs;
                    b && e && (b.attr({
                        r: k(d.startR, a.center && a.center[3] / 2),
                        start: h,
                        end: h
                    }), b.animate({
                        r: e.r,
                        start: e.start,
                        end: e.end
                    }, a.options.animation))
                }), a.animate = null)
            },
            hasData: function() {
                return !!this.processedXData.length
            },
            updateTotals: function() {
                var e, a = 0,
                    c = this.points,
                    h = c.length,
                    d = this.options.ignoreHiddenPoint;
                for (e = 0; e < h; e++) {
                    var b = c[e];
                    a += d && !b.visible ? 0 : b.isNull ? 0 : b.y
                }
                this.total = a;
                for (e = 0; e < h; e++) b = c[e], b.percentage = 0 < a && (b.visible || !d) ? b.y / a * 100 : 0, b.total = a
            },
            generatePoints: function() {
                K.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            getX: function(e, a, c) {
                var g = this.center,
                    d = this.radii ? this.radii[c.index] : g[2] / 2;
                e = Math.asin(t((e - g[1]) / (d + c.labelDistance), -1, 1));
                return g[0] + (a ? -1 : 1) * Math.cos(e) * (d + c.labelDistance) + (0 < c.labelDistance ? (a ? -1 : 1) * this.options.dataLabels.padding : 0)
            },
            translate: function(e) {
                this.generatePoints();
                var a = 0,
                    c = this.options,
                    h = c.slicedOffset,
                    d = h + (c.borderWidth || 0),
                    b = w(c.startAngle, c.endAngle),
                    l = this.startAngleRad = b.start;
                b = (this.endAngleRad = b.end) - l;
                var f = this.points,
                    r = c.dataLabels.distance;
                c = c.ignoreHiddenPoint;
                var p, q = f.length;
                e || (this.center = e = this.getCenter());
                for (p = 0; p < q; p++) {
                    var t = f[p];
                    var x = l + a * b;
                    if (!c || t.visible) a += t.percentage / 100;
                    var z = l + a * b;
                    t.shapeType = "arc";
                    t.shapeArgs = {
                        x: e[0],
                        y: e[1],
                        r: e[2] / 2,
                        innerR: e[3] / 2,
                        start: Math.round(1E3 * x) / 1E3,
                        end: Math.round(1E3 * z) / 1E3
                    };
                    t.labelDistance = k(t.options.dataLabels && t.options.dataLabels.distance, r);
                    t.labelDistance = m(t.labelDistance, t.shapeArgs.r);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, t.labelDistance);
                    z = (z + x) / 2;
                    z > 1.5 * Math.PI ?
                        z -= 2 * Math.PI : z < -Math.PI / 2 && (z += 2 * Math.PI);
                    t.slicedTranslation = {
                        translateX: Math.round(Math.cos(z) * h),
                        translateY: Math.round(Math.sin(z) * h)
                    };
                    var u = Math.cos(z) * e[2] / 2;
                    var B = Math.sin(z) * e[2] / 2;
                    t.tooltipPos = [e[0] + .7 * u, e[1] + .7 * B];
                    t.half = z < -Math.PI / 2 || z > Math.PI / 2 ? 1 : 0;
                    t.angle = z;
                    x = Math.min(d, t.labelDistance / 5);
                    t.labelPosition = {
                        natural: {
                            x: e[0] + u + Math.cos(z) * t.labelDistance,
                            y: e[1] + B + Math.sin(z) * t.labelDistance
                        },
                        "final": {},
                        alignment: 0 > t.labelDistance ? "center" : t.half ? "right" : "left",
                        connectorPosition: {
                            breakAt: {
                                x: e[0] +
                                    u + Math.cos(z) * x,
                                y: e[1] + B + Math.sin(z) * x
                            },
                            touchingSliceAt: {
                                x: e[0] + u,
                                y: e[1] + B
                            }
                        }
                    }
                }
                C(this, "afterTranslate")
            },
            drawEmpty: function() {
                var e = this.options;
                if (0 === this.total) {
                    var a = this.center[0];
                    var c = this.center[1];
                    this.graph || (this.graph = this.chart.renderer.circle(a, c, 0).addClass("highcharts-graph").add(this.group));
                    this.graph.animate({
                        "stroke-width": e.borderWidth,
                        cx: a,
                        cy: c,
                        r: this.center[2] / 2,
                        fill: e.fillColor || "none",
                        stroke: e.color || "#cccccc"
                    }, this.options.animation)
                } else this.graph && (this.graph = this.graph.destroy())
            },
            redrawPoints: function() {
                var e = this,
                    a = e.chart,
                    c = a.renderer,
                    h, d, b, l, f = e.options.shadow;
                this.drawEmpty();
                !f || e.shadowGroup || a.styledMode || (e.shadowGroup = c.g("shadow").attr({
                    zIndex: -1
                }).add(e.group));
                e.points.forEach(function(g) {
                    var k = {};
                    d = g.graphic;
                    if (!g.isNull && d) {
                        l = g.shapeArgs;
                        h = g.getTranslate();
                        if (!a.styledMode) {
                            var r = g.shadowGroup;
                            f && !r && (r = g.shadowGroup = c.g("shadow").add(e.shadowGroup));
                            r && r.attr(h);
                            b = e.pointAttribs(g, g.selected && "select")
                        }
                        g.delayedRendering ? (d.setRadialReference(e.center).attr(l).attr(h),
                            a.styledMode || d.attr(b).attr({
                                "stroke-linejoin": "round"
                            }).shadow(f, r), g.delayedRendering = !1) : (d.setRadialReference(e.center), a.styledMode || D(!0, k, b), D(!0, k, l, h), d.animate(k));
                        d.attr({
                            visibility: g.visible ? "inherit" : "hidden"
                        });
                        d.addClass(g.getClassName())
                    } else d && (g.graphic = d.destroy())
                })
            },
            drawPoints: function() {
                var e = this.chart.renderer;
                this.points.forEach(function(a) {
                    a.graphic && a.hasNewShapeType() && (a.graphic = a.graphic.destroy());
                    a.graphic || (a.graphic = e[a.shapeType](a.shapeArgs).add(a.series.group),
                        a.delayedRendering = !0)
                })
            },
            searchPoint: p,
            sortByAngle: function(e, a) {
                e.sort(function(e, c) {
                    return "undefined" !== typeof e.angle && (c.angle - e.angle) * a
                })
            },
            drawLegendSymbol: f.drawRectangle,
            getCenter: q.getCenter,
            getSymbol: p,
            drawGraph: null
        }, {
            init: function() {
                u.prototype.init.apply(this, arguments);
                var e = this;
                e.name = k(e.name, "Slice");
                var a = function(a) {
                    e.slice("select" === a.type)
                };
                A(e, "select", a);
                A(e, "unselect", a);
                return e
            },
            isValid: function() {
                return F(this.y) && 0 <= this.y
            },
            setVisible: function(e, a) {
                var c = this,
                    h = c.series,
                    d = h.chart,
                    b = h.options.ignoreHiddenPoint;
                a = k(a, b);
                e !== c.visible && (c.visible = c.options.visible = e = "undefined" === typeof e ? !c.visible : e, h.options.data[h.data.indexOf(c)] = c.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function(a) {
                    if (c[a]) c[a][e ? "show" : "hide"](!0)
                }), c.legendItem && d.legend.colorizeItem(c, e), e || "hover" !== c.state || c.setState(""), b && (h.isDirty = !0), a && d.redraw())
            },
            slice: function(e, a, c) {
                var g = this.series;
                z(c, g.chart);
                k(a, !0);
                this.sliced = this.options.sliced = G(e) ? e : !this.sliced;
                g.options.data[g.data.indexOf(this)] = this.options;
                this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            },
            getTranslate: function() {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function(e) {
                var a = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(a.x, a.y, a.r + e, a.r + e, {
                    innerR: a.r - 1,
                    start: a.start,
                    end: a.end
                })
            },
            connectorShapes: {
                fixedOffset: function(e, a, c) {
                    var g = a.breakAt;
                    a = a.touchingSliceAt;
                    return ["M", e.x, e.y].concat(c.softConnector ? ["C", e.x + ("left" === e.alignment ? -5 : 5), e.y, 2 * g.x - a.x, 2 * g.y - a.y, g.x, g.y] : ["L", g.x, g.y]).concat(["L", a.x, a.y])
                },
                straight: function(e, a) {
                    a = a.touchingSliceAt;
                    return ["M", e.x, e.y, "L", a.x, a.y]
                },
                crookedLine: function(e, a, c) {
                    a = a.touchingSliceAt;
                    var g = this.series,
                        d = g.center[0],
                        b = g.chart.plotWidth,
                        l = g.chart.plotLeft;
                    g = e.alignment;
                    var f = this.shapeArgs.r;
                    c = m(c.crookDistance, 1);
                    c = "left" === g ? d + f + (b + l - d - f) * (1 - c) : l + (d - f) * c;
                    d = ["L", c, e.y];
                    if ("left" === g ? c > e.x || c < a.x : c < e.x || c > a.x) d = [];
                    return ["M", e.x, e.y].concat(d).concat(["L", a.x, a.y])
                }
            },
            getConnectorPath: function() {
                var e = this.labelPosition,
                    a = this.series.options.dataLabels,
                    c = a.connectorShape,
                    h = this.connectorShapes;
                h[c] && (c = h[c]);
                return c.call(this, {
                    x: e.final.x,
                    y: e.final.y,
                    alignment: e.alignment
                }, e.connectorPosition, a)
            }
        });
        ""
    });
    O(u, "parts/DataLabels.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        var u = f.animObject,
            q = f.arrayMax,
            A = f.clamp,
            t = f.defined,
            M = f.extend,
            C = f.format,
            F = f.isArray,
            D = f.merge,
            k = f.objectEach,
            m =
            f.pick,
            x = f.relativeLength,
            z = f.splat,
            w = f.stableSort;
        f = c.noop;
        var p = c.Series,
            K = c.seriesTypes;
        c.distribute = function(e, a, g) {
            function h(a, b) {
                return a.target - b.target
            }
            var d, b = !0,
                f = e,
                k = [];
            var r = 0;
            var p = f.reducedLen || a;
            for (d = e.length; d--;) r += e[d].size;
            if (r > p) {
                w(e, function(a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (r = d = 0; r <= p;) r += e[d].size, d++;
                k = e.splice(d - 1, e.length)
            }
            w(e, h);
            for (e = e.map(function(a) {
                    return {
                        size: a.size,
                        targets: [a.target],
                        align: m(a.align, .5)
                    }
                }); b;) {
                for (d = e.length; d--;) b = e[d], r = (Math.min.apply(0,
                    b.targets) + Math.max.apply(0, b.targets)) / 2, b.pos = A(r - b.size * b.align, 0, a - b.size);
                d = e.length;
                for (b = !1; d--;) 0 < d && e[d - 1].pos + e[d - 1].size > e[d].pos && (e[d - 1].size += e[d].size, e[d - 1].targets = e[d - 1].targets.concat(e[d].targets), e[d - 1].align = .5, e[d - 1].pos + e[d - 1].size > a && (e[d - 1].pos = a - e[d - 1].size), e.splice(d, 1), b = !0)
            }
            f.push.apply(f, k);
            d = 0;
            e.some(function(b) {
                var e = 0;
                if (b.targets.some(function() {
                        f[d].pos = b.pos + e;
                        if ("undefined" !== typeof g && Math.abs(f[d].pos - f[d].target) > g) return f.slice(0, d + 1).forEach(function(a) {
                                delete a.pos
                            }),
                            f.reducedLen = (f.reducedLen || a) - .1 * a, f.reducedLen > .1 * a && c.distribute(f, a, g), !0;
                        e += f[d].size;
                        d++
                    })) return !0
            });
            w(f, h)
        };
        p.prototype.drawDataLabels = function() {
            function e(a, b) {
                var d = b.filter;
                return d ? (b = d.operator, a = a[d.property], d = d.value, ">" === b && a > d || "<" === b && a < d || ">=" === b && a >= d || "<=" === b && a <= d || "==" === b && a == d || "===" === b && a === d ? !0 : !1) : !0
            }

            function a(a, b) {
                var d = [],
                    e;
                if (F(a) && !F(b)) d = a.map(function(a) {
                    return D(a, b)
                });
                else if (F(b) && !F(a)) d = b.map(function(b) {
                    return D(a, b)
                });
                else if (F(a) || F(b))
                    for (e = Math.max(a.length,
                            b.length); e--;) d[e] = D(a[e], b[e]);
                else d = D(a, b);
                return d
            }
            var g = this,
                h = g.chart,
                d = g.options,
                b = d.dataLabels,
                f = g.points,
                p, r = g.hasRendered || 0,
                q = u(d.animation).duration,
                x = Math.min(q, 200),
                w = !h.renderer.forExport && m(b.defer, 0 < x),
                A = h.renderer;
            b = a(a(h.options.plotOptions && h.options.plotOptions.series && h.options.plotOptions.series.dataLabels, h.options.plotOptions && h.options.plotOptions[g.type] && h.options.plotOptions[g.type].dataLabels), b);
            c.fireEvent(this, "drawDataLabels");
            if (F(b) || b.enabled || g._hasPointLabels) {
                var G =
                    g.plotGroup("dataLabelsGroup", "data-labels", w && !r ? "hidden" : "inherit", b.zIndex || 6);
                w && (G.attr({
                    opacity: +r
                }), r || setTimeout(function() {
                    var a = g.dataLabelsGroup;
                    a && (g.visible && G.show(!0), a[d.animation ? "animate" : "attr"]({
                        opacity: 1
                    }, {
                        duration: x
                    }))
                }, q - x));
                f.forEach(function(c) {
                    p = z(a(b, c.dlOptions || c.options && c.options.dataLabels));
                    p.forEach(function(a, b) {
                        var f = a.enabled && (!c.isNull || c.dataLabelOnNull) && e(c, a),
                            l = c.dataLabels ? c.dataLabels[b] : c.dataLabel,
                            n = c.connectors ? c.connectors[b] : c.connector,
                            r = m(a.distance,
                                c.labelDistance),
                            p = !l;
                        if (f) {
                            var q = c.getLabelConfig();
                            var y = m(a[c.formatPrefix + "Format"], a.format);
                            q = t(y) ? C(y, q, h) : (a[c.formatPrefix + "Formatter"] || a.formatter).call(q, a);
                            y = a.style;
                            var v = a.rotation;
                            h.styledMode || (y.color = m(a.color, y.color, g.color, "#000000"), "contrast" === y.color ? (c.contrastColor = A.getContrast(c.color || g.color), y.color = !t(r) && a.inside || 0 > r || d.stacking ? c.contrastColor : "#000000") : delete c.contrastColor, d.cursor && (y.cursor = d.cursor));
                            var x = {
                                r: a.borderRadius || 0,
                                rotation: v,
                                padding: a.padding,
                                zIndex: 1
                            };
                            h.styledMode || (x.fill = a.backgroundColor, x.stroke = a.borderColor, x["stroke-width"] = a.borderWidth);
                            k(x, function(a, b) {
                                "undefined" === typeof a && delete x[b]
                            })
                        }!l || f && t(q) ? f && t(q) && (l ? x.text = q : (c.dataLabels = c.dataLabels || [], l = c.dataLabels[b] = v ? A.text(q, 0, -9999, a.useHTML).addClass("highcharts-data-label") : A.label(q, 0, -9999, a.shape, null, null, a.useHTML, null, "data-label"), b || (c.dataLabel = l), l.addClass(" highcharts-data-label-color-" + c.colorIndex + " " + (a.className || "") + (a.useHTML ? " highcharts-tracker" :
                            ""))), l.options = a, l.attr(x), h.styledMode || l.css(y).shadow(a.shadow), l.added || l.add(G), a.textPath && !a.useHTML && (l.setTextPath(c.getDataLabelPath && c.getDataLabelPath(l) || c.graphic, a.textPath), c.dataLabelPath && !a.textPath.enabled && (c.dataLabelPath = c.dataLabelPath.destroy())), g.alignDataLabel(c, l, a, null, p)) : (c.dataLabel = c.dataLabel && c.dataLabel.destroy(), c.dataLabels && (1 === c.dataLabels.length ? delete c.dataLabels : delete c.dataLabels[b]), b || delete c.dataLabel, n && (c.connector = c.connector.destroy(), c.connectors &&
                            (1 === c.connectors.length ? delete c.connectors : delete c.connectors[b])))
                    })
                })
            }
            c.fireEvent(this, "afterDrawDataLabels")
        };
        p.prototype.alignDataLabel = function(e, a, c, h, d) {
            var b = this,
                g = this.chart,
                f = this.isCartesian && g.inverted,
                k = this.enabledDataSorting,
                p = m(e.dlBox && e.dlBox.centerX, e.plotX, -9999),
                q = m(e.plotY, -9999),
                t = a.getBBox(),
                x = c.rotation,
                z = c.align,
                w = g.isInsidePlot(p, Math.round(q), f),
                u = "justify" === m(c.overflow, k ? "none" : "justify"),
                n = this.visible && !1 !== e.visible && (e.series.forceDL || k && !u || w || c.inside && h &&
                    g.isInsidePlot(p, f ? h.x + 1 : h.y + h.height - 1, f));
            var A = function(c) {
                k && b.xAxis && !u && b.setDataLabelStartPos(e, a, d, w, c)
            };
            if (n) {
                var D = g.renderer.fontMetrics(g.styledMode ? void 0 : c.style.fontSize, a).b;
                h = M({
                    x: f ? this.yAxis.len - q : p,
                    y: Math.round(f ? this.xAxis.len - p : q),
                    width: 0,
                    height: 0
                }, h);
                M(c, {
                    width: t.width,
                    height: t.height
                });
                x ? (u = !1, p = g.renderer.rotCorr(D, x), p = {
                        x: h.x + c.x + h.width / 2 + p.x,
                        y: h.y + c.y + {
                            top: 0,
                            middle: .5,
                            bottom: 1
                        }[c.verticalAlign] * h.height
                    }, A(p), a[d ? "attr" : "animate"](p).attr({
                        align: z
                    }), A = (x + 720) % 360, A = 180 <
                    A && 360 > A, "left" === z ? p.y -= A ? t.height : 0 : "center" === z ? (p.x -= t.width / 2, p.y -= t.height / 2) : "right" === z && (p.x -= t.width, p.y -= A ? 0 : t.height), a.placed = !0, a.alignAttr = p) : (A(h), a.align(c, null, h), p = a.alignAttr);
                u && 0 <= h.height ? this.justifyDataLabel(a, c, p, t, h, d) : m(c.crop, !0) && (n = g.isInsidePlot(p.x, p.y) && g.isInsidePlot(p.x + t.width, p.y + t.height));
                if (c.shape && !x) a[d ? "attr" : "animate"]({
                    anchorX: f ? g.plotWidth - e.plotY : e.plotX,
                    anchorY: f ? g.plotHeight - e.plotX : e.plotY
                })
            }
            d && k && (a.placed = !1);
            n || k && !u || (a.hide(!0), a.placed = !1)
        };
        p.prototype.setDataLabelStartPos = function(e, a, c, h, d) {
            var b = this.chart,
                g = b.inverted,
                f = this.xAxis,
                k = f.reversed,
                p = g ? a.height / 2 : a.width / 2;
            e = (e = e.pointWidth) ? e / 2 : 0;
            f = g ? d.x : k ? -p - e : f.width - p + e;
            d = g ? k ? this.yAxis.height - p + e : -p - e : d.y;
            a.startXPos = f;
            a.startYPos = d;
            h ? "hidden" === a.visibility && (a.show(), a.attr({
                opacity: 0
            }).animate({
                opacity: 1
            })) : a.attr({
                opacity: 1
            }).animate({
                opacity: 0
            }, void 0, a.hide);
            b.hasRendered && (c && a.attr({
                x: a.startXPos,
                y: a.startYPos
            }), a.placed = !0)
        };
        p.prototype.justifyDataLabel = function(e, a, c, h,
            d, b) {
            var g = this.chart,
                f = a.align,
                k = a.verticalAlign,
                p = e.box ? 0 : e.padding || 0;
            var m = c.x + p;
            if (0 > m) {
                "right" === f ? (a.align = "left", a.inside = !0) : a.x = -m;
                var q = !0
            }
            m = c.x + h.width - p;
            m > g.plotWidth && ("left" === f ? (a.align = "right", a.inside = !0) : a.x = g.plotWidth - m, q = !0);
            m = c.y + p;
            0 > m && ("bottom" === k ? (a.verticalAlign = "top", a.inside = !0) : a.y = -m, q = !0);
            m = c.y + h.height - p;
            m > g.plotHeight && ("top" === k ? (a.verticalAlign = "bottom", a.inside = !0) : a.y = g.plotHeight - m, q = !0);
            q && (e.placed = !b, e.align(a, null, d));
            return q
        };
        K.pie && (K.pie.prototype.dataLabelPositioners = {
            radialDistributionY: function(e) {
                return e.top + e.distributeBox.pos
            },
            radialDistributionX: function(e, a, c, h) {
                return e.getX(c < a.top + 2 || c > a.bottom - 2 ? h : c, a.half, a)
            },
            justify: function(e, a, c) {
                return c[0] + (e.half ? -1 : 1) * (a + e.labelDistance)
            },
            alignToPlotEdges: function(e, a, c, h) {
                e = e.getBBox().width;
                return a ? e + h : c - e - h
            },
            alignToConnectors: function(e, a, c, h) {
                var d = 0,
                    b;
                e.forEach(function(a) {
                    b = a.dataLabel.getBBox().width;
                    b > d && (d = b)
                });
                return a ? d + h : c - d - h
            }
        }, K.pie.prototype.drawDataLabels = function() {
            var e = this,
                a = e.data,
                g, h =
                e.chart,
                d = e.options.dataLabels || {},
                b = d.connectorPadding,
                f, k = h.plotWidth,
                r = h.plotHeight,
                v = h.plotLeft,
                x = Math.round(h.chartWidth / 3),
                z, w = e.center,
                u = w[2] / 2,
                A = w[1],
                B, n, H, J, G = [
                    [],
                    []
                ],
                C, K, F, E, M = [0, 0, 0, 0],
                O = e.dataLabelPositioners,
                X;
            e.visible && (d.enabled || e._hasPointLabels) && (a.forEach(function(a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                    width: "auto"
                }).css({
                    width: "auto",
                    textOverflow: "clip"
                }), a.dataLabel.shortened = !1)
            }), p.prototype.drawDataLabels.apply(e), a.forEach(function(a) {
                a.dataLabel &&
                    (a.visible ? (G[a.half].push(a), a.dataLabel._pos = null, !t(d.style.width) && !t(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > x && (a.dataLabel.css({
                        width: .7 * x
                    }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
            }), G.forEach(function(a, f) {
                var l = a.length,
                    p = [],
                    q;
                if (l) {
                    e.sortByAngle(a, f - .5);
                    if (0 < e.maxLabelDistance) {
                        var y = Math.max(0, A - u - e.maxLabelDistance);
                        var x = Math.min(A +
                            u + e.maxLabelDistance, h.plotHeight);
                        a.forEach(function(a) {
                            0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, A - u - a.labelDistance), a.bottom = Math.min(A + u + a.labelDistance, h.plotHeight), q = a.dataLabel.getBBox().height || 21, a.distributeBox = {
                                target: a.labelPosition.natural.y - a.top + q / 2,
                                size: q,
                                rank: a.y
                            }, p.push(a.distributeBox))
                        });
                        y = x + q - y;
                        c.distribute(p, y, y / 5)
                    }
                    for (E = 0; E < l; E++) {
                        g = a[E];
                        H = g.labelPosition;
                        B = g.dataLabel;
                        F = !1 === g.visible ? "hidden" : "inherit";
                        K = y = H.natural.y;
                        p && t(g.distributeBox) && ("undefined" === typeof g.distributeBox.pos ?
                            F = "hidden" : (J = g.distributeBox.size, K = O.radialDistributionY(g)));
                        delete g.positionIndex;
                        if (d.justify) C = O.justify(g, u, w);
                        else switch (d.alignTo) {
                            case "connectors":
                                C = O.alignToConnectors(a, f, k, v);
                                break;
                            case "plotEdges":
                                C = O.alignToPlotEdges(B, f, k, v);
                                break;
                            default:
                                C = O.radialDistributionX(e, g, K, y)
                        }
                        B._attr = {
                            visibility: F,
                            align: H.alignment
                        };
                        X = g.options.dataLabels || {};
                        B._pos = {
                            x: C + m(X.x, d.x) + ({
                                left: b,
                                right: -b
                            }[H.alignment] || 0),
                            y: K + m(X.y, d.y) - 10
                        };
                        H.final.x = C;
                        H.final.y = K;
                        m(d.crop, !0) && (n = B.getBBox().width, y = null,
                            C - n < b && 1 === f ? (y = Math.round(n - C + b), M[3] = Math.max(y, M[3])) : C + n > k - b && 0 === f && (y = Math.round(C + n - k + b), M[1] = Math.max(y, M[1])), 0 > K - J / 2 ? M[0] = Math.max(Math.round(-K + J / 2), M[0]) : K + J / 2 > r && (M[2] = Math.max(Math.round(K + J / 2 - r), M[2])), B.sideOverflow = y)
                    }
                }
            }), 0 === q(M) || this.verifyDataLabelOverflow(M)) && (this.placeDataLabels(), this.points.forEach(function(a) {
                X = D(d, a.options.dataLabels);
                if (f = m(X.connectorWidth, 1)) {
                    var b;
                    z = a.connector;
                    if ((B = a.dataLabel) && B._pos && a.visible && 0 < a.labelDistance) {
                        F = B._attr.visibility;
                        if (b = !z) a.connector =
                            z = h.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ? " " + a.className : "")).add(e.dataLabelsGroup), h.styledMode || z.attr({
                                "stroke-width": f,
                                stroke: X.connectorColor || a.color || "#666666"
                            });
                        z[b ? "attr" : "animate"]({
                            d: a.getConnectorPath()
                        });
                        z.attr("visibility", F)
                    } else z && (a.connector = z.destroy())
                }
            }))
        }, K.pie.prototype.placeDataLabels = function() {
            this.points.forEach(function(e) {
                var a = e.dataLabel,
                    c;
                a && e.visible && ((c = a._pos) ? (a.sideOverflow && (a._attr.width = Math.max(a.getBBox().width -
                    a.sideOverflow, 0), a.css({
                    width: a._attr.width + "px",
                    textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                }), a.shortened = !0), a.attr(a._attr), a[a.moved ? "animate" : "attr"](c), a.moved = !0) : a && a.attr({
                    y: -9999
                }));
                delete e.distributeBox
            }, this)
        }, K.pie.prototype.alignDataLabel = f, K.pie.prototype.verifyDataLabelOverflow = function(e) {
            var a = this.center,
                c = this.options,
                h = c.center,
                d = c.minSize || 80,
                b = null !== c.size;
            if (!b) {
                if (null !== h[0]) var f = Math.max(a[2] - Math.max(e[1], e[3]), d);
                else f = Math.max(a[2] -
                    e[1] - e[3], d), a[0] += (e[3] - e[1]) / 2;
                null !== h[1] ? f = A(f, d, a[2] - Math.max(e[0], e[2])) : (f = A(f, d, a[2] - e[0] - e[2]), a[1] += (e[0] - e[2]) / 2);
                f < a[2] ? (a[2] = f, a[3] = Math.min(x(c.innerSize || 0, f), f), this.translate(a), this.drawDataLabels && this.drawDataLabels()) : b = !0
            }
            return b
        });
        K.column && (K.column.prototype.alignDataLabel = function(e, a, c, h, d) {
            var b = this.chart.inverted,
                g = e.series,
                f = e.dlBox || e.shapeArgs,
                k = m(e.below, e.plotY > m(this.translatedThreshold, g.yAxis.len)),
                q = m(c.inside, !!this.options.stacking);
            f && (h = D(f), 0 > h.y && (h.height +=
                h.y, h.y = 0), f = h.y + h.height - g.yAxis.len, 0 < f && f < h.height && (h.height -= f), b && (h = {
                x: g.yAxis.len - h.y - h.height,
                y: g.xAxis.len - h.x - h.width,
                width: h.height,
                height: h.width
            }), q || (b ? (h.x += k ? 0 : h.width, h.width = 0) : (h.y += k ? h.height : 0, h.height = 0)));
            c.align = m(c.align, !b || q ? "center" : k ? "right" : "left");
            c.verticalAlign = m(c.verticalAlign, b || q ? "middle" : k ? "top" : "bottom");
            p.prototype.alignDataLabel.call(this, e, a, c, h, d);
            c.inside && e.contrastColor && a.css({
                color: e.contrastColor
            })
        })
    });
    O(u, "modules/overlapping-datalabels.src.js", [u["parts/Globals.js"],
        u["parts/Utilities.js"]
    ], function(c, f) {
        var u = f.addEvent,
            q = f.fireEvent,
            A = f.isArray,
            t = f.objectEach,
            M = f.pick;
        c = c.Chart;
        u(c, "render", function() {
            var c = [];
            (this.labelCollectors || []).forEach(function(f) {
                c = c.concat(f())
            });
            (this.yAxis || []).forEach(function(f) {
                f.options.stackLabels && !f.options.stackLabels.allowOverlap && t(f.stacks, function(f) {
                    t(f, function(f) {
                        c.push(f.label)
                    })
                })
            });
            (this.series || []).forEach(function(f) {
                var q = f.options.dataLabels;
                f.visible && (!1 !== q.enabled || f._hasPointLabels) && (f.nodes || f.points).forEach(function(f) {
                    f.visible &&
                        (A(f.dataLabels) ? f.dataLabels : f.dataLabel ? [f.dataLabel] : []).forEach(function(k) {
                            var m = k.options;
                            k.labelrank = M(m.labelrank, f.labelrank, f.shapeArgs && f.shapeArgs.height);
                            m.allowOverlap || c.push(k)
                        })
                })
            });
            this.hideOverlappingLabels(c)
        });
        c.prototype.hideOverlappingLabels = function(c) {
            var f = this,
                t = c.length,
                k = f.renderer,
                m, x, z, w = !1;
            var p = function(a) {
                var e = a.box ? 0 : a.padding || 0;
                var c = 0;
                if (a && (!a.alignAttr || a.placed)) {
                    var d = a.alignAttr || {
                        x: a.attr("x"),
                        y: a.attr("y")
                    };
                    var b = a.parentGroup;
                    a.width || (c = a.getBBox(),
                        a.width = c.width, a.height = c.height, c = k.fontMetrics(null, a.element).h);
                    return {
                        x: d.x + (b.translateX || 0) + e,
                        y: d.y + (b.translateY || 0) + e - c,
                        width: a.width - 2 * e,
                        height: a.height - 2 * e
                    }
                }
            };
            for (x = 0; x < t; x++)
                if (m = c[x]) m.oldOpacity = m.opacity, m.newOpacity = 1, m.absoluteBox = p(m);
            c.sort(function(a, e) {
                return (e.labelrank || 0) - (a.labelrank || 0)
            });
            for (x = 0; x < t; x++) {
                var u = (p = c[x]) && p.absoluteBox;
                for (m = x + 1; m < t; ++m) {
                    var e = (z = c[m]) && z.absoluteBox;
                    !u || !e || p === z || 0 === p.newOpacity || 0 === z.newOpacity || e.x > u.x + u.width || e.x + e.width < u.x || e.y >
                        u.y + u.height || e.y + e.height < u.y || ((p.labelrank < z.labelrank ? p : z).newOpacity = 0)
                }
            }
            c.forEach(function(a) {
                var e;
                if (a) {
                    var c = a.newOpacity;
                    a.oldOpacity !== c && (a.alignAttr && a.placed ? (c ? a.show(!0) : e = function() {
                        a.hide(!0);
                        a.placed = !1
                    }, w = !0, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, e), q(f, "afterHideOverlappingLabel")) : a.attr({
                        opacity: c
                    }));
                    a.isOld = !0
                }
            });
            w && q(f, "afterHideAllOverlappingLabels")
        }
    });
    O(u, "parts/Interaction.js", [u["parts/Globals.js"], u["parts/Legend.js"], u["parts/Point.js"],
        u["parts/Utilities.js"]
    ], function(c, f, u, q) {
        var A = q.addEvent,
            t = q.createElement,
            G = q.css,
            C = q.defined,
            F = q.extend,
            D = q.fireEvent,
            k = q.isArray,
            m = q.isFunction,
            x = q.isObject,
            z = q.merge,
            w = q.objectEach,
            p = q.pick;
        q = c.Chart;
        var K = c.defaultOptions,
            e = c.defaultPlotOptions,
            a = c.hasTouch,
            g = c.Series,
            h = c.seriesTypes,
            d = c.svg;
        c = c.TrackerMixin = {
            drawTrackerPoint: function() {
                var b = this,
                    d = b.chart,
                    e = d.pointer,
                    c = function(a) {
                        var b = e.getPointFromEvent(a);
                        "undefined" !== typeof b && (e.isDirectTouch = !0, b.onMouseOver(a))
                    },
                    g;
                b.points.forEach(function(a) {
                    g =
                        k(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [];
                    a.graphic && (a.graphic.element.point = a);
                    g.forEach(function(b) {
                        b.div ? b.div.point = a : b.element.point = a
                    })
                });
                b._hasTracking || (b.trackerGroups.forEach(function(g) {
                    if (b[g]) {
                        b[g].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function(a) {
                            e.onTrackerMouseOut(a)
                        });
                        if (a) b[g].on("touchstart", c);
                        !d.styledMode && b.options.cursor && b[g].css(G).css({
                            cursor: b.options.cursor
                        })
                    }
                }), b._hasTracking = !0);
                D(this, "afterDrawTracker")
            },
            drawTrackerGraph: function() {
                var b =
                    this,
                    e = b.options,
                    c = e.trackByArea,
                    g = [].concat(c ? b.areaPath : b.graphPath),
                    f = g.length,
                    h = b.chart,
                    k = h.pointer,
                    p = h.renderer,
                    m = h.options.tooltip.snap,
                    q = b.tracker,
                    t, n = function(a) {
                        k.normalize(a);
                        if (h.hoverSeries !== b && !k.isStickyTooltip(a)) b.onMouseOver()
                    },
                    x = "rgba(192,192,192," + (d ? .0001 : .002) + ")";
                if (f && !c)
                    for (t = f + 1; t--;) "M" === g[t] && g.splice(t + 1, 0, g[t + 1] - m, g[t + 2], "L"), (t && "M" === g[t] || t === f) && g.splice(t, 0, "L", g[t - 2] + m, g[t - 1]);
                q ? q.attr({
                    d: g
                }) : b.graph && (b.tracker = p.path(g).attr({
                    visibility: b.visible ? "visible" : "hidden",
                    zIndex: 2
                }).addClass(c ? "highcharts-tracker-area" : "highcharts-tracker-line").add(b.group), h.styledMode || b.tracker.attr({
                    "stroke-linejoin": "round",
                    stroke: x,
                    fill: c ? x : "none",
                    "stroke-width": b.graph.strokeWidth() + (c ? 0 : 2 * m)
                }), [b.tracker, b.markerGroup].forEach(function(b) {
                    b.addClass("highcharts-tracker").on("mouseover", n).on("mouseout", function(a) {
                        k.onTrackerMouseOut(a)
                    });
                    e.cursor && !h.styledMode && b.css({
                        cursor: e.cursor
                    });
                    if (a) b.on("touchstart", n)
                }));
                D(this, "afterDrawTracker")
            }
        };
        h.column && (h.column.prototype.drawTracker =
            c.drawTrackerPoint);
        h.pie && (h.pie.prototype.drawTracker = c.drawTrackerPoint);
        h.scatter && (h.scatter.prototype.drawTracker = c.drawTrackerPoint);
        F(f.prototype, {
            setItemEvents: function(a, d, e) {
                var b = this,
                    c = b.chart.renderer.boxWrapper,
                    g = a instanceof u,
                    f = "highcharts-legend-" + (g ? "point" : "series") + "-active",
                    h = b.chart.styledMode;
                (e ? [d, a.legendSymbol] : [a.legendGroup]).forEach(function(e) {
                    if (e) e.on("mouseover", function() {
                        a.visible && b.allItems.forEach(function(b) {
                            a !== b && b.setState("inactive", !g)
                        });
                        a.setState("hover");
                        a.visible && c.addClass(f);
                        h || d.css(b.options.itemHoverStyle)
                    }).on("mouseout", function() {
                        b.chart.styledMode || d.css(z(a.visible ? b.itemStyle : b.itemHiddenStyle));
                        b.allItems.forEach(function(b) {
                            a !== b && b.setState("", !g)
                        });
                        c.removeClass(f);
                        a.setState()
                    }).on("click", function(d) {
                        var e = function() {
                            a.setVisible && a.setVisible();
                            b.allItems.forEach(function(b) {
                                a !== b && b.setState(a.visible ? "inactive" : "", !g)
                            })
                        };
                        c.removeClass(f);
                        d = {
                            browserEvent: d
                        };
                        a.firePointEvent ? a.firePointEvent("legendItemClick", d, e) : D(a, "legendItemClick",
                            d, e)
                    })
                })
            },
            createCheckboxForItem: function(a) {
                a.checkbox = t("input", {
                    type: "checkbox",
                    className: "highcharts-legend-checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                A(a.checkbox, "click", function(b) {
                    D(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function() {
                        a.select()
                    })
                })
            }
        });
        F(q.prototype, {
            showResetZoom: function() {
                function a() {
                    d.zoomOut()
                }
                var d = this,
                    e = K.lang,
                    c = d.options.chart.resetZoomButton,
                    g = c.theme,
                    f = g.states,
                    h = "chart" === c.relativeTo ||
                    "spaceBox" === c.relativeTo ? null : "plotBox";
                D(this, "beforeShowResetZoom", null, function() {
                    d.resetZoomButton = d.renderer.button(e.resetZoom, null, null, a, g, f && f.hover).attr({
                        align: c.position.align,
                        title: e.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(c.position, !1, h)
                });
                D(this, "afterShowResetZoom")
            },
            zoomOut: function() {
                D(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            },
            zoom: function(a) {
                var b = this,
                    d, e = b.pointer,
                    c = !1,
                    g = b.inverted ? e.mouseDownX : e.mouseDownY;
                !a || a.resetSelection ? (b.axes.forEach(function(a) {
                    d =
                        a.zoom()
                }), e.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function(a) {
                    var f = a.axis,
                        h = b.inverted ? f.left : f.top,
                        l = b.inverted ? h + f.width : h + f.height,
                        k = f.isXAxis,
                        p = !1;
                    if (!k && g >= h && g <= l || k || !C(g)) p = !0;
                    e[k ? "zoomX" : "zoomY"] && p && (d = f.zoom(a.min, a.max), f.displayBtn && (c = !0))
                });
                var f = b.resetZoomButton;
                c && !f ? b.showResetZoom() : !c && x(f) && (b.resetZoomButton = f.destroy());
                d && b.redraw(p(b.options.chart.animation, a && a.animation, 100 > b.pointCount))
            },
            pan: function(a, d) {
                var b = this,
                    e = b.hoverPoints,
                    c = b.options.chart,
                    g;
                d = "object" ===
                    typeof d ? d : {
                        enabled: d,
                        type: "x"
                    };
                c && c.panning && (c.panning = d);
                var f = d.type;
                D(this, "pan", {
                    originalEvent: a
                }, function() {
                    e && e.forEach(function(a) {
                        a.setState()
                    });
                    var d = [1];
                    "xy" === f ? d = [1, 0] : "y" === f && (d = [0]);
                    d.forEach(function(d) {
                        var e = b[d ? "xAxis" : "yAxis"][0],
                            c = e.options,
                            f = e.horiz,
                            h = a[f ? "chartX" : "chartY"];
                        f = f ? "mouseDownX" : "mouseDownY";
                        var l = b[f],
                            k = (e.pointRange || 0) / 2,
                            p = e.reversed && !b.inverted || !e.reversed && b.inverted ? -1 : 1,
                            m = e.getExtremes(),
                            r = e.toValue(l - h, !0) + k * p;
                        p = e.toValue(l + e.len - h, !0) - k * p;
                        var q = p < r;
                        l =
                            q ? p : r;
                        r = q ? r : p;
                        p = Math.min(m.dataMin, k ? m.min : e.toValue(e.toPixels(m.min) - e.minPixelPadding));
                        k = Math.max(m.dataMax, k ? m.max : e.toValue(e.toPixels(m.max) + e.minPixelPadding));
                        if (!c.ordinal) {
                            d && (c = p - l, 0 < c && (r += c, l = p), c = r - k, 0 < c && (r = k, l -= c));
                            if (e.series.length && l !== m.min && r !== m.max && d || e.panningState && l >= e.panningState.startMin && r <= e.panningState.startMax) e.setExtremes(l, r, !1, !1, {
                                trigger: "pan"
                            }), g = !0;
                            b[f] = h
                        }
                    });
                    g && b.redraw(!1);
                    G(b.container, {
                        cursor: "move"
                    })
                })
            }
        });
        F(u.prototype, {
            select: function(a, d) {
                var b = this,
                    e = b.series,
                    c = e.chart;
                this.selectedStaging = a = p(a, !b.selected);
                b.firePointEvent(a ? "select" : "unselect", {
                    accumulate: d
                }, function() {
                    b.selected = b.options.selected = a;
                    e.options.data[e.data.indexOf(b)] = b.options;
                    b.setState(a && "select");
                    d || c.getSelectedPoints().forEach(function(a) {
                        var d = a.series;
                        a.selected && a !== b && (a.selected = a.options.selected = !1, d.options.data[d.data.indexOf(a)] = a.options, a.setState(c.hoverPoints && d.options.inactiveOtherPoints ? "inactive" : ""), a.firePointEvent("unselect"))
                    })
                });
                delete this.selectedStaging
            },
            onMouseOver: function(a) {
                var b = this.series.chart,
                    d = b.pointer;
                a = a ? d.normalize(a) : d.getChartCoordinatesFromPoint(this, b.inverted);
                d.runPointActions(a, this)
            },
            onMouseOut: function() {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function(a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var a = this,
                        d = z(a.series.options.point, a.options).events;
                    a.events = d;
                    w(d, function(b, d) {
                        m(b) &&
                            A(a, d, b)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function(a, d) {
                var b = this.series,
                    c = this.state,
                    g = b.options.states[a || "normal"] || {},
                    f = e[b.type].marker && b.options.marker,
                    h = f && !1 === f.enabled,
                    k = f && f.states && f.states[a || "normal"] || {},
                    l = !1 === k.enabled,
                    m = b.stateMarkerGraphic,
                    q = this.marker || {},
                    n = b.chart,
                    t = b.halo,
                    x, z = f && b.markerAttribs;
                a = a || "";
                if (!(a === this.state && !d || this.selected && "select" !== a || !1 === g.enabled || a && (l || h && !1 === k.enabled) || a && q.states && q.states[a] && !1 === q.states[a].enabled)) {
                    this.state = a;
                    z &&
                        (x = b.markerAttribs(this, a));
                    if (this.graphic) {
                        c && this.graphic.removeClass("highcharts-point-" + c);
                        a && this.graphic.addClass("highcharts-point-" + a);
                        if (!n.styledMode) {
                            var w = b.pointAttribs(this, a);
                            var u = p(n.options.chart.animation, g.animation);
                            b.options.inactiveOtherPoints && ((this.dataLabels || []).forEach(function(a) {
                                a && a.animate({
                                    opacity: w.opacity
                                }, u)
                            }), this.connector && this.connector.animate({
                                opacity: w.opacity
                            }, u));
                            this.graphic.animate(w, u)
                        }
                        x && this.graphic.animate(x, p(n.options.chart.animation, k.animation,
                            f.animation));
                        m && m.hide()
                    } else {
                        if (a && k) {
                            c = q.symbol || b.symbol;
                            m && m.currentSymbol !== c && (m = m.destroy());
                            if (x)
                                if (m) m[d ? "animate" : "attr"]({
                                    x: x.x,
                                    y: x.y
                                });
                                else c && (b.stateMarkerGraphic = m = n.renderer.symbol(c, x.x, x.y, x.width, x.height).add(b.markerGroup), m.currentSymbol = c);
                                !n.styledMode && m && m.attr(b.pointAttribs(this, a))
                        }
                        m && (m[a && this.isInside ? "show" : "hide"](), m.element.point = this)
                    }
                    a = g.halo;
                    g = (m = this.graphic || m) && m.visibility || "inherit";
                    a && a.size && m && "hidden" !== g && !this.isCluster ? (t || (b.halo = t = n.renderer.path().add(m.parentGroup)),
                        t.show()[d ? "animate" : "attr"]({
                            d: this.haloPath(a.size)
                        }), t.attr({
                            "class": "highcharts-halo highcharts-color-" + p(this.colorIndex, b.colorIndex) + (this.className ? " " + this.className : ""),
                            visibility: g,
                            zIndex: -1
                        }), t.point = this, n.styledMode || t.attr(F({
                            fill: this.color || b.color,
                            "fill-opacity": a.opacity
                        }, a.attributes))) : t && t.point && t.point.haloPath && t.animate({
                        d: t.point.haloPath(0)
                    }, null, t.hide);
                    D(this, "afterSetState")
                }
            },
            haloPath: function(a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) -
                    a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        F(g.prototype, {
            onMouseOver: function() {
                var a = this.chart,
                    d = a.hoverSeries;
                if (d && d !== this) d.onMouseOut();
                this.options.events.mouseOver && D(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function() {
                var a = this.options,
                    d = this.chart,
                    e = d.tooltip,
                    c = d.hoverPoint;
                d.hoverSeries = null;
                if (c) c.onMouseOut();
                this && a.events.mouseOut && D(this, "mouseOut");
                !e || this.stickyTracking || e.shared && !this.noSharedTooltip || e.hide();
                d.series.forEach(function(a) {
                    a.setState("", !0)
                })
            },
            setState: function(a, d) {
                var b = this,
                    e = b.options,
                    c = b.graph,
                    g = e.inactiveOtherPoints,
                    f = e.states,
                    h = e.lineWidth,
                    k = e.opacity,
                    l = p(f[a || "normal"] && f[a || "normal"].animation, b.chart.options.chart.animation);
                e = 0;
                a = a || "";
                if (b.state !== a && ([b.group, b.markerGroup, b.dataLabelsGroup].forEach(function(d) {
                        d && (b.state && d.removeClass("highcharts-series-" + b.state), a && d.addClass("highcharts-series-" + a))
                    }), b.state = a, !b.chart.styledMode)) {
                    if (f[a] && !1 === f[a].enabled) return;
                    a && (h = f[a].lineWidth || h + (f[a].lineWidthPlus || 0), k = p(f[a].opacity,
                        k));
                    if (c && !c.dashstyle)
                        for (f = {
                                "stroke-width": h
                            }, c.animate(f, l); b["zone-graph-" + e];) b["zone-graph-" + e].attr(f), e += 1;
                    g || [b.group, b.markerGroup, b.dataLabelsGroup, b.labelBySeries].forEach(function(a) {
                        a && a.animate({
                            opacity: k
                        }, l)
                    })
                }
                d && g && b.points && b.setAllPointsToState(a)
            },
            setAllPointsToState: function(a) {
                this.points.forEach(function(b) {
                    b.setState && b.setState(a)
                })
            },
            setVisible: function(a, d) {
                var b = this,
                    e = b.chart,
                    c = b.legendItem,
                    g = e.options.chart.ignoreHiddenSeries,
                    f = b.visible;
                var h = (b.visible = a = b.options.visible =
                    b.userOptions.visible = "undefined" === typeof a ? !f : a) ? "show" : "hide";
                ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function(a) {
                    if (b[a]) b[a][h]()
                });
                if (e.hoverSeries === b || (e.hoverPoint && e.hoverPoint.series) === b) b.onMouseOut();
                c && e.legend.colorizeItem(b, a);
                b.isDirty = !0;
                b.options.stacking && e.series.forEach(function(a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                b.linkedSeries.forEach(function(b) {
                    b.setVisible(a, !1)
                });
                g && (e.isDirtyBox = !0);
                D(b, h);
                !1 !== d && e.redraw()
            },
            show: function() {
                this.setVisible(!0)
            },
            hide: function() {
                this.setVisible(!1)
            },
            select: function(a) {
                this.selected = a = this.options.selected = "undefined" === typeof a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                D(this, a ? "select" : "unselect")
            },
            drawTracker: c.drawTrackerGraph
        })
    });
    O(u, "parts/Responsive.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        var u = f.find,
            q = f.isArray,
            A = f.isObject,
            t = f.merge,
            M = f.objectEach,
            C = f.pick,
            F = f.splat,
            D = f.uniqueKey;
        c = c.Chart;
        c.prototype.setResponsive = function(c, f) {
            var k = this.options.responsive,
                m = [],
                q = this.currentResponsive;
            !f && k && k.rules && k.rules.forEach(function(c) {
                "undefined" === typeof c._id && (c._id = D());
                this.matchResponsiveRule(c, m)
            }, this);
            f = t.apply(0, m.map(function(c) {
                return u(k.rules, function(f) {
                    return f._id === c
                }).chartOptions
            }));
            f.isResponsiveOptions = !0;
            m = m.toString() || void 0;
            m !== (q && q.ruleIds) && (q && this.update(q.undoOptions, c, !0), m ? (q = this.currentOptions(f), q.isResponsiveOptions = !0, this.currentResponsive = {
                    ruleIds: m,
                    mergedOptions: f,
                    undoOptions: q
                }, this.update(f, c, !0)) : this.currentResponsive =
                void 0)
        };
        c.prototype.matchResponsiveRule = function(c, f) {
            var k = c.condition;
            (k.callback || function() {
                return this.chartWidth <= C(k.maxWidth, Number.MAX_VALUE) && this.chartHeight <= C(k.maxHeight, Number.MAX_VALUE) && this.chartWidth >= C(k.minWidth, 0) && this.chartHeight >= C(k.minHeight, 0)
            }).call(this) && f.push(c._id)
        };
        c.prototype.currentOptions = function(c) {
            function f(c, m, t, e) {
                var a;
                M(c, function(c, h) {
                    if (!e && -1 < k.collectionsWithUpdate.indexOf(h))
                        for (c = F(c), t[h] = [], a = 0; a < c.length; a++) m[h][a] && (t[h][a] = {}, f(c[a], m[h][a],
                            t[h][a], e + 1));
                    else A(c) ? (t[h] = q(c) ? [] : {}, f(c, m[h] || {}, t[h], e + 1)) : t[h] = "undefined" === typeof m[h] ? null : m[h]
                })
            }
            var k = this,
                t = {};
            f(c, this.options, t, 0);
            return t
        }
    });
    O(u, "masters/highcharts.src.js", [u["parts/Globals.js"]], function(c) {
        return c
    });
    O(u, "parts-map/MapAxis.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        var u = f.addEvent,
            q = f.pick;
        c = c.Axis;
        u(c, "getSeriesExtremes", function() {
            var c = [];
            this.isXAxis && (this.series.forEach(function(f, q) {
                    f.useMapGeometry && (c[q] = f.xData, f.xData = [])
                }), this.seriesXData =
                c)
        });
        u(c, "afterGetSeriesExtremes", function() {
            var c = this.seriesXData,
                f;
            if (this.isXAxis) {
                var u = q(this.dataMin, Number.MAX_VALUE);
                var C = q(this.dataMax, -Number.MAX_VALUE);
                this.series.forEach(function(t, A) {
                    t.useMapGeometry && (u = Math.min(u, q(t.minX, u)), C = Math.max(C, q(t.maxX, C)), t.xData = c[A], f = !0)
                });
                f && (this.dataMin = u, this.dataMax = C);
                delete this.seriesXData
            }
        });
        u(c, "afterSetAxisTranslation", function() {
            var c = this.chart;
            var f = c.plotWidth / c.plotHeight;
            c = c.xAxis[0];
            var q;
            "yAxis" === this.coll && "undefined" !== typeof c.transA &&
                this.series.forEach(function(c) {
                    c.preserveAspectRatio && (q = !0)
                });
            if (q && (this.transA = c.transA = Math.min(this.transA, c.transA), f /= (c.max - c.min) / (this.max - this.min), f = 1 > f ? this : c, c = (f.max - f.min) * f.transA, f.pixelPadding = f.len - c, f.minPixelPadding = f.pixelPadding / 2, c = f.fixTo)) {
                c = c[1] - f.toValue(c[0], !0);
                c *= f.transA;
                if (Math.abs(c) > f.minPixelPadding || f.min === f.dataMin && f.max === f.dataMax) c = 0;
                f.minPixelPadding -= c
            }
        });
        u(c, "render", function() {
            this.fixTo = null
        })
    });
    O(u, "parts-map/ColorSeriesMixin.js", [u["parts/Globals.js"]],
        function(c) {
            c.colorPointMixin = {
                setVisible: function(c) {
                    var f = this,
                        q = c ? "show" : "hide";
                    f.visible = f.options.visible = !!c;
                    ["graphic", "dataLabel"].forEach(function(c) {
                        if (f[c]) f[c][q]()
                    })
                }
            };
            c.colorSeriesMixin = {
                optionalAxis: "colorAxis",
                colorAxis: 0,
                translateColors: function() {
                    var c = this,
                        u = this.options.nullColor,
                        q = this.colorAxis,
                        A = this.colorKey;
                    (this.data.length ? this.data : this.points).forEach(function(f) {
                        var t = f.getNestedProperty(A);
                        if (t = f.options.color || (f.isNull ? u : q && "undefined" !== typeof t ? q.toColor(t, f) : f.color ||
                                c.color)) f.color = t
                    })
                }
            }
        });
    O(u, "parts-map/ColorAxis.js", [u["parts/Globals.js"], u["parts/Color.js"], u["parts/Point.js"], u["parts/Legend.js"], u["mixins/legend-symbol.js"], u["parts/Utilities.js"]], function(c, f, u, q, A, t) {
        "";
        var G = f.parse;
        f = t.addEvent;
        var C = t.erase,
            F = t.extend,
            D = t.isNumber,
            k = t.merge,
            m = t.pick,
            x = t.splat,
            z = c.Axis;
        t = c.Chart;
        var w = c.Series,
            p = c.colorPointMixin,
            K = c.noop;
        F(w.prototype, c.colorSeriesMixin);
        F(u.prototype, p);
        t.prototype.collectionsWithUpdate.push("colorAxis");
        t.prototype.collectionsWithInit.colorAxis = [t.prototype.addColorAxis];
        var e = c.ColorAxis = function() {
            this.init.apply(this, arguments)
        };
        F(e.prototype, z.prototype);
        F(e.prototype, {
            defaultColorAxisOptions: {
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                startOnTick: !0,
                endOnTick: !0,
                offset: 0,
                marker: {
                    animation: {
                        duration: 50
                    },
                    width: .01,
                    color: "#999999"
                },
                labels: {
                    overflow: "justify",
                    rotation: 0
                },
                minColor: "#e6ebf5",
                maxColor: "#003399",
                tickLength: 5,
                showInLegend: !0
            },
            keepProps: ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem",
                "legendSymbol"
            ].concat(z.prototype.keepProps),
            init: function(a, e) {
                this.coll = "colorAxis";
                var c = this.buildOptions.call(a, this.defaultColorAxisOptions, e);
                z.prototype.init.call(this, a, c);
                e.dataClasses && this.initDataClasses(e);
                this.initStops();
                this.horiz = !c.opposite;
                this.zoomEnabled = !1;
                this.defaultLegendLength = 200
            },
            initDataClasses: function(a) {
                var e = this.chart,
                    c, d = 0,
                    b = e.options.chart.colorCount,
                    f = this.options,
                    m = a.dataClasses.length;
                this.dataClasses = c = [];
                this.legendItems = [];
                a.dataClasses.forEach(function(a,
                    g) {
                    a = k(a);
                    c.push(a);
                    if (e.styledMode || !a.color) "category" === f.dataClassColor ? (e.styledMode || (g = e.options.colors, b = g.length, a.color = g[d]), a.colorIndex = d, d++, d === b && (d = 0)) : a.color = G(f.minColor).tweenTo(G(f.maxColor), 2 > m ? .5 : g / (m - 1))
                })
            },
            hasData: function() {
                return !(!this.tickPositions || !this.tickPositions.length)
            },
            setTickPositions: function() {
                if (!this.dataClasses) return z.prototype.setTickPositions.call(this)
            },
            initStops: function() {
                this.stops = this.options.stops || [
                    [0, this.options.minColor],
                    [1, this.options.maxColor]
                ];
                this.stops.forEach(function(a) {
                    a.color = G(a[1])
                })
            },
            buildOptions: function(a, e) {
                var c = this.options.legend,
                    d = e.layout ? "vertical" !== e.layout : "vertical" !== c.layout;
                return k(a, {
                    side: d ? 2 : 1,
                    reversed: !d
                }, e, {
                    opposite: !d,
                    showEmpty: !1,
                    title: null,
                    visible: c.enabled && (e ? !1 !== e.visible : !0)
                })
            },
            setOptions: function(a) {
                z.prototype.setOptions.call(this, a);
                this.options.crosshair = this.options.marker
            },
            setAxisSize: function() {
                var a = this.legendSymbol,
                    e = this.chart,
                    c = e.options.legend || {},
                    d, b;
                a ? (this.left = c = a.attr("x"), this.top =
                    d = a.attr("y"), this.width = b = a.attr("width"), this.height = a = a.attr("height"), this.right = e.chartWidth - c - b, this.bottom = e.chartHeight - d - a, this.len = this.horiz ? b : a, this.pos = this.horiz ? c : d) : this.len = (this.horiz ? c.symbolWidth : c.symbolHeight) || this.defaultLegendLength
            },
            normalizedValue: function(a) {
                this.isLog && (a = this.val2lin(a));
                return 1 - (this.max - a) / (this.max - this.min || 1)
            },
            toColor: function(a, e) {
                var c = this.stops,
                    d = this.dataClasses,
                    b;
                if (d)
                    for (b = d.length; b--;) {
                        var g = d[b];
                        var f = g.from;
                        c = g.to;
                        if (("undefined" === typeof f ||
                                a >= f) && ("undefined" === typeof c || a <= c)) {
                            var k = g.color;
                            e && (e.dataClass = b, e.colorIndex = g.colorIndex);
                            break
                        }
                    } else {
                        a = this.normalizedValue(a);
                        for (b = c.length; b-- && !(a > c[b][0]););
                        f = c[b] || c[b + 1];
                        c = c[b + 1] || f;
                        a = 1 - (c[0] - a) / (c[0] - f[0] || 1);
                        k = f.color.tweenTo(c.color, a)
                    }
                return k
            },
            getOffset: function() {
                var a = this.legendGroup,
                    e = this.chart.axisOffset[this.side];
                a && (this.axisParent = a, z.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] =
                    e)
            },
            setLegendColor: function() {
                var a = this.reversed;
                var e = a ? 1 : 0;
                a = a ? 0 : 1;
                e = this.horiz ? [e, 0, a, 0] : [0, a, 0, e];
                this.legendColor = {
                    linearGradient: {
                        x1: e[0],
                        y1: e[1],
                        x2: e[2],
                        y2: e[3]
                    },
                    stops: this.stops
                }
            },
            drawLegendSymbol: function(a, e) {
                var c = a.padding,
                    d = a.options,
                    b = this.horiz,
                    g = m(d.symbolWidth, b ? this.defaultLegendLength : 12),
                    f = m(d.symbolHeight, b ? 12 : this.defaultLegendLength),
                    k = m(d.labelPadding, b ? 16 : 30);
                d = m(d.itemDistance, 10);
                this.setLegendColor();
                e.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, g, f).attr({
                    zIndex: 1
                }).add(e.legendGroup);
                this.legendItemWidth = g + c + (b ? d : k);
                this.legendItemHeight = f + c + (b ? k : 0)
            },
            setState: function(a) {
                this.series.forEach(function(e) {
                    e.setState(a)
                })
            },
            visible: !0,
            setVisible: K,
            getSeriesExtremes: function() {
                var a = this.series,
                    e = a.length,
                    c;
                this.dataMin = Infinity;
                for (this.dataMax = -Infinity; e--;) {
                    var d = a[e];
                    var b = d.colorKey = m(d.options.colorKey, d.colorKey, d.pointValKey, d.zoneAxis, "y");
                    var f = d.pointArrayMap;
                    var k = d[b + "Min"] && d[b + "Max"];
                    if (d[b + "Data"]) var p = d[b + "Data"];
                    else if (f) {
                        p = [];
                        f = f.indexOf(b);
                        var q = d.yData;
                        if (0 <=
                            f && q)
                            for (c = 0; c < q.length; c++) p.push(m(q[c][f], q[c]))
                    } else p = d.yData;
                    k ? (d.minColorValue = d[b + "Min"], d.maxColorValue = d[b + "Max"]) : (w.prototype.getExtremes.call(d, p), d.minColorValue = d.dataMin, d.maxColorValue = d.dataMax);
                    "undefined" !== typeof d.minColorValue && (this.dataMin = Math.min(this.dataMin, d.minColorValue), this.dataMax = Math.max(this.dataMax, d.maxColorValue));
                    k || w.prototype.getExtremes.call(d)
                }
            },
            drawCrosshair: function(a, e) {
                var c = e && e.plotX,
                    d = e && e.plotY,
                    b = this.pos,
                    g = this.len;
                if (e) {
                    var f = this.toPixels(e.getNestedProperty(e.series.colorKey));
                    f < b ? f = b - 2 : f > b + g && (f = b + g + 2);
                    e.plotX = f;
                    e.plotY = this.len - f;
                    z.prototype.drawCrosshair.call(this, a, e);
                    e.plotX = c;
                    e.plotY = d;
                    this.cross && !this.cross.addedToColorAxis && this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.addedToColorAxis = !0, this.chart.styledMode || this.cross.attr({
                        fill: this.crosshair.color
                    }))
                }
            },
            getPlotLinePath: function(a) {
                var e = a.translatedValue;
                return D(e) ? this.horiz ? ["M", e - 4, this.top - 6, "L", e + 4, this.top - 6, e, this.top, "Z"] : ["M", this.left, e, "L",
                    this.left - 6, e + 6, this.left - 6, e - 6, "Z"
                ] : z.prototype.getPlotLinePath.apply(this, arguments)
            },
            update: function(a, e) {
                var c = this.chart,
                    d = c.legend,
                    b = this.buildOptions.call(c, {}, a);
                this.series.forEach(function(a) {
                    a.isDirtyData = !0
                });
                (a.dataClasses && d.allItems || this.dataClasses) && this.destroyItems();
                c.options[this.coll] = k(this.userOptions, b);
                z.prototype.update.call(this, b, e);
                this.legendItem && (this.setLegendColor(), d.colorizeItem(this, !0))
            },
            destroyItems: function() {
                var a = this.chart;
                this.legendItem ? a.legend.destroyItem(this) :
                    this.legendItems && this.legendItems.forEach(function(e) {
                        a.legend.destroyItem(e)
                    });
                a.isDirtyLegend = !0
            },
            remove: function(a) {
                this.destroyItems();
                z.prototype.remove.call(this, a)
            },
            getDataClassLegendSymbols: function() {
                var a = this,
                    e = this.chart,
                    c = this.legendItems,
                    d = e.options.legend,
                    b = d.valueDecimals,
                    f = d.valueSuffix || "",
                    k;
                c.length || this.dataClasses.forEach(function(d, g) {
                    var h = !0,
                        l = d.from,
                        m = d.to,
                        p = e.numberFormatter;
                    k = "";
                    "undefined" === typeof l ? k = "< " : "undefined" === typeof m && (k = "> ");
                    "undefined" !== typeof l && (k +=
                        p(l, b) + f);
                    "undefined" !== typeof l && "undefined" !== typeof m && (k += " - ");
                    "undefined" !== typeof m && (k += p(m, b) + f);
                    c.push(F({
                        chart: e,
                        name: k,
                        options: {},
                        drawLegendSymbol: A.drawRectangle,
                        visible: !0,
                        setState: K,
                        isDataClass: !0,
                        setVisible: function() {
                            h = this.visible = !h;
                            a.series.forEach(function(a) {
                                a.points.forEach(function(a) {
                                    a.dataClass === g && a.setVisible(h)
                                })
                            });
                            e.legend.colorizeItem(this, h)
                        }
                    }, d))
                });
                return c
            },
            beforePadding: !1,
            name: ""
        });
        ["fill", "stroke"].forEach(function(a) {
            c.Fx.prototype[a + "Setter"] = function() {
                this.elem.attr(a,
                    G(this.start).tweenTo(G(this.end), this.pos), null, !0)
            }
        });
        f(t, "afterGetAxes", function() {
            var a = this,
                c = a.options;
            this.colorAxis = [];
            c.colorAxis && (c.colorAxis = x(c.colorAxis), c.colorAxis.forEach(function(c, d) {
                c.index = d;
                new e(a, c)
            }))
        });
        f(w, "bindAxes", function() {
            var a = this.axisTypes;
            a ? -1 === a.indexOf("colorAxis") && a.push("colorAxis") : this.axisTypes = ["colorAxis"]
        });
        f(q, "afterGetAllItems", function(a) {
            var e = [],
                c, d;
            (this.chart.colorAxis || []).forEach(function(b) {
                (c = b.options) && c.showInLegend && (c.dataClasses && c.visible ?
                    e = e.concat(b.getDataClassLegendSymbols()) : c.visible && e.push(b), b.series.forEach(function(b) {
                        if (!b.options.showInLegend || c.dataClasses) "point" === b.options.legendType ? b.points.forEach(function(b) {
                            C(a.allItems, b)
                        }) : C(a.allItems, b)
                    }))
            });
            for (d = e.length; d--;) a.allItems.unshift(e[d])
        });
        f(q, "afterColorizeItem", function(a) {
            a.visible && a.item.legendColor && a.item.legendSymbol.attr({
                fill: a.item.legendColor
            })
        });
        f(q, "afterUpdate", function() {
            var a = this.chart.colorAxis;
            a && a.forEach(function(a, e, d) {
                a.update({}, d)
            })
        });
        f(w, "afterTranslate", function() {
            (this.chart.colorAxis && this.chart.colorAxis.length || this.colorAttribs) && this.translateColors()
        })
    });
    O(u, "parts-map/ColorMapSeriesMixin.js", [u["parts/Globals.js"], u["parts/Point.js"], u["parts/Utilities.js"]], function(c, f, u) {
        var q = u.defined;
        u = c.noop;
        var A = c.seriesTypes;
        c.colorMapPointMixin = {
            dataLabelOnNull: !0,
            isValid: function() {
                return null !== this.value && Infinity !== this.value && -Infinity !== this.value
            },
            setState: function(c) {
                f.prototype.setState.call(this, c);
                this.graphic &&
                    this.graphic.attr({
                        zIndex: "hover" === c ? 1 : 0
                    })
            }
        };
        c.colorMapSeriesMixin = {
            pointArrayMap: ["value"],
            axisTypes: ["xAxis", "yAxis", "colorAxis"],
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            getSymbol: u,
            parallelArrays: ["x", "y", "value"],
            colorKey: "value",
            pointAttribs: A.column.prototype.pointAttribs,
            colorAttribs: function(c) {
                var f = {};
                q(c.color) && (f[this.colorProp || "fill"] = c.color);
                return f
            }
        }
    });
    O(u, "parts-map/MapNavigation.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        function u(c) {
            c &&
                (c.preventDefault && c.preventDefault(), c.stopPropagation && c.stopPropagation(), c.cancelBubble = !0)
        }

        function q(c) {
            this.init(c)
        }
        var A = f.addEvent,
            t = f.extend,
            M = f.merge,
            C = f.objectEach,
            F = f.pick;
        f = c.Chart;
        var D = c.doc;
        q.prototype.init = function(c) {
            this.chart = c;
            c.mapNavButtons = []
        };
        q.prototype.update = function(c) {
            var f = this.chart,
                k = f.options.mapNavigation,
                q, w, p, D, e, a = function(a) {
                    this.handler.call(f, a);
                    u(a)
                },
                g = f.mapNavButtons;
            c && (k = f.options.mapNavigation = M(f.options.mapNavigation, c));
            for (; g.length;) g.pop().destroy();
            F(k.enableButtons, k.enabled) && !f.renderer.forExport && C(k.buttons, function(c, d) {
                q = M(k.buttonOptions, c);
                f.styledMode || (w = q.theme, w.style = M(q.theme.style, q.style), D = (p = w.states) && p.hover, e = p && p.select);
                c = f.renderer.button(q.text, 0, 0, a, w, D, e, 0, "zoomIn" === d ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation highcharts-" + {
                    zoomIn: "zoom-in",
                    zoomOut: "zoom-out"
                }[d]).attr({
                    width: q.width,
                    height: q.height,
                    title: f.options.lang[d],
                    padding: q.padding,
                    zIndex: 5
                }).add();
                c.handler = q.onclick;
                A(c.element, "dblclick",
                    u);
                g.push(c);
                var b = q,
                    h = A(f, "load", function() {
                        c.align(t(b, {
                            width: c.width,
                            height: 2 * c.height
                        }), null, b.alignTo);
                        h()
                    })
            });
            this.updateEvents(k)
        };
        q.prototype.updateEvents = function(c) {
            var f = this.chart;
            F(c.enableDoubleClickZoom, c.enabled) || c.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick || A(f.container, "dblclick", function(c) {
                f.pointer.onContainerDblClick(c)
            }) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick());
            F(c.enableMouseWheelZoom, c.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel ||
                A(f.container, "undefined" === typeof D.onmousewheel ? "DOMMouseScroll" : "mousewheel", function(c) {
                    f.pointer.onContainerMouseWheel(c);
                    u(c);
                    return !1
                }) : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
        };
        t(f.prototype, {
            fitToBox: function(c, f) {
                [
                    ["x", "width"],
                    ["y", "height"]
                ].forEach(function(k) {
                    var m = k[0];
                    k = k[1];
                    c[m] + c[k] > f[m] + f[k] && (c[k] > f[k] ? (c[k] = f[k], c[m] = f[m]) : c[m] = f[m] + f[k] - c[k]);
                    c[k] > f[k] && (c[k] = f[k]);
                    c[m] < f[m] && (c[m] = f[m])
                });
                return c
            },
            mapZoom: function(c, f, q, t, u) {
                var k = this.xAxis[0],
                    m = k.max - k.min,
                    e = F(f, k.min + m / 2),
                    a = m * c;
                m = this.yAxis[0];
                var g = m.max - m.min,
                    h = F(q, m.min + g / 2);
                g *= c;
                e = this.fitToBox({
                    x: e - a * (t ? (t - k.pos) / k.len : .5),
                    y: h - g * (u ? (u - m.pos) / m.len : .5),
                    width: a,
                    height: g
                }, {
                    x: k.dataMin,
                    y: m.dataMin,
                    width: k.dataMax - k.dataMin,
                    height: m.dataMax - m.dataMin
                });
                a = e.x <= k.dataMin && e.width >= k.dataMax - k.dataMin && e.y <= m.dataMin && e.height >= m.dataMax - m.dataMin;
                t && (k.fixTo = [t - k.pos, f]);
                u && (m.fixTo = [u - m.pos, q]);
                "undefined" === typeof c || a ? (k.setExtremes(void 0, void 0, !1), m.setExtremes(void 0, void 0, !1)) :
                    (k.setExtremes(e.x, e.x + e.width, !1), m.setExtremes(e.y, e.y + e.height, !1));
                this.redraw()
            }
        });
        A(f, "beforeRender", function() {
            this.mapNavigation = new q(this);
            this.mapNavigation.update()
        });
        c.MapNavigation = q
    });
    O(u, "parts-map/MapPointer.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        var u = f.extend,
            q = f.pick;
        f = f.wrap;
        c = c.Pointer;
        u(c.prototype, {
            onContainerDblClick: function(c) {
                var f = this.chart;
                c = this.normalize(c);
                f.options.mapNavigation.enableDoubleClickZoomTo ? f.pointer.inClass(c.target, "highcharts-tracker") &&
                    f.hoverPoint && f.hoverPoint.zoomTo() : f.isInsidePlot(c.chartX - f.plotLeft, c.chartY - f.plotTop) && f.mapZoom(.5, f.xAxis[0].toValue(c.chartX), f.yAxis[0].toValue(c.chartY), c.chartX, c.chartY)
            },
            onContainerMouseWheel: function(c) {
                var f = this.chart;
                c = this.normalize(c);
                var q = c.detail || -(c.wheelDelta / 120);
                f.isInsidePlot(c.chartX - f.plotLeft, c.chartY - f.plotTop) && f.mapZoom(Math.pow(f.options.mapNavigation.mouseWheelSensitivity, q), f.xAxis[0].toValue(c.chartX), f.yAxis[0].toValue(c.chartY), c.chartX, c.chartY)
            }
        });
        f(c.prototype,
            "zoomOption",
            function(c) {
                var f = this.chart.options.mapNavigation;
                q(f.enableTouchZoom, f.enabled) && (this.chart.options.chart.pinchType = "xy");
                c.apply(this, [].slice.call(arguments, 1))
            });
        f(c.prototype, "pinchTranslate", function(c, f, q, u, G, D, k) {
            c.call(this, f, q, u, G, D, k);
            "map" === this.chart.options.chart.type && this.hasZoom && (c = u.scaleX > u.scaleY, this.pinchTranslateDirection(!c, f, q, u, G, D, k, c ? u.scaleX : u.scaleY))
        })
    });
    O(u, "parts-map/MapSeries.js", [u["parts/Globals.js"], u["mixins/legend-symbol.js"], u["parts/Point.js"],
        u["parts/Utilities.js"]
    ], function(c, f, u, q) {
        var A = q.extend,
            t = q.fireEvent,
            G = q.getNestedProperty,
            C = q.isArray,
            F = q.isNumber,
            D = q.merge,
            k = q.objectEach,
            m = q.pick,
            x = q.seriesType,
            z = q.splat,
            w = c.colorMapPointMixin,
            p = c.noop,
            K = c.Series,
            e = c.seriesTypes;
        x("map", "scatter", {
            animation: !1,
            dataLabels: {
                crop: !1,
                formatter: function() {
                    return this.point.value
                },
                inside: !0,
                overflow: !1,
                padding: 0,
                verticalAlign: "middle"
            },
            marker: null,
            nullColor: "#f7f7f7",
            stickyTracking: !1,
            tooltip: {
                followPointer: !0,
                pointFormat: "{point.name}: {point.value}<br/>"
            },
            turboThreshold: 0,
            allAreas: !0,
            borderColor: "#cccccc",
            borderWidth: 1,
            joinBy: "hc-key",
            states: {
                hover: {
                    halo: null,
                    brightness: .2
                },
                normal: {
                    animation: !0
                },
                select: {
                    color: "#cccccc"
                },
                inactive: {
                    opacity: 1
                }
            }
        }, D(c.colorMapSeriesMixin, {
            type: "map",
            getExtremesFromAll: !0,
            useMapGeometry: !0,
            forceDL: !0,
            searchPoint: p,
            directTouch: !0,
            preserveAspectRatio: !0,
            pointArrayMap: ["value"],
            setOptions: function(a) {
                a = K.prototype.setOptions.call(this, a);
                var c = a.joinBy;
                null === c && (c = "_i");
                c = this.joinBy = z(c);
                c[1] || (c[1] = c[0]);
                return a
            },
            getBox: function(a) {
                var e =
                    Number.MAX_VALUE,
                    f = -e,
                    d = e,
                    b = -e,
                    k = e,
                    p = e,
                    q = this.xAxis,
                    t = this.yAxis,
                    u;
                (a || []).forEach(function(a) {
                    if (a.path) {
                        "string" === typeof a.path && (a.path = c.splitPath(a.path));
                        var g = a.path || [],
                            h = g.length,
                            l = !1,
                            q = -e,
                            n = e,
                            r = -e,
                            t = e,
                            v = a.properties;
                        if (!a._foundBox) {
                            for (; h--;) F(g[h]) && (l ? (q = Math.max(q, g[h]), n = Math.min(n, g[h])) : (r = Math.max(r, g[h]), t = Math.min(t, g[h])), l = !l);
                            a._midX = n + (q - n) * m(a.middleX, v && v["hc-middle-x"], .5);
                            a._midY = t + (r - t) * m(a.middleY, v && v["hc-middle-y"], .5);
                            a._maxX = q;
                            a._minX = n;
                            a._maxY = r;
                            a._minY = t;
                            a.labelrank =
                                m(a.labelrank, (q - n) * (r - t));
                            a._foundBox = !0
                        }
                        f = Math.max(f, a._maxX);
                        d = Math.min(d, a._minX);
                        b = Math.max(b, a._maxY);
                        k = Math.min(k, a._minY);
                        p = Math.min(a._maxX - a._minX, a._maxY - a._minY, p);
                        u = !0
                    }
                });
                u && (this.minY = Math.min(k, m(this.minY, e)), this.maxY = Math.max(b, m(this.maxY, -e)), this.minX = Math.min(d, m(this.minX, e)), this.maxX = Math.max(f, m(this.maxX, -e)), q && "undefined" === typeof q.options.minRange && (q.minRange = Math.min(5 * p, (this.maxX - this.minX) / 5, q.minRange || e)), t && "undefined" === typeof t.options.minRange && (t.minRange =
                    Math.min(5 * p, (this.maxY - this.minY) / 5, t.minRange || e)))
            },
            hasData: function() {
                return !!this.processedXData.length
            },
            getExtremes: function() {
                K.prototype.getExtremes.call(this, this.valueData);
                this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                this.dataMin = this.minY;
                this.dataMax = this.maxY
            },
            translatePath: function(a) {
                var c = !1,
                    e = this.xAxis,
                    d = this.yAxis,
                    b = e.min,
                    f = e.transA;
                e = e.minPixelPadding;
                var k = d.min,
                    m = d.transA;
                d = d.minPixelPadding;
                var p,
                    q = [];
                if (a)
                    for (p = a.length; p--;) F(a[p]) ? (q[p] = c ? (a[p] - b) * f + e : (a[p] - k) * m + d, c = !c) : q[p] = a[p];
                return q
            },
            setData: function(a, e, f, d) {
                var b = this.options,
                    g = this.chart.options.chart,
                    h = g && g.map,
                    m = b.mapData,
                    p = this.joinBy,
                    q = b.keys || this.pointArrayMap,
                    t = [],
                    x = {},
                    w = this.chart.mapTransforms;
                !m && h && (m = "string" === typeof h ? c.maps[h] : h);
                a && a.forEach(function(d, c) {
                    var e = 0;
                    if (F(d)) a[c] = {
                        value: d
                    };
                    else if (C(d)) {
                        a[c] = {};
                        !b.keys && d.length > q.length && "string" === typeof d[0] && (a[c]["hc-key"] = d[0], ++e);
                        for (var g = 0; g < q.length; ++g,
                            ++e) q[g] && "undefined" !== typeof d[e] && (0 < q[g].indexOf(".") ? u.prototype.setNestedProperty(a[c], d[e], q[g]) : a[c][q[g]] = d[e])
                    }
                    p && "_i" === p[0] && (a[c]._i = c)
                });
                this.getBox(a);
                (this.chart.mapTransforms = w = g && g.mapTransforms || m && m["hc-transform"] || w) && k(w, function(a) {
                    a.rotation && (a.cosAngle = Math.cos(a.rotation), a.sinAngle = Math.sin(a.rotation))
                });
                if (m) {
                    "FeatureCollection" === m.type && (this.mapTitle = m.title, m = c.geojson(m, this.type, this));
                    this.mapData = m;
                    this.mapMap = {};
                    for (w = 0; w < m.length; w++) g = m[w], h = g.properties,
                        g._i = w, p[0] && h && h[p[0]] && (g[p[0]] = h[p[0]]), x[g[p[0]]] = g;
                    this.mapMap = x;
                    if (a && p[1]) {
                        var z = p[1];
                        a.forEach(function(a) {
                            a = G(z, a);
                            x[a] && t.push(x[a])
                        })
                    }
                    if (b.allAreas) {
                        this.getBox(m);
                        a = a || [];
                        if (p[1]) {
                            var A = p[1];
                            a.forEach(function(a) {
                                t.push(G(A, a))
                            })
                        }
                        t = "|" + t.map(function(a) {
                            return a && a[p[0]]
                        }).join("|") + "|";
                        m.forEach(function(b) {
                            p[0] && -1 !== t.indexOf("|" + b[p[0]] + "|") || (a.push(D(b, {
                                value: null
                            })), d = !1)
                        })
                    } else this.getBox(t)
                }
                K.prototype.setData.call(this, a, e, f, d)
            },
            drawGraph: p,
            drawDataLabels: p,
            doFullTranslate: function() {
                return this.isDirtyData ||
                    this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans
            },
            translate: function() {
                var a = this,
                    c = a.xAxis,
                    e = a.yAxis,
                    d = a.doFullTranslate();
                a.generatePoints();
                a.data.forEach(function(b) {
                    F(b._midX) && F(b._midY) && (b.plotX = c.toPixels(b._midX, !0), b.plotY = e.toPixels(b._midY, !0));
                    d && (b.shapeType = "path", b.shapeArgs = {
                        d: a.translatePath(b.path)
                    })
                });
                t(a, "afterTranslate")
            },
            pointAttribs: function(a, c) {
                c = a.series.chart.styledMode ? this.colorAttribs(a) : e.column.prototype.pointAttribs.call(this, a, c);
                c["stroke-width"] =
                    m(a.options[this.pointAttrToOptions && this.pointAttrToOptions["stroke-width"] || "borderWidth"], "inherit");
                return c
            },
            drawPoints: function() {
                var a = this,
                    c = a.xAxis,
                    f = a.yAxis,
                    d = a.group,
                    b = a.chart,
                    k = b.renderer,
                    p = this.baseTrans;
                a.transformGroup || (a.transformGroup = k.g().attr({
                    scaleX: 1,
                    scaleY: 1
                }).add(d), a.transformGroup.survive = !0);
                if (a.doFullTranslate()) b.hasRendered && !b.styledMode && a.points.forEach(function(b) {
                        b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill)
                    }), a.group = a.transformGroup, e.column.prototype.drawPoints.apply(a),
                    a.group = d, a.points.forEach(function(d) {
                        if (d.graphic) {
                            var c = "";
                            d.name && (c += "highcharts-name-" + d.name.replace(/ /g, "-").toLowerCase());
                            d.properties && d.properties["hc-key"] && (c += " highcharts-key-" + d.properties["hc-key"].toLowerCase());
                            c && d.graphic.addClass(c);
                            b.styledMode && d.graphic.css(a.pointAttribs(d, d.selected && "select" || void 0))
                        }
                    }), this.baseTrans = {
                        originX: c.min - c.minPixelPadding / c.transA,
                        originY: f.min - f.minPixelPadding / f.transA + (f.reversed ? 0 : f.len / f.transA),
                        transAX: c.transA,
                        transAY: f.transA
                    }, this.transformGroup.animate({
                        translateX: 0,
                        translateY: 0,
                        scaleX: 1,
                        scaleY: 1
                    });
                else {
                    var q = c.transA / p.transAX;
                    var t = f.transA / p.transAY;
                    var u = c.toPixels(p.originX, !0);
                    var x = f.toPixels(p.originY, !0);.99 < q && 1.01 > q && .99 < t && 1.01 > t && (t = q = 1, u = Math.round(u), x = Math.round(x));
                    var w = this.transformGroup;
                    if (b.renderer.globalAnimation) {
                        var z = w.attr("translateX");
                        var A = w.attr("translateY");
                        var D = w.attr("scaleX");
                        var n = w.attr("scaleY");
                        w.attr({
                            animator: 0
                        }).animate({
                            animator: 1
                        }, {
                            step: function(a, b) {
                                w.attr({
                                    translateX: z + (u - z) * b.pos,
                                    translateY: A + (x - A) * b.pos,
                                    scaleX: D +
                                        (q - D) * b.pos,
                                    scaleY: n + (t - n) * b.pos
                                })
                            }
                        })
                    } else w.attr({
                        translateX: u,
                        translateY: x,
                        scaleX: q,
                        scaleY: t
                    })
                }
                b.styledMode || d.element.setAttribute("stroke-width", m(a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"], 1) / (q || 1));
                this.drawMapDataLabels()
            },
            drawMapDataLabels: function() {
                K.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
            },
            render: function() {
                var a = this,
                    c = K.prototype.render;
                a.chart.renderer.isVML && 3E3 < a.data.length ?
                    setTimeout(function() {
                        c.call(a)
                    }) : c.call(a)
            },
            animate: function(a) {
                var c = this.options.animation,
                    e = this.group,
                    d = this.xAxis,
                    b = this.yAxis,
                    f = d.pos,
                    k = b.pos;
                this.chart.renderer.isSVG && (!0 === c && (c = {
                    duration: 1E3
                }), a ? e.attr({
                    translateX: f + d.len / 2,
                    translateY: k + b.len / 2,
                    scaleX: .001,
                    scaleY: .001
                }) : (e.animate({
                    translateX: f,
                    translateY: k,
                    scaleX: 1,
                    scaleY: 1
                }, c), this.animate = null))
            },
            animateDrilldown: function(a) {
                var c = this.chart.plotBox,
                    e = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    d = e.bBox,
                    b = this.chart.options.drilldown.animation;
                a || (a = Math.min(d.width / c.width, d.height / c.height), e.shapeArgs = {
                    scaleX: a,
                    scaleY: a,
                    translateX: d.x,
                    translateY: d.y
                }, this.points.forEach(function(a) {
                    a.graphic && a.graphic.attr(e.shapeArgs).animate({
                        scaleX: 1,
                        scaleY: 1,
                        translateX: 0,
                        translateY: 0
                    }, b)
                }), this.animate = null)
            },
            drawLegendSymbol: f.drawRectangle,
            animateDrillupFrom: function(a) {
                e.column.prototype.animateDrillupFrom.call(this, a)
            },
            animateDrillupTo: function(a) {
                e.column.prototype.animateDrillupTo.call(this, a)
            }
        }), A({
            applyOptions: function(a, c) {
                var e = this.series;
                a = u.prototype.applyOptions.call(this, a, c);
                c = e.joinBy;
                e.mapData && e.mapMap && (c = u.prototype.getNestedProperty.call(a, c[1]), (c = "undefined" !== typeof c && e.mapMap[c]) ? (e.xyFromShape && (a.x = c._midX, a.y = c._midY), A(a, c)) : a.value = a.value || null);
                return a
            },
            onMouseOver: function(a) {
                q.clearTimeout(this.colorInterval);
                if (null !== this.value || this.series.options.nullInteraction) u.prototype.onMouseOver.call(this, a);
                else this.series.onMouseOut(a)
            },
            zoomTo: function() {
                var a = this.series;
                a.xAxis.setExtremes(this._minX, this._maxX, !1);
                a.yAxis.setExtremes(this._minY, this._maxY, !1);
                a.chart.redraw()
            }
        }, w));
        ""
    });
    O(u, "parts-map/MapLineSeries.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        f = f.seriesType;
        var u = c.seriesTypes;
        f("mapline", "map", {
            lineWidth: 1,
            fillColor: "none"
        }, {
            type: "mapline",
            colorProp: "stroke",
            pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
            },
            pointAttribs: function(c, f) {
                c = u.map.prototype.pointAttribs.call(this, c, f);
                c.fill = this.options.fillColor;
                return c
            },
            drawLegendSymbol: u.line.prototype.drawLegendSymbol
        });
        ""
    });
    O(u, "parts-map/MapPointSeries.js", [u["parts/Globals.js"]], function(c) {
        var f = c.merge,
            u = c.Point,
            q = c.Series;
        c = c.seriesType;
        c("mappoint", "scatter", {
            dataLabels: {
                crop: !1,
                defer: !1,
                enabled: !0,
                formatter: function() {
                    return this.point.name
                },
                overflow: !1,
                style: {
                    color: "#000000"
                }
            }
        }, {
            type: "mappoint",
            forceDL: !0,
            drawDataLabels: function() {
                q.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
            }
        }, {
            applyOptions: function(c, q) {
                c = "undefined" !== typeof c.lat && "undefined" !==
                    typeof c.lon ? f(c, this.series.chart.fromLatLonToPoint(c)) : c;
                return u.prototype.applyOptions.call(this, c, q)
            }
        });
        ""
    });
    O(u, "parts-more/BubbleLegend.js", [u["parts/Globals.js"], u["parts/Color.js"], u["parts/Legend.js"], u["parts/Utilities.js"]], function(c, f, u, q) {
        "";
        var A = f.parse;
        f = q.addEvent;
        var t = q.arrayMax,
            G = q.arrayMin,
            C = q.isNumber,
            F = q.merge,
            D = q.objectEach,
            k = q.pick,
            m = q.stableSort,
            x = q.wrap,
            z = c.Series,
            w = c.Chart,
            p = c.noop,
            K = c.setOptions;
        K({
            legend: {
                bubbleLegend: {
                    borderColor: void 0,
                    borderWidth: 2,
                    className: void 0,
                    color: void 0,
                    connectorClassName: void 0,
                    connectorColor: void 0,
                    connectorDistance: 60,
                    connectorWidth: 1,
                    enabled: !1,
                    labels: {
                        className: void 0,
                        allowOverlap: !1,
                        format: "",
                        formatter: void 0,
                        align: "right",
                        style: {
                            fontSize: 10,
                            color: void 0
                        },
                        x: 0,
                        y: 0
                    },
                    maxSize: 60,
                    minSize: 10,
                    legendIndex: 0,
                    ranges: {
                        value: void 0,
                        borderColor: void 0,
                        color: void 0,
                        connectorColor: void 0
                    },
                    sizeBy: "area",
                    sizeByAbsoluteValue: !1,
                    zIndex: 1,
                    zThreshold: 0
                }
            }
        });
        c.BubbleLegend = function(c, a) {
            this.init(c, a)
        };
        c.BubbleLegend.prototype = {
            init: function(c, a) {
                this.options =
                    c;
                this.visible = !0;
                this.chart = a.chart;
                this.legend = a
            },
            setState: p,
            addToLegend: function(c) {
                c.splice(this.options.legendIndex, 0, this)
            },
            drawLegendSymbol: function(c) {
                var a = this.chart,
                    e = this.options,
                    f = k(c.options.itemDistance, 20),
                    d = e.ranges;
                var b = e.connectorDistance;
                this.fontMetrics = a.renderer.fontMetrics(e.labels.style.fontSize.toString() + "px");
                d && d.length && C(d[0].value) ? (m(d, function(a, b) {
                        return b.value - a.value
                    }), this.ranges = d, this.setOptions(), this.render(), a = this.getMaxLabelSize(), d = this.ranges[0].radius,
                    c = 2 * d, b = b - d + a.width, b = 0 < b ? b : 0, this.maxLabel = a, this.movementX = "left" === e.labels.align ? b : 0, this.legendItemWidth = c + b + f, this.legendItemHeight = c + this.fontMetrics.h / 2) : c.options.bubbleLegend.autoRanges = !0
            },
            setOptions: function() {
                var c = this.ranges,
                    a = this.options,
                    g = this.chart.series[a.seriesIndex],
                    f = this.legend.baseline,
                    d = {
                        "z-index": a.zIndex,
                        "stroke-width": a.borderWidth
                    },
                    b = {
                        "z-index": a.zIndex,
                        "stroke-width": a.connectorWidth
                    },
                    l = this.getLabelStyles(),
                    m = g.options.marker.fillOpacity,
                    p = this.chart.styledMode;
                c.forEach(function(e,
                    h) {
                    p || (d.stroke = k(e.borderColor, a.borderColor, g.color), d.fill = k(e.color, a.color, 1 !== m ? A(g.color).setOpacity(m).get("rgba") : g.color), b.stroke = k(e.connectorColor, a.connectorColor, g.color));
                    c[h].radius = this.getRangeRadius(e.value);
                    c[h] = F(c[h], {
                        center: c[0].radius - c[h].radius + f
                    });
                    p || F(!0, c[h], {
                        bubbleStyle: F(!1, d),
                        connectorStyle: F(!1, b),
                        labelStyle: l
                    })
                }, this)
            },
            getLabelStyles: function() {
                var c = this.options,
                    a = {},
                    g = "left" === c.labels.align,
                    f = this.legend.options.rtl;
                D(c.labels.style, function(c, b) {
                    "color" !== b &&
                        "fontSize" !== b && "z-index" !== b && (a[b] = c)
                });
                return F(!1, a, {
                    "font-size": c.labels.style.fontSize,
                    fill: k(c.labels.style.color, "#000000"),
                    "z-index": c.zIndex,
                    align: f || g ? "right" : "left"
                })
            },
            getRangeRadius: function(c) {
                var a = this.options;
                return this.chart.series[this.options.seriesIndex].getRadius.call(this, a.ranges[a.ranges.length - 1].value, a.ranges[0].value, a.minSize, a.maxSize, c)
            },
            render: function() {
                var c = this.chart.renderer,
                    a = this.options.zThreshold;
                this.symbols || (this.symbols = {
                    connectors: [],
                    bubbleItems: [],
                    labels: []
                });
                this.legendSymbol = c.g("bubble-legend");
                this.legendItem = c.g("bubble-legend-item");
                this.legendSymbol.translateX = 0;
                this.legendSymbol.translateY = 0;
                this.ranges.forEach(function(c) {
                    c.value >= a && this.renderRange(c)
                }, this);
                this.legendSymbol.add(this.legendItem);
                this.legendItem.add(this.legendGroup);
                this.hideOverlappingLabels()
            },
            renderRange: function(c) {
                var a = this.options,
                    e = a.labels,
                    f = this.chart.renderer,
                    d = this.symbols,
                    b = d.labels,
                    k = c.center,
                    m = Math.abs(c.radius),
                    p = a.connectorDistance,
                    q = e.align,
                    t =
                    e.style.fontSize;
                p = this.legend.options.rtl || "left" === q ? -p : p;
                e = a.connectorWidth;
                var u = this.ranges[0].radius,
                    x = k - m - a.borderWidth / 2 + e / 2;
                t = t / 2 - (this.fontMetrics.h - t) / 2;
                var w = f.styledMode;
                "center" === q && (p = 0, a.connectorDistance = 0, c.labelStyle.align = "center");
                q = x + a.labels.y;
                var z = u + p + a.labels.x;
                d.bubbleItems.push(f.circle(u, k + ((x % 1 ? 1 : .5) - (e % 2 ? 0 : .5)), m).attr(w ? {} : c.bubbleStyle).addClass((w ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-symbol " + (a.className || "")).add(this.legendSymbol));
                d.connectors.push(f.path(f.crispLine(["M", u, x, "L", u + p, x], a.connectorWidth)).attr(w ? {} : c.connectorStyle).addClass((w ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " + (a.connectorClassName || "")).add(this.legendSymbol));
                c = f.text(this.formatLabel(c), z, q + t).attr(w ? {} : c.labelStyle).addClass("highcharts-bubble-legend-labels " + (a.labels.className || "")).add(this.legendSymbol);
                b.push(c);
                c.placed = !0;
                c.alignAttr = {
                    x: z,
                    y: q + t
                }
            },
            getMaxLabelSize: function() {
                var c, a;
                this.symbols.labels.forEach(function(e) {
                    a =
                        e.getBBox(!0);
                    c = c ? a.width > c.width ? a : c : a
                });
                return c || {}
            },
            formatLabel: function(c) {
                var a = this.options,
                    e = a.labels.formatter;
                a = a.labels.format;
                var f = this.chart.numberFormatter;
                return a ? q.format(a, c) : e ? e.call(c) : f(c.value, 1)
            },
            hideOverlappingLabels: function() {
                var c = this.chart,
                    a = this.symbols;
                !this.options.labels.allowOverlap && a && (c.hideOverlappingLabels(a.labels), a.labels.forEach(function(c, e) {
                    c.newOpacity ? c.newOpacity !== c.oldOpacity && a.connectors[e].show() : a.connectors[e].hide()
                }))
            },
            getRanges: function() {
                var c =
                    this.legend.bubbleLegend,
                    a = c.options.ranges,
                    g, f = Number.MAX_VALUE,
                    d = -Number.MAX_VALUE;
                c.chart.series.forEach(function(a) {
                    a.isBubble && !a.ignoreSeries && (g = a.zData.filter(C), g.length && (f = k(a.options.zMin, Math.min(f, Math.max(G(g), !1 === a.options.displayNegative ? a.options.zThreshold : -Number.MAX_VALUE))), d = k(a.options.zMax, Math.max(d, t(g)))))
                });
                var b = f === d ? [{
                    value: d
                }] : [{
                    value: f
                }, {
                    value: (f + d) / 2
                }, {
                    value: d,
                    autoRanges: !0
                }];
                a.length && a[0].radius && b.reverse();
                b.forEach(function(c, d) {
                    a && a[d] && (b[d] = F(!1, a[d], c))
                });
                return b
            },
            predictBubbleSizes: function() {
                var c = this.chart,
                    a = this.fontMetrics,
                    g = c.legend.options,
                    f = "horizontal" === g.layout,
                    d = f ? c.legend.lastLineHeight : 0,
                    b = c.plotSizeX,
                    k = c.plotSizeY,
                    m = c.series[this.options.seriesIndex];
                c = Math.ceil(m.minPxSize);
                var p = Math.ceil(m.maxPxSize);
                m = m.options.maxSize;
                var q = Math.min(k, b);
                if (g.floating || !/%$/.test(m)) a = p;
                else if (m = parseFloat(m), a = (q + d - a.h / 2) * m / 100 / (m / 100 + 1), f && k - a >= b || !f && b - a >= k) a = p;
                return [c, Math.ceil(a)]
            },
            updateRanges: function(c, a) {
                var e = this.legend.options.bubbleLegend;
                e.minSize = c;
                e.maxSize = a;
                e.ranges = this.getRanges()
            },
            correctSizes: function() {
                var c = this.legend,
                    a = this.chart.series[this.options.seriesIndex];
                1 < Math.abs(Math.ceil(a.maxPxSize) - this.options.maxSize) && (this.updateRanges(this.options.minSize, a.maxPxSize), c.render())
            }
        };
        f(u, "afterGetAllItems", function(e) {
            var a = this.bubbleLegend,
                g = this.options,
                f = g.bubbleLegend,
                d = this.chart.getVisibleBubbleSeriesIndex();
            a && a.ranges && a.ranges.length && (f.ranges.length && (f.autoRanges = !!f.ranges[0].autoRanges), this.destroyItem(a));
            0 <= d && g.enabled && f.enabled && (f.seriesIndex = d, this.bubbleLegend = new c.BubbleLegend(f, this), this.bubbleLegend.addToLegend(e.allItems))
        });
        w.prototype.getVisibleBubbleSeriesIndex = function() {
            for (var c = this.series, a = 0; a < c.length;) {
                if (c[a] && c[a].isBubble && c[a].visible && c[a].zData.length) return a;
                a++
            }
            return -1
        };
        u.prototype.getLinesHeights = function() {
            var c = this.allItems,
                a = [],
                g = c.length,
                f, d = 0;
            for (f = 0; f < g; f++)
                if (c[f].legendItemHeight && (c[f].itemHeight = c[f].legendItemHeight), c[f] === c[g - 1] || c[f + 1] && c[f]._legendItemPos[1] !==
                    c[f + 1]._legendItemPos[1]) {
                    a.push({
                        height: 0
                    });
                    var b = a[a.length - 1];
                    for (d; d <= f; d++) c[d].itemHeight > b.height && (b.height = c[d].itemHeight);
                    b.step = f
                }
            return a
        };
        u.prototype.retranslateItems = function(c) {
            var a, e, f, d = this.options.rtl,
                b = 0;
            this.allItems.forEach(function(g, h) {
                a = g.legendGroup.translateX;
                e = g._legendItemPos[1];
                if ((f = g.movementX) || d && g.ranges) f = d ? a - g.options.maxSize / 2 : a + f, g.legendGroup.attr({
                    translateX: f
                });
                h > c[b].step && b++;
                g.legendGroup.attr({
                    translateY: Math.round(e + c[b].height / 2)
                });
                g._legendItemPos[1] =
                    e + c[b].height / 2
            })
        };
        f(z, "legendItemClick", function() {
            var c = this.chart,
                a = this.visible,
                g = this.chart.legend;
            g && g.bubbleLegend && (this.visible = !a, this.ignoreSeries = a, c = 0 <= c.getVisibleBubbleSeriesIndex(), g.bubbleLegend.visible !== c && (g.update({
                bubbleLegend: {
                    enabled: c
                }
            }), g.bubbleLegend.visible = c), this.visible = a)
        });
        x(w.prototype, "drawChartBox", function(c, a, g) {
            var e = this.legend,
                d = 0 <= this.getVisibleBubbleSeriesIndex();
            if (e && e.options.enabled && e.bubbleLegend && e.options.bubbleLegend.autoRanges && d) {
                var b = e.bubbleLegend.options;
                d = e.bubbleLegend.predictBubbleSizes();
                e.bubbleLegend.updateRanges(d[0], d[1]);
                b.placed || (e.group.placed = !1, e.allItems.forEach(function(a) {
                    a.legendGroup.translateY = null
                }));
                e.render();
                this.getMargins();
                this.axes.forEach(function(a) {
                    a.visible && a.render();
                    b.placed || (a.setScale(), a.updateNames(), D(a.ticks, function(a) {
                        a.isNew = !0;
                        a.isNewLabel = !0
                    }))
                });
                b.placed = !0;
                this.getMargins();
                c.call(this, a, g);
                e.bubbleLegend.correctSizes();
                e.retranslateItems(e.getLinesHeights())
            } else c.call(this, a, g), e && e.options.enabled &&
                e.bubbleLegend && (e.render(), e.retranslateItems(e.getLinesHeights()))
        })
    });
    O(u, "parts-more/BubbleSeries.js", [u["parts/Globals.js"], u["parts/Color.js"], u["parts/Point.js"], u["parts/Utilities.js"]], function(c, f, u, q) {
        var A = f.parse,
            t = q.arrayMax,
            G = q.arrayMin,
            C = q.clamp,
            F = q.extend,
            D = q.isNumber,
            k = q.pick,
            m = q.pInt;
        f = q.seriesType;
        q = c.Axis;
        var x = c.noop,
            z = c.Series,
            w = c.seriesTypes;
        f("bubble", "scatter", {
            dataLabels: {
                formatter: function() {
                    return this.point.z
                },
                inside: !0,
                verticalAlign: "middle"
            },
            animationLimit: 250,
            marker: {
                lineColor: null,
                lineWidth: 1,
                fillOpacity: .5,
                radius: null,
                states: {
                    hover: {
                        radiusPlus: 0
                    }
                },
                symbol: "circle"
            },
            minSize: 8,
            maxSize: "20%",
            softThreshold: !1,
            states: {
                hover: {
                    halo: {
                        size: 5
                    }
                }
            },
            tooltip: {
                pointFormat: "({point.x}, {point.y}), Size: {point.z}"
            },
            turboThreshold: 0,
            zThreshold: 0,
            zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"],
            parallelArrays: ["x", "y", "z"],
            trackerGroups: ["group", "dataLabelsGroup"],
            specialGroup: "group",
            bubblePadding: !0,
            zoneAxis: "z",
            directTouch: !0,
            isBubble: !0,
            pointAttribs: function(c, f) {
                var e = this.options.marker.fillOpacity;
                c = z.prototype.pointAttribs.call(this, c, f);
                1 !== e && (c.fill = A(c.fill).setOpacity(e).get("rgba"));
                return c
            },
            getRadii: function(c, f, e) {
                var a = this.zData,
                    g = this.yData,
                    k = e.minPxSize,
                    d = e.maxPxSize,
                    b = [];
                var l = 0;
                for (e = a.length; l < e; l++) {
                    var m = a[l];
                    b.push(this.getRadius(c, f, k, d, m, g[l]))
                }
                this.radii = b
            },
            getRadius: function(c, f, e, a, g, k) {
                var d = this.options,
                    b = "width" !== d.sizeBy,
                    h = d.zThreshold,
                    m = f - c,
                    p = .5;
                if (null === k || null === g) return null;
                if (D(g)) {
                    d.sizeByAbsoluteValue && (g = Math.abs(g - h), m = Math.max(f - h, Math.abs(c - h)), c =
                        0);
                    if (g < c) return e / 2 - 1;
                    0 < m && (p = (g - c) / m)
                }
                b && 0 <= p && (p = Math.sqrt(p));
                return Math.ceil(e + p * (a - e)) / 2
            },
            animate: function(c) {
                !c && this.points.length < this.options.animationLimit && (this.points.forEach(function(c) {
                    var e = c.graphic;
                    if (e && e.width) {
                        var a = {
                            x: e.x,
                            y: e.y,
                            width: e.width,
                            height: e.height
                        };
                        e.attr({
                            x: c.plotX,
                            y: c.plotY,
                            width: 1,
                            height: 1
                        });
                        e.animate(a, this.options.animation)
                    }
                }, this), this.animate = null)
            },
            hasData: function() {
                return !!this.processedXData.length
            },
            translate: function() {
                var c, f = this.data,
                    e = this.radii;
                w.scatter.prototype.translate.call(this);
                for (c = f.length; c--;) {
                    var a = f[c];
                    var g = e ? e[c] : 0;
                    D(g) && g >= this.minPxSize / 2 ? (a.marker = F(a.marker, {
                        radius: g,
                        width: 2 * g,
                        height: 2 * g
                    }), a.dlBox = {
                        x: a.plotX - g,
                        y: a.plotY - g,
                        width: 2 * g,
                        height: 2 * g
                    }) : a.shapeArgs = a.plotY = a.dlBox = void 0
                }
            },
            alignDataLabel: w.column.prototype.alignDataLabel,
            buildKDTree: x,
            applyZones: x
        }, {
            haloPath: function(c) {
                return u.prototype.haloPath.call(this, 0 === c ? 0 : (this.marker ? this.marker.radius || 0 : 0) + c)
            },
            ttBelow: !1
        });
        q.prototype.beforePadding = function() {
            var c =
                this,
                f = this.len,
                e = this.chart,
                a = 0,
                g = f,
                h = this.isXAxis,
                d = h ? "xData" : "yData",
                b = this.min,
                l = {},
                q = Math.min(e.plotWidth, e.plotHeight),
                r = Number.MAX_VALUE,
                u = -Number.MAX_VALUE,
                x = this.max - b,
                w = f / x,
                z = [];
            this.series.forEach(function(a) {
                var b = a.options;
                !a.bubblePadding || !a.visible && e.options.chart.ignoreHiddenSeries || (c.allowZoomOutside = !0, z.push(a), h && (["minSize", "maxSize"].forEach(function(a) {
                        var c = b[a],
                            d = /%$/.test(c);
                        c = m(c);
                        l[a] = d ? q * c / 100 : c
                    }), a.minPxSize = l.minSize, a.maxPxSize = Math.max(l.maxSize, l.minSize), a = a.zData.filter(D),
                    a.length && (r = k(b.zMin, C(G(a), !1 === b.displayNegative ? b.zThreshold : -Number.MAX_VALUE, r)), u = k(b.zMax, Math.max(u, t(a))))))
            });
            z.forEach(function(e) {
                var f = e[d],
                    k = f.length;
                h && e.getRadii(r, u, e);
                if (0 < x)
                    for (; k--;)
                        if (D(f[k]) && c.dataMin <= f[k] && f[k] <= c.max) {
                            var l = e.radii ? e.radii[k] : 0;
                            a = Math.min((f[k] - b) * w - l, a);
                            g = Math.max((f[k] - b) * w + l, g)
                        }
            });
            z.length && 0 < x && !this.isLog && (g -= f, w *= (f + Math.max(0, a) - Math.min(g, f)) / f, [
                ["min", "userMin", a],
                ["max", "userMax", g]
            ].forEach(function(a) {
                "undefined" === typeof k(c.options[a[0]],
                    c[a[1]]) && (c[a[0]] += a[2] / w)
            }))
        };
        ""
    });
    O(u, "parts-map/MapBubbleSeries.js", [u["parts/Globals.js"], u["parts/Point.js"], u["parts/Utilities.js"]], function(c, f, u) {
        var q = u.merge;
        u = u.seriesType;
        var A = c.seriesTypes;
        A.bubble && u("mapbubble", "bubble", {
            animationLimit: 500,
            tooltip: {
                pointFormat: "{point.name}: {point.z}"
            }
        }, {
            xyFromShape: !0,
            type: "mapbubble",
            pointArrayMap: ["z"],
            getMapData: A.map.prototype.getMapData,
            getBox: A.map.prototype.getBox,
            setData: A.map.prototype.setData,
            setOptions: A.map.prototype.setOptions
        }, {
            applyOptions: function(c,
                u) {
                return c && "undefined" !== typeof c.lat && "undefined" !== typeof c.lon ? f.prototype.applyOptions.call(this, q(c, this.series.chart.fromLatLonToPoint(c)), u) : A.map.prototype.pointClass.prototype.applyOptions.call(this, c, u)
            },
            isValid: function() {
                return "number" === typeof this.z
            },
            ttBelow: !1
        });
        ""
    });
    O(u, "parts-map/HeatmapSeries.js", [u["parts/Globals.js"], u["mixins/legend-symbol.js"], u["parts/Utilities.js"]], function(c, f, u) {
        var q = u.clamp,
            A = u.extend,
            t = u.fireEvent,
            G = u.merge,
            C = u.pick;
        u = u.seriesType;
        var F = c.colorMapPointMixin,
            D = c.noop,
            k = c.Series,
            m = c.seriesTypes;
        u("heatmap", "scatter", {
            animation: !1,
            borderWidth: 0,
            nullColor: "#f7f7f7",
            dataLabels: {
                formatter: function() {
                    return this.point.value
                },
                inside: !0,
                verticalAlign: "middle",
                crop: !1,
                overflow: !1,
                padding: 0
            },
            marker: null,
            pointRange: null,
            tooltip: {
                pointFormat: "{point.x}, {point.y}: {point.value}<br/>"
            },
            states: {
                hover: {
                    halo: !1,
                    brightness: .2
                }
            }
        }, G(c.colorMapSeriesMixin, {
            pointArrayMap: ["y", "value"],
            hasPointSpecificOptions: !0,
            getExtremesFromAll: !0,
            directTouch: !0,
            init: function() {
                m.scatter.prototype.init.apply(this,
                    arguments);
                var c = this.options;
                c.pointRange = C(c.pointRange, c.colsize || 1);
                this.yAxis.axisPointRange = c.rowsize || 1
            },
            translate: function() {
                this.generatePoints();
                var c = this.options,
                    f = c.colsize,
                    k = c.pointPadding,
                    m = void 0 === k ? 0 : k;
                c = c.rowsize;
                k = this.points;
                var u = this.xAxis,
                    e = this.yAxis,
                    a = (void 0 === f ? 1 : f) / 2,
                    g = (void 0 === c ? 1 : c) / 2,
                    h = this.pointPlacementToXValue(),
                    d = function(a) {
                        return Math.round(q(u.translate(a, !1, !1, !1, !0, h), 0, u.len))
                    };
                k.forEach(function(b) {
                    var c = d(b.x - a),
                        f = d(b.x + a),
                        k = Math.round(q(e.translate(b.y -
                            g, !1, !0, !1, !0), 0, e.len)),
                        h = Math.round(q(e.translate(b.y + g, !1, !0, !1, !0), 0, e.len)),
                        p = C(b.pointPadding, m);
                    b.plotX = b.clientX = (c + f) / 2;
                    b.plotY = (k + h) / 2;
                    b.shapeType = "rect";
                    b.shapeArgs = {
                        x: Math.min(c, f) + p,
                        y: Math.min(k, h) + p,
                        width: Math.max(Math.abs(f - c) - 2 * p, 0),
                        height: Math.max(Math.abs(h - k) - 2 * p, 0)
                    }
                });
                t(this, "afterTranslate")
            },
            drawPoints: function() {
                var c = this.chart.styledMode ? "css" : "animate";
                m.column.prototype.drawPoints.call(this);
                this.points.forEach(function(f) {
                    f.graphic[c](this.colorAttribs(f))
                }, this)
            },
            hasData: function() {
                return !!this.processedXData.length
            },
            getValidPoints: function(c, f) {
                return k.prototype.getValidPoints.call(this, c, f, !0)
            },
            animate: D,
            getBox: D,
            drawLegendSymbol: f.drawRectangle,
            alignDataLabel: m.column.prototype.alignDataLabel,
            getExtremes: function() {
                k.prototype.getExtremes.call(this, this.valueData);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                k.prototype.getExtremes.call(this)
            }
        }), A({
            haloPath: function(c) {
                if (!c) return [];
                var f = this.shapeArgs;
                return ["M", f.x - c, f.y - c, "L", f.x - c, f.y + f.height + c, f.x + f.width + c, f.y + f.height + c, f.x + f.width + c, f.y -
                    c, "Z"
                ]
            }
        }, F));
        ""
    });
    O(u, "parts-map/GeoJSON.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        function u(c, f) {
            var k, q = !1,
                t = c.x,
                u = c.y;
            c = 0;
            for (k = f.length - 1; c < f.length; k = c++) {
                var p = f[c][1] > u;
                var A = f[k][1] > u;
                p !== A && t < (f[k][0] - f[c][0]) * (u - f[c][1]) / (f[k][1] - f[c][1]) + f[c][0] && (q = !q)
            }
            return q
        }
        var q = f.error,
            A = f.extend,
            t = f.format,
            M = f.merge;
        f = f.wrap;
        var C = c.Chart,
            F = c.win;
        C.prototype.transformFromLatLon = function(c, f) {
            var k, t = (null === (k = this.userOptions.chart) || void 0 === k ? void 0 : k.proj4) || F.proj4;
            if (!t) return q(21, !1, this), {
                x: 0,
                y: null
            };
            c = t(f.crs, [c.lon, c.lat]);
            k = f.cosAngle || f.rotation && Math.cos(f.rotation);
            t = f.sinAngle || f.rotation && Math.sin(f.rotation);
            c = f.rotation ? [c[0] * k + c[1] * t, -c[0] * t + c[1] * k] : c;
            return {
                x: ((c[0] - (f.xoffset || 0)) * (f.scale || 1) + (f.xpan || 0)) * (f.jsonres || 1) + (f.jsonmarginX || 0),
                y: (((f.yoffset || 0) - c[1]) * (f.scale || 1) + (f.ypan || 0)) * (f.jsonres || 1) - (f.jsonmarginY || 0)
            }
        };
        C.prototype.transformToLatLon = function(c, f) {
            if ("undefined" === typeof F.proj4) q(21, !1, this);
            else {
                c = {
                    x: ((c.x - (f.jsonmarginX ||
                        0)) / (f.jsonres || 1) - (f.xpan || 0)) / (f.scale || 1) + (f.xoffset || 0),
                    y: ((-c.y - (f.jsonmarginY || 0)) / (f.jsonres || 1) + (f.ypan || 0)) / (f.scale || 1) + (f.yoffset || 0)
                };
                var k = f.cosAngle || f.rotation && Math.cos(f.rotation),
                    t = f.sinAngle || f.rotation && Math.sin(f.rotation);
                f = F.proj4(f.crs, "WGS84", f.rotation ? {
                    x: c.x * k + c.y * -t,
                    y: c.x * t + c.y * k
                } : c);
                return {
                    lat: f.y,
                    lon: f.x
                }
            }
        };
        C.prototype.fromPointToLatLon = function(c) {
            var f = this.mapTransforms,
                m;
            if (f) {
                for (m in f)
                    if (Object.hasOwnProperty.call(f, m) && f[m].hitZone && u({
                            x: c.x,
                            y: -c.y
                        }, f[m].hitZone.coordinates[0])) return this.transformToLatLon(c,
                        f[m]);
                return this.transformToLatLon(c, f["default"])
            }
            q(22, !1, this)
        };
        C.prototype.fromLatLonToPoint = function(c) {
            var f = this.mapTransforms,
                m;
            if (!f) return q(22, !1, this), {
                x: 0,
                y: null
            };
            for (m in f)
                if (Object.hasOwnProperty.call(f, m) && f[m].hitZone) {
                    var t = this.transformFromLatLon(c, f[m]);
                    if (u({
                            x: t.x,
                            y: -t.y
                        }, f[m].hitZone.coordinates[0])) return t
                }
            return this.transformFromLatLon(c, f["default"])
        };
        c.geojson = function(c, f, m) {
            var k = [],
                q = [],
                u = function(c) {
                    var f, e = c.length;
                    q.push("M");
                    for (f = 0; f < e; f++) 1 === f && q.push("L"),
                        q.push(c[f][0], -c[f][1])
                };
            f = f || "map";
            c.features.forEach(function(c) {
                var m = c.geometry,
                    e = m.type;
                m = m.coordinates;
                c = c.properties;
                var a;
                q = [];
                "map" === f || "mapbubble" === f ? ("Polygon" === e ? (m.forEach(u), q.push("Z")) : "MultiPolygon" === e && (m.forEach(function(a) {
                    a.forEach(u)
                }), q.push("Z")), q.length && (a = {
                    path: q
                })) : "mapline" === f ? ("LineString" === e ? u(m) : "MultiLineString" === e && m.forEach(u), q.length && (a = {
                    path: q
                })) : "mappoint" === f && "Point" === e && (a = {
                    x: m[0],
                    y: -m[1]
                });
                a && k.push(A(a, {
                    name: c.name || c.NAME,
                    properties: c
                }))
            });
            m &&
                c.copyrightShort && (m.chart.mapCredits = t(m.chart.options.credits.mapText, {
                    geojson: c
                }), m.chart.mapCreditsFull = t(m.chart.options.credits.mapTextFull, {
                    geojson: c
                }));
            return k
        };
        f(C.prototype, "addCredits", function(c, f) {
            f = M(!0, this.options.credits, f);
            this.mapCredits && (f.href = null);
            c.call(this, f);
            this.credits && this.mapCreditsFull && this.credits.attr({
                title: this.mapCreditsFull
            })
        })
    });
    O(u, "parts-map/Map.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function(c, f) {
        function u(c, f, q, t, u, p, A, e) {
            return ["M", c + u,
                f, "L", c + q - p, f, "C", c + q - p / 2, f, c + q, f + p / 2, c + q, f + p, "L", c + q, f + t - A, "C", c + q, f + t - A / 2, c + q - A / 2, f + t, c + q - A, f + t, "L", c + e, f + t, "C", c + e / 2, f + t, c, f + t - e / 2, c, f + t - e, "L", c, f + u, "C", c, f + u / 2, c + u / 2, f, c + u, f, "Z"
            ]
        }
        var q = f.extend,
            A = f.merge,
            t = f.pick,
            M = c.Chart;
        f = c.defaultOptions;
        var C = c.Renderer,
            F = c.SVGRenderer,
            D = c.VMLRenderer;
        q(f.lang, {
            zoomIn: "Zoom in",
            zoomOut: "Zoom out"
        });
        f.mapNavigation = {
            buttonOptions: {
                alignTo: "plotBox",
                align: "left",
                verticalAlign: "top",
                x: 0,
                width: 18,
                height: 18,
                padding: 5,
                style: {
                    fontSize: "15px",
                    fontWeight: "bold"
                },
                theme: {
                    "stroke-width": 1,
                    "text-align": "center"
                }
            },
            buttons: {
                zoomIn: {
                    onclick: function() {
                        this.mapZoom(.5)
                    },
                    text: "+",
                    y: 0
                },
                zoomOut: {
                    onclick: function() {
                        this.mapZoom(2)
                    },
                    text: "-",
                    y: 28
                }
            },
            mouseWheelSensitivity: 1.1
        };
        c.splitPath = function(c) {
            var f;
            c = c.replace(/([A-Za-z])/g, " $1 ");
            c = c.replace(/^\s*/, "").replace(/\s*$/, "");
            c = c.split(/[ ,]+/);
            for (f = 0; f < c.length; f++) /[a-zA-Z]/.test(c[f]) || (c[f] = parseFloat(c[f]));
            return c
        };
        c.maps = {};
        F.prototype.symbols.topbutton = function(c, f, q, t, w) {
            return u(c - 1, f - 1, q, t, w.r, w.r, 0, 0)
        };
        F.prototype.symbols.bottombutton = function(c, f, q, t, w) {
            return u(c - 1, f - 1, q, t, 0, 0, w.r, w.r)
        };
        C === D && ["topbutton", "bottombutton"].forEach(function(c) {
            D.prototype.symbols[c] = F.prototype.symbols[c]
        });
        c.Map = c.mapChart = function(f, m, q) {
            var k = "string" === typeof f || f.nodeName,
                u = arguments[k ? 1 : 0],
                p = u,
                x = {
                    endOnTick: !1,
                    visible: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    startOnTick: !1
                },
                e = c.getOptions().credits;
            var a = u.series;
            u.series = null;
            u = A({
                chart: {
                    panning: "xy",
                    type: "map"
                },
                credits: {
                    mapText: t(e.mapText, ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'),
                    mapTextFull: t(e.mapTextFull, "{geojson.copyright}")
                },
                tooltip: {
                    followTouchMove: !1
                },
                xAxis: x,
                yAxis: A(x, {
                    reversed: !0
                })
            }, u, {
                chart: {
                    inverted: !1,
                    alignTicks: !1
                }
            });
            u.series = p.series = a;
            return k ? new M(f, u, q) : new M(u, m)
        }
    });
    O(u, "masters/modules/map.src.js", [], function() {});
    O(u, "masters/highmaps.src.js", [u["masters/highcharts.src.js"]], function(c) {
        c.product = "Highmaps";
        return c
    });
    u["masters/highmaps.src.js"]._modules = u;
    return u["masters/highmaps.src.js"]
});
//# sourceMappingURL=highmaps.js.map