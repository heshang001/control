var UglifyJS = require("uglify-js");
var fs = require("fs");
var path = require("path");
var basePath = "./build/js/root/";
var outPath = "./build/js/";
var coreJsArr = [
    basePath + "base/EventPrope.js",
    basePath + "base/DomCacheRefresh.js",
    basePath + "base/EventBase.js",
    basePath + "base/EventCycle.js",
    basePath + "base/ControlDisplayBase.js",
    basePath + "base/ControlEventBase.js",
    basePath + "base/ControlReflex.js",
    basePath + "errlog/ErrLog.js",
    basePath + "utils/utils.js",
];
var corePathName = outPath + "base.core.js";

var controlJSPath = basePath + "control/";
var controlPathName = outPath + "control.core.js";

var npmFileName = outPath +"npm/index.js";

function ConcatPathJS(jsArr, outPathFileName, basePath = "") {
    let obj = {};
    // console.log(jsArr);
    if (jsArr instanceof Array) {
        for (let i = 0; i < jsArr.length; i++) {
            obj[i] = fs.readFileSync(basePath + jsArr[i], "utf-8");
        }
    } else {
        obj[0] = fs.readFileSync(basePath + jsArr, "utf-8");
    }
    let result = UglifyJS.minify(obj, {
        output: {
            ast: true,
            code: true
        }
    });
    // console.log(result);
    fs.writeFileSync(outPathFileName, result.code, "utf8");
    console.log(outPathFileName + " write complete");
}

function CreateJSByPath(basepath, outPathFileName) {
    let arr = [];
    fileDisplay(basepath, arr);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].indexOf("Base.js") > -1) {
            let a = arr[i];
            arr.splice(i, 1);
            arr.unshift(a);
        }
    }
    ConcatPathJS(arr, outPathFileName);
}

function fileDisplay(filePath, arr, child) {
    //根据文件路径读取文件，返回文件列表
    let files = fs.readdirSync(filePath);
    //遍历读取到的文件列表
    files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        let stats = fs.statSync(filedir);
        if (stats.isFile()) {
            arr.push(filedir);
        }
        if (stats.isDirectory()) {
            fileDisplay(filedir, arr, true);
            return;
        }
    });
}

ConcatPathJS(coreJsArr, corePathName); //打核心包

CreateJSByPath(controlJSPath, controlPathName);//打控件包

ConcatPathJS(['build/js/base.core.js','build/js/control.core.js'], npmFileName);//打Npm

//css操作  目前先拷贝


//html操作  目前先拷贝