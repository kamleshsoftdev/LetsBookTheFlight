function tripType_update(triptype) {
  
    if (triptype == 'oneway') {
        $("#hide-round").hide();
    }
    else {
        $("#hide-round").show();
    }

}