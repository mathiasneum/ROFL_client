$(document).ready(() => {

    /*
    This button fires the logout button in the nav bar
     */
    $("#logout-button").click(() => {
        console.log("i ran");
        SDK.User.logOut();
    })

});