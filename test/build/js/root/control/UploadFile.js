"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

control.UploadFile = function (_control$Base) {
    _inherits(_class, _control$Base);

    function _class() {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "选择文件";
        var ev = arguments[1];

        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, ev));

        _this._text = "";
        _this.name = "Box";
        _this.version = "1.0.0"; //控件的版本
        _this.author = "heshang"; //控件的制作人
        _this._box = $("<div></div>");
        _this._html = $("<span class=\"UploadFile_color UploadFile_inline\">" + text + "</span>");
        _this._submit = $("<span class=\"UploadFile_color UploadFile_inline\">\u4E0A\u4F20</span>");
        _this._tips = $("<div></div>");
        _this._box.css("margin", "33px");
        _this._tips.css("marginTop", "33px");
        _this._input = $("<input type=\"file\"/>");
        _this._box.append(_this._html);
        _this._box.append(_this._submit);
        _this._box.append(_this._tips);
        _this._multiple = false;
        _this._upFileType = [];
        _this._allowSubmit = false;
        _this._uploadIndex = 0;
        _this._maxSize = null;
        _this.allowSubmit = false;
        _this.text = text;
        _this._bindEvent();
        return _this;
    }

    _createClass(_class, [{
        key: "_bindEvent",
        value: function _bindEvent() {
            var _this2 = this;

            this._html.on("click", function () {
                //打开选择文件夹
                _this2._input[0].click();
            });
            this._submit.on("click", function () {
                //上传文件
                _this2._submitFile();
            });
            this._input.on("change", function () {
                //选择文件 判断是否成立
                _this2._selectedFile();
            });
        }
    }, {
        key: "_uploadFinish",
        value: function _uploadFinish() {
            // this._input[0].outerHTML = this._input[0].outerHTML;
            // this._selectedFile();
            this.allowSubmit = false;
        }
    }, {
        key: "_uploadFile",
        value: function _uploadFile() {
            var _this3 = this;

            if (this._uploadIndex >= this._input[0].files.length) {
                this._uploadFinish();
                return;
            }
            var file = this._input[0].files[this._uploadIndex];
            var formData = new FormData();
            var url = "";
            if (window.location.origin.indexOf("66rpg.com") <= -1) {
                url = "http://role6-test-www.66rpg.com";
            } else {
                url = window.location.origin;
            }
            //获取验证信息
            utils.Ajax.get(url + "/ajax/OssAuth/getUploadTempAuth", null, function (rcvData) {
                var d = rcvData.data;
                var reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload = function (e) {
                    var md5str = md5(e.target.result);
                    var key = "upload/" + md5str.substr(0, 2) + "/" + md5str;
                    if (file.type === "audio/mp3") {
                        debugger;
                        key += ".mp3";
                    }
                    formData.append("key", key);
                    formData.append("policy", d.policy);
                    formData.append("OSSAccessKeyId", d.accessid);
                    formData.append("signature", d.signature);
                    formData.append("x-oss-security-token", d.token);
                    formData.append("name", file.name);
                    formData.append("file", file);
                    utils.Ajax.postFormData("//cg-back.cgyouxi.com/", formData, function (data) {
                        _this3._tips.append($("<div>\u6587\u4EF6:<b>" + file.name + "</b>\u4E0A\u4F20\u6210\u529F,\u94FE\u63A5: <b>" + ("http://" + d.cdn + "/" + key) + "</b></div>"));
                        _this3._nextUpLoad();
                    }, function () {
                        _this3._tips.append($("<div>\u6587\u4EF6:<b style=\"color:red\">" + file.name + "</b>\u4E0A\u4F20\u5931\u8D25\u3002\u8BF7\u91CD\u8BD5\u3002</div>"));
                        _this3._nextUpLoad();
                    });
                };
            });
            // utils.Ajax.post("", formData, (data) => {
            //     this._nextUpLoad()
            // }, (data) => {
            //     this._nextUpLoad();
            // });
        }
    }, {
        key: "_nextUpLoad",
        value: function _nextUpLoad() {
            this._uploadIndex++;
            this._uploadFile();
        }
    }, {
        key: "_submitFile",
        value: function _submitFile() {
            if (this._allowSubmit) {
                this._uploadIndex = 0;
                this._tips.html("");
                this._uploadFile();
            } else {
                // this._typeError();
            }
        }
    }, {
        key: "_selectedFile",
        value: function _selectedFile() {
            this.allowSubmit = false;
            this._tips.html("");
            if (this._input[0].files.length > 0) {
                if (!this.checkFileType) {
                    this._typeError();
                    return;
                }
                this.allowSubmit = true;
                this._selectedFileTips();
                return;
            }
            this.allowSubmit = false;
        }
    }, {
        key: "_typeError",
        value: function _typeError() {
            alert("请检查文件类型、文件大小。");
        }
    }, {
        key: "_selectedFileTips",
        value: function _selectedFileTips() {
            this._tips.html("");
            for (var i = 0; i < this._input[0].files.length; i++) {
                this._tips.append($("<div>\u5DF2\u9009\u62E9\u6587\u4EF6:<b>" + this._input[0].files[i].name + "</b></div>"));
            }
        }
    }, {
        key: "maxSize",
        set: function set(s) {
            this._maxSize = s;
        },
        get: function get() {
            return this._maxSize;
        }
    }, {
        key: "checkFileType",
        get: function get() {
            // if (this._upFileType.length <= 0) {
            //     return true;
            // }
            for (var i = 0; i < this._input[0].files.length; i++) {
                var type = this._input[0].files[i].type;
                // let name = this._input[0].files[i].name;
                // let fileType = name.split('.');
                // let flieTypeName = fileType[fileType.length - 1];
                if (this.maxSize && this.maxSize > 0 && this._input[0].files[i].size >= this.maxSize) {
                    return false;
                }
                if (this._upFileType.indexOf(type.toLowerCase()) > -1) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: "allowSubmit",
        set: function set(b) {
            this._allowSubmit = b;
            if (b) {
                this._submit.removeClass("UploadFile_disable").addClass("UploadFile_color");
            } else {
                this._submit.removeClass("UploadFile_color").addClass("UploadFile_disable");
            }
        }
    }, {
        key: "upFileType",
        set: function set(arr) {
            this._upFileType = arr;
        }
    }, {
        key: "multiple",
        set: function set(b) {
            this._multiple = b;
            if (b) {
                this._input.attr("multiple", "true");
            } else {
                this._input.removeAttr("multiple");
            }
        },
        get: function get() {
            return this._multiple;
        }
    }, {
        key: "change",
        set: function set(handler) {
            if (this._stop) {
                this._stop = false;
                return;
            }
            this.onEvent(base.EventBase.CHANGE, handler);
        }
    }, {
        key: "text",
        set: function set(t) {
            this._text = t;
        },
        get: function get() {
            return this._text;
        }
    }, {
        key: "dom",
        get: function get() {
            return this._box[0];
        }
    }]);

    return _class;
}(control.Base);