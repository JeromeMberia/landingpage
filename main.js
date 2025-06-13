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
});

// Scroll animations
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function isElementPartiallyInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

function handleScrollAnimations() {
  const sections = document.querySelectorAll(".section");
  const fadeElements = document.querySelectorAll(".fade-in-up");
  const navbar = document.querySelector(".navbar");

  // Show navbar after scrolling past hero
  if (window.scrollY > window.innerHeight * 0.5) {
    navbar.classList.add("visible");
  } else {
    navbar.classList.remove("visible");
  }

  // Animate sections
  sections.forEach((section) => {
    if (isElementPartiallyInViewport(section)) {
      section.classList.add("visible");
    }
  });

  // Animate fade-in elements
  fadeElements.forEach((element) => {
    if (isElementPartiallyInViewport(element)) {
      element.classList.add("visible");
    }
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Event listeners
window.addEventListener("scroll", handleScrollAnimations);
window.addEventListener("load", handleScrollAnimations);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Form submission handling
document.getElementById("authForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const activeTab = document.querySelector(".auth-tab.active").textContent;
  alert(`${activeTab} functionality would be implemented here!`);
});

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(handleScrollAnimations, 100);
});
function checkPasswordStrength() {
  const password = document.getElementById("signupPassword").value;
  const strengthText = document.getElementById("passwordStrength");

  let strength = 0;

  if (password.length >= 6) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

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
}

function validateSignup() {
  const firstName = document.getElementById("firstname").value.trim();
  const lastName = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorBox = document.getElementById("signupError");

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
    // You can submit the form or send data via AJAX here
  }
}
