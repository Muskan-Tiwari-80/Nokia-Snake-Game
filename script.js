const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");

const box = 20;

let snake = [
    {x:160,y:160}
];

let food = {
    x:Math.floor(Math.random()*16)*20,
    y:Math.floor(Math.random()*16)*20
};

let score = 0;

let direction = "";

document.addEventListener("keydown",changeDirection);

document.getElementById("up").onclick=()=>direction="UP";
document.getElementById("down").onclick=()=>direction="DOWN";
document.getElementById("left").onclick=()=>direction="LEFT";
document.getElementById("right").onclick=()=>direction="RIGHT";

function changeDirection(e){

    if(e.key==="ArrowUp" && direction!="DOWN")
        direction="UP";

    if(e.key==="ArrowDown" && direction!="UP")
        direction="DOWN";

    if(e.key==="ArrowLeft" && direction!="RIGHT")
        direction="LEFT";

    if(e.key==="ArrowRight" && direction!="LEFT")
        direction="RIGHT";
}

function collision(head,array){

    for(let i=0;i<array.length;i++){

        if(head.x===array[i].x && head.y===array[i].y){

            return true;
        }
    }

    return false;
}

function draw(){

    ctx.fillStyle="#8bac0f";
    ctx.fillRect(0,0,320,320);

    for(let i=0;i<snake.length;i++){

        ctx.fillStyle=i==0?"#0f380f":"#306230";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

    }

    ctx.fillStyle="red";
    ctx.fillRect(food.x,food.y,box,box);

    let x=snake[0].x;
    let y=snake[0].y;

    if(direction=="LEFT") x-=box;
    if(direction=="RIGHT") x+=box;
    if(direction=="UP") y-=box;
    if(direction=="DOWN") y+=box;

    if(x===food.x && y===food.y){

        score++;
        scoreText.innerText=score;

        food={
            x:Math.floor(Math.random()*16)*20,
            y:Math.floor(Math.random()*16)*20
        };

    }else{

        snake.pop();

    }

    let head={x,y};

    if(
        x<0 ||
        y<0 ||
        x>=320 ||
        y>=320 ||
        collision(head,snake)
    ){

        clearInterval(game);

        alert("Game Over! Score : "+score);

    }

    snake.unshift(head);

}

const game=setInterval(draw,120);
