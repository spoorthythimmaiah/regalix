import React, { Component } from 'react'
import Welcome from '../../components/Welcome/Welcome';
import Tile from '../../components/Tile/Tile';
import PitchPopup from '../PitchPopup/PitchPopup';
import ConfirmationPopup from '../common/ConfirmationPopup/ConfirmationPopup'
import axios from '../common/AxiosConfig/axios';

class Home extends Component {

    constructor() {
        super()
        this.state = {
            list: [],
            groups: [],
            popup: false,
            selectedPitch: {},
            dataLoaded: false,
            deleteConfirmationPopup: false,
            deletePitchIndex: null,
            publishConfirmationPopup: false,
            publishPitchIndex: null,
            confirmStatus: '',
            pitchStatus: ''
        }
    }

    componentDidMount() {
        this.getPitchList()
        this.setDefaultSelectedPitch()
    }

    editPitchHandler(index) {
        this.showPopup();
        let selectedPitch = {...this.state.list[index]}
        if(this.state.groups.length) { 
            let isDefault = this.state.groups.filter((group) => {
                return group.is_default || group.is_author
            })
            selectedPitch.restricted_to_groups = isDefault.concat(selectedPitch.restricted_to_groups)
            let uniqeGroupIds = []
            let uniqeGroups = selectedPitch.restricted_to_groups.filter((group) => {
                if(!uniqeGroupIds.includes(group._id)) {
                    uniqeGroupIds.push(group._id)
                    return group
                }
            })
            selectedPitch.restricted_to_groups = uniqeGroups
        } else {
            selectedPitch.restricted_to_groups = []
        }
        this.setState({
            selectedPitch
        })
    }

    newPitchHandler() {
        let selectedPitch = {...this.state.selectedPitch};
        let isDefault = this.state.groups.filter((group) => {
            return group.is_default || group.is_author
        })
        selectedPitch.restricted_to_groups = isDefault.concat(selectedPitch.restricted_to_groups)
        this.setState({
            selectedPitch
        })
        this.showPopup();
    }

    showPopup() {
        document.body.classList.add('modal-open');
        this.setState({
            popup: true
        });
    }
    
    setDefaultSelectedPitch() {
        let selectedPitch = {
            thumbnail: null,
            description: '',
            uuid: null,
            tags: [],
            title: '',
            related_content: null,
            restricted_to_groups: []
        }
        this.setState({
            selectedPitch
        })
    }

    hidePopup() {
        document.body.classList.remove('modal-open');
        this.setDefaultSelectedPitch()
        this.setState({
            popup: false,
        });
    }

    getPitchList() {
        this.setState({
            dataLoaded: false
        })
        axios.get('/api/pitch?author=1')
        .then(response => {
            this.setState({
                dataLoaded: true,
                list: response.data.pitches,
                groups: response.data.user_groups
            })
        })
        .catch(function (response) {
            console.log(response);
        });
    }

    updateSelectedPitchState(selectedPitch) {
        this.setState({
            pitchStatus: 'progress'
        })
        selectedPitch.uuid = this.state.selectedPitch.uuid;
        if(selectedPitch.restricted_to_groups.length) {
            let restrictedToIds = selectedPitch.restricted_to_groups.map((group) => {
                return group._id
            });
            selectedPitch.restricted_to_groupids = restrictedToIds
        }
        this.setState({
            selectedPitch
        }, () => {
            if(this.state.selectedPitch.thumbnail && this.state.selectedPitch.thumbnail.type) {
                this.postThumbnailIcon()
            }
            else if(this.state.selectedPitch.uuid) {
                this.updatePitch()
            } else {
                this.postPitch()
            }
        })
    }

    postThumbnailIcon() {
        let formData = new FormData();
        formData.append('icon', this.state.selectedPitch.thumbnail)
        formData.append('name', this.state.selectedPitch.thumbnail.name)
        axios({
            method: 'post',
            url: '/api/icon?author=1',
            data: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        })
        .then((response) => {
            if(this.state.selectedPitch.uuid) {
                this.updatePitch(response)
            } else {
                this.postPitch(response)
            }
        })
        .catch(response => this.showError(response.response));
    }

    postPitch(response) {
        let {title, description, tags, restricted_to_groupids, chapter_ids} = this.state.selectedPitch
        let data = {
            title,
            description,
            tags,
            restricted_to_groupids,
            chapter_ids
        }
        if(response && response.data.icon_id) {
            data.icon_id = response.data.icon_id
        }
        axios({
            method: 'POST',
            url: '/api/pitch?author=1',
            data: data
        })
        .then(() => {
            this.setState({
                pitchStatus: 'success'
            }, () => {
                setTimeout(() => {
                    this.setState({
                        pitchStatus: ''
                    })
                    this.hidePopup()
                    this.getPitchList()
                }, 1000)
            })
        })
        .catch(response => this.showError(response.response));
    }

