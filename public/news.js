document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const containerDropdown = document.querySelector(".container-dropdown");
  const navListItems = nav.querySelectorAll("li");
  const form = document.getElementById("news-form");

  let lastScrollTop = 0;
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

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const title = formData.get("title");
    const url = formData.get("url");
    const category = formData.get("category");
    const author = formData.get("author");

    const response = await fetch("/api/v1/submit-news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        url,
        category,
        author,
      }),
    });

    const text = await response.text(); // Get the response as plain text
    console.log("Raw response:", text);

    try {
      const data = JSON.parse(text); // Parse the response as JSON
      if (response.ok) {
        // The news item was created successfully, you can redirect or display a success message.
        console.log("News submitted successfully:", data);
      } else {
        // The news item was not created, you can display an error message.
        console.error("Error submitting news:", data.message);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });
});
