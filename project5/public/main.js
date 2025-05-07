// flower p5 sketch ref:https://editor.p5js.org/Brendan.hutchins99/sketches/gOOKcxViD 
// flower p5 sketch ref:https://editor.p5js.org/Sandor1010/sketches/MAS5EB3_9

let inputText = "";
let seedY;
let stage = 0;
let pulseOffset = 0;
let petalColors = [];
let centerColor = '#F3C2C2';

function setup() { 
    let canvas = createCanvas(800, 300);
    canvas.parent('flower-sketch');
    seedY = height - 40;
    textAlign(CENTER, CENTER);
    textSize(16);
    angleMode(DEGREES);
    noStroke();
    
    // all 9 petals
    for (let i = 0; i < 9; i++) {
        petalColors[i] = color('#93D6CF');
    }

    // Connect textarea to the sketch, Chatgpt ref:https://chatgpt.com/c/681a1c93-e034-800e-9fe8-7f8b90ad6e78
    const textarea = document.getElementById('flower-input');
    textarea.addEventListener('input', function() {
        inputText = this.value;
    });
}

function draw() {
    background(0,0);

    // Sky: transparent; Ground:brown
    noStroke();
    fill(0,0);
    rect(0, 0, width, height / 2);
    fill('#805944');
    rect(0, height / 2, width, height / 2);

    // Update growth stage
    updateStage();
    pulseOffset += 0.03;

    // seed
    fill('#5c3210');
    ellipse(width / 2, seedY, 40, 40);

    // stem growing based on stage
    if (stage > 0) {
        fill('#2e5d29');
        rect(width / 2 - 5, seedY - 50, 10, 50);
    }
    if (stage > 1) {
        fill('#2e5d29');
        rect(width / 2 - 5, seedY - 100, 10, 50);
    }

    // Leaves
    if (stage > 1) {
        fill('#d2eecf');
        ellipse(width / 2 - 20, seedY - 100, 30, 20);
        ellipse(width / 2 + 20, seedY - 100, 30, 20);
    }

    // Flower
    if (stage > 2) {
        drawFlower(width / 2, seedY - 140, petalColors, centerColor, pulseOffset);
    }
}

function updateStage() {
    let len = inputText.length;
    if (len >= 10) {
        // flower
        stage = 3; 
    } else if (len >= 5) {
        // stem + leaves
        stage = 2; 
    } else if (len >= 1) {
         // stem only
        stage = 1;
    } else {
        stage = 0;
    }
}
function drawFlower(x, y, petalColors, centerColor, pulse) {
    let totalPetals = 9;
    let centerRadius = 20 + 3 * sin(pulse * 2);
    let petalLength = 60 + 10 * sin(pulse);
    let petalWidth = 30;
    let hoverColor = color('#B9FFF8');
    
    // all 9 petals
    for (let i = 0; i < totalPetals; i++) {
        let angle = (360 / totalPetals) * i;
        let petalX = x + cos(angle) * (centerRadius + petalLength/2);
        let petalY = y + sin(angle) * (centerRadius + petalLength/2);
        
        // Hover detect
        let d = dist(mouseX, mouseY, petalX, petalY);
        fill(d < petalWidth/2 ? hoverColor : petalColors[i]);
        
        push();
        translate(petalX, petalY);
        rotate(angle);
        ellipse(0, 0, petalLength, petalWidth);
        pop();
    }
    
    // Flower center
    fill(centerColor);
    ellipse(x, y, centerRadius * 2);
}