// window.addEventListener("scroll", preventMotion, false);
// window.addEventListener("touchmove", preventMotion, false);

// function preventMotion(event)
// {
//     window.scrollTo(0, 0);
//     event.preventDefault();
//     event.stopPropagation();
// }

let score = 0;
let game = 0;
let timer = 29;
let round = 1;
let plusAmt = 0;
let plusVal = 50;
let plusScore = 0;
let minusAmt = 0;
let minusVal = -15;
let minusScore = 0;
let totalScore = [];
let rScores = [];
let newArr = [];
let result = 0;
let percent = 0;
let min = round;
let max = round + 1;
let life = 5;
let goal = 0;
let hand = '\u{261e}';
let lock = '\u{1f512}';
let heart = '\u{2764}';
let trophy = '\u{1f3c6}';
let unlock = '\u{1f513}';
let restart = '\u{21ba}';
let fire = '\u{1f525}'
let again = '\u{1f3ac}';
let start = document.getElementById('start');
let time = document.getElementById('time');
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
let cash5 = document.querySelectorAll(".cash5");
let minCash1 = document.querySelectorAll("#minCash1");
let minCash2 = document.querySelectorAll("#minCash2");
let minCash3 = document.querySelectorAll("#minCash3");
let minCash4 = document.querySelectorAll("#minCash4");
let minCash5 = document.querySelectorAll("#minCash5");
let coolmole = document.getElementById("coolmole1");
let header = document.getElementById('header');
let level =document.getElementById('level');
let padlock =document.getElementById('padlock');
let finger =document.getElementById('finger');
let choiceStack = document.getElementsByClassName('choice')[0];
const darkmole = [mole1, mole2, mole3, mole4];
const darkcash = [cash1, cash2, cash3, cash4];
let mole = darkmole[round];
let cash = darkcash[round];
let seconds;
let sum;

window.onload = intro();

function intro(){  
    let rule = CSSRulePlugin.getRule("p:after");
    start.style.visibility = "hidden";
    let xIntro1 = document.getElementById('xIntro');    
    document.getElementById('min1').src = `./asset/minCash1.png`;
    document.getElementById('min2').src = `./asset/minCash2.png`;
    document.getElementById('min3').src = `./asset/minCash3.png`;
    document.getElementById('min4').src = `./asset/minCash4.png`;
    xIntro1.addEventListener("click", xIntro);

   let intro = gsap.timeline({ defaults: { duration: 1.5} })
    intro    
    // /////modal slide in
    .fromTo(".introModal", { opacity: 0, x:'-200%', y:'165%' },{ opacity: .87, duration: 1.5, x: 0, ease: "circ" }) 
    
    // /////text reveal
    .to(rule, {cssRule: {scaleY: 0}, duration: 4}, "-=.5")
    // /////mole slide in
    .fromTo(".moleHold", {opacity: 0, x: '-100%',},{ opacity: 1, x: 0, duration: 2},"-=3.5");
   
   let cashCarousel = gsap.timeline({repeat: -1});
    cashCarousel   
    .from("#min1", {opacity: 0, x: '-50%', duration: 1})
    .to("#min1", {opacity: 0, x: "0%", duration: 1, delay: 1.3 })    
    .from("#min2", {opacity: 0, x: '-50%', duration: 1})
    .to("#min2", {opacity: 0, x: "0%", duration: 1, delay: 1.3 })   
    .from("#min3", {opacity: 0, x: '-50%', duration: 1})
    .to("#min3", {opacity: 0, x: "0%", duration: 1, delay: 1.3 })   
    .from("#min4", {opacity: 0, x: '-50%', duration: 1})
    .to("#min4", {opacity: 0, x: "0%", duration: 1, delay: 1.3 })  
    .tweenFromTo("hold","end",); 

    // /////combining both timelines
    let master = gsap.timeline();
    master
    .add(intro)
    .add(cashCarousel);
}
 function xIntro(){
    document.getElementsByClassName('choiceblock')[0].style.visibility = "visible";
    totalScore.push("med");
    level.innerText = 'MED';
    finger.innerText = `${hand}`;

    // /////intromodal leaving
    let tl = gsap.timeline()
    tl    
   .to(".introModal", {opacity: 0, x:'200%', y:"165%", duration: 1, ease: "circ",delay: ".5"});
    level.setAttribute('style','transform:translate(0,0px'); 
    hearts()
    levelChoice()
 }
 function reStart(){
    gsap.to(".tsModal", {opacity: 0, duration: 1, ease: "circ", y:'-165%'});    
    padlock.innerText = `${unlock}`;
    level.style.cursor= 'pointer';
    level.addEventListener("click", difficultyLevel);
    hearts()
 }
