const scale = 40;
const height = 20 * scale;
const width = 20 * scale;
const canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
document.body.append(canvas);
canvas.setAttribute("id", "screen");
const screen = document.querySelector("#screen");
const ctx = screen.getContext("2d");
screen.style.border = "3px solid grey";

const particleType = ["rock", "paper", "scissors"];
const imagemPedra = new Image();
imagemPedra.src = "./pedra.png";
const imagemTesoura = new Image();
imagemTesoura.src = "./tesoura.png";
const imagemPapel = new Image();
imagemPapel.src = "./papel.png";
let gameOver = false;
const quantidadesAtuais = {
  pedra: 0,
  papel: 0,
  tesoura: 0
};

let listParticles = [];
const numberOfParticles = 1000;

const createGameParticle = (arr) => {
  let angle = Math.floor(Math.random() * 360);

  const gameParticle = {
    type: particleType[Math.floor(Math.random() * 3)],
    height: 1 * scale,
    width: 1 * scale,
    x: Math.floor(Math.random() * (width - scale)),
    y: Math.floor(Math.random() * (height - scale)),
    xSpeed: (scale / 7) * Math.cos(angle),
    ySpeed: (scale / 7) * Math.sin(angle),
    update: () => {
      gameParticle.x += gameParticle.xSpeed;
      gameParticle.y += gameParticle.ySpeed;

      if (gameParticle.x >= width - gameParticle.width) {
        gameParticle.xSpeed = -gameParticle.xSpeed;
        gameParticle.x -= scale;
      } else if (gameParticle.x <= 0) {
        gameParticle.xSpeed = -gameParticle.xSpeed;
        gameParticle.x += scale;
      } else if (gameParticle.y >= height - gameParticle.height) {
        gameParticle.ySpeed = -gameParticle.ySpeed;
        gameParticle.y -= scale;
      } else if (gameParticle.y <= 0) {
        gameParticle.ySpeed = -gameParticle.ySpeed;
        gameParticle.y += scale;
      }
    }
  };
  arr.push(gameParticle);
  return gameParticle;
};
const start = () => {
  for (let i = 0; i < numberOfParticles; i++) createGameParticle(listParticles);
  gameOver = false;
};
const particleCollision = () => {
  for (let i = 0; i < listParticles.length; i++) {
    for (let j = i + 1; j < listParticles.length; j++) {
      if (
        Math.abs(listParticles[j].x - listParticles[i].x) <=
          listParticles[j].width &&
        Math.abs(listParticles[j].y - listParticles[i].y) <=
          listParticles[j].height
      ) {
        //make collision
        let aux = listParticles[i].xSpeed;
        listParticles[i].xSpeed = listParticles[j].xSpeed;
        listParticles[j].xSpeed = aux;

        aux = listParticles[i].ySpeed;
        listParticles[i].ySpeed = listParticles[j].ySpeed;
        listParticles[j].ySpeed = aux;

        //listParticles[i].x+=listParticles[i].xSpeed/2
        //listParticles[i].y+=listParticles[i].ySpeed/2
        //listParticles[j].x+=listParticles[j].xSpeed/2
        //listParticles[j].y+=listParticles[j].ySpeed/2

        if (
          (listParticles[i].type == "rock" &&
            listParticles[j].type == "paper") ||
          (listParticles[i].type == "paper" && listParticles[j].type == "rock")
        ) {
          listParticles[i].type = "paper";
          listParticles[j].type = "paper";
        } else if (
          (listParticles[i].type == "scissors" &&
            listParticles[j].type == "paper") ||
          (listParticles[i].type == "paper" &&
            listParticles[j].type == "scissors")
        ) {
          listParticles[i].type = "scissors";
          listParticles[j].type = "scissors";
        } else if (
          (listParticles[i].type == "scissors" &&
            listParticles[j].type == "rock") ||
          (listParticles[i].type == "rock" &&
            listParticles[j].type == "scissors")
        ) {
          listParticles[i].type = "rock";
          listParticles[j].type = "rock";
        }
      }
    }
  }
};

const particleLogic = () => {
  for (let i = 0; i < listParticles.length; i++) {
    listParticles[i].update();
  }
  particleCollision();
  gameOver = true;
  for (let i = 0; i < listParticles.length; i++) {
    if (listParticles[i].type != listParticles[0].type) {
      gameOver = false;
      return false;
    }
  }
};

const renderGameParticles = () => {
  ctx.fillStyle = "#0f0f0f";
  ctx.clearRect(0, 0, width, height);
  listParticles.map((particle) => {
    if (particle.type == "rock")
      ctx.drawImage(
        imagemPedra,
        particle.x,
        particle.y,
        particle.width,
        particle.height
      );
    else if (particle.type == "scissors")
      ctx.drawImage(
        imagemTesoura,
        particle.x,
        particle.y,
        particle.width,
        particle.height
      );
    else
      ctx.drawImage(
        imagemPapel,
        particle.x,
        particle.y,
        particle.width,
        particle.height
      );
  });
};
function draw() {
  renderGameParticles();
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
const generateNewFrame = () => {
  particleLogic();
  listParticles.map((particle) => {
    if (particle.type == "rock") quantidadesAtuais.pedra++;
    else if (particle.type == "scissors") quantidadesAtuais.tesoura++;
    else quantidadesAtuais.papel++;
  });

  console.log(
    `Pedra: ${quantidadesAtuais.pedra} Papel: ${quantidadesAtuais.papel} Tesoura: ${quantidadesAtuais.tesoura}`
  );
  quantidadesAtuais.papel = 0;
  quantidadesAtuais.pedra = 0;
  quantidadesAtuais.tesoura = 0;
  if (gameOver === true) {
    const winnerType = listParticles[0].type;
    listParticles = [];
    const reloadAfterGameOver = window.confirm(
      `The game has ended in ${winnerType}. The page will reload regardless of your choice`
    );
    if (reloadAfterGameOver == true || reloadAfterGameOver == false) {
      window.location.reload();
    }
  }
};
const main = () => {
  start();
  setInterval(generateNewFrame, 150);
};
main();
