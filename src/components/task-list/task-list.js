import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

function TaskList({ todos, onDeleteItem, onToggleDone, onEditItem, changeDes, startTimer, stopTimer }) {
  return (
    <ul className="todo-list">
      {todos.map((item) => (
        <Task
          key={item.id}
          id={item.id}
          label={item.label}
          completed={item.completed}
          created={item.created}
          isEditing={item.isEditing}
          changeDes={(newValue) => changeDes(newValue, item.id)}
          onDeleteItem={() => onDeleteItem(item.id)}
          onToggleDone={() => onToggleDone(item.id)}
          onEditItem={() => onEditItem(item.id)}
          startTimer={() => startTimer(item.id)}
          stopTimer={() => stopTimer(item.id)}
          remainingMinutes={item.remainingMinutes}
          remainingSeconds={item.remainingSeconds}
          timerStart={item.timerStart}
        />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      created: PropTypes.instanceOf(Date).isRequired,
      isEditing: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  changeDes: PropTypes.func.isRequired,
}

export default TaskList
