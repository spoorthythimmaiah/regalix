import React, { Component } from 'react'
import ConfirmationPopup from '../../../../dashboard/containers/common/ConfirmationPopup/ConfirmationPopup';
import './Section.css'
import axios from '../../../../dashboard/containers/common/AxiosConfig/axios';


class Section extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deleteConfirmationPopup: false,
            confirmStatus: '',
        }
    }

    atPosition(length, index) {
        const postions = [];
        for (let i = 0; i < length; i++) {
            let active = (i == index ? "active-bar" : null);
            postions.push(<li key={i} className={active}></li>)
        }
        return postions;
    }

    deleteConfirmationPopup() {
        this.setState({
            deleteConfirmationPopup: !this.state.deleteConfirmationPopup
        })
    }

    deleteSection() {
        this.setState({
            confirmStatus: 'progress'
        })
        axios({
            method: 'DELETE',
            url: `/api/pitch-section/${this.props.section.uuid}?author=1`
        })
        .then(() => {
            this.setState({
                confirmStatus: 'success'
            }, () => {
                setTimeout(() => {
                    this.setState({
                        deleteConfirmationPopup: false,
                        confirmStatus: ''
                    })
                    this.props.getPitch()
                }, 1000)
            })
        })
        .catch(function (response) {
            console.log(response);
        });
    }
    
    render() {

        let deleteConfirmationPopup = (this.state.deleteConfirmationPopup) ?
                                        <ConfirmationPopup
                                            confirmType="Delete"
                                            confirmTitle="Delete Section"
                                            confirmMessage="Are you sure you want to delete this Section?"
                                            inProgressMessage="Deleting..."
                                            confirmStatus={this.state.confirmStatus}
                                            successMessage="Deleted"
                                            isConfirm={() => this.deleteSection()}
                                            close={() => this.deleteConfirmationPopup()}
                                        /> :
                                        null
        const timeLimit = this.props.section.time_limit > 0 ?
                            <p id='r-limit'>{this.props.section.time_limit} MINUTES RECORDING LIMIT</p>
                            :
                            null

        return (
            <React.Fragment>
                <div>
                    <div className="count">
                        <p className="count-wrapper">Section {this.props.activeIndex + 1} of {this.props.totalLength}</p>
                        <ul className="position-bar">
                            {this.atPosition(this.props.totalLength, this.props.activeIndex)}
                        </ul>
                    </div>
                    <div className="section">
                        <h3>{this.props.section.title}</h3>
                        <p>{this.props.section.description}</p>
                        <div className="action">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <ul className="action-list">
                                <li className="edit" onClick={() => this.props.edit()}>edit</li>
                                <li className="delete" onClick={() => this.deleteConfirmationPopup()}>delete</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="start-record" className="start-record">
                    <div className="head-par">
                        <h5>record your pitch</h5>
                        {timeLimit}
                    </div>
                </div>
                <div className="navigation">
                    <span className={`prev ${this.props.activeIndex == 0 ? 'inactive' : ''}`} onClick={() => this.props.moveTo('prev')}></span>
                    <span className={`next ${this.props.totalLength == this.props.activeIndex+1 ? 'inactive' : ''}`} onClick={(nav) => this.props.moveTo('next')}></span>
                </div>
                {deleteConfirmationPopup}
            </React.Fragment>
        )
    }
}

export default Section

