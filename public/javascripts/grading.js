
// This file has the answers to all the quizzes as an array next to the name of the file.
// It also has the grading functions

	//Angles
	var AnglesMatchAns=['G','C','D','B','A','F'];
	var AnglesQAns=['C','D','A','B','A','D','C'];
	var AnglesQ2Ans=['B','C','B','B','D','C','A'];
	var AnglesQ3Ans=['C','D','A','B'];
	var AnglesStudyAns= [];

	// Division Rules
	var DRulesCopyAns= ["#2","#3","#4","#5","#6","#10",'even','hero','even','end','biggest','fine','know'];
	var DRulesQ2Ans= ['A101','A201','A202','A303','A402','A403','A601','A602','A603','A701','A703','A802'];
	var DRulesQAns= ['Y1', '1','D'];

	// Exponents
	var ExponentStudyAns= [];
	var ExponentQAns= ['Y1','N1','N2','Y2','N2','N1','Y2','Y1','C'];
	var ExponentQ2Ans= ['N1','N2','Y1','N1','Y1','N2','Y2','N1','B'];
	var ExponentQ3Ans= ['N1','N1','N2','Y2','Y1','N1','N1','Y1','B'];
	var ExponentQ4Ans= ['Y2','Y1','N2','N1','Y1','Y1','N2','Y2','B','C'];

	// Fractions
	var FractionGCFQAns=['A','D'];
	var FractionImpQAns=['C', 'B'];
	var FractionLCMQAns= ['B','D'];
	var FractionQAns= ['C','A','D'];

	// PTheorem
	var PTheoremCopyAns=['hypotenuse','legs','equal','triangle','Theorem','square','sum','right'];
	var PTheoremFillAns=['pythagorean','right','sum','legs','square','hypotenuse'];
	var PTheoremQAns= ['C'];

	// Percent
	var PercentMatchAns=['B','E','F','A','C','D','H','G'];
	var PercentQAns= ['37','37/100','25','.25','2/3','37.5','3/8','5','0.002','1/500'];
	var PercentQ2Ans=['D','A','D'];
	var PercentQ3Ans=['C','B','D','A'];
	var PercentStudyAns=[];

	// Prime Numbers
	var PrimeNumbersAns= [
		0,2,3,0,5,0,7,0,0,0,
		11,0,13,0,0,0,17,0,19,0,
		0,0,23,0,0,0,0,0,29,0,
		31,0,0,0,0,0,37,0,0,0,
		41,0,43,0,0,0,47,0,0,0,
		0,0,53,0,0,0,0,0,59,0,
		61,0,0,0,0,0,67,0,0,0,
		71,0,73,0,0,0,0,0,79,0,
		0,0,83,0,0,0,0,0,89,0,
		0,0,0,0,0,0,97,0,0,0];
	var PrimeNumbersCopyAns= ['prime', 'number', 'is','only', 'divisible', 'one','itself', 'is', 'an', 'identity', 'is', 'not', 'prime'];
	var PrimeNumbersListAns= ['2','3','5','7','11','13','17','19','23','29','31','37','41','43','47','53','59','61','67','71','73','79','83','89','97'];
	var PrimeNumbersQAns= [51,72,0,87,0,0,0,0,91,63,100];
	var PrimeNumbersQ2Ans= ['N1','2','58','B','25','B','B'];

	// Prob
	var ProbQAns= ['want','total','not wanted','factorial','3!','multiply','percent'];
	var ProbQ2Ans=  ['A','D','C','B','A'];
	var ProbQ3Ans= ['C','C','C','C'];
	var ProbStudyAns= [];
	var ProbTFAns=  ['F','T','T','T','T','T','F','T'];

	// Prop
	var PropsExampleAns= ['D','C','B','A']
	var PropsQAns= ['A','D','B','D','B','D'];
	var PropsQ2Ans= ['C','E','D','B','E','A','D','B'];
	var PropsQ3Ans= ['C','D','E','A','D','B','E','A'];
	var PropsStudyAns= [];

	// Sequence
	var SequenceQAns= ['B','A','C','A','D'];
	var SequenceStudyAns= [];

	// Square Numbers
	var SquareNumbersCopyAns =['square','number','has','root','whole','integer'];
	var SquareNumbersListAns= ['1','4','9','16','25','36','49','64','81','100','121','144','169','196','225'];
	var SquareNumbersMatchAns =['D','L','I','B','G','A','O','C','M','E','N','F','J','K','H'];
	var SquareNumbersQAns= ['D','B','A','C'];
	var SquareTFAns= ['F','F','T','T','F','T','T','F'];

	// Free Pass
	var FreePass = [];

	// Home
	var Home = [];

	// Login
	var Login = [];

	// These variabels are for getting the document guesses

