$('.innerUser input').blur(function () {
  if ($(this).val() == '') {
    $(this).addClass('form-error')
  } else {
    $(this).addClass('form-success').removeClass('form-error')
  }
});

$('#registerBtn').click(function () {
  $('.wrrap').show()
})

$('.closeRegisterBox').click(function () {
  $('.wrrap').hide()
})