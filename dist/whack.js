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
let result = 0;
let min = round;
let max = round + 1;
let heart = '\u{2764}';
let trophy = '\u{1f3c6}';

let start = document.getElementById('start');
let time = document.getElementById('time');
let wBox2 = document.querySelectorAll(".wBox2");
let holes = document.querySelectorAll(".darkhole");

let mole1 = document.querySelectorAll(".mole1");
let mole2 = document.querySelectorAll(".mole2");
let mole3 = document.querySelectorAll(".mole3");
let mole4 = document.querySelectorAll(".mole4");

let cash1 = document.querySelectorAll(".cash1");
let cash2 = document.querySelectorAll(".cash2");
let cash3 = document.querySelectorAll(".cash3");
let cash4 = document.querySelectorAll(".cash4");

const darkmole = [mole1, mole2, mole3, mole4];
const darkcash = [cash1, cash2, cash3, cash4];

let mole = darkmole[round];
let cash = darkcash[round];

start.addEventListener("click", () => {
    document.getElementById('start').style.visibility = "hidden";
    document.getElementsByClassName('wBox2')[0].style.visibility = "visible";
    let time = window.setInterval(() => {
        document.getElementById("time").innerText = ':' + timer;
        timer--;
    }, 1000);
    let whereMole = window.setInterval(() => {
        result = choice(min, max);
        console.log(result);
        if (result % 2 == 0) {
            popUpsPlus()
        }
        else {
            popUpsMinus()
        };
    }, 1000);
    window.setTimeout(() => {
        window.clearInterval(whereMole);
        window.clearInterval(time);
        document.getElementById('start').style.visibility = "visible";
        document.getElementsByClassName('wBox2')[0].style.visibility = "hidden";
        document.getElementById('score').innerText = score;
        timer = 29
        roundGsap();
        
    }, 30900);
});

function choice(min, max) {
    let result = (Math.floor(Math.random() * (max - min + 1)) + 2);
    return result;
};

const popUpsMinus = () => {
    holes[Math.floor(Math.random() * holes.length)].classList.add(`mole${round}`);
    console.log("pop-");
    {
        let clear = window.setInterval(() => {

            let clearHole = document.querySelectorAll(`.mole${round}`);
            clearHole.forEach((val) => {
                val.classList.replace(`mole${round}`, "darkhole");
            })
        }, 2000);

        window.setTimeout(() => {
            window.clearInterval(clear);
        }, 2000);

        holes.forEach((val) => {
            val.addEventListener('click', (e) => {
                document.getElementById('score').innerText = score;
                if (e.target.classList.contains(`mole${round}`)) {
                    e.target.classList.replace(`mole${round}`, "splat");
                    score =- 15;
                    minusAmt++;
                    minusScore = minusVal * minusAmt;
                }
            })
        })
    }
};


const popUpsPlus = () => {
    holes[Math.floor(Math.random() * holes.length)].classList.add(`cash${round}`);
    console.log("pop+");
    {
        let clear1 = window.setInterval(() => {
            console.log("clear");
            let clearHole1 = document.querySelectorAll(`.cash${round}`);
            clearHole1.forEach((val) => {
                val.classList.replace(`cash${round}`, "darkhole");
            })
        }, 2000);
        window.setTimeout(() => {
            window.clearInterval(clear1);
        }, 2000);

        holes.forEach((val) => {
            val.addEventListener('click', (e) => {
                document.getElementById('score').innerText = score;
                if (e.target.classList.contains(`cash${round}`)) {
                    e.target.classList.replace(`cash${round}`, "smash")
                    score =+ 50;
                    plusAmt++;
                    plusScore = plusVal * plusAmt;
                }
            })
        })
    }
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
}, 1500);

function progressBar() {
    let elem = document.getElementById("achieve");
    let width = 1;
    let id = setInterval(fillBar, 15);
    function fillBar() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

function statusMessage(msg) {
    let container = document.querySelector("#evalMes");
    container.innerText = msg;
}

function roundEnd(){
    document.getElementById("plusAmt").innerText = plusAmt;
    document.getElementById("plusValue").innerText = plusVal;
    document.getElementById("plusScore").innerText = plusScore;

    document.getElementById("minusAmt").innerText = minusAmt;
    document.getElementById("minusValue").innerText = minusVal;
    document.getElementById("minusScore").innerText = minusScore;

    if (score < 100) {
        statusMessage(`Use a heart and try again`);

        let tryAgain = document.getElementById('eval');

        tryAgain = document.createElement("button");

        document.getElementById('eval').append(tryAgain);

        tryAgain.innerText = `${heart}`;

        tryAgain.addEventListener("click",useHeart);
        
    } else {
        statusMessage(`Advance to the next level!`);

        let advance = document.createElement("button");

        document.getElementById('eval').append(advance);

        advance.innerText = `${trophy}`;
        
        advance.addEventListener("click",roundUp);
    }
}

statusMessage(`Advance to the next level!`);
let advance = document.createElement("button");
document.getElementById('eval').append(advance);
advance.innerText = `${trophy}`;
advance.addEventListener("click",roundUp);

function useHeart(){
    console.log("use heart works");
    roundUp();
}

function roundGsap(){
 let tl = gsap.timeline();
//tl.from(".roundModal", { transformOrigin: "-100%, -100%" }, { transformOrigin: "50%, 50%" });
tl.to(".roundModal", { duration: 2, y: "165%", ease: "bounce", backgroundColor: "#000000bf", border: "5px ridge white", });}

function roundUp(){
    round++
    score = 0;
    plusAmt = 0;    
    plusScore = 0;
    minusAmt = 0;
    minusScore = 0;

    let el = document.getElementById('eval');
    el.remove();

    document.body.style.backgroundImage = `url(/dist/asset/round${round}.png)`;
    document.getElementById('start').style.visibility = "visible";

gsap.to(".roundModal", {y:"-100%", delay:5, duration: 3, ease:Back.easeOut.config(2)});    

}
