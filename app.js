
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
var USERS = require('./users.js');
var app = express();

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
//app.get('/', index.home);


var router = express.Router();
var constants = require('./constants');
var pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:2200';
const results = [];
const client = new pg.Client(connectionString);

// app.post('/login', urlencodedParser, function (req, res, next) {
//   if (!req.body) return res.sendStatus(400)
//   var name = CleanLoginAndSend(req.body.firstname);
//   var id = GetIdFromName(name);
//   if(id === null){
//     res.render("login",{"directions": constants.DIR.LOGIN_ERROR, "title": constants.TITLE.LOG, "loginMessage": "That username was not found.", "sendMessage" : false});
//   }else{
//     // TODO: IMPORT THE DB FUNCTION FROM A DIFFRENT FILE
//     pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//    	if(err) {
//       done();
//       return res.status(500).json({success: false, data: err});
//       }
//       client.query('SELECT * FROM users WHERE user_id=$1', [id] , function(err, result) {
//         done()
//   	     var status = result.rows[0].status;
//           //res.render("home",{"directions": constants.DIR.HOME, "title": constants.TITLE.HOM, "status": status});
//           //app.get('/home', index.home);
//           // unLockQuiz(status
//         // if (req.query.StatusUpdate == 'KEY'){
//         // unLockQuiz(1)
//         // }
//         res.render("login",{"directions": constants.DIR.LOGIN_ERROR, "title": constants.TITLE.LOG , "sendMessage" : true});
//           //res.render("home",{"directions": constants.DIR.HOME, "title": constants.TITLE.HOM, "status": status});
//       })
// 	  });

//     //res.render("home",{"directions": constants.DIR.HOME, "title": constants.TITLE.HOM, "status":status, "id": id});
//   };
//  // next()
//   //console.log('eeeeeeeeeeeeeeeeeeeeeeee')
//     //res.render("home",{"directions": constants.DIR.HOME, "title": constants.TITLE.HOM, "status": 4});
// }
 // function(req, res){
 //  const status = 3;
  // res.render("home",{"directions": constants.DIR.HOME, "title": constants.TITLE.HOM, "status": status});
  // //if (req.query.StatusUpdate == 100){
  //   console.log(req, 'kkkkk')
  //   unLockQuiz(status)
  //}
//}
// )


router.get('/login', function(req, res, next){
  console.log('here at 111111111111111111111111')
  res.render('login', {"directions": constants.DIR.LOGIN, "title": constants.TITLE.LOG, "loginMessage": ""})
});

router.post('/login/submit',  urlencodedParser , function(req, res, next){
  console.log('here at 2222222222222222222222222222222')
  if (!req.body) return res.sendStatus(400)
  var name = CleanLoginAndSend(req.body.firstname);
  var id = GetIdFromName(name);
  if(id === null){
    res.render("login",{"directions": constants.DIR.LOGIN_ERROR, "title": constants.TITLE.LOG, "loginMessage": "That username was not found.", "sendMessage" : false});
  }else{
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      done();
      return res.status(500).json({success: false, data: err});
      }
    client.query('SELECT * FROM users WHERE user_id=$1', [id] , function(err, result) {
      done()
      var status = result.rows[0].status;
      //res.render("login",{"directions": constants.DIR.LOGIN_ERROR, "title": constants.TITLE.LOG });
      res.redirect('/home/' + id + '/' + status)
    }
    }
  }
});

router.get('/home/:id/:status', function(req, res, next){
    console.log('here at 3333333333333333333333333333333333')
  res.render('/home' ,{"directions": constants.DIR.HOME, "title": constants.TITLE.HOM, "status": status})
});


router.post('/home/submit', function(req, res, next){
    console.log('here at 444444444444444444444444444444444444')
  if (!req.body) return res.sendStatus(400)
  if(id === null){
    console.log('STOPPED AT HOME SUBMIT')
  }else{
      var quiz = GetQuizFromStatus(status)
      res.redirect('/' + quiz +'/' + id + '/' + status)
    }
  }
});



function CleanLoginAndSend(name){
  name = name.toUpperCase().trim();
  return name
}

function unLockQuiz(status){
  console.log('made it hererere', status)
  var quiz = GetQuizFromStatus(status)
  app.get('/Quiz', quiz)
}

