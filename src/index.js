import './style.css'

const carouselBtnLeft = document.querySelector('.left_btn');
const carouselBtnRight = document.querySelector('.right_btn');

const imageContainer = document.querySelector('.image_container > ul');
const slides = Array.from(imageContainer.children);

const dotTracker = document.querySelector('.dot_tracker');
const dots = Array.from(document.querySelectorAll('.dot'));

// arrange slides side by side
const slideWidth = slides[0].getBoundingClientRect().width;
function setSlidePosition(slide, index) {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach((slide, index) => setSlidePosition(slide, index) )

const moveSlide = (currentSlide, moveToSlide) => {
    const amountToMove = moveToSlide.style.left;
    imageContainer.style.transform = 'translateX(-' + amountToMove + ')';
    currentSlide.classList.remove('current_slide');
    moveToSlide.classList.add('current_slide');
}

// click right button, move to next slide
carouselBtnRight.addEventListener("click", e => {
    const currentSlide = imageContainer.querySelector('.current_slide');
    const nextSlide = currentSlide.nextElementSibling;
    // after clicking right buttton, 2 things happen:
    // 1. move current slide
    // 2. if we should show the "next" button on the "moved to" slide
    if (nextSlide.nextElementSibling == null) {
        carouselBtnRight.classList.add('hidden');
    } 
    // if clicked right button, there must be a previous slide.
    carouselBtnLeft.classList.remove('hidden');
    moveDots(currentSlide, nextSlide);
    moveSlide(currentSlide, nextSlide);
})

// click left button, move to previous slide
carouselBtnLeft.addEventListener("click", e => {
    const currentSlide = imageContainer.querySelector('.current_slide');
    const preSlide = currentSlide.previousElementSibling;

    if (preSlide.previousElementSibling == null) {
        carouselBtnLeft.classList.add('hidden');
    } 
    // if clicked left button, there must be a next slide.
    carouselBtnRight.classList.remove('hidden');
    moveDots(currentSlide, preSlide);
    moveSlide(currentSlide, preSlide);
})

// click dots to jump to corresponding slide
dotTracker.addEventListener("click", e => {
    // ** find button clicked
    const targetDot = e.target.closest('button');
    if (!targetDot) {
        return;
    }

    const currentSlide = imageContainer.querySelector('.current_slide');
    const currentDot = dotTracker.querySelector('.current_slide'); 

    const targetDotIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetDotIndex];
    console.log(targetDotIndex)

    if (targetDotIndex === 0) {
        carouselBtnLeft.classList.add('hidden');
        carouselBtnRight.classList.remove('hidden');
    } else if (targetDotIndex === slides.length - 1) {
        carouselBtnRight.classList.add('hidden');
        carouselBtnLeft.classList.remove('hidden');
    } else {
        carouselBtnLeft.classList.remove('hidden');
        carouselBtnRight.classList.remove('hidden');
    }

    moveSlide(currentSlide, targetSlide);

    currentDot.classList.remove('current_slide');
    targetDot.classList.add('current_slide');
})

const moveDots = (currentSlide, targetSlide) => {

    const currentSlideIndex = slides.findIndex(slide => slide === currentSlide);
    const currentDot = dots[currentSlideIndex];
    const targetSlideIndex = slides.findIndex(slide => slide === targetSlide);
    const targetDot = dots[targetSlideIndex];

    currentDot.classList.remove('current_slide');
    targetDot.classList.add('current_slide');
}

const clickRightBtn = () => {
    if (!carouselBtnRight.classList.contains('hidden')) {
        carouselBtnRight.click();
    } else {
        dots[0].click();
    }
}

window.setInterval(clickRightBtn, 5000);