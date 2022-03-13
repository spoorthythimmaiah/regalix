import React from 'react';

function versionFilter(props) {
    const versions = []
    for(let i = props.version.total; i >= 1 ; i--) {
        versions.push(<li data-current={i} data-total={props.version.total}  key={i} onClick={props.selectVersionFilter}>{`version ${i}`}</li>)
    };

    return (
        <div className="interval-dd">
            <div className="interval" onClick={props.toggleVersionFilter}>{`version ${props.version.current}`}</div>
            <ul className={`dd-menu ${props.isVersionOptionVisible? 'active':''}`} id="version" tabIndex="1">
                {versions}
            </ul>
        </div>
    );
}

export default versionFilter;