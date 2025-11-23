document.addEventListener("DOMContentLoaded", () => {
  initProjectsCarousel();
});

function initProjectsCarousel() {
  const imgEl = document.getElementById("carousel-image");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  if (!imgEl || !prevBtn || !nextBtn) return;

  const images = [
    "image/project1.jpg",
    "image/project2.jpg",
    "image/project3.jpg",
    "image/project4.jpg",
    "image/project5.jpg"
  ];

  let currentIndex = 0;

  function showImage(index) {
    imgEl.src = images[index];
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

}
