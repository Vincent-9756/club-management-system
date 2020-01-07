$(function () {
	var intiContent = function () {
		$.ajax({
			url: url + '/department/queryApplyDepartment',
			type: 'post',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify({
				pageNum: 1,
				pageSize: 5,
				status: "ENABLED"
			}),
			xhrFields: {
				withCredentials: true
			},
			dataType: 'json',
			success: function (data) {
				intiPage(data);
			}
		});
	}
	intiContent();

	var intiPage = function (data) {
		layui.use('laypage', function () {
			var laypage = layui.laypage;
			laypage.render({
				elem: 'Schemepage',
				count: data.count,
				limit: 5,
				jump: function (obj, first) {
					$.ajax({
						url: url + '/department/queryApplyDepartment',
						type: 'post',
						contentType: "application/json;charset=UTF-8",
						data: JSON.stringify({
							pageNum: obj.curr,
							pageSize: obj.limit,
							status: "ENABLED",
						}),
						xhrFields: {
							withCredentials: true
						},
						dataType: 'json',
						success: function (data) {
							$("#SchemeDemo").empty();
							for (var i = 0; i < obj.limit; i++) {
								if (data.count < 1) {
									$("#Schemepage").hide();
									return;
								}
								if (i >= data.data.length) {
									return;
								}
								item = data.data[i];
								console.log(item)
								$("#SchemeDemo").append('<div class="ResultCont" style="margin-top: 10px;padding-bottom: 10px;margin-bottom: 10px;">' +
									'<div class="title">' +
									'<a target="_blank"><em>' + item.professionName + ':</em>' + item.name + '</a>' +
									'</div>' +
									'<div class="ResultMoreinfo">' +
									'<div class="author">' +
									'<a>领导组织：' + item.leadOrganize + '</a>' +
									'</div>' +
									'<div class="Volume">' +
									'<a>&nbsp;&nbsp;&nbsp;创始人：' + item.registrationName + '</a>' +
									'</div>' +
									'</div>' +
									'<div class="summary">' +
									'<em>部门信息</em>：' + item.info + '' +
									'</div>' +
									'<div class="summary">' +
									'<a><span><em>义务</em>：</span><span>' + item.duty + '</span></a>' +
									'</div>' +
									'<div class="Keyword">' +
									'<a><span><em>负责人姓名</em>：</span><span>' + item.masterName + '</span></a>' +
									'<a><span><em>负责人电话</em>：</span><span>' + item.masterTel + '</span></a>' +
									'</div>' +
									'<div class="result_new_operaWrap clear">' +
									'<div class="result_new_operaLeft result_new_operaItem">' +
									'<ul class="clear result_new_listOperaWrap">' +
									'</ul>' +
									'</div>' +
									'<div class="result_new_operaCenter result_new_operaItem">' +
									'<ul class="clear">' +
									'</ul>' +
									'</div>' +
									'<div class="result_new_operaRight result_new_operaItem">' +
									'<ul class="clear">' +
									'<li><b class="layui-btn mini come" id="come' + item.id + '" value="' + item.id + '" onclick="see(' + item.id + ')">&nbsp;查看&nbsp;</b>' +
									'</li>' +
									// '<li><b class="layui-btn mini open" id="open" value="' + item.id + '" onclick="auditing(' + item.id + ')">&nbsp;申请加入&nbsp;</b>' +
									// '</li>' +
									'<li><b class="layui-btn mini open" id="open' + item.id + '" value="' + item.id + '">&nbsp;申请加入&nbsp;</b>' +
									'</li>' +
									'</ul>' +
									'</div>' +
									'</div>' +
									'</div>');
								if (item.status == 'ENABLED') {
									$('#open' + item.id).css({
										'background-color': 'gray',
										'pointer-events': 'none'
									});
									$('#open' + item.id).parent().css({
										'cursor': 'not-allowed'
									});
								}
							}
						},
					})
				}
			});
		});
	}

	//查看详情
	see = function (id) {
		getDetail(id);
		$('.wrrap').show();
	}

	$('.closeStudentBox').click(function () {
		$('.wrrap').hide();
	});

	function getDetail(e) {
		$.ajax({
			type: "get",
			url: url + "/department/findDepartmentById",
			data: {
				"id": e
			},
			success: function (res) {
				$('.studentBox .profession-name').val(res.professionName);
				$('.studentBox .info').val(res.info);
				$('.studentBox .name').val(res.name);
				$('.studentBox .duty').val(res.duty);
				$('.studentBox .characters').val(res.characters);
				$('.studentBox .masterName').val(res.masterName);
				$('.studentBox .masterTel').val(res.masterTel);
				$('.studentBox .leadOrganize').val(res.leadOrganize);
				$('.studentBox .registrationTime').val(res.registrationTime);
				$('.studentBox .updateTime').val(res.updateTime);
				$('.studentBox .registrationName').val(res.registrationName);
				$('.studentBox .num').val(res.num);
				$('.studentBox .generalRules').val(res.generalRules);
				$('.studentBox .purpose').val(res.purpose);
				$('.studentBox .droit').val(res.droit);
				$('.studentBox .obligation').val(res.obligation);
				$('.studentBox .requirement').val(res.requirement);
			}
		});
	}

	// 申请加入社团
	$('body').on('click', '.open', function () {
		$.ajax({
			url: url + '/user/joinDepartment',
			type: 'post',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify({
				departmentId: $(this).attr('value')
			}),
			xhrFields: {
				withCredentials: true
			},
			dataType: 'json',
			success: function (data) {
				console.log(data)
				layui.use('layer', function () {
					var layer = layui.layer;
					if (data > 0) {
						layer.msg("已发起申请!");
					} else {
						layer.msg("网络错误，请重试！")
					}
				});
				intiContent();
			}
		});
	});
});