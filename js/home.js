// 登录半小时后退出系统
setTimeout(() => {
  $.ajax({
    type: "get",
    url: url + "/user/logout",
    success: function (res) {
      window.location.href = '../html/login.html'
    }
  });
}, 1800000);

$('#home .userName').html('<img src="http://t.cn/RCzsdCq" class="layui-nav-img">' + getCookie('username'))
if ($('#changeIframes').attr('src') == '') {
  $('.contentShow').show();
  $('.contentShow .layui-card-header').text('欢迎来到校园社团管理系统' + '~' + $('#home .userName').text())
  $('#changeIframes').attr('src', '../html/weather.html');
  $('#iframeBox').css('height', 'calc(100% - 92px)');
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
}

layui.use(['element', 'layer'], function () {
  var element = layui.element;
  var layer = layui.layer;

  //切换导航栏
  element.on('nav(test)', function (elem) {
    var event = event || window.event;
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    $('.contentShow').hide();
    if (elem[0].href.split('html/')[1] != '' && elem[0].href.split('html/')[1] != 'null' && elem[0].href.split('html/')[1] != null) {
      $('#changeIframes').attr('src', elem[0].href);
    }
    $('#iframeBox').css('height', '100%');
  });

  //退出登录
  $('#logout').click(function () {
    $.ajax({
      type: "get",
      url: url + "/user/logout",
      success: function (res) {
        layer.msg('退出成功');
        setTimeout(() => {
          window.location.href = '../html/login.html'
        }, 2000);
        $(this).removeClass('layui-this');
      }
    });
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

// 获取导航栏
layui.use('element', function () {
  layui.element.render();
})
$.ajax({
  type: "get",
  url: url + "/user/queryMenu",
  xhrFields: {
    withCredentials: true
  },
  success: function (res) {
    var data = ''
    for (let i = 0; i < res.length; i++) {
      data += '<li class="layui-nav-item"><a href="' + res[i].jump + '"><i class="layui-icon ' + res[i].icon + '"></i>' + res[i].title + '</a>';
      // console.log(res[i])
      if (res[i].list.length != 0) {
        for (let e = 0; e < res[i].list.length; e++) {
          data += '<dl class="layui-nav-child">\n' +
            '<dd><a href="' + res[i].list[e].jump + '">' + res[i].list[e].title + '</a></dd>\n' +
            '</dl>\n';
        }
        data += '</li>\n';
      } else {
        data += '</li>\n';
      }
    }
    $('.leftMenu ul').append(data);
    layui.use('element', function () {
      layui.element.render();
    })
  }
});