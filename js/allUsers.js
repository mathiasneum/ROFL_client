$(document).ready(() => {

    //This method is loading the navigation bar
    SDK.User.loadNav();


    /*
    This method finds all users
     */
    SDK.User.findAll((data) => {


        /*
        Creates an arrayList for saving the data from the iteration in the for loop
         */
        let users = data || [];

        const $allUsersDivRef = $("#allUsersDiv");

        /*
        For loop for finding each one of the events
        */
        users.forEach(user => {

            $allUsersDivRef.append(`
            <dl>
            <dt>Name</dt>
            <dd>${user.firstName} ${user.lastName}</dd>
            <dt>Email</dt>
            <dd>${user.email}</dd>
            <dt>Description</dt>
            <dd>${user.description}</dd>
            <dt>Major</dt>
            <dd>${user.major}</dd>
            <dt>Semester</dt>
            <dd>${user.semester}</dd>
            </dl>
            `)
        });
    });




});