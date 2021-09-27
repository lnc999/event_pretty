$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    //api-breakingnews-web.itheima.net
    http: options.url = ' http://api-breakingnews-web.itheima.net' + options.url;
    //统一设置有权限的请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        };
    }
    // 全局统一挂载 complete回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1) {
            //强制清空token
            localStorage.removeItem('token');
            location.href = '/assets/login.html';
        }
    };
});
