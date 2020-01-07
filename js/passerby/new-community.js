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
      url: url + "/department/addDepartment",
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

// 下拉框函数
$(document).on('click', '.f-push>p', function () {
  event.stopPropagation();
  if ($(this).parent().hasClass('marker')) {
    return false;
  }
  $(this).siblings('div').toggle();
  $(this).parent().addClass('marker');
}).on('click', '.f-push>div>div', function () {
  event.stopPropagation();
  $(this).parent().siblings('p').attr('value', $(this).attr('value')).html($(this).text());
  $(this).parent().hide();
  $(this).parent().parent().removeClass('marker');
}).click(function (event) {
  var _con = $('.f-push');
  if (!_con.is(event.target) && _con.has(event.target).length === 0) {
    $('.f-push>div').hide();
    $('.f-push').removeClass('marker');
  }
});

// 获取院系下拉框
$.ajax({
  type: "get",
  url: url + "/profession/getProfessionItem",
  success: function (res) {
    var data = '';
    for (let index = 0; index < res.length; index++) {
      data += '<option value=" ' + res[index].id + ' ">' + res[index].name + '</option>\n'
    }
    $('.professionId').append(data);
  }
});
