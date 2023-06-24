document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector("#reports-modal");
  const btn = document.querySelector(".view-reports-btn");
  const closeBtn = document.querySelector(".close-modal-btn");
  const monthSelect = document.querySelector("#month-select");
  const overlay = document.querySelector(".overlay");
  const okButton = document.querySelector(".ok-button");
  const closeProposal = document.querySelector(".close-new-proposal");
  const createProposalBtn = document.querySelector(".create-proposal-btn");
  const createProposalModal = document.querySelector("#create-proposal-modal");
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalDialog = document.querySelector(".modal-dialog");

  if (closeProposal) {
    closeProposal.addEventListener("click", function () {
      createProposalModal.style.display = "none";
      if (modalOverlay) {
        modalOverlay.style.display = "none";
      }
    });
  }

  if (createProposalBtn) {
    createProposalBtn.addEventListener("click", () => {
      createProposalModal.style.display = "block";
      if (modalOverlay) {
        modalOverlay.style.display = "block";
      }
    });
  }
  // Show modal when view reports button is clicked
  if (btn) {
    btn.addEventListener("click", () => {
      modal.style.display = "block";
      overlay.style.display = "block";
    });
  }
  const closeModal = function (modalElement) {
    modalElement.style.display = "none";
    overlay.style.display = "none";
  };

  const closeModalBtn = document.querySelector(".close");

  closeModalBtn.addEventListener("click", () => {
    createProposalModal.style.display = "none";
    overlay.style.display = "none";
    if (modalOverlay) {
      modalOverlay.style.display = "none";
    }
  });

  // Hide modal when close button is clicked
  closeBtn.addEventListener("click", () => closeModal(modal));
  okButton.addEventListener("click", () => closeModal(modal));

  // Close modal when user clicks outside of it
  window.addEventListener("click", (event) => {
    if (event.target === modal || event.target === overlay) {
      closeModal(modal);
    }
  });

  // Opens confirmation popup cancelling proposal
  const cancelBtn = document.querySelector(".btn-cancel");
  const cancelConfirmationModal = document.querySelector(
    "#cancel-confirmation-modal"
  );
  const confirmBtn = document.querySelector(".btn-confirm");
  const denyBtn = document.querySelector(".btn-deny");

  // ...

  cancelBtn.addEventListener("click", () => {
    cancelConfirmationModal.style.display = "block";
  });

  denyBtn.addEventListener("click", () => {
    cancelConfirmationModal.style.display = "none";
  });
  confirmBtn.addEventListener("click", () => {
    cancelConfirmationModal.style.display = "none";
    createProposalModal.style.display = "none";
    overlay.style.display = "none";
  });

  okButton.addEventListener("click", () => {
    closeModal(modal);
    overlay.style.display = "none";
    modalOverlay.style.display = "none"; // Add this line to hide the modal-overlay element
  });

  // Add this JavaScript code to a script tag in your Pug file or a separate JS file

  if (document.querySelector(".modify-email"))
    document.querySelector(".modify-email").addEventListener("click", () => {
      openModal("email-modal");
    });
  if (document.querySelector(".btn-save-name"))
    document
      .querySelector(".btn-save-name")
      .addEventListener("click", async () => {
        const nameInput = document.querySelector("#name-input");
        const response = await fetch("/api/v1/users/update-name", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ displayName: nameInput.value }),
        });
        console.log(response); // Add this line
        if (response.ok) {
          // Update the UI with the new name
          document.querySelector(".user-display-name").textContent =
            nameInput.value;
        }

        closeModal2("name-modal");
      });

  if (document.querySelector(".btn-save-email"))
    document
      .querySelector(".btn-save-email")
      .addEventListener("click", async () => {
        const emailInput = document.querySelector("#input-email");
        const response = await fetch("/api/v1/users/update-email", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailInput.value }),
        });

        if (response.ok) {
          // Update the UI with the new email
          document.querySelector(".user-email").textContent = emailInput.value;
        }

        closeModal2("email-modal");
      });

  function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
  }

  function closeModal2(modalId) {
    document.getElementById(modalId).style.display = "none";
  }

  async function updateUser(userId, updatedData) {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch(`/api/v1/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.status === 200) {
        return await response.json();
      } else {
        throw new Error("Error updating user information");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  }

  // Modify the event listeners for the save buttons to send the updated information to the server
  if (document.querySelector(".btn-save-name"))
    document
      .querySelector(".btn-save-name")
      .addEventListener("click", async () => {
        const newName = document.getElementById("name-input").value;
        // Replace 'userId' with the actual user ID
        const response = await updateUser("userId", { name: newName });

        console.log("this is the resposne we get", response);

        if (response) {
          document.getElementById("user-name").textContent = newName;
          closeModal("name-modal");
        }
      });

  if (document.querySelector(".btn-save-email"))
    document
      .querySelector(".btn-save-email")
      .addEventListener("click", async () => {
        const newEmail = document.getElementById("email-input").value;
        // Replace 'userId' with the actual user ID
        const response = await updateUser("userId", { email: newEmail });

        if (response) {
          document.getElementById("user-email").textContent = newEmail;
          closeModal("email-modal");
        }
      });

  if (document.getElementById("settings-form")) {
    document
      .getElementById("settings-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();

        const updatedData = {
          bio: document.getElementById("bio").value,
          twitter: document.getElementById("twitter-handle").value,
          linkedin: document.getElementById("linkedin-url").value,
          cryptoWallet: document.getElementById("crypto-wallet").value,
          profileVisibility:
            document.getElementById("profile-visibility").value,
          emailNotifications: document.getElementById("email-notifications")
            .checked,
          pushNotifications:
            document.getElementById("push-notifications").checked,
          smsNotifications:
            document.getElementById("sms-notifications").checked,
          dataSharing: document.getElementById("data-sharing").checked,
          language: document.getElementById("language").value,
          timeZone: document.getElementById("time-zone").value,
          theme: document.getElementById("theme").value,
        };

        // Replace 'userId' with the actual user ID
        const response = await updateUser("userId", updatedData);

        if (response) {
          alert("Settings saved successfully");
        } else {
          alert("Error saving settings");
        }
      });
  }
});
