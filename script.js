document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const temple = document.getElementById("temple").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const aadhaar = document.getElementById("aadhaar").value;
    const status = "Pending";

    try {
        const response = await fetch("http://localhost:5000/book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ temple, date, time, name, email, mobile, aadhaar, status }) 
        });

        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "Booking failed");

        console.log("✅ Server Response:", result);

        const ticketId = result.booking?.ticketId; 
        if (!ticketId) throw new Error("Ticket ID not received from server");

        alert("🎉 Booking Successful! Ticket ID: " + ticketId);
        window.location.href = `confirmation.html?ticketId=${ticketId}`;

    } catch (error) {
        console.error("❌ Error:", error);
        alert("⚠️ Failed to book. Please try again.");
    }
});
