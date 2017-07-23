
var express = require('express');
var router = express.Router();
var constants = require('../constants');
var pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:2200';

var totals = require('../totals.js');
var names = require('../names.js');

//function that constructs and returns lizard object
function Entry(id, score){
  var score = {
    id: id,
    score: score,
  };
  return score;
}

function StoreScoreData(status, id, numberC){
  console.log('22222222222222222222222222222222222222222222')
  var score = numberC
  var total = GetTotalFromStatus((Number(status) - 1).toString());
  if (total === Number(score)){
    console.log('111111111111111111')
    sendToDBUsers(Number(status), id)
    sendToDBResults(id, score);
  }
  else{
  }
  sendToDBResults(id, score);
}

function GetTotalFromStatus(status){
    var oldStatus = Number(status) + 1 ;
    var oldStatusString = oldStatus.toString();
  if (totals[oldStatusString] != undefined){
    return totals[oldStatusString];
  } else{
    return null;
  }
}

function sendToDBUsers(oldStatus, id){
  var newStatus = Number(oldStatus);
  var newStatusString = newStatus.toString();
  const client = new pg.Client(connectionString);
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      done();
      return res.status(500).json({success: false, data: err});
      }
      client.query('UPDATE users SET status=$1 WHERE user_id=$2', [newStatusString, id] , function(err, result) {
        done()
      })

    });
}


function sendToDBResults(id, score){
//   var test = AlreadySubmitedToday(3)
// console.log(test)
  var date = getDate();
  const client = new pg.Client(connectionString);
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      done();
      return res.status(500).json({success: false, data: err});
      }
          client.query('SELECT * FROM results WHERE user_id=$1', [id] , function(err, result) {
          done()
          console.log(result, '9000000000909999999-------------------')
          var date = result.rows[0].date;
        const today = new Date()
          if (today === date){
            console.log('Already submitted today')
            return true
          }else{
            return false
          }
        })
        client.query('UPDATE results SET score=$1, date=$2 WHERE user_id=$3', [score, date, id] , function(err, result) {
          console.log('yyyyyyyyyyyyyyyyyyyyyyyyyy')
        done()

      })
    });
}


function AlreadySubmitedToday(id){
  console.log('erere')
  const client = new pg.Client(connectionString);
  client.query('SELECT * FROM results WHERE user_id=$1', [id] , function(err, result) {
    done()
    console.log(result, '9000000000909999999-------------------')
    var date = result.rows[0].date;
  const today = new Date()
    if (today === date){
      console.log('Already submitted today')
      return true
    }else{
      return false
    }
  })
}




function getDate(){
  var today = new Date();
  return today.toDateString()
}

// var login = function(req, res){
//   res.render('login', {"directions": constants.DIR.LOGIN, "title": constants.TITLE.LOG, "loginMessage": ""})
// };


/////////////////////////////Division Rules

