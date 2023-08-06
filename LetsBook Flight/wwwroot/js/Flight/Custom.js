
jQuery(document).ready(function () {
    jQuery('#show-passenger').on('click', function (event) {
        jQuery('#content').toggle('show');
    });

});

var blocksearchlistTemp_ = "block";//blocksearchlist_;
$(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {
        $('#return-to-top').fadeIn(200);
    } else { $('#return-to-top').fadeOut(200); }
});
$('#return-to-top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
});
//mobile calender date format issue while came back

var newWindowWidth = $(window).width();

if (newWindowWidth < 600) {
    //  $('.ui-datepicker-today a').css("cssText", "background: transparent !important");
    var date6 = new Date($('#Departuretemp').val());
    var d = new Date();
    if (date6.getTime() >= d.getTime()) {

        if ($('#txtArrival').val() != '') {
            var mobReturn = new Date($("#Arrivaltemp").val());
            $("#txtReturn1").val(((mobReturn.getMonth() + 1) < 10 ? ("0" + parseInt(mobReturn.getMonth() + 1)) : mobReturn.getMonth() + 1) + '/'
                + (mobReturn.getDate() < 10 ? ('0' + mobReturn.getDate()) : mobReturn.getDate()) + '/'
                + mobReturn.getFullYear());
            $("#Arrivaltemp").val(((mobReturn.getMonth() + 1) < 10 ? ("0" + parseInt(mobReturn.getMonth() + 1)) : mobReturn.getMonth() + 1) + '/'
                + (mobReturn.getDate() < 10 ? ('0' + mobReturn.getDate()) : mobReturn.getDate()) + '/'
                + mobReturn.getFullYear());
            // $("#txtReturn1").val($.datepicker.parseDate($.datepicker._defaults.dateFormat, new Date($("#txtArrival").val())));
        }

        if ($('#txtDepartual').val() != '') {
            var mobDept = new Date($("#Departuretemp").val());
            $("#txtDepart1").val(((mobDept.getMonth() + 1) < 10 ? ("0" + parseInt(mobDept.getMonth() + 1)) : mobDept.getMonth() + 1) + '/'
                + (mobDept.getDate() < 10 ? ('0' + mobDept.getDate()) : mobDept.getDate()) + '/'
                + mobDept.getFullYear());
            $("#Departuretemp").val(((mobDept.getMonth() + 1) < 10 ? ("0" + parseInt(mobDept.getMonth() + 1)) : mobDept.getMonth() + 1) + '/'
                + (mobDept.getDate() < 10 ? ('0' + mobDept.getDate()) : mobDept.getDate()) + '/'
                + mobDept.getFullYear());
            console.log($("#Departuretemp").val())
            console.log($("#txtDepart1").val())
            console.log($("#txtReturn1").val())
            console.log($("#Arrivaltemp").val())

            //$("#txtDepart1").val($.datepicker.parseDate($.datepicker._defaults.dateFormat, new Date($("#txtDepartual").val())));
        }
    } else {
        $('#Departuretemp').val('')
        $("#Arrivaltemp").val('')
    }
}


//////////////////////////////////////////////////////////////////#region Flight/////////////////////////////////////////////////////////////////////////

