let score = 0;
let proScore = 0;
let antiScore = 0;
let timer = 29;
let pickRandom = [];
let start = document.getElementById('start');
let time = document.getElementById('time');
let wBox2 = document.querySelectorAll(".wBox2");
let holes = document.querySelectorAll(".darkhole");
let sun = document.querySelectorAll(".sunMole");
let cash = document.querySelectorAll(".theCash");

start.addEventListener("click", () => {
    document.getElementById('start').style.visibility = "hidden";
    document.getElementsByClassName('wBox2')[0].style.visibility = "visible";
    let time = window.setInterval(() => {
        document.getElementById("time").innerText = ':' + timer;
        timer--;
    }, 1000);
    let whereMole = window.setInterval(() => {
        choiceArray();
        sun = document.querySelectorAll('.sunMole');
        cash = document.querySelectorAll('.theCash');
        return sun || cash;
    }, 1000);
    window.setTimeout(() => {
        window.clearInterval(whereMole);
        window.clearInterval(time);
        document.getElementById('start').style.visibility = "visible";
        document.getElementsByClassName('wBox2')[0].style.visibility = "hidden";
        document.getElementById('score').innerText = score;
        timer = 29
    }, 30900);
    window.setInterval(() => {
        let clearHole = document.querySelectorAll(".sunMole");
        clearHole.forEach((val) => {
            val.classList.replace("sunMole", "darkhole");
        })
    }, 2500)
   window.setInterval(() => {
        let clearCash = document.querySelectorAll(".theCash");
        clearCash.forEach((val) => {
            val.classList.replace("theCash", "darkhole");
        })
    }, 2500)
});
const choiceArray = () => {
    let pickRandom = [Math.floor(Math.random() * 2)];
console.log(pickRandom);
    if (1 == pickRandom) {
holes[Math.floor(Math.random()*holes.length)].classList.add('sunMole');
holes.classList.add('sunMole')
        holes.forEach((val) => {
            val.addEventListener('click', (e) => {
                document.getElementById('score').innerText = score;
                if (e.target.classList.contains("sunMole")) {
                    e.target.classList.replace("sunMole", "splat")
                    score=score - 15;
                }
            })
        });
    }

    else {
holes[Math.floor(Math.random()*holes.length)].classList.add('theCash');
        holes.forEach((val) => {

            val.addEventListener('click', (e) => {
                document.getElementById('score').innerText = score;
                if (e.target.classList.contains("theCash")) {
                    e.target.classList.replace("theCash", "smash")
                    score=score + 50;
                }
            })
        });
    }
}

let resetAntiHoles = window.setInterval(() => {
    let splats = document.querySelectorAll(".splat");
    splats.forEach((val) => {
        val.classList.replace("splat", "darkhole");
    })
}, 1000)

let resetProHoles = window.setInterval(() => {
    let smash = document.querySelectorAll(".smash");
    smash.forEach((val) => {
        val.classList.replace("smash", "darkhole")
    })
}, 1000)

