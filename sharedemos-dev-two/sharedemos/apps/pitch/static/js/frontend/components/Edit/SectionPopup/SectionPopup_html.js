import React, {useState} from 'react'
import SingleSelectDropDown from '../../../../dashboard/containers/common/DropDown/SingleSelectDropDown'
import BasePitch_html from './BasePitch_html';

const SectionPopup_html = (props) => {
    const timeOptions = [2,5,10,20,30];
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setdescriptionError] = useState('');
    const [timeError, setTimeError] = useState('');
    const [keywordsError, setKeywordsError] = useState('');
    const [scoreError, setscoreError] = useState('');

    const handleSubmit = () => {
        setTitleError('');
        setdescriptionError('');
        setTimeError('');
        setKeywordsError('')
        setscoreError('')
        const isValid =validate();
        if(isValid) {
            props.updateSelectedSection()
        }
    }

    const validate = () => {
        if(!props.title.trim()) {
            setTitleError('Please provide section title!');
            document.getElementById('title').focus();
            return false;
        }
        if(!props.description.trim()) {
            setdescriptionError('Please provide section description!');
            document.getElementById('description').focus();
            return false;
        }
        if(props.set_time_limit == 'limit' && props.time_limit == 0) {
            setTimeError('Please set time limit!');
            document.getElementById('set_time_limit').focus();
            return false;
        }
        if(!props.keywords.length) {
            setKeywordsError('Please add at lease one keyword!');
            document.getElementById('newKeyword').focus();
            return false;
        }
        if(!props.score || isNaN(props.score)) {
            setscoreError('Please provide points for this pitch!');
            document.getElementById('score').focus();
            return false;
        }
        return true;
    }

    let availableKeywords = props.keywords.map((keyword, i) => {
        return (
            <li key={i} value={keyword}>{keyword}<span onClick={props.deleteKeyword}>x</span></li>
        )
    });

    let footer = () => {
        let {inProgress} = props;
        if(inProgress == 'success') {
            return (<div className={inProgress}>Success</div>)
        } else if(inProgress == 'progress') {
            return (<div className={inProgress}>Submitting...</div>)
        } else {
            return (
                <React.Fragment>
                    <span onClick={props.close}>cancel</span>
                    <span className="section-save" onClick={handleSubmit}>save</span>
                </React.Fragment>
            )
        }
    }

    return (
        <div className="popup-wrapper popup-window">
            <div className="popup-container">
                <h4>{props.uuid ? 'Edit' : 'create new'} Section</h4>
                <div className="popup-container-block">
                    <div className="form-group">
                        <div className="title mandatory-field">title</div>
                        <div className="sub-title">Write a name for your section.</div>
                        <div className="input-wrap">
                            <input 
                                type="text" 
                                name="title"
                                id="title"
                                autoComplete="off"
                                placeholder="Name"
                                value={props.title}
                                onChange={props.updateFieldHandler}
                            />
                        </div>
                        <div className="error">{titleError}</div>         
                    </div>
                    <div className="form-group">
                        <div className="title mandatory-field">Description</div>
                        <div className="sub-title">Write a short description that best describes your section.</div>
                        <div className="input-wrap">
                            <textarea 
                                type="text" 
                                name="description"
                                id="description" 
                                autoComplete="off"
                                placeholder="Description"
                                value={props.description}
                                onChange={props.updateFieldHandler}
                            />
                            <div className="input-sub-info">{props.descriptionCharLimit - props.description.length} Charaters Left</div>
                        </div>
                        <div className="error">{descriptionError}</div>        
                    </div>
                    <div className="form-group">
                        <div className="title mandatory-field">time limit</div>
                        <div className="sub-title">Do you want to set a time limit for this section?</div>
                        <div className="input-wrap time-wrapper">
                            <label>
                                <input type="radio" name="set_time_limit" checked={props.set_time_limit == 'nolimit'} value="nolimit" onChange={props.updateFieldHandler} />
                                <span>no time limit</span>    
                            </label>
                            <label>
                                <input type="radio" id="set_time_limit" name="set_time_limit" checked={props.set_time_limit == 'limit'} value="limit" onChange={props.updateFieldHandler} />
                                <span>time limit</span>
                            </label>
                            <SingleSelectDropDown 
                                postfixLabel="minutes"
                                view={props.set_time_limit == 'nolimit' ? 'disabled' : ''}
                                options={timeOptions}
                                selected={props.time_limit}
                                updateTimeLimit={props.updateTimeLimit}
                            />
                        </div>            
                        <div className="error">{timeError}</div>
                    </div>
                    <div className="form-group">
                        <div className="title mandatory-field">set of keywords</div>
                        <div className="sub-title">add keywords that help us better identify information.</div>
                        <div className="input-wrap">
                            <div className="add-keyword-wrapper">
                                <input 
                                    type="text" 
                                    name="newKeyword" 
                                    id="newKeyword"
                                    autoComplete="off"
                                    placeholder="keywords"
                                    value={props.newKeyword}
                                    onChange={props.updateFieldHandler}
                                />
                                <button className="btn btn-black" onClick={props.addKeyword}>Add</button>
                            </div>
                            <ul className="keywords">{availableKeywords}</ul>
                        </div>            
                        <div className="error">{keywordsError}</div>
                    </div>
                    <div className="form-group">
                        <div className="title mandatory-field">grading</div>
                        <div className="sub-title">how many points is this section worth?</div>
                        <div className="input-wrap">
                            <div className="grading-wrapper">
                                <input 
                                    type="text" 
                                    name="score"
                                    id="score"
                                    autoComplete="off"
                                    placeholder="10"
                                    value={props.score}
                                    onChange={props.updateFieldHandler}
                                />
                                <label>Points</label>
                            </div>
                        </div>
                        <div className="error">{scoreError}</div>         
                    </div>
                    <div className="form-group">
                        <label className="title">upload base pitch</label>
                        <div className="sub-title">upload a base pitch to go with your section.</div>
                        <div className="base-file-block">
                            <BasePitch_html
                                base_pitch={props.base_pitch}
                                deleteBasePitch={props.deleteBasePitch}
                            />
                            <input className="hidden" type="file" id="base-file" name="base_pitch" accept="video/*, audio/*" onChange={props.updateFieldHandler} />
                            <label htmlFor="base-file" className="btn btn-black">upload file</label>
                        </div>
                    </div>
                </div>
                <div className="popup-footer">
                    {footer()}
                </div>
            </div>
        </div>
    )
}

export default SectionPopup_html
