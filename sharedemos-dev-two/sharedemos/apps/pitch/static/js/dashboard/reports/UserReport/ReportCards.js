import React from 'react';

const ReportCards = (props) => {
    let totalScore = 0,
        totalBaseScore = 0;
    for (let score of props.sections) {
        totalScore += score.user_score
        totalBaseScore += score.base_score
    }
    let average = (totalScore/totalBaseScore)*100;
    return (
       <>
           <section className="report-cards-wrap">
                <div className="card shadow">
                    <div className="title">
                        clarity of Speech
                    </div>
                    <div className="metric-count">
                       {props.userScore.clarity_of_speech.toFixed(2)}%
                    </div>
                </div>
                <div className="card shadow">
                    <div className="title">
                        coverage of topics
                    </div>
                    <div className="metric-count">
                        {props.userScore.coverage_of_topics.toFixed(2)}%
                    </div>
                </div>
                <div className="card shadow">
                    <div className="title">
                        the similarity of base pitch
                    </div>
                    <div className="metric-count">
                        {props.userScore.similarity_of_base_pitch.toFixed(2)}%
                    </div>
                </div>
                <div className="card shadow">
                    <div className="title">
                        duration of pitch
                    </div>
                    <div className="metric-count">
                        {props.userScore.duration_of_pitch.toFixed(2)}%
                    </div>
                </div>
                <div className="card shadow">
                    <div className="title">
                        Overall Performance Across
                    </div>
                    <div className="metric-count">
                        {average.toFixed(2)}%
                    </div>
                </div>
           </section>
       </>
    );
}

export default ReportCards;