    publishPitch(index) {
        this.setState({
            confirmStatus: 'progress'
        })
        let selectedPitch = {...this.state.list[index]}
        axios({
            method: 'PATCH',
            url: `/api/pitch/${selectedPitch.uuid}?author=1`
        })
        .then(() => {
            this.setState({
                confirmStatus: 'success'
            }, () => {
                setTimeout(() => {
                    this.setState({
                        confirmStatus: ''
                    })
                    this.publishConfirmationPopup()
                    this.getPitchList()
                }, 1000)
            })
        })
        .catch(response => this.showError(response.response));
    }

    updatePitch(response) {
        let {title, description, tags, uuid, thumbnail, restricted_to_groupids, chapter_ids} = this.state.selectedPitch
        let data = {
            title,
            description,
            tags,
            restricted_to_groupids,
        }
        if(chapter_ids) {
            data.chapter_ids = chapter_ids 
        }
            
        if(response && response.data.icon_id) {
            data.icon_id = response.data.icon_id
        } else if(thumbnail && thumbnail._id) {
            data.icon_id = thumbnail._id
        }
        axios({
            method: 'PUT',
            url: `/api/pitch/${uuid}?author=1`,
            data: data
        })
        .then(() => {
            this.setState({
                pitchStatus: 'success'
            }, () => {
                setTimeout(() => {
                    this.setState({
                        pitchStatus: ''
                    })
                    this.hidePopup()
                    this.getPitchList()
                }, 1000)
            })
        })
        .catch(response => this.showError(response.response));
    }

    deletePitch(index) {
        this.setState({
            confirmStatus: 'progress'
        })
        let selectedPitch = {...this.state.list[index]}
        axios({
            method: 'DELETE',
            url: `/api/pitch/${selectedPitch.uuid}?author=1`
        })
        .then(() => {
            this.setState({
                confirmStatus: 'success'
            }, () => {
                setTimeout(() => {
                    this.setState({
                        confirmStatus: ''
                    })
                    this.deleteConfirmationPopup()
                    this.getPitchList()
                }, 1000)
            })
        })
        .catch(response => this.showError(response.response));
    }

    deleteConfirmationPopup(index) {
        let deletePitchIndex = (index >= 0) ? index : null;
        let deleteConfirmationPopup = (index >= 0)
        this.setState({
            deletePitchIndex,
            deleteConfirmationPopup
        })
    }

    publishConfirmationPopup(index) {
        let publishPitchIndex = (index >= 0) ? index : null;
        let publishConfirmationPopup = (index >= 0)
        this.setState({
            publishPitchIndex,
            publishConfirmationPopup
        })
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
                this.deleteConfirmationPopup()
            }, 4000)
        })
    }

    render() {
        let home = this.state.dataLoaded ? 
                        ((this.state.list.length) ? 
                            <Tile
                                publish = {(index) => this.publishConfirmationPopup(index)}
                                edit={(index) => this.editPitchHandler(index)}
                                delete = {(index) => this.deleteConfirmationPopup(index)}
                                allPitch={this.state.list}
                            /> :
                            <Welcome />) 
                        : 
                        <div className="loading-data"></div>
        let popup = (this.state.popup) ? 
                        <PitchPopup
                            selectedPitch={this.state.selectedPitch}
                            groups={this.state.groups}
                            pitchStatus={this.state.pitchStatus}
                            close={() => this.hidePopup()} 
                            updateSelectedPitchState={(selectedPitch) => this.updateSelectedPitchState(selectedPitch)}
                        /> : 
                        null
        let deleteConfirmationPopup = (this.state.deleteConfirmationPopup) ?
                                        <ConfirmationPopup
                                            confirmType="Delete"
                                            confirmTitle="Delete Pitch"
                                            confirmMessage="Are you sure you want to delete this Pitch?"
                                            inProgressMessage="Deleting..."
                                            confirmStatus={this.state.confirmStatus}
                                            successMessage="Deleted"
                                            isConfirm={(deletePitchIndex) => this.deletePitch(this.state.deletePitchIndex)}
                                            close={() => this.deleteConfirmationPopup()}
                                        /> :
                                        null

        let publishConfirmationPopup = (this.state.publishConfirmationPopup) ?
                                        <ConfirmationPopup
                                            confirmType="Publish"
                                            confirmTitle="Publish Pitch"
                                            confirmMessage="Are you sure you want to publish this Pitch?"
                                            inProgressMessage="Publishing..."
                                            confirmStatus={this.state.confirmStatus}
                                            successMessage="Published"
                                            isConfirm={(publishPitchIndex) => this.publishPitch(this.state.publishPitchIndex)}
                                            close={() => this.publishConfirmationPopup()}
                                        /> :
                                        null
        return (
            <React.Fragment>
                <div className="container-wrapper">
                    {home}
                    {popup}
                </div>
                <div className="create-new" onClick={() => this.newPitchHandler()}></div>
                {deleteConfirmationPopup}
                {publishConfirmationPopup}
            </React.Fragment>
        )
    }
}

export default Home;
