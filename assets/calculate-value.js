//Takes a measure of inflation and gets the CDID
function getCDID(measure) {
    cdid = inflationIDMap[measure];
    return cdid;
}

//Get the time series data for the series related to the one selected
function getDataforSeries(cdid) {
    return fetch(url + cdid + "/data", {
            mode: "cors"
        })
        .then(response => response.json())
        .then(response => {
            //Date does not include a useful time element so just take the date bit.
            const releaseDate = response.description.releaseDate.split("T")[0].replace(/-/g, "");
            const timeSeriesDataMonths = response.months;
            return {
                data: timeSeriesDataMonths,
                date: releaseDate
            };
        }).catch(error => {
            console.error(error)
            return;
        })
}

function getYearNeededFromSeries(timeSeries, monthNeeded, today) {
    currentYear = today.getFullYear()
    const thisYear = timeSeries.data.find(({
        date
    }) => date === currentYear + " " + monthNeeded.text);
    if (thisYear != null) {
        return currentYear
    } else {
        //didnt find current year so return last year
        return currentYear - 1
    }
}

//Once we have all the info return just the data we need to provide to user
function getDataValueforUser(yearNeeded, timeSeries, monthNeeded) {
    let dateNeeded = yearNeeded + " " + monthNeeded.text
    const dataValue = timeSeries.data.find(({
        date
    }) => date === dateNeeded);
    return dataValue
}