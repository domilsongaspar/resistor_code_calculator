# Resistor Code Calculator

<div align="center">
    <img alt="Resistor Code Calculator" src="img/rcc.png" />
</div>

A small web tool that helps you calculate resistor values from the standard 4-band color code. Select the band colors and the app shows the resistor value and tolerance instantly.

## Features

- Interactive color-based resistor calculator
- Supports all bands resistor color codes
- Shows calculated resistance value and tolerance
- Works entirely in the browser with no backend required

## Usage

1. Open `index.html` in your browser.
2. Choose colors for each band.
3. Read the resulting resistor value displayed by the app.

## Project structure

- `index.html` — main web page for the calculator
- `css/style.css` — styling for the user interface
- `js/app.js` — JavaScript logic for calculating resistor values
- `img/` — optional image assets used by the app

## How to run

Open `index.html` directly in a browser, or serve the folder using a static file server if preferred.

### Optional: run with a local server

If you have Python installed:

```bash
cd resistor_code_calculator
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## License

This project is open source. See `LICENSE` for details.
