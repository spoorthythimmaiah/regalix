import React from 'react';

const ReportCards = (props) => {
    return (
       <>
           <section className="report-cards-wrap">
                <div className="card shadow">
                    <div className="title">
                        pitch participants
                    </div>
                    <div className="metric-count">
                       {props.participants.total}
                    </div>
                    {props.participants.growth &&
                        <div className={`metric-details ${parseInt(props.participants.growth) > 0 ? 'up' : 'down'}`}>
                            {props.participants.growth.toFixed(2)}% from last period
                        </div>
                    }
                </div>
                <div className="card shadow">
                    <div className="title">
                        average score
                    </div>
                    <div className="metric-count">
                        {props.average.average_score.toFixed(2)}%
                    </div>
                    {props.average.growth && 
                        <div className={`metric-details ${parseInt(props.average.growth) > 0 ? 'up' : 'down'}`}>
                            {props.average.growth}% from last period
                        </div>
                    }
                </div>
                <div className="card shadow">
                    <div className="title">
                        top performer
                    </div>
                    <div className="metric-count">
                        {props.top_performer.name}
                    </div>
                    <div className="metric-details">
                        {props.top_performer.score.user_score.toFixed(2)}/{props.top_performer.score.total_score} score
                    </div>
                </div>
                <div className="card shadow">
                    <div className="title">
                        lowest performer
                    </div>
                    <div className="metric-count">
                        {props.lowest_performer.name}
                    </div>
                    <div className="metric-details">
                    {props.lowest_performer.score.user_score.toFixed(2)}/{props.lowest_performer.score.total_score} score
                    </div>
                </div>
           </section>
       </>
    );
}

export default ReportCards;
