$.ajaxPrefilter(function (options) {
    console.log(options.url);
    //api-breakingnews-web.itheima.net
    http: options.url = ' http://api-breakingnews-web.itheima.net' + options.url;
});
