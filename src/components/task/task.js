import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './task.css'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: props.label,
      timeCreated: formatDistanceToNow(new Date(props.created), { addSuffix: true }),
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { created } = this.props
      this.setState({
        timeCreated: formatDistanceToNow(new Date(created), { addSuffix: true }),
      })
    }, 30000)
  }

  componentWillUnmount() {
    const { timerStart, stopTimer, id } = this.props
    if (timerStart) {
      stopTimer(id)
    }
    clearInterval(this.interval)
  }

  handleEditChange = (e) => {
    this.setState({ currentValue: e.target.value })
  }

  onSubmit = () => {
    const { currentValue } = this.state
    const { changeDes, onEditItem } = this.props

    if (currentValue.trim()) {
      changeDes(currentValue)
      onEditItem()
    }
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit()
    }
  }

  render() {
    const { currentValue, timeCreated } = this.state
    const {
      label,
      isEditing,
      id,
      onToggleDone,
      completed,
      onEditItem,
      onDeleteItem,
      startTimer,
      stopTimer,
      remainingMinutes,
      remainingSeconds,
      timerStart,
    } = this.props
    const classNames = `${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            id={id}
            checked={completed}
            onChange={onToggleDone}
            aria-label="Toggle item"
          />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="description__button">
              <button
                className="icon icon-play"
                type="button"
                aria-label="Start timer"
                onClick={() => startTimer(id)}
                disabled={timerStart}
              />
              <button
                className="icon icon-pause"
                type="button"
                aria-label="Pause timer"
                onClick={() => stopTimer(id)}
                disabled={!timerStart}
              />
              <span className="time-info">
                {`${remainingMinutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`}
              </span>
            </span>
            <span className="created">{`created ${timeCreated}`}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={onEditItem}
            disabled={timerStart}
            type="button"
            aria-label="Edit item"
          />
          <button
            className="icon icon-destroy"
            onClick={onDeleteItem}
            disabled={timerStart}
            type="button"
            aria-label="Delete item"
          />
        </div>
        {isEditing && (
          <input
            type="text"
            className="edit"
            value={currentValue}
            onChange={this.handleEditChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.onSubmit}
          />
        )}
      </li>
    )
  }
}

Task.defaultProps = {
  label: '',
  created: new Date(),
  isEditing: false,
  completed: false,
  remainingMinutes: 0,
  remainingSeconds: 0,
  onToggleDone: () => {},
  onEditItem: () => {},
  onDeleteItem: () => {},
  changeDes: () => {},
  startTimer: () => {},
  stopTimer: () => {},
}

Task.propTypes = {
  label: PropTypes.string,
  created: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  isEditing: PropTypes.bool,
  completed: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onToggleDone: PropTypes.func,
  onEditItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  changeDes: PropTypes.func,
  remainingMinutes: PropTypes.number,
  remainingSeconds: PropTypes.number,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
}
