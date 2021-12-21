document.getElementById("button").addEventListener("click", moleAppear1, true);


let timeLeft = 60


function countdown() {
    let x = setTimeout(countdown, 1000);

    let time = document.getElementById("timer");


    time.innerHTML = "TIME LEFT:    " + timeLeft + " seconds";


    if (timeLeft < 1) {
        clearTimeout(x);

        time.innerHTML = "TIME'S UP";

    }
    timeLeft--;

}
let counter = window.setInterval(() => {
    document.getElementById("timer").innerText = timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
        window.clearInterval(counter);
        window.clearInterval(whereMole);
    }
}, 1000);
let moleClass = document.querySelectorAll(".moleHole")
const moleLocation = () => {
    moleClass[Math.floor(Math.random() * moleClass.length)].classList.replace("moleHole", "theMole");
}
let whereMole = window.setInterval(() => {
    moleLocation();
    let moles = document.querySelectorAll(".theMole");
    moles.forEach((val) => {
        val.addEventListener("click", (e) => {
            e.target.classList.replace("theMole", "theSplat")
            hits++;
            resetHoles = window.setTimeout(() => {
                let splats = document.querySelectorAll(".theSplat");
                splats.forEach((val) => {
                    val.classList.replace("theSplat", "moleHole");
                })
            }, 2000)
        })
    })
}, 1000)


 active = moleClass[Math.floor(Math.random() * moleClass.length)];

//     active.classList.add("theMole");

//     setTimeout(() => {
//         active.classList.remove("theMole" );
//         setTimeout(moleAppear1, 100);
//     }, 1000);



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
            hits++;
            resetHoles = window.setTimeout(() => {
                let splats = document.querySelectorAll(".theSplat");
                splats.forEach((val) => {
                    val.classList.replace("theSplat", "moleHole");
                });
            }, 2000);
        });
    });
}, 1000);