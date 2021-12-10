import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTasks from './components/AddTask'
import About from './components/About'


function App() {
  
  const [formShowingState, toggleFormShowing] = useState(false)
  const [tasksState, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks from sever
  const fetchTasks = async () => {
    const res = await fetch(`http://localhost:5000/tasks`)
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //Add task to server
  const addTaskFromForm = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    //Without the "await" the server data would be updated, but not the UI's
    const data = await res.json()

    setTasks([...tasksState, data])
  }

  //Delete Task from server
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasksState.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  //Toggle Reminder on server
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasksState.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className="container">
        <Header title="test" onFormToggle={() => toggleFormShowing(!formShowingState)} formShowingState={formShowingState}/>

        <Routes>

          <Route path='/' element={
            <div>
              {/* Show form only if the state formShowingState is true (toggled inside of <Header/>*/}
              { formShowingState && <AddTasks onAdd={addTaskFromForm}/>}
              {tasksState.length > 0 ? <Tasks tasks={tasksState} onDelete={deleteTask} onToggle={toggleReminder}/> : <p>No tasks added!</p>}
            </div>
          }/>

          <Route path='/about' element={<About/>} />
        </Routes>

        <Footer/>

      </div>
    </Router>
  );
}

export default App;
