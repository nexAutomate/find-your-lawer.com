
document.addEventListener("DOMContentLoaded", function () {
  const keywordInput = document.getElementById("lawyerKeyword");
  const specialtySelect = document.getElementById("lawyerSpecialty");
  const citySelect = document.getElementById("lawyerCity");
  const searchForm = document.getElementById("lawyerSearchForm");

  const cards = Array.from(
    document.querySelectorAll(".lawyer-card")
  );

  const countLabel = document.getElementById("lawyerCount");
  const noResults = document.getElementById("noLawyers");

  // Search and filter lawyers
  function filterLawyers(event) {
    if (event) event.preventDefault();

    const keyword = keywordInput.value.trim().toLowerCase();
    const specialty = specialtySelect.value;
    const city = citySelect.value;

    let visibleCount = 0;

    cards.forEach(function (card) {
      const searchableText = (
        card.dataset.name + " " +
        card.dataset.specialty + " " +
        card.dataset.city + " " +
        card.dataset.search + " " +
        card.textContent
      ).toLowerCase();

      const matchesKeyword = searchableText.includes(keyword);
      const matchesSpecialty =
        !specialty || card.dataset.specialty === specialty;
      const matchesCity =
        !city || card.dataset.city === city;

      const showCard =
        matchesKeyword && matchesSpecialty && matchesCity;

      card.style.display = showCard ? "" : "none";

      if (showCard) visibleCount++;
    });

    countLabel.textContent =
      visibleCount + (visibleCount === 1 ? " lawyer" : " lawyers");

    noResults.style.display =
      visibleCount === 0 ? "block" : "none";
  }

  searchForm.addEventListener("submit", filterLawyers);
  keywordInput.addEventListener("input", filterLawyers);
  specialtySelect.addEventListener("change", filterLawyers);
  citySelect.addEventListener("change", filterLawyers);

  // Lawyer profile popup
  const modal = document.getElementById("lawyerModal");
  const modalName = document.getElementById("modalLawyerName");
  const modalDetails = document.getElementById("modalLawyerDetails");
  const closeModalButton =
    document.getElementById("closeLawyerModal");

  document.querySelectorAll(".view-lawyer").forEach(function (button) {
    button.addEventListener("click", function () {
      const card = button.closest(".lawyer-card");

      modalName.textContent = card.dataset.name;

      modalDetails.textContent =
        card.dataset.specialty + " · " +
        card.dataset.city + " · Consultation fee: " +
        card.querySelector(".lawyer-price").textContent;

      modal.classList.add("show");
      document.body.style.overflow = "hidden";
      closeModalButton.focus();
    });
  });

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  closeModalButton.addEventListener("click", closeModal);

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  // Automatically update copyright year
  document.getElementById("currentYear").textContent =
    new Date().getFullYear();
});
