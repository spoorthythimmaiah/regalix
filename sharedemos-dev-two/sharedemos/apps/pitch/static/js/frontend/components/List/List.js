import React, { Component } from "react";
import Tile from "./Tile";
import axios from 'axios';


class List extends Component {

	constructor() {
		super();
		this.state = {
			list: [],
			isLoading: true
		}
	}

	componentDidMount() {
		this.getAllPitch()
	}

	getAllPitch() {
		this.setState({
			isLoading: true
		})
		axios.get('/api/pitch')
        .then(response => {
            this.setState({
                isLoading: false,
                list: response.data.pitches
            })
        })
        .catch(function (response) {
            console.log(response);
        });
	}

	render() {
		return (
			<div className="container">
				<a className="go-back" href='/apps'>
					<img src="/static/images/pitch/nav-arrow.png" />
				</a>
				<div className="logo">
					<img title="logo" src={document.logo} />
				</div>
				<div className="pitchs-wrapper">
					<h1>All Pitches ({this.state.list.length})</h1>
					{
						this.state.isLoading ? (
							<div className="loading-data"></div>
						) : (
							<div className="all-pitch row">
								<Tile list={this.state.list} />
							</div>	
						)
					}
				</div>
			</div>
		);
	}
}

export default List;