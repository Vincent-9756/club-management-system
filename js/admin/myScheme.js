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
			url: url + '/scheme/queryScheme',
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
						url: url + '/scheme/queryScheme',
						type: 'post',
						contentType: "application/json;charset=UTF-8",
						data: JSON.stringify({
							pageNum: obj.curr,
							pageSize: obj.limit,
							status: "ALL"
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
								$("#SchemeDemo").append('<div class="ResultCont" style="margin-top: 10px;padding-bottom: 10px;margin-bottom: 10px;">' +
									'<div class="title">' +
									'<a target="_blank"><em>' + item.departmentName + ':</em>' + item.name + '</a>' +
									checkState(item.status) +
									'</div>' +
									'<div class="ResultMoreinfo">' +
									'<div class="author">' +
									'<span class="resultResouceType">' + item.creatorName + '</span>' +
									'<a>活动主题：' + item.theme + '</a>' +
									'</div>' +
									'<div class="Volume">' +
									'<a>&nbsp;&nbsp;&nbsp;活动形式' + item.form + '</a>' +
									'</div>' +
									'</div>' +
									'<div class="summary">' +
									'<em>摘要</em>：' + item.content + '' +
									'</div>' +
									'<div class="Keyword">' +
									'<a><span><em>创建时间</em>：</span><span>' + item.createTime + '</span></a>' +
									'<a><span><em>开始时间</em>：</span><span>' + item.beginTime + '</span></a>' +
									'</div>' +
									'<div class="Keyword">' +
									'<a><span><em>活动对象</em>：</span><span>' + item.person + '</span></a>' +
									'<a><span><em>活动地点</em>：</span><span>' + item.place + '</span></a>' +
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
									'<li><b class="layui-btn mini look" id="look" value="' + item.id + '" onclick="see(' + item.id + ')">&nbsp;查看&nbsp;</b>' +
									'</li>' +
									'<li></li>' +
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
	see = function (id) {
		window.open('../../html/admin/activity.html?id=' + id + '');
	}
});