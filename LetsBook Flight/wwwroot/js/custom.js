// ===== Return to Top_v3006 ==== 
var blocksearchlistTemp_ = blocksearchlist_;
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
    if (newWindowWidth>767) {
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

    GetHotelCookiesData();
    GetCarCookiesData();
    MobileHotelCalendar();
    MobileCarCalendar();
});

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
            //debugger;
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

///////////////////////////////////Validating Search Form //////////////////////////////////////////////////////////////////////////////////////
function BlockedAfricaUser() {

    //var BlockUser = [{ "Airport_Code": "", "City_Code": "", "Counytry_Code": "ID", "Counytry_Name": "Indonesia" },{ "Airport_Code": "AAC", "City_Code": "AAC", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "AAD", "City_Code": "AAD", "Counytry_Code": "SO", "Counytry_Name": "Somalia" }, { "Airport_Code": "AAE", "City_Code": "AAE", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "ACC", "City_Code": "ACC", "Counytry_Code": "GH", "Counytry_Name": "Ghana" }, { "Airport_Code": "ALY", "City_Code": "ALY", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "ANA", "City_Code": "MRE", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "APL", "City_Code": "APL", "Counytry_Code": "MZ", "Counytry_Name": "Mozambique" }, { "Airport_Code": "ASK", "City_Code": "ASK", "Counytry_Code": "CI", "Counytry_Name": "Ivory Coast" }, { "Airport_Code": "ATR", "City_Code": "ATR", "Counytry_Code": "MR", "Counytry_Name": "Mauritania" }, { "Airport_Code": "AWA", "City_Code": "AWA", "Counytry_Code": "ET", "Counytry_Name": "Ethiopia" }, { "Airport_Code": "AXU", "City_Code": "AXU", "Counytry_Code": "ET", "Counytry_Name": "Ethiopia" }, { "Airport_Code": "BEM", "City_Code": "BEM", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "BEW", "City_Code": "BEW", "Counytry_Code": "MZ", "Counytry_Name": "Mozambique" }, { "Airport_Code": "BFO", "City_Code": "BFO", "Counytry_Code": "ZW", "Counytry_Name": "Zimbabwe" }, { "Airport_Code": "BGF", "City_Code": "BGF", "Counytry_Code": "CF", "Counytry_Name": "Central African Republic" }, { "Airport_Code": "BJA", "City_Code": "BJA", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "BJL", "City_Code": "BJL", "Counytry_Code": "GM", "Counytry_Name": "Gambia" }, { "Airport_Code": "BJM", "City_Code": "BJM", "Counytry_Code": "BI", "Counytry_Name": "Burundi" }, { "Airport_Code": "BJR", "City_Code": "BJR", "Counytry_Code": "ET", "Counytry_Name": "Ethiopia" }, { "Airport_Code": "BKO", "City_Code": "BKO", "Counytry_Code": "ML", "Counytry_Name": "Mali" }, { "Airport_Code": "BSA", "City_Code": "BSA", "Counytry_Code": "SO", "Counytry_Name": "Somalia" }, { "Airport_Code": "BUG", "City_Code": "BUG", "Counytry_Code": "AO", "Counytry_Name": "Angola" }, { "Airport_Code": "BVC", "City_Code": "BVC", "Counytry_Code": "CV", "Counytry_Name": "Cape Verde, Republic Of" }, { "Airport_Code": "CCE", "City_Code": "CAI", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "CIP", "City_Code": "CIP", "Counytry_Code": "ZM", "Counytry_Name": "Zambia" }, { "Airport_Code": "CKY", "City_Code": "CKY", "Counytry_Code": "GN", "Counytry_Name": "Guinea" }, { "Airport_Code": "CMN", "City_Code": "CAS", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "DIE", "City_Code": "DIE", "Counytry_Code": "MG", "Counytry_Name": "Madagascar (Malagasy)" }, { "Airport_Code": "DIR", "City_Code": "DIR", "Counytry_Code": "ET", "Counytry_Name": "Ethiopia" }, { "Airport_Code": "EBH", "City_Code": "EBH", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "EDL", "City_Code": "EDL", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "ELL", "City_Code": "ELL", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "ENU", "City_Code": "ENU", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "FTU", "City_Code": "FTU", "Counytry_Code": "MG", "Counytry_Name": "Madagascar (Malagasy)" }, { "Airport_Code": "GCJ", "City_Code": "JNB", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "GHA", "City_Code": "GHA", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "HLE", "City_Code": "HLE", "Counytry_Code": "SH", "Counytry_Name": "Ascension Island/St. Helena" }, { "Airport_Code": "HWN", "City_Code": "HWN", "Counytry_Code": "ZW", "Counytry_Name": "Zimbabwe" }, { "Airport_Code": "HZV", "City_Code": "HZV", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "JOS", "City_Code": "JOS", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "JRO", "City_Code": "JRO", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "KAB", "City_Code": "KAB", "Counytry_Code": "ZW", "Counytry_Name": "Zimbabwe" }, { "Airport_Code": "KAD", "City_Code": "KAD", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "KAN", "City_Code": "KAN", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "KGL", "City_Code": "KGL", "Counytry_Code": "RW", "Counytry_Name": "Rwanda" }, { "Airport_Code": "KIM", "City_Code": "KIM", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "KME", "City_Code": "KME", "Counytry_Code": "RW", "Counytry_Name": "Rwanda" }, { "Airport_Code": "KMP", "City_Code": "KMP", "Counytry_Code": "NA", "Counytry_Name": "Namibia" }, { "Airport_Code": "KOF", "City_Code": "KOF", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "KTJ", "City_Code": "MRE", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "LAY", "City_Code": "LAY", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "LES", "City_Code": "LES", "Counytry_Code": "LS", "Counytry_Name": "Lesotho" }, { "Airport_Code": "LOK", "City_Code": "LOK", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "LOS", "City_Code": "LOS", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "LTA", "City_Code": "LTA", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "LUN", "City_Code": "LUN", "Counytry_Code": "ZM", "Counytry_Name": "Zambia" }, { "Airport_Code": "MBD", "City_Code": "MBD", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "MDR", "City_Code": "MRE", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "MFU", "City_Code": "MFU", "Counytry_Code": "ZM", "Counytry_Name": "Zambia" }, { "Airport_Code": "MIR", "City_Code": "MIR", "Counytry_Code": "TN", "Counytry_Name": "Tunisia" }, { "Airport_Code": "MJN", "City_Code": "MJN", "Counytry_Code": "MG", "Counytry_Name": "Madagascar (Malagasy)" }, { "Airport_Code": "MNO", "City_Code": "MNO", "Counytry_Code": "CD", "Counytry_Name": "Congo Democratic Republic Of" }, { "Airport_Code": "MRA", "City_Code": "MRA", "Counytry_Code": "LY", "Counytry_Name": "Libyan Arab Jamahiriya" }, { "Airport_Code": "MSU", "City_Code": "MSU", "Counytry_Code": "LS", "Counytry_Name": "Lesotho" }, { "Airport_Code": "MUH", "City_Code": "MUH", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "MYD", "City_Code": "MYD", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "NBO", "City_Code": "NBO", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "NDR", "City_Code": "NDR", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "NLO", "City_Code": "FIH", "Counytry_Code": "CD", "Counytry_Name": "Congo Democratic Republic Of" }, { "Airport_Code": "NSI", "City_Code": "YAO", "Counytry_Code": "CM", "Counytry_Name": "Cameroon, United Republic Of" }, { "Airport_Code": "NYK", "City_Code": "NYK", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "OCS", "City_Code": "OCS", "Counytry_Code": "GQ", "Counytry_Name": "Equatorial Guinea" }, { "Airport_Code": "OLG", "City_Code": "MRE", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "OLL", "City_Code": "OLL", "Counytry_Code": "CG", "Counytry_Name": "Congo" }, { "Airport_Code": "OLX", "City_Code": "MRE", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "OND", "City_Code": "OND", "Counytry_Code": "NA", "Counytry_Name": "Namibia" }, { "Airport_Code": "OSJ", "City_Code": "MRE", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "PHC", "City_Code": "PHC", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "PHW", "City_Code": "PHW", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "POG", "City_Code": "POG", "Counytry_Code": "GA", "Counytry_Name": "Gabon" }, { "Airport_Code": "PZB", "City_Code": "PZB", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "PZU", "City_Code": "PZU", "Counytry_Code": "SD", "Counytry_Name": "Sudan" }, { "Airport_Code": "QOW", "City_Code": "QOW", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "RAK", "City_Code": "RAK", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "RRG", "City_Code": "RRG", "Counytry_Code": "MU", "Counytry_Name": "Mauritius" }, { "Airport_Code": "SDD", "City_Code": "SDD", "Counytry_Code": "AO", "Counytry_Name": "Angola" }, { "Airport_Code": "SID", "City_Code": "SID", "Counytry_Code": "CV", "Counytry_Name": "Cape Verde, Republic Of" }, { "Airport_Code": "SLI", "City_Code": "SLI", "Counytry_Code": "ZM", "Counytry_Name": "Zambia" }, { "Airport_Code": "SSH", "City_Code": "SSH", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "SWP", "City_Code": "SWP", "Counytry_Code": "NA", "Counytry_Name": "Namibia" }, { "Airport_Code": "SZA", "City_Code": "SZA", "Counytry_Code": "AO", "Counytry_Name": "Angola" }, { "Airport_Code": "SZK", "City_Code": "SZK", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "TEE", "City_Code": "TEE", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "TET", "City_Code": "TET", "Counytry_Code": "MZ", "Counytry_Name": "Mozambique" }, { "Airport_Code": "THC", "City_Code": "THC", "Counytry_Code": "LR", "Counytry_Name": "Liberia" }, { "Airport_Code": "TIP", "City_Code": "TIP", "Counytry_Code": "LY", "Counytry_Name": "Libyan Arab Jamahiriya" }, { "Airport_Code": "TMS", "City_Code": "TMS", "Counytry_Code": "ST", "Counytry_Name": "Sao Tome and Principe" }, { "Airport_Code": "TOE", "City_Code": "TOE", "Counytry_Code": "TN", "Counytry_Name": "Tunisia" }, { "Airport_Code": "TUN", "City_Code": "TUN", "Counytry_Code": "TN", "Counytry_Name": "Tunisia" }, { "Airport_Code": "ULD", "City_Code": "ULD", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "VHC", "City_Code": "VHC", "Counytry_Code": "AO", "Counytry_Name": "Angola" }, { "Airport_Code": "VNX", "City_Code": "VNX", "Counytry_Code": "MZ", "Counytry_Name": "Mozambique" }, { "Airport_Code": "WDH", "City_Code": "WDH", "Counytry_Code": "NA", "Counytry_Name": "Namibia" }, { "Airport_Code": "YVA", "City_Code": "YVA", "Counytry_Code": "KM", "Counytry_Name": "Comoros" }, { "Airport_Code": "ZEC", "City_Code": "ZEC", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "ZLX", "City_Code": "ZLX", "Counytry_Code": "SD", "Counytry_Name": "Sudan" }, { "Airport_Code": "ZNZ", "City_Code": "ZNZ", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "ZSE", "City_Code": "ZSE", "Counytry_Code": "RE", "Counytry_Name": "Reunion" }, { "Airport_Code": "AAM", "City_Code": "AAM", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "ABJ", "City_Code": "ABJ", "Counytry_Code": "CI", "Counytry_Name": "Ivory Coast" }, { "Airport_Code": "AGA", "City_Code": "AGA", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "ASO", "City_Code": "ASO", "Counytry_Code": "ET", "Counytry_Name": "Ethiopia" }, { "Airport_Code": "ATZ", "City_Code": "ATZ", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "BKZ", "City_Code": "BKZ", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "BOY", "City_Code": "BOY", "Counytry_Code": "BF", "Counytry_Name": "Burkina Faso" }, { "Airport_Code": "BZH", "City_Code": "BZH", "Counytry_Code": "ZW", "Counytry_Name": "Zimbabwe" }, { "Airport_Code": "CBH", "City_Code": "CBH", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "COO", "City_Code": "COO", "Counytry_Code": "BJ", "Counytry_Name": "Benin" }, { "Airport_Code": "DAK", "City_Code": "DAK", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "DKR", "City_Code": "DKR", "Counytry_Code": "SN", "Counytry_Name": "Senegal" }, { "Airport_Code": "DZA", "City_Code": "DZA", "Counytry_Code": "YT", "Counytry_Name": "Mayotte" }, { "Airport_Code": "EUN", "City_Code": "EUN", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "FNA", "City_Code": "FNA", "Counytry_Code": "SL", "Counytry_Name": "Sierra Leone" }, { "Airport_Code": "FRW", "City_Code": "FRW", "Counytry_Code": "BW", "Counytry_Name": "Botswana" }, { "Airport_Code": "GAE", "City_Code": "GAE", "Counytry_Code": "TN", "Counytry_Name": "Tunisia" }, { "Airport_Code": "GBK", "City_Code": "GBK", "Counytry_Code": "SL", "Counytry_Name": "Sierra Leone" }, { "Airport_Code": "GDE", "City_Code": "GDE", "Counytry_Code": "ET", "Counytry_Name": "Ethiopia" }, { "Airport_Code": "GMB", "City_Code": "GMB", "Counytry_Code": "ET", "Counytry_Name": "Ethiopia" }, { "Airport_Code": "GUO", "City_Code": "GUO", "Counytry_Code": "SO", "Counytry_Name": "Somalia" }, { "Airport_Code": "HBE", "City_Code": "ALY", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "HGA", "City_Code": "HGA", "Counytry_Code": "SO", "Counytry_Name": "Somalia" }, { "Airport_Code": "HGS", "City_Code": "FNA", "Counytry_Code": "SL", "Counytry_Name": "Sierra Leone" }, { "Airport_Code": "HKR", "City_Code": "MRE", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "HLW", "City_Code": "HLW", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "HMB", "City_Code": "HMB", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "HRE", "City_Code": "HRE", "Counytry_Code": "ZW", "Counytry_Name": "Zimbabwe" }, { "Airport_Code": "IMO", "City_Code": "IMO", "Counytry_Code": "CF", "Counytry_Name": "Central African Republic" }, { "Airport_Code": "JIJ", "City_Code": "JIJ", "Counytry_Code": "ET", "Counytry_Name": "Ethiopia" }, { "Airport_Code": "JIM", "City_Code": "JIM", "Counytry_Code": "ET", "Counytry_Name": "Ethiopia" }, { "Airport_Code": "KMH", "City_Code": "KMH", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "KMS", "City_Code": "KMS", "Counytry_Code": "GH", "Counytry_Name": "Ghana" }, { "Airport_Code": "KRT", "City_Code": "KRT", "Counytry_Code": "SD", "Counytry_Name": "Sudan" }, { "Airport_Code": "LAD", "City_Code": "LAD", "Counytry_Code": "AO", "Counytry_Name": "Angola" }, { "Airport_Code": "LBV", "City_Code": "LBV", "Counytry_Code": "GA", "Counytry_Name": "Gabon" }, { "Airport_Code": "LLE", "City_Code": "LLE", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "LLI", "City_Code": "LLI", "Counytry_Code": "ET", "Counytry_Name": "Ethiopia" }, { "Airport_Code": "LLW", "City_Code": "LLW", "Counytry_Code": "MW", "Counytry_Name": "Malawi" }, { "Airport_Code": "LUO", "City_Code": "LUO", "Counytry_Code": "AO", "Counytry_Name": "Angola" }, { "Airport_Code": "LXR", "City_Code": "LXR", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "MBI", "City_Code": "MBI", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "MDI", "City_Code": "MDI", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "MEK", "City_Code": "MEK", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "MGH", "City_Code": "MGH", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "MGQ", "City_Code": "MGQ", "Counytry_Code": "SO", "Counytry_Name": "Somalia" }, { "Airport_Code": "MMO", "City_Code": "MMO", "Counytry_Code": "CV", "Counytry_Name": "Cape Verde, Republic Of" }, { "Airport_Code": "MPA", "City_Code": "MPA", "Counytry_Code": "NA", "Counytry_Name": "Namibia" }, { "Airport_Code": "MQX", "City_Code": "MQX", "Counytry_Code": "ET", "Counytry_Name": "Ethiopia" }, { "Airport_Code": "MUB", "City_Code": "MUB", "Counytry_Code": "BW", "Counytry_Name": "Botswana" }, { "Airport_Code": "MUZ", "City_Code": "MUZ", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "MVB", "City_Code": "MVB", "Counytry_Code": "GA", "Counytry_Name": "Gabon" }, { "Airport_Code": "MXM", "City_Code": "MXM", "Counytry_Code": "MG", "Counytry_Name": "Madagascar (Malagasy)" }, { "Airport_Code": "NBE", "City_Code": "NBE", "Counytry_Code": "TN", "Counytry_Name": "Tunisia" }, { "Airport_Code": "NDB", "City_Code": "NDB", "Counytry_Code": "MR", "Counytry_Name": "Mauritania" }, { "Airport_Code": "NDJ", "City_Code": "NDJ", "Counytry_Code": "TD", "Counytry_Name": "Chad" }, { "Airport_Code": "NDU", "City_Code": "NDU", "Counytry_Code": "NA", "Counytry_Name": "Namibia" }, { "Airport_Code": "NIM", "City_Code": "NIM", "Counytry_Code": "NE", "Counytry_Name": "Niger" }, { "Airport_Code": "NTO", "City_Code": "NTO", "Counytry_Code": "CV", "Counytry_Name": "Cape Verde, Republic Of" }, { "Airport_Code": "NTY", "City_Code": "NTY", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "NWA", "City_Code": "NWA", "Counytry_Code": "KM", "Counytry_Name": "Comoros" }, { "Airport_Code": "OUA", "City_Code": "OUA", "Counytry_Code": "BF", "Counytry_Name": "Burkina Faso" }, { "Airport_Code": "OUD", "City_Code": "OUD", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "OUH", "City_Code": "OUH", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "OZZ", "City_Code": "OZZ", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "PMA", "City_Code": "PMA", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "PNR", "City_Code": "PNR", "Counytry_Code": "CG", "Counytry_Name": "Congo" }, { "Airport_Code": "POL", "City_Code": "POL", "Counytry_Code": "MZ", "Counytry_Name": "Mozambique" }, { "Airport_Code": "PRI", "City_Code": "PRI", "Counytry_Code": "SC", "Counytry_Name": "Seychelles" }, { "Airport_Code": "PTG", "City_Code": "PTG", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "QRA", "City_Code": "JNB", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "QSF", "City_Code": "QSF", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "QUO", "City_Code": "QUO", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "RAI", "City_Code": "RAI", "Counytry_Code": "CV", "Counytry_Name": "Cape Verde, Republic Of" }, { "Airport_Code": "RCB", "City_Code": "RCB", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "RHN", "City_Code": "RHN", "Counytry_Code": "NA", "Counytry_Name": "Namibia" }, { "Airport_Code": "RUN", "City_Code": "RUN", "Counytry_Code": "RE", "Counytry_Name": "Reunion" }, { "Airport_Code": "SBU", "City_Code": "SBU", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "SEU", "City_Code": "SEU", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "SEZ", "City_Code": "SEZ", "Counytry_Code": "SC", "Counytry_Name": "Seychelles" }, { "Airport_Code": "SFA", "City_Code": "SFA", "Counytry_Code": "TN", "Counytry_Name": "Tunisia" }, { "Airport_Code": "SHY", "City_Code": "SHY", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "SNI", "City_Code": "SNI", "Counytry_Code": "LR", "Counytry_Name": "Liberia" }, { "Airport_Code": "SPX", "City_Code": "SPX", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "TBJ", "City_Code": "TBJ", "Counytry_Code": "TN", "Counytry_Name": "Tunisia" }, { "Airport_Code": "TBO", "City_Code": "TBO", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "TFR", "City_Code": "TFR", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "TIN", "City_Code": "TIN", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "TLD", "City_Code": "TLD", "Counytry_Code": "BW", "Counytry_Name": "Botswana" }, { "Airport_Code": "TMM", "City_Code": "TMM", "Counytry_Code": "MG", "Counytry_Name": "Madagascar (Malagasy)" }, { "Airport_Code": "TNR", "City_Code": "TNR", "Counytry_Code": "MG", "Counytry_Name": "Madagascar (Malagasy)" }, { "Airport_Code": "UTT", "City_Code": "UTT", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "VIL", "City_Code": "VIL", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "VIR", "City_Code": "DUR", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "VXE", "City_Code": "VXE", "Counytry_Code": "CV", "Counytry_Name": "Cape Verde, Republic Of" }, { "Airport_Code": "WMN", "City_Code": "WMN", "Counytry_Code": "MG", "Counytry_Name": "Madagascar (Malagasy)" }, { "Airport_Code": "XLS", "City_Code": "XLS", "Counytry_Code": "SN", "Counytry_Name": "Senegal" }, { "Airport_Code": "ABB", "City_Code": "ABB", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "ABS", "City_Code": "ABS", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "ABV", "City_Code": "ABV", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "ADD", "City_Code": "ADD", "Counytry_Code": "ET", "Counytry_Name": "Ethiopia" }, { "Airport_Code": "AFD", "City_Code": "AFD", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "ASI", "City_Code": "ASI", "Counytry_Code": "SH", "Counytry_Name": "Ascension Island/St. Helena" }, { "Airport_Code": "ASW", "City_Code": "ASW", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "BFN", "City_Code": "BFN", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "BLZ", "City_Code": "BLZ", "Counytry_Code": "MW", "Counytry_Name": "Malawi" }, { "Airport_Code": "BNI", "City_Code": "BNI", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "BSG", "City_Code": "BSG", "Counytry_Code": "GQ", "Counytry_Name": "Equatorial Guinea" }, { "Airport_Code": "BVR", "City_Code": "BVR", "Counytry_Code": "CV", "Counytry_Name": "Cape Verde, Republic Of" }, { "Airport_Code": "CAI", "City_Code": "CAI", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "CBQ", "City_Code": "CBQ", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "CBT", "City_Code": "CBT", "Counytry_Code": "AO", "Counytry_Name": "Angola" }, { "Airport_Code": "CEH", "City_Code": "CEH", "Counytry_Code": "MW", "Counytry_Name": "Malawi" }, { "Airport_Code": "CPT", "City_Code": "CPT", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "DKA", "City_Code": "DKA", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "DLA", "City_Code": "DLA", "Counytry_Code": "CM", "Counytry_Name": "Cameroon, United Republic Of" }, { "Airport_Code": "DSS", "City_Code": "DKR", "Counytry_Code": "SN", "Counytry_Name": "Senegal" }, { "Airport_Code": "DUR", "City_Code": "DUR", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "EBB", "City_Code": "EBB", "Counytry_Code": "UG", "Counytry_Name": "Uganda" }, { "Airport_Code": "ELS", "City_Code": "ELS", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "ERH", "City_Code": "ERH", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "FCB", "City_Code": "FCB", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "FIH", "City_Code": "FIH", "Counytry_Code": "CD", "Counytry_Name": "Congo Democratic Republic Of" }, { "Airport_Code": "GEM", "City_Code": "GEM", "Counytry_Code": "GQ", "Counytry_Name": "Equatorial Guinea" }, { "Airport_Code": "GOM", "City_Code": "GOM", "Counytry_Code": "CD", "Counytry_Name": "Congo Democratic Republic Of" }, { "Airport_Code": "GOU", "City_Code": "GOU", "Counytry_Code": "CM", "Counytry_Name": "Cameroon, United Republic Of" }, { "Airport_Code": "GRJ", "City_Code": "GRJ", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "GYI", "City_Code": "GYI", "Counytry_Code": "RW", "Counytry_Name": "Rwanda" }, { "Airport_Code": "HAH", "City_Code": "YVA", "Counytry_Code": "KM", "Counytry_Name": "Comoros" }, { "Airport_Code": "HME", "City_Code": "HME", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "IBL", "City_Code": "IBL", "Counytry_Code": "MZ", "Counytry_Name": "Mozambique" }, { "Airport_Code": "INH", "City_Code": "INH", "Counytry_Code": "MZ", "Counytry_Name": "Mozambique" }, { "Airport_Code": "JEK", "City_Code": "RYL", "Counytry_Code": "ZM", "Counytry_Name": "Zambia" }, { "Airport_Code": "JIB", "City_Code": "JIB", "Counytry_Code": "DJ", "Counytry_Name": "Djibouti" }, { "Airport_Code": "KEU", "City_Code": "MRE", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "KTL", "City_Code": "KTL", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "LAU", "City_Code": "LAU", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "LKG", "City_Code": "LKG", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "LUD", "City_Code": "LUD", "Counytry_Code": "NA", "Counytry_Name": "Namibia" }, { "Airport_Code": "MAT", "City_Code": "MAT", "Counytry_Code": "CD", "Counytry_Name": "Congo Democratic Republic Of" }, { "Airport_Code": "MJI", "City_Code": "TIP", "Counytry_Code": "LY", "Counytry_Name": "Libyan Arab Jamahiriya" }, { "Airport_Code": "MJW", "City_Code": "MJW", "Counytry_Code": "ZW", "Counytry_Name": "Zimbabwe" }, { "Airport_Code": "MLW", "City_Code": "MLW", "Counytry_Code": "LR", "Counytry_Name": "Liberia" }, { "Airport_Code": "MRE", "City_Code": "MRE", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "MTS", "City_Code": "MTS", "Counytry_Code": "SZ", "Counytry_Name": "Swaziland" }, { "Airport_Code": "MVZ", "City_Code": "MVZ", "Counytry_Code": "ZW", "Counytry_Name": "Zimbabwe" }, { "Airport_Code": "NCS", "City_Code": "NCS", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "NLA", "City_Code": "NLA", "Counytry_Code": "ZM", "Counytry_Name": "Zambia" }, { "Airport_Code": "NLP", "City_Code": "NLP", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "NUU", "City_Code": "NUU", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "NYE", "City_Code": "NYE", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "OMD", "City_Code": "OMD", "Counytry_Code": "NA", "Counytry_Name": "Namibia" }, { "Airport_Code": "OXB", "City_Code": "OXB", "Counytry_Code": "GW", "Counytry_Name": "Guinea Bissau" }, { "Airport_Code": "OZG", "City_Code": "OZG", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "PBZ", "City_Code": "PBZ", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "PHG", "City_Code": "PHC", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "PLZ", "City_Code": "PLZ", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "ROB", "City_Code": "MLW", "Counytry_Code": "LR", "Counytry_Name": "Liberia" }, { "Airport_Code": "RYL", "City_Code": "RYL", "Counytry_Code": "ZM", "Counytry_Name": "Zambia" }, { "Airport_Code": "SEW", "City_Code": "SEW", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "SEY", "City_Code": "SEY", "Counytry_Code": "MR", "Counytry_Name": "Mauritania" }, { "Airport_Code": "SFL", "City_Code": "SFL", "Counytry_Code": "CV", "Counytry_Name": "Cape Verde, Republic Of" }, { "Airport_Code": "SHC", "City_Code": "SHC", "Counytry_Code": "ET", "Counytry_Name": "Ethiopia" }, { "Airport_Code": "SHO", "City_Code": "MTS", "Counytry_Code": "SZ", "Counytry_Name": "Swaziland" }, { "Airport_Code": "SIS", "City_Code": "SIS", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "SMS", "City_Code": "SMS", "Counytry_Code": "MG", "Counytry_Name": "Madagascar (Malagasy)" }, { "Airport_Code": "SNE", "City_Code": "SNE", "Counytry_Code": "CV", "Counytry_Name": "Cape Verde, Republic Of" }, { "Airport_Code": "SSG", "City_Code": "SSG", "Counytry_Code": "GQ", "Counytry_Name": "Equatorial Guinea" }, { "Airport_Code": "SVB", "City_Code": "SVB", "Counytry_Code": "MG", "Counytry_Name": "Madagascar (Malagasy)" }, { "Airport_Code": "SVP", "City_Code": "SVP", "Counytry_Code": "AO", "Counytry_Name": "Angola" }, { "Airport_Code": "SZE", "City_Code": "SZE", "Counytry_Code": "ET", "Counytry_Name": "Ethiopia" }, { "Airport_Code": "TAF", "City_Code": "ORN", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "TCP", "City_Code": "TCP", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "TGT", "City_Code": "TGT", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "THY", "City_Code": "THY", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "TLM", "City_Code": "TLM", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "TNG", "City_Code": "TNG", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "TOB", "City_Code": "TOB", "Counytry_Code": "LY", "Counytry_Name": "Libyan Arab Jamahiriya" }, { "Airport_Code": "TTU", "City_Code": "TTU", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "UEL", "City_Code": "UEL", "Counytry_Code": "MZ", "Counytry_Name": "Mozambique" }, { "Airport_Code": "UKA", "City_Code": "UKA", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "UTW", "City_Code": "UTW", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "UVL", "City_Code": "UVL", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "VFA", "City_Code": "VFA", "Counytry_Code": "ZW", "Counytry_Name": "Zimbabwe" }, { "Airport_Code": "VVZ", "City_Code": "VVZ", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "VXC", "City_Code": "VXC", "Counytry_Code": "MZ", "Counytry_Name": "Mozambique" }, { "Airport_Code": "VYD", "City_Code": "VYD", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "WEL", "City_Code": "WEL", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "ZIG", "City_Code": "ZIG", "Counytry_Code": "SN", "Counytry_Name": "Senegal" }, { "Airport_Code": "ZIS", "City_Code": "ZIS", "Counytry_Code": "LY", "Counytry_Name": "Libyan Arab Jamahiriya" }, { "Airport_Code": "AHU", "City_Code": "AHU", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "ALG", "City_Code": "ALG", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "ALJ", "City_Code": "ALJ", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "AMH", "City_Code": "AMH", "Counytry_Code": "ET", "Counytry_Name": "Ethiopia" }, { "Airport_Code": "ARK", "City_Code": "ARK", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "ASM", "City_Code": "ASM", "Counytry_Code": "ER", "Counytry_Name": "Eritrea" }, { "Airport_Code": "ASS", "City_Code": "ASS", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "BBK", "City_Code": "BBK", "Counytry_Code": "BW", "Counytry_Name": "Botswana" }, { "Airport_Code": "BBO", "City_Code": "BBO", "Counytry_Code": "SO", "Counytry_Name": "Somalia" }, { "Airport_Code": "BEN", "City_Code": "BEN", "Counytry_Code": "LY", "Counytry_Name": "Libyan Arab Jamahiriya" }, { "Airport_Code": "BIY", "City_Code": "BIY", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "BLJ", "City_Code": "BLJ", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "BLW", "City_Code": "BLW", "Counytry_Code": "SO", "Counytry_Name": "Somalia" }, { "Airport_Code": "BSK", "City_Code": "BSK", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "BUQ", "City_Code": "BUQ", "Counytry_Code": "ZW", "Counytry_Name": "Zimbabwe" }, { "Airport_Code": "BZV", "City_Code": "BZV", "Counytry_Code": "CG", "Counytry_Name": "Congo" }, { "Airport_Code": "CAS", "City_Code": "CAS", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "CFK", "City_Code": "CFK", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "CMK", "City_Code": "CMK", "Counytry_Code": "MW", "Counytry_Name": "Malawi" }, { "Airport_Code": "CZL", "City_Code": "CZL", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "DAR", "City_Code": "DAR", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "DJE", "City_Code": "DJE", "Counytry_Code": "TN", "Counytry_Name": "Tunisia" }, { "Airport_Code": "EMG", "City_Code": "EMG", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "ERS", "City_Code": "WDH", "Counytry_Code": "NA", "Counytry_Name": "Namibia" }, { "Airport_Code": "ESU", "City_Code": "ESU", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "FBM", "City_Code": "FBM", "Counytry_Code": "CD", "Counytry_Name": "Congo Democratic Republic Of" }, { "Airport_Code": "FEZ", "City_Code": "FEZ", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "GBE", "City_Code": "GBE", "Counytry_Code": "BW", "Counytry_Name": "Botswana" }, { "Airport_Code": "GDQ", "City_Code": "GDQ", "Counytry_Code": "ET", "Counytry_Name": "Ethiopia" }, { "Airport_Code": "GGM", "City_Code": "GGM", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "GMO", "City_Code": "GMO", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "GWE", "City_Code": "GWE", "Counytry_Code": "ZW", "Counytry_Name": "Zimbabwe" }, { "Airport_Code": "HDS", "City_Code": "HDS", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "HLA", "City_Code": "JNB", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "HRG", "City_Code": "HRG", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "HRS", "City_Code": "HRS", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "IBA", "City_Code": "IBA", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "IRI", "City_Code": "IRI", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "JNB", "City_Code": "JNB", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "KBH", "City_Code": "KBH", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "KHX", "City_Code": "KHX", "Counytry_Code": "UG", "Counytry_Name": "Uganda" }, { "Airport_Code": "KIS", "City_Code": "KIS", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "KMK", "City_Code": "KMK", "Counytry_Code": "CG", "Counytry_Name": "Congo" }, { "Airport_Code": "KXE", "City_Code": "KXE", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "LFW", "City_Code": "LFW", "Counytry_Code": "TG", "Counytry_Name": "Togo" }, { "Airport_Code": "LMB", "City_Code": "LMB", "Counytry_Code": "MW", "Counytry_Name": "Malawi" }, { "Airport_Code": "LOY", "City_Code": "LOY", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "LVI", "City_Code": "LVI", "Counytry_Code": "ZM", "Counytry_Name": "Zambia" }, { "Airport_Code": "MAI", "City_Code": "MAI", "Counytry_Code": "MW", "Counytry_Name": "Malawi" }, { "Airport_Code": "MBA", "City_Code": "MBA", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "MEZ", "City_Code": "MEZ", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "MNC", "City_Code": "MNC", "Counytry_Code": "MZ", "Counytry_Name": "Mozambique" }, { "Airport_Code": "MOQ", "City_Code": "MOQ", "Counytry_Code": "MG", "Counytry_Name": "Madagascar (Malagasy)" }, { "Airport_Code": "MPM", "City_Code": "MPM", "Counytry_Code": "MZ", "Counytry_Name": "Mozambique" }, { "Airport_Code": "MQP", "City_Code": "NLP", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "MRU", "City_Code": "MRU", "Counytry_Code": "MU", "Counytry_Name": "Mauritius" }, { "Airport_Code": "MSZ", "City_Code": "MSZ", "Counytry_Code": "AO", "Counytry_Name": "Angola" }, { "Airport_Code": "MVR", "City_Code": "MVR", "Counytry_Code": "CM", "Counytry_Name": "Cameroon, United Republic Of" }, { "Airport_Code": "MWZ", "City_Code": "MWZ", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "MYW", "City_Code": "MYW", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "MZI", "City_Code": "MZI", "Counytry_Code": "ML", "Counytry_Name": "Mali" }, { "Airport_Code": "NBN", "City_Code": "NBN", "Counytry_Code": "GQ", "Counytry_Name": "Equatorial Guinea" }, { "Airport_Code": "NGE", "City_Code": "NGE", "Counytry_Code": "CM", "Counytry_Name": "Cameroon, United Republic Of" }, { "Airport_Code": "NKC", "City_Code": "NKC", "Counytry_Code": "MR", "Counytry_Name": "Mauritania" }, { "Airport_Code": "NOS", "City_Code": "NOS", "Counytry_Code": "MG", "Counytry_Name": "Madagascar (Malagasy)" }, { "Airport_Code": "ORN", "City_Code": "ORN", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "OUZ", "City_Code": "OUZ", "Counytry_Code": "MR", "Counytry_Name": "Mauritania" }, { "Airport_Code": "PKW", "City_Code": "PKW", "Counytry_Code": "BW", "Counytry_Name": "Botswana" }, { "Airport_Code": "PRY", "City_Code": "WKF", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "QRW", "City_Code": "QRW", "Counytry_Code": "NG", "Counytry_Name": "Nigeria" }, { "Airport_Code": "RBA", "City_Code": "RBA", "Counytry_Code": "MA", "Counytry_Name": "Morocco" }, { "Airport_Code": "RMF", "City_Code": "RMF", "Counytry_Code": "EG", "Counytry_Name": "Egypt" }, { "Airport_Code": "SAZ", "City_Code": "SAZ", "Counytry_Code": "LR", "Counytry_Name": "Liberia" }, { "Airport_Code": "SDB", "City_Code": "SDB", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "SUT", "City_Code": "SUT", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "TCU", "City_Code": "TCU", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "TKD", "City_Code": "TKD", "Counytry_Code": "GH", "Counytry_Name": "Ghana" }, { "Airport_Code": "TKQ", "City_Code": "TKQ", "Counytry_Code": "TZ", "Counytry_Name": "Tanzania United Republic Of" }, { "Airport_Code": "TLE", "City_Code": "TLE", "Counytry_Code": "MG", "Counytry_Name": "Madagascar (Malagasy)" }, { "Airport_Code": "TML", "City_Code": "TML", "Counytry_Code": "GH", "Counytry_Name": "Ghana" }, { "Airport_Code": "TMR", "City_Code": "TMR", "Counytry_Code": "DZ", "Counytry_Name": "Algeria" }, { "Airport_Code": "UAS", "City_Code": "UAS", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "UTA", "City_Code": "UTA", "Counytry_Code": "ZW", "Counytry_Name": "Zimbabwe" }, { "Airport_Code": "UTN", "City_Code": "UTN", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "VPG", "City_Code": "VPG", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "VPY", "City_Code": "VPY", "Counytry_Code": "MZ", "Counytry_Name": "Mozambique" }, { "Airport_Code": "WIL", "City_Code": "NBO", "Counytry_Code": "KE", "Counytry_Name": "Kenya" }, { "Airport_Code": "WKF", "City_Code": "WKF", "Counytry_Code": "ZA", "Counytry_Name": "South Africa" }, { "Airport_Code": "WVB", "City_Code": "WVB", "Counytry_Code": "NA", "Counytry_Name": "Namibia" }, { "Airport_Code": "YAO", "City_Code": "YAO", "Counytry_Code": "CM", "Counytry_Name": "Cameroon, United Republic Of" }];
    // var BlockUser = ['AAC', 'AAD', 'AAE', 'ACC', 'ALY', 'MRE', 'APL', 'ASK', 'ATR', 'AWA', 'AXU', 'BEM', 'BEW', 'BFO', 'BGF', 'BJA', 'BJL', 'BJM', 'BJR', 'BKO', 'BSA', 'BUG', 'BVC', 'CAI', 'CIP', 'CKY', 'CAS', 'DIE', 'DIR', 'EBH', 'EDL', 'ELL', 'ENU', 'FTU', 'JNB', 'GHA', 'HLE', 'HWN', 'HZV', 'JOS', 'JRO', 'KAB', 'KAD', 'KAN', 'KGL', 'KIM', 'KME', 'KMP', 'KOF', 'LAY', 'LES', 'LOK', 'LOS', 'LTA', 'LUN', 'MBD', 'MFU', 'MIR', 'MJN', 'MNO', 'MRA', 'MSU', 'MUH', 'MYD', 'NBO', 'NDR', 'FIH', 'YAO', 'NYK', 'OCS', 'OLL', 'OND', 'PHC', 'PHW', 'POG', 'PZB', 'PZU', 'QOW', 'RAK', 'RRG', 'SDD', 'SID', 'SLI', 'SSH', 'SWP', 'SZA', 'SZK', 'TEE', 'TET', 'THC', 'TIP', 'TMS', 'TOE', 'TUN', 'ULD', 'VHC', 'VNX', 'WDH', 'YVA', 'ZEC', 'ZLX', 'ZNZ', 'ZSE', 'AAM', 'ABJ', 'AGA', 'ASO', 'ATZ', 'BKZ', 'BOY', 'BZH', 'CBH', 'COO', 'DAK', 'DKR', 'DZA', 'EUN', 'FNA', 'FRW', 'GAE', 'GBK', 'GDE', 'GMB', 'GUO', 'HGA', 'HLW', 'HMB', 'HRE', 'IMO', 'JIJ', 'JIM', 'KMH', 'KMS', 'KRT', 'LAD', 'LBV', 'LLE', 'LLI', 'LLW', 'LUO', 'LXR', 'MBI', 'MDI', 'MEK', 'MGH', 'MGQ', 'MMO', 'MPA', 'MQX', 'MUB', 'MUZ', 'MVB', 'MXM', 'NBE', 'NDB', 'NDJ', 'NDU', 'NIM', 'NTO', 'NTY', 'NWA', 'OUA', 'OUD', 'OUH', 'OZZ', 'PMA', 'PNR', 'POL', 'PRI', 'PTG', 'QSF', 'QUO', 'RAI', 'RCB', 'RHN', 'RUN', 'SBU', 'SEU', 'SEZ', 'SFA', 'SHY', 'SNI', 'SPX', 'TBJ', 'TBO', 'TFR', 'TIN', 'TLD', 'TMM', 'TNR', 'UTT', 'VIL', 'DUR', 'VXE', 'WMN', 'XLS', 'ABB', 'ABS', 'ABV', 'ADD', 'AFD', 'ASI', 'ASW', 'BFN', 'BLZ', 'BNI', 'BSG', 'BVR', 'CBQ', 'CBT', 'CEH', 'CPT', 'DKA', 'DLA', 'EBB', 'ELS', 'ERH', 'FCB', 'GEM', 'GOM', 'GOU', 'GRJ', 'GYI', 'HME', 'IBL', 'INH', 'RYL', 'JIB', 'KTL', 'LAU', 'LKG', 'LUD', 'MAT', 'MJW', 'MLW', 'MTS', 'MVZ', 'NCS', 'NLA', 'NLP', 'NUU', 'NYE', 'OMD', 'OXB', 'OZG', 'PBZ', 'PLZ', 'SEW', 'SEY', 'SFL', 'SHC', 'SIS', 'SMS', 'SNE', 'SSG', 'SVB', 'SVP', 'SZE', 'ORN', 'TCP', 'TGT', 'THY', 'TLM', 'TNG', 'TOB', 'TTU', 'UEL', 'UKA', 'UTW', 'UVL', 'VFA', 'VVZ', 'VXC', 'VYD', 'WEL', 'ZIG', 'ZIS', 'AHU', 'ALG', 'ALJ', 'AMH', 'ARK', 'ASM', 'ASS', 'BBK', 'BBO', 'BEN', 'BIY', 'BLJ', 'BLW', 'BSK', 'BUQ', 'BZV', 'CFK', 'CMK', 'CZL', 'DAR', 'DJE', 'EMG', 'ESU', 'FBM', 'FEZ', 'GBE', 'GDQ', 'GGM', 'GMO', 'GWE', 'HDS', 'HRG', 'HRS', 'IBA', 'IRI', 'KBH', 'KHX', 'KIS', 'KMK', 'KXE', 'LFW', 'LMB', 'LOY', 'LVI', 'MAI', 'MBA', 'MEZ', 'MNC', 'MOQ', 'MPM', 'MRU', 'MSZ', 'MVR', 'MWZ', 'MYW', 'MZI', 'NBN', 'NGE', 'NKC', 'NOS', 'OUZ', 'PKW', 'WKF', 'QRW', 'RBA', 'RMF', 'SAZ', 'SDB', 'SUT', 'TCU', 'TKD', 'TKQ', 'TLE', 'TML', 'TMR', 'UAS', 'UTA', 'UTN', 'VPG', 'VPY', 'WVB', 'ANA', 'CCE', 'CMN', 'GCJ', 'KTJ', 'MDR', 'NLO', 'NSI', 'OLG', 'OLX', 'OSJ', 'HBE', 'HGS', 'HKR', 'QRA', 'VIR', 'DSS', 'HAH', 'JEK', 'KEU', 'MJI', 'PHG', 'ROB', 'SHO', 'TAF', 'ERS', 'HLA', 'MQP', 'PRY', 'WIL', 'TMC', 'TNJ', 'SOQ', 'SRG', 'TTE', 'PLM', 'PNK', 'NAM', 'KNG', 'KNO', 'MDC', 'MES', 'FKQ', 'HLP', 'DOB', 'DTB', 'CBN', 'BWX', 'TIM', 'TRK', 'SOC', 'TJQ', 'PKN', 'PKU', 'PGK', 'LUW', 'MLG', 'KTG', 'LBJ', 'LOP', 'JOG', 'DJJ', 'ENE', 'BPN', 'BDO', 'BIK', 'BKS', 'TKG', 'PDG', 'PLW', 'MKW', 'MOF', 'KAZ', 'KBU', 'KOE', 'CXP', 'DJB', 'DPS', 'BDJ', 'BEJ', 'BTJ', 'BUW', 'CGK', 'AHI', 'UPG', 'SQG', 'SUB', 'PKY', 'PXA', 'MKQ', 'KDI', 'GNS', 'BMU', 'BTH', 'AMI', 'AMQ', 'JKT', 'MES'];
    var BlockUser = blocksearchlistTemp_;
    //var origin = $("#Origin").val();
    //var dest = $("#Destination").val();
    //var OriginCityCode = $("#OriginCityCode").val();
    //var DestinationCityCode = $("#DestinationCityCode").val();
    //for (var index = 0; index < BlockUser.length; ++index) {

    //    var user = BlockUser[index];

    //    if (user == origin.toUpperCase() || user == OriginCityCode.toUpperCase() || user == DestinationCityCode.toUpperCase() || user == dest.toUpperCase()) {
    //        return false;
    //        break;
    //    }
    //}
    var origin = $("#Origin").val();
    var dest = $("#Destination").val();
    if (origin != "") {
        var OCode = $("#OriginCode").val();
        var OCityCode = $("#OriginCityCode").val();
        var OCountryCode = $("#OriginCountryCode").val();

        for (var index = 0; index < BlockUser.length; ++index) {

            var user = BlockUser[index];

            if (user.AirportCode == origin.toUpperCase() ||user.AirportCode == origin.toUpperCase() || user.CityCode == origin.toUpperCase() ||
                (user.AirportCode == "" && user.CityCode == "" && user.CountryCode == OCountryCode.toUpperCase())) {

                var r = (user.AirportCode == origin.toUpperCase()) == true ? user.AirportName.toUpperCase() :
                    (user.CityCode == origin.toUpperCase()) == true ? user.CityName.toUpperCase() :
                        (user.AirportCode == "" && user.CityCode == "" && user.CountryCode == OCountryCode.toUpperCase()) == true ? user.CountryName.toUpperCase() : "";
                return r;
                break;
            }

        }
    }
    if (dest != "") {
        var DCode = $("#DestinationCode").val();
        var DCityCode = $("#DestinationCityCode").val();
        var DCountryCode = $("#DestinationCountryCode").val();
        for (var index = 0; index < BlockUser.length; ++index) {

            var user = BlockUser[index];

            if (user.AirportCode == dest.toUpperCase() || user.CityCode == dest.toUpperCase() ||
                (user.AirportCode == "" && user.CityCode == "" && user.CountryCode == DCountryCode.toUpperCase())) {

                var r = (user.AirportCode == dest.toUpperCase()) == true ? user.AirportName.toUpperCase() :
                    (user.CityCode == dest.toUpperCase()) == true ? user.CityName.toUpperCase() :
                        (user.AirportCode == "" && user.CityCode == "" && user.CountryCode == DCountryCode.toUpperCase()) == true ? user.CountryName.toUpperCase() : "";
                return r;
                break;
            }

        }
    }

}


