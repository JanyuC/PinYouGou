$(() => {
    //1.下拉菜单
    $(".mynav,.webnav").hover(function() {
        $(this).children(".mynavbox").stop().slideToggle(1000).toggleClass("navboxcurrent");
    })


    //2.搜索框
    // 防抖变量
    var timer = null;
    //全局变量 使请求过的数据无需重复请求
    var a = {};

    // 键盘弹起
    $(".search-text").on("keyup", function() {
        // 清除旧的定时器
        clearTimeout(timer);
        var keyword = $(".search-text").val().trim();
        // 搜索框小于等于零 清空隐藏列表返回
        if (keyword.length <= 0) {
            return $(".search-content").empty().hide();
        } else {
            $(".search-content").show();

            // 如果a里面没有数据直接跳过JSONP请求渲染页面
            if (a[keyword]) {
                return renderPage(a[keyword]);
            } else {

                //开始定时器 当事件500ms无触发就发起JSONP请求 如触发清除旧的定时器重新等待500ms
                timer = setTimeout(function() {
                    useJsonp(keyword);
                    timer = null;
                }, 500)
            }


        }
    })

    //发起JSONP
    function useJsonp(kw) {
        $.ajax({
            // 发起JSONP 必须填写打Type：jsonp以区别ajax
            dataType: 'jsonp',
            // 指定请求的 URL 地址，其中，q 是用户输入的关键字
            url: 'https://suggest.taobao.com/sug?q=' + kw,
            success: function(res) {
                // console.log(res);
                renderPage(res);

            }
        })
    }
    $(".search-text").blur(() => {
        $(".search-content").hide();
    })
    $(".search-text").focus(() => {
            $(".search-content").show();
        })
        //渲染页面
    function renderPage(res) {
        // console.log(res.result);
        // 当无数据返回时,隐藏列表
        if (res.result.length <= 0) {
            return $(".search-content").empty().hide();
        }

        //调用模板
        var str = template('model', res);
        $(".search-list").html(str).show();
        console.log(res);
        // 赋值给全局变量 使请求过的数据无需重复请求
        var k = $(".search-text").val().trim();
        a[k] = res;
    }
})