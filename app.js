
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

var descriptions = require('./descriptions.js');
var profiles = require('./profiles.js');
var ids = require('./ids.js');
var names = require('./names.js');

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


app.get('/login', function(req, res, next){
  res.render('login', {"directions": constants.DIR.LOGIN, "title": constants.TITLE.LOG, "loginMessage": ""})
});

app.post('/login/submit',  urlencodedParser , function(req, res, next){
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
        res.redirect('/home/' + id + '/' + status)
      })
    })
  } 
});


app.get('/home/:id/:status', function(req, res, next){
  var status = req.params.status;
  console.log(status, 'AT HOMEE')
  var id = req.params.id;
  var avatar = GetProfileAvatarfromId(id);
  var description = GetProfileDescriptionfromId(id);
  var name = GetNameFromId(id);
  res.render('home' ,{
    "directions": constants.DIR.HOME,
    "title": constants.TITLE.HOM,
    "status": status,
    "id": id,
    "avatar" : avatar,
    "description" : description,
    "name": name
    })
});


app.post('/home/submit', function(req, res, next){
  console.log(req.body)
  var status = req.body.status;
  console.log(status, 'status at home submit')
  var id = req.body.id;
  if (!req.body) return res.sendStatus(400)
  if(id === null){
    console.log('STOPPED AT HOME SUBMIT')
  }else{
      var quiz = GetQuizFromStatus(status,'1');
      var newStatus = Number(status)+1;
      var newStatusString = newStatus.toString();
      res.redirect('/' + quiz +'/' + id + '/' + newStatusString)
    }
});


