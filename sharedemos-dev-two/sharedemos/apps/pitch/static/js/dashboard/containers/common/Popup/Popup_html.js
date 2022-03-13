import React from 'react'
import './popup.module.css'


const Popup_html = (props) => {

    return (
        <div className="popup-wrapper popup-window">
            <div className="popup-container">
                <div className="popup-container-wrapper">
                    <h4>{props.popupTitle}</h4>
                    <div className="popup-container-block">
                        {props.children}
                    </div>
                    <div className="popup-footer">
                        <span onClick={() => props.closePopup()}>cancel</span>
                        <span>{props.footerText}</span>                 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup_html

