let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dino = document.querySelector('#dino');
let tree = document.querySelector("#tree");
let track = document.querySelector("#track");

// dino.style.position = "absolute"; 
let isJumping = false;

async function dinoJump(){
   setTimeout(() => {
      dino.style.top = "700px";
   } ,500)
   setTimeout(() => {
      dino.style.top = "780px";
   }, 1100 )
}
addEventListener("keyup", dinoJump)
