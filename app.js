


var fs = require('fs')
var mymodule = require('./mymodule.js')
var http = require('http')
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var express = require('express');
var index = require('./routes/index');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', index.home);

app.get('/DRulesCopy', index.DRulesCopy);
app.get('/DRulesQ2', index.DRulesQ2);
app.get('/DRulesQ', index.DRulesQ);
// app.get('/DRulesQ2', index.DRulesQ2);

app.get('/PrimeNumbers', index.PrimeNumbers);
app.get('/PrimeNumbersCopy', index.PrimeNumbersCopy);
app.get('/PrimeNumbersQ', index.PrimeNumbersQ);
app.get('/PrimeNumbersQ2', index.PrimeNumbersQ2);
app.get('/PrimeNumbersList', index.PrimeNumbersList);

app.get('/PTheoremCopy', index.PTheoremCopy);
app.get('/PTheoremQ', index.PTheoremQ);
app.get('/PTheoremFill', index.PTheoremFill);

app.get('/SquareNumbersMatch', index.SquareNumbersMatch);
app.get('/SquareNumbersCopy', index.SquareNumbersCopy);
app.get('/SquareTF', index.SquareTF);
app.get('/SquareNumbersQ', index.SquareNumbersQ);
app.get('/SquareNumbersList', index.SquareNumbersList);

app.get('/PropsQ', index.PropsQ);
app.get('/PropsQ2', index.PropsQ2);
app.get('/PropsExample', index.PropsExample);
app.get('/PropsQ3', index.PropsQ3);
app.get('/PropsStudy', index.PropsStudy);

app.get('/AnglesQ', index.AnglesQ);
app.get('/AnglesMatch', index.AnglesMatch);
app.get('/AnglesQ2', index.AnglesQ2);
app.get('/AnglesQ3', index.AnglesQ3);
app.get('/AnglesStudy', index.AnglesStudy);

app.get('/ProbQ', index.ProbQ);
app.get('/ProbQ2', index.ProbQ2);
app.get('/ProbTF', index.ProbTF);
app.get('/ProbQ3', index.ProbQ3);
app.get('/ProbStudy', index.ProbStudy);

app.get('/PercentQ', index.PercentQ);
app.get('/PercentQ2', index.PercentQ2);
app.get('/PercentQ3', index.PercentQ3);
app.get('/PercentMatch', index.PercentMatch);
app.get('/PercentStudy', index.PercentStudy);

app.get('/FractionGCFQ', index.FractionGCFQ);
app.get('/FractionLCMQ', index.FractionLCMQ);
app.get('/FractionImpQ', index.FractionImpQ);
app.get('/FractionQ', index.FractionQ);
app.get('/FractionQ2', index.FractionQ2);
app.get('/FractionStudy', index.FractionStudy);

app.get('/SequenceQ', index.SequenceQ);
app.get('/SequenceStudy', index.SequenceStudy);
app.get('/SequenceQ2', index.SequenceQ2);

app.get('/ExponentStudy', index.ExponentStudy);
app.get('/ExponentQ', index.ExponentQ);
app.get('/ExponentQ2', index.ExponentQ2);
app.get('/ExponentQ3', index.ExponentQ3);
app.get('/ExponentQ4', index.ExponentQ4);

app.get('/FreePass', index.FreePass);

app.get('/readingScores', index.readingScores);

app.get('/AllDone', index.AllDone);

app.get('/db', index.db)

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

//ONE WAY TO WRITE IT

// var server = http.createServer(function(request,response){

// console.log("We got one!")
// response.write("hi")
// response.end()

// });


// server.listen(3000);


//ONE WAY TO WRITE IT

// var server = http.createServer(function(request,response){



// });


// server.listen()



// //ONE WAY TO WRITE 

// //ONE WAY TO WRITE IT

// http.createServer(function (request, response) {
//    // Send the HTTP header 
//    // HTTP Status: 200 : OK
//    // Content Type: text/plain
//    response.writeHead(200, {'Content-Type': 'text/plain'});
   
//    // Send the response body as "Hello World"
//    response.end('Hello World\n');
// }).listen(8081);

// // Console will print the message
// console.log('Cook');



















//Server running at http://127.0.0.1:8081/


// function bar(callback){


//console.log("HELLO WORLD")

//var total = 0
//console.log(process.argv.length)
//for(i=2; i<process.argv.length;i++){
//	var n = Number(process.argv[i]);
//	total = total + n
//}

//console.log(total)


//NOTE. I AM NOT SURE WHAT IS HAPPENING HERE

// 	foo(function(err, data)){
// 		if(err){
// 			return callback(err)
// 				}
// 		var path = process.argv[2]
// 		var fil = process.argv[3]
// 		console.log(mymodule(path, fil,callback))
// 		callback(null, data)
		

// 	}

// }





//var fill = fs.readdir(path, callback)




