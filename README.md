<p align="center">
  <a href="http://dev.app.kodebi.de">
    <img src="src/static/kodebi_logo_classic.svg" width="250">
  </a>
</p>
<h1 align="center">
  Kodebi Web App
</h1>

### Anleitung Docker (or "How to get started via `docker-compose`")

siehe [README.md](https://github.com/chrizzlekicks/ms-wt-20-06-BuecherBoerse) im root folder

### Anleitung lokal (or "How to get started locally")

Um die Web App lokal zum Laufen zu bekommen müssen einige Schritte im Vorfeld befolgt werden. Zuerst sollte das Repository ordnungsgemäß im Zielordner Deiner Wahl geklont werden. Diese App wird ohne `create-react-app`, sondern mit einer benutzerdefinierten Konfiguration von React, Babel und Webpack gebootstrapped. Für weitere Inforamtionen s. `webpack.config.js` sowie die jeweiligen `.babelrc`, `.eslintrc.json` und `postcss.config.js`-Dateien.

1.  **Pakete installieren.**

Navigiere in den Ordner, in welchem sich das geklonte Repository befindet und installiere alle notwendigen Pakete.

```shell
cd path/to/clonedRepo/client
npm install
```

2.  **Entwicklungsumgebung starten.**

Sobald alle Pakete installiert sind, starte vorher die Datenbank und das Backend (s. Readme.md vom Backend). Sollten Datenbank und Backend zuverlässig laufen, starte das Frontend:

```shell
cd path/to/clonedRepo/client
npm start
```

3.  **Öffne den Source Code und leg los!**

Das Projekt sollte lokal im Browser unter der folgenden URL aufgerufen werden können: `http://localhost:3000`! Durch die Webpack-Configuration sollte sich der Browser von selbst starten.