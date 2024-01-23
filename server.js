const express = require('express')
const app = express()
const port = 9090
const expressLayouts = require('express-ejs-layouts')
const pg = require('pg')
const client = new pg.Client({
    database: 'ozbargain'
})

client.connect()
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(expressLayouts)

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/deals', (req,res) => {
    client.query('select * from deals;', (err, result) => {
        if(err){
            console.log(err);
        }

        let deals = result.rows

        client.end()
    })

    res.render('index', {deals: []})
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})