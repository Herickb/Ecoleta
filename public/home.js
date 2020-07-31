/*modal*/
const modalOverlay = document.querySelector(".modal")
const modalButton = document.querySelector(".search-icon")
const closeButton = document.querySelector(".close-modal")

modalButton.addEventListener("click", () => {
    modalOverlay.classList.remove("hide")
})

closeButton.addEventListener("click", () => {
    modalOverlay.classList.add("hide")
})