function levelChoice(){        
    padlock.innerText = `${unlock}`;
    level.style.cursor= 'pointer';
    finger.setAttribute('style','top: -60px;');     
    finger.addEventListener("click", difficultyLevel);

    let point = gsap.timeline();
    point
    .to("#finger", {x: "20%", repeat:5, yoyo:true, duration: .3, delay: 3})
    .to("#finger", {x: "20%", repeat:5, yoyo:true, duration: .3, delay: 5});
}
    
function difficultyLevel(){
    choiceStack.setAttribute('style','right: 0%;');
    finger.style.transform="translate(0,30px)";    
    level.setAttribute('style','height:30px;');  
    finger.innerText = '';   
    close.addEventListener("click", doneChoosing);   
    easy.addEventListener("click", difficultyLevel);  
    med.addEventListener("click", difficultyLevel);  
    hard.addEventListener("click", difficultyLevel);  

    if (document.getElementById('easy').checked) {
         seconds = 2000;
         level.innerText = 'EASY';
         level.style.color ='#5dca5d';
         level.style.border ='#5dca5d 2px solid';
         totalScore.pop();
         totalScore.push("easy");
    }
    if (document.getElementById('med').checked) {
         seconds = 1000;
         level.innerText = 'MED';
         level.style.color ='#f3f365';
         level.style.border ='#f3f365 2px solid';
         totalScore.pop();
         totalScore.push("med");
    }
    if (document.getElementById('hard').checked) {
         seconds = 500;
         level.innerText = 'HARD';
         level.style.color ='#fd7575';
         level.style.border ='#fd7575 2px solid';
         totalScore.pop();
         totalScore.push("hard");
    }
}
 function doneChoosing() {    
     choiceStack.setAttribute('style','right:-40%;');
     document.getElementsByClassName('choiceblock')[0].style.height='30px';           
       
     switch(totalScore[0]) {
        case "easy":
            level.innerText = 'EASY';
            level.style.color ='#5dca5d';
            level.style.border ='#5dca5d 2px solid';
        break;
        case "med":
            level.innerText = 'MED';
            level.style.color ='#f3f365';
            level.style.border ='#f3f365 2px solid';
        break;
        case "hard":
            level.innerText = 'HARD';
            level.style.color ='#fd7575';
            level.style.border ='#fd7575 2px solid';
        break;
        }
 }
function begin() {
    life = 5;
    round = 1;
    rScores=[]; 
    roundUp();
    header.innerText = "CashSmash";    
}
start.addEventListener("click", () => {
    doneChoosing();
    padlock.innerText = `${lock}`;
    level.style.cursor= 'default';
    header.innerText= `Level ${round}`;
    finger.style.display='none';   
    finger.removeEventListener("click", difficultyLevel);
    start.style.visibility = "hidden";
    document.getElementsByClassName('wBox2')[0].style.visibility = "visible";
    let time = window.setInterval(() => {
        document.getElementById("time").innerText = ':' + timer;
        timer--;
    }, 1000);

    //choice between cash or mole
    let whereMole = window.setInterval(() => {
        result = choice(min, max);
        console.log(result);
        if (result % 2 == 0) {
            displayCash()
        }
        else {
            displayMole()
        };
    }, 1000);

    window.setTimeout(() => {
        window.clearInterval(whereMole);
        window.clearInterval(time);
        document.getElementsByClassName('wBox2')[0].style.visibility = "hidden";
        document.getElementById('score').innerText = score;
        timer = 29
        roundGsap();
    },10100); //shortened for debugging mode
});

