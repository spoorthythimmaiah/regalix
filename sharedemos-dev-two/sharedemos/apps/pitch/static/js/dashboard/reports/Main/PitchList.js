import React from 'react'
import Moment from 'moment'
import { Link } from 'react-router-dom';

const PitchList = (props) => {
    const pitchList = props.pitcheslist.map((pitch, i) => {
        return(
            <Link to={`/${pitch.uuid}`} className="pitch-details" key={pitch.uuid}>
                <div>{pitch.title}</div>
                <div>{Moment(pitch.created_at).format('YYYY-MM-DD')}</div>
                <div>{pitch.sections}</div>
                <div>{pitch.participants.length}</div>
            </Link>
        )
    })
    return(
        <>
            <section className="pitch-list shadow">
                <h3>list of pitches</h3>
                <div className="pitch-list-wrap">
                    <div className="pitch-details header">
                        <div>title</div>
                        <div>created on</div>
                        <div># of sections</div>
                        <div>participants</div>
                    </div>    
                    {pitchList}              
                </div>
            </section>
        </>
    )
}
export default PitchList
