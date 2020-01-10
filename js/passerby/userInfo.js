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
				$('#account').text(data.account);
				$('#departmentName').text(data.department);
				$('#role').text(data.state);
				$('#username').text(data.username);
				$('#username1').val(data.username);
				$('#tel').text(data.tel);
				$('#tel1').val(data.tel);
				$('#sex').text(data.student.sex);
				$('#birthday').text(data.student.birthday);
				$('#email').text(data.student.email);
				$('#roots').text(data.student.roots);
				$('#political').text(data.student.political);
				$('#volk').text(data.student.volk);
				$('#age').text(data.student.age);
				$('#school').text(data.student.school);
				$('#code').text(data.student.code);
				$('#code1').val(data.student.code);
				$('#address').text(data.student.address);
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
			url: url + '/user/updateMyInfo',
			type: 'post',
			dataType: 'json',
			async: true,
			contentType: "application/json;charset=UTF-8",
			xhrFields: {
				withCredentials: true
			},
			data: JSON.stringify({
				'avatar': $('#avatar2').attr('src'),
				'username': $('#username1').val(),
				'tel': $('#tel1').val(),
				'code': $('#code1').val()
			}),
			success: function (data) {
				if (data <= 0 ) {
					layer.msg("修改失败，请重试！", {
						icon: 5,
						time: 1000
					});
					refresh();
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

	layui.use(['laydate', 'layer', 'upload'], function () {
		laydate = layui.laydate;
		layer = layui.layer;
		upload = layui.upload;

		//上传头像
		upload.render({
			elem: '#avatar2',
			url: url + '/file/uploadFile',
			multiple: false,
			done: function (res) {
				console.log(res.data)
				$('#avatar2').attr("src", url + res.data);
				$('#avatar1').attr("src", url + res.data);
			}
		});
	});

});