layui.use('layer', function () {
  var layer = layui.layer;

  // 获取部门信息
  $.ajax({
    type: "get",
    url: url + "/department/getMyDepartment",
    contentType: "application/json;charset=UTF-8",
    xhrFields: {
      withCredentials: true
    },
    success: function (res) {
      console.log(res)
      $('.ResumesBasic-box').append('<div class="ResumesBasic">' +
        '<div class="ResumesBasicTitle">' +
        '<h1>' + res.name + '</h1>' +
        '<h3>领导组织' + '<span class="resume_key">' + res.leadOrganize + '' + '</span>' + '</h3>' +
        '</div>' +
        '<div class="ResumesBasicTitle">' +
        '<div class="h4">' +
        '<p class="email-h4 " data-class="email-h4">' +
        '<span class="resume_key">性质：' + '<span>' + res.characters + '</span>' + '</span>' +
        '</p>' +
        '<p class="email-h4 " data-class="email-h4">' +
        '<span class="resume_key">总人数：' + '<span>' + res.num + '人</span>' + '</span>' +
        '</p>' +
        '<p class="phone-h4 " data-class="phone-h4">' +
        '<span class="resume_key">负责人姓名：' + '<span>' + res.masterName + '</span>' + '</span>' +
        '</p>' +
        '<p class="phone-h4 " data-class="phone-h4">' +
        '<span class="resume_key">负责人电话：' + '<span>' + res.masterTel + '</span>' + '</span>' +
        '</p>' +
        '<p class="phone-h4 " data-class="phone-h4">' +
        '<span class="resume_key">创始人：' + '<span>' + res.registrationName + '</span>' + '</span>' +
        '</p>' +
        '<p class="sex-h4 " data-class="sex-h4">' +
        '<span class="resume_key">创始时间：' + '<span>' + res.registrationTime + '</span>' + '</span>' +
        '</p>' +
        '</div>' +
        '<div class="adressH">' +
        '<p data-class="rest3">' +
        '<span class="adressP">部门信息：<span>' + res.info + '</span>' +
        '</p>' +
        '</div>' +
        '</div>' +
        '</div>');

      $('.ListAppend').append('<div class="ListItem Honors">' +
        '<div class="ItemTitle">' +
        '<span class="title-line"></span>' +
        '<span class="title">' +
        '<i>部门职责</i>' +
        '</span>' +
        '</div>' +
        '<div class="ItemControl">' +
        '<div class="ItemList">' +
        '<div class="ItemRight">' +
        '<div class="ItemDetails">' +
        '<div class="resume_key">' +
        '<article>' +
        '<ul>' +
        '<li>' +
        '<p>' + res.duty + '</p>' +
        '</li>' +
        '</ul>' +
        '</article>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'+
        '<div class="ListItem Honors">' +
        '<div class="ItemTitle">' +
        '<span class="title-line"></span>' +
        '<span class="title">' +
        '<i>总则</i>' +
        '</span>' +
        '</div>' +
        '<div class="ItemControl">' +
        '<div class="ItemList">' +
        '<div class="ItemRight">' +
        '<div class="ItemDetails">' +
        '<div class="resume_key">' +
        '<article>' +
        '<ul>' +
        '<li>' +
        '<p>' + res.generalRules + '</p>' +
        '</li>' +
        '</ul>' +
        '</article>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'+
        '<div class="ListItem Honors">' +
        '<div class="ItemTitle">' +
        '<span class="title-line"></span>' +
        '<span class="title">' +
        '<i>宗旨</i>' +
        '</span>' +
        '</div>' +
        '<div class="ItemControl">' +
        '<div class="ItemList">' +
        '<div class="ItemRight">' +
        '<div class="ItemDetails">' +
        '<div class="resume_key">' +
        '<article>' +
        '<ul>' +
        '<li>' +
        '<p>' + res.purpose + '</p>' +
        '</li>' +
        '</ul>' +
        '</article>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'+
        '<div class="ListItem Honors">' +
        '<div class="ItemTitle">' +
        '<span class="title-line"></span>' +
        '<span class="title">' +
        '<i>权利</i>' +
        '</span>' +
        '</div>' +
        '<div class="ItemControl">' +
        '<div class="ItemList">' +
        '<div class="ItemRight">' +
        '<div class="ItemDetails">' +
        '<div class="resume_key">' +
        '<article>' +
        '<ul>' +
        '<li>' +
        '<p>' + res.droit + '</p>' +
        '</li>' +
        '</ul>' +
        '</article>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'+
        '<div class="ListItem Honors">' +
        '<div class="ItemTitle">' +
        '<span class="title-line"></span>' +
        '<span class="title">' +
        '<i>义务</i>' +
        '</span>' +
        '</div>' +
        '<div class="ItemControl">' +
        '<div class="ItemList">' +
        '<div class="ItemRight">' +
        '<div class="ItemDetails">' +
        '<div class="resume_key">' +
        '<article>' +
        '<ul>' +
        '<li>' +
        '<p>' + res.obligation + '</p>' +
        '</li>' +
        '</ul>' +
        '</article>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'+
        '<div class="ListItem Honors">' +
        '<div class="ItemTitle">' +
        '<span class="title-line"></span>' +
        '<span class="title">' +
        '<i>要求</i>' +
        '</span>' +
        '</div>' +
        '<div class="ItemControl">' +
        '<div class="ItemList">' +
        '<div class="ItemRight">' +
        '<div class="ItemDetails">' +
        '<div class="resume_key">' +
        '<article>' +
        '<ul>' +
        '<li>' +
        '<p>' + res.requirement + '</p>' +
        '</li>' +
        '</ul>' +
        '</article>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'+
        '<div class="ListItem Honors">' +
        '<div class="ItemTitle">' +
        '<span class="title-line"></span>' +
        '<span class="title">' +
        '<i>其他</i>' +
        '</span>' +
        '</div>' +
        '<div class="ItemControl">' +
        '<div class="ItemList">' +
        '<div class="ItemRight">' +
        '<div class="ItemDetails">' +
        '<div class="resume_key">' +
        '<article>' +
        '<ul>' +
        '<li>' +
        '<p>' + res.other + '</p>' +
        '</li>' +
        '</ul>' +
        '</article>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>')
    },
    error: function (res) {
      layer.msg('错误请重试');
    }
  });
});