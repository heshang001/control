"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 图片控件
 * 
 * @author wuji
 */
control.Image = function (_control$Base) {
    _inherits(_class, _control$Base);

    /**
     * 
     * @param {宽} width 
     * @param {高} height 
     * @param {周期状态} eventCycle 
     */
    function _class(width, height, eventCycle) {
        _classCallCheck(this, _class);

        // this._canvasDom = $("<canvas></canvas>");
        var _this2 = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, eventCycle));

        _this2._imgDom = $("<img>");
        _this2._width = width || "0px";
        _this2._height = height || "0px";
        _this2._imgDom.attr("width", (width || 0) + "px");
        _this2._imgDom.attr("height", (height || 0) + "px");
        _this2._src = "";
        _this2._html = $("<span></span>");
        // this._context = this._canvasDom[0].getContext("2d");
        // this._getLocation = false;
        // this._getPixel = false;
        if (!width) {
            _this2._widthSetted = false;
        }
        if (!height) {
            _this2._heightSetted = false;
        }

        _this2._html.append(_this2._imgDom);
        _this2._bindEvent();
        return _this2;
    }

    _createClass(_class, [{
        key: "_bindEvent",
        value: function _bindEvent() {
            var _this = this;
            this._imgDom.on("click", function (ev) {
                // console.log(ev);
                console.log(this);
                console.log(_this);
                // this.getPixelData(ev.offsetX,ev.offsetY);
            });
            // this._canvasDom.on("mousemove",function(ev){
            // _this.getPixel(ev.offsetX,ev.offsetY);
            // this.onpixel(1,2,3,4);
            // console.log("ev.offsetX:",ev.offsetX,"  ev.offsetY:",ev.offsetY);
            // })
        }

        // getPixelData(x,y){
        //     let data = this._context.getImageData(x,y,1,1);
        //     return data;
        // }

    }, {
        key: "getPixelData",
        value: function getPixelData(x, y) {
            if (this._src && this._src !== "") {
                var image = new Image();
                var canvasDes = document.createElement("canvas");
                image.onload = function () {
                    if (!this._widthSetted) {
                        canvasDes.attr("width", this._width + "px");
                    }
                    if (!_this._heightSetted) {
                        canvasDes.attr("height", this._height + "px");
                    }
                    console.log("width is:", this._width, " height is:", this._height);
                    var contextCan = canvasDes[0].getContext("2d");
                    return contextCan.getImageDate(x, y, 1, 1);
                };
            } else {
                return null;
            }
        }
    }, {
        key: "reflexPropSelf",
        value: function reflexPropSelf(child, reflex) {
            console.log("child is:::", child);
            var width = utils.Dom.getAttr(child, "showWidth");
            if (width && width !== "") {
                this._widthSetted = true;
                this._imgDom.attr("width", width);
            }

            var height = utils.Dom.getAttr(child, "showHeight");
            if (height && height !== "") {
                this._heightSetted = true;
                this._imgDom.attr("height", height);
            }

            var src = utils.Dom.getAttr(child, "showSrc");
            // console.log("set src::::::",src);
            this._imgDom.attr("src", src);
        }
        // get getLocation(){
        //     return this._getLocation;
        // }

        // set getLocation(value){
        //     this._getLocation = value;
        // }

        // get getPixel(){
        //     return this._getPixel;
        // }

        // set getPixel(value){
        //     this._getPixel = value;
        // }

    }, {
        key: "showSrc",
        get: function get() {
            return this._src;
        },
        set: function set(src) {
            this._src = src;
            this._imgDom.attr("src", src);
        }
    }, {
        key: "showWidth",
        get: function get() {
            return this._width;
        },
        set: function set(width) {
            this._width = width;
            this._widthSetted = true;
            this._imgDom.attr("width", width);
        }
    }, {
        key: "showHeight",
        get: function get() {
            return this._height;
        },
        set: function set(height) {
            this._height = height;
            this._heightSetted = true;
            this._imgDom.attr("height", height);
        }
    }]);

    return _class;
}(control.Base);