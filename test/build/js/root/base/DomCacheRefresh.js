"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 缓存刷新dom类 单例 全局唯一控制
 * @author create by heshang
 * */
base.DomCacheRefresh = function () {
    function _class() {
        _classCallCheck(this, _class);

        this.styleList = [];
        this.tempT = null;
        this.freshNum = 0;
        this.startFreshCount = 100; //开始刷新的上限，达到上线后立即刷新style
        this.delayMs = 20; //延迟刷新style的毫秒数
    }

    /**
     *  单例类的对象
     * */


    _createClass(_class, [{
        key: "addStyle",


        /**
         * 添加对象属性进缓存池
         * @param control 对象
         * @param key 属性名称 || hash列表
         * @param value 属性名称对应的属性值
         * */
        value: function addStyle(control, key, value) {
            if (!this.styleList[control.guid]) {
                var style = {};
                for (var i in control.dom.style) {
                    if (control.dom.style[i] && typeof control.dom.style[i] != "function") {
                        style[i] = control.dom.style[i];
                    }
                }
                this.styleList[control.guid] = { control: control, style: style };
            }
            if (typeof key === "string") {
                this.styleList[control.guid].style[key] = value;
            } else {
                for (var _i in key) {
                    this.styleList[control.guid].style[_i] = key[_i];
                }
            }

            this.startRefresh();
        }

        /**
         * 检测是否需要刷新 当需要刷新的缓存数量超过上线 或者小于定期刷新的事件间隔 执行刷新
         * */

    }, {
        key: "startRefresh",
        value: function startRefresh() {
            this.freshNum++;
            if (this.freshNum >= this.startFreshCount) {
                this.fresh();
                return;
            }
            clearTimeout(this.tempT);
            this.tempT = setTimeout(function () {
                this.fresh();
            }.bind(this), this.delayMs);
        }

        /**
         * 刷新dom属性
         * */

    }, {
        key: "fresh",
        value: function fresh() {
            this.freshNum = 0;
            clearTimeout(this.tempT);
            this.tempT = null;
            for (var i in this.styleList) {
                var control = this.styleList[i].control;
                var style = this.styleList[i].style;
                var str = JSON.stringify(style);
                str = str.replace(/\"/g, "");
                str = str.replace(/\{/g, "");
                str = str.replace(/\}/g, "");
                str = str.replace(/\,/g, ";");
                control.dom.style = str;
            }
            this.styleList = [];
        }
    }], [{
        key: "instance",
        get: function get() {
            return this._instance || (this._instance = new base.DomCacheRefresh());
        }
    }]);

    return _class;
}();
base.DomCacheRefresh._instance = null;