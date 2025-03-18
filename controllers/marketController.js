function getHistoricalMarketData(req, res) {
  const {symbol, timeRange} = req.body;
  if (!symbol) {
    res.statuse(400).send("No crypto symbol provided");
  }

  if (!timeRange) {
    res.statuse(400).send("No timeRange provided");
  }
}

export default { getHistoricalMarketData };