$(document).ready(function () { 
    if (newWindowWidth > 767) {
        $('#Origin').focus();
    }
    //if (localStorage.getItem('cookieSeen') != 'shown') {
    //    $('#covidModel').delay(2000).fadeIn();
    //    $('#mdfoter').addClass('mdfotr40pding');
    //    localStorage.setItem('cookieSeen', 'shown')
    //};
    $("#subLocOrigin").click(function () {

        $('#Origin').focus();
    });
    $("#subLocDestination").click(function () {

        $('#Destination').focus();
    });

    $('#Origin').focus(function (event) {

        if ($('#Origin').val() != '') {
            $(document).on('keydown', '#Origin', function (objEvent) {
                if (objEvent.keyCode == 9) {  //tab pressed
                    //objEvent.preventDefault(); // stops its action
                    setTimeout(function () { $("#Destination").focus(); }, 100);
                }
            });
        }
    });
    $('#Destination').focus(function (event) {

        if ($('#Destination').val() != '') {
            $(document).on('keydown', '#Destination', function (objEvent) {
                if (objEvent.keyCode == 9) {  //tab pressed
                    //objEvent.preventDefault(); // stops its action
                    if ($("#txtDepartual").val() === "Mon,Jan,01,001" || $("#txtArrival").val() === "") {
                        $('#txtDepartual').focus();
                    }
                    $('#Destination').blur();
                }
            });
        }

    });

    $('#covidModel-close').click(function () {
        $('#covidModel').fadeOut();
        $('#mdfoter').removeClass('mdfotr40pding');
    });


    $('#menuTogglediv').click(function (e) {
        $('#mobPane').css('display', 'block');
    });

    $('a#close').click(function (e) {
        $('#mobPane').css('display', 'none');
    });



    if (newWindowWidth < 600) {
        $('.ui-datepicker-today a').css("cssText", "background: transparent !important");
    }
    if ($('#Origin').val() != "" && $('#AdultCount').val() != "") {
        UpadtingONDValue();

        //   ReloadMobileCalender();
    }
    HasRoundtrip();
    AutoCompleteForFlight();
    $(document).on('touchstart click', function (e) {
        if (!$(e.target).is('#NumberofTraveler *') && !$(e.target).is('#adult *'))
            $('#adult').hide();
    });
    $('#NumberofTraveler').on('click', function () {
        $(this).toggleClass('Traveller_but');
        $('#adult').toggle();
        return false;
    });
    updateTotalPax();
    IncrementAndDecrementAdultChild();
    //Load Blog Data on Page Load
    // LoadBlogsData();

    //GetHotelCookiesData();
    //GetCarCookiesData();
    //MobileHotelCalendar();
    //MobileCarCalendar();
    $("#txtArrival").datepicker(
        {
            dateFormat: 'dd/mm/yyyy'
        }
    );
    $("#txtDepartual").datepicker(
        {
            dateFormat: 'dd/mm/yyyy'
        }
    );
    $("txtArrival").datepicker("show");
});
$(document).ready(function () {
 
    $(function () {
        $('#txtDepartual').datepicker({
            changeMonth: true,
            changeYear: true,
            format: "dd/mm/yyyy",
            language: "tr"
        });
        $('#txtArrival').datepicker({
            changeMonth: true,
            changeYear: true,
            format: "dd/mm/yyyy",
            language: "tr"
        });
    });
    
});
let depSelect = false
function showCalendar(datetype) {
    
    if (datetype == 'depart') {
        $("#date_picker_range .return").removeClass("active");
        $("#date_picker_range .depart").addClass("active");
        $('#hdndatetype').val('depart');
        
        
        $("#txtDepartual").datepicker(
            {
                dateFormat: 'dd/mm/yyyy'
            }
        );
        $("txtDepartual").datepicker("show");
        //console.log(datetype);
    }
    else if (datetype == 'arrival') {
        if ($("#txtDepart1").val() !== "") {
            $("#date_picker_range .return").addClass("active");
            $("#date_picker_range .depart").removeClass("active");
        } 
        else {
            $("#date_picker_range .return").removeClass("active");
            $("#date_picker_range .depart").addClass("active");
        }
        $("#txtArrival").datepicker(
            {
                dateFormat: 'dd/mm/yyyy' 
            }
        );
        
        $("txtArrival").datepicker("show");
        $('#hdndatetype').val('arrival');
        depSelect = false
    }
    if ($('#txtDepartual').val() != "Mon,Jan,01,001" && $("#txtDepart1").val() == "") {


        var dateString = $('#txtDepartual').val()
        var res = dateString.split(",");
        var monthname = [];
        monthname.push(res[1]);
        var random = monthname[0]
        var mont;
        switch (random) {

            case "Jan":
                mont = "01";
                break;
            case "Feb":
                mont = "02";
                break;
            case "Mar":
                mont = "03";
                break;
            case "Apr":
                mont = "04";
                break;
            case "May":
                mont = "05";
                break;
            case "Jun":
                mont = "06";
                break;
            case "Jul":
                mont = "07";
                break;
            case "Aug":
                mont = "08";
                break;
            case "Sep":
                mont = "09";
                break;
            case "Oct":
                mont = "10";
                break;
            case "Nov":
                mont = "11";
                break;
            case "Dec":
                mont = "12";
                break;
        }
        var mobdate = mont + '/' + res[2] + '/' + res[3];
        //   alert(mobdate);
        $('#txtDepart1').val(mobdate)

        if ($('#txtArrival').val() != "" && $("#txtReturn1").val() == "" && $("#RoundMultiOnewayTrip").val() != 1) {


            var dateStringarr = $('#txtArrival').val()
            var resarr = dateStringarr.split(",");
            var monthnamearr = [];
            monthnamearr.push(resarr[1]);
            var randomarr = monthnamearr[0]
            var montarr;
            switch (randomarr) {

                case "Jan":
                    montarr = "01";
                    break;
                case "Feb":
                    montarr = "02";
                    break;
                case "Mar":
                    montarr = "03";
                    break;
                case "Apr":
                    montarr = "04";
                    break;
                case "May":
                    montarr = "05";
                    break;
                case "Jun":
                    montarr = "06";
                    break;
                case "Jul":
                    montarr = "07";
                    break;
                case "Aug":
                    montarr = "08";
                    break;
                case "Sep":
                    montarr = "09";
                    break;
                case "Oct":
                    montarr = "10";
                    break;
                case "Nov":
                    montarr = "11";
                    break;
                case "Dec":
                    montarr = "12";
                    break;
            }
            var mobdatearr = montarr + '/' + resarr[2] + '/' + resarr[3];
            //    alert(mobdatearr);
            $('#txtReturn1').val(mobdatearr)
        }
    }
    //ReloadMobileCalender();
    $('#date_picker_range').modal();
}
function ReloadMobileCalender() {
    $("#mfstrvlerpicker-flight-mobile").datepicker({
        minDate: 0,
        format: 'M dd,yyyy',
        numberOfMonths: [13, 1],
        maxDate: "+12m",
        beforeShowDay: function (date) {

            if ($("#RoundMultiOnewayTrip").val() == "1" || $("#RoundMultiOnewayTrip").val() == "ONEWAY") {
                var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, iOS() ? $("#Departuretemp").val() : $("#txtDepart1").val());
                var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, iOS() ? $("#Departuretemp").val() : $("#txtDepart1").val());
            }
            else {
                var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, iOS() ? $("#Departuretemp").val() : $("#txtDepart1").val());
                var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, iOS() ? $("#Arrivaltemp").val() : $("#txtReturn1").val());
            }
            setTimeout(function () {
                //$('.dp-highlight :first').addClass('ui-datepicker-current-day');
                //$('.dp-highlight :first a').addClass('ui-state-active');
                $(".dp-highlight").eq(0).addClass("ui-datepicker-current-day");
                $(".dp-highlight").eq(0).find("a").addClass("ui-state-active");
                $(".dp-highlight").eq($(".dp-highlight").length - 1).addClass("ui-datepicker-current-day");
                $(".dp-highlight").eq($(".dp-highlight").length - 1).find("a").addClass("ui-state-active");
            }, 1000);

            return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
        },


        onSelect: function (dateText, inst) {
            
            var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#Departuretemp").val());
            var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#Arrivaltemp").val());
            //var selectedDate = $(this).datepicker("getDate");
            if ($("#RoundMultiOnewayTrip").val() == "1" || $("#RoundMultiOnewayTrip").val() == "ONEWAY") {
                $("#txtDepart1").val(dateText);
                $("#txtDepartual").val(dateText);
                $("#Departuretemp").val(dateText);
                var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#txtDepart1").val());
                if (date1 != null) {
                    var dateParams = date1.toString().split(' ');
                    $('#departdaymob').text(dateParams[1] + ' ' + dateParams[2]);
                    $('#departyearmob').text(dateParams[0] + ' ' + dateParams[3]);
                    $('#departdayname').text(dateParams[0]);
                }

                $(".dash_sign").css('display', 'none');
                $("#date_picker_range").modal("hide");
            }
            else {
                if (!date1 || date2) {
                    if ($('#hdndatetype').val() == 'depart') {
                        if ((date2 == null || date2 == '' || Date.parse($("#txtReturn1").val()) >= Date.parse(dateText)) && !date1) {
                            $("#txtDepart1").val(dateText);
                            $("#txtDepartual").val(dateText);
                            $("#Departuretemp").val(dateText);
                            var dateParams = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#txtDepart1").val()).toString().split(' ');
                            $('#departdaymob').text(dateParams[1] + ' ' + dateParams[2]);
                            $('#departyearmob').text(dateParams[0] + ' ' + dateParams[3]);
                            $('#departdayname').text(dateParams[0]);
                        }
                        else if ((date2 == null || date2 == '' || Date.parse($("#txtReturn1").val()) <= Date.parse(dateText))) {
                            $("#txtDepart1").val(dateText);
                            $("#txtDepartual").val(dateText);
                            $("#Departuretemp").val(dateText);
                            var dateParams = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#txtDepart1").val()).toString().split(' ');
                            $('#departdaymob').text(dateParams[1] + ' ' + dateParams[2]);
                            $('#departyearmob').text(dateParams[0] + ' ' + dateParams[3]);
                            $('#departdayname').text(dateParams[0]);
                            $("#txtReturn1").val(dateText);
                            $("#txtArrival").val(dateText);
                            $("#Arrivaltemp").val(dateText);

                            var dateParams2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#txtReturn1").val()).toString().split(' ');
                            $('#arrdaymob').text(dateParams2[1] + ' ' + dateParams2[2]);
                            $('#arryearmob').text(dateParams2[0] + ' ' + dateParams2[3]);
                            $('#arrdayname').text(dateParams2[0]);
                            $('#arrmonthmob').text('');
                            $('#arrdaynamemob').text('');

                            // $("#mfstrvlerpicker-flight-mobile").datepicker("option", "minDate", selectedDate);
                            $("#date_picker_range").modal("hide");
                        }
                        else {
                            $("#txtDepart1").val(dateText);
                            $("#txtDepartual").val(dateText);
                            $("#Departuretemp").val(dateText);
                            var dateParams = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#txtDepart1").val()).toString().split(' ');
                            $('#departdaymob').text(dateParams[1] + ' ' + dateParams[2]);
                            $('#departyearmob').text(dateParams[0] + ' ' + dateParams[3]);
                            $('#departdayname').text(dateParams[0]);
                            $("#date_picker_range").modal("hide");
                        }
                    }
                    else {
                        if (Date.parse($("#txtDepart1").val()) <= Date.parse(dateText)) {
                            $("#txtReturn1").val(dateText);
                            $("#txtArrival").val(dateText);
                            $("#Arrivaltemp").val(dateText);

                            var dateParams2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#txtReturn1").val()).toString().split(' ');
                            $('#arrdaymob').text(dateParams2[1] + ' ' + dateParams2[2]);
                            $('#arryearmob').text(dateParams2[0] + ' ' + dateParams2[3]);
                            $('#arrmonthmob').text('');
                            $('#arrdaynamemob').text('');
                            $('#arrdayname').text(dateParams2[0]);
                            $("#date_picker_range").modal("hide");
                            $("#xslanding_caldr").hide();
                        }
                        else {
                            //$("#xslanding_caldr").show();
                            $("#date_picker_range").modal("show");
                            $("#txtDepart1").val(dateText);
                            $("#txtDepartual").val(dateText);
                            $("#Departuretemp").val(dateText);
                            var dateParams = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#txtDepart1").val()).toString().split(' ');
                            $('#departdaymob').text(dateParams[1] + ' ' + dateParams[2]);
                            $('#departyearmob').text(dateParams[0] + ' ' + dateParams[3]);
                            $('#departdayname').text(dateParams[0]);
                        }
                    }
                }
                else {
                    if (depSelect === false) {
                        depSelect = true
                        $("#txtReturn1").val(dateText);
                        $("#txtArrival").val(dateText);
                        $("#Arrivaltemp").val(dateText);
                        var dateParams2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#txtReturn1").val()).toString().split(' ');
                        $('#arrdaymob').text(dateParams2[1] + ' ' + dateParams2[2]);
                        $('#arryearmob').text(dateParams2[0] + ' ' + dateParams2[3]);
                        $('#arrmonthmob').text('');
                        $('#arrdaynamemob').text('');
                        $('#arrdayname').text(dateParams2[0]);
                        if (Date.parse($("#txtDepart1").val()) > Date.parse($("#txtReturn1").val())) {
                            //$("#mfstrvlerpicker").datepicker("option", "minDate", selectedDate);
                            $('#xslanding_caldr').show();
                            $("#arrdaymob").val("");
                            $("#arryearmob").val("");
                            $("#txtReturn1").val("");
                            $("#Arrivaltemp").val("");
                            depSelect = false
                        }
                        else {
                            $("#date_picker_range").modal("hide");
                            $('#xslanding_caldr').hide();
                        }
                    } else {
                        depSelect = false
                        $("#txtDepart1").val(dateText);
                        $("#txtDepartual").val(dateText);
                        $("#Departuretemp").val(dateText);
                        var dateParams = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#txtDepart1").val()).toString().split(' ');
                        $('#departdaymob').text(dateParams[1] + ' ' + dateParams[2]);
                        $('#departyearmob').text(dateParams[0] + ' ' + dateParams[3]);
                        $('#departdayname').text(dateParams[0]);
                    }
                }
            }
            if ($("#date_picker_range .dp-highlight").length > 0) {
                $("#date_picker_range .return").removeClass("active");
                $("#date_picker_range .depart").addClass("active");
            } else {
                $("#date_picker_range .return").addClass("active");
                $("#date_picker_range .depart").removeClass("active");
            }
            //$("#date_picker_range").modal("hide");
        }
    });
}
/////////////////////////////////////AutoComplete For Flight///////////////////////////////////////////////////////////////////////////////////////

