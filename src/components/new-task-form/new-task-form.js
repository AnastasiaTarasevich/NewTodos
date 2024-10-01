import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

function NewTasksForm({ addItem }) {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (label.trim() && !Number.isNaN(minutes) && !Number.isNaN(seconds)) {
      addItem(label, parseInt(minutes, 10) || 0, parseInt(seconds, 10) || 0)
      setLabel('')
      setMinutes('')
      setSeconds('')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={(e) => setLabel(e.target.value)}
          value={label}
          required
        />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Min"
          onChange={(e) => setMinutes(e.target.value)}
          value={minutes}
          min="0"
          required
        />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Sec"
          onChange={(e) => setSeconds(e.target.value)}
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

NewTasksForm.propTypes = {
  addItem: PropTypes.func.isRequired,
}

export default NewTasksForm
