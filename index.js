const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cons = require('consolidate')
const dust = require('dustjs-helpers')
const pg = require('pg')

const app = express();

const conString = "postgres://:@localhost/recipebookdb"

app.engine('dust', cons.dust)
app.set('view engine', 'dust')
app.set('views', __dirname + '/views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    console.log('TEST')
    res.render('index')
})

app.listen(3000, function(){
    console.log('Server is on!')
})


