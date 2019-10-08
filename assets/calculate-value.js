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

//The year may be this year or last year depending on where we are and what has been published
function getYearNeededFromSeries(timeSeries, monthNeeded, today) {

    let publishedYear = timeSeries.date.substring(0, 4);
    let publishedMonth = timeSeries.date.substring(4, 6);
    let publishedDay = timeSeries.date.substring(6, 8);
    let timeSeriesDate = new Date(publishedYear, publishedMonth - 1, publishedDay, "09", "30");

    //logic to work out if you need this years or last years figure based on current date and publish date
    if (monthNeeded.integer - publishedMonth >= 0) {
        yearNeeded = publishedYear - 1
        return yearNeeded

        //deal with the case of if being this month
    } else if ((monthNeeded.integer - publishedMonth) === 0) {
        if (today - timeSeriesDate > 0) {
            yearNeeded = publishedYear - 1
            return yearNeeded
        } else {
            yearNeeded = publishedYear
            return yearNeeded
        }
    } else {
        yearNeeded = publishedYear
        return yearNeeded
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