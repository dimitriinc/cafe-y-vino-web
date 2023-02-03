$('#history-btn').on('click', function () {
    $('#history-blanket').css('right', '0');
    $(body).css('overflow', 'hidden');
    $('.exit-btn').css('right', '0');

    $('.slider').slick({
        arrows: false,
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 1,
        fade: true,
        cssEase: 'ease',
        zIndex: 600
    })
});

$('.exit-btn').on('click', () => {
    $('#history-blanket').css('right', '-100vw');
    $(body).css('overflow', 'auto');
    $('.exit-btn').css('right', '-100vw');
});
