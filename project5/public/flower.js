

let flowerSketch = new p5((s) => {
    let pulseOffset = 0;
    let petalColors = [];
    let centerColor = '#F3C2C2';
    //audio
    let hoverSound; 
    //
    let lastPlayed = 0;

    s.preload = () => {
        hoverSound = s.loadSound('bling-audio.mp3');
    }

    s.setup = () => {
        s.createCanvas(500, 500);
        s.angleMode(s.DEGREES);
        s.noStroke();
        
        for (let i = 0; i < 9; i++) {
            petalColors[i] = s.color('#93D6CF');
        }
    }

    s.draw = () => {
        s.background(0,0);
        pulseOffset += 0.03;
        drawFlower(s.width/2, s.height/2, petalColors, centerColor, pulseOffset);
    }

    function drawFlower(x, y, petalColors, centerColor, pulse) {
        let totalPetals = 9;
        let centerRadius = 40*1.5 + 3 * s.sin(pulse * 2);
        let petalLength = 100*1.5 + 10 * s.sin(pulse);
        let petalWidth = 50*1.5;
        let hoverColor = s.color('#B9FFF8');
        
        // all 9 petals
        for (let i = 0; i < totalPetals; i++) {
            let angle = (360 / totalPetals) * i;
            let petalX = x + s.cos(angle) * (centerRadius + petalLength/2);
            let petalY = y + s.sin(angle) * (centerRadius + petalLength/2);
            
            // Hover detect
            let d = s.dist(s.mouseX, s.mouseY, petalX, petalY);
            let isHovering = d < petalWidth/2;
            s.fill(isHovering ? hoverColor : petalColors[i]);
            
            // Play sound when mouse hovered
            if (isHovering && s.millis() - lastPlayed > 300) {
                if (hoverSound) {
                    hoverSound.play();
                    lastPlayed = s.millis();
                }
            }
            
            s.push();
            s.translate(petalX, petalY);
            s.rotate(angle);
            s.ellipse(0, 0, petalLength, petalWidth);
            s.pop();
        }
        
        // flower center
        s.fill(centerColor);
        s.ellipse(x, y, centerRadius * 2);
    }
}, "flower-container");