function GetIdFromName(name){
  var userNames = {
    'EUCLID':'1',
    'NEWTON':'2',
    'ARCHIMEDES':'3',
    'GAUSS': '4',
    'DESCARTES' : '5',
    'FERMAT' : '6',
    'EULER' : '7',
    'EINSTEIN' : '8',
    'LEIBNIZ' : '9',
    'HILBERT' : '10',
    'PASCAL' : '11',
    'TURING ' : '12',
    'RAMANUJAN' : '13',
    'RIEMANN' : '14',
    'NEUMANN' : '15',
    'PTOLEMY' : '16',
    'ARYABHATA': '17',
    'CANTOR':'18',
    'GERMAIN ': '19',
    'ADA' : '20',
    'NOETHER': '21'
  }
  if (userNames[name] != undefined){
    return userNames[name];
  } else{
    return null;
  }
}

function GetQuizFromStatus(status){
  status = status.toString()
  var quizzes = {
    '1' : index.PercentStudy,
    '2' : index.PercentMatch,
    '3' : index.PercentQ1,
    '4' : index.PercentQ2,
    '5' : index.PercentQ3,
    '6' : index.PropsStudy,
    '7' : index.PropsExample,
    '8' : index.PropsQ1,
    '9' : index.PropsQ2,
    '10' : index.PropsQ3,
    '11' : index.PropsQ4,
    '12' : index.FreePass,
    '13' : index.DRulesCopy,
    '14' : index.DRulesQ,
    '15' : index.DRulesQ2,
    '16' : index.PrimeNumbersCopy,
    '17' : index.PrimeNumbers,
    '18' : index.PrimeNumbersQ,
    '19' : index.PrimeNumbersQ2,
    '20' : index.PrimeNumbersList,
    '21' : index.ExponentStudy,
    '22' : index.ExponentQ,
    '23' : index.ExponentQ2,
    '24' : index.ExponentQ3,
    '25' : index.ExponentQ4,
    '26' : index.FractionStudy,
    '27' : index.FractionGCFQ,
    '28' : index.FractionLCMQ,
    '29' : index.FractionImpQ,
    '30' : index.FractionQ,
    '31' : index.FractionQ2,
    '32' : index.FreePass,
    '33' : index.SquareNumbersMatch,
    '34' : index.SquareNumbersCopy,
    '35' : index.SquareTF,
    '36' : index.SquareNumbersQ,
    '37' : index.SquareNumbersList,
    '38' : index.PTheoremCopy,
    '39' : index.PTheoremQ,
    '40' : index.PTheoremFill,
    '41' : index.AnglesStudy,
    '42' : index.AnglesMatch,
    '43' : index.AnglesQ,
    '44' : index.AnglesQ2,
    '45' : index.AnglesQ3,
    '46' : index.FreePass,
    '47' : index.ProbStudy,
    '48' : index.ProbQ,
    '49' : index.ProbQ2,
    '50' : index.ProbTF,
    '51' : index.ProbQ3,
    '49' : index.SequenceStudy,
    '50' : index.SequenceQ1,
    '51' : index.SequenceQ2,
    '52' : index.AllDone
  }
  if (quizzes[status] != undefined){
    return quizzes[status];
  } else{
    return null;
  }
}


app.get('/login', index.login);

