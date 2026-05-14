const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// ---------------- LOGIN API ----------------
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
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

// ---------------- SAMPLE DASHBOARD DATA ----------------
app.get("/api/stats", (req, res) => {
  res.json({
    totalIncome: 50000,
    totalExpenses: 20000,
    netProfit: 30000,
    estimatedTax: 5000
  });
});

// ---------------- SAMPLE CLIENTS ----------------
app.get("/api/clients", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Rahul Enterprises",
      email: "rahul@example.com"
    },
    {
      id: 2,
      name: "Priya Tech",
      email: "priya@example.com"
    }
  ]);
});

// ---------------- SAMPLE PROJECTS ----------------
app.get("/api/projects", (req, res) => {
  res.json([
    {
      id: 1,
      title: "E-Commerce Website",
      status: "Completed"
    },
    {
      id: 2,
      title: "Portfolio Design",
      status: "In Progress"
    }
  ]);
});

// ---------------- SAMPLE INVOICES ----------------
app.get("/api/invoices", (req, res) => {
  res.json([
    {
      id: 1,
      invoiceNumber: "INV-001",
      client: "Rahul Enterprises",
      amount: 35000,
      status: "Paid"
    }
  ]);
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});