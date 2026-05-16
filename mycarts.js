const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

async function fetchCart() {
    const res = await fetch("http://localhost:5000/api/cart/my", {
        headers: { "Authorization": "Bearer " + token }
    });
    const cart = await res.json();
    const container = document.getElementById("cart");
    container.innerHTML = "";

    if (!cart.length) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(item => {
        container.innerHTML += `
            <div class="medicine-card">
                <img src="${item.medicine.image}" />
                <div class="info">
                    <strong>${item.medicine.name}</strong><br>
                    ${item.medicine.description}<br>
                    Dosage: <input type="text" id="dosage-${item._id}" value="${item.dosage}"><br>
                    Schedule: <input type="text" id="schedule-${item._id}" value="${item.schedule}"><br>
                    <button onclick="updateCart('${item._id}')">Update</button>
                    <button onclick="deleteCart('${item._id}')">Delete</button>
                </div>
            </div>
        `;
    });
}

async function updateCart(id) {
    const dosage = document.getElementById(`dosage-${id}`).value;
    const schedule = document.getElementById(`schedule-${id}`).value;
    await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ dosage, schedule })
    });
    fetchCart();
}

async function deleteCart(id) {
    if (!confirm("Delete this item?")) return;
    await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "DELETE",
        headers: { "Authorization": "Bearer " + token }
    });
    fetchCart();
}

fetchCart();