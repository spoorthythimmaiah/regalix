import React from 'react';

const VideoPopup = (props) => {
    return (
        <div className='video-popup'>
            <div className="close" onClick={props.closeSectionVideo}></div>
            <div className="video-wrap">
                <video width="800" height="450" controls>
  					<source src={props.videoURL} />
				</video>
            </div>
        </div>
    )
};

export default VideoPopup;