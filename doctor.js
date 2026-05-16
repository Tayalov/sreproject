const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

async function fetchPatients() {
    const res = await fetch("http://localhost:5000/api/users/patients", {
        headers: { "Authorization": "Bearer " + token }
    });
    const patients = await res.json();
    const container = document.getElementById("patients");
    const select = document.getElementById("patientSelect");
    container.innerHTML = "";
    select.innerHTML = "";
    patients.forEach(p => {
        container.innerHTML += `<div>${p.name} (${p.email})</div>`;
        select.innerHTML += `<option value="${p._id}">${p.name}</option>`;
    });
}

async function fetchMedicines() {
    const res = await fetch("http://localhost:5000/api/medicines");
    const meds = await res.json();
    const select = document.getElementById("medicineSelect");
    select.innerHTML = "";
    meds.forEach(m => {
        select.innerHTML += `<option value="${m._id}">${m.name}</option>`;
    });
}

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
                    Patient: ${p.patient}<br>
                    Medicine: ${p.medicine.name}<br>
                    Dosage: ${p.dosage}<br>
                    Schedule: ${p.schedule}<br>
                    <button onclick="updatePrescription('${p._id}')">Update</button>
                    <button onclick="deletePrescription('${p._id}')">Delete</button>
                </div>
            </div>
        `;
    });
}

async function assignMedicine() {
    const patient = document.getElementById("patientSelect").value;
    const medicine = document.getElementById("medicineSelect").value;
    const dosage = document.getElementById("dosage").value;
    const schedule = document.getElementById("schedule").value;
    if (!patient || !medicine || !dosage || !schedule) return alert("Fill all fields");

    const res = await fetch("http://localhost:5000/api/prescriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ patient, medicine, dosage, schedule })
    });

    const data = await res.json();
    alert(data.message);
    fetchPrescriptions();
}

async function updatePrescription(id) {
    const dosage = prompt("Enter new dosage:");
    const schedule = prompt("Enter new schedule:");
    if (!dosage || !schedule) return;
    await fetch(`http://localhost:5000/api/prescriptions/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ dosage, schedule })
    });
    fetchPrescriptions();
}

async function deletePrescription(id) {
    if (!confirm("Delete this prescription?")) return;
    await fetch(`http://localhost:5000/api/prescriptions/${id}`, {
        method: "DELETE",
        headers: { "Authorization": "Bearer " + token }
    });
    fetchPrescriptions();
}

fetchPatients();
fetchMedicines();
fetchPrescriptions();



