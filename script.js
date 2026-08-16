const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Check email
    if (email === "") {
        message.textContent = "Please enter your email.";
        return;
    }

    // Check password
    if (password === "") {
        message.textContent = "Please enter your password.";
        return;
    }

    // Check login details
   if (email === "admin@gmail.com" && password === "12345") {

    window.location.href = "dashboard.html";

} else {

        message.textContent = "Invalid email or password.";

    }
});