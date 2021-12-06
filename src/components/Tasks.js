import Task from './Task'

const Tasks = ({tasks}) => {
    
    return (
        <div>
            {tasks.map((oneTask) => (
                <Task key={oneTask.id} task={oneTask}></Task>
                )
            )}
        </div>
    )
}

export default Tasks
