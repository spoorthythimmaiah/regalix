import React from 'react'

const SectionList_html = props => {

    const list = props.sections.map(({title, has_completed}, i) => {
        let active = props.activeSectionIndex == i ? 'active' : '';
        let completed = has_completed ? 'completed' : '';
        return (
            <li key={i} className={`${active} ${completed}`}>
                <span>{i+1}</span>
                <h5 onClick={(moveTo) => props.moveToSection(i)}>{title}</h5>
            </li>
        )
    });

    return (
        <div className="sections-list-wrapper">
            <div className="sections-list-container">
                <h4>Sections</h4>
                <ul className="sections-list">
                    {list}
                </ul>
            </div>
        </div>
    )
}

export default SectionList_html
