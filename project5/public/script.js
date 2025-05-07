const audio = document.getElementById("audio");
const sbtn = document.getElementById("sbtn");

window.onload = () => {
    document.body.classList.add('loaded');
};




document.addEventListener('DOMContentLoaded', function() {
    const messagesContainer = document.querySelector('.messages-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    messagesContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - messagesContainer.offsetLeft;
        scrollLeft = messagesContainer.scrollLeft;
    });

    messagesContainer.addEventListener('mouseleave', () => {
        isDown = false;
    });

    messagesContainer.addEventListener('mouseup', () => {
        isDown = false;
    });

    messagesContainer.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - messagesContainer.offsetLeft;
        // Scroll speed
        const walk = (x - startX) * 2; 
        messagesContainer.scrollLeft = scrollLeft - walk;
        
        // Update transforms for 3D effect
        const posts = document.querySelectorAll('.post-item');
        posts.forEach((post, index) => {
            const rect = post.getBoundingClientRect();
            const center = rect.left + rect.width/2;
            const containerCenter = messagesContainer.getBoundingClientRect().left + messagesContainer.getBoundingClientRect().width/2;
            const distanceFromCenter = (center - containerCenter) / containerCenter;
            
            // Apply rotation based on position
            post.style.transform = `rotateY(${distanceFromCenter * 30}deg) translateZ(${Math.abs(distanceFromCenter) * 50}px)`;
        });
    });
});