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

  static onCreateItem = (label) => ({
    label,
    completed: false,
    created: new Date(),
    isEditing: false,
    id: Date.now(),
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

  addItem = (text) => {
    const newItem = App.onCreateItem(text)
    this.setState(({ arr }) => {
      const newArr = [...arr, newItem]
      return { arr: newArr }
    })
  }

  setFilter = (filter) => {
    this.setState({ filter })
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