function ValidateSearchForm(ISCuba) {
    $("#mainErrorCover").css("display", "block");

    var isValid = true;
    //if (ISCuba.toLowerCase() == 'true') {

    //    if (($("#DestinationCountryCode").val().length > 0 && $("#DestinationCountryCode").val().toLowerCase() == "cu") || ($("#OriginCountryCode").val().length > 0 && $("#OriginCountryCode").val().toLowerCase() == "cu")) {
    //        isValid = false;
    //        $('#CubaPopUp').modal('show');
    //        return isValid;
    //    }
    //}

    if ($("#Origin").val() == "") {
        $("#spnOrigin").css("display", "block");
        $("#spnOrigin").html("+ Please provide From City / Airport Code");
        isValid = false;
    }
    else {
        $("#spnOrigin").css("display", "none");
        $("#spnOrigin").html("");
    }
    if ($("#Destination").val() == "") {
        $("#spnDestination").css("display", "block");
        $("#spnDestination").html("+ Please provide To City / Airport Code");
        isValid = false;
    }
    else {
        $("#spnDestination").css("display", "none");
        $("#spnDestination").html("");
    }
    if ($("#txtDepartual").val() == "1/1/0001 12:00:00 AM" || $("#departdayname").html() == "") {
        $("#spnDepartual").css("display", "block");
        $("#spnDepartual").html("+ Please provide Departure Date");
        isValid = false;
    }
    else {
        $("#spnDepartual").css("display", "none");
        $("#spnDepartual").html("");
    }
    if (new Date($("#txtArrival").val()) < new Date($("#txtDepartual").val())) {
        $("#spnDepartual").css("display", "block");
        $("#spnDepartual").html("+ Please provide valid Return Date");
        isValid = false;
    }
    else {
        $("#spnDepartual").css("display", "none");
        $("#spnDepartual").html("");
    }
    if ($("#RoundMultiOnewayTrip").val() == "2" || $("#RoundMultiOnewayTrip").val() == "ROUNDTRIP") {
        if ($("#txtArrival").val() == "1/1/0001 12:00:00 AM" || $("#txtArrival").val() == "" || $("#arrdayname").html() == "") {
            $("#spnArrival").css("display", "block");
            $("#spnArrival").html("+ Please provide Return Date");
            isValid = false;
        }
        else {
            $("#spnArrival").css("display", "none");
            $("#spnArrival").html("");
        }
    }
    else {
        $("#spnArrival").css("display", "none");
        $("#spnArrival").html("");
    }
    var adtCount = parseInt($("#AdultCount").val());
    var chdCount = parseInt($("#TotalChildCount").val());

    var isUmnr = false;
    if (adtCount == 0 && chdCount > 0) {
        for (i = 1; i <= chdCount; i++) {
            var value = $("#ddlChildCount_" + i).val();
            if (parseInt(value) >= 5 && parseInt(value) <= 17) {
                isUmnr = true;
                isValid = false;
            }
        }
    }


    if ($('#Destination').val() != '') {

        var origincode = ($('#Origin').val()).split("-");
        var Destinationcode = ($('#Destination').val()).split("-");
        var origin = origincode[0];
        var destination = Destinationcode[0];
        if (origin.trim().toLowerCase() == destination.trim().toLowerCase()) {
            $("#destinat").css("display", "block");
            $("#destinat").html("+ The Departure City/Airport should be different from the Origin City/Airport");
            $('#Destination').focus();
            isValid = false;
        } else {
            $("#destinat").css("display", "none");
            $("#destinat").html("");
        }
    }

    var g = BlockedAfricaUser();
    if (g != null) {
        $('#blocksearchname_').text(g);
        $('#africaPopUp').modal('show');
        isValid = false;
        return isValid;
    }
    if ($("#Origin").val() != "" && $("#Destination").val() != "") {
        var data = { OriginText: $("#Origin").val(), destinText: $("#Destination").val() };
        $.ajax({
            url: '/Flight/ValidateOriginAndDestination', type: 'POST', data: JSON.stringify(data), contentType: 'application/json', async: false,
            success: function (result) {
                //if (result.success == false && result.cubaEnabled == true) {
                //    $('#CubaPopUp').modal('show');
                //    isValid = false;
                //    return false;
                //} else
                if (result.success == false && result.cubaEnabled == false) {
                    $("#spnOriginDestination").css("display", "block");
                    $("#spnOriginDestination").html(result.msg);
                    if (isUmnr == true) {
                        $('#unc_overlay').show();
                        $('.unc_dialog').show();
                    }
                    isValid = false;

                }
                else {
                    $("#spnOriginDestination").css("display", "none");
                    $("#spnOriginDestination").html("");
                    if (isUmnr == true) {
                        $('#unc_overlay').show();
                        $('.unc_dialog').show();
                    }
                }
            }
        });


    } else {
        $("#spnOriginDestination").css("display", "none");
        $("#spnOriginDestination").html("");
        if (isUmnr == true) {
            $('#unc_overlay').show();
            $('.unc_dialog').show();
        }
    }


    var infInLapCount = 0;
    var infInSeatCount = 0
    var childCount = 0
    var child12to17Count = 0
    var ChildAgeValue = "";
    var ISChildAgeBlank = true;
    if (chdCount > 0) {
        for (i = 1; i <= chdCount; i++) {
            var value = $("#ddlChildCount_" + i).val();
            if (value == "0") {
                $("#spnChildren").css("display", "block");
                $("#spnChildren").html("+ Please provide the age of each child.");
                ISChildAgeBlank = false;
                isValid = false;
            }
            else {
                if (ISChildAgeBlank == true) {
                    $("#spnChildren").css("display", "none");
                    $("#spnChildren").html("");
                }
            }

            if (value == "inflap") {
                infInLapCount = Number(infInLapCount) + 1;
            }
            else if (value == "infseat") {
                infInSeatCount = Number(infInSeatCount) + 1;
            }
            else {//if (value != "0") {
                if (Number(value) >= 12 && Number(value) <= 17) {
                    child12to17Count = Number(child12to17Count) + 1;
                }
                else { childCount = Number(childCount) + 1; }
            }
            ChildAgeValue += "ddlChildCount_" + i + ',' + value + ';';
        }

        ChildAgeValue = ChildAgeValue.substring(0, ChildAgeValue.lastIndexOf(";"));
    }
    var totalTraveller = Number(adtCount) + Number(childCount) + Number(child12to17Count) + Number(infInLapCount) + Number(infInSeatCount);
    $('#AdultCount').val(adtCount);
    $('#ChildCount').val(childCount);
    $('#Child12To17Count').val(child12to17Count);
    $('#InfantCount').val(infInSeatCount);
    $('#InfantInlapCount').val(infInLapCount);
    $("#hdnChildAge").val(ChildAgeValue);

    // validation Atleast on Adult  selection
    if (($("#AdultCount").val() == "" || $("#AdultCount").val() == "0")) {//&& ($("#SeniorCount").val() == "" || $("#SeniorCount").val() == "0")
        $("#spnAdult").css("display", "block");
        $("#spnAdult").html("<b>+ There must be atleast 1 adult !</b>");
        isValid = false;
        //      return isValid;
    }
    else {
        $("#spnAdult").css("display", "none");
        $("#spnAdult").html("");
    }

    // chekc for total no of travellers
    if (totalTraveller > 8) {//(parseInt($("#AdultCount").val()) + parseInt($("#ChildCount").val())) + parseInt($("#InfantCount").val()) + parseInt($("#InfantInlapCount").val()
        $("#spnTotalTraveller").css("display", "block");
        $("#spnTotalTraveller").html("+ You can add upto 8 travelers only.If you are planning to travel with group, please call us toll free at <strong>" + TollFreeNumber + "</strong> for assistance.");
        isValid = false;
    }
    else {
        $("#spnTotalTraveller").css("display", "none");
        $("#spnTotalTraveller").html("");
    }
    if ((parseInt($("#InfantCount").val()) + parseInt($("#InfantInlapCount").val())) > (parseInt($("#AdultCount").val()))) {
        $("#spnTotalInfant").css("display", "block");
        $("#spnTotalInfant").html("<b>+ The number of infants must be equal to number of Adults.</b>");
        isValid = false;
    }
    else {
        $("#spnTotalInfant").css("display", "none");
        $("#spnTotalInfant").html("");
    }


    var agechild = $("#hdnChildAge").val();
    $('#txtHiddenChildAge1').val(agechild);
    $('#txtHiddenAdultPax1').val($("#AdultCount").val());

    // $('#txtHiddenChildPax1').val($("#hideshow2").val());
    var a = "", b = "", c = "", d = "";
    a = parseInt($('#Child12To17Count').val());
    b = parseInt($('#InfantCount').val());
    c = parseInt($('#InfantInlapCount').val());
    d = parseInt($("#ChildCount").val());
    $('#txtHiddenChildPax1').val(a + b + c + d);
    //var countchild = $("#hideshow2").val();

    var countchild = $("#ChildCount").val();
    var childAge;
    for (i = 0; i < countchild; i++) {
        childAge = agechild.split(";");
        var childID = childAge[i].split(",")[0];
        var childAges = childAge[i].split(",")[1];

        $("#" + childID).find('option[value=' + childAges + ']').attr('selected', 'selected')
    }
    $("#txthiddenOrigin").val($('#subLocOrigin').val());
    $("#txthiddenDest").val($('#subLocDestination').val());
    if (isValid) {
        GAClickEventHomeCall();
       // $(".flight-view").show();
        $("#btnSearchsubmit").addClass("disabled in-progress");
        $("#btnSearchsubmit").html("Please wait...");
        setTimeout(function () {
            // $(".flight-view").hide();
            $("#btnSearchsubmit").removeClass("disabled in-progress");
            $("#btnSearchsubmit").html("SEARCH NOW");
            $('#Origin').val($('#OriginCode').val());
            $('#Destination').val($('#DestinationCode').val());
        }, 1000);
        return true;
    }
    else
        return false;
}
jQuery(document).ready(function () {
    debugger;
    var show_temp = 10;
    alert(show_temp);
    jQuery('#show-passenger').on('click', function (event) {
        jQuery('#content').toggle('show');
    });
});

