# Opgave 2: Brug express-generator til at oprette et projekt

Følg disse trin for at oprette et Express projekt med express-generator:

1. **Installer express-generator globalt:**
    
```bash
npm install -g express-generator
```

2. **Opret et nyt Express projekt med .gitignore og uden view templates:**
    
```bash
express 2-express-generator --git --no-view
```

3. **Gå ind i din nye projektmappe:**
    
```bash
cd 2-express-generator
```

4. **Installer projektets afhængigheder:**
    
```bash
npm install
```

5. **Start serveren:**
    
```bash
npm start
```

Nu kører din Express app, og du kan åbne [http://localhost:3000](http://localhost:3000) i din browser for at se startsiden.

Se dokumentation for [Express generator](https://expressjs.com/en/starter/generator.html).

6. **Tænk over hvad der er tilføjet i et express-generator projekt?**

- Hvad er der tilføjet i `app.js`?
    - Flere imports og konfigurationer, fx logger, parser og håndtering af fejl
    - Routing er adskilt og importeret fra mappen `routes`
    - Middleware til statiske filer og request parsing

- Hvad er formålet med mappen `routes`?
    - Indeholder filer, der definerer forskellige endpoints og logik for serverens endpoints
    - Gør det nemmere at organisere og vedligeholde routing

- Hvad er formålet med mappen `public`?
    - Indeholder statiske filer som billeder, CSS og JavaScript, der kan tilgås direkte fra browseren
    - Gør det muligt at servere frontend assets uden ekstra kode