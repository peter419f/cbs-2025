# Applikation på Droplet

Vi starter med at lave git clone på et repository med Vejr appen fra sidste uge.

Projektet er tilgængeligt på GitHub: https://github.com/mwndigi/cbs-2025

```
mkdir mikkel 

cd mikkel

git clone https://github.com/mwndigi/cbs-2025.git

ls

cd cbs-2025

ls

cd 2

ls

cd 1-vejr-app

pwd

npm install

pm2 start ./bin/www --name vejr-app
```

# Vejr appen på /vejr

Tilgå IP adressen for din Droplet for endpointet /vejr for at se om appen er online.

# Statiske filer

Statiske filer er placeret i public-mappen og gøres tilgængelige via app.js med følgende linje:

```javascript
app.use(express.static('public'));
```

For Vejr appen er det specifikt:

```
app.use('/vejr', express.static(path.join(__dirname, 'public')));
```

Dette betyder, at alle filer i `public`-mappen kan tilgås direkte fra browseren.

I route for index.js sendes filen index.html for endpoint /

```javascript
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
```

I index.html i public-mappen henvises der til statiske filer for CSS, javascript og billeder.

```html
<!DOCTYPE html>
<html lang="da">

<head>
  <meta charset="UTF-8">
  <title>Vejr App</title>
  <link rel="icon" type="image/png" href="/vejr/images/favicon.png">
  <link rel="stylesheet" href="/vejr/stylesheets/style.css">
</head>

<body>

  <a href="/vejr">
    <h1>Vejrdata</h1>
  </a>
  <img src="/vejr/images/logo.png" alt="Vejr icon" width="120px">

  <br />
  <br />
  <br />

  <input type="text" id="city" placeholder="Indtast bynavn" value="Copenhagen">
  <button id="getWeather">Hent vejr</button>
  <div id="weatherResult"></div>

  <br />

  <input type="text" id="cities" placeholder="Byer kommasepareret" value="Copenhagen,Aarhus,Odense">
  <button id="getWeathers">Hent vejr for flere byer</button>
  <div id="weathersResult"></div>

  <script src="/vejr/javascripts/weather.js"></script>

</body>

</html>
```

# Logging

Når en PM2-proces er startet for en applikation, kan man følge med i logs og eventuelt fejlsøge med:

```
pm2 logs
```


