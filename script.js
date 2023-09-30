const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".highscore");
const control = document.querySelectorAll(".controls i");

const foodSound = new Audio('food.mp3');
const gameoverSound = new Audio('gameover.mp3');
const music = new Audio('music.mp3');
const move = new Audio('move.mp3');


let foodX,foodY;
let snakeBody = [];
let snakeX =5,snakeY=10;
let gameOver = false;
let velocityX = 0,velocityY= 0;
let score = 0;
let setIntervalId;

let highScore =  localStorage.getItem("highscore")|| 0;
highScoreElement.innerText = `High-Score: ${highScore}`;

const changeFoodPosition = ()=>{
    foodX = Math.floor(Math.random()*30)+1;
    foodY = Math.floor(Math.random()*30)+1;
    foodSound.play();
   
}

const handleGameOver = ()=>{
    gameoverSound.play();
    music.pause();
    clearInterval(setIntervalId);
    alert("Game over! press ok to replay...");
    location.reload();
    gameoverSound.pause();
   

}
const changeDirection = (e)=>{
    move.play();
if(e.key === "ArrowUp" && velocityY != 1){
    velocityX = 0;
    velocityY = -1;
} else if(e.key === "ArrowDown" && velocityY != -1){
    velocityX = 0;
    velocityY = 1;
}
else if(e.key === "ArrowLeft" && velocityX != 1){
    velocityX = -1;
    velocityY = 0;
}
else if(e.key === "ArrowRight" && velocityX != -1){
    velocityX = 1;
    velocityY = 0;
}
// 

}
control.forEach(key =>{
    key.addEventListener("click",()=> changeDirection({key:key.dataset.key}))
})
changeFoodPosition();
const initGame = ()=>{
    if(gameOver) return handleGameOver();
    music.play();
    let htmlMarkup = `<div class ="food" style="grid-area: ${foodY}/${foodX}"></div>`;
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY])
        score++;
          highScore =  score >= highScore ? score : highScore;
          localStorage.getItem("highscore",highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High-Score: ${highScore}`;
    }

   for(let i =snakeBody.length-1;i > 0;i--){
    snakeBody[i] =  snakeBody[i-1];
   }
    

    snakeBody[0] = [snakeX,snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY>30){
         gameOver = true;
    }

    for(let i = 0;i<snakeBody.length;i++){
        htmlMarkup += `<div class ="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
        if(i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
    
    playBoard.innerHTML = htmlMarkup;

}
 setIntervalId = setInterval(initGame,125)

document.addEventListener("keydown",changeDirection);

