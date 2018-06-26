"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 基础的文本显示对象
 *  @param text 文本对象
 *  @param eventCycle 生命周期
 *  @author create by heshang
 * */
control.Label = function (_control$Base) {
    _inherits(_class, _control$Base);

    function _class() {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var eventCycle = arguments[1];

        _classCallCheck(this, _class);

        var _this2 = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, eventCycle));

        _this2.name = "Label";
        _this2.version = "1.0.0"; //控件的版本
        _this2.author = "heshang"; //控件的制作人
        var _this = _this2;
        _this2.vuebox = $("<div id=\"box_" + _this2.guid + "\"></div>");
        _this2.data = {
            msg: text
        };
        _this2._html = "<span data-guid=\"" + _this2.guid + "\" ref=\"myBox\" @click=\"click\">{{msg}}</span>";
        return _this2;
    }

    _createClass(_class, [{
        key: "checkVue",
        value: function checkVue() {
            if (!this.vue) {
                var _this = this;
                if (this.parent) {
                    this.parent.dom.appendChild(this.vuebox[0]);
                } else {
                    document.body.appendChild(this.vuebox[0]);
                }
                this.vue = new Vue({
                    el: "#box_" + this.guid,
                    template: this.html,
                    data: function data() {
                        return _this.data;
                    },

                    methods: {
                        click: function click() {
                            _this.runEvent(base.EventBase.CLICK, _this);
                        }
                    }
                });
            }
        }
    }, {
        key: "dom",
        get: function get() {
            this.checkVue();
            return this.vue.$refs.myBox;
        }
    }, {
        key: "text",
        set: function set(s) {
            this.data.msg = s;
        },
        get: function get() {
            return this.data.msg;
        }
    }]);

    return _class;
}(control.Base);