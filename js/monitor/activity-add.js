layui.use(['form', 'layer', 'laydate'], function(){
  var form = layui.form,
  layer = layui.layer,
  laydate = layui.laydate;

  //日期
  laydate.render({
    elem: '#date',
    type: 'datetime'
  });

  //监听提交
  form.on('submit(demo1)', function(data){
    console.log(JSON.stringify(data.field))
    $.ajax({
      type: "post",
      url: url + "/scheme/addScheme",
      dataType: "json",
      contentType: "application/json;charset=UTF-8",
      xhrFields: {
        withCredentials: true
      },
      data: JSON.stringify(data.field),
      success: function (res) {
        console.log(res)
        layer.msg('申请成功');
      }
    });
    $("#form")[0].reset();
    form.render();
    return false;
  });

});
