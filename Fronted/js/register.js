console.log("register.js loaded");
console.log(USER_API);

document
    .getElementById("registerForm")
    .addEventListener("submit", registerUser);

async function registerUser(event) {

    event.preventDefault();

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        mobile: document.getElementById("mobile").value,
        address: document.getElementById("address").value
    };

    try {

        const response = await fetch(
            USER_API.register,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );

        if (response.ok) {

            alert("Registration Successful");

            window.location.href = "login.html";

        } else {

            alert("Registration Failed");

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");
    }
}