$('.innerUser input,.registerBox .register-body .layui-input-block input').blur(function () {
  if ($(this).val() == '') {
    $(this).addClass('form-error')
  } else {
    $(this).addClass('form-success').removeClass('form-error')
  }
});

$(document).keydown(function (event) {
  if (event.keyCode == 13) {
    document.getElementById("loginBtn").click();
  }
});

$('#loginBtn').click(function () {
  window.location.href = "../html/home.html";
})

$('#registerBtn').click(function () {
  $('.wrrap').show();
  layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form,
      layer = layui.layer,
      layedit = layui.layedit,
      laydate = layui.laydate;
    form.on('submit(demo1)', function (data) {
      layer.alert(JSON.stringify(data.field), {
        title: '最终的提交信息'
      })
      return false;
    });
  });
})

$('.closeRegisterBox').click(function () {
  $('.wrrap').hide()
})