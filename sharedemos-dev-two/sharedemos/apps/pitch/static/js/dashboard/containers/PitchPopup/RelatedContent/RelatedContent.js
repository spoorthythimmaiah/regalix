import React, { useState } from 'react'
import Popup_html from '../../common/Popup/Popup_html';
import SiteMap from '../../common/SiteMap/SiteMap';
import RelatedContent_html from './RelatedContent_html';

const RelatedContent = (props) => {

    let [popupVisibility, setPopupVisibility] = useState(false)
    let [relatedContent, setRelatedContent] = useState(props.relatedContent)
    
    let status = 'Create Pitch';
    if(props.pitchStatus == 'progress') {
        status = 'Submitting...';
    } else if(props.pitchStatus == 'success') {
        status = 'Success'
    }
    

    async function getRestrictedToGroupIds() {
        let restrictedToGroupIds = [];
        props.restrictedToGroups.map(group => {
            restrictedToGroupIds.push(parseInt(group._id));
        });
        return restrictedToGroupIds
    };

    const updateRelatedContent = (ids, content) => {
        setRelatedContent(content)
        props.updateRelatedContent(ids, content)
        setPopupVisibility(false)
    }

    const removeSelectedAsset = (id) => {
        const ids = []
        const updatedRelatedContent = relatedContent.filter(content => {
            if(content.id != id) {
                ids.push(content.id)
                return content;
            }
        });
        updateRelatedContent(ids, updatedRelatedContent)
    }

    let popup = (popupVisibility) ?
                    <Popup_html
                        popupTitle='Choose Chapters To Add'
                        closePopup={() => setPopupVisibility(false)}
                        footerText='choose'
                    >
                        <SiteMap
                            restrictedToGroupIds={() => getRestrictedToGroupIds()}
                            related_content={relatedContent}
                            updateRelatedContent={(ids, content) => updateRelatedContent(ids, content)}
                        />
                    </Popup_html> :
                    null

    return (
        <React.Fragment>
            <div className="form-group">
                <label htmlFor="title">choose chapters</label>
                <div className="sub-title">Select the chapters from your library that you would like to add to this Pitch.</div>
                <label className="browse-btn browse-library" onClick={() => setPopupVisibility(true)}>browse your library</label>
                {relatedContent && relatedContent.length ? <RelatedContent_html removeSelectedAsset={(id) => removeSelectedAsset(id)} relatedContent={relatedContent}  /> : null }
            </div>
            
            <div className="navigation">
                <span className="prev" onClick={() => props.moveTo('tagging')}></span>
                <label className={`ctbtn createBtn${props.pitchStatus}`}  onClick={() => props.sendPitchDetails()}>{status}</label>
            </div>
            {popup}
        </React.Fragment>
    )
}

export default RelatedContent
