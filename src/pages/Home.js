import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
	const [bookmarks, setBookmarks] = useState([]);
	//useEffect( ()=>{}, []): remember this structure so you don't mess up the brackets
	const [newBookmark, setNewBookmark] = useState({
		name: '',
		url: ''
	});

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/bookmarks');
				const data = await response.json();
				setBookmarks(data);
			} catch (error) {
				console.error(error);
			}
		})(); //what did this last () do?
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/api/bookmarks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newBookmark)
			});
			const data = await response.json();
			setBookmarks([...bookmarks, data]); //this means adding 'data' to end of bookmark array?
			setNewBookmark({
				name: '',
				url: ''
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async e => {
		try {
			const response = await fetch(`/api/bookmarks/${props.match.params.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const deletedbookmark = await response.json();
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/home');
		}
	};

	const handleChange = e => {
		setNewBookmark({ ...newBookmark, [e.target.id]: e.target.value });
	};

	//do we even need a show page? I mean I guess if we want to update it like that, but I think that seems clunky. Like why would we show a bookmark?

	//this will return all the bookmarks.
	return (
		<div className="HomePage">
			<div className="container">
				<form onSubmit={handleSubmit} className="row">
					<input
						type="text"
						id="name"
						className="col-sm"
						placeholder="Make it memorable"
						onChange={handleChange}
					/>
					<input
						type="text"
						id="url"
						className="col-sm"
						placeholder="Please Include HTTPS"
						onChange={handleChange}
					/>
					<button className="col-sm btn btn-primary" type="submit" value="Add">
						<span className="btn-label">
							<i className="bi bi-save"></i>
						</span>
					</button>
				</form>

				<ul className="card">
					{bookmarks.map(bookmark => {
						return (
							<li className="col" key={bookmark._id}>
								<h1 className="row" href={bookmark.url}>
									{' '}
									{bookmark.name} {''}
								</h1>

								<div className="w-10">
									<a className="rw" href={bookmark.url}>
										<button type="button" className="btn btn-primary">
											<span className="stop-event">
												<i className="bi bi-arrow-right  align-self-center"></i>
											</span>
										</button>
									</a>
									<Link className="r" to={`/${bookmark._id}`}>
										<button type="button" className="btn btn-primary">
											<span className="t">
												<i className="bi bi-pencil align-self-center"></i>
											</span>
										</button>
									</Link>
								</div>

								<button onClick={handleDelete} className="row-2 btn btn-danger">
									Forget!
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
