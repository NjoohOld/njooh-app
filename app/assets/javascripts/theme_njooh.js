if ("undefined" == typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
+function (t) {
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] >= 4)throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
}(jQuery), function () {
    function t(t, e) {
        if (!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function e(t, e) {
        if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    function n(t, e) {
        if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
    }

    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, o = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }

        return function (e, n, i) {
            return n && t(e.prototype, n), i && t(e, i), e
        }
    }(), s = function (t) {
        function e(t) {
            return {}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
        }

        function n(t) {
            return (t[0] || t).nodeType
        }

        function i() {
            return {
                bindType: r.end, delegateType: r.end, handle: function (e) {
                    if (t(e.target).is(this))return e.handleObj.handler.apply(this, arguments)
                }
            }
        }

        function o() {
            if (window.QUnit)return !1;
            var t = document.createElement("bootstrap");
            for (var e in a)if (void 0 !== t.style[e])return {end: a[e]};
            return !1
        }

        function s(e) {
            var n = this, i = !1;
            return t(this).one(l.TRANSITION_END, function () {
                i = !0
            }), setTimeout(function () {
                i || l.triggerTransitionEnd(n)
            }, e), this
        }

        var r = !1, a = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        }, l = {
            TRANSITION_END: "bsTransitionEnd", getUID: function (t) {
                do {
                    t += ~~(1e6 * Math.random())
                } while (document.getElementById(t));
                return t
            }, getSelectorFromElement: function (t) {
                var e = t.getAttribute("data-target");
                return e || (e = t.getAttribute("href") || "", e = /^#[a-z]/i.test(e) ? e : null), e
            }, reflow: function (t) {
                return t.offsetHeight
            }, triggerTransitionEnd: function (e) {
                t(e).trigger(r.end)
            }, supportsTransitionEnd: function () {
                return Boolean(r)
            }, typeCheckConfig: function (t, i, o) {
                for (var s in o)if (o.hasOwnProperty(s)) {
                    var r = o[s], a = i[s], l = a && n(a) ? "element" : e(a);
                    if (!new RegExp(r).test(l))throw new Error(t.toUpperCase() + ': Option "' + s + '" provided type "' + l + '" but expected type "' + r + '".')
                }
            }
        };
        return function () {
            r = o(), t.fn.emulateTransitionEnd = s, l.supportsTransitionEnd() && (t.event.special[l.TRANSITION_END] = i())
        }(), l
    }(jQuery), r = (function (t) {
        var e = "alert", i = t.fn[e], r = {DISMISS: '[data-dismiss="alert"]'},
            a = {CLOSE: "close.bs.alert", CLOSED: "closed.bs.alert", CLICK_DATA_API: "click.bs.alert.data-api"},
            l = {ALERT: "alert", FADE: "fade", SHOW: "show"}, h = function () {
                function e(t) {
                    n(this, e), this._element = t
                }

                return e.prototype.close = function (t) {
                    t = t || this._element;
                    var e = this._getRootElement(t);
                    this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
                }, e.prototype.dispose = function () {
                    t.removeData(this._element, "bs.alert"), this._element = null
                }, e.prototype._getRootElement = function (e) {
                    var n = s.getSelectorFromElement(e), i = !1;
                    return n && (i = t(n)[0]), i || (i = t(e).closest("." + l.ALERT)[0]), i
                }, e.prototype._triggerCloseEvent = function (e) {
                    var n = t.Event(a.CLOSE);
                    return t(e).trigger(n), n
                }, e.prototype._removeElement = function (e) {
                    var n = this;
                    if (t(e).removeClass(l.SHOW), !s.supportsTransitionEnd() || !t(e).hasClass(l.FADE))return void this._destroyElement(e);
                    t(e).one(s.TRANSITION_END, function (t) {
                        return n._destroyElement(e, t)
                    }).emulateTransitionEnd(150)
                }, e.prototype._destroyElement = function (e) {
                    t(e).detach().trigger(a.CLOSED).remove()
                }, e._jQueryInterface = function (n) {
                    return this.each(function () {
                        var i = t(this), o = i.data("bs.alert");
                        o || (o = new e(this), i.data("bs.alert", o)), "close" === n && o[n](this)
                    })
                }, e._handleDismiss = function (t) {
                    return function (e) {
                        e && e.preventDefault(), t.close(this)
                    }
                }, o(e, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-alpha.6"
                    }
                }]), e
            }();
        t(document).on(a.CLICK_DATA_API, r.DISMISS, h._handleDismiss(new h)), t.fn[e] = h._jQueryInterface, t.fn[e].Constructor = h, t.fn[e].noConflict = function () {
            return t.fn[e] = i, h._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = "button", i = t.fn[e], s = {ACTIVE: "active", BUTTON: "btn", FOCUS: "focus"}, r = {
            DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
            DATA_TOGGLE: '[data-toggle="buttons"]',
            INPUT: "input",
            ACTIVE: ".active",
            BUTTON: ".btn"
        }, a = {
            CLICK_DATA_API: "click.bs.button.data-api",
            FOCUS_BLUR_DATA_API: "focus.bs.button.data-api blur.bs.button.data-api"
        }, l = function () {
            function e(t) {
                n(this, e), this._element = t
            }

            return e.prototype.toggle = function () {
                var e = !0, n = t(this._element).closest(r.DATA_TOGGLE)[0];
                if (n) {
                    var i = t(this._element).find(r.INPUT)[0];
                    if (i) {
                        if ("radio" === i.type)if (i.checked && t(this._element).hasClass(s.ACTIVE)) e = !1; else {
                            var o = t(n).find(r.ACTIVE)[0];
                            o && t(o).removeClass(s.ACTIVE)
                        }
                        e && (i.checked = !t(this._element).hasClass(s.ACTIVE), t(i).trigger("change")), i.focus()
                    }
                }
                this._element.setAttribute("aria-pressed", !t(this._element).hasClass(s.ACTIVE)), e && t(this._element).toggleClass(s.ACTIVE)
            }, e.prototype.dispose = function () {
                t.removeData(this._element, "bs.button"), this._element = null
            }, e._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = t(this).data("bs.button");
                    i || (i = new e(this), t(this).data("bs.button", i)), "toggle" === n && i[n]()
                })
            }, o(e, null, [{
                key: "VERSION", get: function () {
                    return "4.0.0-alpha.6"
                }
            }]), e
        }();
        t(document).on(a.CLICK_DATA_API, r.DATA_TOGGLE_CARROT, function (e) {
            e.preventDefault();
            var n = e.target;
            t(n).hasClass(s.BUTTON) || (n = t(n).closest(r.BUTTON)), l._jQueryInterface.call(t(n), "toggle")
        }).on(a.FOCUS_BLUR_DATA_API, r.DATA_TOGGLE_CARROT, function (e) {
            var n = t(e.target).closest(r.BUTTON)[0];
            t(n).toggleClass(s.FOCUS, /^focus(in)?$/.test(e.type))
        }), t.fn[e] = l._jQueryInterface, t.fn[e].Constructor = l, t.fn[e].noConflict = function () {
            return t.fn[e] = i, l._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = "carousel", r = "bs.carousel", a = "." + r, l = t.fn[e],
            h = {interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0}, c = {
                interval: "(number|boolean)",
                keyboard: "boolean",
                slide: "(boolean|string)",
                pause: "(string|boolean)",
                wrap: "boolean"
            }, d = {NEXT: "next", PREV: "prev", LEFT: "left", RIGHT: "right"}, u = {
                SLIDE: "slide" + a,
                SLID: "slid" + a,
                KEYDOWN: "keydown" + a,
                MOUSEENTER: "mouseenter" + a,
                MOUSELEAVE: "mouseleave" + a,
                LOAD_DATA_API: "load.bs.carousel.data-api",
                CLICK_DATA_API: "click.bs.carousel.data-api"
            }, p = {
                CAROUSEL: "carousel",
                ACTIVE: "active",
                SLIDE: "slide",
                RIGHT: "carousel-item-right",
                LEFT: "carousel-item-left",
                NEXT: "carousel-item-next",
                PREV: "carousel-item-prev",
                ITEM: "carousel-item"
            }, f = {
                ACTIVE: ".active",
                ACTIVE_ITEM: ".active.carousel-item",
                ITEM: ".carousel-item",
                NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
                INDICATORS: ".carousel-indicators",
                DATA_SLIDE: "[data-slide], [data-slide-to]",
                DATA_RIDE: '[data-ride="carousel"]'
            }, m = function () {
                function l(e, i) {
                    n(this, l), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this._config = this._getConfig(i), this._element = t(e)[0], this._indicatorsElement = t(this._element).find(f.INDICATORS)[0], this._addEventListeners()
                }

                return l.prototype.next = function () {
                    if (this._isSliding)throw new Error("Carousel is sliding");
                    this._slide(d.NEXT)
                }, l.prototype.nextWhenVisible = function () {
                    document.hidden || this.next()
                }, l.prototype.prev = function () {
                    if (this._isSliding)throw new Error("Carousel is sliding");
                    this._slide(d.PREVIOUS)
                }, l.prototype.pause = function (e) {
                    e || (this._isPaused = !0), t(this._element).find(f.NEXT_PREV)[0] && s.supportsTransitionEnd() && (s.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
                }, l.prototype.cycle = function (t) {
                    t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                }, l.prototype.to = function (e) {
                    var n = this;
                    this._activeElement = t(this._element).find(f.ACTIVE_ITEM)[0];
                    var i = this._getItemIndex(this._activeElement);
                    if (!(e > this._items.length - 1 || e < 0)) {
                        if (this._isSliding)return void t(this._element).one(u.SLID, function () {
                            return n.to(e)
                        });
                        if (i === e)return this.pause(), void this.cycle();
                        var o = e > i ? d.NEXT : d.PREVIOUS;
                        this._slide(o, this._items[e])
                    }
                }, l.prototype.dispose = function () {
                    t(this._element).off(a), t.removeData(this._element, r), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
                }, l.prototype._getConfig = function (n) {
                    return n = t.extend({}, h, n), s.typeCheckConfig(e, n, c), n
                }, l.prototype._addEventListeners = function () {
                    var e = this;
                    this._config.keyboard && t(this._element).on(u.KEYDOWN, function (t) {
                        return e._keydown(t)
                    }), "hover" !== this._config.pause || "ontouchstart" in document.documentElement || t(this._element).on(u.MOUSEENTER, function (t) {
                        return e.pause(t)
                    }).on(u.MOUSELEAVE, function (t) {
                        return e.cycle(t)
                    })
                }, l.prototype._keydown = function (t) {
                    if (!/input|textarea/i.test(t.target.tagName))switch (t.which) {
                        case 37:
                            t.preventDefault(), this.prev();
                            break;
                        case 39:
                            t.preventDefault(), this.next();
                            break;
                        default:
                            return
                    }
                }, l.prototype._getItemIndex = function (e) {
                    return this._items = t.makeArray(t(e).parent().find(f.ITEM)), this._items.indexOf(e)
                }, l.prototype._getItemByDirection = function (t, e) {
                    var n = t === d.NEXT, i = t === d.PREVIOUS, o = this._getItemIndex(e), s = this._items.length - 1;
                    if ((i && 0 === o || n && o === s) && !this._config.wrap)return e;
                    var r = t === d.PREVIOUS ? -1 : 1, a = (o + r) % this._items.length;
                    return -1 === a ? this._items[this._items.length - 1] : this._items[a]
                }, l.prototype._triggerSlideEvent = function (e, n) {
                    var i = t.Event(u.SLIDE, {relatedTarget: e, direction: n});
                    return t(this._element).trigger(i), i
                }, l.prototype._setActiveIndicatorElement = function (e) {
                    if (this._indicatorsElement) {
                        t(this._indicatorsElement).find(f.ACTIVE).removeClass(p.ACTIVE);
                        var n = this._indicatorsElement.children[this._getItemIndex(e)];
                        n && t(n).addClass(p.ACTIVE)
                    }
                }, l.prototype._slide = function (e, n) {
                    var i = this, o = t(this._element).find(f.ACTIVE_ITEM)[0], r = n || o && this._getItemByDirection(e, o),
                        a = Boolean(this._interval), l = void 0, h = void 0, c = void 0;
                    if (e === d.NEXT ? (l = p.LEFT, h = p.NEXT, c = d.LEFT) : (l = p.RIGHT, h = p.PREV, c = d.RIGHT), r && t(r).hasClass(p.ACTIVE))return void(this._isSliding = !1);
                    if (!this._triggerSlideEvent(r, c).isDefaultPrevented() && o && r) {
                        this._isSliding = !0, a && this.pause(), this._setActiveIndicatorElement(r);
                        var m = t.Event(u.SLID, {relatedTarget: r, direction: c});
                        s.supportsTransitionEnd() && t(this._element).hasClass(p.SLIDE) ? (t(r).addClass(h), s.reflow(r), t(o).addClass(l), t(r).addClass(l), t(o).one(s.TRANSITION_END, function () {
                            t(r).removeClass(l + " " + h).addClass(p.ACTIVE), t(o).removeClass(p.ACTIVE + " " + h + " " + l), i._isSliding = !1, setTimeout(function () {
                                return t(i._element).trigger(m)
                            }, 0)
                        }).emulateTransitionEnd(600)) : (t(o).removeClass(p.ACTIVE), t(r).addClass(p.ACTIVE), this._isSliding = !1, t(this._element).trigger(m)), a && this.cycle()
                    }
                }, l._jQueryInterface = function (e) {
                    return this.each(function () {
                        var n = t(this).data(r), o = t.extend({}, h, t(this).data());
                        "object" === (void 0 === e ? "undefined" : i(e)) && t.extend(o, e);
                        var s = "string" == typeof e ? e : o.slide;
                        if (n || (n = new l(this, o), t(this).data(r, n)), "number" == typeof e) n.to(e); else if ("string" == typeof s) {
                            if (void 0 === n[s])throw new Error('No method named "' + s + '"');
                            n[s]()
                        } else o.interval && (n.pause(), n.cycle())
                    })
                }, l._dataApiClickHandler = function (e) {
                    var n = s.getSelectorFromElement(this);
                    if (n) {
                        var i = t(n)[0];
                        if (i && t(i).hasClass(p.CAROUSEL)) {
                            var o = t.extend({}, t(i).data(), t(this).data()), a = this.getAttribute("data-slide-to");
                            a && (o.interval = !1), l._jQueryInterface.call(t(i), o), a && t(i).data(r).to(a), e.preventDefault()
                        }
                    }
                }, o(l, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-alpha.6"
                    }
                }, {
                    key: "Default", get: function () {
                        return h
                    }
                }]), l
            }();
        t(document).on(u.CLICK_DATA_API, f.DATA_SLIDE, m._dataApiClickHandler), t(window).on(u.LOAD_DATA_API, function () {
            t(f.DATA_RIDE).each(function () {
                var e = t(this);
                m._jQueryInterface.call(e, e.data())
            })
        }), t.fn[e] = m._jQueryInterface, t.fn[e].Constructor = m, t.fn[e].noConflict = function () {
            return t.fn[e] = l, m._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = "collapse", r = "bs.collapse", a = t.fn[e], l = {toggle: !0, parent: ""},
            h = {toggle: "boolean", parent: "string"}, c = {
                SHOW: "show." + r,
                SHOWN: "shown." + r,
                HIDE: "hide." + r,
                HIDDEN: "hidden." + r,
                CLICK_DATA_API: "click.bs.collapse.data-api"
            }, d = {SHOW: "show", COLLAPSE: "collapse", COLLAPSING: "collapsing", COLLAPSED: "collapsed"},
            u = {WIDTH: "width", HEIGHT: "height"},
            p = {ACTIVES: ".card > .show, .card > .collapsing", DATA_TOGGLE: '[data-toggle="collapse"]'},
            f = function () {
                function a(e, i) {
                    n(this, a), this._isTransitioning = !1, this._element = e, this._config = this._getConfig(i), this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]')), this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
                }

                return a.prototype.toggle = function () {
                    t(this._element).hasClass(d.SHOW) ? this.hide() : this.show()
                }, a.prototype.show = function () {
                    var e = this;
                    if (this._isTransitioning)throw new Error("Collapse is transitioning");
                    if (!t(this._element).hasClass(d.SHOW)) {
                        var n = void 0, i = void 0;
                        if (this._parent && (n = t.makeArray(t(this._parent).find(p.ACTIVES)), n.length || (n = null)), !(n && (i = t(n).data(r)) && i._isTransitioning)) {
                            var o = t.Event(c.SHOW);
                            if (t(this._element).trigger(o), !o.isDefaultPrevented()) {
                                n && (a._jQueryInterface.call(t(n), "hide"), i || t(n).data(r, null));
                                var l = this._getDimension();
                                t(this._element).removeClass(d.COLLAPSE).addClass(d.COLLAPSING), this._element.style[l] = 0, this._element.setAttribute("aria-expanded", !0), this._triggerArray.length && t(this._triggerArray).removeClass(d.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);
                                var h = function () {
                                    t(e._element).removeClass(d.COLLAPSING).addClass(d.COLLAPSE).addClass(d.SHOW), e._element.style[l] = "", e.setTransitioning(!1), t(e._element).trigger(c.SHOWN)
                                };
                                if (!s.supportsTransitionEnd())return void h();
                                var u = l[0].toUpperCase() + l.slice(1), f = "scroll" + u;
                                t(this._element).one(s.TRANSITION_END, h).emulateTransitionEnd(600), this._element.style[l] = this._element[f] + "px"
                            }
                        }
                    }
                }, a.prototype.hide = function () {
                    var e = this;
                    if (this._isTransitioning)throw new Error("Collapse is transitioning");
                    if (t(this._element).hasClass(d.SHOW)) {
                        var n = t.Event(c.HIDE);
                        if (t(this._element).trigger(n), !n.isDefaultPrevented()) {
                            var i = this._getDimension(), o = i === u.WIDTH ? "offsetWidth" : "offsetHeight";
                            this._element.style[i] = this._element[o] + "px", s.reflow(this._element), t(this._element).addClass(d.COLLAPSING).removeClass(d.COLLAPSE).removeClass(d.SHOW), this._element.setAttribute("aria-expanded", !1), this._triggerArray.length && t(this._triggerArray).addClass(d.COLLAPSED).attr("aria-expanded", !1), this.setTransitioning(!0);
                            var r = function () {
                                e.setTransitioning(!1), t(e._element).removeClass(d.COLLAPSING).addClass(d.COLLAPSE).trigger(c.HIDDEN)
                            };
                            if (this._element.style[i] = "", !s.supportsTransitionEnd())return void r();
                            t(this._element).one(s.TRANSITION_END, r).emulateTransitionEnd(600)
                        }
                    }
                }, a.prototype.setTransitioning = function (t) {
                    this._isTransitioning = t
                }, a.prototype.dispose = function () {
                    t.removeData(this._element, r), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                }, a.prototype._getConfig = function (n) {
                    return n = t.extend({}, l, n), n.toggle = Boolean(n.toggle), s.typeCheckConfig(e, n, h), n
                }, a.prototype._getDimension = function () {
                    return t(this._element).hasClass(u.WIDTH) ? u.WIDTH : u.HEIGHT
                }, a.prototype._getParent = function () {
                    var e = this, n = t(this._config.parent)[0],
                        i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                    return t(n).find(i).each(function (t, n) {
                        e._addAriaAndCollapsedClass(a._getTargetFromElement(n), [n])
                    }), n
                }, a.prototype._addAriaAndCollapsedClass = function (e, n) {
                    if (e) {
                        var i = t(e).hasClass(d.SHOW);
                        e.setAttribute("aria-expanded", i), n.length && t(n).toggleClass(d.COLLAPSED, !i).attr("aria-expanded", i)
                    }
                }, a._getTargetFromElement = function (e) {
                    var n = s.getSelectorFromElement(e);
                    return n ? t(n)[0] : null
                }, a._jQueryInterface = function (e) {
                    return this.each(function () {
                        var n = t(this), o = n.data(r),
                            s = t.extend({}, l, n.data(), "object" === (void 0 === e ? "undefined" : i(e)) && e);
                        if (!o && s.toggle && /show|hide/.test(e) && (s.toggle = !1), o || (o = new a(this, s), n.data(r, o)), "string" == typeof e) {
                            if (void 0 === o[e])throw new Error('No method named "' + e + '"');
                            o[e]()
                        }
                    })
                }, o(a, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-alpha.6"
                    }
                }, {
                    key: "Default", get: function () {
                        return l
                    }
                }]), a
            }();
        t(document).on(c.CLICK_DATA_API, p.DATA_TOGGLE, function (e) {
            e.preventDefault();
            var n = f._getTargetFromElement(this), i = t(n).data(r), o = i ? "toggle" : t(this).data();
            f._jQueryInterface.call(t(n), o)
        }), t.fn[e] = f._jQueryInterface, t.fn[e].Constructor = f, t.fn[e].noConflict = function () {
            return t.fn[e] = a, f._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = "dropdown", i = ".bs.dropdown", r = t.fn[e], a = {
            HIDE: "hide" + i,
            HIDDEN: "hidden" + i,
            SHOW: "show" + i,
            SHOWN: "shown" + i,
            CLICK: "click" + i,
            CLICK_DATA_API: "click.bs.dropdown.data-api",
            FOCUSIN_DATA_API: "focusin.bs.dropdown.data-api",
            KEYDOWN_DATA_API: "keydown.bs.dropdown.data-api"
        }, l = {BACKDROP: "dropdown-backdrop", DISABLED: "disabled", SHOW: "show"}, h = {
            BACKDROP: ".dropdown-backdrop",
            DATA_TOGGLE: '[data-toggle="dropdown"]',
            FORM_CHILD: ".dropdown form",
            ROLE_MENU: '[role="menu"]',
            ROLE_LISTBOX: '[role="listbox"]',
            NAVBAR_NAV: ".navbar-nav",
            VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, [role="listbox"] li:not(.disabled) a'
        }, c = function () {
            function e(t) {
                n(this, e), this._element = t, this._addEventListeners()
            }

            return e.prototype.toggle = function () {
                if (this.disabled || t(this).hasClass(l.DISABLED))return !1;
                var n = e._getParentFromElement(this), i = t(n).hasClass(l.SHOW);
                if (e._clearMenus(), i)return !1;
                if ("ontouchstart" in document.documentElement && !t(n).closest(h.NAVBAR_NAV).length) {
                    var o = document.createElement("div");
                    o.className = l.BACKDROP, t(o).insertBefore(this), t(o).on("click", e._clearMenus)
                }
                var s = {relatedTarget: this}, r = t.Event(a.SHOW, s);
                return t(n).trigger(r), !r.isDefaultPrevented() && (this.focus(), this.setAttribute("aria-expanded", !0), t(n).toggleClass(l.SHOW), t(n).trigger(t.Event(a.SHOWN, s)), !1)
            }, e.prototype.dispose = function () {
                t.removeData(this._element, "bs.dropdown"), t(this._element).off(i), this._element = null
            }, e.prototype._addEventListeners = function () {
                t(this._element).on(a.CLICK, this.toggle)
            }, e._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = t(this).data("bs.dropdown");
                    if (i || (i = new e(this), t(this).data("bs.dropdown", i)), "string" == typeof n) {
                        if (void 0 === i[n])throw new Error('No method named "' + n + '"');
                        i[n].call(this)
                    }
                })
            }, e._clearMenus = function (n) {
                if (!n || 3 !== n.which) {
                    var i = t(h.BACKDROP)[0];
                    i && i.parentNode.removeChild(i);
                    for (var o = t.makeArray(t(h.DATA_TOGGLE)), s = 0; s < o.length; s++) {
                        var r = e._getParentFromElement(o[s]), c = {relatedTarget: o[s]};
                        if (t(r).hasClass(l.SHOW) && !(n && ("click" === n.type && /input|textarea/i.test(n.target.tagName) || "focusin" === n.type) && t.contains(r, n.target))) {
                            var d = t.Event(a.HIDE, c);
                            t(r).trigger(d), d.isDefaultPrevented() || (o[s].setAttribute("aria-expanded", "false"), t(r).removeClass(l.SHOW).trigger(t.Event(a.HIDDEN, c)))
                        }
                    }
                }
            }, e._getParentFromElement = function (e) {
                var n = void 0, i = s.getSelectorFromElement(e);
                return i && (n = t(i)[0]), n || e.parentNode
            }, e._dataApiKeydownHandler = function (n) {
                if (/(38|40|27|32)/.test(n.which) && !/input|textarea/i.test(n.target.tagName) && (n.preventDefault(), n.stopPropagation(), !this.disabled && !t(this).hasClass(l.DISABLED))) {
                    var i = e._getParentFromElement(this), o = t(i).hasClass(l.SHOW);
                    if (!o && 27 !== n.which || o && 27 === n.which) {
                        if (27 === n.which) {
                            var s = t(i).find(h.DATA_TOGGLE)[0];
                            t(s).trigger("focus")
                        }
                        return void t(this).trigger("click")
                    }
                    var r = t(i).find(h.VISIBLE_ITEMS).get();
                    if (r.length) {
                        var a = r.indexOf(n.target);
                        38 === n.which && a > 0 && a--, 40 === n.which && a < r.length - 1 && a++, a < 0 && (a = 0), r[a].focus()
                    }
                }
            }, o(e, null, [{
                key: "VERSION", get: function () {
                    return "4.0.0-alpha.6"
                }
            }]), e
        }();
        t(document).on(a.KEYDOWN_DATA_API, h.DATA_TOGGLE, c._dataApiKeydownHandler).on(a.KEYDOWN_DATA_API, h.ROLE_MENU, c._dataApiKeydownHandler).on(a.KEYDOWN_DATA_API, h.ROLE_LISTBOX, c._dataApiKeydownHandler).on(a.CLICK_DATA_API + " " + a.FOCUSIN_DATA_API, c._clearMenus).on(a.CLICK_DATA_API, h.DATA_TOGGLE, c.prototype.toggle).on(a.CLICK_DATA_API, h.FORM_CHILD, function (t) {
            t.stopPropagation()
        }), t.fn[e] = c._jQueryInterface, t.fn[e].Constructor = c, t.fn[e].noConflict = function () {
            return t.fn[e] = r, c._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = "modal", r = ".bs.modal", a = t.fn[e], l = {backdrop: !0, keyboard: !0, focus: !0, show: !0},
            h = {backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean"}, c = {
                HIDE: "hide.bs.modal",
                HIDDEN: "hidden.bs.modal",
                SHOW: "show.bs.modal",
                SHOWN: "shown.bs.modal",
                FOCUSIN: "focusin.bs.modal",
                RESIZE: "resize.bs.modal",
                CLICK_DISMISS: "click.dismiss.bs.modal",
                KEYDOWN_DISMISS: "keydown.dismiss.bs.modal",
                MOUSEUP_DISMISS: "mouseup.dismiss.bs.modal",
                MOUSEDOWN_DISMISS: "mousedown.dismiss.bs.modal",
                CLICK_DATA_API: "click.bs.modal.data-api"
            }, d = {
                SCROLLBAR_MEASURER: "modal-scrollbar-measure",
                BACKDROP: "modal-backdrop",
                OPEN: "modal-open",
                FADE: "fade",
                SHOW: "show"
            }, u = {
                DIALOG: ".modal-dialog",
                DATA_TOGGLE: '[data-toggle="modal"]',
                DATA_DISMISS: '[data-dismiss="modal"]',
                FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
            }, p = function () {
                function a(e, i) {
                    n(this, a), this._config = this._getConfig(i), this._element = e, this._dialog = t(e).find(u.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
                }

                return a.prototype.toggle = function (t) {
                    return this._isShown ? this.hide() : this.show(t)
                }, a.prototype.show = function (e) {
                    var n = this;
                    if (this._isTransitioning)throw new Error("Modal is transitioning");
                    s.supportsTransitionEnd() && t(this._element).hasClass(d.FADE) && (this._isTransitioning = !0);
                    var i = t.Event(c.SHOW, {relatedTarget: e});
                    t(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), t(document.body).addClass(d.OPEN), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(c.CLICK_DISMISS, u.DATA_DISMISS, function (t) {
                        return n.hide(t)
                    }), t(this._dialog).on(c.MOUSEDOWN_DISMISS, function () {
                        t(n._element).one(c.MOUSEUP_DISMISS, function (e) {
                            t(e.target).is(n._element) && (n._ignoreBackdropClick = !0)
                        })
                    }), this._showBackdrop(function () {
                        return n._showElement(e)
                    }))
                }, a.prototype.hide = function (e) {
                    var n = this;
                    if (e && e.preventDefault(), this._isTransitioning)throw new Error("Modal is transitioning");
                    var i = s.supportsTransitionEnd() && t(this._element).hasClass(d.FADE);
                    i && (this._isTransitioning = !0);
                    var o = t.Event(c.HIDE);
                    t(this._element).trigger(o), this._isShown && !o.isDefaultPrevented() && (this._isShown = !1, this._setEscapeEvent(), this._setResizeEvent(), t(document).off(c.FOCUSIN), t(this._element).removeClass(d.SHOW), t(this._element).off(c.CLICK_DISMISS), t(this._dialog).off(c.MOUSEDOWN_DISMISS), i ? t(this._element).one(s.TRANSITION_END, function (t) {
                        return n._hideModal(t)
                    }).emulateTransitionEnd(300) : this._hideModal())
                }, a.prototype.dispose = function () {
                    t.removeData(this._element, "bs.modal"), t(window, document, this._element, this._backdrop).off(r), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._originalBodyPadding = null, this._scrollbarWidth = null
                }, a.prototype._getConfig = function (n) {
                    return n = t.extend({}, l, n), s.typeCheckConfig(e, n, h), n
                }, a.prototype._showElement = function (e) {
                    var n = this, i = s.supportsTransitionEnd() && t(this._element).hasClass(d.FADE);
                    this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && s.reflow(this._element), t(this._element).addClass(d.SHOW), this._config.focus && this._enforceFocus();
                    var o = t.Event(c.SHOWN, {relatedTarget: e}), r = function () {
                        n._config.focus && n._element.focus(), n._isTransitioning = !1, t(n._element).trigger(o)
                    };
                    i ? t(this._dialog).one(s.TRANSITION_END, r).emulateTransitionEnd(300) : r()
                }, a.prototype._enforceFocus = function () {
                    var e = this;
                    t(document).off(c.FOCUSIN).on(c.FOCUSIN, function (n) {
                        document === n.target || e._element === n.target || t(e._element).has(n.target).length || e._element.focus()
                    })
                }, a.prototype._setEscapeEvent = function () {
                    var e = this;
                    this._isShown && this._config.keyboard ? t(this._element).on(c.KEYDOWN_DISMISS, function (t) {
                        27 === t.which && e.hide()
                    }) : this._isShown || t(this._element).off(c.KEYDOWN_DISMISS)
                }, a.prototype._setResizeEvent = function () {
                    var e = this;
                    this._isShown ? t(window).on(c.RESIZE, function (t) {
                        return e._handleUpdate(t)
                    }) : t(window).off(c.RESIZE)
                }, a.prototype._hideModal = function () {
                    var e = this;
                    this._element.style.display = "none", this._element.setAttribute("aria-hidden", "true"), this._isTransitioning = !1, this._showBackdrop(function () {
                        t(document.body).removeClass(d.OPEN), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(c.HIDDEN)
                    })
                }, a.prototype._removeBackdrop = function () {
                    this._backdrop && (t(this._backdrop).remove(), this._backdrop = null)
                }, a.prototype._showBackdrop = function (e) {
                    var n = this, i = t(this._element).hasClass(d.FADE) ? d.FADE : "";
                    if (this._isShown && this._config.backdrop) {
                        var o = s.supportsTransitionEnd() && i;
                        if (this._backdrop = document.createElement("div"), this._backdrop.className = d.BACKDROP, i && t(this._backdrop).addClass(i), t(this._backdrop).appendTo(document.body), t(this._element).on(c.CLICK_DISMISS, function (t) {
                                if (n._ignoreBackdropClick)return void(n._ignoreBackdropClick = !1);
                                t.target === t.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
                            }), o && s.reflow(this._backdrop), t(this._backdrop).addClass(d.SHOW), !e)return;
                        if (!o)return void e();
                        t(this._backdrop).one(s.TRANSITION_END, e).emulateTransitionEnd(150)
                    } else if (!this._isShown && this._backdrop) {
                        t(this._backdrop).removeClass(d.SHOW);
                        var r = function () {
                            n._removeBackdrop(), e && e()
                        };
                        s.supportsTransitionEnd() && t(this._element).hasClass(d.FADE) ? t(this._backdrop).one(s.TRANSITION_END, r).emulateTransitionEnd(150) : r()
                    } else e && e()
                }, a.prototype._handleUpdate = function () {
                    this._adjustDialog()
                }, a.prototype._adjustDialog = function () {
                    var t = this._element.scrollHeight > document.documentElement.clientHeight;
                    !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                }, a.prototype._resetAdjustments = function () {
                    this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
                }, a.prototype._checkScrollbar = function () {
                    this._isBodyOverflowing = document.body.clientWidth < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                }, a.prototype._setScrollbar = function () {
                    var e = parseInt(t(u.FIXED_CONTENT).css("padding-right") || 0, 10);
                    this._originalBodyPadding = document.body.style.paddingRight || "", this._isBodyOverflowing && (document.body.style.paddingRight = e + this._scrollbarWidth + "px")
                }, a.prototype._resetScrollbar = function () {
                    document.body.style.paddingRight = this._originalBodyPadding
                }, a.prototype._getScrollbarWidth = function () {
                    var t = document.createElement("div");
                    t.className = d.SCROLLBAR_MEASURER, document.body.appendChild(t);
                    var e = t.offsetWidth - t.clientWidth;
                    return document.body.removeChild(t), e
                }, a._jQueryInterface = function (e, n) {
                    return this.each(function () {
                        var o = t(this).data("bs.modal"),
                            s = t.extend({}, a.Default, t(this).data(), "object" === (void 0 === e ? "undefined" : i(e)) && e);
                        if (o || (o = new a(this, s), t(this).data("bs.modal", o)), "string" == typeof e) {
                            if (void 0 === o[e])throw new Error('No method named "' + e + '"');
                            o[e](n)
                        } else s.show && o.show(n)
                    })
                }, o(a, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-alpha.6"
                    }
                }, {
                    key: "Default", get: function () {
                        return l
                    }
                }]), a
            }();
        t(document).on(c.CLICK_DATA_API, u.DATA_TOGGLE, function (e) {
            var n = this, i = void 0, o = s.getSelectorFromElement(this);
            o && (i = t(o)[0]);
            var r = t(i).data("bs.modal") ? "toggle" : t.extend({}, t(i).data(), t(this).data());
            "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
            var a = t(i).one(c.SHOW, function (e) {
                e.isDefaultPrevented() || a.one(c.HIDDEN, function () {
                    t(n).is(":visible") && n.focus()
                })
            });
            p._jQueryInterface.call(t(i), r, this)
        }), t.fn[e] = p._jQueryInterface, t.fn[e].Constructor = p, t.fn[e].noConflict = function () {
            return t.fn[e] = a, p._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = "scrollspy", r = t.fn[e], a = {offset: 10, method: "auto", target: ""},
            l = {offset: "number", method: "string", target: "(string|element)"}, h = {
                ACTIVATE: "activate.bs.scrollspy",
                SCROLL: "scroll.bs.scrollspy",
                LOAD_DATA_API: "load.bs.scrollspy.data-api"
            }, c = {
                DROPDOWN_ITEM: "dropdown-item",
                DROPDOWN_MENU: "dropdown-menu",
                NAV_LINK: "nav-link",
                NAV: "nav",
                ACTIVE: "active"
            }, d = {
                DATA_SPY: '[data-spy="scroll"]',
                ACTIVE: ".active",
                LIST_ITEM: ".list-item",
                LI: "li",
                LI_DROPDOWN: "li.dropdown",
                NAV_LINKS: ".nav-link",
                DROPDOWN: ".dropdown",
                DROPDOWN_ITEMS: ".dropdown-item",
                DROPDOWN_TOGGLE: ".dropdown-toggle"
            }, u = {OFFSET: "offset", POSITION: "position"}, p = function () {
                function r(e, i) {
                    var o = this;
                    n(this, r), this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(i), this._selector = this._config.target + " " + d.NAV_LINKS + "," + this._config.target + " " + d.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(h.SCROLL, function (t) {
                        return o._process(t)
                    }), this.refresh(), this._process()
                }

                return r.prototype.refresh = function () {
                    var e = this, n = this._scrollElement !== this._scrollElement.window ? u.POSITION : u.OFFSET,
                        i = "auto" === this._config.method ? n : this._config.method,
                        o = i === u.POSITION ? this._getScrollTop() : 0;
                    this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), t.makeArray(t(this._selector)).map(function (e) {
                        var n = void 0, r = s.getSelectorFromElement(e);
                        return r && (n = t(r)[0]), n && (n.offsetWidth || n.offsetHeight) ? [t(n)[i]().top + o, r] : null
                    }).filter(function (t) {
                        return t
                    }).sort(function (t, e) {
                        return t[0] - e[0]
                    }).forEach(function (t) {
                        e._offsets.push(t[0]), e._targets.push(t[1])
                    })
                }, r.prototype.dispose = function () {
                    t.removeData(this._element, "bs.scrollspy"), t(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                }, r.prototype._getConfig = function (n) {
                    if (n = t.extend({}, a, n), "string" != typeof n.target) {
                        var i = t(n.target).attr("id");
                        i || (i = s.getUID(e), t(n.target).attr("id", i)), n.target = "#" + i
                    }
                    return s.typeCheckConfig(e, n, l), n
                }, r.prototype._getScrollTop = function () {
                    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                }, r.prototype._getScrollHeight = function () {
                    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                }, r.prototype._getOffsetHeight = function () {
                    return this._scrollElement === window ? window.innerHeight : this._scrollElement.offsetHeight
                }, r.prototype._process = function () {
                    var t = this._getScrollTop() + this._config.offset, e = this._getScrollHeight(),
                        n = this._config.offset + e - this._getOffsetHeight();
                    if (this._scrollHeight !== e && this.refresh(), t >= n) {
                        var i = this._targets[this._targets.length - 1];
                        return void(this._activeTarget !== i && this._activate(i))
                    }
                    if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0)return this._activeTarget = null, void this._clear();
                    for (var o = this._offsets.length; o--;) {
                        this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
                    }
                }, r.prototype._activate = function (e) {
                    this._activeTarget = e, this._clear();
                    var n = this._selector.split(",");
                    n = n.map(function (t) {
                        return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                    });
                    var i = t(n.join(","));
                    i.hasClass(c.DROPDOWN_ITEM) ? (i.closest(d.DROPDOWN).find(d.DROPDOWN_TOGGLE).addClass(c.ACTIVE), i.addClass(c.ACTIVE)) : i.parents(d.LI).find("> " + d.NAV_LINKS).addClass(c.ACTIVE), t(this._scrollElement).trigger(h.ACTIVATE, {relatedTarget: e})
                }, r.prototype._clear = function () {
                    t(this._selector).filter(d.ACTIVE).removeClass(c.ACTIVE)
                }, r._jQueryInterface = function (e) {
                    return this.each(function () {
                        var n = t(this).data("bs.scrollspy"), o = "object" === (void 0 === e ? "undefined" : i(e)) && e;
                        if (n || (n = new r(this, o), t(this).data("bs.scrollspy", n)), "string" == typeof e) {
                            if (void 0 === n[e])throw new Error('No method named "' + e + '"');
                            n[e]()
                        }
                    })
                }, o(r, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-alpha.6"
                    }
                }, {
                    key: "Default", get: function () {
                        return a
                    }
                }]), r
            }();
        t(window).on(h.LOAD_DATA_API, function () {
            for (var e = t.makeArray(t(d.DATA_SPY)), n = e.length; n--;) {
                var i = t(e[n]);
                p._jQueryInterface.call(i, i.data())
            }
        }), t.fn[e] = p._jQueryInterface, t.fn[e].Constructor = p, t.fn[e].noConflict = function () {
            return t.fn[e] = r, p._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = t.fn.tab, i = {
                HIDE: "hide.bs.tab",
                HIDDEN: "hidden.bs.tab",
                SHOW: "show.bs.tab",
                SHOWN: "shown.bs.tab",
                CLICK_DATA_API: "click.bs.tab.data-api"
            }, r = {DROPDOWN_MENU: "dropdown-menu", ACTIVE: "active", DISABLED: "disabled", FADE: "fade", SHOW: "show"},
            a = {
                A: "a",
                LI: "li",
                DROPDOWN: ".dropdown",
                LIST: "ul:not(.dropdown-menu), ol:not(.dropdown-menu), nav:not(.dropdown-menu)",
                FADE_CHILD: "> .nav-item .fade, > .fade",
                ACTIVE: ".active",
                ACTIVE_CHILD: "> .nav-item > .active, > .active",
                DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
                DROPDOWN_TOGGLE: ".dropdown-toggle",
                DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
            }, l = function () {
                function e(t) {
                    n(this, e), this._element = t
                }

                return e.prototype.show = function () {
                    var e = this;
                    if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(r.ACTIVE) || t(this._element).hasClass(r.DISABLED))) {
                        var n = void 0, o = void 0, l = t(this._element).closest(a.LIST)[0],
                            h = s.getSelectorFromElement(this._element);
                        l && (o = t.makeArray(t(l).find(a.ACTIVE)), o = o[o.length - 1]);
                        var c = t.Event(i.HIDE, {relatedTarget: this._element}), d = t.Event(i.SHOW, {relatedTarget: o});
                        if (o && t(o).trigger(c), t(this._element).trigger(d), !d.isDefaultPrevented() && !c.isDefaultPrevented()) {
                            h && (n = t(h)[0]), this._activate(this._element, l);
                            var u = function () {
                                var n = t.Event(i.HIDDEN, {relatedTarget: e._element}),
                                    s = t.Event(i.SHOWN, {relatedTarget: o});
                                t(o).trigger(n), t(e._element).trigger(s)
                            };
                            n ? this._activate(n, n.parentNode, u) : u()
                        }
                    }
                }, e.prototype.dispose = function () {
                    t.removeClass(this._element, "bs.tab"), this._element = null
                }, e.prototype._activate = function (e, n, i) {
                    var o = this, l = t(n).find(a.ACTIVE_CHILD)[0],
                        h = i && s.supportsTransitionEnd() && (l && t(l).hasClass(r.FADE) || Boolean(t(n).find(a.FADE_CHILD)[0])),
                        c = function () {
                            return o._transitionComplete(e, l, h, i)
                        };
                    l && h ? t(l).one(s.TRANSITION_END, c).emulateTransitionEnd(150) : c(), l && t(l).removeClass(r.SHOW)
                }, e.prototype._transitionComplete = function (e, n, i, o) {
                    if (n) {
                        t(n).removeClass(r.ACTIVE);
                        var l = t(n.parentNode).find(a.DROPDOWN_ACTIVE_CHILD)[0];
                        l && t(l).removeClass(r.ACTIVE), n.setAttribute("aria-expanded", !1)
                    }
                    if (t(e).addClass(r.ACTIVE), e.setAttribute("aria-expanded", !0), i ? (s.reflow(e), t(e).addClass(r.SHOW)) : t(e).removeClass(r.FADE), e.parentNode && t(e.parentNode).hasClass(r.DROPDOWN_MENU)) {
                        var h = t(e).closest(a.DROPDOWN)[0];
                        h && t(h).find(a.DROPDOWN_TOGGLE).addClass(r.ACTIVE), e.setAttribute("aria-expanded", !0)
                    }
                    o && o()
                }, e._jQueryInterface = function (n) {
                    return this.each(function () {
                        var i = t(this), o = i.data("bs.tab");
                        if (o || (o = new e(this), i.data("bs.tab", o)), "string" == typeof n) {
                            if (void 0 === o[n])throw new Error('No method named "' + n + '"');
                            o[n]()
                        }
                    })
                }, o(e, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-alpha.6"
                    }
                }]), e
            }();
        t(document).on(i.CLICK_DATA_API, a.DATA_TOGGLE, function (e) {
            e.preventDefault(), l._jQueryInterface.call(t(this), "show")
        }), t.fn.tab = l._jQueryInterface, t.fn.tab.Constructor = l, t.fn.tab.noConflict = function () {
            return t.fn.tab = e, l._jQueryInterface
        }
    }(jQuery), function (t) {
        if ("undefined" == typeof Tether)throw new Error("Bootstrap tooltips require Tether (http://tether.io/)");
        var e = "tooltip", r = ".bs.tooltip", a = t.fn[e], l = {
                animation: !0,
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
                trigger: "hover focus",
                title: "",
                delay: 0,
                html: !1,
                selector: !1,
                placement: "top",
                offset: "0 0",
                constraints: [],
                container: !1
            }, h = {
                animation: "boolean",
                template: "string",
                title: "(string|element|function)",
                trigger: "string",
                delay: "(number|object)",
                html: "boolean",
                selector: "(string|boolean)",
                placement: "(string|function)",
                offset: "string",
                constraints: "array",
                container: "(string|element|boolean)"
            }, c = {TOP: "bottom center", RIGHT: "middle left", BOTTOM: "top center", LEFT: "middle right"},
            d = {SHOW: "show", OUT: "out"}, u = {
                HIDE: "hide" + r,
                HIDDEN: "hidden" + r,
                SHOW: "show" + r,
                SHOWN: "shown" + r,
                INSERTED: "inserted" + r,
                CLICK: "click" + r,
                FOCUSIN: "focusin" + r,
                FOCUSOUT: "focusout" + r,
                MOUSEENTER: "mouseenter" + r,
                MOUSELEAVE: "mouseleave" + r
            }, p = {FADE: "fade", SHOW: "show"}, f = {TOOLTIP: ".tooltip", TOOLTIP_INNER: ".tooltip-inner"},
            m = {element: !1, enabled: !1}, g = {HOVER: "hover", FOCUS: "focus", CLICK: "click", MANUAL: "manual"},
            v = function () {
                function a(t, e) {
                    n(this, a), this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._isTransitioning = !1, this._tether = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
                }

                return a.prototype.enable = function () {
                    this._isEnabled = !0
                }, a.prototype.disable = function () {
                    this._isEnabled = !1
                }, a.prototype.toggleEnabled = function () {
                    this._isEnabled = !this._isEnabled
                }, a.prototype.toggle = function (e) {
                    if (e) {
                        var n = this.constructor.DATA_KEY, i = t(e.currentTarget).data(n);
                        i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                    } else {
                        if (t(this.getTipElement()).hasClass(p.SHOW))return void this._leave(null, this);
                        this._enter(null, this)
                    }
                }, a.prototype.dispose = function () {
                    clearTimeout(this._timeout), this.cleanupTether(), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._tether = null, this.element = null, this.config = null, this.tip = null
                }, a.prototype.show = function () {
                    var e = this;
                    if ("none" === t(this.element).css("display"))throw new Error("Please use show on visible elements");
                    var n = t.Event(this.constructor.Event.SHOW);
                    if (this.isWithContent() && this._isEnabled) {
                        if (this._isTransitioning)throw new Error("Tooltip is transitioning");
                        t(this.element).trigger(n);
                        var i = t.contains(this.element.ownerDocument.documentElement, this.element);
                        if (n.isDefaultPrevented() || !i)return;
                        var o = this.getTipElement(), r = s.getUID(this.constructor.NAME);
                        o.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && t(o).addClass(p.FADE);
                        var l = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
                            h = this._getAttachment(l),
                            c = !1 === this.config.container ? document.body : t(this.config.container);
                        t(o).data(this.constructor.DATA_KEY, this).appendTo(c), t(this.element).trigger(this.constructor.Event.INSERTED), this._tether = new Tether({
                            attachment: h,
                            element: o,
                            target: this.element,
                            classes: m,
                            classPrefix: "bs-tether",
                            offset: this.config.offset,
                            constraints: this.config.constraints,
                            addTargetClasses: !1
                        }), s.reflow(o), this._tether.position(), t(o).addClass(p.SHOW);
                        var u = function () {
                            var n = e._hoverState;
                            e._hoverState = null, e._isTransitioning = !1, t(e.element).trigger(e.constructor.Event.SHOWN), n === d.OUT && e._leave(null, e)
                        };
                        if (s.supportsTransitionEnd() && t(this.tip).hasClass(p.FADE))return this._isTransitioning = !0, void t(this.tip).one(s.TRANSITION_END, u).emulateTransitionEnd(a._TRANSITION_DURATION);
                        u()
                    }
                }, a.prototype.hide = function (e) {
                    var n = this, i = this.getTipElement(), o = t.Event(this.constructor.Event.HIDE);
                    if (this._isTransitioning)throw new Error("Tooltip is transitioning");
                    var r = function () {
                        n._hoverState !== d.SHOW && i.parentNode && i.parentNode.removeChild(i), n.element.removeAttribute("aria-describedby"), t(n.element).trigger(n.constructor.Event.HIDDEN), n._isTransitioning = !1, n.cleanupTether(), e && e()
                    };
                    t(this.element).trigger(o), o.isDefaultPrevented() || (t(i).removeClass(p.SHOW), this._activeTrigger[g.CLICK] = !1, this._activeTrigger[g.FOCUS] = !1, this._activeTrigger[g.HOVER] = !1, s.supportsTransitionEnd() && t(this.tip).hasClass(p.FADE) ? (this._isTransitioning = !0, t(i).one(s.TRANSITION_END, r).emulateTransitionEnd(150)) : r(), this._hoverState = "")
                }, a.prototype.isWithContent = function () {
                    return Boolean(this.getTitle())
                }, a.prototype.getTipElement = function () {
                    return this.tip = this.tip || t(this.config.template)[0]
                }, a.prototype.setContent = function () {
                    var e = t(this.getTipElement());
                    this.setElementContent(e.find(f.TOOLTIP_INNER), this.getTitle()), e.removeClass(p.FADE + " " + p.SHOW), this.cleanupTether()
                }, a.prototype.setElementContent = function (e, n) {
                    var o = this.config.html;
                    "object" === (void 0 === n ? "undefined" : i(n)) && (n.nodeType || n.jquery) ? o ? t(n).parent().is(e) || e.empty().append(n) : e.text(t(n).text()) : e[o ? "html" : "text"](n)
                }, a.prototype.getTitle = function () {
                    var t = this.element.getAttribute("data-original-title");
                    return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
                }, a.prototype.cleanupTether = function () {
                    this._tether && this._tether.destroy()
                }, a.prototype._getAttachment = function (t) {
                    return c[t.toUpperCase()]
                }, a.prototype._setListeners = function () {
                    var e = this;
                    this.config.trigger.split(" ").forEach(function (n) {
                        if ("click" === n) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (t) {
                            return e.toggle(t)
                        }); else if (n !== g.MANUAL) {
                            var i = n === g.HOVER ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                                o = n === g.HOVER ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                            t(e.element).on(i, e.config.selector, function (t) {
                                return e._enter(t)
                            }).on(o, e.config.selector, function (t) {
                                return e._leave(t)
                            })
                        }
                        t(e.element).closest(".modal").on("hide.bs.modal", function () {
                            return e.hide()
                        })
                    }), this.config.selector ? this.config = t.extend({}, this.config, {
                        trigger: "manual",
                        selector: ""
                    }) : this._fixTitle()
                }, a.prototype._fixTitle = function () {
                    var t = i(this.element.getAttribute("data-original-title"));
                    (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                }, a.prototype._enter = function (e, n) {
                    var i = this.constructor.DATA_KEY;
                    return n = n || t(e.currentTarget).data(i), n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusin" === e.type ? g.FOCUS : g.HOVER] = !0), t(n.getTipElement()).hasClass(p.SHOW) || n._hoverState === d.SHOW ? void(n._hoverState = d.SHOW) : (clearTimeout(n._timeout), n._hoverState = d.SHOW, n.config.delay && n.config.delay.show ? void(n._timeout = setTimeout(function () {
                        n._hoverState === d.SHOW && n.show()
                    }, n.config.delay.show)) : void n.show())
                }, a.prototype._leave = function (e, n) {
                    var i = this.constructor.DATA_KEY;
                    if (n = n || t(e.currentTarget).data(i), n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusout" === e.type ? g.FOCUS : g.HOVER] = !1), !n._isWithActiveTrigger()) {
                        if (clearTimeout(n._timeout), n._hoverState = d.OUT, !n.config.delay || !n.config.delay.hide)return void n.hide();
                        n._timeout = setTimeout(function () {
                            n._hoverState === d.OUT && n.hide()
                        }, n.config.delay.hide)
                    }
                }, a.prototype._isWithActiveTrigger = function () {
                    for (var t in this._activeTrigger)if (this._activeTrigger[t])return !0;
                    return !1
                }, a.prototype._getConfig = function (n) {
                    return n = t.extend({}, this.constructor.Default, t(this.element).data(), n), n.delay && "number" == typeof n.delay && (n.delay = {
                        show: n.delay,
                        hide: n.delay
                    }), s.typeCheckConfig(e, n, this.constructor.DefaultType), n
                }, a.prototype._getDelegateConfig = function () {
                    var t = {};
                    if (this.config)for (var e in this.config)this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                    return t
                }, a._jQueryInterface = function (e) {
                    return this.each(function () {
                        var n = t(this).data("bs.tooltip"), o = "object" === (void 0 === e ? "undefined" : i(e)) && e;
                        if ((n || !/dispose|hide/.test(e)) && (n || (n = new a(this, o), t(this).data("bs.tooltip", n)), "string" == typeof e)) {
                            if (void 0 === n[e])throw new Error('No method named "' + e + '"');
                            n[e]()
                        }
                    })
                }, o(a, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-alpha.6"
                    }
                }, {
                    key: "Default", get: function () {
                        return l
                    }
                }, {
                    key: "NAME", get: function () {
                        return e
                    }
                }, {
                    key: "DATA_KEY", get: function () {
                        return "bs.tooltip"
                    }
                }, {
                    key: "Event", get: function () {
                        return u
                    }
                }, {
                    key: "EVENT_KEY", get: function () {
                        return r
                    }
                }, {
                    key: "DefaultType", get: function () {
                        return h
                    }
                }]), a
            }();
        return t.fn[e] = v._jQueryInterface, t.fn[e].Constructor = v, t.fn[e].noConflict = function () {
            return t.fn[e] = a, v._jQueryInterface
        }, v
    }(jQuery));
    !function (s) {
        var a = "popover", l = ".bs.popover", h = s.fn[a], c = s.extend({}, r.Default, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover" role="tooltip"><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
            }), d = s.extend({}, r.DefaultType, {content: "(string|element|function)"}), u = {FADE: "fade", SHOW: "show"},
            p = {TITLE: ".popover-title", CONTENT: ".popover-content"}, f = {
                HIDE: "hide" + l,
                HIDDEN: "hidden" + l,
                SHOW: "show" + l,
                SHOWN: "shown" + l,
                INSERTED: "inserted" + l,
                CLICK: "click" + l,
                FOCUSIN: "focusin" + l,
                FOCUSOUT: "focusout" + l,
                MOUSEENTER: "mouseenter" + l,
                MOUSELEAVE: "mouseleave" + l
            }, m = function (r) {
                function h() {
                    return n(this, h), t(this, r.apply(this, arguments))
                }

                return e(h, r), h.prototype.isWithContent = function () {
                    return this.getTitle() || this._getContent()
                }, h.prototype.getTipElement = function () {
                    return this.tip = this.tip || s(this.config.template)[0]
                }, h.prototype.setContent = function () {
                    var t = s(this.getTipElement());
                    this.setElementContent(t.find(p.TITLE), this.getTitle()), this.setElementContent(t.find(p.CONTENT), this._getContent()), t.removeClass(u.FADE + " " + u.SHOW), this.cleanupTether()
                }, h.prototype._getContent = function () {
                    return this.element.getAttribute("data-content") || ("function" == typeof this.config.content ? this.config.content.call(this.element) : this.config.content)
                }, h._jQueryInterface = function (t) {
                    return this.each(function () {
                        var e = s(this).data("bs.popover"), n = "object" === (void 0 === t ? "undefined" : i(t)) ? t : null;
                        if ((e || !/destroy|hide/.test(t)) && (e || (e = new h(this, n), s(this).data("bs.popover", e)), "string" == typeof t)) {
                            if (void 0 === e[t])throw new Error('No method named "' + t + '"');
                            e[t]()
                        }
                    })
                }, o(h, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-alpha.6"
                    }
                }, {
                    key: "Default", get: function () {
                        return c
                    }
                }, {
                    key: "NAME", get: function () {
                        return a
                    }
                }, {
                    key: "DATA_KEY", get: function () {
                        return "bs.popover"
                    }
                }, {
                    key: "Event", get: function () {
                        return f
                    }
                }, {
                    key: "EVENT_KEY", get: function () {
                        return l
                    }
                }, {
                    key: "DefaultType", get: function () {
                        return d
                    }
                }]), h
            }(r);
        s.fn[a] = m._jQueryInterface, s.fn[a].Constructor = m, s.fn[a].noConflict = function () {
            return s.fn[a] = h, m._jQueryInterface
        }
    }(jQuery)
}(), function (t, e) {
    "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(["jquery", "googlemaps!"], e) : t.GMaps = e()
}(this, function () {
    var t = function (t, e) {
        var n;
        if (t === e)return t;
        for (n in e)void 0 !== e[n] && (t[n] = e[n]);
        return t
    }, n = function (t, e) {
        var n, i = Array.prototype.slice.call(arguments, 2), o = [], s = t.length;
        if (Array.prototype.map && t.map === Array.prototype.map) o = Array.prototype.map.call(t, function (t) {
            var n = i.slice(0);
            return n.splice(0, 0, t), e.apply(this, n)
        }); else for (n = 0; n < s; n++)callback_params = i, callback_params.splice(0, 0, t[n]), o.push(e.apply(this, callback_params));
        return o
    }, i = function (t) {
        var e, n = [];
        for (e = 0; e < t.length; e++)n = n.concat(t[e]);
        return n
    }, o = function (t, e) {
        var n = t[0], i = t[1];
        return e && (n = t[1], i = t[0]), new google.maps.LatLng(n, i)
    }, s = function (t, e) {
        var n;
        for (n = 0; n < t.length; n++)t[n] instanceof google.maps.LatLng || (t[n].length > 0 && "object" == typeof t[n][0] ? t[n] = s(t[n], e) : t[n] = o(t[n], e));
        return t
    }, r = function (t, e) {
        var n = t.replace(".", "");
        return "jQuery" in this && e ? $("." + n, e)[0] : document.getElementsByClassName(n)[0]
    }, a = function (t, e) {
        var t = t.replace("#", "");
        return "jQuery" in window && e ? $("#" + t, e)[0] : document.getElementById(t)
    }, l = function (t) {
        var e = 0, n = 0;
        if (t.offsetParent)do {
            e += t.offsetLeft, n += t.offsetTop
        } while (t = t.offsetParent);
        return [e, n]
    }, h = function (e) {
        "use strict";
        var n = document, i = function (e) {
            if ("object" != typeof window.google || !window.google.maps)return "object" == typeof window.console && window.console.error && console.error("Google Maps API is required. Please register the following JavaScript library https://maps.googleapis.com/maps/api/js."), function () {
            };
            if (!this)return new i(e);
            e.zoom = e.zoom || 15, e.mapType = e.mapType || "roadmap";
            var o, s = function (t, e) {
                    return void 0 === t ? e : t
                }, h = this,
                c = ["bounds_changed", "center_changed", "click", "dblclick", "drag", "dragend", "dragstart", "idle", "maptypeid_changed", "projection_changed", "resize", "tilesloaded", "zoom_changed"],
                d = ["mousemove", "mouseout", "mouseover"],
                u = ["el", "lat", "lng", "mapType", "width", "height", "markerClusterer", "enableNewStyle"],
                p = e.el || e.div, f = e.markerClusterer, m = google.maps.MapTypeId[e.mapType.toUpperCase()],
                g = new google.maps.LatLng(e.lat, e.lng), v = s(e.zoomControl, !0),
                y = e.zoomControlOpt || {style: "DEFAULT", position: "TOP_LEFT"}, w = y.style || "DEFAULT",
                _ = y.position || "TOP_LEFT", b = s(e.panControl, !0), T = s(e.mapTypeControl, !0),
                E = s(e.scaleControl, !0), C = s(e.streetViewControl, !0), z = s(z, !0), S = {},
                I = {zoom: this.zoom, center: g, mapTypeId: m}, O = {
                    panControl: b,
                    zoomControl: v,
                    zoomControlOptions: {style: google.maps.ZoomControlStyle[w], position: google.maps.ControlPosition[_]},
                    mapTypeControl: T,
                    scaleControl: E,
                    streetViewControl: C,
                    overviewMapControl: z
                };
            if ("string" == typeof e.el || "string" == typeof e.div ? p.indexOf("#") > -1 ? this.el = a(p, e.context) : this.el = r.apply(this, [p, e.context]) : this.el = p, void 0 === this.el || null === this.el)throw"No element defined.";
            for (window.context_menu = window.context_menu || {}, window.context_menu[h.el.id] = {}, this.controls = [], this.overlays = [], this.layers = [], this.singleLayers = {}, this.markers = [], this.polylines = [], this.routes = [], this.polygons = [], this.infoWindow = null, this.overlay_el = null, this.zoom = e.zoom, this.registered_events = {}, this.el.style.width = e.width || this.el.scrollWidth || this.el.offsetWidth, this.el.style.height = e.height || this.el.scrollHeight || this.el.offsetHeight, google.maps.visualRefresh = e.enableNewStyle, o = 0; o < u.length; o++)delete e[u[o]];
            for (1 != e.disableDefaultUI && (I = t(I, O)), S = t(I, e), o = 0; o < c.length; o++)delete S[c[o]];
            for (o = 0; o < d.length; o++)delete S[d[o]];
            this.map = new google.maps.Map(this.el, S), f && (this.markerClusterer = f.apply(this, [this.map]));
            var L = function (t, e) {
                var n = "", i = window.context_menu[h.el.id][t];
                for (var o in i)if (i.hasOwnProperty(o)) {
                    var s = i[o];
                    n += '<li><a id="' + t + "_" + o + '" href="#">' + s.title + "</a></li>"
                }
                if (a("gmaps_context_menu")) {
                    var r = a("gmaps_context_menu");
                    r.innerHTML = n;
                    var o, c = r.getElementsByTagName("a"), d = c.length;
                    for (o = 0; o < d; o++) {
                        var u = c[o], p = function (n) {
                            n.preventDefault(), i[this.id.replace(t + "_", "")].action.apply(h, [e]), h.hideContextMenu()
                        };
                        google.maps.event.clearListeners(u, "click"), google.maps.event.addDomListenerOnce(u, "click", p, !1)
                    }
                    var f = l.apply(this, [h.el]), m = f[0] + e.pixel.x - 15, g = f[1] + e.pixel.y - 15;
                    r.style.left = m + "px", r.style.top = g + "px"
                }
            };
            this.buildContextMenu = function (t, e) {
                if ("marker" === t) {
                    e.pixel = {};
                    var n = new google.maps.OverlayView;
                    n.setMap(h.map), n.draw = function () {
                        var i = n.getProjection(), o = e.marker.getPosition();
                        e.pixel = i.fromLatLngToContainerPixel(o), L(t, e)
                    }
                } else L(t, e);
                var i = a("gmaps_context_menu");
                setTimeout(function () {
                    i.style.display = "block"
                }, 0)
            }, this.setContextMenu = function (t) {
                window.context_menu[h.el.id][t.control] = {};
                var e, i = n.createElement("ul");
                for (e in t.options)if (t.options.hasOwnProperty(e)) {
                    var o = t.options[e];
                    window.context_menu[h.el.id][t.control][o.name] = {title: o.title, action: o.action}
                }
                i.id = "gmaps_context_menu", i.style.display = "none", i.style.position = "absolute", i.style.minWidth = "100px", i.style.background = "white", i.style.listStyle = "none", i.style.padding = "8px", i.style.boxShadow = "2px 2px 6px #ccc", a("gmaps_context_menu") || n.body.appendChild(i);
                var s = a("gmaps_context_menu");
                google.maps.event.addDomListener(s, "mouseout", function (t) {
                    t.relatedTarget && this.contains(t.relatedTarget) || window.setTimeout(function () {
                        s.style.display = "none"
                    }, 400)
                }, !1)
            }, this.hideContextMenu = function () {
                var t = a("gmaps_context_menu");
                t && (t.style.display = "none")
            };
            var x = function (t, n) {
                google.maps.event.addListener(t, n, function (t) {
                    void 0 == t && (t = this), e[n].apply(this, [t]), h.hideContextMenu()
                })
            };
            google.maps.event.addListener(this.map, "zoom_changed", this.hideContextMenu);
            for (var k = 0; k < c.length; k++) {
                var A = c[k];
                A in e && x(this.map, A)
            }
            for (var k = 0; k < d.length; k++) {
                var A = d[k];
                A in e && x(this.map, A)
            }
            google.maps.event.addListener(this.map, "rightclick", function (t) {
                e.rightclick && e.rightclick.apply(this, [t]), void 0 != window.context_menu[h.el.id].map && h.buildContextMenu("map", t)
            }), this.refresh = function () {
                google.maps.event.trigger(this.map, "resize")
            }, this.fitZoom = function () {
                var t, e = [], n = this.markers.length;
                for (t = 0; t < n; t++)"boolean" == typeof this.markers[t].visible && this.markers[t].visible && e.push(this.markers[t].getPosition());
                this.fitLatLngBounds(e)
            }, this.fitLatLngBounds = function (t) {
                var e, n = t.length, i = new google.maps.LatLngBounds;
                for (e = 0; e < n; e++)i.extend(t[e]);
                this.map.fitBounds(i)
            }, this.setCenter = function (t, e, n) {
                this.map.panTo(new google.maps.LatLng(t, e)), n && n()
            }, this.getElement = function () {
                return this.el
            }, this.zoomIn = function (t) {
                t = t || 1, this.zoom = this.map.getZoom() + t, this.map.setZoom(this.zoom)
            }, this.zoomOut = function (t) {
                t = t || 1, this.zoom = this.map.getZoom() - t, this.map.setZoom(this.zoom)
            };
            var W, D = [];
            for (W in this.map)"function" != typeof this.map[W] || this[W] || D.push(W);
            for (o = 0; o < D.length; o++)!function (t, e, n) {
                t[n] = function () {
                    return e[n].apply(e, arguments)
                }
            }(this, this.map, D[o])
        };
        return i
    }();
    h.prototype.createControl = function (t) {
        var e = document.createElement("div");
        e.style.cursor = "pointer", !0 !== t.disableDefaultStyles && (e.style.fontFamily = "Roboto, Arial, sans-serif", e.style.fontSize = "11px", e.style.boxShadow = "rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px");
        for (var n in t.style)e.style[n] = t.style[n];
        t.id && (e.id = t.id), t.title && (e.title = t.title), t.classes && (e.className = t.classes), t.content && ("string" == typeof t.content ? e.innerHTML = t.content : t.content instanceof HTMLElement && e.appendChild(t.content)), t.position && (e.position = google.maps.ControlPosition[t.position.toUpperCase()]);
        for (var i in t.events)!function (e, n) {
            google.maps.event.addDomListener(e, n, function () {
                t.events[n].apply(this, [this])
            })
        }(e, i);
        return e.index = 1, e
    }, h.prototype.addControl = function (t) {
        var e = this.createControl(t);
        return this.controls.push(e), this.map.controls[e.position].push(e), e
    }, h.prototype.removeControl = function (t) {
        var e, n = null;
        for (e = 0; e < this.controls.length; e++)this.controls[e] == t && (n = this.controls[e].position, this.controls.splice(e, 1));
        if (n)for (e = 0; e < this.map.controls.length; e++) {
            var i = this.map.controls[t.position];
            if (i.getAt(e) == t) {
                i.removeAt(e);
                break
            }
        }
        return t
    }, h.prototype.createMarker = function (e) {
        if (void 0 == e.lat && void 0 == e.lng && void 0 == e.position)throw"No latitude or longitude defined.";
        var n = this, i = e.details, o = e.fences, s = e.outside,
            r = {position: new google.maps.LatLng(e.lat, e.lng), map: null}, a = t(r, e);
        delete a.lat, delete a.lng, delete a.fences, delete a.outside;
        var l = new google.maps.Marker(a);
        if (l.fences = o, e.infoWindow) {
            l.infoWindow = new google.maps.InfoWindow(e.infoWindow);
            for (var h = ["closeclick", "content_changed", "domready", "position_changed", "zindex_changed"], c = 0; c < h.length; c++)!function (t, n) {
                e.infoWindow[n] && google.maps.event.addListener(t, n, function (t) {
                    e.infoWindow[n].apply(this, [t])
                })
            }(l.infoWindow, h[c])
        }
        for (var d = ["animation_changed", "clickable_changed", "cursor_changed", "draggable_changed", "flat_changed", "icon_changed", "position_changed", "shadow_changed", "shape_changed", "title_changed", "visible_changed", "zindex_changed"], u = ["dblclick", "drag", "dragend", "dragstart", "mousedown", "mouseout", "mouseover", "mouseup"], c = 0; c < d.length; c++)!function (t, n) {
            e[n] && google.maps.event.addListener(t, n, function () {
                e[n].apply(this, [this])
            })
        }(l, d[c]);
        for (var c = 0; c < u.length; c++)!function (t, n, i) {
            e[i] && google.maps.event.addListener(n, i, function (n) {
                n.pixel || (n.pixel = t.getProjection().fromLatLngToPoint(n.latLng)), e[i].apply(this, [n])
            })
        }(this.map, l, u[c]);
        return google.maps.event.addListener(l, "click", function () {
            this.details = i, e.click && e.click.apply(this, [this]), l.infoWindow && (n.hideInfoWindows(), l.infoWindow.open(n.map, l))
        }), google.maps.event.addListener(l, "rightclick", function (t) {
            t.marker = this, e.rightclick && e.rightclick.apply(this, [t]), void 0 != window.context_menu[n.el.id].marker && n.buildContextMenu("marker", t)
        }), l.fences && google.maps.event.addListener(l, "dragend", function () {
            n.checkMarkerGeofence(l, function (t, e) {
                s(t, e)
            })
        }), l
    }, h.prototype.addMarker = function (t) {
        var e;
        if (t.hasOwnProperty("gm_accessors_")) e = t; else {
            if (!(t.hasOwnProperty("lat") && t.hasOwnProperty("lng") || t.position))throw"No latitude or longitude defined.";
            e = this.createMarker(t)
        }
        return e.setMap(this.map), this.markerClusterer && this.markerClusterer.addMarker(e), this.markers.push(e), h.fire("marker_added", e, this), e
    }, h.prototype.addMarkers = function (t) {
        for (var e, n = 0; e = t[n]; n++)this.addMarker(e);
        return this.markers
    }, h.prototype.hideInfoWindows = function () {
        for (var t, e = 0; t = this.markers[e]; e++)t.infoWindow && t.infoWindow.close()
    }, h.prototype.removeMarker = function (t) {
        for (var e = 0; e < this.markers.length; e++)if (this.markers[e] === t) {
            this.markers[e].setMap(null), this.markers.splice(e, 1), this.markerClusterer && this.markerClusterer.removeMarker(t), h.fire("marker_removed", t, this);
            break
        }
        return t
    }, h.prototype.removeMarkers = function (t) {
        var e = [];
        if (void 0 === t) {
            for (var n = 0; n < this.markers.length; n++) {
                var i = this.markers[n];
                i.setMap(null), this.markerClusterer && this.markerClusterer.removeMarker(i), h.fire("marker_removed", i, this)
            }
            this.markers = e
        } else {
            for (var n = 0; n < t.length; n++) {
                var o = this.markers.indexOf(t[n]);
                if (o > -1) {
                    var i = this.markers[o];
                    i.setMap(null), this.markerClusterer && this.markerClusterer.removeMarker(i), h.fire("marker_removed", i, this)
                }
            }
            for (var n = 0; n < this.markers.length; n++) {
                var i = this.markers[n];
                null != i.getMap() && e.push(i)
            }
            this.markers = e
        }
    }, h.prototype.drawOverlay = function (t) {
        var e = new google.maps.OverlayView, n = !0;
        return e.setMap(this.map), null != t.auto_show && (n = t.auto_show), e.onAdd = function () {
            var n = document.createElement("div");
            n.style.borderStyle = "none", n.style.borderWidth = "0px", n.style.position = "absolute", n.style.zIndex = 100, n.innerHTML = t.content, e.el = n, t.layer || (t.layer = "overlayLayer");
            var i = this.getPanes(), o = i[t.layer], s = ["contextmenu", "DOMMouseScroll", "dblclick", "mousedown"];
            o.appendChild(n);
            for (var r = 0; r < s.length; r++)!function (t, e) {
                google.maps.event.addDomListener(t, e, function (t) {
                    -1 != navigator.userAgent.toLowerCase().indexOf("msie") && document.all ? (t.cancelBubble = !0, t.returnValue = !1) : t.stopPropagation()
                })
            }(n, s[r]);
            t.click && (i.overlayMouseTarget.appendChild(e.el), google.maps.event.addDomListener(e.el, "click", function () {
                t.click.apply(e, [e])
            })), google.maps.event.trigger(this, "ready")
        }, e.draw = function () {
            var i = this.getProjection(), o = i.fromLatLngToDivPixel(new google.maps.LatLng(t.lat, t.lng));
            t.horizontalOffset = t.horizontalOffset || 0, t.verticalOffset = t.verticalOffset || 0;
            var s = e.el, r = s.children[0], a = r.clientHeight, l = r.clientWidth;
            switch (t.verticalAlign) {
                case"top":
                    s.style.top = o.y - a + t.verticalOffset + "px";
                    break;
                default:
                case"middle":
                    s.style.top = o.y - a / 2 + t.verticalOffset + "px";
                    break;
                case"bottom":
                    s.style.top = o.y + t.verticalOffset + "px"
            }
            switch (t.horizontalAlign) {
                case"left":
                    s.style.left = o.x - l + t.horizontalOffset + "px";
                    break;
                default:
                case"center":
                    s.style.left = o.x - l / 2 + t.horizontalOffset + "px";
                    break;
                case"right":
                    s.style.left = o.x + t.horizontalOffset + "px"
            }
            s.style.display = n ? "block" : "none", n || t.show.apply(this, [s])
        }, e.onRemove = function () {
            var n = e.el;
            t.remove ? t.remove.apply(this, [n]) : (e.el.parentNode.removeChild(e.el), e.el = null)
        }, this.overlays.push(e), e
    }, h.prototype.removeOverlay = function (t) {
        for (var e = 0; e < this.overlays.length; e++)if (this.overlays[e] === t) {
            this.overlays[e].setMap(null), this.overlays.splice(e, 1);
            break
        }
    }, h.prototype.removeOverlays = function () {
        for (var t, e = 0; t = this.overlays[e]; e++)t.setMap(null);
        this.overlays = []
    }, h.prototype.drawPolyline = function (t) {
        var e = [], n = t.path;
        if (n.length)if (void 0 === n[0][0]) e = n; else for (var i, o = 0; i = n[o]; o++)e.push(new google.maps.LatLng(i[0], i[1]));
        var s = {
            map: this.map,
            path: e,
            strokeColor: t.strokeColor,
            strokeOpacity: t.strokeOpacity,
            strokeWeight: t.strokeWeight,
            geodesic: t.geodesic,
            clickable: !0,
            editable: !1,
            visible: !0
        };
        t.hasOwnProperty("clickable") && (s.clickable = t.clickable), t.hasOwnProperty("editable") && (s.editable = t.editable), t.hasOwnProperty("icons") && (s.icons = t.icons), t.hasOwnProperty("zIndex") && (s.zIndex = t.zIndex);
        for (var r = new google.maps.Polyline(s), a = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], l = 0; l < a.length; l++)!function (e, n) {
            t[n] && google.maps.event.addListener(e, n, function (e) {
                t[n].apply(this, [e])
            })
        }(r, a[l]);
        return this.polylines.push(r), h.fire("polyline_added", r, this), r
    }, h.prototype.removePolyline = function (t) {
        for (var e = 0; e < this.polylines.length; e++)if (this.polylines[e] === t) {
            this.polylines[e].setMap(null), this.polylines.splice(e, 1), h.fire("polyline_removed", t, this);
            break
        }
    }, h.prototype.removePolylines = function () {
        for (var t, e = 0; t = this.polylines[e]; e++)t.setMap(null);
        this.polylines = []
    }, h.prototype.drawCircle = function (e) {
        e = t({map: this.map, center: new google.maps.LatLng(e.lat, e.lng)}, e), delete e.lat, delete e.lng;
        for (var n = new google.maps.Circle(e), i = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], o = 0; o < i.length; o++)!function (t, n) {
            e[n] && google.maps.event.addListener(t, n, function (t) {
                e[n].apply(this, [t])
            })
        }(n, i[o]);
        return this.polygons.push(n), n
    }, h.prototype.drawRectangle = function (e) {
        e = t({map: this.map}, e);
        var n = new google.maps.LatLngBounds(new google.maps.LatLng(e.bounds[0][0], e.bounds[0][1]), new google.maps.LatLng(e.bounds[1][0], e.bounds[1][1]));
        e.bounds = n;
        for (var i = new google.maps.Rectangle(e), o = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], s = 0; s < o.length; s++)!function (t, n) {
            e[n] && google.maps.event.addListener(t, n, function (t) {
                e[n].apply(this, [t])
            })
        }(i, o[s]);
        return this.polygons.push(i), i
    }, h.prototype.drawPolygon = function (e) {
        var o = !1;
        e.hasOwnProperty("useGeoJSON") && (o = e.useGeoJSON), delete e.useGeoJSON, e = t({map: this.map}, e), 0 == o && (e.paths = [e.paths.slice(0)]), e.paths.length > 0 && e.paths[0].length > 0 && (e.paths = i(n(e.paths, s, o)));
        for (var r = new google.maps.Polygon(e), a = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], l = 0; l < a.length; l++)!function (t, n) {
            e[n] && google.maps.event.addListener(t, n, function (t) {
                e[n].apply(this, [t])
            })
        }(r, a[l]);
        return this.polygons.push(r), h.fire("polygon_added", r, this), r
    }, h.prototype.removePolygon = function (t) {
        for (var e = 0; e < this.polygons.length; e++)if (this.polygons[e] === t) {
            this.polygons[e].setMap(null), this.polygons.splice(e, 1), h.fire("polygon_removed", t, this);
            break
        }
    }, h.prototype.removePolygons = function () {
        for (var t, e = 0; t = this.polygons[e]; e++)t.setMap(null);
        this.polygons = []
    }, h.prototype.getFromFusionTables = function (t) {
        var e = t.events;
        delete t.events;
        var n = t, i = new google.maps.FusionTablesLayer(n);
        for (var o in e)!function (t, n) {
            google.maps.event.addListener(t, n, function (t) {
                e[n].apply(this, [t])
            })
        }(i, o);
        return this.layers.push(i), i
    }, h.prototype.loadFromFusionTables = function (t) {
        var e = this.getFromFusionTables(t);
        return e.setMap(this.map), e
    }, h.prototype.getFromKML = function (t) {
        var e = t.url, n = t.events;
        delete t.url, delete t.events;
        var i = t, o = new google.maps.KmlLayer(e, i);
        for (var s in n)!function (t, e) {
            google.maps.event.addListener(t, e, function (t) {
                n[e].apply(this, [t])
            })
        }(o, s);
        return this.layers.push(o), o
    }, h.prototype.loadFromKML = function (t) {
        var e = this.getFromKML(t);
        return e.setMap(this.map), e
    }, h.prototype.addLayer = function (t, e) {
        e = e || {};
        var n;
        switch (t) {
            case"weather":
                this.singleLayers.weather = n = new google.maps.weather.WeatherLayer;
                break;
            case"clouds":
                this.singleLayers.clouds = n = new google.maps.weather.CloudLayer;
                break;
            case"traffic":
                this.singleLayers.traffic = n = new google.maps.TrafficLayer;
                break;
            case"transit":
                this.singleLayers.transit = n = new google.maps.TransitLayer;
                break;
            case"bicycling":
                this.singleLayers.bicycling = n = new google.maps.BicyclingLayer;
                break;
            case"panoramio":
                this.singleLayers.panoramio = n = new google.maps.panoramio.PanoramioLayer, n.setTag(e.filter), delete e.filter, e.click && google.maps.event.addListener(n, "click", function (t) {
                    e.click(t), delete e.click
                });
                break;
            case"places":
                if (this.singleLayers.places = n = new google.maps.places.PlacesService(this.map), e.search || e.nearbySearch || e.radarSearch) {
                    var i = {
                        bounds: e.bounds || null, keyword: e.keyword || null, location: e.location || null,
                        name: e.name || null, radius: e.radius || null, rankBy: e.rankBy || null, types: e.types || null
                    };
                    e.radarSearch && n.radarSearch(i, e.radarSearch), e.search && n.search(i, e.search), e.nearbySearch && n.nearbySearch(i, e.nearbySearch)
                }
                if (e.textSearch) {
                    var o = {
                        bounds: e.bounds || null,
                        location: e.location || null,
                        query: e.query || null,
                        radius: e.radius || null
                    };
                    n.textSearch(o, e.textSearch)
                }
        }
        if (void 0 !== n)return "function" == typeof n.setOptions && n.setOptions(e), "function" == typeof n.setMap && n.setMap(this.map), n
    }, h.prototype.removeLayer = function (t) {
        if ("string" == typeof t && void 0 !== this.singleLayers[t]) this.singleLayers[t].setMap(null), delete this.singleLayers[t]; else for (var e = 0; e < this.layers.length; e++)if (this.layers[e] === t) {
            this.layers[e].setMap(null), this.layers.splice(e, 1);
            break
        }
    };
    var c, d;
    return h.prototype.getRoutes = function (e) {
        switch (e.travelMode) {
            case"bicycling":
                c = google.maps.TravelMode.BICYCLING;
                break;
            case"transit":
                c = google.maps.TravelMode.TRANSIT;
                break;
            case"driving":
                c = google.maps.TravelMode.DRIVING;
                break;
            default:
                c = google.maps.TravelMode.WALKING
        }
        d = "imperial" === e.unitSystem ? google.maps.UnitSystem.IMPERIAL : google.maps.UnitSystem.METRIC;
        var n = {avoidHighways: !1, avoidTolls: !1, optimizeWaypoints: !1, waypoints: []}, i = t(n, e);
        i.origin = /string/.test(typeof e.origin) ? e.origin : new google.maps.LatLng(e.origin[0], e.origin[1]), i.destination = /string/.test(typeof e.destination) ? e.destination : new google.maps.LatLng(e.destination[0], e.destination[1]), i.travelMode = c, i.unitSystem = d, delete i.callback, delete i.error;
        var o = this;
        (new google.maps.DirectionsService).route(i, function (t, n) {
            if (n === google.maps.DirectionsStatus.OK) {
                for (var i in t.routes)t.routes.hasOwnProperty(i) && o.routes.push(t.routes[i]);
                e.callback && e.callback(o.routes, t, n)
            } else e.error && e.error(t, n)
        })
    }, h.prototype.removeRoutes = function () {
        this.routes.length = 0
    }, h.prototype.getElevations = function (e) {
        e = t({
            locations: [],
            path: !1,
            samples: 256
        }, e), e.locations.length > 0 && e.locations[0].length > 0 && (e.locations = i(n([e.locations], s, !1)));
        var o = e.callback;
        delete e.callback;
        var r = new google.maps.ElevationService;
        if (e.path) {
            var a = {path: e.locations, samples: e.samples};
            r.getElevationAlongPath(a, function (t, e) {
                o && "function" == typeof o && o(t, e)
            })
        } else delete e.path, delete e.samples, r.getElevationForLocations(e, function (t, e) {
            o && "function" == typeof o && o(t, e)
        })
    }, h.prototype.cleanRoute = h.prototype.removePolylines, h.prototype.renderRoute = function (e, n) {
        var i, o = "string" == typeof n.panel ? document.getElementById(n.panel.replace("#", "")) : n.panel;
        n.panel = o, n = t({map: this.map}, n), i = new google.maps.DirectionsRenderer(n), this.getRoutes({
            origin: e.origin,
            destination: e.destination,
            travelMode: e.travelMode,
            waypoints: e.waypoints,
            unitSystem: e.unitSystem,
            error: e.error,
            avoidHighways: e.avoidHighways,
            avoidTolls: e.avoidTolls,
            optimizeWaypoints: e.optimizeWaypoints,
            callback: function (t, e, n) {
                n === google.maps.DirectionsStatus.OK && i.setDirections(e)
            }
        })
    }, h.prototype.drawRoute = function (t) {
        var e = this;
        this.getRoutes({
            origin: t.origin,
            destination: t.destination,
            travelMode: t.travelMode,
            waypoints: t.waypoints,
            unitSystem: t.unitSystem,
            error: t.error,
            avoidHighways: t.avoidHighways,
            avoidTolls: t.avoidTolls,
            optimizeWaypoints: t.optimizeWaypoints,
            callback: function (n) {
                if (n.length > 0) {
                    var i = {
                        path: n[n.length - 1].overview_path,
                        strokeColor: t.strokeColor,
                        strokeOpacity: t.strokeOpacity,
                        strokeWeight: t.strokeWeight
                    };
                    t.hasOwnProperty("icons") && (i.icons = t.icons), e.drawPolyline(i), t.callback && t.callback(n[n.length - 1])
                }
            }
        })
    }, h.prototype.travelRoute = function (t) {
        if (t.origin && t.destination) this.getRoutes({
            origin: t.origin,
            destination: t.destination,
            travelMode: t.travelMode,
            waypoints: t.waypoints,
            unitSystem: t.unitSystem,
            error: t.error,
            callback: function (e) {
                if (e.length > 0 && t.start && t.start(e[e.length - 1]), e.length > 0 && t.step) {
                    var n = e[e.length - 1];
                    if (n.legs.length > 0)for (var i, o = n.legs[0].steps, s = 0; i = o[s]; s++)i.step_number = s, t.step(i, n.legs[0].steps.length - 1)
                }
                e.length > 0 && t.end && t.end(e[e.length - 1])
            }
        }); else if (t.route && t.route.legs.length > 0)for (var e, n = t.route.legs[0].steps, i = 0; e = n[i]; i++)e.step_number = i, t.step(e)
    }, h.prototype.drawSteppedRoute = function (t) {
        var e = this;
        if (t.origin && t.destination) this.getRoutes({
            origin: t.origin,
            destination: t.destination,
            travelMode: t.travelMode,
            waypoints: t.waypoints,
            error: t.error,
            callback: function (n) {
                if (n.length > 0 && t.start && t.start(n[n.length - 1]), n.length > 0 && t.step) {
                    var i = n[n.length - 1];
                    if (i.legs.length > 0)for (var o, s = i.legs[0].steps, r = 0; o = s[r]; r++) {
                        o.step_number = r;
                        var a = {
                            path: o.path,
                            strokeColor: t.strokeColor,
                            strokeOpacity: t.strokeOpacity,
                            strokeWeight: t.strokeWeight
                        };
                        t.hasOwnProperty("icons") && (a.icons = t.icons), e.drawPolyline(a), t.step(o, i.legs[0].steps.length - 1)
                    }
                }
                n.length > 0 && t.end && t.end(n[n.length - 1])
            }
        }); else if (t.route && t.route.legs.length > 0)for (var n, i = t.route.legs[0].steps, o = 0; n = i[o]; o++) {
            n.step_number = o;
            var s = {
                path: n.path,
                strokeColor: t.strokeColor,
                strokeOpacity: t.strokeOpacity,
                strokeWeight: t.strokeWeight
            };
            t.hasOwnProperty("icons") && (s.icons = t.icons), e.drawPolyline(s), t.step(n)
        }
    }, h.Route = function (t) {
        this.origin = t.origin, this.destination = t.destination, this.waypoints = t.waypoints, this.map = t.map, this.route = t.route, this.step_count = 0, this.steps = this.route.legs[0].steps, this.steps_length = this.steps.length;
        var e = {
            path: new google.maps.MVCArray,
            strokeColor: t.strokeColor,
            strokeOpacity: t.strokeOpacity,
            strokeWeight: t.strokeWeight
        };
        t.hasOwnProperty("icons") && (e.icons = t.icons), this.polyline = this.map.drawPolyline(e).getPath()
    }, h.Route.prototype.getRoute = function (t) {
        var n = this;
        this.map.getRoutes({
            origin: this.origin,
            destination: this.destination,
            travelMode: t.travelMode,
            waypoints: this.waypoints || [],
            error: t.error,
            callback: function () {
                n.route = e[0], t.callback && t.callback.call(n)
            }
        })
    }, h.Route.prototype.back = function () {
        if (this.step_count > 0) {
            this.step_count--;
            var t = this.route.legs[0].steps[this.step_count].path;
            for (var e in t)t.hasOwnProperty(e) && this.polyline.pop()
        }
    }, h.Route.prototype.forward = function () {
        if (this.step_count < this.steps_length) {
            var t = this.route.legs[0].steps[this.step_count].path;
            for (var e in t)t.hasOwnProperty(e) && this.polyline.push(t[e]);
            this.step_count++
        }
    }, h.prototype.checkGeofence = function (t, e, n) {
        return n.containsLatLng(new google.maps.LatLng(t, e))
    }, h.prototype.checkMarkerGeofence = function (t, e) {
        if (t.fences)for (var n, i = 0; n = t.fences[i]; i++) {
            var o = t.getPosition();
            this.checkGeofence(o.lat(), o.lng(), n) || e(t, n)
        }
    }, h.prototype.toImage = function (t) {
        var t = t || {}, e = {};
        if (e.size = t.size || [this.el.clientWidth, this.el.clientHeight], e.lat = this.getCenter().lat(), e.lng = this.getCenter().lng(), this.markers.length > 0) {
            e.markers = [];
            for (var n = 0; n < this.markers.length; n++)e.markers.push({
                lat: this.markers[n].getPosition().lat(),
                lng: this.markers[n].getPosition().lng()
            })
        }
        if (this.polylines.length > 0) {
            var i = this.polylines[0];
            e.polyline = {}, e.polyline.path = google.maps.geometry.encoding.encodePath(i.getPath()), e.polyline.strokeColor = i.strokeColor, e.polyline.strokeOpacity = i.strokeOpacity, e.polyline.strokeWeight = i.strokeWeight
        }
        return h.staticMapURL(e)
    }, h.staticMapURL = function (t) {
        function e(t, e) {
            if ("#" === t[0] && (t = t.replace("#", "0x"), e)) {
                if (e = parseFloat(e), 0 === (e = Math.min(1, Math.max(e, 0))))return "0x00000000";
                e = (255 * e).toString(16), 1 === e.length && (e += e), t = t.slice(0, 8) + e
            }
            return t
        }

        var n, i = [],
            o = ("file:" === location.protocol ? "http:" : location.protocol) + "//maps.googleapis.com/maps/api/staticmap";
        t.url && (o = t.url, delete t.url), o += "?";
        var s = t.markers;
        delete t.markers, !s && t.marker && (s = [t.marker], delete t.marker);
        var r = t.styles;
        delete t.styles;
        var a = t.polyline;
        if (delete t.polyline, t.center) i.push("center=" + t.center), delete t.center; else if (t.address) i.push("center=" + t.address), delete t.address; else if (t.lat) i.push(["center=", t.lat, ",", t.lng].join("")), delete t.lat, delete t.lng; else if (t.visible) {
            var l = encodeURI(t.visible.join("|"));
            i.push("visible=" + l)
        }
        var h = t.size;
        h ? (h.join && (h = h.join("x")), delete t.size) : h = "630x300", i.push("size=" + h), t.zoom || !1 === t.zoom || (t.zoom = 15);
        var c = !t.hasOwnProperty("sensor") || !!t.sensor;
        delete t.sensor, i.push("sensor=" + c);
        for (var d in t)t.hasOwnProperty(d) && i.push(d + "=" + t[d]);
        if (s)for (var u, p, f = 0; n = s[f]; f++) {
            u = [], n.size && "normal" !== n.size ? (u.push("size:" + n.size), delete n.size) : n.icon && (u.push("icon:" + encodeURI(n.icon)), delete n.icon), n.color && (u.push("color:" + n.color.replace("#", "0x")), delete n.color), n.label && (u.push("label:" + n.label[0].toUpperCase()), delete n.label), p = n.address ? n.address : n.lat + "," + n.lng, delete n.address, delete n.lat, delete n.lng;
            for (var d in n)n.hasOwnProperty(d) && u.push(d + ":" + n[d]);
            u.length || 0 === f ? (u.push(p), u = u.join("|"), i.push("markers=" + encodeURI(u))) : (u = i.pop() + encodeURI("|" + p), i.push(u))
        }
        if (r)for (var f = 0; f < r.length; f++) {
            var m = [];
            r[f].featureType && m.push("feature:" + r[f].featureType.toLowerCase()), r[f].elementType && m.push("element:" + r[f].elementType.toLowerCase());
            for (var g = 0; g < r[f].stylers.length; g++)for (var v in r[f].stylers[g]) {
                var y = r[f].stylers[g][v];
                "hue" != v && "color" != v || (y = "0x" + y.substring(1)), m.push(v + ":" + y)
            }
            var w = m.join("|");
            "" != w && i.push("style=" + w)
        }
        if (a) {
            if (n = a, a = [], n.strokeWeight && a.push("weight:" + parseInt(n.strokeWeight, 10)), n.strokeColor) {
                var _ = e(n.strokeColor, n.strokeOpacity);
                a.push("color:" + _)
            }
            if (n.fillColor) {
                var b = e(n.fillColor, n.fillOpacity);
                a.push("fillcolor:" + b)
            }
            var T = n.path;
            if (T.join)for (var E, g = 0; E = T[g]; g++)a.push(E.join(",")); else a.push("enc:" + T);
            a = a.join("|"), i.push("path=" + encodeURI(a))
        }
        var C = window.devicePixelRatio || 1;
        return i.push("scale=" + C), i = i.join("&"), o + i
    }, h.prototype.addMapType = function (t, e) {
        if (!e.hasOwnProperty("getTileUrl") || "function" != typeof e.getTileUrl)throw"'getTileUrl' function required.";
        e.tileSize = e.tileSize || new google.maps.Size(256, 256);
        var n = new google.maps.ImageMapType(e);
        this.map.mapTypes.set(t, n)
    }, h.prototype.addOverlayMapType = function (t) {
        if (!t.hasOwnProperty("getTile") || "function" != typeof t.getTile)throw"'getTile' function required.";
        var e = t.index;
        delete t.index, this.map.overlayMapTypes.insertAt(e, t)
    }, h.prototype.removeOverlayMapType = function (t) {
        this.map.overlayMapTypes.removeAt(t)
    }, h.prototype.addStyle = function (t) {
        var e = new google.maps.StyledMapType(t.styles, {name: t.styledMapName});
        this.map.mapTypes.set(t.mapTypeId, e)
    }, h.prototype.setStyle = function (t) {
        this.map.setMapTypeId(t)
    }, h.prototype.createPanorama = function (t) {
        return t.hasOwnProperty("lat") && t.hasOwnProperty("lng") || (t.lat = this.getCenter().lat(), t.lng = this.getCenter().lng()), this.panorama = h.createPanorama(t), this.map.setStreetView(this.panorama), this.panorama
    }, h.createPanorama = function (e) {
        var n = a(e.el, e.context);
        e.position = new google.maps.LatLng(e.lat, e.lng), delete e.el, delete e.context, delete e.lat, delete e.lng;
        for (var i = ["closeclick", "links_changed", "pano_changed", "position_changed", "pov_changed", "resize", "visible_changed"], o = t({visible: !0}, e), s = 0; s < i.length; s++)delete o[i[s]];
        for (var r = new google.maps.StreetViewPanorama(n, o), s = 0; s < i.length; s++)!function (t, n) {
            e[n] && google.maps.event.addListener(t, n, function () {
                e[n].apply(this)
            })
        }(r, i[s]);
        return r
    }, h.prototype.on = function (t, e) {
        return h.on(t, this, e)
    }, h.prototype.off = function (t) {
        h.off(t, this)
    }, h.prototype.once = function (t, e) {
        return h.once(t, this, e)
    }, h.custom_events = ["marker_added", "marker_removed", "polyline_added", "polyline_removed", "polygon_added", "polygon_removed", "geolocated", "geolocation_failed"], h.on = function (t, e, n) {
        if (-1 == h.custom_events.indexOf(t))return e instanceof h && (e = e.map), google.maps.event.addListener(e, t, n);
        var i = {handler: n, eventName: t};
        return e.registered_events[t] = e.registered_events[t] || [], e.registered_events[t].push(i), i
    }, h.off = function (t, e) {
        -1 == h.custom_events.indexOf(t) ? (e instanceof h && (e = e.map), google.maps.event.clearListeners(e, t)) : e.registered_events[t] = []
    }, h.once = function (t, e, n) {
        if (-1 == h.custom_events.indexOf(t))return e instanceof h && (e = e.map), google.maps.event.addListenerOnce(e, t, n)
    }, h.fire = function (t, e, n) {
        if (-1 == h.custom_events.indexOf(t)) google.maps.event.trigger(e, t, Array.prototype.slice.apply(arguments).slice(2)); else if (t in n.registered_events)for (var i = n.registered_events[t], o = 0; o < i.length; o++)!function (t, e, n) {
            t.apply(e, [n])
        }(i[o].handler, n, e)
    }, h.geolocate = function (t) {
        var e = t.always || t.complete;
        navigator.geolocation ? navigator.geolocation.getCurrentPosition(function (n) {
            t.success(n), e && e()
        }, function (n) {
            t.error(n), e && e()
        }, t.options) : (t.not_supported(), e && e())
    }, h.geocode = function (t) {
        this.geocoder = new google.maps.Geocoder;
        var e = t.callback;
        t.hasOwnProperty("lat") && t.hasOwnProperty("lng") && (t.latLng = new google.maps.LatLng(t.lat, t.lng)), delete t.lat, delete t.lng, delete t.callback, this.geocoder.geocode(t, function (t, n) {
            e(t, n)
        })
    }, "object" == typeof window.google && window.google.maps && (google.maps.Polygon.prototype.getBounds || (google.maps.Polygon.prototype.getBounds = function (t) {
        for (var e, n = new google.maps.LatLngBounds, i = this.getPaths(), o = 0; o < i.getLength(); o++) {
            e = i.getAt(o);
            for (var s = 0; s < e.getLength(); s++)n.extend(e.getAt(s))
        }
        return n
    }), google.maps.Polygon.prototype.containsLatLng || (google.maps.Polygon.prototype.containsLatLng = function (t) {
        var e = this.getBounds();
        if (null !== e && !e.contains(t))return !1;
        for (var n = !1, i = this.getPaths().getLength(), o = 0; o < i; o++)for (var s = this.getPaths().getAt(o), r = s.getLength(), a = r - 1, l = 0; l < r; l++) {
            var h = s.getAt(l), c = s.getAt(a);
            (h.lng() < t.lng() && c.lng() >= t.lng() || c.lng() < t.lng() && h.lng() >= t.lng()) && h.lat() + (t.lng() - h.lng()) / (c.lng() - h.lng()) * (c.lat() - h.lat()) < t.lat() && (n = !n), a = l
        }
        return n
    }), google.maps.Circle.prototype.containsLatLng || (google.maps.Circle.prototype.containsLatLng = function (t) {
        return !google.maps.geometry || google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), t) <= this.getRadius()
    }), google.maps.LatLngBounds.prototype.containsLatLng = function (t) {
        return this.contains(t)
    }, google.maps.Marker.prototype.setFences = function (t) {
        this.fences = t
    }, google.maps.Marker.prototype.addFence = function (t) {
        this.fences.push(t)
    }, google.maps.Marker.prototype.getId = function () {
        return this.__gm_id
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function (t) {
        "use strict";
        if (null == this)throw new TypeError;
        var e = Object(this), n = e.length >>> 0;
        if (0 === n)return -1;
        var i = 0;
        if (arguments.length > 1 && (i = Number(arguments[1]), i != i ? i = 0 : 0 != i && i != 1 / 0 && i != -1 / 0 && (i = (i > 0 || -1) * Math.floor(Math.abs(i)))), i >= n)return -1;
        for (var o = i >= 0 ? i : Math.max(n - Math.abs(i), 0); o < n; o++)if (o in e && e[o] === t)return o;
        return -1
    }), h
}), function () {
    function t() {
    }

    function e(t, e) {
        for (var n = t.length; n--;)if (t[n].listener === e)return n;
        return -1
    }

    function n(t) {
        return function () {
            return this[t].apply(this, arguments)
        }
    }

    var i = t.prototype, o = this, s = o.EventEmitter;
    i.getListeners = function (t) {
        var e, n, i = this._getEvents();
        if ("object" == typeof t) {
            e = {};
            for (n in i)i.hasOwnProperty(n) && t.test(n) && (e[n] = i[n])
        } else e = i[t] || (i[t] = []);
        return e
    }, i.flattenListeners = function (t) {
        var e, n = [];
        for (e = 0; e < t.length; e += 1)n.push(t[e].listener);
        return n
    }, i.getListenersAsObject = function (t) {
        var e, n = this.getListeners(t);
        return n instanceof Array && (e = {}, e[t] = n), e || n
    }, i.addListener = function (t, n) {
        var i, o = this.getListenersAsObject(t), s = "object" == typeof n;
        for (i in o)o.hasOwnProperty(i) && -1 === e(o[i], n) && o[i].push(s ? n : {listener: n, once: !1});
        return this
    }, i.on = n("addListener"), i.addOnceListener = function (t, e) {
        return this.addListener(t, {listener: e, once: !0})
    }, i.once = n("addOnceListener"), i.defineEvent = function (t) {
        return this.getListeners(t), this
    }, i.defineEvents = function (t) {
        for (var e = 0; e < t.length; e += 1)this.defineEvent(t[e]);
        return this
    }, i.removeListener = function (t, n) {
        var i, o, s = this.getListenersAsObject(t);
        for (o in s)s.hasOwnProperty(o) && -1 !== (i = e(s[o], n)) && s[o].splice(i, 1);
        return this
    }, i.off = n("removeListener"), i.addListeners = function (t, e) {
        return this.manipulateListeners(!1, t, e)
    }, i.removeListeners = function (t, e) {
        return this.manipulateListeners(!0, t, e)
    }, i.manipulateListeners = function (t, e, n) {
        var i, o, s = t ? this.removeListener : this.addListener, r = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)for (i = n.length; i--;)s.call(this, e, n[i]); else for (i in e)e.hasOwnProperty(i) && (o = e[i]) && ("function" == typeof o ? s.call(this, i, o) : r.call(this, i, o));
        return this
    }, i.removeEvent = function (t) {
        var e, n = typeof t, i = this._getEvents();
        if ("string" === n) delete i[t]; else if ("object" === n)for (e in i)i.hasOwnProperty(e) && t.test(e) && delete i[e]; else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (t, e) {
        var n, i, o, s = this.getListenersAsObject(t);
        for (o in s)if (s.hasOwnProperty(o))for (i = s[o].length; i--;)n = s[o][i], !0 === n.once && this.removeListener(t, n.listener), n.listener.apply(this, e || []) === this._getOnceReturnValue() && this.removeListener(t, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function (t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, i.setOnceReturnValue = function (t) {
        return this._onceReturnValue = t, this
    }, i._getOnceReturnValue = function () {
        return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
    }, i._getEvents = function () {
        return this._events || (this._events = {})
    }, t.noConflict = function () {
        return o.EventEmitter = s, t
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
}.call(this), function (t) {
    function e(e) {
        var n = t.event;
        return n.target = n.target || n.srcElement || e, n
    }

    var n = document.documentElement, i = function () {
    };
    n.addEventListener ? i = function (t, e, n) {
        t.addEventListener(e, n, !1)
    } : n.attachEvent && (i = function (t, n, i) {
            t[n + i] = i.handleEvent ? function () {
                var n = e(t);
                i.handleEvent.call(i, n)
            } : function () {
                var n = e(t);
                i.call(t, n)
            }, t.attachEvent("on" + n, t[n + i])
        });
    var o = function () {
    };
    n.removeEventListener ? o = function (t, e, n) {
        t.removeEventListener(e, n, !1)
    } : n.detachEvent && (o = function (t, e, n) {
            t.detachEvent("on" + e, t[e + n]);
            try {
                delete t[e + n]
            } catch (i) {
                t[e + n] = void 0
            }
        });
    var s = {bind: i, unbind: o};
    "function" == typeof define && define.amd ? define("eventie/eventie", s) : t.eventie = s
}(this), function (t) {
    function e(t, e) {
        for (var n in e)t[n] = e[n];
        return t
    }

    function n(t) {
        return "[object Array]" === l.call(t)
    }

    function i(t) {
        var e = [];
        if (n(t)) e = t; else if ("number" == typeof t.length)for (var i = 0, o = t.length; i < o; i++)e.push(t[i]); else e.push(t);
        return e
    }

    function o(t, n) {
        function o(t, n, r) {
            if (!(this instanceof o))return new o(t, n);
            "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = i(t), this.options = e({}, this.options), "function" == typeof n ? r = n : e(this.options, n), r && this.on("always", r), this.getImages(), s && (this.jqDeferred = new s.Deferred);
            var a = this;
            setTimeout(function () {
                a.check()
            })
        }

        function l(t) {
            this.img = t
        }

        function h(t) {
            this.src = t, c[t] = this
        }

        o.prototype = new t, o.prototype.options = {}, o.prototype.getImages = function () {
            this.images = [];
            for (var t = 0, e = this.elements.length; t < e; t++) {
                var n = this.elements[t];
                "IMG" === n.nodeName && this.addImage(n);
                for (var i = n.querySelectorAll("img"), o = 0, s = i.length; o < s; o++) {
                    var r = i[o];
                    this.addImage(r)
                }
            }
        }, o.prototype.addImage = function (t) {
            var e = new l(t);
            this.images.push(e)
        }, o.prototype.check = function () {
            function t(t, o) {
                return e.options.debug && a && r.log("confirm", t, o), e.progress(t), n++, n === i && e.complete(), !0
            }

            var e = this, n = 0, i = this.images.length;
            if (this.hasAnyBroken = !1, !i)return void this.complete();
            for (var o = 0; o < i; o++) {
                var s = this.images[o];
                s.on("confirm", t), s.check()
            }
        }, o.prototype.progress = function (t) {
            this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded;
            var e = this;
            setTimeout(function () {
                e.emit("progress", e, t), e.jqDeferred && e.jqDeferred.notify(e, t)
            })
        }, o.prototype.complete = function () {
            var t = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var e = this;
            setTimeout(function () {
                if (e.emit(t, e), e.emit("always", e), e.jqDeferred) {
                    var n = e.hasAnyBroken ? "reject" : "resolve";
                    e.jqDeferred[n](e)
                }
            })
        }, s && (s.fn.imagesLoaded = function (t, e) {
            return new o(this, t, e).jqDeferred.promise(s(this))
        }), l.prototype = new t, l.prototype.check = function () {
            var t = c[this.img.src] || new h(this.img.src);
            if (t.isConfirmed)return void this.confirm(t.isLoaded, "cached was confirmed");
            if (this.img.complete && void 0 !== this.img.naturalWidth)return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
            var e = this;
            t.on("confirm", function (t, n) {
                return e.confirm(t.isLoaded, n), !0
            }), t.check()
        }, l.prototype.confirm = function (t, e) {
            this.isLoaded = t, this.emit("confirm", this, e)
        };
        var c = {};
        return h.prototype = new t, h.prototype.check = function () {
            if (!this.isChecked) {
                var t = new Image;
                n.bind(t, "load", this), n.bind(t, "error", this), t.src = this.src, this.isChecked = !0
            }
        }, h.prototype.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, h.prototype.onload = function (t) {
            this.confirm(!0, "onload"), this.unbindProxyEvents(t)
        }, h.prototype.onerror = function (t) {
            this.confirm(!1, "onerror"), this.unbindProxyEvents(t)
        }, h.prototype.confirm = function (t, e) {
            this.isConfirmed = !0, this.isLoaded = t, this.emit("confirm", this, e)
        }, h.prototype.unbindProxyEvents = function (t) {
            n.unbind(t.target, "load", this), n.unbind(t.target, "error", this)
        }, o
    }

    var s = t.jQuery, r = t.console, a = void 0 !== r, l = Object.prototype.toString;
    "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], o) : t.imagesLoaded = o(t.EventEmitter, t.eventie)
}(window), "function" != typeof Object.create && (Object.create = function (t) {
    function e() {
    }

    return e.prototype = t, new e
}), function (t, e, n, i) {
    var o = {
        init: function (e, n) {
            var i = this;
            i.elem = n, i.$elem = t(n), i.imageSrc = i.$elem.data("zoom-image") ? i.$elem.data("zoom-image") : i.$elem.attr("src"), i.options = t.extend({}, t.fn.elevateZoom.options, e), i.options.tint && (i.options.lensColour = "none", i.options.lensOpacity = "1"), "inner" == i.options.zoomType && (i.options.showLens = !1), i.$elem.parent().removeAttr("title").removeAttr("alt"), i.zoomImage = i.imageSrc, i.refresh(1), t("#" + i.options.gallery + " a").click(function (e) {
                return i.options.galleryActiveClass && (t("#" + i.options.gallery + " a").removeClass(i.options.galleryActiveClass), t(this).addClass(i.options.galleryActiveClass)), e.preventDefault(), t(this).data("zoom-image") ? i.zoomImagePre = t(this).data("zoom-image") : i.zoomImagePre = t(this).data("image"), i.swaptheimage(t(this).data("image"), i.zoomImagePre), !1
            })
        }, refresh: function (t) {
            var e = this;
            setTimeout(function () {
                e.fetch(e.imageSrc)
            }, t || e.options.refresh)
        }, fetch: function (t) {
            var e = this, n = new Image;
            n.onload = function () {
                e.largeWidth = n.width, e.largeHeight = n.height, e.startZoom(), e.currentImage = e.imageSrc, e.options.onZoomedImageLoaded(e.$elem)
            }, n.src = t
        }, startZoom: function () {
            var e = this;
            if (e.nzWidth = e.$elem.width(), e.nzHeight = e.$elem.height(), e.isWindowActive = !1, e.isLensActive = !1, e.isTintActive = !1, e.overWindow = !1, e.options.imageCrossfade && (e.zoomWrap = e.$elem.wrap('<div style="height:' + e.nzHeight + "px;width:" + e.nzWidth + 'px;" class="zoomWrapper" />'), e.$elem.css("position", "absolute")), e.zoomLock = 1, e.scrollingLock = !1, e.changeBgSize = !1, e.currentZoomLevel = e.options.zoomLevel, e.nzOffset = e.$elem.offset(), e.widthRatio = e.largeWidth / e.currentZoomLevel / e.nzWidth, e.heightRatio = e.largeHeight / e.currentZoomLevel / e.nzHeight, "window" == e.options.zoomType && (e.zoomWindowStyle = "overflow: hidden;background-position: 0px 0px;text-align:center;background-color: " + String(e.options.zoomWindowBgColour) + ";width: " + String(e.options.zoomWindowWidth) + "px;height: " + String(e.options.zoomWindowHeight) + "px;float: left;background-size: " + e.largeWidth / e.currentZoomLevel + "px " + e.largeHeight / e.currentZoomLevel + "px;display: none;z-index:100;border: " + String(e.options.borderSize) + "px solid " + e.options.borderColour + ";background-repeat: no-repeat;position: absolute;"), "inner" == e.options.zoomType) {
                var n = e.$elem.css("border-left-width");
                e.zoomWindowStyle = "overflow: hidden;margin-left: " + String(n) + ";margin-top: " + String(n) + ";background-position: 0px 0px;width: " + String(e.nzWidth) + "px;height: " + String(e.nzHeight) + "px;float: left;display: none;cursor:" + e.options.cursor + ";px solid " + e.options.borderColour + ";background-repeat: no-repeat;position: absolute;"
            }
            "window" == e.options.zoomType && (lensHeight = e.nzHeight < e.options.zoomWindowWidth / e.widthRatio ? e.nzHeight : String(e.options.zoomWindowHeight / e.heightRatio), lensWidth = e.largeWidth < e.options.zoomWindowWidth ? e.nzWidth : e.options.zoomWindowWidth / e.widthRatio, e.lensStyle = "background-position: 0px 0px;width: " + String(e.options.zoomWindowWidth / e.widthRatio) + "px;height: " + String(e.options.zoomWindowHeight / e.heightRatio) + "px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:" + e.options.lensOpacity + ";filter: alpha(opacity = " + 100 * e.options.lensOpacity + "); zoom:1;width:" + lensWidth + "px;height:" + lensHeight + "px;background-color:" + e.options.lensColour + ";cursor:" + e.options.cursor + ";border: " + e.options.lensBorderSize + "px solid " + e.options.lensBorderColour + ";background-repeat: no-repeat;position: absolute;"), e.tintStyle = "display: block;position: absolute;background-color: " + e.options.tintColour + ";filter:alpha(opacity=0);opacity: 0;width: " + e.nzWidth + "px;height: " + e.nzHeight + "px;", e.lensRound = "", "lens" == e.options.zoomType && (e.lensStyle = "background-position: 0px 0px;float: left;display: none;border: " + String(e.options.borderSize) + "px solid " + e.options.borderColour + ";width:" + String(e.options.lensSize) + "px;height:" + String(e.options.lensSize) + "px;background-repeat: no-repeat;position: absolute;"), "round" == e.options.lensShape && (e.lensRound = "border-top-left-radius: " + String(e.options.lensSize / 2 + e.options.borderSize) + "px;border-top-right-radius: " + String(e.options.lensSize / 2 + e.options.borderSize) + "px;border-bottom-left-radius: " + String(e.options.lensSize / 2 + e.options.borderSize) + "px;border-bottom-right-radius: " + String(e.options.lensSize / 2 + e.options.borderSize) + "px;"), e.zoomContainer = t('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' + e.nzOffset.left + "px;top:" + e.nzOffset.top + "px;height:" + e.nzHeight + "px;width:" + e.nzWidth + 'px;"></div>'), t("body").append(e.zoomContainer), e.options.containLensZoom && "lens" == e.options.zoomType && e.zoomContainer.css("overflow", "hidden"), "inner" != e.options.zoomType && (e.zoomLens = t("<div class='zoomLens' style='" + e.lensStyle + e.lensRound + "'>&nbsp;</div>").appendTo(e.zoomContainer).click(function () {
                e.$elem.trigger("click")
            }), e.options.tint && (e.tintContainer = t("<div/>").addClass("tintContainer"), e.zoomTint = t("<div class='zoomTint' style='" + e.tintStyle + "'></div>"), e.zoomLens.wrap(e.tintContainer), e.zoomTintcss = e.zoomLens.after(e.zoomTint), e.zoomTintImage = t('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' + e.nzWidth + "px; height: " + e.nzHeight + 'px;" src="' + e.imageSrc + '">').appendTo(e.zoomLens).click(function () {
                e.$elem.trigger("click")
            }))), isNaN(e.options.zoomWindowPosition) ? e.zoomWindow = t("<div style='z-index:999;left:" + e.windowOffsetLeft + "px;top:" + e.windowOffsetTop + "px;" + e.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo("body").click(function () {
                e.$elem.trigger("click")
            }) : e.zoomWindow = t("<div style='z-index:999;left:" + e.windowOffsetLeft + "px;top:" + e.windowOffsetTop + "px;" + e.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo(e.zoomContainer).click(function () {
                e.$elem.trigger("click")
            }), e.zoomWindowContainer = t("<div/>").addClass("zoomWindowContainer").css("width", e.options.zoomWindowWidth), e.zoomWindow.wrap(e.zoomWindowContainer), "lens" == e.options.zoomType && e.zoomLens.css({backgroundImage: "url('" + e.imageSrc + "')"}), "window" == e.options.zoomType && e.zoomWindow.css({backgroundImage: "url('" + e.imageSrc + "')"}), "inner" == e.options.zoomType && e.zoomWindow.css({backgroundImage: "url('" + e.imageSrc + "')"}), e.$elem.bind("touchmove", function (t) {
                t.preventDefault(), e.setPosition(t.originalEvent.touches[0] || t.originalEvent.changedTouches[0])
            }), e.zoomContainer.bind("touchmove", function (t) {
                "inner" == e.options.zoomType && e.showHideWindow("show"), t.preventDefault(), e.setPosition(t.originalEvent.touches[0] || t.originalEvent.changedTouches[0])
            }), e.zoomContainer.bind("touchend", function (t) {
                e.showHideWindow("hide"), e.options.showLens && e.showHideLens("hide"), e.options.tint && "inner" != e.options.zoomType && e.showHideTint("hide")
            }), e.$elem.bind("touchend", function (t) {
                e.showHideWindow("hide"), e.options.showLens && e.showHideLens("hide"), e.options.tint && "inner" != e.options.zoomType && e.showHideTint("hide")
            }), e.options.showLens && (e.zoomLens.bind("touchmove", function (t) {
                t.preventDefault(), e.setPosition(t.originalEvent.touches[0] || t.originalEvent.changedTouches[0])
            }), e.zoomLens.bind("touchend", function (t) {
                e.showHideWindow("hide"), e.options.showLens && e.showHideLens("hide"), e.options.tint && "inner" != e.options.zoomType && e.showHideTint("hide")
            })), e.$elem.bind("mousemove", function (t) {
                0 == e.overWindow && e.setElements("show"), e.lastX === t.clientX && e.lastY === t.clientY || (e.setPosition(t), e.currentLoc = t), e.lastX = t.clientX, e.lastY = t.clientY
            }), e.zoomContainer.bind("mousemove", function (t) {
                0 == e.overWindow && e.setElements("show"), e.lastX === t.clientX && e.lastY === t.clientY || (e.setPosition(t), e.currentLoc = t), e.lastX = t.clientX, e.lastY = t.clientY
            }), "inner" != e.options.zoomType && e.zoomLens.bind("mousemove", function (t) {
                e.lastX === t.clientX && e.lastY === t.clientY || (e.setPosition(t), e.currentLoc = t), e.lastX = t.clientX, e.lastY = t.clientY
            }), e.options.tint && "inner" != e.options.zoomType && e.zoomTint.bind("mousemove", function (t) {
                e.lastX === t.clientX && e.lastY === t.clientY || (e.setPosition(t), e.currentLoc = t), e.lastX = t.clientX, e.lastY = t.clientY
            }), "inner" == e.options.zoomType && e.zoomWindow.bind("mousemove", function (t) {
                e.lastX === t.clientX && e.lastY === t.clientY || (e.setPosition(t), e.currentLoc = t), e.lastX = t.clientX, e.lastY = t.clientY
            }), e.zoomContainer.add(e.$elem).mouseenter(function () {
                0 == e.overWindow && e.setElements("show")
            }).mouseleave(function () {
                e.scrollLock || e.setElements("hide")
            }), "inner" != e.options.zoomType && e.zoomWindow.mouseenter(function () {
                e.overWindow = !0, e.setElements("hide")
            }).mouseleave(function () {
                e.overWindow = !1
            }), e.minZoomLevel = e.options.minZoomLevel ? e.options.minZoomLevel : 2 * e.options.scrollZoomIncrement, e.options.scrollZoom && e.zoomContainer.add(e.$elem).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function (n) {
                e.scrollLock = !0, clearTimeout(t.data(this, "timer")), t.data(this, "timer", setTimeout(function () {
                    e.scrollLock = !1
                }, 250));
                var i = n.originalEvent.wheelDelta || -1 * n.originalEvent.detail;
                return n.stopImmediatePropagation(), n.stopPropagation(), n.preventDefault(), 0 < i / 120 ? e.currentZoomLevel >= e.minZoomLevel && e.changeZoomLevel(e.currentZoomLevel - e.options.scrollZoomIncrement) : e.options.maxZoomLevel ? e.currentZoomLevel <= e.options.maxZoomLevel && e.changeZoomLevel(parseFloat(e.currentZoomLevel) + e.options.scrollZoomIncrement) : e.changeZoomLevel(parseFloat(e.currentZoomLevel) + e.options.scrollZoomIncrement), !1
            })
        }, setElements: function (t) {
            if (!this.options.zoomEnabled)return !1;
            "show" == t && this.isWindowSet && ("inner" == this.options.zoomType && this.showHideWindow("show"), "window" == this.options.zoomType && this.showHideWindow("show"), this.options.showLens && this.showHideLens("show"), this.options.tint && "inner" != this.options.zoomType && this.showHideTint("show")), "hide" == t && ("window" == this.options.zoomType && this.showHideWindow("hide"), this.options.tint || this.showHideWindow("hide"), this.options.showLens && this.showHideLens("hide"), this.options.tint && this.showHideTint("hide"))
        }, setPosition: function (t) {
            if (!this.options.zoomEnabled)return !1;
            this.nzHeight = this.$elem.height(), this.nzWidth = this.$elem.width(), this.nzOffset = this.$elem.offset(), this.options.tint && "inner" != this.options.zoomType && (this.zoomTint.css({top: 0}), this.zoomTint.css({left: 0})), this.options.responsive && !this.options.scrollZoom && this.options.showLens && (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.largeWidth < this.options.zoomWindowWidth ? this.nzWidth : this.options.zoomWindowWidth / this.widthRatio, this.widthRatio = this.largeWidth / this.nzWidth, this.heightRatio = this.largeHeight / this.nzHeight, "lens" != this.options.zoomType && (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.options.zoomWindowWidth < this.options.zoomWindowWidth ? this.nzWidth : this.options.zoomWindowWidth / this.widthRatio, this.zoomLens.css("width", lensWidth), this.zoomLens.css("height", lensHeight), this.options.tint && (this.zoomTintImage.css("width", this.nzWidth), this.zoomTintImage.css("height", this.nzHeight))), "lens" == this.options.zoomType && this.zoomLens.css({
                width: String(this.options.lensSize) + "px",
                height: String(this.options.lensSize) + "px"
            })), this.zoomContainer.css({top: this.nzOffset.top}), this.zoomContainer.css({left: this.nzOffset.left}),
                this.mouseLeft = parseInt(t.pageX - this.nzOffset.left), this.mouseTop = parseInt(t.pageY - this.nzOffset.top), "window" == this.options.zoomType && (this.Etoppos = this.mouseTop < this.zoomLens.height() / 2, this.Eboppos = this.mouseTop > this.nzHeight - this.zoomLens.height() / 2 - 2 * this.options.lensBorderSize, this.Eloppos = this.mouseLeft < 0 + this.zoomLens.width() / 2, this.Eroppos = this.mouseLeft > this.nzWidth - this.zoomLens.width() / 2 - 2 * this.options.lensBorderSize), "inner" == this.options.zoomType && (this.Etoppos = this.mouseTop < this.nzHeight / 2 / this.heightRatio, this.Eboppos = this.mouseTop > this.nzHeight - this.nzHeight / 2 / this.heightRatio, this.Eloppos = this.mouseLeft < 0 + this.nzWidth / 2 / this.widthRatio, this.Eroppos = this.mouseLeft > this.nzWidth - this.nzWidth / 2 / this.widthRatio - 2 * this.options.lensBorderSize), 0 >= this.mouseLeft || 0 > this.mouseTop || this.mouseLeft > this.nzWidth || this.mouseTop > this.nzHeight ? this.setElements("hide") : (this.options.showLens && (this.lensLeftPos = String(this.mouseLeft - this.zoomLens.width() / 2), this.lensTopPos = String(this.mouseTop - this.zoomLens.height() / 2)), this.Etoppos && (this.lensTopPos = 0), this.Eloppos && (this.tintpos = this.lensLeftPos = this.windowLeftPos = 0), "window" == this.options.zoomType && (this.Eboppos && (this.lensTopPos = Math.max(this.nzHeight - this.zoomLens.height() - 2 * this.options.lensBorderSize, 0)), this.Eroppos && (this.lensLeftPos = this.nzWidth - this.zoomLens.width() - 2 * this.options.lensBorderSize)), "inner" == this.options.zoomType && (this.Eboppos && (this.lensTopPos = Math.max(this.nzHeight - 2 * this.options.lensBorderSize, 0)), this.Eroppos && (this.lensLeftPos = this.nzWidth - this.nzWidth - 2 * this.options.lensBorderSize)), "lens" == this.options.zoomType && (this.windowLeftPos = String(-1 * ((t.pageX - this.nzOffset.left) * this.widthRatio - this.zoomLens.width() / 2)), this.windowTopPos = String(-1 * ((t.pageY - this.nzOffset.top) * this.heightRatio - this.zoomLens.height() / 2)), this.zoomLens.css({backgroundPosition: this.windowLeftPos + "px " + this.windowTopPos + "px"}), this.changeBgSize && (this.nzHeight > this.nzWidth ? ("lens" == this.options.zoomType && this.zoomLens.css({"background-size": this.largeWidth / this.newvalueheight + "px " + this.largeHeight / this.newvalueheight + "px"}), this.zoomWindow.css({"background-size": this.largeWidth / this.newvalueheight + "px " + this.largeHeight / this.newvalueheight + "px"})) : ("lens" == this.options.zoomType && this.zoomLens.css({"background-size": this.largeWidth / this.newvaluewidth + "px " + this.largeHeight / this.newvaluewidth + "px"}), this.zoomWindow.css({"background-size": this.largeWidth / this.newvaluewidth + "px " + this.largeHeight / this.newvaluewidth + "px"})), this.changeBgSize = !1), this.setWindowPostition(t)), this.options.tint && "inner" != this.options.zoomType && this.setTintPosition(t), "window" == this.options.zoomType && this.setWindowPostition(t), "inner" == this.options.zoomType && this.setWindowPostition(t), this.options.showLens && (this.fullwidth && "lens" != this.options.zoomType && (this.lensLeftPos = 0), this.zoomLens.css({
                left: this.lensLeftPos + "px",
                top: this.lensTopPos + "px"
            })))
        }, showHideWindow: function (t) {
            "show" != t || this.isWindowActive || (this.options.zoomWindowFadeIn ? this.zoomWindow.stop(!0, !0, !1).fadeIn(this.options.zoomWindowFadeIn) : this.zoomWindow.show(), this.isWindowActive = !0), "hide" == t && this.isWindowActive && (this.options.zoomWindowFadeOut ? this.zoomWindow.stop(!0, !0).fadeOut(this.options.zoomWindowFadeOut) : this.zoomWindow.hide(), this.isWindowActive = !1)
        }, showHideLens: function (t) {
            "show" != t || this.isLensActive || (this.options.lensFadeIn ? this.zoomLens.stop(!0, !0, !1).fadeIn(this.options.lensFadeIn) : this.zoomLens.show(), this.isLensActive = !0), "hide" == t && this.isLensActive && (this.options.lensFadeOut ? this.zoomLens.stop(!0, !0).fadeOut(this.options.lensFadeOut) : this.zoomLens.hide(), this.isLensActive = !1)
        }, showHideTint: function (t) {
            "show" != t || this.isTintActive || (this.options.zoomTintFadeIn ? this.zoomTint.css({opacity: this.options.tintOpacity}).animate().stop(!0, !0).fadeIn("slow") : (this.zoomTint.css({opacity: this.options.tintOpacity}).animate(), this.zoomTint.show()), this.isTintActive = !0), "hide" == t && this.isTintActive && (this.options.zoomTintFadeOut ? this.zoomTint.stop(!0, !0).fadeOut(this.options.zoomTintFadeOut) : this.zoomTint.hide(), this.isTintActive = !1)
        }, setLensPostition: function (t) {
        }, setWindowPostition: function (e) {
            var n = this;
            if (isNaN(n.options.zoomWindowPosition)) n.externalContainer = t("#" + n.options.zoomWindowPosition), n.externalContainerWidth = n.externalContainer.width(), n.externalContainerHeight = n.externalContainer.height(), n.externalContainerOffset = n.externalContainer.offset(), n.windowOffsetTop = n.externalContainerOffset.top, n.windowOffsetLeft = n.externalContainerOffset.left; else switch (n.options.zoomWindowPosition) {
                case 1:
                    n.windowOffsetTop = n.options.zoomWindowOffety, n.windowOffsetLeft = +n.nzWidth;
                    break;
                case 2:
                    n.options.zoomWindowHeight > n.nzHeight && (n.windowOffsetTop = -1 * (n.options.zoomWindowHeight / 2 - n.nzHeight / 2), n.windowOffsetLeft = n.nzWidth);
                    break;
                case 3:
                    n.windowOffsetTop = n.nzHeight - n.zoomWindow.height() - 2 * n.options.borderSize, n.windowOffsetLeft = n.nzWidth;
                    break;
                case 4:
                    n.windowOffsetTop = n.nzHeight, n.windowOffsetLeft = n.nzWidth;
                    break;
                case 5:
                    n.windowOffsetTop = n.nzHeight, n.windowOffsetLeft = n.nzWidth - n.zoomWindow.width() - 2 * n.options.borderSize;
                    break;
                case 6:
                    n.options.zoomWindowHeight > n.nzHeight && (n.windowOffsetTop = n.nzHeight, n.windowOffsetLeft = -1 * (n.options.zoomWindowWidth / 2 - n.nzWidth / 2 + 2 * n.options.borderSize));
                    break;
                case 7:
                    n.windowOffsetTop = n.nzHeight, n.windowOffsetLeft = 0;
                    break;
                case 8:
                    n.windowOffsetTop = n.nzHeight, n.windowOffsetLeft = -1 * (n.zoomWindow.width() + 2 * n.options.borderSize);
                    break;
                case 9:
                    n.windowOffsetTop = n.nzHeight - n.zoomWindow.height() - 2 * n.options.borderSize, n.windowOffsetLeft = -1 * (n.zoomWindow.width() + 2 * n.options.borderSize);
                    break;
                case 10:
                    n.options.zoomWindowHeight > n.nzHeight && (n.windowOffsetTop = -1 * (n.options.zoomWindowHeight / 2 - n.nzHeight / 2), n.windowOffsetLeft = -1 * (n.zoomWindow.width() + 2 * n.options.borderSize));
                    break;
                case 11:
                    n.windowOffsetTop = n.options.zoomWindowOffety, n.windowOffsetLeft = -1 * (n.zoomWindow.width() + 2 * n.options.borderSize);
                    break;
                case 12:
                    n.windowOffsetTop = -1 * (n.zoomWindow.height() + 2 * n.options.borderSize), n.windowOffsetLeft = -1 * (n.zoomWindow.width() + 2 * n.options.borderSize);
                    break;
                case 13:
                    n.windowOffsetTop = -1 * (n.zoomWindow.height() + 2 * n.options.borderSize), n.windowOffsetLeft = 0;
                    break;
                case 14:
                    n.options.zoomWindowHeight > n.nzHeight && (n.windowOffsetTop = -1 * (n.zoomWindow.height() + 2 * n.options.borderSize), n.windowOffsetLeft = -1 * (n.options.zoomWindowWidth / 2 - n.nzWidth / 2 + 2 * n.options.borderSize));
                    break;
                case 15:
                    n.windowOffsetTop = -1 * (n.zoomWindow.height() + 2 * n.options.borderSize), n.windowOffsetLeft = n.nzWidth - n.zoomWindow.width() - 2 * n.options.borderSize;
                    break;
                case 16:
                    n.windowOffsetTop = -1 * (n.zoomWindow.height() + 2 * n.options.borderSize), n.windowOffsetLeft = n.nzWidth;
                    break;
                default:
                    n.windowOffsetTop = n.options.zoomWindowOffety, n.windowOffsetLeft = n.nzWidth
            }
            n.isWindowSet = !0, n.windowOffsetTop += n.options.zoomWindowOffety, n.windowOffsetLeft += n.options.zoomWindowOffetx, n.zoomWindow.css({top: n.windowOffsetTop}), n.zoomWindow.css({left: n.windowOffsetLeft}), "inner" == n.options.zoomType && (n.zoomWindow.css({top: 0}), n.zoomWindow.css({left: 0})), n.windowLeftPos = String(-1 * ((e.pageX - n.nzOffset.left) * n.widthRatio - n.zoomWindow.width() / 2)), n.windowTopPos = String(-1 * ((e.pageY - n.nzOffset.top) * n.heightRatio - n.zoomWindow.height() / 2)), n.Etoppos && (n.windowTopPos = 0), n.Eloppos && (n.windowLeftPos = 0), n.Eboppos && (n.windowTopPos = -1 * (n.largeHeight / n.currentZoomLevel - n.zoomWindow.height())), n.Eroppos && (n.windowLeftPos = -1 * (n.largeWidth / n.currentZoomLevel - n.zoomWindow.width())), n.fullheight && (n.windowTopPos = 0), n.fullwidth && (n.windowLeftPos = 0), "window" != n.options.zoomType && "inner" != n.options.zoomType || (1 == n.zoomLock && (1 >= n.widthRatio && (n.windowLeftPos = 0), 1 >= n.heightRatio && (n.windowTopPos = 0)), n.largeHeight < n.options.zoomWindowHeight && (n.windowTopPos = 0), n.largeWidth < n.options.zoomWindowWidth && (n.windowLeftPos = 0), n.options.easing ? (n.xp || (n.xp = 0), n.yp || (n.yp = 0), n.loop || (n.loop = setInterval(function () {
                n.xp += (n.windowLeftPos - n.xp) / n.options.easingAmount, n.yp += (n.windowTopPos - n.yp) / n.options.easingAmount, n.scrollingLock ? (clearInterval(n.loop), n.xp = n.windowLeftPos, n.yp = n.windowTopPos, n.xp = -1 * ((e.pageX - n.nzOffset.left) * n.widthRatio - n.zoomWindow.width() / 2), n.yp = -1 * ((e.pageY - n.nzOffset.top) * n.heightRatio - n.zoomWindow.height() / 2), n.changeBgSize && (n.nzHeight > n.nzWidth ? ("lens" == n.options.zoomType && n.zoomLens.css({"background-size": n.largeWidth / n.newvalueheight + "px " + n.largeHeight / n.newvalueheight + "px"}), n.zoomWindow.css({"background-size": n.largeWidth / n.newvalueheight + "px " + n.largeHeight / n.newvalueheight + "px"})) : ("lens" != n.options.zoomType && n.zoomLens.css({"background-size": n.largeWidth / n.newvaluewidth + "px " + n.largeHeight / n.newvalueheight + "px"}), n.zoomWindow.css({"background-size": n.largeWidth / n.newvaluewidth + "px " + n.largeHeight / n.newvaluewidth + "px"})), n.changeBgSize = !1), n.zoomWindow.css({backgroundPosition: n.windowLeftPos + "px " + n.windowTopPos + "px"}), n.scrollingLock = !1, n.loop = !1) : (n.changeBgSize && (n.nzHeight > n.nzWidth ? ("lens" == n.options.zoomType && n.zoomLens.css({"background-size": n.largeWidth / n.newvalueheight + "px " + n.largeHeight / n.newvalueheight + "px"}), n.zoomWindow.css({"background-size": n.largeWidth / n.newvalueheight + "px " + n.largeHeight / n.newvalueheight + "px"})) : ("lens" != n.options.zoomType && n.zoomLens.css({"background-size": n.largeWidth / n.newvaluewidth + "px " + n.largeHeight / n.newvaluewidth + "px"}), n.zoomWindow.css({"background-size": n.largeWidth / n.newvaluewidth + "px " + n.largeHeight / n.newvaluewidth + "px"})), n.changeBgSize = !1), n.zoomWindow.css({backgroundPosition: n.xp + "px " + n.yp + "px"}))
            }, 16))) : (n.changeBgSize && (n.nzHeight > n.nzWidth ? ("lens" == n.options.zoomType && n.zoomLens.css({"background-size": n.largeWidth / n.newvalueheight + "px " + n.largeHeight / n.newvalueheight + "px"}), n.zoomWindow.css({"background-size": n.largeWidth / n.newvalueheight + "px " + n.largeHeight / n.newvalueheight + "px"})) : ("lens" == n.options.zoomType && n.zoomLens.css({"background-size": n.largeWidth / n.newvaluewidth + "px " + n.largeHeight / n.newvaluewidth + "px"}), n.largeHeight / n.newvaluewidth < n.options.zoomWindowHeight ? n.zoomWindow.css({"background-size": n.largeWidth / n.newvaluewidth + "px " + n.largeHeight / n.newvaluewidth + "px"}) : n.zoomWindow.css({"background-size": n.largeWidth / n.newvalueheight + "px " + n.largeHeight / n.newvalueheight + "px"})), n.changeBgSize = !1), n.zoomWindow.css({backgroundPosition: n.windowLeftPos + "px " + n.windowTopPos + "px"})))
        }, setTintPosition: function (t) {
            this.nzOffset = this.$elem.offset(), this.tintpos = String(-1 * (t.pageX - this.nzOffset.left - this.zoomLens.width() / 2)), this.tintposy = String(-1 * (t.pageY - this.nzOffset.top - this.zoomLens.height() / 2)), this.Etoppos && (this.tintposy = 0), this.Eloppos && (this.tintpos = 0), this.Eboppos && (this.tintposy = -1 * (this.nzHeight - this.zoomLens.height() - 2 * this.options.lensBorderSize)), this.Eroppos && (this.tintpos = -1 * (this.nzWidth - this.zoomLens.width() - 2 * this.options.lensBorderSize)), this.options.tint && (this.fullheight && (this.tintposy = 0), this.fullwidth && (this.tintpos = 0), this.zoomTintImage.css({left: this.tintpos + "px"}), this.zoomTintImage.css({top: this.tintposy + "px"}))
        }, swaptheimage: function (e, n) {
            var i = this, o = new Image;
            i.options.loadingIcon && (i.spinner = t("<div style=\"background: url('" + i.options.loadingIcon + "') no-repeat center;height:" + i.nzHeight + "px;width:" + i.nzWidth + 'px;z-index: 2000;position: absolute; background-position: center center;"></div>'), i.$elem.after(i.spinner)), i.options.onImageSwap(i.$elem), o.onload = function () {
                i.largeWidth = o.width, i.largeHeight = o.height, i.zoomImage = n, i.zoomWindow.css({"background-size": i.largeWidth + "px " + i.largeHeight + "px"}), i.zoomWindow.css({"background-size": i.largeWidth + "px " + i.largeHeight + "px"}), i.swapAction(e, n)
            }, o.src = n
        }, swapAction: function (e, n) {
            var i = this, o = new Image;
            if (o.onload = function () {
                    i.nzHeight = o.height, i.nzWidth = o.width, i.options.onImageSwapComplete(i.$elem), i.doneCallback()
                }, o.src = e, i.currentZoomLevel = i.options.zoomLevel, i.options.maxZoomLevel = !1, "lens" == i.options.zoomType && i.zoomLens.css({backgroundImage: "url('" + n + "')"}), "window" == i.options.zoomType && i.zoomWindow.css({backgroundImage: "url('" + n + "')"}), "inner" == i.options.zoomType && i.zoomWindow.css({backgroundImage: "url('" + n + "')"}), i.currentImage = n, i.options.imageCrossfade) {
                var s = i.$elem, r = s.clone();
                i.$elem.attr("src", e), i.$elem.after(r), r.stop(!0).fadeOut(i.options.imageCrossfade, function () {
                    t(this).remove()
                }), i.$elem.width("auto").removeAttr("width"), i.$elem.height("auto").removeAttr("height"), s.fadeIn(i.options.imageCrossfade), i.options.tint && "inner" != i.options.zoomType && (s = i.zoomTintImage, r = s.clone(), i.zoomTintImage.attr("src", n), i.zoomTintImage.after(r), r.stop(!0).fadeOut(i.options.imageCrossfade, function () {
                    t(this).remove()
                }), s.fadeIn(i.options.imageCrossfade), i.zoomTint.css({height: i.$elem.height()}), i.zoomTint.css({width: i.$elem.width()})), i.zoomContainer.css("height", i.$elem.height()), i.zoomContainer.css("width", i.$elem.width()), "inner" != i.options.zoomType || i.options.constrainType || (i.zoomWrap.parent().css("height", i.$elem.height()), i.zoomWrap.parent().css("width", i.$elem.width()), i.zoomWindow.css("height", i.$elem.height()), i.zoomWindow.css("width", i.$elem.width()))
            } else i.$elem.attr("src", e), i.options.tint && (i.zoomTintImage.attr("src", n), i.zoomTintImage.attr("height", i.$elem.height()), i.zoomTintImage.css({height: i.$elem.height()}), i.zoomTint.css({height: i.$elem.height()})), i.zoomContainer.css("height", i.$elem.height()), i.zoomContainer.css("width", i.$elem.width());
            i.options.imageCrossfade && (i.zoomWrap.css("height", i.$elem.height()), i.zoomWrap.css("width", i.$elem.width())), i.options.constrainType && ("height" == i.options.constrainType && (i.zoomContainer.css("height", i.options.constrainSize), i.zoomContainer.css("width", "auto"), i.options.imageCrossfade ? (i.zoomWrap.css("height", i.options.constrainSize), i.zoomWrap.css("width", "auto"), i.constwidth = i.zoomWrap.width()) : (i.$elem.css("height", i.options.constrainSize), i.$elem.css("width", "auto"), i.constwidth = i.$elem.width()), "inner" == i.options.zoomType && (i.zoomWrap.parent().css("height", i.options.constrainSize), i.zoomWrap.parent().css("width", i.constwidth), i.zoomWindow.css("height", i.options.constrainSize), i.zoomWindow.css("width", i.constwidth)), i.options.tint && (i.tintContainer.css("height", i.options.constrainSize), i.tintContainer.css("width", i.constwidth), i.zoomTint.css("height", i.options.constrainSize), i.zoomTint.css("width", i.constwidth), i.zoomTintImage.css("height", i.options.constrainSize), i.zoomTintImage.css("width", i.constwidth))), "width" == i.options.constrainType && (i.zoomContainer.css("height", "auto"), i.zoomContainer.css("width", i.options.constrainSize), i.options.imageCrossfade ? (i.zoomWrap.css("height", "auto"), i.zoomWrap.css("width", i.options.constrainSize), i.constheight = i.zoomWrap.height()) : (i.$elem.css("height", "auto"), i.$elem.css("width", i.options.constrainSize), i.constheight = i.$elem.height()), "inner" == i.options.zoomType && (i.zoomWrap.parent().css("height", i.constheight), i.zoomWrap.parent().css("width", i.options.constrainSize), i.zoomWindow.css("height", i.constheight), i.zoomWindow.css("width", i.options.constrainSize)), i.options.tint && (i.tintContainer.css("height", i.constheight), i.tintContainer.css("width", i.options.constrainSize), i.zoomTint.css("height", i.constheight), i.zoomTint.css("width", i.options.constrainSize), i.zoomTintImage.css("height", i.constheight), i.zoomTintImage.css("width", i.options.constrainSize))))
        }, doneCallback: function () {
            this.options.loadingIcon && this.spinner.hide(), this.nzOffset = this.$elem.offset(), this.nzWidth = this.$elem.width(), this.nzHeight = this.$elem.height(), this.currentZoomLevel = this.options.zoomLevel, this.widthRatio = this.largeWidth / this.nzWidth, this.heightRatio = this.largeHeight / this.nzHeight, "window" == this.options.zoomType && (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.options.zoomWindowWidth < this.options.zoomWindowWidth ? this.nzWidth : this.options.zoomWindowWidth / this.widthRatio, this.zoomLens && (this.zoomLens.css("width", lensWidth), this.zoomLens.css("height", lensHeight)))
        }, getCurrentImage: function () {
            return this.zoomImage
        }, getGalleryList: function () {
            var e = this;
            return e.gallerylist = [], e.options.gallery ? t("#" + e.options.gallery + " a").each(function () {
                var n = "";
                t(this).data("zoom-image") ? n = t(this).data("zoom-image") : t(this).data("image") && (n = t(this).data("image")), n == e.zoomImage ? e.gallerylist.unshift({
                    href: "" + n,
                    title: t(this).find("img").attr("title")
                }) : e.gallerylist.push({href: "" + n, title: t(this).find("img").attr("title")})
            }) : e.gallerylist.push({href: "" + e.zoomImage, title: t(this).find("img").attr("title")}), e.gallerylist
        }, changeZoomLevel: function (t) {
            this.scrollingLock = !0, this.newvalue = parseFloat(t).toFixed(2), newvalue = parseFloat(t).toFixed(2), maxheightnewvalue = this.largeHeight / (this.options.zoomWindowHeight / this.nzHeight * this.nzHeight), maxwidthtnewvalue = this.largeWidth / (this.options.zoomWindowWidth / this.nzWidth * this.nzWidth), "inner" != this.options.zoomType && (maxheightnewvalue <= newvalue ? (this.heightRatio = this.largeHeight / maxheightnewvalue / this.nzHeight, this.newvalueheight = maxheightnewvalue, this.fullheight = !0) : (this.heightRatio = this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue, this.fullheight = !1), maxwidthtnewvalue <= newvalue ? (this.widthRatio = this.largeWidth / maxwidthtnewvalue / this.nzWidth, this.newvaluewidth = maxwidthtnewvalue, this.fullwidth = !0) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue, this.fullwidth = !1), "lens" == this.options.zoomType && (maxheightnewvalue <= newvalue ? (this.fullwidth = !0, this.newvaluewidth = maxheightnewvalue) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue, this.fullwidth = !1))), "inner" == this.options.zoomType && (maxheightnewvalue = parseFloat(this.largeHeight / this.nzHeight).toFixed(2), maxwidthtnewvalue = parseFloat(this.largeWidth / this.nzWidth).toFixed(2), newvalue > maxheightnewvalue && (newvalue = maxheightnewvalue), newvalue > maxwidthtnewvalue && (newvalue = maxwidthtnewvalue), maxheightnewvalue <= newvalue ? (this.heightRatio = this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue, this.fullheight = !0) : (this.heightRatio = this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue, this.fullheight = !1), maxwidthtnewvalue <= newvalue ? (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue > maxwidthtnewvalue ? maxwidthtnewvalue : newvalue, this.fullwidth = !0) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue, this.fullwidth = !1)), scrcontinue = !1, "inner" == this.options.zoomType && (this.nzWidth > this.nzHeight && (this.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, this.fullwidth = this.fullheight = !0)), this.nzHeight > this.nzWidth && (this.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, this.fullwidth = this.fullheight = !0))), "inner" != this.options.zoomType && (scrcontinue = !0), scrcontinue && (this.zoomLock = 0, this.changeZoom = !0, this.options.zoomWindowHeight / this.heightRatio <= this.nzHeight && (this.currentZoomLevel = this.newvalueheight, "lens" != this.options.zoomType && "inner" != this.options.zoomType && (this.changeBgSize = !0, this.zoomLens.css({height: String(this.options.zoomWindowHeight / this.heightRatio) + "px"})), "lens" == this.options.zoomType || "inner" == this.options.zoomType) && (this.changeBgSize = !0), this.options.zoomWindowWidth / this.widthRatio <= this.nzWidth && ("inner" != this.options.zoomType && this.newvaluewidth > this.newvalueheight && (this.currentZoomLevel = this.newvaluewidth), "lens" != this.options.zoomType && "inner" != this.options.zoomType && (this.changeBgSize = !0, this.zoomLens.css({width: String(this.options.zoomWindowWidth / this.widthRatio) + "px"})), "lens" == this.options.zoomType || "inner" == this.options.zoomType) && (this.changeBgSize = !0), "inner" == this.options.zoomType && (this.changeBgSize = !0, this.nzWidth > this.nzHeight && (this.currentZoomLevel = this.newvaluewidth), this.nzHeight > this.nzWidth && (this.currentZoomLevel = this.newvaluewidth))), this.setPosition(this.currentLoc)
        }, closeAll: function () {
            self.zoomWindow && self.zoomWindow.hide(), self.zoomLens && self.zoomLens.hide(), self.zoomTint && self.zoomTint.hide()
        }, changeState: function (t) {
            "enable" == t && (this.options.zoomEnabled = !0), "disable" == t && (this.options.zoomEnabled = !1)
        }
    };
    t.fn.elevateZoom = function (e) {
        return this.each(function () {
            var n = Object.create(o);
            n.init(e, this), t.data(this, "elevateZoom", n)
        })
    }, t.fn.elevateZoom.options = {
        zoomActivation: "hover",
        zoomEnabled: !0,
        preloading: 1,
        zoomLevel: 1,
        scrollZoom: !1,
        scrollZoomIncrement: .1,
        minZoomLevel: !1,
        maxZoomLevel: !1,
        easing: !1,
        easingAmount: 12,
        lensSize: 200,
        zoomWindowWidth: 400,
        zoomWindowHeight: 400,
        zoomWindowOffetx: 0,
        zoomWindowOffety: 0,
        zoomWindowPosition: 1,
        zoomWindowBgColour: "#fff",
        lensFadeIn: !1,
        lensFadeOut: !1,
        debug: !1,
        zoomWindowFadeIn: !1,
        zoomWindowFadeOut: !1,
        zoomWindowAlwaysShow: !1,
        zoomTintFadeIn: !1,
        zoomTintFadeOut: !1,
        borderSize: 4,
        showLens: !0,
        borderColour: "#888",
        lensBorderSize: 1,
        lensBorderColour: "#000",
        lensShape: "square",
        zoomType: "window",
        containLensZoom: !1,
        lensColour: "white",
        lensOpacity: .4,
        lenszoom: !1,
        tint: !1,
        tintColour: "#333",
        tintOpacity: .4,
        gallery: !1,
        galleryActiveClass: "zoomGalleryActive",
        imageCrossfade: !1,
        constrainType: !1,
        constrainSize: !1,
        loadingIcon: !1,
        cursor: "default",
        responsive: !0,
        onComplete: t.noop,
        onZoomedImageLoaded: function () {
        },
        onImageSwap: t.noop,
        onImageSwapComplete: t.noop
    }
}(jQuery, window, document), function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function (t) {
    var e, n, i, o, s, r, a = function () {
    }, l = !!window.jQuery, h = t(window), c = function (t, n) {
        e.ev.on("mfp" + t + ".mfp", n)
    }, d = function (e, n, i, o) {
        var s = document.createElement("div");
        return s.className = "mfp-" + e, i && (s.innerHTML = i), o ? n && n.appendChild(s) : (s = t(s), n && s.appendTo(n)), s
    }, u = function (n, i) {
        e.ev.triggerHandler("mfp" + n, i), e.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), e.st.callbacks[n] && e.st.callbacks[n].apply(e, t.isArray(i) ? i : [i]))
    }, p = function (n) {
        return n === r && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), r = n), e.currTemplate.closeBtn
    }, f = function () {
        t.magnificPopup.instance || (e = new a, e.init(), t.magnificPopup.instance = e)
    }, m = function () {
        var t = document.createElement("p").style, e = ["ms", "O", "Moz", "Webkit"];
        if (void 0 !== t.transition)return !0;
        for (; e.length;)if (e.pop() + "Transition" in t)return !0;
        return !1
    };
    a.prototype = {
        constructor: a, init: function () {
            var n = navigator.appVersion;
            e.isLowIE = e.isIE8 = document.all && !document.addEventListener, e.isAndroid = /android/gi.test(n), e.isIOS = /iphone|ipad|ipod/gi.test(n), e.supportsTransition = m(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), i = t(document), e.popupsCache = {}
        }, open: function (n) {
            var o;
            if (!1 === n.isObj) {
                e.items = n.items.toArray(), e.index = 0;
                var r, a = n.items;
                for (o = 0; o < a.length; o++)if (r = a[o], r.parsed && (r = r.el[0]), r === n.el[0]) {
                    e.index = o;
                    break
                }
            } else e.items = t.isArray(n.items) ? n.items : [n.items], e.index = n.index || 0;
            if (e.isOpen)return void e.updateItemHTML();
            e.types = [], s = "", n.mainEl && n.mainEl.length ? e.ev = n.mainEl.eq(0) : e.ev = i, n.key ? (e.popupsCache[n.key] || (e.popupsCache[n.key] = {}), e.currTemplate = e.popupsCache[n.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, n), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = d("bg").on("click.mfp", function () {
                e.close()
            }), e.wrap = d("wrap").attr("tabindex", -1).on("click.mfp", function (t) {
                e._checkIfClose(t.target) && e.close()
            }), e.container = d("container", e.wrap)), e.contentContainer = d("content"), e.st.preloader && (e.preloader = d("preloader", e.container, e.st.tLoading));
            var l = t.magnificPopup.modules;
            for (o = 0; o < l.length; o++) {
                var f = l[o];
                f = f.charAt(0).toUpperCase() + f.slice(1), e["init" + f].call(e)
            }
            u("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (c("MarkupParse", function (t, e, n, i) {
                n.close_replaceWith = p(i.type)
            }), s += " mfp-close-btn-in") : e.wrap.append(p())), e.st.alignTop && (s += " mfp-align-top"), e.fixedContentPos ? e.wrap.css({
                overflow: e.st.overflowY,
                overflowX: "hidden",
                overflowY: e.st.overflowY
            }) : e.wrap.css({
                top: h.scrollTop(),
                position: "absolute"
            }), (!1 === e.st.fixedBgPos || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
                height: i.height(),
                position: "absolute"
            }), e.st.enableEscapeKey && i.on("keyup.mfp", function (t) {
                27 === t.keyCode && e.close()
            }), h.on("resize.mfp", function () {
                e.updateSize()
            }), e.st.closeOnContentClick || (s += " mfp-auto-cursor"), s && e.wrap.addClass(s);
            var m = e.wH = h.height(), g = {};
            if (e.fixedContentPos && e._hasScrollBar(m)) {
                var v = e._getScrollbarSize();
                v && (g.marginRight = v)
            }
            e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : g.overflow = "hidden");
            var y = e.st.mainClass;
            return e.isIE7 && (y += " mfp-ie7"), y && e._addClassToMFP(y), e.updateItemHTML(), u("BuildControls"), t("html").css(g), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function () {
                e.content ? (e._addClassToMFP("mfp-ready"), e._setFocus()) : e.bgOverlay.addClass("mfp-ready"), i.on("focusin.mfp", e._onFocusIn)
            }, 16), e.isOpen = !0, e.updateSize(m), u("Open"), n
        }, close: function () {
            e.isOpen && (u("BeforeClose"), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP("mfp-removing"), setTimeout(function () {
                e._close()
            }, e.st.removalDelay)) : e._close())
        }, _close: function () {
            u("Close");
            var n = "mfp-removing mfp-ready ";
            if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (n += e.st.mainClass + " "), e._removeClassFromMFP(n), e.fixedContentPos) {
                var o = {marginRight: ""};
                e.isIE7 ? t("body, html").css("overflow", "") : o.overflow = "", t("html").css(o)
            }
            i.off("keyup.mfp focusin.mfp"), e.ev.off(".mfp"), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && !0 !== e.currTemplate[e.currItem.type] || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, u("AfterClose")
        }, updateSize: function (t) {
            if (e.isIOS) {
                var n = document.documentElement.clientWidth / window.innerWidth, i = window.innerHeight * n;
                e.wrap.css("height", i), e.wH = i
            } else e.wH = t || h.height();
            e.fixedContentPos || e.wrap.css("height", e.wH), u("Resize")
        }, updateItemHTML: function () {
            var n = e.items[e.index];
            e.contentContainer.detach(), e.content && e.content.detach(), n.parsed || (n = e.parseEl(e.index));
            var i = n.type;
            if (u("BeforeChange", [e.currItem ? e.currItem.type : "", i]), e.currItem = n, !e.currTemplate[i]) {
                var s = !!e.st[i] && e.st[i].markup;
                u("FirstMarkupParse", s), e.currTemplate[i] = !s || t(s)
            }
            o && o !== n.type && e.container.removeClass("mfp-" + o + "-holder");
            var r = e["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, e.currTemplate[i]);
            e.appendContent(r, i), n.preloaded = !0, u("Change", n), o = n.type, e.container.prepend(e.contentContainer), u("AfterChange")
        }, appendContent: function (t, n) {
            e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && !0 === e.currTemplate[n] ? e.content.find(".mfp-close").length || e.content.append(p()) : e.content = t : e.content = "", u("BeforeAppend"), e.container.addClass("mfp-" + n + "-holder"), e.contentContainer.append(e.content)
        }, parseEl: function (n) {
            var i, o = e.items[n];
            if (o.tagName ? o = {el: t(o)} : (i = o.type, o = {data: o, src: o.src}), o.el) {
                for (var s = e.types, r = 0; r < s.length; r++)if (o.el.hasClass("mfp-" + s[r])) {
                    i = s[r];
                    break
                }
                o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
            }
            return o.type = i || e.st.type || "inline", o.index = n, o.parsed = !0, e.items[n] = o, u("ElementParse", o), e.items[n]
        }, addGroup: function (t, n) {
            var i = function (i) {
                i.mfpEl = this, e._openClick(i, t, n)
            };
            n || (n = {});
            var o = "click.magnificPopup";
            n.mainEl = t, n.items ? (n.isObj = !0, t.off(o).on(o, i)) : (n.isObj = !1, n.delegate ? t.off(o).on(o, n.delegate, i) : (n.items = t, t.off(o).on(o, i)))
        }, _openClick: function (n, i, o) {
            if ((void 0 !== o.midClick ? o.midClick : t.magnificPopup.defaults.midClick) || !(2 === n.which || n.ctrlKey || n.metaKey || n.altKey || n.shiftKey)) {
                var s = void 0 !== o.disableOn ? o.disableOn : t.magnificPopup.defaults.disableOn;
                if (s)if (t.isFunction(s)) {
                    if (!s.call(e))return !0
                } else if (h.width() < s)return !0;
                n.type && (n.preventDefault(), e.isOpen && n.stopPropagation()), o.el = t(n.mfpEl), o.delegate && (o.items = i.find(o.delegate)), e.open(o)
            }
        }, updateStatus: function (t, i) {
            if (e.preloader) {
                n !== t && e.container.removeClass("mfp-s-" + n), i || "loading" !== t || (i = e.st.tLoading);
                var o = {status: t, text: i};
                u("UpdateStatus", o), t = o.status, i = o.text, e.preloader.html(i), e.preloader.find("a").on("click", function (t) {
                    t.stopImmediatePropagation()
                }), e.container.addClass("mfp-s-" + t), n = t
            }
        }, _checkIfClose: function (n) {
            if (!t(n).hasClass("mfp-prevent-close")) {
                var i = e.st.closeOnContentClick, o = e.st.closeOnBgClick;
                if (i && o)return !0;
                if (!e.content || t(n).hasClass("mfp-close") || e.preloader && n === e.preloader[0])return !0;
                if (n === e.content[0] || t.contains(e.content[0], n)) {
                    if (i)return !0
                } else if (o && t.contains(document, n))return !0;
                return !1
            }
        }, _addClassToMFP: function (t) {
            e.bgOverlay.addClass(t), e.wrap.addClass(t)
        }, _removeClassFromMFP: function (t) {
            this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
        }, _hasScrollBar: function (t) {
            return (e.isIE7 ? i.height() : document.body.scrollHeight) > (t || h.height())
        }, _setFocus: function () {
            (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus()
        }, _onFocusIn: function (n) {
            if (n.target !== e.wrap[0] && !t.contains(e.wrap[0], n.target))return e._setFocus(), !1
        }, _parseMarkup: function (e, n, i) {
            var o;
            i.data && (n = t.extend(i.data, n)), u("MarkupParse", [e, n, i]), t.each(n, function (n, i) {
                if (void 0 === i || !1 === i)return !0;
                if (o = n.split("_"), o.length > 1) {
                    var s = e.find(".mfp-" + o[0]);
                    if (s.length > 0) {
                        var r = o[1];
                        "replaceWith" === r ? s[0] !== i[0] && s.replaceWith(i) : "img" === r ? s.is("img") ? s.attr("src", i) : s.replaceWith(t("<img>").attr("src", i).attr("class", s.attr("class"))) : s.attr(o[1], i)
                    }
                } else e.find(".mfp-" + n).html(i)
            })
        }, _getScrollbarSize: function () {
            if (void 0 === e.scrollbarSize) {
                var t = document.createElement("div");
                t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
            }
            return e.scrollbarSize
        }
    }, t.magnificPopup = {
        instance: null,
        proto: a.prototype,
        modules: [],
        open: function (e, n) {
            return f(), e = e ? t.extend(!0, {}, e) : {}, e.isObj = !0, e.index = n || 0, this.instance.open(e)
        },
        close: function () {
            return t.magnificPopup.instance && t.magnificPopup.instance.close()
        },
        registerModule: function (e, n) {
            n.options && (t.magnificPopup.defaults[e] = n.options), t.extend(this.proto, n.proto), this.modules.push(e)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, t.fn.magnificPopup = function (n) {
        f();
        var i = t(this);
        if ("string" == typeof n)if ("open" === n) {
            var o, s = l ? i.data("magnificPopup") : i[0].magnificPopup, r = parseInt(arguments[1], 10) || 0;
            s.items ? o = s.items[r] : (o = i, s.delegate && (o = o.find(s.delegate)), o = o.eq(r)), e._openClick({mfpEl: o}, i, s)
        } else e.isOpen && e[n].apply(e, Array.prototype.slice.call(arguments, 1)); else n = t.extend(!0, {}, n), l ? i.data("magnificPopup", n) : i[0].magnificPopup = n, e.addGroup(i, n);
        return i
    };
    var g, v, y, w = function () {
        y && (v.after(y.addClass(g)).detach(), y = null)
    };
    t.magnificPopup.registerModule("inline", {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        }, proto: {
            initInline: function () {
                e.types.push("inline"), c("Close.inline", function () {
                    w()
                })
            }, getInline: function (n, i) {
                if (w(), n.src) {
                    var o = e.st.inline, s = t(n.src);
                    if (s.length) {
                        var r = s[0].parentNode;
                        r && r.tagName && (v || (g = o.hiddenClass, v = d(g), g = "mfp-" + g), y = s.after(v).detach().removeClass(g)), e.updateStatus("ready")
                    } else e.updateStatus("error", o.tNotFound), s = t("<div>");
                    return n.inlineElement = s, s
                }
                return e.updateStatus("ready"), e._parseMarkup(i, {}, n), i
            }
        }
    });
    var _, b = function () {
        _ && t(document.body).removeClass(_)
    }, T = function () {
        b(),
        e.req && e.req.abort()
    };
    t.magnificPopup.registerModule("ajax", {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        }, proto: {
            initAjax: function () {
                e.types.push("ajax"), _ = e.st.ajax.cursor, c("Close.ajax", T), c("BeforeChange.ajax", T)
            }, getAjax: function (n) {
                _ && t(document.body).addClass(_), e.updateStatus("loading");
                var i = t.extend({
                    url: n.src, success: function (i, o, s) {
                        var r = {data: i, xhr: s};
                        u("ParseAjax", r), e.appendContent(t(r.data), "ajax"), n.finished = !0, b(), e._setFocus(), setTimeout(function () {
                            e.wrap.addClass("mfp-ready")
                        }, 16), e.updateStatus("ready"), u("AjaxContentAdded")
                    }, error: function () {
                        b(), n.finished = n.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", n.src))
                    }
                }, e.st.ajax.settings);
                return e.req = t.ajax(i), ""
            }
        }
    });
    var E, C = function (n) {
        if (n.data && void 0 !== n.data.title)return n.data.title;
        var i = e.st.image.titleSrc;
        if (i) {
            if (t.isFunction(i))return i.call(e, n);
            if (n.el)return n.el.attr(i) || ""
        }
        return ""
    };
    t.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        }, proto: {
            initImage: function () {
                var n = e.st.image, i = ".image";
                e.types.push("image"), c("Open" + i, function () {
                    "image" === e.currItem.type && n.cursor && t(document.body).addClass(n.cursor)
                }), c("Close" + i, function () {
                    n.cursor && t(document.body).removeClass(n.cursor), h.off("resize.mfp")
                }), c("Resize" + i, e.resizeImage), e.isLowIE && c("AfterChange", e.resizeImage)
            }, resizeImage: function () {
                var t = e.currItem;
                if (t && t.img && e.st.image.verticalFit) {
                    var n = 0;
                    e.isLowIE && (n = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - n)
                }
            }, _onImageHasSize: function (t) {
                t.img && (t.hasSize = !0, E && clearInterval(E), t.isCheckingImgSize = !1, u("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1))
            }, findImageSize: function (t) {
                var n = 0, i = t.img[0], o = function (s) {
                    E && clearInterval(E), E = setInterval(function () {
                        if (i.naturalWidth > 0)return void e._onImageHasSize(t);
                        n > 200 && clearInterval(E), n++, 3 === n ? o(10) : 40 === n ? o(50) : 100 === n && o(500)
                    }, s)
                };
                o(1)
            }, getImage: function (n, i) {
                var o = 0, s = function () {
                    n && (n.img[0].complete ? (n.img.off(".mfploader"), n === e.currItem && (e._onImageHasSize(n), e.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, u("ImageLoadComplete")) : (o++, o < 200 ? setTimeout(s, 100) : r()))
                }, r = function () {
                    n && (n.img.off(".mfploader"), n === e.currItem && (e._onImageHasSize(n), e.updateStatus("error", a.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
                }, a = e.st.image, l = i.find(".mfp-img");
                if (l.length) {
                    var h = document.createElement("img");
                    h.className = "mfp-img", n.el && n.el.find("img").length && (h.alt = n.el.find("img").attr("alt")), n.img = t(h).on("load.mfploader", s).on("error.mfploader", r), h.src = n.src, l.is("img") && (n.img = n.img.clone()), h = n.img[0], h.naturalWidth > 0 ? n.hasSize = !0 : h.width || (n.hasSize = !1)
                }
                return e._parseMarkup(i, {
                    title: C(n),
                    img_replaceWith: n.img
                }, n), e.resizeImage(), n.hasSize ? (E && clearInterval(E), n.loadError ? (i.addClass("mfp-loading"), e.updateStatus("error", a.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), e.updateStatus("ready")), i) : (e.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), e.findImageSize(n)), i)
            }
        }
    });
    var z, S = function () {
        return void 0 === z && (z = void 0 !== document.createElement("p").style.MozTransform), z
    };
    t.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function (t) {
                return t.is("img") ? t : t.find("img")
            }
        }, proto: {
            initZoom: function () {
                var t, n = e.st.zoom, i = ".zoom";
                if (n.enabled && e.supportsTransition) {
                    var o, s, r = n.duration, a = function (t) {
                        var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                            i = "all " + n.duration / 1e3 + "s " + n.easing, o = {
                                position: "fixed",
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                "-webkit-backface-visibility": "hidden"
                            }, s = "transition";
                        return o["-webkit-" + s] = o["-moz-" + s] = o["-o-" + s] = o[s] = i, e.css(o), e
                    }, l = function () {
                        e.content.css("visibility", "visible")
                    };
                    c("BuildControls" + i, function () {
                        if (e._allowZoom()) {
                            if (clearTimeout(o), e.content.css("visibility", "hidden"), !(t = e._getItemToZoom()))return void l();
                            s = a(t), s.css(e._getOffset()), e.wrap.append(s), o = setTimeout(function () {
                                s.css(e._getOffset(!0)), o = setTimeout(function () {
                                    l(), setTimeout(function () {
                                        s.remove(), t = s = null, u("ZoomAnimationEnded")
                                    }, 16)
                                }, r)
                            }, 16)
                        }
                    }), c("BeforeClose" + i, function () {
                        if (e._allowZoom()) {
                            if (clearTimeout(o), e.st.removalDelay = r, !t) {
                                if (!(t = e._getItemToZoom()))return;
                                s = a(t)
                            }
                            s.css(e._getOffset(!0)), e.wrap.append(s), e.content.css("visibility", "hidden"), setTimeout(function () {
                                s.css(e._getOffset())
                            }, 16)
                        }
                    }), c("Close" + i, function () {
                        e._allowZoom() && (l(), s && s.remove(), t = null)
                    })
                }
            }, _allowZoom: function () {
                return "image" === e.currItem.type
            }, _getItemToZoom: function () {
                return !!e.currItem.hasSize && e.currItem.img
            }, _getOffset: function (n) {
                var i;
                i = n ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem);
                var o = i.offset(), s = parseInt(i.css("padding-top"), 10), r = parseInt(i.css("padding-bottom"), 10);
                o.top -= t(window).scrollTop() - s;
                var a = {width: i.width(), height: (l ? i.innerHeight() : i[0].offsetHeight) - r - s};
                return S() ? a["-moz-transform"] = a.transform = "translate(" + o.left + "px," + o.top + "px)" : (a.left = o.left, a.top = o.top), a
            }
        }
    });
    var I = function (t) {
        if (e.currTemplate.iframe) {
            var n = e.currTemplate.iframe.find("iframe");
            n.length && (t || (n[0].src = "//about:blank"), e.isIE8 && n.css("display", t ? "block" : "none"))
        }
    };
    t.magnificPopup.registerModule("iframe", {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1"},
                vimeo: {index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1"},
                gmaps: {index: "//maps.google.", src: "%id%&output=embed"}
            }
        }, proto: {
            initIframe: function () {
                e.types.push("iframe"), c("BeforeChange", function (t, e, n) {
                    e !== n && ("iframe" === e ? I() : "iframe" === n && I(!0))
                }), c("Close.iframe", function () {
                    I()
                })
            }, getIframe: function (n, i) {
                var o = n.src, s = e.st.iframe;
                t.each(s.patterns, function () {
                    if (o.indexOf(this.index) > -1)return this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1
                });
                var r = {};
                return s.srcAction && (r[s.srcAction] = o), e._parseMarkup(i, r, n), e.updateStatus("ready"), i
            }
        }
    });
    var O = function (t) {
        var n = e.items.length;
        return t > n - 1 ? t - n : t < 0 ? n + t : t
    }, L = function (t, e, n) {
        return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, n)
    };
    t.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        }, proto: {
            initGallery: function () {
                var n = e.st.gallery, o = ".mfp-gallery";
                if (e.direction = !0, !n || !n.enabled)return !1;
                s += " mfp-gallery", c("Open" + o, function () {
                    n.navigateByImgClick && e.wrap.on("click" + o, ".mfp-img", function () {
                        if (e.items.length > 1)return e.next(), !1
                    }), i.on("keydown" + o, function (t) {
                        37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
                    })
                }), c("UpdateStatus" + o, function (t, n) {
                    n.text && (n.text = L(n.text, e.currItem.index, e.items.length))
                }), c("MarkupParse" + o, function (t, i, o, s) {
                    var r = e.items.length;
                    o.counter = r > 1 ? L(n.tCounter, s.index, r) : ""
                }), c("BuildControls" + o, function () {
                    if (e.items.length > 1 && n.arrows && !e.arrowLeft) {
                        var i = n.arrowMarkup,
                            o = e.arrowLeft = t(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass("mfp-prevent-close"),
                            s = e.arrowRight = t(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass("mfp-prevent-close");
                        o.click(function () {
                            e.prev()
                        }), s.click(function () {
                            e.next()
                        }), e.container.append(o.add(s))
                    }
                }), c("Change" + o, function () {
                    e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function () {
                        e.preloadNearbyImages(), e._preloadTimeout = null
                    }, 16)
                }), c("Close" + o, function () {
                    i.off(o), e.wrap.off("click" + o), e.arrowRight = e.arrowLeft = null
                })
            }, next: function () {
                e.direction = !0, e.index = O(e.index + 1), e.updateItemHTML()
            }, prev: function () {
                e.direction = !1, e.index = O(e.index - 1), e.updateItemHTML()
            }, goTo: function (t) {
                e.direction = t >= e.index, e.index = t, e.updateItemHTML()
            }, preloadNearbyImages: function () {
                var t, n = e.st.gallery.preload, i = Math.min(n[0], e.items.length), o = Math.min(n[1], e.items.length);
                for (t = 1; t <= (e.direction ? o : i); t++)e._preloadItem(e.index + t);
                for (t = 1; t <= (e.direction ? i : o); t++)e._preloadItem(e.index - t)
            }, _preloadItem: function (n) {
                if (n = O(n), !e.items[n].preloaded) {
                    var i = e.items[n];
                    i.parsed || (i = e.parseEl(n)), u("LazyLoad", i), "image" === i.type && (i.img = t('<img class="mfp-img" />').on("load.mfploader", function () {
                        i.hasSize = !0
                    }).on("error.mfploader", function () {
                        i.hasSize = !0, i.loadError = !0, u("LazyLoadError", i)
                    }).attr("src", i.src)), i.preloaded = !0
                }
            }
        }
    });
    t.magnificPopup.registerModule("retina", {
        options: {
            replaceSrc: function (t) {
                return t.src.replace(/\.\w+$/, function (t) {
                    return "@2x" + t
                })
            }, ratio: 1
        }, proto: {
            initRetina: function () {
                if (window.devicePixelRatio > 1) {
                    var t = e.st.retina, n = t.ratio;
                    n = isNaN(n) ? n() : n, n > 1 && (c("ImageHasSize.retina", function (t, e) {
                        e.img.css({"max-width": e.img[0].naturalWidth / n, width: "100%"})
                    }), c("ElementParse.retina", function (e, i) {
                        i.src = t.replaceSrc(i, n)
                    }))
                }
            }
        }
    }), f()
}), function (t) {
    var e = {animation: "dissolve", separator: ",", speed: 2e3};
    t.fx.step.textShadowBlur = function (e) {
        t(e.elem).prop("textShadowBlur", e.now).css({textShadow: "0 0 " + Math.floor(e.now) + "px black"})
    }, t.fn.textrotator = function (n) {
        var i = t.extend({}, e, n);
        return this.each(function () {
            var e = t(this), n = [];
            t.each(e.text().split(i.separator), function (t, e) {
                n.push(e)
            }), e.text(n[0]);
            var o = function () {
                switch (i.animation) {
                    case"dissolve":
                        e.animate({textShadowBlur: 20, opacity: 0}, 500, function () {
                            s = t.inArray(e.text(), n), s + 1 == n.length && (s = -1), e.text(n[s + 1]).animate({
                                textShadowBlur: 0,
                                opacity: 1
                            }, 500)
                        });
                        break;
                    case"flip":
                        e.find(".back").length > 0 && e.html(e.find(".back").html());
                        var o = e.text(), s = t.inArray(o, n);
                        s + 1 == n.length && (s = -1), e.html(""), t("<span class='front'>" + o + "</span>").appendTo(e), t("<span class='back'>" + n[s + 1] + "</span>").appendTo(e), e.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip").show().css({
                            "-webkit-transform": " rotateY(-180deg)",
                            "-moz-transform": " rotateY(-180deg)",
                            "-o-transform": " rotateY(-180deg)",
                            transform: " rotateY(-180deg)"
                        });
                        break;
                    case"flipUp":
                        e.find(".back").length > 0 && e.html(e.find(".back").html());
                        var o = e.text(), s = t.inArray(o, n);
                        s + 1 == n.length && (s = -1), e.html(""), t("<span class='front'>" + o + "</span>").appendTo(e), t("<span class='back'>" + n[s + 1] + "</span>").appendTo(e), e.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip up").show().css({
                            "-webkit-transform": " rotateX(-180deg)",
                            "-moz-transform": " rotateX(-180deg)",
                            "-o-transform": " rotateX(-180deg)",
                            transform: " rotateX(-180deg)"
                        });
                        break;
                    case"flipCube":
                        e.find(".back").length > 0 && e.html(e.find(".back").html());
                        var o = e.text(), s = t.inArray(o, n);
                        s + 1 == n.length && (s = -1), e.html(""), t("<span class='front'>" + o + "</span>").appendTo(e), t("<span class='back'>" + n[s + 1] + "</span>").appendTo(e), e.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube").show().css({
                            "-webkit-transform": " rotateY(180deg)",
                            "-moz-transform": " rotateY(180deg)",
                            "-o-transform": " rotateY(180deg)",
                            transform: " rotateY(180deg)"
                        });
                        break;
                    case"flipCubeUp":
                        e.find(".back").length > 0 && e.html(e.find(".back").html());
                        var o = e.text(), s = t.inArray(o, n);
                        s + 1 == n.length && (s = -1), e.html(""), t("<span class='front'>" + o + "</span>").appendTo(e), t("<span class='back'>" + n[s + 1] + "</span>").appendTo(e), e.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube up").show().css({
                            "-webkit-transform": " rotateX(180deg)",
                            "-moz-transform": " rotateX(180deg)",
                            "-o-transform": " rotateX(180deg)",
                            transform: " rotateX(180deg)"
                        });
                        break;
                    case"spin":
                        e.find(".rotating").length > 0 && e.html(e.find(".rotating").html()), s = t.inArray(e.text(), n), s + 1 == n.length && (s = -1), e.wrapInner("<span class='rotating spin' />").find(".rotating").hide().text(n[s + 1]).show().css({
                            "-webkit-transform": " rotate(0) scale(1)",
                            "-moz-transform": "rotate(0) scale(1)",
                            "-o-transform": "rotate(0) scale(1)",
                            transform: "rotate(0) scale(1)"
                        });
                        break;
                    case"fade":
                        e.fadeOut(i.speed, function () {
                            s = t.inArray(e.text(), n), s + 1 == n.length && (s = -1), e.text(n[s + 1]).fadeIn(i.speed)
                        })
                }
            };
            setInterval(o, i.speed)
        })
    }
}(window.jQuery), function (t) {
    function e() {
    }

    function n(t) {
        function n(e) {
            e.prototype.option || (e.prototype.option = function (e) {
                t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
            })
        }

        function o(e, n) {
            t.fn[e] = function (o) {
                if ("string" == typeof o) {
                    for (var r = i.call(arguments, 1), a = 0, l = this.length; l > a; a++) {
                        var h = this[a], c = t.data(h, e);
                        if (c)if (t.isFunction(c[o]) && "_" !== o.charAt(0)) {
                            var d = c[o].apply(c, r);
                            if (void 0 !== d)return d
                        } else s("no such method '" + o + "' for " + e + " instance"); else s("cannot call methods on " + e + " prior to initialization; attempted to call '" + o + "'")
                    }
                    return this
                }
                return this.each(function () {
                    var i = t.data(this, e);
                    i ? (i.option(o), i._init()) : (i = new n(this, o), t.data(this, e, i))
                })
            }
        }

        if (t) {
            var s = "undefined" == typeof console ? e : function (t) {
                console.error(t)
            };
            return t.bridget = function (t, e) {
                n(e), o(t, e)
            }, t.bridget
        }
    }

    var i = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], n) : n("object" == typeof exports ? require("jquery") : t.jQuery)
}(window), function (t) {
    function e(e) {
        var n = t.event;
        return n.target = n.target || n.srcElement || e, n
    }

    var n = document.documentElement, i = function () {
    };
    n.addEventListener ? i = function (t, e, n) {
        t.addEventListener(e, n, !1)
    } : n.attachEvent && (i = function (t, n, i) {
            t[n + i] = i.handleEvent ? function () {
                var n = e(t);
                i.handleEvent.call(i, n)
            } : function () {
                var n = e(t);
                i.call(t, n)
            }, t.attachEvent("on" + n, t[n + i])
        });
    var o = function () {
    };
    n.removeEventListener ? o = function (t, e, n) {
        t.removeEventListener(e, n, !1)
    } : n.detachEvent && (o = function (t, e, n) {
            t.detachEvent("on" + e, t[e + n]);
            try {
                delete t[e + n]
            } catch (i) {
                t[e + n] = void 0
            }
        });
    var s = {bind: i, unbind: o};
    "function" == typeof define && define.amd ? define("eventie/eventie", s) : "object" == typeof exports ? module.exports = s : t.eventie = s
}(this), function (t) {
    function e(t) {
        "function" == typeof t && (e.isReady ? t() : r.push(t))
    }

    function n(t) {
        var n = "readystatechange" === t.type && "complete" !== s.readyState;
        e.isReady || n || i()
    }

    function i() {
        e.isReady = !0;
        for (var t = 0, n = r.length; n > t; t++) {
            (0, r[t])()
        }
    }

    function o(o) {
        return "complete" === s.readyState ? i() : (o.bind(s, "DOMContentLoaded", n), o.bind(s, "readystatechange", n), o.bind(t, "load", n)), e
    }

    var s = t.document, r = [];
    e.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], o) : "object" == typeof exports ? module.exports = o(require("eventie")) : t.docReady = o(t.eventie)
}(window), function () {
    function t() {
    }

    function e(t, e) {
        for (var n = t.length; n--;)if (t[n].listener === e)return n;
        return -1
    }

    function n(t) {
        return function () {
            return this[t].apply(this, arguments)
        }
    }

    var i = t.prototype, o = this, s = o.EventEmitter;
    i.getListeners = function (t) {
        var e, n, i = this._getEvents();
        if (t instanceof RegExp) {
            e = {};
            for (n in i)i.hasOwnProperty(n) && t.test(n) && (e[n] = i[n])
        } else e = i[t] || (i[t] = []);
        return e
    }, i.flattenListeners = function (t) {
        var e, n = [];
        for (e = 0; e < t.length; e += 1)n.push(t[e].listener);
        return n
    }, i.getListenersAsObject = function (t) {
        var e, n = this.getListeners(t);
        return n instanceof Array && (e = {}, e[t] = n), e || n
    }, i.addListener = function (t, n) {
        var i, o = this.getListenersAsObject(t), s = "object" == typeof n;
        for (i in o)o.hasOwnProperty(i) && -1 === e(o[i], n) && o[i].push(s ? n : {listener: n, once: !1});
        return this
    }, i.on = n("addListener"), i.addOnceListener = function (t, e) {
        return this.addListener(t, {listener: e, once: !0})
    }, i.once = n("addOnceListener"), i.defineEvent = function (t) {
        return this.getListeners(t), this
    }, i.defineEvents = function (t) {
        for (var e = 0; e < t.length; e += 1)this.defineEvent(t[e]);
        return this
    }, i.removeListener = function (t, n) {
        var i, o, s = this.getListenersAsObject(t);
        for (o in s)s.hasOwnProperty(o) && -1 !== (i = e(s[o], n)) && s[o].splice(i, 1);
        return this
    }, i.off = n("removeListener"), i.addListeners = function (t, e) {
        return this.manipulateListeners(!1, t, e)
    }, i.removeListeners = function (t, e) {
        return this.manipulateListeners(!0, t, e)
    }, i.manipulateListeners = function (t, e, n) {
        var i, o, s = t ? this.removeListener : this.addListener, r = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)for (i = n.length; i--;)s.call(this, e, n[i]); else for (i in e)e.hasOwnProperty(i) && (o = e[i]) && ("function" == typeof o ? s.call(this, i, o) : r.call(this, i, o));
        return this
    }, i.removeEvent = function (t) {
        var e, n = typeof t, i = this._getEvents();
        if ("string" === n) delete i[t]; else if (t instanceof RegExp)for (e in i)i.hasOwnProperty(e) && t.test(e) && delete i[e]; else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (t, e) {
        var n, i, o, s = this.getListenersAsObject(t);
        for (o in s)if (s.hasOwnProperty(o))for (i = s[o].length; i--;)n = s[o][i], !0 === n.once && this.removeListener(t, n.listener), n.listener.apply(this, e || []) === this._getOnceReturnValue() && this.removeListener(t, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function (t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, i.setOnceReturnValue = function (t) {
        return this._onceReturnValue = t, this
    }, i._getOnceReturnValue = function () {
        return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
    }, i._getEvents = function () {
        return this._events || (this._events = {})
    }, t.noConflict = function () {
        return o.EventEmitter = s, t
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : o.EventEmitter = t
}.call(this), function (t) {
    function e(t) {
        if (t) {
            if ("string" == typeof i[t])return t;
            t = t.charAt(0).toUpperCase() + t.slice(1);
            for (var e, o = 0, s = n.length; s > o; o++)if (e = n[o] + t, "string" == typeof i[e])return e
        }
    }

    var n = "Webkit Moz ms Ms O".split(" "), i = document.documentElement.style;
    "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function () {
        return e
    }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
}(window), function (t) {
    function e(t) {
        var e = parseFloat(t);
        return -1 === t.indexOf("%") && !isNaN(e) && e
    }

    function n() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0, n = s.length; n > e; e++) {
            t[s[e]] = 0
        }
        return t
    }

    function i(i) {
        function r() {
            if (!u) {
                u = !0;
                var n = t.getComputedStyle;
                if (h = function () {
                        var t = n ? function (t) {
                            return n(t, null)
                        } : function (t) {
                            return t.currentStyle
                        };
                        return function (e) {
                            var n = t(e);
                            return n || o("Style returned " + n + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizeiframe"), n
                        }
                    }(), c = i("boxSizing")) {
                    var s = document.createElement("div");
                    s.style.width = "200px", s.style.padding = "1px 2px 3px 4px", s.style.borderStyle = "solid", s.style.borderWidth = "1px 2px 3px 4px", s.style[c] = "border-box";
                    var r = document.body || document.documentElement;
                    r.appendChild(s);
                    var a = h(s);
                    d = 200 === e(a.width), r.removeChild(s)
                }
            }
        }

        function a(t) {
            if (r(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                var i = h(t);
                if ("none" === i.display)return n();
                var o = {};
                o.width = t.offsetWidth, o.height = t.offsetHeight;
                for (var a = o.isBorderBox = !(!c || !i[c] || "border-box" !== i[c]), u = 0, p = s.length; p > u; u++) {
                    var f = s[u], m = i[f];
                    m = l(t, m);
                    var g = parseFloat(m);
                    o[f] = isNaN(g) ? 0 : g
                }
                var v = o.paddingLeft + o.paddingRight, y = o.paddingTop + o.paddingBottom,
                    w = o.marginLeft + o.marginRight, _ = o.marginTop + o.marginBottom,
                    b = o.borderLeftWidth + o.borderRightWidth, T = o.borderTopWidth + o.borderBottomWidth, E = a && d,
                    C = e(i.width);
                !1 !== C && (o.width = C + (E ? 0 : v + b));
                var z = e(i.height);
                return !1 !== z && (o.height = z + (E ? 0 : y + T)), o.innerWidth = o.width - (v + b), o.innerHeight = o.height - (y + T), o.outerWidth = o.width + w, o.outerHeight = o.height + _, o
            }
        }

        function l(t, e) {
            if (getComputedStyle || -1 === e.indexOf("%"))return e;
            var n = t.style, i = n.left, o = t.runtimeStyle, s = o && o.left;
            return s && (o.left = t.currentStyle.left), n.left = e, e = n.pixelLeft, n.left = i, s && (o.left = s), e
        }

        var h, c, d, u = !1;
        return a
    }

    var o = "undefined" == typeof console ? noop : function (t) {
            console.error(t)
        },
        s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
    "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], i) : "object" == typeof exports ? module.exports = i(require("desandro-get-style-property")) : t.getSize = i(t.getStyleProperty)
}(window), function (t) {
    function e(t, e) {
        return t[r](e)
    }

    function n(t) {
        if (!t.parentNode) {
            document.createDocumentFragment().appendChild(t)
        }
    }

    function i(t, e) {
        n(t);
        for (var i = t.parentNode.querySelectorAll(e), o = 0, s = i.length; s > o; o++)if (i[o] === t)return !0;
        return !1
    }

    function o(t, i) {
        return n(t), e(t, i)
    }

    var s, r = function () {
        if (t.matchesSelector)return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], n = 0, i = e.length; i > n; n++) {
            var o = e[n], s = o + "MatchesSelector";
            if (t[s])return s
        }
    }();
    if (r) {
        var a = document.createElement("div"), l = e(a, "div");
        s = l ? e : o
    } else s = i;
    "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function () {
        return s
    }) : "object" == typeof exports ? module.exports = s : window.matchesSelector = s
}(Element.prototype), function (t) {
    function e(t, e) {
        for (var n in e)t[n] = e[n];
        return t
    }

    function n(t) {
        for (var e in t)return !1;
        return null, !0
    }

    function i(t) {
        return t.replace(/([A-Z])/g, function (t) {
            return "-" + t.toLowerCase()
        })
    }

    function o(t, o, s) {
        function a(t, e) {
            t && (this.element = t, this.layout = e, this.position = {x: 0, y: 0}, this._create())
        }

        var l = s("transition"), h = s("transform"), c = l && h, d = !!s("perspective"), u = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "otransitionend",
            transition: "transitionend"
        }[l], p = ["transform", "transition", "transitionDuration", "transitionProperty"], f = function () {
            for (var t = {}, e = 0, n = p.length; n > e; e++) {
                var i = p[e], o = s(i);
                o && o !== i && (t[i] = o)
            }
            return t
        }();
        e(a.prototype, t.prototype), a.prototype._create = function () {
            this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
        }, a.prototype.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, a.prototype.getSize = function () {
            this.size = o(this.element)
        }, a.prototype.css = function (t) {
            var e = this.element.style;
            for (var n in t) {
                e[f[n] || n] = t[n]
            }
        }, a.prototype.getPosition = function () {
            var t = r(this.element), e = this.layout.options, n = e.isOriginLeft, i = e.isOriginTop,
                o = parseInt(t[n ? "left" : "right"], 10), s = parseInt(t[i ? "top" : "bottom"], 10);
            o = isNaN(o) ? 0 : o, s = isNaN(s) ? 0 : s;
            var a = this.layout.size;
            o -= n ? a.paddingLeft : a.paddingRight, s -= i ? a.paddingTop : a.paddingBottom, this.position.x = o, this.position.y = s
        }, a.prototype.layoutPosition = function () {
            var t = this.layout.size, e = this.layout.options, n = {};
            e.isOriginLeft ? (n.left = this.position.x + t.paddingLeft + "px", n.right = "") : (n.right = this.position.x + t.paddingRight + "px", n.left = ""), e.isOriginTop ? (n.top = this.position.y + t.paddingTop + "px", n.bottom = "") : (n.bottom = this.position.y + t.paddingBottom + "px", n.top = ""), this.css(n), this.emitEvent("layout", [this])
        };
        var m = d ? function (t, e) {
            return "translate3d(" + t + "px, " + e + "px, 0)"
        } : function (t, e) {
            return "translate(" + t + "px, " + e + "px)"
        };
        a.prototype._transitionTo = function (t, e) {
            this.getPosition();
            var n = this.position.x, i = this.position.y, o = parseInt(t, 10), s = parseInt(e, 10),
                r = o === this.position.x && s === this.position.y;
            if (this.setPosition(t, e), r && !this.isTransitioning)return void this.layoutPosition();
            var a = t - n, l = e - i, h = {}, c = this.layout.options;
            a = c.isOriginLeft ? a : -a, l = c.isOriginTop ? l : -l, h.transform = m(a, l), this.transition({
                to: h,
                onTransitionEnd: {transform: this.layoutPosition},
                isCleaning: !0
            })
        }, a.prototype.goTo = function (t, e) {
            this.setPosition(t, e), this.layoutPosition()
        }, a.prototype.moveTo = c ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function (t, e) {
            this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
        }, a.prototype._nonTransition = function (t) {
            this.css(t.to), t.isCleaning && this._removeStyles(t.to);
            for (var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)
        }, a.prototype._transition = function (t) {
            if (!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);
            var e = this._transn;
            for (var n in t.onTransitionEnd)e.onEnd[n] = t.onTransitionEnd[n];
            for (n in t.to)e.ingProperties[n] = !0, t.isCleaning && (e.clean[n] = !0);
            if (t.from) {
                this.css(t.from);
                this.element.offsetHeight;
                null
            }
            this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
        };
        var g = h && i(h) + ",opacity";
        a.prototype.enableTransition = function () {
            this.isTransitioning || (this.css({
                transitionProperty: g,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(u, this, !1))
        }, a.prototype.transition = a.prototype[l ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function (t) {
            this.ontransitionend(t)
        }, a.prototype.onotransitionend = function (t) {
            this.ontransitionend(t)
        };
        var v = {"-webkit-transform": "transform", "-moz-transform": "transform", "-o-transform": "transform"};
        a.prototype.ontransitionend = function (t) {
            if (t.target === this.element) {
                var e = this._transn, i = v[t.propertyName] || t.propertyName;
                if (delete e.ingProperties[i], n(e.ingProperties) && this.disableTransition(), i in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[i]), i in e.onEnd) {
                    e.onEnd[i].call(this), delete e.onEnd[i]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, a.prototype.disableTransition = function () {
            this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1
        }, a.prototype._removeStyles = function (t) {
            var e = {};
            for (var n in t)e[n] = "";
            this.css(e)
        };
        var y = {transitionProperty: "", transitionDuration: ""};
        return a.prototype.removeTransitionStyles = function () {
            this.css(y)
        }, a.prototype.removeElem = function () {
            this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
        }, a.prototype.remove = function () {
            if (!l || !parseFloat(this.layout.options.transitionDuration))return void this.removeElem();
            var t = this;
            this.on("transitionEnd", function () {
                return t.removeElem(), !0
            }), this.hide()
        }, a.prototype.reveal = function () {
            delete this.isHidden, this.css({display: ""});
            var t = this.layout.options;
            this.transition({from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0})
        }, a.prototype.hide = function () {
            this.isHidden = !0, this.css({display: ""});
            var t = this.layout.options;
            this.transition({
                from: t.visibleStyle,
                to: t.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: {
                    opacity: function () {
                        this.isHidden && this.css({display: "none"})
                    }
                }
            })
        }, a.prototype.destroy = function () {
            this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
        }, a
    }

    var s = t.getComputedStyle, r = s ? function (t) {
        return s(t, null)
    } : function (t) {
        return t.currentStyle
    };
    "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], o) : "object" == typeof exports ? module.exports = o(require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property")) : (t.Outlayer = {}, t.Outlayer.Item = o(t.EventEmitter, t.getSize, t.getStyleProperty))
}(window), function (t) {
    function e(t, e) {
        for (var n in e)t[n] = e[n];
        return t
    }

    function n(t) {
        return "[object Array]" === d.call(t)
    }

    function i(t) {
        var e = [];
        if (n(t)) e = t; else if (t && "number" == typeof t.length)for (var i = 0, o = t.length; o > i; i++)e.push(t[i]); else e.push(t);
        return e
    }

    function o(t, e) {
        var n = p(e, t);
        -1 !== n && e.splice(n, 1)
    }

    function s(t) {
        return t.replace(/(.)([A-Z])/g, function (t, e, n) {
            return e + "-" + n
        }).toLowerCase()
    }

    function r(n, r, d, p, f, m) {
        function g(t, n) {
            if ("string" == typeof t && (t = a.querySelector(t)), !t || !u(t))return void(l && l.error("Bad " + this.constructor.namespace + " element: " + t));
            this.element = t, this.options = e({}, this.constructor.defaults), this.option(n);
            var i = ++v;
            this.element.outlayerGUID = i, y[i] = this, this._create(), this.options.isInitLayout && this.layout()
        }

        var v = 0, y = {};
        return g.namespace = "outlayer", g.Item = m, g.defaults = {
            containerStyle: {position: "relative"},
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
            visibleStyle: {opacity: 1, transform: "scale(1)"}
        }, e(g.prototype, d.prototype), g.prototype.option = function (t) {
            e(this.options, t)
        }, g.prototype._create = function () {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
        }, g.prototype.reloadItems = function () {
            this.items = this._itemize(this.element.children)
        }, g.prototype._itemize = function (t) {
            for (var e = this._filterFindItemElements(t), n = this.constructor.Item, i = [], o = 0, s = e.length; s > o; o++) {
                var r = e[o], a = new n(r, this);
                i.push(a)
            }
            return i
        }, g.prototype._filterFindItemElements = function (t) {
            t = i(t);
            for (var e = this.options.itemSelector, n = [], o = 0, s = t.length; s > o; o++) {
                var r = t[o];
                if (u(r))if (e) {
                    f(r, e) && n.push(r);
                    for (var a = r.querySelectorAll(e), l = 0, h = a.length; h > l; l++)n.push(a[l])
                } else n.push(r)
            }
            return n
        }, g.prototype.getItemElements = function () {
            for (var t = [], e = 0, n = this.items.length; n > e; e++)t.push(this.items[e].element);
            return t
        }, g.prototype.layout = function () {
            this._resetLayout(), this._manageStamps();
            var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, t), this._isLayoutInited = !0
        }, g.prototype._init = g.prototype.layout, g.prototype._resetLayout = function () {
            this.getSize()
        }, g.prototype.getSize = function () {
            this.size = p(this.element)
        }, g.prototype._getMeasurement = function (t, e) {
            var n, i = this.options[t];
            i ? ("string" == typeof i ? n = this.element.querySelector(i) : u(i) && (n = i), this[t] = n ? p(n)[e] : i) : this[t] = 0
        }, g.prototype.layoutItems = function (t, e) {
            t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
        }, g.prototype._getItemsForLayout = function (t) {
            for (var e = [], n = 0, i = t.length; i > n; n++) {
                var o = t[n];
                o.isIgnored || e.push(o)
            }
            return e
        }, g.prototype._layoutItems = function (t, e) {
            function n() {
                i.emitEvent("layoutComplete", [i, t])
            }

            var i = this;
            if (!t || !t.length)return void n();
            this._itemsOn(t, "layout", n);
            for (var o = [], s = 0, r = t.length; r > s; s++) {
                var a = t[s], l = this._getItemLayoutPosition(a);
                l.item = a, l.isInstant = e || a.isLayoutInstant, o.push(l)
            }
            this._processLayoutQueue(o)
        }, g.prototype._getItemLayoutPosition = function () {
            return {x: 0, y: 0}
        }, g.prototype._processLayoutQueue = function (t) {
            for (var e = 0, n = t.length; n > e; e++) {
                var i = t[e];
                this._positionItem(i.item, i.x, i.y, i.isInstant)
            }
        }, g.prototype._positionItem = function (t, e, n, i) {
            i ? t.goTo(e, n) : t.moveTo(e, n)
        }, g.prototype._postLayout = function () {
            this.resizeContainer()
        }, g.prototype.resizeContainer = function () {
            if (this.options.isResizingContainer) {
                var t = this._getContainerSize();
                t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
            }
        }, g.prototype._getContainerSize = c, g.prototype._setContainerMeasure = function (t, e) {
            if (void 0 !== t) {
                var n = this.size;
                n.isBorderBox && (t += e ? n.paddingLeft + n.paddingRight + n.borderLeftWidth + n.borderRightWidth : n.paddingBottom + n.paddingTop + n.borderTopWidth + n.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
            }
        }, g.prototype._itemsOn = function (t, e, n) {
            function i() {
                return o++, o === s && n.call(r), !0
            }

            for (var o = 0, s = t.length, r = this, a = 0, l = t.length; l > a; a++) {
                t[a].on(e, i)
            }
        }, g.prototype.ignore = function (t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0)
        }, g.prototype.unignore = function (t) {
            var e = this.getItem(t);
            e && delete e.isIgnored
        }, g.prototype.stamp = function (t) {
            if (t = this._find(t)) {
                this.stamps = this.stamps.concat(t);
                for (var e = 0, n = t.length; n > e; e++) {
                    var i = t[e];
                    this.ignore(i)
                }
            }
        }, g.prototype.unstamp = function (t) {
            if (t = this._find(t))for (var e = 0, n = t.length; n > e; e++) {
                var i = t[e];
                o(i, this.stamps), this.unignore(i)
            }
        }, g.prototype._find = function (t) {
            return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = i(t)) : void 0
        }, g.prototype._manageStamps = function () {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var t = 0, e = this.stamps.length; e > t; t++) {
                    var n = this.stamps[t];
                    this._manageStamp(n)
                }
            }
        }, g.prototype._getBoundingRect = function () {
            var t = this.element.getBoundingClientRect(), e = this.size;
            this._boundingRect = {
                left: t.left + e.paddingLeft + e.borderLeftWidth,
                top: t.top + e.paddingTop + e.borderTopWidth,
                right: t.right - (e.paddingRight + e.borderRightWidth),
                bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
            }
        }, g.prototype._manageStamp = c, g.prototype._getElementOffset = function (t) {
            var e = t.getBoundingClientRect(), n = this._boundingRect, i = p(t);
            return {
                left: e.left - n.left - i.marginLeft,
                top: e.top - n.top - i.marginTop,
                right: n.right - e.right - i.marginRight,
                bottom: n.bottom - e.bottom - i.marginBottom
            }
        }, g.prototype.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, g.prototype.bindResize = function () {
            this.isResizeBound || (n.bind(t, "resize", this), this.isResizeBound = !0)
        }, g.prototype.unbindResize = function () {
            this.isResizeBound && n.unbind(t, "resize", this), this.isResizeBound = !1
        }, g.prototype.onresize = function () {
            function t() {
                e.resize(), delete e.resizeTimeout
            }

            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var e = this;
            this.resizeTimeout = setTimeout(t, 100)
        }, g.prototype.resize = function () {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, g.prototype.needsResizeLayout = function () {
            var t = p(this.element);
            return this.size && t && t.innerWidth !== this.size.innerWidth
        }, g.prototype.addItems = function (t) {
            var e = this._itemize(t);
            return e.length && (this.items = this.items.concat(e)), e
        }, g.prototype.appended = function (t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0), this.reveal(e))
        }, g.prototype.prepended = function (t) {
            var e = this._itemize(t);
            if (e.length) {
                var n = this.items.slice(0);
                this.items = e.concat(n), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(n)
            }
        }, g.prototype.reveal = function (t) {
            var e = t && t.length;
            if (e)for (var n = 0; e > n; n++) {
                var i = t[n];
                i.reveal()
            }
        }, g.prototype.hide = function (t) {
            var e = t && t.length;
            if (e)for (var n = 0; e > n; n++) {
                var i = t[n];
                i.hide()
            }
        }, g.prototype.getItem = function (t) {
            for (var e = 0, n = this.items.length; n > e; e++) {
                var i = this.items[e];
                if (i.element === t)return i
            }
        }, g.prototype.getItems = function (t) {
            if (t && t.length) {
                for (var e = [], n = 0, i = t.length; i > n; n++) {
                    var o = t[n], s = this.getItem(o);
                    s && e.push(s)
                }
                return e
            }
        }, g.prototype.remove = function (t) {
            t = i(t);
            var e = this.getItems(t);
            if (e && e.length) {
                this._itemsOn(e, "remove", function () {
                    this.emitEvent("removeComplete", [this, e])
                });
                for (var n = 0, s = e.length; s > n; n++) {
                    var r = e[n];
                    r.remove(), o(r, this.items)
                }
            }
        }, g.prototype.destroy = function () {
            var t = this.element.style;
            t.height = "", t.position = "", t.width = "";
            for (var e = 0, n = this.items.length; n > e; e++) {
                this.items[e].destroy()
            }
            this.unbindResize();
            var i = this.element.outlayerGUID;
            delete y[i], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
        }, g.data = function (t) {
            var e = t && t.outlayerGUID;
            return e && y[e]
        }, g.create = function (t, n) {
            function i() {
                g.apply(this, arguments)
            }

            return Object.create ? i.prototype = Object.create(g.prototype) : e(i.prototype, g.prototype), i.prototype.constructor = i, i.defaults = e({}, g.defaults), e(i.defaults, n), i.prototype.settings = {}, i.namespace = t, i.data = g.data, i.Item = function () {
                m.apply(this, arguments)
            }, i.Item.prototype = new m, r(function () {
                for (var e = s(t), n = a.querySelectorAll(".js-" + e), o = "data-" + e + "-options", r = 0, c = n.length; c > r; r++) {
                    var d, u = n[r], p = u.getAttribute(o);
                    try {
                        d = p && JSON.parse(p)
                    } catch (t) {
                        l && l.error("Error parsing " + o + " on " + u.nodeName.toLowerCase() + (u.id ? "#" + u.id : "") + ": " + t);
                        continue
                    }
                    var f = new i(u, d);
                    h && h.data(u, t, f)
                }
            }), h && h.bridget && h.bridget(t, i), i
        }, g.Item = m, g
    }

    var a = t.document, l = t.console, h = t.jQuery, c = function () {
        }, d = Object.prototype.toString,
        u = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function (t) {
            return t instanceof HTMLElement
        } : function (t) {
            return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
        }, p = Array.prototype.indexOf ? function (t, e) {
            return t.indexOf(e)
        } : function (t, e) {
            for (var n = 0, i = t.length; i > n; n++)if (t[n] === e)return n;
            return -1
        };
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], r) : "object" == typeof exports ? module.exports = r(require("eventie"), require("doc-ready"), require("wolfy87-eventemitter"), require("get-size"), require("desandro-matches-selector"), require("./item")) : t.Outlayer = r(t.eventie, t.docReady, t.EventEmitter, t.getSize, t.matchesSelector, t.Outlayer.Item)
}(window), function (t) {
    function e(t, e) {
        var i = t.create("masonry");
        return i.prototype._resetLayout = function () {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
            var t = this.cols;
            for (this.colYs = []; t--;)this.colYs.push(0);
            this.maxY = 0
        }, i.prototype.measureColumns = function () {
            if (this.getContainerWidth(), !this.columnWidth) {
                var t = this.items[0], n = t && t.element;
                this.columnWidth = n && e(n).outerWidth || this.containerWidth
            }
            this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
        }, i.prototype.getContainerWidth = function () {
            var t = this.options.isFitWidth ? this.element.parentNode : this.element, n = e(t);
            this.containerWidth = n && n.innerWidth
        }, i.prototype._getItemLayoutPosition = function (t) {
            t.getSize();
            var e = t.size.outerWidth % this.columnWidth, i = e && 1 > e ? "round" : "ceil",
                o = Math[i](t.size.outerWidth / this.columnWidth);
            o = Math.min(o, this.cols);
            for (var s = this._getColGroup(o), r = Math.min.apply(Math, s), a = n(s, r), l = {
                x: this.columnWidth * a,
                y: r
            }, h = r + t.size.outerHeight, c = this.cols + 1 - s.length, d = 0; c > d; d++)this.colYs[a + d] = h;
            return l
        }, i.prototype._getColGroup = function (t) {
            if (2 > t)return this.colYs;
            for (var e = [], n = this.cols + 1 - t, i = 0; n > i; i++) {
                var o = this.colYs.slice(i, i + t);
                e[i] = Math.max.apply(Math, o)
            }
            return e
        }, i.prototype._manageStamp = function (t) {
            var n = e(t), i = this._getElementOffset(t), o = this.options.isOriginLeft ? i.left : i.right,
                s = o + n.outerWidth, r = Math.floor(o / this.columnWidth);
            r = Math.max(0, r);
            var a = Math.floor(s / this.columnWidth);
            a -= s % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
            for (var l = (this.options.isOriginTop ? i.top : i.bottom) + n.outerHeight, h = r; a >= h; h++)this.colYs[h] = Math.max(l, this.colYs[h])
        }, i.prototype._getContainerSize = function () {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = {height: this.maxY};
            return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
        }, i.prototype._getContainerFitWidth = function () {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];)t++;
            return (this.cols - t) * this.columnWidth - this.gutter
        }, i.prototype.needsResizeLayout = function () {
            var t = this.containerWidth;
            return this.getContainerWidth(), t !== this.containerWidth
        }, i
    }

    var n = Array.prototype.indexOf ? function (t, e) {
        return t.indexOf(e)
    } : function (t, e) {
        for (var n = 0, i = t.length; i > n; n++) {
            if (t[n] === e)return n
        }
        return -1
    };
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window), window.Modernizr = function (t, e, n) {
    function i(t) {
        f.cssText = t
    }

    function o(t, e) {
        return typeof t === e
    }

    function s(t, e) {
        return !!~("" + t).indexOf(e)
    }

    function r(t, e) {
        for (var i in t) {
            var o = t[i];
            if (!s(o, "-") && f[o] !== n)return "pfx" != e || o
        }
        return !1
    }

    function a(t, e, i) {
        for (var s in t) {
            var r = e[t[s]];
            if (r !== n)return !1 === i ? t[s] : o(r, "function") ? r.bind(i || e) : r
        }
        return !1
    }

    function l(t, e, n) {
        var i = t.charAt(0).toUpperCase() + t.slice(1), s = (t + " " + g.join(i + " ") + i).split(" ");
        return o(e, "string") || o(e, "undefined") ? r(s, e) : (s = (t + " " + v.join(i + " ") + i).split(" "), a(s, e, n))
    }

    var h, c, d = {}, u = e.documentElement, p = e.createElement("modernizr"), f = p.style, m = "Webkit Moz O ms",
        g = m.split(" "), v = m.toLowerCase().split(" "), y = {}, w = [], _ = w.slice, b = {}.hasOwnProperty;
    c = o(b, "undefined") || o(b.call, "undefined") ? function (t, e) {
        return e in t && o(t.constructor.prototype[e], "undefined")
    } : function (t, e) {
        return b.call(t, e)
    }, Function.prototype.bind || (Function.prototype.bind = function (t) {
        var e = this;
        if ("function" != typeof e)throw new TypeError;
        var n = _.call(arguments, 1), i = function () {
            if (this instanceof i) {
                var o = function () {
                };
                o.prototype = e.prototype;
                var s = new o, r = e.apply(s, n.concat(_.call(arguments)));
                return Object(r) === r ? r : s
            }
            return e.apply(t, n.concat(_.call(arguments)))
        };
        return i
    }), y.cssanimations = function () {
        return l("animationName")
    };
    for (var T in y)c(y, T) && (h = T.toLowerCase(), d[h] = y[T](), w.push((d[h] ? "" : "no-") + h));
    return d.addTest = function (t, e) {
        if ("object" == typeof t)for (var i in t)c(t, i) && d.addTest(i, t[i]); else {
            if (t = t.toLowerCase(), d[t] !== n)return d;
            e = "function" == typeof e ? e() : e, u.className += " " + (e ? "" : "no-") + t, d[t] = e
        }
        return d
    }, i(""), p = null, function (t, e) {
        function n(t, e) {
            var n = t.createElement("p"), i = t.getElementsByTagName("head")[0] || t.documentElement;
            return n.innerHTML = "x<style>" + e + "</style>", i.insertBefore(n.lastChild, i.firstChild)
        }

        function i() {
            var t = v.elements;
            return "string" == typeof t ? t.split(" ") : t
        }

        function o(t) {
            var e = g[t[f]];
            return e || (e = {}, m++, t[f] = m, g[m] = e), e
        }

        function s(t, n, i) {
            if (n || (n = e), c)return n.createElement(t);
            i || (i = o(n));
            var s;
            return s = i.cache[t] ? i.cache[t].cloneNode() : p.test(t) ? (i.cache[t] = i.createElem(t)).cloneNode() : i.createElem(t), !s.canHaveChildren || u.test(t) || s.tagUrn ? s : i.frag.appendChild(s)
        }

        function r(t, n) {
            if (t || (t = e), c)return t.createDocumentFragment();
            n = n || o(t);
            for (var s = n.frag.cloneNode(), r = 0, a = i(), l = a.length; r < l; r++)s.createElement(a[r]);
            return s
        }

        function a(t, e) {
            e.cache || (e.cache = {}, e.createElem = t.createElement, e.createFrag = t.createDocumentFragment, e.frag = e.createFrag()), t.createElement = function (n) {
                return v.shivMethods ? s(n, t, e) : e.createElem(n)
            }, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(/[\w\-]+/g, function (t) {
                    return e.createElem(t), e.frag.createElement(t), 'c("' + t + '")'
                }) + ");return n}")(v, e.frag)
        }

        function l(t) {
            t || (t = e);
            var i = o(t);
            return v.shivCSS && !h && !i.hasCSS && (i.hasCSS = !!n(t, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), c || a(t, i), t
        }

        var h, c, d = t.html5 || {}, u = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            p = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            f = "_html5shiv", m = 0, g = {};
        !function () {
            try {
                var t = e.createElement("a");
                t.innerHTML = "<xyz></xyz>", h = "hidden" in t, c = 1 == t.childNodes.length || function () {
                        e.createElement("a");
                        var t = e.createDocumentFragment();
                        return void 0 === t.cloneNode || void 0 === t.createDocumentFragment || void 0 === t.createElement
                    }()
            } catch (t) {
                h = !0, c = !0
            }
        }();
        var v = {
            elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: "3.7.0",
            shivCSS: !1 !== d.shivCSS,
            supportsUnknownElements: c,
            shivMethods: !1 !== d.shivMethods,
            type: "default",
            shivDocument: l,
            createElement: s,
            createDocumentFragment: r
        };
        t.html5 = v, l(e)
    }(this, e), d._version = "2.7.1", d._domPrefixes = v, d._cssomPrefixes = g, d.testProp = function (t) {
        return r([t])
    }, d.testAllProps = l, d.prefixed = function (t, e, n) {
        return e ? l(t, e, n) : l(t, "pfx")
    }, u.className = u.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + " js " + w.join(" "), d
}(0, this.document), function (t, e, n) {
    function i(t) {
        return "[object Function]" == g.call(t)
    }

    function o(t) {
        return "string" == typeof t
    }

    function s() {
    }

    function r(t) {
        return !t || "loaded" == t || "complete" == t || "uninitialized" == t
    }

    function a() {
        var t = v.shift();
        y = 1, t ? t.t ? f(function () {
            ("c" == t.t ? u.injectCss : u.injectJs)(t.s, 0, t.a, t.x, t.e, 1)
        }, 0) : (t(), a()) : y = 0
    }

    function l(t, n, i, o, s, l, h) {
        function c(e) {
            if (!p && r(d.readyState) && (w.r = p = 1, !y && a(), d.onload = d.onreadystatechange = null, e)) {
                "img" != t && f(function () {
                    b.removeChild(d)
                }, 50);
                for (var i in S[n])S[n].hasOwnProperty(i) && S[n][i].onload()
            }
        }

        var h = h || u.errorTimeout, d = e.createElement(t), p = 0, g = 0, w = {t: i, s: n, e: s, a: l, x: h};
        1 === S[n] && (g = 1, S[n] = []), "object" == t ? d.data = n : (d.src = n, d.type = t), d.width = d.height = "0", d.onerror = d.onload = d.onreadystatechange = function () {
            c.call(this, g)
        }, v.splice(o, 0, w), "img" != t && (g || 2 === S[n] ? (b.insertBefore(d, _ ? null : m), f(c, h)) : S[n].push(d))
    }

    function h(t, e, n, i, s) {
        return y = 0, e = e || "j", o(t) ? l("c" == e ? E : T, t, e, this.i++, n, i, s) : (v.splice(this.i++, 0, t), 1 == v.length && a()), this
    }

    function c() {
        var t = u;
        return t.loader = {load: h, i: 0}, t
    }

    var d, u, p = e.documentElement, f = t.setTimeout, m = e.getElementsByTagName("script")[0], g = {}.toString, v = [],
        y = 0, w = "MozAppearance" in p.style, _ = w && !!e.createRange().compareNode, b = _ ? p : m.parentNode,
        p = t.opera && "[object Opera]" == g.call(t.opera), p = !!e.attachEvent && !p,
        T = w ? "object" : p ? "script" : "img", E = p ? "script" : T, C = Array.isArray || function (t) {
                return "[object Array]" == g.call(t)
            }, z = [], S = {}, I = {
            timeout: function (t, e) {
                return e.length && (t.timeout = e[0]), t
            }
        };
    u = function (t) {
        function e(t) {
            var e, n, i, t = t.split("!"), o = z.length, s = t.pop(), r = t.length,
                s = {url: s, origUrl: s, prefixes: t};
            for (n = 0; n < r; n++)i = t[n].split("="), (e = I[i.shift()]) && (s = e(s, i));
            for (n = 0; n < o; n++)s = z[n](s);
            return s
        }

        function r(t, o, s, r, a) {
            var l = e(t), h = l.autoCallback;
            l.url.split(".").pop().split("?").shift(), l.bypass || (o && (o = i(o) ? o : o[t] || o[r] || o[t.split("/").pop().split("?")[0]]), l.instead ? l.instead(t, o, s, r, a) : (S[l.url] ? l.noexec = !0 : S[l.url] = 1, s.load(l.url, l.forceCSS || !l.forceJS && "css" == l.url.split(".").pop().split("?").shift() ? "c" : n, l.noexec, l.attrs, l.timeout), (i(o) || i(h)) && s.load(function () {
                c(), o && o(l.origUrl, a, r), h && h(l.origUrl, a, r), S[l.url] = 2
            })))
        }

        function a(t, e) {
            function n(t, n) {
                if (t) {
                    if (o(t)) n || (d = function () {
                        var t = [].slice.call(arguments);
                        u.apply(this, t), p()
                    }), r(t, d, e, 0, h); else if (Object(t) === t)for (l in a = function () {
                        var e, n = 0;
                        for (e in t)t.hasOwnProperty(e) && n++;
                        return n
                    }(), t)t.hasOwnProperty(l) && (!n && !--a && (i(d) ? d = function () {
                        var t = [].slice.call(arguments);
                        u.apply(this, t), p()
                    } : d[l] = function (t) {
                        return function () {
                            var e = [].slice.call(arguments);
                            t && t.apply(this, e), p()
                        }
                    }(u[l])), r(t[l], d, e, l, h))
                } else!n && p()
            }

            var a, l, h = !!t.test, c = t.load || t.both, d = t.callback || s, u = d, p = t.complete || s;
            n(h ? t.yep : t.nope, !!c), c && n(c)
        }

        var l, h, d = this.yepnope.loader;
        if (o(t)) r(t, 0, d, 0); else if (C(t))for (l = 0; l < t.length; l++)h = t[l], o(h) ? r(h, 0, d, 0) : C(h) ? u(h) : Object(h) === h && a(h, d); else Object(t) === t && a(t, d)
    }, u.addPrefix = function (t, e) {
        I[t] = e
    }, u.addFilter = function (t) {
        z.push(t)
    }, u.errorTimeout = 1e4, null == e.readyState && e.addEventListener && (e.readyState = "loading", e.addEventListener("DOMContentLoaded", d = function () {
        e.removeEventListener("DOMContentLoaded", d, 0), e.readyState = "complete"
    }, 0)), t.yepnope = c(), t.yepnope.executeStack = a, t.yepnope.injectJs = function (t, n, i, o, l, h) {
        var c, d, p = e.createElement("script"), o = o || u.errorTimeout;
        p.src = t;
        for (d in i)p.setAttribute(d, i[d]);
        n = h ? a : n || s, p.onreadystatechange = p.onload = function () {
            !c && r(p.readyState) && (c = 1, n(), p.onload = p.onreadystatechange = null)
        }, f(function () {
            c || (c = 1, n(1))
        }, o), l ? p.onload() : m.parentNode.insertBefore(p, m)
    }, t.yepnope.injectCss = function (t, n, i, o, r, l) {
        var h, o = e.createElement("link"), n = l ? a : n || s;
        o.href = t, o.rel = "stylesheet", o.type = "text/css";
        for (h in i)o.setAttribute(h, i[h]);
        r || (m.parentNode.insertBefore(o, m), f(n, 0))
    }
}(this, document), Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0))
}, function (t, e) {
    "use strict";
    var n;
    if ("object" == typeof exports) {
        try {
            n = require("moment")
        } catch (t) {
        }
        module.exports = e(n)
    } else"function" == typeof define && define.amd ? define(function (t) {
        try {
            n = t("moment")
        } catch (t) {
        }
        return e(n)
    }) : t.Pikaday = e(t.moment)
}(this, function (t) {
    "use strict";
    var e = "function" == typeof t, n = !!window.addEventListener, i = window.document, o = window.setTimeout,
        s = function (t, e, i, o) {
            n ? t.addEventListener(e, i, !!o) : t.attachEvent("on" + e, i)
        }, r = function (t, e, i, o) {
            n ? t.removeEventListener(e, i, !!o) : t.detachEvent("on" + e, i)
        }, a = function (t, e, n) {
            var o;
            i.createEvent ? (o = i.createEvent("HTMLEvents"), o.initEvent(e, !0, !1), o = w(o, n), t.dispatchEvent(o)) : i.createEventObject && (o = i.createEventObject(), o = w(o, n), t.fireEvent("on" + e, o))
        }, l = function (t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
        }, h = function (t, e) {
            return -1 !== (" " + t.className + " ").indexOf(" " + e + " ")
        }, c = function (t, e) {
            h(t, e) || (t.className = "" === t.className ? e : t.className + " " + e)
        }, d = function (t, e) {
            t.className = l((" " + t.className + " ").replace(" " + e + " ", " "))
        }, u = function (t) {
            return /Array/.test(Object.prototype.toString.call(t))
        }, p = function (t) {
            return /Date/.test(Object.prototype.toString.call(t)) && !isNaN(t.getTime())
        }, f = function (t) {
            var e = t.getDay();
            return 0 === e || 6 === e
        }, m = function (t) {
            return t % 4 == 0 && t % 100 != 0 || t % 400 == 0
        }, g = function (t, e) {
            return [31, m(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
        }, v = function (t) {
            p(t) && t.setHours(0, 0, 0, 0)
        }, y = function (t, e) {
            return t.getTime() === e.getTime()
        }, w = function (t, e, n) {
            var i, o;
            for (i in e)o = void 0 !== t[i], o && "object" == typeof e[i] && null !== e[i] && void 0 === e[i].nodeName ? p(e[i]) ? n && (t[i] = new Date(e[i].getTime())) : u(e[i]) ? n && (t[i] = e[i].slice(0)) : t[i] = w({}, e[i], n) : !n && o || (t[i] = e[i]);
            return t
        }, _ = function (t) {
            return t.month < 0 && (t.year -= Math.ceil(Math.abs(t.month) / 12), t.month += 12), t.month > 11 && (t.year += Math.floor(Math.abs(t.month) / 12), t.month -= 12), t
        }, b = {
            field: null,
            bound: void 0,
            position: "bottom left",
            reposition: !0,
            format: "YYYY-MM-DD",
            defaultDate: null,
            setDefaultDate: !1,
            firstDay: 0,
            formatStrict: !1,
            minDate: null,
            maxDate: null,
            yearRange: 10,
            showWeekNumber: !1,
            minYear: 0,
            maxYear: 9999,
            minMonth: void 0,
            maxMonth: void 0,
            startRange: null,
            endRange: null,
            isRTL: !1,
            yearSuffix: "",
            showMonthAfterYear: !1,
            showDaysInNextAndPreviousMonths: !1,
            numberOfMonths: 1,
            mainCalendar: "left",
            container: void 0,
            i18n: {
                previousMonth: "Previous Month",
                nextMonth: "Next Month",
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            },
            theme: null,
            onSelect: null,
            onOpen: null,
            onClose: null,
            onDraw: null
        }, T = function (t, e, n) {
            for (e += t.firstDay; e >= 7;)e -= 7;
            return n ? t.i18n.weekdaysShort[e] : t.i18n.weekdays[e]
        }, E = function (t) {
            var e = [], n = "false";
            if (t.isEmpty) {
                if (!t.showDaysInNextAndPreviousMonths)return '<td class="is-empty"></td>';
                e.push("is-outside-current-month")
            }
            return t.isDisabled && e.push("is-disabled"), t.isToday && e.push("is-today"), t.isSelected && (e.push("is-selected"), n = "true"), t.isInRange && e.push("is-inrange"), t.isStartRange && e.push("is-startrange"), t.isEndRange && e.push("is-endrange"), '<td data-day="' + t.day + '" class="' + e.join(" ") + '" aria-selected="' + n + '"><button class="pika-button pika-day" type="button" data-pika-year="' + t.year + '" data-pika-month="' + t.month + '" data-pika-day="' + t.day + '">' + t.day + "</button></td>"
        }, C = function (t, e, n) {
            var i = new Date(n, 0, 1);
            return '<td class="pika-week">' + Math.ceil(((new Date(n, e, t) - i) / 864e5 + i.getDay() + 1) / 7) + "</td>"
        }, z = function (t, e) {
            return "<tr>" + (e ? t.reverse() : t).join("") + "</tr>"
        }, S = function (t) {
            return "<tbody>" + t.join("") + "</tbody>"
        }, I = function (t) {
            var e, n = [];
            for (t.showWeekNumber && n.push("<th></th>"), e = 0; e < 7; e++)n.push('<th scope="col"><abbr title="' + T(t, e) + '">' + T(t, e, !0) + "</abbr></th>");
            return "<thead><tr>" + (t.isRTL ? n.reverse() : n).join("") + "</tr></thead>"
        }, O = function (t, e, n, i, o, s) {
            var r, a, l, h, c, d = t._o, p = n === d.minYear, f = n === d.maxYear,
                m = '<div id="' + s + '" class="pika-title" role="heading" aria-live="assertive">', g = !0, v = !0;
            for (l = [], r = 0; r < 12; r++)l.push('<option value="' + (n === o ? r - e : 12 + r - e) + '"' + (r === i ? ' selected="selected"' : "") + (p && r < d.minMonth || f && r > d.maxMonth ? 'disabled="disabled"' : "") + ">" + d.i18n.months[r] + "</option>");
            for (h = '<div class="pika-label">' + d.i18n.months[i] + '<select class="pika-select pika-select-month" tabindex="-1">' + l.join("") + "</select></div>", u(d.yearRange) ? (r = d.yearRange[0], a = d.yearRange[1] + 1) : (r = n - d.yearRange, a = 1 + n + d.yearRange), l = []; r < a && r <= d.maxYear; r++)r >= d.minYear && l.push('<option value="' + r + '"' + (r === n ? ' selected="selected"' : "") + ">" + r + "</option>");
            return c = '<div class="pika-label">' + n + d.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + l.join("") + "</select></div>", d.showMonthAfterYear ? m += c + h : m += h + c, p && (0 === i || d.minMonth >= i) && (g = !1), f && (11 === i || d.maxMonth <= i) && (v = !1), 0 === e && (m += '<button class="pika-prev' + (g ? "" : " is-disabled") + '" type="button">' + d.i18n.previousMonth + "</button>"), e === t._o.numberOfMonths - 1 && (m += '<button class="pika-next' + (v ? "" : " is-disabled") + '" type="button">' + d.i18n.nextMonth + "</button>"), m += "</div>"
        }, L = function (t, e, n) {
            return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + n + '">' + I(t) + S(e) + "</table>"
        }, x = function (r) {
            var a = this, l = a.config(r);
            a._onMouseDown = function (t) {
                if (a._v) {
                    t = t || window.event;
                    var e = t.target || t.srcElement;
                    if (e)if (h(e, "is-disabled") || (!h(e, "pika-button") || h(e, "is-empty") || h(e.parentNode, "is-disabled") ? h(e, "pika-prev") ? a.prevMonth() : h(e, "pika-next") && a.nextMonth() : (a.setDate(new Date(e.getAttribute("data-pika-year"), e.getAttribute("data-pika-month"), e.getAttribute("data-pika-day"))), l.bound && o(function () {
                            a.hide(), l.field && l.field.blur()
                        }, 100))), h(e, "pika-select")) a._c = !0; else {
                        if (!t.preventDefault)return t.returnValue = !1, !1;
                        t.preventDefault()
                    }
                }
            }, a._onChange = function (t) {
                t = t || window.event;
                var e = t.target || t.srcElement;
                e && (h(e, "pika-select-month") ? a.gotoMonth(e.value) : h(e, "pika-select-year") && a.gotoYear(e.value))
            }, a._onKeyChange = function (t) {
                if (t = t || window.event, a.isVisible())switch (t.keyCode) {
                    case 13:
                    case 27:
                        l.field.blur();
                        break;
                    case 37:
                        t.preventDefault(), a.adjustDate("subtract", 1);
                        break;
                    case 38:
                        a.adjustDate("subtract", 7);
                        break;
                    case 39:
                        a.adjustDate("add", 1);
                        break;
                    case 40:
                        a.adjustDate("add", 7)
                }
            }, a._onInputChange = function (n) {
                var i;
                n.firedBy !== a && (e ? (i = t(l.field.value, l.format, l.formatStrict), i = i && i.isValid() ? i.toDate() : null) : i = new Date(Date.parse(l.field.value)), p(i) && a.setDate(i), a._v || a.show())
            }, a._onInputFocus = function () {
                a.show()
            }, a._onInputClick = function () {
                a.show()
            }, a._onInputBlur = function () {
                var t = i.activeElement;
                do {
                    if (h(t, "pika-single"))return
                } while (t = t.parentNode);
                a._c || (a._b = o(function () {
                    a.hide()
                }, 50)), a._c = !1
            }, a._onClick = function (t) {
                t = t || window.event;
                var e = t.target || t.srcElement, i = e;
                if (e) {
                    !n && h(e, "pika-select") && (e.onchange || (e.setAttribute("onchange", "return;"), s(e, "change", a._onChange)));
                    do {
                        if (h(i, "pika-single") || i === l.trigger)return
                    } while (i = i.parentNode);
                    a._v && e !== l.trigger && i !== l.trigger && a.hide()
                }
            }, a.el = i.createElement("div"), a.el.className = "pika-single" + (l.isRTL ? " is-rtl" : "") + (l.theme ? " " + l.theme : ""), s(a.el, "mousedown", a._onMouseDown, !0), s(a.el, "touchend", a._onMouseDown, !0), s(a.el, "change", a._onChange), s(i, "keydown", a._onKeyChange), l.field && (l.container ? l.container.appendChild(a.el) : l.bound ? i.body.appendChild(a.el) : l.field.parentNode.insertBefore(a.el, l.field.nextSibling), s(l.field, "change", a._onInputChange), l.defaultDate || (e && l.field.value ? l.defaultDate = t(l.field.value, l.format).toDate() : l.defaultDate = new Date(Date.parse(l.field.value)), l.setDefaultDate = !0));
            var c = l.defaultDate;
            p(c) ? l.setDefaultDate ? a.setDate(c, !0) : a.gotoDate(c) : a.gotoDate(new Date), l.bound ? (this.hide(), a.el.className += " is-bound", s(l.trigger, "click", a._onInputClick), s(l.trigger, "focus", a._onInputFocus), s(l.trigger, "blur", a._onInputBlur)) : this.show()
        };
    return x.prototype = {
        config: function (t) {
            this._o || (this._o = w({}, b, !0));
            var e = w(this._o, t, !0);
            e.isRTL = !!e.isRTL, e.field = e.field && e.field.nodeName ? e.field : null, e.theme = "string" == typeof e.theme && e.theme ? e.theme : null, e.bound = !!(void 0 !== e.bound ? e.field && e.bound : e.field), e.trigger = e.trigger && e.trigger.nodeName ? e.trigger : e.field, e.disableWeekends = !!e.disableWeekends, e.disableDayFn = "function" == typeof e.disableDayFn ? e.disableDayFn : null;
            var n = parseInt(e.numberOfMonths, 10) || 1;
            if (e.numberOfMonths = n > 4 ? 4 : n, p(e.minDate) || (e.minDate = !1), p(e.maxDate) || (e.maxDate = !1), e.minDate && e.maxDate && e.maxDate < e.minDate && (e.maxDate = e.minDate = !1), e.minDate && this.setMinDate(e.minDate), e.maxDate && this.setMaxDate(e.maxDate), u(e.yearRange)) {
                var i = (new Date).getFullYear() - 10;
                e.yearRange[0] = parseInt(e.yearRange[0], 10) || i, e.yearRange[1] = parseInt(e.yearRange[1], 10) || i
            } else e.yearRange = Math.abs(parseInt(e.yearRange, 10)) || b.yearRange, e.yearRange > 100 && (e.yearRange = 100);
            return e
        }, toString: function (n) {
            return p(this._d) ? e ? t(this._d).format(n || this._o.format) : this._d.toDateString() : ""
        }, getMoment: function () {
            return e ? t(this._d) : null
        }, setMoment: function (n, i) {
            e && t.isMoment(n) && this.setDate(n.toDate(), i)
        }, getDate: function () {
            return p(this._d) ? new Date(this._d.getTime()) : new Date
        }, setDate: function (t, e) {
            if (!t)return this._d = null, this._o.field && (this._o.field.value = "", a(this._o.field, "change", {firedBy: this})), this.draw();
            if ("string" == typeof t && (t = new Date(Date.parse(t))), p(t)) {
                var n = this._o.minDate, i = this._o.maxDate;
                p(n) && t < n ? t = n : p(i) && t > i && (t = i), this._d = new Date(t.getTime()), v(this._d), this.gotoDate(this._d), this._o.field && (this._o.field.value = this.toString(), a(this._o.field, "change", {firedBy: this})), e || "function" != typeof this._o.onSelect || this._o.onSelect.call(this, this.getDate())
            }
        }, gotoDate: function (t) {
            var e = !0;
            if (p(t)) {
                if (this.calendars) {
                    var n = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                        i = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
                        o = t.getTime();
                    i.setMonth(i.getMonth() + 1), i.setDate(i.getDate() - 1), e = o < n.getTime() || i.getTime() < o
                }
                e && (this.calendars = [{
                    month: t.getMonth(),
                    year: t.getFullYear()
                }], "right" === this._o.mainCalendar && (this.calendars[0].month += 1 - this._o.numberOfMonths)), this.adjustCalendars()
            }
        }, adjustDate: function (n, i) {
            var o, s = this.getDate(), r = 24 * parseInt(i) * 60 * 60 * 1e3;
            "add" === n ? o = new Date(s.valueOf() + r) : "subtract" === n && (o = new Date(s.valueOf() - r)), e && ("add" === n ? o = t(s).add(i, "days").toDate() : "subtract" === n && (o = t(s).subtract(i, "days").toDate())), this.setDate(o)
        }, adjustCalendars: function () {
            this.calendars[0] = _(this.calendars[0]);
            for (var t = 1; t < this._o.numberOfMonths; t++)this.calendars[t] = _({
                month: this.calendars[0].month + t,
                year: this.calendars[0].year
            });
            this.draw()
        }, gotoToday: function () {
            this.gotoDate(new Date)
        }, gotoMonth: function (t) {
            isNaN(t) || (this.calendars[0].month = parseInt(t, 10), this.adjustCalendars())
        }, nextMonth: function () {
            this.calendars[0].month++, this.adjustCalendars()
        }, prevMonth: function () {
            this.calendars[0].month--, this.adjustCalendars()
        }, gotoYear: function (t) {
            isNaN(t) || (this.calendars[0].year = parseInt(t, 10), this.adjustCalendars())
        }, setMinDate: function (t) {
            t instanceof Date ? (v(t), this._o.minDate = t, this._o.minYear = t.getFullYear(), this._o.minMonth = t.getMonth()) : (this._o.minDate = b.minDate, this._o.minYear = b.minYear, this._o.minMonth = b.minMonth, this._o.startRange = b.startRange), this.draw()
        }, setMaxDate: function (t) {
            t instanceof Date ? (v(t), this._o.maxDate = t, this._o.maxYear = t.getFullYear(), this._o.maxMonth = t.getMonth()) : (this._o.maxDate = b.maxDate, this._o.maxYear = b.maxYear, this._o.maxMonth = b.maxMonth, this._o.endRange = b.endRange), this.draw()
        }, setStartRange: function (t) {
            this._o.startRange = t
        }, setEndRange: function (t) {
            this._o.endRange = t
        }, draw: function (t) {
            if (this._v || t) {
                var e, n = this._o, i = n.minYear, s = n.maxYear, r = n.minMonth, a = n.maxMonth, l = "";
                this._y <= i && (this._y = i, !isNaN(r) && this._m < r && (this._m = r)), this._y >= s && (this._y = s, !isNaN(a) && this._m > a && (this._m = a)), e = "pika-title-" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 2);
                for (var h = 0; h < n.numberOfMonths; h++)l += '<div class="pika-lendar">' + O(this, h, this.calendars[h].year, this.calendars[h].month, this.calendars[0].year, e) + this.render(this.calendars[h].year, this.calendars[h].month, e) + "</div>";
                this.el.innerHTML = l, n.bound && "hidden" !== n.field.type && o(function () {
                    n.trigger.focus()
                }, 1), "function" == typeof this._o.onDraw && this._o.onDraw(this), n.bound && n.field.setAttribute("aria-label", "Use the arrow keys to pick a date")
            }
        }, adjustPosition: function () {
            var t, e, n, o, s, r, a, l, h, c;
            if (!this._o.container) {
                if (this.el.style.position = "absolute", t = this._o.trigger, e = t, n = this.el.offsetWidth, o = this.el.offsetHeight, s = window.innerWidth || i.documentElement.clientWidth, r = window.innerHeight || i.documentElement.clientHeight, a = window.pageYOffset || i.body.scrollTop || i.documentElement.scrollTop, "function" == typeof t.getBoundingClientRect) c = t.getBoundingClientRect(), l = c.left + window.pageXOffset, h = c.bottom + window.pageYOffset; else for (l = e.offsetLeft, h = e.offsetTop + e.offsetHeight; e = e.offsetParent;)l += e.offsetLeft, h += e.offsetTop;
                (this._o.reposition && l + n > s || this._o.position.indexOf("right") > -1 && l - n + t.offsetWidth > 0) && (l = l - n + t.offsetWidth), (this._o.reposition && h + o > r + a || this._o.position.indexOf("top") > -1 && h - o - t.offsetHeight > 0) && (h = h - o - t.offsetHeight), this.el.style.left = l + "px", this.el.style.top = h + "px"
            }
        }, render: function (t, e, n) {
            var i = this._o, o = new Date, s = g(t, e), r = new Date(t, e, 1).getDay(), a = [], l = [];
            v(o), i.firstDay > 0 && (r -= i.firstDay) < 0 && (r += 7);
            for (var h = 0 === e ? 11 : e - 1, c = 11 === e ? 0 : e + 1, d = 0 === e ? t - 1 : t, u = 11 === e ? t + 1 : t, m = g(d, h), w = s + r, _ = w; _ > 7;)_ -= 7;
            w += 7 - _;
            for (var b = 0, T = 0; b < w; b++) {
                var S = new Date(t, e, b - r + 1), I = !!p(this._d) && y(S, this._d), O = y(S, o),
                    x = b < r || b >= s + r, k = b - r + 1, A = e, W = t, D = i.startRange && y(i.startRange, S),
                    P = i.endRange && y(i.endRange, S),
                    H = i.startRange && i.endRange && i.startRange < S && S < i.endRange,
                    M = i.minDate && S < i.minDate || i.maxDate && S > i.maxDate || i.disableWeekends && f(S) || i.disableDayFn && i.disableDayFn(S);
                x && (b < r ? (k = m + k, A = h, W = d) : (k -= s, A = c, W = u));
                var N = {
                    day: k,
                    month: A,
                    year: W,
                    isSelected: I,
                    isToday: O,
                    isDisabled: M,
                    isEmpty: x,
                    isStartRange: D,
                    isEndRange: P,
                    isInRange: H,
                    showDaysInNextAndPreviousMonths: i.showDaysInNextAndPreviousMonths
                };
                l.push(E(N)), 7 == ++T && (i.showWeekNumber && l.unshift(C(b - r, e, t)), a.push(z(l, i.isRTL)), l = [], T = 0)
            }
            return L(i, a, n)
        }, isVisible: function () {
            return this._v
        }, show: function () {
            this.isVisible() || (d(this.el, "is-hidden"), this._v = !0, this.draw(), this._o.bound && (s(i, "click", this._onClick), this.adjustPosition()), "function" == typeof this._o.onOpen && this._o.onOpen.call(this))
        }, hide: function () {
            var t = this._v;
            !1 !== t && (this._o.bound && r(i, "click", this._onClick), this.el.style.position = "static", this.el.style.left = "auto", this.el.style.top = "auto", c(this.el, "is-hidden"), this._v = !1, void 0 !== t && "function" == typeof this._o.onClose && this._o.onClose.call(this))
        }, destroy: function () {
            this.hide(), r(this.el, "mousedown", this._onMouseDown, !0), r(this.el, "touchend", this._onMouseDown, !0), r(this.el, "change", this._onChange), this._o.field && (r(this._o.field, "change", this._onInputChange), this._o.bound && (r(this._o.trigger, "click", this._onInputClick), r(this._o.trigger, "focus", this._onInputFocus), r(this._o.trigger, "blur", this._onInputBlur))), this.el.parentNode && this.el.parentNode.removeChild(this.el)
        }
    }, x
}), document.addEventListener("DOMContentLoaded", function () {
    var t = function () {
        if ("scrollingElement" in document)return document.scrollingElement;
        var t = document.documentElement, e = t.scrollTop;
        t.scrollTop = e + 1;
        var n = t.scrollTop;
        return t.scrollTop = e, n > e ? t : document.body
    }(), e = function (e) {
        var n = t.scrollTop;
        if (2 > e.length) e = -n; else if (e = document.querySelector(e)) {
            e = e.getBoundingClientRect().top;
            var i = t.scrollHeight - window.innerHeight;
            e = n + e < i ? e : i - n
        } else e = void 0;
        if (e)return new Map([["start", n], ["delta", e]])
    }, n = function (n) {
        var i = n.getAttribute("href"), o = e(i);
        if (o) {
            var s = new Map([["duration", 800]]), r = performance.now();
            requestAnimationFrame(function e(n) {
                s.set("elapsed", n - r), n = s.get("duration");
                var a = s.get("elapsed"), l = o.get("start"), h = o.get("delta");
                t.scrollTop = Math.round(h * (1 - Math.pow(2, -10 * a / n)) + l), s.get("elapsed") < s.get("duration") ? requestAnimationFrame(e) : (history.pushState(null, null, i), t.scrollTop = o.get("start") + o.get("delta"))
            })
        }
    }, i = document.querySelectorAll("a.scroll"), o = i.length - 1;
    0 > o || function t(e, i) {
        var o = e.item(i);
        if (o.addEventListener("click", function (t) {
                t.preventDefault(), n(o)
            }), i)return t(e, i - 1)
    }(i, o)
}), function (t, e) {
    "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? module.exports = e() : t.ScrollTrigger = e()
}(this, function () {
    "use strict";
    return function (t, e, n) {
        function i() {
            var t = p.bindElement.scrollTop ? p.bindElement.scrollTop : document.documentElement.scrollTop,
                e = p.bindElement.scrollLeft ? p.bindElement.scrollLeft : document.documentElement.scrollLeft;
            h.left == e && h.top == t || p.scrollDidChange(), a.length > 0 || l.length > 0 ? (d = !0, c(i)) : d = !1
        }

        function o(t, e) {
            var n = e.split("("), i = n[0];
            if (n.length > 1 ? (n = n[1].split(")")[0], n = n.indexOf("', '") > -1 ? n.split("', '") : n.indexOf("','") > -1 ? n.split("','") : n.indexOf('", "') > -1 ? n.split('", "') : n.indexOf('","') > -1 ? n.split('","') : [n]) : n = [], n = n.map(function (t) {
                    return s(t)
                }), "function" == typeof p.callScope[i])try {
                p.callScope[i].apply(t.element, n)
            } catch (t) {
                try {
                    p.callScope[i].apply(null, n)
                } catch (t) {
                }
            }
        }

        function s(t) {
            return t += "", '"' == t[0] && (t = t.substr(1)), "'" == t[0] && (t = t.substr(1)), '"' == t[t.length - 1] && (t = t.substr(0, t.length - 1)), "'" == t[t.length - 1] && (t = t.substr(0, t.length - 1)), t
        }

        var r = function (t, e) {
            this.element = e, this.defaultOptions = t, this.showCallback = null, this.hideCallback = null, this.visibleClass = "visible", this.hiddenClass = "invisible", this.addWidth = !1, this.addHeight = !1, this.once = !1;
            var n = 0, i = 0;
            this.left = function (t) {
                return function () {
                    return t.element.getBoundingClientRect().left
                }
            }(this), this.top = function (t) {
                return function () {
                    return t.element.getBoundingClientRect().top
                }
            }(this), this.xOffset = function (t) {
                return function (e) {
                    var i = n;
                    return t.addWidth && !e ? i += t.width() : e && !t.addWidth && (i -= t.width()), i
                }
            }(this), this.yOffset = function (t) {
                return function (e) {
                    var n = i;
                    return t.addHeight && !e ? n += t.height() : e && !t.addHeight && (n -= t.height()), n
                }
            }(this), this.width = function (t) {
                return function () {
                    return t.element.offsetWidth
                }
            }(this), this.height = function (t) {
                return function () {
                    return t.element.offsetHeight
                }
            }(this), this.reset = function (t) {
                return function () {
                    t.removeClass(t.visibleClass), t.removeClass(t.hiddenClass)
                }
            }(this), this.addClass = function (t) {
                var e = function (e, n) {
                    t.element.classList.contains(e) || (t.element.classList.add(e), "function" == typeof n && n())
                }, n = function (e, n) {
                    e = e.trim();
                    var i = new RegExp("(?:^|\\s)" + e + "(?:(\\s\\w)|$)", "ig"), o = t.element.className;
                    i.test(o) || (t.element.className += " " + e, "function" == typeof n && n())
                };
                return t.element.classList ? e : n
            }(this), this.removeClass = function (t) {
                var e = function (e, n) {
                    t.element.classList.contains(e) && (t.element.classList.remove(e), "function" == typeof n && n())
                }, n = function (e, n) {
                    e = e.trim();
                    var i = new RegExp("(?:^|\\s)" + e + "(?:(\\s\\w)|$)", "ig"), o = t.element.className;
                    i.test(o) && (t.element.className = o.replace(i, "$1").trim(), "function" == typeof n && n())
                };
                return t.element.classList ? e : n
            }(this), this.init = function (t) {
                return function () {
                    var e = t.defaultOptions, o = t.element.getAttribute("data-scroll");
                    e && (e.toggle && e.toggle.visible && (t.visibleClass = e.toggle.visible), e.toggle && e.toggle.hidden && (t.hiddenClass = e.toggle.hidden), e.showCallback && (t.showCallback = e.showCallback), e.hideCallback && (t.hideCallback = e.hideCallback), !0 === e.centerHorizontal && (n = t.element.offsetWidth / 2), !0 === e.centerVertical && (i = t.element.offsetHeight / 2), e.offset && e.offset.x && (n += e.offset.x), e.offset && e.offset.y && (i += e.offset.y), e.addWidth && (t.addWidth = e.addWidth), e.addHeight && (t.addHeight = e.addHeight), e.once && (t.once = e.once));
                    var s = o.indexOf("addWidth") > -1, r = o.indexOf("addHeight") > -1, a = o.indexOf("once") > -1;
                    !1 === t.addWidth && !0 === s && (t.addWidth = s), !1 === t.addHeight && !0 === r && (t.addHeight = r), !1 === t.once && !0 === a && (t.once = a), t.showCallback = t.element.hasAttribute("data-scroll-showCallback") ? t.element.getAttribute("data-scroll-showCallback") : t.showCallback, t.hideCallback = t.element.hasAttribute("data-scroll-hideCallback") ? t.element.getAttribute("data-scroll-hideCallback") : t.hideCallback;
                    var l = o.split("toggle(");
                    if (l.length > 1) {
                        var h = l[1].split(")")[0].split(",");
                        String.prototype.trim || (String.prototype.trim = function () {
                            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                        }), t.visibleClass = h[0].trim().replace(".", ""), t.hiddenClass = h[1].trim().replace(".", "")
                    }
                    o.indexOf("centerHorizontal") > -1 && (n = t.element.offsetWidth / 2), o.indexOf("centerVertical") > -1 && (i = t.element.offsetHeight / 2);
                    var c = o.split("offset(");
                    if (c.length > 1) {
                        var d = c[1].split(")")[0].split(",");
                        n += parseInt(d[0].replace("px", "")), i += parseInt(d[1].replace("px", ""))
                    }
                    return t
                }
            }(this)
        };
        this.scrollElement = window, this.bindElement = document.body, this.callScope = window;
        var a = [], l = [], h = {left: -1, top: -1},
            c = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (t) {
                    setTimeout(t, 1e3 / 60)
                }, d = !1, u = function (t) {
                return function (e, n, i) {
                    return t.bindElement = void 0 != n && null != n ? n : document.body, t.scrollElement = void 0 != i && null != i ? i : window, t.bind(t.bindElement.querySelectorAll("[data-scroll]")), t
                }
            }(this);
        this.bind = function (e) {
            return function (n) {
                n instanceof HTMLElement && (n = [n]);
                var o = [].slice.call(n);
                return o = o.map(function (e, n) {
                    return new r(t, e).init()
                }), a = a.concat(o), a.length > 0 && 0 == d ? (d = !0, i()) : d = !1, e
            }
        }(this), this.triggerFor = function (t) {
            return function (t) {
                var e = null;
                return a.each(function (n, i) {
                    n.element == t && (e = n)
                }), e
            }
        }(), this.destroy = function (t) {
            return function (e) {
                return a.each(function (t, n) {
                    t.element == e && a.splice(n, 1)
                }), t
            }
        }(this), this.destroyAll = function (t) {
            return function () {
                return a = [], t
            }
        }(this), this.reset = function (t) {
            return function (e) {
                var n = t.triggerFor(e);
                if (null != n) {
                    n.reset();
                    var i = a.indexOf(n);
                    i > -1 && a.splice(i, 1)
                }
                return t
            }
        }(this), this.resetAll = function (t) {
            return function () {
                return a.each(function (t, e) {
                    t.reset()
                }), a = [], t
            }
        }(this), this.attach = function (t) {
            return function (e) {
                return l.push(e), d || (d = !0, i()), t
            }
        }(this), this.detach = function (t) {
            return function (e) {
                var n = l.indexOf(e);
                return n > -1 && l.splice(n, 1), t
            }
        }(this);
        var p = this;
        return this.scrollDidChange = function (t) {
            return function () {
                var e = t.scrollElement.innerWidth || t.scrollElement.offsetWidth,
                    n = t.scrollElement.innerHeight || t.scrollElement.offsetHeight,
                    i = t.bindElement.scrollTop ? t.bindElement.scrollTop : document.documentElement.scrollTop,
                    s = t.bindElement.scrollLeft ? t.bindElement.scrollLeft : document.documentElement.scrollLeft,
                    r = [];
                a.each(function (t, a) {
                    var l = t.left(), c = t.top();
                    h.left > s ? l -= t.xOffset(!0) : h.left < s && (l += t.xOffset(!1)), h.top > i ? c -= t.yOffset(!0) : h.top < i && (c += t.yOffset(!1)), l < e && l >= 0 && c < n && c >= 0 ? (t.addClass(t.visibleClass, function () {
                        t.showCallback && o(t, t.showCallback)
                    }), t.removeClass(t.hiddenClass), t.once && r.push(t)) : (t.addClass(t.hiddenClass), t.removeClass(t.visibleClass, function () {
                        t.hideCallback && o(t, t.hideCallback)
                    }))
                }), l.each(function (o) {
                    o.call(t, s, i, e, n)
                }), r.each(function (t) {
                    var e = a.indexOf(t);
                    e > -1 && a.splice(e, 1)
                }), h.left = s, h.top = i
            }
        }(this), Array.prototype.each = function (t) {
            for (var e = this.length, n = 0; n < e; n++) {
                var i = this[n];
                i && t(i, n)
            }
        }, u(t, e, n)
    }
}), function (t, e, n) {
    "use strict";
    function i(n) {
        if (o = e.documentElement, s = e.body, R(), et = this, n = n || {}, rt = n.constants || {}, n.easing)for (var i in n.easing)B[i] = n.easing[i];
        pt = n.edgeStrategy || "set", ot = {
            beforerender: n.beforerender,
            render: n.render,
            keyframe: n.keyframe
        }, st = !1 !== n.forceHeight, st && (xt = n.scale || 1), at = n.mobileDeceleration || E, ht = !1 !== n.smoothScrolling, ct = n.smoothScrollingDuration || z, dt = {targetTop: et.getScrollTop()}, Nt = (n.mobileCheck || function () {
            return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || t.opera)
        })(), Nt ? (it = e.getElementById(n.skrollrBody || C), it && tt(), $(), Ct(o, [y, b], [w])) : Ct(o, [y, _], [w]), et.refresh(), gt(t, "resize orientationchange", function () {
            var t = o.clientWidth, e = o.clientHeight;
            (e !== Pt || t !== Dt) && (Pt = e, Dt = t, Ht = !0)
        });
        var r = F();
        return function t() {
            U(), mt = r(t)
        }(), et
    }

    var o, s, r = {
            get: function () {
                return et
            }, init: function (t) {
                return et || new i(t)
            }, VERSION: "0.6.30"
        }, a = Object.prototype.hasOwnProperty, l = t.Math, h = t.getComputedStyle, c = "touchstart", d = "touchmove",
        u = "touchcancel", p = "touchend", f = "skrollable", m = f + "-before", g = f + "-between", v = f + "-after",
        y = "skrollr", w = "no-" + y, _ = y + "-desktop", b = y + "-mobile", T = "linear", E = .004, C = "skrollr-body",
        z = 200, S = "center", I = "bottom", O = "___skrollable_id", L = /^(?:input|textarea|button|select)$/i,
        x = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi, k = /-([a-z0-9_])/g, A = function (t, e) {
            return e.toUpperCase()
        }, W = /[\-+]?[\d]*\.?[\d]+/g, D = /\{\?\}/g, P = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,
        H = /[a-z\-]+-gradient/g, M = "", N = "", R = function () {
            var t = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
            if (h) {
                var e = h(s, null);
                for (var n in e)if (M = n.match(t) || +n == n && e[n].match(t))break;
                if (!M)return void(M = N = "");
                M = M[0], "-" === M.slice(0, 1) ? (N = M, M = {
                    "-webkit-": "webkit",
                    "-moz-": "Moz",
                    "-ms-": "ms",
                    "-o-": "O"
                }[M]) : N = "-" + M.toLowerCase() + "-"
            }
        }, F = function () {
            var e = t.requestAnimationFrame || t[M.toLowerCase() + "RequestAnimationFrame"], n = It();
            return (Nt || !e) && (e = function (e) {
                var i = It() - n, o = l.max(0, 1e3 / 60 - i);
                return t.setTimeout(function () {
                    n = It(), e()
                }, o)
            }), e
        }, j = function () {
            var e = t.cancelAnimationFrame || t[M.toLowerCase() + "CancelAnimationFrame"];
            return (Nt || !e) && (e = function (e) {
                return t.clearTimeout(e)
            }), e
        }, B = {
            begin: function () {
                return 0
            }, end: function () {
                return 1
            }, linear: function (t) {
                return t
            }, quadratic: function (t) {
                return t * t
            }, cubic: function (t) {
                return t * t * t
            }, swing: function (t) {
                return -l.cos(t * l.PI) / 2 + .5
            }, sqrt: function (t) {
                return l.sqrt(t)
            }, outCubic: function (t) {
                return l.pow(t - 1, 3) + 1
            }, bounce: function (t) {
                var e;
                if (.5083 >= t) e = 3; else if (.8489 >= t) e = 9; else if (.96208 >= t) e = 27; else {
                    if (!(.99981 >= t))return 1;
                    e = 91
                }
                return 1 - l.abs(3 * l.cos(t * e * 1.028) / e)
            }
        };
    i.prototype.refresh = function (t) {
        var i, o, s = !1;
        for (t === n ? (s = !0, nt = [], Mt = 0, t = e.getElementsByTagName("*")) : t.length === n && (t = [t]), i = 0, o = t.length; o > i; i++) {
            var r = t[i], a = r, l = [], h = ht, c = pt, d = !1;
            if (s && O in r && delete r[O], r.attributes) {
                for (var u = 0, p = r.attributes.length; p > u; u++) {
                    var m = r.attributes[u];
                    if ("data-anchor-target" !== m.name)if ("data-smooth-scrolling" !== m.name)if ("data-edge-strategy" !== m.name)if ("data-emit-events" !== m.name) {
                        var g = m.name.match(/^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/);
                        if (null !== g) {
                            var v = {props: m.value, element: r, eventType: m.name.replace(k, A)};
                            l.push(v);
                            var y = g[1];
                            y && (v.constant = y.substr(1));
                            var w = g[2];
                            /p$/.test(w) ? (v.isPercentage = !0, v.offset = (0 | w.slice(0, -1)) / 100) : v.offset = 0 | w;
                            var _ = g[3], b = g[4] || _;
                            _ && "start" !== _ && "end" !== _ ? (v.mode = "relative", v.anchors = [_, b]) : (v.mode = "absolute", "end" === _ ? v.isEnd = !0 : v.isPercentage || (v.offset = v.offset * xt))
                        }
                    } else d = !0; else c = m.value; else h = "off" !== m.value; else if (null === (a = e.querySelector(m.value)))throw'Unable to find anchor target "' + m.value + '"'
                }
                if (l.length) {
                    var T, E, C;
                    !s && O in r ? (C = r[O], T = nt[C].styleAttr, E = nt[C].classAttr) : (C = r[O] = Mt++, T = r.style.cssText, E = Et(r)), nt[C] = {
                        element: r,
                        styleAttr: T,
                        classAttr: E,
                        anchorTarget: a,
                        keyFrames: l,
                        smoothScrolling: h,
                        edgeStrategy: c,
                        emitEvents: d,
                        lastFrameIndex: -1
                    }, Ct(r, [f], [])
                }
            }
        }
        for (_t(), i = 0, o = t.length; o > i; i++) {
            var z = nt[t[i][O]];
            z !== n && (q(z), K(z))
        }
        return et
    }, i.prototype.relativeToAbsolute = function (t, e, n) {
        var i = o.clientHeight, s = t.getBoundingClientRect(), r = s.top, a = s.bottom - s.top;
        return e === I ? r -= i : e === S && (r -= i / 2), n === I ? r += a : n === S && (r += a / 2), (r += et.getScrollTop()) + .5 | 0
    }, i.prototype.animateTo = function (t, e) {
        e = e || {};
        var i = It(), o = et.getScrollTop(), s = e.duration === n ? 1e3 : e.duration;
        return lt = {
            startTop: o,
            topDiff: t - o,
            targetTop: t,
            duration: s,
            startTime: i,
            endTime: i + s,
            easing: B[e.easing || T],
            done: e.done
        }, lt.topDiff || (lt.done && lt.done.call(et, !1), lt = n), et
    }, i.prototype.stopAnimateTo = function () {
        lt && lt.done && lt.done.call(et, !0), lt = n
    }, i.prototype.isAnimatingTo = function () {
        return !!lt
    }, i.prototype.isMobile = function () {
        return Nt
    }, i.prototype.setScrollTop = function (e, n) {
        return ut = !0 === n, Nt ? Rt = l.min(l.max(e, 0), Lt) : t.scrollTo(0, e), et
    }, i.prototype.getScrollTop = function () {
        return Nt ? Rt : t.pageYOffset || o.scrollTop || s.scrollTop || 0
    }, i.prototype.getMaxScrollTop = function () {
        return Lt
    }, i.prototype.on = function (t, e) {
        return ot[t] = e, et
    }, i.prototype.off = function (t) {
        return delete ot[t], et
    }, i.prototype.destroy = function () {
        j()(mt), yt(), Ct(o, [w], [y, _, b]);
        for (var t = 0, e = nt.length; e > t; t++)J(nt[t].element);
        o.style.overflow = s.style.overflow = "", o.style.height = s.style.height = "", it && r.setStyle(it, "transform", "none"), et = n, it = n, ot = n, st = n, Lt = 0, xt = 1, rt = n, at = n, kt = "down", At = -1, Dt = 0, Pt = 0, Ht = !1, lt = n, ht = n, ct = n, dt = n, ut = n, Mt = 0, pt = n, Nt = !1, Rt = 0, ft = n
    };
    var $ = function () {
        var i, r, a, h, f, m, g, v, y, w, _, b;
        gt(o, [c, d, u, p].join(" "), function (t) {
            var o = t.changedTouches[0];
            for (h = t.target; 3 === h.nodeType;)h = h.parentNode;
            switch (f = o.clientY, m = o.clientX, w = t.timeStamp, L.test(h.tagName) || t.preventDefault(), t.type) {
                case c:
                    i && i.blur(), et.stopAnimateTo(), i = h, r = g = f, a = m, y = w;
                    break;
                case d:
                    L.test(h.tagName) && e.activeElement !== h && t.preventDefault(), v = f - g, b = w - _, et.setScrollTop(Rt - v, !0), g = f, _ = w;
                    break;
                default:
                case u:
                case p:
                    var s = r - f, T = a - m;
                    if (49 > T * T + s * s) {
                        if (!L.test(i.tagName)) {
                            i.focus();
                            var E = e.createEvent("MouseEvents");
                            E.initMouseEvent("click", !0, !0, t.view, 1, o.screenX, o.screenY, o.clientX, o.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null), i.dispatchEvent(E)
                        }
                        return
                    }
                    i = n;
                    var C = v / b;
                    C = l.max(l.min(C, 3), -3);
                    var z = l.abs(C / at), S = C * z + .5 * at * z * z, I = et.getScrollTop() - S, O = 0;
                    I > Lt ? (O = (Lt - I) / S, I = Lt) : 0 > I && (O = -I / S, I = 0), z *= 1 - O, et.animateTo(I + .5 | 0, {
                        easing: "outCubic",
                        duration: z
                    })
            }
        }), t.scrollTo(0, 0), o.style.overflow = s.style.overflow = "hidden"
    }, V = function () {
        var t, e, n, i, s, r, a, h, c, d, u, p = o.clientHeight, f = bt();
        for (h = 0, c = nt.length; c > h; h++)for (t = nt[h], e = t.element, n = t.anchorTarget, i = t.keyFrames, s = 0, r = i.length; r > s; s++)a = i[s], d = a.offset, u = f[a.constant] || 0, a.frame = d, a.isPercentage && (d *= p, a.frame = d), "relative" === a.mode && (J(e), a.frame = et.relativeToAbsolute(n, a.anchors[0], a.anchors[1]) - d, J(e, !0)), a.frame += u, st && !a.isEnd && a.frame > Lt && (Lt = a.frame);
        for (Lt = l.max(Lt, Tt()), h = 0, c = nt.length; c > h; h++) {
            for (t = nt[h], i = t.keyFrames, s = 0, r = i.length; r > s; s++)a = i[s], u = f[a.constant] || 0, a.isEnd && (a.frame = Lt - a.offset + u);
            t.keyFrames.sort(Ot)
        }
    }, Y = function (t, e) {
        for (var n = 0, i = nt.length; i > n; n++) {
            var o, s, l = nt[n], h = l.element, c = l.smoothScrolling ? t : e, d = l.keyFrames, u = d.length, p = d[0],
                y = d[d.length - 1], w = c < p.frame, _ = c > y.frame, b = w ? p : y, T = l.emitEvents,
                E = l.lastFrameIndex;
            if (w || _) {
                if (w && -1 === l.edge || _ && 1 === l.edge)continue;
                switch (w ? (Ct(h, [m], [v, g]), T && E > -1 && (wt(h, p.eventType, kt), l.lastFrameIndex = -1)) : (Ct(h, [v], [m, g]), T && u > E && (wt(h, y.eventType, kt), l.lastFrameIndex = u)), l.edge = w ? -1 : 1, l.edgeStrategy) {
                    case"reset":
                        J(h);
                        continue;
                    case"ease":
                        c = b.frame;
                        break;
                    default:
                    case"set":
                        var C = b.props;
                        for (o in C)a.call(C, o) && (s = X(C[o].value), 0 === o.indexOf("@") ? h.setAttribute(o.substr(1), s) : r.setStyle(h, o, s));
                        continue
                }
            } else 0 !== l.edge && (Ct(h, [f, g], [m, v]), l.edge = 0);
            for (var z = 0; u - 1 > z; z++)if (c >= d[z].frame && c <= d[z + 1].frame) {
                var S = d[z], I = d[z + 1];
                for (o in S.props)if (a.call(S.props, o)) {
                    var O = (c - S.frame) / (I.frame - S.frame);
                    O = S.props[o].easing(O), s = Q(S.props[o].value, I.props[o].value, O), s = X(s), 0 === o.indexOf("@") ? h.setAttribute(o.substr(1), s) : r.setStyle(h, o, s)
                }
                T && E !== z && ("down" === kt ? wt(h, S.eventType, kt) : wt(h, I.eventType, kt), l.lastFrameIndex = z);
                break
            }
        }
    }, U = function () {
        Ht && (Ht = !1, _t());
        var t, e, i = et.getScrollTop(), o = It();
        if (lt) o >= lt.endTime ? (i = lt.targetTop, t = lt.done, lt = n) : (e = lt.easing((o - lt.startTime) / lt.duration), i = lt.startTop + e * lt.topDiff | 0), et.setScrollTop(i, !0); else if (!ut) {
            var s = dt.targetTop - i;
            s && (dt = {
                startTop: At,
                topDiff: i - At,
                targetTop: i,
                startTime: Wt,
                endTime: Wt + ct
            }), o <= dt.endTime && (e = B.sqrt((o - dt.startTime) / ct), i = dt.startTop + e * dt.topDiff | 0)
        }
        if (ut || At !== i) {
            kt = i > At ? "down" : At > i ? "up" : kt, ut = !1;
            var a = {curTop: i, lastTop: At, maxTop: Lt, direction: kt};
            !1 !== (ot.beforerender && ot.beforerender.call(et, a)) && (Y(i, et.getScrollTop()), Nt && it && r.setStyle(it, "transform", "translate(0, " + -Rt + "px) " + ft), At = i, ot.render && ot.render.call(et, a)), t && t.call(et, !1)
        }
        Wt = o
    }, q = function (t) {
        for (var e = 0, n = t.keyFrames.length; n > e; e++) {
            for (var i, o, s, r, a = t.keyFrames[e], l = {}; null !== (r = x.exec(a.props));)s = r[1], o = r[2], i = s.match(/^(@?[a-z\-]+)\[(\w+)\]$/), null !== i ? (s = i[1], i = i[2]) : i = T, o = o.indexOf("!") ? G(o) : [o.slice(1)], l[s] = {
                value: o,
                easing: B[i]
            };
            a.props = l
        }
    }, G = function (t) {
        var e = [];
        return P.lastIndex = 0, t = t.replace(P, function (t) {
            return t.replace(W, function (t) {
                return t / 255 * 100 + "%"
            })
        }), N && (H.lastIndex = 0, t = t.replace(H, function (t) {
            return N + t
        })), t = t.replace(W, function (t) {
            return e.push(+t), "{?}"
        }), e.unshift(t), e
    }, K = function (t) {
        var e, n, i = {};
        for (e = 0, n = t.keyFrames.length; n > e; e++)Z(t.keyFrames[e], i);
        for (i = {}, e = t.keyFrames.length - 1; e >= 0; e--)Z(t.keyFrames[e], i)
    }, Z = function (t, e) {
        var n;
        for (n in e)a.call(t.props, n) || (t.props[n] = e[n]);
        for (n in t.props)e[n] = t.props[n]
    }, Q = function (t, e, n) {
        var i, o = t.length;
        if (o !== e.length)throw"Can't interpolate between \"" + t[0] + '" and "' + e[0] + '"';
        var s = [t[0]];
        for (i = 1; o > i; i++)s[i] = t[i] + (e[i] - t[i]) * n;
        return s
    }, X = function (t) {
        var e = 1;
        return D.lastIndex = 0, t[0].replace(D, function () {
            return t[e++]
        })
    }, J = function (t, e) {
        t = [].concat(t);
        for (var n, i, o = 0, s = t.length; s > o; o++)i = t[o], (n = nt[i[O]]) && (e ? (i.style.cssText = n.dirtyStyleAttr, Ct(i, n.dirtyClassAttr)) : (n.dirtyStyleAttr = i.style.cssText, n.dirtyClassAttr = Et(i), i.style.cssText = n.styleAttr, Ct(i, n.classAttr)))
    }, tt = function () {
        ft = "translateZ(0)", r.setStyle(it, "transform", ft);
        var t = h(it), e = t.getPropertyValue("transform"), n = t.getPropertyValue(N + "transform");
        e && "none" !== e || n && "none" !== n || (ft = "")
    };
    r.setStyle = function (t, e, n) {
        var i = t.style;
        if ("zIndex" === (e = e.replace(k, A).replace("-", ""))) isNaN(n) ? i[e] = n : i[e] = "" + (0 | n); else if ("float" === e) i.styleFloat = i.cssFloat = n; else try {
            M && (i[M + e.slice(0, 1).toUpperCase() + e.slice(1)] = n), i[e] = n
        } catch (t) {
        }
    };
    var et, nt, it, ot, st, rt, at, lt, ht, ct, dt, ut, pt, ft, mt, gt = r.addEvent = function (e, n, i) {
        var o = function (e) {
            return e = e || t.event, e.target || (e.target = e.srcElement), e.preventDefault || (e.preventDefault = function () {
                e.returnValue = !1, e.defaultPrevented = !0
            }), i.call(this, e)
        };
        n = n.split(" ");
        for (var s, r = 0, a = n.length; a > r; r++)s = n[r], e.addEventListener ? e.addEventListener(s, i, !1) : e.attachEvent("on" + s, o), Ft.push({
            element: e,
            name: s,
            listener: i
        })
    }, vt = r.removeEvent = function (t, e, n) {
        e = e.split(" ");
        for (var i = 0, o = e.length; o > i; i++)t.removeEventListener ? t.removeEventListener(e[i], n, !1) : t.detachEvent("on" + e[i], n)
    }, yt = function () {
        for (var t, e = 0, n = Ft.length; n > e; e++)t = Ft[e], vt(t.element, t.name, t.listener);
        Ft = []
    }, wt = function (t, e, n) {
        ot.keyframe && ot.keyframe.call(et, t, e, n)
    }, _t = function () {
        var t = et.getScrollTop();
        Lt = 0, st && !Nt && (s.style.height = ""), V(), st && !Nt && (s.style.height = Lt + o.clientHeight + "px"), Nt ? et.setScrollTop(l.min(et.getScrollTop(), Lt)) : et.setScrollTop(t, !0), ut = !0
    }, bt = function () {
        var t, e, n = o.clientHeight, i = {};
        for (t in rt)e = rt[t], "function" == typeof e ? e = e.call(et) : /p$/.test(e) && (e = e.slice(0, -1) / 100 * n), i[t] = e;
        return i
    }, Tt = function () {
        var t = 0;
        return it && (t = l.max(it.offsetHeight, it.scrollHeight)), l.max(t, s.scrollHeight, s.offsetHeight, o.scrollHeight, o.offsetHeight, o.clientHeight) - o.clientHeight
    }, Et = function (e) {
        var n = "className";
        return t.SVGElement && e instanceof t.SVGElement && (e = e[n], n = "baseVal"), e[n]
    }, Ct = function (e, i, o) {
        var s = "className";
        if (t.SVGElement && e instanceof t.SVGElement && (e = e[s], s = "baseVal"), o === n)return void(e[s] = i);
        for (var r = e[s], a = 0, l = o.length; l > a; a++)r = St(r).replace(St(o[a]), " ");
        r = zt(r);
        for (var h = 0, c = i.length; c > h; h++)-1 === St(r).indexOf(St(i[h])) && (r += " " + i[h]);
        e[s] = zt(r)
    }, zt = function (t) {
        return t.replace(/^\s+|\s+$/g, "")
    }, St = function (t) {
        return " " + t + " "
    }, It = Date.now || function () {
            return +new Date
        }, Ot = function (t, e) {
        return t.frame - e.frame
    }, Lt = 0, xt = 1, kt = "down", At = -1, Wt = It(), Dt = 0, Pt = 0, Ht = !1, Mt = 0, Nt = !1, Rt = 0, Ft = [];
    "function" == typeof define && define.amd ? define([], function () {
        return r
    }) : "undefined" != typeof module && module.exports ? module.exports = r : t.skrollr = r
}(window, document), "function" != typeof Object.create && (Object.create = function (t) {
    function e() {
    }

    return e.prototype = t, new e
}), function (t, e, n) {
    var i = function (t) {
        var i = n.createElement("script"), s = n.getElementsByTagName("head")[0];
        "file://" == e.location.origin ? i.src = "http://www.youtube.com/iframe_api" : i.src = "//www.youtube.com/iframe_api", s.appendChild(i), s = null, i = null, o(t)
    }, o = function (n) {
        "undefined" == typeof YT && void 0 === e.loadingPlayer ? (e.loadingPlayer = !0, e.dfd = t.Deferred(), e.onYouTubeIframeAPIReady = function () {
            e.onYouTubeIframeAPIReady = null, e.dfd.resolve("done"), n()
        }) : "object" == typeof YT ? n() : e.dfd.done(function (t) {
            n()
        })
    };
    YTPlayer = {
        player: null,
        defaults: {
            ratio: 16 / 9,
            videoId: "LSmgKRx5pBo",
            mute: !0,
            repeat: !0,
            width: t(e).width(),
            playButtonClass: "YTPlayer-play",
            pauseButtonClass: "YTPlayer-pause",
            muteButtonClass: "YTPlayer-mute",
            volumeUpClass: "YTPlayer-volume-up",
            volumeDownClass: "YTPlayer-volume-down",
            start: 0,
            pauseOnScroll: !1,
            fitToBackground: !0,
            playerVars: {
                iv_load_policy: 3,
                modestbranding: 1,
                autoplay: 1,
                controls: 0,
                showinfo: 0,
                wmode: "opaque",
                branding: 0,
                autohide: 0
            },
            events: null
        },
        init: function (n, o) {
            var s = this;
            return s.userOptions = o, s.$body = t("body"), s.$node = t(n), s.$window = t(e), s.defaults.events = {
                onReady: function (t) {
                    s.onPlayerReady(t), s.options.pauseOnScroll && s.pauseOnScroll(), "function" == typeof s.options.callback && s.options.callback.call(this)
                }, onStateChange: function (t) {
                    1 === t.data ? (s.$node.find("img").fadeOut(400), s.$node.addClass("loaded")) : 0 === t.data && s.options.repeat && s.player.seekTo(s.options.start)
                }
            }, s.options = t.extend(!0, {}, s.defaults, s.userOptions), s.options.height = Math.ceil(s.options.width / s.options.ratio), s.ID = (new Date).getTime(), s.holderID = "YTPlayer-ID-" + s.ID, s.options.fitToBackground ? s.createBackgroundVideo() : s.createContainerVideo(), s.$window.on("resize.YTplayer" + s.ID, function () {
                s.resize(s)
            }), i(s.onYouTubeIframeAPIReady.bind(s)), s.resize(s), s
        },
        pauseOnScroll: function () {
            var t = this;
            t.$window.on("scroll.YTplayer" + t.ID, function () {
                1 === t.player.getPlayerState() && t.player.pauseVideo()
            }), t.$window.scrollStopped(function () {
                2 === t.player.getPlayerState() && t.player.playVideo()
            })
        },
        createContainerVideo: function () {
            var e = this,
                n = t('<div id="ytplayer-container' + e.ID + '" >                                    <div id="' + e.holderID + '" class="ytplayer-player-inline"></div>                                     </div>                                     <div id="ytplayer-shield" class="ytplayer-shield"></div>');
            e.$node.append(n), e.$YTPlayerString = n, n = null
        },
        createBackgroundVideo: function () {
            var e = this,
                n = t('<div id="ytplayer-container' + e.ID + '" class="ytplayer-container background">                                    <div id="' + e.holderID + '" class="ytplayer-player"></div>                                    </div>                                    <div id="ytplayer-shield" class="ytplayer-shield"></div>');
            e.$node.append(n), e.$YTPlayerString = n, n = null
        },
        resize: function (n) {
            var i = t(e);
            n.options.fitToBackground || (i = n.$node);
            var o, s, r = i.width(), a = i.height(), l = t("#" + n.holderID);
            r / n.options.ratio < a ? (o = Math.ceil(a * n.options.ratio), l.width(o).height(a).css({
                left: (r - o) / 2,
                top: 0
            })) : (s = Math.ceil(r / n.options.ratio), l.width(r).height(s).css({
                left: 0,
                top: (a - s) / 2
            })), l = null, i = null
        },
        onYouTubeIframeAPIReady: function () {
            var t = this;
            t.player = new e.YT.Player(t.holderID, t.options)
        },
        onPlayerReady: function (t) {
            this.options.mute && t.target.mute(), t.target.playVideo()
        },
        getPlayer: function () {
            return this.player
        },
        destroy: function () {
            var n = this;
            n.$node.removeData("yt-init").removeData("ytPlayer").removeClass("loaded"), n.$YTPlayerString.remove(), t(e).off("resize.YTplayer" + n.ID), t(e).off("scroll.YTplayer" + n.ID), n.$body = null, n.$node = null, n.$YTPlayerString = null, n.player.destroy(), n.player = null
        }
    }, t.fn.scrollStopped = function (e) {
        var n = t(this), i = this;
        n.scroll(function () {
            n.data("scrollTimeout") && clearTimeout(n.data("scrollTimeout")), n.data("scrollTimeout", setTimeout(e, 250, i))
        })
    }, t.fn.YTPlayer = function (e) {
        return this.each(function () {
            var n = this;
            t(n).data("yt-init", !0);
            var i = Object.create(YTPlayer);
            i.init(n, e), t.data(n, "ytPlayer", i)
        })
    }
}(jQuery, window, document), function () {
    function t(t, n, i) {
        e(n);
        var o = t.style, s = {};
        for (var r in n)i && (s[r] = o[r] || ""), o[r] = n[r];
        return s
    }

    function e(t) {
        var e;
        t.transition && (e = t.transition, delete t.transition, t[f] = e), t.transform && (e = t.transform, delete t.transform, t[m] = e)
    }

    function n(e, n) {
        for (var i, o = getComputedStyle(e), s = document.createElement("div"), r = y.length; r--;)i = y[r], s.style[i] = o[i];
        return t(s, {
            visibility: "hidden",
            width: n.width + "px",
            height: n.height + "px",
            display: "inline" === o.display ? "inline-block" : o.display
        }), u.deepCopy ? s.innerHTML = e.innerHTML : s.textContent = e.textContent, s
    }

    var i, o, s, r, a = "WebkitAppearance" in document.documentElement.style ? "-webkit-" : "",
        l = document.createElement("div"), h = document.createElement("div"), c = !1, d = !1, u = {
            transitionDuration: ".4s",
            transitionTimingFunction: "cubic-bezier(.4,0,0,1)",
            bgColor: "#fff",
            bgOpacity: 1,
            maxWidth: 300,
            maxHeight: 300,
            onOpen: null,
            onClose: null,
            onBeforeClose: null,
            onBeforeOpen: null
        }, p = function () {
            var t = {}, e = ["webkitTransition", "transition", "mozTransition"],
                n = ["webkitTransform", "transform", "mozTransform"],
                i = {transition: "transitionend", mozTransition: "transitionend", webkitTransition: "webkitTransitionEnd"};
            return e.some(function (e) {
                if (void 0 !== l.style[e])return t.transition = e, t.transEnd = i[e], !0
            }), n.some(function (e) {
                if (void 0 !== l.style[e])return t.transform = e, !0
            }), t
        }(), f = p.transition, m = p.transform, g = m.replace(/(.*)Transform/, "-$1-transform"), v = p.transEnd;
    t(l, {
        position: "fixed",
        display: "none",
        zIndex: 99998,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        backgroundColor: u.bgColor,
        cursor: a + "zoom-out",
        transition: "opacity " + u.transitionDuration + " " + u.transitionTimingFunction
    }), t(h, {position: "fixed", zIndex: 99999, top: "50%", left: "50%", width: 0, height: 0});
    var y = ["position", "display", "float", "top", "left", "right", "bottom", "marginBottom", "marginLeft", "marginRight", "marginTop", "font", "lineHeight", "verticalAlign"],
        w = {
            config: function (e) {
                if (!e)return u;
                for (var n in e)u[n] = e[n];
                return t(l, {
                    backgroundColor: u.bgColor,
                    transition: "opacity " + u.transitionDuration + " " + u.transitionTimingFunction
                }), this
            }, open: function (e, p) {
                if (!c && !d) {
                    i = "string" == typeof e ? document.querySelector(e) : e, u.onBeforeOpen && u.onBeforeOpen(i), c = !0, d = !0, o = i.parentNode;
                    var f = i.getBoundingClientRect(), m = Math.min(u.maxWidth / f.width, u.maxHeight / f.height),
                        y = f.left - (window.innerWidth - f.width) / 2, w = f.top - (window.innerHeight - f.height) / 2;
                    s = n(i, f), r = t(i, {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: "",
                        bottom: "",
                        whiteSpace: "nowrap",
                        marginTop: -f.height / 2 + "px",
                        marginLeft: -f.width / 2 + "px",
                        cursor: a + "zoom-out",
                        transform: "translate(" + y + "px, " + w + "px)",
                        transition: ""
                    }, !0);
                    var _ = i.style.width.match(/^([\d\.]+)%$/), b = i.style.height.match(/^([\d\.]+)%$/);
                    if (_ || b) {
                        var T = _ ? +_[1] / 100 : 1, E = b ? +b[1] / 100 : 1;
                        t(h, {width: ~~(f.width / T) + "px", height: ~~(f.height / E) + "px"})
                    }
                    o.appendChild(l), o.appendChild(h), o.insertBefore(s, i), h.appendChild(i), l.style.display = "block";
                    i.offsetHeight;
                    return l.style.opacity = u.bgOpacity, t(i, {
                        transition: g + " " + u.transitionDuration + " " + u.transitionTimingFunction,
                        transform: "scale(" + m + ")"
                    }), i.addEventListener(v, function t() {
                        i.removeEventListener(v, t), d = !1, (p = p || u.onOpen) && p(i)
                    }), this
                }
            }, close: function (e) {
                if (c && !d) {
                    d = !0, u.onBeforeClose && u.onBeforeClose(i);
                    var n = s.getBoundingClientRect(), a = n.left - (window.innerWidth - n.width) / 2,
                        p = n.top - (window.innerHeight - n.height) / 2;
                    return l.style.opacity = 0, t(i, {transform: "translate(" + a + "px, " + p + "px)"}), i.addEventListener(v, function n() {
                        i.removeEventListener(v, n), t(i, r), o.insertBefore(i, s), o.removeChild(s), o.removeChild(l), o.removeChild(h), l.style.display = "none", s = null, c = !1, d = !1, (e = "function" == typeof e ? e : u.onClose) && e(i)
                    }), this
                }
            }, listen: function e(n) {
                if ("string" != typeof n)return t(n, {cursor: a + "zoom-in"}), n.addEventListener("click", function (t) {
                    t.stopPropagation(), c ? w.close() : w.open(n)
                }), this;
                for (var i = document.querySelectorAll(n), o = i.length; o--;)e(i[o])
            }
        };
    l.addEventListener("click", w.close), h.addEventListener("click", w.close), "object" == typeof exports ? module.exports = w : "function" == typeof define && define.amd ? define(function () {
        return w
    }) : this.Zoomerang = w
}(), $(function () {
    $("#spacial-slider").length && slider.initialize()
});
var slider = {
    initialize: function () {
        var t = {animations: Modernizr.cssanimations}, e = {
                WebkitAnimation: "webkitAnimationEnd",
                OAnimation: "oAnimationEnd",
                msAnimation: "MSAnimationEnd",
                animation: "animationend"
            }, n = e[Modernizr.prefixed("animation")], i = document.getElementById("spacial-slider"),
            o = i.querySelector("ul.itemwrap").children, s = 0, r = o.length, a = i.querySelector("nav"),
            l = a.querySelector(".next"), h = a.querySelector(".prev"), c = !1;
        window.navigate_slider = function (e) {
            if (c)return !1;
            c = !0;
            var i = 0, a = o[s];
            "next" === e ? s = s < r - 1 ? s + 1 : 0 : "prev" === e && (s = s > 0 ? s - 1 : r - 1);
            var l = o[s], h = function () {
                this.removeEventListener(n, h), $(this).removeClass("current"), $(this).removeClass("next" === e ? "navOutNext" : "navOutPrev"), 2 === ++i && (c = !1)
            }, d = function () {
                this.removeEventListener(n, d), $(this).addClass("current"), $(this).removeClass("next" === e ? "navInNext" : "navInPrev"), 2 === ++i && (c = !1)
            };
            t.animations ? (a.addEventListener(n, h), l.addEventListener(n, d)) : (h(), d()), $(a).addClass("next" === e ? "navOutNext" : "navOutPrev"), $(l).addClass("next" === e ? "navInNext" : "navInPrev")
        }, function () {
            l.addEventListener("click", function (t) {
                t.preventDefault(), navigate_slider("next"), clearInterval(window.slider_interval)
            }), h.addEventListener("click", function (t) {
                t.preventDefault(), navigate_slider("prev"), clearInterval(window.slider_interval)
            })
        }()
    }
};
$(function () {
    navbar.init(), pricing_charts.init(), global_notifications.init(), ecommerce.init(), retina.init(), zoomerang.init(), animation.init()
});
var animation = {
    lastScrollY: 0, ticking: !1, _this: null, elements: null, init: function () {
        _this = this, _this.elements = $("[data-animate]"), window.addEventListener("scroll", _this.onScroll, !1), _this.update()
    }, onScroll: function () {
        _this.lastScrollY = window.scrollY, _this.requestTick()
    }, requestTick: function () {
        _this.ticking || (requestAnimationFrame(_this.update), _this.ticking = !0)
    }, update: function () {
        for (var t = _this.elements.length - 1; t >= 0; t--) {
            var e = $(_this.elements[t]);
            e.hasClass(e.data("animate")) || _this.isInViewport(e) && _this.triggerAnimate(e)
        }
        _this.ticking = !1
    }, isInViewport: function (t) {
        var e = t.offset().top, n = t.offset().top + t.outerHeight(), i = $(window).scrollTop() + $(window).height(),
            o = $(window).scrollTop();
        return i > e && o < n
    }, triggerAnimate: function (t) {
        var e = t.data("animate"), n = t.data("animate-infinite") || null, i = t.data("animate-delay") || null,
            o = t.data("animate-duration") || null;
        null !== n && t.addClass("infinite"), null !== i && t.css({
            "-webkit-animation-delay": i + "s",
            "-moz-animation-delay": i + "s",
            "animation-delay": i + "s"
        }), null !== o && t.css({
            "-webkit-animation-duration": o + "s",
            "-moz-animation-duration": o + "s",
            "animation-duration": o + "s"
        }), t.addClass("animated " + e).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            t.addClass("animated-end")
        })
    }
}, navbar = {
    init: function () {
        window.utils.isMobile() || (this.dropdownHover(), this.transparentFixed()), $(".navbar-nav .dropdown-item").click(function (t) {
            t.stopPropagation()
        }), $(".dropdown-submenu .dropdown-toggle").click(function (t) {
            t.preventDefault(), $(this).parent().toggleClass("show")
        }), this.fixedBottom()
    }, dropdownHover: function () {
        $(".navbar-nav .dropdown").each(function (t, e) {
            var n = $(this);
            n.hover(function () {
                n.addClass("show")
            }, function () {
                n.removeClass("show")
            })
        })
    }, transparentFixed: function () {
        var t = $(".navbar");
        if (t.hasClass("bg-transparent fixed-top")) {
            var e = t.offset().top + 1, n = function () {
                var n = window.scrollY || window.pageYOffset;
                n >= e && t.hasClass("bg-transparent") ? t.removeClass("bg-transparent") : n < e && !t.hasClass("bg-transparent") && t.addClass("bg-transparent")
            };
            $(window).scroll(n)
        }
    }, fixedBottom: function () {
        if ($navbar = $(".navbar"), $navbar.hasClass("navbar-fixed-bottom"))var t = $navbar.offset().top + 1,
            e = function () {
                var e = window.scrollY || window.pageYOffset;
                e >= t && !$navbar.hasClass("navbar-fixed-bottom--stick") ? $navbar.addClass("navbar-fixed-bottom--stick") : e < t && $navbar.hasClass("navbar-fixed-bottom--stick") && $navbar.removeClass("navbar-fixed-bottom--stick")
            };
        $(window).scroll(e)
    }
}, zoomerang = {
    init: function () {
        Zoomerang.config({maxHeight: 730, maxWidth: 900}).listen('[data-trigger="zoomerang"]')
    }
}, ecommerce = {
    init: function () {
        this.displayCart(), this.search()
    }, displayCart: function () {
        var t, e = $(".store-navbar .cart"), n = $("#cart-modal"), i = function () {
            n.addClass("visible"), clearTimeout(t), t = null
        }, o = function () {
            t = setTimeout(function () {
                n.removeClass("visible")
            }, 400)
        };
        e.hover(i, o), n.hover(i, o)
    }, search: function () {
        var t = $(".store-navbar .search-field"), e = t.find(".input-search");
        e.focus(function () {
            t.addClass("focus")
        }), e.blur(function () {
            t.removeClass("focus")
        })
    }
}, global_notifications = {
    init: function () {
        setTimeout(function () {
            $(".global-notification").removeClass("uber-notification").addClass("uber-notification-remove")
        }, 5e3)
    }
}, pricing_charts = {
    init: function () {
        var t = $(".pricing-charts-tabs .tab"), e = $(".pricing-charts .chart header .price");
        t.click(function () {
            t.removeClass("active"), $(this).addClass("active");
            var n = $(this).data("tab"), i = e.filter(":not(." + n + ")");
            i.addClass("go-out"), e.filter("." + n).addClass("active"), setTimeout(function () {
                i.removeClass("go-out").removeClass("active")
            }, 250)
        })
    }
}, retina = {
    init: function () {
        window.devicePixelRatio >= 1.2 && $("[data-2x]").each(function () {
            "IMG" == this.tagName ? $(this).attr("src", $(this).attr("data-2x")) : $(this).css({"background-image": "url(" + $(this).attr("data-2x") + ")"})
        })
    }
};
window.utils = {
    isFirefox: function () {
        return navigator.userAgent.toLowerCase().indexOf("firefox") > -1
    }, isSafari: function () {
        return navigator.userAgent.toLowerCase().indexOf("safari") > -1
    }, debounce: function (t, e, n) {
        var i;
        return function () {
            var o = this, s = arguments, r = function () {
                i = null, n || t.apply(o, s)
            }, a = n && !i;
            clearTimeout(i), i = setTimeout(r, e), a && t.apply(o, s)
        }
    }, isMobile: function () {
        return window.innerWidth <= 1024
    }, parallax_text: function (t, e) {
        function n() {
            s = window.scrollY, i()
        }

        function i() {
            r || (requestAnimationFrame(o), r = !0)
        }

        function o() {
            var n, i = s, o = i / 1.4, a = e + o + "px";
            document.body.style;
            n = i > 0 ? (1e3 - 2.7 * i) / 1e3 : 1, t.css({position: "relative", top: a, opacity: n}), r = !1
        }

        e = void 0 !== e ? e : 0;
        var s = 0, r = !1;
        window.addEventListener("scroll", n, !1)
    }
};
//# sourceMappingURL=theme.min.js.map