function AutoCompleteForFlight() {

    //$.noConflict();
    $(".slidingDiv").hide();
    $(".show_hide").show();
    $('.plus').click(function () {
        $(this).hide();
        $('.minus').show();
        $('.slidingDiv').show(500);
    });
    $('.minus').click(function () {
        $(this).hide();
        $('.plus').show();
        $('.slidingDiv').hide(500);
    });
    var origin_data = '';
    var destination_data = '';
    $('#Origin').autocomplete({
        autoFocus: true,
        minLength: 1,
        source: function (request, response) {
            $(document).keydown(function (objEvent) {
                if (objEvent.keyCode == 9) {  //tab pressed
                    // objEvent.preventDefault(); // stops its action
                    return false;
                }
            });
            
            var searchText = document.getElementById('Origin').value.replace(/[^\w\s]/gi, '');
            $('#btnSearchsubmit').attr('disabled', 'disabled');
            $('#btnSearchsubmit').text('Processing...');
            $.ajax({
                type: "POST",
                contentType: "application/json;",
                url: "/Flight/GetAutoSuggestionForUser",
                data: "{search_:'" + (searchText) + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var jsonData = JSON.parse(result);
                    origin_data = jsonData;
                    response(jsonData);
                    setTimeout(function () {
                        $('#btnSearchsubmit').removeAttr('disabled');
                        $('#btnSearchsubmit').text('SEARCH NOW');
                    }, 2000);
                },
                error: function (result) {
                    //console.log(result);
                }
            });
        },
        open: function () {
            $('#Origin').autocomplete("widget").width($('.search-bar').width() - 17);
        },

        select: function (event, ui) {
            $("#Origin").val(ui.item.autosuggest);
            $("#OriginCode").val(ui.item.AirportCode);
            $("#OriginCityCode").val(ui.item.CityCode);
            $("#OriginCountryCode").val(ui.item.CountryCode);
            var originp = $('#Origin').val().split(',');
            $("#Origin").val(ui.item.AirportCode);

            var cityDetals = originp[1] + ', ' + originp[2];
            $('#subLocOrigin').val(cityDetals);
            lastOrigin = ui.item.autosuggest;
            lastOriginCode = ui.item.AirportCode;
            lastOriginCityCode = ui.item.CityCode;
            lastOriginCountryCode = ui.item.CountryCode;
            setTimeout(function () {
                $("#Destination").focus();
            }, 100)

            return false;
        }

    })
        .autocomplete("instance")._renderItem = function (ul, response) {
            var autoSuggest = response.autosuggest;
            var formattedText = autoSuggest.replace(new RegExp(this.term, "gi"), "<span class='ui-autosuggest-highlight'>$&</span>");
            if (response.GroupAllAirport.toUpperCase() == "TRUE" && response.AirportId != -1) {
                formattedText = "<span class='airlist_child mfsIcon-airlist-child'></span>" + formattedText;
            }
            else if (response.AirportId == -1) {
                formattedText = "<span class='airlist_allairport mfsIcon-allairport'></span>" + formattedText;
            } else {
                formattedText = "<span class='airlist_airport mfsIcon-airplane-flight'></span>" + formattedText;
            }
            return $("<li class='airList'>")
                .append(" ")
                .append(formattedText)
                .appendTo(ul);
        };
    $('#Destination').autocomplete({
        autoFocus: true,
        minLength: 1,
        source: function (request, response) {
            var searchText = document.getElementById('Destination').value.replace(/[^\w\s]/gi, '');
            $('#btnSearchsubmit').attr('disabled', 'disabled');
            $('#btnSearchsubmit').text('Processing...');
            $.ajax({
                type: "POST",
                contentType: "application/json;",
                url: "/Flight/GetAutoSuggestionForUser",
                data: "{search_:'" + (searchText) + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var jsonData = JSON.parse(result);
                    destination_data = jsonData;
                    response(jsonData);
                    $('#btnSearchsubmit').removeAttr('disabled');
                    $('#btnSearchsubmit').text('SEARCH NOW');
                },
                error: function (result) {
                    // console.log(result);
                }
            });
        },
        open: function () {
            $('#Destination').autocomplete("widget").width($('.search-bar').width() - 17);
        },
        select: function (event, ui) {
            $("#Destination").val(ui.item.autosuggest);
            $("#DestinationCode").val(ui.item.AirportCode);
            $("#DestinationCityCode").val(ui.item.CityCode);
            $("#DestinationCountryCode").val(ui.item.CountryCode);

            lastDestination = ui.item.autosuggest;
            lastDestinationCode = ui.item.AirportCode;
            lastDestinationCityCode = ui.item.CityCode;
            lastDestinationCountryCode = ui.item.CountryCode;
            var destinp = $('#Destination').val().split(',');
            $("#Destination").val(ui.item.AirportCode);
            var cityDetals = destinp[1] + ', ' + destinp[2];
            $('#subLocDestination').val(cityDetals);
            if ($(window).width() > 767) {

                if ($("#txtDepartual").val() === "Mon,Jan,01,001" || $("#txtArrival").val() === "") {
                    $('#depart-cal').click();
                }

            } else {
                if ($("#txtDepartual").val() === "Mon,Jan,01,001" || $("#txtArrival").val() === "") {
                    showCalendar('depart')
                }
            }
            $(document).keydown(function (objEvent) {
                if (objEvent.keyCode == 9) {  //tab pressed
                    // objEvent.preventDefault(); // stops its action
                    return false;
                }
            });
            return false;
        }
    })

        .autocomplete("instance")._renderItem = function (ul, response) {
            var autoSuggest = response.autosuggest;
            var formattedText = autoSuggest.replace(
                new RegExp(this.term, "gi"),
                "<span class='ui-autosuggest-highlight'>$&</span>");

            if (response.GroupAllAirport.toUpperCase() == "TRUE" && response.AirportId != -1) {
                formattedText = "<span class='airlist_child mfsIcon-airlist-child'></span>" + formattedText;
            }
            else if (response.AirportId == -1) {
                formattedText = "<span class='airlist_allairport mfsIcon-allairport'></span>" + formattedText;
            } else {
                formattedText = "<span class='airlist_airport mfsIcon-airplane-flight'></span>" + formattedText;
            }
            return $("<li class='airList'>")
                .append(" ")
                .append(formattedText)
                .appendTo(ul);
        };


    $('#BindPreferedairlines').autocomplete({
        autoFocus: true,
        minLength: 1,
        source: function (request, response) {
            var searchText = document.getElementById('BindPreferedairlines').value.replace(/[^\w\s]/gi, '');
            $.ajax({
                type: "POST",
                contentType: "application/json;",
                async: false,
                url: "/Flight/GetFlightPrafranceForUser",
                data: "{search_:'" + $.trim(searchText) + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    var jsonData = JSON.parse(result);
                    response(jsonData);
                },
                error: function (result) {
                    // console.log(result);
                }
            });
        },

        blur: function (event, ui) {
            $("#BindPreferedairlines").val(ui.item.AirlineName);
            $("#PreferedairlinesCode").val(ui.item.AirlineCode);
            lastPreferredAirline = ui.item.AirlineName;
            lastPreferredAirlineCode = ui.item.AirlineCode;
            return false;
        },
        select: function (event, ui) {
            $("#BindPreferedairlines").val(ui.item.AirlineName);
            $("#PreferedairlinesCode").val(ui.item.AirlineCode);
            lastPreferredAirline = ui.item.AirlineName;
            lastPreferredAirlineCode = ui.item.AirlineCode;
            return false;
        },
        change: function (event, ui) {
            $("#BindPreferedairlines").val(ui.item.AirlineName);
            $("#PreferedairlinesCode").val(ui.item.AirlineCode);
            lastPreferredAirline = ui.item.AirlineName;
            lastPreferredAirlineCode = ui.item.AirlineCode;
            return false;
        }
    })
        .autocomplete("instance")._renderItem = function (ul, response) {
            return $("<li class='prefer'>")
                .append(response.AirlineName)
                .appendTo(ul);
        };

    var lastOrigin = '';
    var lastOriginCode = '';
    var lastOriginCityCode = '';
    var lastOriginCityName = '';

    var lastDestination = '';
    var lastDestinationCode = '';
    var lastDestinationCityCode = '';
    var lastDestinationCityName = '';
    var lastPreferredAirline = '';
    var lastPreferredAirlineCode = '';
    var lastDestinationCountryCode = '';
    var lastOriginCountryCode = '';
    $("#Origin").change(function () {
        if (lastOrigin == $("#Origin").val()) {
            $("#OriginCode").val(lastOriginCode);
            $("#OriginCityCode").val(lastOriginCityCode);
            $("#OriginCityName").val(lastOriginCityName);
            $("#OriginCountryCode").val(lastOriginCountryCode);
        } else {
            if (origin_data) {
                var originValue = $("#Origin").val();

                for (i = 0; i < origin_data.length; i++) {

                    if (origin_data[i].AirportCode == originValue.toUpperCase()) {
                        var originp = origin_data[i].autosuggest;
                        $('#Origin').val(origin_data[i].autosuggest.slice(0, 3));
                        $("#OriginCode").val(origin_data[i].AirportCode);
                        $("#OriginCityCode").val(origin_data[i].CityCode);
                        $("#OriginCityName").val(origin_data[i].CityName);
                        $("#OriginCountryCode").val(origin_data[i].CountryCode);
                        var originp = origin_data[i].autosuggest.split(',');
                        var cityDetals = originp[1] + ', ' + originp[2];
                        $('#subLocOrigin').val(cityDetals);
                        setTimeout(function () {
                            $("#Destination").focus();
                        }, 100)
                        if ($('#Origin').val() != '') {
                            $(document).on('keydown', '#Origin', function (objEvent) {
                                if (objEvent.keyCode == 9) {  //tab pressed
                                    //objEvent.preventDefault(); // stops its action
                                    //alert();
                                    setTimeout(function () { $("#Destination").focus(); }, 100);
                                }
                            });
                        }
                        break;
                    } else {
                        $("#OriginCode").val("");
                        $("#OriginCityCode").val("");
                        $("#OriginCityName").val("");
                        $("#OriginCountryCode").val("");
                    }
                }

            } else {
                $("#OriginCode").val("");
                $("#OriginCityCode").val("");
                $("#OriginCityName").val("");
                $("#OriginCountryCode").val("");
            }
            origin_data = '';
        }
    });
    $("#Destination").keyup(function () {
        if ($("#Destination").val().length > 2) {
            isDestinationClicked = true;
        } else {
            isDestinationClicked = false;
        }
    });

    var isDestinationClicked = false;
    $(document).click((event) => {
        if (!$(event.target).closest('#destinationMailDiv').length && isDestinationClicked) {
            isDestinationClicked = false;
            if (lastDestination == $("#Destination").val()) {
                $("#DestinationCode").val(lastDestinationCode);
                $("#DestinationCityCode").val(lastDestinationCityCode);
                $("#DestCityName").val(lastDestinationCityName);
                $("#DestinationCountryCode").val(lastDestinationCountryCode);
            } else {
                if (destination_data) {
                    var destinationValue = $("#Destination").val();
                    for (i = 0; i < destination_data.length; i++) {
                        if (destination_data[i].AirportCode == destinationValue.toUpperCase()) {
                            $('#Destination').val(destination_data[i].autosuggest.slice(0, 3));
                            $("#DestinationCode").val(destination_data[i].AirportCode);
                            $("#DestinationCityCode").val(destination_data[i].CityCode);
                            $("#DestCityName").val(destination_data[i].CityName);
                            $("#DestinationCountryCode").val(destination_data[i].CountryCode);
                            var destinp = destination_data[i].autosuggest.split(',');
                            var cityDetals = destinp[1] + ', ' + destinp[2];
                            $('#subLocDestination').val(cityDetals);
                            if ($(window).width() > 767) {

                                if ($("#txtDepartual").val() === "Mon,Jan,01,001" || $("#txtArrival").val() === "") {
                                    $('#txtDepartual').focus();
                                }

                            }
                            else {
                                if ($("#txtDepartual").val() === "Mon,Jan,01,001" || $("#txtArrival").val() === "") {
                                    showCalendar('depart')
                                }
                            }

                            break;
                        } else {
                            $("#DestinationCode").val("");
                            $("#DestinationCityCode").val("");
                            $("#DestCityName").val("");
                            $("#DestinationCountryCode").val("");
                        }
                    }


                } else {
                    $("#DestinationCode").val("");
                    $("#DestinationCityCode").val("");
                    $("#DestCityName").val("");
                    $("#DestinationCountryCode").val("");
                }
                destination_data = '';

            }
        }
    });
    if ($.trim($("#BindPreferedairlines").val()) == '')
        $("#PreferedairlinesCode").val("");
    else
        $("#PreferedairlinesCode").val($("#BindPreferedairlines").val());

    $("#BindPreferedairlines").change(function () {
        event.stopPropagation();
        if ($.trim($("#BindPreferedairlines").val()) != '' && lastPreferredAirline == $("#BindPreferedairlines").val()) {
            $("#PreferedairlinesCode").val(lastPreferredAirlineCode);
        } else {
            $("#PreferedairlinesCode").val("");
        }
    });
}

