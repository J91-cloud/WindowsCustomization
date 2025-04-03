const url = 'https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=compact&datatype=json';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'efb77b84demsh36663167cbd15a8p1a4437jsn9a8831a0a951',
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
    }
};

fetch(url, options)
    .then(response => response.json())
    .then(data => {
        // Display metadata
        const meta = data['Meta Data'];
        document.getElementById('meta-data').innerHTML = `
            <h2>${meta['2. Symbol']} Stock Data</h2>
            <p>Last Updated: ${meta['3. Last Refreshed']} (${meta['5. Time Zone']})</p>
        `;

        // Get yesterday's date (the day before last refreshed)
        const dates = Object.keys(data['Time Series (Daily)']);
        const yesterday = dates[1]; // Second item is previous day
        
        // Display yesterday's data
        const daily = data['Time Series (Daily)'][yesterday];
        document.getElementById('daily-data').innerHTML = `
            <h3>Data for ${yesterday}:</h3>
            <p>Open: $${daily['1. open']}</p>
            <p>High: $${daily['2. high']}</p>
            <p>Low: $${daily['3. low']}</p>
            <p>Close: $${daily['4. close']}</p>
            <p>Volume: ${daily['5. volume']}</p>
        `;
    })
    .catch(error => {
        document.getElementById('meta-data').textContent = 'Error loading data';
        console.error(error);
    });