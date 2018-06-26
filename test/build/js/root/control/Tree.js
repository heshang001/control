"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 主树控件
 * @param eventCycle 事件生命周期
 * @author create by taiduo
 * */
control.Tree = function (_control$Base) {
    _inherits(_class, _control$Base);

    function _class(eventCycle) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, eventCycle));

        _this.name = "Tree";
        _this.version = "1.0.0"; //控件的版本
        _this.author = "taiduo"; //控件的制作人
        //根节点
        _this._rootNode = null;
        //保存当前点击tree
        _this._selectItem = null;
        //保存上一个点击tree
        _this._selectPrevItem = null;
        //点击事件保存的tree
        _this._selectClickItem = null;
        //绑定html
        _this._html = $("<div class=\"controlTree\"></div>");
        //tree事件
        _this._bindEvent();
        return _this;
    }

    _createClass(_class, [{
        key: "addChild",


        /**
         * 添加对象作为此对象的子对象
         *  @param node 子对象必须是一个显示对象
         * */
        value: function addChild(node) {
            this.eventCycle.runEvent(base.EventBase.LOAD_BEFORE);
            node._parent = this;
            this._childList.push(node);
            if (node.dom && this.dom) {
                this.dom.appendChild(node.dom);
            }
            node.setControllerItem(node.guid, node.guid);
            node._rootNode = this;
            this.eventCycle.runEvent(base.EventBase.LOAD_COMPLETE);
        }
    }, {
        key: "_bindEvent",


        //绑定事件
        value: function _bindEvent() {
            //绑定html单击事件
            this.html.on("click", function (ev) {
                if (this._stopEvent(ev)) return;
                // control.Tree.initTargetNd(ev, this,'click');
                this.runEvent(base.EventBase.CLICK, this);
            }.bind(this));

            //绑定html双击事件
            this.html.on("dblclick", function (ev) {
                if (this._stopEvent(ev)) return;
                // control.Tree.initTargetNd(ev, this,'dblclick');
                this.runEvent(base.EventBase.DBLCLICK, this);
            }.bind(this));

            //绑定右击事件
            this.html.on("contextmenu", function (ev) {
                if (this._stopEvent(ev)) return;
                // control.Tree.initTargetNd(ev, this,'contextmenu');
                this.runEvent(base.EventBase.CONTEXTMENU, this);
            }.bind(this));

            //绑定拖拽事件
            var _cur = this;
            this.html.on("mousedown", function (ev) {
                if (this._stopEvent(ev)) return;
                // control.Tree.initTargetNd(ev, _cur,'mousedown');
                _cur.runEvent(base.EventBase.DRAGBEGIN, _cur);
                //移动开始
                document.onmousemove = function (event) {
                    _cur.runEvent(base.EventBase.DRAGMOVE, _cur);
                };
                //移动停止
                document.onmouseup = function () {
                    _cur.runEvent(base.EventBase.DRAGEND, _cur);
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }.bind(this));
        }

        //初始化事件触发节点

    }, {
        key: "_stopEvent",


        //阻止冒泡
        value: function _stopEvent(ev) {
            var _ev = ev || window.event;
            var _target = _ev.target || _ev.srcElement;
            if (ev.target.className.indexOf('spreadList') != -1) return 1;
        }

        //销毁事件

    }, {
        key: "destroySelfEvent",
        value: function destroySelfEvent() {
            this._html.off("click");
            this._html.off("dblclick");
            this._html.off("contextmenu");
            this._html.off("mousedown");
        }

        //销毁属性

    }, {
        key: "destroySelfProp",
        value: function destroySelfProp() {
            this._selectItem = null;
            this._selectPrevItem = null;
            this._selectClickItem = null;
            this._html = null;
        }
        //返回DOM

    }, {
        key: "selectItem",
        set: function set(item) {
            this._selectItem = item;
        },
        get: function get() {
            return this._selectItem;
        }
    }, {
        key: "selectPrevItem",
        set: function set(item) {
            this._selectPrevItem = item;
        },
        get: function get() {
            return this._selectPrevItem;
        }
    }, {
        key: "dom",
        get: function get() {
            var _nd = "";
            if (this.html) {
                _nd = this.html[0];
            }
            return _nd;
        }
    }], [{
        key: "initTargetNd",
        value: function initTargetNd(ev, cur, eventType) {
            var currentTreeItem = window.currentTreeItem || null;
            if (eventType == "click") {
                if (cur._selectClickItem) {
                    cur.selectPrevItem = cur._selectClickItem;
                }
                cur._selectClickItem = currentTreeItem;
            } else {
                cur.selectItem = currentTreeItem;
            }
        }
    }]);

    return _class;
}(control.Base);