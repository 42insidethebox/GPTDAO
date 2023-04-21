document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.querySelector(".login-button");
  const incorrectDetails = document.querySelector(".incorrect-details");

  loginButton.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log("click");

    incorrectDetails.style.visibility = "hidden";

    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
      console.log("Response data:", data);

      if (response.ok) {
        console.log("Login successful");
        window.location.href = "/"; // Replace this with the URL of the page you want to redirect to after a successful login
      } else {
        console.error(`Login failed. Error message: ${data.error}`);
        incorrectDetails.style.visibility = "visible";
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  });
});
