import { useState, useEffect } from 'react';

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTasks from './components/AddTask'


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
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Delete Task from server
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasksState.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
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

  const ToggleReminder = (id) => {
    setTasks(
      //map the state. if the clicked tab (in Tasks.js) is being mapped, swap its reminded value to its opposite.
      tasksState.map((task) => 
        task.id === id ? {...task, reminder : !task.reminder} : task )
    )
  }

  return (
    <div className="container">
      <Header title="test" onFormToggle={() => toggleFormShowing(!formShowingState)} formShowingState={formShowingState}/>

      {/* Show form only if the state formShowingState is true (toggled inside of <Header/>*/}
      { formShowingState && <AddTasks onAdd={addTaskFromForm}/>}

      {tasksState.length > 0 ? <Tasks tasks={tasksState} onDelete={deleteTask} onToggle={ToggleReminder}/> : <p>No tasks added!</p>}
    </div>
  );
}

export default App;
