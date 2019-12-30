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

layui.use('laydate', function () {
  laydate = layui.laydate;
  changeDate(createTime);
  changeDate(createTime2);
});

function changeDate(id) {
  laydate.render({
    elem: id,
    type: 'datetime',
    format: 'yyyy-MM-dd HH:mm:ss'
  });
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
          '<span class="editStudent" value="' + res.data[index].id + '">编辑</span>\n' +
          '<span class="deleteStudent" value="' + res.data[index].id + '">删除</span>\n' +
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

// 删除公告
$('body').on('click', '.deleteStudent', function () {
  $.ajax({
    type: "get",
    url: url + "/news/delNewsById",
    data: {
      "id": $(this).attr('value')
    },
    success: function () {
      layer.msg('删除成功');
      $('#studentTable').empty();
      getStudentData();
    }
  });
});

// 查看公告详细信息
$('body').on('click', '.checkDetail', function () {
  getDetail($(this).attr('value'));
  $('.wrrap').show();
});

$('.closeStudentBox').click(function () {
  $('.wrrap').hide();
});

// 修改公告信息
$('body').on('click', '.editStudent', function () {
  status = false;
  editId = $(this).attr('value');
  getDetail($(this).attr('value'));
  $('.wrrap2').show();
});

$('.submitMessage').click(function () {
  $.ajax({
    type: "post",
    url: url + "/news/updateNewsById",
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({
      "id": editId,
      "tittle": $('.studentBox2 .tittle').val(),
      "content": $('.studentBox2 .content').val(),
      "signature": $('.studentBox2 .signature').val(),
      "createTime": $('.studentBox2 #createTime').val(),
    }),
    success: function (res) {
      layer.msg('修改成功');
      $('#studentTable').empty();
      getStudentData();
      $('.wrrap2').hide();
    }
  });
});

$('.closeStudentBox2').click(function () {
  $('.wrrap2').hide();
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
      $('.studentBox .tittle,.studentBox2 .tittle').val(res.tittle);
      $('.studentBox .content,.studentBox2 .content').val(res.content);
      $('.studentBox .signature,.studentBox2 .signature').val(res.signature);
      $('.studentBox .createTime,.studentBox2 #createTime').val(res.createTime);
    }
  });
}

// 添加公告
$('.addStudent').click(function () {
  $('.wrrap3').show();
});
$('.addMessage').click(function () {
  $.ajax({
    type: "post",
    url: url + "/news/addNews",
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({
      "tittle": $('.studentBox3 .tittle').val(),
      "content": $('.studentBox3 .content').val(),
      "signature": $('.studentBox3 .signature').val(),
      "createTime": $('.studentBox3 #createTime2').val(),
    }),
    success: function (res) {
      layer.msg('添加成功');
      $('.studentBox3 .tittle').val('');
      $('.studentBox3 .content').val('');
      $('.studentBox3 .signature').val('');
      $('.studentBox3 #createTime2').val('');
      $('.wrrap3').hide();
      $('#studentTable').empty();
      getStudentData();
    }
  });
})

$('.closeStudentBox3').click(function () {
  $('.studentBox3 .tittle').val('');
  $('.studentBox3 .content').val('');
  $('.studentBox3 .signature').val('');
  $('.studentBox3 #createTime2').val('');
  $('.wrrap3').hide();
});