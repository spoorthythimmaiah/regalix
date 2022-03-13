import React, { Component } from 'react'
import './Tagging.css'


class Tagging extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tags: [...this.props.tags],
            showError: false
        }
        this.addTags = this.addTags.bind(this);
    }

    componentDidMount() {
        this.addTags()
    }

    addTagGroup() {
        const tags = [...this.state.tags];
        const newTagGroup = {
            "name": "",
            "values": []
        }
        tags.push(newTagGroup)
        this.setState({
            tags
        })
    }

    addTagValueHandler(index, event) {
        const target = event.target
        const value = target.parentElement.previousSibling.value.trim().toLowerCase()
        const tag = {...this.state.tags[index]}
        let updatedTag = {
            "name": tag.name,
            "values": [...tag.values]
        }
        if(tag.name && value) {
            updatedTag.values.push(value)
        }
        const tags = [...this.state.tags];
        tags[index] = updatedTag;
        this.setState({
            tags
        }, () => {
            target.parentElement.previousSibling.value='';
            this.props.update(this.state.tags)
        })
    }

    deleteTagValueHandler(tagGroupIndex, valueIndex) {
        const tags = [...this.state.tags];
        const tag = {...this.state.tags[tagGroupIndex]};
        let values = [...tag.values]
        values.splice(valueIndex, 1);
        tag.values = values
        tags[tagGroupIndex] = tag;
        this.setState({
            tags
        }, () => {
            this.props.update(this.state.tags)
        })
    }
    
    deleteTagGroupHandler(index) {
        const tags = [...this.state.tags];
        tags.splice(index, 1);
        this.setState({
            tags
        }, () => {
            this.props.update(this.state.tags)
        })
    }

    tagNameHandler(index, event) {
        const target = event.target;
        const tag = {...this.state.tags[index]}
        tag.name = target.value.toLowerCase()
        const tags = [...this.state.tags];
        tags[index] = tag;
        this.setState({
            tags
        }, () => {
            this.props.update(this.state.tags)
        })
    }

    validate() {
        let missingTag = this.state.tags.find((tag) => !tag.name.trim() || !tag.values.length)
        if(missingTag) {
            this.setState({
                showError: true
            })
            return;
        }
        let tags = this.state.tags.map(({...tag}) => {
            tag.name = tag.name.trim();
            return tag
        })
        this.setState({
            showError: false,
            tags
        }, () => {
            this.props.update(this.state.tags, 'moveToNext')
        })
    }

    addTags() {
        const tags = this.state.tags;
        const appendTags = tags.map((tag, index) => {
            const tagValue = tag.values.map((value, i) => {
                return (
                    <li key={i}>
                        {value}
                        <span 
                            className="delete-tag" 
                            onClick={this.deleteTagValueHandler.bind(this, index, i)}
                        ></span>
                    </li>
                )
            });
            return (
                <div className="tag-group row" key={index}>
                    <div className="col-xs-4">
                        <input
                            type="text" 
                            placeholder="Key values" 
                            autoComplete="off"
                            value={tag.name}
                            onChange={this.tagNameHandler.bind(this, index)}
                        />
                    </div>
                    <div className="col-xs-8">
                        <ul className="tags-list">
                            {tagValue}
                        </ul>
                        <input 
                            type="text"
                            placeholder="Input"
                            className="tagValue"
                            autoComplete="off"
                        />
                        <div className="tag-action-block">
                            <button className="btn btn-light-blue add-input" onClick={this.addTagValueHandler.bind(this, index)}>Add Input</button>
                            <button className="btn btn-blue" onClick={this.deleteTagGroupHandler.bind(this, index)}>Delete group</button>
                        </div>
                    </div>
                </div>
            )
        });
        return appendTags
    }

    render() {
        let errorMsg = null
        if(this.state.showError) {
            errorMsg = (<div className="error">Tag Key or Input can not be empty!</div>)
        }
        return (
            <React.Fragment>
                <div className="form-group">
                    <label htmlFor="title">add tags</label>
                    <div className="sub-title">Create tag to your pitch to help organize and identify them.</div>
                    <div className="tag-group-wrapper">
                        {this.addTags()}
                    </div>
                    {errorMsg}
                    <button className="btn btn-blue" onClick={() => this.addTagGroup()}>Add group</button>
                </div>
                <div className="navigation">
                    <span className="prev" onClick={() => this.props.moveTo('name')}></span>
                    <label className="ctbtn inline-nav createBtn" onClick={this.validate.bind(this)}>Related Content</label>
                </div>
            </React.Fragment>
        )
    }
}

export default Tagging
