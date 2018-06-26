"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  控件的基础属性
 *  @param name 控件名称
 *  @param version 控件版本
 *  @param author 控件作者
 *  @param width 控件宽度
 *  @param height 控件高度
 *
 *  @author create by heshang
 * */
var base = {};
var control = {};
var compents = {};
var utils = {};
var errlog = {};

base.Controller = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, null, [{
        key: "getItemById",
        value: function getItemById(guid) {
            return this.boxObj[guid];
        }
    }, {
        key: "setItemById",
        value: function setItemById(guid, item) {
            this.boxObj[guid] = item;
        }
    }, {
        key: "delItemById",
        value: function delItemById(guid) {
            delete this.boxObj[guid];
        }
    }]);

    return _class;
}();
base.Controller.boxObj = {};

base.EventPrope = function () {
    function _class2() {
        _classCallCheck(this, _class2);

        this.debugger = true;
        base.EventPrope.control_un_id++; //全局唯一
        this._name = "";
        this._version = "0.0.1"; //控件的版本
        this._author = "";
        this._guid = 'control_' + base.EventPrope.control_un_id; //控件的唯一id

        this._tempDomStr = ""; //这个是优化拼接style属性的使用
        //todo  后期定义的控件的公共属性
        this._width = 100;
        this._height = 50;
        this._style = "";
        this._html = ""; //模板
        //增加的公共属性
        this._visibility = "visible";
        this._zindex = 0;
        this._tabindex = 0;
    }

    _createClass(_class2, [{
        key: "changeStyleStr",
        value: function changeStyleStr() {
            // this.dom.style
        }
    }, {
        key: "setControllerItem",
        value: function setControllerItem(oldG, newG) {

            base.Controller.delItemById(oldG);
            base.Controller.setItemById(newG, this);
            if (this.dom) {
                this.dom.setAttribute("data-guid", this._guid);
            }
        }
    }, {
        key: "tabindex",
        set: function set(t) {
            this._tabindex = t;
        },
        get: function get() {
            return this._tabindex;
        }
    }, {
        key: "dom",
        get: function get() {
            return "";
        }
    }, {
        key: "html",
        get: function get() {
            return this._html;
        }
    }, {
        key: "guid",
        get: function get() {
            return this._guid;
        },
        set: function set(g) {
            if (this.guid != g || this.guid != "") {
                this.setControllerItem(this._guid, g);
                this._guid = g;
            }
        }
    }, {
        key: "name",
        get: function get() {
            return this._name;
        },
        set: function set(n) {
            this._name = n;
        }
    }, {
        key: "version",
        get: function get() {
            return this._version;
        },
        set: function set(v) {
            this._version = v;
        }
    }, {
        key: "author",
        get: function get() {
            return this._author;
        },
        set: function set(a) {
            this._author = a;
        }
    }, {
        key: "width",
        get: function get() {
            return this._width;
        },
        set: function set(w) {
            this._width = w;
        }
    }, {
        key: "height",
        get: function get() {
            return this._height;
        },
        set: function set(h) {
            this._height = h;
        }
    }]);

    return _class2;
}();

base.EventPrope.control_un_id = 0;