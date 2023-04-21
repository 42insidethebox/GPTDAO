document.addEventListener("DOMContentLoaded", function () {
  // Toggle navigation menu for mobile devices

  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const containerDropdown = document.querySelector(".container-dropdown");
  const navListItems = nav.querySelectorAll("li");

  function onBuyNowClick() {
    const ctaModal = document.querySelector(".cta-modal");
    const offset = window.innerHeight * 0.25; // 30% offset
    const targetPosition = ctaModal.getBoundingClientRect().top - offset;
    window.scrollTo({
      top: targetPosition + window.scrollY,
      behavior: "smooth",
    });
    setTimeout(() => {
      const buyTokensButton = document.querySelector(".btn-buy-tokens-cta");
      buyTokensButton.click();
    }, 50); // Wait for 1 second before clicking the button
  }

  const buyNowButton = document.querySelector(".btn-buy-now");
  if (buyNowButton) {
    buyNowButton.addEventListener("click", onBuyNowClick);
  }

  function onCtaButtonClick(event) {
    const button = event.currentTarget;
    const slideId = button.dataset.slide;
    const allSlides = document.querySelectorAll(".slide");
    const allButtons = document.querySelectorAll(".cta-actions button");

    // Hide all slides and reset translateY for all buttons
    allSlides.forEach((slide) => {
      slide.style.display = "none";
    });
    allButtons.forEach((btn) => {
      btn.style.transform = "translateY(50%)";
      btn.style.backgroundColor = "#338feb";
    });

    // Show the selected slide and set translateY(-20%) for the selected button
    document.getElementById(slideId).style.display = "block";
    button.style.transform = "translateY(-20%)";
    button.style.backgroundColor = "#0b69c6";
  }

  if (document.querySelector(".cta-actions")) {
    const ctaButtons = document.querySelectorAll(".cta-actions button");
    ctaButtons.forEach((button) => {
      button.addEventListener("click", onCtaButtonClick);
    });
  }

  if (document.querySelector(".btn-register")) {
    document
      .querySelector(".btn-register")
      .addEventListener("click", function (e) {
        e.preventDefault();
      });
  }

  if (document.querySelector(".btn-logout")) {
    document
      .querySelector(".btn-logout")
      .addEventListener("click", function (e) {
        e.preventDefault();

        fetch("/logout", {
          method: "POST",
          credentials: "include",
        })
          .then((response) => {
            if (response.ok) {
              window.location.href = "/";
            }
          })
          .catch((error) => {
            console.error("Logout error:", error);
          });
      });
  }

  function toggleNavMenu() {
    if (nav.classList.contains("nav-animate-out")) {
      nav.classList.remove("nav-animate-out");
      nav.classList.add("nav-animate-in");
      containerDropdown.classList.remove("container-dropdown-animate-out");
      containerDropdown.classList.add("container-dropdown-animate-in");
      navListItems.forEach((item) => {
        item.classList.remove("nav-animate-out");
        item.classList.add("nav-animate-in");
      });
    } else {
      nav.classList.remove("nav-animate-in");
      nav.classList.add("nav-animate-out");
      containerDropdown.classList.remove("container-dropdown-animate-in");
      containerDropdown.classList.add("container-dropdown-animate-out");
      navListItems.forEach((item) => {
        item.classList.remove("nav-animate-in");
        item.classList.add("nav-animate-out");
      });
    }
  }

  burger.addEventListener("click", toggleNavMenu);

  // Make the logo clickable
  document.getElementById("nav-icon").addEventListener("click", function () {
    window.location.href = "/";
  });

  // Update the navigation menu based on the viewport size
  function updateNavMenu() {
    if (window.innerWidth < 1130) {
      if (!nav.classList.contains("nav-animate-out")) {
        toggleNavMenu();
      }
    } else {
      if (nav.classList.contains("nav-animate-out")) {
        toggleNavMenu();
      }
    }
  }

  const valuesBtn = document.querySelector(".about__button");
  const introSection = document.getElementById("vision");
  if (valuesBtn) {
    valuesBtn.addEventListener("click", (e) => {
      e.preventDefault();
      introSection.scrollIntoView({ behavior: "smooth" });
    });
  }
  // Hide the navigation menu when scrolling down and show when scrolling up
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    if (window.innerWidth > 1130) {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        if (!nav.classList.contains("nav-animate-out")) {
          nav.classList.remove("nav-animate-in");
          nav.classList.add("nav-animate-out");
          containerDropdown.classList.remove("container-dropdown-animate-in");
          containerDropdown.classList.add("container-dropdown-animate-out");

          navListItems.forEach((item) => {
            item.classList.remove("nav-animate-in");
            item.classList.add("nav-animate-out");
          });
        }
      } else {
        // Scrolling up
        if (nav.classList.contains("nav-animate-out")) {
          nav.classList.remove("nav-animate-out");
          nav.classList.add("nav-animate-in");
          containerDropdown.classList.remove("container-dropdown-animate-out");
          containerDropdown.classList.add("container-dropdown-animate-in");

          navListItems.forEach((item) => {
            item.classList.remove("nav-animate-out");
            item.classList.add("nav-animate-in");
          });
        }
      }
      lastScrollTop = scrollTop;
    }
  });

  updateNavMenu();
  window.addEventListener("resize", updateNavMenu);
});
