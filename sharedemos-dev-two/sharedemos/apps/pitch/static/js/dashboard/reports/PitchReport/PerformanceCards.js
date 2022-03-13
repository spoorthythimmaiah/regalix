import React from 'react';

const PerformanceCards = (props) => {
    return (
        <section className='performance-wrap'>
            <div className='card'>
                <div className="shadow section-card">
                    <h1>Most Passed Section</h1>
                    <h2>{props.most_passed_section}</h2>
                </div>
                <div className="shadow section-card">
                    <h1>Most Failed Section</h1>
                    <h2>{props.most_failed_section}</h2>
                </div>
            </div>
        </section>
    );
};

export default PerformanceCards;