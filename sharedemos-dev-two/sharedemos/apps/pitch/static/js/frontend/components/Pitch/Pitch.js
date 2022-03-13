import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../Edit/Header/Header";
import Section from "./Section";
import EditSection from "../Edit/EditSection/EditSection";
import axios from 'axios';
import Info_html from "./Info_html";


class Pitch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			uuid: this.props.match.params.uuid,
			version: null,
			sections: [],
			relatedContent: null,
			tags: [],
			thumbnail: '',
			activeSectionIndex: 0,
			isLoading: true,
			canEdit: Boolean(document.canEdit),
			activeInfoPage: true
		}
	}

	componentDidMount() {
		this.getPitch()
	}

	getPitch(activeSectionIndex = this.state.activeSectionIndex) {
		this.setState({
			isLoading: true
		})
		let author = this.state.canEdit ? '?author=1' : '';
		axios.get(`/api/pitch/${this.state.uuid}${author}`)
		.then(response => {
			let { title, description, version, sections, thumbnail, tags, related_content } = response.data;
			this.setState({
				title,
				description,
				version,
				thumbnail,
				tags,
				sections,
				relatedContent: related_content,
				activeSectionIndex,
				isLoading: false
			});
		})
		.catch(function (response) {
			console.log(response);
		});
	}

	toggleInfoPage() {
		this.setState({
			activeInfoPage: !this.state.activeInfoPage
		})
	}

	render() {
		const header = (this.state.canEdit) ?
						<Header
							pitch_uuid={this.state.uuid}
							getPitch={() => this.getPitch()}
						/> :
						''
		const section = (this.state.canEdit) ?
							<EditSection 
								getPitch={() => this.getPitch()}
								sections={this.state.sections}
								pitch_uuid={this.state.uuid}
							/> :
							(this.state.activeInfoPage) ?
								<Info_html
									title={this.state.title}
									description={this.state.description}
									uuid={this.state.uuid}
									version={this.state.version}
									thumbnail={this.state.thumbnail}
									tags={this.state.tags}
									sections={this.state.sections}
									relatedContent={this.state.relatedContent}
									toggleInfoPage={() => this.toggleInfoPage()}
								/> :
								<Section
									sections={this.state.sections}
									version={this.state.version}
									activeSectionIndex={this.state.activeSectionIndex}
									getPitch={(activeSectionIndex) => this.getPitch(activeSectionIndex)}
									toggleInfoPage={() => this.toggleInfoPage()}
									pitchuuid={this.state.uuid}
								/>
		return (
			<div className="pitch-section">
				{header}
				<div className="pitch-container">
					{
						(!this.state.isLoading) ? section : <div className="loading-data"></div>
					}
				</div>
			</div>
		);
	}
}

export default Pitch;