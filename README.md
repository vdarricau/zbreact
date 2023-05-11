# Zbra React

SPA of Zbra, where you can send Zbras to your Zbros.

Uses [Vite 4](https://vitejs.dev/), [Chakra UI](https://chakra-ui.com/), laravel echo/pusher (websocket), react auth kit

## Run in local

```bash
npm install
```

```bash
npn run dev
```

Access http://localhost:5173/

You need to run the API on `localhost:8000` and the websocket server on `localhost:6001`.

### Build

To build the app in the `dist/` folder:

```bash
npm build
```

To preview what has been built

```bash
npm preview
```
