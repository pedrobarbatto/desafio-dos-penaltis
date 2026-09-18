let playerScore = 0;
let keeperScore = 0;

let shotNumber = 1;

const totalShots = 5;

let canShoot = true;


// INICIAR JOGO

function startGame() {

    playerScore = 0;

    keeperScore = 0;

    shotNumber = 1;

    canShoot = true;


    document.getElementById("menu")
        .classList.remove("active");

    document.getElementById("endScreen")
        .classList.remove("active");

    document.getElementById("gameScreen")
        .classList.add("active");


    updateScore();

    resetPositions();

    document.getElementById("message").textContent =
        "Escolha onde bater!";

}


// ATUALIZAR PLACAR

function updateScore() {

    document.getElementById("playerScore")
        .textContent = playerScore;

    document.getElementById("keeperScore")
        .textContent = keeperScore;

    document.getElementById("shotNumber")
        .textContent = shotNumber;

}


// CHUTAR

function shoot(direction) {

    if (!canShoot) {

        return;

    }


    canShoot = false;


    const keeperDirection =
        randomDirection();


    const ball = document.getElementById("ball");

    const keeper = document.getElementById("keeper");


    // MOVIMENTO DO GOLEIRO

    moveKeeper(
        keeperDirection,
        keeper
    );


    // MOVIMENTO DA BOLA

    moveBall(
        direction,
        ball
    );


    // VERIFICAR DEFESA

    setTimeout(function() {

        if (direction === keeperDirection) {

            keeperScore++;

            document.getElementById("message")
                .textContent =
                "🧤 DEFESA! O goleiro pegou!";

        } else {

            playerScore++;

            document.getElementById("message")
                .textContent =
                "⚽ GOOOOOOL!";

        }


        updateScore();


        // PRÓXIMA COBRANÇA

        setTimeout(function() {

            if (shotNumber >= totalShots) {

                endGame();

            } else {

                shotNumber++;

                canShoot = true;

                resetPositions();

                updateScore();

                document.getElementById("message")
                    .textContent =
                    "Prepare-se para a próxima cobrança!";

            }

        }, 1200);


    }, 700);

}


// DIREÇÃO ALEATÓRIA DO GOLEIRO

function randomDirection() {

    const directions = [
        "left",
        "center",
        "right"
    ];

    const random =
        Math.floor(
            Math.random() * directions.length
        );

    return directions[random];

}


// MOVIMENTO DO GOLEIRO

function moveKeeper(direction, keeper) {

    if (direction === "left") {

        keeper.style.left = "15%";

        keeper.style.transform =
            "translateX(-50%) rotate(-25deg)";

    }

    else if (direction === "right") {

        keeper.style.left = "85%";

        keeper.style.transform =
            "translateX(-50%) rotate(25deg)";

    }

    else {

        keeper.style.left = "50%";

        keeper.style.transform =
            "translateX(-50%)";

    }

}


// MOVIMENTO DA BOLA

function moveBall(direction, ball) {

    if (direction === "left") {

        ball.style.left = "25%";

    }

    else if (direction === "right") {

        ball.style.left = "75%";

    }

    else {

        ball.style.left = "50%";

    }


    ball.style.bottom = "260px";

    ball.style.transform =
        "translateX(-50%) scale(0.7)";

}


// RESETAR POSIÇÕES

function resetPositions() {

    const ball =
        document.getElementById("ball");

    const keeper =
        document.getElementById("keeper");


    ball.style.left = "50%";

    ball.style.bottom = "90px";

    ball.style.transform =
        "translateX(-50%) scale(1)";


    keeper.style.left = "50%";

    keeper.style.transform =
        "translateX(-50%)";

}


// FINALIZAR JOGO

function endGame() {

    document.getElementById("gameScreen")
        .classList.remove("active");

    document.getElementById("endScreen")
        .classList.add("active");


    document.getElementById("finalPlayerScore")
        .textContent = playerScore;

    document.getElementById("finalKeeperScore")
        .textContent = keeperScore;


    const title =
        document.getElementById("finalTitle");

    const message =
        document.getElementById("finalMessage");


    if (playerScore > keeperScore) {

        title.textContent =
            "🏆 VOCÊ VENCEU!";

        message.textContent =
            "Parabéns! Você marcou mais gols.";

    }

    else if (playerScore < keeperScore) {

        title.textContent =
            "🧤 O GOLEIRO VENCEU!";

        message.textContent =
            "O goleiro conseguiu defender mais cobranças.";

    }

    else {

        title.textContent =
            "🤝 EMPATE!";

        message.textContent =
            "As duas equipes terminaram empatadas.";

    }

}
