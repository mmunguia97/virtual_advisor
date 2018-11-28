let majorId = 0;
let schedule = [];
let scheduleLength = 48;
let queryResults;

sendMajorId = () => {
    majorId = document.getElementById("major-options").value;
    if (majorId != 0)
    {
        window.location = "webpages/main-page.html";
        fetch('http://localhost:3000/createPlan', {
            method: 'POST',
            body: JSON.stringify(majorId),
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }    
        })
        .then((res) => { return res.json() })
        .then((data) => { queryResults = data; 
        });   
    }
}

autoPopulateSchedule = () => {
    for (var i=0; i<scheduleLength; i++){
        //if 
    }
    console.log(data);
    alert("woooo");
};