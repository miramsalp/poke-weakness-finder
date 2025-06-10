const pokemonSearchInput = document.getElementById('pokemonSearchInput');
const searchResults = document.getElementById('searchResults');
const searchInputGroup = document.querySelector('.search-input-group'); // Get the input group
let searchTimeout;

// Function to highlight the query within the text, specifically the part that starts with the query
function highlightText(text, query) {
    if (!query) return text;

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();

    // Check if the text starts with the query
    if (lowerText.startsWith(lowerQuery)) {
        const matchedPart = text.substring(0, query.length);
        const highlightedMatch = `<span class="highlight">${matchedPart}</span>`; // Use 'highlight' class
        const remainingPart = text.substring(query.length);
        return highlightedMatch + remainingPart;
    }

    return text; // No match at the beginning, so return original text
}

pokemonSearchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout); // Clear previous timeout
    const query = pokemonSearchInput.value.trim();

    // Show/hide 'X' (clear) icon based on input content
    if (query.length > 0) {
        searchInputGroup.classList.add('has-content'); // Add class to show 'X'
    } else {
        searchInputGroup.classList.remove('has-content'); // Remove class to hide 'X'
    }

    // Hide results if input is empty
    if (query.length === 0) {
        searchResults.style.display = 'none';
        searchResults.innerHTML = ''; // Clear results
        return;
    }

    // Set a timeout to wait for user to finish typing (reduces API calls)
    searchTimeout = setTimeout(async () => {
        try {
            // Encode the query to handle special characters correctly in the URL
            const response = await fetch(`/search-pokemon?q=${encodeURIComponent(query)}`);
            const data = await response.json(); // data will be an array of pokemon objects

            searchResults.innerHTML = ''; // Clear previous results

            if (data && data.length > 0) {
                data.forEach(pokemon => {
                    const li = document.createElement('li');
                    li.classList.add('list-group-item', 'search-result-item');

                    const highlightedNameHtml = highlightText(pokemon.name, query);

                    const typeBadgesHtml = pokemon.types.map(type =>
                        `<span class="type-badge type-${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</span>`
                    ).join('');

                    li.innerHTML = `
                        <a href="/pokemon/${pokemon.name.toLowerCase()}" class="d-flex align-items-center text-decoration-none text-dark w-100">
                            <img src="${pokemon.image}" alt="${pokemon.name}" class="pokemon-image-mini search-result-image me-2">
                            <span class="pokemon-name-suggestion">${highlightedNameHtml}</span>
                            <div class="ms-auto">${typeBadgesHtml}</div>
                        </a>
                    `;
                    searchResults.appendChild(li);
                });
                searchResults.style.display = 'block'; // Show results list
            } else {
                searchResults.style.display = 'none'; // Hide results if no matches
                searchResults.innerHTML = ''; // Ensure it's empty
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            searchResults.style.display = 'none'; // Hide results on error
            searchResults.innerHTML = ''; // Ensure it's empty
        }
    }, 200);
});

// Clear search input and hide results when clicking on the 'X' area
searchInputGroup.addEventListener('click', (event) => {
    // Check if the click happened on the ::after pseudo-element's area
    // This is a workaround since pseudo-elements don't directly emit events.
    // We check if the click is within the general area where the 'X' is.
    const rect = pokemonSearchInput.getBoundingClientRect();
    const xClickPosition = event.clientX;
    const yClickPosition = event.clientY;

    // Define the 'X' click area (adjust these values based on your padding and right positioning)
    const clearAreaLeft = rect.right - 50; // Input right edge minus padding
    const clearAreaRight = rect.right;
    const clearAreaTop = rect.top;
    const clearAreaBottom = rect.bottom;

    if (xClickPosition >= clearAreaLeft && xClickPosition <= clearAreaRight &&
        yClickPosition >= clearAreaTop && yClickPosition <= clearAreaBottom &&
        searchInputGroup.classList.contains('has-content')) { // Only clear if 'X' is visible
        pokemonSearchInput.value = '';
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        searchInputGroup.classList.remove('has-content'); // Hide 'X'
        clearTimeout(searchTimeout);
    }
});


// Hide search results when clicking outside the input/results area
document.addEventListener('click', (event) => {
    // Check if the click is outside both the input group and the results list
    if (!searchInputGroup.contains(event.target) && !searchResults.contains(event.target)) {
        searchResults.style.display = 'none';
    }
});