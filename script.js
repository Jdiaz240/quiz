let start = document.getElementById('start')
let question = document.getElementById('question');
let options = document.getElementById('options');
let timer = document.getElementById('timer');
let feedback = document.getElementById('feedback');
let tracker = document.getElementById('tracker');
let leaderBoard = document.getElementById('leaderBoard');
let form = document.getElementById('form');
let submit = document.getElementById('submit')
let clearBtn = document.getElementById('clear')
let players = [];
let questionsIndex = 0;
let score = 0;
let timeKeeper;
let player;

ancestors()

let questions = [
    {
        title: "What element can sub-zero control?",
        choices: ["Ice", "Fire", "Earth", "Air"],
        answer: "Ice"
    },
    {
        title: "What is Scorpion's catchphrase?",
        choices: ["PASS THE BUTTER!", "SMILE!", "WHO LIVES IN PINEAPPLE UNDER THE SEA?", "GET OVER HERE!"],
        answer: "GET OVER HERE!"
    },
    {
        title: "Who does Johnny Cage marry?",
        choices: ["yo mama", "Kim Kardashian", "Sonya Blade", "Himself"],
        answer: "Sonya Blade"
    },
    {
        title: "How many arms does Goro have?",
        choices: ["1", "2", "10", "4"],
        answer: "4"
    },
    {
        title: "What mythical creature is the symbol of Mortal Kombat?",
        choices: ["Nine-tailed fox", "Griffon", "Cerberus", "Dragon"],
        answer: "Dragon"
    }
];

let seconds = questions.length * 15;


let beginQuiz = () => {
    start.classList.add('hide')
    timeKeeper = setInterval(function () {
        seconds--;
        ;
        timer.textContent = 'Time: ' + seconds;

        if (seconds === 0) {
            clearInterval(timeKeeper)
            timer.textContent = "Game Over";
        }
    }, 1000)
    getQuestions();
}

let getQuestions = () => {
    if (questionsIndex <= 4) {
        let currentQuestion = questions[questionsIndex]
        question.textContent = currentQuestion.title
        options.textContent = '';
        currentQuestion.choices.forEach(function (answer) {
            let button = document.createElement('button')
            button.innerHTML = answer
            options.appendChild(button)
        })
    } else {
        endQuiz()
    }
}


let handleClick = (e) => {
    let userChoice = e.target.textContent
    if (userChoice === questions[questionsIndex].answer) {
        feedback.innerHTML = "correct"
        score++
        tracker.textContent = 'Score: ' + score
    } else {
        let wrong = document.createElement('p').innerHTML = 'maybe next time'
        feedback.innerHTML = wrong
    }
    getQuestions(questionsIndex++)
}


let endQuiz = () => {
    question.textContent = ''
    options.textContent = ''
    clearInterval(timeKeeper);
    timer.innerHTML = 'Time:' + 0;
    question.textContent = 'Thanks for Playing!'
    form.removeAttribute('class');
}


submit.onclick = () => {
    let name = document.getElementById('name').value;
    let player = {
        initials: name,
        number: score
    }
    console.log(player)
    let players = JSON.parse(localStorage.getItem('players'));
    if (players == null ) players = []
    players.push(player)
    console.log(players)    
    localStorage.setItem('players', JSON.stringify(players))
}

function ancestors() {
    let players = JSON.parse(localStorage.getItem('players'))
    if (players == null) players = []
    console.log(players)
    let test = players.map((i) => {
        let tr = document.createElement('tr')
        tr.innerHTML = '<td>' + i.initials + '</td>' + '<td>' + i.number + '</td>' ; 
        return tr
    })
    leaderBoard.append(...test)
}


start.onclick = beginQuiz
options.addEventListener('click', handleClick);
