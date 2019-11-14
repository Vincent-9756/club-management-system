layui.use(['element', 'layer'], function () {
  var element = layui.element;
  var layer = layui.layer;

  // layer.open({
  //   content: '欢迎来到校园社团管理系统~'
  // });

  element.on('nav(test)', function(elem){
    var event = event || window.event;
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
    $('#changeIframes').attr('src', elem[0].href)
  });

  $('#logout').click(function () {
    layer.open({
      content: '退出成功',
      success: function(){
        window.location.href = '../html/login.html'
      }
    });
    $(this).removeClass('layui-this');
  });
});

// 展开收缩导航栏
$('#sideNav-hide').click(function () {
  if ($(this).is('.nav-shrink')) {
    $(this).removeClass('nav-shrink');
    $('.layui-side').animate({
      width: '220px'
    }, 1000);
    $('.layui-layout-left,.layui-body,.layui-layout-admin .layui-footer').css('left', '220px');
    $(this).children().first().html('<i class="layui-icon layui-icon-shrink-right"></i>');
  } else {
    $(this).addClass('nav-shrink');
    $('.layui-side').animate({
      width: '60px'
    }, 1000);
    $('.layui-layout-left,.layui-body,.layui-layout-admin .layui-footer').css('left', '60px');
    $(this).children().first().html('<i class="layui-icon layui-icon-spread-left"></i>');
  }

});