function closeProposalModal() {
  const proposalModal = document.querySelector(".proposal-modal");

  // Slide modal from top to bottom and then hide it
  proposalModal.style.top = "100%";
  proposalModal.style.display = "none";
  // Smooth scroll back to the .governance-features

  console.log("done scrolling");
}

document.addEventListener("DOMContentLoaded", function () {
  // Your existing code here...
});

document.addEventListener("DOMContentLoaded", function () {
  // Toggle navigation menu for mobile devices

  if (document.querySelector(".add-report-btn")) {
    document
      .querySelector(".add-report-btn")
      .addEventListener("click", function () {
        document.querySelector(".form-report-modal").classList.toggle("open");
      });
  }

  // Define helper functions at the top of the file
  function populateTable(proposals) {
    console.log(
      "populateTable has been called with these proposals:",
      proposals
    );

    const tbody = document.getElementById("proposal-tbody-container");
    tbody.innerHTML = ""; // Clear the current rows
    proposals.forEach((proposal, index) => {
      console.log(`Processing proposal at index ${index}:`, proposal);
      console.log(proposal._id);
      const tr = document.createElement("tr");
      tr.setAttribute("id", `proposal-${proposal._id}`); // Set the proposal id as an attribute on the tr element
      tr.innerHTML = `
      <td class="date">${proposal.date}</td>
      <td class="proposal-name">
        <a href="#">${proposal.title}</a> 
      </td>
      <td class="voting-percentage">${proposal.votingPercentage}%</td>
      <td class="status">${proposal.status}</td>
      <td class="vote-cell">
        <button class="vote-btn ${
          proposal.status === "Expired" ? "disabled" : ""
        }">Vote</button>
      </td>
    `;

      // Adding click event to each row
      tr.addEventListener("click", () => {
        openProposalModal(proposal._id);
      });

      tbody.appendChild(tr);

      const proposalmodal = document.querySelector(".proposal-modal");
      var proposalNames = document.querySelectorAll(".proposal-name");

      var proposalNames = document.querySelectorAll(".proposal-name");

      proposalNames.forEach(function (proposalName) {
        proposalName.addEventListener("click", function () {
          proposalmodal.style.display = "block";
          proposalmodal.style.top = "0";

          setTimeout(() => {
            document
              .querySelector("#proposal-modal")
              .scrollIntoView({ behavior: "smooth" });
          }, 50);
        });
      });
    });
    document
      .querySelector(".close-proposal-modal")
      .addEventListener("click", function () {
        document
          .querySelector(".governance-feature")
          .scrollIntoView({ behavior: "smooth" });
        closeProposalModal();
      });
  }

  function openProposalModal(id) {
    fetch(`/api/v1/proposals/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((proposal) => {
        // populate modal fields with proposal data
        document.getElementById("view-proposal-type").innerText =
          proposal.proposalType;
        document.getElementById("view-proposal-title").innerText =
          proposal.title;
        document.getElementById("view-proposal-description").innerText =
          proposal.description;
        document.getElementById("view-proposal-audience").innerText =
          proposal.targetAudience;
        document.getElementById("view-proposal-status").innerText =
          proposal.currentStatus;
        document.getElementById("view-proposal-kpi").innerText =
          proposal.kpis.join(", ");
        document.getElementById("view-proposal-risks").innerText =
          proposal.risksAndChallenges.join(", ");
        document.getElementById("view-proposal-dependencies").innerText =
          proposal.dependencies.join(", ");
        document.getElementById("view-proposal-ownership").innerText =
          proposal.ownershipAndGovernance;
        document.getElementById("view-proposal-ip").innerText =
          proposal.intellectualPropertyRights;
        document.getElementById("view-proposal-nda").innerText =
          proposal.confidentialityAgreement;
        document.getElementById("view-proposal-social-impact").innerText =
          proposal.socialImpact;
        document.getElementById("view-proposal-diversity").innerText =
          proposal.diversityInclusion;
        document.getElementById("view-proposal-link").innerText = proposal.link;
        document.getElementById("view-proposal-budget").innerText =
          proposal.budget;
        // Open modal
      })
      .catch((error) => console.error("Error:", error));
  }

  // Then handle events like window.onload
  window.onload = function () {
    fetch("/api/v1/proposals") // Ensure this is the correct endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => populateTable(data))
      .catch((error) => console.error("Error:", error));
  };

  function populateReportContent(report) {
    document.getElementById(
      "tokens-sold"
    ).textContent = `Tokens Sold: ${report.revenue.tokenSales.numberOfTokensSold}`;
    document.getElementById(
      "token-price"
    ).textContent = `Price per Token: ${report.revenue.tokenSales.pricePerToken}`;
    document.getElementById(
      "total-revenue"
    ).textContent = `Total Revenue: ${report.revenue.totalRevenue}`;
    document.getElementById(
      "total-expenses"
    ).textContent = `Total Expenses: ${report.expenses.totalExpenses}`;
    document.getElementById(
      "total-profit-loss"
    ).textContent = `Profit/Loss: ${report.profitLoss}`;
  }

  let reports = [];

  function populateMonthSelect(reportData) {
    reports = reportData;
    const reportMonthSelect = document.getElementById("report-month");

    reports.forEach((report) => {
      const option = document.createElement("option");
      option.value = report.month;
      option.text = report.month;
      reportMonthSelect.add(option);
    });

    populateReportContent(reports[0]); // Populate content for the first month initially
  }

  document
    .getElementById("report-month")
    .addEventListener("change", function () {
      const selectedMonth = this.value;
      const selectedReport = reports.find(
        (report) => report.month === selectedMonth
      );
      populateReportContent(selectedReport);
    });

  // In your fetch call...
  fetch("/api/v1/reports")
    .then((response) => response.json())
    .then((data) => {
      populateMonthSelect(data.reports);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

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
