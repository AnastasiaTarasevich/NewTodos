import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from './tasks-filter'
import './footer.css'

function Footer({ doneCount = 0, deleteDoneItem, setFilter, activeFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{doneCount} items left</span>
      <ul className="filters">
        <TasksFilter
          desButton="All"
          statusFilter={activeFilter === 'All' ? 'selected' : ''}
          setFilter={() => setFilter('All')}
        />
        <TasksFilter
          desButton="Active"
          statusFilter={activeFilter === 'Active' ? 'selected' : ''}
          setFilter={() => setFilter('Active')}
        />
        <TasksFilter
          desButton="Completed"
          statusFilter={activeFilter === 'Completed' ? 'selected' : ''}
          setFilter={() => setFilter('Completed')}
        />
      </ul>
      <button className="clear-completed" onClick={deleteDoneItem} type="button">
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  setFilter: PropTypes.func.isRequired,
  deleteDoneItem: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
}

export default Footer
