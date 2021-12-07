import { useState } from 'react';

import Header from './components/Header'
import Tasks from './components/Tasks'


function App() {
  
  const [tasksState, setTasks] = useState(
    [
        {
          "id": 1,
          "text": "Doctors Appointment",
          "day": "Feb 5th at 2:30pm",
          "reminder": true
        },
        {
          "id": 2,
          "text": "Meeting at School",
          "day": "Feb 6th at 1:30pm",
          "reminder": true
        }
      ]
  )

  const deleteTask = (id) => {
    setTasks(tasksState.filter((task) => task.id !== id))
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
      <Header title="test"/>

      {tasksState.length > 0 ? <Tasks tasks={tasksState} onDelete={deleteTask} onToggle={ToggleReminder}/> : <p>No tasks added!</p>}

    </div>
  );
}

export default App;