////////////////////////////////////Increment and Decrement///////////////////////////////////////////////////////////////////////////////////////

function IncrementAndDecrementAdultChild() {

    $('#btnAdultIncrease').click(function (e) {
        var totalAdult = Number($('#AdultCount').val());
        if (totalAdult < 8) {
            totalAdult++;
            $('#AdultCount').val(totalAdult);
            $("#btnAdultIncrease").removeAttr("disabled")
            updateTotalPax();
        }
        else {
            $("#btnAdultIncrease").attr("disabled", "disabled")
        }
    });
    // add row on increase child
    $('#btnchildIncrease').click(function (e) {

        var totalChild = Number($('#TotalChildCount').val());
        if (totalChild < 8) {
            totalChild++;
            addChild(totalChild);
            $('#TotalChildCount').val(totalChild);
            $("#btnchildIncrease").removeAttr("disabled")
            //totalpax++
            updateTotalPax();
        }
        else {
            $("#btnchildIncrease").attr("disabled", "disabled")
        }
    });

    $("#btnAdultDecrease").click(function (e) {

        var totalAdult = Number($('#AdultCount').val());
        if (totalAdult >= 1) {
            totalAdult--;
            $('#AdultCount').val(totalAdult);
            $("#btnAdultIncrease").removeAttr("disabled")

            updateTotalPax();
        }
        else {
            $("#btnAdultIncrease").removeAttr("disabled")
        }
    });

    $("#btnchildDecrease").click(function (e) {

        // remove row on decrease        
        var totalChild = Number($('#TotalChildCount').val());

        if (totalChild >= 1) {
            totalChild--;
            $('#Addchild .col-xs-6.remove-child').last().remove();
            $('#TotalChildCount').val(totalChild);
            $("#btnchildIncrease").removeAttr("disabled")
            updateTotalPax();
        }
        else {
            $("#btnchildIncrease").removeAttr("disabled")
        }

    });
}

