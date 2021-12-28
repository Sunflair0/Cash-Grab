let hits = 0;
let score = 0;
let timer = 59;
let start = document.getElementById('start');
let timeLeft = document.getElementById('timeLeft');
let topScore = 1;
let secondScore = 0;
let thirdScore = 0;
let gameBoard = document.querySelectorAll(".whackBox");
let timer = 29
let start = document.getElementById("start");
let moleHoles = document.querySelectorAll(".hole")
let moles = document.querySelectorAll(".mole");



start.addEventListener("click", () => {
    start.classList.add('removeStart')
    let timeLeft = window.setInterval(()=> {
        timeLeft.innerText = timer;
        timer--;
    }, 1000);
    let whereMole = window.setInterval(()=> {
        moleLocation();
        moles = document.querySelectorAll('.mole');
        return moles;
    }, 1000);
    window.setTimeout(()=> {
        window.clearInterval(whereMole);
        window.clearInterval(timeLeft);
        start.classList.remove('removeStart');
        score =1
        timeLeft.innerHTML = 60;
        timer = 59
    }, 31005);
});

const moleLocation = () => {
    moleHoles[Math.floor(Math.random() * moleHoles.length)].classList.add('mole');
}

moleHoles.forEach((val)=>{
    val.addEventListener('click', (e) => {
        document.getElementById('score').innerText = score;
        if (e.target.classList.contains("mole")) {
            e.target.classList.replace("mole", "splat")
            score++;
        if (score >= topScore) {
            topScore = score - 1;
            document.getElementById("score1").innerText = topScore;
            console.log(topScore);
        } else if (score >= secondScore) {
            secondScore = score - 1;
            document.getElementById("score2").innerText = score;
        } else if (score >= thirdScore) {
            thirdScore = score - 1;
            document.getElementById("score3").innerText = score;
        }
    }
})
});
let resetHoles = window.setInterval(() => {
    let splats = document.querySelectorAll(".splat");
    splats.forEach((val) => {
        val.classList.replace("splat", "hole");
    })
}, 2000)



function startTimer(duration, display) {
    var timer = duration,
        seconds;
    setInterval(function() {

        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function() {
    let sixtySeconds = 60,
        display = document.querySelector('#time');
    startTimer(sixtySeconds, display);
};






const holes = document.querySelectorAll(".div");

function moleAppear() {
    let active = holes[Math.floor(Math.random() * holes.length)];
    active.classList.add("theMole");

     setTimeout(() => {
          active.classList.remove("theMole" );
        setTimeout(moleAppear1, 100);
        }, 1000);

    }





window.onload = function() {
    let sixtySeconds = 60,
        display = document.querySelector("#time");
    startTimer(sixtySeconds, display);
};

let counter = window.setInterval(() => {
    document.getElementById("timer").innerText = timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
        window.clearInterval(counter);
        window.clearInterval(whereMole);
    }
}, 1000);

function countDown() {
    let x = setTimeout(countdown, 1000);

    let time = document.getElementById("timer");
    let score = document.getElementById(scored);

    time.innerHTML = "TIME LEFT:    " + timeLeft + " seconds";

    if (timeLeft < 1) {
        clearTimeout(x);
        window.clearInterval(whereMole);
        window.clearInterval(timeLeft);
        time.innerHTML = "TIME'S UP";
        score.innerHTML = hits;
    }
    timeLeft--;
}

const moleClass = document.querySelectorAll(".moleHole");
let active = moleClass[Math.floor(Math.random() * moleClass.length)];
const moleLocation = () => {
    moleClass[Math.floor(Math.random() * moleClass.length)].classList.replace("moleHole", "theMole");
};
let whereMole = window.setInterval(() => {
    moleLocation();
    let moles = document.querySelectorAll(".theMole");
    moles.forEach((val) => {
        val.addEventListener("click", (e) => {
            e.target.classList.replace("theMole", "theSplat");

            resetHoles = window.setTimeout(() => {
                let splats = document.querySelectorAll(".theSplat");
                splats.forEach((val) => {
                    val.classList.replace("theSplat", "moleHole");
                });
            }, 2000);
        });
    });
}, 1000);

// active.addEventListener("click", score, false);

// let score = 0;

// function score(){
//     let result;
//     if (class is active){let score = score + 1;
// }else{
//     if ()

// }

// function moleAppear1() {
//     active = moleClass[Math.floor(Math.random() * moleClass.length)];

//     active.classList.add("theMole");

//     setTimeout(() => {
//         active.classList.remove("theMole");
//         setTimeout(moleAppear1, 100);
//     }, 1000);
// }
// moleAppear1();

// function moleAppear2() {

//     let active = moleClass[Math.floor(Math.random() * moleClass.length)];

//     active.classList.add("theMole");

//     setTimeout(() => {
//         active.classList.remove("theMole");
//         setTimeout(moleAppear2, 200);
//     }, 1000);
// }
// moleAppear2();

// function moleAppear3() {
//     let active = moleClass[Math.floor(Math.random() * moleClass.length)];

//     active.classList.add("theMole");

//     setTimeout(() => {
//         active.classList.remove("theMole");
//         setTimeout(moleAppear3, 300);
//     }, 1000);
// }
// moleAppear3();

// function moleAppear4() {
//     let active = moleClass[Math.floor(Math.random() * moleClass.length)];

//     active.classList.add("theMole");

//     setTimeout(() => {
//         active.classList.remove("theMole");
//         setTimeout(moleAppear4, 400);
//     }, 1000);
// }
// moleAppear4();

// function moleAppear5() {
//     let active = moleClass[Math.floor(Math.random() * moleClass.length)];

//     active.classList.add("theMole");

//     setTimeout(() => {
//         active.classList.remove("theMole");
//         setTimeout(moleAppear5, 500);
//     }, 1000);
// }
// moleAppear5();

// function moleAppear7() {
//     let active = moleClass[Math.floor(Math.random() * moleClass.length)];

//     active.classList.add("theMole");

//     setTimeout(() => {
//         active.classList.remove("theMole");
//         // setTimeout(moleAppear7, 700);
//     }, 1000);
// }
// moleAppear7();

// scoring
// let score = 0;

// function scoring() {

//     moleAppear.addEventListener("click", moleAppear("splat"));
//     let score = score + 10;

// }
// scoring();

// Scoring the game

// timer

// Trevor's Scoreboard


let topScore = 0;
let secondScore = 0;
let thirdScore = 0;
let gameBoard = document.querySelectorAll(".theMole");
gameBoard.forEach((val) => {
    val.addEventListener("click", (e) => {
        hits++;
        document.getElementById("hit").innerText = hits
        if (hits >= thirdScore) {
            thirdScore = hits;
            document.getElementById("score3").innerText = thirdScore
            if (hits >= secondScore) {
                thirdScore = secondScore;
                secondScore = hits;
                document.getElementById("score2").interText = secondScore
                if (hits >= topScore) {
                    secondScore = topScore;
                    topScore = hits;
                    document.getElementById("score1").interText = secondScore

                    if (score >= topScore) {
                        topScore = score - 1;
                        document.getElementById("score1").innerText = topScore;
                        console.log(topScore);
                    } else if (score >= secondScore) {
                        secondScore = score - 1;
                        document.getElementById("score2").innerText = score;
                    } else if (score >= thirdScore) {
                        thirdScore = score - 1;
                        document.getElementById("score3").innerText = score;
                    }
                }
            }
        }
    })
})