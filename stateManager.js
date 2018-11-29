let majorId = 0;
let schedule = [];
let scheduleLength = 48;
let queryResults;
let currentCourse;

sendMajorId = () => {
    majorId = document.getElementById("major-options").value;
    if (majorId != 0)
    {
        fetch('http://localhost:3000/createPlan', {
            method: 'POST',
            body: JSON.stringify(majorId),
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }    
        })
        .then((res) => { return res.json() })
        .then((data) => { queryResults = data; autoPopulateSchedule()
        });   
    }
};

getDroppedCourseTitle = (title) => {
    currentCourse = title;
};

getDroppedCourseId = (id) => {
    console.log(id);
    schedule[id] = currentCourse;
    console.log(schedule);
};

autoPopulateSchedule = () => {
    console.log(queryResults);
    let majorView = queryResults[2];
    console.log(majorView);
    for (var i=0;i<majorView.length;i++) {
        schedule[majorView[i].schedulePosition] = majorView[i];
    }

    console.log(schedule);
    window.location = "webpages/main-page.html";
    alert("woooo");
};