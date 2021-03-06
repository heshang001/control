"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 事件句柄构造函数
 * @param call 回调方法
 * @param caller 回调的作用域
 * @param args 回调的参数
 * @example btn.click = base.Handler.create(fun,this,"我是按钮1");
 * @author create by heshang
 * */
base.Handler = function () {
    function _class(call, caller, args) {
        _classCallCheck(this, _class);

        this._tmp_call = call;
        this._tmp_caller = caller;
        this._tmp_args = args;

        this.runIndex = 0;
        this.stopIndex = 0;
        if (call) {
            this.call = this.runMine.bind(this);
        } else {
            this.call = null;
        }
        this.caller = caller;
        this.args = args;
        this.handlerList = [];
    }

    _createClass(_class, [{
        key: "runMine",
        value: function runMine() {
            this._tmp_call && this._tmp_call.call(this._tmp_caller, this._tmp_args);
            this.runIndex = 0;
            this.stopIndex = 0;
            this.runHandlerList();
        }

        /**
         * 阻止链条继续执行（阻止冒泡）
         * */

    }, {
        key: "stop",
        value: function stop() {
            this.stopIndex = this.runIndex;
            this.runIndex = this.handlerList.length;
        }

        /**
         *  从上次阻断的位置继续执行
         * */

    }, {
        key: "resume",
        value: function resume() {
            this.runIndex = this.stopIndex;
            this.runHandlerList();
            this.stopIndex = 0;
        }

        /**
         * 执行事件句柄的集合
         * */

    }, {
        key: "runHandlerList",
        value: function runHandlerList() {
            if (this.runIndex < this.handlerList.length) {
                var _handlerList$runIndex = this.handlerList[this.runIndex],
                    call = _handlerList$runIndex.call,
                    caller = _handlerList$runIndex.caller,
                    args = _handlerList$runIndex.args;

                call.call(caller, call, caller, args);
                this.runIndex++;
                this.runHandlerList();
            }
        }

        /**
         * 事件链条的执行方法可以无限追加，当之前事件句柄时自动追加。
         * @param handler 事件句柄
         * */

    }, {
        key: "next",
        value: function next(handler) {
            this.handlerList.push(handler);
            return this;
        }

        /**
         * static 静态方法 创建事件句柄
         * @param call 回调函数
         * @param caller 作用域
         * @param args 透传参数
         * */

    }], [{
        key: "create",
        value: function create(call, caller, args) {
            return new base.Handler(call, caller, args);
        }
    }]);

    return _class;
}();

/**
 * 生命周期的对象
 * @param createBefore  创建之前
 * @param createComplete 创建完成
 * @param loadedBefore  加载之前
 * @param loadedComplete 加载完成
 * @param destoryBefore 销毁之前
 * @param destroyComplete 销毁完成
 * @example var ec = new base.EventCyle(b,c,b1,c1,d,d1);
 * create by heshang
 * */
base.EventCycle = function () {
    function _class2(createBefore, createComplete, loadedBefore, loadedComplete, destoryBefore, destroyComplete) {
        _classCallCheck(this, _class2);

        this.debugger = false;
        this.parent = null;
        this.createBefore = createBefore;
        this.createComplete = createComplete;
        this.loadedBefore = loadedBefore;
        this.loadedComplete = loadedComplete;
        this.destoryBefore = destoryBefore;
        this.destroyComplete = destroyComplete;
    }

    _createClass(_class2, [{
        key: "getEvent",
        value: function getEvent(type) {
            var event = null;
            switch (type) {
                case base.EventBase.CREATE_BEFORE:
                    event = this.createBefore;
                    break;
                case base.EventBase.CREATE_COMPLETE:
                    event = this.createComplete;
                    break;
                case base.EventBase.LOAD_BEFORE:
                    event = this.loadedBefore;
                    break;
                case base.EventBase.LOAD_COMPLETE:
                    event = this.loadedComplete;
                    break;
                case base.EventBase.DESTORY_BEFORE:
                    event = this.destoryBefore;
                    break;
                case base.EventBase.DESTORY_COMPLETE:
                    event = this.destroyComplete;
                    break;
            }
            return event;
        }
    }, {
        key: "runEvent",
        value: function runEvent(type, args) {
            var event = this.getEvent(type);
            // if (this.debugger) {
            //     console.log(this.parent.name + " " + this.parent.guid + " run code " + type + " fun before");
            // }
            event && event.call.call(event.caller, event.args, args);
            if (this.debugger) {
                console.log(this.parent.author + " " + this.parent.name + " " + this.parent.guid + " run code " + type + " fun complete");
            }
        }
    }, {
        key: "setEvent",
        value: function setEvent(type, cycleEvent) {
            switch (type) {
                case base.EventBase.CREATE_BEFORE:
                    this.createBefore = cycleEvent;
                    break;
                case base.EventBase.CREATE_COMPLETE:
                    this.createComplete = cycleEvent;
                    break;
                case base.EventBase.LOAD_BEFORE:
                    this.loadedBefore = cycleEvent;
                    break;
                case base.EventBase.LOAD_COMPLETE:
                    this.loadedComplete = cycleEvent;
                    break;
                case base.EventBase.DESTORY_BEFORE:
                    this.destoryBefore = cycleEvent;
                    break;
                case base.EventBase.DESTORY_COMPLETE:
                    this.destroyComplete = cycleEvent;
                    break;
            }
        }
    }]);

    return _class2;
}();