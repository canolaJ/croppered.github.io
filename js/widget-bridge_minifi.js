! function(n, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.VTWidgetBridge = e() : n.VTWidgetBridge = e()
}("undefined" != typeof self ? self : this, function() {
    return function(n) {
        function e(t) {
            if (r[t]) return r[t].exports;
            var i = r[t] = {
                i: t,
                l: !1,
                exports: {}
            };
            return n[t].call(i.exports, i, i.exports, e), i.l = !0, i.exports
        }
        var r = {};
        return e.m = n, e.c = r, e.d = function(n, r, t) {
            e.o(n, r) || Object.defineProperty(n, r, {
                configurable: !1,
                enumerable: !0,
                get: t
            })
        }, e.n = function(n) {
            var r = n && n.__esModule ? function() {
                return n.default
            } : function() {
                return n
            };
            return e.d(r, "a", r), r
        }, e.o = function(n, e) {
            return Object.prototype.hasOwnProperty.call(n, e)
        }, e.p = "", e(e.s = 0)
    }([function(n, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var t = r(1);
        r.d(e, "Bridge", function() {
            return t.a
        }), r.d(e, "BridgeConfig", function() {
            return t.b
        })
    }, function(n, e, r) {
        "use strict";

        function t() {
            x() && (window.veritranBridgeHelper.sendMessage = l, window.veritranBridgeHelper.sendAttributes = m)
        }

        function i(n, e) {
            t();
            var r = ++j;
            return x() && window.veritranBridgeHelper.raiseWidgetEvent(n, e, r), u(n, e, r)
        }

        function u(n, e, r) {
            function t() {
                E.push(r)
            }
            return {
                default: function(i) {
                    if (!x()) {
                        var u = i(n, e);
                        u && !o(r) && h.frameworkTimeout(function() {
                            p(u.messageName, u.attrs)
                        }, 0)
                    }
                    return {
                        cancel: t
                    }
                },
                cancel: t
            }
        }

        function o(n) {
            return -1 != E.indexOf(n)
        }

        function f(n, e) {
            t(), a(y, n, e)
        }

        function c(n, e) {
            t(), a(B, n, e)
        }

        function a(n, e, r) {
            var t = n[e];
            t ? -1 === t.indexOf(r) && n[e].push(r) : n[e] = [r]
        }

        function d(n, e) {
            t(), s(B, n, e), s(y, n, e)
        }

        function s(n, e, r) {
            var t = n[e];
            if (t) {
                var i = t.indexOf(r); - 1 !== i && n[e].splice(i, 1)
            }
        }

        function l(n, e, r) {
            o(r) || p(n, e)
        }

        function p(n, e) {
            var r = B[n];
            if (r) {
                var t = r.splice(0);
                t.forEach(function(r) {
                    return h.frameworkCallback(function() {
                        return r(n, e)
                    })
                })
            }
            var i = y[n];
            i && i.forEach(function(r) {
                t && -1 !== t.indexOf(r) || h.frameworkCallback(function() {
                    return r(n, e)
                })
            })
        }

        function v(n) {
            n()
        }

        function b(n, e) {
            setTimeout(n, e)
        }

        function g(n) {
            t();
            var e = {};
            n.forEach(function(n) {
                e[n] = void 0
            });
            var r = function(n) {
                    for (var r in n) e[r] = n[r];
                    return {
                        then: i
                    }
                },
                i = function(r) {
                    var t = ++j;
                    return O[t] = function(n) {
                        for (var t in n) e[t] = n[t];
                        r(e)
                    }, x() ? window.veritranBridgeHelper.getAttributes(t, n) : h.frameworkTimeout(function() {
                        return m(t, e)
                    }, 0), {
                        cancel: function() {
                            return w(t)
                        }
                    }
                };
            return {
                defaultValues: r,
                then: i
            }
        }

        function m(n, e) {
            var r = w(n);
            r && h.frameworkCallback(function() {
                return r(e)
            })
        }

        function w(n) {
            var e = O[n];
            return delete O[n], e
        }

        function x() {
            return !!window.veritranBridgeHelper
        }
        r.d(e, "a", function() {
            return k
        }), r.d(e, "b", function() {
            return h
        });
        var k = {
                bridgeExists: x,
                raiseEvent: i,
                subscribe: f,
                subscribeOnce: c,
                unsubscribe: d,
                getAttributes: g
            },
            h = {
                init: t,
                frameworkCallback: v,
                frameworkTimeout: b
            },
            y = {},
            B = {},
            O = {},
            j = 0,
            E = [];
        t()
    }])
});