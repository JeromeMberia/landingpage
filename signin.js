document.getElementById("loginForm").addEventListener("submit", function (e) {
	e.preventDefault();

	const email = document.getElementById("email");
	const password = document.getElementById("password");
	const emailError = document.getElementById("emailError");
	const passwordError = document.getElementById("passwordError");

	emailError.textContent = "";
	passwordError.textContent = "";

	let isValid = true;

	if (!email.value.includes("@")) {
		emailError.textContent = "Please enter a valid email address.";
		isValid = false;
	}

	if (password.value.length < 6) {
		passwordError.textContent = "Password must be at least 6 characters.";
		isValid = false;
	}

	if (isValid) {
		alert("Login successful!");
	}
	// Redirect to index.html
   // window.location.href = "index.html";
});
