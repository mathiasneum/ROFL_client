$(document).ready(() => {

    SDK.User.loadNav();


    /*
    This method find the current user for profile show
     */
    SDK.User.findUser((data) => {

        let currentUser = data;

        $(".page-header").html(`
        <h1>Welcome, ${currentUser.firstName} ${currentUser.lastName}</h1>
        `);

        $(".profile-info").html(`
        <dl>
        <dt>Name</dt>
        <dd>${currentUser.firstName} ${currentUser.lastName}</dd>
        <dt>Email</dt>
        <dd>${currentUser.email}</dd>
        <dt>Description</dt>
        <dd>${currentUser.description}</dd>
        <dt>Major</dt>
        <dd>${currentUser.major}</dd>
        <dt>Semester</dt>
        <dd>${currentUser.semester}</dd>
        </dl>
        `);


    });




});