// var vaidType = ["number","text","password"]

/**
 * TextBox控件
 * @author likui
 * @example let textBox1 = new control.TextBox("number",123);
 * textBox1.minValue = -10;
 * textBxo1.maxValue = 10;
 * textBox1.change = function(e){
 *      console.log(e);
 * }
 * @example <textbox data-control-type="control.TextBox" data-showType = "number" data-showValue=123 data-minValue=-10 data-maxValue=10></textbox>
 */
control.TextBox = class extends control.Base{
    constructor(showType = "string",val = "",ev){
        super(ev);
        this._val = val;
        if (!control.TextBox.textType[showType]){
            throw new TypeError("应该输入有效的类型(float,int,string,password,text,number)");
        }
        this._regex = "";
        this._testReg = false;
        this._showType = showType;
        this._inputDom = $(`<input type='${control.TextBox.textType[this._showType]}' value='${this._val}'/>`);
        this._html = $(`<span></span>`);
        this._html.append(this._inputDom);
        this._bindEvent();
    }

    /**
     * @returns 返回当前控件是否要进行正则匹配
     */
    get testReg(){
        return this._testReg;
    }

    /**
     * 设置是否进行正则匹配
     * @param isReg 是否进行正则匹配
     */
    set testReg(isReg){
        this._testReg = isReg;
    }

    /**
     * @returns 获取正则匹配的字符串
     */
    get regex(){
        return this._regex;
    }

    /**
     * 设置正则匹配字符串
     * @param regexStr 设置正则匹配的字符串
     */
    set regex(regexStr){
        this._regex = regexStr;
    }

    /**
     * 获取当前的控件内容的类型
     * @returns 返回当前的控件内容的类型
     */
    get showType(){
        return this._showType;
    }

    /**
     * 设置当前的控件内容的数据类型
     * @param showType 
     */
    set showType(showType){
        this._inputDom.attr("type",control.TextBox.textType[showType]);
        this._showType = showType;
    }

    /**
     * 获取TextBox的值
     * @returns 返回控件的显示内容
     */
    get showValue(){
        // console.log("this._val is::",this._val);
        return this._val;
    }

    /**
     * 设置控件的显示内容
     * @param val 显示的内容值
     */
    set showValue(val){
        this._val = val;
        this._inputDom.attr("value",val);
    }

    /**
     * 获取最小值（仅input type="number"）时有效
     * @returns 返回当前控件的最小值
     */
    get minValue(){
        if (this._inputDom.attr("type") !== "number"){
            return NaN;
        }
        return parseInt(this._inputDom.attr("min"));
    }

    /**
     * 设置当前控件的最小值
     * @returns 最小值
     */
    set minValue(value){
        if(this._inputDom.attr("type") !== "number"){
            return;
        }
        this._inputDom.attr("min",value);
    }

    /**
     * 返回当前控件的最大值
     * @returns 当前控件的最大值
     */
    get maxValue () {
        if(this._inputDom.attr("type") !== "number"){
            return NaN;
        }
        return parseInt(this._inputDom.attr("max"));
    }

    /**
     * 设置当前控件的最大值
     * @param value 设置的控件的值
     */
    set maxValue(value){
        if(this._inputDom.attr("type") !== "number"){
            return;
        }
        this._inputDom.attr("max",value);
    }

    /**
     * 删除自身的控件引用
     */
    destroySelfEvent(){
        this._inputDom.off("mousewheel");
        this._inputDom.off("change");
        this._inputDom.off("input propertychange")
    }

    /**
     * 删除自身的属性引用
     */
    destroySelfProp(){
        this._val = null;
        this._regex = null;
        this._showType = null;
    }

    /**
     * 进行事件绑定
     */
    _bindEvent(){
        let _this = this;
        this._inputDom.on("mousewheel",function (ev) {
            if(_this._inputDom.attr("type") !== "number"){
                return;
            }
            let tmpl = parseInt(_this._inputDom.attr("value"));
            _this._inputDom.attr("value",tmpl+parseInt(ev.originalEvent.wheelDeltaY/120));
        })
        this._inputDom.on("change",function (ev) {
            _this._val = ev.target.value;
            _this.runEvent(base.EventBase.CHANGE, _this);
        })
        this._inputDom.on("input propertychange",function(ev){
            _this._val = ev.target.value;
            _this.runEvent(base.EventBase.CHANGE,_this);
        })
    }
    
    /**
     * 
     * @param {*} child 属性反射实现
     * @param {*} reflex 
     */
    reflexPropSelf(child,reflex){
        let showType = utils.Dom.getAttr(child, "showType");
        this._inputDom.attr("type",control.TextBox.textType[showType]);

        let showValue = utils.Dom.getAttr(child,"showValue");
        this._inputDom.attr("value",showValue);

        let minValue = utils.Dom.getAttr(child,"minValue");
        this._inputDom.attr("min",minValue);

        let maxValue = utils.Dom.getAttr(child,"maxValue");
        this._inputDom.attr("max",maxValue);

        let testReg = utils.Dom.getAttr(child,"testReg");
        this._testReg = testReg;
    }
    // set change(handler){
    //     if(this._stop){
    //         this._stop = false;
    //     }
    //     this.onEvent(base.EventBase.CHANGE,handler);
    // }

    /**
     * 返回当前的dom值
     * @returns 当前的dom值
     */
    get dom(){
        return this._html[0];
    }
}

/**
 * 当前的内容的类型
 */
control.TextBox.textType = {
    float:"number",
    int:"number",
    string:"text",
    password:"password",
    text:"text",
    number:"number"
}