"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 子树控件
 * @param eventCycle 事件生命周期
 * @param config 配置文件
 * @example 1: 通过js去实例化实现: new control.TreeItem(null,{
                                    icon:'rhombus',             //左侧tree icon的样式
                                    text:"first",               //中间tree  文本
                                    spreadBtn:1                 //右侧tree 是否显示按钮去控制显示子树 如果不需要就默认不写参数
                                })
 * @example 2:DOM绑定           <treeItem data-control-type="control.TreeItem" data-icon="triangleRight" data-text="我的作品"  data-spreadBtn="1"></treeItem>
 * @author create by taiduo
 * */
control.TreeItem = function (_control$Base) {
    _inherits(_class, _control$Base);

    function _class(eventCycle, config) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, eventCycle));

        _this.name = "TreeItem";
        _this.version = "1.0.0"; //控件的版本
        _this.author = "taiduo"; //控件的制作人
        //设置参数对象
        _this._config = config || {};
        //设置icon
        _this._icon = _this._config.icon || null;
        //设置tree文本
        _this._text = _this._config.text || null;
        //设置伸缩按钮
        _this._spreadBtn = _this._config.spreadBtn || null;
        //获取当前类
        var _parent = control.TreeItem;
        //根节点
        _this._rootNode = null;
        //绑定icon
        _this._treeIconNd = $(_parent.createIcon(_this._icon));
        //绑定展开按钮
        _this._treeSpreadBtnNd = $(_parent.createSpreadBtn(_this._spreadBtn));
        //绑定tree名称
        _this._treeTextNd = $("<span>" + _this._text + "</span>");
        var _tree = $("<div class=\"controlTree-context\" ></div>");
        _tree.prepend(_this._treeIconNd);
        _tree.append(_this._treeTextNd);
        _tree.append(_this._treeSpreadBtnNd);
        //创建tree
        _this._tree = _tree;
        var html = $("<div class=\"controlTree-main\"></div>");
        html.append(_tree);
        //绑定html
        _this._html = html;
        //绑定点击事件  展开自己的子级列表
        _this._bindClick();
        //tree绑定事件 
        _this._bindEvent();
        return _this;
    }

    _createClass(_class, [{
        key: "addChild",


        //重写addChild  为了保存当前元素的根元素
        value: function addChild(node) {
            this.eventCycle.runEvent(base.EventBase.LOAD_BEFORE);
            node._parent = this;
            this._childList.push(node);
            if (node.dom && this.dom) {
                this.dom.appendChild(node.dom);
            }
            node.setControllerItem(node.guid, node.guid);
            node._rootNode = this._rootNode;
            this.eventCycle.runEvent(base.EventBase.LOAD_COMPLETE);
        }
    }, {
        key: "reflexPropSelf",
        value: function reflexPropSelf(child, reflex) {
            var icon = utils.Dom.getAttr(child, "icon");
            this.icon = icon;
            var spreadBtn = utils.Dom.getAttr(child, "spreadBtn");
            this.spreadBtn = spreadBtn;
        }
        //创建tree的icon

    }, {
        key: "_bindClick",


        //绑定点击事件  展开自己的子级列表
        value: function _bindClick() {
            var nd_spreadList = this._treeSpreadBtnNd;
            if (!nd_spreadList) return;
            nd_spreadList.on('click', function (ev) {
                this.spreadTree();
            }.bind(this));
        }

        //绑定事件

    }, {
        key: "_bindEvent",
        value: function _bindEvent() {
            //绑定html单击事件
            this.tree.on("click", function () {

                this.saveCurrent("click");
            }.bind(this));

            //绑定html双击事件
            this.tree.on("dblclick", function () {
                this.saveCurrent("dblclick");
            }.bind(this));

            //绑定右击事件
            this.tree.on("contextmenu", function () {
                this.saveCurrent("contextmenu");
            }.bind(this));

            //绑定拖拽事件
            this.tree.on("mousedown", function () {
                this.saveCurrent("mousedown");
                //移动开始
                document.onmousemove = function (event) {};
                //移动停止
                document.onmouseup = function () {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }.bind(this));
        }

        //保存当前this  便于给Tree使用

    }, {
        key: "saveCurrent",
        value: function saveCurrent(eventType) {
            var currentTreeItem = this;
            var _rootNode = this._rootNode;
            if (eventType == "click") {
                if (_rootNode._selectClickItem) {
                    _rootNode.selectPrevItem = _rootNode._selectClickItem;
                }
                _rootNode._selectClickItem = currentTreeItem;
            } else {
                _rootNode.selectItem = currentTreeItem;
            }
        }

        /** 
         * 伸展子结构
         * @example this.selectItem.spreadTree();
        */

    }, {
        key: "spreadTree",
        value: function spreadTree() {
            var nd_spreadList = this._treeSpreadBtnNd;
            if (nd_spreadList.hasClass('active')) {
                nd_spreadList.removeClass("active");
                this.childList.forEach(function (item) {
                    item._html.show();
                });
            } else {
                this.childList.forEach(function (item) {
                    item._html.hide();
                });
                nd_spreadList.addClass("active");
            }
        }

        /** 
         * 设置样式
         * @example 1:this.selectItem.treeStyle('border',"1px solid #000");
         * @example 2:this.selectItem.treeStyle({font-size:"20px",'border':"1px solid #000"});
        */

    }, {
        key: "treeStyle",
        value: function treeStyle(property, value) {
            if (property.constructor == Object) {
                this.tree.css(property);
            } else {
                this.tree.css(property, value);
            }
        }

        //销毁事件

    }, {
        key: "destroySelfEvent",
        value: function destroySelfEvent() {
            this._treeSpreadBtnNd.off("click");
            this.tree.off("click");
            this.tree.off("dblclick");
            this.tree.off("contextmenu");
            this.tree.off("mousedown");
        }

        //销毁属性

    }, {
        key: "destroySelfProp",
        value: function destroySelfProp() {
            //销毁参数对象
            this._config = {};
            //销毁icon
            this._icon = null;
            //销毁tree文本
            this._text = null;
            //销毁伸缩按钮
            this._spreadBtn = null;

            this._treeIconNd = null;
            this._treeSpreadBtnNd = null;
            this._treeTextNd = null;
            this._tree = null;
            this._html = null;
        }

        //返回DOM

    }, {
        key: "tree",
        set: function set(t) {
            this._tree = tree;
        },
        get: function get() {
            return this._tree;
        }
    }, {
        key: "text",
        set: function set(t) {
            this._text = t;
            this._treeTextNd.text(t);
        },
        get: function get() {
            return this._text;
        }
    }, {
        key: "icon",
        set: function set(icon) {
            this._icon = icon;
            this._treeIconNd = $(control.TreeItem.createIcon(icon));
            this.tree.prepend(this._treeIconNd);
        }
    }, {
        key: "spreadBtn",
        set: function set(spreadbtn) {
            this._spreadBtn = spreadbtn;
            this._treeSpreadBtnNd = $(control.TreeItem.createSpreadBtn(spreadbtn));
            this.tree.append(this._treeSpreadBtnNd);
            this._bindClick();
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
        key: "createIcon",
        value: function createIcon(icon) {
            var _iconNd = null;
            //icon集合
            var _icon = {
                rhombus: "./images/rhombus.png", //rhombus
                triangleRight: "./images/triangle-right.png"
                //图标
            };if (icon) {
                _iconNd = "<img src=" + _icon[icon] + "    />";
            }
            return _iconNd;
        }
        //创建tree的展开按钮

    }, {
        key: "createSpreadBtn",
        value: function createSpreadBtn(spreadBtn) {
            var btn = null;
            //展开按钮
            if (spreadBtn) {
                btn = "<span class=\"spreadList\"></span>";
            }
            return btn;
        }
    }]);

    return _class;
}(control.Base);