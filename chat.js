
var local_user = " user";
var server_user = " otheruser";


$(document).ready(function () {


    const port = "ws://localhost:8000";

    const socket = io(port);

    socket.on('msg', text => {
        get_msg(text, server_user);
        console.log(text);
    })

    const container = $('#contain');
    const msg = $('#msgContainer');

    var msg_div = ''

    $("#enter").click(function () {
        if (msg.val().trim() != '') {



            socket.emit('msg', msg.val());
            get_msg(msg.val(), local_user);
        }
    });



    $(document).on('keypress', function (e) {

        // if (e.which === 13 && e.shiftKey) {
        //     e.preventDefault();
        //     msg.val(msg.val() + "\n");
        //     return;
        // }



        if (e.which == 13) {
            if (msg.val().trim() != '') {
                socket.emit('msg', msg.val());
                get_msg(msg.val(), local_user);

            }
        } else {
            msg.focus();
        }
    });
    function get_msg(io_msg, origin) {

        console.log(origin);

        var message = io_msg || msg.val();

        var cllass = "msg white";

        // var x = Math.random() * 2;

        // if (x < 1) {
        //     cllass = cllass + " user";
        // } else {
        //     cllass = cllass + " otheruser";
        // }

        cllass = cllass + " " + origin;

        container.append(insert(cllass, message));


        $('.table_container').scrollTop($('.main_div').height());


        msg.val("");
    }

    function insert(className, content) {

        var msg = content.msg || content;
        var user_id = content.id || "You";
        var tag = 'div';

        var text = `<${tag} class="${className}">${msg} <span>${user_id}</span>    </${tag}> `;



        if (className.indexOf('otheruser') == -1) {
            return " <tr>  <td> </td> <td>" + text + "</td>  </tr>";
        } else {
            return " <tr> <td>" + text + "</td> <td> </td> </tr>";
        }






    }

});

