const express = require('express');
require('dotenv').config();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const app = express();

app.use(express.static('dist'));
app.get('/api/news', (req, res) => {
	let qs = req.query.q;
	newsapi.v2
		.topHeadlines({
			q: qs,
			country: 'gb',
		})
		.then((response) => {
			res.send(response);
		});
});

app.listen(process.env.PORT || 8082, () => console.log(`Listening on port ${process.env.PORT || 8082}!`));