////////////////////////////////////Updating Total Pax Before Inc////////////////////////////////////////////////////////////////////////////////

function updateTotalPax() {
    var adtCount = parseInt($("#AdultCount").val());
    var chdCount = parseInt($("#TotalChildCount").val());
    var totalpax = Number(adtCount) + Number(chdCount);
    $('#hideshow').val(totalpax);
    if (totalpax > 1)
        $('#span_flightpassanger').html('Passengers')
    else
        $('#span_flightpassanger').html('Passenger')
}


function IncrementAndDecrementAdultChild() {

    $('#btnAdultIncrease').click(function (e) {
        var totalAdult = Number($('#AdultCount').val());
        if (totalAdult < 8) {
            totalAdult++;
            $('#AdultCount').val(totalAdult);
            $("#btnAdultIncrease").removeAttr("disabled")
            updateTotalPax();
        }
        else {
            $("#btnAdultIncrease").attr("disabled", "disabled")
        }
    });
    // add row on increase child
    $('#btnchildIncrease').click(function (e) {

        var totalChild = Number($('#TotalChildCount').val());
        if (totalChild < 8) {
            totalChild++;
            addChild(totalChild);
            $('#TotalChildCount').val(totalChild);
            $("#btnchildIncrease").removeAttr("disabled")
            //totalpax++
            updateTotalPax();
        }
        else {
            $("#btnchildIncrease").attr("disabled", "disabled")
        }
    });

    $("#btnAdultDecrease").click(function (e) {

        var totalAdult = Number($('#AdultCount').val());
        if (totalAdult >= 1) {
            totalAdult--;
            $('#AdultCount').val(totalAdult);
            $("#btnAdultIncrease").removeAttr("disabled")

            updateTotalPax();
        }
        else {
            $("#btnAdultIncrease").removeAttr("disabled")
        }
    });

    $("#btnchildDecrease").click(function (e) {

        // remove row on decrease        
        var totalChild = Number($('#TotalChildCount').val());

        if (totalChild >= 1) {
            totalChild--;
            $('#Addchild .col-xs-6.remove-child').last().remove();
            $('#TotalChildCount').val(totalChild);
            $("#btnchildIncrease").removeAttr("disabled")
            updateTotalPax();
        }
        else {
            $("#btnchildIncrease").removeAttr("disabled")
        }

    });
}

