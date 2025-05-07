// flower p5 sketch ref:https://editor.p5js.org/Brendan.hutchins99/sketches/gOOKcxViD 
// flower p5 sketch ref:https://editor.p5js.org/Sandor1010/sketches/MAS5EB3_9


let logoSketch = new p5((s) => {
    let isHovering = false;
    let rotationAngle = 0;
    let pulseOffset = 0;
    let hoverSound;
    let lastPlayed = 0;


    s.setup = () => {
        s.createCanvas(200, 200);
        s.angleMode(s.DEGREES);
        s.noStroke();
    };

    s.draw = () => {
        s.background(0,0);
        //check hover
        checkHover(s);
        
        // condition: only hover
        if (isHovering) {
            rotationAngle += 0.5;
            pulseOffset += 0.05;
            
            // Play sound when hovered 
            if (s.millis() - lastPlayed > 300) {
                if (hoverSound) {
                   
                    lastPlayed = s.millis();
                }
            }
        }
        
        // Draw flower
        drawFlower(s.width/2, s.height/2, '#93D6CF', '#F3C2C2', rotationAngle, pulseOffset, s);
    };

    function checkHover(p) {
        // distance from mouse to flower center
        let d = p.dist(p.mouseX, p.mouseY, p.width/2, p.height/2);
        // Flower radius is approximately 120px (center + petals)
        isHovering = d < 120;
    }

    function drawFlower(x, y, petalColor, centerColor, rotation, pulse, p) {
        // Flower parameters
        let petalCount = 16;
        let centerRadius = 40/2 + 3 * p.sin(pulse * 2);
        let petalLength = 100/2 + 10 * p.sin(pulse);
        let petalWidth = 50/2;
        
        // Color variations
        let mainColor = p.color(petalColor);
        let lightColor = p.color(
            p.red(mainColor) + 30, 
            p.green(mainColor) + 30, 
            p.blue(mainColor) + 30
        );
        let darkColor = p.color(
            p.red(mainColor) - 20, 
            p.green(mainColor) - 20, 
            p.blue(mainColor) - 20
        );
        
        // Flower petals
        for (let i = 0; i < petalCount; i++) {
            // Alternate between light and dark shades
            if (i % 2 === 0) {
                p.fill(lightColor);
            } else {
                p.fill(darkColor);
            }
            
            let angle = (360 / petalCount) * i + rotation;
            let petalX = x + p.cos(angle) * (centerRadius + petalLength/2);
            let petalY = y + p.sin(angle) * (centerRadius + petalLength/2);
            
            p.push();
            p.translate(petalX, petalY);
            p.rotate(angle);
            p.ellipse(0, 0, petalLength, petalWidth);
            p.pop();
        }
        
        // Flower center
        p.fill(centerColor);
        p.ellipse(x, y, centerRadius * 2);
    }
}, "logo");