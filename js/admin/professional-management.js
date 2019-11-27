var numStudent = 1; //当前页
let tableLength; // 分页长度
let editId;
let status = true;
let studentObj = {
  "professionId": '',
  "name": '',
  "num": '',
  "professionName": '',
  "pageSize": 10,
  "pageNum": numStudent
}

// 进入页面获取表格
getStudentData();

function getStudentData(first) {
  $.ajax({
    type: "post",
    url: url + "/major/queryMajor",
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
          '<div>' + res.data[index].professionName + '</div>\n' +
          '</td>\n' +
          '<td>\n' +
          '<div>' + res.data[index].name + '</div>\n' +
          '</td>\n' +
          '<td>\n' +
          '<div>' + res.data[index].num + '</div>\n' +
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

// 删除专业
$('body').on('click', '.deleteStudent', function () {
  $.ajax({
    type: "get",
    url: url + "/major/delMajorById",
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

// 查看专业详细信息
$('body').on('click', '.checkDetail', function () {
  getDetail($(this).attr('value'));
  $('.wrrap').show();
});

$('.closeStudentBox').click(function () {
  $('.wrrap').hide();
});

// 修改专业信息
$('body').on('click', '.editStudent', function () {
  status = false;
  editId = $(this).attr('value');
  getDetail($(this).attr('value'));
  $('.wrrap2').show();
});

$('.submitMessage').click(function () {
  $.ajax({
    type: "post",
    url: url + "/major/updateMajorById",
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({
      "id": editId,
      "profession": $('.studentBox2 #professionName2').text(),
      "name": $('.studentBox2 #majorName2').text(),
      "num": $('.studentBox2 .num').val(),
      "professionId": $('#professionName2').attr('value')
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
    url: url + "/major/findMajorById",
    data: {
      "id": e
    },
    success: function (res) {
      console.log(res)
      $('.studentBox .profession-name').val(res.professionName);
      $('.studentBox .major-name').val(res.name);
      $('.studentBox .num,.studentBox2 .num').val(res.num);
      $('.studentBox2 #professionName2').text(res.professionName);
      $('.studentBox2 #majorName2').text(res.name);
      for (let i = 0; i < $('.professionBox2').children('div').length; i++) {
        if ($('#professionName2').text() == $('.professionBox2').children('div').eq(i).text()) {
          $('#professionName2').attr('value', $('.professionBox2').children('div').eq(i).attr('value'));
          $('#professionName2').text($('.professionBox2').children('div').eq(i).text())
        }
      }
    }
  });
}

// 添加专业
$('.addStudent').click(function () {
  $('.wrrap3').show();
});

$('.addMessage').click(function () {
  $.ajax({
    type: "post",
    url: url + "/major/addMajor",
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({
      "profession": $('.studentBox3 #professionName').text(),
      "num": $('.studentBox3 .num2').val(),
      "name": $('.studentBox3 .majorName').val(),
      "professionId": $('.studentBox3 #professionName').attr('value')
    }),
    success: function (res) {
      layer.msg('添加成功');
      $('.studentBox3 #professionName').text('院系');
      $('.studentBox3 .num2').val('');
      $('.studentBox3 .majorName').val('');
      $('.wrrap3').hide();
      $('#studentTable').empty();
      getStudentData();
    }
  });
});

$('.closeStudentBox3').click(function () {
  $('.studentBox3 #professionName').text('院系');
  $('.studentBox3 .num2').val('');
  $('.studentBox3 .majorName').val('');
  $('.wrrap3').hide();
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

$('.searchName :input').on('input propertychange', function () {
  studentObj.name = $('.searchName input').val();
  getStudentData();
});

// // 获取院系下拉框
$.ajax({
  type: "get",
  url: url + "/profession/getProfessionItem",
  success: function (res) {
    var data = '';
    for (let index = 0; index < res.length; index++) {
      data += '<div value=" ' + res[index].id + ' ">' + res[index].name + '</div>\n'
    }
    $('.professionType').append(data);
    $('.professionBox').append(data);
    $('.professionBox2').append(data);
  }
});

// // 获取专业下拉框
$('#professionTypeName').bind('DOMNodeInserted', function () {
  studentObj.professionId = $('#professionTypeName').attr('value');
  $('.majorType').empty();
  $('#majorTypeName').text('专业');
  $('#classTypeName').text('班级');
  getStudentData(); // 选取院系更新表格
  $.ajax({
    type: "get",
    url: url + "/major/getMajorItem",
    data: {
      "id": $(this).attr('value')
    },
    success: function (res) {
      var data = '';
      for (let index = 0; index < res.length; index++) {
        data += '<div value=" ' + res[index].id + ' ">' + res[index].name + '</div>\n'
      }
      $('.majorType').append(data);
    }
  });
});
$('#professionName,#professionName2').bind('DOMNodeInserted', function () {
  if (!$(this).attr('value')) {
    return
  }
  $('.majorBox').empty();
  $('.majorBox2').empty();
  $('#majorName').text('专业');
  $('#className').text('班级');
  if (status == true) {
    $('#majorName2').text('专业');
    $('#className2').text('班级');
  }
  $.ajax({
    type: "get",
    url: url + "/major/getMajorItem",
    data: {
      "id": $(this).attr('value')
    },
    success: function (res) {
      var data = '';
      for (let index = 0; index < res.length; index++) {
        data += '<div value=" ' + res[index].id + ' ">' + res[index].name + '</div>\n'
      }
      $('.majorBox').append(data);
      $('.majorBox2').append(data);
      for (let i = 0; i < $('.majorBox2').children('div').length; i++) {
        if ($('#majorName2').text() == $('.majorBox2').children('div').eq(i).text()) {
          $('#majorName2').attr('value', $('.majorBox2').children('div').eq(i).attr('value'));
          $('#majorName2').text($('.majorBox2').children('div').eq(i).text())
        }
      }
    }
  });
});

// 获取班级下拉框
$('#majorTypeName').bind('DOMNodeInserted', function () {
  if ($('#majorTypeName').text() == '专业') {
    studentObj.name = '';
    return
  }
  studentObj.name = $('#majorTypeName').text();
  $('.classType').empty();
  $('#classTypeName').text('班级');
  getStudentData(); // 选取专业更新表格
});