////////////////////////////////////Updating Total Pax Before Inc////////////////////////////////////////////////////////////////////////////////

function updateTotalPax() {
    var adtCount = parseInt($("#AdultCount").val());
    var chdCount = parseInt($("#TotalChildCount").val());
    var totalpax = Number(adtCount) + Number(chdCount);
    $('#hideshow').val(totalpax);
    if (totalpax > 1)
        $('#span_flightpassanger').html('Passengers')
    else
        $('#span_flightpassanger').html('Passenger')
}

function HasRoundtrip() {
    if ($("#RoundMultiOnewayTrip").val() == "1" || $("#RoundMultiOnewayTrip").val() == "ONEWAY") {
        $('.Switch-flight').removeClass("Off");
        $('.Switch-flight').addClass("On");
        $('.round-trip').addClass("Osn");
        $("#hide-round").toggleClass("hide-trip");
        $('.one-ways').removeClass("clor-light");
        $('.round-trip').addClass("clor-light");
        $("#txtArrival").val('');
        $('#txtReturn1').val('');
        $("#date_picker_range #return_span").hide();
        $('#arrivedaymobdate').text('');
        $('#arrivemobmonth').text('Select');
        $('#arrivemobday').text('Date');
        $('#arrmonth').text('');
        $('#arrday').text('Select');
        $('#arrdayname').text('');
        $('#arryear').text('Date');
        $('#arrdaymob').text('Select');
        $('#arrdaynamemob').text('');
        $('#arryearmob').text('');
        $('#arrmonthmob').text('');
        $('#arrdaymob').text('');
        $('#arryearmob').text('Date');
        $('#arrdaymob').text('Select');



    }
    var eventTrack = $(window).width() <= 767 ? "touchstart" : "click";
    $('.Switch-flight ').on(eventTrack, function () {
        try {
            $(this).toggleClass('On').toggleClass('Off');
            $("#hide-round").toggleClass("hide-trip");
            $('.one-ways').toggleClass("clor-light");
            $('.round-trip').toggleClass("clor-light");
            var flag = $("#hide-round").hasClass("hide-trip");
            switch (flag) {
                case true:
                    $("#RoundMultiOnewayTrip").val(1);
                    $("#txtReturn1").val('');
                    $('#arrdaymob').text('Select');
                    $('#arryearmob').text('Date');
                    $("#txtArrival").val('');
                    $('#arrday').text('Select');
                    $('#arrmonth').text('');
                    $('#arrdayname').text('');
                    $('#arryear').text('Date');
                    $('#arrmonthmob').text('');
                    $('#arrdaynamemob').text('');


                    $("#date_picker_range #return_span").hide();
                    $('#xslanding_caldr').hide();
                    $(".dash_sign").css('display', 'none');

                    var i = 0;
                    $(".ui-datepicker-calendar td.dp-highlight").each(function (index) {
                        if (!$(this).hasClass('ui-datepicker-current-day')) {
                            $(this).removeClass('dp-highlight');
                            $(this).attr('data-highlightclass', 'dp-highlight');
                        }
                        else {
                            i++;
                            if (i > 1) {
                                $(this).removeClass('dp-highlight');
                                $(this).removeClass('ui-datepicker-current-day');
                                $(this).find('a').removeClass('ui-state-active');
                                $(this).attr('data-highlightclass', 'dp-highlight ui-datepicker-current-day');
                                $(this).find('a').attr('data-highlightclass', 'ui-state-active');

                            }
                        }
                    });

                    break;
                case false:
                    $("#RoundMultiOnewayTrip").val("ROUNDTRIP");
                    $("#txtArrival").datepicker();
                    $("#date_picker_range #return_span").show();
                    //code date  14-12-17 //
                    if ($('#txtDepartual').val() != '') {
                        var date3 = new Date($('#txtDepartual').val());
                        date3.setDate(date3.getDate());
                        $("#txtArrival").datepicker("option", "minDate", date3);
                    }

                //code date 14-12-17 //
                //if ($('#') != '1/1/0001 12:00:00 AM') {
                //    $("#dvArrival").css("display", "block");
                //}

                //$(".dash_sign").css('display', 'block');
                //$("td[data-highlightclass^='dp-highlight']").each(function (i, el) {
                //    $(this).addClass($(this).attr('data-highlightclass'));
                //});
                //$("a[data-highlightclass^='ui-state-active']").each(function (i, el) {
                //    $(this).addClass($(this).attr('data-highlightclass'));
                //});
            }
        }
        catch (e) { }

    });
}

