import React, { useState, useEffect } from 'react'

function News() {
	const [news, setNews] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [country, setCountry] = useState('us')
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetch(
					`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=7ae9d0a4fac04cf690fceb8ea1df564f`
				)
				const data = await result.json()
				setNews(data.articles.slice(0, 12))
				setLoading(false)
			} catch (error) {
				setError(true)
			}
		}
		fetchData()
	}, [country])
	const handleCountryChange = (e) => {
		setCountry(e.target.value)
	}
	console.log(country, news)
	return (
		<div>
			<select onChange={(e)=>handleCountryChange(e)}>
				<option value="us">Select a country</option>
				<option value="us">United States</option>
				<option value="in">india</option>
				<option value="AU">Australia</option>
				<option value="nz">New Zealand</option>
			</select>
			{loading && <div>Loading...</div>}
			{error && <div>Something went wrong</div>}
			
				<div class="container">
					<div className="row">
					{news.map((item) => (
						<div className="card col-4 inline">
							<img className="card-img-top" src={item.urlToImage} alt="Card cap" />
							<div className="card-body">
								<h5 className="card-title">{item.source.name}</h5>
								<p className="card-text">
									{item.description}
								</p>
								{/* <a href={item.url} className="btn btn-primary" /> */}
							</div>
						</div>
					))}
					</div>
				</div>
			
		</div>
	)
}

export default News
