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
const numberOfParticles = 50;

const createGameParticle = (arr) => {
	
	let angle = Math.floor(Math.random()*360)
	
	const gameParticle = {
		type: particleType[Math.floor(Math.random() * 3)],
		height: 1 * scale/2,
		width: 1*scale/2,
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
	for(particle1 in listParticles){
		for(particle2 in listParticles){
			if(Math.abs(particle2.x - particle1.x) <= particle2.width &&
			   Math.abs(particle2.y - particle1.y) <= particle2.height
			){
				console.log('hit')
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

