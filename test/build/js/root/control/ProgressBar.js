"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * progressBar 进度条
 * @param obj  配置参数
 * @param eventCycle  事件生命周期 
 * @example 1.  DOM反射
        * <progressBar data-control-type="control.ProgressBar" data-progressVal='15'></progressBar>
 * @example 2. 实例化
 *      new control.ProgressBar({
            isShowProgressVal: false,                                    //是否显示进度值          默认true
            progressVal: 60,                                             //进度值                  *必填
            progressTime: 1000,                                          //动画完成所需要的时间     默认1000
            progressBarStyle: control.ProgressBar.SINGLECOLOR_STYLE,     //进度条样式              默认单色
            progressValStyle: control.ProgressBar.PERTOP_STYLE,          // 进度值样式             默认中间
            progressDesc: '开始加载'                                      // 进度值的描述内容(进度值的样式在上方时会有)      默认空
        });
 * @author create by hehe
 * */
control.ProgressBar = function (_control$Base) {
    _inherits(_class, _control$Base);

    function _class() {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var eventCycle = arguments[1];

        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, eventCycle));

        _this.name = "ProgressBar";
        _this.version = "1.0.0";
        _this.author = "hehe;";

        _this._html = $("<div class=\"progressBar\"></div>");
        _this.progressBgDom = $("<div class=\"progressBar-bg\"></div>");
        _this.barDom = $("<div class=\"progressBar-progress\"></div>");
        _this.progressValDom = $("<span class=\"progressBar-val\"></span>");
        _this.progressBgDom.append(_this.barDom);
        _this._html.append(_this.progressBgDom);
        _this._html.append(_this.progressValDom);
        // 进度条底色样式
        _this._progressBarStyle = obj.progressBarStyle || control.ProgressBar.SINGLECOLOR_STYLE;
        // 进度条样式
        _this._progressValStyle = obj.progressValStyle || control.ProgressBar.PERCENTER_STYLE;
        // 进度值
        _this._progressVal = obj.progressVal || 0;
        // 是否显示进度值
        _this._isShowProgressVal = obj.isShowProgressVal || false;
        // 多少时间展示完
        _this._progressTime = obj.progressTime || 1000;
        // 实时进度值 
        _this._progresFlag = 0;
        // 进度值描述
        _this._progressDesc = obj.progressDesc || '';

        _this.init();
        return _this;
    }

    _createClass(_class, [{
        key: "init",
        value: function init() {
            this.progressBarStyle = this._progressBarStyle;
            this.progressValStyle = this._progressValStyle;
            this.progressVal = this._progressVal;
            this.isShowProgressVal = this._isShowProgressVal;
        }
        /** 
         * @returns 获取获取实时进度值
         * */

    }, {
        key: "reflexPropSelf",
        value: function reflexPropSelf(child, reflex) {
            var progressVal = utils.Dom.getAttr(child, "progressVal");
            var isShowProgressVal = utils.Dom.getAttr(child, "isShowProgressVal");
            var progressTimeVal = utils.Dom.getAttr(child, "progressTime");
            var progressBarStyleVal = utils.Dom.getAttr(child, "progressBarStyle");
            var progressValStyleVal = utils.Dom.getAttr(child, "progressValStyle");
            var progressDescVal = utils.Dom.getAttr(child, "progressDesc");

            this.progressVal = eval(progressVal);
            this.isShowProgressVal = eval(isShowProgressVal);
            this.progressTime = eval(progressTimeVal);
            this.progressBarStyle = eval(progressBarStyleVal);
            this.progressValStyle = eval(progressValStyleVal);
            this.progressDesc = eval(progressDescVal);
        }
        /**
         * 获取dom的显示对象
         * @returns 获取此控件的jsdom对象
         * */

    }, {
        key: "destroySelfEvent",


        // 销毁事件
        value: function destroySelfEvent() {
            this._html.off("change");
        }
        // 销毁属性

    }, {
        key: "destroySelfProp",
        value: function destroySelfProp() {
            this._progressBarStyle = null;
            this._progressValStyle = null;
            this._progressVal = null;
            this._isShowProgressVal = null;
            this._progressTime = null;
            this._progresFlag = null;
            this._progressDesc = null;
            this._html = null;
        }
    }, {
        key: "progresFlag",
        get: function get() {
            return this._progresFlag;
        }

        /** 
         * @returns 获取进度值描述
         * */

    }, {
        key: "progressDesc",
        get: function get() {
            return this._progressDesc || '';
        }
        /**
         * 设置进度描述
         * @param v 进度值描述 
         * */
        ,
        set: function set(v) {
            this._progressDesc = v;
            this.progressValDom.text(v + this._progresFlag + '%');
        }

        /** 
         * @returns 获取是否显示进度值
         * */

    }, {
        key: "isShowProgressVal",
        get: function get() {
            return this._isShowProgressVal;
        }
        /** 
         * @param v 是否显示进度值
         * */
        ,
        set: function set(v) {
            this._isShowProgressVal = v;
            var isShow = v ? 'none' : 'block';
            this.progressValDom.css('display', isShow);
        }
        /** 
         * @returns 获取进度值
         * */

    }, {
        key: "progressVal",
        get: function get() {
            return this._progressVal;
        }
        /** 
         * @param v 进度值
         * */
        ,
        set: function set(v) {
            var _this2 = this;

            var oldVal = this._progressVal;
            this._progressVal = v > 100 ? 100 : v;
            var speed;
            if (oldVal != this.progressVal) {
                speed = Math.abs(this.progressVal - oldVal);
            } else {
                speed = this.progressVal;
            }
            // 进度值以+1累加
            var time = parseInt(this._progressTime / speed) || 500;
            var Timer = setInterval(function () {
                if (_this2._progresFlag == _this2._progressVal) {
                    clearInterval(Timer);
                    return;
                } else if (_this2._progresFlag > _this2._progressVal) {
                    --_this2._progresFlag;
                } else if (_this2._progresFlag < _this2._progressVal) {
                    ++_this2._progresFlag;
                }
                _this2.runEvent(base.EventBase.CHANGE);
                _this2.progressValDom.text(_this2.progressDesc + _this2._progresFlag + '%');
                _this2.barDom.stop();
                _this2.progressValDom.stop();
            }, time);
            // 改变进度条宽，进度值
            setTimeout(function () {
                _this2.barDom.css({ 'width': _this2.html.width() * (_this2._progressVal / 100), 'transition-duration': _this2._progressTime / 1000 + 's' });
                if (_this2._progressValStyle == control.ProgressBar.PERCENTER_STYLE) {
                    _this2.progressValDom.css({ 'left': _this2.html.width() * (_this2._progressVal / 100) - 20, 'transition-duration': _this2._progressTime / 1000 + 's' });
                }
            }, 0);
        }

        /**
         * 设置进度条样式
         * @param v 进度条的样式
         *:     1：单色皮肤
                2：渐变皮肤 
         * */

    }, {
        key: "progressBarStyle",
        set: function set(v) {
            var _v = v - 0;
            switch (_v) {
                case control.ProgressBar.SINGLECOLOR_STYLE:
                    this.html.removeClass("progressBar-barStyle-Gradual");
                    this.html.addClass("progressBar-barStyle-singleColor");
                    break;
                case control.ProgressBar.GRADUAL_STYLE:
                    this.html.removeClass("progressBar-barStyle-singleColor");
                    this.html.addClass("progressBar-barStyle-Gradual");
                    break;
                default:
                    this.html.addClass("progressBar-barStyle-singleColor");
                    break;
            }
        }
        /**
         * 设置进度值样式
         * @param v 进度值的样式
         *:     1：悬浮上面
                2：悬浮中间
                3：悬浮右面
         * */

    }, {
        key: "progressValStyle",
        set: function set(v) {
            switch (v) {
                case control.ProgressBar.PERTOP_STYLE:
                    this.progressValDom.removeClass("progressBar-percentStyle-center progressBar-percentStyle-right");
                    this.progressValDom.addClass("progressBar-percentStyle-top");
                    break;
                case control.ProgressBar.PERCENTER_STYLE:
                    this.progressValDom.removeClass("progressBar-percentStyle-top progressBar-percentStyle-right");
                    this.progressValDom.addClass("progressBar-percentStyle-center");
                    break;
                case control.ProgressBar.PERRIGHT_STYLE:
                    this.progressValDom.removeClass("progressBar-percentStyle-top progressBar-percentStyle-center");
                    this.progressValDom.addClass("progressBar-percentStyle-right");
                    break;
                default:
                    if (v) {
                        console.log(v);
                        // 设置的自定义样式
                        this.progressValDom.removeClass("progressBar-percentStyle-top progressBar-percentStyle-center progressBar-percentStyle-right");
                        this.progressValDom.addClass(v);
                    } else {
                        console.log(v);
                        this.progressValDom.addClass("progressBar-percentStyle-top");
                    }
                    break;
            }
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
        key: "dom",
        get: function get() {
            return this._html[0];
        }
    }]);

    return _class;
}(control.Base);
control.ProgressBar.SINGLECOLOR_STYLE = 1;
control.ProgressBar.GRADUAL_STYLE = 2;

control.ProgressBar.PERTOP_STYLE = 1;
control.ProgressBar.PERCENTER_STYLE = 2;
control.ProgressBar.PERRIGHT_STYLE = 3;