
const timeline = document.querySelector('.tech-timeline');
const liquid = document.querySelector('.liquid-fill');
const dots = document.querySelectorAll('.dot');

let animated = false;

const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !animated) {
        animated = true;

        liquid.style.animation = 'fillLine 3s ease forwards';

        dots.forEach((dot, i) => {
            setTimeout(() => {
                dot.classList.add('active');
            }, (3000 / dots.length) * (i + 1));
        });
    }
}, { threshold: 0.4 });

observer.observe(timeline);





const counters = document.querySelectorAll('.count');
let statsPlayed = false;

const runCounter = () => {
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    let count = 0;
    const speed = 200;

    const updateCount = () => {
      const inc = target / speed;
      if (count < target) {
        count += inc;
        counter.innerText = Math.ceil(count) + "+";
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target + "+";
      }
    };
    updateCount();
  });
};

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsPlayed) {
      statsPlayed = true;
      runCounter();
    }
  });
}, { threshold: 0.5 });

statsObserver.observe(document.querySelector('.stats-section'));




const eventCards = document.querySelectorAll(".event-row");

const eventObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px"
  }
);


eventCards.forEach(card => eventObserver.observe(card));





const wheel = document.getElementById("wheel");
const items = [...document.querySelectorAll(".rotary-item")];
const contents = document.querySelectorAll(".content");

const total = items.length;
const radius = 110;
let activeIndex = 0;

/* place items along semicircle */
function positionItems() {
  const step = 180 / (total - 1);
  const TOP_ANGLE = -90;


  items.forEach((item, i) => {
    const index = (i - activeIndex + total) % total;
    const angle = -90 + step * index;

    item.style.transform =
      `rotate(${angle}deg) translateX(${radius}px)`;
    item.classList.toggle("active", index === Math.floor(total / 2));
  });
}

/* AUTO ROTATION */
let autoRotate = setInterval(() => {
  activeIndex = (activeIndex + 1) % total;
  positionItems();
  updateContent();
}, 1600); // 1.5s feels premium


/* update content */
function updateContent() {
  contents.forEach(c => c.classList.remove("active"));
  contents[activeIndex].classList.add("active");
}

/* initial */
positionItems();
updateContent();

/* controls */
document.getElementById("next").onclick = () => {
  activeIndex = (activeIndex + 1) % total;
  positionItems();
  updateContent();
};

document.getElementById("prev").onclick = () => {
  activeIndex = (activeIndex - 1 + total) % total;
  positionItems();
  updateContent();
};




const slider = document.querySelector(".team-slider");
const cards = document.querySelectorAll(".team-card");
const nextBtn = document.querySelector(".team-btn.next");
const prevBtn = document.querySelector(".team-btn.prev");
const wrapper = document.querySelector(".team-slider-wrapper");

const visibleCards = 4;
const gap = 40;
const cardWidth = cards[0].offsetWidth + gap;

let index = 0;
let autoSlide;

/* move slider */
function move() {
  slider.style.transition = "transform 0.8s cubic-bezier(0.22,1,0.36,1)";
  slider.style.transform = `translateX(${-index * cardWidth}px)`;
}

/* NEXT (always forward) */
nextBtn.onclick = () => {
  index++;
  move();

  /* reset silently when reaching clones */
  if (index === cards.length - visibleCards) {
    setTimeout(() => {
      slider.style.transition = "none";
      index = 0;
      slider.style.transform = `translateX(0px)`;
    }, 800);
  }
};

/* PREV (optional, still smooth) */
prevBtn.onclick = () => {
  if (index === 0) {
    slider.style.transition = "none";
    index = cards.length - visibleCards;
    slider.style.transform = `translateX(${-index * cardWidth}px)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        index--;
        move();
      });
    });
  } else {
    index--;
    move();
  }
};

/* AUTO SCROLL */
function startAuto() {
  autoSlide = setInterval(() => {
    nextBtn.click();
  }, 2800);
}

function stopAuto() {
  clearInterval(autoSlide);
}

startAuto();

/* PAUSE ON HOVER */
wrapper.addEventListener("mouseenter", stopAuto);
wrapper.addEventListener("mouseleave", startAuto);





const scrollBar = document.querySelector(".scroll-bar");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  scrollBar.style.width = scrollPercent + "%";
});





const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

/* Mouse move */
window.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  dot.style.left = `${mouseX}px`;
  dot.style.top = `${mouseY}px`;
});

/* Smooth follow for ring */
function animate() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;

  ring.style.left = `${ringX}px`;
  ring.style.top = `${ringY}px`;

  requestAnimationFrame(animate);
}
animate();

/* Click ripple */
window.addEventListener("mousedown", () => {
  ring.classList.remove("ripple");
  void ring.offsetWidth; // restart animation
  ring.classList.add("ripple");
});




const ripple = document.querySelector(".cursor-ripple");

window.addEventListener("mousedown", e => {
  // main aura ripple
  ring.classList.remove("ripple");
  void ring.offsetWidth;
  ring.classList.add("ripple");

  // shockwave ring
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;

  ripple.classList.remove("active");
  void ripple.offsetWidth;
  ripple.classList.add("active");
});
