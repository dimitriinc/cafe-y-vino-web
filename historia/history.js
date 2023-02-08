let isRepeat = false;


$('.slider').slick({
    arrows: true,
    dots: false,
    autoplay: false,
    autoplaySpeed: 3000,
    infinite: false,
    speed: 1000,
    fade: true,
    cssEase: 'ease',
    zIndex: 600,
    prevArrow: '<div class="hist-prev"><</div>',
    nextArrow: '<div class="hist-next">></div>'
});

$('.hist-prev').hide();

$('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    if (nextSlide === 0) {
        
        $('.hist-prev').hide();
        setTimeout(function() {
            $('#history-btn').html('Comenzar');
        }, 1000)
    } else {
        $('.hist-prev').show();
        
    }

    if (nextSlide !== 0 && nextSlide !== slick.slideCount - 1) {
        $('#history-btn').html('Continuar');
        isRepeat = false;
    }

    if (nextSlide === slick.slideCount - 1) {
        $('.hist-next').hide();
        $('#history-btn').html('Repetir');
        isRepeat = true;
    } else {
        $('.hist-next').show();
    } 
});

$('#history-btn').on('click', function () {
    if (isRepeat) {
        $('.slider').slick('slickGoTo', 0)
        isRepeat = false;
    }
    $('#history-blanket').css('right', '0');
    $(body).css('overflow', 'hidden');
    $('.exit-btn').css('right', '0');
    $('.exit-btn').css('left', '0');
    $('.exit-btn').css('margin', '0 auto');
    $('.exit-btn').css('margin-top', '1rem');

    
});



$('.exit-btn').on('click', () => {
    $('#history-blanket').css('right', '-100vw');
    $(body).css('overflow', 'auto');
    $('.exit-btn').css('right', '-150vw');
});
