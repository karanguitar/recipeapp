const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const dust = require('dustjs-helpers')
const cons = require('consolidate')
const knex = require('knex')


const postgres =  knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'recipebookdb'
    }
  });

const app = express();

app.engine('dust', cons.dust)
app.set('view engine', 'dust')
app.set('views', __dirname + '/views')

app.use(express.static(path.join(__dirname, '/public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    postgres.select().from('recipes')
    .then((recipe) => {
        console.log(recipe)
        res.render('index', {
            recipe: recipe           
        });
    })
    .catch((err) =>{
        console.log(err)
    })
})

app.listen(3050, function(){
    console.log('Server is on!')
})


