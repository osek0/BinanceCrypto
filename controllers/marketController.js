import marketService from "../services/marketService.js";

function getHistoricalMarketData(req, res) {
  const {symbol, timeRange} = req.body;
  if (!symbol) {
    res.status(400).send("No crypto symbol provided");
  }

  if (!timeRange) {
    res.status(400).send("No timeRange provided");
  }

  res.send(marketService.getHistoricalMarketData());
}

export default { getHistoricalMarketData };
