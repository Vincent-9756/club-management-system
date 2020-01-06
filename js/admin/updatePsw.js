layui.use('layer', function () {
  var layer = layui.layer;
  $('.submitMsg').click(function() {
    if ($('.oldPassWord').val() == '' || $('.newPassWord').val() == '' || $('.repassWord').val() == '') {
      layer.msg('输入框内容不能为空！')
      return
    }

    if ($('.oldPassWord').val() != '' && $('.newPassWord').val() != '' && $('.oldPassWord').val() == $('.newPassWord').val()) {
      layer.msg('新密码不能与原密码相同！')
      return
    }

    if ($('.repassWord').val() != '' && $('.newPassWord').val()!='' && $('.repassWord').val() != $('.newPassWord').val()) {
      layer.msg('两次密码输入不一致！')
      return
    } else {
      $.ajax({
        type: "post",
        url: url + "/user/modifyPwd",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        xhrFields: {
          withCredentials: true
        },
        data: JSON.stringify({
          "oldPwd": $('.oldPassWord').val(),
          "newPwd": $('.newPassWord').val()
        }),
        success: function (res) {
          console.log(res)
          if (res.result == 'ERROR') {
            layer.msg(res.msg);
            $('.oldPassWord').val('');
            $('.newPassWord').val('');
            $('.repassWord').val('');
          } else {
            layer.msg(res.msg);
            $('.oldPassWord').val('');
            $('.newPassWord').val('');
            $('.repassWord').val('');
          }
        }
      });
    }
  });
});