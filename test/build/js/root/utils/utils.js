"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 工具类 一些基础的公共类方法
 * @author create by heshang
 * */
utils.Dom = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, null, [{
        key: "getOuterHtml",

        /**
         *  将dom本身转换为html字符串
         *  @param node dom节点
         *
         * */
        value: function getOuterHtml(node) {
            var b = document.createElement("div");
            b.appendChild(node.cloneNode(true));
            return b.innerHTML;
        }

        /**
         *  将字符串转换为dom节点
         *  @param domstr html字符串
         * */

    }, {
        key: "parseDom",
        value: function parseDom(domstr) {
            var b = document.createElement("div");
            b.innerHTML = domstr;
            return b.children;
        }

        /**
         *获取属性的value
         * */

    }, {
        key: "getAttrValue",
        value: function getAttrValue(attr) {
            return attr.value;
        }

        /**
         * 獲取属性的nodeName
         * */

    }, {
        key: "getAttrNodeName",
        value: function getAttrNodeName(attr) {
            return attr.nodeName;
        }

        /**
         * 根据key获取对应的属性
         * */

    }, {
        key: "getBasic",
        value: function getBasic(tag, node, key) {
            var str = node.getAttribute(tag + key);
            // if (!base.reflex.debugger) {
            //     debugger;
            //     this.removeAttr(node, tag, key);
            // }
            return str ? str : "";
        }
    }, {
        key: "getAttr",
        value: function getAttr(node, key) {
            return this.getBasic("data-", node, key);
        }
    }, {
        key: "getEvt",
        value: function getEvt(node, key) {
            return this.getBasic("evt-", node, key);
        }
    }, {
        key: "getEvl",
        value: function getEvl(node, key) {
            return this.getBasic("evl-", node, key);
        }

        /**
         * 删除对应的attr
         * */

    }, {
        key: "removeAttr",
        value: function removeAttr(child, tag, key) {
            child.removeAttribute(tag + key);
        }
    }]);

    return _class;
}();
utils.Href = function () {
    function _class2() {
        _classCallCheck(this, _class2);
    }

    _createClass(_class2, null, [{
        key: "getQureryString",
        value: function getQureryString(key, href) {
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
            if (!href) {
                href = window.location.search;
            } else {
                href = "?" + href.split('?')[1];
            }
            var r = href.substr(1).match(reg);
            if (r != null) return r[2];
            return null;
        }
    }]);

    return _class2;
}();
utils.Ajax = function () {
    function _class3() {
        _classCallCheck(this, _class3);
    }

    _createClass(_class3, null, [{
        key: "post",
        value: function post(url, data, suc, error) {
            $.ajax({
                url: url,
                type: "post",
                data: data,
                dataType: "json",
                success: suc,
                error: error
            });
        }
    }, {
        key: "postFormData",
        value: function postFormData(url, fd, suc, error) {
            $.ajax({
                url: url,
                type: "POST",
                data: fd,
                processData: false,
                contentType: false,
                success: suc,
                error: error
            });
        }
    }, {
        key: "get",
        value: function get(url, data, suc, error) {
            $.ajax({
                url: url,
                type: "get",
                data: data,
                dataType: "json",
                success: suc,
                error: error
            });
        }
    }]);

    return _class3;
}();