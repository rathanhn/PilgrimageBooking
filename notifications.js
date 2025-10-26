// Load notifications when the page loads
document.addEventListener("DOMContentLoaded", function() {
  // Small delay to ensure all elements are loaded
  setTimeout(loadNotifications, 100);
});

// Also load notifications when user logs in (if this script is loaded after login)
window.addEventListener("storage", function(e) {
  if (e.key === "loggedInUser" && e.newValue) {
    setTimeout(loadNotifications, 100);
  }
});

// Global function to manually refresh notifications (for testing)
window.refreshNotifications = loadNotifications;

function toggleNotifications() {
  const panel = document.getElementById("notificationPanel");

  if (panel) {
    const isHidden = panel.style.display === "none" || panel.style.display === "";
    panel.style.display = isHidden ? "block" : "none";

    if (isHidden) {
      loadNotifications();
    }
  }
}

function closePanel() {
  const panel = document.getElementById("notificationPanel");
  if (panel) {
    panel.style.display = "none";
  }
}

// ✅ Single, clean event listener for closing when clicking outside
document.addEventListener("click", function (event) {
  const panel = document.getElementById("notificationPanel");
  const button = document.getElementById("notificationButton");
  const icon = document.getElementById("notificationIcon");

  if (panel && !panel.contains(event.target) && !button.contains(event.target) && !icon.contains(event.target)) {
    panel.style.display = "none";
  }
});

async function loadNotifications() {
  // Get current user from localStorage (in case it changed)
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!currentUser?.email) {
    console.log("❌ No user found for notifications");
    return;
  }

  try {
    console.log("🔔 Loading notifications for:", currentUser.email);
    const url = AppConfig.getApiUrlWithParams(AppConfig.ENDPOINTS.NOTIFICATIONS, { email: currentUser.email });
    console.log("🔗 Notifications URL:", url);
    
    const response = await fetch(url);
    const data = await response.json();
    console.log("📦 Notifications Response:", data);
    
    const list = document.getElementById("notificationList");
    const counter = document.getElementById("notificationCount");

    if (!list) {
      console.log("❌ Notification list element not found");
      return;
    }
    
    list.innerHTML = "";

    if (!data.success || !data.notifications.length) {
      console.log("📭 No notifications found");
      list.innerHTML = "<div class='text-white'>No notifications yet.</div>";
      // Hide the counter when no notifications
      if (counter) {
        counter.style.display = "none";
      }
      return;
    }

    let unreadCount = 0;
    console.log(`📬 Found ${data.notifications.length} notifications`);

    data.notifications.forEach(notif => {
      const div = document.createElement("div");
      div.className = `notification-card bg-${notif.type}`;
      div.innerHTML = `
        <div>${notif.message}</div>
        <div class="meta">${new Date(notif.createdAt).toLocaleString()}</div>
        ${
          !notif.read
            ? `<button class="btn btn-sm btn-light mt-2" onclick="markAsRead('${notif._id}', this)">Mark as Read</button>`
            : `<span class="badge bg-success mt-2">Read</span>`
        }
      `;
      if (!notif.read) unreadCount++;
      list.appendChild(div);
    });

    // Show counter with count, hide if 0
    if (counter) {
      if (unreadCount > 0) {
        counter.innerText = unreadCount;
        counter.style.display = "block";
      } else {
        counter.style.display = "none";
      }
    }
    
    console.log(`✅ Displayed ${unreadCount} unread notifications`);
  } catch (err) {
    console.error("❌ Error loading notifications:", err);
  }
}


async function markAsRead(notificationId, btn) {
  try {
    const url = AppConfig.getApiUrl(`/api/notifications/read/${notificationId}`);
    const response = await fetch(url, { method: "PUT" });
    const result = await response.json();

    if (result.success) {
      btn.outerHTML = `<span class="text-success"><i class="fas fa-check"></i> Read</span>`;
      loadNotifications(); // refresh
    }
  } catch (err) {
    console.error("Failed to mark as read:", err);
  }
}

async function clearAllNotifications() {
  try {
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!currentUser?.email) return;
    
    const url = AppConfig.getApiUrlWithParams(AppConfig.ENDPOINTS.NOTIFICATIONS_CLEAR_ALL, { email: currentUser.email });
    const response = await fetch(url, { method: "DELETE" });
    const result = await response.json();

    if (response.ok) {
      alert("Notifications cleared.");
      loadNotifications();
    } else {
      alert(result.message || "Failed to clear notifications.");
    }
  } catch (err) {
    console.error("Error clearing notifications:", err);
  }
}

