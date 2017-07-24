
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
var quizzes = require('./quizzes.js');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
// This line makes it so the documents can be .handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();
var constants = require('./constants');
var pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:2200';
const results = [];
const client = new pg.Client(connectionString);

app.get('/login', function(req, res, next){
  // handles the orginal login page
  res.render('login', {"directions": constants.DIR.LOGIN, "title": constants.TITLE.LOG, "loginMessage": ""})
});

app.post('/login/submit',  urlencodedParser , function(req, res, next){
  // on login submit, it send the user to the home page
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
  // apon being redirected by the login submit button it renders the home page
  var status = req.params.status;
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
  // apon home submit it send the user to the proper quiz
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
  // once on the right quiz path, it renders the correct quiz
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


app.get('/AngieBasoreKey', urlencodedParser , function(req, res, next){
  // dispalys the lasted scores for each student
  var resultingData = pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  if(err) {
    done();
    console.log('error')
    res.render("login",{"directions": constants.DIR.LOGIN_ERROR, "title": constants.TITLE.LOG, "loginMessage": "That username was not found.", "sendMessage" : false});
    }
    client.query('SELECT * FROM results', function(err, result) {
      const dates = [];
      const scores = [];
      const ids = [];
      for (i=0;i<21;i++){
        dates[i]=result.rows[i].date;
        ids[i]=result.rows[i].user_id;
        scores[i] = result.rows[i].score;
      }
      client.query('SELECT * FROM users', function(err, result) {
      const statusArray = []
      for (i=0;i<21;i++){
        statusArray[i]=result.rows[i].status;
      }
        done()
      })
      res.render("ScoreDisplay",{"directions": constants.DIR.KEY,"title": constants.TITLE.KEY, "show":false,  "numberC" : 0, "missedQ":0, "id" : '0', "status":'0', "dates": dates,"scores":scores, "ids":ids, "statusArray": statusArray});
    })
  }) 
});






function CleanLoginAndSend(name){
  // Cleans up the login name for the database to interpet
  name = name.toUpperCase().trim();
  return name
}

function GetProfileAvatarfromId(id){
  // finds the profile url form the id of the user
  if (profiles[id] != undefined){
    return profiles[id];
  } else{
    return null;
  }
}

function GetProfileDescriptionfromId(id){
  // gets the description of the user from the id of the user
  if (descriptions[id] != undefined){
    return descriptions[id];
  } else{
    return null;
  }
}

function GetIdFromName(name){
  // gets the id of the user from the name of the user
  if (ids[name] != undefined){
    return ids[name];
  } else{
    return null;
  }
}

function GetNameFromId(id){
  // gets the name from the id of the user
  if (names[id] != undefined){
    return names[id];
  } else{
    return null;
  }
}

function GetQuizFromStatus(status, addOne='2'){
  // Finds the previous, current, or next quiz for the user
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
  if (quizzes[newStatusString] != undefined){
    return quizzes[newStatusString];
  } else{
    return null;
  }
}

app.get('/DRulesCopy/:id/:status', index.DRulesCopy);
app.get('/DRulesQ/:id/:status', index.DRulesQ);
app.get('/DRulesQ2/:id/:status', index.DRulesQ2);

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

app.get('/AllDone/:id/:status', index.AllDone);

/// Show Urls

app.get('/DRulesCopy/show/:id/:status/:numberC/:missedQ', index.DRulesCopyShow);
app.get('/DRulesQ/show/:id/:status/:numberC/:missedQ', index.DRulesQShow);
app.get('/DRulesQ2/show/:id/:status/:numberC/:missedQ', index.DRulesQ2Show);

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
app.get('/SequenceQ2/show/:id/:status/:numberC/:missedQ', index.SequenceQ2Show);

app.get('/ExponentStudy/show/:id/:status/:numberC/:missedQ', index.ExponentStudyShow);
app.get('/ExponentQ/show/:id/:status/:numberC/:missedQ', index.ExponentQShow);
app.get('/ExponentQ2/show/:id/:status/:numberC/:missedQ', index.ExponentQ2Show);
app.get('/ExponentQ3/show/:id/:status/:numberC/:missedQ', index.ExponentQ3Show);
app.get('/ExponentQ4/show/:id/:status/:numberC/:missedQ', index.ExponentQ4Show);

app.get('/FreePass/show/:id/:status/:numberC/:missedQ', index.FreePassShow);

app.get('/AllDone/show/:id/:status/:numberC/:missedQ', index.AllDoneShow);

app.listen(process.env.PORT || 2000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});