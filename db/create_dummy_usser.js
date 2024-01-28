require('dotenv').config()
const bcrypt = require('bcrypt')
const db = require('./index.js')
const email = 'dt@ga.co'
const plaintextPass = 'pudding'
const saltRound = 10

bcrypt.genSalt(saltRound, (err,salt)=>{
    bcrypt.hash(plaintextPass, salt,(err,hashedPass)=>{
        const sql = `
            insert into users
            (email, password_digest)
            values
            ('${email}', '${hashedPass}')
            returning id;
            `
        db.query(sql, (err,result) => {
            if(err){
                console.log(err);
            } else{
                console.log("user created!");
                console.log(result.rows);
            }
        })
    })
})


