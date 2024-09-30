import React, { Component } from 'react'

import NewTasksForm from '../new-task-form'
import Footer from '../footer'
import TaskList from '../task-list'
import './app.css'

class App extends Component {
  static filterItems = (items, filter) => {
    switch (filter) {
      case 'Active':
        return items.filter((item) => !item.completed)
      case 'Completed':
        return items.filter((item) => item.completed)
      default:
        return items
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      arr: [],
      filter: 'All',
    }
  }

  static onCreateItem = (label, minutes, seconds) => ({
    label,
    completed: false,
    created: new Date(),
    isEditing: false,
    id: Date.now(),
    timerStart: false,
    remainingMinutes: minutes || '0',
    remainingSeconds: seconds || '0',
  })

  updateTask = (id, changes) => {
    this.setState(({ arr }) => {
      const idx = arr.findIndex((el) => el.id === id)
      const updatedTask = { ...arr[idx], ...changes }
      const updatedArr = [...arr.slice(0, idx), updatedTask, ...arr.slice(idx + 1)]
      return { arr: updatedArr }
    })
  }

  onToggleDone = (id) => {
    const { arr } = this.state
    this.updateTask(id, {
      completed: !arr.find((el) => el.id === id).completed,
    })
    this.stopTimer(id)
  }

  onEditItem = (id) => {
    const { arr } = this.state
    this.updateTask(id, {
      isEditing: !arr.find((el) => el.id === id).isEditing,
    })
  }

  changeDes = (text, id) => {
    this.updateTask(id, { label: text })
  }

  deleteDoneItem = () => {
    this.setState(({ arr }) => {
      const newArr = arr.filter((el) => !el.completed)
      return { arr: newArr }
    })
  }

  deleteItem = (id) => {
    this.setState(({ arr }) => {
      const idx = arr.findIndex((el) => el.id === id)
      const newArr = [...arr.slice(0, idx), ...arr.slice(idx + 1)]
      return { arr: newArr }
    })
  }

  addItem = (label, minutes, seconds) => {
    const newItem = App.onCreateItem(label, minutes, seconds)
    this.setState(({ arr }) => {
      const newArr = [...arr, newItem]
      return { arr: newArr }
    })
  }

  setFilter = (filter) => {
    this.setState({ filter })
  }

  startTimer = (id) => {
    const { arr } = this.state
    const task = arr.find((el) => el.id === id)
    if (!task || task.timerStart) return

    const intervalId = setInterval(() => {
      this.updateRemainingTime(id)
    }, 1000)

    this.updateTask(id, { timerStart: true, intervalId })
  }

  stopTimer = (id) => {
    const { arr } = this.state
    const task = arr.find((el) => el.id === id)
    if (!task || !task.timerStart || !task.intervalId) return

    clearInterval(task.intervalId)
    this.updateTask(id, { timerStart: false })
  }

  updateRemainingTime = (id) => {
    this.setState(({ arr }) => {
      const newArr = arr.map((el) => {
        if (el.id === id && el.timerStart) {
          let { remainingMinutes, remainingSeconds } = el
          remainingSeconds = parseInt(remainingSeconds, 10)
          remainingMinutes = parseInt(remainingMinutes, 10)

          if (remainingSeconds === 0 && remainingMinutes === 0) {
            clearInterval(el.intervalId)
            return { ...el, timerStart: false }
          }

          if (remainingSeconds === 0) {
            remainingMinutes -= 1
            remainingSeconds = 59
          } else {
            remainingSeconds -= 1
          }

          return { ...el, remainingMinutes, remainingSeconds }
        }
        return el
      })

      return { arr: newArr }
    })
  }

  render() {
    const { arr, filter } = this.state
    const doneCount = arr.filter((el) => !el.completed).length
    const visibleFilter = App.filterItems(arr, filter)

    return (
      <section className="todoapp">
        <NewTasksForm addItem={this.addItem} />
        <section className="main">
          <TaskList
            todos={visibleFilter}
            changeDes={this.changeDes}
            onEditItem={this.onEditItem}
            onDeleteItem={this.deleteItem}
            onToggleDone={this.onToggleDone}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
          />
          <Footer
            setFilter={this.setFilter}
            activeFilter={filter}
            doneCount={doneCount}
            deleteDoneItem={this.deleteDoneItem}
          />
        </section>
      </section>
    )
  }
}

App.defaultProps = {
  arr: [],
  filter: 'All',
}

export default App
