$(function () {
  //获取url中的参数
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  }
  intiContent = function () {
    $.ajax({
      url: url + '/scheme/findSchemeById',
      type: 'post',
      data: {
        id: getUrlParam('id')
      },
      dataType: 'json',
      error: function (res) {},
      success: function (data) {
        intiPage(data);
      }
    });
  }
  intiContent();

  intiPage = function (data) {
    $("#page1").empty();
    $("#page1").append(
      '<div align="center">' +
      //				'	<p class="title">福建工程学院国脉信息学院</p>'+
      '	<p class="title">' + data.name + '</p>' +
      '	<p><span class="BigFont">策</span></p>' +
      '	<p><span class="BigFont">划</span></p>' +
      '	<p><span class="BigFont">书</span></p>' +
      '</div>' +
      '<div align="center" class="DepartmentName">' +
      '	<p class="Tail" style="margin-top: 10em;">' + data.departmentName + '</p>' +
      '</div>');
    $("#page2").append('<div id="divpage"></div>');
    re = new RegExp("<br/>", "g"); //定义正则表达式
    let goal = '无', theme = '无', arrangements = '无', flow = '无', content = '无', budget = '无', award = '无', description = '无';
    if (data.theme != null && data.theme != '') {
      theme = data.theme.replace(re, "</p ><p>");
    }
    if (data.goal != null && data.goal != '') {
      goal = data.goal.replace(re, "</p><p>");
    }
    if (data.arrangements != null && data.arrangements != '') {
      arrangements = data.arrangements.replace(re, "</p><p>");
    }
    if (data.flow != null && data.flow != '') {
      flow = data.flow.replace(re, "</p><p>");
    }
    if (data.content != null && data.content != '') {
      content = data.content.replace(re, "</p><p>");
    }
    if (data.budget != null && data.budget != '') {
      budget = data.budget.replace(re, "</p><p>");
    }
    if (data.award != null && data.award != '') {
      award = data.award.replace(re, "</p><p>");
    }
    if (data.description != null && data.description != '') {
      description = data.description.replace(re, "</p><p>");
    }
    $("#divpage").append(
      '<div align="center" style="text-align: center;">' +
      '	<p class="Name">福建工程学院国脉信息学院' + data.name + '</p>' +
      '</div>' +
      '<div class="FirstLine Text">' +
      '	<p class="FirstTitle">一、活动主题：</p>' +
      '	<p>' + data.theme + '</p>' +
      '	<p class="FirstTitle">二、活动目的：</p>' +
      '	<p>' + goal + '</p>' +
      '	<p class="FirstTitle">三、活动时间：</p>' +
      '	<p>' + data.beginTime + '</p>' +
      '	<p class="FirstTitle">四、活动地点：</p>' +
      '	<p>' + data.place + '</p>' +
      '	<p class="FirstTitle">五、活动对象：</p>' +
      '	<p>' + data.person + '</p>' +
      '	<p class="FirstTitle">六、活动形式：</p>' +
      '	<p>' + data.form + '</p>' +
      '	<p class="FirstTitle">七、主办单位：</p>' +
      '	<p>' + data.departmentName + '</p>' +
      '	<p class="FirstTitle">八、承办单位：</p>' +
      '	<p>' + data.departmentName + '</p>' +
      '	<p class="FirstTitle">九、活动人员安排</p>' +
      '	<p>' + arrangements + '</p>' +
      '	<p class="FirstTitle">十、活动流程</p>' +
      '	<p>' + flow + '</p>' +
      '	<p class="FirstTitle">十一、活动内容：</p>' +
      '	<p>' + content + '</p>' +
      '	<p class="FirstTitle">十二、资金预算：</p>' +
      '	<p>' + budget + '</p>' +
      '	<p class="FirstTitle">十三、奖励：</p>' +
      '	<p>' + award + '</p>' +
      '	<p class="FirstTitle">十四、活动说明：</p>' +
      '	<p>' + description + '</p>' +
      '</div>');
    $("#divpage").append(
      '<div align="right">' +
      '	<div class="Sign">' +
      '		<p class="FirstTitle" align="center">福建工程学院国脉信息学院</p>' +
      '		<p class="FirstTitle" align="center">' + data.departmentName + '</p>' +
      '		<p class="FirstTitle" align="center">' + data.createTime + '</p>' +
      '	</div>' +
      '</div>'
    );
  }
});