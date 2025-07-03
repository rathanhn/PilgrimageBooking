const user = JSON.parse(localStorage.getItem("loggedInUser"));

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
  const icon = document.getElementById("notificationIcon");

  if (panel && icon && !panel.contains(event.target) && !icon.contains(event.target)) {
    panel.style.display = "none";
  }
});

async function loadNotifications() {
  if (!user?.email) return;

  try {
    const res = await fetch(`http://localhost:5000/api/notifications?email=${encodeURIComponent(user.email)}`);
    const data = await res.json();
    const list = document.getElementById("notificationList");
    const counter = document.getElementById("notificationCount");

    if (!list) return;
    list.innerHTML = "";

    if (!data.success || !data.notifications.length) {
      list.innerHTML = "<div class='text-white'>No notifications yet.</div>";
      counter.innerText = "0";
      return;
    }

    let unreadCount = 0;

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

    counter.innerText = unreadCount;
  } catch (err) {
    console.error("🔔 Error loading notifications:", err);
  }
}


async function markAsRead(notificationId, btn) {
  try {
    const res = await fetch(`http://localhost:5000/api/notifications/read/${notificationId}`, { method: "PUT" });
    const result = await res.json();

    if (result.success) {
      btn.outerHTML = `<span class="text-success">✔️ Read</span>`;
      loadNotifications(); // refresh
    }
  } catch (err) {
    console.error("❌ Failed to mark as read:", err);
  }
}

async function clearAllNotifications() {
  try {
    const res = await fetch(`http://localhost:5000/api/notifications/clear?email=${encodeURIComponent(user.email)}`, {
      method: "DELETE"
    });

    const result = await res.json();
    if (res.ok) {
      alert("✅ Notifications cleared.");
      loadNotifications();
    } else {
      alert(result.message || "Failed to clear notifications.");
    }
  } catch (err) {
    console.error("🔔 Error clearing notifications:", err);
  }
}

