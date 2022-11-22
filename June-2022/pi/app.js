const canvas = document.querySelector("canvas"); 
const ctx = canvas.getContext("2d");

const range = document.querySelector('input[type="range"]');
const radiusAt = document.querySelector("#radius");
const circumference = document.querySelector("#circumference");
const diameter = document.querySelector("#diameter");

canvas.height = innerHeight;
canvas.width = innerWidth;

function getCircumference(r){
    return Math.round(2 * Math.PI * r);
}
function getDiameter(r){
    return Math.round(2 * r);
}

class Circle {
    constructor(x,y,radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius,0, Math.PI * 2);
        ctx.fillStyle = "white";
		ctx.fill();
        ctx.stroke();    
    }
    updateRadius(radius){
        this.clearCanvas();
        this.radius = radius;
        this.draw();
    }
    updateCanvas(x,y){
        this.clearCanvas();
        this.x = x;
        this.y = y;
        this.draw();
    }
    clearCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
// get the center of the canvas
let positionY = canvas.height / 2;
let positionX = canvas.width / 2;

let value = range.value // the value of radius

const circle = new Circle(positionX,positionY,value);
circle.draw()

// set the value of radius,circumference and diameter
radiusAt.innerHTML = value;
circumference.innerHTML = getCircumference(value);
diameter.innerHTML = getDiameter(value)

// update the radius of the circle and the value of the labels
range.addEventListener("input", function () {
    const value = range.value;
	radiusAt.innerHTML = value;
    circumference.innerHTML = getCircumference(value);
    diameter.innerHTML = getDiameter(value)
    circle.updateRadius(value);
});

// update the canvas when the window is being risize
addEventListener("resize", function (event) {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
    circle.updateCanvas(canvas.width/2,canvas.height/2)
});






