document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector("#reports-modal");
  const btn = document.querySelector(".view-reports-btn");
  const closeBtn = document.querySelector(".close-modal-btn");
  const monthSelect = document.querySelector("#month-select");
  const overlay = document.querySelector(".overlay");
  const okButton = document.querySelector(".ok-button");

  const createProposalBtn = document.querySelector(".create-proposal-btn");
  const createProposalModal = document.querySelector("#create-proposal-modal");
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalDialog = document.querySelector(".modal-dialog");
  createProposalBtn.addEventListener("click", () => {
    createProposalModal.style.display = "block";
    modalOverlay.style.display = "block";
  });

  // Show modal when view reports button is clicked
  btn.addEventListener("click", () => {
    modal.style.display = "block";
    overlay.style.display = "block";
  });

  const closeModal = function (modalElement) {
    modalElement.style.display = "none";
    overlay.style.display = "none";
  };

  const closeModalBtn = document.querySelector(".close");

  closeModalBtn.addEventListener("click", () => {
    createProposalModal.style.display = "none";
    overlay.style.display = "none";
    modalOverlay.style.display = "none";
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
});
