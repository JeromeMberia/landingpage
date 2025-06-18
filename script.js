// Preloader
window.addEventListener("load", () => {
	const loader = document.getElementById("preloader");

	// Wait 3 seconds before starting the fade-out
	setTimeout(() => {
		loader.classList.add("fade-out");

		// Then wait for the fade animation (0.5s) to finish before removing
		setTimeout(() => loader.remove(), 500);
	}, 500); // 4-second delay
});

document.addEventListener("DOMContentLoaded", function () {
	const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
	const navbarToggler = document.querySelector(".navbar-toggler");

	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			const navbarCollapse = document.getElementById("navbarNav");

			// Close menu only if toggler is visible (i.e. mobile view)
			if (window.getComputedStyle(navbarToggler).display !== "none") {
				const bsCollapse =
					bootstrap.Collapse.getInstance(navbarCollapse) ||
					new bootstrap.Collapse(navbarCollapse, { toggle: false });

				bsCollapse.hide();
			}
		});
	});
});
// Auth form switching
function switchTab(tab) {
	try {
		const loginTab = document.querySelector(".auth-tab:first-child");
		const signupTab = document.querySelector(".auth-tab:last-child");
		const loginForm = document.getElementById("loginForm");
		const signupForm = document.getElementById("signupForm");

		if (!loginTab || !signupTab || !loginForm || !signupForm) {
			console.warn("Auth form elements not found");
			return;
		}

		loginForm.classList.remove("active");
		signupForm.classList.remove("active");
		loginTab.classList.remove("active");
		signupTab.classList.remove("active");

		if (tab === "login") {
			loginForm.classList.add("active");
			loginTab.classList.add("active");
		} else {
			signupForm.classList.add("active");
			signupTab.classList.add("active");
		}
	} catch (error) {
		console.error("Error in switchTab:", error);
	}
}

// Scroll animations
function isElementInViewport(el) {
	try {
		const rect = el.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <=
				(window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	} catch (error) {
		console.error("Error in isElementInViewport:", error);
		return false;
	}
}

function isElementPartiallyInViewport(el) {
	try {
		const rect = el.getBoundingClientRect();
		return rect.top < window.innerHeight && rect.bottom >= 0;
	} catch (error) {
		console.error("Error in isElementPartiallyInViewport:", error);
		return false;
	}
}

function handleScrollAnimations() {
	try {
		const sections = document.querySelectorAll(".section");
		const fadeElements = document.querySelectorAll(".fade-in-up");
		const navbar = document.querySelector(".navbar");

		if (navbar) {
			if (window.scrollY > window.innerHeight * 0.5) {
				navbar.classList.add("visible");
			} else {
				navbar.classList.remove("visible");
			}
		}

		sections.forEach((section) => {
			if (isElementPartiallyInViewport(section)) {
				section.classList.add("visible");
			}
		});

		fadeElements.forEach((element) => {
			if (isElementPartiallyInViewport(element)) {
				element.classList.add("visible");
			}
		});
	} catch (error) {
		console.error("Error in handleScrollAnimations:", error);
	}
}

function scrollToTop() {
	try {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	} catch (error) {
		console.error("Error in scrollToTop:", error);
	}
}

// Counting Animation
function animateCount(el, target, suffix = "") {
	try {
		let current = 0;
		const speed = 200; // Smaller = faster
		const increment = target / speed;

		const update = () => {
			current += increment;
			if (current < target) {
				el.innerText = Math.floor(current) + suffix;
				requestAnimationFrame(update);
			} else {
				el.innerText = target.toLocaleString() + suffix;
			}
		};

		update();
	} catch (error) {
		console.error("Error in animateCount:", error);
	}
}

// Start Animation for a Section
function startCountAnimation(sectionSelector, numberSelector) {
	try {
		const section = document.querySelector(sectionSelector);
		if (!section) {
			console.warn(`Section not found: ${sectionSelector}`);
			return;
		}

		const numbers = section.querySelectorAll(numberSelector);
		numbers.forEach((number) => {
			const target = +number.getAttribute("data-target");
			let suffix = "";

			if (number.innerText.includes("K+")) suffix = "K+";
			else if (number.innerText.includes("%")) suffix = "%";
			else if (number.innerText.includes("hrs/day")) suffix = " hrs/day";
			else if (number.innerText.includes("hrs")) suffix = " hrs";

			animateCount(number, target, suffix);
		});
	} catch (error) {
		console.error(
			`Error in startCountAnimation for ${sectionSelector}:`,
			error
		);
	}
}

// Intersection Observer for Sections
function observeSection(sectionSelector, numberSelector) {
	try {
		const section = document.querySelector(sectionSelector);
		if (section) {
			const observer = new IntersectionObserver(
				(entries, observer) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							startCountAnimation(sectionSelector, numberSelector);
							observer.unobserve(entry.target);
						}
					});
				},
				{
					threshold: 0.2,
				}
			);

			observer.observe(section);
		} else {
			console.warn(`Section not found for observer: ${sectionSelector}`);
		}
	} catch (error) {
		console.error(`Error in observeSection for ${sectionSelector}:`, error);
	}
}

