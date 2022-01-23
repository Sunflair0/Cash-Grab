// window.addEventListener("scroll", preventMotion, false);
// window.addEventListener("touchmove", preventMotion, false);

// function preventMotion(event)
// {
//     window.scrollTo(0, 0);
//     event.preventDefault();
//     event.stopPropagation();
// }

let score = 0;
let timer = 29;
let round = 1;
let plusAmt = 0;
let plusVal = 50;
let plusScore = 0;
let minusAmt = 0;
let minusVal = -15;
let minusScore = 0;
let roundScore = 0;
let roundScore1 = 0;
let roundScore2 = 0;
let roundScore3 = 0;
let roundScore4 = 0;
let totalScore = [];
let result = 0;
let percent = 0;
let min = round;
let max = round + 1;
let life = 5;
let goal = 50;
let heart = '\u{2764}';
let trophy = '\u{1f3c6}';
let restart = '\u{21ba}';
let start = document.getElementById('start');
let time = document.getElementById('time');
let wBox2 = document.querySelectorAll(".wBox2");
let holes = document.querySelectorAll(".darkhole");
let whiteBoxes = document.getElementsByClassName("whiteBoxes")[0];
let mole1 = document.querySelectorAll(".mole1");
let mole2 = document.querySelectorAll(".mole2");
let mole3 = document.querySelectorAll(".mole3");
let mole4 = document.querySelectorAll(".mole4");
let cash1 = document.querySelectorAll(".cash1");
let cash2 = document.querySelectorAll(".cash2");
let cash3 = document.querySelectorAll(".cash3");
let cash4 = document.querySelectorAll(".cash4");
let minCash1 = document.querySelectorAll("#minCash1");
let minCash2 = document.querySelectorAll("#minCash2");
let minCash3 = document.querySelectorAll("#minCash3");
let minCash4 = document.querySelectorAll("#minCash4");
const darkmole = [mole1, mole2, mole3, mole4];
const darkcash = [cash1, cash2, cash3, cash4];
let mole = darkmole[round];
let cash = darkcash[round];

window.onload = hearts();

function begin() {
    life = 5;
    round = 1;
    roundUp();

}

start.addEventListener("click", () => {
    document.getElementsByClassName('header')[0].style.visibility = "hidden";
    document.getElementById('start').style.visibility = "hidden";
    document.getElementsByClassName('wBox2')[0].style.visibility = "visible";
    // document.getElementById('display').innerText= 'Level `${round}`';
    let time = window.setInterval(() => {
        document.getElementById("time").innerText = ':' + timer;
        timer--;
    }, 1000);

    //choice between cash or mole

    let whereMole = window.setInterval(() => {
        result = choice(min, max);
        console.log(result);
        if (result % 2 == 0) {
            displayCash()
        }
        else {
            displayMole()
        };
    }, 1000);

    window.setTimeout(() => {
        window.clearInterval(whereMole);
        window.clearInterval(time);
        document.getElementsByClassName('wBox2')[0].style.visibility = "hidden";
        document.getElementById('score').innerText = score;
        timer = 29
        roundGsap();
    }, 5900); //shortened for debugging mode
});

function choice(min, max) {
    let result = (Math.floor(Math.random() * (max - min + 1)) + 2);
    return result;
};

const displayMole = () => {

    let randomHole = null;
    let isRandomHoleAvailable = false;
    while (isRandomHoleAvailable === false) {
        randomHole = Math.floor(Math.random() * holes.length);
        isRandomHoleAvailable = !(holes[randomHole].classList.contains(`mole${round}`)) || !(holes[randomHole].classList.contains(`cash${round}`));
    }
    let clear = window.setInterval(() => {
        holes[randomHole].classList.add(`mole${round}`);

        //      let clearHole = document.querySelectorAll(`.mole${round}`);
        // clearHole.forEach((val) => {
        //val.classList.replace(`mole${round}`, "darkhole");
        //console.log("val.classList", val.classList)
        // val.classList.remove(`mole${round}`); 
    }, 2000)
    window.setTimeout(() => {
        window.clearInterval(clear);
        holes[randomHole].classList.remove(`mole${round}`);
    whiteBoxes.classList.remove('color');
    }, 3000);

    holes.forEach((val) => {
        val.addEventListener('click', (e) => {
            document.getElementById('score').innerText = score;
            if (e.target.classList.contains(`mole${round}`)) {
                e.target.classList.replace(`mole${round}`, "splat");
                score = score - 15;
                minusAmt++;
                minusScore = minusVal * minusAmt;
            }
        })
    })
};

