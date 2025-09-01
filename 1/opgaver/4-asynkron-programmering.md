# Asynkron programmering med eksempel på Express endpoints

## 1. Tilføj et endpoint /api/weather til express-generator projektet under /routes/index.js

Der findes enkelte gratis vejr-API'er, som ikke kræver API-nøgle, men de har ofte begrænsede data eller funktioner. Et eksempel er [wttr.in](https://wttr.in), som kan tilgås direkte via HTTP og returnerer vejrdata i forskellige formater.

Her er et Express endpoint, der henter vejrdata fra wttr.in uden API-nøgle:

```javascript
router.get('/api/weather', async (req, res) => {
    const city = req.query.city || 'Copenhagen';
    const url = `https://wttr.in/${city}?format=j1`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Kunne ikke hente vejrdata');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Kunne ikke hente vejrdata' });
    }
});
```

## 2. Tilføj client-side kode til /public/index.html

Her er et eksempel på HTML og JavaScript, der kalder Express endpointet og viser vejret for en valgt by, samt logger start- og sluttid for kaldet:

```javascript
<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="UTF-8">
    <title>Vejrdata fra wttr.in</title>
</head>
<body>
    <h1>Vejrdata</h1>
    <input type="text" id="city" placeholder="Indtast bynavn" value="Copenhagen">
    <button id="getWeather">Hent vejr</button>
    <div id="weatherResult"></div>

    <script>
        document.getElementById('getWeather').addEventListener('click', async () => {
            const city = document.getElementById('city').value;
            const start = new Date();
            console.log('Client start:', start.toISOString());

            const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
            const data = await res.json();

            const end = new Date();
            console.log('Client slut:', end.toISOString());
            console.log('Client tid (ms):', end - start);

            const current = data.current_condition[0];
            document.getElementById('weatherResult').innerHTML = `
                <p><strong>Temperatur:</strong> ${current.temp_C} °C</p>
                <p><strong>Vejr:</strong> ${current.weatherDesc[0].value}</p>
                <p><strong>Vind:</strong> ${current.windspeedKmph} km/t</p>
            `;
        });
    </script>
</body>
</html>
```

## 3. Lav logning af svartid for API'en på server-side

Tilføj logning af start- og sluttid i Express endpointet for at måle hvor lang tid det tager at hente data fra wttr.in:

```javascript
router.get('/api/weather', async (req, res) => {
    const city = req.query.city || 'Copenhagen';
    const url = `https://wttr.in/${city}?format=j1`;

    const start = new Date();
    console.log('Server start:', start.toISOString());

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Kunne ikke hente vejrdata');
        const data = await response.json();

        const end = new Date();
        console.log('Server slut:', end.toISOString());
        console.log('Server tid (ms):', end - start);

        res.json(data);
    } catch (error) {
        const end = new Date();
        console.log('Server slut (fejl):', end.toISOString());
        console.log('Server tid (ms):', end - start);

        res.status(500).json({ error: 'Kunne ikke hente vejrdata' });
    }
});
```

Nu logges både start- og sluttid på både client og server, så du kan se hvor lang tid det tager at få svar.

## 4. Andre måder at fremhæve asynkron programmering

Ud over logning af start- og sluttid kan vi se asynkron programmering på flere måder:

- **Brug af loading-indikatorer:** Vis en spinner eller besked på websiden, mens data hentes, og fjern den når svaret kommer. Det viser at brugergrænsefladen ikke fryser under ventetiden.
- **Parallelt kald:** Hent data fra flere API'er samtidigt med `Promise.all` og vis hvordan svarene kommer uafhængigt af hinanden.
- **Fejlhåndtering:** Demonstrér hvordan fejl håndteres asynkront, fx ved at vise en fejlbesked hvis API'et ikke svarer.
- **Opdatering af UI undervejs:** Opdater dele af brugergrænsefladen løbende, fx ved at vise delvise resultater eller statusopdateringer.
- **Timeouts og afbrydelse:** Implementér timeout eller mulighed for at afbryde et kald, hvilket viser kontrol over asynkrone processer.

Disse metoder gør det tydeligt for brugeren og udvikleren, at programmet arbejder asynkront og ikke blokerer hovedtråden.

## 5. Tilføj et endpoint med Promises som henter vejrdata for flere byer med Promise.all

Her er et Express endpoint, der henter vejrdata for flere byer parallelt med `Promise.all`:

```javascript
router.get('/api/weathers', async (req, res) => {
    const cities = req.query.cities ? req.query.cities.split(',') : ['Copenhagen', 'Aarhus', 'Odense'];
    const urls = cities.map(city => `https://wttr.in/${city}?format=j1`);

    const start = new Date();
    console.log('Server start:', start.toISOString());

    try {
        const fetches = urls.map(url => fetch(url).then(r => r.json()));
        const results = await Promise.all(fetches);

        const end = new Date();
        console.log('Server slut:', end.toISOString());
        console.log('Server tid (ms):', end - start);

        res.json(cities.map((city, i) => ({
            city,
            weather: results[i].current_condition[0]
        })));
    } catch (error) {
        res.status(500).json({ error: 'Kunne ikke hente vejrdata for alle byer' });
    }
});
```

## 6. Tilføj client-side kode for det nye endpoint 

Eksempel på client-side kode, der henter og viser vejrdata for flere byer:

```javascript
<input type="text" id="cities" placeholder="Byer kommasepareret" value="Copenhagen,Aarhus,Odense">
<button id="getWeathers">Hent vejr for flere byer</button>
<div id="weathersResult"></div>

<script>
document.getElementById('getWeathers').addEventListener('click', async () => {
    const cities = document.getElementById('cities').value;
    const start = new Date();
    console.log('Client start:', start.toISOString());

    const res = await fetch(`/api/weathers?cities=${encodeURIComponent(cities)}`);
    const data = await res.json();

    const end = new Date();
    console.log('Client slut:', end.toISOString());
    console.log('Client tid (ms):', end - start);

    document.getElementById('weathersResult').innerHTML = data.map(item => `
        <h3>${item.city}</h3>
        <p><strong>Temperatur:</strong> ${item.weather.temp_C} °C</p>
        <p><strong>Vejr:</strong> ${item.weather.weatherDesc[0].value}</p>
        <p><strong>Vind:</strong> ${item.weather.windspeedKmph} km/t</p>
    `).join('');
});
</script>
```

Med `Promise.all` hentes alle byers vejrdata parallelt, og svaret kommer når alle er færdige.