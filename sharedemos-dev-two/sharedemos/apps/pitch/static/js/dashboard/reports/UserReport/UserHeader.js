import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

function UserHeader(props) {
    let profilePic = props.profilePic ? props.profilePic : '/static/images/pitch/icon-user.png' ;
    return (
        <section className="report-header-wrap">
            <div className="header-breadcrumb">
                <Link to="/">all pitches</Link>&gt;&nbsp;
                <Link to={`/${props.uuid}`}>{props.pitchName}</Link>&gt;&nbsp;
                <span>{props.name}</span>
            </div>
            <div className="header-info-wrap">
                <div className="header-info ">
                    <div className="user-icon" >
                        <img src={profilePic} alt=""/>
                    </div>
                    <div className="user-info">
                        <div className="name">{props.name}</div>
                        <div>
                            <span className={`${props.proficiency} proficiency`}>{props.proficiency}</span><span>{Moment(props.date).format('YYYY-MM-DD')} Created</span>
                        </div>
                    </div>                            
                </div>
            </div>
        </section>
    );
}

export default UserHeader;