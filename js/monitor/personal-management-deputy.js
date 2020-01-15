refresh("");
initHeader();
//加载干部
function initHeader() {
  $.ajax({
    type: "post",
    url: url + "/user/queryCadre",
    dataType: "json",
    data: JSON.stringify({
      "username": ""
    }),
    contentType: "application/json;charset=UTF-8",
    xhrFields: {
      withCredentials: true
    },
    success: function (res) {
      var str = '',
          obj = null;
      for (i = 0; i < res.length; i ++) {
        console.log("i:" + i + "\nlength:" + res.length/2)
        if (i < (res.length)/2) {
          console.log("left")
          if (res[i].job == '社长') {
            str += '<div class="avatar-box">' + 
            '<img class="avatar" src="' + res[i].avatar +'">' + 
            '<img class="border" src="/images/first-border.png">' + 
            '</div>' ;
          } else {
            str = '<div class="avatar-box">' + 
            '<img class="avatar" src="' + res[i].avatar +'">' + 
            '<img class="border" src="/images/second-border.png">' + 
            '</div>' + str;  
          }
        } else {
          console.log("riht")
          if (res[i].job == '社长') {
            str += '<div class="avatar-box">' + 
            '<img class="avatar" src="' + res[i].avatar +'">' + 
            '<img class="border" src="/images/first-border.png">' + 
            '</div>';
          } else {
            str += '<div class="avatar-box">' + 
            '<img class="avatar" src="' + res[i].avatar +'">' + 
            '<img class="border" src="/images/second-border.png">' + 
            '</div>';  
          }
        }
      }
      $('.header').empty().append(str)
    }
  });
}

//加载干事信息
function refresh(name) {
  $('#EmployeeDemo').html("");
  layui.use('flow', function () {
    var flow = layui.flow;
    flow.load({
      elem: '#EmployeeDemo',
      done: function (page, next) {
        var lis = [];
        $.ajax({
          type: "post",
          url: url + "/user/queryEmployeesInfo",
          dataType: "json",
          data: JSON.stringify({
            "username": name,
            "pageNum": page,
            "pageSize": 6
          }),
          xhrFields: {
            withCredentials: true
          },
          contentType: "application/json;charset=UTF-8",
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
              lis.push('<div class="layui-btn-group btn">');
              lis.push('<button class="layui-btn layui-btn-primary layui-btn-sm dismiss" value="' + item.id + '">辞退</button>');
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

//辞退
$('body').on('click', '.dismiss', function () {
  $.ajax({
    type: "get",
    url: url + "/user/dismiss",
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: {
      "id": $(this).attr("value")
    },
    success: function (res) {
      parent.layui.layer.msg(res.msg);
      refresh($(".community-this").attr("value"),"");
    }
  });
});

$('#name').on('input propertychange', function () {
  name = $('#name').val();
  refresh($('#name').val());
});