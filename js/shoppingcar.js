$(function () {
    //调用总计函数
    getSum();

    // 全选按钮
    $(".checked").change(function () {
        // 全选按钮选上时，三个小按钮自动选择
        $(".s-checked").prop("checked", $(this).prop("checked"));
        // 第二个全选按钮也要选上
        $(".checked").prop("checked", $(this).prop("checked"));
        // 增加被选中的背景颜色
        if ($(this).prop("checked")) {
            $("tbody tr").addClass("current");
        }
        else {
            $("tbody tr").removeClass("current");
        }


    })
    // 小按钮变化时，全选按钮也变化
    $(".s-checked").change(function () {
        //小按钮个数为3 全选选中
        if ($(".s-checked:checked").length == $(".s-checked").length) {
            $(".checked").prop("checked", true);
        }
        //小按钮个数不为3 全选不选中
        else {
            $(".checked").prop("checked", false);
        }
        // 增加被选中的背景颜色
        if ($(this).prop("checked")) {
            $(this).parents("tr").addClass("current");
        }
        else {
            $(this).parents("tr").removeClass("current");
        }
    })


    // 点击+号，获取输入框的数值，数值++
    $(".add").click(function () {
        // 获取文本框的值
        var val = $(this).siblings("input").prop("value");
        //文本框的数值++
        val++;
        //新的值赋值给文本框
        $(this).siblings("input").prop("value", val);
        //小计的钱=截取一本书的价格*数量
        var money = parseFloat($(this).parents("td").siblings(".money").html().substr(1)) * val;
        //把小计的价格写入小计 保留两位小数
        $(this).parents("td").siblings(".all-money").children("strong").html("￥" + money.toFixed(2));
        //调用总记函数
        getSum();
    })

    // 点击-号，获取输入框的数值，数值--
    $(".sub").click(function () {
        // 获取文本框的值
        var val = $(this).siblings("input").prop("value");
        //文本框的数值++
        val--;
        //不让数量少于1
        if (val > 0) {
            //新的值赋值给文本框
            $(this).siblings("input").prop("value", val);
            //小计的钱=截取一本书的价格*数量
            var money = parseFloat($(this).parents("td").siblings(".money").html().substr(1)) * val;
            //把小计的价格写入小计 保留两位小数
            $(this).parents("td").siblings(".all-money").children("strong").html("￥" + money.toFixed(2));
            //调用总记函数
            getSum();
        }
    })

    //用户修改文本框
    $(".number input").change(function () {
        // 获取文本框的值
        var val = $(this).prop("value");
        //小计的钱=截取一本书的价格*数量
        var money = parseFloat($(this).parents("td").siblings(".money").html().substr(1)) * val;
        //把小计的价格写入小计 保留两位小数
        $(this).parents("td").siblings(".all-money").children("strong").html("￥" + money.toFixed(2));
        //调用总记函数
        getSum();
    })

    // 所有商品总价
    //each遍历 $(obj/attr).each(function(index,element){}) 可遍历数组和对象 index ele可自己命名
    function getSum() {
        Count = 0;//总数
        Money = 0;//总价钱
        //遍历所有商品的价钱
        //index为索引号 ele返回的是strong对象
        $(".all-money>strong").each(function (index, ele) {
            Money += parseFloat($(ele).html().substr(1));
        })
        //把总价钱赋值给总数部分
        $(".total-money em").html("￥" + Money.toFixed(2));

        //遍历所有商品的数量
        $(".number>input").each(function (index, ele) {
            Count += parseInt($(ele).val());
        })
        //把总数钱赋值给总数部分
        $(".checked-items em").html(Count);
    }

    //删除选中商品
    $(".remove-items").click(function () {
        $(".s-checked:checked").parents("tr").remove();
        getSum();
        //如果小按钮的个数等于0 取消全选
        if ($(".s-checked").length == 0) {
            $(".checked").prop("checked", false);
        }
    })

    //清空购物车
    $(".clear").click(function () {
        $("tbody").children("tr").remove();
        getSum();
        //如果小按钮的个数等于0 取消全选
        if ($(".s-checked").length == 0) {
            $(".checked").prop("checked", false);
        }
    })

    //手动删除模块
    $(".rem").click(function () {
        $(this).parent().remove();
        getSum();
        //如果小按钮的个数等于0 取消全选
        if ($(".s-checked").length == 0) {
            $(".checked").prop("checked", false);
        }
    })
})