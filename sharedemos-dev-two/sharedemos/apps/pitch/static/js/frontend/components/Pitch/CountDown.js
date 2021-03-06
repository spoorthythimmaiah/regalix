import React, { Component } from 'react'

export default class CountDown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            minutes: this.props.minutes,
            seconds: 0,
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <div className="count-down-timer">
                <h6>Time Left</h6>
                <p>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
            </div>
        )
    }
}