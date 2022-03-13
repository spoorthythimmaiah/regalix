import React, { Component } from 'react'
import './SectionPopup.css'
import axios from '../../../../dashboard/containers/common/AxiosConfig/axios';
import SectionPopup_html from './SectionPopup_html';

class SectionPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.activeSection.title,
            description: this.props.activeSection.description,
            time_limit: this.props.activeSection.time_limit,
            keywords: this.props.activeSection.keywords,
            newKeyword: '',
            score: this.props.activeSection.score,
            set_time_limit: 'nolimit',
            base_pitch: this.props.activeSection.base_pitch,
            uuid: this.props.activeSection.uuid,
            inProgress: '',
            descriptionCharLimit: 500
        }
        this.updateFieldHandler = this.updateFieldHandler.bind(this);
        this.deleteKeyword = this.deleteKeyword.bind(this);
        this.updateTimeLimit = this.updateTimeLimit.bind(this);
        this.close = this.close.bind(this);
        this.updateSelectedSection = this.updateSelectedSection.bind(this);
        this.updateTimeLimit = this.updateTimeLimit.bind(this)
        this.addKeyword = this.addKeyword.bind(this);
        this.deleteBasePitch = this.deleteBasePitch.bind(this);
    }

    componentDidMount() {
        this.updateSetTime()
    }

    updateSetTime() {
        const set_time_limit = (this.state.time_limit != 0) ? 'limit' : 'nolimit'
        this.setState({
            set_time_limit
        })
    }

    updateTimeLimit(time_limit) {
        this.setState({
            time_limit
        });
    }

    updateFieldHandler(event) {
        const target = event.target;
        const name = target.name;
        let value = (target.type === 'file') ? target.files[0] : target.value;
        if(name == 'set_time_limit' && value == 'nolimit') {
            this.updateTimeLimit(0)
        }
        if(name == 'description') {
            value = value.substring(0, this.state.descriptionCharLimit);
        }
        this.setState({
            [name]: value
        }, () => {
            if(target.type == 'file') {
                this.previewBasePitch(value)
            }
        });
    }

    previewBasePitch(file) {
        let blobURL = URL.createObjectURL(file);
        document.getElementById("base-pitch").src = blobURL;
    }

    addKeyword() {
        let keywords = [...this.state.keywords]
        let {newKeyword} = this.state; 
        newKeyword.split(',').map((keyword) => {
            keyword = keyword.trim().toLocaleLowerCase()
            if(keyword && !keywords.includes(keyword)) {
                keywords.push(keyword)
            }
        });
        this.setState({
            keywords,
            newKeyword: ''
        });
    }

    deleteKeyword(event) {
        const target = event.currentTarget;
        const value = target.closest('li').getAttribute('value');
        let {keywords} = this.state;
        const indexValue = keywords.indexOf(value); 
        (indexValue > -1) ? keywords.splice(indexValue, 1) : ''
        this.setState({
            keywords
        });
    }

    deleteBasePitch() {
        this.setState({
            base_pitch: {}
        })
    }

    close() {
        this.props.close()
    }

    updateSelectedSection() {
        if(this.state.inProgress != '') {
            return;
        }
        this.setState({
            inProgress: 'progress'
        })
        if(this.state.base_pitch && this.state.base_pitch.type) {
            this.postBasePitch()
        }
        else if(this.state.uuid) {
            this.updateSection()
        } 
        else {
            this.postSection()
        }
    }

    postBasePitch() {
        let formData = new FormData();
        formData.append('resource', this.state.base_pitch)
        formData.append('resource_type', 'video')
        axios({
            method: 'post',
            url: '/api/pitch-resource?author=1',
            data: formData,
            headers: {
                'content-type': 'multipart/form-data'
            },
        })
        .then((response) => {
            if(this.state.uuid) {
                this.updateSection(response)
            } else {
                this.postSection(response)
            }
        })
        .catch(function (response) {
            console.log(response);
        });
    }

    postSection(response) {
        let {title, description, time_limit, keywords, score} = this.state
        let data = {
            title: title.trim(),
            description: description.trim(),
            time_limit,
            keywords,
            score: parseInt(score),
            pitch_uuid: this.props.pitch_uuid
        }
        if(response && response.data.resource_id) {
            data.base_pitch_id = response.data.resource_id
        }
        axios({
            method: 'POST',
            url: '/api/pitch-section?author=1',
            data: data
        })
        .then(() => {
            this.setState({
                inProgress: 'success'
            }, () => {
                setTimeout(() => {
                    this.close()
                    this.props.getPitch()
                }, 1000)
            })
        })
        .catch(function (response) {
            console.log(response);
        });
    }

    updateSection(response) {
        let {title, description, time_limit, keywords, score, uuid} = this.state
        let data = {
            title: title.trim(),
            description: description.trim(),
            time_limit,
            keywords,
            score: parseInt(score),
            pitch_uuid: this.props.pitch_uuid
        }
        if(response && response.data.resource_id) {
            data.base_pitch_id = response.data.resource_id
        } 
        else if(this.state.base_pitch && this.state.base_pitch._id) {
            data.base_pitch_id = this.state.base_pitch._id
        }
        axios({
            method: 'PUT',
            url: `/api/pitch-section/${uuid}?author=1`,
            data: data
        })
        .then(() => {
            this.setState({
                inProgress: 'success'
            }, () => {
                setTimeout(() => {
                    this.close()
                    this.props.getPitch()
                }, 1000)
            })
        })
        .catch(function (response) {
            console.log(response);
        });
    }
    
    render() {
        const {uuid, title, description, set_time_limit, time_limit, newKeyword, keywords, score, base_pitch, inProgress, descriptionCharLimit} = this.state;
        return (
            <SectionPopup_html
                uuid={uuid}
                title={title}
                description={description}
                updateFieldHandler={this.updateFieldHandler}
                set_time_limit={set_time_limit}
                time_limit={time_limit}
                updateTimeLimit={this.updateTimeLimit}
                newKeyword={newKeyword}
                keywords={keywords}
                addKeyword={this.addKeyword}
                deleteKeyword={this.deleteKeyword}
                score={score}
                base_pitch={base_pitch}
                deleteBasePitch={this.deleteBasePitch}
                inProgress={inProgress}
                descriptionCharLimit={descriptionCharLimit}
                close={this.close}
                updateSelectedSection={this.updateSelectedSection}
            />
        )
    }
}

export default SectionPopup
