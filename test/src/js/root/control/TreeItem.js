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
control.TreeItem = class extends control.Base {
    constructor(eventCycle,config){
        super(eventCycle);
        this.name = "TreeItem";
        this.version = "1.0.0"//控件的版本
        this.author = "taiduo";//控件的制作人
        //设置参数对象
        this._config = config || {};
        //设置icon
        this._icon = this._config.icon || null;
        //设置tree文本
        this._text = this._config.text || null;
        //设置伸缩按钮
        this._spreadBtn = this._config.spreadBtn || null;
        //获取当前类
        let _parent = control.TreeItem;
        //根节点
        this._rootNode = null;
        //绑定icon
        this._treeIconNd = $(_parent.createIcon(this._icon));
        //绑定展开按钮
        this._treeSpreadBtnNd = $(_parent.createSpreadBtn(this._spreadBtn));
        //绑定tree名称
        this._treeTextNd = $(`<span>${this._text}</span>`);
        let _tree =  $(`<div class="controlTree-context" ></div>`);
        _tree.prepend(this._treeIconNd);
        _tree.append(this._treeTextNd);
        _tree.append(this._treeSpreadBtnNd);
        //创建tree
        this._tree = _tree;
        let html  = $(`<div class="controlTree-main"></div>`)
        html.append(_tree);
        //绑定html
        this._html = html;
        //绑定点击事件  展开自己的子级列表
        this._bindClick();
        //tree绑定事件 
        this._bindEvent();
    }
    set tree(t){
        this._tree = tree;
    }
    get tree(){
        return this._tree;
    }
    set text(t) {
        this._text = t;
        this._treeTextNd.text(t);   
    }
    get text(){
        return this._text;
    }
    set icon(icon){
        this._icon = icon;
        this._treeIconNd =  $(control.TreeItem.createIcon(icon));
        this.tree.prepend(this._treeIconNd);
    }

    //重写addChild  为了保存当前元素的根元素
    addChild(node) {
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

    set spreadBtn(spreadbtn){
        this._spreadBtn = spreadbtn;
        this._treeSpreadBtnNd =  $(control.TreeItem.createSpreadBtn(spreadbtn));
        this.tree.append(this._treeSpreadBtnNd);
        this._bindClick();
    }

    reflexPropSelf(child,reflex){
        let icon = utils.Dom.getAttr(child, "icon");
        this.icon = icon;
        let spreadBtn = utils.Dom.getAttr(child, "spreadBtn");
        this.spreadBtn = spreadBtn;
    }
    //创建tree的icon
    static createIcon(icon){
        let _iconNd = null;
        //icon集合
        let _icon = {
            rhombus:"./images/rhombus.png",               //rhombus
            triangleRight:"./images/triangle-right.png"
        }
        //图标
        if(icon){
            _iconNd = `<img src=${_icon[icon]}    />`;
        }
        return _iconNd;
    }
    //创建tree的展开按钮
    static createSpreadBtn(spreadBtn){
        let btn = null;
        //展开按钮
        if(spreadBtn){
            btn = `<span class="spreadList"></span>`;
        }
        return btn;
    }

    //绑定点击事件  展开自己的子级列表
    _bindClick() {
        let nd_spreadList = this._treeSpreadBtnNd;
        if(!nd_spreadList)return;
        nd_spreadList.on('click',function (ev) {
            this.spreadTree();
        }.bind(this));
    }

    //绑定事件
    _bindEvent(){
        //绑定html单击事件
        this.tree.on("click", function () {
            
            this.saveCurrent("click");
        }.bind(this));

        //绑定html双击事件
        this.tree.on("dblclick", function () {
            this.saveCurrent("dblclick");
        }.bind(this));

         //绑定右击事件
        this.tree.on("contextmenu",function(){
            this.saveCurrent("contextmenu");
        }.bind(this))

        //绑定拖拽事件
        this.tree.on("mousedown", function () {
            this.saveCurrent("mousedown");
            //移动开始
            document.onmousemove =function(event){
            }
            //移动停止
            document.onmouseup  = function(){
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }.bind(this));
    }
    
    //保存当前this  便于给Tree使用
    saveCurrent(eventType){
        let currentTreeItem = this;
        let _rootNode = this._rootNode;
        if(eventType == "click"){
            if(_rootNode._selectClickItem){
                _rootNode.selectPrevItem = _rootNode._selectClickItem;
               }
               _rootNode._selectClickItem = currentTreeItem;
        }else{
            _rootNode.selectItem = currentTreeItem;
        }
    }

    /** 
     * 伸展子结构
     * @example this.selectItem.spreadTree();
    */
    spreadTree(){
        let nd_spreadList = this._treeSpreadBtnNd;
        if(nd_spreadList.hasClass('active')){
            nd_spreadList.removeClass("active");
            this.childList.forEach(item=>{
                item._html.show();
            })
        }else {
            this.childList.forEach(item=>{
                item._html.hide();
            })
            nd_spreadList.addClass("active");
        }
    }
    
    /** 
     * 设置样式
     * @example 1:this.selectItem.treeStyle('border',"1px solid #000");
     * @example 2:this.selectItem.treeStyle({font-size:"20px",'border':"1px solid #000"});
    */
    treeStyle(property,value){
        if(property.constructor == Object){
            this.tree.css(property)
        }else{
            this.tree.css(property,value)
        }
    }


    //销毁事件
    destroySelfEvent(){
        this._treeSpreadBtnNd.off("click");
        this.tree.off("click");
        this.tree.off("dblclick");
        this.tree.off("contextmenu");
        this.tree.off("mousedown");
    }

    //销毁属性
    destroySelfProp(){
        //销毁参数对象
        this._config =  {};
        //销毁icon
        this._icon =  null;
        //销毁tree文本
        this._text =  null;
        //销毁伸缩按钮
        this._spreadBtn =  null;
        
        this._treeIconNd = null;
        this._treeSpreadBtnNd = null;
        this._treeTextNd = null;
        this._tree = null;
        this._html = null;
    }

    //返回DOM
    get dom(){
        let _nd = "";
        if(this.html){
            _nd = this.html[0];
        }
        return _nd;
    }
} 