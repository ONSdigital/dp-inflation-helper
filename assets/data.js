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
    
}

//gives us the inflation measure a user needs and gets the date or asks user for it
async function getInflationMeasureAndDate(data) {
    const measure = await setMeasure(data);
    const monthNeeded = await workOutMonthNeeded(data);

    //only contine if we no the month, otherwise wait for user input
    if (monthNeeded.text != null) {
        getInflationFigure()
    }
    return measure
}

//function for after we know what date a user needs
async function getInflationFigure() {
    const cdid = await getCDID(measure);
    const timeSeries = await getDataforSeries(cdid);
    const yearNeeded = await getYearNeededFromSeries(timeSeries, monthNeeded, today)
    const dataValue = await getDataValueforUser(yearNeeded, timeSeries, monthNeeded);
    addDataToPage(dataValue)
}