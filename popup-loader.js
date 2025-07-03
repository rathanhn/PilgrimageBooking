let loginMode = "user"; // default login mode

// ✅ Show Login Popup with proper title
function showLoginPopup(mode = "user") {
  if (!window.loginPopupLoaded) {
    setTimeout(() => showLoginPopup(mode), 100);
    return;
  }

  loginMode = mode;
  const loginPopup = document.getElementById("loginPopup");
  loginPopup.style.display = "flex";
  const title = loginPopup.querySelector("h4");
  title.innerText = mode === "admin" ? "Admin Login" : "User Login";
  document.getElementById("loginUsername")?.focus();
}

// ✅ Show Register Popup
function switchToRegister() {
  closeLoginPopup();
  document.getElementById("registerPopup").style.display = "flex";
}

// ✅ Show Login from Register
function switchToLogin() {
  closeRegisterPopup();
  document.getElementById("loginPopup").style.display = "flex";
}

// ✅ Close popups
function closeLoginPopup() {
  document.getElementById("loginPopup").style.display = "none";
}
function closeRegisterPopup() {
  document.getElementById("registerPopup").style.display = "none";
}

// ✅ Handle Login
async function handleLogin() {
  const identifier = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!identifier || !password) {
    alert("⚠️ Please enter both username/email and password.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password })
    });

    const data = await res.json();
    console.log("📦 Server Response:", data);

    if (!data.success) {
      alert(data.message || "❌ Login failed.");
      return;
    }

    if (loginMode === "admin" && data.user.email.toLowerCase() !== "admin@booking.com") {
      alert("🚫 You are not authorized as admin.");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(data.user));
    alert("✅ Login successful!");

    const redirect = sessionStorage.getItem("redirectAfterLogin");
    if (redirect) {
      sessionStorage.removeItem("redirectAfterLogin");
      window.location.href = redirect;
    } else {
      window.location.href = loginMode === "admin"
        ? "admin-dashboard.html"
        : "user-dashboard.html";
    }
} catch (err) {
    console.error("❌ Login error:", err);
    alert("Something went wrong.");
  }
}

// ✅ Handle Registration
async function handleRegister() {
  const username = document.getElementById("registerUsername").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const mobile = document.getElementById("registerMobile").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!username || !email || !mobile || !password || !confirmPassword) {
    alert("⚠️ Please enter all required fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("⚠️ Passwords do not match.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, mobile, password })
    });

    const data = await res.json();
    console.log("📦 Server Response:", data);

    if (!data.success) {
      alert(data.message || "❌ Registration failed.");
      return;
    }

    alert("✅ Registration successful! You can now login.");
    closeRegisterPopup();
  } catch (err) {
    console.error("❌ Registration error:", err);
    alert("Something went wrong.");
  }
}

// ✅ Load popup HTML once and wire listeners
document.querySelectorAll(".login-link").forEach(link => link.style.pointerEvents = "none");

fetch("login-popup.html")
  .then(res => res.text())
  .then(html => {
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    window.loginPopupLoaded = true;

    document.querySelectorAll(".login-link").forEach(link => {
      link.style.pointerEvents = "auto";
      link.addEventListener("click", () => showLoginPopup("user"));
    });

    document.querySelectorAll(".admin-login-link").forEach(link => {
      link.addEventListener("click", () => showLoginPopup("admin"));
    });
  });
