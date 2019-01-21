let questions = [
    {
        question: "What is Athena's favorite animal?",
        options: ["jellyfish", "penguins", "otters"],
        answer: "otters"
    },
    {
        question: "What is 10 + 10?",
        options: ["8", "20", "28", "30"],
        answer: "20"
    },
    {
        question: "What is the square root of 625?",
        options: ["5", "15", "20", "25"],
        answer: "25"
    },
    {
        question: "What is the capital of the US?",
        options: ["Boston", "New York", "Los Angeles", "Washington, DC"],
        answer: "Washington, DC"
    }
];
let answered = [];

let question_number = 0;
let correct = 0;

document.addEventListener("DOMContentLoaded", () => {
    load_question();
});

function load_question() {
    let random = randInt(questions.length);
    document.querySelector("#question").innerHTML = questions[random].question;
    const options = document.querySelector("#options");
    options.innerHTML = "";
    for (const option of questions[random].options) {
        options.innerHTML += `<button class="option">${option}</button>`;
    }

    document.querySelectorAll(".option").forEach(option => {
        option.onclick = () => {
            if (option.textContent == questions[random].answer) {
                correct++;
            }
            question_number++;
            document.querySelector("#correct").innerHTML = `${correct} of ${question_number}`

            // remove  that question out of questions array and into answered array
            answered.push(questions[random]);
            questions.splice(random, 1);

            // if still questions left, keep going
            if (questions.length) {
                load_question();
            }
            // no more questions
            else {
                document.querySelector("#question").innerHTML = "Quiz over!";
                document.querySelector("#options").innerHTML = "";
                const reset_button = document.createElement("button");
                reset_button.innerHTML = "Retry Quiz";

                const reset = document.querySelector("#reset");
                reset.append(reset_button);
                reset.onclick = retry;
                return false;
            }
        }
    });

}

function retry() {
    question_number = 0;
    correct = 0;
    document.querySelector("#reset").innerHTML = "";
    questions = answered;
    answered = [];
    load_question();
}


// returns random int between 0 (inclusive) and max (exclusive)
function randInt(max) {
    max = Math.floor(max);
    return Math.floor(Math.random()*max);
}