// Form submission handling
function initializeFormSubmission() {
	try {
		const authForm = document.getElementById("authForm");
		if (authForm) {
			authForm.addEventListener("submit", function (e) {
				e.preventDefault();
				const activeTab =
					document.querySelector(".auth-tab.active")?.textContent || "Unknown";
				alert(`${activeTab} functionality would be implemented here!`);
			});
		}
	} catch (error) {
		console.error("Error in initializeFormSubmission:", error);
	}
}

// Password Strength Check
function checkPasswordStrength() {
	try {
		const password = document.getElementById("signupPassword")?.value;
		const strengthText = document.getElementById("passwordStrength");
		if (!password || !strengthText) return;

		let strength = 0;
		if (password.length >= 6) strength++;
		if (/[A-Z]/.test(password)) strength++;
		if (/[0-9]/.test(password)) strength++;
		if (/[^A-Za-z0-9]/.test(password)) strength++;

		strengthText.className = "";
		if (strength === 0) {
			strengthText.textContent = "";
		} else if (strength <= 1) {
			strengthText.textContent = "Weak password";
			strengthText.className = "weak";
		} else if (strength === 2 || strength === 3) {
			strengthText.textContent = "Medium strength";
			strengthText.className = "medium";
		} else {
			strengthText.textContent = "Strong password";
			strengthText.className = "strong";
		}
	} catch (error) {
		console.error("Error in checkPasswordStrength:", error);
	}
}

// Signup Validation
function validateSignup() {
	try {
		const firstName = document.getElementById("firstname")?.value.trim();
		const lastName = document.getElementById("lastname")?.value.trim();
		const email = document.getElementById("email")?.value.trim();
		const password = document.getElementById("signupPassword")?.value;
		const confirmPassword = document.getElementById("confirmPassword")?.value;
		const errorBox = document.getElementById("signupError");

		if (!errorBox) return;

		let errorMsg = "";
		if (!firstName || !lastName || !email || !password || !confirmPassword) {
			errorMsg = "Please fill in all required fields.";
		} else if (password !== confirmPassword) {
			errorMsg = "Passwords do not match.";
		} else if (password.length < 6) {
			errorMsg = "Password must be at least 6 characters long.";
		}

		if (errorMsg) {
			errorBox.textContent = errorMsg;
		} else {
			errorBox.textContent = "";
			alert("Account created successfully (demo logic).");
		}
	} catch (error) {
		console.error("Error in validateSignup:", error);
	}
}

