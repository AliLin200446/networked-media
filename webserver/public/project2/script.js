window.onload = function () {
    let bgMusic = document.createElement("audio");
    bgMusic.src = "audio/InnerDream.mp3";  
    bgMusic.loop = true;
    bgMusic.volume = 0.5;
    document.body.appendChild(bgMusic);

    if (localStorage.getItem("musicAllowed") === "true") {
        bgMusic.play().catch(error => {
            console.log("Autoplay failed.", error);
        });
    } else {
        let playButton = document.createElement("button");
        playButton.innerText = "Play Music 🎵";
        playButton.style.position = "absolute";
        playButton.style.top = "10px";
        playButton.style.left = "10px";
        document.body.appendChild(playButton);

        playButton.addEventListener("click", function () {
            bgMusic.play().then(() => {
                playButton.remove();
                localStorage.setItem("musicAllowed", "true"); 
            }).catch(error => {
                console.log("Play failed:", error);
            });
        });
    }

    updateClock();
    setInterval(updateClock, 1000);
};

let lastHour = null; 

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updateClock() {
    let now = new Date();
    let minutes = now.getMinutes();
    let hours = now.getHours();
    let seconds = now.getSeconds();
    let eyeball = document.querySelector('.eyeball');
    let pupil = document.querySelector('.pupil');
    let eye = document.querySelector('.eye');
    let body = document.querySelector('body');
    
    // HOURS: Background color changes
    if (hours !== lastHour) {
        body.style.backgroundColor = getRandomColor();
        lastHour = hours; 
    }
    
    // Minutes: Move eyeball in a circular path, starting from 12 o'clock
    let angle = ((minutes / 60) * 2 * Math.PI) + (Math.PI / 4); 
    let radius = 30;
    let x = radius * Math.cos(angle);
    let y = radius * Math.sin(angle);
    eyeball.style.transform = `translate(${x}px, ${y}px)`;
    
    // Minutes: Change pupil size
    let pupilSize = (minutes / 59) * 100; 
    pupil.style.width = `${pupilSize}%`;
    pupil.style.height = `${pupilSize}%`;
    
    // SECONDS: turn eye into a line
    if (seconds % 2 === 0) {
        eye.style.transform = 'scaleY(1)';
    } else {
        eye.style.transform = 'scaleY(0.01)';
    }
}

