// // Configuration
// const stocks = [
//     { id: 'dji', symbol: 'NVDA', name: 'NVIDIA' },
//     { id: 'inx', symbol: 'INX', name: 'S&P 500' },
//     { id: 'amzn', symbol: 'AMZN', name: 'Amazon' }
// ];

// const API_URL = "https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=SYMBOL&outputsize=compact&datatype=json";
// const API_OPTIONS = {
//     method: 'GET',
//     headers: {
//         'x-rapidapi-key': 'efb77b84demsh36663167cbd15a8p1a4437jsn9a8831a0a951',
//         'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
//     }
// };

// // Fetch and update all stocks
// stocks.forEach(stock => {
//     fetch(API_URL.replace("SYMBOL", stock.symbol), API_OPTIONS)
//         .then(response => response.json())
//         .then(data => updateStock(stock, data))
//         .catch(error => showError(stock, error));
// });

// function updateStock(stock, data) {
//     const card = document.getElementById(`${stock.id}-card`);
//     if (!card) return;

//     try {
//         const meta = data['Meta Data'];
//         const timeSeries = data['Time Series (Daily)'];
//         const dates = Object.keys(timeSeries);
//         const latest = timeSeries[dates[0]];
//         const previous = timeSeries[dates[1]];

//         const change = (latest['4. close'] - previous['4. close']).toFixed(2);
//         const changePercent = ((change / previous['4. close']) * 100).toFixed(2);
//         const changeClass = change >= 0 ? "positive" : "negative";

//         // Update subtitle
//         const subtitle = card.querySelector('.stock-subtitle');
//         subtitle.textContent = meta['3. Last Refreshed'];
//         subtitle.classList.add(changeClass);
//         subtitle.removeAttribute('data-loading');

//         // Update data points
//         card.querySelector('[data-price]').textContent = `$${latest['4. close']}`;
//         card.querySelector('[data-change]').textContent = `${change >= 0 ? '▲' : '▼'} $${Math.abs(change)} (${Math.abs(changePercent)}%)`;
//         card.querySelector('[data-change]').className = changeClass;
//         card.querySelector('[data-range]').textContent = `$${latest['3. low']} - $${latest['2. high']}`;
//         card.querySelector('[data-volume]').textContent = latest['5. volume'].toLocaleString();
//     } catch (e) {
//         showError(stock, 'Invalid data format');
//     }
// }

// function showError(stock, error) {
//     const card = document.getElementById(`${stock.id}-card`);
//     if (!card) return;

//     const subtitle = card.querySelector('.stock-subtitle');
//     subtitle.removeAttribute('data-loading');
//     subtitle.setAttribute('data-error', error.message || error);
// }