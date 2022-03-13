import React from "react";
import { Link } from "react-router-dom";
import './Tile.css';
import Tags from "./Tags";


const Tile = (props) => {
	return props.list.map((pitch) => {
		const thumbnail = (pitch.thumbnail) ?
							pitch.thumbnail.url							
							:
							'/static/images/pitch/default-icon.png';

		return (
			<Link to={`/pitch/${pitch.uuid}`} key={pitch.uuid} className="col-xs-12 col-md-6">
				<div className="tile tile-container">
					<figure className="banner">
						<img src={thumbnail} />
					</figure>
					<div className="tile-info">
						<Tags tags={pitch.tags} />
						<h4 className="title" title={pitch.title}>{pitch.title}</h4>
						<p className="description" title={pitch.description}>{pitch.description}</p>
						<p className="sections-count">Sections: {pitch.sections_count}</p>
					</div>
					<p className="take-pitch"></p>
				</div>
			</Link>
		)
	})
};

export default Tile;