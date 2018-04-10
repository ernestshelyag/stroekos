function openbox(id){
    display = document.getElementById(id).style.display;

    if(display=='none'){
        document.getElementById(id).style.display='block';
    }
}
function vel(a, b){
    var name1 = "option"+a;
    var name2 = "lev"+b;
    var vellll=document.getElementById(name1).value;
    document.getElementById(name2).innerHTML = vellll;
}

$(document).ready(function () {

    // online-test-steps -------------------------------------------------------------------------

    var steps = $(".online-test__form").children(".step");
    $(steps[0]).show();
    var current_step = 0;
    $("a.next").click(function(){
        if (current_step == steps.length-2) {
            $(this).hide();
        }
        $("a.back").show();
        current_step++;
        changeStep(current_step);
    });

    $("a.back").click(function(){
        if (current_step == 1) {
            $(this).hide();
        }
        $("a.next").show();
        current_step--;
        changeStep(current_step);
    });

    function changeStep(i) {
        $(steps).hide();
        $(steps[i]).show();
    }

    // datepicker + rus --------------------------------------------------------------------------

    /* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
    /* Written by Andrew Stromnov (stromnov@gmail.com). */
    ( function( factory ) {
        if ( typeof define === "function" && define.amd ) {

            // AMD. Register as an anonymous module.
            define( [ "../widgets/datepicker" ], factory );
        } else {

            // Browser globals
            factory( jQuery.datepicker );
        }
    }

    ( function( datepicker ) {

        datepicker.regional.ru = {
            closeText: "Закрыть",
            prevText: "&#x3C;Пред",
            nextText: "След&#x3E;",
            currentText: "Сегодня",
            monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь",
                "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
            monthNamesShort: [ "Янв","Фев","Мар","Апр","Май","Июн",
                "Июл","Авг","Сен","Окт","Ноя","Дек" ],
            dayNames: [ "воскресенье","понедельник","вторник","среда","четверг","пятница","суббота" ],
            dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
            dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
            weekHeader: "Нед",
            dateFormat: "dd.mm.yy",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: "" };
        datepicker.setDefaults( datepicker.regional.ru );

        return datepicker.regional.ru;

    } ) );

    $.datepicker.setDefaults( $.datepicker.regional[ "ru" ] );

    // open-close datepicker ---------------------------------------------------------------------

    $('.open-datepicker').click(function() {
        $('.datepicker').fadeIn(300);
        $('.datepicker').val(tomorrowDate).datepicker('refresh');
    });

    $('.close-datepicker').click(function() {
        $('.datepicker').fadeOut(300);
    });

    // check date --------------------------------------------------------------------------------

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }
    today = dd + '.' + mm + '.' + yyyy;

    //-----

    var tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate()+1);

    var dd = tomorrowDate.getDate();
    var mm = tomorrowDate.getMonth()+1; //January is 0!
    var yyyy = tomorrowDate.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }
    tomorrowDate = dd + '.' + mm + '.' + yyyy;

    //-----

    $( function() {
        $( ".datepicker" ).datepicker({
            onSelect: function(date) {

                var todayValue = today.split('.'),
                    pickedValue = date.split('.');

                var todaySum = (+todayValue[0]) + (+todayValue[1]*100) + (+todayValue[2]*1000),
                    dateSum = (+pickedValue[0] + (+pickedValue[1]*100) + pickedValue[2]*1000);

                if (dateSum < todaySum)
                {
                    $('.datepicker').val(tomorrowDate).datepicker('refresh');
                }

                vel(35, 10), openbox('box10');
            }
        });
    } );

    // open-close modal on final step ------------------------------------------------------------

    $(document).on('click', '.form-p span', function(){

        var idToggle = $(this).attr('data-toggle');

        $('.btn-group[data-id="' + idToggle + '"]').show();
        // console.log(idToggle);
    });

    $(document).on('click', '.form-p label', function() {
        $('.btn-group').hide();
    });

    // send form ---------------------------------------------------------------------------------

    var validatePhone = function(phone) {
        var re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{3,10}$/;
        return re.test(phone);
    };

    $('.online-test__form').submit(function(e){

        e.preventDefault();

        var answer = [];

        var name = $('#online-test__name').val(),
            phone = $('#online-test__phone').val(),
            errorFlag1 = false,
            data = $(this).serializeArray();

        if(name == '') {
            name = '-';
        }

        var onlineTestData = "phone="+phone+"&name="+name;

        for (var i = 1; i < 11; i++) {
            if( $('#lev' + i).text() != '' ) {
                answer[i] =  $('#lev' + i).text();
            }
            else {
                answer[i] =  '-';
            }
            onlineTestData += "&answer" + i + "="+answer[i];
        }

        if ( !validatePhone(phone) || phone == '' ) {
            $('#online-test__phone').addClass('online-test__error');
            errorFlag1 = true;
        } else{
            $('#online-test__phone').removeClass('online-test__error');
            errorFlag1 = false;
        }

        if ( !errorFlag1 ) {
            $.ajax({
                url: "online-test.php",
                type: "post",
                dataType: "text",
                data: onlineTestData,
                success: function (ans) {
                    $('.online-test__form')[0].reset();

                    $.magnificPopup.open({
                        items: {
                            src: '#modal_success'
                        }
                    });
                }
            });
        }
    });

});