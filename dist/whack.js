let gameLocalStorage = (() => {

    let masterArrName = "localStorageMasterArrayName";

    // lsName
    function getMasterArr() {
        // BUG when used first time.  How to check if value in localstorage
        return JSON.parse(localStorage.getItem(masterArrName)) || []
    }

    function setMasterArr(masterArr) {
         localStorage.setItem(masterArrName, JSON.stringify(masterArr))
    }

    return {
        getMasterArr,  // Because I'm using same name, don't need :value
        setMasterArr: setMasterArr // Same as above
    }
})();

let seconds = 1500;
let stackStyle = '';
let score = 0;
let hit = 0;
let miss = 0;
let game = 0;
let timer = 29;
let round = 1;
let plusAmt = 0;
let plusVal = 50;
let plusScore = 0;
let minusAmt = 0;
let minusVal = -15;
let minusScore = 0;
const lsName = "localStorageMasterArrayName";
let masterArr = gameLocalStorage.getMasterArr()
let gamePlay = {};
let rScores = [];
let color =[];
let percent = 0;
let min = round;
let max = round + 1;
let life = 5;
let goal = 0; // /////short for debugging
let start = document.getElementById('start');
let tick = document.getElementById('tick');
let whiteBoxes = document.getElementsByClassName("whiteBoxes")[0];
let close = document.getElementsByClassName('close')[0];
let easy = document.getElementById('easy');
let med = document.getElementById('med');
let hard = document.getElementById('hard');
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
let header = document.getElementById('header');
let level = document.getElementById('level');
let padlock = document.getElementById('padlock');
let finger = document.getElementById('finger');
let choiceStack = document.getElementsByClassName('choice')[0];

function exitIntro() {
    document.getElementsByClassName('choiceblock')[0].style.visibility = "visible";
    gamePlay.level = "MED";
    finger.innerText = "\u{261e}";

    // /////intromodal leaving
    let introLeave = gsap.timeline()
    introLeave.to(".introModal", { opacity: 0, x: '200%', y: "165%", duration: 1, ease: "circ", delay: ".5" });   
    printHearts()
    unlockChoice()
    
    let levelBlock_descends = gsap.timeline({ defaults: { duration: .7 } })
    levelBlock_descends
    .fromTo("#level", {opacity: 0.5, y:-30}, {opacity: 1, y:-5})
    .set("#level", {innerText:"MED"})
    .fromTo("#finger", {opacity: 0,}, {opacity: 1}, 1.28)    
    .fromTo("#padlock", {opacity: 0}, {opacity: 1}, "<");
}
function startGameAgain() {
    gsap.to(".tsModal", { opacity: 0, duration: 1, ease: "circ", y: '-165%' });
    printHearts()
    unlockChoice();
}
function unlockChoice() {
    padlock.innerText = "\u{1f513}";
    level.classList.remove('lockPadlock'); 
    level.addEventListener("click", selectDifficulty);
    level.style.cursor = 'pointer';

    let point = gsap.timeline();
    point
        .to("#finger", { x: "20%", repeat: 5, yoyo: true, duration: .3, delay: 3 })
        .to("#finger", { x: "30%", repeat: 5, yoyo: true, duration: .3, delay: 5 });
}
close.addEventListener("click", closeChoosing);
easy.addEventListener("click", selectDifficulty);
med.addEventListener("click", selectDifficulty);
hard.addEventListener("click", selectDifficulty);
finger.addEventListener("click", selectDifficulty);

