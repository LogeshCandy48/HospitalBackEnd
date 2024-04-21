const mysql = require("mysql");

const con = mysql.createPool({
    connectionLimit:10,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database  : process.env.DB_NAME
});


exports.view = (req, res) => {
    con.getConnection((err,connection) => {
        if (err) {
            throw err;
        }

        connection.query("SELECT * FROM users", (err, rows) => {
            connection.release();

            if (!err) {
                res.render("home", { rows });
            } else {
                console.log("Error: " + err);
                
                // Handle error, perhaps render an error page
                // res.render("error", { error: err });
            }
        });
    });
};



exports.adduser=(req,res)=>{
    res.render("adduser");
}

exports.save = (req, res) => {
    con.getConnection((err, connection) => {
        if (err) throw err;
        
        const { name, age, city } = req.body;

        connection.query("INSERT INTO users (NAME, AGE, CITY) VALUES (?, ?, ?)", [name, age, city], (err, result) => {
            connection.release();

            if (!err) {
                res.render("adduser",{msg:"user details added success"});
            } else {
                console.log("Error: " + err);
                // Handle error appropriately
                res.status(500).send("Error occurred while saving user.");
            }
        });
    });
};


exports.edituser=(req,res)=>{
    con.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        // get ID from url
        let id = req.params.id;

        connection.query("SELECT * FROM users where id=?",[id], (err, rows) => {
            connection.release();

            if (!err) {
                res.render("edituser",{rows});
            } else {
                console.log("Error: " + err);
             
            }
        });
    });
    
}

exports.edit = (req, res) => {
    con.getConnection((err, connection) => {
        if (err) throw err;
        
        const { name, age, city } = req.body;
        let id = req.params.id;
        connection.query("update users set NAME=? , AGE =?, CITY =? where ID=?", [name, age, city,id], (err, result) => {
            connection.release();

            if (!err) {
                res.render("adduser",{msg:"user details added success"});
            } else {
                console.log("Error: " + err);
                // Handle error appropriately
                res.status(500).send("Error occurred while saving user.");
            }
        });
    });
};



















// exports.view = (req,res)=>{
//     con.getConnection((err,connection)=>{
//         if(err) throw err
//         connection.query("select * from users",(err,rows)=>{
//             connection.release();
//             if(!err){
//                 res.render("home",{rows});
//             }
//             else{
//                 console.log("Error"+err)
//             }
//         });
     
//     });
//     res.render("home");
// };