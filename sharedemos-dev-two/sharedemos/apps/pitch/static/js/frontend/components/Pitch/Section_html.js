import React, { Fragment } from 'react';
import SectionList_html from './SectionList_html';
import CountDown from './CountDown';
import { Link } from 'react-router-dom';

const Section_html = (props) => {
    let section, start, started, stopped, submitting, finished, stopRecording, submitPitch, recordingOptionsEle, timer = null;
    let {recordingStatus, activeSectionIndex, sections, sectionsLength, activeSection, hasCompletedCount, recordingOptions, recordingType} = props
    let recordedPitch = activeSection.recording_resource && activeSection.recording_resource.url;
    if (recordingStatus != 'submitting' && recordingStatus != 'finished') {
        section = (
            <div className="section">
                <h3>{activeSection.title}</h3>
                <p>{activeSection.description}</p>
            </div>
        )
    }

    if(recordingOptions) {
        recordingOptionsEle = (
                            <div className="recording-options">
                                <p className="close-recording-options" onClick={() => props.resetRecordingTypeOptions()}>
                                    <img src="/static/images/icon_close.png" />
                                </p>
                                <ul>
                                    <li className={recordingType.includes('camera') ? 'active' : ''} onClick={(option) => props.chooseRecordingType('camera')} title="Camera">
                                        <img src="/static/images/pitch/camera.svg" />
                                    </li>
                                    <li className={recordingType.includes('screen') ? 'active' : ''} onClick={(option) => props.chooseRecordingType('screen')} title="Screen Sharing">
                                        <img src="/static/images/pitch/screen_share.svg" />
                                    </li>
                                </ul>
                                <div className="start-record-btn" onClick={() => props.startRecordingHandler()}>
                                    <strong>start recording</strong>
                                </div>
                                <p className="description">*Once the recording type is chosen, it can't be changed in the middle of recording</p>
                            </div>
                        )
    }
    if ((recordedPitch && recordingStatus == 'pending') || (recordingStatus == 'started' || recordingStatus == 'stopped')) {
        if(recordingStatus == 'started') {
            stopRecording = (<div id="btn-stop-recording">Stop Recording</div>)
            if(activeSection.time_limit) {
                timer = <CountDown
                            minutes={activeSection.time_limit}
                        />    
            }
        }
        started = (
            <div className={`video-wrapper ${!recordingOptions ? '' : 'hidden'}`}>
                {timer}
                <video controls
                    playsInline className="fullWidth" id="recorded-pitch"
                    src={recordedPitch}></video>
                {stopRecording}
            </div>
        )
    }
    if ((!recordedPitch && recordingStatus == 'pending') && !recordingOptions) {
        const timeLimit = activeSection.time_limit ?
                            <p id='r-limit'>{activeSection.time_limit} Minutes RECORDING LIMIT</p>
                            :
                            null
        start = (
            <div id="start-record" className="start-record">
                <div className="head-par">
                    <h5>record your pitch</h5>
                    {timeLimit}
                </div>
                <div className="start-record-btn" onClick={() => props.resetRecordingTypeOptions(recordingOptions=true)}>
                    <img src="/static/images/pitch/record.png" alt="video-recorder-icon" />
                    <strong>record pitch</strong>
                </div>
            </div>
        )
    }
    if ((recordedPitch && recordingStatus == 'pending') || recordingStatus == 'stopped') {
        if(recordingStatus == 'stopped') {
            submitPitch = (
                <div className={`submit-wrapper ${!recordingOptions ? '' : 'hidden'}`}>
                    <div className="submit" onClick={() => props.submitPitch()}>
                        <strong>Submit and {( hasCompletedCount == sectionsLength -1 && !activeSection.has_completed ? " FINISH" : " Continue")}</strong>
                    </div>
                </div>
            )
        }
        stopped = (
            <div>
                <div className={`details-wrapper ${!recordingOptions ? '' : 'hidden'}`}>
                    <div className="time-wrapper">
                        <span>Pitch Recorded</span>
                        <span className="recorded-time">
                            {activeSection.time_limit > 0 ? `${activeSection.time_limit} Minutes` : ''}
                        </span>
                    </div>
                    <div className="retake-pitch" onClick={() => props.resetRecordingTypeOptions(recordingOptions=true)}>
                        <strong>Retake Pitch</strong>
                    </div>
                </div>
                {submitPitch}
            </div>
        )
    }
    if (recordingStatus == 'submitting') {
        submitting = (
            <div className="submitting-wrapper">
                <h3>Uploading and Submitting your Answer...</h3>
                <div className="spinner-wrapper">
                    <div className="cssload-bell">
                        <div className="cssload-circle">
                            <div className="cssload-inner"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if (recordingStatus == 'finished') {
        finished = (
            <div className="finished-wrapper">
                <div className="top-bg"></div>
                <div className="finish-msg">
                    <h2>Your pitch was successfully submitted</h2>
                    <p>Thank you for your time. Your recordings were successfully uploaded and submitted. Someone will review and
                    score your recordings within 48 hours.</p>
                    <Link to={'/pitch/'} className="btn">Return Home</Link>
                </div>
                <div className="bottom-bg"></div>
                <img className="horse-icon" src="/static/images/pitch/horse.png" />
            </div>
        )
    }
    return (
        <Fragment>
            <div className={`sections-wrapper container-fluid ${(recordingStatus == 'finished' || recordingStatus == 'submitting' ? 'hidden' : '')}`}>
                <SectionList_html
                    activeSectionIndex={activeSectionIndex}
                    sections={sections}
                    moveToSection={(moveTo) => props.moveToSection(moveTo)}
                />
                <div className="sections-right">
                    <div className="sections-right-container">
                        {section}
                        {recordingOptionsEle}
                        {started}
                        {start}
                        {stopped}
                    </div>
                </div>
            </div>
            <div>
                {submitting}
            </div>
            <div>
                {finished}
            </div>
        </Fragment>
    )
}

export default Section_html
