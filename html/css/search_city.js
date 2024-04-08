function search_city() {
    let input = document.getElementById('searchbar').value.toLowerCase();
    let x = document.getElementsByClassName('image-btn');

    for (let i = 0; i < x.length; i++) {
        let cityName = x[i].getElementsByClassName('text-overlay')[0].textContent;
        if (!cityName.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        } else {
            x[i].style.display = "block";
        }
    }
}

const cityMappings = {
    "karachi": "Karachi.html",
    "cairo": "Cairo.html",
    "hanoi": "Hanoi.html",  
    "jeju-si": "Jeju-si.html",
    "bern": "Bern.html", 
    "new york": "NewYork.html",
    "paris": "Paris.html",
    "tehran": "Tehran.html"
};

function showSuggestions(input) {
    let suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = ''; // Clear previous suggestions
    if (!input) {
        suggestions.style.display = "none";
        return;
    } // If empty input, no suggestions

    Object.keys(cityMappings).forEach(city => {
        if (city.toLowerCase().startsWith(input.toLowerCase())) {
            let suggestionItem = document.createElement('div');
            suggestionItem.textContent = city.charAt(0).toUpperCase() + city.slice(1); // Capitalize first letter
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.onclick = function() {
                window.location.href = cityMappings[city];
            };
            suggestions.appendChild(suggestionItem);
            suggestions.style.display = "block";
        }
    });
}

// Enhance to also redirect on exact match when the user submits the form
function redirectToCityPage(input) {
    const matchedCity = Object.keys(cityMappings).find(city => city.toLowerCase() === input.toLowerCase());
    if (matchedCity) {
        window.location.href = cityMappings[matchedCity];
    } else {
        // Optional: Notify the user if no matching city is found
        alert('No matching city found. Please check your spelling and try again.');
    }
}

// Bind to the search bar input event for showing suggestions
document.getElementById('searchbar').oninput = function() {
    showSuggestions(this.value.trim());
};

// Bind to the form submission for direct redirection on exact match
document.querySelector('.search').onsubmit = function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    let input = document.getElementById('searchbar').value.trim();
    redirectToCityPage(input);
};