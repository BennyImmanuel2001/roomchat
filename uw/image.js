$(document).ready(function () {



    function appendToApplication(baseString, userClass) {

        var rowCount = $('#contain tr').length;
        var img = `<img class='msg_img'  src='${baseString}'/>`;
        var img_container = `<div class='msg_img_container ${userClass}'>  ${img}</div>`;
        if (userClass == 'user') {
            $('#contain').append(`<tr>  <td></td> <td> ${img_container} </td>  </tr>`);
        } else {
            $('#contain').append(`<tr>  <td>  ${img_container}  </td> <td> </td>  </tr>`);
        }


    }

    function convertToString() {

        if (this.files && this.files[0]) {

            var FR = new FileReader();

            FR.addEventListener("load", function (e) {
                //   var baseString=e.target.result;
                appendToApplication(e.target.result);

            });

            FR.readAsDataURL(this.files[0]);
        }

    }

    document.getElementById("image_sender").addEventListener("change", convertToString);





});
