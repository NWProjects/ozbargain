require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const port = 9090
const expressLayouts = require('express-ejs-layouts')
const logger = require('./middlewares/logger')
const methodOverride = require('method-override')
const db = require('./db')
const session = require('express-session')
const setCurrentUser = require('./middlewares/set_current_user')


app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(logger)
app.use(session({
    secret:'mistyrose', 
    resave: false,
    saveUninitialized: true
}))
app.use(setCurrentUser)
app.use(expressLayouts)
app.use(express.urlencoded({extended: true}))


app.get('/', (req,res) => {
    console.log(req.session.userId);
    db.query('select * from deals;', (err, result) => {
        if(err){
            console.log(err);
        }

        let deals = result.rows

        res.render('home', {deals: deals})
    })
})

app.get('/deals', (req,res) => {
    db.query('select * from deals;', (err, result) => {
        if(err){
            console.log(err);
        }

        let deals = result.rows

        res.render('index', {deals: deals})
    })
})

app.get('/deals/new', (req,res) => {
    res.render('new_deal_form')
})

app.post('/deals', (req, res) => {
    let title = req.body.title
    let merchant = req.body.merchant
    let originalPrice = parseFloat(req.body.original_price)
    let salePrice = parseFloat(req.body.sale_price)
    let coupon = req.body.coupon
    let url = req.body.url
    let imageUrl = req.body.image_url
    let startDate = req.body.start_date
    let endDate = req.body.end_date
    let category = req.body.category
    let description = req.body.description

    const sql = `
    insert into deals 
    (title, merchant, original_price, sale_price, coupon, url, image_url, start_date, end_date, category, description) 
    values 
    ($1, $2, $3, $4, $5, $6, $7,$8,$9, $10, $11);`
    
    db.query(sql,[title, merchant, originalPrice, salePrice, coupon, url, imageUrl, startDate, endDate, category, description], (err,result) => {
        if(err){
            console.log(err);
        }
        res.redirect('/deals')
    })
})

app.get('/deals/:id', (req, res) => {
    let id = req.params.id
    db.query(`select * from deals where id = ${id};`, (err, result) => {
        if(err){
            console.log(err);
        }
        let deal = result.rows[0]

        res.render('info', {deal:deal})
    })
})

app.delete('/deals/:id', (req, res)=>{
    const sql = `
    DELETE FROM deals WHERE id = $1 RETURNING *;
  `

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log(err)
    }

    console.log(result.rows)

    res.redirect('/deals')
  })
})

app.put('/deals/:id', (req, res) => {
    let title = req.body.title;
    let merchant = req.body.merchant;
    let originalPrice = parseFloat(req.body.original_price);
    let salePrice = parseFloat(req.body.sale_price);
    let coupon = req.body.coupon;
    let url = req.body.url;
    let imageUrl = req.body.image_url;
    let startDate = req.body.start_date;
    let endDate = req.body.end_date;
    let category = req.body.category;
    let description = req.body.description; 

    const sql = `
        UPDATE deals
        SET 
            title = $1, 
            merchant = $2, 
            original_price = $3, 
            sale_price = $4, 
            coupon = $5, 
            url = $6, 
            image_url = $7, 
            start_date = $8, 
            end_date = $9,
            category = $10,
            description = $11
        WHERE id = $12;
    `;

    const values = [title, merchant, originalPrice, salePrice, coupon, url, imageUrl, startDate, endDate, category, description, req.params.id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect(`/deals/${req.params.id}`);
        }
    });
});


app.get('/deals/:id/edit', (req,res) =>{
    let id = req.params.id
    db.query(`select * from deals where id = ${id};`, (err, result) => {
        if(err){
            console.log(err);
        }
        let deal = result.rows[0]

        res.render('edit_deal_form', {deal:deal})
    })
})

app.get('/login', (req, res) =>{
    res.render('login')
})

app.post('/login', (req,res) =>{
    const sql = `
        select * from users 
        where email = '${req.body.email}'
    `
    db.query(sql, (err, result) => {
        //check user exist in database
        if(err){
            console.log(err);
            res.render('login')
            return
        } 

        if(result.rows.length === 0){
            console.log('user not fonud');
            res.render('login')
            return
        }
        
        //check password
        const plaintextPass = req.body.password

        const hashedPass = result.rows[0].password_digest
        bcrypt.compare(plaintextPass, hashedPass, (err,isCorrect) =>{
            if(!isCorrect){
                console.log('password not match');
                res.render('login')
                return
            }

            req.session.userId = result.rows[0].id
            res.redirect('/')
        })

    })
})

app.delete('/logout', (req, res) => {
    req.session.userId = null
    res.redirect('/login')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})