(() => {
    const TRAIL_COUNT = 12;
    const trail = [];
    let mouseX = 0;
    let mouseY = 0;

    for (let i = 0; i < TRAIL_COUNT; i++) {
        const dot = document.createElement("div");
        dot.className = "cursor-trail-dot";
        document.body.appendChild(dot);
        trail.push({ el: dot, x: 0, y: 0 });
    }

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        let x = mouseX;
        let y = mouseY;

        trail.forEach((dot, index) => {
            dot.x += (x - dot.x) * 0.35;
            dot.y += (y - dot.y) * 0.35;

            dot.el.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
            dot.el.style.opacity = `${1 - index / trail.length}`;

            x = dot.x;
            y = dot.y;
        });

        requestAnimationFrame(animate);
    }

    animate();
})();
