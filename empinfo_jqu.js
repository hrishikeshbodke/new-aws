//ass2 asynchronous req using jquery

var exp= require("express");
var mysql= require("mysql2");

var app=exp();
app.use(exp.static("scripts"));


// app.use("/emp",function(req,res,next) {


//     next();
// });

var conn= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456789",
    database:"knowitdb"
});

conn.connect(function(err){
    if(!err)
    {
        console.log("Connected to knowitdb");
    }
});

app.get("/empdetails", function(req, res) {
    var q="select * from emp where empno="+req.query.empno;
    // if(q=='undefine')
    // {
    //     console.log("id not found");
    // }
    conn.query(q, function(err,result) {
        if(!err)
        {
            res.write("<table border=1>");
            result.forEach( function(v) {
                res.write("<tr> <td>empNo is </td> <td>"+v.EMPNO+"</td></tr>");
                res.write("<tr> <td>empName is </td> <td> "+v.ENAME+"</td></tr>");
                res.write("<tr> <td>empJob is </td> <td> "+v.JOB+"</td></tr>");
                res.write("<tr> <td>empHireDate is </td> <td> "+v.HIREDATE+"</td><tr>");
            });
            res.write("</table");
            // res.end();
            if(result=="")
            {
                // res.writeHead();
                // res.writeHead(200,{'content-type':'text/html'});
                res.write("<p>Record not founds</p>");
                // res.end();
            //    console.log("recors not found");
            }
            res.end();
        }
        // if(result=="")
        // {
        //     // res.writeHead();
        //     // res.writeHead(200,{'content-type':'text/html'});
        //     res.send("<p>Record not founds</p>");
        //     // res.end();
        //     console.log("recors not found");
        // }

    });


});


app.get("/emp", function(req,res)  {
    res.sendFile(__dirname+"/2index.html");

});

app.all('*', function(req,res){
	res.send("Invalid URL !!!");
});

app.listen(9000, function() {console.log("Server start on 9000- ass2");  });