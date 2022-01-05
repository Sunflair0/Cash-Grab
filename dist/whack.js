let score = 0;
let proScore =0;
let antiScore =0;
let timer = 29;
let start = document.getElementById('start');
let time = document.getElementById('time');
let wBox2 = document.querySelectorAll(".wBox2");
let holes = document.querySelectorAll(".darkhole");
let sun = document.querySelectorAll(".sunMole");
let cash1  = document.querySelectorAll(".theCash");
let daisy  = document.querySelectorAll(".daisyMole");
let cash2  = document.querySelectorAll(".theLapis");
let tulip  = document.querySelectorAll(".tulipMole");
let cash3  = document.querySelectorAll(".theYellow");
let rose  = document.querySelectorAll(".roseMole");
let cash4  = document.querySelectorAll(".thePearl");


start.addEventListener("click", () => {
    document.getElementById('start').style.visibility = "hidden";
    document.getElementsByClassName('wBox2')[0].style.visibility = "visible";
    let time = window.setInterval(() => {
        document.getElementById("time").innerText = ':' + timer;
        timer--;
    }, 1000);
    let whereMole = window.setInterval(() => {
        popUps();
        sun = document.querySelectorAll('.theSun');
        cash = document.querySelectorAll('.theCash');
        return sun || cash1;      
    }, 2000);
    window.setTimeout(() => {
        window.clearInterval(whereMole);
        window.clearInterval(time);
        document.getElementById('start').style.visibility = "visible";
        document.getElementsByClassName('wBox2')[0].style.visibility = "hidden";
        document.getElementById('score').innerText = score;
        timer = 59
    }, 30900);
    window.setInterval(() => {
        let clearHole = document.querySelectorAll(".theCash");
        clearHole.forEach((val) => {
            val.classList.replace("theCash", "darkhole");
        })
    }, 3000)
    window.setInterval(() => {
        let clearHole = document.querySelectorAll(".sunMole");
        clearHole.forEach((val) => {
            val.classList.replace("sunMole", "darkhole");
        })
    }, 3000)

    
});

const popUps = () => {
     holes[Math.floor(Math.random() * holes.length)].classList.add('theCash');
}
holes.forEach((val) => {
    val.addEventListener('click', (e) => {
        document.getElementById('score').innerText = score;
        if (e.target.classList.contains("theCash")) {
            e.target.classList.replace("theCash", "splat")
            score++;
        }
    })
});
let resetHoles = window.setInterval(() => {
    let splats = document.querySelectorAll(".splat");
    splats.forEach((val) => {
        val.classList.replace("splat", "darkhole");
    })
}, 1000)