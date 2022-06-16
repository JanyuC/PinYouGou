addEventListener("load", function() {
    // 1.轮播图
    // 获取元素
    var ban = document.querySelector('.ban');
    var ul = ban.querySelector('ul');
    var lis = ul.querySelectorAll('li');
    var ol = ban.querySelector('ol');
    var arrow_prev = document.querySelector('.arrow-prev');
    var arrow_next = document.querySelector('.arrow-next');
    //鼠标经过图片
    ban.addEventListener('mouseenter', function() {
            arrow_next.style.display = 'block';
            arrow_prev.style.display = 'block';
            //停止自动播放计时器
            clearInterval(timer);
            timer = null;

        })
        //鼠标离开图片
    ban.addEventListener('mouseleave', function() {
            arrow_next.style.display = 'none';
            arrow_prev.style.display = 'none';
            //开始自动播放计时器
            timer = setInterval(function() {
                arrow_next.click();
            }, 3000);

        })
        //一张图片的宽度
    var picturewidth = lis[0].offsetWidth;
    // 小圈圈的索引号
    var index = 0;
    //控制小圆圈
    var control = 0;
    // 右键的索引号
    var num = 0;
    // 动态添加小圆圈的数量
    for (var i = 0; i < lis.length; i++) {
        var li = document.createElement('li');
        ol.append(li);
        li.setAttribute('index', i);

    }
    // 获取ol里的li
    var lis2 = ol.querySelectorAll('li');
    lis2[0].className = 'current';
    //小圈圈功能
    for (var j = 0; j < lis2.length; j++) {
        lis2[j].addEventListener('click', function() {
            //小圈圈选中变色
            for (var j = 0; j < lis2.length; j++) {
                lis2[j].className = '';
            }
            this.className = 'current';
            control = this.getAttribute('index');
            num = this.getAttribute('index');
            // 每个小圈圈对应图片
            animate(ul, -this.getAttribute('index') * picturewidth);
        })
    }

    // 克隆第一张轮播图
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //节流阀
    var flag = true;
    // 右键点击功能
    arrow_next.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0 + 'px';
                num = 0;
            }
            num++;
            animate(ul, -num * picturewidth, function() {
                flag = true;
            });
            control++;
            for (var k = 0; k < lis2.length; k++) {
                lis2[k].className = '';
            }
            if (control == ul.children.length - 1) {
                control = 0;
            }

            lis2[control].className = 'current';
        }
    })

    // 左键点击功能
    arrow_prev.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -(num * picturewidth) + 'px';

            }
            num--;
            animate(ul, -num * picturewidth, function() {
                flag = true;
            });
            if (control == 0) {
                control = ul.children.length - 1;
            }
            control--;

            for (var k = 0; k < lis2.length; k++) {
                lis2[k].className = '';
            }

            lis2[control].className = 'current';

        }
    })

    // 自动播放
    var timer = setInterval(function() {
        arrow_next.click();
    }, 3000);



    //2.侧边滑动栏
    //节流阀
    var flag = true;
    // 调用函数
    slide();
    //到一定的位置,滑动栏淡入淡出
    function slide() {
        if ($(document).scrollTop() >= $(".tuijian").offset().top) {
            $(".aside-slid").stop().fadeIn();
        } else {
            $(".aside-slid").fadeOut();
        }
    }
    // 窗口滚动

    $(window).scroll(function() {
        slide();
        //滑到相应模块,滑动栏li增加current类
        if (flag) {
            $(".main-content>div").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".aside-slid").find("li").eq(i).addClass("current").siblings().removeClass("current");
                }
            })
        }

    })

    // 返回顶部
    $(".goback").click(function() {
        $("body, html").animate({ 'scrollTop': 0 }, function() {
            flag = true;
        })
    })

    //点击li去往相应地方
    $(".aside-slid").find("li").click(function() {
        flag = false;
        var arrive = $(".main-content>div").eq($(this).index()).offset().top + 5;
        console.log(arrive);
        $("body, html").animate({
            'scrollTop': arrive
        }, function() {
            flag = true;
        })
        $(this).addClass("current").siblings().removeClass("current");
    })


    // 3、导入左边侧边栏数据
    const data = [{
            item: '家用电器'
        },
        {
            item: '手机、数码、通信'
        },
        {
            item: '电脑、办公'
        },
        {
            item: '家居、家具、家装、厨具'
        },
        {
            item: '男装、女装、童装、内衣'
        },
        {
            item: '个户化妆、清洁用品'
        },
        {
            item: '鞋靴、箱包、珠宝'
        },
        {
            item: '运动户外、钟表'
        },
        {
            item: '汽车、汽车用品'
        },
        {
            item: '母婴、玩具乐器'
        },
        {
            item: '食品、酒类、生鲜、特产'
        },
        {
            item: '图书、音像、电子书'
        },
        {
            item: '彩票、旅行、充值、票务'
        },
        {
            item: '理财、众筹、白条、保险'
        }
    ];
    //调用模板
    let str1 = template('tabmodel', data);
    $(".aside-left").html(str1).show();

    //4.导入右边侧边栏数据
    const data2 = ['话费', '机票', '电影票', '游戏', '彩票', '加油卡', '酒店', '火车票', '众筹', '理财', '礼品卡', '白条']
    let str2 = template('fenleimodal', data2);
    $(".aside-right-fenlei").html(str2);


    //5.导入猜你喜欢模块
    const data3 = [{
            url: 'upload/喜欢1.png',
            item: '阳光美包新款单肩包女包',
            price: '¥116.00'
        },
        {
            url: 'upload/喜欢2.png',
            item: '爱仕达 30CM炒锅不粘锅',
            price: '¥99.00'
        },
        {
            url: 'upload/喜欢3.png',
            item: '捷波朗 （jabra）BOOSI劲步',
            price: '¥238.00'
        },
        {
            url: 'upload/喜欢4.png',
            item: '欧普 JYLZ08面板灯平板灯铝',
            price: '¥238.00'
        },
        {
            url: 'upload/喜欢5.png',
            item: '三星 （G5500）移动联',
            price: '¥649.00'
        },
        {
            url: 'upload/喜欢6.png',
            item: '韩国所望 紧致湿润精华露400ml',
            price: '¥649.00'
        }
    ];
    let str3 = template("likemodal", data3);
    $(".like-content").html(str3);
})