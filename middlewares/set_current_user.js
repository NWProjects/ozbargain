const db = require('../db')

function setCurrentUser(req, res, next){
    res.locals.currentUser = null

    if(!req.session.userId){
        return next()
    }
    
    const sql = `
        select * from users where id = $1;
    `

    db.query(sql, [req.session.userId], (err, result) => {
        if(err){
            console.log(err);
        }
        res.locals.currentUser = result.rows[0]
        next()
    })

}

module. exports = setCurrentUser