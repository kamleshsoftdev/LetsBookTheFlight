
    $( document ).ready(function() {        
        $('#txtsubemail, .listingSubscribe #txtsubemail, .subscribe_mfsmail #txtsubemail, #soldOut_Popup #txtsubemail').focus(function(){
            $('.alert-danger').empty();
        });

        if (!$('.confirmation-page-deal .exclusive-deals').hasClass('text-center')) {            
            $('.confirmation-page-deal').addClass('hide-me-quick');
            $('.confirmation-page-deal.hide-me-quick').hide();
        }

    });
    function SendNewsLetterEmailSubscribe(PageId, SubscribeEmail) {
    var TempValue = "";
    var txtvalue = "";
    var emailID = "";

    $(".clsTxtsubemail").each(function () {
        TempValue = $(this).val();
        if (TempValue != "" && TempValue != "Enter email address") {
            txtvalue = TempValue;            
        }
    })
    emailID = txtvalue;
    if (emailID == "" || emailID == undefined) {
        $('.alert-danger').html('Please provide an<b> Email Address.</b>');
        return false;
    }
    else {
        var regExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regExp.test(emailID)) {
            $('.alert-danger').html('Please provide a valid <b>Email Address.</b>');
            return false;
        }
    }  

    jQuery.getJSON("/Flight/NewsLetterSubscription", { emailId: emailID, source_: SubscribeEmail }, function (data) {
         
        var  Subscriber= data.msg
        if (data.Success == true) 
        {           
            var pagenameId = PageId
             if (Subscriber.indexOf("Congratulations") != -1)
                {
                    $('.success-hide').hide();
                    $('.show-when-success').removeClass('hide');
                    $('.first-heading').hide();
                }
                else
                {                                             
                    $('.alert-danger').html(data.msg);
                } 
            return false;
        }
    });
}
            
              
        
     