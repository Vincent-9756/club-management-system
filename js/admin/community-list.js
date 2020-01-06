var numStudent = 1; //当前页
let tableLength; // 分页长度
let editId;
let status = true;
let studentObj = {
  "name": '',
  "info": '',
  "professionId": '',
  "pageSize": 10,
  "pageNum": numStudent
}

layui.use('laydate', function () {
  laydate = layui.laydate;
  changeDate(registrationTime);
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
    url: url + "/department/queryDepartment",
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
          '<div>' + res.data[index].num + '</div>\n' +
          '</td>\n' +
          '<td>\n' +
          '<div>' + res.data[index].masterName + '</div>\n' +
          '</td>\n' +
          '<td>\n' +
          '<div>' + res.data[index].masterTel + '</div>\n' +
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

// 删除社团
$('body').on('click', '.deleteStudent', function () {
  $.ajax({
    type: "get",
    url: url + "/department/delDepartmentById",
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

// 查看社团详细信息
$('body').on('click', '.checkDetail', function () {
  getDetail($(this).attr('value'));
  $('.wrrap').show();
});

$('.closeStudentBox').click(function () {
  $('.wrrap').hide();
});

// 修改社团信息
$('body').on('click', '.editStudent', function () {
  status = false;
  editId = $(this).attr('value');
  getDetail($(this).attr('value'));
  $('.wrrap2').show();
});

$('.submitMessage').click(function () {
  $.ajax({
    type: "post",
    url: url + "/department/updateDepartmentById",
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({
      "id": editId,
      "profession": $('.studentBox2 #professionName2').text(),
      "name": $('.studentBox2 .name').val(),
      "info": $('.studentBox2 .info').val(),
      "professionId": $('#professionName2').attr('value'),
      "duty": $('.studentBox2 .duty').val(),
      "characters": $('.studentBox2 .characters').val(),
      "masterName": $('.studentBox2 .masterName').val(),
      "masterTel": $('.studentBox2 .masterTel').val(),
      "leadOrganize": $('.studentBox2 .leadOrganize').val(),
      "registrationTime": $('.studentBox2 #registrationTime').val(),
      "registrationName": $('.studentBox2 .registrationName').val(),
      "num": $('.studentBox2 .num').val(),
      "generalRules": $('.studentBox2 .generalRules').val(),
      "purpose": $('.studentBox2 .purpose').val(),
      "droit": $('.studentBox2 .droit').val(),
      "obligation": $('.studentBox2 .obligation').val(),
      "requirement": $('.studentBox2 .requirement').val(),
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
    url: url + "/department/findDepartmentById",
    data: {
      "id": e
    },
    success: function (res) {
      $('.studentBox .profession-name').val(res.professionName);
      $('.studentBox .info,.studentBox2 .info').val(res.info);
      $('.studentBox .name,.studentBox2 .name').val(res.name);
      $('.studentBox .duty,.studentBox2 .duty').val(res.duty);
      $('.studentBox .characters,.studentBox2 .characters').val(res.characters);
      $('.studentBox .masterName,.studentBox2 .masterName').val(res.masterName);
      $('.studentBox .masterTel,.studentBox2 .masterTel').val(res.masterTel);
      $('.studentBox .leadOrganize,.studentBox2 .leadOrganize').val(res.leadOrganize);
      $('.studentBox .registrationTime,.studentBox2 #registrationTime').val(res.registrationTime);
      $('.studentBox .updateTime').val(res.updateTime);
      $('.studentBox .registrationName,.studentBox2 .registrationName').val(res.registrationName);
      $('.studentBox .num,.studentBox2 .num').val(res.num);
      $('.studentBox .generalRules,.studentBox2 .generalRules').val(res.generalRules);
      $('.studentBox .purpose,.studentBox2 .purpose').val(res.purpose);
      $('.studentBox .droit,.studentBox2 .droit').val(res.droit);
      $('.studentBox .obligation,.studentBox2 .obligation').val(res.obligation);
      $('.studentBox .requirement,.studentBox2 .requirement').val(res.requirement);
      $('.studentBox2 #professionName2').text(res.professionName);
      for (let i = 0; i < $('.professionBox2').children('div').length; i++) {
        if ($('#professionName2').text() == $('.professionBox2').children('div').eq(i).text()) {
          $('#professionName2').attr('value', $('.professionBox2').children('div').eq(i).attr('value'));
          $('#professionName2').text($('.professionBox2').children('div').eq(i).text())
        }
      }
    }
  });
}

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

$('#professionTypeName').bind('DOMNodeInserted', function () {
  studentObj.professionId = $('#professionTypeName').attr('value');
  $('.majorType').empty();
  $('#majorTypeName').text('专业');
  $('#classTypeName').text('班级');
  getStudentData(); // 选取院系更新表格
});