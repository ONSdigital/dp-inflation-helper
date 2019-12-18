document.getElementById("fallback").style = "display:none";
document.getElementById("start-message").style = "display:";


const url = "https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/";

const productMeasure = {
    pension: "cpi",
    student: "rpi",
    rpi: "rpi",
    cpi: "cpi",
    cpih: "cpih"
};

const productMonth = {
    pension: 4,
    student: 3,
    rpi: "pickdate",
    cpi: "pickdate",
    cpih: "pickdate"
};

const inflationIDMap = {
    cpi: "d7g7",
    rpi: "czbh",
    cpih: "l55o"
};

const monthMap = {
    "1": "JAN",
    "2": "FEB",
    "3": "MAR",
    "4": "APR",
    "5": "MAY",
    "6": "JUN",
    "7": "JUL",
    "8": "AUG",
    "9": "SEP",
    "10": "OCT",
    "11": "NOV",
    "12": "DEC"
};

let releaseDate = ""
let today = new Date();

function start() {
    document.getElementById("start-message").style = "display:none";
    document.getElementById("js-enabled").style = "display:";
    document.getElementById("back").style = "display:";
}

//once selection is made hides the other branch or options
function hideOptionsPostSelection (measure) {
    document.getElementById("break").style = "display:none";
    if ((measure=="cpi")||(measure=="rpi")||(measure=="cpih")){
        console.log("Here")
        document.getElementById("knownPayments").style = "display:none";
    } else {
        document.getElementById("otherPayments").style = "display:none";
    }
    return;
}

//Adds the figure and description to the page once selections have been made
function addDataToPage(dataValue) {
    document.getElementById("number").innerHTML = dataValue.value + "%";
    document.getElementById("measure").innerHTML = "Displaying " + measure.toUpperCase() + " for " + dataValue.month + " " + dataValue.year;
    if (measure === "rpi") {
        document.getElementById("warning").innerHTML = "ONS does not recommend the use of RPI. For more information see <a href = 'https://www.ons.gov.uk/economy/inflationandpriceindices/articles/shortcomingsoftheretailpricesindexasameasureofinflation/2018-03-08' style = 'color:white;text-decoration: underline' > Shortcomings of the Retail Prices Index as a measure of inflation</a>"
    }
}