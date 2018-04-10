$(document).ready(function () {

    $(document).on('click', '.full-catalog__filter-toggle-btn', function () {
        $('.filter-form__more-options').slideToggle("slow");
    });
    
    $(document).on('click', '.full-catalog__sort-line-item', function () {
        if($(this).hasClass('active')) {
            $('trangle-direction-up').toggleClass('rotate');
        }else {
            $('.full-catalog__sort-line-item').removeClass('active');
            $('.full-catalog__sort-line-item').removeClass('trangle-direction-up');
            $(this).addClass('active');
            $(this).addClass('trangle-direction-up');
        }
    });

    $(document).on('click', '.full-catalog__hidden-filter-btn', function () {
        $('.filter-form').slideToggle("slow");
    });

    $(document).on('click', '.trangle', function () {
        $(this).toggleClass('rotate');
    });
    $(document).on('click', '.trangle-direction-up', function () {
        $(this).toggleClass('rotate');
    });


    $('.full-catalog__sort-menu-select').selectmenu({
        appendTo: ".full-catalog__filter-block"
    });

    $(document).on('click', '.filter-form__title', function () {
        if($(window).width() < 768) {
            $(this).next('.mobile-hide').slideToggle();
        }
    });

    $(document).on('click', '.compare__block', function () {
       $(this).toggleClass('active');
       $(this).siblings('.compare__block').toggleClass('active');
    });

    //--------------------------------------------------------

    var filterVol = $('.filter-form__volum-range'),
        volMin = $('input[name="vol-min"]'),
        volMax = $('input[name="vol-max"]'),

        filterVolMin,
        filterVolMax;

    filterVol.slider({
        range: true,
        min: 0,
        max: 10000,
        step: 100,
        values: [ 2500, 7000 ],
        classes: {
            "ui-slider": "filter__slider",
            "ui-slider-handle": "filter__toggle toggle",
            "ui-slider-range": "filter__range"
        },

        slide: function( event, ui ) {
            volMin.val(ui.values[ 0 ]);
            volMax.val(ui.values[ 1 ]);
        }
    });

    filterVolMin = filterVol.slider('option').min;
    filterVolMax = filterVol.slider('option').max;

    filterVol.draggable();

    volMin.val(filterVol.slider( "values", 0 ));
    volMax.val(filterVol.slider( "values", 1 ));

    volMin.on('change keyup', function () {
        var value = $(this).val(),
            value2 = priceMax.val();

        if (+value < +value2) {
            filterVol.slider( "values", 0, value );
        }
    });

    volMax.on('change keyup', function () {
        var value = $(this).val(),
            value2 = volMin.val();

        if (+value > +value2) {
            filterVol.slider( "values", 1, value );
        }
    });

    //-------------------------------------------------------

    var filterPrice = $('.filter-form__price-range'),
        priceMin = $('input[name="price-min"]'),
        priceMax = $('input[name="price-max"]'),

        filterPriceMin,
        filterPriceMax;

    filterPrice.slider({
        range: true,
        min: 0,
        max: 1000000,
        step: 100,
        values: [ 150000, 500000 ],
        classes: {
            "ui-slider": "filter__slider",
            "ui-slider-handle": "filter__toggle toggle",
            "ui-slider-range": "filter__range"
        },

        slide: function( event, ui ) {
            priceMin.val(ui.values[ 0 ]);
            priceMax.val(ui.values[ 1 ]);
        }
    });

    filterPriceMin = filterPrice.slider('option').min;
    filterPriceMax = filterPrice.slider('option').max;

    filterPrice.draggable();

    priceMin.val(filterPrice.slider( "values", 0 ));
    priceMax.val(filterPrice.slider( "values", 1 ));

    priceMin.on('change keyup', function () {
        var value = $(this).val(),
            value2 = priceMax.val();

        if (+value < +value2) {
            filterPrice.slider( "values", 0, value );
        }
    });

    priceMax.on('change keyup', function () {
        var value = $(this).val(),
            value2 = priceMin.val();

        if (+value > +value2) {
            filterPrice.slider( "values", 1, value );
        }
    });

    //---------------------------------------------------------

    var $filterBtn = $('.js-filter-btn');

    var filterOut = function() {
        var	$filterBtnActive = $('.js-filter-btn.active'),
            idToggle = $filterBtnActive.attr('data-toggle'),
            $filterCard = $('.js-filter-card'),
            $filterCardActive = $('.js-filter-card[data-id="'+ idToggle +'"]');

        if(idToggle == 'all') {
            $filterCard.addClass('active');
        } else {
            $filterCard.removeClass('active');
            $filterCardActive.addClass('active');
        }
    };

    filterOut();

    $filterBtn.on('click', function(e) {
        e.preventDefault();

        $filterBtn.removeClass('active');
        $(this).addClass('active');

        filterOut();
    });

    $(document).on('click', '.card-single__option', function(){

        var idToggle = $(this).attr('data-toggle');

        $('.card-single__content').removeClass('active');
        $('.card-single__option').removeClass('active');
        $('.card-single__content[data-id="' + idToggle + '"]').addClass('active');
        $('.card-single__option[data-toggle="' + idToggle + '"]').addClass('active');
    });


});





