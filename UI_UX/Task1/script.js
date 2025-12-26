
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


document.addEventListener("DOMContentLoaded", () => {

    const cursor = document.querySelector(".custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    document.addEventListener("mousemove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";

        requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener("mousedown", (e) => {
        cursor.classList.add("click");

        // Ripple
        const ripple = document.createElement("div");
        ripple.className = "cursor-ripple";
        ripple.style.left = e.clientX + "px";
        ripple.style.top = e.clientY + "px";

        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 500);
    });

    document.addEventListener("mouseup", () => {
        cursor.classList.remove("click");
    });

});





window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    document.querySelector(".scroll-progress").style.width =
        scrollPercent + "%";
});






const statBoxes = document.querySelectorAll('.stat-box');
let currentIndex = 0;
let autoRotate = true;
let intervalId = null;

function setFeatured(index) {
    statBoxes.forEach(box => box.classList.remove('featured'));
    statBoxes[index].classList.add('featured');
    currentIndex = index;
}

function startRotation() {
    intervalId = setInterval(() => {
        if (!autoRotate) return;
        const nextIndex = (currentIndex + 1) % statBoxes.length;
        setFeatured(nextIndex);
    }, 3500);
}

function stopRotation() {
    clearInterval(intervalId);
    intervalId = null;
}

// Init
setFeatured(0);
startRotation();

// Hover behavior
statBoxes.forEach((box, index) => {
    box.addEventListener('mouseenter', () => {
        autoRotate = false;
        stopRotation();
        setFeatured(index);
    });

    box.addEventListener('mouseleave', () => {
        autoRotate = true;
        startRotation();
    });
});




const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo(0, 0);
    } else {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