$(document).ready(function () {
    debugger;
    var show_temp = 10;
    alert(show_temp);
    $('#show-passenger').on('click', function (event) {
        $('#content').toggle('show');
    });
});

$(document).on('#show-passenger', 'click', function (event) {
    debugger;
    var show_temp = 10;
    alert(show_temp);
    
   $('#content').toggle('show');
   
});

////////////////////////////////Updating Values From Model//////////////////////////////////////////////////////////////////////////////////////

function UpadtingONDValue() {

    try {

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {

            var date3 = $('#txtDepartual').val();
            var dept = date3.toString().split(',');
        } else {
            var date3 = new Date($('#txtDepartual').val());
            var dept = date3.toString().split(' ');
        }

        $("#departday").html(dept[2]);
        $("#departmonth").html(dept[1]);
        $("#departdayname").html(dept[0]);
        $('#departdaymob').text(dept[1] + ' ' + dept[2]);
        $('#departyearmob').text(dept[0] + ' ' + dept[3]);
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

        if ($("#RoundMultiOnewayTrip").val().length > 0 && $("#RoundMultiOnewayTrip").val() != 1) {

            if ($('#txtArrival').val() != "" && $('#txtArrival').val() != "1/1/0001 12:00:00 AM") {
                //debugger;

                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    var date4 = $('#txtArrival').val();
                    var arrdate = date4.toString().split(',');
                }
                else {
                    var date4 = new Date($('#txtArrival').val());
                    var arrdate = date4.toString().split(' ');
                }
                // $("#txtReturn1").val($.datepicker.formatDate('mm/dd/yy', new Date(date4)));

                $("#arrdayname").html(arrdate[0]);
                $("#arrday").html(arrdate[2]);
                $("#arrmonth").html(arrdate[1]);
                $("#arrdaynamemob").html(arrdate[0]);
                $("#arrdaymob").html(arrdate[2]);
                $("#arrmonthmob").html(arrdate[1]);
                $('#arrivedaymobdate').html(arrdate[2]);
                $('#arrivemobmonth').html(arrdate[1]);
                $('#arrivemobday').html(arrdate[0])
                if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {

                    if (!!navigator.userAgent.match(/Trident\/7\./)) {

                        $("#arryear").html(dept[3]);
                    }
                    else {
                        $("#arryear").html(dept[5]);
                    }
                }

                else {
                    $("#arryear").html(dept[3]);
                    $("#arryearmob").html(dept[3]);
                }
                //$("#txtReturn1").val($.datepicker.formatDate('mm/dd/yy', new Date(date4)));
            }
        }
        else if ($("#RoundMultiOnewayTrip").val().length > 0 && $("#RoundMultiOnewayTrip").val() != 1) {

            $('.Switch-flight').removeClass("Off");
            $('.Switch-flight').addClass("On");
            $('.round-trip').addClass("Osn");
            $("#hide-round").toggleClass("hide-trip");
            $('.one-ways').removeClass("clor-light");
            $('.round-trip').addClass("clor-light");
        }
        //   ReloadMobileCalender();
    }
    catch (e) {
    }
    try {
        if ($('#Origin').val().length > 0) {
            var originp = $('#Origin').val().split(',');
            var Origin_Airportcode = originp[0].split('-');
            var cityDetals = originp[1] + ', ' + originp[2];
            $('#Origin').val(Origin_Airportcode[0].trim());
            $('#subLocOrigin').val(cityDetals);
        }

        if ($('#Destination').val().length > 0) {
            var destinp = $('#Destination').val().split(',');
            var destina_Airportcode = destinp[0].split('-');
            var cityDetals = destinp[1] + ', ' + destinp[2];
            $('#Destination').val(destina_Airportcode[0].trim());
            $('#subLocDestination').val(cityDetals);
        }

        if ($('#PickUpLocation').val().length > 0) {
            var pickupL = $('#PickUpLocation').val().split(',');
            var pickupcityDetails = pickupL[1] + ',' + pickupL[2];
            $('#sub_pickupL').val(pickupcityDetails);
        }
        if ($('#DropLocation').val().length > 0) {
            var dropL = $('#DropLocation').val().split(',');
            var dropcityDetails = dropL[1] + ',' + dropL[2];
            $('#sub_dropL').val(dropcityDetails);
        }

        updateTravelerValue();
    }
    catch (e) { }
}
function updateTravelerValue() {

    var adultcnt = Number($('#AdultCount').val());
    var chdcnt = parseInt($('#ChildCount').val()) + parseInt($('#Child12To17Count').val()) + parseInt($('#InfantInlapCount').val()) + parseInt($('#InfantCount').val());
    var FlightClass = $('#FlightClass').val();
    var BindPreferedairlines = $('#BindPreferedairlines').val();
    var NonstopFlights = $('#NonstopFlights').val();
    var Totalcnt = adultcnt + chdcnt;
    if (chdcnt != 0) {
        $('#hideshow').val(adultcnt);
        $('#hideshow2').val(chdcnt);
        $('#AdultCount').val(adultcnt);
        $('#TotalChildCount').val(chdcnt);
    } else {

        $('#hideshow').val($('#txtHiddenAdultPax1').val());
        $('#hideshow2').val($('#txtHiddenChildPax1').val());
        $('#AdultCount').val($('#txtHiddenAdultPax1').val());
        $('#TotalChildCount').val($('#txtHiddenChildPax1').val());
    }
    $('#FlightClass').val(FlightClass);
    $('#BindPreferedairlines').val(BindPreferedairlines);
    $('#NonstopFlights').val(NonstopFlights);
    if (chdcnt > 0 || $('#txtHiddenChildPax1').val() > 0) {
        if ($('#txtHiddenChildPax1').val() > 0) {
            chdcnt = $('#txtHiddenChildPax1').val();
        }

        for (var i = 1; i <= chdcnt; i++) {
            addChild(i);
        }

        if ($("#hdnChildAge").val() != "") {
            var childAge = $("#hdnChildAge").val().split(";");
        }
        else {
            var childAge = $("#txtHiddenChildAge1").val().split(";");
        }
        var array = new Array();
        array = childAge.toString().split(',');
        for (var j = 0; j <= array.length; j++) {
            $('#' + array[j]).val(array[j + 1]);
        }
    }
}

