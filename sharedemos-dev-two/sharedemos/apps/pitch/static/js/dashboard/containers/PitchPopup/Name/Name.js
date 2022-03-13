import React, { Component } from 'react'
import MultiSelectDropDown from '../../common/DropDown/MultiSelectDropDown';


class Name extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            description: this.props.description,
            thumbnail: this.props.thumbnail,
            restricted_to_groups: this.props.restricted_to_groups,
            descriptionCharLimit: 300
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.updateVisibility = this.updateVisibility.bind(this);
    }

    componentDidMount() {
        this.setThumbnail(this.state.thumbnail)
    }

    changeHandler(event) {
        const target = event.target;
        let value = target.type === 'file' ? target.files[0] : target.value;
        const name = target.name;
        if(name == 'description') {
            value = value.substring(0, this.state.descriptionCharLimit);
        }
        this.setState({
            [name]: value
        }, () => {
            if(target.type == 'file') {
                this.previewThumbnail(target.files[0])
            }
        });
    }

    setThumbnail(file) {
        if(file == null) {
            return
        }
        if(file && file.url) {
            let thumbnail = document.getElementById('thumbnail');
                thumbnail.src = file.url;
        } else {
            this.previewThumbnail(file)
        }
    }

    previewThumbnail(file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let thumbnail = document.getElementById('thumbnail');
            thumbnail.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }

    updateVisibility(restricted_to_groups) {
        this.setState({
            restricted_to_groups
        })
    }
    
    update() {
        let {title, description} = this.state;
        title = title.trim()
        description = description.trim()
        if(title && description) {
            this.setState({
                title,
                description
            }, () => {
                this.props.update(this.state)
            })
        }
    }

    render() {
        let coverIcon, limitedAccess = null;
        const {title, description, descriptionCharLimit, thumbnail} = this.state;
        const active = (title.trim() && description.trim()) ? 'createBtn' : '';
        if(thumbnail) {
            coverIcon = <img id="thumbnail" src={this.state.thumbnail.url} />
        } else {
            coverIcon = <img id="thumbnail" src='/static/images/pitch/default-thumbnail-icon.jpg' />
        }
        if(this.props.groups.length) {
            limitedAccess = (
                <MultiSelectDropDown 
                    options={this.props.groups} 
                    selected={this.state.restricted_to_groups}
                    updateVisibility={this.updateVisibility}
                />
            )
        }

        return (
            <React.Fragment>
                <div className="form-group">
                    <label htmlFor="title" className="mandatory-field">title</label>
                    <div className="sub-title">Write a name for you pitch.</div>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="title" 
                        id="title"
                        autoComplete='off'
                        value={this.state.title}
                        onChange={this.changeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="mandatory-field">description</label>
                    <div className="sub-title">Write a short description for this pitch.</div>
                    <textarea 
                        placeholder="Description" 
                        name="description" 
                        id="description"
                        value={this.state.description}
                        onChange={this.changeHandler}
                    />
                    <div className="input-sub-info">{descriptionCharLimit - description.length} Charaters Left</div>
                </div>
                {
                    this.props.groups.length ? (
                        <div className="form-group">
                            <label>Allow Access To</label>
                            <div className="access-wrapper">
                                {limitedAccess}
                            </div>
                        </div>
                    )
                    :
                    null
                }
                <div className="form-group">
                    <label>thumbnail cover</label>
                    <div className="sub-title">Upload a thumbnail cover to illustrate this pitch.</div>
                    <div className="thumbnail-block">
                        <div className="thumbnail-wrapper">
                            {coverIcon}
                        </div>
                        <input type="file" id="cover-path" name="thumbnail" accept="image/*" onChange={this.changeHandler} />
                        <label htmlFor="cover-path" className={`browse-btn ${thumbnail ? 'hidden' : ''}`}>Browse</label>
                        <label onClick={() => this.setState({thumbnail: null})} className={`remove-thumbnail ${thumbnail ? '' : 'hidden'}`}>Remove</label>
                    </div>
                </div>
                <div className="navigation">
                    <label className={`ctbtn inline-nav ${active}`} onClick={() => this.update()}>Tagging</label>
                </div>
            </React.Fragment>
        )
    }
}

export default Name
