const grid = document.querySelector(".grid");  
const score = document.querySelector(".Score");

let countingScore=0;
const WidthofBlock = 100;
const heightofBlock = 20;
const playerStart = [270,10];

let TimerId;
let Xdir= 2;
let Ydir= 2;

let pCurposition = playerStart;
const gridWidth = 560;
const gridHeight = 300;

let ballheight = 20;
const ballStart = [270,40];
let bCurposition = ballStart; 

class CreateBlock{
    constructor(x,y){
        this.bottomLeft = [x,y];
        this.bottomright = [x + WidthofBlock,y];
        this.topLeft = [x,y+heightofBlock];
        this.topRight = [x+WidthofBlock,y+heightofBlock]; 
    }
}

const blocks = [
    new CreateBlock(10,270),
    new CreateBlock(120,270),
    new CreateBlock(230,270),
    new CreateBlock(340,270),
    new CreateBlock(450,270),
    new CreateBlock(10,240),
    new CreateBlock(120,240),
    new CreateBlock(230,240),
    new CreateBlock(340,240),
    new CreateBlock(450,240),    
    new CreateBlock(10,210),
    new CreateBlock(120,210),
    new CreateBlock(230,210),
    new CreateBlock(340,210),
    new CreateBlock(450,210),
]

function blockAdd(){
    for(let i=0;i<blocks.length;i++){
        const block = document.createElement('div');
        block.classList.add("block");
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1]+'px';
        grid.appendChild(block);
    }
}


blockAdd();


const player = document.createElement("div");
player.style.left = pCurposition[0]+'px';
player.style.bottom = pCurposition[1]+'px';
player.classList.add('player');
grid.appendChild(player)


//draw
function playerdraw(){
    player.style.left = pCurposition[0]+'px';
    player.style.bottom = pCurposition[1]+'px';
}
// ball draw

function ballDraw(){
    ball.style.left = bCurposition[0]+'px';
    ball.style.bottom = bCurposition[1]+'px';   
}

//move
function playermove(e){
    switch(e.key){
        case 'ArrowLeft':
        if(pCurposition[0]>0){
            pCurposition[0] -= 10;
                playerdraw();
        }    
            break;
        case 'ArrowRight':
                if(pCurposition[0]<gridWidth - WidthofBlock){
                    pCurposition[0] += 10;
                    playerdraw();
                }
                break;
    }

}

document.addEventListener("keydown",playermove);

// ball

const ball = document.createElement('div');
ball.classList.add("ball");
ballDraw()
grid.appendChild(ball);

//ball move

function ballMove(){
    bCurposition[0]+= Xdir;
    bCurposition[1]+= Ydir;
    ballDraw();
    Check()
}

TimerId =setInterval(ballMove,20);

function Check(){

    //check for block collicions

    for(let i=0;i<blocks.length;i++){
        if(
            (bCurposition[0] > blocks[i].bottomLeft[0] && bCurposition[0] < blocks[i].bottomright[0])
            &&
            ((bCurposition[1]+ballheight)> blocks[i].bottomLeft[1] && bCurposition[1]<blocks[i].topLeft[1])
        ){
            const allblocks = Array.from(document.querySelectorAll(".block"))
            allblocks[i].classList.remove('block');
            blocks.splice(i,1);
            changeDirection();
            countingScore++;
            score.innerHTML =countingScore;
            // check for win
            
            if(blocks.length === 0){
                score.innerHTML = "You win";
                clearInterval(TimerId);
                removeEventListener("keydown",playermove);
            }

        }
    }
    // chek for player collisions
    
    if(
        (bCurposition[0]>pCurposition[0] && bCurposition[0] < pCurposition[0] + WidthofBlock)&&
        (bCurposition[1] > pCurposition[1] && bCurposition[1] < pCurposition[1] + heightofBlock)
    ){
        changeDirection();
    }


    //check for wall collisons
    if(bCurposition[0]>=(gridWidth-ballheight) || 
    bCurposition[1]>=(gridHeight-ballheight)||
    bCurposition[0]<= 0 
    ){
        changeDirection()
    }

    //check game over

    if(bCurposition[1]<=0){
        clearInterval(TimerId); 
        score.innerHTML = 'Youlose';
        document.removeEventListener('keydown',playermove);
    }
}

function changeDirection(){

    if(Xdir=== 2&&Ydir === 2){
        Ydir = -2;
        return
    }

    if(Xdir == 2&&Ydir === -2){
        Xdir = -2;
        return
    }

    if(Xdir === -2&&Ydir === -2){
        Ydir = 2;
        return;
    }

    if(Xdir ===-2&&Ydir === 2){
        Xdir = 2;
        return;
    }
}