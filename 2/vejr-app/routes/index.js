var express = require('express');
var router = express.Router();

/* GET index route */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET vejrdata for en by route */
router.get('/api/weather', async (req, res) => {
    const city = req.query.city || 'Copenhagen';
    const url = `https://wttr.in/${city}?format=j1`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Kunne ikke hente vejrdata');
        const data = await response.json();
        console.log(data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Kunne ikke hente vejrdata' });
    }
});

/* GET vejrdata for flere byer route */
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
        console.log(results)

        res.json(cities.map((city, i) => ({
            city,
            weather: results[i].current_condition[0]
        })));
    } catch (error) {
        res.status(500).json({ error: 'Kunne ikke hente vejrdata for alle byer' });
    }
});

module.exports = router;