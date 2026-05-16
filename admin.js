const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

async function fetchMedicines() {
    const res = await fetch("http://localhost:5000/api/medicines");
    const meds = await res.json();
    const container = document.getElementById("medicines");
    container.innerHTML = "";
    meds.forEach(m => {
        container.innerHTML += `
            <div class="medicine-card">
                <img src="${m.image}">
                <div class="info">
                    <strong>${m.name}</strong><br>
                    ${m.description}<br>
                    Price: $${m.price}<br>
                    Rating: ${m.rating || 0}<br>
                    <button onclick="updateMedicine('${m._id}')">Update</button>
                    <button onclick="deleteMedicine('${m._id}')">Delete</button>
                </div>
            </div>
        `;
    });
}

async function addMedicine() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").value;
    const price = document.getElementById("price").value;

    const res = await fetch("http://localhost:5000/api/medicines", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ name, description, image, price })
    });
    const data = await res.json();
    alert(data.message);
    fetchMedicines();
}

async function updateMedicine(id) {
    const name = prompt("New name:");
    const description = prompt("New description:");
    const image = prompt("New image URL:");
    const price = prompt("New price:");
    await fetch(`http://localhost:5000/api/medicines/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ name, description, image, price })
    });
    fetchMedicines();
}

async function deleteMedicine(id) {
    if (!confirm("Delete this medicine?")) return;
    await fetch(`http://localhost:5000/api/medicines/${id}`, {
        method: "DELETE",
        headers: { "Authorization": "Bearer " + token }
    });
    fetchMedicines();
}

fetchMedicines();