import React, { Component } from 'react'
import Moment from 'moment'

import axios from '../../containers/common/AxiosConfig/axios'
import IntervalFilters from '../Common/IntervalFilters'
import PitchList from './PitchList'
import ReportCards from './ReportCards'

class overview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total_pitches: '',
            total_participants:'',
            pitches_list: [],
            growth: {},
            dataLoaded: false,
            interval: 'week',
            intervalName: 'Last 7 Days',
            isIntervalOptionVisible: false,
            isCustomDate: false,
            startDate: new Date(),
            endDate: new Date()        
        }

        this.toggleFilter = this.toggleFilter.bind(this);
        this.selectFilter = this.selectFilter.bind(this);
        this.handleFromDateChange = this.handleFromDateChange.bind(this);
        this.handleToDateChange = this.handleToDateChange.bind(this);
    }

    componentDidMount() {
        this.getReport()
    }

    getReport(){
        let url = '/api/pitch-activity';
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
        
        axios.get(url, {params})
        .then(response => {
            this.setState({
                dataLoaded: true, 
                ...response.data
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
        let isCustomDate  = (interval === 'custom');
        this.setState({
            interval,
            intervalName,
            isCustomDate,
            isIntervalOptionVisible
        }, () => this.getReport())
    }

    handleFromDateChange(startDate){
        this.setState({
          startDate
        }, () => this.getReport())
      };

    handleToDateChange(endDate){
        this.setState({
            endDate
        }, () => this.getReport())
    };
    
    render() {
        return this.state.dataLoaded ? (
            <>
                <div className="container-wrapper">
                    <section className="report-filters shadow">
                        <div>
                            <div className="filter-title">Metrics for:</div>
                        </div>
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
                    </section>
                   
                    <ReportCards 
                        totalPitches = {this.state.total_pitches}
                        pitchGrowth = {this.state.growth.pitch}
                        totalParticipants = {this.state.total_participants}
                        participantsGrowth = {this.state.growth.participants}

                    />

                    <PitchList 
                        pitcheslist = {this.state.pitches_list}
                    />
                </div>
            </>
        ):(
            <div className='loading'>Loading...</div>
        )
    }
}

export default overview;
