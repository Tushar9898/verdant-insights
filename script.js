// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Show feature detail dynamically
function showFeatureDetail(feature) {
    alert('You clicked on: ${feature}. More details coming soon!');
}

// FAQ toggle functionality
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
}

// Loading spinner when visiting app
function goToPredictionApp() {
    const spinner = document.getElementById('loadingSpinner');
    spinner.style.display = 'block'; // Show the spinner
    setTimeout(() => {
        window.open('https://crop-price-prediction-model.streamlit.app/', '_blank'); // Simulate app loading
        spinner.style.display = 'none'; // Hide the spinner
    }, 2000); // Simulate a 2-second delay before opening the app
}

document.getElementById('stockForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting

    // Get selected commodity and entered amount
    const commodity = document.getElementById('commodity').value;
    const amount = parseFloat(document.getElementById('amount').value);
    
    // Check if the commodity is already in stockData
    if (!stockData[commodity]) {
        stockData[commodity] = 0; // Initialize if not present
    }

    // Update the stock data for the selected commodity
    stockData[commodity] += amount;

    // Display result
    document.getElementById('result').innerHTML = 
        `<p>Successfully added ${amount} kg of ${commodity} to the buffer stock. <br>
        Current stock of ${commodity}: ${stockData[commodity]} kg</p>`;
});

// Simple object to hold buffer stock data
const stockData = {
    wheat: 0,
    rice: 0,
    sugar: 0,
    aata: 0,
    Barley: 0,
    oats: 0,
    millet: 0,
    corn: 0,
    soybeans: 0,
    potatoes: 0,
    onions: 0,
    tomatoes: 0,
    cabbage: 0,
    carrots: 0,
    pumpkin: 0,
    peas: 0,
    beans: 0,
    chickpeas: 0,
    lentils: 0,
    cotton: 0,
    coffee: 0,
    tea: 0
};