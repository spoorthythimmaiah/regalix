import React from "react";
import './tile.css'
// import Initial from "../Initial/Initial";


const tile = (props) => {
	const tiles = props.allPitch.map((pitch, index) => {
		const splitDate = pitch.created_at.split(' ');
		const createdDate = `${splitDate[2]}, ${splitDate[1]} ${splitDate[3]}`;
		let status = (pitch.is_published) ? "published" : "unpublished";
		const cover_path = pitch.thumbnail ? 
							pitch.thumbnail.url :
							'/static/images/pitch/cover-thumbnail.png'  
		return (
			<div className="tile" key={pitch.uuid}>
				<div className="tile-wrapper">
					<div className="action">
						<span className="dot"></span>
						<span className="dot"></span>
						<span className="dot"></span>
						<ul className="action-list">
							<li className="publish" onClick={() => props.publish(index)}>publish</li>
							<li className="edit" onClick={() => props.edit(index)}>edit</li>
							<li className="delete" onClick={() => props.delete(index)}>delete</li>
						</ul>
					</div>
					<div className="thumbnail-container">
						<img className="thumbnail" src={cover_path} alt={pitch.title} />
					</div>
					<div className="details">
						<div className="truncate-flex-child">
							<h4 className="truncate-text" title={pitch.title}>{pitch.title}</h4>
							<p className="created">Created on {createdDate}</p>
						</div>
						<div>
							{/* <Initial charCount={2} height={25} width={25} fontSize={10} fontWeight={600} authors={pitch.authors} /> */}
							<p className={status}>{status}</p>
						</div>
					</div>
				<a href={`/edit/pitch/${pitch.uuid}`} className="start-editing">add sections</a>
				</div>
			</div>
		)
	})
	return (
		<div className="tiles">
			{tiles}
		</div>
	);

};

export default tile;