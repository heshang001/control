"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

control.Slider = function (_control$Base) {
    _inherits(_class, _control$Base);

    function _class() {
        var direc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var innerSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { width: 394, height: 24 };
        var outerSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { width: 400, height: 30 };
        var sliderSize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : { width: 40, height: 40 };
        var heartShow = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
        var eventCycle = arguments[6];

        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, eventCycle));

        _this.name = 'Slider';
        _this.version = "1.0.0"; //控件的版本
        _this.author = "liaohen"; //控件的制作人'
        _this._direction = direc;
        _this._value = val;
        _this._innerSize = innerSize;
        _this._outerSize = outerSize;
        _this._sliderSize = sliderSize;
        _this._heartShow = heartShow;
        _this._outerDom = $("<div></div>");
        _this._innerDom = $("<div></div>");
        _this._heartDom = $("<div></div>");
        _this._sliderDom = $("<div></div>");
        _this._heartDom.append(_this._sliderDom);
        _this._innerDom.append(_this._heartDom);
        _this._outerDom.append(_this._innerDom);
        _this._heartSize = {
            width: Number.parseInt(innerSize.width * 0.05),
            height: Math.ceil(Number.parseInt(innerSize.height * 0.8) / 2) * 2
        };
        _this._bindEvent();
        _this._sizeInit();
        _this._valInit();
        return _this;
    }

    _createClass(_class, [{
        key: "_bindEvent",
        value: function _bindEvent() {
            var _this2 = this;

            var dataX = void 0,
                dataY = void 0,
                sliderNow = void 0,
                heartNow = void 0,
                lenXMax = null;
            this._sliderDom[0].addEventListener('mousedown', function (e) {
                _this2._heartDom[0].style.transition = 'none';
                _this2._sliderDom[0].style.transition = 'none';
                dataX = e.clientX - _this2._sliderDom[0].offsetLeft;
                dataY = e.clientY - _this2._sliderDom[0].offsetLeft;
                sliderNow = _this2._sliderDom[0];
                heartNow = _this2._heartDom[0];
                lenXMax = _this2._outerDom[0].offsetWidth - _this2._sliderDom[0].offsetWidth / 2;
                var mousemoveFn = function mousemoveFn(e) {
                    e.preventDefault();
                    if (_this2._direction) {
                        var rangeX = e.clientX - dataX;
                        if (rangeX < 0) {
                            rangeX = 0;
                        } else if (rangeX > lenXMax) {
                            rangeX = lenXMax;
                        }
                        sliderNow.style.left = rangeX + 'px';
                        heartNow.style.width = rangeX + 'px';
                    } else {
                        var rangeY = e.clientY - dataY;
                        if (rangeY < 0) {
                            rangeY = 0;
                        } else if (rangeY > lenXMax) {
                            rangeY = lenXMax;
                        }
                        sliderNow.style.left = rangeY + 'px';
                        heartNow.style.width = rangeY + 'px';
                    }
                    _this2._value = Number.parseInt(heartNow.offsetWidth * 100 / lenXMax);
                    _this2.runEvent(base.EventBase.CHANGE, _this2);
                };
                document.addEventListener('mousemove', mousemoveFn, false);
                document.addEventListener('mouseup', function (e) {
                    _this2.runEvent(base.EventBase.CHANGE, _this2);
                    sliderNow = heartNow = null;
                    document.removeEventListener('mousemove', mousemoveFn, false);
                    e.preventDefault();
                }, false);
            }, false);
            this._outerDom[0].addEventListener('mousedown', function (e) {
                lenXMax = _this2._outerDom[0].offsetWidth - _this2._sliderDom[0].offsetWidth / 2;
                var posNowL = e.clientX - _this2._heartDom[0].getBoundingClientRect().left < 0 ? 0 : e.clientX - _this2._heartDom[0].getBoundingClientRect().left;
                var posNowT = e.clientY - _this2._heartDom[0].getBoundingClientRect().top < 0 ? 0 : e.clientY - _this2._heartDom[0].getBoundingClientRect().top;
                var sliderL = _this2._sliderDom[0].offsetLeft;
                var sliderR = sliderL + _this2._sliderDom[0].offsetWidth;
                var formPercentFn = function formPercentFn(arg, LMax) {
                    var res = Number.parseInt(arg * 100 / LMax) > 100 ? 100 : Number.parseInt(arg * 100 / LMax) > 0 ? Number.parseInt(arg * 100 / LMax) : 0;
                    return res;
                };
                if (_this2._direction) {
                    if (posNowL < sliderL || posNowL > sliderR) {
                        _this2._sliderDom[0].style.left = posNowL + "px";
                        _this2._heartDom[0].style.width = posNowL + "px";
                        _this2._heartDom[0].style.transition = '0.5s';
                        _this2._sliderDom[0].style.transition = '0.5s';
                        _this2._value = formPercentFn(posNowL, lenXMax);
                    }
                } else {
                    if (posNowT < sliderL || posNowT > sliderR) {
                        _this2._sliderDom[0].style.left = posNowT + "px";
                        _this2._heartDom[0].style.width = posNowT + "px";
                        _this2._heartDom[0].style.transition = '0.5s';
                        _this2._sliderDom[0].style.transition = '0.5s';
                        _this2._value = formPercentFn(posNowT, lenXMax);
                    }
                }
                _this2.runEvent(base.EventBase.CHANGE, _this2);
            });
        }
    }, {
        key: "_sizeInit",
        value: function _sizeInit() {
            var _ref = ["width:" + this._innerSize.width + "px;height:" + this._innerSize.height + "px;", "width:" + this._outerSize.width + "px;height:" + this._outerSize.height + "px;", "width:" + this._sliderSize.width + "px;height:" + this._sliderSize.height + "px;", "width:" + this._heartSize.width + "px;height:" + this._heartSize.height + "px;"];
            this._innerDom[0].style.cssText = _ref[0];
            this._outerDom[0].style.cssText = _ref[1];
            this._sliderDom[0].style.cssText = _ref[2];
            this._heartDom[0].style.cssText = _ref[3];

            this._innerDom.addClass('normal_inner');
            this._outerDom.addClass('normal_outer');
            this._sliderDom.addClass('normal_slider');
            this._heartDom.addClass('normal_heart');
            if (!this._direction) {
                this._outerDom.addClass('VERTICAL_SHOW');
            }
            if (!this._heartShow) {
                this._heartDom.addClass('HEART_SHOW');
            }
        }
    }, {
        key: "_valInit",
        value: function _valInit() {
            this._heartSize.width = this._innerSize.width * this._value / 100;
            this._heartDom[0].style.width = this._value + '%';
            var argNum = this._sliderSize.width / 2;
            this._sliderDom[0].style.left = Number.parseInt(this._heartSize.width - argNum) + 'px';
        }
    }, {
        key: "destorySelfProp",

        /**
         * 删除自身的属性
         * */
        value: function destorySelfProp() {
            this._direction = null;
            this._value = null;
            this._innerSize = null;
            this._outerSize = null;
            this._sliderSize = null;
            this._heartShow = null;
            this._outerDom = null;
            this._innerDom = null;
            this._heartDom = null;
            this._sliderDom = null;
            this._heartSize = null;
        }
        /////////test svn111
        /**
         *删除自身的事件
         * */

    }, {
        key: "destorySelfEvent",
        value: function destorySelfEvent() {
            this._sliderDom.off("mousedown");
            this._outerDom.off("mousedown");
        }
    }, {
        key: "change",
        set: function set(handler) {
            if (this._stop) {
                this._stop = false;
                return;
            }
            this.onEvent(base.EventBase.CHANGE, handler);
        }
    }, {
        key: "width",
        get: function get() {
            return this._outerDom[0].offsetWidth;
        },
        set: function set(t) {
            return null;
        }
    }, {
        key: "direction",
        get: function get() {
            return this._direction;
        },
        set: function set(t) {
            this._direction = Boolean(t);
            if (!this._direction) {
                this._outerDom.addClass('VERTICAL_SHOW');
            } else {
                this._outerDom.removeClass('VERTICAL_SHOW');
            }
        }
    }, {
        key: "value",
        get: function get() {
            return this._value;
        },
        set: function set(t) {
            this._value = Number.parseInt(t) > 100 ? 100 : Number.parseInt(t) < 0 ? 0 : Number.parseInt(t);
            this._valInit();
            this.runEvent(base.EventBase.CHANGE, this);
        }
    }, {
        key: "outerSize",
        get: function get() {
            return this._outerSize;
        },
        set: function set(json) {
            var _ref2 = [json.width, json.height];
            this._outerSize.width = _ref2[0];
            this._outerSize.height = _ref2[1];

            this._outerDom[0].style.cssText = "width:" + this._outerSize.width + "px;height:" + this._outerSize.height + "px;";
            this._outerDom.addClass('normal_outer');
        }
    }, {
        key: "innerSize",
        get: function get() {
            return this._innerSize;
        },
        set: function set(json) {
            var _ref3 = [json.width, json.height];
            this._innerSize.width = _ref3[0];
            this._innerSize.height = _ref3[1];

            this._innerDom[0].style.cssText = "width:" + this._innerSize.width + "px;height:" + this._innerSize.height + "px;";
            this._innerDom.addClass('normal_inner');
        }
    }, {
        key: "sliderSize",
        get: function get() {
            return this._sliderSize;
        },
        set: function set(json) {
            var _ref4 = [json.width, json.height];
            this._sliderSize.width = _ref4[0];
            this._outerSize.height = _ref4[1];

            this._sliderDom[0].style.cssText = "width:" + this._sliderSize.width + "px;height:" + this._sliderSize.height + "px;";
            this._sliderDom.addClass('normal_slider');
        }
    }, {
        key: "heartShow",
        get: function get() {
            return this._heartShow;
        },
        set: function set(t) {
            this._heartShow = Boolean(t);
            if (!this._heartShow) {
                this._heartDom.addClass('HEART_SHOW');
            } else {
                this._heartDom.removeClass('HEART_SHOW');
            }
        }
    }, {
        key: "innerStyle",
        set: function set(t) {
            this._innerDom.addClass(t);
        }
    }, {
        key: "outerStyle",
        set: function set(t) {
            this._outerDom.addClass(t);
        }
    }, {
        key: "sliderStyle",
        set: function set(t) {
            this._sliderDom.addClass(t);
        }
    }, {
        key: "heartStyle",
        set: function set(t) {
            this._heartDom.addClass(t);
        }
    }, {
        key: "dom",
        get: function get() {
            return this._outerDom[0];
        }
    }]);

    return _class;
}(control.Base);