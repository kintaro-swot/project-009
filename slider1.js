// 1. Get all image elements within the slider-container
const images = document.querySelectorAll('.slider-img');
// 2. Define the total number of images (4 in this case)
const totalImages = images.length;
// 3. Initialize the current image index to 0 (the first image)
let currentImageIndex = 0;
// 4. Set the delay in milliseconds (5 seconds = 5000 ms)
const slideDelay = 5000;

/**
 * Function to advance to the next slide.
 */
function nextSlide() {
    // A. Hide the current active image by removing the 'active' class
    images[currentImageIndex].classList.remove('active');

    // B. Calculate the index of the next image:
    //    Increment the index, and use the modulo operator (%) to wrap around 
    //    to 0 when we reach the end (e.g., 3 + 1 = 4; 4 % 4 = 0).
    currentImageIndex = (currentImageIndex + 1) % totalImages;

    // C. Show the new active image by adding the 'active' class
    images[currentImageIndex].classList.add('active');
}

/**
 * Initialization function.
 */
function startSlider() {
    // 1. Set the very first image to be active when the page loads
    if (images.length > 0) {
        images[currentImageIndex].classList.add('active');
    }

    // 2. Use setInterval to call the nextSlide function repeatedly 
    //    at the defined slideDelay (5000ms)
    setInterval(nextSlide, slideDelay);
}

// Start the slider when the script runs
startSlider();