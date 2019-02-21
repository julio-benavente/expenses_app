
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let day = today.getDate();
// let selectYear = document.getElementById("year");
// let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
let monthAndYear2 = document.getElementById("monthAndYear2");

showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);

    show_income();
    show_expenses();
    show_balance();
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);

    show_income();
    show_expenses();
    show_balance();
}

// function jump() {
//     currentYear = parseInt(selectYear.value);
//     currentMonth = parseInt(selectMonth.value);
//     showCalendar(currentMonth, currentYear);
// }
var $transaction_day = $('#transaction_day');

function show_tansaction_day() {
    $transaction_day.css('display','block');
    // dia = this.innerText;
    day_selected = new Date(currentYear, currentMonth, day);
    document.getElementById('day_selected').innerHTML = day_selected.toDateString();
    document.getElementById('day_selected_2').innerHTML = day_selected.toDateString();
}


function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    monthAndYear2.innerHTML = months[month] + " " + year;
    // selectYear.value = year;
    // selectMonth.value = month;

    // creating all cells
    let date = 1;
    // let max = 6;
    for (let i = 0; i < 6; i++) {
        // creates a table row

        let row = document.createElement("tr");


        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                cell.classList.add('no_date');
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                last_empty = 7 - row.childElementCount;
                
                if (last_empty === 7) {
                    // max--;
                    break;

                }

                if (last_empty != 0) {
                    let cell = document.createElement("td");
                    cell.classList.add('no_date');
                    let cellText = document.createTextNode("");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    last_empty--;
                    // max--;
                } else {
                    if (row) {
                        let cell = document.createElement("td");
                        let cellText = document.createTextNode("");
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                        last_empty--;
                    }
                    // max--;
                    break;


                }
                
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date

                cell.classList.add('right_date');
                cell.addEventListener('click', function() {
                    day = this.innerText;
                    transaction_day(day);
                    show_tansaction_day();
                });

                

                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}


