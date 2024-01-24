const topImagesContainer = document.getElementById("topImages");
const bottomImagesContainer = document.getElementById("bottomImages");
const fetchButton = document.getElementById("fetch-button");
const fetchMoreButton = document.getElementById("fetch-more-button");
const grayscaleSlider = document.querySelector(".switch input");

function fetchNewPhotos(container, count) {

  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    fetch("https://picsum.photos/367/300")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.url;
      })
      .then(imageUrl => {
          const imageContainer = document.createElement("div");
          imageContainer.classList.add("image-item");

          const imageElement = document.createElement("img");
          imageElement.src = imageUrl;

          const textBox = document.createElement("div");
          textBox.classList.add("image-text");

          const text = document.createTextNode(`Luckas Budimaier\n  ${imageUrl}`);
                  
          textBox.appendChild(text);
          imageContainer.appendChild(imageElement);
          imageContainer.appendChild(textBox);
          container.appendChild(imageContainer);
      })
      .catch(error => {
        console.error("Error fetching image:", error);
      });
  }
}

function applyGreyscale() {
  const images = document.querySelectorAll(".image-row img");
  images.forEach(img => {
    img.style.filter = grayscaleSlider.checked ? "grayscale(100%)" : "none";
  });
}

fetchButton.addEventListener("click", function () {
  fetchNewPhotos(topImagesContainer, 4);
  fetchNewPhotos(bottomImagesContainer, 0);
});

fetchMoreButton.addEventListener("click", function () {
  fetchNewPhotos(bottomImagesContainer, 4);
});

grayscaleSlider.addEventListener("change", applyGreyscale);

fetchNewPhotos(topImagesContainer, 4);