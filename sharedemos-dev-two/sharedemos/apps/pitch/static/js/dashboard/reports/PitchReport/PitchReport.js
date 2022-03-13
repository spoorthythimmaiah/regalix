import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Moment from 'moment'
import axios from '../../containers/common/AxiosConfig/axios'
import IntervalFilters from './../Common/IntervalFilters'
import VersionFilter from './../Common/VersionFilter'
import ReportCards from './ReportCards'
import PerformanceCards from './PerformanceCards'
import UserList from './UserList'
import './style.css'

class PitchReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: this.props.match.params.uuid,
            pitchData: {},
            dataLoaded: false,
            interval: 'week',
            intervalName: 'Last 7 Days',
            isIntervalOptionVisible: false,
            isCustomDate: false,
            isVersionOptionVisible: false,
            startDate: new Date(),
            endDate: new Date()
        }
        this.toggleFilter = this.toggleFilter.bind(this);
        this.selectFilter = this.selectFilter.bind(this);
        this.toggleVersionFilter = this.toggleVersionFilter.bind(this);
        this.selectVersionFilter = this.selectVersionFilter.bind(this);
        this.handleFromDateChange = this.handleFromDateChange.bind(this);
        this.handleToDateChange = this.handleToDateChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount(){
        this.getPitchDetails();
    }

    getPitchDetails(){        
        let url = `/api/pitch-activity/${this.state.uuid}`;
        let dateFormat = 'YYYY-MM-DD';
        let params = {};
        if(this.state.isCustomDate){
            params = {
                from_date: Moment(this.state.startDate).format(dateFormat),
                to_date: Moment(this.state.endDate).format(dateFormat)
            }
        } else {
            params = {
                metrics: this.state.interval
            }
        }
        
        if(this.state.pitchData.version) url =  `${url}/${this.state.pitchData.version.current}`;

        axios.get(url, {params})
        .then(response => {
            this.setState({
                dataLoaded: true,
                pitchData: response.data
            })
        })
        .catch(function (response) {
            console.log(response);
        });
    }

    // toggle interval option selector
    toggleFilter(){
        this.setState({
            isIntervalOptionVisible: !this.state.isIntervalOptionVisible
        });
    }

    // select interval option
    selectFilter(event){
        let {interval, intervalname: intervalName} =  event.currentTarget.dataset;
        let isIntervalOptionVisible = false;
        let isCustomDate = (interval === 'custom');
        this.setState({
            interval,
            intervalName,
            isCustomDate,
            isIntervalOptionVisible
        }, () => this.getPitchDetails());
    }

    toggleVersionFilter(){
        this.setState({
            isVersionOptionVisible: !this.state.isVersionOptionVisible
        });
    }

    selectVersionFilter(event){
        let pitchData = {...this.state.pitchData}
        pitchData.version = event.currentTarget.dataset;
        let isVersionOptionVisible = false;
        this.setState({
            pitchData,
            isVersionOptionVisible
        }, () => this.getPitchDetails());
    }

    handleFromDateChange(startDate){
        this.setState({
          startDate
        }, () => this.getPitchDetails());
      };

    handleToDateChange(endDate){
        this.setState({
            endDate
        }, () => this.getPitchDetails());
    };
    
    handlePageChange(pageNumber){
        let pitchData = {...this.state.pitchData}
        pitchData.participants.pages.current = pageNumber;
        this.setState({
            pitchData
        }, () => this.getPitchDetails())
    }

    render() {
        let metrics = this.state.isCustomDate ? `&from_date=${ Moment(this.state.startDate).format('YYYY-MM-DD')}&to_date=${Moment(this.state.endDate).format('YYYY-MM-DD')}` : `&metrics=${this.state.interval}`;
        return this.state.dataLoaded ? (
            <div className="container-wrapper">
                <section className="report-header-wrap">
                    <div className="header-breadcrumb">
                        <Link to="/">all pitches</Link>&gt;&nbsp;
                        <span>{this.state.pitchData.title}</span>
                    </div>
                    <div className="header-info-wrap">
                        <div className="header-info">
                        {this.state.pitchData.title} <span>{Moment(this.state.pitchData.created_at).format('MMM DD YYYY')} Created</span>
                        </div>

                        <VersionFilter 
                            version = {this.state.pitchData.version}
                            isVersionOptionVisible = {this.state.isVersionOptionVisible}
                            toggleVersionFilter = {this.toggleVersionFilter}
                            selectVersionFilter = {this.selectVersionFilter}             
                        />

                        <IntervalFilters 
                            interval = {this.state.interval}
                            intervalName = {this.state.intervalName}
                            isIntervalOptionVisible = {this.state.isIntervalOptionVisible}
                            isCustomDate = {this.state.isCustomDate}
                            startDate = {this.state.startDate}
                            endDate = {this.state.endDate}
                            toggleFilter = {this.toggleFilter}  
                            selectFilter = {this.selectFilter}
                            handleFromDateChange = {this.handleFromDateChange}    
                            handleToDateChange =  {this.handleToDateChange}
                        />
                    </div>
                </section>

                <ReportCards
                    participants = {{
                        'total': this.state.pitchData.participants.total,
                        'growth': this.state.pitchData.growth.participants
                    }}
                    average = {{
                        'average_score': this.state.pitchData.average_score,
                        'growth': this.state.pitchData.growth.average_score
                    }}
                    top_performer = {this.state.pitchData.top_performer}
                    lowest_performer = {this.state.pitchData.lowest_performer}                    
                />

                <PerformanceCards 
                    most_passed_section = {this.state.pitchData.most_passed_section}
                    most_failed_section = {this.state.pitchData.most_failed_section}
                />

                <UserList
                    uuid = {this.state.uuid}
                    version = {this.state.pitchData.version.current}
                    sectionsHeaders = {this.state.pitchData.sections_header}
                    UserList = {this.state.pitchData.participants.users}
                    metrics = {metrics}
                />
            </div>
        ):(
            <div className='loading'>Loading...</div>
        )
    }
}


export default PitchReport;
