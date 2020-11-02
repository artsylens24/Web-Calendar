const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const { query } = require("express");

// create a new Express app server object
const app = express();

app.use(express.static(__dirname))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// declare a constant for the PostgreSQL table
const tableName = `holidays`;
const port = process.env.port || 3456;

// get the path for the HTML file
const htmlPath = path.join(__dirname + "/index.html");

// create a new client instance with the pg Pool() method
const client = new Pool({
  user: "postgres",
  host: "localhost",
  database: "calendar",
  password: "postgres",
  port: "5432"
});


// 'GET' route for the web app
app.get("/", (req, resp) => {
  console.log(`req: ${req}`);
  console.log(`resp: ${resp}`);

  // send the HTML file back to the front end
  resp.sendFile(htmlPath);
});

app.get("/events", function(req, resp) {
  // parse the user's query
  let date = req.query.date;
  console.log(`${date}`);

  let query = `select employee_name from holidays where start_date <= $1 and end_date >= $1`;

  client
    .query(query, [date])

    .then(queryResp => {
      // access the "rows" Object attr
      resp.statusCode = 200;
      resp.json(queryResp.rows)    
    });
  
});


app.post("/events", function(req, resp) {
  // parse the user's query
  let userQuery = req.body
  console.log(`\nuserQuery: ${typeof userQuery}`);

    // concatenate an SQL string to SELECT the table column names
  let sqlColNames = `insert into holidays(start_date, end_date, employee_name, employee_emailId) values($1,$2,$3,$4)`;

  // create a Promise object for the query
  client
    .query(sqlColNames, [userQuery.start_date,userQuery.end_date, userQuery.Name, userQuery.Email])

    .then(rowsIns => {
      console.log(rowsIns);
      resp.statusCode = 201;
    });
  resp.redirect('/')
});


var server = app.listen(port, function() {
  console.log(
    `\nNode server is running on port: ${server.address().port}`
  );
});