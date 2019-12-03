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
    
    $('.community-nav').on('click', '.community-item a', function () {
      $(this).addClass('community-this').parent().siblings().children().removeClass('community-this');
    });
    
    $('.community-item').eq(0).children('a').click();
  }
});