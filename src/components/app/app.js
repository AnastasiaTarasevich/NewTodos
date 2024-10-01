import React, { useState } from 'react'

import NewTasksForm from '../new-task-form'
import Footer from '../footer'
import TaskList from '../task-list'
import './app.css'

function App() {
  const [arr, setArr] = useState([]) // состояние для задач
  const [filter, setFilter] = useState('All') // состояние для фильтра

  // Фильтрация задач по критерию (Active, Completed, All)
  const filterItems = (items, currentFilter) => {
    switch (currentFilter) {
      case 'Active':
        return items.filter((item) => !item.completed)
      case 'Completed':
        return items.filter((item) => item.completed)
      default:
        return items
    }
  }

  // Функция для создания нового элемента задачи
  const onCreateItem = (label, minutes, seconds) => ({
    label,
    completed: false,
    created: new Date(),
    isEditing: false,
    id: Date.now(),
    timerStart: false,
    remainingMinutes: minutes || '0',
    remainingSeconds: seconds || '0',
  })

  // Функция для обновления задачи
  const updateTask = (id, changes) => {
    setArr((prevArr) => {
      const idx = prevArr.findIndex((el) => el.id === id)
      const updatedTask = { ...prevArr[idx], ...changes }
      const updatedArr = [...prevArr.slice(0, idx), updatedTask, ...prevArr.slice(idx + 1)]
      return updatedArr
    })
  }

  const updateRemainingTime = (id) => {
    setArr((prevArr) =>
      prevArr.map((el) => {
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
    )
  }

  // Функции для управления таймером
  const startTimer = (id) => {
    const task = arr.find((el) => el.id === id)
    if (!task || task.timerStart) return

    const intervalId = setInterval(() => {
      updateRemainingTime(id)
    }, 1000)

    updateTask(id, { timerStart: true, intervalId })
  }

  const stopTimer = (id) => {
    const task = arr.find((el) => el.id === id)
    if (!task || !task.timerStart || !task.intervalId) return

    clearInterval(task.intervalId)
    updateTask(id, { timerStart: false })
  }

  // Функции для управления задачами
  const onToggleDone = (id) => {
    const task = arr.find((el) => el.id === id)
    updateTask(id, {
      completed: !task.completed,
    })
    stopTimer(id)
  }

  const onEditItem = (id) => {
    const task = arr.find((el) => el.id === id)
    updateTask(id, {
      isEditing: !task.isEditing,
    })
  }

  const changeDes = (text, id) => {
    updateTask(id, { label: text })
  }

  const deleteDoneItem = () => {
    setArr((prevArr) => prevArr.filter((el) => !el.completed))
  }

  const deleteItem = (id) => {
    setArr((prevArr) => prevArr.filter((el) => el.id !== id))
  }

  const addItem = (label, minutes, seconds) => {
    const newItem = onCreateItem(label, minutes, seconds)
    setArr((prevArr) => [...prevArr, newItem])
  }

  // Количество выполненных задач
  const doneCount = arr.filter((el) => !el.completed).length
  const visibleFilter = filterItems(arr, filter)

  return (
    <section className="todoapp">
      <NewTasksForm addItem={addItem} />
      <section className="main">
        <TaskList
          todos={visibleFilter}
          changeDes={changeDes}
          onEditItem={onEditItem}
          onDeleteItem={deleteItem}
          onToggleDone={onToggleDone}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
        <Footer setFilter={setFilter} activeFilter={filter} doneCount={doneCount} deleteDoneItem={deleteDoneItem} />
      </section>
    </section>
  )
}

export default App
