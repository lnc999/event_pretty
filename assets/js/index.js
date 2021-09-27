$(function () {
    getUserInfo();
    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            data: {},
            // headers: {
            //     Authorization: localStorage.getItem('token') || '',
            // },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layui.layer.msg(res.message);
                userHead(res.data);
            },
            //无论是成功还是失败都会调用这个函数
            // complete: function (res) {
            //     console.log(res);
            //     if (res.responseJSON.status === 1) {
            //         //强制清空token
            //         localStorage.removeItem('token');
            //         location.href = '/assets/login.html';
            //     }
            // },
        });
    }
    //渲染用户名和头像
    function userHead(user) {
        // console.log(user);
        //获取用户的信息
        var uname = user.nickname || user.username;
        // console.log(uname);
        //渲染到页面
        $('.welcome').html('欢迎' + uname);
        // 判断用户头像
        if (user.user_pic !== null) {
            $('.layui-nav-img').prop('src', user.user_pic).show();
            $('.text_avatar').hide();
        } else {
            $('.layui-nav-img').hide();
            //获取用户名第一个字符
            var first = uname[0].toUpperCase();
            $('.text_avatar').html(first).show();
        }
    }
    // var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        layui.layer.confirm('是否确认退出', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地储存
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = '/assets/login.html';
            layer.close(index);
        });
    });
});
