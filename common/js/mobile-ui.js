$(document).on('click', '.option-list-box .item', function(){
    $(this).toggleClass('on');
});

// 추천자료 BEST SWIPER
if($('.best-list-wrap').length > 0){
    setTimeout(() => {
        experienceSwiper = new Swiper('.best-list-wrap', {
            slidesPerView: "auto",
        });
    }, 500);
}

/** goto top */
$('.goto-top').on('click', function(){
    $('html, body').stop().animate({scrollTop: 0}, 500);
    $('.goto-top').fadeOut();
});

$('body').on('touchmove', function(){
    let windowTop = $(this).scrollTop();
    if (windowTop >= 40) {
        $('.goto-top').fadeIn();
    }
    else {
        $('.goto-top').fadeOut();
    }
    if($('.quiz-fixed-wrap').length > 0){
        let quizHeight = $('.quiz-fixed-wrap').outerHeight(true);
        if(window.scrollY >= $('.sticky-bar-wrap').offset().top){                
            $('.quiz-fixed-wrap').fadeIn();
            $('footer').css('margin-bottom',quizHeight);
        }
        else{
            $('.quiz-fixed-wrap').fadeOut();
            $('footer').css('margin-bottom',0);
        }
    }
});
