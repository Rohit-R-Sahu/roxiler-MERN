const axios = require("axios");
const Transaction = require("../models/Transaction");

const initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    await Transaction.deleteMany({});
    await Transaction.insertMany(response.data);
    res.status(200).send("Database initialized");
  } catch (error) {
    res.status(500).send("Error initializing database");
  }
};

const listTransactions = async (req, res) => {
  const { month, search = "", page = 1, perPage = 10 } = req.query;
  const query = {
    dateOfSale: {
      $gte: new Date(2023, month - 1, 1),
      $lt: new Date(2023, month, 1),
    },
    $or: [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { price: { $regex: search, $options: "i" } },
    ],
  };

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send("Error fetching transactions");
  }
};

module.exports = { initializeDatabase, listTransactions };
