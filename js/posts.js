$(document).ready(() => {

    /*
    method loads the navgition bar
     */
    SDK.User.loadNav();
    const currentUser = SDK.User.current();


    /*
    This method finds all posts
     */
    SDK.Post.findAll((data) => {

        /*
        Creates an arrayList for saving the data from the iteration in the for loop
         */
        let posts = data || [];

        const $allPostsDivRef = $("#allPostsDiv");



    //https://www.w3schools.com/jsref/met_node_appendchild.asp
    /*
    For loop for finding each one of the posts
     */
    posts.forEach(post => {

        $allPostsDivRef.append(`
            <dl xmlns="http://www.w3.org/1999/html">
            <dt>Date</dt>
            <dd>${post.created}</dd>
            <dt>Created by</dt>
            <dd>${post.owner.id}</dd>
            <dt>Content</dt>
            <dd>${post.content}</dd>
            <br>
            <button class="btn btn-default" onclick="location.href='show_post_comments.html?id=${post.id}'">Show comments for this post</button>
            </dl>
    <br><br><br>
    `)
    });

    });

    /*
    Button for getting to the page for creating post
     */
    $("#create-post-btn").click(() => {
       window.location.href="create_post.html";
    });

    /*
    Button that saves the post in the arrayList and sends the user back to the post page
     */
    $("#post-btn").click(() => {

        const user_id = currentUser;
        const postText = document.getElementById("inputContent").value;

        const jsonPost = {owner: user_id, content: postText};


        SDK.Post.createPost(JSON.stringify(jsonPost), (err, data) => {

            console.log(err, data);

            window.location.href="posts.html";
        });

    });

});