const displayCash = () => {

    let randomHole = null;
    let isRandomHoleAvailable = false;
    while (isRandomHoleAvailable === false) {
        randomHole = Math.floor(Math.random() * holes.length);
        isRandomHoleAvailable = !(holes[randomHole].classList.contains(`mole${round}`)) || !(holes[randomHole].classList.contains(`cash${round}`));
    }
    // holes[randomHole].classList.add(`cash${round}`);


    // let clear1 = window.setInterval(() => {
    //     console.log("clear");
    //     let clearHole1 = document.querySelectorAll(`.cash${round}`);
    //     clearHole1.forEach((val) => {
    //         //val.classList.replace(`cash${round}`, "darkhole");
    //         val.classList.remove(`cash${round}`);//, "darkhole");
    //     })
    // }, 2000);
    // window.setTimeout(() => {
    //     window.clearInterval(clear1);
 let clear = window.setInterval(() => {
        holes[randomHole].classList.add(`cash${round}`);

        //      let clearHole = document.querySelectorAll(`.mole${round}`);
        // clearHole.forEach((val) => {
        //val.classList.replace(`mole${round}`, "darkhole");
        //console.log("val.classList", val.classList)
        // val.classList.remove(`mole${round}`); 
    }, 2000)
    window.setTimeout(() => {
        window.clearInterval(clear);
        holes[randomHole].classList.remove(`cash${round}`);

        console.log("round", round);
    whiteBoxes.classList.remove('color');
    }, 3000);

    holes.forEach((val) => {
        val.addEventListener('click', (e) => {
            document.getElementById('score').innerText = score;
            if (e.target.classList.contains(`cash${round}`)) {
                e.target.classList.replace(`cash${round}`, "smash")
                score = score + 50;
                plusAmt++;
                plusScore = plusVal * plusAmt;
            }
        })
    })

};
let resetHoles = window.setInterval(() => {
    let smash = document.querySelectorAll(".smash");
    smash.forEach((val) => {
        val.classList.replace("smash", `cash${round}`);
    })
    let splat = document.querySelectorAll(".splat");
    splat.forEach((val) => {
        val.classList.replace("splat", `mole${round}`);
    })
}, 2500);


// /////progress bar
const progressBar = document.getElementsByClassName('progress-bar')[0];

let progress = setInterval(() => {
    const width = percent || 0
    progressBar.style.setProperty('--width', width + 1)
}, 1000)

