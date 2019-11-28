$('.community-nav').on('click', '.community-item a', function () {
  $(this).addClass('community-this').parent().siblings().children().removeClass('community-this');
});

$('.community-item').eq(0).children('a').click();