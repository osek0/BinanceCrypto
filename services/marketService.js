const BINANCE_API_URL = "https://api.binance.com/api/v3";

function getHistoricalMarketData(symbol, timeRange) {
  const [startTime, endTime] = timeRange;
  const historicalTrades = axios.get(
    `${BINANCE_API_URL}/aggTrades?symbol=${symbol}&startTime=${startTime}&endTime=${endTime}&limit=5`
  );
}

export default { getHistoricalMarketData };
