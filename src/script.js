let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dino = document.querySelector('#dino');
let tree = document.querySelector('#tree');
let track = document.querySelector("#track");

// dino.style.position = "absolute"; 
let isJumping = false;

async function dinoJump(){
   setTimeout(() => {
      dino.style.top = "700px";
   } ,100)
   setTimeout(() => {
      dino.style.top = "780px";
   }, 800)
}
function treeWalking(){
   tree.style.left = "100px";
}
addEventListener("keyup", dinoJump)
treeWalking();

function startGame(){
   treeWalking();
   addEventListener("keyup", dinoJump)
}