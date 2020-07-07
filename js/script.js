
var startButton = document.querySelector("#startQuiz");
var timer = document.querySelector("#timer");
var mainContent = document.querySelector("#mainContent");
var questionEl = document.querySelector("#title");
var quizContent = document.querySelector("#quizContent");
var resultDiv = document.querySelector("#answer");
var scoreDiv = document.querySelector("#score");
var highscoresDiv = document.querySelector("#highscores");
var navhighscorelink = document.querySelector("#navhighscorelink");

var secondsLeft = 75;
var questionIndex = 0 ;
var correct = 0;
var totalQuestions = questions.length;
var question , option1, option2, option3 ,option4 ,ans;
var previousScores;

//Create divs for button
var dv1 = document.createElement("div");
var dv2 = document.createElement("div");
var dv3 = document.createElement("div");
var dv4 = document.createElement("div");

//Create buttons for choices
var ch1 = document.createElement("button");
var ch2 = document.createElement("button");
var ch3 = document.createElement("button");
var ch4 = document.createElement("button");

ch1.setAttribute("class","btn btn-primary rounded-pill mb-2");
ch2.setAttribute("class","btn btn-primary rounded-pill mb-2");
ch3.setAttribute("class","btn btn-primary rounded-pill mb-2");
ch4.setAttribute("class","btn btn-primary rounded-pill mb-2");

//Create p for showing answer Correct/Wrong
var result = document.createElement("p");
result.setAttribute("class","text-muted font-italic");
resultDiv.appendChild(result);

//Start Quiz function
function startQuiz(){
    
    startTimer();  
    buildQuestion();  

}


//function to start timer when quiz starts
function startTimer(){
    
    var timeInterval = setInterval(function(){

        secondsLeft--;

        timer.textContent = "Time : "+secondsLeft+ " sec";
        
        if(secondsLeft === 0 || (questionIndex > totalQuestions-1)){
            
            resultDiv.style.display = "none";
            quizContent.style.display = "none";
            viewResult();
            clearInterval(timeInterval);
            timer.textContent = "";
        }

    },1000);
}


function buildQuestion(){
   
    //hides start page content
    questionEl.style.display= "none";
    mainContent.style.display = "none";
    quizContent.style.display= "none";
  
    if(questionIndex > totalQuestions - 1){
        return;
    }
    else{
    
        question = questions[questionIndex].title;
        option1 = questions[questionIndex].choices[0];
        option2 = questions[questionIndex].choices[1];
        option3 =  questions[questionIndex].choices[2];
        option4 =  questions[questionIndex].choices[3];
        ans =  questions[questionIndex].answer;

        //Display Question 
        questionEl.innerHTML = question;
        questionEl.setAttribute("class","text-left");
        questionEl.style.display= "block";

        //choice 1
        ch1.textContent = "1. "+option1;
    
        //choice 2
        ch2.textContent = "2. "+option2;
        
        //choice 3
        ch3.textContent = "3. "+option3;
        
        //choice 4
        ch4.textContent = "4. "+option4;
         
    }
    //Append choice buttons to divs
    dv1.appendChild(ch1);
    dv2.appendChild(ch2);
    dv3.appendChild(ch3);
    dv4.appendChild(ch4);

    //append divs to quizContent div
    quizContent.appendChild(dv1);
    quizContent.appendChild(dv2);
    quizContent.appendChild(dv3);
    quizContent.appendChild(dv4);

    quizContent.style.display= "block";

}

// Event Listener for options buttons
quizContent.addEventListener("click",function(event){
    
    var element = event.target;
    var userAnswer = element.textContent;
    var userOption   = userAnswer.substring(3, userAnswer.length);
      
        if(userOption === ans){
            correct++; 
             
            resultDiv.style.display = "block"; 
            
            result.textContent = "Correct!"
            
            setTimeout(function(){
                result.textContent = "";
            },500);
        }
        else {
            secondsLeft -= 10;
            
            result.textContent = "Wrong!"
            
            setTimeout(function(){
                result.textContent = "";
            },500);       
        }
        
        questionIndex++;
        buildQuestion();       
});


