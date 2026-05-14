// ===============================
// FreelancerHub Frontend Script
// ===============================

// ---------- LOGIN ----------
async function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const errorMessage = document.getElementById("error-message");

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (data.success) {

            // Save login status
            localStorage.setItem("isLoggedIn", "true");

            // Redirect to dashboard
            window.location.href = "dashboard.html";

        } else {
            errorMessage.textContent = data.message;
        }

    } catch (error) {
        console.error(error);
        errorMessage.textContent = "Server error. Make sure server.js is running.";
    }
}

// ---------- CHECK LOGIN ----------
function checkLogin() {

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
        window.location.href = "login.html";
    }
}

// ---------- LOGOUT ----------
function logoutUser() {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";
}

// ---------- LOAD DASHBOARD STATS ----------
async function loadStats() {

    try {

        const response = await fetch("/api/stats");
        const data = await response.json();

        const totalClients = document.getElementById("totalClients");
        const totalProjects = document.getElementById("totalProjects");
        const totalInvoices = document.getElementById("totalInvoices");
        const totalEarnings = document.getElementById("totalEarnings");

        if (totalClients) totalClients.textContent = data.totalClients;
        if (totalProjects) totalProjects.textContent = data.totalProjects;
        if (totalInvoices) totalInvoices.textContent = data.totalInvoices;
        if (totalEarnings) totalEarnings.textContent = `₹${data.totalEarnings}`;

    } catch (error) {
        console.error("Error loading stats:", error);
    }
}

// ---------- LOAD CLIENTS ----------
async function loadClients() {

    const clientTable = document.getElementById("clientTableBody");

    if (!clientTable) return;

    try {

        const response = await fetch("/api/clients");
        const clients = await response.json();

        clientTable.innerHTML = "";

        clients.forEach(client => {

            clientTable.innerHTML += `
                <tr>
                    <td>${client.id}</td>
                    <td>${client.name}</td>
                    <td>${client.email}</td>
                    <td>${client.phone}</td>
                    <td>${client.address}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error loading clients:", error);
    }
}

// ---------- LOAD PROJECTS ----------
async function loadProjects() {

    const projectTable = document.getElementById("projectTableBody");

    if (!projectTable) return;

    try {

        const response = await fetch("/api/projects");
        const projects = await response.json();

        projectTable.innerHTML = "";

        projects.forEach(project => {

            projectTable.innerHTML += `
                <tr>
                    <td>${project.id}</td>
                    <td>${project.title}</td>
                    <td>${project.status}</td>
                    <td>₹${project.amount}</td>
                    <td>${project.date}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

// ---------- LOAD INVOICES ----------
async function loadInvoices() {

    const invoiceTable = document.getElementById("invoiceTableBody");

    if (!invoiceTable) return;

    try {

        const response = await fetch("/api/invoices");
        const invoices = await response.json();

        invoiceTable.innerHTML = "";

        invoices.forEach(invoice => {

            invoiceTable.innerHTML += `
                <tr>
                    <td>${invoice.invoiceNumber}</td>
                    <td>${invoice.projectTitle}</td>
                    <td>₹${invoice.total}</td>
                    <td>${invoice.status}</td>
                    <td>${invoice.date}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error loading invoices:", error);
    }
}

// ---------- AUTO LOAD ----------
document.addEventListener("DOMContentLoaded", () => {

    loadStats();
    loadClients();
    loadProjects();
    loadInvoices();

});