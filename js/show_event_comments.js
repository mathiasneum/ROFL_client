$(document).ready(() => {

    SDK.User.loadNav();
    const currentUser = SDK.User.current();

    var urlParams = new URLSearchParams(window.location.search);

    /*
    This method finds the original event, and the comments saved for it
     */
    SDK.Event.findAllEventComments(urlParams.get("id"),(data) => {

        let event = data;

        let comments = data.posts || [];

        const $allCommentsDivRef = $("#allCommentsDiv");

        $("#originalEventDiv").append(`
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
            </dl>
            <br>
            `)


        comments.forEach(comment => {

            $allCommentsDivRef.append(`
            <dl>
            <dt>Date</dt>
            <dd>${comment.created}</dd>
            <dt>Created by</dt>
            <dd>${comment.owner.id}</dd>
            <dt>Content</dt>
            <dd>${comment.content}</dd>
            <br>
            </dl>
            <br>
            `)
        });

    });

    /*
    Button saves the comment text for an event.
     */
    $("#comment-btn").click(() => {
        const user_id = currentUser;
        const commentText = document.getElementById("inputContent").value;
        const event_id = urlParams.get("id");

        const jsonPost = {owner: user_id, content: commentText, event: event_id};


        SDK.Event.createEventComment(JSON.stringify(jsonPost), (err, data) => {

            console.log(err, data);


        });

    });



});