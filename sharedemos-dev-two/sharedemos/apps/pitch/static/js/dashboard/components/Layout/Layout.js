import React from 'react'
import ToolBar from '../Toolbar/Toolbar'


const layout = (props) => {
    return (
        <React.Fragment>
            <ToolBar />
            <div className="main-wrapper">
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default layout;
