// Starter code for express app from tutorial at following url:
// https://www.youtube.com/embed/T8mqZZ0r-RA?start_radio=1&t=97s&list=RDCMUC8S4rDRZn6Z_StJ-hh7ph8g

// .env set up following:
// https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/

const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require("mysql");
require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

// Middleware loaded from tutorial video to handle SQL
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// CREATE - Post message to browser after doing a test insert (based on tutorial example)
app.post('/api/insert', (req, res) =>{
    const categoryName = req.body.categoryName
    const sqlTaskCategoryInsert = "INSERT INTO `TaskCategories` (categoryName) VALUES (?);";
    db.query(sqlTaskCategoryInsert, [categoryName], (err, result)=> {
        console.log(result);
        res.send(result);
    })
})

// READ - Select
app.get('/api/get', (req, res) =>{
    const sqlTaskCategoryRead = "SELECT * FROM `TaskCategories`;";
    db.query(sqlTaskCategoryRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// UPDATE
app.put('/api/update', (req, res) =>{
    const idTaskCategory = req.body.idTaskCategory
    const categoryName = req.body.categoryName
    console.log(categoryName);
    const sqlTaskCategoryUpdate = `
    UPDATE TaskCategories
    SET     categoryName = ?
    WHERE idTaskCategory = ?;`;
    db.query(sqlTaskCategoryUpdate, [categoryName, idTaskCategory], (err, result)=> {
        if (err) console.log(err); else console.log(result);
        res.send(result);
    });
});

// DELETE
app.delete('/api/delete/:idTaskCategory', (req, res) =>{
    const idTaskCategory = req.params.idTaskCategory
    const sqlTaskCategoryDelete = `
    DELETE
    FROM TaskCategories
    WHERE idTaskCategory = ?`;
    db.query(sqlTaskCategoryDelete, idTaskCategory, (err, result)=> {
        if (err) console.log(err);
        res.send(result);
    });
});

// DELETE FROM FINAL DRAFT - 
// Test Connection to the MySQL server
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;}});



app.listen(process.env.PORT, () => {
    console.log(`running on port ${process.env.PORT}`);
});