//Function to show scores when quiz completes
function viewResult(){  
    
    // resultDiv.style.display = "none";
    questionEl.innerHTML = "Test Completed!";
    questionEl.style.display= "block";
    
    var s = document.createElement("p");
    s.textContent = "Your final Score : "+correct;
    scoreDiv.appendChild(s);

    var form = document.createElement("form");

    var label = document.createElement("label");
    label.textContent = "Enter Initials : ";

    var text = document.createElement("input");
    text.setAttribute("id","initialsInput");
    text.setAttribute("class","ml-3");

    var scoreButton = document.createElement("button");
    scoreButton.setAttribute("class","btn btn-primary rounded-pill mb-2 ml-3 mt-2");
    scoreButton.textContent = "Submit";
    
    form.appendChild(label);
    form.appendChild(text);
    form.appendChild(scoreButton);
    
    scoreDiv.appendChild(form);

    scoreButton.addEventListener("click",storeScores);
}

//Function to store highscores
function storeScores(event){
    
    event.preventDefault();
    var userName = document.querySelector("#initialsInput");

    //Create user object for storing highscore
    var user = {
        name : userName.value.trim(),
        score : correct
    }

    console.log(user);

    previousScores = JSON.parse(localStorage.getItem("previousScores"));
    
    if(previousScores){
        previousScores.push(user);
    }
    else{
        previousScores = [user];
    }
    
    // set new submission
    localStorage.setItem("previousScores",JSON.stringify(previousScores));

    showHighScores(); // Called function to display highscores
}

//function to show highscores
function showHighScores(){
   
    questionEl.innerHTML = "Highscores";
    questionEl.style.display = "block";
    
    quizContent.style.display = "none";
    scoreDiv.style.display = "none";

        // creates a <table> element and a <tbody> element
        var tbl = document.createElement("table");
        tbl.setAttribute("id","table");
        var tblBody = document.createElement("tbody");

        tbl.style.textAlign = "center";

        var row = document.createElement("tr");
        
        var heading1 = document.createElement("th");
        var headingText1 = document.createTextNode("Initials");
        heading1.setAttribute("class","bg-info");
        heading1.appendChild(headingText1);
        row.appendChild(heading1);

        var heading2 = document.createElement("th");
        var headingText2 = document.createTextNode("Score");
        heading2.appendChild(headingText2);
        heading2.setAttribute("class","bg-info");
        row.appendChild(heading2);

        tblBody.appendChild(row);

        var userLength = previousScores.length;
        
        // creating all cells
        for (var i = 0; i < userLength ; i++) {
            // creates a table row
             var row = document.createElement("tr");

            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var uname = previousScores[i].name;
            var uscore = previousScores[i].score;
            
            var cell1 = document.createElement("td");
            var cellText1 = document.createTextNode(uname);
            cell1.appendChild(cellText1);
            row.appendChild(cell1);

            var cell2 = document.createElement("td");
            var cellText2 = document.createTextNode(uscore);
            cell2.appendChild(cellText2);
            row.appendChild(cell2);
      

            // add the row to the end of the table body
            tblBody.appendChild(row);
        }

        // put the <tbody> in the <table>
        tbl.appendChild(tblBody);
        // appends <table> into <body>
        highscoresDiv.appendChild(tbl);
        // sets the border attribute of tbl to 2;
        tbl.setAttribute("border", "2");
        tbl.setAttribute("width","100%");
    
    var goback = document.createElement("button");
    goback.setAttribute("class","btn btn-primary rounded-pill mb-2 mt-4 ml-2");
    goback.textContent = "Go Back";
    highscoresDiv.appendChild(goback);
    goback.addEventListener("click",function(){
        window.location= "index.html";
    });

    var clearscores = document.createElement("button");
    clearscores.setAttribute("class","btn btn-primary rounded-pill mb-2 mt-4 ml-2");
    clearscores.textContent = "Clear Highscores";
    highscoresDiv.appendChild(clearscores);
    
    clearscores.addEventListener("click",function(){
        localStorage.clear();
        var table = document.querySelector("#table");
        table.style.display = "none";
    });
   
}

navhighscorelink.addEventListener("click",function(){
    mainContent.style.display = "none";
    var navlink = document.getElementById("navhighscorelink");
    navlink.style.display = "none";
    previousScores = JSON.parse(localStorage.getItem("previousScores"));
    showHighScores();
});

startButton.addEventListener("click",startQuiz);


