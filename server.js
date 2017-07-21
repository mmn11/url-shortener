const express = require('express');
const app = express();
const bodyParser=require('body-parser')
const MongoClient= require('mongodb').MongoClient
const opn=require('opn')
//var openurl=require('openurl')

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

const mongoLink='mongodb://mm:12@ds141082.mlab.com:41082/mongopractice'
var db=

//opn('http://www.google.com').then(console.log,console.err);   
MongoClient.connect(mongoLink, (err,database)=>{
  db=database
  if(err) return console.log(err)
  console.log('connected')
  var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
})
// routes with array
// var urlRoutes=['/http://*', '/https://*']
// app.get(urlRoutes, (req, res)=>{
// //  console.log("http input")
//   console.log(req.params[0]+" params")
// //  require ("openurl").open('http://www.google.com/')
// //  var open = require("open");

//   res.redirect('/')
// })
  var arrayL=""

app.get('/http://*', (req, res)=>{
console.log(req.params)
  console.log('req params')

  db.collection('urls').find().toArray(function(err, result){
    console.log(result.length +"result length")

    return arrayL=result.length
    })
console.log(arrayL + " arry len")
  var urlCreator={name:'http://'+req.params[0], quote:req.params[0][0]+Math.floor(Math.random(2)*10)}
  
  
  db.collection('urls').save(urlCreator, (err,results)=>{
    if(err) return console.log(err)
  })
  console.log(req.body)
  res.redirect('/')
})

app.get('/https://*', (req, res)=>{
  console.log(req.params)
  console.log('req params')

  db.collection('urls').find().toArray(function(err, result){
    console.log(result.length +"result length")

    return arrayL=result.length
    })
console.log(arrayL + " arry len")
  var urlCreator={name:'https://'+req.params[0], quote:req.params[0][0]+Math.floor(Math.random(2)*10)}
  
  
  db.collection('urls').save(urlCreator, (err,results)=>{
    if(err) return console.log(err)
  })
  console.log(req.body)
  res.redirect('/')
})

app.get('/', (req, res)=> {
//  console.log(__dirname)
  db.collection('urls').find().sort({_id:-1}).toArray(function(err, result){
//    console.log(result)
    res.render('index.ejs', {urls: result})
  })
//  res.sendFile(__dirname + '/views/index.html');
//  res.sendFile(__dirname + '/index.html');
})

app.get('/*', (req,res)=>{
  var g =req.params[0]
  console.log(g)
  db.collection('urls').find({quote:g}).toArray(function(err, result){
    console.log("  * working")
    console.log(result[0]['name'])
    res.redirect(result[0]['name'])
//    'https://www.google.com/'
    res.end("Sorry not a short cut or valid web site")
   
  })

})



app.post('/url', (req, res) => {
  db.collection('urls').save(req.body, (err,results)=>{
    if(err) return console.log(err)
  })
  console.log(req.body)
  res.redirect('/')
})


