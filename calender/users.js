function addEvent() {
    var a = 1;
    var b = 0;
    const time = document.getElementById("event_time").value;
    const name = document.getElementById("event_name").value;
    const date = document.getElementById("event_date").value;
    console.log(date);
    const theDate = new Date(date);
    const day = theDate.getDate() + 1;
    const year = theDate.getFullYear();
    const month = theDate.getMonth() + 1;
    //const month = document.getElementById("event_month").value; 
    //const year = document.getElementById("event_year").value;
    /* for (a = 1; a < day.length; a++) {
         b += 1;
     }*/
    // Make a URL-encoded string for passing POST data:
    const data = { 'time': time, 'name': name, 'day': day, 'year': year, 'month': month };
    console.log('time:' + time + 'name:' + name + 'day:' + day + 'year:' + year + 'month:' + month + JSON.stringify(data));
    fetch("addEvent.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(function (data) {
            data.success ? console.log("You've added event!") : console.log("You've not added event" + data.message);
            updateEvents();
            updateCalendar();
        })
        .catch(error => console.log("error" + error))

}
document.body.addEventListener('click', function (event) {
    if (event.srcElement.id == 'addEvent_btn') {
        addEvent();
    };
}, false);
//DELETING PPIORTINO
function delete_event() {
    var a = 0;
    const id = document.getElementById("delete_name").value;
    //const userID = document.getElementById("delete_events").value;
    const dataString = { 'delete_events': id };
    console.log(dataString);
    for (a = 0; a < day.length; a++) {
        a += 1;
    }
    //this is a template that we use to fetch and encode to JSON
    fetch("delete.php", {
        method: 'POST',
        body: JSON.stringify(dataString),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(function (data) {
            data.success ? console.log("You have deleted event!") : console.log("You've not deleted event" + data.message);
            updateEvents();
            updateCalendar();
        })
        .catch(error => console.log("error" + error));
}


document.body.addEventListener('click', function (event) {
    if (event.srcElement.id == 'removeEvent_btn') {
        delete_event();
    };
}, false);

// EDITING PORITON
function edit_event() {
    //create a few metrics to make sure that we have the new info the user type in
    const IDOfTheOldEvent = document.getElementById("edit_name").value;
    const nameOfTheNewEvent = document.getElementById("new_event_name").value;
    const newDate = document.getElementById("new_event_date").value;
    const newTime = document.getElementById("new_event_time").value;
    const theDate = new Date(newDate);
    const year = theDate.getFullYear();
    const month = theDate.getMonth() + 1;
    const day = theDate.getDate() + 1;
    const dataString = { 'ID': IDOfTheOldEvent, 'year': year, 'month': month, 'day': day, 'newTime': newTime, 'newName': nameOfTheNewEvent };
    //we have to encode the dataString and convert it to JSON object by using AJAX
    console.log(dataString);
    fetch("editEvent.php", {
        method: 'POST',
        body: JSON.stringify(dataString),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(function (data) {
            data.success ? console.log("You have edited event!") : console.log("You've not edited event" + data.message);
            updateEvents();
            updateCalendar();
        })

        .catch(error => console.log("error" + error));
}


document.body.addEventListener('click', function (event) {
    if (event.srcElement.id == 'editEvent_btn') {
        document.getElementsByClassName('events')[1].innerHTML =
            `
      EDITING EVENTS
        <br />
        <label>New Time:<input type='time' id='new_event_time' /></label>
        <label>New Name:<input type='text' id='new_event_name' /></label>
        <label>New Date:<input type='date' id='new_event_date' /></label>
        <button id="edit_btn">EDIT</button>
      `
            ;
    };
}, false);

document.body.addEventListener('click', function (event) {
    if (event.srcElement.id == 'edit_btn') {
        edit_event();
    };
}, false);

//SHARING PORITON
function shareEvent() {
    const id = document.getElementById("share_name").value;
    const newUser = document.getElementById('share_username').value;
    const dataString = { 'eventId': id, 'newUsername': newUser };
    fetch('shareEvent.php', {
        method: 'POST',
        body: JSON.stringify(dataString),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(function (data) {
            data.success ? console.log("You have shared event!") : console.log("Event failed to share "+data.message);
        })
        .catch(error => console.log("error" + error));
}

document.body.addEventListener('click', function (event) {
    if (event.srcElement.id == 'shareEvent_btn') {
        document.getElementsByClassName('events')[2].innerHTML =
            `
      SHARING EVENTS
        <br />
        <label>Username:<input type='text' id='share_username' /></label>
        <button id="share_btn">Share</button>
      `
            ;
    };
}, false);

document.body.addEventListener('click', function (event) {
    if (event.srcElement.id == 'share_btn') {
        shareEvent();
    };
}, false);


//PUBLIC EVENTS
function addPublicEvent() {
    const name = document.getElementById('publicEvent_name').value;
    const time = document.getElementById('publicEvent_time').value;
    const date = document.getElementById('publicEvent_date').value;
    const theDate = new Date(date);
    const year = theDate.getFullYear();
    const month = theDate.getMonth() + 1;
    const day = theDate.getDate() + 1;
    const data = { 'time': time, 'name': name, 'day': day, 'year': year, 'month': month };
    fetch("publicEvent.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(function (data) {
            data.success ? console.log("You've added a public event!") : console.log("You've not added event" + data.message);
            updateEvents();
            updateCalendar();
        })
        .catch(error => console.log("error" + error))
}

document.getElementById('addPublicEvent_btn').addEventListener('click',function(event){
    addPublicEvent();
},false);