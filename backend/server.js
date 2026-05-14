require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------- MONGODB CONNECTION ----------------
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());

// ---------------- SERVE FRONTEND ----------------
app.use(express.static(path.join(__dirname, "../frontend")));

// ---------------- LOGIN API ----------------
app.post("/api/login", (req, res) => {

  const { username, password } = req.body;

  if (
    username === "admin" &&
    password === "admin123"
  ) {

    res.json({
      success: true,
      message: "Login successful"
    });

  } else {

    res.status(401).json({
      success: false,
      message: "Invalid username or password"
    });
  }
});

// ---------------- DASHBOARD STATS ----------------
app.get("/api/stats", (req, res) => {

  res.json({
    totalIncome: 50000,
    totalExpenses: 20000,
    netProfit: 30000,
    estimatedTax: 5000,
    totalClients: 2,
    totalProjects: 2,
    totalInvoices: 1,
    totalEarnings: 50000,
    pending: 10000
  });
});

// ---------------- CLIENTS API ----------------
app.get("/api/clients", (req, res) => {

  res.json([
    {
      id: 1,
      name: "Rahul Enterprises",
      email: "rahul@example.com",
      phone: "9876543210",
      address: "Bangalore"
    },
    {
      id: 2,
      name: "Priya Tech",
      email: "priya@example.com",
      phone: "9876501234",
      address: "Hyderabad"
    }
  ]);
});

// ---------------- PROJECTS API ----------------
app.get("/api/projects", (req, res) => {

  res.json([
    {
      id: 1,
      title: "E-Commerce Website",
      status: "Completed",
      amount: 35000,
      date: "2026-05-01"
    },
    {
      id: 2,
      title: "Portfolio Design",
      status: "In Progress",
      amount: 15000,
      date: "2026-05-10"
    }
  ]);
});

// ---------------- INVOICES API ----------------
app.get("/api/invoices", (req, res) => {

  res.json([
    {
      id: 1,
      invoiceNumber: "INV-001",
      projectTitle: "E-Commerce Website",
      total: 35000,
      status: "Paid",
      date: "2026-05-14"
    }
  ]);
});

// ---------------- CREATE INVOICE ----------------
app.post("/api/invoices", (req, res) => {

  const newInvoice = {
    id: Date.now(),
    invoiceNumber: "INV-" + Math.floor(Math.random() * 1000),
    ...req.body
  };

  res.json(newInvoice);
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {

  console.log(
    `✅ Server running at http://localhost:${PORT}`
  );
});
