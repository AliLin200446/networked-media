$(document).ready(function(){



    // lightbox

    $('#lb_close').click(function(){
        $('#lightbox').css('display','none');
    });



   
        // When the button is clicked
    $('#changeNavColorBtn').click(function(){
      $(".nav").css('background-color','aliceblue' ) 
      


        });
   
    $('#RB').click(function(){
        $('#RB').fadeOut(1000);
    });

    $('#IG').click(function(){
        $('#IG').fadeOut(1000);
    });

    $('#LD').click(function(){
        $('#LD').fadeOut(1000);
    });

    $("#appendBTN").click(function(){
        console.log('Button clicked');
        $("#append_output").append('<h4> Like it to the moon and the back :)</h4>');
    });
    
});


