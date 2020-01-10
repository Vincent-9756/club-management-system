let username;
refresh()
function refresh() {
  $('#EmployeeDemo').html("");
  layui.use('flow', function () {
    var flow = layui.flow;
    flow.load({
      elem: '#EmployeeDemo',
      done: function (page, next) {
        var lis = [];
        $.ajax({
          type: "post",
          url: url + "/user/queryApplyUser",
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          xhrFields: {
            withCredentials: true
          },
          data: JSON.stringify({
            username: username
          }),
          success: function (res) {
            layui.each(res.data, function (index, item) {
              lis.push('<div class="layui-col-md4 layui-col-sm6">');
              lis.push('<div class="layadmin-contact-box" > ');
              lis.push('<div class="layui-col-md4 layui-col-sm6">');
              lis.push('<div class="layadmin-text-center">');
              lis.push('<img src="' + item.avatar + '">');
              lis.push('</div>');
              lis.push('</div>');
              lis.push('<div class="layui-col-md8 layadmin-padding-left20 layui-col-sm6">');
              lis.push('<div class="layui-row">');
              lis.push('<div class="layui-col-md8">');
              lis.push('<h3 class="layadmin-title">');
              lis.push('<strong>' + item.username + '</strong>');
              lis.push('</h3>');
              lis.push('</div>');
              lis.push('</div>');
              lis.push('<div class="layadmin-address">');
              lis.push('<p>' + item.account + '<p>');
              lis.push('<p><i class="layui-icon layui-icon-cellphone"></i>:' + item.tel + '</p>');
              lis.push('</div>');
              lis.push('</div>');
              lis.push('<div class="layadmin-maillist-img layadmin-font-blod">');
              lis.push('<div class="layui-btn-group" style="margin-top: 12px">');
              lis.push('<button class="layui-btn layui-btn-primary layui-btn-sm appoint1" value="' + item.id + '">同意</button>');
              lis.push('<button class="layui-btn layui-btn-primary layui-btn-sm appoint2" value="' + item.id + '" style="margin-left: 20px!important;">不同意</button>');
              lis.push('</div>');
              lis.push('</div>');
              lis.push('</div>');
              lis.push('</div>');
            });
            next(lis.join(' '), page < res.count / 6);
          }
        });
      }
    });
  });
}

// 同意
$('body').on('click', '.appoint1', function () {
  $.ajax({
    type: "get",
    url: url + "/user/agreeJoin",
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: {
      "id": $(this).attr("value")
    },
    success: function (res) {
      if (res > 0) {
        parent.layui.layer.msg('操作成功!');
      } else {
        parent.layui.layer.msg('操作失败!');
      }
      refresh();
    }
  });
});

// 不同意
$('body').on('click', '.appoint2', function () {
  $.ajax({
    type: "get",
    url: url + "/user/refuseJoin",
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: {
      "id": $(this).attr("value")
    },
    success: function (res) {
      parent.layui.layer.msg('操作成功!');
      refresh();
    }
  });
});

$('#name').on('input propertychange', function () {
  username = $(this).val();
  refresh();
});