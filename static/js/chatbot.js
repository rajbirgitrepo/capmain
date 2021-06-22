jQuery(document).ready(function($) {
    jQuery(document).on('click', '.iconInner', function(e) {
        jQuery(this).parents('.botIcon').addClass('showBotSubject');
        $("[name='msg']").focus();
    });
    jQuery(document).on('click', '.closeBtn, .chat_close_icon', function(e) {
        jQuery(this).parents('.botIcon').removeClass('showBotSubject');
        jQuery(this).parents('.botIcon').removeClass('showMessenger');
    });
    jQuery(document).on('submit', '#botSubject', function(e) {
        e.preventDefault();
        jQuery(this).parents('.botIcon').removeClass('showBotSubject');
        jQuery(this).parents('.botIcon').addClass('showMessenger');
    });
    /* Chatboat Code */
    var i=0;
    URL="https://test.innerexplorer.org/run/";
    $(document).on("submit", "#messenger", function(e) {
        e.preventDefault();
        var val = $("[name=msg]").val().toLowerCase();
        var mainval = $("[name=msg]").val();
        name = '';
        nowtime = new Date();
        nowhoue = nowtime.getHours();
        function userMsg(msg) {
            $('.Messages_list').append('<div class="msg user"><span class="avtr"><figure style="background-image: url(https://test.innerexplorer.org/IE-bot/bot/chatbot/chatbot2.png)"></figure></span><span class="responsText">' + mainval + '</span></div>');
        };
        function appendMsg(msg) {
            $('.Messages_list').append('<div class="msg" ><span class="avtr"><figure style="background-image: url(https://test.innerexplorer.org/IE-bot/bot/chatbot/compasslogo.png)"></figure></span><span class="responsText" >' + msg + '</span></div>');
            $("[name='msg']").val("");
            };
        function appendMsg2(typing,i) {

                $('.Messages_list').append('<div class="msg" id="message'+i+'" ><span class="avtr"><figure style="background-image: url(https://test.innerexplorer.org/IE-bot/bot/chatbot/compasslogo.png)"></figure></span><span class="responsText" >' + typing + '</span></div>');
                $("#message"+i).fadeIn('slow', function()
                {
                $('#message'+i).delay(2000).fadeOut();
                    });    
                };
        userMsg(mainval);
        console.log(val)
        console.log(URL)
        URL="https://test.innerexplorer.org/run/"+val;
        console.log(URL)

        i++
        call();
function call(){
        appendMsg2("typing...",i);
        setTimeout(chatbot, 2000);}
function chatbot(){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": URL, 
            "method": "GET"
           }
           $.ajax(settings).done(function (response) {
            botMsg=(response.Bot[0]);
            appendMsg(response.Bot[0]);
            return botMsg;
           });
        };
        var lastMsg = $('.Messages_list').find('.msg').last().offset().top;
        $('.Messages').animate({scrollTop: lastMsg}, 'slow');
    });
    /* Chatboat Code */
})