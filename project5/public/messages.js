
document.addEventListener('DOMContentLoaded', function() {
    const posts = document.querySelectorAll('.post-item');
    
    posts.forEach((post, index) => {
        const flowerDiv = post.querySelector('.flower-container');
        const s = (p) => {
            p.setup = () => {
                const canvas = p.createCanvas(80, 80);
                canvas.parent(flowerDiv);
                canvas.style('border-radius', '50%');
                drawFlower(p);
            };
        };
        new p5(s, flowerDiv);
    });
    
    function drawFlower(p) {
        // Transparent background
        p.background(0, 0); 
        p.fill("#93D6CF"); 
        p.noStroke();
        
        // flower petals
        for (let i = 0; i < 8; i++) {
            p.push();
            p.translate(40, 40);
            p.rotate(p.TWO_PI * i / 8);
            p.ellipse(0, 25, 15, 30);
            p.pop();
        }
        
        // flower center
        p.fill(255, 255, 0);
        p.ellipse(40, 40, 15, 15);
    }

    // Drag Carousel
    const carousel = document.getElementById('carousel');
    let isDragging = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseleave', () => {
        isDragging = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDragging = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if(!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.style.cursor = 'grab';
});
