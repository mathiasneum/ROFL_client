const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => {

        let token = {"Authorization": "Bearer " + localStorage.getItem("token")}

        /*
        Ajax call for speaking asyncrone with the server
        The method is used for all functions, except for login
        This method is taken from Jesper's bookstore client
         */
        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: token,
            contentType: "application/json",
            dataType: "json",
            data: options.data,
            success: (data, status, xhr) => {
                cb(data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });

    },
        /*
        Ajax call for speaking asyncrone with the server
        This method is made for authing a login request
         */
        loginrequest: (options, cb) => {
        $.ajax({
            url: SDK.serverURL + "/auth/",
            method: options.method,
            contentType: "application/json",
            dataType: 'text',
            data: JSON.stringify(options.data),

            success: (data, status, xhr) => {
                cb (data, status, xhr, null);
            },

            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });
        },

    /*
    All the functions regarding the request to the server for event functions
     */
    Event: {

        /*
        Finds all events
         */
        findAll: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/events",
                },
                (data, status, xhr) => {
                    cb(data);
                });
        },

        /*
        Finds all comments on a specific event id
         */
        findAllEventComments: (event_id, cb) => {
            SDK.request({
                    method: "GET",
                    url: "/events/" + event_id},
                (data, status, xhr) => {
                    cb(data);
                });

        },

        /*
        Creates event
         */
        createEvent: (event, cb) => {
            SDK.request({
                data: event,
                method: "POST",
                url: "/events",

            }, (err, data) => {
                cb(err, data);
            });
        },

        /*
        Creates comment for event
         */
        createEventComment: (comment, cb) => {

            SDK.request({
                data: comment,
                method: "POST",
                url: "/posts",


            }, (err, data) => {
                cb(err, data);
            });
        },


    },

    /*
    All the functions regarding the request to the server for posts functions
     */
    Post: {

        /*
        Finds all posts
         */
        findAll: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/posts",},
                (data, status, xhr) => {
                    cb(data);
                });

        },

        /*
        Finds all comments on posts
         */
        findAllComments: (parent_id, cb) => {
            SDK.request({
                    method: "GET",
                    url: "/posts/" + parent_id},
                (data, status, xhr) => {
                    cb(data);
                });

        },

        /*
        Creates a post
         */
        createPost: (content, cb) => {
            SDK.request({
                data: content,
                method: "POST",
                url: "/posts",

            }, (err, data) => {
                cb(err, data);
            });
        },

        /*
        Creates a comment
         */
        createComment: (comment, cb) => {
            SDK.request({
                data: comment,
                method: "POST",
                url: "/posts",


            }, (err, data) => {
                cb(err, data);
            });
        },

    },

    /*
    All the functions regarding the request to the server for User functions
     */
    User: {

        /*
        Finds all users
         */
        findAll:(cb) => {
            SDK.request({
                method: "GET",
                url: "/users",
                },
                (data,status, xhr) => {
                    cb(data);
                });

    },
        /*
        Saves current user in localstorage
         */
        current: () => {
            return localStorage.getItem("userId");
    },

        /*
        Finds a single user
         */
        findUser:(cb) => {
            SDK.request({
                method: "GET",
                url: "/users/" + SDK.User.current()},
                (data, status, xhr) => {
                    cb(data);
                });

        },

        /*
        Logout method,
        heavily inspired by Jesper's bookstore client
         */
        logOut: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            SDK.Storage.remove("user");
            window.location.href = "index.html";
        },

        /*
        Login method,
        heavily inspired by Jesper's bookstore client
         */
        login: (email, password, cb) => {
            SDK.loginrequest({
                data: {
                    email: email,
                    password: password
                },
                method: "POST",
            }, (data, status, xhr, err) => {

                //On login-error
                if (err) return cb(err);

                // https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript
                let token = data;

                var base64Url = token.split('.')[0];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                console.log(JSON.parse(window.atob(base64)));

                localStorage.setItem("userId", JSON.parse(window.atob(base64)).kid);
                localStorage.setItem("token", data);

                cb(null, data);


            }, cb);
        },

        /*
        Method for loading the navigation bar
         */
        loadNav: (cb) => {
            $("#nav-content").load("nav.html", () => {
                const currentUser = SDK.User.current();

        });


    },
    /*
    Creating a new user
     */
    createUser: (password, firstName, lastName, email, description, gender, major, semester, cb) => {

        const jsonUser = {
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            description: description,
            gender: gender,
            major: major,
            semester: semester
        };

        SDK.request({
            data: JSON.stringify(jsonUser),
            method: "POST",
            url: "/users",

        }, cb);
        console.log("did it");
    },

    },

    /*
    Method is used to store items in localstorage.
     */
    Storeage: {
        prefix: "NexusROFLSDK",
        persist: (key, value) => {
            window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        load: (key) => {
            const val = window.localStorage.getItem(SDK.Storage.prefix + key);
            try {
                return JSON.parse(val);
            }
            catch (e) {
                return val;
            }
        },
        remove: (key) => {
            window.localStorage.removeItem(SDK.Storage.prefix + key);
        }
    }
};




