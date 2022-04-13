const scale = 40;
const height = 20*scale;
const width = 20*scale;
const canvas = document.createElement("canvas");
canvas.width = width
canvas.height = height
document.body.append(canvas);
canvas.setAttribute("id", "screen");
const screen = document.querySelector("#screen");
const ctx = screen.getContext("2d");
screen.style.border = "3px solid grey";


const particleType = ['rock','paper','scissors']

let listParticles = [];
const numberOfParticles = 25;

const createGameParticle = (arr) => {
	
	let angle = Math.floor(Math.random()*360)
	
	const gameParticle = {
		type: particleType[Math.floor(Math.random() * 3)],
		height: 1 * scale,
		width: 1*scale,
		x: Math.floor(Math.random() * (width - scale)) ,
		y: Math.floor(Math.random() *(height - scale)),
		xSpeed: (scale/3)*Math.cos(angle),
		ySpeed: (scale/3)*Math.sin(angle),
		update: () =>{
			
			gameParticle.x += gameParticle.xSpeed
			gameParticle.y += gameParticle.ySpeed
			
			if(gameParticle.x >= width - gameParticle.width){
				gameParticle.xSpeed = -gameParticle.xSpeed
			}else if (gameParticle.x <= 0){
				gameParticle.xSpeed = -gameParticle.xSpeed
			}
			else if(gameParticle.y >= height - gameParticle.height){
				gameParticle.ySpeed = -gameParticle.ySpeed
			}else if (gameParticle.y <= 0){
				gameParticle.ySpeed = -gameParticle.ySpeed
			}
			
		}

	}
	arr.push(gameParticle);
	return gameParticle;
}
const start = () =>{
	for(let i = 0; i < numberOfParticles; i++ )
		createGameParticle(listParticles)
}
const particleCollision = () =>{;
	for(let i = 0; i < listParticles.length; i++){
		for(let j = i+1; j < listParticles.length; j++){
			if(Math.abs(listParticles[j].x - listParticles[i].x) <= listParticles[j].width &&
			   Math.abs(listParticles[j].y - listParticles[i].y) <= listParticles[j].height
			){
				//make collision
				let aux = listParticles[i].xSpeed
				listParticles[i].xSpeed = listParticles[j].xSpeed
				listParticles[j].xSpeed = aux
				
				aux = listParticles[i].ySpeed
				listParticles[i].ySpeed = listParticles[j].ySpeed
				listParticles[j].ySpeed = aux
				
				if((listParticles[i].type == 'rock' && listParticles[j].type == 'paper') ||
					(listParticles[i].type == 'paper' && listParticles[j].type == 'rock')
				){
					listParticles[i].type = 'paper'
					listParticles[j].type = 'paper'
				} else if((listParticles[i].type == 'scissors' && listParticles[j].type == 'paper') ||
					(listParticles[i].type == 'paper' && listParticles[j].type == 'scissors')
				){
					listParticles[i].type = 'scissors'
					listParticles[j].type = 'scissors'
				} else if((listParticles[i].type == 'scissors' && listParticles[j].type == 'rock') ||
					(listParticles[i].type == 'rock' && listParticles[j].type == 'scissors')
				){
					listParticles[i].type = 'rock'
					listParticles[j].type = 'rock'
				}
				
			}
		}
	}
}


const particleLogic = () =>{
	
	for(let i = 0; i < listParticles.length; i++ ){
		listParticles[i].update()
	}
	particleCollision()
}


const renderGameParticles = () => {
	ctx.fillStyle ="white" ;
	ctx.clearRect(0, 0, width, height)
	listParticles.map(particle =>{
		if(particle.type == 'rock')
			ctx.fillStyle = "gray";
		else if(particle.type == 'scissors')
			ctx.fillStyle = "#ff00ff ";
		else
			ctx.fillStyle = "green";

		ctx.fillRect(particle.x, particle.y, particle.width, particle.height)
	})
}
function draw() {
  renderGameParticles()
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
const generateNewFrame = () =>{
	particleLogic()
}
const main = ()=>{
	start()
	setInterval(generateNewFrame,50)
}
main();

