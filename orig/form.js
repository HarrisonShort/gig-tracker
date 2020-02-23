function openGigForm(cell) {
    console.log('Opening Gig Form');
    document.getElementById('gigFormDiv').style.display = "block";
    document.getElementById('dateHeader').innerHTML = cell.innerHTML + ' ' + months[currentMonth] + ' ' + currentYear;
}

function closeGigForm() {
    document.getElementById('gigFormDiv').style.display = "none";
    resetForm();
}

function resetForm() {

}

function changeToTourName(isGig) {
    if (isGig) {
        document.getElementById('tourNameLabel').innerHTML = "Tour Name"
    } else {
        document.getElementById('tourNameLabel').innerHTML = "Festival Name"
    }
}

// mongodb+srv://HarrisonShort:KuPin4PYPWCnHMcq@gigtrackercluster-zfoj8.mongodb.net/test?retryWrites=true&w=majority