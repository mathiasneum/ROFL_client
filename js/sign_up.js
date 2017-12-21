$(document).ready(() => {

    /*
    This button sendt the user to the sign up page
     */
    $("#sign-up-button").click(() => {

        window.location.href = "sign_up.html";

    });

    /*
    This button saves the inputted values in the sign up form.
     */
    $("#sign-up-btn").click(() => {

        const password = $("#inputPassword").val();
        const firstName = $("#inputFirstName").val();
        const lastName = $("#inputLastName").val();
        const email = $("#inputEmail").val();
        const description = $("#inputDescription").val();
        const gender = $("#inputGender").val();
        const major = $("#inputMajor").val();
        const semester = $("#inputSemester").val();

        SDK.User.createUser(password, firstName, lastName, email, description, gender, major, semester, (err, data) => {

                console.log(err, data);

                window.location.href = "index.html";

        });

    });

});