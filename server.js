var express = require('express'); 
var app = express();  
var port = 3000; 
var path = require("path");
  
app.listen(port, function(err) {  
    if (typeof(err) == "undefined") {  
        console.log('Your application is running on : ' + port + ' port');  
    }  
});  

app.get('/',function(req,res){    
    res.sendFile(path.join(__dirname+'/index.html'));
});