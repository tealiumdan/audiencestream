/**
 * jquery.elastislide.js v1.1.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */

function Elderscroll() {
    this.total_children;
    this.showable_children;
    this.max_child_width;
    this.min_child_width;
    this.center_item;
    this.highlight_percentage;
    this.calculated_highlight_difference;
    this.available_width;
    this.potential_child_width;
    this.hide_extra_kids;
    this.kids_array;
    this.timer;
    this.first_position;
    this.center_goal;
    this.scrollToCenterIteration = 0;
    this.maxScrollToCenterIteration = 1e3;
    var e = this;
    this.get_center_item = function(e) {
        if (e % 2) return Math.round(e / 2)
    };
    this.init = function() {
        clearInterval(window.eldertimer);
        e.total_children = 0;
        e.showable_children = 0;
        e.max_child_width = 300;
        e.min_child_width = 200;
        e.center_item = null;
        e.highlight_percentage = .1;
        e.calculated_highlight_difference = 0;
        e.available_width = jQuery(".elderscroll").width();
        e.potential_child_width = 0;
        e.hide_extra_kids = !1;
        e.timer;
        e.do_scroll = !1;
        e.center_goal = null;
        e.first_position = 0;
        jQuery("#elderscroll-previous").hide();
        jQuery("#elderscroll-next").hide();
        jQuery(".elderscroll-child").click(function() {
            if (e.showable_children > 1) {
                jQuery(".elderscroll-child").removeClass("elderscroll-active");
                jQuery(this).addClass("elderscroll-active")
            }
            id = jQuery(this).data("target");
            e.showTargetContent(id)
        });
        jQuery("#elderscroll-previous").click(function() {
            e.previous()
        });
        jQuery("#elderscroll-next").click(function() {
            e.next()
        });
        jQuery(".elderscroll-child").each(function() {
            e.total_children++
        });
        e.showable_children = e.total_children;
        e.potential_child_width = e.available_width / e.total_children;
        e.potential_child_width > e.max_child_width && (e.potential_child_width = e.max_child_width);
        if (e.potential_child_width < e.min_child_width) {
            e.showable_children = Math.floor(e.available_width / e.min_child_width);
            e.get_center_item(e.showable_children) || e.showable_children--;
            e.potential_child_width = e.available_width / e.showable_children;
            e.hide_extra_kids = !0
        }
        e.center_item = e.get_center_item(e.showable_children);
        e.resize_children = function() {
            e.center_item = e.get_center_item(e.showable_children);
            e.center_item ? e.calculated_highlight_difference = e.potential_child_width * e.highlight_percentage : e.calculated_highlight_difference = 0;
            jQuery(".elderscroll-child").width(e.potential_child_width - (e.calculated_highlight_difference + 5));
            jQuery(".elderscroll-child img").width(e.potential_child_width - (e.calculated_highlight_difference + 10));
            var t = null;
            if (e.center_item) {
                t = e.getCurrentCenterTarget();
                jQuery(".elderscroll-child:nth-child(" + e.center_item + ") img").width(e.potential_child_width - 10);
                jQuery(".elderscroll-child:nth-child(" + e.center_item + ")").width(e.potential_child_width - 5);
                e.showTargetContent(t)
            }
            return t
        };
        e.showTargetContent = function(e) {
            jQuery(".eldercontent").hide();
            jQuery("#eldercontent" + e).show()
        };
        e.getCurrentCenterTarget = function() {
            return jQuery(".elderscroll-child:nth-child(" + e.center_item + ")").data("target")
        };
        e.scrollToCenter = function() {
            e.next();
            e.center_item = e.get_center_item(e.showable_children);
            id = e.getCurrentCenterTarget();
            if (e.scrollToCenterIteration <= e.maxScrollToCenterIteration) {
                e.scrollToCenterIteration++;
                if (id != e.center_goal) e.scrollToCenter();
                else {
                    e.center_goal = null;
                    e.resize_children()
                }
            }
        };
        e.scroll = function() {
            jQuery(".elderscroll-child:nth-child(1)").insertAfter(".elderscroll-child:nth-child(" + e.total_children + ")")
        };
        e.next = function() {
            jQuery(".elderscroll-child:nth-child(" + e.total_children + ")").insertBefore(".elderscroll-child:nth-child(1)");
            e.showhide();
            e.resize_children()
        };
        e.previous = function() {
            jQuery(".elderscroll-child:nth-child(1)").insertAfter(".elderscroll-child:nth-child(" + e.total_children + ")");
            e.showhide();
            e.resize_children()
        };
        e.highlight = function() {};
        e.showhide = function() {
            for (var t = 0; t < e.total_children; t++) t < e.showable_children ? jQuery(".elderscroll-child:nth-child(" + (t + 1) + ")").show() : jQuery(".elderscroll-child:nth-child(" + (t + 1) + ")").hide()
        };
        if (e.hide_extra_kids == 1) {
            jQuery("#elderscroll-previous").show();
            jQuery("#elderscroll-next").show();
            if (e.do_scroll) {
                window.eldertimer = setTimeout(function() {
                    e.scroll()
                }, 1e3);
                window.eldertimer = setInterval(function() {
                    e.scroll()
                }, 3e3)
            }
            e.showhide();
            e.resize_children()
        } else {
            jQuery(".elderscroll-child").show();
            e.resize_children()
        }
    }
}

function sticky_bio(e, t, n) {
    var r = jQuery(e),
        i = jQuery(t),
        s = r.height(),
        o = jQuery(n),
        u = o.position().top - s;
    i.waypoint(function(e) {
        e === "down" ? r.toggleClass("stuck") : r.removeAttr("style").toggleClass("stuck")
    }, {
        offset: 95
    });
    o.waypoint(function(e) {
        e === "down" ? r.toggleClass("stuck").toggleClass("stalled").css({
            top: u
        }) : r.toggleClass("stuck").toggleClass("stalled").removeAttr("style")
    }, {
        offset: s
    })
}

function megamenu_standard(e) {
    (function(t) {
        function o() {
            t(".sub-menu-wrapper").hide();
            t(e).removeClass("active");
            n = null;
            //console.log("Clear!!")
        }
        var n, r, i, s;
        t(".sub-menu-wrapper").hover(function() {
            this_menu_item = t(this);
            this_menu = this_menu_item.data("menu");
            ww = t(window).width();
            //console.log(this_menu);
            if (this_menu != n) {
                n = this_menu;
                i = this_menu_item.offset().left;
                this_menu_obj = t("#sub-menu-" + n);
                if (ww <= 1440) {
                    s = i;
                    s + this_menu_obj.width() < ww ? t(".sub-menu-holder").css("left", s) : t(".sub-menu-holder").css({
                        left: "auto",
                        right: "1px"
                    })
                } else {
                    s = i - (ww - 1438) / 2;
                    s + (ww - 1438) / 2 + this_menu_obj.width() < (ww - 1438) / 2 + 1438 ? t(".sub-menu-holder").css("left", s) : t(".sub-menu-holder").css({
                        left: "auto",
                        right: "-1px"
                    })
                }
                t(this).toggleClass("active");
                this_menu_obj.show()
            }
        });
        t("#menu-primary-nav > li.menu-item").hover(function() {
            //console.log("enter");
            clearTimeout(r);
            this_menu_item = t(this);
            this_menu = this_menu_item.data("menu");
            ww = t(window).width();
            if (this_menu != n) {
                n = this_menu;
                i = this_menu_item.offset().left;
                this_menu_obj = t("#sub-menu-" + n);
                if (ww <= 1400) {
                    s = i - 40;
                    s + this_menu_obj.width() < ww ? t(".sub-menu-holder").css("left", s) : t(".sub-menu-holder").css({
                        left: "auto",
                        right: "-1px"
                    })
                } else {
                    s = i - (ww - 1440) / 2 - 40;
                    s + (ww - 1440) / 2 + this_menu_obj.width() < (ww - 1440) / 2 + 1440 ? t(".sub-menu-holder").css("left", s) : t(".sub-menu-holder").css({
                        left: "auto",
                        right: "-1px"
                    })
                }
                t(".sub-menu-wrapper").hide();
                this_menu_obj.show()
            }
            this_menu_obj.hover(function() {
                currentId = t(this).attr("id");
                currentIdSolo = currentId.split("-");
                matchMe = currentIdSolo.slice(2);
                t("li.menu-item").each(function() {
                    dataMenu = t(this).attr("data-menu");
                    dataMenu == matchMe && t(this).find("span.nav-caret-wrap").addClass("show")
                })
            }, function() {
                t("li.menu-item").each(function() {
                    dataMenu = t(this).attr("data-menu");
                    dataMenu == matchMe && t(this).find("span.nav-caret-wrap").removeClass("show")
                })
            })
        }, function() {
            r = setTimeout(o, 140)
        });
        t(".sub-menu-wrapper").mouseenter(function() {
            clearTimeout(r)
        }).mouseleave(function() {
            r = setTimeout(o, 140)
        });
        t("#mobile-nav li a").click(function() {
            t(".mobile-nav li ul").hide();
            t(this).next("div").toggle()
        })
    })(jQuery)
}

function sticky_megamenu(e, t) {
    (function(n) {
        var r = n(e);
        submenu_obj = n(".sub-menu-outer");
        submenu_active = n(".sub-menu-outer-f");
        offset_amt = t;
        n(".header").waypoint(function(e) {
            if (e === "down") {
                r.slideDown(250);
                submenu_obj.toggleClass("sub-menu-outer-f")
            } else {
                r.slideUp(100);
                submenu_obj.toggleClass("sub-menu-outer-f")
            }
        }, {
            offset: -offset_amt
        })
    })(jQuery)
}

function responsive_handler() {
    if (window.innerWidth >= 768) {
        menuok;
        jQuery("#sticky").exists() && sticky_bio("#sticky", ".sticky-start", ".sticky-stop")
    } else {
        jQuery("#mobile-nav").hide();
        jQuery(".fadeins").hide()
    }
    var e = jQuery(window).width();
    e < 481;
    e > 481;
    e >= 768 && jQuery(".comment img[data-gravatar]").each(function() {
        jQuery(this).attr("src", jQuery(this).attr("data-gravatar"))
    })
}