function tripTypeUpdate(type) {
  
    if (type == "oneWay") {
        $(".Switch-flight").addClass('On').removeClass('Off');
        $("#hide-round").addClass("hide-trip");
        $('.one-ways').removeClass("clor-light");
        $('.round-trip').addClass("clor-light");
        //depSelect = true;
        $("#RoundMultiOnewayTrip").val(1);
        $("#txtReturn1").val('');
        $('#arrdaymob').text('Select');
        $('#arryearmob').text('Date');
        $("#txtArrival").val('');
        $("#Arrivaltemp").val('');
        $('#arrday').text('Select');
        $('#arrmonth').text('');
        $('#arrdayname').text('');
        $('#arryear').text('Date');
        $('#arrmonthmob').text('');
        $('#arrdaynamemob').text('');


        $("#date_picker_range #return_span").hide();
        $('#xslanding_caldr').hide();
        $(".dash_sign").css('display', 'none');
        $(".last-one").removeClass('ui-datepicker-current-day')
        $("#mfstrvlerpicker-flight-mobile").datepicker("destroy");
        ReloadMobileCalender()
        $("#mfstrvlerpicker-flight-mobile .ui-datepicker-calendar td.dp-highlight").each(function (index) {
            if (!$(this).hasClass('ui-datepicker-current-day')) {
                $(this).removeClass('dp-highlight');
                $(this).attr('data-highlightclass', 'dp-highlight');
            }
            else {
                if (index > 1) {
                    $(this).removeClass('ui-datepicker-current-day');
                    $(this).removeClass('dp-highlight');
                    $(this).find('a').removeClass('ui-state-active');
                    $(this).attr('data-highlightclass', 'dp-highlight ui-datepicker-current-day');
                    $(this).find('a').attr('data-highlightclass', 'ui-state-active');

                }
            }
        });
    }

    else {
        $(".Switch-flight").removeClass('On').addClass('Off');
        $("#hide-round").removeClass("hide-trip");
        $('.one-ways').addClass("clor-light");
        $('.round-trip').removeClass("clor-light");
        $("#RoundMultiOnewayTrip").val("ROUNDTRIP");
        $("#txtArrival").datepicker();
        $("#date_picker_range #return_span").show();
        //code date  14-12-17 //
        if ($('#txtDepartual').val() != '') {
            var date3 = new Date($('#txtDepartual').val());
            date3.setDate(date3.getDate());
            $("#txtArrival").datepicker("option", "minDate", date3);
        }
    }

}
/////////////////////////////////////////////add row html of child//////////////////////////////////////////////////////////////////////////////////
function addChild(getChildIndex) {
    var strHtml = '';
    strHtml += '<div class="col-xs-6 remove-child mart10 text-center">'
    strHtml += '<div class="input-group wid100">'
    strHtml += '<select id="ddlChildCount_' + getChildIndex + '" name="colors" class="childage icons-fix form-control" >'
    strHtml += '<option value="0">child ' + getChildIndex + ' age</option>'
    strHtml += '<option value="inflap">Under 2(lap)</option>'
    strHtml += '<option value="infseat">Under 2(seat)</option>'
    strHtml += '<option value="2">2</option>'
    strHtml += '<option value="3">3</option>'
    strHtml += '<option value="4">4</option>'
    strHtml += '<option value="5">5</option>'
    strHtml += '<option value="6">6</option>'
    strHtml += '<option value="7">7</option>'
    strHtml += '<option value="8">8</option>'
    strHtml += '<option value="9">9</option>'
    strHtml += '<option value="10">10</option>'
    strHtml += '<option value="11">11</option>'
    //strHtml += '<option value="12">12</option>'
    //strHtml += '<option value="13">13</option>'
    //strHtml += '<option value="14">14</option>'
    //strHtml += '<option value="15">15</option>'
    //strHtml += '<option value="16">16</option>'
    //strHtml += '<option value="17">17</option>'
    strHtml += '</select>'
    strHtml += '</div>'
    strHtml += '</div>'
    $('#dvSearchUser #Addchild').append(strHtml);
}
$(function () {
    //var flag1 = $("#hide-round").hasClass("hide-trip");
    //console.log(flag1)
    var tempDate = $('#txtArrival').val();
    $("#txtDepartual").datepicker({

        numberOfMonths: 2, minDate: 0, dateFormat: "D,dd,M,yy", maxDate: "+12m",
        onSelect: function (selectedDate) {
            if (selectedDate != '1/1/0001 12:00:00 AM') {

                $('#txtDepartual').val(selectedDate);
                var date3 = new Date($('#txtDepartual').val());
                var dept = date3.toString().split(' ');
                $("#departday").html(dept[2]);
                $("#departmonth").html(dept[1]);
                $("#departdayname").html(dept[0]);

                if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {

                    if (!!navigator.userAgent.match(/Trident\/7\./)) {

                        $("#departyear").html(dept[3]);
                    }
                    else {
                        $("#departyear").html(dept[5]);
                    }
                }
                else {
                    $("#departyear").html(dept[3]);
                }

                date3.setDate(date3.getDate());
                $("#txtArrival").datepicker("option", "minDate", date3);
                setTimeout(function () {
                    if ($('#RoundMultiOnewayTrip').val() == "ROUNDTRIP") {
                        if (tempDate != "" && new Date(tempDate) > new Date($('#txtDepartual').val())) {
                            $('#txtArrival').val(tempDate);
                            var arrdate = $('#txtArrival').val().split(',');
                            $("#arrdayname").html(arrdate[0]);
                            $("#arrday").html(arrdate[2]);
                            $("#arrmonth").html(arrdate[1]);
                            $("#arryear").html(arrdate[3]);
                        }
                        else {
                            if (new Date(tempDate) < new Date($('#txtDepartual').val()) && tempDate != "Mon,Jan,01,001") {

                                $('#txtArrival').val($('#txtDepartual').val());
                                var arrdate = $('#txtArrival').val().split(',');

                                $("#arrdayname").html(arrdate[0]);
                                $("#arrday").html(arrdate[1]);
                                $("#arrmonth").html(arrdate[2]);
                                $("#arryear").html(arrdate[3]);
                            }
                        }
                        if ($("#txtArrival").val() === "Mon,Jan,01,001" || $("#txtArrival").val() === "" || new Date($("#txtArrival").val()) === new Date($('#txtDepartual').val())) {

                            $("#arrive-cal").click();
                        }
                    }
                }, 10);
                // }
                var arrdate = $('#txtArrival').val().split(',');
                $("#arrdayname").html(arrdate[0]);
                $("#arrday").html(arrdate[1]);
                $("#arrmonth").html(arrdate[2]);
                $("#arryear").html(arrdate[3]);
            }
        },
        beforeShowDay: function (date) {
            var date1 = new Date($("#txtDepartual").val());
            var date2 = new Date($("#txtArrival").val());
            setTimeout(function () {
                $('.dp-highlight :last').parent().addClass('ui-datepicker-current-day');
            }, 100);
            return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
        },


    });

    $("#txtArrival").datepicker({
        numberOfMonths: 2, minDate: 0, maxDate: "+12m",
        dateFormat: "D,dd,M,yy",
        onSelect: function () {
            var date1 = new Date($("#txtDepartual").val());
            var date2 = new Date($("#txtArrival").val());
            if (date2 < date1) {
                date1 = date2;

                // $("#txtDepartual").val() = date1;
                $("#txtDepartual").val() = date1;
                $("#txtDepartual").val();
                var dept = date1.toString().split(' ');
                $("#departday").html(dept[2]);
                $("#departmonth").html(dept[1]);
                $("#departdayname").html(dept[0]);
                $("#departyear").html(dept[3]);
                var newdates = dept[0] + ',' + dept[2] + ',' + dept[1] + ',' + dept[3];
                $("#txtDepartual").val(newdates)
                //$('#txtArrival').val()
            }

            var arrdate = $('#txtArrival').val().split(',');

            $("#arrdayname").html(arrdate[0]);
            $("#arrday").html(arrdate[1]);
            $("#arrmonth").html(arrdate[2]);
            $("#arryear").html(arrdate[3]);
            return [true, date1 && (date2 >= date1) ? "dp-highlight" : ""];
        },
        beforeShowDay: function (date) {
            var date1 = new Date($("#txtDepartual").val());
            var date2 = new Date($("#txtArrival").val());
            setTimeout(function () {
                $('.dp-highlight :last').parent().addClass('ui-datepicker-current-day');
            }, 100);
            return ([true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""]);
        },

    });


});

// This button will decrement the value till 0 

$('.close-panel-flight-new').click(function (e) {
    
    alert("close popup");
    $('.passenger-count').hide();
});

$('.close-panel-flight').click(function (e) {
  
    alert("close popup");
    $('#hideshow').val(1);
    $('#AdultCount').val(1);
    $('#TotalChildCount').val(0);
    $('.remove-child').remove();
    $("#btnAdultIncrease").removeAttr("disabled");
    $("#btnchildIncrease").removeAttr("disabled");
    $('.passenger-count').hide();
});