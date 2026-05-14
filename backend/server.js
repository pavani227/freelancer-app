require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const Client = require("./models/client");
const Project = require("./models/project");
const Invoice = require("./models/invoice");

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------- MONGODB CONNECTION ----------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.log("❌ MongoDB Error:");
  console.log(err);
});

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.get("/api/stats", async (req, res) => {

  try {

    const clients = await Client.find();
    const projects = await Project.find();
    const invoices = await Invoice.find();

    let totalIncome = 0;

    invoices.forEach(inv => {
      totalIncome += inv.total || 0;
    });

    res.json({
      totalIncome,
      totalExpenses: 20000,
      netProfit: totalIncome - 20000,
      estimatedTax: 5000,
      totalClients: clients.length,
      totalProjects: projects.length,
      totalInvoices: invoices.length,
      totalEarnings: totalIncome,
      pending: 10000
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

// ---------------- CLIENTS API ----------------

// CREATE CLIENT
app.post("/api/clients", async (req, res) => {

  try {

    console.log(req.body);

    const client = new Client(req.body);

    await client.save();

    res.json({
      success: true,
      client
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// GET CLIENTS
app.get("/api/clients", async (req, res) => {

  try {

    const clients = await Client.find();

    res.json(clients);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

// ---------------- PROJECTS API ----------------

// CREATE PROJECT
app.post("/api/projects", async (req, res) => {

  try {

    console.log(req.body);

    const project = new Project(req.body);

    await project.save();

    res.json({
      success: true,
      project
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// GET PROJECTS
app.get("/api/projects", async (req, res) => {

  try {

    const projects = await Project.find();

    res.json(projects);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

// ---------------- INVOICES API ----------------

// CREATE INVOICE
app.post("/api/invoices", async (req, res) => {

  try {

    console.log(req.body);

    const invoice = new Invoice({
      invoiceNumber:
        "INV-" + Math.floor(Math.random() * 10000),
      ...req.body
    });

    await invoice.save();

    res.json({
      success: true,
      invoice
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// GET INVOICES
app.get("/api/invoices", async (req, res) => {

  try {

    const invoices = await Invoice.find();

    res.json(invoices);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

// ---------------- DEFAULT ROUTE ----------------
app.get("/", (req, res) => {

  res.sendFile(
    path.join(__dirname, "../frontend/index.html")
  );
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {

  console.log(
    `✅ Server running at http://localhost:${PORT}`
  );
});
