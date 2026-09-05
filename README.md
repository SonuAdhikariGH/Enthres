# Enthres — Liberty at your palm

A lightweight task manager and daily-quote companion, built with plain HTML, CSS, and JavaScript. No frameworks, no build step — just open it in a browser.

## Features

- **Task management** — add tasks with a category (Chores, Gym, Studies, Coding, Work, Bill), mark them done, edit them, or remove them.
- **Live dashboard** — ongoing, completed, and total task counts update automatically.
- **Random quotes** — fetch a random quote from a public API and save your favorites to a personal list.
- **Persistent storage** — tasks and saved quotes are stored in the browser's `localStorage`, so they're still there next time you visit.
- **Glassmorphism UI** — frosted glass panels over a soft gradient backdrop.
- **Light & dark theme** — a CSS-only toggle switch, no JavaScript required.
- **Fully responsive** — works down to small mobile screens, tablets, and desktop.

## Tech stack

- HTML5
- CSS3 (custom properties, `backdrop-filter`, `color-mix`, `:has()`)
- Vanilla JavaScript (ES modules)
- [DummyJSON Quotes API](https://dummyjson.com/docs/quotes) for random quotes
- [Manrope](https://fonts.google.com/specimen/Manrope) via Google Fonts

## Project structure

```
.
├── home.html      # Main page markup
├── app.css        # Styling — layout, theme, responsiveness
├── app.js         # App logic — tasks, quotes, localStorage
└── favicon.svg    # Site favicon
```

## Getting started

No installation or build step needed.

1. Clone the repo:
   ```bash
   git clone https://github.com/SonuAdhikariGH/enthres.git
   cd enthres
   ```
2. Open `home.html` directly in your browser, or serve the folder locally for the best experience (some browsers restrict favicons and fetch requests on `file://` URLs):
   ```bash
   npx vite
   ```
   Then visit `http://localhost:8000/home.html`.

## Browser support

Uses modern CSS features (`backdrop-filter`, `color-mix`, `:has()`) for the glass UI and theme toggle. Works best on recent versions of Chrome, Edge, Safari, and Firefox.

## Author

**Sonu Adhikari**
- GitHub: [@sanuenthres](https://github.com/sanuenthres)
- X: [@sanuenthres](https://x.com/sanuenthres)

## License

This project is open source and available under the [MIT License](LICENSE).
