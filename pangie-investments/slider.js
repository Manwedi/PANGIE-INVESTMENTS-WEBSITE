let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
let refreshInterval;

function startAutoSlide() {
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        active = active + 1 <= lengthItems ? active + 1 : 0;
        reloadSlider();
    }, 3000);
}

function reloadSlider() {
    // Hardware accelerated GPU movement using transform instead of 'left'
    let percentage = active * (100 / items.length);
    slider.style.transform = `translateX(-${percentage}%)`;

    // Update active dot
    let lastActiveDot = document.querySelector('.slider .dots li.active');
    if (lastActiveDot) {
        lastActiveDot.classList.remove('active');
    }
    if (dots[active]) {
        dots[active].classList.add('active');
    }

    // Reset timer on user interaction
    startAutoSlide();
}

next.addEventListener('click', () => {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
});

prev.addEventListener('click', () => {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
});

dots.forEach((li, key) => {
    li.addEventListener('click', () => {
        active = key;
        reloadSlider();
    });
});

// Window resize safety handler
window.addEventListener('resize', () => {
    reloadSlider();
});

// Start initial interval
startAutoSlide();