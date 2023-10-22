var express = require('express');
var server = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var apiRouter = require('./controllers/routes/index').router;
var cors = require('cors');
var multer = require('multer')
// const path = require('path')
// create application/x-www-form-urlencoded parser
server.use(bodyParser.urlencoded({ extended:true }));
server.use(jsonParser);
const corsoptions = {
    origin : '*',
    Credential : true,
    // control-allow-Credential : true,
   optionsuccesstatus:200,
}
server.use(cors(corsoptions))
// server.use(bodyParser.urlencoded({ extended:true }));
// multipart/data
// server.use(upload.array()); 
server.use(express.static('public'));



server.get('/', function(req, res){
    res.setHeader('Content-Type','text/html');
    res.setHeader('FormData','text/html');
    res.status(200).send('</h1> Bonjour Jason </h1>');
});
server.use('/api/jask', apiRouter);
server.use(express.static('public'))
server.listen(8082, function(){
    console.log('server en écoute')
})
