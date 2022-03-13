import React, { Component } from 'react';
import './DropDown.css';


export class SingleSelectDropDown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: this.props.selected,
            show_options: false
        }
        this.selectHandler = this.selectHandler.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.selected !== this.props.selected) {
          this.setState({selected: this.props.selected});
        }
    }

    selectHandler(event) {
        const target = event.currentTarget;
        const selected = parseInt(target.getAttribute('value'));
        this.setState({
            selected
        });
        this.props.updateTimeLimit(selected)
    }

    toggleHandler() {
        const {show_options} = this.state;
        this.setState({
            show_options: !show_options
        })
    }
    
    render() {
        const visibility = (this.state.show_options && this.props.view !== 'disabled') ? 'active' : 'inactive';
        const optionsList = this.props.options.map((option, i) => {
            return (
                <li key={i} className={option == this.state.selected ? 'active' : null}>
                    <label value={option} onClick={this.selectHandler}>
                        <span>{`${option} ${this.props.postfixLabel}`}</span>
                    </label>
                </li>
            )
        })
        return (
            <div className={"dropdown-wrapper " + visibility + ' ' + this.props.view}>
                <div className="opted" onClick={() => this.toggleHandler()}>
                    {this.state.selected ? `${this.state.selected} ${this.props.postfixLabel}` : 'Select Minutes'}
                </div>
                <ul className="options">
                    {optionsList}
                </ul>
            </div>
        )
    }
}

export default SingleSelectDropDown