app.post('/quiz/submit', function(req, res, next){
  var status = req.body.status;
  var id = req.body.id;
  var missedQ = req.body.missedQ;
  var numberC = req.body.numberC;
  if (!req.body) return res.sendStatus(400)
  if(id === null){
    console.log('STOPPED AT HOME SUBMIT')
  }else{
      var quiz = GetQuizFromStatus(status)
      console.log(quiz, id, status, numberC, missedQ)
      res.redirect('/' + quiz +'/show/' + id + '/' + status + '/' + numberC + '/' + missedQ)
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

function GetProfileAvatarfromId(id){
  if (profiles[id] != undefined){
    return profiles[id];
  } else{
    return null;
  }
}

function GetProfileDescriptionfromId(id){
  if (descriptions[id] != undefined){
    return descriptions[id];
  } else{
    return null;
  }
}

function GetIdFromName(name){
  if (ids[name] != undefined){
    return ids[name];
  } else{
    return null;
  }
}

function GetNameFromId(id){
  if (names[id] != undefined){
    return names[id];
  } else{
    return null;
  }
}

function GetQuizFromStatus(status, addOne='2'){
  if(addOne==='1'){
    var newStatus = Number(status)+1;
    var newStatusString = newStatus.toString();
  }else if(addOne==='-1'){
    var newStatus = Number(status) - 1;
    var newStatusString = newStatus.toString()
  }else{
    var newStatus = Number(status);
    var newStatusString = newStatus.toString()
  }
  var quizzes = {
    '1' : 'PercentStudy',
    '2' : 'PercentMatch',
    '3' : 'PercentQ',
    '4' : 'PercentQ2',
    '5' : 'PercentQ3',
    '6' : 'PropsStudy',
    '7' : 'PropsExample',
    '8' : 'PropsQ',
    '9' : 'PropsQ2',
    '10' : 'PropsQ3',
    '11' : 'FreePass',
    '12' : 'DRulesCopy',
    '13' : 'DRulesQ',
    '14' : 'DRulesQ2',
    '15' : 'PrimeNumbersCopy',
    '16' : 'PrimeNumbers',
    '17' : 'PrimeNumbersQ',
    '18' : 'PrimeNumbersQ2',
    '19' : 'PrimeNumbersList',
    '20' : 'ExponentStudy',
    '21' : 'ExponentQ',
    '22' : 'ExponentQ2',
    '23' : 'ExponentQ3',
    '24' : 'ExponentQ4',
    '25' : 'FractionStudy',
    '26' : 'FractionGCFQ',
    '27' : 'FractionLCMQ',
    '28' : 'FractionImpQ',
    '29' : 'FractionQ',
    '30' : 'FractionQ2',
    '31' : 'FreePass',
    '32' : 'SquareNumbersMatch',
    '33' : 'SquareNumbersCopy',
    '34' : 'SquareTF',
    '35' : 'SquareNumbersQ',
    '36' : 'SquareNumbersList',
    '37' : 'PTheoremCopy',
    '38' : 'PTheoremQ',
    '39' : 'PTheoremFill',
    '40' : 'AnglesStudy',
    '41' : 'AnglesMatch',
    '42' : 'AnglesQ',
    '43' : 'AnglesQ2',
    '44' : 'AnglesQ3',
    '45' : 'FreePass',
    '46' : 'ProbStudy',
    '47' : 'ProbQ',
    '48' : 'ProbQ2',
    '49' : 'ProbTF',
    '50' : 'ProbQ3',
    '51' : 'SequenceStudy',
    '52' : 'SequenceQ1',
    '53' : 'SequenceQ2',
    '54' : 'AllDone'
  }
  if (quizzes[newStatusString] != undefined){
    return quizzes[newStatusString];
  } else{
    return null;
  }
}


//app.get('/login', index.login);

// app.get('/home', function(req, res){
// console.log('ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
//   res.render("home",{"directions": constants.DIR.HOME, "title": constants.TITLE.HOM, "status": 3});
//   console.log(req)
//   // if (req.query.StatusUpdate == 100){
//   //   unLockQuiz(status)
//   // }
// });

app.get('/AngieBasoreKey', index.AngieBasoreKey);

app.get('/DRulesCopy/:id/:status', index.DRulesCopy);
app.get('/DRulesQ/:id/:status', index.DRulesQ);
app.get('/DRulesQ2/:id/:status', index.DRulesQ2);
// app.get('/DRulesQ2', index.DRulesQ2);

app.get('/PrimeNumbersCopy/:id/:status', index.PrimeNumbersCopy);
app.get('/PrimeNumbers/:id/:status', index.PrimeNumbers);
app.get('/PrimeNumbersQ/:id/:status', index.PrimeNumbersQ);
app.get('/PrimeNumbersQ2/:id/:status', index.PrimeNumbersQ2);
app.get('/PrimeNumbersList/:id/:status', index.PrimeNumbersList);

app.get('/PTheoremCopy/:id/:status', index.PTheoremCopy);
app.get('/PTheoremQ/:id/:status', index.PTheoremQ);
app.get('/PTheoremFill/:id/:status', index.PTheoremFill);

app.get('/SquareNumbersMatch/:id/:status', index.SquareNumbersMatch);
app.get('/SquareNumbersCopy/:id/:status', index.SquareNumbersCopy);
app.get('/SquareTF/:id/:status', index.SquareTF);
app.get('/SquareNumbersQ/:id/:status', index.SquareNumbersQ);
app.get('/SquareNumbersList/:id/:status', index.SquareNumbersList);

app.get('/PropsStudy/:id/:status', index.PropsStudy);
app.get('/PropsExample/:id/:status', index.PropsExample);
app.get('/PropsQ/:id/:status', index.PropsQ);
app.get('/PropsQ2/:id/:status', index.PropsQ2);
app.get('/PropsQ3/:id/:status', index.PropsQ3);

app.get('/AnglesQ/:id/:status', index.AnglesQ);
app.get('/AnglesMatch/:id/:status', index.AnglesMatch);
app.get('/AnglesQ2/:id/:status', index.AnglesQ2);
app.get('/AnglesQ3/:id/:status', index.AnglesQ3);
app.get('/AnglesStudy/:id/:status', index.AnglesStudy);

app.get('/ProbStudy/:id/:status', index.ProbStudy);
app.get('/ProbQ/:id/:status', index.ProbQ);
app.get('/ProbQ2/:id/:status', index.ProbQ2);
app.get('/ProbTF/:id/:status', index.ProbTF);
app.get('/ProbQ3/:id/:status', index.ProbQ3);

app.get('/PercentQ/:id/:status', index.PercentQ);
app.get('/PercentQ2/:id/:status', index.PercentQ2);
app.get('/PercentQ3/:id/:status', index.PercentQ3);
app.get('/PercentMatch/:id/:status', index.PercentMatch);
app.get('/PercentStudy/:id/:status', index.PercentStudy);

app.get('/FractionStudy/:id/:status', index.FractionStudy);
app.get('/FractionGCFQ/:id/:status', index.FractionGCFQ);
app.get('/FractionLCMQ/:id/:status', index.FractionLCMQ);
app.get('/FractionImpQ/:id/:status', index.FractionImpQ);
app.get('/FractionQ/:id/:status', index.FractionQ);
app.get('/FractionQ2/:id/:status', index.FractionQ2);

app.get('/SequenceQ/:id/:status', index.SequenceQ);
app.get('/SequenceStudy/:id/:status', index.SequenceStudy);
app.get('/SequenceQ2/:id/:status', index.SequenceQ2);

app.get('/ExponentStudy/:id/:status', index.ExponentStudy);
app.get('/ExponentQ/:id/:status', index.ExponentQ);
app.get('/ExponentQ2/:id/:status', index.ExponentQ2);
app.get('/ExponentQ3/:id/:status', index.ExponentQ3);
app.get('/ExponentQ4/:id/:status', index.ExponentQ4);

app.get('/FreePass/:id/:status', index.FreePass);

// app.get('/readingScores', index.readingScores);

app.get('/AllDone/:id/:status', index.AllDone);

/// Show Urls

app.get('/DRulesCopy/show/:id/:status/:numberC/:missedQ', index.DRulesCopyShow);
app.get('/DRulesQ/show/:id/:status/:numberC/:missedQ', index.DRulesQShow);
app.get('/DRulesQ2/show/:id/:status/:numberC/:missedQ', index.DRulesQ2Show);
// app.get('/DRulesQ2', index.DRulesQ2);

app.get('/PrimeNumbersCopy/show/:id/:status/:numberC/:missedQ', index.PrimeNumbersCopyShow);
app.get('/PrimeNumbers/show/:id/:status/:numberC/:missedQ', index.PrimeNumbersShow);
app.get('/PrimeNumbersQ/show/:id/:status/:numberC/:missedQ', index.PrimeNumbersQShow);
app.get('/PrimeNumbersQ2/show/:id/:status/:numberC/:missedQ', index.PrimeNumbersQ2Show);
app.get('/PrimeNumbersList/show/:id/:status/:numberC/:missedQ', index.PrimeNumbersListShow);

app.get('/PTheoremCopy/show/:id/:status/:numberC/:missedQ', index.PTheoremCopyShow);
app.get('/PTheoremQ/show/:id/:status/:numberC/:missedQ', index.PTheoremQShow);
app.get('/PTheoremFill/show/:id/:status/:numberC/:missedQ', index.PTheoremFillShow);

app.get('/SquareNumbersMatch/show/:id/:status/:numberC/:missedQ', index.SquareNumbersMatchShow);
app.get('/SquareNumbersCopy/show/:id/:status/:numberC/:missedQ', index.SquareNumbersCopyShow);
app.get('/SquareTF/show/:id/:status/:numberC/:missedQ', index.SquareTFShow);
app.get('/SquareNumbersQ/show/:id/:status/:numberC/:missedQ', index.SquareNumbersQShow);
app.get('/SquareNumbersList/show/:id/:status/:numberC/:missedQ', index.SquareNumbersListShow);

app.get('/PropsStudy/show/:id/:status/:numberC/:missedQ', index.PropsStudyShow);
app.get('/PropsExample/show/:id/:status/:numberC/:missedQ', index.PropsExampleShow);
app.get('/PropsQ/show/:id/:status/:numberC/:missedQ', index.PropsQShow);
app.get('/PropsQ2/show/:id/:status/:numberC/:missedQ', index.PropsQ2Show);
app.get('/PropsQ3/show/:id/:status/:numberC/:missedQ', index.PropsQ3Show);

app.get('/AnglesQ/show/:id/:status/:numberC/:missedQ', index.AnglesQShow);
app.get('/AnglesMatch/show/:id/:status/:numberC/:missedQ', index.AnglesMatchShow);
app.get('/AnglesQ2/show/:id/:status/:numberC/:missedQ', index.AnglesQ2Show);
app.get('/AnglesQ3/show/:id/:status/:numberC/:missedQ', index.AnglesQ3Show);
app.get('/AnglesStudy/show/:id/:status/:numberC/:missedQ', index.AnglesStudyShow);

app.get('/ProbStudy/show/:id/:status/:numberC/:missedQ', index.ProbStudyShow);
app.get('/ProbQ/show/:id/:status/:numberC/:missedQ', index.ProbQShow);
app.get('/ProbQ2/show/:id/:status/:numberC/:missedQ', index.ProbQ2Show);
app.get('/ProbTF/show/:id/:status/:numberC/:missedQ', index.ProbTFShow);
app.get('/ProbQ3/show/:id/:status/:numberC/:missedQ', index.ProbQ3Show);

app.get('/PercentQ/show/:id/:status/:numberC/:missedQ', index.PercentQShow);
app.get('/PercentQ2/show/:id/:status/:numberC/:missedQ', index.PercentQ2Show);
app.get('/PercentQ3/show/:id/:status/:numberC/:missedQ', index.PercentQ3Show);
app.get('/PercentMatch/show/:id/:status/:numberC/:missedQ', index.PercentMatchShow);
app.get('/PercentStudy/show/:id/:status/:numberC/:missedQ', index.PercentStudyShow);

app.get('/FractionStudy/show/:id/:status/:numberC/:missedQ', index.FractionStudyShow);
app.get('/FractionGCFQ/show/:id/:status/:numberC/:missedQ', index.FractionGCFQShow);
app.get('/FractionLCMQ/show/:id/:status/:numberC/:missedQ', index.FractionLCMQShow);
app.get('/FractionImpQ/show/:id/:status/:numberC/:missedQ', index.FractionImpQShow);
app.get('/FractionQ/show/:id/:status/:numberC/:missedQ', index.FractionQShow);
app.get('/FractionQ2/show/:id/:status/:numberC/:missedQ', index.FractionQ2Show);

app.get('/SequenceQ/show/:id/:status/:numberC/:missedQ', index.SequenceQShow);
app.get('/SequenceStudy/show/:id/:status/:numberC/:missedQ', index.SequenceStudyShow);
app.get('/SequenceQ2/:id/show/:id/:status/:numberC/:missedQ', index.SequenceQ2Show);

app.get('/ExponentStudy/show/:id/:status/:numberC/:missedQ', index.ExponentStudyShow);
app.get('/ExponentQ/show/:id/:status/:numberC/:missedQ', index.ExponentQShow);
app.get('/ExponentQ2/show/:id/:status/:numberC/:missedQ', index.ExponentQ2Show);
app.get('/ExponentQ3/show/:id/:status/:numberC/:missedQ', index.ExponentQ3Show);
app.get('/ExponentQ4/show/:id/:status/:numberC/:missedQ', index.ExponentQ4Show);

app.get('/FreePass/show/:id/:status/:numberC/:missedQ', index.FreePassShow);

// app.get('/readingScores', index.readingScores);

app.get('/AllDone/show/:id/:status/:numberC/:missedQ', index.AllDoneShow);











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
