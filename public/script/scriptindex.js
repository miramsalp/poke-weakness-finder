const pokemonSearchInput = document.getElementById('pokemonSearchInput');
const searchResults = document.getElementById('searchResults');
const clearSearchButton = document.getElementById('clearSearchButton');
let searchTimeout;

function highlightText(text, query) {
    if (!query) return text;

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();

    const startIndex = lowerText.indexOf(lowerQuery);

    if (startIndex === -1) {
        return text;
    }

    const matchedPart = text.substring(startIndex, startIndex + query.length);
    const highlightedMatch = `<span class="highlight-first">${matchedPart}</span>`;

    const result = text.substring(0, startIndex) + highlightedMatch + text.substring(startIndex + query.length);

    return result;
}

pokemonSearchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    const query = pokemonSearchInput.value.trim();

    if (query.length > 0) {
        clearSearchButton.classList.remove('d-none');
    } else {
        clearSearchButton.classList.add('d-none');
        searchResults.style.display = 'none'; // Hide results if input is empty
        searchResults.innerHTML = '';
        return;
    }

    // Minimum char input to show query
    if (query.length < 1) {
        searchResults.style.display = 'none';
        searchResults.innerHTML = '';
        return;
    }

    searchTimeout = setTimeout(async () => {
        try {
            const response = await fetch(`/search-pokemon?q=${query}`);
            const data = await response.json(); // data will be an array of pokemon objects

            searchResults.innerHTML = ''; // Clear previous results
            if (data.length > 0) {
                data.forEach(pokemon => {
                    const li = document.createElement('li');
                    // Highlight the name using the custom function
                    const highlightedNameHtml = highlightText(pokemon.name, query);

                    li.innerHTML = `
                                <img src="${pokemon.image}" alt="${pokemon.name}" class="pokemon-image-mini">
                                <span class="pokemon-name-suggestion">${highlightedNameHtml}</span>
                                ${pokemon.types.map(type => `<span class="type-badge type-${type}">${type}</span>`).join('')}
                            `;
                    li.addEventListener('click', () => {
                        // Redirect to the detail page
                        window.location.href = `/pokemon/${pokemon.name.toLowerCase()}`;
                    });
                    searchResults.appendChild(li);
                });
                searchResults.style.display = 'block';
            } else {
                searchResults.style.display = 'none';
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            searchResults.style.display = 'none';
        }
    }, 100);
});

// Clear search input and hide results
clearSearchButton.addEventListener('click', () => {
    pokemonSearchInput.value = '';
    searchResults.innerHTML = '';
    searchResults.style.display = 'none';
    clearSearchButton.classList.add('d-none');
});