function statusMessage(msg) {
    let container = document.querySelector("#evalMes");
    container.innerText = msg;
}
//display hearts for lives
function hearts() {
    totalScore = [];
    for (let i = 1; i < 5; i++) {
        console.log(i);
        let hearts = document.getElementsByClassName(`heart${i}`)[0];
        hearts.innerText = `${heart}`;
        hearts.style.opacity = 1;
    }
}
// /////evaluation for percent to be converted and truncated
function enough() {
    percentage = roundScore / 3;
    percentage = Math.min(100, Math.max(0, percentage));
    percent = percentage.toFixed(2);
}
function roundEnd() {
    roundScore = plusScore + minusScore;
    enough();
    totalScore.push(roundScore);

  let clearHole = document.querySelectorAll(`.mole${round}`);
        clearHole.forEach((val) => {
        // val.classList.replace(`mole${round}`, "darkhole");
        console.log("val.classList", val.classList)
        val.classList.remove(`mole${round}`);
        val.classList.remove(`cash${round}`);
})
    document.getElementById('eval').style.visibility = "visible";
    document.getElementById("plusAmt").innerText = plusAmt;
    document.getElementById("plusValue").innerText = plusVal;
    document.getElementById("plusScore").innerText = plusScore;
    document.getElementById("minusAmt").innerText = minusAmt;
    document.getElementById("minusValue").innerText = minusVal;
    document.getElementById("minusScore").innerText = minusScore;
    document.getElementById("percent").innerText = percent + '%';
    document.getElementById("roundScore").innerText = roundScore;
    whiteBoxes.classList.add('color');

    if (roundScore < goal && life == 1) {
        noHearts();
    }
    else if (roundScore < goal && life > 1) {
        totalScore.pop(roundScore);
        console.log(totalScore);
        life--
        statusMessage(`Use a heart and try again`);
        console.log(life);
        let tryAgain = document.getElementById('eval');
        tryAgain = document.createElement("button");
        document.getElementById('eval').append(tryAgain);
        tryAgain.innerText = `${heart}`;
        tryAgain.addEventListener("click", useHeart);
    }
    else {
        round++
        statusMessage(`Advance to the next level!`);
        let advance = document.getElementById('eval');
        advance = document.createElement("button");
        document.getElementById('eval').append(advance);
        advance.innerText = `${trophy}`;
        advance.addEventListener("click", roundUp);
    }
}

//let returnedSum = sumArr;
//console.log(sumArr(totalScore));

function sumArr() {
    let sum = 0;
    for (let i = 0; i < totalScore.length; i++) {
        sum += totalScore[i];
    }
    return sum;
}
function useHeart() {
    gsap.to(`.heart${life}`, { opacity: 0, duration: 2.5, y: -100, rotation: 720, scale: 0 });
    console.log(life);
    roundUp()
};
function noHearts() {
    console.log('the end');
    statusMessage(`Uh oh! No more hearts.\nPush restart to play again.`);

    let doOver = document.getElementById('eval');
    doOver = document.createElement("button");
    document.getElementById('eval').append(doOver);
    doOver.innerText = `${restart}`;
    doOver.addEventListener("click", begin);
}
function roundGsap() {

    document.getElementById('plusImg').src = `./asset/minCash${round}.png`;
    let tl = gsap.timeline({ defaults: { duration: .5, opacity: 0 } })
    tl
        .to(".roundModal", { opacity: 1, duration: 1.5, y: "165%", ease: "bounce", })
        .from(".heading", { stagger: .3 })
        .from(".lineOne", {})
        .from(".lineTwo", {})
        .from(".line", {})
        .from(".theBar", {})
        .fromTo(".evalOne", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, ease: "power2" })
        .from("#eval", { x: "-30%" });

    console.log(round);

    if (round == 4) {
        gameEnd();
    } else {
        roundEnd();
    }
}
// /////function to roll up stat page and restart new level
function roundUp() {
    roundScore = 0;
    score = 0;
    plusAmt = 0;
    plusScore = 0;
    minusAmt = 0;
    minusScore = 0;


    whiteBoxes.classList.remove('color');
    document.getElementById('eval').innerText = '';
    document.getElementById('score').innerText = score;
    document.getElementById('eval').style.visibility = "hidden";
    document.body.style.backgroundImage = `url(/dist/asset/round${round}.png)`;
    document.getElementById('start').style.visibility = "visible";
    document.getElementById('wBox5').src = `./asset/round${round + 1}.png`;
    document.getElementById('first').src = `./asset/minCash${round}.png`;
    document.getElementById('second').src = `./asset/mole${round}.png`;


    gsap.to(".roundModal", { y: "-100%", duration: 2, ease: "power1" });
    gsap.fromTo(".start", { opacity: 0, scale: 0 }, { duration: 2.5, opacity: 1, scale: 1, ease: "elastic" })
}
function gameEnd() {

    //sumArr();
    console.log("totalScore", totalScore);
    console.log(sumArr());
document.getElementById('all').innerText = sumArr();
    //console.log(sumArr);
}