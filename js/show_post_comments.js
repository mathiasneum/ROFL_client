$(document).ready(() => {

    SDK.User.loadNav();
    const currentUser = SDK.User.current();

    var urlParams = new URLSearchParams(window.location.search);

    /*
    This method finds the original post and the comments saved for it
     */
    SDK.Post.findAllComments(urlParams.get("id"),(data) => {

        let post = data;

        let comments = data.comments || [];

        const $allCommentsDivRef = $("#allCommentsDiv");

        $("#originalPostDiv").append(`
            <dl>
            <dt>Date</dt>
            <dd>${post.created}</dd>
            <dt>Created by</dt>
            <dd>${post.owner.id}</dd>
            <dt>Content</dt>
            <dd>${post.content}</dd>
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
    Button saves the comment text for a post.
     */
    $("#comment-btn").click(() => {

        const user_id = currentUser;
        const commentText = document.getElementById("inputContent").value;
        const parent_id = urlParams.get("id");

        const jsonPost = {owner: user_id, content: commentText, parent: parent_id};


        SDK.Post.createComment(JSON.stringify(jsonPost), (err, data) => {

            console.log(err, data);

        });

    });



});