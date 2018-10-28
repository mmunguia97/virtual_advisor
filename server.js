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
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/createPlan', (req, res) => {
    let major = req.body;
    
    connection.query('select classId in `ClassInMajor` from where isRequired=1;', (err, result) => {
        if (err) {
	    	console.log("Error ocurred.", err);
  	    	res.send({err});
        }
        else {

        }
    });
});

// listen
app.listen(port, () => console.log(`Server started on ${port}`));