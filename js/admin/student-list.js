var numStudent = 1; //当前页
let tableLength; // 分页长度
let editId;
let status = true;
let studentObj = {
  "id": '',
  "name": '',
  "sex": '',
  "age": '',
  "birthday": '',
  "roots": '',
  "volk": '',
  "code": '',
  "id_card": '',
  "political": '',
  "address": '',
  "tel": '',
  "email": '',
  "parent_tel": '',
  "parent_name1": '',
  "parent_name2": '',
  "school": '',
  "major": '',
  "grade": '',
  "clazz": '',
  "content": '',
  "profession": '',
  "pageSize": 10,
  "pageNum": numStudent
}

// 进入页面获取表格
getStudentData();

function getStudentData(first) {
  $.ajax({
    type: "post",
    url: url + "/student/queryStudent",
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
          '<div>' + res.data[index].name + '</div>\n' +
          '</td>\n' +
          '<td>\n' +
          '<div>' + res.data[index].sex + '</div>\n' +
          '</td>\n' +
          '<td>\n' +
          '<div>' + res.data[index].profession + '</div>\n' +
          '</td>\n' +
          '<td>\n' +
          '<div>' + res.data[index].major + '</div>\n' +
          '</td>\n' +
          '<td>\n' +
          '<div>' + res.data[index].grade + '级' + '</div>\n' +
          '</td>\n' +
          '<td>\n' +
          '<div>' + res.data[index].clazz + '</div>\n' +
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

// 删除学生
$('body').on('click', '.deleteStudent', function () {
  $.ajax({
    type: "get",
    url: url + "/student/delStudentById",
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

// 查看学生详细信息
$('body').on('click', '.checkDetail', function () {
  getDetail($(this).attr('value'));
  $('.wrrap').show();
});

$('.closeStudentBox').click(function () {
  $('.wrrap').hide();
});

// 修改学生信息
$('body').on('click', '.editStudent', function () {
  status = false;
  editId = $(this).attr('value');
  getDetail($(this).attr('value'));
  $('.wrrap2').show();
});

$('.submitMessage').click(function () {
  $.ajax({
    type: "post",
    url: url + "/student/updateStudentById",
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({
      "id": editId,
      "name": $('.studentBox2 .userName').val(),
      "sex": $('.studentBox2 .sex').val(),
      "age": $('.studentBox2 .age').val(),
      "birthday": $('.studentBox2 #birthday').val(),
      "roots": $('.studentBox2 .roots').val(),
      "volk": $('.studentBox2 .volk').val(),
      "code": $('.studentBox2 .code').val(),
      "idCard": $('.studentBox2 .idCard').val(),
      "political": $('.studentBox2 .political').val(),
      "address": $('.studentBox2 .address').val(),
      "tel": $('.studentBox2 .tele').val(),
      "email": $('.studentBox2 .email').val(),
      "parentTel": $('.studentBox2 .parentTel').val(),
      "parentName1": $('.studentBox2 .parentName1').val(),
      "parentName2": $('.studentBox2 .parentName2').val(),
      "profession": $('.studentBox2 #professionName2').text(),
      "major": $('.studentBox2 #majorName2').text(),
      "grade": $('.studentBox2 .grade').val(),
      "clazz": $('.studentBox2 #className2').text(),
      "content": ''
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
    url: url + "/student/findStudentById",
    data: {
      "id": e
    },
    success: function (res) {
      $('.studentBox .userName,.studentBox2 .userName').val(res.name);
      $('.studentBox .age,.studentBox2 .age').val(res.age);
      $('.studentBox .sex,.studentBox2 .sex').val(res.sex);
      $('.studentBox .address,.studentBox2 .address').val(res.address);
      $('.studentBox .roots,.studentBox2 .roots').val(res.roots);
      $('.studentBox .birthday').val(res.birthday);
      $('.studentBox2 #birthday').val(res.birthday)
      $('.studentBox .idCard,.studentBox2 .idCard').val(res.idCard);
      $('.studentBox .code,.studentBox2 .code').val(res.code);
      $('.studentBox .profession').val(res.profession);
      $('.studentBox2 #professionName2').text(res.profession);
      $('.studentBox .major').val(res.major);
      $('.studentBox2 #majorName2').text(res.major);
      $('.studentBox .grade,.studentBox2 .grade').val(res.grade);
      $('.studentBox .class').val(res.clazz);
      $('.studentBox2 #className2').text(res.clazz);
      $('.studentBox .volk,.studentBox2 .volk').val(res.volk);
      $('.studentBox .political,.studentBox2 .political').val(res.political);
      $('.studentBox .tele,.studentBox2 .tele').val(res.tel);
      $('.studentBox .email,.studentBox2 .email').val(res.email);
      $('.studentBox .parentName1,.studentBox2 .parentName1').val(res.parentName1);
      $('.studentBox .parentName2,.studentBox2 .parentName2').val(res.parentName2);
      $('.studentBox .parentTel,.studentBox2 .parentTel').val(res.parentTel);

      for (let i = 0; i < $('.professionBox2').children('div').length; i++) {
        if ($('#professionName2').text() == $('.professionBox2').children('div').eq(i).text()) {
          $('#professionName2').attr('value', $('.professionBox2').children('div').eq(i).attr('value'));
          $('#professionName2').text($('.professionBox2').children('div').eq(i).text())
        }
      }
    }
  });
}

// 添加学生
$('.addStudent').click(function () {
  $('.wrrap3').show();
});

$('.addMessage').click(function () {
  $.ajax({
    type: "post",
    url: url + "/student/addStudent",
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({
      "name": $('.studentBox3 .userName').val(),
      "sex": $('.studentBox3 .sex').val(),
      "age": $('.studentBox3 .age').val(),
      "birthday": $('.studentBox3 #birthday2').val(),
      "roots": $('.studentBox3 .roots').val(),
      "volk": $('.studentBox3 .volk').val(),
      "code": $('.studentBox3 .code').val(),
      "idCard": $('.studentBox3 .idCard').val(),
      "political": $('.studentBox3 .political').val(),
      "address": $('.studentBox3 .address').val(),
      "tel": $('.studentBox3 .tele').val(),
      "email": $('.studentBox3 .email').val(),
      "parentTel": $('.studentBox3 .parentTel').val(),
      "parentName1": $('.studentBox3 .parentName1').val(),
      "parentName2": $('.studentBox3 .parentName2').val(),
      "profession": $('.studentBox3 #professionName').text(),
      "major": $('.studentBox3 #majorName').text(),
      "grade": $('.studentBox3 .grade').val(),
      "clazz": $('.studentBox3 #className').text(),
      "content": ''
    }),
    success: function (res) {
      layer.msg('添加成功');
      $('.studentBox3 .userName').val('');
      $('.studentBox3 .sex').val('');
      $('.studentBox3 .age').val('');
      $('.studentBox3 #birthday2').val('');
      $('.studentBox3 .roots').val('');
      $('.studentBox3 .volk').val('');
      $('.studentBox3 .code').val('');
      $('.studentBox3 .idCard').val('');
      $('.studentBox3 .political').val('');
      $('.studentBox3 .address').val('');
      $('.studentBox3 .tele').val('');
      $('.studentBox3 .email').val('');
      $('.studentBox3 .parentTel').val('');
      $('.studentBox3 .parentName1').val('');
      $('.studentBox3 .parentName2').val('');
      $('.studentBox3 #professionName').text('院系');
      $('.studentBox3 #majorName').text('专业');
      $('.studentBox3 .grade').val('');
      $('.studentBox3 #className').text('班级');
      $('.wrrap3').hide();
      $('#studentTable').empty();
      getStudentData();
    }
  });
});

$('.closeStudentBox3').click(function () {
  $('.studentBox3 .userName').val('');
  $('.studentBox3 .sex').val('');
  $('.studentBox3 .age').val('');
  $('.studentBox3 .birthday').val('');
  $('.studentBox3 .roots').val('');
  $('.studentBox3 .volk').val('');
  $('.studentBox3 .code').val('');
  $('.studentBox3 .idCard').val('');
  $('.studentBox3 .political').val('');
  $('.studentBox3 .address').val('');
  $('.studentBox3 .tele').val('');
  $('.studentBox3 .email').val('');
  $('.studentBox3 .parentTel').val('');
  $('.studentBox3 .parentName1').val('');
  $('.studentBox3 .parentName2').val('');
  $('.studentBox3 #professionName').text('院系');
  $('.studentBox3 .majorName').text('专业');
  $('.studentBox3 .grade').val('');
  $('.studentBox3 .className').text('班级');
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

// 获取院系下拉框
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

// 获取专业下拉框
$('#professionTypeName').bind('DOMNodeInserted', function () {
  studentObj.profession = $('#professionTypeName').text();
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
    studentObj.major = '';
    return
  }
  studentObj.major = $('#majorTypeName').text();
  $('.classType').empty();
  $('#classTypeName').text('班级');
  getStudentData(); // 选取专业更新表格
  $.ajax({
    type: "get",
    url: url + "/clazz/getClazzItem",
    data: {
      "id": $('#majorTypeName').attr('value')
    },
    success: function (res) {
      var data = '';
      for (let index = 0; index < res.length; index++) {
        data += '<div value=" ' + res[index].id + ' ">' + res[index].name + '</div>\n'
      }
      $('.classType').append(data);
    }
  });
});

$('#majorName,#majorName2').bind('DOMNodeInserted', function () {
  if ($(this).text() == '专业' || !$(this).attr('value')) {
    return
  }
  $('.classBox').empty();
  $('#className').text('班级');
  if (status == true) {
    $('#className2').text('班级');
  }
  $('.classBox2').empty();
  $.ajax({
    type: "get",
    url: url + "/clazz/getClazzItem",
    data: {
      "id": $(this).attr('value')
    },
    success: function (res) {
      var data = '';
      for (let index = 0; index < res.length; index++) {
        data += '<div value=" ' + res[index].id + ' ">' + res[index].name + '</div>\n'
      }
      $('.classBox').append(data);
      $('.classBox2').append(data);
      status = true
    }
  });
});

$('#classTypeName').bind('DOMNodeInserted', function () {
  if ($('#classTypeName').text() == '班级') {
    studentObj.clazz = ''
    return
  }
  studentObj.clazz = $('#classTypeName').text();
  getStudentData(); // 选取班级1更新表格
});

layui.use('laydate', function () {
  laydate = layui.laydate;
  changeDate(birthday);
  changeDate(birthday2);
});

function changeDate(id) {
  laydate.render({
    elem: id,
    format: 'yyyy-MM-dd'
  });
}