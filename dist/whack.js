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
let plusAmt = 0;
let plusVal = 50;
let plusScore = 0;
let minusAmt = 0;
let minusVal = -15;
let minusScore = 0;
let result = 0;

let min = round;
let max = round + 1;

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
                    score = score - 15;
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
                    score = score + 50;
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

document.getElementById("plusAmt").innerText = plusAmt;
document.getElementById("plusValue").innerText = plusVal;
document.getElementById("plusScore").innerText = plusScore;

document.getElementById("minusAmt").innerText = minusAmt;
document.getElementById("minusValue").innerText = minusVal;
document.getElementById("minusScore").innerText = minusScore;

function statusMessage(msg) {
    let container = document.querySelector(".eval");
    container.innerText = msg;

    if (score < 100) {
        msg = `Try Again`;
    } else {
        msg = `Advance to the next level!`;
    }
}


// let tl = gsap.timeline(onComplete:gamePlay);

tl.fromTo(".roundModal", { transformOrigin: "-100%, -200%" }, { transformOrigin: "50%, 50%" });
tl.to(".roundModal", { duration: 2, y: 500, ease: "bounce", backgroundColor: "#000000bf", border: "5px ridge white", });
