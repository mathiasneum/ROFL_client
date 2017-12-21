$(document).ready(() => {

    /*
    mehtod loads the navigation bar
     */
    SDK.User.loadNav();
    const currentUser = SDK.User.current();

    /*
    This method finds all events
     */
    SDK.Event.findAll((data) => {


        /*
        Creates an arrayList for saving the data from the iteration in the for loop
         */
        let events = data || [];

        const $allEventsDivRef = $("#allEventsDiv");

        /*
        For loop for finding each one of the events
        */
        events.forEach(event => {

           $allEventsDivRef.append(`
                <dl>
                <dt>Title</dt>
                <dd>${event.title}</dd>
                <dt>Host</dt>
                <dd>${event.owner.id}</dd>
                <dt>Start Date</dt>
                <dd>${event.startDate}</dd>
                <dt>End Date</dt>
                <dd>${event.endDate}</dd>
                <dt>Description</dt>
                <dd>${event.description}</dd>
                <br>
                <button class="btn btn-default" onclick="location.href='show_event_comments.html?id=${event.id}'">Show comments for this event</button>
                </dl>
                <br><br><br>
           `)
        });
    });

    /*
    Button for getting to the page for creating events
     */
    $("#create-event-btn").click(() => {
        window.location.href="create_event.html";
    });

    /*
    Button that saves the events in the arrayList and sends the user back to the event page
     */
    $("#post-event-btn").click(() => {

        const owner_id = currentUser;
        const title = document.getElementById("inputTitle").value;
        const startDate = document.getElementById("inputStartDate").value;
        const endDate = document.getElementById("inputEndDate").value;
        const description = document.getElementById("inputDescription").value;


        const jsonPost = {owner_id: owner_id, title: title, startDate: startDate,
            endDate: endDate, description: description};


        SDK.Event.createEvent(JSON.stringify(jsonPost), (err, data) => {

            console.log(err, data);

            window.location.href="events.html";
        });

    });

    });