//////////////////////////////////////////////RoundTrip And OneWay///////////////////////////////////////////////////////////////////////////////////

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
    debugger;
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
                        if (tempDate !="" && new Date(tempDate) > new Date($('#txtDepartual').val())) {
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



/////////////////////////////////////////////////////////////////////#endregion Flight////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//#region Hotel

$(function () {

    $('#HotelAdultCount').val(1);
    $('#HotelChildCount').val(0);

    $('#NumberofRooms').val(1);
    $('#HotelNumberofTraveler').val('1 Room 1 Guests');

    var searchText_Old = '';
    var customRenderMenu = function (ul, items) {
        var self = this;
        var category = null;
        var NodeCount = 0;
        $.each(items, function (index, item) {
            var li;
            if (item.search_category != category) {
                category = item.search_category;
                NodeCount = 1;
                ul.append("<li class=Header-" + category + ">.</li>");
            }

            li = self._renderItemData(ul, item);
            var liText = li.html();
            var SearchTerm = searchText_Old;
            //Find the reg expression, replace it with coloring/ 
            var tag = 'b' || 'strong',
                words = [SearchTerm] || [],
                regex = RegExp(words.join('|'), 'gi'),
                replacement = '<' + tag + '>$&</' + tag + '>';
            var liTextHighlighted = liText.replace(regex, replacement);
            li.html(liTextHighlighted);
            li.addClass("Content");

        });
        if (NodeCount == 0) {
            $('li', ul).last().remove();
            ul.append("<li class=Content>No Match Found</li>");
        }
        ul.append("<li class=ui-last-line>Keep typing your filter.....</li>");
    };


    $("#txtCheckIn").datepicker({
        numberOfMonths: 2, minDate: 0, dateFormat: "D,dd,M,yy", maxDate: "+12m",
        onSelect: function (selectedDate) {
            var date3 = new Date($('#txtCheckIn').val());
            date3.setDate(date3.getDate() + 1);
            $("#txtCheckOut").datepicker("option", "minDate", date3);
            var dept = $('#txtCheckIn').val().split(',');
            $("#checkindayname").html(dept[0]);
            $("#checkinday").html(dept[1]);
            $("#checkinmonth").html(dept[2]);
            $("#checkinyear").html(dept[3]);
            setTimeout(function () {
                $("#txtCheckOut").datepicker('show');
            }, 10);
            var arrdate = $('#txtCheckOut').val().split(',');
            $("#checkoutdayname").html(arrdate[0]);
            $("#checkoutday").html(arrdate[1]);
            $("#checkoutmonth").html(arrdate[2]);
            $("#checkoutyear").html(arrdate[3]);
            $("#SpanCheckinDate").css("display", "none");
        },
        beforeShowDay: function (date) {
            var date1 = new Date($("#txtCheckIn").val());
            var date2 = new Date($("#txtCheckOut").val());
            return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
        },
    });
    $("#txtCheckOut").datepicker({
        numberOfMonths: 2, minDate: 0, maxDate: "+12m",
        dateFormat: "D,dd,M,yy",
        onSelect: function () {
            var date1 = new Date($("#txtCheckIn").val());
            var date2 = new Date($("#txtCheckOut").val());
            var arrdate = $('#txtCheckOut').val().split(',');
            $("#checkoutdayname").html(arrdate[0]);
            $("#checkoutday").html(arrdate[1]);
            $("#checkoutmonth").html(arrdate[2]);
            $("#checkoutyear").html(arrdate[3]);
            $(this).toggleClass('Traveller_but');
            $('#hotel-adult').toggle();
            $("#SpanCheckOutDate").css("display", "none");
            return [true, date1 && (date2 >= date1) ? "dp-highlight" : ""];
        },
        beforeShowDay: function (date) {
            var date1 = new Date($("#txtCheckIn").val());
            var date2 = new Date($("#txtCheckOut").val());
            return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
        },
    });

    $('#hotelDestination').autocomplete({
        minLength: 3,
        source: function (request, response) {
            var searchText = document.getElementById('hotelDestination').value.replace(/[^\w\s]/gi, '');
            searchText_Old = searchText;
            $('#hotelDestination').addClass('HotelAutosearchLoader');
            $.ajax({
                type: "POST",
                contentType: "application/json;",
                url: HostedDomainCarHotel + "/Hotel/GetAutoSuggestionForHotel",
                data: "{search_:'" + searchText + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var jsonData = JSON.parse(result);
                    response(jsonData);
                    $('#hotelDestination').removeClass('HotelAutosearchLoader');
                },
                error: function (result) {
                    $('#hotelDestination').removeClass('HotelAutosearchLoader');

                }
            });
        },
        focus: function (event, ui) {
            //$("#Destination").val(ui.item.label);
            $("#hotelDestination").val(ui.item.label);
            $("#HotelDestinationCityCode").val(ui.item.CityCode);
            $("#DestinationCityName").val(ui.item.CityName);
            $("#DestinationStateCode").val(ui.item.StateCode);
            $("#DestinationCountryCode").val(ui.item.CountryCode);
            $("#CityID_PPN").val(ui.item.CityID_PPN);
            $("#AirportCode").val(ui.item.AirportCode);
            $("#AirportName").val(ui.item.AirportName);
            $("#HotelId").val(ui.item.HotelId);
            $("#HotelName").val(ui.item.HotelName);
            $("#PlaceId").val(ui.item.PlaceId);
            $("#PlaceName").val(ui.item.PlaceName);
            $("#Category").val(ui.item.search_category);
            $("#Spandestination").css("display", "none");
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                $(".ui-autocomplete ").css("display", "none");
            }
            return false;
        },
        blur: function (event, ui) {
            //$("#Destination").val(ui.item.label);
            $("#hotelDestination").val(ui.item.label);
            $("#HotelDestinationCityCode").val(ui.item.CityCode);
            $("#DestinationCityName").val(ui.item.CityName);
            $("#DestinationStateCode").val(ui.item.StateCode);
            $("#DestinationCountryCode").val(ui.item.CountryCode);
            $("#CityID_PPN").val(ui.item.CityID_PPN);
            $("#AirportCode").val(ui.item.AirportCode);
            $("#AirportName").val(ui.item.AirportName);
            $("#HotelId").val(ui.item.HotelId);
            $("#HotelName").val(ui.item.HotelName);
            $("#PlaceId").val(ui.item.PlaceId);
            $("#PlaceName").val(ui.item.PlaceName);
            $("#Category").val(ui.item.search_category);
            $("#Spandestination").css("display", "none");
            $(".ui-autocomplete ").css("display", "none");

            return false;
        },
        select: function (event, ui) {
            //$("#Destination").val(ui.item.label);
            $("#hotelDestination").val(ui.item.label);
            $("#HotelDestinationCityCode").val(ui.item.CityCode);
            $("#DestinationCityName").val(ui.item.CityName);
            $("#DestinationStateCode").val(ui.item.StateCode);
            $("#DestinationCountryCode").val(ui.item.CountryCode);
            $("#CityID_PPN").val(ui.item.CityID_PPN);
            $("#AirportCode").val(ui.item.AirportCode);
            $("#AirportName").val(ui.item.AirportName);
            $("#HotelId").val(ui.item.HotelId);
            $("#HotelName").val(ui.item.HotelName);
            $("#PlaceId").val(ui.item.PlaceId);
            $("#PlaceName").val(ui.item.PlaceName);
            $("#Category").val(ui.item.search_category);
            $("#Spandestination").css("display", "none");
            $(".ui-autocomplete ").css("display", "none");

            return false;
        }
    }).focus(function () {
        $(this).autocomplete("search");
    })
        .autocomplete('instance')._renderMenu = customRenderMenu;

    $('#HotelName').autocomplete({
        //autoFocus: true,
        minLength: 2,
        source: function (request, response) {

            var searchText = document.getElementById('HotelName').value.replace(/[^\w\s]/gi, '');
            var city = document.getElementById('HotelDestinationCityCode').value;
            var cityName = document.getElementById('DestinationCityName').value;
            var state = document.getElementById('DestinationStateCode').value;
            var country = document.getElementById('DestinationCountryCode').value;
            $.ajax({
                type: "POST",
                contentType: "application/json;",
                async: false,
                url: HostedDomainCarHotel + "/Hotel/GetAutoSuggestionForHotelName",
                data: JSON.stringify({ search_: searchText, city: city, cityName: cityName, state: state, country: country }),
                //data: "{search_:'" + searchText + "'}",
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
        focus: function (event, ui) {
            $("#HotelName").val(ui.item.HotelName);
            return false;
        },
        blur: function (event, ui) {
            $("#HotelName").val(ui.item.HotelName);
            return false;
        },
        select: function (event, ui) {
            $("#HotelName").val(ui.item.HotelName);
            return false;
        }
    }).autocomplete("instance")._renderItem = function (ul, response) {
        return $("<li>")
            .append(response.HotelName)
            .appendTo(ul);
    };


    var lastDestination = '';
    var lastDestinationCity = '';
    var lastDestinationStateCode = '';
    var lastDestinationCountryCode = '';
    var lastPreferredAirline = '';
    var lastPreferredAirlineCode = '';
    var lastCityCode = '';
    var lastCityID_PPN = '';

    $("#hotelDestination").change(function () {
        if (lastDestination == $("#hotelDestination").val()) {
            $("#DestinationCityName").val(lastDestinationCity);
            $("#DestinationStateCode").val(lastDestinationStateCode);
            $("#DestinationCountryCode").val(lastDestinationCountryCode);
            $("#DestinationCityCode").val(lastCityCode);
            $("#CityID_PPN").val(lastCityID_PPN);
        }
    });
    $("#BindPreferedairlines").change(function () {
        if (lastPreferredAirline == $("#BindPreferedairlines").val()) {
            $("#PreferedairlinesCode").val(lastPreferredAirlineCode);
        } else {
            $("#PreferedairlinesCode").val("");
        }
    });
    $(document).on('touchstart click', function (e) {
        //
        if (!$(e.target).is('#HotelNumberofTraveler *') && !$(e.target).is('#hotel-adult *'))
            $('#hotel-adult').hide();
    });

    $('#HotelNumberofTraveler').on('click', function () {
        $(this).toggleClass('Traveller_but');
        $('#hotel-adult').toggle();
        return false;
    });


    $("#frmhotelSearch").submit(function () {
        var totaladultcount = 0;
        var totalchildcount = 0;
        var totaltraveller = 0;
        // var childAges = 0;
        var stringbuilder = "";
        var NoOfRooms = $("#dropdwn").val();
        for (var i = 0; i < NoOfRooms; i++) {
            var Adultcount = $("#Adult_" + (i + 1) + "").val();
            var Childcount = $("#Child_" + (i + 1) + "").val();
            totaladultcount += parseInt(Adultcount);
            totalchildcount += parseInt(Childcount);
            if (parseInt(Childcount) > 0) {
                var childAges = 0;
                for (var t = 0; t < Childcount; t++) {
                    var ChildAge = $("#ChildSub_" + (i + 1) + "" + (t + 1) + "").val();
                    childAges += ChildAge + ",";
                }
                stringbuilder += "RoomCount" + (i + 1) + "Adult" + "=" + Adultcount + "-" + "Child" + "=" + Childcount + "-" + "Age" + "," + childAges + "|";
                $('#HotelChildAges').val(stringbuilder);
            }
            else {
                stringbuilder += "RoomCount" + (i + 1) + "Adult" + "=" + Adultcount + "-" + "Child" + "=" + Childcount + "-" + "|";
                $('#HotelChildAges').val(stringbuilder);

            }
            $('#HotelAdultCount').val(parseInt(totaladultcount));
            $('#HotelChildCount').val(parseInt(totalchildcount));


            if (parseInt(NoOfRooms) >= 1) {
                totaltraveller = parseInt(totaladultcount) + parseInt(totalchildcount);
                $('#NumberofRooms').val(parseInt(NoOfRooms));
                $('#HotelNumberofTraveler').val(NoOfRooms + ' Room ' + totaltraveller + ' Guests');
            } else {
                $('#NumberofRooms').val(parseInt(NoOfRooms));
                $('#HotelNumberofTraveler').val('1 Room ' + totaltraveller + ' ' + 'Guests');
            }
        }
    });


    // This button will decrement the value till 0 

    $('.close-panel-flight-new').click(function (e) {
        $('.passenger-count').hide();
    });

    $('.close-panel-flight').click(function () {
        $('#hideshow').val(1);
        $('#AdultCount').val(1);
        $('#TotalChildCount').val(0);
        $('.remove-child').remove();
        $("#btnAdultIncrease").removeAttr("disabled");
        $("#btnchildIncrease").removeAttr("disabled");
        $('.passenger-count').hide();
    });
    $('.close-panel').click(function () {
        $('#roomAdd').val(0);
        $("#SpanPopupChildAgeValidation").html('');
        $("#SpanPopupChildAgeValidation").hide();

        $('#HotelAdultCount').val(1);
        $('#HotelChildCount').val(0);
        $('#HotelChildAges').val("");
        $('#NumberofRooms').val(1);
        $('#HotelNumberofTraveler').val('1 Room 1 Guest');
        $('#roomAdd option:first').text('1 ROOM, 1 ADULT, 0 CHILD');
        appendRooms();
        $('.roomD').hide();

    });


    $(".flight-type-icon").on('click', function () {
        if ($('#Origin').val() != "" && $('#Destination').val() != "") {
            var destination = $("#Destination").val();
            var destinationCode = $("#DestinationCode").val();
            var DestinationCityCode = $("#DestinationCityCode").val();
            var DestinationCountryCode = $("#DestinationCountryCode").val();
            var subLocDestinationCode = $("#subLocDestination").val();

            $("#Destination").val($('#Origin').val());
            $("#DestinationCode").val($("#OriginCode").val());
            $("#DestinationCityCode").val($("#OriginCityCode").val());
            $("#DestinationCountryCode").val($("#OriginCountryCode").val());
            $("#subLocDestination").val($("#subLocOrigin").val());

            $("#Origin").val(destination);
            $("#OriginCode").val(destinationCode);
            $("#OriginCityCode").val(DestinationCityCode);
            $("#OriginCountryCode").val(DestinationCountryCode);
            $("#subLocOrigin").val(subLocDestinationCode);

        }
    });


    $(".clear-input").click(function () {
        $("#Origin").val('');
        $("#subLocOrigin").val('');
        $(".clear-input").hide();
        $("#OriginCountryCode").val('');
        $("#Origin").focus();
    });
    $('#Origin').keyup(function () {

        // If value is not empty
        if ($(this).val() == '') {
            // Hide the element
            $("#subLocOrigin").val('');
            $('.clear-input').hide();
        } else {
            // Otherwise show it
            $('.clear-input').show();
        }
    }).keyup();
    $(".clear-input-des").click(function () {
        $("#Destination").val('');
        $("#subLocDestination").val('');
        $(".clear-input-des").hide();
        $("#Destination").focus();
    });
    $('#Destination').keyup(function () {

        // If value is not empty
        if ($(this).val() == '') {
            // Hide the element
            $("#subLocDestination").val('');
            $('.clear-input-des').hide();
        } else {
            // Otherwise show it
            $('.clear-input-des').show();
        }
    }).keyup();
    $(".clear-input-kar").click(function () {
        $("#PickUpLocation").val('');
        $("#sub_pickupL").val('');
        $(".clear-input-kar").hide();
    });
    $('#PickUpLocation').keyup(function () {

        // If value is not empty
        if ($(this).val() == '') {
            // Hide the element
            $("#sub_pickupL").val('');
            $('.clear-input-kar').hide();
        } else {
            // Otherwise show it
            $('.clear-input-kar').show();
        }
    }).keyup();
    $(".clear-input-kar-drop").click(function () {
        $("#DropLocation").val('');
        $("#sub_dropL").val('');
        $(".clear-input-kar-drop").hide();
    });
    $('#DropLocation').keyup(function () {

        // If value is not empty
        if ($(this).val() == '') {
            // Hide the element
            $("#sub_dropL").val('');
            $('.clear-input-kar-drop').hide();
        } else {
            // Otherwise show it
            $('.clear-input-kar-drop').show();
        }
    }).keyup();
    $(".clear-input-htl").click(function () {
        $("#hotelDestination").val('');

        $(".clear-input-htl").hide();
    });
    $('#hotelDestination').keyup(function () {

        // If value is not empty
        if ($(this).val() == '') {
            // Hide the element

            $('.clear-input-htl').hide();
        } else {
            // Otherwise show it
            $('.clear-input-htl').show();
        }
    }).keyup();


    $('#roomAdd').bind('change', function (e) {
        if ($('#roomAdd').val() == '0') {

            $('.roomD').hide();
        }
        else if (parseInt($('#roomAdd').val()) > 0) {
            appendRooms();
            $('.roomD').show();
        }
    }).trigger('change');
});

$(document).on('click', '.qtyminushoteladult', function (e) {
    // remove row on decrease
    if ($('#dvSearchUser > div.row-mbar').length > 1) {
        $('#dvSearchUser > div.row-mbar').last().remove();
    }

    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    fieldName = $(this).attr('field');
    // Get its current value
    var currentVal = parseInt($('input[name=' + fieldName + ']').val());
    // If it isn't undefined or its greater than 0
    if (!isNaN(currentVal) && currentVal > 1) {
        // Decrement one
        $('input[name=' + fieldName + ']').val(currentVal - 1);
    } else {
        // Otherwise put a 0 there
        $('input[name=' + fieldName + ']').val(1);
    }
});
$(document).on('click', '.qtyplushoteladult', function (e) {
    // Stop acting like a button

    e.preventDefault();
    // Get the field name
    fieldName = $(this).attr('field');
    // Get its current value
    var currentVal = parseInt($('input[name=' + fieldName + ']').val()) == 0 ? 1 : parseInt($('input[name=' + fieldName + ']').val());
    // If is not undefined

    if (!isNaN(currentVal) && currentVal < 4) {
        // Increment
        $('input[name=' + fieldName + ']').val(currentVal + 1);
        $(".btnAdultIncreasehotel").removeAttr("disabled")
    } else {
        // Otherwise put a 0 there
        //$('input[name=' + fieldName + ']').val(1);
        $(".btnAdultIncreasehotel").attr("disabled", "disabled")
    }
});

function OnbackGet() {
    //debugger;
    try {

        var dept = $('#txtCheckIn').val().split(',');
        $("#checkindayname").html(dept[0]);
        $("#checkinday").html(dept[1]);
        $("#checkinmonth").html(dept[2]);
        $("#checkinyear").html(dept[3]);

        var arrdate = $('#txtCheckOut').val().split(',');
        $("#checkoutdayname").html(arrdate[0]);
        $("#checkoutday").html(arrdate[1]);
        $("#checkoutmonth").html(arrdate[2]);
        $("#checkoutyear").html(arrdate[3]);
        $("#SpanCheckinDate").css("display", "none");

        var deptcar = $('#PickUpDate').val().split(',');
        $("#pickupdayname").html(deptcar[0]);
        $("#pickupday").html(deptcar[1]);
        $("#pickupmonth").html(deptcar[2]);
        $("#pickupyear").html(deptcar[3]);


        var arrdatecar = $('#DropDate').val().split(',');
        $("#dropdayname").html(arrdatecar[0]);
        $("#dropday").html(arrdatecar[1]);
        $("#dropmonth").html(arrdatecar[2]);
        $("#dropyear").html(arrdatecar[3]);

    }
    catch (e) {
        //console.log(e);
    }

}

function ValidateSearchhotel(isAjaxcall) {
    var isValid = true;
    var self = this;
    var Destination = $("#hotelDestination").val();

    if ($("#hotelDestination").val() == '') {
        isValid = false;
        $("#Spandestination").css("display", "block")
        $("#Spandestination").html("+ Please provide the Destination");
    }
    else {

        if ($("#hotelDestination").val().length <= 2) {
            isValid = false;
            $("#Spandestination").css("display", "block")
            $("#Spandestination").html("+ Please provide valid Destination");
            return false;
        }

        $.ajax({
            url: HostedDomainCarHotel + '/Hotel/Checkdestination',
            type: "POST",
            cache: false,
            dataType: "json",
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ destination_: Destination }),
            success: function (data) {
                if (data.success == false && data.africaEnabled == true) {
                    $('#blocksearchname_').text(data.location);
                    $('#africaPopUp').modal("show");
                    isValid = false;
                    return isValid;
                }
                else if (data.success == true) {
                    isValid = true;
                    $("#Spandestination").css("display", "none");
                }
                else {
                    $("#Spandestination").css("display", "block");
                    $("#Spandestination").html("+ This is invalid search");
                    isValid = false;
                }
            }
        })
    }

    if ($("#txtCheckIn").val() == "1/1/0001 12:00:00 AM" || $("#txtCheckIn").val() == '') {
        $("#SpanCheckinDate").css("display", "block");
        $("#SpanCheckinDate").html("+ Please provide Check-In Date");
        isValid = false;
    }
    else {
        $("#SpanCheckinDate").css("display", "none");
        $("#SpanCheckinDate").html("");
    }

    if ($("#txtCheckOut").val() == "1/1/0001 12:00:00 AM" || $("#txtCheckOut").val() == '') {
        $("#SpanCheckOutDate").css("display", "block");
        $("#SpanCheckOutDate").html("+ Please provide Check-Out Date");
        isValid = false;
    }
    else {
        $("#SpanCheckOutDate").css("display", "none");
        $("#SpanCheckOutDate").html("");
    }

    isValid = ValidateChildAge(isValid);
    if (isAjaxcall && isValid) {
        SetHotelCookiesData();
        $(".hotel-view").show();
        return PostHotelData();
    }
    else {
        return false;
    }

}

