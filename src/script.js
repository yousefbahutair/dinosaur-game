        const dino = document.getElementById('dino');
        const ground = document.getElementById('ground');
        const scoreElement = document.getElementById('score');
        const gameOverScreen = document.getElementById('game-over');
        let isJumping = false;
        let isDucking = false;
        let gameSpeed = 4;
        let score = 0;
        let gameActive = true;

        // Cactus types
        const cactusTemplates = [
            { type: 'small', variants: 3, width: 20, height: 40 },
            { type: 'large', variants: 3, width: 30, height: 50 }
        ];

        function createCactus() {
            const cactus = document.createElement('div');
            const type = Math.random() > 0.5 ? 'small' : 'large';
            const variant = Math.floor(Math.random() * 3) + 1;
            
            cactus.className = 'cactus';
            cactus.style.backgroundImage = `url(assets/images/${type === 'small' ? 'Small' : 'Large'}Cactus${variant}.png)`;
            cactus.style.width = `${type === 'small' ? 20 : 30}px`;
            cactus.style.height = `${type === 'small' ? 40 : 50}px`;
            
            return cactus;
        }

        function jump() {
            if (!isJumping && gameActive) {
                isJumping = true;
                dino.src = 'assets/images/DinoJump.png';
                dino.classList.add('jump');
                setTimeout(() => {
                    dino.classList.remove('jump');
                    isJumping = false;
                    dino.src = 'assets/images/DinoStart.png';
                }, 500);
            }
        }

        function duck() {
            if (!isJumping && gameActive) {
                isDucking = true;
                dino.src = 'assets/images/DinoDuck2.png';
                dino.classList.add('duck');
            }
        }

        function resetDino() {
            isDucking = false;
            dino.classList.remove('duck');
            dino.src = 'assets/images/DinoStart.png';
        }

        function updateScore() {
            score++;
            scoreElement.textContent = `Score: ${Math.floor(score/5)}`;
            if (score % 500 === 0) gameSpeed *= 1.05;
        }

        function checkCollision(cactus) {
            const dinoRect = dino.getBoundingClientRect();
            const cactusRect = cactus.getBoundingClientRect();
            
            return !(cactusRect.left > dinoRect.right || 
                   cactusRect.right < dinoRect.left || 
                   cactusRect.bottom < dinoRect.top);
        }

        function gameOver() {
            gameActive = false;
            ground.style.animation = 'none';
            document.querySelectorAll('.cactus').forEach(c => c.remove());
            gameOverScreen.style.display = 'block';
            document.getElementById('final-score').textContent = Math.floor(score/5);
        }

        // Game loop
        function gameLoop() {
            if (gameActive) {
                updateScore();
                const cactus = createCactus();
                game.appendChild(cactus);
                
                let cactusPosition = 800;
                const moveInterval = setInterval(() => {
                    cactusPosition -= gameSpeed;
                    cactus.style.right = `${cactusPosition}px`;
                    
                    if (cactusPosition < -100) {
                        clearInterval(moveInterval);
                        cactus.remove();
                    }
                    
                    if (checkCollision(cactus)) {
                        dino.src = 'assets/images/DinoDead.png';
                        gameOver();
                    }
                }, 10);
            }
            requestAnimationFrame(gameLoop);
        }

        // Controls
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                if (!gameActive) {
                    // Reset game
                    gameActive = true;
                    score = 0;
                    gameOverScreen.style.display = 'none';
                    ground.style.animation = 'groundMove 4s linear infinite';
                    gameLoop();
                } else {
                    jump();
                }
            }
            if (e.key === 'ArrowDown') duck();
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowDown') resetDino();
        });

        // Start game
        gameLoop();