const burgerBtn = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const sliderImages = document.querySelectorAll('.portfolio-slider-overlay__img');
const sliderLine = document.querySelector('.portfolio-slider-overlay__body');
const sliderDots = document.querySelectorAll('.portfolio-slider-overlay__dot');
const sliderBtnNext = document.querySelector('.portfolio-slider-overlay__btn-next');
const sliderBtnPrev = document.querySelector('.portfolio-slider-overlay__btn-prev');

let sliderCount = 0;
let sliderWidth;

menuBody.addEventListener('click', function (event) {
    const elementOnClick = event.target;
    if (elementOnClick.dataset.goto && document.querySelector(elementOnClick.dataset.goto)) {
        const blockToScroll = document.querySelector(elementOnClick.dataset.goto);
        const distanceToBlock = blockToScroll.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

        window.scrollTo({
            top: distanceToBlock,
            behavior: 'smooth'
        })
        event.preventDefault();
    }
    if (burgerBtn.classList.contains('active')) {
        document.body.classList.remove('lock');
        burgerBtn.classList.remove('active');
        menuBody.classList.remove('active');
    }
})

burgerBtn.addEventListener('click', function () {
    burgerBtn.classList.toggle('active');
    menuBody.classList.toggle('active')
    document.body.classList.toggle('lock');
})

window.addEventListener('resize', showSlide);
sliderBtnNext.addEventListener('click', scrollToNextSlide);
sliderBtnPrev.addEventListener('click', scrollToPrevSlide);

function showSlide() {
    sliderWidth = document.querySelector('.portfolio-slider-overlay').offsetWidth;
    sliderLine.style.width = sliderWidth * sliderImages.length + 'px';
    sliderImages.forEach(item => item.style.width = sliderWidth + 'px');
    rollSlider();
}


function scrollToNextSlide() {
    sliderCount++;
    if (sliderCount >= sliderImages.length) {
        sliderCount = 0;
    }
    rollSlider();
    getCurrentSlide(sliderCount);
}

function scrollToPrevSlide() {
    sliderCount--;
    console.log(sliderCount);
    if (sliderCount < 0) {
        sliderCount = sliderImages.length - 1;
    }
    rollSlider();
    getCurrentSlide(sliderCount);
}

function rollSlider() {
    sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}

function getCurrentSlide(index) {
    sliderDots.forEach(item => item.classList.remove('portfolio-slider-overlay__dot--active'));
    sliderDots[index].classList.add('portfolio-slider-overlay__dot--active');
}

sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        sliderCount = index;
        rollSlider();
        getCurrentSlide(sliderCount);
    })
})


