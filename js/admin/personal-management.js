//加载部门列表
$.ajax({
  type: "post",
  url: url + "/department/queryDepartment",
  dataType: "json",
  contentType: "application/json;charset=UTF-8",
  data: JSON.stringify({
    "name": ''
  }),
  success: function (res) {
    var data = '';
    for (let index = 0; index < res.data.length; index++) {
      if (index == res.data.length - 1) {
        data += '<li class="community-item">\n' +
          '<a href="javascript:;" value="' + res.data[index].id + '">' + res.data[index].name + '</a>\n' +
          '</li>\n'
      } else {
        data += '<li class="community-item">\n' +
          '<a href="javascript:;" value="' + res.data[index].id + '">' + res.data[index].name + '</a>\n' +
          '</li>\n' +
          '<hr>'
      }
    }
    $('.community-nav').append(data);

    //点击刷新干事列表
    $('.community-nav').on('click', '.community-item a', function () {
      $(this).addClass('community-this').parent().siblings().children().removeClass('community-this');

      var departmentId = $(this).attr("value");
      refresh(departmentId);
    });

    $('.community-item').eq(0).children('a').click();
  }
  
});

function refresh(id) {
  $('#EmployeeDemo').html("");
  layui.use('flow', function(){
    var flow = layui.flow;
    flow.load({
      elem: '#EmployeeDemo',
      done: function(page, next){
        var lis = [];
        $.ajax({
          type: "post",
          url: url + "/user/queryUser",
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          data: JSON.stringify({
            "name": '',
            "departmentId": id,
          }),
          success: function (res) {
            layui.each(res.data, function(index, item){
              lis.push('<div class="layui-col-md4 layui-col-sm6">');
              lis.push('<div class="layadmin-contact-box" > ');
              lis.push('<div class="layui-col-md4 layui-col-sm6">');
              lis.push('<div class="layadmin-text-center">');
              lis.push('<img src="'+item.avatar+'">');
              lis.push('</div>');
              lis.push('</div>');
              lis.push('<div class="layui-col-md8 layadmin-padding-left20 layui-col-sm6">');
              lis.push('<div class="layui-row">');
              lis.push('<div class="layui-col-md8">');
              lis.push('<h3 class="layadmin-title">');
              lis.push('<strong>'+item.username+'</strong>');
              lis.push('</h3>');
              lis.push('</div>');
              lis.push('</div>');
              lis.push('<div class="layadmin-address">');
              lis.push('<p>'+item.account+'<p>');
              lis.push('<p><i class="layui-icon layui-icon-cellphone"></i>:'+item.tel+'</p>');
              lis.push('</div>');
              lis.push('</div>');
              lis.push('<div class="layadmin-maillist-img layadmin-font-blod">');
              lis.push('<div class="layui-btn-group" style="margin-top: 12px">');
              lis.push('<button class="layui-btn layui-btn-primary layui-btn-sm dismiss" value="'+ item.id +'">辞退</button>');
              lis.push('<button class="layui-btn layui-btn-primary layui-btn-sm appoint1" value="'+ item.id +'">任命为社长</button>');
              lis.push('<button class="layui-btn layui-btn-primary layui-btn-sm appoint2" value="'+ item.id +'">任命为副社长</button>');
              lis.push('</div>');
              lis.push('</div>');
              lis.push('</div>');
              lis.push('</div>');
            }); 
            next(lis.join(' '), page < res.count/6);    
          }
        });
      }
    });
  });
}

$('body').on('click', '.dismiss', function () {
  //辞退
  refresh($(this).attr("value"));
  // $(this).remove();
});
