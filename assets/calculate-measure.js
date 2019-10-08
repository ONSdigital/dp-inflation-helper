
//Takes choice made in select and returns the appropriate measure of Inflation
function setMeasure(data) {
    let choice = data;
    measure = productMeasure[choice];
    return measure;
}

//Takes choice made in select and returns the month figure related to that measure of inflation
function workOutMonthNeeded(data) {
    //look up month required
    month = productMonth[data];
    if (month === "pickdate") {
        askForDate();
    }
    monthNeeded = {
        text: monthMap[month],
        integer: month
    };
    return monthNeeded;
}

//Sometimes we cant automatically guess the date they need so ask for it
function askForDate() {
    document.getElementById("date").style = "";
    //User date selection will then kick off another function
}

function dateSelection(month) {
    monthNeeded = {
        text: monthMap[month],
        integer: month
    };
    getInflationFigure()
}