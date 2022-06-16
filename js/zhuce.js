$(function() {
    // 封装验证函数
    function yanzheng(id, flag, value) {
        if (flag) {
            $(id).siblings(".reg").children("span").css("background-image", 'url("images/success.png")').siblings("em").html('');
        } else {
            $(id).siblings(".reg").children("span").css("background-image", 'url("images/error.png")').siblings("em").html(value);
        };
    }
    // 验证手机号
    $("#tel").blur(() => {
            let str = $("#tel").val();
            let reg = /^1\d{10}$/;
            let flag = reg.test(str);
            yanzheng('#tel', flag, '请输入正确的手机号')
        })
        //验证登陆密码
    $("#password").blur(() => {
            let str = $("#password").val();
            let reg = /^[a-zA-Z0-9_]{6,16}$/;
            let flag = reg.test(str);
            yanzheng('#password', flag, '请重新输入6-16位密码，且只能包含数字、字母和下划线')

        })
        //再次确认密码
    $("#re_password").blur(() => {
        let str = $("#re_password").val();
        let reg = /^[a-zA-Z0-9_]{6,16}$/;
        let flag = reg.test(str) && (str == $("#password").val());
        yanzheng('#re_password', flag, '密码不匹配，请重新输入')
    })

    // 验证短信验证码
    $("#inform").blur(() => {
        let str = $("#inform").val();
        let reg = /^\d{6}$/;
        let flag = reg.test(str);
        yanzheng('#inform', flag, '请输入正确的验证码')

    })
})