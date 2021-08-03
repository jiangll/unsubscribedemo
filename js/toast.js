/*
 *自定义弹窗
 */
//自执行函数 形成封闭的作用域 避免全局污染 
//传入windwo和document对象  相当于将window和document作为了作用域中的局部变量，
//就不需要内部函数沿着作用域链再查找到最顶层的window 提高运行效率。
(function(window, document) {
    //定义一个构造函数Msg 作为弹窗实例的构造函数。
    let Toast = function(options) {
        //执行初始化操作
        this._init(options);
    }

    //定义初始化方法 并对方法传递的参数进行初始化
    Toast.prototype = {
        _init(content) {
            //将传入的值绑定到this上 
            this.content = content;

            //执行创建元素方法
            this._creatElement();
            //显示弹窗及遮罩
            this._show({
                el: this._el,
            });
            var that = this
            setTimeout(() => {
                // console.log('sss')
                that._close({
                    el: that._el,
                })
            }, 1500)
        },
        //创建弹窗元素方法
        _creatElement() {
            //创建最外层得包裹元素
            let wrap = document.createElement("div");
            wrap.className = "toast__wrap";
            //将拼接的html赋值到wrap中
            wrap.innerHTML = this.content;
            this._el = wrap;
        },

        //弹窗展现方法
        _show({
            el,
        }) {
            //把弹窗的dom和遮罩插入到页面中
            document.body.appendChild(el);

            //将弹窗显示出来 timeout进行异步处理显示动画
            setTimeout(() => {
                el.style.transform = "translate(-50%,-50%) scale(1,1)";
                el.style.opacity = "1";
            })
        },

        //关闭弹窗方法
        _close({
            el
        }) {
            // console.log('ttt')
            //隐藏dom 
            el.style.transform = "translate(-50%,-50%) scale(0,0)";
            el.style.opcity = "0";
            //根据动画时间  动画完成再移除
            setTimeout(() => {
                //把弹窗的dom和遮罩移除
                document.body.removeChild(el)
            }, 300);
        },
    }

    //将构造函数暴露到window  可直接在全局作用域中访问构造函数
    window.$Toast = Toast;


})(window, document);