function choice(min, max) {
    let result = (Math.floor(Math.random() * (max - min + 1)) + 2);
    return result;
};

const displayMole = () => {
    let randomHole = null;
    let isRandomHoleAvailable = false;
    while (isRandomHoleAvailable === false) {
        randomHole = Math.floor(Math.random() * holes.length);
        isRandomHoleAvailable = !(holes[randomHole].classList.contains(`mole${round}`)) || !(holes[randomHole].classList.contains(`cash${round}`));
    }
    // let clear = window.setInterval(() => {
    //     holes[randomHole].classList.add(`mole${round}`);

    //     //      let clearHole = document.querySelectorAll(`.mole${round}`);
    //     // clearHole.forEach((val) => {
    //     //val.classList.replace(`mole${round}`, "darkhole");
    //     //console.log("val.classList", val.classList)
    //     // val.classList.remove(`mole${round}`); 
    // }, 2000)
    // window.setTimeout(() => {
    //     window.clearInterval(clear);
    //     holes[randomHole].classList.remove(`mole${round}`);
      
    // }, 3000);

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
};

const displayCash = () => {
    let randomHole = null;
    let isRandomHoleAvailable = false;
    while (isRandomHoleAvailable === false) {
        randomHole = Math.floor(Math.random() * holes.length);
        isRandomHoleAvailable = !(holes[randomHole].classList.contains(`mole${round}`)) || !(holes[randomHole].classList.contains(`cash${round}`));
    }
    // holes[randomHole].classList.add(`cash${round}`);


    // let clear1 = window.setInterval(() => {
    //     console.log("clear");
    //     let clearHole1 = document.querySelectorAll(`.cash${round}`);
    //     clearHole1.forEach((val) => {
    //         //val.classList.replace(`cash${round}`, "darkhole");
    //         val.classList.remove(`cash${round}`);//, "darkhole");
    //     })
    // }, 2000);
    // window.setTimeout(() => {
    //     window.clearInterval(clear1);
    let clear = window.setInterval(() => {
        holes[randomHole].classList.add(`cash${round}`);

        //      let clearHole = document.querySelectorAll(`.mole${round}`);
        // clearHole.forEach((val) => {
        //val.classList.replace(`mole${round}`, "darkhole");
        //console.log("val.classList", val.classList)
        // val.classList.remove(`mole${round}`); 
    }, 1500)
    window.setTimeout(() => {
        window.clearInterval(clear);
        holes[randomHole].classList.remove(`cash${round}`);

        console.log("round", round);
      
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
}, 2000);

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
//display hearts for lives
function hearts() {
    
    for (let i = 1; i < 5; i++) {
        let hearts = document.getElementsByClassName(`heart${i}`)[0];
        hearts.innerText = `${heart}`;
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
    totalScore.push(quarterScore);

    let clearHole = document.querySelectorAll(`.mole${round}`);
    clearHole.forEach((val) => {
       
        console.log("val.classList", val.classList)
        val.classList.remove(`mole${round}`);
        val.classList.remove(`cash${round}`);
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
        totalScore.pop(quarterScore);
        life--
        statusMessage(`Use a heart and try again`);
        let tryAgain = document.getElementById('eval');
        tryAgain = document.createElement("button");
        document.getElementById('eval').append(tryAgain);
        tryAgain.innerText = `${heart}`;
        tryAgain.addEventListener("click", useHeart);
    }
    else if (round== 4){
        statusMessage(`Congratulations, you made it! Push the button for your results. `);
        let advance = document.getElementById('eval');
        advance = document.createElement("button");
        document.getElementById('eval').append(advance);
        advance.innerText = `${fire}`;
        advance.addEventListener("click", gameEnd);
    }    
    else{
        round++
        statusMessage(`Advance to the next level!`);
        let advance = document.getElementById('eval');
        advance = document.createElement("button");
        document.getElementById('eval').append(advance);
        advance.innerText = `${trophy}`;
        advance.addEventListener("click", roundUp);
    }
}
function sumArr() {
    let sum = 0;
    for (let i = 0; i < rScores.length; i++) {
        sum += rScores[i];
        
    }console.log(rScores, sum);

    return sum;
}
function useHeart() {
    gsap.to(`.heart${life}`, { opacity: 0, duration: 2.5, y: -100, rotation: 720, scale: 0 });
    console.log(life);
    roundUp()
};
function noHearts() {
    statusMessage(`Uh oh! No more hearts.\nPush restart to play again.`);
    let doOver = document.getElementById('eval');
    doOver = document.createElement("button");
    document.getElementById('eval').append(doOver);
    doOver.innerText = `${restart}`;
    doOver.addEventListener("click", begin);
}

// /////stat modal drop
function roundGsap() {
    let clearHole = document.querySelectorAll(`.mole${round}`);
    clearHole.forEach((val) => {
        console.log("val.classList", val.classList)
        val.classList.remove(`mole${round}`)
    });
    let clearHole1 = document.querySelectorAll(`.cash${round}`);
    clearHole1.forEach((val) => {
        console.log("val.classList", val.classList)
        val.classList.remove(`cash${round}`)
    });
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
        .from("#eval", { x: "-30%" });
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

    header.innerText= `Level ${round}`;
    document.getElementById('eval').innerText = '';
    document.getElementById('score').innerText = score;    
    document.getElementById('eval').style.visibility = "hidden";
    document.body.style.backgroundImage = `url(/dist/asset/round${round}.png)`;
    document.getElementById('start').style.visibility = "visible";
    document.getElementById('wBox5').src = `./asset/round${round + 1}.png`;
    document.getElementById('first').src = `./asset/minCash${round}.png`;
    document.getElementById('second').src = `./asset/mole${round}.png`;
    whiteBoxes.classList.remove('color');

    gsap.to(".roundModal", { y: "-100%", duration: 2.5, ease: "power1" });
    gsap.fromTo(".start", { opacity: 0, scale: 0 }, { duration: 2.5, opacity: 1, scale: 1, ease: "elastic" })
    
}
function gameEnd() {
    header.innerText= 'Final';
    levelColor();
    document.getElementById("color").innerText=totalScore[0];
    rScores =totalScore.splice(1,5);
    document.getElementById("totalScore").innerText = sumArr(newArr);  
    sumArr();
    scoreBoard();
    
    document.getElementById("quarter_one").innerText = rScores[0];
    document.getElementById("quarter_two").innerText = rScores[1];
    document.getElementById("quarter_three").innerText = rScores[2];
    document.getElementById("quarter_four").innerText = rScores[3];
    document.getElementById('all').innerText = sumArr();
    

    let final = gsap.timeline() 
    final   
    .to(".roundModal", {opacity: 0, duration: .5, ease: "circ",})
    .to(".roundModal", {y: '-200%'})
    .to(".tsModal", { opacity: 1, duration: 1.3, y: "165%", ease: "bounce", }, "-=.5")
    .to(".scoreCap", {opacity: 1, duration: 1.5, ease: "circ"})
    .fromTo(".pScore0", {opacity: 0, scale: 0 },{opacity: 1,  scale: 1,duration: .3,ease: "circ" })  
    .fromTo(".quarter", {opacity: 0, scale: 0 },{opacity: 1,  scale: 1,duration: .3,ease: "circ",  stagger: .4 })  
    .fromTo(".scoreModal", {opacity: 0},{opacity: 1, duration: 1, ease: "circ" }, "+=.5")
    .fromTo(".score2", {opacity: 0 },{opacity: 1, duration: 2,ease: "circ",  stagger: .4 })
    .fromTo(".score", {opacity: 0 },{opacity: 1, duration: 2,ease: "circ",  stagger: .4 }, "<")
    .fromTo("#color", {opacity: 0 },{opacity: 1, duration: 2,ease: "circ",  stagger: .4 }, "<")
    .fromTo("#message", { opacity: 0, scale: 0, x: "10%", y: "30%"   }, { opacity: 1, scale: 1.1, ease: "power2", duration: 1 }, "-=1")
    .fromTo("#eval2", {  opacity: 0, x: "0%", },{  opacity: 1, x: "500%", duration: 1, y: "0%", ease: "back"},"-=1");

    document.getElementById('message').innerText= `Try to beat your score`;
        let playAgain = document.getElementById('eval2'); 
        playAgain = document.createElement("button");
        document.getElementById('eval2').append(playAgain);
        playAgain.innerText = `${again}`;
        playAgain.addEventListener("click", reStart);   
}
// /////color display for scoreboard
function levelColor(){    
switch(totalScore[0]) {
    case "easy":
        document.getElementsByClassName("score2")[0].style.color ='#5dca5d';
        document.getElementsByClassName("score")[0].style.color ='#5dca5d';
        document.getElementsByClassName("level_color")[0].style.color ='#5dca5d';
        document.getElementById('color').innerText = 'EASY';
    break;
    case "med":
        document.getElementsByClassName("score2")[0].style.color ='#f3f365';
        document.getElementsByClassName("score")[0].style.color ='#f3f365';
        document.getElementsByClassName("level_color")[0].style.color ='#f3f365';
        document.getElementById('color').innerText = 'MED';
    break;
    case "hard":
        document.getElementsByClassName("score2")[0].style.color ='#fd7575';
        document.getElementsByClassName("score")[0].style.color ='#fd7575';
        document.getElementsByClassName("level_color")[0].style.color ='#fd7575';
        document.getElementById('color').innerText = 'HARD';
    break;
    }
}
function scoreBoard(){  
 sum = sumArr(rScores);
 game++
//  gameCount()
let i = 0;
let ii = 0;
let iii = 0;
let iv = 0;
let v = 0;
let vi = 0;
let vii = 0;
let viii = 0;
let ix = 0;
let x = 0;

    if (sum >= i){
        x=ix;
        ix=viii;
        viii=vii;
        vii=vi;
        vi=v;
        v=iv;
        iv=iii;
        iii=ii;
        ii=i;
        i=sum;
    }else if(sum >= ii){
        x=ix;
        ix=viii;
        viii=vii;
        vii=vi;
        vi=v;
        v=iv;
        iv=iii;
        iii=ii;
        ii=sum;        
    }else if(sum >= iii){
        x=ix;
        ix=viii;
        viii=vii;
        vii=vi;
        vi=v;
        v=iv;
        iv=iii;
        iii=sum;        
    }else if(sum >= iv){
        x=ix;
        ix=viii;
        viii=vii;
        vii=vi;
        vi=v;
        v=iv;
        iv=sum;        
    }else if(sum >= v){
        x=ix;
        ix=viii;
        viii=vii;
        vii=vi;
        vi=v;
        v=sum;        
    }else if(sum >= vi){
        x=ix;
        ix=viii;
        viii=vii;
        vii=vi;
        vi=sum;        
    }else if(sum >= vii){
        x=ix;
        ix=viii;
        viii=vii;
        vii=sum;        
    }else if(sum >= viii){
        x=ix;
        ix=viii;
        viii=sum;        
    }else if(sum >= ix){
        x=ix;
        ix=sum;                
    }else if(sum >= x){
        x=sum;
    }
    document.getElementById("i").innerText=i;
    document.getElementById("ii").innerText=ii;
    document.getElementById("iii").innerText=iii;
    document.getElementById("iv").innerText=iv;
    document.getElementById("v").innerText=v;
    document.getElementById("vi").innerText=vi;
    document.getElementById("vii").innerText=vii;
    document.getElementById("viii").innerText=viii;
    document.getElementById("ix").innerText=ix;
    document.getElementById("x").innerText=x;
}
function gameCount(){
    

let sGame=[];
sGame =`sbg${game}` 

sGame.push($`seconds`,sumArr())
 console.log(sGame,`sbg${game}`  )
}