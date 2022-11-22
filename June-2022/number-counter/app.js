const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.2;
const friction = 1;

const colors = ["#53BF9D", "#F94C66", "#BD4291", "#FFC54D"];
const randomColor = (colors) => colors[Math.floor(Math.random() * colors.length)];
const randomIntRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

let ballArray = [];
let counter = 0;

class Ball{
	constructor(x, y, dx, dy, radius, color){
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.color = color;
	}
	update(){
		if (this.y + this.radius + this.dy > canvas.height) {
			this.dy = -this.dy;
			this.dy = this.dy * friction;
			this.dx = this.dx * friction;
		} else {
			this.dy += gravity;
		}
		if (this.x + this.radius > canvas.width || this.x - this.radius <= 0) {
			this.dx = -this.dx;
			this.dx = this.dx * friction;
		}
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	}
	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
};

const animate = () => {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ballArray.forEach((ball) => ball.update());
};

addEventListener("resize", function (event) {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
});

addEventListener("click", function (event) {
	let radius = randomIntRange(8, 20);
	let x = event.clientX;
	let y = event.clientY;
	let dx = randomIntRange(-2, 2);
	let dy = randomIntRange(-2, 2);
	ballArray.push(new Ball(x, y, dx, dy, radius, randomColor(colors)));
	counter += 1;
	document.getElementById("count").innerText = counter;
});

animate();
