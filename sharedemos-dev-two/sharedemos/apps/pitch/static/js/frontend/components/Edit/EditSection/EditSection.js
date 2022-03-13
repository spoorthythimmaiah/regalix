import React, { Component } from 'react'
import Section from './Section';
import AddSection from '../AddSection/AddSection';
import SectionPopup from '../SectionPopup/SectionPopup';


class EditSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSectionIndex: 0,
            activeSection: {},
            showPopup: false
        }
    }

    componentDidMount() {
        this.setDefaultSectionDetails()
    }

    setDefaultSectionDetails() {
        let activeSection = {
            title: '',
            description: '',
            time_limit: 0,
            keywords: [],
            score: '',
            base_pitch: {},
            uuid: null
        }
        this.setState({
            activeSection
        })
    }

    addNewSection() {
        this.showSectionPopup()
    }

    editSection() {
        this.showSectionPopup()
        this.getActiveSection()
    }

    moveTo(nav) {
        let activeSectionIndex = this.state.activeSectionIndex;
        if(nav == 'next') {
            if((activeSectionIndex + 1) < this.props.sections.length) {
                activeSectionIndex++
            }
        } else if (nav == 'prev') {
            if((activeSectionIndex - 1) >= 0) {
                activeSectionIndex--
            }
        }
        this.setState({
            activeSectionIndex
        })
    }

    showSectionPopup() {
        const showPopup = true
        this.setState({
            showPopup
        })
    }

    closeSectionPopup() {
        const showPopup = false
        this.setDefaultSectionDetails()
        this.setState({
            showPopup
        });
    }

    getActiveSection() {
        const activeSection = this.props.sections.length && this.props.sections[this.state.activeSectionIndex];
        if(activeSection) {
            const {title, description, time_limit, uuid, keywords, score, base_pitch} = activeSection
            const updateActiveSection = {}
            updateActiveSection.title = title;
            updateActiveSection.description = description;
            updateActiveSection.time_limit = time_limit;
            updateActiveSection.keywords = keywords;
            updateActiveSection.score = score;
            updateActiveSection.base_pitch = base_pitch;
            updateActiveSection.uuid = uuid;
            this.setState({
                activeSection: updateActiveSection,
            });
        }
    }

    render() {
        const home = (this.props.sections.length) ? 
                        <React.Fragment>
                            <Section
                                getPitch={() => this.props.getPitch()}
                                pitch_uuid={this.props.pitch_uuid}
                                edit={() => this.editSection()}
                                activeIndex={this.state.activeSectionIndex} 
                                section={this.props.sections[this.state.activeSectionIndex]}
                                totalLength={this.props.sections.length}
                                moveTo={(nav) => this.moveTo(nav)}
                            />
                            <div className="create-new-section" onClick={() => this.addNewSection()}>create new section</div>
                        </React.Fragment> :
                        <AddSection add={() => this.addNewSection()} />
        
        const popup = (this.state.showPopup) ? 
                        <SectionPopup
                            pitch_uuid={this.props.pitch_uuid}
                            activeSection={this.state.activeSection}
                            getPitch={() => this.props.getPitch()}
                            close={() => this.closeSectionPopup()} 
                        /> :
                        null

        return (
            <React.Fragment>
                <div className="sections-wrapper edit">
                    {home}
                    {popup}
                </div>
            </React.Fragment>
        );
    }
}

export default EditSection;