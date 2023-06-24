// register.js
document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.querySelector(".register-button");
  const errorMessage = document.querySelector(".error-message");

  registerButton.addEventListener("click", async (event) => {
    event.preventDefault();

    errorMessage.style.visibility = "hidden";

    const username = document.querySelector("#register-user").value;
    const email = document.querySelector("#register-email").value;
    const password = document.querySelector("#register-password").value;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
      console.log("Response data:", data);

      if (response.ok) {
        console.log("Registration successful");
        window.location.href = "/login"; // Redirect to the login page after successful registration
      } else {
        console.error(`Registration failed. Error message: ${data.error}`);
        errorMessage.textContent = data.error;
        errorMessage.style.visibility = "visible";
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  });
});