function closeChoosing() {
    choiceStack.setAttribute('style', 'right:-100%;');
    document.getElementsByClassName('choiceblock')[0].style.height = '30px';
}
function selectDifficulty() {
    choiceStack.setAttribute('style', 'right: 0%;');
    level.setAttribute('style', 'height:30px;');
    finger.style.display = 'none';

    if (document.getElementById('easy').checked) {
        seconds = 2000;
        level.innerText = 'EASY';
        stackStyle = '#61fb61';
        setStyle();
        gamePlay.level = "EASY";
    }
    if (document.getElementById('med').checked) {
        seconds = 1500;
        level.innerText = 'MED';
        stackStyle = '#f3f365';
        setStyle();
        gamePlay.level = "MED";
    }
    if (document.getElementById('hard').checked) {
        seconds = 1000;
        level.innerText = 'HARD';
        stackStyle = '#ff5252';
        setStyle();
        gamePlay.level = "HARD";
    }
}
function setStyle() {
    level.style.color = `${stackStyle}`;
    level.style.outline = `${stackStyle} 2px solid`;
    choiceStack.style.outline = `${stackStyle} 2px solid`;
    choiceStack.style.outlineTop = '0';
}
function begin() {
    life = 5;
    round = 1;
    rScores = [];
    roundUp();
    unlockChoice();
}
start.addEventListener("click", () => {
    closeChoosing();
    start.style.visibility = "hidden";
    level.classList.add('lockPadlock'); 
    level.style.cursor = 'default';    
    header.innerText = `Level ${round}`;
    finger.style.display = 'none'; 
    padlock.innerText = "\u{1f512}";
    level.removeEventListener("click", selectDifficulty);    

    document.getElementsByClassName('wBox2')[0].style.visibility = "visible";
    let secs = window.setInterval(() => {
        document.getElementById("tick").innerText = ':' + timer;
        timer--;
    }, 1000);

    // /////choice between cash or mole
    let whereMole = window.setInterval(() => {
        result = choice(min, max);
        if (result % 2 == 0) {
            displayCash()
        }
        else {
            displayMole()
        };
    }, 1000);

    window.setTimeout(() => {
        window.clearInterval(whereMole);
        window.clearInterval(secs);
        document.getElementsByClassName('wBox2')[0].style.visibility = "hidden";
        document.getElementById('score').innerText = score;
        timer = 29
        clearHolesAfterRound();
    },10100); //shorten here for debugging mode
});

