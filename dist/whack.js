let hits = 0;
let score = 0;
let timer = 59;
let start = document.getElementById('start');
let time = document.getElementById('time');
let wBox2 = document.querySelectorAll(".wBox2")
let holes = document.querySelectorAll(".hole")
let moles = document.querySelectorAll(".mole");

start.addEventListener("click", () => {

    document.getElementById('start').style.visibility = "hidden";
    document.getElementsByClassName('wBox2')[0].style.visibility = "visible";
    let time = window.setInterval(()=> {
        document.getElementById("time").innerText = ':' +  timer;
        timer--;
    }, 1000);
    let whereMole = window.setInterval(()=> {
        // moleLocation();
        moles = document.querySelectorAll('.sunmole');
        return moles;
    }, 1000);
    window.setTimeout(()=> {
        window.clearInterval(whereMole);
        window.clearInterval(time);
       // document.getElementById('start').style.visibility = "visible";
        score =1
        time.innerHTML = 60;
        timer = 59
    }, 60900);
});

const moleLocation = () => {
    holes[Math.floor(Math.random() * holes.length)].classList.add('sunmole');
}

holes.forEach((val)=>{
    val.addEventListener('click', (e) => {
        document.getElementById('score').innerText = score;
        if (e.target.classList.contains("sunmole")) {
            e.target.classList.replace("sunmole", "splat")
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

// Trevor's Scoreboard

let topScore = 0;
let secondScore = 0;
let thirdScore = 0;
let gameBoard = document.querySelectorAll(".Mole");
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