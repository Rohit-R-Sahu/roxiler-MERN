const Transaction = require("../models/Transaction");

const getStatistics = async (req, res) => {
  const { month } = req.query;
  const query = {
    dateOfSale: {
      $gte: new Date(2023, month - 1, 1),
      $lt: new Date(2023, month, 1),
    },
  };

  try {
    const totalSales = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
          totalSold: { $sum: { $cond: ["$sold", 1, 0] } },
          totalNotSold: { $sum: { $cond: ["$sold", 0, 1] } },
        },
      },
    ]);

    res.status(200).json(totalSales[0]);
  } catch (error) {
    res.status(500).send("Error fetching statistics");
  }
};

module.exports = { getStatistics };
