function checkState(status) {
	if (status == 'DISAPPLY') {
		return '<b class="layui-btn mini close">驳回</b>';
	}
	if (status == 'ENABLED') {
		return '<b class="layui-btn mini open">通过</b>';
	}
	return '<b class="layui-btn mini come">申请中</b>';
}

$(function () {

	var intiContent = function () {
		$.ajax({
			url: url + '/department/queryDepartment',
			type: 'post',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify({
				pageNum: 1,
				pageSize: 5,
				status: "APPLYING"
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
						url: url + '/department/queryDepartment',
						type: 'post',
						contentType: "application/json;charset=UTF-8",
						data: JSON.stringify({
							pageNum: obj.curr,
							pageSize: obj.limit,
							status: "APPLYING",
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
									checkState(item.status) +
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
									'<li><b class="layui-btn mini come" id="come" value="' + item.id + '" onclick="see(' + item.id + ')">&nbsp;查看&nbsp;</b>' +
									'</li>' +
									'<li><b class="layui-btn mini open" id="open" value="' + item.id + '" onclick="auditing(' + item.id + ', \'ENABLED\')">&nbsp;通过&nbsp;</b>' +
									'</li>' +
									'<li><b class="layui-btn mini close" id="close" value="' + item.id + '" onclick="auditing(' + item.id + ', \'DISAPPLY\')">&nbsp;驳回&nbsp;</b>' +
									'</li>' +
									'</ul>' +
									'</div>' +
									'</div>' +
									'</div>');
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

	//审批
	auditing = function (id, status) {
		$.ajax({
			url: url + '/department/updateDepartmentById',
			type: 'post',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify({
				id: id,
				status: status
			}),
			xhrFields: {
				withCredentials: true
			},
			dataType: 'json',
			success: function (data) {
				layui.use('layer', function () {
					var layer = layui.layer;
					if (data > 0) {
						layer.msg("操作成功!");
					} else {
						layer.msg("网络错误，请重试！")
					}
				});
				intiContent();
			}
		});
	}

});