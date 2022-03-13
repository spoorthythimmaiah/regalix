import React from 'react'
import './ConfirmationPopup.css'


const ConfirmationPopup = (props) => {
    let footer = null;
    if(props.confirmStatus == 'progress') {
        footer = (
            <div className="in-progress">
                {props.inProgressMessage}
            </div>
        ) 
    } else if(props.confirmStatus == 'success') {
        footer = (
            <div className="success">
                {props.successMessage}
            </div>
        )
    } else if(props.confirmStatus == 'no-content') {
        footer = (
            <div className="error">Please add at least one section to publish pitch!</div>
        )
    } else if(props.confirmStatus == 'error') {
        footer = (
            <div className="error">Oops! Something went wrong.</div>
        )
    } else {
        footer = (
            <React.Fragment>
            <span onClick={() => props.close()}>cancel</span>
                <span className="section-save" onClick={(value) => props.isConfirm(value)}>{props.confirmType}</span> 
            </React.Fragment>
        )
    }
    return (
        <div className="confirm-wrapper confirm-window">
            <div className="confirm-container">
                <h4>{props.confirmTitle}</h4>
                <div className="confirm-container-block">
                    {props.confirmMessage}
                </div>
                <div className="confirm-footer">
                    {footer}                    
                </div>
            </div>
        </div>
    )
}

export default ConfirmationPopup

