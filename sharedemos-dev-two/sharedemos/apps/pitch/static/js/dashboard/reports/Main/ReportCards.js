import React from 'react';

const ReportCards = (props) => {
    return (
       <>
           <section className="report-cards-wrap">
                <div className="card shadow">
                    <h1 className="title">
                        total pitches
                    </h1>
                    <p className="metric-count">
                        {props.totalPitches}
                    </p>
                    {props.pitchGrowth &&                     
                        <p className={`metric-details ${parseInt(props.pitchGrowth) > 0 ? 'up' : 'down'}`}>
                            {props.pitchGrowth}% from last period
                        </p>
                    }
                </div>
                <div className="card shadow">
                    <h1 className="title">
                        total participants
                    </h1>
                    <p className="metric-count">
                        {props.totalParticipants}
                    </p>
                    {props.participantsGrowth &&
                        <p className={`metric-details ${parseInt(props.participantsGrowth) > 0 ? 'up' : 'down'}`}>
                            {props.participantsGrowth}% from last period
                        </p>
                    }   
                </div>
           </section>
       </>
    );
}

export default ReportCards;