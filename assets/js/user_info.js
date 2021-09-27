$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '需要输入1-6位字符';
            }
        },
    });
    initUserInfo();
    // 初始化信息 获取用户的信息
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('请求失败');
                }
                // console.log(res);
                form.val('formUserInfo', res.data);
            },
        });
    }
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    });

    $('.layui-form').on('submit', function (e) {
        var text = $(this).serialize();
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: text,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('请求失败');
                }
                layer.msg('更新信息成功');
                // 调用父页面index里边的渲染头像 把更新成功之后的信息同步到页面
                // window代表fm的页面 parent 代表父页面
                window.parent.getUserInfo();
            },
        });
    });
});
