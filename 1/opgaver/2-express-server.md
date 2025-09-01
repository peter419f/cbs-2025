# Opgave 1: Kom i gang med Node.js og Express

Følg nedenstående trin i terminalen:

1. **Tjek din Node.js version:**

```bash
node --version
```

2. **Opret en ny mappe til dit projekt og initialiser npm:**

Når du bliver bedt om at navngive filen, skriv `app.js` og tryk enter for at bekræfte.

Ellers tryk enter for at bekræfte og gå videre.

```bash
mkdir 1-express-server
cd 1-express-server
npm init
```

3. **Installer Express:**

```bash
npm install express
```

4. **Tjek at Express er tilføjet som dependency i `package.json`:**

Åbn `package.json` og se efter følgende under `"dependencies"`:

```json
"dependencies": {
    "express": "^5.x.x"
}
```

Hvis Express ikke er tilføjet, så prøv at køre `npm install express` igen.

5. **Opret en fil `app.js` og indsæt følgende kode for en simpel Express "Hello World" app:**


```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
res.send('Hello World!');
});

app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
});
```


6. **Start din app i Terminalen:**

```bash
node app.js
```

Nu kan du åbne [http://localhost:3000](http://localhost:3000) i din browser og se "Hello World!".

7. **Luk din app:**

Tryk `Ctrl + C` i terminalen for at stoppe serveren.

8. **Tilføj et endpoint for `/api` der returnerer JSON:**

Tilføj følgende til din `app.js`:

```javascript
app.get('/api', (req, res) => {
  res.json({ message: 'Dette er et API endpoint!' });
});
```

Genstart din app og besøg [http://localhost:3000/api](http://localhost:3000/api) for at se JSON data.

9. **Tænk over routing, request/response og JSON for Express serveren:**

- Hvordan fungerer routing med Express og hvordan bestemmer serveren hvilket svar den skal sende?
- Er det tydeligt for dig hvad et endpoint er?
- Hvad betyder "request" og "response" i denne sammenhæng?
- Hvad er JSON, og hvorfor bruges det ofte til API'er?
    
10. **Key takeaways**

- At oprette et Node.js projekt med Express
- At initialisere npm og installere eksterne pakker
- At starte og stoppe en Express server
- At forstå hvordan routing fungerer i Express og hvordan endpoints defineres
- At forstå serveren håndterer requests og sender responses
- At anvende JSON som format til API responses