"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

errlog.Error = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, null, [{
        key: "throwError",
        value: function throwError(a, b, c, d, e) {
            var divMask = void 0;
            var divDialog = void 0;
            var divTitle = void 0;
            var divContent = void 0;

            function createMask() {
                divMask = $("<div></div>");
                divMask.css({
                    "position": "absolute",
                    "width": "100%",
                    "height": "100%",
                    "top": 0,
                    "left": 0,
                    "backgroundColor": "black",
                    "opacity": .8,
                    "zIndex": 999
                });
                $("body").append(divMask);
            }

            function createDialog() {
                divDialog = $("<div></div>");
                divDialog.css({
                    "position": "absolute",
                    "width": "500px",
                    "height": "400px",
                    "top": "50%",
                    "left": "50%",
                    "border-radius": "30px",
                    "transform": "translate(-50%,-50%)",
                    "backgroundColor": "white",
                    "zIndex": 999,
                    "overflow": "auto"
                });
            }

            function createTitle() {
                divTitle = $("<div></div>");
                divTitle.text("错误提示⚠");
                divTitle.css({
                    "fontWeight": "bold",
                    "fontSize": "18px",
                    "text-align": "center",
                    "marginTop": "15px"
                });
                divDialog.append(divTitle);
            }

            function createContent() {
                divContent = $("<div style=\"font-size: 14px;padding:25px\">\n                                <div>\n                                    <span>\u9519\u8BEF\u4FE1\u606F:</span>\n                                    <span style=\"color:red\">" + a + "</span>\n                                </div>\n                                <div>\n                                    <span>\u9519\u8BEF\u5806\u6808:</span>\n                                    <span style=\"color:red\">" + (e && e.stack) + "</span>\n                                </div>\n                                <div>\n                                    <span>\u9519\u8BEF\u6587\u4EF6:</span>\n                                    <span style=\"color:red\">" + b + "</span>\n                                </div>\n                                <div>\n                                    <span>\u9519\u8BEF\u884C\u6570:</span>\n                                    <span style=\"color:red\">" + c + "</span>\n                                </div>\n                                <div>\n                                    <span>\u9519\u8BEF\u5217\u6570:</span>\n                                    <span style=\"color:red\">" + d + "</span>\n                                </div>\n                            </div>");
                divDialog.append(divContent);
            }

            createMask();
            createDialog();
            createTitle();
            createContent();
            $(function () {
                $("body").append(divDialog);
                divMask.click(function () {
                    divMask.remove();
                    divDialog.remove();
                });
            });
        }
    }]);

    return _class;
}();
window.onerror = errlog.Error.throwError;