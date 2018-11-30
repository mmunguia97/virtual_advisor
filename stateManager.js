let majorId = 0;
let schedule = [];
let scheduleLength = 48;
let currentCourse;
let majorView;

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
        .then((data) => { 
            localStorage.setItem("queryResults", JSON.stringify(data));
            window.location = "webpages/main-page.html";
        });   
    }
};

getDroppedCourseTitle = (title) => {
    currentCourse = title;
};

getDroppedCourseId = (id) => {
    schedule[id] = currentCourse;
};

setSchedule = (queryResults) => {
    console.log("setting schedule..")
    let majorView = queryResults[2];
    console.log(majorView);
    for (var i=0;i<majorView.length;i++) {
        schedule[majorView[i].schedulePosition] = majorView[i];
    }
};

getSchedule = () => {
    console.log("using schedule...")
    console.log(schedule);
    return schedule;
}