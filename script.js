//////////////////// JAVASCRIPT IS PROCEDURAL PROGRAMMING LANGUAGE YOU SHIT ///////////////////////////

// Function to create image backgrounds container
const backgroundContainer = document.createElement("div");
backgroundContainer.classList.add("bg-container");
document.body.appendChild(backgroundContainer);

// This function will return true if it's on large screen, and vice versa...
function isLargeScreen() {
  return window.innerWidth > 768;
}

function createRandomElements(count, src, minSize, maxSize) {
  for (let i = 0; i < count; i++) {
    const element = document.createElement("img");
    element.src = src;

    // Size randomization
    const randomSize = Math.floor(Math.random() * (maxSize - minSize)) + 50; // Adjust max size range
    element.style.width = `${randomSize}px`;
    element.style.height = "auto";

    // Increase width by 20% (for visual effect)
    element.style.width = `${randomSize * 1.1}px`;

    // Random rotation between -90 and 90 degrees
    const randomRotation = Math.floor(Math.random() * 181) - 90;
    element.style.transform = `rotate(${randomRotation}deg)`;

    element.style.position = "fixed";

    // Randomly choose left or right side
    const side = Math.random() < 0.5 ? "left" : "right";
    element.style[side] = "0px";

    // Random vertical position (stay within window height)
    const maxTop = window.innerHeight - randomSize;
    element.style.top = `${Math.floor(Math.random() * maxTop)}px`;

    // Styling
    element.classList.add("img-fluid");
    element.style.zIndex = "-99";
    element.style.opacity = "0.7";
    element.style.pointerEvents = "none";

    backgroundContainer.appendChild(element);
  }
}

function createLemonBg(lemonCount, minSize, maxSize) {
  for (let i = 0; i < lemonCount; i++) {
    const lemon = document.createElement("img");
    lemon.src = "media/lemon.png";

    const randomSize = Math.floor(Math.random() * (maxSize - minSize)) + 100;
    lemon.style.width = `${randomSize}px`;
    lemon.style.height = `${randomSize}px`;

    lemon.style.position = "absolute"; // buat positioning relatif terhadap div

    // Randomly choose left or right side
    const side = Math.random() < 0.5 ? "left" : "right";
    lemon.style[side] = "8px";

    // Random vertical position (stay within window height)
    const maxTop = window.innerHeight - randomSize;
    lemon.style.top = `${Math.floor(Math.random() * maxTop)}px`;

    lemon.style.zIndex = "-999";
    lemon.style.opacity = "0.68";
    lemon.classList.add("img-fluid");

    // 3. Masukkan lemon ke dalam div
    backgroundContainer.appendChild(lemon);
  }
}

////// HERE'S THE MAIN FUNCTION DOCUMENT ON LOAD /////
// For random background image generators...
window.addEventListener("DOMContentLoaded", () => {
  const lemonCount = 3; // Count for the lemons
  const iceCount = 7; // Count for the ice cubes
  const bubbleCount = 5;

  // true == screen is large
  if (isLargeScreen()) {
    createLemonBg(3, 80, 300);
    createRandomElements(7, "media/ice.png", 420, 600); // To create the ice cubes
    createRandomElements(8, "media/bubble.png", 200, 400); // To create the bubbles
    createRandomElements(4, "media/mint.png", 150, 200); // To create mint leaves
  } else {
    createLemonBg(3, 80, 170);
    createRandomElements(3, "media/ice.png", 220, 320); // To create the ice cubes
    createRandomElements(4, "media/bubble.png", 180, 320); // To create the bubbles
    createRandomElements(3, "media/mint.png", 10, 40); // To create mint leaves
  }
});

// Open popup
function openPopUp(element) {
  // Get the image source and text from the clicked element
  const imgSrc = element.querySelector("img").src;

  // Set the image and text for the popup
  document.getElementById("popup-img").src = imgSrc;

  // Show the popup
  document.getElementById("popup").style.display = "flex";
}

// Close popup
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

///// FOR PROJECT BANNER ON EACH PROJECT PAGES ////
// Banner carousel logic for project2
const bannerProject1 = [
  "media/project1/dev_banner.png",
  "media/project1/greensnake-prev.png",
  "media/project1/gem_prev.png",
];

const bannerProject2 = [
  "media/project2/project-banner.png",
  "media/project2/web1.png",
  "media/project2/web2.png",
];

// Getting the file name of the windows
const fileName = window.location.pathname.split("/").pop();
let bannerImgSources = [];
if (fileName == "project1.html") {
  bannerImgSources = bannerProject1;
} else if (fileName == "project2.html") {
  bannerImgSources = bannerProject2;
}

let currentBanner = 0;

const bannerImg = document.getElementById("banner-img");
const prevBtn = document.getElementById("banner-prev");
const nextBtn = document.getElementById("banner-next");

// Helper: Animate fade out/in
function animateBannerChange(newIndex) {
  if (!bannerImg) return;
  bannerImg.style.transition = "opacity 0.2s";
  bannerImg.style.opacity = "0";

  setTimeout(() => {
    bannerImg.src = bannerImgSources[newIndex];
    bannerImg.onload = () => {
      bannerImg.style.opacity = "1";
    };
  }, 200);
}

// Main function to update the banner
function updateBanner(animated = false) {
  if (bannerImg) {
    if (animated) {
      animateBannerChange(currentBanner);
    } else {
      bannerImg.src = bannerImgSources[currentBanner];
      bannerImg.style.opacity = "1";
    }
  }
}

// If buttons are found
if (prevBtn && nextBtn && bannerImg) {
  prevBtn.addEventListener("click", () => {
    currentBanner =
      (currentBanner - 1 + bannerImgSources.length) % bannerImgSources.length;
    updateBanner(true);
  });

  nextBtn.addEventListener("click", () => {
    currentBanner = (currentBanner + 1) % bannerImgSources.length;
    updateBanner(true);
  });

  // Set initial banner image
  bannerImg.style.opacity = "1";
  bannerImg.style.transition = "opacity 0.2s";
  updateBanner();
}
