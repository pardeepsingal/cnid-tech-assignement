import React, { Component } from 'react';
import './app.css';
import LazyLoad from 'react-lazyload';

async function searchNews(q) {
	q = encodeURIComponent(q);
	const response = await fetch(`/api/news?q=${q}`);
	const records = await response.json();
	return records.totalResults > 0 ? records.articles : [];
}

function App() {
	const [query, setQuery] = React.useState('');
	const [list, setList] = React.useState(null);

	const search = (e) => {
		e.preventDefault();
		searchNews(query).then(setList);
	};

	return (
		<div className="app">
			<form onSubmit={search}>
				<input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} />
				<button>Search</button>
			</form>

			{!list ? null : list.length === 0 ? (
				<p>
					<i>No results</i>
				</p>
			) : (
				<ul>
					{list.map((item, i) => (
						<LazyLoad height={200}>
							<Item key={i} item={item} />
						</LazyLoad>
					))}
				</ul>
			)}
		</div>
	);
}

function Item({ item }) {
	const separateWords = (s) => s.replace(/[A-Z][a-z]+/g, '$& ').trim();
	const formatDate = (s) => new Date(s).toLocaleDateString(undefined, { dateStyle: 'long' });

	return (
		<li className="item">
			{item.urlToImage && <img className="thumbnail" alt="" src={item.urlToImage} />}

			<h2 className="title">
				<a href={item.url}>{item.title}</a>
			</h2>

			<p className="description">{item.description}</p>

			<div className="meta">
				<span>{formatDate(item.publishedAt)}</span>
			</div>
		</li>
	);
}

export default App;
