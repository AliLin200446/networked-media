



window.onload = () => {
    console.log("Welcome page loaded!");
}

document.addEventListener("DOMContentLoaded", function () {
    const pupil = document.querySelector(".pupil");
    const creationText = document.querySelector("#creation");

    // pupil's initial position
    const pupilRect = pupil.getBoundingClientRect();
    const centerX = pupilRect.left + pupilRect.width / 2;
    const centerY = pupilRect.top + pupilRect.height / 2;

    // Move pupil based on mouse movement
    document.addEventListener("mousemove", (event) => {
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;

        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        pupil.style.transform = `rotate(${angle}deg)`;
    });

    // change color when mouse hovers over "Creations"
    creationText.addEventListener("mouseenter", function () {
        creationText.style.color = "#ff69b4"; 
    });


    creationText.addEventListener("mouseleave", function () {
        creationText.style.color = "white"; 
    });

//enter main.ejs through scrolling down
    document.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        // When user scrolls past 50% of the page
        if (scrollPosition + windowHeight >= pageHeight * 0.5) {
            // fade-out effect
            document.body.classList.add('hidden');  

            // Delay the redirect to allow for the transition to complete
            setTimeout(function () {
                window.location.href = '/main';  
            }, 1000); 
        }
    });
});





