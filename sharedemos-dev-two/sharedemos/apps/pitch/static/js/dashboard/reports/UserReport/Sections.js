import React from 'react';

function Sections(props) {
    let sections = props.sectionsData.map((section, i) => {
        return (
            <div className="section-details" key={`section${i}`}>
                <h1>{section.name} <span>{`${section.user_score.toFixed(1)} out of ${section.base_score}`}</span></h1>
                <h3>{section.description}</h3>
                <div className="video-details">
                    <div data-url={section.recording} className="video-link" onClick={props.playSectionVideo}>play submission</div>
                </div>
                <div className="score-wrap">
                    <div className="score">
                        clarity of speech: {section.scores.clarity_of_speech.toFixed(2)}%
                    </div>
                    <div className="score">
                        coverage of topics: {section.scores.coverage_of_topics.toFixed(2)}%
                    </div>
                    <div className="score">
                        similarity of base pitch: {section.scores.similarity_of_base_pitch.toFixed(2)}%
                    </div>
                    <div className="score">
                        duration of speech: {section.scores.duration_of_pitch.toFixed(2)}%
                    </div>
                </div>
            </div>
        )
    })

    return (
        <section className="user-section-wrap">
            {sections}
        </section>
    );
}

export default Sections;