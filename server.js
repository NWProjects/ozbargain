require('dotenv').config()
const express = require('express')
const app = express()
const port = 9090
const expressLayouts = require('express-ejs-layouts')
const logger = require('./middlewares/logger')
const methodOverride = require('method-override')
const db = require('./db')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(logger)
app.use(expressLayouts)
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('hello')
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

    const sql = `insert into deals 
    (title, merchant, original_price, sale_price, coupon, url, image_url, start_date, end_date, category, description) 
    values 
    ('${title}', '${merchant}', '${originalPrice}', '${salePrice}', '${coupon}', '${url}', '${imageUrl}', '${startDate}', '${endDate}', '${category}', '${description}');`
    
    db.query(sql, (err,result) => {
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

    const sql = `
      SELECT * FROM deals
      WHERE id = $1;
    `
  
    db.query(sql, [req.params.id], (err, result) => {
      if (err) {
        console.log(err)
      }
  
      let deal = result.rows[0]
      res.render('edit_deal_form', {deal:deal})
      
    })
  })

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})