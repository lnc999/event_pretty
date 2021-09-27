$(function () {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        originalPwd: function (value) {
            if ($('[name=oldPwd]').val() === value) {
                return '两次密码一致，请重新输入';
            }
        },
        oPwd: function (value) {
            if ($('[name=newPwd]').val() !== value) {
                return '两次密码不一致，请重新输入';
            }
        },
    });
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        var text = $(this).serialize();
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: text,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('更改成功');
                $('.layui-form')[0].reset();
            },
        });
    });
});
