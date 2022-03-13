import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const IntervalFilters = (props) => {
    return(
        <>
            <div className="interval-dd">
                <div className="interval" onClick={props.toggleFilter}>{props.intervalName}</div>
                <ul className={`dd-menu ${props.isIntervalOptionVisible? 'active':''}`} id="metrics" tabIndex="0">
                    <li data-interval="today" data-intervalname="today" onClick={props.selectFilter}>today</li>
                    <li data-interval="yesterday" data-intervalname="yesterday" onClick={props.selectFilter}>yesterday</li>
                    <li data-interval="week" data-intervalname="Last 7 Days" onClick={props.selectFilter}>1 week</li>
                    <li data-interval="month" data-intervalname="Last 30 days" onClick={props.selectFilter}>30 days</li>
                    <li data-interval="quarter" data-intervalname="Last 3 months" onClick={props.selectFilter}>3 months</li>
                    <li data-interval="half" data-intervalname="Last 6 months" onClick={props.selectFilter}>6 months</li>
                    <li data-interval="year" data-intervalname="Last 12 months" onClick={props.selectFilter}>12 months</li>
                    <li data-interval="custom" data-intervalname="Custom Days" onClick={props.selectFilter}>Custom</li>
                </ul>
            </div>
            { props.isCustomDate &&
                <div className="custome-dropdown">
                    <div className="row">
                        <div className="col-sm-6 col-xs-12 custome-date">
                            <div className="dashboard-sub-title">From</div>
                            <DatePicker 
                                selected={props.startDate}
                                onChange={props.handleFromDateChange}
                            />
                        </div>
                        <div className="col-sm-6 col-xs-12 custome-date">
                            <div className="dashboard-sub-title">To</div>
                            <DatePicker 
                                selected={props.endDate}
                                onChange={props.handleToDateChange}
                            />
                        </div>
                    </div>
                </div>
            }                
        </>
    )
}

export default IntervalFilters