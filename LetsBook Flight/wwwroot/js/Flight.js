function tripType_update(triptype) {
  
    if (triptype == 'oneway') {
        $("#hide-round").hide();
        $("#RoundMultiOnewayTrip").val("ONEWAY");
    }
    else {
        $("#hide-round").show();
        $("#RoundMultiOnewayTrip").val("ROUNDTRIP");
    }

}