//Number functions
var isNumber = function(value) {
    return !isNaN(value);
};
var checkNumber = function(number) {
    return isNumber(number);
};
var formatNumber = function(number) {
	 return number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

var $window = $(window),
    $carouselMobile = $('.carousel-mobile'),
    toggleSlick;

$(document).ready(function () {
	
	//Get utm
	var utm = window.location.toString();

	$('input[name="utm"]').attr('value',utm);

    //Menu
    $('.js-menu').on('click', function(e) {
        e.preventDefault();

        $(this).toggleClass('open');
        $('body, html').toggleClass('overflow');
        $('.header__navigation').toggleClass('open');
    });

	//Filter
	var $filterBtn = $('.js-filter-btn'),
		$blogMoreBtn = $('.blog__more');

	var filterOut = function() {
		var	$filterBtnActive = $('.js-filter-btn.active'),
			idToggle = $filterBtnActive.attr('data-toggle'),
			$filterPost = $('.js-filter-post'),
			$filterPostActive = $('.js-filter-post[data-id="'+ idToggle +'"]');

		if(idToggle == 'all') {
			$filterPost.addClass('active');
		} else {
			$filterPost.removeClass('active');
			$filterPostActive.addClass('active');
		}
	};

	filterOut();

	$filterBtn.on('click', function(e) {
		e.preventDefault();

		$filterBtn.removeClass('active');
		$(this).addClass('active');

		filterOut();
	});

	$blogMoreBtn.on('click', function(e) {
		e.preventDefault();
		
		setTimeout(function () {
			filterOut();
		},1000);
	});

    //carousel
    toggleSlick = function () {
        if ($window.width() < 768) {
            $carouselMobile.slick({
                dots: false,
                arrows: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Previous"><span class="icon icon-arrow-prev slick-arrow__icon"></span></button>',
                nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Next"><span class="icon icon-arrow-next slick-arrow__icon"></span></button>'
            });
        } else {
            if($carouselMobile.hasClass('slick-initialized')) {
                $carouselMobile.slick('unslick');
            }
        }
    };

    $window.resize(toggleSlick);
    toggleSlick();
	
	//Slick-slider
    var $advantagesSlider = $('.advantages-slider__slider');
    var $catalogSlider = $('.carousel_catalog');
    var $reviewsSlider = $('.carousel_reviews');
    var $teamSlider = $('.carousel_team');
    var slideCount = null;

    $advantagesSlider.on('init', function(event, slick){
        slideCount = slick.slideCount;
        setSlideCount();
        setCurrentSlideNumber(slick.currentSlide);
    });

    $advantagesSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        setCurrentSlideNumber(nextSlide);
    });

    $advantagesSlider.slick({
        focusOnSelect: false,
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        touchThreshold: 5,
        appendArrows: '.slider-count-wrap',
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev slick-arrow advantages-slider__slick-arrow" aria-label="Previous"><span class="icon icon-arrow-prev slick-arrow__icon"></span></button>',
        nextArrow: '<button type="button" class="slick-next slick-arrow advantages-slider__slick-arrow" aria-label="Next"><span class="icon icon-arrow-next slick-arrow__icon"></span></button>',
    });

    function setSlideCount() {
        var $el = $('.slider-count-wrap').find('.slider-count-wrap__total');
        $el.text(slideCount);
    }

    function setCurrentSlideNumber(currentSlide) {
        var $el = $('.slider-count-wrap').find('.slider-count-wrap__current');
        $el.text(currentSlide + 1);
    }

	$catalogSlider.slick({
		focusOnSelect: false,
		dots: false,
		arrows: true,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		variableWidth: true,
		draggable: true,
		touchMove: true,
		touchThreshold: 5,
		prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Previous"><span class="icon icon-arrow-prev"></span></button>',
		nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Next"><span class="icon icon-arrow-next"></span></button>',
		speed: 400,
		autoplay: false,
		fade: false,
		cssEase: 'ease-in-out',
		responsive: [
			{
				breakpoint: 1023,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					swipe: true
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true,
					swipe: true
				}
			}
		]
	});

	$reviewsSlider.slick({
		focusOnSelect: false,
		dots: false,
		arrows: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
		adaptiveHeight: true,
		centerMode: true,
		draggable: true,
		touchMove: true,
		touchThreshold: 5,
		prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Previous"><span class="icon icon-arrow-prev"></span></button>',
		nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Next"><span class="icon icon-arrow-next"></span></button>',
		speed: 500,
		autoplay: false,
		fade: false,
		cssEase: 'ease',
		responsive: [
			{
				breakpoint: 1023,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					swipe: true
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					swipe: true
				}
			}
		]
	});

    $teamSlider.slick({
        focusOnSelect: false,
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        variableWidth: true,
        draggable: true,
        touchMove: true,
        touchThreshold: 5,
        prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Previous"><span class="icon icon-arrow-prev"></span></button>',
        nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Next"><span class="icon icon-arrow-next"></span></button>',
        speed: 400,
        autoplay: false,
        fade: false,
        cssEase: 'ease-in-out',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    swipe: true
                }
            }
        ]
    });

	//Tabs
    $('.tabs__nav-link').on('click', function(e) {
        e.preventDefault();

        var idToggle = $(this).attr('data-toggle');

        $('.tabs__nav-link').removeClass('tabs__nav-link_active');
        $(this).addClass('tabs__nav-link_active');

        $('.tabs__box').removeClass('tabs__box_active');
        $('.tabs__box[data-id="' + idToggle + '"]').addClass('tabs__box_active');
    });
    
    //Popup
	var openPopup = function(heading,href) {
		
		$.magnificPopup.open({
			items: {
				src: href
			},
			type: 'inline',

			fixedContentPos: true,
			fixedBgPos: true,

			overflowY: 'auto',

			closeBtnInside: false,
			preloader: false,
			focus: 'input[name="name"]',
			modal: false,

			midClick: true,
			removalDelay: 400,
			mainClass: 'my-mfp-zoom-in',

			callbacks: {
				beforeOpen: function() {
					$(href).find('.popup__heading').text(heading);
				}
			}
		});
	};

	$('.js-popup-link').on('click', function (e) {
		e.preventDefault();
		
		var heading = $(this).attr('data-heading'),
			href = $(this).attr('href');
		
		openPopup(heading,href);
	});

    $('.popup__close').on('click', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
    
	$('.popup__button_close').on('click', function (e) {

        e.preventDefault();
        $.magnificPopup.close();
    });

    //Calculator
	var $selectMain = $(".js-calc-select-main"),
		$selectDeep = $(".js-calc-select-deep"),
		$calcBox = $('.calc__box'),
		$valueCalc1 = $('.js-calc-value-calc1'),
		constCalc1 = + (8*1500),	
		$valueCalc2 = $('.js-calc-value-calc2'),
        constCalc2 = 6,
        $calcButton = $('.calc__button'),
		$calcButtonText = $('.js-calc-button'),
		$calcTotal = $('.js-calc-total'),
		defaultTotal = 'от 15 000';


    var changeTotal = function(value) {

        $calcTotal.removeClass('normal').addClass('changed').fadeOut(400, function() {
            $(this).removeClass('changed').addClass('normal').text(value).fadeIn(400);
        });
		
    };
	
	var calculateCalc1 = function(value) {
        value = parseFloat(value);
		if (!checkNumber(value)) {
			return false;
		} else if ( value > 999999999 || value <= 0) {
			return false;
		}
		
		var total;
		
		total = Math.round(constCalc1 * value);
		total = formatNumber(total);
		
		changeTotal(total);
	};

    var calculateCalc2 = function(value) {
        value = parseFloat(value);
        if (!checkNumber(value)) {
            return false;
        } else if ( value > 999999999 || value < 0 ) {
            return false;
        }

        var total;

        total = Math.round((constCalc2 + value) * $selectDeep.val());
        total = formatNumber(total);

        changeTotal(total);
    };
	
	$valueCalc1.on('keyup change', function() {
		var value = $(this).val();
		
		(!value.length) ? changeTotal(defaultTotal) : "";
		
		calculateCalc1(value);
	});

    $valueCalc2.on('keyup change', function() {
        var value = $(this).val();

		(!value.length) ? changeTotal(defaultTotal) : "";

        calculateCalc2(value);
    });
	

    $selectMain.selectmenu({
        select: function( event, ui ) {
            var id = ui.item.value;
            $calcBox.removeClass('calc__box_active');
            $('.calc__box[data-id="' + id + '"]').addClass('calc__box_active');
            changeTotal(defaultTotal);
			if (id == "calc1") {
				$valueCalc1.val('');
			} else {
				$valueCalc2.val('');
			}
		}
	});

    $selectDeep.selectmenu({
        select: function( event, ui ) {
			var value;

			( $valueCalc2.val().length > 0 ) ? value = $valueCalc2.val() : value = 0;
			
            calculateCalc2(value);
        }
	})
		.selectmenu("menuWidget").addClass("scroll");

    //Inpumask
	$('input[name*="phone"]').inputmask({
		mask: '+7 (999) 999-99-99',
		showMaskOnHover: false
	});
    
    //Form
    var validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    var validatePhone = function(phone) {
        var re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{3,10}$/;
        return re.test(phone);
    };

    $('input[type="file"]').on('change', function() {
        $('.download__file').remove();
        $('.download__text_error').html('');

        var fileInput = $(this);

        $.each($('input[type="file"]')[0].files, function(i, file) {
            var filePath = file.name;
            var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.doc|\.docx|\.pdf|\.rtf|\.xls|\.xlss)$/i;

            if(i <= 4) {
                if(!allowedExtensions.exec(filePath)) {
                    $('.download__text_error').html('Разрешены следующие разрешения .jpeg, .jpg, .png, .doc, .docx, .pdf, .rtf, .xls, .xlss');

                    $('.download__file').remove();
                    fileInput.val('');

                    return false;
                } else if(file.size > 10000000) {
                    $('.download__text_error').html('Размер файла '+ file.name +' слишком большой');

                    $('.download__file').remove();
                    fileInput.val('');

                    return false;
                } else {
                    $('.download').prepend('<span class="download__file">'+ file.name +'</span>');
                }
            } else {
                $('.download__text_error').html('Максимальное количество файлов для загрузки 5');

                $('.download__file').remove();
                fileInput.val('');

                return false;
            }
        });
    });

    $('.form_feedback').submit(function(e){

        e.preventDefault();

        var name = $('input[name="name"]').val(),
            phone = $('input[name="phone"]').val(),
            email = $('input[name="email"]'),
            errorFlag1 = false,
            data = $(this).serializeArray();

        var formData = new FormData();

        if(email.length) {
            if (!validateEmail(email.val())) {
                $(this).find('input[name="email"]').closest('.form-data__parametr').addClass('form-data__parametr_error');
            } else {
                $(this).find('input[name="email"]').closest('.form-data__parametr').removeClass('form-data__parametr_error');
            }
        }

        if ( !validatePhone(phone) || phone == '' ) {
            $(this).find('input[name="phone"]').closest('.form-data__parametr').addClass('form-data__parametr_error');
            errorFlag1 = true;
        } else{
            $(this).find('input[name="phone"]').closest('.form-data__parametr').removeClass('form-data__parametr_error');
            errorFlag1 = false;
        }

        $.each($('input[type="file"]')[0].files, function (i, file) {
            formData.append('file' + i, file);
        });

        $.each(data, function (i, val) {
            formData.append(val.name, val.value);
        });

        if ( !errorFlag1 ) {
            $.ajax({
                url: "/send.php",
                type: "POST",
                dataType : "json",
                cache: false,
                contentType: false,
                processData: false,
                data: formData, //указываем что отправляем
                success: function (ans) {
                    yaCounter44545491.reachGoal('order');
                    ga('send', 'event', 'zayavka', 'otpravka');

                    $('.form_feedback')[0].reset();

                    $.magnificPopup.open({
                        items: {
                            src: '#modal_success'
                        }
                    });
                }
            });
        }


    });

    //Chrome Smooth Scroll
    try {
        $.browserSelector();
        if($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch(err) {

    }

    $("img, a").on("dragstart", function(event) { event.preventDefault(); });

});
