let score = 0;
let proScore =0;
let antiScore =0;
let timer = 29;
let start = document.getElementById('start');
let time = document.getElementById('time');
let wBox2 = document.querySelectorAll(".wBox2");
let holes = document.querySelectorAll(".darkhole");
let sun = document.querySelectorAll(".sunMole");
let cash  = document.querySelectorAll(".theCash");
let chance = [sun, cash];
let luck =Math.floor(Math.random() * chance.length);

start.addEventListener("click", () => {
    document.getElementById('start').style.visibility = "hidden";
    document.getElementsByClassName('wBox2')[0].style.visibility = "visible";
    let time = window.setInterval(() => {
        document.getElementById("time").innerText = ':' + timer;
        timer--;
    }, 1000);
    let whereMole = window.setInterval(() => {
        popUps();
        sun = document.querySelectorAll('.sunMole');
        return sun;      
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
    }, 2000)
});

const popUps = () => {
     holes[Math.floor(Math.random() * holes.length)].classList.add('sunMole');
}
holes.forEach((val) => {
    val.addEventListener('click', (e) => {
        document.getElementById('score').innerText = score;
        if (e.target.classList.contains("sunMole")) {
            e.target.classList.replace("sunMole", "splat")
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