var DRulesQ = function(req, res){
    res.render("DRulesQ",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.DRU + ' I', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var DRulesCopy = function(req, res){
  res.render("DRulesCopy",{"directions": constants.DIR.COPY, "title": constants.TITLE.DRU + ' II', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var DRulesQ2 = function(req, res){
  res.render("DRulesQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.DRU + ' III', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

// var DRulesQ2 = function(req, res){
//   res.render("DRulesQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.DRU + ' IV'});
// };

/////////////////////////////Prime Numbers
var PrimeNumbers = function(req, res){
  res.render("PrimeNumbers",{"directions": constants.DIR.CLICK_PRIME, "title": constants.TITLE.PIN + ' I', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var PrimeNumbersCopy = function(req, res){
  res.render("PrimeNumbersCopy",{"directions": constants.DIR.COPY, "title": constants.TITLE.PIN + ' II', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var PrimeNumbersQ = function(req, res){
  res.render("PrimeNumbersQ",{"directions": constants.DIR.COMP_PRIME, "title": constants.TITLE.PIN + ' III', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var PrimeNumbersQ2 = function(req, res){
  console.log('here')
  res.render("PrimeNumbersQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.PIN + ' IV', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var PrimeNumbersList = function(req, res){
  res.render("PrimeNumbersList",{"directions": constants.DIR.LIST_PRIME, "title": constants.TITLE.PIN + ' V', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Square Numbers
var SquareNumbersMatch = function(req, res){
  res.render("SquareNumbersMatch",{"directions": constants.DIR.MATCH, "title": constants.TITLE.SQU + ' I' , "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var SquareNumbersCopy = function(req, res){
  res.render("SquareNumbersCopy",{"directions": constants.DIR.COPY, "title": constants.TITLE.SQU + ' II', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var SquareTF = function(req, res){
  res.render("SquareTF",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.SQU + ' III', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var SquareNumbersQ = function(req, res){
  res.render("SquareNumbersQ",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.SQU + ' IV', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var SquareNumbersList = function(req, res){
  res.render("SquareNumbersList",{"directions": constants.DIR.LIST_SQUARE_NUMBERS, "title": constants.TITLE.SQU + ' V', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////PTheorem
var PTheoremCopy = function(req, res){
  res.render("PTheoremCopy",{"directions": constants.DIR.COPY, "title": constants.TITLE.PTH + ' I', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var PTheoremQ = function(req, res){
  res.render("PTheoremQ",{"directions": constants.DIR.PICTURE, "title": constants.TITLE.PTH + ' II', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var PTheoremFill = function(req, res){
  res.render("PTheoremFill",{"directions": constants.DIR.FILL, "title": constants.TITLE.PTH + ' III', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Props

var PropsStudy = function(req, res){
  res.render("PropsStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PRO + ' I', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var PropsQ = function(req, res){
  res.render("PropsQ",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.PRO + ' II', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var PropsQ2 = function(req, res){
  res.render("PropsQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.PRO + ' III', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var PropsExample = function(req, res){
  res.render("PropsExample",{"directions": constants.DIR.PROPERTY, "title": constants.TITLE.PRO + ' IV', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var PropsQ3 = function(req, res){
  res.render("PropsQ3",{"directions": constants.DIR.PROPERTY, "title": constants.TITLE.PRO + ' V', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Angles

var AnglesStudy = function(req, res){
  res.render("AnglesStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.ANG + ' I', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var AnglesQ = function(req, res){
  res.render("AnglesQ",{"directions": constants.DIR.PROPERTY, "title": constants.TITLE.ANG + ' II', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var AnglesMatch = function(req, res){
  res.render("AnglesMatch",{"directions": constants.DIR.MATCH, "title": constants.TITLE.ANG + ' III' , "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var AnglesQ2 = function(req, res){
  res.render("AnglesQ2",{"directions": constants.DIR.ANGLE, "title": constants.TITLE.ANG + ' IV', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var AnglesQ3 = function(req, res){
  res.render("AnglesQ3",{"directions": constants.DIR.ANGLE, "title": constants.TITLE.ANG + ' V', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};


/////////////////////////////Prob

var ProbStudy = function(req, res){
  res.render("ProbStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PRB + ' I', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var ProbQ = function(req, res){
  res.render("ProbQ",{"directions": constants.DIR.FILL, "title": constants.TITLE.PRB + ' II', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var ProbQ2 = function(req, res){
  res.render("ProbQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.PRB + ' III', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var ProbTF = function(req, res){
  res.render("ProbTF",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.PRB + ' IV', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var ProbQ3 = function(req, res){
  res.render("ProbQ3",{"directions": constants.DIR.DICE, "title": constants.TITLE.PRB + ' V', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Percent

var PercentStudy = function(req, res){
  res.render("PercentStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PER + ' I', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var PercentQ = function(req, res){
  res.render("PercentQ",{"directions": constants.DIR.FILL, "title": constants.TITLE.PER + ' II', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var PercentQ2 = function(req, res){
  res.render("PercentQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.PER + ' III', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var PercentQ3 = function(req, res){
  res.render("PercentQ3",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.PER + ' IV', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var PercentMatch = function(req, res){
  res.render("PercentMatch",{"directions": constants.DIR.MATCH, "title": constants.TITLE.PER + ' V', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Fraction

var FractionStudy = function(req, res){
  res.render("FractionStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.FRA + ' I', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var FractionGCFQ = function(req, res){
  res.render("FractionGCFQ",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.FRA + ' II', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var FractionLCMQ = function(req, res){
  res.render("FractionLCMQ",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.FRA + ' III', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var FractionImpQ= function(req, res){
  res.render("FractionImpQ", {"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.FRA + ' IV', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var FractionQ= function(req, res){
  res.render("FractionQ", {"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.FRA + ' V', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var FractionQ2 = function(req, res){
  res.render("FractionQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.FRA + ' VI', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Sequences

var SequenceStudy = function(req, res){
  res.render("SequenceStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.SQU + ' I', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var SequenceQ = function(req, res){
  res.render("SequenceQ",{"directions": constants.DIR.SEQUENCE, "title": constants.TITLE.SQU + ' II', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var SequenceQ2 = function(req, res){
  res.render("SequenceQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.SQU + ' III', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Exponents

var ExponentStudy = function(req, res){
  res.render("ExponentStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.EXP + ' I', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var ExponentQ = function(req, res){
  res.render("ExponentQ",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.EXP + ' II', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var ExponentQ2 = function(req, res){
  res.render("ExponentQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.EXP + ' III', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var ExponentQ3 = function(req, res){
  res.render("ExponentQ3",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.EXP + ' IV', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var ExponentQ4 = function(req, res){
  res.render("ExponentQ4",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.EXP + ' V', "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Other

var FreePass = function(req, res){
  res.render("FreePass",{"directions": constants.DIR.FREE, "title": constants.TITLE.FRE, "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};

var AllDone = function(req, res){
  res.render("AllDone",{"title": constants.TITLE.DON, "show":false,  "numberC" : 0, "missedQ":0, "id" : req.params.id, "status":req.params.status});
};


//// SHOW URLS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




var DRulesQShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("DRulesQ",{"directions": constants.DIR.STUDY, "title": constants.TITLE.DIR + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var DRulesCopyShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("DRulesCopy",{"directions": constants.STUDY, "title": constants.TITLE.DIR + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var DRulesQ2Show = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("DRulesQ2",{"directions": constants.DIR.STUDY, "title": constants.TITLE.DIR + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

// var DRulesQ2 = function(req, res){
//   res.render("DRulesQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.DRU + ' IV'});
// };

/////////////////////////////Prime Numbers
var PrimeNumbersShow = function(req, res){
   StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PrimeNumbers",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PIN + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var PrimeNumbersCopyShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PrimeNumbersCopy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PIN + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var PrimeNumbersQShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PrimeNumbersQ",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PIN + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var PrimeNumbersQ2Show = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PrimeNumbersQ2",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PIN + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var PrimeNumbersListShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PrimeNumbersList",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PIN + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Square Numbers
var SquareNumbersMatchShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("SquareNumbersMatch",{"directions": constants.DIR.STUDY, "title": constants.TITLE.SQU + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var SquareNumbersCopyShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("SquareNumbersCopy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.SQU + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});;
};

var SquareTFShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("SquareTF",{"directions": constants.DIR.STUDY, "title": constants.TITLE.SQU + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var SquareNumbersQShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("SquareNumbersQ",{"directions": constants.DIR.STUDY, "title": constants.TITLE.SQU + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var SquareNumbersListShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("SquareNumbersList",{"directions": constants.DIR.STUDY, "title": constants.TITLE.SQU + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////PTheorem
var PTheoremCopyShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PTheoremCopy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PTH + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var PTheoremQShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PTheoremQ",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PTH + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var PTheoremFillShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PTheoremFill",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PTH + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Props

var PropsQShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PropsQ",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PRO + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var PropsQ2Show = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PropsQ2",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PRO + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var PropsExampleShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PropsExample",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PPRO+ ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var PropsQ3Show = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PropsQ3",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PRO + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var PropsStudyShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PropsStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PRO + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Angles

var AnglesQShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("AnglesQ",{"directions": constants.DIR.STUDY, "title": constants.TITLE.ANG + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var AnglesMatchShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("AnglesMatch",{"directions": constants.DIR.STUDY, "title": constants.TITLE.ANG + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var AnglesQ2Show = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("AnglesQ2",{"directions": constants.DIR.STUDY, "title": constants.TITLE.ANG + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var AnglesQ3Show = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("AnglesQ3",{"directions": constants.DIR.STUDY, "title": constants.TITLE.ANG + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var AnglesStudyShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("AnglesStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.ANG + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Prob

var ProbQShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("ProbQ",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PRB + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var ProbQ2Show = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("ProbQ2",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PRB + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var ProbTFShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("ProbTF",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PRB + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var ProbQ3Show = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("ProbQ3",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PRB + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var ProbStudyShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("ProbStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PRB + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Percent

var PercentQShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PercentQ",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PER + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var PercentQ2Show = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PercentQ2",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PER + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var PercentQ3Show = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PercentQ3",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PER + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var PercentMatchShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PercentMatch",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PER + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var PercentStudyShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("PercentStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PER + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Fraction

var FractionGCFQShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("FractionGCFQ",{"directions": constants.DIR.STUDY, "title": constants.TITLE.FRA + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var FractionLCMQShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("FractionLCMQ",{"directions": constants.DIR.STUDY, "title": constants.TITLE.FRA + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var FractionImpQShow= function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("FractionImpQ",{"directions": constants.DIR.STUDY, "title": constants.TITLE.FRA + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var FractionQShow= function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("FractionQ",{"directions": constants.DIR.STUDY, "title": constants.TITLE.FRA + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var FractionQ2Show = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("FractionQ2",{"directions": constants.DIR.STUDY, "title": constants.TITLE.FRA + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var FractionStudyShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("FractionStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.FRA + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Sequences

var SequenceQShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("SequenceQ",{"directions": constants.DIR.STUDY, "title": constants.TITLE.SEQ + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var SequenceStudyShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("SequenceStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.SEQ + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var SequenceQ2Show = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("SequenceQ2",{"directions": constants.DIR.STUDY, "title": constants.TITLE.SEQ + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Exponents

var ExponentStudyShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("ExponentStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.EXP + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var ExponentQShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("ExponentQ",{"directions": constants.DIR.STUDY, "title": constants.TITLE.EXP + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var ExponentQ2Show = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("ExponentQ2",{"directions": constants.DIR.STUDY, "title": constants.TITLE.EXP + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var ExponentQ3Show = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("ExponentQ3",{"directions": constants.DIR.STUDY, "title": constants.TITLE.EXP + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var ExponentQ4Show = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("ExponentQ4",{"directions": constants.DIR.STUDY, "title": constants.TITLE.EXP + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

/////////////////////////////Other

var FreePassShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("FreePass",{"directions": constants.DIR.STUDY, "title": constants.TITLE.FRE + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};

var AllDoneShow = function(req, res){
  StoreScoreData(req.params.status, req.params.id, req.params.numberC)
  res.render("AllDone",{"directions": constants.DIR.STUDY, "title": constants.TITLE.DON + ' I', "show":true , "numberC" : req.params.numberC, "missedQ":req.params.missedQ, "id" : req.params.id, "status":req.params.status});
};




// module.exports.home = home;

module.exports.DRulesCopy = DRulesCopy;
module.exports.DRulesQ = DRulesQ;
module.exports.DRulesQ2 = DRulesQ2;
// module.exports.DRulesQ2 = DRulesQ2;

module.exports.PrimeNumbers = PrimeNumbers;
module.exports.PrimeNumbersQ = PrimeNumbersQ;
module.exports.PrimeNumbersCopy = PrimeNumbersCopy;
module.exports.PrimeNumbersList = PrimeNumbersList;
module.exports.PrimeNumbersQ2 = PrimeNumbersQ2;

module.exports.PTheoremQ = PTheoremQ;
module.exports.PTheoremCopy = PTheoremCopy;
module.exports.PTheoremFill = PTheoremFill;

module.exports.SquareNumbersMatch = SquareNumbersMatch;
module.exports.SquareNumbersCopy = SquareNumbersCopy;
module.exports.SquareTF = SquareTF;
module.exports.SquareNumbersQ = SquareNumbersQ;
module.exports.SquareNumbersList = SquareNumbersList;

module.exports.PropsQ = PropsQ;
module.exports.PropsExample = PropsExample;
module.exports.PropsQ2 = PropsQ2;
module.exports.PropsQ3 = PropsQ3;
module.exports.PropsStudy = PropsStudy;

module.exports.AnglesQ = AnglesQ;
module.exports.AnglesMatch = AnglesMatch;
module.exports.AnglesQ2 = AnglesQ2;
module.exports.AnglesQ3 = AnglesQ3;
module.exports.AnglesStudy = AnglesStudy;

module.exports.ProbQ = ProbQ;
module.exports.ProbQ2 = ProbQ2;
module.exports.ProbTF = ProbTF;
module.exports.ProbQ3 = ProbQ3;
module.exports.ProbStudy = ProbStudy;

module.exports.PercentQ = PercentQ;
module.exports.PercentQ2 = PercentQ2;
module.exports.PercentQ3 = PercentQ3;
module.exports.PercentMatch = PercentMatch;
module.exports.PercentStudy = PercentStudy;

module.exports.FractionGCFQ = FractionGCFQ;
module.exports.FractionLCMQ = FractionLCMQ;
module.exports.FractionImpQ = FractionImpQ;
module.exports.FractionQ = FractionQ;
module.exports.FractionQ2 = FractionQ2;
module.exports.FractionStudy = FractionStudy;

module.exports.SequenceQ = SequenceQ;
module.exports.SequenceStudy = SequenceStudy;
module.exports.SequenceQ2 = SequenceQ2;

module.exports.ExponentStudy = ExponentStudy;
module.exports.ExponentQ = ExponentQ;
module.exports.ExponentQ2 = ExponentQ2;
module.exports.ExponentQ3 = ExponentQ3;
module.exports.ExponentQ4 = ExponentQ4;

module.exports.FreePass = FreePass;

// module.exports.readingScores = readingScores;

// module.exports.login = login;

module.exports.AllDone = AllDone;





module.exports.DRulesCopyShow = DRulesCopyShow;
module.exports.DRulesQShow = DRulesQShow;
module.exports.DRulesQ2Show = DRulesQ2Show;
// module.exports.DRulesQ2 = DRulesQ2;

module.exports.PrimeNumbersShow = PrimeNumbersShow;
module.exports.PrimeNumbersQShow = PrimeNumbersQShow;
module.exports.PrimeNumbersCopyShow = PrimeNumbersCopyShow;
module.exports.PrimeNumbersListShow = PrimeNumbersListShow;
module.exports.PrimeNumbersQ2Show = PrimeNumbersQ2Show;

module.exports.PTheoremQShow = PTheoremQShow;
module.exports.PTheoremCopyShow = PTheoremCopyShow;
module.exports.PTheoremFillShow = PTheoremFillShow;

module.exports.SquareNumbersMatchShow = SquareNumbersMatchShow;
module.exports.SquareNumbersCopyShow = SquareNumbersCopyShow;
module.exports.SquareTFShow = SquareTFShow;
module.exports.SquareNumbersQShow = SquareNumbersQShow;
module.exports.SquareNumbersListShow = SquareNumbersListShow;

module.exports.PropsQShow = PropsQShow;
module.exports.PropsExampleShow = PropsExampleShow;
module.exports.PropsQ2Show = PropsQ2Show;
module.exports.PropsQ3Show = PropsQ3Show;
module.exports.PropsStudyShow = PropsStudyShow;

module.exports.AnglesQShow = AnglesQShow;
module.exports.AnglesMatchShow = AnglesMatchShow;
module.exports.AnglesQ2Show = AnglesQ2Show;
module.exports.AnglesQ3Show = AnglesQ3Show;
module.exports.AnglesStudyShow = AnglesStudyShow;

module.exports.ProbQShow = ProbQShow;
module.exports.ProbQ2Show = ProbQ2Show;
module.exports.ProbTFShow = ProbTFShow;
module.exports.ProbQ3Show = ProbQ3Show;
module.exports.ProbStudyShow = ProbStudyShow;

module.exports.PercentQShow = PercentQShow;
module.exports.PercentQ2Show = PercentQ2Show;
module.exports.PercentQ3Show = PercentQ3Show;
module.exports.PercentMatchShow = PercentMatchShow;
module.exports.PercentStudyShow = PercentStudyShow;

module.exports.FractionGCFQShow = FractionGCFQShow;
module.exports.FractionLCMQShow = FractionLCMQShow;
module.exports.FractionImpQShow = FractionImpQShow;
module.exports.FractionQShow = FractionQShow;
module.exports.FractionQ2Show = FractionQ2Show;
module.exports.FractionStudyShow = FractionStudyShow;

module.exports.SequenceQShow = SequenceQShow;
module.exports.SequenceStudyShow = SequenceStudyShow;
module.exports.SequenceQ2Show = SequenceQ2Show;

module.exports.ExponentStudyShow = ExponentStudyShow;
module.exports.ExponentQShow = ExponentQShow;
module.exports.ExponentQ2Show = ExponentQ2Show;
module.exports.ExponentQ3Show = ExponentQ3Show;
module.exports.ExponentQ4Show = ExponentQ4Show;

module.exports.FreePassShow = FreePassShow;

// module.exports.readingScores = readingScores;

// module.exports.login = login;

module.exports.AllDoneShow = AllDoneShow;


// var Liz = function(req, res){
//   var lizards = db.getAll();
//   console.log(lizards)
//   var msg = "Lizard names are: ";
//   lizards.forEach(function(liz){
//     msg = msg + liz.name + ",";
//   })
//   res.render("lizards", {"lizard": [
//   msg]
// });
// };

// //get all lizard names
// router.get('/names', function(req, res, next){
//   var lizards = db.getAll();
//   var msg = "Lizard names are: ";
//   lizards.forEach(function(liz){
//     msg = msg + liz.name + ",";
//   })
//   res.render(msg);
// });

// // create new lizard named Bob
// router.get('/new', function(req, res, next) {
//   db.add(Lizard("Bob"));
//   res.render("Added lizard!");
// });

// module.exports = router;

// var bodyParser = require('body-parser');
// // create application/x-www-form-urlencoded parser 
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
// POST /login gets urlencoded bodies 
// var login = router.post('/login', function(req, res, next) {
//   var url = String(req.originalUrl).split('?')[1].split('+')[1];
//   console.log(url)
//   res.render('login', {"directions": constants.DIR.LOGIN, "title": constants.TITLE.LOG})
// })

// function login(name){
//   window.location.href='/'
//   console.log(name, 'JJJJJjjjjjj')
// }

// module.exports={
//     loginREC: function(req, res){
//         console.log("Hello world.");
//         res.status(200).end();
//     }
// };




//module.exports.login = login;
// var readingScores = function(req, res){
//   db.add(Entry("Bob", '90%'));
//   //this makes a new lizard but does not update the db in hard code
//   var scores = db.getAll();
//   console.log(scores)
//   var msg = "The scores are: ";
//   scores.forEach(function(scr){
//     msg = msg + scr.id + "," + scr.score;
//   })
//   res.render("readingScores", {"SCORE": [ msg ] } );
// };



// const pg = require('pg');
// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

// const client = new pg.Client(connectionString);
// client.connect();
// const query = client.query(
//   'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// query.on('end', () => { client.end(); });

// insert into test_table values (61, 'testNumber1');


// var home = function(req, res){
//     //   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     // client.query('SELECT * FROM test_table WHERE id = 1' , function(err, result) {
//     //   var name = result.rows[0].name;
//     //   done();
//     //   if (err)
//     //    { console.error(err); response.send("Error " + err); }
//     // });
//      res.render("home",{"directions": constants.DIR.HOME, "title": constants.TITLE.HOM, "status":2});
//   // });
// };



// var home = function(req, res){
// console.log('ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
//   res.render("home",{"directions": constants.DIR.HOME, "title": constants.TITLE.HOM, "status": 3});
//   if (req.query.StatusUpdate == 100){
//     unLockQuiz(status)
//   }
// };


//   //db.add(Lizard("Bob"));
//   //this makes a new lizard but does not update the db in hard code
//   var lizards = db.getAll();
//   var msg = "Lizard names are: ";
//   lizards.forEach(function(liz){
//     msg = msg + liz.name + ",";
//   })
//   //res.render("home","This is my tempory home. It is not where I belong.")
//   res.render("home", {"name": [
//   msg]
// }
// );
// };