if ($('#changeIframes').attr('src') == '') {
  $('.contentShow').show();
  $('.contentShow .layui-card-header').text('欢迎来到校园社团管理系统' + '' + $('.userName').text() + '~')
  $('#changeIframes').attr('src', '../html/weather.html');
  $('#iframeBox').css('height', 'calc(100% - 92px)');
}

layui.use(['element', 'layer'], function () {
  var element = layui.element;
  var layer = layui.layer;

  // layer.open({
  //   content: '欢迎来到校园社团管理系统'+''+$('.userName').text()+'~',
  // });

  element.on('nav(test)', function (elem) {
    var event = event || window.event;
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    $('.contentShow').hide();
    $('#changeIframes').attr('src', elem[0].href);
    $('#iframeBox').css('height', '100%');
  });

  $('#logout').click(function () {
    layer.open({
      content: '退出成功',
      success: function () {
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

var cars = $(".contentShow .layui-card-header").width();
var w = $(window).width();
var i = w;

function start() {
  i--;
  if (i <= -cars) {
    i = w;
    $('.contentShow .layui-card-header').css({
      right: 0 + 'px'
    });
  } else {
    $('.contentShow .layui-card-header').css({
      left: i + 'px'
    });
  }
  setTimeout(start, 10);
}
setTimeout(start, 100);