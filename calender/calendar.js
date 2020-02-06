document.addEventListener("DOMContentLoaded", updateCalendar, false);
document.addEventListener("DOMContentLoaded", updateEvents, false);

(function () { Date.prototype.deltaDays = function (c) { return new Date(this.getFullYear(), this.getMonth(), this.getDate() + c) }; Date.prototype.getSunday = function () { return this.deltaDays(-1 * this.getDay()) } })();
function Week(c) { this.sunday = c.getSunday(); this.nextWeek = function () { return new Week(this.sunday.deltaDays(7)) }; this.prevWeek = function () { return new Week(this.sunday.deltaDays(-7)) }; this.contains = function (b) { return this.sunday.valueOf() === b.getSunday().valueOf() }; this.getDates = function () { for (var b = [], a = 0; 7 > a; a++)b.push(this.sunday.deltaDays(a)); return b } }
function Month(c, b) { this.year = c; this.month = b; this.nextMonth = function () { return new Month(c + Math.floor((b + 1) / 12), (b + 1) % 12) }; this.prevMonth = function () { return new Month(c + Math.floor((b - 1) / 12), (b + 11) % 12) }; this.getDateObject = function (a) { return new Date(this.year, this.month, a) }; this.getWeeks = function () { var a = this.getDateObject(1), b = this.nextMonth().getDateObject(0), c = [], a = new Week(a); for (c.push(a); !a.contains(b);)a = a.nextWeek(), c.push(a); return c } };

//Setting up current month and posting month/year as header
var currentMonth = new Month(2019, 9);
document.getElementsByClassName('month_year')[0].innerHTML = `<h1>${nameMonth(currentMonth.month)}` + " " + `${currentMonth.year}</h1>`;

// Change the month when the "next" button is pressed
document.getElementById("next_month_btn").addEventListener("click", function (event) {
    currentMonth = currentMonth.nextMonth();
    updateCalendar();
    updateEvents();
    document.getElementsByClassName('month_year')[0].innerHTML = `<h1>${nameMonth(currentMonth.month)}` + " " + `${currentMonth.year}</h1>`;
}, false);

// Change the month when the 'prev' button is pressed
document.getElementById("prev_month_btn").addEventListener("click", function (event) {
    currentMonth = currentMonth.prevMonth();
    updateCalendar();
    updateEvents();
    document.getElementsByClassName('month_year')[0].innerHTML = `<h1>${nameMonth(currentMonth.month)}` + " " + `${currentMonth.year}</h1>`;
}, false);

// Actually Updating the calendar 
function updateCalendar() {
    var weeks = currentMonth.getWeeks();
    var x = 0;
    document.getElementsByClassName('dates')[0].innerHTML = '';

    for (var w in weeks) {
        var days = weeks[w].getDates();

        for (var d in days) {
            if (days[d].getMonth() != currentMonth.month) {
                document.getElementsByClassName('dates')[0].innerHTML += `<button class='days'></button>`;
            } else {
                x++;

                document.getElementsByClassName('dates')[0].innerHTML += `<button class='days' id ='day${x}'value=${days[d].getDate()}>${days[d].getDate()}</button>`;
            }

        }
    }
    day_button = document.getElementsByClassName('days');
    for (var i = 0; i < day_button.length; i++) {
        day_button[i].addEventListener("click", function (event) {
            if (this.value != '') {
                document.getElementsByClassName('events')[0].innerHTML =
                    `
                    ADDING EVENTS
                    <br />
                    <label>Time of event:<input type='time' id='event_time' /></label>
                    <label>Name of event:<input type='text' id='event_name' /></label>
                    <input type='date' id='event_date' value='${currentMonth.year}-${valFixer(parseInt(currentMonth.month + 1))}-${valFixer(this.value)}'/>
                    <button id="addEvent_btn">Add Event</button>`
                    ;
            }
        }, false);
        day_button[i].innerHTML = `${day_button[i].value}`;
    }
}

// Updating the events of the calendar 
function updateEvents() {
    const year = currentMonth.year;
    const month = currentMonth.month + 1;
    const dataString = { 'year': year, 'month': month };
    let events;
    fetch("events.php", {
        method: 'POST',
        body: JSON.stringify(dataString),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(function (results) {
            console.log(results)

            for (i in results) {
                day = results[i].day;
                time = results[i].time;
                id = results[i].id;
                document.getElementById("day" + day).innerHTML += "<br /> Name: " + results[i].name
                    + "<br /> Time: " + results[i].time + "<br /> --------- <br />";
                if (results[i].public == 0) {
                    document.getElementById("day" + day).innerHTML +=
                        `<input type='hidden' value='${id}' id='delete_name'/><button id="removeEvent_btn">X</button>` +
                        `<input type='hidden' value='${id}' id='edit_name'/><button id="editEvent_btn">Edit</button>
                    <input type='hidden' value='${id}' id='share_name'/><button id="shareEvent_btn">Share</button>`
                        + "<br />";
                }
            }
        })
        .catch(error => console.log("error" + error));
}


function nameMonth(month) {
    if (month == 0) {
        return 'January';
    }
    else if (month == 1) {
        return 'February';
    }
    else if (month == 2) {
        return 'March';
    }
    else if (month == 3) {
        return 'April';
    }
    else if (month == 4) {
        return 'May';
    }
    else if (month == 5) {
        return 'June';
    }
    else if (month == 6) {
        return 'July';
    }
    else if (month == 7) {
        return 'August';
    }
    else if (month == 8) {
        return 'September';
    }
    else if (month == 9) {
        return 'October';
    }
    else if (month == 10) {
        return 'November';
    }
    else if (month == 11) {
        return 'December';
    }
}

function valFixer(day) {
    if (day < 10) {
        return '0' + day;
    } else {
        return day;
    }
}