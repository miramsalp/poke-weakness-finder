# Poké Weakness Finder

## Project Goal

**Poké Weakness Finder** is a web application designed to help Pokémon trainers and enthusiasts quickly and easily identify the type weaknesses and resistances of any Pokémon. As a Pokémon player myself, I often found it cumbersome to constantly search online for type effectiveness charts during battles. This project aims to centralize that information, making it a quick and accessible resource to strategize and pick the best Pokémon and moves for any encounter.

## Features

* **Comprehensive Pokémon Data:** Access detailed information for a vast array of Pokémon.
* **Type Weakness/Resistance Calculation:** Instantly see what types are super effective or not very effective against a given Pokémon.
* **Search Functionality:** Easily find Pokémon by name.
* **User-Friendly Interface:** A clean and intuitive design for a smooth Browse experience.
* **Responsive Design:** Optimized for use on various devices, from desktops to mobile phones.

## How to Use

### On the Live Application (if deployed)

1.  **Visit the Website:** Go to [Your Deployed Application URL Here (e.g., `https://pokeweaknessfinder.onrender.com`)].
2.  **Search for a Pokémon:** On the homepage, use the search bar to enter a Pokémon's name (e.g., "Pikachu", "Charizard").
3.  **View Details:** Click on a search result to navigate to the Pokémon's detail page.
4.  **Discover Weaknesses:** The detail page will clearly display its type(s) and a breakdown of what types it's weak against, resists, or is immune to.

### In Your Pokémon Battles

* **Before a Battle:** Quickly look up your opponent's Pokémon to understand its weaknesses and choose your attacking Pokémon and moves strategically.
* **During Gameplay:** If you're unsure about a certain type matchup, use the app to get a quick overview and make informed decisions.

## How to Set Up and Run the Code Locally

To run this project on your local machine, follow these steps:

### Prerequisites

Make sure you have the following installed:

* **Node.js:** (LTS version recommended) You can download it from [nodejs.org](https://nodejs.org/).
* **npm** (Node Package Manager): Comes bundled with Node.js.

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/miramsalp/poke-weakness-finder.git
    cd poke-weakness-finder
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```
    This will install all the necessary packages listed in `package.json`, including `express`, `ejs`, `axios`, etc.

### Running the Application

1.  **Start the Server:**
    ```bash
    node server.js
    # Or, if you have nodemon installed (recommended for development):
    # nodemon server.js
    ```
    You should see a message in your terminal indicating that the server is running (e.g., "Server is running on port 3000").

2.  **Access the Application:**
    Open your web browser and navigate to:
    ```
    http://localhost:3000
    ```

## Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is open-source and distributed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.