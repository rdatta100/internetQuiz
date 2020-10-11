function initialize() 
{
	resultA = 0;
	resultB = 0;
	resultC = 0;
	resultD = 0;
	
	arrowOne = document.getElementById("leftArrow");
	arrowTwo = document.getElementById("rightArrow");
	submitB = document.getElementById("submitButton");
	submitB.style.display = "none";
	
	qElements = [document.getElementById("q1"), document.getElementById("q2"), document.getElementById("q3"), 
	document.getElementById("q4"), document.getElementById("q5"), document.getElementById("q6"), 
	document.getElementById("q7"), document.getElementById("q8"), document.getElementById("q9"), document.getElementById("q10")];
	
	currentQuestion = 0;
	
	usersScoring = [null, null, null, null, null, null, null, null, null, null];
	usersAnswers = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
	
	display();
	
	/*
		this function is called once the page loads the questions page
		
		the different result variables keep track of the scores the user gets as s/he 
		clicks on certain answer choices - each time a certain answer choice is clicked
		on, one is added to the corresponding result variable - the result variable with 
		the highest score determines which result the user is given
		
		the left and right arrows are shown so the user can go back and forth through
		the quiz, but the submit button is not shown just yet - it is shown when all 
		ten questions are answered
		
		the qElements array is used in a later function that determines which question
		needs to be displayed, and that is determined by the currentQuestion variable
		which starts at 0, which is the first question
		
		the two user arrays store the answer choices the user inputted. usersScoring 
		is to make sure the correct result variable is added to and the usersAnswers
		is to check if certain questions are answered or not
		
		last, the display function is called
	*/
}

function answerQuestion(questionNum, scoringFunction, answerNum)
{
	if (usersScoring[questionNum] != null)
	{
		usersScoring[questionNum](-1);
	}
	
	usersScoring[questionNum] = scoringFunction;
	usersAnswers[questionNum] = answerNum;
	scoringFunction(1);
	switchQuestion(questionNum);
	
	/*
		this function is called based on which answer choice is clicked on. it takes
		in which question the user is on, which result variable needs to be added to,
		and which answer choice was clicked on.
		
		if the question is not answered, it the usersScoring stores it as -1, which
		means it was not answered, just like how the array started off 
		
		then using the 2nd parameter, the certain scoringFunction is called and is 
		used as the index of the usersAnswers. the scoringFunction calls the function
		based on which result variable the answer choice corresponds to. then that 
		certain item in the array becomes a function, instead of a null, indicating 
		that the question has been answered
		
		and then the 2nd parameter is used as the index for usersAnswers, which 
		stores the answer choice the user inputs
	*/
}

function switchQuestion(question)
{
	currentQuestion = question;
	if (currentQuestion == 10) {
		checkForAnswers();
		if (checkForAnswers() == false) 
		{
			window.alert("You have not answered all of the questions! Please go back and do so.");
		}
		else
		{
			arrowOne.style.display = "none";
			arrowTwo.style.display = "none";
			submitB.style.display = "block";
		}
	} else {
		display();	
	}
	
	/*
		switchQuestion is called when one of the arrows are clicked on. the arrow takes the 
		current question and -1 or +1, depending on if the arrow wants to go to the next 
		question or the previous question
		
		then, currentQuestion becomes whatever the switchQuestion passed through
		if currentQuestion is 10, which is the last question, it calls the checkForAnswers
		function, which checks if all of the questions are answered and returns false if 
		it hasnt. if it does return false, the user is alerted. if it doesn't, the arrows 
		disappear and the submit button appears, allowing the user to submit his/her 
		answers
		
		last the display function is called
	*/
	
}

function checkForAnswers() 
{
	if (currentQuestion == 10) {
		
		for (var i = 1; i < usersScoring.length; i++)
		{
			if (usersScoring[i] == null) 
			{
				return false;
			}
		}
	}
	
	/*
		this function goes throught the usersScoring array and checks if any of the items
		are null, which means that question is unanswered. if it is, false is returned
	*/
}

function updateScoreA(mod)
{
	resultA+=mod;
}

function updateScoreB(mod)
{
	resultB+=mod;
}

function updateScoreC(mod)
{
	resultC+=mod;
}

function updateScoreD(mod)
{
	resultD+=mod;
}

/*
	these are the four choices from the scoringFunctions, each add one to the corresponding 
	result variable
	
	as shown in line 57, scoringFunction is called with a parameter of one. scoringFunction 
	is whatever function the answer choice called, and that function is called. for example, 
	updateScoreB was called for that scoringFunction, that function is called with a 1 as the 
	parameter because that much is being added to the resultB result variable.
	
*/

function calculateResult()
{
	results = [resultA, resultB, resultC, resultD];
	calculatedResult = resultA;
	
	for (var i = 0; i < results.length; i++) {
		if (calculatedResult < results[i]){
			calculatedResult = results[i];
		}
	}
	
	if (calculatedResult == resultA){
		window.location.href = "resultA.html";
	} else if (calculatedResult == resultB){
		window.location.href = "resultB.html";
	} else if (calculatedResult == resultC){
		window.location.href = "resultC.html";
	} else {
		window.location.href = "resultD.html";
	}
	
	/*
		this function is called when the submit button is clicked on
		
		this function puts all of the result variables into a results array. calculatedResult 
		will be the the result the user gets, but it starts off as resultA. then the for loop
		goes throught the results array to see which result variable has the highest score
		
		based on what the calculatedResult is, that corresponding result page is loaded for
		the user
	*/
}

function display()
{
	for (var i = 0; i < qElements.length; i++)
		qElements[i].style.display = "none";
	
	qElements[currentQuestion].style.display = "block";
	if (usersAnswers[currentQuestion] >= 0)
	{
		var imgArray = qElements[currentQuestion].getElementsByTagName("img");
		for (var j = 0; j < imgArray.length; j++)
		{
			if (usersAnswers[currentQuestion] == j)
			{
				imgArray[j].style.border = "thick solid LemonChiffon";
			}
			else
			{
				imgArray[j].style.border = "none";
			}
		}
	}
	
	/*
		this display function determines which questions are displayed (the questions
		are displayed one at a time). based on which qElements the question is on,
		which is determined by the id tag each question has, the other questions are hidden
		
		if the user has answered a question, that certain item in the usersAnswers array
		becomes a 1. the for loop goes through all of the answer choices for the certain
		question being displayed, and puts a border around the answer choice the user
		picked and the rest don't have a border
	*/
}

