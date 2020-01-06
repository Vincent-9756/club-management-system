var numStudent = 1; //当前页
let tableLength; // 分页长度
let editId;
let status = true;
let studentObj = {
  "tittle": '',
  "content": '',
  "signature": '',
  "pageSize": 10,
  "pageNum": numStudent
}

// 进入页面获取表格
getStudentData();

function getStudentData(first) {
  $.ajax({
    type: "post",
    url: url + "/news/queryNews",
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify(studentObj),
    success: function (res) {
      tableLength = res.total
      if (!first) {
        changePage(pagetion);
      }
      var data = '';
      for (let index = 0; index < res.data.length; index++) {
        data += '<tr>\n' +
          '<td>\n' +
          '<div>' + ((index + 1) + (studentObj.pageNum - 1) * 10) + '</div>\n' +
          '</td>\n' +
          '<td>\n' +
          '<div>' + res.data[index].tittle + '</div>\n' +
          '</td>\n' +
          '<td style="width:200px;">\n' +
          '<div style="width:200px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">' + res.data[index].content + '</div>\n' +
          '</td>\n' +
          '<td>\n' +
          '<div>' + res.data[index].signature + '</div>\n' +
          '</td>\n' +
          '<td>\n' +
          '<div>' + res.data[index].createTime + '</div>\n' +
          '</td>\n' +
          '<td>\n' +
          '<div class="operate">\n' +
          '<span class="checkDetail" value="' + res.data[index].id + '">查看详情</span>\n' +
          '</div>\n' +
          '</td>\n' +
          '</tr>\n'
      }
      $('#studentTable').empty().append(data);
    }
  });
}

// 改变分页函数
function changePage(el) {
  layui.use(['laypage', 'layer'], function () {
    var laypage = layui.laypage,
      layer = layui.layer;
    laypage.render({
      elem: el,
      count: tableLength,
      first: '首页',
      last: '尾页',
      prev: '<em>←</em>',
      next: '<em>→</em>',
      jump: function (obj, first) {
        studentObj.pageNum = obj.curr;
        if (!first) {
          getStudentData(1);
        }
      }
    })
  });
}

// 查看公告详细信息
$('body').on('click', '.checkDetail', function () {
  getDetail($(this).attr('value'));
  $('.wrrap').show();
});

$('.closeStudentBox').click(function () {
  $('.wrrap').hide();
});

// 输入框赋值
function getDetail(e) {
  $.ajax({
    type: "get",
    url: url + "/news/findNewsById",
    data: {
      "id": e
    },
    success: function (res) {
      $('.studentBox .tittle').val(res.tittle);
      $('.studentBox .content').val(res.content);
      $('.studentBox .signature').val(res.signature);
      $('.studentBox .createTime').val(res.createTime);
    }
  });
}