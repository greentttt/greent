document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const gameContainer = document.getElementById('game-container');
    const startButton = document.getElementById('start-button');
    const bubbleWrap = document.getElementById('bubble-wrap');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const messageElement = document.getElementById('message');
    const popSound = document.getElementById('pop-sound');
    
    // Configuración del volumen del sonido
    popSound.volume = 1.0;

    let score = 0;
    let timeLeft = 15;
    let timer;
    let bubbleCount = 25;
    let level = 1;

    startButton.addEventListener('click', function() {
        welcomeScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        createBubbles(bubbleCount);
        startTimer();
    });

    function startTimer() {
        timer = setInterval(function() {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                showMessage('¡Se acabó el tiempo! Puntuación final: ' + score, 3000); // Mensaje final
                resetGame();
            }
        }, 1000);
    }

    function resetGame() {
        if (level === 2) {
            timeLeft = 30;
            bubbleCount = 50;
        } else if (level === 3) {
            timeLeft = 45;
            bubbleCount = 100;
        } else {
            timeLeft = 15;
            bubbleCount = 25;
        }
        timerElement.textContent = timeLeft;
        score = 0;
        scoreElement.textContent = score;
        bubbleWrap.innerHTML = '';
        createBubbles(bubbleCount);
        startTimer();
    }

    function createBubbles(count) {
        let columns, rows;
        if (level === 1) {
            columns = 5;
            rows = 5;
        } else if (level === 2) {
            columns = 5;
            rows = 10;
        } else if (level === 3) {
            columns = 10;
            rows = 10;
        }

        bubbleWrap.style.gridTemplateColumns = `repeat(${columns}, 60px)`;
        bubbleWrap.style.gridTemplateRows = `repeat(${rows}, 60px)`;

        for (let i = 0; i < count; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubble.addEventListener('click', function() {
                if (!bubble.classList.contains('popped')) {
                    bubble.classList.add('popped');
                    score++;
                    scoreElement.textContent = score;

                    // Reiniciar y reproducir el sonido
                    popSound.currentTime = 0; // Reiniciar el tiempo del audio
                    popSound.play(); // Reproducir el sonido

                    if (score === bubbleCount) {
                        level++;
                        clearInterval(timer);
                        if (level === 2) {
                            showMessage('Vamos a subir un poco el nivel... Concretamente del nivel 1 al nivel 2');
                            resetGame();
                        } else if (level === 3) {
                            showMessage('Ok, ok. Estoy bastante impresionada, pero queda uno más');
                            resetGame();
                        } else {
                            bubbleWrap.innerHTML = '';
                            showMessage('😮 ¡Enhorabuena! Aquí tienes es la primera pista: 3CT', 5000); // Mensaje final con más tiempo
                        }
                    }
                }
            });
            bubbleWrap.appendChild(bubble);
        }
    }

    function showMessage(text, duration = 3000) {
        messageElement.textContent = text;
        messageElement.classList.add('show');
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, duration); // Tiempo de visualización del mensaje
    }

    gameContainer.classList.add('hidden');
});
