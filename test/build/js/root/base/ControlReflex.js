"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 事件反射 将dom中的所有元素反射到框架中
 * @author create by heshang
 * */

base.ControlReflex = function () {
    function _class() {
        var _this = this;

        _classCallCheck(this, _class);

        this.debugger = false;
        this.call = null;
        this.caller = null;
        this.box = null;
        this._readyList = [];
        //todo document.onreadystatechange || docuemtn.ready
        var ie = !(window.attachEvent && !window.opera);
        if (!ie) {
            if (document.onreadystatechange) {
                document.onreadystatechange = function (e) {
                    if (document.readyState === "interactive") {
                        _this.init();
                    }
                };
            } else {
                document.ready = function () {
                    this.init();
                }.bind(this);
            }
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                _this.init();
            }, false);
        }
    }

    /**
     *  框架的入口函数
     *  @param handler 页面准备完毕的句柄，可以放置多个。
     * */


    _createClass(_class, [{
        key: "ready",
        value: function ready(handler) {
            this._readyList.push(handler);
        }

        /**
         * 反射初始化
         * */

    }, {
        key: "init",
        value: function init() {
            var box = new control.Box();
            var body = document.body.cloneNode(true);
            document.body.innerHTML = "";
            var dom = body.children;
            for (var i = 0; i < dom.length; i++) {
                this.build(dom[i], box);
            }
            this.box = box;
            document.body.appendChild(box.dom);
            this.runReadyList();
        }

        /**
         *  执行入口函数的监听
         * */

    }, {
        key: "runReadyList",
        value: function runReadyList() {
            for (var i in this._readyList) {
                var _readyList$i = this._readyList[i],
                    call = _readyList$i.call,
                    caller = _readyList$i.caller,
                    args = _readyList$i.args;
                // this.call && this.call.call(this.caller, box);

                call.call(caller, this.box, args);
            }
            this._readyList = null;
        }
    }, {
        key: "startBuild",
        value: function startBuild() {}

        /**
         * @param child 重铸dom对象
         * */

    }, {
        key: "build",
        value: function build(child, controlObj) {
            if (child.nodeName === "SCRIPT") {
                return;
            }
            var t = this.createControlAtt(child, controlObj);
            this.buildChildren(child.children, t);
        }
    }, {
        key: "buildChildren",
        value: function buildChildren(children, t) {
            if (children.length <= 0) {
                return;
            }
            for (var i = 0; i < children.length; i++) {
                this.build(children[i], t);
            }
        }
    }, {
        key: "checkReflex",
        value: function checkReflex(nodeName) {
            if (nodeName.indexOf("data-") > -1) {
                return true;
            }
            if (nodeName.indexOf("evt-") > -1) {
                return true;
            }
            return false;
        }

        /**
         *  @param child 子节点对象
         *  @param controlObj 控制逻辑对象
         * */

    }, {
        key: "createControlAtt",
        value: function createControlAtt(_child, controlObj) {
            var child = _child.cloneNode(false);
            var t = this.makeControl(child);
            for (var i = 0; i < child.attributes.length; i++) {
                var nodeName = utils.Dom.getAttrNodeName(child.attributes[i]);
                var val = utils.Dom.getAttrValue(child.attributes[i]);
                if (!this.checkReflex(nodeName) || this.debugger) t.dom.setAttribute(nodeName, val);
            }
            // if (t) {

            t.reflexDom(child, this);

            controlObj.addChild(t);
            // }
            return t;
        }

        /**
         * 根据自定义创建基于结构的对象
         * */

    }, {
        key: "makeControl",
        value: function makeControl(child) {
            try {
                var type = utils.Dom.getAttr(child, "control-type");
                if (!type) {
                    return new control.Base(child);
                }
                var a = eval("new " + type + "()");
                return a;
            } catch (e) {
                // let error = new Error("xx");
                var error = new Error("reflex dom is Error：" + ("" + utils.Dom.getOuterHtml(child)));
                error.stack = e.stack;
                // console.error(error);
                throw error;
            }
        }
    }]);

    return _class;
}();
base.reflex = new base.ControlReflex();