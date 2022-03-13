import React, { Component } from 'react'
import './AddSection.css';


class AddSection extends Component {
    constructor(props) {
        super(props)
    }
    addSection() {
        this.props.add()
    }
    render() {
        return (
            <div className="add-section" onClick={() => this.addSection()}>
                <p><span>+</span><br/>add section</p>
            </div>
        )
    }
}

export default AddSection

