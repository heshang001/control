control.Menu = class extends control.Base {
    /**
     * 菜单(menu)控件
     * @param subItems  控件的子菜单项
     * @param menuType  控件的类型
     * @param eventCycle
     * @example <menu data-control-type="control.Menu" data-menuType="appMenu">
     * @author created by lingyan
     * @Method: addChild(node)
     */
    constructor(subItems = new Array(),menuType,eventCycle){
        super(eventCycle);
        this.name = "Menu";                                             //控件的名称
        this.version = "1.0.0";                                         //控件的版本
        this.author = "lingyan";                                        //控件的制作人
        this._childList = subItems?subItems:[];                         //控件的子菜单项
        this._menuType = menuType?menuType:control.Menu.MenuType.APP_MENU;                //控件的类型
        this._acceleratorKeyDic = new Array();                          //初始化快捷键数组
    }


    /**
     * @private
     * 根据子项获取当前的 html
     */
    _getHtml() {
        switch (this._menuType){
            case control.Menu.MenuType.APP_MENU:
                this._subDom = $(`<ul class="lingyan-appMenu"></ul>`);
                break;
            case control.Menu.MenuType.RIGHT_MENU:
                this._subDom = $(`<ul class="lingyan-rightMenu"></ul>`);
                break;
        }
        this._html = this._subDom;
        this._bindEvent();
    }

    /**
     * @private
     * 绑定menu对应的事件
     */
    _bindEvent(){
        let _this = this;
        window.onkeydown = function (event) {
            if(!_this._acceleratorKeyDic){
                return;
            }
            let _command ="";
            if(event.altKey){
                _command += "alt+";
            }
            if(event.ctrlKey){
                _command += "ctrl+";
            }
            if (event.shiftKey){
                _command += "shift+";
            }
            _command += event.key.toLowerCase();
            // 触发点击事件
            if(_this._acceleratorKeyDic[_command]){
                _this._acceleratorKeyDic[_command].clickFunc();
            }
            // 实现的效果是菜单显示的时候点击相应的按键就能触发点击事件
            let _singleComm = event.key.toLowerCase();
            for(let key in _this._acceleratorKeyDic){
                if(key.toLowerCase().includes(_singleComm) && _this._acceleratorKeyDic[key]._parent.showItem){
                    _this._acceleratorKeyDic[key].clickFunc();
                }
            }
        }

        // 当失去焦点的时候，所有的子菜单隐藏显示
        this._html.on("blur", ()=>{
            if(_this._childList){
                for(let item of _this._childList){
                    item.showItem = false;
                }
            }
        });
    }

    /**
     * @private
     * 递归遍历获取所有的快捷键
     * @param subItems
     */
    _getAllKeys(subItems){
        if(!subItems){
            return;
        }
        for(let item of subItems){
            if(item && item.accelerator){
                this._acceleratorKeyDic[item.accelerator.toLowerCase()] = item;
            }
            if(item && item.childList){
                this._getAllKeys(item.childList);
            }
        }
    }

    /**
     * 添加子项方法 都要获取快捷键
     * @param node
     */
    addChild(node){
        super.addChild(node);
        this._getAllKeys([node]);
    }

    /**
     * 设置当前的子项
     * @param b
     */
    set childList(b){
        this._childList = b;
        if(b){
            for(let item of b){
                item._parent = this;
            }
        }
    }

    /**
     * 获取整个菜单的快捷键数据结构
     * key:快捷键字符串
     * value:快捷键对应的子项对象实例
     * @returns {快捷键数据}
     */
    get accelerator(){
        return this._accelerator;
    }

    /**
     * 设置整个菜单的快捷键数据结构
     * @param k
     */
    set accelerator(k){
        this._accelerator = k;
    }

    /**
     * 获取当前菜单的dom结构
     * @returns {dom结构}
     */
    get dom() {
        if(!this._html){
            this._getHtml();
        }
        return this._html[0];
    }

    /**
     * 删除自身的属性
     * */
    destorySelfProp() {
        this._accelerator = null;
        this._subItems = null;
        this._acceleratorKeyDic = null;
        this._menuType = null;
        this._html = null;
        this._childList = null;
        this._subDom = null;
    }

    /**
     *删除自身的事件
     * */
    destorySelfEvent() {
        this._html.off("blur");
    }

    /**
     * reflex自身属性
     * @param child
     * @param reflex
     */
    reflexPropSelf(child, reflex){
        let menuType = utils.Dom.getAttr(child, "menuType");
        if (menuType) {
            this._menuType = menuType;
        }
        this._getHtml();
    }
};

/**
 * 当前菜单的类型
 * @type {{NORMAL: string, SEPARATOR: string, SUBMENU: string}}
 */
control.Menu.MeunItemType= {
    NORMAL: "normal",
    SEPARATOR: "separator",
    SUBMENU: "submenu"
};
/**
 * 菜单的类型，目前仅仅支持应用程序菜单和右键菜单
 * @type {{APP_MENU: string, RIGHT_MENU: string}}
 */
control.Menu.MenuType={
    APP_MENU:"appMenu",
    RIGHT_MENU:"rightMenu"
};

/**
 *菜单栏的快捷键选项
 **/
control.Menu.MeunAccelerator= {
    Command: "Cmd",
    Control: "Ctrl",
    CommandOrControl: "CmdOrCtrl",
    Alt: "Alt",
    Option: "Option",
    AltGr: "AltGr",
    Shift: "Shift",
    Super: "Super"
};