function SetHotelCookie() {
    var HotelSearchDetails = [];
    var NoOfRooms = $('#roomAdd').val();
    NoOfRooms = NoOfRooms == 0 ? 1 : NoOfRooms;
    for (var i = 0; i < NoOfRooms; i++) {
        var Adult = "ddlAdult_" + (i + 1) + "";
        var Child = "ddlChild_" + (i + 1) + "";
        var childAges = "";
        var ChildCount = $("#ddlChild_" + (i + 1) + "").val();
        if ($("#ddlChild_" + (i + 1) + "").val() > 0) {
            for (var t = 0; t < ChildCount; t++) {
                var ChildAge = $("#room_ddlChild_" + (i + 1) + "_" + (t + 1) + "").val();
                childAges += ChildAge + "|";
            }
        }
        HotelSearchDetails.push({
            hotelDestination: $("#hotelDestination").val(),
            txtCheckIn: $("#txtCheckIn").val(),
            txtCheckOut: $("#txtCheckOut").val(),
            dropdwn: NoOfRooms,
            Adult: $("#ddlAdult_" + (i + 1) + "").val(),
            Child: $("#ddlChild_" + (i + 1) + "").val(),
            Childage: childAges

        });
    }
    document.cookie = "HotelSearchDetails" + "=" + encodeURIComponent(JSON.stringify(HotelSearchDetails)) + ";path=/";
}

//function SetHotelCookie() {

//    var CarSearchDetails = [];

//    var NoOfRooms = $('#NumberofRooms').val();
//    if (NoOfRooms == 1) {
//        var childAges = "";
//        var ChildCount = typeof $("#ddlChild_1").val() === "undefined" ? "0" : $("#ddlChild_1").val();
//        if (ChildCount > 0) {
//            for (var t = 0; t < ChildCount; t++) {
//                var ChildAge = $("#room_ddlChild_1_" + (t + 1) + "").val();
//                childAges += ChildAge + "|";
//            }
//        }
//        CarSearchDetails.push({
//            hotelDestination: $("#hotelDestination").val(),
//            txtCheckIn: $("#txtCheckIn").val(),
//            txtCheckOut: $("#txtCheckOut").val(),
//            dropdwn: NoOfRooms,
//            Adult: typeof $("#Adult_1").val() === "undefined" ? "1" : $("#Adult_1").val(),
//            Child: ChildCount,
//            Childage: childAges

//        });
//    }
//    else {

//        for (var i = 0; i < NoOfRooms; i++) {
//            var Adult = "Adult_" + (i + 1) + "";
//            var Child = "ddlChild_" + (i + 1) + "";
//            var childAges = "";
//            var ChildCount = $("#ddlChild_" + (i + 1) + "").val();
//            if ($("#ddlChild_" + (i + 1) + "").val() > 0) {
//                for (var t = 0; t < ChildCount; t++) {
//                    var ChildAge = $("#room_ddlChild_" + (i + 1) + "_" + (t + 1) + "").val();
//                    childAges += ChildAge + "|";
//                }
//            }
//            CarSearchDetails.push({
//                hotelDestination: $("#hotelDestination").val(),
//                txtCheckIn: $("#txtCheckIn").val(),
//                txtCheckOut: $("#txtCheckOut").val(),
//                dropdwn: NoOfRooms,
//                Adult: $("#Adult_" + (i + 1) + "").val(),
//                Child: $("#ddlChild_" + (i + 1) + "").val(),
//                Childage: childAges

//            });

//        }
//    }
//    document.cookie = "HotelSearchDetails" + "=" + JSON.stringify(CarSearchDetails) + ";path=/";
//}
function ValidateChildAge(isValid) {
    var message = '';
    $('select[id^="room_ddlChild_"]').each(function () {
        var ids = this.id.split('_');
        if ($(this).val() == 'Age') {
            message += '+ Please provide the age of child ' + ids[3] + ' of Room ' + ids[2] + '<br>';
        }
    });
    if (message != '') {
        isValid = false;
        $("#SpanPopupChildAgeValidation").html(message);
        $("#SpanPopupChildAgeValidation").show();
        $('.roomD').show();
    }
    else {
        $("#SpanPopupChildAgeValidation").html('');
        $("#SpanPopupChildAgeValidation").hide();
        $('.roomD').hide();
    }
    return isValid;
}


function PostHotelData() {

    var HotelSearchDetails = {};
    HotelSearchDetails.HotelAdultCount = $('#HotelAdultCount').val();
    HotelSearchDetails.HotelChildCount = $('#HotelChildCount').val();
    HotelSearchDetails.NumberofRooms = $('#NumberofRooms').val();
    HotelSearchDetails.HotelChildAges = $('#HotelChildAges').val();
    HotelSearchDetails.HotelNumberofTraveler = $('#HotelNumberofTraveler').val();
    HotelSearchDetails.HotelDestinationCityCode = $('#HotelDestinationCityCode').val();
    HotelSearchDetails.DestinationCityName = $('#DestinationCityName').val();
    HotelSearchDetails.DestinationStateCode = $('#DestinationStateCode').val();
    HotelSearchDetails.DestinationCountryCode = $('#DestinationCountryCode').val();
    HotelSearchDetails.Destination = $('#hotelDestination').val();
    HotelSearchDetails.AirportCode = $('#AirportCode').val();
    HotelSearchDetails.AirportName = $('#AirportName').val();
    HotelSearchDetails.CityID_PPN = $('#CityID_PPN').val();
    HotelSearchDetails.HotelChildAges = $('#HotelChildAges').val();
    if (HotelSearchDetails.HotelChildAges == '') {
        HotelSearchDetails.HotelChildAges = 'RoomCount1Adult=1-Child=0-|';
    }
    HotelSearchDetails.HotelName = '';
    HotelSearchDetails.HotelRating = 0;
    HotelSearchDetails.CheckOutDate = $('#txtCheckOut').val();
    HotelSearchDetails.CheckInDate = $('#txtCheckIn').val();
    HotelSearchDetails.hotelDestination = $('#hotelDestination').val();
    HotelSearchDetails.IsAjaxCall = true;
    HotelSearchDetails.UTMSource = $('#UTMSource').val();
    HotelSearchDetails.UTMMedium = $('#UTMMedium').val();
    HotelSearchDetails.UTMCampaign = $('#UTMCampaign').val();


    $.ajax({
        type: "POST",
        dataType: "json",
        url: HostedDomainCarHotel + '/hotel/home',// HostedDomainCarHotel+'/Hotel/Home',
        aysc: false,
        data: JSON.stringify(HotelSearchDetails),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            window.location.href = HostedDomainCarHotel + "/Hotel/InterMediatePage?User=" + result.guid + '&Mode=hotel';
        },
        error: function (result) {

            //  console.log(result);
        }
    });

}

function UpdateHotelRoomTravellerInfo() {

    var NoOfRooms = $("#roomAdd").val() == '0' ? '1' : $("#roomAdd").val();
    var totaladultcount = 0;
    var totalchildcount = 0;
    var totaltraveller = 0;
    var stringbuilder = "";
    for (var i = 1; i <= NoOfRooms; i++) {
        var Adultcount = $("#Adult_" + i + "").val();
        var Childcount = $("#ddlChild_" + i + "").val();

        totaladultcount += parseInt(Adultcount);
        totalchildcount += parseInt(Childcount);
        if (parseInt(Childcount) > 0) {
            var childAges = 0;
            for (var t = 0; t < Childcount; t++) {
                var ChildAge = $("#room_ddlChild_" + i + "_" + (t + 1) + "").val();
                childAges += ChildAge + ",";
            }
            stringbuilder += "RoomCount" + (i + 1) + "Adult" + "=" + Adultcount + "-" + "Child" + "=" + Childcount + "-" + "Age" + "," + childAges + "|";
            $('#HotelChildAges').val(stringbuilder);
        }
        else {
            stringbuilder += "RoomCount" + (i + 1) + "Adult" + "=" + Adultcount + "-" + "Child" + "=" + Childcount + "-" + "|";
            $('#HotelChildAges').val(stringbuilder);

        }
    }
    $('#HotelAdultCount').val(parseInt(totaladultcount));
    $('#HotelChildCount').val(parseInt(totalchildcount));


    if (parseInt(NoOfRooms) >= 1) {
        totaltraveller = parseInt(totaladultcount) + parseInt(totalchildcount);
        $('#NumberofRooms').val(parseInt(NoOfRooms));
        $('#HotelNumberofTraveler').val(NoOfRooms + ' Rooms ' + totaltraveller + ' Guests');
    } else {
        $('#NumberofRooms').val(parseInt(NoOfRooms));
        $('#HotelNumberofTraveler').val('1 Room ' + totaltraveller + ' ' + 'Guest');
    }

    if (ValidateChildAge(true)) {
        var strCountDDL = (NoOfRooms > 1 ? NoOfRooms + " ROOMS" : NoOfRooms + " ROOM") + ", ";
        strCountDDL += (totaladultcount > 1 ? totaladultcount + " ADULTS" : totaladultcount + " ADULT") + ", ";
        strCountDDL += totalchildcount > 1 ? totalchildcount + " CHILDREN" : totalchildcount + " CHILD";
        $('#roomAdd').val(0);
        $('#roomAdd option:first').text(strCountDDL);
        $('.roomD').hide();
    }
    else {
        return false;
    }


}

function appendRooms() {

    var roomCount = parseInt($('#roomAdd').val());
    if (roomCount >= 0) {
        var prevRoomsCount = $('div[id^="rowRoomId_"]').length;
        if (prevRoomsCount < roomCount) {
            for (var i = (prevRoomsCount + 1); i <= roomCount; i++) {
                $('#roomsPanel').append(RoomOperation(i));
            }
        }
        else {
            if (prevRoomsCount > roomCount) {
                for (var i = prevRoomsCount; i > roomCount; i--) {
                    $('#rowRoomId_' + i).remove();
                }
            }
        }
    }
}

