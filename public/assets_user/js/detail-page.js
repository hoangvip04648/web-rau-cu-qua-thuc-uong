$(document).ready(function () {
    var height2 = $('.content-page-shift .content-page:visible').height();
    $('.content-page-shift').height(height2);
    var decrease = $('#btn-decrease');
    var increase = $('#btn-increase');
    var result = parseInt($('#result').val());

    decrease.click(function () {

        console.log('test giam')
        if (result > 1) {
            result--;
            $('#result').val(result);
        }
    });

    increase.click(function () {
        if (result >= 1) {
            result++;
            $('#result').val(result);
        }
    });
    var pageShift = document.querySelectorAll('.page-shift span');

    var pageContent = document.querySelectorAll('.content-page-shift .content-page');

    for (var z = 0; z < pageShift.length; z++) {

        pageShift[z].addEventListener('click', function () {
            console.log('test giam')
            for (var i = 0; i < pageShift.length; i++) {
                pageShift[i].classList.remove('light-choose-button');
            }
            this.classList.add('light-choose-button');
            var selection = this;
            var locate = 0;
            for (locate = 0; selection = selection.previousElementSibling; locate++) {

            }
            for (var i = 0; i < pageContent.length; i++) {
                pageContent[i].classList.remove('show-content-page');
                pageContent[locate].classList.add('show-content-page');
                var height3 = $('.content-page-shift .content-page:visible').height();
                $('.content-page-shift').height(height3);
            }
        });
    }

    $('.owl-carousel').owlCarousel({
        items: 4,
        lazyLoad: true,
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
                nav: true
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 4,
                nav: true,
                loop: false
            }
        }
    });

   
})