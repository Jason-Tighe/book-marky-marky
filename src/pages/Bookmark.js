import React, { useState, useEffect, useRef } from 'react';
export default function Show(props) {
	const [bookmark, setBookmark] = useState({});
	const nameInput = useRef(null); //similar to doc.querySelector('query')
	const urlInput = useRef(null);

	const handleUpdate = async e => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/bookmarks/${props.match.params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: nameInput.current.value,
					url: urlInput.current.value
				})
			});
			const data = await response.json();
			setBookmark(data);
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/home');
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/bookmarks/${props.match.params.id}`);
				const data = await response.json();
				setBookmark(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

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

	return (
		<div className="ShowPage">
			{Object.keys(bookmark).length ? (
				<>
					<button onClick={handleDelete} className="btn btn-danger">
						Forget!
					</button>
				</>
			) : (
				<h1> wait for me!</h1>
			)}
			<form onSubmit={handleUpdate} className="input-group mb-3">
				<label className="input-group-text">
					Name:
					<input
						type="text"
						className="form-control"
						ref={nameInput}
						defaultValue={bookmark.name}
					/>
				</label>
				<label className="input-group-text">
					{' '}
					Url:{' '}
					<input
						type="text"
						className="form-control"
						ref={urlInput}
						defaultValue={bookmark.url}
					/>
				</label>{' '}
				<input type="submit" value="Update URL" className="btn btn-primary" />
			</form>
		</div>
	);
}