function RoomOperation(i) {
    var strhtml = '';
    strhtml += '<div  id="rowRoomId_' + i + '">';
    strhtml += '<div class="row roomDtls" >';
    strhtml += '<div class="col-md-4 col-xs-4 room-append text-center">	';
    strhtml += '		<p class="roomNo font-18">Room ' + i + '</p> ';
    strhtml += '	</div>';
    strhtml += '	<div class="col-md-4 col-xs-4 padLeft0">  ';
    strhtml += ' <p class="text-center"> <span class="head-append">Adult</span> <br> <span class="font12">10 years old & above</span></p>';
    strhtml += '    <form id="myforms' + i + '" method="POST" action="#" class="numbo marb0 add-form">';
    strhtml += '		<input type="button" value="&#x2212;" class="qtyminushoteladult" field="quantity' + i + '" style="font-weight: bold;">';
    strhtml += '		<input type="text" name="quantity' + i + '" value="1" class="qty  form-control" readonly id="Adult_' + i + '">';
    strhtml += '		<input   type="button" value="&#x2b;" class="qtyplushoteladult " field="quantity' + i + '" style="font-weight: bold;">';
    strhtml += '	</form>';
    strhtml += '	</div>';
    strhtml += '	<div class="col-md-4 col-xs-4">';
    strhtml += ' <p class="text-center"><span class="head-append">Child</span> <br> <span class="font12">2 to 9 years old </span></p>';
    strhtml += '    <form id="myformschild' + i + '" method="POST" action="#" class="numbo marb0 add-form">';
    strhtml += '		<input type="button" value="&#x2212;" class="qtyminushotel" onclick="DisplayChildAges(this)" id="btnchild-cntMinus_' + i + '" field="child-cnt' + i + '" style="font-weight: bold;">';
    strhtml += '		<input type="text" name="child-cnt' + i + '" value="0" class="qty  form-control" id="ddlChild_' + i + '" data-val="true" readonly>';
    strhtml += '		<input   type="button" value="&#x2b;" class="qtyplushotel" onclick="DisplayChildAges(this)" id="btnchild-cnt_' + i + '" field="child-cnt' + i + '" style="font-weight: bold;">';
    strhtml += '	</form>';
    strhtml += '	</div>';
    strhtml += '	</div>';
    strhtml += '	<div class="row">';
    strhtml += '	<div class="col-md-4 col-xs-4">';
    strhtml += '	</div>';
    strhtml += '	<div id="ChildAgePanel_' + i + '" class="col-md-8 col-xs-8 ch2 child-age-block margin-custom-child" style="display: none;"> ';
    strhtml += '	</div>';
    strhtml += '</div>';
    strhtml += '</div>';

    return strhtml;
}

function DisplayChildAges(ctrl) {
    var ddlChildID = ctrl.id;
    var childIndex = ctrl.id.split('_')[1];
    var cnt = parseInt($('select[id^="room_ddlChild_' + childIndex + '_"]').length);
    // var cnt = parseInt($('#ddlChild_' + childIndex).val());
    if ($('#' + ddlChildID).hasClass('qtyminushotel')) {
        if (cnt > 0) {
            $('#room_child_' + childIndex + '_' + cnt).remove();
            cnt = cnt - 1;
        }
        $('#ddlChild_' + childIndex).val(cnt)
        //$('#ChildAgePanel_' + childIndex).children('.childAge').last().remove();

    }
    else {
        if (cnt < 4)
            cnt = cnt + 1;
        $('#ddlChild_' + childIndex).val(cnt)
    }

    if ($('#ddlChild_' + childIndex).val() == "0") {
        $('#ChildAgePanel_' + childIndex).hide();
    }
    else {
        $('#ChildAgePanel_' + childIndex).show();
        appendChildAge(childIndex);
    }

    if ($('#roomsPanel')[0].scrollHeight > 350) {
        var roomCont = parseInt($('div[id^="rowRoomId_"]').length);
        if (childIndex == roomCont)
            $('#roomsPanel').animate({ scrollTop: $('#roomsPanel')[0].scrollHeight }, 100);
        //alert('scroll to bottom')
    }
}

function appendChildAge(index) {
    var childsCount = parseInt($('#ddlChild_' + index).val());
    var childDisplayedCount = parseInt($('select[id^="room_ddlChild_' + index + '_"]').length);
    if ((childsCount - childDisplayedCount) > 0) {
        var strHtml = '';
        for (var i = (childDisplayedCount + 1); i <= childsCount; i++) {
            strHtml += '<div id="room_child_' + index + '_' + i + '" class="col-md-3 col-xs-3 childAge text-center">';
            strHtml += '     <p class="marb0 "><small>Child ' + i + '</small></p>';
            strHtml += '    <select id="room_ddlChild_' + index + '_' + i + '" class="form-control child-age">';
            strHtml += '         <option>Age </option>    ';
            strHtml += '         <option>1 </option>    ';
            strHtml += '         <option>2 </option>    ';
            strHtml += '         <option>3 </option>    ';
            strHtml += '         <option>4 </option>    ';
            strHtml += '         <option>5 </option>    ';
            strHtml += '         <option>6 </option>    ';
            strHtml += '         <option>7 </option>    ';
            strHtml += '         <option>8 </option>    ';
            strHtml += '         <option>9 </option>    ';
            strHtml += '     </select>';
            strHtml += '</div>';
        }
        $('#ChildAgePanel_' + index).append(strHtml);
    }
}



//#endregion Hotel

//////////////////////////////////////////////////////////////      CAR  REGION -START           ///////////////////////////////////////////////////////////////////////////////
//#region Car


$(document).ready(function () {

    // Switch toggle
    $('.switch-car').click(function () {
        $(this).toggleClass('On').toggleClass('Off');
        $("#hide-round-car").toggleClass("hide-car");
        $('.tripDrops').toggleClass("clor-light");

    });


    $('#PickUpLocation').autocomplete({
        autoFocus: true,
        minLength: 3,
        source: function (request, response) {

            var searchText = document.getElementById('PickUpLocation').value.replace(/[^\w\s]/gi, '');
            $.ajax({
                type: "POST",
                contentType: "application/json;",
                url: "/Flight/GetAutoSuggestionForUser",
                data: "{search_:'" + $.trim(searchText) + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var jsonData = JSON.parse(result);
                    response(jsonData);
                },
                error: function (result) {
                    //  console.log(result);
                }
            });
        },
        focus: function (event, ui) {
            $("#PickUpLocation").val(document.getElementById('PickUpLocation').value);
            $("#hfPickUpLocation").val(ui.item.autosuggest);
            $("#OriginCode").val(ui.item.AirportCode);
            $("#OriginCityCode").val(ui.item.CityCode);
            lastOrigin = ui.item.autosuggest;
            lastOriginCode = ui.item.AirportCode;
            lastOriginCityCode = ui.item.CityCode;
            return false;
        },
        blur: function (event, ui) {
            $("#PickUpLocation").val(ui.item.autosuggest);
            $("#hfPickUpLocation").val(ui.item.autosuggest);
            $("#OriginCode").val(ui.item.AirportCode);
            $("#OriginCityCode").val(ui.item.CityCode);

            lastOrigin = ui.item.autosuggest;
            lastOriginCode = ui.item.AirportCode;
            lastOriginCityCode = ui.item.CityCode;
            return false;
        },
        select: function (event, ui) {
            $("#PickUpLocation").val(ui.item.autosuggest);
            $("#OriginCode").val(ui.item.AirportCode);
            $("#OriginCityCode").val(ui.item.CityCode);
            $("#hfPickUpLocation").val(ui.item.autosuggest);
            var pickupL = $('#PickUpLocation').val().split(',');
            $("#PickUpLocation").val(ui.item.AirportCode);
            var pickupcityDetails = pickupL[1] + ',' + pickupL[2];
            $('#sub_pickupL').val(pickupcityDetails);


            lastOrigin = ui.item.autosuggest;
            lastOriginCode = ui.item.AirportCode;
            lastOriginCityCode = ui.item.CityCode;
            return false;
        }
    })
        .autocomplete("instance")._renderItem = function (ul, response) {
            return $("<li class='karlist mfsIcon-map-marker'>")
                .append(response.autosuggest)
                .appendTo(ul);
        };

    $('#DropLocation').autocomplete({
        autoFocus: true,
        minLength: 3,
        source: function (request, response) {
            var searchText = document.getElementById('DropLocation').value.replace(/[^\w\s]/gi, '');
            $.ajax({
                type: "POST",
                contentType: "application/json;",
                async: false,
                url: "/Flight/GetAutoSuggestionForUser",
                data: "{search_:'" + $.trim(searchText) + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var jsonData = JSON.parse(result);
                    response(jsonData);
                },
                error: function (result) {
                    //  console.log(result);
                }
            });
        },
        focus: function (event, ui) {
            $("#DropLocation").val(document.getElementById('DropLocation').value);
            $("#DestinationCode").val(ui.item.AirportCode);
            $("#DestinationCityCode").val(ui.item.CityCode);
            $("#hfDropOffLocation").val(ui.item.autosuggest);
            lastDestination = ui.item.autosuggest;
            lastDestinationCode = ui.item.AirportCode;
            lastDestinationCityCode = ui.item.CityCode;
            // $('#txtDepartual').focus();
            return false;
        },
        blur: function (event, ui) {
            $("#DropLocation").val(ui.item.autosuggest);
            $("#DestinationCode").val(ui.item.AirportCode);
            $("#DestinationCityCode").val(ui.item.CityCode);
            $("#hfDropOffLocation").val(ui.item.autosuggest);
            lastDestination = ui.item.autosuggest;
            lastDestinationCode = ui.item.AirportCode;
            lastDestinationCityCode = ui.item.CityCode;
            //$('#txtDepartual').focus();
            return false;
        },
        select: function (event, ui) {
            $("#DropLocation").val(ui.item.autosuggest);
            $("#DestinationCode").val(ui.item.AirportCode);
            $("#DestinationCityCode").val(ui.item.CityCode);
            $("#hfDropOffLocation").val(ui.item.autosuggest);
            var dropL = $('#DropLocation').val().split(',');
            $("#DropLocation").val(ui.item.AirportCode);
            var dropcityDetails = dropL[1] + ',' + dropL[2];
            $('#sub_dropL').val(dropcityDetails);

            lastDestination = ui.item.autosuggest;
            lastDestinationCode = ui.item.AirportCode;
            lastDestinationCityCode = ui.item.CityCode;
            return false;
        }
    }).autocomplete("instance")._renderItem = function (ul, response) {
        return $("<li class='karlist mfsIcon-map-marker'>")
            .append(response.autosuggest)
            .appendTo(ul);
    };


    $("#PickUpDate").datepicker({
        numberOfMonths: 2, minDate: 0, dateFormat: "D,dd,M,yy", maxDate: "+12m",
        onSelect: function (selectedDate) {
            var date3 = new Date($('#PickUpDate').val());
            date3.setDate(date3.getDate() + 0);
            $("#DropDate").datepicker("option", "minDate", date3);
            var dept = $('#PickUpDate').val().split(',');
            $("#pickupdayname").html(dept[0]);
            $("#pickupday").html(dept[1]);
            $("#pickupmonth").html(dept[2]);
            $("#pickupyear").html(dept[3]);
            setTimeout(function () {
                //console.log($('#RoundMultiOnewayTrip').val());
                $("#DropDate").datepicker('show');
            }, 10);
            var arrdate = $('#DropDate').val().split(',');
            $("#dropdayname").html(arrdate[0]);
            $("#dropday").html(arrdate[1]);
            $("#dropmonth").html(arrdate[2]);
            $("#dropyear").html(arrdate[3]);

            var date1 = new Date($("#PickUpDate").val());
            var date2 = new Date($("#DropDate").val());
            BindDropTime();
        },
        beforeShowDay: function (date) {
            var date1 = new Date($("#PickUpDate").val());
            var date2 = new Date($("#DropDate").val());
            return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
        },
    });
    $("#DropDate").datepicker({
        numberOfMonths: 2, minDate: 0, maxDate: "+12m",
        dateFormat: "D,dd,M,yy",
        onSelect: function () {
            var date1 = new Date($("#PickUpDate").val());
            var date2 = new Date($("#DropDate").val());
            var arrdate = $('#DropDate').val().split(',');
            $("#dropdayname").html(arrdate[0]);
            $("#dropday").html(arrdate[1]);
            $("#dropmonth").html(arrdate[2]);
            $("#dropyear").html(arrdate[3]);
            BindDropTime();
            return [true, date1 && (date2 >= date1) ? "dp-highlight" : ""];
        },
        beforeShowDay: function (date) {
            var date1 = new Date($("#PickUpDate").val());
            var date2 = new Date($("#DropDate").val());
            return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
        },
    });
});

function ValidateCarForm(isAjaxCarCall) {

    $("#mainErrorCover").css("display", "block");
    var isValid = true;
    if ($("#PickUpLocation").val() == "") {
        $("#spnPickUpLocation").css("display", "block");
        $("#spnPickUpLocation").html("+ Please provide PickUp Location.");
        isValid = false;
    }
    else if ($("#PickUpLocation").val().length < 3) {
        $("#spnPickUpLocation").css("display", "block");
        $("#spnPickUpLocation").html("+ The field PickUp Location must be a string with a minimum length of 3 and a maximum length of 100.");
        isValid = false;
    }

    else {
        $("#spnPickUpLocation").css("display", "none");
        $("#spnPickUpLocation").html("");
    }
    if ($("#DropLocation").val() == "") {
        $("#spnDropLocation").css("display", "block");
        $("#spnDropLocation").html("+ Please provide Drop Location");
        isValid = false;
    }
    else if ($("#DropLocation").val().length < 3) {
        $("#spnDropLocation").css("display", "block");
        $("#spnDropLocation").html("+ The field Dropoff Location must be a string with a minimum length of 3 and a maximum length of 100.");
        isValid = false;
    }
    else {
        $("#spnDropLocation").css("display", "none");
        $("#spnDropLocation").html("");
    }

    var carflag = $("#hide-round-car").hasClass("hide-car");
    switch (carflag) {
        case false:
            if ($("#DropLocation").val() == "") {
                $("#spnDropLocation").css("display", "block");
                $("#spnDropLocation").html("+ Please provide Drop Location");
                isValid = false;
            }
            break;
        case true:
            $("#spnDropLocation").css("display", "none");
            $("#spnDropLocation").html("");
            isValid = true;

    }

    if ($("#PickUpDate").val() == "") {
        $("#spnPickUpDate").css("display", "block");
        $("#spnPickUpDate").html("+ Please provide Pickup Date");
        isValid = false;
    }
    else {
        $("#spnPickUpDate").css("display", "none");
        $("#spnPickUpDate").html("");
    }

    if ($("#PickUpTime").val() == "") {
        $("#spnPickUpTime").css("display", "block");
        $("#spnPickUpTime").html("+ Please provide Pickup Time");
        isValid = false;
    }
    else {
        $("#spnPickUpTime").css("display", "none");
        $("#spnPickUpTime").html("");
    }
    if ($("#DropDate").val() == "") {
        $("#spnDropDate").css("display", "block");
        $("#spnDropDate").html("+ Please provide Drop Date");
        isValid = false;
    }
    else {
        $("#spnDropDate").css("display", "none");
        $("#spnDropDate").html("");
    }

    if ($("#DropTime").val() == "") {
        $("#spnDropTime").css("display", "block");
        $("#spnDropTime").html("+ Please provide Drop Time");
        isValid = false;
    }
    else {
        $("#spnDropTime").css("display", "none");
        $("#spnDropTime").html("");
    }
    if ($("#hide-round-car").hasClass("hide-car") == true ? $("#PickUpLocation").val() != "" || $("#DropLocation").val() != "" : $("#PickUpLocation").val() != "") {
        var data = { OriginText: $("#PickUpLocation").val(), destinText: $("#DropLocation").val() };
        $.ajax({
            url: HostedDomainCarHotel + '/car/validatepickupanddrop',
            type: "POST",
            cache: false,
            dataType: "json",
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ OriginText: data.OriginText, destinText: data.destinText }),
            success: function (result) {
                if (result.success == false && result.africaEnabled == true) {
                    $('#blocksearchname_').text(result.location);
                    $('#africaPopUp').modal('show');
                    isValid = false;
                    return isValid;
                }
                else if (result.success == false) {
                    $("#spnPickupDropOff").css("display", "block");
                    $("#spnPickupDropOff").html(result.msg);
                    isValid = false;
                }
                else {
                    $("#spnPickupDropOff").css("display", "none");
                    $("#spnPickupDropOff").html("");
                }
            },
            error: function (xhr, status, err) {
                console.log(status);
            }
        });
    }
    else {
        $("#spnPickupDropOff").css("display", "none");
        $("#spnPickupDropOff").html("");
    }
    if (isAjaxCarCall && isValid) {
        $(".kar-views-lod").show();
        SetCarCookiesData();
        return PostCarData();
        //return true;
    }
    else
        return false;
}
//$("#DropTime").bind("focus", function () {

//    BindDropTime();
//});

function BindDropTime() {
    var Pickupdate = document.getElementById("PickUpDate").value;
    var DropDate = document.getElementById("DropDate").value;
    if (Pickupdate == DropDate) {
        $('#DropTime').prop('selectedIndex', 0);
        $("select.DropTime  option[value='" + $(this).data('index') + "']").prop('disabled', false);
        $(this).data('index', this.value);
        //var aa = $(this).nextUntil('index', this.value);
        //alert(aa);
        $("#DropTime  option[value='" + this.value + "']:not([value=''])").prop('disabled', true);
        var drop = $("#PickUpTime option:selected").val();
        var count = 0;

        $("#DropTime > option").each(function () {
            if (this.value < drop) {
                $("#DropTime  option[value='" + this.value + "']:not([value=''])").prop('disabled', true);
            }
            else if (count < 5) {
                count++;
                $("#DropTime  option[value='" + this.value + "']:not([value=''])").prop('disabled', true);

            }
            else {
                $("#DropTime  option[value='" + this.value + "']:not([value=''])").prop('disabled', false);
            }
        });

    }
    else {
        $("#DropTime > option").prop('disabled', false);
    }
}

$('#PickUpTime').change(function () {
    BindDropTime();
});

