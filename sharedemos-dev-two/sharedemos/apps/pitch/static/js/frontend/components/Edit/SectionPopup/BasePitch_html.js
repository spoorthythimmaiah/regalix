import React from 'react'


const BasePitch_html = (props) => {
    const video = (props.base_pitch && (props.base_pitch.url || props.base_pitch.type)) ?
                    <div className="base-pitch-wrapper">
                        <div className="base-file-name">
                            <video controls width="250" id="base-pitch">
                                <source src={props.base_pitch.url} />
                                Sorry, your browser doesn't support embedded videos.
                            </video>
                            <div>{props.base_pitch && props.base_pitch.name}</div>
                        </div>
                        <div className="delete-basepitch" onClick={props.deleteBasePitch}></div>
                    </div>
                    :
                    null
    return (
        <React.Fragment>
            {video}
        </React.Fragment>
    )
}

export default BasePitch_html
