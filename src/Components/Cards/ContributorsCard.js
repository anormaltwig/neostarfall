import React, { useState, useEffect } from 'react';
export default function ContributorsCard(props)
{
	const [contributorsData, setContributorsData] = useState([]);

	async function fetchData() 
	{
		const res = await fetch("https://api.github.com/repos/neostarfall/neostarfall/contributors?per_page=51");
		if (!res.ok) return setContributorsData([]);
		res
			.json()
			.then(res => setContributorsData(res))
	}

	useEffect(() => {
		fetchData();
	}, []);

	if(contributorsData.length < 1)
	{
		return (
			<div className="page page-contributors">
				Couldn't load contributors..
			</div>
		)
	}

	let contributors = contributorsData.filter(x => x.login != "web-flow").map(x => (
		<li key = {x.id}>
			<a href = {x.html_url}>
				<img className = "avatar" src={x.avatar_url+"&s=24"} alt={x.login} />
			</a>
			<span className = "name">
				{x.login}
			</span>
			<span className="text">
				&nbsp;made <span className="contributions">{x.contributions}</span> contributions
			</span>
		</li>
	));

	return (
		<React.Fragment>
			<h1>List of awesome people that contributed to StarfallEx:</h1>
			<ul>
				{contributors}
			</ul>

			<span>Thanks!</span>
		</React.Fragment>
	)
}