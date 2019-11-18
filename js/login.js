layui.use('layer', function () {
  var layer = layui.layer;
})

$('.innerUser input,.registerBox input').blur(function () {
  if ($(this).val() == '') {
    $(this).addClass('form-error')
  } else {
    $(this).addClass('form-success').removeClass('form-error')
  }
});

$('.registerBox .repassWord').blur(function () {
  if ($('.registerBox .repassWord').val() != $('.registerBox .passWord').val()) {
    $('#checkrepassWord').text('两次输入不一致')
    $('.registerBox .repassWord').addClass('form-error')
  }
})

$(document).keydown(function (event) {
  if (event.keyCode == 13) {
    document.getElementById("loginBtn").click();
  }
});

$('#loginBtn').click(function () {
  if ($('.innerUser .userName').val() == '' || $('.innerUser .passWord').val() == '') {
    layer.msg('账号密码不能为空');
  } else {
    $.ajax({
      type: "post",
      url: url + "/user/login",
      dataType: "json",
      contentType: "application/json;charset=UTF-8",
      xhrFields: {
        withCredentials: true
      },
      data: JSON.stringify({
        "account": $('.loginBox .userName').val(),
        "password": $('.loginBox .passWord').val()
      }),
      success: function (res) {
        if (res.result == 'SUCCESS') {
          document.cookie = 'username=' + res.data.username;
          window.location.href = "../html/home.html";
        } else {
          layer.msg('账号密码错误');
        }
      },
      error: function (res) {
        layer.msg('错误请重试');
      }
    });
  }
})

$('#toregisterBtn').click(function () {
  $('.wrrap').show();
  $('.submitReg').click(function () {
    if ($('.registerBox .userName').val() == '' || $('.registerBox .passWord').val() == '' || $('.registerBox .repassWord').val() == '' || $('.registerBox .studentCode').val() == '') {
      layer.msg('必填内容不能为空');
    } if ($('.registerBox .tele').val() != '' && !(/^1[3456789]\d{9}$/.test($('.registerBox .tele').val()))) {
      layer.msg('手机格式错误');
    } else {
      $.ajax({
        type: "post",
        url: url + "/user/addUser",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        xhrFields: {
          withCredentials: true
        },
        data: JSON.stringify({
          "account": $('.registerBox .userName').val(),
          "password": $('.registerBox .passWord').val(),
          "username": $('.registerBox .userAcound').val(),
          "tel": $('.registerBox .tele').val(),
          "code": $('.registerBox .studentCode').val()
        }),
        success: function (res) {
          if (res.result == 'SUCCESS') {
            layer.msg('注册成功！');
            setTimeout(() => {
              $('.wrrap').hide()
            }, 2000);
          } else {
            layer.msg('账号已存在！');
          }
        }
      });
    }
  })
})

$('.closeRegisterBox').click(function () {
  $('.wrrap').hide()
})