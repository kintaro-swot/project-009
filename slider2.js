// --- JAVASCRIPT FOR THE THIRD (MULTI-VIEW, AUTO/MANUAL) SLIDER WITH GAPS ---

// 1. Get necessary elements
const wrapper = document.querySelector('.multi-view-slider-wrapper');
const container = document.querySelector('.multi-view-slider-container');
const slides = document.querySelectorAll('.multi-view-slide');
const prevBtn = document.querySelector('.multi-view-prev-btn');
const nextBtn = document.querySelector('.multi-view-next-btn');

// 2. Initialize variables
let multiViewIndex = 0; // Tracks the current shift position (0 or 1)
const totalSlides = slides.length; // 4 slides
const visibleSlides = 3;           
const maxIndex = totalSlides - visibleSlides; // 4 - 3 = 1 (The max number of shifts)
const autoSlideInterval = 5000; // 5 seconds

/**
 * Function to update the slider position using precise pixel values.
 */
function updateSliderPosition() {
    // 1. Get the width of the container (the visible window)
    const containerWidth = container.offsetWidth;
    
    // 2. Get the gap size (must match CSS)
    const gapSize = 20; 
    
    // 3. Calculate the width of one slide, including one gap.
    // The width of three slides + two gaps fills the container width:
    // (3 * slideWidth) + (2 * gapSize) = containerWidth
    // Solving for slideWidth:
    // slideWidth = (containerWidth - (2 * gapSize)) / 3
    const slideWidth = (containerWidth - (2 * gapSize)) / 3;
    
    // 4. The step distance is ONE slide width plus ONE gap.
    const stepDistance = slideWidth + gapSize;
    
    // 5. Calculate the total shift based on the current index
    const offset = -multiViewIndex * stepDistance;
    
    // 6. Apply the transform in pixels
    wrapper.style.transform = `translateX(${offset}px)`;
}

/**
 * Manual/Auto Navigation: Move one slide forward.
 */
function goToNext() {
    // We only shift once (from index 0 to index 1)
    if (multiViewIndex < maxIndex) { 
        multiViewIndex++;
    } else {
        // Loop back to the start (index 0)
        multiViewIndex = 0; 
    }
    updateSliderPosition();
}

/**
 * Manual Navigation: Move one slide backward.
 */
function goToPrev() {
    // If we're not at the first index, move backward
    if (multiViewIndex > 0) {
        multiViewIndex--;
    } else {
        // Loop back to the end (index 1)
        multiViewIndex = maxIndex;
    }
    updateSliderPosition();
}

/**
 * Auto-Play Logic: Calls goToNext() repeatedly.
 */
let slideTimer = setInterval(goToNext, autoSlideInterval);

/**
 * Handle user interaction: reset the timer on manual navigation.
 */
function resetAutoTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(goToNext, autoSlideInterval);
}


// 4. Attach event listeners to the buttons
prevBtn.addEventListener('click', () => {
    goToPrev();
    resetAutoTimer();
});

nextBtn.addEventListener('click', () => {
    goToNext();
    resetAutoTimer();
});

// Initial call and recalculation on resize (important!)
updateSliderPosition();
window.addEventListener('resize', updateSliderPosition);

// --- JAVASCRIPT FOR THE FOURTH (DOT/INDICATOR) SLIDER ---

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('clientSliderTrack');
    const items = track.querySelectorAll('.slide-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const totalItems = items.length;
    let autoSlideInterval;

    // --- Core Sliding Logic ---
    function updateSlider() {
        // Calculate how many items are currently visible based on the CSS width
        const itemWidth = items[0].offsetWidth; // Get the actual width of one item
        const wrapperWidth = track.parentElement.offsetWidth; // Get the visible wrapper width
        // The number of items visible is the wrapper width divided by the item width (rounded down)
        const visibleItems = Math.floor(wrapperWidth / itemWidth);

        // Ensure currentIndex stays within bounds (only slide as far as the last visible item)
        // Max index is total items minus the number of visible items
        const maxIndex = totalItems - visibleItems;

        // Loop functionality: If we go past the end, jump back to the start.
        if (currentIndex > maxIndex) {
            currentIndex = 0;
        }
        // Loop functionality: If we go before the start, jump to the end.
        if (currentIndex < 0) {
            currentIndex = maxIndex;
        }

        // The transform value shifts the entire track
        const transformValue = -currentIndex * itemWidth;
        track.style.transform = `translateX(${transformValue}px)`;
    }

    // --- Navigation Handlers ---
    function nextSlide() {
        // We always advance by 1 item at a time
        currentIndex++;
        updateSlider();
    }

    function prevSlide() {
        currentIndex--;
        updateSlider();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // --- Automatic Sliding ---
    function startAutoSlide() {
        // Clear any existing interval to prevent multiple timers running
        clearInterval(autoSlideInterval);
        // Set a new interval to call nextSlide every 3 seconds (3000ms)
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    // Pause auto-slide on hover
    track.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.parentElement.addEventListener('mouseleave', startAutoSlide);

    // --- Initial Setup and Event Listeners ---
    
    // 1. Initial render
    updateSlider();

    // 2. Start the automatic sliding
    startAutoSlide();

    // 3. Re-calculate on window resize (CRITICAL for responsiveness!)
    // Debouncing the resize event improves performance
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateSlider();
        }, 250); // Wait 250ms before running
    });
});