var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
  
// default route
app.get('/', function (req, res) {
    return res.send({  message: '111752 lab 7 node js CRUD operations' })
});
// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'students'
});
  
// connect to database
dbConn.connect(); 
 
 
// Retrieve all students
app.get('/students', function (req, res) {
    dbConn.query('SELECT * FROM students_table', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'students already in the database' });
    });
});
 
 
// Retrieve student with id 
app.get('/students/:id', function (req, res) {
  
    let student_id = req.params.id;
  
    if (!student_id) {
        return res.status(400).send({ error: true, message: 'Please provide student_id' });
    }
  
    dbConn.query('SELECT * FROM students_table where id=?', student_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'individual student has been selected' });
    });
  
});
 
 
// Add a new stuednt
app.post('/student', function (req, res) {

    let student_name = req.body.name;
    let student_email = req.body.email;
  
    if (!student_name||student_email) {
        return res.status(400).send({  message: 'Please provide student name and email' });
    }
  
    dbConn.query("UPDATE students_table (name,email) VALUES(?, ?)", [student_name,student_email], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
});
 
 
//  Update 
app.put('/student', function (req, res) {
  
    let student_id = req.body.student_id;
    let user = req.body.user;
  
    if (!student_id || !user) {
        return res.status(400).send({ error: user, message: 'Please provide student and id' });
    }
  
    dbConn.query("UPDATE students_table SET user = ? WHERE id = ?", [user, student_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
});
 
 
//  Delete user
app.delete('/students', function (req, res) {
  
    let student_id = req.body.student_id;
  
    if (!student_id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
    }
    dbConn.query('DELETE FROM students_table WHERE id = ?', [student_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'student has been deleted successfully.' });
    });
}); 
 
// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;