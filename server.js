var express = require('express'); 
var app = express();  
var port = 3000; 
var path = require("path");
var mysql = require('mysql');

// Create connection and connect to MySQL db
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'testdb'
});
connection.connect( (err) => {
    if (err) throw err;	
    console.log("Connected to MySQL database!");
});

// Renders the index.html
app.get('/', (req,res) => {    
    res.sendFile(path.join(__dirname + '/main-page.html'));
});

// Listen
app.listen(port, () => console.log(`Server started on ${port}`));


// Types of list view
const listTypes = [
    { table: 'ClassInMajor', id: 'majorId' },
    { table: 'ClassInMinor', id: 'minorId' },
    { table: 'Department', id: 'id' }
];

// Sets up the 4 year plan and initializes the two list views (major, core)
app.get('/createPlan', (req, res) => {
    let majorId = req.body.id;

    // Collects courses in the major view
    let majorViewQuery = 'select * from `Course` where id in (select classId from `ClassInMajor` where majorId=' + majorId;
    connection.query(majorViewQuery, (err, results) => {
        if (err) {
	    	console.log("Error ocurred.", err);
  	    	res.send({err});
        }
        else 
            res.send(results);
    });

    // Collects the core entries for the Core View
    let coreViewQuery = 'select * from `Core`';
    connection.query(coreViewQuery, (err, results) => {
        if (err) {
	    	console.log("Error ocurred.", err);
  	    	res.send({err});
        }
        else 
            res.send(results);
    });

    // Collects classes that go in 4 year schedule
    let majorScheduleQuery = 'select courseAbrreviation from `Course` where id in (select classId from `ClassInMajor` where isAutoSchedule=1 and majorId=' + majorId;
    connection.query(majorScheduleQuery, (err, results) => {
        if (err) {
	    	console.log("Error ocurred.", err);
  	    	res.send({err});
        }
        else {
            res.send(results);
        }
    });
});

// Gets a list view for a major [0], minor [1], or dept [1]
app.get('/getList', (req, res) => {
    let listObject = listTypes[req.body.index];
    let query = 'select * from `' +  listObject.table + '` where majorId=' + listObject.id;
    connection.query(query, (err, results) => {
        if (err) {
	    	console.log("Error ocurred.", err);
  	    	res.send({err});
        }
        else {
            res.send(results);
        }
    });
});
