

---

# Whiteout Interactive Map (Lite)

## Description

The **Lite version** of Whiteout Interactive Map runs entirely in the browser with no backend dependencies.
Data such as **users**, **guilds**, and **buildings** are stored in the browser’s `localStorage`.
This makes it easy to run, share, and test the map without needing Node.js, Express, or MongoDB.


## Access

The Lite version is publicly accessible at:  
[https://whiteout-planner.krozac.fr](https://whiteout-planner.krozac.fr)

---

## Installation

No server setup required!

### Steps

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd whiteout-interactive-map-lite
   ```

2. **Install Dependencies**

   Install the required npm packages (for the React/Three.js front-end):

   ```bash
   npm install
   ```

3. **Run the Application**

   Start the development server:

   ```bash
   npm run dev
   ```

   By default, the app will be accessible at `http://localhost:5173` (if using Vite).

---

## Usage

* Open the app in your browser.
* Interact with the **map**, place **buildings**, manage **guilds** and **users**.
* All data is saved locally in your browser (`localStorage`).
* You can **export** and **import** your data as a single file to back up or share your map state.

---

## Dependencies

* `react` / `react-dom` – Front-end framework.
* `three.js` – 3D rendering for the interactive map.
* React state hooks – For managing app state.
* Other utilities for UI and state handling.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

---

## License

This project is licensed under the ISC License. See the LICENSE file for details.

---

## Author

Krozac

---