// Initialize All Functionality
document.addEventListener("DOMContentLoaded", () => {
	try {
		// Observe Counting Sections
		observeSection(".metrics-section", ".metric-number");
		observeSection(".stats-section", ".stat-number");

		// Check Counting on Load
		const sections = [".metrics-section", ".stats-section"];
		const selectors = [".metric-number", ".stat-number"];
		sections.forEach((sectionSelector, index) => {
			const section = document.querySelector(sectionSelector);
			if (section) {
				const rect = section.getBoundingClientRect();
				if (rect.top < window.innerHeight && rect.bottom >= 0) {
					startCountAnimation(sectionSelector, selectors[index]);
				}
			}
		});

		// Initialize Other Features
		handleScrollAnimations();
		initializeFormSubmission();

		// Bind Password Strength Check
		const signupPassword = document.getElementById("signupPassword");
		if (signupPassword) {
			signupPassword.addEventListener("input", checkPasswordStrength);
		}

		// Bind Signup Validation
		const signupForm = document.getElementById("signupForm");
		if (signupForm) {
			signupForm.addEventListener("submit", (e) => {
				e.preventDefault();
				validateSignup();
			});
		}
	} catch (error) {
		console.error("Error in DOMContentLoaded:", error);
	}
});

/////////////Contact Form Validation////////////

// Contact Form Validation
document
	.getElementById("contactForm")
	?.addEventListener("submit", function (e) {
		e.preventDefault();
		const form = this;
		let isValid = true;

		// Reset error messages
		document
			.querySelectorAll(".error-message")
			.forEach((error) => (error.style.display = "none"));

		// Validate Name
		const name = document.getElementById("contactName").value.trim();
		if (!name) {
			document.getElementById("nameError").style.display = "block";
			isValid = false;
		}

		// Validate Email
		const email = document.getElementById("contactEmail").value.trim();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email || !emailRegex.test(email)) {
			document.getElementById("emailError").style.display = "block";
			isValid = false;
		}

		// Validate Phone (optional, but must be valid if provided)
		const phone = document.getElementById("contactPhone").value.trim();
		const phoneRegex = /^\+?[\d\s-]{7,15}$/;
		if (phone && !phoneRegex.test(phone)) {
			document.getElementById("phoneError").style.display = "block";
			isValid = false;
		}

		// Validate Message
		const message = document.getElementById("contactMessage").value.trim();
		if (!message) {
			document.getElementById("messageError").style.display = "block";
			isValid = false;
		}

		if (isValid) {
			// Simulate form submission (replace with actual backend logic)
			alert("Form submitted successfully! (Demo logic)");
			form.reset();
			// Example backend submission (uncomment and configure):
			/*
                fetch('/api/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name, email, phone, message })
                })
                .then(response => response.json())
                .then(data => {
                  alert('Message sent successfully!');
                  form.reset();
                })
                .catch(error => {
                  console.error('Error submitting form:', error);
                  alert('Failed to send message. Please try again.');
                });
                */
		}
	});

// Fade-in Animation on Scroll
function handleContactAnimation() {
	const fadeElements = document.querySelectorAll(
		".contact-section .fade-in-up"
	);
	fadeElements.forEach((element) => {
		const rect = element.getBoundingClientRect();
		if (rect.top < window.innerHeight && rect.bottom >= 0) {
			element.classList.add("visible");
		}
	});
}

/////////////////////footer animation////////////////////

// Newsletter Form Validation
document
	.getElementById("newsletterForm")
	?.addEventListener("submit", function (e) {
		try {
			e.preventDefault();
			const form = this;
			const email = document.getElementById("newsletterEmail").value.trim();
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			const error = document.getElementById("newsletterError");

			error.style.display = "none";

			if (!email || !emailRegex.test(email)) {
				error.style.display = "block";
				return;
			}

			// Simulate subscription (replace with backend logic)
			alert("Subscribed successfully! (Demo logic)");
			form.reset();
			// Example backend submission:
			/*
                fetch('/api/newsletter', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email })
                })
                .then(response => response.json())
                .then(data => {
                  alert('Subscribed successfully!');
                  form.reset();
                })
                .catch(error => {
                  console.error('Error subscribing:', error);
                  alert('Failed to subscribe. Please try again.');
                });
                */
		} catch (error) {
			console.error("Error in newsletter form submission:", error);
		}
	});

window.addEventListener("scroll", handleScrollAnimations);
window.addEventListener("load", handleScrollAnimations);
