const getDeparturesFrom = require('./index').getDeparturesFrom;

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use('/', express.static(__dirname + '/'));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/flinders-st-southern-cross/:station_id', async (req, res) => {
	const departures = await getRoutesBetweenFlindersStreetAndSouthernCross(req.params.station_id);
	res.send(departures);
});

app.get('/next-trains/:station_id/:route/:direction', async (req, res) => {
	const departures = await getDeparturesFrom(req.params.station_id, req.params.route, req.params.direction);
	res.send(departures);
});

console.log('current time', (new Date()).toLocaleString());
app.listen(port, () => console.log(`Plaforms listening on port ${port}!`));