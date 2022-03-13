import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

const UserList = (props) => {
    const sectionHeader = props.sectionsHeaders.map((section, i) => {
        return(
            <div className="section" key={`${props.uuid}${section}${i}`}>
                {`S${i+1}`}
            </div>
        )
    })

    const userList = props.UserList.map((user, i) => {
        return (
            <Link to={`/${props.uuid}/user_details?username=${user.username}&version=${props.version}${props.metrics}`} className="user-details" key={`${props.uuid}${user.user_id}`}>
                <div className="title">
                    {user.name}
                </div>
                <div className="date">
                    {Moment(user.date).format('YYYY-MM-DD')}
                </div>
                <div className="score">
                {user.user_score.toFixed(2)}/{user.total_score}
                </div>
                <div className="proficiency">
                        <span className={user.proficiency} >{user.proficiency}</span>
                </div>
               {
                    props.sectionsHeaders.map((section, i) => {
                        return user.sections[section]?(
                            user.sections[section].status === 'PENDING' ? 
                            <div className="section" key={`${i}${section}${props.uuid}`}>
                                <span className="pending"></span>
                            </div> :
                            <div className="section" key={`${i}${section}${props.uuid}`}>
                                <span className={`${ (parseInt(user.sections[section]['user_score'])/parseInt(user.sections[section]['base_score'])*100) >= 35 ? 'pass' : 'fail'}`}></span>
                            </div>
                        ):(
                            <div className="section" key={`${i}${section}${props.uuid}`}>
                                <span className="not-attended"></span>
                            </div>
                        )
                    })
               } 
            </Link>
        )
    })
    
    return (
        <section className='userlist-main-wrap shadow'>
            <h1>Pitch Participant Table</h1>
            <div className="userlist-wrap">
                <div className="user-details header">
                    <div className="title">
                        title
                    </div>
                    <div className="date">
                        date
                    </div>
                    <div className="score">
                        total score
                    </div>
                    <div className="proficiency">
                        proficiency
                    </div>
                    {sectionHeader}    
                </div>
                {userList}
                 
            </div>
        </section>
    );
};

export default UserList;
