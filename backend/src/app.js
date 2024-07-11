const express = require("express");
const connectDB = require("./utils/db");
const transactionsRoutes = require("./routes/transactionsRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");
const barChartRoutes = require("./routes/barChartRoutes");
const pieChartRoutes = require("./routes/pieChartRoutes");

const app = express();
connectDB();

app.use(express.json());

app.use("/api", transactionsRoutes);
app.use("/api", statisticsRoutes);
app.use("/api", barChartRoutes);
app.use("/api", pieChartRoutes);

module.exports = app;
