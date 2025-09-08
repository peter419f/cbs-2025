# Projekt app på Droplet

Opret et projekt med express-generator på din computer, push og commit til et repository på GitHub og clone dit eget projekt til din Droplet på DigitalOcean og start appen med pm2. Sørg for at dit projekt kører på localhost:3000 og tilgå din IP adresse for din Droplet for at se om appen er oppe og køre.

# Anbefalet tilgang

1. Du har et repository på GitHub med dine mapper og filer for dette fag, for eksempel "cbs-2025" eller "dis-2025" og du åbner denne mappe i Visual Studio Code gennem GitHub Desktop

2. I Visual Studio Code åbner du Terminalen for mappen og opretter et projekt med express-generator (se Øvelse 1)

```bash
express min-app --git --no-view
```

3. Lav commit og push af din app til GitHub

4. Åben Terminalen for din Droplet og lav git clone af dit repositorie

5. Brug cd-kommandoen ind i mappen, for eksempel:

```
cd cbs-2025/min-app
```

6. Installer afhængigheder

```
npm install
```

7. Start appen med pm2

Din nye app kører på localhost:3000 (kig i /bin/www) og din rute for '/' i Nginx peger på localhost:3000

```
pm2 start ./bin/www --name min-app
```

8. Tilgå din app i webbrowser på IP adressen

