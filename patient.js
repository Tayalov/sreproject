const token = localStorage.getItem("token");

if (!token) window.location.href = "login.html";

async function fetchPrescriptions() {
    const res = await fetch("http://localhost:5000/api/prescriptions/my", {
        headers: { "Authorization": "Bearer " + token }
    });
    const prescriptions = await res.json();
    const container = document.getElementById("prescriptions");
    container.innerHTML = "";
    prescriptions.forEach(p => {
        container.innerHTML += `
            <div class="medicine-card">
                <div class="info">
                    <strong>${p.medicine?.name || "No medicine"}</strong> - ${p.medicine?.description || ""} <br>
                    Dosage: ${p.dosage}, Schedule: ${p.schedule} <br>
                    Prescribed by: ${p.doctor?.name || "Doctor"}
                </div>
            </div>
        `;
    });
}

async function fetchAllMedicines() {
    const res = await fetch("http://localhost:5000/api/medicines");
    const meds = await res.json();
    const container = document.getElementById("medicines");
    container.innerHTML = "";
    meds.forEach(m => {
        container.innerHTML += `
            <div class="medicine-card">
                <img src="${m.image}" />
                <div class="info">
                    <strong>${m.name}</strong> - ${m.description} <br>
                    Price: $${m.price}, Rating: ${m.rating || 0} <br>
                    <button onclick='addToCart(${JSON.stringify(m)})'>Add to Cart</button>
                    <button onclick="reviewMedicine('${m._id}')">Review</button>
                </div>
            </div>
        `;
    });
}

function addToCart(medicine) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(medicine);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
    showCart();
}

function showCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart");
    if (!container) return;
    container.innerHTML = "";
    cart.forEach(item => {
        container.innerHTML += `
            <div class="medicine-card">
                <img src="${item.image}">
                <div>
                    <strong>${item.name}</strong><br>
                    Price: $${item.price}
                </div>
            </div>
        `;
    });
}

async function reviewMedicine(medicineId) {
    const text = prompt("Write your review:");
    const rating = prompt("Give rating 1-5:");
    if (!text || !rating) return;
    await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ medicine: medicineId, text, rating })
    });
    alert("Review added!");
}

fetchPrescriptions();
fetchAllMedicines();
showCart();