let hits = 0;
let timeLeft = 60;
document.getElementById("button").addEventListener("click", countdown);

function countdown() {
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

let moleClass = document.querySelectorAll(".moleHole");
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


// let topScore = 0;
// let secondScore = 0;
// let thirdScore = 0;
// let gameBoard = document.querySelectorAll(".theMole");
// gameBoard.forEach((val) => {
//     val.addEventListener("click", (e) => {
//         hits++;
//         document.getElementById("hit").innerText = hits
//         if (hits >= thirdScore) {
//             thirdScore = hits;
//             document.getElementById("score3").innerText = thirdScore
//             if (hits >= secondScore) {
//                 thirdScore = secondScore;
//                 secondScore = hits;
//                 document.getElementById("score2").interText = secondScore
//                 if (hits >= topScore) {
//                     secondScore = topScore;
//                     topScore = hits;
//                     document.getElementById("score1").interText = secondScore

//                     if (score >= topScore) {
//                         topScore = score - 1;
//                         document.getElementById("score1").innerText = topScore;
//                         console.log(topScore);
//                     } else if (score >= secondScore) {
//                         secondScore = score - 1;
//                         document.getElementById("score2").innerText = score;
//                     } else if (score >= thirdScore) {
//                         thirdScore = score - 1;
//                         document.getElementById("score3").innerText = score;
//                     }
//                 }
//             }
//         }
//     })
// })

// function randoPath() {
//     let active = divs[Math.floor(Math.random() * 5) + 1];

// }

// document.addEventListener("click", clickCount);
// for (
//     i = 0; randoBirdFlight < i; i++); {
//     birdFlight();

// }

// function randoBirdFlight() {
//     return Math.floor(Math.random() * 10) + 1;

// }

// window.addEventListener("MouseUp", birdFlight);

// function birdFlight(randoBirdFlight) {

// }