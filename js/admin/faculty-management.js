let facultyId;
queryFaculty();

$('.closeAddBox').click(function() {
  $('.add-facultyBox').hide();
});

$('.closeEditBox').click(function() {
  $('.edit-facultyBox').hide();
});

function queryFaculty() {
  $.ajax({
    type: "post",
    url: url + "/profession/queryProfession",
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({
      "name": "",
      "code": "",
      "description": ""
    }),
    success: function (res) {
      console.log(res)
      var data = ''
      for (let i = 0; i < res.data.length; i++) {
        data += '<li class="c-col6">\n' +
          '<div id="facultyBox">\n' +
          '<a href="javascript:;">\n' +
          '<h4 class="c-line-clamp">' + res.data[i].name + '</h4>\n' +
          '<p class="m-product-panel-list-note">' + res.data[i].description + '</p>\n' +
          '<p class="m-product-panel-list-button"><button class="editFaculty" value="' + res.data[i].id + '">修改信息</button></p>\n' +
          '<p class="m-product-panel-list-button"><button class="deleteFaculty" value="' + res.data[i].id + '">删除院系</button></p>\n' +
          '</a>\n' +
          '</div>\n' +
          '</li>'
      }
      $('.m-product-panel-list').append(data);
    }
  });
}

$('.m-product-panel-list li').hover(function () {
  $(this).addClass('active').siblings().removeClass('active');
})

$('#add-faculty').click(function () {
  $('.add-facultyBox').show();
  $('#add-facultyToService').click(function () {
    $.ajax({
      type: "post",
      url: url + "/profession/addProfession",
      dataType: "json",
      contentType: "application/json;charset=UTF-8",
      data: JSON.stringify({
        "name": $('#addName').val(),
        "code": $('#addCode').val(),
        "description": $('#addDescription').val()
      }),
      success: function (res) {
        $('.add-facultyBox').hide();
        $('#addName').val('');
        $('#addCode').val('');
        $('#addDescription').val('');
        $('.m-product-panel-list').empty();
        queryFaculty();
      }
    });
  })
});

$('body').on('click', '.deleteFaculty', function () {
  $.ajax({
    type: "get",
    url: url + "/profession/delProfessionById",
    data: {
      "id": $(this).attr('value')
    },
    success: function (response) {
      $('.m-product-panel-list').empty();
      queryFaculty();
    }
  });
});

$('body').on('click', '.editFaculty', function () {
  facultyId = $(this).attr('value')
  checkFaculty(facultyId)
  $('.edit-facultyBox').show();
});

$('#edit-facultyToService').click(function () {
  $.ajax({
    type: "post",
    url: url + "/profession/updateProfessionById",
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({
      "id": facultyId,
      "name": $('#editName').val(),
      "code": $('#editCode').val(),
      "description": $('#editDescription').val()
    }),
    success: function (res) {
      $('.edit-facultyBox').hide();
      $('.m-product-panel-list').empty();
      queryFaculty();
    }
  });
})

function checkFaculty(e) {
  $.ajax({
    type: "get",
    url: url + "/profession/findProfessionById",
    data: {
      "id": e
    },
    success: function (res) {
      $('#editName').val(res.name);
      $('#editCode').val(res.code);
      $('#editDescription').val(res.description)
    }
  });
}