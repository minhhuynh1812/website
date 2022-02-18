/*

@license
dhtmlxScheduler v.5.3.13 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) XB Software Ltd.

*/
! function() {
    function dtmlXMLLoaderObject(t, e, i, n) {
        return this.xmlDoc = "", this.async = void 0 === i || i, this.onloadAction = t || null, this.mainObject = e || null, this.waitCall = null, this.rSeed = n || !1, this
    }

    function dhtmlDragAndDropObject() {
        return window.dhtmlDragAndDrop ? window.dhtmlDragAndDrop : (this.lastLanding = 0, this.dragNode = 0, this.dragStartNode = 0, this.dragStartObject = 0, this.tempDOMU = null, this.tempDOMM = null, this.waitDrag = 0, window.dhtmlDragAndDrop = this, this)
    }

    function _dhtmlxError(t, e, i) {
        return this.catches || (this.catches = []), this
    }

    function dhtmlXHeir(t, e) {
        for (var i in e) "function" == typeof e[i] && (t[i] = e[i]);
        return t
    }
    window.dhtmlx || (window.dhtmlx = function(t) {
            for (var e in t) dhtmlx[e] = t[e];
            return dhtmlx
        }), dhtmlx.extend_api = function(t, e, i) {
            var n = window[t];
            n && (window[t] = function(t) {
                var i;
                if (t && "object" == typeof t && !t.tagName) {
                    i = n.apply(this, e._init ? e._init(t) : arguments);
                    for (var a in dhtmlx) e[a] && this[e[a]](dhtmlx[a]);
                    for (var a in t) e[a] ? this[e[a]](t[a]) : 0 === a.indexOf("on") && this.attachEvent(a, t[a])
                } else i = n.apply(this, arguments);
                return e._patch && e._patch(this), i || this
            }, window[t].prototype = n.prototype, i && dhtmlXHeir(window[t].prototype, i))
        }, window.dhtmlxAjax = {
            get: function(t, e) {
                var i = new dtmlXMLLoaderObject(!0);
                return i.async = arguments.length < 3, i.waitCall = e, i.loadXML(t), i
            },
            post: function(t, e, i) {
                var n = new dtmlXMLLoaderObject(!0);
                return n.async = arguments.length < 4, n.waitCall = i, n.loadXML(t, !0, e), n
            },
            getSync: function(t) {
                return this.get(t, null, !0)
            },
            postSync: function(t, e) {
                return this.post(t, e, null, !0)
            }
        }, window.dtmlXMLLoaderObject = dtmlXMLLoaderObject, dtmlXMLLoaderObject.count = 0, dtmlXMLLoaderObject.prototype.waitLoadFunction = function(t) {
            var e = !0;
            return this.check = function() {
                if (t && t.onloadAction && (!t.xmlDoc.readyState || 4 == t.xmlDoc.readyState)) {
                    if (!e) return;
                    e = !1, dtmlXMLLoaderObject.count++, "function" == typeof t.onloadAction && t.onloadAction(t.mainObject, null, null, null, t),
                        t.waitCall && (t.waitCall.call(this, t), t.waitCall = null)
                }
            }, this.check
        }, dtmlXMLLoaderObject.prototype.getXMLTopNode = function(t, e) {
            var i;
            if (this.xmlDoc.responseXML) {
                var n = this.xmlDoc.responseXML.getElementsByTagName(t);
                if (0 === n.length && -1 != t.indexOf(":")) var n = this.xmlDoc.responseXML.getElementsByTagName(t.split(":")[1]);
                i = n[0]
            } else i = this.xmlDoc.documentElement;
            if (i) return this._retry = !1, i;
            if (!this._retry && _isIE) {
                this._retry = !0;
                var e = this.xmlDoc;
                return this.loadXMLString(this.xmlDoc.responseText.replace(/^[\s]+/, ""), !0), this.getXMLTopNode(t, e)
            }
            return dhtmlxError.throwError("LoadXML", "Incorrect XML", [e || this.xmlDoc, this.mainObject]), document.createElement("div")
        }, dtmlXMLLoaderObject.prototype.loadXMLString = function(t, e) {
            if (_isIE) this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM"), this.xmlDoc.async = this.async, this.xmlDoc.onreadystatechange = function() {}, this.xmlDoc.loadXML(t);
            else {
                var i = new DOMParser;
                this.xmlDoc = i.parseFromString(t, "text/xml")
            }
            e || (this.onloadAction && this.onloadAction(this.mainObject, null, null, null, this), this.waitCall && (this.waitCall(), this.waitCall = null))
        }, dtmlXMLLoaderObject.prototype.loadXML = function(t, e, i, n) {
            this.rSeed && (t += (-1 != t.indexOf("?") ? "&" : "?") + "a_dhx_rSeed=" + (new Date).valueOf()), this.filePath = t, !_isIE && window.XMLHttpRequest ? this.xmlDoc = new XMLHttpRequest : this.xmlDoc = new ActiveXObject("Microsoft.XMLHTTP"),
                this.async && (this.xmlDoc.onreadystatechange = new this.waitLoadFunction(this)), "string" == typeof e ? this.xmlDoc.open(e, t, this.async) : this.xmlDoc.open(e ? "POST" : "GET", t, this.async), n ? (this.xmlDoc.setRequestHeader("User-Agent", "dhtmlxRPC v0.1 (" + navigator.userAgent + ")"), this.xmlDoc.setRequestHeader("Content-type", "text/xml")) : e && this.xmlDoc.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), this.xmlDoc.setRequestHeader("X-Requested-With", "XMLHttpRequest"), this.xmlDoc.send(i),
                this.async || new this.waitLoadFunction(this)()
        }, dtmlXMLLoaderObject.prototype.destructor = function() {
            return this._filterXPath = null, this._getAllNamedChilds = null, this._retry = null, this.async = null, this.rSeed = null, this.filePath = null, this.onloadAction = null, this.mainObject = null, this.xmlDoc = null, this.doXPath = null, this.doXPathOpera = null, this.doXSLTransToObject = null, this.doXSLTransToString = null, this.loadXML = null, this.loadXMLString = null, this.doSerialization = null, this.xmlNodeToJSON = null,
                this.getXMLTopNode = null, this.setXSLParamValue = null, null
        }, dtmlXMLLoaderObject.prototype.xmlNodeToJSON = function(t) {
            for (var e = {}, i = 0; i < t.attributes.length; i++) e[t.attributes[i].name] = t.attributes[i].value;
            e._tagvalue = t.firstChild ? t.firstChild.nodeValue : "";
            for (var i = 0; i < t.childNodes.length; i++) {
                var n = t.childNodes[i].tagName;
                n && (e[n] || (e[n] = []), e[n].push(this.xmlNodeToJSON(t.childNodes[i])))
            }
            return e
        }, window.dhtmlDragAndDropObject = dhtmlDragAndDropObject,
        dhtmlDragAndDropObject.prototype.removeDraggableItem = function(t) {
            t.onmousedown = null, t.dragStarter = null, t.dragLanding = null
        }, dhtmlDragAndDropObject.prototype.addDraggableItem = function(t, e) {
            t.onmousedown = this.preCreateDragCopy, t.dragStarter = e, this.addDragLanding(t, e)
        }, dhtmlDragAndDropObject.prototype.addDragLanding = function(t, e) {
            t.dragLanding = e
        }, dhtmlDragAndDropObject.prototype.preCreateDragCopy = function(t) {
            if (!t && !window.event || 2 != (t || event).button) return window.dhtmlDragAndDrop.waitDrag ? (window.dhtmlDragAndDrop.waitDrag = 0, document.body.onmouseup = window.dhtmlDragAndDrop.tempDOMU, document.body.onmousemove = window.dhtmlDragAndDrop.tempDOMM, !1) : (window.dhtmlDragAndDrop.dragNode && window.dhtmlDragAndDrop.stopDrag(t), window.dhtmlDragAndDrop.waitDrag = 1, window.dhtmlDragAndDrop.tempDOMU = document.body.onmouseup, window.dhtmlDragAndDrop.tempDOMM = document.body.onmousemove,
                window.dhtmlDragAndDrop.dragStartNode = this, window.dhtmlDragAndDrop.dragStartObject = this.dragStarter, document.body.onmouseup = window.dhtmlDragAndDrop.preCreateDragCopy, document.body.onmousemove = window.dhtmlDragAndDrop.callDrag, window.dhtmlDragAndDrop.downtime = (new Date).valueOf(), !(!t || !t.preventDefault) && (t.preventDefault(), !1))
        }, dhtmlDragAndDropObject.prototype.callDrag = function(t) {
            t || (t = window.event);
            var e = window.dhtmlDragAndDrop;
            if (!((new Date).valueOf() - e.downtime < 100)) {
                if (!e.dragNode) {
                    if (!e.waitDrag) return e.stopDrag(t, !0);
                    if (e.dragNode = e.dragStartObject._createDragNode(e.dragStartNode, t), !e.dragNode) return e.stopDrag();
                    e.dragNode.onselectstart = function() {
                        return !1
                    }, e.gldragNode = e.dragNode, document.body.appendChild(e.dragNode), document.body.onmouseup = e.stopDrag, e.waitDrag = 0, e.dragNode.pWindow = window, e.initFrameRoute()
                }
                if (e.dragNode.parentNode != window.document.body && e.gldragNode) {
                    var i = e.gldragNode;
                    e.gldragNode.old && (i = e.gldragNode.old), i.parentNode.removeChild(i);
                    var n = e.dragNode.pWindow;
                    if (i.pWindow && i.pWindow.dhtmlDragAndDrop.lastLanding && i.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(i.pWindow.dhtmlDragAndDrop.lastLanding), _isIE) {
                        var a = document.createElement("div");
                        a.innerHTML = e.dragNode.outerHTML, e.dragNode = a.childNodes[0]
                    } else e.dragNode = e.dragNode.cloneNode(!0);
                    e.dragNode.pWindow = window, e.gldragNode.old = e.dragNode, document.body.appendChild(e.dragNode), n.dhtmlDragAndDrop.dragNode = e.dragNode
                }
                e.dragNode.style.left = t.clientX + 15 + (e.fx ? -1 * e.fx : 0) + (document.body.scrollLeft || document.documentElement.scrollLeft) + "px", e.dragNode.style.top = t.clientY + 3 + (e.fy ? -1 * e.fy : 0) + (document.body.scrollTop || document.documentElement.scrollTop) + "px";
                var r;
                r = t.srcElement ? t.srcElement : t.target, e.checkLanding(r, t)
            }
        }, dhtmlDragAndDropObject.prototype.calculateFramePosition = function(t) {
            if (window.name) {
                for (var e = parent.frames[window.name].frameElement.offsetParent, i = 0, n = 0; e;) i += e.offsetLeft, n += e.offsetTop,
                    e = e.offsetParent;
                if (parent.dhtmlDragAndDrop) {
                    var a = parent.dhtmlDragAndDrop.calculateFramePosition(1);
                    i += 1 * a.split("_")[0], n += 1 * a.split("_")[1]
                }
                if (t) return i + "_" + n;
                this.fx = i, this.fy = n
            }
            return "0_0"
        }, dhtmlDragAndDropObject.prototype.checkLanding = function(t, e) {
            t && t.dragLanding ? (this.lastLanding && this.lastLanding.dragLanding._dragOut(this.lastLanding), this.lastLanding = t, this.lastLanding = this.lastLanding.dragLanding._dragIn(this.lastLanding, this.dragStartNode, e.clientX, e.clientY, e),
                this.lastLanding_scr = _isIE ? e.srcElement : e.target) : t && "BODY" != t.tagName ? this.checkLanding(t.parentNode, e) : (this.lastLanding && this.lastLanding.dragLanding._dragOut(this.lastLanding, e.clientX, e.clientY, e), this.lastLanding = 0, this._onNotFound && this._onNotFound())
        }, dhtmlDragAndDropObject.prototype.stopDrag = function(t, e) {
            var i = window.dhtmlDragAndDrop;
            if (!e) {
                i.stopFrameRoute();
                var n = i.lastLanding;
                i.lastLanding = null,
                    n && n.dragLanding._drag(i.dragStartNode, i.dragStartObject, n, _isIE ? event.srcElement : t.target)
            }
            i.lastLanding = null, i.dragNode && i.dragNode.parentNode == document.body && i.dragNode.parentNode.removeChild(i.dragNode), i.dragNode = 0, i.gldragNode = 0, i.fx = 0, i.fy = 0, i.dragStartNode = 0, i.dragStartObject = 0, document.body.onmouseup = i.tempDOMU, document.body.onmousemove = i.tempDOMM, i.tempDOMU = null, i.tempDOMM = null, i.waitDrag = 0
        }, dhtmlDragAndDropObject.prototype.stopFrameRoute = function(t) {
            t && window.dhtmlDragAndDrop.stopDrag(1, 1);
            for (var e = 0; e < window.frames.length; e++) try {
                window.frames[e] != t && window.frames[e].dhtmlDragAndDrop && window.frames[e].dhtmlDragAndDrop.stopFrameRoute(window)
            } catch (t) {}
            try {
                parent.dhtmlDragAndDrop && parent != window && parent != t && parent.dhtmlDragAndDrop.stopFrameRoute(window)
            } catch (t) {}
        }, dhtmlDragAndDropObject.prototype.initFrameRoute = function(t, e) {
            t && (window.dhtmlDragAndDrop.preCreateDragCopy(),
                window.dhtmlDragAndDrop.dragStartNode = t.dhtmlDragAndDrop.dragStartNode, window.dhtmlDragAndDrop.dragStartObject = t.dhtmlDragAndDrop.dragStartObject, window.dhtmlDragAndDrop.dragNode = t.dhtmlDragAndDrop.dragNode, window.dhtmlDragAndDrop.gldragNode = t.dhtmlDragAndDrop.dragNode, window.document.body.onmouseup = window.dhtmlDragAndDrop.stopDrag, window.waitDrag = 0, !_isIE && e && (!_isFF || _FFrv < 1.8) && window.dhtmlDragAndDrop.calculateFramePosition());
            try {
                parent.dhtmlDragAndDrop && parent != window && parent != t && parent.dhtmlDragAndDrop.initFrameRoute(window)
            } catch (t) {}
            for (var i = 0; i < window.frames.length; i++) try {
                window.frames[i] != t && window.frames[i].dhtmlDragAndDrop && window.frames[i].dhtmlDragAndDrop.initFrameRoute(window, !t || e ? 1 : 0)
            } catch (t) {}
        };
    var _isFF = !1,
        _isIE = !1,
        _isOpera = !1,
        _isKHTML = !1,
        _isMacOS = !1,
        _isChrome = !1,
        _FFrv = !1,
        _KHTMLrv = !1,
        _OperaRv = !1; - 1 != navigator.userAgent.indexOf("Macintosh") && (_isMacOS = !0),
        navigator.userAgent.toLowerCase().indexOf("chrome") > -1 && (_isChrome = !0), -1 != navigator.userAgent.indexOf("Safari") || -1 != navigator.userAgent.indexOf("Konqueror") ? (_KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Safari") + 7, 5)), _KHTMLrv > 525 ? (_isFF = !0, _FFrv = 1.9) : _isKHTML = !0) : -1 != navigator.userAgent.indexOf("Opera") ? (_isOpera = !0, _OperaRv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera") + 6, 3))) : -1 != navigator.appName.indexOf("Microsoft") ? (_isIE = !0,
            -1 == navigator.appVersion.indexOf("MSIE 8.0") && -1 == navigator.appVersion.indexOf("MSIE 9.0") && -1 == navigator.appVersion.indexOf("MSIE 10.0") || "BackCompat" == document.compatMode || (_isIE = 8)) : "Netscape" == navigator.appName && -1 != navigator.userAgent.indexOf("Trident") ? _isIE = 8 : (_isFF = !0, _FFrv = parseFloat(navigator.userAgent.split("rv:")[1])), dtmlXMLLoaderObject.prototype.doXPath = function(t, e, i, n) {
            if (_isKHTML || !_isIE && !window.XPathResult) return this.doXPathOpera(t, e);
            if (_isIE) return e || (e = this.xmlDoc.nodeName ? this.xmlDoc : this.xmlDoc.responseXML), e || dhtmlxError.throwError("LoadXML", "Incorrect XML", [e || this.xmlDoc, this.mainObject]), i && e.setProperty("SelectionNamespaces", "xmlns:xsl='" + i + "'"), "single" == n ? e.selectSingleNode(t) : e.selectNodes(t) || new Array(0);
            var a = e;
            e || (e = this.xmlDoc.nodeName ? this.xmlDoc : this.xmlDoc.responseXML), e || dhtmlxError.throwError("LoadXML", "Incorrect XML", [e || this.xmlDoc, this.mainObject]), -1 != e.nodeName.indexOf("document") ? a = e : (a = e,
                e = e.ownerDocument);
            var r = XPathResult.ANY_TYPE;
            "single" == n && (r = XPathResult.FIRST_ORDERED_NODE_TYPE);
            var s = [],
                o = e.evaluate(t, a, function(t) {
                    return i
                }, r, null);
            if (r == XPathResult.FIRST_ORDERED_NODE_TYPE) return o.singleNodeValue;
            for (var d = o.iterateNext(); d;) s[s.length] = d, d = o.iterateNext();
            return s
        }, _dhtmlxError.prototype.catchError = function(t, e) {
            this.catches[t] = e
        }, _dhtmlxError.prototype.throwError = function(t, e, i) {
            return this.catches[t] ? this.catches[t](t, e, i) : this.catches.ALL ? this.catches.ALL(t, e, i) : (window.alert("Error type: " + arguments[0] + "\nDescription: " + arguments[1]), null)
        }, window.dhtmlxError = new _dhtmlxError, dtmlXMLLoaderObject.prototype.doXPathOpera = function(t, e) {
            var i = t.replace(/[\/]+/gi, "/").split("/"),
                n = null,
                a = 1;
            if (!i.length) return [];
            if ("." == i[0]) n = [e];
            else {
                if ("" !== i[0]) return [];
                n = (this.xmlDoc.responseXML || this.xmlDoc).getElementsByTagName(i[a].replace(/\[[^\]]*\]/g, "")), a++
            }
            for (a; a < i.length; a++) n = this._getAllNamedChilds(n, i[a]);
            return -1 != i[a - 1].indexOf("[") && (n = this._filterXPath(n, i[a - 1])), n
        }, dtmlXMLLoaderObject.prototype._filterXPath = function(t, e) {
            for (var i = [], e = e.replace(/[^\[]*\[\@/g, "").replace(/[\[\]\@]*/g, ""), n = 0; n < t.length; n++) t[n].getAttribute(e) && (i[i.length] = t[n]);
            return i
        }, dtmlXMLLoaderObject.prototype._getAllNamedChilds = function(t, e) {
            var i = [];
            _isKHTML && (e = e.toUpperCase());
            for (var n = 0; n < t.length; n++)
                for (var a = 0; a < t[n].childNodes.length; a++) _isKHTML ? t[n].childNodes[a].tagName && t[n].childNodes[a].tagName.toUpperCase() == e && (i[i.length] = t[n].childNodes[a]) : t[n].childNodes[a].tagName == e && (i[i.length] = t[n].childNodes[a]);
            return i
        }, void 0 === window.dhtmlxEvent && (window.dhtmlxEvent = function(t, e, i) {
            t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent && t.attachEvent("on" + e, i)
        }), dtmlXMLLoaderObject.prototype.xslDoc = null,
        dtmlXMLLoaderObject.prototype.setXSLParamValue = function(t, e, i) {
            i || (i = this.xslDoc), i.responseXML && (i = i.responseXML);
            var n = this.doXPath("/xsl:stylesheet/xsl:variable[@name='" + t + "']", i, "http://www.w3.org/1999/XSL/Transform", "single");
            n && (n.firstChild.nodeValue = e)
        }, dtmlXMLLoaderObject.prototype.doXSLTransToObject = function(t, e) {
            t || (t = this.xslDoc), t.responseXML && (t = t.responseXML), e || (e = this.xmlDoc), e.responseXML && (e = e.responseXML);
            var i;
            if (_isIE) {
                i = new ActiveXObject("Msxml2.DOMDocument.3.0");
                try {
                    e.transformNodeToObject(t, i)
                } catch (n) {
                    i = e.transformNode(t)
                }
            } else this.XSLProcessor || (this.XSLProcessor = new XSLTProcessor, this.XSLProcessor.importStylesheet(t)), i = this.XSLProcessor.transformToDocument(e);
            return i
        }, dtmlXMLLoaderObject.prototype.doXSLTransToString = function(t, e) {
            var i = this.doXSLTransToObject(t, e);
            return "string" == typeof i ? i : this.doSerialization(i)
        }, dtmlXMLLoaderObject.prototype.doSerialization = function(t) {
            return t || (t = this.xmlDoc), t.responseXML && (t = t.responseXML),
                _isIE ? t.xml : (new XMLSerializer).serializeToString(t)
        }, window.dhtmlxEventable = function(obj) {
            obj.attachEvent = function(t, e, i) {
                return t = "ev_" + t.toLowerCase(), this[t] || (this[t] = new this.eventCatcher(i || this)), t + ":" + this[t].addEvent(e)
            }, obj.callEvent = function(t, e) {
                return t = "ev_" + t.toLowerCase(), !this[t] || this[t].apply(this, e)
            }, obj.checkEvent = function(t) {
                return !!this["ev_" + t.toLowerCase()]
            }, obj.eventCatcher = function(obj) {
                var dhx_catch = [],
                    z = function() {
                        for (var t = !0, e = 0; e < dhx_catch.length; e++)
                            if (dhx_catch[e]) {
                                var i = dhx_catch[e].apply(obj, arguments);
                                t = t && i
                            } return t
                    };
                return z.addEvent = function(ev) {
                    return "function" != typeof ev && (ev = eval(ev)), !!ev && dhx_catch.push(ev) - 1
                }, z.removeEvent = function(t) {
                    dhx_catch[t] = null
                }, z
            }, obj.detachEvent = function(t) {
                if (t) {
                    var e = t.split(":");
                    this[e[0]].removeEvent(e[1])
                }
            }, obj.detachAllEvents = function() {
                for (var t in this) 0 === t.indexOf("ev_") && (this.detachEvent(t), this[t] = null)
            }, obj = null
        }, window.dhtmlx || (window.dhtmlx = {}),
        function() {
            function t(t, e) {
                setTimeout(function() {
                    if (t.box) {
                        var n = t.callback;
                        i(!1), t.box.parentNode.removeChild(t.box), dhtmlx.callEvent("onAfterMessagePopup", [t.box]), c = t.box = null, n && n(e)
                    }
                }, 1)
            }

            function e(e) {
                if (c) {
                    e = e || event;
                    var i = e.which || event.keyCode,
                        n = !1;
                    if (dhtmlx.message.keyboard) {
                        if (13 == i || 32 == i) {
                            var a = e.target || e.srcElement;
                            scheduler._getClassName(a).indexOf("dhtmlx_popup_button") > -1 && a.click ? a.click() : (t(c, !0), n = !0)
                        }
                        27 == i && (t(c, !1), n = !0)
                    }
                    if (n) return e.preventDefault && e.preventDefault(),
                        !(e.cancelBubble = !0)
                } else;
            }

            function i(t) {
                i.cover || (i.cover = document.createElement("div"), i.cover.onkeydown = e, i.cover.className = "dhx_modal_cover", document.body.appendChild(i.cover));
                document.body.scrollHeight;
                i.cover.style.display = t ? "inline-block" : "none"
            }

            function n(t, e, i) {
                return "<div " + scheduler._waiAria.messageButtonAttrString(t) + "class='dhtmlx_popup_button dhtmlx_" + (i || t || "").toLowerCase().replace(/ /g, "_") + "_button' result='" + e + "' ><div>" + t + "</div></div>"
            }

            function a(t) {
                u.area || (u.area = document.createElement("div"), u.area.className = "dhtmlx_message_area", u.area.style[u.position] = "5px", document.body.appendChild(u.area)), u.hide(t.id);
                var e = document.createElement("div");
                return e.innerHTML = "<div>" + t.text + "</div>", e.className = "dhtmlx-info dhtmlx-" + t.type, e.onclick = function() {
                        u.hide(t.id), t = null
                    }, scheduler._waiAria.messageInfoAttr(e), "bottom" == u.position && u.area.firstChild ? u.area.insertBefore(e, u.area.firstChild) : u.area.appendChild(e),
                    t.expire > 0 && (u.timers[t.id] = window.setTimeout(function() {
                        u.hide(t.id)
                    }, t.expire)), u.pull[t.id] = e, e = null, t.id
            }

            function r(e, i, a) {
                var r = document.createElement("div");
                r.className = " dhtmlx_modal_box dhtmlx-" + e.type, r.setAttribute("dhxbox", 1);
                var s = scheduler.uid();
                scheduler._waiAria.messageModalAttr(r, s);
                var o = "",
                    d = !1;
                if (e.width && (r.style.width = e.width), e.height && (r.style.height = e.height), e.title && (o += '<div class="dhtmlx_popup_title" id="' + s + '">' + e.title + "</div>", d = !0),
                    o += '<div class="dhtmlx_popup_text" ' + (d ? "" : ' id="' + s + '" ') + "><span>" + (e.content ? "" : e.text) + '</span></div><div  class="dhtmlx_popup_controls">', i) {
                    var l = e.ok || scheduler.locale.labels.message_ok;
                    void 0 === l && (l = "OK"), o += n(l, !0, "ok")
                }
                if (a) {
                    var _ = e.cancel || scheduler.locale.labels.message_cancel;
                    void 0 === _ && (_ = "Cancel"), o += n(_, !1, "cancel")
                }
                if (e.buttons)
                    for (var h = 0; h < e.buttons.length; h++) o += n(e.buttons[h], h);
                if (o += "</div>", r.innerHTML = o, e.content) {
                    var u = e.content;
                    "string" == typeof u && (u = document.getElementById(u)), "none" == u.style.display && (u.style.display = ""), r.childNodes[e.title ? 1 : 0].appendChild(u)
                }
                return r.onclick = function(i) {
                    i = i || event;
                    var n = i.target || i.srcElement,
                        a = scheduler._getClassName(n);
                    if (a || (n = n.parentNode), a = scheduler._getClassName(n), "dhtmlx_popup_button" == a.split(" ")[0]) {
                        var r = n.getAttribute("result");
                        r = "true" == r || "false" != r && r, t(e, r)
                    }
                }, e.box = r, c = e, r
            }

            function s(t, n, a) {
                var s = t.tagName ? t : r(t, n, a);
                t.hidden || i(!0), document.body.appendChild(s);
                var o = Math.abs(Math.floor(((window.innerWidth || document.documentElement.offsetWidth) - s.offsetWidth) / 2)),
                    d = Math.abs(Math.floor(((window.innerHeight || document.documentElement.offsetHeight) - s.offsetHeight) / 2));
                return "top" == t.position ? s.style.top = "-3px" : s.style.top = d + "px", s.style.left = o + "px", s.onkeydown = e, dhtmlx.modalbox.focus(s), t.hidden && dhtmlx.modalbox.hide(s), dhtmlx.callEvent("onMessagePopup", [s]), s
            }

            function o(t) {
                return s(t, !0, !1)
            }

            function d(t) {
                return s(t, !0, !0)
            }

            function l(t) {
                return s(t)
            }

            function _(t, e, i) {
                return "object" != typeof t && ("function" == typeof e && (i = e, e = ""), t = {
                    text: t,
                    type: e,
                    callback: i
                }), t
            }

            function h(t, e, i, n) {
                return "object" != typeof t && (t = {
                    text: t,
                    type: e,
                    expire: i,
                    id: n
                }), t.id = t.id || u.uid(), t.expire = t.expire || u.expire, t
            }
            var c = null;
            document.attachEvent ? document.attachEvent("onkeydown", e) : document.addEventListener("keydown", e, !0), dhtmlx.alert = function() {
                var t = _.apply(this, arguments);
                return t.type = t.type || "confirm", o(t)
            }, dhtmlx.confirm = function() {
                var t = _.apply(this, arguments);
                return t.type = t.type || "alert", d(t)
            }, dhtmlx.modalbox = function() {
                var t = _.apply(this, arguments);
                return t.type = t.type || "alert", l(t)
            }, dhtmlx.modalbox.hide = function(t) {
                for (; t && t.getAttribute && !t.getAttribute("dhxbox");) t = t.parentNode;
                t && (t.parentNode.removeChild(t), i(!1))
            }, dhtmlx.modalbox.focus = function(t) {
                setTimeout(function() {
                    var e = scheduler._getFocusableNodes(t);
                    e.length && e[0].focus && e[0].focus()
                }, 1)
            };
            var u = dhtmlx.message = function(t, e, i, n) {
                switch (t = h.apply(this, arguments), t.type = t.type || "info",
                    t.type.split("-")[0]) {
                    case "alert":
                        return o(t);
                    case "confirm":
                        return d(t);
                    case "modalbox":
                        return l(t);
                    default:
                        return a(t)
                }
            };
            u.seed = (new Date).valueOf(), u.uid = function() {
                return u.seed++
            }, u.expire = 4e3, u.keyboard = !0, u.position = "top", u.pull = {}, u.timers = {}, u.hideAll = function() {
                for (var t in u.pull) u.hide(t)
            }, u.hide = function(t) {
                var e = u.pull[t];
                e && e.parentNode && (window.setTimeout(function() {
                        e.parentNode.removeChild(e), e = null
                    }, 2e3), e.className += " hidden", u.timers[t] && window.clearTimeout(u.timers[t]),
                    delete u.pull[t])
            }
        }(), dhtmlx.attachEvent || dhtmlxEventable(dhtmlx);
    var dataProcessor = window.dataProcessor = function(t) {
        return this.serverProcessor = t, this.action_param = "!nativeeditor_status", this.object = null, this.updatedRows = [], this.autoUpdate = !0, this.updateMode = "cell", this._tMode = "GET", this._headers = null, this._payload = null, this.post_delim = "_", this._waitMode = 0, this._in_progress = {}, this._invalid = {}, this.mandatoryFields = [], this.messages = [], this.styles = {
            updated: "font-weight:bold;",
            inserted: "font-weight:bold;",
            deleted: "text-decoration : line-through;",
            invalid: "background-color:FFE0E0;",
            invalid_cell: "border-bottom:2px solid red;",
            error: "color:red;",
            clear: "font-weight:normal;text-decoration:none;"
        }, this.enableUTFencoding(!0), dhtmlxEventable(this), this
    };
    dataProcessor.prototype = {
            setTransactionMode: function(t, e) {
                function i(t, e) {
                    var i = e.toLowerCase();
                    for (var n in t)
                        if (n.toLowerCase() === i) return !0;
                    return !1
                }
                "object" == typeof t ? (this._tMode = t.mode || this._tMode,
                    void 0 !== t.headers && (this._headers = t.headers), void 0 !== t.payload && (this._payload = t.payload)) : (this._tMode = t, this._tSend = e), "REST" == this._tMode && (this._tSend = !1, this._endnm = !0);
                var n = "Content-Type";
                "JSON" == this._tMode && (this._tSend = !1, this._endnm = !0, this._headers = this._headers || {}, this._headers[n] = "application/json"), this._headers && !i(this._headers, n) && (this._headers[n] = "application/x-www-form-urlencoded")
            },
            escape: function(t) {
                return this._utf ? encodeURIComponent(t) : escape(t)
            },
            enableUTFencoding: function(t) {
                this._utf = !!t
            },
            setDataColumns: function(t) {
                this._columns = "string" == typeof t ? t.split(",") : t
            },
            getSyncState: function() {
                return !this.updatedRows.length
            },
            enableDataNames: function(t) {
                this._endnm = !!t
            },
            enablePartialDataSend: function(t) {
                this._changed = !!t
            },
            setUpdateMode: function(t, e) {
                this.autoUpdate = "cell" == t, this.updateMode = t, this.dnd = e
            },
            ignore: function(t, e) {
                this._silent_mode = !0, t.call(e || window), this._silent_mode = !1
            },
            setUpdated: function(t, e, i) {
                if (!this._silent_mode) {
                    var n = this.findRow(t);
                    i = i || "updated";
                    var a = this.obj.getUserData(t, this.action_param);
                    a && "updated" == i && (i = a), e ? (this.set_invalid(t, !1), this.updatedRows[n] = t, this.obj.setUserData(t, this.action_param, i), this._in_progress[t] && (this._in_progress[t] = "wait")) : this.is_invalid(t) || (this.updatedRows.splice(n, 1), this.obj.setUserData(t, this.action_param, "")), e || this._clearUpdateFlag(t), this.markRow(t, e, i), e && this.autoUpdate && this.sendData(t)
                }
            },
            _clearUpdateFlag: function(t) {},
            markRow: function(t, e, i) {
                var n = "",
                    a = this.is_invalid(t);
                if (a && (n = this.styles[a], e = !0), this.callEvent("onRowMark", [t, e, i, a]) && (n = this.styles[e ? i : "clear"] + n, this.obj[this._methods[0]](t, n), a && a.details)) {
                    n += this.styles[a + "_cell"];
                    for (var r = 0; r < a.details.length; r++) a.details[r] && this.obj[this._methods[1]](t, r, n)
                }
            },
            getState: function(t) {
                return this.obj.getUserData(t, this.action_param)
            },
            is_invalid: function(t) {
                return this._invalid[t]
            },
            set_invalid: function(t, e, i) {
                i && (e = {
                    value: e,
                    details: i,
                    toString: function() {
                        return this.value.toString()
                    }
                }), this._invalid[t] = e
            },
            checkBeforeUpdate: function(t) {
                return !0
            },
            sendData: function(t) {
                if (!this._waitMode || "tree" != this.obj.mytype && !this.obj._h2) {
                    if (this.obj.editStop && this.obj.editStop(), void 0 === t || this._tSend) return this.sendAllData();
                    if (this._in_progress[t]) return !1;
                    if (this.messages = [], !this.checkBeforeUpdate(t) && this.callEvent("onValidationError", [t, this.messages])) return !1;
                    this._beforeSendData(this._getRowData(t), t)
                }
            },
            _beforeSendData: function(t, e) {
                if (!this.callEvent("onBeforeUpdate", [e, this.getState(e), t])) return !1;
                this._sendData(t, e)
            },
            serialize: function(t, e) {
                if ("string" == typeof t) return t;
                if (void 0 !== e) return this.serialize_one(t, "");
                var i = [],
                    n = [];
                for (var a in t) t.hasOwnProperty(a) && (i.push(this.serialize_one(t[a], a + this.post_delim)), n.push(a));
                return i.push("ids=" + this.escape(n.join(","))), (scheduler.security_key || dhtmlx.security_key) && i.push("dhx_security=" + (scheduler.security_key || dhtmlx.security_key)), i.join("&")
            },
            serialize_one: function(t, e) {
                if ("string" == typeof t) return t;
                var i = [];
                for (var n in t)
                    if (t.hasOwnProperty(n)) {
                        if (("id" == n || n == this.action_param) && "REST" == this._tMode) continue;
                        i.push(this.escape((e || "") + n) + "=" + this.escape(t[n]))
                    } return i.join("&")
            },
            _applyPayload: function(t) {
                var e = this.obj.$ajax;
                if (this._payload)
                    for (var i in this._payload) t = t + e.urlSeparator(t) + this.escape(i) + "=" + this.escape(this._payload[i]);
                return t
            },
            _sendData: function(t, e) {
                if (t) {
                    if (!this.callEvent("onBeforeDataSending", e ? [e, this.getState(e), t] : [null, null, t])) return !1;
                    e && (this._in_progress[e] = (new Date).valueOf());
                    var i = this,
                        n = function(n) {
                            var a = [];
                            if (e) a.push(e);
                            else if (t)
                                for (var r in t) a.push(r);
                            return i.afterUpdate(i, n, a)
                        },
                        a = this.obj.$ajax,
                        r = this.serverProcessor + (this._user ? a.urlSeparator(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + this.obj.getUserData(0, "version")].join("&") : ""),
                        s = this._applyPayload(r);
                    if ("GET" == this._tMode) a.query({
                        url: s + a.urlSeparator(s) + this.serialize(t, e),
                        method: "GET",
                        callback: n,
                        headers: this._headers
                    });
                    else if ("POST" == this._tMode) a.query({
                        url: s,
                        method: "POST",
                        headers: this._headers,
                        data: this.serialize(t, e),
                        callback: n
                    });
                    else if ("JSON" == this._tMode) {
                        var o = t[this.action_param],
                            d = {};
                        for (var l in t) d[l] = t[l];
                        delete d[this.action_param], delete d.id, delete d.gr_id, a.query({
                            url: s,
                            method: "POST",
                            headers: this._headers,
                            callback: n,
                            data: JSON.stringify({
                                id: e,
                                action: o,
                                data: d
                            })
                        })
                    } else if ("REST" == this._tMode) {
                        var _ = this.getState(e),
                            h = r.replace(/(\&|\?)editing\=true/, ""),
                            d = "",
                            c = "post";
                        "inserted" == _ ? d = this.serialize(t, e) : "deleted" == _ ? (c = "DELETE", h = h + ("/" == h.slice(-1) ? "" : "/") + e) : (c = "PUT", d = this.serialize(t, e), h = h + ("/" == h.slice(-1) ? "" : "/") + e), h = this._applyPayload(h), a.query({
                            url: h,
                            method: c,
                            headers: this._headers,
                            data: d,
                            callback: n
                        })
                    }
                    this._waitMode++
                }
            },
            sendAllData: function() {
                if (this.updatedRows.length) {
                    this.messages = [];
                    for (var t = !0, e = 0; e < this.updatedRows.length; e++) t &= this.checkBeforeUpdate(this.updatedRows[e]);
                    if (!t && !this.callEvent("onValidationError", ["", this.messages])) return !1;
                    if (this._tSend) this._sendData(this._getAllData());
                    else
                        for (var e = 0; e < this.updatedRows.length; e++)
                            if (!this._in_progress[this.updatedRows[e]]) {
                                if (this.is_invalid(this.updatedRows[e])) continue;
                                if (this._beforeSendData(this._getRowData(this.updatedRows[e]), this.updatedRows[e]),
                                    this._waitMode && ("tree" == this.obj.mytype || this.obj._h2)) return
                            }
                }
            },
            _getAllData: function(t) {
                for (var e = {}, i = !1, n = 0; n < this.updatedRows.length; n++) {
                    var a = this.updatedRows[n];
                    if (!this._in_progress[a] && !this.is_invalid(a)) {
                        var r = this._getRowData(a);
                        this.callEvent("onBeforeUpdate", [a, this.getState(a), r]) && (e[a] = r, i = !0, this._in_progress[a] = (new Date).valueOf())
                    }
                }
                return i ? e : null
            },
            setVerificator: function(t, e) {
                this.mandatoryFields[t] = e || function(t) {
                    return "" !== t
                }
            },
            clearVerificator: function(t) {
                this.mandatoryFields[t] = !1
            },
            findRow: function(t) {
                var e = 0;
                for (e = 0; e < this.updatedRows.length && t != this.updatedRows[e]; e++);
                return e
            },
            defineAction: function(t, e) {
                this._uActions || (this._uActions = []), this._uActions[t] = e
            },
            afterUpdateCallback: function(t, e, i, n) {
                var a = t,
                    r = "error" != i && "invalid" != i;
                if (r || this.set_invalid(t, i), this._uActions && this._uActions[i] && !this._uActions[i](n)) return delete this._in_progress[a];
                "wait" != this._in_progress[a] && this.setUpdated(t, !1);
                var s = t;
                switch (i) {
                    case "inserted":
                    case "insert":
                        e != t && (this.setUpdated(t, !1), this.obj[this._methods[2]](t, e), t = e);
                        break;
                    case "delete":
                    case "deleted":
                        return this.obj.setUserData(t, this.action_param, "true_deleted"), this.obj[this._methods[3]](t, e), delete this._in_progress[a], this.callEvent("onAfterUpdate", [t, i, e, n])
                }
                "wait" != this._in_progress[a] ? (r && this.obj.setUserData(t, this.action_param, ""), delete this._in_progress[a]) : (delete this._in_progress[a], this.setUpdated(e, !0, this.obj.getUserData(t, this.action_param))),
                    this.callEvent("onAfterUpdate", [s, i, e, n])
            },
            _errorResponse: function(t, e) {
                return this.obj && this.obj.callEvent && this.obj.callEvent("onSaveError", [e, t.xmlDoc]), this.cleanUpdate(e)
            },
            afterUpdate: function(t, e, i) {
                var n = this.obj.$ajax;
                if (200 !== e.xmlDoc.status) return void this._errorResponse(e, i);
                if (window.JSON) {
                    var a;
                    try {
                        a = JSON.parse(e.xmlDoc.responseText)
                    } catch (t) {
                        e.xmlDoc.responseText.length || (a = {})
                    }
                    if (a) {
                        var r = a.action || this.getState(i) || "updated",
                            s = a.sid || i[0],
                            o = a.tid || i[0];
                        return t.afterUpdateCallback(s, o, r, a), void t.finalizeUpdate()
                    }
                }
                var d = n.xmltop("data", e.xmlDoc);
                if (!d) return this._errorResponse(e, i);
                var l = n.xpath("//data/action", d);
                l.length || this._errorResponse(e, i);
                for (var _ = 0; _ < l.length; _++) {
                    var h = l[_],
                        r = h.getAttribute("type"),
                        s = h.getAttribute("sid"),
                        o = h.getAttribute("tid");
                    t.afterUpdateCallback(s, o, r, h)
                }
                t.finalizeUpdate()
            },
            cleanUpdate: function(t) {
                if (t)
                    for (var e = 0; e < t.length; e++) delete this._in_progress[t[e]]
            },
            finalizeUpdate: function() {
                this._waitMode && this._waitMode--, ("tree" == this.obj.mytype || this.obj._h2) && this.updatedRows.length && this.sendData(), this.callEvent("onAfterUpdateFinish", []), this.updatedRows.length || this.callEvent("onFullSync", [])
            },
            init: function(t) {
                this.obj = t, this.obj._dp_init && this.obj._dp_init(this)
            },
            setOnAfterUpdate: function(t) {
                this.attachEvent("onAfterUpdate", t)
            },
            enableDebug: function(t) {},
            setOnBeforeUpdateHandler: function(t) {
                this.attachEvent("onBeforeDataSending", t)
            },
            setAutoUpdate: function(t, e) {
                t = t || 2e3,
                    this._user = e || (new Date).valueOf(), this._need_update = !1, this._update_busy = !1, this.attachEvent("onAfterUpdate", function(t, e, i, n) {
                        this.afterAutoUpdate(t, e, i, n)
                    }), this.attachEvent("onFullSync", function() {
                        this.fullSync()
                    });
                var i = this;
                window.setInterval(function() {
                    i.loadUpdate()
                }, t)
            },
            afterAutoUpdate: function(t, e, i, n) {
                return "collision" != e || (this._need_update = !0, !1)
            },
            fullSync: function() {
                return this._need_update && (this._need_update = !1, this.loadUpdate()), !0
            },
            getUpdates: function(t, e) {
                var i = this.obj.$ajax;
                if (this._update_busy) return !1;
                this._update_busy = !0, i.get(t, e)
            },
            _v: function(t) {
                return t.firstChild ? t.firstChild.nodeValue : ""
            },
            _a: function(t) {
                for (var e = [], i = 0; i < t.length; i++) e[i] = this._v(t[i]);
                return e
            },
            loadUpdate: function() {
                var t = this.obj.$ajax,
                    e = this,
                    i = this.obj.getUserData(0, "version"),
                    n = this.serverProcessor + t.urlSeparator(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + i].join("&");
                n = n.replace("editing=true&", ""), this.getUpdates(n, function(i) {
                    var n = t.xpath("//userdata", i);
                    e.obj.setUserData(0, "version", e._v(n[0]));
                    var a = t.xpath("//update", i);
                    if (a.length) {
                        e._silent_mode = !0;
                        for (var r = 0; r < a.length; r++) {
                            var s = a[r].getAttribute("status"),
                                o = a[r].getAttribute("id"),
                                d = a[r].getAttribute("parent");
                            switch (s) {
                                case "inserted":
                                    e.callEvent("insertCallback", [a[r], o, d]);
                                    break;
                                case "updated":
                                    e.callEvent("updateCallback", [a[r], o, d]);
                                    break;
                                case "deleted":
                                    e.callEvent("deleteCallback", [a[r], o, d])
                            }
                        }
                        e._silent_mode = !1
                    }
                    e._update_busy = !1, e = null
                })
            }
        },
        window.dataProcessor && !dataProcessor.prototype.init_original && (dataProcessor.prototype.init_original = dataProcessor.prototype.init, dataProcessor.prototype.init = function(t) {
            this.init_original(t), t._dataprocessor = this, this.setTransactionMode("POST", !0), this.serverProcessor += (-1 != this.serverProcessor.indexOf("?") ? "&" : "?") + "editing=true"
        }), dhtmlxError.catchError("LoadXML", function(t, e, i) {
            var n = i[0].responseText;
            switch (scheduler.config.ajax_error) {
                case "alert":
                    window.alert(n);
                    break;
                case "console":
                    window.console.log(n)
            }
        });
    var Scheduler = {
        _seed: 0
    };
    Scheduler.plugin = function(t) {
        this._schedulerPlugins.push(t), t(window.scheduler)
    }, Scheduler._schedulerPlugins = [], Scheduler.getSchedulerInstance = function() {
        function t(t) {
            var e = document.createElement("div");
            return (t || "").split(" ").forEach(function(t) {
                e.classList.add(t)
            }), e
        }

        function e(t) {
            var e;
            if (t.view) switch (t.view) {
                case "today":
                case "next":
                case "prev":
                    e = p.builtInButton;
                    break;
                case "date":
                    e = p.date;
                    break;
                case "spacer":
                    e = p.spacer;
                    break;
                case "button":
                    e = p.button;
                    break;
                case "minicalendar":
                    e = p.minicalendarButton;
                    break;
                default:
                    e = p.view
            } else t.rows ? e = p.rows_container : t.cols && (e = p.row);
            return e
        }

        function i(t) {
            var i = e(t);
            if (i) {
                var n = i(t);
                if (t.css && n.classList.add(t.css), t.width) {
                    var a = t.width;
                    a === 1 * a && (a += "px"), n.style.width = a
                }
                if (t.height) {
                    var a = t.height;
                    a === 1 * a && (a += "px"), n.style.height = a
                }
                if (t.click && n.addEventListener("click", t.click), t.html && (n.innerHTML = t.html), t.align) {
                    var a = "";
                    "right" == t.align ? a = "flex-end" : "left" == t.align && (a = "flex-start"),
                        n.style.justifyContent = a
                }
                return n
            }
        }

        function n(t) {
            return "string" == typeof t && (t = {
                view: t
            }), t.view || t.rows || t.cols || (t.view = "button"), t
        }

        function a(t) {
            var e, r = document.createDocumentFragment();
            e = Array.isArray(t) ? t : [t];
            for (var s = 0; s < e.length; s++) {
                var o = n(e[s]);
                if ("day" === o.view && e[s + 1]) {
                    var d = n(e[s + 1]);
                    "week" !== d.view && "month" !== d.view || (o.$firstTab = !0)
                }
                if ("month" === o.view && e[s - 1]) {
                    var d = n(e[s - 1]);
                    "week" !== d.view && "day" !== d.view || (o.$lastTab = !0)
                }
                var l = i(o);
                r.appendChild(l),
                    (o.cols || o.rows) && l.appendChild(a(o.cols || o.rows))
            }
            return r
        }

        function r(t) {
            return !!(t.querySelector(".dhx_cal_header") && t.querySelector(".dhx_cal_data") && t.querySelector(".dhx_cal_navline"))
        }

        function s(t) {
            var e = ["day", "week", "month"],
                i = ["date"],
                n = ["prev", "today", "next"];
            if (t.matrix)
                for (var a in t.matrix) e.push(a);
            if (t._props)
                for (var a in t._props) e.push(a);
            if (t._grid && t._grid.names)
                for (var a in t._grid.names) e.push(a);
            return ["map", "agenda", "week_agenda", "year"].forEach(function(i) {
                t[i + "_view"] && e.push(i)
            }), e.concat(i).concat(n)
        }

        function o(t) {
            return Array.isArray ? Array.isArray(t) : t && void 0 !== t.length && t.pop && t.push
        }

        function d(t) {
            return t && "object" == typeof t && "function String() { [native code] }" === Function.prototype.toString.call(t.constructor)
        }

        function l(t) {
            return t && "object" == typeof t && "function Number() { [native code] }" === Function.prototype.toString.call(t.constructor)
        }

        function _(t) {
            return t && "object" == typeof t && "function Boolean() { [native code] }" === Function.prototype.toString.call(t.constructor)
        }

        function h(t) {
            return !(!t || "object" != typeof t) && !!(t.getFullYear && t.getMonth && t.getDate)
        }

        function c() {
            if (void 0 === A) {
                var t = document.createElement("div");
                t.style.position = "absolute", t.style.left = "-9999px", t.style.top = "-9999px", t.innerHTML = "<div class='dhx_cal_container'><div class='dhx_cal_scale_placeholder'></div><div>", document.body.appendChild(t);
                var e = window.getComputedStyle(t.querySelector(".dhx_cal_scale_placeholder")),
                    i = e.getPropertyValue("position");
                A = "absolute" === i, setTimeout(function() {
                    A = null
                }, 500)
            }
            return A
        }

        function u() {
            if (g._is_material_skin()) return !0;
            if (void 0 !== S) return S;
            var t = document.createElement("div");
            t.style.position = "absolute", t.style.left = "-9999px", t.style.top = "-9999px", t.innerHTML = "<div class='dhx_cal_container'><div class='dhx_cal_data'><div class='dhx_cal_event'><div class='dhx_body'></div></div><div>",
                document.body.appendChild(t);
            var e = window.getComputedStyle(t.querySelector(".dhx_body")),
                i = e.getPropertyValue("box-sizing");
            document.body.removeChild(t), (S = !("border-box" !== i)) || setTimeout(function() {
                S = void 0
            }, 1e3)
        }

        function f() {
            if (!g._is_material_skin() && !g._border_box_events()) {
                var t = S;
                S = void 0, A = void 0;
                t !== u() && g.$container && g.getState().mode && g.setCurrentView()
            }
        }
        var g = {
                version: "5.3.13"
            },
            v = {
                agenda: "https://docs.dhtmlx.com/scheduler/agenda_view.html",
                grid: "https://docs.dhtmlx.com/scheduler/grid_view.html",
                map: "https://docs.dhtmlx.com/scheduler/map_view.html",
                unit: "https://docs.dhtmlx.com/scheduler/units_view.html",
                timeline: "https://docs.dhtmlx.com/scheduler/timeline_view.html",
                week_agenda: "https://docs.dhtmlx.com/scheduler/weekagenda_view.html",
                year: "https://docs.dhtmlx.com/scheduler/year_view.html",
                anythingElse: "https://docs.dhtmlx.com/scheduler/views.html"
            },
            m = {
                agenda: "ext/dhtmlxscheduler_agenda_view.js",
                grid: "ext/dhtmlxscheduler_grid_view.js",
                map: "ext/dhtmlxscheduler_map_view.js",
                unit: "ext/dhtmlxscheduler_units.js",
                timeline: "ext/dhtmlxscheduler_timeline.js, ext/dhtmlxscheduler_treetimeline.js, ext/dhtmlxscheduler_daytimeline.js",
                week_agenda: "ext/dhtmlxscheduler_week_agenda.js",
                year: "ext/dhtmlxscheduler_year_view.js",
                limit: "ext/dhtmlxscheduler_limit.js"
            };
        g._commonErrorMessages = {
                unknownView: function(t) {
                    var e = "Related docs: " + (v[t] || v.anythingElse),
                        i = m[t] ? "You're probably missing " + m[t] + "." : "";
                    return "`" + t + "` view is not defined. \nPlease check parameters you pass to `scheduler.init` or `scheduler.setCurrentView` in your code and ensure you've imported appropriate extensions. \n" + e + "\n" + (i ? i + "\n" : "")
                },
                collapsedContainer: function(t) {
                    return "Scheduler container height is set to *100%* but the rendered height is zero and the scheduler is not visible. \nMake sure that the container has some initial height or use different units. For example:\n<div id='scheduler_here' class='dhx_cal_container' style='width:100%; height:600px;'> \n"
                }
            }, g.createTimelineView = function() {
                throw new Error("scheduler.createTimelineView is not implemented. Be sure to add the required extension: " + m.timeline + "\nRelated docs: " + v.timeline)
            },
            g.createUnitsView = function() {
                throw new Error("scheduler.createUnitsView is not implemented. Be sure to add the required extension: " + m.unit + "\nRelated docs: " + v.unit)
            }, g.createGridView = function() {
                throw new Error("scheduler.createGridView is not implemented. Be sure to add the required extension: " + m.grid + "\nRelated docs: " + v.grid)
            }, g.addMarkedTimespan = function() {
                throw new Error("scheduler.addMarkedTimespan is not implemented. Be sure to add the required extension: ext/dhtmlxscheduler_limit.js\nRelated docs: https://docs.dhtmlx.com/scheduler/limits.html")
            }, g.renderCalendar = function() {
                throw new Error("scheduler.renderCalendar is not implemented. Be sure to add the required extension: ext/dhtmlxscheduler_minical.js\nhttps://docs.dhtmlx.com/scheduler/minicalendar.html")
            }, g.exportToPNG = function() {
                throw new Error(["scheduler.exportToPNG is not implemented.", "This feature requires an additional module, be sure to check the related doc here https://docs.dhtmlx.com/scheduler/png.html", "Licensing info: https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml"].join("\n"))
            }, g.exportToPDF = function() {
                throw new Error(["scheduler.exportToPDF is not implemented.", "This feature requires an additional module, be sure to check the related doc here https://docs.dhtmlx.com/scheduler/pdf.html", "Licensing info: https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml"].join("\n"))
            }, dhtmlxEventable(g);
        var p = {
            rows_container: function() {
                return t("dhx_cal_navbar_rows_container")
            },
            row: function() {
                return t("dhx_cal_navbar_row")
            },
            view: function(e) {
                var i = t("dhx_cal_tab");
                return i.setAttribute("name", e.view + "_tab"), i.setAttribute("data-viewname", e.view), g.config.fix_tab_position && (e.$firstTab ? i.classList.add("dhx_cal_tab_first") : e.$lastTab ? i.classList.add("dhx_cal_tab_last") : "week" !== e.view && i.classList.add("dhx_cal_tab_standalone")), i
            },
            date: function() {
                return t("dhx_cal_date")
            },
            button: function(e) {
                return t("dhx_cal_nav_button dhx_cal_nav_button_custom dhx_cal_tab")
            },
            builtInButton: function(e) {
                return t("dhx_cal_" + e.view + "_button dhx_cal_nav_button")
            },
            spacer: function() {
                return t("dhx_cal_line_spacer")
            },
            minicalendarButton: function(e) {
                var i = t("dhx_minical_icon");
                return e.click || (i.onclick = function() {
                    g.isCalendarVisible() ? g.destroyCalendar() : g.renderCalendar({
                        position: this,
                        date: g.getState().date,
                        navigation: !0,
                        handler: function(t, e) {
                            g.setCurrentView(t), g.destroyCalendar()
                        }
                    })
                }), i
            },
            html_element: function(e) {
                return t("dhx_cal_nav_content")
            }
        };
        g._init_nav_bar = function(t) {
            var e = this.$container.querySelector(".dhx_cal_navline");
            return e || (e = document.createElement("div"), e.className = "dhx_cal_navline dhx_cal_navline_flex", g._update_nav_bar(t, e), e)
        };
        var x = null,
            b = null;
        g._update_nav_bar = function(t, e) {
            if (t) {
                var i = !1,
                    n = !1,
                    r = t.height || g.xy.nav_height;
                null !== b && b === r || (i = !0), x && JSON.stringify(t) === x || (n = !0), i && (g.xy.nav_height = r), n && (e.innerHTML = "", e.appendChild(a(t))), (i || n) && (g._els = [], g.get_elements(), g.set_actions()), e.style.display = 0 === r ? "none" : "", b = r
            }
        }, g._detachDomEvent = function(t, e, i) {
            t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent && t.detachEvent("on" + e, i)
        }, g._init_once = function() {
            function t(t) {
                for (var e = document.body; t && t != e;) t = t.parentNode;
                return !(e != t)
            }

            function e(t) {
                return {
                    w: t.innerWidth || document.documentElement.clientWidth,
                    h: t.innerHeight || document.documentElement.clientHeight
                }
            }

            function i(t, e) {
                return t.w == e.w && t.h == e.h
            }

            function n(n, a) {
                var r, s = e(a);
                n.event(a, "resize", function() {
                    clearTimeout(r), r = setTimeout(function() {
                        if (t(n.$container)) {
                            var r = e(a);
                            i(s, r) || (s = r, n.callEvent("onSchedulerResize", []) && (n.updateView(), n.callEvent("onAfterSchedulerResize", [])))
                        }
                    }, 150)
                })
            }

            function a(t) {
                var e = t.$container;
                "static" == window.getComputedStyle(e).getPropertyValue("position") && (e.style.position = "relative");
                var i = document.createElement("iframe");
                i.className = "scheduler_container_resize_watcher", i.tabIndex = -1, t.config.wai_aria_attributes && (i.setAttribute("role", "none"), i.setAttribute("aria-hidden", !0)), e.appendChild(i),
                    i.contentWindow ? n(t, i.contentWindow) : (e.removeChild(i), n(t, window))
            }
            a(g), g._init_once = function() {}
        };
        var y = {
            navbar: {
                render: function(t) {
                    return g._init_nav_bar(t)
                }
            },
            header: {
                render: function(t) {
                    var e = document.createElement("div");
                    return e.className = "dhx_cal_header", e
                }
            },
            dataArea: {
                render: function(t) {
                    var e = document.createElement("div");
                    return e.className = "dhx_cal_data", e
                }
            },
            html_element: {
                render: function(t) {
                    return t.html
                }
            }
        };
        g.init = function(t, e, i) {
                if (e = e || g._currentDate(), i = i || "week",
                    this._obj && this.unset_actions(), this._obj = "string" == typeof t ? document.getElementById(t) : t, this.$container = this._obj, !this.$container.offsetHeight && this.$container.offsetWidth && "100%" === this.$container.style.height && window.console.error(g._commonErrorMessages.collapsedContainer(), this.$container), this.config.wai_aria_attributes && this.config.wai_aria_application_role && this.$container.setAttribute("role", "application"), this.config.header || r(this.$container) || (this.config.header = s(this),
                        console.log(["Required DOM elements are missing from the scheduler container and **scheduler.config.header** is not specified.", "Using a default header configuration: ", "scheduler.config.header = " + JSON.stringify(this.config.header, null, 2), "Check this article for the details: https://docs.dhtmlx.com/scheduler/initialization.html"].join("\n"))), this.config.header) this.$container.innerHTML = "", this.$container.classList.add("dhx_cal_container"),
                    this.config.header.height && (this.xy.nav_height = this.config.header.height), this.$container.appendChild(y.navbar.render(this.config.header)), this.$container.appendChild(y.header.render()),
                    this.$container.appendChild(y.dataArea.render());
                else if (!r(this.$container)) throw new Error(["Required DOM elements are missing from the scheduler container.", "Be sure to either specify them manually in the markup: https://docs.dhtmlx.com/scheduler/initialization.html#initializingschedulerviamarkup", "Or to use **scheduler.config.header** setting so they could be created automatically: https://docs.dhtmlx.com/scheduler/initialization.html#initializingschedulerviaheaderconfig"].join("\n"));
                this.config.rtl && (this.$container.className += " dhx_cal_container_rtl"), this._skin_init && g._skin_init(), g.date.init(), this._scroll = !0, this._quirks = this.$env.isIE && "BackCompat" == document.compatMode, this._quirks7 = this.$env.isIE && -1 == navigator.appVersion.indexOf("MSIE 8"), this._els = [], this.get_elements(), this.init_templates(), this.set_actions(), this._init_once(), this._init_touch_events(), this.set_sizes(), g.callEvent("onSchedulerReady", []), this.setCurrentView(e, i)
            }, g.xy = {
                min_event_height: 40,
                scale_width: 50,
                scroll_width: 18,
                scale_height: 20,
                month_scale_height: 20,
                menu_width: 25,
                margin_top: 0,
                margin_left: 0,
                editor_width: 140,
                month_head_height: 22,
                event_header_height: 14
            }, g.keys = {
                edit_save: 13,
                edit_cancel: 27
            }, g.bind = function(t, e) {
                return t.bind ? t.bind(e) : function() {
                    return t.apply(e, arguments)
                }
            }, g.set_sizes = function() {
                var t = this._x = this._obj.clientWidth - this.xy.margin_left,
                    e = this._y = this._obj.clientHeight - this.xy.margin_top,
                    i = this._table_view ? 0 : this.xy.scale_width + this.xy.scroll_width,
                    n = this._table_view ? -1 : this.xy.scale_width,
                    a = this.$container.querySelector(".dhx_cal_scale_placeholder");
                g._is_material_skin() ? (a || (a = document.createElement("div"), a.className = "dhx_cal_scale_placeholder", this.$container.insertBefore(a, this._els.dhx_cal_header[0])), a.style.display = "block",
                    this.set_xy(a, t, this.xy.scale_height + 1, 0, this.xy.nav_height + (this._quirks ? -1 : 1))) : a && a.parentNode.removeChild(a), this._lightbox && (g.$container.offsetWidth < 1200 || this._setLbPosition(document.querySelector(".dhx_cal_light"))), this.set_xy(this._els.dhx_cal_navline[0], t, this.xy.nav_height, 0, 0), this.set_xy(this._els.dhx_cal_header[0], t - i, this.xy.scale_height, n, this.xy.nav_height + (this._quirks ? -1 : 1));
                var r = this._els.dhx_cal_navline[0].offsetHeight;
                r > 0 && (this.xy.nav_height = r);
                var s = this.xy.scale_height + this.xy.nav_height + (this._quirks ? -2 : 0);
                this.set_xy(this._els.dhx_cal_data[0], t, e - (s + 2), 0, s + 2)
            }, g.set_xy = function(t, e, i, n, a) {
                var r = "left";
                t.style.width = Math.max(0, e) + "px", t.style.height = Math.max(0, i) + "px", arguments.length > 3 && (this.config.rtl && (r = "right"), t.style[r] = n + "px", t.style.top = a + "px")
            }, g.get_elements = function() {
                for (var t = this._obj.getElementsByTagName("DIV"), e = 0; e < t.length; e++) {
                    var i = g._getClassName(t[e]),
                        n = t[e].getAttribute("name") || "";
                    i && (i = i.split(" ")[0]),
                        this._els[i] || (this._els[i] = []), this._els[i].push(t[e]);
                    var a = g.locale.labels[n || i];
                    "string" != typeof a && n && !t[e].innerHTML && (a = n.split("_")[0]), a && (this._waiAria.labelAttr(t[e], a), t[e].innerHTML = a)
                }
            }, g.unset_actions = function() {
                for (var t in this._els)
                    if (this._click[t])
                        for (var e = 0; e < this._els[t].length; e++) this._els[t][e].onclick = null;
                this._obj.onselectstart = null, this._obj.onmousemove = null, this._obj.onmousedown = null, this._obj.onmouseup = null, this._obj.ondblclick = null, this._obj.oncontextmenu = null
            },
            g.set_actions = function() {
                for (var t in this._els)
                    if (this._click[t])
                        for (var e = 0; e < this._els[t].length; e++) this._els[t][e].onclick = g._click[t];
                this._obj.onselectstart = function(t) {
                        return !1
                    }, this._obj.onmousemove = function(t) {
                        g._temp_touch_block || g._on_mouse_move(t || event)
                    }, this._obj.onmousedown = function(t) {
                        g._ignore_next_click || g._on_mouse_down(t || event)
                    }, this._obj.onmouseup = function(t) {
                        g._ignore_next_click || g._on_mouse_up(t || event)
                    }, this._obj.ondblclick = function(t) {
                        g._on_dbl_click(t || event)
                    },
                    this._obj.oncontextmenu = function(t) {
                        var e = t || event,
                            i = e.target || e.srcElement;
                        return g.callEvent("onContextMenu", [g._locate_event(i), e])
                    }
            }, g.select = function(t) {
                this._select_id != t && (g._close_not_saved(), this.editStop(!1), this.unselect(), this._select_id = t, this.updateEvent(t), this.callEvent("onEventSelected", [t]))
            }, g.unselect = function(t) {
                if (!t || t == this._select_id) {
                    var e = this._select_id;
                    this._select_id = null, e && this.getEvent(e) && this.updateEvent(e), this.callEvent("onEventUnselected", [e])
                }
            },
            g.getState = function() {
                return {
                    mode: this._mode,
                    date: new Date(this._date),
                    min_date: new Date(this._min_date),
                    max_date: new Date(this._max_date),
                    editor_id: this._edit_id,
                    lightbox_id: this._lightbox_id,
                    new_event: this._new_event,
                    select_id: this._select_id,
                    expanded: this.expanded,
                    drag_id: this._drag_id,
                    drag_mode: this._drag_mode
                }
            }, g._click = {
                dhx_cal_data: function(t) {
                    if (g._ignore_next_click) return t.preventDefault && t.preventDefault(), t.cancelBubble = !0, g._ignore_next_click = !1, !1;
                    var e = t ? t.target : event.srcElement,
                        i = g._locate_event(e);
                    if (t = t || event, i) {
                        if (!g.callEvent("onClick", [i, t]) || g.config.readonly) return
                    } else g.callEvent("onEmptyClick", [g.getActionData(t).date, t]);
                    if (i && g.config.select) {
                        g.select(i);
                        var n = g._getClassName(e); - 1 != n.indexOf("_icon") && g._click.buttons[n.split(" ")[1].replace("icon_", "")](i)
                    } else g._close_not_saved(), (new Date).valueOf() - (g._new_event || 0) > 500 && g.unselect()
                },
                dhx_cal_prev_button: function() {
                    g._click.dhx_cal_next_button(0, -1)
                },
                dhx_cal_next_button: function(t, e) {
                    var i = 1;
                    g.config.rtl && (e = -e, i = -i), g.setCurrentView(g.date.add(g.date[g._mode + "_start"](new Date(g._date)), e || i, g._mode))
                },
                dhx_cal_today_button: function() {
                    g.callEvent("onBeforeTodayDisplayed", []) && g.setCurrentView(g._currentDate())
                },
                dhx_cal_tab: function() {
                    var t = this.getAttribute("name"),
                        e = t.substring(0, t.search("_tab"));
                    g.setCurrentView(g._date, e)
                },
                buttons: {
                    delete: function(t) {
                        var e = g.locale.labels.confirm_deleting;
                        g._dhtmlx_confirm(e, g.locale.labels.title_confirm_deleting, function() {
                            g.deleteEvent(t)
                        })
                    },
                    edit: function(t) {
                        g.edit(t)
                    },
                    save: function(t) {
                        g.editStop(!0)
                    },
                    details: function(t) {
                        g.showLightbox(t)
                    },
                    cancel: function(t) {
                        g.editStop(!1)
                    }
                }
            }, g._dhtmlx_confirm = function(t, e, i) {
                if (!t) return i();
                var n = {
                    text: t
                };
                e && (n.title = e), i && (n.callback = function(t) {
                    t && i()
                }), dhtmlx.confirm(n)
            }, g.addEventNow = function(t, e, i) {
                var n = {};
                g._isObject(t) && !g._isDate(t) && (n = t, t = null);
                var a = 6e4 * (this.config.event_duration || this.config.time_step);
                t || (t = n.start_date || Math.round(g._currentDate().valueOf() / a) * a);
                var r = new Date(t);
                if (!e) {
                    var s = this.config.first_hour;
                    s > r.getHours() && (r.setHours(s), t = r.valueOf()), e = t.valueOf() + a
                }
                var o = new Date(e);
                r.valueOf() == o.valueOf() && o.setTime(o.valueOf() + a), n.start_date = n.start_date || r, n.end_date = n.end_date || o, n.text = n.text || this.locale.labels.new_event, n.id = this._drag_id = n.id || this.uid(), this._drag_mode = "new-size", this._loading = !0;
                var d = this.addEvent(n);
                return this.callEvent("onEventCreated", [this._drag_id, i]), this._loading = !1, this._drag_event = {}, this._on_mouse_up(i), d
            }, g._on_dbl_click = function(t, e) {
                if (e = e || t.target || t.srcElement, !this.config.readonly) {
                    var i = g._getClassName(e).split(" ")[0];
                    switch (i) {
                        case "dhx_scale_holder":
                        case "dhx_scale_holder_now":
                        case "dhx_month_body":
                        case "dhx_wa_day_data":
                            if (!g.config.dblclick_create) break;
                            this.addEventNow(this.getActionData(t).date, null, t);
                            break;
                        case "dhx_cal_event":
                        case "dhx_wa_ev_body":
                        case "dhx_agenda_line":
                        case "dhx_grid_event":
                        case "dhx_cal_event_line":
                        case "dhx_cal_event_clear":
                            var n = this._locate_event(e);
                            if (!this.callEvent("onDblClick", [n, t])) return;
                            this.config.details_on_dblclick || this._table_view || !this.getEvent(n)._timed || !this.config.select ? this.showLightbox(n) : this.edit(n);
                            break;
                        case "dhx_time_block":
                        case "dhx_cal_container":
                            return;
                        default:
                            var a = this["dblclick_" + i];
                            if (a) a.call(this, t);
                            else if (e.parentNode && e != this) return g._on_dbl_click(t, e.parentNode)
                    }
                }
            }, g._get_column_index = function(t) {
                var e = 0;
                if (this._cols) {
                    for (var i = 0, n = 0; i + this._cols[n] < t && n < this._cols.length;) i += this._cols[n], n++;
                    if (e = n + (this._cols[n] ? (t - i) / this._cols[n] : 0), this._ignores && e >= this._cols.length)
                        for (; e >= 1 && this._ignores[Math.floor(e)];) e--
                }
                return e
            }, g._week_indexes_from_pos = function(t) {
                if (this._cols) {
                    var e = this._get_column_index(t.x);
                    return t.x = Math.min(this._cols.length - 1, Math.max(0, Math.ceil(e) - 1)),
                        t.y = Math.max(0, Math.ceil(60 * t.y / (this.config.time_step * this.config.hour_size_px)) - 1) + this.config.first_hour * (60 / this.config.time_step), t
                }
                return t
            }, g._mouse_coords = function(t) {
                var e, i = document.body,
                    n = document.documentElement;
                e = this.$env.isIE || !t.pageX && !t.pageY ? {
                    x: t.clientX + (i.scrollLeft || n.scrollLeft || 0) - i.clientLeft,
                    y: t.clientY + (i.scrollTop || n.scrollTop || 0) - i.clientTop
                } : {
                    x: t.pageX,
                    y: t.pageY
                }, this.config.rtl && this._colsS ? (e.x = this.$container.querySelector(".dhx_cal_data").offsetWidth - e.x,
                    "month" !== this._mode && (e.x -= this.xy.scale_width)) : e.x -= this.$domHelpers.getAbsoluteLeft(this._obj) + (this._table_view ? 0 : this.xy.scale_width);
                var a = this.$container.querySelector(".dhx_cal_data");
                e.y -= this.$domHelpers.getAbsoluteTop(a) - this._els.dhx_cal_data[0].scrollTop, e.ev = t;
                var r = this["mouse_" + this._mode];
                if (r) e = r.call(this, e);
                else if (this._table_view) {
                    var s = this._get_column_index(e.x);
                    if (!this._cols || !this._colsS) return e;
                    var o = 0;
                    for (o = 1; o < this._colsS.heights.length && !(this._colsS.heights[o] > e.y); o++);
                    e.y = Math.ceil(24 * (Math.max(0, s) + 7 * Math.max(0, o - 1)) * 60 / this.config.time_step), (g._drag_mode || "month" == this._mode) && (e.y = 24 * (Math.max(0, Math.ceil(s) - 1) + 7 * Math.max(0, o - 1)) * 60 / this.config.time_step), "move" == this._drag_mode && g._ignores_detected && g.config.preserve_length && (e._ignores = !0,
                        this._drag_event._event_length || (this._drag_event._event_length = this._get_real_event_length(this._drag_event.start_date, this._drag_event.end_date, {
                            x_step: 1,
                            x_unit: "day"
                        }))), e.x = 0
                } else e = this._week_indexes_from_pos(e);
                return e.timestamp = +new Date, e
            }, g._close_not_saved = function() {
                if ((new Date).valueOf() - (g._new_event || 0) > 500 && g._edit_id) {
                    var t = g.locale.labels.confirm_closing;
                    g._dhtmlx_confirm(t, g.locale.labels.title_confirm_closing, function() {
                            g.editStop(g.config.positive_closing)
                        }),
                        t && (this._drag_id = this._drag_pos = this._drag_mode = null)
                }
            }, g._correct_shift = function(t, e) {
                return t -= 6e4 * (new Date(g._min_date).getTimezoneOffset() - new Date(t).getTimezoneOffset()) * (e ? -1 : 1)
            }, g._is_pos_changed = function(t, e) {
                function i(t, e, i) {
                    return !!(Math.abs(t - e) > i)
                }
                if (!t || !this._drag_pos) return !0;
                var n = 5;
                return !!(this._drag_pos.has_moved || !this._drag_pos.timestamp || e.timestamp - this._drag_pos.timestamp > 100 || i(t.ev.clientX, e.ev.clientX, n) || i(t.ev.clientY, e.ev.clientY, n))
            },
            g._correct_drag_start_date = function(t) {
                var e;
                g.matrix && (e = g.matrix[g._mode]), e = e || {
                    x_step: 1,
                    x_unit: "day"
                }, t = new Date(t);
                var i = 1;
                return (e._start_correction || e._end_correction) && (i = 60 * (e.last_hour || 0) - (60 * t.getHours() + t.getMinutes()) || 1), 1 * t + (g._get_fictional_event_length(t, i, e) - i)
            }, g._correct_drag_end_date = function(t, e) {
                var i;
                g.matrix && (i = g.matrix[g._mode]), i = i || {
                    x_step: 1,
                    x_unit: "day"
                };
                var n = 1 * t + g._get_fictional_event_length(t, e, i);
                return new Date(1 * n - (g._get_fictional_event_length(n, -1, i, -1) + 1))
            }, g._on_mouse_move = function(t) {
                if (this._drag_mode) {
                    var e = this._mouse_coords(t);
                    if (this._is_pos_changed(this._drag_pos, e)) {
                        var i, n;
                        if (this._edit_id != this._drag_id && this._close_not_saved(), !this._drag_mode) return;
                        var a = null;
                        if (this._drag_pos && !this._drag_pos.has_moved && (a = this._drag_pos, a.has_moved = !0), this._drag_pos = e, this._drag_pos.has_moved = !0, "create" == this._drag_mode) {
                            if (a && (e = a), this._close_not_saved(), this.unselect(this._select_id), this._loading = !0, i = this._get_date_from_pos(e).valueOf(),
                                !this._drag_start) {
                                return this.callEvent("onBeforeEventCreated", [t, this._drag_id]) ? (this._loading = !1, void(this._drag_start = i)) : void(this._loading = !1)
                            }
                            n = i, this._drag_start;
                            var r = new Date(this._drag_start),
                                s = new Date(n);
                            "day" != this._mode && "week" != this._mode || r.getHours() != s.getHours() || r.getMinutes() != s.getMinutes() || (s = new Date(this._drag_start + 1e3)), this._drag_id = this.uid(), this.addEvent(r, s, this.locale.labels.new_event, this._drag_id, e.fields), this.callEvent("onEventCreated", [this._drag_id, t]),
                                this._loading = !1, this._drag_mode = "new-size"
                        }
                        var o, d = this.config.time_step,
                            l = this.getEvent(this._drag_id);
                        if (g.matrix && (o = g.matrix[g._mode]), o = o || {
                                x_step: 1,
                                x_unit: "day"
                            }, "move" == this._drag_mode) i = this._min_date.valueOf() + 6e4 * (e.y * this.config.time_step + 24 * e.x * 60), !e.custom && this._table_view && (i += 1e3 * this.date.time_part(l.start_date)), !this._table_view && this._dragEventBody && void 0 === this._drag_event._move_event_shift && (this._drag_event._move_event_shift = i - l.start_date),
                            this._drag_event._move_event_shift && (i -= this._drag_event._move_event_shift), i = this._correct_shift(i), e._ignores && this.config.preserve_length && this._table_view ? (i = g._correct_drag_start_date(i), n = g._correct_drag_end_date(i, this._drag_event._event_length)) : n = l.end_date.valueOf() - (l.start_date.valueOf() - i);
                        else {
                            if (i = l.start_date.valueOf(), n = l.end_date.valueOf(), this._table_view) {
                                var _ = this._min_date.valueOf() + e.y * this.config.time_step * 6e4 + (e.custom ? 0 : 864e5);
                                if ("month" == this._mode)
                                    if (_ = this._correct_shift(_, !1), this._drag_from_start) {
                                        var h = 864e5;
                                        _ <= g.date.date_part(new Date(n + h - 1)).valueOf() && (i = _ - h)
                                    } else n = _;
                                else this.config.preserve_length ? e.resize_from_start ? i = g._correct_drag_start_date(_) : n = g._correct_drag_end_date(_, 0) : e.resize_from_start ? i = _ : n = _
                            } else {
                                var c = this.date.date_part(new Date(l.end_date.valueOf() - 1)).valueOf(),
                                    u = new Date(c),
                                    f = this.config.first_hour,
                                    v = this.config.last_hour,
                                    m = 60 / d * (v - f);
                                this.config.time_step = 1;
                                var p = this._mouse_coords(t);
                                this.config.time_step = d;
                                var x = e.y * d * 6e4,
                                    b = Math.min(e.y + 1, m) * d * 6e4,
                                    y = 6e4 * p.y;
                                n = Math.abs(x - y) > Math.abs(b - y) ? c + b : c + x, n += 6e4 * (new Date(n).getTimezoneOffset() - u.getTimezoneOffset()), this._els.dhx_cal_data[0].style.cursor = "s-resize", "week" != this._mode && "day" != this._mode || (n = this._correct_shift(n))
                            }
                            if ("new-size" == this._drag_mode)
                                if (n <= this._drag_start) {
                                    var w = e.shift || (this._table_view && !e.custom ? 864e5 : 0);
                                    i = n - (e.shift ? 0 : w), n = this._drag_start + (w || 6e4 * d)
                                } else i = this._drag_start;
                            else n <= i && (n = i + 6e4 * d)
                        }
                        var D = new Date(n - 1),
                            E = new Date(i);
                        if ("move" == this._drag_mode && g.config.limit_drag_out && (+E < +g._min_date || +n > +g._max_date)) {
                            if (+l.start_date < +g._min_date || +l.end_date > +g._max_date) E = new Date(l.start_date), n = new Date(l.end_date);
                            else {
                                var A = n - E; + E < +g._min_date ? (E = new Date(g._min_date), e._ignores && this.config.preserve_length && this._table_view ? (E = new Date(g._correct_drag_start_date(E)), o._start_correction && (E = new Date(E.valueOf() + o._start_correction)),
                                    n = new Date(1 * E + this._get_fictional_event_length(E, this._drag_event._event_length, o))) : n = new Date(+E + A)) : (n = new Date(g._max_date), e._ignores && this.config.preserve_length && this._table_view ? (o._end_correction && (n = new Date(n.valueOf() - o._end_correction)), n = new Date(1 * n - this._get_fictional_event_length(n, 0, o, !0)), E = new Date(1 * n - this._get_fictional_event_length(n, this._drag_event._event_length, o, !0)), this._ignores_detected && (E = g.date.add(E, o.x_step, o.x_unit),
                                    n = new Date(1 * n - this._get_fictional_event_length(n, 0, o, !0)), n = g.date.add(n, o.x_step, o.x_unit))) : E = new Date(+n - A))
                            }
                            var D = new Date(n - 1)
                        }
                        if (!this._table_view && this._dragEventBody && !g.config.all_timed && (!g._get_section_view() && e.x != this._get_event_sday({
                                start_date: new Date(i),
                                end_date: new Date(i)
                            }) || new Date(i).getHours() < this.config.first_hour)) {
                            var A = n - E;
                            if ("move" == this._drag_mode) {
                                var h = this._min_date.valueOf() + 24 * e.x * 60 * 6e4;
                                E = new Date(h), E.setHours(this.config.first_hour),
                                    n = new Date(E.valueOf() + A), D = new Date(n - 1)
                            }
                        }
                        if (!this._table_view && !g.config.all_timed && (!g.getView() && e.x != this._get_event_sday({
                                start_date: new Date(n),
                                end_date: new Date(n)
                            }) || new Date(n).getHours() >= this.config.last_hour)) {
                            var A = n - E,
                                h = this._min_date.valueOf() + 24 * e.x * 60 * 6e4;
                            n = g.date.date_part(new Date(h)), n.setHours(this.config.last_hour), D = new Date(n - 1), "move" == this._drag_mode && (E = new Date(+n - A))
                        }
                        if (this._table_view || D.getDate() == E.getDate() && D.getHours() < this.config.last_hour || g._allow_dnd)
                            if (l.start_date = E, l.end_date = new Date(n), this.config.update_render) {
                                var S = g._els.dhx_cal_data[0].scrollTop;
                                this.update_view(), g._els.dhx_cal_data[0].scrollTop = S
                            } else this.updateEvent(this._drag_id);
                        this._table_view && this.for_rendered(this._drag_id, function(t) {
                            t.className += " dhx_in_move dhx_cal_event_drag"
                        }), this.callEvent("onEventDrag", [this._drag_id, this._drag_mode, t])
                    }
                } else if (g.checkEvent("onMouseMove")) {
                    var k = this._locate_event(t.target || t.srcElement);
                    this.callEvent("onMouseMove", [k, t])
                }
            }, g._on_mouse_down = function(t, e) {
                if (2 != t.button && !this.config.readonly && !this._drag_mode) {
                    e = e || t.target || t.srcElement;
                    var i = g._getClassName(e).split(" ")[0];
                    switch (this.config.drag_event_body && "dhx_body" == i && e.parentNode && -1 === e.parentNode.className.indexOf("dhx_cal_select_menu") && (i = "dhx_event_move", this._dragEventBody = !0), i) {
                        case "dhx_cal_event_line":
                        case "dhx_cal_event_clear":
                            this._table_view && (this._drag_mode = "move");
                            break;
                        case "dhx_event_move":
                        case "dhx_wa_ev_body":
                            this._drag_mode = "move";
                            break;
                        case "dhx_event_resize":
                            this._drag_mode = "resize";
                            g._getClassName(e).indexOf("dhx_event_resize_end") < 0 ? g._drag_from_start = !0 : g._drag_from_start = !1;
                            break;
                        case "dhx_scale_holder":
                        case "dhx_scale_holder_now":
                        case "dhx_month_body":
                        case "dhx_matrix_cell":
                        case "dhx_marked_timespan":
                            this._drag_mode = "create";
                            break;
                        case "":
                            if (e.parentNode) return g._on_mouse_down(t, e.parentNode);
                            break;
                        default:
                            if ((!g.checkEvent("onMouseDown") || g.callEvent("onMouseDown", [i, t])) && e.parentNode && e != this && "dhx_body" != i) return g._on_mouse_down(t, e.parentNode);
                            this._drag_mode = null, this._drag_id = null
                    }
                    if (this._drag_mode) {
                        var n = this._locate_event(e);
                        if (this.config["drag_" + this._drag_mode] && this.callEvent("onBeforeDrag", [n, this._drag_mode, t])) {
                            if (this._drag_id = n,
                                (this._edit_id != this._drag_id || this._edit_id && "create" == this._drag_mode) && this._close_not_saved(), !this._drag_mode) return;
                            this._drag_event = g._lame_clone(this.getEvent(this._drag_id) || {}), this._drag_pos = this._mouse_coords(t)
                        } else this._drag_mode = this._drag_id = 0
                    }
                    this._drag_start = null
                }
            }, g._get_private_properties = function(t) {
                var e = {};
                for (var i in t) 0 === i.indexOf("_") && (e[i] = !0);
                return e
            }, g._clear_temporary_properties = function(t, e) {
                var i = this._get_private_properties(t),
                    n = this._get_private_properties(e);
                for (var a in n) i[a] || delete e[a]
            }, g._on_mouse_up = function(t) {
                if (!t || 2 != t.button || !this._mobile) {
                    if (this._drag_mode && this._drag_id) {
                        this._els.dhx_cal_data[0].style.cursor = "default";
                        var e = this._drag_id,
                            i = this._drag_mode,
                            n = !this._drag_pos || this._drag_pos.has_moved;
                        delete this._drag_event._move_event_shift;
                        var a = this.getEvent(this._drag_id);
                        if (n && (this._drag_event._dhx_changed || !this._drag_event.start_date || a.start_date.valueOf() != this._drag_event.start_date.valueOf() || a.end_date.valueOf() != this._drag_event.end_date.valueOf())) {
                            var r = "new-size" == this._drag_mode;
                            if (this.callEvent("onBeforeEventChanged", [a, t, r, this._drag_event]))
                                if (this._drag_id = this._drag_mode = null, r && this.config.edit_on_create) {
                                    if (this.unselect(), this._new_event = new Date,
                                        this._table_view || this.config.details_on_create || !this.config.select || !this.isOneDayEvent(this.getEvent(e))) return g.callEvent("onDragEnd", [e, i, t]), this.showLightbox(e);
                                    this._drag_pos = !0, this._select_id = this._edit_id = e
                                } else this._new_event || this.callEvent(r ? "onEventAdded" : "onEventChanged", [e, this.getEvent(e)]);
                            else r ? this.deleteEvent(a.id, !0) : (this._drag_event._dhx_changed = !1, this._clear_temporary_properties(a, this._drag_event), g._lame_copy(a, this._drag_event), this.updateEvent(a.id))
                        }
                        this._drag_pos && (this._drag_pos.has_moved || !0 === this._drag_pos) && (this._drag_id = this._drag_mode = null, this.render_view_data()), g.callEvent("onDragEnd", [e, i, t])
                    }
                    this._drag_id = null, this._drag_mode = null, this._drag_pos = null
                }
            }, g._trigger_dyn_loading = function() {
                return !(!this._load_mode || !this._load()) && (this._render_wait = !0, !0)
            }, g.update_view = function() {
                this._reset_ignores(), this._update_nav_bar(this.config.header, this.$container.querySelector(".dhx_cal_navline"));
                var t = this[this._mode + "_view"];
                if (t ? t.call(this, !0) : this._reset_scale(), this._trigger_dyn_loading()) return !0;
                this.render_view_data()
            }, g.isViewExists = function(t) {
                return !!(g[t + "_view"] || g.date[t + "_start"] && g.templates[t + "_date"] && g.templates[t + "_scale_date"])
            }, g._set_aria_buttons_attrs = function() {
                for (var t = ["dhx_cal_next_button", "dhx_cal_prev_button", "dhx_cal_tab", "dhx_cal_today_button"], e = 0; e < t.length; e++)
                    for (var i = this._els[t[e]], n = 0; i && n < i.length; n++) {
                        var a = i[n].getAttribute("name"),
                            r = this.locale.labels[t[e]];
                        a && (r = this.locale.labels[a] || r), "dhx_cal_next_button" == t[e] ? r = this.locale.labels.next : "dhx_cal_prev_button" == t[e] && (r = this.locale.labels.prev), this._waiAria.headerButtonsAttributes(i[n], r || "")
                    }
            }, g.updateView = function(t, e) {
                if (!this.$container) throw new Error("The scheduler is not initialized. \n **scheduler.updateView** or **scheduler.setCurrentView** can be called only after **scheduler.init**");
                t = t || this._date, e = e || this._mode;
                var i = "dhx_cal_data",
                    n = this._obj,
                    a = "dhx_scheduler_" + this._mode,
                    r = "dhx_scheduler_" + e;
                this._mode && -1 != n.className.indexOf(a) ? n.className = n.className.replace(a, r) : n.className += " " + r;
                var s, o = "dhx_multi_day",
                    d = !(this._mode != e || !this.config.preserve_scroll) && this._els[i][0].scrollTop;
                this._els[o] && this._els[o][0] && (s = this._els[o][0].scrollTop), this[this._mode + "_view"] && e && this._mode != e && this[this._mode + "_view"](!1), this._close_not_saved(),
                    this._els[o] && (this._els[o][0].parentNode.removeChild(this._els[o][0]), this._els[o] = null), this._mode = e, this._date = t, this._table_view = "month" == this._mode, this._dy_shift = 0, this.update_view(), this._set_aria_buttons_attrs();
                var l = this._els.dhx_cal_tab;
                if (l)
                    for (var _ = 0; _ < l.length; _++) {
                        var h = l[_];
                        h.getAttribute("name") == this._mode + "_tab" ? (h.classList.add("active"), this._waiAria.headerToggleState(h, !0)) : (h.classList.remove("active"), this._waiAria.headerToggleState(h, !1))
                    }
                "number" == typeof d && (this._els[i][0].scrollTop = d), "number" == typeof s && this._els[o] && this._els[o][0] && (this._els[o][0].scrollTop = s)
            }, g.setCurrentView = function(t, e) {
                this.callEvent("onBeforeViewChange", [this._mode, this._date, e || this._mode, t || this._date]) && (this.updateView(t, e), this.callEvent("onViewChange", [this._mode, this._date]))
            }, g.render = function(t, e) {
                g.setCurrentView(t, e)
            }, g._render_x_header = function(t, e, i, n, a) {
                a = a || 0;
                var r = document.createElement("div");
                r.className = "dhx_scale_bar",
                    this.templates[this._mode + "_scalex_class"] && (r.className += " " + this.templates[this._mode + "_scalex_class"](i));
                var s = this._cols[t] - 1;
                "month" == this._mode && 0 === t && this.config.left_border && (r.className += " dhx_scale_bar_border", e += 1), this.set_xy(r, s, this.xy.scale_height - 2, e, a);
                var o = this.templates[this._mode + "_scale_date"](i, this._mode);
                r.innerHTML = o, this._waiAria.dayHeaderAttr(r, o), n.appendChild(r)
            }, g._get_columns_num = function(t, e) {
                var i = 7;
                if (!g._table_view) {
                    var n = g.date["get_" + g._mode + "_end"];
                    n && (e = n(t)), i = Math.round((e.valueOf() - t.valueOf()) / 864e5)
                }
                return i
            }, g._get_timeunit_start = function() {
                return this.date[this._mode + "_start"](new Date(this._date.valueOf()))
            }, g._get_view_end = function() {
                var t = this._get_timeunit_start(),
                    e = g.date.add(t, 1, this._mode);
                if (!g._table_view) {
                    var i = g.date["get_" + g._mode + "_end"];
                    i && (e = i(t))
                }
                return e
            }, g._calc_scale_sizes = function(t, e, i) {
                var n = this.config.rtl,
                    a = t,
                    r = this._get_columns_num(e, i);
                this._process_ignores(e, r, "day", 1);
                for (var s = r - this._ignores_detected, o = 0; o < r; o++) this._ignores[o] ? (this._cols[o] = 0, s++) : this._cols[o] = Math.floor(a / (s - o)), a -= this._cols[o], this._colsS[o] = (this._cols[o - 1] || 0) + (this._colsS[o - 1] || (this._table_view ? 0 : (n ? this.xy.scroll_width : this.xy.scale_width) + 2));
                this._colsS.col_length = r, this._colsS[r] = this._cols[r - 1] + this._colsS[r - 1] || 0
            }, g._set_scale_col_size = function(t, e, i) {
                var n = this.config;
                this.set_xy(t, e - 1, n.hour_size_px * (n.last_hour - n.first_hour), i + this.xy.scale_width + 1, 0)
            },
            g._render_scales = function(t, e) {
                var i = new Date(g._min_date),
                    n = new Date(g._max_date),
                    a = this.date.date_part(g._currentDate()),
                    r = parseInt(t.style.width, 10),
                    s = new Date(this._min_date),
                    o = this._get_columns_num(i, n);
                this._calc_scale_sizes(r, i, n);
                var d = 0;
                t.innerHTML = "";
                for (var l = 0; l < o; l++) {
                    if (this._ignores[l] || this._render_x_header(l, d, s, t), !this._table_view) {
                        var _ = document.createElement("div"),
                            h = "dhx_scale_holder";
                        s.valueOf() == a.valueOf() && (h = "dhx_scale_holder_now"),
                            _.setAttribute("data-column-index", l), this._ignores_detected && this._ignores[l] && (h += " dhx_scale_ignore"), _.className = h + " " + this.templates.week_date_class(s, a), this._waiAria.dayColumnAttr(_, s), this._set_scale_col_size(_, this._cols[l], d), e.appendChild(_), this.callEvent("onScaleAdd", [_, s])
                    }
                    d += this._cols[l], s = this.date.add(s, 1, "day"), s = this.date.day_start(s)
                }
            }, g._getNavDateElement = function() {
                return this.$container.querySelector(".dhx_cal_date")
            }, g._reset_scale = function() {
                if (this.templates[this._mode + "_date"]) {
                    var t = this._els.dhx_cal_header[0],
                        e = this._els.dhx_cal_data[0],
                        i = this.config;
                    t.innerHTML = "", e.innerHTML = "";
                    var n = (i.readonly || !i.drag_resize ? " dhx_resize_denied" : "") + (i.readonly || !i.drag_move ? " dhx_move_denied" : "");
                    e.className = "dhx_cal_data" + n, this._scales = {}, this._cols = [], this._colsS = {
                        height: 0
                    }, this._dy_shift = 0, this.set_sizes();
                    var a, r, s = this._get_timeunit_start(),
                        o = g._get_view_end();
                    a = r = this._table_view ? g.date.week_start(s) : s, this._min_date = a;
                    var d = this.templates[this._mode + "_date"](s, o, this._mode),
                        l = this._getNavDateElement();
                    if (l && (l.innerHTML = d, this._waiAria.navBarDateAttr(l, d)), this._max_date = o, g._render_scales(t, e), this._table_view) this._reset_month_scale(e, s, r);
                    else if (this._reset_hours_scale(e, s, r), i.multi_day) {
                        var _ = "dhx_multi_day";
                        this._els[_] && (this._els[_][0].parentNode.removeChild(this._els[_][0]), this._els[_] = null);
                        var h = this._els.dhx_cal_navline[0],
                            c = h.offsetHeight + this._els.dhx_cal_header[0].offsetHeight + 1,
                            u = document.createElement("div");
                        u.className = _, u.style.visibility = "hidden";
                        var f = this._colsS[this._colsS.col_length],
                            v = i.rtl ? this.xy.scale_width : this.xy.scroll_width,
                            m = Math.max(f + v - 2, 0);
                        this.set_xy(u, m, 0, 0, c), e.parentNode.insertBefore(u, e);
                        var p = u.cloneNode(!0);
                        p.className = _ + "_icon", p.style.visibility = "hidden", this.set_xy(p, this.xy.scale_width, 0, 0, c), u.appendChild(p), this._els[_] = [u, p],
                            this._els[_][0].onclick = this._click.dhx_cal_data
                    }
                }
            }, g._reset_hours_scale = function(t, e, i) {
                var n = document.createElement("div");
                n.className = "dhx_scale_holder";
                for (var a = new Date(1980, 1, 1, this.config.first_hour, 0, 0), r = 1 * this.config.first_hour; r < this.config.last_hour; r++) {
                    var s = document.createElement("div");
                    s.className = "dhx_scale_hour", s.style.height = this.config.hour_size_px + "px";
                    var o = this.xy.scale_width;
                    this.config.left_border && (s.className += " dhx_scale_hour_border"), s.style.width = o + "px";
                    var d = g.templates.hour_scale(a);
                    s.innerHTML = d, this._waiAria.hourScaleAttr(s, d), n.appendChild(s), a = this.date.add(a, 1, "hour")
                }
                t.appendChild(n), this.config.scroll_hour && (t.scrollTop = this.config.hour_size_px * (this.config.scroll_hour - this.config.first_hour))
            }, g._currentDate = function() {
                return g.config.now_date ? new Date(g.config.now_date) : new Date
            }, g._reset_ignores = function() {
                this._ignores = {}, this._ignores_detected = 0
            }, g._process_ignores = function(t, e, i, n, a) {
                this._reset_ignores();
                var r = g["ignore_" + this._mode];
                if (r)
                    for (var s = new Date(t), o = 0; o < e; o++) r(s) && (this._ignores_detected += 1, this._ignores[o] = !0, a && e++), s = g.date.add(s, n, i), g.date[i + "_start"] && (s = g.date[i + "_start"](s))
            }, g._render_month_scale = function(t, e, i, n) {
                function a(t) {
                    var e = g._colsS.height;
                    return void 0 !== g._colsS.heights[t + 1] && (e = g._colsS.heights[t + 1] - (g._colsS.heights[t] || 0)), e
                }
                var r = g.date.add(e, 1, "month"),
                    s = new Date(i),
                    o = g._currentDate();
                this.date.date_part(o), this.date.date_part(i),
                    n = n || Math.ceil(Math.round((r.valueOf() - i.valueOf()) / 864e5) / 7);
                for (var d = [], l = 0; l <= 7; l++) {
                    var _ = (this._cols[l] || 0) - 1;
                    0 === l && this.config.left_border && (_ -= 1), d[l] = _ + "px"
                }
                var h = 0,
                    c = document.createElement("table");
                c.setAttribute("cellpadding", "0"), c.setAttribute("cellspacing", "0");
                var u = document.createElement("tbody");
                c.appendChild(u);
                for (var f = [], l = 0; l < n; l++) {
                    var v = document.createElement("tr");
                    u.appendChild(v);
                    for (var m = Math.max(a(l) - g.xy.month_head_height, 0), p = 0; p < 7; p++) {
                        var x = document.createElement("td");
                        v.appendChild(x);
                        var b = "";
                        i < e ? b = "dhx_before" : i >= r ? b = "dhx_after" : i.valueOf() == o.valueOf() && (b = "dhx_now"), this._ignores_detected && this._ignores[p] && (b += " dhx_scale_ignore"), x.className = b + " " + this.templates.month_date_class(i, o), x.setAttribute("data-cell-date", g.templates.format_date(i));
                        var y = "dhx_month_body",
                            w = "dhx_month_head";
                        if (0 === p && this.config.left_border && (y += " dhx_month_body_border", w += " dhx_month_head_border"),
                            this._ignores_detected && this._ignores[p]) x.appendChild(document.createElement("div")), x.appendChild(document.createElement("div"));
                        else {
                            this._waiAria.monthCellAttr(x, i);
                            var D = document.createElement("div");
                            D.className = w, D.innerHTML = this.templates.month_day(i), x.appendChild(D);
                            var E = document.createElement("div");
                            E.className = y, E.style.height = m + "px", E.style.width = d[p], x.appendChild(E)
                        }
                        f.push(i);
                        var A = i.getDate();
                        i = this.date.add(i, 1, "day"),
                            i.getDate() - A > 1 && (i = new Date(i.getFullYear(), i.getMonth(), A + 1, 12, 0))
                    }
                    g._colsS.heights[l] = h, h += a(l)
                }
                this._min_date = s, this._max_date = i, t.innerHTML = "", t.appendChild(c), this._scales = {};
                for (var S = t.getElementsByTagName("div"), l = 0; l < f.length; l++) {
                    var t = S[2 * l + 1],
                        k = f[l];
                    this._scales[+k] = t
                }
                for (var l = 0; l < f.length; l++) {
                    var k = f[l];
                    this.callEvent("onScaleAdd", [this._scales[+k], k])
                }
                return this._max_date
            }, g._reset_month_scale = function(t, e, i, n) {
                var a = g.date.add(e, 1, "month"),
                    r = g._currentDate();
                this.date.date_part(r), this.date.date_part(i), n = n || Math.ceil(Math.round((a.valueOf() - i.valueOf()) / 864e5) / 7);
                var s = Math.floor(t.clientHeight / n) - this.xy.month_head_height;
                return this._colsS.height = s + this.xy.month_head_height, this._colsS.heights = [], g._render_month_scale(t, e, i, n)
            }, g.getView = function(t) {
                return t || (t = g.getState().mode), g.matrix && g.matrix[t] ? g.matrix[t] : g._props && g._props[t] ? g._props[t] : null
            }, g.getLabel = function(t, e) {
                for (var i = this.config.lightbox.sections, n = 0; n < i.length; n++)
                    if (i[n].map_to == t)
                        for (var a = i[n].options, r = 0; r < a.length; r++)
                            if (a[r].key == e) return a[r].label;
                return ""
            }, g.updateCollection = function(t, e) {
                var i = g.serverList(t);
                return !!i && (i.splice(0, i.length), i.push.apply(i, e || []), g.callEvent("onOptionsLoad", []), g.resetLightbox(), g.hideCover(), !0)
            }, g._lame_clone = function(t, e) {
                var i, n, a;
                for (e = e || [], i = 0; i < e.length; i += 2)
                    if (t === e[i]) return e[i + 1];
                if (t && "object" == typeof t) {
                    for (a = Object.create(t),
                        n = [Array, Date, Number, String, Boolean], i = 0; i < n.length; i++) t instanceof n[i] && (a = i ? new n[i](t) : new n[i]);
                    e.push(t, a);
                    for (i in t) Object.prototype.hasOwnProperty.apply(t, [i]) && (a[i] = g._lame_clone(t[i], e))
                }
                return a || t
            }, g._lame_copy = function(t, e) {
                for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
                return t
            }, g._get_date_from_pos = function(t) {
                var e = this._min_date.valueOf() + 6e4 * (t.y * this.config.time_step + 24 * (this._table_view ? 0 : t.x) * 60);
                return new Date(this._correct_shift(e))
            }, g.getActionData = function(t) {
                var e = this._mouse_coords(t);
                return {
                    date: this._get_date_from_pos(e),
                    section: e.section
                }
            }, g._focus = function(t, e) {
                if (t && t.focus)
                    if (this._mobile) window.setTimeout(function() {
                        t.focus()
                    }, 10);
                    else try {
                        e && t.select && t.offsetWidth && t.select(), t.focus()
                    } catch (t) {}
            }, g._get_real_event_length = function(t, e, i) {
                var n, a = e - t,
                    r = i._start_correction + i._end_correction || 0,
                    s = this["ignore_" + this._mode],
                    o = 0;
                i.render ? (o = this._get_date_index(i, t), n = this._get_date_index(i, e)) : n = Math.round(a / 60 / 60 / 1e3 / 24);
                for (var d = !0; o < n;) {
                    var l = g.date.add(e, -i.x_step, i.x_unit);
                    s && s(e) && (!d || d && s(l)) ? a -= e - l : (d = !1, a -= r), e = l, n--
                }
                return a
            }, g._get_fictional_event_length = function(t, e, i, n) {
                var a = new Date(t),
                    r = n ? -1 : 1;
                if (i._start_correction || i._end_correction) {
                    var s;
                    s = n ? 60 * a.getHours() + a.getMinutes() - 60 * (i.first_hour || 0) : 60 * (i.last_hour || 0) - (60 * a.getHours() + a.getMinutes());
                    var o = 60 * (i.last_hour - i.first_hour),
                        d = Math.ceil((e / 6e4 - s) / o);
                    d < 0 && (d = 0), e += d * (1440 - o) * 60 * 1e3
                }
                var l, _ = new Date(1 * t + e * r),
                    h = this["ignore_" + this._mode],
                    c = 0;
                for (i.render ? (c = this._get_date_index(i, a), l = this._get_date_index(i, _)) : l = Math.round(e / 60 / 60 / 1e3 / 24); c * r <= l * r;) {
                    var u = g.date.add(a, i.x_step * r, i.x_unit);
                    h && h(a) && (e += (u - a) * r, l += r), a = u, c += r
                }
                return e
            }, g._get_section_view = function() {
                return this.getView()
            }, g._get_section_property = function() {
                return this.matrix && this.matrix[this._mode] ? this.matrix[this._mode].y_property : this._props && this._props[this._mode] ? this._props[this._mode].map_to : null
            }, g._is_initialized = function() {
                var t = this.getState();
                return this._obj && t.date && t.mode
            }, g._is_lightbox_open = function() {
                var t = this.getState();
                return null !== t.lightbox_id && void 0 !== t.lightbox_id
            }, g._getClassName = function(t) {
                if (!t) return "";
                var e = t.className || "";
                return e.baseVal && (e = e.baseVal), e.indexOf || (e = ""), e || ""
            }, g.event = function(t, e, i) {
                t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent && t.attachEvent("on" + e, i)
            }, g.eventRemove = function(t, e, i) {
                t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent && t.detachEvent("on" + e, i)
            },
            function() {
                function t(t) {
                    var e = !1,
                        i = !1;
                    if (window.getComputedStyle) {
                        var n = window.getComputedStyle(t, null);
                        e = n.display, i = n.visibility
                    } else t.currentStyle && (e = t.currentStyle.display, i = t.currentStyle.visibility);
                    var a = !1,
                        r = g._locate_css({
                            target: t
                        }, "dhx_form_repeat", !1);
                    return r && (a = !("0px" != r.style.height)), a = a || !t.offsetHeight, "none" != e && "hidden" != i && !a
                }

                function e(t) {
                    return !isNaN(t.getAttribute("tabindex")) && 1 * t.getAttribute("tabindex") >= 0
                }

                function i(t) {
                    return !{
                        a: !0,
                        area: !0
                    } [t.nodeName.loLowerCase()] || !!t.getAttribute("href")
                }

                function n(t) {
                    return !{
                        input: !0,
                        select: !0,
                        textarea: !0,
                        button: !0,
                        object: !0
                    } [t.nodeName.toLowerCase()] || !t.hasAttribute("disabled")
                }
                g._getFocusableNodes = function(a) {
                    for (var r = a.querySelectorAll(["a[href]", "area[href]", "input", "select", "textarea", "button", "iframe", "object", "embed", "[tabindex]", "[contenteditable]"].join(", ")), s = Array.prototype.slice.call(r, 0), o = 0; o < s.length; o++) s[o].$position = o;
                    s.sort(function(t, e) {
                        return 0 === t.tabIndex && 0 !== e.tabIndex ? 1 : 0 !== t.tabIndex && 0 === e.tabIndex ? -1 : t.tabIndex === e.tabIndex ? t.$position - e.$position : t.tabIndex < e.tabIndex ? -1 : 1
                    });
                    for (var o = 0; o < s.length; o++) {
                        var d = s[o];
                        (e(d) || n(d) || i(d)) && t(d) || (s.splice(o, 1), o--)
                    }
                    return s
                }
            }(), g._trim = function(t) {
                return (String.prototype.trim || function() {
                    return this.replace(/^\s+|\s+$/g, "")
                }).apply(t)
            }, g._isDate = function(t) {
                return !(!t || "object" != typeof t) && !!(t.getFullYear && t.getMonth && t.getDate)
            }, g._isObject = function(t) {
                return t && "object" == typeof t
            },
            function() {
                function t(t) {
                    return (t + "").replace(n, " ").replace(a, " ")
                }

                function e(t) {
                    return (t + "").replace(r, "&#39;")
                }

                function i() {
                    return !g.config.wai_aria_attributes
                }
                var n = new RegExp("<(?:.|\n)*?>", "gm"),
                    a = new RegExp(" +", "gm"),
                    r = new RegExp("'", "gm");
                g._waiAria = {
                    getAttributeString: function(i) {
                        var n = [" "];
                        for (var a in i)
                            if ("function" != typeof i[a] && "object" != typeof i[a]) {
                                var r = e(t(i[a]));
                                n.push(a + "='" + r + "'")
                            } return n.push(" "), n.join(" ")
                    },
                    setAttributes: function(e, i) {
                        for (var n in i) e.setAttribute(n, t(i[n]));
                        return e
                    },
                    labelAttr: function(t, e) {
                        return this.setAttributes(t, {
                            "aria-label": e
                        })
                    },
                    label: function(t) {
                        return g._waiAria.getAttributeString({
                            "aria-label": t
                        })
                    },
                    hourScaleAttr: function(t, e) {
                        this.labelAttr(t, e)
                    },
                    monthCellAttr: function(t, e) {
                        this.labelAttr(t, g.templates.day_date(e))
                    },
                    navBarDateAttr: function(t, e) {
                        this.labelAttr(t, e)
                    },
                    dayHeaderAttr: function(t, e) {
                        this.labelAttr(t, e)
                    },
                    dayColumnAttr: function(t, e) {
                        this.dayHeaderAttr(t, g.templates.day_date(e))
                    },
                    headerButtonsAttributes: function(t, e) {
                        return this.setAttributes(t, {
                            role: "button",
                            "aria-label": e
                        })
                    },
                    headerToggleState: function(t, e) {
                        return this.setAttributes(t, {
                            "aria-pressed": e ? "true" : "false"
                        })
                    },
                    getHeaderCellAttr: function(t) {
                        return g._waiAria.getAttributeString({
                            "aria-label": t
                        })
                    },
                    eventAttr: function(t, e) {
                        this._eventCommonAttr(t, e)
                    },
                    _eventCommonAttr: function(e, i) {
                        i.setAttribute("aria-label", t(g.templates.event_text(e.start_date, e.end_date, e))), g.config.readonly && i.setAttribute("aria-readonly", !0),
                            e.$dataprocessor_class && i.setAttribute("aria-busy", !0), i.setAttribute("aria-selected", g.getState().select_id == e.id ? "true" : "false")
                    },
                    setEventBarAttr: function(t, e) {
                        this._eventCommonAttr(t, e)
                    },
                    _getAttributes: function(t, e) {
                        var i = {
                            setAttribute: function(t, e) {
                                this[t] = e
                            }
                        };
                        return t.apply(this, [e, i]), i
                    },
                    eventBarAttrString: function(t) {
                        return this.getAttributeString(this._getAttributes(this.setEventBarAttr, t))
                    },
                    agendaHeadAttrString: function() {
                        return this.getAttributeString({
                            role: "row"
                        })
                    },
                    agendaHeadDateString: function(t) {
                        return this.getAttributeString({
                            role: "columnheader",
                            "aria-label": t
                        })
                    },
                    agendaHeadDescriptionString: function(t) {
                        return this.agendaHeadDateString(t)
                    },
                    agendaDataAttrString: function() {
                        return this.getAttributeString({
                            role: "grid"
                        })
                    },
                    agendaEventAttrString: function(t) {
                        var e = this._getAttributes(this._eventCommonAttr, t);
                        return e.role = "row", this.getAttributeString(e)
                    },
                    agendaDetailsBtnString: function() {
                        return this.getAttributeString({
                            role: "button",
                            "aria-label": g.locale.labels.icon_details
                        })
                    },
                    gridAttrString: function() {
                        return this.getAttributeString({
                            role: "grid"
                        })
                    },
                    gridRowAttrString: function(t) {
                        return this.agendaEventAttrString(t)
                    },
                    gridCellAttrString: function(t, e, i) {
                        return this.getAttributeString({
                            role: "gridcell",
                            "aria-label": [void 0 === e.label ? e.id : e.label, ": ", i]
                        })
                    },
                    mapAttrString: function() {
                        return this.gridAttrString()
                    },
                    mapRowAttrString: function(t) {
                        return this.gridRowAttrString(t)
                    },
                    mapDetailsBtnString: function() {
                        return this.agendaDetailsBtnString()
                    },
                    minicalHeader: function(t, e) {
                        this.setAttributes(t, {
                            id: e + "",
                            "aria-live": "assertice",
                            "aria-atomic": "true"
                        })
                    },
                    minicalGrid: function(t, e) {
                        this.setAttributes(t, {
                            "aria-labelledby": e + "",
                            role: "grid"
                        })
                    },
                    minicalRow: function(t) {
                        this.setAttributes(t, {
                            role: "row"
                        })
                    },
                    minicalDayCell: function(t, e) {
                        var i = e.valueOf() < g._max_date.valueOf() && e.valueOf() >= g._min_date.valueOf();
                        this.setAttributes(t, {
                            role: "gridcell",
                            "aria-label": g.templates.day_date(e),
                            "aria-selected": i ? "true" : "false"
                        })
                    },
                    minicalHeadCell: function(t) {
                        this.setAttributes(t, {
                            role: "columnheader"
                        })
                    },
                    weekAgendaDayCell: function(t, e) {
                        var i = t.querySelector(".dhx_wa_scale_bar"),
                            n = t.querySelector(".dhx_wa_day_data"),
                            a = g.uid() + "";
                        this.setAttributes(i, {
                            id: a
                        }), this.setAttributes(n, {
                            "aria-labelledby": a
                        })
                    },
                    weekAgendaEvent: function(t, e) {
                        this.eventAttr(e, t)
                    },
                    lightboxHiddenAttr: function(t) {
                        t.setAttribute("aria-hidden", "true")
                    },
                    lightboxVisibleAttr: function(t) {
                        t.setAttribute("aria-hidden", "false")
                    },
                    lightboxSectionButtonAttrString: function(t) {
                        return this.getAttributeString({
                            role: "button",
                            "aria-label": t,
                            tabindex: "0"
                        })
                    },
                    yearHeader: function(t, e) {
                        this.setAttributes(t, {
                            id: e + ""
                        })
                    },
                    yearGrid: function(t, e) {
                        this.minicalGrid(t, e)
                    },
                    yearHeadCell: function(t) {
                        return this.minicalHeadCell(t)
                    },
                    yearRow: function(t) {
                        return this.minicalRow(t)
                    },
                    yearDayCell: function(t) {
                        this.setAttributes(t, {
                            role: "gridcell"
                        })
                    },
                    lightboxAttr: function(t) {
                        t.setAttribute("role", "dialog"), t.setAttribute("aria-hidden", "true"),
                            t.firstChild.setAttribute("role", "heading")
                    },
                    lightboxButtonAttrString: function(t) {
                        return this.getAttributeString({
                            role: "button",
                            "aria-label": g.locale.labels[t],
                            tabindex: "0"
                        })
                    },
                    eventMenuAttrString: function(t) {
                        return this.getAttributeString({
                            role: "button",
                            "aria-label": g.locale.labels[t]
                        })
                    },
                    lightboxHeader: function(t, e) {
                        t.setAttribute("aria-label", e)
                    },
                    lightboxSelectAttrString: function(t) {
                        var e = "";
                        switch (t) {
                            case "%Y":
                                e = g.locale.labels.year;
                                break;
                            case "%m":
                                e = g.locale.labels.month;
                                break;
                            case "%d":
                                e = g.locale.labels.day;
                                break;
                            case "%H:%i":
                                e = g.locale.labels.hour + " " + g.locale.labels.minute
                        }
                        return g._waiAria.getAttributeString({
                            "aria-label": e
                        })
                    },
                    messageButtonAttrString: function(t) {
                        return "tabindex='0' role='button' aria-label='" + t + "'"
                    },
                    messageInfoAttr: function(t) {
                        t.setAttribute("role", "alert")
                    },
                    messageModalAttr: function(t, e) {
                        t.setAttribute("role", "dialog"), e && t.setAttribute("aria-labelledby", e)
                    },
                    quickInfoAttr: function(t) {
                        t.setAttribute("role", "dialog")
                    },
                    quickInfoHeaderAttrString: function() {
                        return " role='heading' "
                    },
                    quickInfoHeader: function(t, e) {
                        t.setAttribute("aria-label", e)
                    },
                    quickInfoButtonAttrString: function(t) {
                        return g._waiAria.getAttributeString({
                            role: "button",
                            "aria-label": t,
                            tabindex: "0"
                        })
                    },
                    tooltipAttr: function(t) {
                        t.setAttribute("role", "tooltip")
                    },
                    tooltipVisibleAttr: function(t) {
                        t.setAttribute("aria-hidden", "false")
                    },
                    tooltipHiddenAttr: function(t) {
                        t.setAttribute("aria-hidden", "true")
                    }
                };
                for (var s in g._waiAria) g._waiAria[s] = function(t) {
                    return function() {
                        return i() ? " " : t.apply(this, arguments)
                    }
                }(g._waiAria[s])
            }(), g.utils = {
                mixin: function(t, e, i) {
                    for (var n in e)(void 0 === t[n] || i) && (t[n] = e[n]);
                    return t
                },
                copy: function t(e) {
                    var i, n;
                    if (e && "object" == typeof e) switch (!0) {
                        case h(e):
                            n = new Date(e);
                            break;
                        case o(e):
                            for (n = new Array(e.length), i = 0; i < e.length; i++) n[i] = t(e[i]);
                            break;
                        case d(e):
                            n = new String(e);
                            break;
                        case l(e):
                            n = new Number(e);
                            break;
                        case _(e):
                            n = new Boolean(e);
                            break;
                        default:
                            n = {};
                            for (i in e) Object.prototype.hasOwnProperty.apply(e, [i]) && (n[i] = t(e[i]))
                    }
                    return n || e
                }
            }, g.$domHelpers = {
                getAbsoluteLeft: function(t) {
                    return this.getOffset(t).left
                },
                getAbsoluteTop: function(t) {
                    return this.getOffset(t).top
                },
                getOffsetSum: function(t) {
                    for (var e = 0, i = 0; t;) e += parseInt(t.offsetTop), i += parseInt(t.offsetLeft), t = t.offsetParent;
                    return {
                        top: e,
                        left: i
                    }
                },
                getOffsetRect: function(t) {
                    var e = t.getBoundingClientRect(),
                        i = 0,
                        n = 0;
                    if (/Mobi/.test(navigator.userAgent)) {
                        var a = document.createElement("div");
                        a.style.position = "absolute", a.style.left = "0px", a.style.top = "0px",
                            a.style.width = "1px", a.style.height = "1px", document.body.appendChild(a);
                        var r = a.getBoundingClientRect();
                        i = e.top - r.top, n = e.left - r.left, a.parentNode.removeChild(a)
                    } else {
                        var s = document.body,
                            o = document.documentElement,
                            d = window.pageYOffset || o.scrollTop || s.scrollTop,
                            l = window.pageXOffset || o.scrollLeft || s.scrollLeft,
                            _ = o.clientTop || s.clientTop || 0,
                            h = o.clientLeft || s.clientLeft || 0;
                        i = e.top + d - _, n = e.left + l - h
                    }
                    return {
                        top: Math.round(i),
                        left: Math.round(n)
                    }
                },
                getOffset: function(t) {
                    return t.getBoundingClientRect ? this.getOffsetRect(t) : this.getOffsetSum(t)
                },
                closest: function(t, e) {
                    return t && e ? w(t, e) : null
                },
                insertAfter: function(t, e) {
                    e.nextSibling ? e.parentNode.insertBefore(t, e.nextSibling) : e.parentNode.appendChild(t)
                }
            };
        var w;
        if (Element.prototype.closest) w = function(t, e) {
            return t.closest(e)
        };
        else {
            var D = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
            w = function(t, e) {
                var i = t;
                do {
                    if (D.call(i, e)) return i;
                    i = i.parentElement || i.parentNode
                } while (null !== i && 1 === i.nodeType);
                return null
            }
        }
        g.$env = {
            isIE: navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0,
            isIE6: !window.XMLHttpRequest && navigator.userAgent.indexOf("MSIE") >= 0,
            isIE7: navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent.indexOf("Trident") < 0,
            isIE8: navigator.userAgent.indexOf("MSIE 8.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0,
            isOpera: navigator.userAgent.indexOf("Opera") >= 0,
            isChrome: navigator.userAgent.indexOf("Chrome") >= 0,
            isKHTML: navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Konqueror") >= 0,
            isFF: navigator.userAgent.indexOf("Firefox") >= 0,
            isIPad: navigator.userAgent.search(/iPad/gi) >= 0,
            isEdge: -1 != navigator.userAgent.indexOf("Edge")
        }, g.$ajax = {
            _obj: g,
            cache: !0,
            method: "get",
            parse: function(t) {
                if ("string" != typeof t) return t;
                var e;
                return t = t.replace(/^[\s]+/, ""),
                    window.DOMParser && !g.$env.isIE ? e = (new window.DOMParser).parseFromString(t, "text/xml") : window.ActiveXObject !== window.undefined && (e = new window.ActiveXObject("Microsoft.XMLDOM"), e.async = "false", e.loadXML(t)), e
            },
            xmltop: function(t, e, i) {
                if (void 0 === e.status || e.status < 400) {
                    var n = e.responseXML ? e.responseXML || e : this.parse(e.responseText || e);
                    if (n && null !== n.documentElement && !n.getElementsByTagName("parsererror").length) return n.getElementsByTagName(t)[0]
                }
                return -1 !== i && this._obj.callEvent("onLoadXMLError", ["Incorrect XML", arguments[1], i]), document.createElement("DIV")
            },
            xpath: function(t, e) {
                if (e.nodeName || (e = e.responseXML || e), g.$env.isIE) return e.selectNodes(t) || [];
                for (var i, n = [], a = (e.ownerDocument || e).evaluate(t, e, null, XPathResult.ANY_TYPE, null);;) {
                    if (!(i = a.iterateNext())) break;
                    n.push(i)
                }
                return n
            },
            query: function(t) {
                this._call(t.method || "GET", t.url, t.data || "", t.async || !0, t.callback, null, t.headers)
            },
            get: function(t, e) {
                this._call("GET", t, null, !0, e)
            },
            getSync: function(t) {
                return this._call("GET", t, null, !1)
            },
            put: function(t, e, i) {
                this._call("PUT", t, e, !0, i)
            },
            del: function(t, e, i) {
                this._call("DELETE", t, e, !0, i)
            },
            post: function(t, e, i) {
                1 == arguments.length ? e = "" : 2 != arguments.length || "function" != typeof e && "function" != typeof window[e] ? e = String(e) : (i = e, e = ""), this._call("POST", t, e, !0, i)
            },
            postSync: function(t, e) {
                return e = null === e ? "" : String(e), this._call("POST", t, e, !1)
            },
            getLong: function(t, e) {
                this._call("GET", t, null, !0, e, {
                    url: t
                })
            },
            postLong: function(t, e, i) {
                2 != arguments.length || "function" != typeof e && (window[e], 0) || (i = e, e = ""), this._call("POST", t, e, !0, i, {
                    url: t,
                    postData: e
                })
            },
            _call: function(t, e, i, n, a, r, s) {
                var o = this._obj,
                    d = window.XMLHttpRequest && !o.$env.isIE ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"),
                    l = null !== navigator.userAgent.match(/AppleWebKit/) && null !== navigator.userAgent.match(/Qt/) && null !== navigator.userAgent.match(/Safari/);
                if (n && (d.onreadystatechange = function() {
                        if (4 == d.readyState || l && 3 == d.readyState) {
                            if ((200 != d.status || "" === d.responseText) && !o.callEvent("onAjaxError", [d])) return;
                            window.setTimeout(function() {
                                "function" == typeof a && a.apply(window, [{
                                    xmlDoc: d,
                                    filePath: e
                                }]), r && (void 0 !== r.postData ? this.postLong(r.url, r.postData, a) : this.getLong(r.url, a)), a = null, d = null
                            }, 1)
                        }
                    }), "GET" != t || this.cache || (e += (e.indexOf("?") >= 0 ? "&" : "?") + "dhxr" + (new Date).getTime() + "=1"), d.open(t, e, n),
                    s)
                    for (var _ in s) d.setRequestHeader(_, s[_]);
                else "POST" == t.toUpperCase() || "PUT" == t || "DELETE" == t ? d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded") : "GET" == t && (i = null);
                if (d.setRequestHeader("X-Requested-With", "XMLHttpRequest"), d.send(i), !n) return {
                    xmlDoc: d,
                    filePath: e
                }
            },
            urlSeparator: function(t) {
                return -1 != t.indexOf("?") ? "&" : "?"
            }
        };
        var E = function(t, e) {
            for (var i = "var temp=date.match(/[a-zA-Z]+|[0-9]+/g);", n = t.match(/%[a-zA-Z]/g), a = 0; a < n.length; a++) switch (n[a]) {
                case "%j":
                case "%d":
                    i += "set[2]=temp[" + a + "]||1;";
                    break;
                case "%n":
                case "%m":
                    i += "set[1]=(temp[" + a + "]||1)-1;";
                    break;
                case "%y":
                    i += "set[0]=temp[" + a + "]*1+(temp[" + a + "]>50?1900:2000);";
                    break;
                case "%g":
                case "%G":
                case "%h":
                case "%H":
                    i += "set[3]=temp[" + a + "]||0;";
                    break;
                case "%i":
                    i += "set[4]=temp[" + a + "]||0;";
                    break;
                case "%Y":
                    i += "set[0]=temp[" + a + "]||0;";
                    break;
                case "%a":
                case "%A":
                    i += "set[3]=set[3]%12+((temp[" + a + "]||'').toLowerCase()=='am'?0:12);";
                    break;
                case "%s":
                    i += "set[5]=temp[" + a + "]||0;";
                    break;
                case "%M":
                    i += "set[1]=this.locale.date.month_short_hash[temp[" + a + "]]||0;";
                    break;
                case "%F":
                    i += "set[1]=this.locale.date.month_full_hash[temp[" + a + "]]||0;"
            }
            var r = "set[0],set[1],set[2],set[3],set[4],set[5]";
            return e && (r = " Date.UTC(" + r + ")"), new Function("date", "var set=[0,0,1,0,0,0]; " + i + " return new Date(" + r + ");")
        };
        g.date = {
                init: function() {
                    for (var t = g.locale.date.month_short, e = g.locale.date.month_short_hash = {}, i = 0; i < t.length; i++) e[t[i]] = i;
                    for (var t = g.locale.date.month_full, e = g.locale.date.month_full_hash = {}, i = 0; i < t.length; i++) e[t[i]] = i
                },
                _bind_host_object: function(t) {
                    return t.bind ? t.bind(g) : function() {
                        return t.apply(g, arguments)
                    }
                },
                date_part: function(t) {
                    var e = new Date(t);
                    return t.setHours(0), t.setMinutes(0), t.setSeconds(0), t.setMilliseconds(0), t.getHours() && (t.getDate() < e.getDate() || t.getMonth() < e.getMonth() || t.getFullYear() < e.getFullYear()) && t.setTime(t.getTime() + 36e5 * (24 - t.getHours())), t
                },
                time_part: function(t) {
                    return (t.valueOf() / 1e3 - 60 * t.getTimezoneOffset()) % 86400
                },
                week_start: function(t) {
                    var e = t.getDay();
                    return g.config.start_on_monday && (0 === e ? e = 6 : e--), this.date_part(this.add(t, -1 * e, "day"))
                },
                month_start: function(t) {
                    return t.setDate(1), this.date_part(t)
                },
                year_start: function(t) {
                    return t.setMonth(0), this.month_start(t)
                },
                day_start: function(t) {
                    return this.date_part(t)
                },
                _add_days: function(t, e) {
                    var i = new Date(t.valueOf());
                    if (i.setDate(i.getDate() + e), e == Math.round(e) && e > 0) {
                        var n = +i - +t,
                            a = n % 864e5;
                        if (a && t.getTimezoneOffset() == i.getTimezoneOffset()) {
                            var r = a / 36e5;
                            i.setTime(i.getTime() + 60 * (24 - r) * 60 * 1e3)
                        }
                    }
                    return e >= 0 && !t.getHours() && i.getHours() && (i.getDate() < t.getDate() || i.getMonth() < t.getMonth() || i.getFullYear() < t.getFullYear()) && i.setTime(i.getTime() + 36e5 * (24 - i.getHours())), i
                },
                add: function(t, e, i) {
                    var n = new Date(t.valueOf());
                    switch (i) {
                        case "day":
                            n = g.date._add_days(n, e);
                            break;
                        case "week":
                            n = g.date._add_days(n, 7 * e);
                            break;
                        case "month":
                            n.setMonth(n.getMonth() + e);
                            break;
                        case "year":
                            n.setYear(n.getFullYear() + e);
                            break;
                        case "hour":
                            n.setTime(n.getTime() + 60 * e * 60 * 1e3);
                            break;
                        case "minute":
                            n.setTime(n.getTime() + 60 * e * 1e3);
                            break;
                        default:
                            return g.date["add_" + i](t, e, i)
                    }
                    return n
                },
                to_fixed: function(t) {
                    return t < 10 ? "0" + t : t
                },
                copy: function(t) {
                    return new Date(t.valueOf())
                },
                date_to_str: function(t, e) {
                    t = t.replace(/%[a-zA-Z]/g, function(t) {
                        switch (t) {
                            case "%d":
                                return '"+this.date.to_fixed(date.getDate())+"';
                            case "%m":
                                return '"+this.date.to_fixed((date.getMonth()+1))+"';
                            case "%j":
                                return '"+date.getDate()+"';
                            case "%n":
                                return '"+(date.getMonth()+1)+"';
                            case "%y":
                                return '"+this.date.to_fixed(date.getFullYear()%100)+"';
                            case "%Y":
                                return '"+date.getFullYear()+"';
                            case "%D":
                                return '"+this.locale.date.day_short[date.getDay()]+"';
                            case "%l":
                                return '"+this.locale.date.day_full[date.getDay()]+"';
                            case "%M":
                                return '"+this.locale.date.month_short[date.getMonth()]+"';
                            case "%F":
                                return '"+this.locale.date.month_full[date.getMonth()]+"';
                            case "%h":
                                return '"+this.date.to_fixed((date.getHours()+11)%12+1)+"';
                            case "%g":
                                return '"+((date.getHours()+11)%12+1)+"';
                            case "%G":
                                return '"+date.getHours()+"';
                            case "%H":
                                return '"+this.date.to_fixed(date.getHours())+"';
                            case "%i":
                                return '"+this.date.to_fixed(date.getMinutes())+"';
                            case "%a":
                                return '"+(date.getHours()>11?"pm":"am")+"';
                            case "%A":
                                return '"+(date.getHours()>11?"PM":"AM")+"';
                            case "%s":
                                return '"+this.date.to_fixed(date.getSeconds())+"';
                            case "%W":
                                return '"+this.date.to_fixed(this.date.getISOWeek(date))+"';
                            default:
                                return t
                        }
                    }), e && (t = t.replace(/date\.get/g, "date.getUTC"));
                    var i = new Function("date", 'return "' + t + '";');
                    return g.date._bind_host_object(i)
                },
                str_to_date: function(t, e, i) {
                    var n = E(t, e),
                        a = /^[0-9]{4}(\-|\/)[0-9]{2}(\-|\/)[0-9]{2} ?(([0-9]{1,2}:[0-9]{1,2})(:[0-9]{1,2})?)?$/,
                        r = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4} ?(([0-9]{1,2}:[0-9]{2})(:[0-9]{1,2})?)?$/,
                        s = /^[0-9]{2}\-[0-9]{2}\-[0-9]{4} ?(([0-9]{1,2}:[0-9]{1,2})(:[0-9]{1,2})?)?$/,
                        o = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/,
                        d = function(t) {
                            return a.test(String(t))
                        },
                        l = function(t) {
                            return r.test(String(t))
                        },
                        _ = function(t) {
                            return s.test(String(t))
                        },
                        h = function(t) {
                            return o.test(t)
                        },
                        c = E("%Y-%m-%d %H:%i:%s", e),
                        u = E("%m/%d/%Y %H:%i:%s", e),
                        f = E("%d-%m-%Y %H:%i:%s", e);
                    return function(t) {
                        if (!i && !g.config.parse_exact_format) {
                            if (t && t.getISOWeek) return new Date(t);
                            if ("number" == typeof t) return new Date(t);
                            if (d(t)) return c(t);
                            if (l(t)) return u(t);
                            if (_(t)) return f(t);
                            if (h(t)) return new Date(t)
                        }
                        return n.call(g, t)
                    }
                },
                getISOWeek: function(t) {
                    if (!t) return !1;
                    t = this.date_part(new Date(t));
                    var e = t.getDay();
                    0 === e && (e = 7);
                    var i = new Date(t.valueOf());
                    i.setDate(t.getDate() + (4 - e));
                    var n = i.getFullYear(),
                        a = Math.round((i.getTime() - new Date(n, 0, 1).getTime()) / 864e5);
                    return 1 + Math.floor(a / 7)
                },
                getUTCISOWeek: function(t) {
                    return this.getISOWeek(this.convert_to_utc(t))
                },
                convert_to_utc: function(t) {
                    return new Date(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate(), t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds())
                }
            }, g.locale = {
                date: {
                    month_full: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    month_short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    day_full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                },
                labels: {
                    dhx_cal_today_button: "Today",
                    day_tab: "Day",
                    week_tab: "Week",
                    month_tab: "Month",
                    new_event: "New event",
                    icon_save: "Save",
                    icon_cancel: "Cancel",
                    icon_details: "Details",
                    icon_edit: "Edit",
                    icon_delete: "Delete",
                    confirm_closing: "",
                    confirm_deleting: "Event will be deleted permanently, are you sure?",
                    section_description: "Description",
                    section_time: "Time period",
                    full_day: "Full day",
                    confirm_recurring: "Do you want to edit the whole set of repeated events?",
                    section_recurring: "Repeat event",
                    button_recurring: "Disabled",
                    button_recurring_open: "Enabled",
                    button_edit_series: "Edit series",
                    button_edit_occurrence: "Edit occurrence",
                    agenda_tab: "Agenda",
                    date: "Date",
                    description: "Description",
                    year_tab: "Year",
                    week_agenda_tab: "Agenda",
                    grid_tab: "Grid",
                    drag_to_create: "Drag to create",
                    drag_to_move: "Drag to move",
                    message_ok: "OK",
                    message_cancel: "Cancel",
                    next: "Next",
                    prev: "Previous",
                    year: "Year",
                    month: "Month",
                    day: "Day",
                    hour: "Hour",
                    minute: "Minute",
                    repeat_radio_day: "Daily",
                    repeat_radio_week: "Weekly",
                    repeat_radio_month: "Monthly",
                    repeat_radio_year: "Yearly",
                    repeat_radio_day_type: "Every",
                    repeat_text_day_count: "day",
                    repeat_radio_day_type2: "Every workday",
                    repeat_week: " Repeat every",
                    repeat_text_week_count: "week next days:",
                    repeat_radio_month_type: "Repeat",
                    repeat_radio_month_start: "On",
                    repeat_text_month_day: "day every",
                    repeat_text_month_count: "month",
                    repeat_text_month_count2_before: "every",
                    repeat_text_month_count2_after: "month",
                    repeat_year_label: "On",
                    select_year_day2: "of",
                    repeat_text_year_day: "day",
                    select_year_month: "month",
                    repeat_radio_end: "No end date",
                    repeat_text_occurences_count: "occurrences",
                    repeat_radio_end2: "After",
                    repeat_radio_end3: "End by",
                    month_for_recurring: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    day_for_recurring: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                }
            }, g.config = {
                default_date: "%j %M %Y",
                month_date: "%F %Y",
                load_date: "%Y-%m-%d",
                week_date: "%l",
                day_date: "%D, %F %j",
                hour_date: "%H:%i",
                month_day: "%d",
                date_format: "%Y-%m-%d %H:%i",
                api_date: "%d-%m-%Y %H:%i",
                parse_exact_format: !1,
                preserve_length: !0,
                time_step: 5,
                start_on_monday: !0,
                first_hour: 0,
                last_hour: 24,
                readonly: !1,
                drag_resize: !0,
                drag_move: !0,
                drag_create: !0,
                drag_event_body: !0,
                dblclick_create: !0,
                edit_on_create: !0,
                details_on_create: !1,
                header: null,
                resize_month_events: !1,
                resize_month_timed: !1,
                responsive_lightbox: !1,
                rtl: !1,
                cascade_event_display: !1,
                cascade_event_count: 4,
                cascade_event_margin: 30,
                multi_day: !0,
                multi_day_height_limit: 0,
                drag_lightbox: !0,
                preserve_scroll: !0,
                select: !0,
                server_utc: !1,
                touch: !0,
                touch_tip: !0,
                touch_drag: 500,
                touch_swipe_dates: !1,
                quick_info_detached: !0,
                positive_closing: !1,
                drag_highlight: !0,
                limit_drag_out: !1,
                icons_edit: ["icon_save", "icon_cancel"],
                icons_select: ["icon_details", "icon_edit", "icon_delete"],
                buttons_left: ["dhx_save_btn", "dhx_cancel_btn"],
                buttons_right: ["dhx_delete_btn"],
                lightbox: {
                    sections: [{
                        name: "description",
                        map_to: "text",
                        type: "textarea",
                        focus: !0
                    }, {
                        name: "time",
                        height: 72,
                        type: "time",
                        map_to: "auto"
                    }]
                },
                highlight_displayed_event: !0,
                left_border: !1,
                ajax_error: "alert",
                delay_render: 0,
                timeline_swap_resize: !0,
                wai_aria_attributes: !0,
                wai_aria_application_role: !0
            }, g.config.buttons_left.$inital = g.config.buttons_left.join(), g.config.buttons_right.$inital = g.config.buttons_right.join(), g._helpers = {
                parseDate: function(t) {
                    return (g.templates.xml_date || g.templates.parse_date)(t)
                },
                formatDate: function(t) {
                    return (g.templates.xml_format || g.templates.format_date)(t)
                }
            }, g.templates = {}, g.init_templates = function() {
                var t = g.locale.labels;
                t.dhx_save_btn = t.icon_save, t.dhx_cancel_btn = t.icon_cancel,
                    t.dhx_delete_btn = t.icon_delete;
                var e = g.date.date_to_str,
                    i = g.config;
                (function(t, e) {
                    for (var i in e) t[i] || (t[i] = e[i])
                })(g.templates, {
                    day_date: e(i.default_date),
                    month_date: e(i.month_date),
                    week_date: function(t, e) {
                        return i.rtl ? g.templates.day_date(g.date.add(e, -1, "day")) + " &ndash; " + g.templates.day_date(t) : g.templates.day_date(t) + " &ndash; " + g.templates.day_date(g.date.add(e, -1, "day"))
                    },
                    day_scale_date: e(i.default_date),
                    month_scale_date: e(i.week_date),
                    week_scale_date: e(i.day_date),
                    hour_scale: e(i.hour_date),
                    time_picker: e(i.hour_date),
                    event_date: e(i.hour_date),
                    month_day: e(i.month_day),
                    load_format: e(i.load_date),
                    format_date: e(i.date_format, i.server_utc),
                    parse_date: g.date.str_to_date(i.date_format, i.server_utc),
                    api_date: g.date.str_to_date(i.api_date, !1, !1),
                    event_header: function(t, e, i) {
                        return g.templates.event_date(t) + " - " + g.templates.event_date(e)
                    },
                    event_text: function(t, e, i) {
                        return i.text
                    },
                    event_class: function(t, e, i) {
                        return ""
                    },
                    month_date_class: function(t) {
                        return ""
                    },
                    week_date_class: function(t) {
                        return ""
                    },
                    event_bar_date: function(t, e, i) {
                        return g.templates.event_date(t) + " "
                    },
                    event_bar_text: function(t, e, i) {
                        return i.text
                    },
                    month_events_link: function(t, e) {
                        return "<a>View more(" + e + " events)</a>"
                    },
                    drag_marker_class: function(t, e, i) {
                        return ""
                    },
                    drag_marker_content: function(t, e, i) {
                        return ""
                    },
                    tooltip_date_format: g.date.date_to_str("%Y-%m-%d %H:%i"),
                    tooltip_text: function(t, e, i) {
                        return "<b>Event:</b> " + i.text + "<br/><b>Start date:</b> " + g.templates.tooltip_date_format(t) + "<br/><b>End date:</b> " + g.templates.tooltip_date_format(e)
                    }
                }), this.callEvent("onTemplatesReady", [])
            }, g.uid = function() {
                return this._seed || (this._seed = (new Date).valueOf()), this._seed++
            }, g._events = {}, g.clearAll = function() {
                this._events = {}, this._loaded = {}, this._edit_id = null, this._select_id = null, this._drag_id = null, this._drag_mode = null, this._drag_pos = null, this._new_event = null, this.clear_view(),
                    this.callEvent("onClearAll", [])
            }, g.addEvent = function(t, e, i, n, a) {
                if (!arguments.length) return this.addEventNow();
                var r = t;
                1 != arguments.length && (r = a || {}, r.start_date = t, r.end_date = e, r.text = i, r.id = n), r.id = r.id || g.uid(), r.text = r.text || "", "string" == typeof r.start_date && (r.start_date = this.templates.api_date(r.start_date)), "string" == typeof r.end_date && (r.end_date = this.templates.api_date(r.end_date));
                var s = 6e4 * (this.config.event_duration || this.config.time_step);
                r.start_date.valueOf() == r.end_date.valueOf() && r.end_date.setTime(r.end_date.valueOf() + s), r._timed = this.isOneDayEvent(r);
                var o = !this._events[r.id];
                return this._events[r.id] = r, this.event_updated(r), this._loading || this.callEvent(o ? "onEventAdded" : "onEventChanged", [r.id, r]), r.id
            }, g.deleteEvent = function(t, e) {
                var i = this._events[t];
                (e || this.callEvent("onBeforeEventDelete", [t, i]) && this.callEvent("onConfirmedBeforeEventDelete", [t, i])) && (i && (this._select_id = null, delete this._events[t],
                    this.event_updated(i), this._drag_id == i.id && (this._drag_id = null, this._drag_mode = null, this._drag_pos = null)), this.callEvent("onEventDeleted", [t, i]))
            }, g.getEvent = function(t) {
                return this._events[t]
            }, g.setEvent = function(t, e) {
                e.id || (e.id = t), this._events[t] = e
            }, g.for_rendered = function(t, e) {
                for (var i = this._rendered.length - 1; i >= 0; i--) this._rendered[i].getAttribute("event_id") == t && e(this._rendered[i], i)
            }, g.changeEventId = function(t, e) {
                if (t != e) {
                    var i = this._events[t];
                    i && (i.id = e, this._events[e] = i,
                        delete this._events[t]), this.for_rendered(t, function(t) {
                        t.setAttribute("event_id", e)
                    }), this._select_id == t && (this._select_id = e), this._edit_id == t && (this._edit_id = e), this.callEvent("onEventIdChange", [t, e])
                }
            },
            function() {
                for (var t = ["text", "Text", "start_date", "StartDate", "end_date", "EndDate"], e = function(t) {
                        return function(e) {
                            return g.getEvent(e)[t]
                        }
                    }, i = function(t) {
                        return function(e, i) {
                            var n = g.getEvent(e);
                            n[t] = i, n._changed = !0, n._timed = this.isOneDayEvent(n), g.event_updated(n, !0)
                        }
                    }, n = 0; n < t.length; n += 2) g["getEvent" + t[n + 1]] = e(t[n]), g["setEvent" + t[n + 1]] = i(t[n])
            }(), g.event_updated = function(t, e) {
                this.is_visible_events(t) ? this.render_view_data() : this.clear_event(t.id)
            }, g.is_visible_events = function(t) {
                if (!this._min_date || !this._max_date) return !1;
                if (t.start_date.valueOf() < this._max_date.valueOf() && this._min_date.valueOf() < t.end_date.valueOf()) {
                    var e = t.start_date.getHours(),
                        i = t.end_date.getHours() + t.end_date.getMinutes() / 60,
                        n = this.config.last_hour,
                        a = this.config.first_hour;
                    return !(!this._table_view && (i > n || i < a) && (e >= n || e < a)) || !!((t.end_date.valueOf() - t.start_date.valueOf()) / 36e5 > 24 - (this.config.last_hour - this.config.first_hour) || e < n && i >= a)
                }
                return !1
            }, g.isOneDayEvent = function(t) {
                var e = new Date(t.end_date.valueOf() - 1);
                return t.start_date.getFullYear() === e.getFullYear() && t.start_date.getMonth() === e.getMonth() && t.start_date.getDate() === e.getDate() && t.end_date.valueOf() - t.start_date.valueOf() < 864e5
            }, g.get_visible_events = function(t) {
                var e = [];
                for (var i in this._events) this.is_visible_events(this._events[i]) && (t && !this._events[i]._timed || this.filter_event(i, this._events[i]) && e.push(this._events[i]));
                return e
            }, g.filter_event = function(t, e) {
                var i = this["filter_" + this._mode];
                return !i || i(t, e)
            }, g._is_main_area_event = function(t) {
                return !!t._timed
            }, g.render_view_data = function(t, e) {
                var i = !1;
                if (!t) {
                    if (i = !0, this._not_render) return void(this._render_wait = !0);
                    this._render_wait = !1, this.clear_view(),
                        t = this.get_visible_events(!(this._table_view || this.config.multi_day))
                }
                for (var n = 0, a = t.length; n < a; n++) this._recalculate_timed(t[n]);
                if (this.config.multi_day && !this._table_view) {
                    for (var r = [], s = [], n = 0; n < t.length; n++) this._is_main_area_event(t[n]) ? r.push(t[n]) : s.push(t[n]);
                    if (!this._els.dhx_multi_day) {
                        var o = g._commonErrorMessages.unknownView(this._mode);
                        throw new Error(o)
                    }
                    this._rendered_location = this._els.dhx_multi_day[0], this._table_view = !0, this.render_data(s, e), this._table_view = !1,
                        this._rendered_location = this._els.dhx_cal_data[0], this._table_view = !1, this.render_data(r, e)
                } else {
                    var d = document.createDocumentFragment(),
                        l = this._els.dhx_cal_data[0];
                    this._rendered_location = d, this.render_data(t, e), l.appendChild(d), this._rendered_location = l
                }
                i && this.callEvent("onDataRender", [])
            }, g._view_month_day = function(t) {
                var e = g.getActionData(t).date;
                g.callEvent("onViewMoreClick", [e]) && g.setCurrentView(e, "day")
            }, g._render_month_link = function(t) {
                for (var e = this._rendered_location, i = this._lame_clone(t), n = t._sday; n < t._eday; n++) {
                    i._sday = n, i._eday = n + 1;
                    var a = g.date,
                        r = g._min_date;
                    r = a.add(r, i._sweek, "week"), r = a.add(r, i._sday, "day");
                    var s = g.getEvents(r, a.add(r, 1, "day")).length,
                        o = this._get_event_bar_pos(i),
                        d = o.x2 - o.x,
                        l = document.createElement("div");
                    l.onclick = function(t) {
                            g._view_month_day(t || event)
                        }, l.className = "dhx_month_link", l.style.top = o.y + "px", l.style.left = o.x + "px", l.style.width = d + "px", l.innerHTML = g.templates.month_events_link(r, s),
                        this._rendered.push(l), e.appendChild(l)
                }
            }, g._recalculate_timed = function(t) {
                if (t) {
                    var e;
                    e = "object" != typeof t ? this._events[t] : t, e && (e._timed = g.isOneDayEvent(e))
                }
            }, g.attachEvent("onEventChanged", g._recalculate_timed), g.attachEvent("onEventAdded", g._recalculate_timed), g.render_data = function(t, e) {
                t = this._pre_render_events(t, e);
                for (var i = {}, n = 0; n < t.length; n++)
                    if (this._table_view)
                        if ("month" != g._mode) this.render_event_bar(t[n]);
                        else {
                            var a = g.config.max_month_events;
                            a !== 1 * a || t[n]._sorder < a ? this.render_event_bar(t[n]) : void 0 !== a && t[n]._sorder == a && g._render_month_link(t[n])
                        }
                else {
                    var r = t[n],
                        s = g.locate_holder(r._sday);
                    if (!s) continue;
                    i[r._sday] || (i[r._sday] = {
                        real: s,
                        buffer: document.createDocumentFragment(),
                        width: s.clientWidth
                    });
                    var o = i[r._sday];
                    this.render_event(r, o.buffer, o.width)
                }
                for (var n in i) {
                    var o = i[n];
                    o.real && o.buffer && o.real.appendChild(o.buffer)
                }
            }, g._get_first_visible_cell = function(t) {
                for (var e = 0; e < t.length; e++)
                    if (-1 == (t[e].className || "").indexOf("dhx_scale_ignore")) return t[e];
                return t[0]
            }, g._pre_render_events = function(t, e) {
                var i = this.xy.bar_height,
                    n = this._colsS.heights,
                    a = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0],
                    r = this._els.dhx_cal_data[0];
                if (t = this._table_view ? this._pre_render_events_table(t, e) : this._pre_render_events_line(t, e), this._table_view)
                    if (e) this._colsS.heights = n;
                    else {
                        var s = r.firstChild;
                        if (s.rows) {
                            for (var o = 0; o < s.rows.length; o++) {
                                a[o]++;
                                var d = s.rows[o].cells,
                                    l = this._colsS.height - this.xy.month_head_height;
                                if (a[o] * i > l) {
                                    var _ = l;
                                    1 * this.config.max_month_events !== this.config.max_month_events || a[o] <= this.config.max_month_events ? _ = a[o] * i : (this.config.max_month_events + 1) * i > l && (_ = (this.config.max_month_events + 1) * i);
                                    for (var h = 0; h < d.length; h++) d[h].childNodes[1].style.height = _ + "px"
                                }
                                a[o] = (a[o - 1] || 0) + g._get_first_visible_cell(d).offsetHeight
                            }
                            if (a.unshift(0),
                                s.parentNode.offsetHeight < s.parentNode.scrollHeight && !g._colsS.scroll_fix && g.xy.scroll_width) {
                                var c = g._colsS,
                                    u = c[c.col_length],
                                    f = c.heights.slice();
                                u -= g.xy.scroll_width || 0, this._calc_scale_sizes(u, this._min_date, this._max_date), g._colsS.heights = f, this.set_xy(this._els.dhx_cal_header[0], u, this.xy.scale_height), g._render_scales(this._els.dhx_cal_header[0]), g._render_month_scale(this._els.dhx_cal_data[0], this._get_timeunit_start(), this._min_date), c.scroll_fix = !0
                            }
                        } else if (t.length || "visible" != this._els.dhx_multi_day[0].style.visibility || (a[0] = -1), t.length || -1 == a[0]) {
                            var v = (s.parentNode.childNodes, (a[0] + 1) * i + 1),
                                m = v,
                                p = v + "px";
                            this.config.multi_day_height_limit && (m = Math.min(v, this.config.multi_day_height_limit), p = m + "px"), r.style.top = this._els.dhx_cal_navline[0].offsetHeight + this._els.dhx_cal_header[0].offsetHeight + m + "px", r.style.height = this._obj.offsetHeight - parseInt(r.style.top, 10) - (this.xy.margin_top || 0) + "px";
                            var x = this._els.dhx_multi_day[0];
                            x.style.height = p, x.style.visibility = -1 == a[0] ? "hidden" : "visible";
                            var b = this._els.dhx_multi_day[1];
                            b.style.height = p, b.style.visibility = -1 == a[0] ? "hidden" : "visible", b.className = a[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small", this._dy_shift = (a[0] + 1) * i, this.config.multi_day_height_limit && (this._dy_shift = Math.min(this.config.multi_day_height_limit, this._dy_shift)), a[0] = 0, m != v && (r.style.top = parseInt(r.style.top) + 2 + "px", x.style.overflowY = "auto", b.style.position = "fixed", b.style.top = "",
                                b.style.left = "")
                        }
                    } return t
            }, g._get_event_sday = function(t) {
                var e = this.date.day_start(new Date(t.start_date));
                return Math.round((e.valueOf() - this._min_date.valueOf()) / 864e5)
            }, g._get_event_mapped_end_date = function(t) {
                var e = t.end_date;
                if (this.config.separate_short_events) {
                    var i = (t.end_date - t.start_date) / 6e4;
                    i < this._min_mapped_duration && (e = this.date.add(e, this._min_mapped_duration - i, "minute"))
                }
                return e
            }, g._pre_render_events_line = function(t, e) {
                t.sort(function(t, e) {
                    return t.start_date.valueOf() == e.start_date.valueOf() ? t.id > e.id ? 1 : -1 : t.start_date > e.start_date ? 1 : -1
                });
                var i = [],
                    n = [];
                this._min_mapped_duration = Math.ceil(60 * this.xy.min_event_height / this.config.hour_size_px);
                for (var a = 0; a < t.length; a++) {
                    var r = t[a],
                        s = r.start_date,
                        o = r.end_date,
                        d = s.getHours(),
                        l = o.getHours();
                    if (r._sday = this._get_event_sday(r), this._ignores[r._sday]) t.splice(a, 1), a--;
                    else {
                        if (i[r._sday] || (i[r._sday] = []), !e) {
                            r._inner = !1;
                            for (var _ = i[r._sday]; _.length;) {
                                var h = _[_.length - 1],
                                    c = this._get_event_mapped_end_date(h);
                                if (!(c.valueOf() <= r.start_date.valueOf())) break;
                                _.splice(_.length - 1, 1)
                            }
                            for (var u = _.length, f = !1, g = 0; g < _.length; g++) {
                                var h = _[g],
                                    c = this._get_event_mapped_end_date(h);
                                if (c.valueOf() <= r.start_date.valueOf()) {
                                    f = !0, r._sorder = h._sorder, u = g, r._inner = !0;
                                    break
                                }
                            }
                            if (_.length && (_[_.length - 1]._inner = !0), !f)
                                if (_.length)
                                    if (_.length <= _[_.length - 1]._sorder) {
                                        if (_[_.length - 1]._sorder)
                                            for (g = 0; g < _.length; g++) {
                                                for (var v = !1, m = 0; m < _.length; m++)
                                                    if (_[m]._sorder == g) {
                                                        v = !0;
                                                        break
                                                    } if (!v) {
                                                    r._sorder = g;
                                                    break
                                                }
                                            } else r._sorder = 0;
                                        r._inner = !0
                                    } else {
                                        var p = _[0]._sorder;
                                        for (g = 1; g < _.length; g++) _[g]._sorder > p && (p = _[g]._sorder);
                                        r._sorder = p + 1, r._inner = !1
                                    }
                            else r._sorder = 0;
                            _.splice(u, u == _.length ? 0 : 1, r), _.length > (_.max_count || 0) ? (_.max_count = _.length, r._count = _.length) : r._count = r._count ? r._count : 1
                        }(d < this.config.first_hour || l >= this.config.last_hour) && (n.push(r), t[a] = r = this._copy_event(r), d < this.config.first_hour && (r.start_date.setHours(this.config.first_hour),
                            r.start_date.setMinutes(0)), l >= this.config.last_hour && (r.end_date.setMinutes(0), r.end_date.setHours(this.config.last_hour)), r.start_date > r.end_date || d == this.config.last_hour) && (t.splice(a, 1), a--)
                    }
                }
                if (!e) {
                    for (var a = 0; a < t.length; a++) t[a]._count = i[t[a]._sday].max_count;
                    for (var a = 0; a < n.length; a++) n[a]._count = i[n[a]._sday].max_count
                }
                return t
            }, g._time_order = function(t) {
                t.sort(function(t, e) {
                    return t.start_date.valueOf() == e.start_date.valueOf() ? t._timed && !e._timed ? 1 : !t._timed && e._timed ? -1 : t.id > e.id ? 1 : -1 : t.start_date > e.start_date ? 1 : -1
                })
            }, g._is_any_multiday_cell_visible = function(t, e, i) {
                var n = this._cols.length,
                    a = !1,
                    r = t,
                    s = !0,
                    o = new Date(e);
                for (g.date.day_start(new Date(e)).valueOf() != e.valueOf() && (o = g.date.day_start(o), o = g.date.add(o, 1, "day")); r < o;) {
                    s = !1;
                    var d = this.locate_holder_day(r, !1, i),
                        l = d % n;
                    if (!this._ignores[l]) {
                        a = !0;
                        break
                    }
                    r = g.date.add(r, 1, "day")
                }
                return s || a
            },
            g._pre_render_events_table = function(t, e) {
                this._time_order(t);
                for (var i, n = [], a = [
                        [],
                        [],
                        [],
                        [],
                        [],
                        [],
                        []
                    ], r = this._colsS.heights, s = this._cols.length, o = {}, d = 0; d < t.length; d++) {
                    var l = t[d],
                        _ = l.id;
                    o[_] || (o[_] = {
                        first_chunk: !0,
                        last_chunk: !0
                    });
                    var h = o[_],
                        c = i || l.start_date,
                        u = l.end_date;
                    c < this._min_date && (h.first_chunk = !1, c = this._min_date), u > this._max_date && (h.last_chunk = !1, u = this._max_date);
                    var f = this.locate_holder_day(c, !1, l);
                    if (l._sday = f % s, !this._ignores[l._sday] || !l._timed) {
                        var v = this.locate_holder_day(u, !0, l) || s;
                        l._eday = v % s || s, l._length = v - f, l._sweek = Math.floor((this._correct_shift(c.valueOf(), 1) - this._min_date.valueOf()) / (864e5 * s));
                        if (g._is_any_multiday_cell_visible(c, u, l)) {
                            var m, p = a[l._sweek];
                            for (m = 0; m < p.length && !(p[m]._eday <= l._sday); m++);
                            if (l._sorder && e || (l._sorder = m), l._sday + l._length <= s) i = null, n.push(l), p[m] = l, r[l._sweek] = p.length - 1, l._first_chunk = h.first_chunk, l._last_chunk = h.last_chunk;
                            else {
                                var x = this._copy_event(l);
                                x.id = l.id, x._length = s - l._sday, x._eday = s,
                                    x._sday = l._sday, x._sweek = l._sweek, x._sorder = l._sorder, x.end_date = this.date.add(c, x._length, "day"), x._first_chunk = h.first_chunk, h.first_chunk && (h.first_chunk = !1), n.push(x), p[m] = x, i = x.end_date, r[l._sweek] = p.length - 1, d--
                            }
                        }
                    }
                }
                return n
            }, g._copy_dummy = function() {
                var t = new Date(this.start_date),
                    e = new Date(this.end_date);
                this.start_date = t, this.end_date = e
            }, g._copy_event = function(t) {
                return this._copy_dummy.prototype = t, new this._copy_dummy
            }, g._rendered = [], g.clear_view = function() {
                for (var t = 0; t < this._rendered.length; t++) {
                    var e = this._rendered[t];
                    e.parentNode && e.parentNode.removeChild(e)
                }
                this._rendered = []
            }, g.updateEvent = function(t) {
                var e = this.getEvent(t);
                this.clear_event(t), e && this.is_visible_events(e) && this.filter_event(t, e) && (this._table_view || this.config.multi_day || e._timed) && (this.config.update_render ? this.render_view_data() : "month" != this.getState().mode || this.getState().drag_id || this.isOneDayEvent(e) ? this.render_view_data([e], !0) : this.render_view_data())
            },
            g.clear_event = function(t) {
                this.for_rendered(t, function(t, e) {
                    t.parentNode && t.parentNode.removeChild(t), g._rendered.splice(e, 1)
                })
            }, g._y_from_date = function(t) {
                var e = 60 * t.getHours() + t.getMinutes();
                return Math.round((60 * e * 1e3 - 60 * this.config.first_hour * 60 * 1e3) * this.config.hour_size_px / 36e5) % (24 * this.config.hour_size_px)
            }, g._calc_event_y = function(t, e) {
                e = e || 0;
                var i = 60 * t.start_date.getHours() + t.start_date.getMinutes(),
                    n = 60 * t.end_date.getHours() + t.end_date.getMinutes() || 60 * g.config.last_hour;
                return {
                    top: this._y_from_date(t.start_date),
                    height: Math.max(e, (n - i) * this.config.hour_size_px / 60)
                }
            }, g.render_event = function(t, e, i) {
                var n = g.xy.menu_width,
                    a = this.config.use_select_menu_space ? 0 : n;
                if (!(t._sday < 0)) {
                    var r = g.locate_holder(t._sday);
                    if (r) {
                        e = e || r;
                        var s = this._calc_event_y(t, g.xy.min_event_height),
                            o = s.top,
                            d = s.height,
                            l = t._count || 1,
                            _ = t._sorder || 0;
                        i = i || r.clientWidth;
                        var h = Math.floor((i - a) / l),
                            c = _ * h + 1;
                        if (t._inner || (h *= l - _), this.config.cascade_event_display) {
                            var u = this.config.cascade_event_count,
                                f = this.config.cascade_event_margin;
                            c = _ % u * f;
                            var v = t._inner ? (l - _ - 1) % u * f / 2 : 0;
                            h = Math.floor(i - a - c - v)
                        }
                        var m = this._render_v_bar(t, a + c, o, h, d, t._text_style, g.templates.event_header(t.start_date, t.end_date, t), g.templates.event_text(t.start_date, t.end_date, t));
                        this._waiAria.eventAttr(t, m), this._rendered.push(m), e.appendChild(m);
                        if (c = c + parseInt(this.config.rtl ? r.style.right : r.style.left, 10) + a, this._edit_id == t.id) {
                            m.style.zIndex = 1, h = Math.max(h - 4, g.xy.editor_width),
                                m = document.createElement("div"), m.setAttribute("event_id", t.id), this._waiAria.eventAttr(t, m), m.className = "dhx_cal_event dhx_cal_editor", this.config.rtl && c++, this.set_xy(m, h, d - 20, c, o + (g.xy.event_header_height || 14)), t.color && (m.style.backgroundColor = t.color);
                            var p = g.templates.event_class(t.start_date, t.end_date, t);
                            p && (m.className += " " + p);
                            var x = document.createElement("div");
                            this.set_xy(x, h - 6, d - 26), x.style.cssText += ";margin:2px 2px 2px 2px;overflow:hidden;", m.appendChild(x),
                                this._els.dhx_cal_data[0].appendChild(m), this._rendered.push(m), x.innerHTML = "<textarea class='dhx_cal_editor'>" + t.text + "</textarea>", this._editor = x.querySelector("textarea"), this._quirks7 && (this._editor.style.height = d - 12 + "px"), this._editor.onkeydown = function(t) {
                                    if ((t || event).shiftKey) return !0;
                                    var e = (t || event).keyCode;
                                    e == g.keys.edit_save && g.editStop(!0), e == g.keys.edit_cancel && g.editStop(!1), e != g.keys.edit_save && e != g.keys.edit_cancel || t.preventDefault && t.preventDefault()
                                },
                                this._editor.onselectstart = function(t) {
                                    return (t || event).cancelBubble = !0, !0
                                }, g._focus(this._editor, !0), this._els.dhx_cal_data[0].scrollLeft = 0
                        }
                        if (0 !== this.xy.menu_width && this._select_id == t.id) {
                            this.config.cascade_event_display && this._drag_mode && (m.style.zIndex = 1);
                            for (var b, y = this.config["icons_" + (this._edit_id == t.id ? "edit" : "select")], w = "", D = t.color ? "background-color: " + t.color + ";" : "", E = t.textColor ? "color: " + t.textColor + ";" : "", A = 0; A < y.length; A++) b = this._waiAria.eventMenuAttrString(y[A]),
                                w += "<div class='dhx_menu_icon " + y[A] + "' style='" + D + E + "' title='" + this.locale.labels[y[A]] + "'" + b + "></div>";
                            var S = this._render_v_bar(t, c - n + 1, o, n, 20 * y.length + 26 - 2, "", "<div style='" + D + E + "' class='dhx_menu_head'></div>", w, !0);
                            S.style.left = c - n + 1, this._els.dhx_cal_data[0].appendChild(S), this._rendered.push(S)
                        }
                        this.config.drag_highlight && this._drag_id == t.id && this.highlightEventPosition(t)
                    }
                }
            }, g._render_v_bar = function(t, e, i, n, a, r, s, o, d) {
                var l = document.createElement("div"),
                    _ = t.id,
                    h = d ? "dhx_cal_event dhx_cal_select_menu" : "dhx_cal_event",
                    c = g.getState();
                c.drag_id == t.id && (h += " dhx_cal_event_drag"), c.select_id == t.id && (h += " dhx_cal_event_selected");
                var u = g.templates.event_class(t.start_date, t.end_date, t);
                u && (h = h + " " + u), this.config.cascade_event_display && (h += " dhx_cal_event_cascade");
                var f = t.color ? "background-color:" + t.color + ";" : "",
                    v = t.textColor ? "color:" + t.textColor + ";" : "",
                    m = g._border_box_events(),
                    p = n - 2,
                    x = m ? p : n - 4,
                    b = m ? p : n - 6,
                    y = m ? p : n - (this._quirks ? 4 : 14),
                    w = m ? p - 2 : n - 8,
                    D = m ? a - this.xy.event_header_height - 1 : a - (this._quirks ? 20 : 30) + 1,
                    E = '<div event_id="' + _ + '" class="' + h + '" style="position:absolute; top:' + i + "px; " + (this.config.rtl ? "right:" : "left:") + e + "px; width:" + x + "px; height:" + a + "px;" + (r || "") + '"></div>';
                l.innerHTML = E;
                var A = l.cloneNode(!0).firstChild;
                if (!d && g.renderEvent(A, t, n, a, s, o)) return A;
                A = l.firstChild;
                var S = '<div class="dhx_event_move dhx_header" style=" width:' + b + "px;" + f + '" >&nbsp;</div>';
                S += '<div class="dhx_event_move dhx_title" style="' + f + v + '">' + s + "</div>", S += '<div class="dhx_body" style=" width:' + y + "px; height:" + D + "px;" + f + v + '">' + o + "</div>";
                var k = "dhx_event_resize dhx_footer";
                return (d || !1 === t._drag_resize) && (k = "dhx_resize_denied " + k), S += '<div class="' + k + '" style=" width:' + w + "px;" + (d ? " margin-top:-1px;" : "") + f + v + '" ></div>',
                    A.innerHTML = S, A
            }, g.renderEvent = function() {
                return !1
            }, g.locate_holder = function(t) {
                return "day" == this._mode ? this._els.dhx_cal_data[0].firstChild : this._els.dhx_cal_data[0].childNodes[t]
            }, g.locate_holder_day = function(t, e) {
                var i = Math.floor((this._correct_shift(t, 1) - this._min_date) / 864e5);
                return e && this.date.time_part(t) && i++, i
            }, g._get_dnd_order = function(t, e, i) {
                if (!this._drag_event) return t;
                this._drag_event._orig_sorder ? t = this._drag_event._orig_sorder : this._drag_event._orig_sorder = t;
                for (var n = e * t; n + e > i;) t--, n -= e;
                return t = Math.max(t, 0)
            }, g._get_event_bar_pos = function(t) {
                var e = this.config.rtl,
                    i = this._colsS,
                    n = i[t._sday],
                    a = i[t._eday];
                e && (n = i[i.col_length] - i[t._eday] + i[0], a = i[i.col_length] - i[t._sday] + i[0]), a == n && (a = i[t._eday + 1]);
                var r = this.xy.bar_height,
                    s = t._sorder;
                if (t.id == this._drag_id) {
                    var o = i.heights[t._sweek + 1] - i.heights[t._sweek] - this.xy.month_head_height;
                    s = g._get_dnd_order(s, r, o)
                }
                var d = s * r;
                return {
                    x: n,
                    x2: a,
                    y: i.heights[t._sweek] + (i.height ? this.xy.month_scale_height + 2 : 2) + d
                }
            }, g.render_event_bar = function(t) {
                var e = this._rendered_location,
                    i = this._get_event_bar_pos(t),
                    n = i.y,
                    a = i.x,
                    r = i.x2,
                    s = "";
                if (r) {
                    var o = g.config.resize_month_events && "month" == this._mode && (!t._timed || g.config.resize_month_timed),
                        d = document.createElement("div"),
                        l = t.hasOwnProperty("_first_chunk") && t._first_chunk,
                        _ = t.hasOwnProperty("_last_chunk") && t._last_chunk,
                        h = o && (t._timed || l),
                        c = o && (t._timed || _),
                        u = !0,
                        f = "dhx_cal_event_clear";
                    t._timed && !o || (u = !1, f = "dhx_cal_event_line"), l && (f += " dhx_cal_event_line_start"),
                        _ && (f += " dhx_cal_event_line_end"), h && (s += "<div class='dhx_event_resize dhx_event_resize_start'></div>"), c && (s += "<div class='dhx_event_resize dhx_event_resize_end'></div>");
                    var v = g.templates.event_class(t.start_date, t.end_date, t);
                    v && (f += " " + v);
                    var m = t.color ? "background:" + t.color + ";" : "",
                        p = t.textColor ? "color:" + t.textColor + ";" : "",
                        x = ["position:absolute", "top:" + n + "px", "left:" + a + "px", "width:" + (r - a - 3 - (u ? 1 : 0)) + "px", p, m, t._text_style || ""].join(";"),
                        b = "<div event_id='" + t.id + "' class='" + f + "' style='" + x + "'" + this._waiAria.eventBarAttrString(t) + ">";
                    o && (b += s), "month" == g.getState().mode && (t = g.getEvent(t.id)), t._timed && (b += g.templates.event_bar_date(t.start_date, t.end_date, t)), b += g.templates.event_bar_text(t.start_date, t.end_date, t) + "</div>",
                        b += "</div>", d.innerHTML = b, this._rendered.push(d.firstChild), e.appendChild(d.firstChild)
                }
            }, g._locate_event = function(t) {
                for (var e = null; t && !e && t.getAttribute;) e = t.getAttribute("event_id"), t = t.parentNode;
                return e
            }, g._locate_css = function(t, e, i) {
                void 0 === i && (i = !0);
                for (var n = t.target || t.srcElement, a = ""; n;) {
                    if (a = g._getClassName(n)) {
                        var r = a.indexOf(e);
                        if (r >= 0) {
                            if (!i) return n;
                            var s = 0 === r || !g._trim(a.charAt(r - 1)),
                                o = r + e.length >= a.length || !g._trim(a.charAt(r + e.length));
                            if (s && o) return n
                        }
                    }
                    n = n.parentNode
                }
                return null
            }, g.edit = function(t) {
                this._edit_id != t && (this.editStop(!1, t), this._edit_id = t, this.updateEvent(t))
            }, g.editStop = function(t, e) {
                if (!e || this._edit_id != e) {
                    var i = this.getEvent(this._edit_id);
                    i && (t && (i.text = this._editor.value), this._edit_id = null, this._editor = null, this.updateEvent(i.id), this._edit_stop_event(i, t))
                }
            }, g._edit_stop_event = function(t, e) {
                this._new_event ? (e ? this.callEvent("onEventAdded", [t.id, t]) : t && this.deleteEvent(t.id, !0),
                    this._new_event = null) : e && this.callEvent("onEventChanged", [t.id, t])
            }, g.getEvents = function(t, e) {
                var i = [];
                for (var n in this._events) {
                    var a = this._events[n];
                    a && (!t && !e || a.start_date < e && a.end_date > t) && i.push(a)
                }
                return i
            }, g.getRenderedEvent = function(t) {
                if (t) {
                    for (var e = g._rendered, i = 0; i < e.length; i++) {
                        var n = e[i];
                        if (n.getAttribute("event_id") == t) return n
                    }
                    return null
                }
            }, g.showEvent = function(t, e) {
                function i() {
                    a.color = o, a.textColor = d
                }
                var n;
                t && "object" == typeof t && (e = t.mode, n = t.section, t = t.section);
                var a = "number" == typeof t || "string" == typeof t ? g.getEvent(t) : t;
                if (e = e || g._mode, a && (!this.checkEvent("onBeforeEventDisplay") || this.callEvent("onBeforeEventDisplay", [a, e]))) {
                    var r = g.config.scroll_hour;
                    g.config.scroll_hour = a.start_date.getHours();
                    var s = g.config.preserve_scroll;
                    g.config.preserve_scroll = !1;
                    var o = a.color,
                        d = a.textColor;
                    if (g.config.highlight_displayed_event && (a.color = g.config.displayed_event_color, a.textColor = g.config.displayed_event_text_color),
                        g.setCurrentView(new Date(a.start_date), e), g.config.scroll_hour = r, g.config.preserve_scroll = s, g.matrix && g.matrix[e]) {
                        var l = g.getView(),
                            _ = l.y_property,
                            h = g.getEvent(a.id);
                        if (h) {
                            if (!n) {
                                var n = h[_];
                                Array.isArray(n) ? n = n[0] : "string" == typeof n && g.config.section_delimiter && n.indexOf(g.config.section_delimiter) > -1 && (n = n.split(g.config.section_delimiter)[0])
                            }
                            var c = l.posFromSection(n),
                                u = l.posFromDate(h.start_date),
                                f = g.$container.querySelector(".dhx_timeline_data_wrapper");
                            if (u -= (f.offsetWidth - l.dx) / 2,
                                c = c - f.offsetHeight / 2 + l.dy / 2, l._smartRenderingEnabled()) var v = l.attachEvent("onScroll", function() {
                                i(), l.detachEvent(v)
                            });
                            l.scrollTo({
                                left: u,
                                top: c
                            }), l._smartRenderingEnabled() || i()
                        }
                    } else i();
                    g.callEvent("onAfterEventDisplay", [a, e])
                }
            }, g._append_drag_marker = function(t) {
                if (!t.parentNode) {
                    var e = g._els.dhx_cal_data[0],
                        i = e.lastChild,
                        n = g._getClassName(i);
                    n.indexOf("dhx_scale_holder") < 0 && i.previousSibling && (i = i.previousSibling), n = g._getClassName(i), i && 0 === n.indexOf("dhx_scale_holder") && i.appendChild(t)
                }
            },
            g._update_marker_position = function(t, e) {
                var i = g._calc_event_y(e, 0);
                t.style.top = i.top + "px", t.style.height = i.height + "px"
            }, g.highlightEventPosition = function(t) {
                var e = document.createElement("div");
                e.setAttribute("event_id", t.id), this._rendered.push(e), this._update_marker_position(e, t);
                var i = this.templates.drag_marker_class(t.start_date, t.end_date, t),
                    n = this.templates.drag_marker_content(t.start_date, t.end_date, t);
                e.className = "dhx_drag_marker", i && (e.className += " " + i), n && (e.innerHTML = n),
                    this._append_drag_marker(e)
            }, g._loaded = {}, g._load = function(t, e) {
                function i(t) {
                    g.on_load(t), g.callEvent("onLoadEnd", [])
                }
                if (t = t || this._load_url) {
                    t += (-1 == t.indexOf("?") ? "?" : "&") + "timeshift=" + (new Date).getTimezoneOffset(), this.config.prevent_cache && (t += "&uid=" + this.uid());
                    var n;
                    if (e = e || this._date, this._load_mode) {
                        var a = this.templates.load_format;
                        for (e = this.date[this._load_mode + "_start"](new Date(e.valueOf())); e > this._min_date;) e = this.date.add(e, -1, this._load_mode);
                        n = e;
                        for (var r = !0; n < this._max_date;) n = this.date.add(n, 1, this._load_mode), this._loaded[a(e)] && r ? e = this.date.add(e, 1, this._load_mode) : r = !1;
                        var s = n;
                        do {
                            n = s, s = this.date.add(n, -1, this._load_mode)
                        } while (s > e && this._loaded[a(s)]);
                        if (n <= e) return !1;
                        for (g.$ajax.get(t + "&from=" + a(e) + "&to=" + a(n), i); e < n;) this._loaded[a(e)] = !0, e = this.date.add(e, 1, this._load_mode)
                    } else g.$ajax.get(t, i);
                    return this.callEvent("onXLS", []), this.callEvent("onLoadStart", []), !0
                }
            }, g._parsers = {}, g._parsers.xml = {
                canParse: function(t, e) {
                    if (e.responseXML && e.responseXML.firstChild) return !0;
                    try {
                        var i = g.$ajax.parse(e.responseText),
                            n = g.$ajax.xmltop("data", i);
                        if (n && "data" === n.tagName) return !0
                    } catch (t) {}
                    return !1
                },
                parse: function(t) {
                    var e;
                    if (t.xmlDoc.responseXML || (t.xmlDoc.responseXML = g.$ajax.parse(t.xmlDoc.responseText)), e = g.$ajax.xmltop("data", t.xmlDoc), "data" != e.tagName) return null;
                    var i = e.getAttribute("dhx_security");
                    i && (window.dhtmlx && (dhtmlx.security_key = i), g.security_key = i);
                    for (var n = g.$ajax.xpath("//coll_options", t.xmlDoc), a = 0; a < n.length; a++) {
                        var r = n[a].getAttribute("for"),
                            s = g.serverList[r];
                        s || (g.serverList[r] = s = []), s.splice(0, s.length);
                        for (var o = g.$ajax.xpath(".//item", n[a]), d = 0; d < o.length; d++) {
                            for (var l = o[d], _ = l.attributes, h = {
                                    key: o[d].getAttribute("value"),
                                    label: o[d].getAttribute("label")
                                }, c = 0; c < _.length; c++) {
                                var u = _[c];
                                "value" != u.nodeName && "label" != u.nodeName && (h[u.nodeName] = u.nodeValue)
                            }
                            s.push(h)
                        }
                    }
                    n.length && g.callEvent("onOptionsLoad", []);
                    for (var f = g.$ajax.xpath("//userdata", t.xmlDoc), a = 0; a < f.length; a++) {
                        var v = g._xmlNodeToJSON(f[a]);
                        g._userdata[v.name] = v.text
                    }
                    var m = [];
                    e = g.$ajax.xpath("//event", t.xmlDoc);
                    for (var a = 0; a < e.length; a++) {
                        var p = m[a] = g._xmlNodeToJSON(e[a]);
                        g._init_event(p)
                    }
                    return m
                }
            }, g.json = g._parsers.json = {
                canParse: function(t) {
                    if (t && "object" == typeof t) return !0;
                    if ("string" == typeof t) try {
                        var e = JSON.parse(t);
                        return "[object Object]" === Object.prototype.toString.call(e) || "[object Array]" === Object.prototype.toString.call(e)
                    } catch (t) {
                        return !1
                    }
                    return !1
                },
                parse: function(t) {
                    var e = [];
                    "string" == typeof t && (t = JSON.parse(t)), e = "[object Array]" === Object.prototype.toString.call(t) ? t : t ? t.data : [], e = e || [], t.dhx_security && (window.dhtmlx && (dhtmlx.security_key = t.dhx_security), g.security_key = t.dhx_security);
                    var i = t && t.collections ? t.collections : {},
                        n = !1;
                    for (var a in i)
                        if (i.hasOwnProperty(a)) {
                            n = !0;
                            var r = i[a],
                                s = g.serverList[a];
                            s || (g.serverList[a] = s = []), s.splice(0, s.length);
                            for (var o = 0; o < r.length; o++) {
                                var d = r[o],
                                    l = {
                                        key: d.value,
                                        label: d.label
                                    };
                                for (var _ in d)
                                    if (d.hasOwnProperty(_)) {
                                        if ("value" == _ || "label" == _) continue;
                                        l[_] = d[_]
                                    } s.push(l)
                            }
                        } n && g.callEvent("onOptionsLoad", []);
                    for (var h = [], c = 0; c < e.length; c++) {
                        var u = e[c];
                        g._init_event(u), h.push(u)
                    }
                    return h
                }
            }, g.ical = g._parsers.ical = {
                canParse: function(t) {
                    return "string" == typeof t && new RegExp("^BEGIN:VCALENDAR").test(t)
                },
                parse: function(t) {
                    var e = t.match(RegExp(this.c_start + "[^\f]*" + this.c_end, ""));
                    if (e.length) {
                        e[0] = e[0].replace(/[\r\n]+ /g, ""),
                            e[0] = e[0].replace(/[\r\n]+(?=[a-z \t])/g, " "), e[0] = e[0].replace(/\;[^:\r\n]*:/g, ":");
                        for (var i, n = [], a = RegExp("(?:" + this.e_start + ")([^\f]*?)(?:" + this.e_end + ")", "g"); null !== (i = a.exec(e));) {
                            for (var r, s = {}, o = /[^\r\n]+[\r\n]+/g; null !== (r = o.exec(i[1]));) this.parse_param(r.toString(), s);
                            s.uid && !s.id && (s.id = s.uid), n.push(s)
                        }
                        return n
                    }
                },
                parse_param: function(t, e) {
                    var i = t.indexOf(":");
                    if (-1 != i) {
                        var n = t.substr(0, i).toLowerCase(),
                            a = t.substr(i + 1).replace(/\\\,/g, ",").replace(/[\r\n]+$/, "");
                        "summary" == n ? n = "text" : "dtstart" == n ? (n = "start_date", a = this.parse_date(a, 0, 0)) : "dtend" == n && (n = "end_date", a = this.parse_date(a, 0, 0)), e[n] = a
                    }
                },
                parse_date: function(t, e, i) {
                    var n = t.split("T"),
                        a = !1;
                    n[1] && (e = n[1].substr(0, 2), i = n[1].substr(2, 2), a = !("Z" != n[1][6]));
                    var r = n[0].substr(0, 4),
                        s = parseInt(n[0].substr(4, 2), 10) - 1,
                        o = n[0].substr(6, 2);
                    return g.config.server_utc || a ? new Date(Date.UTC(r, s, o, e, i)) : new Date(r, s, o, e, i)
                },
                c_start: "BEGIN:VCALENDAR",
                e_start: "BEGIN:VEVENT",
                e_end: "END:VEVENT",
                c_end: "END:VCALENDAR"
            }, g.on_load = function(t) {
                this.callEvent("onBeforeParse", []);
                var e, i = !1,
                    n = !1;
                for (var a in this._parsers) {
                    var r = this._parsers[a];
                    if (r.canParse(t.xmlDoc.responseText, t.xmlDoc)) {
                        try {
                            var s = t.xmlDoc.responseText;
                            "xml" === a && (s = t), e = r.parse(s), e || (i = !0)
                        } catch (t) {
                            i = !0
                        }
                        n = !0;
                        break
                    }
                }
                if (!n)
                    if (this._process && this[this._process]) try {
                        e = this[this._process].parse(t.xmlDoc.responseText)
                    } catch (t) {
                        i = !0
                    } else i = !0;
                (i || t.xmlDoc.status && t.xmlDoc.status >= 400) && (this.callEvent("onLoadError", [t.xmlDoc]), e = []),
                this._process_loading(e), this.callEvent("onXLE", []), this.callEvent("onParse", [])
            }, g._process_loading = function(t) {
                this._loading = !0, this._not_render = !0;
                for (var e = 0; e < t.length; e++) this.callEvent("onEventLoading", [t[e]]) && this.addEvent(t[e]);
                this._not_render = !1, this._render_wait && this.render_view_data(), this._loading = !1, this._after_call && this._after_call(), this._after_call = null
            }, g._init_event = function(t) {
                t.text = t.text || t._tagvalue || "", t.start_date = g._init_date(t.start_date),
                    t.end_date = g._init_date(t.end_date)
            }, g._init_date = function(t) {
                return t ? "string" == typeof t ? g._helpers.parseDate(t) : new Date(t) : null
            }, g.json = {}, g.json.parse = function(t) {
                var e = [];
                "string" == typeof t && (t = JSON.parse(t)), e = "[object Array]" === Object.prototype.toString.call(t) ? t : t ? t.data : [], e = e || [], t.dhx_security && (window.dhtmlx && (dhtmlx.security_key = t.dhx_security), g.security_key = t.dhx_security);
                var i = t && t.collections ? t.collections : {},
                    n = !1;
                for (var a in i)
                    if (i.hasOwnProperty(a)) {
                        n = !0;
                        var r = i[a],
                            s = g.serverList[a];
                        s || (g.serverList[a] = s = []), s.splice(0, s.length);
                        for (var o = 0; o < r.length; o++) {
                            var d = r[o],
                                l = {
                                    key: d.value,
                                    label: d.label
                                };
                            for (var _ in d)
                                if (d.hasOwnProperty(_)) {
                                    if ("value" == _ || "label" == _) continue;
                                    l[_] = d[_]
                                } s.push(l)
                        }
                    } n && g.callEvent("onOptionsLoad", []);
                for (var h = [], c = 0; c < e.length; c++) {
                    var u = e[c];
                    g._init_event(u), h.push(u)
                }
                return h
            }, g.parse = function(t, e) {
                this._process = e, this.on_load({
                    xmlDoc: {
                        responseText: t
                    }
                })
            }, g.load = function(t, e) {
                "string" == typeof e && (this._process = e,
                    e = arguments[2]), this._load_url = t, this._after_call = e, this._load(t, this._date)
            }, g.setLoadMode = function(t) {
                "all" == t && (t = ""), this._load_mode = t
            }, g.serverList = function(t, e) {
                return e ? (this.serverList[t] = e.slice(0), this.serverList[t]) : (this.serverList[t] = this.serverList[t] || [], this.serverList[t])
            }, g._userdata = {}, g._xmlNodeToJSON = function(t) {
                for (var e = {}, i = 0; i < t.attributes.length; i++) e[t.attributes[i].name] = t.attributes[i].value;
                for (var i = 0; i < t.childNodes.length; i++) {
                    var n = t.childNodes[i];
                    1 == n.nodeType && (e[n.tagName] = n.firstChild ? n.firstChild.nodeValue : "")
                }
                return e.text || (e.text = t.firstChild ? t.firstChild.nodeValue : ""), e
            }, g.attachEvent("onXLS", function() {
                if (!0 === this.config.show_loading) {
                    var t;
                    t = this.config.show_loading = document.createElement("div"), t.className = "dhx_loading", t.style.left = Math.round((this._x - 128) / 2) + "px", t.style.top = Math.round((this._y - 15) / 2) + "px", this._obj.appendChild(t)
                }
            }), g.attachEvent("onXLE", function() {
                var t = this.config.show_loading;
                t && "object" == typeof t && (t.parentNode && t.parentNode.removeChild(t), this.config.show_loading = !0)
            }), g._lightbox_controls = {}, g.formSection = function(t) {
                var e = this.config.lightbox.sections,
                    i = 0;
                for (i; i < e.length && e[i].name != t; i++);
                var n = e[i];
                g._lightbox || g.getLightbox();
                var a = document.getElementById(n.id),
                    r = a.nextSibling,
                    s = {
                        section: n,
                        header: a,
                        node: r,
                        getValue: function(t) {
                            return g.form_blocks[n.type].get_value(r, t || {}, n)
                        },
                        setValue: function(t, e) {
                            return g.form_blocks[n.type].set_value(r, t, e || {}, n)
                        }
                    },
                    o = g._lightbox_controls["get_" + n.type + "_control"];
                return o ? o(s) : s
            }, g._lightbox_controls.get_template_control = function(t) {
                return t.control = t.node, t
            }, g._lightbox_controls.get_select_control = function(t) {
                return t.control = t.node.getElementsByTagName("select")[0], t
            }, g._lightbox_controls.get_textarea_control = function(t) {
                return t.control = t.node.getElementsByTagName("textarea")[0], t
            }, g._lightbox_controls.get_time_control = function(t) {
                return t.control = t.node.getElementsByTagName("select"), t
            },
            g._lightbox_controls.defaults = {
                template: {
                    height: 30
                },
                textarea: {
                    height: 200
                },
                select: {
                    height: 23
                },
                time: {
                    height: 20
                }
            }, g.form_blocks = {
                template: {
                    render: function(t) {
                        var e = g._lightbox_controls.defaults.template,
                            i = e ? e.height : 30;
                        return "<div class='dhx_cal_ltext dhx_cal_template' style='height:" + (t.height || i || 30) + "px;'></div>"
                    },
                    set_value: function(t, e, i, n) {
                        t.innerHTML = e || ""
                    },
                    get_value: function(t, e, i) {
                        return t.innerHTML || ""
                    },
                    focus: function(t) {}
                },
                textarea: {
                    render: function(t) {
                        var e = g._lightbox_controls.defaults.textarea,
                            i = e ? e.height : 200;
                        return "<div class='dhx_cal_ltext' style='height:" + (t.height || i || "130") + "px;'><textarea></textarea></div>"
                    },
                    set_value: function(t, e, i) {
                        g.form_blocks.textarea._get_input(t).value = e || ""
                    },
                    get_value: function(t, e) {
                        return g.form_blocks.textarea._get_input(t).value
                    },
                    focus: function(t) {
                        var e = g.form_blocks.textarea._get_input(t);
                        g._focus(e, !0)
                    },
                    _get_input: function(t) {
                        return t.getElementsByTagName("textarea")[0]
                    }
                },
                select: {
                    render: function(t) {
                        for (var e = g._lightbox_controls.defaults.select, i = e ? e.height : 23, n = (t.height || i || "23") + "px", a = "<div class='dhx_cal_ltext' style='height:" + n + ";'><select style='width:100%;'>", r = 0; r < t.options.length; r++) a += "<option value='" + t.options[r].key + "'>" + t.options[r].label + "</option>";
                        return a += "</select></div>"
                    },
                    set_value: function(t, e, i, n) {
                        var a = t.firstChild;
                        !a._dhx_onchange && n.onchange && (a.onchange = n.onchange, a._dhx_onchange = !0), void 0 === e && (e = (a.options[0] || {}).value), a.value = e || ""
                    },
                    get_value: function(t, e) {
                        return t.firstChild.value
                    },
                    focus: function(t) {
                        var e = t.firstChild;
                        g._focus(e, !0)
                    }
                },
                time: {
                    render: function(t) {
                        t.time_format || (t.time_format = ["%H:%i", "%d", "%m", "%Y"]), t._time_format_order = {};
                        var e = t.time_format,
                            i = g.config,
                            n = g.date.date_part(g._currentDate()),
                            a = 1440,
                            r = 0;
                        g.config.limit_time_select && (a = 60 * i.last_hour + 1, r = 60 * i.first_hour, n.setHours(i.first_hour));
                        for (var s = "", o = 0; o < e.length; o++) {
                            var d = e[o];
                            o > 0 && (s += " ");
                            var l = "",
                                _ = "";
                            switch (d) {
                                case "%Y":
                                    l = "dhx_lightbox_year_select", t._time_format_order[3] = o;
                                    var h, c, u;
                                    t.year_range && (isNaN(t.year_range) ? t.year_range.push && (c = t.year_range[0], u = t.year_range[1]) : h = t.year_range), h = h || 10;
                                    var f = f || Math.floor(h / 2);
                                    c = c || n.getFullYear() - f, u = u || c + h;
                                    for (var v = c; v < u; v++) _ += "<option value='" + v + "'>" + v + "</option>";
                                    break;
                                case "%m":
                                    l = "dhx_lightbox_month_select", t._time_format_order[2] = o;
                                    for (var v = 0; v < 12; v++) _ += "<option value='" + v + "'>" + this.locale.date.month_full[v] + "</option>";
                                    break;
                                case "%d":
                                    l = "dhx_lightbox_day_select", t._time_format_order[1] = o;
                                    for (var v = 1; v < 32; v++) _ += "<option value='" + v + "'>" + v + "</option>";
                                    break;
                                case "%H:%i":
                                    l = "dhx_lightbox_time_select", t._time_format_order[0] = o;
                                    var v = r,
                                        m = n.getDate();
                                    for (t._time_values = []; v < a;) {
                                        _ += "<option value='" + v + "'>" + this.templates.time_picker(n) + "</option>", t._time_values.push(v), n.setTime(n.valueOf() + 60 * this.config.time_step * 1e3);
                                        v = 24 * (n.getDate() != m ? 1 : 0) * 60 + 60 * n.getHours() + n.getMinutes()
                                    }
                            }
                            if (_) {
                                var p = g._waiAria.lightboxSelectAttrString(d);
                                s += "<select class='" + l + "' " + (t.readonly ? "disabled='disabled'" : "") + p + ">" + _ + "</select> "
                            }
                        }
                        var x = g._lightbox_controls.defaults.select;
                        return "<div style='height:" + ((x ? x.height : 23) || 30) + "px;padding-top:0px;font-size:inherit;' class='dhx_section_time'>" + s + "<span style='font-weight:normal; font-size:10pt;'> &nbsp;&ndash;&nbsp; </span>" + s + "</div>"
                    },
                    set_value: function(t, e, i, n) {
                        function a(t, e, i) {
                            for (var a = n._time_values, r = 60 * i.getHours() + i.getMinutes(), s = r, o = !1, d = 0; d < a.length; d++) {
                                var _ = a[d];
                                if (_ === r) {
                                    o = !0;
                                    break
                                }
                                _ < r && (s = _)
                            }
                            t[e + l[0]].value = o ? r : s, o || s || (t[e + l[0]].selectedIndex = -1), t[e + l[1]].value = i.getDate(), t[e + l[2]].value = i.getMonth(), t[e + l[3]].value = i.getFullYear()
                        }
                        var r, s, o = g.config,
                            d = t.getElementsByTagName("select"),
                            l = n._time_format_order;
                        if (o.full_day) {
                            if (!t._full_day) {
                                var _ = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + g.locale.labels.full_day + "&nbsp;</label></input>";
                                g.config.wide_form || (_ = t.previousSibling.innerHTML + _), t.previousSibling.innerHTML = _,
                                    t._full_day = !0
                            }
                            var h = t.previousSibling.getElementsByTagName("input")[0];
                            h.checked = 0 === g.date.time_part(i.start_date) && 0 === g.date.time_part(i.end_date), d[l[0]].disabled = h.checked, d[l[0] + d.length / 2].disabled = h.checked, h.onclick = function() {
                                if (h.checked) {
                                    var e = {};
                                    g.form_blocks.time.get_value(t, e, n), r = g.date.date_part(e.start_date), s = g.date.date_part(e.end_date), (+s == +r || +s >= +r && (0 !== i.end_date.getHours() || 0 !== i.end_date.getMinutes())) && (s = g.date.add(s, 1, "day"))
                                } else r = null, s = null;
                                d[l[0]].disabled = h.checked, d[l[0] + d.length / 2].disabled = h.checked, a(d, 0, r || i.start_date), a(d, 4, s || i.end_date)
                            }
                        }
                        if (o.auto_end_date && o.event_duration)
                            for (var c = function() {
                                    o.auto_end_date && o.event_duration && (r = new Date(d[l[3]].value, d[l[2]].value, d[l[1]].value, 0, d[l[0]].value), s = new Date(r.getTime() + 60 * g.config.event_duration * 1e3), a(d, 4, s))
                                }, u = 0; u < 4; u++) d[u].onchange = c;
                        a(d, 0, i.start_date), a(d, 4, i.end_date)
                    },
                    get_value: function(t, e, i) {
                        var n = t.getElementsByTagName("select"),
                            a = i._time_format_order;
                        if (e.start_date = new Date(n[a[3]].value, n[a[2]].value, n[a[1]].value, 0, n[a[0]].value), e.end_date = new Date(n[a[3] + 4].value, n[a[2] + 4].value, n[a[1] + 4].value, 0, n[a[0] + 4].value), !n[a[3]].value || !n[a[3] + 4].value) {
                            var r = g.getEvent(g._lightbox_id);
                            r && (e.start_date = r.start_date, e.end_date = r.end_date)
                        }
                        return e.end_date <= e.start_date && (e.end_date = g.date.add(e.start_date, g.config.time_step, "minute")), {
                            start_date: new Date(e.start_date),
                            end_date: new Date(e.end_date)
                        }
                    },
                    focus: function(t) {
                        g._focus(t.getElementsByTagName("select")[0])
                    }
                }
            }, g._setLbPosition = function(t) {
                if (t) {
                    var e = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
                        i = window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft,
                        n = window.innerHeight || document.documentElement.clientHeight;
                    t.style.top = e ? Math.round(e + Math.max((n - t.offsetHeight) / 2, 0)) + "px" : Math.round(Math.max((n - t.offsetHeight) / 2, 0) + 9) + "px",
                        document.documentElement.scrollWidth > document.body.offsetWidth ? t.style.left = Math.round(i + (document.body.offsetWidth - t.offsetWidth) / 2) + "px" : t.style.left = Math.round((document.body.offsetWidth - t.offsetWidth) / 2) + "px"
                }
            }, g.showCover = function(t) {
                t && (t.style.display = "block", this._setLbPosition(t)), g.config.responsive_lightbox && (document.documentElement.classList.add("dhx_cal_overflow_container"), document.body.classList.add("dhx_cal_overflow_container")), this.show_cover()
            }, g.showLightbox = function(t) {
                if (t) {
                    if (!this.callEvent("onBeforeLightbox", [t])) return void(this._new_event && (this._new_event = null));
                    var e = this.getLightbox();
                    this.showCover(e), this._fill_lightbox(t, e), this._waiAria.lightboxVisibleAttr(e), this.callEvent("onLightbox", [t])
                }
            }, g._fill_lightbox = function(t, e) {
                var i = this.getEvent(t),
                    n = e.getElementsByTagName("span"),
                    a = [];
                if (g.templates.lightbox_header) {
                    a.push("");
                    var r = g.templates.lightbox_header(i.start_date, i.end_date, i);
                    a.push(r), n[1].innerHTML = "", n[2].innerHTML = r
                } else {
                    var s = this.templates.event_header(i.start_date, i.end_date, i),
                        o = (this.templates.event_bar_text(i.start_date, i.end_date, i) || "").substr(0, 70);
                    a.push(s), a.push(o), n[1].innerHTML = s, n[2].innerHTML = o
                }
                this._waiAria.lightboxHeader(e, a.join(" "));
                for (var d = this.config.lightbox.sections, l = 0; l < d.length; l++) {
                    var _ = d[l],
                        h = g._get_lightbox_section_node(_),
                        c = this.form_blocks[_.type],
                        u = void 0 !== i[_.map_to] ? i[_.map_to] : _.default_value;
                    c.set_value.call(this, h, u, i, _), d[l].focus && c.focus.call(this, h)
                }
                g._lightbox_id = t
            }, g._get_lightbox_section_node = function(t) {
                return document.getElementById(t.id).nextSibling
            }, g._lightbox_out = function(t) {
                for (var e = this.config.lightbox.sections, i = 0; i < e.length; i++) {
                    var n = document.getElementById(e[i].id);
                    n = n ? n.nextSibling : n;
                    var a = this.form_blocks[e[i].type],
                        r = a.get_value.call(this, n, t, e[i]);
                    "auto" != e[i].map_to && (t[e[i].map_to] = r)
                }
                return t
            }, g._empty_lightbox = function(t) {
                var e = g._lightbox_id,
                    i = this.getEvent(e);
                this.getLightbox();
                this._lame_copy(i, t), this.setEvent(i.id, i),
                    this._edit_stop_event(i, !0), this.render_view_data()
            }, g.hide_lightbox = function(t) {
                g.endLightbox(!1, this.getLightbox())
            }, g.hideCover = function(t) {
                t && (t.style.display = "none"), this.hide_cover(), g.config.responsive_lightbox && (document.documentElement.classList.remove("dhx_cal_overflow_container"), document.body.classList.remove("dhx_cal_overflow_container"))
            }, g.hide_cover = function() {
                this._cover && this._cover.parentNode.removeChild(this._cover), this._cover = null
            }, g.show_cover = function() {
                this._cover || (this._cover = document.createElement("div"), this._cover.className = "dhx_cal_cover", document.body.appendChild(this._cover))
            }, g.save_lightbox = function() {
                var t = this._lightbox_out({}, this._lame_copy(this.getEvent(this._lightbox_id)));
                this.checkEvent("onEventSave") && !this.callEvent("onEventSave", [this._lightbox_id, t, this._new_event]) || (this._empty_lightbox(t), this.hide_lightbox())
            }, g.startLightbox = function(t, e) {
                this._lightbox_id = t, this._custom_lightbox = !0,
                    this._temp_lightbox = this._lightbox, this._lightbox = e, this.showCover(e)
            }, g.endLightbox = function(t, e) {
                var e = e || g.getLightbox(),
                    i = g.getEvent(this._lightbox_id);
                i && this._edit_stop_event(i, t), t && g.render_view_data(), this.hideCover(e), this._custom_lightbox && (this._lightbox = this._temp_lightbox, this._custom_lightbox = !1), this._temp_lightbox = this._lightbox_id = null, this._waiAria.lightboxHiddenAttr(e), this.callEvent("onAfterLightbox", [])
            }, g.resetLightbox = function() {
                g._lightbox && !g._custom_lightbox && g._lightbox.parentNode.removeChild(g._lightbox), g._lightbox = null
            }, g.cancel_lightbox = function() {
                this._lightbox_id && this.callEvent("onEventCancel", [this._lightbox_id, this._new_event]), this.hide_lightbox()
            }, g.hideLightbox = g.cancel_lightbox, g._init_lightbox_events = function() {
                this.getLightbox().onclick = function(t) {
                    var e = t ? t.target : event.srcElement;
                    if (e.className || (e = e.previousSibling),
                        !(e && e.className && g._getClassName(e).indexOf("dhx_btn_set") > -1) || (e = e.querySelector("[dhx_button]"))) {
                        var i = g._getClassName(e);
                        if (e && i) switch (i) {
                            case "dhx_save_btn":
                                g.save_lightbox();
                                break;
                            case "dhx_delete_btn":
                                var n = g.locale.labels.confirm_deleting;
                                g._dhtmlx_confirm(n, g.locale.labels.title_confirm_deleting, function() {
                                    g.deleteEvent(g._lightbox_id), g._new_event = null, g.hide_lightbox()
                                });
                                break;
                            case "dhx_cancel_btn":
                                g.cancel_lightbox();
                                break;
                            default:
                                if (e.getAttribute("dhx_button")) g.callEvent("onLightboxButton", [i, e, t]);
                                else {
                                    var a, r, s; - 1 != i.indexOf("dhx_custom_button") && (-1 != i.indexOf("dhx_custom_button_") ? (a = e.parentNode.getAttribute("index"), s = e.parentNode.parentNode) : (a = e.getAttribute("index"), s = e.parentNode, e = e.firstChild)), a && (r = g.form_blocks[g.config.lightbox.sections[a].type], r.button_click(a, e, s, s.nextSibling))
                                }
                        }
                    }
                }, this.getLightbox().onkeydown = function(t) {
                    var e = t || window.event,
                        i = t.target || t.srcElement,
                        n = i.querySelector("[dhx_button]");
                    switch (n || (n = i.parentNode.querySelector(".dhx_custom_button, .dhx_readonly")), (t || e).keyCode) {
                        case 32:
                            if ((t || e).shiftKey) return;
                            n && n.click && n.click();
                            break;
                        case g.keys.edit_save:
                            if ((t || e).shiftKey) return;
                            n && n.click ? n.click() : g.save_lightbox();
                            break;
                        case g.keys.edit_cancel:
                            g.cancel_lightbox()
                    }
                }
            }, g.setLightboxSize = function() {
                var t = this._lightbox;
                if (t) {
                    var e = t.childNodes[1];
                    e.style.height = "0px",
                        e.style.height = e.scrollHeight + "px", t.style.height = e.scrollHeight + g.xy.lightbox_additional_height + "px", e.style.height = e.scrollHeight + "px"
                }
            }, g._init_dnd_events = function() {
                g.event(document.body, "mousemove", g._move_while_dnd), g.event(document.body, "mouseup", g._finish_dnd), g._init_dnd_events = function() {}
            }, g._move_while_dnd = function(t) {
                if (g._dnd_start_lb) {
                    document.dhx_unselectable || (document.body.className += " dhx_unselectable", document.dhx_unselectable = !0);
                    var e = g.getLightbox(),
                        i = t && t.target ? [t.pageX, t.pageY] : [event.clientX, event.clientY];
                    e.style.top = g._lb_start[1] + i[1] - g._dnd_start_lb[1] + "px", e.style.left = g._lb_start[0] + i[0] - g._dnd_start_lb[0] + "px"
                }
            }, g._ready_to_dnd = function(t) {
                var e = g.getLightbox();
                g._lb_start = [parseInt(e.style.left, 10), parseInt(e.style.top, 10)], g._dnd_start_lb = t && t.target ? [t.pageX, t.pageY] : [event.clientX, event.clientY]
            }, g._finish_dnd = function() {
                g._lb_start && (g._lb_start = g._dnd_start_lb = !1,
                    document.body.className = document.body.className.replace(" dhx_unselectable", ""), document.dhx_unselectable = !1)
            }, g.getLightbox = function() {
                if (!this._lightbox) {
                    var t = document.createElement("div");
                    t.className = "dhx_cal_light", g.config.wide_form && (t.className += " dhx_cal_light_wide"), g.form_blocks.recurring && (t.className += " dhx_cal_light_rec"), g.config.rtl && (t.className += " dhx_cal_light_rtl"), g.config.responsive_lightbox && (t.className += " dhx_cal_light_responsive"),
                        /msie|MSIE 6/.test(navigator.userAgent) && (t.className += " dhx_ie6"), t.style.visibility = "hidden";
                    for (var e = this._lightbox_template, i = this.config.buttons_left, n = "", a = 0; a < i.length; a++) n = this._waiAria.lightboxButtonAttrString(i[a]), e += "<div " + n + " class='dhx_btn_set dhx_" + (g.config.rtl ? "right" : "left") + "_btn_set " + i[a] + "_set'><div dhx_button='1' class='" + i[a] + "'></div><div>" + g.locale.labels[i[a]] + "</div></div>";
                    i = this.config.buttons_right;
                    for (var r = g.config.rtl, a = 0; a < i.length; a++) n = this._waiAria.lightboxButtonAttrString(i[a]), e += "<div " + n + " class='dhx_btn_set dhx_" + (r ? "left" : "right") + "_btn_set " + i[a] + "_set' style='float:" + (r ? "left" : "right") + ";'><div dhx_button='1' class='" + i[a] + "'></div><div>" + g.locale.labels[i[a]] + "</div></div>";
                    e += "</div>", t.innerHTML = e, g.config.drag_lightbox && (t.firstChild.onmousedown = g._ready_to_dnd, t.firstChild.onselectstart = function() {
                            return !1
                        }, t.firstChild.style.cursor = "move", g._init_dnd_events()),
                        this._waiAria.lightboxAttr(t), document.body.insertBefore(t, document.body.firstChild), this._lightbox = t;
                    var s = this.config.lightbox.sections;
                    e = "";
                    for (var a = 0; a < s.length; a++) {
                        var o = this.form_blocks[s[a].type];
                        if (o) {
                            s[a].id = "area_" + this.uid();
                            var d = "";
                            if (s[a].button) {
                                var n = g._waiAria.lightboxSectionButtonAttrString(this.locale.labels["button_" + s[a].button]);
                                d = "<div " + n + " class='dhx_custom_button' index='" + a + "'><div class='dhx_custom_button_" + s[a].button + "'></div><div>" + this.locale.labels["button_" + s[a].button] + "</div></div>"
                            }
                            this.config.wide_form && (e += "<div class='dhx_wrap_section'>");
                            var l = this.locale.labels["section_" + s[a].name];
                            "string" != typeof l && (l = s[a].name), e += "<div id='" + s[a].id + "' class='dhx_cal_lsection'>" + d + "<label>" + l + "</label></div>" + o.render.call(this, s[a]), e += "</div>"
                        }
                    }
                    for (var _ = t.getElementsByTagName("div"), a = 0; a < _.length; a++) {
                        var h = _[a];
                        if ("dhx_cal_larea" == g._getClassName(h)) {
                            h.innerHTML = e;
                            break
                        }
                    }
                    g._bindLightboxLabels(s), this.setLightboxSize(), this._init_lightbox_events(this), t.style.display = "none", t.style.visibility = "visible"
                }
                return this._lightbox
            }, g._bindLightboxLabels = function(t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    if (i.id && document.getElementById(i.id)) {
                        for (var n = document.getElementById(i.id), a = n.querySelector("label"), r = g._get_lightbox_section_node(i); r && !r.querySelector;) r = r.nextSibling;
                        var s = !0;
                        if (r) {
                            var o = r.querySelector("input, select, textarea");
                            o && (i.inputId = o.id || "input_" + g.uid(), o.id || (o.id = i.inputId), a.setAttribute("for", i.inputId), s = !1)
                        }
                        if (s) {
                            g.form_blocks[i.type].focus && (a.onclick = function(t) {
                                return function() {
                                    var e = g.form_blocks[t.type],
                                        i = g._get_lightbox_section_node(t);
                                    e && e.focus && e.focus.call(g, i)
                                }
                            }(i))
                        }
                    }
                }
            }, g.attachEvent("onEventIdChange", function(t, e) {
                this._lightbox_id == t && (this._lightbox_id = e)
            }),
            g._lightbox_template = "<div class='dhx_cal_ltitle'><span class='dhx_mark'>&nbsp;</span><span class='dhx_time'></span><span class='dhx_title'></span></div><div class='dhx_cal_larea'></div>", g._init_touch_events = function() {
                if ((this.config.touch && (-1 != navigator.userAgent.indexOf("Mobile") || -1 != navigator.userAgent.indexOf("iPad") || -1 != navigator.userAgent.indexOf("Android") || -1 != navigator.userAgent.indexOf("Touch")) && !window.MSStream || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1) && (this.xy.scroll_width = 0, this._mobile = !0), this.config.touch) {
                    var t = !0;
                    try {
                        document.createEvent("TouchEvent")
                    } catch (e) {
                        t = !1
                    }
                    t ? this._touch_events(["touchmove", "touchstart", "touchend"], function(t) {
                        return t.touches && t.touches.length > 1 ? null : t.touches[0] ? {
                            target: t.target,
                            pageX: t.touches[0].pageX,
                            pageY: t.touches[0].pageY,
                            clientX: t.touches[0].clientX,
                            clientY: t.touches[0].clientY
                        } : t
                    }, function() {
                        return !1
                    }) : window.PointerEvent || window.navigator.pointerEnabled ? this._touch_events(["pointermove", "pointerdown", "pointerup"], function(t) {
                        return "mouse" == t.pointerType ? null : t
                    }, function(t) {
                        return !t || "mouse" == t.pointerType
                    }) : window.navigator.msPointerEnabled && this._touch_events(["MSPointerMove", "MSPointerDown", "MSPointerUp"], function(t) {
                        return t.pointerType == t.MSPOINTER_TYPE_MOUSE ? null : t
                    }, function(t) {
                        return !t || t.pointerType == t.MSPOINTER_TYPE_MOUSE
                    })
                }
            }, g._touch_events = function(t, e, i) {
                function n(t, e, n) {
                    t.addEventListener(e, function(t) {
                        if (g._is_lightbox_open()) return !0;
                        if (!i(t)) return n(t)
                    }, {
                        passive: !1
                    })
                }

                function a(t, e, i, n) {
                    if (!t || !e) return !1;
                    for (var a = t.target; a && a != g._obj;) a = a.parentNode;
                    if (a != g._obj) return !1;
                    if (g.matrix && g.matrix[g.getState().mode]) {
                        if (g.matrix[g.getState().mode].scrollable) return !1
                    }
                    var r = Math.abs(t.pageY - e.pageY),
                        s = Math.abs(t.pageX - e.pageX);
                    return r < n && s > i && (!r || s / r > 3) && (t.pageX > e.pageX ? g._click.dhx_cal_next_button() : g._click.dhx_cal_prev_button(), !0)
                }

                function r(t) {
                    if (!i(t)) {
                        var e = g.getState().drag_mode,
                            n = !!g.matrix && g.matrix[g._mode],
                            a = g.render_view_data;
                        return "create" == e && n && (g.render_view_data = function() {
                            for (var t = g.getState().drag_id, e = g.getEvent(t), i = n.y_property, a = g.getEvents(e.start_date, e.end_date), r = 0; r < a.length; r++) a[r][i] != e[i] && (a.splice(r, 1), r--);
                            e._sorder = a.length - 1, e._count = a.length, this.render_data([e], g.getState().mode)
                        }), g._on_mouse_move(t), "create" == e && n && (g.render_view_data = a), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, !1
                    }
                }

                function s(t) {
                    i(t) || (g._hide_global_tip(), _ && (g._on_mouse_up(e(t || event)), g._temp_touch_block = !1), g._drag_id = null, g._drag_mode = null,
                        g._drag_pos = null, g._pointerDragId = null, clearTimeout(l), _ = c = !1, h = !0)
                }
                var o, d, l, _, h, c, u = (-1 != navigator.userAgent.indexOf("Android") && navigator.userAgent.indexOf("WebKit"), 0);
                n(document.body, t[0], function(t) {
                        if (!i(t)) {
                            var n = e(t);
                            if (n) {
                                if (_) return r(n), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, g._update_global_tip(), !1;
                                if (d = e(t), c) return d ? void((o.target != d.target || Math.abs(o.pageX - d.pageX) > 5 || Math.abs(o.pageY - d.pageY) > 5) && (h = !0, clearTimeout(l))) : void(h = !0)
                            }
                        }
                    }),
                    n(this._els.dhx_cal_data[0], "touchcancel", s), n(this._els.dhx_cal_data[0], "contextmenu", function(t) {
                        if (!i(t)) return c ? (t && t.preventDefault && t.preventDefault(), (t || event).cancelBubble = !0, !1) : void 0
                    }), n(this._obj, t[1], function(t) {
                        if (document && document.body && document.body.classList.add("dhx_cal_touch_active"), !i(t)) {
                            g._pointerDragId = t.pointerId;
                            var n;
                            if (_ = h = !1, c = !0, !(n = d = e(t))) return void(h = !0);
                            var a = new Date;
                            if (!h && !_ && a - u < 250) return g._click.dhx_cal_data(n), window.setTimeout(function() {
                                n.type = "dblclick", g._on_dbl_click(n)
                            }, 50), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, g._block_next_stop = !0, !1;
                            if (u = a, !h && !_ && g.config.touch_drag) {
                                var r = g._locate_event(document.activeElement),
                                    s = g._locate_event(n.target),
                                    f = o ? g._locate_event(o.target) : null;
                                if (r && s && r == s && r != f) return t.preventDefault && t.preventDefault(), t.cancelBubble = !0, g._ignore_next_click = !1, g._click.dhx_cal_data(n), o = n, !1;
                                l = setTimeout(function() {
                                    _ = !0;
                                    var t = o.target,
                                        e = g._getClassName(t);
                                    t && -1 != e.indexOf("dhx_body") && (t = t.previousSibling), g._on_mouse_down(o, t), g._drag_mode && "create" != g._drag_mode && g.for_rendered(g._drag_id, function(t, e) {
                                        t.style.display = "none", g._rendered.splice(e, 1)
                                    }), g.config.touch_tip && g._show_global_tip(), g.updateEvent(g._drag_id)
                                }, g.config.touch_drag), o = n
                            }
                        }
                    }), n(this._els.dhx_cal_data[0], t[2], function(t) {
                        if (document && document.body && document.body.classList.remove("dhx_cal_touch_active"),
                            !i(t)) return g.config.touch_swipe_dates && !_ && a(o, d, 200, 100) && (g._block_next_stop = !0), _ && (g._ignore_next_click = !0, setTimeout(function() {
                            g._ignore_next_click = !1
                        }, 100)), s(t), g._block_next_stop ? (g._block_next_stop = !1, t.preventDefault && t.preventDefault(), t.cancelBubble = !0, !1) : void 0
                    }), g.event(document.body, t[2], s)
            }, g._show_global_tip = function() {
                g._hide_global_tip();
                var t = g._global_tip = document.createElement("div");
                t.className = "dhx_global_tip", g._update_global_tip(1), document.body.appendChild(t)
            },
            g._update_global_tip = function(t) {
                var e = g._global_tip;
                if (e) {
                    var i = "";
                    if (g._drag_id && !t) {
                        var n = g.getEvent(g._drag_id);
                        n && (i = "<div>" + (n._timed ? g.templates.event_header(n.start_date, n.end_date, n) : g.templates.day_date(n.start_date, n.end_date, n)) + "</div>")
                    }
                    "create" == g._drag_mode || "new-size" == g._drag_mode ? e.innerHTML = (g.locale.labels.drag_to_create || "Drag to create") + i : e.innerHTML = (g.locale.labels.drag_to_move || "Drag to move") + i
                }
            }, g._hide_global_tip = function() {
                var t = g._global_tip;
                t && t.parentNode && (t.parentNode.removeChild(t), g._global_tip = 0)
            }, g._dp_init = function(t) {
                t._methods = ["_set_event_text_style", "", "_dp_change_event_id", "_dp_hook_delete"], this._dp_change_event_id = function(t, e) {
                        g.getEvent(t) && g.changeEventId(t, e)
                    }, this._dp_hook_delete = function(e, i) {
                        if (g.getEvent(e)) return i && e != i && ("true_deleted" == this.getUserData(e, t.action_param) && this.setUserData(e, t.action_param, "updated"), this.changeEventId(e, i)), this.deleteEvent(i, !0)
                    },
                    this.attachEvent("onEventAdded", function(e) {
                        !this._loading && this._validId(e) && t.setUpdated(e, !0, "inserted")
                    }), this.attachEvent("onConfirmedBeforeEventDelete", function(e) {
                        if (this._validId(e)) {
                            var i = t.getState(e);
                            return "inserted" == i || this._new_event ? (t.setUpdated(e, !1), !0) : "deleted" != i && ("true_deleted" == i || (t.setUpdated(e, !0, "deleted"), !1))
                        }
                    }), this.attachEvent("onEventChanged", function(e) {
                        !this._loading && this._validId(e) && t.setUpdated(e, !0, "updated")
                    }), g.attachEvent("onClearAll", function() {
                        t._in_progress = {}, t._invalid = {}, t.updatedRows = [], t._waitMode = 0
                    });
                var e = function(t, i, n) {
                        n = n || "", i = i || {};
                        for (var a in t) 0 !== a.indexOf("_") && (t[a] && t[a].getUTCFullYear ? i[n + a] = this.obj._helpers.formatDate(t[a]) : t[a] && "object" == typeof t[a] ? e.call(this, t[a], i, n + a + ".") : i[n + a] = t[a]);
                        return i
                    },
                    i = function(t) {
                        var e = g.utils.copy(t);
                        for (var n in e) 0 === n.indexOf("_") ? delete e[n] : e[n] && (e[n].getUTCFullYear ? e[n] = this.obj._helpers.formatDate(e[n]) : "object" == typeof e[n] && (e[n] = i(e[n])));
                        return e
                    };
                t._getRowData = function(t, n) {
                    var a = this.obj.getEvent(t);
                    return "JSON" == this._tMode ? i.call(this, a) : e.call(this, a)
                }, t._clearUpdateFlag = function() {}, t.attachEvent("insertCallback", g._update_callback), t.attachEvent("updateCallback", g._update_callback), t.attachEvent("deleteCallback", function(t, e) {
                    this.obj.getEvent(e) ? (this.obj.setUserData(e, this.action_param, "true_deleted"), this.obj.deleteEvent(e)) : this.obj._add_rec_marker && this.obj._update_callback(t, e)
                })
            }, g._validId = function(t) {
                return !0
            },
            g.setUserData = function(t, e, i) {
                if (t) {
                    var n = this.getEvent(t);
                    n && (n[e] = i)
                } else this._userdata[e] = i
            }, g.getUserData = function(t, e) {
                if (t) {
                    var i = this.getEvent(t);
                    return i ? i[e] : null
                }
                return this._userdata[e]
            }, g._set_event_text_style = function(t, e) {
                if (g.getEvent(t)) {
                    this.for_rendered(t, function(t) {
                        t.style.cssText += ";" + e
                    });
                    var i = this.getEvent(t);
                    i._text_style = e, this.event_updated(i)
                }
            }, g._update_callback = function(t, e) {
                var i = g._xmlNodeToJSON(t.firstChild);
                "none" == i.rec_type && (i.rec_pattern = "none"),
                    i.text = i.text || i._tagvalue, i.start_date = g._helpers.parseDate(i.start_date), i.end_date = g._helpers.parseDate(i.end_date), g.addEvent(i), g._add_rec_marker && g.setCurrentView()
            }, g.getRootView = function() {
                return {
                    view: {
                        render: function() {
                            return {
                                tag: "div",
                                type: 1,
                                attrs: {
                                    style: "width:100%;height:100%;"
                                },
                                hooks: {
                                    didInsert: function() {
                                        g.setCurrentView()
                                    }
                                },
                                body: [{
                                    el: this.el,
                                    type: 1
                                }]
                            }
                        },
                        init: function() {
                            var t = document.createElement("DIV");
                            t.id = "scheduler_" + g.uid(), t.style.width = "100%", t.style.height = "100%",
                                t.classList.add("dhx_cal_container"), t.cmp = "grid", t.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" name="day_tab"></div><div class="dhx_cal_tab" name="week_tab"></div><div class="dhx_cal_tab" name="month_tab"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>', g.init(t), this.el = t
                        }
                    },
                    type: 4
                }
            },
            g._skin_settings = {
                fix_tab_position: [1, 0],
                use_select_menu_space: [1, 0],
                wide_form: [1, 0],
                hour_size_px: [44, 42],
                displayed_event_color: ["#ff4a4a", "ffc5ab"],
                displayed_event_text_color: ["#ffef80", "7e2727"]
            }, g._skin_xy = {
                lightbox_additional_height: [90, 50],
                nav_height: [59, 22],
                bar_height: [24, 20]
            }, g._is_material_skin = function() {
                return g.skin ? (g.skin + "").indexOf("material") > -1 : c()
            };
        var A, S;
        window.addEventListener("DOMContentLoaded", f), window.addEventListener("load", f), g._border_box_events = function() {
                return u()
            }, g._configure = function(t, e, i) {
                for (var n in e) void 0 === t[n] && (t[n] = e[n][i])
            }, g._skin_init = function() {
                if (!g.skin)
                    for (var t = document.getElementsByTagName("link"), e = 0; e < t.length; e++) {
                        var i = t[e].href.match("dhtmlxscheduler_([a-z]+).css");
                        if (i) {
                            g.skin = i[1];
                            break
                        }
                    }
                var n = 0;
                if (!g.skin || "classic" !== g.skin && "glossy" !== g.skin || (n = 1), g._is_material_skin()) {
                    var a = g.config.buttons_left.$inital,
                        r = g.config.buttons_right.$inital;
                    if (a && g.config.buttons_left.slice().join() == a && r && g.config.buttons_right.slice().join() == r) {
                        var s = g.config.buttons_left.slice();
                        g.config.buttons_left = g.config.buttons_right.slice(), g.config.buttons_right = s
                    }
                    g.xy.event_header_height = 18, g.xy.week_agenda_scale_height = 35, g.xy.map_icon_width = 38, g._lightbox_controls.defaults.textarea.height = 64, g._lightbox_controls.defaults.time.height = "auto"
                }
                if (this._configure(g.config, g._skin_settings, n), this._configure(g.xy, g._skin_xy, n),
                    "flat" === g.skin && (g.xy.scale_height = 35, g.templates.hour_scale = function(t) {
                        var e = t.getMinutes();
                        return e = e < 10 ? "0" + e : e, "<span class='dhx_scale_h'>" + t.getHours() + "</span><span class='dhx_scale_m'>&nbsp;" + e + "</span>"
                    }), !n) {
                    var o = g.config.minicalendar;
                    o && (o.padding = 14), g.templates.event_bar_date = function(t, e, i) {
                        return "• <b>" + g.templates.event_date(t) + "</b> "
                    }, g.attachEvent("onTemplatesReady", function() {
                        var t = g.date.date_to_str("%d");
                        g.templates._old_month_day || (g.templates._old_month_day = g.templates.month_day);
                        var e = g.templates._old_month_day;
                        if (g.templates.month_day = function(i) {
                                if ("month" == this._mode) {
                                    var n = t(i);
                                    return 1 == i.getDate() && (n = g.locale.date.month_full[i.getMonth()] + " " + n), +i == +g.date.date_part(this._currentDate()) && (n = g.locale.labels.dhx_cal_today_button + " " + n), n
                                }
                                return e.call(this, i)
                            }, g.config.fix_tab_position) {
                            var i = g._els.dhx_cal_navline[0].getElementsByTagName("div"),
                                n = null,
                                a = 211,
                                r = [14, 75, 136],
                                s = 14;
                            g._is_material_skin() && (r = [16, 103, 192], a = 294, s = -1);
                            for (var o = 0; o < i.length; o++) {
                                var d = i[o],
                                    l = d.getAttribute("name");
                                if (l) {
                                    switch (d.style.right = "auto", l) {
                                        case "day_tab":
                                            d.style.left = r[0] + "px", d.className += " dhx_cal_tab_first";
                                            break;
                                        case "week_tab":
                                            d.style.left = r[1] + "px";
                                            break;
                                        case "month_tab":
                                            d.style.left = r[2] + "px", d.className += " dhx_cal_tab_last";
                                            break;
                                        default:
                                            d.style.left = a + "px", d.className += " dhx_cal_tab_standalone", a = a + s + d.offsetWidth
                                    }
                                    d.className += " " + l
                                } else 0 === (d.className || "").indexOf("dhx_minical_icon") && d.parentNode == g._els.dhx_cal_navline[0] && (n = d)
                            }
                            n && (n.style.left = a + "px")
                        }
                    }), g._skin_init = function() {}
                }
            }, window.jQuery && function(t) {
                var e = 0,
                    i = [];
                t.fn.dhx_scheduler = function(n) {
                    if ("string" != typeof n) {
                        var a = [];
                        return this.each(function() {
                            if (this && this.getAttribute)
                                if (this.getAttribute("dhxscheduler")) a.push(window[this.getAttribute("dhxscheduler")]);
                                else {
                                    var t = "scheduler";
                                    e && (t = "scheduler" + (e + 1), window[t] = Scheduler.getSchedulerInstance());
                                    var i = window[t];
                                    this.setAttribute("dhxscheduler", t);
                                    for (var r in n) "data" != r && (i.config[r] = n[r]);
                                    this.getElementsByTagName("div").length || (this.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>',
                                        this.className += " dhx_cal_container"), i.init(this, i.config.date, i.config.mode), n.data && i.parse(n.data), a.push(i), e++
                                }
                        }), 1 === a.length ? a[0] : a
                    }
                    if (i[n]) return i[n].apply(this, []);
                    t.error("Method " + n + " does not exist on jQuery.dhx_scheduler")
                }
            }(jQuery),
            function() {
                function t(t, e, i) {
                    e && (t._date = e), i && (t._mode = i)
                }
                var e = g.setCurrentView,
                    i = g.updateView,
                    n = null,
                    a = null,
                    r = function(e, r) {
                        var s = this;
                        window.clearTimeout(a), window.clearTimeout(n);
                        var o = s._date,
                            d = s._mode;
                        t(this, e, r), a = setTimeout(function() {
                            if (!s.callEvent("onBeforeViewChange", [d, o, r || s._mode, e || s._date])) return void t(s, o, d);
                            i.call(s, e, r), s.callEvent("onViewChange", [s._mode, s._date]), window.clearTimeout(n), a = 0
                        }, g.config.delay_render)
                    },
                    s = function(e, r) {
                        var s = this,
                            o = arguments;
                        t(this, e, r), window.clearTimeout(n), n = setTimeout(function() {
                            a || i.apply(s, o)
                        }, g.config.delay_render)
                    };
                g.attachEvent("onSchedulerReady", function() {
                    g.config.delay_render ? (g.setCurrentView = r, g.updateView = s) : (g.setCurrentView = e, g.updateView = i)
                })
            }();
        for (var k = 0; k < Scheduler._schedulerPlugins.length; k++) Scheduler._schedulerPlugins[k](g);
        return g._internal_id = Scheduler._seed++, Scheduler.$syncFactory && Scheduler.$syncFactory(g), g
    }, dhtmlx && dhtmlx.attaches && (dhtmlx.attaches.attachScheduler = function(t, e, i, n) {
        var i = i || '<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>',
            a = document.createElement("DIV");
        return a.id = "dhxSchedObj_" + this._genStr(12), a.innerHTML = '<div id="' + a.id + '" class="dhx_cal_container" style="width:100%; height:100%;"><div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>' + i + '</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div></div>', document.body.appendChild(a.firstChild), this.attachObject(a.id, !1, !0),
            this.vs[this.av].sched = n, this.vs[this.av].schedId = a.id, n.setSizes = n.updateView, n.destructor = function() {}, n.init(a.id, t, e), this.vs[this._viewRestore()].sched
    })
}();