function toggle_mobile_nav() {
    jQuery("#mobile-nav").toggle();
    jQuery(".sub-menu-mobile-holder").hide()
}(function(e, t, n) {
    "use strict";
    var r = e.event,
        i, s;
    i = r.special.debouncedresize = {
        setup: function() {
            e(this).on("resize", i.handler)
        },
        teardown: function() {
            e(this).off("resize", i.handler)
        },
        handler: function(e, t) {
            var n = this,
                o = arguments,
                u = function() {
                    e.type = "debouncedresize";
                    r.dispatch.apply(n, o)
                };
            s && clearTimeout(s);
            t ? u() : s = setTimeout(u, i.threshold)
        },
        threshold: 150
    };
    var o = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    e.fn.imagesLoaded = function(t) {
        function c() {
            var n = e(f),
                s = e(l);
            i && (l.length ? i.reject(u, n, s) : i.resolve(u));
            e.isFunction(t) && t.call(r, u, n, s)
        }

        function h(t, n) {
            if (t.src === o || e.inArray(t, a) !== -1) return;
            a.push(t);
            n ? l.push(t) : f.push(t);
            e.data(t, "imagesLoaded", {
                isBroken: n,
                src: t.src
            });
            s && i.notifyWith(e(t), [n, u, e(f), e(l)]);
            if (u.length === a.length) {
                setTimeout(c);
                u.unbind(".imagesLoaded")
            }
        }
        var r = this,
            i = e.isFunction(e.Deferred) ? e.Deferred() : 0,
            s = e.isFunction(i.notify),
            u = r.find("img").add(r.filter("img")),
            a = [],
            f = [],
            l = [];
        e.isPlainObject(t) && e.each(t, function(e, n) {
            e === "callback" ? t = n : i && i[e](n)
        });
        u.length ? u.bind("load.imagesLoaded error.imagesLoaded", function(e) {
            h(e.target, e.type === "error")
        }).each(function(t, r) {
            var i = r.src,
                s = e.data(r, "imagesLoaded");
            if (s && s.src === i) {
                h(r, s.isBroken);
                return
            }
            if (r.complete && r.naturalWidth !== n) {
                h(r, r.naturalWidth === 0 || r.naturalHeight === 0);
                return
            }
            if (r.readyState || r.complete) {
                r.src = o;
                r.src = i
            }
        }) : c();
        return i ? i.promise(r) : r
    };
    var u = e(t),
        a = t.Modernizr;
    e.Elastislide = function(t, n) {
        this.$el = e(n);
        this._init(t)
    };
    e.Elastislide.defaults = {
        orientation: "horizontal",
        speed: 500,
        easing: "ease-in-out",
        minItems: 3,
        start: 0,
        onClick: function(e, t, n) {
            return !1
        },
        onReady: function() {
            return !1
        },
        onBeforeSlide: function() {
            return !1
        },
        onAfterSlide: function() {
            return !1
        }
    };
    e.Elastislide.prototype = {
        _init: function(t) {
            this.options = e.extend(!0, {}, e.Elastislide.defaults, t);
            var n = this,
                r = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    msTransition: "MSTransitionEnd",
                    transition: "transitionend"
                };
            this.transEndEventName = r[a.prefixed("transition")];
            this.support = a.csstransitions && a.csstransforms;
            this.current = this.options.start;
            this.isSliding = !1;
            this.$items = this.$el.children("li");
            this.itemsCount = this.$items.length;
            if (this.itemsCount === 0) return !1;
            this._validate();
            this.$items.detach();
            this.$el.empty();
            this.$el.append(this.$items);
            this.$el.wrap('<div class="elastislide-wrapper elastislide-loading elastislide-' + this.options.orientation + '"></div>');
            this.hasTransition = !1;
            this.hasTransitionTimeout = setTimeout(function() {
                n._addTransition()
            }, 100);
            this.$el.imagesLoaded(function() {
                n.$el.show();
                n._layout();
                n._configure();
                if (n.hasTransition) {
                    n._removeTransition();
                    n._slideToItem(n.current);
                    n.$el.on(n.transEndEventName, function() {
                        n.$el.off(n.transEndEventName);
                        n._setWrapperSize();
                        n._addTransition();
                        n._initEvents()
                    })
                } else {
                    clearTimeout(n.hasTransitionTimeout);
                    n._setWrapperSize();
                    n._initEvents();
                    n._slideToItem(n.current);
                    setTimeout(function() {
                        n._addTransition()
                    }, 25)
                }
                n.options.onReady()
            })
        },
        _validate: function() {
            this.options.speed < 0 && (this.options.speed = 500);
            if (this.options.minItems < 1 || this.options.minItems > this.itemsCount) this.options.minItems = 1;
            if (this.options.start < 0 || this.options.start > this.itemsCount - 1) this.options.start = 0;
            this.options.orientation != "horizontal" && this.options.orientation != "vertical" && (this.options.orientation = "horizontal")
        },
        _layout: function() {
            this.$el.wrap('<div class="elastislide-carousel"></div>');
            this.$carousel = this.$el.parent();
            this.$wrapper = this.$carousel.parent().removeClass("elastislide-loading");
            var e = this.$items.find("img:first");
            this.imgSize = {
                width: e.outerWidth(!0),
                height: e.outerHeight(!0)
            };
            this._setItemsSize();
            this.options.orientation === "horizontal" ? this.$el.css("max-height", this.imgSize.height) : this.$el.css("height", this.options.minItems * this.imgSize.height);
            this._addControls()
        },
        _addTransition: function() {
            this.support && this.$el.css("transition", "all " + this.options.speed + "ms " + this.options.easing);
            this.hasTransition = !0
        },
        _removeTransition: function() {
            this.support && this.$el.css("transition", "all 0s");
            this.hasTransition = !1
        },
        _addControls: function() {
            var t = this;
            this.$navigation = e('<nav><span class="elastislide-prev "><i class="icon-chevron-left"></i> Previous</span><span class="elastislide-next">Next</span></nav>').appendTo(this.$wrapper);
            this.$navPrev = this.$navigation.find("span.elastislide-prev").on("mousedown.elastislide", function(e) {
                t._slide("prev");
                return !1
            });
            this.$navNext = this.$navigation.find("span.elastislide-next").on("mousedown.elastislide", function(e) {
                t._slide("next");
                return !1
            })
        },
        _setItemsSize: function() {
            var e = this.options.orientation === "horizontal" ? Math.floor(this.$carousel.width() / this.options.minItems) * 100 / this.$carousel.width() : 100;
            this.$items.css({
                width: e + "%",
                "max-width": this.imgSize.width,
                "max-height": this.imgSize.height
            });
            this.options.orientation === "vertical" && this.$wrapper.css("max-width", this.imgSize.width + parseInt(this.$wrapper.css("padding-left")) + parseInt(this.$wrapper.css("padding-right")))
        },
        _setWrapperSize: function() {
            this.options.orientation === "vertical" && this.$wrapper.css({
                height: this.options.minItems * this.imgSize.height + parseInt(this.$wrapper.css("padding-top")) + parseInt(this.$wrapper.css("padding-bottom"))
            })
        },
        _configure: function() {
            this.fitCount = this.options.orientation === "horizontal" ? this.$carousel.width() < this.options.minItems * this.imgSize.width ? this.options.minItems : Math.floor(this.$carousel.width() / this.imgSize.width) : this.$carousel.height() < this.options.minItems * this.imgSize.height ? this.options.minItems : Math.floor(this.$carousel.height() / this.imgSize.height)
        },
        _initEvents: function() {
            var t = this;
            u.on("debouncedresize.elastislide", function() {
                t._setItemsSize();
                t._configure();
                t._slideToItem(t.current)
            });
            this.$el.on(this.transEndEventName, function() {
                t._onEndTransition()
            });
            this.options.orientation === "horizontal" ? this.$el.on({
                swipeleft: function() {
                    t._slide("next")
                },
                swiperight: function() {
                    t._slide("prev")
                }
            }) : this.$el.on({
                swipeup: function() {
                    t._slide("next")
                },
                swipedown: function() {
                    t._slide("prev")
                }
            });
            this.$el.on("click.elastislide", "li", function(n) {
                var r = e(this);
                t.options.onClick(r, r.index(), n)
            })
        },
        _destroy: function(e) {
            this.$el.off(this.transEndEventName).off("swipeleft swiperight swipeup swipedown .elastislide");
            u.off(".elastislide");
            this.$el.css({
                "max-height": "none",
                transition: "none"
            }).unwrap(this.$carousel).unwrap(this.$wrapper);
            this.$items.css({
                width: "auto",
                "max-width": "none",
                "max-height": "none"
            });
            this.$navigation.remove();
            this.$wrapper.remove();
            e && e.call()
        },
        _toggleControls: function(e, t) {
            t ? e === "next" ? this.$navNext.show() : this.$navPrev.show() : e === "next" ? this.$navNext.hide() : this.$navPrev.hide()
        },
        _slide: function(t, r) {
            if (this.isSliding) return !1;
            this.options.onBeforeSlide();
            this.isSliding = !0;
            var i = this,
                s = this.translation || 0,
                o = this.options.orientation === "horizontal" ? this.$items.outerWidth(!0) : this.$items.outerHeight(!0),
                u = this.itemsCount * o,
                a = this.options.orientation === "horizontal" ? this.$carousel.width() : this.$carousel.height();
            if (r === n) {
                var f = this.fitCount * o;
                if (f < 0) return !1;
                if (t === "next" && u - (Math.abs(s) + f) < a) {
                    f = u - (Math.abs(s) + a);
                    this._toggleControls("next", !1);
                    this._toggleControls("prev", !0)
                } else if (t === "prev" && Math.abs(s) - f < 0) {
                    f = Math.abs(s);
                    this._toggleControls("next", !0);
                    this._toggleControls("prev", !1)
                } else {
                    var l = t === "next" ? Math.abs(s) + Math.abs(f) : Math.abs(s) - Math.abs(f);
                    l > 0 ? this._toggleControls("prev", !0) : this._toggleControls("prev", !1);
                    l < u - a ? this._toggleControls("next", !0) : this._toggleControls("next", !1)
                }
                r = t === "next" ? s - f : s + f
            } else {
                var f = Math.abs(r);
                Math.max(u, a) - f < a && (r = -(Math.max(u, a) - a));
                f > 0 ? this._toggleControls("prev", !0) : this._toggleControls("prev", !1);
                Math.max(u, a) - a > f ? this._toggleControls("next", !0) : this._toggleControls("next", !1)
            }
            this.translation = r;
            if (s === r) {
                this._onEndTransition();
                return !1
            }
            if (this.support) this.options.orientation === "horizontal" ? this.$el.css("transform", "translateX(" + r + "px)") : this.$el.css("transform", "translateY(" + r + "px)");
            else {
                e.fn.applyStyle = this.hasTransition ? e.fn.animate : e.fn.css;
                var c = this.options.orientation === "horizontal" ? {
                    left: r
                } : {
                    top: r
                };
                this.$el.stop().applyStyle(c, e.extend(!0, [], {
                    duration: this.options.speed,
                    complete: function() {
                        i._onEndTransition()
                    }
                }))
            }
            this.hasTransition || this._onEndTransition()
        },
        _onEndTransition: function() {
            this.isSliding = !1;
            this.options.onAfterSlide()
        },
        _slideTo: function(e) {
            var e = e || this.current,
                t = Math.abs(this.translation) || 0,
                n = this.options.orientation === "horizontal" ? this.$items.outerWidth(!0) : this.$items.outerHeight(!0),
                r = t + this.$carousel.width(),
                i = Math.abs(e * n);
            (i + n > r || i < t) && this._slideToItem(e)
        },
        _slideToItem: function(e) {
            var t = this.options.orientation === "horizontal" ? e * this.$items.outerWidth(!0) : e * this.$items.outerHeight(!0);
            this._slide("", -t)
        },
        add: function(e) {
            var t = this,
                n = this.current,
                r = this.$items.eq(this.current);
            this.$items = this.$el.children("li");
            this.itemsCount = this.$items.length;
            this.current = r.index();
            this._setItemsSize();
            this._configure();
            this._removeTransition();
            n < this.current ? this._slideToItem(this.current) : this._slide("next", this.translation);
            setTimeout(function() {
                t._addTransition()
            }, 25);
            e && e.call()
        },
        setCurrent: function(e, t) {
            this.current = e;
            this._slideTo();
            t && t.call()
        },
        next: function() {
            self._slide("next")
        },
        previous: function() {
            self._slide("prev")
        },
        slideStart: function() {
            this._slideTo(0)
        },
        slideEnd: function() {
            this._slideTo(this.itemsCount - 1)
        },
        destroy: function(e) {
            this._destroy(e)
        }
    };
    var f = function(e) {
        t.console && t.console.error(e)
    };
    e.fn.elastislide = function(t) {
        var n = e.data(this, "elastislide");
        if (typeof t == "string") {
            var r = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                if (!n) {
                    f("cannot call methods on elastislide prior to initialization; attempted to call method '" + t + "'");
                    return
                }
                if (!e.isFunction(n[t]) || t.charAt(0) === "_") {
                    f("no such method '" + t + "' for elastislide self");
                    return
                }
                n[t].apply(n, r)
            })
        } else this.each(function() {
            n ? n._init() : n = e.data(this, "elastislide", new e.Elastislide(t, this))
        });
        return n
    }
})(jQuery, window);
(function(e) {
    e.fn.touchwipe = function(t) {
        var n = {
            min_move_x: 20,
            min_move_y: 20,
            wipeLeft: function() {},
            wipeRight: function() {},
            wipeUp: function() {},
            wipeDown: function() {},
            preventDefaultEvents: !0
        };
        t && e.extend(n, t);
        this.each(function() {
            function i() {
                this.removeEventListener("touchmove", s);
                e = null;
                r = !1
            }

            function s(s) {
                n.preventDefaultEvents && s.preventDefault();
                if (r) {
                    var o = s.touches[0].pageX,
                        u = s.touches[0].pageY,
                        a = e - o,
                        f = t - u;
                    if (Math.abs(a) >= n.min_move_x) {
                        i();
                        a > 0 ? n.wipeLeft() : n.wipeRight()
                    } else if (Math.abs(f) >= n.min_move_y) {
                        i();
                        f > 0 ? n.wipeDown() : n.wipeUp()
                    }
                }
            }

            function o(n) {
                if (n.touches.length == 1) {
                    e = n.touches[0].pageX;
                    t = n.touches[0].pageY;
                    r = !0;
                    this.addEventListener("touchmove", s, !1)
                }
            }
            var e, t, r = !1;
            "ontouchstart" in document.documentElement && this.addEventListener("touchstart", o, !1)
        });
        return this
    }
})(jQuery);
(function($) {
    $.extend({
        tablesorter: new
        function() {
            function benchmark(e, t) {
                log(e + "," + ((new Date).getTime() - t.getTime()) + "ms")
            }

            function log(e) {
                typeof console != "undefined" && typeof console.debug != "undefined" ? console.log(e) : alert(e)
            }

            function buildParserCache(e, t) {
                if (e.config.debug) var n = "";
                if (e.tBodies.length == 0) return;
                var r = e.tBodies[0].rows;
                if (r[0]) {
                    var i = [],
                        s = r[0].cells,
                        o = s.length;
                    for (var u = 0; u < o; u++) {
                        var a = !1;
                        $.metadata && $(t[u]).metadata() && $(t[u]).metadata().sorter ? a = getParserById($(t[u]).metadata().sorter) : e.config.headers[u] && e.config.headers[u].sorter && (a = getParserById(e.config.headers[u].sorter));
                        a || (a = detectParserForColumn(e, r, -1, u));
                        e.config.debug && (n += "column:" + u + " parser:" + a.id + "\n");
                        i.push(a)
                    }
                }
                e.config.debug && log(n);
                return i
            }

            function detectParserForColumn(e, t, n, r) {
                var i = parsers.length,
                    s = !1,
                    o = !1,
                    u = !0;
                while (o == "" && u) {
                    n++;
                    if (t[n]) {
                        s = getNodeFromRowAndCellIndex(t, n, r);
                        o = trimAndGetNodeText(e.config, s);
                        e.config.debug && log("Checking if value was empty on row:" + n)
                    } else u = !1
                }
                for (var a = 1; a < i; a++)
                if (parsers[a].is(o, e, s)) return parsers[a];
                return parsers[0]
            }

            function getNodeFromRowAndCellIndex(e, t, n) {
                return e[t].cells[n]
            }

            function trimAndGetNodeText(e, t) {
                return $.trim(getElementText(e, t))
            }

            function getParserById(e) {
                var t = parsers.length;
                for (var n = 0; n < t; n++)
                if (parsers[n].id.toLowerCase() == e.toLowerCase()) return parsers[n];
                return !1
            }

            function buildCache(e) {
                if (e.config.debug) var t = new Date;
                var n = e.tBodies[0] && e.tBodies[0].rows.length || 0,
                    r = e.tBodies[0].rows[0] && e.tBodies[0].rows[0].cells.length || 0,
                    i = e.config.parsers,
                    s = {
                        row: [],
                        normalized: []
                    };
                for (var o = 0; o < n; ++o) {
                    var u = $(e.tBodies[0].rows[o]),
                        a = [];
                    if (u.hasClass(e.config.cssChildRow)) {
                        s.row[s.row.length - 1] = s.row[s.row.length - 1].add(u);
                        continue
                    }
                    s.row.push(u);
                    for (var f = 0; f < r; ++f) a.push(i[f].format(getElementText(e.config, u[0].cells[f]), e, u[0].cells[f]));
                    a.push(s.normalized.length);
                    s.normalized.push(a);
                    a = null
                }
                e.config.debug && benchmark("Building cache for " + n + " rows:", t);
                return s
            }

            function getElementText(e, t) {
                var n = "";
                if (!t) return "";
                e.supportsTextContent || (e.supportsTextContent = t.textContent || !1);
                e.textExtraction == "simple" ? e.supportsTextContent ? n = t.textContent : t.childNodes[0] && t.childNodes[0].hasChildNodes() ? n = t.childNodes[0].innerHTML : n = t.innerHTML : typeof e.textExtraction == "function" ? n = e.textExtraction(t) : n = $(t).text();
                return n
            }

            function appendToTable(e, t) {
                if (e.config.debug) var n = new Date;
                var r = t,
                    i = r.row,
                    s = r.normalized,
                    o = s.length,
                    u = s[0].length - 1,
                    a = $(e.tBodies[0]),
                    f = [];
                for (var l = 0; l < o; l++) {
                    var c = s[l][u];
                    f.push(i[c]);
                    if (!e.config.appender) {
                        var h = i[c].length;
                        for (var p = 0; p < h; p++) a[0].appendChild(i[c][p])
                    }
                }
                e.config.appender && e.config.appender(e, f);
                f = null;
                e.config.debug && benchmark("Rebuilt table:", n);
                applyWidget(e);
                setTimeout(function() {
                    $(e).trigger("sortEnd")
                }, 0)
            }

            function buildHeaders(e) {
                if (e.config.debug) var t = new Date;
                var n = $.metadata ? !0 : !1,
                    r = computeTableHeaderCellIndexes(e);
                $tableHeaders = $(e.config.selectorHeaders, e).each(function(t) {
                    this.column = r[this.parentNode.rowIndex + "-" + this.cellIndex];
                    this.order = formatSortingOrder(e.config.sortInitialOrder);
                    this.count = this.order;
                    if (checkHeaderMetadata(this) || checkHeaderOptions(e, t)) this.sortDisabled = !0;
                    checkHeaderOptionsSortingLocked(e, t) && (this.order = this.lockedOrder = checkHeaderOptionsSortingLocked(e, t));
                    if (!this.sortDisabled) {
                        var n = $(this).addClass(e.config.cssHeader);
                        e.config.onRenderHeader && e.config.onRenderHeader.apply(n)
                    }
                    e.config.headerList[t] = this
                });
                if (e.config.debug) {
                    benchmark("Built headers:", t);
                    log($tableHeaders)
                }
                return $tableHeaders
            }

            function computeTableHeaderCellIndexes(e) {
                var t = [],
                    n = {},
                    r = e.getElementsByTagName("THEAD")[0],
                    i = r.getElementsByTagName("TR");
                for (var s = 0; s < i.length; s++) {
                    var o = i[s].cells;
                    for (var u = 0; u < o.length; u++) {
                        var a = o[u],
                            f = a.parentNode.rowIndex,
                            l = f + "-" + a.cellIndex,
                            c = a.rowSpan || 1,
                            h = a.colSpan || 1,
                            p;
                        typeof t[f] == "undefined" && (t[f] = []);
                        for (var d = 0; d < t[f].length + 1; d++)
                        if (typeof t[f][d] == "undefined") {
                            p = d;
                            break
                        }
                        n[l] = p;
                        for (var d = f; d < f + c; d++) {
                            typeof t[d] == "undefined" && (t[d] = []);
                            var v = t[d];
                            for (var m = p; m < p + h; m++) v[m] = "x"
                        }
                    }
                }
                return n
            }

            function checkCellColSpan(e, t, n) {
                var r = [],
                    i = e.tHead.rows,
                    s = i[n].cells;
                for (var o = 0; o < s.length; o++) {
                    var u = s[o];
                    u.colSpan > 1 ? r = r.concat(checkCellColSpan(e, headerArr, n++)) : (e.tHead.length == 1 || u.rowSpan > 1 || !i[n + 1]) && r.push(u)
                }
                return r
            }

            function checkHeaderMetadata(e) {
                return $.metadata && $(e).metadata().sorter === !1 ? !0 : !1
            }

            function checkHeaderOptions(e, t) {
                return e.config.headers[t] && e.config.headers[t].sorter === !1 ? !0 : !1
            }

            function checkHeaderOptionsSortingLocked(e, t) {
                return e.config.headers[t] && e.config.headers[t].lockedOrder ? e.config.headers[t].lockedOrder : !1
            }

            function applyWidget(e) {
                var t = e.config.widgets,
                    n = t.length;
                for (var r = 0; r < n; r++) getWidgetById(t[r]).format(e)
            }

            function getWidgetById(e) {
                var t = widgets.length;
                for (var n = 0; n < t; n++)
                if (widgets[n].id.toLowerCase() == e.toLowerCase()) return widgets[n]
            }

            function formatSortingOrder(e) {
                return typeof e != "Number" ? e.toLowerCase() == "desc" ? 1 : 0 : e == 1 ? 1 : 0
            }

            function isValueInArray(e, t) {
                var n = t.length;
                for (var r = 0; r < n; r++)
                if (t[r][0] == e) return !0;
                return !1
            }

            function setHeadersCss(e, t, n, r) {
                t.removeClass(r[0]).removeClass(r[1]);
                var i = [];
                t.each(function(e) {
                    this.sortDisabled || (i[this.column] = $(this))
                });
                var s = n.length;
                for (var o = 0; o < s; o++) i[n[o][0]].addClass(r[n[o][1]])
            }

            function fixColumnWidth(e, t) {
                var n = e.config;
                if (n.widthFixed) {
                    var r = $("<colgroup>");
                    $("tr:first td", e.tBodies[0]).each(function() {
                        r.append($("<col>").css("width", $(this).width()))
                    });
                    $(e).prepend(r)
                }
            }

            function updateHeaderSortCount(e, t) {
                var n = e.config,
                    r = t.length;
                for (var i = 0; i < r; i++) {
                    var s = t[i],
                        o = n.headerList[s[0]];
                    o.count = s[1];
                    o.count++
                }
            }

            function multisort(table, sortList, cache) {
                if (table.config.debug) var sortTime = new Date;
                var dynamicExp = "var sortWrapper = function(a,b) {",
                    l = sortList.length;
                for (var i = 0; i < l; i++) {
                    var c = sortList[i][0],
                        order = sortList[i][1],
                        s = table.config.parsers[c].type == "text" ? order == 0 ? makeSortFunction("text", "asc", c) : makeSortFunction("text", "desc", c) : order == 0 ? makeSortFunction("numeric", "asc", c) : makeSortFunction("numeric", "desc", c),
                        e = "e" + i;
                    dynamicExp += "var " + e + " = " + s;
                    dynamicExp += "if(" + e + ") { return " + e + "; } ";
                    dynamicExp += "else { "
                }
                var orgOrderCol = cache.normalized[0].length - 1;
                dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
                for (var i = 0; i < l; i++) dynamicExp += "}; ";
                dynamicExp += "return 0; ";
                dynamicExp += "}; ";
                table.config.debug && benchmark("Evaling expression:" + dynamicExp, new Date);
                eval(dynamicExp);
                cache.normalized.sort(sortWrapper);
                table.config.debug && benchmark("Sorting on " + sortList.toString() + " and dir " + order + " time:", sortTime);
                return cache
            }

            function makeSortFunction(e, t, n) {
                var r = "a[" + n + "]",
                    i = "b[" + n + "]";
                if (e == "text" && t == "asc") return "(" + r + " == " + i + " ? 0 : (" + r + " === null ? Number.POSITIVE_INFINITY : (" + i + " === null ? Number.NEGATIVE_INFINITY : (" + r + " < " + i + ") ? -1 : 1 )));";
                if (e == "text" && t == "desc") return "(" + r + " == " + i + " ? 0 : (" + r + " === null ? Number.POSITIVE_INFINITY : (" + i + " === null ? Number.NEGATIVE_INFINITY : (" + i + " < " + r + ") ? -1 : 1 )));";
                if (e == "numeric" && t == "asc") return "(" + r + " === null && " + i + " === null) ? 0 :(" + r + " === null ? Number.POSITIVE_INFINITY : (" + i + " === null ? Number.NEGATIVE_INFINITY : " + r + " - " + i + "));";
                if (e == "numeric" && t == "desc") return "(" + r + " === null && " + i + " === null) ? 0 :(" + r + " === null ? Number.POSITIVE_INFINITY : (" + i + " === null ? Number.NEGATIVE_INFINITY : " + i + " - " + r + "));"
            }

            function makeSortText(e) {
                return "((a[" + e + "] < b[" + e + "]) ? -1 : ((a[" + e + "] > b[" + e + "]) ? 1 : 0));"
            }

            function makeSortTextDesc(e) {
                return "((b[" + e + "] < a[" + e + "]) ? -1 : ((b[" + e + "] > a[" + e + "]) ? 1 : 0));"
            }

            function makeSortNumeric(e) {
                return "a[" + e + "]-b[" + e + "];"
            }

            function makeSortNumericDesc(e) {
                return "b[" + e + "]-a[" + e + "];"
            }

            function sortText(e, t) {
                return table.config.sortLocaleCompare ? e.localeCompare(t) : e < t ? -1 : e > t ? 1 : 0
            }

            function sortTextDesc(e, t) {
                return table.config.sortLocaleCompare ? t.localeCompare(e) : t < e ? -1 : t > e ? 1 : 0
            }

            function sortNumeric(e, t) {
                return e - t
            }

            function sortNumericDesc(e, t) {
                return t - e
            }

            function getCachedSortType(e, t) {
                return e[t].type
            }
            var parsers = [],
                widgets = [];
            this.defaults = {
                cssHeader: "header",
                cssAsc: "headerSortUp",
                cssDesc: "headerSortDown",
                cssChildRow: "expand-child",
                sortInitialOrder: "asc",
                sortMultiSortKey: "shiftKey",
                sortForce: null,
                sortAppend: null,
                sortLocaleCompare: !0,
                textExtraction: "simple",
                parsers: {},
                widgets: [],
                widgetZebra: {
                    css: ["even", "odd"]
                },
                headers: {},
                widthFixed: !1,
                cancelSelection: !0,
                sortList: [],
                headerList: [],
                dateFormat: "us",
                decimal: "/.|,/g",
                onRenderHeader: null,
                selectorHeaders: "thead th",
                debug: !1
            };
            this.benchmark = benchmark;
            this.construct = function(e) {
                return this.each(function() {
                    if (!this.tHead || !this.tBodies) return;
                    var t, n, r, i, s, o = 0,
                        u;
                    this.config = {};
                    s = $.extend(this.config, $.tablesorter.defaults, e);
                    t = $(this);
                    $.data(this, "tablesorter", s);
                    r = buildHeaders(this);
                    this.config.parsers = buildParserCache(this, r);
                    i = buildCache(this);
                    var a = [s.cssDesc, s.cssAsc];
                    fixColumnWidth(this);
                    r.click(function(e) {
                        var n = t[0].tBodies[0] && t[0].tBodies[0].rows.length || 0;
                        if (!this.sortDisabled && n > 0) {
                            t.trigger("sortStart");
                            var o = $(this),
                                u = this.column;
                            this.order = this.count++ % 2;
                            this.lockedOrder && (this.order = this.lockedOrder);
                            if (!e[s.sortMultiSortKey]) {
                                s.sortList = [];
                                if (s.sortForce != null) {
                                    var f = s.sortForce;
                                    for (var l = 0; l < f.length; l++) f[l][0] != u && s.sortList.push(f[l])
                                }
                                s.sortList.push([u, this.order])
                            } else if (isValueInArray(u, s.sortList)) for (var l = 0; l < s.sortList.length; l++) {
                                var c = s.sortList[l],
                                    h = s.headerList[c[0]];
                                if (c[0] == u) {
                                    h.count = c[1];
                                    h.count++;
                                    c[1] = h.count % 2
                                }
                            } else s.sortList.push([u, this.order]);
                            setTimeout(function() {
                                setHeadersCss(t[0], r, s.sortList, a);
                                appendToTable(t[0], multisort(t[0], s.sortList, i))
                            }, 1);
                            return !1
                        }
                    }).mousedown(function() {
                        if (s.cancelSelection) {
                            this.onselectstart = function() {
                                return !1
                            };
                            return !1
                        }
                    });
                    t.bind("update", function() {
                        var e = this;
                        setTimeout(function() {
                            e.config.parsers = buildParserCache(e, r);
                            i = buildCache(e)
                        }, 1)
                    }).bind("updateCell", function(e, t) {
                        var n = this.config,
                            r = [t.parentNode.rowIndex - 1, t.cellIndex];
                        i.normalized[r[0]][r[1]] = n.parsers[r[1]].format(getElementText(n, t), t)
                    }).bind("sorton", function(e, t) {
                        $(this).trigger("sortStart");
                        s.sortList = t;
                        var n = s.sortList;
                        updateHeaderSortCount(this, n);
                        setHeadersCss(this, r, n, a);
                        appendToTable(this, multisort(this, n, i))
                    }).bind("appendCache", function() {
                        appendToTable(this, i)
                    }).bind("applyWidgetId", function(e, t) {
                        getWidgetById(t).format(this)
                    }).bind("applyWidgets", function() {
                        applyWidget(this)
                    });
                    $.metadata && $(this).metadata() && $(this).metadata().sortlist && (s.sortList = $(this).metadata().sortlist);
                    s.sortList.length > 0 && t.trigger("sorton", [s.sortList]);
                    applyWidget(this)
                })
            };
            this.addParser = function(e) {
                var t = parsers.length,
                    n = !0;
                for (var r = 0; r < t; r++) parsers[r].id.toLowerCase() == e.id.toLowerCase() && (n = !1);
                n && parsers.push(e)
            };
            this.addWidget = function(e) {
                widgets.push(e)
            };
            this.formatFloat = function(e) {
                var t = parseFloat(e);
                return isNaN(t) ? 0 : t
            };
            this.formatInt = function(e) {
                var t = parseInt(e);
                return isNaN(t) ? 0 : t
            };
            this.isDigit = function(e, t) {
                return /^[-+]?\d*$/.test($.trim(e.replace(/[,.']/g, "")))
            };
            this.clearTableBody = function(e) {
                if ($.browser.msie) {
                    function t() {
                        while (this.firstChild) this.removeChild(this.firstChild)
                    }
                    t.apply(e.tBodies[0])
                } else e.tBodies[0].innerHTML = ""
            }
        }
    });
    $.fn.extend({
        tablesorter: $.tablesorter.construct
    });
    var ts = $.tablesorter;
    ts.addParser({
        id: "text",
        is: function(e) {
            return !0
        },
        format: function(e) {
            return $.trim(e.toLocaleLowerCase())
        },
        type: "text"
    });
    ts.addParser({
        id: "digit",
        is: function(e, t) {
            var n = t.config;
            return $.tablesorter.isDigit(e, n)
        },
        format: function(e) {
            return $.tablesorter.formatFloat(e)
        },
        type: "numeric"
    });
    ts.addParser({
        id: "currency",
        is: function(e) {
            return /^[Â£$â‚¬?.]/.test(e)
        },
        format: function(e) {
            return $.tablesorter.formatFloat(e.replace(new RegExp(/[Â£$â‚¬]/g), ""))
        },
        type: "numeric"
    });
    ts.addParser({
        id: "ipAddress",
        is: function(e) {
            return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(e)
        },
        format: function(e) {
            var t = e.split("."),
                n = "",
                r = t.length;
            for (var i = 0; i < r; i++) {
                var s = t[i];
                s.length == 2 ? n += "0" + s : n += s
            }
            return $.tablesorter.formatFloat(n)
        },
        type: "numeric"
    });
    ts.addParser({
        id: "url",
        is: function(e) {
            return /^(https?|ftp|file):\/\/$/.test(e)
        },
        format: function(e) {
            return jQuery.trim(e.replace(new RegExp(/(https?|ftp|file):\/\//), ""))
        },
        type: "text"
    });
    ts.addParser({
        id: "isoDate",
        is: function(e) {
            return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(e)
        },
        format: function(e) {
            return $.tablesorter.formatFloat(e != "" ? (new Date(e.replace(new RegExp(/-/g), "/"))).getTime() : "0")
        },
        type: "numeric"
    });
    ts.addParser({
        id: "percent",
        is: function(e) {
            return /\%$/.test($.trim(e))
        },
        format: function(e) {
            return $.tablesorter.formatFloat(e.replace(new RegExp(/%/g), ""))
        },
        type: "numeric"
    });
    ts.addParser({
        id: "usLongDate",
        is: function(e) {
            return e.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/))
        },
        format: function(e) {
            return $.tablesorter.formatFloat((new Date(e)).getTime())
        },
        type: "numeric"
    });
    ts.addParser({
        id: "shortDate",
        is: function(e) {
            return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(e)
        },
        format: function(e, t) {
            var n = t.config;
            e = e.replace(/\-/g, "/");
            if (n.dateFormat == "us") e = e.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2");
            else if (n.dateFormat == "uk") e = e.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1");
            else if (n.dateFormat == "dd/mm/yy" || n.dateFormat == "dd-mm-yy") e = e.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3");
            return $.tablesorter.formatFloat((new Date(e)).getTime())
        },
        type: "numeric"
    });
    ts.addParser({
        id: "time",
        is: function(e) {
            return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(e)
        },
        format: function(e) {
            return $.tablesorter.formatFloat((new Date("2000/01/01 " + e)).getTime())
        },
        type: "numeric"
    });
    ts.addParser({
        id: "metadata",
        is: function(e) {
            return !1
        },
        format: function(e, t, n) {
            var r = t.config,
                i = r.parserMetadataName ? r.parserMetadataName : "sortValue";
            return $(n).metadata()[i]
        },
        type: "numeric"
    });
    ts.addWidget({
        id: "zebra",
        format: function(e) {
            if (e.config.debug) var t = new Date;
            var n, r = -1,
                i;
            $("tr:visible", e.tBodies[0]).each(function(t) {
                n = $(this);
                n.hasClass(e.config.cssChildRow) || r++;
                i = r % 2 == 0;
                n.removeClass(e.config.widgetZebra.css[i ? 0 : 1]).addClass(e.config.widgetZebra.css[i ? 1 : 0])
            });
            e.config.debug && $.tablesorter.benchmark("Applying Zebra widget", t)
        }
    })
})(jQuery);
(function(e) {
    "use strict";
    e.fn.fitVids = function(t) {
        var n = {
            customSelector: null
        },
            r = document.createElement("div"),
            i = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0];
        r.className = "fit-vids-style";
        r.innerHTML = "&shy;<style>               .fluid-width-video-wrapper {                 width: 100%;                              position: relative;                       padding: 0;                            }                                                                                   .fluid-width-video-wrapper iframe,        .fluid-width-video-wrapper object,        .fluid-width-video-wrapper embed {           position: absolute;                       top: 0;                                   left: 0;                                  width: 100%;                              height: 100%;                          }                                       </style>";
        i.parentNode.insertBefore(r, i);
        t && e.extend(n, t);
        return this.each(function() {
            var t = ["iframe[src*='player.vimeo.com']", "iframe[src*='www.youtube.com']", "iframe[src*='www.kickstarter.com']", "object", "embed"];
            n.customSelector && t.push(n.customSelector);
            var r = e(this).find(t.join(","));
            r.each(function() {
                var t = e(this);
                if (this.tagName.toLowerCase() === "embed" && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length) return;
                var n = this.tagName.toLowerCase() === "object" || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height(),
                    r = isNaN(parseInt(t.attr("width"), 10)) ? t.width() : parseInt(t.attr("width"), 10),
                    i = n / r;
                if (!t.attr("id")) {
                    var s = "fitvid" + Math.floor(Math.random() * 999999);
                    t.attr("id", s)
                }
                t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", i * 100 + "%");
                t.removeAttr("height").removeAttr("width")
            })
        })
    }
})(jQuery);
(function(e) {
    "use strict";

    function t(e) {
        return new RegExp("(^|\\s+)" + e + "(\\s+|$)")
    }

    function s(e, t) {
        var s = n(e, t) ? i : r;
        s(e, t)
    }
    var n, r, i;
    if ("classList" in document.documentElement) {
        n = function(e, t) {
            return e.classList.contains(t)
        };
        r = function(e, t) {
            e.classList.add(t)
        };
        i = function(e, t) {
            e.classList.remove(t)
        }
    } else {
        n = function(e, n) {
            return t(n).test(e.className)
        };
        r = function(e, t) {
            n(e, t) || (e.className = e.className + " " + t)
        };
        i = function(e, n) {
            e.className = e.className.replace(t(n), " ")
        }
    }
    var o = {
        hasClass: n,
        addClass: r,
        removeClass: i,
        toggleClass: s,
        has: n,
        add: r,
        remove: i,
        toggle: s
    };
    typeof define == "function" && define.amd ? define(o) : e.classie = o
})(window);
(function(e) {
    "use strict";

    function t(e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
    }

    function n(e, t) {
        if (!e) return !1;
        var n = e.target || e.srcElement || e || !1;
        while (n && n.id != t) n = n.parentNode || !1;
        return n !== !1
    }

    function r(e, t, n, i) {
        i = i || 0;
        if (e.id.indexOf(t) >= 0) return i;
        classie.has(e, n) && ++i;
        return e.parentNode && r(e.parentNode, t, n, i)
    }

    function i() {
        var t = !1;
        (function(e) {
            if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) t = !0
        })(navigator.userAgent || navigator.vendor || e.opera);
        return t
    }

    function s(e, t) {
        return classie.has(e, t) ? e : e.parentNode && s(e.parentNode, t)
    }

    function o(e, n, r) {
        this.el = e;
        this.trigger = n;
        this.options = t(this.defaults, r);
        this.support = Modernizr.csstransforms3d;
        this.support && this._init()
    }
    o.prototype = {
        defaults: {
            type: "overlap",
            levelSpacing: 40,
            backClass: "mp-back"
        },
        _init: function() {
            this.open = !1;
            this.level = 0;
            this.wrapper = document.getElementById("mp-pusher");
            this.levels = Array.prototype.slice.call(this.el.querySelectorAll("div.mp-level"));
            var e = this;
            this.levels.forEach(function(t, n) {
                t.setAttribute("data-level", r(t, e.el.id, "mp-level"))
            });
            this.menuItems = Array.prototype.slice.call(this.el.querySelectorAll("li"));
            this.levelBack = Array.prototype.slice.call(this.el.querySelectorAll("." + this.options.backClass));
            this.eventtype = i() ? "touchstart" : "click";
            classie.add(this.el, "mp-" + this.options.type);
            this._initEvents()
        },
        _initEvents: function() {
            var e = this,
                t = function(n) {
                    e._resetMenu();
                    n.removeEventListener(e.eventtype, t)
                };
            this.trigger.addEventListener(this.eventtype, function(r) {
                r.stopPropagation();
                r.preventDefault();
                if (e.open) e._resetMenu();
                else {
                    e._openMenu();
                    document.addEventListener(e.eventtype, function(r) {
                        e.open && !n(r.target, e.el.id) && t(this)
                    })
                }
            });
            this.menuItems.forEach(function(t, n) {
                var r = t.querySelector("div.mp-level");
                r && t.querySelector("a").addEventListener(e.eventtype, function(n) {
                    n.preventDefault();
                    var i = s(t, "mp-level").getAttribute("data-level");
                    if (e.level <= i) {
                        n.stopPropagation();
                        classie.add(s(t, "mp-level"), "mp-level-overlay");
                        e._openMenu(r)
                    }
                })
            });
            this.levels.forEach(function(t, n) {
                t.addEventListener(e.eventtype, function(n) {
                    n.stopPropagation();
                    var r = t.getAttribute("data-level");
                    if (e.level > r) {
                        e.level = r;
                        e._closeMenu()
                    }
                })
            });
            this.levelBack.forEach(function(t, n) {
                t.addEventListener(e.eventtype, function(n) {
                    n.preventDefault();
                    var r = s(t, "mp-level").getAttribute("data-level");
                    if (e.level <= r) {
                        n.stopPropagation();
                        e.level = s(t, "mp-level").getAttribute("data-level") - 1;
                        e.level === 0 ? e._resetMenu() : e._closeMenu()
                    }
                })
            })
        },
        _openMenu: function(e) {
            ++this.level;
            var t = (this.level - 1) * this.options.levelSpacing,
                n = this.options.type === "overlap" ? this.el.offsetWidth + t : this.el.offsetWidth;
            this._setTransform("translate3d(" + n + "px,0,0)");
            if (e) {
                this._setTransform("", e);
                for (var r = 0, i = this.levels.length; r < i; ++r) {
                    var s = this.levels[r];
                    s != e && !classie.has(s, "mp-level-open") && this._setTransform("translate3d(-100%,0,0) translate3d(" + -1 * t + "px,0,0)", s)
                }
            }
            if (this.level === 1) {
                classie.add(this.wrapper, "mp-pushed");
                this.open = !0
            }
            classie.add(e || this.levels[0], "mp-level-open")
        },
        _resetMenu: function() {
            this._setTransform("translate3d(0,0,0)");
            this.level = 0;
            classie.remove(this.wrapper, "mp-pushed");
            this._toggleLevels();
            this.open = !1
        },
        _closeMenu: function() {
            var e = this.options.type === "overlap" ? this.el.offsetWidth + (this.level - 1) * this.options.levelSpacing : this.el.offsetWidth;
            this._setTransform("translate3d(" + e + "px,0,0)");
            this._toggleLevels()
        },
        _setTransform: function(e, t) {
            t = t || this.wrapper;
            t.style.WebkitTransform = e;
            t.style.MozTransform = e;
            t.style.transform = e
        },
        _toggleLevels: function() {
            for (var e = 0, t = this.levels.length; e < t; ++e) {
                var n = this.levels[e];
                if (n.getAttribute("data-level") >= this.level + 1) {
                    classie.remove(n, "mp-level-open");
                    classie.remove(n, "mp-level-overlay")
                } else Number(n.getAttribute("data-level")) == this.level && classie.remove(n, "mp-level-overlay")
            }
        }
    };
    e.mlPushMenu = o
})(window);
(function(e) {
    e.flexslider = function(t, n) {
        var r = e(t);
        r.vars = e.extend({}, e.flexslider.defaults, n);
        var i = r.vars.namespace,
            s = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            o = ("ontouchstart" in window || s || window.DocumentTouch && document instanceof DocumentTouch) && r.vars.touch,
            u = "click touchend MSPointerUp",
            a = "",
            f, l = r.vars.direction === "vertical",
            c = r.vars.reverse,
            h = r.vars.itemWidth > 0,
            p = r.vars.animation === "fade",
            d = r.vars.asNavFor !== "",
            v = {},
            m = !0;
        e.data(t, "flexslider", r);
        v = {
            init: function() {
                r.animating = !1;
                r.currentSlide = parseInt(r.vars.startAt ? r.vars.startAt : 0);
                isNaN(r.currentSlide) && (r.currentSlide = 0);
                r.animatingTo = r.currentSlide;
                r.atEnd = r.currentSlide === 0 || r.currentSlide === r.last;
                r.containerSelector = r.vars.selector.substr(0, r.vars.selector.search(" "));
                r.slides = e(r.vars.selector, r);
                r.container = e(r.containerSelector, r);
                r.count = r.slides.length;
                r.syncExists = e(r.vars.sync).length > 0;
                r.vars.animation === "slide" && (r.vars.animation = "swing");
                r.prop = l ? "top" : "marginLeft";
                r.args = {};
                r.manualPause = !1;
                r.stopped = !1;
                r.started = !1;
                r.startTimeout = null;
                r.transitions = !r.vars.video && !p && r.vars.useCSS &&
                function() {
                    var e = document.createElement("div"),
                        t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var n in t)
                    if (e.style[t[n]] !== undefined) {
                        r.pfx = t[n].replace("Perspective", "").toLowerCase();
                        r.prop = "-" + r.pfx + "-transform";
                        return !0
                    }
                    return !1
                }();
                r.vars.controlsContainer !== "" && (r.controlsContainer = e(r.vars.controlsContainer).length > 0 && e(r.vars.controlsContainer));
                r.vars.manualControls !== "" && (r.manualControls = e(r.vars.manualControls).length > 0 && e(r.vars.manualControls));
                if (r.vars.randomize) {
                    r.slides.sort(function() {
                        return Math.round(Math.random()) - .5
                    });
                    r.container.empty().append(r.slides)
                }
                r.doMath();
                r.setup("init");
                r.vars.controlNav && v.controlNav.setup();
                r.vars.directionNav && v.directionNav.setup();
                r.vars.keyboard && (e(r.containerSelector).length === 1 || r.vars.multipleKeyboard) && e(document).bind("keyup", function(e) {
                    var t = e.keyCode;
                    if (!r.animating && (t === 39 || t === 37)) {
                        var n = t === 39 ? r.getTarget("next") : t === 37 ? r.getTarget("prev") : !1;
                        r.flexAnimate(n, r.vars.pauseOnAction)
                    }
                });
                r.vars.mousewheel && r.bind("mousewheel", function(e, t, n, i) {
                    e.preventDefault();
                    var s = t < 0 ? r.getTarget("next") : r.getTarget("prev");
                    r.flexAnimate(s, r.vars.pauseOnAction)
                });
                r.vars.pausePlay && v.pausePlay.setup();
                r.vars.slideshow && r.vars.pauseInvisible && v.pauseInvisible.init();
                if (r.vars.slideshow) {
                    r.vars.pauseOnHover && r.hover(function() {
                        !r.manualPlay && !r.manualPause && r.pause()
                    }, function() {
                        !r.manualPause && !r.manualPlay && !r.stopped && r.play()
                    });
                    if (!r.vars.pauseInvisible || !v.pauseInvisible.isHidden()) r.vars.initDelay > 0 ? r.startTimeout = setTimeout(r.play, r.vars.initDelay) : r.play()
                }
                d && v.asNav.setup();
                o && r.vars.touch && v.touch();
                (!p || p && r.vars.smoothHeight) && e(window).bind("resize orientationchange focus", v.resize);
                r.find("img").attr("draggable", "false");
                setTimeout(function() {
                    r.vars.start(r)
                }, 200)
            },
            asNav: {
                setup: function() {
                    r.asNav = !0;
                    r.animatingTo = Math.floor(r.currentSlide / r.move);
                    r.currentItem = r.currentSlide;
                    r.slides.removeClass(i + "active-slide").eq(r.currentItem).addClass(i + "active-slide");
                    if (!s) r.slides.click(function(t) {
                        t.preventDefault();
                        var n = e(this),
                            s = n.index(),
                            o = n.offset().left - e(r).scrollLeft();
                        if (o <= 0 && n.hasClass(i + "active-slide")) r.flexAnimate(r.getTarget("prev"), !0);
                        else if (!e(r.vars.asNavFor).data("flexslider").animating && !n.hasClass(i + "active-slide")) {
                            r.direction = r.currentItem < s ? "next" : "prev";
                            r.flexAnimate(s, r.vars.pauseOnAction, !1, !0, !0)
                        }
                    });
                    else {
                        t._slider = r;
                        r.slides.each(function() {
                            var t = this;
                            t._gesture = new MSGesture;
                            t._gesture.target = t;
                            t.addEventListener("MSPointerDown", function(e) {
                                e.preventDefault();
                                e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                            }, !1);
                            t.addEventListener("MSGestureTap", function(t) {
                                t.preventDefault();
                                var n = e(this),
                                    i = n.index();
                                if (!e(r.vars.asNavFor).data("flexslider").animating && !n.hasClass("active")) {
                                    r.direction = r.currentItem < i ? "next" : "prev";
                                    r.flexAnimate(i, r.vars.pauseOnAction, !1, !0, !0)
                                }
                            })
                        })
                    }
                }
            },
            controlNav: {
                setup: function() {
                    r.manualControls ? v.controlNav.setupManual() : v.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var t = r.vars.controlNav === "thumbnails" ? "control-thumbs" : "control-paging",
                        n = 1,
                        s, o;
                    r.controlNavScaffold = e('<ol class="' + i + "control-nav " + i + t + '"></ol>');
                    if (r.pagingCount > 1) for (var f = 0; f < r.pagingCount; f++) {
                        o = r.slides.eq(f);
                        s = r.vars.controlNav === "thumbnails" ? '<img src="' + o.attr("data-thumb") + '"/>' : "<a>" + n + "</a>";
                        if ("thumbnails" === r.vars.controlNav && !0 === r.vars.thumbCaptions) {
                            var l = o.attr("data-thumbcaption");
                            "" != l && undefined != l && (s += '<span class="' + i + 'caption">' + l + "</span>")
                        }
                        r.controlNavScaffold.append("<li>" + s + "</li>");
                        n++
                    }
                    r.controlsContainer ? e(r.controlsContainer).append(r.controlNavScaffold) : r.append(r.controlNavScaffold);
                    v.controlNav.set();
                    v.controlNav.active();
                    r.controlNavScaffold.delegate("a, img", u, function(t) {
                        t.preventDefault();
                        if (a === "" || a === t.type) {
                            var n = e(this),
                                s = r.controlNav.index(n);
                            if (!n.hasClass(i + "active")) {
                                r.direction = s > r.currentSlide ? "next" : "prev";
                                r.flexAnimate(s, r.vars.pauseOnAction)
                            }
                        }
                        a === "" && (a = t.type);
                        v.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    r.controlNav = r.manualControls;
                    v.controlNav.active();
                    r.controlNav.bind(u, function(t) {
                        t.preventDefault();
                        if (a === "" || a === t.type) {
                            var n = e(this),
                                s = r.controlNav.index(n);
                            if (!n.hasClass(i + "active")) {
                                s > r.currentSlide ? r.direction = "next" : r.direction = "prev";
                                r.flexAnimate(s, r.vars.pauseOnAction)
                            }
                        }
                        a === "" && (a = t.type);
                        v.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var t = r.vars.controlNav === "thumbnails" ? "img" : "a";
                    r.controlNav = e("." + i + "control-nav li " + t, r.controlsContainer ? r.controlsContainer : r)
                },
                active: function() {
                    r.controlNav.removeClass(i + "active").eq(r.animatingTo).addClass(i + "active")
                },
                update: function(t, n) {
                    r.pagingCount > 1 && t === "add" ? r.controlNavScaffold.append(e("<li><a>" + r.count + "</a></li>")) : r.pagingCount === 1 ? r.controlNavScaffold.find("li").remove() : r.controlNav.eq(n).closest("li").remove();
                    v.controlNav.set();
                    r.pagingCount > 1 && r.pagingCount !== r.controlNav.length ? r.update(n, t) : v.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var t = e('<ul class="' + i + 'direction-nav"><li><a class="' + i + 'prev" href="#">' + r.vars.prevText + '</a></li><li><a class="' + i + 'next" href="#">' + r.vars.nextText + "</a></li></ul>");
                    if (r.controlsContainer) {
                        e(r.controlsContainer).append(t);
                        r.directionNav = e("." + i + "direction-nav li a", r.controlsContainer)
                    } else {
                        r.append(t);
                        r.directionNav = e("." + i + "direction-nav li a", r)
                    }
                    v.directionNav.update();
                    r.directionNav.bind(u, function(t) {
                        t.preventDefault();
                        var n;
                        if (a === "" || a === t.type) {
                            n = e(this).hasClass(i + "next") ? r.getTarget("next") : r.getTarget("prev");
                            r.flexAnimate(n, r.vars.pauseOnAction)
                        }
                        a === "" && (a = t.type);
                        v.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var e = i + "disabled";
                    r.pagingCount === 1 ? r.directionNav.addClass(e).attr("tabindex", "-1") : r.vars.animationLoop ? r.directionNav.removeClass(e).removeAttr("tabindex") : r.animatingTo === 0 ? r.directionNav.removeClass(e).filter("." + i + "prev").addClass(e).attr("tabindex", "-1") : r.animatingTo === r.last ? r.directionNav.removeClass(e).filter("." + i + "next").addClass(e).attr("tabindex", "-1") : r.directionNav.removeClass(e).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var t = e('<div class="' + i + 'pauseplay"><a></a></div>');
                    if (r.controlsContainer) {
                        r.controlsContainer.append(t);
                        r.pausePlay = e("." + i + "pauseplay a", r.controlsContainer)
                    } else {
                        r.append(t);
                        r.pausePlay = e("." + i + "pauseplay a", r)
                    }
                    v.pausePlay.update(r.vars.slideshow ? i + "pause" : i + "play");
                    r.pausePlay.bind(u, function(t) {
                        t.preventDefault();
                        if (a === "" || a === t.type) if (e(this).hasClass(i + "pause")) {
                            r.manualPause = !0;
                            r.manualPlay = !1;
                            r.pause()
                        } else {
                            r.manualPause = !1;
                            r.manualPlay = !0;
                            r.play()
                        }
                        a === "" && (a = t.type);
                        v.setToClearWatchedEvent()
                    })
                },
                update: function(e) {
                    e === "play" ? r.pausePlay.removeClass(i + "pause").addClass(i + "play").html(r.vars.playText) : r.pausePlay.removeClass(i + "play").addClass(i + "pause").html(r.vars.pauseText)
                }
            },
            touch: function() {
                var e, n, i, o, u, a, f = !1,
                    d = 0,
                    v = 0,
                    m = 0;
                if (!s) {
                    t.addEventListener("touchstart", g, !1);

                    function g(s) {
                        if (r.animating) s.preventDefault();
                        else if (window.navigator.msPointerEnabled || s.touches.length === 1) {
                            r.pause();
                            o = l ? r.h : r.w;
                            a = Number(new Date);
                            d = s.touches[0].pageX;
                            v = s.touches[0].pageY;
                            i = h && c && r.animatingTo === r.last ? 0 : h && c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : h && r.currentSlide === r.last ? r.limit : h ? (r.itemW + r.vars.itemMargin) * r.move * r.currentSlide : c ? (r.last - r.currentSlide + r.cloneOffset) * o : (r.currentSlide + r.cloneOffset) * o;
                            e = l ? v : d;
                            n = l ? d : v;
                            t.addEventListener("touchmove", y, !1);
                            t.addEventListener("touchend", b, !1)
                        }
                    }

                    function y(t) {
                        d = t.touches[0].pageX;
                        v = t.touches[0].pageY;
                        u = l ? e - v : e - d;
                        f = l ? Math.abs(u) < Math.abs(d - n) : Math.abs(u) < Math.abs(v - n);
                        var s = 500;
                        if (!f || Number(new Date) - a > s) {
                            t.preventDefault();
                            if (!p && r.transitions) {
                                r.vars.animationLoop || (u /= r.currentSlide === 0 && u < 0 || r.currentSlide === r.last && u > 0 ? Math.abs(u) / o + 2 : 1);
                                r.setProps(i + u, "setTouch")
                            }
                        }
                    }

                    function b(s) {
                        t.removeEventListener("touchmove", y, !1);
                        if (r.animatingTo === r.currentSlide && !f && u !== null) {
                            var l = c ? -u : u,
                                h = l > 0 ? r.getTarget("next") : r.getTarget("prev");
                            r.canAdvance(h) && (Number(new Date) - a < 550 && Math.abs(l) > 50 || Math.abs(l) > o / 2) ? r.flexAnimate(h, r.vars.pauseOnAction) : p || r.flexAnimate(r.currentSlide, r.vars.pauseOnAction, !0)
                        }
                        t.removeEventListener("touchend", b, !1);
                        e = null;
                        n = null;
                        u = null;
                        i = null
                    }
                } else {
                    t.style.msTouchAction = "none";
                    t._gesture = new MSGesture;
                    t._gesture.target = t;
                    t.addEventListener("MSPointerDown", w, !1);
                    t._slider = r;
                    t.addEventListener("MSGestureChange", E, !1);
                    t.addEventListener("MSGestureEnd", S, !1);

                    function w(e) {
                        e.stopPropagation();
                        if (r.animating) e.preventDefault();
                        else {
                            r.pause();
                            t._gesture.addPointer(e.pointerId);
                            m = 0;
                            o = l ? r.h : r.w;
                            a = Number(new Date);
                            i = h && c && r.animatingTo === r.last ? 0 : h && c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : h && r.currentSlide === r.last ? r.limit : h ? (r.itemW + r.vars.itemMargin) * r.move * r.currentSlide : c ? (r.last - r.currentSlide + r.cloneOffset) * o : (r.currentSlide + r.cloneOffset) * o
                        }
                    }

                    function E(e) {
                        e.stopPropagation();
                        var n = e.target._slider;
                        if (!n) return;
                        var r = -e.translationX,
                            s = -e.translationY;
                        m += l ? s : r;
                        u = m;
                        f = l ? Math.abs(m) < Math.abs(-r) : Math.abs(m) < Math.abs(-s);
                        if (e.detail === e.MSGESTURE_FLAG_INERTIA) {
                            setImmediate(function() {
                                t._gesture.stop()
                            });
                            return
                        }
                        if (!f || Number(new Date) - a > 500) {
                            e.preventDefault();
                            if (!p && n.transitions) {
                                n.vars.animationLoop || (u = m / (n.currentSlide === 0 && m < 0 || n.currentSlide === n.last && m > 0 ? Math.abs(m) / o + 2 : 1));
                                n.setProps(i + u, "setTouch")
                            }
                        }
                    }

                    function S(t) {
                        t.stopPropagation();
                        var r = t.target._slider;
                        if (!r) return;
                        if (r.animatingTo === r.currentSlide && !f && u !== null) {
                            var s = c ? -u : u,
                                l = s > 0 ? r.getTarget("next") : r.getTarget("prev");
                            r.canAdvance(l) && (Number(new Date) - a < 550 && Math.abs(s) > 50 || Math.abs(s) > o / 2) ? r.flexAnimate(l, r.vars.pauseOnAction) : p || r.flexAnimate(r.currentSlide, r.vars.pauseOnAction, !0)
                        }
                        e = null;
                        n = null;
                        u = null;
                        i = null;
                        m = 0
                    }
                }
            },
            resize: function() {
                if (!r.animating && r.is(":visible")) {
                    h || r.doMath();
                    if (p) v.smoothHeight();
                    else if (h) {
                        r.slides.width(r.computedW);
                        r.update(r.pagingCount);
                        r.setProps()
                    } else if (l) {
                        r.viewport.height(r.h);
                        r.setProps(r.h, "setTotal")
                    } else {
                        r.vars.smoothHeight && v.smoothHeight();
                        r.newSlides.width(r.computedW);
                        r.setProps(r.computedW, "setTotal")
                    }
                }
            },
            smoothHeight: function(e) {
                if (!l || p) {
                    var t = p ? r : r.viewport;
                    e ? t.animate({
                        height: r.slides.eq(r.animatingTo).height()
                    }, e) : t.height(r.slides.eq(r.animatingTo).height())
                }
            },
            sync: function(t) {
                var n = e(r.vars.sync).data("flexslider"),
                    i = r.animatingTo;
                switch (t) {
                case "animate":
                    n.flexAnimate(i, r.vars.pauseOnAction, !1, !0);
                    break;
                case "play":
                    !n.playing && !n.asNav && n.play();
                    break;
                case "pause":
                    n.pause()
                }
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++) e[t] + "Hidden" in document && (v.pauseInvisible.visProp = e[t] + "Hidden");
                    if (v.pauseInvisible.visProp) {
                        var n = v.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(n, function() {
                            v.pauseInvisible.isHidden() ? r.startTimeout ? clearTimeout(r.startTimeout) : r.pause() : r.started ? r.play() : r.vars.initDelay > 0 ? setTimeout(r.play, r.vars.initDelay) : r.play()
                        })
                    }
                },
                isHidden: function() {
                    return document[v.pauseInvisible.visProp] || !1
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(f);
                f = setTimeout(function() {
                    a = ""
                }, 3e3)
            }
        };
        r.flexAnimate = function(t, n, s, u, a) {
            !r.vars.animationLoop && t !== r.currentSlide && (r.direction = t > r.currentSlide ? "next" : "prev");
            d && r.pagingCount === 1 && (r.direction = r.currentItem < t ? "next" : "prev");
            if (!r.animating && (r.canAdvance(t, a) || s) && r.is(":visible")) {
                if (d && u) {
                    var f = e(r.vars.asNavFor).data("flexslider");
                    r.atEnd = t === 0 || t === r.count - 1;
                    f.flexAnimate(t, !0, !1, !0, a);
                    r.direction = r.currentItem < t ? "next" : "prev";
                    f.direction = r.direction;
                    if (Math.ceil((t + 1) / r.visible) - 1 === r.currentSlide || t === 0) {
                        r.currentItem = t;
                        r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide");
                        return !1
                    }
                    r.currentItem = t;
                    r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide");
                    t = Math.floor(t / r.visible)
                }
                r.animating = !0;
                r.animatingTo = t;
                n && r.pause();
                r.vars.before(r);
                r.syncExists && !a && v.sync("animate");
                r.vars.controlNav && v.controlNav.active();
                h || r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide");
                r.atEnd = t === 0 || t === r.last;
                r.vars.directionNav && v.directionNav.update();
                if (t === r.last) {
                    r.vars.end(r);
                    r.vars.animationLoop || r.pause()
                }
                if (!p) {
                    var m = l ? r.slides.filter(":first").height() : r.computedW,
                        g, y, b;
                    if (h) {
                        g = r.vars.itemMargin;
                        b = (r.itemW + g) * r.move * r.animatingTo;
                        y = b > r.limit && r.visible !== 1 ? r.limit : b
                    } else r.currentSlide === 0 && t === r.count - 1 && r.vars.animationLoop && r.direction !== "next" ? y = c ? (r.count + r.cloneOffset) * m : 0 : r.currentSlide === r.last && t === 0 && r.vars.animationLoop && r.direction !== "prev" ? y = c ? 0 : (r.count + 1) * m : y = c ? (r.count - 1 - t + r.cloneOffset) * m : (t + r.cloneOffset) * m;
                    r.setProps(y, "", r.vars.animationSpeed);
                    if (r.transitions) {
                        if (!r.vars.animationLoop || !r.atEnd) {
                            r.animating = !1;
                            r.currentSlide = r.animatingTo
                        }
                        r.container.unbind("webkitTransitionEnd transitionend");
                        r.container.bind("webkitTransitionEnd transitionend", function() {
                            r.wrapup(m)
                        })
                    } else r.container.animate(r.args, r.vars.animationSpeed, r.vars.easing, function() {
                        r.wrapup(m)
                    })
                } else if (!o) {
                    r.slides.eq(r.currentSlide).css({
                        zIndex: 1
                    }).animate({
                        opacity: 0
                    }, r.vars.animationSpeed, r.vars.easing);
                    r.slides.eq(t).css({
                        zIndex: 2
                    }).animate({
                        opacity: 1
                    }, r.vars.animationSpeed, r.vars.easing, r.wrapup)
                } else {
                    r.slides.eq(r.currentSlide).css({
                        opacity: 0,
                        zIndex: 1
                    });
                    r.slides.eq(t).css({
                        opacity: 1,
                        zIndex: 2
                    });
                    r.wrapup(m)
                }
                r.vars.smoothHeight && v.smoothHeight(r.vars.animationSpeed)
            }
        };
        r.wrapup = function(e) {
            !p && !h && (r.currentSlide === 0 && r.animatingTo === r.last && r.vars.animationLoop ? r.setProps(e, "jumpEnd") : r.currentSlide === r.last && r.animatingTo === 0 && r.vars.animationLoop && r.setProps(e, "jumpStart"));
            r.animating = !1;
            r.currentSlide = r.animatingTo;
            r.vars.after(r)
        };
        r.animateSlides = function() {
            !r.animating && m && r.flexAnimate(r.getTarget("next"))
        };
        r.pause = function() {
            clearInterval(r.animatedSlides);
            r.animatedSlides = null;
            r.playing = !1;
            r.vars.pausePlay && v.pausePlay.update("play");
            r.syncExists && v.sync("pause")
        };
        r.play = function() {
            r.playing && clearInterval(r.animatedSlides);
            r.animatedSlides = r.animatedSlides || setInterval(r.animateSlides, r.vars.slideshowSpeed);
            r.started = r.playing = !0;
            r.vars.pausePlay && v.pausePlay.update("pause");
            r.syncExists && v.sync("play")
        };
        r.stop = function() {
            r.pause();
            r.stopped = !0
        };
        r.canAdvance = function(e, t) {
            var n = d ? r.pagingCount - 1 : r.last;
            return t ? !0 : d && r.currentItem === r.count - 1 && e === 0 && r.direction === "prev" ? !0 : d && r.currentItem === 0 && e === r.pagingCount - 1 && r.direction !== "next" ? !1 : e === r.currentSlide && !d ? !1 : r.vars.animationLoop ? !0 : r.atEnd && r.currentSlide === 0 && e === n && r.direction !== "next" ? !1 : r.atEnd && r.currentSlide === n && e === 0 && r.direction === "next" ? !1 : !0
        };
        r.getTarget = function(e) {
            r.direction = e;
            return e === "next" ? r.currentSlide === r.last ? 0 : r.currentSlide + 1 : r.currentSlide === 0 ? r.last : r.currentSlide - 1
        };
        r.setProps = function(e, t, n) {
            var i = function() {
                var n = e ? e : (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo,
                    i = function() {
                        if (h) return t === "setTouch" ? e : c && r.animatingTo === r.last ? 0 : c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : r.animatingTo === r.last ? r.limit : n;
                        switch (t) {
                        case "setTotal":
                            return c ? (r.count - 1 - r.currentSlide + r.cloneOffset) * e : (r.currentSlide + r.cloneOffset) * e;
                        case "setTouch":
                            return c ? e : e;
                        case "jumpEnd":
                            return c ? e : r.count * e;
                        case "jumpStart":
                            return c ? r.count * e : e;
                        default:
                            return e
                        }
                    }();
                return i * -1 + "px"
            }();
            if (r.transitions) {
                i = l ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)";
                n = n !== undefined ? n / 1e3 + "s" : "0s";
                r.container.css("-" + r.pfx + "-transition-duration", n)
            }
            r.args[r.prop] = i;
            (r.transitions || n === undefined) && r.container.css(r.args)
        };
        r.setup = function(t) {
            if (!p) {
                var n, s;
                if (t === "init") {
                    r.viewport = e('<div class="' + i + 'viewport"></div>').css({
                        overflow: "hidden",
                        position: "relative"
                    }).appendTo(r).append(r.container);
                    r.cloneCount = 0;
                    r.cloneOffset = 0;
                    if (c) {
                        s = e.makeArray(r.slides).reverse();
                        r.slides = e(s);
                        r.container.empty().append(r.slides)
                    }
                }
                if (r.vars.animationLoop && !h) {
                    r.cloneCount = 2;
                    r.cloneOffset = 1;
                    t !== "init" && r.container.find(".clone").remove();
                    r.container.append(r.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).prepend(r.slides.last().clone().addClass("clone").attr("aria-hidden", "true"))
                }
                r.newSlides = e(r.vars.selector, r);
                n = c ? r.count - 1 - r.currentSlide + r.cloneOffset : r.currentSlide + r.cloneOffset;
                if (l && !h) {
                    r.container.height((r.count + r.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
                    setTimeout(function() {
                        r.newSlides.css({
                            display: "block"
                        });
                        r.doMath();
                        r.viewport.height(r.h);
                        r.setProps(n * r.h, "init")
                    }, t === "init" ? 100 : 0)
                } else {
                    r.container.width((r.count + r.cloneCount) * 200 + "%");
                    r.setProps(n * r.computedW, "init");
                    setTimeout(function() {
                        r.doMath();
                        r.newSlides.css({
                            width: r.computedW,
                            "float": "left",
                            display: "block"
                        });
                        r.vars.smoothHeight && v.smoothHeight()
                    }, t === "init" ? 100 : 0)
                }
            } else {
                r.slides.css({
                    width: "100%",
                    "float": "left",
                    marginRight: "-100%",
                    position: "relative"
                });
                t === "init" && (o ? r.slides.css({
                    opacity: 0,
                    display: "block",
                    webkitTransition: "opacity " + r.vars.animationSpeed / 1e3 + "s ease",
                    zIndex: 1
                }).eq(r.currentSlide).css({
                    opacity: 1,
                    zIndex: 2
                }) : r.slides.css({
                    opacity: 0,
                    display: "block",
                    zIndex: 1
                }).eq(r.currentSlide).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, r.vars.animationSpeed, r.vars.easing));
                r.vars.smoothHeight && v.smoothHeight()
            }
            h || r.slides.removeClass(i + "active-slide").eq(r.currentSlide).addClass(i + "active-slide")
        };
        r.doMath = function() {
            var e = r.slides.first(),
                t = r.vars.itemMargin,
                n = r.vars.minItems,
                i = r.vars.maxItems;
            r.w = r.viewport === undefined ? r.width() : r.viewport.width();
            r.h = e.height();
            r.boxPadding = e.outerWidth() - e.width();
            if (h) {
                r.itemT = r.vars.itemWidth + t;
                r.minW = n ? n * r.itemT : r.w;
                r.maxW = i ? i * r.itemT - t : r.w;
                r.itemW = r.minW > r.w ? (r.w - t * (n - 1)) / n : r.maxW < r.w ? (r.w - t * (i - 1)) / i : r.vars.itemWidth > r.w ? r.w : r.vars.itemWidth;
                r.visible = Math.floor(r.w / r.itemW);
                r.move = r.vars.move > 0 && r.vars.move < r.visible ? r.vars.move : r.visible;
                r.pagingCount = Math.ceil((r.count - r.visible) / r.move + 1);
                r.last = r.pagingCount - 1;
                r.limit = r.pagingCount === 1 ? 0 : r.vars.itemWidth > r.w ? r.itemW * (r.count - 1) + t * (r.count - 1) : (r.itemW + t) * r.count - r.w - t
            } else {
                r.itemW = r.w;
                r.pagingCount = r.count;
                r.last = r.count - 1
            }
            r.computedW = r.itemW - r.boxPadding
        };
        r.update = function(e, t) {
            r.doMath();
            if (!h) {
                e < r.currentSlide ? r.currentSlide += 1 : e <= r.currentSlide && e !== 0 && (r.currentSlide -= 1);
                r.animatingTo = r.currentSlide
            }
            if (r.vars.controlNav && !r.manualControls) if (t === "add" && !h || r.pagingCount > r.controlNav.length) v.controlNav.update("add");
            else if (t === "remove" && !h || r.pagingCount < r.controlNav.length) {
                if (h && r.currentSlide > r.last) {
                    r.currentSlide -= 1;
                    r.animatingTo -= 1
                }
                v.controlNav.update("remove", r.last)
            }
            r.vars.directionNav && v.directionNav.update()
        };
        r.addSlide = function(t, n) {
            var i = e(t);
            r.count += 1;
            r.last = r.count - 1;
            l && c ? n !== undefined ? r.slides.eq(r.count - n).after(i) : r.container.prepend(i) : n !== undefined ? r.slides.eq(n).before(i) : r.container.append(i);
            r.update(n, "add");
            r.slides = e(r.vars.selector + ":not(.clone)", r);
            r.setup();
            r.vars.added(r)
        };
        r.removeSlide = function(t) {
            var n = isNaN(t) ? r.slides.index(e(t)) : t;
            r.count -= 1;
            r.last = r.count - 1;
            isNaN(t) ? e(t, r.slides).remove() : l && c ? r.slides.eq(r.last).remove() : r.slides.eq(t).remove();
            r.doMath();
            r.update(n, "remove");
            r.slides = e(r.vars.selector + ":not(.clone)", r);
            r.setup();
            r.vars.removed(r)
        };
        v.init()
    };
    e(window).blur(function(e) {
        focused = !1
    }).focus(function(e) {
        focused = !0
    });
    e.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {}
    };
    e.fn.flexslider = function(t) {
        t === undefined && (t = {});
        if (typeof t == "object") return this.each(function() {
            var n = e(this),
                r = t.selector ? t.selector : ".slides > li",
                i = n.find(r);
            if (i.length === 1 && t.allowOneSlide === !0 || i.length === 0) {
                i.fadeIn(400);
                t.start && t.start(n)
            } else n.data("flexslider") === undefined && new e.flexslider(this, t)
        });
        var n = e(this).data("flexslider");
        switch (t) {
        case "play":
            n.play();
            break;
        case "pause":
            n.pause();
            break;
        case "stop":
            n.stop();
            break;
        case "next":
            n.flexAnimate(n.getTarget("next"), !0);
            break;
        case "prev":
        case "previous":
            n.flexAnimate(n.getTarget("prev"), !0);
            break;
        default:
            typeof t == "number" && n.flexAnimate(t, !0)
        }
    }
})(jQuery);
var elderscroll;
(function() {
    var e = [].indexOf ||
    function(e) {
        for (var t = 0, n = this.length; t < n; t++)
        if (t in this && this[t] === e) return t;
        return -1
    },
        t = [].slice;
    (function(e, t) {
        return typeof define == "function" && define.amd ? define("waypoints", ["jquery"], function(n) {
            return t(n, e)
        }) : t(e.jQuery, e)
    })(this, function(n, r) {
        var i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b;
        i = n(r);
        c = e.call(r, "ontouchstart") >= 0;
        u = {
            horizontal: {},
            vertical: {}
        };
        a = 1;
        l = {};
        f = "waypoints-context-id";
        d = "resize.waypoints";
        v = "scroll.waypoints";
        m = 1;
        g = "waypoints-waypoint-ids";
        y = "waypoint";
        b = "waypoints";
        s = function() {
            function e(e) {
                var t = this;
                this.$element = e;
                this.element = e[0];
                this.didResize = !1;
                this.didScroll = !1;
                this.id = "context" + a++;
                this.oldScroll = {
                    x: e.scrollLeft(),
                    y: e.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                e.data(f, this.id);
                l[this.id] = this;
                e.bind(v, function() {
                    var e;
                    if (!t.didScroll && !c) {
                        t.didScroll = !0;
                        e = function() {
                            t.doScroll();
                            return t.didScroll = !1
                        };
                        return r.setTimeout(e, n[b].settings.scrollThrottle)
                    }
                });
                e.bind(d, function() {
                    var e;
                    if (!t.didResize) {
                        t.didResize = !0;
                        e = function() {
                            n[b]("refresh");
                            return t.didResize = !1
                        };
                        return r.setTimeout(e, n[b].settings.resizeThrottle)
                    }
                })
            }
            e.prototype.doScroll = function() {
                var e, t = this;
                e = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                c && (!e.vertical.oldScroll || !e.vertical.newScroll) && n[b]("refresh");
                n.each(e, function(e, r) {
                    var i, s, o;
                    o = [];
                    s = r.newScroll > r.oldScroll;
                    i = s ? r.forward : r.backward;
                    n.each(t.waypoints[e], function(e, t) {
                        var n, i;
                        if (r.oldScroll < (n = t.offset) && n <= r.newScroll) return o.push(t);
                        if (r.newScroll < (i = t.offset) && i <= r.oldScroll) return o.push(t)
                    });
                    o.sort(function(e, t) {
                        return e.offset - t.offset
                    });
                    s || o.reverse();
                    return n.each(o, function(e, t) {
                        if (t.options.continuous || e === o.length - 1) return t.trigger([i])
                    })
                });
                return this.oldScroll = {
                    x: e.horizontal.newScroll,
                    y: e.vertical.newScroll
                }
            };
            e.prototype.refresh = function() {
                var e, t, r, i = this;
                r = n.isWindow(this.element);
                t = this.$element.offset();
                this.doScroll();
                e = {
                    horizontal: {
                        contextOffset: r ? 0 : t.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : t.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[b]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return n.each(e, function(e, t) {
                    return n.each(i.waypoints[e], function(e, r) {
                        var i, s, o, u, a;
                        i = r.options.offset;
                        o = r.offset;
                        s = n.isWindow(r.element) ? 0 : r.$element.offset()[t.offsetProp];
                        if (n.isFunction(i)) i = i.apply(r.element);
                        else if (typeof i == "string") {
                            i = parseFloat(i);
                            r.options.offset.indexOf("%") > -1 && (i = Math.ceil(t.contextDimension * i / 100))
                        }
                        r.offset = s - t.contextOffset + t.contextScroll - i;
                        if (r.options.onlyOnScroll && o != null || !r.enabled) return;
                        if (o !== null && o < (u = t.oldScroll) && u <= r.offset) return r.trigger([t.backward]);
                        if (o !== null && o > (a = t.oldScroll) && a >= r.offset) return r.trigger([t.forward]);
                        if (o === null && t.oldScroll >= r.offset) return r.trigger([t.forward])
                    })
                })
            };
            e.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([d, v].join(" "));
                    return delete l[this.id]
                }
            };
            return e
        }();
        o = function() {
            function e(e, t, r) {
                var i, s;
                r = n.extend({}, n.fn[y].defaults, r);
                r.offset === "bottom-in-view" && (r.offset = function() {
                    var e;
                    e = n[b]("viewportHeight");
                    n.isWindow(t.element) || (e = t.$element.height());
                    return e - n(this).outerHeight()
                });
                this.$element = e;
                this.element = e[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = t;
                this.enabled = r.enabled;
                this.id = "waypoints" + m++;
                this.offset = null;
                this.options = r;
                t.waypoints[this.axis][this.id] = this;
                u[this.axis][this.id] = this;
                i = (s = e.data(g)) != null ? s : [];
                i.push(this.id);
                e.data(g, i)
            }
            e.prototype.trigger = function(e) {
                if (!this.enabled) return;
                this.callback != null && this.callback.apply(this.element, e);
                if (this.options.triggerOnce) return this.destroy()
            };
            e.prototype.disable = function() {
                return this.enabled = !1
            };
            e.prototype.enable = function() {
                this.context.refresh();
                return this.enabled = !0
            };
            e.prototype.destroy = function() {
                delete u[this.axis][this.
                id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty()
            };
            e.getWaypointsByElement = function(e) {
                var t, r;
                r = n(e).data(g);
                if (!r) return [];
                t = n.extend({}, u.horizontal, u.vertical);
                return n.map(r, function(e) {
                    return t[e]
                })
            };
            return e
        }();
        p = {
            init: function(e, t) {
                var r;
                t == null && (t = {});
                (r = t.handler) == null && (t.handler = e);
                this.each(function() {
                    var e, r, i, u;
                    e = n(this);
                    i = (u = t.context) != null ? u : n.fn[y].defaults.context;
                    n.isWindow(i) || (i = e.closest(i));
                    i = n(i);
                    r = l[i.data(f)];
                    r || (r = new s(i));
                    return new o(e, r, t)
                });
                n[b]("refresh");
                return this
            },
            disable: function() {
                return p._invoke(this, "disable")
            },
            enable: function() {
                return p._invoke(this, "enable")
            },
            destroy: function() {
                return p._invoke(this, "destroy")
            },
            prev: function(e, t) {
                return p._traverse.call(this, e, t, function(e, t, n) {
                    if (t > 0) return e.push(n[t - 1])
                })
            },
            next: function(e, t) {
                return p._traverse.call(this, e, t, function(e, t, n) {
                    if (t < n.length - 1) return e.push(n[t + 1])
                })
            },
            _traverse: function(e, t, i) {
                var s, o;
                e == null && (e = "vertical");
                t == null && (t = r);
                o = h.aggregate(t);
                s = [];
                this.each(function() {
                    var t;
                    t = n.inArray(this, o[e]);
                    return i(s, t, o[e])
                });
                return this.pushStack(s)
            },
            _invoke: function(e, t) {
                e.each(function() {
                    var e;
                    e = o.getWaypointsByElement(this);
                    return n.each(e, function(e, n) {
                        n[t]();
                        return !0
                    })
                });
                return this
            }
        };
        n.fn[y] = function() {
            var e, r;
            r = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [];
            return p[r] ? p[r].apply(this, e) : n.isFunction(r) ? p.init.apply(this, arguments) : n.isPlainObject(r) ? p.init.apply(this, [null, r]) : r ? n.error("The " + r + " method does not exist in jQuery Waypoints.") : n.error("jQuery Waypoints needs a callback function or handler option.")
        };
        n.fn[y].defaults = {
            context: r,
            continuous: !0,
            enabled: !0,
            horizontal: !1,
            offset: 0,
            triggerOnce: !1
        };
        h = {
            refresh: function() {
                return n.each(l, function(e, t) {
                    return t.refresh()
                })
            },
            viewportHeight: function() {
                var e;
                return (e = r.innerHeight) != null ? e : i.height()
            },
            aggregate: function(e) {
                var t, r, i;
                t = u;
                e && (t = (i = l[n(e).data(f)]) != null ? i.waypoints : void 0);
                if (!t) return [];
                r = {
                    horizontal: [],
                    vertical: []
                };
                n.each(r, function(e, i) {
                    n.each(t[e], function(e, t) {
                        return i.push(t)
                    });
                    i.sort(function(e, t) {
                        return e.offset - t.offset
                    });
                    r[e] = n.map(i, function(e) {
                        return e.element
                    });
                    return r[e] = n.unique(r[e])
                });
                return r
            },
            above: function(e) {
                e == null && (e = r);
                return h._filter(e, "vertical", function(e, t) {
                    return t.offset <= e.oldScroll.y
                })
            },
            below: function(e) {
                e == null && (e = r);
                return h._filter(e, "vertical", function(e, t) {
                    return t.offset > e.oldScroll.y
                })
            },
            left: function(e) {
                e == null && (e = r);
                return h._filter(e, "horizontal", function(e, t) {
                    return t.offset <= e.oldScroll.x
                })
            },
            right: function(e) {
                e == null && (e = r);
                return h._filter(e, "horizontal", function(e, t) {
                    return t.offset > e.oldScroll.x
                })
            },
            enable: function() {
                return h._invoke("enable")
            },
            disable: function() {
                return h._invoke("disable")
            },
            destroy: function() {
                return h._invoke("destroy")
            },
            extendFn: function(e, t) {
                return p[e] = t
            },
            _invoke: function(e) {
                var t;
                t = n.extend({}, u.vertical, u.horizontal);
                return n.each(t, function(t, n) {
                    n[e]();
                    return !0
                })
            },
            _filter: function(e, t, r) {
                var i, s;
                i = l[n(e).data(f)];
                if (!i) return [];
                s = [];
                n.each(i.waypoints[t], function(e, t) {
                    if (r(i, t)) return s.push(t)
                });
                s.sort(function(e, t) {
                    return e.offset - t.offset
                });
                return n.map(s, function(e) {
                    return e.element
                })
            }
        };
        n[b] = function() {
            var e, n;
            n = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [];
            return h[n] ? h[n].apply(null, e) : h.aggregate.call(null, n)
        };
        n[b].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return i.load(function() {
            return n[b]("refresh")
        })
    })
}).call(this);
window.console || (console = {
    log: function() {}
});
//console.log("testing");
jQuery.fn.exists = function() {
    return this.length > 0
};
var menuok;
window.getComputedStyle || (window.getComputedStyle = function(e, t) {
    this.el = e;
    this.getPropertyValue = function(t) {
        var n = /(\-([a-z]){1})/g;
        t == "float" && (t = "styleFloat");
        n.test(t) && (t = t.replace(n, function() {
            return arguments[2].toUpperCase()
        }));
        return e.currentStyle[t] ? e.currentStyle[t] : null
    };
    return this
});
sticky_megamenu(".sticky-nav", 200);
megamenu_standard(".grzly");
megamenu_standard(".f-grzly");
Carousel = function(e) {
    this.data = e
};
Carousel.prototype = {
    current: 0,
    data: [],
    move: function(e) {
        var t = this.data.length;
        return this.data[Math.abs(this.current = (this.current + (e ? 1 : t - 1)) % t)]
    },
    getNext: function() {
        return this.move(1)
    },
    getPrevious: function() {
        return this.move(0)
    },
    getCurrent: function() {
        return this.data[this.current]
    }
};
jQuery.fn.exists = function() {
    return this.length > 0
};
window.addEventListener("resize", function() {
    responsive_handler()
}, !1);
jQuery(document).ready(function(e) {
    //console.log("Called");
    e(".sticky-nav").hide();
    responsive_handler();
    jQuery(".flexslider").exists() && jQuery(".flexslider").flexslider({
        animation: "slide",
        randomize: !1,
        pauseOnAction: !0,
        slideshow: !0,
        slideshowSpeed: 9e3,
        controlNav: !1,
        start: function(t) {
            window.innerWidth > 768 && e(".fadeins").fadeIn("slow")
        },
        before: function(t) {
            e(".fadeins").hide();
            window.innerWidth > 768 && e(".fadeins").delay(1e3).fadeIn("slow")
        },
        after: function() {}
    });
    jQuery("#testimoni").exists() && jQuery("#testimoni").flexslider({
        animation: "slide",
        controlNav: !0,
        directionNav: !1,
        slideshowSpeed: 8e3
    });
    jQuery("#company-slider").exists() && jQuery("#company-slider").elastislide({
        minItems: 1
    });
    if (jQuery(".elderscroll").exists()) {
        elderscroll = new Elderscroll;
        elderscroll.init();
        e(window).resize(function() {
            elderscroll = new Elderscroll;
            elderscroll.init()
        });
        jQuery(".elderscroll-inner").touchwipe({
            wipeLeft: function() {
                elderscroll.previous()
            },
            wipeRight: function() {
                elderscroll.next()
            },
            min_move_x: 20,
            preventDefaultEvents: !0
        })
    }
    jQuery("#mp-menu").exists() && (menuok = new mlPushMenu(document.getElementById("mp-menu"), document.getElementById("pull"), {
        type: "cover"
    }));
    e("#container").fitVids();
    e("ul.tabs").each(function() {
        var t, n, r = e(this).find("a");
        t = e(r.filter('[href="' + location.hash + '"]')[0] || r[0]);
        t.addClass("active");
        n = e(t.attr("href"));
        r.not(t).each(function() {
            e(e(this).attr("href")).hide()
        });
        e(this).on("click", "a", function(r) {
            t.removeClass("active");
            n.hide();
            t = e(this);
            n = e(e(this).attr("href"));
            t.addClass("active");
            n.show();
            r.preventDefault()
        })
    });
    e("#digi").tablesorter()
});
(function(e) {
    function c() {
        n.setAttribute("content", s);
        o = !0
    }

    function h() {
        n.setAttribute("content", i);
        o = !1
    }

    function p(t) {
        l = t.accelerationIncludingGravity;
        u = Math.abs(l.x);
        a = Math.abs(l.y);
        f = Math.abs(l.z);
        !e.orientation && (u > 7 || (f > 6 && a < 8 || f < 8 && a > 6) && u > 5) ? o && h() : o || c()
    }
    if (!(/iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1)) return;
    var t = e.document;
    if (!t.querySelector) return;
    var n = t.querySelector("meta[name=viewport]"),
        r = n && n.getAttribute("content"),
        i = r + ",maximum-scale=1",
        s = r + ",maximum-scale=10",
        o = !0,
        u, a, f, l;
    if (!n) return;
    e.addEventListener("orientationchange", c, !1);
    e.addEventListener("devicemotion", p, !1)
})(this);
Modernizr.testStyles("#modernizr { display: table; height: 50px; width: 50px; margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0; }", function(e, t) {
    Modernizr.addTest("absolutecentercontent", Math.round(window.innerHeight / 2 - 25) === e.offsetTop)
});
