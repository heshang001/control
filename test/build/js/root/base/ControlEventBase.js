"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *  带有事件处理的显示对象
 *  @param eventCycle 事件的生命周期
 *
 *  @author create by heshang
 * */
base.ControlEventBase = function (_base$ControlDisplayB) {
    _inherits(_class, _base$ControlDisplayB);

    function _class(eventCycle) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, eventCycle));

        _this._eventList = [];
        _this._event = [];
        _this._stop = false; //阻止冒泡
        return _this;
    }

    // noinspection JSAnnotator
    /**
     * 设置控件的点击事件
     * @param handler x
     * */


    _createClass(_class, [{
        key: "getEvent",


        //获取事件索引
        value: function getEvent(type, handler) {
            if (this._eventList[type]) {
                for (var i in this._eventList[type]) {
                    var _eventList$type$i = this._eventList[type][i],
                        call = _eventList$type$i.call,
                        caller = _eventList$type$i.caller,
                        args = _eventList$type$i.args;

                    if (handler.call == _call && handler.caller == _caller) {
                        return i;
                    }
                }
            }
            return -1;
        }

        /**
         * 绑定事件类型 同种类型只能绑定一个事件
         * @param type 事件的类型
         * @param handler 事件句柄
         * */

    }, {
        key: "onEvent",
        value: function onEvent(type, handler) {
            this._event[type] = handler;
        }

        /**
         * 执行绑定类型的事件
         * @param type 绑定的事件类型
         * @param _args 执行时要传入的参数
         * */

    }, {
        key: "runEvent",
        value: function runEvent(type, _args) {

            if (this._event[type]) {
                if (this._stop) {
                    this._stop = false;
                    return;
                }
                var _event$type = this._event[type],
                    call = _event$type.call,
                    caller = _event$type.caller,
                    args = _event$type.args;

                call && call.call(caller, _args, args);
            }
        }

        /**
         * 删除绑定的事件类型
         * @param type 删除指定的事件类型
         * @example btn.offEvent(base.EventBase);
         * */

    }, {
        key: "offEvent",
        value: function offEvent(type) {
            delete this._event[type];
        }

        /**
         * 事件委托  同一个事件类型可以绑定多个不同的事件句柄
         * @param type 事件类型
         * @param handler 事件的对象
         * @example btn.on("abc",handler1);
         * @example btn.on("abc",handler2);
         * */

    }, {
        key: "on",
        value: function on(type, handler) {
            var index = this.getEvent(type, handler);
            if (index != -1) {
                return;
            }
            if (!this._eventList[type]) {
                this._eventList[type] = [handler];
                return;
            }
            this._eventList[type].push(handler);
        }

        /**
         * 解绑 指定事件类型的 事件句柄
         * @param type 事件类型
         * @param handler 事件句柄
         * */

    }, {
        key: "off",
        value: function off(type, handler) {
            var index = -1;
            if (this._eventList[type]) {
                for (var i in this._eventList[type]) {
                    index = this.getEvent(type, handler);
                    if (index != -1) {
                        break;
                    }
                }
            }
            if (index >= 0) {
                delete this._eventList[type][index];
            }
        }

        /**
         * 绑定指定的事件类型，执行一次后自动解绑
         * @param type 事件类型
         * @param handler 事件句柄
         * */

    }, {
        key: "once",
        value: function once(type, handler) {
            function one() {
                handler.call && handler.call(handler.caller, handler.args);
                this.off(type, handler);
            }

            this.on(type, one, this);
        }

        /**
         * 派发指定作用域下的事件
         * @param type 事件类型
         * @param _args 派发的时候传的第二个参数
         * @param _caller 派发时指定的作用域 不写默认派发全部
         * */

    }, {
        key: "dispatch",
        value: function dispatch(type, _args, _caller) {
            if (this._eventList[type]) {
                if (this._stop) {
                    this._stop = false;
                    return;
                }
                for (var i in this._eventList[type]) {
                    var _eventList$type$i2 = this._eventList[type][i],
                        call = _eventList$type$i2.call,
                        caller = _eventList$type$i2.caller,
                        args = _eventList$type$i2.args;

                    if (!_caller || _caller == caller) {
                        call && call.call(caller, _args, args);
                    }
                }
            }
        }

        // -------------事件委托结束

    }, {
        key: "destorySelfEvent",
        value: function destorySelfEvent() {}
    }, {
        key: "destorySelf",
        value: function destorySelf() {
            this.destorySelfEvent();
            this.destorySelfProp();
        }

        /**
         * 销毁事件对象
         * */

    }, {
        key: "destory",
        value: function destory() {
            this._event = null;
            this._eventList = null;
            this.destorySelf();
            this.destoryDisplayBase();
        }

        /**
         * 根据dom节点把事件str反射到dom中
         * */

    }, {
        key: "createReflexEvent",
        value: function createReflexEvent(str) {
            return base.Handler.create(function () {
                eval(str);
            }, this);
        }

        /**
         *反射控件的公共事件
         * @param child dom节点
         * @param reflex 反射对象
         * */

    }, {
        key: "reflexEvent",
        value: function reflexEvent(child, reflex) {
            var click = utils.Dom.getEvt(child, "click");
            var onload = utils.Dom.getEvt(child, "onload");
            var change = utils.Dom.getEvt(child, "change");
            if (click) {
                this.click = this.createReflexEvent(click);
            }
            if (onload) {
                reflex.ready(this.createReflexEvent(onload));
            }
            if (change) {
                this.change = this.createReflexEvent(change);
            }
            this.reflexEventDefault(child, reflex);
        }

        /**
         * 从dom中反射控件独有的事件，控件内需要有自己事件是需要重写
         * @param child dom的节点
         * @param reflex 反射的对象
         * */

    }, {
        key: "reflexEventDefault",
        value: function reflexEventDefault(child, reflex) {}
    }, {
        key: "reflexDom",
        value: function reflexDom(child, reflex) {
            this.reflexProp(child, reflex);
            this.reflexEvent(child, reflex);
        }

        /**
         * 阻止冒泡
         * @example e.stop();
         * */

    }, {
        key: "stop",
        value: function stop() {
            if (this.parent && this.parent instanceof base.ControlEventBase) {
                this.parent.pstop();
            }
        }
    }, {
        key: "pstop",
        value: function pstop() {
            this._stop = true;
            this.stop();
        }

        //--------阻止冒泡结束

    }, {
        key: "click",
        set: function set(handler) {
            if (this._stop) {
                this._stop = false;
                return;
            }
            this.onEvent(base.EventBase.CLICK, handler);
        }

        /**
         * 设置控件的点击事件
         * @param handler x
         * */
        ,


        /**
         * 获取点击事件的句柄
         * @returns 事件句柄
         * */
        get: function get() {
            return this._event[base.EventBase.CLICK];
        }
    }, {
        key: "dblclick",
        set: function set(handler) {
            if (this._stop) {
                this._stop = false;
                return;
            }
            this.onEvent(base.EventBase.DBLCLICK, handler);
        }

        // noinspection JSAnnotator
        /**
         * 设置控件的改变事件
         * @param handler x
         * */

    }, {
        key: "change",
        set: function set(handler) {
            if (this._stop) {
                this._stop = false;
                return;
            }
            this.onEvent(base.EventBase.CHANGE, handler);
        }

        /**
         * 设置控件的右击事件
         * @param handler x
         * */

    }, {
        key: "contextmenu",
        set: function set(handler) {
            if (this._stop) {
                this._stop = false;
                return;
            }
            this.onEvent(base.EventBase.CONTEXTMENU, handler);
        }

        /**
         * 设置控件的拖拽开始事件
         * @param handler x
         * */

    }, {
        key: "dragbegin",
        set: function set(handler) {
            if (this._stop) {
                this._stop = false;
                return;
            }
            this.onEvent(base.EventBase.DRAGBEGIN, handler);
        }

        /**
         * 设置控件的拖拽移动事件
         * @param handler x
         * */

    }, {
        key: "dragmove",
        set: function set(handler) {
            if (this._stop) {
                this._stop = false;
                return;
            }
            this.onEvent(base.EventBase.DRAGMOVE, handler);
        }

        /**
         * 设置控件的拖拽结束事件
         * @param handler x
         * */

    }, {
        key: "dragend",
        set: function set(handler) {
            if (this._stop) {
                this._stop = false;
                return;
            }
            this.onEvent(base.EventBase.DRAGEND, handler);
        }
    }]);

    return _class;
}(base.ControlDisplayBase);