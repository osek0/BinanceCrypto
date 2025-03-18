import axios from "axios";

const BINANCE_API_URL = "https://api.binance.com/api/v3";

return function analyzeMarketData(data) {
  const analyzedData = data.reduce(
    (accumulator, currentValue, index) => {
      /*
        p - price
        q - qty
        f - ﬁrst_trade_id
        l - last_trade_id
        T - time
     */
      const { p, q, f, l, T } = currentValue;
      if (accumulator.lowest.price > p || accumulator.lowest.price === null) {
        accumulator.lowest.price = p;
        accumulator.lowest.quantity = q;
        accumulator.lowest.firstTradeId = f;
        accumulator.lowest.lastTradeId = l;
        accumulator.lowest.time = T;
      }

      if (accumulator.highest.price < p || accumulator.highest.price === null) {
        accumulator.highest.price = p;
        accumulator.highest.quantity = q;
        accumulator.highest.firstTradeId = f;
        accumulator.highest.lastTradeId = l;
        accumulator.highest.time = T;
      }

      if (index === 0) {
        accumulator.priceAtStartTime = p;
      }

      if (index === data.length - 1) {
        accumulator.priceAtEndTime = p;
        accumulator.priceTrend =
          accumulator.priceAtEndTime - accumulator.priceAtStartTime > 0
            ? "Increase"
            : "Decrease";
      }

      return accumulator;
    },
    { lowest: { price: null }, highest: { price: null } }
  );

  return analyzedData;
};

async function getHistoricalMarketData(symbol, timeRange) {
  const { startTime, endTime } = timeRange;
  const historicalTrades = await axios.get(
    `${BINANCE_API_URL}/aggTrades?symbol=${symbol}&startTime=${startTime}&endTime=${endTime}&limit=5`
  );

  return analyzeMarketData(historicalTrades.data);
}

export default { getHistoricalMarketData };
