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
    res.sendFile(path.join(__dirname + '/index.html'));
});




const listTypes = [
    { table: 'ClassInMajor', id: 'majorId', },
    { table: 'ClassInMinor', id: 'minorId', },
    { table: 'Department', id: 'id', },
];

// Sets up the 4 year plan and initializes the two list views (major, core)
app.get('/createPlan', (req, res) => {
    let majorId = req.body.id;

    // collects all of the classes in that major. front-end should split them by what's in the view and what's on the schedule
    let majorViewQuery = 'select * from `Course` where id in (select classId from `ClassInMajor` where majorId=' + majorId;
    connection.query(majorViewQuery, (err, results) => {
        if (err) {
	    	console.log("Error ocurred.", err);
  	    	res.send({err});
        }
        else 
            res.send(results);
    });

    let coreViewQuery = 'select * from `Core`';
    connection.query(majorViewQuery, (err, results) => {
        if (err) {
	    	console.log("Error ocurred.", err);
  	    	res.send({err});
        }
        else 
            res.send(results);
    });

    // possible second approach to get classes that go in schedule
    // let majorScheduleQuery = ('select deptName, catalogNumber from Course where id in (select classId from `ClassInMajor` where isOnPlan=1 and majorId=' + majorId;
    // connection.query(majorScheduleQuery, (err, results) => {
    //     if (err) {
	//     	console.log("Error ocurred.", err);
  	//     	res.send({err});
    //     }
    //     else {
    //         res.send(results);
    //     }
    // });
});

// gets a list for a major [0], minor [1], or dept [1]
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

// listen
app.listen(port, () => console.log(`Server started on ${port}`));