function DropTimeFocusout() {

    if ($("#PickUpTime").val().trim() == '' || $("#PickUpTime").val().trim() == undefined) {
        $("#DropTime").val("");
    }
}
function PostCarData() {
    var isValid = true;
    // if ($("#hide-round-car").hasClass("hide-car") == true ? $("#PickUpLocation").val() != "" || $("#DropLocation").val() != "" : $("#PickUpLocation").val() != "") {
    // var data = { OriginText: $("#PickUpLocation").val(), destinText: $("#DropLocation").val() };
    // $.ajax({
    // url: HostedDomainCarHotel + '/Car/ValidatePickupAndDrop', type: 'POST', data: JSON.stringify(data), contentType: 'application/json', async: false,
    // success: function (result) {
    // if (result.success == false) {
    // $("#spnPickupDropOff").css("display", "block");
    // $("#spnPickupDropOff").html(result.msg);
    // isValid = false;
    // }
    // else {
    // $("#spnPickupDropOff").css("display", "none");
    // $("#spnPickupDropOff").html("");
    // }
    // }
    // });
    // }
    // else {
    // $("#spnPickupDropOff").css("display", "none");
    // $("#spnPickupDropOff").html("");
    // }

    if (isValid) {
        var CarSearchModel = {};
        CarSearchModel.PickUpLocation = ($('#hfPickUpLocation').val() == null || $('#hfPickUpLocation').val() == "" ? $("#PickUpLocation").val() : $('#hfPickUpLocation').val());
        CarSearchModel.DropLocation = ($('#hfDropOffLocation').val() == null || $('#hfDropOffLocation').val() == "" ? $("#DropLocation").val() : $('#hfDropOffLocation').val());
        CarSearchModel.PickUpDate = $('#PickUpDate').val();
        CarSearchModel.DropDate = $('#DropDate').val();
        CarSearchModel.PickUpTime = $('#PickUpTime').val();
        CarSearchModel.DropTime = $('#DropTime').val();
        CarSearchModel.PickupAirportCode = $('#PickupAirportCode').val();
        CarSearchModel.PickUpCityCode = $('#PickUpCityCode').val();
        CarSearchModel.PickupAirportName = $('#PickupAirportName').val();
        CarSearchModel.DropAirportCode = $('#DropAirportCode').val();
        CarSearchModel.DropCityCode = $('#DropCityCode').val();
        CarSearchModel.DropCityName = $('#DropCityName').val();
        CarSearchModel.UTMSource = $('#UTMSource').val();
        CarSearchModel.UTMMedium = $('#UTMMedium').val();
        CarSearchModel.UTMCampaign = $('#UTMCampaign').val();
        CarSearchModel.IsAjaxCall = true;
        $.ajax({
            type: "POST",
            dataType: "json",
            url: HostedDomainCarHotel + '/car/home',
            data: JSON.stringify(CarSearchModel),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                window.location.href = HostedDomainCarHotel + "/Car/InterMediatePage?id=" + result.guid;
            },
            error: function (result) {
                // console.log(result);
            }
        });
    }
}

function compare_date(d1, d2) {
    var p = parseInt($.datepicker.formatDate('yymmdd', new Date(d2))) - parseInt($.datepicker.formatDate('yymmdd', new Date(d1)));
    if (p > 0) return 1;
    if (p === 0) return 0;
    return -1;
}

//#endregion Car




//region Other mobile

