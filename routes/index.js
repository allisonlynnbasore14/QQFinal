
var express = require('express');
var router = express.Router();
var constants = require('../constants');
var pg = require('pg');
//function that constructs and returns lizard object
function Entry(id, score){
  var score = {
    id: id,
    score: score,
  };
  return score;
}


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

function sendToDB(newStatus, id){
  const client = new pg.Client(connectionString);
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      done();
      return res.status(500).json({success: false, data: err});
      }
      client.query('UPDATE users SET status=$1 WHERE user_id$2', [newStatus, id] , function(err, result) {
        done()
      })
    });
}


// var login = function(req, res){
//   res.render('login', {"directions": constants.DIR.LOGIN, "title": constants.TITLE.LOG, "loginMessage": ""})
// };

/////////////////////////////Division Rules

var DRulesQ = function(req, res, id){
    res.render("DRulesQ",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.DRU + ' I', "id" : 3});
    // TODO: give id to client
    console.log(req)
    //sendToDB(req.query.StatusUpdate, id)
};

var DRulesCopy = function(req, res){
  res.render("DRulesCopy",{"directions": constants.DIR.COPY, "title": constants.TITLE.DRU + ' II'});
};

var DRulesQ2 = function(req, res){
  res.render("DRulesQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.DRU + ' III'});
};

// var DRulesQ2 = function(req, res){
//   res.render("DRulesQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.DRU + ' IV'});
// };

/////////////////////////////Prime Numbers
var PrimeNumbers = function(req, res){
  res.render("PrimeNumbers",{"directions": constants.DIR.CLICK_PRIME, "title": constants.TITLE.PIN + ' I'});
};

var PrimeNumbersCopy = function(req, res){
  res.render("PrimeNumbersCopy",{"directions": constants.DIR.COPY, "title": constants.TITLE.DRU + ' II'});
};

var PrimeNumbersQ = function(req, res){
  res.render("PrimeNumbersQ",{"directions": constants.DIR.COMP_PRIME, "title": constants.TITLE.DRU + ' III'});
};

var PrimeNumbersQ2 = function(req, res){
  res.render("PrimeNumbersQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.DRU + ' IV'});
};

var PrimeNumbersList = function(req, res){
  res.render("PrimeNumbersList",{"directions": constants.DIR.LIST_PRIME, "title": constants.TITLE.DRU + ' V'});
};

/////////////////////////////Square Numbers
var SquareNumbersMatch = function(req, res){
  res.render("SquareNumbersMatch",{"directions": constants.DIR.MATCH, "title": constants.TITLE.SQU + ' I' });
};

var SquareNumbersCopy = function(req, res){
  res.render("SquareNumbersCopy",{"directions": constants.DIR.COPY, "title": constants.TITLE.SQU + ' II'});
};

var SquareTF = function(req, res){
  res.render("SquareTF",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.SQU + ' III'});
};

var SquareNumbersQ = function(req, res){
  res.render("SquareNumbersQ",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.SQU + ' IV'});
};

var SquareNumbersList = function(req, res){
  res.render("SquareNumbersList",{"directions": constants.DIR.LIST_SQUARE_NUMBERS, "title": constants.TITLE.SQU + ' V'});
};

/////////////////////////////PTheorem
var PTheoremCopy = function(req, res){
  res.render("PTheoremCopy",{"directions": constants.DIR.COPY, "title": constants.TITLE.PTH + ' I'});
};

var PTheoremQ = function(req, res){
  res.render("PTheoremQ",{"directions": constants.DIR.PICTURE, "title": constants.TITLE.PTH + ' II'});
};

var PTheoremFill = function(req, res){
  res.render("PTheoremFill",{"directions": constants.DIR.FILL, "title": constants.TITLE.PTH + ' III'});
};

/////////////////////////////Props

var PropsQ = function(req, res){
  res.render("PropsQ",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.PRO + ' I'});
};

