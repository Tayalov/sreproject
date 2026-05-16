function renderNavbar() {
    const token = localStorage.getItem("token");
    const nav = document.createElement("div");
    nav.className = "navbar";
    nav.innerHTML = `
        <div><strong>MedLine</strong></div>
        <div>
            <a href="index.html">Home</a>
            ${token ? `<a href="#" onclick="logout()">Logout</a>` : `<a href="login.html">Login</a> <a href="register.html">Register</a>`}
        </div>
    `;
    document.body.prepend(nav);
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "login.html";
}

renderNavbar();