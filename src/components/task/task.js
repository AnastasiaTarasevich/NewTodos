import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './task.css'

function Task({
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
  created,
  changeDes,
}) {
  const [currentValue, setCurrentValue] = useState(label)
  const [timeCreated, setTimeCreated] = useState(formatDistanceToNow(new Date(created), { addSuffix: true }))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeCreated(formatDistanceToNow(new Date(created), { addSuffix: true }))
    }, 30000)

    return () => {
      if (timerStart) {
        stopTimer(id)
      }
      clearInterval(interval)
    }
  }, [created, id, timerStart, stopTimer])

  const handleEditChange = (e) => {
    setCurrentValue(e.target.value)
  }

  const onSubmit = () => {
    if (currentValue.trim()) {
      changeDes(currentValue)
      onEditItem()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

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
          disabled={!timerStart}
          type="button"
          aria-label="Edit item"
        />
        <button
          className="icon icon-destroy"
          onClick={onDeleteItem}
          disabled={!timerStart}
          type="button"
          aria-label="Delete item"
        />
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={currentValue}
          onChange={handleEditChange}
          onKeyDown={handleKeyDown}
          onBlur={onSubmit}
        />
      )}
    </li>
  )
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  created: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  isEditing: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  changeDes: PropTypes.func.isRequired,
  remainingMinutes: PropTypes.number.isRequired,
  remainingSeconds: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  timerStart: PropTypes.bool.isRequired,
}

export default Task
