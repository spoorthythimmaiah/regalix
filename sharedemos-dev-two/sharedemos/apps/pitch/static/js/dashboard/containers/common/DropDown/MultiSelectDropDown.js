import React, { Component } from 'react';
import './DropDown.css';


export class MultiSelectDropDown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: this.props.selected,
            show_options: false
        }
        this.selectHandler = this.selectHandler.bind(this);
    }

    selectHandler(option, event) {
        if(option.is_default || option.is_author) {
            return true;
        }
        let selected = [...this.state.selected];
        let indexValue = selected.some((item) => {
            return item.name == option.name
        }); 
        if(!indexValue) {
            selected.push(option)
        } else {
            selected = selected.filter((item) => {
                return item.name != option.name
            })
        }
        this.setState({
            selected
        });
        this.props.updateVisibility(selected)
    }

    toggleHandler() {
        const {show_options} = this.state;
        this.setState({
            show_options: !show_options
        })
    }
    
    render() {
        let selected = this.state.selected.map((selected) => {
            return selected.name;
        })
        const visibility = (this.state.show_options) ? 'active' : 'inactive';
        const optionsList = this.props.options.map((option, i) => {
            return (
                <li key={i} className={(selected.indexOf(option.name) > -1) ? 'active' : null}>
                    <label value={option.name} onClick={this.selectHandler.bind(this, option)}>
                        <span className={`check-box ${option.is_default || option.is_author ? 'is-default' : ''}`}></span>
                        <span>{option.name}</span>
                    </label>
                </li>
            )
        })
        return (
            <div className={"dropdown-wrapper " + visibility}>
                <div className="opted" onClick={() => this.toggleHandler()}>
                    {selected.length ? selected.join(', ') : 'Select'}
                </div>
                <ul className="options">
                    {optionsList}
                </ul>
            </div>
        )
    }
}

export default MultiSelectDropDown
