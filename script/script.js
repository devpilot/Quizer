// Setup Timeing
var h = 0,m = 5, s = 10;

var totalQ, currQ = 0;
/**
* Add leading 0 to int
* @param num int
* @return string
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
    finish();
    }
    // Setting time in span#time
    $("#time").text(h+':'+pad(m)+':'+pad(s));
}

/**
 * Navigate between Questions
 */
function getQuiz(now){
    // Get json data
    $.getJSON("quiz.js",function(data){
        
        // Get numbers of questions in set
        totalQ = data.quiz.length;
        
        // Display Question count
        $("#qnum").html(now+1+'/'+totalQ);
        
        // Display Question
        $("#qus").text(data.quiz[now].question);
        
        // Display Options
        $.each(data.quiz[now].option, function(i,op){
            //$(".options").append("<li>"+op+"</li>");
        })
        btnHandler(now);
    });
}

/**
 * Show or hide buttons
 */
function btnHandler(now){
    if(now+1 == totalQ){
        $("button#next-btn").hide();
        $("button#fin-btn").show();
    } else {
        $("button#fin-btn").hide();
        $("button#next-btn").show();
    }
    if(now == 0){
        $("button#prev-btn").hide();
    } else {
        $("button#prev-btn").show();
    }
}

function finish(){
    $(".screen-finish").slideDown(1000);
}

$(document).ready(function(){
    // Display Questions and start timer
   $("button#qstart").click(function(){
        $(".screen-start").slideUp(1000);
        timerF = setInterval(timer,1000);
        // Load question on start
        getQuiz(currQ);
   });
    // Clear selected answer
    $("button#ans-clear").click(function(){
        $("input:radio").removeAttr("checked");
    });
    // Go to next Question
    $("button#next-btn").click(function(){
        getQuiz(++currQ);
    });
    // Go to previous question
    $("button#prev-btn").click(function(){
        getQuiz(--currQ);
    });
});