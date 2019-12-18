//gives us the inflation measure a user needs and gets the date or asks user for it
async function getInflationMeasureAndDate(data) {

    hideOptionsPostSelection (data)
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