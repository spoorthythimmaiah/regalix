import React, { Component } from 'react';
import axios from '../../containers/common/AxiosConfig/axios';
import queryString from 'query-string';

import UserHeader from './UserHeader';
import ReportCards from './ReportCards';
import Sections from './Sections';
import VideoPopup from './VideoPopup';
import './UserReport.css';

class UserReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            uuid: this.props.match.params.uuid,
            userData: {},
            isVideoPopup: false,
            videoURL: ''
        }

        this.playSectionVideo = this.playSectionVideo.bind(this);
        this.closeSectionVideo  = this.closeSectionVideo.bind(this);
    }

    componentDidMount() {
        this.getUserDetails();
    }

    getUserDetails() {
        let {username, version, metrics, from_date, to_date} = queryString.parse(this.props.location.search);
        let url = `/api/pitch-user-activity/${this.state.uuid}/${username}/${version}`;
        let params = {};
        if(metrics){
            params = {
                metrics: metrics
            }
        } else {
            params = {
                from_date: from_date,
                to_date: to_date
            }
        }
        axios.get(url, params)
        .then(response => {
            this.setState({
                dataLoaded: true,
                userData: response.data
            })
        })
        .catch(function (response) {
            console.log(response);
        });
    }

    playSectionVideo(event){
        let videoURL  = event.currentTarget.dataset.url;
        this.setState({
            isVideoPopup: true,
            videoURL
        })
    }

    closeSectionVideo(){
        this.setState({
            isVideoPopup: false,
            videoUrl: ''
        })
    }

    render() {
        return this.state.dataLoaded ? (
            <div className="container-wrapper user-report">
                <UserHeader 
                    pitchName = {this.state.userData.pitch_name}
                    uuid = {this.state.uuid}
                    profilePic = {this.state.userData.profile_pic} 
                    proficiency = {this.state.userData.proficiency}
                    date = {this.state.userData.date}
                    name = {this.state.userData.name}
                />

                <ReportCards
                    sections = {this.state.userData.sections}
                    userScore = {this.state.userData.scores}
                />

                <Sections 
                    sectionsData = {this.state.userData.sections}
                    playSectionVideo = {this.playSectionVideo}
                />

                {this.state.isVideoPopup && 
                    <VideoPopup 
                        videoURL = {this.state.videoURL}
                        closeSectionVideo = {this.closeSectionVideo}
                    />
                }                
            </div>
        ):(
            <div className='loading'>Loading...</div>
        )
    }
}

export default UserReport;