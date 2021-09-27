$(function () {
    $('#link_reg').on('click', function () {
        $('.reg_box').show();
        $('.login_box').hide();
    });
    $('#link_login').on('click', function () {
        $('.reg_box').hide();
        $('.login_box').show();
    });
    //从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义了一个叫pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 自定义了一个叫repwd 校验规则
        repwd: function (value) {
            //先拿到第一个密码框的值
            var text = $('#mima').val();
            // console.log(text);
            // 判断第一个密码框是否跟第二个相等
            if (text !== value) {
                return '两次密码不一样';
            }
        },
    });
    //给注册form表单绑定监听事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.post(
            '/api/reguser',
            {
                username: $('#yonghu').val(),
                password: $('#mima').val(),
            },
            function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功，请登录');
                // 模拟默认点击行为
                $('#link_login').click();
            }
        );
    });
    // 监听登录表单的登录事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        // var text = $(this).serialize();
        // console.log(text);
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // data: text,
            data: {
                username: $('#username_login').val(),
                password: $('#password_login').val(),
            },
            // dataType: "dataType",
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message);
                console.log(res);
                layer.msg('登录成功');
                // 将登陆成功的字符串保存到localstorage中
                localStorage.setItem('token', res.token);
                console.log(res.token);
                location.href = '/assets/index.html';
            },
        });
    });
});
