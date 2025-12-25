
const slides = document.querySelectorAll(".slide");
const thumbs = document.querySelectorAll(".thumb");
const nextBtn = document.querySelector(".arrow.right");
const prevBtn = document.querySelector(".arrow.left");

let current = 0;
let interval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    thumbs.forEach(thumb => thumb.classList.remove("active"));

    slides[index].classList.add("active");
    thumbs[index].classList.add("active");

    current = index;
}

function nextSlide() {
    let next = (current + 1) % slides.length;
    showSlide(next);
}

function prevSlide() {
    let prev = (current - 1 + slides.length) % slides.length;
    showSlide(prev);
}

function startAutoSlide() {
    interval = setInterval(nextSlide, 4000); // 4 seconds
}

function stopAutoSlide() {
    clearInterval(interval);
}

// Arrow events
nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

// Thumbnail click
thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
        stopAutoSlide();
        showSlide(index);
        startAutoSlide();
    });
});

// Start auto sliding
startAutoSlide();



const counters = document.querySelectorAll('.count');
const section = document.getElementById('heroStats');
let started = false;

function startCounting() {
    if (started) return;
    started = true;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = target / 120; // smaller = slower

        const updateCount = () => {
            if (count < target) {
                count += speed;
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        startCounting();
    }
}, { threshold: 0.4 });

observer.observe(section);


const mainMenu = document.querySelector(".main-menu");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        mainMenu.classList.add("scrolled");
    } else {
        mainMenu.classList.remove("scrolled");
    }
});



const sectionCards = document.querySelectorAll(".section-card");

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
}, { threshold: 0.3 });

sectionCards.forEach(card => sectionObserver.observe(card));

