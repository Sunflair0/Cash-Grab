let score = 0;

let timer = 29;
let round =2;
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
const darkmole = ["sun","daisy","tulip","rose"];
const darkcash = ["cash1","cash2","cash3","cash4"];
let min = round;
let max = round + 1;



//  const roundEnd = () => {
//     document.getElementById('start').style.visibility = "visible";
//     document.getElementById('roundEnd').style.visibility = "visible";
  
//     let endScore = document.querySelectorAll(".darkhole");
//     endScore.forEach((val) => {
//         val.classList.replace("darkhole", "roundEnd");
//     });
//   }

start.addEventListener("click", () => {
    document.getElementById('start').style.visibility = "hidden";
    document.getElementsByClassName('wBox2')[0].style.visibility = "visible";
    let time = window.setInterval(() => {
        document.getElementById("time").innerText = ':' + timer;
        timer--;
    }, 1000);


    let whereMole = window.setInterval(() => {
      let result = choice(min, max);

        console.log(result);

        if (result % 2==0) {
            proScore()
        }
        else {
            antiScore()
        };  


        // popUps();


        // sun = document.querySelectorAll('.theSun');
        // cash1 = document.querySelectorAll('.theCash');
        // return sun || cash1;      
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




function choice(min, max) {
  let result =(Math.floor(Math.random() * (max - min + 1))+2);

    return result;
}

//if (choice(min, max) % 2==0) {proScore()}
//else {antiScore()};

function antiScore(){
    console.log("antiScore")
    return;

 let whereMole = window.setInterval(() => {
        
        popUps();
         sun = document.querySelectorAll('.theSun');
        return sun;      
    }, 2000);


const popUps = () => {
     holes[Math.floor(Math.random() * holes.length)].classList.add('sunMole');
}
holes.forEach((val) => {
    val.addEventListener('click', (e) => {
        document.getElementById('score').innerText = score;
        if (e.target.classList.contains("sunMole")) {
            e.target.classList.replace("sunMole", "splat")
            score=score-15;
        }
    })
});
let resetHoles = window.setInterval(() => {
    let splats = document.querySelectorAll(".splat");
    splats.forEach((val) => {
        val.classList.replace("splat", "darkhole");
    })
}, 1000)
}

function proScore(){
    console.log("proScore")
    return;

 let whereMole = window.setInterval(() => {
        
        popUps();
         cash1 = document.querySelectorAll('.theCash');
        return cash1;      
    }, 2000);

const popUps = () => {
     holes[Math.floor(Math.random() * holes.length)].classList.add('cash1');
}
holes.forEach((val) => {
    val.addEventListener('click', (e) => {
        document.getElementById('score').innerText = score;
        if (e.target.classList.contains("cash1")) {
            e.target.classList.replace("cash1", "smash")
            score=score+50;
        }
    })
});
let resetHoles = window.setInterval(() => {
    let smash = document.querySelectorAll(".smash");
    smash.forEach((val) => {
        val.classList.replace("smash", "cash1");
    })
}, 1000)
}