if (getCookie('role') == '干事') {
  $('.modifyBtn').hide()
}

layui.use('layer', function () {
  var layer = layui.layer;

  getDepartment();
  // 获取部门信息
  function getDepartment() {
    $.ajax({
      type: "get",
      url: url + "/department/getMyDepartment",
      contentType: "application/json;charset=UTF-8",
      xhrFields: {
        withCredentials: true
      },
      success: function (res) {
        console.log(res)
        $('.ResumesBasic-box').empty().append('<div class="ResumesBasic">' +
          '<div class="ResumesBasicTitle">' +
          '<h1>' + res.name + '</h1>' +
          '<h3>领导组织：' + '<span class="resume_key show">' + res.leadOrganize + '' + '</span>' + '<input id="leadOrganize" class="modify hide" placeholder="领导组织" value="' + res.leadOrganize + '">' + '</h3>' +
          '</div>' +
          '<div class="ResumesBasicTitle">' +
          '<div class="h4">' +
          '<p class="email-h4 " data-class="email-h4">' +
          '<span>性质：' + '<span class="resume_key show">' + res.characters + '</span>' + '</span>' +
          '<input id="characters" class="modify hide" placeholder="性质" value="' + res.characters + '">' +
          '</p>' +
          '<p class="email-h4 " data-class="email-h4">' +
          '<span>总人数：' + '<span class="resume_key show">' + res.num + '人</span>' + '</span>' +
          '<input id="num" class="modify hide" placeholder="总人数" value="' + res.num + '">' +
          '</p>' +
          '<p class="phone-h4 " data-class="phone-h4">' +
          '<span>负责人姓名：' + '<span class="resume_key show">' + res.masterName + '</span>' + '</span>' +
          '<input id="masterName" class="modify hide" placeholder="负责人姓名" value="' + res.masterName + '">' +
          '</p>' +
          '<p class="phone-h4 " data-class="phone-h4">' +
          '<span>负责人电话：' + '<span class="resume_key show">' + res.masterTel + '</span>' + '</span>' +
          '<input id="masterTel" class="modify hide" placeholder="负责人电话" value="' + res.masterTel + '">' +
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
          '<span class="adressP">部门信息：<span class="resume_key show">' + res.info + '</span>' +
          '<textarea id="info" class="modify hide" placeholder="部门信息" value="' + res.info.replace(new RegExp("<br/>", "g"), '\n') + '">' + res.info.replace(new RegExp("<br/>", "g"), '\n') + '</textarea>' +
          '</p>' +
          '</div>' +
          '</div>' +
          '</div>');
  
        $('.ListAppend').empty().append('<div class="ListItem Honors">' +
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
          '<p class="resume_key show">' + res.duty + '</p>' +
          '<textarea id="duty" class="modify hide" placeholder="部门职责" value="' + res.duty.replace(new RegExp("<br/>", "g"), '\n') + '">' + res.duty.replace(new RegExp("<br/>", "g"), '\n') + '</textarea>' +
          '</li>' +
          '</ul>' +
          '</article>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
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
          '<p class="resume_key show">' + res.generalRules + '</p>' +
          '<textarea id="generalRules" class="modify hide" placeholder="总则" value="' + res.generalRules.replace(new RegExp("<br/>", "g"), '\n') + '">' + res.generalRules.replace(new RegExp("<br/>", "g"), '\n') + '</textarea>' +
          '</li>' +
          '</ul>' +
          '</article>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
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
          '<p class="resume_key show">' + res.purpose + '</p>' +
          '<textarea id="purpose" class="modify hide" placeholder="宗旨" value="' + res.purpose.replace(new RegExp("<br/>", "g"), '\n') + '">' + res.purpose.replace(new RegExp("<br/>", "g"), '\n') + '</textarea>' +
          '</li>' +
          '</ul>' +
          '</article>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
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
          '<p class="resume_key show">' + res.droit + '</p>' +
          '<textarea id="droit" class="modify hide" placeholder="权利" value="' + res.droit.replace(new RegExp("<br/>", "g"), '\n') + '">' + res.droit.replace(new RegExp("<br/>", "g"), '\n') + '</textarea>' +
          '</li>' +
          '</ul>' +
          '</article>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
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
          '<p class="resume_key show">' + res.obligation + '</p>' +
          '<textarea id="obligation" class="modify hide" placeholder="义务" value="' + res.obligation.replace(new RegExp("<br/>", "g"), '\n') + '">' + res.obligation.replace(new RegExp("<br/>", "g"), '\n') + '</textarea>' +
          '</li>' +
          '</ul>' +
          '</article>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
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
          '<p class="resume_key show">' + res.requirement + '</p>' +
          '<textarea id="requirement" class="modify hide" placeholder="要求" value="' + res.requirement.replace(new RegExp("<br/>", "g"), '\n') + '">' + res.requirement.replace(new RegExp("<br/>", "g"), '\n') + '</textarea>' +
          '</li>' +
          '</ul>' +
          '</article>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
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
          '<p class="resume_key show">' + res.other + '</p>' +
          '<textarea id="other" class="modify hide" placeholder="其他" value="' + res.other.replace(new RegExp("<br/>", "g"), '\n') + '">' + res.other.replace(new RegExp("<br/>", "g"), '\n') + '</textarea>' +
          '</li>' +
          '</ul>' +
          '</article>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>');
      },
      error: function (res) {
        layer.msg('错误请重试');
      }
    });
  }

  $("#modify1").click(function () {
    $('.show').removeClass('resume_key');
    $('.modify').removeClass('hide');
    $('#modify2').removeClass('hide');
    $('#modify1').addClass('hide');
    $('.show').addClass('hide');
  });

  $("#modify2").click(function () {
    $('.show').addClass('resume_key');
    $('.modify').addClass('hide');
    $('#modify2').addClass('hide');
    $('#modify1').removeClass('hide');
    $('.show').removeClass('hide');

    $.ajax({
			url: url + '/department/updateMyDepartment',
			type: 'post',
			dataType: 'json',
			async: true,
			contentType: "application/json;charset=UTF-8",
			xhrFields: {
				withCredentials: true
			},
			data: JSON.stringify({
				'characters': $('#characters').val(),
				'num': $('#num').val(),
				'masterName': $('#masterName').val(),
				'masterTel': $('#masterTel').val(),
				'info': $('#info').val(),
				'duty': $('#duty').val(),
				'generalRules': $('#generalRules').val(),
				'generalRules': $('#generalRules').val(),
				'purpose': $('#purpose').val(),
				'droit': $('#droit').val(),
				'obligation': $('#obligation').val(),
				'requirement': $('#requirement').val(),
				'other': $('#other').val()
			}),
			success: function (data) {
				if (data <= 0 ) {
					layer.msg("修改失败，请重试！", {
						icon: 5,
						time: 1000
					});
					getDepartment();
				} else {
					layer.msg('修改成功', {
						icon: 1,
						time: 1000
					});
					getDepartment();
				}
			},
			error: function (res) {
				layer.msg('保存失败，请重新修改', {
					icon: 5,
					time: 1000
				});
			}
		});
  });
});