function choice(min, max) {
    let result = (Math.floor(Math.random() * (max - min + 1)) + 2);
    return result;
};
function displayMole() {
    let randomHole = null;
    let isRandomHoleAvailable = false;
    while (isRandomHoleAvailable === false) {
        randomHole = Math.floor(Math.random() * holes.length);
        isRandomHoleAvailable = !(holes[randomHole].classList.contains(`mole${round}`)) || !(holes[randomHole].classList.contains(`cash${round}`));
    }
    holes[randomHole].classList.add(`mole${round}`);
    window.setTimeout(() => {
        holes[randomHole].classList.remove(`mole${round}`);
    }, `${seconds}`);
};
function displayCash() {
    let randomHole = null;
    let isRandomHoleAvailable = false;
    while (isRandomHoleAvailable === false) {
        randomHole = Math.floor(Math.random() * holes.length);
        isRandomHoleAvailable = !(holes[randomHole].classList.contains(`mole${round}`)) || !(holes[randomHole].classList.contains(`cash${round}`));
    }
    holes[randomHole].classList.add(`cash${round}`);
    window.setTimeout(() => {
        holes[randomHole].classList.remove(`cash${round}`);
    }, `${seconds}`);
};
holes.forEach((val) => {
    val.addEventListener('click', (e) => {
        hit++
        if (e.target.classList.contains(`mole${round}`)) {
            e.target.classList.replace(`mole${round}`, "bop");
            setTimeout(() => {
                e.target.classList.remove("bop");
            }, 500);
            score = score - 15;
            minusAmt++;
            minusScore = minusVal * minusAmt;
        }
        else if (e.target.classList.contains(`cash${round}`)) {
            hit++
            e.target.classList.replace(`cash${round}`, "smash")
            setTimeout(() => {
                e.target.classList.remove("smash");
            }, 500);
            score = score + 50;
            plusAmt++;
            plusScore = plusVal * plusAmt;
        }
        else {
            miss++
        }
        document.getElementById('score').innerText = score;
    })
})

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
// /////display hearts for lives
function printHearts() {
    for (let i = 1; i < 5; i++) {
        let hearts = document.getElementsByClassName(`heart${i}`)[0];
        hearts.setAttribute('style', 'y:0', 'scale:1');
        hearts.innerText = "\u{2764}";
        hearts.style.opacity = 1;
    }
    begin();
}
// /////evaluation for percent to be converted and truncated
function goalReached() {
    percentage = quarterScore / 3;
    percentage = Math.min(100, Math.max(0, percentage));
    percent = percentage.toFixed(2);
}
function roundEnd() {
    quarterScore = plusScore + minusScore;
    goalReached();
    rScores.push(quarterScore);

    holes.forEach((val) => {
        val.classList.remove(`mole${round}`);
        val.classList.remove(`cash${round}`);
        val.classList.remove(`smash`);
        val.classList.remove(`bop`);
    })
    document.getElementById('eval').style.visibility = "visible";
    document.getElementById("plusAmt").innerText = plusAmt;
    document.getElementById("plusValue").innerText = plusVal;
    document.getElementById("plusScore").innerText = plusScore;
    document.getElementById("minusAmt").innerText = minusAmt;
    document.getElementById("minusValue").innerText = minusVal;
    document.getElementById("minusScore").innerText = minusScore;
    document.getElementById("percent").innerText = percent + '%';
    document.getElementById("quarterScore").innerText = quarterScore;
    whiteBoxes.classList.add('color');

    if (quarterScore < goal && life == 1) {
        noHearts();
    }
    else if (quarterScore < goal && life > 1) {
        rScores.pop(quarterScore);
        life--
        statusMessage(`Use a heart to try again`);
        let tryAgain = document.getElementById('eval');
        tryAgain = document.createElement("button");
        document.getElementById('eval').append(tryAgain);
        tryAgain.innerText = "\u{2764}";
        tryAgain.addEventListener("click", useHeart);
    }
    else if (round == 4) {
        statusMessage(`Congratulations, you made it! Push the button for your results.`);
        let advance = document.getElementById('eval');
        advance = document.createElement("button");
        document.getElementById('eval').append(advance);
        advance.innerText = "\u{1f525}";
        advance.addEventListener("click", gameEnd);
    }
    else {
        round++
        statusMessage(`Advance to the next level!`);
        let advance = document.getElementById('eval');
        advance = document.createElement("button");
        document.getElementById('eval').append(advance);
        advance.innerText = "\u{1f3c6}";       
        advance.addEventListener("click", roundUp);
    }
}
function sumArr() {
    let sum = 0;
    for (let i = 0; i < rScores.length; i++) {
        sum += rScores[i];
    }
    return sum;
}
function useHeart() {
    gsap.to(`.heart${life}`, { opacity: 0, duration: 2.5, y: -100, rotation: 720, scale: 0 });
    roundUp()
};
function noHearts() {
    statusMessage(`Uh oh! No more hearts.\nPush restart to play again.`);
    let doOver = document.getElementById('eval');
    doOver = document.createElement("button");
    document.getElementById('eval').append(doOver);
    doOver.innerText = "\u{21ba}";
    doOver.addEventListener("click", printHearts);
}