function CoverFunc(div) {
    var x = document.getElementById(div);
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    	}
}


function checker(answer,correct){
	if (answer == correct){
		return Boolean(3>2);
	}else{
		return Boolean(2>3);
	}
}

CoverFunc("WhiteCover")
var attempt_cnt = 0


function TurnBlue(id, val){
	var num = clickCount[id-1]
	if ((num % 2) === 0){
		Count(id)
		clickCount[id-1] = clickCount[id-1] + 1
	} else{
		UnCount(id)
		clickCount[id-1] = clickCount[id-1] + 1
	}
}

function TurnBluePrimeQ(id, val){
	var num = clickCount[val-1]
	if ((num % 2) === 0){
		CountPrimeQ(id, val)
		clickCount[val-1] = clickCount[val-1] + 1
	} else{
		UnCountPrimeQ(id, val)
		clickCount[val-1] = clickCount[val-1] + 1
	}
}

function login(name){
	console.log('here at')
	window.location.href='/'
}

function CountPrimeQ(id, val){
	var newcolor = "#b30000";
	var oldcolor = "#F0F8FF";
	guesses[val-1] = parseInt(id)
	document.getElementById(id).style.backgroundColor = newcolor;
	document.getElementById(id).style.color = oldcolor;
}

function UnCountPrimeQ(id, val){
	var newcolor = "#b30000";
	var oldcolor = "#F0F8FF";
	guesses[val-1] = 0
	document.getElementById(id).style.backgroundColor = oldcolor;
	document.getElementById(id).style.color = newcolor;
}

function Count(id){
	var newcolor = "#b30000";
	var oldcolor = "#F0F8FF";
	guesses[id-1] = parseInt(id)
	document.getElementById(id).style.backgroundColor = newcolor;
	document.getElementById(id).style.color = oldcolor;
}

function UnCount(id){
	var newcolor = "#b30000";
	var oldcolor = "#F0F8FF";
	guesses[id-1] = 0
	document.getElementById(id).style.backgroundColor = oldcolor;
	document.getElementById(id).style.color = newcolor;
}

function processAnswers(title, guesses, type=null) {
	var answers = title;
	var numQuestions = answers.length;
	attempt_cnt = attempt_cnt + 1

	if(attempt_cnt > 1){
		if (attempt_cnt > 2){
		document.getElementById("Error").innerHTML = "Sorry, you already submited your answers"
			}
		return
	}
	var correct = 0;
	var missedQuestions = [];
	switch(type){
		case 'copy':
			for (p=0; p <numQuestions; p++){
				if (guesses[0].includes(answers[p])){
					correct = correct + 1
				}
			}
			var Message = "You passed!  Good Job!";
			break;
		case 'checkbox':
			for(m = 0; m < numQuestions; m++){
				if (guesses.includes(answers[m])){
					correct = correct + 1
				}
			}
			var Message = "You passed!  Good Job!";
			break;
		case 'includes':
			for(m = 0; m < numQuestions; m++){
				if (guesses[m].includes(answers[m])){
					correct = correct + 1
				}else{
					missedQuestions.push(m+1)
				}
			}
			var Message = "You passed!  Good Job!";
			break;
		case 'home':
			var Message = "Tough Times Never Last, But Tough People Do.";
		default:
		for(m = 0; m < numQuestions; m++){
			if (typeof(answers[m]) === 'string'){
				guesses[m] = guesses[m].toUpperCase()
				answers[m] = answers[m].toUpperCase()
				guesses[m] = guesses[m].trim()
			}
			if (answers[m]=== guesses[m]){
				correct = correct + 1
			}else{
				missedQuestions.push(m+1)
			}
		}

	}

	if(guesses.length > answers.length){
		correct = correct -1
	}

	CoverFunc("WhiteCover")

	if (correct == numQuestions){
		document.getElementById("NumberCorrect").innerHTML = Message;
	}else if (guesses.length > numQuestions){
		var over = guesses.length - numQuestions
		if(type == null || type == 'includes'){
			document.getElementById("Missed").style.opacity = 100;
			document.getElementById("Heading").style.opacity = 0;
			document.getElementById("Missed").innerHTML = "You miseed this one";
		}
		document.getElementById("NumberCorrect").innerHTML = "You answered with " + over + " too many.";
	}else{
		if(type == null || type == 'includes'){
			document.getElementById("Missed").style.opacity = 100;
			document.getElementById("Heading").style.opacity = 0;
			document.getElementById("Missed").innerHTML = "You missed the following questions: " + missedQuestions;
		}
		document.getElementById("NumberCorrect").innerHTML = "Your score is   "+correct +"/"+numQuestions+".   You can do it! Keep trying!";
	}

}
