'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

control.ImgButton = function (_control$Base) {
    _inherits(_class, _control$Base);

    function _class() {
        var normorl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var over = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var down = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        var text = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
        var ev = arguments[4];

        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, ev));

        _this.name = "ImgButton"; //控件的名称
        _this.version = "1.0.0"; //控件的版本
        _this.author = "fengche"; //控件的制作人
        _this._text = text; //控间文本
        _this._normorl = normorl; //控间默认背景图显示
        _this._over = over; //控间划过背景图显示
        _this._down = down; //控间鼠标落下背景图显示
        _this._bgSrc = normorl; //控间默认的背景图
        _this._align = 'left'; //控间文本位置  接收所有text-align属性值
        _this._vertical = 'top'; //控间文本位置  接收所有text-vertical属性值
        _this._divDom = $('<div style="position:absolute">' + _this._text + '</div>');
        var html = $('<button class="button" data-guid="' + _this.guid + '" style="position: relative; border: null; padding:0; margin: 0;"></button>');
        html.append(_this._divDom);
        _this._html = html;
        _this._bindEvent();
        return _this;
    }

    _createClass(_class, [{
        key: 'reflexPropSelf',
        value: function reflexPropSelf(child, reflex) {
            var normorl = utils.Dom.getAttr(child, "normorl");
            var over = utils.Dom.getAttr(child, "over");
            var down = utils.Dom.getAttr(child, "down");
            var width = utils.Dom.getAttr(child, "width");
            var height = utils.Dom.getAttr(child, "height");
            var align = utils.Dom.getAttr(child, "align");
            var vertical = utils.Dom.getAttr(child, "vertical");
            this.normorl = normorl;
            this.over = over;
            this.down = down;
            this.width = width;
            this.height = height;
            this.align = align;
            this._bgSrc = normorl;
            this.vertical = vertical;
        }

        /**
         * 设置按钮的默认背景
         * @param n 按钮上的显默认背景
         * */

    }, {
        key: 'offClick',
        value: function offClick() {}
    }, {
        key: '_bindEvent',
        value: function _bindEvent() {
            this._html.on("click", function () {
                this.runEvent(base.EventBase.CLICK, this);
            }.bind(this));

            this._html.on("mouseover", function () {
                this._bgSrc = this._over;
                this._html.css({ 'background': 'url(' + this._bgSrc + ') no-repeat', "background-size": '100% 100%' });
                this.runEvent(base.EventBase.MOUSE_OVER, this);
            }.bind(this));

            this._html.on("mouseout", function () {
                this._bgSrc = this._normorl;
                this._html.css({ 'background': 'url(' + this._bgSrc + ') no-repeat', "background-size": '100% 100%' });
                this.runEvent(base.EventBase.MOUSE_OUT, this);
            }.bind(this));

            this._html.on("mousedown", function () {
                this._bgSrc = this._down;
                this._html.css({ 'background': 'url(' + this._bgSrc + ') no-repeat', "background-size": '100% 100%' });
                this.runEvent(base.EventBase.MOUSE_DOWN, this);
            }.bind(this));

            this._html.on("mouseup", function () {
                this._bgSrc = this._over;
                this._html.css({ 'background': 'url(' + this._bgSrc + ') no-repeat', "background-size": '100% 100%' });
                this.runEvent(base.EventBase.MOUSE_UP, this);
            }.bind(this));
        }

        /**
         * 获取dom的显示对象
         * @returns 获取此控件的jsdom对象
         * */

    }, {
        key: 'destorySelfProp',
        value: function destorySelfProp() {
            this._normorl = null;
            this._over = null;
            this._down = null;
            this._width = null;
            this._height = null;
            this._align = null;
            this._bgSrc = null;
            this._vertical = null;
            this._divDom = null;
            this._html = null;
        }
    }, {
        key: 'destorySelfEvent',
        value: function destorySelfEvent() {
            this._html.off('mouseup').off('mouseout').off('mousedown').off('mouseover').off('click');
        }
    }, {
        key: 'normorl',
        set: function set(n) {
            this._normorl = n;
            this._bgSrc = n;
            this._html.css("background", 'url(' + this._bgSrc + ') no-repeat');
            this._html.css("background-size", '100% 100%');
        }
        /**
         * 设置按钮的划过背景
         * @param o 按钮上的显划过背景
         * */

    }, {
        key: 'over',
        set: function set(o) {
            this._over = o;
        }
        /**
         * 设置按钮的鼠标落下背景
         * @param d 按钮上的显鼠标落下背景
         * */

    }, {
        key: 'down',
        set: function set(d) {
            this._down = d;
        }
        /**
         * 设置按钮宽度
         * @param t 按钮宽度
         * */

    }, {
        key: 'width',
        set: function set(w) {
            this._width = w;
            this._html.css("width", w);
            this._divDom.css('width', w);
        },
        get: function get() {
            return this._width;
        }

        /**
         * 设置按钮高度
         * @param h 按钮高度
         * */

    }, {
        key: 'height',
        set: function set(h) {
            this._height = h;
            this._html.css("height", h);
        },
        get: function get() {
            return this._height;
        }
        /**
         * 设置按钮的文字上下位置
         * @param v 按钮上文字上下位置
         * */

    }, {
        key: 'vertical',
        set: function set(v) {
            this._vertical = v;
            if (v == 'top') {
                this._divDom.css('top', 0);
                this._divDom.css('transform', 'translateY(0)');
            } else if (v == 'middle') {
                this._divDom.css('top', '50%');
                this._divDom.css('transform', 'translateY(-50%)');
            } else if (v == 'bottom') {
                this._divDom.css('top', '100%');
                this._divDom.css('transform', 'translateY(-100%)');
            } else {
                console.warn('您输入的值有误， 请重新输入');
                return;
            }
        },
        get: function get() {
            return this._vertical;
        }
        /**
         * 设置按钮的文字左右位置
         * @param a 按钮上文字左右位置
         * */

    }, {
        key: 'align',
        set: function set(a) {
            if (a === 'left' || a === "center" || a === 'right') {
                this._align = a;
                this._divDom.css('text-align', a);
            } else {
                console.warn('您输入的值有误， 请重新输入');
                return;
            }
        },
        get: function get() {
            return this._align;
        }
    }, {
        key: 'mouseout',
        set: function set(handler) {
            this._event[base.EventBase.MOUSE_OUT] = handler;
        }
    }, {
        key: 'mouseover',
        set: function set(handler) {
            this._event[base.EventBase.MOUSE_OVER] = handler;
        }
    }, {
        key: 'mousedown',
        set: function set(handler) {
            this._event[base.EventBase.MOUSE_DOWN] = handler;
        }
    }, {
        key: 'mouseup',
        set: function set(handler) {
            this._event[base.EventBase.MOUSE_UP] = handler;
        }
    }, {
        key: 'dom',
        get: function get() {
            return this._html[0];
        }

        /**
         * 设置按钮的显示文本
         * @param t 按钮上的显示文本
         * */

    }, {
        key: 'text',
        set: function set(t) {
            this._text = t;
            this._divDom.text(t);
        },
        get: function get() {
            return this._text;
        }
    }]);

    return _class;
}(control.Base);