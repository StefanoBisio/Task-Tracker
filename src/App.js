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

  return (
    <div className="container">
      <Header title="test"></Header>
      <Tasks tasks={tasksState} onDelete={deleteTask}></Tasks>
    </div>
  );
}

export default App;
