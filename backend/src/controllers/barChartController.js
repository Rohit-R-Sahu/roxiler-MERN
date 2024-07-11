const Transaction = require("../models/Transaction");

const getBarChartData = async (req, res) => {
  const { month } = req.query;
  const query = {
    dateOfSale: {
      $gte: new Date(2023, month - 1, 1),
      $lt: new Date(2023, month, 1),
    },
  };

  try {
    const barChartData = await Transaction.aggregate([
      { $match: query },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [
            0,
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900,
            Infinity,
          ],
          default: "901-above",
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    res.status(200).json(barChartData);
  } catch (error) {
    res.status(500).send("Error fetching bar chart data");
  }
};

module.exports = { getBarChartData };
