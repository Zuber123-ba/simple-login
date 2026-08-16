const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })

        });

        const data = await response.json();

        if (response.ok) {

            message.textContent = data.message;

            // Go to dashboard
            window.location.href = "dashboard.html";

        } else {

            message.textContent = data.message;

        }

    } catch (error) {

        console.log(error);

        message.textContent = "Server connection error.";

    }

});