let depSelect = false
function showCalendar(datetype) {
    if (datetype == 'depart') {
        $("#date_picker_range .return").removeClass("active");
        $("#date_picker_range .depart").addClass("active");
        $('#hdndatetype').val('depart');

        //console.log(datetype);
    }
    else if (datetype == 'arrival') {
        if ($("#txtDepart1").val() !== "") {
            $("#date_picker_range .return").addClass("active");
            $("#date_picker_range .depart").removeClass("active");
        } else {
            $("#date_picker_range .return").removeClass("active");
            $("#date_picker_range .depart").addClass("active");
        }
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
    ReloadMobileCalender();
    $('#date_picker_range').modal();
}

function showCalendarhtl(datetype) {
    if (datetype == 'depart') {
        $('#hdndatetypehtl').val('depart');
        //console.log(datetype);
    }
    else if (datetype == 'arrival') {
        $('#hdndatetypehtl').val('arrival');
        $('#date_picker_range_htl #return_span').addClass('active');
    }
    $('#date_picker_range_htl').modal();
}
function showCalendarkar(datetype) {
    if (datetype == 'depart') {
        $('#hdndatetypecar').val('depart');
        //console.log(datetype);
    }
    else if (datetype == 'arrival') {
        $('#hdndatetypecar').val('arrival');
        $('#date_picker_range_kar #return_span').addClass('active');
    }
    $('#date_picker_range_kar').modal();
}
function iOS() {
    return [
        //'iPad Simulator',
        'iPhone Simulator',
        //'iPod Simulator',
        //'iPad',
        'iPhone',
        //'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}
function ReloadMobileCalender() {
    $("#mfstrvlerpicker-flight-mobile").datepicker({
        minDate: 0,
        format: 'M dd,yyyy',
        numberOfMonths: [13, 1],
        maxDate: "+12m",
        beforeShowDay: function (date) {

            if ($("#RoundMultiOnewayTrip").val() == "1" || $("#RoundMultiOnewayTrip").val() == "ONEWAY") {
                var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, iOS()? $("#Departuretemp").val(): $("#txtDepart1").val());
                var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, iOS()? $("#Departuretemp").val(): $("#txtDepart1").val());
            }
            else {
                var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, iOS()? $("#Departuretemp").val() : $("#txtDepart1").val());
                var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, iOS()? $("#Arrivaltemp").val() : $("#txtReturn1").val());
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
            // debugger;
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
                        if (Date.parse($("#txtDepart1").val()) <= Date.parse(dateText))  {
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
                    if (depSelect===false) {
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

jQuery(function ($) {
    $('#arrive-cal').click(function () {
        $('#txtArrival').datepicker('show');
    });
    $('#depart-cal').click(function () {
        $('#txtDepartual').datepicker('show');
    });

    $('#checkin-cal').click(function () {
        $('#txtCheckIn').datepicker('show');
    });
    $('#checkout-cal').click(function () {
        $('#txtCheckOut').datepicker('show');
    });

    $('#pickup-cal').click(function () {
        $('#PickUpDate').datepicker('show');
    });
    $('#drop-cal').click(function () {
        $('#DropDate').datepicker('show');
    });
});

function MobileHotelCalendar() {
    $("#mfstrvlerpicker-hotel-mobile").datepicker({
        minDate: 0,
        format: 'M dd,yyyy',
        numberOfMonths: [13, 1],
        maxDate: "+12m",
        beforeShowDay: function (date) {

            var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#check_in_mobile").val());
            var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#check_out_mobile").val());

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
            var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#check_in_mobile").val());
            var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#check_out_mobile").val());


            if (!date1 || date2) {
                if ($('#hdndatetypehtl').val() == 'depart') {
                    if ((date2 == null || date2 == '' || Date.parse($("#check_out_mobile").val()) >= Date.parse(dateText)) && !date1) {
                        $("#check_in_mobile").val(dateText);
                        $("#txtCheckIn").val(dateText);
                        var dateParams = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#check_in_mobile").val()).toString().split(' ');
                        $('#checkindaymob').text(dateParams[1] + ' ' + dateParams[2]);
                        $('#checkinyearmob').text(dateParams[0] + ' ' + dateParams[3]);
                    }

                    else if ((date2 == null || date2 == '' || Date.parse($("#check_out_mobile").val()) <= Date.parse(dateText))) {
                        $("#check_in_mobile").val(dateText);
                        $("#txtCheckIn").val(dateText);
                        var dateParams = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#check_in_mobile").val()).toString().split(' ');
                        $('#checkindaymob').text(dateParams[1] + ' ' + dateParams[2]);
                        $('#checkinyearmob').text(dateParams[0] + ' ' + dateParams[3]);
                        $("#check_out_mobile").val(dateText);
                        $("#txtCheckOut").val(dateText);
                        if ($("#check_out_mobile").val() == $("#check_in_mobile").val()) {
                            var date6 = new Date($('#check_in_mobile').val());
                            date6.setDate(date6.getDate() + 1);
                            $("#check_out_mobile").val(date6);
                            $("#check_out_mobile").val($.datepicker.formatDate('mm/dd/yy', new Date(date6)));
                            $("#txtCheckOut").val($("#check_out_mobile").val());
                        }
                        var dateParams2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#check_out_mobile").val()).toString().split(' ');
                        $('#checkoutdaymob').text(dateParams2[1] + ' ' + dateParams2[2]);
                        $('#checkoutyearmob').text(dateParams2[0] + ' ' + dateParams2[3]);
                        // $("#mfstrvlerpicker-flight-mobile").datepicker("option", "minDate", selectedDate);
                        $("#date_picker_range_htl").modal("hide");
                    }
                    else {
                        $("#check_in_mobile").val(dateText);
                        $("#txtCheckIn").val(dateText);
                        var dateParams = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#check_in_mobile").val()).toString().split(' ');
                        $('#checkindaymob').text(dateParams[1] + ' ' + dateParams[2]);
                        $('#checkinyearmob').text(dateParams[0] + ' ' + dateParams[3]);
                        $("#date_picker_range_htl").modal("hide");
                    }
                }
                else {
                    if (date1 == null || date1 == '' || Date.parse($("#check_in_mobile").val()) <= Date.parse(dateText) || $.datepicker.parseDate($.datepicker._defaults.dateFormat)) {
                        $("#check_out_mobile").val(dateText);
                        $("#txtCheckOut").val(dateText);
                        if ($("#check_out_mobile").val() == $("#check_in_mobile").val()) {
                            var date6 = new Date($('#check_in_mobile').val());
                            date6.setDate(date6.getDate() + 1);
                            $("#check_out_mobile").val(date6);
                            $("#check_out_mobile").val($.datepicker.formatDate('mm/dd/yy', new Date(date6)));
                            $("#txtCheckOut").val($("#check_out_mobile").val());
                        }
                        var dateParams2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#check_out_mobile").val()).toString().split(' ');
                        $('#checkoutdaymob').text(dateParams2[1] + ' ' + dateParams2[2]);
                        $('#checkoutyearmob').text(dateParams2[0] + ' ' + dateParams2[3]);
                        $("#date_picker_range_htl").modal("hide");
                    }
                    else {
                        //Console.log('msg')
                    }
                }
            }
            else {
                $("#check_out_mobile").val(dateText);
                $("#txtCheckOut").val(dateText);
                if ($("#check_out_mobile").val() == $("#check_in_mobile").val()) {
                    var date6 = new Date($('#check_in_mobile').val());
                    date6.setDate(date6.getDate() + 1);
                    $("#check_out_mobile").val(date6);
                    $("#check_out_mobile").val($.datepicker.formatDate('mm/dd/yy', new Date(date6)));
                    $("#txtCheckOut").val($("#check_out_mobile").val());
                }
                var dateParams2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#check_out_mobile").val()).toString().split(' ');
                $('#checkoutdaymob').text(dateParams2[1] + ' ' + dateParams2[2]);
                $('#checkoutyearmob').text(dateParams2[0] + ' ' + dateParams2[3]);
                if (Date.parse($("#check_in_mobile").val()) > Date.parse($("#check_out_mobile").val())) {
                    //$("#mfstrvlerpicker").datepicker("option", "minDate", selectedDate);
                    $('#xslanding_caldr-htl').show();
                    $("#checkoutdaymob").val("");
                    $("#checkoutyearmob").val("");
                    $("#check_out_mobile").val("");
                }
                else {
                    $("#date_picker_range_htl").modal("hide");
                    $('#xslanding_caldr-htl').hide();
                }
            }
            if ($("#date_picker_range_htl .dp-highlight").length > 1) {
                $("#date_picker_range_htl .return").addClass("active");
            } else {
                // $("#date_picker_range_htl .return").removeClass("active");
            }


        }



    });
}

function MobileCarCalendar() {
    $("#mfstrvlerpicker-car-mobile").datepicker({
        minDate: 0,
        format: 'M dd,yyyy',
        numberOfMonths: [13, 1],
        maxDate: "+12m",
        beforeShowDay: function (date) {

            var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#pickUpDate_mobile").val());
            var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#dropoff_mobile").val());

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
            var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#pickUpDate_mobile").val());
            var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#dropoff_mobile").val());


            if (!date1 || date2) {
                if ($('#hdndatetypecar').val() == 'depart') {
                    if ((date2 == null || date2 == '' || Date.parse($("#dropoff_mobile").val()) >= Date.parse(dateText)) && !date1) {
                        $("#pickUpDate_mobile").val(dateText);
                        $("#PickUpDate").val(dateText);
                        var dateParams = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#pickUpDate_mobile").val()).toString().split(' ');
                        $('#pickupdaymob').text(dateParams[1] + ' ' + dateParams[2]);
                        $('#pickupyearmob').text(dateParams[0] + ' ' + dateParams[3]);
                    }

                    else if ((date2 == null || date2 == '' || Date.parse($("#dropoff_mobile").val()) <= Date.parse(dateText))) {
                        $("#pickUpDate_mobile").val(dateText);
                        $("#PickUpDate").val(dateText);
                        var dateParams = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#pickUpDate_mobile").val()).toString().split(' ');
                        $('#pickupdaymob').text(dateParams[1] + ' ' + dateParams[2]);
                        $('#pickupyearmob').text(dateParams[0] + ' ' + dateParams[3]);
                        $("#dropoff_mobile").val(dateText);
                        $("#DropDate").val(dateText);
                        var dateParams2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#dropoff_mobile").val()).toString().split(' ');
                        $('#dropdaymob').text(dateParams2[1] + ' ' + dateParams2[2]);
                        $('#dropyearmob').text(dateParams2[0] + ' ' + dateParams2[3]);
                        // $("#mfstrvlerpicker-flight-mobile").datepicker("option", "minDate", selectedDate);
                        $("#date_picker_range_kar").modal("hide");
                    }
                    else {
                        $("#pickUpDate_mobile").val(dateText);
                        $("#PickUpDate").val(dateText);
                        var dateParams = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#pickUpDate_mobile").val()).toString().split(' ');
                        $('#pickupdaymob').text(dateParams[1] + ' ' + dateParams[2]);
                        $('#pickupyearmob').text(dateParams[0] + ' ' + dateParams[3]);
                        $("#date_picker_range_kar").modal("hide");
                    }
                }
                else {
                    if (date1 == null || date1 == '' || Date.parse($("#pickUpDate_mobile").val()) <= Date.parse(dateText) || $.datepicker.parseDate($.datepicker._defaults.dateFormat)) {
                        $("#dropoff_mobile").val(dateText);
                        $("#DropDate").val(dateText);
                        var dateParams2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#dropoff_mobile").val()).toString().split(' ');
                        $('#dropdaymob').text(dateParams2[1] + ' ' + dateParams2[2]);
                        $('#dropyearmob').text(dateParams2[0] + ' ' + dateParams2[3]);
                        $("#date_picker_range_kar").modal("hide");
                    }
                    else {
                        //Console.log('msg')
                    }
                }
            }
            else {
                $("#dropoff_mobile").val(dateText);
                $("#DropDate").val(dateText);
                var dateParams2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#dropoff_mobile").val()).toString().split(' ');
                $('#dropdaymob').text(dateParams2[1] + ' ' + dateParams2[2]);
                $('#dropyearmob').text(dateParams2[0] + ' ' + dateParams2[3]);
                if (Date.parse($("#pickUpDate_mobile").val()) > Date.parse($("#dropoff_mobile").val())) {
                    //$("#mfstrvlerpicker").datepicker("option", "minDate", selectedDate);
                    $('#xslanding_caldr-kar').show();
                    $("#dropdaymob").val("");
                    $("#dropyearmob").val("");
                    $("#dropoff_mobile").val("");
                }
                else {
                    $("#date_picker_range_kar").modal("hide");
                    $('#xslanding_caldr-kar').hide();
                }
            }
            if ($("#date_picker_range_kar .dp-highlight").length > 1) {
                $("#date_picker_range_kar .return").addClass("active");
            } else {
                // $("#date_picker_range_kar .return").removeClass("active");
            }

            BindDropTime();
        }



    });
}


function SendNewsLetterEmail(ISUp, ISMobile) {
     debugger;
    if (ISMobile != true) {
        var emailID = ISUp ? $("#txtsubemail").val() : $("#txtsubemail_Down").val();

        var regExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (emailID == "") {
            ISUp ? $('#subcribe-msg').html('<p>Please provide <b>Email Address for subscription.</b></p>') : $('#subcribe-msg_Down').html('<p>Please provide <b>Email Address for subscription.</b></p>');
            return false;
        }

        if (!regExp.test(emailID)) {
            ISUp ? $('#subcribe-msg').html('<p>Please provide valid <b>Email Address.</b></p>') : $('#subcribe-msg_Down').html('<p>Please provide valid <b>Email Address.</b></p>');
            return false;
        }

        //ISUp ? $('#subscribeBtn').text('Registering...') : $('#subscribeBtnDown').text('Registering...');

        jQuery.getJSON("/CallUs/NewsLetterSubscription", { emailId: emailID, source_: 'HomeSubscribe-Email' }, function (data) {
            //$("#txtsubemail").attr("readonly", "readonly");
            ISUp ? $("#txtsubemail").val('') : $("#txtsubemail_Down").val('');

            if (data.Success == true) {
                //$('#subscribeBtn').text('Subscribe');
                //$('#subcribe-msg').html(data.msg);
                ISUp ? $('#subcribe-msg').html('<p class="success-msg"><b>Congratulations!!!</b> You are subscribed for our secret deals.</p>') : $('#subcribe-msg_Down').html('<p><b>Congratulations!!!</b> You are subscribed for our secret deals.</p>');
                //$('#alrdysubscribeBtn').html(data.msg);
                return false;
            }
        });
    }
    else {
        var emailID = $("#txtsubemail_Down-mid").val();
        var regExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (emailID == "") {
            $('#subcribe-msg_Down-mid').html('<p>Please provide <b>Email Address for subscription.</b></p>');
            return false;
        }
        if (!regExp.test(emailID)) {
            $('#subcribe-msg_Down-mid').html('<p>Please provide valid <b>Email Address.</b></p>');
            return false;
        }
        jQuery.getJSON("/Flight/NewsLetterSubscription", { emailId: emailID, source_: 'HomeSubscribe-Email' }, function (data) {
            //$("#txtsubemail").attr("readonly", "readonly");
            $("#txtsubemail_Down-mid").val('');
            alert("successfully");
            if (data.Success == true) {
                //$('#subscribeBtn').text('Subscribe');
                //$('#subcribe-msg').html(data.msg);
                $('#subcribe-msg_Down-mid').html('<p class="success-msg"><b>Congratulations!!!</b> You are subscribed for our secret deals.</p>');
                //$('#alrdysubscribeBtn').html(data.msg);
                return false;
            }
        });
    }

}
//signin
//  log in & register Box 
$('.newLog .logInTXT').click(function () {
    $('.logInBox').toggleClass('hide');
    $('.registerBox').addClass('hide');
});
$('.logInBox').on('click', function (event) {
    event.stopPropagation();
});

$('.newLog .registerTXT').click(function () {
    $('.registerBox').toggleClass('hide');
    $('.logInBox').addClass('hide');
});
$('.registerBox').click(function (event) {
    event.stopPropagation();
});


$(document).on('click', 'body', function () {
    $('.registerBox').addClass('hide');
    $('.logInBox').addClass('hide');
});

//IE9 JS

//$('document').ready(function () {
//    // IE9 placeholder text
//    $('input, textarea').placeholder({ customClass: 'my-placeholder' });

//});
/*
function LoadBlogsData() {
    //MFS Blog Here
    var blogprxy = 'https://cors-anywhere.herokuapp.com/';
    //var blogUrl = 'https://www.myflightsearch.com/blog/feed/';
    $.ajax({
        type: 'GET',
        url: blogprxy + blogUrl,
        dataType: 'xml',
        //"async": true,
        crossDomain: true,
        success: function (xml) {
            var contain = $("#blog-channel");
            var limit = 3;
            $(xml).find('item').each(function (index) {
                if (index < limit) {
                    var title = $(this).find('title').text().substr(0, 60) + '...',
                    url = $(this).find('link').text(),
                    description = $(this).find('description').text(),
                    pubDate = $(this).find('content').text();
                    $(contain).append(
                        '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" id="item-blog"><div class="item"><article class="blog-post">' + description +
                       '<div class="strip stripHeading"><h4>' + '<a href="' + url + '" target="_blank" title="' + title + '">' + title + '</a>' + '</h4>' + '</div></article></div></div>'
                        );
                    return;
                }
            });//end each

        },
        error: function (xml) {
            //console.log("error");
        }

    });
    //end blog
}
*/
// hotel deals
function GoForDeal(control, contractID, EngineType) {
    var hotelSearchModel_ = {
        CheckInDate: $('#' + control).find('.htl__checkInDate').text().toString(),
        CheckOutDate: $('#' + control).find('.htl__checkOutDate').text().toString(),
        Destination: $('#' + control).find('.clsCityCode').text().toString(),
        HotelDestinationCityCode: $('#' + control).find('.clsCityCode').text().toString(),
        HotelName: $('#' + control).find('.clsHotelName').text().toString(),
        HotelAdultCount: 2,
        NumberofRooms: 1,
        HotelNumberofTraveler: $('#' + control).find('.htl__numberofTraveler').text().toString(),
        HotelChildAges: 'RoomCount1Adult=2-Child=0-|',
        Engine: EngineType,
        IsDealSearch: true,
        SessionIdhsd: control,
        UTMSource: $('#UTMSource').val(),
        UTMMedium: $('#UTMMedium').val(),
        UTMCampaign: $('#UTMCampaign').val()
    };

    $.ajax({
        // actual url
        url: HostedDomainCarHotel + "/hotel/SaveJsonSearch",
        dataType: 'text',
        type: 'POST',
        crossDomain: true,
        data: { searchDetails: JSON.stringify(hotelSearchModel_) },
        error: function (err, xhr, error) {
            $('#info').html('<p>An error has occurred</p>');
        },
        success: function () {
            var sessionID = control;
            engineId = EngineType == "Expedia" ? 5 : 10;
            //window.location.href = HostedDomainCarHotel + '/Hotel/CrossSellGetContractMobile?contractID_=' + contractID + '&sessionID=' + sessionID + "&Mode=Flight&User=" + sessionID + "&utm_source=&utm_campaign=&utm_sourceid=&utm_medium=&TransactionID=0&engineId=" + engineId;
            window.location.href = HostedDomainCarHotel + '/hotel/GetContract?Mode=Flight&contractID_=' + contractID + "&User=" + sessionID + "&TransactionID=0&utm_source=&utm_campaign=&utm_sourceid=&utm_medium=&fromDeal=true";
        }

    });
}

function GoForCarDeal(control) {
    var CarSearchModel = {
        PickUpDate: $(control).prev().find('.deal_pickUpDate').text().toString(),
        DropDate: $(control).prev().find('.deal_dropDate').text().toString(),
        PickUpTime: $(control).prev().find('.deal_pickUpTime').text().toString(),
        DropTime: $(control).prev().find('.deal_dropTime').text().toString(),
        PickUpLocation: $(control).prev().find('.clsDestination').text().toString(),
        //DropLocation: $(control).prev().find('.clsDestination').text().toString(),
        IsDealSearch: true,
        UTMSource: $('#UTMSource').val(),
        UTMMedium: $('#UTMMedium').val(),
        UTMCampaign: $('#UTMCampaign').val()

    };

    $.ajax({
        url: HostedDomainCarHotel + '/car/home',
        dataType: 'JSON',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(CarSearchModel),
        error: function (err, xhr, error) {

        },
        success: function (data) {
            if (data.CarGUID != '') {
                if (data.Agent) {
                    window.location.href = HostedDomainCarHotel + "/Car/InterMediateMobilePage?id=" + data.CarGUID;
                }
                else {
                    window.location.href = HostedDomainCarHotel + "/Car/InterMediatePage?id=" + data.CarGUID;
                }
            }
        },

    });
}
//endregion other


$('document').ready(function () {
    // IE9 placeholder text
    // $('input, textarea').placeholder({ customClass: 'my-placeholder' });
    OnbackGet();
    $('#menuTogglediv').click(function (e) {
        $('#mobPane').css('display', 'block');
    });

    $('a#close').click(function (e) {
        $('#mobPane').css('display', 'none');
    });
    //$(".trip-type.one-ways").on("click", function () {
    //    $('#txtArrival').val("");
    //});
});



$('#search-flight input , #search-car input').on('keypress', function (event) {
    var regex = new RegExp("^[a-zA-Z0-9._ \b]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }

});
$('#search-hotel input').on('keypress', function (event) {
    var regex = new RegExp("^[a-zA-Z0-9._ \b]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }

});


$(document).on('click', 'body', function (evt) {
    var $this = $(evt.target),
        isOverlayOpen = $('#mobPane').attr('style');
    isOverlayOpenOrNot = (isOverlayOpen == 'display: block;') ? true : false;
    clickOutsideOverlay = $this.parents('#mobPane').length > 0 ? false : true,
        burgerMenu = $this.parents('#menuToggle').length > 0 ? true : false;

    if (isOverlayOpenOrNot && clickOutsideOverlay && !burgerMenu) {
        $('#mobPane').css('display', 'none');
    }
    //$('#CubaPopUp').on('shown.bs.modal', function () {
    $(document).on("click", "#CubaPopUp", function (e) {
        $("#Umnr_popWarp").hide();
    })
    $('#CubaPopUp').on('hidden.bs.modal', function () {
        $("#Umnr_popWarp").show();
    });
});


function SetHotelCookiesData() {
    var HotelSearchDetails = {};
    HotelSearchDetails.HotelAdultCount = $('#HotelAdultCount').val() == '0' ? '1' : $('#HotelAdultCount').val();
    HotelSearchDetails.HotelChildCount = $('#HotelChildCount').val();
    HotelSearchDetails.NumberofRooms = $('#NumberofRooms').val() == '0' ? '1' : $('#NumberofRooms').val();
    HotelSearchDetails.HotelNumberofTraveler = $('#HotelNumberofTraveler').val();
    HotelSearchDetails.HotelDestinationCityCode = $('#HotelDestinationCityCode').val();
    HotelSearchDetails.DestinationCityName = $('#DestinationCityName').val();
    HotelSearchDetails.DestinationStateCode = $('#DestinationStateCode').val();
    HotelSearchDetails.DestinationCountryCode = $('#DestinationCountryCode').val();
    HotelSearchDetails.Destination = $('#hotelDestination').val();
    HotelSearchDetails.AirportCode = $('#AirportCode').val();
    HotelSearchDetails.AirportName = $('#AirportName').val();
    HotelSearchDetails.CityID_PPN = $('#CityID_PPN').val();
    HotelSearchDetails.HotelChildAges = $('#HotelChildAges').val();
    if (HotelSearchDetails.HotelChildAges == '') {
        HotelSearchDetails.HotelChildAges = 'RoomCount1Adult=1-Child=0-|';
    }
    HotelSearchDetails.HotelName = $('#HotelName').val();
    HotelSearchDetails.HotelRating = $('#HotelRating').val();
    HotelSearchDetails.CheckOutDate = $('#txtCheckOut').val();
    HotelSearchDetails.CheckInDate = $('#txtCheckIn').val();
    HotelSearchDetails.CheckInDate = $('#txtCheckIn').val();
    document.cookie = "fHotelSearchDetails" + "=" + encodeURIComponent(JSON.stringify(HotelSearchDetails)) + ";path=/";
}
function GetHotelCookiesData() {
    var cookieVal = GetCookieByName('fHotelSearchDetails');
    if (cookieVal != null && cookieVal != undefined && cookieVal != '') {

        var hotel = cookieVal.constructor.name == "Array" ? cookieVal[0] : cookieVal;
        $('#HotelAdultCount').val(hotel.HotelAdultCount);
        $('#HotelChildCount').val(hotel.HotelChildCount);
        $('#NumberofRooms').val(hotel.NumberofRooms);
        $('#HotelNumberofTraveler').val(hotel.HotelNumberofTraveler);
        $('#HotelDestinationCityCode').val(hotel.HotelDestinationCityCode);
        $('#DestinationCityName').val(hotel.DestinationCityName);
        $('#DestinationStateCode').val(hotel.DestinationStateCode);
        $('#DestinationCountryCode').val(hotel.DestinationCountryCode);
        $('#hotelDestination').val(hotel.Destination);
        $('#AirportCode').val(hotel.AirportCode);
        $('#AirportName').val(hotel.AirportName);
        $('#CityID_PPN').val(hotel.CityID_PPN);
        $('#HotelChildAges').val(hotel.HotelChildAges);
        $('#HotelName').val(hotel.HotelName);
        $('#HotelRating').val(hotel.HotelRating);
        $('#txtCheckOut').val(hotel.CheckOutDate);
        $('#txtCheckIn').val(hotel.CheckInDate);
        $('#roomAdd').val(hotel.NumberofRooms);

        if (hotel.CheckOutDate != '' && hotel.CheckOutDate != undefined) {
            var arrdate = {};
            if ($(window).width() < 766) {
                var mDate = new Date(hotel.CheckOutDate);
                arrdate = mDate.toString().split(' ');
            }
            else {
                arrdate = hotel.CheckOutDate.split(',');
            }
            //Mobile Calernder           
            $("#checkoutdaymob").html(arrdate[1] + ' ' + arrdate[2]);
            $("#checkoutyearmob").html(arrdate[0] + ' ' + arrdate[3]);

            //Desktop Calernder
            $("#checkoutdayname").html(arrdate[0]);
            $("#checkoutday").html(arrdate[1]);
            $("#checkoutmonth").html(arrdate[2]);
            $("#checkoutyear").html(arrdate[3]);
            var mobDept = new Date(hotel.CheckOutDate);
            $("#check_out_mobile").val(((mobDept.getMonth() + 1) < 10 ? ("0" + parseInt(mobDept.getMonth() + 1)) : mobDept.getMonth() + 1) + '/'
                + (mobDept.getDate() < 10 ? ('0' + mobDept.getDate()) : mobDept.getDate()) + '/'
                + mobDept.getFullYear());

        }

        if (hotel.CheckInDate != '' && hotel.CheckInDate != undefined) {

            var dept = {};
            if ($(window).width() < 766) {
                var mDate = new Date(hotel.CheckInDate);
                dept = mDate.toString().split(' ');
            }
            else {
                dept = hotel.CheckInDate.split(',');
            }

            //Mobile Calernder          
            $("#checkindaymob").html(dept[1] + ' ' + dept[2]);
            $("#checkinyearmob").html(dept[0] + ' ' + dept[3]);

            //Desktop Calender
            $("#checkindayname").html(dept[0]);
            $("#checkinday").html(dept[1]);
            $("#checkinmonth").html(dept[2]);
            $("#checkinyear").html(dept[3]);
            var mobDept = new Date(hotel.CheckInDate);
            $("#check_in_mobile").val(((mobDept.getMonth() + 1) < 10 ? ("0" + parseInt(mobDept.getMonth() + 1)) : mobDept.getMonth() + 1) + '/'
                + (mobDept.getDate() < 10 ? ('0' + mobDept.getDate()) : mobDept.getDate()) + '/'
                + mobDept.getFullYear());
        }


        var roomCount = parseInt(hotel.NumberofRooms);
        var i = 1;
        if (roomCount >= 1) {

            if (hotel.HotelChildAges != '' && hotel.HotelChildAges != undefined) {
                appendRooms();
                var childAges = hotel.HotelChildAges.split('|');
                for (var i = 1; i <= childAges.length; i++) {
                    if (childAges[i - 1] != '') {
                        var roomChilds = childAges[i - 1].split(/[=,-]+/);
                        $('#Adult_' + i).val(roomChilds[1]);
                        $('#ddlChild_' + i).val(roomChilds[3]);
                        var rmc = 1;
                        for (var a = 5; a < roomChilds.length; a++) {
                            if (roomChilds[a] != '' && typeof roomChilds[a] !== undefined) {
                                $('#btnchild-cnt_' + i).click();
                                $('#room_ddlChild_' + (i + '_' + rmc)).val(parseInt(roomChilds[a]));
                                rmc++;
                            }
                        }
                    }
                }
                UpdateHotelRoomTravellerInfo();
            }
        }
        else {
            var cnt = 1 - roomCount;
            for (var i = 0; i < cnt; i++) {
                $('#roomsPanel').children().children(".roomDtls").parent().last().remove();
                if (previousChildCount !== "undefined") {
                    previousChildCount.pop();
                }
            }
        }
    }
    else {
        if ($(window).width() > 766) {
            $('#hotelDestination').val('');
            $('#txtCheckOut').val('');
            $('#txtCheckIn').val('');
        }
    }
}
function GetCookieByName(CookieName) {

    var allcookies = document.cookie.split(';');
    // Now take key value pair out of this array
    for (var i = 0; i < allcookies.length; i++) {
        name = allcookies[i].split('=')[0];
        value = allcookies[i].split('=')[1];
        if (name.trim() == CookieName) {
            return JSON.parse(decodeURIComponent(value));
        }
    }
}

//Car Cookies
function SetCarCookiesData() {
    var CarSearchCookie = {};

    CarSearchCookie.carpickup = $("#hfPickUpLocation").val();
    CarSearchCookie.cardropoff = $("#hfDropOffLocation").val();
    CarSearchCookie.carpickDate = $("#PickUpDate").val();
    CarSearchCookie.cardropDate = $("#DropDate").val();
    CarSearchCookie.carpickTime = $("#PickUpTime").val();
    CarSearchCookie.cardropTime = $("#DropTime").val();
    CarSearchCookie.isSameDropLocation = $(".switch-car").hasClass('On');
    document.cookie = "CarSearchCookie" + "=" + encodeURIComponent(JSON.stringify(CarSearchCookie)) + ";path=/";
}
function GetCarCookiesData() {
    var cookieVal = GetCookieByName('CarSearchCookie');
    if (cookieVal != null && cookieVal != "" && cookieVal != undefined) {
        $("#hfDropOffLocation").val(cookieVal.cardropoff);
        $("#hfPickUpLocation").val(cookieVal.carpickup);
        $("#PickUpDate").val(cookieVal.carpickDate);
        $("#DropDate").val(cookieVal.cardropDate);

        if (cookieVal.carpickDate != '') {
            var picDateSplit = {};
            if ($(window).width() < 766) {
                var mDate = new Date(cookieVal.carpickDate);
                picDateSplit = mDate.toString().split(' ');
                $("#pickUpDate_mobile").val(cookieVal.carpickDate);
            }
            else {
                picDateSplit = cookieVal.carpickDate.split(',');
            }
            //var picDateSplit = cookieVal.carpickDate.split(',')

            //Desktop
            $("#pickupdayname").html(picDateSplit[0]);
            $("#pickupday").html(picDateSplit[1]);
            $("#pickupmonth").html(picDateSplit[2]);
            $("#pickupyear").html(picDateSplit[3]);

            //Mobile
            $("#pickupdaymob").html(picDateSplit[1] + ' ' + picDateSplit[2]);
            $("#pickupyearmob").html(picDateSplit[0] + ' ' + picDateSplit[3]);
        }
        if (cookieVal.cardropDate != '') {
            //var dropDateSplit = cookieVal.cardropDate.split(',')
            var dropDateSplit = {};
            if ($(window).width() < 766) {
                var mDate = new Date(cookieVal.cardropDate);
                dropDateSplit = mDate.toString().split(' ');
                $("#dropoff_mobile").val(cookieVal.cardropDate);
            }
            else {
                dropDateSplit = cookieVal.cardropDate.split(',');
            }
            //Desktop
            $("#dropdayname").html(dropDateSplit[0]);
            $("#dropday").html(dropDateSplit[1]);
            $("#dropmonth").html(dropDateSplit[2]);
            $("#dropyear").html(dropDateSplit[3]);

            //Mobile
            $("#dropdaymob").html(dropDateSplit[1] + ' ' + dropDateSplit[2]);
            $("#dropyearmob").html(dropDateSplit[0] + ' ' + dropDateSplit[3]);
        }


        if ($('#hfPickUpLocation').length > 0 && $('#hfPickUpLocation').val() != '') {
            var pickupL = $('#hfPickUpLocation').val().split(',');
            $("#PickUpLocation").val($.trim($('#hfPickUpLocation').val().split('-')[0]));
            var pickupcityDetails = pickupL[1] + ',' + pickupL[2];
            $('#sub_pickupL').val(pickupcityDetails);
        }

        if ($('#hfDropOffLocation').length > 0 && $('#hfPickUpLocation').val() != '') {
            var dropL = $('#hfDropOffLocation').val().split(',');
            $("#DropLocation").val($.trim($('#hfDropOffLocation').val().split('-')[0]));
            var dropcityDetails = dropL[1] + ',' + dropL[2];
            $('#sub_dropL').val(dropcityDetails);
        }
        BindDropTime();
        $("#PickUpTime").val(cookieVal.carpickTime);
        $("#DropTime").val(cookieVal.cardropTime);

        if (cookieVal.isSameDropLocation == 'true' || cookieVal.isSameDropLocation == true)
            if (!$('.switch-car').hasClass('On'))
                setTimeout(function () { $('.switch-car').click(); }, 300);

    }
    else {
        if ($(window).width() > 766) {
            $('#PickUpLocation').val('');
            $('#DropLocation').val('');
            $('#PickUpDate').val('');
            $('#DropDate').val('');
            $("#PickUpTime").val('');
            $("#DropTime").val('');
        }
    }
}
$("#date_picker_range").on('show.bs.modal', function () {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
        $("#mfstrvlerpicker-flight-mobile").height($("#date_picker_range").height() - 150);
        $(".deals-in-flight,.exclusive-hotel-deal,.exclusive-car-deal,.affordable-bookingfterContainer,.fare-text,.mfs_connectWith,.footer,.subscribe_mfsmail,#mfs_mserviceBox").hide();
    }
});
$("#date_picker_range").on('hide.bs.modal', function () {
    $(".deals-in-flight,.exclusive-hotel-deal,.exclusive-car-deal,.affordable-bookingfterContainer,.fare-text,.mfs_connectWith,.footer,.subscribe_mfsmail,#mfs_mserviceBox").show();
});
/* If browser back button was used, flush cache */
/*if (newWindowWidth < 600) {
    (function () {
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };
    })();    
}*/