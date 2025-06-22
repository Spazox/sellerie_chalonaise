const carousels = document.querySelectorAll('.carousel');

carousels.forEach((carousel, index) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = carousel.querySelector('.carousel-btn.next');
  const prevButton = carousel.querySelector('.carousel-btn.prev');
  const dotsNav = carousel.querySelector('.carousel-dots');

  let currentSlide = 0;
  let autoPlayInterval;

  // Create dots dynamically
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dotsNav.appendChild(dot);
  });

  const dots = Array.from(dotsNav.children);

  const updateCarousel = () => {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
  };

  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
    resetAutoPlay();
  });

  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
    resetAutoPlay();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentSlide = i;
      updateCarousel();
      resetAutoPlay();
    });
  });

  const startAutoPlay = () => {
    autoPlayInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    }, 5000);
  };

  const resetAutoPlay = () => {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  };

  updateCarousel();
  startAutoPlay();
});