app.get('/home', function(req, res){
console.log('ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
  res.render("home",{"directions": constants.DIR.HOME, "title": constants.TITLE.HOM, "status": 3});
  console.log(req)
  // if (req.query.StatusUpdate == 100){
  //   unLockQuiz(status)
  // }
});

app.get('/DRulesCopy', index.DRulesCopy);
app.get('/DRulesQ', index.DRulesQ);
app.get('/DRulesQ2', index.DRulesQ2);
// app.get('/DRulesQ2', index.DRulesQ2);

app.get('/PrimeNumbersCopy', index.PrimeNumbersCopy);
app.get('/PrimeNumbers', index.PrimeNumbers);
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

app.get('/PropsStudy', index.PropsStudy);
app.get('/PropsExample', index.PropsExample);
app.get('/PropsQ', index.PropsQ);
app.get('/PropsQ2', index.PropsQ2);
app.get('/PropsQ3', index.PropsQ3);

app.get('/AnglesQ', index.AnglesQ);
app.get('/AnglesMatch', index.AnglesMatch);
app.get('/AnglesQ2', index.AnglesQ2);
app.get('/AnglesQ3', index.AnglesQ3);
app.get('/AnglesStudy', index.AnglesStudy);

app.get('/ProbStudy', index.ProbStudy);
app.get('/ProbQ', index.ProbQ);
app.get('/ProbQ2', index.ProbQ2);
app.get('/ProbTF', index.ProbTF);
app.get('/ProbQ3', index.ProbQ3);

app.get('/PercentQ', index.PercentQ);
app.get('/PercentQ2', index.PercentQ2);
app.get('/PercentQ3', index.PercentQ3);
app.get('/PercentMatch', index.PercentMatch);
app.get('/PercentStudy', index.PercentStudy);

app.get('/FractionStudy', index.FractionStudy);
app.get('/FractionGCFQ', index.FractionGCFQ);
app.get('/FractionLCMQ', index.FractionLCMQ);
app.get('/FractionImpQ', index.FractionImpQ);
app.get('/FractionQ', index.FractionQ);
app.get('/FractionQ2', index.FractionQ2);

app.get('/SequenceQ', index.SequenceQ);
app.get('/SequenceStudy', index.SequenceStudy);
app.get('/SequenceQ2', index.SequenceQ2);

app.get('/ExponentStudy', index.ExponentStudy);
app.get('/ExponentQ', index.ExponentQ);
app.get('/ExponentQ2', index.ExponentQ2);
app.get('/ExponentQ3', index.ExponentQ3);
app.get('/ExponentQ4', index.ExponentQ4);

app.get('/FreePass', index.FreePass);

// app.get('/readingScores', index.readingScores);

app.get('/AllDone', index.AllDone);

// app.get('/db', index.db)

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// app.listen(2200);


// var server = app.listen(8080,function(){
//     var host="127.0.0.1";
//     var port="8080";
//     console.log("App is listening at http://%s:%s\n",host,port);
// });

//ONE WAY TO WRITE IT

// var server = http.createServer(function(request,response){

// console.log("We got one!")
// response.write("hi")
// response.end()

// });


// server.listen(3000);


//ONE WAY TO WRITE IT

// var server = http.createServer(function(request,response){


  // if (!req.body) return res.sendStatus(400)
  // var name = CleanLoginAndSend(req.body.firstname);
  // pg.connect(connectionString, (err, client, done) => {
  //   // Handle connection errors
  //   if(err) {
  //     done();
  //     console.log(err);
  //     return res.status(500).json({success: false, data: err});
  //   }
  //   const query = client.query('SELECT * FROM items ORDER BY id ASC');
  //   // After all data is returned, close connection and return results
  //   query.on('end', () => {
  //     done();
  //     console.log(results)
  //     //return res.json(results);


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






  //client.query("SELECT status FROM users WHERE id = 1");
      // const query = client.query("SELECT status FROM users WHERE user_id = '1'"), function(err, result) {
      //  //console.log(result.rows[0],'9999999999999999')
      //   //var status = result.status;

       //  // query.on('row', (row) => {
       //  //   results.push(row);
       //  // });
       //  var status = String(results) + 'helllo'
      // const query = client.query("SELECT * FROM users WHERE user_id = '1'");
      // // Stream results back one row at a time
      // query.on('row', (row) => {
      //   results.push(row);
      // });
      // console.log(query)












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




// // create application/x-www-form-urlencoded parser 
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
// // POST /login gets urlencoded bodies 
// app.post('/login', urlencodedParser, function (req, res) {
//   if (!req.body) return res.sendStatus(400)
//   res.send('welcome, ' + req.body.username)
// })





// app.post('./routes/index', index.loginREC);


// app.get('/db', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM test_table', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        {app.get('/db', index.db); }
//     });
//   });
// });

// var db = function(req, res){
//   });
// };

//module.exports.db = db;

// pg.defaults.ssl = true;
// pg.connect(process.env.DATABASE_URL, function(err, client) {
//   if (err) throw err;
//   console.log('Connected to postgres! Getting schemas...');

//   client
//     .query('SELECT table_schema,table_name FROM information_schema.tables;')
//     .on('row', function(row) {
//       console.log(JSON.stringify(row));
//     });
// });


// const pg = require('pg');
// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

// const client = new pg.Client(connectionString);
// client.connect();
// const query = client.query(
//   'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// query.on('end', () => { client.end(); });
