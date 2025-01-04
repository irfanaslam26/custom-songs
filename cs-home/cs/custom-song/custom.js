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




document.addEventListener('DOMContentLoaded', function () {
    let currentAudio = null;
    let audioElements = Array.from(document.querySelectorAll('audio'));
    let currentIndex = -1;

    const audioControls = document.getElementById('audio-controls');
    const playButton = document.getElementById('play-button');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const displayDiv = document.getElementById('displayDiv');
    const displayedImage = document.getElementById('displayedImage');
    const displayedTitle = document.getElementById('displayedTitle');

    // Get the timing_div element
    const timingDiv = document.querySelector('.timing_div');  // to append the time in this div
    const closeSong = document.querySelector('.close_1');

    // Timing elements
    const currentTimeDisplay = document.createElement('span');
    const totalTimeDisplay = document.createElement('span');
    currentTimeDisplay.classList.add('time-display');
    totalTimeDisplay.classList.add('time-display');
    timingDiv.appendChild(currentTimeDisplay); // current time of the song
    timingDiv.appendChild(document.createTextNode(' / ')); // Separator
    timingDiv.appendChild(totalTimeDisplay); // total time of the song

    function showControls() {
        audioControls.style.display = 'flex';
    }

    function hideControls() {
        audioControls.style.display = 'none';
    }

    function updateDisplay(index) {
        const customSongContent = document.querySelectorAll('.custom_song_content')[index];
        const img = customSongContent.querySelector('img');
        const title = customSongContent.querySelector('.custom_song_heading .title').textContent;

        // Update the display div
        displayedImage.src = img.src;
        displayedTitle.textContent = title;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateTiming() {
        if (currentAudio) {
            currentTimeDisplay.textContent = formatTime(currentAudio.currentTime);
            totalTimeDisplay.textContent = formatTime(currentAudio.duration || 0);
        }
    }

    function updatePlayPauseIcons() {
        if (currentAudio && !currentAudio.paused) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    function playAudio(index) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio.removeEventListener('timeupdate', updateTiming);
            currentAudio.removeEventListener('loadedmetadata', updateTiming);
            currentAudio.removeEventListener('ended', handleEnded);
        }

        currentAudio = audioElements[index];
        currentAudio.play();
        currentIndex = index;

        updateDisplay(index);
        showControls();
        updatePlayPauseIcons();

        currentAudio.addEventListener('timeupdate', updateTiming);
        currentAudio.addEventListener('loadedmetadata', updateTiming); // Update total duration when metadata is loaded
        currentAudio.addEventListener('ended', handleEnded); // Handle end of the song
    }

    function handleEnded() {
        if (currentIndex < audioElements.length - 1) {
            currentIndex++;
            playAudio(currentIndex);
        } else {
            closeCurrentAudio(); // Optionally close the player if it's the last song
        }
    }

    function closeCurrentAudio() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio.removeEventListener('timeupdate', updateTiming);
            currentAudio.removeEventListener('loadedmetadata', updateTiming);
            currentAudio.removeEventListener('ended', handleEnded);
            currentAudio = null;
            currentIndex = -1;
        }
        hideControls(); // Hide the controls when closing the song
    }

    document.querySelectorAll('.custom_song_audio img').forEach((img, index) => {
        img.addEventListener('click', () => {
            if (currentIndex === index) {
                // If the clicked image is the one currently playing
                if (currentAudio) {
                    currentAudio.currentTime = 0; // Restart the current song
                    currentAudio.play();
                    showControls(); // Ensure controls are shown when restarting
                    updatePlayPauseIcons(); // Ensure icons are updated
                }
            } else {
                playAudio(index);
            }
        });
    });

    playButton.addEventListener('click', () => {
        if (currentAudio) {
            if (currentAudio.paused) {
                currentAudio.play();
                updatePlayPauseIcons();
            } else {
                currentAudio.pause();
                updatePlayPauseIcons();
            }
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            playAudio(currentIndex);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < audioElements.length - 1) {
            currentIndex++;
            playAudio(currentIndex);
        }
    });

    // Event listener to close the song
    closeSong.addEventListener('click', () => {
        closeCurrentAudio();
    });
});


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



 // Counter about page

     const counters = [
        { id: "clients", value: 199 },
        { id: "employees", value: 575 },
        { id: "programs", value: 69 },
        { id: "songs", value: 500 }
    ];

    // Function to animate counters
    function animateCounter(id, endValue) {
        let startValue = 0;
        const duration = 2000; // animation duration in ms
        const stepTime = Math.abs(Math.floor(duration / endValue));
        const counterElement = document.getElementById(id);

        const timer = setInterval(() => {
            startValue += 1;
            counterElement.textContent = startValue + "+";
            if (startValue >= endValue) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // Start animating all counters
    counters.forEach(counter => {
        animateCounter(counter.id, counter.value);
    });




    
 // client scroll home page



    const container = document.querySelector('.container');
    const cardGrid = document.querySelector('.card-grid');
    const cards = document.querySelectorAll('.card');
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
