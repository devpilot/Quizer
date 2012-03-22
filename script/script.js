// Setup Timeing
var h = 0,m = 5, s = 10;

/**
* Add leading 0 to int
*/
function pad(num) {
    var s = num+"";
    if(s.length < 2) s = "0" + s;
    return s;
}

/**
* Countdown Timer
*/
function timer(){
    if(s == 0){
        if(m > 0){
            s = 59;
            m--;
        }
    } else {
        s--;
    }
    if(m == 0){
        if(h > 0){
            m = 59;
            h--;
        }
    }
    if(h == 0 && m == 0 && s == 0){
        // Timeup, Stop timer
        clearInterval(timerF);
    $(".screen").slideDown(1000);
    }
    // Setting time in span#time
    $("#time").text(h+':'+pad(m)+':'+pad(s));
}
$(document).ready(function(){
    // Display Questions and start timer
   $("button#qstart").click(function(){
           $(".screen").slideUp(1000);
          timerF = setInterval(timer,1000);
       });
    // Clear selected answer
    $("button#ans-clear").click(function(){
        $("input:radio").removeAttr("checked");
    });
});