// /////stat modal drop
function clearHolesAfterRound() {
    let clearHole = document.querySelectorAll(`.mole${round}`);
    clearHole.forEach((val) => {
        val.classList.remove(`mole${round}`)
    });
    let clearHole1 = document.querySelectorAll(`.cash${round}`);
    clearHole1.forEach((val) => {
        val.classList.remove(`cash${round}`)
    });
    roundEndGSAP();
}
function roundEndGSAP(){
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
        .from("#eval", { opacity: 0 });
    roundEnd();
}
// /////function to roll up stat page and restart new level
function roundUp() {
    quarterScore = 0;
    score = 0;
    plusAmt = 0;
    plusScore = 0;
    minusAmt = 0;
    minusScore = 0;

    document.getElementById('start').style.visibility = "visible";
    header.innerText = `Level ${round}`;
    document.getElementById('eval').innerText = '';
    document.getElementById('score').innerText = score;
    document.getElementById('eval').style.visibility = "hidden";
    document.body.style.backgroundImage = `url(/dist/asset/round${round}.png)`;    
    document.getElementById('wBox5').src = `./asset/round${round + 1}.png`;
    document.getElementById('first').src = `./asset/minCash${round}.png`;
    document.getElementById('second').src = `./asset/mole${round}.png`;
    whiteBoxes.classList.remove('color');

    gsap.to(".roundModal", { y: "-100%", duration: 2.5, ease: "power1" });
    gsap.fromTo(".start", { opacity: 0, scale: 0 }, { duration: 1.5, opacity: 1, scale: 1, ease: "elastic" })
}
function gameEnd() {
    header.innerText = 'Final';
    gamePlay.score = sumArr();    
    postSB(masterArr);
    document.getElementById("quarter_one").innerText = rScores[0];
    document.getElementById("quarter_two").innerText = rScores[1];
    document.getElementById("quarter_three").innerText = rScores[2];
    document.getElementById("quarter_four").innerText = rScores[3];    
    document.getElementById("totalScore").innerText = gamePlay.score;

    let finalSBPrint = gsap.timeline()
    finalSBPrint
        .to(".roundModal", { opacity: 0, duration: .5, ease: "circ", })
        .to(".roundModal", { y: '-300%' })
        .to(".tsModal", { opacity: 1, duration: 1.3, y: "165%", ease: "bounce", }, "-=.5")
        .to(".scoreCap", { opacity: 1, duration: 1.5, ease: "circ" })

        // /////top part of scoreboard --player score
        .to(".quarter0", { opacity: 0, duration: .5, ease: "circ"})
        .fromTo(".pScore0",{ opacity: 0, scale: 0}, { opacity: 1, scale: 1, y:"-9", duration: .6, ease: "circ"},"<")
        .to(".quarter1", { opacity: 0, duration: .5, ease: "circ"})
        .fromTo(".pScore1", { opacity: 0, scale: 0, y: "-50" },{ opacity: 1, scale: 1, y:"-10", duration: .6, ease: "circ" },"<")
        .to(".quarter2", { opacity: 0, duration: .5, ease: "circ"})
        .fromTo(".pScore2", { opacity: 0, scale: 0, y: "-50" },{ opacity: 1, scale: 1, y:"-10", duration: .6, ease: "circ" },"<")
        .to(".quarter3", { opacity: 0, duration: .5, ease: "circ"})
        .fromTo(".pScore3", { opacity: 0, scale: 0, y: "-50" },{ opacity: 1, scale: 1, y:"-10", duration: .6, ease: "circ" },"<")
        .to(".quarter4", { opacity: 0, duration: .5, ease: "circ"})
        .fromTo(".pScore4",{ opacity: 0, scale: 0, y: "-50" }, { opacity: 1, scale: 1, y:"-10", duration: .6, ease: "circ" },"<")
        .to(".quarter5", { opacity: 0, duration: .5, ease: "circ"})
        .fromTo(".pScore5", { opacity: 0, scale: 0, y: "-50"},{ opacity: 1, scale: 1, y:"-10", duration: .6, ease: "circ" },"<")
        
        // /////bottom part of scoreboard --top ten
        .fromTo(".scoreModal", { opacity: 0 }, { opacity: 1, duration: 1, ease: "circ" }, "+=.5")
        .fromTo(".rank", { opacity: 0 }, { opacity: 1, duration: 2, ease: "circ", stagger: .4 })
        .fromTo(".lvColor", { opacity: 0 }, { opacity: 1, duration: 2, ease: "circ", stagger: .4 }, "<")
        .fromTo(".score", { opacity: 0 }, { opacity: 1, duration: 2, ease: "circ", stagger: .4 }, "<")
        .fromTo(".name", { opacity: 0 }, { opacity: 1, duration: 2, ease: "circ", stagger: .4 }, "<")
        .fromTo(".time", { opacity: 0 }, { opacity: 1, duration: 2, ease: "circ", stagger: .4 }, "<")     
        .fromTo("#message", { opacity: 0, scale: 0, x: "13%", y: "33%" }, { opacity: 1, scale: 1.1, ease: "power2", duration: 1 }, "-=1")
        .fromTo("#eval2", { opacity: 0, x: "0%" }, { opacity: 1, x: "90%",  y: "0%", duration: 1, ease: "back", rotation: "720" }, "-=1");

 let fadeDuration = 1,
    stayDuration = 3,
    finalSBPrint2 = gsap.timeline({repeat: -1});

finalSBPrint2.to(".time", {opacity: 0, duration: fadeDuration}, stayDuration)
  .to(".date", {opacity: 1, duration: fadeDuration}, "-=100%")
  .to(".time", {opacity: 1, duration: fadeDuration}, "+=" + stayDuration)
  .to(".date", {opacity: 0, duration: fadeDuration}, "-=100%");
  
  let master = gsap.timeline();
  master
  .add(finalSBPrint)
  .add(finalSBPrint2);

  document.getElementById('message').innerText = `Try to beat your score`;
    let playAgain = document.getElementById('eval2');
    playAgain = document.createElement("button");
    document.getElementById('eval2').append(playAgain);
    playAgain.innerText = "\u{1f3ac}";
    playAgain.addEventListener("click", startGameAgain);
}

