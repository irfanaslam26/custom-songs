



// Home page slider

let currentSlide = 0;
const slides = document.querySelectorAll('.banner-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    indicators[i].classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

indicators.forEach((indicator, i) => {
  indicator.addEventListener('click', () => showSlide((currentSlide = i)));
});

setInterval(nextSlide, 5000);
showSlide(currentSlide);








// Home page recent songs
// Home page recent songs

function scrollCards(direction) {
  const container = document.querySelector('.card-grid');
  const scrollAmount = 220; // Card width + gap
  
  if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
  } else {
      container.scrollLeft += scrollAmount;
  }
}

function openModal(img) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modal.style.display = "flex";
  modalImg.src = img.src;
  document.body.style.overflow = 'hidden';
}

function closeModal(event) {
  // Only close if clicking the background or close button
  if (!event || event.target.id === "imageModal" || event.target.className === "modal-close") {
      document.getElementById("imageModal").style.display = "none";
      document.body.style.overflow = 'auto';
  }
}

// Close modal on Escape key press
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
      closeModal();
  }
});

// Prevent modal close when clicking the image itself
document.querySelector('.modal-content').addEventListener('click', function(event) {
  event.stopPropagation();
});

// Home page recent songs



// audio home page


document.querySelectorAll('.product-link').forEach(link => {
    const video = link.querySelector('.hover-video');
  
    if (video) { // Check if the video element exists
      link.addEventListener('mouseenter', () => {
        video.style.display = 'block';
        video.play();
      });
  
      link.addEventListener('mouseleave', () => {
        video.pause();
        video.style.display = 'none';
      });
    } else {
      console.error('Video element not found in .product-link:', link);
    }
  });



// Counter data abt page




const counters = [
    { id: "clients", value: 199 },
    { id: "employees", value: 575 },
    { id: "programs", value: 69 },
    { id: "songs", value: 500 }
];

function animateCounter(id, endValue) {
    const counter = document.getElementById(id);
    let currentValue = 0;
    
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepValue = endValue / steps;
    const stepTime = duration / steps;
    
    const timer = setInterval(() => {
        currentValue += stepValue;
        
        if (currentValue >= endValue) {
            counter.textContent = endValue + "+";
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(currentValue) + "+";
        }
    }, stepTime);
}

// Using Intersection Observer for better performance
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const counterId = entry.target.id;
            const counterData = counters.find(c => c.id === counterId);
            if (counterData) {
                animateCounter(counterId, counterData.value);
                entry.target.classList.add('animated');
            }
        }
    });
}, { threshold: 0.1 });

// Observe all counter elements
counters.forEach(counter => {
    const element = document.getElementById(counter.id);
    if (element) observer.observe(element);
});




    
 // client scroll home page



    const container = document.querySelector('.feed');
    const cardGrid = document.querySelector('.card-grid');
    const cards = document.querySelectorAll('.feed-card');
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 20; // card width + gap

    // Clone the first and last cards
    function setupInfiniteScroll() {
        // Clone all cards and append them to create the illusion of infinite scroll
        const cardsArray = Array.from(cards);
        cardsArray.forEach(card => {
            const clone = card.cloneNode(true);
            cardGrid.appendChild(clone);
        });
    }

    setupInfiniteScroll();

    function scrollCards(direction) {
        const totalCards = cards.length;
        
        if (direction === 'right') {
            currentIndex++;
            if (currentIndex >= totalCards) {
                // If we've reached the cloned section, quickly reset to the original position
                cardGrid.style.transition = 'none';
                currentIndex = 0;
                cardGrid.style.transform = `translateX(0)`;
                // Force reflow
                cardGrid.offsetHeight;
                cardGrid.style.transition = 'transform 0.5s ease';
            }
        } else {
            currentIndex--;
            if (currentIndex < 0) {
                // If we've reached the beginning, jump to the cloned section
                currentIndex = totalCards - 1;
                cardGrid.style.transition = 'none';
                cardGrid.style.transform = `translateX(-${cardWidth * totalCards}px)`;
                // Force reflow
                cardGrid.offsetHeight;
                cardGrid.style.transition = 'transform 0.5s ease';
            }
        }

        // Perform the actual scroll
        cardGrid.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    // Optional: Add automatic scrolling
    function autoScroll() {
        scrollCards('right');
    }

    // Uncomment the following lines if you want automatic scrolling
    // setInterval(autoScroll, 3000);