var PropsQ2 = function(req, res){
  res.render("PropsQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.PRO + ' II'});
};

var PropsExample = function(req, res){
  res.render("PropsExample",{"directions": constants.DIR.PROPERTY, "title": constants.TITLE.PRO + ' III'});
};

var PropsQ3 = function(req, res){
  res.render("PropsQ3",{"directions": constants.DIR.PROPERTY, "title": constants.TITLE.PRO + ' IV'});
};

var PropsStudy = function(req, res){
  res.render("PropsStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PRO + ' V'});
};

/////////////////////////////Angles

var AnglesQ = function(req, res){
  res.render("AnglesQ",{"directions": constants.DIR.PROPERTY, "title": constants.TITLE.ANG + ' II'});
};

var AnglesMatch = function(req, res){
  res.render("AnglesMatch",{"directions": constants.DIR.MATCH, "title": constants.TITLE.ANG + ' III' });
};

var AnglesQ2 = function(req, res){
  res.render("AnglesQ2",{"directions": constants.DIR.ANGLE, "title": constants.TITLE.ANG + ' IV'});
};

var AnglesQ3 = function(req, res){
  res.render("AnglesQ3",{"directions": constants.DIR.ANGLE, "title": constants.TITLE.ANG + ' V'});
};

var AnglesStudy = function(req, res){
  res.render("AnglesStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.ANG + ' I'});
};

/////////////////////////////Prob

var ProbQ = function(req, res){
  res.render("ProbQ",{"directions": constants.DIR.FILL, "title": constants.TITLE.PRB + ' I'});
};

var ProbQ2 = function(req, res){
  res.render("ProbQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.PRB + ' II'});
};

var ProbTF = function(req, res){
  res.render("ProbTF",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.PRB + ' III'});
};

var ProbQ3 = function(req, res){
  res.render("ProbQ3",{"directions": constants.DIR.DICE, "title": constants.TITLE.PRB + ' IV'});
};

var ProbStudy = function(req, res){
  res.render("ProbStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PRB + ' V'});
};

/////////////////////////////Percent

var PercentQ = function(req, res){
  res.render("PercentQ",{"directions": constants.DIR.FILL, "title": constants.TITLE.PER + ' II'});
};

var PercentQ2 = function(req, res){
  res.render("PercentQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.PER + ' III'});
};

var PercentQ3 = function(req, res){
  res.render("PercentQ3",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.PER + ' IV'});
};

var PercentMatch = function(req, res){
  res.render("PercentMatch",{"directions": constants.DIR.MATCH, "title": constants.TITLE.PER + ' V'});
};

var PercentStudy = function(req, res){
  res.render("PercentStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.PER + ' I'});
};

/////////////////////////////Fraction

var FractionGCFQ = function(req, res){
  res.render("FractionGCFQ",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.FRA + ' I'});
};

var FractionLCMQ = function(req, res){
  res.render("FractionLCMQ",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.FRA + ' III'});
};

var FractionImpQ= function(req, res){
  res.render("FractionImpQ", {"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.FRA + ' IV'});
};

var FractionQ= function(req, res){
  res.render("FractionQ", {"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.FRA + ' V'});
};

var FractionQ2 = function(req, res){
  res.render("FractionQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.FRA + ' VI'});
};

var FractionStudy = function(req, res){
  res.render("FractionStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.FRA + ' II'});
};

/////////////////////////////Sequences

var SequenceQ = function(req, res){
  res.render("SequenceQ",{"directions": constants.DIR.SEQUENCE, "title": constants.TITLE.SQU + ' II'});
};

var SequenceStudy = function(req, res){
  res.render("SequenceStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.SQU + ' I'});
};

var SequenceQ2 = function(req, res){
  res.render("SequenceQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.SQU + ' III'});
};

/////////////////////////////Exponents

var ExponentStudy = function(req, res){
  res.render("ExponentStudy",{"directions": constants.DIR.STUDY, "title": constants.TITLE.EXP + ' I'});
};

var ExponentQ = function(req, res){
  res.render("ExponentQ",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.EXP + ' II'});
};

var ExponentQ2 = function(req, res){
  res.render("ExponentQ2",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.EXP + ' III'});
};

var ExponentQ3 = function(req, res){
  res.render("ExponentQ3",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.EXP + ' IV'});
};

var ExponentQ4 = function(req, res){
  res.render("ExponentQ4",{"directions": constants.DIR.ANSWERQ, "title": constants.TITLE.EXP + ' V'});
};

/////////////////////////////Other

var FreePass = function(req, res){
  res.render("FreePass",{"directions": constants.DIR.FREE, "title": constants.TITLE.FRE});
};

var AllDone = function(req, res){
  res.render("AllDone",{"title": constants.TITLE.DON});
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

module.exports.login = login;

module.exports.AllDone = AllDone;

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