// /////color display for scoreboard
function setLevelColor(currentPlace, currentLevel) {
    switch (currentLevel) {
        case "EASY":
            document.getElementsByClassName("rank")[currentPlace].style.color = '#5dca5d';
            document.getElementsByClassName("lvColor")[currentPlace].style.color = '#5dca5d';
            document.getElementsByClassName("lvColor")[currentPlace].innerText = 'EASY';
            document.getElementsByClassName("score")[currentPlace].style.color = '#5dca5d';
            document.getElementsByClassName("name")[currentPlace].style.color = '#5dca5d';
            document.getElementsByClassName("time")[currentPlace].style.color = '#5dca5d';
            document.getElementsByClassName("date")[currentPlace].style.color = '#5dca5d';
            break;
        case "MED":
            document.getElementsByClassName("rank")[currentPlace].style.color = '#f3f365';
            document.getElementsByClassName("lvColor")[currentPlace].style.color = '#f3f365';
            document.getElementsByClassName("lvColor")[currentPlace].innerText = 'MED';
            document.getElementsByClassName("score")[currentPlace].style.color = '#f3f365';
            document.getElementsByClassName("name")[currentPlace].style.color = '#f3f365';
            document.getElementsByClassName("time")[currentPlace].style.color = '#f3f365';
            document.getElementsByClassName("date")[currentPlace].style.color = '#f3f365';
            break;
        case "HARD":
            document.getElementsByClassName("rank")[currentPlace].style.color = '#fd7575';
            document.getElementsByClassName("lvColor")[currentPlace].style.color = '#fd7575';
            document.getElementsByClassName("lvColor")[currentPlace].innerText = 'HARD';
            document.getElementsByClassName("score")[currentPlace].style.color = '#fd7575';
            document.getElementsByClassName("name")[currentPlace].style.color = '#fd7575';
            document.getElementsByClassName("time")[currentPlace].style.color = '#fd7575';
            document.getElementsByClassName("date")[currentPlace].style.color = '#fd7575';
            break;
        default:
            alert("Should never see this!!");
            break;
    }
}
function sortArrayDescending(arrayToSort, fieldToSortOn) {
    return arrayToSort.sort((a, b) => (a[fieldToSortOn] > b[fieldToSortOn]) ? -1 : 1);
}
function postSB(arrayOfPlayers) {
    game++

    let levelBlock = document.getElementsByClassName('lvColor');
    let scoreBlock = document.getElementsByClassName('score');
    let nameBlock = document.getElementsByClassName('name');
    let time = document.getElementsByClassName('time');
    let date = document.getElementsByClassName('date');

    // Sorted Array of previous games
    isTopTen(gamePlay, arrayOfPlayers);

    //display leader board
    for (let currentPlace = 0; currentPlace < arrayOfPlayers.length; currentPlace++) {
        let currentPlayer = arrayOfPlayers[currentPlace];

        levelBlock[currentPlace].innerText = currentPlayer.level;
        scoreBlock[currentPlace].innerText = currentPlayer.score;
        nameBlock[currentPlace].innerText = currentPlayer.name;
        time[currentPlace].innerText = currentPlayer.time;
        date[currentPlace].innerText = currentPlayer.date;

        setLevelColor(currentPlace, currentPlayer.level)
    }
}
function isTopTen(gamePlay, arrayOfPlayers) {
    arrayOfPlayers = sortArrayDescending(arrayOfPlayers, "score");
    if ((arrayOfPlayers.length < 10)  // Player automatically in if less than 10 players saved
        || (gamePlay.score > arrayOfPlayers[arrayOfPlayers.length - 1].score)) {
        // Now player is in Top 10
        arrayOfPlayers.push({
            name: getName(),
            level: gamePlay.level,
            score: gamePlay.score,
            time: getTime(),
            date: getDate(),   
        });

        // Reset length of arrayOfPlayers (masterArr)
        arrayOfPlayers = sortArrayDescending(arrayOfPlayers, "score");
        arrayOfPlayers.length = (arrayOfPlayers.length > 10)
            ? 10
            : arrayOfPlayers.length;        

        gameLocalStorage.setMasterArr(arrayOfPlayers);
        localStorage.setItem(lsName, JSON.stringify(masterArr));
    }
};
function getName() {
    let sName = prompt("Well done, you! Make your mark next to your score (limit 3 characters).");
    return sName.length >= 3
        ? sName.substring(0, 3)
        : sName;
}
function getTime() {
    let currTime = new Date();
    timeStamp = currTime.getHours() + ':' + currTime.getMinutes() + ':' + currTime.getSeconds() 
    return timeStamp;
}
function getDate() {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let currDate = new Date();
    let month = currDate.getMonth();

    dateStamp = months[month] + '.' + currDate.getDate() + '.' + (currDate.getFullYear() - 2000);
    return dateStamp;
}


