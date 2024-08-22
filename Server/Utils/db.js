import mysql from 'mysql';

const conn = mysql.createConnection({
    host: "localhost",
    user:"root",
    passwoord:"",
    database: 'employeeMS'
})

conn.connect(function (err) {
    if(err){
        console.log("Connection Error")
    } else {
        console.log("Connected")
    }
})

export default conn;