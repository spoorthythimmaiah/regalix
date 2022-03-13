import React, { Component, Fragment } from 'react'
import Section_html from './Section_html';
import { screenCameraRecorder } from './screenCameraRecorder';
import { screenRecorder } from './screenRecorder';
import { cameraRecorder } from './cameraRecorder';
import axios from '../../../dashboard/containers/common/AxiosConfig/axios';


class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pitchuuid: this.props.pitchuuid,
            sections: this.props.sections,
            activeSectionIndex: this.props.activeSectionIndex,
            activeSection: {},
            hasCompletedCount: 0,
            recordedBlob: {},
            recordingStatus: 'pending', // pending, started, stopped, submitting, finished
            recordingOptions: false,
            recordingType: []
        }
    }

    componentDidMount() {
        this.getActiveSection()
    }

    getActiveSection() {
        const activeSection = this.state.sections.length && this.state.sections[this.state.activeSectionIndex];
        let hasCompletedCount = 0
        this.state.sections.map((section) => {
            section.has_completed ? hasCompletedCount++  : '';
        })
        if(activeSection) {
            this.setState({
                activeSection,
                hasCompletedCount
            }, () => {
                this.postSectionActivity()
            });
        }
    }

    postSectionActivity() {
        let {pitchuuid: pitch_uuid, version: pitch_version} = this.props
        let data = {
            uuid: this.state.activeSection.uuid,
            pitch_uuid,
            pitch_version
        }
        axios({
            method: 'POST',
            url: '/api/pitch-section-activity',
            data: data
        })
        .catch(response => console.log(response));
    }

    postSectionRecordingActivity() {
        let {pitchuuid: pitch_uuid, version: pitch_version} = this.props
        let data = {
            section_uuid: this.state.activeSection.uuid,
            pitch_uuid,
            pitch_version
        }
        axios({
            method: 'POST',
            url: '/api/pitch-recording-activity',
            data: data
        })
        .catch(response => console.log(response));
    }

    moveToSection(moveTo) {
        const activeSection = this.state.sections[moveTo];
        this.setState({
            activeSectionIndex: moveTo,
            recordedBlob: {},
            activeSection,
            recordingStatus: 'pending',
            recordingOptions: false,
            recordingType: []
        }, () => {
            this.postSectionActivity()
        })
    }

    chooseRecordingType(option) {
        let recordingType = [...this.state.recordingType];
        (recordingType.includes(option)) ? 
            recordingType = recordingType.filter(type => type != option) : 
            recordingType.push(option)
        this.setState({
            recordingType
        })
    }

    startRecordingHandler() {
        let {recordingType} = this.state 
        if(recordingType.includes('screen') && recordingType.includes('camera')) {
            screenCameraRecorder(this)
        } else if(recordingType.includes('camera')) {
            cameraRecorder(this)
        } else if(recordingType.includes('screen')) {
            screenRecorder(this)
        }
    }

    submitPitch() {
        this.postPitchResource()
    }

    postPitchResource() {
        this.setState({
            recordingStatus: 'submitting'
        });
        let resource = new File([this.state.recordedBlob], 'recordedPitch', {type: this.state.recordedBlob.type});
        let formData = new FormData();
        formData.append('resource', resource)
        formData.append('resource_type', 'video')
        formData.append('section_uuid', this.state.activeSection.uuid)
        axios({
            method: 'post',
            url: '/api/pitch-resource',
            data: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        })
        .then((response) => {
            this.PostPitchRecord(response.data.resource_id)
        })
        .catch(error => console.log(error));
    }

    PostPitchRecord(resource_id) {
        let data = {
            'pitch_version': this.props.version,
            'section_uuid': this.state.activeSection.uuid,
            'resource_id': resource_id
        }
        axios({
            method: 'post',
            url: '/api/pitch-record',
            data
        })
        .then(() => {
            this.postSectionRecordingActivity()
            if( this.state.hasCompletedCount == this.state.sections.length - 1 && 
                !this.state.activeSection.has_completed ) {
                this.setState({
                    recordingStatus: 'finished'
                });
            } else {
                let {activeSectionIndex, sections} = this.state;
                let activeIndex = (activeSectionIndex == sections.length -1) ? 0 : activeSectionIndex+1;
                this.props.getPitch(activeIndex)
            }
        })
        .catch(error => console.log(error));
    }

    updateRecordingStatus(status) {
        this.setState({
            recordingStatus: status
        });
    }

    resetRecordingTypeOptions(recordingOptions=false) {
        if(recordingOptions) {
            document.querySelector('video') && document.querySelector('video').pause()
        }
        this.setState({
            recordingType: [],
            recordingOptions
        });
    }

    render() {
        let {recordingStatus, activeSectionIndex, sections, activeSection, hasCompletedCount, recordedBlob, recordingOptions, recordingType} = this.state;
        
        return (
            <Fragment>
                <div className="logo">
                    <img title="logo" src={document.logo} />
                </div>
                <div onClick={() => this.props.toggleInfoPage()} className="go-back">
                    <img src="/static/images/pitch/nav-arrow.png" />
                </div>
                <Section_html
                    sections={sections}
                    sectionsLength={sections.length}
                    hasCompletedCount={hasCompletedCount}
                    recordingStatus={recordingStatus}
                    activeSection={activeSection}
                    activeSectionIndex={activeSectionIndex}
                    startRecordingHandler={() => this.startRecordingHandler()}
                    chooseRecordingType={(option) => this.chooseRecordingType(option)}
                    recordingType={recordingType}
                    recordedBlob={recordedBlob}
                    moveToSection={(moveTo) => this.moveToSection(moveTo)}
                    submitPitch={() => this.submitPitch()}
                    recordingOptions={recordingOptions}
                    resetRecordingTypeOptions={(option) => this.resetRecordingTypeOptions(option)}
                />
            </Fragment>
        );
    }
}

export default Section;
