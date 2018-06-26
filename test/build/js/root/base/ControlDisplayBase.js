"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *  基础的显示对象
 *  @param eventCycle 此按钮的生命周期对象
 *  @type null
 *  @author create by heshang
 * */
base.ControlDisplayBase = function (_base$EventPrope) {
    _inherits(_class, _base$EventPrope);

    function _class(eventCycle) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this._eventCycle = eventCycle; //生命周期
        _this._childList = []; //子对象的集合
        _this._parent = null; //父对象
        _this.type = ""; //控件的类型
        _this._styleCache = base.DomCacheRefresh.instance;
        //todo 目前这个做到了公用的里面 作者信息是拿不到的
        _this.eventCycle.runEvent(base.EventBase.CREATE_BEFORE); //对象创建完成
        return _this;
    }

    /**
     *设置控件内的公共属性
     * @param config 事件的配置
     * @example {text:"xxx",guid:"xxxx"}
     * */


    _createClass(_class, [{
        key: "getChildAt",


        /**
         *根据子对象索引获取子对象
         * @param index 子对象索引值
         * @returns 子对象
         * */
        value: function getChildAt(index) {
            return this._childList[index];
        }

        /**
         *根据子对象id查找对象
         * @param guid 对象的唯一id
         * @returns 子对象
         * */

    }, {
        key: "getChildById",
        value: function getChildById(guid) {
            for (var i in this.childList) {
                if (this.childList[i].guid === guid) {
                    return this.childList[i];
                }
            }
            return null;
        }

        /**
         * 将属性反射到对象上
         * @param child 节点对象
         * @param reflex 反射对象
         * */

    }, {
        key: "reflexProp",
        value: function reflexProp(child, reflex) {
            var guid = utils.Dom.getAttr(child, "guid");
            var text = utils.Dom.getAttr(child, "text");
            var config = utils.Dom.getAttr(child, "config");
            if (guid) {
                this.guid = guid;
            } else {
                this.guid = this.guid;
            }
            if (text) {
                // if(text.indexOf('.')>-1){
                //     text = text.split('.');
                //     text[0]="i";
                //     let str=""
                //     str = `${text[0]}.${text[1]}`;
                //     text=i? str: '';
                //     this.text = eval(text);
                // } else {
                this.text = text;
                // }
            }
            if (config) {
                this.config = eval(config);
            }
            this.reflexPropSelf(child, reflex);
        }

        /**
         * 从dom中反射控件独有的属性，控件内需要有自己的反射属性是需要重写
         * @param child dom的节点
         * @param reflex 反射的对象
         * */

    }, {
        key: "reflexPropSelf",
        value: function reflexPropSelf(child, reflex) {}
    }, {
        key: "reflexDom",
        value: function reflexDom(child, reflex) {
            this.reflexProp(child, reflex);
        }
    }, {
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
            this.eventCycle.runEvent(base.EventBase.LOAD_COMPLETE);
        }

        /**
         * 删除此对象的所有子对象
         * */

    }, {
        key: "removeAllChild",
        value: function removeAllChild() {
            for (var i in this._childList) {
                this._childList[i].destory();
            }
            this._childList = null;
        }

        /**
         * 删除此对象本身的渲染逻辑，物理逻辑还存在可以再次添加
         * */

    }, {
        key: "removeSelfUI",
        value: function removeSelfUI() {
            if (this.parent) {
                this.parent.dom.removeChild(this.dom);
            }
        }

        /**
         * 销毁显示对象内的所有UI、及生命周期
         * */

    }, {
        key: "destoryDisplayBase",
        value: function destoryDisplayBase() {
            this.eventCycle.runEvent(base.EventBase.DESTORY_BEFORE);
            this.removeAllChild();
            this.removeSelfUI();
            this._parent = null;
            this.eventCycle.runEvent(base.EventBase.DESTORY_COMPLETE);
            this._eventCycle = null;
        }

        /**
         * 销毁自身所有的额外的事件跟变量
         * */

    }, {
        key: "destorySelfProp",
        value: function destorySelfProp() {}
    }, {
        key: "destorySelf",
        value: function destorySelf() {
            this.destorySelfProp();
        }

        /**
         * 销毁对象
         * */

    }, {
        key: "destory",
        value: function destory() {
            this.destorySelf();
            this.destoryDisplayBase();
        }

        //加载完成

    }, {
        key: "loadComplete",
        value: function loadComplete() {
            this.eventCycle.runEvent(base.EventBase.LOAD_COMPLETE);
        }

        /**
         * 设置属性 改变dom
         * @param key 属性名称 || 是一个哈希列表
         * @param val 属性名称对应的值
         * @example a.style({"position":"absolute","margin-top":"0px"})
         * @example a.style("position","absolute");
         * */

    }, {
        key: "style",
        value: function style(key, val) {
            this._styleCache.addStyle(this, key, val);
        }

        /**
         * 元素的visibility属性
         * @param v visible默认，元素框是可见的。 hidden元素框不可见，但仍然影响布局。 collapse当在表格元素中使用时，此值可删除一行或一列，但是它不会影响表格的布局。被行或列占据的空间会留给其他内容使用。如果此值被用在其他的元素上，会呈现为 "hidden"。
         * @example a.visibility = "visible";
         * */

    }, {
        key: "config",
        set: function set(config) {
            for (var i in config) {
                if (typeof this[i] != "undefined") this[i] = config[i];else {
                    if (this.debugger) {
                        console.warn(this.type + (" prop" + i + " is not defined"));
                    }
                }
            }
        }

        /**
         *获取此显示对象的生命周期
         * @returns 生命周期
         * */

    }, {
        key: "eventCycle",
        get: function get() {
            if (!this._eventCycle) {
                this._eventCycle = new base.EventCycle();
            }
            if (!this._eventCycle.parent) {
                this._eventCycle.parent = this;
            }
            return this._eventCycle;
        }

        /**
         *获取此显示对象的子对象
         * @returns 子对象集合列表
         * */

    }, {
        key: "childList",
        get: function get() {
            return this._childList;
        }
    }, {
        key: "dom",
        get: function get() {
            return null;
        }

        /**
         * 获取此对象的父对象
         * */

    }, {
        key: "parent",
        get: function get() {
            return this._parent;
        }
    }, {
        key: "visibility",
        set: function set(v) {
            this.style("visibility", v);
            this._visibility = v;
        },
        get: function get() {
            return this._visibility;
        }

        /**
         * 设置元素的zindex
         * @param z 显示的层级
         * */

    }, {
        key: "zindex",
        set: function set(z) {
            this.style("zIndex", z);
            this._zindex = z;
        },
        get: function get() {
            return this._zindex;
        }
    }, {
        key: "width",
        set: function set(w) {
            this.style("width", w);
            this._width = w;
        },
        get: function get() {
            return this._width;
        }

        //设置属性 改变dom  end

    }]);

    return _class;
}(base.EventPrope);