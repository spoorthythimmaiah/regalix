import React, { Component } from 'react'
import './Header.css'
import ConfirmationPopup from '../../../../dashboard/containers/common/ConfirmationPopup/ConfirmationPopup'
import axios from '../../../../dashboard/containers/common/AxiosConfig/axios'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            publishConfirmationPopup: false,
            confirmStatus: ''
        }
    }

    publishConfirmationPopup() {
        this.setState({
            publishConfirmationPopup: !this.state.publishConfirmationPopup
        })
    }

    publishPitch() {
        this.setState({
            confirmStatus: 'progress'
        })
        axios({
            method: 'PATCH',
            url: `/api/pitch/${this.props.pitch_uuid}?author=1`
        })
        .then(() => {
            this.setState({
                confirmStatus: 'success'
            }, () => {
                setTimeout(() => {
                    this.setState({
                        publishConfirmationPopup: false,
                        confirmStatus: ''
                    })
                    this.props.getPitch()
                }, 1000)
            })
        })
        .catch(response => this.showError(response.response));
    }

    showError(response) {
        let {status, data} = response
        let errorType = '';
        errorType = (status == 500 && data.message == 'NO_CONTENT') ? 'no-content' : 'error';
        this.setState({
            confirmStatus: errorType
        }, () => {
            setTimeout(() => {
                this.setState({
                    confirmStatus: ''
                })
                this.publishConfirmationPopup()
            }, 4000)
        })
    }
    
    render() {
        let publishConfirmationPopup = (this.state.publishConfirmationPopup) ?
                                        <ConfirmationPopup
                                            confirmType="Publish"
                                            confirmTitle="Publish Pitch"
                                            confirmMessage="Are you sure you want to publish this Pitch?"
                                            inProgressMessage="Publishing..."
                                            confirmStatus={this.state.confirmStatus}
                                            successMessage="Published"
                                            isConfirm={() => this.publishPitch()}
                                            close={() => this.publishConfirmationPopup()}
                                        /> :
                                        null

        return (
            <React.Fragment>
                <div className="edit-mode-header">
                    <a className="redirect" href="/dashboard/pitch">Cancel</a>
                    <span className="title">editing mode</span>
                    <span className="publish" onClick={() => this.publishConfirmationPopup()}>publish</span>
                </div>
                {publishConfirmationPopup}
            </React.Fragment>
        )
    }
}

export default Header
