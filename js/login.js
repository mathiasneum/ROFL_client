$(document).ready(() => {

    /*
    This button fires the login on the index.html page
     */
    $("#login-button").click(() => {

        const email = $("#inputEmail").val();
        const password = $("#inputPassword").val();

        /*
        This method sends validated login input from the user to the server
         */
        SDK.User.login(email, password, (err, data) => {
            if (err=== null) {
               window.location.href = "profile.html";
            } else {
                console.log("an error occured: " + err);
            }
        });

    });

});