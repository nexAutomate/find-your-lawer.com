
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      const isOpen = navLinks.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Lawyer Search
  const lawyerSearch = document.querySelector("#lawyerSearch");
  const specialtyFilter = document.querySelector("#specialtyFilter");
  const cityFilter = document.querySelector("#cityFilter");
  const modeFilter = document.querySelector("#modeFilter");
  const lawyerCards = document.querySelectorAll(".lawyer-card");
  const noResults = document.querySelector("#noResults");

  function filterLawyers() {
    const searchText = lawyerSearch
      ? lawyerSearch.value.toLowerCase().trim()
      : "";

    const specialty = specialtyFilter ? specialtyFilter.value : "";
    const city = cityFilter ? cityFilter.value : "";
    const mode = modeFilter ? modeFilter.value : "";

    let visibleCount = 0;

    lawyerCards.forEach(function (card) {
      const text = card.textContent.toLowerCase();
      const cardSpecialty = card.dataset.specialty || "";
      const cardCity = card.dataset.city || "";
      const cardMode = card.dataset.mode || "";

      const matchesSearch = text.includes(searchText);
      const matchesSpecialty =
        !specialty || cardSpecialty === specialty;
      const matchesCity = !city || cardCity === city;
      const matchesMode = !mode || cardMode.includes(mode);

      const shouldShow =
        matchesSearch &&
        matchesSpecialty &&
        matchesCity &&
        matchesMode;

      card.style.display = shouldShow ? "" : "none";

      if (shouldShow) {
        visibleCount++;
      }
    });

    if (noResults) {
      noResults.style.display =
        visibleCount === 0 ? "block" : "none";
    }
  }

  if (lawyerSearch) {
    lawyerSearch.addEventListener("input", filterLawyers);
  }

  if (specialtyFilter) {
    specialtyFilter.addEventListener("change", filterLawyers);
  }

  if (cityFilter) {
    cityFilter.addEventListener("change", filterLawyers);
  }

  if (modeFilter) {
    modeFilter.addEventListener("change", filterLawyers);
  }

  // Lawyer Profile Modal
  const profileButtons = document.querySelectorAll(".view-profile");
  const lawyerModal = document.querySelector("#lawyerModal");
  const modalClose = document.querySelector(".modal-close");

  function closeModal() {
    if (lawyerModal) {
      lawyerModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  profileButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const card = button.closest(".lawyer-card");

      if (!card || !lawyerModal) return;

      const name = card.dataset.name || "Lawyer Profile";
      const specialtyName =
        card.dataset.specialty || "Legal Services";
      const cityName = card.dataset.city || "Not specified";

      const modalName = lawyerModal.querySelector("#modalLawyerName");
      const modalSpecialty =
        lawyerModal.querySelector("#modalLawyerSpecialty");
      const modalCity = lawyerModal.querySelector("#modalLawyerCity");

      if (modalName) modalName.textContent = name;
      if (modalSpecialty) modalSpecialty.textContent = specialtyName;
      if (modalCity) modalCity.textContent = cityName;

      lawyerModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (lawyerModal) {
    lawyerModal.addEventListener("click", function (event) {
      if (event.target === lawyerModal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  // Contact Form Validation
  const contactForm = document.querySelector("#contactForm");
  const formMessage = document.querySelector("#formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      if (formMessage) {
        formMessage.textContent =
          "Thank you! Your demo form has been submitted successfully.";
        formMessage.style.display = "block";
      }

      contactForm.reset();
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(".faq-question");

    if (question) {
      question.addEventListener("click", function () {
        const isOpen = item.classList.contains("active");

        faqItems.forEach(function (otherItem) {
          otherItem.classList.remove("active");
        });

        if (!isOpen) {
          item.classList.add("active");
        }
      });
    }
  });

  // Current Year
  const yearElements = document.querySelectorAll(".current-year");

  yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  // Smooth Scroll for Same-Page Links
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();

        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});
