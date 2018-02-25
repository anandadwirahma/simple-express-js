const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

MongoClient.connect('mongodb://ananda:ananda123@ds149974.mlab.com:49974/star-wars-quotes', (err,client) => {
    // Start the server
    if (err) return console.log(err)
    db = client.db('star-wars-quotes')
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})



//Get method in Express : app.get(path, callback)
app.get('/',(req,res) => {
    //res.send('Hello World')
    //res.sendFile(__dirname + '/views/index.html')
    // var cursor = db.collection('quotes').find().toArray(function(err, results){
    //     console.log(results)
    // })
    db.collection('quotes').find().toArray((err, results) => {
        if (err) return console.log(err)
        //render index.ejs
        res.render('index.ejs', {quotes: results})
    })
})

//-example method write in ES6 code
// app.get('/', (req,res) => {
//     res.send('Hello World')
// })

app.post('/quotes', (req,res) => {
    //console.log(req.body)
    db.collection('quotes').save(req.body, (err,result) =>{
        if (err) return console.log(err)
        
        console.log('save to database')
        res.redirect('/')
    })
})