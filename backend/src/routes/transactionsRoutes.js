const express = require("express");
const router = express.Router();
const {
  initializeDatabase,
  listTransactions,
} = require("../controllers/transactionsController");

router.get("/initialize", initializeDatabase);
router.get("/transactions", listTransactions);

module.exports = router;
