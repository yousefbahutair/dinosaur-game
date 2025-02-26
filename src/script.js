let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dino = document.querySelector('#dino');
let tree = document.querySelector("#tree");
let track = document.querySelector("#track");

dino.style.position = "absolute"; 
dino.style.top = "300px"; 
let isJumping = false;

document.addEventListener("keyup", (e) => {
     console.log(e.key);
    if (e.key === 'ArrowUp' && !(isJumping)) {
       jump();
       dino.style.top = "300px";
    }
});

function jump() {
    isJumping = true;
     let currentTop = parseInt(dino.style.top); 
     dino.style.top = `${currentTop + 50}px`
        setTimeout(() => { 
            dino.style.top = `${currentTop - 50}px`;
            isJumping = false;
        } , 100)
       
}
