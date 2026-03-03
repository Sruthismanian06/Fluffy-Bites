// =========================
// Responsive Navbar
// =========================
const menuIcon = document.getElementById("menuIcon");
const crossIcon = document.getElementById("crossIcon");
const navItems = document.getElementById("mobileNav");

if (menuIcon && crossIcon && navItems) {
  menuIcon.addEventListener("click", () => {
    navItems.classList.remove("hidden");
    menuIcon.classList.add("hidden");
    crossIcon.classList.remove("hidden");
  });

  crossIcon.addEventListener("click", () => {
    navItems.classList.add("hidden");
    menuIcon.classList.remove("hidden");
    crossIcon.classList.add("hidden");
  });
}

// =========================
// Firebase + Form Handling
// =========================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDzP1LNgQJZ1cQg2ctG_LnEaUIMCYEwHCY",
  authDomain: "fluffybites-06.firebaseapp.com",
  databaseURL: "https://fluffybites-06-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fluffybites-06",
  storageBucket: "fluffybites-06.firebasestorage.app",
  messagingSenderId: "303058634982",
  appId: "1:303058634982:web:e85bc2c64590049dcf9327",
  measurementId: "G-07Y3C2R7HY",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passError = document.getElementById("passError");

  // if this page doesn't have the login form, skip
  if (!form || !email || !password || !emailError || !passError) return;
  const togglePassword = document.getElementById("togglePassword");

if (togglePassword && password) {
  togglePassword.addEventListener("click", () => {
    const isPassword = password.type === "password";
    password.type = isPassword ? "text" : "password";
    togglePassword.textContent = isPassword ? "Hide" : "Show";
  });
}


  // Live validation
  email.addEventListener("input", (e) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    emailError.textContent = e.target.value.match(emailRegex)
      ? ""
      : "Invalid email format";
  });

  password.addEventListener("input", (e) => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    passError.textContent = e.target.value.match(passwordRegex)
      ? ""
      : "Minimum 8 characters, one uppercase, one lowercase, one digit & one special character";
  });

  const saveUserData = (emailValue, passwordValue) => {
    const userId = emailValue.replace(/\./g, "_");
    set(ref(database, "users/" + userId), {
      email: emailValue,
      password: passwordValue,
    })
      .then(() => console.log("Data saved successfully"))
      .catch((err) => console.error("Error saving data:", err));
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    let isValid = true;

    if (!emailValue.match(emailRegex)) {
      emailError.textContent = "Invalid email";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    if (!passwordValue.match(passwordRegex)) {
      passError.textContent = "Invalid password";
      isValid = false;
    } else {
      passError.textContent = "";
    }

    if (isValid) {
      alert("Login successful!");
      saveUserData(emailValue, passwordValue);
      form.reset();
    }
  });
});
