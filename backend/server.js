
const express=require("express");
const mysql=require('mysql');
const cors=require('cors');
const nodemailer = require('nodemailer');

const app=express();
app.use(cors());
app.use(express.json());


const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"cabinet"
})

app.post('/',(req,res)=>{
  const sql1 = "SELECT * FROM users WHERE `Email` = ?";
  db.query(sql1, [req.body.Email], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Email already exists");
    } else {
      const sql2 = "SELECT * FROM users WHERE `login` = ?";
      db.query(sql2, [req.body.login], (err, data) => {
        if (err) {
          return res.json("Error");
        }
        if (data.length > 0) {
          return res.json("Login already exists");
        } else {
          const sql ="INSERT INTO users (`login`,`password`,`name`,`surname`,`patronymic`,`Email`,`phone`,`datebirth`) VALUES (?)";
          const values=[
            req.body.login,
            req.body.password,
            req.body.name,
            req.body.surname,
            req.body.patronymic,
            req.body.email,
            req.body.Phone,
            req.body.datebirth
          ]
          db.query(sql,[values],(err,data)=>{
            if(err){
              return res.json("Error");
            }
            return res.json(data);
          })
        }
      })
    }
  })
}) 

  
app.post('/login',(req,res)=>{
    const sql ="SELECT * FROM users WHERE `login`= ?  AND `password`=?";
    db.query(sql,[req.body.login,req.body.password],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        if(data.length>0){
            return res.json("Success");
        }
        else{
            return res.json("Faile");
        }
    })
})

// define generateResetToken function
function generateResetToken() {
    const token = Math.random().toString(16).substring(2, 10);
    return token;
  }
  function sendResetLink(email, resetToken) {
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:'kruk39493@gmail.com',
      pass:'Kruk39!!'
    }
    });
    
    const mailOptions = {
    from: 'kruk39493@gmail.com',
    to: email,
    subject: 'Password Reset Link',
    text: `Your reset token is: ${resetToken}`
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
    console.log(err);
    } else {
    console.log('Email sent: ' + info.response);
    }
    });
    }

app.post('/forgot-password', (req, res) => {
    const sql = "SELECT * FROM `users` WHERE `Email` = ? ";
    const values=[
        req.body.email
    ]
    db.query(sql, [values], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      if (data.length === 0) {
        return res.json("User not found");
      } else {
        // generate reset token
        const resetToken = generateResetToken();
        
        // save reset token to database
        const updateSql = "UPDATE users SET `reset_token` = ? WHERE `id` = ?";
        db.query(updateSql, [resetToken, data[0].id], (err, result) => {
          if (err) {
            return res.json("Error");
          }
          
          // send email with reset link to user
          sendResetLink(req.body.email, resetToken);
          
          return res.json("Success");
        });
      }
    });
  });

  app.post('/reset-password', (req, res) => {
    const sql = "SELECT * FROM users WHERE `reset_token` = ?";
    const values=[
      req.body.resetToken
  ]
    db.query(sql, [values], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      if (data.length === 0) {
        return res.json("Invalid reset token");
      } else {
        // update user's password in the database
        const updateSql = "UPDATE users SET `password` = ? WHERE `reset_token` = ?";
        db.query(updateSql, [req.body.password,req.body.resetToken], (err, result) => {
          if (err) {
            return res.json("Error");
          }
          
          return res.json("Success");
        });
      }
    });
  }); 
  

  app.listen(8081,()=>{
    console.log("listening");
})

