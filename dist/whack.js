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
let round =2;
let start = document.getElementById('start');
let time = document.getElementById('time');
let wBox2 = document.querySelectorAll(".wBox2");
let holes = document.querySelectorAll(".darkhole");

let mole1 = document.querySelectorAll(".mole1");
let mole2  = document.querySelectorAll(".mole2");
let mole3  = document.querySelectorAll(".mole3");
let mole4  = document.querySelectorAll(".mole4");

let cash1  = document.querySelectorAll(".cash1");
let cash2  = document.querySelectorAll(".cash2");
let cash3  = document.querySelectorAll(".cash3");
let cash4  = document.querySelectorAll(".cash4");

const darkmole = [mole1,mole2,mole3,mole4];
const darkcash = [cash1,cash2,cash3,cash4];
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
        popUps();

    

        // let result = choice(min, max);
        // console.log(result);
        // if (result % 2==0) {
        //     proScore()
        // }
        // else {
        //     antiScore()
        // };  
        
    }, 2000);
    window.setTimeout(() => {
        window.clearInterval(whereMole);
        window.clearInterval(time);
        document.getElementById('start').style.visibility = "visible";
        document.getElementsByClassName('wBox2')[0].style.visibility = "hidden";
        document.getElementById('score').innerText = score;
        timer = 29
    }, 30900);
    window.setInterval(() => {
        let clearHole = document.querySelectorAll(`.cash${round}`);
        console.log(clearHole);
        clearHole.forEach((val) => {
            val.classList.replace(`cash${round}`, "darkhole");
        })
    }, 3000)
    window.setInterval(() => {
        let clearHole = document.querySelectorAll(`.mole${round}`);
        clearHole.forEach((val) => {
            val.classList.replace(`mole${round}`, "darkhole");
        })
    }, 3000)

    
});

const popUps = () => {
     holes[Math.floor(Math.random() * holes.length)].classList.add(`cash${round}`);
}
holes.forEach((val) => {
    val.addEventListener('click', (e) => {
        document.getElementById('score').innerText = score;
        if (e.target.classList.contains(`cash${round}`)) {
            e.target.classList.replace(`cash${round}`, "splat")
            score=+50;
        }
    })
});
let resetHoles = window.setInterval(() => {
    let splats = document.querySelectorAll(".splat");
    splats.forEach((val) => {
        val.classList.replace("splat", "darkhole");
    })
}, 1000)


function choice(min, max) {
    let result =(Math.floor(Math.random() * (max - min + 1))+2);  
    return result;
}

const popUpsMinus = () => {
    holes[Math.floor(Math.random() * holes.length)].classList.add(`.mole${round}`);
}
const popUpsPlus = () => {
    holes[Math.floor(Math.random() * holes.length)].classList.add(`.cash${round}`);
}