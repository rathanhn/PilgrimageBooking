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
  const popup = document.getElementById("loginPopup");
  if (popup) popup.style.display = "none";
  // ✅ Removed redirect - popup closes without page navigation
}

function closeRegisterPopup() {
  const popup = document.getElementById("registerPopup");
  if (popup) popup.style.display = "none";
  // ✅ Removed redirect - popup closes without page navigation
}

// ✅ Close all popups and redirect
function closeAllPopupsAndRedirect() {
  const loginPopup = document.getElementById("loginPopup");
  const registerPopup = document.getElementById("registerPopup");
  const adminLoginPopup = document.getElementById("adminLoginPopup");
  
  if (loginPopup) loginPopup.style.display = "none";
  if (registerPopup) registerPopup.style.display = "none";
  if (adminLoginPopup) adminLoginPopup.style.display = "none";
  
  // Redirect to previous or fallback page
  const previousPage = document.referrer;
  if (previousPage && previousPage !== window.location.href) {
    window.location.href = previousPage;
  } else {
    window.location.href = "index.html";
  }
}

// ✅ Close admin login popup
function closeAdminLoginPopup() {
  closeAllPopupsAndRedirect(); // Use the same redirect logic
}

// ✅ Handle Login
async function handleLogin() {
  const identifier = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!identifier || !password) {
    alert("<i class='fas fa-exclamation-triangle'></i> Please enter both username/email and password.");
    return;
  }

  const isAdmin = loginMode === "admin";
  const endpoint = isAdmin ? AppConfig.ENDPOINTS.ADMIN_LOGIN : AppConfig.ENDPOINTS.LOGIN;

  try {
    const { response, data } = await AppConfig.makeApiRequest(endpoint, {
      method: "POST",
      body: JSON.stringify(isAdmin
        ? { username: identifier, password }
        : { identifier, password }
      )
    });
    console.log("📦 Server Response:", data);

    if (!data.success) {
      alert(data.message || "❌ Login failed.");
      return;
    }

    if (isAdmin) {
      localStorage.setItem("adminUser", JSON.stringify({ username: "admin@booking.com" }));
    } else {
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
    }

    alert("✅ Login successful!");

    // ✅ Redirect AFTER successful authentication
    if (isAdmin) {
      // Admin should always go to admin dashboard, ignore redirect
      window.location.href = "admin-dashboard.html";
    } else {
      // Regular users check for redirect
      const redirect = sessionStorage.getItem("redirectAfterLogin");
      if (redirect) {
        sessionStorage.removeItem("redirectAfterLogin");
        window.location.href = redirect;
      } else {
        window.location.href = "user-dashboard.html";
      }
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
    const { response, data } = await AppConfig.makeApiRequest(AppConfig.ENDPOINTS.REGISTER, {
      method: "POST",
      body: JSON.stringify({ username, email, mobile, password })
    });
    console.log("📦 Server Response:", data);

    if (!data.success) {
      alert(data.message || "❌ Registration failed.");
      return;
    }

    alert("Registration successful! You can now login.");
    
    // Clear any redirect from sessionStorage for new registrations
    sessionStorage.removeItem("redirectAfterLogin");
    
    // Close register popup and show login popup
    closeRegisterPopup();
    setTimeout(() => {
      showLoginPopup("user");
    }, 100);
  } catch (err) {
    console.error("❌ Registration error:", err);
    alert("Something went wrong.");
  }
}

// ✅ Load popup HTML once and wire listeners
// Check if already loaded to prevent duplicates
if (!document.getElementById("loginPopup")) {
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
} else {
  // Already loaded
  window.loginPopupLoaded = true;
}
