import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTasksForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    }
  }

  onLabelState = (e) => {
    this.setState({ label: e.target.value })
  }

  onMinutesState = (e) => {
    this.setState({ minutes: e.target.value })
  }

  onSecondsState = (e) => {
    this.setState({ seconds: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { label, minutes, seconds } = this.state
    const { addItem } = this.props

    if (label.trim() && minutes.trim() && seconds.trim()) {
      addItem(label, minutes, seconds)
      this.setState({ label: '', minutes: '', seconds: '' })
    }
  }

  render() {
    const { label, minutes, seconds } = this.state

    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelState}
            value={label}
            required
          />
          <input
            className="new-todo-form__timer"
            type="number"
            placeholder="Min"
            onChange={this.onMinutesState}
            value={minutes}
            min="0"
            required
          />
          <input
            className="new-todo-form__timer"
            type="number"
            placeholder="Sec"
            onChange={this.onSecondsState}
            value={seconds}
            min="0"
            required
          />
          <button type="submit" style={{ display: 'none' }}>
            Submit
          </button>
        </form>
      </header>
    )
  }
}

NewTasksForm.defaultProps = {
  addItem: () => {},
}

NewTasksForm.propTypes = {
  addItem: PropTypes.func,
}