// function gameCount(){


// let sGame=[];
// sGame =`sbg${game}` 

// sGame.push($`seconds`,sumArr())
//  console.log(sGame,`sbg${game}`  )
// }

////////////////////////////////
//IIFE - Immediately Invoked Function Expression



let myGame = (() => {

    // Private Variables

    // Private Functions
    function intro() {
        header.innerText = "CashSmash";
    let rule = CSSRulePlugin.getRule("p:after");
    start.style.visibility = "hidden";
    let exitIntro1 = document.getElementById('xIntro');
    document.getElementById('min1').src = `./asset/minCash1.png`;
    document.getElementById('min2').src = `./asset/minCash2.png`;
    document.getElementById('min3').src = `./asset/minCash3.png`;
    document.getElementById('min4').src = `./asset/minCash4.png`;
    exitIntro1.addEventListener("click", exitIntro);

    let intro = gsap.timeline({ defaults: { duration: 1.5 } })
    intro
        // /////modal slide in
        .fromTo(".introModal", { opacity: 0, x: '-200%', y: '165%' }, { opacity: .8, duration: 1.5, x: 0, ease: "circ" })
        // /////text reveal
        .to(rule, { cssRule: { scaleY: 0 }, duration: 3.5 }, "-=.5")
        // /////mole slide in
        .fromTo(".moleShow", { opacity: 0, x: '-1500%', }, { opacity: 1, x: 0, duration: 2 }, "-=3.5");

    let cashCarousel = gsap.timeline({ repeat: -1 });
    cashCarousel
        .from("#min1", { opacity: 0, x: '-80%', duration: .5 })
        .to("#min1", { opacity: 0, x: 0, duration: 1, delay: 2 })
        .from("#min2", { opacity: 0, x: '-80%', duration: .5 })
        .to("#min2", { opacity: 0, x: 0, duration: 1, delay: 2 })
        .from("#min3", { opacity: 0, x: '-80%', duration: .5 })
        .to("#min3", { opacity: 0, x: 0, duration: 1, delay: 2 })
        .from("#min4", { opacity: 0, x: '-80%', duration: .5 })
        .to("#min4", { opacity: 0, x: 0, duration: 1, delay: 2 });
  
    /////combining both timelines
    let master = gsap.timeline();
    master
        .add(intro)
        .add(cashCarousel);
    }

    intro();

    // Public Function
    function sayHi() {
        console.log("HI")
    }

    return {
        sayHi, // = sayHi: sayHi,
    }

})();

myGame.sayHi()

// let person = {
//   name: "Duane",
//   eyes: "Hazel"
// }

// person.sayHi=function(){console.log("hi" + this.name)}

// let person = {
//   name: "Duane",
//   eyes: "Hazel",
//   sayHi: function(){ console.log("Hi " + this.name + "!")},
//   sayHello: () => { console.log("Hello " + this.name); }
// }
// person.sayHi()   -> "Hi Duane"
// person.sayHello() => "Hello" -- arrow/anonymous function doesn't know "this"