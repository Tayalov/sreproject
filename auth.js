const apiUrl = "http://localhost:5000/api/auth";

async function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const res = await fetch(apiUrl + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
    });

    const data = await res.json();
    alert(data.message);
    if (res.ok) window.location.href = "login.html";
}

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(apiUrl + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        // auth.js - после получения токена
        localStorage.setItem("userId", data.userId); // userId приходит с бекенда

        if (data.role === "admin") window.location.href = "admin.html";
        else if (data.role === "doctor") window.location.href = "doctor.html";
        else window.location.href = "patient.html";
    } else {
        alert(data.message);
    }
}