$(function() {
    // 下拉菜单
    $(".more").hover(() => {
            $(".more_box").stop().slideToggle(1000).toggleClass("more_boxcurrent");
        })
        // 产品
    const data = [];
    const obj = {
        item: 'Apple苹果iPhone 6s Plus（A1699）32G 金色 移动联通电信4G手机',
        newprice: '¥6088',
        oldprice: '￥6988',
        total: 100,
        shengyu: 29,
        buy: '已售87%'
    };
    for (let i = 0; i < 40; i++) {
        data.push(obj)
    }
    let str = template("chanpin_li", data);
    $(".chanpin").html(str);
})