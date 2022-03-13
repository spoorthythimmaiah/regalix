import React, { Component } from 'react'
import Name from './Name/Name';
import Tagging from './Tagging/Tagging';
import './PitchPopup.css';
import RelatedContent from './RelatedContent/RelatedContent';

class PitchPopup extends Component {

    constructor(props) {
        super(props)
        const {restricted_to_groups, description, tags, thumbnail, title, related_content} = this.props.selectedPitch
        this.state = {
            activeTab: 'name',
            selectedPitch: {
                thumbnail,
                description,
                tags,
                title,
                related_content,
                restricted_to_groups
            },
        }
    }

    close() {
        if(this.props.pitchStatus != '') {
            return;
        }
        this.props.close()
    }

    updatedNameHandler(data) {
        const {restricted_to_groups, description, thumbnail, title} = data;
        let selectedPitch = {...this.state.selectedPitch}
        selectedPitch.restricted_to_groups = restricted_to_groups
        selectedPitch.description = description
        selectedPitch.thumbnail = thumbnail
        selectedPitch.title = title
        this.setState({
            selectedPitch,
        }, () => this.moveTo('tagging'))
    }

    updateTagging(tags, moveToNext) {
        let selectedPitch = {...this.state.selectedPitch}
        selectedPitch.tags = tags
        this.setState({
            selectedPitch
        }, () => {
            if(moveToNext) {
                this.moveTo('related_content')
            }
        });
    }

    updateRelatedContent(ids, content) {
        let selectedPitch = {...this.state.selectedPitch}
        selectedPitch.chapter_ids = ids
        selectedPitch.related_content = content
        this.setState({
            selectedPitch
        })
    }

    sendPitchDetails() {
        if(this.props.pitchStatus != '') {
            return;
        }
        this.props.updateSelectedPitchState(this.state.selectedPitch)
    }

    moveTo(activeTab) {
        if(this.props.pitchStatus != '') {
            return;
        }
        this.setState({
            activeTab
        })
    }
    
    render() {
        let {restricted_to_groups, description, tags, thumbnail, title, related_content} = this.state.selectedPitch
        let screen = null;
        if (this.state.activeTab == 'name') {
            screen = <Name 
                        title={title}
                        description={description}
                        thumbnail={thumbnail}
                        groups={this.props.groups}
                        restricted_to_groups={restricted_to_groups}
                        update={(data) => this.updatedNameHandler(data)} />
        } else if (this.state.activeTab == 'tagging') {
            screen = <Tagging 
                        tags={tags}
                        update={(tags,callback) => this.updateTagging(tags, callback)}
                        moveTo={(name) => this.moveTo(name)}
                    />
        } else if (this.state.activeTab == 'related_content') {
            screen = <RelatedContent
                        pitchStatus={this.props.pitchStatus}
                        moveTo={(name) => this.moveTo(name)}
                        sendPitchDetails={() => this.sendPitchDetails()}
                        restrictedToGroups={restricted_to_groups}
                        relatedContent={related_content}
                        updateRelatedContent={(data, content) => this.updateRelatedContent(data, content)}
                    />
        }

        return (
            <div className="popup">
                <div className="close-popup" onClick={() => this.close()}></div>
                <div className="popup-container">
                    <h4>{this.props.selectedPitch.uuid ? 'Edit' : 'Create New'} Pitch</h4>
                    <ul className="tabs">
                        <li className={this.state.activeTab == 'name' ? 'active' : ''}>Name</li>
                        <li className={this.state.activeTab == 'tagging' ? 'active' : ''}>Tagging</li>
                        <li className={this.state.activeTab == 'related_content' ? 'active' : ''}>Related Content</li>
                    </ul>
                    <div className="tab-container">
                        {screen}
                    </div>
                </div>
            </div>
        )
    }
}

export default PitchPopup
