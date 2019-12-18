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