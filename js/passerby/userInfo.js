$(function () {
	layui.use('layer', function () {
		layer = layui.layer;
	});
	refresh();

	function refresh() {
		$.ajax({
			url: url + '/user/findUserById',
			type: 'get',
			// dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			xhrFields: {
				withCredentials: true
			},
			data: {
				id: getCookie('id')
			},
			async: true,
			success: function (data) {
				console.log(data)
				$('#avatar1').attr('src', data.avatar);
				$('#avatar2').attr('src', data.avatar);
				$('#userName').text(data.username);
				$('#departmentName').text(data.department);
				$('#role').text(data.state);
				$('#account').text(data.account);
				$('#account1').val(data.account);
				$('#tel').text(data.tel);
				$('#tel1').val(data.tel);
				// $('#sex').text(data.student.sex);
				// $('#birthday').text(data.student.birthday);
				// $('#email').text(data.student.email);
				// $('#roots').text(data.student.roots);
				// $('#political').text(data.student.political);
				// $('#volk').text(data.student.volk);
				// $('#age').text(data.student.age);
				// $('#school').text(data.student.school);
				// $('#code').text(data.student.code);
				// $('#code1').val(data.student.code);
				// $('#address').text(data.student.address);
				// $('#award').html('');
				// for (var i = 0; i < data.award.length; i++) {
				// 	var array_element = data.award[i];
				// 	$('#award').append('<ul><li>' + array_element.time + '' + array_element.awardName + '</li></u');
				// }
			},
			error: function (res) {
				layer.msg('网络错误，请重新登录', {
					icon: 5,
					time: 1000
				});
			}
		});
	}

	$("#modify1").click(function () {
		$('.show').removeClass('resume_key');
		$('.modify').removeClass('hide');
		$('#modify2').removeClass('hide');
		$('#modify1').addClass('hide');
	});

	$("#modify2").click(function () {
		$('.show').addClass('resume_key');
		$('.modify').addClass('hide');
		$('#modify2').addClass('hide');
		$('#modify1').removeClass('hide');
		$.ajax({
			url: '../CmUser/updateCmUser.do',
			type: 'post',
			dataType: 'json',
			async: true,
			data: {
				'cmUser_avatar': $('#avatar2').attr('src'),
				'cmUser_account': $('#account1').val(),
				'cmUser_tel': $('#tel1').val(),
				'cmUser_code': $('#code1').val()
			},
			success: function (data) {
				if (data.result == "error") {
					layer.msg(data.errors, {
						icon: 5,
						time: 1000
					});
				} else {
					layer.msg('修改成功', {
						icon: 1,
						time: 1000
					});
					refresh();
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

	layui.use(['upload'],function() {
		var upload = layui.upload;
		upload.render({
		    elem: '#avatar2'
		    ,url: '../CmUser/upload.do'
		    ,multiple: false
		    ,done: function(res){
		    	$('#avatar2').attr("src",res.data.avatar);
		    	$('#avatar1').attr("src",res.data.avatar);
		    }
		  });
	});
});