window.addEventListener('load', function () {
    document.getElementById("login_btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click
    document.getElementById("login_btn").addEventListener("click", updateEvents, false);
    document.getElementById("signup_btn").addEventListener("click", newUser_Signup, false);

    document.body.addEventListener('click', function (event) {
        if (event.srcElement.id == 'signup_btn2') {
            lnewUser_Signup();
        };
    }, false);
    document.body.addEventListener('click', function (event) {
        if (event.srcElement.id == 'logout_btn') {
            logout();
        };
    }, false);
    checkLogin();
});

var token;

function loginAjax(event) {
    const username = document.getElementById("username").value; // Get the username from the form
    const password = document.getElementById("password").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    const data = { 'username': username, 'password': password };

    fetch("login.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(function (data) {
            alert(data.success ? "You've been logged in!" : `You were not logged in ${data.message}`)
            token = data.token;
            console.log(token);
        })
        .catch(err => console.error(err));

    document.getElementById("username").value = '';
    document.getElementById("password").value = '';
    checkLogin();
    updateCalendar();
}

function newUser_Signup(event) {
    const username = document.getElementById("new_username").value;
    const password = document.getElementById("new_password").value;

    const data = { 'username': username, 'password': password };

    fetch('newUser.php', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => alert(data.success ? "You've been signed up!" : 'Sign up has failed'))
        .catch(err => console.error(err));

    document.getElementById("new_username").value = '';
    document.getElementById("new_password").value = '';
}

function checkLogin() {
    fetch('checkLogin.php', {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(function (data) {
            if (data.success) {
                document.getElementsByClassName('sign_in')[0].innerHTML = '';
                document.getElementsByClassName('sign_up')[0].innerHTML = '';
                document.getElementsByClassName('logout')[0].innerHTML = `
                <button id='logout_btn'>Logout</button>
                `;
            }
        })
        .catch(err => console.error(err));
}


function logout() {
    fetch('logout.php', {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(function (data) {
            if (data.success) {
                document.getElementsByClassName('sign_in')[0].innerHTML = `
                    <label> Username: <input type='text' id='username' /></label>
                    <label> Password: <input type='password' id='password' /></label >
                    <button id='login_btn2'>Login</button>`;
                document.getElementsByClassName('sign_up')[0].innerHTML = `
                <label> Username: <input type="text" id="new_username" /></label>
                <label> Password: <input type="password" id="new_password" /></label>
                <button id="signup_btn2">Sign-Up</button>`;
                document.getElementsByClassName('logout')[0].innerHTML = '';
            }
        })
        .catch(err => console.error(err));

    updateCalendar();
}


document.body.addEventListener('click', function (event) {
    if (event.srcElement.id == 'login_btn2') {
        loginAjax();
        updateEvents();
        checkLogin();
    };
}, false);